#!/usr/bin/env node
// sync-mfm-points.mjs — audit (default) or rewrite (--write) the `points` arrays in
// src/data/datasheets/*.js against the scraped MFM modules in src/data/mfm/*.js.
//
//   node scripts/sync-mfm-points.mjs           # report drift, exit 1 if any
//   node scripts/sync-mfm-points.mjs --write   # rewrite datasheet points in place
//
// Run scripts/scrape-mfm.py first — that refreshes src/data/mfm/ from the live site;
// this script then propagates those numbers into the per-faction datasheet files.
// Points are EN-only data (ru/ datasheet files carry no points), so no parity impact.
//
// How MFM structures map onto datasheet files:
//   * mfm `units` → same-named datasheet entries.
//   * mfm `subfactions`:
//       - in the 5 SM Chapter files the "Space Marines" subfaction holds the shared
//         units' Chapter prices → compared against space-marines.js base points and
//         materialized as `pointsOverrides` entries (only where they differ);
//       - a subfaction unit whose name already exists in the main list is an alternate
//         price for the same datasheet (imperial-agents' allied costs) → folded in as
//         extra rows with `note: "<subfaction name>"`, only where the price differs;
//       - anything else (SM named-character sections, TS/WE daemon allies) is its own
//         datasheet entry.
//   * a unit's `wargear` (the MFM's WARGEAR OPTIONS, "per Heavy psycannon 15 pts") → the
//     datasheet's `wargearPoints`, printed under its points table so the unit's page says what
//     the roster builder charges (a player asked where the price of a weapon swap is, 2026-10-15).
//     A Chapter's shared Codex units are priced by space-marines.js; a Chapter price that
//     differed would be reported, there is no override for it (none differs today).
//   * mfm `legends` → same-named datasheet entries carrying `legends: true` (appdata's for
//     Orks, the faction-pack ones elsewhere — see the hub's `legends-from-pack` skill). A
//     Legends unit MFM prices that we have no datasheet for is listed at the end as
//     information, not drift: it is the work list for the packs, not an error in the data.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { foldName } from '../src/core/shared/foldName.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DS = path.join(ROOT, 'src/data/datasheets')
const MFM = path.join(ROOT, 'src/data/mfm')
const WRITE = process.argv.includes('--write')

// Hyphens folded too: appdata spells "Shield‑Captain" with U+2011, and until 2026-10-15 that one
// character kept its whole MFM line — both price tiers and its wargear — from reaching the page.
const norm = foldName
const rowKey = (o) => JSON.stringify([o.models ?? null, o.points, o.note ?? null])
const sameRows = (a, b) =>
  a.length === b.length &&
  [...a].map(rowKey).sort().join('|') === [...b].map(rowKey).sort().join('|')
// same price line regardless of note (to detect redundant allied duplicates)
const wgKey = (rows) => (rows ?? []).map((w) => `${norm(w.name)}=${w.points}`).sort().join('|')
const samePrice = (a, b) => (a.models ?? null) === (b.models ?? null) && a.points === b.points

// A bare absolute path is not a module specifier on Windows — `c:\…` reads as a URL scheme and
// the ESM loader refuses it outright, which is why this script had been failing to run at all
// there. Same trap `check-radii.mjs` records for path SEPARATORS: a script that only ever ran on
// one OS is a script that only ever worked on one OS.
const load = (p) => import(pathToFileURL(p).href)

const smMod = await load(path.join(DS, 'space-marines.js'))
const smMfm = (await load(path.join(MFM, 'space-marines.js'))).default
const smById = new Map(smMod.default.map((u) => [u.id, u]))

// SM base expected points by unit name (main units + named-character sections)
const smExpected = new Map()
const smWargear = new Map()
for (const u of smMfm.units) { smExpected.set(norm(u.name), u.options); smWargear.set(norm(u.name), u.wargear ?? []) }
for (const sub of smMfm.subfactions) {
  for (const u of sub.units) {
    if (smExpected.has(norm(u.name))) continue
    smExpected.set(norm(u.name), u.options)
    smWargear.set(norm(u.name), u.wargear ?? [])
  }
}

let drift = 0
const missingLegends = []
const LEGENDS_MFM_NAMES = { 'sentry pylons': 'sentry pylon', 'ferren aerios': 'ferren areios' } // the MFM misspells the Captain
const report = (msg) => { console.log(msg); drift++ }

for (const file of readdirSync(DS).sort()) {
  if (!file.endsWith('.js') || file === 'index.js') continue
  const slug = file.replace('.js', '')
  let mfm
  try { mfm = (await load(path.join(MFM, file))).default } catch { continue }
  const mod = await load(path.join(DS, file))
  const isChapter = !!mod.sharedUnitIds?.length

  // ---- expected points per own-unit name -------------------------------
  const expected = new Map()
  const wargear = new Map() // name -> the MFM's priced wargear rows
  for (const u of mfm.units ?? []) { expected.set(norm(u.name), [...u.options]); wargear.set(norm(u.name), u.wargear ?? []) }
  const legendsNames = new Set()
  for (const u of mfm.legends ?? []) {
    // The MFM prints a few Legends names differently from the Faction Pack datasheet they price
    // ("Sentry Pylons" for the pack's SENTRY PYLON); the datasheet keeps the pack's name.
    const name = LEGENDS_MFM_NAMES[norm(u.name)] || norm(u.name)
    legendsNames.add(name)
    if (!expected.has(name)) { expected.set(name, [...u.options]); wargear.set(name, u.wargear ?? []) }
  }
  const chapterShared = new Map() // name -> options (Chapter price of shared SM units)
  for (const sub of mfm.subfactions ?? []) {
    if (isChapter && sub.name === 'Space Marines') {
      for (const u of sub.units) {
        chapterShared.set(norm(u.name), u.options)
        const sm = smWargear.get(norm(u.name))
        if (sm && wgKey(sm) !== wgKey(u.wargear)) report(`${slug}: ${u.name}: Chapter wargear price ${JSON.stringify(u.wargear ?? [])} differs from Space Marines ${JSON.stringify(sm)} — no override exists for it`)
      }
      continue
    }
    for (const u of sub.units) {
      const k = norm(u.name)
      if (expected.has(k)) {
        // alternate pricing for an existing datasheet — fold in differing rows
        const main = expected.get(k)
        for (const opt of u.options) {
          if (main.some((m) => samePrice(m, opt))) continue
          const note = opt.note ? `${opt.note}, ${sub.name}` : sub.name
          main.push({ ...opt, note })
        }
      } else {
        expected.set(k, [...u.options])
        wargear.set(k, u.wargear ?? [])
      }
    }
  }

  // ---- own units --------------------------------------------------------
  let src = readFileSync(path.join(DS, file), 'utf-8')
  let touched = false
  // A Chapter fields the Codex: Space Marines Legends through its shared list, and its own MFM page
  // prices them again under Legends — those are not a missing sheet.
  const shared = isChapter ? mod.sharedUnitIds.map((id) => smById.get(id)?.name).filter(Boolean) : []
  const have = new Set([...mod.default, ...shared.map((name) => ({ name }))].map((u) => norm(u.name)))
  for (const k of legendsNames) if (!have.has(k)) missingLegends.push(`${slug}: ${k}`)
  for (const u of mod.default) {
    const want = expected.get(norm(u.name))
    if (!want) continue // appdata-only entries absent from MFM
    const wantWg = wargear.get(norm(u.name)) ?? []
    if (wgKey(u.wargearPoints) !== wgKey(wantWg)) {
      report(`${slug}: ${u.name}: wargear ${JSON.stringify(u.wargearPoints ?? [])} -> ${JSON.stringify(wantWg)}`)
      if (WRITE) {
        src = replaceWargear(src, u.id, wantWg)
        touched = true
      }
    }
    if (sameRows(u.points ?? [], want)) continue
    report(`${slug}: ${u.name}: ${JSON.stringify(u.points)} -> ${JSON.stringify(want)}`)
    if (WRITE) {
      src = replacePoints(src, u.id, want)
      touched = true
    }
  }

  // ---- shared SM units (Chapter files): reconcile pointsOverrides -------
  if (isChapter) {
    const overrides = { ...(mod.pointsOverrides ?? {}) }
    let overridesChanged = false
    for (const id of mod.sharedUnitIds) {
      const base = smById.get(id)
      if (!base) continue
      const chapterWant = chapterShared.get(norm(base.name)) ?? smExpected.get(norm(base.name))
      if (!chapterWant) continue
      const smWant = smExpected.get(norm(base.name)) ?? base.points
      const needsOverride = !sameRows(chapterWant, smWant)
      const current = overrides[id]
      if (needsOverride && (!current || !sameRows(current, chapterWant))) {
        report(`${slug}: override ${id}: ${JSON.stringify(current ?? null)} -> ${JSON.stringify(chapterWant)}`)
        overrides[id] = chapterWant
        overridesChanged = true
      } else if (!needsOverride && current) {
        report(`${slug}: stale override ${id} (now equals SM base) -> remove`)
        delete overrides[id]
        overridesChanged = true
      }
    }
    if (WRITE && overridesChanged) {
      src = replaceOverrides(src, overrides)
      touched = true
    }
  }

  if (WRITE && touched) writeFileSync(path.join(DS, file), src)
}

// Replace the "points" JSON array of the unit with the given id (datasheet JSON style).
function replacePoints(src, id, rows) {
  const anchor = `"id": "${id}"`
  const at = src.indexOf(anchor)
  if (at === -1) throw new Error(`id not found: ${id}`)
  const pKey = src.indexOf('"points": [', at)
  const nextId = src.indexOf('"id": "', at + anchor.length)
  if (pKey === -1 || (nextId !== -1 && pKey > nextId)) throw new Error(`no points block for ${id}`)
  const start = pKey + '"points": '.length
  const end = matchBracket(src, start)
  const indent = '      '
  const body = rows.map((r) => {
    const kv = [`"models": ${r.models}`, `"points": ${r.points}`]
    if (r.models == null) kv.shift()
    if (r.note) kv.push(`"note": ${JSON.stringify(r.note)}`)
    return `${indent}{\n${kv.map((l) => `${indent}  ${l}`).join(',\n')}\n${indent}}`
  }).join(',\n')
  return `${src.slice(0, start)}[\n${body}\n    ]${src.slice(end + 1)}`
}

// Write the unit's "wargearPoints" array right after its "points" one (or drop it when the MFM
// prices nothing on the unit any more).
function replaceWargear(src, id, rows) {
  const anchor = `"id": "${id}"`
  const at = src.indexOf(anchor)
  if (at === -1) throw new Error(`id not found: ${id}`)
  const nextId = src.indexOf('"id": "', at + anchor.length)
  const inUnit = (i) => i !== -1 && (nextId === -1 || i < nextId)
  const body = rows.map((w) => `      { "name": ${JSON.stringify(w.name)}, "points": ${w.points} }`).join(',\n')
  const block = rows.length ? `"wargearPoints": [\n${body}\n    ]` : ''
  const wKey = src.indexOf('"wargearPoints": [', at)
  if (inUnit(wKey)) {
    const end = matchBracket(src, wKey + '"wargearPoints": '.length)
    if (block) return `${src.slice(0, wKey)}${block}${src.slice(end + 1)}`
    // drop the key with its trailing comma and line
    return `${src.slice(0, wKey).replace(/\s+$/, '\n    ')}${src.slice(end + 1).replace(/^,\s*/, '')}`
  }
  if (!block) return src
  const pKey = src.indexOf('"points": [', at)
  if (!inUnit(pKey)) throw new Error(`no points block for ${id}`)
  const end = matchBracket(src, pKey + '"points": '.length)
  return `${src.slice(0, end + 1)},\n    ${block}${src.slice(end + 1)}`
}

// Replace the whole pointsOverrides object (Chapter-file style, unquoted keys). A Chapter file
// only carries the block once a shared unit's price has actually diverged from the Codex, so on
// the bump that first splits one (v1.3 raised Centurion Devastators for Codex: Space Marines but
// not for the four Chapter supplements) there is nothing to replace — write the block in, just
// above the datasheet array, rather than dying on a file that is simply still in sync.
function replaceOverrides(src, overrides) {
  const key = 'export const pointsOverrides = {'
  let at = src.indexOf(key)
  if (at === -1) {
    if (!Object.keys(overrides).length) return src
    const anchor = src.indexOf('export default [')
    if (anchor === -1) throw new Error('neither pointsOverrides nor the datasheet array found')
    const preamble = '// appdata and the MFM price these shared units differently for this Chapter than the\n'
      + '// space-marines.js base price — src/data/datasheets/index.js\'s loadDatasheets swaps in this\n'
      + '// `points` array on the folded-in entry. See blood-angels.js for the full mechanism.\n'
    src = `${src.slice(0, anchor)}${preamble}${key}\n}\n\n${src.slice(anchor)}`
    at = src.indexOf(key)
  }
  const start = at + key.length - 1
  const end = matchBracket(src, start, '{', '}')
  const body = Object.keys(overrides).sort().map((id) => {
    const rows = overrides[id].map((r) => {
      const kv = []
      if (r.models != null) kv.push(`models: ${r.models}`)
      kv.push(`points: ${r.points}`)
      if (r.note) kv.push(`note: ${JSON.stringify(r.note)}`)
      return `    { ${kv.join(', ')} },`
    }).join('\n')
    return `  "${id}": [\n${rows}\n  ],`
  }).join('\n')
  return `${src.slice(0, start)}{\n${body}\n}${src.slice(end + 1)}`
}

function matchBracket(src, start, open = src[start], close = open === '{' ? '}' : ']') {
  let depth = 0
  for (let i = start; i < src.length; i++) {
    if (src[i] === '"') { do { i++ } while (i < src.length && (src[i] !== '"' || src[i - 1] === '\\')) }
    else if (src[i] === open) depth++
    else if (src[i] === close && --depth === 0) return i
  }
  throw new Error('unbalanced brackets')
}

if (missingLegends.length) {
  console.log(`\n${missingLegends.length} Legends unit(s) priced by MFM with no datasheet here (not drift — the faction-pack work list):`)
  for (const l of missingLegends) console.log(`  ${l}`)
}
console.log(drift ? `\n${drift} drift item(s)${WRITE ? ' rewritten' : ''}` : 'datasheet points match MFM')
if (!WRITE && drift) process.exit(1)

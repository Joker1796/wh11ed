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
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DS = path.join(ROOT, 'src/data/datasheets')
const MFM = path.join(ROOT, 'src/data/mfm')
const WRITE = process.argv.includes('--write')

const norm = (s) => s.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').trim()
const rowKey = (o) => JSON.stringify([o.models ?? null, o.points, o.note ?? null])
const sameRows = (a, b) =>
  a.length === b.length &&
  [...a].map(rowKey).sort().join('|') === [...b].map(rowKey).sort().join('|')
// same price line regardless of note (to detect redundant allied duplicates)
const samePrice = (a, b) => (a.models ?? null) === (b.models ?? null) && a.points === b.points

const smMod = await import(path.join(DS, 'space-marines.js'))
const smMfm = (await import(path.join(MFM, 'space-marines.js'))).default
const smById = new Map(smMod.default.map((u) => [u.id, u]))

// SM base expected points by unit name (main units + named-character sections)
const smExpected = new Map()
for (const u of smMfm.units) smExpected.set(norm(u.name), u.options)
for (const sub of smMfm.subfactions) {
  for (const u of sub.units) if (!smExpected.has(norm(u.name))) smExpected.set(norm(u.name), u.options)
}

let drift = 0
const report = (msg) => { console.log(msg); drift++ }

for (const file of readdirSync(DS).sort()) {
  if (!file.endsWith('.js') || file === 'index.js') continue
  const slug = file.replace('.js', '')
  let mfm
  try { mfm = (await import(path.join(MFM, file))).default } catch { continue }
  const mod = await import(path.join(DS, file))
  const isChapter = !!mod.sharedUnitIds?.length

  // ---- expected points per own-unit name -------------------------------
  const expected = new Map()
  for (const u of mfm.units ?? []) expected.set(norm(u.name), [...u.options])
  const chapterShared = new Map() // name -> options (Chapter price of shared SM units)
  for (const sub of mfm.subfactions ?? []) {
    if (isChapter && sub.name === 'Space Marines') {
      for (const u of sub.units) chapterShared.set(norm(u.name), u.options)
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
      }
    }
  }

  // ---- own units --------------------------------------------------------
  let src = readFileSync(path.join(DS, file), 'utf-8')
  let touched = false
  for (const u of mod.default) {
    const want = expected.get(norm(u.name))
    if (!want) continue // legends/appdata-only entries absent from MFM
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

// Replace the whole pointsOverrides object (Chapter-file style, unquoted keys).
function replaceOverrides(src, overrides) {
  const key = 'export const pointsOverrides = {'
  const at = src.indexOf(key)
  if (at === -1) throw new Error('pointsOverrides block not found')
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

console.log(drift ? `\n${drift} drift item(s)${WRITE ? ' rewritten' : ''}` : 'datasheet points match MFM')
if (!WRITE && drift) process.exit(1)

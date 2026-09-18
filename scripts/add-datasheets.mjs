#!/usr/bin/env node
// Insert (or replace) hand-authored datasheet entries into src/data/datasheets/<slug>.js —
// the way a Warhammer Legends sheet from a Faction Pack PDF gets in, since appdata carries
// Legends for Orks alone (hub skill `legends-from-pack`). The normal path — appdata → the
// per-faction file — never needs this: it rewrites whole files.
//
//   node scripts/add-datasheets.mjs <slug> <entries.json>            # add; an existing id is an error
//   node scripts/add-datasheets.mjs <slug> <entries.json> --replace  # an existing id is replaced
//
// The entries file is a JSON array in the datasheet shape (see any entry of the target file).
// Every entry is checked before anything is written: the required fields, the id form, the
// weapon rows, an id nobody else uses (including the Space Marine sheets a Chapter file folds
// in), and — for a pack sheet — `legends: true` with `source: "faction-pack"`, the marker
// `sync-appdata` and `sync-mfm-points` read. `points` may be left `[]`: `npm run sync:mfm --
// --write` fills it from the MFM's own Legends section. The array keeps its order — sorted by
// id when it already is, appended otherwise.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const [slug, entriesPath, ...flags] = process.argv.slice(2)
if (!slug || !entriesPath) {
  console.log('Usage: node scripts/add-datasheets.mjs <slug> <entries.json> [--replace]')
  process.exit(1)
}
const REPLACE = flags.includes('--replace')
const file = path.join(ROOT, 'src/data/datasheets', `${slug}.js`)
if (!fs.existsSync(file)) { console.error(`no datasheet file for "${slug}"`); process.exit(1) }

const src = fs.readFileSync(file, 'utf-8')
const start = src.indexOf('export default [')
if (start === -1) { console.error(`${file}: no "export default [" array`); process.exit(1) }
const arrStart = start + 'export default '.length
const arrEnd = src.lastIndexOf(']') + 1
// Seven of the files carry a trailing comma inside a `leader` block (`],\n    },`) — an array
// literal, not JSON — so the text is evaluated as JavaScript; it is this repo's own data. The
// rewrite below serialises it as JSON, which drops those commas: a few-line normalisation.
const data = new Function(`return ${src.slice(arrStart, arrEnd)}`)()

const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf-8'))
if (!Array.isArray(entries) || !entries.length) { console.error('entries: expected a non-empty JSON array'); process.exit(1) }

// Ids in use: this file, plus the shared Space Marine sheets a Chapter file folds in.
const mod = await import(pathToFileURL(file).href)
const taken = new Set([...data.map((u) => u.id), ...(mod.sharedUnitIds || [])])

const WEAPON = { ranged: ['name', 'tags', 'range', 'a', 'bs', 's', 'ap', 'd'], melee: ['name', 'tags', 'a', 'ws', 's', 'ap', 'd'] }
const errors = []
for (const e of entries) {
  const at = (m) => errors.push(`${e.id || e.name || '?'}: ${m}`)
  for (const k of ['id', 'name', 'points', 'profiles', 'abilities', 'composition', 'keywords', 'factionKeywords']) {
    if (!(k in e)) at(`missing "${k}"`)
  }
  if (typeof e.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.id)) at('id must be a kebab-case slug')
  // sync-mfm-points finds a sheet's `points` block by scanning forward from its `"id"` line — a
  // `points` key written BEFORE `id` lands the next sheet's prices on this one (seen 2026-09-18).
  if (Object.keys(e).indexOf('points') < Object.keys(e).indexOf('id')) at('put "id" and "name" before "points" — sync-mfm-points reads the file in key order')
  if (taken.has(e.id) && !REPLACE) at('id already used in this faction (pass --replace to overwrite)')
  if (mod.sharedUnitIds?.includes(e.id)) at('id belongs to a shared Space Marine sheet — a Chapter file cannot shadow it')
  if (!Array.isArray(e.profiles) || !e.profiles.length) at('profiles: expected at least one')
  for (const p of e.profiles || []) for (const k of ['name', 'm', 't', 'sv', 'w', 'ld', 'oc']) if (!(k in p)) at(`profile "${p.name}": missing "${k}"`)
  for (const kind of ['ranged', 'melee']) {
    for (const w of e[kind] || []) {
      for (const k of WEAPON[kind]) if (!(k in w)) at(`${kind} weapon "${w.name}": missing "${k}"`)
      if (!Array.isArray(w.tags)) at(`${kind} weapon "${w.name}": tags must be an array`)
      for (const t of w.tags || []) if (t !== t.toUpperCase()) at(`${kind} weapon "${w.name}": tag "${t}" is not upper case`)
    }
  }
  for (const a of e.abilities || []) if (!a.name || !a.text) at('abilities: every entry needs name and text')
  if (e.leader && (!e.leader.text || !Array.isArray(e.leader.units))) at('leader: expected { text, units[] }')
  if (e.source === 'faction-pack') {
    if (e.legends !== true) at('a faction-pack sheet must carry legends: true')
    if (!e.sourceVersion) at('a faction-pack sheet must carry sourceVersion (the pack\'s version line)')
  }
  const dupIds = entries.filter((x) => x.id === e.id).length
  if (dupIds > 1) at('id repeated inside the entries file')
}
if (errors.length) {
  console.error(`${errors.length} problem(s), nothing written:`)
  for (const m of errors) console.error(`  - ${m}`)
  process.exit(1)
}

const sorted = data.every((u, i) => i === 0 || data[i - 1].id <= u.id)
let added = 0, replaced = 0
for (const e of entries) {
  const i = data.findIndex((u) => u.id === e.id)
  if (i !== -1) { data[i] = e; replaced++; continue }
  if (sorted) {
    const j = data.findIndex((u) => u.id > e.id)
    data.splice(j === -1 ? data.length : j, 0, e)
  } else data.push(e)
  added++
}

let head = src.slice(0, arrStart)
// The header line that counts the file's own sheets ("16 chapter-specific/differing datasheets
// here") stays truthful.
head = head.replace(/(\d+) chapter-specific\/differing datasheets here/, `${data.length} chapter-specific/differing datasheets here`)
fs.writeFileSync(file, `${head}${JSON.stringify(data, null, 2)}${src.slice(arrEnd)}`)
console.log(`${slug}: ${added} added, ${replaced} replaced — ${data.length} sheets in ${path.relative(ROOT, file)}${sorted ? ' (kept sorted by id)' : ' (appended)'}`)

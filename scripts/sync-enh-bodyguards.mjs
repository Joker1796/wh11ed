// Report-only audit: every wh40k-appdata enhancement that GRANTS an attach (lets its bearer
// join a unit it normally couldn't lead) must spell that out in wh11ed's enhancement body.
//
// Why this exists: appdata encodes such attaches STRUCTURALLY, in the
// `enhancement_bodyguard_group` (+ `_datasheet` / `_keyword`) tables — NOT as prose in
// `enhancement.rules`. Our faction data is authored from the rules prose, so an
// attach-granting enhancement silently loses its "…the bearer can be attached to a X unit"
// line. That gap was found on 2026-07-25 (Pact of Cursed Pinions → Warp Talons, plus 9
// others across 8 factions) and fixed by hand. This audit is the guardrail so a future
// appdata version can't reintroduce it unnoticed: on `npm run sync` it flags any
// attach-granting enhancement whose wh11ed body lacks an attach note.
//
// Report only — nothing is written (faction bodies are hand-authored + bilingual; a silent
// auto-write would risk EN/RU desync). Read the flagged lines and add the note by hand in
// both src/data/factions/<slug>.js and src/data/factions/ru/<slug>.js, matching the phrasing
// already used by Sorrowscent Vulture / Exalted Patron:
//   "In the Declare Battle Formations step, the bearer can be attached to a <UNIT> unit."
//
// Usage: node scripts/sync-enh-bodyguards.mjs   (also run as part of `npm run sync`).

import fs from 'node:fs'
import path from 'node:path'
import { ROOT, APPDATA, norm, loadModule } from './lib/sync-common.mjs'

const T = path.join(APPDATA, 'tables')
const read = (f) => {
  const p = path.join(T, f)
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : []
}

// An attach note, in any wording our data or GW uses.
const ATTACH_RE = /attached to|attaches to|can be attached/i

function appdataAttachEnhancements() {
  const enh = read('enhancement.json')
  const groups = read('enhancement_bodyguard_group.json')
  const grpDs = read('enhancement_bodyguard_group_datasheet.json')
  const grpKw = read('enhancement_bodyguard_group_keyword.json')
  const dsName = new Map(read('datasheet.json').map((d) => [d.id, d?.localisations?.en?.name || d.id]))
  const kwName = new Map(read('keyword.json').map((k) => [k.id, k?.localisations?.en?.name || k?.name || k.id]))
  const enhById = new Map(enh.map((e) => [e.id, e]))

  // group id → target names
  const targetsByGroup = new Map()
  for (const r of grpDs) {
    const arr = targetsByGroup.get(r.enhancementBodyguardGroupId) || []
    arr.push(dsName.get(r.datasheetId) || r.datasheetId)
    targetsByGroup.set(r.enhancementBodyguardGroupId, arr)
  }
  for (const r of grpKw) {
    const arr = targetsByGroup.get(r.enhancementBodyguardGroupId) || []
    arr.push((kwName.get(r.keywordId) || r.keywordId) + ' [keyword]')
    targetsByGroup.set(r.enhancementBodyguardGroupId, arr)
  }

  // enhancement id → { name, types, targets }
  const byEnh = new Map()
  for (const g of groups) {
    const e = enhById.get(g.enhancementId)
    if (!e) continue
    const rec = byEnh.get(g.enhancementId) || { name: e?.localisations?.en?.name || '?', types: new Set(), targets: new Set() }
    rec.types.add(g.bodyguardType)
    for (const t of targetsByGroup.get(g.id) || []) rec.targets.add(t)
    byEnh.set(g.enhancementId, rec)
  }
  return [...byEnh.values()]
}

// normalized enhancement name → { slug, det, body } for every wh11ed faction enhancement.
async function wh11edEnhancements() {
  const map = new Map()
  const files = fs.readdirSync(path.join(ROOT, 'src/data/factions')).filter((f) => f.endsWith('.js') && f !== 'index.js')
  for (const f of files) {
    const slug = f.replace(/\.js$/, '')
    const mod = await loadModule(path.join(ROOT, 'src/data/factions', f))
    const en = Object.values(mod || {})[0]?.en
    if (!en?.detachments) continue
    for (const d of en.detachments) {
      for (const e of d.enhancements || []) {
        if (e?.name) map.set(norm(e.name), { slug, det: d.name, body: String(e.body || '') })
      }
    }
  }
  return map
}

const appEnh = appdataAttachEnhancements()
const ours = await wh11edEnhancements()

const missing = []
let covered = 0
let notCarried = 0
for (const a of appEnh) {
  const mine = ours.get(norm(a.name))
  if (!mine) { notCarried++; continue } // faction/detachment not in wh11ed (e.g. not imported yet)
  if (ATTACH_RE.test(mine.body)) { covered++; continue }
  missing.push({ ...a, ...mine })
}

console.log(`enhancement attach-notes: ${appEnh.length} attach-granting enhancements in appdata — ${covered} covered, ${missing.length} MISSING, ${notCarried} not in wh11ed data.`)
if (missing.length) {
  console.log('\n  ✗ these enhancements grant an attach in appdata but their wh11ed body has no attach note:')
  for (const m of missing) {
    const tgt = [...m.targets].join(', ')
    console.log(`    ${m.slug} · ${m.det} · ${m.name}  →${[...m.types].join('/')}→ ${tgt}`)
  }
  console.log('\n  Add to BOTH src/data/factions/<slug>.js and src/data/factions/ru/<slug>.js, e.g.:')
  console.log('    "In the Declare Battle Formations step, the bearer can be attached to a <UNIT> unit."')
}
process.exitCode = missing.length ? 1 : 0

// Generate src/data/sourceIds.json — a sidecar map from wh11ed's stable per-entity key to the
// wh40k-appdata source UUID (`sourceId`). wh11ed's faction data files are hand-authored (helper-
// generated stratagems, name-only entities, comments) so the id can't be safely inlined; this
// external map keeps the hand-written data untouched and fully regenerable.
//
// Shape: { "<faction-slug>": { "<kind>:<key>": "<appdata-uuid>", ... }, ... }
//   kind   = armyrule | det | strat | enh | ds | wg | cparmyrule | cpdet | cpstrat | cpenh | cpds
//   key    = the entity's own wh11ed id where it has one (datasheets `ds:<id>`, detachments
//            `det:<id||normName>`), else its normalized name; strat/enh are scoped under their
//            detachment key, wg (a datasheet's ranged[]/melee[] weapon row) under its datasheet id
//            (`wg:<ds-id>:<normName>`) — so same-named entities under different parents don't
//            collide. wg's uuid identifies the appdata **wargear item**, not a single profile —
//            a multi-mode weapon (e.g. plasma) has one item with several profiles, so several wh11ed
//            rows ("Plasma gun – standard"/"– supercharge") legitimately share the same wg uuid.
//            The `cp*` kinds bridge src/data/combatPatrol.js (a separate hand-authored dataset,
//            not src/data/factions/*.js) the same way, scoped under the same faction-slug bucket:
//            cparmyrule/cpdet are keyed by normalized rule name (one box detachment per faction,
//            no wh11ed id of its own), cpstrat/cpenh by normalized name, cpds by the datasheet's
//            own wh11ed id.
//
// Built by matching wh11ed↔appdata by normalized NAME (they agree today) — the same matching
// sync-appdata.mjs does. Once committed, the map is the stable bridge: on a later data_version
// bump the appdata UUID is unchanged, so sync-appdata can match by id and report a rename
// instead of a spurious "missing + extra" pair (see its --renames handling).
//
// Usage:
//   node scripts/gen-source-ids.mjs            # write src/data/sourceIds.json + coverage report
//   node scripts/gen-source-ids.mjs --check    # report only; non-zero exit if it would change
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, APPDATA, SLUG_MAP, norm, loadJson, loadModule, byNormName, matchWeapon, combatPatrolNames } from './lib/sync-common.mjs'
import { combatPatrol } from '../src/data/combatPatrol.js'

const cpFactionBySlug = new Map(combatPatrol.en.factions.map((f) => [f.slug, f]))

// Fold a Chapter's shared space-marines.js datasheets back in, mirroring
// src/data/datasheets/index.js's loadDatasheets.
async function loadWh11edDatasheets(slug) {
  const mod = await loadModule(path.join(ROOT, 'src/data/datasheets', `${slug}.js`))
  if (!mod) return []
  const own = mod.default || []
  if (!mod.sharedUnitIds?.length) return own
  const smMod = await loadModule(path.join(ROOT, 'src/data/datasheets/space-marines.js'))
  const idSet = new Set(mod.sharedUnitIds)
  return [...own, ...(smMod?.default || []).filter((d) => idSet.has(d.id))]
}

const detKeyOf = (d) => `det:${d.id || norm(d.name)}`

async function mapFaction(slug, cp, stats) {
  const appSlug = SLUG_MAP[slug] || slug
  const bundle = await loadJson(path.join(APPDATA, 'factions', `${appSlug}.json`))
  if (!bundle) return null
  const factionMod = await loadModule(path.join(ROOT, 'src/data/factions', `${slug}.js`))
  const en = Object.values(factionMod || {})[0]?.en
  if (!en) return null

  const out = {}
  const record = (key, id) => { if (id) { out[key] = id; stats.matched++ } else stats.unmatched++ }

  // Army rule (wh11ed keeps one combined rule; take the closest-named appdata army rule).
  if (en.armyRule) {
    const want = (en.armyRule.name || '').toLowerCase()
    const hit = (bundle.armyRules || []).find((a) => want.includes(norm(a.name)) || norm(a.name).includes(want))
    record(`armyrule:${norm(en.armyRule.name)}`, hit?.id)
  }

  // Detachments + their stratagems/enhancements.
  const appDetachments = (bundle.detachments || []).filter((d) => !cp.detachments.has(norm(d.name)))
  const appDetByName = byNormName(appDetachments, (d) => d.name)
  for (const d of en.detachments || []) {
    const appDet = appDetByName.get(norm(d.name))
    const dk = detKeyOf(d)
    record(dk, appDet?.id)
    if (!appDet) { stats.unmatched += (d.stratagems?.length || 0) + (d.enhancements?.length || 0); continue }
    const stratById = byNormName(appDet.stratagems || [], (s) => s.name)
    for (const s of d.stratagems || []) record(`strat:${dk}:${norm(s.name)}`, stratById.get(norm(s.name))?.id)
    const enhById = byNormName(appDet.enhancements || [], (e) => e.name)
    for (const e of d.enhancements || []) record(`enh:${dk}:${norm(e.name)}`, enhById.get(norm(e.name))?.id)
  }

  // Datasheets (keyed by wh11ed's stable slug id — survives an appdata rename).
  const appDatasheets = (bundle.datasheets || []).filter((d) => !cp.datasheets.has(norm(d.name)))
  const appDsByName = byNormName(appDatasheets, (d) => d.name)
  for (const d of await loadWh11edDatasheets(slug)) {
    const appDs = appDsByName.get(norm(d.name))
    record(`ds:${d.id}`, appDs?.id)
    if (!appDs) { stats.unmatched += (d.ranged?.length || 0) + (d.melee?.length || 0); continue }
    for (const w of d.ranged || []) record(`wg:${d.id}:${norm(w.name)}`, matchWeapon(w.name, true, appDs.wargear)?.id)
    for (const w of d.melee || []) record(`wg:${d.id}:${norm(w.name)}`, matchWeapon(w.name, false, appDs.wargear)?.id)
  }

  // Combat Patrol bridge (src/data/combatPatrol.js) — same faction-slug bucket, `cp`-prefixed
  // kinds. Matches against the appdata rows THIS TIME INCLUDED (isCombatPatrol true), the inverse
  // of the `cp.detachments`/`cp.datasheets` exclusion used above.
  const cpFaction = cpFactionBySlug.get(slug)
  if (cpFaction) {
    const cpDet = (bundle.detachments || []).find((d) => d.isCombatPatrol)
    if (cpDet) {
      record(`cpdet:${norm(cpFaction.rule.name)}`, cpDet.id)
      const cpStratById = byNormName(cpDet.stratagems || [], (s) => s.name)
      for (const s of cpFaction.stratagems || []) record(`cpstrat:${norm(s.name)}`, cpStratById.get(norm(s.name))?.id)
      const cpEnhById = byNormName(cpDet.enhancements || [], (e) => e.name)
      for (const e of cpFaction.enhancements || []) record(`cpenh:${norm(e.name)}`, cpEnhById.get(norm(e.name))?.id)
    }
    const cpArmyRule = (bundle.armyRules || []).find((a) => cp.armyRuleIds.has(a.id))
    if (cpArmyRule) record(`cparmyrule:${norm(cpFaction.armyRule.name)}`, cpArmyRule.id)
    const cpDsByName = byNormName((bundle.datasheets || []).filter((d) => d.isCombatPatrol), (d) => d.name)
    for (const d of cpFaction.datasheets || []) record(`cpds:${d.id}`, cpDsByName.get(norm(d.name))?.id)
  }

  return Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)))
}

const OUT = path.join(ROOT, 'src/data/sourceIds.json')

export async function run(argv = process.argv.slice(2)) {
  const check = argv.includes('--check')
  // Iterate wh11ed's own faction slugs (the src/data/factions/*.js filenames) — SLUG_MAP resolves
  // each to its appdata bundle name. Deriving slugs from appdata's _index instead would skip every
  // renamed faction (space-marines↔adeptus-astartes, aeldari↔asuryani, …).
  const slugs = fs.readdirSync(path.join(ROOT, 'src/data/factions')).filter((f) => f.endsWith('.js')).map((f) => f.replace(/\.js$/, ''))

  const cp = combatPatrolNames()
  const stats = { matched: 0, unmatched: 0 }
  const map = {}
  for (const slug of slugs.sort()) {
    const m = await mapFaction(slug, cp, stats)
    if (m && Object.keys(m).length) map[slug] = m
  }

  const json = JSON.stringify(map, null, 2) + '\n'
  const prev = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : null
  console.log(`sourceIds: ${stats.matched} entities mapped across ${Object.keys(map).length} factions, ${stats.unmatched} unmatched (new/renamed — see sync-appdata).`)

  if (check) {
    if (prev !== json) { console.log('  --check: src/data/sourceIds.json is stale; run `node scripts/gen-source-ids.mjs`.'); return 1 }
    console.log('  --check: up to date.')
    return 0
  }
  fs.writeFileSync(OUT, json)
  console.log(`  wrote ${path.relative(ROOT, OUT)}${prev === json ? ' (unchanged)' : ''}`)
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())

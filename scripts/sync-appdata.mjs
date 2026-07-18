// Report-only diff between wh11ed's faction data and wh40k-appdata (the private sibling
// repo treated as the 100%-authoritative rules source — a dump of the official GW app).
//
// Usage:
//   node scripts/sync-appdata.mjs <slug> [<slug> ...]
//   node scripts/sync-appdata.mjs --all
//
// For each wh11ed faction slug, resolves the matching wh40k-appdata faction bundle (see
// SLUG_MAP below — a few names differ, e.g. wh11ed's space-marines.js is appdata's
// "adeptus-astartes"), and reports what appdata has that wh11ed doesn't (candidates to
// add — this is how the missing Battle Round 09.05.01 section and 28 missing FAQs were
// found), what wh11ed has that appdata doesn't (rename/Legends/removed candidates), and
// scalar mismatches (stratagem CP, enhancement/datasheet points) for anything matched.
//
// Matching is by normalized NAME, not id — wh11ed doesn't carry appdata's ids yet
// (`sourceId`, see CLAUDE.md). This script only reads and reports; nothing is written to
// data files. A future --write mode can use this same name-matching to backfill sourceId
// for id-based matching on every later run.
//
// Known limitation: rule/ability BODY TEXT is not diffed. wh11ed's prose is enriched with
// gloss tokens, cross-references and hand-fixed wording appdata doesn't have, so an exact
// or even normalized text comparison would be almost all noise. This reports structural
// presence/absence and scalar fields (cp/cost/points) only — read the flagged entities'
// full text yourself.
//
// For the 5 SM-Chapter factions (deathwatch, black-templars, blood-angels, dark-angels,
// space-wolves): wh11ed's datasheet list already folds in units shared with
// space-marines.js (see sharedIdsFor in data/datasheets/index.js), but appdata's own
// per-chapter bundle only lists that Chapter's OWN publications — units GW considers part
// of the general Adeptus Astartes pool live under appdata's adeptus-astartes.json instead.
// So an "extra in wh11ed" datasheet for a Chapter may legitimately belong to that shared
// pool rather than being wrong — cross-check space-marines vs adeptus-astartes separately
// before treating a Chapter's "extra" list as actionable.

import fs from 'node:fs'
import path from 'node:path'
import { ROOT, APPDATA, norm, appdataToMarkup, bodyText, loadJson, loadModule, byNormName, diffByName } from './lib/sync-common.mjs'

// wh11ed slug → wh40k-appdata slug, wherever the two disagree.
const SLUG_MAP = {
  'space-marines': 'adeptus-astartes',
  'chaos-space-marines': 'heretic-astartes',
  'imperial-agents': 'agents-of-the-imperium',
  'aeldari': 'asuryani',
  'chaos-daemons': 'legiones-daemonica',
  'titan-legions': 'adeptus-titanicus',
  'chaos-titan-legions': 'titanicus-traitoris',
}

// Combat Patrol publications (`isCombatPatrol`) are a separate boxed game mode with fixed
// 0-point rosters and detachment-name-prefixed unit variants; wh11ed is matched-play only
// and deliberately carries none of it. The faction bundle flags detachments but not
// datasheets, so derive both name sets straight from the raw appdata tables and drop them
// before diffing (self-contained — no bundle regeneration needed). Computed once.
let _combatPatrol = null
function combatPatrolNames() {
  if (_combatPatrol) return _combatPatrol
  const T = path.join(APPDATA, 'tables')
  const read = (f) => (fs.existsSync(path.join(T, f)) ? JSON.parse(fs.readFileSync(path.join(T, f), 'utf8')) : [])
  const cpPubIds = new Set(read('publication.json').filter((p) => p.isCombatPatrol).map((p) => p.id))
  const namesUnder = (f) => new Set(read(f).filter((r) => cpPubIds.has(r.publicationId)).map((r) => norm(r?.localisations?.en?.name || '')).filter(Boolean))
  _combatPatrol = { datasheets: namesUnder('datasheet.json'), detachments: namesUnder('detachment.json') }
  return _combatPatrol
}

// Fold a Chapter's shared space-marines.js units back in, mirroring
// src/data/datasheets/index.js's loadDatasheets, so the comparison sees what the site
// actually shows.
async function loadWh11edDatasheets(slug) {
  const mod = await loadModule(path.join(ROOT, 'src/data/datasheets', `${slug}.js`))
  if (!mod) return []
  const own = mod.default || []
  if (!mod.sharedUnitIds?.length) return own
  const smMod = await loadModule(path.join(ROOT, 'src/data/datasheets/space-marines.js'))
  const idSet = new Set(mod.sharedUnitIds)
  return [...own, ...(smMod?.default || []).filter((d) => idSet.has(d.id))]
}

async function syncFaction(slug) {
  const appSlug = SLUG_MAP[slug] || slug
  const bundle = await loadJson(path.join(APPDATA, 'factions', `${appSlug}.json`))
  console.log(`\n=== ${slug} (appdata: ${appSlug}) ===`)
  if (!bundle) { console.log('  no appdata bundle found — check SLUG_MAP or spelling'); return }

  // Each faction file's only export is a camelCase binding (`blackTemplars`, `spaceMarines`,
  // ...) that doesn't match the dashed slug — grab whatever the module's one export is.
  const factionMod = await loadModule(path.join(ROOT, 'src/data/factions', `${slug}.js`))
  const en = Object.values(factionMod || {})[0]?.en
  if (!en) { console.log('  no src/data/factions/<slug>.js found'); return }

  const lines = []

  // Drop Combat Patrol content — a separate game mode wh11ed doesn't carry (see helper).
  const cp = combatPatrolNames()
  const appDetachments = (bundle.detachments || []).filter((d) => !cp.detachments.has(norm(d.name)))
  const appDatasheets = (bundle.datasheets || []).filter((d) => !cp.datasheets.has(norm(d.name)))

  // Army rule(s): wh11ed has one combined armyRule; appdata may have several.
  const appArmyNames = (bundle.armyRules || []).map((a) => norm(a.name))
  if (en.armyRule && !appArmyNames.some((n) => (en.armyRule.name || '').toLowerCase().includes(n) || n.includes((en.armyRule.name || '').toLowerCase()))) {
    lines.push(`  ~ army rule "${en.armyRule.name}" doesn't obviously match any appdata army rule (${bundle.armyRules.map((a) => a.name).join(', ') || 'none'}) — check by hand`)
  }

  // Detachments, and within each, stratagems/enhancements.
  lines.push(...diffByName('detachment', en.detachments, appDetachments, (d) => d.name, (d) => d.name, [],
    (d) => (d.rules || []).map((r) => `${r.name}: ${bodyText(r.body)}`).join(' | ')))
  const appDetByName = byNormName(appDetachments, (d) => d.name)
  for (const d of en.detachments || []) {
    const appDet = appDetByName.get(norm(d.name))
    if (!appDet) continue
    const sub = [
      ...diffByName('stratagem', d.stratagems, appDet.stratagems, (s) => s.name, (s) => s.name, [['cp', 'cp']],
        (s) => `${s.cp}CP — ${appdataToMarkup(s.effect)}`),
      ...diffByName('enhancement', d.enhancements, appDet.enhancements, (e) => e.name, (e) => e.name, [['points', 'cost']],
        (e) => `${e.cost ?? 0}pts — ${appdataToMarkup(e.rules)}`),
    ]
    if (sub.length) lines.push(`  in detachment "${d.name}":`, ...sub.map((l) => `  ${l}`))
  }

  // Datasheets. For entirely missing units, a points/keywords pointer is enough — a new
  // datasheet needs full authoring (RU translation included), not a one-line paste.
  const wh11edSheets = await loadWh11edDatasheets(slug)
  lines.push(...diffByName('datasheet', wh11edSheets, appDatasheets, (d) => d.name, (d) => d.name, [],
    (d) => `${(d.points || []).map((p) => `${p.models}=${p.points}pts`).join(', ')} — ${(d.keywords || []).join(', ')}`))
  const appDsByName = byNormName(appDatasheets, (d) => d.name)
  for (const d of wh11edSheets) {
    const appDs = appDsByName.get(norm(d.name))
    if (!appDs) continue
    // wh11ed's `points[].note` sometimes marks MFM "copy tax" tiers ("1st-2nd" vs "3rd+"
    // costing more for spamming the same unit) — appdata's composition join only exposes
    // the base price, so drop any tier past the first before comparing.
    // appdata's own unit_composition join sometimes yields duplicate rows for the same
    // price (multiple miniature slots in one composition) — de-dupe before comparing.
    // The ordinal can be the whole note ("3rd+") or trail a longer composition
    // description in parens ("3 Wolf Guard Headtakers (3rd+)") — match either.
    const isSurchargeTier = (note) => note && /(^|\()(2nd|3rd|4th|5th)/i.test(note)
    const whPts = [...new Set((d.points || []).filter((p) => !isSurchargeTier(p.note)).map((p) => p.points))].sort((x, y) => x - y)
    const appPts = [...new Set((appDs.points || []).map((p) => p.points))].sort((x, y) => x - y)
    if (whPts.length && appPts.length && JSON.stringify(whPts) !== JSON.stringify(appPts)) {
      lines.push(`  ~ datasheet "${d.name}" points differ: wh11ed=${JSON.stringify(whPts)} appdata=${JSON.stringify(appPts)}`)
    }
    // Only appdata's `type: 'datasheet'` abilities are genuinely unit-specific and map to
    // wh11ed's `abilities` array — `core`/`faction` are Core Rulebook/army-rule references
    // wh11ed keeps as its own `core`/`faction` summary strings, and `wargear` maps to
    // `wargearAbilities`, not `abilities`.
    const whAbilities = new Set((d.abilities || []).map((a) => norm(a.name)))
    const appAbilityByName = byNormName((appDs.abilities || []).filter((a) => a.type === 'datasheet'), (a) => a.name)
    for (const [n, a] of appAbilityByName) {
      if (!whAbilities.has(n)) lines.push(`  + datasheet "${d.name}" missing ability: "${a.name}" — ${appdataToMarkup(a.rules)}`)
    }
    for (const n of whAbilities) if (!appAbilityByName.has(n)) lines.push(`  - datasheet "${d.name}" extra ability (not in appdata): "${n}"`)

    // Compare core+faction as ONE merged set, not two separate fields: wh11ed's `faction`
    // is itself sometimes a comma-joined list (e.g. Aeldari's "Battle Focus, Disparate
    // Paths"), and appdata inconsistently buckets the same ability name as 'core' on some
    // datasheets and 'faction' on others (e.g. "Super-heavy Walker") — diffing per-field
    // would flag that inconsistency as a false difference even when the name set matches.
    const appCoreFaction = (appDs.abilities || []).filter((a) => a.type === 'core' || a.type === 'faction').map((a) => norm(a.name))
    const whCoreFaction = [...(d.core || '').split(','), ...(d.faction || '').split(',')].map((s) => norm(s.trim())).filter(Boolean)
    const missingCF = appCoreFaction.filter((n) => !whCoreFaction.includes(n))
    const extraCF = whCoreFaction.filter((n) => !appCoreFaction.includes(n))
    if (missingCF.length || extraCF.length) {
      lines.push(`  ~ datasheet "${d.name}" core/faction differ: wh11ed=${JSON.stringify([d.core, d.faction].filter(Boolean))} appdata=${JSON.stringify(appCoreFaction)}`)
    }
  }

  if (!lines.length) console.log('  no structural differences found')
  else lines.forEach((l) => console.log(l))
}

const args = process.argv.slice(2)
let slugs = args
if (args[0] === '--all') {
  slugs = fs.readdirSync(path.join(ROOT, 'src/data/factions'))
    .filter((f) => f.endsWith('.js') && f !== 'index.js')
    .map((f) => f.replace(/\.js$/, ''))
}
if (!slugs.length) {
  console.log('Usage: node scripts/sync-appdata.mjs <slug> [<slug> ...] | --all')
  process.exit(1)
}
for (const slug of slugs) await syncFaction(slug)

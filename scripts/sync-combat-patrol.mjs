// Report-only audit: src/data/combatPatrol.js (hand-authored Combat Patrol box content) vs
// wh40k-appdata's isCombatPatrol-flagged rows for the same faction — the mirror image of every
// other sync-*.mjs script, which instead DROPS this content (see combatPatrolNames() in
// lib/sync-common.mjs). Checks, per authored faction: the CP detachment's box name/DP/Force
// Disposition, the detachment rule's name, which army-rule row is linked to the box's own
// "Combat Patrol: <name>" publication (this can genuinely differ in wording from the faction's
// normal Codex army rule — see the pre-errata "reanimates D3" note in combatPatrol.js), the
// stratagem/enhancement/datasheet name sets, and each enhancement's isCombatPatrolDefault flag
// (from tables/enhancement.json — the faction bundle's own enhancement objects don't carry it).
// Presence/name-only, like sync-wargear-options.mjs/sync-layouts.mjs — not a prose diff (that's
// sync-faction-text.mjs's job for normal content; CP boxes are small enough to eyeball by hand).
//
// Also scans every faction bundle in wh40k-appdata/factions/ for an isCombatPatrol detachment and
// reports which ones aren't authored in combatPatrol.js yet — the Phase 3 punch list (see
// APPDATA-COVERAGE-PLAN.md's "Combat Patrol support" plan).
//
// Report only — nothing is written (combatPatrol.js is hand-authored prose, same rule as every
// other faction data file). Usage: node scripts/sync-combat-patrol.mjs (also run as part of
// `npm run sync`).
import fs from 'node:fs'
import path from 'node:path'
import { APPDATA, SLUG_MAP, norm, loadJson, diffSet } from './lib/sync-common.mjs'
import { combatPatrol } from '../src/data/combatPatrol.js'
import { combatPatrolIndex } from '../src/data/combatPatrolIndex.js'

const T = path.join(APPDATA, 'tables')
const read = (f) => loadJson(path.join(T, f)) || []

const cpPubIds = new Set(read('publication.json').filter((p) => p.isCombatPatrol).map((p) => p.id))
const enhDefaultById = new Map(read('enhancement.json').map((r) => [r.id, !!r.isCombatPatrolDefault]))

let flaggedTotal = 0

for (const faction of combatPatrol.en.factions) {
  const appSlug = SLUG_MAP[faction.slug] || faction.slug
  const bundle = loadJson(path.join(APPDATA, 'factions', `${appSlug}.json`))
  console.log(`\n=== ${faction.slug} (${faction.boxName}) ===`)
  if (!bundle) {
    console.log('  ✗ no appdata bundle found — check SLUG_MAP or spelling')
    flaggedTotal++
    continue
  }

  const det = (bundle.detachments || []).find((d) => d.isCombatPatrol)
  if (!det) {
    console.log('  ✗ no isCombatPatrol detachment found in appdata — box may have been removed/renamed')
    flaggedTotal++
    continue
  }

  const lines = []
  if (norm(det.name) !== norm(faction.boxName)) lines.push(`  ~ box name: wh11ed="${faction.boxName}" appdata="${det.name}"`)
  if (String(det.dp ?? '') !== String(faction.dp ?? '')) lines.push(`  ~ dp: wh11ed=${faction.dp} appdata=${det.dp}`)
  if (norm(det.forceDisposition) !== norm(faction.forceDisposition)) {
    lines.push(`  ~ forceDisposition: wh11ed="${faction.forceDisposition}" appdata="${det.forceDisposition}"`)
  }

  const appRule = (det.rules || [])[0]
  if (!appRule) lines.push('  + missing in appdata: detachment rule (was there one before?)')
  else if (norm(appRule.name) !== norm(faction.rule.name)) {
    lines.push(`  ~ detachment rule name: wh11ed="${faction.rule.name}" appdata="${appRule.name}"`)
  }

  // The army rule(s) linked to THIS box's own "Combat Patrol: <name>" publication — can be
  // different appdata rows (and different wording) than the faction's normal Codex army rule(s).
  // Some factions (Dark Angels, Black Templars, Blood Angels, T'au…) link MORE THAN ONE CP army
  // rule — wh11ed combines them into one armyRule.name (e.g. "Oath of Moment & The Unforgiven"),
  // same convention as sync-army-rule-coverage.mjs's normal-content equivalent — so check each
  // CP-linked row's name is represented in the combined wh11ed name, not an exact 1:1 match.
  const bundleArmyRuleIds = new Set((bundle.armyRules || []).map((r) => r.id))
  const cpArmyRuleRows = read('army_rule.json').filter((r) => cpPubIds.has(r.publicationId) && bundleArmyRuleIds.has(r.id))
  if (!cpArmyRuleRows.length) {
    lines.push('  + missing in appdata: an army rule linked to this box\'s Combat Patrol publication')
  } else {
    const combinedName = norm(faction.armyRule.name)
    for (const row of cpArmyRuleRows) {
      if (!combinedName.includes(norm(row.name))) {
        lines.push(`  ~ army rule name: wh11ed="${faction.armyRule.name}" missing appdata rule "${row.name}"`)
      }
    }
  }

  lines.push(...diffSet('stratagem', (faction.stratagems || []).map((s) => s.name), (det.stratagems || []).map((s) => s.name)))
  lines.push(...diffSet('enhancement', (faction.enhancements || []).map((e) => e.name), (det.enhancements || []).map((e) => e.name)))

  for (const appEnh of det.enhancements || []) {
    const whEnh = (faction.enhancements || []).find((e) => norm(e.name) === norm(appEnh.name))
    if (!whEnh) continue // already flagged by diffSet above
    const appDefault = enhDefaultById.get(appEnh.id) ?? false
    if (!!whEnh.isDefault !== appDefault) {
      lines.push(`  ~ enhancement "${appEnh.name}" isDefault: wh11ed=${!!whEnh.isDefault} appdata=${appDefault}`)
    }
  }

  const cpDsNames = (bundle.datasheets || []).filter((d) => d.isCombatPatrol).map((d) => d.name)
  lines.push(...diffSet('datasheet', (faction.datasheets || []).map((d) => d.name), cpDsNames))

  console.log(lines.length ? lines.join('\n') : '  clean')
  flaggedTotal += lines.length
}

// Phase 3 punch list: every appdata faction with a Combat Patrol box not yet in combatPatrol.js.
const authoredAppSlugs = new Set(combatPatrol.en.factions.map((f) => SLUG_MAP[f.slug] || f.slug))
const notYetAuthored = []
for (const file of fs.readdirSync(path.join(APPDATA, 'factions')).filter((f) => f.endsWith('.json'))) {
  const appSlug = file.replace(/\.json$/, '')
  if (authoredAppSlugs.has(appSlug)) continue
  const bundle = loadJson(path.join(APPDATA, 'factions', file))
  if (bundle?.detachments?.some((d) => d.isCombatPatrol)) notYetAuthored.push(appSlug)
}
if (notYetAuthored.length) {
  console.log(`\n${notYetAuthored.length} faction(s) with a Combat Patrol box not yet authored in src/data/combatPatrol.js:`)
  console.log('  ' + notYetAuthored.sort().join(', '))
}

// combatPatrolIndex.js is a hand-maintained lightweight mirror of combatPatrol.js (slug/name/
// boxName only — see its header comment for why: router/index.js and useSeoMeta.js read it
// instead of statically importing the full datasheet-bearing combatPatrol.js). Catch drift here
// since nothing else enforces the two files staying in sync.
const indexBySlug = new Map(combatPatrolIndex.map((f) => [f.slug, f]))
const indexLines = []
for (const faction of combatPatrol.en.factions) {
  const idx = indexBySlug.get(faction.slug)
  if (!idx) { indexLines.push(`  + missing in combatPatrolIndex.js: "${faction.slug}"`); continue }
  if (idx.name !== faction.name) indexLines.push(`  ~ combatPatrolIndex.js name: "${idx.name}" vs combatPatrol.js "${faction.name}"`)
  if (idx.boxName !== faction.boxName) indexLines.push(`  ~ combatPatrolIndex.js boxName: "${idx.boxName}" vs combatPatrol.js "${faction.boxName}"`)
}
for (const slug of indexBySlug.keys()) {
  if (!combatPatrol.en.factions.some((f) => f.slug === slug)) indexLines.push(`  + extra in combatPatrolIndex.js (not in combatPatrol.js): "${slug}"`)
}
if (indexLines.length) {
  console.log(`\n=== combatPatrolIndex.js drift ===`)
  console.log(indexLines.join('\n'))
  flaggedTotal += indexLines.length
}

console.log(`\n${flaggedTotal ? '✗' : '✓'} combat patrol: ${combatPatrol.en.factions.length} faction(s) authored, ${flaggedTotal} issue(s) flagged.`)
process.exitCode = flaggedTotal ? 1 : 0

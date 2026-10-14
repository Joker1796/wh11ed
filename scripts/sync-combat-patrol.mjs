// Report-only audit: src/data/combatPatrol.js (hand-authored Combat Patrol box content) vs
// wh40k-appdata's isCombatPatrol-flagged rows for the same box — the mirror image of every
// other sync-*.mjs script, which instead DROPS this content (see combatPatrolNames() in
// lib/sync-common.mjs). Checks, per authored box (matched by box name): the CP detachment's DP/Force
// Disposition, the detachment rule's name, which army-rule row is linked to the box's own
// "Combat Patrol: <name>" publication (this can genuinely differ in wording from the faction's
// normal Codex army rule — see the pre-errata "reanimates D3" note in combatPatrol.js), the
// stratagem/enhancement/datasheet name sets, and each enhancement's isCombatPatrolDefault flag
// (from tables/enhancement.json — the faction bundle's own enhancement objects don't carry it).
// Presence/name-only, like sync-wargear-options.mjs/sync-layouts.mjs — not a prose diff (that's
// sync-faction-text.mjs's job for normal content; CP boxes are small enough to eyeball by hand).
//
// Also scans every faction bundle in wh40k-appdata/factions/ for an isCombatPatrol detachment and
// reports which BOXES aren't authored in combatPatrol.js yet (a faction can have several).
//
// Until 2026-10-14 the army-rule check read `row.name` off army_rule.json, whose names live in
// `localisations` — every name was '' and every check passed. It reads nameOfEn() now.
//
// Report only — nothing is written (combatPatrol.js is hand-authored prose, same rule as every
// other faction data file). Usage: node scripts/sync-combat-patrol.mjs (also run as part of
// `npm run sync`).
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { APPDATA, SLUG_MAP, norm, nameOfEn, loadJson, diffSet, allFactionBundles, table as read } from './lib/sync-common.mjs'
import { combatPatrol } from '../src/data/combatPatrol.js'
import { combatPatrolIndex } from '../src/data/combatPatrolIndex.js'


export async function run() {
// One appdata Combat Patrol publication per BOX ("Combat Patrol: <box name>"), and a faction can
// have several (Adeptus Custodes: three since data 981) — so every authored box is matched to its
// own detachment, publication, army-rule rows and datasheets by box name, never "the faction's
// CP detachment".
const cpPubs = read('publication.json').filter((p) => p.isCombatPatrol)
const cpPubByBox = new Map(cpPubs.map((p) => [norm(nameOfEn(p).replace(/^Combat Patrol:\s*/i, '')), p]))
const pubOfDatasheet = new Map(read('datasheet.json').map((d) => [d.id, d.publicationId]))
const armyRuleRows = read('army_rule.json')
const enhDefaultById = new Map(read('enhancement.json').map((r) => [r.id, !!r.isCombatPatrolDefault]))

let flaggedTotal = 0

for (const box of combatPatrol.en.factions) {
  const appSlug = SLUG_MAP[box.slug] || box.slug
  const bundle = loadJson(path.join(APPDATA, 'factions', `${appSlug}.json`))
  console.log(`\n=== ${box.id} (${box.boxName}) ===`)
  if (!bundle) {
    console.log('  ✗ no appdata bundle found — check SLUG_MAP or spelling')
    flaggedTotal++
    continue
  }

  const det = (bundle.detachments || []).find((d) => d.isCombatPatrol && norm(d.name) === norm(box.boxName))
  if (!det) {
    const others = (bundle.detachments || []).filter((d) => d.isCombatPatrol).map((d) => d.name)
    console.log(`  ✗ no isCombatPatrol detachment named "${box.boxName}" in appdata (the faction has: ${others.join(', ') || 'none'}) — box removed or renamed?`)
    flaggedTotal++
    continue
  }
  const pub = cpPubByBox.get(norm(det.name))

  const lines = []
  if (!pub) lines.push(`  ✗ no "Combat Patrol: ${det.name}" publication in appdata`)
  if (String(det.dp ?? '') !== String(box.dp ?? '')) lines.push(`  ~ dp: wh11ed=${box.dp} appdata=${det.dp}`)
  if (norm(det.forceDisposition) !== norm(box.forceDisposition)) {
    lines.push(`  ~ forceDisposition: wh11ed="${box.forceDisposition}" appdata="${det.forceDisposition}"`)
  }

  const appRule = (det.rules || [])[0]
  if (!appRule) lines.push('  + missing in appdata: detachment rule (was there one before?)')
  else if (norm(appRule.name) !== norm(box.rule.name)) {
    lines.push(`  ~ detachment rule name: wh11ed="${box.rule.name}" appdata="${appRule.name}"`)
  }

  // The box's datasheets: the ones appdata files under this box's own publication.
  const boxSheets = (bundle.datasheets || []).filter((d) => d.isCombatPatrol && pub && pubOfDatasheet.get(d.id) === pub.id)

  // The army rule(s) linked to THIS box's own "Combat Patrol: <name>" publication — can be
  // different appdata rows (and different wording) than the faction's normal Codex army rule(s).
  // Some factions (Dark Angels, Black Templars, Blood Angels, T'au…) link MORE THAN ONE CP army
  // rule — wh11ed combines them into one armyRule.name (e.g. "Oath of Moment & The Unforgiven"),
  // same convention as sync-army-rule-coverage.mjs's normal-content equivalent — so check each
  // CP-linked row's name is represented in the combined wh11ed name, not an exact 1:1 match.
  // A box that prints no army rule of its own (the Aquilan boxes, 981) uses the Codex rules its
  // datasheets carry as faction abilities — those names are checked instead.
  const bundleArmyRuleIds = new Set((bundle.armyRules || []).map((r) => r.id))
  const ownRows = pub ? armyRuleRows.filter((r) => r.publicationId === pub.id && bundleArmyRuleIds.has(r.id)) : []
  const armyRuleNames = ownRows.length
    ? ownRows.map(nameOfEn)
    : [...new Set(boxSheets.flatMap((d) => (d.abilities || []).filter((a) => a.type === 'faction').map((a) => a.name)))]
  if (!armyRuleNames.length) {
    lines.push('  + missing in appdata: an army rule linked to this box (own publication or its datasheets)')
  } else {
    const combinedName = norm(box.armyRule.name)
    for (const name of armyRuleNames) {
      if (!combinedName.includes(norm(name))) {
        lines.push(`  ~ army rule name: wh11ed="${box.armyRule.name}" missing appdata rule "${name}"`)
      }
    }
  }

  lines.push(...diffSet('stratagem', (box.stratagems || []).map((s) => s.name), (det.stratagems || []).map((s) => s.name)))
  lines.push(...diffSet('enhancement', (box.enhancements || []).map((e) => e.name), (det.enhancements || []).map((e) => e.name)))

  for (const appEnh of det.enhancements || []) {
    const whEnh = (box.enhancements || []).find((e) => norm(e.name) === norm(appEnh.name))
    if (!whEnh) continue // already flagged by diffSet above
    const appDefault = enhDefaultById.get(appEnh.id) ?? false
    if (!!whEnh.isDefault !== appDefault) {
      lines.push(`  ~ enhancement "${appEnh.name}" isDefault: wh11ed=${!!whEnh.isDefault} appdata=${appDefault}`)
    }
  }

  lines.push(...diffSet('datasheet', (box.datasheets || []).map((d) => d.name), boxSheets.map((d) => d.name)))

  console.log(lines.length ? lines.join('\n') : '  clean')
  flaggedTotal += lines.length
}

// Every appdata Combat Patrol box not authored in combatPatrol.js yet — per box, not per faction:
// a faction with one box authored can still have another one missing.
const authored = new Set(combatPatrol.en.factions.map((b) => `${SLUG_MAP[b.slug] || b.slug}|${norm(b.boxName)}`))
const notYetAuthored = []
for (const { appSlug, bundle } of allFactionBundles()) {
  for (const d of bundle?.detachments || []) {
    if (d.isCombatPatrol && !authored.has(`${appSlug}|${norm(d.name)}`)) notYetAuthored.push(`${appSlug}: ${d.name}`)
  }
}
if (notYetAuthored.length) {
  console.log(`\n${notYetAuthored.length} Combat Patrol box(es) in appdata not yet authored in src/data/combatPatrol.js:`)
  console.log('  ' + notYetAuthored.sort().join('\n  '))
  flaggedTotal += notYetAuthored.length
}

// combatPatrolIndex.js is a hand-maintained lightweight mirror of combatPatrol.js (id/slug/name/
// boxName only — see its header comment for why: router/nav.js and seoMetaData.js read it
// instead of statically importing the full datasheet-bearing combatPatrol.js). Catch drift here
// since nothing else enforces the two files staying in sync — per box id, in the same order.
const indexById = new Map(combatPatrolIndex.map((b) => [b.id, b]))
const indexLines = []
const ids = combatPatrol.en.factions.map((b) => b.id)
if (new Set(ids).size !== ids.length) indexLines.push(`  ✗ duplicate box id in combatPatrol.js: ${ids.filter((id, i) => ids.indexOf(id) !== i).join(', ')}`)
for (const box of combatPatrol.en.factions) {
  const idx = indexById.get(box.id)
  if (!idx) { indexLines.push(`  + missing in combatPatrolIndex.js: "${box.id}"`); continue }
  for (const key of ['slug', 'name', 'boxName']) {
    if (idx[key] !== box[key]) indexLines.push(`  ~ combatPatrolIndex.js ${box.id}.${key}: "${idx[key]}" vs combatPatrol.js "${box[key]}"`)
  }
}
for (const id of indexById.keys()) {
  if (!ids.includes(id)) indexLines.push(`  + extra in combatPatrolIndex.js (not in combatPatrol.js): "${id}"`)
}
if (ids.join() !== combatPatrolIndex.map((b) => b.id).filter((id) => ids.includes(id)).join()) {
  indexLines.push('  ~ combatPatrolIndex.js lists the boxes in a different order than combatPatrol.js')
}
if (indexLines.length) {
  console.log(`\n=== combatPatrolIndex.js drift ===`)
  console.log(indexLines.join('\n'))
  flaggedTotal += indexLines.length
}

console.log(`\n${flaggedTotal ? '✗' : '✓'} combat patrol: ${combatPatrol.en.factions.length} box(es) authored, ${flaggedTotal} issue(s) flagged.`)
return flaggedTotal ? 1 : 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())

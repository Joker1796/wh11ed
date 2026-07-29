// Report-only guardrail for the Event Companion's 45 Terrain Layout diagrams
// (src/data/eventCompanion.js's `matchups[]`/`layoutImages`, extracted from the app's APK by
// scripts/extract-layout-images.mjs) against wh40k-appdata's structural mission_layout family.
//
// Investigated per APPDATA-COVERAGE-PLAN.md's open question: appdata does NOT carry the layout
// artwork itself (that only exists as a compiled APK resource, see extract-layout-images.mjs's own
// header), but it DOES fully encode the layout<->matchup<->A/B/C pairing, cross-checked two ways:
//   - `mission_layout.json` (48 rows: 45 real "X / Y - Layout Z" + 3 unused generic placeholders)
//     — the same table extract-layout-images.mjs already parses to name its output files.
//   - `force_disposition_mission.json` (25 ordered friendly/opposition pairs) +
//     `force_disposition_mission_recommended_preset.json` (75 rows, 3 per pair) +
//     `mission_preset.json` (links a preset to its layout + a named `mission_deployment.json`
//     deployment map, e.g. "Hammer and Anvil") — GW's own "recommended" A/B/C assignment per
//     matchup, independent of the mission_layout row names. Confirmed self-consistent: every
//     ordered pair's 3 recommended presets resolve to distinct A/B/C letters whose own
//     mission_layout name matches that same disposition pair (2026-07-29 spot-check, all 25).
//
// This script re-derives that cross-check as a standing guardrail so a future appdata bump that
// renames/reshuffles/adds a layout or matchup gets caught here, without needing to download and
// re-extract the (large) app .xapk just to notice the pictures look wrong. It does NOT and cannot
// guard the artwork itself, the hand-read attacker/defender edge orientation (layoutEdges — not in
// appdata, read from the source PDF's vector markers), or the 9 named "Deployment Maps" (Hammer
// and Anvil, Crucible of Battle, Sweeping Engagement, Search and Destroy, Dawn of War, Tipping
// Point, +3 Combat-Patrol-only — printed here for visibility only; wh11ed's Terrain & Layouts page
// doesn't currently surface this name anywhere, a possible future enrichment, not a bug).
//
// Usage: node scripts/sync-layouts.mjs
import path from 'node:path'
import { ROOT, APPDATA, loadJson, loadModule } from './lib/sync-common.mjs'

const T = (f) => loadJson(path.join(APPDATA, 'tables', f)) || []

const fdRows = T('force_disposition.json')
const fdName = Object.fromEntries(fdRows.map((r) => [r.id, r.localisations?.en?.name]))

const mod = await loadModule(path.join(ROOT, 'src/data/eventCompanion.js'))
const en = mod.getEventContent('en')
const DISPOSITIONS = en.dispositions.map((d) => d.name)
const MATCHUPS = en.matchups.map((m) => [m.a, m.b])
const slugByName = new Map(en.dispositions.map((d) => [d.name, d.id]))
const nameBySlug = new Map(en.dispositions.map((d) => [d.id, d.name]))

const out = []

// ── 1. Force Disposition set (5 names, exact match) ─────────────────────────────────────
const appDispNames = new Set(fdRows.map((r) => r.localisations?.en?.name))
const whDispNames = new Set(DISPOSITIONS)
for (const n of appDispNames) if (!whDispNames.has(n)) out.push(`  + missing in wh11ed: Force Disposition "${n}"`)
for (const n of whDispNames) if (!appDispNames.has(n)) out.push(`  - extra in wh11ed (not in appdata): Force Disposition "${n}"`)

// ── 2. mission_layout: parse all real rows, map to (unordered slug pair, letter) ─────────
function parseLayoutName(name) {
  const m = name.match(/^(.+?) \/ (.+?) - Layout ([ABC])$/)
  if (!m) return null
  const [, nameA, nameB, letter] = m
  const slugA = slugByName.get(nameA)
  const slugB = slugByName.get(nameB)
  if (!slugA || !slugB) return null // generic placeholder ("Mission Layout A/B/C") or CP row
  return { slugA, slugB, letter }
}

const mlRows = T('mission_layout.json')
const layoutByKey = new Map() // "a|b|letter" (sorted a,b) -> appdata row
const unorderedKey = (a, b, letter) => [a, b].sort().join('|') + '|' + letter
for (const row of mlRows) {
  const parsed = parseLayoutName(row.localisations?.en?.name || '')
  if (!parsed) continue
  layoutByKey.set(unorderedKey(parsed.slugA, parsed.slugB, parsed.letter), row)
}

// wh11ed's own 45 expected (matchup, letter) triples
const expectedKeys = new Set()
for (const [a, b] of MATCHUPS) for (const letter of ['A', 'B', 'C']) expectedKeys.add(unorderedKey(a, b, letter))

for (const key of expectedKeys) {
  if (!layoutByKey.has(key)) {
    const [ab, letter] = [key.slice(0, key.lastIndexOf('|')), key.slice(key.lastIndexOf('|') + 1)]
    out.push(`  ! wh11ed matchup/letter "${ab.split('|').map((s) => nameBySlug.get(s)).join(' / ')} - Layout ${letter}" has no appdata mission_layout row (renamed/removed upstream?)`)
  }
}
for (const [key] of layoutByKey) {
  if (!expectedKeys.has(key)) {
    const [ab, letter] = [key.slice(0, key.lastIndexOf('|')), key.slice(key.lastIndexOf('|') + 1)]
    out.push(`  + appdata has a real layout wh11ed doesn't cover: "${ab.split('|').map((s) => nameBySlug.get(s)).join(' / ')} - Layout ${letter}" (new matchup/letter added upstream?)`)
  }
}

// ── 3. Recommended-preset chain: cross-check letters + deployment maps, informational ───
const fdmRows = T('force_disposition_mission.json')
const presetsByFdm = {}
for (const r of T('force_disposition_mission_recommended_preset.json')) {
  ;(presetsByFdm[r.forceDispositionMissionId] ||= []).push(r.missionPresetId)
}
const mpById = Object.fromEntries(T('mission_preset.json').map((r) => [r.id, r]))
const mlById = Object.fromEntries(mlRows.map((r) => [r.id, r.localisations?.en?.name]))
const mdById = Object.fromEntries(T('mission_deployment.json').map((r) => [r.id, r.localisations?.en?.name]))

const deploymentInfo = new Map() // unordered "a|b|letter" -> deployment map name, for the printout below
let recommendedIssues = 0
for (const row of fdmRows) {
  const friendly = fdName[row.friendlyForceDispositionId]
  const opposition = fdName[row.oppositionForceDispositionId]
  const presetIds = presetsByFdm[row.id] || []
  if (presetIds.length !== 3) {
    out.push(`  ! ${friendly} -> ${opposition}: expected 3 recommended presets, appdata has ${presetIds.length}`)
    recommendedIssues++
    continue
  }
  const letters = new Set()
  for (const pid of presetIds) {
    const preset = mpById[pid]
    const layoutName = mlById[preset?.missionLayoutId]
    const parsed = layoutName && parseLayoutName(layoutName)
    if (!parsed) {
      out.push(`  ! ${friendly} -> ${opposition}: recommended preset ${pid} has an unparseable layout name "${layoutName}"`)
      recommendedIssues++
      continue
    }
    letters.add(parsed.letter)
    const pairSlugs = [parsed.slugA, parsed.slugB].sort()
    const expectedSlugs = [slugByName.get(friendly), slugByName.get(opposition)].sort()
    if (pairSlugs[0] !== expectedSlugs[0] || pairSlugs[1] !== expectedSlugs[1]) {
      out.push(`  ! ${friendly} -> ${opposition}: recommended preset's own layout is for a DIFFERENT pair ("${layoutName}")`)
      recommendedIssues++
    }
    deploymentInfo.set(unorderedKey(parsed.slugA, parsed.slugB, parsed.letter), mdById[preset.missionDeploymentId])
  }
  if (letters.size !== 3) {
    out.push(`  ! ${friendly} -> ${opposition}: recommended presets don't cover distinct A/B/C (got ${[...letters].join(',')})`)
    recommendedIssues++
  }
}

console.log('=== Terrain Layouts vs wh40k-appdata mission_layout family ===')
if (!out.length) console.log('  no issues found — all 45 matchup/letter combos match appdata, recommended-preset chain consistent')
else out.forEach((l) => console.log(l))

console.log('\n--- Deployment map per layout (informational — appdata has this, wh11ed does not currently display it) ---')
for (const [a, b] of MATCHUPS) {
  const names = ['A', 'B', 'C'].map((letter) => deploymentInfo.get(unorderedKey(a, b, letter)) || '?')
  console.log(`  ${nameBySlug.get(a)} / ${nameBySlug.get(b)}: A=${names[0]}  B=${names[1]}  C=${names[2]}`)
}

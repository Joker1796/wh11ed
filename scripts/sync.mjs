// One command to re-audit wh11ed against wh40k-appdata after a data_version bump. Runs every
// report-only reconciliation script in turn (in-process — each is imported and its `run()`
// called directly, not spawned as a child process, so all the appdata table/bundle reads they
// share go through sync-common.mjs's memoized loadJson()/allFactionBundles() exactly once
// instead of being re-parsed from disk by every script) and prints a single consolidated report:
//   - version check   — is appdata newer than what this repo was last synced against?
//   - sourceIds        — is the stable-id bridge (src/data/sourceIds.json) up to date?
//   - conditionalKeywords — is the rule-granted-keywords sidecar (Deathwing/Battleline/…) fresh?
//   - factionFaq       — is the per-faction FAQ/errata sidecar (src/data/factionFaq.json) fresh?
//   - factionLegends   — is the Legends prose sidecar (src/data/factionLegends.json — the
//     "Warhammer Legends" intro and the Legendary Proxies table of a "Legends: <Faction>"
//     publication) fresh, and does every proxy still resolve to a datasheet of ours?
//   - rosterTextsRu    — is the generated Russian for the roster's wargear group instructions
//     current with src/data/roster/items.js?
//   - roster data      — are the roster builder's generated faction files (points, brackets,
//     wargear groups) still what the generator produces from today's appdata + MFM?
//   - rosterModifiers  — are the roster builder's numeric modifiers still tied to the rule wording
//     they were read from? Reports stale (the prose moved under a reviewed record), new (prose
//     that now looks like it changes a number), orphaned and unreviewed — see
//     src/components/roster/CLAUDE.md → "Tier C"
//   - sync-appdata     — faction/datasheet structure, scalars, renames (all factions)
//   - sync-faction-text — faction rule/stratagem/enhancement/ability PROSE vs the canon (errata drift)
//   - sync-tracker     — Game Tracker rule content (missions, twists, battle sizes, …)
//   - check-rule-omissions — THE GATE: appdata Core Rules text (a line, or one load-bearing word
//     inside a line) that wh11ed does not carry. Non-zero exit; everything else here is report-only
//   - check-detachment-meta — THE OTHER GATE: a faction rules page's detachment dp /
//     forceDisposition vs the MFM (the surface sync-tracker's MFM↔appdata diff never looked at).
//     Non-zero exit
//   - check-weapon-abilities — GATE: every weapon tag printed on a datasheet ([BLAST],
//     [PLASMA WARHEAD], …) must have text either in reference.js or on that datasheet. Non-zero exit
//   - check-datasheet-rules — GATE: a named rule appdata files on a datasheet (SUPREME COMMANDER,
//     "Using Sir Hekhtur", …) must be carried somewhere on wh11ed's sheet. Non-zero exit
//   - check-core-grants — GATE: a rule whose prose hands a unit a CORE ability must say so in the
//     modifier layer, so the roster card prints it on its Core line. Non-zero exit
//   - check-emphasis — GATE: emphasis the canon carries that our prose dropped — a core ability
//     named in a sentence, a keyword that lost its capitals. Non-zero exit
//   - sync-core        — core rulebook prose (sections 01-25)
//   - sync-event-companion — Event Companion + Teams supplement prose (Doubles/Dominatus are out
//     of scope by product decision, inventoried only) and the 6 Twists (mission_twist.json)
//   - sync-enh-bodyguards — enhancements that grant an attach must carry the attach note
//   - sync-leader-units — a Character's leader.units must match appdata's Leader/Support list
//   - sync-detachment-details — a detachment's Restrictions/Keywords card-box text (a table pair
//     none of the above ever reads) must be reflected in its wh11ed rule body
//   - sync-wargear-options — a datasheet's structural wargear choices/limits (loadout/limited/
//     all-model choice families + base loadout) must be reflected in its options/loadout text
//   - sync-ally-inclusion — a detachment's allied-faction clause (Blood Legions, Harlequins in
//     Reaper's Wager, Scintillating Legions, …) must be reflected in its rule body or the
//     faction's armyRule, with the right points brackets
//   - sync-roster-restrictions — a named unit's default roster-wide cap (Patriarch, Death
//     Jester/Shadowseer/Troupe Master, …), a detachment override of that cap (Houndpack Lance,
//     Ghosts of the Webway, …), and detachment-/faction-scoped excluded datasheets (Black
//     Templars, Deathwatch, Shadow Legion, …) must be reflected in wh11ed's text
//   - sync-enhancement-restrictions — an enhancement's leading "X model/unit only[, excluding Y]"
//     eligibility clause must be reflected in wh11ed's enhancement body
//   - sync-army-rule-coverage — every distinctly-named appdata army rule for a faction (not just
//     the one wh11ed's single armyRule is named after) must be represented somewhere in that
//     faction's data
//   - sync-layouts — the Event Companion's 45 Terrain Layout diagrams (matchup + A/B/C) must
//     still match appdata's mission_layout family (catches a rename/reshuffle/add without needing
//     to re-download and re-extract the app .xapk)
//   - sync-combat-patrol — src/data/combatPatrol.js (hand-authored Combat Patrol box content) vs
//     appdata's isCombatPatrol-flagged rows, faction-by-faction, plus a punch list of factions
//     with a CP box not yet authored
//
// Report only — nothing is written (except that you may want to run `gen-source-ids.mjs` if the
// bridge is stale). Usage: `npm run sync` (or `node scripts/sync.mjs`).
//
// See DATA-SYNC.md for the full procedure this feeds into (classifying findings, the RU-follows-
// EN-immediately rule, the local session log, closing out a data_version bump).
import { SYNCED_DATA_VERSION, appdataDataVersion } from './lib/sync-common.mjs'
import { applyBaseline, findingKey, loadBaseline, writeBaseline, BASELINE_PATH } from './lib/sync-baseline.mjs'

// `--baseline` records every finding this run produced as accepted (scripts/lib/sync-baseline.json)
// rather than filtering against it. Read that file's own header before reaching for it.
const RECORD_BASELINE = process.argv.includes('--baseline')
const baseline = RECORD_BASELINE ? {} : loadBaseline()
const seenKeys = new Set()
const recorded = {}
let totalSuppressed = 0

// Each check runs in the SAME process as every other — a thrown exception in one (a new appdata
// shape a script didn't expect, say) must not take down the rest of the audit the way it would
// have for every OTHER section if this were still spawnSync-per-script. Catch and report inline.
async function run(label, modulePath, args = [], { filtered = false } = {}) {
  console.log(`\n${'═'.repeat(72)}\n▶ ${label}\n${'═'.repeat(72)}`)
  // The GATES and the `--check` staleness probes are never filtered: their output IS the verdict,
  // and a suppressed gate line is a gate that has stopped gating. Only the report-only sections go
  // through the baseline, and they say so at their own call site.
  if (!filtered) {
    try {
      const mod = await import(modulePath)
      return (await mod.run(args)) || 0
    } catch (err) {
      console.log(`  ✗ ${label} crashed: ${err.stack || err}`)
      return 1
    }
  }

  // Captured rather than printed as it goes: a finding owns the lines indented under it, so
  // whether to drop one can only be decided with the whole section in hand.
  const buffered = []
  const real = console.log
  console.log = (...a) => buffered.push(...a.join(' ').split('\n'))
  let code
  try {
    const mod = await import(modulePath)
    code = (await mod.run(args)) || 0
  } catch (err) {
    buffered.push(`  ✗ ${label} crashed: ${err.stack || err}`)
    code = 1
  } finally {
    console.log = real
  }

  const { kept, suppressed, seen } = applyBaseline(buffered, baseline)
  for (const k of seen) {
    seenKeys.add(k)
    if (RECORD_BASELINE) recorded[k] = ''
  }
  totalSuppressed += suppressed
  for (const line of kept) console.log(line)
  if (suppressed) console.log(`  · ${suppressed} known finding(s) suppressed by the baseline`)
  return code
}

console.log(`${'═'.repeat(72)}\n▶ appdata data_version\n${'═'.repeat(72)}`)
const current = appdataDataVersion()
if (current == null) {
  console.log('  ⚠ could not read wh40k-appdata/tables/_meta.json — is the sibling repo cloned?')
} else if (current === SYNCED_DATA_VERSION) {
  console.log(`  in sync: appdata is ${current}, matches SYNCED_DATA_VERSION.`)
} else {
  console.log(`  ⚠ appdata is ${current}, but this repo was last synced against ${SYNCED_DATA_VERSION}.`)
  console.log('    Re-run this audit, apply findings, then bump SYNCED_DATA_VERSION in scripts/lib/sync-common.mjs.')
}

const idsStale = await run('sourceIds bridge (--check)', './gen-source-ids.mjs', ['--check'])
const condKwStale = await run('conditionalKeywords sidecar (--check)', './gen-conditional-keywords.mjs', ['--check'])
const faqStale = await run('factionFaq sidecar (--check)', './gen-faction-faq.mjs', ['--check'])
const legendsStale = await run('factionLegends sidecar (--check)', './gen-faction-legends.mjs', ['--check'])
const textsRuStale = await run('rosterTextsRu (--check)', './gen-roster-texts-ru.mjs', ['--check'])
const modsDirty = await run('rosterModifiers (--check)', './gen-roster-modifiers.mjs', ['--check'])
const rosterStale = await run('roster data (--check)', './gen-roster-data.mjs', ['--check'])
// The gate goes FIRST: it is the one section of this audit that can fail, and it is three lines
// long. Everything below it is a long report-only diff, and a verdict printed after 5000 lines of
// those is a verdict nobody reads.
const omissionsFailed = await run('check-rule-omissions (GATE)', './check-rule-omissions.mjs')
const detMetaFailed = await run('check-detachment-meta (GATE)', './check-detachment-meta.mjs')
const wTagsFailed = await run('check-weapon-abilities (GATE)', './check-weapon-abilities.mjs')
const dsRulesFailed = await run('check-datasheet-rules (GATE)', './check-datasheet-rules.mjs')
const coreGrantsFailed = await run('check-core-grants (GATE)', './check-core-grants.mjs')
const emphasisFailed = await run('check-emphasis (GATE)', './check-emphasis.mjs')
const layoutArtFailed = await run('check-layout-art (GATE)', './check-layout-art.mjs')
const companionsFailed = await run('check-companion-pdfs (GATE)', './check-companion-pdfs.mjs')
await run('sync-appdata (all factions)', './sync-appdata.mjs', ['--all'], { filtered: true })
await run('sync-faction-text (all factions)', './sync-faction-text.mjs', ['--all'], { filtered: true })
await run('sync-tracker', './sync-tracker.mjs', [], { filtered: true })
await run('sync-core', './sync-core.mjs', [], { filtered: true })
await run('sync-event-companion', './sync-event-companion.mjs', [], { filtered: true })
await run('sync-enh-bodyguards', './sync-enh-bodyguards.mjs', [], { filtered: true })
await run('sync-leader-units', './sync-leader-units.mjs', [], { filtered: true })
await run('sync-detachment-details', './sync-detachment-details.mjs', [], { filtered: true })
await run('sync-wargear-options', './sync-wargear-options.mjs', [], { filtered: true })
await run('sync-ally-inclusion', './sync-ally-inclusion.mjs', [], { filtered: true })
await run('sync-roster-restrictions', './sync-roster-restrictions.mjs', [], { filtered: true })
await run('sync-enhancement-restrictions', './sync-enhancement-restrictions.mjs', [], { filtered: true })
await run('sync-army-rule-coverage', './sync-army-rule-coverage.mjs', [], { filtered: true })
await run('sync-layouts', './sync-layouts.mjs', [], { filtered: true })
await run('sync-combat-patrol', './sync-combat-patrol.mjs', [], { filtered: true })

console.log(`\n${'═'.repeat(72)}`)
if (idsStale) console.log('⚠ src/data/sourceIds.json is stale — run `node scripts/gen-source-ids.mjs`.')
if (condKwStale) console.log('⚠ src/data/conditionalKeywords.json is stale — run `node scripts/gen-conditional-keywords.mjs`.')
if (faqStale) console.log('⚠ src/data/factionFaq.json is stale — run `node scripts/gen-faction-faq.mjs`.')
if (legendsStale) console.log('⚠ src/data/factionLegends.json is stale or a proxy points nowhere — run `npm run legends`.')
if (textsRuStale) console.log('⚠ src/data/roster/ru/texts.js is stale — run `npm run roster:texts-ru`.')
if (modsDirty) console.log('⚠ roster modifiers need attention — `npm run modifiers` then `npm run modifiers:queue`.')
if (rosterStale) console.log('⚠ src/data/roster/*.js is stale — run `npm run roster:data`.')
if (omissionsFailed) console.log('✗ core rules are MISSING appdata text — see the check-rule-omissions section (`npm run omissions`).')
if (detMetaFailed) console.log('✗ a faction rules page disagrees with the MFM on dp / Force Disposition (`npm run detmeta`).')
if (wTagsFailed) console.log('✗ a weapon tag on a datasheet has no text anywhere (`npm run wtags`).')
if (dsRulesFailed) console.log('✗ a datasheet rule appdata prints is missing from ours (`npm run dsrules`).')
if (coreGrantsFailed) console.log('✗ a rule grants a core ability the modifier layer does not carry (`npm run coregrants`).')
if (emphasisFailed) console.log('✗ prose dropped emphasis the canon carries (`npm run emphasis`).')
if (layoutArtFailed) console.log('✗ the Event Companion layout diagrams do not match the app\'s artwork (`npm run layouts`).')
if (companionsFailed) console.log('✗ an Event Companion PDF moved on without us (`npm run companions`).')
if (RECORD_BASELINE) {
  const n = writeBaseline(recorded)
  console.log(`✓ baseline written: ${n} finding(s) recorded as accepted in ${BASELINE_PATH}.`)
  console.log('  Read the diff before committing it — every line in there is a decision.')
} else {
  if (totalSuppressed) console.log(`· ${totalSuppressed} known finding(s) suppressed by scripts/lib/sync-baseline.json.`)
  // An entry that matched nothing is either a finding that got fixed or one whose wording moved —
  // and the second case is a baseline quietly hiding something else. Same reasoning as
  // check-rule-omissions.mjs reporting a stale ALLOW entry.
  const stale = Object.keys(baseline).filter((k) => !seenKeys.has(findingKey(k)))
  if (stale.length) {
    console.log(`⚠ ${stale.length} baseline entr(ies) matched nothing this run — fixed, or reworded:`)
    for (const k of stale.slice(0, 20)) console.log(`    ${k}`)
    if (stale.length > 20) console.log(`    …and ${stale.length - 20} more`)
    console.log('  Re-record with `npm run sync -- --baseline` once you have read why.')
  }
}
console.log('Done. Every section above is report-only; read the flagged lines and fix by hand.')

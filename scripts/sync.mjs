// One command to re-audit wh11ed against wh40k-appdata after a data_version bump. Runs every
// report-only reconciliation script in turn and prints a single consolidated report:
//   - version check   — is appdata newer than what this repo was last synced against?
//   - sourceIds        — is the stable-id bridge (src/data/sourceIds.json) up to date?
//   - conditionalKeywords — is the rule-granted-keywords sidecar (Deathwing/Battleline/…) fresh?
//   - factionFaq       — is the per-faction FAQ/errata sidecar (src/data/factionFaq.json) fresh?
//   - sync-appdata     — faction/datasheet structure, scalars, renames (all factions)
//   - sync-faction-text — faction rule/stratagem/enhancement/ability PROSE vs the canon (errata drift)
//   - sync-tracker     — Game Tracker rule content (missions, twists, battle sizes, …)
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
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { ROOT, SYNCED_DATA_VERSION, appdataDataVersion } from './lib/sync-common.mjs'

const run = (label, file, args = []) => {
  console.log(`\n${'═'.repeat(72)}\n▶ ${label}\n${'═'.repeat(72)}`)
  const r = spawnSync(process.execPath, [path.join(ROOT, 'scripts', file), ...args], { stdio: 'inherit' })
  return r.status ?? 0
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

const idsStale = run('sourceIds bridge (--check)', 'gen-source-ids.mjs', ['--check'])
const condKwStale = run('conditionalKeywords sidecar (--check)', 'gen-conditional-keywords.mjs', ['--check'])
const faqStale = run('factionFaq sidecar (--check)', 'gen-faction-faq.mjs', ['--check'])
run('sync-appdata (all factions)', 'sync-appdata.mjs', ['--all'])
run('sync-faction-text (all factions)', 'sync-faction-text.mjs', ['--all'])
run('sync-tracker', 'sync-tracker.mjs')
run('sync-core', 'sync-core.mjs')
run('sync-event-companion', 'sync-event-companion.mjs')
run('sync-enh-bodyguards', 'sync-enh-bodyguards.mjs')
run('sync-leader-units', 'sync-leader-units.mjs')
run('sync-detachment-details', 'sync-detachment-details.mjs')
run('sync-wargear-options', 'sync-wargear-options.mjs')
run('sync-ally-inclusion', 'sync-ally-inclusion.mjs')
run('sync-roster-restrictions', 'sync-roster-restrictions.mjs')
run('sync-enhancement-restrictions', 'sync-enhancement-restrictions.mjs')
run('sync-army-rule-coverage', 'sync-army-rule-coverage.mjs')
run('sync-layouts', 'sync-layouts.mjs')
run('sync-combat-patrol', 'sync-combat-patrol.mjs')

console.log(`\n${'═'.repeat(72)}`)
if (idsStale) console.log('⚠ src/data/sourceIds.json is stale — run `node scripts/gen-source-ids.mjs`.')
if (condKwStale) console.log('⚠ src/data/conditionalKeywords.json is stale — run `node scripts/gen-conditional-keywords.mjs`.')
if (faqStale) console.log('⚠ src/data/factionFaq.json is stale — run `node scripts/gen-faction-faq.mjs`.')
console.log('Done. Every section above is report-only; read the flagged lines and fix by hand.')

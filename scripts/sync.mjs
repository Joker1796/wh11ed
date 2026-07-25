// One command to re-audit wh11ed against wh40k-appdata after a data_version bump. Runs every
// report-only reconciliation script in turn and prints a single consolidated report:
//   - version check   — is appdata newer than what this repo was last synced against?
//   - sourceIds        — is the stable-id bridge (src/data/sourceIds.json) up to date?
//   - sync-appdata     — faction/datasheet structure, scalars, renames (all factions)
//   - sync-tracker     — Game Tracker rule content (missions, twists, battle sizes, …)
//   - sync-core        — core rulebook prose (sections 01-25)
//   - sync-enh-bodyguards — enhancements that grant an attach must carry the attach note
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
run('sync-appdata (all factions)', 'sync-appdata.mjs', ['--all'])
run('sync-tracker', 'sync-tracker.mjs')
run('sync-core', 'sync-core.mjs')
run('sync-enh-bodyguards', 'sync-enh-bodyguards.mjs')

console.log(`\n${'═'.repeat(72)}`)
if (idsStale) console.log('⚠ src/data/sourceIds.json is stale — run `node scripts/gen-source-ids.mjs`.')
console.log('Done. Every section above is report-only; read the flagged lines and fix by hand.')

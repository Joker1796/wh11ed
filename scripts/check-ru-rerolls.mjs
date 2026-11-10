import { rerollPairs } from './lib/reroll-pairs.mjs'
import { checkPair, needsUpgradeWording, rerolls } from './lib/ru-reroll-wording.mjs'

const rows = await rerollPairs()
let checked = 0
let failed = 0
for (const { path, en, ru } of rows) {
  if (!needsUpgradeWording(en) && !rerolls(en, 'en').some(r => r.scope === 'one')) continue
  checked++
  const mismatch = checkPair(en, ru)
  if (mismatch) {
    failed++
    console.error(`✗ ${path}\n  EN ${JSON.stringify(mismatch.expected)}\n  RU ${JSON.stringify(mismatch.actual)}`)
  }
}
console.log(`${failed ? '✗' : '✓'} RU re-roll scopes: ${checked} fields, ${failed} mismatches`)
if (!checked || failed) process.exitCode = 1

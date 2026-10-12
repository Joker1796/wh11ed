// Dump a saved list's own page (RosterViewView) for every test roster at 390 and 1280px: each of
// its tabs, the stratagems both as a list and by phase with every phase open, and the rules with
// every fold open — see scripts/lib/dom-dump.mjs for what a dump is and why.
//
//   npm run build && npx vite-node scripts/roster-view-dump.mjs <out-dir>
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { dumpTree, open, testRosters, unfoldAll, withSeededPages } from './lib/dom-dump.mjs'

const out = process.argv[2]
mkdirSync(out, { recursive: true })
const rosters = await testRosters()
const BY_PHASE = 'wh11ed-stratagems-by-phase'
let shots = 0
for (const byPhase of ['0', '1']) {
  await withSeededPages({ rosters, seed: { [BY_PHASE]: byPhase } }, async (page, { base, width }) => {
    for (const [ri, r] of rosters.entries()) {
      await open(page, `${base}/ru/roster/${r.id}/view`)
      const root = page.locator('.rv-main').first()
      if (!(await root.waitFor({ timeout: 6000 }).then(() => true).catch(() => false))) continue
      const tabs = page.locator('.rv-main [role="tab"]')
      const n = await tabs.count()
      for (let t = 0; t < n; t++) {
        // The units tab does not change with the stratagem view; dump it once.
        if (byPhase === '1' && t === 0) continue
        await tabs.nth(t).click()
        await page.waitForTimeout(600)
        const panel = page.locator('.rv-main').first()
        await unfoldAll(page, panel.locator('.rv-rules, .rv-strats'))
        writeFileSync(join(out, `${width}_${ri}_tab${t}_phase${byPhase}.txt`), await dumpTree(panel))
        shots++
      }
    }
  })
}
console.log(`roster-view-dump: ${shots} views → ${out}`)

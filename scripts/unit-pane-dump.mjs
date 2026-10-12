// Dump every unit's editor fields pane (`.ues`, UnitEditorFields) over the test rosters, at 390
// and 1280px, with every fold opened — see scripts/lib/dom-dump.mjs for what a dump is and why.
// First used for the UnitWargearGroups split (2026-10-12): 124 panes, ~20k elements, no difference.
//
//   npm run build && npx vite-node scripts/unit-pane-dump.mjs <out-dir>
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { dumpTree, open, testRosters, unfoldAll, withSeededPages } from './lib/dom-dump.mjs'

const out = process.argv[2]
mkdirSync(out, { recursive: true })
const rosters = await testRosters()
let shots = 0
await withSeededPages({ rosters }, async (page, { base, width }) => {
  for (const [ri, r] of rosters.entries()) {
    const url = `${base}/ru/roster/${r.id}`
    await open(page, url)
    const n = await page.locator('.rur').count()
    for (let i = 0; i < n; i++) {
      await open(page, url)
      await page.locator('.rur').nth(i).click()
      const pane = page.locator('.ues').first()
      if (!(await pane.waitFor({ timeout: 4000 }).then(() => true).catch(() => false))) continue
      await unfoldAll(page, pane)
      writeFileSync(join(out, `${width}_${ri}_${String(i).padStart(2, '0')}.txt`), await dumpTree(pane))
      shots++
    }
  }
})
console.log(`unit-pane-dump: ${shots} panes → ${out}`)

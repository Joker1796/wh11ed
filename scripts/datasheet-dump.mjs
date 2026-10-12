// Dump datasheet cards (DatasheetCard) at 390 and 1280px: a sample of datasheet pages from every
// faction — the first sheets with both weapons tables, and every sheet whose weapons have several
// profiles — and the unit card of every unit of every test roster, where the roster's counts,
// marks and copies are on the card. See scripts/lib/dom-dump.mjs for what a dump is and why.
//
//   npm run build && npx vite-node scripts/datasheet-dump.mjs <out-dir>
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { dumpTree, open, testRosters, withSeededPages } from './lib/dom-dump.mjs'

const out = process.argv[2]
mkdirSync(out, { recursive: true })
const dir = join(import.meta.dirname, '../src/data/datasheets')
const pages = []
for (const file of readdirSync(dir).filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.endsWith('.test.js'))) {
  const slug = file.replace(/\.js$/, '')
  const { default: list } = await import(join(dir, file))
  const both = (list || []).filter((s) => s.ranged?.length && s.melee?.length).slice(0, 2)
  const multi = (list || []).filter((s) => [...(s.ranged || []), ...(s.melee || [])].some((w) => / [–-] /.test(w.name))).slice(0, 2)
  for (const s of new Set([...both, ...multi])) pages.push({ slug, id: s.id })
}
const rosters = await testRosters()
let shots = 0
await withSeededPages({ rosters }, async (page, { base, width }) => {
  for (const { slug, id } of pages) {
    await open(page, `${base}/ru/factions/${slug}/datasheets/${id}`)
    const card = page.locator('.ds-card').first()
    if (!(await card.waitFor({ timeout: 6000 }).then(() => true).catch(() => false))) continue
    writeFileSync(join(out, `${width}_page_${slug}_${id}.txt`), await dumpTree(card))
    shots++
  }
  for (const [ri, r] of rosters.entries()) {
    const url = `${base}/ru/roster/${r.id}/view`
    await open(page, url)
    const n = await page.locator('.rvunit').count()
    for (let i = 0; i < n; i++) {
      await open(page, url)
      await page.locator('.rvunit').nth(i).click()
      const card = page.locator('.ds-card').first()
      if (!(await card.waitFor({ timeout: 6000 }).then(() => true).catch(() => false))) continue
      await page.waitForTimeout(500)
      writeFileSync(join(out, `${width}_roster${ri}_${String(i).padStart(2, '0')}.txt`), await dumpTree(card))
      shots++
    }
  }
})
console.log(`datasheet-dump: ${shots} cards → ${out}`)

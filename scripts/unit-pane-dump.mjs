/* global document, getComputedStyle */
// Dump every unit's editor fields pane (`.ues`, UnitEditorFields) as text — each element's tag,
// attributes (scoped `data-v-…` dropped), own text and computed styles — over the test rosters, at
// 390 and 1280px, with every fold opened. For refactors that must not change what is drawn:
// dump before, change, `npm run build`, dump after, `diff -r` the two folders. Pixel screenshots
// were tried first and are not deterministic here (a phone sheet scrolls, folds animate); this is.
// First used for the UnitWargearGroups split (2026-10-12): 124 panes, ~20k elements, no difference.
//
//   npm run build && npx vite-node scripts/unit-pane-dump.mjs <out-dir>
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright-core'
import { preview } from 'vite'
import { TEST_ROSTERS, buildTestRoster } from './lib/test-rosters.mjs'
import { loadRosterFaction, rosterItems } from '../src/data/roster/index.js'
import { SCHEMA_VERSION } from '../src/composables/useRosters.js'
import { WELCOME_KEY } from '../src/composables/useWelcome.js'

const out = process.argv[2]
mkdirSync(out, { recursive: true })
const rosters = []
for (const spec of TEST_ROSTERS) {
  const faction = await loadRosterFaction(spec.faction, { allies: true })
  rosters.push(buildTestRoster(spec, { faction, items: rosterItems.items }, { now: 1700000000000 - rosters.length * 1000 }))
}
const server = await preview({ root: join(import.meta.dirname, '..'), logLevel: 'silent', preview: { port: 4181, strictPort: true, open: false } })
const base = server.resolvedUrls.local[0].replace(/\/$/, '')
const browser = await chromium.launch({ channel: 'chrome' })
let shots = 0
for (const width of [390, 1280]) {
  const mobile = width < 700
  const context = await browser.newContext({ viewport: { width, height: mobile ? 844 : 900 }, isMobile: mobile, hasTouch: mobile, reducedMotion: 'reduce', colorScheme: 'dark' })
  await context.addInitScript(({ rosters, v, welcome }) => {
    localStorage.setItem('wh11ed-rosters', JSON.stringify({ v, rosters }))
    localStorage.setItem(welcome, '1')
  }, { rosters, v: SCHEMA_VERSION, welcome: WELCOME_KEY })
  const page = await context.newPage()
  for (const [ri, r] of rosters.entries()) {
    const url = `${base}/ru/roster/${r.id}`
    await page.goto(url, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    const n = await page.locator('.rur').count()
    for (let i = 0; i < n; i++) {
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      await page.locator('.rur').nth(i).click()
      const pane = page.locator('.ues').first()
      if (!(await pane.waitFor({ timeout: 4000 }).then(() => true).catch(() => false))) continue
      // Open every folded part of the pane, so what the split moved is in the record.
      for (let k = 0; k < 30; k++) {
        const closed = pane.locator('[aria-expanded="false"]')
        if (!(await closed.count())) break
        await closed.first().click().catch(() => {})
        await page.waitForTimeout(120)
      }
      await page.waitForTimeout(400)
      const dump = await pane.evaluate((root) => {
        const PROPS = ['display', 'position', 'flex-direction', 'align-items', 'justify-content', 'gap', 'grid-template-columns',
          'margin', 'padding', 'border', 'border-radius', 'width', 'height', 'min-height', 'font-family', 'font-size', 'font-weight',
          'line-height', 'letter-spacing', 'text-transform', 'color', 'background-color', 'opacity', 'visibility', 'white-space', 'overflow']
        const lines = []
        const walk = (el, depth) => {
          const cs = getComputedStyle(el)
          const attrs = [...el.attributes].filter((a) => !a.name.startsWith('data-v-') && a.name !== 'style').map((a) => `${a.name}=${a.value}`).join(' ')
          const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).filter(Boolean).join(' ')
          lines.push(`${'  '.repeat(depth)}<${el.tagName.toLowerCase()} ${attrs}> ${own} | ${PROPS.map((p) => cs.getPropertyValue(p)).join(';')}`)
          for (const c of el.children) walk(c, depth + 1)
        }
        walk(root, 0)
        return lines.join('\n')
      })
      writeFileSync(join(out, `${width}_${ri}_${String(i).padStart(2, '0')}.txt`), dump)
      shots++
    }
  }
  await context.close()
}
await browser.close()
await server.close()
console.log(`unit-pane-dump: ${shots} panes → ${out}`)

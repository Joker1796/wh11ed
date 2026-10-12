/* global document, getComputedStyle */
// What a refactor must not change, written down as text: an element's subtree — every tag, its
// attributes (scoped `data-v-…` dropped), its own text and its computed styles. Dump before, change,
// `npm run build`, dump after, `diff -r` the two folders. Pixel screenshots were tried first and are
// not deterministic here (a phone sheet scrolls, folds animate); this is. Shared by the dump scripts
// in scripts/ (unit panes, the roster view, the game setup), which only say WHAT to open.
import { join } from 'node:path'
import { chromium } from 'playwright-core'
import { preview } from 'vite'
import { TEST_ROSTERS, buildTestRoster } from './test-rosters.mjs'
import { loadRosterFaction, rosterItems } from '../../src/data/roster/index.js'
import { SCHEMA_VERSION } from '../../src/composables/useRosters.js'
import { WELCOME_KEY } from '../../src/composables/useWelcome.js'

export const WIDTHS = [390, 1280]

// The test rosters, built against today's data, with fixed timestamps so a dump is repeatable.
export async function testRosters() {
  const rosters = []
  for (const spec of TEST_ROSTERS) {
    const faction = await loadRosterFaction(spec.faction, { allies: true })
    rosters.push(buildTestRoster(spec, { faction, items: rosterItems.items }, { now: 1700000000000 - rosters.length * 1000 }))
  }
  return rosters
}

// The built app over `vite preview`, a Chrome page per width seeded with the rosters (and whatever
// else `seed` puts in localStorage), reduced motion, the dark theme. `visit(page, { base, width })`
// does the opening and dumping.
export async function withSeededPages({ rosters = [], seed = {}, port = 4181 }, visit) {
  const server = await preview({ root: join(import.meta.dirname, '../..'), logLevel: 'silent', preview: { port, strictPort: true, open: false } })
  const base = server.resolvedUrls.local[0].replace(/\/$/, '')
  const browser = await chromium.launch({ channel: 'chrome' })
  try {
    for (const width of WIDTHS) {
      const mobile = width < 700
      const context = await browser.newContext({ viewport: { width, height: mobile ? 844 : 900 }, isMobile: mobile, hasTouch: mobile, reducedMotion: 'reduce', colorScheme: 'dark' })
      await context.addInitScript(({ rosters, v, welcome, seed }) => {
        localStorage.setItem('wh11ed-rosters', JSON.stringify({ v, rosters }))
        localStorage.setItem(welcome, '1')
        for (const [k, val] of Object.entries(seed)) localStorage.setItem(k, val)
      }, { rosters, v: SCHEMA_VERSION, welcome: WELCOME_KEY, seed })
      const page = await context.newPage()
      await visit(page, { base, width })
      await context.close()
    }
  } finally {
    await browser.close()
    await server.close()
  }
}

// Go to a page and wait until it has settled: the network quiet, the web fonts in.
export async function open(page, url) {
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
}

// Open every folded part under `root` (anything with aria-expanded="false"), so what a refactor
// moved is in the record.
export async function unfoldAll(page, root, rounds = 30) {
  for (let k = 0; k < rounds; k++) {
    const closed = root.locator('[aria-expanded="false"]')
    if (!(await closed.count())) break
    await closed.first().click().catch(() => {})
    await page.waitForTimeout(120)
  }
  await page.waitForTimeout(400)
}

// The subtree under a locator, as text. The pointer is moved off the page first: a dialog that opens
// under the spot just clicked would otherwise be dumped in its hover colours, or not, by timing.
export async function dumpTree(locator) {
  await locator.page().mouse.move(0, 0)
  await locator.page().waitForTimeout(150)
  return locator.evaluate((root) => {
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
}

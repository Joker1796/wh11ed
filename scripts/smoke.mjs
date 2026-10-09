#!/usr/bin/env node
// The automated half of RELEASE-CHECKLIST.md: the built site in headless Chrome, at a phone's width
// and the desk's, in Russian, with the test rosters (scripts/lib/test-rosters.mjs) seeded into the
// browser's storage the way a player's own lists sit there. Run by `npm run smoke`; needs a fresh
// `dist/` (`npm run build`) and an installed Google Chrome — the same setup as `npm run a11y`.
//
// Per page it fails on three things nobody should have to look for by hand:
//   - a JavaScript error (an uncaught exception, or console.error), the class of bug that blanks a
//     page and that no unit test sees because no unit test mounts the whole app on a real route;
//   - a page that scrolls sideways (a long name, a chip row);
//   - a CHECK that page carries: the specific thing a release has broken before, read from the
//     rendered page (the own-limits mark on a custom list, the archived list absent from the main
//     tab, the limit chosen before the faction…). A check that cannot find its element FAILS — it
//     never passes by not looking.
//
// What it does not do: judge layout or wording (that is the eyes-on pass, `--shots`), or click
// through a game — the tracker's flows are vitest's (useTracker.store, GameSetup) and the
// checklist's.
//
// Usage: npm run smoke [-- --widths=390,1280] [--en] [--shots=<dir>] [--only=<substring>]
/* global document, Node, getComputedStyle -- the page.evaluate callbacks run in the browser */
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright-core'
import { preview } from 'vite'
import { TEST_ROSTERS, buildTestRoster } from './lib/test-rosters.mjs'
import { loadRosterFaction, rosterItems } from '../src/data/roster/index.js'
import { SCHEMA_VERSION } from '../src/composables/useRosters.js'
import { WELCOME_KEY } from '../src/composables/useWelcome.js'
import { datasheetIndex } from '../src/data/datasheetIndex.js'

const ROOT = join(import.meta.dirname, '..')
const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=')[1]
const widths = (arg('widths') || '390,1280').split(',').map(Number)
const lang = process.argv.includes('--en') ? '' : '/ru'
const shots = arg('shots')
const only = arg('only')
// `--wide`: every faction's rules page and FAQ, and four datasheets of each spread across its list
// (~180 pages a width) — the level-C sweep, mostly for markup that reached the page unrendered.
const wide = process.argv.includes('--wide')
if (shots) mkdirSync(shots, { recursive: true })

// ── the seeded lists ─────────────────────────────────────────────────────────────────────────
const rosters = []
for (const spec of TEST_ROSTERS) {
  const faction = await loadRosterFaction(spec.faction, { allies: true })
  rosters.push(buildTestRoster(spec, { faction, items: rosterItems.items }, { now: Date.now() - rosters.length * 1000 }))
}
const byKey = Object.fromEntries(TEST_ROSTERS.map((s, i) => [s.key, rosters[i]]))

// Strips that scroll sideways on purpose: a wide rules table on a phone, the section subnav.
const SIDEWAYS_BY_DESIGN = '.table-wrap, .subnav-inner'

// ── pages and what each must show ────────────────────────────────────────────────────────────
// `check(page)` returns a list of failures (strings); empty is a pass.
const text = (page, sel) => page.locator(sel).allInnerTexts().then((t) => t.join('\n'))
const has = async (page, sel, why) => ((await page.locator(sel).count()) ? [] : [`${why} (no ${sel})`])
// Open the nth unit of that name on a roster's page — a side card on the desk, a sheet on a phone —
// and hand back the text of whatever opened.
async function unitCard(page, name, nth = 0) {
  const row = page.locator('.rvunit-main', { hasText: name }).nth(nth)
  if (!(await row.count())) return null
  await row.click()
  // The desk's side pane, or the phone's sheet — the dialog that carries the unit's name, since the
  // navigation drawer is a dialog too.
  const card = page.locator('.rv-unit, [role="dialog"]').filter({ hasText: name }).last()
  await card.waitFor({ timeout: 5000 }).catch(() => {})
  return (await card.count()) ? card.innerText() : null
}

// What a roster's own page must show for the case it was built for.
const VIEW_CHECKS = {
  'own-limits': (page) => has(page, '.olm', 'the own-limits mark on a custom list'),
  // Four heavy bolters REPLACE the squad's autocannons and lascannons (c1272b25, 2.7.13).
  havocs: async (page) => {
    const card = await unitCard(page, 'Havocs', 0)
    if (card == null) return ['the Havocs card did not open']
    const out = []
    if (!/Havoc heavy bolter/.test(card)) out.push('the swapped-in heavy bolters are not on the Havocs card')
    if (/Havoc lascannon|Havoc autocannon/.test(card)) out.push('the replaced heavy weapons are still on the Havocs card')
    return out
  },
  // A squad's Furious Assault reaches the Captain leading it (c9cfd7c1, 2.7.13).
  leaders: async (page) => {
    const card = await unitCard(page, 'Captain')
    if (card == null) return ['the Captain card did not open']
    return /SUSTAINED HITS 1/.test(card) ? [] : ['the squad’s Furious Assault is not on the Captain’s card']
  },
}

const PAGES = [
  { path: '/' },
  { path: '/core-rules' },
  { path: '/factions/orks' },
  { path: '/factions/orks/datasheets/boyz' },
  { path: '/stratagems' },
  { path: '/event-companion' },
  { path: '/tracker' },
  { path: '/tracker/stats' },
  { path: '/changelog' },
  { path: '/patches' },
  {
    path: '/roster',
    // The main tab lists the active lists and not the archived one (2.7.13).
    check: async (page) => {
      const body = await text(page, 'main')
      const out = []
      if (!body.includes(byKey.leaders.name)) out.push('an active list is missing from the roster list')
      if (body.includes(byKey.archived.name)) out.push('the archived list shows on the main tab')
      return out
    },
  },
  {
    path: '/roster/new',
    // The points limit is chosen BEFORE the faction, and it starts at 2000 (2.7.13).
    check: async (page) => {
      const out = await has(page, '.bsf', 'the points limit field')
      if (out.length) return out
      const before = await page.evaluate(() => {
        const limit = document.querySelector('.bsf')
        // The faction field's own caption, inside the page — the navbar's "Factions" is not it.
        const faction = [...document.querySelectorAll('main *')]
          .find((el) => !el.children.length && /^(фракция|faction)$/i.test((el.textContent || '').trim()))
        if (!faction) return null
        return !!(limit.compareDocumentPosition(faction) & Node.DOCUMENT_POSITION_FOLLOWING)
      })
      if (before === null) out.push('no faction field caption found')
      else if (!before) out.push('the limit field is not before the faction field')
      if (!/2000/.test(await text(page, '.bsf'))) out.push('the limit does not start at 2000')
      return out
    },
  },
  ...TEST_ROSTERS.flatMap((spec) => [
    {
      path: `/roster/${byKey[spec.key].id}/view`,
      check: VIEW_CHECKS[spec.key],
      shotAfter: !!VIEW_CHECKS[spec.key],
    },
    { path: `/roster/${byKey[spec.key].id}` },
    { path: `/roster/${byKey[spec.key].id}/print` },
  ]),
  ...(wide ? datasheetIndex.flatMap(([slug, , units]) => [
    { path: `/factions/${slug}` },
    { path: `/factions/${slug}/faq` },
    ...[0, 1, 2, 3].map((k) => units[Math.floor((k * units.length) / 4)]).filter(Boolean)
      .map(([id]) => ({ path: `/factions/${slug}/datasheets/${id}` })),
  ]) : []),
].filter((p) => !only || p.path.includes(only))

// ── run ──────────────────────────────────────────────────────────────────────────────────────
const server = await preview({ root: ROOT, logLevel: 'silent', preview: { port: 4178, strictPort: false, open: false } })
const base = server.resolvedUrls.local[0].replace(/\/$/, '')
let browser
try {
  browser = await chromium.launch({ channel: 'chrome' })
} catch (e) {
  console.error('✗ smoke: could not launch Google Chrome via playwright-core —', e.message.split('\n')[0])
  await server.close()
  process.exit(1)
}

const failures = []
let visited = 0
for (const width of widths) {
  const mobile = width < 700
  const context = await browser.newContext({
    viewport: { width, height: mobile ? 844 : 900 },
    isMobile: mobile,
    hasTouch: mobile,
    reducedMotion: 'reduce',
    colorScheme: 'dark',
  })
  // Seeded before the app boots, on every navigation — the store reads storage once, at load.
  await context.addInitScript(({ rosters, v, welcome }) => {
    if (sessionStorage.getItem('smoke-seeded')) return
    localStorage.setItem('wh11ed-rosters', JSON.stringify({ v, rosters }))
    localStorage.setItem(welcome, '1')
    sessionStorage.setItem('smoke-seeded', '1')
  }, { rosters, v: SCHEMA_VERSION, welcome: WELCOME_KEY })
  const page = await context.newPage()
  let errors = []
  page.on('pageerror', (e) => errors.push(e.message.split('\n')[0]))
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().split('\n')[0]) })

  for (const p of PAGES) {
    const url = base + lang + (p.path === '/' ? '' : p.path)
    errors = []
    const where = `${width}px ${lang}${p.path}`
    try {
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.waitForSelector('#app *', { timeout: 15000 })
      await page.evaluate(() => document.fonts.ready)
      visited++
      const sideways = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      // Any pixel counts: scrollWidth rounds up, so a bar 0.58px too wide reads as 1 — and the
      // wordmark's did, on every page at 320px, under a `> 1` that let it through (2026-10-09).
      if (sideways > 0) {
        // Name what sticks out, the way the column check below does: a bare "by 1px" sends the
        // reader hunting. The outermost offender is the culprit; its children only follow it.
        const culprit = await page.evaluate(() => {
          const cw = document.documentElement.clientWidth
          // Inside a fixed box (the closed side menu waits off screen) nothing widens the page.
          const inFixed = (el) => { for (let e = el; e; e = e.parentElement) if (getComputedStyle(e).position === 'fixed') return true; return false }
          const out = [...document.querySelectorAll('body *')].find((el) => el.getClientRects().length
            && el.getBoundingClientRect().right > cw + 0.01 && !inFixed(el))
          return out ? `${out.tagName.toLowerCase()}.${[...out.classList].join('.')} to ${out.getBoundingClientRect().right.toFixed(2)}px` : '?'
        })
        failures.push(`${where}: scrolls sideways by ${sideways}px (${culprit})`)
      }
      // Rule markup that reached the reader unrendered — the print sheet printed `**[gloss:…]**`
      // in its stratagem lines for a release before anyone looked (2026-10-03).
      const raw = await page.evaluate(() => (document.body.innerText.match(/\[(?:gloss|core|def):[^\]]*\]|\*\*[^*\n]{1,60}\*\*/) || [])[0])
      if (raw) failures.push(`${where}: unrendered markup on the page — ${raw}`)
      for (const f of (await p.check?.(page)) || []) failures.push(`${where}: ${f}`)
      // A column that scrolls on its own hides the same fault from the check above: the desk's unit
      // card at 1200px was wider than its pane and slid half out of sight (2026-10-03). Run after the
      // page's check, which may open that card. Strips made to scroll sideways are not columns.
      for (const c of await page.evaluate((sideways) => [...document.querySelectorAll('#app *')]
        .filter((el) => /auto|scroll/.test(getComputedStyle(el).overflowX) && el.scrollWidth - el.clientWidth > 1 && !el.matches(sideways))
        .map((el) => {
          const box = el.getBoundingClientRect()
          const wide = [...el.querySelectorAll('*')].filter((k) => k.getBoundingClientRect().right > box.right + 1)
          const culprit = wide.find((k) => !wide.includes(k.parentElement)) || wide[0]
          return `.${[...el.classList].join('.')} by ${el.scrollWidth - el.clientWidth}px (${culprit ? `${culprit.tagName.toLowerCase()}.${[...culprit.classList].join('.')}` : '?'})`
        }), SIDEWAYS_BY_DESIGN)) failures.push(`${where}: a column scrolls sideways — ${c}`)
      // Network noise a static preview cannot avoid (no API behind it) is not the page's error.
      for (const e of errors.filter((x) => !/Failed to load resource|ERR_CONNECTION_REFUSED|net::|blocked by CORS policy/.test(x))) failures.push(`${where}: JS error — ${e}`)
      if (shots) await page.screenshot({ path: join(shots, `${width}${p.path.replace(/[/:]+/g, '_') || '_home'}.png`), fullPage: !mobile })
    } catch (e) {
      failures.push(`${where}: did not render — ${e.message.split('\n')[0]}`)
    }
  }
  await context.close()
}
await browser.close()
await server.close()

if (failures.length) {
  console.log(`✗ smoke: ${failures.length} finding(s) on ${visited} page loads`)
  for (const f of failures) console.log(`  - ${f}`)
  process.exit(1)
}
console.log(`✓ smoke: ${visited} page loads, ${rosters.length} test rosters, widths ${widths.join('/')} — clean`)

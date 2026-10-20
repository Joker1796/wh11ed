#!/usr/bin/env node
// How the built site performs on a mid Android phone, measured, before a release (`npm run perf`).
// Nothing measured speed until 2026-10-20: the owner's phone showed a unit card jumping with every
// letter the search box typed and animations stuttering, and the cause — the whole catalogue
// re-rendering every 35-70 ms — was invisible to every gate we had.
//
// Headless Chrome over `vite preview` of `dist/` (needs a fresh `npm run build`), a phone's width,
// motion on, the CPU slowed `--cpu` times (4: a mid Android), the test rosters and a game in progress
// seeded into storage (scripts/lib/test-rosters.mjs, scripts/lib/perf-game.json). Four kinds of
// scenario, each run `--runs` times (3) and read as the median:
//   - idle    a screen left alone for 8 s: DOM changes outside the typing example (`mut` — work
//             nobody asked for), long tasks (`longMs`), the worst frame;
//   - anim    an animation: frames over 34 ms while it plays (`drops`), the worst frame;
//   - tap     a tap: the slowest tap-to-paint the browser measured for it (`inp`);
//   - load    a cold load: largest contentful paint (`lcp`) and the app on screen (`mounted`).
// Each number is held to scripts/lib/perf-baseline.json: worse than the baseline by more than half
// plus a slack fails, and `mut` may never grow at all. `--baseline` writes the file — read the diff.
//
// Usage: npm run perf [-- --runs=3] [--cpu=4] [--only=<key>] [--baseline]
/* global document, window, performance, requestAnimationFrame, MutationObserver, PerformanceObserver -- run in the browser */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright-core'
import { preview } from 'vite'
import { TEST_ROSTERS, buildTestRoster } from './lib/test-rosters.mjs'
import { loadRosterFaction, rosterItems } from '../src/data/roster/index.js'
import { SCHEMA_VERSION } from '../src/composables/useRosters.js'
import { WELCOME_KEY } from '../src/composables/useWelcome.js'
import { CUR_KEY } from '../src/composables/gameInPlay.js'

const ROOT = join(import.meta.dirname, '..')
const BASELINE = join(ROOT, 'scripts/lib/perf-baseline.json')
const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=')[1]
const runs = Number(arg('runs') || 3)
const cpu = Number(arg('cpu') || 4)
const only = arg('only')
const writeBaseline = process.argv.includes('--baseline')

// ── seeded state ─────────────────────────────────────────────────────────────────────────────
const rosters = []
for (const spec of TEST_ROSTERS) {
  const faction = await loadRosterFaction(spec.faction, { allies: true })
  rosters.push(buildTestRoster(spec, { faction, items: rosterItems.items }, { now: Date.now() - rosters.length * 1000 }))
}
const roster = rosters[0]
const game = readFileSync(join(ROOT, 'scripts/lib/perf-game.json'), 'utf8')

// ── what is measured in the page ─────────────────────────────────────────────────────────────
// Starts counting; `stop()` (evaluated later) returns the numbers. Frames are rAF gaps.
function startMeter() {
  const m = { mut: 0, longMs: 0, worst: 0, drops: 0, inp: 0 }
  const outsideGhost = (n) => !(n.nodeType === 1 ? n : n.parentElement)?.closest?.('.typing-ghost')
  const mo = new MutationObserver((list) => { for (const r of list) if (outsideGhost(r.target)) m.mut++ })
  mo.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true })
  const lt = new PerformanceObserver((l) => { for (const e of l.getEntries()) m.longMs += e.duration })
  lt.observe({ type: 'longtask' })
  const ev = new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.interactionId > 0) m.inp = Math.max(m.inp, e.duration) })
  ev.observe({ type: 'event', durationThreshold: 16 })
  let last = performance.now()
  let on = true
  const frame = (t) => { const gap = t - last; last = t; m.worst = Math.max(m.worst, gap); if (gap > 34) m.drops++; if (on) requestAnimationFrame(frame) }
  requestAnimationFrame(frame)
  window.__perfStop = () => {
    on = false
    mo.disconnect()
    for (const e of ev.takeRecords()) if (e.interactionId > 0) m.inp = Math.max(m.inp, e.duration)
    for (const e of lt.takeRecords()) m.longMs += e.duration
    lt.disconnect()
    ev.disconnect()
    return Object.fromEntries(Object.entries(m).map(([k, v]) => [k, Math.round(v)]))
  }
}
const stopMeter = (page) => page.evaluate(() => window.__perfStop())

async function settle(page) {
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(1500)
}
// Open a catalogue group and a unit's card from it — the screen the owner's report was about.
async function openCatalogueCard(page) {
  await page.locator('.rub-head').first().click()
  await page.waitForTimeout(600)
  await page.locator('.rub-item .rub-name').first().click()
  await page.waitForSelector('.modal-overlay .ds-card', { timeout: 15000 })
}

const pick = (m, keys) => Object.fromEntries(keys.map((k) => [k, m[k]]))
const IDLE = ['mut', 'longMs', 'worst']
const ANIM = ['drops', 'worst']

const SCENARIOS = [
  { key: 'idle-catalogue-card', path: `/roster/${roster.id}`, setup: openCatalogueCard, idle: 8000 },
  { key: 'idle-faction-grid', path: '/factions/necrons/datasheets', idle: 8000 },
  { key: 'idle-search', path: '/', setup: async (page) => { await page.keyboard.press('Control+k'); await page.waitForSelector('.search-field input') }, idle: 8000 },
  { key: 'idle-game', path: '/tracker/game', idle: 8000 },
  { key: 'idle-roster-view', path: `/roster/${roster.id}/view`, idle: 8000 },
  {
    key: 'anim-card-open', path: `/roster/${roster.id}/view`, keys: ANIM,
    act: (page) => page.locator('.rvunit-main').first().click(), window: 900,
  },
  {
    key: 'anim-page-swap', path: '/', keys: ANIM,
    act: (page) => page.locator('a.bn-item[href*="/roster"]').first().click(), window: 900,
  },
  {
    key: 'tap-add-unit', path: `/roster/${roster.id}`, keys: ['inp'],
    setup: async (page) => { await page.locator('.rub-head').first().click(); await page.waitForTimeout(600) },
    act: (page) => page.locator('.rub-add:not([disabled])').first().tap(), window: 1200,
  },
  {
    key: 'tap-game-tab', path: '/tracker/game', keys: ['inp'],
    act: (page) => page.locator('.gt-tab:not(.on)').first().tap(), window: 1200,
  },
  { key: 'load-home', path: '/', load: true },
  { key: 'load-faction', path: '/factions/necrons', load: true },
  { key: 'load-roster', path: `/roster/${roster.id}/view`, load: true },
].filter((s) => !only || s.key.includes(only))

// ── run ──────────────────────────────────────────────────────────────────────────────────────
const server = await preview({ root: ROOT, logLevel: 'silent', preview: { port: 4179, strictPort: false, open: false } })
const base = `${server.resolvedUrls.local[0].replace(/\/$/, '')}/ru`
let browser
try {
  browser = await chromium.launch({ channel: 'chrome' })
} catch (e) {
  console.error('✗ perf: could not launch Google Chrome via playwright-core —', e.message.split('\n')[0])
  await server.close()
  process.exit(1)
}

async function once(s) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'no-preference', colorScheme: 'dark' })
  await context.addInitScript(({ rosters, v, welcome, game, curKey }) => {
    if (sessionStorage.getItem('perf-seeded')) return
    localStorage.setItem('wh11ed-rosters', JSON.stringify({ v, rosters }))
    localStorage.setItem(curKey, game)
    localStorage.setItem(welcome, '1')
    localStorage.setItem('wh11ed-tour-auto', 'off')
    sessionStorage.setItem('perf-seeded', '1')
  }, { rosters, v: SCHEMA_VERSION, welcome: WELCOME_KEY, game, curKey: CUR_KEY })
  const page = await context.newPage()
  const cdp = await context.newCDPSession(page)
  try {
    if (s.load) {
      // A cold load: the throttle on before the request, nothing cached.
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu })
      const t0 = Date.now()
      await page.goto(base + (s.path === '/' ? '' : s.path), { waitUntil: 'load' })
      await page.waitForSelector('#app *', { timeout: 30000 })
      const mounted = Date.now() - t0
      const lcp = await page.evaluate(() => new Promise((res) => {
        let v = 0
        new PerformanceObserver((l) => { for (const e of l.getEntries()) v = e.startTime }).observe({ type: 'largest-contentful-paint', buffered: true })
        setTimeout(() => res(Math.round(v)), 500)
      }))
      return { lcp, mounted }
    }
    await page.goto(base + (s.path === '/' ? '' : s.path), { waitUntil: 'networkidle' })
    await page.waitForSelector('#app *', { timeout: 30000 })
    await settle(page)
    if (s.setup) { await s.setup(page); await settle(page) }
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu })
    await page.evaluate(startMeter)
    if (s.idle) await page.waitForTimeout(s.idle)
    else { await s.act(page); await page.waitForTimeout(s.window) }
    return pick(await stopMeter(page), s.keys || IDLE)
  } finally {
    await context.close()
  }
}

const median = (xs) => { const a = [...xs].sort((x, y) => x - y); return a[Math.floor(a.length / 2)] }
const results = {}
const errors = []
for (const s of SCENARIOS) {
  const got = []
  for (let i = 0; i < runs; i++) {
    try { got.push(await once(s)) } catch (e) { errors.push(`${s.key}: ${e.message.split('\n')[0]}`); break }
  }
  if (got.length < runs) continue
  results[s.key] = Object.fromEntries(Object.keys(got[0]).map((k) => [k, median(got.map((g) => g[k]))]))
  console.log(`  ${s.key.padEnd(22)} ${Object.entries(results[s.key]).map(([k, v]) => `${k} ${v}`).join('  ')}`)
}
await browser.close()
await server.close()

if (errors.length) {
  console.log(`✗ perf: ${errors.length} scenario(s) did not run`)
  for (const e of errors) console.log(`  - ${e}`)
  process.exit(1)
}
if (writeBaseline) {
  const prev = (() => { try { return JSON.parse(readFileSync(BASELINE, 'utf8')) } catch { return {} } })()
  writeFileSync(BASELINE, `${JSON.stringify({ ...prev, ...results, _cpu: cpu }, null, 1)}\n`)
  console.log(`✓ perf: baseline written (${Object.keys(results).length} scenarios, cpu ×${cpu})`)
  process.exit(0)
}

// Worse than the baseline by more than half plus a slack: a slack, because a 2-frame animation
// that drops a third frame is not a regression, and an empty baseline (0) has no "half".
const SLACK = { mut: 0, longMs: 60, worst: 34, drops: 2, inp: 40, lcp: 400, mounted: 400 }
let baseline = {}
try { baseline = JSON.parse(readFileSync(BASELINE, 'utf8')) } catch { /* first run */ }
if (baseline._cpu && baseline._cpu !== cpu) console.log(`  · the baseline was taken at cpu ×${baseline._cpu}, this run ×${cpu}`)
const failures = []
for (const [key, m] of Object.entries(results)) {
  const b = baseline[key]
  if (!b) { failures.push(`${key}: no baseline — run with --baseline and read the diff`); continue }
  for (const [k, v] of Object.entries(m)) {
    const limit = k === 'mut' ? b[k] : Math.round(b[k] * 1.5 + SLACK[k])
    if (v > limit) failures.push(`${key}: ${k} ${v} (baseline ${b[k]}, limit ${limit})`)
  }
}
if (failures.length) {
  console.log(`✗ perf: ${failures.length} finding(s), cpu ×${cpu}, median of ${runs}`)
  for (const f of failures) console.log(`  - ${f}`)
  process.exit(1)
}
console.log(`✓ perf: ${Object.keys(results).length} scenarios within the baseline, cpu ×${cpu}, median of ${runs}`)

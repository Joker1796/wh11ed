/* global document, history, dispatchEvent, PopStateEvent, caches -- page.evaluate bodies run in the page */
// End-to-end: update delivery, releases 1 and 2. Two builds (A and B, versions in A_V / B_V) swapped
// on a local server the way a deploy swaps them (old hashed assets stay). Every page load records
// which build it was, whether the update screen showed, and whether the app mounted — so "the old
// build was drawn, then a reload" is visible in the record, not guessed.
//
// Release 2 (2.9.5): a tab has no service worker; a tab that still has one from before is moved off
// it by a plate at a calm moment; a tab beside the installed app keeps it. A tab "from before" is
// made by registering the build's own sw.js by hand — what the old code did on every visit.
//
// Usage (two builds, ~5 min):
//   npm run build && cp -R dist <scratch>/e2e-A
//   npm version <next> --no-git-tag-version && npm run build && cp -R dist <scratch>/e2e-B
//   npm version <back> --no-git-tag-version
//   copy some asset under 24 new names into e2e-B and list them in its offline-manifest.json
//     (two builds that differ only in their number have no new files — no download to watch)
//   mkdir <scratch>/e2e-live && node scripts/update-delivery/server.mjs <scratch>/e2e-live 4195 &
//   node scripts/update-delivery/e2e.mjs . <scratch>
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { mkdtempSync } from 'node:fs'

const [ROOT, S] = process.argv.slice(2)
const { chromium } = await import(join(ROOT, 'node_modules/playwright-core/index.mjs'))
const BASE = 'http://127.0.0.1:4195'
const [A_V, B_V] = [process.env.A_V || '2.9.5', process.env.B_V || '2.9.6']
// The notes both builds carry: read, so no "What's new" bar is up (the move waits for it to close).
const NOTES_V = process.env.NOTES_V || '2.9.4'
const deploy = (name) => execFileSync('rsync', ['-a', `${S}/e2e-${name}/`, `${S}/e2e-live/`])
const results = []
const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`) }

const RECORD = `(() => {
  const log = (e) => { const a = JSON.parse(localStorage.getItem('e2e-log') || '[]'); a.push(e); localStorage.setItem('e2e-log', JSON.stringify(a)) }
  const entry = { at: Date.now(), splash: false, mounted: false, v: '' }
  let i = -1
  const save = () => { const a = JSON.parse(localStorage.getItem('e2e-log') || '[]'); if (i < 0) { i = a.length; a.push(entry) } else a[i] = entry; localStorage.setItem('e2e-log', JSON.stringify(a)) }
  new MutationObserver(() => {
    let changed = false
    if (!entry.v) { const m = document.querySelector('meta[name="wh-app-version"]'); if (m) { entry.v = m.content; changed = true } }
    if (!entry.splash && document.querySelector('.update-splash')) { entry.splash = true; entry.splashText = document.querySelector('.us-text')?.textContent; changed = true }
    if (!entry.mounted && document.querySelector('#app')?.children.length) { entry.mounted = true; changed = true }
    if (changed) save()
  }).observe(document, { childList: true, subtree: true })
})()`
const STANDALONE = `(() => {
  const mm = window.matchMedia.bind(window)
  window.matchMedia = (q) => q.includes('display-mode: standalone') ? { matches: true, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} } : mm(q)
})()`

async function open({ standalone = false, viewport, seed = {} }) {
  const ctx = await chromium.launchPersistentContext(mkdtempSync(join(S, 'e2e-prof-')), { channel: 'chrome', headless: true, viewport })
  await ctx.addInitScript(RECORD)
  // What a returning reader's storage already holds (set before the app reads it).
  await ctx.addInitScript((kv) => { for (const [k, v] of Object.entries(kv)) if (localStorage.getItem(k) === null) localStorage.setItem(k, v) }, { 'wh11ed-welcome-seen': '1', 'wh11ed-last-seen-version': NOTES_V, ...seed })
  if (standalone) await ctx.addInitScript(STANDALONE)
  const page = ctx.pages()[0] || await ctx.newPage()
  return { ctx, page }
}
const log = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('e2e-log') || '[]'))
const clearLog = (page) => page.evaluate(() => localStorage.setItem('e2e-log', '[]'))
const running = (page) => page.evaluate(() => document.querySelector('meta[name="wh-app-version"]')?.content)
async function controlled(page) {
  await page.waitForFunction(() => navigator.serviceWorker?.controller, null, { timeout: 30000 }).catch(() => {})
  if (!(await page.evaluate(() => !!navigator.serviceWorker?.controller))) {
    await page.reload(); await page.waitForFunction(() => navigator.serviceWorker?.controller, null, { timeout: 30000 })
  }
}
// The app looks for an update on a navigation, a return to the tab and every 15 minutes — at most
// once in 2 minutes (UpdateToast.vue, tabFreshness.js). The test cannot wait that out: it moves to
// another page in the app AND asks the registration itself, which is what each of those triggers does.
async function navigate(page, to) {
  await page.evaluate(async (path) => {
    history.pushState({}, '', path); dispatchEvent(new PopStateEvent('popstate'))
    const r = await navigator.serviceWorker.getRegistration(); await r?.update()
  }, to)
}
const registration = (page) => page.evaluate(async () => !!(await navigator.serviceWorker.getRegistration()))
const ourCaches = (page) => page.evaluate(async () => (await caches.keys()).filter((n) => /^workbox-precache|^wh-rules-assets$|^wh11ed-images$/.test(n)))
// A tab from before 2.9.5: the old code registered the worker on every visit.
async function oldTab(page) {
  await page.evaluate(() => navigator.serviceWorker.register('/sw.js'))
  await controlled(page)
}
// Time passing between two opens of the app: the loop guard's window of starts is forgotten.
const later = (page) => page.evaluate(() => localStorage.removeItem('wh11ed-boots'))
const waitMounted = (page, v) => page.waitForFunction((ver) => document.querySelector('meta[name="wh-app-version"]')?.content === ver && document.querySelector('#app')?.children.length, v, { timeout: 30000 })

// ── A tab, first visit and after (390px, RU) ─────────────────────────────────
deploy('A')
{
  const { ctx, page } = await open({ viewport: { width: 390, height: 844 } })
  await page.goto(`${BASE}/ru/`)
  await waitMounted(page, A_V)
  await page.waitForTimeout(3000)
  check('a tab gets no service worker', !(await registration(page)) && !(await page.evaluate(() => !!navigator.serviceWorker.controller)))
  await clearLog(page)

  // A release while the page is open: the plate, nothing reloaded.
  deploy('B')
  await navigate(page, '/ru/core-rules')
  const plate = page.locator('.update-plate')
  await plate.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {})
  const visible = await plate.isVisible()
  check('in a session: a new version shows the plate', visible && (await plate.innerText()).includes(B_V), visible ? await plate.innerText() : 'no plate')
  check('in a session: nothing reloads by itself', (await log(page)).length === 0, `${(await log(page)).length} loads`)
  check('the plate has no close button', visible && (await plate.locator('.wi-close').count()) === 0)
  await page.screenshot({ path: `${S}/e2e-tab-plate-390.png` })

  // A link followed under the plate: the page loads whole, in the new version.
  await clearLog(page)
  await page.evaluate(() => { history.pushState({}, '', '/ru/factions'); dispatchEvent(new PopStateEvent('popstate')) })
  await waitMounted(page, B_V).catch(() => {})
  const l2 = await log(page)
  check('a link under the plate opens the new version', (await running(page)) === B_V && page.url().endsWith('/ru/factions'), `${await running(page)} ${page.url()}`)
  check('…one load, no update screen', l2.length === 1 && !l2[0].splash, JSON.stringify(l2.map(({ v, splash }) => ({ v, splash }))))
  check('…and the plate gone', !(await plate.isVisible()))

  // F5 after a release: straight into it.
  deploy('A')
  await later(page)
  await clearLog(page)
  await page.reload()
  await waitMounted(page, A_V).catch(() => {})
  const l3 = await log(page)
  check('F5 after a release opens it at once', (await running(page)) === A_V && l3.length === 1 && !l3[0].splash, JSON.stringify(l3.map(({ v, splash }) => ({ v, splash }))))
  await ctx.close()
}

// ── A tab with a worker from before (390px, RU) ──────────────────────────────
deploy('A')
{
  const { ctx, page } = await open({ viewport: { width: 390, height: 844 } })
  await page.goto(`${BASE}/ru/`)
  await waitMounted(page, A_V)
  await oldTab(page)
  await later(page)
  await page.reload()
  await waitMounted(page, A_V)
  const t0 = Date.now()
  const plate = page.locator('.update-plate')
  await page.waitForTimeout(6000)
  check('the move waits for a calm moment (not in the first seconds)', !(await plate.isVisible()))
  await plate.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {})
  const shown = await plate.isVisible()
  check('…then its plate', shown && (await plate.innerText()).includes('Я поменял систему кэширования'), shown ? `${await plate.innerText()} after ${Math.round((Date.now() - t0) / 1000)} s` : 'no plate')
  check('…with no close button', shown && (await plate.locator('.wi-close').count()) === 0)
  await page.screenshot({ path: `${S}/e2e-move-plate-390.png` })
  await clearLog(page)
  await plate.locator('button').click()
  await page.waitForFunction(async () => !(await navigator.serviceWorker.getRegistration()), null, { timeout: 10000 }).catch(() => {})
  await page.waitForTimeout(1000)
  check('Apply: the worker gone', !(await registration(page)))
  check('…its caches gone', (await ourCaches(page)).length === 0, (await ourCaches(page)).join(', '))
  check('…no reload, the plate gone', (await log(page)).length === 0 && !(await plate.isVisible()))
  deploy('B')
  await later(page)
  await clearLog(page)
  await page.reload()
  await waitMounted(page, B_V).catch(() => {})
  const l = await log(page)
  check('…and the next load is the server\'s', (await running(page)) === B_V && l.length === 1 && !l[0].splash && !(await page.evaluate(() => !!navigator.serviceWorker.controller)), JSON.stringify(l.map(({ v, splash }) => ({ v, splash }))))
  await ctx.close()
}

// ── Tabs that keep their worker ──────────────────────────────────────────────
deploy('A')
{
  // Downloaded for offline on a shared storage (desktop Chrome): perhaps the app, from before the mark.
  const { ctx, page } = await open({ viewport: { width: 1440, height: 900 }, seed: { 'wh11ed-offline-warmed': '1.x' } })
  await page.goto(`${BASE}/ru/`)
  await waitMounted(page, A_V)
  await oldTab(page)
  await later(page)
  await page.reload()
  await waitMounted(page, A_V)
  await page.waitForTimeout(16000)
  check('downloaded for offline beside a possible app: no move, the worker stays', !(await page.locator('.update-plate').isVisible()) && await registration(page))
  await ctx.close()
}
{
  // On a device with the app: the tab registers the worker itself, as the app does.
  const { ctx, page } = await open({ viewport: { width: 1440, height: 900 }, seed: { 'wh11ed-app-installed': '1' } })
  await page.goto(`${BASE}/ru/`)
  await controlled(page)
  check('a tab beside the installed app gets the worker', await registration(page))
  await ctx.close()
}

// ── The installed app (standalone emulated, 1440px) ──────────────────────────
deploy('A')
{
  const { ctx, page } = await open({ standalone: true, viewport: { width: 1440, height: 900 } })
  await page.goto(`${BASE}/ru/`)
  await controlled(page)
  await waitMounted(page, A_V)
  // The first launch warms everything up; let it finish.
  await page.waitForFunction(() => localStorage.getItem('wh11ed-offline-warmed'), null, { timeout: 120000 }).catch(() => {})
  const marked = await page.evaluate(() => localStorage.getItem('wh11ed-app-installed'))
  check('the app marks itself installed', !!marked)
  await later(page)
  await clearLog(page)

  deploy('B')
  const seen = []
  const plate = page.locator('.update-plate')
  const watcher = setInterval(async () => { try { if (await plate.isVisible()) seen.push(await plate.innerText()) } catch { /* the page reloading under it */ } }, 100)
  await navigate(page, '/ru/core-rules')
  await page.locator('.update-plate button').waitFor({ state: 'visible', timeout: 120000 }).catch(() => {})
  clearInterval(watcher)
  const texts = [...new Set(seen.map((t) => t.split('\n')[0]))]
  check('installed: the new files download first, then the button', texts.some((t) => t.startsWith('Загрузка обновления')) && (await plate.locator('button').isVisible()), texts.join(' | '))
  check('installed: nothing reloads by itself', (await log(page)).length === 0)
  await page.screenshot({ path: `${S}/e2e-plate-1440.png` })
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.screenshot({ path: `${S}/e2e-plate-1024.png` })
  await page.setViewportSize({ width: 1440, height: 900 })

  await plate.locator('button').click()
  await waitMounted(page, B_V).catch(() => {})
  check('installed: Update opens the new version', (await running(page)) === B_V)

  // Offline right after: the new build's pages are already there.
  await ctx.setOffline(true)
  await page.goto(`${BASE}/ru/factions/orks`).catch(() => {})
  const ok = await page.waitForFunction((ver) => document.querySelector('meta[name="wh-app-version"]')?.content === ver && /Orks/.test(document.body.innerText), B_V, { timeout: 20000 }).then(() => true, () => false)
  const seenOffline = await page.evaluate(() => `${document.querySelector('meta[name="wh-app-version"]')?.content} | ${document.body.innerText.slice(0, 160).replace(/\s+/g, ' ')}`).catch((e) => String(e))
  check('installed: offline straight after the update, a faction page opens', ok, seenOffline)
  await ctx.setOffline(false)
  await ctx.close()
}

const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} passed`)
process.exit(failed.length ? 1 : 0)

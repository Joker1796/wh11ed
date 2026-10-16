/* global document, history, dispatchEvent, PopStateEvent -- page.evaluate bodies run in the page */
// End-to-end: update delivery, release 1. Two builds (A = 2.9.3, B = 2.9.4) swapped on a local
// server the way a deploy swaps them (old hashed assets stay). Every page load records which build
// it was, whether the update screen showed, and whether the app mounted — so "the old build was
// drawn, then a reload" is visible in the record, not guessed.
//
// Usage (two builds, ~4 min; checked 15/15 on 2026-10-16):
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

async function open({ standalone = false, viewport }) {
  const ctx = await chromium.launchPersistentContext(mkdtempSync(join(S, 'e2e-prof-')), { channel: 'chrome', headless: true, viewport })
  await ctx.addInitScript(RECORD)
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
// once in 2 minutes (UpdateToast.vue). The test cannot wait that out: it moves to another page in
// the app AND asks the registration itself, which is what each of those triggers does.
async function navigate(page, to) {
  await page.evaluate(async (path) => {
    history.pushState({}, '', path); dispatchEvent(new PopStateEvent('popstate'))
    const r = await navigator.serviceWorker.getRegistration(); await r?.update()
  }, to)
}
// Time passing between two opens of the app: the loop guard's window of starts is forgotten.
const later = (page) => page.evaluate(() => localStorage.removeItem('wh11ed-boots'))
const waitMounted = (page, v) => page.waitForFunction((ver) => document.querySelector('meta[name="wh-app-version"]')?.content === ver && document.querySelector('#app')?.children.length, v, { timeout: 30000 })

// ── A tab under a service worker (390px, RU) ─────────────────────────────────
deploy('A')
{
  const { ctx, page } = await open({ viewport: { width: 390, height: 844 } })
  await page.goto(`${BASE}/ru/`)
  await controlled(page)
  await waitMounted(page, '2.9.3')
  await page.evaluate(() => localStorage.setItem('wh11ed-welcome-seen', '1'))
  await clearLog(page)

  // 1. A release while the page is open: announced, not applied.
  deploy('B')
  await navigate(page, '/ru/core-rules')
  const plate = page.locator('.update-plate')
  await plate.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {})
  const visible = await plate.isVisible()
  check('in a session: a new version shows the plate', visible, visible ? await plate.innerText() : 'no plate')
  check('in a session: nothing reloads by itself', (await log(page)).length === 0, `${(await log(page)).length} loads`)
  check('the plate has no close button', visible && (await plate.locator('.wi-close').count()) === 0)
  await page.screenshot({ path: `${S}/e2e-plate-390.png` })

  // 2. The button: one reload, into the new version.
  await clearLog(page)
  await plate.locator('button').click()
  await waitMounted(page, '2.9.4').catch(() => {})
  check('Update opens the new version', (await running(page)) === '2.9.4', `running ${await running(page)}`)

  // 3. A start after a release: straight into it, the old one never drawn.
  deploy('A') // a rollback is a new version too
  await later(page)
  await clearLog(page)
  await page.reload()
  await waitMounted(page, '2.9.3').catch(() => {})
  const l3 = await log(page)
  const old3 = l3.find((e) => e.v === '2.9.4')
  check('a start after a release opens the new version', (await running(page)) === '2.9.3', `running ${await running(page)}`)
  check('…behind the update screen, the old build never mounted', !!old3 && old3.splash && !old3.mounted, JSON.stringify(l3.map(({ v, splash, mounted, splashText }) => ({ v, splash, mounted, splashText }))))

  // 4. Announced, never pressed: the next start applies it, no question asked.
  deploy('B')
  await navigate(page, '/ru/factions')
  await plate.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {})
  check('a second release in the same session shows the plate again', await plate.isVisible())
  await later(page)
  await clearLog(page)
  await page.reload()
  await waitMounted(page, '2.9.4').catch(() => {})
  const l4 = await log(page)
  check('not pressed: the next start opens it', (await running(page)) === '2.9.4', JSON.stringify(l4.map(({ v, splash, mounted }) => ({ v, splash, mounted }))))
  check('…the old build never mounted', l4.filter((e) => e.v === '2.9.3').every((e) => !e.mounted))

  // 5. Nothing new: a plain start, no screen.
  await later(page)
  await clearLog(page)
  await page.reload()
  await waitMounted(page, '2.9.4')
  const l5 = await log(page)
  check('nothing new: one load, no screen', l5.length === 1 && !l5[0].splash, JSON.stringify(l5.map(({ v, splash }) => ({ v, splash }))))
  await ctx.close()
}

// ── The installed app (standalone emulated, 1440px) ──────────────────────────
deploy('A')
{
  const { ctx, page } = await open({ standalone: true, viewport: { width: 1440, height: 900 } })
  await page.goto(`${BASE}/ru/`)
  await controlled(page)
  await waitMounted(page, '2.9.3')
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
  await waitMounted(page, '2.9.4').catch(() => {})
  check('installed: Update opens the new version', (await running(page)) === '2.9.4')

  // Offline right after: the new build's pages are already there.
  await ctx.setOffline(true)
  await page.goto(`${BASE}/ru/factions/orks`).catch(() => {})
  const ok = await page.waitForFunction(() => document.querySelector('meta[name="wh-app-version"]')?.content === '2.9.4' && /Orks/.test(document.body.innerText), null, { timeout: 20000 }).then(() => true, () => false)
  const seenOffline = await page.evaluate(() => `${document.querySelector('meta[name="wh-app-version"]')?.content} | ${document.body.innerText.slice(0, 160).replace(/\s+/g, ' ')}`).catch((e) => String(e))
  check('installed: offline straight after the update, a faction page opens', ok, seenOffline)
  await ctx.setOffline(false)
  await ctx.close()
}

const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} passed`)
process.exit(failed.length ? 1 : 0)

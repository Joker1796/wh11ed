/* global caches, document, matchMedia, window, indexedDB */
// Real SW + Cache API, isolated browser storage, no requests to production. Two built releases
// are served like the bucket (old immutable files remain). No owner's browser/profile is used.
// LEGACY=1 accepts baseline 0997897b as build A (WH_BUILD_INFO without offlineProtocol).
import http from 'node:http'
import { readFile, writeFile } from 'node:fs/promises'
import { join, extname, resolve } from 'node:path'
import { chromium, webkit } from 'playwright-core'

const [aDir, bDir] = process.argv.slice(2).map((path) => resolve(path))
if (!aDir || !bDir) throw new Error('Usage: node scripts/stability-e2e.mjs <build-a> <build-b>')
const legacy = process.env.LEGACY === '1'
const engine = (process.env.ENGINE || process.argv[4]) === 'webkit' ? webkit : chromium
const a = JSON.parse(await readFile(join(aDir, 'version.json')))
const b = JSON.parse(await readFile(join(bDir, 'version.json')))
if (a.build === b.build) throw new Error('Two different builds required')
const fixture = '/assets/stability-next-build.js'
const bManifest = JSON.parse(await readFile(join(bDir, b.manifest)))
if (!bManifest.assets.files.includes(fixture)) {
  bManifest.assets.files.push(fixture)
  bManifest.assets.bytes += 21
  await writeFile(join(bDir, fixture), 'export default true;\n')
  await writeFile(join(bDir, b.manifest), JSON.stringify(bManifest))
}
const aManifest = JSON.parse(await readFile(join(aDir, a.manifest)))
const returnFixture = '/assets/stability-return-build.js'
if (!aManifest.assets.files.includes(returnFixture)) {
  aManifest.assets.files.push(returnFixture)
  aManifest.assets.bytes += 21
  await writeFile(join(aDir, returnFixture), 'export default true;\n')
  await writeFile(join(aDir, a.manifest), JSON.stringify(aManifest))
}
const target = aManifest.assets.files.find((f) => /\/RosterCreateView-[^/]+\.js$/.test(f))
if (!target) throw new Error('Roster create chunk missing')
let live = aDir
const faults = new Set([target])
const hits = new Map()
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' }
const server = http.createServer(async (req, res) => {
  const path = new URL(req.url, 'http://local').pathname
  hits.set(path, (hits.get(path) || 0) + 1)
  if (faults.has(path)) { res.writeHead(503); res.end('temporary failure'); return }
  const file = path === '/' || !extname(path) ? '/index.html' : path
  for (const dir of [...new Set([live, aDir, bDir])]) {
    if (dir !== live && !/^\/(assets|images|releases)\//.test(file)) continue
    try {
      const body = await readFile(join(dir, file))
      res.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream')
      res.setHeader('Cache-Control', /^\/(assets|releases)\//.test(file) ? 'public,max-age=31536000,immutable' : 'no-cache')
      res.end(body)
      return
    } catch { /* another retained release may hold it */ }
  }
  res.writeHead(404); res.end('missing')
})
await new Promise((r) => server.listen(0, '127.0.0.1', r))
const base = `http://127.0.0.1:${server.address().port}`
let browser
let page
const assert = (name, condition) => { if (!condition) throw new Error(name); console.log(`✓ ${name}`) }
try {
  browser = await engine.launch(engine === chromium ? { channel: 'chrome', headless: true } : { headless: true })
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  await context.route('https://**/*', (route) => route.abort())
  await context.addInitScript(() => {
    window.__offlineProtocolErrors = []
    const NativeChannel = MessageChannel
    window.MessageChannel = class extends NativeChannel {
      constructor() {
        super()
        this.port1.addEventListener('message', event => {
          if (event.data?.type === 'error') window.__offlineProtocolErrors.push(event.data.message)
        })
        this.port1.start()
      }
    }
    const real = matchMedia.bind(window)
    window.matchMedia = (query) => query.includes('display-mode: standalone') ? { ...real(query), matches: true, addEventListener() {}, removeEventListener() {} } : real(query)
    localStorage.setItem('wh11ed-welcome-seen', '1')
    localStorage.setItem('wh11ed-app-first-run', '1')
    localStorage.setItem('wh11ed-tour-auto', 'off')
  })
  page = await context.newPage()
  const waitWarmed = () => page.waitForFunction(() => localStorage.getItem('wh11ed-offline-warmed'), null, { timeout: 60000 })
  const build = () => page.locator('meta[name="wh-build-id"]').getAttribute('content')
  const workerIdentity = tab => tab.evaluate(async () => {
    await navigator.serviceWorker.ready
    const registration = await navigator.serviceWorker.getRegistration()
    return new Promise((resolve, reject) => {
      const channel = new MessageChannel()
      const timer = setTimeout(() => { channel.port1.close(); channel.port2.close(); reject(Error('worker identity timed out')) }, 10000)
      channel.port1.onmessage = ({ data }) => {
        clearTimeout(timer); channel.port1.close(); channel.port2.close(); resolve(data)
      }
      ;(navigator.serviceWorker.controller || registration.active).postMessage({ type: 'WH_BUILD_INFO' }, [channel.port2])
    })
  })
  await page.goto(base, { waitUntil: 'load' })
  for (let i = 0; i < 200 && !hits.has(target); i++) await page.waitForTimeout(100)
  await page.waitForTimeout(300)
  assert('HTTP 503 cannot certify offline readiness', hits.has(target) && !await page.evaluate(() => localStorage.getItem('wh11ed-offline-warmed')))
  faults.clear()
  await page.reload({ waitUntil: 'load' })
  await waitWarmed()
  const initialIdentity = await workerIdentity(page)
  assert('initial worker reports the expected build and offline protocol', initialIdentity.build === a.build
    && (legacy ? initialIdentity.offlineProtocol === undefined : initialIdentity.offlineProtocol === 1))
  assert('interrupted download resumes and completes', await page.evaluate(async (url) => Boolean(await caches.match(url)), target))
  await context.setOffline(true)
  await page.goto(base + '/roster/new', { waitUntil: 'load' })
  await page.locator('.roster-create').waitFor({ state: 'visible', timeout: 15000 })
  assert('create roster opens after a fresh offline navigation', true)
  await context.setOffline(false)
  await page.evaluate(async (url) => { await (await caches.open('wh-rules-assets')).delete(url) }, target)
  const before = hits.get(target)
  await page.goto(base, { waitUntil: 'load' })
  for (let i = 0; i < 200 && hits.get(target) <= before; i++) await page.waitForTimeout(100)
  await waitWarmed()
  assert('cache eviction is repaired despite the existing marker', hits.get(target) > before)
  const checkFullCache = (identity, files) => page.evaluate(async ({ identity, files }) => {
    const cache = await caches.open('wh-rules-assets')
    for (let i = 0; i < 1300; i++) await cache.put(`/assets/unused-${i}.js`, new Response('unused'))
    await new Promise((resolve, reject) => {
      const channel = new MessageChannel()
      const timer = setTimeout(() => reject(Error('full-cache preparation timed out')), 60000)
      channel.port1.onmessage = ({ data }) => {
        if (data.type === 'error' || data.type === 'ready') {
          clearTimeout(timer); channel.port1.close(); channel.port2.close()
          if (data.type === 'error') reject(Error(data.message)); else resolve()
        }
      }
      navigator.serviceWorker.controller.postMessage({ type: 'WH_OFFLINE_PREPARE', target: identity }, [channel.port2])
    })
    // Real historical Workbox metadata survives an upgrade. A reverted runtime ExpirationPlugin
    // would evict protected entries on the next cached read even after preparation said ready.
    const db = await new Promise((resolve, reject) => {
      const request = indexedDB.open('workbox-expiration', 1)
      request.onupgradeneeded = () => {
        const store = request.result.createObjectStore('cache-entries', { keyPath: 'id' })
        store.createIndex('cacheName', 'cacheName')
        store.createIndex('timestamp', 'timestamp')
      }
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
    try {
      await new Promise((resolve, reject) => {
        const tx = db.transaction('cache-entries', 'readwrite')
        const store = tx.objectStore('cache-entries')
        const put = (path, timestamp) => {
          const url = new URL(path, window.location.origin).href
          store.put({ id: `wh-rules-assets|${url}`, url, cacheName: 'wh-rules-assets', timestamp })
        }
        for (const url of files) put(url, Date.now() - 1000)
        for (let i = 0; i < 1300; i++) put(`/assets/unused-${i}.js`, Date.now())
        tx.oncomplete = resolve
        tx.onerror = () => reject(tx.error)
      })
    } finally { db.close() }
    await (await fetch(files[0], { cache: 'no-store' })).arrayBuffer()
    await new Promise(resolve => setTimeout(resolve, 500))
    for (const url of files) if (!(await cache.match(url))?.ok) throw Error(`Protected file lost: ${url}`)
  }, { identity, files })
  if (!legacy) {
    await checkFullCache(a, aManifest.assets.files)
    assert('full-cache cleanup preserves every current-build asset above the former LRU capacity', true)
  }

  let companion
  let companionNavigations = 0
  if (legacy) {
    companion = await context.newPage()
    await companion.goto(base + '/roster/new', { waitUntil: 'load' })
    await companion.locator('.roster-create').waitFor({ state: 'visible', timeout: 15000 })
    assert('second tab is still running the legacy build', await companion.locator('meta[name="wh-build-id"]').getAttribute('content') === a.build)
    await companion.evaluate(() => { window.__legacyTabSentinel = true })
    companion.on('framenavigated', frame => { if (frame === companion.mainFrame()) companionNavigations++ })
  }
  faults.add(fixture)
  live = bDir
  await page.evaluate(async () => { await (await navigator.serviceWorker.getRegistration()).update() })
  const button = page.locator('.update-plate .up-apply')
  await button.waitFor({ state: 'visible', timeout: 60000 })
  await button.click()
  await button.waitFor({ state: 'visible', timeout: 30000 })
  assert('incomplete new build cannot replace the working offline build', await build() === a.build)
  faults.clear()
  await button.click()
  await page.waitForFunction((id) => document.querySelector('meta[name="wh-build-id"]')?.content === id, b.build, { timeout: 60000 })
  assert('retry activates the exact verified build', await build() === b.build)
  const updatedIdentity = await workerIdentity(page)
  assert('activated worker reports protocol 1 for the exact new build', updatedIdentity.build === b.build && updatedIdentity.offlineProtocol === 1)
  if (legacy) {
    await companion.waitForFunction(async id => {
      if (!navigator.serviceWorker.controller) return false
      return new Promise(resolve => {
        const channel = new MessageChannel()
        const timer = setTimeout(() => { channel.port1.close(); channel.port2.close(); resolve(false) }, 1000)
        channel.port1.onmessage = ({ data }) => {
          clearTimeout(timer); channel.port1.close(); channel.port2.close(); resolve(data.build === id && data.offlineProtocol === 1)
        }
        navigator.serviceWorker.controller.postMessage({ type: 'WH_BUILD_INFO' }, [channel.port2])
      })
    }, b.build, { timeout: 15000 })
    await companion.waitForTimeout(500)
    assert('another tab activating the new worker does not reload the legacy tab', companionNavigations === 0
      && await companion.evaluate(() => window.__legacyTabSentinel === true)
      && await companion.locator('meta[name="wh-build-id"]').getAttribute('content') === a.build)
    await context.setOffline(true)
    await companion.locator('a[href="/roster"], a[href="/ru/roster"]').filter({ visible: true }).first().click()
    await companion.locator('.rl-head').waitFor({ state: 'visible', timeout: 15000 })
    await companion.goBack()
    await companion.locator('.roster-create').waitFor({ state: 'visible', timeout: 15000 })
    assert('legacy tab routes remain available offline after controller replacement', await companion.evaluate(() => window.__legacyTabSentinel === true))
    await context.setOffline(false)
    await checkFullCache(b, bManifest.assets.files)
    assert('new worker protects its full cache despite legacy Workbox expiration metadata', true)
    await companion.close()
  }
  await context.setOffline(true)
  await page.goto(base + '/roster/new', { waitUntil: 'load' })
  await page.locator('.roster-create').waitFor({ state: 'visible', timeout: 15000 })
  assert('new build is complete offline immediately after activation', await build() === b.build)
  await context.setOffline(false)
  await page.goto(base + '/ru/roster/new', { waitUntil: 'load' })
  await page.evaluate(async (url) => { await (await caches.open('wh-rules-assets')).delete(url) }, returnFixture)
  faults.add(returnFixture)
  live = aDir
  await page.evaluate(async () => { await (await navigator.serviceWorker.getRegistration()).update() })
  await button.waitFor({ state: 'visible', timeout: 60000 })
  assert('failed preparation offers Continue rather than Update', /^(Continue|Продолжить)$/.test(await button.innerText()))
  assert('failed preparation keeps the current build', await build() === b.build)
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 844 })
    const geometry = await page.locator('.update-plate').evaluate(el => ({ width: el.clientWidth, scroll: el.scrollWidth, page: document.documentElement.scrollWidth, viewport: window.innerWidth }))
    assert(`error plate fits ${width}px`, geometry.scroll <= geometry.width + 1 && geometry.page <= geometry.viewport + 1)
    if (process.env.SHOTS) await page.screenshot({ path: `${process.env.SHOTS}/pwa-retry-${width}.png` })
  }
  await page.setViewportSize({ width: 390, height: 844 })
  faults.clear()
  await button.click()
  await page.waitForFunction((id) => document.querySelector('meta[name="wh-build-id"]')?.content === id, a.build, { timeout: 60000 })
  await context.setOffline(true)
  await page.goto(base + '/roster/new', { waitUntil: 'load' })
  await page.locator('.roster-create').waitFor({ state: 'visible', timeout: 15000 })
  assert('rollback to a retained release also works offline', await build() === a.build)
  await context.close()
} catch (err) {
  if (page && !page.isClosed()) {
    console.error(JSON.stringify(await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.getRegistration()
      return {
        build: document.querySelector('meta[name="wh-build-id"]')?.content,
        plate: document.querySelector('.update-plate')?.textContent,
        active: reg?.active?.state, waiting: reg?.waiting?.state, installing: reg?.installing?.state,
        marker: localStorage.getItem('wh11ed-offline-warmed'),
        protocolErrors: window.__offlineProtocolErrors,
      }
    })))
  }
  throw err
} finally {
  await browser?.close()
  await new Promise((r) => server.close(r))
}

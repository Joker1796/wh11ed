/* global indexedDB, document, getComputedStyle */
// End-to-end route outcomes on a production build; isolated browser, no production requests.
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { resolve, join, extname } from 'node:path'
import { chromium } from 'playwright-core'
const root = resolve(process.argv[2] || 'dist')
const types = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }
const server = createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://local').pathname)
  let file = join(root, pathname)
  if (!file.startsWith(root + '/') || !existsSync(file) || !statSync(file).isFile()) file = join(root, 'index.html')
  res.setHeader('Content-Type', types[extname(file)] || 'text/html')
  res.end(readFileSync(file))
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const base = `http://127.0.0.1:${server.address().port}`
let browser
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true })
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 900 } })
    await context.addInitScript(() => {
      localStorage.setItem('wh11ed-welcome-seen', '1')
      indexedDB.open = () => ({}) // No success/error event: exercise the real storage-open deadline.
    })
    const page = await context.newPage()
    await page.goto(base + '/ru/core-rules', { waitUntil: 'networkidle' })
    await page.waitForFunction(() => !!document.querySelector('#app')?.__vue_app__, null, { timeout: 2000 })
    await page.locator('.local-data-startup--background').waitFor({ timeout: 2000 })
    if (process.env.NAV_SCREENSHOT) await page.screenshot({ path: process.env.NAV_SCREENSHOT })
    assert.equal(await page.locator('.local-data-startup').evaluate(el => getComputedStyle(el).pointerEvents), 'none')
    await context.close()
    console.log('PASS navigation: rules usable while storage opens')
  }
  for (const mode of ['superseded', 'retry']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 900 } })
    await context.addInitScript(() => localStorage.setItem('wh11ed-welcome-seen', '1'))
    const page = await context.newPage()
    let blocked = true, documents = 0, hits = 0
    page.on('request', req => { if (req.isNavigationRequest() && req.frame() === page.mainFrame()) documents++ })
    await page.route('**/assets/FactionEmblem-*.js', async route => {
      hits++
      if (blocked) await new Promise(() => {})
      else await route.continue().catch(() => {})
    })
    await page.goto(base + '/ru', { waitUntil: 'networkidle' })
    await page.locator('a[href="/tracker"]:visible').first().click()
    if (mode === 'superseded') {
      await page.locator('a[href="/changelog"]:visible').first().click()
      await page.waitForURL('**/ru/changelog')
      await page.waitForTimeout(9000)
      assert.equal(new URL(page.url()).pathname, '/ru/changelog')
      assert.equal(documents, 1, 'an abandoned route must not reload a later screen')
    } else {
      const notice = page.locator('.navigation-notice')
      await notice.getByText('Не удалось открыть раздел.', { exact: false }).waitFor({ timeout: 11000 })
      assert.equal(documents, 1, 'a failed click must not reload automatically')
      const box = await notice.boundingBox()
      assert.ok(box && box.y >= 0 && box.y + box.height <= 900, 'retry must be visible in the viewport')
      blocked = false
      await notice.getByRole('button', { name: 'Повторить' }).click()
      await page.waitForURL('**/ru/tracker')
      await page.getByText('Новая игра', { exact: true }).first().waitFor()
      assert.equal(documents, 2, 'retry opens the requested destination in a fresh document')
    }
    assert.ok(hits > 0, 'the shared module fault must actually be exercised')
    await context.close()
    console.log(`PASS navigation: ${mode}`)
  }
  // The reported entry points: the rules picker closes before a route loads, and both
  // roster editing controls resolve to the same lazy editor. Exercise real failed fetches.
  for (const [dest, chunk, entry] of [
    ['/core-rules', 'CoreRulesView', 'rules'],
    ['/event-companion', 'EventCompanionView', 'rules'],
    ['/dominatus', 'DominatusView', 'rules'],
    ['/combat-patrol', 'CombatPatrolIndexView', 'rules'],
    ['/patches', 'PatchesView', 'rules'],
    ['/roster/navigation-test', 'RosterEditorView', 'pencil'],
    ['/roster/navigation-test', 'RosterEditorView', 'menu'],
  ]) {
    const context = await browser.newContext({ viewport: { width: 390, height: 900 } })
    await context.addInitScript(() => {
      localStorage.setItem('wh11ed-welcome-seen', '1')
      localStorage.setItem('wh11ed-tour-auto', 'off')
      localStorage.setItem('wh11ed-rosters', JSON.stringify({ v: 13, rosters: [{ id: 'navigation-test', name: 'Navigation test', faction: 'orks', detachments: [], units: [], battleSize: 'strike-force', customPoints: 2000, createdAt: Date.now(), updatedAt: Date.now(), summary: { points: 0, unitCount: 0, issues: 0 } }] }))
    })
    const page = await context.newPage()
    let hits = 0, documents = 0
    page.on('request', req => { if (req.isNavigationRequest() && req.frame() === page.mainFrame()) documents++ })
    await page.route(`**/assets/${chunk}-*.js`, route => { hits++; return route.abort('failed') })
    await page.goto(base + (entry === 'pencil' ? '/ru/roster/navigation-test/view' : entry === 'menu' ? '/ru/roster' : '/ru'), { waitUntil: 'networkidle' })
    if (entry === 'rules') {
      await page.locator('.bottom-nav button').filter({ hasText: 'Правила' }).click()
      await page.locator(`.rule-link[href="${dest}"]`).click()
    } else {
      for (let i = 0; i < 3; i++) {
        const close = page.locator('.modal-overlay .mh-close:visible').first()
        if (await close.count()) await close.click()
        else break
      }
      if (entry === 'pencil') await page.locator('[data-tour="rv-edit"]').click()
      else {
        await page.locator('[data-tour="roster-card-menu"]').click()
        await page.getByRole('button', { name: 'Редактировать', exact: true }).click()
      }
    }
    await page.locator('.navigation-notice').getByRole('button', { name: 'Повторить' }).waitFor({ timeout: 11000 })
    assert.ok(hits > 0, `${entry} must request ${chunk}`)
    assert.equal(documents, 1, `${entry} must not reload silently`)
    await context.close()
    console.log(`PASS navigation: failed ${entry} ${dest}`)
  }

} finally {
  await browser?.close()
  server.closeAllConnections()
  await new Promise(resolve => server.close(resolve))
}

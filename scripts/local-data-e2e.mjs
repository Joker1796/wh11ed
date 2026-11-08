// Real IndexedDB, Web Locks and localStorage in isolated Chrome/WebKit contexts.
// Start Vite first; LOCAL_DATA_URL may point to another local dev origin.
import assert from 'node:assert/strict'
import { chromium, webkit } from 'playwright-core'

const base = process.env.LOCAL_DATA_URL || 'http://localhost:5176'
for (const [name, engine] of [['chrome', chromium], ['webkit', webkit]]) {
  const browser = await engine.launch(name === 'chrome' ? { channel: 'chrome', headless: true } : { headless: true })
  const context = await browser.newContext()
  let debugPage
  try {
    const page = await context.newPage()
    await page.goto(base)
    const result = await page.evaluate(async () => {
      const { openLocalDatabase } = await import('/src/utils/localDatabase.js')
      const { createLocalData } = await import('/src/composables/localData.js')
      const { LOCAL_KEYS } = await import('/src/utils/localRecords.js')
      const expect = (ok, message) => { if (!ok) throw Error(message) }
      const rosterKey = LOCAL_KEYS[0]
      const original = JSON.stringify({ v: 13, rosters: [{ id: 'r', name: 'Before', units: [] }] })
      localStorage.setItem(rosterKey, original)
      const name = `local-data-test-${crypto.randomUUID()}`
      const namespace = `wh-local-test/${name}/`
      const open = () => openLocalDatabase({ name })
      const a = createLocalData({ open, namespace }), b = createLocalData({ open, namespace })
      expect(await a.initialize(), 'first migration failed')
      expect(await b.initialize(), 'second tab initialization failed')
      expect(localStorage.getItem(rosterKey) === original, 'migration modified its source')
      const db = await open()
      expect((await db.metadata()).find((r) => r.key === 'legacy-original').entries.some(([k, v]) => k === rosterKey && v === original), 'missing exact rollback copy')
      const save = (client, name, extras = []) => client.write([[rosterKey, JSON.stringify({ v: 13, rosters: [{ id: 'r', name, units: [] }, ...extras] })]])
      const primary = async () => JSON.parse((await db.read()).find((r) => r.key === 'roster/r').value).name
      save(a, 'First tab')
      expect(await a.flush(), 'first tab save failed')
      save(b, 'Second tab')
      expect(!await b.flush() && !!b.state.conflict, 'stale second save was not refused')
      expect(await primary() === 'First tab', 'conflict overwrote first tab')
      const independent = createLocalData({ open, namespace })
      expect(await independent.initialize(), 'independent reader failed')
      expect(!independent.state.conflict && JSON.parse(independent.getItem(rosterKey)).rosters.find((r) => r.id === 'r').name === 'First tab', 'a live tab\'s pending candidate leaked into another tab')
      await independent.close()
      save(b, 'Second tab')
      await b.flush()
      await db.recovery()
      expect(!b.state.error, 'continuing an edit after conflict could not be saved to recovery')
      const decision = b.state.conflict
      save(a, 'First tab again')
      expect(await a.flush(), 'second first-tab save failed')
      expect(!await b.confirm(decision), 'old confirmation overwrote a newer save')
      expect(await primary() === 'First tab again', 'confirmation race lost newer save')
      expect(await b.confirm(b.state.conflict), 'fresh confirmation failed')
      expect(await primary() === 'Second tab', 'confirmed variant was not committed')
      const backups = await db.recovery()
      expect(backups.some((r) => r.confirmed && r.before.some((row) => row.value?.includes('First tab again'))), 'confirmation lost replaced version')

      // Two stale collection views touching different ids must merge without confirmation.
      const c = createLocalData({ open, namespace }), d = createLocalData({ open, namespace })
      expect(await c.initialize() && await d.initialize(), 'fresh readers failed')
      save(c, 'Second tab', [{ id: 'new-c', name: 'C' }])
      expect(await c.flush(), 'independent create C failed')
      save(d, 'Second tab', [{ id: 'new-d', name: 'D' }])
      expect(await d.flush(), 'independent create D conflicted')
      const ids = (await db.read()).filter((r) => r.value && r.key.startsWith('roster/')).map((r) => r.key)
      expect(ids.includes('roster/new-c') && ids.includes('roster/new-d'), 'collection save dropped another tab\'s new list')

      // Archive is all-or-nothing even when the destination write aborts the transaction.
      const game = JSON.stringify({ id: 'g', phase: 'finished', players: [{}, {}], settings: {} })
      c.write([[LOCAL_KEYS[1], game]])
      expect(await c.flush(), 'current game save failed')
      const put = globalThis.IDBObjectStore.prototype.put
      let abort = true
      globalThis.IDBObjectStore.prototype.put = function (value, ...args) {
        if (abort && this.name === 'records' && value.key === 'history/g') { this.transaction.abort(); return {} }
        return put.call(this, value, ...args)
      }
      try {
        c.write([[LOCAL_KEYS[1], null], [LOCAL_KEYS[2], `[${game}]`]])
        expect(!await c.flush(), 'aborted archive claimed success')
      } finally { abort = false; globalThis.IDBObjectStore.prototype.put = put }
      const afterAbort = await db.read()
      expect(afterAbort.find((r) => r.key === 'current')?.value === game, 'abort cleared the source game')
      expect(!afterAbort.find((r) => r.key === 'history/g')?.value, 'abort partially wrote history')
      expect(await c.flush(), 'archive retry failed')
      const afterRetry = await db.read()
      expect(afterRetry.find((r) => r.key === 'current')?.value === null && afterRetry.find((r) => r.key === 'history/g')?.value === game, 'archive retry did not commit both ends')

      // A full synchronous journal must not prevent IDB saving ordinary edits.
      const limitedStorage = {
        get length() { return localStorage.length },
        key: (i) => localStorage.key(i), getItem: (k) => localStorage.getItem(k), removeItem: (k) => localStorage.removeItem(k),
        setItem(k, v) { if (k.startsWith(namespace)) throw new DOMException('full', 'QuotaExceededError'); localStorage.setItem(k, v) },
      }
      const e = createLocalData({ open, namespace, storage: limitedStorage })
      expect(await e.initialize(), 'quota reader failed')
      save(e, 'IDB survives full localStorage', [{ id: 'new-c', name: 'C' }, { id: 'new-d', name: 'D' }])
      expect(await e.flush(), 'full journal blocked available IndexedDB')
      expect(await primary() === 'IDB survives full localStorage', 'IDB did not save after journal quota')
      expect(!e.state.error, 'successful IDB commit kept a false error')
      const stickyJournal = { ...limitedStorage,
        get length() { return localStorage.length },
        setItem: (k, v) => localStorage.setItem(k, v),
        removeItem(k) { if (k.startsWith(namespace)) throw new DOMException('denied', 'SecurityError'); localStorage.removeItem(k) },
      }
      const sticky = createLocalData({ open, namespace, storage: stickyJournal })
      expect(await sticky.initialize(), 'sticky journal initialization failed')
      save(sticky, 'Already committed old journal')
      expect(await sticky.flush(), 'sticky journal save failed')
      const newer = createLocalData({ open, namespace })
      expect(await newer.initialize(), 'newer reader initialization failed')
      save(newer, 'Newer than the old journal')
      expect(await newer.flush(), 'newer reader save failed')
      await sticky.close()
      await newer.close()
      const afterSticky = createLocalData({ open, namespace })
      expect(await afterSticky.initialize(), 'sticky journal recovery failed')
      expect(!afterSticky.state.conflict && JSON.parse(afterSticky.getItem(rosterKey)).rosters.find((r) => r.id === 'r').name === 'Newer than the old journal', 'already committed orphan journal resurrected stale data')
      await afterSticky.close()
      await Promise.all([a.close(), b.close(), c.close(), d.close(), e.close()])
      db.close()

      // Leave a synchronous journal with a deliberately suspended IDB submission, then close
      // this page. The next real page must recover it after Web Locks releases the owner.
      const crashName = `local-data-crash-${crypto.randomUUID()}`
      const crashNamespace = `wh-local-test/${crashName}/`
      const crashOpen = async () => {
        const database = await openLocalDatabase({ name: crashName })
        return { ...database, commit: () => new Promise(() => {}) }
      }
      const crashed = createLocalData({ open: crashOpen, namespace: crashNamespace })
      expect(await crashed.initialize(), 'crash fixture initialization failed')
      save(crashed, 'Recovered after a killed page')
      return { passed: true, crashName, crashNamespace, source: original }
    })
    assert.equal(result.passed, true)
    await page.close()
    const reopened = await context.newPage()
    await reopened.goto(base)
    const recovered = await reopened.evaluate(async ({ crashName, crashNamespace }) => {
      const { createLocalData } = await import('/src/composables/localData.js')
      const { openLocalDatabase } = await import('/src/utils/localDatabase.js')
      const client = createLocalData({ namespace: crashNamespace, open: () => openLocalDatabase({ name: crashName }) })
      if (!await client.initialize()) throw Error(client.state.error)
      const value = JSON.parse(client.getItem('wh11ed-rosters')).rosters.find((r) => r.id === 'r').name
      await client.close()
      return value
    }, result)
    assert.equal(recovered, 'Recovered after a killed page')
    const uiContext = await browser.newContext({ viewport: { width: 390, height: 844 } })
    await uiContext.addInitScript(() => {
      if (localStorage.getItem('local-ui-seeded')) return
      localStorage.setItem('local-ui-seeded', '1')
      localStorage.setItem('wh11ed-rosters', JSON.stringify({ v: 13, rosters: [{ id: 'ui-r', name: 'Две вкладки', faction: 'orks', units: [], detachments: [], battleSize: 'strike-force', createdAt: 1, updatedAt: 1 }] }))
    })
    const first = await uiContext.newPage(), second = await uiContext.newPage()
    debugPage = second
    const uiErrors = []
    for (const tab of [first, second]) {
      tab.on('pageerror', (error) => uiErrors.push({ message: error.message, stack: error.stack, url: tab.url() }))
      tab.on('requestfailed', (request) => { if (/\.js(?:\?|$)/.test(request.url())) console.error('module request failed', { url: request.url(), failure: request.failure(), page: tab.url() }) })
    }
    for (const tab of [first, second]) {
      await tab.goto(base + '/ru/roster')
      await tab.locator('.rl-head').waitFor()
      await tab.evaluate(async () => {
        // Follow Vite's actual import URLs, including HMR timestamps. Importing a bare store
        // URL after a source edit would create a second singleton unrelated to the rendered UI.
        const source = await (await fetch('/src/views/tracker/RosterListView.vue')).text()
        const storeUrl = source.match(/from "([^"\n]*\/useRosters\.js[^"\n]*)"/)[1]
        const storeSource = await (await fetch(storeUrl)).text()
        const dataUrl = storeSource.match(/from "([^"\n]*\/localData\.js[^"\n]*)"/)[1]
        const { useRosters } = await import(storeUrl)
        const { localData } = await import(dataUrl)
        globalThis.productData = { store: useRosters(), localData }
      })
    }
    const edit = async (tab, value) => tab.evaluate(async (name) => {
      const { store, localData } = globalThis.productData
      store.renameRoster('ui-r', name)
      store.saveNow()
      return localData.flush()
    }, value)
    assert.equal(await edit(first, 'Первая сохранила'), true)
    assert.equal(await edit(second, 'Вторая сохраняет'), false)
    await second.getByRole('dialog').waitFor()
    await second.waitForFunction(() => {
      let node = globalThis.document.querySelector('[role=dialog]')
      if (!node) return false
      if (node.closest('.modal-overlay').classList.contains('modal-enter-active')) return false
      const rect = node.getBoundingClientRect()
      if (rect.top < 0 || rect.bottom > globalThis.innerHeight) return false
      while (node) { if (Number(globalThis.getComputedStyle(node).opacity) < 0.999) return false; node = node.parentElement }
      return true
    })
    const dialogSize = await second.getByRole('dialog').evaluate((el) => ({ width: el.getBoundingClientRect().width, viewport: globalThis.innerWidth, buttons: [...el.querySelectorAll('.modal-foot button')].map((b) => b.getBoundingClientRect().height) }))
    assert.ok(dialogSize.width <= dialogSize.viewport && dialogSize.buttons.every((height) => height >= 44), JSON.stringify(dialogSize))
    await second.screenshot({ path: `/private/tmp/wh-local-conflict-${name}.png`, fullPage: true, animations: 'disabled' })
    await second.getByRole('button', { name: 'Продолжить редактирование', exact: true }).click()
    await second.getByRole('dialog').waitFor({ state: 'hidden' })
    assert.equal(await edit(second, 'Вторая продолжила'), false)
    await second.getByRole('dialog').waitFor()
    assert.equal(await edit(first, 'Первая успела ещё раз'), true)
    await second.getByRole('button', { name: 'Сохранить мой вариант', exact: true }).click()
    await second.waitForFunction(async () => {
      const { localData } = globalThis.productData
      return localData.state.conflict?.records.some((r) => r.value?.includes('Первая успела ещё раз'))
    })
    await second.getByRole('dialog').waitFor()
    await second.getByRole('button', { name: 'Сохранить мой вариант', exact: true }).click()
    await second.waitForFunction(() => !globalThis.productData.localData.state.conflict)
    await second.getByRole('dialog').waitFor({ state: 'hidden' })
    const savedName = await second.evaluate(async () => {
      const backup = await globalThis.productData.localData.backup()
      return JSON.parse(backup.items['wh11ed-rosters']).rosters.find((r) => r.id === 'ui-r').name
    })
    assert.equal(savedName, 'Вторая продолжила')
    await second.waitForLoadState('networkidle')
    await second.reload()
    await second.locator('.rl-head').waitFor()
    await second.getByText('Вторая продолжила', { exact: true }).waitFor()
    await second.waitForLoadState('networkidle')
    await second.getByRole('link', { name: 'Трекер', exact: true }).first().click()
    await second.locator('.tracker-home').waitFor()
    const archived = await second.evaluate(async () => {
      const source = await (await fetch('/src/views/tracker/TrackerHomeView.vue')).text()
      const trackerUrl = source.match(/from "([^"\n]*\/useTracker\.js[^"\n]*)"/)[1]
      const trackerSource = await (await fetch(trackerUrl)).text()
      const dataUrl = trackerSource.match(/from "([^"\n]*\/localData\.js[^"\n]*)"/)[1]
      const { useTracker, DISPOSITIONS } = await import(trackerUrl)
      const { localData } = await import(dataUrl)
      const tracker = useTracker()
      tracker.newGame({ settings: { firstTurn: 1, battleSize: 'strikeForce' }, players: DISPOSITIONS.slice(0, 2).map((d) => ({ disposition: d.id, role: 'attacker', secondaryMode: 'tactical' })) })
      tracker.beginGame()
      tracker.setCp(0, 5)
      const id = tracker.current.value.id
      tracker.finishGame('early')
      tracker.archiveGame()
      if (!await localData.flush()) throw Error('real tracker archive failed: ' + JSON.stringify(localData.state))
      const backup = await localData.backup()
      return { id, current: backup.items['wh11ed-tracker-current'], game: JSON.parse(backup.items['wh11ed-tracker-history']).find((g) => g.id === id) }
    })
    assert.equal(archived.current, null)
    assert.equal(archived.game.players[0].cp, 5)
    await second.waitForLoadState('networkidle')
    await second.reload()
    await second.waitForFunction(async (id) => {
      const { localData } = await import('/src/composables/localData.js')
      if (localData.state.phase !== 'ready') return false
      return JSON.parse(localData.getItem('wh11ed-tracker-history') || '[]').some((g) => g.id === id)
    }, archived.id)
    assert.deepEqual(uiErrors, [])
    await uiContext.close()
    console.log(`${name}: migration, stale save, confirmation race, independent records, aborted archive, journal quota, committed journal replay, killed-page recovery and two-tab UI passed`)
  } catch (error) {
    if (debugPage && !debugPage.isClosed()) {
      await debugPage.screenshot({ path: `/private/tmp/wh-local-failed-${name}.png`, fullPage: true })
      console.error('UI failure detail', await debugPage.evaluate(async () => {
        const source = await (await fetch('/src/App.vue')).text()
        const url = source.match(/from "([^"\n]*\/localData\.js[^"\n]*)"/)[1]
        const { localData } = await import(url)
        return { url: globalThis.location.href, state: JSON.parse(JSON.stringify(localData.state)), backup: await localData.backup(), locks: await navigator.locks.query(), visible: globalThis.document.querySelector('main')?.innerText }
      }))
    }
    throw error
  } finally { await browser.close() }
}

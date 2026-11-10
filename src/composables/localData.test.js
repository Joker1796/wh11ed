import { describe, it, expect, beforeEach } from 'vitest'
import { IDBFactory } from 'fake-indexeddb'
import { createLocalData, LEGACY_RETIRE_MS } from './localData.js'
import { openLocalDatabase } from '../utils/localDatabase.js'
import { LOCAL_KEYS } from '../utils/localRecords.js'
import { stableJson } from '../utils/stableJson.js'

// The IndexedDB coordinator against an in-process IndexedDB. scripts/local-data-e2e.mjs drives the
// same contract in real Chrome/WebKit; this file keeps the core of it in `npm test` and CI.

const [ROSTERS, CURRENT, HISTORY] = LOCAL_KEYS

function memoryStorage(seed = {}) {
  const map = new Map(Object.entries(seed))
  return {
    map,
    get length() { return map.size },
    key: (i) => [...map.keys()][i] ?? null,
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => { map.set(k, String(v)) },
    removeItem: (k) => { map.delete(k) },
  }
}

// Web Locks as a browser shares them between tabs: one manager per "browser".
function lockManager() {
  const held = new Set()
  return {
    async request(name, opts, cb) {
      if (typeof opts === 'function') { cb = opts; opts = {} }
      if (held.has(name)) {
        if (opts.ifAvailable) return cb(null)
        throw new Error(`test lock manager cannot wait for ${name}`)
      }
      held.add(name)
      try { return await cb({ name }) } finally { held.delete(name) }
    },
  }
}

const roster = (id, name, extra = {}) => ({ id, name, units: [], ...extra })
const rosters = (...list) => JSON.stringify({ v: 13, rosters: list })
const names = (client) => JSON.parse(client.getItem(ROSTERS)).rosters.map((r) => `${r.id}:${r.name}`).sort()

let factory, storage, locks, name
const open = () => openLocalDatabase({ factory, name })
const client = (overrides = {}) => createLocalData({ storage, locks, open, namespace: 'test-pending/', ...overrides })
const records = async () => { const db = await open(); try { return await db.read() } finally { db.close() } }
const recovery = async () => { const db = await open(); try { return await db.recovery() } finally { db.close() } }

beforeEach(() => {
  factory = new IDBFactory()
  storage = memoryStorage()
  locks = lockManager()
  name = `local-${Math.random().toString(36).slice(2)}`
})

describe('localData — migration', () => {
  it('copies the legacy keys, keeps the source and reads back the same view', async () => {
    const original = rosters(roster('a', 'Alpha'), roster('b', 'Beta'))
    storage.setItem(ROSTERS, original)
    const a = client()
    expect(await a.initialize()).toBe(true)
    expect(a.state.phase).toBe('ready')
    expect(names(a)).toEqual(['a:Alpha', 'b:Beta'])
    expect(storage.getItem(ROSTERS)).toBe(original)
    expect((await records()).map((r) => r.key).sort()).toEqual(['roster/a', 'roster/b'])
    await a.close()
  })

  it('counts rosters and games separately while copying', async () => {
    storage.setItem(ROSTERS, rosters(roster('a', 'A'), roster('b', 'B')))
    storage.setItem(HISTORY, JSON.stringify([{ id: 'g', players: [{}, {}], settings: {} }]))
    const a = client()
    await a.initialize()
    expect(a.state.progress.rosters).toEqual({ done: 2, total: 2 })
    expect(a.state.progress.games).toEqual({ done: 1, total: 1 })
    await a.close()
  })

  it.each([
    ['a null roster', [roster('ok', 'Healthy'), null]],
    ['a duplicate id', [roster('ok', 'Healthy'), roster('ok', 'Second variant')]],
    ['a malformed unit', [roster('ok', 'Healthy'), { id: 'bad', name: 'Bad', units: [null] }]],
  ])('quarantines %s and keeps the healthy rosters editable', async (_label, list) => {
    const original = JSON.stringify({ v: 13, rosters: list })
    storage.setItem(ROSTERS, original)
    const a = client()
    expect(await a.initialize()).toBe(true)
    expect(names(a)).toContain('ok:Healthy')
    expect(a.state.quarantineCount).toBeGreaterThan(0)
    expect((await recovery()).some((r) => r.status === 'quarantined')).toBe(true)
    a.write([[ROSTERS, rosters(roster('ok', 'Edited'))]])
    expect(await a.flush()).toBe(true)
    expect(storage.getItem(ROSTERS)).toBe(original)
    await a.close()
  })

  it('a broken legacy copy after migration does not block the migrated database', async () => {
    storage.setItem(ROSTERS, rosters(roster('a', 'Alpha')))
    const a = client()
    await a.initialize()
    await a.close()
    storage.setItem(ROSTERS, '{not json')
    const b = client()
    expect(await b.initialize()).toBe(true)
    expect(names(b)).toEqual(['a:Alpha'])
    await b.close()
  })

  it('retries a database open that failed once', async () => {
    storage.setItem(ROSTERS, rosters(roster('a', 'Alpha')))
    let attempts = 0
    const a = client({ open: () => (++attempts === 1 ? Promise.reject(new Error('Local database open timed out')) : open()) })
    expect(await a.initialize()).toBe(true)
    expect(attempts).toBe(2)
    expect(names(a)).toEqual(['a:Alpha'])
    await a.close()
  })

  it('an unreadable database leaves the phase in error, not an empty ready view', async () => {
    storage.setItem(ROSTERS, rosters(roster('a', 'Alpha')))
    const a = client({ open: () => Promise.reject(new Error('IndexedDB unavailable')) })
    expect(await a.initialize()).toBe(false)
    expect(a.state.phase).toBe('error')
  })
})

describe('localData — writes and conflicts', () => {
  beforeEach(() => storage.setItem(ROSTERS, rosters(roster('r', 'Before'))))

  it('commits a write that another tab then reads', async () => {
    const a = client()
    await a.initialize()
    a.write([[ROSTERS, rosters(roster('r', 'After'))]])
    expect(await a.flush()).toBe(true)
    const b = client()
    await b.initialize()
    expect(names(b)).toEqual(['r:After'])
    await Promise.all([a.close(), b.close()])
  })

  it('refuses a stale save from a second tab, then commits it only on confirmation', async () => {
    const a = client(), b = client()
    await a.initialize(); await b.initialize()
    a.write([[ROSTERS, rosters(roster('r', 'First tab'))]])
    expect(await a.flush()).toBe(true)
    b.write([[ROSTERS, rosters(roster('r', 'Second tab'))]])
    expect(await b.flush()).toBe(false)
    expect(b.state.conflict).toBeTruthy()
    const stored = async () => JSON.parse((await records()).find((r) => r.key === 'roster/r').value).name
    expect(await stored()).toBe('First tab')
    expect(await b.confirm(b.state.conflict)).toBe(true)
    expect(await stored()).toBe('Second tab')
    expect((await recovery()).some((r) => r.confirmed && r.before.some((row) => row.value?.includes('First tab')))).toBe(true)
    await Promise.all([a.close(), b.close()])
  })

  it('a confirmation shown before a newer save does not overwrite it', async () => {
    const a = client(), b = client()
    await a.initialize(); await b.initialize()
    a.write([[ROSTERS, rosters(roster('r', 'First'))]]); await a.flush()
    b.write([[ROSTERS, rosters(roster('r', 'Mine'))]]); await b.flush()
    const decision = b.state.conflict
    b.write([[ROSTERS, rosters(roster('r', 'Mine'))]]); await b.flush()
    a.write([[ROSTERS, rosters(roster('r', 'Newer'))]]); expect(await a.flush()).toBe(true)
    expect(await b.confirm(decision)).toBe(false)
    expect(JSON.parse((await records()).find((r) => r.key === 'roster/r').value).name).toBe('Newer')
    await Promise.all([a.close(), b.close()])
  })

  it('merges two tabs that add different rosters without asking', async () => {
    const c = client(), d = client()
    await c.initialize(); await d.initialize()
    c.write([[ROSTERS, rosters(roster('r', 'Before'), roster('c', 'C'))]])
    expect(await c.flush()).toBe(true)
    d.write([[ROSTERS, rosters(roster('r', 'Before'), roster('d', 'D'))]])
    expect(await d.flush()).toBe(true)
    const keys = (await records()).filter((r) => r.value).map((r) => r.key).sort()
    expect(keys).toEqual(['roster/c', 'roster/d', 'roster/r'])
    await Promise.all([c.close(), d.close()])
  })

  it('archives a game atomically: current and history change together', async () => {
    const game = JSON.stringify({ id: 'g', phase: 'finished', players: [{}, {}], settings: {} })
    const a = client()
    await a.initialize()
    a.write([[CURRENT, game]]); expect(await a.flush()).toBe(true)
    a.write([[CURRENT, null], [HISTORY, `[${game}]`]]); expect(await a.flush()).toBe(true)
    const rows = await records()
    expect(rows.find((r) => r.key === 'current').value).toBeNull()
    expect(rows.find((r) => r.key === 'history/g').value).toBe(game)
    await a.close()
  })

  it('a full synchronous journal does not stop an ordinary IndexedDB save', async () => {
    const full = { ...memoryStorage(), get length() { return storage.length }, key: storage.key, getItem: storage.getItem, removeItem: storage.removeItem,
      setItem(k, v) { if (k.startsWith('test-pending/')) throw new DOMException('full', 'QuotaExceededError'); storage.setItem(k, v) } }
    const a = client({ storage: full })
    await a.initialize()
    a.write([[ROSTERS, rosters(roster('r', 'Saved anyway'))]])
    expect(await a.flush()).toBe(true)
    expect(a.state.error).toBeNull()
    await a.close()
  })

  it('a write that requires the journal is refused when the journal cannot be written', async () => {
    const full = { ...memoryStorage(), get length() { return storage.length }, key: storage.key, getItem: storage.getItem, removeItem: storage.removeItem,
      setItem(k, v) { if (k.startsWith('test-pending/')) throw new DOMException('full', 'QuotaExceededError'); storage.setItem(k, v) } }
    const a = client({ storage: full })
    await a.initialize()
    expect(a.write([[ROSTERS, rosters(roster('r', 'Critical'))]], { requireJournal: true })).toBe(false)
    expect(names(a)).toEqual(['r:Before'])
    await a.close()
  })
})

describe('localData — restart recovery', () => {
  beforeEach(() => storage.setItem(ROSTERS, rosters(roster('r', 'Before'))))

  it('replays the journal of a tab that died before its commit', async () => {
    const a = client()
    await a.initialize()
    await a.close()
    // What a tab killed between the synchronous journal and the IDB commit leaves behind.
    const value = stableJson({ ...roster('r', 'Unflushed'), v: 13 })
    storage.setItem('test-pending/dead-tab', JSON.stringify({ key: 'dead-tab/1', ops: [{ key: 'roster/r', value }], expected: { 'roster/r': 1 } }))
    const b = client()
    expect(await b.initialize()).toBe(true)
    expect(names(b)).toEqual(['r:Unflushed'])
    expect(storage.getItem('test-pending/dead-tab')).toBeNull()
    await b.close()
  })

  it('leaves the journal of a live tab alone', async () => {
    const value = stableJson({ ...roster('r', 'Still pending'), v: 13 })
    const a = client()
    await a.initialize()
    storage.setItem('test-pending/live-tab', JSON.stringify({ key: 'live-tab/1', ops: [{ key: 'roster/r', value }], expected: { 'roster/r': 1 } }))
    let release
    const held = locks.request('test-pending/live-tab', () => new Promise((resolve) => { release = resolve }))
    const b = client()
    expect(await b.initialize()).toBe(true)
    expect(names(b)).toEqual(['r:Before'])
    expect(storage.getItem('test-pending/live-tab')).not.toBeNull()
    release(); await held
    await Promise.all([a.close(), b.close()])
  })

  it('an already-committed journal left behind does not resurrect older data', async () => {
    const sticky = client({ storage: { ...storage, get length() { return storage.length }, key: storage.key, getItem: storage.getItem, setItem: storage.setItem,
      removeItem(k) { if (k.startsWith('test-pending/')) throw new DOMException('denied', 'SecurityError'); storage.removeItem(k) } } })
    await sticky.initialize()
    sticky.write([[ROSTERS, rosters(roster('r', 'Old journal'))]])
    expect(await sticky.flush()).toBe(true)
    const newer = client()
    await newer.initialize()
    newer.write([[ROSTERS, rosters(roster('r', 'Newer'))]])
    expect(await newer.flush()).toBe(true)
    await sticky.close(); await newer.close()
    const after = client()
    expect(await after.initialize()).toBe(true)
    expect(after.state.conflict).toBeNull()
    expect(names(after)).toEqual(['r:Newer'])
    await after.close()
  })
})

describe('localData — retiring the localStorage copy', () => {
  const age = async (ms) => {
    const db = await open()
    try { await db.putMeta({ ...(await db.meta('migration')), at: Date.now() - ms }) } finally { db.close() }
  }
  const meta = async (key) => { const db = await open(); try { return await db.meta(key) } finally { db.close() } }

  it('keeps the legacy keys during the window and stamps the migration time', async () => {
    const original = rosters(roster('a', 'Alpha'))
    storage.setItem(ROSTERS, original)
    const a = client(); await a.initialize(); await a.close()
    expect((await meta('migration')).at).toBeGreaterThan(0)
    await age(LEGACY_RETIRE_MS - 60_000)
    const b = client(); await b.initialize(); await b.close()
    expect(storage.getItem(ROSTERS)).toBe(original)
    expect(await meta('legacy-retired')).toBeNull()
  })

  it('removes the legacy keys after the window; the database and the exact original stay', async () => {
    const original = rosters(roster('a', 'Alpha'))
    storage.setItem(ROSTERS, original)
    const a = client(); await a.initialize()
    a.write([[ROSTERS, rosters(roster('a', 'Edited after migration'))]]); await a.flush(); await a.close()
    await age(LEGACY_RETIRE_MS + 60_000)
    const b = client()
    expect(await b.initialize()).toBe(true)
    expect(LOCAL_KEYS.map((k) => storage.getItem(k))).toEqual([null, null, null, null])
    expect(names(b)).toEqual(['a:Edited after migration'])
    expect((await meta('legacy-original')).entries).toContainEqual([ROSTERS, original])
    b.write([[ROSTERS, rosters(roster('a', 'Edited after retirement'))]]); expect(await b.flush()).toBe(true)
    await b.close()
    const c = client()
    expect(await c.initialize()).toBe(true)
    expect(names(c)).toEqual(['a:Edited after retirement'])
    expect(c.state.conflict).toBeNull()
    await c.close()
  })

  it('an old build writing the retired keys is kept in recovery, not imported or lost', async () => {
    storage.setItem(ROSTERS, rosters(roster('a', 'Alpha')))
    const a = client(); await a.initialize(); await a.close()
    await age(LEGACY_RETIRE_MS + 60_000)
    const b = client(); await b.initialize(); await b.close()
    const stale = rosters(roster('a', 'Old build'))
    storage.setItem(ROSTERS, stale)
    const c = client()
    expect(await c.initialize()).toBe(true)
    expect(names(c)).toEqual(['a:Alpha'])
    expect(storage.getItem(ROSTERS)).toBeNull()
    expect((await recovery()).some((r) => r.status === 'quarantined' && r.reason === 'retired-legacy' && r.raw === stale)).toBe(true)
    expect(c.state.quarantineCount).toBe(1)
    await c.close()
  })

  it('does not retire while an old build has unimported changes in conflict', async () => {
    storage.setItem(ROSTERS, rosters(roster('a', 'Alpha')))
    const a = client(); await a.initialize()
    a.write([[ROSTERS, rosters(roster('a', 'New build'))]]); await a.flush(); await a.close()
    // An old tab rewrites the same roster from its stale copy: a real conflict.
    storage.setItem(ROSTERS, rosters(roster('a', 'Old build edit')))
    await age(LEGACY_RETIRE_MS + 60_000)
    const b = client()
    await b.initialize()
    expect(await meta('legacy-retired')).toBeNull()
    expect(storage.getItem(ROSTERS)).not.toBeNull()
    await b.close()
  })
})

describe('localData — live views', () => {
  it('refreshes a clean snapshot after another client commits', async () => {
    storage.setItem(ROSTERS, rosters(roster('a', 'Original')))
    const a = client(), b = client()
    await a.initialize(); await b.initialize()
    let published = 0
    b.subscribe(() => published++)
    a.write([[ROSTERS, rosters(roster('a', 'Updated'))]])
    await a.flush()
    expect(await b.refresh()).toBe(true)
    expect(names(b)).toEqual(['a:Updated'])
    expect(published).toBe(1)
    await a.close(); await b.close()
  })
  it('captures edits still waiting in a view before reading a newer revision', async () => {
    storage.setItem(ROSTERS, rosters(roster('a', 'Original')))
    const a = client(), b = client()
    await a.initialize(); await b.initialize()
    b.beforeRefresh(() => b.write([[ROSTERS, rosters(roster('a', 'Unsaved view'))]]))
    a.write([[ROSTERS, rosters(roster('a', 'Other tab'))]])
    await a.flush()
    expect(await b.refresh()).toBe(false)
    expect(names(b)).toEqual(['a:Unsaved view'])
    expect(b.state.conflict).toBeTruthy()
    expect(JSON.parse((await records()).find(r => r.key === 'roster/a').value).name).toBe('Other tab')
    await a.close(); await b.close()
  })
})

describe('localData — refresh during a conflict', () => {
  it('updates clean records while preserving the dirty entity and its old revision', async () => {
    storage.setItem(ROSTERS, rosters(roster('a', 'Original A'), roster('b', 'Original B')))
    const a = client(), b = client()
    await a.initialize(); await b.initialize()
    a.write([[ROSTERS, rosters(roster('a', 'Remote A'), roster('b', 'Remote B'), roster('c', 'New C'))]])
    await a.flush()
    b.write([[ROSTERS, rosters(roster('a', 'Local A'), roster('b', 'Original B'))]])
    expect(await b.refresh()).toBe(false)
    expect(names(b)).toEqual(['a:Local A', 'b:Remote B', 'c:New C'])
    expect(b.state.conflict).toBeTruthy()
    expect(await b.confirm(b.state.conflict)).toBe(true)
    const fresh = client(); await fresh.initialize()
    expect(names(fresh)).toEqual(['a:Local A', 'b:Remote B', 'c:New C'])
    await a.close(); await b.close(); await fresh.close()
  })
})

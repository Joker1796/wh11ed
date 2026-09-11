import { beforeEach, describe, it, expect, vi } from 'vitest'

// useRosterSync is a module singleton, so every test re-imports it after vi.resetModules() —
// same harness as useCloudSync.test.js. Only useAuth is mocked; the real roster store is used,
// which is what makes the last-write-wins assertions meaningful.
const h = vi.hoisted(() => ({ status: { value: 'authed' }, fetchImpl: null, calls: [] }))

vi.mock('./useAuth.js', () => ({
  useAuth: () => ({
    status: h.status,
    authedFetch: (...args) => {
      h.calls.push([args[0], args[1]?.method || 'GET'])
      return h.fetchImpl(...args)
    },
  }),
}))

function roster(id, over = {}) {
  return {
    id,
    name: `List ${id}`,
    faction: 'orks',
    createdAt: 1000,
    updatedAt: 1000,
    detachments: [],
    battleSize: 'strike-force',
    units: [],
    summary: { points: 0, unitCount: 0, issues: 0 },
    ...over,
  }
}

// A cloud that answers from two plain maps — live lists and tombstones — so a test can state
// exactly what the "other device" left behind. Mirrors the API: DELETE buries rather than
// removes, PUT resurrects, and the listing returns both kinds.
function cloudFetch(store, graves = new Map()) {
  return (url, opts = {}) => {
    const method = opts.method || 'GET'
    if (url === '/rosters') {
      const rosters = [
        ...[...store.values()].map((r) => ({
          rosterId: r.id, name: r.name, faction: r.faction, updatedAt: r.updatedAt, points: 0, unitCount: 0,
        })),
        ...[...graves].map(([rosterId, deletedAt]) => ({ rosterId, deleted: true, deletedAt })),
      ]
      return Promise.resolve({ ok: true, status: 200, json: async () => ({ rosters }) })
    }
    const [, rawId, qs = ''] = url.match(/^\/rosters\/([^?]+)\??(.*)$/)
    const id = decodeURIComponent(rawId)
    if (method === 'PUT') {
      store.set(id, JSON.parse(opts.body))
      graves.delete(id)
      return Promise.resolve({ ok: true, status: 200 })
    }
    if (method === 'DELETE') {
      if (store.has(id)) graves.set(id, Number(new URLSearchParams(qs).get('at')) || 0)
      store.delete(id)
      return Promise.resolve({ ok: true, status: 204 })
    }
    const r = store.get(id)
    return Promise.resolve(r ? { ok: true, status: 200, json: async () => r } : { ok: false, status: 404 })
  }
}

let sync, store
async function load(seed = []) {
  vi.resetModules()
  localStorage.setItem('wh11ed-rosters', JSON.stringify({ v: 4, rosters: seed }))
  const rostersMod = await import('./useRosters.js')
  store = rostersMod.useRosters()
  const mod = await import('./useRosterSync.js')
  sync = mod.useRosterSync()
}

beforeEach(() => {
  localStorage.clear()
  h.status.value = 'authed'
  h.calls = []
})

describe('syncNow', () => {
  it('costs exactly one request when nothing changed', async () => {
    const cloud = new Map([['r1', { ...roster('r1'), v: 4 }]])
    await load([roster('r1')])
    h.fetchImpl = cloudFetch(cloud)
    await sync.syncNow()
    expect(h.calls).toEqual([['/rosters', 'GET']])
    expect(sync.pulled.value).toBe(null)
  })

  it('uploads the whole existing collection the first time (nothing in the cloud yet)', async () => {
    const cloud = new Map()
    await load([roster('r1'), roster('r2')])
    h.fetchImpl = cloudFetch(cloud)
    await sync.syncNow()
    expect([...cloud.keys()].sort()).toEqual(['r1', 'r2'])
  })

  it('never uploads a draft', async () => {
    const cloud = new Map()
    await load([roster('r1'), roster('d1', { draft: true, draftStep: 2 })])
    h.fetchImpl = cloudFetch(cloud)
    await sync.syncNow()
    expect([...cloud.keys()]).toEqual(['r1'])
  })

  it('pulls a list this device has never seen', async () => {
    const cloud = new Map([['r9', { ...roster('r9', { name: 'From the laptop' }), v: 4 }]])
    await load([])
    h.fetchImpl = cloudFetch(cloud)
    await sync.syncNow()
    expect(store.rosterById('r9')?.name).toBe('From the laptop')
    expect(sync.pulled.value).toEqual({ added: 1, updated: 0, removed: 0 })
  })

  it('takes the newer cloud version and reports the list as updated', async () => {
    const cloud = new Map([['r1', { ...roster('r1', { name: 'Newer', updatedAt: 5000 }), v: 4 }]])
    await load([roster('r1', { name: 'Older', updatedAt: 1000 })])
    h.fetchImpl = cloudFetch(cloud)
    await sync.syncNow()
    expect(store.rosterById('r1').name).toBe('Newer')
    expect(sync.pulled.value).toEqual({ added: 0, updated: 1, removed: 0 })
  })

  it('keeps a newer local list and does not push it — an unsaved edit is not cloud business', async () => {
    const cloud = new Map([['r1', { ...roster('r1', { name: 'Cloud', updatedAt: 1000 }), v: 4 }]])
    await load([roster('r1', { name: 'Local edit in progress', updatedAt: 9000 })])
    h.fetchImpl = cloudFetch(cloud)
    await sync.syncNow()
    expect(store.rosterById('r1').name).toBe('Local edit in progress')
    expect(cloud.get('r1').name).toBe('Cloud')
    expect(h.calls).toEqual([['/rosters', 'GET']])
  })

  it('does not restore a list deleted on this device, and finishes its cloud delete', async () => {
    const cloud = new Map([['r1', { ...roster('r1'), v: 4 }]])
    await load([roster('r1')])
    h.status.value = 'anon' // deleted while signed out: the local note is all we have
    h.fetchImpl = cloudFetch(cloud)
    await sync.removeFromCloud('r1')
    store.deleteRoster('r1')

    h.status.value = 'authed'
    await sync.syncNow()
    expect(cloud.has('r1')).toBe(false)
    expect(store.rosterById('r1')).toBe(null)
  })

  it('drops a list the cloud says was deleted on another device', async () => {
    const graves = new Map([['r1', 5000]])
    await load([roster('r1', { updatedAt: 1000 })])
    h.fetchImpl = cloudFetch(new Map(), graves)
    await sync.syncNow()
    expect(store.rosterById('r1')).toBe(null)
    expect(sync.pulled.value).toEqual({ added: 0, updated: 0, removed: 1 })
  })

  it('re-uploads a list saved AFTER it was deleted elsewhere — an explicit save outranks a delete', async () => {
    const cloud = new Map()
    const graves = new Map([['r1', 5000]])
    await load([roster('r1', { name: 'Saved again', updatedAt: 9000 })])
    h.fetchImpl = cloudFetch(cloud, graves)
    await sync.syncNow()
    expect(store.rosterById('r1')?.name).toBe('Saved again')
    expect(cloud.get('r1').name).toBe('Saved again')
    expect(graves.has('r1')).toBe(false)
  })

  it('stops re-sending a delete once the server holds the tombstone', async () => {
    const cloud = new Map([['r1', { ...roster('r1'), v: 4 }]])
    const graves = new Map()
    await load([roster('r1')])
    h.fetchImpl = cloudFetch(cloud, graves)
    await sync.removeFromCloud('r1')
    store.deleteRoster('r1')
    expect(graves.has('r1')).toBe(true)

    h.calls = []
    await sync.syncNow()
    expect(h.calls).toEqual([['/rosters', 'GET']])
  })

  it('does not bury a draft that happens to share an id with a cloud tombstone', async () => {
    await load([roster('d1', { draft: true, updatedAt: 1000 })])
    h.fetchImpl = cloudFetch(new Map(), new Map([['d1', 5000]]))
    await sync.syncNow()
    expect(store.rosterById('d1')).not.toBe(null)
  })
})

describe('saveToCloud', () => {
  it('uploads the saved list and reports it', async () => {
    const cloud = new Map()
    await load([roster('r1', { name: 'Saved' })])
    h.fetchImpl = cloudFetch(cloud)
    expect(await sync.saveToCloud('r1')).toBe(true)
    expect(cloud.get('r1').name).toBe('Saved')
    expect(sync.savedAt.value).toBeGreaterThan(0)
    expect(sync.pendingCount.value).toBe(0)
  })

  it('queues a save made while signed out and uploads it on the next sync', async () => {
    const cloud = new Map()
    await load([roster('r1')])
    h.status.value = 'anon'
    h.fetchImpl = cloudFetch(cloud)
    expect(await sync.saveToCloud('r1')).toBe(false)
    expect(sync.pendingCount.value).toBe(1)

    h.status.value = 'authed'
    await sync.syncNow()
    expect(cloud.has('r1')).toBe(true)
    expect(sync.pendingCount.value).toBe(0)
  })

  it('refuses a draft', async () => {
    await load([roster('d1', { draft: true })])
    h.fetchImpl = () => { throw new Error('should not be called') }
    expect(await sync.saveToCloud('d1')).toBe(false)
  })

  it('stops retrying a list the API will never accept, but surfaces the error', async () => {
    await load([roster('r1')])
    h.fetchImpl = () => Promise.resolve({ ok: false, status: 413 })
    expect(await sync.saveToCloud('r1')).toBe(false)
    expect(sync.pendingCount.value).toBe(0)
    expect(sync.lastError.value).toMatch(/413/)
  })
})

import { webcrypto } from 'node:crypto'
import { contentHash } from '../utils/contentHash.js'
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'

// useRosterSync is a module singleton, so every test re-imports it after vi.resetModules() —
// same harness as useCloudSync.test.js. Only useAuth is mocked; the real roster store is used,
// which is what makes the last-write-wins assertions meaningful.
const h = vi.hoisted(() => ({ user: { value: { id: 'test-user' } }, status: { value: 'authed' }, fetchImpl: null, calls: [] }))

vi.mock('./useAuth.js', () => ({
  useAuth: () => ({
    status: h.status,
    user: h.user,
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
  const revisions = new Map([...store.keys(), ...graves.keys()].map((id) => [id, 1]))
  const hashes = new Map()
  const response = (status, body) => ({ ok: status < 300, status, json: async () => body })
  const observe = async (id) => {
    const r = store.get(id)
    if (!r) return hashes.get(id) || ''
    const hash = await contentHash(r)
    if (hashes.has(id) && hashes.get(id) !== hash) revisions.set(id, (revisions.get(id) || 0) + 1)
    hashes.set(id, hash)
    return hash
  }
  return async (url, opts = {}) => {
    const method = opts.method || 'GET'
    if (url === '/roster-sync') {
      const live = await Promise.all([...store.values()].map(async (r) => ({
        rosterId: r.id, name: r.name, faction: r.faction, updatedAt: r.updatedAt, points: 0, unitCount: 0,
        contentHash: await observe(r.id), revision: revisions.get(r.id),
      })))
      const dead = [...graves].map(([rosterId, deletedAt]) => ({ rosterId, deleted: true, deletedAt, revision: revisions.get(rosterId) || 1, contentHash: hashes.get(rosterId) || '' }))
      return response(200, { rosters: [...live, ...dead], protocol: 2 })
    }
    const match = url.match(/^\/roster-sync\/([^?]+)\??(.*)$/)
    if (!match) return response(404, { error: 'not_found' })
    const [, rawId, qs = ''] = match
    const id = decodeURIComponent(rawId)
    const hash = await observe(id)
    const revision = revisions.get(id) || 0
    if (method === 'PUT') {
      const body = JSON.parse(opts.body)
      const incoming = await contentHash(body.roster)
      if (store.has(id) && incoming === hash) return response(200, { revision, contentHash: hash })
      if (body.baseRevision !== revision) return response(409, { error: 'conflict', revision })
      store.set(id, body.roster)
      graves.delete(id)
      revisions.set(id, revision + 1)
      hashes.set(id, incoming)
      return response(200, { revision: revision + 1, contentHash: incoming })
    }
    if (method === 'DELETE') {
      if (Number(new URLSearchParams(qs).get('baseRevision')) !== revision && !graves.has(id)) return response(409, { error: 'conflict', revision })
      if (store.has(id)) {
        graves.set(id, Number(new URLSearchParams(qs).get('at')) || 0)
        store.delete(id)
        revisions.set(id, revision + 1)
      }
      return response(200, { revision: revisions.get(id) || 0 })
    }
    const r = store.get(id)
    return r ? response(200, { roster: r, revision, contentHash: hash }) : response(404, { error: 'not_found' })
  }
}

let sync, store
async function load(seed = []) {
  vi.resetModules()
  localStorage.setItem('wh11ed-rosters', JSON.stringify({ v: 13, rosters: seed }))
  const rostersMod = await import('./useRosters.js')
  store = rostersMod.useRosters()
  const mod = await import('./useRosterSync.js')
  sync = mod.useRosterSync()
}

beforeEach(() => {
  localStorage.clear()
  h.status.value = 'authed'
  h.calls = []
  h.user.value = { id: 'test-user' }
  vi.stubGlobal('crypto', webcrypto)
})
afterEach(() => vi.unstubAllGlobals())

describe('syncNow', () => {
  it('does not restore a local roster deleted while its remote download was pending', async () => {
    const cloud = new Map([['r1', { ...roster('r1', { name: 'Remote' }), v: 13 }]])
    await load([roster('r1')])
    const fetchCloud = cloudFetch(cloud)
    h.fetchImpl = async (url, options) => {
      const response = await fetchCloud(url, options)
      if (url === '/roster-sync/r1') store.deleteRoster('r1')
      return response
    }
    await sync.syncNow()
    expect(store.rosterById('r1')).toBe(null)
    expect(store.rosters.value).toHaveLength(0)
  })

  it('does not adopt a download after the account changes', async () => {
    await load([])
    const fetchCloud = cloudFetch(new Map([['r1', { ...roster('r1'), v: 13 }]]))
    h.fetchImpl = async (url, options) => {
      const response = await fetchCloud(url, options)
      if (url === '/roster-sync/r1') h.user.value = { id: 'another-user' }
      return response
    }
    await sync.syncNow()
    expect(store.rosters.value).toHaveLength(0)
    expect(sync.lastError.value).toMatch(/Account changed/)
  })

  it('costs exactly one request when nothing changed', async () => {
    const cloud = new Map([['r1', { ...roster('r1'), v: 13 }]])
    await load([roster('r1')])
    h.fetchImpl = cloudFetch(cloud)
    await sync.syncNow()
    expect(h.calls).toEqual([['/roster-sync', 'GET']])
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
    const cloud = new Map([['r9', { ...roster('r9', { name: 'From the laptop' }), v: 13 }]])
    await load([])
    h.fetchImpl = cloudFetch(cloud)
    await sync.syncNow()
    expect(store.rosterById('r9')?.name).toBe('From the laptop')
    expect(sync.pulled.value).toEqual({ added: 1, updated: 0, removed: 0 })
  })

  it('takes the newer cloud version and reports the list as updated', async () => {
    const cloud = new Map([['r1', { ...roster('r1', { name: 'Newer', updatedAt: 5000 }), v: 13 }]])
    await load([roster('r1', { name: 'Older', updatedAt: 1000 })])
    h.fetchImpl = cloudFetch(cloud)
    await sync.syncNow()
    expect(store.rosterById('r1').name).toBe('Newer')
    expect(store.draftRosters.value.some((r) => r.name.startsWith('Older'))).toBe(true)
    expect(sync.conflict.value.draft).toBe(true)
  })

  it('keeps a newer local list and does not push it — an unsaved edit is not cloud business', async () => {
    const cloud = new Map([['r1', { ...roster('r1', { name: 'Cloud', updatedAt: 1000 }), v: 13 }]])
    await load([roster('r1', { name: 'Local edit in progress', updatedAt: 9000 })])
    h.fetchImpl = cloudFetch(cloud)
    await sync.syncNow()
    expect(store.draftRosters.value.some((r) => r.name.startsWith('Local edit in progress'))).toBe(true)
    expect(cloud.get('r1').name).toBe('Cloud')
    expect(h.calls.every(([, method]) => method === 'GET')).toBe(true)
  })

  it('does not restore a list deleted on this device, and finishes its cloud delete', async () => {
    const cloud = new Map([['r1', { ...roster('r1'), v: 13 }]])
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

  it('drops a proven unchanged list when another device deleted it', async () => {
    const cloud = new Map([['r1', { ...roster('r1'), v: 13 }]])
    await load([roster('r1')])
    h.fetchImpl = cloudFetch(cloud)
    await sync.syncNow()
    await h.fetchImpl('/roster-sync/r1?baseRevision=1&at=5000', { method: 'DELETE' })
    await sync.syncNow()
    expect(store.rosterById('r1')).toBe(null)
    expect(sync.pulled.value).toEqual({ added: 0, updated: 0, removed: 1 })
  })

  it('preserves an explicit save racing a remote deletion as a separate saved copy', async () => {
    const cloud = new Map()
    const graves = new Map([['r1', 5000]])
    await load([roster('r1', { name: 'Saved again', updatedAt: 6000 })])
    h.status.value = 'anon'
    await sync.saveToCloud('r1')
    h.status.value = 'authed'
    h.fetchImpl = cloudFetch(cloud, graves)
    await sync.syncNow()
    const copy = store.savedRosters.value.find((r) => r.conflictOf === 'r1')
    expect(copy.name).toMatch(/^Saved again/)
    expect(cloud.get(copy.id).name).toBe(copy.name)
    expect(graves.has('r1')).toBe(true)
  })

  it('stops re-sending a delete once the server holds the tombstone', async () => {
    const cloud = new Map([['r1', { ...roster('r1'), v: 13 }]])
    const graves = new Map()
    await load([roster('r1')])
    h.fetchImpl = cloudFetch(cloud, graves)
    await sync.removeFromCloud('r1')
    store.deleteRoster('r1')
    expect(graves.has('r1')).toBe(true)

    h.calls = []
    await sync.syncNow()
    expect(h.calls).toEqual([['/roster-sync', 'GET']])
  })

  it('does not bury a draft that happens to share an id with a cloud tombstone', async () => {
    await load([roster('d1', { draft: true, updatedAt: 1000 })])
    h.fetchImpl = cloudFetch(new Map(), new Map([['d1', 5000]]))
    await sync.syncNow()
    expect(store.rosterById('d1')).not.toBe(null)
  })
})

describe('saveToCloud', () => {
  it('captures the Save click before waiting for the local database transaction', async () => {
    const cloud = new Map()
    await load([roster('r1')])
    h.fetchImpl = cloudFetch(cloud)
    const { localData } = await import('./localData.js')
    let release
    const flush = vi.spyOn(localData, 'flush').mockImplementation(() => new Promise((resolve) => { release = resolve }))
    localData.state.phase = 'ready'
    try {
      store.renameRoster('r1', 'Clicked Save')
      const saving = sync.saveToCloud('r1')
      store.renameRoster('r1', 'Unfinished while IDB saves')
      release(true)
      expect(await saving).toBe(true)
      expect(cloud.get('r1').name).toBe('Clicked Save')
      expect(store.rosterById('r1').name).toBe('Unfinished while IDB saves')
    } finally { localData.state.phase = 'idle'; flush.mockRestore() }
  })

  it('keeps unfinished edits in Drafts when the clicked Save loses a real conflict', async () => {
    const cloud = new Map([['r1', { ...roster('r1'), v: 13 }]])
    await load([roster('r1')])
    const fetchCloud = cloudFetch(cloud)
    h.fetchImpl = fetchCloud
    await sync.syncNow()
    cloud.set('r1', { ...roster('r1', { name: 'Other device' }), v: 13 })
    store.renameRoster('r1', 'Clicked Save')
    h.fetchImpl = async (url, options) => {
      const response = await fetchCloud(url, options)
      if (options?.method === 'PUT') store.renameRoster('r1', 'Unfinished')
      return response
    }
    expect(await sync.saveToCloud('r1')).toBe(false)
    expect(store.draftRosters.value.some((r) => r.name.startsWith('Unfinished'))).toBe(true)
    expect(cloud.size).toBe(1)
    expect(cloud.get('r1').name).toBe('Other device')
  })

  it('does not clear a newer pending Save when an earlier response arrives last', async () => {
    await load([roster('r1')])
    const fetchCloud = cloudFetch(new Map())
    let release
    h.fetchImpl = async (url, options) => {
      const response = await fetchCloud(url, options)
      if (!release) await new Promise((resolve) => { release = resolve })
      else return { ok: false, status: 503, json: async () => ({}) }
      return response
    }
    const first = sync.saveToCloud('r1')
    await vi.waitFor(() => expect(release).toBeTypeOf('function'))
    store.renameRoster('r1', 'Second Save')
    expect(await sync.saveToCloud('r1')).toBe(false)
    release()
    await first
    expect(sync.pendingCount.value).toBe(1)
    expect(sync.uploading.value).toBe(false)
  })

  it('retries the clicked Save snapshot without uploading edits made while the request was pending', async () => {
    const cloud = new Map([['r1', { ...roster('r1'), v: 13 }]])
    await load([roster('r1')])
    const fetchCloud = cloudFetch(cloud)
    let first = true
    h.fetchImpl = async (url, options) => {
      const response = await fetchCloud(url, options)
      if (options?.method === 'PUT' && first) {
        first = false
        store.renameRoster('r1', 'Unfinished after Save')
      }
      return response
    }
    store.renameRoster('r1', 'Clicked Save')
    expect(await sync.saveToCloud('r1')).toBe(true)
    expect(cloud.get('r1').name).toBe('Clicked Save')
    expect(store.rosterById('r1').name).toBe('Unfinished after Save')
  })

  it('preserves both saves when another device changed the base, regardless of the local clock', async () => {
    const cloud = new Map([['r1', { ...roster('r1'), v: 13 }]])
    await load([roster('r1')])
    h.fetchImpl = cloudFetch(cloud)
    await sync.syncNow()
    cloud.set('r1', { ...roster('r1', { name: 'Other device', updatedAt: 500 }), v: 13 })
    store.renameRoster('r1', 'My edit')
    expect(await sync.saveToCloud('r1')).toBe(true)
    expect(cloud.get('r1').name).toBe('Other device')
    const copy = store.savedRosters.value.find((r) => r.conflictOf === 'r1')
    expect(copy.name).toMatch(/^My edit/)
    expect(cloud.get(copy.id).name).toBe(copy.name)
    expect(store.rosterById('r1').name).toBe('Other device')
    expect(sync.pendingCount.value).toBe(0)
  })

  it('does not replace the local source if the conflict copy cannot be saved durably', async () => {
    const cloud = new Map([['r1', { ...roster('r1'), v: 13 }]])
    await load([roster('r1')])
    h.fetchImpl = cloudFetch(cloud)
    await sync.syncNow()
    cloud.set('r1', { ...roster('r1', { name: 'Other device' }), v: 13 })
    store.renameRoster('r1', 'My edit')
    const write = localStorage.setItem.bind(localStorage)
    const spy = vi.spyOn(localStorage, 'setItem').mockImplementation((key, value) => {
      if (key === 'wh11ed-rosters') throw new DOMException('full', 'QuotaExceededError')
      write(key, value)
    })
    expect(await sync.saveToCloud('r1')).toBe(false)
    expect(store.rosterById('r1').name).toBe('My edit')
    expect(sync.pendingCount.value).toBe(1)
    expect(cloud.get('r1').name).toBe('Other device')
    spy.mockRestore()
  })

  it('keeps a pending save on an older API instead of falling back to an unguarded write', async () => {
    await load([roster('r1')])
    h.fetchImpl = async () => ({ ok: false, status: 404, json: async () => ({ error: 'not_found' }) })
    expect(await sync.saveToCloud('r1')).toBe(false)
    expect(sync.pendingCount.value).toBe(1)
    expect(h.calls.every(([url]) => url.startsWith('/roster-sync'))).toBe(true)
  })
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

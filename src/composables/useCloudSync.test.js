import { beforeEach, describe, it, expect, vi } from 'vitest'

// Shared, hoisted controls for the mocked dependencies. useCloudSync is a module singleton,
// so we vi.resetModules() per test and re-import.
const h = vi.hoisted(() => ({ history: null, status: { value: 'authed' }, fetchImpl: null }))

vi.mock('./useAuth.js', () => ({
  useAuth: () => ({
    status: h.status,
    authedFetch: (...args) => h.fetchImpl(...args),
  }),
}))

// Keep the real isValidGame; only override useTracker to expose a controllable history ref.
vi.mock('./useTracker.js', async (orig) => {
  const actual = await orig()
  const { ref } = await import('vue')
  h.history = ref([])
  return { ...actual, useTracker: () => ({ history: h.history }) }
})

// A minimally-valid finished game (passes isValidGame: 2 players + settings).
function game(id, over = {}) {
  return {
    id,
    finishedAt: '2026-01-01T00:00:00.000Z',
    players: [{ name: 'A' }, { name: 'B' }],
    settings: {},
    ...over,
  }
}

let cloud
async function load() {
  vi.resetModules()
  const mod = await import('./useCloudSync.js')
  cloud = mod.useCloudSync()
}

beforeEach(() => {
  localStorage.clear()
  h.status.value = 'authed'
  h.fetchImpl = null
})

describe('syncNow', () => {
  it('counts failed uploads and surfaces them in lastError', async () => {
    await load()
    h.history.value = [game('g1'), game('g2')]
    h.fetchImpl = (url, opts) => {
      if (opts?.method === 'PUT') return Promise.resolve({ ok: false, status: 500 })
      return Promise.resolve({ ok: true, json: async () => ({ games: [] }) })
    }
    await cloud.syncNow()
    expect(cloud.lastError.value).toMatch(/failed to upload/i)
  })

  it('clears lastError when all uploads succeed', async () => {
    await load()
    h.history.value = [game('g1')]
    h.fetchImpl = (url, opts) => {
      if (opts?.method === 'PUT') return Promise.resolve({ ok: true })
      return Promise.resolve({ ok: true, json: async () => ({ games: [{ gameId: 'g1' }] }) })
    }
    await cloud.syncNow()
    expect(cloud.lastError.value).toBeNull()
    expect(cloud.isBackedUp('g1')).toBe(true)
  })

  it('rejects a malformed restored game but accepts a valid one', async () => {
    await load()
    h.history.value = []
    h.fetchImpl = (url, opts) => {
      if (opts?.method === 'PUT') return Promise.resolve({ ok: true })
      if (url === '/games') {
        return Promise.resolve({ ok: true, json: async () => ({ games: [{ gameId: 'bad' }, { gameId: 'good' }] }) })
      }
      if (url.endsWith('bad')) return Promise.resolve({ ok: true, json: async () => ({ id: 'bad', junk: true }) })
      if (url.endsWith('good')) return Promise.resolve({ ok: true, json: async () => game('good') })
      return Promise.resolve({ ok: false })
    }
    await cloud.syncNow()
    const ids = h.history.value.map((g) => g.id)
    expect(ids).toContain('good')
    expect(ids).not.toContain('bad')
  })
})

describe('refreshCloudList', () => {
  it('merges the server list with optimistically-synced ids (no icon flap on replica lag)', async () => {
    // Pre-seed an optimistic synced id before the module initialises.
    localStorage.setItem('wh11ed-tracker-synced', JSON.stringify(['g1']))
    await load()
    h.history.value = []
    // Server list lags and does NOT include g1 yet.
    h.fetchImpl = () => Promise.resolve({ ok: true, json: async () => ({ games: [] }) })
    await cloud.refreshCloudList()
    expect(cloud.isBackedUp('g1')).toBe(true) // still backed up, not flipped to pending
  })

  it('is a no-op when not authed', async () => {
    await load()
    h.status.value = 'anon'
    let called = false
    h.fetchImpl = () => { called = true; return Promise.resolve({ ok: true, json: async () => ({ games: [] }) }) }
    await cloud.refreshCloudList()
    expect(called).toBe(false)
  })
})

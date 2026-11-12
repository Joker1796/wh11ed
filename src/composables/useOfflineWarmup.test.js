import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// The warm-up is what pays for the small precache: the shell is ~1 MB and everything else arrives
// only when somebody asks for it. These pin the three things a reader would notice if they broke —
// that the button downloads the whole list, that it says the size before spending their data, and
// that "already downloaded" cannot be claimed for a set that was never fetched.

const MANIFEST = {
  assets: { files: ['/assets/a.js', '/assets/b.js'], bytes: 3 * 1048576 },
  images: { files: ['/images/x.webp'], bytes: 7 * 1048576 },
}

let held
let fetched
function mockFetch(manifest = MANIFEST) {
  fetched = []
  vi.stubGlobal('fetch', vi.fn(async (url) => {
    fetched.push(url)
    if (url === '/offline-manifest.json') return { ok: true, json: async () => manifest }
    return { ok: true }
  }))
}

// The module holds its state at module scope (one warm-up per app, whoever asks), so each case
// needs its own copy.
async function fresh() {
  vi.resetModules()
  return import('./useOfflineWarmup.js')
}

beforeEach(() => {
  localStorage.clear()
  held = new Map()
  vi.stubGlobal('caches', { open: vi.fn(async () => ({
    match: vi.fn(async (url) => held.get(url)),
    put: vi.fn(async (url, res) => { held.set(url, res) }),
  })) })
  Object.defineProperty(navigator, 'serviceWorker', { value: { controller: {} }, configurable: true })
})
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); delete navigator.serviceWorker })

describe('startOfflineWarmup', () => {
  it('verifies each waiting build when several targets queue behind an existing download', async () => {
    const targets = Object.fromEntries(['a', 'b', 'c'].map(build => [build, { build, manifest: `/releases/${build}/offline-manifest.json` }]))
    let releaseA, releaseB
    const a = new Promise(resolve => { releaseA = resolve })
    const b = new Promise(resolve => { releaseB = resolve })
    const requested = []
    vi.stubGlobal('fetch', vi.fn(async url => {
      requested.push(url)
      if (url.endsWith('offline-manifest.json')) {
        const build = url.split('/')[2]
        return { ok: true, json: async () => ({ build, assets: { files: [`/assets/${build}.js`] }, images: { files: [] } }) }
      }
      if (url === '/assets/a.js') await a
      if (url === '/assets/b.js') await b
      return { ok: true }
    }))
    const { topUpOffline } = await fresh()
    const first = topUpOffline(targets.a)
    await vi.waitFor(() => expect(requested).toContain('/assets/a.js'))
    const second = topUpOffline(targets.b)
    let cReady = false
    const third = topUpOffline(targets.c).then(result => { cReady = result; return result })
    releaseA()
    expect(await first).toBe(true)
    await vi.waitFor(() => expect(requested).toContain('/assets/b.js'))
    expect(cReady).toBe(false)
    expect(requested).not.toContain(targets.c.manifest)
    releaseB()
    expect(await second).toBe(true)
    expect(await third).toBe(true)
    expect(held.has('/assets/c.js')).toBe(true)
  })

  it('retries transient HTTP errors without counting failed attempts as downloaded files', async () => {
    vi.useFakeTimers()
    let attempts = 0
    const url = '/assets/retry.js'
    const fetch = vi.fn(async path => path.endsWith('offline-manifest.json')
      ? { ok: true, json: async () => ({ assets: { files: [url] }, images: { files: [] } }) }
      : { ok: ++attempts === 3, status: 503 })
    vi.stubGlobal('fetch', fetch)
    const { startOfflineWarmup, useOfflineWarmup } = await fresh()
    const run = startOfflineWarmup()
    await vi.advanceTimersByTimeAsync(499)
    expect(attempts).toBe(1)
    expect(useOfflineWarmup().done.value).toBe(0)
    await vi.runAllTimersAsync()
    expect(await run).toBe(true)
    expect(attempts).toBe(3)
    expect(useOfflineWarmup().done.value).toBe(1)
    expect(useOfflineWarmup().error.value).toBe('')
  })

  it('bounds retries and keeps the failing file and reason for diagnostics', async () => {
    vi.useFakeTimers()
    const url = '/assets/unavailable.js'
    const fetch = vi.fn(async path => path.endsWith('offline-manifest.json')
      ? { ok: true, json: async () => ({ assets: { files: [url] }, images: { files: [] } }) }
      : { ok: false, status: 503 })
    vi.stubGlobal('fetch', fetch)
    const { startOfflineWarmup, useOfflineWarmup } = await fresh()
    const run = startOfflineWarmup()
    await vi.runAllTimersAsync()
    expect(await run).toBe(false)
    expect(fetch.mock.calls.filter(([path]) => path === url)).toHaveLength(3)
    expect(useOfflineWarmup().done.value).toBe(0)
    expect(useOfflineWarmup().error.value).toContain(`${url}: HTTP 503`)
  })

  it('does not keep retrying a full device cache', async () => {
    mockFetch()
    const put = vi.fn(async () => { throw new DOMException('Device storage full', 'QuotaExceededError') })
    vi.stubGlobal('caches', { open: async () => ({ match: async () => undefined, put }) })
    const { startOfflineWarmup, useOfflineWarmup } = await fresh()
    expect(await startOfflineWarmup()).toBe(false)
    expect(put.mock.calls.length).toBeLessThanOrEqual(2) // two downloads, one attempt each
    expect(useOfflineWarmup().done.value).toBe(0)
    expect(useOfflineWarmup().error.value).toContain('Device storage full')
  })

  it('does not download through an active worker that has not claimed the page', async () => {
    vi.useFakeTimers()
    mockFetch()
    const sw = new EventTarget()
    sw.ready = Promise.resolve({ active: {} })
    Object.defineProperty(navigator, 'serviceWorker', { value: sw, configurable: true })
    const { startOfflineWarmup } = await fresh()
    const run = startOfflineWarmup()
    await vi.runAllTimersAsync()
    expect(await run).toBe(false)
    expect(fetched).toEqual([])
  })

  it('warms the exact waiting build rather than whichever manifest is latest', async () => {
    const target = { build: 'build-a', manifest: '/releases/build-a/offline-manifest.json' }
    const fetch = vi.fn(async () => ({ ok: true, json: async () => ({ ...MANIFEST, build: 'build-a' }) }))
    vi.stubGlobal('fetch', fetch)
    const { topUpOffline } = await fresh()
    expect(await topUpOffline(target)).toBe(true)
    expect(fetch.mock.calls[0][0]).toBe(target.manifest)
    expect(fetch.mock.calls.some(([url]) => url === '/offline-manifest.json')).toBe(false)
  })

  it('rejects a manifest from a different build', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({ ...MANIFEST, build: 'build-b' }) })))
    const { topUpOffline } = await fresh()
    expect(await topUpOffline({ build: 'build-a', manifest: '/releases/build-a/offline-manifest.json' })).toBe(false)
    expect(held.size).toBe(0)
  })

  it('requires a committed cache entry rather than just a successful HTTP response', async () => {
    mockFetch()
    vi.stubGlobal('caches', { open: async () => ({ match: async () => undefined, put: async () => {} }) })
    const { startOfflineWarmup, useOfflineWarmup } = await fresh()
    await startOfflineWarmup()
    expect(useOfflineWarmup().status.value).toBe('error')
    expect(useOfflineWarmup().warmed.value).toBe(false)
  })

  it.each(['request', 'body', 'worker'])('bounds a stalled %s and permits another attempt', async (kind) => {
    vi.useFakeTimers()
    mockFetch()
    if (kind === 'request') vi.stubGlobal('fetch', () => new Promise(() => {}))
    if (kind === 'body') vi.stubGlobal('caches', { open: async () => ({ match: async () => undefined, put: () => new Promise(() => {}) }) })
    if (kind === 'worker') Object.defineProperty(navigator, 'serviceWorker', { value: { ready: new Promise(() => {}) }, configurable: true })
    const { startOfflineWarmup, useOfflineWarmup } = await fresh()
    const run = startOfflineWarmup()
    await vi.runAllTimersAsync()
    await run
    expect(useOfflineWarmup().status.value).toBe('error')
    expect(useOfflineWarmup().warmed.value).toBe(false)
  })

  it.each([404, 503])('does not mark HTTP %s on an asset as downloaded', async (httpStatus) => {
    vi.stubGlobal('fetch', vi.fn(async (url) => url === '/offline-manifest.json'
      ? { ok: true, json: async () => MANIFEST }
      : { ok: false, status: httpStatus }))
    const { startOfflineWarmup, useOfflineWarmup } = await fresh()
    await startOfflineWarmup()
    expect(useOfflineWarmup().status.value).toBe('error')
    expect(useOfflineWarmup().warmed.value).toBe(false)
  })

  it('repairs an evicted cache even when the manifest still matches the saved marker', async () => {
    mockFetch()
    const { startOfflineWarmup, topUpOffline } = await fresh()
    await startOfflineWarmup()
    fetched.length = 0
    held.clear()
    await topUpOffline()
    expect(fetched).toContain('/assets/a.js')
  })

  it('fetches every file in the manifest, assets before images', async () => {
    mockFetch()
    const { startOfflineWarmup, useOfflineWarmup } = await fresh()
    await startOfflineWarmup()

    expect(fetched).toEqual(['/offline-manifest.json', '/assets/a.js', '/assets/b.js', '/images/x.webp'])
    const { status, done, total } = useOfflineWarmup()
    expect(status.value).toBe('ready')
    expect([done.value, total.value]).toEqual([3, 3])
  })

  // The order is not cosmetic: a run cut short half-way then leaves every screen reachable and
  // only the illustrations missing, rather than a working picture gallery with no app behind it.
  it('marks the set as warmed, and warms again when asked a second time', async () => {
    mockFetch()
    const { startOfflineWarmup, useOfflineWarmup } = await fresh()
    await startOfflineWarmup()
    expect(localStorage.getItem('wh11ed-offline-warmed')).toBeTruthy()
    expect(useOfflineWarmup().warmed.value).toBe(true)

    // The button verifies the actual cache again, keeping already committed files.
    fetched.length = 0
    await startOfflineWarmup()
    expect(fetched).toEqual(['/offline-manifest.json'])
  })

  // After a release most of the list is already cached under the same hashed names; only what a
  // cache does not hold is fetched, and only that is counted — "0/777" after every update read as
  // the whole app downloading again (owner, 2026-10-05).
  it('fetches and counts only what no cache holds yet', async () => {
    mockFetch()
    held.set('/assets/a.js', { ok: true })
    const { startOfflineWarmup, useOfflineWarmup } = await fresh()
    await startOfflineWarmup()
    expect(fetched).toEqual(['/offline-manifest.json', '/assets/b.js', '/images/x.webp'])
    const { done, total, status } = useOfflineWarmup()
    expect([done.value, total.value, status.value]).toEqual([2, 2, 'ready'])
  })

  it('is done at once when every file is already cached', async () => {
    mockFetch()
    for (const url of [...MANIFEST.assets.files, ...MANIFEST.images.files]) held.set(url, { ok: true })
    const { startOfflineWarmup, useOfflineWarmup } = await fresh()
    await startOfflineWarmup()
    expect(fetched).toEqual(['/offline-manifest.json'])
    const { status, done, total } = useOfflineWarmup()
    expect([status.value, done.value, total.value]).toEqual(['ready', 0, 0])
    expect(localStorage.getItem('wh11ed-offline-warmed')).toBeTruthy()
  })

  it('does not claim success when a file fails', async () => {
    mockFetch()
    vi.stubGlobal('fetch', vi.fn(async (url) => {
      if (url === '/offline-manifest.json') return { ok: true, json: async () => MANIFEST }
      if (url === '/images/x.webp') throw new Error('offline')
      return { ok: true }
    }))
    const { startOfflineWarmup, useOfflineWarmup } = await fresh()
    await startOfflineWarmup()

    expect(useOfflineWarmup().status.value).toBe('error')
    expect(localStorage.getItem('wh11ed-offline-warmed')).toBeNull()
  })

  // A player's app behind a VPN, 2026-11-03: the top-up after a release did not get through, the
  // menu still said "Downloaded for offline", and the app opened blank on a page it did not have.
  it('stops saying "Downloaded" once a release left files missing and the top-up fails', async () => {
    localStorage.setItem('wh11ed-offline-warmed', 'an-older-set')
    vi.stubGlobal('fetch', vi.fn(async (url) => {
      if (url === '/offline-manifest.json') return { ok: true, json: async () => MANIFEST }
      throw new Error('the tunnel dropped it')
    }))
    const { startOfflineWarmup, useOfflineWarmup } = await fresh()
    expect(useOfflineWarmup().warmed.value).toBe(false)
    await startOfflineWarmup()
    expect(useOfflineWarmup().warmed.value).toBe(false)
    expect(useOfflineWarmup().status.value).toBe('error')
  })

  it('reports an unreachable manifest instead of hanging on "warming"', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 404 })))
    const { startOfflineWarmup, useOfflineWarmup } = await fresh()
    await startOfflineWarmup()
    expect(useOfflineWarmup().status.value).toBe('error')
  })
})

// The installed app tops the set up by itself after every release. To a reader already using it,
// "Preparing offline…" read as something new starting; the indicator says "update" then — and only
// then: the first download and the ⚙ button are what "offline" really means.
describe('an installed app after a release', () => {
  afterEach(() => { delete navigator.serviceWorker })
  async function autoRun() {
    vi.stubGlobal('matchMedia', () => ({ matches: true }))
    vi.stubGlobal('requestIdleCallback', (cb) => cb())
    Object.defineProperty(navigator, 'serviceWorker', { value: { controller: {} }, configurable: true })
    const mod = await fresh()
    const api = mod.useOfflineWarmup()
    await vi.waitFor(() => expect(api.status.value).toBe('ready'))
    return { ...mod, api }
  }

  it('calls the first download offline preparation', async () => {
    mockFetch()
    const { api } = await autoRun()
    expect(api.isUpdate.value).toBe(false)
  })

  it('calls a top-up of a set warmed before an update', async () => {
    mockFetch()
    localStorage.setItem('wh11ed-offline-warmed', 'an-older-set')
    const { api } = await autoRun()
    expect(api.isUpdate.value).toBe(true)
  })

  it('keeps the button’s run an offline download', async () => {
    mockFetch()
    localStorage.setItem('wh11ed-offline-warmed', 'an-older-set')
    const { startOfflineWarmup, useOfflineWarmup } = await fresh()
    await startOfflineWarmup()
    expect(useOfflineWarmup().isUpdate.value).toBe(false)
  })
})

describe('loadOfflineSize', () => {
  // What the ⚙ menu puts on the button. Nothing can work it out at runtime without fetching the
  // very files in question, which is the whole reason the build writes it down.
  it('reads the total the build recorded, without downloading anything', async () => {
    mockFetch()
    const { loadOfflineSize } = await fresh()
    const bytes = await loadOfflineSize()

    expect(bytes).toBe(10 * 1048576)
    expect(fetched).toEqual(['/offline-manifest.json'])
  })

  it('stays silent rather than guessing when the manifest cannot be read', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('offline') }))
    const { loadOfflineSize } = await fresh()
    expect(await loadOfflineSize()).toBe(0)
  })
})

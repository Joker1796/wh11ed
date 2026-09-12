import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// The warm-up is what pays for the small precache: the shell is ~1 MB and everything else arrives
// only when somebody asks for it. These pin the three things a reader would notice if they broke —
// that the button downloads the whole list, that it says the size before spending their data, and
// that "already downloaded" cannot be claimed for a set that was never fetched.

const MANIFEST = {
  assets: { files: ['/assets/a.js', '/assets/b.js'], bytes: 3 * 1048576 },
  images: { files: ['/images/x.webp'], bytes: 7 * 1048576 },
}

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

beforeEach(() => { localStorage.clear() })
afterEach(() => { vi.unstubAllGlobals() })

describe('startOfflineWarmup', () => {
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

    // The button forces: a reader asking again has a reason we cannot see (an evicted cache, a
    // trip tomorrow), so the marker must not turn the second tap into a no-op.
    fetched.length = 0
    await startOfflineWarmup()
    expect(fetched).toContain('/images/x.webp')
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

  it('reports an unreachable manifest instead of hanging on "warming"', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 404 })))
    const { startOfflineWarmup, useOfflineWarmup } = await fresh()
    await startOfflineWarmup()
    expect(useOfflineWarmup().status.value).toBe('error')
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

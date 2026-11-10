import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { START_LOCATION } from 'vue-router'
import { _resetStaleChunks, importQuietly, installStaleChunkRecovery, isChunkLoadError, recoverFromStaleChunk, routeChunk } from './staleChunks.js'

describe('isChunkLoadError', () => {
  it('knows each engine’s wording for a failed dynamic import', () => {
    expect(isChunkLoadError(new TypeError('Failed to fetch dynamically imported module: https://wh-rules.ru/assets/RosterListView-x1.js'))).toBe(true)
    expect(isChunkLoadError(new TypeError('error loading dynamically imported module: https://wh-rules.ru/assets/a.js'))).toBe(true)
    expect(isChunkLoadError(new TypeError('Importing a module script failed.'))).toBe(true)
    expect(isChunkLoadError(new Error('Unable to preload CSS for /assets/a.css'))).toBe(true)
  })
  it('leaves every other error alone', () => {
    expect(isChunkLoadError(new TypeError('Cannot read properties of undefined'))).toBe(false)
    expect(isChunkLoadError(null)).toBe(false)
  })
})

describe('recoverFromStaleChunk', () => {
  let reload
  beforeEach(() => {
    _resetStaleChunks()
    sessionStorage.clear()
    reload = vi.fn()
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it.each(['registration', 'update'])('recovers even when the worker %s never settles', async (step) => {
    const pending = () => new Promise(() => {})
    vi.stubGlobal('navigator', { onLine: true, serviceWorker: {
      getRegistration: step === 'registration' ? pending : async () => ({ update: pending }),
    } })
    const recovery = recoverFromStaleChunk('/roster/new', { reload })
    await vi.advanceTimersByTimeAsync(15_000)
    expect(reload).toHaveBeenCalledWith('/roster/new')
    await recovery
  })

  it('does not reload a page caught reloading itself in a loop (reloadLoop.js)', async () => {
    localStorage.setItem('wh11ed-reload-hold', String(Date.now() + 60_000))
    expect(await recoverFromStaleChunk('/a', { reload })).toBe(false)
    expect(reload).not.toHaveBeenCalled()
    localStorage.removeItem('wh11ed-reload-hold')
  })

  it('reloads into the page the reader asked for', async () => {
    expect(await recoverFromStaleChunk('/ru/roster', { reload })).toBe(true)
    expect(reload).toHaveBeenCalledWith('/ru/roster')
  })

  // The page that comes back may fail the same way (the server is down): one reload, then the
  // error is left to be an error rather than a page that reloads itself forever.
  it('reloads once, not in a loop', async () => {
    await recoverFromStaleChunk('/a', { reload, now: 1_000_000 })
    _resetStaleChunks() // a fresh page after the reload
    expect(await recoverFromStaleChunk('/a', { reload, now: 1_010_000 })).toBe(false)
    expect(reload).toHaveBeenCalledTimes(1)
    _resetStaleChunks()
    expect(await recoverFromStaleChunk('/a', { reload, now: 1_100_000 })).toBe(true)
  })

  // Under a service worker the old page comes from its precache, so an immediate reload would
  // bring it back. A worker that found a newer build is given time to install it and reload itself.
  it('lets a service worker that found an update go first', async () => {
    const reg = { update: vi.fn(async () => {}), installing: {}, waiting: null }
    vi.stubGlobal('navigator', { onLine: true, serviceWorker: { getRegistration: async () => reg } })
    expect(await recoverFromStaleChunk('/b', { reload })).toBe(true)
    expect(reg.update).toHaveBeenCalled()
    expect(reload).not.toHaveBeenCalled()
    vi.advanceTimersByTime(10_000)
    expect(reload).toHaveBeenCalledWith('/b')
  })

  it('reloads at once when the service worker has nothing newer', async () => {
    const reg = { update: vi.fn(async () => {}), installing: null, waiting: null }
    vi.stubGlobal('navigator', { onLine: true, serviceWorker: { getRegistration: async () => reg } })
    await recoverFromStaleChunk('/c', { reload })
    expect(reload).toHaveBeenCalledWith('/c')
  })

  it('does nothing offline — a reload would only lose the page', async () => {
    vi.stubGlobal('navigator', { onLine: false })
    expect(await recoverFromStaleChunk('/d', { reload })).toBe(false)
    expect(reload).not.toHaveBeenCalled()
  })
})

// A player's installed app (2026-11-02): an Imperial Knights datasheet that would not open from
// the roster or the faction's page — both wait on one chunk, and one that did not come left the
// page empty. A faction's data is asked for again, quietly, before anything else.
describe('importQuietly', () => {
  const fetchFail = () => new TypeError('Failed to fetch dynamically imported module: https://wh-rules.ru/assets/imperial-knights-x1.js')
  const noWait = () => Promise.resolve()
  beforeEach(() => { _resetStaleChunks() })

  it('asks again after a chunk that did not come, and the page never hears of it', async () => {
    const load = vi.fn().mockRejectedValueOnce(fetchFail()).mockResolvedValueOnce({ default: ['sheet'] })
    const recover = vi.fn()
    await expect(importQuietly(load, { wait: noWait, recover })).resolves.toEqual({ default: ['sheet'] })
    expect(load).toHaveBeenCalledTimes(2)
    expect(recover).not.toHaveBeenCalled()
  })

  it('reloads only when the tries are spent, and the error still reaches the caller', async () => {
    const load = vi.fn().mockRejectedValue(fetchFail())
    const recover = vi.fn()
    await expect(importQuietly(load, { delays: [1, 1], wait: noWait, recover })).rejects.toThrow(/Failed to fetch/)
    expect(load).toHaveBeenCalledTimes(3)
    expect(recover).toHaveBeenCalledTimes(1)
  })

  it('does not ask again for a module that is broken rather than missing', async () => {
    const load = vi.fn().mockRejectedValue(new SyntaxError('Unexpected token'))
    const recover = vi.fn()
    await expect(importQuietly(load, { wait: noWait, recover })).rejects.toThrow(SyntaxError)
    expect(load).toHaveBeenCalledTimes(1)
    expect(recover).not.toHaveBeenCalled()
  })

  // Vite raises vite:preloadError for the failed import before the loader sees it; the page-wide
  // reload must leave that one to importQuietly, or the retry would race a reload.
  it('keeps the page-wide reload out of an import it is still trying', async () => {
    installStaleChunkRecovery({ onError: () => {}, resolve: () => ({ href: '/' }) })
    sessionStorage.clear()
    const load = vi.fn()
      .mockImplementationOnce(() => { window.dispatchEvent(new Event('vite:preloadError')); return Promise.reject(fetchFail()) })
      .mockResolvedValueOnce({ default: [] })
    await importQuietly(load, { wait: noWait, recover: vi.fn() })
    await new Promise((r) => setTimeout(r, 10))
    expect(sessionStorage.getItem('wh-stale-chunk-reload')).toBeNull()
  })
})

// A tap on a section whose chunk does not come did nothing for as long as the request hung (a
// player's Android behind a VPN, 2026-11-03). Bounded, retried like a faction's data, and the
// router's handler takes what is left.
describe('routeChunk', () => {
  const fetchFail = () => new TypeError('Failed to fetch dynamically imported module: https://wh-rules.ru/assets/TrackerStatsView-x1.js')
  const noWait = () => Promise.resolve()
  beforeEach(() => { _resetStaleChunks() })

  it('gives up on a chunk that never answers, with an error the router recovers from, and does not ask again', async () => {
    vi.useFakeTimers()
    const load = vi.fn(() => new Promise(() => {}))
    const got = routeChunk(load, { ms: 50, wait: noWait })().catch((e) => e)
    await vi.advanceTimersByTimeAsync(60)
    const err = await got
    vi.useRealTimers()
    expect(isChunkLoadError(err)).toBe(true)
    expect(load).toHaveBeenCalledTimes(1)
  })

  it('asks again after a chunk that failed, and the page gets it', async () => {
    const load = vi.fn().mockRejectedValueOnce(fetchFail()).mockResolvedValueOnce({ default: 'View' })
    await expect(routeChunk(load, { wait: noWait })()).resolves.toEqual({ default: 'View' })
    expect(load).toHaveBeenCalledTimes(2)
  })

  it('reloads nothing itself: the router’s handler has the address the reader was going to', async () => {
    sessionStorage.clear()
    const load = vi.fn().mockRejectedValue(fetchFail())
    await expect(routeChunk(load, { delays: [1], wait: noWait })()).rejects.toThrow(/Failed to fetch/)
    expect(sessionStorage.getItem('wh-stale-chunk-reload')).toBeNull()
  })
})

// One owner per failure: a start's first page that does not load is firstNavigation.js's (it opens
// home), and nothing reloads for it — both answering it, the start went home and the reload brought
// the broken page back (2026-11-03).
describe('installStaleChunkRecovery — who answers a route that failed', () => {
  let onError
  const router = { onError: (fn) => { onError = fn }, resolve: (to) => ({ href: to }) }
  beforeEach(() => {
    _resetStaleChunks()
    sessionStorage.clear()
    installStaleChunkRecovery(router)
  })
  const err = () => new TypeError('Failed to fetch dynamically imported module: https://wh-rules.ru/assets/A-x1.js')

  it('leaves the start’s first navigation to the start — no reload, not even through the preload event', async () => {
    window.dispatchEvent(new Event('vite:preloadError'))
    onError(err(), '/ru/tracker/stats', START_LOCATION)
    await new Promise((r) => setTimeout(r, 10))
    expect(sessionStorage.getItem('wh-stale-chunk-reload')).toBeNull()
  })

  it('leaves a failed route to the shell without an automatic reload', async () => {
    vi.stubGlobal('navigator', { onLine: true })
    const assign = vi.fn()
    vi.stubGlobal('location', { ...window.location, assign })
    onError(err(), '/ru/tracker/stats', { path: '/ru' })
    await new Promise((r) => setTimeout(r, 10))
    expect(sessionStorage.getItem('wh-stale-chunk-reload')).toBeNull()
    vi.unstubAllGlobals()
  })
})

// Every per-faction data folder loads its chunks through quietLoaders — a new glob that does not
// would bring the empty page back for its data.
describe('per-faction data loaders', () => {
  it('ask through quietLoaders', () => {
    const root = join(process.cwd(), 'src/data')
    const bare = []
    const walk = (dir) => {
      for (const f of readdirSync(dir)) {
        const p = join(dir, f)
        if (statSync(p).isDirectory()) walk(p)
        else if (/\.js$/.test(f) && !/\.test\.js$/.test(f)) {
          for (const line of readFileSync(p, 'utf8').split('\n')) {
            if (/^\s*\/\//.test(line) || !/import\.meta\.glob\(/.test(line)) continue
            if (!/quietLoaders\(import\.meta\.glob\(/.test(line)) bare.push(`${p.slice(root.length + 1)}: ${line.trim()}`)
          }
        }
      }
    }
    walk(root)
    expect(bare).toEqual([])
  })
})

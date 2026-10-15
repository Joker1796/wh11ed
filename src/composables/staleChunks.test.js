import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { _resetStaleChunks, isChunkLoadError, recoverFromStaleChunk } from './staleChunks.js'

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

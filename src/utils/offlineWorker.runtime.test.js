// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'
import { installOfflineWorker } from './offlineWorker.js'

function fixture() {
  const response = new Response('online')
  const cache = { match: vi.fn().mockResolvedValue(undefined), put: vi.fn().mockResolvedValue(undefined) }
  const scope = {
    location: { origin: 'https://test.invalid' },
    caches: { open: vi.fn().mockResolvedValue(cache) },
    fetch: vi.fn().mockResolvedValue(response),
    addEventListener: vi.fn(),
  }
  installOfflineWorker(scope, { build: 'current', manifest: '/releases/current/offline-manifest.json' })
  const request = new Request('https://test.invalid/assets/current.js')
  let lifetime
  const event = { waitUntil: vi.fn(task => { lifetime = task }) }
  return { scope, cache, response, request, event, lifetime: () => lifetime }
}

afterEach(() => vi.useRealTimers())

describe('best-effort runtime cache', () => {
  it.each(['open', 'match'])('fetches online when cache %s rejects', async method => {
    const f = fixture()
    const operation = method === 'open' ? f.scope.caches.open : f.cache.match
    operation.mockRejectedValue(new DOMException('Storage denied', 'SecurityError'))
    expect(await f.scope.whOfflineFetch(f.request, f.event)).toBe(f.response)
    expect(f.scope.fetch).toHaveBeenCalledWith(f.request)
    await f.lifetime()
  })

  it('preserves the online response when a background cache write rejects', async () => {
    const f = fixture()
    f.cache.put.mockRejectedValue(new DOMException('Storage full', 'QuotaExceededError'))
    expect(await f.scope.whOfflineFetch(f.request, f.event)).toBe(f.response)
    await f.lifetime()
    expect(f.cache.put).toHaveBeenCalledOnce()
    expect(await f.response.text()).toBe('online')
  })

  it('returns the online response while keeping a pending write alive on the fetch event', async () => {
    const f = fixture()
    let finishWrite
    f.cache.put.mockImplementation(() => new Promise(resolve => { finishWrite = resolve }))
    vi.useFakeTimers()
    const pending = f.scope.whOfflineFetch(f.request, f.event)
    // waitUntil must be called before the worker's fetch handler yields.
    expect(f.event.waitUntil).toHaveBeenCalledOnce()
    expect(await pending).toBe(f.response)
    let finished = false
    f.lifetime().then(() => { finished = true })
    await vi.advanceTimersByTimeAsync(0)
    expect(finished).toBe(false)
    finishWrite()
    await f.lifetime()
    expect(finished).toBe(true)
  })

  it('bounds a hanging background write without delaying the response', async () => {
    const f = fixture()
    f.cache.put.mockImplementation(() => new Promise(() => {}))
    vi.useFakeTimers()
    const pending = f.scope.whOfflineFetch(f.request, f.event)
    expect(await pending).toBe(f.response)
    await vi.advanceTimersByTimeAsync(15000)
    await f.lifetime()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('serves a cached response without requiring network access', async () => {
    const f = fixture()
    const stored = new Response('offline')
    f.cache.match.mockResolvedValue(stored)
    f.scope.fetch.mockRejectedValue(new TypeError('Network unavailable'))
    expect(await f.scope.whOfflineFetch(f.request, f.event)).toBe(stored)
    expect(f.scope.fetch).not.toHaveBeenCalled()
    expect(f.cache.put).not.toHaveBeenCalled()
    await f.lifetime()
  })

  it('propagates network failure when no cached response exists', async () => {
    const f = fixture()
    const failure = new TypeError('Network unavailable')
    f.scope.fetch.mockRejectedValue(failure)
    await expect(f.scope.whOfflineFetch(f.request, f.event)).rejects.toBe(failure)
    await f.lifetime()
    expect(f.cache.put).not.toHaveBeenCalled()
  })

  it('does not cache unsuccessful HTTP responses', async () => {
    const f = fixture()
    const response = new Response('missing', { status: 404 })
    f.scope.fetch.mockResolvedValue(response)
    expect(await f.scope.whOfflineFetch(f.request, f.event)).toBe(response)
    await f.lifetime()
    expect(f.cache.put).not.toHaveBeenCalled()
  })
})

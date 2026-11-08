import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchDeadline } from './fetchDeadline.js'

afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers() })

describe('bounded network requests', () => {
  it.each(['headers', 'body'])('settles a stalled %s even when fetch ignores abort', async (where) => {
    vi.useFakeTimers()
    const never = () => new Promise(() => {})
    vi.stubGlobal('fetch', vi.fn(where === 'headers' ? never : async () => ({ json: never })))
    const task = fetchDeadline('/sync', {}, 100).then((r) => r.json())
    const assertion = expect(task).rejects.toThrow('timed out')
    await vi.advanceTimersByTimeAsync(101)
    await assertion
    expect(fetch.mock.calls).toHaveLength(1)
    expect(fetch.mock.calls[0][1].signal.aborted).toBe(true)
  })

  it('uses the remaining budget for the body without replaying a write', async () => {
    vi.useFakeTimers()
    vi.stubGlobal('fetch', vi.fn(() => new Promise((resolve) => setTimeout(() => resolve({ json: () => new Promise(() => {}) }), 80))))
    const task = fetchDeadline('/write', { method: 'POST' }, 100).then((r) => r.json())
    const assertion = expect(task).rejects.toThrow('timed out')
    await vi.advanceTimersByTimeAsync(101)
    await assertion
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('preserves the response and caller cancellation', async () => {
    const controller = new AbortController()
    controller.abort()
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{"ok":true}', { status: 409 })))
    const res = await fetchDeadline('/write', { signal: controller.signal })
    expect(res.status).toBe(409)
    expect(await res.json()).toEqual({ ok: true })
    expect(fetch.mock.calls[0][1].signal.aborted).toBe(true)
  })
})

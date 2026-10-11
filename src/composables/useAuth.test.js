import { beforeEach, describe, it, expect, vi } from 'vitest'

// useAuth is a module singleton (status/user/token). Reset + re-import per test so cases
// don't share state. The access token lives in module scope, never exposed, so behaviour is
// asserted via status/user and the mocked global fetch.
let auth
async function load() {
  vi.resetModules()
  const mod = await import('./useAuth.js')
  auth = mod.useAuth()
}

beforeEach(() => {
  localStorage.clear()
})

describe('refresh', () => {
  it('marks authed and loads the user on success', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ accessToken: 'tok' }) }) // /auth/refresh
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'u', email: 'e', displayName: 'n' }) }) // /me
    await load()
    const ok = await auth.refresh()
    expect(ok).toBe(true)
    expect(auth.status.value).toBe('authed')
    expect(auth.user.value).toMatchObject({ id: 'u' })
  })

  it('marks anon and returns false on a non-ok response', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 401 })
    await load()
    const ok = await auth.refresh()
    expect(ok).toBe(false)
    expect(auth.status.value).toBe('anon')
    expect(auth.user.value).toBeNull()
  })

  it('never throws on a network error — offline, it resolves false and marks anon', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('offline'))
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)
    await load()
    await expect(auth.refresh()).resolves.toBe(false)
    expect(auth.status.value).toBe('anon')
    vi.restoreAllMocks()
  })

  // The Yandex Cloud outage of 2026-10-11: the gateway's 502 carries no CORS headers, so the page
  // sees a network error while the browser is online. That is the server, not a signed-out player.
  it('marks down, not anon, when the request fails while the browser is online', async () => {
    global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    await load()
    await expect(auth.refresh()).resolves.toBe(false)
    expect(auth.status.value).toBe('down')
  })

  it('marks down on a 5xx answer', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 502 })
    await load()
    await auth.refresh()
    expect(auth.status.value).toBe('down')
  })

  it('asks again while down, and comes back signed in by itself', async () => {
    vi.useFakeTimers()
    global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    await load()
    await auth.refresh()
    expect(auth.status.value).toBe('down')
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ accessToken: 'tok' }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'u' }) })
    await vi.advanceTimersByTimeAsync(60_000)
    expect(auth.status.value).toBe('authed')
    vi.useRealTimers()
  })

  it('de-dupes concurrent refreshes into a single /auth/refresh call', async () => {
    let release
    global.fetch = vi.fn().mockImplementation((url) => {
      if (String(url).includes('/auth/refresh')) {
        return new Promise((res) => {
          release = () => res({ ok: true, json: async () => ({ accessToken: 't' }) })
        })
      }
      return Promise.resolve({ ok: true, json: async () => ({ id: 'u' }) }) // /me
    })
    await load()
    const p1 = auth.refresh()
    const p2 = auth.refresh()
    release()
    await Promise.all([p1, p2])
    const refreshCalls = global.fetch.mock.calls.filter((c) => String(c[0]).includes('/auth/refresh'))
    expect(refreshCalls.length).toBe(1)
  })
})

describe('ensureSession', () => {
  it('refreshes only while status is idle, then is a no-op', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 401 })
    await load()
    await auth.ensureSession() // idle → refresh
    const after = global.fetch.mock.calls.length
    expect(after).toBeGreaterThan(0)
    await auth.ensureSession() // now anon → no-op
    expect(global.fetch.mock.calls.length).toBe(after)
  })
})

describe('authedFetch', () => {
  it('sends Content-Type for a body and a Bearer token', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ accessToken: 't1' }) }) // /auth/refresh
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'u' }) }) // /me
    await load()
    await auth.refresh()
    global.fetch.mockReset()
    global.fetch.mockResolvedValue({ ok: true, status: 200 })
    await auth.authedFetch('/games/x', { method: 'PUT', body: '{}' })
    const opts = global.fetch.mock.calls[0][1]
    expect(opts.headers['Content-Type']).toBe('application/json')
    expect(opts.headers.Authorization).toBe('Bearer t1')
  })

  it('on 401 refreshes once and retries the request', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ accessToken: 't1' }) }) // initial refresh
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'u' }) }) // /me
    await load()
    await auth.refresh()
    global.fetch.mockReset()
    global.fetch
      .mockResolvedValueOnce({ status: 401, ok: false }) // first attempt
      .mockResolvedValueOnce({ ok: true, json: async () => ({ accessToken: 't2' }) }) // refresh
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'u' }) }) // /me
      .mockResolvedValueOnce({ status: 200, ok: true }) // retry
    const res = await auth.authedFetch('/games')
    expect(res.status).toBe(200)
    expect(global.fetch.mock.calls.length).toBe(4)
  })
})

// The backend always lands on one fixed callback path, so where to go next is the app's own
// bookkeeping — and the value is read straight back out of storage into router.replace().
describe('return path', () => {
  beforeEach(() => {
    sessionStorage.clear()
    global.fetch = vi.fn().mockResolvedValue({ ok: true }) // /health
  })

  it('remembers where sign-in started, and spends it once', async () => {
    await load()
    await auth.login('yandex', '/roster/abc?tab=units')
    expect(auth.takeReturnPath()).toBe('/roster/abc?tab=units')
    expect(auth.takeReturnPath()).toBeNull() // read once: a return path is spent by the redirect
  })

  it('refuses anything that is not a same-site path', async () => {
    await load()
    for (const bad of ['//evil.example', 'https://evil.example', 'roster', '']) {
      await auth.login('yandex', bad)
      expect(auth.takeReturnPath()).toBeNull()
    }
  })

  it('clears a stale path when sign-in is started without one', async () => {
    await load()
    await auth.login('yandex', '/tracker')
    await auth.login('yandex')
    expect(auth.takeReturnPath()).toBeNull()
  })
})

// A sign-in is a full-page trip; with the API down it ended on the gateway's bare 502.
describe('sign-in with the server down', () => {
  it('stays on the page, says the server is down, and keeps no return path', async () => {
    sessionStorage.clear()
    global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    await load()
    const before = window.location.href
    await expect(auth.login('yandex', '/tracker')).resolves.toBe(false)
    expect(auth.status.value).toBe('down')
    expect(window.location.href).toBe(before)
    expect(auth.takeReturnPath()).toBeNull()
    expect(String(global.fetch.mock.calls[0][0])).toMatch(/\/health$/)
  })
})

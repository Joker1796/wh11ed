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

  it('never throws on a network error — resolves false and marks anon', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('offline'))
    await load()
    await expect(auth.refresh()).resolves.toBe(false)
    expect(auth.status.value).toBe('anon')
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

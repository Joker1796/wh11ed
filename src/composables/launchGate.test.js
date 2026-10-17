import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { launchGate, liveVersion, INSTALL_MS } from './launchGate.js'

// A registration and a service worker container just real enough for the gate: event targets with
// the states the gate reads.
function worker(state = 'installing') {
  const w = new EventTarget()
  w.state = state
  w.postMessage = vi.fn()
  w.to = (s) => { w.state = s; w.dispatchEvent(new Event('statechange')) }
  return w
}
function setup({ controller = true, waiting = null } = {}) {
  const reg = new EventTarget()
  reg.waiting = waiting
  reg.installing = null
  reg.update = vi.fn(() => Promise.resolve())
  const sw = new EventTarget()
  sw.controller = controller ? {} : null
  sw.getRegistration = vi.fn(() => Promise.resolve(reg))
  Object.defineProperty(navigator, 'serviceWorker', { value: sw, configurable: true })
  return { reg, sw }
}
const live = (app) => vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ app, notes: app }) }))
const splashSpy = () => {
  const hide = vi.fn()
  const splash = vi.fn(() => hide)
  return { splash, hide }
}

describe('launchGate — a start under a service worker opens the live version', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    delete navigator.serviceWorker
  })

  it('no worker controls the page: starts as it is, asks nothing', async () => {
    setup({ controller: false })
    const fetch = live('9.9.9'); vi.stubGlobal('fetch', fetch)
    expect(await launchGate({ version: '1.0.0' })).toBe(false)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('the live version is the one running: starts at once, no screen', async () => {
    setup()
    vi.stubGlobal('fetch', live('1.0.0'))
    const { splash } = splashSpy()
    expect(await launchGate({ version: '1.0.0', splash })).toBe(false)
    expect(splash).not.toHaveBeenCalled()
  })

  it('a newer version is live: the screen names it, the worker installs and takes over, the page reloads into it', async () => {
    const { reg, sw } = setup()
    vi.stubGlobal('fetch', live('1.0.1'))
    const { splash } = splashSpy()
    const reload = vi.fn()
    const w = worker()
    reg.update = vi.fn(() => {
      reg.installing = w
      reg.dispatchEvent(new Event('updatefound'))
      setTimeout(() => w.to('installed'), 5)
      return Promise.resolve()
    })
    w.postMessage = vi.fn(() => setTimeout(() => sw.dispatchEvent(new Event('controllerchange')), 5))
    expect(await launchGate({ version: '1.0.0', splash, reload })).toBe(true)
    expect(splash).toHaveBeenCalledWith('1.0.1')
    expect(w.postMessage).toHaveBeenCalledWith({ type: 'SKIP_WAITING' })
    expect(reload).toHaveBeenCalledTimes(1)
  })

  it('the install does not finish in time: the screen goes and the app starts on what it has', async () => {
    vi.useFakeTimers()
    const { reg } = setup()
    vi.stubGlobal('fetch', live('1.0.1'))
    const { splash, hide } = splashSpy()
    reg.update = vi.fn(() => { reg.installing = worker(); reg.dispatchEvent(new Event('updatefound')); return Promise.resolve() })
    const gate = launchGate({ version: '1.0.0', splash, reload: vi.fn() })
    await vi.advanceTimersByTimeAsync(INSTALL_MS + 1)
    expect(await gate).toBe(false)
    expect(hide).toHaveBeenCalled()
  })

  it('a version downloaded before and never applied is opened at once, without asking the server', async () => {
    const w = worker('installed')
    const { sw } = setup({ waiting: w })
    const fetch = live('1.0.1'); vi.stubGlobal('fetch', fetch)
    const reload = vi.fn()
    w.postMessage = vi.fn(() => setTimeout(() => sw.dispatchEvent(new Event('controllerchange')), 5))
    expect(await launchGate({ version: '1.0.0', splash: splashSpy().splash, reload })).toBe(true)
    expect(fetch).not.toHaveBeenCalled()
    expect(reload).toHaveBeenCalledTimes(1)
  })

  it('a version a start already reloaded for and did not get is not waited for again', async () => {
    vi.useFakeTimers()
    const { reg } = setup()
    vi.stubGlobal('fetch', live('1.0.1'))
    reg.update = vi.fn(() => Promise.resolve()) // nothing new arrives
    const first = launchGate({ version: '1.0.0', splash: splashSpy().splash })
    await vi.advanceTimersByTimeAsync(INSTALL_MS + 1)
    expect(await first).toBe(false)
    const { splash } = splashSpy()
    expect(await launchGate({ version: '1.0.0', splash })).toBe(false)
    expect(splash).not.toHaveBeenCalled()
  })

  it('offline: starts at once, asks nothing', async () => {
    setup()
    const fetch = live('1.0.1'); vi.stubGlobal('fetch', fetch)
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)
    expect(await launchGate({ version: '1.0.0' })).toBe(false)
    expect(fetch).not.toHaveBeenCalled()
    vi.restoreAllMocks()
  })
})

describe('liveVersion', () => {
  it('a server that does not answer in time is no answer', async () => {
    vi.useFakeTimers()
    const fetchImpl = vi.fn((_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(new Error('aborted')))
    }))
    const v = liveVersion({ timeout: 100, fetchImpl })
    await vi.advanceTimersByTimeAsync(101)
    expect(await v).toBe(null)
    vi.useRealTimers()
  })

  it('a page that is not ours (a 404, an HTML fallback) is no answer', async () => {
    expect(await liveVersion({ fetchImpl: () => Promise.resolve({ ok: false }) })).toBe(null)
    expect(await liveVersion({ fetchImpl: () => Promise.resolve({ ok: true, json: () => Promise.reject(new Error('html')) }) })).toBe(null)
  })
})

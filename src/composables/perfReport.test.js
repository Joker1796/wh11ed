import { describe, it, expect, vi, beforeEach } from 'vitest'
import { installPerfReport, screenOf, suspicious } from './perfReport.js'
import { sendPerf, ERROR_REPORTS_KEY } from './useErrorLog.js'

// A PerformanceObserver the test feeds by hand.
function fakePO(types = ['event', 'longtask']) {
  const observers = {}
  class PO {
    constructor(cb) { this.cb = cb }
    observe({ type }) { observers[type] = this.cb }
  }
  PO.supportedEntryTypes = types
  const emit = (type, entries) => observers[type]?.({ getEntries: () => entries })
  return { PO, emit }
}
function fakeEnv() {
  const listeners = {}
  const doc = { visibilityState: 'visible', addEventListener: (t, f) => { listeners[t] = f } }
  const tap = () => listeners.pointerdown()
  const win = { addEventListener: (t, f) => { listeners[t] = f } }
  const hooks = []
  const router = { afterEach: (f) => hooks.push(f) }
  const go = (path) => hooks.forEach((f) => f({ matched: [{ path }] }))
  const hide = () => { doc.visibilityState = 'hidden'; listeners.visibilitychange() }
  const show = () => { doc.visibilityState = 'visible'; listeners.visibilitychange() }
  return { doc, win, router, go, hide, show, tap }
}

describe('perfReport', () => {
  beforeEach(() => localStorage.clear())

  it('names a screen by its route pattern, never its address', () => {
    expect(screenOf({ matched: [{ path: '/:lang(ru)?/roster/:id' }] })).toBe('/roster/:id')
    expect(screenOf({ matched: [{ path: '/:lang(ru)?' }] })).toBe('/')
    expect(screenOf({ matched: [{ path: '/:lang(ru)?/tracker/join/:invite?' }] })).toBe('/tracker/join/:invite')
    expect(screenOf({ matched: [{ path: '/:lang(ru)?/:pathMatch(.*)*' }] })).toBe('/:pathMatch(.)')
  })

  it('keeps each screen\'s slowest tap, long tasks and visible time, and sends only what looks wrong', () => {
    let t = 0
    const { PO, emit } = fakePO()
    const env = fakeEnv()
    const send = vi.fn()
    installPerfReport(env.router, { PerformanceObserver: PO, now: () => t, send, document: env.doc, window: env.win })
    env.go('/:lang(ru)?/roster/:id')
    env.tap()
    emit('event', [{ interactionId: 1, duration: 120 }, { interactionId: 0, duration: 900 }, { interactionId: 2, duration: 260 }])
    emit('longtask', [{ duration: 80 }, { duration: 60 }])
    t = 30000
    env.go('/:lang(ru)?/factions/:slug') // healthy: a quick tap, nothing long
    env.tap()
    t = 60000
    env.go('/:lang(ru)?/tracker/game') // no tap, but busy: 2 s of long tasks in 30 s
    emit('longtask', [{ duration: 1200 }, { duration: 800 }])
    t = 90000
    env.go('/:lang(ru)?/roster/:id')
    t = 100000
    env.hide()
    t = 160000 // hidden time is not counted
    expect(send).toHaveBeenCalledTimes(1)
    expect(send.mock.calls[0][0]).toEqual([
      { route: '/roster/:id', inp: 260, longN: 2, longMs: 140, secs: 40 },
      { route: '/tracker/game', longN: 2, longMs: 2000, secs: 30 },
    ])
    // A healthy session sends nothing at all.
    env.show()
    env.tap()
    t = 163000
    env.hide()
    expect(send).toHaveBeenCalledTimes(1)
  })

  it('reads a slow tap or a busy main thread as suspicious, nothing else', () => {
    expect(suspicious({ inp: 200, longMs: 0, secs: 10 })).toBe(true)
    expect(suspicious({ inp: 199, longMs: 0, secs: 10 })).toBe(false)
    expect(suspicious({ longMs: 1300, secs: 60 })).toBe(true)
    expect(suspicious({ longMs: 1100, secs: 60 })).toBe(false)
  })

  it('does nothing in a browser without Event Timing or Long Tasks', () => {
    const { PO } = fakePO([])
    expect(installPerfReport(fakeEnv().router, { PerformanceObserver: PO })).toBe(null)
  })

  it('sends only while error sending is on, once a day, and never offline', () => {
    const fetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 204 }))
    const perf = [{ route: '/roster/:id', inp: 300, longN: 0, longMs: 0, secs: 5 }]
    expect(sendPerf(perf)).toBe(false)
    expect(fetch).not.toHaveBeenCalled()
    localStorage.setItem(ERROR_REPORTS_KEY, '1')
    const online = vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)
    expect(sendPerf(perf)).toBe(false)
    online.mockRestore()
    expect(sendPerf(perf)).toBe(true)
    const body = JSON.parse(fetch.mock.calls[0][1].body)
    expect(body.perf).toEqual(perf)
    expect(body.device).toMatch(/^c\d{1,2}m\d{0,2}(\.\d{1,2})?$/)
    expect(sendPerf(perf)).toBe(false) // the same day
    expect(fetch).toHaveBeenCalledTimes(1)
    fetch.mockRestore()
  })
})

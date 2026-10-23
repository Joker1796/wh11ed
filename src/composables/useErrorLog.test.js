import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { APP_DATA_VERSION } from '../data/appDataVersion.js'

// The error log's sending half (owner, 2026-10-14): off by default, noise dropped, one send per
// error per page, a real error while off is what the one-time offer waits for.
let log
let fetchMock
const fire = (message, stack) => window.dispatchEvent(new ErrorEvent('error', { message, error: Object.assign(new Error(message), { stack }) }))
const sentBodies = () => fetchMock.mock.calls.map(([, init]) => JSON.parse(init.body))

beforeEach(async () => {
  vi.useFakeTimers()
  localStorage.clear()
  vi.resetModules()
  fetchMock = vi.fn(() => Promise.resolve(new Response(null, { status: 204 })))
  vi.stubGlobal('fetch', fetchMock)
  window.history.replaceState(null, '', '/ru/roster/shared#r=1.secret')
  log = await import('./useErrorLog.js')
  log.installErrorLog()
})
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals() })

describe('sending errors', () => {
  it('sends nothing while it is off, and tells the offer a real error happened', () => {
    const seen = vi.fn()
    log.onUnsentError(seen)
    fire('Cannot read properties of undefined', 'TypeError\n    at f (http://x/assets/a-AbCd1234.js:1:2)')
    vi.advanceTimersByTime(10000)
    expect(fetchMock).not.toHaveBeenCalled()
    expect(seen).toHaveBeenCalledTimes(1)
  })

  it('switched on: the errors seen so far go, once, as text/plain without credentials, the route without its hash', () => {
    fire('boom', 'Error\n    at f (http://x/assets/a-AbCd1234.js:1:2)')
    fire('boom', 'Error\n    at f (http://x/assets/a-AbCd1234.js:1:2)')
    log.setErrorReports(true)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toMatch(/\/errors$/)
    expect(init.headers['Content-Type']).toBe('text/plain')
    expect(init.credentials).toBe('omit')
    const body = sentBodies()[0]
    expect(body.errors).toHaveLength(1)
    expect(body.route).toBe('/ru/roster/shared')
    expect(JSON.stringify(body)).not.toContain('secret')
    expect(body.hello).toBe(true)
    expect(body.channel).toBe('prod')
    expect(body.dataVersion).toBe(APP_DATA_VERSION)
  })

  it('on: batches for a few seconds, then sends', () => {
    log.setErrorReports(true)
    fetchMock.mockClear()
    fire('one')
    fire('two')
    expect(fetchMock).not.toHaveBeenCalled()
    vi.advanceTimersByTime(3500)
    expect(sentBodies()[0].errors.map((e) => e.msg)).toEqual(['one', 'two'])
  })

  it('drops noise: extensions, the resize-observer warning, cross-origin script errors', () => {
    const seen = vi.fn()
    log.onUnsentError(seen)
    fire('ResizeObserver loop completed with undelivered notifications.')
    fire('Script error.')
    fire('x is not defined', 'ReferenceError\n    at chrome-extension://abc/content.js:1:2')
    expect(seen).not.toHaveBeenCalled()
  })

  it('a chunk that failed to load is sent marked, and never prompts', () => {
    const seen = vi.fn()
    log.onUnsentError(seen)
    fire('Failed to fetch dynamically imported module: http://x/assets/a-AbCd1234.js')
    expect(seen).not.toHaveBeenCalled()
    log.setErrorReports(true)
    fetchMock.mockClear()
    fire('Failed to fetch dynamically imported module: http://x/assets/b-AbCd1234.js')
    vi.advanceTimersByTime(3500)
    expect(sentBodies()[0].errors[0].kind).toBe('chunk')
  })

  it('a component error Vue caught is logged too', () => {
    log.logError(new Error('render failed'), 'render function')
    expect(log.recentErrors().at(-1).msg).toBe('render failed [vue: render function]')
  })

  it('a production build\'s link to the error reference becomes its code', () => {
    log.logError(new Error('render failed'), 'https://vuejs.org/error-reference/#runtime-1')
    expect(log.recentErrors().at(-1).msg).toBe('render failed [vue: runtime-1]')
  })

  it('a long stack keeps its top and its bottom: an overflow\'s loop is at the bottom', () => {
    const frames = Array.from({ length: 300 }, (_, k) => `    at f${k} (https://x/assets/a.js:${k}:1)`)
    const kept = log.trimStack(['InternalError: too much recursion', ...frames].join('\n'))
    expect(kept.length).toBeLessThanOrEqual(1500)
    expect(kept).toContain('too much recursion')
    expect(kept).toContain('at f0 ')
    expect(kept).toContain('at f299 ')
    expect(kept).toMatch(/… \d+ frames …/)
    expect(log.trimStack('short')).toBe('short')
  })

  it('keeps the buffer for bug reports whatever the switch says', () => {
    fire('boom')
    expect(log.recentErrors().map((e) => e.msg)).toEqual(['boom'])
  })
})

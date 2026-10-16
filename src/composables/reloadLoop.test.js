import { describe, it, expect, beforeEach, vi } from 'vitest'
import { noteBoot, noteReload, reloadsHeld, LOOP_WINDOW_MS, HOLD_MS } from './reloadLoop.js'

describe('reload loop guard', () => {
  beforeEach(() => localStorage.clear())

  it('a reader opening the app now and then is never held', () => {
    let t = 1_000_000
    for (let i = 0; i < 10; i++) { expect(noteBoot(t)).toBe(false); t += LOOP_WINDOW_MS }
    expect(reloadsHeld(t)).toBe(false)
  })

  // 2026-10-16: six reports from 2.9.2 were readers — an iPhone app reopened from memory, a tab
  // refreshed by hand — with none (or one, long before) of the app's own reloads among the starts.
  it('three starts with none of the app\'s own reloads among them are a reader, not a loop', () => {
    const t = 3_000_000
    expect(noteBoot(t)).toBe(false)
    expect(noteBoot(t + 2000)).toBe(false)
    expect(noteBoot(t + 4000)).toBe(false)
    noteReload('sw', t + 4000 - LOOP_WINDOW_MS - 1) // one of ours, but before the window
    noteReload('user', t + 4500) // the reader's own press of Update: not the app reloading itself
    expect(noteBoot(t + 5000)).toBe(false)
    expect(reloadsHeld(t + 5000)).toBe(false)
  })

  it('three starts within the window, one of them our reload, hold every reload, then let go', () => {
    const t = 5_000_000
    noteReload('sw', t + 3000)
    expect(noteBoot(t)).toBe(false)
    expect(noteBoot(t + 2000)).toBe(false)
    expect(noteBoot(t + 4000)).toBe(true) // caught — reported once
    expect(noteBoot(t + 6000)).toBe(false) // already held: not reported again
    expect(reloadsHeld(t + 4000 + HOLD_MS - 1)).toBe(true)
    expect(reloadsHeld(t + 4000 + HOLD_MS + 1)).toBe(false)
  })
})

describe('the service worker reload', () => {
  beforeEach(() => localStorage.clear())

  it('reloads once, then not again within the floor — and says so in the trail', async () => {
    const { swReload, reloadTrail, SW_RELOAD_FLOOR_MS } = await import('./reloadLoop.js')
    const reload = vi.fn()
    const t = 9_000_000
    expect(swReload({ now: t, reload })).toBe(true)
    expect(swReload({ now: t + 2000, reload })).toBe(false) // the iPhone loop: asked again at once
    expect(reload).toHaveBeenCalledTimes(1)
    expect(swReload({ now: t + SW_RELOAD_FLOOR_MS + 1, reload })).toBe(true) // a real next update
    expect(reload).toHaveBeenCalledTimes(2)
    // jsdom has no service worker: 'no-sw'.
    expect(reloadTrail(t + SW_RELOAD_FLOOR_MS + 1)).toBe('sw@-30.0s/no-sw, sw-skipped@-28.0s/no-sw, sw@-0.0s/no-sw')
  })

  it('never reloads while a loop is held', async () => {
    const { swReload, noteBoot } = await import('./reloadLoop.js')
    const reload = vi.fn()
    const t = 7_000_000
    noteReload('chunk', t + 500)
    noteBoot(t); noteBoot(t + 1000); noteBoot(t + 2000)
    expect(swReload({ now: t + 3000, reload })).toBe(false)
    expect(reload).not.toHaveBeenCalled()
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
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
    noteReload('launch', t + 4000 - LOOP_WINDOW_MS - 1) // one of ours, but before the window
    noteReload('user', t + 4500) // the reader's own press of Update: not the app reloading itself
    expect(noteBoot(t + 5000)).toBe(false)
    expect(reloadsHeld(t + 5000)).toBe(false)
  })

  it('three starts within the window, one of them our reload, hold every reload, then let go', () => {
    const t = 5_000_000
    noteReload('launch', t + 3000)
    expect(noteBoot(t)).toBe(false)
    expect(noteBoot(t + 2000)).toBe(false)
    expect(noteBoot(t + 4000)).toBe(true) // caught — reported once
    expect(noteBoot(t + 6000)).toBe(false) // already held: not reported again
    expect(reloadsHeld(t + 4000 + HOLD_MS - 1)).toBe(true)
    expect(reloadsHeld(t + 4000 + HOLD_MS + 1)).toBe(false)
  })
})

describe('the loop report', () => {
  beforeEach(() => { localStorage.clear(); sessionStorage.clear() })

  // 2026-10-18: the starts are counted per device, so tabs restored together look like a loop — the
  // report names whose starts and reloads they were.
  it('names the tab of every start and reload, this one marked', async () => {
    const { bootList, reloadTrail } = await import('./reloadLoop.js')
    const t = 11_000_000
    sessionStorage.setItem('wh11ed-tab', 'aaaa')
    noteBoot(t)
    noteReload('launch', t + 500)
    sessionStorage.setItem('wh11ed-tab', 'bbbb')
    noteBoot(t + 1000)
    expect(bootList(t + 2000)).toBe('aaaa@-2.0s, bbbb*@-1.0s')
    // jsdom has no service worker: 'no-sw'.
    expect(reloadTrail(t + 2000)).toBe('launch@-1.5s/no-sw/aaaa')
  })

  it('reads the starts stored before the tab was noted', async () => {
    const { bootList } = await import('./reloadLoop.js')
    const t = 13_000_000
    localStorage.setItem('wh11ed-boots', JSON.stringify([t - 3000]))
    expect(noteBoot(t)).toBe(false)
    expect(bootList(t).split(', ')[0]).toBe('?@-3.0s')
  })
})

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { noteBoot, noteReload, reloadsHeld, LOOP_WINDOW_MS, HOLD_MS } from './reloadLoop.js'

describe('reload loop guard', () => {
  beforeEach(() => { localStorage.clear(); sessionStorage.clear() })

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

  // A start that follows one of the app's own reloads, in this tab.
  const ownStart = (t, reason = 'launch') => { noteReload(reason, t - 300); return noteBoot(t) }

  it('three starts of one tab, each after our own reload, hold every reload, then let go', () => {
    const t = 5_000_000
    expect(ownStart(t)).toBe(false)
    expect(ownStart(t + 2000, 'chunk')).toBe(false)
    expect(ownStart(t + 4000)).toBe(true) // caught — reported once
    expect(ownStart(t + 6000)).toBe(false) // already held: not reported again
    expect(reloadsHeld(t + 4000 + HOLD_MS - 1)).toBe(true)
    expect(reloadsHeld(t + 4000 + HOLD_MS + 1)).toBe(false)
  })

  // 2026-10-21, the payloads of two reports that were readers:
  // "starts [bv3a@-14.2s, bv3a@-12.8s, b9j1*@-0.0s], trail [launch@-13.8s/ctl/bv3a]" — a new tab
  // beside another that had opened the new build.
  it('a new tab is not one more start of the tab beside it', () => {
    const t = 7_000_000
    sessionStorage.setItem('wh11ed-tab', 'bv3a')
    expect(noteBoot(t - 14_200)).toBe(false)
    noteReload('launch', t - 13_800)
    expect(noteBoot(t - 12_800)).toBe(false)
    sessionStorage.clear()
    sessionStorage.setItem('wh11ed-tab', 'b9j1')
    expect(noteBoot(t)).toBe(false)
    expect(reloadsHeld(t)).toBe(false)
  })

  // "starts [?@-3.5s, efle*@-3.0s, efle*@-0.0s], trail [launch@-3.1s/ctl, user@-0.1s/ctl/efle]" —
  // the start opened the new build, then the reader pressed the plate's button.
  it('the plate\'s button is the reader\'s reload, not the app\'s', () => {
    const t = 9_000_000
    localStorage.setItem('wh11ed-boots', JSON.stringify([t - 3500]))
    sessionStorage.setItem('wh11ed-tab', 'efle')
    noteReload('launch', t - 3100)
    expect(noteBoot(t - 3000)).toBe(false)
    noteReload('user', t - 100)
    expect(noteBoot(t)).toBe(false)
    expect(reloadsHeld(t)).toBe(false)
  })

  it('F5 after one of our reloads is the reader\'s: the mark is taken by the start that follows it', () => {
    const t = 10_000_000
    expect(ownStart(t)).toBe(false)
    expect(noteBoot(t + 1000)).toBe(false)
    expect(noteBoot(t + 2000)).toBe(false)
    expect(noteBoot(t + 3000)).toBe(false)
    expect(reloadsHeld(t + 3000)).toBe(false)
  })

  it('our own reloads in two tabs do not add up', () => {
    const t = 12_000_000
    sessionStorage.setItem('wh11ed-tab', 'aaaa')
    ownStart(t); ownStart(t + 1000)
    sessionStorage.clear()
    sessionStorage.setItem('wh11ed-tab', 'bbbb')
    expect(ownStart(t + 2000)).toBe(false)
    expect(reloadsHeld(t + 2000)).toBe(false)
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
    sessionStorage.clear() // another tab: its own sessionStorage
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

describe('the loop report says how the page was loaded and what was waiting', () => {
  beforeEach(() => { localStorage.clear(); sessionStorage.clear() })
  afterEach(() => { vi.restoreAllMocks(); delete navigator.serviceWorker })

  it('names the navigation type, the starts after our reloads and the waiting worker\'s version', async () => {
    const { loopReport, noteWaitingVersion } = await import('./reloadLoop.js')
    vi.spyOn(performance, 'getEntriesByType').mockReturnValue([{ type: 'reload' }])
    const reg = { active: { state: 'activated' }, waiting: { state: 'installed' }, installing: null }
    Object.defineProperty(navigator, 'serviceWorker', { value: { controller: {}, getRegistration: () => Promise.resolve(reg) }, configurable: true })
    noteWaitingVersion('2.10.1')
    sessionStorage.setItem('wh11ed-tab', 'cccc')
    noteReload('launch', Date.now() - 500)
    noteBoot()
    const { message, stack: msg } = await loopReport('2.10.0')
    expect(message).toBe('reload loop caught (3 starts in 20s)')
    expect(msg).toContain('nav reload')
    expect(msg).toContain('waiting installed (v2.10.1 when found)')
    expect(msg).toMatch(/starts \[cccc\*!@-/)
  })
})

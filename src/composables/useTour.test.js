import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// The tour waits for the screen to be free: "Start game" opens the secondaries' draw at once, and
// the turn's chapter lit the bar under it (owner, 2026-10-09).
describe('useTour', () => {
  let useTour, useTourShow
  // jsdom lays nothing out: an element "on screen" is one that reports a box.
  const realRects = Element.prototype.getClientRects
  const anchor = (name) => {
    const el = document.createElement('div')
    el.dataset.tour = name
    document.body.appendChild(el)
    return el
  }
  beforeEach(async () => {
    vi.useFakeTimers()
    vi.resetModules()
    localStorage.clear()
    Element.prototype.getClientRects = function () { return this.dataset?.tour ? [{}] : [] }
    ;({ useTour, useTourShow } = await import('./useTour.js'))
    for (const n of ['home-cta', 'game-turnbar', 'roster-new', 'rv-head']) anchor(n)
  })
  afterEach(() => {
    vi.useRealTimers()
    Element.prototype.getClientRects = realRects
    document.body.innerHTML = ''
  })

  it('starts a chapter once the screen has stayed free', () => {
    const t = useTour()
    t.maybeStart('home')
    expect(t.active.value).toBe(null)
    vi.advanceTimersByTime(900)
    expect(t.active.value?.id).toBe('home')
  })

  it('waits while a dialog is open, then starts', () => {
    const t = useTour()
    const dialog = document.createElement('div')
    dialog.className = 'modal-overlay'
    document.body.appendChild(dialog)
    t.maybeStart('turn')
    vi.advanceTimersByTime(3000)
    expect(t.active.value).toBe(null)
    dialog.remove()
    vi.advanceTimersByTime(900)
    expect(t.active.value?.id).toBe('turn')
  })

  it('a dialog that opens a moment late still holds it', () => {
    const t = useTour()
    t.maybeStart('turn')
    vi.advanceTimersByTime(450)
    const dialog = document.createElement('div')
    dialog.className = 'modal-overlay'
    document.body.appendChild(dialog)
    vi.advanceTimersByTime(2000)
    expect(t.active.value).toBe(null)
  })

  it('a seen chapter does not come back by itself', () => {
    const t = useTour()
    t.start('home')
    t.finish()
    t.maybeStart('home')
    vi.advanceTimersByTime(2000)
    expect(t.active.value).toBe(null)
  })

  // The rosters' desk asks for two chapters at once (the list's, the roster's): both are shown,
  // one after the other, instead of the second cancelling the first.
  it('shows chapters asked for together one after the other', () => {
    const t = useTour()
    t.maybeStart('roster-list')
    t.maybeStart('roster-view')
    vi.advanceTimersByTime(900)
    expect(t.active.value?.id).toBe('roster-list')
    t.finish()
    vi.advanceTimersByTime(900)
    expect(t.active.value?.id).toBe('roster-view')
  })

  it('waits for its screen: nothing it lights on screen, nothing shown', () => {
    document.querySelector('[data-tour="home-cta"]').remove()
    const t = useTour()
    t.maybeStart('home')
    vi.advanceTimersByTime(3000)
    expect(t.active.value).toBe(null)
    anchor('home-cta')
    vi.advanceTimersByTime(900)
    expect(t.active.value?.id).toBe('home')
  })

  it('puts the screen in the state each step tells about', async () => {
    const { effectScope, nextTick } = await import('vue')
    const shown = []
    const scope = effectScope()
    scope.run(() => useTourShow('tab', (v) => shown.push(v)))
    const t = useTour()
    t.start('game', { begun: false, phases: true, lists: false, tabs: ['missions', 'phase', 'cp', 'armies', 'log', 'stats'] })
    const n = t.chapter.value.steps.length
    for (let i = 0; i < n; i++) { await nextTick(); t.next() }
    await nextTick()
    scope.stop()
    expect(shown).toEqual(['missions', 'missions', 'missions', 'phase', 'cp', 'armies', 'log', 'stats', 'missions'])
  })
})

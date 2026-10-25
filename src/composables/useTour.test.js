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
    // Chapters starting by themselves — the answer to the once-per-device question (tested below).
    localStorage.setItem('wh11ed-tour-auto', 'on')
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

  // The tracker home's chapter was still waiting when "Shared game" took the player to the lobby;
  // it started during the page change, while the leaving home was still in the DOM, and its card
  // stood over the invite with nothing lit (2026-10-09).
  it('a chapter still waiting is dropped with its page', async () => {
    const { leavePage } = await import('./useTour.js')
    const t = useTour()
    t.maybeStart('home')
    vi.advanceTimersByTime(450)
    leavePage()
    vi.advanceTimersByTime(2000) // home-cta is still here, as the leaving page's is for a moment
    expect(t.active.value).toBe(null)
  })

  it('a chapter on screen closes with its page, unseen, and comes back there', async () => {
    const { leavePage } = await import('./useTour.js')
    const t = useTour()
    t.start('home')
    leavePage()
    expect(t.active.value).toBe(null)
    t.maybeStart('home')
    vi.advanceTimersByTime(900)
    expect(t.active.value?.id).toBe('home')
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
    // Before the battle its steps are a tab of their own (2026-10-25): the step about them opens it.
    expect(shown).toEqual(['missions', 'prebattle', 'missions', 'missions', 'phase', 'cp', 'armies', 'log', 'stats', 'missions'])
  })

  it('a chapter in line is not dropped while the one before it is read', () => {
    const t = useTour()
    t.maybeStart('roster-list')
    t.maybeStart('roster-view')
    vi.advanceTimersByTime(900)
    expect(t.active.value?.id).toBe('roster-list')
    vi.advanceTimersByTime(120000) // a slow reader
    t.finish()
    vi.advanceTimersByTime(900)
    expect(t.active.value?.id).toBe('roster-view')
  })

  // The ⚙ menu offers "this screen's tutorial" only while one of the chapters the page asked for
  // has something on screen to light.
  it('offers the replay only while an asked chapter has an element on screen', async () => {
    const { replayableNow, forgetScreen } = await import('./tourScreen.js')
    forgetScreen()
    const t = useTour()
    expect(replayableNow()).toBe(false)
    t.maybeStart('roster-setup') // nothing of it on screen
    expect(replayableNow()).toBe(false)
    const field = anchor('rs-name')
    expect(replayableNow()).toBe(true)
    field.remove()
    expect(replayableNow()).toBe(false)
  })

  // A player's report (2026-10-15): "the tutorial always pops up". The first chapter that would
  // start by itself asks first, once per device; no means no chapter starts by itself again, and
  // the menu's replay still shows one.
  async function fresh(answer) {
    vi.resetModules()
    localStorage.clear()
    if (answer) localStorage.setItem('wh11ed-tour-auto', answer)
    return (await import('./useTour.js')).useTour()
  }
  it('asks once instead of starting, and yes starts the chapter that asked', async () => {
    const t = await fresh('')
    t.maybeStart('home')
    vi.advanceTimersByTime(900)
    expect(t.active.value).toBe(null)
    expect(t.asking.value?.id).toBe('home')
    t.answerAuto(true)
    expect(t.active.value?.id).toBe('home')
    expect(localStorage.getItem('wh11ed-tour-auto')).toBe('on')
  })
  it('no: nothing starts by itself, now or on the next visit — the replay still does', async () => {
    const t = await fresh('')
    t.maybeStart('home')
    vi.advanceTimersByTime(900)
    t.answerAuto(false)
    expect(t.active.value).toBe(null)
    const again = await fresh('off')
    again.maybeStart('home')
    vi.advanceTimersByTime(900)
    expect(again.active.value).toBe(null)
    again.replay()
    vi.advanceTimersByTime(900)
    expect(again.active.value?.id).toBe('home')
  })
  // Owner, 2026-10-21: "Don't turn on" and the tutorial came anyway. The rosters' desk asks for two
  // chapters at once; the first asked, the second waited for the answer — and the loop read any
  // answer as yes, so "no" started the one in line.
  it('no also holds for the chapters waiting in line behind the question', async () => {
    const t = await fresh('')
    t.maybeStart('roster-list')
    t.maybeStart('roster-view')
    vi.advanceTimersByTime(900)
    expect(t.asking.value?.id).toBe('roster-list')
    t.answerAuto(false)
    vi.advanceTimersByTime(3000)
    expect(t.active.value).toBe(null)
    expect(t.asking.value).toBe(null)
  })
  // Owner, 2026-10-20: once turned on, there was no way to turn the tutorial off again.
  it('turned off from its own card: the chapter closes, nothing starts by itself, the replay still does', async () => {
    const t = await fresh('on')
    t.maybeStart('home')
    vi.advanceTimersByTime(900)
    expect(t.active.value?.id).toBe('home')
    t.turnOff()
    expect(t.active.value).toBe(null)
    expect(localStorage.getItem('wh11ed-tour-auto')).toBe('off')
    const again = await fresh('off')
    again.maybeStart('home')
    vi.advanceTimersByTime(900)
    expect(again.active.value).toBe(null)
    again.replay()
    vi.advanceTimersByTime(900)
    expect(again.active.value?.id).toBe('home')
  })
})

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// The tour waits for the screen to be free: "Start game" opens the secondaries' draw at once, and
// the turn's chapter lit the bar under it (owner, 2026-10-09).
describe('useTour', () => {
  let useTour
  beforeEach(async () => {
    vi.useFakeTimers()
    vi.resetModules()
    localStorage.clear()
    ;({ useTour } = await import('./useTour.js'))
  })
  afterEach(() => {
    vi.useRealTimers()
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
})

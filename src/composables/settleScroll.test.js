import { describe, it, expect, vi, afterEach } from 'vitest'
import { hold, settle } from './settleScroll.js'

// jsdom has no layout: the page's height, the scroll and the marker's place are stubbed.
function page({ height, scrollY, innerHeight = 800 }) {
  const doc = document.documentElement
  const state = { height, scrollY, markerAt: height }
  Object.defineProperty(doc, 'scrollHeight', { configurable: true, get: () => state.height })
  Object.defineProperty(window, 'scrollY', { configurable: true, get: () => state.scrollY })
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: innerHeight })
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({ top: state.markerAt - state.scrollY }))
  window.scrollTo = vi.fn(({ top }) => { state.scrollY = top })
  return state
}

afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers(); document.body.style.minHeight = '' })

describe('settleScroll', () => {
  it('holds the page through a switch to a shorter block and glides to its foot', () => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance'] })
    const s = page({ height: 1200, scrollY: 400 })
    hold()
    expect(document.body.style.minHeight).not.toBe('')
    s.markerAt = 1000 // the new block is 200px shorter: the foot is now 1000 - 800 = 200
    settle(600)
    expect(window.scrollTo).not.toHaveBeenCalled() // nothing in the same frame: no leap
    vi.advanceTimersByTime(300)
    expect(s.scrollY).toBeGreaterThan(200)
    expect(s.scrollY).toBeLessThan(400)
    vi.advanceTimersByTime(400)
    expect(s.scrollY).toBe(200)
    expect(document.body.style.minHeight).toBe('')
  })

  it('lets go when the reader is above the new foot', () => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance'] })
    const s = page({ height: 1200, scrollY: 60 })
    hold()
    s.markerAt = 1000
    settle(600)
    vi.advanceTimersByTime(20)
    expect(window.scrollTo).not.toHaveBeenCalled()
    expect(document.body.style.minHeight).toBe('')
  })

  it('moves in one step under reduced motion', () => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance'] })
    const s = page({ height: 1200, scrollY: 400 })
    hold()
    s.markerAt = 1000
    settle(0)
    vi.advanceTimersByTime(20)
    expect(s.scrollY).toBe(200)
    expect(document.body.style.minHeight).toBe('')
  })

  it('glides further up when the tabs have to come back into view', () => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance'] })
    const s = page({ height: 1200, scrollY: 400 })
    hold()
    settle(600, -250) // same height, but the tabs are 250px above the header
    vi.advanceTimersByTime(700)
    expect(s.scrollY).toBe(150)
  })

  it('goes to the highest place any panel of one tap asked for', () => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance'] })
    const s = page({ height: 1200, scrollY: 400 })
    hold()
    settle(600) // a panel content where it is
    settle(600, -100) // another wants its tabs back in view
    vi.advanceTimersByTime(700)
    expect(s.scrollY).toBe(300)
    expect(document.body.style.minHeight).toBe('')
  })
})

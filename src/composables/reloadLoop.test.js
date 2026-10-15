import { describe, it, expect, beforeEach } from 'vitest'
import { noteBoot, reloadsHeld, LOOP_WINDOW_MS, HOLD_MS } from './reloadLoop.js'

describe('reload loop guard', () => {
  beforeEach(() => localStorage.clear())

  it('a reader opening the app now and then is never held', () => {
    let t = 1_000_000
    for (let i = 0; i < 10; i++) { expect(noteBoot(t)).toBe(false); t += LOOP_WINDOW_MS }
    expect(reloadsHeld(t)).toBe(false)
  })

  it('three starts within the window hold every reload for the hold time, then let go', () => {
    const t = 5_000_000
    expect(noteBoot(t)).toBe(false)
    expect(noteBoot(t + 2000)).toBe(false)
    expect(noteBoot(t + 4000)).toBe(true) // caught — reported once
    expect(noteBoot(t + 6000)).toBe(false) // already held: not reported again
    expect(reloadsHeld(t + 4000 + HOLD_MS - 1)).toBe(true)
    expect(reloadsHeld(t + 4000 + HOLD_MS + 1)).toBe(false)
  })
})

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// A finger starting a scroll on a list of unit cards clicked as the list moved (owner, 2026-10-09):
// under a finger the press is heard once it is one.
vi.mock('./pressSound.js', () => ({ pressSound: vi.fn() }))

describe('installPressFeedback — the press sound under a finger', () => {
  let pressSound, btn
  const fire = (type, init = {}) => {
    const e = new Event(type, { bubbles: true })
    Object.assign(e, { button: 0, pointerType: 'touch', clientX: 50, clientY: 50, ...init })
    btn.dispatchEvent(e)
  }
  const downs = () => pressSound.mock.calls.filter((c) => c[1] === 0).length
  beforeEach(async () => {
    vi.useFakeTimers()
    vi.resetModules()
    ;({ pressSound } = await import('./pressSound.js'))
    pressSound.mockClear()
    const root = document.createElement('div')
    document.body.appendChild(root)
    btn = document.createElement('button')
    btn.className = 'btn-primary'
    root.appendChild(btn)
    const { installPressFeedback } = await import('./pressFeedback.js')
    installPressFeedback(root)
  })
  afterEach(() => {
    vi.useRealTimers()
    document.body.innerHTML = ''
  })

  it('a tap is heard once, as it is let go', () => {
    fire('pointerdown')
    expect(downs()).toBe(0)
    vi.advanceTimersByTime(60)
    fire('pointerup')
    expect(downs()).toBe(1)
  })

  it('a finger held still is heard while held', () => {
    fire('pointerdown')
    vi.advanceTimersByTime(120)
    expect(downs()).toBe(1)
    fire('pointerup')
    expect(downs()).toBe(1)
  })

  it('a finger that turns into a scroll is not heard at all', () => {
    fire('pointerdown')
    vi.advanceTimersByTime(40)
    fire('pointercancel')
    vi.advanceTimersByTime(500)
    expect(pressSound).not.toHaveBeenCalled()
  })

  it('a finger that moves before it is sure is not heard', () => {
    fire('pointerdown')
    fire('pointermove', { clientY: 70 })
    vi.advanceTimersByTime(500)
    fire('pointercancel')
    expect(pressSound).not.toHaveBeenCalled()
  })

  it('a mouse is heard at once', () => {
    fire('pointerdown', { pointerType: 'mouse' })
    expect(downs()).toBe(1)
  })
})

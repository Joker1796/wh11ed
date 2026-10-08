import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('./uiSound.js', () => ({ playSound: vi.fn() }))
const { playSound } = await import('./uiSound.js')
const { pressSound, soundKindOf } = await import('./pressSound.js')

const el = (w, h, own) => ({ offsetWidth: w, offsetHeight: h, dataset: own ? { pressSound: own } : {} })
beforeEach(() => playSound.mockClear())

describe('pressSound', () => {
  it('clicks a button and thuds a card, down then up; a let-go never waits for the load', () => {
    pressSound(el(100, 40), 0); pressSound(el(100, 40), 1)
    pressSound(el(320, 120), 0); pressSound(el(320, 120, 'click'), 0)
    expect(playSound.mock.calls).toEqual([
      ['click-down', { late: true }], ['click-up', { late: false }],
      ['card-down', { late: true }], ['click-down', { late: true }],
    ])
  })

  it('leaves what sounds its own state silent under the finger (stateSounds.js)', () => {
    const make = (html) => { const d = document.createElement('div'); d.innerHTML = html; return d.firstElementChild }
    const own = [
      make('<label><input type="checkbox"></label>'),
      make('<button data-press-sound="toggle"></button>'),
      make('<button role="tab"></button>'),
      make('<button aria-expanded="false"></button>'),
    ]
    for (const x of own) { expect(soundKindOf(x)).toBe(null); pressSound(x, 0) }
    expect(playSound).not.toHaveBeenCalled()
    expect(soundKindOf(make('<button aria-expanded="false" aria-haspopup="menu"></button>'))).toBe('click')
  })

  it('hears a quick tap once, as it goes down; a held press and a key press both ways', () => {
    pressSound(el(100, 40), 0); pressSound(el(100, 40), 1, { held: 70 })
    pressSound(el(100, 40), 0); pressSound(el(100, 40), 1, { held: 400 })
    pressSound(el(100, 40), 0); pressSound(el(100, 40), 1)
    expect(playSound.mock.calls.map((c) => c[0])).toEqual(['click-down', 'click-down', 'click-up', 'click-down', 'click-up'])
  })
})

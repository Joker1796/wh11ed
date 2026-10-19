import { describe, it, expect } from 'vitest'
import { whenDrawnText } from './whenDrawn.js'

describe('whenDrawnText', () => {
  it('reads a card\'s "When Drawn" line in the reader\'s language', () => {
    expect(whenDrawnText('a-tempting-target', 'attacker', 'en')).toMatch(/tempting target/i)
  })
  // "When Drawn / Start of Your Turn" is a rule of the draw too (2026-09-29: Burden of Trust had
  // no badge in the take dialog).
  it('finds a combined "When Drawn / …" line', () => {
    expect(whenDrawnText('burden-of-trust', 'attacker', 'en')).toMatch(/objective/i)
    expect(whenDrawnText('burden-of-trust', 'attacker', 'ru')).toMatch(/цел/i)
  })
  it('is empty for a card without one', () => {
    expect(whenDrawnText('display-of-might', 'attacker', 'en')).toBe('')
  })
})

import { describe, it, expect } from 'vitest'
import { countLabel } from './plural.js'

describe('countLabel', () => {
  it('takes the Russian form the count asks for', () => {
    const f = 'победа|победы|побед'
    expect([1, 2, 5, 11, 12, 21, 22, 25, 111].map((n) => countLabel(n, f))).toEqual(
      ['1 победа', '2 победы', '5 побед', '11 побед', '12 побед', '21 победа', '22 победы', '25 побед', '111 побед'])
  })
  it('takes the English one/other, and a single form as it is', () => {
    expect([countLabel(1, 'win|wins'), countLabel(3, 'win|wins'), countLabel(3, 'pts')]).toEqual(['1 win', '3 wins', '3 pts'])
  })
})

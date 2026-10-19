import { describe, it, expect } from 'vitest'
import { formatBaseSize } from './baseSize.js'
import { ui } from '../i18n/ui.js'

describe('formatBaseSize', () => {
  it('draws one size by its shape', () => {
    expect(formatBaseSize('32mm', ui.en)).toBe('⌀32mm')
    expect(formatBaseSize('170x109mm Oval Base', ui.en)).toBe('170×109mm')
    expect(formatBaseSize('Hull', ui.ru)).toBe('Корпус')
  })

  it('names each model where appdata gives them a line each', () => {
    expect(formatBaseSize('Novitiate Superior: 32mm\nSister Novitiate: 28.5mm', ui.en))
      .toBe('Novitiate Superior ⌀32mm · Sister Novitiate ⌀28.5mm')
    expect(formatBaseSize('The Silent King: Szarekh: 100mm\nTriarchal Menhir: 50mm', ui.en))
      .toBe('The Silent King: Szarekh ⌀100mm · Triarchal Menhir ⌀50mm')
    expect(formatBaseSize('Kroot Kill-broker: 32mm\nOther models: 28.5mm', ui.ru))
      .toBe('Kroot Kill-broker ⌀32mm · Остальные модели ⌀28.5mm')
  })
})

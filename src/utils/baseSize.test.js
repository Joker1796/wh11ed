import { describe, it, expect } from 'vitest'
import { formatBaseSize, profileBases } from './baseSize.js'
import { ui } from '../i18n/ui.js'

describe('formatBaseSize', () => {
  it('draws one size by its shape', () => {
    expect(formatBaseSize('32mm', ui.en)).toBe('⌀32mm')
    expect(formatBaseSize('170x109mm Oval Base', ui.en)).toBe('170×109mm')
    expect(formatBaseSize('Hull', ui.ru)).toBe('Корпус')
    expect(formatBaseSize('None', ui.ru)).toBe('Без базы')
    expect(formatBaseSize('None', ui.en)).toBe('No base')
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

describe('profileBases', () => {
  const sk = {
    baseSize: 'The Silent King: Szarekh: 100mm\nThe Silent King: Triarchal Menhir: 50mm',
    profiles: [{ name: 'SZAREKH' }, { name: 'TRIARCHAL MENHIR' }],
  }
  it('gives each profile the base its line names, plurals and lists included', () => {
    expect([...profileBases(sk)]).toEqual([[0, '100mm'], [1, '50mm']])
    const clade = {
      baseSize: 'Servitor Underseer, Gun Servitors: 32mm\nCombat Servitors: 25mm',
      profiles: [{ name: 'Servitor Underseer' }, { name: 'Gun Servitor' }, { name: 'Combat Servitor' }],
    }
    expect([...profileBases(clade)]).toEqual([[0, '32mm'], [1, '32mm'], [2, '25mm']])
  })
  it('moves nothing unless every line lands on a profile', () => {
    expect(profileBases({ ...sk, baseSize: 'Kroot Kill-broker: 32mm\nOther models: 28.5mm', profiles: [{ name: 'Kroot Kill-broker' }, { name: 'Kroot Farstalker' }] })).toBe(null)
    expect(profileBases({ baseSize: '40mm', profiles: sk.profiles })).toBe(null)
    expect(profileBases({ ...sk, profiles: [{ name: 'SZAREKH' }] })).toBe(null)
  })
})

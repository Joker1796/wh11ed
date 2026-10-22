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

// Every base the data carries, drawn for a Russian reader: no English word left in it. appdata's
// "None" printed as it was on eight sheets until a look at the Rhino (2026-10-22), and "Custom",
// "150mm Oval Base" and every list of sizes with an oval in it the same way.
describe('every base in the data', () => {
  const files = import.meta.glob(['../data/datasheets/*.js', '../data/combatPatrol.js'], { eager: true })
  const values = new Set()
  const walk = (v) => {
    if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) (k === 'baseSize' && typeof x === 'string' ? values.add(x) : walk(x))
  }
  Object.values(files).forEach(walk)

  it('finds the values to check', () => expect(values.size).toBeGreaterThan(50))

  it('reads in Russian, whatever appdata wrote', () => {
    const english = []
    for (const v of values) {
      for (const line of v.split('\n')) {
        // The model's name before the colon stays English; the size after it must not.
        const size = line.match(/^(.*):\s*(\S.*)$/)?.[2] ?? line
        const out = formatBaseSize(size.trim(), ui.ru)
        if (/[A-Za-z]/.test(out.replace(/mm/g, ''))) english.push(`${size} → ${out}`)
      }
    }
    expect(english).toEqual([])
  })

  it('draws the shapes it was fixed for', () => {
    expect(formatBaseSize('Custom', ui.ru)).toBe('Своя база')
    expect(formatBaseSize('150mm Oval Base', ui.ru)).toBe('150mm, овальная')
    expect(formatBaseSize('75mm, 90x52.5mm Oval Base', ui.ru)).toBe('⌀75mm, 90×52.5mm')
  })
})

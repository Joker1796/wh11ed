import { describe, it, expect } from 'vitest'
import { bucketOf, unitBasePoints, rosterPoints } from './rosterEngine.js'

const intercessor = { id: 'intercessor-squad', kws: ['Battleline', 'Infantry'], flags: {}, sizes: [{ pts: 80, per: [5, 5], default: 1 }, { pts: 150, per: [6, 10] }] }
const captain = { id: 'captain', kws: ['Character', 'Infantry'], flags: { char: 1 }, sizes: [{ pts: 85, per: [1, 1], default: 1 }] }
const knight = { id: 'porphyrion', kws: ['Vehicle'], flags: {}, sizes: [{ pts: 725, per: [1, 1], default: 1 }], step: { at: 2, pts: 75 } }
const epic = { id: 'marneus', kws: ['Character', 'Epic Hero'], flags: { char: 1, epic: 1 }, sizes: [{ pts: 95, per: [1, 1] }] }

describe('bucketOf', () => {
  it('files units by role, epic/character first', () => {
    expect(bucketOf(epic)).toBe('epic')
    expect(bucketOf(captain)).toBe('characters')
    expect(bucketOf(intercessor)).toBe('battleline')
    expect(bucketOf({ kws: ['Dedicated Transport'], flags: {} })).toBe('transports')
    expect(bucketOf({ kws: ['Vehicle'], flags: {} })).toBe('other')
    expect(bucketOf({ kws: [], flags: {}, condBattleline: 1 })).toBe('battleline')
  })
})

describe('unitBasePoints', () => {
  it('reads the chosen size bracket', () => {
    expect(unitBasePoints(intercessor, 0)).toBe(80)
    expect(unitBasePoints(intercessor, 1)).toBe(150)
    expect(unitBasePoints(intercessor)).toBe(80) // defaults to first bracket
  })
  it('applies the copy-tax step only from the Nth copy on', () => {
    expect(unitBasePoints(knight, 0, 1)).toBe(725)
    expect(unitBasePoints(knight, 0, 2)).toBe(800)
    expect(unitBasePoints(knight, 0, 3)).toBe(800)
  })
})

describe('rosterPoints', () => {
  const defs = { 'intercessor-squad': intercessor, captain, porphyrion: knight }
  const defOf = (id) => defs[id]
  it('sums entries, taxing duplicate datasheets by copy index', () => {
    const units = [
      { id: 'intercessor-squad', size: 0 }, // 80
      { id: 'intercessor-squad', size: 1 }, // 150
      { id: 'captain', size: 0 }, // 85
      { id: 'porphyrion', size: 0 }, // 725
      { id: 'porphyrion', size: 0 }, // 800 (2nd copy)
    ]
    expect(rosterPoints(units, defOf)).toBe(80 + 150 + 85 + 725 + 800)
  })
  it('is empty-safe', () => {
    expect(rosterPoints([], defOf)).toBe(0)
    expect(rosterPoints(null, defOf)).toBe(0)
  })
})

import { describe, it, expect } from 'vitest'
import { unitsWithKeyword } from './keywordUnits.js'

const sheets = [
  { id: 'a', name: 'A', keywords: ['Infantry', 'Character'] },
  { id: 'b', name: 'B', keywords: ['Vehicle'] },
  { id: 'c', name: 'C', keywordsByModel: [{ model: 'Sub-model', list: ['Infantry'] }] },
]

describe('unitsWithKeyword', () => {
  it('matches a flat printed keyword', () => {
    expect(unitsWithKeyword(sheets, 'Infantry').map((s) => s.id)).toEqual(['a', 'c'])
  })

  it('matches a keyword scoped to one model group', () => {
    expect(unitsWithKeyword(sheets, 'Vehicle').map((s) => s.id)).toEqual(['b'])
  })

  it('returns an empty list for a keyword nobody has', () => {
    expect(unitsWithKeyword(sheets, 'Monster')).toEqual([])
  })

  it('returns an empty list for a falsy keyword or sheet list', () => {
    expect(unitsWithKeyword(sheets, '')).toEqual([])
    expect(unitsWithKeyword(null, 'Infantry')).toEqual([])
  })
})

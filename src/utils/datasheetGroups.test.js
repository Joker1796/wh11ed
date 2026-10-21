import { describe, expect, it } from 'vitest'
import { chapterOf, groupByType, TYPE_GROUPS } from './datasheetGroups.js'

describe('groupByType', () => {
  const labels = Object.fromEntries(TYPE_GROUPS.map((g) => [g.label, g.key.toUpperCase()]))
  const ids = (groups, key) => groups.find((g) => g.key === key).sheets.map((s) => s.id)

  it('puts a sheet in the first group whose keyword it carries', () => {
    const groups = groupByType([
      { id: 'hero', keywords: ['Character', 'Epic Hero', 'Infantry'] },
      { id: 'captain', keywords: ['Character', 'Infantry'] },
      { id: 'rhino', keywords: ['Vehicle', 'Dedicated Transport'] },
      { id: 'squad', keywords: ['Infantry', 'Battleline'] },
      { id: 'beast', keywords: ['Monster'] },
    ], labels)
    expect(ids(groups, 'epic')).toEqual(['hero'])
    expect(ids(groups, 'character')).toEqual(['captain'])
    expect(ids(groups, 'transport')).toEqual(['rhino'])
    expect(ids(groups, 'battleline')).toEqual(['squad'])
    expect(ids(groups, 'other')).toEqual(['beast'])
    expect(groups.map((g) => g.label)).toEqual(TYPE_GROUPS.map((g) => g.key.toUpperCase()))
  })
})

describe('chapterOf', () => {
  it('reads the Chapter whichever place it has among the Faction keywords', () => {
    expect(chapterOf({ factionKeywords: ['Adeptus Astartes', 'Ultramarines'] })).toBe('Ultramarines')
    expect(chapterOf({ factionKeywords: ['Imperial Fists', 'Adeptus Astartes'] })).toBe('Imperial Fists')
    expect(chapterOf({ factionKeywords: ['Adeptus Astartes'] })).toBe(undefined)
  })
})

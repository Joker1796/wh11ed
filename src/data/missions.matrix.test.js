import { describe, it, expect } from 'vitest'
import { primaryFor, primaryRow } from './missions.js'
import { DISPOSITIONS } from './dispositions.js'
import { eventCompanion } from './eventCompanion.js'

// The Primary Mission matrix is written down twice: as each card's `deck` + `opponent` in
// missions.js (what the tracker, the Missions chapter and the roster builder read) and as the 15
// `matchups` of the Terrain & Layouts chapter. A typo on either side would deal two players
// different missions depending on the screen they asked.
describe('primary mission matrix', () => {
  it('agrees with every Terrain & Layouts matchup, both ways round', () => {
    const { matchups } = eventCompanion.en
    expect(matchups).toHaveLength(15)
    for (const m of matchups) {
      expect(primaryFor(m.a, m.b)?.name, `${m.a} vs ${m.b}`).toBe(m.missionA)
      expect(primaryFor(m.b, m.a)?.name, `${m.b} vs ${m.a}`).toBe(m.missionB)
    }
  })

  it('deals each of the 25 primaries exactly once', () => {
    const slugs = DISPOSITIONS.flatMap((you) => DISPOSITIONS.map((opp) => primaryFor(you.id, opp.id)?.slug))
    expect(slugs.every(Boolean)).toBe(true)
    expect(new Set(slugs).size).toBe(25)
  })

  it('reads one row in the matrix order, localized', () => {
    const row = primaryRow('priority-assets', 'ru')
    expect(row.map((c) => c.opponent.id)).toEqual(DISPOSITIONS.map((d) => d.id))
    expect(row.every((c) => c.mission?.nameRu)).toBe(true)
  })
})

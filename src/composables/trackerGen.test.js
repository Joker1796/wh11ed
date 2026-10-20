import { describe, expect, it } from 'vitest'
import { TRACKER_GEN, SITE_GENS, genOf, playableHere, siteOfGen } from './trackerGen.js'

describe('trackerGen', () => {
  it('a game without a generation is the first tracker’s', () => {
    expect(genOf({})).toBe(1)
    expect(genOf(null)).toBe(1)
    expect(genOf({ trackerGen: 2 })).toBe(2)
  })

  it('a later tracker’s game is not played here, an earlier one is', () => {
    expect(playableHere({ trackerGen: TRACKER_GEN })).toBe(true)
    expect(playableHere({})).toBe(true)
    expect(playableHere({ trackerGen: TRACKER_GEN + 1 })).toBe(false)
  })

  // Since 2.10.0 the new tracker is the site's: both generations live on wh-rules.ru, and an older
  // host is an app that has not updated (PartyJoinView says so instead of linking anywhere).
  it('both generations live on the site', () => {
    expect(SITE_GENS.map(siteOfGen)).toEqual(['https://wh-rules.ru', 'https://wh-rules.ru'])
  })
})

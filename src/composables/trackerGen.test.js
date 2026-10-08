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

  it('every generation with a site has its own', () => {
    expect(new Set(SITE_GENS.map(siteOfGen)).size).toBe(SITE_GENS.length)
    expect(siteOfGen(2)).toBe('https://beta.wh-rules.ru')
  })
})

import { describe, it, expect } from 'vitest'
import {
  BATTLE_SIZES, FACTIONS, FACTION_GROUPS, DISPOSITIONS, MIRROR_MISSIONS,
  dispositionName, detachmentsFor, detachmentInfo,
  primaryFor, derivePrimary, missionBySlug, scorableBlocks,
  secondaryPool, fixedPool, numericVp,
} from './useTracker.js'

describe('battle sizes', () => {
  it('defines Incursion (2 DP) and Strike Force (3 DP)', () => {
    const byId = Object.fromEntries(BATTLE_SIZES.map(b => [b.id, b]))
    expect(byId.incursion.maxDp).toBe(2)
    expect(byId.strikeForce.maxDp).toBe(3)
    expect(byId.incursion.points).toBe(1000)
    expect(byId.strikeForce.points).toBe(2000)
  })
})

describe('faction groups', () => {
  it('cover every faction exactly once', () => {
    const grouped = FACTION_GROUPS.flatMap(g => g.factions.map(f => f.slug))
    expect(grouped.length).toBe(FACTIONS.length)
    expect(new Set(grouped).size).toBe(FACTIONS.length)   // no duplicates / drops
  })
  it('sort factions alphabetically within each group', () => {
    for (const g of FACTION_GROUPS) {
      const names = g.factions.map(f => f.name)
      expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)))
    }
  })
})

describe('dispositionName', () => {
  it('resolves a known id and returns empty for unknown', () => {
    expect(dispositionName(DISPOSITIONS[0].id)).toBe(DISPOSITIONS[0].name)
    expect(dispositionName('not-a-disposition')).toBe('')
  })
})

describe('mirror missions', () => {
  it('are the five self-vs-self primaries', () => {
    expect(MIRROR_MISSIONS.length).toBe(5)
    for (const m of MIRROR_MISSIONS) expect(m.mirror).toBe(true)
  })
})

describe('primaryFor', () => {
  it('returns the mission whose deck is my disposition', () => {
    const [a, b] = [DISPOSITIONS[0].id, DISPOSITIONS[1].id]
    const m = primaryFor(a, b)
    expect(m).toBeTruthy()
    expect(m.deck).toBe(a)
  })
  it('returns the mirror mission for a self-vs-self matchup', () => {
    const d = DISPOSITIONS[0].id
    expect(primaryFor(d, d).mirror).toBe(true)
  })
})

describe('derivePrimary (twists)', () => {
  const [a, b] = [DISPOSITIONS[0].id, DISPOSITIONS[1].id]
  it('no twist → same as primaryFor', () => {
    expect(derivePrimary(a, b, {}).slug).toBe(primaryFor(a, b).slug)
  })
  it('Scrambled Communications swaps the two players’ primaries', () => {
    const m = derivePrimary(a, b, { twist: 'scrambled-communications' })
    expect(m.slug).toBe(primaryFor(b, a).slug)
  })
  it('Mirrored World forces the chosen shared mission', () => {
    const shared = MIRROR_MISSIONS[2].slug
    expect(derivePrimary(a, b, { twist: 'mirrored-world', twistMission: shared }).slug).toBe(shared)
  })
})

describe('secondary pools', () => {
  it('attacker pool has the 18 secondaries', () => {
    expect(secondaryPool('attacker').length).toBe(18)
  })
  it('fixedPool is the subset that has a Fixed scoring block', () => {
    const pool = fixedPool('attacker')
    expect(pool.length).toBeGreaterThan(0)
    for (const m of pool) expect(m.blocks.some(bl => bl.kind === 'fixed')).toBe(true)
  })
})

describe('missionBySlug & scorableBlocks', () => {
  const slug = primaryFor(DISPOSITIONS[0].id, DISPOSITIONS[1].id).slug
  it('looks up a primary by slug, both locales', () => {
    expect(missionBySlug(slug, null).slug).toBe(slug)
    expect(missionBySlug(slug, null, 'ru').slug).toBe(slug)
    expect(missionBySlug('nope', null)).toBe(null)
  })
  it('round-gates scorable blocks (round 1 ≤ later rounds)', () => {
    const r1 = scorableBlocks(slug, null, 1)
    const r5 = scorableBlocks(slug, null, 5)
    expect(Array.isArray(r1)).toBe(true)
    expect(r1.length).toBeLessThanOrEqual(r5.length)
  })
})

describe('numericVp', () => {
  it('reads numbers and +N strings', () => {
    expect(numericVp(5)).toBe(5)
    expect(numericVp('+3')).toBe(3)
    expect(numericVp('nan')).toBe(0)
  })
})

describe('detachments lookup', () => {
  it('detachmentInfo finds a detachment of a faction that has them', () => {
    const withDet = FACTIONS.find(f => detachmentsFor(f.slug).length > 0)
    const det = detachmentsFor(withDet.slug)[0]
    expect(detachmentInfo(withDet.slug, det.name)).toMatchObject({ name: det.name })
    expect(typeof det.dp).toBe('number')
  })
})

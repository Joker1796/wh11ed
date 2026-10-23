import { describe, it, expect } from 'vitest'
import { missions } from '../data/missions.js'
import {
  BATTLE_SIZES, DISPOSITIONS, MIRROR_MISSIONS, battleOf, battleName, byCount,
  dispositionName,
  primaryFor, derivePrimary, missionBySlug, scorableBlocks, cardBlocks, blockRounds,
  secondaryPool, fixedPool, numericVp, sideName,
} from './useTracker.js'
import { FACTIONS, FACTION_GROUPS, detachmentsFor, detachmentInfo } from './trackerFactions.js'

describe('battle sizes', () => {
  it('defines Incursion (2 DP) and Strike Force (3 DP)', () => {
    const byId = Object.fromEntries(BATTLE_SIZES.map(b => [b.id, b]))
    expect(byId.incursion.maxDp).toBe(2)
    expect(byId.strikeForce.maxDp).toBe(3)
    expect(byId.incursion.points).toBe(1000)
    expect(byId.strikeForce.points).toBe(2000)
  })
})

// A size of the players' own (owner, 2026-10-23). What it does not set follows the printed size its
// points fall within — the army-rule counters are keyed by that one.
describe('battleOf', () => {
  it('reads a printed size whole, with two secondaries', () => {
    expect(battleOf({ battleSize: 'incursion' })).toMatchObject({ id: 'incursion', points: 1000, maxDp: 2, secondaries: 2, base: 'incursion', custom: false, known: true })
    expect(battleOf({})).toMatchObject({ id: 'strikeForce', known: false })
  })
  it('borrows the size the custom points fall within', () => {
    expect(battleOf({ battleSize: 'custom', custom: { points: 750 } })).toMatchObject({ base: 'incursion', maxDp: 2, secondaries: 2, points: 750 })
    expect(battleOf({ battleSize: 'custom', custom: { points: 1500 } })).toMatchObject({ base: 'strikeForce', maxDp: 3 })
    expect(battleOf({ battleSize: 'custom', custom: { points: 2500 } }).base).toBe('onslaught')
    expect(battleOf({ battleSize: 'custom', custom: { points: 5000 } }).base).toBe('onslaught')
  })
  it('takes the players\' own numbers, and drops one out of range', () => {
    const b = battleOf({ battleSize: 'custom', custom: { points: 750, dp: 1, secondaries: 1 } })
    expect(b).toMatchObject({ points: 750, maxDp: 1, secondaries: 1, custom: true })
    expect(battleOf({ battleSize: 'custom', custom: { points: 750, dp: 9, secondaries: 4 } })).toMatchObject({ maxDp: 2, secondaries: 2 })
    expect(battleOf({ battleSize: 'custom', custom: null }).points).toBe(1000)
  })
  it('names a custom size by its points', () => {
    expect(battleName({ battleSize: 'custom', custom: { points: 750 } }, 'Custom')).toBe('Custom · 750')
    expect(battleName({ battleSize: 'onslaught' }, 'Custom')).toBe('Onslaught')
    expect(battleName({}, 'Custom')).toBe('')
  })
  it('counts cards in the one-card form for one', () => {
    const l = { k: 'Взять {n} вторички', kOne: 'Взять 1 вторичку' }
    expect([1, 2, 3].map((n) => byCount(l, 'k', n))).toEqual(['Взять 1 вторичку', 'Взять 2 вторички', 'Взять 3 вторички'])
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

describe('sideName', () => {
  const labels = { trackerYou: 'You', trackerOpponent: 'Opponent' }
  it("uses the side's own name first", () => {
    expect(sideName({ name: 'Anna', isYou: false }, 0, labels)).toBe('Anna')
  })
  it('falls back to You / Opponent by the isYou flag', () => {
    expect(sideName({ isYou: false }, 0, labels)).toBe('Opponent')
    expect(sideName({ isYou: true }, 1, labels)).toBe('You')
  })
  // Games saved before `isYou` existed: the first player was the device's owner.
  it('reads an old game without the flag by position', () => {
    expect(sideName({}, 0, labels)).toBe('You')
    expect(sideName({}, 1, labels)).toBe('Opponent')
  })
})

// The scoring dialogs show a mission's whole card (cardBlocks): every block, in every round, those
// that cannot score in it marked — and the moment-bound callers (scorableBlocks) get exactly the
// unmarked ones. Every primary and secondary, both roles, all five rounds.
describe('cardBlocks — the whole card, in every round', () => {
  it('carries every block, marks the off-round ones, and scorableBlocks is the rest', () => {
    const wrong = []
    for (const m of [...missions.en.primary, ...missions.en.secondary]) {
      const role = m.type === 'secondary' ? m.role : null
      for (let round = 1; round <= 5; round++) {
        const all = cardBlocks(m.slug, role, round, 'ru')
        if (all.length !== m.blocks.length) wrong.push(`${m.slug} r${round}: ${all.length}/${m.blocks.length}`)
        all.forEach((b, i) => {
          const off = !(m.blocks[i].rounds || blockRounds(m.blocks[i].heading)).includes(round)
          if (b.offRound !== off) wrong.push(`${m.slug} r${round} block ${i}`)
        })
        const scorable = scorableBlocks(m.slug, role, round, 'ru').map((b) => b.bi)
        if (JSON.stringify(scorable) !== JSON.stringify(all.filter((b) => !b.offRound).map((b) => b.bi))) wrong.push(`${m.slug} r${round} scorable`)
      }
    }
    expect(wrong).toEqual([])
  })
})

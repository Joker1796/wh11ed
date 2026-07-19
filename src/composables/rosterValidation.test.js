import { describe, it, expect } from 'vitest'
import { validateRoster, duplicateLimit } from './rosterValidation.js'

// ── Fixtures ──
const core = {
  battleSizes: [
    { id: 'incursion', name: 'Incursion', points: 1000, dp: 2, enhLimit: 2, dupLimit: 2 },
    { id: 'strike-force', name: 'Strike Force', points: 2000, dp: 3, enhLimit: 4, dupLimit: 3 },
  ],
}

const captain = { id: 'captain', name: 'Captain', kws: ['Character', 'Infantry'], flags: { char: 1 }, sizes: [{ pts: 85, per: [1, 1], default: 1 }] }
const lt = { id: 'lieutenant', name: 'Lieutenant', kws: ['Character', 'Infantry'], flags: { char: 1 }, sizes: [{ pts: 70, per: [1, 1], default: 1 }], leads: [{ to: 'intercessor-squad' }] }
const chaplain = { id: 'chaplain', name: 'Chaplain', kws: ['Character', 'Infantry'], flags: { char: 1 }, sizes: [{ pts: 75, per: [1, 1], default: 1 }] }
const marneus = { id: 'marneus', name: 'Marneus Calgar', kws: ['Character', 'Epic Hero'], flags: { char: 1, epic: 1 }, sizes: [{ pts: 185, per: [1, 1], default: 1 }] }
const intercessor = { id: 'intercessor-squad', name: 'Intercessor Squad', kws: ['Battleline', 'Infantry'], flags: {}, sizes: [{ pts: 80, per: [5, 5], default: 1 }] }
const dread = { id: 'ballistus-dreadnought', name: 'Ballistus Dreadnought', kws: ['Vehicle'], flags: {}, sizes: [{ pts: 140, per: [1, 1], default: 1 }] }

const detachment = {
  sid: 'det-1', name: 'Gladius', dp: 0,
  enhancements: [
    { name: 'Artificer Armour', pts: 15, type: 'miniature', req: [{ kw: ['Infantry'] }] },
    { name: 'Fire Discipline', pts: 10, type: 'miniature', req: [{ kw: ['Infantry'] }] },
    { name: 'Adept of the Codex', pts: 25, type: 'miniature', req: [{ kw: ['Infantry'] }] },
    { name: 'Free Upgrade', pts: 0, type: 'upgrade', uncounted: 1, req: [{ kw: ['Infantry'] }] },
  ],
  excludedUnits: [],
}

const faction = { slug: 'space-marines', units: [captain, lt, chaplain, marneus, intercessor, dread], detachments: [detachment] }

function roster(over = {}) {
  return {
    faction: 'space-marines', detachments: ['Gladius'], battleSize: 'strike-force',
    units: [], ...over,
  }
}
const U = (id, extra = {}) => ({ uid: `${id}-${Math.random().toString(36).slice(2, 6)}`, id, size: 0, ...extra })
const codes = (r) => validateRoster(r, { faction, core }).issues.map((i) => i.code)

describe('duplicateLimit', () => {
  it('epic heroes are capped at 1; battleline/transport double; others use the base', () => {
    expect(duplicateLimit(marneus, 3)).toBe(1)
    expect(duplicateLimit(intercessor, 3)).toBe(6)
    expect(duplicateLimit({ kws: ['Dedicated Transport'], flags: {} }, 3)).toBe(6)
    expect(duplicateLimit(captain, 3)).toBe(3)
  })
})

describe('validateRoster — completeness', () => {
  it('warns when faction or detachment is missing', () => {
    expect(codes({ ...roster(), faction: null })).toContain('noFaction')
    expect(codes({ ...roster(), detachments: [] })).toContain('noDetachment')
  })
})

describe('validateRoster — custom battle size + DP budget', () => {
  it('uses the custom points total as the limit', () => {
    const units = [U('captain', { warlord: true }), ...Array.from({ length: 6 }, () => U('intercessor-squad'))] // 6×80+85=565
    const r = { ...roster({ units }), battleSize: 'custom', customPoints: 500 }
    expect(codes(r)).toContain('overPoints')
    const r2 = { ...roster({ units }), battleSize: 'custom', customPoints: 1000 }
    expect(codes(r2)).not.toContain('overPoints')
  })
  it('flags exceeding the Detachment-Points budget', () => {
    const det2 = { sid: 'det-2', name: 'Pricey', dp: 4, enhancements: [] } // > Strike Force dp 3
    const f = { ...faction, detachments: [detachment, det2] }
    const r = roster({ units: [U('captain', { warlord: true })] })
    r.detachments = ['Gladius', 'Pricey']
    expect(validateRoster(r, { faction: f, core }).issues.map((i) => i.code)).toContain('overDp')
  })
})

describe('validateRoster — points limit', () => {
  it('errors when over the battle-size limit', () => {
    const many = Array.from({ length: 25 }, () => U('intercessor-squad')) // 25×80 = 2000, +warlord over
    many[0].warlord = true
    const r = roster({ units: [U('captain', { warlord: true }), ...many] })
    const res = validateRoster(r, { faction, core })
    expect(res.points).toBeGreaterThan(2000)
    expect(res.issues.map((i) => i.code)).toContain('overPoints')
  })
})

describe('validateRoster — duplicates', () => {
  it('flags a 7th Battleline squad (limit 3×2=6)', () => {
    const units = [U('captain', { warlord: true }), ...Array.from({ length: 7 }, () => U('intercessor-squad'))]
    expect(codes(roster({ units }))).toContain('overDuplicate')
  })
  it('allows 6 Battleline squads', () => {
    const units = [U('captain', { warlord: true }), ...Array.from({ length: 6 }, () => U('intercessor-squad'))]
    expect(codes(roster({ units }))).not.toContain('overDuplicate')
  })
  it('flags a 4th non-battleline unit at Strike Force (limit 3)', () => {
    const units = [U('captain', { warlord: true }), ...Array.from({ length: 4 }, () => U('ballistus-dreadnought'))]
    expect(codes(roster({ units }))).toContain('overDuplicate')
  })
})

describe('validateRoster — warlord', () => {
  it('requires exactly one warlord', () => {
    expect(codes(roster({ units: [U('captain')] }))).toContain('noWarlord')
    expect(codes(roster({ units: [U('captain', { warlord: true }), U('lieutenant', { warlord: true })] }))).toContain('manyWarlords')
    expect(codes(roster({ units: [U('captain', { warlord: true })] }))).not.toContain('noWarlord')
  })
  it('flags an ineligible warlord', () => {
    expect(codes(roster({ units: [U('intercessor-squad', { warlord: true })] }))).toContain('warlordIneligible')
  })
  it('warns when a mandatory warlord is not the chosen one', () => {
    const det = { ...detachment, mandWarlord: 'marneus' }
    const f = { ...faction, detachments: [det] }
    const r = roster({ units: [U('captain', { warlord: true })] })
    expect(validateRoster(r, { faction: f, core }).issues.map((i) => i.code)).toContain('mandatoryWarlord')
  })
})

describe('validateRoster — enhancements', () => {
  it('flags the same enhancement used twice', () => {
    const units = [U('captain', { warlord: true, enh: 'Artificer Armour' }), U('lieutenant', { enh: 'Artificer Armour' })]
    expect(codes(roster({ units }))).toContain('dupEnh')
  })
  it('enforces the enhancement limit, excluding uncounted upgrades', () => {
    const inc = (units) => validateRoster({ ...roster({ units }), battleSize: 'incursion' }, { faction, core }).issues.map((i) => i.code)
    // Incursion enhLimit = 2. Two counted + one uncounted (Free Upgrade) → within the limit.
    expect(inc([
      U('captain', { warlord: true, enh: 'Artificer Armour' }),
      U('lieutenant', { enh: 'Fire Discipline' }),
      U('chaplain', { enh: 'Free Upgrade' }),
    ])).not.toContain('overEnhLimit')
    // Three counted enhancements → over the limit of 2.
    expect(inc([
      U('captain', { warlord: true, enh: 'Artificer Armour' }),
      U('lieutenant', { enh: 'Fire Discipline' }),
      U('chaplain', { enh: 'Adept of the Codex' }),
    ])).toContain('overEnhLimit')
  })
  it('flags an enhancement on an ineligible unit', () => {
    // Ballistus Dreadnought is not a Character → ineligible for a character enhancement.
    const units = [U('captain', { warlord: true }), U('ballistus-dreadnought', { enh: 'Artificer Armour' })]
    expect(codes(roster({ units }))).toContain('enhIneligible')
  })
})

describe('validateRoster — leaders', () => {
  it('warns when a leader is attached to a unit it cannot join', () => {
    const bad = U('captain') // captain has no leads
    const leader = U('lieutenant', { leaderOf: bad.uid })
    // lieutenant leads intercessor-squad, not captain → invalid target
    expect(codes(roster({ units: [U('captain', { warlord: true }), bad, leader] }))).toContain('leaderTargetInvalid')
  })
  it('accepts a valid leader attachment', () => {
    const squad = U('intercessor-squad')
    const leader = U('lieutenant', { leaderOf: squad.uid })
    expect(codes(roster({ units: [U('captain', { warlord: true }), squad, leader] }))).not.toContain('leaderTargetInvalid')
  })
})

describe('validateRoster — detachment exclusions', () => {
  it('flags a datasheet the detachment forbids', () => {
    const det = { ...detachment, excludedUnits: ['ballistus-dreadnought'] }
    const f = { ...faction, detachments: [det] }
    const r = roster({ units: [U('captain', { warlord: true }), U('ballistus-dreadnought')] })
    expect(validateRoster(r, { faction: f, core }).issues.map((i) => i.code)).toContain('unitExcluded')
  })
})

describe('validateRoster — a clean list', () => {
  it('reports no errors', () => {
    const units = [
      U('captain', { warlord: true, enh: 'Artificer Armour' }),
      U('intercessor-squad'),
      U('intercessor-squad'),
    ]
    const res = validateRoster(roster({ units }), { faction, core })
    expect(res.errorCount).toBe(0)
  })
})

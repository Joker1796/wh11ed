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
const lt = { id: 'lieutenant', name: 'Lieutenant', kws: ['Character', 'Infantry'], flags: { char: 1 }, sizes: [{ pts: 70, per: [1, 1], default: 1 }], leads: [{ to: 'intercessor-squad', type: 'leader' }] }
// A Character whose own core ability is titled "Support" rather than "Leader" — an independent
// attachment slot alongside a Leader on the same target (see rosterEngine.js leaderTargetsFor).
const chaplain = { id: 'chaplain', name: 'Chaplain', kws: ['Character', 'Infantry'], flags: { char: 1 }, sizes: [{ pts: 75, per: [1, 1], default: 1 }], leads: [{ to: 'intercessor-squad', type: 'support' }] }
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

describe('validateRoster — wargear pick limits', () => {
  // "Up to 2 at 5 models, up to 4 at 10", with at most 2 of a kind.
  const squad = {
    id: 'squad', name: 'Squad', kws: ['Infantry'], flags: {},
    sizes: [{ pts: 100, per: [5, 5], default: 1 }, { pts: 200, per: [10, 10] }],
    gear: [{ m: 0, t: 1, in: 'stepper', o: [[1], [2]], lim: [[0, 2, 2], [10, 4, 2]] }],
  }
  const f = { ...faction, units: [...faction.units, squad] }
  const check = (r) => validateRoster(r, { faction: f, core }).issues

  it('says nothing while the picks fit the unit\u2019s size', () => {
    const u = U('squad', { size: 1, wg: [[0, 0, 2], [0, 1, 2]] }) // 4 picks in a 10-model squad
    expect(check(roster({ units: [{ ...u, warlord: true }] })).map((i) => i.code)).not.toContain('overWargearLimit')
  })

  it('flags a list that shrank out of its own allowance', () => {
    // The editor caps as you click, so this is reachable only by dropping the size afterwards.
    const u = U('squad', { size: 0, wg: [[0, 0, 2], [0, 1, 2]] }) // 4 picks, but only 2 allowed at 5
    const iss = check(roster({ units: [{ ...u, warlord: true }] })).find((i) => i.code === 'overWargearLimit')
    expect(iss).toBeTruthy()
    expect(iss.params).toMatchObject({ count: 4, limit: 2 })
    expect(iss.uid).toBe(u.uid)
  })

  it('caps an uncapped group by the profile it belongs to', () => {
    // No wargear_limit for this one, so the ceiling is the number of models that can take it —
    // the rank-and-file profile, not the squad (a 10-model unit with one leader allows 9).
    const troop = {
      id: 'troop', name: 'Troop', kws: ['Infantry'], flags: {},
      minis: [{ n: 'Sergeant' }, { n: 'Trooper' }],
      sizes: [{ pts: 100, per: [10, 10], default: 1, comp: [[0, 1], [1, 9]] }],
      gear: [{ m: 1, t: 1, in: 'stepper', o: [[1]] }],
    }
    const ff = { ...faction, units: [...faction.units, troop] }
    const run = (wg) => validateRoster(roster({ units: [{ ...U('troop', { size: 0, wg }), warlord: true }] }), { faction: ff, core })
      .issues.filter((i) => i.code === 'overWargearLimit')
    expect(run([[0, 0, 9]])).toHaveLength(0)
    expect(run([[0, 0, 10]])[0].params).toMatchObject({ count: 10, limit: 9 })
  })

  it('flags too many of the same option separately from the total', () => {
    const u = U('squad', { size: 1, wg: [[0, 0, 3]] }) // 3 of a kind, cap 2 — total 3 is under 4
    const codes2 = check(roster({ units: [{ ...u, warlord: true }] })).map((i) => i.code)
    expect(codes2).toContain('overWargearDup')
    expect(codes2).not.toContain('overWargearLimit')
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
  it('caps two different ids sharing a charId together, as one Epic Hero slot', () => {
    // A hypothetical second datasheet for the same named character (see rosterEngine.js's
    // capKeyOf) — no current faction has this, but the grouping must still cap them as one.
    const titusA = { id: 'captain-titus', charId: 'titus', name: 'Captain Titus', kws: ['Character', 'Epic Hero'], flags: { char: 1, epic: 1 }, sizes: [{ pts: 100, per: [1, 1], default: 1 }] }
    const titusB = { id: 'lieutenant-titus', charId: 'titus', name: 'Lieutenant Titus', kws: ['Character', 'Epic Hero'], flags: { char: 1, epic: 1 }, sizes: [{ pts: 90, per: [1, 1], default: 1 }] }
    const f = { ...faction, units: [...faction.units, titusA, titusB] }
    const oneEach = [U('captain', { warlord: true }), U('captain-titus'), U('lieutenant-titus')]
    expect(validateRoster(roster({ units: oneEach }), { faction: f, core }).issues.map((i) => i.code)).toContain('overDuplicate')
    const justOne = [U('captain', { warlord: true }), U('captain-titus')]
    expect(validateRoster(roster({ units: justOne }), { faction: f, core }).issues.map((i) => i.code)).not.toContain('overDuplicate')
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
    const det = { ...detachment, mandWarlord: ['marneus'] }
    const f = { ...faction, detachments: [det] }
    const r = roster({ units: [U('captain', { warlord: true })] })
    expect(validateRoster(r, { faction: f, core }).issues.map((i) => i.code)).toContain('mandatoryWarlord')
  })
  it('accepts either of a detachment\'s several mandatory-warlord candidates (Aeldari-style OR)', () => {
    const det = { ...detachment, mandWarlord: ['marneus', 'lieutenant'] }
    const f = { ...faction, detachments: [det] }
    // Neither candidate chosen (captain is warlord instead) — still flagged.
    expect(validateRoster(roster({ units: [U('captain', { warlord: true }), U('lieutenant')] }), { faction: f, core }).issues.map((i) => i.code)).toContain('mandatoryWarlord')
    // The SECOND candidate (lieutenant) chosen — no longer flagged, since it's a valid alternative.
    expect(validateRoster(roster({ units: [U('lieutenant', { warlord: true }), U('captain')] }), { faction: f, core }).issues.map((i) => i.code)).not.toContain('mandatoryWarlord')
  })

  // Supreme Commander: "if this model is in your army, it must be your Warlord" — a hard rule,
  // distinct from the detachment-level mandatory pick above. Two Supreme-Commander-flagged units
  // in the same roster (e.g. Belisarius Cawl + Thulia Ghuld) can never both be satisfied.
  it('requires a Supreme Commander unit to be the Warlord', () => {
    const supreme = { id: 'marneus-supreme', name: 'Roboute Guilliman', kws: ['Character', 'Epic Hero'], flags: { char: 1, epic: 1, supreme: 1 }, sizes: [{ pts: 195, per: [1, 1] }] }
    const f = { ...faction, units: [...faction.units, supreme] }
    // Present but not warlord — flagged even though a (different) warlord is set.
    const r1 = roster({ units: [U('captain', { warlord: true }), U('marneus-supreme')] })
    expect(validateRoster(r1, { faction: f, core }).issues.map((i) => i.code)).toContain('supremeCommanderNotWarlord')
    // Present AND warlord — not flagged.
    const r2 = roster({ units: [U('marneus-supreme', { warlord: true })] })
    expect(validateRoster(r2, { faction: f, core }).issues.map((i) => i.code)).not.toContain('supremeCommanderNotWarlord')
  })
  it('flags two different Supreme Commander units as an unresolvable conflict', () => {
    const s1 = { id: 's1', name: 'Belisarius Cawl', kws: ['Character'], flags: { char: 1, supreme: 1 }, sizes: [{ pts: 195, per: [1, 1] }] }
    const s2 = { id: 's2', name: 'Thulia Ghuld', kws: ['Character'], flags: { char: 1, supreme: 1 }, sizes: [{ pts: 90, per: [1, 1] }] }
    const f = { ...faction, units: [...faction.units, s1, s2] }
    const r = roster({ units: [U('s1', { warlord: true }), U('s2')] })
    expect(validateRoster(r, { faction: f, core }).issues.map((i) => i.code)).toContain('supremeCommanderConflict')
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
  it('allows an "(Upgrade)" enhancement on several units, up to its own limit', () => {
    const det2 = { ...detachment, enhancements: [...detachment.enhancements, { name: 'Enlivened Sentinels', pts: 20, type: 'upgrade', limit: 3, req: [{ kw: ['Infantry'] }] }] }
    const f = { ...faction, detachments: [det2] }
    const withDet2 = (units) => validateRoster(roster({ units }), { faction: f, core }).issues.map((i) => i.code)
    // 3 units sharing the same "(Upgrade)" enhancement — within its own limit of 3.
    expect(withDet2([
      U('captain', { warlord: true, enh: 'Enlivened Sentinels' }),
      U('lieutenant', { enh: 'Enlivened Sentinels' }),
      U('chaplain', { enh: 'Enlivened Sentinels' }),
    ])).not.toContain('dupEnh')
    // A 4th unit with it exceeds the limit of 3.
    expect(withDet2([
      U('captain', { warlord: true, enh: 'Enlivened Sentinels' }),
      U('lieutenant', { enh: 'Enlivened Sentinels' }),
      U('chaplain', { enh: 'Enlivened Sentinels' }),
      U('marneus', { enh: 'Enlivened Sentinels' }),
    ])).toContain('dupEnh')
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
  it('flags a second leader attached to a unit that already has one', () => {
    const squad = U('intercessor-squad')
    const leader1 = U('lieutenant', { leaderOf: squad.uid })
    const leader2 = U('lieutenant', { leaderOf: squad.uid })
    expect(codes(roster({ units: [U('captain', { warlord: true }), squad, leader1, leader2] }))).toContain('manyLeaders')
  })
  it('does not flag a Leader and a Support both attached to the same unit — independent slots', () => {
    const squad = U('intercessor-squad')
    const leader = U('lieutenant', { leaderOf: squad.uid })
    const support = U('chaplain', { leaderOf: squad.uid })
    expect(codes(roster({ units: [U('captain', { warlord: true }), squad, leader, support] }))).not.toContain('manyLeaders')
  })
  it('flags a second Support attached to a unit that already has one', () => {
    const squad = U('intercessor-squad')
    const support1 = U('chaplain', { leaderOf: squad.uid })
    const support2 = U('chaplain', { leaderOf: squad.uid })
    expect(codes(roster({ units: [U('captain', { warlord: true }), squad, support1, support2] }))).toContain('manyLeaders')
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

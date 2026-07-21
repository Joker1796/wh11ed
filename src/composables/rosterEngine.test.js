import { describe, it, expect } from 'vitest'
import { bucketOf, unitBasePoints, unitWargearPoints, unitPoints, rosterPoints, canBeWarlord, enhEligible, enhOptionsFor, mandatoryEnhancementFor, enhancementPoints, findEnhancement, effectiveBattle } from './rosterEngine.js'

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

describe('unitWargearPoints', () => {
  // gear group option = [itemId, pts?, def?]. A paid add-on (def 0) charges; a free swap or a
  // default-selected paid option does not.
  const crisis = {
    id: 'crisis',
    sizes: [{ pts: 130, per: [3, 3], default: 1 }],
    gear: [
      { m: 0, t: 1, in: 'stepper', o: [[10, 5]] },        // Missile pod +5, def 0 → charges
      { m: 0, t: 2, in: 'checkbox', o: [[11], [12, 5, 1]] }, // free swap; +5 but default → no charge
    ],
  }
  it('charges paid non-default selections by count', () => {
    expect(unitWargearPoints(crisis, { wg: [[0, 0, 2]] })).toBe(10) // 2× Missile pod
  })
  it('ignores free swaps and default-selected paid options', () => {
    expect(unitWargearPoints(crisis, { wg: [[1, 0, 1], [1, 1, 1]] })).toBe(0)
  })
  it('is safe with no selections', () => {
    expect(unitWargearPoints(crisis, {})).toBe(0)
    expect(unitWargearPoints(crisis, { wg: [] })).toBe(0)
  })
  it('folds wargear into unitPoints', () => {
    expect(unitPoints(crisis, { size: 0, wg: [[0, 0, 1]] }, 1)).toBe(135)
  })
})

describe('canBeWarlord', () => {
  it('allows characters, bars flagged units and non-characters', () => {
    expect(canBeWarlord(captain)).toBe(true)
    expect(canBeWarlord(epic)).toBe(true)
    expect(canBeWarlord(intercessor)).toBe(false)
    expect(canBeWarlord({ flags: { char: 1, noWarlord: 1 } })).toBe(false)
    expect(canBeWarlord({ flags: { nonCharWarlordOk: 1 } })).toBe(true)
  })
})

describe('enhEligible', () => {
  const officerInf = { flags: { char: 1 }, kws: ['Officer', 'Infantry'] }
  it('requires a character unless flagged non-character', () => {
    const enh = { name: 'E' }
    expect(enhEligible(enh, officerInf)).toBe(true)
    expect(enhEligible(enh, intercessor)).toBe(false)
    expect(enhEligible({ name: 'E', nonCharOk: 1 }, intercessor)).toBe(true)
  })
  it('bars epic heroes and enhancement-excluded units unless flagged', () => {
    expect(enhEligible({ name: 'E' }, epic)).toBe(false)
    expect(enhEligible({ name: 'E', epicOk: 1 }, epic)).toBe(true)
    expect(enhEligible({ name: 'E' }, { flags: { char: 1, noEnh: 1 } })).toBe(false)
  })
  it('honours required-keyword OR-groups and excluded keywords', () => {
    expect(enhEligible({ name: 'E', req: [{ kw: ['Officer', 'Infantry'] }] }, officerInf)).toBe(true)
    expect(enhEligible({ name: 'E', req: [{ kw: ['Mounted'] }] }, officerInf)).toBe(false)
    expect(enhEligible({ name: 'E', req: [{ fac: ['Adeptus Astartes'] }] }, officerInf)).toBe(true) // faction gate ok
    expect(enhEligible({ name: 'E', exclKw: ['Infantry'] }, officerInf)).toBe(false)
  })
  // A tiny few enhancements (Necrons' Pantheon of Woe, Imperial Agents' Veiled Blade Elim.
  // Force — see gen-roster-data.mjs ENH_REQ_FIXES) are locked to one exact datasheet by name
  // rather than a general Character/Epic-Hero pool, so they should be pickable on that unit
  // even when it's otherwise noEnh/epic-without-epicOk-gated — but only THAT unit.
  it('lets a unit-locked enhancement override noEnh/epic gates, but only for the named unit', () => {
    const ctan = { name: "Transcendent C'tan", kws: ["Transcendent C'tan", 'Character'], flags: { char: 1, noEnh: 1 } }
    const namedShard = { name: 'C’tan Shard of the Deceiver', kws: ['Character', 'Epic Hero'], flags: { char: 1, epic: 1 } }
    const lockedEnh = { name: 'Reletavistic Tether', req: [{ kw: ["Transcendent C'tan"] }] }
    expect(enhEligible(lockedEnh, ctan)).toBe(true) // bypasses noEnh
    expect(enhEligible(lockedEnh, namedShard)).toBe(false) // not this unit — normal gates apply, and fail
    expect(enhEligible({ ...lockedEnh, exclKw: ["Transcendent C'tan"] }, ctan)).toBe(false) // still honours exclKw
  })
})

describe('enhancementPoints / unitPoints with enhancement', () => {
  const dets = [
    { name: 'A', enhancements: [{ name: 'Artificer Armour', pts: 15 }, { name: 'Free', pts: 0 }] },
    { name: 'B', enhancements: [{ name: 'Master-crafted', pts: 20 }] },
  ]
  it('finds and costs an enhancement across selected detachments', () => {
    expect(findEnhancement(dets, 'Master-crafted')?.pts).toBe(20)
    expect(enhancementPoints(dets, { enh: 'Artificer Armour' })).toBe(15)
    expect(enhancementPoints(dets, { enh: 'Master-crafted' })).toBe(20)
    expect(enhancementPoints(dets, {})).toBe(0)
    expect(unitPoints(captain, { size: 0, enh: 'Master-crafted' }, 1, dets)).toBe(105)
  })
})

// Necrons' Pantheon of Woe / Imperial Agents' Veiled Blade Elim. Force: "each <unit> ... has the
// relevant ability ... you must increase the points cost" — automatic and non-optional, not a
// once-per-army pick (see gen-roster-data.mjs ENH_REQ_FIXES, rosterEngine.js mandatoryEnhancementFor).
describe('mandatory enhancements', () => {
  const ctan = { name: "Transcendent C'tan", kws: ["Transcendent C'tan", 'Character'], flags: { char: 1, noEnh: 1 }, sizes: [{ pts: 340, per: [1, 1] }] }
  const otherShard = { name: 'C’tan Shard of the Deceiver', kws: ['Character', 'Epic Hero'], flags: { char: 1, epic: 1 }, sizes: [{ pts: 330, per: [1, 1] }] }
  const dets = [{ name: 'Pantheon of Woe', enhancements: [
    { name: 'Reletavistic Tether', pts: 40, mandatory: 1, req: [{ kw: ["Transcendent C'tan"] }] },
  ] }]

  it('mandatoryEnhancementFor finds the one locked to this exact unit, not any other', () => {
    expect(mandatoryEnhancementFor(ctan, dets)?.name).toBe('Reletavistic Tether')
    expect(mandatoryEnhancementFor(otherShard, dets)).toBeNull()
    expect(mandatoryEnhancementFor(ctan, [])).toBeNull()
  })

  it('enhancementPoints/unitPoints apply it automatically, without entry.enh', () => {
    expect(enhancementPoints(dets, {}, ctan)).toBe(40)
    expect(enhancementPoints(dets, {}, otherShard)).toBe(0)
    expect(unitPoints(ctan, { size: 0 }, 1, dets)).toBe(380) // 340 base + 40 mandatory
  })

  it('an explicit entry.enh still wins over the mandatory fallback', () => {
    const detsWithChoice = [...dets, { name: 'Other', enhancements: [{ name: 'Free', pts: 0 }] }]
    expect(enhancementPoints(detsWithChoice, { enh: 'Free' }, ctan)).toBe(0)
  })

  it('enhOptionsFor still lists a mandatory enhancement (flagged, not filtered out)', () => {
    const opts = enhOptionsFor(ctan, dets, [], null)
    expect(opts).toEqual([{ name: 'Reletavistic Tether', pts: 40, eligible: true, used: false, mandatory: true }])
    // For a unit it isn't locked to, it still appears but ineligible.
    expect(enhOptionsFor(otherShard, dets, [], null)[0].eligible).toBe(false)
  })
})

describe('effectiveBattle', () => {
  const core = { battleSizes: [
    { id: 'incursion', points: 1000, dp: 2, enhLimit: 2, dupLimit: 2 },
    { id: 'strike-force', points: 2000, dp: 3, enhLimit: 4, dupLimit: 3 },
    { id: 'onslaught', points: 3000, dp: 3, enhLimit: 4, dupLimit: 3 },
  ] }
  it('returns the standard bracket', () => {
    expect(effectiveBattle({ battleSize: 'incursion' }, core)).toMatchObject({ points: 1000, dupLimit: 2, custom: false })
  })
  it('derives custom limits from the bracket the points fall into', () => {
    expect(effectiveBattle({ battleSize: 'custom', customPoints: 1500 }, core)).toMatchObject({ points: 1500, enhLimit: 4, dupLimit: 3, custom: true })
    expect(effectiveBattle({ battleSize: 'custom', customPoints: 800 }, core)).toMatchObject({ points: 800, dupLimit: 2, custom: true })
    expect(effectiveBattle({ battleSize: 'custom', customPoints: 5000 }, core)).toMatchObject({ points: 5000, dupLimit: 3, custom: true })
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

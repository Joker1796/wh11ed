import { describe, it, expect } from 'vitest'
import { addUnitEntry, removeUnitEntry, enhAttachOf, leadsFor, splitInstruction, optionItems, optionLabel, wargearNames, wargearGroupCap, wargearGroupSpent, bucketOf, unitBasePoints, unitWargearPoints, unitPoints, rosterPoints, canBeWarlord, enhEligible, enhOptionsFor, mandatoryEnhancementFor, enhancementPoints, findEnhancement, effectiveBattle, leaderTargetsFor, wargearGroupLive, defaultLoadoutLines, modelsPerMini, allegFor, allegKeyword, allegItems, allegSpent, capKeyOf, allySourceOf, usesAllies, allyGroupsFor, sectionsOf } from './rosterEngine.js'

const intercessor = { id: 'intercessor-squad', kws: ['Battleline', 'Infantry'], flags: {}, sizes: [{ pts: 80, per: [5, 5], default: 1 }, { pts: 150, per: [6, 10] }] }
const captain = { id: 'captain', kws: ['Character', 'Infantry'], flags: { char: 1 }, sizes: [{ pts: 85, per: [1, 1], default: 1 }] }
const knight = { id: 'porphyrion', kws: ['Vehicle'], flags: {}, sizes: [{ pts: 725, per: [1, 1], default: 1 }], step: { at: 2, pts: 75 } }
const epic = { id: 'marneus', kws: ['Character', 'Epic Hero'], flags: { char: 1, epic: 1 }, sizes: [{ pts: 95, per: [1, 1] }] }

describe('capKeyOf', () => {
  it('defaults to the datasheet id when charId is absent', () => {
    expect(capKeyOf(captain)).toBe('captain')
    expect(capKeyOf(epic)).toBe('marneus')
  })
  it('groups two different ids under a shared charId', () => {
    const variantA = { id: 'captain-titus', charId: 'titus' }
    const variantB = { id: 'lieutenant-titus', charId: 'titus' }
    expect(capKeyOf(variantA)).toBe('titus')
    expect(capKeyOf(variantA)).toBe(capKeyOf(variantB))
  })
})

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

describe('wargearGroupLive + defaultLoadoutLines with cond/rep', () => {
  // Necron Overlord shape: group 0 (Resurrection Orb, toggle) only on offer once group 1 (the
  // tachyon arrow/blade radio swap) has actually been picked — cond: [siblingGi, activeFlag].
  // Group 1 itself `rep`s both defaults it replaces once chosen.
  const overlord = {
    minis: undefined,
    sizes: [{ pts: 90, per: [1, 1], default: 1 }],
    defaults: [[0, [[1, 1], [2, 1]]]], // [tachyon arrow, overlord's blade]
    gear: [
      { m: 0, t: 1, in: 'checkbox', o: [[3, 15]], cond: [1, 1] }, // orb, +15pts
      { m: 0, t: 2, in: 'checkbox', o: [[4], [5]], rep: [1, 2] }, // staff / voidscythe
    ],
  }
  const items = { 1: 'Tachyon arrow', 2: 'Overlord’s blade', 3: 'Resurrection orb', 4: 'Staff of light', 5: 'Voidscythe' }

  it('gates the dependent group on the sibling having a live deviation', () => {
    expect(wargearGroupLive(overlord, {}, 0)).toBe(false) // no weapon swap yet → orb not on offer
    expect(wargearGroupLive(overlord, { wg: [[1, 0, 1]] }, 0)).toBe(true) // swapped → orb available
    expect(wargearGroupLive(overlord, {}, 1)).toBe(true) // ungated group always live
  })

  it('drops a fully-replaced default from the loadout summary', () => {
    expect(defaultLoadoutLines(overlord, items, { wg: [] })).toEqual([{ mini: '', items: 'Tachyon arrow, Overlord’s blade' }])
    expect(defaultLoadoutLines(overlord, items, { wg: [[1, 0, 1]] })).toEqual([]) // both defaults swapped away
  })

  it('reduces (not just adds to) a partially-replaced per-model default', () => {
    // Necron Warriors shape: 10-model single-mini squad, gauss flayer default, a stepper swap
    // to gauss reaper for N models should read "flayer ×(10-N)", not the untouched default.
    const warriors = {
      minis: undefined,
      sizes: [{ pts: 80, per: [10, 10], default: 1 }],
      defaults: [[0, [[10, 1], [11, 1]]]], // [close combat weapon, gauss flayer]
      gear: [{ m: 0, t: 1, in: 'stepper', o: [[12]], rep: [11] }], // gauss reaper
    }
    const wItems = { 10: 'Close combat weapon', 11: 'Gauss flayer', 12: 'Gauss reaper' }
    expect(defaultLoadoutLines(warriors, wItems, { size: 0, wg: [[0, 0, 3]] }))
      .toEqual([{ mini: '', items: 'Close combat weapon, Gauss flayer ×7' }])
  })

  it('an inert (condition unmet) deviation counts for nothing', () => {
    // Toggle the orb on (group 0), then swap the weapon back to default (drop group 1's entry) —
    // the orb's own wg entry is left in storage but must not count toward points/loadout while
    // its condition is unmet.
    const entry = { wg: [[0, 0, 1]] } // orb "on" with no live weapon swap → cond unmet
    expect(unitWargearPoints(overlord, entry)).toBe(0)
    expect(defaultLoadoutLines(overlord, items, entry)).toEqual([{ mini: '', items: 'Tachyon arrow, Overlord’s blade' }])
  })

  it('counts the same deviation once its condition is met', () => {
    const entry = { wg: [[1, 0, 1], [0, 0, 1]] } // weapon swapped (group 1 live) + orb on
    expect(unitWargearPoints(overlord, entry)).toBe(15)
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

  // Tyranids' "Vanguard Onslaught" detachment lifts Deathleaper's usual cannotBeWarlord bar (see
  // gen-roster-data.mjs's detachment_granted_warlord_miniature read) — a detachment-scoped
  // exception, so it must not apply when that detachment isn't actually selected.
  it('honors a detachment-granted exception to an otherwise-barred unit', () => {
    const deathleaper = { id: 'deathleaper', flags: { noWarlord: 1 } }
    expect(canBeWarlord(deathleaper)).toBe(false)
    expect(canBeWarlord(deathleaper, [{ name: 'Other Detachment' }])).toBe(false)
    expect(canBeWarlord(deathleaper, [{ name: 'Vanguard Onslaught', grantedWarlord: ['deathleaper'] }])).toBe(true)
  })

  // Houndpack Lance: "select three WAR DOG units; those units have the CHARACTER keyword". A
  // Character in every sense the rules use the word, the nomination of a Warlord included — the
  // same grant enhEligible already reads. A unit BARRED from the title stays barred.
  it('accepts a keyword the entry was granted, but does not overrule a bar', () => {
    const karnivore = { id: 'war-dog-karnivore', kws: ['Vehicle', 'War Dog'], flags: {} }
    expect(canBeWarlord(karnivore)).toBe(false)
    expect(canBeWarlord(karnivore, [], ['Character'])).toBe(true)
    expect(canBeWarlord({ flags: { noWarlord: 1 } }, [], ['Character'])).toBe(false)
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
    const ctan = { name: 'Transcendent C’tan', kws: ['Transcendent C’tan', 'Character'], flags: { char: 1, noEnh: 1 } }
    const namedShard = { name: 'C’tan Shard of the Deceiver', kws: ['Character', 'Epic Hero'], flags: { char: 1, epic: 1 } }
    const lockedEnh = { name: 'Reletavistic Tether', req: [{ kw: ['Transcendent C’tan'] }] }
    expect(enhEligible(lockedEnh, ctan)).toBe(true) // bypasses noEnh
    expect(enhEligible(lockedEnh, namedShard)).toBe(false) // not this unit — normal gates apply, and fail
    expect(enhEligible({ ...lockedEnh, exclKw: ['Transcendent C’tan'] }, ctan)).toBe(false) // still honours exclKw
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
// Some enhancements name one specific unit in their prose ("Necron Warriors only") while appdata
// records no unit-specific keyword for them at all, so their generated req — often just the
// faction keyword — would offer them on any Character of that faction. gen-roster-data.mjs's
// hand-curated ENH_LOCK_FIXES pins those to the named datasheet(s) as `lockDs`.
describe('enhEligible — lockDs (curated "specific datasheet only" restriction)', () => {
  const warriors = { sid: 'ds-necron-warriors', name: 'Necron Warriors', kws: ['Character'], flags: { char: 1 } }
  const otherUnit = { sid: 'ds-other', name: 'Immortals', kws: ['Character'], flags: { char: 1 } }
  // Broad keyword req (just the faction) would make this look eligible on ANY Character —
  // lockDs is what actually restricts it to the one named datasheet.
  const enh = { name: 'Enlivened Sentinels', pts: 20, req: [{ fac: ['Necrons'] }], lockDs: ['ds-necron-warriors'] }

  it('is eligible on the locked datasheet, ineligible elsewhere, despite a broad keyword req', () => {
    expect(enhEligible(enh, warriors)).toBe(true)
    expect(enhEligible(enh, otherUnit)).toBe(false)
  })

  it('still respects an excluded keyword on the locked datasheet', () => {
    const excluded = { ...warriors, kws: ['Character', 'Vehicle'] }
    expect(enhEligible({ ...enh, exclKw: ['Vehicle'] }, excluded)).toBe(false)
  })

  it('allows any one of several locked datasheets', () => {
    const multiEnh = { ...enh, lockDs: ['ds-necron-warriors', 'ds-other'] }
    expect(enhEligible(multiEnh, warriors)).toBe(true)
    expect(enhEligible(multiEnh, otherUnit)).toBe(true)
  })
})

// Necrons' Pantheon of Woe / Imperial Agents' Veiled Blade Elim. Force: "each <unit> ... has the
// relevant ability ... you must increase the points cost" — automatic and non-optional, not a
// once-per-army pick (see gen-roster-data.mjs ENH_REQ_FIXES, rosterEngine.js mandatoryEnhancementFor).
describe('mandatory enhancements', () => {
  const ctan = { name: 'Transcendent C’tan', kws: ['Transcendent C’tan', 'Character'], flags: { char: 1, noEnh: 1 }, sizes: [{ pts: 340, per: [1, 1] }] }
  const otherShard = { name: 'C’tan Shard of the Deceiver', kws: ['Character', 'Epic Hero'], flags: { char: 1, epic: 1 }, sizes: [{ pts: 330, per: [1, 1] }] }
  const dets = [{ name: 'Pantheon of Woe', enhancements: [
    { name: 'Reletavistic Tether', pts: 40, mandatory: 1, req: [{ kw: ['Transcendent C’tan'] }] },
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

// "(Upgrade)"-type enhancements (appdata's enhancementType: 'upgrade') explicitly allow several
// units to take the SAME enhancement, per its own `limit` field (gen-roster-data.mjs's
// buildEnhancement carries it through when it's not the default 1) — unlike an ordinary
// enhancement, which caps at 1 per roster.
describe('enhOptionsFor — multi-unit "(Upgrade)" allowance', () => {
  const unitA = { name: 'A', kws: [], flags: {}, sizes: [{ pts: 10, per: [1, 1] }] }
  const dets = [{ name: 'Det', enhancements: [
    { name: 'Enlivened Sentinels', pts: 20, type: 'upgrade', limit: 3 },
    { name: 'Artificer Armour', pts: 15, type: 'miniature' },
  ] }]

  it('stays selectable up to its limit, then flags used', () => {
    const units = [{ uid: 'x', enh: 'Enlivened Sentinels' }, { uid: 'y', enh: 'Enlivened Sentinels' }]
    // 2 other units already have it (limit 3) — a 3rd is still allowed.
    expect(enhOptionsFor(unitA, dets, units, 'z').find((e) => e.name === 'Enlivened Sentinels').used).toBe(false)
    units.push({ uid: 'z2', enh: 'Enlivened Sentinels' })
    // Now 3 other units have it — the limit is reached.
    expect(enhOptionsFor(unitA, dets, units, 'z').find((e) => e.name === 'Enlivened Sentinels').used).toBe(true)
  })

  it('an ordinary enhancement (no limit field) still caps at 1', () => {
    const units = [{ uid: 'x', enh: 'Artificer Armour' }]
    expect(enhOptionsFor(unitA, dets, units, 'z').find((e) => e.name === 'Artificer Armour').used).toBe(true)
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

describe('leaderTargetsFor', () => {
  const squad = { id: 'intercessor-squad', name: 'Intercessor Squad' }
  const leader = { id: 'captain', leads: [{ to: 'intercessor-squad', type: 'leader' }] }
  // A Character whose own core ability is titled "Support" rather than "Leader" — a separate,
  // independent attachment slot on the same target (see DatasheetCard's dsSupport/dsLeader).
  const supporter = { id: 'chronomancer', leads: [{ to: 'intercessor-squad', type: 'support' }] }
  const defs = { 'intercessor-squad': squad, captain: leader, chronomancer: supporter }
  const defOf = (id) => defs[id]

  it('lists roster units this leader can join, excluding itself', () => {
    const units = [
      { uid: 'a', id: 'captain' },
      { uid: 'b', id: 'intercessor-squad' },
    ]
    expect(leaderTargetsFor(leader, units, 'a', defOf)).toEqual([{ uid: 'b', name: 'Intercessor Squad', used: false, type: 'leader' }])
  })

  it('flags a target already claimed by a different entry of the SAME type as used', () => {
    const units = [
      { uid: 'a', id: 'captain' }, // this entry — being edited
      { uid: 'b', id: 'captain', leaderOf: 'c' }, // another leader already attached to the squad
      { uid: 'c', id: 'intercessor-squad' },
    ]
    expect(leaderTargetsFor(leader, units, 'a', defOf)).toEqual([{ uid: 'c', name: 'Intercessor Squad', used: true, type: 'leader' }])
  })

  it('does not flag a target as used against the entry\'s own current attachment', () => {
    const units = [
      { uid: 'a', id: 'captain', leaderOf: 'c' },
      { uid: 'c', id: 'intercessor-squad' },
    ]
    expect(leaderTargetsFor(leader, units, 'a', defOf)).toEqual([{ uid: 'c', name: 'Intercessor Squad', used: false, type: 'leader' }])
  })

  it('a Leader and a Support can both target the same unit without colliding', () => {
    const units = [
      { uid: 'a', id: 'captain' }, // editing this leader entry
      { uid: 'b', id: 'chronomancer', leaderOf: 'c' }, // support already attached
      { uid: 'c', id: 'intercessor-squad' },
    ]
    // The leader-type slot is still free — a support occupying the unit doesn't block a leader.
    expect(leaderTargetsFor(leader, units, 'a', defOf)).toEqual([{ uid: 'c', name: 'Intercessor Squad', used: false, type: 'leader' }])
  })
})

// Regression: appdata's enhancement_bodyguard_group used to be read as a datasheet whitelist and
// emitted as lockDs, which inverted eligibility for all 13 attach-granting enhancements — they
// were offered on the bodyguard unit and refused to the bearer their own prose names. Real data,
// because the point is that the generated file no longer carries that lock.
describe('enhEligible — attach-granting enhancements (regression)', () => {
  it('offers Murdermind to a Cryptek and not to the Destroyers it lets the bearer join', async () => {
    const rf = await import('../data/roster/necrons.js')
    const enh = rf.default.detachments.flatMap((d) => d.enhancements || []).find((e) => e.name === 'Murdermind')
    const unit = (id) => rf.default.units.find((u) => u.id === id)
    expect(enh.lockDs).toBeUndefined()
    expect(enhEligible(enh, unit('chronomancer'))).toBe(true)
    expect(enhEligible(enh, unit('plasmancer'))).toBe(true)
    expect(enhEligible(enh, unit('skorpekh-destroyers'))).toBe(false)
    expect(enhEligible(enh, unit('lokhust-destroyers'))).toBe(false)
  })

  it('offers Slippery Git to the Warboss and not to the Kommandos', async () => {
    const rf = await import('../data/roster/orks.js')
    const enh = rf.default.detachments.flatMap((d) => d.enhancements || []).find((e) => e.name === 'Slippery Git')
    const unit = (id) => rf.default.units.find((u) => u.id === id)
    expect(enhEligible(enh, unit('warboss'))).toBe(true)
    expect(enhEligible(enh, unit('kommandos'))).toBe(false)
  })
})

// An enhancement can GRANT its bearer an attach the datasheet doesn't list — appdata's
// enhancement_bodyguard_group, emitted as `attach` (see gen-roster-data.mjs). 13 game-wide.
describe('enhancement-granted attaches', () => {
  const cryptek = { id: 'cryptek', name: 'Cryptek', kws: ['Character', 'Cryptek'], flags: { char: 1 }, leads: [{ to: 'immortals', type: 'support' }] }
  const dets = [{ name: 'Cursed Legion', enhancements: [{ name: 'Murdermind', pts: 15, attach: [{ to: 'skorpekh-destroyers', type: 'support' }] }] }]
  const units = [
    { uid: 'a', id: 'cryptek' },
    { uid: 'b', id: 'immortals' },
    { uid: 'c', id: 'skorpekh-destroyers' },
  ]
  const defOf = (id) => ({ cryptek, immortals: { id: 'immortals', name: 'Immortals' }, 'skorpekh-destroyers': { id: 'skorpekh-destroyers', name: 'Skorpekh Destroyers' } })[id]

  it('reports nothing without the enhancement', () => {
    expect(enhAttachOf(cryptek, { uid: 'a', id: 'cryptek' }, dets)).toEqual([])
    expect(leadsFor(cryptek, { uid: 'a' }, dets)).toEqual(cryptek.leads)
  })

  it('adds the granted target to the entry\'s leads, keeping the printed ones', () => {
    const withEnh = { uid: 'a', id: 'cryptek', enh: 'Murdermind' }
    expect(leadsFor(cryptek, withEnh, dets).map((l) => l.to)).toEqual(['immortals', 'skorpekh-destroyers'])
  })

  it('widens the attachment picker once the enhancement is taken', () => {
    expect(leaderTargetsFor(cryptek, units, 'a', defOf, dets).map((t) => t.name)).toEqual(['Immortals'])
    const withEnh = [{ ...units[0], enh: 'Murdermind' }, units[1], units[2]]
    expect(leaderTargetsFor(cryptek, withEnh, 'a', defOf, dets).map((t) => t.name))
      .toEqual(['Immortals', 'Skorpekh Destroyers'])
  })

  it('keeps one entry per target so .find() and Map lookups cannot disagree', () => {
    const clash = [{ name: 'D', enhancements: [{ name: 'X', attach: [{ to: 'immortals', type: 'leader' }] }] }]
    const leads = leadsFor(cryptek, { uid: 'a', enh: 'X' }, clash)
    expect(leads.filter((l) => l.to === 'immortals')).toHaveLength(1)
    expect(leads.find((l) => l.to === 'immortals').type).toBe('support') // the printed one
  })

  it('widens it for a real Cryptek taking Murdermind', async () => {
    const rf = await import('../data/roster/necrons.js')
    const det = rf.default.detachments.find((d) => (d.enhancements || []).some((e) => e.name === 'Murdermind'))
    const def = rf.default.units.find((u) => u.id === 'chronomancer')
    const list = [{ uid: 'a', id: 'chronomancer', enh: 'Murdermind' }, { uid: 'b', id: 'skorpekh-destroyers' }]
    const realDefOf = (id) => rf.default.units.find((u) => u.id === id)
    expect(leaderTargetsFor(def, list, 'a', realDefOf, [det]).map((t) => t.name)).toContain('Skorpekh Destroyers')
  })
})

describe('leads restricted to a detachment', () => {
  // appdata states a Chaos Space Marines leader's Pactbound Zealots attachments twice — once
  // required inside it, once excluded outside it — so ignoring both fields happened to give the
  // right list. It only happened to: a one-sided gate would offer an attachment from a detachment
  // the army never took.
  const lord = {
    id: 'chaos-lord',
    name: 'Chaos Lord',
    leads: [
      { to: 'legionaries', type: 'leader', exclDet: 'pz' },
      { to: 'legionaries', type: 'leader', reqDet: 'pz' },
      { to: 'chosen', type: 'leader', reqDet: 'pz' },
    ],
  }
  const pz = { name: 'Pactbound Zealots', sid: 'pz', enhancements: [] }
  const other = { name: 'Renegade Raiders', sid: 'rr', enhancements: [] }

  it('offers a required attachment only inside its own detachment', () => {
    expect(leadsFor(lord, { uid: 'a' }, [pz]).map((l) => l.to)).toEqual(['legionaries', 'chosen'])
    expect(leadsFor(lord, { uid: 'a' }, [other]).map((l) => l.to)).toEqual(['legionaries'])
    expect(leadsFor(lord, { uid: 'a' }, []).map((l) => l.to)).toEqual(['legionaries'])
  })

  it('keeps one entry per target once the pair collapses', () => {
    const leads = leadsFor(lord, { uid: 'a' }, [pz])
    expect(leads.filter((l) => l.to === 'legionaries')).toHaveLength(1)
  })

  it('leaves an ungated list exactly as it is', () => {
    const plain = { id: 'x', leads: [{ to: 'a', type: 'leader' }, { to: 'b', type: 'leader' }] }
    expect(leadsFor(plain, { uid: 'a' }, [pz])).toBe(plain.leads)
  })
})

describe('addUnitEntry / removeUnitEntry', () => {
  // One implementation for both screens that can do this: the editor (via useRosterEditing) and
  // the creation wizard, whose own copy of the removal used to leave a Leader attached to a unit
  // that had already left the roster.
  const def = { id: 'intercessor-squad', sizes: [{ pts: 80, per: [5, 5] }, { pts: 150, per: [10, 10], default: 1 }] }

  it('adds at the datasheet\'s own default bracket', () => {
    const units = []
    expect(addUnitEntry(units, def, 'intercessor-squad', 'u1')).toMatchObject({ uid: 'u1', id: 'intercessor-squad', size: 1 })
    expect(units).toHaveLength(1)
  })

  it('falls back to the first bracket when none is marked default', () => {
    const units = []
    addUnitEntry(units, { id: 'x', sizes: [{ pts: 10, per: [1, 1] }] }, 'x', 'u1')
    expect(units[0].size).toBe(0)
  })

  it('removes the most recently added copy and returns its uid', () => {
    const units = [{ uid: 'u1', id: 'a' }, { uid: 'u2', id: 'b' }, { uid: 'u3', id: 'a' }]
    expect(removeUnitEntry(units, 'a')).toBe('u3')
    expect(units.map((u) => u.uid)).toEqual(['u1', 'u2'])
    expect(removeUnitEntry(units, 'nobody')).toBeNull()
  })

  it('lets go of a Leader attached to the unit that left', () => {
    const units = [{ uid: 'u1', id: 'squad' }, { uid: 'u2', id: 'captain', leaderOf: 'u1' }]
    removeUnitEntry(units, 'squad')
    expect(units[0].leaderOf).toBeUndefined()
  })

  // The editor deletes one NAMED line. Two copies of a datasheet are configured separately, so
  // "remove a copy" (what the browser's − means) would take the wrong one half the time.
  it('removes the exact entry when given its uid', () => {
    const units = [{ uid: 'u1', id: 'a', wg: [[0, 1, 1]] }, { uid: 'u2', id: 'a' }, { uid: 'u3', id: 'a' }]
    expect(removeUnitEntry(units, 'a', 'u1')).toBe('u1')
    expect(units.map((u) => u.uid)).toEqual(['u2', 'u3'])
    expect(removeUnitEntry(units, 'a', 'gone')).toBeNull()
  })

  it('still detaches a Leader when removing by uid', () => {
    const units = [{ uid: 'u1', id: 'squad' }, { uid: 'u2', id: 'captain', leaderOf: 'u1' }]
    removeUnitEntry(units, 'squad', 'u1')
    expect(units[0].leaderOf).toBeUndefined()
  })
})

describe('splitInstruction', () => {
  it('keeps a plain sentence whole with no bullets', () => {
    expect(splitInstruction('This model can be equipped with 1 Voidraven missiles.'))
      .toEqual({ head: 'This model can be equipped with 1 Voidraven missiles.', bullets: [], note: '' })
  })

  it('splits the option list off the sentence and drops the markers', () => {
    const t = 'For every 5 models in the unit:\n◦ 1 hexrifle and 1 torturer\u2019s tool\n◦ 1 ossefactor'
    expect(splitInstruction(t)).toEqual({
      head: 'For every 5 models in the unit:',
      bullets: ['1 hexrifle and 1 torturer\u2019s tool', '1 ossefactor'],
      note: '',
    })
  })

  it('handles the • marker appdata also uses', () => {
    expect(splitInstruction('one of the following:\n• 1 holy eviscerator').bullets).toEqual(['1 holy eviscerator'])
  })

  it('is safe on empty/absent text', () => {
    expect(splitInstruction(undefined)).toEqual({ head: '', bullets: [], note: '' })
  })
})

describe('option items', () => {
  const items = { 7: 'Hexrifle', 8: 'Torturer\u2019s tool', 9: 'Mortifier flamer' }

  it('reads a plain option as one item', () => {
    expect(optionItems([7, 5])).toEqual([[7, 1]])
    expect(optionLabel([7], items)).toBe('Hexrifle')
  })

  it('reads a bundle as every item it grants', () => {
    expect(optionItems([[[7, 1], [8, 1]], 0])).toEqual([[7, 1], [8, 1]])
    expect(optionLabel([[[7, 1], [8, 1]]], items)).toBe('Hexrifle + Torturer\u2019s tool')
  })

  it('shows a quantity above one', () => {
    expect(optionLabel([[[9, 2]]], items)).toBe('2\u00d7 Mortifier flamer')
  })

  it('names both halves of a bundle in the export', () => {
    const def = { gear: [{ o: [[[[7, 1], [8, 1]]]] }] }
    expect(wargearNames(def, { wg: [[0, 0, 1]] }, items)).toEqual(['Hexrifle + Torturer\u2019s tool'])
  })

  it('is empty rather than throwing on a missing option', () => {
    expect(optionItems(undefined)).toEqual([])
    expect(optionItems([])).toEqual([])
  })
})

describe('the real Wracks bundle', () => {
  // The reported case: appdata lists the five items flat, and only the instruction prose says
  // each swap grants a hexrifle AND a torturer's tool. If the generator ever stops reading it,
  // this group falls back to five one-item options and the pairing is silently lost again.
  it('offers four paired swaps, not five loose items', async () => {
    const rf = await import('../data/roster/drukhari.js')
    const items = (await import('../data/roster/items.js')).default.items
    const wracks = rf.default.units.find((u) => u.id === 'wracks')
    // The unit-wide group — appdata records this same instruction on both miniatures, and the
    // generator folds those two copies into one (mergeMiniatureDuplicates).
    const group = wracks.gear.find((g) => g.all && g.o.length === 4)
    expect(group.o.map((o) => optionLabel(o, items))).toEqual([
      'Hexrifle + Torturer\u2019s tool',
      'Liquifier gun + Torturer\u2019s tool',
      'Ossefactor + Torturer\u2019s tool',
      'Stinger pistol + Torturer\u2019s tool',
    ])
  })
})

describe('splitInstruction, list shapes', () => {
  it('reads a list that has no marker at all, just a head line ending in a colon', () => {
    const t = '1 storm bolter can be replaced with one of the following:\n1 incinerator and 1 banner\n1 psilencer and 1 banner'
    expect(splitInstruction(t).bullets).toEqual(['1 incinerator and 1 banner', '1 psilencer and 1 banner'])
  })

  it('keeps a footnote out of the option list', () => {
    const t = 'one of the following:\n1 storm bolter and 1 banner*\n* That model\u2019s storm bolter cannot be replaced.'
    const r = splitInstruction(t)
    expect(r.bullets).toEqual(['1 storm bolter and 1 banner*'])
    expect(r.note).toBe('That model\u2019s storm bolter cannot be replaced.')
  })

  it('does not split a plain multi-line sentence whose head is not a list head', () => {
    expect(splitInstruction('One line\nand its continuation')).toEqual({
      head: 'One line and its continuation', bullets: [], note: '',
    })
  })

  it('handles the ▫ and ■ markers appdata also uses', () => {
    expect(splitInstruction('one of:\n▫ 1 big shoota\n■ 1 rokkit').bullets).toEqual(['1 big shoota', '1 rokkit'])
  })
})

describe('wargearGroupCap', () => {
  // "For every 5 models, up to 2 Seraphim…" — 2 picks in a 5-model squad, 4 in a 10-model one.
  const seraphim = { sizes: [{ per: [5, 5] }, { per: [10, 10] }], gear: [{ o: [[1], [2]], lim: [[0, 2], [10, 4]] }] }

  it('takes the highest threshold the unit reaches', () => {
    expect(wargearGroupCap(seraphim, { size: 0 }, 0)).toEqual({ limit: 2, dup: 0 })
    expect(wargearGroupCap(seraphim, { size: 1 }, 0)).toEqual({ limit: 4, dup: 0 })
  })

  it('follows the live model count, not just the size bracket', () => {
    const ranged = { sizes: [{ per: [5, 10] }], gear: seraphim.gear }
    expect(wargearGroupCap(ranged, { size: 0, count: 9 }, 0).limit).toBe(2)
    expect(wargearGroupCap(ranged, { size: 0, count: 10 }, 0).limit).toBe(4)
  })

  it('reads the duplicate cap off the threshold, not the group', () => {
    // Cadian Shock Troops: 2 picks / 1 of a kind at 10 models, 4 / 2 at 20.
    const cadian = { sizes: [{ per: [10, 10] }, { per: [20, 20] }], gear: [{ o: [[1], [2]], lim: [[10, 2, 1], [20, 4, 2]] }] }
    expect(wargearGroupCap(cadian, { size: 0 }, 0)).toEqual({ limit: 2, dup: 1 })
    expect(wargearGroupCap(cadian, { size: 1 }, 0)).toEqual({ limit: 4, dup: 2 })
  })

  it('is zero below every threshold — "if this unit contains 10 models" in a 5-model squad', () => {
    const corsairs = { sizes: [{ per: [5, 5] }, { per: [10, 10] }], gear: [{ o: [[1]], lim: [[10, 1]] }] }
    expect(wargearGroupCap(corsairs, { size: 0 }, 0).limit).toBe(0)
    expect(wargearGroupCap(corsairs, { size: 1 }, 0).limit).toBe(1)
  })

  it('is null when the group carries no cap, so callers keep their own behaviour', () => {
    expect(wargearGroupCap({ sizes: [{ per: [5, 5] }], gear: [{ o: [[1]] }] }, { size: 0 }, 0)).toBeNull()
    expect(wargearGroupCap(null, null, 0)).toBeNull()
  })

  it('counts what a group already spent, optionally ignoring one option', () => {
    const entry = { wg: [[0, 0, 2], [0, 1, 1], [1, 0, 3]] }
    expect(wargearGroupSpent(entry, 0)).toBe(3)
    expect(wargearGroupSpent(entry, 0, 1)).toBe(2)
    expect(wargearGroupSpent({}, 0)).toBe(0)
  })
})

describe('the real Kasrkin cap', () => {
  it('allows four special weapons, at most two of a kind', async () => {
    const rf = await import('../data/roster/astra-militarum.js')
    const kasrkin = rf.default.units.find((u) => u.name === 'Kasrkin')
    const gi = kasrkin.gear.findIndex((g) => g.o.length > 3 && g.lim)
    expect(wargearGroupCap(kasrkin, { size: 0 }, gi)).toEqual({ limit: 4, dup: 2 })
  })
})

describe('modelsPerMini', () => {
  // `sizes[i].comp` is appdata's unit_composition_miniature: [[miniIndex, min, max?], …].
  const squad = (comp) => ({ minis: [{ n: 'Superior' }, { n: 'Sister' }], sizes: [{ pts: 100, per: [5, 10], comp }] })

  it('treats a single-profile datasheet as all of it', () => {
    const solo = { sizes: [{ pts: 90, per: [1, 1] }] }
    expect(modelsPerMini(solo, {})).toEqual(new Map([[0, 1]]))
  })

  it('gives the free profile whatever the fixed ones leave', () => {
    const def = squad([[0, 1], [1, 4, 9]])
    expect(modelsPerMini(def, { size: 0, count: 10 })).toEqual(new Map([[0, 1], [1, 9]]))
    expect(modelsPerMini(def, { size: 0, count: 5 })).toEqual(new Map([[0, 1], [1, 4]]))
  })

  it('refuses to guess when two profiles are free', () => {
    // 7 compositions in the corpus (Deathwatch kill teams, Accursed Cultists): the split between
    // them is the player's, and nothing records it — so every caller falls back instead.
    expect(modelsPerMini(squad([[0, 1], [1, 2, 5], [2, 0, 4]]), { size: 0, count: 8 })).toBeNull()
  })

  it('refuses a count the composition cannot produce', () => {
    expect(modelsPerMini(squad([[0, 1], [1, 4, 9]]), { size: 0, count: 20 })).toBeNull()
    expect(modelsPerMini({ minis: [{ n: 'A' }, { n: 'B' }], sizes: [{ pts: 1, per: [5, 5] }] }, {})).toBeNull()
  })
})

describe('defaultLoadoutLines on a multi-profile squad', () => {
  // Until the composition data landed, a multi-miniature datasheet subtracted nothing at all —
  // the swapped-away weapon stayed on the line next to the one that replaced it.
  const sisters = {
    minis: [{ n: 'Sister Superior' }, { n: 'Battle Sister' }],
    sizes: [{ pts: 100, per: [10, 10], default: 1, comp: [[0, 1], [1, 9]] }],
    defaults: [[0, [[1, 1], [2, 1]]], [1, [[1, 1], [2, 1]]]],
    gear: [
      { m: 0, t: 1, in: 'checkbox', o: [[3]], rep: [1] },          // Superior's boltgun → power weapon
      { m: 1, t: 2, in: 'stepper', o: [[4]], rep: [1] },           // N Sisters' boltguns → flamers
      { all: 1, t: 3, in: 'stepper', o: [[5]], rep: [2] },         // unit-wide: no profile to spend against
    ],
  }
  const items = { 1: 'Boltgun', 2: 'Bolt pistol', 3: 'Power weapon', 4: 'Flamer', 5: 'Plasma pistol' }

  it('spends a swap against the profile that owns the group', () => {
    const lines = defaultLoadoutLines(sisters, items, { size: 0, count: 10, wg: [[0, 0, 1]] })
    expect(lines[0]).toEqual({ mini: 'Sister Superior', items: 'Bolt pistol' })
    expect(lines[1]).toEqual({ mini: 'Battle Sister', items: 'Boltgun, Bolt pistol' })
  })

  it('counts a stepper against that profile, not the whole squad', () => {
    // 3 of the 9 Battle Sisters swap; the Superior's own boltgun is untouched.
    const lines = defaultLoadoutLines(sisters, items, { size: 0, count: 10, wg: [[1, 0, 3]] })
    expect(lines[1]).toEqual({ mini: 'Battle Sister', items: 'Boltgun ×6, Bolt pistol' })
  })

  it('leaves a unit-wide group alone — it belongs to no one profile', () => {
    const lines = defaultLoadoutLines(sisters, items, { size: 0, count: 10, wg: [[2, 0, 4]] })
    expect(lines[0]).toEqual({ mini: 'Sister Superior', items: 'Boltgun, Bolt pistol' })
  })
})

describe('allegiance choices', () => {
  const mark = {
    id: 'chaos-vindicator', name: 'Chaos Vindicator', kws: ['Vehicle'], flags: {}, sizes: [{ pts: 185, per: [1, 1] }],
    alleg: { g: 'mark-of-chaos', t: 'Mark of Chaos', det: 'Pactbound Zealots', req: 1, o: [{ n: 'Khorne' }, { n: 'Nurgle' }] },
  }
  const grinder = {
    id: 'soul-grinder', name: 'Soul Grinder', kws: ['Daemon'], flags: {}, sizes: [{ pts: 175, per: [1, 1] }],
    alleg: { g: 'daemonic-allegiance', t: 'Daemonic Allegiance', req: 1, o: [{ n: 'Khorne', wg: 7 }, { n: 'Nurgle', wg: 8 }] },
  }
  const rhino = {
    id: 'rhino', name: 'Rhino', kws: ['Vehicle', 'Transport'], flags: {}, sizes: [{ pts: 75, per: [1, 1] }],
    alleg: { g: 'headhunter-task-force-keywords', t: 'Headhunter Task Force Keywords', det: 'Headhunter Task Force', max: 3, o: [{ n: 'Character' }] },
  }
  const pactbound = { name: 'Pactbound Zealots', dp: 3, enhancements: [] }

  it('is live only while the detachment that gates it is in the army', () => {
    expect(allegFor(mark, [pactbound])).toBeTruthy()
    expect(allegFor(mark, [{ name: 'Veterans of the Long War', enhancements: [] }])).toBeNull()
    expect(allegFor(grinder, [])).toBeTruthy() // Daemonic Allegiance is ungated
  })

  it('turns the choice into the keyword the unit gains', () => {
    expect(allegKeyword(mark, { alleg: 'Nurgle' }, [pactbound])).toBe('Nurgle')
    expect(allegKeyword(mark, {}, [pactbound])).toBeNull()
    expect(allegKeyword(mark, { alleg: 'Nurgle' }, [])).toBeNull() // gate closed
  })

  it('carries the weapon a mark adds', () => {
    // "This model is additionally equipped with: phlegm bombardment".
    expect(allegItems(grinder, { alleg: 'Nurgle' }, [])).toEqual([8])
    expect(allegItems(mark, { alleg: 'Nurgle' }, [pactbound])).toEqual([])
  })

  it('counts what the army has spent against a capped group', () => {
    const units = [{ uid: 'a', id: 'rhino', alleg: 'Character' }, { uid: 'b', id: 'rhino' }, { uid: 'c', id: 'rhino', alleg: 'Character' }]
    const defOf = () => rhino
    const dets = [{ name: 'Headhunter Task Force', enhancements: [] }]
    expect(allegSpent(units, defOf, 'headhunter-task-force-keywords', dets)).toBe(2)
  })

  it('lets a granted CHARACTER carry an enhancement', () => {
    // The whole point of the Headhunter upgrade: a Rhino that gained CHARACTER can take one.
    const enh = { name: 'Fell Gaze', pts: 10 }
    expect(enhEligible(enh, rhino)).toBe(false)
    expect(enhEligible(enh, rhino, ['Character'])).toBe(true)
  })
})

describe('attaching under Marks of Chaos', () => {
  // "A Character unit can only be attached to a unit if both units share the same keyword."
  const sorcerer = {
    id: 'sorcerer', name: 'Sorcerer', kws: ['Character', 'Psyker'], flags: { char: 1 }, sizes: [{ pts: 70, per: [1, 1] }],
    leads: [{ to: 'chaos-marines', type: 'leader' }],
    alleg: { g: 'mark-of-chaos', t: 'Mark of Chaos', det: 'Pactbound Zealots', req: 1, o: [{ n: 'Tzeentch' }, { n: 'Nurgle' }] },
  }
  const squad = { id: 'chaos-marines', name: 'Legionaries', kws: ['Infantry'], flags: {}, sizes: [{ pts: 90, per: [5, 5] }] }
  const dets = [{ name: 'Pactbound Zealots', dp: 3, enhancements: [] }]
  const defOf = (id) => (id === 'sorcerer' ? sorcerer : squad)

  const targets = (own, theirs) => leaderTargetsFor(
    sorcerer,
    [{ uid: 'me', id: 'sorcerer', ...(own ? { alleg: own } : {}) }, { uid: 'them', id: 'chaos-marines', ...(theirs ? { alleg: theirs } : {}) }],
    'me', defOf, dets,
  ).map((t) => t.uid)

  it('offers a squad that shares the mark', () => {
    expect(targets('Nurgle', 'Nurgle')).toEqual(['them'])
  })

  it('hides one that took a different mark', () => {
    expect(targets('Nurgle', 'Tzeentch')).toEqual([])
  })

  it('still offers a squad that hasn\'t chosen yet — marks are picked in any order', () => {
    expect(targets('Nurgle', null)).toEqual(['them'])
  })
})

describe('allies', () => {
  const inquisitor = { id: 'imperial-agents:inquisitor', name: 'Inquisitor', kws: ['Character'], flags: { char: 1 }, sizes: [{ pts: 65, per: [1, 1] }] }
  const bloodletters = { id: 'bloodletters', name: 'Bloodletters', kws: ['Infantry'], flags: {}, sizes: [{ pts: 110, per: [10, 10] }] }
  const captain = { id: 'captain', name: 'Captain', kws: ['Character'], flags: { char: 1 }, sizes: [{ pts: 85, per: [1, 1] }] }
  const faction = {
    units: [captain, inquisitor, bloodletters],
    allies: [
      { key: 'agents', name: 'Agents of the Imperium', ids: [inquisitor.id] },
      { key: 'daemons', name: 'Blood Legions', ids: [bloodletters.id], dets: ['Khorne Daemonkin'] },
    ],
  }
  const defOf = (id) => faction.units.find((u) => u.id === id)

  // The namespaced id is the ONLY mark an allied unit carries, and it says which bundle the unit
  // (and its datasheet page) belongs to.
  it('reads the source faction out of a unit id', () => {
    expect(allySourceOf('imperial-agents:inquisitor')).toEqual(['imperial-agents', 'inquisitor'])
    expect(allySourceOf('captain')).toBe(null)
    expect(usesAllies({ units: [{ id: 'captain' }] })).toBe(false)
    expect(usesAllies({ units: [{ id: 'captain' }, { id: 'imperial-agents:inquisitor' }] })).toBe(true)
  })

  it('opens a detachment-gated group only under that detachment', () => {
    expect(allyGroupsFor(faction, []).map((g) => g.key)).toEqual(['agents'])
    expect(allyGroupsFor(faction, [{ name: 'Khorne Daemonkin' }]).map((g) => g.key)).toEqual(['agents', 'daemons'])
  })

  // Allies are their own sections, never filed under a battlefield role — and a group the
  // detachment doesn't unlock isn't offered at all, which is what the add-units browser needs.
  it('splits units into role buckets and ally sections', () => {
    const items = [{ uid: 'a', id: 'captain' }, { uid: 'b', id: 'imperial-agents:inquisitor' }, { uid: 'c', id: 'bloodletters' }]
    const secs = sectionsOf(items, { faction, defOf })
    expect(secs.find((s) => s.id === 'characters').items.map((i) => i.uid)).toEqual(['a'])
    expect(secs.find((s) => s.id === 'ally:agents').items.map((i) => i.uid)).toEqual(['b'])
    expect(secs.find((s) => s.id === 'ally:daemons')).toBeUndefined()
  })

  // …but a list that already HOLDS such a unit still shows it, or its points would vanish from the
  // screen while staying in the total.
  it('keeps a locked group for the screens that display a saved list', () => {
    const items = [{ uid: 'c', id: 'bloodletters' }]
    const sec = sectionsOf(items, { faction, defOf, keepLocked: true }).find((s) => s.id === 'ally:daemons')
    expect([sec.locked, sec.items.map((i) => i.uid)]).toEqual([true, ['c']])
  })
})

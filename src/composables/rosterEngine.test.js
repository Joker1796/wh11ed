import { describe, it, expect } from 'vitest'
import { dpLimitFor, ENTRY_NOTE_MAX, orderedByName, setNote, addUnitEntry, duplicateUnitEntry, takeUnitEntry, restoreUnitEntry, enhAttachOf, leadsFor, splitInstruction, optionItems, optionLabel, wargearNames, wargearGroupCap, wargearGroupSpent, bucketOf, unitBasePoints, unitWargearPoints, defaultWargearPoints, unitPoints, rosterPoints, canBeWarlord, enhEligible, enhancementBearers, enhOptionsFor, mandatoryEnhancementFor, enhancementPoints, findEnhancement, effectiveBattle, leaderTargetsFor, leaderSourcesFor, leaderCandidatesFor, leaderHostsFor, wargearGroupLive, wargearGroupBlocker, blockNumbers, blockRootUid, hostBlockTotal, defaultLoadoutLines, modelsPerMini, swapsByMini, swapRoom, swapOverdraft, fitWargear, overdrawnGroups, pickMiniFor, dispositionCandidates, dispositionOf, allegFor, allegKeyword, allegItems, allegSpent, capKeyOf, allySourceOf, usesAllies, allyGroupsFor, sectionsOf, entrySummary } from './rosterEngine.js'

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
    expect(bucketOf({ kws: ['Fortification'], flags: {} })).toBe('fortifications')
    expect(bucketOf({ kws: ['Vehicle', 'Fly'], flags: {} })).toBe('vehicles')
    expect(bucketOf({ kws: ['Infantry'], flags: {} })).toBe('infantry')
    // Monster/Mounted/Beast/Aircraft are each too small to earn a section of their own — the
    // datasheet page leaves them in "Other" too, and this list follows that one.
    expect(bucketOf({ kws: ['Monster'], flags: {} })).toBe('other')
    // Order is the rule: a transport is a VEHICLE and most Battleline is INFANTRY, and each still
    // lands in the more specific group above.
    expect(bucketOf({ kws: ['Dedicated Transport', 'Vehicle'], flags: {} })).toBe('transports')
    expect(bucketOf({ kws: ['Battleline', 'Infantry'], flags: {} })).toBe('battleline')
    expect(bucketOf({ kws: [], flags: {}, condBattleline: 1 })).toBe('battleline')
  })

  // Conditional Battleline is the army's answer, not the datasheet's: told which keywords this
  // army grants, the unit files under Battleline only when the grant is among them.
  it('files a conditionally-Battleline unit by what the army grants', () => {
    const gretchin = { kws: ['Infantry'], flags: {}, condBattleline: 1 }
    expect(bucketOf(gretchin, [])).toBe('infantry')
    expect(bucketOf(gretchin, ['Battleline'])).toBe('battleline')
    expect(bucketOf(gretchin)).toBe('battleline') // no detachments known → the old reading
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
  // gear group option = [itemId, pts?]. Only what the player picks on top of the printed loadout is
  // counted here — what the loadout itself costs is defaultWargearPoints (below).
  const crisis = {
    id: 'crisis',
    sizes: [{ pts: 130, per: [3, 3], default: 1 }],
    gear: [
      { m: 0, t: 1, in: 'stepper', o: [[10, 5]] },   // Missile pod +5 → charges
      { m: 0, t: 2, in: 'checkbox', o: [[11], [12]] }, // free swap → no charge
    ],
  }
  it('charges paid selections by count', () => {
    expect(unitWargearPoints(crisis, { wg: [[0, 0, 2]] })).toBe(10) // 2× Missile pod
  })
  it('ignores free swaps', () => {
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

describe('defaultWargearPoints', () => {
  // Terminator Assault Squad: the Munitorum bracket is 310 for 6-10 models and every model's
  // thunder hammer is +5 on top of it, so GW's own app prices a full ten at 360. `all` group,
  // giving the pair up for twin lightning claws hands back the 5.
  const assault = {
    id: 'terminator-assault-squad',
    sizes: [
      { pts: 155, per: [5, 5], default: 1, comp: [[0, 1], [1, 4]] },
      { pts: 310, per: [6, 10], comp: [[0, 1], [1, 5, 9]] },
    ],
    minis: [{ n: 'Assault Terminator Sergeant' }, { n: 'Assault Terminator' }],
    defaults: [[0, [[1, 1], [2, 1]]], [1, [[1, 1], [2, 1]]]],
    dw: [[0, 5], [1, 5]],
    gear: [{ all: 1, t: 1, in: 'stepper', o: [[3]], rep: [2, 1], dr: 5 }],
  }
  it('charges the printed loadout per model actually fielded', () => {
    expect(unitPoints(assault, { size: 1, count: 10 })).toBe(360)
    expect(unitPoints(assault, { size: 1, count: 7 })).toBe(345) // flat bracket, seven hammers
    expect(unitPoints(assault, { size: 0 })).toBe(180)
  })
  it('stops charging for a model that swapped the item away', () => {
    expect(unitPoints(assault, { size: 1, count: 10, wg: [[0, 0, 3]] })).toBe(345)
    expect(unitPoints(assault, { size: 1, count: 10, wg: [[0, 0, 10]] })).toBe(310)
  })
  it('never refunds more than the unit carries', () => {
    expect(defaultWargearPoints(assault, { size: 1, count: 10, wg: [[0, 0, 99]] })).toBe(0)
  })
  it('is nothing for a datasheet whose loadout is free', () => {
    expect(defaultWargearPoints(intercessor, { size: 0 })).toBe(0)
  })

  // A per-copy group counts copies of the weapon, not models: a Ravager's three dark lances are
  // +5 each, and it can trade them for disintegrator cannons one at a time.
  const ravager = {
    id: 'ravager',
    sizes: [{ pts: 110, per: [1, 1], default: 1 }],
    defaults: [[0, [[1, 1], [2, 3]]]],
    dw: [[0, 15]],
    gear: [{ m: 0, t: 1, in: 'stepper', cp: 3, o: [[3]], rep: [2], dr: 5 }],
  }
  it('refunds per copy where the group is counted per copy', () => {
    expect(unitPoints(ravager, { size: 0 })).toBe(125)
    expect(unitPoints(ravager, { size: 0, wg: [[0, 0, 1]] })).toBe(120)
    expect(unitPoints(ravager, { size: 0, wg: [[0, 0, 3]] })).toBe(110)
  })

  // Profiles priced differently (Victrix Honour Guard's Champion and Ancient) need the per-profile
  // model counts; a bracket that can't supply them is left uncharged rather than guessed at.
  const victrix = {
    id: 'victrix-honour-guard',
    sizes: [{ pts: 110, per: [3, 3], default: 1, comp: [[0, 1], [1, 1], [2, 1]] }],
    minis: [{ n: 'Chapter Ancient' }, { n: 'Chapter Champion' }, { n: 'Victrix Honour Guard' }],
    dw: [[1, 10], [0, 15]],
  }
  it('charges each profile its own loadout', () => {
    expect(unitPoints(victrix, { size: 0 })).toBe(135)
  })
  it('charges nothing when the profiles cost differently and the split is unknown', () => {
    const open = { ...victrix, sizes: [{ pts: 110, per: [3, 6], comp: [[0, 1, 3], [1, 1, 3], [2, 1]] }] }
    expect(defaultWargearPoints(open, { size: 0, count: 4 })).toBe(0)
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
    expect(defaultLoadoutLines(overlord, items, { wg: [] })).toEqual([{ mini: '', items: 'Tachyon arrow, Overlord’s blade', names: ['Tachyon arrow', 'Overlord’s blade'] }])
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
      .toEqual([{ mini: '', items: 'Close combat weapon, Gauss flayer ×7', names: ['Close combat weapon', 'Gauss flayer'] }])
  })

  it('an inert (condition unmet) deviation counts for nothing', () => {
    // Toggle the orb on (group 0), then swap the weapon back to default (drop group 1's entry) —
    // the orb's own wg entry is left in storage but must not count toward points/loadout while
    // its condition is unmet.
    const entry = { wg: [[0, 0, 1]] } // orb "on" with no live weapon swap → cond unmet
    expect(unitWargearPoints(overlord, entry)).toBe(0)
    expect(defaultLoadoutLines(overlord, items, entry)).toEqual([{ mini: '', items: 'Tachyon arrow, Overlord’s blade', names: ['Tachyon arrow', 'Overlord’s blade'] }])
  })

  it('counts the same deviation once its condition is met', () => {
    const entry = { wg: [[1, 0, 1], [0, 0, 1]] } // weapon swapped (group 1 live) + orb on
    expect(unitWargearPoints(overlord, entry)).toBe(15)
  })

  // Chosen shape: 5 or 6-10 models, "For every 5 models in this unit, 1 model equipped with a
  // boltgun can have its accursed weapon replaced with 1 power fist" gated on the combi-weapon
  // group, which takes boltguns off up to 2 models. The condition qualifies ONE model, and a
  // squad has models to spare — a single combi-weapon must not close the group.
  const chosen = {
    minis: undefined,
    sizes: [{ pts: 135, per: [5, 5], default: 1 }, { pts: 270, per: [6, 10] }],
    defaults: [[0, [[1, 1], [2, 1]]]], // [boltgun, accursed weapon]
    gear: [
      { all: 1, m: 0, t: 1, in: 'stepper', o: [[3]], rep: [1] }, // combi-weapon, replaces boltguns
      { all: 1, m: 0, t: 2, in: 'stepper', o: [[4]], rep: [2], cond: [0, 0] }, // power fist
    ],
  }

  it('keeps a gated group live while any model still meets its condition', () => {
    expect(wargearGroupLive(chosen, { size: 0 }, 1)).toBe(true) // nothing swapped
    expect(wargearGroupLive(chosen, { size: 0, wg: [[0, 0, 1]] }, 1)).toBe(true) // 1 of 5 swapped
    expect(wargearGroupLive(chosen, { size: 0, wg: [[0, 0, 2]] }, 1)).toBe(true) // the group's own cap
  })

  it('closes it only once the sibling has reached every model', () => {
    expect(wargearGroupLive(chosen, { size: 0, wg: [[0, 0, 5]] }, 1)).toBe(false)
    // …and "every model" follows the unit's size, not a fixed number.
    expect(wargearGroupLive(chosen, { size: 1, count: 10, wg: [[0, 0, 5]] }, 1)).toBe(true)
  })

  it('names what has to change, and which way', () => {
    // Open → nothing to say.
    expect(wargearGroupBlocker(chosen, { size: 0, wg: [[0, 0, 2]] }, 1)).toBeNull()
    // Closed because every boltgun is gone: one has to come BACK for a model to qualify.
    expect(wargearGroupBlocker(chosen, { size: 0, wg: [[0, 0, 5]] }, 1)).toEqual({ need: 'present', ids: [1] })
    // The Overlord asks the opposite: the arrow and blade have to come OFF.
    expect(wargearGroupBlocker(overlord, {}, 0)).toEqual({ need: 'gone', ids: [1, 2] })
    expect(wargearGroupBlocker(overlord, { wg: [[1, 0, 1]] }, 0)).toBeNull()
  })

  it('never closes it on an unknown model count', () => {
    // Two open-ended profiles: modelsPerMini can't split them, and a group scoped to one profile
    // has no count to measure against. Showing an option too long beats hiding a legal one.
    const split = { ...chosen, minis: [{ n: 'Champion' }, { n: 'Chosen' }],
      gear: [{ ...chosen.gear[0], all: 0 }, { ...chosen.gear[1], all: 0 }] }
    expect(wargearGroupLive(split, { size: 0, wg: [[0, 0, 5]] }, 1)).toBe(true)
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
// Who in the list wears an enhancement, and who could (EnhancementList, a player's request).
describe('enhancementBearers', () => {
  const defs = {
    cap: { id: 'cap', name: 'Captain', flags: { char: 1 }, kws: ['Infantry', 'Character'] },
    lt: { id: 'lt', name: 'Lieutenant', flags: { char: 1 }, kws: ['Infantry', 'Character'] },
    tank: { id: 'tank', name: 'Predator', flags: {}, kws: ['Vehicle'] },
  }
  const defOf = (id) => defs[id]
  const dets = [{ name: 'D', enhancements: [
    { name: 'Artificer’s Blade', pts: 15 },
    { name: 'Iron Hide', pts: 10, req: [{ kw: ['Vehicle'] }] },
  ] }]
  it('names who wears it, else who could, counting repeats', () => {
    const units = [{ uid: 1, id: 'cap', enh: 'Artificer’s Blade' }, { uid: 2, id: 'lt' }, { uid: 3, id: 'lt' }, { uid: 4, id: 'tank' }]
    // The rules text spells the apostrophe plainly: matched all the same.
    // Taken once, and once is its limit: nobody else is offered it.
    expect(enhancementBearers("Artificer's Blade", { units, defOf, detachments: dets })).toEqual({ taken: ['Captain'], can: [] })
    // Untaken: the characters free to carry it, counted (the Captain wears nothing in this one).
    expect(enhancementBearers("Artificer's Blade", { units: units.map((u) => ({ ...u, enh: undefined })), defOf, detachments: dets }))
      .toEqual({ taken: [], can: ['Captain', 'Lieutenant ×2'] })
    expect(enhancementBearers('Iron Hide', { units, defOf, detachments: dets })).toEqual({ taken: [], can: [] }) // not a character
  })
  // An "(Upgrade)" one may go on several units: while its limit has room, the rest still count.
  it('keeps the candidates of an upgrade taken fewer times than its limit', () => {
    const inf = { id: 'inf', name: 'Intercessors', flags: {}, kws: ['Infantry'] }
    const up = [{ name: 'D', enhancements: [{ name: 'Furious', limit: 2, nonCharOk: 1 }] }]
    const defOf2 = (id) => ({ ...defs, inf })[id]
    const units = [{ uid: 1, id: 'inf', enh: 'Furious' }, { uid: 2, id: 'inf' }, { uid: 3, id: 'inf' }]
    expect(enhancementBearers('Furious', { units, defOf: defOf2, detachments: up })).toEqual({ taken: ['Intercessors'], can: ['Intercessors ×2'] })
    units[1].enh = 'Furious'
    expect(enhancementBearers('Furious', { units, defOf: defOf2, detachments: up })).toEqual({ taken: ['Intercessors ×2'], can: [] })
  })

  it('has no answer for an enhancement no selected detachment offers', () => {
    expect(enhancementBearers('Nope', { units: [], defOf, detachments: dets })).toBeNull()
  })
})

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
  // "No limit" lifts every limit hanging on the size, and still names the largest bracket for the
  // ally tables.
  // The player's own limits on a custom size: each key on its own, the rest still borrowed, the
  // Battleline limit twice the copies unless set itself — and none of it outside a custom size.
  it('takes the player\u2019s own limits on a custom size, borrowing what is not set', () => {
    const own = { battleSize: 'custom', customPoints: 1500, customLimits: { dp: 1, dup: 2 } }
    expect(effectiveBattle(own, core)).toMatchObject({ dp: 1, enhLimit: 4, dupLimit: 2, lineLimit: 4, ownLimits: true, base: 'strike-force' })
    expect(effectiveBattle({ ...own, customLimits: { line: 9 } }, core)).toMatchObject({ dupLimit: 3, lineLimit: 9, ownLimits: true })
    expect(effectiveBattle({ ...own, customLimits: { dp: -1, enh: 'x' } }, core)).toMatchObject({ dp: 3, enhLimit: 4, ownLimits: false })
    expect(effectiveBattle({ battleSize: 'incursion', customLimits: { dp: 9 } }, core)).toMatchObject({ dp: 2, lineLimit: 4 })
  })
  it('lifts every limit for a list with no limit', () => {
    expect(effectiveBattle({ battleSize: 'none' }, core)).toMatchObject({
      points: Infinity, dp: Infinity, enhLimit: Infinity, dupLimit: Infinity, base: 'onslaught', unlimited: true,
    })
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

describe('leaderSourcesFor', () => {
  const squad = { id: 'intercessor-squad', name: 'Intercessor Squad' }
  const leader = { id: 'captain', name: 'Captain', leads: [{ to: 'intercessor-squad', type: 'leader' }] }
  const supporter = { id: 'chronomancer', name: 'Chronomancer', leads: [{ to: 'intercessor-squad', type: 'support' }] }
  const defs = { 'intercessor-squad': squad, captain: leader, chronomancer: supporter }
  const defOf = (id) => defs[id]

  // The squad's end of the attachment: who could join it, asked through leaderTargetsFor so the
  // two pickers cannot disagree (a player's request, 2026-09-24).
  it('lists the entries that could be attached to this unit, and only those', () => {
    const units = [
      { uid: 'a', id: 'captain' },
      { uid: 'b', id: 'chronomancer' },
      { uid: 'c', id: 'intercessor-squad' },
      { uid: 'd', id: 'intercessor-squad' },
    ]
    expect(leaderSourcesFor('c', units, defOf)).toMatchObject([
      { uid: 'a', name: 'Captain', type: 'leader', used: false, elsewhere: null },
      { uid: 'b', name: 'Chronomancer', type: 'support', used: false, elsewhere: null },
    ])
    expect(leaderSourcesFor('a', units, defOf)).toEqual([])
  })

  // Against real data: a Necron Warriors squad takes a Technomancer (Support) and an Overlord
  // (Leader); a Character takes no one.
  it('reads the real Necrons attachments from the squad end', async () => {
    const { default: necrons } = await import('../data/roster/necrons.js')
    const byId = (id) => necrons.units.find((u) => u.id === id)
    const units = [{ uid: 'sq', id: 'necron-warriors' }, { uid: 'tm', id: 'technomancer' }, { uid: 'ov', id: 'overlord' }, { uid: 'im', id: 'immortals' }]
    const names = (uid) => leaderSourcesFor(uid, units, byId).map((x) => `${x.name}:${x.type}`)
    expect(names('sq')).toEqual(expect.arrayContaining(['Technomancer:support', 'Overlord:leader']))
    expect(names('sq')).toHaveLength(2)
    expect(names('tm')).toEqual([])
  })

  it('marks a full Leader slot, and a candidate attached to another squad', () => {
    const units = [
      { uid: 'a', id: 'captain', leaderOf: 'c' },
      { uid: 'b', id: 'captain', leaderOf: 'd' },
      { uid: 'c', id: 'intercessor-squad' },
      { uid: 'd', id: 'intercessor-squad' },
    ]
    const onC = leaderSourcesFor('c', units, defOf)
    expect(onC.find((x) => x.uid === 'a')).toMatchObject({ used: false, elsewhere: null })
    // b could move here, but c's Leader slot is taken by a.
    expect(onC.find((x) => x.uid === 'b')).toMatchObject({ used: true, elsewhere: 'd' })
  })
})

describe('leaderCandidatesFor', () => {
  const squad = { id: 'intercessor-squad', name: 'Intercessor Squad', sizes: [{ pts: 80, per: [5, 5], default: 1 }] }
  const leader = { id: 'captain', name: 'Captain', sizes: [{ pts: 90, per: [1, 1], default: 1 }], leads: [{ to: 'intercessor-squad', type: 'leader' }] }
  const lieutenant = { id: 'lieutenant', name: 'Lieutenant', sizes: [{ pts: 50, per: [1, 1], default: 1 }], leads: [{ to: 'intercessor-squad', type: 'leader' }] }
  const supporter = { id: 'apothecary', name: 'Apothecary', sizes: [{ pts: 45, per: [1, 1], default: 1 }], leads: [{ to: 'intercessor-squad', type: 'support' }] }
  const stranger = { id: 'techmarine', name: 'Techmarine', sizes: [{ pts: 55, per: [1, 1], default: 1 }], leads: [{ to: 'servitors', type: 'leader' }] }
  const catalogue = [squad, leader, lieutenant, supporter, stranger]
  const defOf = (id) => catalogue.find((d) => d.id === id)

  // From the catalogue, not the list: a squad added before any Character still says who could
  // lead it (a player's ask, 2026-10-06). Sorted by name, priced at the default size.
  it('lists the datasheets that could lead this unit, before any is in the list', () => {
    const units = [{ uid: 's', id: 'intercessor-squad' }]
    expect(leaderCandidatesFor('s', units, catalogue, defOf)).toEqual([
      { id: 'apothecary', name: 'Apothecary', type: 'support', pts: 45, used: false, legends: false },
      { id: 'captain', name: 'Captain', type: 'leader', pts: 90, used: false, legends: false },
      { id: 'lieutenant', name: 'Lieutenant', type: 'leader', pts: 50, used: false, legends: false },
    ])
  })

  // A datasheet already in the list belongs to leaderSourcesFor's section; a taken slot marks
  // every candidate of that type, and leaves the other type open.
  it('marks a full slot, and leaves the other type open', () => {
    const units = [{ uid: 's', id: 'intercessor-squad' }, { uid: 'c', id: 'captain', leaderOf: 's' }]
    const got = leaderCandidatesFor('s', units, catalogue, defOf)
    expect(got.map((c) => c.id)).toEqual(['apothecary', 'captain', 'lieutenant'])
    expect(got.find((c) => c.id === 'lieutenant').used).toBe(true)
    expect(got.find((c) => c.id === 'apothecary').used).toBe(false)
  })

  // A free copy in the list is the section above's (attach it, no new purchase); a copy already
  // leading another squad is not, so a second one is still offered.
  it('leaves out a datasheet the list holds a free copy of, not one busy with another unit', () => {
    const free = [{ uid: 's', id: 'intercessor-squad' }, { uid: 'l', id: 'lieutenant' }]
    expect(leaderCandidatesFor('s', free, catalogue, defOf).map((c) => c.id)).toEqual(['apothecary', 'captain'])
    const busy = [{ uid: 's', id: 'intercessor-squad' }, { uid: 's2', id: 'intercessor-squad' }, { uid: 'l', id: 'lieutenant', leaderOf: 's2' }]
    expect(leaderCandidatesFor('s', busy, catalogue, defOf).find((c) => c.id === 'lieutenant')).toMatchObject({ used: false })
  })

  it('answers nothing for a unit no one leads, or an unknown entry', () => {
    expect(leaderCandidatesFor('c', [{ uid: 'c', id: 'captain' }], catalogue, defOf)).toEqual([])
    expect(leaderCandidatesFor('nope', [], catalogue, defOf)).toEqual([])
  })

  // A keyword group ("any IMPERIUM BATTLELINE INFANTRY unit") is not a named attachment, so it
  // does not suggest anyone here — the picker on the Character's end still accepts it.
  it('suggests only leaders that name this unit, not a keyword group that covers it', () => {
    const inquisitor = { id: 'inquisitor', name: 'Inquisitor', sizes: [{ pts: 55, per: [1, 1], default: 1 }], leadKw: [{ kw: ['Battleline', 'Infantry'], type: 'leader' }] }
    const cat = [...catalogue, inquisitor]
    const byId = (id) => cat.find((d) => d.id === id)
    const units = [{ uid: 's', id: 'intercessor-squad' }]
    const sq = { ...squad, kws: ['Battleline', 'Infantry'] }
    const withKws = (id) => (id === 'intercessor-squad' ? sq : byId(id))
    expect(leaderCandidatesFor('s', units, cat, withKws).map((c) => c.id)).toEqual(['apothecary', 'captain', 'lieutenant'])
  })

  // Against real data: the Intercessor Squad's own table, and a borrowed (MIRROR_ATTACH) one —
  // Victrix Honour Guard takes "a CAPTAIN or CHAPTER MASTER unit" that could lead Intercessors.
  it('reads the real Space Marines attachments, mirrored ones included', async () => {
    const { default: sm } = await import('../data/roster/space-marines.js')
    const byId = (id) => sm.units.find((u) => u.id === id)
    const names = (id) => leaderCandidatesFor('x', [{ uid: 'x', id }], sm.units, byId).map((c) => `${c.name}:${c.type}`)
    expect(names('intercessor-squad')).toEqual(expect.arrayContaining(['Captain:leader', 'Apothecary:support', 'Marneus Calgar:leader']))
    expect(names('victrix-honour-guard')).toEqual(expect.arrayContaining(['Captain:leader', 'Marneus Calgar:leader']))
    expect(names('victrix-honour-guard')).not.toContain('Apothecary:support')
  })
})

describe('leaderHostsFor', () => {
  const squad = { id: 'intercessor-squad', name: 'Intercessor Squad', sizes: [{ pts: 80, per: [5, 5], default: 1 }] }
  const vets = { id: 'sternguard', name: 'Sternguard Veteran Squad', sizes: [{ pts: 100, per: [5, 5], default: 1 }] }
  const servitors = { id: 'servitors', name: 'Servitors', sizes: [{ pts: 40, per: [4, 4], default: 1 }] }
  const captain = { id: 'captain', name: 'Captain', sizes: [{ pts: 90, per: [1, 1], default: 1 }], leads: [{ to: 'intercessor-squad', type: 'leader' }, { to: 'sternguard', type: 'leader' }] }
  const apothecary = { id: 'apothecary', name: 'Apothecary', sizes: [{ pts: 45, per: [1, 1], default: 1 }], leads: [{ to: 'intercessor-squad', type: 'support' }] }
  const catalogue = [squad, vets, servitors, captain, apothecary]
  const defOf = (id) => catalogue.find((d) => d.id === id)

  // The mirror of "Can be led by": from the catalogue, before any squad is in the list.
  it('lists the units this Character could lead, before any is in the list', () => {
    expect(leaderHostsFor('c', [{ uid: 'c', id: 'captain' }], catalogue, defOf)).toEqual([
      { id: 'intercessor-squad', name: 'Intercessor Squad', type: 'leader', pts: 80, legends: false },
      { id: 'sternguard', name: 'Sternguard Veteran Squad', type: 'leader', pts: 100, legends: false },
    ])
    expect(leaderHostsFor('a', [{ uid: 'a', id: 'apothecary' }], catalogue, defOf)).toMatchObject([{ id: 'intercessor-squad', type: 'support' }])
  })

  // A copy it could join now is "Attach to unit"'s; a copy whose Leader slot is taken is not, so a
  // second squad is still offered. The squad it is already with counts as joinable.
  it('leaves out a unit the list holds a joinable copy of, not one whose slot is taken', () => {
    const free = [{ uid: 'c', id: 'captain' }, { uid: 's', id: 'intercessor-squad' }]
    expect(leaderHostsFor('c', free, catalogue, defOf).map((h) => h.id)).toEqual(['sternguard'])
    const here = [{ uid: 'c', id: 'captain', leaderOf: 's' }, { uid: 's', id: 'intercessor-squad' }]
    expect(leaderHostsFor('c', here, catalogue, defOf).map((h) => h.id)).toEqual(['sternguard'])
    const taken = [{ uid: 'c', id: 'captain' }, { uid: 's', id: 'intercessor-squad' }, { uid: 'c2', id: 'captain', leaderOf: 's' }]
    expect(leaderHostsFor('c', taken, catalogue, defOf).map((h) => h.id)).toEqual(['intercessor-squad', 'sternguard'])
  })

  it('answers nothing for a unit that leads no one, or an unknown entry', () => {
    expect(leaderHostsFor('s', [{ uid: 's', id: 'intercessor-squad' }], catalogue, defOf)).toEqual([])
    expect(leaderHostsFor('nope', [], catalogue, defOf)).toEqual([])
  })

  // A keyword group is not a named attachment: an Inquisitor suggests no squad from this end either.
  it('suggests only units the Character names, not a keyword group', () => {
    const inquisitor = { id: 'inquisitor', name: 'Inquisitor', leadKw: [{ kw: ['Battleline', 'Infantry'], type: 'leader' }] }
    const cat = [...catalogue, inquisitor, { ...squad, kws: ['Battleline', 'Infantry'] }]
    expect(leaderHostsFor('i', [{ uid: 'i', id: 'inquisitor' }], cat, (id) => cat.find((d) => d.id === id))).toEqual([])
  })

  // Against real data: a Captain names Intercessors, an Apothecary does not name Victrix.
  it('reads the real Space Marines attachments', async () => {
    const { default: sm } = await import('../data/roster/space-marines.js')
    const byId = (id) => sm.units.find((u) => u.id === id)
    const names = (id) => leaderHostsFor('x', [{ uid: 'x', id }], sm.units, byId).map((h) => `${h.name}:${h.type}`)
    expect(names('captain')).toEqual(expect.arrayContaining(['Intercessor Squad:leader']))
    expect(names('apothecary')).toEqual(expect.arrayContaining(['Intercessor Squad:support']))
    expect(names('apothecary').some((n) => n.startsWith('Victrix'))).toBe(false)
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
    expect(leaderTargetsFor(leader, units, 'a', defOf)).toMatchObject([{ uid: 'b', name: 'Intercessor Squad', used: false, type: 'leader' }])
  })

  it('flags a target already claimed by a different entry of the SAME type as used', () => {
    const units = [
      { uid: 'a', id: 'captain' }, // this entry — being edited
      { uid: 'b', id: 'captain', leaderOf: 'c' }, // another leader already attached to the squad
      { uid: 'c', id: 'intercessor-squad' },
    ]
    expect(leaderTargetsFor(leader, units, 'a', defOf)).toMatchObject([{ uid: 'c', name: 'Intercessor Squad', used: true, type: 'leader' }])
  })

  it('does not flag a target as used against the entry\'s own current attachment', () => {
    const units = [
      { uid: 'a', id: 'captain', leaderOf: 'c' },
      { uid: 'c', id: 'intercessor-squad' },
    ]
    expect(leaderTargetsFor(leader, units, 'a', defOf)).toMatchObject([{ uid: 'c', name: 'Intercessor Squad', used: false, type: 'leader' }])
  })

  it('a Leader and a Support can both target the same unit without colliding', () => {
    const units = [
      { uid: 'a', id: 'captain' }, // editing this leader entry
      { uid: 'b', id: 'chronomancer', leaderOf: 'c' }, // support already attached
      { uid: 'c', id: 'intercessor-squad' },
    ]
    // The leader-type slot is still free — a support occupying the unit doesn't block a leader.
    expect(leaderTargetsFor(leader, units, 'a', defOf)).toMatchObject([{ uid: 'c', name: 'Intercessor Squad', used: false, type: 'leader' }])
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

  it("offers Kaptin's Hat to the Warboss and not to the Kommandos", async () => {
    // Was Slippery Git until Codex: Orks retired it; Kaptin's Hat asks for the same shape of
    // requirement ("BIG MEK/WARBOSS INFANTRY model only") on the same pair of units.
    const rf = await import('../data/roster/orks.js')
    const enh = rf.default.detachments.flatMap((d) => d.enhancements || []).find((e) => e.name === "Kaptin's Hat")
    const unit = (id) => rf.default.units.find((u) => u.id === id)
    expect(enhEligible(enh, unit('warboss'))).toBe(true)
    expect(enhEligible(enh, unit('kommandos'))).toBe(false)
  })
})

// "ARCHON model only" is appdata's requirement group naming one datasheet (`ds`), with no keyword
// row at all. Unread until 2026-10-07: every such enhancement went to any Character of the faction.
describe('enhEligible — a requirement group naming one datasheet (ds)', () => {
  const archon = { id: 'archon', name: 'Archon', flags: { char: 1 }, kws: ['Character', 'Infantry'] }
  const haem = { id: 'haemonculus', name: 'Haemonculus', flags: { char: 1 }, kws: ['Character', 'Infantry'] }
  it('takes the named sheet only, apostrophes aside', () => {
    const enh = { name: 'Towering Arrogance', req: [{ fac: ['Drukhari'], ds: 'Archon' }] }
    expect(enhEligible(enh, archon)).toBe(true)
    expect(enhEligible(enh, haem)).toBe(false)
    expect(enhEligible({ name: 'X', req: [{ ds: 'Von Ryan\u2019s Leapers' }] }, { name: "Von Ryan's Leapers", flags: { char: 1 } })).toBe(true)
  })
  it('is one alternative among the groups', () => {
    const enh = { name: 'X', req: [{ ds: 'Archon' }, { kw: ['Haemonculus'] }] }
    expect(enhEligible(enh, archon)).toBe(true)
    expect(enhEligible(enh, { ...haem, kws: [...haem.kws, 'Haemonculus'] })).toBe(true)
    expect(enhEligible(enh, { ...haem, name: 'Succubus' })).toBe(false)
  })
  it('real data: Pact of Cursed Pinions on the Chaos Lord with Jump Pack alone', async () => {
    const rf = (await import('../data/roster/chaos-space-marines.js')).default
    const enh = rf.detachments.flatMap((d) => d.enhancements || []).find((e) => e.name === 'Pact of Cursed Pinions')
    expect(rf.units.filter((u) => enhEligible(enh, u)).map((u) => u.name)).toEqual(['Chaos Lord with Jump Pack'])
  })
  it('real data: an Ork upgrade goes on its own unit, not on every unit of the codex', async () => {
    const rf = (await import('../data/roster/orks.js')).default
    const enh = rf.detachments.flatMap((d) => d.enhancements || []).find((e) => e.name === 'Wimp-kickaz (Upgrade)')
    expect(rf.units.filter((u) => enhEligible(enh, u)).map((u) => u.name)).toEqual(['Nobz'])
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

describe('addUnitEntry / takeUnitEntry', () => {
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
    expect(takeUnitEntry(units, 'a').uid).toBe('u3')
    expect(units.map((u) => u.uid)).toEqual(['u1', 'u2'])
    expect(takeUnitEntry(units, 'nobody')).toBeNull()
  })

  it('lets go of a Leader attached to the unit that left', () => {
    const units = [{ uid: 'u1', id: 'squad' }, { uid: 'u2', id: 'captain', leaderOf: 'u1' }]
    takeUnitEntry(units, 'squad')
    expect(units[0].leaderOf).toBeUndefined()
  })

  // The editor deletes one NAMED line. Two copies of a datasheet are configured separately, so
  // "remove a copy" (what the browser's − means) would take the wrong one half the time.
  it('removes the exact entry when given its uid', () => {
    const units = [{ uid: 'u1', id: 'a', wg: [[0, 1, 1]] }, { uid: 'u2', id: 'a' }, { uid: 'u3', id: 'a' }]
    expect(takeUnitEntry(units, 'a', 'u1').uid).toBe('u1')
    expect(units.map((u) => u.uid)).toEqual(['u2', 'u3'])
    expect(takeUnitEntry(units, 'a', 'gone')).toBeNull()
  })

  it('still detaches a Leader when removing by uid', () => {
    const units = [{ uid: 'u1', id: 'squad' }, { uid: 'u2', id: 'captain', leaderOf: 'u1' }]
    takeUnitEntry(units, 'squad', 'u1')
    expect(units[0].leaderOf).toBeUndefined()
  })
})

// A mis-tap on a trash icon used to cost the whole editing session (Cancel was the only way back).
describe('takeUnitEntry / restoreUnitEntry', () => {
  it('puts the entry back where it stood, with its configuration', () => {
    const units = [{ uid: 'u1', id: 'a' }, { uid: 'u2', id: 'chosen', wg: [[0, 2, 3]] }, { uid: 'u3', id: 'c' }]
    const ticket = takeUnitEntry(units, 'chosen', 'u2')
    expect(units.map((u) => u.uid)).toEqual(['u1', 'u3'])
    expect(restoreUnitEntry(units, ticket)).toBe('u2')
    expect(units.map((u) => u.uid)).toEqual(['u1', 'u2', 'u3'])
    expect(units[1].wg).toEqual([[0, 2, 3]])
  })

  it('gives every Leader that let go its unit back', () => {
    const units = [{ uid: 'u1', id: 'squad' }, { uid: 'u2', id: 'captain', leaderOf: 'u1' }]
    const ticket = takeUnitEntry(units, 'squad', 'u1')
    expect(units[0].leaderOf).toBeUndefined()
    restoreUnitEntry(units, ticket)
    expect(units.find((u) => u.uid === 'u2').leaderOf).toBe('u1')
  })

  it('restores nothing when the uid is already back in the list', () => {
    const units = [{ uid: 'u1', id: 'a' }]
    const ticket = takeUnitEntry(units, 'a', 'u1')
    restoreUnitEntry(units, ticket)
    expect(restoreUnitEntry(units, ticket)).toBeNull()
    expect(units).toHaveLength(1)
  })

  it('has nothing to say about a unit that is not there', () => {
    expect(takeUnitEntry([{ uid: 'u1', id: 'a' }], 'b')).toBeNull()
    expect(restoreUnitEntry([], null)).toBeNull()
  })
})

describe('duplicateUnitEntry', () => {
  it('copies the configuration and lands right after the original', () => {
    const units = [
      { uid: 'u1', id: 'a' },
      { uid: 'u2', id: 'chosen', size: 1, count: 10, wg: [[0, 2, 3]], alleg: 'Khorne' },
      { uid: 'u3', id: 'b' },
    ]
    const copy = duplicateUnitEntry(units, 'u2', 'new')
    expect(units.map((u) => u.uid)).toEqual(['u1', 'u2', 'new', 'u3'])
    expect(copy).toEqual({ uid: 'new', id: 'chosen', size: 1, count: 10, wg: [[0, 2, 3]], alleg: 'Khorne' })
  })

  it('deep-copies the picks, so editing one entry cannot change the other', () => {
    const units = [{ uid: 'u1', id: 'a', wg: [[0, 1, 1]] }]
    const copy = duplicateUnitEntry(units, 'u1', 'new')
    copy.wg[0][2] = 5
    expect(units[0].wg[0][2]).toBe(1)
  })

  // Each of these is unique per ARMY: a copy carrying one is illegal the moment it appears.
  it('drops the warlord title, the enhancement and the attachment', () => {
    const units = [{ uid: 'u1', id: 'squad' }, { uid: 'u2', id: 'captain', size: 0, warlord: true, enh: 'Artificer Armour', leaderOf: 'u1' }]
    const copy = duplicateUnitEntry(units, 'u2', 'new')
    expect(copy).toEqual({ uid: 'new', id: 'captain', size: 0 })
    expect(units[1].warlord).toBe(true) // the original keeps all three
  })

  it('answers null for a uid the list does not hold', () => {
    const units = [{ uid: 'u1', id: 'a' }]
    expect(duplicateUnitEntry(units, 'nobody', 'new')).toBeNull()
    expect(units).toHaveLength(1)
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

// The allowances gen-roster-data.mjs reads out of the instruction where appdata's own table is
// missing or ambiguous (2026-09-19, a player's Raptors: two meltaguns from a group that allows one
// of each, and no second pair at 10 models because the "additional" group drew as a one-of).
describe('the real conditional caps', () => {
  const capOf = async (file, name, pick, entry) => {
    const rf = await import(`../data/roster/${file}.js`)
    const texts = (await import('../data/roster/items.js')).default.texts
    const unit = rf.default.units.find((u) => u.name === name)
    const gi = unit.gear.findIndex((g) => pick.test(texts[g.t]))
    return wargearGroupCap(unit, entry, gi)
  }

  it('Raptors: two special weapons at 5, one of each — and two more only once the squad is 10', async () => {
    expect(await capOf('chaos-space-marines', 'Raptors', /^Up to 2 Raptors/, { size: 0, count: 5 })).toEqual({ limit: 2, dup: 1 })
    expect(await capOf('chaos-space-marines', 'Raptors', /^If this unit contains 10/, { size: 0, count: 5 })).toEqual({ limit: 0, dup: 0 })
    expect(await capOf('chaos-space-marines', 'Raptors', /^If this unit contains 10/, { size: 1, count: 10 })).toEqual({ limit: 2, dup: 1 })
  })

  it('Vespid Stingwings: the three "1 Vespid can replace" bullets are three models, not one', async () => {
    expect(await capOf('tau-empire', 'Vespid Stingwings', /neutron rail rifle/, { size: 1, count: 10 })).toEqual({ limit: 3, dup: 1 })
    expect(await capOf('tau-empire', 'Vespid Stingwings', /neutron rail rifle/, { size: 0, count: 5 })).toEqual({ limit: 0, dup: 0 })
  })

  it('Troupe: two of each pistol under 10 models, four of each from 10', async () => {
    expect(await capOf('aeldari', 'Troupe', /^If this unit contains 9 or fewer/, { size: 0, count: 5 })).toEqual({ limit: 4, dup: 2 })
    expect(await capOf('aeldari', 'Troupe', /^If this unit contains 9 or fewer/, { size: 2, count: 11 })).toEqual({ limit: 8, dup: 4 })
  })

  it('Carnifexes: "any number of models can each be equipped with 1 bio-plasma" is one per model', async () => {
    expect(await capOf('tyranids', 'Carnifexes', /1 bio-plasma/, { size: 1, count: 2 })).toEqual({ limit: 2, dup: 0 })
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

describe('the stock rule — a model cannot give the same item up twice', () => {
  // Chaos Lord with Jump Pack, as shipped: three groups, two of which replace the bolt pistol and
  // two the accursed weapon. Before the rule the editor let all three be ticked at once.
  const lord = {
    sizes: [{ pts: 80, per: [1, 1], default: 1 }],
    defaults: [[0, [[22, 1], [949, 1]]]], // bolt pistol, accursed weapon
    gear: [
      { m: 0, t: 1, in: 'checkbox', o: [[25]], rep: [22] }, // plasma pistol
      { m: 0, t: 2, in: 'checkbox', o: [[952]], rep: [949] }, // power fist
      { m: 0, t: 3, in: 'checkbox', o: [[954]], rep: [22, 949] }, // twin lightning claws
    ],
  }

  it('closes the untouched groups that would replace an item already given up', () => {
    expect(wargearGroupBlocker(lord, { wg: [] }, 2)).toBeNull()
    // Plasma pistol taken: the claws need the bolt pistol, the fist does not.
    expect(wargearGroupBlocker(lord, { wg: [[0, 0, 1]] }, 2)).toEqual({ need: 'stock', ids: [22] })
    expect(wargearGroupBlocker(lord, { wg: [[0, 0, 1]] }, 1)).toBeNull()
    // Claws taken: both single swaps are closed, each naming its own item.
    expect(wargearGroupBlocker(lord, { wg: [[2, 0, 1]] }, 0)).toEqual({ need: 'stock', ids: [22] })
    expect(wargearGroupBlocker(lord, { wg: [[2, 0, 1]] }, 1)).toEqual({ need: 'stock', ids: [949] })
    // A group that already holds a pick is never closed — its pick is what the player would undo.
    expect(wargearGroupBlocker(lord, { wg: [[2, 0, 1]] }, 2)).toBeNull()
  })

  it('reports the double spend on a list built before the rule', () => {
    expect(swapOverdraft(lord, { wg: [[0, 0, 1]] })).toEqual([])
    expect(swapOverdraft(lord, { wg: [[0, 0, 1], [1, 0, 1], [2, 0, 1]] }))
      .toEqual([{ id: 22, used: 2, cap: 1 }, { id: 949, used: 2, cap: 1 }])
  })

  it('reads a group\u2019s picks as one allowance, not one model each', () => {
    // Devastator Sergeant: "bolt pistol and boltgun can be replaced with two different weapons" —
    // two rows in ONE group on one model is the swap taken whole, not the pistol given up twice.
    const sergeant = {
      sizes: [{ pts: 100, per: [1, 1], default: 1 }],
      defaults: [[0, [[1, 1], [5, 1]]]],
      gear: [{ m: 0, t: 1, in: 'checkbox', o: [[30], [31], [32]], rep: [1, 5], lim: [[0, 2, 1]] }],
    }
    expect(swapOverdraft(sergeant, { wg: [[0, 0, 1], [0, 1, 1]] })).toEqual([])
    expect(swapsByMini(sergeant, { wg: [[0, 0, 1], [0, 1, 1]] }, modelsPerMini(sergeant, {})).get('0:1')).toBe(1)
  })

  it('leaves a stepper only the models the other groups have not spent', () => {
    // Terminators, 5 models: any number may swap the combi-bolter for a combi-weapon (stepper),
    // and 1 per 5 may swap it for a heavy weapon. Four combi-weapons leave the heavy one model.
    const terms = {
      sizes: [{ pts: 180, per: [5, 5], default: 1 }],
      defaults: [[0, [[7, 1], [8, 1]]]], // combi-bolter, power fist
      gear: [
        { m: 0, t: 1, in: 'stepper', o: [[9]], rep: [7] }, // combi-weapon
        { m: 0, t: 2, in: 'stepper', o: [[10]], rep: [7], lim: [[0, 1, 1]] }, // heavy weapon
      ],
    }
    expect(swapRoom(terms, { wg: [] }, 1)).toBe(5)
    expect(swapRoom(terms, { wg: [[0, 0, 4]] }, 1)).toBe(1)
    expect(swapRoom(terms, { wg: [[0, 0, 5]] }, 1)).toBe(0)
    expect(wargearGroupBlocker(terms, { wg: [[0, 0, 5]] }, 1)).toEqual({ need: 'stock', ids: [7] })
    // The other way round, the open-ended stepper has four models left.
    expect(swapRoom(terms, { wg: [[1, 0, 1]] }, 0)).toBe(4)
    expect(swapOverdraft(terms, { wg: [[0, 0, 5], [1, 0, 1]] })).toEqual([{ id: 7, used: 6, cap: 5 }])
  })

  it('counts a unit-wide swap against every profile that carries the item', () => {
    const chosen = {
      minis: [{ n: 'Champion' }, { n: 'Chosen' }],
      sizes: [{ pts: 125, per: [5, 5], default: 1, comp: [[0, 1], [1, 4]] }],
      defaults: [[0, [[5, 1]]], [1, [[5, 1]]]], // boltgun on both
      gear: [
        { all: 1, m: 0, t: 1, in: 'stepper', o: [[3]], rep: [5] },
        { all: 1, m: 0, t: 2, in: 'stepper', o: [[4]], rep: [5] },
      ],
    }
    expect(swapRoom(chosen, { wg: [[0, 0, 3]] }, 1)).toBe(2)
    expect(swapOverdraft(chosen, { wg: [[0, 0, 3], [1, 0, 3]] })).toEqual([{ id: 5, used: 6, cap: 5 }])
  })

  it('reports one unit-wide overdraft per item, however many groups overdrew it', () => {
    // CSM Terminators shrunk from ten to five with their picks still on: a heavy weapon, five
    // combi-weapons and paired accursed weapons all spend the combi-bolter. That is seven of five —
    // one line, not two lines that each said six.
    const csm = {
      minis: [{ n: 'Champion' }, { n: 'Terminator' }],
      sizes: [{ pts: 175, per: [5, 5], default: 1, comp: [[0, 1], [1, 4]] }],
      defaults: [[0, [[943, 1], [942, 1]]], [1, [[942, 1], [943, 1]]]], // combi-bolter, accursed weapon
      gear: [
        { m: 1, t: 1, in: 'stepper', o: [[495], [957]], lim: [[0, 1], [10, 2]], rep: [942] },
        { all: 1, t: 2, in: 'stepper', o: [[7]], rep: [942] },
        { all: 1, t: 3, in: 'stepper', o: [[958]], lim: [[0, 1], [10, 2]], rep: [942, 943] },
      ],
    }
    expect(swapOverdraft(csm, { size: 0, wg: [[0, 1, 1], [1, 0, 5], [2, 0, 1]] }))
      .toEqual([{ id: 942, used: 7, cap: 5 }])
  })

  describe('an item the group keeps locked ("cannot be replaced")', () => {
    // Raptors, four and a Champion: "up to 2 Raptors can each have their bolt pistol replaced with
    // 1 plasma pistol (these models' Astartes chainswords cannot be replaced)".
    const raptors = {
      minis: [{ n: 'Raptor Champion' }, { n: 'Raptor' }],
      sizes: [{ pts: 110, per: [5, 5], default: 1, comp: [[0, 1], [1, 4]] }],
      defaults: [[0, [[756, 1], [1, 1]]], [1, [[756, 1], [1, 1]]]], // chainsword, bolt pistol
      gear: [
        { m: 1, t: 1, in: 'stepper', o: [[11]], lim: [[5, 2]], rep: [1], keep: [756] }, // plasma pistol
        { m: 1, t: 2, in: 'stepper', o: [[1017]], lim: [[5, 2]], rep: [756] }, // heavy melee weapon
      ],
    }

    it('takes the kept item out of the stock without taking it off the model', () => {
      expect(swapRoom(raptors, { wg: [[0, 0, 2]] }, 1)).toBe(2)
      expect(swapRoom(raptors, { wg: [[0, 0, 2], [1, 0, 2]] }, 1)).toBe(2)
      const items = { 756: 'Astartes chainsword', 1: 'Bolt pistol' }
      const lines = defaultLoadoutLines(raptors, items, { wg: [[0, 0, 2]] })
      expect(lines[1]).toEqual({ mini: 'Raptor', items: 'Astartes chainsword, Bolt pistol ×2', names: ['Astartes chainsword', 'Bolt pistol'] }) // all four keep it
    })

    it('closes a lock whose item another group already took', () => {
      // Three heavy melee weapons leave one chainsword: one plasma pistol, not two.
      expect(swapRoom(raptors, { wg: [[1, 0, 3]] }, 0)).toBe(1)
      expect(wargearGroupBlocker(raptors, { wg: [[1, 0, 4]] }, 0)).toEqual({ need: 'stock', ids: [756] })
      expect(swapOverdraft(raptors, { wg: [[0, 0, 2], [1, 0, 3]] })).toEqual([{ id: 756, used: 5, cap: 4 }])
    })

    it('locks an item the option hands back', () => {
      // SM Terminators: "1 cyclone missile launcher and 1 storm bolter*" — "*This model's storm
      // bolter cannot be replaced", so it is not back in stock the way a Deathwatch power weapon is.
      const terms = {
        sizes: [{ pts: 170, per: [5, 5], default: 1 }],
        defaults: [[0, [[7, 1], [8, 1]]]], // storm bolter, power fist
        gear: [
          { m: 0, t: 1, in: 'stepper', o: [[20], [[[21, 1], [7, 1]]]], lim: [[0, 1, 1]], rep: [7], keep: [7] },
          { m: 0, t: 2, in: 'stepper', o: [[22]], rep: [7] },
        ],
      }
      expect(swapRoom(terms, { wg: [[0, 1, 1]] }, 1)).toBe(4)
      expect(swapRoom(terms, { wg: [[1, 0, 5]] }, 0, 1)).toBe(0)
    })

    it('locks an item a group adds beside', () => {
      // Battle Sisters: "1 Battle Sister equipped with 1 boltgun can be equipped with 1 simulacrum
      // imperialis (that model's boltgun cannot be replaced)" — no rep at all, only the lock.
      const sisters = {
        sizes: [{ pts: 100, per: [5, 5], default: 1 }],
        defaults: [[0, [[1, 1]]]],
        gear: [
          { m: 0, t: 1, in: 'checkbox', o: [[30]], keep: [1] }, // simulacrum
          { m: 0, t: 2, in: 'stepper', o: [[31]], rep: [1] }, // boltgun → flamer
        ],
      }
      expect(swapRoom(sisters, { wg: [[0, 0, 1]] }, 1)).toBe(4)
      expect(wargearGroupBlocker(sisters, { wg: [[1, 0, 5]] }, 0)).toEqual({ need: 'stock', ids: [1] })
      expect(swapsByMini(sisters, { wg: [[0, 0, 1]] }, modelsPerMini(sisters, {})).get('0:1')).toBeUndefined()
    })
  })

  it('does not count an item the chosen option hands back', () => {
    // Deathwatch Veterans: "boltgun and power weapon" → "power weapon and Astartes shield" keeps
    // the power weapon, so the Watch Sergeant can still trade it for a xenophase blade — the way
    // the GW app builds him. Sizes as shipped: Sergeant + 4 Veterans.
    const dw = {
      minis: [{ n: 'Watch Sergeant' }, { n: 'Deathwatch Veterans' }],
      sizes: [{ pts: 100, per: [5, 5], default: 1, comp: [[0, 1], [1, 4]] }],
      defaults: [[0, [[1, 1], [5, 1]]], [1, [[5, 1], [1, 1]]]], // power weapon, boltgun
      gear: [
        { m: 0, t: 1, in: 'checkbox', o: [[60]], rep: [1] }, // xenophase blade
        { all: 1, m: 0, t: 2, in: 'stepper', lim: [[5, 2]], rep: [5, 1], o: [[[[5, 1], [61, 1]]], [[[1, 1], [61, 1]]]] }, // boltgun+shield / power weapon+shield
      ],
    }
    // Two shields kept with the power weapon: the power weapon stock is untouched.
    expect(swapOverdraft(dw, { wg: [[1, 1, 2], [0, 0, 1]] })).toEqual([])
    expect(swapRoom(dw, { wg: [[1, 1, 2]] }, 0)).toBe(1)
    // Room is asked per option: the "power weapon + shield" row needs boltguns only.
    const allBlades = { wg: [[0, 0, 1]] }
    expect(swapRoom(dw, allBlades, 1, 0)).toBe(4) // keeps the boltgun, needs a power weapon: one is gone
    expect(swapRoom(dw, allBlades, 1, 1)).toBe(5) // keeps the power weapon, needs a boltgun: all five there
  })

  it('never closes what it cannot count', () => {
    // A per-copy group (the Wraithlord's two flamers), and an item the printed loadout does not
    // carry (a chained swap): both stay open, as they always were.
    const wraithlord = {
      sizes: [{ pts: 140, per: [1, 1], default: 1 }],
      defaults: [[0, [[40, 2]]]],
      gear: [{ m: 0, t: 1, in: 'stepper', cp: 2, o: [[41]], rep: [40] }, { m: 0, t: 2, in: 'checkbox', o: [[42]], rep: [40] }],
    }
    expect(swapRoom(wraithlord, { wg: [[1, 0, 1]] }, 0)).toBeNull()
    const chained = {
      sizes: [{ pts: 50, per: [1, 1], default: 1 }],
      defaults: [[0, [[1, 1]]]],
      gear: [{ m: 0, t: 1, in: 'checkbox', o: [[2]], rep: [1] }, { m: 0, t: 2, in: 'checkbox', o: [[3]], rep: [2] }],
    }
    expect(swapRoom(chained, { wg: [[0, 0, 1]] }, 1)).toBeNull()
    expect(wargearGroupBlocker(chained, { wg: [[0, 0, 1]] }, 1)).toBeNull()
  })
})

// Item ids are interned across every faction and renumber whenever a bump adds weapons anywhere
// (app data 963 moved every one of these), so the real-data cases below name an item and look its
// id up among the unit's own items, where a name is unambiguous.
const unitItemId = (def, items, name) => {
  const ids = new Set()
  for (const [, list] of def.defaults || []) for (const [id] of list) ids.add(id)
  const walk = (x) => (Array.isArray(x) ? x.forEach(walk) : typeof x === 'number' && ids.add(x))
  for (const g of def.gear) walk(g.o)
  const hits = [...ids].filter((id) => items[id] === name)
  if (hits.length !== 1) throw new Error(`${def.id}: ${hits.length} items named ${name}`)
  return hits[0]
}

// A player's report, 2026-09-24: CSM Terminators built at ten and dropped to five kept a heavy
// weapon, five combi-weapons and paired accursed weapons — seven combi-bolters given up on five.
describe('the real CSM Terminators, shrunk under their picks', () => {
  it('trims the excess, latest picks first, and marks what is over until then', async () => {
    const rf = await import('../data/roster/chaos-space-marines.js')
    const items = (await import('../data/roster/items.js')).default.items
    const terms = rf.default.units.find((u) => u.id === 'chaos-terminator-squad')
    const gi = (t) => terms.gear.findIndex((g) => g.o.some((o) => o[0] === t))
    const heavy = terms.gear.findIndex((g) => g.m === 1 && g.o.length === 2)
    const combi = gi(unitItemId(terms, items, 'Combi-weapon'))
    const paired = gi(unitItemId(terms, items, 'Paired accursed weapons'))
    // As the player left it: ten models, then the 5-model bracket.
    const e = { id: terms.id, size: 0, wg: [[heavy, 1, 1], [combi, 0, 5], [paired, 0, 1]] }
    expect(swapOverdraft(terms, e)).toEqual([{ id: unitItemId(terms, items, 'Combi-bolter'), used: 7, cap: 5 }])
    // All three spend the same combi-bolters, so all three are marked: any of them is a way down.
    expect([...overdrawnGroups(terms, e)].sort()).toEqual([heavy, combi, paired].sort())
    // Latest first: the paired weapons go, then one combi-weapon — five combi-bolters, five swaps.
    const wg = fitWargear(terms, e)
    expect(wg).toEqual([[heavy, 1, 1], [combi, 0, 4]])
    expect(swapOverdraft(terms, { ...e, wg })).toEqual([])
    expect(overdrawnGroups(terms, { ...e, wg }).size).toBe(0)
    expect(fitWargear(terms, { ...e, wg })).toBeNull()
  })

  it('brings a group back under its own ceiling', async () => {
    const rf = await import('../data/roster/chaos-space-marines.js')
    const terms = rf.default.units.find((u) => u.id === 'chaos-terminator-squad')
    const heavy = terms.gear.findIndex((g) => g.m === 1 && g.o.length === 2)
    // Two heavy weapons are allowed at ten, one at five.
    expect(fitWargear(terms, { size: 0, wg: [[heavy, 0, 1], [heavy, 1, 1]] })).toEqual([[heavy, 0, 1]])
  })
})

// The Raptors' plasma pistols lock the chainsword of the model that took them — a player asked
// whether four Raptors could take two pistols and still trade all four chainswords (they cannot).
describe('the real Raptors lock', () => {
  it('leaves two chainswords to trade after two plasma pistols', async () => {
    const rf = await import('../data/roster/chaos-space-marines.js')
    const items = (await import('../data/roster/items.js')).default.items
    const raptors = rf.default.units.find((u) => u.id === 'raptors')
    const plasma = raptors.gear.findIndex((g) => g.m === 1 && g.keep)
    const heavyMelee = raptors.gear.findIndex((g) => g.m === 1 && g.o[0][0] === unitItemId(raptors, items, 'Heavy melee weapon'))
    expect(swapRoom(raptors, { size: 0, wg: [[plasma, 0, 2]] }, heavyMelee)).toBe(2)
  })
})

describe('defaultLoadoutLines on a partial swap of copies', () => {
  it('keeps the copies a pick did not take (Wraithlord: one flamer for one of two catapults)', () => {
    const lord = {
      id: 'lord', sizes: [{ pts: 10, per: [1, 1] }],
      defaults: [[0, [[1, 2]]]],
      gear: [{ m: 0, t: 1, in: 'stepper', o: [[3]], cp: 2, rep: [1] }],
    }
    const items = { 1: 'Shuriken catapult', 3: 'Flamer' }
    expect(defaultLoadoutLines(lord, items, { size: 0, wg: [[0, 0, 1]] })[0].items).toBe('Shuriken catapult ×1')
    expect(defaultLoadoutLines(lord, items, { size: 0, wg: [[0, 0, 2]] })).toEqual([])
  })
})

describe('an "X or Y" swap on a profile whose models are not alike (alt)', () => {
  // Havocs: a champion, then four Havocs — two with autocannons, two with lascannons (profile
  // totals) — and "any number of Havocs can each have their autocannon or lascannon replaced".
  // Until 2026-10-03 that group replaced nothing and four heavy bolters sat beside four heavy
  // weapons (a player's report).
  const havocs = {
    minis: [{ n: 'Havoc Champion' }, { n: 'Havoc' }],
    sizes: [{ pts: 135, per: [5, 5], default: 1, comp: [[0, 1], [1, 4]] }],
    defaults: [[1, [[1, 2, 1], [3, 1], [2, 2, 1]]], [0, [[4, 1]]]],
    gear: [{ m: 1, t: 1, in: 'stepper', o: [[1], [5], [2]], rep: [1, 2], alt: 1 }],
  }
  const items = { 1: 'Autocannon', 2: 'Lascannon', 3: 'Close combat weapon', 4: 'Flamer', 5: 'Heavy bolter' }
  const havocLine = (wg) => defaultLoadoutLines(havocs, items, { size: 0, wg }).find((l) => l.mini === 'Havoc')?.items

  it('prints the two halves of the profile as they are', () => {
    expect(havocLine([])).toBe('Autocannon ×2, Close combat weapon, Lascannon ×2')
  })

  it('spends each pick on ONE of the two weapons, never both', () => {
    expect(havocLine([[0, 1, 2]])).toBe('Close combat weapon, Lascannon ×2')
    expect(havocLine([[0, 1, 4]])).toBe('Close combat weapon')
    expect(swapOverdraft(havocs, { size: 0, wg: [[0, 1, 4]] })).toEqual([])
  })

  it('takes a pick for the weapon a model already has from the OTHER half first', () => {
    // Two "autocannon" picks are the two lascannon Havocs changing weapons; the option's own
    // autocannons are added back on top by the readers (removed is gross).
    expect(havocLine([[0, 0, 2]])).toBe('Autocannon ×2, Close combat weapon')
  })

  it('pools both halves as the room the group has, and reports a pick past it', () => {
    expect(swapRoom(havocs, { size: 0, wg: [] }, 0)).toBe(4)
    expect(swapOverdraft(havocs, { size: 0, wg: [[0, 1, 5]] })).not.toEqual([])
  })
})

describe('a swap that reaches a profile-total line', () => {
  // Seven of nine Navis Armsmen carry the shotgun — a total, not one per model. It used to be no
  // stock at all, so a swap took nothing off it.
  const breachers = {
    minis: [{ n: 'Sergeant' }, { n: 'Armsman' }],
    sizes: [{ pts: 100, per: [10, 10], default: 1, comp: [[0, 1], [1, 9]] }],
    defaults: [[0, [[3, 1]]], [1, [[1, 7, 1], [2, 1]]]],
    gear: [{ m: 1, t: 1, in: 'checkbox', o: [[4]], rep: [1] }],
  }
  const items = { 1: 'Navis shotgun', 2: 'Close combat weapon', 3: 'Bolt pistol', 4: 'Meltagun' }

  it('takes one copy off per model that swapped', () => {
    const line = defaultLoadoutLines(breachers, items, { size: 0, wg: [[0, 0, 1]] }).find((l) => l.mini === 'Armsman')
    expect(line.items).toBe('Navis shotgun ×6, Close combat weapon')
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
      { all: 1, t: 3, in: 'stepper', o: [[5]], rep: [2] },         // unit-wide: either profile may take it
    ],
  }
  const items = { 1: 'Boltgun', 2: 'Bolt pistol', 3: 'Power weapon', 4: 'Flamer', 5: 'Plasma pistol' }

  it('spends a swap against the profile that owns the group', () => {
    const lines = defaultLoadoutLines(sisters, items, { size: 0, count: 10, wg: [[0, 0, 1]] })
    expect(lines[0]).toEqual({ mini: 'Sister Superior', items: 'Bolt pistol', names: ['Bolt pistol'] })
    expect(lines[1]).toEqual({ mini: 'Battle Sister', items: 'Boltgun, Bolt pistol', names: ['Boltgun', 'Bolt pistol'] })
  })

  it('counts a stepper against that profile, not the whole squad', () => {
    // 3 of the 9 Battle Sisters swap; the Superior's own boltgun is untouched.
    const lines = defaultLoadoutLines(sisters, items, { size: 0, count: 10, wg: [[1, 0, 3]] })
    expect(lines[1]).toEqual({ mini: 'Battle Sister', items: 'Boltgun ×6, Bolt pistol', names: ['Boltgun', 'Bolt pistol'] })
  })

  // A unit-wide group (appdata's bullet, recorded once per profile and folded by the generator)
  // used to subtract nothing at all, so a Chosen squad kept five accursed weapons AND the power
  // fist that replaced one. It belongs to no profile, so which one gave the item up is a display
  // convention: the biggest first, spilling into the next once one is spent, and never past what a
  // profile fields.
  it('spends a unit-wide swap against the biggest profile', () => {
    const lines = defaultLoadoutLines(sisters, items, { size: 0, count: 10, wg: [[2, 0, 4]] })
    expect(lines[0]).toEqual({ mini: 'Sister Superior', items: 'Boltgun, Bolt pistol', names: ['Boltgun', 'Bolt pistol'] })
    expect(lines[1]).toEqual({ mini: 'Battle Sister', items: 'Boltgun, Bolt pistol ×5', names: ['Boltgun', 'Bolt pistol'] })
  })

  it('spills into the next profile once the biggest is spent, and stops there', () => {
    const removed = swapsByMini(sisters, { size: 0, count: 10, wg: [[2, 0, 12]] }, modelsPerMini(sisters, { size: 0, count: 10 }))
    expect(removed.get('1:2')).toBe(9)
    expect(removed.get('0:2')).toBe(1)
  })

  it('charges a profile its own swaps before a unit-wide one', () => {
    // The Superior trades her boltgun; the unit-wide group replaces bolt pistols, so the two never
    // compete — but a group whose profile is already spent must not be charged twice either.
    const entry = { size: 0, count: 10, wg: [[0, 0, 1], [2, 0, 10]] }
    const removed = swapsByMini(sisters, entry, modelsPerMini(sisters, entry))
    expect(removed.get('0:1')).toBe(1)
    expect(removed.get('1:2')).toBe(9)
    expect(removed.get('0:2')).toBe(1)
  })

  it('names the profile a unit-wide pick is shown under — the one that gave the weapon up', () => {
    expect(pickMiniFor(sisters, { size: 0, count: 10 }, 2)).toBe(1)
    expect(pickMiniFor(sisters, { size: 0, count: 10 }, 0)).toBe(0)
  })
})

// One army, one Force Disposition: the card selected after mustering, whose symbols name each
// player's Primary Mission. A detachment gives access to one or more (`fds`); an army offered more
// than one has to declare which it plays.
describe('the army’s Force Disposition', () => {
  const takeAndHold = { name: 'Gladius Task Force', fds: ['Take and Hold'] }
  const purge = { name: 'Anvil Siege Force', fds: ['Purge the Foe'] }
  const alsoPurge = { name: 'Vanguard Spearhead', fds: ['Purge the Foe'] }

  it('lists what the chosen detachments offer, once each', () => {
    expect(dispositionCandidates([])).toEqual([])
    expect(dispositionCandidates([purge, alsoPurge])).toEqual(['Purge the Foe'])
    expect(dispositionCandidates([takeAndHold, purge])).toEqual(['Take and Hold', 'Purge the Foe'])
  })

  it('needs no declaration when the detachments agree', () => {
    expect(dispositionOf({}, [purge, alsoPurge])).toBe('Purge the Foe')
  })

  it('is the declaration when they disagree, and nothing until one is made', () => {
    const dets = [takeAndHold, purge]
    expect(dispositionOf({}, dets)).toBeNull()
    expect(dispositionOf({ disposition: 'Purge the Foe' }, dets)).toBe('Purge the Foe')
  })

  // Core rules 25.04: "each one will give you access to different force dispositions". One
  // detachment with two (Warpbane Task Force — a player's report, 2026-10-01) is a choice on its own.
  it('asks for a declaration when one detachment gives access to two', () => {
    const warpbane = { name: 'Warpbane Task Force', fds: ['Take and Hold', 'Purge the Foe'] }
    expect(dispositionCandidates([warpbane])).toEqual(['Take and Hold', 'Purge the Foe'])
    expect(dispositionOf({}, [warpbane])).toBeNull()
    expect(dispositionOf({ disposition: 'Purge the Foe' }, [warpbane])).toBe('Purge the Foe')
    expect(dispositionCandidates([warpbane, purge])).toEqual(['Take and Hold', 'Purge the Foe'])
  })

  // Self-healing: a list must never claim a disposition it no longer fields, and dropping the
  // detachment behind a declaration is exactly how that happens.
  it('ignores a declaration the list no longer fields', () => {
    expect(dispositionOf({ disposition: 'Take and Hold' }, [purge, alsoPurge])).toBe('Purge the Foe')
    expect(dispositionOf({ disposition: 'Reconnaissance' }, [takeAndHold, purge])).toBeNull()
    expect(dispositionOf({ disposition: 'Take and Hold' }, [])).toBeNull()
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

// A player's report (05870f4a, 2026-09-21): two copies of a squad with a character added between
// them sat apart, and the only way to bring them together was to delete one and add it again.
// A section now reads like the catalogue — by name — and the entries themselves are not moved,
// so the copy tax still falls on the copy added second.
describe('a section reads by name', () => {
  const squad = { id: 'strike-squad', name: 'Strike Squad', kws: ['Battleline'], flags: {}, sizes: [{ pts: 100, per: [5, 5] }] }
  const terms = { id: 'terminator-squad', name: 'Terminator Squad', kws: ['Infantry'], flags: {}, sizes: [{ pts: 200, per: [5, 5] }] }
  const brothers = { id: 'brotherhood', name: 'Brotherhood Terminators', kws: ['Infantry'], flags: {}, sizes: [{ pts: 180, per: [5, 5] }] }
  const faction = { units: [squad, terms, brothers], allies: [] }
  const defOf = (id) => faction.units.find((u) => u.id === id)

  it('sorts a section by datasheet name and keeps the copies of one datasheet in adding order', () => {
    const items = [
      { uid: 't1', id: 'terminator-squad' },
      { uid: 'b1', id: 'brotherhood' },
      { uid: 't2', id: 'terminator-squad' },
    ]
    const sec = sectionsOf(items, { faction, defOf }).find((s) => s.id === 'infantry')
    expect(sec.items.map((i) => i.uid)).toEqual(['b1', 't1', 't2'])
    expect(items.map((i) => i.uid)).toEqual(['t1', 'b1', 't2']) // the roster itself is not reordered
  })

  it('orders the catalogue the same way', () => {
    const secs = sectionsOf([terms, brothers], { faction })
    expect(secs.find((s) => s.id === 'infantry').items.map((u) => u.id)).toEqual(['brotherhood', 'terminator-squad'])
  })

  it('is a stable sort by name, unnamed items first', () => {
    const list = [{ n: 'b', k: 1 }, { n: 'a', k: 2 }, { n: null, k: 3 }, { n: 'a', k: 4 }]
    expect(orderedByName(list, (x) => x.n).map((x) => x.k)).toEqual([3, 2, 4, 1])
  })
})

describe('attached units read as one block', () => {
  // Core rules 19.01: a Leader and the unit it joined are ONE unit. Filed by battlefield role
  // they landed in different sections, and the more important the character the further apart:
  // an Epic Hero at the top of the list, its squad at the bottom.
  const lord = { id: 'lord', name: 'Chaos Lord', kws: ['Character'], flags: { char: 1 }, sizes: [{ pts: 95, per: [1, 1] }] }
  const abaddon = { id: 'abaddon', name: 'Abaddon', kws: ['Character'], flags: { char: 1, epic: 1 }, sizes: [{ pts: 265, per: [1, 1] }] }
  const legionaries = { id: 'legionaries', name: 'Legionaries', kws: ['Battleline'], flags: {}, sizes: [{ pts: 180, per: [10, 10] }] }
  const helbrute = { id: 'helbrute', name: 'Helbrute', kws: ['Vehicle'], flags: {}, sizes: [{ pts: 140, per: [1, 1] }] }
  const troupe = { id: 'aeldari:troupe', name: 'Troupe', kws: ['Infantry'], flags: {}, sizes: [{ pts: 120, per: [6, 6] }] }
  const seer = { id: 'aeldari:shadowseer', name: 'Shadowseer', kws: ['Character'], flags: { char: 1 }, sizes: [{ pts: 85, per: [1, 1] }] }
  const faction = {
    units: [lord, abaddon, legionaries, helbrute, troupe, seer],
    allies: [{ key: 'harlequins', name: 'Harlequins', ids: [troupe.id, seer.id] }],
  }
  const defOf = (id) => faction.units.find((u) => u.id === id)
  const ids = (secs, id) => (secs.find((s) => s.id === id)?.items || []).map((i) => i.uid)

  // One place to read the army's whole units in. Gathering the blocks in place instead — each
  // under its host's own role — was tried on 2026-09-23 and the owner asked for the section back.
  it('moves a bodyguard and its leaders into one section, host first', () => {
    const items = [
      { uid: 'lord', id: 'lord', leaderOf: 'legio' },
      { uid: 'legio', id: 'legionaries' },
      { uid: 'brute', id: 'helbrute' },
    ]
    const secs = sectionsOf(items, { faction, defOf, pairAttached: true })
    expect(ids(secs, 'attached')).toEqual(['legio', 'lord'])
    expect(ids(secs, 'characters')).toEqual([])
    expect(ids(secs, 'battleline')).toEqual([])
    expect(ids(secs, 'vehicles')).toEqual(['brute']) // everything else is filed by its own type
  })

  it('takes an Epic Hero out of the top section to sit with its squad', () => {
    const items = [{ uid: 'abn', id: 'abaddon', leaderOf: 'legio' }, { uid: 'legio', id: 'legionaries' }]
    const secs = sectionsOf(items, { faction, defOf, pairAttached: true })
    expect(ids(secs, 'attached')).toEqual(['legio', 'abn'])
    expect(ids(secs, 'epic')).toEqual([])
  })

  // A chain — Huron leading the Masters of the Maelstrom that Support the Chosen, which is legal —
  // drew the middle unit twice (a player's report, 2026-09-24). One block under the root, every
  // unit once.
  it('draws a chain of attachments as one block, each unit once', () => {
    const items = [
      { uid: 'legio', id: 'legionaries' },
      { uid: 'lord', id: 'lord', leaderOf: 'legio' },
      { uid: 'abn', id: 'abaddon', leaderOf: 'lord' },
    ]
    const got = ids(sectionsOf(items, { faction, defOf, pairAttached: true }), 'attached')
    expect(got).toHaveLength(3)
    expect(new Set(got).size).toBe(3)
    expect(got[0]).toBe('legio')
    // …and the block's total and root take in the whole chain.
    const pts = { legio: 180, lord: 95, abn: 265 }
    expect(hostBlockTotal(items, items[0], (x) => pts[x.uid])).toBe(540)
    expect(blockRootUid(items, items[2])).toBe('legio')
  })

  it('keeps several characters on one host together, by name like everything else', () => {
    const items = [
      { uid: 'lord', id: 'lord', leaderOf: 'legio' },
      { uid: 'legio', id: 'legionaries' },
      { uid: 'abn', id: 'abaddon', leaderOf: 'legio' },
    ]
    expect(ids(sectionsOf(items, { faction, defOf, pairAttached: true }), 'attached')).toEqual(['legio', 'abn', 'lord'])
  })

  // Blocks follow their hosts' names, whatever order the pairs were built in.
  it('orders the blocks by their hosts', () => {
    const items = [
      { uid: 'lord', id: 'lord', leaderOf: 'legio' },
      { uid: 'legio', id: 'legionaries' },
      { uid: 'abn', id: 'abaddon', leaderOf: 'brute' },
      { uid: 'brute', id: 'helbrute' },
    ]
    expect(ids(sectionsOf(items, { faction, defOf, pairAttached: true }), 'attached')).toEqual(['brute', 'abn', 'legio', 'lord'])
  })

  it('leaves an unattached character where it was', () => {
    const items = [{ uid: 'lord', id: 'lord' }, { uid: 'legio', id: 'legionaries' }]
    const secs = sectionsOf(items, { faction, defOf, pairAttached: true })
    expect(ids(secs, 'attached')).toEqual([])
    expect(ids(secs, 'characters')).toEqual(['lord'])
    expect(ids(secs, 'battleline')).toEqual(['legio'])
  })

  it('gathers an allied pair inside its own group instead of moving it out', () => {
    // The ally heading carries that group's own accounting — a unit that belongs to one must not
    // leave it. Host first is all the block needs there.
    const items = [
      { uid: 'seer', id: 'aeldari:shadowseer', leaderOf: 'troupe' },
      { uid: 'troupe', id: 'aeldari:troupe' },
    ]
    const secs = sectionsOf(items, { faction, defOf, pairAttached: true })
    expect(ids(secs, 'ally:harlequins')).toEqual(['troupe', 'seer'])
    expect(ids(secs, 'attached')).toEqual([])
  })

  it('does nothing at all unless asked', () => {
    const items = [{ uid: 'lord', id: 'lord', leaderOf: 'legio' }, { uid: 'legio', id: 'legionaries' }]
    const secs = sectionsOf(items, { faction, defOf }) // the add-units browser's call
    expect(ids(secs, 'characters')).toEqual(['lord'])
    expect(ids(secs, 'battleline')).toEqual(['legio'])
  })

  // Blocks are numbered in reading order across the sections, for the default name both the
  // editor's list and the view print over them.
  it('numbers the attached blocks across the whole list', () => {
    const groups = [
      { entries: [{ uid: 'a' }, { uid: 'l1', leaderOf: 'a' }, { uid: 'solo' }] },
      { entries: [{ uid: 'b' }, { uid: 'l2', leaderOf: 'b' }] },
    ]
    expect([...blockNumbers(groups)]).toEqual([['a', 1], ['b', 2]])
  })

  // Asked of the HOST — the number goes on the block's head line.
  it('totals the block from its host, and only when there is a block', () => {
    const entries = [{ uid: 'legio' }, { uid: 'lord', leaderOf: 'legio' }, { uid: 'abn', leaderOf: 'legio' }]
    const pts = { legio: 180, lord: 95, abn: 265 }
    const of = (x) => pts[x.uid]
    expect(hostBlockTotal(entries, entries[0], of)).toBe(540)
    expect(hostBlockTotal(entries, entries[1], of)).toBeNull() // a character is not a host
    expect(hostBlockTotal([{ uid: 'alone' }], { uid: 'alone' }, () => 80)).toBeNull() // nothing joined it
  })
})

// The editor must offer exactly what the validator accepts — both go through grantedKeywords().
describe('an enhancement whose keyword a detachment grants', () => {
  // Was Rollin' Deff granting WAGON to the Kill Rig until Codex: Orks both retired that
  // detachment and started PRINTING Wagon on the datasheets, which is exactly the case this
  // guards against. Then Fulguris Task Force granting SPEEDER to the Land Speeder, until Codex:
  // Space Marines (app data 963) retired that detachment too. Death Guard's Contagion Engines
  // grants CONTAGION ENGINES the same way, and the Helbrute does not print it.
  it("offers Contagion Engines' upgrades to the Helbrute it made a Contagion Engine", async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const dg = await loadRosterFaction('death-guard')
    const det = dg.detachments.find((d) => d.name === 'Contagion Engines')
    const helbrute = dg.units.find((u) => u.id === 'helbrute')
    const crawler = dg.units.find((u) => u.id === 'plagueburst-crawler')
    const upgrade = 'Parasitic Woe\u2011reaper (Upgrade)'
    const eligible = (def) => enhOptionsFor(def, [det], [], null, 'death-guard').filter((o) => o.eligible).map((o) => o.name)
    expect(eligible(helbrute)).toContain(upgrade)
    expect(eligible(crawler)).not.toContain(upgrade)
    // and without the faction to look the grant up in, the printed sheet is all there is
    expect(enhOptionsFor(helbrute, [det], [], null).filter((o) => o.eligible).map((o) => o.name)).not.toContain(upgrade)
  })
})

describe('entrySummary', () => {
  // The Warlord's mark on the read-only view's rows. It was a bare '★' until 2026-08-28, when the
  // star was given to "I own this model" (useCollection.js) — and a lone symbol on its own line
  // said less than the word does anyway.
  it('names the Warlord in the caller\u2019s locale, ahead of the size and the upgrades', () => {
    const e = { uid: 'u1', id: 'intercessor-squad', size: 1, warlord: true, wg: [[0, 0, 1]] }
    expect(entrySummary(e, intercessor, 'моделей', 'улучшений', 'Варлорд'))
      .toBe('Варлорд · 6 моделей · 1 улучшений')
  })

  it('says nothing about a unit that is not the Warlord', () => {
    const e = { uid: 'u1', id: 'captain', size: 0 }
    expect(entrySummary(e, captain, 'models', 'upgrades', 'Warlord')).toBe('')
  })
})

// ── The player's own notes ──
//
// Free text hung on a list for PLANNING ("rapid ingress T2"). Nothing here is a rule, so the only
// things worth pinning are where a note is written to and when it is gone.
describe('notes', () => {
  it('trims a note, folds its whitespace and caps its length', () => {
    const e = {}
    setNote(e, 'note', '  rapid   ingress\n T2  ')
    expect(e.note).toBe('rapid ingress T2')
    setNote(e, 'note', 'x'.repeat(200))
    expect(e.note).toHaveLength(ENTRY_NOTE_MAX)
  })

  // Absent, not empty: every reader treats a missing field as "no note", which is also what lets
  // this ship without a schema bump.
  it('removes the field when the note is cleared', () => {
    const e = { note: 'screen' }
    setNote(e, 'note', '   ')
    expect('note' in e).toBe(false)
  })

})

// Core rules 25.03 and the note at the foot of 25.04: "If you are playing an Incursion battle, you
// can select a 3DP detachment as your only detachment."
describe('dpLimitFor', () => {
  it('is 3 for a lone 3 DP detachment at Incursion', () => {
    expect(dpLimitFor([{ dp: 3 }], 2)).toBe(3)
  })
  it('keeps the real budget for a lone detachment that fits — no room is promised for a second', () => {
    expect(dpLimitFor([{ dp: 1 }], 2)).toBe(2)
  })
  it('keeps the real budget beside a second detachment', () => {
    expect(dpLimitFor([{ dp: 2 }, { dp: 1 }], 2)).toBe(2)
  })
  it('is the battle\'s budget at Strike Force', () => {
    expect(dpLimitFor([{ dp: 3 }], 3)).toBe(3)
    expect(dpLimitFor([], 3)).toBe(3)
  })
})

// Every instruction with list markers comes apart into a head and its bullets — in BOTH locales.
// The Faction Pack transcriptions mark theirs with `▪`, which the reader did not know, and 114
// Legends instructions ran their whole list into the heading (2026-10-07).
describe('splitInstruction — every marked list in the data', () => {
  it('leaves no list marker inside a head', async () => {
    const { default: rosterItemsData } = await import('../data/roster/items.js')
    const { default: ru } = await import('../data/roster/ru/texts.js')
    const bad = []
    for (const [id, t] of [...Object.entries(rosterItemsData.texts), ...Object.entries(ru)]) {
      if (/[◦•■▪▫]/.test(splitInstruction(t).head)) bad.push(id)
    }
    expect(bad).toEqual([])
  })
})

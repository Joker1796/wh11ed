import { describe, it, expect, beforeAll } from 'vitest'
import { validateRoster, duplicateLimit } from './rosterValidation.js'
import { fitWargear, perModelFits, perModelRoom, wargearExclOver, wargearExclRoom } from './rosterEngine.js'

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

  // A unit that is only Battleline under some Detachment (29 of them in the game) doubles ONLY
  // in an army whose Detachment actually grants it. Reading the datasheet's own `condBattleline`
  // flag as the answer is what let a Blitz Brigade list field six Warbikers.
  it('conditional battleline doubles only where the army grants the keyword', () => {
    const warbikers = { id: 'warbikers', kws: ['Mounted'], flags: {}, condBattleline: 1 }
    expect(duplicateLimit(warbikers, 3, [])).toBe(3)
    expect(duplicateLimit(warbikers, 3, ['Battleline'])).toBe(6)
    // A caller with no detachments in hand passes nothing and keeps the pre-gate reading.
    expect(duplicateLimit(warbikers, 3)).toBe(6)
  })
})

describe('validateRoster — no limit and the archive', () => {
  const crowd = () => [U('marneus'), U('marneus'), ...Array.from({ length: 30 }, () => U('ballistus-dreadnought'))]
  it('a list with no limit is never over points, DP or duplicates', () => {
    const list = roster({ battleSize: 'none', units: crowd() })
    const { points, issues } = validateRoster(list, { faction, core })
    expect(points).toBeGreaterThan(2000)
    expect(issues.map((i) => i.code)).not.toEqual(expect.arrayContaining(['overPoints']))
    expect(issues.map((i) => i.code).filter((c) => c === 'overDuplicate')).toHaveLength(1) // Marneus: EPIC HERO, not a size limit
  })
  it('holds a custom list to the player\u2019s own limits', () => {
    const list = roster({ battleSize: 'custom', customPoints: 2000, customLimits: { dup: 1, line: 3 },
      units: [U('ballistus-dreadnought'), U('ballistus-dreadnought'), ...Array.from({ length: 4 }, () => U('intercessor-squad'))] })
    const dups = validateRoster(list, { faction, core }).issues.filter((i) => i.code === 'overDuplicate')
    expect(dups.map((i) => i.params.limit).sort()).toEqual([1, 3])
    expect(duplicateLimit(intercessor, { dupLimit: 1, lineLimit: 3 })).toBe(3)
    expect(duplicateLimit(intercessor, 3)).toBe(6)
  })
  it('an archived list is priced but never judged', () => {
    const list = roster({ archived: true, faction: null, units: crowd() })
    expect(validateRoster(list, { faction, core })).toMatchObject({ issues: [], errorCount: 0 })
    expect(codes({ ...list, archived: undefined }).length).toBeGreaterThan(0)
  })
  it('a list with its checks switched off is priced but never judged — warnings included', () => {
    const list = roster({ checkLegality: false, faction: null, units: crowd() })
    const res = validateRoster(list, { faction, core })
    expect(res).toMatchObject({ issues: [], errorCount: 0 })
    expect(res.points).toBeGreaterThan(0)
    expect(codes({ ...list, checkLegality: true })).toContain('noFaction')
  })
})

describe('validateRoster — completeness', () => {
  it('warns when faction or detachment is missing', () => {
    expect(codes({ ...roster(), faction: null })).toContain('noFaction')
    expect(codes({ ...roster(), detachments: [] })).toContain('noDetachment')
  })

  // A codex retires detachments by name; a list saved before it keeps the name and would otherwise
  // read as playing nothing while its header still names the old one.
  it('flags a detachment the faction no longer has', () => {
    const issues = validateRoster({ ...roster(), detachments: ['Gladius', 'Vanguard Spearhead'] }, { faction, core }).issues
    const gone = issues.filter((i) => i.code === 'detachmentGone')
    expect(gone).toHaveLength(1)
    expect(gone[0]).toMatchObject({ level: 'error', params: { name: 'Vanguard Spearhead' } })
    expect(codes(roster())).not.toContain('detachmentGone')
  })

  // An army plays ONE Force Disposition. Detachments that disagree leave a choice the player still
  // owes — and everything downstream (the export's own line, the printed header, the game the list
  // is handed to) reads that answer, so the list is where it has to be made.
  it('asks for a declaration when the detachments offer more than one disposition', () => {
    const twoDets = {
      ...faction,
      detachments: [{ ...detachment, fds: ['Take and Hold'] }, { ...detachment, name: 'Anvil', fds: ['Purge the Foe'] }],
    }
    const r = { ...roster(), detachments: ['Gladius', 'Anvil'] }
    const codesWith = (over) => validateRoster({ ...r, ...over }, { faction: twoDets, core }).issues
    expect(codesWith({}).find((i) => i.code === 'dispositionUndeclared')?.level).toBe('warn')
    expect(codesWith({}).find((i) => i.code === 'dispositionUndeclared').params.options)
      .toBe('Take and Hold, Purge the Foe')
    expect(codesWith({ disposition: 'Purge the Foe' }).map((i) => i.code)).not.toContain('dispositionUndeclared')
  })

  it('says nothing when the chosen detachments agree about it', () => {
    const oneFd = { ...faction, detachments: [{ ...detachment, fds: ['Take and Hold'] }] }
    expect(validateRoster(roster(), { faction: oneFd, core }).issues.map((i) => i.code))
      .not.toContain('dispositionUndeclared')
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

  it('flags an item given up by more models than carry it', () => {
    const lord = {
      id: 'lord', name: 'Lord', kws: ['Character', 'Infantry'], flags: { char: 1 },
      sizes: [{ pts: 80, per: [1, 1], default: 1 }],
      defaults: [[0, [[22, 1], [949, 1]]]],
      gear: [
        { m: 0, t: 1, in: 'checkbox', o: [[25]], rep: [22] },
        { m: 0, t: 2, in: 'checkbox', o: [[954]], rep: [22, 949] },
      ],
    }
    const ff = { ...faction, units: [...faction.units, lord] }
    const items = { 22: 'Bolt pistol', 949: 'Accursed weapon' }
    const run = (wg) => validateRoster(roster({ units: [{ ...U('lord', { size: 0, wg }), warlord: true }] }), { faction: ff, core, items })
      .issues.filter((i) => i.code === 'overWargearReplaced')
    expect(run([[1, 0, 1]])).toHaveLength(0)
    const [iss] = run([[0, 0, 1], [1, 0, 1]])
    expect(iss.level).toBe('error')
    expect(iss.params).toMatchObject({ item: 'Bolt pistol', count: 2, limit: 1 })
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

  it('lets a model swap every copy of the weapon it carries several of', () => {
    // A Wraithlord's two shuriken catapults, each replaceable with a flamer: one model, two picks.
    // Without `cp` the profile's model count was the ceiling and the second flamer was an error.
    const walker = {
      id: 'walker', name: 'Walker', kws: ['Vehicle'], flags: {},
      sizes: [{ pts: 100, per: [1, 1], default: 1 }, { pts: 200, per: [2, 2] }],
      gear: [{ m: 0, t: 1, in: 'stepper', o: [[1]], rep: [2], cp: 2 }],
    }
    const ff = { ...faction, units: [...faction.units, walker] }
    const run = (size, wg) => validateRoster(roster({ units: [{ ...U('walker', { size, wg }), warlord: true }] }), { faction: ff, core })
      .issues.filter((i) => i.code === 'overWargearLimit')
    expect(run(0, [[0, 0, 2]])).toHaveLength(0)
    expect(run(0, [[0, 0, 3]])[0].params).toMatchObject({ count: 3, limit: 2 })
    expect(run(1, [[0, 0, 4]])).toHaveLength(0)   // two models, two catapults each
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
  it('allows a lone 3 DP detachment at Incursion (25.04), but not a second one beside it', () => {
    const big = { sid: 'det-3', name: 'Big', dp: 3, enhancements: [] }
    const f = { ...faction, detachments: [detachment, big] }
    const r = { ...roster({ units: [U('captain', { warlord: true })] }), battleSize: 'incursion', detachments: ['Big'] }
    expect(validateRoster(r, { faction: f, core }).issues.map((i) => i.code)).not.toContain('overDp')
    r.detachments = ['Big', 'Gladius']
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
  // Houndpack Lance hands three War Dogs the CHARACTER keyword, and one of them can then be the
  // Warlord — the keyword the ENTRY chose, not the one its datasheet prints.
  it('accepts a warlord whose allegiance choice made it a Character', () => {
    const warDog = {
      id: 'war-dog', name: 'War Dog', kws: ['Vehicle'], flags: {}, sizes: [{ pts: 155, per: [1, 1], default: 1 }],
      alleg: { g: 'houndpack', t: 'Houndpack Lance Keyword', det: 'Gladius', max: 3, o: [{ n: 'Character' }] },
    }
    const f = { ...faction, units: [...faction.units, warDog] }
    const codesOf = (extra) => validateRoster(roster({ units: [U('war-dog', { warlord: true, ...extra })] }), { faction: f, core }).issues.map((i) => i.code)
    expect(codesOf({})).toContain('warlordIneligible')
    expect(codesOf({ alleg: 'Character' })).not.toContain('warlordIneligible')
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

  // Supreme Commander: "if this model is in your army, it must be your Warlord" — distinct from
  // the detachment-level mandatory pick above.
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
  // Two of them in one army is LEGAL — the Muster step says "if you want to include one or more of
  // these units in your army, you must select one of them to be your WARLORD". Belisarius Cawl
  // beside Thulia Ghuld is an ordinary Adeptus Mechanicus list, and calling it an unresolvable
  // conflict told players their legal army was illegal.
  it('lets two Supreme Commanders stand together, one of them wearing the title', () => {
    const s1 = { id: 's1', name: 'Belisarius Cawl', kws: ['Character'], flags: { char: 1, supreme: 1 }, sizes: [{ pts: 195, per: [1, 1] }] }
    const s2 = { id: 's2', name: 'Thulia Ghuld', kws: ['Character'], flags: { char: 1, supreme: 1 }, sizes: [{ pts: 90, per: [1, 1] }] }
    const f = { ...faction, units: [...faction.units, s1, s2] }
    const codesOf = (r) => validateRoster(r, { faction: f, core }).issues.map((i) => i.code)
    expect(codesOf(roster({ units: [U('s1', { warlord: true }), U('s2')] }))).toEqual([])
    // …but one of them has to: a third character wearing the title leaves both rules unsatisfied.
    const neither = roster({ units: [U('captain', { warlord: true }), U('s1'), U('s2')] })
    expect(codesOf(neither)).toContain('supremeCommanderPick')
    expect(codesOf(neither)).not.toContain('supremeCommanderNotWarlord')
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
  // Muster rules: "the second and third instances of the same Upgrade do not count towards the
  // total number of enhancements in your army". Three Land Speeders with one Upgrade and three
  // with another are two slots — eight v946 tournament lists were flagged before this counted so.
  it('counts an "(Upgrade)" once toward the army limit however many units carry it', () => {
    const det2 = { ...detachment, enhancements: [...detachment.enhancements,
      { name: 'Enlivened Sentinels', pts: 20, type: 'upgrade', limit: 3, req: [{ kw: ['Infantry'] }] },
      { name: 'Ward of Iron', pts: 10, type: 'upgrade', limit: 3, req: [{ kw: ['Infantry'] }] }] }
    const f = { ...faction, detachments: [det2] }
    const inc = (units) => validateRoster({ ...roster({ units }), battleSize: 'incursion' }, { faction: f, core }).issues.map((i) => i.code)
    // Incursion enhLimit = 2: two Upgrades on five units are two slots.
    expect(inc([
      U('captain', { warlord: true, enh: 'Enlivened Sentinels' }),
      U('lieutenant', { enh: 'Enlivened Sentinels' }),
      U('chaplain', { enh: 'Enlivened Sentinels' }),
      U('lieutenant', { enh: 'Ward of Iron' }),
      U('chaplain', { enh: 'Ward of Iron' }),
    ])).not.toContain('overEnhLimit')
    // …and an ordinary enhancement on top is the third slot.
    expect(inc([
      U('captain', { warlord: true, enh: 'Enlivened Sentinels' }),
      U('lieutenant', { enh: 'Ward of Iron' }),
      U('chaplain', { enh: 'Artificer Armour' }),
    ])).toContain('overEnhLimit')
  })
  // "No unit (including attached units) can have more than one enhancement" — every other check
  // here asks about ONE entry, and two enhancement-carrying Leaders on the same bodyguard unit is
  // a roster where no single entry is wrong.
  it('flags two enhancements ending up on one attached unit', () => {
    const units = [
      U('intercessor-squad', { uid: 'squad' }),
      U('captain', { warlord: true, enh: 'Artificer Armour', leaderOf: 'squad' }),
      U('lieutenant', { enh: 'Fire Discipline', leaderOf: 'squad' }),
    ]
    expect(codes(roster({ units }))).toContain('enhAttachedDup')
  })

  it('leaves the same two alone once they lead different units', () => {
    const units = [
      U('intercessor-squad', { uid: 'squad' }),
      U('intercessor-squad', { uid: 'squad2' }),
      U('captain', { warlord: true, enh: 'Artificer Armour', leaderOf: 'squad' }),
      U('lieutenant', { enh: 'Fire Discipline', leaderOf: 'squad2' }),
    ]
    expect(codes(roster({ units }))).not.toContain('enhAttachedDup')
  })

  it('does not mistake two unattached characters for one unit', () => {
    const units = [U('captain', { warlord: true, enh: 'Artificer Armour' }), U('lieutenant', { enh: 'Fire Discipline' })]
    expect(codes(roster({ units }))).not.toContain('enhAttachedDup')
  })

  it('flags an enhancement on an ineligible unit', () => {
    // Ballistus Dreadnought is not a Character → ineligible for a character enhancement.
    const units = [U('captain', { warlord: true }), U('ballistus-dreadnought', { enh: 'Artificer Armour' })]
    expect(codes(roster({ units }))).toContain('enhIneligible')
  })
  // An enhancement its own rules keep off the Warlord (World Eaters' Disciple of Khorne). appdata
  // records it as `notWarlord`, and nothing read the field.
  it('flags an enhancement its rules bar from the Warlord', () => {
    const det2 = { ...detachment, enhancements: [...detachment.enhancements, { name: 'Disciple of Khorne', pts: 15, type: 'miniature', notWarlord: 1, req: [{ kw: ['Infantry'] }] }] }
    const f = { ...faction, detachments: [det2] }
    const got = (units) => validateRoster(roster({ units }), { faction: f, core }).issues.map((i) => i.code)
    expect(got([U('captain', { warlord: true, enh: 'Disciple of Khorne' })])).toContain('enhNotWarlord')
    // …and says nothing about the same enhancement on anyone else.
    expect(got([U('captain', { warlord: true }), U('lieutenant', { enh: 'Disciple of Khorne' })])).not.toContain('enhNotWarlord')
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

describe('validateRoster — an entry the data no longer knows', () => {
  // A roster outlives the data it was built against: it sits in localStorage while every deploy
  // replaces the generated faction files. An id that no longer resolves used to be filtered out
  // everywhere — the lists, the export, the points — so the unit just disappeared and the army got
  // quietly cheaper.
  it('reports a unit whose datasheet is gone instead of dropping it silently', () => {
    const iss = validateRoster(roster({ units: [{ ...U('captain'), warlord: true }, U('unit-that-was-renamed')] }), { faction, core })
      .issues.find((i) => i.code === 'unknownUnit')
    expect(iss).toBeTruthy()
    expect(iss.params).toMatchObject({ id: 'unit-that-was-renamed' })
  })

  it('says nothing while the faction data has not loaded yet', () => {
    const { issues } = validateRoster(roster({ units: [U('captain')] }), { core })
    expect(issues.map((i) => i.code)).not.toContain('unknownUnit')
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

describe('validateRoster — detachment tags', () => {
  // "This detachment has the DYNASTY tag and cannot be taken with another DYNASTY detachment"
  // (core rules 25.04). The picker greys the second one out; this catches an imported list.
  const tagged = (name, unique, dp = 1) => ({ sid: `det-${name}`, name, dp, unique, enhancements: [] })
  const f = { ...faction, detachments: [tagged('Awakened Dynasty', 'DYNASTY'), tagged('Hand of the Dynasty', 'DYNASTY'), tagged('Hypercrypt Legion', 'HYPERCRYPT')] }
  const run = (names) => validateRoster(
    { ...roster(), detachments: names, units: [{ ...U('captain'), warlord: true }] },
    { faction: f, core },
  ).issues.filter((i) => i.code === 'detachmentTagClash')

  it('accepts two detachments with different tags', () => {
    expect(run(['Awakened Dynasty', 'Hypercrypt Legion'])).toHaveLength(0)
  })

  it('rejects two that share one', () => {
    const [issue] = run(['Awakened Dynasty', 'Hand of the Dynasty'])
    expect(issue).toBeTruthy()
    expect(issue.params).toMatchObject({ tag: 'DYNASTY', names: 'Awakened Dynasty, Hand of the Dynasty' })
  })
})

describe('validateRoster — allegiance', () => {
  const vindicator = {
    id: 'chaos-vindicator', name: 'Chaos Vindicator', kws: ['Vehicle'], flags: {}, sizes: [{ pts: 185, per: [1, 1], default: 1 }],
    alleg: { g: 'mark-of-chaos', t: 'Mark of Chaos', det: 'Pactbound Zealots', req: 1, o: [{ n: 'Khorne' }, { n: 'Nurgle' }] },
  }
  const lord = {
    id: 'chaos-lord', name: 'Chaos Lord', kws: ['Character', 'Infantry'], flags: { char: 1 }, sizes: [{ pts: 95, per: [1, 1], default: 1 }],
    leads: [{ to: 'chaos-vindicator', type: 'leader' }],
    alleg: { g: 'mark-of-chaos', t: 'Mark of Chaos', det: 'Pactbound Zealots', req: 1, o: [{ n: 'Khorne' }, { n: 'Nurgle' }] },
  }
  const rhino = {
    id: 'rhino', name: 'Rhino', kws: ['Vehicle'], flags: {}, sizes: [{ pts: 75, per: [1, 1], default: 1 }],
    alleg: { g: 'headhunter-task-force-keywords', t: 'Headhunter Task Force Keywords', det: 'Headhunter Task Force', max: 2, o: [{ n: 'Character' }] },
  }
  const pactbound = { sid: 'pz', name: 'Pactbound Zealots', dp: 3, enhancements: [] }
  const headhunter = { sid: 'hh', name: 'Headhunter Task Force', dp: 3, enhancements: [] }
  const f = { ...faction, units: [...faction.units, vindicator, lord, rhino], detachments: [pactbound, headhunter] }
  const codesOf = (units, dets) => validateRoster({ ...roster(), detachments: dets, units }, { faction: f, core }).issues

  it('reports a mark the rules require and the list does not state', () => {
    const iss = codesOf([{ ...U('chaos-vindicator'), warlord: false }, { ...U('captain'), warlord: true }], ['Pactbound Zealots'])
      .find((i) => i.code === 'allegMissing')
    expect(iss).toBeTruthy()
    expect(iss.params).toMatchObject({ unit: 'Chaos Vindicator', group: 'Mark of Chaos' })
  })

  it('says nothing when the gating detachment is absent — there is no mark to choose', () => {
    const codes2 = codesOf([{ ...U('chaos-vindicator'), warlord: false }, { ...U('captain'), warlord: true }], ['Gladius'])
    expect(codes2.map((i) => i.code)).not.toContain('allegMissing')
  })

  it('reports more units upgraded than the detachment allows', () => {
    const units = [1, 2, 3].map((n) => ({ ...U('rhino'), uid: `r${n}`, alleg: 'Character' }))
    units.push({ ...U('captain'), warlord: true })
    const iss = codesOf(units, ['Headhunter Task Force']).find((i) => i.code === 'allegOverLimit')
    expect(iss.params).toMatchObject({ count: 3, limit: 2 })
  })

  // "Select 3 War Dog units" (Chaos Knights' Houndpack Lance, min 3 / max 3) — a floor as well as
  // a cap, and only the cap was ever checked.
  it('reports fewer units upgraded than a detachment requires', () => {
    const warDog = {
      id: 'war-dog', name: 'War Dog Karnivore', kws: ['Vehicle'], flags: {}, sizes: [{ pts: 130, per: [1, 1], default: 1 }],
      alleg: { g: 'houndpack-lance-keyword', t: 'Houndpack Lance', det: 'Houndpack Lance', min: 3, max: 3, o: [{ n: 'Bondsman' }] },
    }
    const lance = { sid: 'hl', name: 'Houndpack Lance', dp: 3, enhancements: [] }
    const f2 = { ...faction, units: [...faction.units, warDog], detachments: [lance] }
    const units = [{ ...U('war-dog'), uid: 'w1', alleg: 'Bondsman' }, { ...U('war-dog'), uid: 'w2' }, { ...U('captain'), warlord: true }]
    const iss = validateRoster({ ...roster(), detachments: ['Houndpack Lance'], units }, { faction: f2, core })
      .issues.find((i) => i.code === 'allegUnderLimit')
    expect(iss.params).toMatchObject({ count: 1, limit: 3 })
  })

  // The editor offers an enhancement to a vehicle the moment an allegiance upgrade hands it
  // CHARACTER (enhOptionsFor asks about the ENTRY) — the validator used to ask about the printed
  // datasheet and call the resulting list illegal.
  it('accepts an enhancement on a unit the allegiance upgrade made a Character', () => {
    const dread2 = {
      ...dread, id: 'telemon', name: 'Telemon',
      alleg: { g: 'solar-spearhead-keywords', t: 'Solar Spearhead Keywords', det: 'Solar Spearhead', max: 2, o: [{ n: 'Character' }] },
    }
    const spearhead = {
      sid: 'ss', name: 'Solar Spearhead', dp: 2,
      enhancements: [{ name: 'Honoured Fallen', pts: 20, type: 'miniature', req: [{ kw: ['Vehicle'] }] }],
    }
    const f2 = { ...faction, units: [...faction.units, dread2], detachments: [spearhead] }
    const entry = { ...U('telemon'), alleg: 'Character', enh: 'Honoured Fallen', warlord: false }
    const got = (units) => validateRoster({ ...roster(), detachments: ['Solar Spearhead'], units }, { faction: f2, core })
      .issues.map((i) => i.code)
    expect(got([entry, { ...U('captain'), warlord: true }])).not.toContain('enhIneligible')
    // …and still refuses it on the same vehicle without the upgrade.
    expect(got([{ ...entry, alleg: undefined }, { ...U('captain'), warlord: true }])).toContain('enhIneligible')
  })

  it('reports a Character attached across marks', () => {
    // "A Character unit can only be attached to a unit if both units share the same keyword."
    const target = { ...U('chaos-vindicator'), uid: 'v1', alleg: 'Nurgle' }
    const leader = { ...U('chaos-lord'), uid: 'l1', alleg: 'Khorne', leaderOf: 'v1', warlord: true }
    const iss = codesOf([target, leader], ['Pactbound Zealots']).find((i) => i.code === 'allegMismatch')
    expect(iss.params).toMatchObject({ unit: 'Chaos Lord', own: 'Khorne', target: 'Chaos Vindicator', theirs: 'Nurgle' })
  })
})

// ── Allies ──
// A faction with two allied contexts of the different shapes the data has: a points-capped group
// unlocked by a Detachment (in-bundle ids, like World Eaters' Blood Legions) and a keyword-capped
// either/or one whose units come from another bundle (like Imperial Knights).
const inquisitor = { id: 'imperial-agents:inquisitor', name: 'Inquisitor', kws: ['Character', 'Infantry'], flags: { char: 1 }, sizes: [{ pts: 65, per: [1, 1], default: 1 }] }
const armiger = { id: 'imperial-knights:armiger-helverin', name: 'Armiger Helverin', kws: ['Armiger', 'Vehicle', 'Walker'], flags: {}, sizes: [{ pts: 150, per: [1, 1], default: 1 }] }
const knight = { id: 'imperial-knights:knight-paladin', name: 'Knight Paladin', kws: ['Titanic', 'Vehicle', 'Walker'], flags: {}, sizes: [{ pts: 425, per: [1, 1], default: 1 }] }
const daemon = { id: 'bloodletters', name: 'Bloodletters', kws: ['Infantry', 'Daemon'], flags: {}, sizes: [{ pts: 110, per: [10, 10], default: 1 }] }

const daemonkin = { sid: 'det-2', name: 'Khorne Daemonkin', dp: 0, enhancements: [], excludedUnits: [] }
const allyFaction = {
  ...faction,
  detachments: [detachment, daemonkin],
  units: [...faction.units, inquisitor, armiger, knight, daemon],
  allies: [
    { key: 'agents', name: 'Agents of the Imperium', ids: [inquisitor.id], lim: { Character: { 'strike-force': 1 } } },
    { key: 'knights', name: 'Imperial Knights', ids: [armiger.id, knight.id], mutex: 1, lim: { Armiger: { 'strike-force': 3 }, Titanic: { 'strike-force': 1 } } },
    { key: 'daemons', name: 'Blood Legions', ids: [daemon.id], pts: { 'strike-force': 200 }, dets: ['Khorne Daemonkin'] },
  ],
}
const allyCodes = (r) => validateRoster(r, { faction: allyFaction, core }).issues.map((i) => i.code)

describe('validateRoster — allies', () => {
  it('accepts an allied unit inside its limits', () => {
    expect(allyCodes(roster({ units: [U(captain.id, { warlord: true }), U(inquisitor.id)] }))).toEqual([])
  })

  // The cap is per keyword and per battle size: one Agents CHARACTER at Strike Force.
  it('counts allied units by the keyword their limit is written against', () => {
    const r = roster({ units: [U(captain.id, { warlord: true }), U(inquisitor.id), U(inquisitor.id)] })
    expect(allyCodes(r)).toContain('allyOverLimit')
  })

  // "Either one TITANIC model or up to three ARMIGER models" — using both is the violation, even
  // though neither count is over its own cap.
  it('flags an either/or group that used both of its keywords', () => {
    const r = roster({ units: [U(captain.id, { warlord: true }), U(knight.id), U(armiger.id)] })
    expect(allyCodes(r)).toContain('allyMutex')
    // …and not when only one of them is used.
    expect(allyCodes(roster({ units: [U(captain.id, { warlord: true }), U(armiger.id), U(armiger.id)] }))).toEqual([])
  })

  it('adds up a points-capped group against its own ceiling', () => {
    const r = roster({ detachments: ['Khorne Daemonkin'], units: [U(captain.id, { warlord: true }), U(daemon.id), U(daemon.id)] })
    const issues = validateRoster(r, { faction: allyFaction, core }).issues
    const over = issues.find((i) => i.code === 'allyOverPoints')
    expect(over.params).toMatchObject({ group: 'Blood Legions', points: 220, limit: 200 })
  })

  // The group is unlocked by one Detachment and by nothing else, so the same unit is legal in one
  // list and not in another — with the Detachment named, since that is the fix.
  it('flags a unit whose group the selected detachment does not unlock', () => {
    const r = roster({ units: [U(captain.id, { warlord: true }), U(daemon.id)] })
    const issue = validateRoster(r, { faction: allyFaction, core }).issues.find((i) => i.code === 'allyLocked')
    expect(issue.params).toMatchObject({ unit: 'Bloodletters', dets: 'Khorne Daemonkin' })
    expect(allyCodes(roster({ detachments: ['Khorne Daemonkin'], units: [U(captain.id, { warlord: true }), U(daemon.id)] }))).toEqual([])
  })

  // "None of these models can be your WARLORD, and they cannot be given Enhancements" — the
  // sentence every cross-faction allied rule ends with. In-bundle groups are spared it.
  it('refuses an allied Warlord and an allied enhancement, but only across factions', () => {
    const cross = roster({ units: [U(inquisitor.id, { warlord: true, enh: 'Artificer Armour' })] })
    const codes2 = allyCodes(cross)
    expect(codes2).toContain('allyWarlord')
    expect(codes2).toContain('allyEnh')
    const own = roster({ detachments: ['Khorne Daemonkin'], units: [U(daemon.id, { warlord: true })] })
    expect(allyCodes(own)).not.toContain('allyWarlord')
  })
})

// "Unless otherwise stated, each bodyguard unit can only have one leader unit and one support unit
// attached to it" (core rules). Six Death Guard datasheets state otherwise, and the Plague Marines
// blob every Death Guard army is built around was called illegal.
describe('validateRoster — a leader that does not take the slot', () => {
  let ctx, units
  beforeAll(async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const faction = await loadRosterFaction('death-guard')
    ctx = { faction, core }
    units = (list) => ({
      name: 'Blob', faction: 'death-guard', battleSize: 'strike-force',
      detachments: [faction.detachments[0].name], units: list,
    })
  })
  const at = (id, uid, leaderOf, extra = {}) => ({ uid, id, size: 0, ...(leaderOf ? { leaderOf } : {}), ...extra })

  it('lets a Plague Marines unit hold a Malignant Plaguecaster and the characters that join alongside', () => {
    const r = units([
      at('plague-marines', 'i1'),
      at('malignant-plaguecaster', 'i2', 'i1', { warlord: true }),
      at('noxious-blightbringer', 'i3', 'i1'),
      at('tallyman', 'i4', 'i1'),
      at('foul-blightspawn', 'i5', 'i1'),
    ])
    expect(validateRoster(r, ctx).issues.map((i) => i.code)).toEqual([])
  })

  // "(you cannot attach more than one of the same Leader to the same unit)" — the one limit left.
  it('still refuses a second copy of the same one', () => {
    const r = units([
      at('plague-marines', 'i1'),
      at('malignant-plaguecaster', 'i2', 'i1', { warlord: true }),
      at('tallyman', 'i3', 'i1'),
      at('tallyman', 'i4', 'i1'),
    ])
    const issues = validateRoster(r, ctx).issues.filter((i) => i.code === 'manyLeaders')
    expect(issues.map((i) => i.uid)).toEqual(['i4'])
  })

  // …and the editor's picker agrees, or the second character could not be attached in the first
  // place: an occupied target is disabled by `used`.
  it('does not mark the target used for the next one', async () => {
    const { leaderTargetsFor } = await import('./rosterEngine.js')
    const list = [at('plague-marines', 'i1'), at('noxious-blightbringer', 'i2', 'i1'), at('tallyman', 'i3')]
    const defOf = (id) => ctx.faction.units.find((u) => u.id === id)
    const [target] = leaderTargetsFor(defOf('tallyman'), list, 'i3', defOf, ctx.faction.detachments.slice(0, 1))
    expect(target.used).toBe(false)
    // A normal leader is not blocked by one of them either — the slot it wants is still free.
    const [plain] = leaderTargetsFor(defOf('malignant-plaguecaster'), list, 'i3', defOf, ctx.faction.detachments.slice(0, 1))
    expect(plain.used).toBe(false)
  })
})

// The Faction Pack Legends with the same kind of footer, read narrower (2026-10-08): until then each
// joined beside ANYONE. A Vargard Obyron joins beside Nemesor Zahndrekh only, and an Exalted
// Champion — a Support in 11th edition — is a plain Support (a player found it sitting beside a
// Master of Executions).
describe('validateRoster — Legends that join beside a named character only', () => {
  let nec, csm
  beforeAll(async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    ;[nec, csm] = await Promise.all([loadRosterFaction('necrons'), loadRosterFaction('chaos-space-marines')])
  })
  const at = (id, uid, leaderOf, extra = {}) => ({ uid, id, size: 0, ...(leaderOf ? { leaderOf } : {}), ...extra })
  const many = (faction, units) => validateRoster({
    name: 'X', faction: faction.slug, battleSize: 'strike-force', detachments: [faction.detachments[0].name], units,
  }, { faction, core }).issues.filter((i) => i.code === 'manyLeaders').map((i) => i.uid)

  it('seats Obyron beside Zahndrekh and nobody else', () => {
    expect(many(nec, [at('lychguard', 'i1'), at('nemesor-zahndrekh', 'i2', 'i1', { warlord: true }), at('vargard-obyron', 'i3', 'i1')])).toEqual([])
    expect(many(nec, [at('lychguard', 'i1'), at('overlord', 'i2', 'i1', { warlord: true }), at('vargard-obyron', 'i3', 'i1')])).toEqual(['i3'])
  })

  it('refuses an Exalted Champion as a second Support, and the picker agrees', async () => {
    const list = [at('legionaries', 'i1'), at('master-of-executions', 'i2', 'i1', { warlord: true }), at('exalted-champion', 'i3', 'i1')]
    expect(many(csm, list)).toEqual(['i3'])
    const { leaderTargetsFor } = await import('./rosterEngine.js')
    const defOf = (id) => csm.units.find((u) => u.id === id)
    const legionaries = leaderTargetsFor(defOf('exalted-champion'), list.slice(0, 2), 'i3', defOf, csm.detachments.slice(0, 1)).find((t) => t.uid === 'i1')
    expect(legionaries.used).toBe(true)
  })
})

// The other side of the same question: the datasheet of the BODYGUARD unit says how many leaders it
// may hold. Four Astra Militarum squads take two "provided no more than one of those units is a
// COMMAND SQUAD unit" — a Castellan and a Command Squad on one squad is how that army is ordinarily
// built, and calling it illegal was our own reading, not the game's.
describe('validateRoster — a bodyguard unit that holds two leaders', () => {
  let am, tau
  beforeAll(async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    ;[am, tau] = await Promise.all([loadRosterFaction('astra-militarum'), loadRosterFaction('tau-empire')])
  })
  const at = (id, uid, leaderOf, extra = {}) => ({ uid, id, size: 0, ...(leaderOf ? { leaderOf } : {}), ...extra })
  const codes = (faction, units) => validateRoster({
    name: 'x', faction: faction.slug, battleSize: 'strike-force',
    detachments: [faction.detachments[0].name], units,
  }, { faction, core }).issues.filter((i) => i.code === 'manyLeaders').map((i) => i.uid)

  it('takes a Castellan and a Command Squad on one squad of Shock Troops', () => {
    expect(codes(am, [
      at('cadian-shock-troops', 'i1'),
      at('cadian-castellan', 'i2', 'i1', { warlord: true }),
      at('cadian-command-squad', 'i3', 'i1'),
    ])).toEqual([])
  })

  // "…provided no more than one of those units is a COMMAND SQUAD unit."
  it('refuses two Command Squads on it, and a third leader of any kind', () => {
    expect(codes(am, [
      at('cadian-shock-troops', 'i1'),
      at('cadian-command-squad', 'i2', 'i1', { warlord: true }),
      at('cadian-command-squad', 'i3', 'i1'),
    ])).toEqual(['i3'])
    expect(codes(am, [
      at('cadian-shock-troops', 'i1'),
      at('cadian-castellan', 'i2', 'i1', { warlord: true }),
      at('cadian-command-squad', 'i3', 'i1'),
      at('ursula-creed', 'i4', 'i1'),
    ])).toEqual(['i4'])
  })

  // Kroot Carnivores earn the second slot at twenty models, and never for two of the same leader.
  it('gives Kroot Carnivores the second slot only at twenty models', () => {
    const big = { size: 1, count: 20 }
    expect(codes(tau, [
      { uid: 'i1', id: 'kroot-carnivores', ...big },
      at('kroot-war-shaper', 'i2', 'i1', { warlord: true }),
      at('kroot-flesh-shaper', 'i3', 'i1'),
    ])).toEqual([])
    expect(codes(tau, [
      { uid: 'i1', id: 'kroot-carnivores', ...big },
      at('kroot-war-shaper', 'i2', 'i1', { warlord: true }),
      at('kroot-war-shaper', 'i3', 'i1'),
    ])).toEqual(['i3'])
    expect(codes(tau, [
      { uid: 'i1', id: 'kroot-carnivores', size: 1, count: 15 },
      at('kroot-war-shaper', 'i2', 'i1', { warlord: true }),
      at('kroot-flesh-shaper', 'i3', 'i1'),
    ])).toEqual(['i3'])
  })

  // The editor's picker has to agree, or the second leader could never be attached in the first
  // place — one shared answer (`hostSlotTaken`) is what keeps them from drifting apart.
  it('leaves the squad on offer for the second leader, but not the third', async () => {
    const { leaderTargetsFor } = await import('./rosterEngine.js')
    const defOf = (id) => am.units.find((u) => u.id === id)
    const dets = am.detachments.slice(0, 1)
    const one = [at('cadian-shock-troops', 'i1'), at('cadian-castellan', 'i2', 'i1'), at('cadian-command-squad', 'i3')]
    expect(leaderTargetsFor(defOf('cadian-command-squad'), one, 'i3', defOf, dets)[0].used).toBe(false)
    const two = [...one.slice(0, 2), at('cadian-command-squad', 'i3', 'i1'), at('ursula-creed', 'i4')]
    expect(leaderTargetsFor(defOf('ursula-creed'), two, 'i4', defOf, dets)[0].used).toBe(true)
  })
})

// Which unit an issue is about used to be answered only by tapping the row: several messages named
// no unit at all, and an army holding three of a datasheet gave three identical lines.
describe('validateRoster — every issue says which unit it is about', () => {
  let faction
  beforeAll(async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    faction = await loadRosterFaction('astra-militarum')
  })

  it('fills the unit name into every issue tied to an entry', () => {
    const units = [
      { uid: 'i1', id: 'cadian-shock-troops', size: 0 },
      { uid: 'i2', id: 'cadian-castellan', size: 0, leaderOf: 'i1', enh: 'Not A Real Enhancement' },
      { uid: 'i3', id: 'ogryn-bodyguard', size: 0, leaderOf: 'i1' },
    ]
    const r = { name: 'x', faction: 'astra-militarum', battleSize: 'strike-force', detachments: [faction.detachments[0].name], units }
    const issues = validateRoster(r, { faction, core }).issues.filter((i) => i.uid)
    expect(issues.length).toBeGreaterThan(0)
    for (const i of issues) expect(i.params?.unit, i.code).toBeTruthy()
    // …including the unit it could not be attached to, so the message can name both ends.
    const bad = issues.find((i) => i.code === 'leaderTargetInvalid')
    expect(bad.params).toMatchObject({ unit: 'Ogryn Bodyguard', target: 'Cadian Shock Troops' })
  })

  // Three Cadian Castellans, three identical messages — the number says which row the modal will
  // jump to. A name held by one entry alone stays as it is.
  it('numbers a name the roster holds more than once', () => {
    const units = [
      { uid: 'i1', id: 'cadian-castellan', size: 0, warlord: true },
      { uid: 'i2', id: 'cadian-castellan', size: 0, warlord: true },
      { uid: 'i3', id: 'cadian-shock-troops', size: 0 },
    ]
    const r = { name: 'x', faction: 'astra-militarum', battleSize: 'strike-force', detachments: [faction.detachments[0].name], units }
    const issue = validateRoster(r, { faction, core }).issues.find((i) => i.code === 'manyWarlords')
    expect(issue.params.unit).toBe('Cadian Castellan (2)')
  })

  // A Legends datasheet is published and playable — just not in matched play. Warning, not error:
  // this file never blocks a list, it says what a tournament organiser would.
  it('warns about a Legends datasheet without calling the list illegal', () => {
    const legends = { id: 'lootas', name: 'Lootas', kws: ['Infantry'], flags: { legends: 1 }, sizes: [{ pts: 50, per: [5, 5], default: 1 }] }
    const fac = { ...faction, units: [...faction.units, legends] }
    const r = validateRoster({ ...roster(), units: [...roster().units, U('lootas')] }, { faction: fac, core })
    const issue = r.issues.find((i) => i.code === 'legendsUnit')
    expect(issue.level).toBe('warn')
    expect(issue.params.unit).toBe('Lootas')
    expect(r.issues.some((i) => i.level === 'error' && i.code === 'legendsUnit')).toBe(false)
  })

  // Shrike: GW printed him without EPIC HERO, so a second copy is legal — kept, but flagged.
  it('warns, without an error, on a second copy of a named character GW left without EPIC HERO', () => {
    const shrike = { id: 'kayvaan-shrike', name: 'Kayvaan Shrike', kws: ['Character', 'Infantry'], flags: { char: 1 }, sizes: [{ pts: 95, per: [1, 1], default: 1 }] }
    const fac = { ...faction, units: [...faction.units, shrike] }
    const one = validateRoster({ ...roster(), units: [...roster().units, U('kayvaan-shrike')] }, { faction: fac, core })
    expect(one.issues.some((i) => i.code === 'namedNotEpic')).toBe(false)
    const two = validateRoster({ ...roster(), units: [...roster().units, U('kayvaan-shrike'), U('kayvaan-shrike')] }, { faction: fac, core })
    const issue = two.issues.find((i) => i.code === 'namedNotEpic')
    expect(issue.level).toBe('warn')
    expect(issue.params.unit).toBe('Kayvaan Shrike (2)')
    expect(two.issues.some((i) => i.level === 'error')).toBe(one.issues.some((i) => i.level === 'error'))
  })

  // Every placeholder a message asks for has to be one the validator actually sends, in both
  // locales — a template naming a param nobody fills renders as a blank.
  it('asks for nothing the validator does not send', async () => {
    const { ui } = await import('../i18n/ui.js')
    const known = new Set(['unit', 'target', 'id', 'count', 'limit', 'over', 'spent', 'group',
      'names', 'name', 'tag', 'enh', 'dets', 'points', 'kw', 'kws', 'own', 'theirs', 'options', 'item'])
    for (const loc of ['en', 'ru']) {
      for (const [key, tpl] of Object.entries(ui[loc])) {
        if (!key.startsWith('issue_')) continue
        for (const [, p] of String(tpl).matchAll(/\{(\w+)\}/g)) expect(known, `${loc}.${key}`).toContain(p)
      }
    }
    expect(Object.keys(ui.en).filter((k) => k.startsWith('issue_')))
      .toEqual(Object.keys(ui.ru).filter((k) => k.startsWith('issue_')))
  })
})

// Against a real bundle and the real sidecar: a stub cannot exercise this, because
// conditionalKeywords.json is keyed by the faction slug and the datasheet's own id.
describe('an enhancement whose keyword a detachment grants', () => {
  // Contagion Engines makes the Helbrute CONTAGION ENGINES, and that keyword is what Parasitic
  // Woe-reaper asks for; the Helbrute does not PRINT it, so without the grant a legal list comes
  // back with an error on the Helbrute carrying one. (Read first on Orks' Rollin' Deff and WAGON
  // — Codex: Orks retired the detachment and now prints Wagon — then on Space Marines' Fulguris
  // Task Force and SPEEDER, which Codex: Space Marines retired in app data 963.)
  it('accepts the upgrade on the unit that detachment made a Contagion Engine', async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const dg = await loadRosterFaction('death-guard')
    const codes = (id) => validateRoster(
      { faction: 'death-guard', detachments: ['Contagion Engines'], battleSize: 'strike-force', units: [{ uid: 'u1', id, size: 0, enh: 'Parasitic Woe\u2011reaper (Upgrade)' }] },
      { faction: dg, core },
    ).issues.map((i) => i.code)
    expect(codes('helbrute')).not.toContain('enhIneligible')
    // …and refuses it on a unit the same detachment does not name.
    expect(codes('plagueburst-crawler')).toContain('enhIneligible')
  })
})

// Broadside Battlesuits: "Any number of models can each be equipped with up to two of the
// following, but cannot take duplicates* — * No model can be equipped with both a twin plasma
// rifle and twin smart missile system." Per model; the group stores counts, so at three models it
// is six picks, three of a kind, and twin plasma + twin smart missile together at most three.
describe('a budget per model (Broadside Battlesuits)', () => {
  let tau, def, gi, oi
  beforeAll(async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const { default: rosterItems } = await import('../data/roster/items.js')
    tau = await loadRosterFaction('tau-empire')
    def = tau.units.find((u) => u.id === 'broadside-battlesuits')
    gi = def.gear.findIndex((g) => g.excl)
    const name = (o) => rosterItems.items[Array.isArray(o[0]) ? o[0][0][0] : o[0]]
    oi = (n) => def.gear[gi].o.findIndex((o) => name(o) === n)
    tau.items = rosterItems.items
  })
  const broadside = (wg) => ({ uid: 'b1', id: 'broadside-battlesuits', size: 2, wg })
  const codes = (e) => validateRoster({ name: 'x', faction: 'tau-empire', battleSize: 'strike-force', detachments: [], units: [e] }, { faction: tau, core, items: tau.items })
    .issues.map((i) => i.code)

  it('takes a full legal build at three models', () => {
    const e = broadside([[gi, oi('Twin plasma rifle'), 1], [gi, oi('Twin smart missile system'), 2], [gi, oi('Seeker missile'), 3]])
    expect(codes(e)).not.toContain('overWargearOnePerModel')
    expect(codes(e)).not.toContain('overWargearLimit')
    expect(codes(e)).not.toContain('overWargearDup')
  })

  it('reports twin plasma and twin smart missiles on more models than the unit has', () => {
    const e = broadside([[gi, oi('Twin plasma rifle'), 2], [gi, oi('Twin smart missile system'), 2]])
    expect(codes(e)).toContain('overWargearOnePerModel')
    // …and the editor's room for one of them is what the other left of the three models.
    expect(wargearExclRoom(def, e, gi, oi('Twin plasma rifle'))).toBe(1)
    expect(wargearExclRoom(def, e, gi, oi('Seeker missile'))).toBeNull()
  })

  it('shrinking the unit gives back the pick that broke the slot', () => {
    const e = { ...broadside([[gi, oi('Twin plasma rifle'), 1], [gi, oi('Twin smart missile system'), 2]]), size: 1 }
    const wg = fitWargear(def, e)
    expect(wargearExclOver(def, { ...e, wg }, gi)).toEqual([])
  })
})

// Legends Crisis Battlesuits: up to three from one group per suit, at most one of each starred item
// counting the burst-cannon swap, and at most three ranged weapons counting what sits in the swap's
// slot. Three suits (size 0). Group 0 is the swap, group 1 the "up to three".
describe('rules about one model across groups (Legends Crisis Battlesuits)', () => {
  let tau, def
  const g0 = (name) => def.gear[0].o.findIndex((o) => tau.items[o[0]] === name)
  const g1 = (name) => def.gear[1].o.findIndex((o) => tau.items[o[0]] === name)
  beforeAll(async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const { default: rosterItems } = await import('../data/roster/items.js')
    tau = await loadRosterFaction('tau-empire')
    tau.items = rosterItems.items
    def = tau.units.find((u) => u.id === 'crisis-battlesuits')
  })
  const crisis = (wg) => ({ uid: 'c1', id: 'crisis-battlesuits', size: 0, wg })

  it('deals out a legal build: burst cannon, two plasma rifles and a support system each', () => {
    expect(perModelFits(def, crisis([[1, g1('Plasma rifle'), 6], [1, g1('Battlesuit Support System'), 3]]))).toBe(true)
  })

  it('counts the burst cannon a suit kept as one of its three ranged weapons', () => {
    expect(perModelFits(def, crisis([[1, g1('Plasma rifle'), 9]]))).toBe(false)
    // …and a suit that traded it for a shield generator has the room.
    expect(perModelFits(def, crisis([[0, g0('Shield Generator'), 3], [1, g1('Plasma rifle'), 9]]))).toBe(true)
    expect(perModelRoom(def, crisis([]), 1, g1('Plasma rifle'))).toBe(6)
  })

  it('holds a starred item once per suit across both groups', () => {
    expect(perModelFits(def, crisis([[0, g0('Shield Generator'), 3], [1, g1('Shield Generator'), 1]]))).toBe(false)
    expect(perModelFits(def, crisis([[0, g0('Shield Generator'), 2], [1, g1('Shield Generator'), 1]]))).toBe(true)
  })

  it('refuses more swaps than suits, reports the list and trims it when the unit shrinks', () => {
    expect(perModelFits(def, crisis([[0, g0('Plasma rifle'), 2], [0, g0('Fusion blaster'), 2]]))).toBe(false)
    const e = crisis([[1, g1('Plasma rifle'), 9]])
    const r = validateRoster({ name: 'x', faction: 'tau-empire', battleSize: 'strike-force', detachments: [], units: [e] }, { faction: tau, core, items: tau.items })
    expect(r.issues.map((i) => i.code)).toContain('overWargearPerModel')
    expect(perModelFits(def, { ...e, wg: fitWargear(def, e) })).toBe(true)
  })
})

// "…replaced with two different weapons from the following list" is an exact count (`ex`): one
// pick left a Wolf Guard Pack Leader holding one weapon, and nothing said so (2026-10-07).
describe('exact-count wargear groups ("two different weapons")', () => {
  let sw, da
  beforeAll(async () => {
    sw = (await import('../data/roster/space-wolves.js')).default
    da = (await import('../data/roster/dark-angels.js')).default
  })
  const issues = (fac, slug, name, wg) => {
    const id = fac.units.find((u) => u.name === name).id
    const r = { faction: slug, battleSize: 'strikeForce', detachments: [], units: [{ uid: 'a', id, size: 0, wg }] }
    return validateRoster(r, { faction: fac, core }).issues.filter((i) => i.code === 'wargearPickExact')
  }

  it('flags one weapon where two are owed, and accepts none or two', () => {
    expect(issues(sw, 'space-wolves', 'Wolf Guard Pack Leader', [[0, 2, 1]])).toHaveLength(1)
    expect(issues(sw, 'space-wolves', 'Wolf Guard Pack Leader', [[0, 2, 1], [0, 3, 1]])).toHaveLength(0)
    expect(issues(sw, 'space-wolves', 'Wolf Guard Pack Leader', [])).toHaveLength(0)
  })

  it('takes the sentence’s own single option as a complete answer', () => {
    // Deathwing Strikemaster: "either 1 twin lightning claws, or two different weapons…".
    expect(issues(da, 'dark-angels', 'Deathwing Strikemaster', [[0, 0, 1]])).toHaveLength(0)
    expect(issues(da, 'dark-angels', 'Deathwing Strikemaster', [[0, 1, 1]])).toHaveLength(1)
  })
})

// A model's limit across SEVERAL groups (`xpm`), read from the footnotes that state it — none of
// these was enforced before an audit of every instruction (2026-10-07).
describe('cross-group limits on one model', () => {
  const load = async (slug) => (await import(`../data/roster/${slug}.js`)).default
  const issuesOf = (fac, slug, name, wg, size = 0, count) => {
    const id = fac.units.find((u) => u.name === name).id
    const unit = { uid: 'a', id, size, wg }
    if (count != null) unit.count = count
    return validateRoster({ faction: slug, battleSize: 'strikeForce', detachments: [], units: [unit] }, { faction: fac, core })
      .issues.filter((i) => i.code === 'overWargearOnePerModel')
  }
  const opt = (fac, name, gi, item) => {
    const g = fac.units.find((u) => u.name === name).gear[gi]
    return g.o.findIndex((o) => itemsOf[Array.isArray(o[0]) ? o[0][0][0] : o[0]] === item)
  }
  let itemsOf
  beforeAll(async () => { itemsOf = (await import('../data/roster/items.js')).default.items })

  it('one chainsword per Knight Destrier, whichever arm', async () => {
    const ik = await load('imperial-knights')
    const cs = opt(ik, 'Knight Destrier', 0, 'Bellatus reaper chainsword')
    const sp = opt(ik, 'Knight Destrier', 1, 'Thundershock spear')
    expect(issuesOf(ik, 'imperial-knights', 'Knight Destrier', [[0, cs, 1], [1, opt(ik, 'Knight Destrier', 1, 'Bellatus reaper chainsword'), 1]])).toHaveLength(1)
    expect(issuesOf(ik, 'imperial-knights', 'Knight Destrier', [[0, cs, 1], [1, sp, 1]])).toHaveLength(0)
  })

  it('a Hive Tyrant takes one of the heavy venom and stranglethorn cannons', async () => {
    const ty = await load('tyranids')
    const hvc0 = opt(ty, 'Hive Tyrant', 0, 'Heavy venom cannon')
    const st1 = opt(ty, 'Hive Tyrant', 1, 'Stranglethorn cannon')
    expect(issuesOf(ty, 'tyranids', 'Hive Tyrant', [[0, hvc0, 1], [1, st1, 1]])).toHaveLength(1)
    expect(issuesOf(ty, 'tyranids', 'Hive Tyrant', [[0, hvc0, 1]])).toHaveLength(0)
  })

  it('an Aspiring Champion takes one plasma pistol', async () => {
    const csm = await load('chaos-space-marines')
    const pp = (gi) => opt(csm, 'Legionaries', gi, 'Plasma pistol')
    expect(issuesOf(csm, 'chaos-space-marines', 'Legionaries', [[0, pp(0), 1], [1, pp(1), 1]])).toHaveLength(1)
  })

  it('a Coldstar Commander does not double a starred system across its two groups', async () => {
    const tau = await load('tau-empire')
    const sg = (gi) => opt(tau, 'Commander in Coldstar Battlesuit', gi, 'Shield Generator')
    expect(issuesOf(tau, 'tau-empire', 'Commander in Coldstar Battlesuit', [[0, sg(0), 1], [2, sg(2), 1]])).toHaveLength(1)
    expect(issuesOf(tau, 'tau-empire', 'Commander in Coldstar Battlesuit', [[2, sg(2), 1], [2, opt(tau, 'Commander in Coldstar Battlesuit', 2, 'Missile pod'), 2]])).toHaveLength(0)
  })

  it('Pioneers: comms array and scanner on two models, none beside a heavy weapon', async () => {
    const lov = await load('leagues-of-votann')
    expect(lov.units.find((u) => u.name === 'Hernkyn Pioneers').gear[1].lim).toEqual([[0, 3, 1]])
    expect(issuesOf(lov, 'leagues-of-votann', 'Hernkyn Pioneers', [[1, 0, 1], [1, 1, 1]])).toHaveLength(0)
    expect(issuesOf(lov, 'leagues-of-votann', 'Hernkyn Pioneers', [[0, 0, 1], [1, 0, 1], [1, 1, 1], [1, 2, 1]])).toHaveLength(1)
  })

  it('a Helbrute takes one weapon per Helbrute fist it still holds', async () => {
    const dg = await load('death-guard')
    const name = 'Helbrute'
    const fist0 = opt(dg, name, 0, 'Helbrute fist')
    expect(issuesOf(dg, 'death-guard', name, [[3, 0, 1]])).toHaveLength(0)
    expect(issuesOf(dg, 'death-guard', name, [[3, 0, 2]])).toHaveLength(1)
    expect(issuesOf(dg, 'death-guard', name, [[0, fist0, 1], [3, 0, 2]])).toHaveLength(0)
    expect(issuesOf(dg, 'death-guard', name, [[1, 0, 1], [3, 0, 1]])).toHaveLength(1)
  })
})

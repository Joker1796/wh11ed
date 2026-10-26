import { describe, it, expect } from 'vitest'
import { buildRosterText, EXPORT_FORMATS } from './rosterExport.js'
import { optionLabel } from '../core/roster/rosterEngine.js'

const core = { battleSizes: [{ id: 'strike-force', name: 'Strike Force', points: 2000, dp: 3, enhLimit: 4, dupLimit: 3 }] }
const items = { 1: 'Bolt pistol', 2: 'Chainsword', 3: 'Bolt rifle', 5: 'Power fist', 9: 'Astartes chainsword' }

const captain = {
  id: 'captain', name: 'Captain', kws: ['Character', 'Infantry'], flags: { char: 1 },
  sizes: [{ pts: 85, per: [1, 1], default: 1 }],
  defaults: [[0, [[1, 1], [2, 1]]]],
}
const lt = {
  id: 'lt', name: 'Lieutenant', kws: ['Character', 'Infantry'], flags: { char: 1 },
  sizes: [{ pts: 70, per: [1, 1], default: 1 }], leads: [{ to: 'intercessor-squad' }],
  defaults: [[0, [[1, 1]]]],
}
const intercessor = {
  id: 'intercessor-squad', name: 'Intercessor Squad', kws: ['Battleline', 'Infantry'], flags: {},
  minis: [{ n: 'Intercessor Sergeant' }, { n: 'Intercessor' }],
  sizes: [
    { pts: 80, per: [5, 5], default: 1, comp: [[0, 1], [1, 4]] },
    { pts: 160, per: [10, 10], comp: [[0, 1], [1, 9]] },
  ],
  defaults: [[0, [[3, 1]]], [1, [[3, 1]]]],
  gear: [{ m: 0, t: 1, in: 'checkbox', o: [[9], [5, 10]], rep: [3] }],
}
const rhino = {
  id: 'rhino', name: 'Rhino', kws: ['Dedicated Transport', 'Vehicle'], flags: {},
  sizes: [{ pts: 75, per: [1, 1], default: 1 }], defaults: [[0, [[1, 2]]]],
}
const detachment = { sid: 'det-1', name: 'Gladius Task Force', dp: 2, fds: ['Purge the Foe'], enhancements: [{ name: 'Artificer Armour', pts: 15, type: 'miniature' }] }
const faction = { name: 'Space Marines', units: [captain, lt, intercessor, rhino], detachments: [detachment] }

const roster = {
  name: 'Strike Force Alpha', faction: 'space-marines', detachments: ['Gladius Task Force'], battleSize: 'strike-force',
  units: [
    { uid: 'a', id: 'captain', size: 0, warlord: true, enh: 'Artificer Armour' },
    { uid: 'b', id: 'intercessor-squad', size: 1, wg: [[0, 1, 1]] }, // power fist +10
    { uid: 'c', id: 'lt', size: 0, leaderOf: 'b' },
    { uid: 'd', id: 'rhino', size: 0 },
  ],
}
const ctx = { faction, core, items, version: { app: '1.2.3', data: 925 } }
const build = (fmt) => buildRosterText(roster, ctx, fmt)

describe('buildRosterText — the GW app’s own 11th-edition shape', () => {
  const txt = build('gw')

  // The 11th-edition header is three lines and a Force Disposition, not the 10th's one-liner: the
  // detachment line carries the battle size's DP BUDGET (not what the detachments cost), which is
  // what the app prints and what a reader checks the list against.
  it('writes the header the way the app writes it', () => {
    expect(txt.startsWith('Strike Force Alpha (415 points)')).toBe(true)
    expect(txt).toContain('Space Marines\nStrike Force (2000 points)')
    expect(txt).toContain('Gladius Task Force (3 Detachment Points)')
    expect(txt).toContain('Force Dispositions: Purge the Foe')
  })

  // A leader and the unit it joined are ONE block, headed by its number — the app stopped noting
  // "leading X" on the character in 11th.
  it('blocks attached units, naming each side by its role', () => {
    expect(txt).toContain('Attached Units\nAttached Unit 1')
    expect(txt).toContain('Lieutenant (70 points)\n• Attached as: Leader (Character)')
    expect(txt).toContain('Intercessor Squad (170 points)\n• Attached as: Bodyguard (Battleline)')
    expect(txt).not.toContain('Leading:')
  })

  // A Support unit joins the same bodyguard a Leader does but fills the host's OTHER slot, and the
  // app names it by that role. Calling it "Leader (Character)" both misstates what it is and loses
  // which slot is taken — Masters of the Maelstrom is a Support to a Chosen squad, not its leader.
  it('names a Support attachment by its own role', () => {
    const supporter = { ...lt, id: 'sup', name: 'Support Squad', leads: [{ to: 'intercessor-squad', type: 'support' }] }
    const txt2 = buildRosterText(
      { ...roster, units: [...roster.units, { uid: 'e', id: 'sup', size: 0, leaderOf: 'b' }] },
      { ...ctx, faction: { ...faction, units: [...faction.units, supporter] } },
      'gw',
    )
    expect(txt2).toContain('Support Squad (70 points)\n• Attached as: Support')
    expect(txt2).toContain('Lieutenant (70 points)\n• Attached as: Leader (Character)')
  })

  // Weapons come out as TOTALS per model profile, with the swap already spent — the same
  // accounting the editor shows, not the raw picks.
  it('prints the whole fielded loadout, per model profile', () => {
    expect(txt).toContain('  • 1x Intercessor Sergeant\n    • 1x Power fist')  // traded its bolt rifle
    expect(txt).toContain('  • 9x Intercessor\n    • 9x Bolt rifle')
    expect(txt).toContain('  • 2x Bolt pistol')                                 // Rhino, x2 on one model
  })

  it('keeps the loose units under the app’s own section headings', () => {
    expect(txt).toContain('\nCHARACTERS\n')
    expect(txt).toContain('\nDEDICATED TRANSPORTS\n')
    expect(txt).toContain('Captain (100 points)')          // 85 + 15 enhancement
    expect(txt).toContain('  • Warlord')
    expect(txt).toContain('  • Enhancement: Artificer Armour')
  })

  // Naming the app that wrote the list is the honest half of copying its layout: this list did not
  // come out of the GW app, and the points data behind it has its own version.
  it('signs the export as ours, with the data version behind the points', () => {
    expect(txt.trimEnd().endsWith('Exported with wh-rules.ru — App Version: v1.2.3, Data Version: v925')).toBe(true)
    expect(txt).not.toContain('Exported with App Version')
  })
})

describe('buildRosterText — WTC', () => {
  const txt = build('wtc')

  it('opens with the header block a judge reads', () => {
    expect(txt).toContain('+ FACTION KEYWORD: Imperium - Space Marines')
    expect(txt).toContain('+ DETACHMENT: Gladius Task Force (Purge the Foe)')
    expect(txt).toContain('+ TOTAL ARMY POINTS: 415pts')
    expect(txt).toContain('+ NUMBER OF UNITS: 4')
  })

  // Characters are numbered so the header can point at one — the warlord and every enhancement
  // are stated up top by that reference, then again on the unit's own line.
  it('numbers the characters and points the header at them', () => {
    expect(txt).toContain('+ WARLORD: Char1: Captain')
    expect(txt).toContain('+ ENHANCEMENT: Artificer Armour (on Char1: Captain)')
    expect(txt).toContain('Char1: 1x Captain (100 pts): Warlord, Bolt pistol, Chainsword')
    expect(txt).toContain('Enhancement: Artificer Armour (+15 pts)')
  })

  it('gives a multi-profile unit one line per profile', () => {
    expect(txt).toContain('10x Intercessor Squad (170 pts)')
    expect(txt).toContain('• 1x Intercessor Sergeant: Power fist')
    expect(txt).toContain('• 9x Intercessor: 9x Bolt rifle')
  })
})

describe('buildRosterText — WTC-Compact', () => {
  const txt = build('wtc-compact')

  // Same header, same unit lines — the difference is that the per-profile breakdown is folded into
  // the unit's own line, so a squad is one line instead of three.
  it('keeps the header and folds the profiles away', () => {
    expect(txt).toContain('+ FACTION KEYWORD: Imperium - Space Marines')
    expect(txt).toContain('10x Intercessor Squad (170 pts): 9x Bolt rifle, Power fist')
    expect(txt).not.toContain('• 1x Intercessor Sergeant')
  })

  // The attachment has a line of its own in this family, and writing it is what lets a reader
  // (ours included) put the leader back where it was.
  it('states the attachment both formats have a line for', () => {
    expect(txt).toContain('  Attached to Intercessor Squad')
    expect(build('wtc')).toContain('  Attached to Intercessor Squad')
  })
})

describe('buildRosterText — compact', () => {
  const txt = build('compact')

  it('fits a unit on one line, with what makes it different in brackets', () => {
    expect(txt.split('\n')[0]).toBe('Strike Force Alpha — Space Marines — Gladius Task Force — 415/2000 pts')
    expect(txt).toContain('• Captain — 100 pts [Warlord, Enh: Artificer Armour]')
    expect(txt).toContain('leads Intercessor Squad')
    expect(txt).toContain('• Intercessor Squad (10) — 170 pts')
  })

  // Two identical entries are one line with a multiplier; their points are SUMMED, so the copy
  // surcharge on the second one stays visible instead of being multiplied away.
  it('collapses identical entries', () => {
    const twoRhinos = { ...roster, units: [...roster.units, { uid: 'e', id: 'rhino', size: 0 }] }
    const t = buildRosterText(twoRhinos, ctx, 'compact')
    expect(t).toContain('• 2x Rhino — 150 pts')
  })
})

// War Organ's "simple" export, as a player pasted it: units and points, nothing else.
describe('buildRosterText — simple', () => {
  it('prints the header, the detachments, the disposition, then "Unit (N points)" by name', () => {
    expect(build('simple')).toBe([
      'Strike Force Alpha [Space Marines] - (415 points)',
      'Detachments: Gladius Task Force',
      'Purge the Foe',
      '',
      'Captain (100 points)',
      'Intercessor Squad (170 points)',
      'Lieutenant (70 points)',
      'Rhino (75 points)',
    ].join('\n'))
  })

  // Every copy on a line of its own, with its own price — the lines add up to the header.
  it('does not collapse copies', () => {
    const t = buildRosterText({ ...roster, units: [...roster.units, { uid: 'e', id: 'rhino', size: 0 }] }, ctx, 'simple')
    expect(t.split('\n').filter((l) => l.startsWith('Rhino ('))).toHaveLength(2)
    const sum = t.split('\n').map((l) => Number(l.match(/\((\d+) points\)$/)?.[1] || 0)).slice(4).reduce((a, n) => a + n, 0)
    expect(`(${sum} points)`).toBe(t.split('\n')[0].match(/\(\d+ points\)/)[0])
  })
})

describe('buildRosterText — the shapes themselves', () => {
  it('offers exactly the six formats, and defaults to the app’s', () => {
    expect(EXPORT_FORMATS).toEqual(['gw', 'wtc', 'wtc-compact', 'compact', 'simple', 'rus'])
    expect(buildRosterText(roster, ctx)).toBe(build('gw'))
  })

  // A datasheet with no recorded default loadout can only be honest about what was PICKED — the
  // fallback prints the option's own label rather than inventing a weapon list.
  it('falls back to the picks when a datasheet records no default loadout', () => {
    const bare = { ...intercessor, defaults: undefined }
    const t = buildRosterText(
      { ...roster, units: [{ uid: 'b', id: 'intercessor-squad', size: 1, wg: [[0, 1, 1]] }] },
      { ...ctx, faction: { ...faction, units: [bare] } },
      'gw',
    )
    expect(t).toContain('Power fist')
    expect(t).not.toContain('Bolt rifle')
  })
})

// An army states the ONE disposition it plays, not the menu its detachments offer.
describe('buildRosterText — the army’s Force Disposition', () => {
  const anvil = { sid: 'det-2', name: 'Anvil Siege Force', dp: 2, fds: ['Take and Hold'], enhancements: [] }
  const twoDets = { ...faction, detachments: [detachment, anvil] }
  const list = (over) => buildRosterText(
    { ...roster, detachments: ['Gladius Task Force', 'Anvil Siege Force'], ...over },
    { ...ctx, faction: twoDets },
    'gw',
  )

  it('prints the declared one', () => {
    expect(list({ disposition: 'Take and Hold' })).toContain('Force Dispositions: Take and Hold')
  })

  it('prints the candidates while nobody has declared — the line states the open choice', () => {
    expect(list({})).toContain('Force Dispositions: Purge the Foe, Take and Hold')
  })

  it('needs no declaration when one detachment answers for the army', () => {
    expect(build('gw')).toContain('Force Dispositions: Purge the Foe')
  })

  // Our own WTC header carries it in the detachment line's parenthetical, and the importer reads
  // it back from there — so a list exported and re-imported keeps what it declared.
  it('carries it in the WTC detachment line', () => {
    expect(list({ disposition: 'Take and Hold' }))
      .not.toContain('+ DETACHMENT') // the gw shape has no such line…
    const wtc = buildRosterText(
      { ...roster, detachments: ['Gladius Task Force', 'Anvil Siege Force'], disposition: 'Take and Hold' },
      { ...ctx, faction: twoDets },
      'wtc',
    )
    expect(wtc).toContain('+ DETACHMENT: Gladius Task Force, Anvil Siege Force (Take and Hold)')
  })
})

describe('buildRosterText — a unit-wide swap', () => {
  // A group appdata records once per miniature profile and the generator folds into one unit-wide
  // one (`all`). Until 2026-08-28 the export printed the replacement AND every copy of the weapon
  // it replaced — five accursed weapons under a squad holding four — and hung the pick on the
  // first profile, so the champion got the fist while the squad kept its weapons. Both halves of
  // the swap are charged to the same profile now: the biggest one (see swapsByMini).
  const chosen = {
    id: 'chosen', name: 'Chosen', kws: ['Infantry'], flags: {},
    minis: [{ n: 'Chosen Champion' }, { n: 'Chosen' }],
    sizes: [{ pts: 135, per: [5, 5], default: 1, comp: [[0, 1], [1, 4]] }],
    defaults: [[0, [[2, 1]]], [1, [[2, 1]]]],
    gear: [{ all: 1, t: 1, in: 'stepper', o: [[5]], rep: [2] }],
  }
  const list = {
    name: 'Warband', faction: 'space-marines', detachments: ['Gladius Task Force'], battleSize: 'strike-force',
    units: [{ uid: 'a', id: 'chosen', size: 0, wg: [[0, 0, 1]] }],
  }
  const txt = buildRosterText(list, { ...ctx, faction: { ...faction, units: [chosen] } }, 'gw')

  it('takes the replaced weapon off the profile that took the swap', () => {
    expect(txt).toContain('4x Chosen\n')
    expect(txt).toContain('3x Chainsword')
    expect(txt).toContain('1x Power fist')
    expect(txt).toContain('• 1x Chosen Champion\n    • 1x Chainsword')
  })
})

describe('buildRosterText — allegiance', () => {
  // "You must select one for that unit and note it on your Army Roster" — a list that doesn't
  // print the mark isn't a legal list, so every format has to carry it.
  const vindicator = {
    id: 'chaos-vindicator', name: 'Chaos Vindicator', kws: ['Vehicle'], flags: {},
    sizes: [{ pts: 185, per: [1, 1], default: 1 }],
    alleg: { g: 'mark-of-chaos', t: 'Mark of Chaos', det: 'Pactbound Zealots', req: 1, o: [{ n: 'Khorne' }, { n: 'Nurgle' }] },
  }
  const pactbound = { sid: 'pz', name: 'Pactbound Zealots', dp: 2, enhancements: [] }
  const f = { name: 'Chaos Space Marines', units: [vindicator], detachments: [pactbound] }
  const r = {
    name: 'Pact', faction: 'chaos-space-marines', detachments: ['Pactbound Zealots'], battleSize: 'strike-force',
    units: [{ uid: 'a', id: 'chaos-vindicator', size: 0, alleg: 'Khorne' }],
  }
  it('notes the mark in every format', () => {
    expect(buildRosterText(r, { faction: f, core, items }, 'gw')).toContain('  • Mark of Chaos: Khorne')
    expect(buildRosterText(r, { faction: f, core, items }, 'wtc')).toContain('Mark of Chaos: Khorne')
    expect(buildRosterText(r, { faction: f, core, items }, 'compact')).toContain('[Khorne]')
  })
})

describe('allies in the GW export', () => {
  // An allied unit prints under the app's own ALLIED UNITS heading rather than among the army's
  // datasheets — the same heading our importer reads, so the list survives a round trip.
  const inquisitor = {
    id: 'imperial-agents:inquisitor', name: 'Inquisitor', kws: ['Character', 'Infantry'], flags: { char: 1 },
    sizes: [{ pts: 65, per: [1, 1], default: 1 }], defaults: [[0, [[1, 1]]]],
  }
  const allyFaction = { ...faction, units: [...faction.units, inquisitor], allies: [{ key: 'agents', name: 'Agents of the Imperium', ids: [inquisitor.id] }] }
  const withAlly = { ...roster, units: [...roster.units, { uid: 'e', id: 'imperial-agents:inquisitor', size: 0 }] }
  const text = buildRosterText(withAlly, { ...ctx, faction: allyFaction }, 'gw')

  it('prints it under ALLIED UNITS, not under CHARACTERS', () => {
    expect(text).toContain('ALLIED UNITS')
    const chars = text.slice(text.indexOf('CHARACTERS'), text.indexOf('ALLIED UNITS'))
    expect(chars).not.toContain('Inquisitor (')
    expect(text.slice(text.indexOf('ALLIED UNITS'))).toContain('Inquisitor (65 points)')
  })

  it('still counts in the army total', () => {
    expect(text.startsWith('Strike Force Alpha (')).toBe(true)
    expect(text).toContain(`(${85 + 15 + 160 + 10 + 70 + 75 + 65} points)`)
  })
})

describe('buildRosterText — a printed item given up twice on one model', () => {
  // Deathwatch Terminators: the cyclone hands its storm bolter back, then hammer and shield take
  // fist and storm bolter from the same three models and one more (a player, 2026-10-08).
  const dwItems = { 1: 'Storm Bolter', 2: 'Power Fist', 3: 'Cyclone Missile Launcher', 4: 'Thunder Hammer', 5: 'Storm Shield' }
  const dw = {
    id: 'dwt', name: 'Deathwatch Terminator Squad', kws: ['Infantry'], flags: {},
    minis: [{ n: 'Deathwatch Terminator Sergeant' }, { n: 'Deathwatch Terminator' }],
    sizes: [{ pts: 190, per: [5, 5], default: 1, comp: [[0, 1], [1, 4]] }],
    defaults: [[1, [[1, 1], [2, 1]]], [0, [[2, 1], [1, 1]]]],
    gear: [
      { m: 1, in: 'stepper', o: [[[[3, 1], [1, 1]]]], lim: [[0, 3]], rep: [1] },
      { all: 1, in: 'stepper', o: [[[[4, 1], [5, 1]]]], rep: [2, 1] },
    ],
  }
  it('prints the one storm bolter the squad still carries', () => {
    const r = { name: 'X', faction: 'deathwatch', detachments: ['Gladius Task Force'], battleSize: 'strike-force', units: [{ uid: 'u', id: 'dwt', size: 0, wg: [[1, 0, 4], [0, 0, 3]] }] }
    const txt = buildRosterText(r, { ...ctx, faction: { ...faction, units: [dw] }, items: dwItems })
    const bolters = [...txt.matchAll(/(\d+)x Storm Bolter/g)].reduce((s, m) => s + Number(m[1]), 0)
    expect(bolters).toBe(1)
  })
})

// A Russian tournament's list, to the rules an organiser publishes (Ordo Eventus, the owner's
// club, 2026-10-13): the `+ PLAYER NAME / … / ENHANCEMENT` header, "Attached Unit N:" blocks, units
// under keyword prefixes, the model count only where it varies, only the wargear a choice reaches.
describe('rus — the Russian tournament format', () => {
  it('writes the header, the attached blocks and the prefixed units', async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const coreData = (await import('../data/roster/core.js')).default
    const itemsData = (await import('../data/roster/items.js')).default
    const sm = await loadRosterFaction('space-marines')
    const det = sm.detachments.find((d) => d.enhancements?.length && !d.lend)
    const enh = det.enhancements[0].name
    // One Eradicator takes a multi-melta: [group, option, count].
    const erad = sm.units.find((u) => u.id === 'eradicator-squad-with-melta-rifles')
    const egi = erad.gear.findIndex((g) => g.o.some((o) => optionLabel(o, itemsData.items) === 'Multi-melta'))
    const eradMelta = [egi, erad.gear[egi].o.findIndex((o) => optionLabel(o, itemsData.items) === 'Multi-melta'), 1]
    const roster = { name: 'Dragon', faction: 'space-marines', detachments: [det.name], battleSize: 'strike-force', units: [
      { uid: 'c', id: 'captain-in-terminator-armour', size: 0, warlord: true, enh, leaderOf: 't' },
      { uid: 't', id: 'terminator-assault-squad', size: 1 },
      { uid: 'r', id: 'redemptor-dreadnought', size: 0 },
      { uid: 'i', id: 'impulsor', size: 0 },
      { uid: 'e', id: 'eradicator-squad-with-melta-rifles', size: 0, wg: [eradMelta] },
    ] }
    const ctxRus = { faction: sm, core: coreData, items: itemsData.items, who: { player: 'Ivan', hin: '933' } }
    const text = buildRosterText(roster, ctxRus, 'rus')
    const lines = text.split('\n')
    expect(lines[0]).toBe('+'.repeat(47))
    expect(lines.slice(1, 11)).toEqual([
      '+ PLAYER NAME: Ivan', '+ ARMY NAME: Dragon', '+ HIN: 933', '+ FACTION KEYWORD: Imperium - Adeptus Astartes',
      `+ DETACHMENT: ${det.name}`, expect.stringMatching(/^\+ FORCE DISPOSITION: [^,]+$/), expect.stringMatching(/^\+ TOTAL ARMY POINTS: \d+pts$/),
      '+ WARLORD: Captain in Terminator Armour', `+ ENHANCEMENT: CH1: ${enh}`, '+'.repeat(47),
    ])
    expect(text).toContain('\nAttached Unit 1:\nCH1: Captain in Terminator Armour: ')
    expect(text).toMatch(new RegExp(`^CH1: Captain in Terminator Armour: .*${enh}, Warlord \\(\\d+ pts\\)$`, 'm'))
    expect(text).toMatch(/^IN1: \(\d+\) Terminator Assault Squad \(\d+ pts\)$/m)
    expect(text).toMatch(/^DT1: Impulsor \(\d+ pts\)$/m)
    // Only the swaps are written: the multi-melta, not the melta rifles kept beside it; a unit
    // with no swap ends at its name.
    expect(text).toMatch(/^IN\d: \(3\) Eradicator Squad with melta rifles: 1x Multi-melta \(\d+ pts\)$/m)
    expect(text).not.toMatch(/\dx Melta Rifle|Redemptor Fist|Armoured Hull|Twin Lightning Claws|Storm Bolters/i)
    expect(text).toMatch(/^VE1: Redemptor Dreadnought \(\d+ pts\)$/m)
    expect(text).toMatch(/^CH1: Captain in Terminator Armour: [^:]*$/m)
    // The unit lines add up to the header's total.
    const total = Number(/TOTAL ARMY POINTS: (\d+)/.exec(text)[1])
    const sum = [...text.matchAll(/^[A-Z]{2}\d+: .*\((\d+) pts\)$/gm)].reduce((n, x) => n + Number(x[1]), 0)
    expect(sum).toBe(total)
    // No player, no HIN: the name stays empty, the HIN a dash.
    expect(buildRosterText(roster, { ...ctxRus, who: {} }, 'rus')).toContain('+ PLAYER NAME:\n+ ARMY NAME: Dragon\n+ HIN: -\n')
  })
})

// WTC names a Chapter with its own book under the Adeptus Astartes keyword, and our import reads the
// line back to the same faction (2026-10-16: a Blood Angels list came out as "Imperium - Blood
// Angels").
describe('the WTC faction line', () => {
  it.each([
    ['space-marines', 'Imperium - Adeptus Astartes'],
    ['blood-angels', 'Imperium - Adeptus Astartes - Blood Angels'],
    ['dark-angels', 'Imperium - Adeptus Astartes - Dark Angels'],
    ['space-wolves', 'Imperium - Adeptus Astartes - Space Wolves'],
    ['black-templars', 'Imperium - Adeptus Astartes - Black Templars'],
    ['deathwatch', 'Imperium - Adeptus Astartes - Deathwatch'],
    ['orks', 'Xenos - Orks'],
  ])('%s → %s', async (slug, line) => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const { parseList, matchFaction } = await import('./rosterImport.js')
    const core = (await import('../data/roster/core.js')).default
    const items = (await import('../data/roster/items.js')).default.items
    const faction = await loadRosterFaction(slug)
    const roster = { name: 'L', faction: slug, detachments: [], battleSize: 'strike-force', units: [] }
    for (const fmt of ['wtc', 'rus']) {
      const text = buildRosterText(roster, { faction, core, items }, fmt)
      expect(text).toContain(`+ FACTION KEYWORD: ${line}\n`)
      expect(matchFaction(parseList(text).faction)).toBe(slug)
    }
  })
})

// A Codex Chapter's list names its Chapter after the Adeptus Astartes keyword ("… - Salamanders",
// Ordo Eventus's sample, 2026-10-21) — from a Chapter's detachment or Epic Hero in the list, else from
// what the player declared — and the import reads it back as the declaration.
describe('the Chapter on the faction line', () => {
  const line = (text) => /^\+ FACTION KEYWORD: (.*)$/m.exec(text)[1]
  it('comes from the list or the declaration, never from a Chapter the list contradicts', async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const { parseList, matchRoster } = await import('./rosterImport.js')
    const { chapterOf, chapterProof, rosterChapters } = await import('../core/roster/rosterEngine.js')
    const core = (await import('../data/roster/core.js')).default
    const items = (await import('../data/roster/items.js')).default.items
    const faction = await loadRosterFaction('space-marines')
    expect(rosterChapters(faction)).toEqual(['Imperial Fists', 'Iron Hands', 'Raven Guard', 'Salamanders', 'Ultramarines', 'White Scars'])
    const base = { name: 'L', faction: 'space-marines', detachments: [], battleSize: 'strike-force', units: [] }
    const text = (r, fmt = 'rus') => buildRosterText(r, { faction, core, items }, fmt)

    expect(line(text(base))).toBe('Imperium - Adeptus Astartes')
    const declared = { ...base, chapter: 'Salamanders' }
    for (const fmt of ['rus', 'wtc']) expect(line(text(declared, fmt))).toBe('Imperium - Adeptus Astartes - Salamanders')

    const blade = faction.detachments.find((d) => d.chapter === 'Ultramarines')
    const byDetachment = { ...declared, detachments: [blade.name] }
    expect(chapterProof(byDetachment, faction)).toEqual({ chapter: 'Ultramarines', from: blade.name })
    expect(line(text(byDetachment))).toBe('Imperium - Adeptus Astartes - Ultramarines')

    const vulkan = faction.units.find((u) => u.ch === 'Salamanders' && /Vulkan/.test(u.name))
    const byHero = { ...base, units: [{ uid: 'v', id: vulkan.id, size: 0 }] }
    expect(chapterOf(byHero, faction)).toBe('Salamanders')
    // Two Chapters named: only a declaration of one of them stands.
    const both = { ...base, detachments: [blade.name], units: byHero.units }
    expect(chapterOf(both, faction)).toBe(null)
    expect(chapterOf({ ...both, chapter: 'Ultramarines' }, faction)).toBe('Ultramarines')
    expect(chapterOf({ ...both, chapter: 'White Scars' }, faction)).toBe(null)

    const parsed = parseList(text(declared, 'wtc'))
    expect(matchRoster(parsed, { faction, core, items }).payload.chapter).toBe('Salamanders')
  })
})

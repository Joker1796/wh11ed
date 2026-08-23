import { describe, it, expect } from 'vitest'
import { buildRosterText, EXPORT_FORMATS } from './rosterExport.js'

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
const detachment = { sid: 'det-1', name: 'Gladius Task Force', dp: 2, fd: 'Purge the Foe', enhancements: [{ name: 'Artificer Armour', pts: 15, type: 'miniature' }] }
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

describe('buildRosterText — the shapes themselves', () => {
  it('offers exactly the three formats, and defaults to the app’s', () => {
    expect(EXPORT_FORMATS).toEqual(['gw', 'wtc', 'compact'])
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

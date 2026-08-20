import { describe, it, expect } from 'vitest'
import { buildRosterText } from './rosterExport.js'

const core = { battleSizes: [{ id: 'strike-force', name: 'Strike Force', points: 2000, dp: 3, enhLimit: 4, dupLimit: 3 }] }
const items = { 5: 'Power fist' }

const captain = { id: 'captain', name: 'Captain', kws: ['Character', 'Infantry'], flags: { char: 1 }, sizes: [{ pts: 85, per: [1, 1], default: 1 }] }
const lt = { id: 'lt', name: 'Lieutenant', kws: ['Character', 'Infantry'], flags: { char: 1 }, sizes: [{ pts: 70, per: [1, 1], default: 1 }], leads: [{ to: 'intercessor-squad' }] }
const intercessor = {
  id: 'intercessor-squad', name: 'Intercessor Squad', kws: ['Battleline', 'Infantry'], flags: {},
  sizes: [{ pts: 80, per: [5, 5], default: 1 }, { pts: 160, per: [6, 10] }],
  gear: [{ m: 0, t: 1, in: 'checkbox', o: [[9], [5, 10]] }],
}
const detachment = { sid: 'det-1', name: 'Gladius', enhancements: [{ name: 'Artificer Armour', pts: 15 }] }
const faction = { name: 'Space Marines', units: [captain, lt, intercessor], detachments: [detachment] }

const roster = {
  name: 'Strike Force Alpha', faction: 'space-marines', detachments: ['Gladius'], battleSize: 'strike-force',
  units: [
    { uid: 'a', id: 'captain', size: 0, warlord: true, enh: 'Artificer Armour' },
    { uid: 'b', id: 'intercessor-squad', size: 1, count: 8, wg: [[0, 1, 1]] }, // power fist +10
    { uid: 'c', id: 'lt', size: 0, leaderOf: 'b' },
  ],
}

describe('buildRosterText', () => {
  const txt = buildRosterText(roster, { faction, core, items })

  it('has the header with faction, detachment and points', () => {
    expect(txt).toContain('Strike Force Alpha')
    expect(txt).toContain('Space Marines — Gladius')
    // 85 + 15(enh) + 160 + 10(wargear) + 70 = 340
    expect(txt).toContain('Strike Force (340/2000 pts)')
    expect(txt).toContain('Total: 340 / 2000 pts')
  })

  it('groups units and lists warlord / enhancement / wargear / leader', () => {
    expect(txt).toContain('CHARACTERS')
    expect(txt).toContain('BATTLELINE')
    expect(txt).toContain('Captain — 100 pts')       // 85 + 15 enhancement
    expect(txt).toContain('• Warlord')
    expect(txt).toContain('• Enhancement: Artificer Armour (+15)')
    expect(txt).toContain('Intercessor Squad (8) — 170 pts') // 160 + 10 wargear
    expect(txt).toContain('• Power fist')
    expect(txt).toContain('• Leading: Intercessor Squad')
  })
})

describe('buildRosterText — allegiance', () => {
  // "You must select one for that unit and note it on your Army Roster" — a list that doesn't
  // print the mark isn't a legal list, so the export has to carry it.
  const vindicator = {
    id: 'chaos-vindicator', name: 'Chaos Vindicator', kws: ['Vehicle'], flags: {},
    sizes: [{ pts: 185, per: [1, 1], default: 1 }],
    alleg: { g: 'mark-of-chaos', t: 'Mark of Chaos', det: 'Pactbound Zealots', req: 1, o: [{ n: 'Khorne' }, { n: 'Nurgle' }] },
  }
  const pactbound = { sid: 'pz', name: 'Pactbound Zealots', enhancements: [] }
  const f = { name: 'Chaos Space Marines', units: [vindicator], detachments: [pactbound] }
  const r = {
    name: 'Pact', faction: 'chaos-space-marines', detachments: ['Pactbound Zealots'], battleSize: 'strike-force',
    units: [{ uid: 'v', id: 'chaos-vindicator', size: 0, alleg: 'Nurgle', warlord: true }],
  }

  it('prints the chosen mark', () => {
    expect(buildRosterText(r, { faction: f, core, items })).toContain('Mark of Chaos: Nurgle')
  })

  it('says nothing when the gating detachment is gone', () => {
    const other = { ...r, detachments: [] }
    expect(buildRosterText(other, { faction: f, core, items })).not.toContain('Mark of Chaos')
  })
})

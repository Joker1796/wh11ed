// The parser half of `npm run errata-tables`: the lines as GW actually prints them, each spelling
// that broke a first reading. The comparison half needs a wh40k-appdata clone and runs in
// `npm run sync`.
import { describe, it, expect } from 'vitest'
import { parseErrataTable } from './check-errata-tables.mjs'

describe('parseErrataTable', () => {
  it('reads unit rows with and without the dash', () => {
    const t = parseErrataTable('Change the following unit characteristics:\nChanges - Units\n**T**5 - Infractors, Lord Exultant, Sorcerer\n**T**6 Scarab Occult Terminators\n**W**3 Havocs')
    expect(t.unread).toEqual([])
    expect(t.units).toEqual([
      { stat: 'T', value: '5', names: ['Infractors', 'Lord Exultant', 'Sorcerer'] },
      { stat: 'T', value: '6', names: ['Scarab Occult Terminators'] },
      { stat: 'W', value: '3', names: ['Havocs'] },
    ])
  })

  it('reads every weapon-row spelling GW used', () => {
    const t = parseErrataTable([
      'Change the following weapon characteristics:',
      'Weapon - Changes - Units',
      'Boltgun - **S**5, **AP**-1 - Prosecutors',
      'Combi-bolter - **S**5, **AP**-1 Venerable Contemptor Dreadnought',
      'Guardian Spear (ranged) **S**5 - Custodian Guard, Shield-Captain',
      'Boltgun - **S5**, **AP**-1 - Icon Bearer',
      'Bolt Pistol -**S**5 , **AP**-1 -Khorne Berzerkers',
      'Storm Bolter - **S**5, **AP** - 1 Grey Knights Terminator Squad, Imperial Rhino',
      'Inferno',
      'Combi-weapon - **S**5 - Chaos Rhino',
    ].join('\n'))
    expect(t.unread).toEqual([])
    expect(t.weapons.map((w) => [w.weapon, w.changes, w.names])).toEqual([
      ['Boltgun', [['S', '5'], ['AP', '-1']], ['Prosecutors']],
      ['Combi-bolter', [['S', '5'], ['AP', '-1']], ['Venerable Contemptor Dreadnought']],
      ['Guardian Spear (ranged)', [['S', '5']], ['Custodian Guard', 'Shield-Captain']],
      ['Boltgun', [['S', '5'], ['AP', '-1']], ['Icon Bearer']],
      ['Bolt Pistol', [['S', '5'], ['AP', '-1']], ['Khorne Berzerkers']],
      ['Storm Bolter', [['S', '5'], ['AP', '-1']], ['Grey Knights Terminator Squad', 'Imperial Rhino']],
      ['Inferno Combi-weapon', [['S', '5']], ['Chaos Rhino']],
    ])
  })

  it('reports a line it cannot read instead of skipping it', () => {
    const t = parseErrataTable('Change the following unit characteristics:\nToughness becomes 5 for Sorcerers')
    expect(t.unread).toEqual(['Toughness becomes 5 for Sorcerers'])
  })
})

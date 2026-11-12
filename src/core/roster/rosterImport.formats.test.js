import { describe, expect, it } from 'vitest'
import { detectFormat, matchRoster, parseList as parseWith } from './rosterImport.js'
import { factionGroups } from '../../data/factionsIndex.js'
import core from '../../data/roster/core.js'

const parse = (text, format = 'gw') => parseWith(text, format, factionGroups)
const context = async (slug) => {
  const { loadRosterFaction, rosterItems } = await import('../../data/roster/index.js')
  return { faction: await loadRosterFaction(slug), core, items: rosterItems.items }
}

describe('clipboard format boundaries', () => {
  it('unfolds the minimum complete pipe-separated army header', () => {
    const p = parse('Space Marines || Strike Force 2000 points || CHARACTERS || Captain 80 points')
    expect(p.units.map(u => u.name)).toEqual(['Captain'])
    expect(p.limit).toBe(2000)
  })

  it.each([
    ['Notes || KEEP || THESE || PIPES', 'Space Marines\nStrike Force 2000 points\nCaptain 80 points'],
    ['CHARACTERS || KEEP || THESE || PIPES', 'Space Marines\nCaptain 80 points'],
    ['Keep || both words', 'Space Marines\nStrike Force 2000 points\nCHARACTERS\nCaptain 80 points'],
  ])('preserves literal pipes when the separator grammar is incomplete: %s', (title, body) => {
    expect(parse(`${title}\n${body}`).name).toBe(title)
  })

  it.each(['Faction: Space Marines', 'A free title\nCaptain 80 pts'])('does not detect an incomplete format: %s', (text) => {
    expect(detectFormat(text)).toBeNull()
  })

  it('keeps a dash-prefixed Warlord selection and an explicit zero count visible', () => {
    const p = parse('Space Marines\nCHARACTERS\n0x Captain (80 points) - Warlord\n• 1x Captain')
    expect(p.units[0]).toMatchObject({ name: 'Captain', models: 0, warlord: true })
  })

  it('strips an attachment arrow from the first unit without inventing a host', () => {
    const p = parse('Space Marines\nCHARACTERS\n-> Captain (80 points)')
    expect(p.units[0]).toMatchObject({ name: 'Captain', group: null })
  })
})

describe('labelled header boundaries and precedence', () => {
  it.each(['Faction', 'Factions', 'Factions used', 'Faction keyword'])('reads %s before a conflicting bare faction', (label) => {
    const p = parse(`${label}: Necrons\nOrks\nCHARACTERS\nLokhust Lord (80 points)`)
    expect(p.faction).toBe('Necrons')
  })

  it.each(['Army points', 'Total points', 'Total army points'])('reads %s and closes its header fence', (label) => {
    const p = parse(`${label}: 1990\n+++++++++++++++++++++++++++++++++++++++++++++++\nCaptain (80 points)\nArmy Name: Unit note`)
    expect(p.stated).toBe(1990)
    expect(p.name).not.toBe('Unit note')
    expect(p.units[0].weapons.map(g => g.name)).toContain('Army Name: Unit note')
  })

  it('preserves an explicit army name through subtitle and header fence', () => {
    const p = parse('Army name: Named list\nSubtitle\n+++++++++++++++++++++++++++++++++++++++++++++++\nCaptain (80 points)')
    expect(p.name).toBe('Named list')
    expect(p.units.map(u => u.name)).toEqual(['Captain'])
  })

  it('closes a chapter-labelled header before the first priced unit', () => {
    const p = parse('+ Space Marines: Blood Angels\n+++++++++++++++++++++++++++++++++++++++++++++++\nCaptain (80 points)')
    expect(p.faction).toBe('Blood Angels')
    expect(p.units.map(u => u.name)).toEqual(['Captain'])
  })

  it('keeps header-shaped text inside a unit as unplaced loadout', () => {
    const p = parse('Space Marines\nCHARACTERS\nCaptain (80 points)\nFaction: Orks')
    expect(p.faction).toBe('Space Marines')
    expect(p.units[0].weapons.map(g => g.name)).toContain('Faction: Orks')
  })

  it.each([
    ['List (1990 points)\nSpace Marines\n== Decorative roster 2000 pts ==', 1990],
    ['Space Marines\n== Army roster 2000 pts ==', 2000],
  ])('uses a banner total only when a total was not declared', (header, total) => {
    expect(parse(`${header}\nCHARACTERS\nCaptain (80 points)`).stated).toBe(total)
  })

  it.each([
    ['Necrons\nXenos - Orks', 'Necrons'],
    ['A list\nXenos - Necrons\nXenos - Orks', 'Xenos - Orks'],
    ['Necrons - A deployment plan (1000 points)', 'Necrons'],
    ['A list\nUnknown first faction\nUnknown second faction', 'Unknown first faction'],
  ])('preserves faction evidence precedence: %s', (header, faction) => {
    expect(parse(`${header}\nCHARACTERS\nCaptain (80 points)`).faction).toBe(faction)
  })

  it.each([
    'My army - Priority Assets - Renegade Raiders (1990 points)',
    'Chaos Space Marines - Priority Assets - Renegade Raiders - Notes (1990 points)',
    'Chaos Space Marines - Not a disposition - Renegade Raiders (1990 points)',
  ])('does not guess a detachment from an incomplete structured title: %s', (title) => {
    expect(parse(`${title}\nCHARACTERS\nWarpsmith (80 points)`).detachmentLine).toBeFalsy()
  })
})

describe('profile and attachment format semantics', () => {
  it('recognises composite attached headings without a parent section and separates unnumbered groups', () => {
    const p = parse(`Space Marines
Attached unit
Captain + Intercessor Squad (165 points)
Captain (80 points)
Intercessor Squad (85 points)
Attached unit
Captain + Intercessor Squad (165 points)
Captain (80 points)
Intercessor Squad (85 points)`)
    expect(p.units.map(u => u.name)).toEqual(['Captain', 'Intercessor Squad', 'Captain', 'Intercessor Squad'])
    expect(p.units[0].group).toBe(p.units[1].group)
    expect(p.units[2].group).toBe(p.units[3].group)
    expect(p.units[0].group).not.toBe(p.units[2].group)
  })

  it('retains an unknown plus-named unit outside attached sections', () => {
    const p = parse('Space Marines\nOTHER DATASHEETS\nCaptain + Intercessor Squad (165 points)')
    expect(p.units.map(u => u.name)).toEqual(['Captain + Intercessor Squad'])
  })

  it('keeps every explicit leading target without its label', () => {
    const p = parse('Space Marines\nCHARACTERS\nCaptain (80 points)\nLeading Intercessor Squad\nLeading Assault Intercessor Squad')
    expect(p.units[0].attachedTo).toEqual(['Intercessor Squad', 'Assault Intercessor Squad'])
  })

  it('retains unknown attachment roles and separates gear from a known role', () => {
    const p = parse(`Necrons
CHARACTERS
Lokhust Lord (80 points)
• Attached as: Unknown role
Lokhust Lord (80 points)
• Attached as: Leader (Character) lord's blade`)
    expect(p.units[0].attachedAs).toBe('Unknown role')
    expect(p.units[1].attachedAs).toBe('Leader (Character)')
    expect(p.units[1].weapons).toEqual([expect.objectContaining({ name: "lord's blade", mini: null })])
    expect(p.units[1].models).toBeNull()
  })

  it.each(['Captain: Warlord', '1x Captain: Warlord, Bolt pistol'])('reads Warlord on a model line: %s', (body) => {
    const p = parse(`Space Marines\nCHARACTERS\nCaptain (80 points)\n${body}`)
    expect(p.units[0].warlord).toBe(true)
    expect(p.units[0].weapons.some(g => /: Warlord/.test(g.name))).toBe(false)
  })

  it('keeps flattened circular weapons under their actual counted profiles', () => {
    const p = parse(`Thousand Sons
BATTLELINE
Rubric Marines (115 points)
• 1x Aspiring Sorcerer: Force weapon, Warpflame pistol
◦ 1x Malefic Curse
• 4x Rubric Marine
◦ 3x Inferno boltgun
    4 with Close combat weapon
◦ 1x Soulreaper cannon
• Attached as: Bodyguard Icon of Flame`)
    expect(p.units[0].models).toBe(5)
    expect(p.units[0].weapons).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'Warpflame pistol', mini: 'Aspiring Sorcerer' }),
      expect.objectContaining({ name: 'Close combat weapon', mini: 'Rubric Marine', n: 4 }),
      expect.objectContaining({ name: 'Icon of Flame', mini: null }),
    ]))
  })

  it('counts unbulleted profiles beside New Recruit inline and with loadout', () => {
    const p = parse(`Thousand Sons
BATTLELINE
Rubric Marines (115 points)
1x Aspiring Sorcerer: Force weapon, Warpflame pistol
4x Rubric Marine
    4 with Close combat weapon, Inferno boltgun`)
    expect(p.units[0].models).toBe(5)
    expect(p.units[0].modelLines.map(g => [g.name, g.n])).toEqual([['Aspiring Sorcerer', 1], ['Rubric Marine', 4]])
  })

  it('reads canonical loadout/counts from a WTC flat inline body', async () => {
    const p = parse('+ FACTION KEYWORD: Xenos - Necrons\nCH1: Lokhust Heavy Destroyers (165 pts): 3x Destroyer with Enmitic exterminator', 'wtc')
    const { payload, report } = matchRoster(p, await context('necrons'))
    expect(payload.units[0].wg).toEqual([[0, 0, 3]])
    expect(report.units[0].models).toBe(3)
    expect(report.units[0].gear.missing).toEqual([])
  })

  it('keeps Russian tournament attachments when the body also contains unpriced headings', async () => {
    const p = parse(`+ HIN: 1
+ FACTION KEYWORD: Imperium - Space Marines
+ TOTAL ARMY POINTS: 165pts
+++++++++++++++++++++++++++++++++++++++++++++++
Attached Unit 1:
CH1: Captain (80 pts)
BL1: (5) Intercessor Squad (85 pts)`, 'rus')
    const { payload } = matchRoster(p, await context('space-marines'))
    expect(payload.units[0].leaderOf).toBe(payload.units[1].uid)
  })

  // A hand-typed list has no blank line after its last block, so the block runs on into the rest of
  // the army. Units there the Captain could also lead made the bodyguard ambiguous and the whole
  // block was dropped, the Support character with it (2026-11-12).
  it('ends an unclosed Russian tournament block at the unit its characters joined', async () => {
    const p = parse(`+ HIN: 1
+ FACTION KEYWORD: Imperium - Adeptus Astartes
+ TOTAL ARMY POINTS: 600pts
+++++++++++++++++++++++++++++++++++++++++++++++
Attached Unit 1:
CH1: Captain (80 pts)
CH2: Judiciar (70 pts)
IN1: (6) Bladeguard Veteran Squad (180 pts)
BL1: (5) Intercessor Squad (80 pts)
CH3: Lieutenant (65 pts)
VE1: Redemptor Dreadnought (170 pts)`, 'rus')
    const { payload } = matchRoster(p, await context('space-marines'))
    const [captain, judiciar, bladeguard, intercessors, lieutenant] = payload.units
    expect(captain.leaderOf).toBe(bladeguard.uid)
    expect(judiciar.leaderOf).toBe(bladeguard.uid)
    expect(intercessors.leaderOf).toBeUndefined()
    expect(lieutenant.leaderOf).toBeUndefined()
  })
})

it('does not let Attached-as gear turn the remaining weapon line into a model', async () => {
  const p = parse(`Necrons
CHARACTERS
Lokhust Lord (80 points)
• 1x Lord's blade
• Attached as: Leader (Character) Nanoscarab Amulet`)
  const { payload, report } = matchRoster(p, await context('necrons'))
  expect(payload.units[0].wg).toEqual(expect.arrayContaining([[0, 0, 1], [1, 0, 1]]))
  expect(report.units[0].gear.missing).toEqual([])
})

it('does not invent a model bullet on an unbulleted weapon beside a circular item', async () => {
  const p = parse(`Necrons
CHARACTERS
Lokhust Lord (80 points)
1x Lord's blade
◦ 1x Nanoscarab Amulet`)
  const { payload, report } = matchRoster(p, await context('necrons'))
  expect(payload.units[0].wg).toEqual(expect.arrayContaining([[0, 0, 1], [1, 0, 1]]))
  expect(report.units[0].gear.missing).toEqual([])
})

it('does not replace explicitly supplied malformed detachment metadata from the title', () => {
  const p = parse(`Chaos Space Marines - Priority Assets - Renegade Raiders (1990 points)
Detachments: ,
CHARACTERS
Warpsmith (80 points)`)
  expect(p.detachmentLine).toBe(',')
  expect(p.detachments).toEqual([])
})

it('keeps unnumbered attached groups distinct without composite pair headings', async () => {
  const p = parse(`Space Marines
Attached unit
Captain (80 points)
Intercessor Squad (85 points)
Attached unit
Captain (80 points)
Intercessor Squad (85 points)`)
  const { payload } = matchRoster(p, await context('space-marines'))
  expect(payload.units[0].leaderOf).toBe(payload.units[1].uid)
  expect(payload.units[2].leaderOf).toBe(payload.units[3].uid)
})

it('prefers an exact faction over a later fuzzy faction after a separate list title', () => {
  const p = parse(`A named list
Necrons
Xenos - Orks
CHARACTERS
Lokhust Lord (80 points)`)
  expect(p.faction).toBe('Necrons')
  expect(p.name).toBe('A named list')
})

it('does not treat a circle inside an unknown item name as a nested weapon bullet', () => {
  const p = parse(`Space Marines
CHARACTERS
Captain (80 points)
• 1x Captain
• 1x Unknown ◦ inscribed rune`)
  expect(p.units[0].weapons).toContainEqual({ n: 1, name: 'Unknown ◦ inscribed rune', mini: null })
})

// Names typed by hand, from a 45-list tournament corpus (2026-11-12).
describe('hand-typed names', () => {
  it('finds an enhancement written without the "(Aura)" our data carries in its name', async () => {
    const p = parse(`+ FACTION KEYWORD: Chaos - Chaos Knights
+ DETACHMENT: Houndpack Lance
+ TOTAL ARMY POINTS: 155pts
+++++++++++++++++++++++++++++++++++++++++++++++
War Dog Brigand (155 pts)
Enhancement: Final Howl (+20 pts)`, 'wtc')
    const { payload, report } = matchRoster(p, await context('chaos-knights'))
    expect(payload.units[0].enh).toBe('Final Howl (Aura)')
    expect(report.units[0].enh?.ok).toBe(true)
  })

  it('reads a hyphenated wargear name typed without its hyphen', async () => {
    const p = parse(`Imperial Agents
OTHER DATASHEETS
Inquisitorial Agents (100 points)
  • 2x Tomeskull
  • 10x Inquisitorial Agent`)
    const { payload, report } = matchRoster(p, await context('imperial-agents'))
    expect(report.units[0].gear.missing).toEqual([])
    expect(payload.units[0].wg?.length).toBeGreaterThan(0)
  })

  it('reads unit references typed in Cyrillic lookalike letters', async () => {
    const p = parse(`+ HIN: 1
+ FACTION KEYWORD: Imperium - Adeptus Astartes
+ TOTAL ARMY POINTS: 165pts
+ WARLORD: СН1: Captain
+++++++++++++++++++++++++++++++++++++++++++++++
Attached Unit 1:
СН1: Captain (80 pts)
ВL1: (5) Intercessor Squad (85 pts)`, 'rus')
    expect(p.units.map((u) => u.ref)).toEqual(['CH1', 'BL1'])
    const { payload } = matchRoster(p, await context('space-marines'))
    expect(payload.units[0].warlord).toBe(true)
    expect(payload.units[0].leaderOf).toBe(payload.units[1].uid)
  })
})

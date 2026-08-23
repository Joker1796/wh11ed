import { describe, it, expect, beforeAll } from 'vitest'
import { detectFormat, matchFaction, matchRoster, parseList } from './rosterImport.js'
import rosterCore from '../data/roster/core.js'

// A real export from the Warhammer 40,000 app, abridged: the shapes that matter are all here — an
// attached block, a single-model character, a multi-profile squad, a uniform multi-model unit, an
// enhancement, a warlord, and the app's own footer.
const GW = `Khaaaarn! (1975 points)

World Eaters
Strike Force (2000 points)
Berzerker Warband (3 Detachment Points)
Force Dispositions: Purge the Foe

Attached Units
Attached Unit 1

Khârn the Betrayer (115 points)
• Attached as: Leader (Character)
  • 1x Gorechild
    1x Plasma pistol

Khorne Berzerkers (180 points)
• Attached as: Bodyguard (Battleline)
  • 1x Khorne Berzerker Champion
    • 1x Chainblade
      1x Plasma pistol
  • 9x Khorne Berzerker
    • 7x Bolt pistol
      7x Chainblade
      1x Icon of Khorne
      2x Khornate eviscerator
      2x Plasma pistol

CHARACTERS

Daemon Prince of Khorne (220 points)
  • Warlord
  • 1x Hellforged weapons
    1x Infernal cannon
  • Enhancement: Favoured of Khorne

OTHER DATASHEETS

Chaos Spawn (95 points)
  • 2x Chaos Spawn
    • 2x Hideous mutations

Exported with App Version: v2.0.5 (128), Data Version: v886`

const WTC = `+++++++++++++++++++++++++++++++++++++++++++++++
+ FACTION KEYWORD: Chaos - World Eaters
+ DETACHMENT: Berzerker Warband (Purge the Foe)
+ TOTAL ARMY POINTS: 1975pts
+
+ WARLORD: Char1: Khârn the Betrayer
+ ENHANCEMENT: Favoured of Khorne (on Char2: Daemon Prince of Khorne)
+ NUMBER OF UNITS: 3
+++++++++++++++++++++++++++++++++++++++++++++++

Char1: 1x Khârn the Betrayer (115 pts): Gorechild, Plasma pistol
Char2: 1x Daemon Prince of Khorne (220 pts): Hellforged weapons, Infernal cannon
Enhancement: Favoured of Khorne (+15 pts)
10x Khorne Berzerkers (180 pts)
• 1x Khorne Berzerker Champion: Chainblade, Plasma pistol
• 9x Khorne Berzerker: 7x Bolt pistol, 7x Chainblade, Icon of Khorne, 2x Khornate eviscerator, 2x Plasma pistol`

describe('detectFormat', () => {
  it('tells the two families apart, and refuses what is neither', () => {
    expect(detectFormat(GW)).toBe('gw')
    expect(detectFormat(WTC)).toBe('wtc')
    expect(detectFormat('just some text')).toBe(null)
    expect(detectFormat('')).toBe(null)
  })
})

describe('parseList — the GW app', () => {
  const p = parseList(GW)

  it('reads the 11th-edition header, including what the 10th did not have', () => {
    expect(p.name).toBe('Khaaaarn!')
    expect(p.stated).toBe(1975)
    expect(p.faction).toBe('World Eaters')
    expect(p.limit).toBe(2000)
    expect(p.detachments).toEqual(['Berzerker Warband'])
  })

  // The app stopped writing "leading X" on the character: the BLOCK is the link, so both halves
  // have to come out carrying the same group and their own role in it.
  it('keeps an attached block together', () => {
    const khan = p.units.find((u) => u.name === 'Khârn the Betrayer')
    const zerks = p.units.find((u) => u.name === 'Khorne Berzerkers')
    expect(khan.attachedAs).toBe('Leader (Character)')
    expect(zerks.attachedAs).toBe('Bodyguard (Battleline)')
    expect(khan.group).toBe(zerks.group)
  })

  // The tell between "a model line with weapons under it" and "a lone model's second weapon" is
  // the bullet at depth 4, not the indent — both indent the same.
  it('separates model lines from weapons by the bullet, not the indent', () => {
    const khan = p.units.find((u) => u.name === 'Khârn the Betrayer')
    expect(khan.models).toBe(null)                                   // one model, no model line
    expect(khan.weapons.map((w) => w.name)).toEqual(['Gorechild', 'Plasma pistol'])

    const zerks = p.units.find((u) => u.name === 'Khorne Berzerkers')
    expect(zerks.models).toBe(10)
    expect(zerks.weapons).toContainEqual({ n: 2, name: 'Khornate eviscerator', mini: 'Khorne Berzerker' })
    expect(zerks.weapons).toContainEqual({ n: 1, name: 'Plasma pistol', mini: 'Khorne Berzerker Champion' })

    const spawn = p.units.find((u) => u.name === 'Chaos Spawn')
    expect(spawn.models).toBe(2)                                     // uniform unit: one model line
    expect(spawn.weapons).toEqual([{ n: 2, name: 'Hideous mutations', mini: 'Chaos Spawn' }])
  })

  it('picks up the warlord and the enhancement, and stops at the footer', () => {
    const dp = p.units.find((u) => u.name === 'Daemon Prince of Khorne')
    expect(dp.warlord).toBe(true)
    expect(dp.enh).toBe('Favoured of Khorne')
    expect(p.units.some((u) => /Exported/.test(u.name))).toBe(false)
  })
})

describe('parseList — WTC', () => {
  const p = parseList(WTC)

  it('reads the header block, alliance prefix and all', () => {
    expect(p.faction).toBe('World Eaters')
    expect(p.detachments).toEqual(['Berzerker Warband'])
    expect(p.stated).toBe(1975)
  })

  it('follows the header’s Char reference to the warlord', () => {
    expect(p.units.find((u) => u.name === 'Khârn the Betrayer').warlord).toBe(true)
    expect(p.units.find((u) => u.name === 'Daemon Prince of Khorne').warlord).toBe(false)
  })

  it('reads a per-profile line as models plus their weapons', () => {
    const zerks = p.units.find((u) => u.name === 'Khorne Berzerkers')
    expect(zerks.models).toBe(10)
    expect(zerks.enh).toBe(null)
    expect(zerks.weapons).toContainEqual({ n: 2, name: 'Khornate eviscerator', mini: 'Khorne Berzerker' })
  })

  it('attaches an enhancement line to the unit above it', () => {
    expect(p.units.find((u) => u.name === 'Daemon Prince of Khorne').enh).toBe('Favoured of Khorne')
  })
})

describe('matchFaction', () => {
  it('reads a faction name through the apostrophe it was written with', () => {
    expect(matchFaction("T'au Empire")).toBe('tau-empire')
    expect(matchFaction('T’au Empire')).toBe('tau-empire')
    expect(matchFaction('World Eaters')).toBe('world-eaters')
    expect(matchFaction('Squats')).toBe(null)
  })
})

// End to end against the real generated roster bundle — the only test that proves the names in a
// stranger's export actually resolve to our datasheets, options and enhancements.
describe('matchRoster — a real list against our own data', () => {
  let out
  beforeAll(async () => {
    const [{ default: faction }, { default: items }] = await Promise.all([
      import('../data/roster/world-eaters.js'),
      import('../data/roster/items.js'),
    ])
    out = matchRoster(parseList(GW), { faction, core: rosterCore, items: items.items })
  })

  it('resolves every unit, the detachment and the battle size', () => {
    expect(out.report.missing).toEqual([])
    expect(out.report.detachments).toEqual({ matched: ['Berzerker Warband'], missing: [] })
    expect(out.payload.battleSize).toBe('strike-force')
    expect(out.payload.faction).toBe('world-eaters')
    expect(out.payload.units).toHaveLength(4)
  })

  it('links the leader to the unit it was blocked with', () => {
    const khan = out.payload.units.find((u) => u.id === 'kh-rn-the-betrayer')
    const zerks = out.payload.units.find((u) => u.id === 'khorne-berzerkers')
    expect(khan.leaderOf).toBe(zerks.uid)
  })

  // The printed loadout is in the text too; only what DEVIATES from it is a choice. And the same
  // option named once per profile is one pick — two would charge the unit for it twice.
  it('reads only the deviations as picks, once each', () => {
    const zerks = out.payload.units.find((u) => u.id === 'khorne-berzerkers')
    const keys = zerks.wg.map(([gi, oi]) => `${gi}:${oi}`)
    expect(new Set(keys).size).toBe(keys.length)
    expect(zerks.wg.some(([, , n]) => n === 2)).toBe(true)   // 2x Khornate eviscerator
    expect(out.report.units.every((u) => !u.gear.missing.length)).toBe(true)
  })

  it('carries the enhancement and the warlord through', () => {
    const dp = out.payload.units.find((u) => u.id === 'daemon-prince-of-khorne')
    expect(dp.enh).toBe('Favoured of Khorne')
    expect(dp.warlord).toBe(true)
  })

  // Points are OURS. The list's own figure rides along only so the difference can be shown — an
  // export built against another data version is not an import failure.
  it('prices the list itself and keeps the stated figure beside it', () => {
    expect(out.report.points.computed).toBeGreaterThan(0)
    expect(out.report.points.stated).toBe(1975)
    expect(out.report.points.statedUnits).toBe(115 + 180 + 220 + 95)
  })
})

describe('matchRoster — what it cannot place', () => {
  const faction = {
    slug: 'world-eaters',
    name: 'World Eaters',
    units: [{ id: 'jakhals', name: 'Jakhals', kws: [], flags: {}, sizes: [{ pts: 65, per: [10, 10], default: 1 }] }],
    detachments: [{ name: 'Berzerker Warband', enhancements: [] }],
  }
  const text = `List (200 points)

World Eaters
Strike Force (2000 points)
Berzerker Warband (3 Detachment Points)

OTHER DATASHEETS

Jakhals (65 points)
  • 10x Jakhal
    • 1x Mystery gun

Angron (435 points)
  • 1x Samurai sword`

  it('names the unit it could not find instead of dropping it silently', () => {
    const { payload, report } = matchRoster(parseList(text), { faction, core: rosterCore, items: {} })
    expect(payload.units).toHaveLength(1)
    expect(report.missing).toEqual([{ name: 'Angron', pts: 435 }])
    expect(report.units[0].gear.missing).toEqual(['Mystery gun'])
  })

  it('returns an empty report rather than throwing when there is nothing to match against', () => {
    expect(matchRoster(null, {}).payload).toBe(null)
    expect(matchRoster(parseList(text), {}).payload).toBe(null)
  })
})

// The strongest check available without a stranger's file: write a list out, read it back, and see
// whether the same list comes back. It also pins what each format CANNOT carry — a WTC list has no
// name and no attachment, so those two are lost by the format, not by the parser.
describe('round trip — export then import', () => {
  let faction, items
  beforeAll(async () => {
    const [{ default: f }, { default: i }] = await Promise.all([
      import('../data/roster/world-eaters.js'),
      import('../data/roster/items.js'),
    ])
    faction = f
    items = i.items
  })

  const rosterOf = (faction) => {
    const u = (n) => faction.units.find((x) => x.name === n)
    return {
      name: 'Round Trip',
      faction: 'world-eaters',
      detachments: [faction.detachments[0].name],
      battleSize: 'strike-force',
      units: [
        { uid: 'a', id: u('Khârn the Betrayer').id, size: 0, warlord: true, leaderOf: 'b' },
        { uid: 'b', id: u('Khorne Berzerkers').id, size: 0 },
        { uid: 'c', id: u('Chaos Spawn').id, size: 0 },
      ],
    }
  }

  it('comes back identical through the GW format', async () => {
    const { buildRosterText } = await import('./rosterExport.js')
    const ctx = { faction, core: rosterCore, items }
    const roster = rosterOf(faction)
    const { payload, report } = matchRoster(parseList(buildRosterText(roster, ctx, 'gw')), ctx)
    expect(report.missing).toEqual([])
    expect(report.units.flatMap((u) => u.gear.missing)).toEqual([])
    expect(report.points.computed).toBe(report.points.statedUnits)
    expect(buildRosterText(payload, ctx, 'compact')).toBe(buildRosterText(roster, ctx, 'compact'))
  })

  it('comes back through WTC minus what WTC does not carry', async () => {
    const { buildRosterText } = await import('./rosterExport.js')
    const ctx = { faction, core: rosterCore, items }
    const roster = rosterOf(faction)
    const { payload, report } = matchRoster(parseList(buildRosterText(roster, ctx, 'wtc')), ctx)
    expect(report.missing).toEqual([])
    expect(report.points.computed).toBe(report.points.statedUnits)
    expect(payload.name).toBe('Roster')                                   // WTC states no list name
    expect(payload.units.some((u) => u.leaderOf)).toBe(false)             // …and no attachment
    expect(payload.units.map((u) => u.id)).toEqual(roster.units.map((u) => u.id))
  })
})

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

// New Recruit's compact tournament export: the same `+++` header, the body squeezed onto one line
// per unit. Written here the way the readers in circulation accept it — `*` bullets, `points`
// spelled out, quantities without their `x`, an `Infa6:`-style reference, and the enhancement
// stated ONLY in the header.
const WTC_COMPACT = `+++++++++++++++++++++++++++++++++++++++++++++++
+ FACTION KEYWORD: Chaos - World Eaters
+ DETACHMENT: Berzerker Warband (Purge the Foe)
+ TOTAL ARMY POINTS: 430points
+
+ WARLORD: Char1: Khârn the Betrayer
+ ENHANCEMENT: Favoured of Khorne (on Char2: Daemon Prince of Khorne)
+ NUMBER OF UNITS: 3
+++++++++++++++++++++++++++++++++++++++++++++++

Char1: 1 Khârn the Betrayer (115 points): Gorechild, Plasma pistol
  Attached to Khorne Berzerkers
Char2: 1x Daemon Prince of Khorne (220 points): Hellforged weapons, Infernal cannon
Infa6: 10x Khorne Berzerkers (180 points)
* 1 Khorne Berzerker Champion
  1 with Chainblade, Plasma pistol
* 9 Khorne Berzerker
  9 with Bolt pistol, Chainblade`

describe('parseList — WTC-Compact and the loose spellings around it', () => {
  const p = parseList(WTC_COMPACT)

  it('is the same format as WTC, so it is detected and parsed as one', () => {
    expect(detectFormat(WTC_COMPACT)).toBe('wtc')
    expect(p.faction).toBe('World Eaters')
    expect(p.stated).toBe(430)
    expect(p.units).toHaveLength(3)
  })

  it('accepts the loose spellings: * bullets, "points", a bare quantity, any reference prefix', () => {
    const zerks = p.units.find((u) => u.name === 'Khorne Berzerkers')
    expect(zerks.ref).toBe('Infa6')
    expect(zerks.models).toBe(10)
    expect(zerks.weapons).toContainEqual({ n: 9, name: 'Bolt pistol', mini: 'Khorne Berzerker' })
    expect(zerks.weapons).toContainEqual({ n: 1, name: 'Plasma pistol', mini: 'Khorne Berzerker Champion' })
  })

  // A compact export may state an enhancement only in the header — reading the header as a summary
  // and not as a source loses it.
  it('takes the warlord and the enhancement off the header', () => {
    expect(p.units.find((u) => u.name === 'Khârn the Betrayer').warlord).toBe(true)
    expect(p.units.find((u) => u.name === 'Daemon Prince of Khorne').enh).toBe('Favoured of Khorne')
  })

  it('reads the attachment line the format has for it', () => {
    expect(p.units.find((u) => u.name === 'Khârn the Betrayer').attachedTo).toBe('Khorne Berzerkers')
  })
})

describe('matchRoster — an attachment stated as a line', () => {
  // The line sits on one side of the pair, but not always the same side, so the CHARACTER of the
  // two is the leader whichever way round it was written.
  it('makes the character the leader, whichever side carried the line', async () => {
    const [{ default: faction }, { default: items }] = await Promise.all([
      import('../data/roster/world-eaters.js'),
      import('../data/roster/items.js'),
    ])
    const ctx = { faction, core: rosterCore, items: items.items }
    const forward = matchRoster(parseList(WTC_COMPACT), ctx).payload
    expect(forward.units.find((u) => u.id === 'kh-rn-the-betrayer').leaderOf)
      .toBe(forward.units.find((u) => u.id === 'khorne-berzerkers').uid)

    const flipped = WTC_COMPACT
      .replace('Char1: 1 Khârn the Betrayer (115 points): Gorechild, Plasma pistol\n  Attached to Khorne Berzerkers', 'Char1: 1 Khârn the Betrayer (115 points): Gorechild, Plasma pistol')
      .replace('Infa6: 10x Khorne Berzerkers (180 points)', 'Infa6: 10x Khorne Berzerkers (180 points)\n  Attached to Khârn the Betrayer')
    const back = matchRoster(parseList(flipped), ctx).payload
    expect(back.units.find((u) => u.id === 'kh-rn-the-betrayer').leaderOf)
      .toBe(back.units.find((u) => u.id === 'khorne-berzerkers').uid)
  })
})

// listhammer.info, detailed ("with wargear") mode. Same grammar as the app's export, written a
// little differently everywhere — which is the point of this fixture: capitalised "Points", a
// thousands separator, `◦` under the model lines, "Attached unit 1" in lower case, a bare Force
// Disposition line, plural "Enhancements:", and an enhancement whose kind is part of its name.
const LH_FULL = `Dakka  (2.000 Points)

Orks
Freebooter Krew and More Dakka! (3 Detachment Points)
Take and Hold
Strike Force (2.000 Points)

ATTACHED UNITS

Attached unit 1

Ghazghkull Thraka (235 Points)
  • Attached as: Leader (Character)
  • 1x Ghazghkull Thraka
     • Warlord
     ◦ 1x Gork’s Klaw
     ◦ 1x Mork’s Roar
  • 1x Makari
     ◦ 1x Makari’s stabba

Painboy (90 Points)
  • Attached as: Support (Character)
  • 1x Power klaw
  • 1x ’Urty syringe

Boyz (160 Points)
  • Attached as: Bodyguard (Battleline)
  • 19x Boy
     ◦ 19x Choppa
     ◦ 19x Slugga
  • 1x Boss Nob
     ◦ 1x Power klaw
     ◦ 1x Slugga

OTHER DATASHEETS

Flash Gitz (150 Points)
  • 1x Ammo Runt
  • 1x Kaptin
     ◦ 1x Choppa
     ◦ 1x Snazzgun
  • 9x Flash Git
     ◦ 9x Choppa
     ◦ 9x Snazzgun

Lootas (115 Points)
  • Enhancements: Dead Shiny Shootas (Upgrade)
  • 2x Spanner
     ◦ 2x Close combat weapon
     ◦ 2x Kustom mega-blasta
  • 8x Loota
     ◦ 8x Close combat weapon
     ◦ 8x Deffgun

Exported with App Version: v2.4.0 (1), Data Version: v925

Exported from listhammer.info: https://listhammer.info/list/5d540378ffc45bcff8`

// The same list in the site's short mode. One line per unit, attached units joined with " + ",
// counts in MODELS, no wargear — and no faction, detachment or battle size anywhere.
const LH_COMPACT = `Dakka  (2.000 Points)

2x Ghazghkull Thraka + Painboy + 20x Boyz

Big Mek with Shokk Attack Gun + 6x Tankbustas
  Enhancement: Git-Spotter Squig

Wazdakka Gutsmek

10x Flash Gitz

10x Lootas
  Enhancement: Dead Shiny Shootas

Exported with App Version: v2.4.0 (1), Data Version: v925

Exported from listhammer.info: https://listhammer.info/list/5d540378ffc45bcff8`

describe('parseList — listhammer.info, detailed mode', () => {
  const p = parseList(LH_FULL)

  it('is the app’s grammar, so it is read by the same parser', () => {
    expect(detectFormat(LH_FULL)).toBe('gw')
  })

  it('reads a header written its way: capital Points, a thousands separator, two spaces', () => {
    expect(p.name).toBe('Dakka')
    expect(p.stated).toBe(2000)
    expect(p.limit).toBe(2000)
  })

  // The faction is the FIRST bare line, not the last: the Force Disposition is printed bare too,
  // two lines further down, and taking the last would make the army "Take and Hold".
  it('takes the faction and not the Force Disposition under it', () => {
    expect(p.faction).toBe('Orks')
    expect(p.detachments).toEqual(['Freebooter Krew', 'More Dakka!'])
  })

  it('reads ◦ as a bullet, so the model lines still count as models', () => {
    const ghaz = p.units.find((u) => u.name === 'Ghazghkull Thraka')
    expect(ghaz.models).toBe(2)                       // Ghazghkull and Makari
    expect(ghaz.warlord).toBe(true)
    expect(ghaz.weapons).toContainEqual({ n: 1, name: 'Makari’s stabba', mini: 'Makari' })

    const boyz = p.units.find((u) => u.name === 'Boyz')
    expect(boyz.models).toBe(20)
    expect(boyz.weapons).toContainEqual({ n: 1, name: 'Power klaw', mini: 'Boss Nob' })
  })

  it('keeps the whole attached block together, Support slot and all', () => {
    const [ghaz, pain, boyz] = ['Ghazghkull Thraka', 'Painboy', 'Boyz'].map((n) => p.units.find((u) => u.name === n))
    expect(ghaz.group).toBe(boyz.group)
    expect(pain.group).toBe(boyz.group)
    expect(pain.attachedAs).toBe('Support (Character)')
  })

  it('reads the plural "Enhancements:" label', () => {
    expect(p.units.find((u) => u.name === 'Lootas').enh).toBe('Dead Shiny Shootas')
  })
})

describe('parseList — listhammer.info, short mode', () => {
  const p = parseList(LH_COMPACT)

  it('is recognised by what it lacks: no bullets, and only the header prices anything', () => {
    expect(detectFormat(LH_COMPACT)).toBe('listhammer-compact')
    expect(p.name).toBe('Dakka')
    expect(p.stated).toBe(2000)
    expect(p.units).toHaveLength(8)   // three of them are the members of two attached blocks
  })

  // Nothing in the text says which army this is — which is why the import screen has to ask.
  it('carries no faction, detachment or battle size at all', () => {
    expect(p.faction).toBe('')
    expect(p.detachments).toEqual([])
    expect(p.limit).toBe(0)
  })

  it('splits an attached unit on " + ", leaders first and the unit they joined last', () => {
    const [ghaz, pain, boyz] = ['Ghazghkull Thraka', 'Painboy', 'Boyz'].map((n) => p.units.find((u) => u.name === n))
    expect(ghaz.attachedAs).toBe('Leader')
    expect(pain.attachedAs).toBe('Support')
    expect(boyz.attachedAs).toBe('Bodyguard')
    expect(ghaz.group).toBe(boyz.group)
    expect(p.units.find((u) => u.name === 'Wazdakka Gutsmek').group).toBe(null)
  })

  it('reads the count as MODELS, the way the site writes it', () => {
    expect(p.units.find((u) => u.name === 'Ghazghkull Thraka').models).toBe(2)  // …plus Makari
    expect(p.units.find((u) => u.name === 'Boyz').models).toBe(20)              // 19 Boyz + the Nob
    expect(p.units.find((u) => u.name === 'Painboy').models).toBe(null)
  })

  // The enhancement is printed under the GROUP, so it has to be given to a member of it.
  it('gives the enhancement to the character of the group it is printed under', () => {
    expect(p.units.find((u) => u.name === 'Big Mek with Shokk Attack Gun').enh).toBe('Git-Spotter Squig')
    expect(p.units.find((u) => u.name === 'Tankbustas').enh).toBe(null)
    expect(p.units.find((u) => u.name === 'Lootas').enh).toBe('Dead Shiny Shootas')
  })
})

// Both listhammer modes, end to end against the real generated Orks bundle. The two exports are
// the same army, so they must come out priced the same — and equal to what the site itself stated.
describe('matchRoster — listhammer against our own data', () => {
  let ctx
  beforeAll(async () => {
    const [{ default: faction }, { default: items }] = await Promise.all([
      import('../data/roster/orks.js'),
      import('../data/roster/items.js'),
    ])
    ctx = { faction, core: rosterCore, items: items.items }
  })

  it('prices every unit of the detailed export exactly as the site did', () => {
    const { report } = matchRoster(parseList(LH_FULL), ctx)
    expect(report.missing).toEqual([])
    for (const u of report.units) expect([u.name, u.points.computed]).toEqual([u.name, u.points.stated])
    expect(report.points.computed).toBe(report.points.statedUnits)
  })

  // "• 1x Ammo Runt" is printed exactly like a model line, but the datasheet has no such profile:
  // counting it as one made a ten-model unit eleven, which fell into the 5-model bracket and
  // priced Flash Gitz at half.
  it('does not count a unit’s attached extra as a model', () => {
    const { report } = matchRoster(parseList(LH_FULL), ctx)
    const gitz = report.units.find((u) => u.name === 'Flash Gitz')
    expect(gitz.models).toBe(10)
    expect(gitz.points.computed).toBe(150)
  })

  // Our data keeps the kind inside the enhancement's name ("Dead Shiny Shootas (Upgrade)"); the
  // app leaves it off and listhammer prints it. All three have to land on the same enhancement.
  it('matches an enhancement through the kind tag, whichever side carries it', () => {
    const { report, payload } = matchRoster(parseList(LH_FULL), ctx)
    expect(report.units.find((u) => u.name === 'Lootas').enh).toEqual({ name: 'Dead Shiny Shootas', ok: true })
    expect(payload.units.find((u) => u.id === 'lootas').enh).toBe('Dead Shiny Shootas (Upgrade)')
  })

  it('reads the short export into the same army, given the faction the text does not name', () => {
    const parsed = parseList(LH_COMPACT)
    parsed.detachments = ['Freebooter Krew', 'More Dakka!']   // the screen’s faction/detachment step
    const { payload, report } = matchRoster(parsed, ctx)
    expect(report.missing).toEqual([])
    expect(payload.units.map((u) => u.id)).toContain('flash-gitz')
    expect(report.units.find((u) => u.name === 'Flash Gitz').points.computed).toBe(150)
    expect(report.units.find((u) => u.name === 'Lootas').points.computed).toBe(115)   // 100 + the enhancement
    // Both characters of the block joined the same unit — the second one in the Support slot.
    const boyz = payload.units.find((u) => u.id === 'boyz')
    expect(payload.units.find((u) => u.id === 'ghazghkull-thraka').leaderOf).toBe(boyz.uid)
    expect(payload.units.find((u) => u.id === 'painboy').leaderOf).toBe(boyz.uid)
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

  // Both WTC shapes survive the trip whole — the compact one folds the per-profile breakdown into
  // the unit's line, which changes how the loadout is WRITTEN but not what it is. The one thing
  // the format has no field for is the list's own name.
  it.each(['wtc', 'wtc-compact'])('comes back through %s minus the name the format has no field for', async (fmt) => {
    const { buildRosterText } = await import('./rosterExport.js')
    const ctx = { faction, core: rosterCore, items }
    const roster = rosterOf(faction)
    const { payload, report } = matchRoster(parseList(buildRosterText(roster, ctx, fmt)), ctx)
    expect(report.missing).toEqual([])
    expect(report.units.flatMap((u) => u.gear.missing)).toEqual([])
    expect(report.points.computed).toBe(report.points.statedUnits)
    expect(payload.name).toBe('Roster')                                   // WTC states no list name
    expect(buildRosterText({ ...payload, name: roster.name }, ctx, 'compact'))
      .toBe(buildRosterText(roster, ctx, 'compact'))                      // …everything else, incl. the attachment
  })
})

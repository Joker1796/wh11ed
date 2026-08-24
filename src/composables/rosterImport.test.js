import { describe, it, expect, beforeAll } from 'vitest'
import { detectFormat, matchFaction, matchRoster, parseList, resolveDetachmentLine } from './rosterImport.js'
import rosterCore from '../data/roster/core.js'
import { optionItems } from './rosterEngine.js'

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

// Two things a real Thousand Sons export off the same site turned up, both of which had nothing to
// do with listhammer's spelling and everything to do with what the parser assumed.
describe('parseList — a header line with no points, and a weapon two groups offer', () => {
  // Some lists come out with a bare title ("Bootcamp 11th die Zweite"), no points on it. That line
  // then stood where the faction was expected and the import failed with "unknown faction".
  it('reads an unpriced first line as the list’s name, not as its faction', () => {
    const p = parseList(`Bootcamp 11th die Zweite

Thousand Sons
Grand Coven (3 Detachment Points)
Priority Assets
Strike Force (2.000 Points)

CHARACTERS

Magnus the Red (455 Points)
  • Warlord
  • 1x Blade of Magnus`)
    expect(p.name).toBe('Bootcamp 11th die Zweite')
    expect(p.faction).toBe('Thousand Sons')
    expect(p.limit).toBe(2000)
    expect(p.detachments).toEqual(['Grand Coven'])
  })

  // …but a list pasted from its faction line down still has to work, so an exact faction name is
  // never taken for a title.
  it('does not eat the faction when the list was pasted without its title', () => {
    const p = parseList(`Thousand Sons
Strike Force (2000 points)

CHARACTERS

Magnus the Red (455 points)
  • 1x Blade of Magnus`)
    expect(p.faction).toBe('Thousand Sons')
  })

  // A Defiler may replace its heavy baleflamer AND its heavy missile launcher with a heavy reaper
  // autocannon: two paid picks in two different groups, written as two identical lines. Merging
  // them into one pick charged for one of the two.
  it('spends a repeated weapon on a second group before merging it into the first', async () => {
    const [{ default: faction }, { default: items }] = await Promise.all([
      import('../data/roster/thousand-sons.js'),
      import('../data/roster/items.js'),
    ])
    const list = `Coven

Thousand Sons
Grand Coven (3 Detachment Points)
Strike Force (2000 points)

OTHER DATASHEETS

Defiler (330 Points)
  • 2x Excruciator cannon
  • 1x Hades battle cannon
  • 1x Heavy reaper autocannon
  • 1x Heavy reaper autocannon
  • 1x Shearing claws`
    const { payload, report } = matchRoster(parseList(list), { faction, core: rosterCore, items: items.items })
    const defiler = report.units.find((u) => u.name === 'Defiler')
    expect(defiler.points.computed).toBe(330)                       // 300 + 15 + 15
    expect(payload.units[0].wg).toHaveLength(2)
    expect(payload.units[0].wg[0][0]).not.toBe(payload.units[0].wg[1][0])   // …two different groups
  })
})

// A swap can hand out TWO items at once ("their warscythe replaced with 1 hyperphase sword and 1
// dispersion shield"). No export ever names the option — they name what the models carry — so the
// two halves arrive as two lines, and indexing only single-item options left both unplaceable and
// the swap untaken: the unit imported still holding the printed warscythes, at the same price.
// A Deathwatch Kill Team offers a frag cannon, an infernus heavy bolter and a Deathwatch shotgun,
// each "and 1 close combat weapon" — so the close combat weapons in the list belong to no group in
// particular, and a line counting all of them said nothing about how many of any one swap was made.
describe('matchRoster — a bundle half that several groups share', () => {
  let ctx
  beforeAll(async () => {
    const [{ loadRosterFaction }, { default: items }] = await Promise.all([
      import('../data/roster/index.js'),
      import('../data/roster/items.js'),
    ])
    ctx = { faction: await loadRosterFaction('imperial-agents'), core: rosterCore, items: items.items }
  })

  it('counts a bundle by the item that identifies it', async () => {
    const text = `Kill teams (2000 points)

Imperial Agents
Strike Force (2000 points)

BATTLELINE

Deathwatch Kill Team (190 points)
  • 1x Watch Sergeant
    • 1x Astartes shield
      1x Xenophase blade
  • 9x Deathwatch Veterans
    • 1x Astartes shield
      4x Close combat weapon
      4x Deathwatch thunder hammer
      2x Frag cannon
      2x Infernus heavy bolter
      1x Power weapon`
    const { payload, report } = matchRoster(parseList(text), ctx)
    const { faction } = ctx
    const def = faction.units.find((u) => u.id === 'deathwatch-kill-team')
    const gearOf = (weapon) => def.gear.findIndex((g) => (g.o || []).some((o) => optionItems(o).some(([id]) => ctx.items[id] === weapon)))
    const wg = new Map(payload.units[0].wg.map(([gi, , n]) => [gi, n]))
    expect(wg.get(gearOf('Frag cannon'))).toBe(2)              // two, not the four close combat weapons
    expect(wg.get(gearOf('Infernus heavy bolter'))).toBe(2)
    expect(wg.get(gearOf('Deathwatch thunder hammer'))).toBe(4)
    expect(report.units[0].gear.missing).toEqual([])
  })
})

// "This model's lasher tendrils can be replaced with 2 magma cutters" is ONE swap, and the export
// prints what the model ends up holding.
describe('matchRoster — an option that grants two of a weapon', () => {
  it('reads two of them as one pick, not two', async () => {
    const [{ loadRosterFaction }, { default: items }] = await Promise.all([
      import('../data/roster/index.js'),
      import('../data/roster/items.js'),
    ])
    const faction = await loadRosterFaction('emperors-children')
    const text = `Fiends (2000 points)

Emperor’s Children
Strike Force (2000 points)

OTHER DATASHEETS

Maulerfiend (120 points)
  • 2x Magma cutters
    1x Maulerfiend fists`
    const { payload, report } = matchRoster(parseList(text), { faction, core: rosterCore, items: items.items })
    expect(payload.units[0].wg).toEqual([[0, 0, 1]])
    expect(report.units[0].gear.missing).toEqual([])
    expect(report.units[0].points.computed).toBe(120)
  })
})

// Two groups on one datasheet grant the same weapon, and the list holds three of it: the jaws
// bundle gives one, the pair that replaces the Hades autocannons gives two. Both swaps were made,
// and only counting both gets the Forgefiend to the 155 points its own export prints.
describe('matchRoster — a weapon two groups both grant', () => {
  it('spills the copies the best-fitting option cannot hold into the other group', async () => {
    const [{ default: faction }, { default: items }] = await Promise.all([
      import('../data/roster/world-eaters.js'),
      import('../data/roster/items.js'),
    ])
    const text = `Engines (2000 points)

World Eaters
Strike Force (2000 points)

OTHER DATASHEETS

Forgefiend (155 points)
  • 2x Ectoplasma cannon
  • 1x Ectoplasma cannon
  • 1x Forgefiend claws`
    const { payload, report } = matchRoster(parseList(text), { faction, core: rosterCore, items: items.items })
    expect(payload.units[0].wg).toEqual([[1, 0, 1], [0, 0, 1]])
    expect(report.units[0].gear.missing).toEqual([])
    expect(report.units[0].points.computed).toBe(155)
  })

  it('leaves the second group alone when its own weapons are still listed', async () => {
    const [{ default: faction }, { default: items }] = await Promise.all([
      import('../data/roster/world-eaters.js'),
      import('../data/roster/items.js'),
    ])
    const text = `Engines (2000 points)

World Eaters
Strike Force (2000 points)

OTHER DATASHEETS

Forgefiend (145 points)
  • 2x Hades autocannon
  • 1x Ectoplasma cannon
  • 1x Forgefiend claws`
    const { payload, report } = matchRoster(parseList(text), { faction, core: rosterCore, items: items.items })
    expect(payload.units[0].wg).toEqual([[1, 0, 1]])
    expect(report.units[0].points.computed).toBe(145)
  })
})

describe('matchRoster — a bundled wargear option', () => {
  it('takes the swap from either half of the bundle, once, for the right number of models', async () => {
    const [{ default: faction }, { default: items }] = await Promise.all([
      import('../data/roster/necrons.js'),
      import('../data/roster/items.js'),
    ])
    const list = `Mono Ctan (160 points)

Necrons
Cursed Legion (3 Detachment Points)
Strike Force (2000 points)

OTHER DATASHEETS

Lychguard (160 points)
  • 10x Lychguard
    • 10x Dispersion Shield
      10x Hyperphase sword`
    const { payload, report } = matchRoster(parseList(list), { faction, core: rosterCore, items: items.items })
    const lych = report.units.find((u) => u.name === 'Lychguard')
    expect(lych.gear.missing).toEqual([])
    // One pick for ten models — not two picks, and not twenty models restated by the second line.
    expect(payload.units[0].wg).toEqual([[0, 0, 10]])
    expect(lych.points.computed).toBe(160)
  })
})

// A third real list — pasted out of a rendered page rather than off the clipboard, so it arrives
// with a multi-line joke for a title, its points on a line of their own, and every line flush at
// column 0. Everything below was silently wrong on it.
const FLAT = `“Meta? Never Heard of Her.”
Everyone else brought the good stuff.
I brought axes.

(2000 points)

World Eaters
Berzerker Warband (3 Detachment Points)
Priority Assets
Strike Force (2000 points)

Attached Units
Attached Unit 1

Khorne Berzerkers (330 points)
• Attached as: Bodyguard (Battleline)
• 1x Khorne Berzerker Champion
• 1x Chainblade
1x Plasma pistol
• 19x Khorne Berzerker
• 15x Bolt pistol
15x Chainblade
1x Icon of Khorne
4x Khornate eviscerator
4x Plasma pistol

OTHER DATASHEETS

Chaos Spawn (95 points)
• 2x Chaos Spawn
• 2x Hideous mutations

Forgefiend (145 points)
• 1x Ectoplasma cannon
1x Forgefiend claws
2x Hades autocannon`

describe('parseList — a title of several lines, and a body that lost its indentation', () => {
  const p = parseList(FLAT)

  // A list name runs to as many lines as the player is funny, and the Force Disposition is a bare
  // line too — so the faction is the bare line that ANSWERS as one, not the second one down.
  it('finds the faction among the bare lines instead of counting to it', () => {
    expect(p.name).toBe('“Meta? Never Heard of Her.”')
    expect(p.faction).toBe('World Eaters')
    expect(p.limit).toBe(2000)
  })

// A Chapter is printed UNDER its parent faction, and the Chapter is the army: taking the first
  // faction line gave a Dark Angels list the Space Marines data, which has no Azrael, no Deathwing
  // Knights and neither of the list's own detachments — seven units and both detachments missing.
  it('takes the Chapter, not the parent faction printed above it', () => {
    const p = parseList(`What I wasn’t allowed to play at WTC (2000 points)

Space Marines
Dark Angels
Company of Hunters and Darkflight Pursuit (3 Detachment Points)
Reconnaissance
Strike Force (2000 points)

CHARACTERS

Azrael (140 points)
• 1x The Lion Helm`)
    expect(p.faction).toBe('Dark Angels')
    expect(matchFaction(p.faction)).toBe('dark-angels')
    expect(p.detachments).toEqual(['Company of Hunters', 'Darkflight Pursuit'])
  })

  it('still reads the units when every line sits at column 0', () => {
    expect(p.units.map((u) => u.name)).toEqual(['Khorne Berzerkers', 'Chaos Spawn', 'Forgefiend'])
  })
})

describe('matchRoster — the flat body, against our own data', () => {
  let ctx
  beforeAll(async () => {
    const [{ default: faction }, { default: items }] = await Promise.all([
      import('../data/roster/world-eaters.js'),
      import('../data/roster/items.js'),
    ])
    ctx = { faction, core: rosterCore, items: items.items }
  })

  // With no indentation there is nothing in the TEXT to tell a model line from a weapon, so the
  // datasheet decides: a line naming one of its profiles is models, the rest is gear.
  it('recovers the model count from the datasheet’s own profiles', () => {
    const { report } = matchRoster(parseList(FLAT), ctx)
    const zerks = report.units.find((u) => u.name === 'Khorne Berzerkers')
    expect(zerks.models).toBe(20)                    // the champion and nineteen berzerkers
    expect(zerks.points.computed).toBe(330)
    expect(zerks.gear.missing).toEqual([])
  })

  // A single-profile datasheet has no `minis` at all and answers under its own name.
  it('reads a one-profile unit’s count off its own name, not as unplaceable wargear', () => {
    const { report } = matchRoster(parseList(FLAT), ctx)
    const spawn = report.units.find((u) => u.name === 'Chaos Spawn')
    expect(spawn.models).toBe(2)
    expect(spawn.gear.missing).toEqual([])
  })

  // …and it names its models in the singular while the datasheet is plural. 158 datasheets are
  // named that way, and on several the count decides the price (Rangers: 5 models 60pts, 6-10
  // models 110pts), so the fold is not cosmetic.
  it('folds the plural when a datasheet is named for its models', async () => {
    const [{ default: faction }, { default: items }] = await Promise.all([
      import('../data/roster/aeldari.js'),
      import('../data/roster/items.js'),
    ])
    const list = `Rangers only

Aeldari
Strike Force (2,000 Points)

OTHER DATASHEETS

Rangers (110 Points)
• 7x Ranger
◦ 7x Close combat weapon
◦ 7x Long rifle`
    const { report } = matchRoster(parseList(list), { faction, core: rosterCore, items: items.items })
    const rangers = report.units.find((u) => u.name === 'Rangers')
    expect(rangers.models).toBe(7)
    expect(rangers.points.computed).toBe(110)     // the 6-10 bracket, not the 5-model one
    expect(rangers.gear.missing).toEqual([])
  })

  // A Forgefiend's ectoplasma cannon comes either from its autocannons or from its jaws. With
  // "2x Hades autocannon" still listed, the autocannons were plainly not swapped — a swap takes
  // something away — so the cannon came from the jaws. Taking the wrong group charged both.
  it('will not take a swap whose replaced weapon is still in the list', () => {
    const { report } = matchRoster(parseList(FLAT), ctx)
    expect(report.units.find((u) => u.name === 'Forgefiend').points.computed).toBe(145)
  })
})

// listhammer's plain-text mode: the same body grammar, a LABELLED header closed by a row of '+',
// section headings that end in a colon, "pts" for "points", model lines that fold the loadout into
// the name, and the detachment keyword printed as if it were wargear.
const LH_TEXT = `List Name: All Dogs go to Heaven
Factions Used: Chaos Knights, Heretic Astartes
Army Points: 440
Army Enhancements (list on which model): Final Howl (Aura) (on War Dog Brigand), Preyslayer's Mantle (on War Dog Karnivore)
Disposition: Take and Hold
Detachment(s): Iconoclast Fiefdom, Houndpack Lance
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

BATTLELINE:
Cultist Mob (50 pts)
\u2022 Cultist Champion
\u2022 Autopistol
\u2022 Brutal assault weapon
\u2022 9x Cultist w/ autopistol and brutal assault weapon
\u2022 9x Autopistol
\u2022 9x Brutal assault weapon

War Dog Brigand (160 pts)
\u2022 Armoured feet
\u2022 Avenger chaincannon
\u2022 Daemonbreath spear
\u2022 Havoc multi-launcher
\u2022 Houndpack Lance Character
\u2022 Enhancement: Final Howl (Aura)

War Dog Karnivore (170 pts)
\u2022 Havoc multi-launcher
\u2022 Houndpack Lance Character
\u2022 Reaper chaintalon
\u2022 Slaughterclaw
\u2022 Warlord
\u2022 Enhancement: Preyslayer's Mantle


OTHER DATASHEETS:
Fellgor Beastmen (60 pts)
\u2022 7x Beastman
\u2022 7x Autopistol
\u2022 7x Close combat weapon
\u2022 Beastman w/ corrupted stave
\u2022 Autopistol
\u2022 Corrupted stave
\u2022 Beastman w/ great weapon
\u2022 Autopistol
\u2022 Great weapon
\u2022 Fellgor Champion
\u2022 Chainsword
\u2022 Plasma pistol

Exported from listhammer.info: https://listhammer.info/list/6861330b3cc3b03832`

describe('parseList — listhammer.info, plain-text mode', () => {
  const p = parseList(LH_TEXT)

  it('is the same grammar again, so the same parser reads it', () => {
    expect(detectFormat(LH_TEXT)).toBe('gw')
  })

  // Nothing here has to be guessed at: the header says which line is what. Read as bare lines,
  // the title came out as "List Name: All Dogs go to Heaven" and the faction as the whole
  // "Factions Used:" line, which matched no army at all.
  it('reads the header from its labels', () => {
    expect(p.name).toBe('All Dogs go to Heaven')
    expect(p.stated).toBe(440)
    expect(p.faction).toBe('Chaos Knights')          // the army's own; the rest of the line is its allies
    expect(p.detachmentLine).toBe('Iconoclast Fiefdom, Houndpack Lance')
  })

  it('reads "pts" as points, and a section heading that ends in a colon as a heading', () => {
    expect(p.units.map((u) => u.name)).toEqual(['Cultist Mob', 'War Dog Brigand', 'War Dog Karnivore', 'Fellgor Beastmen'])
    expect(p.units[2].weapons.map((w) => w.name)).not.toContain('OTHER DATASHEETS:')
  })
})

describe('matchRoster — listhammer.info, plain-text mode', () => {
  let ctx
  beforeAll(async () => {
    const [{ loadRosterFaction }, { default: items }] = await Promise.all([
      import('../data/roster/index.js'),
      import('../data/roster/items.js'),
    ])
    ctx = { faction: await loadRosterFaction('chaos-knights', { allies: true }), core: rosterCore, items: items.items }
  })

  // This export names a profile more briefly than appdata does — "Beastman" for a FELLGOR
  // BEASTMEN profile — and folds the loadout into the name, so only the champion answered as a
  // model and a ten-model mob came out as one. A count no bracket allows is not a count.
  it('counts the models even where it does not recognise their names', () => {
    const { report } = matchRoster(parseList(LH_TEXT), ctx)
    const cultists = report.units.find((u) => u.name === 'Cultist Mob')
    expect([cultists.models, cultists.points.computed]).toEqual([10, 50])
    const beastmen = report.units.find((u) => u.name === 'Fellgor Beastmen')
    expect([beastmen.models, beastmen.points.computed]).toEqual([10, 60])
    expect(report.units.flatMap((u) => u.gear.missing)).toEqual([])
  })

  it('reads the detachment keyword printed among the wargear', () => {
    const { payload } = matchRoster(parseList(LH_TEXT), ctx)
    const brigand = payload.units.find((u) => u.id === 'war-dog-brigand')
    expect(brigand.alleg).toBe('Character')          // Houndpack Lance's "those units have CHARACTER"
    expect(brigand.enh).toBe('Final Howl (Aura)')
  })

  it('places the whole list at the points it states', () => {
    const { report } = matchRoster(parseList(LH_TEXT), ctx)
    expect(report.missing).toEqual([])
    expect(report.detachments).toEqual({ matched: ['Iconoclast Fiefdom', 'Houndpack Lance'], missing: [] })
    expect(report.points.computed).toBe(440)
    expect(report.points.computed).toBe(report.points.stated)
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

// A real export with an allied unit in it — an Inquisitor attached to a Custodian Guard squad in a
// Custodes army. Until the roster could hold allies at all, this list came in 110 points light with
// "Inquisitor Draxus" in the not-found column.
const ALLIED = `“CuStOdEs DoN’t ShOoT WeLl” (2,000 Points)

Adeptus Custodes
Lions of the Emperor and Might of the Moritoi (3 Detachment Points)
Strike Force (2,000 Points)

ATTACHED UNITS

Attached unit 1

Inquisitor Draxus (110 Points)
• Attached as: Leader (Character)
• 1x Dirgesinger
• 1x Power fist
• 1x Psychic Tempest

Custodian Guard (215 Points)
• Attached as: Bodyguard (Battleline)
• 5x Custodian Guard
◦ 4x Guardian spear
◦ 1x Misericordia
◦ 1x Praesidium Shield
◦ 1x Vexilla

Exported from listhammer.info: https://listhammer.info/list/58d9d3ca5cfa23840d`

describe('matchRoster — an allied unit', () => {
  let ctx
  beforeAll(async () => {
    const [{ loadRosterFaction }, { default: items }] = await Promise.all([
      import('../data/roster/index.js'),
      import('../data/roster/items.js'),
    ])
    ctx = { faction: await loadRosterFaction('adeptus-custodes', { allies: true }), core: rosterCore, items: items.items }
  })

  it('places it, at the price it costs as an ally', () => {
    const { report, payload } = matchRoster(parseList(ALLIED), ctx)
    expect(report.missing).toEqual([])
    const draxus = report.units.find((u) => u.name === 'Inquisitor Draxus')
    expect([draxus.points.computed, draxus.points.stated]).toEqual([110, 110])
    expect(payload.units.map((u) => u.id)).toContain('imperial-agents:inquisitor-draxus')
    expect(report.points.computed).toBe(report.points.statedUnits)
  })

  // Two datasheets share the name across that line, and an Astra Militarum list saying
  // "Ministorum Priest" means its own — the ally is only reached when the army has nothing by
  // that name.
  it('prefers the army’s own datasheet over an ally of the same name', async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const { default: items } = await import('../data/roster/items.js')
    const faction = await loadRosterFaction('astra-militarum', { allies: true })
    const text = `Priests (2000 points)\n\nAstra Militarum\nStrike Force (2000 points)\n\nCHARACTERS\n\nMinistorum Priest (35 points)\n  • 1x Laspistol`
    const { payload } = matchRoster(parseList(text), { faction, core: rosterCore, items: items.items })
    expect(payload.units[0].id).toBe('ministorum-priest')
  })
})

// "Legends of Saga and Song and Saga of the Great Wolf" is TWO detachments, and both of them
// contain "and" — the line cannot be split as text at all, only against the faction's own list.
describe('the detachment line', () => {
  const known = [
    { name: 'Legends of Saga and Song' }, { name: 'Saga of the Great Wolf' },
    { name: 'Champions of Russ' }, { name: 'Stormlance Task Force' },
  ]

  it('carves the longest known names out of it', () => {
    expect(resolveDetachmentLine('Legends of Saga and Song and Saga of the Great Wolf', known))
      .toEqual({ matched: ['Legends of Saga and Song', 'Saga of the Great Wolf'], missing: [] })
  })

  it('keeps them in the order the line writes them', () => {
    expect(resolveDetachmentLine('Champions of Russ, Stormlance Task Force', known).matched)
      .toEqual(['Champions of Russ', 'Stormlance Task Force'])
  })

  // Whatever is left after the known names are taken out is a detachment we don't have — reported
  // as written, not folded to lower case.
  it('reports what it could not place', () => {
    expect(resolveDetachmentLine('Champions of Russ and Wolves of Fenris', known))
      .toEqual({ matched: ['Champions of Russ'], missing: ['Wolves of Fenris'] })
  })

  it('reads a real list whose two detachments both contain “and”', async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const { default: items } = await import('../data/roster/items.js')
    const text = `Saga (2000 points)

Space Marines
Space Wolves
Legends of Saga and Song and Saga of the Great Wolf (3 Detachment Points)
Strike Force (2000 points)

CHARACTERS

Logan Grimnar (100 points)
• Warlord
• 1x Axe Morkai`
    const faction = await loadRosterFaction('space-wolves')
    const { report } = matchRoster(parseList(text), { faction, core: rosterCore, items: items.items })
    expect(report.detachments).toEqual({ matched: ['Legends of Saga and Song', 'Saga of the Great Wolf'], missing: [] })
    expect(report.missing).toEqual([])
  })
})

// A New Recruit / WTC list with an ally in it: an Imperial Knights army whose sixth entry is an
// Agents of the Imperium character. The header format carries no bullets and no sections, so this
// pins the OTHER parser against the same feature — plus two enhancements, one of them declared on a
// continuation line of the header block.
const WTC_ALLY = `+++++++++++++++++++++++++++++++++++++++++++++++
+ FACTION KEYWORD: Imperium - Imperial Knights
+ DETACHMENT: Questoris Companions (Heroes of Legend)
+ TOTAL ARMY POINTS: 2000pts
+ WARLORD: Char1: Canis Rex
+ ENHANCEMENT: Pennant of Silvered Fury (on Char3: Cerastus Knight Lancer)
& Wyrmslayer Divination (on Char4: Knight Crusader)
+ NUMBER OF UNITS: 6
+++++++++++++++++++++++++++++++++++++++++++++++

Char1: 2x Canis Rex (415 pts): Warlord
• 1x Canis Rex: Freedom's Hand, Las-impulsor, Questoris multi-laser
• 1x Sir Hekhtur: Close combat weapon, Hekhtur's pistol
Char2: 1x Cerastus Knight Atrapos (405 pts): Atrapos lascutter, Graviton singularity cannon
Char3: 1x Cerastus Knight Lancer (430 pts): Cerastus shock lance
Enhancement: Pennant of Silvered Fury (+15 pts)
Char4: 1x Knight Crusader (420 pts): Avenger gatling cannon, Heavy flamer, Titanic feet, Questoris heavy stubber, Questoris heavy stubber, Rapid-fire battle cannon
Enhancement: Wyrmslayer Divination (+10 pts)
Char5: 1x Knight Destrier (265 pts): Questoris heavy stubber, Titanic feet, Chastiser gatling cannon, Frag bombard

Char6: 1x Watch Captain Artemis (65 pts): Hellfire Extremis, Master-crafted power weapon

Created with newrecruit.eu v35.61`

// A list can arrive as the WTC HEADER over somebody else's body — listhammer re-exports a New
// Recruit list that way. Read as WTC, every bullet counted as a profile and the attachments were
// lost with them.
const WTC_GW_BODY = `+++++++++++++++++++++++++++++++++++++++++++++++
+ FACTION KEYWORD: Imperium - Adeptus Astartes - Blood Angels
+ DETACHMENT: Stormlance Task Force, Vengeful Hosts (Lightning Assault)
+ TOTAL ARMY POINTS: 355pts
+
+ WARLORD: Char1: Commander Dante
+ ENHANCEMENT: Orksbane (on Char3: Captain with Jump Pack)
+++++++++++++++++++++++++++++++++++++++++++++++

Attached Units
Attached Unit 1

Captain with Jump Pack (100 pts)
\u2022 Attached as: Leader (Character)
\u2022 1x Orksbane
\u2022 1x Relic Shield
\u2022 1x Thunder Hammer

Sanguinary Guard (125 pts)
\u2022 Attached as: Bodyguard
\u2022 3x Sanguinary Guard
\u2022 3x Encarmine Spear
\u2022 2x Angelus Boltgun
\u2022 1x Inferno Pistol
\u2022 Sanguinary Banner

OTHER DATASHEETS

Scout Squad (65 pts)
\u2022 1x Scout Sergeant
\u2022 1x Bolt pistol
\u2022 1x Close combat weapon
\u2022 1x Astartes Chainsword
\u2022 4x Scouts
\u2022 4x Bolt pistol
\u2022 4x Close combat weapon
\u2022 4x Combat Knife

Vindicator (185 pts)
\u2022 1x Armoured Tracks
\u2022 1x Demolisher Cannon
\u2022 1x Hunter-killer missile
\u2022 1x Storm bolter

Created with newrecruit.eu v35.49`

describe('parseList — a WTC header over a listhammer body', () => {
  const p = parseList(WTC_GW_BODY)

  it('keeps what only the header says, and reads the body as what it is', () => {
    expect(detectFormat(WTC_GW_BODY)).toBe('wtc')
    expect(p.faction).toBe('Adeptus Astartes - Blood Angels')
    expect(p.detachments).toEqual(['Stormlance Task Force', 'Vengeful Hosts'])
    expect(p.stated).toBe(355)
    // The attachment block is the body's, and the "Attached as:" line is not a model of anything.
    const [captain, guard] = p.units
    expect(captain.group).toBe(guard.group)
    expect(captain.attachedAs).toBe('Leader (Character)')
    expect(p.units.flatMap((u) => u.weapons.map((w) => w.name))).not.toContain('Leader (Character)')
  })

  it('takes the warlord and the enhancement from the header, by name', () => {
    expect(p.units.find((u) => u.name === 'Captain with Jump Pack').enh).toBe('Orksbane')
    expect(p.warlord.name).toBe('Commander Dante')
  })
})

describe('matchRoster — a WTC header over a listhammer body', () => {
  it('places every unit at its stated points, attachments and all', async () => {
    const [{ loadRosterFaction }, { default: items }] = await Promise.all([
      import('../data/roster/index.js'),
      import('../data/roster/items.js'),
    ])
    const faction = await loadRosterFaction('blood-angels')
    const { report, payload } = matchRoster(parseList(WTC_GW_BODY), { faction, core: rosterCore, items: items.items })
    expect(report.missing).toEqual([])
    expect(report.units.flatMap((u) => u.gear.missing)).toEqual([])
    expect(report.points.computed).toBe(report.points.statedUnits)
    // A ten-model squad printed as "1x Scout Sergeant" + "4x Scouts" is five models, not one.
    expect(report.units.find((u) => u.name === 'Scout Squad').models).toBe(5)
    expect(payload.units.find((u) => u.id === 'captain-with-jump-pack').leaderOf).toBeTruthy()
  })

  // Codex: Space Marines detachments are the Chapters' too — appdata says which, and what they
  // cost each of them (Stormlance Task Force is 3 DP for a Codex army, 2 for Blood Angels).
  it('finds a Codex detachment in a Chapter army', async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const ba = await loadRosterFaction('blood-angels')
    const stormlance = ba.detachments.find((d) => d.name === 'Stormlance Task Force')
    expect(stormlance).toBeTruthy()
    expect(stormlance.dp).toBe(2)
    expect(ba.detachments.find((d) => d.name === 'Angelic Inheritors')).toBeTruthy()
    // Black Templars have no Librarians, and appdata does not offer them the Conclave.
    const bt = await loadRosterFaction('black-templars')
    expect(bt.detachments.find((d) => d.name === 'Librarius Conclave')).toBeFalsy()
    expect(bt.detachments.find((d) => d.name === 'Gladius Task Force')).toBeTruthy()
  })
})

describe('matchRoster — an ally in the WTC format', () => {
  it('places it and lands on the stated total', async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const { default: items } = await import('../data/roster/items.js')
    const faction = await loadRosterFaction('imperial-knights', { allies: true })
    const { report, payload } = matchRoster(parseList(WTC_ALLY), { faction, core: rosterCore, items: items.items })
    expect(report.missing).toEqual([])
    expect(payload.units.map((u) => u.id)).toContain('imperial-agents:watch-captain-artemis')
    expect(report.points.computed).toBe(2000)
    expect(report.points.computed).toBe(report.points.statedUnits)
    // Both enhancements, one of them declared on the header's continuation line — and their points
    // are already inside the unit prices the list states, never added twice.
    expect(report.units.filter((u) => u.enh?.ok).map((u) => u.enh.name))
      .toEqual(['Pennant of Silvered Fury', 'Wyrmslayer Divination'])
  })

  // Sir Hekhtur is a datasheet of his own that arrives when Canis Rex is destroyed, and appdata
  // gives him no points or composition, so the roster layer drops him and records the name
  // (`noBuild`). Every exporter still prints him and his two weapons inside the Canis Rex entry,
  // because that is how the datasheet reads — they are neither models of the unit nor wargear it
  // could take, so they are passed over instead of reported at a reader who could do nothing
  // about them.
  it('passes over a profile no list can buy, without counting or reporting it', async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const { default: items } = await import('../data/roster/items.js')
    const faction = await loadRosterFaction('imperial-knights', { allies: true })
    expect(faction.noBuild).toEqual(['Sir Hekhtur'])
    const { report } = matchRoster(parseList(WTC_ALLY), { faction, core: rosterCore, items: items.items })
    const rex = report.units.find((u) => u.name === 'Canis Rex')
    expect([rex.models, rex.points.computed]).toEqual([1, 415])   // one Knight, not two models
    expect(rex.gear.missing).toEqual([])
    expect(report.units.flatMap((u) => u.gear.missing)).toEqual([])
  })
})

// The Adeptus Mechanicus list whose name is a whole poem. Its points sit at the end of the LAST
// title line rather than on the first, and reading that line as a 2000-point unit also cost the
// list its faction: the "Adeptus Mechanicus" line below it was swallowed as part of that unit's
// body. Four real shapes at once — a long title, two detachments that both contain "and", an ally,
// and a datasheet whose default loadout appdata records in two disagreeing tables.
const POEM = `PORTRAIT OF A MACHINE

What nudity is beautiful as this
obedient monster purring as its toil;

(A poem written by Luis Untermeyer c. 1922) (2000 points)

Adeptus Mechanicus
Lords of the Forge and Skitarii Hunter Cohort (3 Detachment Points)
Priority Assets
Strike Force (2000 points)

Attached Units
Attached Unit 1

Inquisitor Draxus (110 points)
• Attached as: Leader
• 1x Dirgesinger
1x Power fist
1x Psychic Tempest

Skitarii Vanguard (85 points)
• Attached as: Bodyguard (Battleline)
• 1x Skitarii Vanguard Alpha
• 1x Alpha combat weapon
1x Close combat weapon
1x Radium carbine
• 9x Skitarii Vanguard
• 1x Arc rifle
9x Close combat weapon
1x Omnispex
1x Plasma caliver
6x Radium carbine
1x Transuranic arquebus

OTHER DATASHEETS

Servitor Battleclade (65 points)
• 1x Servitor Underseer
• 1x Dataspikes
1x Mechanicus pistol
• 2x Gun Servitor
• 1x Heavy arc rifle
1x Heavy bolter
2x Servo-claw
• 6x Combat Servitor
• 6x Phosphor blaster
6x Servo-claw

Exported from listhammer.info: https://listhammer.info/list/94559d44c02a833b0d`

describe('matchRoster — a title that prices itself several lines down', () => {
  let ctx
  beforeAll(async () => {
    const [{ loadRosterFaction }, { default: items }] = await Promise.all([
      import('../data/roster/index.js'),
      import('../data/roster/items.js'),
    ])
    ctx = { faction: await loadRosterFaction('adeptus-mechanicus', { allies: true }), core: rosterCore, items: items.items }
  })

  it('reads the points as the list’s own, and still finds the faction below them', () => {
    const p = parseList(POEM)
    expect(p.name).toBe('PORTRAIT OF A MACHINE')
    expect([p.stated, p.limit]).toEqual([2000, 2000])
    expect(matchFaction(p.faction)).toBe('adeptus-mechanicus')
    const { report } = matchRoster(p, ctx)
    expect(report.missing).toEqual([])                       // the poem's last line is not a unit
    expect(report.detachments).toEqual({ matched: ['Lords of the Forge', 'Skitarii Hunter Cohort'], missing: [] })
  })

  // Two Gun Servitors carry a heavy arc rifle and a heavy bolter between them. appdata's loadout
  // ROW records neither (only the servo-claw); its "Default Wargear" group records all three, and
  // the generator now merges what the row leaves out — so these two stop being reported as wargear
  // we could not place.
  it('knows the default weapons appdata keeps in its other table', () => {
    const { report } = matchRoster(parseList(POEM), ctx)
    const clade = report.units.find((u) => u.name === 'Servitor Battleclade')
    expect(clade.gear.missing).toEqual([])
    expect(clade.points.computed).toBe(65)
  })

  // Draxus leads "any IMPERIUM BATTLELINE INFANTRY unit" — a keyword, not a list of names, which is
  // the only way an allied leader can join anything in the army it was lent to.
  it('attaches an allied leader to a host unit it can join by keyword', async () => {
    const { payload } = matchRoster(parseList(POEM), ctx)
    const { validateRoster } = await import('./rosterValidation.js')
    const draxus = payload.units.find((u) => u.id === 'imperial-agents:inquisitor-draxus')
    const vanguard = payload.units.find((u) => u.id === 'skitarii-vanguard')
    expect(draxus.leaderOf).toBe(vanguard.uid)
    const codes = validateRoster(payload, { faction: ctx.faction, core: rosterCore }).issues.map((i) => i.code)
    expect(codes).not.toContain('leaderTargetInvalid')
  })
})

// One weapon offered by two of a datasheet's groups, where the OTHER weapon in the list is offered
// by only one of them: a Falcon's shuriken cannon can replace either the scatter laser or the twin
// shuriken catapult, and its bright lance can only be the scatter laser's. Taking the cannon from
// the scatter laser's group too put two picks in a group that allows one.
describe('matchRoster — two picks that share a group', () => {
  it('spends a fresh group before a second option of one already used', async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const { default: items } = await import('../data/roster/items.js')
    const faction = await loadRosterFaction('aeldari')
    const text = `Falcons (2000 points)\n\nAeldari\nStrike Force (2000 points)\n\nOTHER DATASHEETS\n\nFalcon (130 Points)\n• 1x Bright lance\n• 1x Pulse laser\n• 1x Shuriken cannon\n• 1x Wraithbone hull`
    const { payload, report } = matchRoster(parseList(text), { faction, core: rosterCore, items: items.items })
    expect(report.units[0].gear.missing).toEqual([])
    expect(payload.units[0].wg.map(([gi]) => gi).sort()).toEqual([0, 1])
  })
})

// A Deathwatch list, which turned out to hold three separate faults at once — and was the one that
// came in OVER the points limit.
const DW = `purge those foes (2000 points)

Space Marines
Deathwatch
Black Spear Task Force (3 Detachment Points)
Strike Force (2000 points)

CHARACTERS

Captain in Gravis Armour (105 points)
• Warlord
• 1x Boltstorm gauntlet
1x Power fist
1x Relic blade
• Enhancement: Thief of Secrets

OTHER DATASHEETS

Deathwatch Terminator Squad (190 points)
• 1x Deathwatch Terminator Sergeant
• 1x Storm Shield
1x Thunder hammer
• 4x Deathwatch Terminator
• 3x Cyclone missile launcher
3x Power fist
1x Storm Shield
3x Storm bolter
1x Thunder hammer

Indomitor Kill Team (275 points)
• 4x Kill Team Heavy Intercessors
• 4x Bolt pistol
4x Close combat weapon
2x Deathwatch heavy bolt rifle
2x Deathwatch heavy bolter
• 3x Kill Team Heavy Intercessor with power fists
• 3x Flamestorm gauntlets
3x Twin power fists
• 3x Kill Team Heavy Intercessor with melta rifle
• 3x Bolt pistol
3x Close combat weapon
2x Melta rifle
1x Multi-melta

Exported from listhammer.info: https://listhammer.info/list/203446373405ffec85`

describe('matchRoster — a squad that swaps in pairs', () => {
  let ctx
  beforeAll(async () => {
    const [{ loadRosterFaction }, { default: items }] = await Promise.all([
      import('../data/roster/index.js'),
      import('../data/roster/items.js'),
    ])
    ctx = { faction: await loadRosterFaction('deathwatch', { allies: true }), core: rosterCore, items: items.items }
  })

  // A stepper counts MODELS, per profile. The sergeant's thunder hammer and storm shield are one
  // swapped model and the squad's are another; folding all four lines into one bucket counted three
  // swapped models at 5 points each and put the whole army 10 points over its limit.
  it('counts a paired swap once per profile, not once per line', () => {
    const { report, payload } = matchRoster(parseList(DW), ctx)
    const term = report.units.find((u) => u.name === 'Deathwatch Terminator Squad')
    expect([term.points.computed, term.points.stated]).toEqual([190, 190])
    const wg = payload.units.find((u) => u.id === 'deathwatch-terminator-squad').wg
    expect(wg.find(([gi, oi]) => gi === 1 && oi === 2)[2]).toBe(2)     // two models took the pair
  })

  // Three bundled options differ only in their last weapon ("1 boltstorm gauntlet, 1 power fist and
  // 1 relic blade / chainsword / fist"). Reading them one weapon at a time spent two of them.
  it('takes the bundle the list actually names, as one pick', async () => {
    const { payload } = matchRoster(parseList(DW), ctx)
    const captain = payload.units.find((u) => u.id === 'captain-in-gravis-armour')
    expect(captain.wg).toHaveLength(1)
    const { validateRoster } = await import('./rosterValidation.js')
    const codes = validateRoster(payload, { faction: ctx.faction, core: rosterCore }).issues.map((i) => i.code)
    expect(codes.filter((c) => c === 'overWargearLimit')).toEqual([])
  })

  // Two brackets, same ten models, same 275 points: "ten Heavy Intercessors" or "3-16 mixed". A
  // 4/3/3 kill team is the second — under the first, the other two profiles have no models at all
  // and every wargear group belonging to them capped at zero.
  it('picks the bracket whose composition the list fits', () => {
    const { payload } = matchRoster(parseList(DW), ctx)
    const kt = payload.units.find((u) => u.id === 'indomitor-kill-team')
    expect(kt.size).toBe(1)
  })

  it('lands on the stated total', () => {
    const { report } = matchRoster(parseList(DW), ctx)
    expect(report.points.computed).toBe(report.points.statedUnits)
    expect(report.units.flatMap((u) => u.gear.missing)).toEqual([])
  })

  // Black Spear Task Force bars the Imperial Agents Watch Master, not the Deathwatch one — the
  // exclusion used to be resolved by name and hit this army's own datasheet.
  it('keeps a Watch Master the detachment does not actually bar', async () => {
    const text = DW.replace('OTHER DATASHEETS', 'OTHER DATASHEETS\n\nWatch Master (95 points)\n• 1x Vigil spear\n')
    const { payload } = matchRoster(parseList(text), ctx)
    const { validateRoster } = await import('./rosterValidation.js')
    expect(payload.units.some((u) => u.id === 'watch-master')).toBe(true)
    const codes = validateRoster(payload, { faction: ctx.faction, core: rosterCore }).issues.map((i) => i.code)
    expect(codes).not.toContain('unitExcluded')
  })
})

// An Attached Unit block whose LEADER carries no "Attached as:" line at all — the block itself is
// the statement that they fight together, so the label's absence is not the absence of an
// attachment. (Same export also prints its two attached Tyrant Guard a second time under OTHER
// DATASHEETS, which is why the list's own units add up to 320 more than its header says; that is
// the list's arithmetic, not ours, and the import reports it rather than repairing it.)
const UNLABELLED = `tired and afraid (2000 points)

Tyranids
Talons of the Norn Queen (3 Detachment Points)
Strike Force (2000 points)

CHARACTERS
Attached Units
Attached Unit 1

Hive Tyrant (195 points)
• 1x Heavy venom cannon
1x Monstrous bonesword and lash whip

Tyrant Guard (160 points)
• Attached as: Bodyguard
• 6x Tyrant Guard
• 6x Scything talons and rending claws

Exported from listhammer.info: https://listhammer.info/list/3d9af12ee8fe7f4043`

describe('matchRoster — an attached block that never says "Leader"', () => {
  it('attaches the character above the bodyguard anyway', async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const { default: items } = await import('../data/roster/items.js')
    const faction = await loadRosterFaction('tyranids')
    const { payload, report } = matchRoster(parseList(UNLABELLED), { faction, core: rosterCore, items: items.items })
    const tyrant = payload.units.find((u) => u.id === 'hive-tyrant')
    const guard = payload.units.find((u) => u.id === 'tyrant-guard')
    expect(tyrant.leaderOf).toBe(guard.uid)
    expect(report.points.computed).toBe(report.points.statedUnits)
  })
})

// Some exports print an attached unit twice — inside its Attached Unit block, so the reader sees
// who joined whom, and again under its own section, so the army list is complete. The list's own
// stated total counts it once, which is the only safe way to tell that apart from a list that
// really does field two.
describe('matchRoster — an export that prints attached units twice', () => {
  const TWICE = `tired and afraid (725 points)

Tyranids
Talons of the Norn Queen (3 Detachment Points)
Strike Force (2000 points)

CHARACTERS
Attached Units
Attached Unit 1

Hive Tyrant (195 points)
• 1x Heavy venom cannon
1x Monstrous bonesword and lash whip

Tyrant Guard (160 points)
• Attached as: Bodyguard
• 6x Tyrant Guard
• 6x Scything talons and rending claws

OTHER DATASHEETS

Norn Assimilator (275 points)
• 1x Monstrous scything talons
1x Toxinjector Harpoon
• Enhancement: Synaptoprescience (Upgrade)

Tyrant Guard (160 points)
• 6x Tyrant Guard
• 6x Scything talons and rending claws

Pyrovores (95 points)
• 3x Pyrovore
• 3x Chitin-barbed limbs
3x Flamespurt`

  it('counts the repeat once, and says so', async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const { default: items } = await import('../data/roster/items.js')
    const faction = await loadRosterFaction('tyranids')
    const parsed = parseList(TWICE)
    expect(parsed.repeated).toBe(1)
    const { report, payload } = matchRoster(parsed, { faction, core: rosterCore, items: items.items })
    expect(report.repeated).toBe(1)
    expect(payload.units.filter((u) => u.id === 'tyrant-guard')).toHaveLength(1)
    expect(report.points.computed).toBe(195 + 160 + 275 + 95)
    // …and the surviving copy is the attached one, so the attachment is not lost with the repeat.
    const tyrant = payload.units.find((u) => u.id === 'hive-tyrant')
    expect(tyrant.leaderOf).toBe(payload.units.find((u) => u.id === 'tyrant-guard').uid)
  })

  // The same shape, arithmetically: a list whose entries add up to its OWN stated total holds two
  // real units, and folding one away would quietly make it 160 points lighter.
  it('leaves a list alone when its own total counts both', async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const { default: items } = await import('../data/roster/items.js')
    const faction = await loadRosterFaction('tyranids')
    const parsed = parseList(TWICE.replace('(725 points)', `(${195 + 160 + 275 + 160 + 95} points)`))
    expect(parsed.repeated).toBeUndefined()
    const { report, payload } = matchRoster(parsed, { faction, core: rosterCore, items: items.items })
    expect(payload.units.filter((u) => u.id === 'tyrant-guard')).toHaveLength(2)
    expect(report.points.computed).toBe(report.points.statedUnits)
  })
})

// The Grey Knights list that showed a legal Dreadknight as illegal: appdata records no
// limited-choice set for that group, so its own instruction is the only statement of the cap.
describe('matchRoster — a group capped by its own instruction', () => {
  const GK = `I am Warpbane-- and I could kill you...but death would only end your agony. (475 points)

Grey Knights
Warpbane Task Force (3 Detachment Points)
Strike Force (2000 points)

CHARACTERS

Grand Master in Nemesis Dreadknight (230 points)
• 1x Fragstorm grenade launcher
1x Heavy psycannon
1x Nemesis daemon greathammer
1x Sublimator

Strike Squad (115 points)
• 1x Justicar
• 1x Nemesis force weapon
1x Storm bolter
• 4x Grey Knight
• 4x Nemesis force weapon
4x Storm bolter

Purifier Squad (130 points)
• 1x Knight of the Flame
• 1x Nemesis force weapon
1x Purifying Flame
1x Storm bolter
• 4x Purifier
• 4x Nemesis force weapon
4x Purifying Flame
4x Storm bolter`

  it('accepts the two weapons the instruction allows', async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const { default: items } = await import('../data/roster/items.js')
    const { validateRoster } = await import('./rosterValidation.js')
    const faction = await loadRosterFaction('grey-knights')
    const { report, payload } = matchRoster(parseList(GK), { faction, core: rosterCore, items: items.items })
    const gm = report.units.find((u) => u.name === 'Grand Master in Nemesis Dreadknight')
    // 200 base + a Sublimator and a heavy psycannon at 15 each — "up to two of the following".
    expect([gm.points.computed, gm.points.stated]).toEqual([230, 230])
    const codes = validateRoster(payload, { faction, core: rosterCore }).issues.map((i) => i.code)
    expect(codes).not.toContain('overWargearLimit')
  })

  // The title of that list is a quote with "--" and "..." in it, and a stray "Forwarded" line the
  // sender's messenger added lands where nothing can place it — reported, never swallowed.
  it('reads a title full of punctuation, and names a line that is not part of the list', async () => {
    const { loadRosterFaction } = await import('../data/roster/index.js')
    const { default: items } = await import('../data/roster/items.js')
    const faction = await loadRosterFaction('grey-knights')
    const text = GK.replace('Purifier Squad (130 points)', 'Forwarded\nPurifier Squad (130 points)')
    const parsed = parseList(text)
    expect(parsed.name).toBe('I am Warpbane-- and I could kill you...but death would only end your agony.')
    const { report } = matchRoster(parsed, { faction, core: rosterCore, items: items.items })
    expect(report.missing).toEqual([])
    expect(report.units.flatMap((u) => u.gear.missing)).toEqual(['Forwarded'])
  })
})

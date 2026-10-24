import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { useRosterUnitCard } from './rosterUnitCard.js'
import { loadRosterFaction, rosterItems } from '../data/roster/index.js'

/** The card's composable, mounted. @param {object} props */
function cardFor(props) {
  let card
  mount(defineComponent({
    setup() {
      card = useRosterUnitCard(props)
      return () => h('div')
    },
  }))
  return card
}

// A Chapter fields the Codex: Space Marines detachments, whose rules, enhancements and stratagems
// live in the Space Marines file. A Blood Angels list on Gladius Task Force showed none of them on
// its cards (a player's report, 2026-10-01).
describe('useRosterUnitCard — a Chapter on a Codex detachment', () => {
  it('reads the detachment from the Space Marines file', async () => {
    const card = cardFor({
      unitId: 'intercessor-squad',
      factionSlug: 'blood-angels',
      ctx: { detachments: ['Gladius Task Force'], entry: { uid: 'u1', id: 'intercessor-squad', size: 0 }, units: [] },
    })
    await vi.waitFor(() => expect(card.rulesFaction.value).toBeTruthy(), { timeout: 15000 })
    const names = card.rulesFaction.value.detachments.map((d) => d.name)
    expect(names).toContain('Gladius Task Force')
    // …after the Chapter's own: a name it reprints is read from the Chapter.
    expect(names.indexOf('Gladius Task Force')).toBeGreaterThan(names.indexOf('Angelic Inheritors'))
    const gladius = card.rulesFaction.value.detachments.find((d) => d.name === 'Gladius Task Force')
    expect(gladius.enhancements.map((e) => e.name)).toContain('Artificer Armour')
  })
})

// A rule names its units by keyword, and a datasheet's NAME is one of them (Core Rules): Runt
// Swarm's "friendly GRETCHIN units" matched no sheet (Gretchin prints GROTS, INFANTRY), the
// extraction was distrusted, and the rule sat on every Orks card — a Battlewagon's included (a
// player's report, 2026-10-15).
describe('useRosterUnitCard — a detachment rule reaches the units it names', () => {
  async function blocksOf(unitId) {
    const card = cardFor({
      unitId,
      factionSlug: 'orks',
      ctx: { detachments: ['Runt Swarm', 'Wreckas'], entry: { uid: 'u1', id: unitId, size: 0 }, units: [] },
    })
    await vi.waitFor(() => expect(card.loaded.value && card.rulesFaction.value && card.modifiersSettled.value).toBeTruthy(), { timeout: 15000 })
    return card.ruleBlocks.value.map((b) => b.key)
  }
  it('not on a Battlewagon', async () => {
    expect(await blocksOf('battlewagon')).toEqual([])
  })
  it('on the Gretchin and the Tankbustas it names', async () => {
    expect(await blocksOf('gretchin')).toEqual(['det:Runt Swarm'])
    expect(await blocksOf('tankbustas')).toEqual(['det:Wreckas'])
  })
})

// The unit an ability brings into the game is on its maker's card, under the ability that does it
// (the roster's `spawns`; a player's report, 2026-10-17).
describe('useRosterUnitCard — a unit an ability brings in', () => {
  it('carries the Ripper Swarms card on a Parasite of Mortrex', async () => {
    const card = cardFor({
      unitId: 'parasite-of-mortrex',
      factionSlug: 'tyranids',
      ctx: { detachments: [], def: { spawns: [{ id: 'ripper-swarms', name: 'Ripper Swarms', rule: 'Parasitic Infection' }] }, entry: { uid: 'u1', id: 'parasite-of-mortrex', size: 0 }, units: [] },
    })
    await vi.waitFor(() => expect(card.loaded.value).toBe(true), { timeout: 15000 })
    expect(card.spawned.value.map((s) => [s.sheet.name, s.rule])).toEqual([['Ripper Swarms', 'Parasitic Infection']])
  })
})

// appdata types "GRAV‑ASSAULT" with U+2011: unfolded, Flare Shields read as nobody's and stood on
// every Custodes card, a Dreadnought's included (a player's report, 2026-10-17; lesson 96).
describe('useRosterUnitCard — a keyword typed with a unicode hyphen', () => {
  async function blocksOf(unitId) {
    const card = cardFor({
      unitId,
      factionSlug: 'adeptus-custodes',
      ctx: { detachments: ['Grav‑Assault Force', 'Might of the Moritoi'], entry: { uid: 'u1', id: unitId, size: 0 }, units: [] },
    })
    await vi.waitFor(() => expect(card.loaded.value && card.rulesFaction.value).toBeTruthy(), { timeout: 15000 })
    return card.ruleBlocks.value.map((b) => b.key)
  }
  it('not on a Dreadnought', async () => {
    expect(await blocksOf('contemptor-achillus-dreadnought')).toEqual(['det:Might of the Moritoi'])
  })
  it('on the GRAV-ASSAULT unit it names', async () => {
    expect(await blocksOf('pallas-grav-attack')).toContain('det:Grav‑Assault Force')
  })
})

// Custodes fold several army rules into Martial Ka'tah as `### ` sections. The "i" by a
// Daughters of the Abyss modifier opened Martial Ka'tah whole (a player's report, 2026-10-16):
// it opens the section it names.
describe('useRosterUnitCard — a modifier from a folded army rule', () => {
  it('opens its own section, not the rule it is folded into', async () => {
    const card = cardFor({
      unitId: 'prosecutor-squad',
      factionSlug: 'adeptus-custodes',
      ctx: { detachments: [], entry: { uid: 'u1', id: 'prosecutor-squad', size: 0 }, units: [] },
    })
    await vi.waitFor(() => expect(card.rulesFaction.value).toBeTruthy(), { timeout: 15000 })
    const src = card.modSource({ kind: 'armyRule', source: 'Daughters of the Abyss' })
    expect(src.name).toBe('Daughters of the Abyss')
    expect(src.body).toMatch(/Feel No Pain 3\+/)
    expect(src.body).not.toMatch(/readied/)
    expect(card.modSource({ kind: 'armyRule', source: 'Martial Ka’tah' }).name).toBe(card.rulesFaction.value.armyRule.name)
  })
})

// A record named for one part of a merged rule opens that part: Synapse, not Shadow in the Warp too.
describe('useRosterUnitCard — a modifier named for part of a merged army rule', () => {
  it('opens that part alone', async () => {
    const card = cardFor({
      unitId: 'termagants',
      factionSlug: 'tyranids',
      ctx: { detachments: [], entry: { uid: 'u1', id: 'termagants', size: 0 }, units: [] },
    })
    await vi.waitFor(() => expect(card.rulesFaction.value).toBeTruthy(), { timeout: 15000 })
    const src = card.modSource({ kind: 'armyRule', source: 'Synapse' })
    expect(src.name).toBe('Synapse')
    expect(src.body).not.toMatch(/Shadow in the Warp/)
  })
})

// Alpha Invader gives [SUSTAINED HITS 1] to every weapon of the unit; the venom bolt is [TORRENT],
// makes no hit roll and so never scores a critical hit (a player's report, 2026-10-17).
describe('useRosterUnitCard — a critical-hit ability and a [TORRENT] weapon', () => {
  it('Hyperadapted Raveners: on the claws, not on the venom bolt', async () => {
    const card = cardFor({
      unitId: 'hyperadapted-raveners',
      factionSlug: 'tyranids',
      ctx: { detachments: [], entry: { uid: 'u1', id: 'hyperadapted-raveners', size: 0 }, units: [] },
    })
    await vi.waitFor(() => expect(card.loaded.value && card.rulesFaction.value).toBeTruthy(), { timeout: 15000 })
    await vi.waitFor(() => expect(card.statMods.value.sheet.melee[0].tags).toContain('SUSTAINED HITS 1'), { timeout: 15000 })
    expect(card.statMods.value.sheet.ranged.find((w) => w.name === 'Venom bolt').tags).not.toContain('SUSTAINED HITS 1')
  })
})

// "While a NECRONS CHARACTER model is leading this unit" — the whole rule lives inside an attached
// unit, so it is not "in effect" on a Nekrosor Ammentar fielded alone (a player's report,
// 2026-10-17), nor on a Monolith nobody can lead; inside one it is, the Leader included (19.04).
describe('useRosterUnitCard — a detachment rule in force only inside an attached unit', () => {
  async function blocksOf(factionSlug, detachment, unitId, units) {
    const entry = units.find((u) => u.id === unitId)
    const card = cardFor({ unitId, factionSlug, ctx: { detachments: [detachment], entry, units } })
    await vi.waitFor(() => expect(card.loaded.value && card.rulesFaction.value).toBeTruthy(), { timeout: 15000 })
    await vi.waitFor(() => expect(card.modifiersSettled.value).toBe(true), { timeout: 15000 })
    return card.ruleBlocks.value.map((b) => b.key).filter((k) => k.startsWith('det:'))
  }
  const alone = [{ uid: 'a', id: 'nekrosor-ammentar', size: 0 }, { uid: 'b', id: 'immortals', size: 0 }, { uid: 'c', id: 'monolith', size: 0 }]
  const led = [{ uid: 'a', id: 'nekrosor-ammentar', size: 0, leaderOf: 'b' }, { uid: 'b', id: 'immortals', size: 0 }]

  it('not on a Leader standing alone, a unit nobody leads, or one nobody can', async () => {
    for (const id of ['nekrosor-ammentar', 'immortals', 'monolith']) {
      expect(await blocksOf('necrons', 'Awakened Dynasty', id, alone)).toEqual([])
    }
  })
  it('on both halves of the attached unit', async () => {
    expect(await blocksOf('necrons', 'Awakened Dynasty', 'nekrosor-ammentar', led)).toEqual(['det:Awakened Dynasty'])
    expect(await blocksOf('necrons', 'Awakened Dynasty', 'immortals', led)).toEqual(['det:Awakened Dynasty'])
  })
  it('Unquestioning Fanaticism: on the led Neophytes and on the Magus leading them, not on them apart', async () => {
    const apart = [{ uid: 'a', id: 'magus', size: 0 }, { uid: 'b', id: 'neophyte-hybrids', size: 0 }]
    const joined = [{ uid: 'a', id: 'magus', size: 0, leaderOf: 'b' }, { uid: 'b', id: 'neophyte-hybrids', size: 0 }]
    expect(await blocksOf('genestealer-cults', 'Xenocreed Congregation', 'neophyte-hybrids', apart)).toEqual([])
    expect(await blocksOf('genestealer-cults', 'Xenocreed Congregation', 'magus', apart)).toEqual([])
    expect(await blocksOf('genestealer-cults', 'Xenocreed Congregation', 'neophyte-hybrids', joined)).toEqual(['det:Xenocreed Congregation'])
    expect(await blocksOf('genestealer-cults', 'Xenocreed Congregation', 'magus', joined)).toEqual(['det:Xenocreed Congregation'])
  })
})

// What the list records about an attachment, the Warlord and the size — read by the card the way
// it reads "leading a unit" (2026-10-17). Each was parked as `never` or left ungated.
describe('useRosterUnitCard — a condition the list answers', () => {
  async function cardOf(factionSlug, detachment, unitId, units) {
    const entry = units.find((u) => u.id === unitId)
    const card = cardFor({ unitId, factionSlug, ctx: { detachments: [detachment], entry, units } })
    await vi.waitFor(() => expect(card.loaded.value && card.rulesFaction.value && card.modifiersSettled.value).toBeTruthy(), { timeout: 15000 })
    return card
  }
  const offOf = (card, key) => card.ruleBlocks.value.find((b) => b.key === key)?.off

  it('an enhancement worn by a bearer leading nobody stays on the card, marked not in effect', async () => {
    const alone = [{ uid: 'a', id: 'overlord', size: 0, enh: 'Nether-realm Casket' }]
    const led = [{ uid: 'a', id: 'overlord', size: 0, enh: 'Nether-realm Casket', leaderOf: 'b' }, { uid: 'b', id: 'immortals', size: 0 }]
    expect(offOf(await cardOf('necrons', 'Awakened Dynasty', 'overlord', alone), 'enh:Nether-realm Casket')).toMatch(/^Not in effect · needs: Leading a unit/)
    expect(offOf(await cardOf('necrons', 'Awakened Dynasty', 'overlord', led), 'enh:Nether-realm Casket')).toBeNull()
  }, 30000)
  it('Wolf-Touched: +2" Move once on the Wolf Priest, and on the Wulfen he leads', async () => {
    const led = [{ uid: 'a', id: 'wolf-priest', size: 0, enh: 'Wolf-Touched', leaderOf: 'b' }, { uid: 'b', id: 'wulfen', size: 0 }]
    // Wolf Priest prints M 7", Wulfen M 9"
    const priest = await cardOf('space-wolves', 'Saga of the Beastslayer', 'wolf-priest', led)
    await vi.waitFor(() => expect(priest.statMods.value.sheet.profiles[0].m).toBe('9"'), { timeout: 15000 })
    const wulfen = await cardOf('space-wolves', 'Saga of the Beastslayer', 'wulfen', led)
    await vi.waitFor(() => expect(wulfen.statMods.value.sheet.profiles[0].m).toBe('11"'), { timeout: 15000 })
  }, 30000)
  it('Strategic Savant: +1 OC on the Aspect Warriors the Autarch leads, not on Guardians', async () => {
    const aspect = [{ uid: 'a', id: 'autarch', size: 0, enh: 'Strategic Savant', leaderOf: 'b' }, { uid: 'b', id: 'dire-avengers', size: 0 }]
    const card = await cardOf('aeldari', 'Aspect Host', 'dire-avengers', aspect)
    // Dire Avengers print OC 1
    await vi.waitFor(() => expect(card.statMods.value.sheet.profiles[0].oc).toBe('2'), { timeout: 15000 })
    const guardians = [{ uid: 'a', id: 'autarch', size: 0, enh: 'Strategic Savant', leaderOf: 'b' }, { uid: 'b', id: 'guardian-defenders', size: 0 }]
    expect(offOf(await cardOf('aeldari', 'Aspect Host', 'autarch', guardians), 'enh:Strategic Savant')).toMatch(/Aspect Warriors/)
  }, 30000)
  it('Fire Zone Purge: Tempestus Scions have BATTLELINE and +1 OC while a Tempestus Officer is the Warlord', async () => {
    const units = (warlord) => [{ uid: 'w', id: 'militarum-tempestus-command-squad', size: 0, warlord }, { uid: 's', id: 'tempestus-scions', size: 0 }]
    const on = await cardOf('astra-militarum', 'Bridgehead Strike', 'tempestus-scions', units(true))
    // Tempestus Scions print OC 1
    await vi.waitFor(() => expect(on.statMods.value.sheet.profiles[0].oc).toBe('2'), { timeout: 15000 })
    expect(on.allGrantedKeywords.value.map((g) => g.kw.toUpperCase())).toContain('BATTLELINE')
    const off = await cardOf('astra-militarum', 'Bridgehead Strike', 'tempestus-scions', units(false))
    expect(off.statMods.value.sheet.profiles[0].oc).toBe('1')
  }, 30000)
  it('Tidewall Shieldline: W 15 with its defence platform, the size that brings it', async () => {
    // The size is read off the unit's roster definition, which the card is handed as `def`.
    const fac = await loadRosterFaction('tau-empire')
    const def = fac.units.find((u) => u.id === 'tidewall-shieldline')
    const detachments = fac.detachments.filter((d) => d.name === 'Kauyon')
    const shieldline = async (size) => {
      const entry = { uid: 't', id: 'tidewall-shieldline', size }
      const card = cardFor({ unitId: entry.id, factionSlug: 'tau-empire', ctx: { def, items: rosterItems.items, detachments, entry, units: [entry] } })
      await vi.waitFor(() => expect(card.loaded.value && card.modifiersSettled.value).toBeTruthy(), { timeout: 15000 })
      return card
    }
    const card = await shieldline(1)
    await vi.waitFor(() => expect(card.statMods.value.sheet.profiles.some((p) => p.w === '15')).toBe(true), { timeout: 15000 })
    expect((await shieldline(0)).statMods.value.sheet.profiles.some((p) => p.w === '15')).toBe(false)
  }, 30000)
})

// A doctrine the unit's own rules make permanent holds in the list too, not only in a game: Marneus
// Calgar's unit has all three (doctrineRules.js), and the card off the table says so.
describe('useRosterUnitCard — doctrines a unit has from its own rules', () => {
  it('Marneus Calgar leading Intercessors: all three, in the list', async () => {
    const fac = await loadRosterFaction('space-marines')
    const detachments = fac.detachments.filter((d) => d.name === 'Gladius Task Force')
    const calgar = { uid: 'c', id: 'marneus-calgar', leaderOf: 'i' }
    const squad = { uid: 'i', id: 'intercessor-squad' }
    const def = fac.units.find((u) => u.id === squad.id)
    const card = cardFor({ unitId: squad.id, factionSlug: 'space-marines', ctx: { def, items: rosterItems.items, detachments, entry: squad, units: [calgar, squad] } })
    await vi.waitFor(() => expect([...card.activeConds.value]).toEqual(expect.arrayContaining(['doctrine-assault', 'doctrine-devastator', 'doctrine-tactical'])), { timeout: 15000 })
  }, 30000)
})

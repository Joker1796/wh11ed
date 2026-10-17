import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { useRosterUnitCard } from './rosterUnitCard.js'

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
    await vi.waitFor(() => expect(card.loaded.value && card.rulesFaction.value).toBeTruthy(), { timeout: 15000 })
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

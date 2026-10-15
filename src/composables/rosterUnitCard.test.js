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

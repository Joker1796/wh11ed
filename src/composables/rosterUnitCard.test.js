import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { useRosterUnitCard } from './rosterUnitCard.js'

// A Chapter fields the Codex: Space Marines detachments, whose rules, enhancements and stratagems
// live in the Space Marines file. A Blood Angels list on Gladius Task Force showed none of them on
// its cards (a player's report, 2026-10-01).
describe('useRosterUnitCard — a Chapter on a Codex detachment', () => {
  it('reads the detachment from the Space Marines file', async () => {
    let card
    mount(defineComponent({
      setup() {
        card = useRosterUnitCard({
          unitId: 'intercessor-squad',
          factionSlug: 'blood-angels',
          ctx: { detachments: ['Gladius Task Force'], entry: { uid: 'u1', id: 'intercessor-squad', size: 0 }, units: [] },
        })
        return () => h('div')
      },
    }))
    await vi.waitFor(() => expect(card.rulesFaction.value).toBeTruthy(), { timeout: 15000 })
    const names = card.rulesFaction.value.detachments.map((d) => d.name)
    expect(names).toContain('Gladius Task Force')
    // …after the Chapter's own: a name it reprints is read from the Chapter.
    expect(names.indexOf('Gladius Task Force')).toBeGreaterThan(names.indexOf('Angelic Inheritors'))
    const gladius = card.rulesFaction.value.detachments.find((d) => d.name === 'Gladius Task Force')
    expect(gladius.enhancements.map((e) => e.name)).toContain('Artificer Armour')
  })
})

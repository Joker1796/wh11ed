import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// A live game with a Space Marine (Gladius) player and an Ork (Green Tide) opponent.
const { activeGame } = vi.hoisted(() => ({
  activeGame: {
    phase: 'playing',
    settings: {},
    players: [
      { isYou: true, name: 'Me', factionSlug: 'space-marines', detachments: ['Gladius Task Force'] },
      { isYou: false, name: 'Opp', factionSlug: 'orks', detachments: ['Green Tide'] },
    ],
  },
}))

vi.mock('../composables/useTracker.js', async () => {
  const { ref } = await import('vue')
  return { useTracker: () => ({ current: ref(activeGame) }) }
})

import StratagemsView from './StratagemsView.vue'

// Dynamic import() of the faction data can settle on a later tick than flushPromises drains.
const settle = async () => {
  for (let i = 0; i < 40; i++) { await new Promise((r) => setTimeout(r, 5)); await flushPromises() }
}

describe('StratagemsView with an active game', () => {
  it('shows Core / You / Opponent filters and each side\'s detachment stratagems', async () => {
    const w = mount(StratagemsView)
    await settle()

    const filters = w.findAll('.strat-filter')
    expect(filters.map((f) => f.text())).toEqual(['Core', 'Mine', "Opponent's"])

    // Default view = core stratagems.
    expect(w.text()).toContain('Command Re-roll')

    // Your tab → the Space Marines Gladius detachment stratagems.
    await filters[1].trigger('click')
    await settle()
    expect(w.text()).toContain('Armour of Contempt')
    expect(w.text()).not.toContain('Command Re-roll')

    // Opponent tab → the Orks Green Tide detachment stratagems.
    await filters[2].trigger('click')
    await settle()
    expect(w.text()).toContain('Competitive Streak')
    expect(w.text()).not.toContain('Armour of Contempt')
  })
})

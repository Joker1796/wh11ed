import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

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

// StratagemsView dynamic import()s the faction data (a deliberately heavy chunk — see the view),
// so the stratagem cards appear some indeterminate number of ticks after the click that asks for
// them. Wait on the RESULT, never on a fixed time budget: the previous helper here spun a fixed
// 40 × 5ms and passed alone but failed inside the full suite, where the parallel load pushed the
// import past its 200ms ceiling. `vi.waitFor` retries until the assertion holds, so a slow
// machine just waits longer instead of failing.
const WAIT = { timeout: 15000 }
const seen = (w, text) => vi.waitFor(() => expect(w.text()).toContain(text), WAIT)

describe('StratagemsView with an active game', () => {
  it('shows Core / You / Opponent filters and each side\'s detachment stratagems', async () => {
    const w = mount(StratagemsView)

    // The filter bar only renders once the active game's faction data has resolved.
    await vi.waitFor(() => expect(w.findAll('.strat-filter')).toHaveLength(3), WAIT)
    const filters = w.findAll('.strat-filter')
    expect(filters.map((f) => f.text())).toEqual(['Core', 'Mine', "Opponent's"])

    // Default view = core stratagems.
    await seen(w, 'Command Re-roll')

    // Your tab → the Space Marines Gladius detachment stratagems. Awaiting the incoming card
    // first is what makes the "gone" assertion below safe — before the swap lands, the core
    // cards are still on screen and `not.toContain` would pass for the wrong reason.
    await filters[1].trigger('click')
    await seen(w, 'Armour of Contempt')
    expect(w.text()).not.toContain('Command Re-roll')

    // Opponent tab → the Orks Green Tide detachment stratagems.
    await filters[2].trigger('click')
    await seen(w, 'Competitive Streak')
    expect(w.text()).not.toContain('Armour of Contempt')
    // Vitest's own 5s testTimeout is the other half of this test's flakiness: mounting the view
    // pulls src/data/factions/index.js, which statically imports all 30 factions as one ~1.5MB
    // chunk, and transforming that in jsdom blows past 5s on a loaded machine. Raised here rather
    // than globally so the rest of the suite keeps a tight timeout. Splitting that barrel into
    // per-faction lazy chunks (as data/factions/ru/ and data/datasheets/ already do) would make
    // this test load two factions instead of thirty and let the timeout come back down.
  }, 20000)
})

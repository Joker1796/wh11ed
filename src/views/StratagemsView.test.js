import { beforeEach, describe, it, expect, vi } from 'vitest'
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

// The view reads `route.query.phase`. `useRoute` resolves through inject, which a bare mount has
// no provider for, so the router is mocked rather than installed — this view uses no RouterLink.
const { routeQuery } = vi.hoisted(() => ({ routeQuery: { value: {} } }))
vi.mock('vue-router', () => ({ useRoute: () => ({ query: routeQuery.value }) }))
beforeEach(() => { routeQuery.value = {} })

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
  it('shows All / Core / You / Opponent filters and each side\'s detachment stratagems', async () => {
    const w = mount(StratagemsView)

    // The filter bar only renders once the active game's faction data has resolved.
    await vi.waitFor(() => expect(w.findAll('.strat-filter')).toHaveLength(4), WAIT)
    const filters = w.findAll('.strat-filter')
    expect(filters.map((f) => f.text())).toEqual(['All', 'Core', 'Mine', "Opponent's"])

    // Default view, with a game on = everything, so nothing has to be hunted for.
    expect(filters[0].attributes('aria-selected')).toBe('true')
    await seen(w, 'Command Re-roll')
    await seen(w, 'Armour of Contempt')
    await seen(w, 'Competitive Streak')

    // Core tab → only the rulebook's own. Awaiting the incoming card first is what makes the
    // "gone" assertion safe: before the swap lands the old cards are still on screen and
    // `not.toContain` would pass for the wrong reason.
    await filters[1].trigger('click')
    await seen(w, 'Command Re-roll')
    expect(w.text()).not.toContain('Armour of Contempt')

    // Your tab → the Space Marines Gladius detachment stratagems.
    await filters[2].trigger('click')
    await seen(w, 'Armour of Contempt')
    expect(w.text()).not.toContain('Command Re-roll')

    // Opponent tab → the Orks Green Tide detachment stratagems.
    await filters[3].trigger('click')
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

// A link from the tracker's phase reminder names the phase it wants (`/stratagems?phase=fight`).
// Landing on six collapsed accordions would make that link pointless.
describe('StratagemsView opened on a phase', () => {
  it('switches to the grouped view and expands the phase the link named', async () => {
    routeQuery.value = { phase: 'fight' }
    const w = mount(StratagemsView)
    await vi.waitFor(() => expect(w.findAll('.phase-head').length).toBeGreaterThan(1), WAIT)

    const open = w.findAll('.phase-head').filter((h) => h.attributes('aria-expanded') === 'true')
    expect(open).toHaveLength(1)
    expect(open[0].text()).toContain('Fight phase')
  })

  it('does not persist a view mode the reader never chose', async () => {
    routeQuery.value = { phase: 'fight' }
    mount(StratagemsView)
    await vi.waitFor(() => expect(localStorage.getItem('wh11ed-stratagems-by-phase')).toBeNull(), WAIT)
  })

  it('ignores a phase that is not one', async () => {
    routeQuery.value = { phase: 'elevenses' }
    const w = mount(StratagemsView)
    await vi.waitFor(() => expect(w.find('.strat-grid').exists()).toBe(true), WAIT)
    expect(w.findAll('.phase-head')).toHaveLength(0)
  })
})

// A detachment stratagem carries its own sublabel; the page used to drop it, so every one of
// them claimed to be a core stratagem.
describe('StratagemsView — whose stratagem is this', () => {
  it('keeps a detachment stratagem\'s own sublabel, and names the player in the combined list', async () => {
    const w = mount(StratagemsView)
    await vi.waitFor(() => expect(w.text()).toContain('Armour of Contempt'), WAIT)
    const card = w.findAll('.strat-card').find((c) => c.text().includes('Armour of Contempt'))
    const sub = card.find('.strat-sublabel').text()
    expect(sub).toContain('Gladius Task Force')
    expect(sub).not.toContain('CORE')
    expect(sub).toContain('Me')          // the player's own name, since All mixes both sides

    // …and on the Core tab the rulebook's own cards still fall back to the core label.
    await w.findAll('.strat-filter')[1].trigger('click')
    await vi.waitFor(() => expect(w.text()).toContain('Command Re-roll'), WAIT)
    const core = w.findAll('.strat-card').find((c) => c.text().includes('Command Re-roll'))
    expect(core.find('.strat-sublabel').text()).toContain('CORE')
  })
})

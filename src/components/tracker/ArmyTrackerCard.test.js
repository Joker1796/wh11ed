import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ArmyTrackerCard from './ArmyTrackerCard.vue'
import { useTracker, DISPOSITIONS } from '../../composables/useTracker.js'

// The card resolves + localizes its spec via two chained dynamic imports; settle them then flush
// reactivity so `view` (and the render) are ready.
async function settle() {
  await vi.dynamicImportSettled()
  await flushPromises()
  await vi.dynamicImportSettled()
  await flushPromises()
}

// Regression guard: the card's setup must not read a not-yet-initialized ref. A battle-long
// (`once`) selection past round 1 exercises `choiceLocked` — an immediate watcher that reads the
// async-resolved `view`; if it runs before `view` is declared the whole card throws in setup and
// every faction's rule block vanishes. Mounting that exact scenario catches it.
function newGame(youFaction) {
  const tracker = useTracker()
  tracker.newGame({
    settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', twist: null, twistMission: null },
    players: [
      { name: 'Me', factionSlug: youFaction, detachments: [], disposition: DISPOSITIONS[0].id, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
      { name: 'Opp', factionSlug: null, detachments: [], disposition: DISPOSITIONS[1].id, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
    ],
  })
  return tracker
}

describe('ArmyTrackerCard', () => {
  beforeEach(() => localStorage.clear())

  it('renders a Death Guard card with a locked Plague past round 1 without throwing', async () => {
    const tracker = newGame('death-guard')
    tracker.setArmyChoice(0, 'rattlejoint-ague')
    tracker.current.value.currentRound = 2

    const wrapper = mount(ArmyTrackerCard, { props: { pi: 0 } })
    await settle()

    // The card mounted (setup didn't throw) and shows the rule name; the picker chips are gone.
    expect(wrapper.find('.army-card').exists()).toBe(true)
    expect(wrapper.text()).toContain("Nurgle's Gift")
    expect(wrapper.find('.army-options').exists()).toBe(false)
  })

  it('shows the Plague picker chips in round 1', async () => {
    newGame('death-guard')
    const wrapper = mount(ArmyTrackerCard, { props: { pi: 0 } })
    await settle()
    expect(wrapper.find('.army-options').exists()).toBe(true)
  })
})

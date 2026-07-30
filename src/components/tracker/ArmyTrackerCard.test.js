import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount, flushPromises, DOMWrapper } from '@vue/test-utils'
import ArmyTrackerCard from './ArmyTrackerCard.vue'
import { useTracker, DISPOSITIONS } from '../../composables/useTracker.js'

// ArmySpendModal (like every BaseModal) renders via <Teleport to="body">, so its content lands
// outside the mounted component's own tree — search the body directly, same as modals.test.js.
const body = () => new DOMWrapper(document.body)

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
  afterEach(() => { document.body.innerHTML = '' })

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

  describe('Genestealer Cults (round-1 start bonus + resurrect spend log)', () => {
    it('applies the round-1 start bonus once, then hides it', async () => {
      newGame('genestealer-cults')
      const wrapper = mount(ArmyTrackerCard, { props: { pi: 0 } })
      await settle()

      // strikeForce start = 10.
      expect(wrapper.find('.army-counter-readonly').text()).toBe('10')
      const bonusBtn = wrapper.find('.army-bonus-btn')
      expect(bonusBtn.exists()).toBe(true)

      await bonusBtn.trigger('click')
      expect(wrapper.find('.army-counter-readonly').text()).toBe('12')
      expect(wrapper.find('.army-bonus-btn').exists()).toBe(false)
      expect(wrapper.find('.army-bonus-done').exists()).toBe(true)

      // Undoing restores the pre-bonus value and brings the button back.
      await wrapper.find('.army-bonus-done .army-head-reset').trigger('click')
      expect(wrapper.find('.army-counter-readonly').text()).toBe('10')
      expect(wrapper.find('.army-bonus-btn').exists()).toBe(true)
    })

    it('hides the start bonus entirely from round 2 onwards', async () => {
      const tracker = newGame('genestealer-cults')
      tracker.current.value.currentRound = 2
      const wrapper = mount(ArmyTrackerCard, { props: { pi: 0 } })
      await settle()
      expect(wrapper.find('.army-bonus').exists()).toBe(false)
    })

    it('records a resurrect spend and can undo it', async () => {
      newGame('genestealer-cults')
      const wrapper = mount(ArmyTrackerCard, { props: { pi: 0 } })
      await settle()

      await wrapper.find('.army-field').trigger('click') // open the spend picker
      const opt = body().findAll('.opt').find((b) => b.text().includes('Aberrants ×5'))
      await opt.trigger('click')

      // Cost 4 came off the strikeForce start of 10.
      expect(wrapper.find('.army-counter-readonly').text()).toBe('6')
      expect(wrapper.find('.army-resurrect-row').text()).toContain('Aberrants ×5')
      expect(wrapper.find('.army-resurrect-cost').text()).toBe('−4')

      await wrapper.find('.army-resurrect-undo').trigger('click')
      expect(wrapper.find('.army-counter-readonly').text()).toBe('10')
      expect(wrapper.find('.army-resurrect-row').exists()).toBe(false)
    })
  })

  describe('reference view (factions with no interactive spec)', () => {
    it('shows the normal Codex army rule text for an untracked faction', async () => {
      newGame('necrons') // Necrons has no armyTrackers spec
      const wrapper = mount(ArmyTrackerCard, { props: { pi: 0 } })
      await settle()

      expect(wrapper.find('.army-card').exists()).toBe(true)
      // Post-errata Codex wording ("heals"), not the Combat Patrol box's pre-errata copy.
      expect(wrapper.text()).toContain('heals D3')
      expect(wrapper.text()).not.toContain('reanimates D3')
    })

    it('shows the Combat Patrol box\'s own (pre-errata) text in a Combat Patrol game', async () => {
      const tracker = useTracker()
      tracker.newGame({
        settings: {
          trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', combatPatrol: true,
          scoreMode: 'vp', twist: null, twistMission: null,
        },
        players: [
          { name: 'Me', factionSlug: 'necrons', detachments: ['Territorial Imperatives'], disposition: DISPOSITIONS[0].id, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
          { name: 'Opp', factionSlug: null, detachments: [], disposition: DISPOSITIONS[1].id, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
        ],
      })
      const wrapper = mount(ArmyTrackerCard, { props: { pi: 0 } })
      await settle()

      expect(wrapper.text()).toContain('reanimates D3')
      expect(wrapper.text()).not.toContain('heals D3')
    })
  })
})

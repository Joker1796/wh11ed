import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises, enableAutoUnmount } from '@vue/test-utils'

let RoundTracker, tracker, DISPOSITIONS
beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  const mod = await import('../../composables/useTracker.js')
  tracker = mod.useTracker()
  DISPOSITIONS = mod.DISPOSITIONS
  RoundTracker = (await import('./RoundTracker.vue')).default
})
enableAutoUnmount(afterEach)
afterEach(() => { document.body.innerHTML = '' })

const player = (over) => ({ name: 'P', factionSlug: null, detachments: [], role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false, ...over })
function startGame(begin = true) {
  tracker.newGame({
    settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', twist: null, twistMission: null },
    players: [
      player({ name: 'Me', factionSlug: 'orks', disposition: DISPOSITIONS[0].id, role: 'attacker' }),
      player({ name: 'Opp', factionSlug: 'necrons', disposition: DISPOSITIONS[1].id, role: 'defender' }),
    ],
  })
  if (begin) tracker.beginGame()
}
const mountTracker = () => mount(RoundTracker, { attachTo: document.body, global: { stubs: { ScoreBoard: true, ArmyTrackerCard: true, NumberStepper: true, RouterLink: true } } })

describe('RoundTracker — the turn\'s secondaries are offered', () => {
  // Misha, 2026-10-10: End turn pressed with the OTHER side's tab picked — the new side on turn was
  // not offered its draw until its own tab was picked again.
  it('to the side now on turn, whichever side was picked when the turn ended', async () => {
    startGame()
    const w = mountTracker()
    await flushPromises()
    // close the first side's own offer, then look at the other side and end the turn
    for (const b of document.querySelectorAll('.modal-overlay .modal-close, .modal-overlay button[aria-label="Close"]')) b.click()
    await flushPromises()
    w.findComponent({ name: 'ScoreBoard' }).vm.$emit('select', 1)
    await flushPromises()
    await w.find('.tr-end').trigger('click')
    await flushPromises()
    // an end-of-turn check may come first: confirm it
    const confirm = [...document.querySelectorAll('.modal-overlay button.btn-primary')].pop()
    if (tracker.current.value.currentTurn !== 1 && confirm) { confirm.click(); await flushPromises() }
    expect(tracker.current.value.currentTurn).toBe(1)
    await flushPromises()
    expect(w.findComponent({ name: 'TakeSecondariesModal' }).exists()).toBe(true)
    expect(w.findComponent({ name: 'TakeSecondariesModal' }).props('pi')).toBe(1)
  })

  // …and the likelier path on Misha's screen: "Start game" pressed with the opponent's tab picked.
  // The turn does not change, so nothing reset the pick, and the side on turn's deck — which is
  // what opens the offer — was not on screen.
  it('to the side on turn when the battle starts from the other side\'s tab', async () => {
    startGame(false)
    expect(tracker.current.value.begun).toBe(false)
    const w = mountTracker()
    await flushPromises()
    w.findComponent({ name: 'ScoreBoard' }).vm.$emit('select', 1)
    await flushPromises()
    await w.find('.tr-end').trigger('click')
    await flushPromises()
    expect(w.findComponent({ name: 'TakeSecondariesModal' }).exists()).toBe(true)
    expect(w.findComponent({ name: 'TakeSecondariesModal' }).props('pi')).toBe(0)
  })
})

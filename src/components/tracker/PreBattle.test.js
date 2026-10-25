import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// The game screen before the battle: the Mission Sequence's steps 6–11 (owner, 2026-10-25), with
// the two the tracker keeps — the secondaries and who goes first — chosen in it.
let PreBattle, tracker, DISPOSITIONS

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  const mod = await import('../../composables/useTracker.js')
  tracker = mod.useTracker()
  DISPOSITIONS = mod.DISPOSITIONS
  PreBattle = (await import('./PreBattle.vue')).default
})
afterEach(() => { document.body.innerHTML = '' })

function startGame({ party = null } = {}) {
  const setup = {
    settings: { trackCP: true, firstTurn: null, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', twist: null, twistMission: null },
    players: [
      { name: 'Me', factionSlug: null, detachments: [], disposition: DISPOSITIONS[0].id, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
      { name: 'Opp', factionSlug: null, detachments: [], disposition: DISPOSITIONS[1].id, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
    ],
  }
  if (party) {
    tracker.startLobby(setup)
    tracker.current.value.party = party
  }
  tracker.newGame(setup)
}
const RouterLink = { props: ['to'], template: '<a><slot /></a>' }
const mountIt = () => mount(PreBattle, { global: { stubs: { RouterLink } } })
const step = (w, n) => w.findAll('.pb-step').find((s) => s.find('.pb-n').text() === String(n))

describe('PreBattle — one phone', () => {
  it('lists steps 6 to 11 after the setup\'s 1–5, naming who starts each', () => {
    startGame()
    const w = mountIt()
    expect(w.findAll('.pb-n').map((n) => n.text())).toEqual(['1–5', '6', '7', '8', '9', '10', '11'])
    expect(w.find('.pb-done-steps').text()).toContain('done in the setup')
    expect(step(w, 8).text()).toContain('Opp, the Defender, sets up a unit first')
    expect(step(w, 9).text()).toContain('Me — the Attacker — first')
    expect(step(w, 11).text()).toContain('starting with whoever goes first')
  })

  it('chooses both sides\' secondaries here, fixed opening the cards to pick', async () => {
    startGame()
    const w = mountIt()
    const sides = step(w, 6).findAll('.pb-side')
    expect(sides).toHaveLength(2)
    expect(w.find('.pb-done').exists()).toBe(false) // one phone: nothing to confirm
    await sides[1].findAll('.pb-seg button')[1].trigger('click')
    await flushPromises()
    expect(tracker.current.value.players[1].secondaryMode).toBe('fixed')
    expect(document.body.querySelector('[role="dialog"]')).not.toBe(null)
    expect(tracker.battleWaitsFor()).toBe('fixed')
  })

  it('marks the roll\'s winner, who then goes first', async () => {
    startGame()
    const w = mountIt()
    expect(tracker.battleWaitsFor()).toBe('firstTurn')
    await step(w, 10).findAll('.pb-roll button')[1].trigger('click')
    expect(tracker.current.value.players.map((p) => p.name)).toEqual(['Opp', 'Me'])
    expect(tracker.battleWaitsFor()).toBeNull()
    expect(step(w, 10).find('.pb-roll button.on').text()).toBe('Opp')
    expect(step(w, 11).text()).toContain('Opp first')
    // The names stand still under the finger, and the light moves to the one tapped: in the game's
    // order they swapped places with the light left on the left one (owner, 2026-10-25).
    const names = () => step(w, 10).findAll('.pb-roll button').map((b) => [b.text(), b.classes('on')])
    expect(names()).toEqual([['Me', false], ['Opp', true]])
    await step(w, 10).findAll('.pb-roll button')[0].trigger('click')
    expect(tracker.current.value.players.map((p) => p.name)).toEqual(['Me', 'Opp'])
    expect(names()).toEqual([['Me', true], ['Opp', false]])
  })
})

describe('PreBattle — a shared game, on the guest\'s phone', () => {
  const guest = { id: 'p', memberId: 'm-guest', token: 't', side: 1, mi: null, host: false, seq: 1, versions: {} }

  it('chooses its own side\'s secondaries and hides the other\'s until both have', async () => {
    startGame({ party: guest })
    const w = mountIt()
    const [host, mine] = step(w, 6).findAll('.pb-side')
    expect(host.find('.pb-seg').exists()).toBe(false)
    expect(host.find('.pb-status').text()).toBe('choosing…')
    expect(mine.find('.pb-seg').exists()).toBe(true)
    // The host confirms: still nothing of its choice on this phone, until this one has chosen.
    tracker.confirmSecondaries(0)
    await w.vm.$nextTick()
    expect(step(w, 6).findAll('.pb-side')[0].find('.pb-status').text()).toBe('has chosen — shown once you have')
    await step(w, 6).findAll('.pb-side')[1].find('.pb-done').trigger('click')
    expect(step(w, 6).findAll('.pb-side')[0].find('.pb-status').text()).toContain('Tactical')
    expect(tracker.battleWaitsFor()).toBe('firstTurn')
  })

  it('leaves the roll to the host', () => {
    startGame({ party: guest })
    const w = mountIt()
    expect(step(w, 10).find('.pb-roll').exists()).toBe(false)
    expect(step(w, 10).text()).toContain('the host marks who won')
  })
})

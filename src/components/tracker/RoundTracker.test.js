import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

// The tracker store is a module singleton — reset it (and the component that binds to it)
// between cases so each test mounts against its own game.
let RoundTracker, tracker, DISPOSITIONS

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  const mod = await import('../../composables/useTracker.js')
  tracker = mod.useTracker()
  DISPOSITIONS = mod.DISPOSITIONS
  RoundTracker = (await import('./RoundTracker.vue')).default
})

function player(over = {}) {
  return {
    name: 'P', factionSlug: null, detachments: [], role: 'attacker',
    secondaryMode: 'fixed', fixedSecondaries: [], battleReady: false, ...over,
  }
}
function startGame(p0, p1, settings = {}) {
  tracker.newGame({
    settings: {
      trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce',
      scoreMode: 'vp', twist: null, twistMission: null, ...settings,
    },
    players: [
      player({ ...p0, name: 'Me', disposition: DISPOSITIONS[0].id, role: 'attacker' }),
      player({ ...p1, name: 'Opp', disposition: DISPOSITIONS[1].id, role: 'defender' }),
    ],
  })
}

// The phase picker teleports to <body> (BaseModal), so clear it between cases.
afterEach(() => { document.body.innerHTML = '' })

// The heavy children have their own specs; this one is about the army link in the CP row.
const RouterLinkStub = { props: ['to'], template: '<a :href="to"><slot /></a>' }
function mountTracker() {
  return mount(RoundTracker, {
    global: {
      stubs: {
        ScoreBoard: true, SecondaryDeck: true, ArmyTrackerCard: true,
        NumberStepper: true, RouterLink: RouterLinkStub,
      },
    },
  })
}
const armyLinks = (w) => w.findAll('.proster').map(a => a.attributes('href'))

describe('RoundTracker — the army link on a player card', () => {
  // The point of the fallback: it belongs to the player it's rendered on, so the opponent's
  // datasheets are reachable too. That's what let the bottom nav drop its «Units» item.
  it('links each player to their own faction datasheets when no list is attached', () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    expect(armyLinks(mountTracker())).toEqual([
      '/factions/orks/datasheets',
      '/factions/necrons/datasheets',
    ])
  })

  it('prefers the attached list — that player only, the other keeps the datasheets', () => {
    const roster = { id: 'r1', name: 'Da List', faction: 'orks', detachments: [], units: [] }
    startGame({ factionSlug: 'orks', rosterId: 'r1', roster }, { factionSlug: 'necrons' })
    expect(armyLinks(mountTracker())).toEqual([
      '/tracker/game/roster/0',
      '/factions/necrons/datasheets',
    ])
  })

  it('shows no army link for a legacy game whose player has no faction', () => {
    startGame({ factionSlug: null }, { factionSlug: null })
    expect(armyLinks(mountTracker())).toEqual([])
  })

  // With CP off and no faction there is nothing left to put in the row at all.
  it('drops the CP row entirely when neither half has anything to show', () => {
    startGame({ factionSlug: null }, { factionSlug: null }, { trackCP: false })
    expect(mountTracker().findAll('.cp-row')).toHaveLength(0)
  })
})

describe('RoundTracker — the phase row', () => {
  it('is absent unless the game asked for phases', () => {
    startGame({}, {})
    expect(mountTracker().find('.phase-bar').exists()).toBe(false)
  })

  // The nickname is deliberately NOT here: the clock is read at a glance mid-turn, and "Me" (or
  // whatever the player typed) does not say whose phase it is. Both fixture players ARE named.
  it('names the side whose turn it is and which phase, never the nickname', () => {
    startGame({}, {}, { trackPhases: true })
    const w = mountTracker()
    expect(w.find('.pb-who').text()).toBe('You')
    expect(w.find('.pb-phase').text()).toBe('Command phase')
  })

  it('follows the clock into the opponent\'s turn', async () => {
    startGame({}, {}, { trackPhases: true })
    const w = mountTracker()
    tracker.goToPhase(1, 'shooting')
    await w.vm.$nextTick()
    expect(w.find('.pb-who').text()).toBe('Opponent')
    expect(w.find('.pb-phase').text()).toBe('Shooting phase')
  })

  it('walks the clock with its own arrows, and refuses to walk off the start', async () => {
    startGame({}, {}, { trackPhases: true })
    const w = mountTracker()
    const [prev, next] = w.findAll('.pb-nav')
    expect(prev.attributes('disabled')).toBeDefined()
    await next.trigger('click')
    expect(tracker.current.value.currentPhase).toBe('movement')
  })

  it('opens the picker and jumps where it says', async () => {
    startGame({}, {}, { trackPhases: true })
    const w = mountTracker()
    await w.find('.pb-now').trigger('click')
    // The picker teleports to <body> (BaseModal), so look for its rows there.
    const rows = document.body.querySelectorAll('.pp-phase')
    expect(rows).toHaveLength(10) // five phases per player
    // The header comes from BaseModal itself. A hand-rolled copy in the #header slot renders in
    // the picker's scope, out of reach of BaseModal's scoped CSS — it looked like raw browser
    // defaults, and left the dialog with no accessible name. Both facts are checked by this line.
    const dialog = document.body.querySelector('[role="dialog"]')
    expect(document.getElementById(dialog.getAttribute('aria-labelledby')).textContent).toBe('Phase')
    rows[8].click() // the second player's Charge phase
    await w.vm.$nextTick()
    expect(tracker.current.value.currentTurn).toBe(1)
    expect(tracker.current.value.currentPhase).toBe('charge')
    expect(document.body.querySelectorAll('.pp-phase')).toHaveLength(0) // and it closes
  })
})


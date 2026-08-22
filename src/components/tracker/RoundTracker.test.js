import { beforeEach, describe, it, expect, vi } from 'vitest'
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

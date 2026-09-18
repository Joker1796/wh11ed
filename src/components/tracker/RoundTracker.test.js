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

describe('RoundTracker — what the game keeps track of', () => {
  // The option HIDES a block; it never clears what the block recorded, so it is reversible
  // mid-game. The missions are deliberately not switchable — see src/data/trackerOptions.js.
  it('drops the CP stepper when the game is not counting CP', () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' }, { trackCP: false })
    expect(mountTracker().find('.sr-label').exists()).toBe(false)
  })

  it('keeps the mission blocks whatever the settings say', () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' }, { trackCP: false })
    const w = mountTracker()
    expect(w.findAll('secondary-deck-stub')).toHaveLength(2)
    expect(w.findAll('.card-open').length + w.findAll('.score-row').length).toBeGreaterThan(0)
  })
})

describe('RoundTracker — doubles', () => {
  function startDoubles(membersA, membersB, over = {}) {
    startGame(
      { teamName: 'Alpha', members: membersA, ...over.p0 },
      { teamName: 'Beta', members: membersB, ...over.p1 },
      { gameType: 'doubles', ...over.settings },
    )
  }
  const M = (name, factionSlug, detachments = []) => ({ name, factionSlug, detachments })

  it('labels each army button with its member and routes to that member\'s slice', () => {
    startDoubles(
      [M('Ann', 'orks'), M('Bob', 'aeldari')],
      [M('Cat', 'drukhari'), M('Dan', null)],
    )
    // Attach a roster to side 0's member 1 so both link kinds appear.
    tracker.current.value.players[0].members[1].roster = { units: [{ uid: 'a', id: 'x', size: 0 }] }
    const w = mountTracker()
    const links = armyLinks(w)
    expect(links).toContain('/factions/orks/datasheets')       // Ann, no list
    expect(links).toContain('/tracker/game/roster/0/1')        // Bob's list
    expect(links).toContain('/factions/drukhari/datasheets')   // Cat
    expect(links).toHaveLength(3)                              // Dan has nothing to link
  })

  it('gives a long member name something to ellipsize and the full name on hover', () => {
    // The button label is typed by the player, so it has no width it can promise: without the
    // inner span (nothing for text-overflow to clip) the CP row's minimum width overflowed the
    // card on a phone and scrolled the whole document sideways.
    startDoubles(
      [M('Фёдор Михайлович', 'orks'), M('Михаил Юрьевич', 'aeldari')],
      [M('Cat', 'drukhari'), M('Dan', 'drukhari')],
    )
    const w = mountTracker()
    const btn = w.findAll('a.proster').find((a) => a.text().includes('Фёдор'))
    expect(btn.find('.proster-label').exists()).toBe(true)
    expect(btn.attributes('title')).toBe('Фёдор Михайлович')
  })

  it('renders ONE shared army card for a unified same-faction team, two for convenience', () => {
    startDoubles(
      [M('Ann', 'drukhari'), M('Bob', 'drukhari')],
      [M('Cat', 'orks'), M('Dan', 'aeldari')],
    )
    const w = mountTracker()
    const cards = w.findAllComponents({ name: 'ArmyTrackerCard' })
    // Side 0 (unified, same faction): one card, side-level state (mi null).
    const side0 = cards.filter((c) => c.props('pi') === 0)
    expect(side0).toHaveLength(1)
    expect(side0[0].props('mi')).toBeNull()
    // Side 1 (convenience): one card per member.
    const side1 = cards.filter((c) => c.props('pi') === 1)
    expect(side1.map((c) => c.props('mi')).sort()).toEqual([0, 1])
  })

  it('shows the team name and one identity line per member', () => {
    startDoubles(
      [M('Ann', 'orks', ['War Horde']), M('Bob', 'aeldari')],
      [M('Cat', 'drukhari'), M('Dan', 'drukhari')],
    )
    const w = mountTracker()
    expect(w.text()).toContain('Alpha')
    expect(w.text()).toContain('Ann — Orks · War Horde')
  })
})

// A shared game (useParty.js): the side another phone plays is on screen, readable, and its
// scoring controls are not touchable; the setup dialog opens for everyone (a guest gets its
// phone-local options there). Nothing changes for a game that is not shared.
describe('RoundTracker — a shared game', () => {
  function withParty(over) {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    tracker.current.value.party = { id: 'p', token: 't', side: 0, mi: null, host: false, seq: 1, versions: {}, ...over }
  }
  const cards = (w) => w.findAll('.player')
  // The lock is on the scoring controls, never on the card: a locked card still opens its army
  // facts, its list and its army rule's text.
  function locked(card) {
    const primary = card.find('.card-open, .score-row')
    const deck = card.findComponent({ name: 'SecondaryDeck' })
    const army = card.findComponent({ name: 'ArmyTrackerCard' })
    return {
      card: card.attributes('inert'),
      primary: primary.attributes('inert'),
      deck: deck.attributes('inert'),
      army: army.props('readonly'),
      caption: card.find('.plocked').exists(),
    }
  }
  const OPEN = { card: undefined, primary: undefined, deck: undefined, army: false, caption: false }
  const LOCKED = { card: undefined, primary: 'true', deck: 'true', army: true, caption: true }

  it('leaves both cards live and the setup button enabled with no party', () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    const w = mountTracker()
    expect(cards(w).map(locked)).toEqual([OPEN, OPEN])
    expect(w.find('[aria-label="Setup"]').attributes('disabled')).toBeUndefined()
  })

  it('a guest gets the other side locked but readable, and keeps the setup button', () => {
    withParty({ host: false, side: 1 })
    const w = mountTracker()
    expect(cards(w).map(locked)).toEqual([LOCKED, OPEN])
    expect(cards(w)[0].find('.pinfo').attributes('inert')).toBeUndefined()
    expect(cards(w)[0].text()).toContain('Scored on another phone')
    expect(w.find('[aria-label="Setup"]').attributes('disabled')).toBeUndefined()
  })

  it('the host edits a side nobody sits on, and not one another phone holds', () => {
    withParty({ host: true, side: 0 })
    const w = mountTracker()
    expect(cards(w).map(locked)).toEqual([OPEN, OPEN])
    expect(w.find('.sync-ind').exists()).toBe(true)
  })

  it('a side a guest sits on is locked on the host\'s screen too, with the way back', async () => {
    withParty({ host: true, side: 0, held: [1] })
    const w = mountTracker()
    expect(cards(w).map(locked)).toEqual([OPEN, LOCKED])
    expect(cards(w)[1].text()).toContain('free its seat')
    // …unless the host chose to score both sides from its phone.
    tracker.current.value.party.scoreAll = true
    await w.vm.$nextTick()
    expect(cards(w).map(locked)).toEqual([OPEN, OPEN])
    tracker.current.value.party.scoreAll = false
    await w.vm.$nextTick()
    expect(cards(w).map(locked)).toEqual([OPEN, LOCKED])
    // The guest gone (kicked, left), the side is the host's again.
    tracker.current.value.party.held = []
    await w.vm.$nextTick()
    expect(cards(w).map(locked)).toEqual([OPEN, OPEN])
  })

  it('a phone the host removed edits its own game again', () => {
    withParty({ host: false, side: 1, revoked: true })
    const w = mountTracker()
    expect(cards(w).map(locked)).toEqual([OPEN, OPEN])
  })
})

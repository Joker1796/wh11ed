import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises, enableAutoUnmount } from '@vue/test-utils'

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

// Fixed secondaries keep the take dialog out of these cases — with a card, as no setup ever
// started a fixed game without one (and the battle does not begin on none: battleWaitsFor).
function player(over = {}) {
  return {
    name: 'P', factionSlug: null, detachments: [], role: 'attacker',
    secondaryMode: 'fixed', fixedSecondaries: ['a-grievous-blow'], battleReady: false, ...over,
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
  tracker.beginGame()
}

// Unmounted after each case: a screen left mounted keeps building its idle panels into the next.
enableAutoUnmount(afterEach)
// The phase picker teleports to <body> (BaseModal), so clear it between cases.
afterEach(() => { document.body.innerHTML = '' })

// The heavy children have their own specs; this one is about the screen around them: the tabs,
// the army links in the Armies tab, the shared-game locks.
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
// Closed tabs are icons: a tab is named by its aria-label.
const tabLabels = (w) => w.findAll('.gt-tab').map(t => t.attributes('aria-label'))
async function openTab(w, label) {
  await w.findAll('.gt-tab').find(t => t.attributes('aria-label') === label).trigger('click')
  return w
}
const openArmies = (w) => openTab(w, 'Army')
// The side is picked on the score cards (stubbed here — ScoreBoard.test.js covers the cards):
// pick one the way a card does, by its `select`.
const board = (w) => w.findComponent({ name: 'ScoreBoard' })
async function pickSide(w, i) {
  board(w).vm.$emit('select', i)
  await w.vm.$nextTick()
  return w
}
// One side's missions at a time (the side on turn first): open the other.
async function unfold(w) {
  return pickSide(w, Number(w.find('.player').attributes('data-side')) === 0 ? 1 : 0)
}

describe('RoundTracker — the tabs', () => {
  it('opens on the missions and offers CP only to a game that counts it', () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    const w = mountTracker()
    // No clock: the rules reminder is the Turn tab (the whole turn, phase by phase).
    expect(tabLabels(w)).toEqual(['Missions', 'Turn', 'CP', 'Army', 'Log', 'Stats'])
    expect(w.find('.gt-tab.on').text()).toBe('Missions') // the open tab says its word
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' }, { trackCP: false, trackPhaseRules: false })
    expect(tabLabels(mountTracker())).toEqual(['Missions', 'Army', 'Log', 'Stats'])
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' }, { trackPhases: true })
    expect(tabLabels(mountTracker())).toContain('Phase')
  })

  // The log and the stats are this phone's choice (owner, 2026-10-14).
  it('leaves the Log and Stats tabs out of a game that switched them off', () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' }, { showLogStats: false })
    expect(tabLabels(mountTracker())).toEqual(['Missions', 'Turn', 'CP', 'Army'])
  })

  // A turn starts with drawing and scoring, so a new turn brings the player back to them.
  it('goes back to the missions when the turn changes', async () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    const w = await openTab(mountTracker(), 'CP')
    expect(w.find('.cp-bank').exists()).toBe(true)
    tracker.endTurn()
    await w.vm.$nextTick()
    expect(w.find('.gt-tab.on').text()).toBe('Missions') // the open tab says its word
    expect(w.find('.cp-bank').isVisible()).toBe(false) // kept once opened, hidden
  })

  // Misha, 2026-10-10: "Units" on the opponent's army, then "Back to the game", landed on this
  // phone's own army. The tab came back; the side picked on the score cards did not.
  it('comes back from another page on the tab AND the side it left', async () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    const w = await openArmies(mountTracker())
    await pickSide(w, 1)
    w.unmount()
    const back = mountTracker()
    await back.vm.$nextTick()
    expect(back.find('.gt-tab.on').text()).toBe('Army')
    expect(back.findComponent({ name: 'ArmiesPanel' }).props('side')).toBe(1)
  })

  // Nothing is built in the frame a panel slides in: the rest are built while idle, then shown.
  it('builds the other panels while idle and keeps each one it switches away from', async () => {
    vi.useFakeTimers()
    try {
      startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
      const w = mountTracker()
      expect(w.findAll('[role="tabpanel"]')).toHaveLength(1) // the missions, at once
      await vi.advanceTimersByTimeAsync(2000)
      const panels = w.findAll('[role="tabpanel"]')
      expect(panels).toHaveLength(6) // one per tab, all but the open one hidden
      expect(panels.filter((p) => p.isVisible())).toHaveLength(1)
      const missions = panels[0].element
      await openTab(w, 'Log')
      await openTab(w, 'Missions')
      expect(w.findAll('[role="tabpanel"]')[0].element).toBe(missions) // shown again, not rebuilt
    } finally {
      vi.useRealTimers()
    }
  })

  // The new panel slides in from the side its tab stands on.
  it('slides the panel in from the side of the tab opened', async () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    const w = mountTracker()
    expect(w.find('.round-tracker').classes()).not.toContain('tab-moved') // opening the game is not a switch
    await openTab(w, 'Log')
    expect(w.find('.round-tracker').classes()).not.toContain('tab-back') // to the right: from the right
    await openTab(w, 'CP')
    expect(w.find('.round-tracker').classes()).toContain('tab-back') // to the left: from the left
    expect(w.find('.round-tracker').classes()).toContain('tab-moved')
  })
})

describe('RoundTracker — the missions panel', () => {
  const firstName = (w) => ['Me', 'Opp'][Number(w.find('.player').attributes('data-side'))]

  it('opens the side on turn on its tab, one side at a time', async () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    const w = mountTracker()
    expect(w.findAll('.player')).toHaveLength(1)
    expect(firstName(w)).toBe('Me')
    expect(w.find('.mside-tabs').exists()).toBe(false) // no tabs of its own: the cards pick
    expect(board(w).props('selected')).toBe(0)
    await unfold(w)
    expect(firstName(w)).toBe('Opp')
    tracker.endTurn()
    await w.vm.$nextTick()
    expect(firstName(w)).toBe('Opp') // a new turn opens the side on turn
    expect(w.findAll('.player')).toHaveLength(1)
  })

  // A player's report (2026-10-20): in round 1 the primary's dialog left out the card's "Second
  // Battle Round Onwards" half. The whole card is shown; the other round's half is greyed, named so.
  it('shows the primary\'s whole card in round 1, the later half greyed', async () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    tracker.current.value.players[0].primarySlug = 'determined-acquisition'
    const w = mountTracker()
    await w.find('.mission-card').trigger('click')
    await flushPromises()
    const blocks = [...document.body.querySelectorAll('.m-block')]
    expect(blocks.map((b) => b.querySelector('.m-heading')?.textContent.trim())).toEqual(['Any Battle Round', 'Second Battle Round Onwards'])
    expect(blocks[0].querySelector('.m-off')).toBeNull()
    expect(blocks[1].querySelector('.m-off')?.textContent).toBe('Not this round')
    expect(blocks[1].querySelectorAll('input, number-stepper-stub, .stepper')).toHaveLength(0)
    expect([...blocks[1].querySelectorAll('.m-cond')].every((c) => c.classList.contains('locked'))).toBe(true)
  })

  // The report of 2026-10-21: the second player ticked his "end of your turn" in the opponent's
  // turn. A condition is ticked only in its own turn; one whose turn has passed is put right by
  // opening that turn from the dialog — the banner says which, and the score lands there.
  it('locks the primary outside its turn and opens the passed turn from the dialog', async () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    tracker.current.value.players[0].primarySlug = 'purge-and-secure'
    tracker.endTurn() // Opp's turn of round 1
    const w = mountTracker()
    board(w).vm.$emit('select', 0)
    await w.vm.$nextTick()
    await w.find('.mission-card').trigger('click')
    await flushPromises()
    const conds = () => [...document.body.querySelectorAll('.m-block')][0].querySelectorAll('.m-cond')
    expect([...conds()].every((c) => c.classList.contains('locked'))).toBe(true)
    expect(conds()[0].getAttribute('title')).toBe('Scored in Me’s turn')
    document.body.querySelector('.sm-fix').click()
    await flushPromises()
    expect(w.find('.round-edit').text()).toContain('Correcting round 1, Me’s turn')
    expect(conds()[0].classList.contains('locked')).toBe(false)
    expect(document.body.querySelector('.sm-fix')).toBeNull()
    const box = conds()[0].querySelector('input')
    box.checked = true
    box.dispatchEvent(new Event('change'))
    expect(tracker.current.value.players[0].rounds[0].primary).toBeGreaterThan(0)
    expect(tracker.current.value.currentTurn).toBe(1) // the game did not move
    expect(tracker.current.value.players[0].acts.some((x) => x.type === 'fix' && x.atTurn === 0)).toBe(true)
  })

  it('in a shared game puts this phone\'s own side first, whoever is on turn', () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    tracker.current.value.party = { id: 'p', token: 't', side: 1, mi: null, host: false, seq: 1, versions: {} }
    expect(firstName(mountTracker())).toBe('Opp')
  })

  // The round line is a view: it opens a dialog that says what it is, and a past round from there
  // opens for correction — the game does not move.
  it('opens a past round for correction and comes back, and refuses one not yet played', async () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    tracker.endTurn()
    tracker.endTurn() // round 2
    const w = mountTracker()
    expect(w.findAll('.rs-pt').map((p) => p.classes().filter((c) => c !== 'rs-pt').join())).toEqual(['done', 'now,live', '', '', ''])
    await w.find('button.rs').trigger('click')
    const steps = [...document.body.querySelectorAll('.rs-item')]
    expect(document.body.querySelector('.rs-text').textContent).toContain('End turn') // says what moves the game
    expect(steps[2].disabled).toBe(true)
    steps[0].click()
    await w.vm.$nextTick()
    expect(tracker.current.value.currentRound).toBe(2)
    expect(w.find('.round-edit').text()).toContain('round 1')
    await w.find('.re-back').trigger('click')
    expect(w.find('.round-edit').exists()).toBe(false)
  })
})

// With the phase clock, the live round of the line widens into its phases, up to the one it stands on.
describe('RoundTracker — the round line with phases', () => {
  it('shows both turns\' phases of the live round, filled up to the clock', async () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' }, { trackPhases: true })
    tracker.endTurn() // the second turn of round 1
    tracker.current.value.currentPhase = 'shooting'
    const w = mountTracker()
    await w.vm.$nextTick()
    const ticks = w.findAll('.rs-tick')
    expect(ticks).toHaveLength(10)
    expect(ticks.findIndex((t) => t.classes('live'))).toBe(5 + 2) // second turn, third phase
    expect(ticks.filter((t) => t.classes('done'))).toHaveLength(7)
    expect(w.find('.rs-pt.live').exists()).toBe(false) // the phase pulses, not the point
    // Each turn's phases in its side's colour.
    const tick = (i) => ticks[i].attributes('style')
    expect(tick(0)).toContain('--side-you')
    expect(tick(5)).toContain('--side-opponent')
  })

  it('stays points only without the clock', () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    expect(mountTracker().find('.rs-tick').exists()).toBe(false)
  })
})

// Before the battle (PreBattle.vue): Start waits for the roll for the first turn, and says so in
// place of its word — the setup no longer asks who goes first (owner, 2026-10-25).
describe('RoundTracker — before the battle', () => {
  it('shows the steps over the missions and holds Start until the roll', async () => {
    startGame({}, {}, { firstTurn: null })
    expect(tracker.current.value.begun).toBe(false) // beginGame refused: nobody rolled
    const w = mountTracker()
    expect(w.find('.pb').exists()).toBe(true)
    const start = w.find('.tr-end')
    // Start asks what it waits for, and a tap takes to that step instead of doing nothing (owner,
    // 2026-10-25: «I press it and nothing happens»).
    expect(start.text()).toBe('Who goes first?')
    expect(start.attributes('disabled')).toBeUndefined()
    await start.trigger('click')
    expect(tracker.current.value.begun).toBe(false)
    expect(w.find('.gt-tab.on').text()).toBe('Before the battle')
    tracker.rollFirstTurn(0)
    await w.vm.$nextTick()
    expect(w.find('.tr-end').attributes('disabled')).toBeUndefined()
    await w.find('.tr-end').trigger('click')
    expect(w.find('.pb').exists()).toBe(false)
  })
})

describe('RoundTracker — ending a turn', () => {
  it('passes the turn at once when nothing scores at its end', async () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' }, {})
    // no primary cards and no secondaries in hand: nothing at all falls due
    for (const pl of tracker.current.value.players) { pl.primarySlug = null; pl.secondary.hand = [] }
    const w = mountTracker()
    await w.find('.tr-end').trigger('click')
    expect(tracker.current.value.currentTurn).toBe(1)
  })

  // The side on turn's own "end of your turn" conditions (here its primary) and the opponent's
  // "end of your opponent's turn" card are all scored now, so End turn shows them first.
  it('shows the conditions of both sides that score now, then passes the turn', async () => {
    startGame({ factionSlug: 'orks', secondaryMode: 'tactical' }, { factionSlug: 'necrons', secondaryMode: 'tactical' })
    const s = tracker.current.value.players[1].secondary
    const slug = s.deck.find((x) => x.startsWith('display-of-might'))
    s.deck = s.deck.filter((x) => x !== slug)
    s.hand.push(slug)
    const w = mountTracker()
    await w.find('.tr-end').trigger('click')
    expect(tracker.current.value.currentTurn).toBe(0)
    const check = document.body.textContent
    expect(check).toContain('Display of Might')
    expect(check).toContain('Immovable Object')
    document.body.querySelector('.ck-go').click()
    await w.vm.$nextTick()
    expect(tracker.current.value.currentTurn).toBe(1)
  })

  // The same game with the check switched off (owner, 2026-10-14): the turn passes at once.
  it('passes the turn at once when the game switched the check off', async () => {
    startGame({ factionSlug: 'orks', secondaryMode: 'tactical' }, { factionSlug: 'necrons', secondaryMode: 'tactical' }, { trackTurnChecks: false })
    const s = tracker.current.value.players[1].secondary
    const slug = s.deck.find((x) => x.startsWith('display-of-might'))
    s.deck = s.deck.filter((x) => x !== slug)
    s.hand.push(slug)
    const w = mountTracker()
    await w.find('.tr-end').trigger('click')
    expect(tracker.current.value.currentTurn).toBe(1)
    expect(document.body.querySelector('.ck-go')).toBeNull()
  })
})

describe('RoundTracker — the Armies tab', () => {
  it('opens the armies panel (its own spec: ArmiesPanel.test.js)', async () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    const w = await openArmies(mountTracker())
    expect(w.findComponent({ name: 'ArmiesPanel' }).exists()).toBe(true)
  })
})

describe('RoundTracker — the phase row', () => {
  it('is absent unless the game asked for phases', () => {
    startGame({}, {})
    const w = mountTracker()
    expect(w.find('.turn-row.phased').exists()).toBe(false)
    expect(w.findAll('.gt-tab').map((t) => t.text())).not.toContain('Phase')
  })

  // The nickname is deliberately NOT here: the clock is read at a glance mid-turn, and "Me" (or
  // whatever the player typed) does not say whose phase it is. Both fixture players ARE named.
  it('names the side whose turn it is and which phase, never the nickname', () => {
    startGame({}, {}, { trackPhases: true })
    const w = mountTracker()
    expect(w.find('.tp-who').text()).toBe('You')
    expect(w.find('.tp-name').text()).toBe('Command phase')
  })

  it('follows the clock into the opponent\'s turn', async () => {
    startGame({}, {}, { trackPhases: true })
    const w = mountTracker()
    tracker.goToPhase(1, 'shooting')
    await w.vm.$nextTick()
    expect(w.find('.tp-who').text()).toBe('Opponent')
    expect(w.find('.tp-name').text()).toBe('Shooting phase')
  })

  // The arrows stay inside the turn: the turn changes by End / Undo turn (through the end-of-turn
  // check), never by a stray tap past the Fight phase.
  it('walks the clock with its own arrows, inside the turn only', async () => {
    startGame({}, {}, { trackPhases: true })
    const w = mountTracker()
    const [prev, next] = w.findAll('.tr-step')
    expect(prev.attributes('disabled')).toBeDefined()
    await next.trigger('click')
    expect(tracker.current.value.currentPhase).toBe('movement')
    tracker.goToPhase(0, 'fight')
    await w.vm.$nextTick()
    expect(w.findAll('.tr-step')[1].attributes('disabled')).toBeDefined()
    expect(tracker.current.value.currentTurn).toBe(0)
  })

  it('opens the picker and moves to the next phase at once', async () => {
    startGame({}, {}, { trackPhases: true })
    const w = mountTracker()
    await w.find('.tr-phase').trigger('click')
    // The picker teleports to <body> (BaseModal), so look for its rows there.
    const rows = document.body.querySelectorAll('.pp-phase')
    expect(rows).toHaveLength(10) // five phases per player
    // The header comes from BaseModal itself. A hand-rolled copy in the #header slot renders in
    // the picker's scope, out of reach of BaseModal's scoped CSS — it looked like raw browser
    // defaults, and left the dialog with no accessible name. Both facts are checked by this line.
    // It names the round the ten rows belong to.
    const dialog = document.body.querySelector('[role="dialog"]')
    expect(document.getElementById(dialog.getAttribute('aria-labelledby')).textContent).toBe('Phase \u00b7 Round 1')
    rows[1].click() // the first player's Movement phase — the next one
    await flushPromises()
    expect(tracker.current.value.currentPhase).toBe('movement')
    expect(document.body.querySelector('.cm-message')).toBeNull()
    expect(document.body.querySelectorAll('.pp-phase')).toHaveLength(0) // and it closes
  })

  it('asks before jumping to a phase that is not the next', async () => {
    startGame({}, {}, { trackPhases: true })
    const w = mountTracker()
    await w.find('.tr-phase').trigger('click')
    document.body.querySelectorAll('.pp-phase')[8].click() // the second player's Charge phase
    await flushPromises()
    expect(tracker.current.value.currentTurn).toBe(0) // not yet
    expect(document.body.querySelector('.cm-message').textContent).toBe('Opp \u00b7 Charge phase. This is not the next phase. Go there?')
    document.body.querySelector('.modal-foot .btn-primary').click()
    await flushPromises()
    expect(tracker.current.value.currentTurn).toBe(1)
    expect(tracker.current.value.currentPhase).toBe('charge')
  })

  it('treats the second turn\'s Command as next after the first turn\'s Fight', async () => {
    startGame({}, {}, { trackPhases: true })
    tracker.goToPhase(0, 'fight')
    const w = mountTracker()
    await w.find('.tr-phase').trigger('click')
    document.body.querySelectorAll('.pp-phase')[5].click()
    await flushPromises()
    expect(document.body.querySelector('.cm-message')).toBeNull()
    expect(tracker.current.value.currentTurn).toBe(1)
    expect(tracker.current.value.currentPhase).toBe('command')
  })
})

describe('RoundTracker — the Phase tab', () => {
  it('is a tab only while the clock and its reminder are on', () => {
    startGame({}, {}, { trackPhases: true, trackPhaseRules: true })
    const hasPhase = (w) => tabLabels(w).includes('Phase')
    expect(hasPhase(mountTracker())).toBe(true)
    startGame({}, {}, { trackPhases: true, trackPhaseRules: false })
    expect(hasPhase(mountTracker())).toBe(false)
  })

  // Owner, 2026-09-30: what speaks now is read during the turn, next to the missions.
  it('stands right after the missions', () => {
    startGame({}, {}, { trackPhases: true, trackPhaseRules: true })
    expect(tabLabels(mountTracker())).toEqual(['Missions', 'Phase', 'CP', 'Army', 'Log', 'Stats'])
  })

  // Its lines lead into the game's own tabs, not off the game screen. No stratagems line any more
  // (owner, 2026-10-10): they are the CP tab's, already filtered to the phase.
  it('opens the Army tab on a rule, and carries no stratagems line', async () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' }, { trackPhases: true, trackPhaseRules: true })
    const w = await openTab(mountTracker(), 'Phase')
    await vi.waitFor(async () => { await flushPromises(); expect(w.text()).toContain('Waaagh!') }, { timeout: 5000 })
    expect(w.find('.pr-strats').exists()).toBe(false)

    await openTab(w, 'Phase')
    const rule = w.findAll('.pr-go-btn').find((b) => b.text().includes('Waaagh!'))
    await rule.trigger('click')
    await flushPromises()
    expect(w.find('.gt-tab.on').attributes('aria-label')).toBe('Army')
    expect(w.find('.ap-fac').text()).toBe('Orks')
  })
})

// The round's bonus CP is one toggle (owner, 2026-10-06): outlined while it can be taken, filled
// once taken, a second tap gives it back.
describe('RoundTracker — the bonus CP toggle', () => {
  it('takes the round\'s bonus and gives it back from one button', async () => {
    startGame({}, {})
    const w = mountTracker()
    await openTab(w, 'CP')
    await flushPromises()
    const btn = () => w.find('.cp-bank .cr-btn')
    expect(btn().classes()).not.toContain('on')
    expect(btn().attributes('aria-pressed')).toBe('false')
    await btn().trigger('click')
    expect(btn().classes()).toContain('on')
    expect(btn().attributes('aria-pressed')).toBe('true')
    await btn().trigger('click')
    expect(btn().classes()).not.toContain('on')
  })
})

describe('RoundTracker — what the game keeps track of', () => {
  // The option HIDES a block; it never clears what the block recorded, so it is reversible
  // mid-game. The missions are deliberately not switchable — see src/data/trackerOptions.js.
  it('drops the CP tab when the game is not counting CP', () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' }, { trackCP: false })
    expect(tabLabels(mountTracker())).not.toContain('CP')
  })

  it('keeps the mission blocks whatever the settings say', async () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' }, { trackCP: false })
    const w = mountTracker()
    expect(w.findAll('secondary-deck-stub')).toHaveLength(1)
    await unfold(w) // one side a tab
    expect(w.findAll('secondary-deck-stub')).toHaveLength(1)
    expect(w.findAll('.mission-card').length + w.findAll('.score-row').length).toBeGreaterThan(0)
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
  // One side at a time: a side's card is read by picking its score card.
  const sideCard = async (w, i) => {
    await pickSide(w, i)
    return w.find('.player')
  }
  const lockedBoth = async (w) => [locked(await sideCard(w, 0)), locked(await sideCard(w, 1))]
  const mountBoth = async () => mountTracker()
  // The lock is on the scoring controls, never on the card or a mission (the army rule's tracker,
  // readable but inert on a side another phone plays, is the Armies tab's: ArmiesPanel.test.js).
  // The primary's card and the deck stay live — their cards open view only — and the deck is
  // told it may not score (`editable`), which is what takes its actions away.
  function locked(card) {
    const deck = card.findComponent({ name: 'SecondaryDeck' })
    return {
      card: card.attributes('inert'),
      primary: card.find('.mission-card').attributes('inert'),
      deck: deck.attributes('inert'),
      scores: deck.props('editable'),
      caption: card.find('.plocked').exists(),
    }
  }
  // Setup lives in the "⋯" on the round line: open it and find the row (the menu teleports).
  async function setupRow(w) {
    await w.find('.game-menu-btn').trigger('click')
    await flushPromises()
    return [...document.body.querySelectorAll('.act-btn')].find((b) => b.textContent.includes('Setup'))
  }
  const OPEN = { card: undefined, primary: undefined, deck: undefined, scores: true, caption: false }
  const LOCKED = { card: undefined, primary: undefined, deck: undefined, scores: false, caption: true }

  it('leaves both cards live and the setup button enabled with no party', async () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    const w = await mountBoth()
    expect(await lockedBoth(w)).toEqual([OPEN, OPEN])
    expect((await setupRow(w)).disabled).toBe(false)
  })

  it('a guest gets the other side locked but readable, and keeps the setup button', async () => {
    withParty({ host: false, side: 1 })
    const w = await mountBoth()
    expect(await lockedBoth(w)).toEqual([LOCKED, OPEN])
    expect((await sideCard(w, 0)).text()).toContain('Scored on another device')
    expect((await setupRow(w)).disabled).toBe(false)
  })

  // The opponent's missions lie face up (Event Companion): a guest opens the other side's primary
  // and reads it, ticking nothing (the owner's first game, 2026-10-24).
  it('a guest opens the other side\'s primary view only', async () => {
    withParty({ host: false, side: 1 })
    const w = await mountBoth()
    const card = await sideCard(w, 0)
    await card.find('.mission-card').trigger('click')
    await flushPromises()
    const dialog = document.body.querySelector('[role="dialog"]')
    expect(dialog.querySelector('.view-only').textContent).toContain('Scored on another device')
    expect(dialog.querySelectorAll('.m-cond').length).toBeGreaterThan(0)
    expect(dialog.querySelectorAll('.m-cond input, .m-cond button')).toHaveLength(0)
  })

  it('the host edits a side nobody sits on, and not one another phone holds', async () => {
    withParty({ host: true, side: 0 })
    const w = await mountBoth()
    expect(await lockedBoth(w)).toEqual([OPEN, OPEN])
    expect(w.find('.sync-ind').exists()).toBe(true)
  })

  it('a side a guest sits on is locked on the host\'s screen too, with the way back', async () => {
    withParty({ host: true, side: 0, held: [1] })
    const w = await mountBoth()
    expect(await lockedBoth(w)).toEqual([OPEN, LOCKED])
    expect((await sideCard(w, 1)).text()).toContain('free its seat')
    // …unless the host chose to score both sides from its phone.
    tracker.current.value.party.scoreAll = true
    await w.vm.$nextTick()
    expect(await lockedBoth(w)).toEqual([OPEN, OPEN])
    tracker.current.value.party.scoreAll = false
    await w.vm.$nextTick()
    expect(await lockedBoth(w)).toEqual([OPEN, LOCKED])
    // The guest gone (kicked, left), the side is the host's again.
    tracker.current.value.party.held = []
    await w.vm.$nextTick()
    expect(await lockedBoth(w)).toEqual([OPEN, OPEN])
  })

  it('a phone the host removed edits its own game again', async () => {
    withParty({ host: false, side: 1, revoked: true })
    const w = await mountBoth()
    expect(await lockedBoth(w)).toEqual([OPEN, OPEN])
  })
})

describe('RoundTracker — the open tab is remembered', () => {
  it('comes back to the same tab in the same turn, and to the missions after the turn moved', async () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    const w = await openTab(mountTracker(), 'CP')
    w.unmount() // off to another screen…
    expect(mountTracker().find('.gt-tab.on').attributes('aria-label')).toBe('CP') // …and back
    tracker.endTurn() // the turn moved while away
    expect(mountTracker().find('.gt-tab.on').attributes('aria-label')).toBe('Missions')
  })
})

describe('RoundTracker — dialogs wear the turn colour', () => {
  // Dialogs teleport to <body>, out of the screen; the screen hands its colours down to them.
  it('puts the side colours and the turn on every dialog opened from the game screen', async () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    tracker.endTurn() // the opponent's turn
    const w = mount(RoundTracker, {
      global: { stubs: { ScoreBoard: true, ArmyTrackerCard: true, NumberStepper: true, RouterLink: RouterLinkStub } },
    })
    await w.find('.game-menu-btn').trigger('click') // the "⋯" on the round line…
    const finish = [...document.body.querySelectorAll('.act-btn')].find((b) => b.textContent.includes('Finish game'))
    finish.click() // …and its "Finish game" opens a dialog
    await flushPromises()
    const overlays = document.body.querySelectorAll('.modal-overlay')
    const overlay = overlays[overlays.length - 1]
    expect([...overlay.classList]).toEqual(expect.arrayContaining(['side-colored', 'turn-colored', 'turn-opp']))
    expect(overlay.getAttribute('style')).toContain('--so-light')
  })
})

describe('RoundTracker — Undo turn asks first', () => {
  it('does nothing on the tap itself, and steps back only when confirmed', async () => {
    startGame({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    tracker.endTurn()
    const w = mountTracker()
    await w.find('.tr-prev').trigger('click')
    expect(tracker.current.value.currentTurn).toBe(1) // not yet
    const dialog = document.body.querySelector('[role="dialog"]')
    expect(dialog.textContent).toContain("Me’s turn, round 1")
    const buttons = [...dialog.querySelectorAll('button')]
    expect(buttons.map((b) => b.textContent.trim())).toContain('Cancel') // the way out is labelled
    buttons.find((b) => b.textContent.trim() === 'Undo turn').click()
    await w.vm.$nextTick()
    expect(tracker.current.value.currentTurn).toBe(0)
  })
})

// "Mark reserves" marks each unit's status, so it follows "Where each unit is" (the Quick preset
// turns that off and the button stayed — owner, 2026-10-15).
describe('the reserves button', () => {
  function setUp(unitStatus) {
    tracker.newGame({
      settings: {
        trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce',
        scoreMode: 'vp', twist: null, twistMission: null, trackUnitStates: unitStatus,
      },
      players: [
        player({ name: 'Me', disposition: DISPOSITIONS[0].id, role: 'attacker', roster: { faction: 'orks', units: [] } }),
        player({ name: 'Opp', disposition: DISPOSITIONS[1].id, role: 'defender' }),
      ],
    })
    return mountTracker()
  }
  it('is there before the battle when units keep their status', async () => {
    const w = setUp(true); await flushPromises()
    expect(w.find('.tr-reserves').exists()).toBe(true)
  })
  it('is not there when the game does not keep it', async () => {
    const w = setUp(false); await flushPromises()
    expect(w.find('.tr-reserves').exists()).toBe(false)
  })
})

// Before the battle the Mission Sequence's steps are a tab of their own, first and open (owner,
// 2026-10-25: inside the Missions tab they pushed the missions a screen down); the battle begun,
// the tab goes and the screen is on the missions.
describe('RoundTracker — the tab before the battle', () => {
  it('leads the tabs and opens first, then leaves when the battle begins', async () => {
    tracker.newGame({
      settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', twist: null, twistMission: null },
      players: [
        player({ name: 'Me', disposition: DISPOSITIONS[0].id, role: 'attacker' }),
        player({ name: 'Opp', disposition: DISPOSITIONS[1].id, role: 'defender' }),
      ],
    })
    const w = mountTracker()
    await flushPromises()
    expect(tabLabels(w)[0]).toBe('Before the battle')
    expect(w.find('.gt-tab.on').text()).toBe('Before the battle')
    expect(w.find('.pb').exists()).toBe(true)
    tracker.beginGame()
    await flushPromises()
    expect(tabLabels(w)).not.toContain('Before the battle')
    expect(w.find('.gt-tab.on').text()).toBe('Missions')
  })
})

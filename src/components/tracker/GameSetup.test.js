import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, DOMWrapper, flushPromises } from '@vue/test-utils'
import GameSetup from './GameSetup.vue'
import RosterPickerModal from './RosterPickerModal.vue'

beforeEach(() => {
  localStorage.clear()
  vi.resetModules()
})
// BaseModal teleports to <body>; clear it between tests since nothing else unmounts it.
afterEach(() => { document.body.innerHTML = '' })

describe('GameSetup', () => {
  it('mounts on step 1 with You / Opponent player cards', () => {
    const w = mount(GameSetup)
    expect(w.text()).toContain('You')
    expect(w.text()).toContain('Opponent')
    expect(w.findAll('.player-card').length).toBeGreaterThanOrEqual(2)
    // a faction picker button per player (opens FactionPickerModal)
    expect(w.findAll('.faction-btn').length).toBeGreaterThanOrEqual(2)
  })

  it('defaults the battle size to Strike Force', () => {
    const w = mount(GameSetup)
    const onBtn = w.find('.battle-size .seg button.on')
    expect(onBtn.exists()).toBe(true)
    expect(onBtn.text()).toContain('Strike Force')
  })

  it('disables "Next" until both armies are valid (no faction chosen yet)', () => {
    const w = mount(GameSetup)
    // The step-1 advance button is the disabled primary action.
    const disabledPrimary = w.findAll('.actions .btn-primary').filter(b => b.attributes('disabled') !== undefined)
    expect(disabledPrimary.length).toBeGreaterThan(0)
  })

  // Attaching a list is optional and lives only here, at setup — but when one IS attached it is
  // the description of the army, so it decides the faction and the detachments rather than being
  // checked against picks made separately.
  // A list describes ONE army, so it stands where the faction picker would be rather than beside
  // one that could contradict it.
  it('takes the faction and detachments from an attached roster', async () => {
    const w = mount(GameSetup)
    await w.findAll('.rp-open')[0].trigger('click')
    w.findComponent(RosterPickerModal).vm.$emit('pick', {
      id: 'r1', name: 'Da List', faction: 'orks', detachments: ['Bully Boyz'],
      battleSize: 'strike-force', units: [{ uid: 'a', id: 'boyz', size: 0 }],
    })
    await flushPromises()

    const line = w.findAll('.player-card')[0].find('.roster-line')
    expect(line.text()).toContain('Orks')
    expect(line.text()).toContain('Da List')
    expect(w.findAll('.player-card')[0].find('.faction-btn').exists()).toBe(false)
    expect(w.findAll('.player-card')[0].text()).toContain('Bully Boyz')
  })

  // Detaching is the only way back to picking a faction by hand — which is also why the
  // "a faction change detaches the list" guard in resolveArmyChoice is now unreachable from
  // this screen and kept only for a draft restored with the two out of step.
  it('hands the faction picker back when the list is detached, keeping the faction it chose', async () => {
    const w = mount(GameSetup)
    await w.findAll('.rp-open')[0].trigger('click')
    w.findComponent(RosterPickerModal).vm.$emit('pick', {
      id: 'r1', name: 'Da List', faction: 'orks', detachments: ['Bully Boyz'], units: [],
    })
    await flushPromises()

    await w.findAll('.player-card')[0].find('.rl-clear').trigger('click')
    await flushPromises()

    const card = w.findAll('.player-card')[0]
    expect(card.find('.roster-line').exists()).toBe(false)
    expect(card.find('.faction-btn').text()).toContain('Orks')
  })

  it('opens the score-mode help modal on the ? button', async () => {
    const w = mount(GameSetup)
    const body = new DOMWrapper(document.body)
    expect(body.find('.sh-table').exists()).toBe(false)
    // By aria-label, not first-match: step 1 now carries its own help buttons (role, force type).
    await w.find('button[aria-label="About BP"]').trigger('click')
    expect(body.find('.sh-table').exists()).toBe(true) // ScoreHelpModal rendered (teleported to body)
  })
})

describe('GameSetup — doubles', () => {
  const modeButtons = (w) => w.findAll('.game-type .seg button')

  it('switching to Doubles turns each side into a team card with two member blocks', async () => {
    const w = mount(GameSetup)
    await modeButtons(w)[1].trigger('click') // Competitive · Doubles · Combat Patrol
    expect(w.findAll('.member-block')).toHaveLength(4)
    expect(w.findAll('.player-card input[placeholder="Team name"]')).toHaveLength(2)
    // Force type + per-player DP controls appear.
    expect(w.text()).toContain('Force type')
    expect(w.text()).toContain('DP per player')
  })

  it('the army already picked on the side card becomes member 1\'s on the switch', async () => {
    const w = mount(GameSetup)
    await w.findAll('.faction-btn')[0].trigger('click')
    w.findComponent({ name: 'FactionPickerModal' }).vm.$emit('pick', 'orks')
    await flushPromises()
    await modeButtons(w)[1].trigger('click')
    const firstMember = w.findAll('.member-block')[0]
    expect(firstMember.text()).toContain('Orks')
  })

  it('switching back to Competitive restores the singles card', async () => {
    const w = mount(GameSetup)
    await modeButtons(w)[1].trigger('click')
    await modeButtons(w)[0].trigger('click')
    expect(w.findAll('.member-block')).toHaveLength(0)
    expect(w.findAll('.faction-btn')).toHaveLength(2)
  })
})

// ── The lobby: the same component, cut down to one side ────────────────────────────────────
// A guest's screen is this wizard in `guest` mode: its own side's card, no mission/battlefield/
// option steps, and "Done" instead of "Next". The party is mocked to the two facts the screen
// reads — that the setup is shared, and which seat this phone holds.
describe('GameSetup in a lobby', () => {
  async function guestScreen() {
    vi.resetModules()
    const { useTracker } = await import('../../composables/useTracker.js')
    const tracker = useTracker()
    tracker.startLobby({
      settings: { gameType: 'singles', combatPatrol: false, battleSize: 'strikeForce', firstTurn: 1, layout: 'A' },
      players: [
        { name: 'Host', factionSlug: null, detachments: [], disposition: null, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false, members: [{ name: '', factionSlug: null, detachments: [] }, { name: '', factionSlug: null, detachments: [] }] },
        { name: 'Guest', factionSlug: null, detachments: [], disposition: null, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false, members: [{ name: '', factionSlug: null, detachments: [] }, { name: '', factionSlug: null, detachments: [] }] },
      ],
    })
    tracker.current.value.party = { id: 'p1', memberId: 'm-guest', token: 't', side: 1, mi: null, host: false, seq: 1, versions: {} }
    const Screen = (await import('./GameSetup.vue')).default
    return { w: mount(Screen, { props: { mode: 'guest' } }), tracker }
  }

  it('draws only this phone’s own side, and calls it "You"', async () => {
    const { w } = await guestScreen()
    const cards = w.findAll('.player-card')
    // One card per visible panel (armies + mission), both of them side 1.
    expect(cards.length).toBe(2)
    expect(w.text()).not.toContain('Opponent')
    expect(w.find('.game-type').exists()).toBe(false) // the game type is the host's
  })

  it('offers Done instead of the wizard’s steps, disabled until the army is chosen', async () => {
    const { w } = await guestScreen()
    expect(w.find('.setup-head').exists()).toBe(false)
    const primary = w.findAll('.actions .btn-primary')
    expect(primary.length).toBe(1)
    expect(primary[0].text()).toBe('Done')
    expect(primary[0].attributes('disabled')).toBeDefined()
  })
})

// The wizard's own gates in a lobby: what needs the other side, and what does not.
describe('GameSetup gates in a lobby', () => {
  async function hostScreen({ oppEditor = 'm-guest' } = {}) {
    vi.resetModules()
    const { useTracker } = await import('../../composables/useTracker.js')
    const tracker = useTracker()
    const side = (over = {}) => ({
      name: '', factionSlug: null, detachments: [], disposition: null, role: 'attacker',
      secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false,
      members: [{ name: '', factionSlug: null, detachments: [] }, { name: '', factionSlug: null, detachments: [] }],
      ...over,
    })
    tracker.startLobby({
      settings: { gameType: 'singles', combatPatrol: false, battleSize: 'strikeForce', firstTurn: 1, layout: 'A' },
      players: [
        // the host's own side, complete
        side({ name: 'Host', factionSlug: 'orks', detachments: ['Bully Boyz'], role: 'attacker' }),
        // the other side: claimed by another phone and still empty
        side({ role: 'defender', lobby: { editor: { id: oppEditor, mi: null, name: 'Гость' }, ready: false } }),
      ],
    })
    tracker.current.value.party = { id: 'p1', memberId: 'm-host', token: 't', side: 0, mi: null, host: true, seq: 1, versions: {} }
    const Screen = (await import('./GameSetup.vue')).default
    return mount(Screen)
  }

  // Assembling your own side depends on nobody: a Force Disposition follows from THIS side's
  // detachment, and it is chosen on the next step — so waiting here kept the host from its own.
  it('lets the host leave the armies step while the other side is still empty', async () => {
    const w = await hostScreen()
    await flushPromises()
    const next = w.findAll('.step-panel')[0].findAll('.actions .btn-primary')
    expect(next).toHaveLength(1)
    expect(next[0].attributes('disabled')).toBeUndefined()
  })

  // A side that has said "done" can ask to reopen, and the host can also be joined by a guest
  // while it was filling that side itself. Either way the later steps were built on answers that
  // are being changed: the primary is the pair of dispositions, the layout is that matchup. So
  // the host comes back to the mission step and waits there (owner, 2026-09-24).
  it('pulls the host back to the mission step when the other side reopens, and blocks Next', async () => {
    const w = await hostScreen()
    // AFTER hostScreen: it calls vi.resetModules(), so an earlier import would hand back a
    // different module registry — and a different, empty store.
    const { useTracker } = await import('../../composables/useTracker.js')
    const g = useTracker().current.value
    // Both sides in and confirmed: the host can reach the battlefield step.
    g.players[0].disposition = 'take-and-hold'
    Object.assign(g.players[1], { factionSlug: 'orks', detachments: ['Bully Boyz'], disposition: 'take-and-hold' })
    g.players[1].lobby.ready = true
    await flushPromises()
    const mission = w.findAll('.step-panel')[1]
    expect(mission.findAll('.actions .btn-primary')[0].attributes('disabled')).toBeUndefined()
    await mission.findAll('.actions .btn-primary')[0].trigger('click')
    expect(w.findAll('.step-panel')[2].isVisible()).toBe(true)

    // …then they ask for their side back.
    g.players[1].lobby.ready = false
    await flushPromises()
    expect(w.findAll('.step-panel')[1].isVisible()).toBe(true)
    expect(w.findAll('.step-panel')[1].findAll('.actions .btn-primary')[0].attributes('disabled')).toBeDefined()
    // And the primary previews, which are that pair, say they are waiting rather than showing a
    // mission that is about to change.
    expect(w.findAll('.step-panel')[1].findAll('.primary-block')).toHaveLength(0)
    expect(w.findAll('.step-panel')[1].find('.primary-pending').exists()).toBe(true)
  })

  // …but the primary mission IS the pair of dispositions, so THAT step waits.
  it('holds the mission step until both sides have a disposition', async () => {
    const w = await hostScreen()
    await flushPromises()
    const next = w.findAll('.step-panel')[1].findAll('.actions .btn-primary')
    expect(next[0].attributes('disabled')).toBeDefined()
  })

  it('draws the other side as a report on both steps, never as a form', async () => {
    const w = await hostScreen()
    await flushPromises()
    expect(w.findAll('.side-mirror')).toHaveLength(2) // armies + mission
    expect(w.findAll('.side-mirror .sm-waiting')).toHaveLength(2)

    // …and "a report" means the whole card. The secondaries switch used to sit outside the
    // mirror/form split and only go inert, so the mission step offered the host a live
    // "Tactical / Fixed" toggle for a side another phone fills in (owner, 2026-09-24).
    const cards = w.findAll('.step-panel')[1].findAll('.player-card')
    const theirs = cards.find((c) => c.find('.side-mirror').exists())
    expect(theirs).toBeTruthy()
    expect(theirs.findAll('.seg')).toHaveLength(0)
    // The host's own card still asks, or the step would have nothing to fill in.
    expect(cards.find((c) => !c.find('.side-mirror').exists()).findAll('.seg').length).toBeGreaterThan(0)
  })
})

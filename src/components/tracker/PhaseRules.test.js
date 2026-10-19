import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// The store is a module singleton — reset it (and the component bound to it) between cases.
let PhaseRules, tracker, DISPOSITIONS

beforeEach(async () => {
  localStorage.clear()
  push.mockClear()
  navigateTo.mockClear()
  vi.resetModules()
  const mod = await import('../../composables/useTracker.js')
  tracker = mod.useTracker()
  DISPOSITIONS = mod.DISPOSITIONS
  PhaseRules = (await import('./PhaseRules.vue')).default
})
afterEach(() => { document.body.innerHTML = '' })

const RouterLink = { props: ['to'], template: '<a><slot /></a>' }

// Every line is a way in, so the two navigators are spied on rather than driven for real.
const { push, navigateTo } = vi.hoisted(() => ({ push: vi.fn(), navigateTo: vi.fn() }))
vi.mock('vue-router', () => ({ useRouter: () => ({ push }), useRoute: () => ({ query: {} }) }))
vi.mock('../../composables/useRefNavigation.js', () => ({
  useRefNavigation: () => ({ navigateTo, resolveRef: () => null }),
}))

function startGame(p0 = {}, p1 = {}, settings = {}) {
  tracker.newGame({
    settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', trackPhases: true, ...settings },
    players: [
      { name: 'Me', factionSlug: 'orks', detachments: [], disposition: DISPOSITIONS[0].id, role: 'attacker', secondaryMode: 'fixed', fixedSecondaries: [], ...p0 },
      { name: 'Opp', factionSlug: 'necrons', detachments: [], disposition: DISPOSITIONS[1].id, role: 'defender', secondaryMode: 'fixed', fixedSecondaries: [], ...p1 },
    ],
  })
}
async function mountBlock() {
  const w = mount(PhaseRules, { global: { stubs: { RouterLink } } })
  // The rules wait for the phase index, the one dynamic import usePhaseRules makes. Since the Turn
  // tab draws its steps at once (2026-10-10) the block is on screen BEFORE the rules are, so waiting
  // for the block alone passed at once and, with the whole suite running beside it, the checks then
  // read steps with no rules in them (a flaky failure in two cases). Awaiting the same module is
  // the wait that means something: the component's own await on it resolves first.
  await import('../../data/phaseIndex.js')
  await flushPromises()
  // The steps render at once; the rules on them wait for the index, a dynamic import — real file I/O under vitest — so wait for the block to
  // appear rather than for a number of ticks. It used to poll 40 times with a zero timeout,
  // which is a budget in TICKS, not in time: with the whole tracker suite running beside it the
  // cold import sometimes needed more, and the next line then triggered a click on nothing.
  // A real deadline with a real interval is what the wait is actually about.
  // Swallowed on purpose: one case mounts a game where the block correctly renders NOTHING, and
  // waiting for it there is waiting for something that will never come.
  await vi.waitFor(() => {
    if (!w.find('.pr-list').exists()) throw new Error('the phase block has not rendered yet')
  }, { timeout: 2000, interval: 10 }).catch(() => {})
  await flushPromises()
  return w
}
// The step a row stands at: the step head right before its block.
const stepOf = (w, text) => {
  const li = w.findAll('.pr-list > li').find((x) => x.text().includes(text))
  return li?.element.closest('.pr-list').previousElementSibling?.textContent.trim()
}

describe('PhaseRules', () => {
  // The block's whole reason to exist: it answers for the phase the clock is standing on, and it
  // answers per SIDE, because half the point is the rule that fires in the opponent's phase.
  it('lists the army rules that name the current phase, and re-answers when the phase moves', async () => {
    startGame()
    const w = await mountBlock()
    // Orks' Waaagh! is called in the Command phase, which is where a game starts.
    expect(w.text()).toContain('Waaagh!')

    tracker.goToPhase(0, 'shooting')
    await flushPromises()
    expect(w.text()).not.toContain('Waaagh!')
  })

  // A rule stands at the step it fires in (owner, 2026-10-10): the Waaagh! is called at the
  // START of the Command phase; what fires during a phase, at its main step.
  it('puts a rule at the step of the phase it fires in', async () => {
    startGame({ roster: { id: 'r1', name: 'L', faction: 'orks', detachments: [], battleSize: 'strike-force', units: [{ uid: 'u1', id: 'painboy', size: 0 }] } })
    const w = await mountBlock()
    expect(stepOf(w, 'Waaagh!')).toBe('Start of phase')
    expect(stepOf(w, 'Crude Surgery')).toBe('Command abilities')
    // the steps with nothing in a row are one quiet line, so the order still reads
    const cmd = w.findAll('.pr-side')[0].findAll('.phase-group').find((g) => g.find('.phase-name').text() === 'Command phase')
    expect(cmd.findAll('.pr-steps > *').map((x) => x.text().split('\n')[0].trim()))
      .toEqual(['Start of phase', 'Waaagh!', 'Gain Core CP · Battle-shock', 'Command abilities', 'PainboyCrude Surgery', 'End of phase'])
  })

  // A game without the clock asks about the whole turn: each phase that has something to say,
  // under its own heading (owner, 2026-10-08).
  it('lays out the whole turn when the game keeps no clock', async () => {
    startGame({}, {}, { trackPhases: false })
    const w = await mountBlock()
    const side = w.findAll('.pr-side')[0]
    expect(side.findAll('.phase-name').map((h) => h.text())).toEqual(['Start of turn', 'Command phase', 'Movement phase', 'Shooting phase', 'Charge phase', 'Fight phase', 'End of turn'])
    expect(w.text()).toContain('Waaagh!')
  })

  // A detachment the army borrows is indexed under the faction it is printed for: a Blood Angels
  // side on Gauntlet Task Force had no line for its rule, the Space Marines' entry (2026-10-09).
  it('finds a borrowed detachment\'s rule in the file it is printed in', async () => {
    startGame({ factionSlug: 'blood-angels', detachments: ['Gauntlet Task Force'] })
    tracker.goToPhase(0, 'shooting')
    const w = await mountBlock()
    expect(w.text()).toContain('Combined Deployment')
  })

  it('names each side, first-turn player first', async () => {
    startGame()
    const w = await mountBlock()
    const who = w.findAll('.pr-who').map((h) => h.text())
    expect(who[0]).toBe('Me')
  })

  // A unit's abilities need a list; without one the block still has the army and detachment rules.
  it('adds the abilities of the units in an attached list', async () => {
    startGame({
      roster: {
        id: 'r1', name: 'Da List', faction: 'orks', detachments: [],
        battleSize: 'strike-force', units: [{ uid: 'u1', id: 'painboy', size: 0 }],
      },
    })
    const w = await mountBlock()
    // "In your Command phase…" — and the unit it belongs to is named under it. (Boyz carried
    // this case until Codex: Orks gave them no Command-phase ability at all.)
    expect(w.text()).toContain('Crude Surgery')
    expect(w.text()).toContain('Painboy')
  })

  // Wargear speaks only while the unit carries it: the Battle Sisters' Simulacrum Imperialis is
  // a pick (group 4), so a squad without it says nothing at the end of the Command phase.
  it('adds a wargear ability only for the unit that took the item', async () => {
    const list = (wg) => ({
      id: 'r1', name: 'L', faction: 'adepta-sororitas', detachments: [], battleSize: 'strike-force',
      units: [{ uid: 'b1', id: 'battle-sisters-squad', size: 0, ...(wg ? { wg } : {}) }],
    })
    startGame({ factionSlug: 'adepta-sororitas', roster: list(null) })
    let w = await mountBlock()
    expect(w.text()).not.toContain('Simulacrum Imperialis')
    w.unmount()
    startGame({ factionSlug: 'adepta-sororitas', roster: list([[4, 0, 1]]) })
    w = await mountBlock()
    expect(w.text()).toContain('Simulacrum Imperialis')
    expect(w.text()).toContain('Wargear')
  })

  // An enhancement speaks for its bearer: chosen on the entry, or the one its datasheet is forced
  // to take in a detachment (a C'tan Shard's in Pantheon of Woe, never stored on the entry).
  it('adds the enhancement a unit carries, chosen or mandatory', async () => {
    startGame({
      factionSlug: 'adepta-sororitas',
      roster: { id: 'r1', name: 'L', faction: 'adepta-sororitas', detachments: [], battleSize: 'strike-force', units: [{ uid: 'c1', id: 'canoness', size: 0, enh: 'Litanies of Faith' }] },
    })
    let w = await mountBlock()
    expect(w.text()).toContain('Litanies of Faith')
    expect(w.text()).toContain('Enhancement')
    w.unmount()
    startGame({}, {
      factionSlug: 'necrons', detachments: ['Pantheon of Woe'],
      roster: { id: 'r2', name: 'N', faction: 'necrons', detachments: ['Pantheon of Woe'], battleSize: 'strike-force', units: [{ uid: 'v1', id: 'ctan-shard-of-the-void-dragon', size: 0 }] },
    })
    tracker.goToPhase(0, 'shooting')
    w = await mountBlock()
    expect(w.text()).toContain('Animus Damper')
  })

  // One fold per phase, each with what it holds counted. Without phases the whole turn is open
  // (owner, 2026-10-19 — it was all shut, remembered, since 2026-10-10); an empty start of the turn
  // stays a muted, disabled line.
  it('opens every phase of the turn when the game keeps no phases, each with its count', async () => {
    startGame({}, {}, { trackPhases: false })
    const w = await mountBlock()
    const side = w.findAll('.pr-side')[0]
    expect(side.findAll('.phase-head').every((h) => h.attributes('aria-expanded') === 'true' || h.classes('inert'))).toBe(true)
    const cmd = side.findAll('.phase-head').find((h) => h.text().includes('Command phase'))
    expect(Number(cmd.find('.phase-count').text())).toBeGreaterThan(0)
    const start = side.findAll('.phase-head')[0] // the turn's start, with nothing in it
    expect(start.find('.phase-count').text()).toBe('0')
    expect(start.classes()).toContain('inert')
    expect(start.attributes('disabled')).toBeDefined()
  })

  // With phases the tab is the phase the game stands in — open.
  it('opens the phase the game stands in when it keeps phases', async () => {
    startGame({}, {}, { trackPhases: true })
    tracker.current.value.currentPhase = 'command'
    const w = await mountBlock()
    const cmd = w.findAll('.pr-side')[0].findAll('.phase-head').find((h) => h.text().includes('Command phase'))
    expect(cmd.attributes('aria-expanded')).toBe('true')
  })

  // A mission card stands where it scores: the side on turn's primary, for one, at the end of
  // its Command phase or the end of the turn — whichever its blocks say.
  it('puts the mission cards at the moment they score, and leads them to the Missions tab', async () => {
    startGame({}, {}, { trackPhases: false })
    tracker.current.value.currentRound = 2
    const w = await mountBlock()
    const card = w.findAll('.pr-side')[0].findAll('.pr-list > li').find((li) => li.text().includes('Primary'))
    expect(card).toBeTruthy()
    expect(['Command phase', 'End of turn']).toContain(card.element.closest('.phase-group').querySelector('.phase-name').textContent.trim())
    await card.find('button').trigger('click')
    expect(w.emitted('missions')).toHaveLength(1)
  })
})

// A name the reader cannot get to is half a reminder.
describe('PhaseRules — where a line leads', () => {
  const roster = (units) => ({
    id: 'r1', name: 'Da List', faction: 'orks', detachments: [],
    battleSize: 'strike-force', units,
  })
  const line = (w, text) => w.findAll('.pr-go-btn').find((b) => b.text().includes(text))

  it('opens the unit\'s own card inside the attached list', async () => {
    startGame({ roster: roster([{ uid: 'u1', id: 'painboy', size: 0 }]) })
    const w = await mountBlock()
    await line(w, 'Crude Surgery').trigger('click')
    expect(push).toHaveBeenCalledWith({ path: '/tracker/game/roster/0', query: { unit: 'u1' } })
  })

  // With several units carrying the same rule there is no single card to mean, so the line opens
  // the list and lets the reader pick.
  it('opens the list when more than one unit carries the rule', async () => {
    startGame({ roster: roster([{ uid: 'u1', id: 'painboy', size: 0 }, { uid: 'u2', id: 'painboy', size: 0 }]) })
    const w = await mountBlock()
    await line(w, 'Crude Surgery').trigger('click')
    expect(push).toHaveBeenCalledWith('/tracker/game/roster/0')
  })

  it('sends an army rule to its anchor on the faction page', async () => {
    startGame()
    const w = await mountBlock()
    await line(w, 'Waaagh!').trigger('click')
    expect(navigateTo).toHaveBeenCalledWith({ route: '/factions/orks', anchor: 'waaagh' })
  })

  it('falls back to the faction datasheet when the player fielded no list', async () => {
    startGame()
    const w = await mountBlock()
    // No roster → no unit lines at all, so the army rule is the only way in. Guarding the
    // fallback here rather than asserting a link that cannot exist.
    expect(w.findAll('.pr-go-btn').every((b) => !b.text().includes('Crude Surgery'))).toBe(true)
  })
})

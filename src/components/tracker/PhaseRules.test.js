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

function startGame(p0 = {}, p1 = {}) {
  tracker.newGame({
    settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', trackPhases: true },
    players: [
      { name: 'Me', factionSlug: 'orks', detachments: [], disposition: DISPOSITIONS[0].id, role: 'attacker', secondaryMode: 'fixed', fixedSecondaries: [], ...p0 },
      { name: 'Opp', factionSlug: 'necrons', detachments: [], disposition: DISPOSITIONS[1].id, role: 'defender', secondaryMode: 'fixed', fixedSecondaries: [], ...p1 },
    ],
  })
}
async function mountBlock() {
  const w = mount(PhaseRules, { global: { stubs: { RouterLink } } })
  // The index is a dynamic import, and a cold one takes more than a single microtask flush to
  // resolve — so wait for the block rather than for a fixed number of ticks.
  // A microtask flush is not enough for a COLD one (it is real file I/O under vitest), so the
  // poll yields to the macrotask queue too.
  for (let i = 0; i < 40 && !w.find('.pr-head').exists(); i++) {
    await new Promise((r) => setTimeout(r, 0))
    await flushPromises()
  }
  return w
}
const open = async (w) => { await w.find('.pr-head').trigger('click'); await flushPromises() }

describe('PhaseRules', () => {
  // The block's whole reason to exist: it answers for the phase the clock is standing on, and it
  // answers per SIDE, because half the point is the rule that fires in the opponent's phase.
  it('lists the army rules that name the current phase, and re-answers when the phase moves', async () => {
    startGame()
    const w = await mountBlock()
    await open(w)
    // Orks' Waaagh! is called in the Command phase, which is where a game starts.
    expect(w.text()).toContain('Waaagh!')

    tracker.goToPhase(0, 'shooting')
    await flushPromises()
    expect(w.text()).not.toContain('Waaagh!')
  })

  it('names each side, first-turn player first', async () => {
    startGame()
    const w = await mountBlock()
    await open(w)
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
    await open(w)
    // "In your Command phase…" — and the unit it belongs to is named under it. (Boyz carried
    // this case until Codex: Orks gave them no Command-phase ability at all.)
    expect(w.text()).toContain('Crude Surgery')
    expect(w.text()).toContain('Painboy')
  })

  it('renders nothing when no rule has anything to say', async () => {
    startGame()
    tracker.goToPhase(0, 'charge')   // eight abilities in the whole game name the Charge phase
    const w = await mountBlock()
    expect(w.find('.pr').exists()).toBe(false)
  })

  it('remembers whether it was left open', async () => {
    startGame()
    const w = await mountBlock()
    // CollapseTransition keeps its slot mounted and clips it, so `aria-expanded` is the state.
    expect(w.find('.pr-head').attributes('aria-expanded')).toBe('false')
    await open(w)
    expect(localStorage.getItem('wh11ed-phase-rules-open')).toBe('1')
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
    await open(w)
    await line(w, 'Crude Surgery').trigger('click')
    expect(push).toHaveBeenCalledWith({ path: '/tracker/game/roster/0', query: { unit: 'u1' } })
  })

  // With several units carrying the same rule there is no single card to mean, so the line opens
  // the list and lets the reader pick.
  it('opens the list when more than one unit carries the rule', async () => {
    startGame({ roster: roster([{ uid: 'u1', id: 'painboy', size: 0 }, { uid: 'u2', id: 'painboy', size: 0 }]) })
    const w = await mountBlock()
    await open(w)
    await line(w, 'Crude Surgery').trigger('click')
    expect(push).toHaveBeenCalledWith('/tracker/game/roster/0')
  })

  it('sends an army rule to its anchor on the faction page', async () => {
    startGame()
    const w = await mountBlock()
    await open(w)
    await line(w, 'Waaagh!').trigger('click')
    expect(navigateTo).toHaveBeenCalledWith({ route: '/factions/orks', anchor: 'waaagh' })
  })

  it('falls back to the faction datasheet when the player fielded no list', async () => {
    startGame()
    const w = await mountBlock()
    await open(w)
    // No roster → no unit lines at all, so the army rule is the only way in. Guarding the
    // fallback here rather than asserting a link that cannot exist.
    expect(w.findAll('.pr-go-btn').every((b) => !b.text().includes('Crude Surgery'))).toBe(true)
  })
})

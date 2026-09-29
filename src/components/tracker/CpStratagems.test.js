import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// The CP tab's stratagems: spend a side's CP, take it back, and never on a side this phone does
// not play. No faction here, so only the core deck is on screen (the faction decks are the
// same data the Stratagems page reads, gameStratagems.js).
let CpStratagems, tracker, DISPOSITIONS

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  const mod = await import('../../composables/useTracker.js')
  tracker = mod.useTracker()
  DISPOSITIONS = mod.DISPOSITIONS
  CpStratagems = (await import('./CpStratagems.vue')).default
  tracker.newGame({
    settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', twist: null, twistMission: null },
    players: [
      { name: 'Me', factionSlug: null, detachments: [], disposition: DISPOSITIONS[0].id, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
      { name: 'Opp', factionSlug: null, detachments: [], disposition: DISPOSITIONS[1].id, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
    ],
  })
})
afterEach(() => { document.body.innerHTML = '' })

async function mountTab(side = 0) {
  const w = mount(CpStratagems, { props: { names: ['Me', 'Opp'], defaultSide: side } })
  // The decks are dynamic imports: wait for the core rows, not for one tick.
  await vi.waitFor(async () => { await flushPromises(); expect(w.findAll('.sr').length).toBeGreaterThan(0) }, { timeout: 5000 })
  return w
}
// By its name — a mixed list adds a "core" tag after it, so the name is where the text starts.
const row = (w, name) => w.findAll('.sr').find((r) => r.find('.sr-name').text().toUpperCase().startsWith(name.toUpperCase()))

describe('CpStratagems', () => {
  it('spends the chosen side\'s CP on a core stratagem and takes it back', async () => {
    const w = await mountTab(0)
    await w.findAll('.cps-bank-name')[1].trigger('click') // the opponent plays Fire Overwatch in my turn
    await row(w, 'Fire Overwatch').find('.sr-use').trigger('click')
    expect(tracker.current.value.players[1].cp).toBe(0)
    expect(row(w, 'Fire Overwatch').text()).toContain('used ×1')
    await row(w, 'Fire Overwatch').find('.sr-undo').trigger('click')
    expect(tracker.current.value.players[1].cp).toBe(1)
  })

  it('prices a use at a changed cost, and says why a limited one is off', async () => {
    const w = await mountTab(0)
    expect(row(w, 'Rapid Ingress').find('.sr-use').attributes('disabled')).toBeDefined()
    expect(row(w, 'Rapid Ingress').find('.sr-why').text()).toBe('Not available in this battle round')
    await row(w, 'Counteroffensive').find('.sr-gear').trigger('click')
    const opts = document.body.querySelectorAll('.cps-mod')
    opts[0].click() // reduced: 2CP → 1CP
    await flushPromises()
    expect(row(w, 'Counteroffensive').find('.sr-use').text()).toBe('1CP')
    await row(w, 'Counteroffensive').find('.sr-use').trigger('click')
    expect(tracker.current.value.players[0].cp).toBe(0)
  })

  it('never spends on a side another phone plays', async () => {
    tracker.current.value.party = { id: 'p', token: 't', side: 0, mi: null, host: false, seq: 1, versions: {} }
    const w = await mountTab(0)
    await w.findAll('.cps-bank-name')[1].trigger('click')
    expect(w.find('.cps-note').exists()).toBe(true)
    expect(row(w, 'Command Re-roll').find('.sr-use').attributes('disabled')).toBeDefined()
  })
})

describe('CpStratagems — the Stratagems page\'s filter', () => {
  it('with the phase clock, puts first what THIS side can play now — its phase, and whose it is', async () => {
    tracker.current.value.settings.trackPhases = true
    tracker.goToPhase(0, 'shooting') // side 0's own Shooting phase
    const w = await mountTab(0)
    const heads = w.findAll('.phase-head')
    expect(heads[0].text()).toContain('Now · Shooting phase')
    expect(heads[0].classes()).toContain('now')
    // Closed at first…
    expect(heads.every((h) => h.attributes('aria-expanded') === 'false')).toBe(true)
    await heads[0].trigger('click')
    const now = w.findAll('.phase-group')[0].findAll('.sr-name').map((n) => n.text())
    expect(now.some((t) => t.startsWith('Explosives'))).toBe(true) // "your Shooting phase"
    expect(now.some((t) => t.startsWith('Smokescreen'))).toBe(false) // the opponent's Shooting phase
    // …and remembered as the player left them.
    w.unmount()
    const again = await mountTab(0)
    expect(again.findAll('.phase-head')[0].attributes('aria-expanded')).toBe('true')
    // The opponent, in the same phase, gets Smokescreen and not Explosives.
    await again.findAll('.cps-bank-name')[1].trigger('click')
    const opp = again.findAll('.phase-group')[0].findAll('.sr-name').map((n) => n.text())
    expect(opp.some((t) => t.startsWith('Smokescreen'))).toBe(true)
    expect(opp.some((t) => t.startsWith('Explosives'))).toBe(false)
  })

  it('narrows to one deck, and shows the flat list', async () => {
    const w = await mountTab(0)
    await w.find('.strat-toggle').trigger('click')
    await w.findAll('.strat-filter').find((b) => b.text() === 'Core').trigger('click')
    expect(w.findAll('.cps-title').map((t) => t.text())).toEqual(['Core stratagems'])
  })
})

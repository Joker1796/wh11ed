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
  tracker.beginGame()
})
afterEach(() => { document.body.innerHTML = '' })

async function mountTab(side = 0, extra = {}) {
  const w = mount(CpStratagems, { props: { names: ['Me', 'Opp'], defaultSide: side, ...extra } })
  // The decks are dynamic imports: wait for the core rows, not for one tick.
  await vi.waitFor(async () => { await flushPromises(); expect(w.findAll('.sr').length).toBeGreaterThan(0) }, { timeout: 5000 })
  return w
}
// Playing one opens the dialog (StratPlayModal) — no list attached here, so it asks only whether a
// rule changed the cost: [reduced, as printed, increased].
async function play(w, name, pick = 1) {
  await row(w, name).find('.sr-use').trigger('click')
  await vi.waitFor(() => expect(document.body.querySelectorAll('.spm-cost').length).toBe(3))
  document.body.querySelectorAll('.spm-cost')[pick].click()
  await flushPromises()
  document.body.querySelector('.spm-go').click()
  await flushPromises()
}
// By its name — a mixed list adds a "core" tag after it, so the name is where the text starts.
const row = (w, name) => w.findAll('.sr').find((r) => r.find('.sr-name').text().toUpperCase().startsWith(name.toUpperCase()))

describe('CpStratagems', () => {
  it('spends the chosen side\'s CP on a core stratagem and takes it back', async () => {
    const w = await mountTab(0)
    await w.findAll('.cps-tabs .page-tab')[1].trigger('click') // the opponent plays Fire Overwatch in my turn
    await play(w, 'Fire Overwatch')
    expect(tracker.current.value.players[1].cp).toBe(0)
    expect(row(w, 'Fire Overwatch').text()).toContain('used ×1')
    await row(w, 'Fire Overwatch').find('.sr-undo').trigger('click')
    expect(tracker.current.value.players[1].cp).toBe(1)
  })

  // Not asking (owner, 2026-10-14): one tap spends the printed cost, no dialog — and a play the
  // tracker refuses (short of CP) opens the dialog after all, since it says why.
  it('with "ask the unit and the cost" off, spends the printed cost at one tap', async () => {
    tracker.current.value.settings.askStratagems = false
    const w = await mountTab(0)
    await w.findAll('.cps-tabs .page-tab')[1].trigger('click')
    // Counteroffensive at its printed 2CP with 1 in the bank: refused, so the dialog opens to say why.
    await row(w, 'Counteroffensive').find('.sr-use').trigger('click')
    await vi.waitFor(() => expect(document.body.querySelectorAll('.spm-cost').length).toBe(3))
    expect(tracker.current.value.players[1].cp).toBe(1)
    document.body.innerHTML = ''
    // Fire Overwatch, 1CP: spent at once, no dialog.
    await row(w, 'Fire Overwatch').find('.sr-use').trigger('click')
    await flushPromises()
    expect(document.body.querySelector('.spm-cost')).toBeNull()
    expect(tracker.current.value.players[1].cp).toBe(0)
  })

  it('asks each time whether a rule changed the cost, and says why a limited one is off', async () => {
    const w = await mountTab(0)
    // Whose turn first (owner, 2026-09-29): Rapid Ingress is the other side's move…
    expect(row(w, 'Rapid Ingress').find('.sr-use').attributes('disabled')).toBeDefined()
    expect(row(w, 'Rapid Ingress').find('.sr-why').text()).toBe('Only in your opponent’s turn')
    // …and for the side not on turn, the round's own limit.
    await w.findAll('.cps-tabs .page-tab')[1].trigger('click')
    expect(row(w, 'Rapid Ingress').find('.sr-why').text()).toBe('Not available in this battle round')
    // Counteroffensive (2CP) is the opponent's Fight phase: with 1CP in the bank only a cost a rule
    // reduced can pay for it — the row stays open, the dialog greys what the bank cannot cover.
    expect(row(w, 'Counteroffensive').find('.sr-use').text()).toBe('2CP')
    await row(w, 'Counteroffensive').find('.sr-use').trigger('click')
    await vi.waitFor(() => expect(document.body.querySelectorAll('.spm-cost').length).toBe(3))
    const [reduced, printed] = document.body.querySelectorAll('.spm-cost')
    expect(printed.disabled).toBe(true)
    reduced.click() // 2CP → 1CP, this use only
    await flushPromises()
    document.body.querySelector('.spm-go').click()
    await flushPromises()
    expect(tracker.current.value.players[1].cp).toBe(0)
    expect(row(w, 'Counteroffensive').find('.sr-use').text()).toBe('2CP') // the next use is priced afresh
  })

  // Owner, 2026-09-29: only what can be played in THIS turn is on offer, and the other turn is said.
  it('offers the side not on turn only what it can play in the other\'s turn, and says whose turn it is', async () => {
    const w = await mountTab(0)
    expect(row(w, 'Fire Overwatch').find('.sr-why').text()).toBe('Only in your opponent’s turn')
    expect(w.find('.cps-oppturn').exists()).toBe(false)
    await w.findAll('.cps-tabs .page-tab')[1].trigger('click')
    expect(row(w, 'Fire Overwatch').find('.sr-use').attributes('disabled')).toBeUndefined()
    expect(row(w, 'Command Re-roll').find('.sr-use').attributes('disabled')).toBeUndefined() // any turn
    expect(w.find('.cps-oppturn').text()).toContain('Me')
  })

  it('never spends on a side another phone plays', async () => {
    tracker.current.value.party = { id: 'p', token: 't', side: 0, mi: null, host: false, seq: 1, versions: {} }
    const w = await mountTab(0)
    await w.findAll('.cps-tabs .page-tab')[1].trigger('click')
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
    expect(heads[0].text()).toContain('Playable now · Shooting phase')
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
    await again.findAll('.cps-tabs .page-tab')[1].trigger('click')
    const opp = again.findAll('.phase-group')[0].findAll('.sr-name').map((n) => n.text())
    expect(opp.some((t) => t.startsWith('Smokescreen'))).toBe(true)
    expect(opp.some((t) => t.startsWith('Explosives'))).toBe(false)
  })

  // The game screen picks the side on the score cards: no side tabs here then, the block framed,
  // and a new pick from outside is followed.
  it('follows a side picked outside, with no tabs of its own', async () => {
    const w = await mountTab(0, { side: 1 })
    expect(w.find('.cps-tabs').exists()).toBe(false)
    expect(w.find('.cps').classes()).toContain('side-frame')
    expect(w.find('.cps').classes()).toContain('opp')
    await w.setProps({ side: 0 })
    expect(w.find('.cps').classes()).not.toContain('opp')
  })

  // Always grouped by phase (owner, 2026-10-06): no list/phases toggle here.
  it('narrows to one deck, always grouped by phase', async () => {
    const w = await mountTab(0)
    expect(w.find('.strat-toggle').exists()).toBe(false)
    await w.findAll('.seg button').find((b) => b.text() === 'Core').trigger('click')
    expect(w.findAll('.phase-group').length).toBeGreaterThan(0)
    expect(w.findAll('.sr-tag').length).toBe(0) // one deck: no "Core" tag on each row
  })
})

// Owner, 2026-10-10 (Misha's note): without the phase clock the list is the reference and starts
// open, as in the first tracker; with it the groups start folded and "now" is the one to open.
describe('CpStratagems — the phase groups start', () => {
  const heads = (w) => w.findAll('[aria-expanded]').map((b) => b.attributes('aria-expanded'))
  it('open without the phase clock, and keep what the player folded', async () => {
    let w = await mountTab()
    expect(heads(w).length).toBeGreaterThan(1)
    expect(heads(w).every((v) => v === 'true')).toBe(true)
    await w.find('[aria-expanded]').trigger('click')
    expect(heads(w)[0]).toBe('false')
    w.unmount()
    w = await mountTab()
    expect(heads(w)[0]).toBe('false')
    expect(heads(w).slice(1).every((v) => v === 'true')).toBe(true)
  })

  it('folded with the clock', async () => {
    tracker.current.value.settings.trackPhases = true
    const w = await mountTab()
    expect(heads(w).every((v) => v === 'false')).toBe(true)
  })
})

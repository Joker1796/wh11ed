import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// A component loads the army tracker spec lazily; wait for it, or a load still in flight when the
// file ends lands after the environment is torn down (an unhandled rejection under load).
afterEach(() => vi.dynamicImportSettled())

// The Armies tab: one entry per army (per member in doubles), the way to its units — the attached
// list, else the faction's datasheets — and its rules, loaded from the faction data on demand.
let ArmiesPanel, tracker, DISPOSITIONS

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  const mod = await import('../../composables/useTracker.js')
  tracker = mod.useTracker()
  DISPOSITIONS = mod.DISPOSITIONS
  ArmiesPanel = (await import('./ArmiesPanel.vue')).default
})

const RouterLinkStub = { props: ['to'], template: '<a :href="to"><slot /></a>' }
function start(p0, p1, settings = {}) {
  const base = { detachments: [], secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false }
  tracker.newGame({
    settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', twist: null, twistMission: null, ...settings },
    players: [
      { ...base, name: 'Me', disposition: DISPOSITIONS[0].id, role: 'attacker', ...p0 },
      { ...base, name: 'Opp', disposition: DISPOSITIONS[1].id, role: 'defender', ...p1 },
    ],
  })
}
function mountPanel(names = ['Me', 'Opp']) {
  return mount(ArmiesPanel, { props: { names }, global: { stubs: { RouterLink: RouterLinkStub } } })
}
// Every army's card is built and kept; the one on screen is the one v-show left displayed.
const onScreen = (el) => !String(el.attributes('style') || '').includes('display: none')
const shown = (w) => w.findAll('.ap-card').find(onScreen)
// The way to the units of every army, picking each in turn: the faction's datasheets by address;
// an attached list stands under the card in the same Army tab since 2026-10-10, so the card has no
// button to it — the panel names the army on screen ("list pi:mi") for the list to follow.
async function unitLinks(w) {
  const out = []
  for (const b of w.findAll('.ap-tabs .page-tab')) {
    await b.trigger('click')
    const card = shown(w)
    if (card.find('a.proster').exists()) { out.push(card.find('a.proster').attributes('href')); continue }
    const key = w.emitted('army').at(-1)[0]
    const [pi, mi] = key.split(':')
    const pl = tracker.current.value.players[pi]
    const member = mi === '' ? pl : pl.members[mi]
    out.push(member?.roster ? `list ${key}` : null)
  }
  return out
}

describe('ArmiesPanel', () => {
  it('links each army to its own faction datasheets when no list is attached', async () => {
    start({ factionSlug: 'orks' }, { factionSlug: 'necrons' })
    expect(await unitLinks(mountPanel())).toEqual(['/factions/orks/datasheets', '/factions/necrons/datasheets'])
  })

  it('prefers the attached list — that army only', async () => {
    const roster = { id: 'r1', name: 'Da List', faction: 'orks', detachments: [], units: [] }
    start({ factionSlug: 'orks', rosterId: 'r1', roster }, { factionSlug: 'necrons' })
    expect(await unitLinks(mountPanel())).toEqual(['list 0:', '/factions/necrons/datasheets'])
  })

  it('has no link for a legacy army without a faction, and says why', async () => {
    start({ factionSlug: null }, { factionSlug: null })
    const w = mountPanel()
    expect(await unitLinks(w)).toEqual([null, null])
    expect(w.find('.ap-note').text()).toContain('not set')
  })

  it('lists every doubles member as its own army, routed to that member\'s slice', async () => {
    start(
      { teamName: 'Alpha', members: [{ name: 'Ann', factionSlug: 'orks', detachments: ['War Horde'] }, { name: 'Bob', factionSlug: 'aeldari' }] },
      { teamName: 'Beta', members: [{ name: 'Cat', factionSlug: 'drukhari' }, { name: 'Dan', factionSlug: null }] },
      { gameType: 'doubles' },
    )
    tracker.current.value.players[0].members[1].roster = { units: [{ uid: 'a', id: 'x', size: 0 }] }
    const w = mountPanel(['Alpha', 'Beta'])
    expect(w.findAll('.ap-tabs .page-tab').map((e) => e.text())).toEqual(['Alpha · Ann', 'Alpha · Bob', 'Beta · Cat', 'Beta · Dan'])
    expect(w.find('.ap-fac').text()).toBe('Orks')
    expect(await unitLinks(w)).toEqual(['/factions/orks/datasheets', 'list 0:1', '/factions/drukhari/datasheets', null])
  })

  // On the game screen the side is picked on the score cards: only that side's armies, and tabs
  // only for a doubles team's two members.
  it('offers only the picked side\'s armies, with tabs only for a doubles team', async () => {
    start(
      { teamName: 'Alpha', members: [{ name: 'Ann', factionSlug: 'orks' }, { name: 'Bob', factionSlug: 'aeldari' }] },
      { teamName: 'Beta', members: [{ name: 'Cat', factionSlug: 'drukhari' }, { name: 'Dan', factionSlug: null }] },
      { gameType: 'doubles' },
    )
    const w = mount(ArmiesPanel, { props: { names: ['Alpha', 'Beta'], side: 1 }, global: { stubs: { RouterLink: RouterLinkStub } } })
    expect(w.find('.ap').classes()).toContain('side-frame')
    expect(w.findAll('.ap-tabs .page-tab').map((e) => e.text())).toEqual(['Beta · Cat', 'Beta · Dan'])
    expect(shown(w).find('.ap-fac').text()).toBe('Drukhari')
    await w.setProps({ side: 0 })
    expect(shown(w).find('.ap-fac').text()).toBe('Orks')
  })

  it('has no tabs for a singles side picked on the cards', () => {
    start({ name: 'Me', factionSlug: 'orks' }, { name: 'Opp', factionSlug: 'necrons' })
    const w = mount(ArmiesPanel, { props: { names: ['Me', 'Opp'], side: 1 }, global: { stubs: { RouterLink: RouterLinkStub } } })
    expect(w.find('.ap-tabs').exists()).toBe(false)
    expect(shown(w).find('.ap-fac').text()).toBe('Necrons')
  })

  // Owner, 2026-09-29: the detachment rules read under the army rule, in its card.
  it('hands the army rule\'s text and each detachment\'s rule to the army rule card', async () => {
    start({ factionSlug: 'orks', detachments: ['War Horde'] }, { factionSlug: 'necrons' })
    const w = mountPanel()
    const card = () => w.findComponent({ name: 'ArmyTrackerCard' })
    // The faction file is a dynamic import: wait for it rather than for one tick.
    await vi.waitFor(async () => { await flushPromises(); expect(card().props('texts').length).toBe(2) }, { timeout: 5000 })
    const [army, det] = card().props('texts')
    expect(army.army).toBe(true)
    expect(army.title).toContain('Waaagh!')
    expect(det.title).toContain('War Horde')
  })

  // The Phase tab's line to a rule lands here: that army's tab, that rule unfolded.
  it('opens an army on a rule asked for from outside', async () => {
    start({ factionSlug: 'orks', detachments: ['War Horde'] }, { factionSlug: 'necrons' })
    const w = mountPanel()
    const pi = tracker.current.value.players.findIndex((p) => p.factionSlug === 'orks')
    const head = (text) => w.findAll('.army-acc-head').find((b) => b.text().includes(text))
    await w.findAll('.ap-tabs .page-tab')[1 - pi].trigger('click') // on the other army first
    await w.vm.reveal({ pi, mi: null, rule: 'War Horde' })
    await vi.waitFor(async () => { await flushPromises(); expect(head('War Horde')?.attributes('aria-expanded')).toBe('true') }, { timeout: 5000 })
    expect(w.find('.ap-fac').text()).toBe('Orks')
    // The army rule: its own fold, or "How it works" where the card holds its text.
    const armyOpen = () => w.findAll('.army-acc-head').filter((b) => !b.text().includes('War Horde')).some((b) => b.attributes('aria-expanded') === 'true')
    expect(armyOpen()).toBe(false) // only the rule asked for
    await w.vm.reveal({ pi, mi: null, rule: 'army' })
    await flushPromises()
    expect(armyOpen()).toBe(true)
  })

  // Owner, 2026-09-30: switching sides rebuilt the card, which came up without its rules and
  // jumped the page. Every army's card is built once and kept.
  it('keeps each army\'s card when switching away and back', async () => {
    start({ factionSlug: 'orks', detachments: ['War Horde'] }, { factionSlug: 'necrons' })
    const w = mountPanel()
    await vi.waitFor(async () => { await flushPromises(); expect(shown(w).findComponent({ name: 'ArmyTrackerCard' }).props('texts').length).toBe(2) }, { timeout: 5000 })
    const first = shown(w).element
    const tabs = w.findAll('.ap-tabs .page-tab')
    await tabs[1].trigger('click')
    await tabs[0].trigger('click')
    expect(shown(w).element).toBe(first) // the same card, not a new one
    expect(shown(w).findComponent({ name: 'ArmyTrackerCard' }).props('texts').length).toBe(2) // its rules at once
  })

  // Mikhail, 2026-10-26: the card is kept by its place in the game, and the roll for the first
  // turn swaps the players into each other's places — the card kept the other army's rules.
  it('follows the army when the roll for the first turn swaps the places', async () => {
    start({ factionSlug: 'orks', detachments: ['War Horde'] }, { factionSlug: 'necrons', detachments: ['Awakened Dynasty'] })
    tracker.current.value.firstTurnPending = true
    const w = mountPanel()
    const titles = () => shown(w).findComponent({ name: 'ArmyTrackerCard' }).props('texts').map((x) => x.title).join(' / ')
    await vi.waitFor(async () => { await flushPromises(); expect(titles()).toContain('War Horde') }, { timeout: 5000 })
    expect(tracker.rollFirstTurn(1)).toBe(true)
    await vi.waitFor(async () => { await flushPromises(); expect(titles()).toContain('Awakened Dynasty') }, { timeout: 5000 })
    expect(titles()).not.toContain('War Horde')
  })

  it('reads the rules plainly for a side that switched its tracker off', async () => {
    start({ factionSlug: 'orks', detachments: ['War Horde'] }, { factionSlug: 'necrons' }, { trackArmyYou: false })
    const w = mountPanel()
    await vi.waitFor(async () => { await flushPromises(); expect(shown(w).findAll('.ap-rule')).toHaveLength(2) }, { timeout: 5000 })
    expect(shown(w).findComponent({ name: 'ArmyTrackerCard' }).exists()).toBe(false)
  })
})

// The army rule's tracker lives here (owner, 2026-09-29), not under the missions.
describe('ArmiesPanel — the army rule tracker', () => {
  const cardsOf = async (w) => {
    const out = []
    for (const t of w.findAll('.ap-tabs .page-tab')) {
      await t.trigger('click')
      out.push(shown(w).findAllComponents({ name: 'ArmyTrackerCard' }).map((c) => ({ pi: c.props('pi'), mi: c.props('mi'), readonly: c.props('readonly') })))
    }
    return out
  }

  it('shows each side\'s tracker under its tab, and none when the side switched it off', async () => {
    start({ factionSlug: 'orks' }, { factionSlug: 'aeldari' }, { trackArmyOpp: false })
    expect(await cardsOf(mountPanel())).toEqual([[{ pi: 0, mi: null, readonly: false }], []])
  })

  it('gives a unified same-faction doubles team one shared card, a convenience team one each', async () => {
    start(
      { teamName: 'Alpha', forceType: 'unified', members: [{ name: 'Ann', factionSlug: 'drukhari' }, { name: 'Bob', factionSlug: 'drukhari' }] },
      { teamName: 'Beta', members: [{ name: 'Cat', factionSlug: 'orks' }, { name: 'Dan', factionSlug: 'aeldari' }] },
      { gameType: 'doubles' },
    )
    const cards = await cardsOf(mountPanel(['Alpha', 'Beta']))
    expect(cards[0]).toEqual([{ pi: 0, mi: null, readonly: false }])
    expect(cards[1]).toEqual([{ pi: 0, mi: null, readonly: false }])
    expect(cards[2]).toEqual([{ pi: 1, mi: 0, readonly: false }])
    expect(cards[3]).toEqual([{ pi: 1, mi: 1, readonly: false }])
  })

  it('keeps a side another phone plays readable, its controls inert', async () => {
    start({ factionSlug: 'orks' }, { factionSlug: 'aeldari' })
    tracker.current.value.party = { id: 'p', token: 't', side: 0, mi: null, host: false, seq: 1, versions: {} }
    const cards = await cardsOf(mountPanel())
    expect(cards[0][0].readonly).toBe(false)
    expect(cards[1][0].readonly).toBe(true)
  })
})


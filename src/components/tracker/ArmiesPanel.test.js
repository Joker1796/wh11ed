import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

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
// The units link of every army, picking each in turn.
async function unitLinks(w) {
  const out = []
  for (const b of w.findAll('.ap-tabs .page-tab')) {
    await b.trigger('click')
    out.push(w.find('a.proster').exists() ? w.find('a.proster').attributes('href') : null)
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
    expect(await unitLinks(mountPanel())).toEqual(['/tracker/game/roster/0', '/factions/necrons/datasheets'])
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
    expect(await unitLinks(w)).toEqual(['/factions/orks/datasheets', '/tracker/game/roster/0/1', '/factions/drukhari/datasheets', null])
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

  it('reads the rules plainly for a side that switched its tracker off', async () => {
    start({ factionSlug: 'orks', detachments: ['War Horde'] }, { factionSlug: 'necrons' }, { trackArmyYou: false })
    const w = mountPanel()
    await vi.waitFor(async () => { await flushPromises(); expect(w.findAll('.ap-rule')).toHaveLength(2) }, { timeout: 5000 })
    expect(w.findComponent({ name: 'ArmyTrackerCard' }).exists()).toBe(false)
  })
})

// The army rule's tracker lives here (owner, 2026-09-29), not under the missions.
describe('ArmiesPanel — the army rule tracker', () => {
  const cardsOf = async (w) => {
    const out = []
    for (const t of w.findAll('.ap-tabs .page-tab')) {
      await t.trigger('click')
      out.push(w.findAllComponents({ name: 'ArmyTrackerCard' }).map((c) => ({ pi: c.props('pi'), mi: c.props('mi'), readonly: c.props('readonly') })))
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


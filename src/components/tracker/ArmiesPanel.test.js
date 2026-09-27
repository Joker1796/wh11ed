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
  for (const b of w.findAll('.ap-army')) {
    await b.trigger('click')
    const sub = w.findAll('.ap-subtab')[0]
    await sub.trigger('click')
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
    expect(w.findAll('.ap-army-name').map((e) => e.text())).toEqual(['Alpha · Ann', 'Alpha · Bob', 'Beta · Cat', 'Beta · Dan'])
    expect(w.find('.ap-army-fac').text()).toBe('Orks')
    expect(await unitLinks(w)).toEqual(['/factions/orks/datasheets', '/tracker/game/roster/0/1', '/factions/drukhari/datasheets', null])
  })

  it('reads the army rule and the detachment rule from the faction data', async () => {
    start({ factionSlug: 'orks', detachments: ['War Horde'] }, { factionSlug: 'necrons' })
    const w = mountPanel()
    await w.findAll('.ap-subtab')[1].trigger('click')
    // The faction file is a dynamic import: wait for it rather than for one tick.
    await vi.waitFor(async () => { await flushPromises(); expect(w.find('.ap-rule-name').exists()).toBe(true) }, { timeout: 5000 })
    const kinds = w.findAll('.ap-rule-name').map((e) => e.text())
    expect(kinds[0]).toBe('Waaagh!')
    expect(kinds.length).toBe(2)
  })
})

import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

// The Roster tab holds the roster screen itself; the screen has its own specs, so here it is a
// stand-in that records what it was asked: which army, frozen or not, which card to open.
const opened = []
vi.mock('../../views/tracker/RosterViewView.vue', () => ({
  __esModule: true, // the async loader's cue to take `default`
  default: defineComponent({
    name: 'RosterViewView',
    props: { pi: Number, mi: Number, frozen: Boolean, inTracker: Boolean },
    setup(props, { expose }) {
      expose({ openUnit: (uid) => opened.push(`${props.pi}:${uid}`) })
      return () => h('div', { class: 'rv-stub' })
    },
  }),
}))

let RosterTab, tracker, DISPOSITIONS
beforeEach(async () => {
  localStorage.clear()
  opened.length = 0
  vi.resetModules()
  const mod = await import('../../composables/useTracker.js')
  tracker = mod.useTracker()
  DISPOSITIONS = mod.DISPOSITIONS
  RosterTab = (await import('./RosterTab.vue')).default
})

const list = (faction) => ({ name: 'L', faction, detachments: [], units: [{ uid: 'u1', id: 'boyz', size: 0 }] })
function start() {
  const base = { detachments: [], secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false }
  tracker.newGame({
    settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', twist: null, twistMission: null },
    players: [
      { ...base, name: 'Me', factionSlug: 'orks', roster: list('orks'), disposition: DISPOSITIONS[0].id, role: 'attacker' },
      { ...base, name: 'Opp', factionSlug: 'necrons', roster: list('necrons'), disposition: DISPOSITIONS[1].id, role: 'defender' },
    ],
  })
}
const mountTab = (props = {}) => mount(RosterTab, { props: { names: ['Me', 'Opp'], defaultSide: 0, active: false, ...props } })
const views = (w) => w.findAllComponents({ name: 'RosterViewView' })

describe('RosterTab', () => {
  it('builds a list on its first visit and keeps it, frozen off screen', async () => {
    start()
    const w = mountTab()
    await flushPromises()
    expect(views(w)).toHaveLength(0) // nothing built before the tab is opened
    await w.setProps({ active: true })
    await flushPromises()
    expect(views(w).map((v) => [v.props('pi'), v.props('frozen')])).toEqual([[0, false]])
    await w.findAll('.page-tab')[1].trigger('click')
    await flushPromises()
    expect(views(w).map((v) => [v.props('pi'), v.props('frozen')])).toEqual([[0, true], [1, false]])
    await w.setProps({ active: false })
    expect(views(w).map((v) => v.props('frozen'))).toEqual([true, true]) // kept, both frozen
  })

  // The other armies' lists are built right after, while idle — a list built on its own first
  // visit came up empty for a moment and jumped the page by its height.
  it('builds the other lists while idle after the first visit, frozen', async () => {
    start()
    const w = mountTab({ active: true })
    await flushPromises()
    await vi.waitFor(async () => { await flushPromises(); expect(views(w)).toHaveLength(2) }, { timeout: 2000 })
    expect(views(w).map((v) => [v.props('pi'), v.props('frozen')])).toEqual([[0, false], [1, true]])
  })

  it('opens a unit\'s card from another tab, building that list if it was not', async () => {
    start()
    const w = mountTab()
    await w.vm.openUnit({ pi: 1, mi: null, uid: 'u1' })
    await vi.waitFor(async () => { await flushPromises(); expect(opened).toEqual(['1:u1']) })
    expect(views(w)).toHaveLength(1)
  })
})

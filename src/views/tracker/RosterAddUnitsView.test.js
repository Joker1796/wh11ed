import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// Same router mock shape as RosterEditorView.test.js — this view reads route.params.id, replaces
// to the list when the roster is gone, and pushes back to the editor for a per-entry issue.
let ROSTER_ID = ''
const replace = vi.fn()
const push = vi.fn()
vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { get id() { return ROSTER_ID } }, query: {}, path: '/roster/x/add' }),
  useRouter: () => ({ push, replace }),
  RouterLink: { name: 'RouterLink', props: ['to'], template: '<a :href="to"><slot /></a>' },
}))

let RosterAddUnitsView, useRosters

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  replace.mockClear()
  push.mockClear()
  ;({ useRosters } = await import('../../composables/useRosters.js'))
  ;({ default: RosterAddUnitsView } = await import('./RosterAddUnitsView.vue'))
})

const stubs = { RouterLink: { props: ['to'], template: '<a :href="to"><slot /></a>' } }

async function waitFor(w, needle, tries = 60) {
  for (let i = 0; i < tries; i++) {
    await flushPromises()
    if (w.text().includes(needle)) return
    await new Promise((r) => setTimeout(r, 25))
  }
}

describe('RosterAddUnitsView', () => {
  it('redirects to the list when the roster id is unknown', async () => {
    ROSTER_ID = 'missing'
    mount(RosterAddUnitsView, { global: { stubs } })
    await flushPromises()
    expect(replace).toHaveBeenCalledWith('/roster')
  })

  it('asks for a faction before it can show a catalogue', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    ROSTER_ID = r.id
    const w = mount(RosterAddUnitsView, { global: { stubs } })
    await flushPromises()
    expect(w.find('.ra-hint').exists()).toBe(true)
  })

  it('adds a unit straight into the shared roster store', async () => {
    // Nothing is "saved" on the way out — the store is the same object the editor edits, so an
    // add here has to be visible there immediately.
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    ROSTER_ID = r.id
    const w = mount(RosterAddUnitsView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    const add = w.findAll('button').find((b) => b.attributes('aria-label')?.includes('Intercessor Squad'))
      || w.findAll('.rub-add')[0]
    await add.trigger('click')
    expect(store.rosterById(r.id).units).toHaveLength(1)
  })

  it('links back to the editor from both the header and the footer', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    ROSTER_ID = r.id
    const w = mount(RosterAddUnitsView, { global: { stubs } })
    await flushPromises()
    const hrefs = w.findAll('a').map((a) => a.attributes('href'))
    expect(hrefs.filter((h) => h === `/roster/${r.id}`).length).toBeGreaterThanOrEqual(2)
  })
})

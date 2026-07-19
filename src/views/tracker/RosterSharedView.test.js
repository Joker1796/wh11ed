import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { encodeRoster } from '../../composables/rosterShare.js'

let HASH = ''
const replace = vi.fn()
vi.mock('vue-router', () => ({
  useRoute: () => ({ get hash() { return HASH } }),
  useRouter: () => ({ replace, push: vi.fn() }),
  RouterLink: { props: ['to'], template: '<a><slot /></a>' },
}))

let RosterSharedView, useRosters

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  replace.mockClear()
  ;({ useRosters } = await import('../../composables/useRosters.js'))
  ;({ default: RosterSharedView } = await import('./RosterSharedView.vue'))
})

const stubs = { RouterLink: { props: ['to'], template: '<a><slot /></a>' } }
async function waitFor(w, needle, tries = 60) {
  for (let i = 0; i < tries; i++) {
    await flushPromises()
    if (w.text().includes(needle)) return
    await new Promise((r) => setTimeout(r, 25))
  }
}

describe('RosterSharedView', () => {
  it('shows an error for a malformed payload', async () => {
    HASH = '#r=garbage'
    const { ui } = await import('../../i18n/ui.js')
    const w = mount(RosterSharedView, { global: { stubs } })
    await flushPromises()
    expect(w.text()).toContain(ui.en.rosterSharedInvalid)
  })

  it('decodes a shared roster, previews it, and saves a copy', async () => {
    const shared = {
      id: 'orig', name: 'Shared Alpha', faction: 'space-marines', detachments: [], battleSize: 'strike-force',
      units: [{ uid: 'u1', id: 'intercessor-squad', size: 0 }],
    }
    HASH = `#r=${await encodeRoster(shared)}`
    const w = mount(RosterSharedView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad') // preview built from real faction data

    expect(w.text()).toContain('Shared Alpha')
    await w.find('.rs-save').trigger('click')

    const store = useRosters()
    expect(store.rosters.value).toHaveLength(1)
    expect(store.rosters.value[0].name).toBe('Shared Alpha')
    expect(store.rosters.value[0].id).not.toBe('orig') // imported with a fresh id
    expect(replace).toHaveBeenCalled()
  })
})

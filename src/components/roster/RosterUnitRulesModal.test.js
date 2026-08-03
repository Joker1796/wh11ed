import { afterEach, beforeEach, describe, it, expect } from 'vitest'
import { mount, flushPromises, DOMWrapper } from '@vue/test-utils'
import RosterUnitRulesModal from './RosterUnitRulesModal.vue'

// BaseModal renders via <Teleport to="body">, so its content lands outside the mounted
// wrapper's own (detached) root — assert against `body` instead of `w`. Clear it between
// tests since nothing else unmounts the teleported nodes for us in jsdom.
const body = () => new DOMWrapper(document.body)
afterEach(() => { document.body.innerHTML = '' })

// Datasheet data is loaded via a dynamic import kicked off from an immediate watch — poll
// (with real timers) until it lands, same as RosterEditorView.test.js.
async function waitFor(needle, tries = 60) {
  for (let i = 0; i < tries; i++) {
    await flushPromises()
    if (body().text().includes(needle)) return
    await new Promise((r) => setTimeout(r, 25))
  }
}

beforeEach(() => {
  localStorage.clear()
})

describe('RosterUnitRulesModal', () => {
  it('loads the base datasheet and renders it as a rules card', async () => {
    mount(RosterUnitRulesModal, {
      props: { unitId: 'intercessor-squad', factionSlug: 'space-marines' },
    })
    await waitFor('Intercessor Squad')
    expect(body().text()).toContain('Intercessor Squad')
  })

  it('emits close from the modal header', async () => {
    const w = mount(RosterUnitRulesModal, {
      props: { unitId: 'intercessor-squad', factionSlug: 'space-marines' },
    })
    await waitFor('Intercessor Squad')
    await body().find('.mh-close').trigger('click')
    expect(w.emitted('close')).toBeTruthy()
  })

  it('renders the RU overlay when the locale is Russian', async () => {
    const { useLocale } = await import('../../composables/useLocale.js')
    const { locale } = useLocale()
    const prev = locale.value
    locale.value = 'ru'
    try {
      mount(RosterUnitRulesModal, {
        props: { unitId: 'intercessor-squad', factionSlug: 'space-marines' },
      })
      await waitFor('Intercessor Squad')
      // The RU overlay swaps in translated ability/wargear names but keeps the unit's own
      // (untranslated) name — just check it still renders without crashing on the RU path.
      expect(body().text()).toContain('Intercessor Squad')
    } finally {
      locale.value = prev
    }
  })
})

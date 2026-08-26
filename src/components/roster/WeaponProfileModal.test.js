import { afterEach, describe, it, expect } from 'vitest'
import { mount, flushPromises, DOMWrapper } from '@vue/test-utils'
import WeaponProfileModal from './WeaponProfileModal.vue'

// BaseModal teleports to <body>, so assert against the document, not the wrapper — same as
// RosterUnitRulesModal.test.js.
const body = () => new DOMWrapper(document.body)
afterEach(() => { document.body.innerHTML = '' })

async function waitFor(needle, tries = 60) {
  for (let i = 0; i < tries; i++) {
    await flushPromises()
    if (body().text().includes(needle)) return
    await new Promise((r) => setTimeout(r, 25))
  }
}

// Real data: Kabalite Icon is a wargear item with no stat line at all — its whole content is a
// `wargearAbilities` entry, which is the case that used to show English prose in the RU locale.
const props = { unitId: 'hand-of-the-archon', factionSlug: 'drukhari', names: ['Kabalite Icon'] }

describe('WeaponProfileModal', () => {
  it('shows a wargear-granted ability that has no weapon profile', async () => {
    mount(WeaponProfileModal, { props })
    await waitFor('Objective Control')
    expect(body().text()).toContain('While the bearer’s unit is not Battle-shocked')
  })

  it('shows that ability in Russian, keeping the item name English', async () => {
    const { useLocale } = await import('../../composables/useLocale.js')
    const { locale } = useLocale()
    const prev = locale.value
    locale.value = 'ru'
    try {
      mount(WeaponProfileModal, { props })
      await waitFor('боевом шоке')
      const text = body().text()
      expect(text).toContain('прибавьте 1 к характеристике Контроля целей')
      expect(text).not.toContain('While the bearer’s unit')
      // The name is the wargear item — English, the same string as the modal's title.
      expect(text).toContain('Kabalite Icon')
      expect(text).not.toContain('Икона кабала')
    } finally {
      locale.value = prev
    }
  })
})

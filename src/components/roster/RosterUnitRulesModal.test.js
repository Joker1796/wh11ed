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

  it('trims the weapon tables to the entry\'s own loadout when given a roster context', async () => {
    // Real data on purpose: an Intercessor Squad prints 12 weapon rows, but a squad that took
    // none of its optional swaps fields only its three default ones.
    const [rf, it] = await Promise.all([
      import('../../data/roster/space-marines.js'),
      import('../../data/roster/items.js'),
    ])
    const def = rf.default.units.find((u) => u.id === 'intercessor-squad')
    mount(RosterUnitRulesModal, {
      props: {
        unitId: 'intercessor-squad',
        factionSlug: 'space-marines',
        ctx: { def, entry: { uid: 'a', id: 'intercessor-squad', size: 0 }, items: it.default.items },
      },
    })
    await waitFor('Intercessor Squad')
    const text = body().text()
    expect(text).toContain('Bolt rifle')
    expect(text).toContain('Close combat weapon')
    expect(text).not.toContain('Thunder hammer')
    expect(text).not.toContain('Plasma pistol')
  })

  it('shows a weapon the entry actually picked', async () => {
    const [rf, it] = await Promise.all([
      import('../../data/roster/space-marines.js'),
      import('../../data/roster/items.js'),
    ])
    const def = rf.default.units.find((u) => u.id === 'intercessor-squad')
    // Group 1 is the Sergeant's close-combat-weapon swap; option 1 is the power fist.
    mount(RosterUnitRulesModal, {
      props: {
        unitId: 'intercessor-squad',
        factionSlug: 'space-marines',
        ctx: { def, entry: { uid: 'a', id: 'intercessor-squad', size: 0, wg: [[1, 1, 1]] }, items: it.default.items },
      },
    })
    await waitFor('Intercessor Squad')
    expect(body().text()).toContain('Power fist')
  })

  it('renders the printed sheet untouched without a context', async () => {
    mount(RosterUnitRulesModal, {
      props: { unitId: 'intercessor-squad', factionSlug: 'space-marines' },
    })
    await waitFor('Intercessor Squad')
    expect(body().text()).toContain('Thunder hammer') // every option still on the card
  })

  it('shows the roster context strip and a detachment-granted keyword', async () => {
    const [rf, it] = await Promise.all([
      import('../../data/roster/aeldari.js'),
      import('../../data/roster/items.js'),
    ])
    const def = rf.default.units.find((u) => u.id === 'troupe')
    const det = rf.default.detachments.find((d) => d.name === 'Ghosts of the Webway')
    mount(RosterUnitRulesModal, {
      props: {
        unitId: 'troupe',
        factionSlug: 'aeldari',
        ctx: {
          def,
          entry: { uid: 'a', id: 'troupe', size: 0, warlord: true },
          items: it.default.items,
          detachments: [det],
        },
      },
    })
    await waitFor('Troupe')
    const text = body().text()
    expect(text).toContain('Warlord')
    expect(text).toContain('Battleline') // granted by Ghosts of the Webway, not printed on the sheet
  })

  it('shows no context strip for a plain entry', async () => {
    const [rf, it] = await Promise.all([
      import('../../data/roster/space-marines.js'),
      import('../../data/roster/items.js'),
    ])
    const def = rf.default.units.find((u) => u.id === 'intercessor-squad')
    const w = mount(RosterUnitRulesModal, {
      props: {
        unitId: 'intercessor-squad',
        factionSlug: 'space-marines',
        ctx: { def, entry: { uid: 'a', id: 'intercessor-squad', size: 0 }, items: it.default.items },
      },
    })
    await waitFor('Intercessor Squad')
    expect(body().find('.rum-ctx').exists()).toBe(false)
    w.unmount()
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

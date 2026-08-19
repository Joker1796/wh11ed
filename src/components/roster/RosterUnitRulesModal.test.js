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

  it('shows the detachment rule, the army rule and an attached Leader\'s abilities', async () => {
    const [rf, it] = await Promise.all([
      import('../../data/roster/orks.js'),
      import('../../data/roster/items.js'),
    ])
    const def = rf.default.units.find((u) => u.id === 'boyz')
    const det = rf.default.detachments.find((d) => d.name === 'War Horde')
    mount(RosterUnitRulesModal, {
      props: {
        unitId: 'boyz',
        factionSlug: 'orks',
        ctx: {
          def,
          entry: { uid: 'a', id: 'boyz', size: 0 },
          items: it.default.items,
          detachments: [det],
          // A Bannernob attached to this unit — its abilities are what the reader is missing.
          units: [{ uid: 'a', id: 'boyz' }, { uid: 'b', id: 'bannernob', leaderOf: 'a' }],
        },
      },
    })
    await waitFor('Get Stuck In!') // the faction rules bundle is a separate async load
    const text = body().text()
    expect(text).toContain('Get Stuck In!') // War Horde's detachment rule
    expect(text).toContain('Bannernob') // the attached Leader, by name
    expect(text).toContain('Waaagh! Banner') // …and its own ability
    // The army rule is NOT one of these blocks — it lives on the card's own Faction line.
    expect(document.querySelector('.rum-rules').textContent).not.toContain('Army Rule')
  })

  it('opens the army rule from the card\'s own Faction line, like a core ability', async () => {
    const { useKeywordPopover } = await import('../../composables/useKeywordPopover.js')
    const { activeKeyword, visible, close } = useKeywordPopover()
    close()
    const [rf, it] = await Promise.all([
      import('../../data/roster/orks.js'),
      import('../../data/roster/items.js'),
    ])
    const def = rf.default.units.find((u) => u.id === 'boyz')
    const w = mount(RosterUnitRulesModal, {
      props: {
        unitId: 'boyz',
        factionSlug: 'orks',
        ctx: { def, entry: { uid: 'a', id: 'boyz', size: 0 }, items: it.default.items, detachments: [] },
      },
    })
    await waitFor('Boyz')
    // Wait for the faction bundle, which is what makes the line clickable at all.
    for (let i = 0; i < 60 && !document.querySelector('.ds-ability-line .keyword'); i++) {
      await flushPromises()
      await new Promise((r) => setTimeout(r, 25))
    }
    const link = [...document.querySelectorAll('.ds-ability-line .keyword')].find((e) => e.textContent === 'Waaagh!')
    expect(link).toBeTruthy()
    await link.click()
    await flushPromises()
    expect(visible.value).toBe(true)
    expect(activeKeyword.value.name).toBe('Waaagh!')
    expect(activeKeyword.value.fullText).toContain('call a Waaagh!')
    close()
    w.unmount()
  })

  it('shows no rule blocks without a roster context', async () => {
    const w = mount(RosterUnitRulesModal, {
      props: { unitId: 'boyz', factionSlug: 'orks' },
    })
    await waitFor('Boyz')
    expect(body().find('.rum-rules').exists()).toBe(false)
    w.unmount()
  })

  it('hides the build-choice blocks for a unit already in a roster', async () => {
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
    const groups = [...document.body.querySelectorAll('.ds-group-title')].map((e) => e.textContent.trim())
    expect(groups).not.toContain('Unit Composition')
    expect(groups).not.toContain('Wargear Options')
    expect(groups).toContain('Abilities') // the rules themselves are untouched
    w.unmount()
  })

  it('keeps the build-choice blocks on a plain preview', async () => {
    const w = mount(RosterUnitRulesModal, {
      props: { unitId: 'intercessor-squad', factionSlug: 'space-marines' },
    })
    await waitFor('Intercessor Squad')
    const groups = [...document.body.querySelectorAll('.ds-group-title')].map((e) => e.textContent.trim())
    expect(groups).toContain('Unit Composition')
    expect(groups).toContain('Wargear Options')
    w.unmount()
  })

  it('shows a detachment rule only to the units it names', async () => {
    const rf = await import('../../data/roster/orks.js')
    const it = await import('../../data/roster/items.js')
    // "Adrenaline Junkies": Speed Freeks units from your army — a Warbike is one, Boyz are not.
    const det = rf.default.detachments.find((d) => d.name === 'Kult of Speed')
    const mountFor = (id) => mount(RosterUnitRulesModal, {
      props: {
        unitId: id,
        factionSlug: 'orks',
        ctx: {
          def: rf.default.units.find((u) => u.id === id),
          entry: { uid: 'a', id, size: 0 },
          items: it.default.items,
          detachments: [det],
        },
      },
    })
    const w1 = mountFor('warbikers')
    await waitFor('Adrenaline Junkies')
    expect(body().text()).toContain('Adrenaline Junkies')
    w1.unmount()
    document.body.innerHTML = ''

    const w2 = mountFor('boyz')
    await waitFor('Waaagh!')
    expect(body().text()).not.toContain('Adrenaline Junkies')
    w2.unmount()
  })

  it('places the rule blocks inside the card, above its Keywords line', async () => {
    const [rf, it] = await Promise.all([
      import('../../data/roster/orks.js'),
      import('../../data/roster/items.js'),
    ])
    const def = rf.default.units.find((u) => u.id === 'boyz')
    const det = rf.default.detachments.find((d) => d.name === 'War Horde')
    const w = mount(RosterUnitRulesModal, {
      props: {
        unitId: 'boyz',
        factionSlug: 'orks',
        ctx: { def, entry: { uid: 'a', id: 'boyz', size: 0 }, items: it.default.items, detachments: [det] },
      },
    })
    await waitFor('Get Stuck In!')
    const order = [...document.body.querySelectorAll('.rum-rules, .ds-keywords')]
      .map((e) => e.className.split(' ')[0])
    expect(order).toEqual(['rum-rules', 'ds-keywords'])
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

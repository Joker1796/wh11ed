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

  // The footnote under the stats names the rule that rewrote a number; the name itself opens that
  // rule, so the reader is not sent hunting for it in another block of the same card.
  it('opens the rule behind a modifier note from the note itself', async () => {
    const { useKeywordPopover } = await import('../../composables/useKeywordPopover.js')
    const { activeKeyword, visible, close } = useKeywordPopover()
    close()
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
    await waitFor('Get Stuck In')
    for (let i = 0; i < 60 && !document.querySelector('.ds-mod-srcbtn'); i++) {
      await flushPromises()
      await new Promise((r) => setTimeout(r, 25))
    }
    // Both kinds of note resolve: the army rule (Waaagh!) and the detachment's own (Get Stuck In).
    const buttons = [...document.querySelectorAll('.ds-mod-srcbtn')]
    expect(buttons.length).toBeGreaterThan(1)
    const detNote = buttons.find((b) => b.textContent.includes('Get Stuck In'))
    expect(detNote).toBeTruthy()
    await detNote.click()
    await flushPromises()
    expect(visible.value).toBe(true)
    expect(activeKeyword.value.name).toContain('Get Stuck In')
    expect(activeKeyword.value.fullText).toBeTruthy()
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

  // Tier C end to end, on the one record reviewed so far: Necrons' Cold Fervour, whose first
  // bullet is an unconditional +2 S for DESTROYER CULT and whose second is the same bonus for
  // every other NECRONS model but only after a kill.
  describe('numeric modifiers', () => {
    const mount40k = async (unitId) => {
      const [rf, it] = await Promise.all([
        import('../../data/roster/necrons.js'),
        import('../../data/roster/items.js'),
      ])
      const det = rf.default.detachments.find((d) => d.name === 'Cursed Legion')
      return mount(RosterUnitRulesModal, {
        props: {
          unitId,
          factionSlug: 'necrons',
          ctx: {
            def: rf.default.units.find((u) => u.id === unitId),
            entry: { uid: 'a', id: unitId, size: 0 },
            items: it.default.items,
            detachments: [det],
          },
        },
      })
    }
    const settle = async () => {
      for (let i = 0; i < 80; i++) {
        await flushPromises()
        if (document.querySelector('.ds-mods')) return
        await new Promise((r) => setTimeout(r, 25))
      }
    }

    it('rewrites the number for the unconditional half and marks it', async () => {
      const w = await mount40k('skorpekh-destroyers')
      await settle()
      // Skorpekh hyperphase weapons print S7; Cold Fervour's first bullet names DESTROYER CULT.
      const sCell = [...document.querySelectorAll('.ds-weapons tbody td[data-label="S"]')][0]
      expect(sCell.textContent).toContain('9')
      expect(sCell.classList.contains('ds-stat-mod')).toBe(true)
      expect(document.querySelector('.ds-mods').textContent).toContain('Cold Fervour')
      w.unmount()
    })

    it('leaves the number alone for the conditional half and says why', async () => {
      const w = await mount40k('necron-warriors')
      await settle()
      const sCell = [...document.querySelectorAll('.ds-weapons tbody td[data-label="S"]')][0]
      expect(sCell.textContent.trim()).toBe('4') // printed value, untouched
      expect(sCell.classList.contains('ds-stat-mod')).toBe(false)
      const notes = document.querySelector('.ds-mods')
      expect(notes.textContent).toContain('Cold Fervour')
      expect(notes.textContent).toContain('destroys a unit') // the condition, in English
      w.unmount()
    })
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

  // A state is flipped where the thing it changes is READ. Desolation Squad's Targeter Optics
  // grants [IGNORES COVER] after Remaining Stationary, so that switch belongs on that ability —
  // not in a strip at the top of the card that says nothing about which rule it feeds.
  it('offers an ability\'s own switch at the ability', async () => {
    const rf = await import('../../data/roster/space-marines.js')
    const def = rf.default.units.find((u) => u.id === 'desolation-squad')
    const w = mount(RosterUnitRulesModal, {
      props: {
        unitId: 'desolation-squad',
        factionSlug: 'space-marines',
        ctx: { def, entry: { uid: 'a', id: 'desolation-squad' }, units: [] },
        gameCtx: {
          active: new Set(),
          switches: [{ id: 'unit-stationary', label: { en: 'Remained Stationary', ru: 'Остался на месте' }, on: false, auto: false, scope: 'unit' }],
          armySwitches: [],
        },
      },
    })
    await waitFor('Targeter Optics')
    for (let i = 0; i < 60 && !document.querySelector('.ds-ab-conds'); i++) {
      await flushPromises()
      await new Promise((r) => setTimeout(r, 25))
    }
    const chips = body().findAll('.ds-ab-conds .cond-chip')
    expect(chips).toHaveLength(1)
    await chips[0].trigger('click')
    expect(w.emitted('toggle-cond')[0][0].id).toBe('unit-stationary')
  })

  it('has no switch strip of its own any more', async () => {
    mount(RosterUnitRulesModal, {
      props: {
        unitId: 'intercessor-squad',
        factionSlug: 'space-marines',
        gameCtx: {
          active: new Set(),
          switches: [{ id: 'unit-charged', label: { en: 'Made a Charge move', ru: 'Совершил Charge' }, on: false, auto: false }],
        },
      },
    })
    await waitFor('Intercessor Squad')
    expect(body().find('.cond-chip').exists()).toBe(false)
  })

  // An ability that opens "While this model is leading a unit" is answered by the LIST, so the card
  // says which way, instead of leaving the reader to remember that a Character standing alone has
  // half its abilities switched off. Adrax Agatone's "Unto the Anvil" is one of ~110 like it.
  it('marks a leading-gated ability from the attachment the roster records', async () => {
    const rf = await import('../../data/roster/space-marines.js')
    const def = rf.default.units.find((u) => u.id === 'adrax-agatone')
    const ctx = {
      def,
      entry: { uid: 'a', id: 'adrax-agatone', leaderOf: 'b' },
      units: [{ uid: 'b', id: 'intercessor-squad' }],
      leaderTargets: [{ uid: 'b', name: 'Intercessor Squad' }],
    }
    mount(RosterUnitRulesModal, { props: { unitId: 'adrax-agatone', factionSlug: 'space-marines', ctx } })
    await waitFor('Unto the Anvil')
    const state = body().findAll('.ds-ab-state').map((e) => e.text())
    expect(state.some((t) => t.includes('leading Intercessor Squad'))).toBe(true)
    expect(body().find('.ds-ab-state').classes()).toContain('on')
  })

  it('says so when the same ability has nothing to lead', async () => {
    const rf = await import('../../data/roster/space-marines.js')
    const def = rf.default.units.find((u) => u.id === 'adrax-agatone')
    mount(RosterUnitRulesModal, {
      props: {
        unitId: 'adrax-agatone',
        factionSlug: 'space-marines',
        ctx: { def, entry: { uid: 'a', id: 'adrax-agatone' }, units: [] },
      },
    })
    await waitFor('Unto the Anvil')
    const chip = body().find('.ds-ab-state')
    expect(chip.text()).toContain('not attached')
    expect(chip.classes()).not.toContain('on')
    expect(body().find('.ds-ability-idle').exists()).toBe(true)
  })

  // A datasheet being READ has no roster around it, so there is no attachment to report and the
  // card must look exactly as it always did.
  it('marks nothing without roster context', async () => {
    mount(RosterUnitRulesModal, { props: { unitId: 'adrax-agatone', factionSlug: 'space-marines' } })
    await waitFor('Unto the Anvil')
    expect(body().find('.ds-ab-state').exists()).toBe(false)
  })

  // A state that decides what a rule does belongs where the rule is READ. Librarius Conclave's
  // Psychic Disciplines is chosen army-wide, but the place a player meets it is the detachment
  // rule on a psyker's card — so its switches are offered there, writing to the same store.
  it('offers a rule\'s own switches inside the rule, army-wide ones included', async () => {
    const rf = await import('../../data/roster/space-marines.js')
    const def = rf.default.units.find((u) => u.id === 'librarian')
    const det = rf.default.detachments.find((d) => d.name === 'Librarius Conclave')
    const armySwitches = [
      { id: 'discipline-biomancy', label: { en: 'Biomancy Discipline', ru: 'Biomancy' }, on: false, auto: false, scope: 'army', group: 'psychic-discipline', groupLimit: 1 },
      { id: 'discipline-pyromancy', label: { en: 'Pyromancy Discipline', ru: 'Pyromancy' }, on: false, auto: false, scope: 'army', group: 'psychic-discipline', groupLimit: 1 },
    ]
    const w = mount(RosterUnitRulesModal, {
      props: {
        unitId: 'librarian',
        factionSlug: 'space-marines',
        ctx: { def, entry: { uid: 'a', id: 'librarian' }, detachments: [det] },
        gameCtx: { active: new Set(), switches: [], armySwitches },
      },
    })
    await waitFor('Psychic Disciplines')
    const chips = body().findAll('.rum-rule-conds .cond-chip')
    expect(chips).toHaveLength(2)
    await chips[0].trigger('click')
    expect(w.emitted('toggle-cond')[0][0].id).toBe('discipline-biomancy')
  })

  it('shows no switch row at all outside a game', async () => {
    mount(RosterUnitRulesModal, {
      props: { unitId: 'intercessor-squad', factionSlug: 'space-marines' },
    })
    await waitFor('Intercessor Squad')
    expect(body().find('.cond-chip').exists()).toBe(false)
  })
})

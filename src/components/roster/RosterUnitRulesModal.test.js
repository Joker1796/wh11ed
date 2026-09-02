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
    await waitFor('Get Stuck In') // the faction rules bundle is a separate async load
    const text = body().text()
    expect(text).toContain('Get Stuck In') // War Horde's detachment rule
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
    expect(activeKeyword.value.fullText).toContain('riled up')
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

  // A Daemon Prince MUST choose a Daemonic Allegiance, and the mark it chose used to arrive in
  // this card's granted-keyword list as a bare string where every other grant is an object — so
  // the card's own dedupe took `.kw` off a string, threw, and the modal rendered nothing at all.
  // No statline, no abilities, no card: exactly what a reader sees for a unit they cannot open.
  it('opens a unit that has chosen a mark, and shows the mark as a granted keyword', async () => {
    const [rf, it] = await Promise.all([
      import('../../data/roster/chaos-space-marines.js'),
      import('../../data/roster/items.js'),
    ])
    const id = 'heretic-astartes-daemon-prince-with-wings'
    const def = rf.default.units.find((u) => u.id === id)
    const entry = { uid: 'a', id, size: 0, alleg: 'Khorne' }
    const w = mount(RosterUnitRulesModal, {
      props: { unitId: id, factionSlug: 'chaos-space-marines', ctx: { def, entry, items: it.default.items, detachments: [], units: [entry] } },
    })
    await waitFor('Flying Horror')
    const text = body().text()
    expect(text).toContain('M12"') // the statline is on the card
    expect(text).toContain('Daemonic Destruction') // …and so are its abilities
    expect(text).toContain('Khorne') // the mark, claimed as a keyword the entry gained
    expect(text).toContain('Daemonic Allegiance') // …attributed to the choice, not to the faction
    w.unmount()
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

  // A stratagem's name stays English on the chip (project convention) — the translation rides
  // under it, keyed by the English name off the faction's RU module, the same map the faction page
  // uses. Nothing else in this modal holds that map, which is why the chips are built here.
  // In a phase where two of nine can be spent, seven greyed chips are what you read past to find
  // them — so what cannot be used folds away. One tap brings it back, because "where did my
  // stratagem go" is a worse question than "why is this one grey".
  describe('the stratagems that cannot be spent right now', () => {
    const strat = (id, blocked = null) => ({
      id, label: { en: id, ru: id }, on: false, auto: !!blocked,
      blocked: !!blocked, blockedBy: blocked,
    })
    const open = async (strats) => {
      const w = mount(RosterUnitRulesModal, {
        props: {
          unitId: 'necron-warriors',
          factionSlug: 'necrons',
          gameCtx: { active: new Set(), strats },
        },
      })
      await waitFor('Necron Warriors')
      return w
    }

    // CollapseTransition keeps its slot mounted and clips it, so the two lists are told apart by
    // which ConditionChips they are in, and the fold's state by aria-expanded.
    const openChips = () => body().findAll('.cond-chips:not(.rum-strats-blocked) .cond-chip').map((c) => c.text())
    const foldedChips = () => body().findAll('.rum-strats-blocked .cond-chip').map((c) => c.text())

    it('folds them away, keeping the count and the ones that can', async () => {
      const w = await open([strat('Ready'), strat('Wrong Phase', 'wrongPhase'), strat('Spent', 'usedPhase')])
      expect(openChips().some((t) => t.includes('Ready'))).toBe(true)
      expect(openChips().some((t) => t.includes('Wrong Phase'))).toBe(false)
      expect(foldedChips()).toHaveLength(2)

      const more = body().find('.rum-strats-more')
      expect(more.text()).toContain('2')
      expect(more.attributes('aria-expanded')).toBe('false')
      await more.trigger('click')
      expect(body().find('.rum-strats-more').attributes('aria-expanded')).toBe('true')
      w.unmount()
    })

    // The fold can never swallow one that is actually running: stratagemsFor only asks whether a
    // stratagem is blocked once it is OFF, so `on` and `blocked` are never both true.
    it('never hides one that is in force', async () => {
      const w = await open([{ ...strat('Running'), on: true }, strat('Wrong Phase', 'wrongPhase')])
      expect(openChips().some((t) => t.includes('Running'))).toBe(true)
      w.unmount()
    })

    it('says so when the whole block is folded away', async () => {
      const w = await open([strat('Wrong Phase', 'wrongPhase')])
      expect(body().find('.rum-strats-empty').exists()).toBe(true)
      w.unmount()
    })
  })

  it('writes the RU stratagem name under the English one', async () => {
    const { useLocale } = await import('../../composables/useLocale.js')
    const { locale } = useLocale()
    const prev = locale.value
    locale.value = 'ru'
    try {
      const w = mount(RosterUnitRulesModal, {
        props: {
          unitId: 'necron-warriors',
          factionSlug: 'necrons',
          ctx: { entry: { uid: 'a', id: 'necron-warriors' }, units: [] },
          gameCtx: {
            active: new Set(),
            strats: [{ id: 's1', label: { en: 'Methodical Murder', ru: 'Methodical Murder' }, on: false, auto: false }],
          },
        },
      })
      await waitFor('Методичное убийство')
      const chip = body().find('.rum-strats .cond-chip')
      expect(chip.text()).toContain('Methodical Murder')
      expect(chip.find('.cond-chip-sub').text()).toBe('Методичное убийство')
      w.unmount()
    } finally {
      locale.value = prev
    }
  })

  // The chip names a stratagem; the card that says what it does is on another tab. The "i" carries
  // it — laid out as bold-labelled lines, because the popover's renderer knows nothing of
  // StratCard's info-cards — and the RU name rides in the header the way it rides under the chip.
  it('opens the stratagem card itself from the chip', async () => {
    const { useLocale } = await import('../../composables/useLocale.js')
    const { useKeywordPopover } = await import('../../composables/useKeywordPopover.js')
    const { locale } = useLocale()
    const { activeKeyword, close } = useKeywordPopover()
    const prev = locale.value
    locale.value = 'ru'
    try {
      const w = mount(RosterUnitRulesModal, {
        props: {
          unitId: 'necron-warriors',
          factionSlug: 'necrons',
          ctx: { entry: { uid: 'a', id: 'necron-warriors' }, units: [] },
          gameCtx: {
            active: new Set(),
            strats: [{ id: 's1', label: { en: 'Methodical Murder', ru: 'Methodical Murder' }, det: 'Cursed Legion', on: false, auto: false }],
          },
        },
      })
      await waitFor('Методичное убийство')
      await body().find('.rum-strats .cond-info').trigger('click')
      expect(activeKeyword.value.name).toBe('Methodical Murder')
      expect(activeKeyword.value.sub).toBe('Методичное убийство')
      expect(activeKeyword.value.fullText).toContain('1CP')
      expect(activeKeyword.value.fullText).toContain('**КОГДА:**')      // the localised labels…
      expect(activeKeyword.value.fullText).toContain('Ваша фаза стрельбы') // …and the localised prose
      expect(activeKeyword.value.fullText).not.toContain('ОГРАНИЧЕНИЯ') // this one has none
      close()
      w.unmount()
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

  // Wazdakka's engine is an ability SET: "select one of the abilities in this section". When a
  // picked option still waits on something the game can answer, that condition belongs beside the
  // pick rather than inside the accordion the ability is read in, and never in both places.
  //
  // Codex: Orks took the live example away: Pulse Jet used to add +6" M once the unit had
  // Advanced, and now grants a pulse jet move that REPLACES the move outright, so it changes no
  // printed number and carries no effects. Nothing in the dataset now has a set option whose
  // condition the game can answer — all three that exist resolve per roll — so what is left to
  // pin is the other half of the rule: the accordion must not grow a chip of its own either way.
  it('keeps a picked set option\'s conditions out of the ability accordion', async () => {
    const mods = (await import('../../data/rosterModifiers/orks.js')).default
    const pulse = mods.entries.find((e) => e.name === 'Wazdakka Gutsmek: Pulse Jet')
    const rf = await import('../../data/roster/orks.js')
    const def = rf.default.units.find((u) => u.id === 'wazdakka-gutsmek')
    const open = (chosen) => mount(RosterUnitRulesModal, {
      props: {
        unitId: 'wazdakka-gutsmek',
        factionSlug: 'orks',
        ctx: { def, entry: { uid: 'a', id: 'wazdakka-gutsmek' }, units: [] },
        gameCtx: {
          active: new Set(),
          chosen,
          picks: [{
            id: pulse.sid, label: { en: 'Pulse Jet', ru: 'Pulse Jet' }, on: chosen.has(pulse.sid),
            auto: false, pick: true, group: 'set:Full Throttle', groupLimit: 1,
            from: { set: 'Full Throttle' },
          }],
          switches: [{ id: 'unit-advanced', label: { en: 'Advanced', ru: 'Совершил Advance' }, on: false, auto: false, scope: 'unit' }],
          armySwitches: [],
        },
      },
    })
    const settle = async () => {
      await waitFor('Pulse Jet')
      for (let i = 0; i < 60 && !document.querySelector('.ds-ability'); i++) {
        await flushPromises()
        await new Promise((r) => setTimeout(r, 25))
      }
    }

    // Nothing picked: the set's own chips are all there is to say.
    const idle = open(new Set())
    await settle()
    expect(body().find('.rum-pick-conds').exists()).toBe(false)
    expect(body().find('.ds-ab-conds').exists()).toBe(false)
    idle.unmount()
    document.body.innerHTML = ''

    // Picked: this option has no answerable condition left to lift, so there is no chip under the
    // pick — and, either way, none inside the accordion.
    const up = open(new Set([pulse.sid]))
    await settle()
    expect(pulse.effects).toEqual([])
    expect(body().findAll('.rum-pick-conds .cond-chip')).toHaveLength(0)
    expect(body().find('.ds-ab-conds').exists()).toBe(false)
    up.unmount()
  })

  // A chip on the card names a rule printed somewhere the reader is not looking (an ability set's
  // option, an aura from another model), so its "i" has to open that rule.
  it('opens a chip\'s own rule from the card', async () => {
    const w = mount(RosterUnitRulesModal, {
      props: {
        unitId: 'intercessor-squad',
        factionSlug: 'space-marines',
        gameCtx: {
          active: new Set(),
          picks: [{
            id: 'fiery', label: { en: 'The Fiery Heart (Aura)', ru: 'Огненное сердце (Аура)' },
            on: false, auto: false, pick: true, group: 'set:Relics of the Matriarchs', groupLimit: 2,
            from: { owner: 'Triumph of Saint Katherine', set: 'Relics of the Matriarchs' },
            info: { name: 'The Fiery Heart (Aura)', text: 'While a friendly unit is within 6"…' },
          }],
        },
      },
    })
    await waitFor('Intercessor Squad')
    const { useKeywordPopover } = await import('../../composables/useKeywordPopover.js')
    const { visible, activeKeyword, close } = useKeywordPopover()
    close()
    await body().find('.cond-info').trigger('click')
    expect(visible.value).toBe(true)
    expect(activeKeyword.value.name).toBe('The Fiery Heart (Aura)')
    close()
    w.unmount()
  })

  // A core ability handed over by a rule belongs on the Core line with the printed ones — the
  // Triumph's own Icon of the Valorous Heart reaches it by 22.01, with no chip to tick.
  it('prints a granted core ability on the Core line', async () => {
    const rf = await import('../../data/roster/adepta-sororitas.js')
    const def = rf.default.units.find((u) => u.id === 'triumph-of-saint-katherine')
    mount(RosterUnitRulesModal, {
      props: {
        unitId: 'triumph-of-saint-katherine',
        factionSlug: 'adepta-sororitas',
        ctx: { def, entry: { uid: 'a', id: 'triumph-of-saint-katherine' }, units: [] },
        gameCtx: {
          active: new Set(),
          // the relic picked this round, as the row's chips would have stored it
          chosen: new Set(['743e9016-ef6c-449f-b45c-28828116d1eb:triumph-of-saint-katherine']),
        },
      },
    })
    await waitFor('Triumph of Saint Katherine')
    for (let i = 0; i < 80 && !document.querySelector('.ds-core-granted'); i++) {
      await flushPromises()
      await new Promise((r) => setTimeout(r, 25))
    }
    const granted = body().find('.ds-core-granted')
    expect(granted.text()).toContain('Feel No Pain 6+')
    expect(granted.attributes('title')).toContain('Icon of the Valorous Heart')
  })

  // The strip came back on 2026-08-25. It was removed because it said nothing about which rule it
  // fed; a set now carries the rule that named it, and the numbers it changes are on THIS card —
  // before, flipping it meant the accordion on the row and reading it meant opening the card.
  it('carries this unit\'s own states at the top, and flipping one asks the parent', async () => {
    const w = mount(RosterUnitRulesModal, {
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
    const chip = body().findAll('.cond-chip').find((c) => c.text().includes('Made a Charge move'))
    expect(chip).toBeDefined()
    await chip.trigger('click')
    expect(w.emitted('toggle-cond')[0][0].id).toBe('unit-charged')
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

  // …and the same fact PROVES a modifier, not just a badge: "while the bearer is leading that
  // unit" is answered by the list itself, so the number moves in the builder, with no game
  // anywhere. 18 enhancements read that way; nothing else off the table can be true.
  it('applies a leading-gated enhancement from the roster alone', async () => {
    const rf = await import('../../data/roster/leagues-of-votann.js')
    const def = rf.default.units.find((u) => u.id === 'einhyr-champion')
    const ctx = {
      def,
      detachments: ['Hearthfyre Arsenal'],
      entry: { uid: 'a', id: 'einhyr-champion', enh: 'Calculated Tenacity', leaderOf: 'b' },
      units: [{ uid: 'b', id: 'einhyr-hearthguard' }],
      leaderTargets: [{ uid: 'b', name: 'Einhyr Hearthguard' }],
    }
    mount(RosterUnitRulesModal, { props: { unitId: 'einhyr-champion', factionSlug: 'leagues-of-votann', ctx } })
    await waitFor('Calculated Tenacity')
    // The faction's modifier bundle is a separate dynamic import from the sheet's, and the core
    // rules' own note is on the card before it lands — so wait for this record, not for the block.
    for (let i = 0; i < 80 && !document.body.textContent.includes('OC'); i++) {
      await flushPromises()
      await new Promise((r) => setTimeout(r, 25))
    }
    for (let i = 0; i < 80 && !document.querySelector('.ds-stat-mod'); i++) {
      await flushPromises()
      await new Promise((r) => setTimeout(r, 25))
    }
    // The OC plate was rewritten, and the note sits with the modifiers in play rather than under
    // "possible" — the roster proved it.
    const notes = document.querySelector('.ds-mods')
    expect(notes.textContent).toContain('Calculated Tenacity')
    expect(document.querySelectorAll('.ds-stat-mod').length).toBeGreaterThan(0)
    // …while Battle-shock, which is the same for every army in every game, is on no list here at
    // all: nothing about it helps plan a roster (see possibleModNotes).
    expect(document.body.textContent).not.toContain('Battle-shock')
  })

  // Chaos Cult's stratagems are DAMNED-only, and every unit in a Chaos Cult list was being offered
  // them: "-1 AP · Crazed Focus" stood under POSSIBLE MODIFIERS on a Legionaries squad that could
  // never be spent one. Real data on both sides — the gate is only as good as the target line it
  // reads.
  it('leaves a stratagem off the card of a unit its target line cannot name', async () => {
    const rf = await import('../../data/roster/chaos-space-marines.js')
    const det = rf.default.detachments.find((d) => d.name === 'Chaos Cult')
    const open = (unitId) => {
      const def = rf.default.units.find((u) => u.id === unitId)
      return mount(RosterUnitRulesModal, {
        props: {
          unitId,
          factionSlug: 'chaos-space-marines',
          ctx: { def, detachments: [det], entry: { uid: 'a', id: unitId }, units: [] },
        },
      })
    }
    const settle = async (needle) => {
      await waitFor(needle)
      // The faction's modifier bundle is a separate dynamic import from the sheet's.
      for (let i = 0; i < 80 && !document.querySelector('.ds-mods'); i++) {
        await flushPromises()
        await new Promise((r) => setTimeout(r, 25))
      }
    }

    // DAMNED: the stratagem is one it could be spent on, so the card says what it would do.
    const damned = open('cultist-mob')
    await settle('Cultist Mob')
    expect(document.querySelector('.ds-mods').textContent).toContain('Crazed Focus')
    damned.unmount()
    document.body.innerHTML = ''

    // Not DAMNED: nothing about that stratagem can ever happen to this unit.
    open('red-corsairs-raiders')
    await settle('Red Corsairs Raiders')
    expect(document.body.textContent).not.toContain('Crazed Focus')
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

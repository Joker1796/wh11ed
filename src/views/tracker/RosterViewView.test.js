import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

let ROSTER_ID = ''
let GAME_PI // undefined unless the test drives the in-game route
let GAME_GID // set as well for the history route
const replace = vi.fn()
vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { get id() { return ROSTER_ID }, get pi() { return GAME_PI }, get gid() { return GAME_GID } } }),
  useRouter: () => ({ push: vi.fn(), replace }),
  RouterLink: { name: 'RouterLink', props: ['to'], template: '<a :href="to"><slot /></a>' },
}))

let RosterViewView, useRosters

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  replace.mockClear()
  GAME_PI = undefined
  GAME_GID = undefined
  ;({ useRosters } = await import('../../composables/useRosters.js'))
  ;({ default: RosterViewView } = await import('./RosterViewView.vue'))
})

const stubs = {
  RosterUnitRulesModal: true,
  RouterLink: { props: ['to'], template: '<a :href="to"><slot /></a>' },
}

async function waitFor(w, needle, tries = 60) {
  for (let i = 0; i < tries; i++) {
    await flushPromises()
    if (w.text().includes(needle)) return
    await new Promise((r) => setTimeout(r, 25))
  }
}

// The stat plates depend on a SEPARATE dynamic import (loadDatasheets, for the full sheet)
// from the one the unit's own name comes from (loadRosterFaction, the compact roster data) —
// under the full suite's parallel workers the two can resolve in either order, so waiting on
// the name text alone is not enough to guarantee the plates rendered too.
async function waitForSelector(w, selector, tries = 60) {
  for (let i = 0; i < tries; i++) {
    await flushPromises()
    if (w.find(selector).exists()) return
    await new Promise((r) => setTimeout(r, 25))
  }
}

describe('RosterViewView', () => {
  it('redirects to the list when the roster id is unknown', async () => {
    ROSTER_ID = 'missing'
    mount(RosterViewView, { global: { stubs } })
    await flushPromises()
    expect(replace).toHaveBeenCalledWith('/roster')
  })

  it('shows a setup hint for a roster with no faction yet', async () => {
    const store = useRosters()
    const r = store.createRoster('Blank')
    ROSTER_ID = r.id
    const w = mount(RosterViewView, { global: { stubs } })
    await flushPromises()
    const { ui } = await import('../../i18n/ui.js')
    expect(w.text()).toContain(ui.en.rosterViewNoFaction)
    expect(w.find('.rv-tabs').exists()).toBe(false)
  })

  // Exports name a list with a whole quote often enough that the header has to expect one:
  // five lines of display type used to squeeze the points and the pencil against the text.
  it('gives a wordy list name the header row to itself, a size smaller', async () => {
    const store = useRosters()
    const quote = 'I am Warpbane-- and I could kill you...but death would only end your agony.'
    const r = store.createRoster(quote)
    ROSTER_ID = r.id
    const w = mount(RosterViewView, { global: { stubs } })
    await flushPromises()

    expect(w.find('.rv-head').classes()).toContain('wrapped')
    expect(w.find('.rv-name').classes()).toContain('xlong')
  })

  it('leaves an ordinary list name in the usual header', async () => {
    const store = useRosters()
    const r = store.createRoster('Warpbane Task Force')
    ROSTER_ID = r.id
    const w = mount(RosterViewView, { global: { stubs } })
    await flushPromises()

    expect(w.find('.rv-head').classes()).not.toContain('wrapped')
    expect(w.find('.rv-name').classes()).toEqual(['rv-name'])
  })

  // Off the table nothing can be in force, so the switch strip's place above the list is taken by
  // what WOULD apply once the battle proves it — closed, and only the rules that bear on the whole
  // list (an ability or a wargear rule belongs to one unit and is on that unit's card).
  it('offers the possible modifiers above the list, out of a game', async () => {
    const store = useRosters()
    const r = store.createRoster('Cursed list')
    r.faction = 'necrons'
    r.detachments = ['Cursed Legion']
    r.units.push({ uid: 'u1', id: 'necron-warriors', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Necron Warriors')
    await waitForSelector(w, '.rvp-head')

    expect(w.find('.rvp-head').attributes('aria-expanded')).toBe('false')
    const before = w.find('.rvp-list').text()
    expect(before).toContain('Cold Fervour')
    // Sources are named, and each conditional modifier says what it is waiting for.
    // The detachment names itself; Battle-shock does not appear at all — a core rule is the same
    // for every army in every game and says nothing about this list.
    const sources = w.findAll('.rvp-src').map((n) => n.text())
    expect(sources).not.toContain('Core rule')
    expect(sources.some((t) => t.includes('Cursed Legion'))).toBe(true)
    expect(w.find('.rvp-list').text()).not.toContain('Battle-shock')
    expect(w.find('.rvp-cond').exists()).toBe(true)

    await w.find('.rvp-head').trigger('click')
    expect(w.find('.rvp-head').attributes('aria-expanded')).toBe('true')
  })


  // A list is read far more often than it is edited, and what it BREAKS used to live behind the
  // editor's footer badge — two screens from the page that shows the list.
  it('says what the list breaks, and opens the same issues modal the editor uses', async () => {
    const store = useRosters()
    const r = store.createRoster('Illegal list')
    r.faction = 'space-marines'
    r.battleSize = 'incursion'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })   // no warlord, no detachment
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    await waitForSelector(w, '.rv-issues')

    const { ui } = await import('../../i18n/ui.js')
    const strip = w.find('.rv-issues')
    expect(strip.classes()).toContain('err')
    expect(strip.text()).toContain(ui.en.rosterViewIssues.replace('{n}', '1'))   // noWarlord
    await strip.trigger('click')
    await flushPromises()
    expect(document.body.textContent).toContain(ui.en.issue_noWarlord)
    w.unmount()
    document.body.innerHTML = ''
  })

  it('stays quiet about a list that breaks nothing', async () => {
    const store = useRosters()
    const r = store.createRoster('Fine list')
    r.faction = 'space-marines'
    r.detachments = ['Gladius Task Force']
    r.units.push({ uid: 'u1', id: 'captain-in-terminator-armour', size: 0, warlord: true })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Captain in Terminator Armour')
    expect(w.find('.rv-issues').exists()).toBe(false)
  })

  it('lists units grouped by role, with points, and links Edit to the full editor', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')

    expect(w.text()).toContain('Intercessor Squad')
    expect(w.text()).toContain('80')   // default 5-model bracket points
    expect(w.text()).toContain('2000') // Strike Force limit
    expect(w.find('.hdr-icon').attributes('href')).toBe(`/roster/${r.id}`)
  })

  it('shows the base statline as plates, same chamfered-box style as DatasheetCard', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    await waitForSelector(w, '.rvst')

    const plates = w.findAll('.rvst')
    expect(plates.length).toBe(6) // M/T/SV/W/LD/OC
    const labels = plates.map((p) => p.find('.rvst-label').text())
    expect(labels).toEqual(['M', 'T', 'SV', 'W', 'LD', 'OC'])
  })

  it('opens the unit rules preview modal when a unit row is clicked', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    await w.find('.rvunit-main').trigger('click')
    const modal = w.find('roster-unit-rules-modal-stub')
    expect(modal.exists()).toBe(true)
    expect(modal.attributes('unitid')).toBe('intercessor-squad')
  })

  it('colours the invulnerable save as its own plate, separate from SV', async () => {
    const store = useRosters()
    const r = store.createRoster('Knights')
    r.faction = 'space-marines'
    // Captain in Terminator Armour has an invulnerable save (4++).
    r.units.push({ uid: 'u1', id: 'captain-in-terminator-armour', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Captain in Terminator Armour')
    await waitForSelector(w, '.rvst-inv')

    const inv = w.find('.rvst-inv')
    expect(inv.exists()).toBe(true)
    expect(inv.find('.rvst-label').text()).toBe('INV')
  })

  it('loads the army rule and selected detachment rule under the Rules tab', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.detachments = ['1st Company Task Force']
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    await w.findAll('.rv-tab')[1].trigger('click') // Rules tab
    await waitFor(w, '1st Company Task Force')
    expect(w.text()).toContain('1st Company Task Force')
  })

  it('lists the selected detachment\'s stratagems under the Stratagems tab', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.detachments = ['1st Company Task Force']
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    await w.findAll('.rv-tab')[2].trigger('click') // Stratagems tab
    await waitFor(w, '1st Company Task Force')
    expect(w.text()).toContain('1st Company Task Force')
    expect(w.find('.strat-grid').exists()).toBe(true)
  })

  // Rule and stratagem NAMES stay English by convention and carry their translation on a line
  // underneath (RuleBlock's subtitle, StratCard's nameRu). Both templates asked for that line from
  // the start; the loader here never attached the RU name maps, so it never appeared.
  it('shows the RU name under the English one on the Rules and Stratagems tabs', async () => {
    const { useLocale } = await import('../../composables/useLocale.js')
    const { locale } = useLocale()
    const prev = locale.value
    locale.value = 'ru'
    try {
      const store = useRosters()
      const r = store.createRoster('Test list')
      r.faction = 'space-marines'
      r.detachments = ['Gladius Task Force']
      r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
      ROSTER_ID = r.id

      const w = mount(RosterViewView, { global: { stubs } })
      await waitFor(w, 'Intercessor Squad')
      await w.findAll('.rv-tab')[1].trigger('click')   // Rules
      await waitFor(w, 'Клятва момента')               // the army rule's RU name, under "Oath of Moment"
      expect(w.text()).toContain('Oath of Moment')
      expect(w.text()).toContain('Боевые доктрины')    // …and the detachment rule's
      await w.findAll('.rv-tab')[2].trigger('click')   // Stratagems
      await waitFor(w, 'Броня презрения')
      expect(w.text()).toContain('Armour of Contempt')
    } finally {
      locale.value = prev
    }
  })

  it('the Stratagems tab groups by phase behind the same toggle as the standalone page', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.detachments = ['1st Company Task Force']
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    await w.findAll('.rv-tab')[2].trigger('click') // Stratagems tab
    await waitFor(w, '1st Company Task Force')

    expect(w.find('.phase-group').exists()).toBe(false) // flat list by default
    await w.find('.strat-toggle').trigger('click')
    expect(w.find('.phase-group').exists()).toBe(true)
    // CollapseTransition always renders its slot (see roster/CLAUDE.md) — assert open state via
    // aria-expanded/the "is-open" class, not the grid's presence in the DOM.
    expect(w.find('.phase-head').attributes('aria-expanded')).toBe('false')

    await w.find('.phase-head').trigger('click')
    expect(w.find('.phase-head').attributes('aria-expanded')).toBe('true')
    // Scoped to the phase group: the "possible modifiers" block above the tabs has a collapse of
    // its own, and out of a game it is the first one on the page.
    expect(w.find('.phase-group .collapse').classes()).toContain('is-open')
  })

  it('shows a hint under Stratagems when no detachment is picked yet', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    await w.findAll('.rv-tab')[2].trigger('click') // Stratagems tab
    const { ui } = await import('../../i18n/ui.js')
    await waitFor(w, ui.en.rosterViewNoDetachment)
    expect(w.text()).toContain(ui.en.rosterViewNoDetachment)
  })
  // The in-game route (/tracker/game/roster/:pi) is the SAME screen fed from the game's own
  // snapshot instead of the saved-roster store — a game outlives the list it was played with.
  describe('opened from a game', () => {
    async function startGame(roster, faction = 'space-marines') {
      const { useTracker } = await import('../../composables/useTracker.js')
      const { rosterSnapshot } = await import('../../composables/rosterGameLink.js')
      const t = useTracker()
      t.newGame({
        settings: { battleSize: 'strikeForce', firstTurn: 1 },
        players: [
          { name: 'Me', factionSlug: faction, detachments: [], disposition: 'balanced', role: 'attacker', rosterId: roster.id, roster: rosterSnapshot(roster) },
          { name: 'Them', factionSlug: 'orks', detachments: [], disposition: 'balanced', role: 'defender' },
        ],
      })
      return t
    }

    const fielded = {
      id: 'r1', name: 'Fielded List', faction: 'space-marines', detachments: [],
      battleSize: 'strike-force', units: [{ uid: 'u1', id: 'intercessor-squad', size: 0 }],
    }

    it('renders the list the game carries, with no way to edit it', async () => {
      await startGame(fielded)
      GAME_PI = '0'
      const w = mount(RosterViewView, { global: { stubs } })
      await waitFor(w, 'Intercessor Squad')

      expect(w.text()).toContain('Fielded List')
      expect(w.find('.hdr-icon').exists()).toBe(false)   // a snapshot is a record, not a draft
      expect(w.find('.back').attributes('href')).toBe('/tracker/game')
      expect(replace).not.toHaveBeenCalled()
    })

    it('still renders after the saved roster it came from is deleted', async () => {
      const t = await startGame(fielded)
      const { useRosters: rostersOf } = await import('../../composables/useRosters.js')
      const saved = rostersOf()
      expect(saved.rosterById('r1')).toBeNull()   // never was in this store — only the snapshot is
      expect(t.current.value.players[0].roster.name).toBe('Fielded List')

      GAME_PI = '0'
      const w = mount(RosterViewView, { global: { stubs } })
      await waitFor(w, 'Fielded List')
      expect(w.text()).toContain('Fielded List')
    })

    // The whole point of the feature, end to end: the Ork player calls a Waaagh! on the tracker
    // card, and the list they are holding starts showing the numbers it is actually fighting with.
    it('turns the printed numbers into the live ones when the Waaagh! is called', async () => {
      const orks = {
        id: 'r2', name: 'Da List', faction: 'orks', detachments: [],
        battleSize: 'strike-force', units: [{ uid: 'u1', id: 'boyz', size: 0 }],
      }
      const t = await startGame(orks, 'orks')
      GAME_PI = '0'
      const w = mount(RosterViewView, { global: { stubs } })
      await waitFor(w, 'Waaagh!')

      const chip = w.findAll('.cond-chip').find((c) => c.text().includes('Waaagh!'))
      expect(chip.classes()).not.toContain('on')
      // Read from the army-rule tracker, not flipped here — there is one switch for this fact.
      expect(chip.attributes('disabled')).toBeDefined()
      expect(w.find('.rvst-mod').exists()).toBe(false)

      t.fireArmyToggle(0, t.current.value.currentRound)
      await waitForSelector(w, '.rvst-mod')

      expect(w.findAll('.cond-chip').find((c) => c.text().includes('Waaagh!')).classes()).toContain('on')
      expect(w.find('.rvst-mod').exists()).toBe(true)  // a plate the Waaagh! rewrote
    })

    // Per-unit states live on the unit's own row: they are what a player flips every turn, and
    // opening a card for that is a step too many. Army-wide states stay above the list.
    it('puts a unit\'s own switches in its row, under the stats', async () => {
      const sm = {
        id: 'r3', name: 'Stationary List', faction: 'space-marines', detachments: [],
        battleSize: 'strike-force', units: [{ uid: 'u1', id: 'desolation-squad', size: 0 }],
      }
      const t = await startGame(sm, 'space-marines')
      GAME_PI = '0'
      const w = mount(RosterViewView, { global: { stubs } })
      await waitFor(w, 'Desolation Squad')
      await waitForSelector(w, '.rvunit-conds .cond-chip')

      // One chip stays on the row — Battle-shock, the state every unit can be in and the one that
      // gets marked every Command phase — and the rest fold behind the chevron beside it.
      const row = w.find('.rvunit')
      expect(row.findAll('.rvunit-conds > .cond-chips .cond-chip').map((c) => c.text())).toEqual(['Battle-shocked'])
      expect(w.find('.rvunit-more').attributes('aria-expanded')).toBe('false')

      await w.find('.rvunit-more').trigger('click')
      expect(w.find('.rvunit-more').attributes('aria-expanded')).toBe('true')
      const chip = w.findAll('.rvunit-rest .cond-chip').find((c) => c.text().includes('Remained Stationary'))
      expect(chip).toBeTruthy()
      expect(chip.classes()).not.toContain('on')
      await chip.trigger('click')
      expect(t.current.value.players[0].ctx.units.u1['unit-stationary']).toBeDefined()
    })

    // A state the CORE rules define answers for itself: the "i" beside Battle-shocked says what
    // being Battle-shocked costs — including the stratagem ban this card enforces. A state that is
    // some faction's rule (a Waaagh!) has no such definition to give, and carries no button.
    it('puts the core rule behind a game-state chip, and only where there is one', async () => {
      const sm = {
        id: 'r3h', name: 'Hint List', faction: 'space-marines', detachments: [],
        battleSize: 'strike-force', units: [{ uid: 'u1', id: 'desolation-squad', size: 0 }],
      }
      await startGame(sm, 'space-marines')
      GAME_PI = '0'
      const w = mount(RosterViewView, { global: { stubs } })
      await waitFor(w, 'Desolation Squad')
      await waitForSelector(w, '.rvunit-conds .cond-chip')

      const { useKeywordPopover } = await import('../../composables/useKeywordPopover.js')
      const { visible, activeKeyword, close } = useKeywordPopover()
      await w.find('.rvunit-conds .cond-info').trigger('click')
      expect(visible.value).toBe(true)
      expect(activeKeyword.value.name).toBe('Battle-shocked')
      expect(activeKeyword.value.fullText).toContain('cannot be targeted with Stratagems')
      expect(activeKeyword.value.fullText).toContain('(01.07)')   // …and the rule number navigates
      close()
      w.unmount()

      const orks = {
        id: 'r3w', name: 'Waaagh List', faction: 'orks', detachments: [],
        battleSize: 'strike-force', units: [{ uid: 'u1', id: 'boyz', size: 0 }],
      }
      await startGame(orks, 'orks')
      const w2 = mount(RosterViewView, { global: { stubs } })
      await waitFor(w2, 'Boyz')
      await waitForSelector(w2, '.rv-conds .cond-chip')
      const waaagh = w2.findAll('.rv-conds .cond-item').find((i) => i.text().includes('Waaagh!'))
      expect(waaagh.find('.cond-info').exists()).toBe(false)
      w2.unmount()
    })

    // …and no chevron at all when Battle-shock is the only thing this unit can be in.
    it('leaves the row bare when there is nothing behind the chevron', async () => {
      const orks = {
        id: 'r8', name: 'Plain List', faction: 'orks', detachments: [],
        battleSize: 'strike-force', units: [{ uid: 'u1', id: 'boyz', size: 0 }],
      }
      await startGame(orks, 'orks')
      GAME_PI = '0'
      const w = mount(RosterViewView, { global: { stubs } })
      await waitFor(w, 'Plain List')
      await waitForSelector(w, '.rvunit-conds .cond-chip')
      await new Promise((r) => setTimeout(r, 25))
      await flushPromises()
      expect(w.findAll('.rvunit-conds > .cond-chips .cond-chip').map((c) => c.text())).toEqual(['Battle-shocked'])
      expect(w.find('.rvunit-more').exists()).toBe(false)
    })

    // Core Rules 01.07 again, from the other side: a Battle-shocked unit may not be affected by a
    // Stratagem, so switching Battle-shock on un-spends the ones it is running rather than leaving
    // the player to notice a card that contradicts the rule it just turned on.
    it('un-spends a unit\'s stratagems when it is Battle-shocked', async () => {
      const t = await startGame({ ...withStrats, id: 'r5' })
      GAME_PI = '0'
      // Gladius' "Honour the Chapter", spent on the unit this round (a game with no phase clock
      // stamps the bare round, which is what an untracked game has always stored).
      t.setUnitStratagem(0, 'u1', 'c055b116-504d-418e-9e52-0951913d32e5', t.current.value.currentRound, true)
      const w = mount(RosterViewView, { global: { stubs } })
      await waitFor(w, 'Intercessor Squad')
      await waitForSelector(w, '.rvunit-conds .cond-chip')
      await new Promise((r) => setTimeout(r, 20))   // the faction's modifier bundle is imported lazily
      await flushPromises()

      expect(t.current.value.players[0].ctx.strats.u1).toBeDefined()
      const chip = w.findAll('.rvunit-conds .cond-chip').find((c) => c.text().includes('Battle-shocked'))
      await chip.trigger('click')

      expect(t.current.value.players[0].ctx.units.u1['unit-battle-shocked']).toBeDefined()
      expect(t.current.value.players[0].ctx.strats.u1).toBeUndefined()
    })

    // The aura chain end to end, on real data: the Triumph picks a relic (an army-wide choice, the
    // chips above the list), the player says the Sisters are within 6" (a chip on their row, right
    // where Battle-shock is marked), and their Move plate moves. Core Rules 22.01 gives the
    // Triumph its own aura for free — that half needs no chip at all.
    it('marks an aura on a unit and rewrites its numbers', async () => {
      const sisters = {
        id: 'r7', name: 'Sisters', faction: 'adepta-sororitas', detachments: [],
        battleSize: 'strike-force',
        units: [{ uid: 'u1', id: 'triumph-of-saint-katherine', size: 0 }, { uid: 'u2', id: 'battle-sisters-squad', size: 0 }],
      }
      const t = await startGame(sisters, 'adepta-sororitas')
      GAME_PI = '0'
      const w = mount(RosterViewView, { global: { stubs } })
      await waitFor(w, 'Battle Sisters Squad')
      await waitForSelector(w, '.rvunit-conds .cond-chip')
      await new Promise((r) => setTimeout(r, 25))
      await flushPromises()

      const rowOf = (name) => w.findAll('.rvunit').find((r) => r.text().includes(name))
      const auraChip = () => rowOf('Battle Sisters Squad').findAll('.cond-chip').find((c) => c.text().includes('Fiery Heart'))
      // Nothing is offered while the relic is not the one selected this round: marking it would
      // move no number, and the Sisters' row has nothing else to fold away either.
      expect(auraChip()).toBeUndefined()
      expect(rowOf('Battle Sisters Squad').find('.rvunit-more').exists()).toBe(false)

      // The Triumph picks the relic on its own row — the choice belongs to that model.
      t.setUnitPick(0, 'u1', '7d867253-6b26-46a4-ad71-995d88487c37:triumph-of-saint-katherine', t.current.value.currentRound, true)
      await flushPromises()
      // …and now it is, behind the chevron: an aura is not the row's headline state.
      await rowOf('Battle Sisters Squad').find('.rvunit-more').trigger('click')
      const chip = rowOf('Battle Sisters Squad').findAll('.rvunit-rest .cond-chip').find((c) => c.text().includes('Fiery Heart'))
      expect(chip.text()).toContain('Triumph of Saint Katherine')   // the chip says where it comes from
      expect(chip.classes()).not.toContain('on')

      await chip.trigger('click')
      await flushPromises()
      expect(t.current.value.players[0].ctx.auras.u2).toBeDefined()

      const move = rowOf('Battle Sisters Squad').findAll('.rvst').find((c) => c.text().startsWith('M'))
      expect(move.text()).toContain('8"')                      // 6" printed + 2"
      expect(move.classes()).toContain('rvst-mod')
      // …and the Triumph's own Move moved with no chip of its own (22.01).
      expect(rowOf('Triumph of Saint Katherine').findAll('.rvst').find((c) => c.text().startsWith('M')).classes())
        .toContain('rvst-mod')
    })

    // The chips above the list are somebody's printed rule, switched three screens from the card
    // that explains it — so they say whose it is, name it the way that card does, and hand over
    // the text.
    it('heads an ability set with its owner and names it in the reader\'s language', async () => {
      const { useLocale } = await import('../../composables/useLocale.js')
      const { locale } = useLocale()
      const prev = locale.value
      locale.value = 'ru'
      try {
        const sisters = {
          id: 'r9', name: 'Sisters', faction: 'adepta-sororitas', detachments: [],
          battleSize: 'strike-force', units: [{ uid: 'u1', id: 'triumph-of-saint-katherine', size: 0 }],
        }
        await startGame(sisters, 'adepta-sororitas')
        GAME_PI = '0'
        const w = mount(RosterViewView, { global: { stubs } })
        await waitFor(w, 'Triumph of Saint Katherine')
        await waitForSelector(w, '.rv-conds .cond-chip')
        await new Promise((r) => setTimeout(r, 25))
        await flushPromises()

        // On the unit's own row, behind the chevron: it is that model's choice.
        await w.find('.rvunit-more').trigger('click')
        const group = w.find('.rvunit-rest .cond-group')
        expect(group.find('.cond-group-owner').text())
          .toBe('Triumph of Saint Katherine · Реликвии Матриархов')
        expect(group.text()).toContain('0 из 2')          // the set picks two a round
        const chips = group.findAll('.cond-chip').map((c) => c.text())
        // ALL SIX options, not just the two that move a number — the tally is the point.
        expect(chips).toHaveLength(6)
        expect(chips).toContain('Огненное сердце (Аура)')  // the RU overlay's own name for it
        expect(chips).toContain('Кадило Священной Розы (Аура)')   // …and one that changes nothing
        expect(group.findAll('.cond-info').length).toBe(6)

        // …and the "i" opens the rule itself, in the popover a core ability uses.
        const { useKeywordPopover } = await import('../../composables/useKeywordPopover.js')
        const { visible, activeKeyword, close } = useKeywordPopover()
        expect(visible.value).toBe(false)
        await group.find('.cond-info').trigger('click')
        expect(visible.value).toBe(true)
        expect(activeKeyword.value.fullText).toContain('6"')   // the aura's own prose
        close()
      } finally {
        locale.value = prev
      }
    })

    // In a game the same place carries the switches instead: what is true is answerable, so a list
    // of what MIGHT be true is one more thing to scroll past mid-turn.
    it('drops the possible-modifier block once a game is on', async () => {
      const orks = {
        id: 'r6', name: 'Da Live List', faction: 'orks', detachments: [],
        battleSize: 'strike-force', units: [{ uid: 'u1', id: 'boyz', size: 0 }],
      }
      await startGame(orks, 'orks')
      GAME_PI = '0'
      const w = mount(RosterViewView, { global: { stubs } })
      await waitFor(w, 'Da Live List')
      await waitForSelector(w, '.rvunit-conds .cond-chip')
      expect(w.find('.rvp-head').exists()).toBe(false)
    })

    // The row became a container so it could hold those buttons; opening the card must still work.
    it('still opens the card from the row itself', async () => {
      const sm = {
        id: 'r4', name: 'Tap List', faction: 'space-marines', detachments: [],
        battleSize: 'strike-force', units: [{ uid: 'u1', id: 'desolation-squad', size: 0 }],
      }
      await startGame(sm, 'space-marines')
      GAME_PI = '0'
      const w = mount(RosterViewView, { global: { stubs } })
      await waitFor(w, 'Desolation Squad')
      await w.find('.rvunit-main').trigger('click')
      expect(w.find('roster-unit-rules-modal-stub').exists()).toBe(true)
    })

    // A finished game keeps its lists — that is the whole reason the snapshot travels inside the
    // game — but it is a record: nothing left to switch on or off.
    it('reads the list out of a finished game, without offering its switches', async () => {
      const orks = {
        id: 'r3', name: 'Da Old List', faction: 'orks', detachments: [],
        battleSize: 'strike-force', units: [{ uid: 'u1', id: 'boyz', size: 0 }],
      }
      const t = await startGame(orks, 'orks')
      t.fireArmyToggle(0, 1)
      t.finishGame('early')
      const archived = t.archiveGame()
      const gid = archived?.id || t.history.value[0].id

      GAME_PI = '0'
      GAME_GID = gid
      const w = mount(RosterViewView, { global: { stubs } })
      await waitFor(w, 'Da Old List')

      expect(w.text()).toContain('Da Old List')
      expect(w.find('.cond-chip').exists()).toBe(false)      // a record has no controls
      expect(w.find('.back').attributes('href')).toBe(`/tracker/history/${gid}`)
      // …but what was true in that game still shaped the numbers it shows.
      await waitForSelector(w, '.rvst-mod')
      expect(w.find('.rvst-mod').exists()).toBe(true)
    })

    // The stratagem filter: only where there is a clock to read, and it answers for the player
    // whose list is open, not for whoever's turn it happens to be.
    // A list with a detachment, so there are stratagems on the tab at all.
    const withStrats = { ...fielded, id: 'r4', detachments: ['Gladius Task Force'] }

    it('offers "usable now" only in a live game that keeps a clock', async () => {
      const t = await startGame(withStrats)
      GAME_PI = '0'
      const w1 = mount(RosterViewView, { global: { stubs } })
      await waitFor(w1, 'Fielded List')
      await w1.findAll('.rv-tab').at(-1).trigger('click')
      await flushPromises()
      expect(w1.find('.now-toggle').exists()).toBe(false)   // the game doesn't track phases

      t.updateSetup({ settings: { ...t.current.value.settings, trackPhases: true } })
      const w2 = mount(RosterViewView, { global: { stubs } })
      await waitFor(w2, 'Fielded List')
      await w2.findAll('.rv-tab').at(-1).trigger('click')
      await flushPromises()
      expect(w2.find('.now-toggle').exists()).toBe(true)
    })

    it('narrows the list to the slot the game is standing on', async () => {
      const t = await startGame(withStrats)
      t.updateSetup({ settings: { ...t.current.value.settings, trackPhases: true } })
      GAME_PI = '0'
      const w = mount(RosterViewView, { global: { stubs } })
      await waitFor(w, 'Fielded List')
      await w.findAll('.rv-tab').at(-1).trigger('click')
      await flushPromises()

      const all = w.findAll('.strat-grid > *').length
      await w.find('.now-toggle').trigger('click')
      await flushPromises()
      const nowMine = w.findAll('.strat-grid > *').length
      expect(nowMine).toBeLessThan(all)

      // Same phase, the opponent's turn: a different set — "your Command phase" stops applying.
      t.goToPhase(1, 'command')
      await flushPromises()
      expect(w.findAll('.strat-grid > *').length).not.toBe(nowMine)
    })

    it('leaves for the game when that player fielded no list', async () => {
      await startGame(fielded)
      GAME_PI = '1'
      mount(RosterViewView, { global: { stubs } })
      await flushPromises()
      await new Promise((r) => setTimeout(r, 20))
      await flushPromises()
      expect(replace).toHaveBeenCalledWith('/tracker/game')
    })
  })
})

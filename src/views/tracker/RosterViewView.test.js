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
    await w.find('.rvunit').trigger('click')
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
    expect(w.find('.collapse').classes()).toContain('is-open')
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

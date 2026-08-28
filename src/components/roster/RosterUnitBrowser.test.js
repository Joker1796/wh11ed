import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RosterUnitBrowser from './RosterUnitBrowser.vue'
import { useCollection } from '../../composables/useCollection.js'

const units = [
  { id: 'a', name: 'Alpha Battleline', kws: ['Battleline'], sizes: [{ pts: 80, per: [5, 5] }] },
  { id: 'b', name: 'Bravo Character', flags: { char: true }, sizes: [{ pts: 100, per: [1, 1] }] },
  { id: 'c', name: 'Charlie Epic Hero', flags: { epic: true, char: true }, sizes: [{ pts: 200, per: [1, 1] }] },
  { id: 'd', name: 'Delta Transport', kws: ['Dedicated Transport'], sizes: [{ pts: 75, per: [1, 1] }] },
  { id: 'e', name: 'Echo Other', sizes: [{ pts: 90, per: [2, 2] }, { pts: 50, per: [1, 1] }] },
]

const stubs = { RosterUnitRulesModal: true }
const mountBrowser = (props = {}) =>
  mount(RosterUnitBrowser, { props: { units, factionSlug: 'space-marines', addedIds: [], ...props }, global: { stubs } })

describe('RosterUnitBrowser', () => {
  it('groups units by battlefield role', () => {
    const w = mountBrowser()
    expect(w.text()).toContain('Alpha Battleline')
    expect(w.text()).toContain('Bravo Character')
    expect(w.text()).toContain('Charlie Epic Hero')
    expect(w.text()).toContain('Delta Transport')
    expect(w.text()).toContain('Echo Other')
  })

  it('filters by name as the user types', async () => {
    const w = mountBrowser()
    await w.find('.rub-search').setValue('bravo')
    expect(w.text()).toContain('Bravo Character')
    expect(w.text()).not.toContain('Alpha Battleline')
  })

  it('shows the cheapest bracket as the listed price', () => {
    const w = mountBrowser()
    const row = w.findAll('.rub-item').find((r) => r.text().includes('Echo Other'))
    expect(row.text()).toContain('50')
    expect(row.text()).not.toContain('90')
  })

  it('badges units already in the roster with a count', () => {
    const w = mountBrowser({ addedIds: ['a', 'a', 'e'] })
    const alpha = w.findAll('.rub-item').find((r) => r.text().includes('Alpha Battleline'))
    const bravo = w.findAll('.rub-item').find((r) => r.text().includes('Bravo Character'))
    expect(alpha.text()).toContain('×2')
    expect(bravo.text()).not.toContain('×')
  })

  it('emits add from the add button without opening the preview', async () => {
    const w = mountBrowser()
    const row = w.findAll('.rub-item').find((r) => r.text().includes('Alpha Battleline'))
    await row.find('.rub-add').trigger('click')
    expect(w.emitted('add')).toEqual([['a']])
    expect(w.find('roster-unit-rules-modal-stub').exists()).toBe(false)
  })

  it('opens the rules preview when a row (not the add button) is clicked', async () => {
    const w = mountBrowser()
    const row = w.findAll('.rub-item').find((r) => r.text().includes('Alpha Battleline'))
    await row.trigger('click')
    expect(w.emitted('add')).toBeFalsy()
    const modal = w.find('roster-unit-rules-modal-stub')
    expect(modal.exists()).toBe(true)
    expect(modal.attributes('unitid')).toBe('a')
  })

  it('starts with every group collapsed, and a header click expands it', async () => {
    const w = mountBrowser()
    const heads = w.findAll('.rub-head')
    expect(heads.length).toBeGreaterThan(0)
    for (const h of heads) expect(h.attributes('aria-expanded')).toBe('false')

    await heads[0].trigger('click')
    expect(heads[0].attributes('aria-expanded')).toBe('true')
  })

  it('force-opens groups with a match while searching, even if not manually expanded', async () => {
    const w = mountBrowser()
    await w.find('.rub-search').setValue('bravo')
    const head = w.findAll('.rub-head').find((h) => h.text().includes('Characters'))
    expect(head.attributes('aria-expanded')).toBe('true')
  })

  it('only shows the remove button once a unit has at least one copy added', () => {
    const w = mountBrowser({ addedIds: ['a'] })
    const alpha = w.findAll('.rub-item').find((r) => r.text().includes('Alpha Battleline'))
    const bravo = w.findAll('.rub-item').find((r) => r.text().includes('Bravo Character'))
    expect(alpha.find('.rub-remove').exists()).toBe(true)
    expect(bravo.find('.rub-remove').exists()).toBe(false)
  })

  it('emits remove from the "-" button without opening the preview', async () => {
    const w = mountBrowser({ addedIds: ['a'] })
    const alpha = w.findAll('.rub-item').find((r) => r.text().includes('Alpha Battleline'))
    await alpha.find('.rub-remove').trigger('click')
    expect(w.emitted('remove')).toEqual([['a']])
    expect(w.find('roster-unit-rules-modal-stub').exists()).toBe(false)
  })

  it('marks added units so they render bright, and unadded ones dim', () => {
    const w = mountBrowser({ addedIds: ['a'] })
    const alpha = w.findAll('.rub-item').find((r) => r.text().includes('Alpha Battleline'))
    const bravo = w.findAll('.rub-item').find((r) => r.text().includes('Bravo Character'))
    expect(alpha.classes()).toContain('added')
    expect(bravo.classes()).not.toContain('added')
  })

  it('disables the add button once checkLegality is on and the duplicate cap is reached', () => {
    // battle.dupLimit 2 → Alpha Battleline (doubled) caps at 4; Bravo Character caps at 2;
    // Charlie Epic Hero always caps at 1, regardless of dupLimit.
    const battle = { dupLimit: 2 }
    const w = mountBrowser({ addedIds: ['a', 'a', 'a', 'a', 'b', 'b', 'c'], battle, checkLegality: true })
    const alpha = w.findAll('.rub-item').find((r) => r.text().includes('Alpha Battleline'))
    const bravo = w.findAll('.rub-item').find((r) => r.text().includes('Bravo Character'))
    const charlie = w.findAll('.rub-item').find((r) => r.text().includes('Charlie Epic Hero'))
    expect(alpha.find('.rub-add').attributes('disabled')).toBeDefined()
    expect(bravo.find('.rub-add').attributes('disabled')).toBeDefined()
    expect(charlie.find('.rub-add').attributes('disabled')).toBeDefined()
  })

  it('badges the count as "current/limit" once the cap is known, with no "at cap" styling', () => {
    const battle = { dupLimit: 2 }
    const w = mountBrowser({ addedIds: ['c'], battle, checkLegality: true })
    const charlie = w.findAll('.rub-item').find((r) => r.text().includes('Charlie Epic Hero'))
    expect(charlie.text()).toContain('1/1')
    expect(charlie.find('.rub-count').classes()).not.toContain('at-cap')
  })

  it('turns the count badge red once it is strictly OVER the cap (e.g. battle size lowered after adding)', () => {
    // Charlie Epic Hero is capped at 1 regardless of dupLimit — 3 copies is over, not just at cap.
    const battle = { dupLimit: 2 }
    const w = mountBrowser({ addedIds: ['c', 'c', 'c'], battle, checkLegality: true })
    const charlie = w.findAll('.rub-item').find((r) => r.text().includes('Charlie Epic Hero'))
    expect(charlie.text()).toContain('3/1')
    expect(charlie.find('.rub-count').classes()).toContain('over')
  })

  it('does not mark the badge red exactly at the cap, only strictly over it', () => {
    const battle = { dupLimit: 2 }
    const w = mountBrowser({ addedIds: ['c'], battle, checkLegality: true })
    const charlie = w.findAll('.rub-item').find((r) => r.text().includes('Charlie Epic Hero'))
    expect(charlie.find('.rub-count').classes()).not.toContain('over')
  })

  it('never marks the badge red when checkLegality is off, even over the cap', () => {
    const battle = { dupLimit: 2 }
    const w = mountBrowser({ addedIds: ['c', 'c', 'c'], battle, checkLegality: false })
    const charlie = w.findAll('.rub-item').find((r) => r.text().includes('Charlie Epic Hero'))
    expect(charlie.find('.rub-count').classes()).not.toContain('over')
  })

  it('falls back to the plain "×N" badge when checkLegality is off', () => {
    const battle = { dupLimit: 2 }
    const w = mountBrowser({ addedIds: ['a', 'a'], battle, checkLegality: false })
    const alpha = w.findAll('.rub-item').find((r) => r.text().includes('Alpha Battleline'))
    expect(alpha.text()).toContain('×2')
    expect(alpha.text()).not.toContain('2/')
  })

  it('leaves the add button enabled under the cap', () => {
    const battle = { dupLimit: 2 }
    const w = mountBrowser({ addedIds: ['a'], battle, checkLegality: true })
    const alpha = w.findAll('.rub-item').find((r) => r.text().includes('Alpha Battleline'))
    expect(alpha.find('.rub-add').attributes('disabled')).toBeUndefined()
  })

  it('never disables the add button when checkLegality is off, even over the cap', () => {
    const battle = { dupLimit: 2 }
    const w = mountBrowser({ addedIds: ['c', 'c', 'c'], battle, checkLegality: false })
    const charlie = w.findAll('.rub-item').find((r) => r.text().includes('Charlie Epic Hero'))
    expect(charlie.find('.rub-add').attributes('disabled')).toBeUndefined()
  })

  it('keeps the remove button enabled even when the add button is capped', async () => {
    const battle = { dupLimit: 2 }
    const w = mountBrowser({ addedIds: ['c'], battle, checkLegality: true })
    const charlie = w.findAll('.rub-item').find((r) => r.text().includes('Charlie Epic Hero'))
    expect(charlie.find('.rub-add').attributes('disabled')).toBeDefined()
    await charlie.find('.rub-remove').trigger('click')
    expect(w.emitted('remove')).toEqual([['c']])
  })

  it('bakes a mandatory enhancement into the browse price, for the unit it applies to only', () => {
    const detachments = [{ name: 'Pantheon of Woe', enhancements: [
      { name: 'Reletavistic Tether', pts: 40, mandatory: 1, req: [{ kw: ['Bravo Character'] }] },
    ] }]
    const w = mountBrowser({ detachments })
    const bravo = w.findAll('.rub-item').find((r) => r.text().includes('Bravo Character'))
    const alpha = w.findAll('.rub-item').find((r) => r.text().includes('Alpha Battleline'))
    expect(bravo.text()).toContain('140') // 100 base + 40 mandatory
    expect(alpha.text()).toContain('80') // unaffected — not this enhancement's unit
  })
})

describe('RosterUnitBrowser — allies', () => {
  const ally = { id: 'imperial-agents:inquisitor', name: 'Inquisitor', flags: { char: true }, kws: ['Character'], sizes: [{ pts: 65, per: [1, 1] }] }
  const locked = { id: 'imperial-knights:armiger-helverin', name: 'Armiger Helverin', kws: ['Armiger'], sizes: [{ pts: 150, per: [1, 1] }] }
  const allies = [
    { key: 'agents', name: 'Agents of the Imperium', ids: [ally.id], lim: { Character: { 'strike-force': 2 } } },
    { key: 'knights', name: 'Imperial Knights', ids: [locked.id], dets: ['Questor Forgepact'] },
  ]
  const battle = { id: 'strike-force', base: 'strike-force', dupLimit: 3 }
  const mountWith = (detachments = []) => mountBrowser({ units: [...units, ally, locked], allies, battle, detachments })

  // An ally is a part of the army in its own right, with its own ceiling — printing it among the
  // Characters would leave nothing on screen saying where its points come from.
  it('lists an allied unit under its group, with the group’s cap', () => {
    const w = mountWith()
    const head = w.findAll('.rub-head').find((h) => h.text().includes('Agents of the Imperium'))
    expect(head.text()).toContain('2× Character')
    const chars = w.findAll('.rub-group').find((g) => g.text().includes('Bravo Character'))
    expect(chars.text()).not.toContain('Inquisitor')
  })

  it('does not offer a group the selected detachment has not unlocked', () => {
    expect(mountWith().text()).not.toContain('Armiger Helverin')
    expect(mountWith([{ name: 'Questor Forgepact', enhancements: [] }]).text()).toContain('Armiger Helverin')
  })
})

// Two ways to make a 90-unit catalogue shorter: what the remaining points can pay for, and what
// the reader says is on their shelf. Both HIDE (this list spends opacity on "not added yet"), and
// both are one tap from off — which is why the count of what went is on screen beside them.
describe('RosterUnitBrowser — the catalogue filters', () => {
  const { collection, toggleOwned } = useCollection()
  const rowFor = (w, name) => w.findAll('.rub-item').find((r) => r.text().includes(name))
  // Budget first when it is offered at all, collection last — see the template.
  const filters = (w) => w.findAll('.rub-filter-list input[type="checkbox"]')
  const tick = (box) => box.setValue(true)

  beforeEach(() => {
    for (const k of Object.keys(collection)) delete collection[k]
    localStorage.clear()
  })

  it('offers no budget toggle without a points figure to compare against', () => {
    expect(filters(mountBrowser())).toHaveLength(1) // the collection one, which always applies
    expect(filters(mountBrowser({ remaining: 100 }))).toHaveLength(2)
  })

  it('offers only what the points left can pay for, and says how much it took away', async () => {
    const w = mountBrowser({ remaining: 85 })
    await tick(filters(w)[0])
    expect(w.text()).toContain('Alpha Battleline') // 80
    expect(w.text()).toContain('Delta Transport') // 75
    expect(w.text()).toContain('Echo Other') // 50, its cheapest bracket
    expect(w.text()).not.toContain('Bravo Character') // 100
    expect(w.text()).not.toContain('Charlie Epic Hero') // 200
    expect(w.find('.rub-hidden').text()).toContain('2')
  })

  // The row carries the "−" button, and a catalogue that drops what you just added — because the
  // budget ran out on it — reads as a bug rather than as a filter.
  it('keeps a unit already in the list on screen, whatever the budget says', async () => {
    const w = mountBrowser({ remaining: 10, addedIds: ['b'] })
    await tick(filters(w)[0])
    expect(w.text()).toContain('Bravo Character')
    expect(w.text()).not.toContain('Alpha Battleline')
    expect(w.find('.rub-hidden').text()).toContain('4')
  })

  it('marks a unit as owned from its row, without opening the preview, and filters by that mark', async () => {
    const w = mountBrowser()
    await rowFor(w, 'Alpha Battleline').find('.rub-star').trigger('click')
    expect(w.find('roster-unit-rules-modal-stub').exists()).toBe(false)
    expect(rowFor(w, 'Alpha Battleline').find('.rub-star').classes()).toContain('on')

    await tick(filters(w).at(-1))
    expect(w.text()).toContain('Alpha Battleline')
    expect(w.text()).not.toContain('Bravo Character')
    expect(w.find('.rub-empty').exists()).toBe(false)
  })

  it('says the list is empty when nothing is marked yet', async () => {
    const w = mountBrowser()
    await tick(filters(w).at(-1))
    expect(w.find('.rub-empty').exists()).toBe(true)
  })

  it('remembers both toggles for the next visit, and opens the fold when one is on', async () => {
    const w = mountBrowser({ remaining: 500 })
    await tick(filters(w)[0])
    const again = mountBrowser({ remaining: 500 })
    expect(filters(again)[0].element.checked).toBe(true)
    expect(filters(again).at(-1).element.checked).toBe(false)
    // A closed fold would hide the switch that is shortening the list.
    expect(again.find('.rub-filters .rub-head').attributes('aria-expanded')).toBe('true')
  })

  it('starts folded away while nothing is filtering', () => {
    expect(mountBrowser({ remaining: 500 }).find('.rub-filters .rub-head').attributes('aria-expanded')).toBe('false')
  })
})

describe('RosterUnitBrowser — an allied unit is owned under ITS faction', () => {
  const { collection } = useCollection()
  const ally = { id: 'imperial-agents:inquisitor', name: 'Inquisitor', flags: { char: true }, kws: ['Character'], sizes: [{ pts: 65, per: [1, 1] }] }
  const allies = [{ key: 'agents', name: 'Agents of the Imperium', ids: [ally.id] }]

  beforeEach(() => {
    for (const k of Object.keys(collection)) delete collection[k]
    localStorage.clear()
  })

  // Browsed inside a Space Marines list, an Inquisitor is still an Imperial Agents datasheet — the
  // shelf is keyed that way, or the ids of two factions would share one bucket.
  it('records the mark against the ally, not against the army browsing it', async () => {
    const w = mountBrowser({ units: [...units, ally], allies })
    await w.findAll('.rub-item').find((r) => r.text().includes('Inquisitor')).find('.rub-star').trigger('click')
    expect(collection['imperial-agents'].inquisitor.name).toBe('Inquisitor')
    expect(collection['space-marines']).toBeUndefined()
  })
})

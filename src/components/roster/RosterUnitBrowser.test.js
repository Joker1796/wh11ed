import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RosterUnitBrowser from './RosterUnitBrowser.vue'

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
})

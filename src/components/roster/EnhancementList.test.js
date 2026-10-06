import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EnhancementList from './EnhancementList.vue'

// The rules sheet's and the list view's enhancements: the texts, and with the list, who wears each.
describe('EnhancementList', () => {
  const enhancements = [
    { name: 'Blade', points: 15, body: 'Sharp.' },
    { name: 'Hide', points: 10, body: 'Tough.' },
    { name: 'Crown', points: 20, body: 'Shiny.' },
  ]
  const defs = { cap: { id: 'cap', name: 'Captain', flags: { char: 1 }, kws: [] }, lt: { id: 'lt', name: 'Lieutenant', flags: { char: 1 }, kws: [] } }
  const list = {
    units: [{ uid: 1, id: 'cap', enh: 'Blade' }, { uid: 2, id: 'lt' }],
    defOf: (id) => defs[id],
    detachments: [{ name: 'D', enhancements: [{ name: 'Blade' }, { name: 'Hide' }, { name: 'Crown', req: [{ kw: ['Vehicle'] }] }] }],
  }

  // The Captain wears the Blade, so the Hide is the Lieutenant's alone to take: one a unit.
  it('says who wears each one, who could, or that nobody can', () => {
    const w = mount(EnhancementList, { props: { enhancements, list } })
    // Each answer as its label and its unit tags.
    const who = w.findAll('.enh-who').map((p) => [p.find('.enh-who-label').exists() ? p.find('.enh-who-label').text() : '', ...p.findAll('.enh-unit').map((u) => u.text()), p.find('.enh-none').exists() ? p.find('.enh-none').text() : ''].filter(Boolean))
    expect(who).toEqual([['Taken by', 'Captain'], ['Can be taken by', 'Lieutenant'], ['No unit in this list can take it.']])
    expect(w.findAll('.enh-who')[0].find('.enh-unit').classes()).toContain('on')
  })

  it('shows the texts alone without the list', () => {
    const w = mount(EnhancementList, { props: { enhancements } })
    expect(w.findAll('.enh')).toHaveLength(3)
    expect(w.find('.enh-who').exists()).toBe(false)
  })
})

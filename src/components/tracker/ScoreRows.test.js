import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ScoreRows from './ScoreRows.vue'

const blocks = [
  { bi: 0, heading: 'Behind Enemy Lines', rows: [{ ri: 0, perEach: true, vp: 3, text: 'For each friendly unit wholly within the enemy deployment zone.' }] },
  { bi: 1, heading: 'Vital Link', rows: [{ ri: 0, vp: 2, text: 'You control one or more central objectives.' }] },
]

// A "per each" row leads with the stepper and its VP as one group, the text after it, so that on
// a phone the text wraps below the group instead of being squeezed to one word a line (owner,
// 2026-10-17: the control on top, as the tick leads its row). The wrap itself is CSS (flex-wrap
// on the row) and is measured by eye on the stand; what this holds is the structure it depends on.
describe('ScoreRows', () => {
  it('puts a per-each row’s stepper and VP first, in one group, and its text after them', () => {
    const w = mount(ScoreRows, { props: { blocks, count: () => 0 } })
    const row = w.find('.m-cond--count')
    expect([...row.element.children].map((e) => e.className)).toEqual(['m-act', 'm-text'])
    const act = row.find('.m-act')
    expect(act.findComponent({ name: 'NumberStepper' }).exists()).toBe(true)
    expect(act.find('.m-vp').text()).toMatch(/^3 VP /)
  })
  it('leaves a ticked row as it was: the box, the text, the VP', () => {
    const w = mount(ScoreRows, { props: { blocks, count: () => 0 } })
    const rows = w.findAll('.m-cond')
    const tick = rows[1]
    expect(tick.classes()).not.toContain('m-cond--count')
    expect([...tick.element.children].map((e) => e.className)).toEqual(['m-check', 'm-text', 'm-vp'])
  })
})

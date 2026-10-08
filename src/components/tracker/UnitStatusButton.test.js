import { describe, it, expect, afterEach } from 'vitest'
import { mount, DOMWrapper } from '@vue/test-utils'
import UnitStatusButton from './UnitStatusButton.vue'

afterEach(() => { document.body.innerHTML = '' })
const body = () => new DOMWrapper(document.body)

// The icon is the answer; the dialog is where it is changed (owner, 2026-10-08).
describe('UnitStatusButton', () => {
  it('shows the status as its icon, and offers the three in a dialog', async () => {
    const w = mount(UnitStatusButton, { props: { status: 'reserve', name: 'Havocs' }, attachTo: document.body })
    expect(w.find('.us-btn').classes()).toContain('us-reserve')
    expect(w.find('.us-btn svg').exists()).toBe(true)
    await w.find('.us-btn').trigger('click')
    const opts = body().findAll('.us-opt')
    expect(opts.map((o) => o.text())).toEqual(['On the battlefield', 'In Strategic Reserves', 'Destroyed'])
    expect(opts[1].attributes('aria-pressed')).toBe('true')
    await opts[2].trigger('click')
    expect(w.emitted('set')).toEqual([['destroyed']])
    expect(body().find('.us-opt').exists()).toBe(false)
  })

  it('opens nothing in a record', async () => {
    const w = mount(UnitStatusButton, { props: { status: 'table', disabled: true }, attachTo: document.body })
    expect(w.find('.us-btn').attributes('disabled')).toBeDefined()
  })
})

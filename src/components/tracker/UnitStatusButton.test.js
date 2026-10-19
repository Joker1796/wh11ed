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
    expect(w.find('.us-btn i').classes()).toContain('wi-unit-reserve')
    await w.find('.us-btn').trigger('click')
    const opts = body().findAll('.us-opt')
    expect(opts.map((o) => o.text())).toEqual(['On the battlefield', 'In Strategic Reserves', 'Destroyed'])
    expect(opts[1].attributes('aria-pressed')).toBe('true')
    await opts[2].trigger('click')
    expect(w.emitted('set')).toEqual([['destroyed']])
    expect(body().find('.us-opt').exists()).toBe(false)
  })

  it('under strict rules a destroyed unit says why and offers nothing else', async () => {
    const w = mount(UnitStatusButton, { props: { status: 'destroyed', name: 'Boyz', lockedWhy: 'Only the last action' }, attachTo: document.body })
    await w.find('.us-btn').trigger('click')
    expect(body().find('.us-why').text()).toBe('Only the last action')
    const opts = body().findAll('.us-opt')
    expect(opts[0].attributes('disabled')).toBeDefined()
    expect(opts[2].attributes('disabled')).toBeUndefined()
  })

  it('opens nothing in a record', async () => {
    const w = mount(UnitStatusButton, { props: { status: 'table', disabled: true }, attachTo: document.body })
    expect(w.find('.us-btn').attributes('disabled')).toBeDefined()
  })
})

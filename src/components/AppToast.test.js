import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('../composables/uiSound.js', () => ({ playSound: vi.fn() }))
const { playSound } = await import('../composables/uiSound.js')
const { default: AppToast } = await import('./AppToast.vue')

describe('AppToast', () => {
  it('allows notices to hide their close button without changing the default', () => {
    const w = mount(AppToast, { props: { show: true, text: 'x' } })
    expect(w.find('.toast-close').exists()).toBe(true)
    const persistent = mount(AppToast, { props: { show: true, text: 'x', dismissible: false } })
    expect(persistent.find('.toast-close').exists()).toBe(false)
  })
  it('sounds an error as it comes up, and nothing else', async () => {
    const w = mount(AppToast, { props: { show: false, text: 'x', tone: 'error' } })
    expect(playSound).not.toHaveBeenCalled()
    await w.setProps({ show: true })
    expect(playSound).toHaveBeenCalledWith('error')
    playSound.mockClear()
    await w.setProps({ show: false })
    await w.setProps({ show: true, tone: '' })
    expect(playSound).not.toHaveBeenCalled()
  })
})

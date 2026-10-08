import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('../composables/uiSound.js', () => ({ playSound: vi.fn() }))
const { playSound } = await import('../composables/uiSound.js')
const { default: AppToast } = await import('./AppToast.vue')

describe('AppToast', () => {
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

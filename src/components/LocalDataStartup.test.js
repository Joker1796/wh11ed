import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { reactive, nextTick } from 'vue'
import LocalDataStartup from './LocalDataStartup.vue'
import { locale } from '../composables/useLocale.js'

afterEach(() => { vi.useRealTimers(); locale.value = 'en' })
const pending = () => reactive({ phase: 'loading', progress: { step: 'copying', done: 12, total: 47,
  rosters: { done: 12, total: 47 }, games: { done: 0, total: 0 } } })

describe('local data startup notice', () => {
  it('does not flash for work completed within half a second', async () => {
    vi.useFakeTimers()
    const state = pending(), wrapper = mount(LocalDataStartup, { props: { state } })
    await vi.advanceTimersByTimeAsync(499)
    expect(wrapper.find('[role=status]').exists()).toBe(false)
    state.phase = 'ready'
    await nextTick()
    await vi.advanceTimersByTimeAsync(1000)
    expect(wrapper.find('[role=status]').exists()).toBe(false)
    wrapper.unmount()
  })
  it('shows actual counts after 500ms, has no dismiss button, and waits for verification', async () => {
    vi.useFakeTimers()
    locale.value = 'ru'
    const state = pending(), wrapper = mount(LocalDataStartup, { props: { state } })
    await vi.advanceTimersByTimeAsync(500)
    expect(wrapper.get('[role=status]').text()).toContain('12 из 47')
    expect(wrapper.find('button').exists()).toBe(false)
    state.progress.rosters.done = state.progress.done = 47
    state.progress.step = 'verifying'
    await nextTick()
    expect(wrapper.text()).toContain('Проверяю сохранённую копию')
    expect(wrapper.find('[role=status]').exists()).toBe(true)
    state.phase = 'ready'
    await nextTick()
    expect(wrapper.find('[role=status]').exists()).toBe(false)
    wrapper.unmount()
  })
  it('gives way to the application error state instead of leaving an endless progress notice', async () => {
    vi.useFakeTimers()
    const state = pending(), wrapper = mount(LocalDataStartup, { props: { state } })
    await vi.advanceTimersByTimeAsync(500)
    state.phase = 'error'
    await nextTick()
    expect(wrapper.find('[role=status]').exists()).toBe(false)
    wrapper.unmount()
  })
})

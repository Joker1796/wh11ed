import { afterEach, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'

const status = ref('warming')
vi.mock('../composables/useOfflineWarmup.js', () => ({
  useOfflineWarmup: () => ({ status, done: ref(3), total: ref(10), isUpdate: ref(true) }),
}))
vi.mock('../composables/uiSound.js', () => ({ playSound: vi.fn() }))
const { default: OfflineWarmupToast } = await import('./OfflineWarmupToast.vue')

afterEach(() => { vi.useRealTimers(); status.value = 'warming' })

it('keeps download progress visible without a close button and dismisses completion automatically', async () => {
  vi.useFakeTimers()
  const wrapper = mount(OfflineWarmupToast)
  expect(wrapper.find('.app-toast').exists()).toBe(true)
  expect(wrapper.find('.toast-close').exists()).toBe(false)
  status.value = 'ready'
  await wrapper.vm.$nextTick()
  await vi.advanceTimersByTimeAsync(4000)
  expect(wrapper.find('.app-toast').exists()).toBe(false)
  status.value = 'warming'
  await wrapper.vm.$nextTick()
  expect(wrapper.find('.app-toast').exists()).toBe(true)
  expect(wrapper.find('.toast-close').exists()).toBe(false)
  wrapper.unmount()
})

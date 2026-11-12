import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { locale } from '../composables/useLocale.js'
import { ref } from 'vue'

const status = ref('warming'), done = ref(3), total = ref(10), isUpdate = ref(true)
vi.mock('../composables/useOfflineWarmup.js', () => ({
  useOfflineWarmup: () => ({ status, done, total, isUpdate }),
}))
vi.mock('../composables/uiSound.js', () => ({ playSound: vi.fn() }))
const { default: OfflineWarmupToast } = await import('./OfflineWarmupToast.vue')

beforeEach(() => { status.value = 'warming'; done.value = 3; total.value = 10; isUpdate.value = true })
afterEach(() => { vi.useRealTimers(); locale.value = 'en' })

it('keeps download progress visible without a close button and dismisses completion automatically', async () => {
  vi.useFakeTimers()
  const wrapper = mount(OfflineWarmupToast)
  expect(wrapper.find('.app-toast').exists()).toBe(true)
  expect(wrapper.find('.toast-close').exists()).toBe(false)
  status.value = 'ready'
  await wrapper.vm.$nextTick()
  await vi.advanceTimersByTimeAsync(4000)
  expect(wrapper.find('.app-toast').exists()).toBe(false)
  done.value = total.value = 0
  status.value = 'warming'
  await wrapper.vm.$nextTick()
  expect(wrapper.text()).toBe('Checking files…')
  expect(wrapper.find('.app-toast').exists()).toBe(true)
  expect(wrapper.find('.toast-close').exists()).toBe(false)
  wrapper.unmount()
})

for (const [lang, checking, checked, downloading, downloaded, ready] of [
  ['en', 'Checking files…', 'Files checked', 'Downloading the update…', 'Update downloaded', 'Ready to use offline'],
  ['ru', 'Проверка файлов…', 'Файлы проверены', 'Загрузка обновления…', 'Обновление загружено', 'Готово к работе офлайн'],
]) {
  it.each([false, true])(`${lang}: checks without 0/0 and confirms a zero-download run (update=%s)`, async update => {
    locale.value = lang; isUpdate.value = update; done.value = total.value = 0
    const wrapper = mount(OfflineWarmupToast)
    expect(wrapper.text()).toBe(checking)
    expect(wrapper.text()).not.toContain('0/0')
    status.value = 'ready'
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toBe(checked)
    wrapper.unmount()
  })
  it(`${lang}: retains actual download progress and completion wording`, async () => {
    locale.value = lang
    const wrapper = mount(OfflineWarmupToast)
    expect(wrapper.text()).toBe(`${downloading} 3/10`)
    done.value = total.value = 10; status.value = 'ready'
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toBe(downloaded)
    isUpdate.value = false
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toBe(ready)
    wrapper.unmount()
  })
}

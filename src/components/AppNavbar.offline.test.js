import { afterEach, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { locale } from '../composables/useLocale.js'

const status = ref('warming'), done = ref(0), total = ref(0)
vi.mock('../composables/useOfflineWarmup.js', () => ({
  useOfflineWarmup: () => ({ status, done, total, bytes: ref(0), warmed: ref(false) }),
  startOfflineWarmup: vi.fn(), loadOfflineSize: vi.fn(),
}))
vi.mock('../composables/workerPolicy.js', () => ({ workerWanted: () => true }))
const AppNavbar = (await import('./AppNavbar.vue')).default

afterEach(() => { locale.value = 'en'; done.value = total.value = 0 })

it.each([['en', 'Checking files…', 'Downloading…'], ['ru', 'Проверка файлов…', 'Скачивание…']])('%s: shows checking in the offline menu until a download count is known', async (lang, checking, downloading) => {
  locale.value = lang
  const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div />' } }] })
  await router.push('/')
  const wrapper = mount(AppNavbar, { global: { plugins: [router] } })
  try {
    await wrapper.get('.settings-btn').trigger('click')
    const item = wrapper.findAll('.settings-item').find(button => button.text() === checking)
    expect(item).toBeDefined()
    expect(item.attributes('disabled')).toBeDefined()
    expect(wrapper.text()).not.toContain('0/0')
    total.value = 4
    await wrapper.vm.$nextTick()
    expect(item.text()).toBe(`${downloading} 0/4`)
    done.value = 2
    await wrapper.vm.$nextTick()
    expect(item.text()).toBe(`${downloading} 2/4`)
  } finally { wrapper.unmount() }
})

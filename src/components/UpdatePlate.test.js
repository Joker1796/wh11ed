import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

vi.mock('../composables/useOfflineWarmup.js', async () => {
  const { ref, computed } = await import('vue')
  const done = ref(3)
  const total = ref(10)
  return {
    topUpOffline: vi.fn(() => Promise.resolve(true)),
    useOfflineWarmup: () => ({ done, total, progress: computed(() => done.value / total.value) }),
  }
})
vi.mock('../composables/standalone.js', () => ({ isStandaloneDisplay: vi.fn(() => false) }))
vi.mock('../composables/workerPolicy.js', () => ({ currentRegistration: vi.fn(async () => null), dropCaches: vi.fn(async () => 0) }))

const { appUpdate, updateFound, applyUpdate, _resetAppUpdate } = await import('../composables/useAppUpdate.js')
const { isStandaloneDisplay } = await import('../composables/standalone.js')
const { topUpOffline, useOfflineWarmup } = await import('../composables/useOfflineWarmup.js')
const { cacheMigration, _resetCacheMigration } = await import('../composables/cacheMigration.js')
const { locale } = await import('../composables/useLocale.js')
const UpdatePlate = (await import('./UpdatePlate.vue')).default

describe('the update plate', () => {
  beforeEach(() => {
    locale.value = 'en'
    useOfflineWarmup().done.value = 3
    useOfflineWarmup().total.value = 10
    _resetAppUpdate()
    _resetCacheMigration()
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ app: '2.9.4' }) })))
  })
  afterEach(() => { vi.unstubAllGlobals(); locale.value = 'en' })

  it('shows nothing while there is nothing new', () => {
    const w = mount(UpdatePlate)
    expect(w.find('.update-plate').exists()).toBe(false)
  })

  it('in a tab: the button at once, the new version named, no way to close it', async () => {
    const apply = vi.fn()
    await updateFound(apply)
    await new Promise((r) => setTimeout(r))
    const w = mount(UpdatePlate)
    await nextTick()
    expect(w.text()).toContain('Update 2.9.4 is out')
    expect(w.find('.wi-close').exists()).toBe(false)
    expect(w.findAll('button')).toHaveLength(1)
    await w.find('button').trigger('click')
    expect(apply).toHaveBeenCalledTimes(1)
    await w.find('button').trigger('click') // a second tap while the reload is coming does nothing
    expect(apply).toHaveBeenCalledTimes(1)
  })

  it('in the installed app: the new files download first, with their count, then the button', async () => {
    isStandaloneDisplay.mockReturnValue(true)
    let finish
    topUpOffline.mockReturnValue(new Promise((r) => { finish = r }))
    const found = updateFound(vi.fn())
    const w = mount(UpdatePlate)
    await nextTick()
    expect(appUpdate.phase).toBe('downloading')
    expect(w.text()).toContain('Downloading the update… 3/10')
    expect(w.find('button').exists()).toBe(false)
    finish(true)
    await found
    await nextTick()
    expect(appUpdate.phase).toBe('ready')
    expect(w.find('button').text()).toBe('Update')
    isStandaloneDisplay.mockReturnValue(false)
  })

  it.each([['en', 'Checking files…'], ['ru', 'Проверка файлов…']])('%s: labels an unknown download count as a check', async (lang, checking) => {
    locale.value = lang
    const { done, total } = useOfflineWarmup()
    done.value = total.value = 0
    appUpdate.phase = 'downloading'
    const w = mount(UpdatePlate)
    expect(w.text()).toBe(checking)
    expect(w.text()).not.toContain('0/0')
    expect(w.find('[role=progressbar]').exists()).toBe(false)
    total.value = 2
    await nextTick()
    expect(w.text()).toContain('0/2')
    expect(w.get('[role=progressbar]').attributes('aria-valuemax')).toBe('2')
    w.unmount()
  })

  it('a download failure offers Continue without claiming readiness', async () => {
    isStandaloneDisplay.mockReturnValue(true)
    topUpOffline.mockReturnValue(Promise.reject(new Error('offline')))
    await updateFound(vi.fn())
    expect(appUpdate.phase).toBe('error')
    const w = mount(UpdatePlate)
    await nextTick()
    expect(w.text()).toContain('Could not finish the update')
    expect(w.find('button').text()).toBe('Continue')
    expect(w.text()).not.toContain('is out')
    isStandaloneDisplay.mockReturnValue(false)
  })

  it('keeps the working build when offline preparation fails, and permits a later successful retry', async () => {
    isStandaloneDisplay.mockReturnValue(true)
    topUpOffline.mockResolvedValue(false)
    const apply = vi.fn()
    await updateFound(apply)
    await applyUpdate()
    expect(apply).not.toHaveBeenCalled()
    expect(appUpdate.phase).toBe('error')
    topUpOffline.mockResolvedValue(true)
    await applyUpdate()
    expect(apply).toHaveBeenCalledTimes(1)
    isStandaloneDisplay.mockReturnValue(false)
  })

  // 2026-10-18: another tab applied the update — the new worker already controls this page.
  it('a worker already in control: verifies the installed offline set before the reload button', async () => {
    isStandaloneDisplay.mockReturnValue(true)
    topUpOffline.mockClear()
    await updateFound(vi.fn(), { version: '2.9.7', inPlace: true })
    expect(topUpOffline).toHaveBeenCalledOnce()
    expect(appUpdate.phase).toBe('ready')
    isStandaloneDisplay.mockReturnValue(false)
  })

  it('a tab with no worker: the version it found, and that the page reopens where it is', async () => {
    await updateFound(vi.fn(), { version: '2.9.6', tab: true })
    const w = mount(UpdatePlate)
    await nextTick()
    expect(w.text()).toContain('Update 2.9.6 is out')
    expect(w.text()).toContain('The page reopens where you are.')
    expect(fetch).not.toHaveBeenCalled() // the number came with it
  })

  it('a tab moved off its worker: its own plate, no way to close it, and what it changes', async () => {
    cacheMigration.phase = 'shown'
    cacheMigration.warmed = true
    const w = mount(UpdatePlate)
    await nextTick()
    expect(w.text()).toContain('I changed how the site is cached')
    expect(w.text()).toContain('Offline is now in the installed app.')
    expect(w.find('.wi-close').exists()).toBe(false)
    await w.find('button').trigger('click')
    await new Promise((r) => setTimeout(r))
    expect(cacheMigration.phase).toBe('done')
    await nextTick()
    expect(w.find('.update-plate').exists()).toBe(false)
  })

  it('an update comes before the move', async () => {
    cacheMigration.phase = 'shown'
    await updateFound(vi.fn(), { version: '2.9.6', tab: true })
    const w = mount(UpdatePlate)
    await nextTick()
    expect(w.text()).toContain('Update 2.9.6 is out')
    expect(w.text()).not.toContain('cached')
  })
})

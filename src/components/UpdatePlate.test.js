import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

vi.mock('../composables/useOfflineWarmup.js', async () => {
  const { ref, computed } = await import('vue')
  const done = ref(3)
  const total = ref(10)
  return {
    topUpOffline: vi.fn(() => Promise.resolve()),
    useOfflineWarmup: () => ({ done, total, progress: computed(() => done.value / total.value) }),
  }
})
vi.mock('../composables/standalone.js', () => ({ isStandaloneDisplay: vi.fn(() => false) }))

const { appUpdate, updateFound, _resetAppUpdate } = await import('../composables/useAppUpdate.js')
const { isStandaloneDisplay } = await import('../composables/standalone.js')
const { topUpOffline } = await import('../composables/useOfflineWarmup.js')
const UpdatePlate = (await import('./UpdatePlate.vue')).default

describe('the update plate', () => {
  beforeEach(() => {
    _resetAppUpdate()
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ app: '2.9.4' }) })))
  })
  afterEach(() => vi.unstubAllGlobals())

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
    finish()
    await found
    await nextTick()
    expect(appUpdate.phase).toBe('ready')
    expect(w.find('button').text()).toBe('Update')
    isStandaloneDisplay.mockReturnValue(false)
  })

  it('a download that fails still ends in the button', async () => {
    isStandaloneDisplay.mockReturnValue(true)
    topUpOffline.mockReturnValue(Promise.reject(new Error('offline')))
    await updateFound(vi.fn())
    expect(appUpdate.phase).toBe('ready')
    isStandaloneDisplay.mockReturnValue(false)
  })
})

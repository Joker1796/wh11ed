import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { ref } from 'vue'

// The toast reads the same useRosterSync refs as RosterCloudBar; the composable is mocked and the
// refs are driven directly.
const h = vi.hoisted(() => ({ state: null }))
vi.mock('../../composables/useRosterSync.js', () => ({ useRosterSync: () => h.state }))
vi.mock('../../composables/useInstallPrompt.js', () => ({ useInstallPrompt: () => ({ iosInstall: ref(false) }) }))

import RosterCloudToast from './RosterCloudToast.vue'

beforeEach(() => {
  vi.useFakeTimers()
  h.state = {
    syncing: ref(false), uploading: ref(false), lastError: ref(null), checked: ref(false),
    pulled: ref(null), savedAt: ref(0), pendingCount: ref(0), enabled: ref(true),
  }
})
afterEach(() => vi.useRealTimers())

const shown = (w) => w.find('.app-toast').exists()

// The answer to Save on a list's view (owner, 2026-09-24): a toast that leaves by itself.
describe('RosterCloudToast', () => {
  it('says "saved" for a fresh save, then goes away by itself', async () => {
    h.state.savedAt.value = Date.now()
    const w = mount(RosterCloudToast)
    expect(shown(w)).toBe(true)
    vi.advanceTimersByTime(3100)
    await flushPromises()
    expect(shown(w)).toBe(false)
  })

  it('does not announce a save older than the page', () => {
    h.state.savedAt.value = Date.now() - 60000
    expect(shown(mount(RosterCloudToast))).toBe(false)
  })

  it('keeps a failure up until it is closed', async () => {
    h.state.lastError.value = 'boom'
    const w = mount(RosterCloudToast)
    vi.advanceTimersByTime(30000)
    await flushPromises()
    expect(shown(w)).toBe(true)
    expect(w.find('.app-toast').classes()).toContain('err')
    await w.find('.toast-close').trigger('click')
    expect(shown(w)).toBe(false)
  })

  it('stays quiet for everything a Save does not produce', () => {
    h.state.checked.value = true
    h.state.pendingCount.value = 2
    expect(shown(mount(RosterCloudToast))).toBe(false)
  })
})

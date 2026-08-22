import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'

// The bar is a state→sentence mapping over useRosterSync's refs, so the composable is mocked and
// the refs are driven directly.
const h = vi.hoisted(() => ({ state: null }))

vi.mock('../../composables/useRosterSync.js', () => ({
  useRosterSync: () => h.state,
}))

import RosterCloudBar from './RosterCloudBar.vue'

beforeEach(() => {
  h.state = {
    syncing: ref(false),
    uploading: ref(false),
    lastError: ref(null),
    checked: ref(false),
    pulled: ref(null),
    savedAt: ref(0),
    pendingCount: ref(0),
    enabled: ref(true),
  }
})

describe('RosterCloudBar', () => {
  it('says nothing on a list page when a signed-in user has nothing to hear', () => {
    const w = mount(RosterCloudBar, { props: { hint: true } })
    expect(w.text()).toBe('')
  })

  it('offers the sign-in hint only where it was asked for', () => {
    expect(mount(RosterCloudBar, { props: { hint: true } }).text()).toBe('')
    h.state.enabled.value = false
    expect(mount(RosterCloudBar, { props: { hint: true } }).text()).not.toBe('')
    expect(mount(RosterCloudBar).text()).toBe('')
  })

  it('reports what the last sync pulled, counting both halves', () => {
    h.state.checked.value = true
    h.state.pulled.value = { added: 2, updated: 1 }
    expect(mount(RosterCloudBar, { props: { hint: true } }).text()).toContain('3')
    // …but not on a single list's page, which is only there to answer a Save.
    expect(mount(RosterCloudBar).text()).toBe('')
  })

  it('answers a Save on the page the Save lands on', () => {
    h.state.savedAt.value = Date.now()
    expect(mount(RosterCloudBar).text()).not.toBe('')
  })

  it('an error outranks everything else and is styled as one', () => {
    h.state.lastError.value = 'boom'
    h.state.pulled.value = { added: 1, updated: 0 }
    const w = mount(RosterCloudBar, { props: { hint: true } })
    expect(w.find('.rc-bar').classes()).toContain('err')
  })
})

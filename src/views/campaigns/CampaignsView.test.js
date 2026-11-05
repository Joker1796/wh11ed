import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'

// The Warmaster's campaigns come from the account. A page opened straight from the address bar
// mounts before the session is back (the refresh on load), and the list was asked for once, on
// mount, with no session yet — it stayed empty until the page was entered again (2026-10-28).
const { status, ensureSession, refreshAccount, campaigns, byId, syncCampaign } = vi.hoisted(() => ({
  status: { value: null },
  ensureSession: vi.fn(async () => {}),
  refreshAccount: vi.fn(async () => {}),
  campaigns: { value: [] },
  byId: vi.fn(() => null),
  syncCampaign: vi.fn(async () => {}),
}))
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useRoute: () => ({ params: { id: 'c1' }, query: {} }),
  RouterLink: { template: '<a><slot /></a>' },
}))
vi.mock('../../composables/useAuth.js', () => ({ useAuth: () => ({ status: status.value, ensureSession }) }))
vi.mock('../../composables/useCampaigns.js', () => ({
  useCampaigns: () => ({
    campaigns: campaigns.value, createCampaign: vi.fn(), refreshAccount, byId, syncCampaign,
    joinCampaign: vi.fn(), watchCampaign: vi.fn(), appendEvent: vi.fn(), deleteCampaign: vi.fn(),
    forgetCampaign: vi.fn(), stateOf: () => null, myPlayer: () => null,
    waitingFor: () => ({ rewards: 0, battles: 0 }), noteWaiting: vi.fn(), syncAll: vi.fn(),
  }),
}))

const CampaignsView = (await import('./CampaignsView.vue')).default
const CampaignView = (await import('./CampaignView.vue')).default
const stubs = { RouterLink: { template: '<a><slot /></a>' }, ConfirmModal: true }

beforeEach(() => {
  status.value = ref('idle')
  campaigns.value = ref([])
  refreshAccount.mockClear()
  syncCampaign.mockClear()
})

describe('campaign pages wait for the session', () => {
  it('the list asks the account for its campaigns once signed in, not before', async () => {
    mount(CampaignsView, { global: { stubs } })
    await flushPromises()
    expect(refreshAccount).not.toHaveBeenCalled()
    status.value.value = 'authed'
    await flushPromises()
    expect(refreshAccount).toHaveBeenCalledTimes(1)
  })

  it('a campaign this device has not seen is fetched from the account once signed in', async () => {
    mount(CampaignView, { global: { stubs } })
    await flushPromises()
    expect(refreshAccount).not.toHaveBeenCalled()
    byId.mockImplementation(() => (refreshAccount.mock.calls.length ? { id: 'c1', role: 'owner' } : null))
    status.value.value = 'authed'
    await flushPromises()
    expect(refreshAccount).toHaveBeenCalledTimes(1)
    expect(syncCampaign).toHaveBeenCalledWith('c1')
  })

  it('a session gone: the page asks to sign in and shows no code', async () => {
    status.value.value = 'anon'
    byId.mockImplementation(() => ({ id: 'c1', role: 'owner' }))
    syncCampaign.mockImplementationOnce(async () => { throw Object.assign(new Error('not_found'), { code: 'not_found' }) })
    const w = mount(CampaignView, { global: { stubs } })
    await flushPromises()
    expect(w.text()).not.toContain('not_found')
    expect(w.vm.signInText).toMatch(/sign in again/i)
    status.value.value = 'authed'
    await flushPromises()
    expect(w.vm.signInText).toBe('')
  })

  it('a known campaign is read only after the session is back', async () => {
    const order = []
    let release
    ensureSession.mockImplementationOnce(() => new Promise((r) => { release = () => { order.push('session'); r() } }))
    syncCampaign.mockImplementation(async () => { order.push('sync') })
    byId.mockImplementation(() => ({ id: 'c1', role: 'owner' }))
    mount(CampaignView, { global: { stubs } })
    await flushPromises()
    expect(syncCampaign).not.toHaveBeenCalled()
    release()
    await flushPromises()
    expect(order).toEqual(['session', 'sync'])
  })
})

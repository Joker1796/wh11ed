import { beforeEach, describe, it, expect, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'

// The push watcher must outlive the component that armed it: init() runs in RoundTracker's
// setup, the player navigates to the stratagems page or a roster mid-game, and the pushes
// must keep flowing — the regression here froze every overlay on the last snapshot delivered
// before the first navigation.

const { current, status, authedFetch } = vi.hoisted(() => {
  const { ref } = require('vue')
  return {
    current: ref(null),
    status: ref('authed'),
    authedFetch: vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 })),
  }
})
vi.mock('./useAuth.js', () => ({ useAuth: () => ({ status, authedFetch }) }))
vi.mock('./useTracker.js', () => ({ useTracker: () => ({ current }) }))
vi.mock('./broadcastPayload.js', () => ({ broadcastPayload: (g) => (g ? { v: 1 } : null) }))

describe('useBroadcast push watcher', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    authedFetch.mockClear()
    current.value = { id: 'g1', broadcast: { token: 't1' }, players: [{}, {}] }
  })

  it('keeps pushing after the component that armed it unmounts', async () => {
    vi.resetModules()
    const { useBroadcast } = await import('./useBroadcast.js')
    const Host = defineComponent({
      setup() {
        useBroadcast().init()
        return () => h('div')
      },
    })
    const w = mount(Host)
    w.unmount() // navigating off the game screen

    current.value.players[0].cp = 3 // a scoring change after the navigation
    await vi.advanceTimersByTimeAsync(2000)

    const putCalls = authedFetch.mock.calls.filter(([path]) => path.startsWith('/broadcast/live/'))
    expect(putCalls.length).toBeGreaterThan(0)
  })
})

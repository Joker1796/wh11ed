import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// Where the login lands. A failed one arrives with `?error=<code>` — it used to be ignored and the
// player sent back as if nothing happened (a player's report, 2026-10-09).
const { replace, refresh, login, query } = vi.hoisted(() => ({
  replace: vi.fn(), refresh: vi.fn(async () => {}), login: vi.fn(), query: { value: {} },
}))
vi.mock('vue-router', () => ({ useRouter: () => ({ replace }), useRoute: () => ({ query: query.value }) }))
vi.mock('../../composables/useAuth.js', () => ({
  useAuth: () => ({ refresh, login, takeReturnPath: () => '/roster' }),
}))

const AuthCallbackView = (await import('./AuthCallbackView.vue')).default
const land = async (q) => {
  query.value = q
  const w = mount(AuthCallbackView)
  await flushPromises()
  return w
}

beforeEach(() => { replace.mockClear(); refresh.mockClear(); login.mockClear() })

describe('AuthCallbackView', () => {
  it('signs in and goes back where the player started', async () => {
    await land({})
    expect(refresh).toHaveBeenCalled()
    expect(replace).toHaveBeenCalledWith('/roster')
  })

  it('says why Yandex refused, and offers another try from the same page', async () => {
    const w = await land({ error: 'unauthorized_client' })
    expect(replace).not.toHaveBeenCalled()
    expect(refresh).not.toHaveBeenCalled()
    expect(w.text()).toContain('child accounts')
    expect(w.text()).toContain('unauthorized_client')
    await w.find('.btn-primary').trigger('click')
    expect(login).toHaveBeenCalledWith('yandex', '/roster')
    await w.find('.btn-ghost').trigger('click')
    expect(replace).toHaveBeenCalledWith('/roster')
  })

  it('names the browser hand-off when our side lost the login', async () => {
    const w = await land({ error: 'missing_state_cookie' })
    expect(w.text()).toContain('came back in another')
  })

  it('a code it does not know still says something, with the code', async () => {
    const w = await land({ error: 'weird_thing' })
    expect(w.text()).toContain('send us the code')
    expect(w.text()).toContain('weird_thing')
  })

  it('a login the player cancelled goes back quietly', async () => {
    const w = await land({ error: 'access_denied' })
    expect(replace).toHaveBeenCalledWith('/roster')
    expect(w.find('.ac-title').exists()).toBe(false)
  })
})

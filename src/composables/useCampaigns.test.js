// The device side of a Dominatus campaign: a link joins (member) or watches (viewer), the log is
// fetched after the last seq it has and folded by the core, the links carry the right tokens.
import { beforeEach, describe, it, expect, vi } from 'vitest'
import { ref, nextTick } from 'vue'

// The session, by hand: signed out unless a test signs in. authedFetch adds the Bearer token the
// way the real one does.
const auth = vi.hoisted(() => ({ status: { value: 'guest' }, user: { value: null } }))
vi.mock('./useAuth.js', () => ({
  useAuth: () => ({
    status: auth.status,
    user: auth.user,
    authedFetch: (path, opts = {}) => fetch(`http://api.test${path}`, {
      ...opts,
      headers: { ...(opts.headers || {}), ...(auth.status.value === 'authed' ? { Authorization: 'Bearer A' } : {}), ...(opts.body ? { 'Content-Type': 'application/json' } : {}) },
    }),
  }),
}))

let mod
const log = []
beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  log.length = 0
  auth.status.value = 'guest'
  auth.user = ref(null)
  vi.stubGlobal('fetch', vi.fn(async (url, opts = {}) => {
    const u = new URL(url)
    const headers = opts.headers || {}
    log.push({ path: u.pathname + u.search, method: opts.method || 'GET', headers })
    if (u.pathname.endsWith('/join')) {
      // Signed out the link only reads (owner, 2026-11-05: playing needs an account).
      return headers.Authorization
        ? new Response(JSON.stringify({ role: 'member', memberId: 'm1', viewToken: 'V'.repeat(22) }), { status: 201 })
        : new Response(JSON.stringify({ role: 'viewer', viewToken: 'V'.repeat(22) }), { status: 200 })
    }
    if (u.pathname === '/campaigns') return new Response(JSON.stringify({ campaigns: [{ campaignId: 'c2', role: 'member', memberId: 'm7', name: 'Hive War', seq: 3, viewToken: 'W'.repeat(22) }] }), { status: 200 })
    if (u.pathname.endsWith('/events') && opts.method !== 'POST') {
      const since = Number(u.searchParams.get('since'))
      const all = [
        { seq: 1, author: 'owner', type: 'created', payload: { name: 'Armageddon', draw: 'app' } },
        { seq: 2, author: 'owner', type: 'player', payload: { id: 'ann', name: 'Ann', alliance: 'liberators' } },
        { seq: 3, author: 'm1', type: 'player', payload: { id: 'm-m1', name: 'Ben', alliance: 'oppressors' } },
      ].filter((e) => e.seq > since)
      if (!all.length) return new Response(null, { status: 204 })
      return new Response(JSON.stringify({ campaign: { campaignId: 'c1', name: 'Armageddon', seq: 3 }, you: { role: 'member', memberId: 'm1' }, events: all }), { status: 200 })
    }
    return new Response('{}', { status: 500 })
  }))
  mod = await import('./useCampaigns.js')
  await (await import('./dominatusMissions.js')).loadDominatusDeck()
})

describe('campaigns on this device', () => {
  it('joins by the invite signed in, reads the log by the account and folds it', async () => {
    auth.status.value = 'authed'
    const c = mod.useCampaigns()
    await c.joinCampaign('c1', 'J'.repeat(22))
    const entry = c.byId('c1')
    expect(entry).toMatchObject({ role: 'member', memberId: 'm1', seq: 3 })
    expect(log[0].headers.Authorization).toBe('Bearer A')
    expect(log[1].headers.Authorization).toBe('Bearer A')
    const state = c.stateOf('c1')
    expect(state.players.map((p) => p.name)).toEqual(['Ann', 'Ben'])
    expect(c.myPlayer(entry, state).name).toBe('Ben')
    expect(JSON.parse(localStorage.getItem('wh11ed-campaigns'))[0].seq).toBe(3)
  })

  it('keeps the reader\'s choices with the campaign, and a sync leaves them alone', async () => {
    auth.status.value = 'authed'
    const c = mod.useCampaigns()
    await c.joinCampaign('c1', 'J'.repeat(22))
    mod.setCampaignPref('c1', 'briefing', 'raiders')
    mod.setCampaignPref('c1', 'tab', 'battles')
    await c.syncCampaign('c1')
    expect(c.byId('c1').prefs).toEqual({ briefing: 'raiders', tab: 'battles' })
    expect(JSON.parse(localStorage.getItem('wh11ed-campaigns'))[0].prefs.briefing).toBe('raiders')
  })

  it('asks only for what is after the last seq, and a 204 changes nothing', async () => {
    auth.status.value = 'authed'
    const c = mod.useCampaigns()
    await c.joinCampaign('c1', 'J'.repeat(22))
    await c.syncCampaign('c1')
    expect(log.at(-1).path).toBe('/campaigns/c1/events?since=3')
    expect(c.byId('c1').events).toHaveLength(3)
  })

  it('hands out the links with their tokens, in the reader\'s path', () => {
    const c = mod.useCampaigns()
    const links = c.linksOf({ id: 'c1', viewToken: 'v', joinToken: 'j' }, 'https://wh-rules.ru', '/ru')
    expect(links).toEqual({ view: 'https://wh-rules.ru/ru/campaigns/dominatus/c1?t=v', join: 'https://wh-rules.ru/ru/campaigns/dominatus/c1?join=j' })
  })

  it('signed out, the invite makes a reader that keeps the link and joins nobody', async () => {
    const c = mod.useCampaigns()
    await c.joinCampaign('c1', 'J'.repeat(22))
    expect(c.byId('c1')).toMatchObject({ role: 'viewer', viewToken: 'V'.repeat(22), invite: 'J'.repeat(22) })
    expect(log[1].headers['X-Campaign-View']).toBe('V'.repeat(22))
    expect(c.myPlayer(c.byId('c1'), c.stateOf('c1'))).toBeNull()
  })

  it('opening the invite again on a device that plays there mints no second member', async () => {
    auth.status.value = 'authed'
    const c = mod.useCampaigns()
    await c.joinCampaign('c1', 'J'.repeat(22))
    await c.joinCampaign('c1', 'J'.repeat(22))
    expect(log.filter((x) => x.path.endsWith('/join'))).toHaveLength(1)
  })

  it('takes up the invite on sign-in, and brings the campaigns the account plays in', async () => {
    const c = mod.useCampaigns()
    await c.joinCampaign('c1', 'J'.repeat(22))
    auth.status.value = 'authed'
    await c.refreshAccount()
    const joins = log.filter((x) => x.path === '/campaigns/c1/join')
    expect(joins).toHaveLength(2)
    expect(joins[1].headers.Authorization).toBe('Bearer A')
    expect(c.byId('c1')).toMatchObject({ role: 'member', memberId: 'm1' })
    expect(c.byId('c1').invite).toBeUndefined()
    expect(c.byId('c2')).toMatchObject({ role: 'member', memberId: 'm7', name: 'Hive War' })
  })

  // Owner, 2026-11-05: the Warmaster's forms showed under whatever account was signed in.
  it('holds the Warmaster\'s credential while another account is signed in, and gives it back', async () => {
    const you = { alice: { role: 'owner', memberId: null }, bob: { role: 'viewer', memberId: null } }
    const events = [{ seq: 1, author: 'owner', type: 'created', payload: { name: 'Armageddon', draw: 'app' } }]
    vi.stubGlobal('fetch', vi.fn(async (url, opts = {}) => {
      const u = new URL(url)
      log.push({ path: u.pathname + u.search, headers: opts.headers || {} })
      if (u.pathname === '/campaigns' && opts.method === 'POST') return new Response(JSON.stringify({ campaignId: 'c1', viewToken: 'V'.repeat(22), joinToken: 'J'.repeat(22) }), { status: 201 })
      const since = Number(u.searchParams.get('since'))
      const after = events.filter((e) => e.seq > since)
      if (!after.length) return new Response(null, { status: 204 })
      return new Response(JSON.stringify({ campaign: { campaignId: 'c1', name: 'Armageddon', seq: 1 }, you: you[auth.user.value.id], events: after }), { status: 200 })
    }))
    auth.status.value = 'authed'
    auth.user.value = { id: 'alice', displayName: 'Alice' }
    const c = mod.useCampaigns()
    await c.createCampaign('Armageddon')
    expect(c.byId('c1')).toMatchObject({ role: 'owner', account: 'alice', accountName: 'Alice' })

    auth.user.value = { id: 'bob', displayName: 'Bob' }
    await nextTick()
    expect(c.byId('c1')).toMatchObject({ role: 'viewer', heldRole: 'owner', account: 'alice' })
    // The read asks for the last event again, and sends the view token beside the account.
    log.length = 0
    await c.syncCampaign('c1')
    expect(log[0].path).toContain('since=0')
    expect(log[0].headers['X-Campaign-View']).toBe('V'.repeat(22))
    expect(c.byId('c1').role).toBe('viewer')

    auth.user.value = { id: 'alice', displayName: 'Alice' }
    await nextTick()
    expect(c.byId('c1')).toMatchObject({ role: 'owner', account: 'alice' })
    expect(c.byId('c1').heldRole).toBeUndefined()
  })

  it('learns whose an entry from before the account was recorded is, from the server', async () => {
    localStorage.setItem('wh11ed-campaigns', JSON.stringify([{ id: 'c1', role: 'owner', viewToken: 'V'.repeat(22), seq: 3, events: [] }]))
    vi.resetModules()
    mod = await import('./useCampaigns.js')
    auth.status.value = 'authed'
    auth.user.value = { id: 'bob', displayName: 'Bob' }
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ campaign: { campaignId: 'c1', name: 'Armageddon', seq: 3 }, you: { role: 'viewer', memberId: null }, events: [] }), { status: 200 })))
    const c = mod.useCampaigns()
    await c.syncCampaign('c1')
    expect(c.byId('c1')).toMatchObject({ role: 'viewer', heldRole: 'owner' })
  })
})

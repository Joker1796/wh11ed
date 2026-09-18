import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'

// The client half of the multi-device sync (hub journal 2026-09-16-multi-device-sync): what a tick
// sends, what it takes, and when it asks at all. The server is a scripted fetch; the store is the
// real one, so a remote slice lands through applyRemote and the deep watcher fires as it would.

const { status, authedFetch } = vi.hoisted(() => {
  const { ref } = require('vue')
  return {
    status: ref('authed'),
    authedFetch: vi.fn(),
  }
})
vi.mock('./useAuth.js', () => ({ useAuth: () => ({ status, authedFetch }) }))

let mod, trackerMod, tracker, party, fetchMock, D0, D1

// One answer per request, in order; the tests inspect `fetchMock.mock.calls` for what went out.
function answer(statusCode, body) {
  return new Response(body === undefined ? null : JSON.stringify(body), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  })
}
function lastRequest() {
  const [url, init] = fetchMock.mock.calls.at(-1)
  return { url, method: init?.method, body: init?.body ? JSON.parse(init.body) : null, headers: init?.headers || {} }
}

// init() hangs listeners on document/window for the life of the app; vi.resetModules() gives each
// test a fresh module but cannot take the previous one's listeners down, and a stale module's
// farewell send would count against the next test. Record them, remove them.
const listeners = []
function recordListeners(target) {
  const orig = target.addEventListener.bind(target)
  vi.spyOn(target, 'addEventListener').mockImplementation((type, fn, opts) => {
    listeners.push([target, type, fn])
    orig(type, fn, opts)
  })
}

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  vi.useFakeTimers()
  recordListeners(document)
  recordListeners(window)
  fetchMock = vi.fn(async () => answer(204))
  vi.stubGlobal('fetch', fetchMock)
  trackerMod = await import('./useTracker.js')
  tracker = trackerMod.useTracker()
  mod = await import('./useParty.js')
  party = mod.useParty()
  D0 = trackerMod.DISPOSITIONS[0].id
  D1 = trackerMod.DISPOSITIONS[1].id
  tracker.newGame({
    settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', twist: null, twistMission: null },
    players: [
      { name: 'Me', factionSlug: null, detachments: [], disposition: D0, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
      { name: 'Opp', factionSlug: null, detachments: [], disposition: D1, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
    ],
  })
  await vi.advanceTimersByTimeAsync(600)
})
afterEach(() => {
  for (const [target, type, fn] of listeners.splice(0)) target.removeEventListener(type, fn)
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

async function shareAsHost() {
  authedFetch.mockResolvedValueOnce(
    answer(201, {
      partyId: 'p1',
      memberId: 'm-host',
      memberToken: 'tok-host',
      seq: 1,
      status: 'open',
      versions: { shared: 1, side0: 1, side1: 1, roster0: 1, roster1: 1 },
      you: { memberId: 'm-host', side: 0, mi: null, host: true },
      invite: { token: 'inv', code: '123456', codeExpiresAt: '2099-01-01T00:00:00Z' },
    }),
  )
  expect(await party.share()).toBe(true)
  // Wait out the watcher's send delay: the share itself changes the game (the handle is written
  // into it), and that must not go out as a change.
  await vi.advanceTimersByTimeAsync(1000)
  fetchMock.mockClear()
}

describe('sharing', () => {
  it('puts the handle in the game, the cut in the base, and sends nothing for it', async () => {
    await shareAsHost()
    const g = tracker.current.value
    expect(g.party).toMatchObject({ id: 'p1', token: 'tok-host', side: 0, host: true, seq: 1 })
    expect(JSON.parse(localStorage.getItem('wh11ed-party-base')).partyId).toBe('p1')
    expect(fetchMock).not.toHaveBeenCalled()
    expect(party.canEdit(0)).toBe(true)
    expect(party.canEdit(1)).toBe(true) // the host edits any side
  })

  it('refuses without an account', async () => {
    status.value = 'anon'
    expect(await party.share()).toBe(false)
    status.value = 'authed'
  })

  it('a side another phone sits on is off limits to the host too, until the seat is freed', async () => {
    await shareAsHost()
    fetchMock.mockResolvedValueOnce(answer(200, { seq: 2, status: 'open', you: { side: 0, mi: null, host: true }, held: [1], written: {}, slices: {} }))
    party.attach()
    await vi.advanceTimersByTimeAsync(100)
    expect(tracker.current.value.party.held).toEqual([1])
    expect(party.canEdit(0)).toBe(true)
    expect(party.canEdit(1)).toBe(false)
    // The RIGHT is unchanged: a setup edit that touches the guest's side still goes out.
    fetchMock.mockResolvedValueOnce(answer(200, { seq: 3, status: 'open', you: { side: 0, mi: null, host: true }, held: [1], written: { side1: 2 }, slices: {} }))
    tracker.setCp(1, 9)
    await vi.advanceTimersByTimeAsync(900)
    expect(Object.keys(lastRequest().body.slices)).toEqual(['side1'])
    // The host's own switch keeps both sides open on its phone, held or not.
    party.setScoreAll(true)
    expect(party.canEdit(1)).toBe(true)
    party.setScoreAll(false)
    expect(party.canEdit(1)).toBe(false)
    // Kicked: the next answer says nobody holds it.
    fetchMock.mockResolvedValueOnce(answer(200, { seq: 4, status: 'open', you: { side: 0, mi: null, host: true }, held: [], written: {}, slices: {} }))
    await vi.advanceTimersByTimeAsync(4000)
    expect(party.canEdit(1)).toBe(true)
    party.detach()
  })
})

describe('a tick', () => {
  it('sends only the slices that changed, based on their versions, and takes the written versions back', async () => {
    await shareAsHost()
    fetchMock.mockResolvedValueOnce(answer(200, { seq: 2, status: 'open', you: { side: 0, mi: null, host: true }, written: { side0: 2 }, slices: {} }))
    tracker.setCp(0, 4)
    await vi.advanceTimersByTimeAsync(900)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const req = lastRequest()
    expect(req.url).toMatch(/\/party\/p1\/sync$/)
    expect(req.headers.Authorization).toBe('Bearer tok-host')
    expect(req.body.since).toBe(1)
    expect(Object.keys(req.body.slices)).toEqual(['side0'])
    expect(req.body.slices.side0.version).toBe(1)
    expect(req.body.slices.side0.data.cp).toBe(4)
    expect(req.body.slices.side0.data).not.toHaveProperty('isYou')
    expect(tracker.current.value.party.versions.side0).toBe(2)
    expect(tracker.current.value.party.seq).toBe(2)
    // Nothing changed since: the next send has nothing to say and costs no request.
    await vi.advanceTimersByTimeAsync(900)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('applies the other side\'s slice and does not echo it back', async () => {
    await shareAsHost()
    const remoteSide1 = { ...JSON.parse(JSON.stringify(tracker.current.value.players[1])), cp: 7 }
    delete remoteSide1.isYou
    delete remoteSide1.roster
    delete remoteSide1.rosterId
    fetchMock.mockResolvedValueOnce(answer(200, { seq: 3, status: 'open', you: { side: 0, mi: null, host: true }, written: {}, slices: { side1: { version: 2, data: remoteSide1 } } }))
    party.attach() // the live screen is up → this polls at once
    await vi.advanceTimersByTimeAsync(10)
    expect(tracker.current.value.players[1].cp).toBe(7)
    expect(tracker.current.value.players[1].isYou).toBe(false)
    expect(tracker.current.value.party.versions.side1).toBe(2)
    fetchMock.mockClear()
    await vi.advanceTimersByTimeAsync(1000)
    expect(fetchMock).not.toHaveBeenCalled() // the incoming slice is the base now, not a change
    party.detach()
  })

  it('on 409 the server wins: its slices replace this phone\'s change', async () => {
    await shareAsHost()
    const server = JSON.parse(JSON.stringify(tracker.current.value.players[0]))
    delete server.isYou; delete server.roster; delete server.rosterId
    server.cp = 2
    fetchMock.mockResolvedValueOnce(answer(409, { error: 'version_conflict', stale: ['side0'], seq: 5, status: 'open', you: { side: 0, mi: null, host: true }, slices: { side0: { version: 3, data: server } } }))
    tracker.setCp(0, 9)
    await vi.advanceTimersByTimeAsync(900)
    expect(tracker.current.value.players[0].cp).toBe(2)
    expect(tracker.current.value.party.versions.side0).toBe(3)
    expect(tracker.current.value.party.seq).toBe(5)
    expect(party.status.value).not.toBe('error')
  })

  it('a slice this phone may not write snaps back instead of going out', async () => {
    await shareAsHost()
    // Demote this phone to a guest on side 1.
    tracker.current.value.party.host = false
    tracker.current.value.party.side = 1
    await vi.advanceTimersByTimeAsync(900)
    fetchMock.mockClear()
    tracker.setCp(0, 5) // the other side's CP — a control the screen has disabled
    await vi.advanceTimersByTimeAsync(900)
    expect(fetchMock).not.toHaveBeenCalled()
    expect(tracker.current.value.players[0].cp).toBe(0)
    expect(party.canEdit(0)).toBe(false)
    expect(party.canEdit(1)).toBe(true)
  })

  it('a revoked token stops the engine and marks the phone out', async () => {
    await shareAsHost()
    fetchMock.mockResolvedValueOnce(answer(401, { error: 'revoked' }))
    tracker.setCp(0, 1)
    await vi.advanceTimersByTimeAsync(900)
    expect(party.status.value).toBe('revoked')
    expect(party.active.value).toBe(false)
    expect(party.canEdit(1)).toBe(true) // the game is this phone's own again
    fetchMock.mockClear()
    tracker.setCp(0, 2)
    await vi.advanceTimersByTimeAsync(5000)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})

describe('the gate', () => {
  it('polls only while a live screen is attached, at once on attach, and sends pending on detach', async () => {
    await shareAsHost()
    await vi.advanceTimersByTimeAsync(7000)
    expect(fetchMock).not.toHaveBeenCalled() // nothing changed, no screen: silence
    party.attach()
    await vi.advanceTimersByTimeAsync(10)
    expect(fetchMock).toHaveBeenCalledTimes(1) // the immediate poll
    expect(lastRequest().body).toEqual({ since: 1 })
    await vi.advanceTimersByTimeAsync(3100)
    expect(fetchMock).toHaveBeenCalledTimes(2) // the tick
    party.detach()
    fetchMock.mockClear()
    await vi.advanceTimersByTimeAsync(7000)
    expect(fetchMock).not.toHaveBeenCalled()
    tracker.setCp(0, 3)
    await vi.advanceTimersByTimeAsync(900)
    expect(fetchMock).toHaveBeenCalledTimes(1) // a change still goes out; only the listening stopped
  })

  it('a hidden page sends what it has with keepalive and stops polling', async () => {
    await shareAsHost()
    party.attach()
    await vi.advanceTimersByTimeAsync(10)
    fetchMock.mockClear()
    tracker.setCp(0, 6)
    fetchMock.mockResolvedValueOnce(answer(200, { seq: 2, status: 'open', you: { side: 0, mi: null, host: true }, written: { side0: 2 }, slices: {} }))
    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true })
    document.dispatchEvent(new Event('visibilitychange'))
    await vi.advanceTimersByTimeAsync(10)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1].keepalive).toBe(true)
    expect(lastRequest().body.slices.side0.data.cp).toBe(6)
    await vi.advanceTimersByTimeAsync(7000)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true })
    document.dispatchEvent(new Event('visibilitychange'))
    await vi.advanceTimersByTimeAsync(10)
    expect(fetchMock).toHaveBeenCalledTimes(2) // back: at once
    party.detach()
  })
})

describe('joining', () => {
  it('assembles the game from the server\'s slices with this phone as the chosen side', async () => {
    const { sliceGame } = await import('./gameSlices.js')
    const slices = sliceGame(tracker.current.value)
    const joined = {
      partyId: 'p9',
      memberId: 'm-guest',
      memberToken: 'tok-guest',
      seq: 4,
      status: 'open',
      slices: Object.fromEntries(Object.entries(slices).map(([n, data]) => [n, { version: 2, data }])),
      members: [],
      you: { memberId: 'm-guest', side: null, mi: null, host: false },
    }
    tracker.discardGame()
    fetchMock.mockResolvedValueOnce(answer(200, { seq: 5, you: { memberId: 'm-guest', side: 1, mi: null, host: false } }))
    expect(await party.takeSeat(joined, { side: 1, name: 'Opp' })).toBeNull()
    const g = tracker.current.value
    expect(g.players.map((p) => p.isYou)).toEqual([false, true])
    expect(g.party).toMatchObject({ id: 'p9', token: 'tok-guest', side: 1, host: false, seq: 5 })
    expect(g.party.versions.side1).toBe(2)
    expect(party.canEdit(1)).toBe(true)
    expect(party.canEdit(0)).toBe(false)
    expect(party.canResume.value).toBe(false)
    fetchMock.mockClear()
    await vi.advanceTimersByTimeAsync(1000)
    expect(fetchMock).not.toHaveBeenCalled() // the assembled game IS the base
  })

  it('a refused seat reports why and changes nothing', async () => {
    const before = tracker.current.value.id
    fetchMock.mockResolvedValueOnce(answer(409, { error: 'seat_taken', heldBy: { name: 'X' } }))
    expect(await party.takeSeat({ partyId: 'p9', memberId: 'm', memberToken: 'x'.repeat(43), slices: {}, seq: 1 }, { side: 0 })).toBe('seat_taken')
    expect(tracker.current.value.id).toBe(before)
  })
})

describe('leaving', () => {
  it('archiving the game frees a guest\'s seat, and ends a host\'s party', async () => {
    await shareAsHost()
    party.init()
    fetchMock.mockResolvedValueOnce(answer(204))
    tracker.archiveGame()
    await vi.advanceTimersByTimeAsync(10)
    expect(lastRequest().url).toMatch(/\/party\/p1$/)
    expect(lastRequest().method).toBe('DELETE')
    expect(tracker.history.value[0].party).toBeUndefined()
    expect(party.status.value).toBe('off')
  })


  it('a guest tells the server and the game is its own again', async () => {
    await shareAsHost()
    tracker.current.value.party.host = false
    fetchMock.mockResolvedValueOnce(answer(204))
    await party.leave()
    expect(lastRequest().url).toMatch(/\/party\/p1\/leave$/)
    expect(tracker.current.value.party).toBeUndefined()
    expect(party.status.value).toBe('off')
    expect(localStorage.getItem('wh11ed-party-base')).toBeNull()
  })
})

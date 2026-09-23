import { beforeEach, describe, it, expect, vi } from 'vitest'
import { ref, computed } from 'vue'

// The lobby protocol on its own: who edits a side, what "Done" does, and how a request to
// reopen is answered. `useParty` is mocked down to the two things this reads — the handle and
// the send hold — so the rules can be checked without a server or a sync loop.

const party = ref(null)
const holdCalls = []
const syncCalls = []
vi.mock('./useParty.js', () => ({
  useParty: () => ({
    party: computed(() => party.value),
    active: computed(() => !!party.value),
    isHost: computed(() => !!party.value?.host),
    setHold: (on) => holdCalls.push(on),
    sync: async () => { syncCalls.push(holdCalls.at(-1)) },
  }),
}))

let tracker, useLobby

function lobbyGame() {
  tracker.startLobby({
    settings: { gameType: 'singles' },
    players: [{ name: 'Host' }, { name: 'Guest' }],
  })
}
function as(handle) {
  party.value = handle
  return useLobby()
}
const HOST = { id: 'p1', memberId: 'm-host', side: 0, mi: null, host: true }
const GUEST = { id: 'p1', memberId: 'm-guest', side: 1, mi: null, host: false }
const PARTNER = { id: 'p1', memberId: 'm-partner', side: 1, mi: 1, host: false }

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  holdCalls.length = 0
  syncCalls.length = 0
  party.value = null
  const t = await import('./useTracker.js')
  tracker = t.useTracker()
  ;({ useLobby } = await import('./useLobby.js'))
  lobbyGame()
})

describe('one editor per side', () => {
  it('the first phone to claim a side keeps it; the second is a spectator of that form', () => {
    const guest = as(GUEST)
    expect(guest.isEditor(1)).toBe(true) // nobody holds it yet, and it is this phone's seat
    guest.claim(1, 'Guest')

    const partner = as(PARTNER)
    expect(partner.isEditor(1)).toBe(false)
    expect(partner.claim(1, 'Partner')).toBe(false) // a claim never steals
    expect(partner.editorName(1)).toBe('Guest')
  })

  it('the right moves by handing it over, or by taking it — never by claiming', () => {
    as(GUEST).claim(1, 'Guest')
    const partner = as(PARTNER)
    partner.takeOver(1, 'Partner')
    expect(partner.isEditor(1)).toBe(true)
    expect(as(GUEST).isEditor(1)).toBe(false)
  })

  it('the host edits any side no one else holds, and only those', () => {
    const host = as(HOST)
    expect(host.isEditor(0)).toBe(true)
    expect(host.isEditor(1)).toBe(true) // nobody has joined — the host fills it in
    as(GUEST).claim(1, 'Guest')
    expect(as(HOST).isEditor(1)).toBe(false)
  })

  it('with no party at all every side is this phone’s', () => {
    party.value = null
    const solo = useLobby()
    expect(solo.isEditor(0)).toBe(true)
    expect(solo.isEditor(1)).toBe(true)
  })
})

describe('done, and asking to change it', () => {
  it('the form holds the side back and "Done" releases it', async () => {
    const guest = as(GUEST)
    await guest.openForm(1, 'Guest')
    expect(holdCalls.at(-1)).toBe(true)
    expect(guest.isReady(1)).toBe(false)

    guest.confirmSide(1)
    expect(holdCalls.at(-1)).toBe(false)
    expect(guest.isReady(1)).toBe(true)
  })

  it('while the host is still on the lobby screen or the armies step a change is simply taken', async () => {
    const guest = as(GUEST)
    await guest.openForm(1, 'Guest')
    guest.confirmSide(1)
    expect(guest.canReopenFreely.value).toBe(true)
    await guest.reopen(1, 'Guest')
    expect(guest.isReady(1)).toBe(false)
  })

  it('once the host has moved on it becomes a request, and the host answers it', () => {
    const host = as(HOST)
    as(GUEST).confirmSide(1)
    host.setStage('host')

    const guest = as(GUEST)
    expect(guest.canReopenFreely.value).toBe(false)
    guest.requestReopen(1)
    expect(guest.myRequestPending.value).toBe(true)

    const h = as(HOST)
    expect(h.pendingRequest.value.side).toBe(1)
    h.denyReopen(1)
    expect(as(GUEST).myRequestDenied.value).toBe(true)
    expect(as(GUEST).myRequestPending.value).toBe(false)

    // Allowing it reopens the side and takes both phones back to the armies step.
    as(GUEST).requestReopen(1)
    as(HOST).grantReopen(1)
    expect(as(GUEST).isReady(1)).toBe(false)
    expect(as(HOST).stage.value).toBe('armies')
  })
})

describe('claiming is announced, typing is not', () => {
  it('the claim is sent before the hold goes on — otherwise the side looks free while it is being filled in', async () => {
    const guest = as(GUEST)
    await guest.openForm(1, 'Guest')
    // The one send during openForm happened with the hold OFF, and the hold is on afterwards.
    expect(syncCalls).toEqual([false])
    expect(holdCalls.at(-1)).toBe(true)
    expect(guest.editorName(1)).toBe('Guest')
  })
})

describe('what the host waits for', () => {
  it('a side someone else fills in must confirm; one nobody sits on never blocks', () => {
    const host = as(HOST)
    expect(host.othersReady.value).toBe(true) // no guest yet — the host fills that side in
    as(GUEST).claim(1, 'Guest')
    expect(as(HOST).othersReady.value).toBe(false)
    as(GUEST).confirmSide(1)
    expect(as(HOST).othersReady.value).toBe(true)
  })
})

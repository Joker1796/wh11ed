import { ref, computed, watch, effectScope } from 'vue'
import { useAuth } from './useAuth.js'
import { useTracker } from './useTracker.js'
import { sliceGame, assembleGame, stableJson, sideOfSlice, SLICE_NAMES } from './gameSlices.js'
import { API_BASE_URL } from '../config.js'

// One game on several phones. The host — the only one who needs an account — shares the game in
// progress; the others join by link, QR or a six-digit code and take a seat. What is shared is the
// GAME, never the navigation: one player can sit on the secondaries while another reads the main
// board. The server is the authority, the host owns the rights, and this module is the whole
// client side of it: the handshake, the gate that decides when to poll, and the standing every
// screen reads (`canEdit`, `status`).
//
// HOW IT MOVES. The game is cut into five slices (gameSlices.js); each has a version on the server.
// A tick sends the slices this phone changed since it last synced — found by comparing the game's
// current cut against `base`, the cut as the server last saw it — together with `since`, the last
// party seq it saw, and gets back every slice someone ELSE changed. One request, both directions,
// because the gateway charges per request. A stale version anywhere in the batch is a 409 with the
// server's state, and the server wins: this phone replaces its copies and its own change is gone —
// a tap the player will notice and repeat, which is the honest outcome when two partners edit one
// side in the same three seconds. Nothing is queued: offline, the game keeps changing locally as it
// always did, `base` stays where it was, and the first tick back sends the accumulated difference.
//
// THE GATE is on receiving only. A phone polls while it shows the LIVE game (the game screen or
// the roster of the game in progress — that screen writes rule switches, so it is live too), is
// visible and online. Leaving that screen or locking the phone stops the polling — and sends one
// last time first, so a score corrected a second before the lock does not sit on the phone until
// it is unlocked. Coming back polls immediately, not on the next tick. A finished game polls
// slowly: the host may reopen it, and a guest who stopped listening would never learn.
//
// The party handle lives INSIDE the game (`current.party`) like the broadcast token does, so it
// survives reloads through the tracker's own persistence; the base cut lives beside it in its own
// key, because it is bookkeeping about the game and not the game.

const TICK_MS = 3000 // the cadence, and the server's micro-cache window — the two are one number
const FINISHED_TICK_MS = 15000
const BACKGROUND_TICK_MS = 10000 // the host feeding a broadcast from another screen
const SEND_DELAY_MS = 800 // a burst of taps goes out as one write
const BUSY_AFTER_MS = 400 // the spinner is shown only for a request that is taking a while
const BASE_KEY = 'wh11ed-party-base'

// 'off' — not in a party; 'ok' — in sync; 'busy' — a request has been in flight a while;
// 'paused' — in a party but not polling (off the live screen / hidden); 'offline' — the last
// request could not reach the server; 'readonly' — the game is finished and this phone cannot
// reopen it; 'revoked' — the host removed this phone; 'ended' — the host ended the party;
// 'error' — the server answered something this code does not expect.
const status = ref('off')
const lastError = ref(null)
const lastSyncAt = ref(null)
const members = ref([])
const invite = ref(null) // { token, code, codeExpiresAt } — the host's, while the dialog is open
let base = {} // slice name → stableJson as the server last saw it
let baseFor = null // the party id `base` belongs to
let inFlight = null
let dirty = false
let sendTimer = null
let pollTimer = null
let busyTimer = null
let attached = 0 // how many live screens are mounted
let engineArmed = false
let leaving = false
let lastHandle = null // the party as last seen on the game, for the farewell when the game goes

function api(path) {
  return `${API_BASE_URL}${path}`
}

function loadBase(partyId) {
  try {
    const raw = JSON.parse(localStorage.getItem(BASE_KEY) || 'null')
    if (raw && raw.partyId === partyId && raw.base) return raw.base
  } catch { /* ignore */ }
  return null
}
function saveBase() {
  try {
    if (baseFor) localStorage.setItem(BASE_KEY, JSON.stringify({ partyId: baseFor, base }))
    else localStorage.removeItem(BASE_KEY)
  } catch { /* ignore */ }
}

export function useParty() {
  const { status: authStatus, authedFetch } = useAuth()
  const { current, applyRemote } = useTracker()

  const party = computed(() => current.value?.party || null)
  const active = computed(() => !!party.value && !party.value.revoked && !party.value.ended)
  const isHost = computed(() => !!party.value?.host)
  const canShare = computed(() => authStatus.value === 'authed')

  // Two different questions, deliberately. `canWriteSlice` is the RIGHT — what the server lets
  // this phone write: the host any slice, a seated guest its own side and the shared slice. `canEdit`
  // is what the screen lets this phone TOUCH: its own side, and a side no other phone is playing.
  // The host has the right to the guest's side (editing the setup rewrites both sides at once), but
  // a side someone sits on (`party.held`, from the server with every sync) is theirs on the host's
  // screen too — one rule for everyone, "your side is yours", instead of a permission matrix. The
  // host takes a held side back by freeing the seat in the sharing dialog — or, by choice, keeps
  // both sides open on its own phone (`party.scoreAll`, the dialog's one switch; local to the
  // handle, never synced, off by default — asked for by the owner 2026-09-18 so a host can score
  // for a guest who is only watching). With no party at all every screen edits as it always has.
  function canEdit(pi) {
    const p = party.value
    if (!p || p.revoked || p.ended) return true
    if (p.side === pi) return true
    if (!p.host) return false
    return !!p.scoreAll || !(p.held || []).includes(pi)
  }
  function setScoreAll(on) {
    const p = current.value?.party
    if (p && p.host) p.scoreAll = !!on
  }
  function canWriteSlice(name) {
    const p = party.value
    if (p.host) return true
    if (p.side == null) return false
    const side = sideOfSlice(name)
    return side == null || side === p.side
  }
  // Only the host reopens a finished shared game (the server refuses everyone else).
  const canResume = computed(() => !active.value || isHost.value)

  // ── The request ─────────────────────────────────────────────────────────────────────────────

  async function memberFetch(path, body, { keepalive = false } = {}) {
    const p = party.value
    return fetch(api(`/party/${encodeURIComponent(p.id)}${path}`), {
      method: body === undefined ? 'GET' : 'POST',
      keepalive,
      headers: {
        Authorization: `Bearer ${p.token}`,
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    })
  }

  function setBase(name, json, version) {
    base[name] = json
    if (version != null && current.value?.party) current.value.party.versions[name] = version
  }

  // A slice the server sent lands through the store's one door, and becomes the new base — so
  // the deep watcher's next look finds nothing of ours to send.
  function takeRemote(name, slice) {
    if (!slice) return
    applyRemote(name, slice.data)
    setBase(name, stableJson(sliceGame(current.value)[name]), slice.version)
  }

  // A seat moved by the host: the flag every label reads follows it.
  function takeStanding(you, held) {
    const p = current.value?.party
    if (!p) return
    if (Array.isArray(held) && stableJson(held) !== stableJson(p.held || [])) p.held = [...held]
    if (!you) return
    if (p.side !== you.side || p.mi !== you.mi || p.host !== you.host) {
      p.side = you.side
      p.mi = you.mi
      p.host = you.host
      if (you.side != null) current.value.players.forEach((pl, i) => { pl.isYou = i === you.side })
    }
  }

  function takeStatus(s) {
    const p = current.value?.party
    if (p) p.status = s
  }

  // The tick: what changed here goes out, what changed elsewhere comes in. `poll` is the timer's
  // call — it asks even with nothing to send; a send with nothing changed (the watcher fires on
  // an incoming slice too) costs no request. `keepalive` is the farewell send on lock / leave — a
  // request the browser lets finish after the page is gone.
  async function sync({ poll = false, keepalive = false } = {}) {
    if (!active.value || inFlight || !isValid()) return inFlight
    dirty = false
    const p = current.value.party
    const cut = sliceGame(current.value)
    const slices = {}
    for (const name of SLICE_NAMES) {
      const json = stableJson(cut[name])
      if (json === base[name]) continue
      // A slice this phone may not write snaps back to what the server holds: a disabled control
      // that was somehow used must not turn into a 403 every three seconds.
      if (!canWriteSlice(name)) {
        if (base[name]) applyRemote(name, JSON.parse(base[name]))
        continue
      }
      slices[name] = { version: p.versions[name] ?? 0, data: cut[name], json }
    }
    const sending = Object.keys(slices)
    if (!sending.length && !poll) return null
    const body = {
      since: p.seq || 0,
      ...(sending.length ? { slices: Object.fromEntries(sending.map((n) => [n, { version: slices[n].version, data: slices[n].data }])) } : {}),
    }

    busyTimer = setTimeout(() => { if (inFlight) status.value = 'busy' }, BUSY_AFTER_MS)
    inFlight = (async () => {
      try {
        const res = await memberFetch('/sync', body, { keepalive })
        clearTimeout(busyTimer)
        if (res.status === 204) {
          settle('ok')
          return
        }
        if (res.status === 401) {
          markRevoked()
          return
        }
        if (res.status === 404) {
          markEnded()
          return
        }
        if (res.status === 429) {
          settle('ok')
          return
        }
        const data = await res.json().catch(() => null)
        if (!data) {
          lastError.value = `sync ${res.status}`
          settle('error')
          return
        }
        if (res.status === 200 || res.status === 409 || res.status === 423) {
          for (const name of SLICE_NAMES) takeRemote(name, data.slices?.[name])
          for (const [name, version] of Object.entries(data.written || {})) {
            if (slices[name]) setBase(name, slices[name].json, version)
          }
          if (data.seq != null) current.value.party.seq = data.seq
          takeStanding(data.you, data.held)
          if (data.status) takeStatus(data.status)
          lastSyncAt.value = Date.now()
          // A refused batch left this phone's changes unsent; the server's copies are in place
          // now, and whatever the player taps next goes out on the next tick. The 423 is the
          // finished-game case: this phone cannot write until the host reopens.
          settle(res.status === 423 ? 'readonly' : 'ok')
          if (res.status === 200 && data.status === 'finished' && !isHost.value) status.value = 'readonly'
          return
        }
        if (res.status === 403) {
          // Something this phone may not write got through the local gate; the base snaps it back.
          for (const name of data.slices || []) if (base[name]) applyRemote(name, JSON.parse(base[name]))
          settle('ok')
          return
        }
        lastError.value = data.error || `sync ${res.status}`
        settle('error')
      } catch (e) {
        clearTimeout(busyTimer)
        lastError.value = e instanceof Error ? e.message : String(e)
        settle('offline')
      } finally {
        inFlight = null
        saveBase()
        // Taps that landed while the request was out go with the next one, soon.
        if (dirty && active.value) scheduleSend()
      }
    })()
    return inFlight
  }

  function isValid() {
    return !!current.value && Array.isArray(current.value.players)
  }

  function settle(s) {
    if (!active.value) return
    status.value = polling() ? s : (s === 'ok' ? 'paused' : s)
    if (s === 'ok' || s === 'readonly') lastError.value = null
  }

  function markRevoked() {
    stopTimers()
    if (current.value?.party) current.value.party.revoked = true
    status.value = 'revoked'
  }
  function markEnded() {
    stopTimers()
    if (current.value?.party) current.value.party.ended = true
    status.value = 'ended'
  }

  // ── The gate and the timers ─────────────────────────────────────────────────────────────────

  function visible() {
    return typeof document === 'undefined' || document.visibilityState !== 'hidden'
  }
  function online() {
    return typeof navigator === 'undefined' || navigator.onLine !== false
  }
  // Polling now? The live screen, visible, online. A finished game still polls, slowly (the host
  // may reopen it). The host feeding a BROADCAST polls from any screen, slowly: the overlay is fed
  // by this phone's pushes, and a host reading the rules must not freeze it.
  function polling() {
    if (!active.value || !visible() || !online()) return false
    if (attached > 0) return true
    return isHost.value && !!current.value?.broadcast?.token
  }
  function cadence() {
    if (attached === 0) return BACKGROUND_TICK_MS
    return current.value?.phase === 'finished' ? FINISHED_TICK_MS : TICK_MS
  }

  function stopTimers() {
    clearTimeout(sendTimer); sendTimer = null
    clearTimeout(pollTimer); pollTimer = null
  }

  function schedulePoll() {
    clearTimeout(pollTimer)
    pollTimer = null
    if (!polling()) {
      if (active.value && status.value === 'ok') status.value = 'paused'
      return
    }
    pollTimer = setTimeout(async () => {
      pollTimer = null
      await sync({ poll: true })
      schedulePoll()
    }, cadence())
  }

  function scheduleSend() {
    if (sendTimer || !online()) return
    sendTimer = setTimeout(async () => {
      sendTimer = null
      await sync()
      schedulePoll()
    }, SEND_DELAY_MS)
  }

  // Poll right now — on entering the live screen, on waking, on coming back online.
  async function wake() {
    if (!active.value) return
    if (!polling()) { schedulePoll(); return }
    status.value = status.value === 'paused' ? 'busy' : status.value // the one moment a spinner is wanted at once
    await sync({ poll: true })
    schedulePoll()
  }

  // The farewell send: leaving the live screen, the phone going dark, the tab closing.
  function flush() {
    if (!active.value || !online()) return
    clearTimeout(sendTimer); sendTimer = null
    sync({ keepalive: true }) // sends only if something changed
  }

  // A live screen (the game, the game's roster) says it is on. Mount → poll now; unmount → send
  // what is pending and stop polling.
  function attach() {
    init()
    attached += 1
    wake()
  }
  function detach() {
    attached = Math.max(0, attached - 1)
    flush()
    schedulePoll()
  }

  // Armed once per app load, from any screen that shows the game. The deep watch on `current` is
  // the store's own persistence recipe, in a DETACHED scope for the reason useBroadcast gives: a
  // watcher adopted by a component dies with it, and the sync must outlive every screen.
  function init() {
    if (engineArmed) return
    engineArmed = true
    const scope = effectScope(true)
    scope.run(() => {
      watch(current, (g) => {
        // The game left with its handle — archived, discarded, replaced by a new one. The server
        // hears about it here, whichever screen did it: a guest's seat frees, a host's party ends.
        if (!g?.party) {
          if (baseFor || lastHandle) farewell()
          return
        }
        lastHandle = { id: g.party.id, token: g.party.token, host: !!g.party.host, active: !g.party.revoked && !g.party.ended }
        if (g.party.revoked || g.party.ended) return
        if (baseFor !== g.party.id) {
          // A reload, or a game that came with a party handle: the base is whatever we kept for
          // it — or, if nothing, the game as it stands (the first tick then sends nothing and
          // takes the server's state; a change made meanwhile is lost, which a reload deserves).
          baseFor = g.party.id
          base = loadBase(g.party.id) || Object.fromEntries(Object.entries(sliceGame(g)).map(([n, s]) => [n, stableJson(s)]))
          saveBase()
        }
        dirty = true
        scheduleSend()
      }, { deep: true, immediate: true })
    })
    if (typeof window !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') { flush(); schedulePoll() }
        else wake()
      })
      window.addEventListener('pagehide', flush)
      window.addEventListener('online', wake)
      window.addEventListener('offline', () => { if (active.value) status.value = 'offline'; schedulePoll() })
    }
    if (active.value) schedulePoll()
  }

  // ── Host: share the game in progress ────────────────────────────────────────────────────────

  async function share() {
    const g = current.value
    if (!g || !isValid() || authStatus.value !== 'authed') return false
    lastError.value = null
    const you = g.players.findIndex((pl) => pl.isYou)
    const side = you >= 0 ? you : 0
    const cut = sliceGame(g)
    try {
      const res = await authedFetch('/party', {
        method: 'POST',
        body: JSON.stringify({
          gameId: g.id,
          slices: cut,
          seat: { side, mi: null },
          name: sideName(g.players[side]),
        }),
      })
      if (!res.ok) {
        lastError.value = `share failed: ${res.status}`
        return false
      }
      const data = await res.json()
      baseFor = data.partyId
      base = Object.fromEntries(SLICE_NAMES.map((n) => [n, stableJson(cut[n])]))
      g.party = {
        id: data.partyId,
        memberId: data.memberId,
        token: data.memberToken,
        side,
        mi: null,
        host: true,
        seq: data.seq,
        versions: { ...data.versions },
        status: data.status,
      }
      saveBase()
      lastHandle = { id: data.partyId, token: data.memberToken, host: true, active: true }
      invite.value = data.invite
      status.value = 'ok'
      init()
      schedulePoll()
      return true
    } catch (e) {
      lastError.value = e instanceof Error ? e.message : String(e)
      return false
    }
  }

  function sideName(pl) {
    return pl?.name || pl?.teamName || ''
  }

  // ── Guest: join and take a seat ─────────────────────────────────────────────────────────────

  // Step one: exchange the invite for a member token. Returns the server's answer — the game's
  // slices (to show the seats by name) and who is already in — or `{ error }`.
  async function join(credential) {
    lastError.value = null
    try {
      const res = await fetch(api('/party/join'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credential),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) return { error: data.error || `join ${res.status}` }
      return data
    } catch {
      return { error: 'network' }
    }
  }

  // Between the two: who holds what, for a joiner whose first pick was taken meanwhile.
  async function peekMembers(joined) {
    try {
      const res = await fetch(api(`/party/${encodeURIComponent(joined.partyId)}/members`), {
        headers: { Authorization: `Bearer ${joined.memberToken}` },
      })
      if (res.ok) return (await res.json()).members || joined.members
    } catch { /* ignore */ }
    return joined.members
  }

  // Step two: the seat, and with it the game. The caller has already put away any game of its
  // own — this REPLACES `current`. Returns null on success, or the error code.
  async function takeSeat(joined, { side, mi = null, name = '' }) {
    if (lastHandle) await farewell()
    const handle = { id: joined.partyId, memberId: joined.memberId, token: joined.memberToken }
    let res
    try {
      res = await fetch(api(`/party/${encodeURIComponent(handle.id)}/seat`), {
        method: 'POST',
        headers: { Authorization: `Bearer ${handle.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ side, mi, name }),
      })
    } catch {
      return 'network'
    }
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return data.error || `seat ${res.status}`
    const slices = Object.fromEntries(Object.entries(joined.slices).map(([n, s]) => [n, s.data]))
    const game = assembleGame(slices, { you: side })
    game.party = {
      ...handle,
      side,
      mi,
      host: false,
      seq: data.seq ?? joined.seq,
      versions: Object.fromEntries(Object.entries(joined.slices).map(([n, s]) => [n, s.version])),
      status: joined.status,
    }
    baseFor = handle.id
    base = Object.fromEntries(SLICE_NAMES.map((n) => [n, stableJson(sliceGame(game)[n])]))
    saveBase()
    lastHandle = { id: handle.id, token: handle.token, host: false, active: true }
    current.value = game
    status.value = 'ok'
    init()
    schedulePoll()
    return null
  }

  // ── Both: the list of phones, the invite, leaving ───────────────────────────────────────────

  async function refreshMembers() {
    if (!active.value) return
    try {
      const res = await memberFetch('/members')
      if (res.ok) members.value = (await res.json()).members || []
    } catch { /* the list is decoration; the next open retries */ }
  }

  async function refreshInvite() {
    if (!active.value || !isHost.value) return
    try {
      const res = await memberFetch('/invite')
      if (res.ok) invite.value = await res.json()
    } catch { /* ignore */ }
  }

  // A fresh code (the old one expired, or was seen by the wrong table); `link` also replaces the link.
  async function newInvite({ link = false } = {}) {
    if (!active.value || !isHost.value) return
    try {
      const res = await memberFetch('/invite', { link })
      if (res.ok) invite.value = await res.json()
    } catch { /* ignore */ }
  }

  async function kick(memberId) {
    if (!isHost.value) return
    try {
      await memberFetch(`/members/${encodeURIComponent(memberId)}/kick`, {})
    } catch { /* ignore */ }
    await refreshMembers()
  }

  async function moveSeat(memberId, { side, mi = null }) {
    if (!isHost.value) return
    try {
      const res = await memberFetch(`/members/${encodeURIComponent(memberId)}/seat`, { side, mi })
      if (res.status === 409) return 'seat_taken'
    } catch { /* ignore */ }
    await refreshMembers()
    return null
  }

  async function transferHost(memberId) {
    if (!isHost.value) return
    try {
      const res = await memberFetch('/host', { memberId })
      if (res.ok && current.value?.party) current.value.party.host = false
    } catch { /* ignore */ }
    await refreshMembers()
  }

  // Tell the server this phone is done with the party — the host ends it for everyone (every
  // phone keeps its copy of the game; the link between them is gone), a guest frees its seat so
  // the host's list does not show a ghost until the TTL. Best-effort: the rows expire on their own.
  async function sayGoodbye(h) {
    if (!h?.active || leaving) return
    leaving = true
    try {
      await fetch(api(`/party/${encodeURIComponent(h.id)}${h.host ? '' : '/leave'}`), {
        method: h.host ? 'DELETE' : 'POST',
        headers: { Authorization: `Bearer ${h.token}` },
      })
    } catch { /* ignore */ }
    leaving = false
  }

  // The handle is gone from the game (or is about to be): forget everything about the party
  // here, and let the server know.
  async function farewell() {
    const h = lastHandle
    lastHandle = null
    stopTimers()
    base = {}
    baseFor = null
    saveBase()
    members.value = []
    invite.value = null
    status.value = 'off'
    await sayGoodbye(h)
  }

  // The host ends it for everyone.
  async function end() {
    if (!isHost.value) return
    await leave()
  }

  // This phone leaves the party; the game stays on it as it is now.
  async function leave() {
    const p = party.value
    if (!p) return
    const h = { id: p.id, token: p.token, host: !!p.host, active: active.value }
    forget()
    await sayGoodbye(h)
  }

  // Drop the handle from the game without a word to the server (it already knows, or is gone).
  function forget() {
    stopTimers()
    lastHandle = null
    base = {}
    baseFor = null
    saveBase()
    members.value = []
    invite.value = null
    status.value = 'off'
    if (current.value?.party) delete current.value.party
  }

  return {
    party, active, isHost, canShare, canEdit, canResume, setScoreAll,
    status, lastError, lastSyncAt, members, invite,
    init, attach, detach, wake, flush, sync,
    share, join, peekMembers, takeSeat, refreshMembers, refreshInvite, newInvite, kick, moveSeat, transferHost, end, leave, forget,
  }
}

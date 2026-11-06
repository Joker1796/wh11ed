// Dominatus campaigns on this device: the ones it knows, with the credential it holds for each,
// and each one's event log as last read. The server keeps only the log (wh11ed-api `/campaigns`);
// what the campaign IS — players, cards, Locations, standings — is the fold in
// src/core/dominatus/campaign.js over that log and the deck.
//
// A device holds one of three credentials per campaign: the Warmaster's account (the owner — no
// token stored, the session's access token speaks), a member (a player who opened the invite link
// signed in: their account again, so the campaign follows them to every device), or the view token
// (a reader). The links carry the tokens: `?join=` and `?t=`. Playing needs an account (owner,
// 2026-11-05): an invite opened signed out makes a reader that keeps the link (`invite`) and joins
// by itself once the device signs in — a guest's membership lived in one browser, and the same
// player opening the link in a messenger and then in the app was two members.
//
// A Warmaster's or a player's credential is the ACCOUNT's, so the entry remembers whose it is
// (`account`, `accountName`). Another account signed in on the device: the entry reads as a reader
// (`role: 'viewer'`) and keeps what it held (`heldRole`), back the moment that account signs in again
// (owner, 2026-11-05 — the page showed the Warmaster's forms to whoever was signed in, and the server
// refused every save). The server's `you.role` on each read is the truth; the account id only lets
// the page switch before the read comes back.
//
// The log only grows, so a sync asks for what is after the last `seq` it has, and a write is an
// append followed by that sync. Kept in localStorage (`wh11ed-campaigns`) so the page opens with
// what it showed last time, offline included.
import { ref, computed, watch } from 'vue'
import { API_BASE_URL } from '../config.js'
import { campaignPath } from '../router/nav.js'
import { useAuth } from './useAuth.js'
import { campaignState, isTeam } from '../core/dominatus/campaign.js'
import { loadDominatusDeck, dominatusDeck } from './dominatusMissions.js'

const KEY = 'wh11ed-campaigns'

function load() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(v) ? v : []
  } catch {
    return []
  }
}
const campaigns = ref(load())
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(campaigns.value))
  } catch {
    // quota or private mode: the campaign still works for this visit
  }
}

const api = (path) => `${API_BASE_URL}${path}`
const byId = (id) => campaigns.value.find((c) => c.id === id) || null

// The signed-in account, as the entries record it.
const accountNow = () => {
  const u = useAuth().user.value
  return u?.id ? { account: u.id, accountName: u.displayName || u.email || '' } : null
}
// The entry speaks for this account again (or for the first time): what it held comes back.
const mineAgain = (c, role, extra = {}) => Object.assign(c, { role, heldRole: undefined, ...accountNow(), ...extra })
// Another account signed in: a reader until its own comes back.
function holdFor(c) {
  if (c.role === 'viewer') return
  c.heldRole = c.role
  c.role = 'viewer'
}
/** Match every entry to the account now signed in — by the account each recorded. Signed out
 * changes nothing: the page asks the same account to sign in again. */
function matchAccount(id) {
  if (!id) return
  let changed = false
  for (const c of campaigns.value) {
    if (!c.account) continue
    if (c.account !== id && c.role !== 'viewer') { holdFor(c); changed = true }
    else if (c.account === id && c.heldRole) { mineAgain(c, c.heldRole); changed = true }
  }
  if (changed) save()
}
let matching = false

function upsert(entry) {
  const was = byId(entry.id)
  if (was) Object.assign(was, entry)
  else campaigns.value.push({ events: [], seq: 0, ...entry })
  save()
  return byId(entry.id)
}

// The request with the credential this device holds for the campaign. A member also sends the view
// token: signed out, they still read.
// The account speaks whenever one is signed in, the view token beside it: the server answers with
// the best of the two, and its `you.role` says which (a held entry learns it is this account's).
async function call(c, path, opts = {}) {
  const { authedFetch } = useAuth()
  const headers = { ...(opts.headers || {}) }
  if (c.viewToken) headers['X-Campaign-View'] = c.viewToken
  if (c.role !== 'viewer' || c.heldRole || signedIn()) return authedFetch(path, { ...opts, headers })
  if (opts.body) headers['Content-Type'] = 'application/json'
  return fetch(api(path), { ...opts, headers })
}

const signedIn = () => useAuth().status.value === 'authed'

export class CampaignError extends Error {
  constructor(code, status) {
    super(code)
    this.code = code
    this.status = status
  }
}
async function failure(res) {
  let code = 'network'
  try {
    code = (await res.json()).error || code
  } catch {
    // not JSON
  }
  return new CampaignError(code, res.status)
}

/** Start a campaign — the Warmaster, signed in. */
async function createCampaign(name, draw = 'app') {
  const { authedFetch } = useAuth()
  const res = await authedFetch('/campaigns', { method: 'POST', body: JSON.stringify({ name, draw }) })
  if (!res.ok) throw await failure(res)
  const r = await res.json()
  const c = upsert({ id: r.campaignId, name, role: 'owner', viewToken: r.viewToken, joinToken: r.joinToken, ...accountNow() })
  await syncCampaign(c.id)
  return c
}

/** The account's campaigns merged into the list (signed in only): its own, and those it plays in —
 * after the invites this device opened signed out are taken up, so the player is a member at once. */
async function refreshAccount() {
  const { authedFetch } = useAuth()
  if (!signedIn()) return
  for (const c of campaigns.value.filter((x) => x.role === 'viewer' && x.invite)) {
    try {
      await joinCampaign(c.id, c.invite)
    } catch {
      // offline, or the link was changed: the reader stays a reader
    }
  }
  const res = await authedFetch('/campaigns')
  if (!res.ok) return
  for (const r of (await res.json()).campaigns || []) {
    if (r.role === 'member') {
      if (byId(r.campaignId)?.role === 'owner') continue
      upsert({ id: r.campaignId, name: r.name, role: 'member', memberId: r.memberId, viewToken: r.viewToken, invite: undefined, heldRole: undefined, ...accountNow() })
    } else {
      upsert({ id: r.campaignId, name: r.name, role: 'owner', viewToken: r.viewToken, joinToken: r.joinToken, heldRole: undefined, ...accountNow() })
    }
  }
  save()
}

/** Open an invite link. Signed in: a member by the account (the same one on every device — the
 * server returns it again). Signed out: a reader that keeps the link and joins once the device signs
 * in (`refreshAccount`). A device that already plays or runs it asks nothing. */
async function joinCampaign(id, joinToken, name = '') {
  const was = byId(id)
  if (was?.role === 'owner' || was?.role === 'member') {
    await syncCampaign(id)
    return byId(id)
  }
  const { authedFetch } = useAuth()
  const body = JSON.stringify({ joinToken, name })
  const res = signedIn()
    ? await authedFetch(`/campaigns/${encodeURIComponent(id)}/join`, { method: 'POST', body })
    : await fetch(api(`/campaigns/${encodeURIComponent(id)}/join`), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
  if (!res.ok) throw await failure(res)
  const r = await res.json()
  const c = r.role === 'owner'
    ? upsert({ id, role: 'owner', viewToken: r.viewToken, invite: undefined, heldRole: undefined, ...accountNow() })
    : r.role === 'member'
      ? upsert({ id, role: 'member', memberId: r.memberId, viewToken: r.viewToken, invite: undefined, heldRole: undefined, ...accountNow() })
      : upsert({ id, role: 'viewer', viewToken: r.viewToken, invite: joinToken })
  await syncCampaign(id)
  return c
}

/** Open a view link: read-only. */
async function watchCampaign(id, viewToken) {
  const was = byId(id)
  if (was) return was
  const c = upsert({ id, role: 'viewer', viewToken })
  await syncCampaign(id)
  return c
}

/** Fetch what is newer than the log this device has. */
async function syncCampaign(id) {
  const c = byId(id)
  if (!c) return null
  // Signed in as an account the entry has not seen answer for it, the read takes the last event
  // again: a 204 carries no `you`, and the role is what the read is for.
  const unsure = signedIn() && c.account !== accountNow()?.account
  const since = unsure ? Math.max(0, (c.seq || 0) - 1) : c.seq || 0
  const res = await call(c, `/campaigns/${encodeURIComponent(id)}/events?since=${since}`)
  if (res.status === 204) return c
  if (!res.ok) throw await failure(res)
  const r = await res.json()
  // Who the server says this device is, while an account is signed in: its own again, or a reader
  // for now (an entry from before the account was recorded learns it here).
  const you = r.you?.role
  if (signedIn() && (you === 'owner' || you === 'member')) {
    if (c.role !== you || c.heldRole || c.account !== accountNow()?.account) mineAgain(c, you, you === 'member' ? { memberId: r.you.memberId } : {})
  } else if (signedIn() && you === 'viewer') holdFor(c)
  c.name = r.campaign.name
  if (r.campaign.joinToken) c.joinToken = r.campaign.joinToken
  c.events = [...(c.events || []), ...r.events.filter((e) => e.seq > (c.seq || 0))]
  c.seq = c.events.length ? c.events[c.events.length - 1].seq : 0
  if (r.members) c.members = r.members
  save()
  return c
}

/** Append one event and read it back. */
async function appendEvent(id, type, payload) {
  const c = byId(id)
  if (!c) throw new CampaignError('unknown_campaign', 0)
  const res = await call(c, `/campaigns/${encodeURIComponent(id)}/events`, { method: 'POST', body: JSON.stringify({ type, payload }) })
  if (!res.ok) throw await failure(res)
  return syncCampaign(id)
}

/** Delete it everywhere — the owner. */
async function deleteCampaign(id) {
  const c = byId(id)
  if (!c || c.role !== 'owner') return
  const res = await call(c, `/campaigns/${encodeURIComponent(id)}`, { method: 'DELETE' })
  if (!res.ok && res.status !== 404) throw await failure(res)
  forgetCampaign(id)
}

/** Drop it from this device only. */
function forgetCampaign(id) {
  campaigns.value = campaigns.value.filter((c) => c.id !== id)
  save()
}

/** The campaign folded: null until the deck has arrived (it loads on demand). */
function stateOf(id) {
  const c = byId(id)
  const deck = dominatusDeck()
  if (!c || !deck) return null
  return campaignState(c.events || [], deck)
}

/** The links to hand out, in the reader's language path. */
function linksOf(c, origin, prefix = '') {
  const base = `${origin}${prefix}${campaignPath(c.id)}`
  return {
    view: c.viewToken ? `${base}?t=${c.viewToken}` : '',
    join: c.joinToken ? `${base}?join=${c.joinToken}` : '',
  }
}

/** The player this device speaks for in a campaign: the member's own, the one the Warmaster plays
 * as (a campaign setting), or null. */
function myPlayer(c, state) {
  if (!c || !state) return null
  if (c.role === 'owner') return state.players.find((p) => p.id === state.me) || null
  if (c.role !== 'member') return null
  return state.players.find((p) => p.member === c.memberId) || null
}

/** What waits for this device in a campaign: rewards to take (every one for the Warmaster, a
 * member's own) and, for the Warmaster, battles to count. */
function waitingFor(c, state) {
  if (!c || !state) return { rewards: 0, battles: 0 }
  const owner = c.role === 'owner'
  const me = myPlayer(c, state)
  return {
    rewards: state.pending.filter((r) => owner || (me && r.player === me.id && state.rewardsBy !== 'warmaster')).length,
    battles: owner ? state.battles.filter((b) => (b.status === 'pending' || (isTeam(b) && b.status === 'approved' && !b.rewards))).length : 0,
  }
}

/** Remember whether anything waits, for screens that do not fold the log (the tracker's home). */
function noteWaiting(id, n) {
  const c = byId(id)
  if (!c || (c.waiting || 0) === n) return
  c.waiting = n
  save()
}

/** Read every campaign this device knows again and note what waits in each; failures are quiet
 * (offline, a revoked link) — the list still shows what it had. */
async function syncAll() {
  for (const c of [...campaigns.value]) {
    try {
      await syncCampaign(c.id)
    } catch {
      // keep what this device had
    }
    const w = waitingFor(byId(c.id), stateOf(c.id))
    if (stateOf(c.id)) noteWaiting(c.id, w.rewards + w.battles)
  }
}

/** Remember a choice the reader makes on a campaign's page — the Briefing's Alliance, the tab, a
 * fold, a filter — so the page opens as they left it (owner, 2026-11-01: "a player plays one
 * Alliance the whole campaign, don't make them click a hundred times"). This device only; it goes
 * with the campaign when the campaign is forgotten here. */
export function setCampaignPref(id, key, value) {
  const c = byId(id)
  if (!c || (c.prefs?.[key] ?? null) === value) return
  c.prefs = { ...(c.prefs || {}), [key]: value }
  save()
}


/** A reason the campaign's fold refused an entry, in the reader's words (ui.js `campWhy_<reason>`);
 * an unknown one as the fold wrote it. */
export function refusalText(labels, reason) {
  return labels[`campWhy_${String(reason).toLowerCase().replace(/[^a-z]+/g, '_')}`] || reason
}

/** The campaigns this device knows, as stored — names and ids, no fold (no deck loaded). */
export function knownCampaigns() {
  return campaigns.value
}

/** A known campaign's state as this device last read it — null until the deck is in (this loads
 * nothing: a screen that wants it loads the deck itself). */
export function knownCampaignState(id) {
  return stateOf(id)
}

/** The campaign's player this device is — the Warmaster's own (`me`) or a member's — or null. */
export function campaignPlayerOf(id) {
  const st = stateOf(id)
  return myPlayer(byId(id), st)
}

/** Does anything wait in a campaign this device knows, as last noted (no deck loaded)? */
export function campaignsWaiting() {
  return campaigns.value.some((c) => (c.waiting || 0) > 0)
}

export function useCampaigns() {
  loadDominatusDeck()
  if (!matching) {
    matching = true
    watch(() => useAuth().user.value?.id, matchAccount, { immediate: true })
  }
  return {
    campaigns: computed(() => campaigns.value),
    byId,
    createCampaign,
    refreshAccount,
    joinCampaign,
    watchCampaign,
    syncCampaign,
    appendEvent,
    deleteCampaign,
    forgetCampaign,
    stateOf,
    linksOf,
    myPlayer,
    waitingFor,
    noteWaiting,
    syncAll,
  }
}

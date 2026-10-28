// Dominatus campaigns on this device: the ones it knows, with the credential it holds for each,
// and each one's event log as last read. The server keeps only the log (wh11ed-api `/campaigns`);
// what the campaign IS — players, cards, Locations, standings — is the fold in
// src/core/dominatus/campaign.js over that log and the deck.
//
// A device holds one of three credentials per campaign: the Warmaster's account (the owner — no
// token stored, the session's access token speaks), a member token (a player who opened the
// invite link), or the view token (a reader). The links carry the tokens: `?join=` and `?t=`.
//
// The log only grows, so a sync asks for what is after the last `seq` it has, and a write is an
// append followed by that sync. Kept in localStorage (`wh11ed-campaigns`) so the page opens with
// what it showed last time, offline included.
import { ref, computed } from 'vue'
import { API_BASE_URL } from '../config.js'
import { useAuth } from './useAuth.js'
import { campaignState } from '../core/dominatus/campaign.js'
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

function upsert(entry) {
  const was = byId(entry.id)
  if (was) Object.assign(was, entry)
  else campaigns.value.push({ events: [], seq: 0, ...entry })
  save()
  return byId(entry.id)
}

// The request with the credential this device holds for the campaign.
async function call(c, path, opts = {}) {
  const { authedFetch } = useAuth()
  if (c.role === 'owner') return authedFetch(path, opts)
  const headers = { ...(opts.headers || {}), ...(opts.body ? { 'Content-Type': 'application/json' } : {}) }
  if (c.memberToken) headers['X-Campaign-Member'] = c.memberToken
  else if (c.viewToken) headers['X-Campaign-View'] = c.viewToken
  return fetch(api(path), { ...opts, headers })
}

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
  const c = upsert({ id: r.campaignId, name, role: 'owner', viewToken: r.viewToken, joinToken: r.joinToken })
  await syncCampaign(c.id)
  return c
}

/** The account's own campaigns, merged into the list (signed in only). */
async function refreshOwned() {
  const { authedFetch, status } = useAuth()
  if (status.value !== 'authed') return
  const res = await authedFetch('/campaigns')
  if (!res.ok) return
  for (const r of (await res.json()).campaigns || []) {
    upsert({ id: r.campaignId, name: r.name, role: 'owner', viewToken: r.viewToken, joinToken: r.joinToken })
  }
}

/** Open an invite link: a member token for this device. */
async function joinCampaign(id, joinToken, name = '') {
  const res = await fetch(api(`/campaigns/${encodeURIComponent(id)}/join`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ joinToken, name }),
  })
  if (!res.ok) throw await failure(res)
  const r = await res.json()
  const was = byId(id)
  // An owner opening their own invite stays the owner.
  if (was?.role === 'owner') return was
  const c = upsert({ id, role: 'member', memberId: r.memberId, memberToken: r.memberToken, viewToken: r.viewToken })
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
  const res = await call(c, `/campaigns/${encodeURIComponent(id)}/events?since=${c.seq || 0}`)
  if (res.status === 204) return c
  if (!res.ok) throw await failure(res)
  const r = await res.json()
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
  const base = `${origin}${prefix}/tracker/campaigns/${c.id}`
  return {
    view: c.viewToken ? `${base}?t=${c.viewToken}` : '',
    join: c.joinToken ? `${base}?join=${c.joinToken}` : '',
  }
}

/** The player this device speaks for in a campaign: the member's own, or null. */
function myPlayer(c, state) {
  if (!c || !state || c.role !== 'member') return null
  return state.players.find((p) => p.member === c.memberId) || null
}

/** Does this device know any campaign? — for a door that shows only then (no deck loaded). */
export function hasKnownCampaigns() {
  return campaigns.value.length > 0
}

export function useCampaigns() {
  loadDominatusDeck()
  return {
    campaigns: computed(() => campaigns.value),
    byId,
    createCampaign,
    refreshOwned,
    joinCampaign,
    watchCampaign,
    syncCampaign,
    appendEvent,
    deleteCampaign,
    forgetCampaign,
    stateOf,
    linksOf,
    myPlayer,
  }
}

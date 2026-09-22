import { ref, watch } from 'vue'
import { useAuth } from './useAuth.js'
import { favoritesStore, GLOBAL_SCOPE } from './useFavorites.js'
import { collectionStore } from './useCollection.js'
import { reconcileCells } from './markReconcile.js'
import { APP_DATA_VERSION } from '../data/appDataVersion.js'
import datasheetRenames from '../data/datasheetRenames.json'

// Cloud sync of a player's own marks — pinned factions, favourite datasheets, the model
// collection. The counterpart of useRosterSync.js for the small things, and its rules are almost
// the opposite of that one's, because marks are not lists:
//
//  1. NOTHING IS EVER LOST. A pull MERGES; it never replaces. Signing in on a second device adds
//     that device's marks to the account instead of overwriting them with it, and a mark taken
//     off travels as a tombstone (markStore.js) rather than as an absence — which is the only way
//     unstarring survives a device that still holds the star.
//  2. UPLOADS FOLLOW EDITS, not clicks. A star is a single tap and there is no "Save" to hang an
//     upload on, so changes are collected and sent after a short quiet spell (and on the way out
//     of the page) — a player sweeping through a catalogue spends one request, not forty.
//  3. ONE REQUEST PER VISIT to read. The whole shelf is a few kilobytes and the scarce resource
//     is requests, not bytes; an ETag makes a visit that changed nothing free.
//
// A stale write is refused by the API with the row that beat it attached, so a conflict costs a
// re-merge and a retry rather than someone's marks.
//
// localStorage stays the primary store. Signed out, offline, or with the API down, everything
// here is a no-op and the app is unaffected.
const PUSH_DELAY_MS = 2500
const MAX_RETRIES = 3

// The two stores that make up one cloud scope. Favourites contribute `fav` (and, under
// `@factions`, the pinned list); the collection contributes `own`. They are kept apart locally
// because a pin and a box mean different things — sharing a cloud row is transport, not meaning.
const PARTS = [
  { key: 'fav', store: favoritesStore },
  { key: 'own', store: collectionStore },
]

// The newest rules data any of this account's devices has reported. A client only tidies marks
// away when its own data is at least that new — see markReconcile.js for why an old build must
// not be allowed to clean up. Lives on the `@factions` row, the one scope that belongs to the
// account rather than to a faction, and merges as a maximum, so it can never go backwards.
const accountDataVersion = ref(APP_DATA_VERSION)
const mayClean = () => APP_DATA_VERSION >= accountDataVersion.value

const syncing = ref(false)
const lastError = ref(null)
const checked = ref(false)
// The version each scope was last known to hold, so a PUT can say what it merged from.
const versions = new Map()
let etag = null
let pushTimer = null
let pushing = null

const scopeDoc = (scope) => {
  const doc = {}
  for (const { key, store } of PARTS) {
    const cells = store.cellsOf(scope)
    if (Object.keys(cells).length) doc[key] = cells
  }
  if (scope === GLOBAL_SCOPE) doc.dv = accountDataVersion.value
  return doc
}

/** Fold one scope of the cloud's document into the local stores. Returns true if anything moved. */
function applyScope(scope, doc) {
  let changed = false
  if (scope === GLOBAL_SCOPE) {
    const dv = Number(doc?.dv) || 0
    if (dv > accountDataVersion.value) accountDataVersion.value = dv
  }
  for (const { key, store } of PARTS) {
    const incoming = doc?.[key]
    if (!incoming || typeof incoming !== 'object') continue
    if (store.applyRemote({ [scope]: incoming }).length) changed = true
  }
  return changed
}

/**
 * Read the account's marks and merge them in. One request; a 304 means this device already knows
 * everything the cloud holds. Scopes whose merge changed the local copy are queued for upload —
 * that is how the cloud learns what this device knew and the account did not.
 */
export async function pullPrefs() {
  const { status, authedFetch } = useAuth()
  if (status.value !== 'authed') return
  syncing.value = true
  lastError.value = null
  try {
    const res = await authedFetch('/prefs', { headers: etag ? { 'If-None-Match': etag } : {} })
    if (res.status === 304) {
      checked.value = true
      return
    }
    if (!res.ok) throw new Error(`prefs ${res.status}`)
    etag = res.headers.get('ETag')
    const body = await res.json()
    const seen = new Set()
    for (const row of body?.scopes || []) {
      if (!row?.scope) continue
      seen.add(row.scope)
      versions.set(row.scope, Number(row.version) || 0)
      // A merge that changed us means the cloud was missing something, or holds an older cell:
      // either way this device now has the fuller picture and must send it back.
      if (applyScope(row.scope, row.data)) markForPush(row.scope)
    }
    // Scopes this device has and the account has never heard of.
    for (const scope of localScopes()) if (!seen.has(scope)) markForPush(scope)
    checked.value = true
    schedulePush()
  } catch (e) {
    lastError.value = String(e?.message || e)
  } finally {
    syncing.value = false
  }
}

const localScopes = () => new Set([...favoritesStore.scopes(), ...collectionStore.scopes()])

const pending = new Set()
const markForPush = (scope) => pending.add(scope)

function schedulePush() {
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = setTimeout(() => {
    pushTimer = null
    void pushPrefs()
  }, PUSH_DELAY_MS)
}

/** Send one scope, re-merging and retrying if another device got there first. */
async function pushScope(scope, authedFetch) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const res = await authedFetch(`/prefs/${encodeURIComponent(scope)}`, {
      method: 'PUT',
      body: JSON.stringify({ version: versions.get(scope) ?? 0, data: scopeDoc(scope) }),
    })
    if (res.ok) {
      const body = await res.json()
      versions.set(scope, Number(body?.version) || 0)
      return true
    }
    if (res.status !== 409) throw new Error(`prefs ${scope} ${res.status}`)
    const body = await res.json().catch(() => null)
    if (body?.error !== 'version_conflict') throw new Error(`prefs ${scope} ${body?.error || 409}`)
    // Somebody else wrote while we were deciding. Take what they wrote, fold it in, try again —
    // the merge is by cell, so neither side's marks are lost by the round trip.
    versions.set(scope, Number(body.current?.version) || 0)
    applyScope(scope, body.current?.data)
  }
  throw new Error(`prefs ${scope} kept losing the race`)
}

/** Upload every scope that changed. Safe to call at any time; overlapping calls share one pass. */
export async function pushPrefs() {
  const { status, authedFetch } = useAuth()
  if (status.value !== 'authed' || !checked.value) return
  if (pushing) return pushing
  pushing = (async () => {
    // Anything the stores changed since we last looked belongs in this pass too.
    for (const { store } of PARTS) for (const scope of store.takeDirty()) pending.add(scope)
    if (!pending.size) return
    syncing.value = true
    const scopes = [...pending]
    pending.clear()
    try {
      for (const scope of scopes) await pushScope(scope, authedFetch)
      // The read's ETag no longer describes what the cloud holds.
      etag = null
    } catch (e) {
      lastError.value = String(e?.message || e)
      // Put them back: an upload that failed offline must go out on the next occasion, not be
      // forgotten because the network blinked.
      for (const scope of scopes) pending.add(scope)
    } finally {
      syncing.value = false
      pushing = null
    }
  })()
  return pushing
}

let started = false

/**
 * Start syncing. Called once from App.vue: a pull when the account resolves (or changes), a
 * debounced push whenever a mark moves, and a last push on the way out of the page — a star
 * tapped on the way to closing the tab should not be the one that gets lost.
 */
export function startPrefsSync() {
  if (started) return
  started = true
  const { status } = useAuth()

  // Tombstones nobody can still need, swept once per session rather than on a timer. The scopes
  // it touches become dirty, so the cloud learns they are gone too.
  for (const { store } of PARTS) store.sweep()

  watch(
    status,
    (s) => {
      if (s !== 'authed') {
        // Signing out is not a reason to forget marks: they stay on the device, as they were
        // before there was an account. Only what we know about the cloud is dropped.
        etag = null
        versions.clear()
        checked.value = false
        return
      }
      void pullPrefs()
    },
    { immediate: true },
  )

  for (const { store } of PARTS) {
    watch(store.revision, () => {
      if (status.value !== 'authed' || !checked.value) return
      for (const scope of store.takeDirty()) pending.add(scope)
      schedulePush()
    })
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') void pushPrefs()
    })
  }
}

/**
 * Bring one faction's marks into line with the datasheets this build ships — a rename moves the
 * mark, a retirement takes it off, an id nothing accounts for goes when this build is new enough
 * to say so (markReconcile.js). Called by the screens that have just loaded that faction's sheets,
 * because they are the only place the live ids are known without fetching anything extra; it costs
 * nothing when there is nothing to move, which is almost always.
 */
export function reconcileFactionMarks(slug, liveIds) {
  if (!slug || !liveIds?.size) return
  const renames = datasheetRenames[slug] || {}
  const clean = mayClean()
  for (const { store } of PARTS) {
    const res = reconcileCells(store.cellsOf(slug), { liveIds, renames, mayClean: clean })
    if (res) store.setScope(slug, res.cells)
  }
}

export function useUserPrefs() {
  return { syncing, lastError, checked, accountDataVersion, pullPrefs, pushPrefs, reconcileFactionMarks, GLOBAL_SCOPE }
}

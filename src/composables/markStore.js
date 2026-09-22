import { reactive, ref } from 'vue'
import { getItem, setItem } from './safeStorage.js'

// The storage behind a player's marks — pinned factions, favourite datasheets, the "I own this
// box" collection. The merging is plain functions over plain objects — no Vue, no storage, no
// network — so the one thing that has to be right, what happens when two devices marked
// different things while apart, can be read and tested on its own. `createMarkStore` at the
// bottom is the thin reactive-plus-localStorage wrapper the two composables share.
//
// Everything is shaped as SCOPES of cells, `{ [scope]: { [id]: cell } }`, where a scope is a
// faction slug — or `@factions` for the pinned-faction list, which belongs to no faction. That
// is also the unit the cloud stores one row per, so a single tap rewrites one faction rather
// than everything the player has ever marked.
//
// A mark is a CELL: `{ at, …payload }` for a live one, `{ at, del: 1 }` for one that was taken
// off. Unmarking writes a tombstone instead of deleting the key, because a key that merely
// disappears is indistinguishable from a key the other device has not heard of yet — and the
// union that follows would quietly bring the mark back. That is the whole reason this file
// exists; without tombstones a star could be unstarred on a phone and be back by the time the
// tablet synced.
//
// `at` is the marking device's own clock (epoch ms). Clocks between a player's own devices are
// close enough for this: the worst a skewed one can do is win a race over the same single mark.
// `at: 0` means "marked before this app kept timestamps" — the shape migrated from an older
// build — so any deliberate act, on any device, outranks it.

const TOMBSTONE_MS = 90 * 24 * 60 * 60 * 1000

export const isLive = (cell) => !!cell && !cell.del

/** A live mark, stamped now. `payload` is whatever the mark carries (a count, a name). */
export const liveCell = (payload = {}, at = Date.now()) => ({ ...payload, at })

/** Taking a mark off is a record too — see the tombstone note above. */
export const deadCell = (at = Date.now()) => ({ at, del: 1 })

// Ties have to break the same way on both devices, or the two would "merge" into different
// answers and then overwrite each other forever. Two marks stamped the same millisecond are
// settled by their serialised form, which both sides compute identically.
function wins(a, b) {
  const at = (c) => Number(c?.at) || 0
  if (at(a) !== at(b)) return at(a) > at(b) ? a : b
  if (isLive(a) !== isLive(b)) return isLive(a) ? a : b
  return JSON.stringify(a) >= JSON.stringify(b) ? a : b
}

/**
 * Merge two maps of cells — a union in which the later act wins per mark, never a replacement.
 * A key only one side knows is kept: the other side simply has not heard of it, and dropping it
 * is exactly the data loss this whole design is here to prevent.
 */
export function mergeCells(mine = {}, theirs = {}) {
  const out = { ...mine }
  for (const [id, cell] of Object.entries(theirs)) {
    if (!cell || typeof cell !== 'object') continue
    out[id] = id in out ? wins(out[id], cell) : cell
  }
  return out
}

/** Merge two scope maps (`{ [scope]: { [id]: cell } }`) mark by mark. */
export function mergeScopes(mine = {}, theirs = {}) {
  const out = { ...mine }
  for (const [scope, cells] of Object.entries(theirs)) {
    if (!cells || typeof cells !== 'object') continue
    out[scope] = mergeCells(out[scope], cells)
  }
  return out
}

/**
 * Drop tombstones old enough that nobody can still need them. The window is generous on purpose:
 * a device that has been away longer than this brings back a mark taken off elsewhere, and three
 * months is well past when that stops being plausible. Live marks are never swept.
 */
export function sweepCells(cells = {}, now = Date.now(), ttlMs = TOMBSTONE_MS) {
  const out = {}
  for (const [id, cell] of Object.entries(cells)) {
    if (!isLive(cell) && (Number(cell?.at) || 0) < now - ttlMs) continue
    out[id] = cell
  }
  return out
}

/** Live marks, newest first — which is the order a "Pinned" group is read in. */
export function liveIds(cells = {}) {
  return Object.entries(cells)
    .filter(([, c]) => isLive(c))
    .sort((a, b) => (Number(b[1].at) || 0) - (Number(a[1].at) || 0))
    .map(([id]) => id)
}

/** Keep only well-formed cells — a hand-edited or half-written store must not poison a merge. */
export function cleanCells(raw) {
  const out = {}
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out
  for (const [id, cell] of Object.entries(raw)) {
    if (!cell || typeof cell !== 'object' || Array.isArray(cell)) continue
    const at = Number(cell.at)
    out[id] = cell.del ? { at: Number.isFinite(at) ? at : 0, del: 1 } : { ...cell, at: Number.isFinite(at) ? at : 0 }
  }
  return out
}

/**
 * One player-marks store: a reactive `{ [scope]: { [id]: cell } }` kept in localStorage, plus the
 * bookkeeping the cloud sync needs — which scopes changed since it last looked, and a revision it
 * can watch. `migrate` turns a store written by an older build into scopes of cells; marks that
 * predate timestamps come back stamped 0, so any later act on any device outranks them.
 *
 * Reading a store back never throws and never half-loads: an unreadable or ill-shaped one starts
 * empty rather than taking the app down at module-init time.
 */
export function createMarkStore({ key, version, migrate }) {
  const state = reactive({})
  const dirty = new Set()
  const revision = ref(0)

  function load() {
    let saved
    try {
      saved = JSON.parse(getItem(key) || '{}') || {}
    } catch {
      saved = {}
    }
    const scopes = saved?.v === version ? saved.scopes : migrate(saved)
    for (const [scope, cells] of Object.entries(scopes || {})) {
      const cleaned = cleanCells(cells)
      if (Object.keys(cleaned).length) state[scope] = cleaned
    }
  }

  function persist() {
    setItem(key, JSON.stringify({ v: version, scopes: state }))
  }

  /** Write one mark and remember the scope for the next upload. */
  function setCell(scope, id, cell) {
    if (!scope || !id) return
    if (!state[scope]) state[scope] = {}
    state[scope][id] = cell
    dirty.add(scope)
    revision.value++
    persist()
  }

  const cellsOf = (scope) => state[scope] || {}

  /**
   * Fold in what another device wrote. Returns the scopes whose local copy actually changed, so
   * a pull that brought nothing new costs no upload — the cloud's copy and ours already agree.
   */
  function applyRemote(remote) {
    const changed = []
    for (const [scope, cells] of Object.entries(remote || {})) {
      const before = JSON.stringify(state[scope] || {})
      const merged = mergeCells(state[scope], cleanCells(cells))
      if (JSON.stringify(merged) === before) continue
      state[scope] = merged
      changed.push(scope)
    }
    if (changed.length) {
      revision.value++
      persist()
    }
    return changed
  }

  /** Drop tombstones nobody can still need. Scopes it touches are dirty: the cloud holds them too. */
  function sweep(now = Date.now()) {
    for (const scope of Object.keys(state)) {
      const swept = sweepCells(state[scope], now)
      if (Object.keys(swept).length === Object.keys(state[scope]).length) continue
      state[scope] = swept
      dirty.add(scope)
    }
    if (dirty.size) {
      revision.value++
      persist()
    }
  }

  return {
    state,
    revision,
    cellsOf,
    setCell,
    applyRemote,
    sweep,
    persist,
    scopes: () => Object.keys(state),
    takeDirty: () => {
      const out = [...dirty]
      dirty.clear()
      return out
    },
    markDirty: (scope) => dirty.add(scope),
    load,
  }
}

export { TOMBSTONE_MS }

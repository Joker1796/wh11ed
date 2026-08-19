import { ref, watch } from 'vue'

// Roster builder store — a module singleton persisted to localStorage, mirroring the
// pattern in useTracker.js / useLocale.js. Holds the user's saved army lists; the roster
// EDITOR mutates a roster in place and this layer auto-saves it. Deliberately imports NO
// faction data files (src/data/roster/*) — the list screen must stay in the light entry
// chunk; only the editor dynamic-imports the heavy per-faction data (PWA invariant).

const KEY = 'wh11ed-rosters'
// Bump `v` when the stored shape changes; `migrate()` below is the single upgrade point.
const SCHEMA_VERSION = 3

// A stable unique id for a roster (and its line entries). crypto.randomUUID is available in
// every browser we target and in Node ≥ 16; the fallback keeps tests / old engines working.
export function uid() {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  } catch { /* ignore */ }
  return `r-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

// A roster is a JSON-serialisable army list. faction/detachment/units are filled in by the
// editor (Phase 4+); the list screen only needs name / meta / summary.
export function makeRoster(name = 'New roster') {
  const now = Date.now()
  return {
    id: uid(),
    name,
    createdAt: now,
    updatedAt: now,
    faction: null,
    // An army may field several detachments (up to its DP budget) — stored by name, like the
    // tracker. `battleSize` is a standard id or 'custom' with `customPoints`.
    detachments: [],
    battleSize: 'strike-force',
    customPoints: 2000,
    // Live-enforces the datasheet duplicate cap (rule 25) while browsing/adding units, on top
    // of validateRoster()'s always-on post-hoc issue. Default true; every read site treats a
    // missing field (rosters saved before this existed) as true too — see rosterValidation.js's
    // duplicateLimit/duplicateCounts and RosterUnitBrowser.vue's atCap guard.
    checkLegality: true,
    units: [],
    // Denormalised by the editor so the list never has to load faction data to show a total.
    summary: { points: 0, unitCount: 0, issues: 0 },
  }
}

// Minimal shape guard: a corrupt or old blob can JSON.parse fine yet be the wrong shape and
// throw deep in a render. Keep only entries that look like a roster.
export function isValidRoster(r) {
  return (
    !!r && typeof r === 'object' &&
    typeof r.id === 'string' &&
    typeof r.name === 'string' &&
    Array.isArray(r.units)
  )
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function migrate(env) {
  // env is the parsed { v, rosters } envelope (or something older/broken). Future schema
  // bumps branch on env.v here.
  const rosters = Array.isArray(env?.rosters) ? env.rosters.filter(isValidRoster) : []
  for (const r of rosters) {
    // Detachments are stored by NAME now (was a single sid). Coerce to an array and drop any
    // uuid-shaped leftovers — a pre-multi-detachment roster stored the detachment's appdata sid,
    // which can't be resolved to a name here, so it must not linger as a selection.
    if (!Array.isArray(r.detachments)) r.detachments = []
    r.detachments = r.detachments.filter((n) => typeof n === 'string' && !UUID_RE.test(n))
    delete r.detachment

    // → v3: a wargear pick is stored as a pair of INDICES (group, option) into the generated
    // data, and the generator renumbered both — options wherever one turned out to be a bundle
    // of items ("1 hexrifle and 1 torturer's tool"), groups wherever a unit-wide instruction had
    // been recorded once per miniature and got folded into one. An old index now points at a
    // different weapon, so the picks are dropped rather than silently re-interpreted. Nothing
    // else is touched: the units, their sizes, enhancements and attachments all stay.
    if (!(env?.v >= 3)) for (const u of r.units || []) delete u.wg
  }
  return rosters
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return migrate(JSON.parse(raw))
  } catch {
    return []
  }
}

const rosters = ref(load())

// Auto-save on every mutation (debounced), flushed before the page goes away — same machinery
// and rationale as useTracker.js (an installed iOS PWA can be frozen without firing pagehide).
const SAVE_DELAY = 500
let saveTimer = null

function flushSave() {
  if (saveTimer) { clearTimeout(saveTimer); saveTimer = null }
  try {
    localStorage.setItem(KEY, JSON.stringify({ v: SCHEMA_VERSION, rosters: rosters.value }))
  } catch { /* quota / private mode — ignore */ }
}

function scheduleSave() {
  if (!saveTimer) saveTimer = setTimeout(() => { saveTimer = null; flushSave() }, SAVE_DELAY)
}

// Force an immediate synchronous persist — for the infrequent, critical mutations
// (create / duplicate / delete / import) a frozen-PWA debounce window must not drop them.
function saveNow() { flushSave() }

watch(rosters, scheduleSave, { deep: true })

if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', flushSave)
  window.addEventListener('beforeunload', flushSave)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushSave()
  })
}

function touch(r) { r.updatedAt = Date.now() }

function createRoster(name) {
  const r = makeRoster(name)
  rosters.value.unshift(r)
  saveNow()
  return r
}

function duplicateRoster(id, copySuffix = ' (copy)') {
  const src = rosters.value.find((r) => r.id === id)
  if (!src) return null
  const copy = JSON.parse(JSON.stringify(src))
  copy.id = uid()
  copy.name = `${src.name}${copySuffix}`
  copy.createdAt = copy.updatedAt = Date.now()
  const at = rosters.value.findIndex((r) => r.id === id)
  rosters.value.splice(at + 1, 0, copy)
  saveNow()
  return copy
}

function deleteRoster(id) {
  const at = rosters.value.findIndex((r) => r.id === id)
  if (at === -1) return
  rosters.value.splice(at, 1)
  saveNow()
}

function renameRoster(id, name) {
  const r = rosters.value.find((x) => x.id === id)
  if (!r) return
  r.name = name
  touch(r)
  scheduleSave()
}

// Apply a partial patch to a roster (used by the editor). Persist is debounced.
function updateRoster(id, patch) {
  const r = rosters.value.find((x) => x.id === id)
  if (!r) return null
  Object.assign(r, patch)
  touch(r)
  scheduleSave()
  return r
}

// Import a roster object (from a share link / text) as a NEW saved roster with a fresh id, so
// importing can never clobber an existing one. Share payloads deliberately omit id/timestamps
// (assigned here) and summary (recomputed by the editor) — so validate only the essentials.
function importRoster(obj, name) {
  if (!obj || typeof obj !== 'object' || !Array.isArray(obj.units)) return null
  const r = JSON.parse(JSON.stringify(obj))
  r.id = uid()
  r.name = name || r.name || 'Roster'
  r.createdAt = r.updatedAt = Date.now()
  if (!r.summary) r.summary = { points: 0, unitCount: r.units.length, issues: 0 }
  rosters.value.unshift(r)
  saveNow()
  return r
}

function rosterById(id) {
  return rosters.value.find((r) => r.id === id) || null
}

export function useRosters() {
  return {
    rosters,
    createRoster,
    duplicateRoster,
    deleteRoster,
    renameRoster,
    updateRoster,
    importRoster,
    rosterById,
    saveNow,
  }
}

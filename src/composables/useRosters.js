import { computed, ref, watch } from 'vue'

// Roster builder store — a module singleton persisted to localStorage, mirroring the
// pattern in useTracker.js / useLocale.js. Holds the user's saved army lists; the roster
// EDITOR mutates a roster in place and this layer auto-saves it. Deliberately imports NO
// faction data files (src/data/roster/*) — the list screen must stay in the light entry
// chunk; only the editor dynamic-imports the heavy per-faction data (PWA invariant).

const KEY = 'wh11ed-rosters'
// Bump `v` when the stored shape changes; `migrateRoster()` below is the single upgrade point.
// Exported because a SHARE LINK carries the same shape and the same version (rosterShare.js) — a
// payload built by an older build has to be read through the same migration a stored roster is.
export const SCHEMA_VERSION = 6

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

// ── Drafts ───────────────────────────────────────────────────────────────────────────────────
// A roster the creation wizard is still working on carries `draft: true` and `draftStep` (the
// step it was left on). Both are ABSENT on a saved list — including every roster that predates
// this — so "no flag" reads as "saved" with no migration needed, and `saveDraft()` removes them
// rather than setting false so a saved roster is indistinguishable from one that never was a
// draft. A draft is real and persisted (that is the point: a reload must not lose it) but it is
// not a list yet: it shows only on the Drafts tab of /roster and can't be attached to a game.
// The flags never travel — rosterShare.js's PICK is a whitelist, so a link/snapshot carries the
// army and nothing about how it was made.
export const isDraft = (r) => r?.draft === true

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

// The datasheets whose option lists renumbered in v6, matched with or without a faction prefix
// (an allied unit is stored as "astra-militarum/deathwatch-kill-team").
const V6_RENUMBERED = /(^|\/)(cadian-recon-squad|militarum-tempestus-command-squad|deathwatch-veterans|deathwatch-kill-team|ironkin-steeljacks-with-heavy-volkanite-disintegrators)$/

// Bring ONE roster up to the current shape. Shared by the stored envelope below and by an imported
// share payload, which is the same shape carried in a URL and can be just as old — importing used
// to skip this entirely, so a link built under an older schema was saved with indices pointing at
// whatever weapon now sits at that position.
export function migrateRoster(r, v) {
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
  if (!(v >= 3)) for (const u of r.units || []) delete u.wg

  // → v4: a unit's size is stored as an INDEX into the generated bracket list, and the generator
  // folded the brackets appdata publishes twice (the same composition repeated under an ally
  // grouping keyword — Aquila Kill Team listed 5-at-100 and 10-at-200 once plain and once for
  // Imperium). 42 brackets disappeared, so an old index can point at a different size. The size
  // falls back to the unit's default bracket instead of being re-read; everything else stays.
  if (!(v >= 4)) for (const u of r.units || []) { delete u.size; delete u.count }

  // → v5: the same renumbering as v3, but this time it reached exactly two datasheets, so only
  // they are touched. The generator learned to read a pairing whose instruction misspells one of
  // its own items ("1 tarsus buckler" for the Tarsis buckler), and the Venatari Custodians' lance
  // swap and the Rogal Dorn's turret swap each became ONE bundled option where they had been two.
  if (!(v >= 5)) {
    for (const u of r.units || []) {
      if (/(^|\/)(venatari-custodians|rogal-dorn-battle-tank)$/.test(u.id || '')) delete u.wg
    }
  }

  // → v6: the same event again, on five datasheets. appdata spells an item one way in its item
  // table and another way in the instruction that names it — "1 hot‐shot laspistol and 1
  // medi‐pack" with a U+2010 hyphen where the item itself is stored with a plain one — so
  // pairings the prose does state were read as separate options. Reading through the hyphen folded
  // each of them into one bundled option, which moved every option index after it.
  if (!(v >= 6)) {
    for (const u of r.units || []) {
      if (V6_RENUMBERED.test(u.id || '')) delete u.wg
    }
  }
  return r
}

function migrate(env) {
  // env is the parsed { v, rosters } envelope (or something older/broken). Future schema
  // bumps branch on env.v inside migrateRoster.
  const rosters = Array.isArray(env?.rosters) ? env.rosters.filter(isValidRoster) : []
  for (const r of rosters) migrateRoster(r, env?.v)
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
// (assigned here) and summary (recomputed on this side) — so validate only the essentials.
//
// The payload's own `v` decides how it is read: it is the same versioned shape as a stored roster
// and can predate the current schema, so it goes through the same migration rather than being
// trusted as-is. A payload with no `v` at all is older than that field and is migrated from zero.
function importRoster(obj, name) {
  if (!obj || typeof obj !== 'object' || !Array.isArray(obj.units)) return null
  const r = JSON.parse(JSON.stringify(obj))
  const version = r.v
  delete r.v
  migrateRoster(r, version)
  r.id = uid()
  r.name = name || r.name || 'Roster'
  r.createdAt = r.updatedAt = Date.now()
  // No summary is fabricated here: the points are the SENDER's arithmetic and this side can't
  // check them without the faction data. Left unset, it reads as "nobody has priced this yet",
  // which is what refreshSummaries() repairs on the list screen (rosterSummary.js).
  delete r.summary
  rosters.value.unshift(r)
  saveNow()
  return r
}

// The two halves of the collection. Every screen picks one deliberately: the roster list's tabs
// show both, the tracker's picker only `savedRosters` (an unfinished list has no business being
// fielded), and `rosters` stays for the few things that mean all of them.
const savedRosters = computed(() => rosters.value.filter((r) => !isDraft(r)))
const draftRosters = computed(() => rosters.value.filter(isDraft))

// The wizard's "Save": the draft becomes an ordinary saved list. Immediate persist, like the other
// deliberate one-off mutations — this is the click the user would be most surprised to lose.
function saveDraft(id) {
  const r = rosters.value.find((x) => x.id === id)
  if (!r) return null
  delete r.draft
  delete r.draftStep
  touch(r)
  saveNow()
  return r
}

// Adopt a roster that came from the cloud (useRosterSync.js). The payload is the same shape a
// share link carries — the stored object plus its schema `v` — so it goes through the same
// migration: a list uploaded by an older build must not be trusted as-is. Replaces the local copy
// in place when we already have that id (last-write-wins is decided by the caller), otherwise
// prepends it. This store stays the single writer of `rosters`; the sync layer never splices.
function adoptFromCloud(obj) {
  if (!obj || typeof obj !== 'object') return null
  const r = JSON.parse(JSON.stringify(obj))
  const version = r.v
  delete r.v
  migrateRoster(r, version)
  if (!isValidRoster(r)) return null
  // The cloud only ever holds saved lists; strip the flags rather than trusting a stray one, so a
  // bad blob can't materialise as a draft that the wizard would then try to resume.
  delete r.draft
  delete r.draftStep
  const at = rosters.value.findIndex((x) => x.id === r.id)
  if (at === -1) rosters.value.unshift(r)
  else rosters.value.splice(at, 1, r)
  saveNow()
  return r
}

function rosterById(id) {
  return rosters.value.find((r) => r.id === id) || null
}

export function useRosters() {
  return {
    rosters,
    savedRosters,
    draftRosters,
    saveDraft,
    createRoster,
    duplicateRoster,
    deleteRoster,
    renameRoster,
    updateRoster,
    importRoster,
    adoptFromCloud,
    rosterById,
    saveNow,
  }
}

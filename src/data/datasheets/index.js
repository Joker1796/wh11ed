// Lazy per-faction datasheet loader. Each src/data/datasheets/<slug>.js (maintained in place
// and diffed against wh40k-appdata by `npm run sync`) is code-split into its own chunk via
// import.meta.glob and only fetched when FactionDatasheetsView shows that faction — the
// datasheet data must never be imported statically (it would bloat the shared view chunk).
const modules = import.meta.glob(['./*.js', '!./index.js', '!./*.test.js'])

// The 5 Space Marines Chapter codex files (Deathwatch, Black Templars, Blood Angels, Dark
// Angels, Space Wolves) don't duplicate datasheets that are byte-identical to their
// space-marines.js counterpart — each exports a `sharedUnitIds` list instead (see one of
// those files for how the split was derived). loadDatasheets folds the referenced
// space-marines.js entries back in so callers still see one flat per-faction list; unit
// ids/URLs are unaffected either way. Kept here (not duplicated in ru/index.js) so both
// loaders resolve "who shares what" from one place.
export async function sharedIdsFor(slug) {
  const loader = modules[`./${slug}.js`]
  if (!loader) return null
  const mod = await loader()
  return mod.sharedUnitIds?.length ? mod.sharedUnitIds : null
}

// Every keyword any unit in the game can carry (../unitKeywordVocabulary.js, generated with the
// datasheet index) — what the rules core reads a rule's targets against (ruleTargets' scopesMisread).
// Loaded with the roster screens, once.
/** @type {string[] | null} */
let vocabulary = null
export async function loadKeywordVocabulary() {
  if (!vocabulary) vocabulary = (await import('../unitKeywordVocabulary.js')).unitKeywordVocabulary
  return vocabulary
}

// `cp` — a Combat Patrol box fielded as a list (a roster's `cp`): its sheets come along, from
// combatPatrol.js (combatPatrolSheets.js). Only the roster screens ask; a faction page never does.
/** @param {string} slug @param {{ cp?: string | null }} [opts] */
export async function loadDatasheets(slug, { cp = null } = {}) {
  const sheets = await loadFactionSheets(slug)
  if (!cp || !sheets) return sheets
  const { boxSheets } = await import('../combatPatrolSheets.js')
  return [...sheets, ...(await boxSheets(cp))]
}

async function loadFactionSheets(slug) {
  const loader = modules[`./${slug}.js`]
  if (!loader) return null
  const mod = await loader()
  const own = mod.default
  const sharedIds = await sharedIdsFor(slug)
  if (!sharedIds) return own
  const smLoader = modules['./space-marines.js']
  const sm = smLoader ? (await smLoader()).default : []
  const idSet = new Set(sharedIds)
  // A handful of shared units cost this Chapter more/less than the space-marines.js
  // price (appdata prices them per-Chapter, e.g. Blood Angels' Bladeguard Veteran Squad) —
  // an optional `pointsOverrides` export (id -> replacement `points` array) swaps just
  // that field on the folded-in entry, everything else still comes from space-marines.js.
  const overrides = mod.pointsOverrides || {}
  const shared = sm
    .filter((d) => idSet.has(d.id))
    .map((d) => (overrides[d.id] ? { ...d, points: overrides[d.id] } : d))
  return [...own, ...shared]
}

// Compact points summary (flat cost or min–max range) shared by the list chips and the
// datasheet page header; the full sizes × copy-tiers breakdown lives in DatasheetCard.
export function ptsSummary(points) {
  if (!points?.length) return ''
  const vals = points.map((p) => p.points)
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  if (min !== max) return `${min}–${max} pts`
  const models = points[0].models
  return (models > 1 ? `${models}× ` : '') + `${min} pts`
}

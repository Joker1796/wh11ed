// Lazy per-faction datasheet RU overlays. Each ./<slug>.js exports a sparse `default`
// object keyed by datasheet **id** with ONLY the translated prose for that sheet
// (flavor, ability texts, composition, loadout, options, damaged/leader/transport text).
// Unit names, weapon profiles, stats, keywords, core & faction rule names, and [BRACKET]
// tags stay English and inherit from EN. An optional `abilityNamesRu` named export maps
// English ability names → RU display names, which replace the ability name in the card
// header; the original is carried alongside as `nameEn` and the card shows it small, in
// brackets. Necrons instead carries the name inline via the per-sheet overlay's { name, text }
// form; both paths translate the header, and both record `nameEn`.
//
// Loaded on demand by FactionDatasheetView only in the RU locale, so the overlays never
// enter the EN bundle. Each ./<slug>.js is code-split into its own chunk via glob.
const modules = import.meta.glob(['./*.js', '!./index.js', '!./localize.js', '!./*.test.js'])
export { localizeSheet } from './localize.js'

// Resolves the RU overlay MODULE for a faction (or null). Returns the whole module
// namespace so both `default` (the id→overlay map) and `abilityNamesRu` are available
// from a single lazy import. For the 5 SM-Chapter codex factions (see `sharedIdsFor` in
// ../index.js), also folds in space-marines.js's own RU overlay entries for the shared
// unit ids — the chapter's own entry for an id wins if both exist.
/**
 * @param {string} slug
 * @param {{ cp?: string | null }} [opts] `cp` — a Combat Patrol box fielded as a list: its sheets'
 *   translation joins the faction's (combatPatrolSheets.js), as loadDatasheets adds its sheets.
 * @returns {Promise<import('../../../core/shared/data.types.js').DatasheetsRuModule | null>}
 */
export async function loadDatasheetsRu(slug, { cp = null } = {}) {
  const mod = await loadFactionRu(slug)
  if (!cp) return mod
  const { boxSheetsRuOverlay } = await import('../../combatPatrolSheets.js')
  return { ...(mod || {}), default: { ...(mod?.default || {}), ...(await boxSheetsRuOverlay(cp)) } }
}

async function loadFactionRu(slug) {
  const loader = modules[`./${slug}.js`]
  const own = loader ? await loader() : null
  const { sharedIdsFor } = await import('../index.js')
  const sharedIds = await sharedIdsFor(slug)
  if (!sharedIds) return own
  const smLoader = modules['./space-marines.js']
  const sm = smLoader ? await smLoader() : null
  const idSet = new Set(sharedIds)
  const sharedDefault = Object.fromEntries(
    Object.entries(sm?.default || {}).filter(([id]) => idSet.has(id)),
  )
  return {
    default: { ...sharedDefault, ...(own?.default || {}) },
    abilityNamesRu: { ...(sm?.abilityNamesRu || {}), ...(own?.abilityNamesRu || {}) },
  }
}

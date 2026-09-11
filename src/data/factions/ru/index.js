// Lazy per-faction RU overlays. Each ./<slug>.js exports a sparse object mirroring the
// EN faction structure with ONLY the translated fields (armyRule/detachment rule flavor,
// body, example; stratagem flavor/when/target/effect/restrictions; enhancement
// flavor/body/note). Names of detachments and rules, ids, dp, points, keywords stay
// English and inherit from EN via deepOverlay; stratagem and enhancement names get an
// optional RU display line instead (see stratNamesRu/enhNamesRu below). Loaded on demand
// by useFactionPage only in the RU locale, so the overlays never enter the EN bundle.
const modules = import.meta.glob(['./*.js', '!./index.js', '!./*.test.js'])

// Resolves the RU overlay MODULE for a faction (or null). The module's `default` export is
// the sparse overlay merged by deepOverlay; optional `stratNamesRu`/`enhNamesRu` named
// exports map English stratagem/enhancement names → RU display names (see
// useFactionPage). Returning the whole module namespace keeps all of these available from
// a single lazy import.
export function loadFactionRu(slug) {
  const loader = modules[`./${slug}.js`]
  return loader ? loader().then((m) => m) : Promise.resolve(null)
}

// Generic sparse-overlay merge — extracted to ../deepOverlay.js (also used by
// src/data/combatPatrol.js). Re-exported here so existing imports of `deepOverlay` from this
// module keep working unchanged.
export { deepOverlay } from '../../deepOverlay.js'

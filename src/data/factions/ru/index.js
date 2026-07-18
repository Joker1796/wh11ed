// Lazy per-faction RU overlays. Each ./<slug>.js exports a sparse object mirroring the
// EN faction structure with ONLY the translated fields (armyRule/detachment rule flavor,
// body, example; stratagem flavor/when/target/effect/restrictions; enhancement
// flavor/body/note). Names of detachments and rules, ids, dp, points, keywords stay
// English and inherit from EN via deepOverlay; stratagem and enhancement names get an
// optional RU display line instead (see stratNamesRu/enhNamesRu below). Loaded on demand
// by useFactionPage only in the RU locale, so the overlays never enter the EN bundle.
const modules = import.meta.glob(['./*.js', '!./index.js'])

// Resolves the RU overlay MODULE for a faction (or null). The module's `default` export is
// the sparse overlay merged by deepOverlay; optional `stratNamesRu`/`enhNamesRu` named
// exports map English stratagem/enhancement names → RU display names (see
// useFactionPage). Returning the whole module namespace keeps all of these available from
// a single lazy import.
export function loadFactionRu(slug) {
  const loader = modules[`./${slug}.js`]
  return loader ? loader().then((m) => m) : Promise.resolve(null)
}

// Merge a sparse RU overlay over the EN object: objects merge per key, any other overlay
// value wins, fields absent from the overlay inherit EN. Arrays of entities (detachments,
// stratagems, enhancements, ...) match by stable key (`id`, else `name`) whenever the RU
// side actually carries one — so an EN array that gets reordered/regenerated later doesn't
// silently misalign the RU overlay. Today's hand-authored RU overlays are positional (no
// `id`/`name` on their array entries, by design — see each ru/<slug>.js header), so this
// falls back to index-based matching for those, unchanged from before.
export function deepOverlay(en, ru) {
  if (ru === undefined || ru === null) return en
  if (Array.isArray(en) && Array.isArray(ru)) {
    const key = (v) => (v && typeof v === 'object' ? (v.id ?? v.name) : undefined)
    if (ru.some((v) => key(v) !== undefined)) {
      const ruByKey = new Map(ru.map((v) => [key(v), v]).filter(([k]) => k !== undefined))
      return en.map((v) => deepOverlay(v, ruByKey.get(key(v))))
    }
    return en.map((v, i) => deepOverlay(v, ru[i]))
  }
  if (en && ru && typeof en === 'object' && typeof ru === 'object' && !Array.isArray(en) && !Array.isArray(ru)) {
    const out = { ...en }
    for (const k of Object.keys(ru)) out[k] = deepOverlay(en[k], ru[k])
    return out
  }
  return ru
}

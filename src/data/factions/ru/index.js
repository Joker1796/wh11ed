// Lazy per-faction RU overlays. Each ./<slug>.js exports a sparse object mirroring the
// EN faction structure with ONLY the translated fields (armyRule/detachment rule flavor,
// body, example; stratagem flavor/when/target/effect/restrictions; enhancement
// flavor/body/note). Names of detachments, stratagems, enhancements and rules, ids, dp,
// points, keywords stay English and inherit from EN via deepOverlay. Loaded on demand by
// useFactionPage only in the RU locale, so the overlays never enter the EN bundle.
const modules = import.meta.glob(['./*.js', '!./index.js'])

export function loadFactionRu(slug) {
  const loader = modules[`./${slug}.js`]
  return loader ? loader().then((m) => m.default) : Promise.resolve(null)
}

// Merge a sparse RU overlay over the EN object: objects merge per key, arrays per index
// (overlay arrays must follow the EN order), any other overlay value wins. Fields absent
// from the overlay inherit EN.
export function deepOverlay(en, ru) {
  if (ru === undefined || ru === null) return en
  if (Array.isArray(en) && Array.isArray(ru)) return en.map((v, i) => deepOverlay(v, ru[i]))
  if (en && ru && typeof en === 'object' && typeof ru === 'object' && !Array.isArray(en) && !Array.isArray(ru)) {
    const out = { ...en }
    for (const k of Object.keys(ru)) out[k] = deepOverlay(en[k], ru[k])
    return out
  }
  return ru
}

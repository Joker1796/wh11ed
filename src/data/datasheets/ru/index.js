// Lazy per-faction datasheet RU overlays. Each ./<slug>.js exports a sparse `default`
// object keyed by datasheet **id** with ONLY the translated prose for that sheet
// (flavor, ability texts, composition, loadout, options, damaged/leader/transport text).
// Unit names, weapon profiles, stats, keywords, core & faction rule names, and [BRACKET]
// tags stay English and inherit from EN. An optional `abilityNamesRu` named export maps
// English ability names → RU display names (shown as a small line under the English name,
// mirroring the stratagem-name pattern in useFactionPage).
//
// Loaded on demand by FactionDatasheetView only in the RU locale, so the overlays never
// enter the EN bundle. Each ./<slug>.js is code-split into its own chunk via glob.
const modules = import.meta.glob(['./*.js', '!./index.js'])

// Resolves the RU overlay MODULE for a faction (or null). Returns the whole module
// namespace so both `default` (the id→overlay map) and `abilityNamesRu` are available
// from a single lazy import.
export function loadDatasheetsRu(slug) {
  const loader = modules[`./${slug}.js`]
  return loader ? loader().then((m) => m) : Promise.resolve(null)
}

// Merge a sparse RU overlay for ONE datasheet over its EN object. Ability lists are keyed
// by the English ability name (robust to reordering); `abilities`/`wargearAbilities`/
// `specialAbilities` overlay values are { [enName]: ruText } maps. `composition`/`options`
// are full-replacement arrays (author them in EN order). Everything absent inherits EN.
export function localizeSheet(en, overlay, abilityNamesRu) {
  if (!en) return en
  const o = overlay || {}
  const names = abilityNamesRu || {}
  const s = { ...en }

  if (o.flavor) s.flavor = o.flavor
  if (o.transport) s.transport = o.transport
  if (o.loadout) s.loadout = o.loadout
  if (o.composition) s.composition = o.composition
  if (o.options) s.options = o.options
  if (o.damaged) s.damaged = { ...en.damaged, ...o.damaged }
  if (o.leader) s.leader = { ...en.leader, ...o.leader }

  // Abilities: attach a RU display name (nameRu) from the global map and swap in the
  // translated text from this sheet's per-list overlay map, keyed by English name.
  const localizeAbilities = (list, textMap) =>
    (list || []).map((a) => {
      const out = { ...a }
      if (names[a.name]) out.nameRu = names[a.name]
      if (textMap && textMap[a.name]) out.text = textMap[a.name]
      return out
    })

  if (en.abilities) s.abilities = localizeAbilities(en.abilities, o.abilities)
  if (en.wargearAbilities) s.wargearAbilities = localizeAbilities(en.wargearAbilities, o.wargearAbilities)
  if (en.specialAbilities) s.specialAbilities = localizeAbilities(en.specialAbilities, o.specialAbilities)

  return s
}

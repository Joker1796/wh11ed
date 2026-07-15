// Lazy per-faction datasheet RU overlays. Each ./<slug>.js exports a sparse `default`
// object keyed by datasheet **id** with ONLY the translated prose for that sheet
// (flavor, ability texts, composition, loadout, options, damaged/leader/transport text).
// Unit names, weapon profiles, stats, keywords, core & faction rule names, and [BRACKET]
// tags stay English and inherit from EN. An optional `abilityNamesRu` named export maps
// English ability names → RU display names, which replace the ability name in the card
// header (the English name is not shown). Necrons instead carries the name inline via the
// per-sheet overlay's { name, text } form; both paths translate the header, none add a subline.
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
// `specialAbilities` overlay values are { [enName]: ruText } maps — or, to also override the
// translated header name for that entry, { [enName]: { name, text } }.
// `composition`/`options` are full-replacement arrays (author them in EN order). Everything
// absent inherits EN.
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

  // Abilities: translate the display name in the header from the global map and swap in the
  // translated text from this sheet's per-list overlay map, keyed by English name. An
  // overlay entry can also be { name, text } to override the header name for that entry.
  const localizeAbilities = (list, textMap) =>
    (list || []).map((a) => {
      const out = { ...a }
      // Translate the ability NAME directly in the card header (no English kept, no
      // separate subline). The global map is keyed by the original English name; the
      // per-sheet overlay's { name, text } form can override it further (Necrons-style).
      if (names[a.name]) out.name = names[a.name]
      const overlay = textMap && textMap[a.name]
      if (typeof overlay === 'string') {
        out.text = overlay
      } else if (overlay) {
        if (overlay.name) out.name = overlay.name
        if (overlay.text) out.text = overlay.text
      }
      return out
    })

  // Overlays were authored with both key spellings (`wargear`/`special` in the earlier
  // files, `wargearAbilities`/`specialAbilities` in later ones) — accept both, or the
  // short-form texts are silently ignored.
  if (en.abilities) s.abilities = localizeAbilities(en.abilities, o.abilities)
  if (en.wargearAbilities) s.wargearAbilities = localizeAbilities(en.wargearAbilities, o.wargearAbilities || o.wargear)
  if (en.specialAbilities) s.specialAbilities = localizeAbilities(en.specialAbilities, o.specialAbilities || o.special)
  // `rules` — standalone named datasheet rules, each rendered as its own card (see
  // DatasheetCard.vue), distinct from the grouped `specialAbilities` card.
  if (en.rules) s.rules = localizeAbilities(en.rules, o.rules)

  // `abilitySets` — Primarch/named-character "pick one" groups; heading = parent ability name.
  // Overlay: { [setName]: { name?: ruHeading, options: { [enName]: ruText | {name,text} } } }.
  // Option translations authored under the old `specialAbilities` map (before these abilities
  // were grouped into a set) still apply as a fallback, so overlays needn't be migrated.
  if (en.abilitySets) s.abilitySets = en.abilitySets.map((set) => {
    const so = (o.abilitySets && o.abilitySets[set.name]) || {}
    const textMap = { ...(o.specialAbilities || o.special || {}), ...(so.options || {}) }
    const out = { ...set, options: localizeAbilities(set.options, textMap) }
    if (names[set.name] || so.name) out.name = names[set.name] || so.name
    return out
  })

  return s
}

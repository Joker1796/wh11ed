// Generic sparse-overlay merge: merges a partial RU tree over its EN counterpart, so a
// translation only needs to write the fields that actually change (prose), while ids, stats,
// keywords, names and anything else untranslated inherits from EN automatically. Objects merge
// per key; arrays of entities match by stable key (`id`, else `name`) whenever the overlay side
// actually carries one, falling back to positional (index) matching otherwise. Shared by the
// per-faction RU overlays (src/data/factions/ru/index.js) and src/data/combatPatrol.js.
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

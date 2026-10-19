// A Combat Patrol box's datasheets for the roster screens, which know a faction's sheets by id
// (src/data/datasheets/<slug>.js) and nothing of a box's: a box fielded as a list (the tracker's
// Combat Patrol game, `roster.cp`) has units whose sheets live in combatPatrol.js. loadDatasheets /
// loadDatasheetsRu take `{ cp }` and add these; nothing else asks, so a faction page never shows
// them. combatPatrol.js is heavy and dynamically imported here, only when a box is asked for.

/** The box's sheets, English, each marked with its box. */
export async function boxSheets(boxId) {
  if (!boxId) return []
  const { combatPatrol } = await import('./combatPatrol.js')
  const box = combatPatrol.en.factions.find((b) => b.id === boxId)
  return (box?.datasheets || []).map((d) => ({ ...d, cpBox: boxId }))
}

/**
 * The box's RU translation in the shape a datasheet RU overlay has (localizeSheet): keyed by sheet
 * id, its abilities keyed by English name. combatPatrolRu.js writes abilities as `{ name, text }`
 * lists in the English order, the rest (loadout, composition, damaged…) as the overlay does.
 */
export async function boxSheetsRuOverlay(boxId) {
  if (!boxId) return {}
  const { combatPatrolRu } = await import('./combatPatrolRu.js')
  const box = (combatPatrolRu.factions || []).find((b) => b.id === boxId)
  const byName = (list) => (list?.length ? Object.fromEntries(list.filter((a) => a?.name && a.text).map((a) => [a.name, a.text])) : undefined)
  const out = {}
  for (const d of box?.datasheets || []) {
    const { id, abilities, wargearAbilities, specialAbilities, ...rest } = d
    out[id] = {
      ...rest,
      ...(abilities && { abilities: byName(abilities) }),
      ...(wargearAbilities && { wargearAbilities: byName(wargearAbilities) }),
      ...(specialAbilities && { specialAbilities: byName(specialAbilities) }),
    }
  }
  return out
}

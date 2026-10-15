// A mission's RU overlay laid over its English card, position for position: the shape both
// missionsRu.js (Chapter Approved) and combatPatrolMissionsRu.js write. The name stays English
// (nameRu becomes the subline), the briefing is swapped in whole, and the rest is merged per
// block and per row — whatever the overlay lacks keeps its English.
export function overlayMission(m, tr) {
  if (!m || !tr) return m
  return {
    ...m,
    ...(tr.nameRu ? { nameRu: tr.nameRu } : {}),
    ...(tr.briefing ? { briefing: tr.briefing } : {}),
    ...(tr.lore ? { lore: tr.lore } : {}),
    blocks: m.blocks.map((b, bi) => {
      const tb = tr.blocks && tr.blocks[bi]
      if (!tb) return b
      return {
        ...b,
        heading: tb.heading ?? b.heading,
        when: b.when != null ? (tb.when ?? b.when) : b.when,
        rows: b.rows.map((r, ri) => ({ ...r, text: (tb.rows && tb.rows[ri]) || r.text })),
      }
    }),
  }
}

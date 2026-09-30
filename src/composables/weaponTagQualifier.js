// A weapon ability written with what it applies to — "[LETHAL HITS: NON-MONSTER/VEHICLE]",
// "[ANTI-MONSTER/VEHICLE 3+]" — read into its parts, so the popover can say what THIS tag does
// rather than only what the bare ability does (owner, 2026-09-30).
//
// What the parts mean is the Core Rules' and the FAQ's, not ours:
//   • 24.01: "If a weapon ability is followed by one or more keywords, … that ability only applies
//     if the target unit has one or more of those keywords" — "[SUSTAINED HITS 1: INFANTRY/BEASTS]".
//   • [ANTI-X Y+]: against a unit with keyword X, an unmodified wound roll of Y+ is a critical wound.
//   • FAQ: "ANTI-non-(any keyword) triggers on any unit that does not have the specified keyword" —
//     the same NON- reading is taken for a qualifier ("LETHAL HITS: NON-MONSTER/VEHICLE").

// → { base, keywords, negated, anti? } or null for a tag that carries no target keywords.
export function parseWeaponTag(tag) {
  const t = String(tag || '').replace(/^\[|\]$/g, '').trim().toUpperCase()
  const anti = t.match(/^ANTI-(NON-)?(.+?)\s+(\d\+)$/)
  if (anti) return { base: 'ANTI', keywords: anti[2].split('/'), negated: !!anti[1], anti: anti[3] }
  const q = t.match(/^(.+?):\s*(NON-)?([A-Z][A-Z’' /-]*)$/)
  if (q) return { base: q[1], keywords: q[3].split('/'), negated: !!q[2] }
  return null
}

const join = (kws, word) => (kws.length < 2 ? kws[0] : `${kws.slice(0, -1).join(', ')} ${word} ${kws.at(-1)}`)
const neither = (kws, first, word) => (kws.length < 2 ? kws[0] : `${first} ${kws.slice(0, -1).join(', ')} ${word} ${kws.at(-1)}`)

// What this tag does, one paragraph ahead of the ability's own text. Keywords stay in capitals,
// which the renderer bolds (useRenderInline's auto-bold), in both languages.
export function weaponTagNote(parsed, locale) {
  if (!parsed) return ''
  const { keywords: k, negated, anti } = parsed
  if (locale === 'ru') {
    const none = k.length < 2 ? `нет ${k[0]}` : `нет ни ${k.join(', ни ')}`
    if (anti) {
      return negated
        ? `**Здесь:** против юнита, у которого ${none}, немодифицированный бросок на ранение ${anti} — критическое ранение.`
        : `**Здесь:** против юнита с ключевым словом ${join(k, 'или')} немодифицированный бросок на ранение ${anti} — критическое ранение.`
    }
    return negated
      ? `**Здесь:** способность действует, только если у цели ${none}.`
      : `**Здесь:** способность действует, только если у цели есть ключевое слово ${join(k, 'или')}.`
  }
  const none = k.length < 2 ? `without ${k[0]}` : `with ${neither(k, 'neither', 'nor')}`
  if (anti) {
    return negated
      ? `**Here:** against a unit ${none}, an unmodified wound roll of ${anti} is a critical wound.`
      : `**Here:** against a ${join(k, 'or')} unit, an unmodified wound roll of ${anti} is a critical wound.`
  }
  return negated
    ? `**Here:** the ability only applies if the target is a unit ${none}.`
    : `**Here:** the ability only applies if the target unit has the ${join(k, 'or')} keyword.`
}

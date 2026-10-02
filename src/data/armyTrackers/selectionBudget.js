// Per-battle budget of a `selection` spec whose options are each limited — Space Marines' Combat
// Doctrines: each can be selected once per battle, a detachment may allow one of them (Tactical /
// Devastator / Assault Brethren: `bonusUses`) or any one (Gladius: `spareUses`) one more time, and
// an army of several detachments adds them up (applyOverride sums both).
//
// Kept out of index.js on purpose: the card reads it synchronously on every round change, while the
// specs themselves stay behind the dynamic import.
//
// `byRound` is the stored per-round pick ({ round: optionId }). The round being shown is left out
// of the count, so its own pick can always be kept or changed; every other round counts, before or
// after it — "once per battle" does not care which way the player scrolled.
//
// `limitedSpares` ([{ ids, n }]) is a spare pick only some options may take — Spearpoint Task
// Force's "the assault doctrine or tactical doctrine one additional time". A pick past an option's
// own allowance draws on a limited spare that covers it first, then on the shared ones.
// Returns { [optionId]: { usedIn: [rounds], open } }, or null for a spec with no per-battle limit.
export function selectionBudget(spec, byRound, round) {
  if (!spec?.perBattle || !spec.options) return null
  const usedIn = {}
  for (const [r, id] of Object.entries(byRound || {})) {
    if (id && Number(r) !== round) (usedIn[id] ||= []).push(Number(r))
  }
  const own = (id) => spec.perBattle + (spec.bonusUses?.[id] || 0)
  let spare = spec.spareUses || 0
  const limited = (spec.limitedSpares || []).map((l) => ({ ids: l.ids, n: l.n }))
  for (const [id, rs] of Object.entries(usedIn)) {
    let over = Math.max(0, rs.length - own(id))
    for (const l of limited) {
      if (!over || !l.ids.includes(id)) continue
      const take = Math.min(over, l.n)
      l.n -= take
      over -= take
    }
    spare -= over
  }
  const out = {}
  for (const o of spec.options) {
    const rs = (usedIn[o.id] || []).sort((a, b) => a - b)
    const limitedLeft = limited.some((l) => l.n > 0 && l.ids.includes(o.id))
    out[o.id] = { usedIn: rs, open: rs.length < own(o.id) || spare > 0 || limitedLeft }
  }
  return out
}

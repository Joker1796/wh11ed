// Group stratagems by the game phase(s) their `when` timing falls in. GW always names the
// phase in the timing line ("Your Shooting phase", "End of your opponent's Charge phase",
// "Battle-shock step of your Command phase", "Any phase, just after…"), so the phases are
// derived by matching the ENGLISH `when` text — never the localized one, so the grouping
// is identical in both locales (same idea as missions reading missions.en for logic).

// Fixed display order; `any` (works in any phase) last.
export const PHASE_ORDER = ['command', 'movement', 'shooting', 'charge', 'fight', 'any']

const NAMED_PHASES = ['command', 'movement', 'shooting', 'charge', 'fight']

// The five phases in play order, without `any` — this is the vocabulary the tracker's clock steps
// through (useTracker's currentPhase). It lives here, next to the stratagem grouping, because a
// clock the stratagem filter can't line up with would be useless to both.
export const BATTLE_PHASES = NAMED_PHASES

const PHASE_LABEL_KEYS = {
  command: 'phaseCommand',
  movement: 'phaseMovement',
  shooting: 'phaseShooting',
  charge: 'phaseCharge',
  fight: 'phaseFight',
  any: 'phaseAny',
}

export function phaseLabel(key, labels) {
  return labels[PHASE_LABEL_KEYS[key]] || key
}

// The phase key(s) a stratagem belongs to, from its English `when`. A stratagem that spans
// several phases (e.g. "opponent's Shooting phase or the Fight phase") is returned with all
// of them, so it shows under each — `any` is reserved for stratagems that literally work in
// "any phase" (and, as a fallback, ones with no detectable phase at all).
export function phasesOf(englishWhen) {
  if (!englishWhen) return ['any']
  if (/\bany phase\b/i.test(englishWhen)) return ['any']
  const named = NAMED_PHASES.filter((p) => new RegExp(`\\b${p} phase\\b`, 'i').test(englishWhen))
  return named.length ? named : ['any']
}

// WHOSE phase, per phase the timing names. `phasesOf` deliberately stays as it is: the stratagem
// page groups by phase and has no reason to care whose turn it is — this is the extra half the
// in-game "what can I do right now" filter needs.
//
// GW writes the possessive right before the phase: "in your Shooting phase", "End of your
// opponent's Charge phase". A phase named with NO possessive is one that happens in both turns
// ("the Fight phase", 83 of them) and is reported as 'both'. So is the same phase named twice
// with different owners.
//
// One known over-report: "Start of your Movement or Charge phase" governs Charge with a possessive
// that isn't adjacent to it, so Charge reads as 'both'. The filter then offers the stratagem in
// the opponent's Charge phase too — erring towards SHOWING, which is the safe direction for a
// convenience filter over a rules reference.
const SIDE_RE = new RegExp(
  `(?:(your opponent['\u2019]s|your)\\s+)?\\b(${NAMED_PHASES.join('|')}) phase`,
  'gi',
)

export function phaseSidesOf(englishWhen) {
  const out = {}
  if (!englishWhen) return out
  for (const m of englishWhen.matchAll(SIDE_RE)) {
    const phase = m[2].toLowerCase()
    const owner = (m[1] || '').toLowerCase()
    const side = !owner ? 'both' : owner === 'your' ? 'own' : 'opp'
    out[phase] = out[phase] && out[phase] !== side ? 'both' : side
  }
  return out
}

// Can this stratagem be used in the slot the game is standing on? `mine` is whether the turn
// belongs to the player whose roster is open. A stratagem with no detectable phase, or one that
// works in any phase, is always offered — the timing line is still printed on the card.
export function usableInSlot(phases, sides, phase, mine) {
  if (!phases?.length || phases.includes('any')) return true
  if (!phases.includes(phase)) return false
  const side = sides?.[phase] || 'both'
  return side === 'both' || (side === 'own') === mine
}


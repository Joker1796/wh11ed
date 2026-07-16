// Group stratagems by the game phase(s) their `when` timing falls in. GW always names the
// phase in the timing line ("Your Shooting phase", "End of your opponent's Charge phase",
// "Battle-shock step of your Command phase", "Any phase, just after…"), so the phases are
// derived by matching the ENGLISH `when` text — never the localized one, so the grouping
// is identical in both locales (same idea as missions reading missions.en for logic).

// Fixed display order; `any` (works in any phase) last.
export const PHASE_ORDER = ['command', 'movement', 'shooting', 'charge', 'fight', 'any']

const NAMED_PHASES = ['command', 'movement', 'shooting', 'charge', 'fight']

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

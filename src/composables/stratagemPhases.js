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
  const text = withoutComparisons(englishWhen)
  const named = NAMED_PHASES.filter((p) => new RegExp(`\\b${p} phase\\b`, 'i').test(text))
  return named.length ? named : ['any']
}

// "…can make a Normal move of up to 6\" as if it were your Movement phase" names a phase the rule
// does NOT happen in — the comparison says how to resolve the move, the timing is stated elsewhere
// ("In your Shooting phase, after this unit has shot"). Read as timing, it put the Grey Knights'
// Personal Teleporters into the Movement-phase reminder (a player's report, 2026-09-19). 41 rules
// in the corpus use the phrasing, 31 of them "shoot as if it were your Shooting phase"; the clause
// is dropped before either reader looks for a phase.
const AS_IF_RE = new RegExp(
  `\\bas (?:if|though) it (?:were|was) (?:your opponent['\u2019]s |your |the )?(?:${NAMED_PHASES.join('|')}) phase\\b`,
  'gi',
)
function withoutComparisons(text) { return text.replace(AS_IF_RE, '') }

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
  for (const m of withoutComparisons(englishWhen).matchAll(SIDE_RE)) {
    const phase = m[2].toLowerCase()
    const owner = (m[1] || '').toLowerCase()
    const side = !owner ? 'both' : owner === 'your' ? 'own' : 'opp'
    out[phase] = out[phase] && out[phase] !== side ? 'both' : side
  }
  return out
}

// WHEN inside the phase, per phase the text names: 'start' where every mention of that phase is
// "at the start of … phase", 'end' where every one is "at the end of … phase"; a phase also named
// any other way ("in your Shooting phase", "until the end of your opponent's next Fight phase" — a
// duration, not a trigger) is left out, i.e. during the phase. For the tracker's phase reminder,
// which puts what fires at the start first and what fires at the end last (owner, 2026-10-08).
// "Start of your Movement or Charge phase" reaches Charge too: the "or" list continues the moment.
const MOMENT_RE = new RegExp(
  `(?:\\b(at the start|at the end|start|end) of\\s+)?(?:(?:the|your opponent['\u2019]s|your|each|the next|your next|your opponent['\u2019]s next)\\s+)?\\b(${NAMED_PHASES.join('|')})(?: phase\\b| or (?=(?:the |your )?(?:${NAMED_PHASES.join('|')})\\b))`,
  'gi',
)
export function phaseMomentsOf(englishText) {
  const seen = {}
  if (!englishText) return {}
  let carry = null
  for (const m of withoutComparisons(englishText).matchAll(MOMENT_RE)) {
    const lead = (m[1] || '').toLowerCase()
    // "until the start/end of …" is a duration, not a trigger: the words before the match decide.
    const before = englishText.slice(Math.max(0, m.index - 12), m.index).toLowerCase()
    const until = /\buntil\s+(?:the\s+)?$/.test(before)
    let moment = until ? null
      : lead.endsWith('start') ? 'start'
        : lead.endsWith('end') ? 'end'
          : null
    if (!lead && carry) moment = carry
    carry = m[0].toLowerCase().endsWith(' or ') ? moment : null
    const phase = m[2].toLowerCase()
    seen[phase] = phase in seen && seen[phase] !== moment ? null : moment
  }
  return Object.fromEntries(Object.entries(seen).filter(([, v]) => v))
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

// Whether a stratagem can be played at all in this TURN by a side that is (`mine`) or is not on
// turn — in any of its phases, the phase aside. "Your opponent's Shooting phase" is never the
// mover's; "your Command phase" never the other side's. No phase known: any turn.
export function usableThisTurn(phases, sides, mine) {
  if (!phases?.length || phases.includes('any')) return true
  return phases.some((p) => { const side = sides?.[p] || 'both'; return side === 'both' || (side === 'own') === mine })
}


// Stratagems grouped by phase, in PHASE_ORDER; a stratagem spanning several phases (its `_phases`)
// appears under each. `first` puts that phase's group at the top (the tracker's live phase).
// Shared by the Stratagems page and the tracker's CP tab (StratPhaseGroups.vue draws the groups).
export function groupByPhase(strats, first = null) {
  const by = new Map()
  for (const s of strats) {
    for (const k of s._phases?.length ? s._phases : ['any']) {
      if (!by.has(k)) by.set(k, [])
      by.get(k).push(s)
    }
  }
  const order = first && by.has(first) ? [first, ...PHASE_ORDER.filter((k) => k !== first)] : PHASE_ORDER
  return order.filter((k) => by.has(k)).map((k) => ({ key: k, strats: by.get(k) }))
}

// Which of a DATASHEET's own abilities the roster can already answer for.
//
// Tier C (src/data/rosterModifiers/) reads faction RULES — army rules, detachment rules,
// enhancements, allegiance abilities. A datasheet's own abilities are not in that dataset at all,
// so on a card they are printed prose and nothing more: no statement of whether they are doing
// anything right now. Most of them could not have one — they resolve per attack, per target, on a
// dice roll, and guessing would be worse than silence.
//
// One family is different, and it is a big one: ~110 abilities across the game open with "While
// this model is leading a unit…", and a handful with the mirror image, "while a CHARACTER model is
// leading this unit…". Whether a model is leading, or is being led, is not an inference about what
// the rule DOES — it is the rule's own precondition, stated in its first clause, and the army list
// already records the answer. So that is all this file decides: does the precondition hold.
//
// Nothing here rewrites a number. The prose still says what happens; the card only stops making
// the reader remember which of a Character's four abilities are switched off because it is
// standing alone.

// The two directions, most specific first: "leading this unit" names the OTHER model as the
// leader, so it must be tested before the plain "is leading a unit" of the leader's own sheet.
// Both are anchored on a whole clause rather than the words alone, so an ability that merely
// mentions attaching in passing ("if a CHARACTER unit from your army can be attached to…", a
// Transport's embark text) is not mistaken for one that is gated on it.
const PRECONDITIONS = [
  { id: 'led', re: /\bis\s+leading\s+this\s+unit\b/i },
  {
    id: 'leading',
    re: /\b(?:this|the)\s+(?:model|unit|bearer)\s+is\s+(?:leading\s+(?:a|one or more)\b[^.,;]{0,40}?\bunits?|attached\s+to\s+a\s+unit)\b/i,
  },
]

// The precondition an ENGLISH ability text is gated on, or null. English on purpose: the RU
// overlay translates the prose, and a translated sentence is not something to pattern-match —
// the same discipline ruleTargets.js follows.
export function abilityPrecondition(text) {
  if (!text) return null
  for (const p of PRECONDITIONS) if (p.re.test(text)) return p.id
  return null
}

// Does it hold? `ctx` is what the roster knows about this entry:
//   leading  the unit this entry is attached to, as a name, or true when the attachment is
//            recorded but the name could not be resolved; falsy when it is standing alone
//   led      true when some other entry is attached to THIS one
// Returns null for an ability with no precondition — the card shows nothing, which is the
// pre-existing behaviour for every ability on every sheet.
export function abilityStatusOf(text, ctx) {
  const id = abilityPrecondition(text)
  if (!id) return null
  if (id === 'led') return { id, on: !!ctx?.led, subject: null }
  return { id, on: !!ctx?.leading, subject: typeof ctx?.leading === 'string' ? ctx.leading : null }
}

// The same, for a whole sheet: a map from ENGLISH ability name to its status, ready to hand to
// DatasheetCard (which keys on `nameEn || name`, so it works in both locales). Only abilities that
// HAVE a precondition appear.
export function abilityStatusesOf(sheetEn, ctx) {
  const out = {}
  for (const key of ['abilities', 'wargearAbilities', 'specialAbilities']) {
    for (const a of sheetEn?.[key] || []) {
      const st = abilityStatusOf(a.text, ctx)
      if (st) out[a.name] = st
    }
  }
  for (const set of sheetEn?.abilitySets || []) {
    for (const a of set.options || []) {
      const st = abilityStatusOf(a.text, ctx)
      if (st) out[a.name] = st
    }
  }
  return out
}

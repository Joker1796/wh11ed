// Where a WHOLE rule is in force, as its own wording says — the reading behind a record's
// `appliesWhile` (src/components/roster/CLAUDE.md). One reader for the generator, which gives such a
// rule a record so the field has somewhere to live, and for the gate in index.test.js, which holds
// every record to what its rule says. Two copies of this reading would drift, and the drift would
// be a rule standing "in effect" on a card it does not reach (2026-10-17: Command Protocols on a
// Nekrosor Ammentar fielded alone).
//
// Only what the LIST answers — an attachment, the Warlord. A rule in force "while within range of
// an objective marker" is not this: the game answers that, and a rule is never hidden behind it.
//
//   enhancement    "[X model only.] While the bearer is leading a unit, …"            → unit-leading
//                  "… is leading an Aspect Warriors unit" / "… attached to a Kastelan Robots
//                  unit" / "… a unit with the Scouts 6" ability"         → the condition naming it
//   detachmentRule "While a NECRONS CHARACTER model is leading this unit, …"          → unit-led
//   stratagem      (its TARGET) "One DEATH GUARD Attached unit …"                     → unit-led
//                  "… that is not an Attached unit"                                   → unit-not-led
//                  "Your NECRONS WARLORD."                                            → unit-warlord
//
// A Bodyguard named by keyword maps to the one condition whose `bodyguard` lists exactly those
// keywords (conditions.js). None does → `?<words>`, which is no condition: the gate then fails
// naming the words, and the vocabulary gets the condition it lacks.
import { conditions } from '../../core/rules/conditions.js'
import { foldName } from '../../core/shared/foldName.js'

const ONLY = /^[^.]*\bonly\.\s*/i
const BEARER = /^(?:while|when|if) the bearer is (?:leading|attached to) (?:a|an) (.+?) unit\b/i
const LED_UNIT = /\bwhile (?:a|an|one or more) [^.]*?\b(?:is|are) leading (?:this|that) unit\b/i

/** "Poxwalker" and "POXWALKERS" are one keyword in prose. @param {string} w */
const stem = (w) => foldName(w).replace(/s$/, '')

/** @param {string} words "Dire Avengers or Guardians" @returns {string} */
function bodyguardCondition(words) {
  if (/^with the (.+?) ability$/i.test(words)) {
    const core = /^with the (\S+)/i.exec(words)?.[1] || ''
    const id = Object.keys(conditions).find((k) => conditions[k].bodyguardCore && stem(conditions[k].bodyguardCore) === stem(core))
    return id || `?${words}`
  }
  const want = words.split(/\s*,\s*|\s+or\s+/).map(stem).sort().join('|')
  const id = Object.keys(conditions).find((k) => (conditions[k].bodyguard || []).map(stem).sort().join('|') === want)
  return id || `?${words}`
}

/**
 * The conditions the whole rule needs, or null when its wording sets none.
 * @param {string} kind the record kind: 'enhancement' | 'detachmentRule' | 'stratagem'
 * @param {string | null | undefined} text an enhancement's or a detachment rule's body, a stratagem's TARGET
 * @returns {string[] | null}
 */
export function appliesWhileOf(kind, text) {
  const t = foldName(String(text || '').replace(/\*\*/g, '').replace(/\[gloss:[^:\]]+:([^\]]+)\]/g, '$1'))
  if (kind === 'enhancement') {
    const rest = t.replace(ONLY, '')
    // "a unit with the Scouts 6" ability" names no keyword: read it as a Bodyguard with that ability.
    const withAbility = /^(?:while|when|if) the bearer is leading (?:a|an) unit (with the .+? ability)/.exec(rest)
    if (withAbility) return [bodyguardCondition(withAbility[1])]
    if (/^(?:while|when|if) the bearer is leading (?:a|an) unit\b/.test(rest)) return ['unit-leading']
    const named = BEARER.exec(rest)
    return named ? [bodyguardCondition(named[1])] : null
  }
  if (kind === 'detachmentRule') return LED_UNIT.test(t) ? ['unit-led'] : null
  if (kind === 'stratagem') {
    // "…that is not an Attached unit" (Hidden Amongst the Dead) is the opposite state.
    if (/\bnot an attached unit\b/.test(t)) return ['unit-not-led']
    if (/\battached unit\b/.test(t)) return ['unit-led']
    if (/\bwarlord\b/.test(t)) return ['unit-warlord']
  }
  return null
}

// A list held to its own limits, said in words where the tracker can only print text — the lobby's
// side summary, the waiting screen. The mark itself (RosterOwnLimitsMark) is the same fact as a
// button; both read battleLimitFacts.js's `ownLimitsLines`, the one wording.
import { effectiveBattle } from './rosterEngine.js'
import { ownLimitsLines } from './battleLimitFacts.js'
import rosterCore from '../data/roster/core.js'

export const ownLimitsOf = (roster, labels) => (roster ? ownLimitsLines(effectiveBattle(roster, rosterCore), labels) : [])

// "Custom limits apply: Points limit: 1500, Detachment Points: 4, …" — or '' for a list held to a
// printed size.
export function ownLimitsSummary(roster, labels) {
  const lines = ownLimitsOf(roster, labels)
  return lines.length ? `${labels.rosterLimitOwnApplied}: ${lines.join(', ')}` : ''
}

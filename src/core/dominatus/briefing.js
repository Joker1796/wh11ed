// @ts-check
// A Dominatus Briefing card read the way the players read it in the Determine Mission step: my
// Force Disposition picks one of the card's three rows, the opponent's picks the branch, and the
// branch names the Agenda whose Primary Mission I play. Pure; the cards come in as an argument
// (src/data/dominatus.js `briefings`).

/**
 * @typedef {{ vs: string[], agenda: string }} BriefingBranch
 * @typedef {{ mine: string[], branches: BriefingBranch[] }} BriefingRow
 * @typedef {{ alliance: string, phase: number, rows: BriefingRow[] }} Briefing
 */

/**
 * The Briefing card an Alliance reads in a campaign phase.
 * @param {Briefing[]} briefings
 * @param {string} alliance
 * @param {number} phase
 * @returns {Briefing | null}
 */
export function briefingFor(briefings, alliance, phase) {
  return briefings.find((b) => b.alliance === alliance && b.phase === phase) || null
}

/**
 * The Agenda slug for my disposition against my opponent's, or null when either is unknown.
 * @param {Briefing[]} briefings
 * @param {{ alliance: string, phase: number, mine: string, theirs: string }} pick
 * @returns {string | null}
 */
export function agendaFor(briefings, { alliance, phase, mine, theirs }) {
  const card = briefingFor(briefings, alliance, phase)
  const row = card?.rows.find((r) => r.mine.includes(mine))
  const branch = row?.branches.find((b) => b.vs.includes(theirs))
  return branch ? branch.agenda : null
}

// @ts-check
// Where each unit of an attached list is: on the battlefield, in strategic reserves, or destroyed
// (owner, 2026-10-06). Pure — the store (useTracker's setUnitStatus) writes, everything else reads
// through here.
//
// Stored on the player (the member, in doubles) as `unitStatus`, keyed by the roster ENTRY's uid —
// the game's own snapshot of the list, so the uids hold for the life of the game:
//   { [uid]: { s: 'reserve' | 'destroyed' | 'table', round, turn, t, name } }
// No record means on the battlefield, so a game saved before this reads as "everything deployed",
// with no migration. A 'table' record is kept only for a unit that ARRIVED from reserves — the game
// log reads its round from it. `round` 0 is before the battle (the reserves chosen at setup).
// `name` rides along because the log is built from the game alone, without the faction data.
//
// The rules (core rules 20, "Strategic Reserves"): no FORTIFICATIONS; the reserves' combined points
// at most half the battle size's points limit; they arrive from the second battle round; at the
// end of the third round those that never arrived are destroyed (bar repositioned units and units
// embarked in a transport that arrived); at the end of the battle any still there are destroyed.

/** @typedef {import('../shared/roster.types.js').UnitPlace} UnitPlace */
/** @typedef {import('../shared/roster.types.js').UnitStatusRecord} UnitStatusRecord */
/** A side, or a doubles member: whatever carries the `unitStatus` map. @typedef {{ unitStatus?: Record<string, UnitStatusRecord> }} StatusHolder */

export const UNIT_STATUSES = ['table', 'reserve', 'destroyed']

/** @param {StatusHolder | null | undefined} player @param {string} uid @returns {UnitPlace} */
export function unitStatusOf(player, uid) {
  return player?.unitStatus?.[uid]?.s || 'table'
}

// The record to store for a move to `status`, given the unit's current record (or none) and the
// clock — null to clear it. Only a unit coming OUT of reserves during the battle keeps a 'table'
// record; put back on the table at setup, or brought back from destroyed by mistake, it is simply
// on the table again.
/**
 * @param {UnitStatusRecord | null | undefined} prev
 * @param {string} status
 * @param {{ round?: number, turn?: number, name?: string } | null | undefined} clock
 */
export function statusRecord(prev, status, clock) {
  const { round = 0, turn = 0, name = '' } = clock || {}
  if (!UNIT_STATUSES.includes(status)) return prev || null
  const rec = { s: status, round, turn, t: Date.now(), ...(name ? { name } : {}) }
  if (status !== 'table') return rec
  return prev?.s === 'reserve' && round > 0 ? rec : null
}

// Half the battle size's points limit — the most the reserves may cost together (20.01).
/** @param {number | null | undefined} battlePoints */
export const reserveLimitOf = (battlePoints) => Math.floor((battlePoints || 0) / 2)

// The points of the units in reserves, given the list's entries ({ uid, points }).
/** @param {StatusHolder | null | undefined} player @param {Array<{ uid: string, points?: number }> | null | undefined} entries */
export function reservePoints(player, entries) {
  return (entries || []).reduce((sum, e) => sum + (unitStatusOf(player, e.uid) === 'reserve' ? (e.points || 0) : 0), 0)
}

// How many of the list's units stand where: { table, reserve, destroyed }.
/** @param {StatusHolder | null | undefined} player @param {Array<{ uid: string }> | null | undefined} entries */
export function statusCounts(player, entries) {
  const out = { table: 0, reserve: 0, destroyed: 0 }
  for (const e of entries || []) out[unitStatusOf(player, e.uid)]++
  return out
}

// Only the reserves picked before the battle — what the setup step hands to the game.
/** @param {Record<string, UnitStatusRecord> | null | undefined} unitStatus */
export function setupReserves(unitStatus) {
  /** @type {Record<string, UnitStatusRecord>} */
  const out = {}
  for (const [uid, rec] of Object.entries(unitStatus || {})) {
    if (rec?.s === 'reserve') out[uid] = { ...rec, round: 0, turn: 0 }
  }
  return out
}

// Which entries one choice moves (owner, 2026-10-08). Into reserves and out of them an attached unit
// goes whole — it is one unit (19.01) — but its parts die one by one: a Leader can fall while his
// squad fights on. So `destroyed` is the tapped entry's alone, and a move to or from reserves takes
// every part still alive, leaving the fallen where they are — the tapped entry excepted: on itself,
// the choice is the player's. `parts` is the attached unit, the tapped entry among them.
/**
 * @template {{ uid: string }} T
 * @param {StatusHolder | null | undefined} player
 * @param {T} entry
 * @param {T[] | null | undefined} parts
 * @param {string} status
 */
export function statusTargets(player, entry, parts, status) {
  if (status === 'destroyed') return [entry]
  return (parts?.length ? parts : [entry]).filter((p) => p.uid === entry.uid || unitStatusOf(player, p.uid) !== 'destroyed')
}

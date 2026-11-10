// @ts-check
// Carry a stored entry's indices across generations of the roster data. A pick is `[group, option,
// n?]` and a size is a bracket index — positions the generator moves when a codex is replaced or a
// reading is fixed. scripts/gen-roster-moves.mjs matches each generation to the one before by what
// the position MEANS and writes the moves (src/data/rosterIndexMoves.js); the app passes them in.

/**
 * One generation's moves for one unit: `wg["g.o"]` → the new "g.o", or 0 when the option is gone;
 * `s[i]` → the new bracket index, or -1 when the bracket is gone, or `[index, min, max]` when the
 * bracket's model range changed — a stored model count outside it falls back to the minimum.
 * @typedef {{ wg?: Record<string, string | 0 | { review: string, automatic?: true }>, s?: Record<string, number | [number, number, number]> }} UnitMove
 */

/**
 * Apply one generation's moves to a stored entry, in place. Two old picks that land on the same
 * option become one, their counts added (a checkbox pick has no count and stays a single pick).
 * @param {{ wg?: Array<[number, number, number?]>, size?: number, count?: number, gearRecovery?: Array<{ pick: number[], meaning: string, automatic?: true }>, gearCheck?: number }} entry
 * @param {UnitMove | undefined} move
 */
export function applyUnitMove(entry, move) {
  if (!move) return
  if (move.wg && Array.isArray(entry.wg)) {
    /** @type {Array<[number, number, number?]>} */
    const out = []
    for (const pick of entry.wg) {
      const to = move.wg[`${pick[0]}.${pick[1]}`]
      /** @type {[number, number, number?]} */
      let next = pick
      if (to && typeof to === 'object') {
        ;(entry.gearRecovery ??= []).push({ pick: [pick[0], pick[1], pick[2] ?? 1], meaning: to.review, ...(to.automatic ? { automatic: true } : {}) })
        entry.gearCheck = 2
        continue
      }
      if (to === 0) continue
      if (to !== undefined) {
        const [g, o] = String(to).split('.').map(Number)
        next = pick.length > 2 ? [g, o, pick[2]] : [g, o]
      }
      const same = out.find(([g, o]) => g === next[0] && o === next[1])
      if (!same) out.push(next)
      else if (same[2] != null || next[2] != null) same[2] = (same[2] ?? 1) + (next[2] ?? 1)
    }
    if (out.length) entry.wg = out
    else delete entry.wg
  }
  if (move.s && entry.size != null) {
    const to = move.s[entry.size]
    if (to === undefined) return
    if (Array.isArray(to)) {
      const [index, min, max] = to
      entry.size = index
      if (entry.count != null && (entry.count < min || entry.count > max)) delete entry.count
    } else if (to < 0) { delete entry.size; delete entry.count }
    else entry.size = to
  }
}

/**
 * The key a unit's moves are filed under: an allied id (`<slug>:<id>`) already names the bundle it
 * lives in; anything else is the roster's own faction. The generator files a Chapter's borrowed
 * Codex: Space Marines units under the Chapter too, so no data is needed to tell the two apart.
 * @param {string} faction
 * @param {string} id
 */
export const moveKeyOf = (faction, id) => (id.includes(':') ? id : `${faction}:${id}`)

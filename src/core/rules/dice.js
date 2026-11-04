// @ts-check
// A characteristic written as dice — "D6", "D3+3", "2D6", "2D6+1" — read into its parts and written
// back. The datasheets carry exactly these shapes in Attacks and Damage (dice.test.js holds every
// value of every sheet to them), so a modifier that adds a whole number to such a value adds it to
// the bonus: "+1 Attacks" on D6 is D6+1, on D3+3 it is D3+4 (the modifier applies after the roll,
// 01.04). Owner, 2026-11-04 (report 7651339d: Tzagulla's +1 Attacks never reached Infernal Gaze).

const DICE = /^(\d*)D(3|6)(?:\+(\d+))?$/

/**
 * @typedef {{ n: number, die: number, bonus: number }} Dice
 */

/**
 * @param {unknown} value
 * @returns {Dice | null}
 */
export function parseDice(value) {
  const m = String(value ?? '').trim().match(DICE)
  if (!m) return null
  const n = m[1] ? Number(m[1]) : 1
  if (n < 1) return null
  return { n, die: Number(m[2]), bonus: m[3] ? Number(m[3]) : 0 }
}

/**
 * @param {Dice} dice
 * @returns {string}
 */
export function formatDice({ n, die, bonus }) {
  return `${n > 1 ? n : ''}D${die}${bonus > 0 ? `+${bonus}` : ''}`
}

// A whole number added to a dice value, or null when that cannot be written honestly: the bonus
// would go below zero ("D3" minus 1 is not "D3-1" — a characteristic never drops below 1 after the
// roll, so the printed value would lie about its low end).
/**
 * @param {unknown} value
 * @param {number} delta
 * @returns {string | null}
 */
export function addToDice(value, delta) {
  const dice = parseDice(value)
  if (!dice || !Number.isInteger(delta)) return null
  const bonus = dice.bonus + delta
  if (bonus < 0) return null
  return formatDice({ ...dice, bonus })
}

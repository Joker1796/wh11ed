// @ts-check
// The game's clock as the rules core reads it (core/game/clock.js's clockAt), with the two answers
// that are the tracker's SETTINGS rather than the game's state: whether this game keeps phases and
// Battle-shock (trackerOptions' rows) — a setting of the app, not a rule of the game.
import { tracks } from '../data/trackerOptions.js'
import { clockAt } from '../core/game/clock.js'

/** @typedef {import('../core/shared/roster.types.js').GameClock} GameClock */
/** @typedef {import('../core/shared/roster.types.js').GameState} GameState */

/**
 * @param {GameState | null | undefined} game
 * @param {number} [pi] the player whose side the clock is read from
 * @returns {GameClock}
 */
export function clockOf(game, pi = 0) {
  return clockAt(game, pi, { phases: tracks(game?.settings, 'trackPhases'), shock: tracks(game?.settings, 'trackBattleShock') })
}

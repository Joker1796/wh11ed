// @ts-check
// The game's clock, as the rules core reads it (src/core/… and rosterGameContext take a `GameClock`).
// Built here, in the app, because two of its answers are the tracker's SETTINGS rather than the game:
// whether this game keeps phases and Battle-shock (trackerOptions' rows) — a setting of the app, not a
// rule of the game.
import { tracks } from '../data/trackerOptions.js'
import { BATTLE_PHASES } from '../core/rules/stratagemPhases.js'

/** @typedef {import('../core/shared/roster.types.js').GameClock} GameClock */
/** @typedef {import('../core/shared/roster.types.js').GameState} GameState */

// What the game is standing on, from the point of view of ONE player: which battle round, whose
// turn it is (`mine`), which phase, and whether the game is keeping phases at all. Built once by
// the caller and passed down, rather than each function digging into the game object.
/**
 * @param {GameState | null | undefined} game
 * @param {number} [pi] the player whose side the clock is read from
 * @returns {GameClock}
 */
export function clockOf(game, pi = 0) {
  const tracked = tracks(game?.settings, 'trackPhases')
  return {
    round: game?.currentRound || 1,
    turn: game?.currentTurn === 1 ? 1 : 0,
    phase: game?.currentPhase || BATTLE_PHASES[0],
    mine: (game?.currentTurn === 1 ? 1 : 0) === pi,
    tracked,
    // Whether this game keeps Battle-shock (trackerOptions' battle-shock row): off, the state is
    // not consulted at all — no stratagem blocked, no rule switched by it.
    shock: tracks(game?.settings, 'trackBattleShock'),
  }
}

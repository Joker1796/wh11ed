// @ts-check
// Whose turn it is and what the game is standing on, read off the game's state — one reading for the
// tracker, the roster's game view and the rules (`currentTurn` is the INDEX of the player whose turn
// it is, 0 or 1; anything else reads as the first player's, as every reader always did).

/** @typedef {import('../shared/roster.types.js').GameClock} GameClock */
/** @typedef {import('../shared/roster.types.js').GameState} GameState */
import { BATTLE_PHASES } from '../rules/stratagemPhases.js'

/** The index of the player whose turn it is. @param {{ currentTurn?: number | null } | null | undefined} game @returns {0 | 1} */
export const turnIndex = (game) => (game?.currentTurn === 1 ? 1 : 0)

// What the game is standing on, from the point of view of ONE player: which battle round, whose
// turn it is (`mine`), which phase, and whether the game keeps phases and Battle-shock at all. Those
// two are the tracker's settings, not the game's state, so the caller answers them (the app's
// src/composables/gameClock.js reads trackerOptions): off, a phase or Battle-shock is not consulted —
// no stratagem blocked, no rule switched by it. Built once and passed down, rather than each function
// digging into the game object.
/**
 * @param {GameState | null | undefined} game
 * @param {number} pi the player whose side the clock is read from
 * @param {{ phases?: boolean, shock?: boolean }} [keeps] what this game keeps track of — unsaid, no phases
 *   and Battle-shock kept, as a GameClock with no `shock` reads
 * @returns {GameClock}
 */
export function clockAt(game, pi, { phases = false, shock = true } = {}) {
  return {
    round: game?.currentRound || 1,
    turn: turnIndex(game),
    phase: game?.currentPhase || BATTLE_PHASES[0],
    mine: turnIndex(game) === pi,
    tracked: phases,
    shock,
  }
}

import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { turnIndex, clockAt } from './clock.js'

describe('turnIndex', () => {
  it('is the index of the player whose turn it is, the first player for anything else', () => {
    expect(turnIndex({ currentTurn: 1 })).toBe(1)
    expect(turnIndex({ currentTurn: 0 })).toBe(0)
    expect(turnIndex({})).toBe(0)
    expect(turnIndex(null)).toBe(0)
  })

  // Thirty-odd copies of `currentTurn === 1 ? 1 : 0` stood in the store, the tracker's screens and the
  // core until 2026-10-26 — whose turn it is was asked a different way wherever someone needed it. One
  // reading now; a new copy fails here.
  it('is the only reading of currentTurn as a player index', () => {
    const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
    const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
      const p = path.join(d, e.name)
      return e.isDirectory() ? walk(p) : /\.(js|vue)$/.test(e.name) && !e.name.includes('.test.') ? [p] : []
    })
    const copies = walk(SRC).filter((p) => /currentTurn === 1 \? 1 : 0/.test(fs.readFileSync(p, 'utf8')) && !p.endsWith(path.join('game', 'clock.js')))
    expect(copies.map((p) => path.relative(SRC, p))).toEqual([])
  })
})

describe('clockAt', () => {
  const game = { currentRound: 3, currentTurn: 1, currentPhase: 'shooting' }
  it('reads the game from one player\'s side, the two kept-or-not answers from the caller', () => {
    expect(clockAt(game, 1, { phases: true, shock: false })).toEqual({ round: 3, turn: 1, phase: 'shooting', mine: true, tracked: true, shock: false })
    expect(clockAt(game, 0, { phases: true }).mine).toBe(false)
  })
  it('keeps no phases and keeps Battle-shock when the caller does not say', () => {
    expect(clockAt(game, 1)).toMatchObject({ tracked: false, shock: true })
  })
})

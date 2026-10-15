// The Combat Patrol missions and mission sequence (generated from appdata) against their hand-
// written RU overlay: one translation per mission and per step, in the same shape, saying the same
// numbers. The overlay is merged by position, so a block or row it lacks silently shows English
// and one too many is silently dropped — this is what keeps that from happening quietly.
import { describe, it, expect } from 'vitest'
import cp from './combatPatrolMissions.json'
import { combatPatrolMissionsRu as ru } from './combatPatrolMissionsRu.js'
import { combatPatrol } from './combatPatrol.js'

// Measurements and dice the two texts must share: 3", 12", 7, D6, 10VP.
// appdata writes an inch as ” in places; the overlay always writes ".
const figures = (s) => (String(s).replace(/”/g, '"').match(/\d+"|\bD\d\b|\d+(?:VP)?/g) || []).sort()
const markers = (s) => (String(s).match(/^(▪|◈|→|###|◆)/gm) || []).join('')

describe('Combat Patrol missions', () => {
  it('gives every box a mission and every mission a box', () => {
    expect(Object.keys(cp.missions).sort()).toEqual(combatPatrol.en.factions.map((b) => b.id).sort())
  })

  it('scores every block in the rounds it names, and nothing outside 1–5', () => {
    for (const m of Object.values(cp.missions)) {
      for (const b of m.blocks) {
        expect(b.rounds.length, `${m.name}: ${b.heading}`).toBeGreaterThan(0)
        for (const r of b.rounds) {
          expect(r).toBeGreaterThanOrEqual(1)
          expect(r).toBeLessThanOrEqual(5)
        }
      }
    }
  })

  it('has three deployment maps', () => {
    expect(cp.layouts.map((l) => l.id)).toEqual(['A', 'B', 'C'])
  })
})

describe('Combat Patrol missions — RU overlay', () => {
  it('translates every mission and nothing else', () => {
    expect(Object.keys(ru.missions).sort()).toEqual(Object.keys(cp.missions).sort())
  })

  for (const [id, m] of Object.entries(cp.missions)) {
    it(`${id}: same blocks, rows, briefing and figures`, () => {
      const t = ru.missions[id]
      expect(t.nameRu).toBeTruthy()
      expect(!!t.lore).toBe(!!m.lore)
      expect(t.blocks.length).toBe(m.blocks.length)
      m.blocks.forEach((b, bi) => {
        const tb = t.blocks[bi]
        expect(!!tb.when, `${id} block ${bi} when`).toBe(!!b.when)
        expect(tb.rows.length, `${id} block ${bi} rows`).toBe(b.rows.length)
        b.rows.forEach((r, ri) => expect(figures(tb.rows[ri]), `${id} ${bi}:${ri}`).toEqual(figures(r.text)))
        if (b.when) expect(figures(tb.when)).toEqual(figures(b.when))
      })
      expect((t.briefing || []).length).toBe((m.briefing || []).length)
      ;(m.briefing || []).forEach((p, i) => {
        const tp = t.briefing[i]
        if (p.action) {
          expect(tp.action).toBe(p.action) // an action's name stays English, like a stratagem's
          expect(tp.rows.length).toBe(p.rows.length)
        } else expect(!!tp.label).toBe(!!p.label)
      })
    })
  }

  it('translates every step of the sequence with the same blocks and figures', () => {
    expect(Object.keys(ru.sequence).sort()).toEqual(cp.sequence.map((s) => s.id).sort())
    for (const s of cp.sequence) {
      const t = ru.sequence[s.id]
      expect(t.title, s.id).toBeTruthy()
      expect(markers(t.body), s.id).toBe(markers(s.body))
      expect((t.body.match(/\*\*/g) || []).length % 2, `${s.id}: unbalanced **`).toBe(0)
      expect(figures(t.body), s.id).toEqual(figures(s.body))
    }
  })
})

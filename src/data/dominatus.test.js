import { describe, it, expect } from 'vitest'
import { getDominatus, ALLIANCE_IDS, PHASES } from './dominatus.js'
import { DISPOSITIONS } from './dispositions.js'
import { agendaFor } from '../core/dominatus/briefing.js'

const d = getDominatus('en')
const DISPO = DISPOSITIONS.map((x) => x.id)

describe('Dominatus deck', () => {
  it('carries the 89 cards the booklet lists', () => {
    expect(d.agendas).toHaveLength(27)
    expect(d.briefings).toHaveLength(9)
    expect(d.locations).toHaveLength(9)
    const kinds = d.upgrades.reduce((m, u) => ({ ...m, [u.kind]: (m[u.kind] || 0) + 1 }), {})
    expect(kinds).toEqual({ honour: 11, skill: 9, relic: 15 })
    // Battle Honours 5 / 5 / 1 by phase; Relics 5 per Alliance
    for (const [p, n] of [[1, 5], [2, 5], [3, 1]]) {
      expect(d.upgrades.filter((u) => u.kind === 'honour' && u.phase === p)).toHaveLength(n)
    }
    for (const a of ALLIANCE_IDS) expect(d.upgrades.filter((u) => u.kind === 'relic' && u.alliance === a)).toHaveLength(5)
  })

  it('has three Agendas and three Locations per Alliance per phase', () => {
    for (const p of PHASES) {
      expect(d.locations.filter((l) => l.phase === p).map((l) => l.roll)).toEqual(['1–2', '3–4', '5–6'])
      for (const a of ALLIANCE_IDS) expect(d.agendas.filter((g) => g.alliance === a && g.phase === p)).toHaveLength(3)
    }
  })

  it('reads every Briefing as a full 5×5 matrix of its own phase\'s Agendas', () => {
    for (const b of d.briefings) {
      const own = new Set(d.agendas.filter((g) => g.alliance === b.alliance && g.phase === b.phase).map((g) => g.slug))
      const used = new Set()
      for (const mine of DISPO) {
        for (const theirs of DISPO) {
          const slug = agendaFor(d.briefings, { alliance: b.alliance, phase: b.phase, mine, theirs })
          expect(own.has(slug), `${b.alliance} ${b.phase}: ${mine} vs ${theirs} → ${slug}`).toBe(true)
          used.add(slug)
        }
      }
      // each row is one disposition set; together they cover all five exactly once
      expect(b.rows.flatMap((r) => r.mine).sort()).toEqual([...DISPO].sort())
      for (const r of b.rows) expect(r.branches.flatMap((x) => x.vs).sort()).toEqual([...DISPO].sort())
      expect(used).toEqual(own)
    }
  })

  it('writes each Agenda\'s Primary in the shape the tracker scores', () => {
    for (const g of d.agendas) {
      expect(g.achieved.any[0]).toMatch(/35\+ VP/)
      expect(!!g.achieved.more, g.slug).toBe(g.phase === 3)
      for (const b of g.primary.blocks) {
        expect(b.heading).toBeTruthy()
        for (const r of b.rows) {
          expect(typeof r.vp === 'number' || /^\+\d+$/.test(r.vp), `${g.slug}: ${r.text}`).toBe(true)
          if (typeof r.vp === 'string') expect(r.modifier).toBe('cumulative')
        }
      }
    }
  })
})

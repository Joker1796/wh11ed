// A card mark's popover reads the booklet by block id and line (MARK_SOURCE): every kind must land
// on its own line in both languages — a paragraph added above it would hand Briefing the Location text.
import { describe, it, expect } from 'vitest'
import { getDominatus } from '../../data/dominatus.js'
import { MARK_SOURCE } from './useDominatus.js'

const NAME = { briefing: 'Briefing', location: 'Location', agenda: 'Agenda', skill: 'Battle Skill', honour: 'Battle Honour', relic: 'Relic', achieved: 'Agenda Achieved' }

describe('Dominatus card marks', () => {
  for (const locale of ['en', 'ru']) {
    const blocks = getDominatus(locale).rules.blocks
    const line = (id, n) => (blocks.find((b) => b.id === id)?.body || '').split('\n')[n] || ''
    it(`${locale}: each kind's line names that kind first`, () => {
      for (const [kind, [id, n]] of Object.entries(MARK_SOURCE)) {
        expect(line(id, n).slice(0, 40), kind).toContain(NAME[kind])
      }
    })
    it(`${locale}: each Alliance has its frame and the campaign its opening line`, () => {
      const boxes = blocks.find((b) => b.id === 'dom-alliances').boxes
      for (const a of ['liberators', 'oppressors', 'raiders']) expect(boxes.find((b) => b.id === a)?.body).toBeTruthy()
      expect(line('dom-campaigns', 0)).toMatch(/3/)
    })
  }
})

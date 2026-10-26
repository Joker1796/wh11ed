import { describe, it, expect } from 'vitest'
import { combatPatrol } from '../../data/combatPatrol.js'
import { combatPatrolBoxOf, combatPatrolBoxIn, combatPatrolBoxesOf } from './combatPatrolBox.js'
import { loadArmyStrats, loadArmyRules } from '../../composables/gameStratagems.js'

const boxes = combatPatrol.en.factions
const multi = Object.entries(Object.groupBy(boxes, (b) => b.slug)).filter(([, v]) => v.length > 1)

describe('the Combat Patrol box an army plays', () => {
  it('every box of a faction with several fixes a detachment no other box of it does', () => {
    for (const [, list] of multi) {
      const names = list.map((b) => b.rule.name.toLowerCase())
      expect(new Set(names).size).toBe(names.length)
    }
  })

  it('is read back from the detachment, for every box', () => {
    for (const b of boxes) {
      expect(combatPatrolBoxOf(boxes, { factionSlug: b.slug, detachments: [b.rule.name] })?.id).toBe(b.id)
      expect(combatPatrolBoxIn(combatPatrol, 'ru', { factionSlug: b.slug, detachments: [b.rule.name] })?.id).toBe(b.id)
    }
  })

  it('a game saved before the choice (no detachment) plays the faction’s first box', () => {
    const [slug, list] = multi[0]
    expect(combatPatrolBoxOf(boxes, { factionSlug: slug })?.id).toBe(list[0].id)
    expect(combatPatrolBoxesOf(boxes, slug)).toHaveLength(list.length)
  })

  it('the game screen loads the chosen box’s stratagems and rules, not the first box’s', async () => {
    for (const [slug, list] of multi) for (const b of list) {
      const m = { factionSlug: slug, detachments: [b.rule.name] }
      const strats = await loadArmyStrats(m, 'en', true)
      expect(strats.map((s) => s.name)).toEqual(b.stratagems.map((s) => s.name))
      const rules = await loadArmyRules(m, 'en', true)
      expect(rules.detachments[0].name).toBe(b.rule.name)
    }
  })
})

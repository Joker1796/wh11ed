import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RuleBody from './RuleBody.vue'
import { basicRules } from '../data/basicRules.js'
import { battleRound } from '../data/battleRound.js'
import { battlefields } from '../data/battlefields.js'
import { advancedRules } from '../data/advancedRules.js'
import { muster } from '../data/muster.js'

describe('RuleBody', () => {
  it('preserves the written numbers in rulebook lists, including separated steps and examples', () => {
    let checked = 0
    const visit = (value, field = '') => {
      if (typeof value === 'string' && ['body', 'splitBody', 'splitBodies'].includes(field)) {
        const numbers = [...value.matchAll(/^\s*(\d+)\.\s/gm)].map((m) => Number(m[1]))
        if (!numbers.length) return
        const w = mount(RuleBody, { props: { body: value } })
        const shown = w.findAll('ol.rule-ol').flatMap((list) => {
          let next = Number(list.attributes('start') || 1)
          return list.findAll(':scope > li').map((li) => {
            const number = li.attributes('value') === undefined ? next : Number(li.attributes('value'))
            next = number + 1
            return number
          })
        })
        expect(shown).toEqual(numbers)
        checked++
      } else if (Array.isArray(value)) {
        value.forEach((item) => visit(item, field))
      } else if (value && typeof value === 'object') {
        Object.entries(value).forEach(([key, item]) => visit(item, key))
      }
    }
    ;[basicRules, battleRound, battlefields, advancedRules, muster].forEach((book) => visit(book))
    expect(checked).toBeGreaterThan(20)
  })
  // Lore inside a rule's text ("> …"): drawn as lore, so the "hide lore" switch (style.css,
  // .rule-flavor) takes it away — a player's report had lore staying under the switch.
  it('draws a "> " line as lore, apart from the rule', () => {
    const w = mount(RuleBody, { props: { body: '### Vanguard Prime\n> The creature guides the swarm.\n\nDeathleaper can be your WARLORD.' } })
    const lore = w.find('p.rule-flavor')
    expect(lore.text()).toBe('The creature guides the swarm.')
    expect(w.findAll('p').map((p) => p.text())).toEqual(['The creature guides the swarm.', 'Deathleaper can be your WARLORD.'])
    expect(w.findAll('p')[1].classes()).not.toContain('rule-flavor')
  })
})

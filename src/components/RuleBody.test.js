import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RuleBody from './RuleBody.vue'

describe('RuleBody', () => {
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

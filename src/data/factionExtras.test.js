import { describe, it, expect } from 'vitest'
import { loadFaction } from './factions/index.js'

// The extras (data/factions/extras/<slug>.js) are hung on the rule objects as the faction loads,
// out of the rule text: the text is the app's, the extras are drawn in a plate (RuleExtras.vue).
describe('faction extras', () => {
  it('hangs a detachment\'s and an enhancement\'s extras on them, and keeps them out of the text', async () => {
    const ik = await loadFaction('imperial-knights')
    const det = ik.en.detachments.find((d) => d.id === 'spearhead-at-arms')
    expect(det.rule.extras[0].en).toContain('ARMIGER models from your army gain the BATTLELINE keyword.')
    expect(det.rule.body).not.toContain('BATTLELINE')
    const sm = await loadFaction('space-marines')
    const enh = sm.en.detachments.find((d) => d.id === 'assault-brethren').enhancements.find((e) => e.name === 'Imperium’s Sword')
    expect(enh.extras[0].en).toContain('Melee, A 6')
    expect(enh.body).toMatch(/following weapon:$/)
  })

  it('attaches once, however many times the faction is loaded', async () => {
    const a = await loadFaction('death-guard')
    const b = await loadFaction('death-guard')
    expect(b.en.detachments.find((d) => d.id === 'shamblerot-vectorium').rule.extras).toHaveLength(1)
    expect(a).toBe(b)
  })
})

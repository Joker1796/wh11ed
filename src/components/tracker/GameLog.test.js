import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

let GameLog, tracker, DISPOSITIONS

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  const mod = await import('../../composables/useTracker.js')
  tracker = mod.useTracker()
  DISPOSITIONS = mod.DISPOSITIONS
  GameLog = (await import('./GameLog.vue')).default
})

function startGame() {
  const p = { factionSlug: null, detachments: [], secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false }
  tracker.newGame({
    settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', twist: null, twistMission: null },
    players: [
      { ...p, name: 'Me', disposition: DISPOSITIONS[0].id, role: 'attacker' },
      { ...p, name: 'Opp', disposition: DISPOSITIONS[1].id, role: 'defender' },
    ],
  })
  tracker.beginGame()
}

describe('GameLog', () => {
  // A dropdown, not a row of tabs (owner, 2026-10-06), each choice with its count.
  it('narrows the log with a dropdown that counts each choice', async () => {
    startGame()
    tracker.setRoundPrimary(0, 0, 5)
    tracker.gainBonusCp(1)
    const w = mount(GameLog, { props: { names: ['Me', 'Opp'] } })
    expect(w.find('.page-tab').exists()).toBe(false)
    const opts = w.findAll('option').map((o) => o.text())
    expect(opts[0]).toMatch(/^All \(\d+\)$/)
    expect(opts).toContain('Scoring (1)')
    await w.find('select').setValue('points')
    expect(w.findAll('.gl-item')).toHaveLength(1)
    await w.find('select').setValue('cp')
    expect(w.findAll('.gl-item').map((li) => li.find('.gl-who').text())).toContain('Opp')
  })
})

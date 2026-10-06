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
  // The app's own dropdown, not a row of tabs or the system select (owner, 2026-10-06), each
  // choice with its count. On a phone (jsdom is narrow) it opens as a modal on <body>.
  it('narrows the log with our dropdown that counts each choice', async () => {
    startGame()
    tracker.setRoundPrimary(0, 0, 5)
    tracker.gainBonusCp(1)
    const w = mount(GameLog, { props: { names: ['Me', 'Opp'] }, attachTo: document.body })
    expect(w.find('select').exists()).toBe(false)
    expect(w.find('.picker-trigger-name').text()).toMatch(/^All \(\d+\)$/)
    const pick = async (name) => {
      await w.find('.picker-trigger').trigger('click')
      const opt = [...document.body.querySelectorAll('.det')].find((b) => b.textContent.includes(name))
      opt.click()
      await w.vm.$nextTick()
    }
    await pick('Scoring')
    expect(w.find('.picker-trigger-name').text()).toBe('Scoring (1)')
    expect(w.findAll('.gl-item')).toHaveLength(1)
    await pick('CP')
    expect(w.findAll('.gl-item').map((li) => li.find('.gl-who').text())).toContain('Opp')
    w.unmount()
  })
})

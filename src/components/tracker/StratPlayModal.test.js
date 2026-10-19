import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// Playing a stratagem: the price is asked every time and plays it; the unit is optional, behind a
// button under the price (owner, 2026-09-30).
let StratPlayModal, tracker
beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  const mod = await import('../../composables/useTracker.js')
  tracker = mod.useTracker()
  StratPlayModal = (await import('./StratPlayModal.vue')).default
  const p = (name, d) => ({ name, factionSlug: null, detachments: [], disposition: d, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false })
  tracker.newGame({ settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp' }, players: [p('Me', mod.DISPOSITIONS[0].id), { ...p('Opp', mod.DISPOSITIONS[1].id), role: 'defender' }] })
  tracker.beginGame()
})
afterEach(() => { document.body.innerHTML = '' })

const strat = { _key: 'core:15.02', name: 'Command Re-roll', _cost: 1, _limits: {}, _phases: ['any'], _sides: [] }
const targets = [{ uid: 'u1', name: 'Boyz', sid: 'r1' }, { uid: 'u2', name: 'Gretchin', block: 'shock' }]
const q = (sel) => [...document.body.querySelectorAll(sel)]

describe('StratPlayModal', () => {
  // A tap on a price only selects it; Confirm plays the selected one.
  it('plays nothing until Confirm, then the selected price', async () => {
    tracker.setCp(0, 3) // enough for the raised price
    mount(StratPlayModal, { props: { strat, pi: 0, targets } })
    await flushPromises()
    q('.spm-cost')[2].click()
    await flushPromises()
    expect(tracker.current.value.players[0].cpLog.find((e) => e.kind === 'spend')).toBeUndefined()
    expect(q('.spm-go')[0].textContent).toContain('2CP')
    q('.spm-go')[0].click()
    await flushPromises()
    expect(tracker.current.value.players[0].cpLog.find((e) => e.kind === 'spend').amount).toBe(-2)
  })

  it('asks the price at once and plays on no unit when none is named', async () => {
    mount(StratPlayModal, { props: { strat, pi: 0, targets } })
    await flushPromises()
    expect(q('.spm-cost')).toHaveLength(3)
    q('.spm-cost')[1].click()
    await flushPromises()
    q('.spm-go')[0].click()
    await flushPromises()
    const spend = tracker.current.value.players[0].cpLog.find((e) => e.kind === 'spend')
    expect(spend).toMatchObject({ amount: -1, name: 'Command Re-roll' })
    expect(spend.target).toBeUndefined()
  })

  it('finds the unit by name in the list', async () => {
    const w = mount(StratPlayModal, { props: { strat, pi: 0, targets }, attachTo: document.body })
    await flushPromises()
    q('.spm-pick')[0].click()
    await flushPromises()
    const input = document.body.querySelector('.spm-search')
    input.value = 'gret'
    input.dispatchEvent(new Event('input'))
    await flushPromises()
    expect(q('.spm-unit').map((b) => b.querySelector('.spm-unit-name').textContent)).toEqual(['Gretchin'])
    input.value = 'zzz'
    input.dispatchEvent(new Event('input'))
    await flushPromises()
    expect(document.body.querySelector('.spm-empty')).not.toBeNull()
    w.unmount()
  })

  // By role, as the roster's lists group them: a heading over each group's first row, and the
  // group stays out of what the ledger keeps.
  it('groups the units under their role headings', async () => {
    const grouped = [
      { uid: 'c1', name: 'Warboss', group: { key: 'dsGroupCharacters' } },
      { uid: 'b1', name: 'Boyz', group: { key: 'dsGroupBattleline' } },
      { uid: 'b2', name: 'Gretchin', group: { key: 'dsGroupBattleline' } },
    ]
    mount(StratPlayModal, { props: { strat, pi: 0, targets: grouped } })
    await flushPromises()
    q('.spm-pick')[0].click()
    await flushPromises()
    expect(q('.spm-group').map((h) => h.textContent.trim())).toEqual(['Characters', 'Battleline'])
    q('.spm-unit')[1].click()
    await flushPromises()
    q('.spm-cost')[1].click()
    await flushPromises()
    q('.spm-go')[0].click()
    await flushPromises()
    expect(tracker.current.value.players[0].cpLog.find((e) => e.kind === 'spend').target).toEqual({ uid: 'b1', name: 'Boyz' })
  })

  it('names the unit behind the button, a Battle-shocked one greyed', async () => {
    mount(StratPlayModal, { props: { strat, pi: 0, targets } })
    await flushPromises()
    q('.spm-pick')[0].click()
    await flushPromises()
    const [boyz, gretchin] = q('.spm-unit')
    expect(gretchin.disabled).toBe(true)
    boyz.click()
    await flushPromises()
    expect(document.body.querySelector('.spm-chosen').textContent).toContain('Boyz')
    q('.spm-cost')[1].click()
    await flushPromises()
    q('.spm-go')[0].click()
    await flushPromises()
    expect(tracker.current.value.players[0].cpLog.find((e) => e.kind === 'spend').target).toEqual({ uid: 'u1', name: 'Boyz', sid: 'r1' })
  })
})

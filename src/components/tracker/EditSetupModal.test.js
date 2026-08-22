import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises, DOMWrapper } from '@vue/test-utils'

// Both the modal and the test have to hold the SAME store singleton, so import after the reset.
let EditSetupModal, RosterPickerModal, tracker, DISPOSITIONS

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  const mod = await import('../../composables/useTracker.js')
  tracker = mod.useTracker()
  DISPOSITIONS = mod.DISPOSITIONS
  ;({ default: RosterPickerModal } = await import('./RosterPickerModal.vue'))
  ;({ default: EditSetupModal } = await import('./EditSetupModal.vue'))
})
// BaseModal teleports to <body>.
afterEach(() => { document.body.innerHTML = '' })

const body = () => new DOMWrapper(document.body)

function startGame(p0 = {}, p1 = {}) {
  tracker.newGame({
    settings: {
      trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce',
      scoreMode: 'vp', twist: null, twistMission: null,
    },
    players: [
      { name: 'Me', factionSlug: 'orks', detachments: [], disposition: DISPOSITIONS[0].id, role: 'attacker', secondaryMode: 'fixed', fixedSecondaries: [], ...p0 },
      { name: 'Opp', factionSlug: 'necrons', detachments: [], disposition: DISPOSITIONS[1].id, role: 'defender', secondaryMode: 'fixed', fixedSecondaries: [], ...p1 },
    ],
  })
}
const list = (over = {}) => ({
  id: 'r1', name: 'Da List', faction: 'orks', detachments: ['Bully Boyz'],
  battleSize: 'strike-force', units: [{ uid: 'a', id: 'boyz', size: 0 }], ...over,
})
const save = async () => { await body().find('.modal-foot .btn-primary').trigger('click') }
const you = () => tracker.current.value.players[0]

// Attaching mid-game exists because the wizard is otherwise the only place it can be done, and a
// game that started without a list was a dead end.
describe('EditSetupModal — attaching an army list to a running game', () => {
  it('attaches the picked list to that player on save, and to that player only', async () => {
    startGame()
    const w = mount(EditSetupModal)
    await body().findAll('.es-roster .rp-open')[0].trigger('click')
    w.findComponent(RosterPickerModal).vm.$emit('pick', list())
    await flushPromises()
    await save()

    expect(you().rosterId).toBe('r1')
    expect(you().roster.units).toHaveLength(1)
    expect(tracker.current.value.players[1].roster).toBeNull()
  })

  it('discards the attachment if the modal is cancelled', async () => {
    startGame()
    const w = mount(EditSetupModal)
    await body().findAll('.es-roster .rp-open')[0].trigger('click')
    w.findComponent(RosterPickerModal).vm.$emit('pick', list())
    await flushPromises()
    await body().find('.modal-foot .btn-ghost').trigger('click')

    expect(you().roster).toBeNull()
  })

  it('offers only the player\'s own faction — the army can no longer change', async () => {
    startGame()
    const w = mount(EditSetupModal)
    await body().findAll('.es-roster .rp-open')[0].trigger('click')
    expect(w.findComponent(RosterPickerModal).props('faction')).toBe('orks')
  })

  // Detachments drive stratagems and DP, and the game has been played under them.
  it('never overwrites detachments already in play, and says they disagree', async () => {
    startGame({ detachments: ['Dread Mob'] })
    const w = mount(EditSetupModal)
    await body().findAll('.es-roster .rp-open')[0].trigger('click')
    w.findComponent(RosterPickerModal).vm.$emit('pick', list())
    await flushPromises()
    expect(body().find('.rl-warn').exists()).toBe(true)
    await save()

    expect(you().detachments).toEqual(['Dread Mob'])
  })

  it('fills in detachments that were never chosen, without a warning', async () => {
    startGame()
    const w = mount(EditSetupModal)
    await body().findAll('.es-roster .rp-open')[0].trigger('click')
    w.findComponent(RosterPickerModal).vm.$emit('pick', list())
    await flushPromises()
    expect(body().find('.rl-warn').exists()).toBe(false)
    await save()

    expect(you().detachments).toEqual(['Bully Boyz'])
  })

  it('leaves the faction alone, and fills it only for a game that never had one', async () => {
    startGame()
    let w = mount(EditSetupModal)
    await body().findAll('.es-roster .rp-open')[0].trigger('click')
    w.findComponent(RosterPickerModal).vm.$emit('pick', list({ faction: 'orks' }))
    await flushPromises()
    await save()
    expect(you().factionSlug).toBe('orks')

    // A game saved before a faction was mandatory: here the list is the only thing that knows.
    document.body.innerHTML = ''
    startGame({ factionSlug: null })
    w = mount(EditSetupModal)
    await body().findAll('.es-roster .rp-open')[0].trigger('click')
    w.findComponent(RosterPickerModal).vm.$emit('pick', list({ faction: 'orks' }))
    await flushPromises()
    await save()
    expect(you().factionSlug).toBe('orks')
  })

  it('detaches on demand, leaving the faction and detachments as they were played', async () => {
    startGame({ detachments: ['Bully Boyz'], rosterId: 'r1', roster: { v: 4, ...list() } })
    mount(EditSetupModal)
    await body().findAll('.es-roster .rl-clear')[0].trigger('click')
    await save()

    expect(you().roster).toBeNull()
    expect(you().rosterId).toBeNull()
    expect(you().factionSlug).toBe('orks')
    expect(you().detachments).toEqual(['Bully Boyz'])
  })
})

// The clock is only offered where something reads it, and a list can arrive here mid-game.
describe('EditSetupModal — the phase setting', () => {
  it('is hidden while no list is attached, and appears the moment one is', async () => {
    startGame()
    const w = mount(EditSetupModal)
    const phaseCheck = () => body().findAll('.check').find(c => c.text().includes('Track phases'))
    expect(phaseCheck()).toBeUndefined()

    await body().findAll('.es-roster .rp-open')[0].trigger('click')
    w.findComponent(RosterPickerModal).vm.$emit('pick', list())
    await flushPromises()
    expect(phaseCheck()).toBeDefined()
  })
})


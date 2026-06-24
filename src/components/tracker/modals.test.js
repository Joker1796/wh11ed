import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GameEndModal from './GameEndModal.vue'
import ScoreHelpModal from './ScoreHelpModal.vue'
import TwistPickerModal from './TwistPickerModal.vue'
import { BP_TABLE } from '../../composables/gameScoring.js'

describe('GameEndModal', () => {
  it('offers two concede reasons and confirms the chosen one', async () => {
    const w = mount(GameEndModal)
    const rows = w.findAll('.ge-row')
    expect(rows).toHaveLength(2)

    await rows[1].find('input').setValue(true) // toggle "opponent conceded"
    await w.find('.ge-end').trigger('click')
    expect(w.emitted('confirm')[0]).toEqual(['opponent-concede'])
  })

  it('reason is optional — confirms with null when nothing selected', async () => {
    const w = mount(GameEndModal)
    await w.find('.ge-end').trigger('click')
    expect(w.emitted('confirm')[0]).toEqual([null])
  })

  it('re-clicking the selected reason clears it', async () => {
    const w = mount(GameEndModal)
    const input = w.findAll('.ge-row')[0].find('input')
    await input.setValue(true)
    await input.setValue(false)
    await w.find('.ge-end').trigger('click')
    expect(w.emitted('confirm')[0]).toEqual([null])
  })

  it('emits close from the ✕', async () => {
    const w = mount(GameEndModal)
    await w.find('.mh-close').trigger('click')
    expect(w.emitted('close')).toBeTruthy()
  })
})

describe('ScoreHelpModal', () => {
  it('renders the full BP reference table', () => {
    const w = mount(ScoreHelpModal)
    const rows = w.findAll('.sh-table tbody tr')
    expect(rows).toHaveLength(BP_TABLE.length)
    expect(w.text()).toContain('0–5')
    expect(w.text()).toContain('51+')
  })
})

describe('TwistPickerModal', () => {
  const twists = [
    { id: 'martial-pride', title: 'Martial Pride', body: 'A rule.', note: 'note', example: 'lore' },
    { id: 'night-fighting', title: 'Night Fighting', body: 'Another rule.' },
  ]
  it('emits pick with the chosen twist id', async () => {
    const w = mount(TwistPickerModal, { props: { twists, selected: null } })
    await w.findAll('.tp-pick')[1].trigger('click')
    expect(w.emitted('pick')[0]).toEqual(['night-fighting'])
  })
  it('emits random and none from the top actions', async () => {
    const w = mount(TwistPickerModal, { props: { twists, selected: null } })
    const acts = w.findAll('.tp-act')
    await acts[0].trigger('click')
    await acts[1].trigger('click')
    expect(w.emitted('random')).toBeTruthy()
    expect(w.emitted('none')).toBeTruthy()
  })
})

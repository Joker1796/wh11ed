import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GameEndModal from './GameEndModal.vue'
import ScoreHelpModal from './ScoreHelpModal.vue'
import TwistPickerModal from './TwistPickerModal.vue'
import ScoringModal from './ScoringModal.vue'
import { BP_TABLE } from '../../composables/gameScoring.js'

describe('ScoringModal — briefing & WHEN DRAWN action', () => {
  const base = { title: 'Cleanse', blocks: [], count: () => 0 }

  it('renders the briefing above the blocks', () => {
    const w = mount(ScoringModal, { props: {
      ...base,
      briefing: [{ label: 'When Drawn', text: 'If you have Plunder active…' }],
    } })
    expect(w.find('.m-briefing').exists()).toBe(true)
    expect(w.text()).toContain('If you have Plunder active')
  })

  it('shows no redraw button when whenDrawn is null', () => {
    const w = mount(ScoringModal, { props: base })
    expect(w.find('.redraw-btn').exists()).toBe(false)
  })

  it('emits redraw with the mode when the button is clicked', async () => {
    const w = mount(ScoringModal, { props: { ...base, whenDrawn: { mode: 'shuffle' } } })
    await w.find('.redraw-btn').trigger('click')
    expect(w.emitted('redraw')[0]).toEqual(['shuffle'])
  })
})

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

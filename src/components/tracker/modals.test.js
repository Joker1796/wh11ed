import { afterEach, describe, it, expect } from 'vitest'
import { mount, DOMWrapper } from '@vue/test-utils'
import GameEndModal from './GameEndModal.vue'
import ScoreHelpModal from './ScoreHelpModal.vue'
import TwistPickerModal from './TwistPickerModal.vue'
import SecondaryPickerModal from './SecondaryPickerModal.vue'
import ScoringModal from './ScoringModal.vue'
import { BP_TABLE } from '../../composables/gameScoring.js'

// BaseModal renders via <Teleport to="body">, so its content lands outside the mounted
// wrapper's own (detached) root — assert against `body` instead of `w`. Clear it between
// tests since nothing else unmounts the teleported nodes for us in jsdom.
const body = () => new DOMWrapper(document.body)
afterEach(() => { document.body.innerHTML = '' })

describe('ScoringModal — briefing & WHEN DRAWN action', () => {
  const base = { title: 'Cleanse', blocks: [], count: () => 0 }

  it('renders the briefing above the blocks', () => {
    mount(ScoringModal, { props: {
      ...base,
      briefing: [{ label: 'When Drawn', text: 'If you have Plunder active…' }],
    } })
    expect(body().find('.m-briefing').exists()).toBe(true)
    expect(body().text()).toContain('If you have Plunder active')
  })

  it('shows no redraw button when whenDrawn is null', () => {
    mount(ScoringModal, { props: base })
    expect(body().find('.redraw-btn').exists()).toBe(false)
  })

  it('emits redraw with the mode when the button is clicked', async () => {
    const w = mount(ScoringModal, { props: { ...base, whenDrawn: { mode: 'shuffle' } } })
    await body().find('.redraw-btn').trigger('click')
    expect(w.emitted('redraw')[0]).toEqual(['shuffle'])
  })
})

describe('GameEndModal', () => {
  it('offers two concede reasons and confirms the chosen one', async () => {
    const w = mount(GameEndModal)
    const rows = body().findAll('.ge-row')
    expect(rows).toHaveLength(2)

    await rows[1].find('input').setValue(true) // toggle "opponent conceded"
    await body().find('.ge-end').trigger('click')
    expect(w.emitted('confirm')[0]).toEqual(['opponent-concede'])
  })

  it('reason is optional — confirms with null when nothing selected', async () => {
    const w = mount(GameEndModal)
    await body().find('.ge-end').trigger('click')
    expect(w.emitted('confirm')[0]).toEqual([null])
  })

  it('re-clicking the selected reason clears it', async () => {
    const w = mount(GameEndModal)
    const input = body().findAll('.ge-row')[0].find('input')
    await input.setValue(true)
    await input.setValue(false)
    await body().find('.ge-end').trigger('click')
    expect(w.emitted('confirm')[0]).toEqual([null])
  })

  it('emits close from the ✕', async () => {
    const w = mount(GameEndModal)
    await body().find('.mh-close').trigger('click')
    expect(w.emitted('close')).toBeTruthy()
  })
})

describe('ScoreHelpModal', () => {
  it('renders the full BP reference table', () => {
    mount(ScoreHelpModal)
    const rows = body().findAll('.sh-table tbody tr')
    expect(rows).toHaveLength(BP_TABLE.length)
    expect(body().text()).toContain('0–5')
    expect(body().text()).toContain('51+')
  })
})

describe('TwistPickerModal', () => {
  const twists = [
    { id: 'martial-pride', title: 'Martial Pride', body: 'A rule.', note: 'note', example: 'lore' },
    { id: 'night-fighting', title: 'Night Fighting', body: 'Another rule.' },
  ]
  it('emits pick with the chosen twist id', async () => {
    const w = mount(TwistPickerModal, { props: { twists, selected: null } })
    await body().findAll('.tp-pick')[1].trigger('click')
    expect(w.emitted('pick')[0]).toEqual(['night-fighting'])
  })
  it('emits random and none from the top actions', async () => {
    const w = mount(TwistPickerModal, { props: { twists, selected: null } })
    const acts = body().findAll('.tp-act')
    await acts[0].trigger('click')
    await acts[1].trigger('click')
    expect(w.emitted('random')).toBeTruthy()
    expect(w.emitted('none')).toBeTruthy()
  })
})

// The row itself (name + chevron + Select + the body it expands) is one shared component; the
// three pickers differ only in what they slot into it and in how many entries may be picked.
describe('SecondaryPickerModal — the shared PickerRow', () => {
  const missions = [
    { slug: 'a', name: 'Alpha', category: 'cat', blocks: [] },
    { slug: 'b', name: 'Beta', category: 'cat', blocks: [] },
    { slug: 'c', name: 'Gamma', category: 'cat', blocks: [] },
  ]
  it('expands one entry at a time and toggles the picked ones', async () => {
    const w = mount(SecondaryPickerModal, { props: { missions, selected: [], max: 2 } })
    const toggles = body().findAll('.tp-toggle')
    await toggles[1].trigger('click')
    expect(toggles[1].attributes('aria-expanded')).toBe('true')
    expect(toggles[0].attributes('aria-expanded')).toBe('false')
    await body().findAll('.tp-pick')[1].trigger('click')
    expect(w.emitted('toggle')[0]).toEqual(['b'])
  })

  // Once the cap is reached the rows that are NOT chosen stop accepting a tap — the chosen ones
  // must stay live, or there would be no way to swap one out.
  it('locks the unchosen rows at the cap and leaves the chosen ones alone', () => {
    mount(SecondaryPickerModal, { props: { missions, selected: ['a', 'b'], max: 2 } })
    const picks = body().findAll('.tp-pick')
    expect(picks[0].attributes('disabled')).toBeUndefined()
    expect(picks[1].attributes('disabled')).toBeUndefined()
    expect(picks[2].attributes('disabled')).toBeDefined()
  })
})

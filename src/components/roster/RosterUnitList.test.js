import { afterEach, describe, it, expect, vi } from 'vitest'
import { mount, DOMWrapper } from '@vue/test-utils'
import RosterUnitList from './RosterUnitList.vue'

const squad = { id: 'squad', name: 'Legionaries', sizes: [{ pts: 90, per: [5, 5], default: 1 }], minis: ['Legionary'], gear: [] }
const lord = { id: 'lord', name: 'Chaos Lord', sizes: [{ pts: 90, per: [1, 1], default: 1 }], minis: ['Chaos Lord'], gear: [] }
const defOf = (id) => ({ squad, lord }[id])

const entries = [
  { uid: 'u1', id: 'squad', size: 0 },
  { uid: 'u2', id: 'lord', size: 0, leaderOf: 'u1' },
]
const groups = [{ id: 'attached', entries }]

const mountList = (props = {}) => mount(RosterUnitList, {
  props: {
    groups,
    defOf,
    pointsOf: (e) => (e.id === 'squad' ? 90 : 100),
    roleOf: (e) => (e.leaderOf ? 'Leader' : ''),
    ...props,
  },
  slots: { fields: '<p class="probe">fields</p>' },
})

afterEach(() => { document.body.innerHTML = '' })

describe('RosterUnitList', () => {
  it('prints the attached block total once, under the last row of the block', () => {
    const w = mountList()
    const sums = w.findAll('.roster-sum')
    expect(sums).toHaveLength(1)
    expect(sums[0].text()).toContain('190')
  })

  it('reports the row that was tapped, copied or deleted', async () => {
    const w = mountList()
    await w.findAll('.rul-row')[1].trigger('click')
    expect(w.emitted('toggle')[0]).toEqual(['u2'])
    await w.findAll('.rul-dup')[0].trigger('click')
    expect(w.emitted('duplicate')[0][0].uid).toBe('u1')
    await w.findAll('.rul-del')[0].trigger('click')
    expect(w.emitted('remove')[0][0].uid).toBe('u1')
  })

  // Not greyed: the catalogue pane beside this list already shows that unit's cap, on its own
  // greyed "+" and its N/limit badge.
  it('drops the copy button for a row the caller says is at its cap', () => {
    const w = mountList({ dupBlocked: (e) => e.uid === 'u1' })
    expect(w.findAll('.rul-dup')).toHaveLength(1)
    expect(w.findAll('.rul-del')).toHaveLength(2) // deleting one is always on offer
    // …and the name stops reserving room for a button that isn't there.
    expect(w.findAll('.rul-headrow')[0].classes()).toContain('rul-one-act')
    expect(w.findAll('.rul-headrow')[1].classes()).not.toContain('rul-one-act')
  })

  // A wide screen has room for the fields under the row they belong to.
  it('puts the configuration inline when there is width for it', () => {
    const w = mountList({ openUid: 'u1' })
    expect(w.find('.rul-fields .probe').exists()).toBe(true)
    expect(document.querySelector('.modal')).toBeNull()
  })

  // A narrow one does not: the list is sharing its width with the catalogue beside it.
  it('opens the configuration as a sheet on a narrow screen', async () => {
    const listeners = []
    vi.stubGlobal('matchMedia', () => ({
      matches: true,
      addEventListener: (_, fn) => listeners.push(fn),
      removeEventListener: () => {},
    }))
    const w = mountList({ openUid: 'u1' })
    expect(w.find('.rul-fields').exists()).toBe(false)
    const body = new DOMWrapper(document.body)
    expect(body.find('.modal .probe').exists()).toBe(true)
    expect(body.find('.modal .mh-title').text()).toBe('Legionaries')
    w.unmount()
    vi.unstubAllGlobals()
  })
})

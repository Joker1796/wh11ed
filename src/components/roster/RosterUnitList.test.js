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
const groups = [{ id: 'battleline', entries }]

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

afterEach(() => {
  document.body.innerHTML = ''
  delete entries[0].blockName // the fixture is shared; a name written by one test is not another's
})

describe('RosterUnitList', () => {
  // The block has a header of its own, carrying its name, its points and the fold — the same
  // line the read-only view draws since 2026-09-24.
  it('heads the block, and folds its characters away', async () => {
    const w = mountList()
    expect(w.findAll('.rul-unit')).toHaveLength(2)
    expect(w.findAll('.rul-bhead')).toHaveLength(1)
    expect(w.find('.rul-btotal').text()).toContain('190') // 90 + 100, the whole attached unit

    await w.find('.rul-bhead .rul-fold').trigger('click')
    expect(w.findAll('.rul-unit')).toHaveLength(1) // the host stays, its characters go
    expect(w.find('.rul-btotal').text()).toContain('190')

    await w.find('.rul-bhead .rul-fold').trigger('click')
    expect(w.findAll('.rul-unit')).toHaveLength(2)
  })

  // Everything starts open, and folding is a gesture rather than a setting: nothing is stored.
  it('starts unfolded, under a numbered default name', () => {
    const w = mountList()
    expect(w.find('.rul-fold').attributes('aria-expanded')).toBe('true')
    expect(w.find('.rul-bname').text()).toBe('Unit 1')
  })

  it('reports the row that was tapped, copied or deleted', async () => {
    const w = mountList()
    await w.findAll('.rul-row')[1].trigger('click')
    expect(w.emitted('toggle')[0]).toEqual(['u2'])
    await w.findAll('.rul-more')[0].trigger('click')
    const body = new DOMWrapper(document.body)
    const act = (text) => body.findAll('.act-btn').find((b) => b.text() === text)
    await act('Duplicate').trigger('click')
    expect(w.emitted('duplicate')[0][0].uid).toBe('u1')
    await w.findAll('.rul-more')[0].trigger('click')
    await body.find('.act-btn.act-danger').trigger('click')
    expect(w.emitted('remove')[0][0].uid).toBe('u1')
  })

  // The sheet is talking about a row that is about to go; leaving it standing over the gap reads
  // as a bug even when nothing is wrong.
  it('closes the actions sheet on the way out', async () => {
    const w = mountList()
    await w.findAll('.rul-more')[0].trigger('click')
    const body = new DOMWrapper(document.body)
    expect(body.find('.act-list').exists()).toBe(true)
    await body.find('.act-btn.act-danger').trigger('click')
    expect(body.find('.act-list').exists()).toBe(false)
  })

  // Not greyed: the catalogue pane beside this list already shows that unit's cap, on its own
  // greyed "+" and its N/limit badge.
  it('drops the copy action for a row the caller says is at its cap', async () => {
    const w = mountList({ dupBlocked: (e) => e.uid === 'u1' })
    await w.findAll('.rul-more')[0].trigger('click')
    const body = new DOMWrapper(document.body)
    const texts = body.findAll('.act-btn').map((b) => b.text())
    expect(texts).not.toContain('Duplicate')
    expect(texts).toContain('Remove') // removing is always on offer
  })

  // A player's own name for a block — "home objective", "centre push" — is the one thing about a
  // list the app cannot know. Offered on a HOST only: a lone unit has its own note field.
  it('names a block from the host\'s sheet, and heads it with the name', async () => {
    const w = mountList()
    const body = new DOMWrapper(document.body)
    expect(w.find('.rul-bname').text()).toBe('Unit 1')

    await w.findAll('.rul-more')[0].trigger('click')
    await body.findAll('.act-btn').find((b) => b.text() === 'Name this unit').trigger('click')
    await body.find('.rul-name-lab input').setValue('Home objective')
    await body.find('.rul-name-acts .btn-primary').trigger('click')

    expect(entries[0].blockName).toBe('Home objective')
    expect(w.find('.rul-bhead .rul-bname').text()).toBe('Home objective')
    expect(w.find('.rul-bhead .rul-btotal').text()).toContain('190') // 90 + 100, the whole block
  })

  it('offers no name for a unit with nothing attached to it', async () => {
    const w = mountList()
    await w.findAll('.rul-more')[1].trigger('click') // the character, not the squad
    const texts = new DOMWrapper(document.body).findAll('.act-btn').map((b) => b.text())
    expect(texts).not.toContain('Name this unit')
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

// A phone opens the wargear in a sheet instead of an accordion, and a sheet that cannot scroll is
// a sheet that hides half a unit's options. BaseModal caps `.modal` and clips it, so the scroll
// container has to be the direct child — this is the structure that broke on iOS.
describe('the narrow sheet', () => {
  const openNarrow = () => {
    const real = window.matchMedia
    window.matchMedia = (q) => ({ ...real(q), matches: true })
    const w = mountList({ openUid: 'u1' })
    window.matchMedia = real
    return w
  }

  it('scrolls, because its scroll container is the modal\'s own child', () => {
    openNarrow()
    const body = new DOMWrapper(document.body)
    expect(body.find('.modal > .modal-body').exists()).toBe(true)
    // …and the faction accent still reaches the fields inside it.
    expect(body.find('.modal-body .fa-themed .probe').exists()).toBe(true)
  })
})

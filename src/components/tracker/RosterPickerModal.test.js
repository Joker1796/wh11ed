import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises, DOMWrapper } from '@vue/test-utils'

let RosterPickerModal, useRosters, encodeRoster

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  // Imported together, after the reset, so the modal and the test share one store singleton.
  ;({ useRosters } = await import('../../composables/useRosters.js'))
  ;({ encodeRoster } = await import('../../composables/rosterShare.js'))
  ;({ default: RosterPickerModal } = await import('./RosterPickerModal.vue'))
})
// BaseModal teleports to <body>.
afterEach(() => { document.body.innerHTML = '' })

const body = () => new DOMWrapper(document.body)

// Decoding a share payload goes through DecompressionStream + Response, which settles on a
// macrotask — flushPromises alone (microtasks) returns before it lands.
async function waitUntil(fn, tries = 40) {
  for (let i = 0; i < tries; i++) {
    await flushPromises()
    if (fn()) return
    await new Promise((r) => setTimeout(r, 10))
  }
}

describe('RosterPickerModal', () => {
  it('lists the saved rosters and emits the one picked', async () => {
    const store = useRosters()
    const r = store.createRoster('Gladius 2k')
    store.updateRoster(r.id, { faction: 'space-marines', units: [{ uid: 'a', id: 'captain', size: 0 }] })

    const w = mount(RosterPickerModal)
    await flushPromises()
    const row = body().find('.rp-row')
    expect(row.text()).toContain('Gladius 2k')
    expect(row.text()).toContain('Space Marines')
    await row.trigger('click')
    expect(w.emitted('pick')[0][0].id).toBe(r.id)
  })

  // A draft is an unfinished wizard run (useRosters.js) — what it holds right now isn't what
  // will be fielded, so it can't be attached to a game.
  it('never offers a draft', async () => {
    const store = useRosters()
    const draft = store.createRoster('Half a list')
    store.updateRoster(draft.id, { draft: true, faction: 'space-marines' })

    mount(RosterPickerModal)
    await flushPromises()
    expect(body().findAll('.rp-row')).toHaveLength(0)
    expect(body().find('.rp-empty').exists()).toBe(true)
  })

  it('says so when there is nothing saved yet, without blocking the link route', async () => {
    mount(RosterPickerModal)
    await flushPromises()
    expect(body().find('.rp-empty').exists()).toBe(true)
    expect(body().find('.rp-link input').exists()).toBe(true)
  })

  // The opponent's list normally lives on THEIR phone, so a share link is the only way it can
  // reach this game. Accepts the whole URL as pasted, not just the bare payload.
  it('takes an opponent list from a pasted share URL', async () => {
    const payload = await encodeRoster({
      name: 'Their Orks', faction: 'orks', detachments: ['Bully Boyz'], battleSize: 'strike-force',
      units: [{ uid: 'x', id: 'boyz', size: 0 }],
    })
    const w = mount(RosterPickerModal)
    await flushPromises()
    await body().find('.rp-link input').setValue(`https://wh-rules.ru/roster/shared#r=${payload}`)
    await body().find('.rp-link-btn').trigger('click')
    await waitUntil(() => w.emitted('pick'))

    const picked = w.emitted('pick')[0][0]
    expect(picked.name).toBe('Their Orks')
    expect(picked.faction).toBe('orks')
    expect(picked.id).toBeUndefined() // never saved to the collection — attached to this game only
    expect(useRosters().rosters.value).toHaveLength(0)
  })

  it('reports a malformed link instead of attaching nothing silently', async () => {
    const w = mount(RosterPickerModal)
    await flushPromises()
    await body().find('.rp-link input').setValue('garbage')
    await body().find('.rp-link-btn').trigger('click')
    await waitUntil(() => body().find('.rp-link-error').exists())
    expect(body().find('.rp-link-error').exists()).toBe(true)
    expect(w.emitted('pick')).toBeUndefined()
  })

  it('offers detaching only while something is attached', async () => {
    const w = mount(RosterPickerModal)
    await flushPromises()
    expect(body().find('.rp-clear').exists()).toBe(false)
    await w.setProps({ selected: 'r1' })
    await body().find('.rp-clear').trigger('click')
    expect(w.emitted('clear')).toHaveLength(1)
  })
})

import { afterEach, describe, it, expect, vi } from 'vitest'
import { mount, DOMWrapper } from '@vue/test-utils'
import SharedGameModal from './SharedGameModal.vue'

// An account is what creating needs; the dialog reads it from useParty.
vi.mock('../../composables/useParty.js', () => ({ useParty: () => ({ canShare: { value: true } }) }))

// BaseModal teleports to body (see modals.test.js).
const body = () => new DOMWrapper(document.body)
afterEach(() => { document.body.innerHTML = '' })
const mountIt = () => mount(SharedGameModal, { global: { stubs: { RouterLink: { template: '<a><slot /></a>' } } } })

// Until 2026-10-05 the lobby always opened as singles and locked its type, so a shared doubles
// game could not be made at all. The type is now chosen here, before the lobby exists.
describe('SharedGameModal — the game type comes before the lobby', () => {
  it('"Start a new one" asks for the type instead of opening the lobby', async () => {
    const w = mountIt()
    await body().find('.sg-act').trigger('click')
    await body().find('.sg-field input').setValue('Host')
    expect(w.emitted('create')).toBeUndefined()
    expect(body().findAll('.sg-seg button')).toHaveLength(3)
  })

  it('opens the lobby with the type picked', async () => {
    const w = mountIt()
    await body().find('.sg-act').trigger('click')
    await body().find('.sg-field input').setValue('Host')
    await body().findAll('.sg-seg button')[2].trigger('click')
    await body().find('.sg-actions .btn-primary').trigger('click')
    expect(w.emitted('create')[0]).toEqual([{ mode: 'combatPatrol', name: 'Host', teams: ['', ''] }])
  })

  it('no lobby opens until the host gives its name', async () => {
    const w = mountIt()
    await body().find('.sg-act').trigger('click')
    const start = () => body().find('.sg-actions .btn-primary')
    expect(start().attributes('disabled')).toBeDefined()
    await body().find('.sg-field input').setValue('  ')
    expect(start().attributes('disabled')).toBeDefined()
    await body().find('.sg-field input').setValue('Host')
    expect(start().attributes('disabled')).toBeUndefined()
    await start().trigger('click')
    expect(w.emitted('create')[0][0].name).toBe('Host')
  })

  it('a doubles lobby does not open until both teams are named', async () => {
    const w = mountIt()
    await body().find('.sg-act').trigger('click')
    await body().find('.sg-field input').setValue('Host')
    await body().findAll('.sg-seg button')[1].trigger('click')
    const start = () => body().find('.sg-actions .btn-primary')
    expect(start().attributes('disabled')).toBeDefined()
    await body().findAll('.sg-teams input')[0].setValue('Ultra Bros')
    await body().findAll('.sg-teams input')[1].setValue('   ')
    expect(start().attributes('disabled')).toBeDefined()
    await body().findAll('.sg-teams input')[1].setValue('Waaagh')
    expect(start().attributes('disabled')).toBeUndefined()
    await start().trigger('click')
    expect(w.emitted('create')).toHaveLength(1)
  })

  it('names the teams in doubles, and only there', async () => {
    const w = mountIt()
    await body().find('.sg-act').trigger('click')
    await body().find('.sg-field input').setValue('Host')
    expect(body().find('.sg-teams').exists()).toBe(false)
    await body().findAll('.sg-seg button')[1].trigger('click')
    const inputs = body().findAll('.sg-teams input')
    await inputs[0].setValue(' Ultra Bros ')
    await inputs[1].setValue('Waaagh')
    await body().find('.sg-actions .btn-primary').trigger('click')
    expect(w.emitted('create')[0]).toEqual([{ mode: 'doubles', name: 'Host', teams: ['Ultra Bros', 'Waaagh'] }])
  })

  it('defaults to singles', async () => {
    const w = mountIt()
    await body().find('.sg-act').trigger('click')
    await body().find('.sg-field input').setValue('Host')
    await body().find('.sg-actions .btn-primary').trigger('click')
    expect(w.emitted('create')[0]).toEqual([{ mode: 'singles', name: 'Host', teams: ['', ''] }])
  })
})

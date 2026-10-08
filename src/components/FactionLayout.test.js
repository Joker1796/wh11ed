import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

let PARAMS = {}
const push = vi.fn()
const back = vi.fn()
vi.mock('vue-router', () => ({
  useRoute: () => ({ get params() { return PARAMS }, get path() { return PARAMS.unit ? `/factions/${PARAMS.slug}/datasheets/${PARAMS.unit}` : `/factions/${PARAMS.slug}` } }),
  useRouter: () => ({ push, back }),
  RouterLink: { props: ['to'], template: '<a :href="to"><slot /></a>' },
}))

let FactionLayout, useMobileActionBar

beforeEach(async () => {
  vi.resetModules()
  push.mockClear()
  back.mockClear()
  ;({ default: FactionLayout } = await import('./FactionLayout.vue'))
  ;({ useMobileActionBar } = await import('../composables/useMobileActionBar.js'))
})

const settle = async () => { for (let i = 0; i < 20; i++) { await flushPromises(); await new Promise((r) => setTimeout(r, 5)) } }

describe('FactionLayout — the way back from a unit page', () => {
  // The unit page has no hero of its own, so without this a phone could only leave through the
  // drawer. (The desktop has its corner buttons — below.)
  it('offers a back-to-units button on a unit page', async () => {
    PARAMS = { slug: 'orks', unit: 'boyz' }
    const w = mount(FactionLayout, { props: { hero: false } })
    await settle()
    const { contributions } = useMobileActionBar()
    const action = contributions['faction-back-to-units']?.[0]
    expect(action.label).toBeTruthy()
    expect(action.icon).toBe('wi wi-units')
    w.unmount()
  })

  it('offers nothing of the kind on the faction page itself', async () => {
    PARAMS = { slug: 'orks' }
    const w = mount(FactionLayout, { props: { hero: true } })
    await settle()
    const { contributions } = useMobileActionBar()
    expect(contributions['faction-back-to-units']).toBeUndefined()
    w.unmount()
  })

  // Going BACK where the page was opened from that list restores the reader's place in it; the
  // list runs to ninety units on some factions, and a fresh push would drop them at the top.
  it('goes back when the list is where this page came from, and pushes otherwise', async () => {
    PARAMS = { slug: 'orks', unit: 'boyz' }
    const w = mount(FactionLayout, { props: { hero: false } })
    await settle()
    const { contributions } = useMobileActionBar()
    const action = contributions['faction-back-to-units'][0]

    history.replaceState({ back: '/factions/orks/datasheets' }, '')
    action.onClick()
    expect(back).toHaveBeenCalled()
    expect(push).not.toHaveBeenCalled()

    history.replaceState({ back: '/tracker' }, '')
    action.onClick()
    expect(push).toHaveBeenCalledWith('/factions/orks/datasheets')
    w.unmount()
  })

  // The desktop subnav strip over the sheet gave way to corner buttons (owner, 2026-10-01): the
  // three faction pages, Units by the same way back as the phone's button.
  it('puts Rules, Units and FAQ in the corner of a unit page', async () => {
    PARAMS = { slug: 'orks', unit: 'boyz' }
    const RouterLink = { props: ['to'], template: '<a :href="to"><slot /></a>' }
    const w = mount(FactionLayout, { props: { hero: false }, global: { stubs: { RouterLink } } })
    await settle()
    const fabs = w.findAll('.faction-fabs .fab-btn')
    expect(fabs.map((b) => b.find('i').classes().join(' '))).toEqual(['wi wi-army', 'wi wi-units', 'wi wi-faq'])
    expect(fabs[0].attributes('href')).toBe('/factions/orks')
    expect(fabs[2].attributes('href')).toBe('/factions/orks/faq')
    history.replaceState({ back: '/factions/orks/datasheets' }, '')
    await fabs[1].trigger('click')
    expect(back).toHaveBeenCalled()
    w.unmount()
  })
})

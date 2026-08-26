import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MobileUtilityBar from './MobileUtilityBar.vue'

const RouterLinkStub = { props: ['to'], template: '<a class="rl"><slot /></a>' }
const mountBar = (props = {}) =>
  mount(MobileUtilityBar, { props, global: { stubs: { RouterLink: RouterLinkStub } } })

// The bar is additive — every button is optional and it hides itself when none apply. These
// cover the roster chip, whose link target is load-bearing: without the id in it the wizard
// would open blank and the next faction pick would start a SECOND draft.
describe('MobileUtilityBar — back to a half-built roster', () => {
  it('stays out of the way when there is nothing to return to', () => {
    expect(mountBar().find('.mobile-bar').exists()).toBe(false)
  })

  it('shows itself for the roster chip alone', () => {
    expect(mountBar({ resumeDraftId: 'abc123' }).find('.mobile-bar').exists()).toBe(true)
  })

  it('links at THAT draft, not at a fresh wizard', () => {
    const w = mountBar({ resumeDraftId: 'abc123' })
    const link = w.findAllComponents(RouterLinkStub).find((l) => l.text() === 'To roster')
    expect(link.props('to')).toEqual({ path: '/roster/new', query: { draft: 'abc123' } })
  })

  it('sits alongside the back-to-game chip rather than replacing it', () => {
    const w = mountBar({ showResumeGame: true, resumeDraftId: 'abc123' })
    const texts = w.findAllComponents(RouterLinkStub).map((l) => l.text())
    expect(texts).toEqual(['To game', 'To roster'])
  })
})

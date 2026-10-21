import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import FactionUnitMenu from './FactionUnitMenu.vue'

// "Open in a new tab" only where there are tabs: the installed app has none (owner, 2026-10-22).
describe('FactionUnitMenu — open in a new tab', () => {
  const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/:p(.*)*', component: { template: '<div />' } }] })
  const mountMenu = () => mount(FactionUnitMenu, {
    props: { open: true, slug: 'orks', unit: { id: 'warboss', name: 'Warboss' } },
    global: { plugins: [router], stubs: { Teleport: true } },
    attachTo: document.body,
  })
  const newTab = (w) => document.body.querySelector('a[target="_blank"]') || w.find('a[target="_blank"]').element
  afterEach(() => { vi.unstubAllGlobals(); document.body.innerHTML = '' })

  it('offers it in a browser tab', () => {
    vi.stubGlobal('matchMedia', (q) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {} }))
    expect(newTab(mountMenu())).toBeTruthy()
  })
  it('leaves it out of the installed app', () => {
    vi.stubGlobal('matchMedia', (q) => ({ matches: q.includes('standalone'), media: q, addEventListener() {}, removeEventListener() {} }))
    const w = mountMenu()
    expect(document.body.querySelector('a[target="_blank"]')).toBeNull()
    expect(w.find('a[target="_blank"]').exists()).toBe(false)
  })
})

import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { staticIndexFor } from './useSearch.js'
import { useLocale } from './useLocale.js'

// A search hit is a route plus an anchor, and the anchor is only a promise: nothing checked it
// against the page. Every Errata & FAQs hit on the Event Companion pointed at an `ec-faq-<i>`
// that no element carried, so the page opened and stayed at the top (a player's report,
// 2026-09-24). This renders the two one-page books and asks for every anchor the static index
// sends there, in both locales.
const PAGES = {
  '/event-companion': () => import('../views/EventCompanionView.vue'),
  '/core-rules': () => import('../views/CoreRulesView.vue'),
}

async function idsOn(route, locale) {
  useLocale().setLocale?.(locale)
  const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/:p(.*)*', component: { template: '<div />' } }] })
  await router.push(route)
  const View = (await PAGES[route]()).default
  const w = mount(View, { global: { plugins: [router], stubs: { Teleport: true } }, attachTo: document.body })
  await flushPromises()
  const ids = new Set([...document.querySelectorAll('[id]')].map((e) => e.id))
  w.unmount()
  return ids
}

describe('search anchors', () => {
  for (const locale of ['en', 'ru']) {
    for (const route of Object.keys(PAGES)) {
      it(`every ${route} hit lands on an element (${locale})`, async () => {
        const ids = await idsOn(route, locale)
        const missing = staticIndexFor(locale)
          .filter((item) => item.route === route && item.id && !ids.has(item.id))
          .map((item) => item.id)
        expect(missing).toEqual([])
      })
    }
  }
})

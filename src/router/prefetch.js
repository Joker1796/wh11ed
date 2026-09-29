import { loadFaction } from '../data/factions/index.js'
import { loadFactionRu } from '../data/factions/ru/index.js'
import { loadDatasheets } from '../data/datasheets/index.js'
import { loadDatasheetsRu } from '../data/datasheets/ru/index.js'
import { locale } from '../composables/useLocale.js'

// What a page needs before it is shown, fetched while the OLD page is still on screen
// (router.beforeResolve, index.js). The faction pages render their content only once their
// per-faction chunk resolves, so without this the page slid in empty and the content popped in
// a beat later, with no motion of its own (owner, 2026-09-28). Every loader here is a cached
// dynamic import, so the view's own `await` of the same thing then settles in a microtask — before
// the page's first paint. The tracker and roster screens read localStorage and never needed this.
//
// Named by `meta.prefetch` on the route. Best effort: a failure or a slow network never blocks
// the navigation — the page then loads as it always did, just visibly.
const faqRu = import.meta.glob('../data/factionFaqRu.json', { import: 'default' })
const legendsRu = import.meta.glob('../data/factionLegendsRu.json', { import: 'default' })
const ru = () => locale.value === 'ru'

const factionPage = (slug) => [loadFaction(slug), ru() && loadFactionRu(slug)]

export const PREFETCH = {
  faction: (to) => factionPage(to.params.slug),
  factionDatasheets: (to) => [
    ...factionPage(to.params.slug),
    loadDatasheets(to.params.slug),
    import('../data/factionLegends.json'),
    ru() && legendsRu['../data/factionLegendsRu.json']?.(),
  ],
  factionFaq: (to) => [
    ...factionPage(to.params.slug),
    import('../data/factionFaq.json'),
    ru() && faqRu['../data/factionFaqRu.json']?.(),
  ],
  factionUnit: (to) => [
    ...factionPage(to.params.slug),
    loadDatasheets(to.params.slug),
    ru() && loadDatasheetsRu(to.params.slug),
  ],
}

const PREFETCH_TIMEOUT_MS = 4000

export async function prefetchFor(to) {
  const make = PREFETCH[to.meta?.prefetch]
  if (!make) return
  const all = Promise.allSettled(make(to).filter(Boolean))
  await Promise.race([all, new Promise((r) => setTimeout(r, PREFETCH_TIMEOUT_MS))])
}

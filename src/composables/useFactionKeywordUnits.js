import { onMounted, onUnmounted, ref, toValue } from 'vue'
import { factionUnitKeywords } from '../data/factionUnitKeywords.js'
import { unitsWithKeyword } from '../utils/keywordUnits.js'

// A tap on a faction's unit keyword in rule prose (a `.fkw` span, useRenderInline.js) → the units
// that carry it, in KeywordUnitsModal, each linking to its datasheet (player request 2026-09-29:
// "one Endless Multitude unit" — which ones are those?). App.vue owns the one modal.
//
// Which faction's units: the keyword's own list says which factions carry it (the generated
// factionUnitKeywords.js). A keyword only one faction has needs nothing more. One several share
// (KHORNE, GRAVIS) is narrowed to the faction on screen — the list being built or read (a
// context below), else the faction page's own slug — and shown for all of them when neither
// applies.
//
// "Mine" is the list on screen: its units come first and wear a mark, so a player reading a
// stratagem from inside their roster sees at once which of their own units it can target.

const shown = ref(null) // { keyword, factionSlug, units, anchor } while the list is open
const contexts = ref([]) // the roster screens mounted now, innermost last

// A roster screen says what list is on it: `getter` returns { faction, unitIds } (either may be
// missing). Registered for the component's lifetime.
export function useKeywordContext(getter) {
  const entry = { get: getter }
  onMounted(() => { contexts.value = [...contexts.value, entry] })
  onUnmounted(() => { contexts.value = contexts.value.filter((c) => c !== entry) })
}

let pending = 0
// `anchor` is the tapped word's rect: on a wide screen the list drops from it like the glossary
// popover does (KeywordUnitsModal).
export async function openFactionKeyword(keyword, pageFaction = null, { load, anchor = null } = {}) {
  const carriers = factionUnitKeywords[keyword]
  if (!carriers?.length) return
  const ctx = contexts.value.length ? toValue(contexts.value[contexts.value.length - 1].get) : null
  const here = ctx?.faction || pageFaction
  const slugs = carriers.includes(here) ? [here] : carriers
  const loadSheets = load || (async (slug) => (await import('../data/datasheets/index.js')).loadDatasheets(slug))
  const mine = new Set(ctx?.faction && ctx.unitIds ? ctx.unitIds : [])
  const call = ++pending
  const lists = await Promise.all(slugs.map(async (slug) => [slug, unitsWithKeyword(await loadSheets(slug), keyword)]))
  if (call !== pending) return // a second tap came in while this one loaded
  const units = lists.flatMap(([slug, sheets]) => sheets.map((s) => ({
    id: s.id,
    name: s.name,
    slug,
    own: slug === ctx?.faction && mine.has(s.id),
    // Several factions in one list: each row says whose it is.
    faction: slugs.length > 1 ? slug : null,
  })))
  units.sort((a, b) => (b.own - a.own) || a.name.localeCompare(b.name))
  shown.value = { keyword, factionSlug: slugs[0], units, anchor }
}

// The same list for a set of units known up front rather than read off a keyword — a datasheet's
// "a Character with the Abhuman Detail enhancement" (DatasheetCard): who may take it. `heading`
// replaces the "Units with «…»" title.
export function openUnitList({ heading, factionSlug, units, anchor = null }) {
  ++pending // a keyword list still loading must not replace this one
  shown.value = { keyword: '', heading, factionSlug, units, anchor }
}

export function closeFactionKeyword() { shown.value = null }

export function useFactionKeywordUnits() {
  return { shown, openFactionKeyword, openUnitList, closeFactionKeyword }
}

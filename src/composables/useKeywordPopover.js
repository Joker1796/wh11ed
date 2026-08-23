import { ref } from 'vue'
import { useLocale } from './useLocale.js'

const visible = ref(false)
const activeKeyword = ref(null)
const anchor = ref(null)

const { locale } = useLocale()

const bare = name => name.replace(/^\[|\]$/g, '').toUpperCase()

// Lazy lookup data. reference.js (~96 KB) + eventCompanion.js (~108 KB) are large and
// only needed once a `.keyword` is actually clicked, so we import them on first open
// instead of dragging them into the entry chunk (which loads on every page). Both remain
// precached for offline (Workbox globs all `.js`); this defers parsing, not caching.
let dataPromise = null
function loadData() {
  if (!dataPromise) {
    dataPromise = Promise.all([
      import('../data/reference.js'),
      import('../data/eventCompanion.js'),
    ]).then(([ref, ec]) => ({
      coreAbilities: ref.coreAbilities,
      eventCompanion: ec.eventCompanion,
    }))
  }
  return dataPromise
}

function lookup(rawText, { coreAbilities, eventCompanion }) {
  const text = rawText.toUpperCase().trim()
  const base = coreAbilities.en
  let idx = base.findIndex(a => bare(a.name) === text)
  if (idx === -1) idx = base.findIndex(a => text.startsWith(bare(a.name)))
  if (idx !== -1) {
    return locale.value === 'ru'
      ? { ...base[idx], ...coreAbilities.ru[idx] }
      : base[idx]
  }

  // Event Companion glossary (name stays EN; RU overrides fullText, like coreAbilities).
  const glossary = eventCompanion.en.glossary || []
  const gi = glossary.findIndex(g => bare(g.name) === text)
  const gj = gi !== -1 ? gi : glossary.findIndex(g => text.startsWith(bare(g.name)))
  if (gj === -1) return null
  return locale.value === 'ru'
    ? { ...glossary[gj], ...(eventCompanion.ru.glossary?.[gj] || {}) }
    : glossary[gj]
}

// Gloss data (glossary.js) is lazy-loaded on first gloss click, same rationale as the
// keyword lookup tables above: keep it out of the entry chunk.
let glossPromise = null
function loadGlossary() {
  if (!glossPromise) {
    glossPromise = import('../data/glossary.js').then(m => m.glossary)
  }
  return glossPromise
}

// A button that opens the popover ITSELF, rather than being a `.keyword` span App.vue recognises,
// must say so — `data-kw-open` — because the same click then bubbles to App's document listener,
// whose job is "a click anywhere else closes the popover". Without the marker the popover opens and
// closes in one gesture, which is exactly what happened to the chips' "i" (2026-08-23) and to every
// rule button on a card that is not inside a modal.
export const KW_OPENER_ATTR = 'data-kw-open'
export function opensPopover(el) {
  return !!(el && typeof el.closest === 'function' && el.closest(`[${KW_OPENER_ATTR}]`))
}

export function useKeywordPopover() {
  async function open(rawText, rect) {
    const data = await loadData()
    const found = lookup(rawText, data)
    if (!found) return
    activeKeyword.value = { ...found, kind: 'keyword' }
    anchor.value = rect
    visible.value = true
  }
  async function openGloss(id, rect) {
    const glossary = await loadGlossary()
    const entry = glossary[id]
    if (!entry) return
    // Normalize to the popover's { name, num, fullText } shape: header shows the English
    // term, body shows the per-locale definition. No num → no cross-ref navigation.
    // Translation-only entries carry no en/ru → fullText is empty and the body is hidden.
    activeKeyword.value = {
      name: entry.term,
      num: '',
      fullText: entry[locale.value] ?? entry.en ?? '',
      kind: 'gloss',
    }
    anchor.value = rect
    visible.value = true
  }
  // A rule the CALLER already has the text for — the army rule behind a datasheet's "Faction:"
  // line, opened from the roster's unit modal. Unlike open()/openGloss() there's no lookup table
  // to consult: the faction bundle is already loaded by the caller, and it would be wasteful (and
  // wrong, since the text is per-locale there) to re-resolve it here. Same { name, num, fullText }
  // shape, so the popover renders it exactly like a core ability.
  function openRule(name, text, rect) {
    if (!name || !text) return
    activeKeyword.value = { name, num: '', fullText: text, kind: 'rule' }
    anchor.value = rect
    visible.value = true
  }
  function close() {
    visible.value = false
  }
  return { visible, activeKeyword, anchor, open, openGloss, openRule, close }
}

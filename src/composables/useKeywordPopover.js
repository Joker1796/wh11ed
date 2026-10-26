import { ref } from 'vue'
import { useLocale } from './useLocale.js'
import { parseWeaponTag, weaponTagNote } from '../core/rules/weaponTagQualifier.js'
import { baseTag } from '../core/rules/weaponTag.js'

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
      import('../data/ownWeaponAbilities.js'),
    ]).then(([ref, ec, own]) => ({
      coreAbilities: ref.coreAbilities,
      eventCompanion: ec.eventCompanion,
      ownAbilities: own.default,
    }))
  }
  return dataPromise
}

// By name, then by the ability the name is an instance of — `baseTag` strips the parameters
// ([SUSTAINED HITS 2], Scouts 6"). Never by how the text STARTS: that read [PSYCHIC ASSASSIN] as
// [PSYCHIC] (2026-10-16). A tag that is no core ability is the datasheet's own, which the weapon
// table opens itself (DatasheetWeaponTable.vue).
export function lookup(rawText, { coreAbilities, eventCompanion, ownAbilities = {} }, loc = locale.value) {
  const text = rawText.toUpperCase().trim()
  const of = baseTag(rawText)
  const base = coreAbilities.en
  let idx = base.findIndex(a => bare(a.name) === text)
  if (idx === -1) idx = base.findIndex(a => bare(a.name) === of)
  if (idx !== -1) {
    return loc === 'ru'
      ? { ...base[idx], ...coreAbilities.ru[idx] }
      : base[idx]
  }

  // Event Companion glossary (name stays EN; RU overrides fullText, like coreAbilities).
  const glossary = eventCompanion.en.glossary || []
  const gi = glossary.findIndex(g => bare(g.name) === text)
  const gj = gi !== -1 ? gi : glossary.findIndex(g => bare(g.name) === of)
  if (gj === -1) return ownAbility(of, ownAbilities, loc)
  return loc === 'ru'
    ? { ...glossary[gj], ...(eventCompanion.ru.glossary?.[gj] || {}) }
    : glossary[gj]
}

// A weapon ability that is not in the Core Rules — a datasheet's own ([PSYCHIC ASSASSIN]) or one a
// faction rule defines ([SUPA-HAZARDOUS]) — named as a tag somewhere other than its own sheet: the
// changelog, a faction FAQ, a rule's prose (ownWeaponAbilities.js, generated). One name printed with
// different texts on different sheets ([CONVERSION]: six ranges) shows each, under its units.
function ownAbility(base, ownAbilities, loc) {
  const variants = ownAbilities[base]
  if (!variants?.length) return null
  const text = (v) => (loc === 'ru' && v.ru) || v.en
  const fullText = variants.length === 1
    ? text(variants[0])
    : variants.map((v) => `**${(v.units || []).join(', ')}:** ${text(v)}`).join('\n\n')
  return { name: `[${base}]`, num: '', fullText, type: 'weapon' }
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
    // A weapon ability written with its targets ("LETHAL HITS: NON-MONSTER/VEHICLE", "ANTI-
    // MONSTER/VEHICLE 3+") is this tag, not the bare ability: its own name, and first what it
    // does here (weaponTagQualifier.js), then the ability's text.
    const q = found.type === 'weapon' ? parseWeaponTag(rawText) : null
    activeKeyword.value = q
      ? { ...found, name: `[${rawText.trim().toUpperCase()}]`, fullText: `${weaponTagNote(q, locale.value)}\n\n${found.fullText}`, kind: 'keyword' }
      : { ...found, kind: 'keyword' }
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
  // `sub` is a display line under the name, for a rule whose name stays English by project
  // convention while its translation travels beside it (a stratagem's, on the roster's chips).
  function openRule(name, text, rect, sub = null) {
    if (!name || !text) return
    activeKeyword.value = { name, num: '', sub, fullText: text, kind: 'rule' }
    anchor.value = rect
    visible.value = true
  }
  function close() {
    visible.value = false
  }
  return { visible, activeKeyword, anchor, open, openGloss, openRule, close }
}

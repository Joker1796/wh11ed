<template>
  <BaseModal :title="title" max-width="640px" max-height="85vh" @close="$emit('close')">
    <div class="modal-body">
      <div v-if="rangedRows.length" class="wpm-weapons">
        <table>
          <thead>
            <tr><th class="wname">{{ labels.dsRanged }}</th><th>Range</th><th>A</th><th>BS</th><th>S</th><th>AP</th><th>D</th></tr>
          </thead>
          <tbody>
            <tr v-for="(w, i) in rangedRows" :key="i" :class="'wg-' + w.gpos">
              <td class="wname"><span class="wname-text"><span v-if="w.gpos !== 'single'" class="wprofile-arrow" aria-hidden="true"></span>{{ w.name }}</span><span v-if="w.tags?.length" class="wtags"><span v-for="t in w.tags" :key="t" class="wtag" v-html="renderInline('[' + t + ']')"></span></span></td>
              <td data-label="Range">{{ w.range }}</td><td data-label="A">{{ w.a }}</td><td data-label="BS">{{ w.bs }}</td><td data-label="S">{{ w.s }}</td><td data-label="AP">{{ w.ap }}</td><td data-label="D">{{ w.d }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="meleeRows.length" class="wpm-weapons">
        <table>
          <thead>
            <tr><th class="wname">{{ labels.dsMelee }}</th><th>Range</th><th>A</th><th>WS</th><th>S</th><th>AP</th><th>D</th></tr>
          </thead>
          <tbody>
            <tr v-for="(w, i) in meleeRows" :key="i" :class="'wg-' + w.gpos">
              <td class="wname"><span class="wname-text"><span v-if="w.gpos !== 'single'" class="wprofile-arrow" aria-hidden="true"></span>{{ w.name }}</span><span v-if="w.tags?.length" class="wtags"><span v-for="t in w.tags" :key="t" class="wtag" v-html="renderInline('[' + t + ']')"></span></span></td>
              <td data-label="Range">Melee</td><td data-label="A">{{ w.a }}</td><td data-label="WS">{{ w.ws }}</td><td data-label="S">{{ w.s }}</td><td data-label="AP">{{ w.ap }}</td><td data-label="D">{{ w.d }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="abilityRows.length" class="wpm-abilities">
        <div v-for="a in abilityRows" :key="a.name" class="wpm-ability">
          <strong>{{ a.name }}:</strong> <span v-html="renderInline(a.text)"></span>
        </div>
      </div>
      <p v-if="loaded && !rangedRows.length && !meleeRows.length && !abilityRows.length" class="wpm-missing">{{ labels.rosterNoProfile }}</p>
    </div>
  </BaseModal>
</template>

<script setup>
// A focused view of one (or a few, for a "replace X and Y with…" group's default row) wargear
// item — looked up by name in the unit's own linked datasheet. Most wargear items are weapons
// (a stat-line profile from `sheet.ranged`/`sheet.melee`, which lists every profile the unit can
// take, default and optional alike — datasheets don't model wargear choices themselves), but a
// handful grant an ABILITY instead of a weapon profile (e.g. Necrons' Resurrection Orb, which has
// no stat line at all — it's a `wargearAbilities` entry), so both are matched by name and shown.
// Weapon names/stats are never RU-translated (see CLAUDE.md's roster decision "имена данных EN"),
// but an ability's PROSE is — so the EN sheet is matched against (item names in items.js are
// English, and so are the ability names keying the overlay) and only the ability text is taken
// from the RU overlay. Deliberately NOT the same component as RosterUnitRulesModal/DatasheetCard:
// a wargear pick's info button should show just that item's own profile/rule, not the whole unit
// sheet.
import { computed, ref, watch } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { loadDatasheetsRu, localizeSheet } from '../../data/datasheets/ru/index.js'
import { weaponBase, withGroupPos } from '../../utils/weaponGroups.js'

const props = defineProps({
  unitId: { type: String, required: true },
  factionSlug: { type: String, required: true },
  names: { type: Array, required: true },
})
defineEmits(['close'])

const { locale } = useLocale()
const { renderInline } = useRenderInline()
const labels = computed(() => ui[locale.value])

const title = computed(() => props.names.join(' / '))

const sheet = ref(null)
const loaded = ref(false)
watch(
  () => props.factionSlug,
  async (slug) => {
    sheet.value = null
    loaded.value = false
    if (!slug) return
    const list = await loadDatasheets(slug)
    if (props.factionSlug !== slug) return
    sheet.value = (list || []).find((d) => d.id === props.unitId) || null
    loaded.value = true
  },
  { immediate: true },
)

// items.js (generated from wh40k-appdata's wargear_item names) and the datasheet files
// (transcribed separately) sometimes disagree on the exact glyph for an apostrophe or hyphen —
// "Sergeant's autogun" vs "Sergeant’s autogun", "Tome-skull" vs "Tome‐skull" (U+2010) — visually
// identical, byte-different, so a plain case-insensitive match silently misses them. Normalize
// both sides to a plain ' and - before comparing.
function norm(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[‘’‚‛]/g, "'")
    .replace(/[‐‑‒–—―]/g, '-')
}
const wanted = computed(() => new Set(props.names.map(norm)))
function matching(list) {
  return withGroupPos((list || []).filter((w) => wanted.value.has(norm(weaponBase(w.name)))))
}
const rangedRows = computed(() => matching(sheet.value?.ranged))
const meleeRows = computed(() => matching(sheet.value?.melee))

// The same sheet with its prose in RU (null outside the RU locale, and while the overlay chunk
// is still loading — the EN original shows until it arrives, never an empty modal).
const ruModule = ref(null)
watch(
  [() => props.factionSlug, locale],
  async ([slug, loc]) => {
    ruModule.value = null
    if (!slug || loc !== 'ru') return
    const mod = await loadDatasheetsRu(slug)
    if (props.factionSlug === slug && locale.value === 'ru') ruModule.value = mod
  },
  { immediate: true },
)
const ruSheet = computed(() => {
  const en = sheet.value
  if (!en || !ruModule.value) return null
  return localizeSheet(en, ruModule.value.default?.[en.id], ruModule.value.abilityNamesRu)
})

// Matched on the EN list — the wanted names come from items.js, which is English — and paired
// with the RU list by position, which localizeSheet preserves. The NAME shown stays the English
// one: it is the wargear item, the same string as this modal's own title, and translating only
// one of the two would read as two different things.
function abilityMatching(key) {
  const en = sheet.value?.[key] || []
  const ru = ruSheet.value?.[key]
  return en.flatMap((a, i) =>
    wanted.value.has(norm(a.name)) ? [{ name: a.name, text: ru?.[i]?.text ?? a.text }] : [],
  )
}
// Checked in this order since a wargear-granted ability (Resurrection Orb) is the common
// non-weapon case; the other two lists are checked too so nothing that happens to share a name
// with a core/special ability silently comes up empty.
const abilityRows = computed(() => [
  ...abilityMatching('wargearAbilities'),
  ...abilityMatching('abilities'),
  ...abilityMatching('specialAbilities'),
])
</script>

<style scoped>
/* --bg-row-hover is a hardcoded brand-red rgba on :root and doesn't follow the faction accent
   (see DatasheetCard.vue's own override for the same reason) — table row-hover here would
   otherwise flash the global red instead of the faction colour FactionAccentScope sets up. */
.modal-body { padding: 0.9rem; overflow-y: auto; --bg-row-hover: color-mix(in srgb, var(--accent) 14%, transparent); }
.wpm-missing { color: var(--text-muted); font-size: 0.95rem; text-align: center; padding: 1rem 0; }
.wpm-abilities { font-size: 0.85rem; line-height: 1.5; color: var(--text-primary); }
.wpm-ability { margin-bottom: 0.45rem; }
.wpm-ability:last-child { margin-bottom: 0; }

/* Same weapon-table look as DatasheetCard's .ds-weapons, kept local since scoped styles can't
   cross components — this is presentation-only duplication, not logic (see weaponGroups.js for
   the shared pure helpers). */
.wpm-weapons { overflow-x: auto; margin-bottom: 0.7rem; }
.wpm-weapons table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.wpm-weapons th {
  text-align: center;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #fff;
  background: var(--accent);
  padding: 0.3rem 0.35rem;
  white-space: nowrap;
}
.wpm-weapons th:first-child { border-top-left-radius: 4px; }
.wpm-weapons th:last-child { border-top-right-radius: 4px; }
.wpm-weapons td {
  text-align: center;
  padding: 0.3rem 0.35rem;
  border-bottom: 1px solid var(--border);
  color: var(--text-primary);
  white-space: nowrap;
}
.wpm-weapons .wname { text-align: left; white-space: normal; min-width: 10rem; }
.wtags { margin-left: 0.35rem; }
.wtag { font-size: 0.72rem; }
.wpm-weapons tr.wg-start td,
.wpm-weapons tr.wg-mid td,
.wpm-weapons tr.wg-end td {
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}
.wprofile-arrow {
  display: inline-block;
  width: 13px;
  height: 9px;
  margin-right: 0.4rem;
  background: var(--accent);
  clip-path: polygon(0 0, 65% 0, 100% 50%, 65% 100%, 0 100%);
  vertical-align: middle;
}

/* Phones: the same stacked treatment DatasheetCard's own weapon tables get below 560px — see the
   long comment there for the whole rationale (a six-column statline plus a name never fits a
   phone, the thead's first cell survives as the section caption, a multi-profile weapon stays one
   card). Duplicated here for the same reason the table styling above is: scoped styles can't
   reach another component. This modal opens from the roster editor, which is a phone screen most
   of the time, so leaving it as the one cramped table would be the obvious inconsistency. */
@media (max-width: 560px) {
  .wpm-weapons { overflow-x: visible; }
  .wpm-weapons:has(+ .wpm-weapons) { margin-bottom: 0.8rem; }
  .wpm-weapons table,
  .wpm-weapons thead,
  .wpm-weapons tbody,
  .wpm-weapons thead tr { display: block; }
  .wpm-weapons th { display: none; }
  .wpm-weapons th.wname {
    display: block;
    min-width: 0;
    padding: 0 0.1rem 0.3rem;
    background: none;
    color: var(--accent);
    border-radius: 0;
    font-size: 0.64rem;
  }
  .wpm-weapons tbody tr {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.1rem 0.2rem;
    margin-bottom: 0.35rem;
    padding: 0.5rem 0.55rem 0.55rem;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: color-mix(in srgb, var(--text-primary) 3%, transparent);
  }
  .wpm-weapons tbody tr:last-child { margin-bottom: 0; }
  .wpm-weapons td {
    display: block;
    padding: 0;
    border: none;
    text-align: center;
    font-weight: 600;
  }
  .wpm-weapons td.wname { display: contents; }
  .wpm-weapons .wname-text {
    grid-column: 1 / -1;
    text-align: left;
    font-weight: 600;
    margin-bottom: 0.15rem;
  }
  .wpm-weapons .wtags {
    grid-column: 1 / -1;
    order: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin: 0.3rem 0 0;
  }
  .wpm-weapons td[data-label]::before {
    content: attr(data-label);
    display: block;
    font-size: 0.56rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--text-muted);
  }
  .wpm-weapons tbody tr.wg-start,
  .wpm-weapons tbody tr.wg-mid,
  .wpm-weapons tbody tr.wg-end {
    background: color-mix(in srgb, var(--accent) 8%, transparent);
  }
  .wpm-weapons tr.wg-start td,
  .wpm-weapons tr.wg-mid td,
  .wpm-weapons tr.wg-end td { background: none; }
  .wpm-weapons tbody tr.wg-start,
  .wpm-weapons tbody tr.wg-mid {
    margin-bottom: 0;
    border-bottom: none;
  }
  .wpm-weapons tbody tr.wg-start { border-radius: 6px 6px 0 0; }
  .wpm-weapons tbody tr.wg-mid { border-radius: 0; }
  .wpm-weapons tbody tr.wg-end { border-radius: 0 0 6px 6px; }
  .wpm-weapons tbody tr.wg-mid,
  .wpm-weapons tbody tr.wg-end { border-top: 1px dashed var(--border); }
}
</style>

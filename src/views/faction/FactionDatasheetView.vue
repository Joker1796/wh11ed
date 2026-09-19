<template>
  <FactionLayout :hero="false">
    <section class="fsection">
      <!-- One container for the plate and the card: the card bleeds to the screen edge by its
           OWN width (DatasheetCard's dscard container, ≤480px), and the plate has to bleed on
           exactly the same condition — a viewport query put the two out of step by the page
           gutter, and a window ~500px wide showed an inset plate over a full-bleed card. -->
      <div
        v-if="sheet"
        class="ds-page"
      >
        <div class="ds-head">
          <!-- No Legends mark up here: the name plate is the first thing on a phone's screen and
               anything beside the name either wrapped the name or took a row. The badge sits in
               the statline's spare space instead (DatasheetCard). -->
          <h2 class="ds-title">
            {{ sheet.name }} <span
              v-if="sheet.baseSize"
              class="ds-title-base"
            >({{ fmtBase(sheet.baseSize) }})</span>
          </h2>
          <div class="ds-actions">
            <button
              type="button"
              class="ds-btn"
              :class="{ 'ds-btn-pin-on': fav }"
              :title="fav ? labels.dsUnpinUnit : labels.dsPinUnit"
              :aria-label="fav ? labels.dsUnpinUnit : labels.dsPinUnit"
              :aria-pressed="fav"
              @click="toggleUnitFavorite(route.params.slug, sheet.id)"
            >
              <i :class="fav ? 'bi bi-pin-angle-fill' : 'bi bi-pin-angle'" />
            </button>
            <!-- "I own this one" — the mark the roster catalogue shows on its rows and can filter
                 by. Same treatment as the pin: state is the outline→filled swap, no highlight. -->
            <button
              type="button"
              class="ds-btn"
              :class="{ 'ds-btn-pin-on': owned }"
              :title="owned ? labels.dsOwnRemove : labels.dsOwnAdd"
              :aria-label="owned ? labels.dsOwnRemove : labels.dsOwnAdd"
              :aria-pressed="owned"
              @click="toggleOwned(route.params.slug, sheet.id, sheet.name)"
            >
              <i :class="owned ? 'bi bi-star-fill' : 'bi bi-star'" />
            </button>
            <button
              type="button"
              class="ds-btn"
              :class="{ copied }"
              :title="copied ? labels.dsCopied : labels.dsCopyName"
              :aria-label="copied ? labels.dsCopied : labels.dsCopyName"
              @click="copyName"
            >
              <i :class="copied ? 'bi bi-check2' : 'bi bi-clipboard'" />
            </button>
            <button
              v-if="sheet.flavor"
              ref="loreBtn"
              type="button"
              class="ds-btn"
              :class="{ copied: loreOpen }"
              :title="loreOpen ? labels.loreHide : labels.loreShow"
              :aria-label="loreOpen ? labels.loreHide : labels.loreShow"
              :aria-pressed="loreOpen"
              @click="toggleLorePopover"
            >
              <i :class="loreOpen ? 'bi bi-book-fill' : 'bi bi-book'" />
            </button>
            <a
              :href="imageUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="ds-btn"
              :title="labels.dsSearchImage"
              :aria-label="labels.dsSearchImage"
            >
              <i class="bi bi-image" />
            </a>
            <!-- On a phone the five buttons above fold into this one (the container query below
                 swaps them): five 30px squares beside a name like "Kill Team Cassius" left the name
                 two words to a line (a screenshot, 2026-09-19). The sheet it opens is the same
                 .act-list every "…" in the app opens, the actions unchanged. -->
            <button
              ref="moreBtn"
              type="button"
              class="ds-btn ds-more"
              :title="labels.rosterMoreActions"
              :aria-label="labels.rosterMoreActions"
              @click="moreOpen = true"
            >
              <i class="bi bi-three-dots" />
            </button>
          </div>
        </div>
        <DatasheetCard
          :sheet="sheet"
          :unit-index="unitIndex"
          :faction-slug="route.params.slug"
          :granted-keywords="grantedKeywords"
          :other-faction-units="otherFactionUnits"
          keyword-links-enabled
          @keyword-click="activeKeyword = $event"
        />
      </div>
      <p
        v-else-if="loaded"
        class="ds-missing"
      >
        {{ labels.factionsSoon }}
      </p>
    </section>

    <BaseModal
      v-if="moreOpen && sheet"
      :title="sheet.name"
      max-width="340px"
      @close="moreOpen = false"
    >
      <div class="modal-body act-list">
        <button
          class="act-btn ds-act"
          @click="moreDo(() => toggleUnitFavorite(route.params.slug, sheet.id))"
        >
          <i :class="fav ? 'bi bi-pin-angle-fill' : 'bi bi-pin-angle'" />{{ fav ? labels.dsUnpinUnit : labels.dsPinUnit }}
        </button>
        <button
          class="act-btn ds-act"
          @click="moreDo(() => toggleOwned(route.params.slug, sheet.id, sheet.name))"
        >
          <i :class="owned ? 'bi bi-star-fill' : 'bi bi-star'" />{{ owned ? labels.dsOwnRemove : labels.dsOwnAdd }}
        </button>
        <button
          class="act-btn ds-act"
          @click="moreDo(copyName)"
        >
          <i class="bi bi-clipboard" />{{ labels.dsCopyName }}
        </button>
        <button
          v-if="sheet.flavor"
          class="act-btn ds-act"
          @click="moreDo(openLoreFromSheet)"
        >
          <i class="bi bi-book" />{{ labels.loreShow }}
        </button>
        <a
          :href="imageUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="act-btn ds-act"
          @click="moreOpen = false"
        >
          <i class="bi bi-image" />{{ labels.dsSearchImage }}
        </a>
      </div>
    </BaseModal>

    <KeywordUnitsModal
      v-if="activeKeyword"
      :keyword="activeKeyword"
      :units="keywordUnits"
      :faction-slug="route.params.slug"
      @close="activeKeyword = null"
    />

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="loreOpen && sheet"
          ref="lorePopEl"
          class="ds-lore-pop"
          :style="lorePos"
          role="dialog"
          aria-modal="false"
          :aria-label="labels.loreShow"
          @click.stop
        >
          <button
            class="ds-lore-close"
            :aria-label="labels.modalClose"
            @click="closeLore"
          >
            ✕
          </button>
          <p class="ds-lore-text">
            {{ sheet.flavor }}
          </p>
        </div>
      </Transition>
    </Teleport>
  </FactionLayout>
</template>

<script setup>
import { computed, ref, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import DatasheetCard from '../../components/DatasheetCard.vue'
import BaseModal from '../../components/BaseModal.vue'
import FactionLayout from '../../components/FactionLayout.vue'
import KeywordUnitsModal from '../../components/KeywordUnitsModal.vue'
import { unitsWithKeyword } from '../../utils/keywordUnits.js'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { loadDatasheetsRu, localizeSheet } from '../../data/datasheets/ru/index.js'
import { ui } from '../../i18n/ui.js'
import { useFactionPage } from '../../composables/useFactionPage.js'
import { useFactionChoice } from '../../composables/useFactionChoice.js'
import { getDatasheetIndex } from '../../composables/useSearch.js'
import conditionalKeywords from '../../data/conditionalKeywords.json'
import { useLocale } from '../../composables/useLocale.js'
import { useFavorites } from '../../composables/useFavorites.js'
import { useCollection } from '../../composables/useCollection.js'
import { setDatasheetName } from '../../composables/useSeoMeta.js'
import { formatBaseSize } from '../../utils/baseSize.js'

const route = useRoute()
const { faction } = useFactionPage()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const fmtBase = (raw) => formatBaseSize(raw, labels.value)

const datasheets = ref([])
const loaded = ref(false)
watch(
  () => route.params.slug,
  async (s) => {
    datasheets.value = []
    loaded.value = false
    if (!s) return
    const list = await loadDatasheets(s)
    if (route.params.slug !== s) return
    if (list) datasheets.value = list
    loaded.value = true
  },
  { immediate: true },
)

// RU prose overlay (src/data/datasheets/ru/<slug>.js), lazy-loaded only in the RU locale
// and merged per-sheet by localizeSheet — until it resolves (or where no overlay exists)
// RU falls back to the EN datasheet text.
const ruModule = ref(null)
watch(
  [() => route.params.slug, locale],
  async ([s, loc]) => {
    ruModule.value = null
    if (!s || loc !== 'ru') return
    const mod = await loadDatasheetsRu(s)
    if (route.params.slug === s && locale.value === 'ru') ruModule.value = mod
  },
  { immediate: true },
)

const sheet = computed(() => {
  const en = datasheets.value.find((d) => d.id === route.params.unit) || null
  if (!en || locale.value !== 'ru') return en
  const mod = ruModule.value
  if (!mod) return en
  return localizeSheet(en, mod.default?.[en.id], mod.abilityNamesRu)
})

// Push the precise unit name into the SEO title/description (the route-level meta only has the
// slug until the datasheet loads). Unit names aren't translated, so the EN name is fine.
watch(sheet, (s) => { if (s?.name) setDatasheetName(route.path, s.name) }, { immediate: true })

// "Units with this keyword" modal (opened from DatasheetCard's Keywords line). Closed on any
// route change (not just a faction switch — also plain unit-to-unit navigation) so it can't be
// left open showing a keyword/roster that no longer matches the unit now on screen.
const activeKeyword = ref(null)
watch(() => route.fullPath, () => { activeKeyword.value = null })
const keywordUnits = computed(() => unitsWithKeyword(datasheets.value, activeKeyword.value))

// Favourite toggle (shared store with the datasheets list's "Favorites" group).
const { isUnitFavorite, toggleUnitFavorite } = useFavorites()
const fav = computed(() => !!sheet.value && isUnitFavorite(route.params.slug, sheet.value.id))

// Owned mark (shared store with the datasheets grid and the roster catalogue's star).
const { isOwned, toggleOwned } = useCollection()
const owned = computed(() => !!sheet.value && isOwned(route.params.slug, sheet.value.id))

// Name → id lookup so DatasheetCard can link Leader/Attached-unit references (e.g. the
// bodyguard units listed under a Character's "Leader" ability) to their own datasheet
// page. Always built from the EN names (unit names are never translated, see the RU
// bilingual conventions), so it's unaffected by locale/localizeSheet.
const unitIndex = computed(() => {
  const map = new Map()
  for (const d of datasheets.value) map.set(d.name, d.id)
  return map
})

// Names in sheet.leader.units that resolve to a REAL datasheet on a DIFFERENT faction's page
// (not just unresolved anywhere) — passed to DatasheetCard so it can hide them instead of
// rendering a dead name. Navigation is always within one faction's context (there's no "browse
// units across all factions" mode), and the underlying rule text is faction-agnostic — appdata
// lists every unit a Character could ever attach to, across whichever army actually fields it
// (e.g. a Chapter-agnostic "Ancient in Terminator Armour" can lead a Deathwatch Terminator Squad
// via THAT squad's own ATTACHED UNIT rule, in a Deathwatch army — never a valid target while
// building the Dark Angels army this page is showing). See datasheetIndex.js's own header for
// why this is a dynamic import (a global compact name index, same chunk the search palette uses).
const globalDsIndex = ref(null)
getDatasheetIndex().then((idx) => { globalDsIndex.value = idx })
const otherFactionUnits = computed(() => {
  const units = sheet.value?.leader?.units
  if (!units?.length || !globalDsIndex.value) return []
  const mySlug = route.params.slug
  return units.filter((u) => {
    if (unitIndex.value.has(u)) return false // already resolves on this faction's own page
    return globalDsIndex.value.some(([slug, , list]) => slug !== mySlug && list.some(([, name]) => name === u))
  })
})

// Keywords this unit gains from an army/detachment rule (conditionalKeywords.json) — merged into
// the card's keyword line. Roster-wide grants (no `det`) always apply on this faction's page;
// detachment-gated grants only while that detachment is the active pick (shared with the rules
// page via useFactionChoice, defaulting to the faction's first detachment). `detName` carries the
// active detachment's display name through to DatasheetCard so it can footnote where a gated
// grant comes from; roster-wide grants pass `detName: null` (DatasheetCard attributes those to
// "this faction's own rules" instead). `extra` passes through gen-conditional-keywords.mjs's flag
// for a grant that also depends on an un-modelled condition (currently always a Warlord
// requirement — see that script's header comment) — DatasheetCard adds a caveat to the footnote
// rather than implying the detachment/faction alone is the whole story.
const { activeDetachment } = useFactionChoice()
const grantedKeywords = computed(() => {
  const grants = conditionalKeywords[route.params.slug]?.[sheet.value?.id]
  if (!grants) return []
  const activeDet = activeDetachment(route.params.slug, faction.value?.detachments || [])
  return grants
    .filter((g) => !g.det || g.det === activeDet?.id)
    .map((g) => ({ kw: g.kw, detName: g.det ? activeDet?.name || null : null, extra: !!g.extra }))
})

// Same query Wahapedia uses for its "Search for model's image on the Internet" icon.
const imageUrl = computed(() => {
  const q = encodeURIComponent(`Warhammer 40000 ${faction.value?.name ?? ''} ${sheet.value?.name ?? ''}`.trim())
  return `https://www.google.com/search?tbm=isch&q=${q}%20miniature`
})

// Lore lives in an anchored popover opened by the book button (not in the card).
// Anchored/fixed popover recipe mirrors KeywordPopover.vue: capture the trigger rect at
// open time, position `fixed`, and dismiss on scroll/resize since it can't follow the page.
const loreOpen = ref(false)
const loreAnchor = ref(null)
const loreBtn = ref(null)
const lorePopEl = ref(null)

function toggleLorePopover(e) {
  if (loreOpen.value) { closeLore(); return }
  loreAnchor.value = e.currentTarget.getBoundingClientRect()
  loreOpen.value = true
}
function closeLore() { loreOpen.value = false }

// The phone-width "…" sheet. Every action closes the sheet first; the lore popover is then
// anchored to the "…" button itself — the book button it usually hangs off is display:none at
// that width — and opened on the next tick, after the sheet's own click has finished bubbling
// (the document click that dismisses the popover is attached while that click is still in flight).
const moreOpen = ref(false)
const moreBtn = ref(null)
function moreDo(fn) { moreOpen.value = false; fn() }
function openLoreFromSheet() {
  const rect = moreBtn.value?.getBoundingClientRect()
  setTimeout(() => { loreAnchor.value = rect || null; loreOpen.value = true }, 0)
}

function dismissOnMove() { if (loreOpen.value) closeLore() }
function onKeydown(e) { if (e.key === 'Escape') closeLore() }
function onDocClick(e) {
  if (lorePopEl.value?.contains(e.target) || loreBtn.value?.contains(e.target) || moreBtn.value?.contains(e.target)) return
  closeLore()
}

watch(loreOpen, (open) => {
  if (open) {
    window.addEventListener('scroll', dismissOnMove, { capture: true, passive: true })
    window.addEventListener('resize', dismissOnMove, { passive: true })
    document.addEventListener('keydown', onKeydown)
    document.addEventListener('click', onDocClick)
  } else {
    window.removeEventListener('scroll', dismissOnMove, { capture: true })
    window.removeEventListener('resize', dismissOnMove)
    document.removeEventListener('keydown', onKeydown)
    document.removeEventListener('click', onDocClick)
  }
})
onUnmounted(() => {
  window.removeEventListener('scroll', dismissOnMove, { capture: true })
  window.removeEventListener('resize', dismissOnMove)
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('click', onDocClick)
})

const lorePos = computed(() => {
  const r = loreAnchor.value
  if (!r) return {}
  const vw = window.innerWidth
  const vh = window.innerHeight
  const popW = Math.min(340, vw - 16)
  const spaceBelow = vh - r.bottom
  const left = Math.max(8, Math.min(r.right - popW, vw - popW - 8))
  const style = { width: popW + 'px', left: left + 'px' }
  if (spaceBelow < 200 && r.top > spaceBelow) {
    style.bottom = (vh - r.top + 8) + 'px'
  } else {
    style.top = (r.bottom + 8) + 'px'
  }
  return style
})

const copied = ref(false)
let copyTimer = null
async function copyName() {
  if (!sheet.value) return
  try {
    await navigator.clipboard.writeText(sheet.value.name)
    copied.value = true
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => (copied.value = false), 1500)
  } catch {
    /* clipboard unavailable (permissions / insecure context) — leave the icon as is */
  }
}
</script>

<style scoped>

/* Datasheet header band: the name row is a solid faction-color plate (same visual
   language as the weapon-table headers in DatasheetCard — --ds-th-bg is the accent in
   light theme and the faction's dark variant in dark theme, where the plain accent is
   too light to carry white text). It sits flush on top of the card (radius 0 0 6 6). */
.ds-head {
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 0.3rem 0.8rem;
  margin-bottom: 0;
  padding: 0.5rem 1rem 0.45rem;
  background: var(--ds-th-bg, var(--accent));
  --ds-th-bg: var(--accent);
}
@media (prefers-color-scheme: dark) {
  .ds-head { --ds-th-bg: var(--fa-light, color-mix(in srgb, var(--accent) 55%, black)); }
}
:root[data-theme='light'] .ds-head { --ds-th-bg: var(--accent); }
:root[data-theme='dark'] .ds-head { --ds-th-bg: var(--fa-light, color-mix(in srgb, var(--accent) 55%, black)); }

.ds-title {
  flex: 1 1 auto;
  min-width: 0;
  overflow-wrap: break-word;
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: #fff;
  margin: 0;
}
/* Single-model base size (⌀50mm) to the right of the unit name on the header plate. */

.ds-title-base {
  display: inline;
  margin-left: 0.45rem;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.82);
}

.ds-actions {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  margin-left: auto;
  align-self: center;
  flex-shrink: 0;
}

.ds-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  min-height: 36px;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: background var(--motion-fast), color var(--motion-fast), border-color var(--motion-fast);
}

.ds-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border-color: #fff;
  text-decoration: none;
}

.ds-btn.copied {
  color: #fff;
  border-color: #fff;
  background: rgba(255, 255, 255, 0.18);
}

/* Pin toggle deliberately skips the .copied border/background treatment shared by the
   other action buttons — pinned state is signalled only by the outline→filled icon swap
   (see the template) plus going fully opaque, no colored highlight. */
.ds-btn-pin-on {
  color: #fff;
}

/* Anchored lore popover (teleported to body — scoped styles still apply to it). */
.ds-lore-pop {
  position: fixed;
  z-index: 500;
  background: var(--bg-insert);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.55);
  padding: 0.75rem 2.1rem 0.8rem 0.9rem;
}

.ds-lore-close {
  position: absolute;
  top: 0.5rem;
  right: 0.6rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  font-size: 0.85rem;
  line-height: 1;
  padding: 0;
  transition: color var(--motion-fast);
}

.ds-lore-close:hover {
  color: #fff;
}

.ds-lore-text {
  margin: 0;
  font-style: italic;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--text-on-dark);
}

.ds-missing {
  color: var(--text-muted);
  font-size: 1rem;
}

@media (max-width: 640px) {
  .ds-title { font-size: 1.5rem; }
}

.ds-page { container: dspage / inline-size; }

/* Very narrow phones (≤480px of CONTAINER, the same measure DatasheetCard's own bleed keys on):
   bleed the name plate past .main-content's gutter to the true viewport edge and square its top
   corners, matching .ds-card below it (same 100vw trick as FactionPickerBar's .fpb) — the two
   read as one flush, edge-to-edge header instead of a floating card. Horizontal padding drops to
   .ds-card's own 0.4rem so both line up, and the action buttons shrink to leave the (often long)
   unit name more room. */
/* The "…" exists only where the buttons fold (below); a same-specificity rule inside the container
   block has to come AFTER this one to win. */
.ds-more { display: none; }
@container dspage (max-width: 480px) {
  .ds-head {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    padding: 0.5rem 0.4rem 0.45rem;
  }
  .ds-btn {
    min-width: 30px;
    min-height: 30px;
    font-size: 0.85rem;
  }
  /* Five buttons become one: the row is the name's, not the toolbar's. */
  .ds-actions > .ds-btn:not(.ds-more) { display: none; }
  .ds-more { display: flex; min-width: 36px; min-height: 36px; font-size: 1rem; }
  /* …and the name takes the room back. Measured 2026-09-19 against the longest names in the data
     ("Ironkin Steeljacks with Heavy Volkanite Disintegrators", 54 chars): at 360–430px, 1.75rem
     wraps them to the same two lines 1.5rem did, ten pixels taller; a 25-char name ("Chaos Lord
     with Jump Pack", the 90th percentile) stays on one line. Only a 320px screen needs a step
     down to keep the longest at two lines. */
  .ds-title { font-size: 1.75rem; }
}
@container dspage (max-width: 340px) {
  .ds-title { font-size: 1.6rem; }
}
/* The sheet's rows carry the same icon the toolbar button did, so the two read as one thing. */
.ds-act { display: flex; align-items: center; gap: 0.6rem; text-decoration: none; }
.ds-act .bi { width: 1.1rem; text-align: center; color: var(--text-muted); }
/* Cancel FactionLayout's .faction-view top padding (0.5rem) so the full-bleed card sits flush
   under the subnav, with no gap above the name plate. .fsection is the container's parent and
   cannot be queried from inside it; a viewport query is close enough for half a rem. */
@media (max-width: 480px) {
  .fsection {
    margin-top: -0.5rem;
  }
}
</style>

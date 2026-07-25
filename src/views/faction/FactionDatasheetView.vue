<template>
  <FactionLayout :hero="false">
    <section class="fsection">
      <template v-if="sheet">
        <div class="ds-head">
          <h2 class="ds-title">{{ sheet.name }}<span v-if="sheet.baseSize" class="ds-title-base">({{ fmtBase(sheet.baseSize) }})</span></h2>
          <div class="ds-actions">
            <button
              type="button"
              class="ds-btn"
              :class="{ 'ds-btn-pin-on': fav }"
              :title="fav ? labels.dsFavRemove : labels.dsFavAdd"
              :aria-label="fav ? labels.dsFavRemove : labels.dsFavAdd"
              :aria-pressed="fav"
              @click="toggleUnitFavorite(route.params.slug, sheet.id)"
            >
              <i :class="fav ? 'bi bi-pin-angle-fill' : 'bi bi-pin-angle'"></i>
            </button>
            <button
              type="button"
              class="ds-btn"
              :class="{ copied }"
              :title="copied ? labels.dsCopied : labels.dsCopyName"
              :aria-label="copied ? labels.dsCopied : labels.dsCopyName"
              @click="copyName"
            >
              <i :class="copied ? 'bi bi-check2' : 'bi bi-clipboard'"></i>
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
              <i :class="loreOpen ? 'bi bi-book-fill' : 'bi bi-book'"></i>
            </button>
            <a
              :href="imageUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="ds-btn"
              :title="labels.dsSearchImage"
              :aria-label="labels.dsSearchImage"
            >
              <i class="bi bi-image"></i>
            </a>
          </div>
        </div>
        <DatasheetCard :sheet="sheet" :unit-index="unitIndex" :faction-slug="route.params.slug" :granted-keywords="grantedKeywords" />
      </template>
      <p v-else-if="loaded" class="ds-missing">{{ labels.factionsSoon }}</p>
    </section>

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
          <button class="ds-lore-close" :aria-label="labels.modalClose" @click="closeLore">✕</button>
          <p class="ds-lore-text">{{ sheet.flavor }}</p>
        </div>
      </Transition>
    </Teleport>
  </FactionLayout>
</template>

<script setup>
import { computed, ref, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import DatasheetCard from '../../components/DatasheetCard.vue'
import FactionLayout from '../../components/FactionLayout.vue'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { loadDatasheetsRu, localizeSheet } from '../../data/datasheets/ru/index.js'
import { ui } from '../../i18n/ui.js'
import { useFactionPage } from '../../composables/useFactionPage.js'
import { useFactionChoice } from '../../composables/useFactionChoice.js'
import conditionalKeywords from '../../data/conditionalKeywords.json'
import { useLocale } from '../../composables/useLocale.js'
import { useFavorites } from '../../composables/useFavorites.js'
import { setDatasheetName } from '../../composables/useSeoMeta.js'
import { formatBaseSize } from '../../utils/baseSize.js'

const route = useRoute()
const { slug, faction } = useFactionPage()
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

// Favourite toggle (shared store with the datasheets list's "Favorites" group).
const { isUnitFavorite, toggleUnitFavorite } = useFavorites()
const fav = computed(() => !!sheet.value && isUnitFavorite(route.params.slug, sheet.value.id))

// Name → id lookup so DatasheetCard can link Leader/Attached-unit references (e.g. the
// bodyguard units listed under a Character's "Leader" ability) to their own datasheet
// page. Always built from the EN names (unit names are never translated, see the RU
// bilingual conventions), so it's unaffected by locale/localizeSheet.
const unitIndex = computed(() => {
  const map = new Map()
  for (const d of datasheets.value) map.set(d.name, d.id)
  return map
})

// Keywords this unit gains from an army/detachment rule (conditionalKeywords.json) — merged into
// the card's keyword line. Roster-wide grants (no `det`) always apply on this faction's page;
// detachment-gated grants only while that detachment is the active pick (shared with the rules
// page via useFactionChoice, defaulting to the faction's first detachment).
const { activeDetachment } = useFactionChoice()
const grantedKeywords = computed(() => {
  const grants = conditionalKeywords[route.params.slug]?.[sheet.value?.id]
  if (!grants) return []
  const activeDet = activeDetachment(route.params.slug, faction.value?.detachments || [])?.id
  return grants.filter((g) => !g.det || g.det === activeDet).map((g) => g.kw)
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

function dismissOnMove() { if (loreOpen.value) closeLore() }
function onKeydown(e) { if (e.key === 'Escape') closeLore() }
function onDocClick(e) {
  if (lorePopEl.value?.contains(e.target) || loreBtn.value?.contains(e.target)) return
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
.fsection {
  margin-bottom: 2.5rem;
  scroll-margin-top: var(--header-total);
}

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
  border-radius: 6px 6px 0 0;
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
  border-radius: 4px;
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
  border-radius: 6px;
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

/* Very narrow phones (≤480px): bleed the name plate past .main-content's gutter to the
   true viewport edge and square its top corners, matching DatasheetCard's .ds-card below
   it (same 100vw trick as FactionPickerBar's .fpb) — the two read as one flush, edge-to-edge
   header instead of a floating card. Horizontal padding drops to .ds-card's own 0.4rem so
   both line up, and the action buttons shrink to leave the (often long) unit name more room. */
@media (max-width: 480px) {
  /* Cancel FactionLayout's .faction-view top padding (0.5rem) so the full-bleed card sits
     flush under the subnav, with no gap above the name plate — matching the edge-to-edge
     treatment on the sides. */
  .fsection {
    margin-top: -0.5rem;
  }
  .ds-head {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    padding: 0.5rem 0.4rem 0.45rem;
    border-radius: 0;
  }
  .ds-btn {
    min-width: 30px;
    min-height: 30px;
    font-size: 0.85rem;
  }
}
</style>

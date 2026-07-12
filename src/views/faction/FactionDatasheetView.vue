<template>
  <FactionLayout :hero="false">
    <section class="fsection">
      <template v-if="sheet">
        <div class="ds-head">
          <h2 class="ds-title">{{ sheet.name }}</h2>
          <span v-if="sheet.points" class="ds-pts">{{ ptsSummary(sheet.points) }}</span>
          <div class="ds-actions">
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
        <DatasheetCard :sheet="sheet" />
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
import { loadDatasheets, ptsSummary } from '../../data/datasheets/index.js'
import { loadDatasheetsRu, localizeSheet } from '../../data/datasheets/ru/index.js'
import { ui } from '../../i18n/ui.js'
import { useFactionPage } from '../../composables/useFactionPage.js'
import { useLocale } from '../../composables/useLocale.js'

const route = useRoute()
const { slug, faction } = useFactionPage()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

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

.ds-head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.3rem 0.8rem;
  margin-bottom: 0.7rem;
}

.ds-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-primary);
  margin: 0;
}

.ds-pts {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
  white-space: nowrap;
}

.ds-actions {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  margin-left: auto;
  align-self: center;
}

.ds-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  min-height: 36px;
  background: none;
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-muted);
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: background var(--motion-fast), color var(--motion-fast), border-color var(--motion-fast);
}

.ds-btn:hover {
  background: color-mix(in srgb, var(--text-primary) 8%, transparent);
  color: var(--text-primary);
  border-color: var(--accent);
  text-decoration: none;
}

.ds-btn.copied {
  color: var(--accent);
  border-color: var(--accent);
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
</style>

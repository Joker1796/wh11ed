<template>
  <FactionLayout>
    <section class="fsection">
      <RouterLink :to="`/factions/${slug}/datasheets`" class="ds-back">← {{ labels.factionDatasheets }}</RouterLink>

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
              type="button"
              class="ds-btn"
              :class="{ copied: showLore }"
              :title="showLore ? labels.loreHide : labels.loreShow"
              :aria-label="showLore ? labels.loreHide : labels.loreShow"
              :aria-pressed="showLore"
              @click="showLore = !showLore"
            >
              <i :class="showLore ? 'bi bi-book-fill' : 'bi bi-book'"></i>
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
        <DatasheetCard :sheet="sheet" :show-flavor="showLore" />
      </template>
      <p v-else-if="loaded" class="ds-missing">{{ labels.factionsSoon }}</p>
    </section>
  </FactionLayout>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import DatasheetCard from '../../components/DatasheetCard.vue'
import FactionLayout from '../../components/FactionLayout.vue'
import { loadDatasheets, ptsSummary } from '../../data/datasheets/index.js'
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

const sheet = computed(() => datasheets.value.find((d) => d.id === route.params.unit) || null)

// Same query Wahapedia uses for its "Search for model's image on the Internet" icon.
const imageUrl = computed(() => {
  const q = encodeURIComponent(`Warhammer 40000 ${faction.value?.name ?? ''} ${sheet.value?.name ?? ''}`.trim())
  return `https://www.google.com/search?tbm=isch&q=${q}%20miniature`
})

// Lore hidden by default; the book icon reveals it (the app-wide "Hide lore"
// toggle still wins — data-hide-lore hides .ds-flavor regardless).
const showLore = ref(false)

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

.ds-back {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: 0.7rem;
}

.ds-back:hover {
  color: var(--accent);
  text-decoration: none;
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

.ds-missing {
  color: var(--text-muted);
  font-size: 1rem;
}

@media (max-width: 640px) {
  .ds-title { font-size: 1.5rem; }
}
</style>

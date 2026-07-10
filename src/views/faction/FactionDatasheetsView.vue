<template>
  <FactionLayout>
    <!-- Datasheets (lazy-loaded per faction from src/data/datasheets/<slug>.js) -->
    <section class="fsection" id="datasheets">
      <h2 class="fsection-title">{{ labels.factionDatasheets }}</h2>
      <template v-if="datasheets.length">
        <input
          v-model="dsQuery"
          type="search"
          class="ds-search"
          :placeholder="labels.dsSearch"
          :aria-label="labels.dsSearch"
        />
        <template v-for="g in groupedDatasheets" :key="g.key">
          <h3 class="ds-group-head">{{ g.label }}</h3>
          <div class="ds-grid">
            <button v-for="s in g.sheets" :key="s.id" type="button" class="ds-chip" @click="openSheet = s">
              <span class="ds-chip-name">{{ s.name }}</span>
              <span v-if="s.points" class="ds-chip-pts">{{ ptsSummary(s.points) }}</span>
            </button>
          </div>
        </template>

        <DatasheetModal
          v-if="openSheet"
          :sheet="openSheet"
          :faction-name="faction?.name"
          @close="openSheet = null"
        />
      </template>
      <p v-else-if="loaded" class="ds-empty">{{ labels.factionsSoon }}</p>
    </section>
  </FactionLayout>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import DatasheetModal from '../../components/DatasheetModal.vue'
import FactionLayout from '../../components/FactionLayout.vue'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { ui } from '../../i18n/ui.js'
import { useFactionPage } from '../../composables/useFactionPage.js'
import { useLocale } from '../../composables/useLocale.js'

const route = useRoute()
const { faction } = useFactionPage()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Datasheets are lazy-loaded per faction (each src/data/datasheets/<slug>.js is its own
// chunk) so the heavy unit data never rides in the shared view bundle.
const datasheets = ref([])
const loaded = ref(false)
const dsQuery = ref('')
// The sheet currently open in the DatasheetModal (null = closed). The list keeps its
// search text and scroll position while the modal is up — that was the accordion's flaw.
const openSheet = ref(null)
watch(
  () => route.params.slug,
  async (slug) => {
    datasheets.value = []
    loaded.value = false
    dsQuery.value = ''
    openSheet.value = null
    if (!slug) return
    const list = await loadDatasheets(slug)
    // guard against a stale resolve after a rapid route change
    if (route.params.slug !== slug) return
    if (list) datasheets.value = list
    loaded.value = true
  },
  { immediate: true },
)

const filteredDatasheets = computed(() => {
  const q = dsQuery.value.trim().toLowerCase()
  if (!q) return datasheets.value
  return datasheets.value.filter((s) => s.name.toLowerCase().includes(q))
})

// Codex-style type groups, in roster-building order. A sheet lands in the first group
// whose keyword it carries (Epic Heroes are also CHARACTER, so precedence matters).
const TYPE_GROUPS = [
  { key: 'epic',       kw: 'Epic Hero',           label: 'dsGroupEpicHeroes' },
  { key: 'character',  kw: 'Character',           label: 'dsGroupCharacters' },
  { key: 'battleline', kw: 'Battleline',          label: 'dsGroupBattleline' },
  { key: 'transport',  kw: 'Dedicated Transport', label: 'dsGroupTransports' },
  { key: 'other',      kw: null,                  label: 'dsGroupOther' },
]

const groupedDatasheets = computed(() => {
  const l = labels.value
  const buckets = TYPE_GROUPS.map((g) => ({ key: g.key, kw: g.kw, label: l[g.label], sheets: [] }))
  for (const s of filteredDatasheets.value) {
    buckets.find((b) => !b.kw || (s.keywords || []).includes(b.kw)).sheets.push(s)
  }
  return buckets.filter((b) => b.sheets.length)
})

// Compact points summary for the accordion toggle; the full sizes × copy-tiers
// breakdown lives in the card's points table (DatasheetCard).
function ptsSummary(points) {
  const vals = points.map((p) => p.points)
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  if (min !== max) return `${min}–${max} pts`
  const models = points[0].models
  return (models > 1 ? `${models}× ` : '') + `${min} pts`
}
</script>

<style scoped>
.fsection {
  margin-bottom: 2.5rem;
  scroll-margin-top: var(--header-total);
}

.fsection-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
}

.ds-search {
  width: 100%;
  max-width: 24rem;
  padding: 0.5rem 0.7rem;
  font-size: 0.9rem;
  color: var(--text-primary);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  margin-bottom: 0.9rem;
}

.ds-search:focus {
  outline: none;
  border-color: var(--accent);
}

.ds-group-head {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--accent);
  margin: 1.4rem 0 0.6rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--border);
}

.ds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.5rem;
}

.ds-chip {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  text-align: left;
  padding: 0.5rem 0.7rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  transition: background var(--motion-fast), border-color var(--motion-fast);
}

.ds-chip:hover {
  background: color-mix(in srgb, var(--accent) 8%, var(--bg-card));
  border-color: var(--accent);
}

.ds-chip-name {
  font-family: var(--font-display);
  font-size: 1.05rem;
  line-height: 1.15;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-primary);
}

.ds-chip-pts {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--text-muted);
  white-space: nowrap;
}

.ds-empty {
  color: var(--text-muted);
  font-size: 1rem;
}

@media (max-width: 640px) {
  .fsection-title { font-size: 1.6rem; }
}
</style>

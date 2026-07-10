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
        <div class="ds-accordion">
          <div v-for="s in filteredDatasheets" :key="s.id" class="ds-item">
            <button type="button" class="ds-toggle" :aria-expanded="openDs === s.id" @click="toggleDs(s.id)">
              <span class="ds-toggle-name">{{ s.name }}</span>
              <span v-if="s.points" class="ds-toggle-pts">
                {{ s.points.map((p) => (p.models ? p.models + '× ' : '') + p.points + ' pts').join(' · ') }}
              </span>
              <span class="ds-toggle-chevron" :class="{ open: openDs === s.id }">▾</span>
            </button>
            <CollapseTransition :show="openDs === s.id">
              <DatasheetCard :sheet="s" />
            </CollapseTransition>
          </div>
        </div>
      </template>
      <p v-else-if="loaded" class="ds-empty">{{ labels.factionsSoon }}</p>
    </section>
  </FactionLayout>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import CollapseTransition from '../../components/CollapseTransition.vue'
import DatasheetCard from '../../components/DatasheetCard.vue'
import FactionLayout from '../../components/FactionLayout.vue'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const route = useRoute()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Datasheets are lazy-loaded per faction (each src/data/datasheets/<slug>.js is its own
// chunk) so the heavy unit data never rides in the shared view bundle.
const datasheets = ref([])
const loaded = ref(false)
const dsQuery = ref('')
const openDs = ref(null)
watch(
  () => route.params.slug,
  async (slug) => {
    datasheets.value = []
    loaded.value = false
    dsQuery.value = ''
    openDs.value = null
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

function toggleDs(id) {
  openDs.value = openDs.value === id ? null : id
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

.ds-accordion {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.ds-item {
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
}

.ds-toggle {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  width: 100%;
  text-align: left;
  padding: 0.55rem 0.9rem;
  background: var(--bg-card);
  border: none;
  cursor: pointer;
  transition: background var(--motion-fast);
}

.ds-toggle:hover { background: color-mix(in srgb, var(--accent) 8%, var(--bg-card)); }

.ds-toggle-name {
  font-family: var(--font-display);
  font-size: 1.15rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-primary);
}

.ds-toggle-pts {
  margin-left: auto;
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-muted);
  white-space: nowrap;
}

.ds-toggle-chevron {
  flex-shrink: 0;
  color: var(--text-muted);
  transition: transform var(--motion-fast);
}

.ds-toggle-chevron.open { transform: rotate(180deg); }

.ds-empty {
  color: var(--text-muted);
  font-size: 1rem;
}

@media (max-width: 640px) {
  .fsection-title { font-size: 1.6rem; }
}
</style>

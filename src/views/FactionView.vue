<template>
  <div v-if="faction" class="faction-view">
    <div class="hero">
      <RouterLink to="/factions" class="back-link">← {{ labels.factionsBack }}</RouterLink>
      <h1 class="hero-title">{{ faction.name }}</h1>
    </div>

    <!-- Army Rule -->
    <section class="fsection" id="army-rule">
      <h2 class="fsection-title">{{ labels.factionArmyRule }}</h2>
      <p v-if="faction.armyRule.flavor" class="faction-flavor">{{ faction.armyRule.flavor }}</p>
      <RuleBlock
        :id="faction.armyRule.id"
        :title="faction.armyRule.name"
        :body="faction.armyRule.body"
        :example="faction.armyRule.example"
      />
    </section>

    <!-- Detachments -->
    <section class="fsection" id="detachments">
      <div class="fsection-eyebrow">{{ labels.factionDetachment }}</div>

      <!-- Detachment picker -->
      <div v-if="detachments.length > 1" class="det-picker" role="tablist">
        <button
          v-for="d in detachments"
          :key="d.id"
          type="button"
          role="tab"
          class="det-chip"
          :class="{ active: d.id === activeId }"
          :aria-selected="d.id === activeId"
          @click="activeId = d.id"
        >
          {{ d.name }}
        </button>
      </div>
    </section>

    <section v-if="det" class="fsection" :id="det.id" :key="det.id">
      <h2 class="fsection-title">{{ det.name }}</h2>

      <div v-if="det.dp || det.forceDisposition || det.unique" class="det-meta">
        <span v-if="det.dp" class="det-meta-item">{{ det.dp }} DP</span>
        <span v-if="det.forceDisposition" class="det-meta-item">{{ det.forceDisposition }}</span>
        <span v-if="det.unique" class="det-meta-item det-meta-unique">Unique: {{ det.unique }}</span>
      </div>

      <p v-if="det.rule.flavor" class="faction-flavor">{{ det.rule.flavor }}</p>
      <RuleBlock :title="det.rule.name" :body="det.rule.body" />

      <!-- Stratagems -->
      <template v-if="det.stratagems && det.stratagems.length">
        <h3 class="fsub-title" id="stratagems">{{ labels.factionStratagems }}</h3>
        <div class="strat-grid">
          <StratCard
            v-for="s in det.stratagems"
            :key="s.name"
            :strat="s"
            :sublabel="s.sublabel"
          />
        </div>
      </template>

      <!-- Enhancements -->
      <h3 class="fsub-title" id="enhancements">{{ labels.factionEnhancements }}</h3>
      <div class="enh-grid">
        <article v-for="e in det.enhancements" :key="e.name" class="enh-card">
          <div class="enh-head">
            <span class="enh-name">{{ e.name }}</span>
            <span v-if="e.aura" class="enh-tag">{{ labels.factionAura }}</span>
            <span v-if="e.upgrade" class="enh-tag">Upgrade</span>
            <span v-if="e.points != null" class="enh-pts">{{ e.points }} pts</span>
          </div>
          <p v-if="e.flavor" class="faction-flavor">{{ e.flavor }}</p>
          <div class="enh-body" v-html="renderInline(e.body)"></div>
          <div v-if="e.note" class="enh-note" v-html="renderInline(e.note)"></div>
        </article>
      </div>
    </section>

    <!-- Datasheets (lazy-loaded per faction from src/data/datasheets/<slug>.js) -->
    <section v-if="datasheets.length" class="fsection" id="datasheets">
      <h2 class="fsection-title">{{ labels.factionDatasheets }}</h2>
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
    </section>
  </div>

  <div v-else class="faction-view">
    <div class="hero">
      <RouterLink to="/factions" class="back-link">← {{ labels.factionsBack }}</RouterLink>
      <h1 class="hero-title">{{ labels.factionsHeading }}</h1>
    </div>
    <p class="fsoon">{{ labels.factionsSoon }}</p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import CollapseTransition from '../components/CollapseTransition.vue'
import DatasheetCard from '../components/DatasheetCard.vue'
import RuleBlock from '../components/RuleBlock.vue'
import StratCard from '../components/StratCard.vue'
import { loadDatasheets } from '../data/datasheets/index.js'
import { getFaction } from '../data/factions/index.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useRenderInline } from '../composables/useRenderInline.js'

const route = useRoute()
const { locale } = useLocale()
const { renderInline } = useRenderInline()
const labels = computed(() => ui[locale.value])

// Datasheets are lazy-loaded per faction (each src/data/datasheets/<slug>.js is its own
// chunk) so the heavy unit data never rides in the shared FactionView bundle.
const datasheets = ref([])
const dsQuery = ref('')
const openDs = ref(null)
watch(
  () => route.params.slug,
  async (slug) => {
    datasheets.value = []
    dsQuery.value = ''
    openDs.value = null
    if (!slug) return
    const list = await loadDatasheets(slug)
    // guard against a stale resolve after a rapid route change
    if (route.params.slug === slug && list) datasheets.value = list
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

// EN-first: data.ru currently reuses data.en. Resolve the localized object when RU diverges.
const faction = computed(() => {
  const data = getFaction(route.params.slug)
  return data ? (locale.value === 'ru' ? data.ru : data.en) : null
})
// Detachments: support the multi-detachment `detachments[]` shape, falling back to the
// legacy single `detachment` object. A chip picker selects the active one.
const detachments = computed(() => {
  const f = faction.value
  if (!f) return []
  if (Array.isArray(f.detachments)) return f.detachments
  return f.detachment ? [f.detachment] : []
})

const activeId = ref(detachments.value[0]?.id)

// Keep a valid selection when the faction (route) changes.
watch(
  detachments,
  (list) => {
    if (!list.some((d) => d.id === activeId.value)) activeId.value = list[0]?.id
  },
  { immediate: true },
)

const det = computed(() => detachments.value.find((d) => d.id === activeId.value) || detachments.value[0] || null)
</script>

<style scoped>
.faction-view {
  padding-top: 0.5rem;
}

.hero {
  padding: 0.5rem 0 0.9rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.5rem;
}

.back-link {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: 0.6rem;
}

.back-link:hover {
  color: var(--accent);
  text-decoration: none;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1;
}

.fsection {
  margin-bottom: 2.5rem;
  scroll-margin-top: var(--header-total);
}

.fsection-eyebrow {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--accent);
  margin-bottom: 0.1rem;
}

/* Detachment picker */
.det-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.5rem;
}

.det-chip {
  font-family: var(--font-display);
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-muted);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.35rem 0.7rem;
  cursor: pointer;
  transition: color var(--motion-fast), border-color var(--motion-fast), background var(--motion-fast);
}

.det-chip:hover {
  color: var(--text-primary);
  border-color: var(--accent);
}

.det-chip.active {
  color: #fff;
  background: var(--accent);
  border-color: var(--accent);
}

/* Detachment meta (DP / disposition / unique) */
.det-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.9rem;
}

.det-meta-item {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--text-muted);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 2px 7px;
}

.det-meta-unique {
  color: var(--accent);
  border-color: var(--accent);
}

.fsection-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
}

.fsub-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text-primary);
  margin: 1.8rem 0 0.9rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid var(--border);
  scroll-margin-top: var(--header-total);
}

.faction-flavor {
  font-style: italic;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.strat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  align-items: start;
}

.enh-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  align-items: start;
}

.enh-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  border-radius: 0 0 6px 6px;
  padding: 0.9rem 1.1rem 1rem;
}

.enh-head {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.enh-name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-primary);
}

.enh-tag {
  font-size: 0.58rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 3px;
  padding: 1px 5px;
}

.enh-pts {
  margin-left: auto;
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-muted);
}

.enh-body {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-primary);
}

.enh-note {
  margin-top: 0.6rem;
  padding: 0.5rem 0.7rem;
  background: color-mix(in srgb, var(--accent) 7%, transparent);
  border-left: 3px solid var(--accent);
  border-radius: 0 4px 4px 0;
  font-size: 0.82rem;
  font-style: italic;
  line-height: 1.45;
  color: var(--text-muted);
}

/* Datasheets */
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

.fsoon {
  color: var(--text-muted);
  font-size: 1rem;
}

@media (max-width: 640px) {
  .hero-title { font-size: 2.2rem; }
  .fsection-title { font-size: 1.6rem; }
}
</style>

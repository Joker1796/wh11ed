<template>
  <div>
    <!-- Army Rule -->
    <div class="army-rule-block">
      <div class="army-rule-header">
        <span class="army-rule-badge">{{ labels.armyRuleLabel }}</span>
        <span class="army-rule-name">{{ orks.armyRule.name }}</span>
      </div>
      <div class="army-rule-body"><RuleBody :body="orks.armyRule.text" /></div>
    </div>

    <!-- Detachment filter -->
    <div class="det-filter-bar">
      <div class="det-select-wrap" :class="{ open: filterOpen }" @click.stop>
        <button class="det-select-btn" @click="filterOpen = !filterOpen">
          <span>{{ selectedDetLabel }}</span>
          <svg class="det-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 4.5l3.5 3.5 3.5-3.5" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="det-dropdown" v-if="filterOpen">
          <button
            class="det-dropdown-item"
            :class="{ active: selectedDet === null }"
            @click="selectDet(null)"
          >All</button>
          <button
            v-for="det in orks.detachments"
            :key="det.id"
            class="det-dropdown-item"
            :class="{ active: selectedDet === det.id }"
            @click="selectDet(det.id)"
          >{{ det.name }}</button>
        </div>
      </div>
    </div>

    <!-- Table of Contents -->
    <div class="faction-toc">
      <h2 class="faction-toc-title">Detachments</h2>
      <div class="faction-toc-grid">
        <a
          v-for="det in filteredDetachments"
          :key="det.id"
          :href="`#detachment-${det.id}`"
          class="faction-toc-item"
          @click.prevent="scrollToDetachment(det.id)"
        >
          <span class="faction-toc-name">{{ det.name }}</span>
          <span class="faction-toc-source" :class="`src-${det.source}`">{{ det.source }}</span>
        </a>
      </div>
    </div>

    <!-- Detachments -->
    <template v-for="det in filteredDetachments" :key="det.id">
      <div :id="`detachment-${det.id}`" class="detachment-section">
        <div class="detachment-title-row">
          <h2 class="detachment-title">{{ det.name }}</h2>
          <span class="detachment-source-badge" :class="`src-${det.source}`">{{ det.source }}</span>
        </div>

        <DetachmentBlock :rule="det.rule" :description="det.description" :unique="det.unique" />

        <!-- Enhancements -->
        <div class="subsection-header">
          <span class="subsection-label">{{ labels.enhancementsLabel }}</span>
        </div>
        <div class="enhancements-grid">
          <EnhancementCard
            v-for="enh in det.enhancements"
            :key="enh.name"
            :enhancement="enh"
          />
        </div>

        <!-- Stratagems -->
        <div class="subsection-header">
          <span class="subsection-label">{{ labels.strategemsLabel }}</span>
        </div>
        <div class="strat-grid">
          <StratCard
            v-for="strat in det.stratagems"
            :key="strat.name"
            :strat="strat"
            :sublabel="`${det.name} — ${strat.type}`"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { orks } from '../../data/factions/orks.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import DetachmentBlock from '../../components/DetachmentBlock.vue'
import EnhancementCard from '../../components/EnhancementCard.vue'
import StratCard from '../../components/StratCard.vue'
import RuleBody from '../../components/RuleBody.vue'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const selectedDet = ref(null)
const filterOpen = ref(false)

const filteredDetachments = computed(() =>
  selectedDet.value
    ? orks.detachments.filter(d => d.id === selectedDet.value)
    : orks.detachments
)

const selectedDetLabel = computed(() =>
  selectedDet.value
    ? orks.detachments.find(d => d.id === selectedDet.value)?.name
    : 'All Detachments'
)

function selectDet(id) {
  selectedDet.value = id
  filterOpen.value = false
}

function onDocClick() {
  filterOpen.value = false
}

onMounted(() => document.addEventListener('click', onDocClick))
onUnmounted(() => document.removeEventListener('click', onDocClick))

function scrollToDetachment(id) {
  const el = document.getElementById(`detachment-${id}`)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 96 - 40
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* ── Army Rule ── */
.army-rule-block {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.army-rule-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  background: #1c1c1e;
  color: #fff;
}

.army-rule-badge {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 0.15rem 0.4rem;
  border-radius: 2px;
  flex-shrink: 0;
}

.army-rule-name {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #f0c040;
}

.army-rule-body {
  padding: 0.9rem 1rem;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--text-primary);
}

/* ── Detachment filter bar ── */
.det-filter-bar {
  position: sticky;
  top: calc(var(--navbar-height) + var(--subnav-height));
  z-index: 100;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border);
  padding: 0.5rem 2rem;
  margin: 0 -2rem 1.75rem;
}

.det-select-wrap {
  position: relative;
  display: inline-block;
}

.det-select-btn {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.75rem;
  min-height: 34px;
  border-radius: 5px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 0.83rem;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: border-color 0.12s;
}

.det-select-btn:hover,
.det-select-wrap.open .det-select-btn {
  border-color: var(--accent);
}

.det-chevron {
  flex-shrink: 0;
  color: var(--text-dim);
  transition: transform 0.18s ease;
}

.det-select-wrap.open .det-chevron {
  transform: rotate(180deg);
}

.det-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 200;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  min-width: 200px;
  max-height: 60vh;
  overflow-y: auto;
  padding: 0.3rem 0;
}

.det-dropdown-item {
  display: block;
  width: 100%;
  padding: 0.45rem 1rem;
  font-size: 0.83rem;
  font-family: var(--font-sans);
  color: var(--text-muted);
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
  white-space: nowrap;
}

.det-dropdown-item:hover {
  background: rgba(110,0,8,0.07);
  color: var(--text-primary);
}

.det-dropdown-item.active {
  color: var(--accent);
  font-weight: 600;
}

/* ── TOC ── */
.faction-toc {
  margin-bottom: 2.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1rem 1.25rem 1.25rem;
}

.faction-toc-title {
  font-family: var(--font-serif);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-dim);
  margin: 0 0 0.75rem;
}

.faction-toc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.4rem;
}

.faction-toc-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  text-decoration: none;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  transition: background 0.15s, border-color 0.15s;
  gap: 0.5rem;
}

.faction-toc-item:hover {
  background: rgba(110, 0, 8, 0.06);
  border-color: var(--accent);
  text-decoration: none;
}

.faction-toc-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-primary);
}

.faction-toc-source {
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.1rem 0.35rem;
  border-radius: 2px;
  flex-shrink: 0;
}

.faction-toc-source.src-11ed {
  background: rgba(110, 0, 8, 0.15);
  color: var(--accent);
  border: 1px solid rgba(110, 0, 8, 0.3);
}

.faction-toc-source.src-10ed {
  background: rgba(40, 80, 140, 0.15);
  color: #5a8fd0;
  border: 1px solid rgba(40, 80, 140, 0.3);
}

/* ── Detachment sections ── */
.detachment-section {
  margin-bottom: 3.5rem;
  scroll-margin-top: 100px;
}

.detachment-title-row {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid var(--border);
}

.detachment-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-primary);
  margin: 0;
}

.detachment-source-badge {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  padding: 0.15rem 0.45rem;
  border-radius: 3px;
}

.detachment-source-badge.src-11ed {
  background: rgba(110, 0, 8, 0.15);
  color: var(--accent);
  border: 1px solid rgba(110, 0, 8, 0.3);
}

.detachment-source-badge.src-10ed {
  background: rgba(40, 80, 140, 0.12);
  color: #5a8fd0;
  border: 1px solid rgba(40, 80, 140, 0.25);
}

/* ── Sub-section headers ── */
.subsection-header {
  margin: 1.5rem 0 0.75rem;
}

.subsection-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-dim);
  border-left: 3px solid var(--accent);
  padding-left: 0.5rem;
}

/* ── Enhancement grid ── */
.enhancements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.75rem;
}

/* ── Stratagem grid ── */
.strat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.75rem;
}

/* ── Mobile ── */
@media (max-width: 900px) {
  .det-filter-bar {
    top: var(--navbar-height);
    padding: 0.5rem 1rem;
    margin: 0 -1rem 1.5rem;
  }

  .det-select-btn {
    min-height: 40px;
    font-size: 0.85rem;
  }
}

@media (max-width: 600px) {
  .enhancements-grid,
  .strat-grid {
    grid-template-columns: 1fr;
  }

  .faction-toc-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

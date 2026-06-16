<template>
  <div class="view">
    <!-- Hero -->
    <div class="view-hero faction-hero">
      <div class="faction-hero-meta">
        <span class="faction-badge">Xenos</span>
        <span class="faction-edition">11th Edition</span>
      </div>
      <h1>{{ labels.orksHeading }}</h1>
      <p class="view-hero-desc">{{ orks.lore }}</p>
    </div>

    <!-- Army Rule -->
    <div class="army-rule-block">
      <div class="army-rule-header">
        <span class="army-rule-badge">{{ labels.armyRuleLabel }}</span>
        <span class="army-rule-name">{{ orks.armyRule.name }}</span>
      </div>
      <div class="army-rule-body">{{ orks.armyRule.text }}</div>
    </div>

    <!-- Detachment filter -->
    <div class="det-filter-bar">
      <button
        class="det-filter-chip"
        :class="{ active: selectedDet === null }"
        @click="selectedDet = null"
      >All</button>
      <button
        v-for="det in orks.detachments"
        :key="det.id"
        class="det-filter-chip"
        :class="{ active: selectedDet === det.id }"
        @click="selectedDet = det.id"
      >{{ det.name }}</button>
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

        <DetachmentBlock :rule="det.rule" />

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
import { ref, computed } from 'vue'
import { orks } from '../../data/factions/orks.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import DetachmentBlock from '../../components/DetachmentBlock.vue'
import EnhancementCard from '../../components/EnhancementCard.vue'
import StratCard from '../../components/StratCard.vue'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const selectedDet = ref(null)
const filteredDetachments = computed(() =>
  selectedDet.value
    ? orks.detachments.filter(d => d.id === selectedDet.value)
    : orks.detachments
)

function scrollToDetachment(id) {
  const el = document.getElementById(`detachment-${id}`)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* ── Hero ── */
.faction-hero {
  padding-bottom: 1.5rem;
}

.faction-hero-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}

.faction-badge {
  background: #2a4a2a;
  color: #6abf6a;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.2rem 0.55rem;
  border-radius: 3px;
  border: 1px solid #4a7a4a;
}

.faction-edition {
  font-size: 0.72rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

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
  top: var(--navbar-height);
  z-index: 100;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 2rem;
  margin: 0 -2rem 1.75rem;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.det-filter-bar::-webkit-scrollbar { display: none; }

.det-filter-chip {
  flex-shrink: 0;
  padding: 0.3rem 0.75rem;
  min-height: 34px;
  border-radius: 99px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-muted);
  font-size: 0.8rem;
  font-family: var(--font-sans);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.12s, color 0.12s, border-color 0.12s;
}

.det-filter-chip:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}

.det-filter-chip.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
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

/* ── Stratagem grid (reuse from BattlefieldsView) ── */
.strat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.75rem;
}

/* ── Mobile ── */
@media (max-width: 900px) {
  .det-filter-bar {
    padding: 0.5rem 1rem;
    margin: 0 -1rem 1.5rem;
  }

  .det-filter-chip {
    min-height: 40px;
    padding: 0.4rem 0.85rem;
    font-size: 0.82rem;
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

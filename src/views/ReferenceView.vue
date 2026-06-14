<template>
  <div class="view">
    <div class="view-hero">
      <h1>Reference</h1>
      <p class="view-hero-desc">Core Abilities, Rules Appendix and FAQs</p>
    </div>

    <TableOfContents :sections="tocSections" />

    <!-- Section 24: Core Abilities -->
    <SectionHeader
      id="section-24"
      num="24"
      title="Core Abilities"
      description="Abilities that are universal to many units and weapons in Warhammer 40,000."
    />

    <div class="ability-notes">
      <div class="note-box">
        <strong>Ability Types:</strong> Weapon abilities appear in square brackets bold (e.g. <span class="keyword">[BLAST]</span>). If a weapon ability includes keywords, it only applies if the target has those keywords (e.g. <span class="keyword">[LETHAL HITS: VEHICLE]</span>).
      </div>
      <div class="note-box">
        <strong>Duplicated Abilities:</strong> Multiple instances of the same ability are not cumulative; the controlling player selects which applies. For Scouts with different values, must select the lowest value not shared by every model. For <span class="keyword">[SUSTAINED HITS]</span> with different numbers or <span class="keyword">[ANTI]</span> with different keywords, must choose between instances.
      </div>
    </div>

    <!-- Filter buttons -->
    <div class="ability-filters">
      <button
        v-for="f in filters"
        :key="f.value"
        class="filter-btn"
        :class="{ active: activeFilter === f.value }"
        @click="activeFilter = f.value"
      >
        {{ f.label }}
      </button>
    </div>

    <div class="abilities-list">
      <div
        v-for="ability in filteredAbilities"
        :key="ability.num"
        class="ability-card"
        :id="'ability-' + ability.num.replace('.','_')"
      >
        <div class="ability-header">
          <span class="ability-num">{{ ability.num }}</span>
          <span class="ability-name" :class="ability.type">{{ ability.name }}</span>
          <span class="ability-type-badge" :class="ability.type">{{ ability.type }}</span>
        </div>
        <div class="ability-body">
          <p class="ability-summary">{{ ability.summary }}</p>
          <p class="ability-full">{{ ability.fullText }}</p>
        </div>
      </div>
    </div>

    <!-- Rules Appendix -->
    <SectionHeader
      id="section-appendix"
      num="—"
      title="Rules Appendix"
      description="Additional rules clarifications and edge cases."
    />

    <div class="digital-support">
      <h2 class="digital-support-title">Digital Support</h2>
      <p>The Warhammer 40,000 app contains an expanded range of definitions, rare rules interactions and frequently asked questions (FAQs). These digital resources are designed to clarify any uncertainty and keep your battles as streamlined as possible. As such, they are reviewed and updated regularly in response to player feedback. The following pages present a selection of these supporting materials.</p>
    </div>

    <div v-for="entry in appendix" :key="entry.id" :id="entry.id" class="appendix-block">
      <h3 class="appendix-title">{{ entry.title }}</h3>
      <div v-for="para in entry.body.split('\n\n').filter(p => p.trim())" :key="para">
        <ul v-if="para.trim().startsWith('▪')" class="appendix-list">
          <li v-for="item in para.split('\n').map(l => l.replace(/^▪\s*/,'')).filter(Boolean)" :key="item">{{ item }}</li>
        </ul>
        <p v-else>{{ para }}</p>
      </div>
      <DataTable
        v-if="entry.table"
        :headers="entry.table.headers"
        :rows="entry.table.rows"
      />
    </div>

    <!-- FAQs -->
    <SectionHeader
      id="section-faq"
      num="—"
      title="FAQs"
      description="Frequently asked questions and official clarifications."
    />

    <div class="faq-list">
      <div v-for="(faq, i) in faqs" :key="i" class="faq-item">
        <div class="faq-q">
          <span class="faq-badge">Q</span>
          <span>{{ faq.q }}</span>
        </div>
        <div class="faq-a">
          <span class="faq-badge ans">A</span>
          <span>{{ faq.a }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'
import DataTable from '../components/DataTable.vue'
import TableOfContents from '../components/TableOfContents.vue'
import { coreAbilities, appendix, faqs } from '../data/reference.js'

const tocSections = [
  { id: 'section-24', num: '24', label: 'Core Abilities' },
  { id: 'section-appendix', num: '—', label: 'Rules Appendix' },
  { id: 'section-faq', num: '—', label: 'FAQs' },
]

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Unit Abilities', value: 'unit' },
  { label: 'Weapon Abilities', value: 'weapon' },
]
const activeFilter = ref('all')

const filteredAbilities = computed(() => {
  if (activeFilter.value === 'all') return coreAbilities
  return coreAbilities.filter(a => a.type === activeFilter.value)
})
</script>

<style scoped>
.view-hero {
  padding: 2rem 0 1.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2rem;
}
.view-hero h1 {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  margin-bottom: 0.4rem;
}
.view-hero-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  font-style: italic;
}

.digital-support {
  margin-bottom: 2rem;
  padding: 1.25rem 1.5rem;
  border-left: 3px solid var(--accent);
  background: var(--bg-secondary);
  border-radius: 0 6px 6px 0;
}

.digital-support-title {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.digital-support p {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

.ability-notes {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.ability-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.filter-btn {
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.3rem 0.9rem;
  border-radius: 20px;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.15s;
  font-weight: 500;
}

.filter-btn:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}

.filter-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.abilities-list {
  display: grid;
  gap: 0.6rem;
  margin-bottom: 2rem;
}

.ability-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  scroll-margin-top: 72px;
}

.ability-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.55rem 1rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
  flex-wrap: wrap;
}

.ability-num {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-dim);
  width: 38px;
  flex-shrink: 0;
}

.ability-name {
  font-weight: 700;
  font-size: 0.9rem;
  flex: 1;
  color: var(--text-primary);
}

.ability-name.weapon {
  color: #7a5a00;
  font-family: var(--font-mono);
}

.ability-name.unit {
  color: #004a6e;
}

.ability-type-badge {
  font-size: 0.63rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 1px 7px;
  border-radius: 10px;
}

.ability-type-badge.weapon {
  background: rgba(122, 90, 0, 0.1);
  color: #7a5a00;
  border: 1px solid rgba(122, 90, 0, 0.25);
}

.ability-type-badge.unit {
  background: rgba(0, 74, 110, 0.1);
  color: #004a6e;
  border: 1px solid rgba(0, 74, 110, 0.25);
}

.ability-body {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.ability-summary {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.ability-full {
  font-size: 0.85rem;
  color: var(--text-muted);
  border-top: 1px dashed var(--border);
  padding-top: 0.4rem;
  margin: 0;
}

/* Appendix */
.appendix-block {
  border-bottom: 1px solid var(--border-light);
  padding: 1.25rem 0;
  scroll-margin-top: 72px;
}

.appendix-title {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--border-light);
}

.appendix-list {
  padding-left: 1.25rem;
  margin-bottom: 0.5rem;
}

.appendix-list li {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

/* FAQs */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.faq-item {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
}

.faq-q, .faq-a {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  align-items: flex-start;
}

.faq-q {
  border-bottom: 1px solid var(--border-light);
  font-weight: 600;
}

.faq-a {
  color: var(--text-muted);
}

.faq-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  min-width: 22px;
  background: var(--accent);
  border-radius: 3px;
  font-weight: 700;
  font-size: 0.75rem;
  color: #fff;
  flex-shrink: 0;
}

.faq-badge.ans {
  background: var(--text-muted);
}
</style>

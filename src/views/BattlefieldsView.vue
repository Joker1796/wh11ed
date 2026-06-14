<template>
  <div class="view">
    <div class="view-hero">
      <h1>Battlefields &amp; Tactics</h1>
      <p class="view-hero-desc">Terrain, objectives, stratagems and actions</p>
    </div>

    <TableOfContents :sections="tocSections" />

    <template v-for="section in battlefields" :key="section.id">
      <SectionHeader
        :id="'section-' + section.id.padStart(2,'0')"
        :num="section.num"
        :title="section.title"
        :description="section.description"
        :page="section.page"
      />

      <template v-for="sub in section.subsections.filter(s => !s.renderAfterStratagems && !s.inline)" :key="sub.id">
        <GroupLabelBlock
          v-if="sub.isGroupLabel"
          :title="sub.title"
          :body="sub.body"
        />
        <RuleBlock
          v-else
          :id="sub.id"
          :section-num="sub.sectionNum"
          :title="sub.title"
          :body="sub.body"
          :note="sub.note"
          :example="sub.example"
          :see-also="sub.seeAlso"
          :side-image="sub.sideImage"
        />
      </template>

      <!-- Stratagems grid for section 15 -->
      <template v-if="section.id === '15' && section.stratagems">
        <div class="stratagems-section" id="section-15-list">
          <div class="strat-grid">
            <StratCard v-for="strat in section.stratagems" :key="strat.num" :strat="strat" />
          </div>
        </div>
      </template>

      <!-- Subsections rendered after stratagem grid (e.g. Snap Shooting) -->
      <template v-for="sub in section.subsections.filter(s => s.renderAfterStratagems && !s.inline)" :key="sub.id + '-after'">
        <RuleBlock
          :id="sub.id"
          :section-num="sub.sectionNum"
          :title="sub.title"
          :body="sub.body"
          :note="sub.note"
          :example="sub.example"
          :see-also="sub.seeAlso"
          :side-image="sub.sideImage"
        />
      </template>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'
import RuleBlock from '../components/RuleBlock.vue'
import GroupLabelBlock from '../components/GroupLabelBlock.vue'
import StratCard from '../components/StratCard.vue'
import TableOfContents from '../components/TableOfContents.vue'
import { battlefields } from '../data/battlefields.js'

const tocSections = computed(() =>
  battlefields.map(s => ({
    id: 'section-' + s.id.padStart(2, '0'),
    num: s.num,
    label: s.title,
  }))
)
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

.stratagems-section {
  margin: 1.5rem 0 2rem;
}

.strat-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 640px) {
  .strat-grid {
    grid-template-columns: 1fr;
  }
}
</style>

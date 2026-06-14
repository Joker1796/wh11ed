<template>
  <div class="view">
    <div class="view-hero">
      <h1>Advanced Rules</h1>
      <p class="view-hero-desc">Monsters, Vehicles, Transports, Reserves and more</p>
    </div>

    <TableOfContents :sections="tocSections" />

    <template v-for="section in advancedRules" :key="section.id">
      <SectionHeader
        :id="'section-' + section.id.padStart(2,'0')"
        :num="section.num"
        :title="section.title"
        :description="section.description"
        :page="section.page"
      />

      <RuleBlock
        v-for="sub in section.subsections"
        :key="sub.id"
        :id="sub.id"
        :section-num="sub.sectionNum"
        :title="sub.title"
        :body="sub.body"
        :side-image="sub.sideImage"
        :note="sub.note"
        :example="sub.example"
        :see-also="sub.seeAlso"
      />

      <!-- Attached Units abilities table -->
      <template v-if="section.id === '19' && section.abilitiesTable">
        <div class="table-block">
          <DataTable
            title="Abilities in Attached Units"
            :headers="section.abilitiesTable.headers"
            :rows="section.abilitiesTable.rows"
          />
          <p class="table-note">* Leader/support units continue to benefit from their own "while this model is leading a unit" abilities even after the bodyguard unit is destroyed.</p>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'
import RuleBlock from '../components/RuleBlock.vue'
import DataTable from '../components/DataTable.vue'
import TableOfContents from '../components/TableOfContents.vue'
import { advancedRules } from '../data/advancedRules.js'

const tocSections = computed(() =>
  advancedRules.map(s => ({
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

.table-block {
  margin: 1rem 0 1.5rem;
}

.table-note {
  font-size: 0.82rem;
  color: var(--text-dim);
  margin-top: 0.5rem;
  font-style: italic;
}
</style>

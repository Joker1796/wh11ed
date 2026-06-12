<template>
  <div class="view">
    <div class="view-hero">
      <h1>Basic Rules</h1>
      <p class="view-hero-desc">The essential rules concepts of Warhammer 40,000</p>
    </div>

    <TableOfContents :sections="tocSections" />

    <template v-for="section in basicRules" :key="section.id">
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
        :note="sub.note"
        :example="sub.example"
        :see-also="sub.seeAlso"
      />

      <template v-if="section.id === '05' && section.woundTable">
        <div class="table-section">
          <DataTable
            title="Wound Roll — Strength vs Toughness"
            :headers="section.woundTable.headers"
            :rows="section.woundTable.rows"
          />
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
import { basicRules } from '../data/basicRules.js'

const tocSections = computed(() =>
  basicRules.map(s => ({
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

.table-section {
  margin: 1rem 0;
}
</style>

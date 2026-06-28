<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.advancedRulesHeading }}</h1>
      <p class="view-hero-desc">{{ labels.advancedRulesDesc }}</p>
    </div>

    <TableOfContents :sections="tocSections" />

    <template v-for="section in sections" :key="section.id">
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
        :children="sub.children"
      />

      <!-- Attached Units abilities table -->
      <template v-if="section.id === '19' && section.abilitiesTable">
        <div class="table-block">
          <DataTable
            :title="section.abilitiesTable.title"
            :headers="section.abilitiesTable.headers"
            :rows="section.abilitiesTable.rows"
          />
          <p class="table-note">{{ section.abilitiesTable.note }}</p>
        </div>
      </template>
    </template>

    <PageNav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'
import RuleBlock from '../components/RuleBlock.vue'
import DataTable from '../components/DataTable.vue'
import TableOfContents from '../components/TableOfContents.vue'
import PageNav from '../components/PageNav.vue'
import { advancedRules } from '../data/advancedRules.js'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'
import { useBilingualSections } from '../composables/useBilingualMerge.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const sections = useBilingualSections(advancedRules, (section, ruSection) =>
  section.abilitiesTable && ruSection.abilitiesTable
    ? { abilitiesTable: { ...section.abilitiesTable, ...ruSection.abilitiesTable } }
    : {}
)

const tocSections = computed(() =>
  sections.value.map(s => ({
    id: 'section-' + s.id.padStart(2, '0'),
    num: s.num,
    label: s.title,
  }))
)
</script>

<style scoped>
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

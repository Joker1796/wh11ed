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
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'
import RuleBlock from '../components/RuleBlock.vue'
import DataTable from '../components/DataTable.vue'
import TableOfContents from '../components/TableOfContents.vue'
import { advancedRules } from '../data/advancedRules.js'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const sections = computed(() => {
  if (locale.value === 'en') return advancedRules.en
  return advancedRules.en.map((section, i) => {
    const ruSection = advancedRules.ru[i]
    const subsections = section.subsections.map((sub, j) => {
      const merged = { ...sub, ...ruSection.subsections[j] }
      if (merged.sideImage?.src)
        merged.sideImage = { ...merged.sideImage, src: merged.sideImage.src.replace('.png', '-ru.png') }
      return merged
    })
    const result = { ...section, title: ruSection.title, description: ruSection.description, subsections }
    if (section.abilitiesTable && ruSection.abilitiesTable)
      result.abilitiesTable = { ...section.abilitiesTable, ...ruSection.abilitiesTable }
    return result
  })
})

const tocSections = computed(() =>
  sections.value.map(s => ({
    id: 'section-' + s.id.padStart(2, '0'),
    num: s.num,
    label: s.title,
  }))
)
</script>

<style scoped>
.view-hero {
  padding: 1.25rem 0 0.9rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.25rem;
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

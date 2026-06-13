<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.basicRulesHeading }}</h1>
      <p class="view-hero-desc">{{ labels.basicRulesDesc }}</p>
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

      <img
        v-if="section.id === '02'"
        src="/images/datasheet.png"
        alt="Datasheet example"
        class="section-img"
      />

      <template v-for="(sub, subIndex) in section.subsections" :key="sub.id">
        <RuleBlock
          :id="sub.id"
          :section-num="sub.sectionNum"
          :title="sub.title"
          :body="sub.body"
          :note="sub.note"
          :example="sub.example"
          :see-also="sub.seeAlso"
        >
          <template v-if="section.id === '03' && subIndex === 0">
            <div class="section-illustration">
              <img src="/images/moving-straight-line.png" alt="Moving in a straight line" />
              <SeeAlsoBlock
                title="Move Types"
                :refs="[
                  'Advance Move 09.06',
                  'Charge Move 11.04',
                  'Consolidation Move 12.08',
                  'Disembark Move 18.04',
                  'Emergency Disembark Move 18.05',
                  'Fall-back Move 09.07',
                  'Ingress Move 20.04',
                  'Normal Move 09.05',
                  'Pile-in Move 12.03',
                  'Scout Move 24.32',
                  'Surge Move 21.02',
                ]"
              />
            </div>
            <img src="/images/rotating.png" alt="Rotating a model" class="section-img" />
          </template>
          <img
            v-if="section.id === '03' && subIndex === 2"
            src="/images/coherency.png"
            alt="Coherency"
            class="section-img"
          />
          <img
            v-if="section.id === '03' && subIndex === 3"
            src="/images/engagement.png"
            alt="Engagement"
            class="section-img"
          />
        </RuleBlock>
      </template>

      <template v-if="section.id === '05' && section.woundTable">
        <div class="table-section">
          <DataTable
            :title="labels.woundTableTitle"
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
import SeeAlsoBlock from '../components/SeeAlsoBlock.vue'
import DataTable from '../components/DataTable.vue'
import TableOfContents from '../components/TableOfContents.vue'
import { basicRules } from '../data/basicRules.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const sections = computed(() => {
  if (locale.value === 'en') return basicRules.en
  return basicRules.en.map((section, i) => ({
    ...section,
    title: basicRules.ru[i].title,
    description: basicRules.ru[i].description,
    subsections: section.subsections.map((sub, j) => ({
      ...sub,
      ...basicRules.ru[i].subsections[j],
    })),
    woundTable: section.woundTable
      ? { ...section.woundTable, ...basicRules.ru[i].woundTable }
      : undefined,
  }))
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

.section-img {
  display: block;
  max-width: 100%;
  margin: 1rem 0 1.5rem;
  border-radius: 4px;
}

.view > .section-img {
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 1.5rem;
  margin-bottom: 0;
}

.section-illustration {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin: 1rem 0 1.5rem;
}

.section-illustration img {
  border-radius: 4px;
  max-width: 100%;
  height: auto;
  flex: 1 1 auto;
  min-width: 0;
}

.section-illustration :deep(.see-also) {
  float: none;
  margin-left: 0;
  flex-shrink: 0;
}
</style>

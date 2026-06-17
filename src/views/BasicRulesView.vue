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
        v-if="section.image"
        :src="section.image.src"
        :alt="section.image.alt"
        class="section-img"
      />

      <template v-for="sub in section.subsections" :key="sub.id">
        <SectionTocBlock
          v-if="!sub.sectionNum"
          :items="section.subsections.filter(s => s.sectionNum)"
          :description="sub.body.split('\n').find(l => l.trim() && !/^[▪•▫]/.test(l.trim()))"
          route="/basic-rules"
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
        >
          <div v-if="sub.illustration" class="section-illustration">
            <img :src="sub.illustration.src" :alt="sub.illustration.alt" />
            <SeeAlsoBlock
              :title="sub.illustration.seeAlso.title"
              :refs="sub.illustration.seeAlso.refs"
            />
          </div>
          <img
            v-if="sub.image"
            :src="sub.image.src"
            :alt="sub.image.alt"
            class="section-img"
          />
          <DefinitionBlock v-if="sub.definitions" :definitions="sub.definitions" />
        </RuleBlock>
        <template v-if="sub.id === 'section-05-02' && section.woundTable">
          <div class="table-section">
            <DataTable
              :title="labels.woundTableTitle"
              :headers="section.woundTable.headers"
              :rows="section.woundTable.rows"
            />
          </div>
        </template>
      </template>
    </template>

    <PageNav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'
import RuleBlock from '../components/RuleBlock.vue'
import SeeAlsoBlock from '../components/SeeAlsoBlock.vue'
import SectionTocBlock from '../components/SectionTocBlock.vue'
import DataTable from '../components/DataTable.vue'
import TableOfContents from '../components/TableOfContents.vue'
import DefinitionBlock from '../components/DefinitionBlock.vue'
import PageNav from '../components/PageNav.vue'
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
    subsections: section.subsections.map((sub, j) => {
      const merged = { ...sub, ...basicRules.ru[i].subsections[j] }
      if (merged.image?.src)
        merged.image = { ...merged.image, src: merged.image.src.replace('.png', '-ru.png') }
      if (merged.sideImage?.src)
        merged.sideImage = { ...merged.sideImage, src: merged.sideImage.src.replace('.png', '-ru.png') }
      if (merged.illustration?.src)
        merged.illustration = { ...merged.illustration, src: merged.illustration.src.replace('.png', '-ru.png') }
      return merged
    }),
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

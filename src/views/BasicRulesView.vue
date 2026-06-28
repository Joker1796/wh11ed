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

      <AppImage
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
          :children="sub.children"
        >
          <div v-if="sub.illustration" class="section-illustration">
            <AppImage :src="sub.illustration.src" :alt="sub.illustration.alt" />
            <SeeAlsoBlock
              :title="sub.illustration.seeAlso.title"
              :refs="sub.illustration.seeAlso.refs"
            />
          </div>
          <AppImage
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
import AppImage from '../components/AppImage.vue'
import SeeAlsoBlock from '../components/SeeAlsoBlock.vue'
import SectionTocBlock from '../components/SectionTocBlock.vue'
import DataTable from '../components/DataTable.vue'
import TableOfContents from '../components/TableOfContents.vue'
import DefinitionBlock from '../components/DefinitionBlock.vue'
import PageNav from '../components/PageNav.vue'
import { basicRules } from '../data/basicRules.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useBilingualSections } from '../composables/useBilingualMerge.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const sections = useBilingualSections(basicRules, (section, ruSection) =>
  section.woundTable
    ? { woundTable: { ...section.woundTable, ...ruSection.woundTable } }
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
.table-section {
  margin: 1rem 0;
}

:deep(.section-img) {
  display: block;
  max-width: 100%;
  margin: 1rem 0 1.5rem;
  border-radius: 4px;
}

/* AppImage wraps the <img> in a (display:contents) <picture>, so the section-level
   image is `.view > picture > .section-img` — picture carries this component's scope. */
.view > picture > :deep(.section-img) {
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

.section-illustration :deep(img) {
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

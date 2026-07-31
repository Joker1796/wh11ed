<template>
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
      class="section-img section-img--lead"
    />

    <template v-for="grp in chunkSubsections(section.subsections, hasTableAfter)" :key="grp.key">
      <div v-if="grp.type === 'columns'" class="rule-columns">
        <RuleBlock
          v-for="sub in grp.items"
          :key="sub.id"
          :id="sub.id"
          :section-num="sub.sectionNum"
          :title="sub.title"
          :body="sub.body"
          :note="sub.note"
          :example="sub.example"
          :see-also="sub.seeAlso"
          :children="sub.children"
        >
          <DefinitionBlock v-if="sub.definitions" :definitions="sub.definitions" />
        </RuleBlock>
      </div>

      <template v-else>
        <SectionTocBlock
          v-if="!grp.item.sectionNum"
          :items="section.subsections.filter(s => s.sectionNum)"
          :description="grp.item.body.split('\n').find(l => l.trim() && !/^[▪•▫]/.test(l.trim()))"
          route="/core-rules"
        />
        <RuleBlock
          v-else
          :id="grp.item.id"
          :section-num="grp.item.sectionNum"
          :title="grp.item.title"
          :body="grp.item.body"
          :note="grp.item.note"
          :example="grp.item.example"
          :see-also="grp.item.seeAlso"
          :side-image="grp.item.sideImage"
          :children="grp.item.children"
        >
          <div v-if="grp.item.illustration" class="section-illustration">
            <AppImage :src="grp.item.illustration.src" :alt="grp.item.illustration.alt" />
            <SeeAlsoBlock
              :title="grp.item.illustration.seeAlso.title"
              :refs="grp.item.illustration.seeAlso.refs"
            />
          </div>
          <AppImage
            v-if="grp.item.image"
            :src="grp.item.image.src"
            :alt="grp.item.image.alt"
            class="section-img"
          />
          <DefinitionBlock v-if="grp.item.definitions" :definitions="grp.item.definitions" />
        </RuleBlock>
        <div v-if="grp.item.id === 'section-05-02' && section.woundTable" class="table-section">
          <DataTable
            :title="labels.woundTableTitle"
            :headers="section.woundTable.headers"
            :rows="section.woundTable.rows"
          />
        </div>
      </template>
    </template>
  </template>
</template>

<script setup>
import { computed } from 'vue'
import SectionHeader from '../SectionHeader.vue'
import RuleBlock from '../RuleBlock.vue'
import AppImage from '../AppImage.vue'
import SeeAlsoBlock from '../SeeAlsoBlock.vue'
import SectionTocBlock from '../SectionTocBlock.vue'
import DataTable from '../DataTable.vue'
import DefinitionBlock from '../DefinitionBlock.vue'
import { basicRules } from '../../data/basicRules.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useBilingualSections } from '../../composables/useBilingualMerge.js'
import { chunkSubsections } from '../../composables/columnChunks.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// 05.02 is followed by the full-width wound table, so it can't sit in a column group.
const hasTableAfter = (sub) => sub.id === 'section-05-02'

const sections = useBilingualSections(basicRules, (section, ruSection) =>
  section.woundTable
    ? { woundTable: { ...section.woundTable, ...ruSection.woundTable } }
    : {}
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

/* Section-level lead image (the one right under a SectionHeader) closes with a rule.
   Marked by a modifier class rather than by DOM nesting: AppImage wraps the <img> in a
   display:contents <picture>, and the chapter is a fragment with no wrapper of its own. */
:deep(.section-img--lead) {
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

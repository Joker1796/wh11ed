<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.musterHeading }}</h1>
      <p class="view-hero-desc">{{ labels.musterDesc }}</p>
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

      <template v-for="sub in section.subsections" :key="sub.id">
        <RuleBlock
          :id="sub.id"
          :section-num="sub.sectionNum"
          :title="sub.title"
          :body="sub.body"
          :note="sub.note"
          :example="sub.example"
          :see-also="sub.seeAlso"
          :children="sub.children"
        />

        <!-- Battle size table, rendered right after 25.03 -->
        <template v-if="sub.sectionNum === '25.03' && section.battleSizeTable">
          <div class="table-block">
            <DataTable
              :headers="section.battleSizeTable.headers"
              :rows="section.battleSizeTable.rows"
              :footnote="section.battleSizeTable.footnote"
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
import DataTable from '../components/DataTable.vue'
import TableOfContents from '../components/TableOfContents.vue'
import PageNav from '../components/PageNav.vue'
import { muster } from '../data/muster.js'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'
import { useBilingualSections } from '../composables/useBilingualMerge.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const sections = useBilingualSections(muster, (section, ruSection) =>
  section.battleSizeTable && ruSection.battleSizeTable
    ? { battleSizeTable: { ...section.battleSizeTable, ...ruSection.battleSizeTable } }
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
</style>

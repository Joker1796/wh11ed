<template>
  <template v-for="section in sections" :key="section.id">
    <SectionHeader
      :id="'section-' + section.id.padStart(2,'0')"
      :num="section.num"
      :title="section.title"
      :description="section.description"
      :page="section.page"
    />

    <template v-for="grp in chunkSubsections(section.subsections)" :key="grp.key">
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
        />
      </div>
      <RuleBlock
        v-else
        :id="grp.item.id"
        :section-num="grp.item.sectionNum"
        :title="grp.item.title"
        :body="grp.item.body"
        :side-image="grp.item.sideImage"
        :note="grp.item.note"
        :example="grp.item.example"
        :see-also="grp.item.seeAlso"
        :children="grp.item.children"
      />
    </template>

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
</template>

<script setup>
import SectionHeader from '../SectionHeader.vue'
import RuleBlock from '../RuleBlock.vue'
import DataTable from '../DataTable.vue'
import { advancedRules } from '../../data/advancedRules.js'
import { useBilingualSections } from '../../composables/useBilingualMerge.js'
import { chunkSubsections } from '../../composables/columnChunks.js'

const sections = useBilingualSections(advancedRules, (section, ruSection) =>
  section.abilitiesTable && ruSection.abilitiesTable
    ? { abilitiesTable: { ...section.abilitiesTable, ...ruSection.abilitiesTable } }
    : {}
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

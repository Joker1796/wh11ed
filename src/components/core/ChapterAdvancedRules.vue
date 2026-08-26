<template>
  <template v-for="section in sections" :key="section.id">
    <SectionHeader
      :id="'section-' + section.id.padStart(2,'0')"
      :num="section.num"
      :title="section.title"
      :description="section.description"
      :page="section.page"
    />

    <template v-for="grp in chunkSubsections(splitSubsections(section.subsections))" :key="grp.key">
      <div v-if="grp.type === 'columns'" class="rule-columns">
        <template v-for="sub in grp.items" :key="sub.id">
          <div v-if="sub.isSplitBlock" :id="sub.id" class="split-block">
            <RuleBody :id="sub.id" :body="sub.body" />
          </div>
          <RuleBlock
            v-else
            :id="sub.id"
            :section-num="sub.sectionNum"
            :title="sub.title"
            :body="sub.body"
            :side-image="sub.sideImage"
            :note="sub.note"
            :example="sub.example"
            :see-also="sub.seeAlso"
            :children="sub.children"
          >
            <div v-if="sub.id === 'section-19-04' && section.abilitiesTable" class="table-block">
              <DataTable
                :title="section.abilitiesTable.title"
                :headers="section.abilitiesTable.headers"
                :rows="section.abilitiesTable.rows"
              />
              <p class="table-note">{{ section.abilitiesTable.note }}</p>
            </div>
          </RuleBlock>
        </template>
      </div>
      <div v-else-if="grp.item.isSplitBlock" :id="grp.item.id" class="split-block">
        <RuleBody :id="grp.item.id" :body="grp.item.body" />
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
      >
        <div v-if="grp.item.id === 'section-19-04' && section.abilitiesTable" class="table-block">
          <DataTable
            :title="section.abilitiesTable.title"
            :headers="section.abilitiesTable.headers"
            :rows="section.abilitiesTable.rows"
          />
          <p class="table-note">{{ section.abilitiesTable.note }}</p>
        </div>
      </RuleBlock>
    </template>
  </template>
</template>

<script setup>
import SectionHeader from '../SectionHeader.vue'
import RuleBlock from '../RuleBlock.vue'
import RuleBody from '../RuleBody.vue'
import DataTable from '../DataTable.vue'
import { advancedRules } from '../../data/advancedRules.js'
import { useBilingualSections } from '../../composables/useBilingualMerge.js'
import { chunkSubsections, splitSubsections } from '../../composables/columnChunks.js'

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

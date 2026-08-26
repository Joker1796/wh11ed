<template>
  <template v-for="section in sections" :key="section.id">
    <SectionHeader
      :id="'section-' + section.id.padStart(2,'0')"
      :num="section.num"
      :title="section.title"
      :description="section.description"
      :page="section.page"
    />

    <template v-for="grp in chunkSubsections(splitSubsections(section.subsections), hasTableAfter)" :key="grp.key">
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
            :note="sub.note"
            :example="sub.example"
            :see-also="sub.seeAlso"
            :children="sub.children"
          />
        </template>
      </div>

      <template v-else>
        <div v-if="grp.item.isSplitBlock" :id="grp.item.id" class="split-block">
          <RuleBody :id="grp.item.id" :body="grp.item.body" />
        </div>
        <RuleBlock
          v-else
          :id="grp.item.id"
          :section-num="grp.item.sectionNum"
          :title="grp.item.title"
          :body="grp.item.body"
          :note="grp.item.note"
          :example="grp.item.example"
          :see-also="grp.item.seeAlso"
          :children="grp.item.children"
        />

        <!-- Battle size table, rendered right after 25.03 -->
        <div v-if="grp.item.sectionNum === '25.03' && section.battleSizeTable" class="table-block">
          <DataTable
            :headers="section.battleSizeTable.headers"
            :rows="section.battleSizeTable.rows"
            :footnote="section.battleSizeTable.footnote"
          />
        </div>
      </template>
    </template>
  </template>
</template>

<script setup>
import SectionHeader from '../SectionHeader.vue'
import RuleBlock from '../RuleBlock.vue'
import RuleBody from '../RuleBody.vue'
import DataTable from '../DataTable.vue'
import { muster } from '../../data/muster.js'
import { useBilingualSections } from '../../composables/useBilingualMerge.js'
import { chunkSubsections, splitSubsections } from '../../composables/columnChunks.js'

// 25.03 is followed by the full-width battle-size table, so it can't sit in a column group.
const hasTableAfter = (sub) => sub.sectionNum === '25.03'

const sections = useBilingualSections(muster, (section, ruSection) =>
  section.battleSizeTable && ruSection.battleSizeTable
    ? { battleSizeTable: { ...section.battleSizeTable, ...ruSection.battleSizeTable } }
    : {}
)
</script>

<style scoped>

.table-block {
  margin: 1rem 0 1.5rem;
}
</style>

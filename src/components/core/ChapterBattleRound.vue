<template>
  <template v-for="section in sections" :key="section.id">
    <SectionHeader
      :id="'section-' + section.id.padStart(2,'0')"
      :num="section.num"
      :title="section.title"
      :description="section.description"
      :page="section.page"
      :phase="section.phase"
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

      <template v-else>
        <GroupLabelBlock
          v-if="grp.item.isGroupLabel"
          :title="grp.item.title"
          :body="grp.item.body"
        />
        <SectionTocBlock
          v-else-if="!grp.item.sectionNum"
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
          :children="grp.item.children"
        />
      </template>
    </template>
  </template>
</template>

<script setup>
import SectionHeader from '../SectionHeader.vue'
import RuleBlock from '../RuleBlock.vue'
import SectionTocBlock from '../SectionTocBlock.vue'
import GroupLabelBlock from '../GroupLabelBlock.vue'
import { battleRound } from '../../data/battleRound.js'
import { useBilingualSections } from '../../composables/useBilingualMerge.js'
import { chunkSubsections } from '../../composables/columnChunks.js'

const sections = useBilingualSections(battleRound)
</script>

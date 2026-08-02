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

    <template v-for="grp in chunkSubsections(splitSubsections(expandSteps(section.subsections)))" :key="grp.key">
      <div v-if="grp.type === 'columns'" class="rule-columns">
        <template v-for="sub in grp.items" :key="sub.id">
          <div v-if="sub.isSplitBlock" :id="sub.id" class="split-block">
            <RuleBody :id="sub.id" :body="sub.body" />
          </div>
          <TurnStructureDiagram v-else-if="sub.isTurnDiagram" :steps="sub.steps" />
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
        <TurnStructureDiagram v-else-if="grp.item.isTurnDiagram" :steps="grp.item.steps" />
        <GroupLabelBlock
          v-else-if="grp.item.isGroupLabel"
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
import RuleBody from '../RuleBody.vue'
import SectionTocBlock from '../SectionTocBlock.vue'
import GroupLabelBlock from '../GroupLabelBlock.vue'
import TurnStructureDiagram from './TurnStructureDiagram.vue'
import { battleRound } from '../../data/battleRound.js'
import { useBilingualSections } from '../../composables/useBilingualMerge.js'
import { chunkSubsections, splitSubsections } from '../../composables/columnChunks.js'

const sections = useBilingualSections(battleRound)

// Pull a subsection's `steps` diagram out into its own column item (same recipe as
// splitBody/isSplitBlock in columnChunks.js) — glued inside the 07.02 RuleBlock it made
// that one item too tall to balance against its neighbours across the two columns; as
// its own item, the browser's native column-balance can place it wherever fits, which in
// practice moves it into the second column. A local expansion (not columnChunks.js
// itself), since `steps` is specific to this chapter — SectionTocBlock's TOC still reads
// the original `section.subsections`, so the synthetic item never leaks into it.
function expandSteps(subs) {
  const out = []
  for (const sub of subs) {
    if (sub.steps) {
      const { steps, ...rest } = sub
      out.push(rest)
      out.push({ id: sub.id + '-diagram', sectionNum: sub.sectionNum, isTurnDiagram: true, steps })
    } else {
      out.push(sub)
    }
  }
  return out
}
</script>

<style scoped>
.split-block {
  margin-bottom: 1rem;
  scroll-margin-top: var(--header-total);
}
</style>

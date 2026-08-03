<template>
  <template v-for="section in sections" :key="section.id">
    <SectionHeader
      :id="'section-' + section.id.padStart(2,'0')"
      :num="section.num"
      :title="section.title"
      :description="section.description"
      :page="section.page"
    />

    <template
      v-for="grp in chunkSubsections(splitSubsections(section.subsections).filter(s => !s.renderAfterStratagems && !s.inline))"
      :key="grp.key"
    >
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
            :side-image="sub.sideImage"
            :children="sub.children"
          />
        </template>
      </div>

      <template v-else>
        <div v-if="grp.item.isSplitBlock" :id="grp.item.id" class="split-block">
          <RuleBody :id="grp.item.id" :body="grp.item.body" />
        </div>
        <GroupLabelBlock
          v-else-if="grp.item.isGroupLabel"
          :title="grp.item.title"
          :body="grp.item.body"
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
        />
      </template>
    </template>

    <!-- Stratagems grid for section 15 -->
    <template v-if="section.id === '15' && section.stratagems">
      <div class="stratagems-section" id="section-15-list">
        <div class="strat-grid">
          <StratCard v-for="strat in section.stratagems" :key="strat.num" :id="'strat-' + strat.num.replace('.', '-')" :strat="strat" />
        </div>
      </div>
    </template>

    <!-- Subsections rendered after stratagem grid (e.g. Snap Shooting) -->
    <template v-for="sub in section.subsections.filter(s => s.renderAfterStratagems && !s.inline)" :key="sub.id + '-after'">
      <RuleBlock
        :id="sub.id"
        :section-num="sub.sectionNum"
        :title="sub.title"
        :body="sub.body"
        :note="sub.note"
        :example="sub.example"
        :see-also="sub.seeAlso"
        :side-image="sub.sideImage"
        :children="sub.children"
      />
    </template>
  </template>
</template>

<script setup>
import SectionHeader from '../SectionHeader.vue'
import RuleBlock from '../RuleBlock.vue'
import RuleBody from '../RuleBody.vue'
import GroupLabelBlock from '../GroupLabelBlock.vue'
import StratCard from '../StratCard.vue'
import { battlefields } from '../../data/battlefields.js'
import { useBilingualSections } from '../../composables/useBilingualMerge.js'
import { chunkSubsections, splitSubsections } from '../../composables/columnChunks.js'

const sections = useBilingualSections(battlefields, (section, ruSection) =>
  section.stratagems && ruSection.stratagems
    ? { stratagems: section.stratagems.map((strat, k) => ({ ...strat, ...ruSection.stratagems[k] })) }
    : {}
)
</script>

<style scoped>
.split-block {
  margin-bottom: 1rem;
  scroll-margin-top: var(--header-total);
}

.stratagems-section {
  margin: 1.5rem 0 2rem;
}

.strat-grid {
  column-count: 2;
  column-gap: 1rem;
}

.strat-grid > * {
  break-inside: avoid;
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  .strat-grid {
    column-count: 1;
  }
}
</style>

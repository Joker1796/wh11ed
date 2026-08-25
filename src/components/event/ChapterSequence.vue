<template>
  <h2 class="chapter-heading">{{ labels.eventSequenceHeading }}</h2>
  <p class="chapter-desc">{{ labels.eventSequenceDesc }}</p>

  <p class="lead">{{ seq.intro }}</p>

  <template v-for="grp in stepChunks" :key="grp.key">
    <div v-if="grp.type === 'columns'" class="rule-columns">
      <template v-for="block in grp.items" :key="block.id">
        <RuleBlock
          :id="block.id"
          :title="block.title"
          :body="block.body"
          :note="block.note"
          :see-also="block.seeAlso"
        />
        <div v-if="block.table" class="table-section">
          <DataTable
            :title="block.table.title"
            :headers="block.table.headers"
            :rows="block.table.rows"
            :footnote="block.tableNote"
          />
        </div>
      </template>
    </div>
    <template v-else>
      <RuleBlock
        :id="grp.item.id"
        :title="grp.item.title"
        :body="grp.item.body"
        :note="grp.item.note"
        :see-also="grp.item.seeAlso"
      />
      <div v-if="grp.item.table" class="table-section">
        <DataTable
          :title="grp.item.table.title"
          :headers="grp.item.table.headers"
          :rows="grp.item.table.rows"
          :footnote="grp.item.tableNote"
        />
      </div>
    </template>
  </template>

  <h2 class="group-heading">{{ labels.eventSecondaryHeading }}</h2>
  <template v-for="grp in secondaryChunks" :key="grp.key">
    <div v-if="grp.type === 'columns'" class="rule-columns">
      <RuleBlock
        v-for="block in grp.items"
        :key="block.id"
        :id="block.id"
        :title="block.title"
        :body="block.body"
        :see-also="block.seeAlso"
      />
    </div>
    <RuleBlock
      v-else
      :id="grp.item.id"
      :title="grp.item.title"
      :body="grp.item.body"
      :see-also="grp.item.seeAlso"
    />
  </template>

  <h2 class="group-heading">{{ labels.eventDesignerHeading }}</h2>
  <template v-for="grp in designerChunks" :key="grp.key">
    <div v-if="grp.type === 'columns'" class="rule-columns">
      <RuleBlock
        v-for="block in grp.items"
        :key="block.id"
        :id="block.id"
        :title="block.title"
        :body="block.body"
        :see-also="block.seeAlso"
      />
    </div>
    <RuleBlock
      v-else
      :id="grp.item.id"
      :title="grp.item.title"
      :body="grp.item.body"
      :see-also="grp.item.seeAlso"
    />
  </template>
</template>

<script setup>
import { computed } from 'vue'
import RuleBlock from '../RuleBlock.vue'
import DataTable from '../DataTable.vue'
import { getEventContent } from '../../data/eventCompanion.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { chunkBlocks } from '../../composables/blockColumnChunks.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const ec = computed(() => getEventContent(locale.value))
const seq = computed(() => ec.value.sequence)

const stepChunks = computed(() => chunkBlocks(seq.value.blocks))
const secondaryChunks = computed(() => chunkBlocks(seq.value.secondary))
const designerChunks = computed(() => chunkBlocks(seq.value.designerNotes))
</script>

<style scoped>
.group-heading {
  font-family: var(--font-display);
  font-size: var(--fs-rule-title);
  margin: 2rem 0 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}
.table-section {
  margin: 1rem 0;
}
</style>

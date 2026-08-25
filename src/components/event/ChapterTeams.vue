<template>
  <h2 class="chapter-heading">{{ labels.eventTeamsHeading }}</h2>
  <p class="chapter-desc">{{ labels.eventTeamsDesc }}</p>

  <p class="lead">{{ teams.intro }}</p>

  <template v-for="grp in chunks" :key="grp.key">
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
const teams = computed(() => ec.value.teams)
const chunks = computed(() => chunkBlocks(teams.value.blocks))
</script>

<style scoped>
.table-section {
  margin: 1rem 0;
}
</style>

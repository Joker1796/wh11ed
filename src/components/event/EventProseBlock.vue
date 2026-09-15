<template>
  <div
    v-if="block.flavor"
    class="event-flavor"
  >
    <RuleBlock
      :id="block.id"
      :title="block.title"
      :body="block.body"
      :note="block.note"
      :see-also="block.seeAlso"
    />
  </div>
  <RuleBlock
    v-else
    :id="block.id"
    :title="block.title"
    :body="block.body"
    :note="block.note"
    :see-also="block.seeAlso"
  />
  <div
    v-if="block.table"
    class="table-section"
  >
    <DataTable
      :title="block.table.title"
      :headers="block.table.headers"
      :rows="block.table.rows"
      :footnote="block.tableNote"
    />
  </div>
</template>

<script setup>
import RuleBlock from '../RuleBlock.vue'
import DataTable from '../DataTable.vue'

// One Event Companion prose block: the RuleBlock itself, optionally wrapped in the flavor
// surface, optionally followed by its own table. Rendered by EventProseBlocks.vue.
defineProps({
  block: { type: Object, required: true },
})
</script>

<style scoped>
.table-section {
  margin: 1rem 0;
}
</style>

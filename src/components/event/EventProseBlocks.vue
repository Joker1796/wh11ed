<template>
  <template
    v-for="grp in chunks"
    :key="grp.key"
  >
    <div
      v-if="grp.type === 'columns'"
      class="rule-columns"
    >
      <EventProseBlock
        v-for="block in grp.items"
        :key="block.id"
        :block="block"
      />
    </div>
    <EventProseBlock
      v-else
      :block="grp.item"
    />
  </template>
</template>

<script setup>
import { computed } from 'vue'
import EventProseBlock from './EventProseBlock.vue'
import { chunkBlocks } from '../../composables/blockColumnChunks.js'

// The three prose chapters (Pairings, Teams, Doubles) all render the same thing: a list of
// blocks run through `chunkBlocks` for the two-column layout, each block a RuleBlock plus
// the two optional extras a block may carry — a `flavor` wrapper (Pairings' afterword) and
// a DataTable (Teams' scoring tables). They differ only in which data they pass, so the
// markup lives here once instead of being copied a third time for Doubles.
const props = defineProps({
  blocks: { type: Array, required: true },
})

const chunks = computed(() => chunkBlocks(props.blocks))
</script>

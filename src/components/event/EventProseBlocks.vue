<template>
  <div class="prose-blocks">
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
  </div>
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

<style>
/* The blocks of a prose chapter follow one another unnumbered, so RuleBlock's own 13.6px above and
   below (made for numbered rules between rules) read as a hole between paragraphs — Dominatus
   2026-10-28, the Event Companion's own chapters 2026-11-03 (owner). Three classes deep to outrank
   RuleBlock's scoped rule. */
.book-chapter .prose-blocks .rule-block { padding-block: 0.35rem; }
</style>

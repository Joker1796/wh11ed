<template>
  <span
    v-if="cards.length"
    class="rum-marks"
  >
    <i
      v-for="c in cards"
      :key="c.slug"
      class="wi"
      :class="`wi-dom-${c.kind}`"
      role="img"
      :title="c.name"
      :aria-label="c.name"
    />
  </span>
</template>

<script setup>
// The Dominatus Upgrade cards a list's unit carries, on its row: each by its deck's mark, the one
// the card prints (owner, 2026-11-05). The row is a button, so the mark only says; the card opens
// from the row.
defineProps({
  cards: { type: Array, default: () => [] }, // [{ slug, kind, name }]
})
</script>

<style scoped>
.rum-marks { display: inline-flex; align-items: center; gap: 0.2rem; vertical-align: middle; color: var(--text-primary); }
.rum-marks .wi { width: 1.15rem; height: 1.15rem; margin: 0; }
</style>

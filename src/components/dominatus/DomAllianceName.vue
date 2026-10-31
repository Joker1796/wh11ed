<template>
  <span class="dally">
    <i
      v-if="id"
      class="wi"
      :class="`wi-dom-${id}`"
      aria-hidden="true"
    />{{ name }}
  </span>
</template>

<script setup>
// An Alliance as the deck tells them apart — its emblem and its name, no colour of its own (owner,
// 2026-10-31) — wherever the campaign names one.
defineProps({
  id: { type: String, default: '' },
  name: { type: String, required: true },
})
</script>

<style scoped>
.dally { display: inline-flex; align-items: center; gap: 0.3em; white-space: nowrap; }
.dally .wi { width: 1.25em; height: 1.25em; margin: 0; flex: none; }
</style>

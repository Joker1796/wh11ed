<template>
  <span
    class="dally"
    :class="{ big }"
  >
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
  // A column's head: the emblem a step larger beside the name.
  big: { type: Boolean, default: false },
})
</script>

<style scoped>
.dally { display: inline-flex; align-items: center; gap: 0.3em; white-space: nowrap; }
.dally .wi { width: 1.25em; height: 1.25em; margin: 0; flex: none; }
.dally.big { gap: 0.4em; }
.dally.big .wi { width: 1.6em; height: 1.6em; }
</style>

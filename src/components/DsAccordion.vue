<template>
  <slot name="header" :open="open" :toggle="toggle"></slot>
  <CollapseTransition :show="!collapsible || open">
    <slot></slot>
  </CollapseTransition>
</template>

<script setup>
// Headless accordion state for one DatasheetCard info block (Abilities, Wargear, Transport,
// Composition, …) — owns no markup/CSS of its own so the caller's existing block styling
// (`.ds-ability-group`/`.ds-block`/`.ds-group-title`) is untouched; it only supplies the
// open/toggle state (via the `header` scoped slot) and the collapse transition around the body.
// When `collapsible` is false (the standalone datasheet page), the body always shows regardless
// of `open` — same as before this existed.
import { ref } from 'vue'
import CollapseTransition from './CollapseTransition.vue'

defineProps({
  collapsible: { type: Boolean, default: false },
})

const open = ref(false)
function toggle() { open.value = !open.value }
</script>

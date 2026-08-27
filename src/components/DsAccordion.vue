<template>
  <slot name="header" :open="open" :toggle="toggle"></slot>
  <CollapseTransition :show="!collapsible || open">
    <slot></slot>
  </CollapseTransition>
</template>

<script setup>
// Headless accordion state for one DatasheetCard info block (Abilities, Wargear, Transport,
// Composition, …) — owns no markup/CSS of its own so the caller's existing block styling
// (`.ds-ability-group`/`.ds-group-title`) is untouched; it only supplies the
// open/toggle state (via the `header` scoped slot) and the collapse transition around the body.
// When `collapsible` is false (the standalone datasheet page), the body always shows regardless
// of `open` — same as before this existed.
//
// It STARTS OPEN. A datasheet's blocks are what the card was opened for, and folding them away by
// default meant a tap on every one of them, every time, to read the thing you came to read — the
// standalone page has never hidden them at all. The chevron stays, so a block that has been read
// can be folded out of the way; it just isn't the state the card arrives in. The callers that hand
// this a block which is NOT the printed datasheet — the "possible modifiers" list, a detachment or
// enhancement rule's full prose — pass `:start-open="false"`, because opening those at once dumps
// several long rules on top of the card they belong to.
import { ref } from 'vue'
import CollapseTransition from './CollapseTransition.vue'

const props = defineProps({
  collapsible: { type: Boolean, default: false },
  startOpen: { type: Boolean, default: true },
})

const open = ref(props.startOpen)
function toggle() { open.value = !open.value }
</script>

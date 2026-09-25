<template>
  <div
    class="fa-themed"
    :style="accentStyle"
  >
    <slot />
  </div>
</template>

<script setup>
// Re-applies the faction-accent recipe (useFactionAccent.js, shared with RosterEditorView.vue/
// RosterCreateView.vue/RosterViewView.vue, which all set `--fa-light`/`--fa-dark` on their own
// root and fold them into `--accent` through the global `.fa-themed`) to content that's been moved out of
// that root by `<Teleport to="body">` — CSS custom properties only cascade through the actual
// DOM tree, so a Teleport'd modal escapes the ancestor `.fa-themed` wrapper and falls back to the
// site's default red `--accent` regardless of which faction it's showing. Wrap a Teleport's
// content in this so it carries its own copy of the same scoping instead.
import { toRef } from 'vue'
import { useFactionAccent } from '../../composables/useFactionAccent.js'

const props = defineProps({
  factionSlug: { type: String, default: '' },
})

const { accentStyle } = useFactionAccent(toRef(props, 'factionSlug'))
</script>

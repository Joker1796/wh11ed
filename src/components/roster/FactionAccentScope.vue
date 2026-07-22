<template>
  <div class="fas-themed" :style="accentStyle"><slot /></div>
</template>

<script setup>
// Re-applies the faction-accent recipe (see RosterEditorView.vue/RosterCreateView.vue/
// RosterViewView.vue/FactionLayout.vue, which all set `--fa-light`/`--fa-dark` on their own
// root and fold them into `--accent` via a `.themed` class) to content that's been moved out of
// that root by `<Teleport to="body">` — CSS custom properties only cascade through the actual
// DOM tree, so a Teleport'd modal escapes the ancestor `.themed` wrapper and falls back to the
// site's default red `--accent` regardless of which faction it's showing. Wrap a Teleport's
// content in this so it carries its own copy of the same scoping instead.
import { computed } from 'vue'
import { factionGroups } from '../../data/factionsIndex.js'

const props = defineProps({
  factionSlug: { type: String, default: '' },
})

const allFactions = factionGroups.flatMap((g) => g.factions)
const color = computed(() => allFactions.find((f) => f.slug === props.factionSlug)?.color)
const accentStyle = computed(() => (color.value ? { '--fa-light': color.value.light, '--fa-dark': color.value.dark } : undefined))
</script>

<style scoped>
.fas-themed {
  --accent: var(--fa-light, var(--accent));
  --accent-hover: color-mix(in srgb, var(--fa-light) 80%, black);
}
@media (prefers-color-scheme: dark) {
  .fas-themed { --accent: var(--fa-dark, var(--accent)); --accent-hover: color-mix(in srgb, var(--fa-dark) 80%, white); }
}
:root[data-theme='light'] .fas-themed { --accent: var(--fa-light, #8b2a33); --accent-hover: color-mix(in srgb, var(--fa-light) 80%, black); }
:root[data-theme='dark'] .fas-themed { --accent: var(--fa-dark, #c8585e); --accent-hover: color-mix(in srgb, var(--fa-dark) 80%, white); }
</style>

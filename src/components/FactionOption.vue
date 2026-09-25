<template>
  <span
    v-if="disabled"
    class="fac disabled"
  >
    <span class="fac-name">{{ name }}</span>
    <span class="soon">{{ labels.factionsSoon }}</span>
  </span>
  <div
    v-else
    class="fac tone tone-bar"
    :class="{ on }"
    :style="tone"
  >
    <component
      :is="to ? RouterLink : 'button'"
      class="fac-link"
      v-bind="to ? { to } : { type: 'button' }"
      @click="$emit('pick', slug)"
    >
      <span class="tone-badge">{{ entry?.abbr || '' }}</span>
      <span class="fac-name">{{ name }}</span>
      <span
        v-if="on"
        class="fac-check"
      >✓</span>
    </component>
    <FavoriteStar
      :pinned="isFactionPinned(slug)"
      @toggle="toggleFaction(slug)"
    />
  </div>
</template>

<script setup>
// One faction in a list of them — the bottom nav's Factions sheet (FactionsNavModal, a link to the
// faction's page) and the tracker's/roster's faction picker (FactionPickerModal, a pick). Both drew
// this row themselves: a bar and a monogram in the faction's own colour (the pair the faction pages
// use as their accent — thirty rows of text are told apart faster by hue than by reading), the name,
// the star that pins it to the top. The modals around it stay apart, like DetachmentOption's.
// (Said here, not above the root: a comment before it makes the component a Fragment.)
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import FavoriteStar from './FavoriteStar.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useFavorites } from '../composables/useFavorites.js'
import { factionIndexBySlug } from '../data/factionsIndex.js'

const props = defineProps({
  slug: { type: String, required: true },
  name: { type: String, required: true },
  // A link to this path, or — without one — a button emitting `pick`.
  to: { type: String, default: '' },
  on: { type: Boolean, default: false },
  // Not playable yet: no page to go to, and nothing to pin.
  disabled: { type: Boolean, default: false },
})
defineEmits(['pick'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { isFactionPinned, toggleFaction } = useFavorites()

// The colour and the monogram live in factionsIndex.js; the picker's rows come from the MFM list,
// which has neither.
const entry = computed(() => factionIndexBySlug(props.slug))
const tone = computed(() => {
  const c = entry.value?.color
  return c ? { '--tone-light': c.light, '--tone-dark': c.dark } : undefined
})
</script>

<style scoped>
.fac {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.55rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  transition: background 0.15s, border-color 0.15s;
}
.fac:has(.fac-link:hover) { border-color: var(--accent); }
.fac.on { background: color-mix(in srgb, var(--accent) 16%, transparent); border-color: var(--accent); }
.fac-link {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-align: left;
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
.fac-link:hover { text-decoration: none; }
.fac-name { flex: 1; min-width: 0; font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.fac-check { color: var(--accent); font-weight: 700; flex-shrink: 0; }
.fac.disabled { justify-content: space-between; cursor: default; opacity: 0.6; }
.fac.disabled .fac-name { flex: none; color: var(--text-dim); }

.soon {
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-dim);
  border: 1px solid var(--border);
  padding: 1px 5px;
  flex-shrink: 0;
}
</style>

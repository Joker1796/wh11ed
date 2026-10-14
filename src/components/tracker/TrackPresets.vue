<template>
  <!-- Three ready sets over the option rows (trackerOptions.js TRACK_PRESETS, owner 2026-10-14) —
       the print sheet's shape: starting points, not modes. Touch any box and the label says "your
       own set"; nothing is undone. -->
  <div
    class="tp"
    data-tour="setup-presets"
  >
    <span class="tp-label">{{ labels.trackerPresetsLabel }}</span>
    <div class="seg">
      <button
        v-for="p in TRACK_PRESETS"
        :key="p.id"
        type="button"
        :class="{ on: current === p.id }"
        @click="applyTrackPreset(settings, p.id)"
      >
        {{ labels[p.label] }}
      </button>
    </div>
    <ExpandTransition>
      <span
        v-if="!current"
        class="tp-custom"
      >{{ labels.trackerPresetCustom }}</span>
    </ExpandTransition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ExpandTransition from '../ExpandTransition.vue'
import { TRACK_PRESETS, applyTrackPreset, presetOf } from '../../data/trackerOptions.js'

const props = defineProps({
  settings: { type: Object, required: true },
  ctx: { type: Object, required: true },
  labels: { type: Object, required: true },
})
const current = computed(() => presetOf(props.settings, props.ctx))
</script>

<style scoped>
.tp { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem 0.75rem; margin: 0 0 0.9rem; }
.tp-label { font-size: 0.86rem; color: var(--text-muted); }
.tp-custom { font-size: 0.8rem; color: var(--text-dim); }
</style>

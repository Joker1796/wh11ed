<template>
  <!-- Three presets over the option rows (trackerOptions.js TRACK_PRESETS, owner 2026-10-17) —
       starting points, not modes. The label sits ABOVE the control (owner); the control is one
       button naming the preset in force, and the choice is made in a dialog that shows what the
       game screen looks like with each. Touch any box below and the button says "your own";
       nothing is undone. -->
  <div
    class="tp"
    data-tour="setup-presets"
  >
    <span class="tp-label">{{ labels.trackerPresetsLabel }}</span>
    <button
      type="button"
      class="tp-btn"
      aria-haspopup="dialog"
      @click="open = true"
    >
      <span class="tp-name">{{ current ? labels[presetById(current).label] : labels.trackerPresetCustom }}</span>
      <ChevronIcon
        class="tp-chev"
        from="right"
        to="down"
      />
    </button>

    <BaseModal
      v-if="open"
      :title="labels.trackerPresetsLabel"
      max-width="760px"
      @close="open = false"
    >
      <div class="modal-body tp-body">
        <button
          v-for="p in TRACK_PRESETS"
          :key="p.id"
          type="button"
          class="tp-card"
          :class="{ on: current === p.id }"
          :aria-pressed="current === p.id"
          @click="choose(p.id)"
        >
          <AppImage
            class="tp-shot"
            :src="`/images/tracker/preset-${p.id}-${locale}.jpg`"
            :alt="`${labels[p.label]} — ${labels.trackerPresetShot}`"
          />
          <span class="tp-text">
            <span class="tp-card-name">{{ labels[p.label] }}</span>
            <span class="tp-blurb">{{ labels[p.blurb] }}</span>
            <span class="tp-pick">
              <i
                v-if="current === p.id"
                class="wi wi-check"
                aria-hidden="true"
              />{{ current === p.id ? '' : labels.trackerPresetChoose }}
            </span>
          </span>
        </button>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseModal from '../BaseModal.vue'
import AppImage from '../AppImage.vue'
import ChevronIcon from '../ChevronIcon.vue'
import { TRACK_PRESETS, applyTrackPreset, presetOf } from '../../data/trackerOptions.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  settings: { type: Object, required: true },
  ctx: { type: Object, required: true },
  labels: { type: Object, required: true },
})
const { locale } = useLocale()
const open = ref(false)
const current = computed(() => presetOf(props.settings, props.ctx))
const presetById = (id) => TRACK_PRESETS.find((p) => p.id === id)

function choose(id) {
  applyTrackPreset(props.settings, id)
  open.value = false
}
</script>

<style scoped>
.tp { display: flex; flex-direction: column; align-items: flex-start; gap: 0.3rem; margin: 0 0 0.9rem; }
.tp-label { font-size: 0.86rem; color: var(--text-muted); }
.tp-btn {
  display: flex; align-items: center; gap: 0.5rem;
  min-height: 44px; padding: 0.4rem 0.75rem;
  border: 1px solid var(--border); background: var(--bg-secondary);
  color: var(--text-primary); font: inherit; font-weight: 600; cursor: pointer;
}
@media (hover: hover) { .tp-btn:hover { border-color: var(--accent); } }
.tp-chev { font-size: 0.75rem; color: var(--text-muted); }

.tp-body { display: grid; gap: 0.6rem; padding: 0.75rem; }
@media (min-width: 720px) { .tp-body { grid-template-columns: repeat(3, 1fr); } }
.tp-card {
  display: flex; gap: 0.75rem; align-items: flex-start;
  padding: 0.6rem; border: 1px solid var(--border); background: var(--bg-secondary);
  color: inherit; font: inherit; text-align: left; cursor: pointer;
}
@media (min-width: 720px) { .tp-card { flex-direction: column; } }
.tp-card.on { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, var(--bg-secondary)); }
@media (hover: hover) { .tp-card:hover { border-color: var(--accent); } }
.tp-card :deep(.tp-shot) { width: 38%; max-width: 180px; height: auto; flex-shrink: 0; border: 1px solid var(--border); }
@media (min-width: 720px) { .tp-card :deep(.tp-shot) { width: 100%; max-width: none; } }
.tp-text { display: flex; flex-direction: column; gap: 0.3rem; min-width: 0; }
.tp-card-name { font-family: var(--font-display); font-size: 1.2rem; font-weight: 500; }
.tp-blurb { font-size: 0.84rem; color: var(--text-muted); line-height: 1.4; }
.tp-pick { margin-top: 0.2rem; font-size: 0.84rem; font-weight: 600; color: var(--accent-ink); }
</style>

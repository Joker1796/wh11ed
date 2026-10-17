<template>
  <!-- Three presets over the option rows (trackerOptions.js TRACK_PRESETS, owner 2026-10-17) —
       starting points, not modes. The field is a "Preset" button with the preset in force named
       beside it (owner); the choice is made in a dialog that shows what the game screen looks like
       with each. Touch any box below and the name reads "your own"; nothing is undone. -->
  <div
    class="tp"
    data-tour="setup-presets"
  >
    <button
      type="button"
      class="tp-btn"
      aria-haspopup="dialog"
      @click="openDialog"
    >
      {{ labels.trackerPresetsLabel }}
      <ChevronIcon
        class="tp-chev"
        from="right"
        to="down"
      />
    </button>
    <span class="tp-name">{{ current ? labels[presetById(current).label] : labels.trackerPresetCustom }}</span>

    <BaseModal
      v-if="open"
      :title="labels.trackerPresetsLabel"
      max-width="760px"
      @close="open = false"
    >
      <div class="modal-body tp-body">
        <!-- A phone has room for one picture: the three presets are a switch over it (owner). On a
             wide screen the three stand side by side and the switch is not drawn. -->
        <div class="seg tp-seg">
          <button
            v-for="p in TRACK_PRESETS"
            :key="p.id"
            type="button"
            :class="{ on: viewed === p.id }"
            @click="viewed = p.id"
          >
            {{ labels[p.label] }}
          </button>
        </div>
        <div class="tp-cards">
          <div
            v-for="p in TRACK_PRESETS"
            :key="p.id"
            class="tp-card"
            :class="{ on: current === p.id, viewed: viewed === p.id }"
          >
            <AppImage
              class="tp-shot"
              :src="`/images/tracker/preset-${p.id}-${locale}.jpg`"
              :alt="`${labels[p.label]} — ${labels.trackerPresetShot}`"
            />
            <span class="tp-card-name">{{ labels[p.label] }}</span>
            <span class="tp-blurb">{{ labels[p.blurb] }}</span>
            <button
              type="button"
              class="tp-pick"
              :class="current === p.id ? 'btn-ghost' : 'btn-primary'"
              :aria-pressed="current === p.id"
              @click="choose(p.id)"
            >
              <i
                v-if="current === p.id"
                class="wi wi-check"
                aria-hidden="true"
              />
              {{ current === p.id ? labels[p.label] : labels.trackerPresetChoose }}
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseModal from '../BaseModal.vue'
import AppImage from '../AppImage.vue'
import ChevronIcon from '../ChevronIcon.vue'
import { TRACK_PRESETS, DEFAULT_PRESET, applyTrackPreset, presetOf } from '../../data/trackerOptions.js'
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
// The picture a phone shows: the preset in force, or the default one for "your own".
const viewed = ref(DEFAULT_PRESET)

function openDialog() {
  viewed.value = current.value || DEFAULT_PRESET
  open.value = true
}
function choose(id) {
  applyTrackPreset(props.settings, id)
  open.value = false
}
</script>

<style scoped>
.tp { display: flex; align-items: center; gap: 0.75rem; margin: 0 0 0.9rem; }
.tp-btn {
  display: flex; align-items: center; gap: 0.5rem;
  min-height: 44px; padding: 0.4rem 0.75rem;
  border: 1px solid var(--border); background: var(--bg-secondary);
  color: var(--text-primary); font: inherit; font-weight: 600; cursor: pointer;
}
@media (hover: hover) { .tp-btn:hover { border-color: var(--accent); } }
.tp-chev { font-size: 0.75rem; color: var(--text-muted); }
.tp-name { color: var(--text-muted); }

.tp-body { padding: 0.75rem; }
.tp-seg { display: flex; margin-bottom: 0.6rem; }
.tp-seg button { flex: 1 1 0; }
.tp-cards { display: grid; gap: 0.6rem; }
.tp-card {
  display: flex; flex-direction: column; gap: 0.4rem;
  padding: 0.6rem; border: 1px solid var(--border); background: var(--bg-secondary);
}
.tp-card.on { border-color: var(--accent); }
.tp-card :deep(.tp-shot) { display: block; width: 100%; height: auto; border: 1px solid var(--border); }
.tp-card-name { font-family: var(--font-display); font-size: 1.2rem; font-weight: 500; }
.tp-blurb { flex: 1 1 auto; font-size: 0.84rem; color: var(--text-muted); line-height: 1.4; }
.tp-pick { align-self: stretch; display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; }

/* A phone: the switch picks the one card shown, its picture sized to leave the button on screen.
   The name is the switch's, so the card does not repeat it. */
@media (max-width: 719px) {
  .tp-card:not(.viewed) { display: none; }
  .tp-card { padding: 0; border: none; background: none; }
  .tp-card :deep(.tp-shot) { width: auto; max-width: 100%; max-height: 52dvh; margin: 0 auto; }
  .tp-card-name { display: none; }
}
@media (min-width: 720px) {
  .tp-seg { display: none; }
  .tp-cards { grid-template-columns: repeat(3, 1fr); }
}
</style>

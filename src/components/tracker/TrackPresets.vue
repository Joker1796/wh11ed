<template>
  <!-- Three presets over the option rows (trackerOptions.js TRACK_PRESETS, owner 2026-10-17) —
       starting points, not modes. The field is a "Preset" button with the preset in force named
       beside it (owner); the choice is made in a dialog that shows what the game screen looks like
       with each (PresetDemo, drawn live). Touch any box below and the name reads "your own"; nothing is undone. -->
  <div
    class="tp"
    data-tour="setup-presets"
  >
    <span class="tp-chosen">{{ chosenLine }}</span>
    <button
      type="button"
      class="tp-btn btn-ghost"
      aria-haspopup="dialog"
      @click="openDialog"
    >
      {{ labels.trackerPresetChange }}
      <ChevronIcon
        class="tp-chev"
        from="right"
        to="down"
      />
    </button>
    <span
      v-if="current"
      class="tp-sub"
    >{{ labels[presetById(current).blurb] }}</span>

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
            <PresetDemo
              class="tp-demo"
              :values="demoValues(p)"
              aria-hidden="true"
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
import PresetDemo from './help/PresetDemo.vue'
import ChevronIcon from '../ChevronIcon.vue'
import { TRACK_PRESETS, TRACK_OPTIONS, DEFAULT_PRESET, applyTrackPreset, presetOf, trackSettingsOf } from '../../data/trackerOptions.js'

const props = defineProps({
  settings: { type: Object, required: true },
  ctx: { type: Object, required: true },
  labels: { type: Object, required: true },
  // A guest in a shared game: a preset sets and reads only this phone's own rows (`local`); the
  // host's — CP, the clock — stay as the host chose them, and the pictures show them so.
  lockShared: { type: Boolean, default: false },
})
const open = ref(false)
const scope = computed(() => ({ localOnly: props.lockShared }))
const current = computed(() => presetOf(props.settings, props.ctx, scope.value))
function demoValues(p) {
  if (!props.lockShared) return p.values
  const now = trackSettingsOf(props.settings)
  return { ...p.values, ...Object.fromEntries(TRACK_OPTIONS.filter((o) => !o.local).map((o) => [o.setting, now[o.setting]])) }
}
const presetById = (id) => TRACK_PRESETS.find((p) => p.id === id)
// The plate's line (owner, 2026-10-20: "Выбран пресет: …"), built here rather than from template
// fragments, which the compiler would join with a stray space.
const chosenLine = computed(() => props.labels.trackerPresetChosen.replace('{name}', current.value ? props.labels[presetById(current.value).label] : props.labels.trackerPresetCustom))
// The picture a phone shows: the preset in force, or the default one for "your own".
const viewed = ref(DEFAULT_PRESET)

function openDialog() {
  viewed.value = current.value || DEFAULT_PRESET
  open.value = true
}
function choose(id) {
  applyTrackPreset(props.settings, id, scope.value)
  open.value = false
}
</script>

<style scoped>
/* A plate of its own above the option groups (owner, 2026-10-20: the preset was hard to see as a
   bare row): what is chosen on the left, the way to change it inside, on the right. */
.tp {
  display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 0.35rem 0.75rem;
  margin: 0 0 0.9rem; padding: 0.75rem 1rem;
  background: var(--bg-card); border: 1px solid var(--border); border-left: 3px solid var(--accent);
}
/* The choice and Change share the first row; the blurb runs the plate's full width under them
   (owner, 2026-10-20: squeezed beside the button it took four lines on a phone). */
.tp-chosen { font-weight: 600; color: var(--text-primary); }
.tp-sub { grid-column: 1 / -1; font-size: 0.84rem; line-height: 1.35; color: var(--text-muted); }
.tp-btn { flex: none; display: inline-flex; align-items: center; gap: 0.4rem; min-height: 44px; }
.tp-chev { font-size: 0.75rem; }

.tp-body { padding: 0.75rem; }
.tp-seg { display: flex; width: 100%; margin-bottom: 0.6rem; }
.tp-seg button { flex: 1 1 0; min-width: 0; padding-inline: 0.35rem; }
/* 320px: "Максимальный" is the longest name and must fit a third of the dialog. */
@media (max-width: 359px) { .tp-seg button { padding-inline: 0.15rem; font-size: 0.76rem; } }
.tp-cards { display: grid; gap: 0.6rem; }
.tp-card {
  display: flex; flex-direction: column; gap: 0.4rem; min-width: 0;
  padding: 0.6rem; border: 1px solid var(--border); background: var(--bg-secondary);
}
.tp-card.on { border-color: var(--accent); box-shadow: inset 0 0 0 1px var(--accent); background: color-mix(in srgb, var(--accent) 8%, var(--bg-secondary)); }
.tp-demo { min-width: 0; padding: 0.5rem; border: 1px solid var(--border); background: var(--bg-primary); }
.tp-card-name { font-family: var(--font-display); font-size: 1.2rem; font-weight: 500; }
.tp-blurb { flex: 1 1 auto; font-size: 0.84rem; color: var(--text-muted); line-height: 1.4; }
.tp-pick { align-self: stretch; display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; }

/* A phone: the switch picks the one card shown, its picture sized to leave the button on screen.
   The name is the switch's, so the card does not repeat it. */
@media (max-width: 719px) {
  .tp-card:not(.viewed) { display: none; }
  .tp-card { padding: 0; border: none; background: none; }
  /* One card on screen: its button says it is the one in force; a frame here pressed on the text. */
  .tp-card.on { box-shadow: none; background: none; }
  .tp-card-name { display: none; }
}
@media (min-width: 720px) {
  .tp-seg { display: none; }
  .tp-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
</style>

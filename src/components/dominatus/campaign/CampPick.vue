<template>
  <AdaptivePicker
    v-model:open="open"
    class="cpick"
    :title="title || placeholder"
    :panel-width="panelWidth"
  >
    <template #trigger="{ toggle }">
      <button
        type="button"
        class="form-input cpick-trigger"
        :class="{ empty: !shown }"
        :disabled="disabled"
        :aria-expanded="open"
        aria-haspopup="dialog"
        @click="toggle"
      >
        <slot name="lead" />
        <span class="cpick-value">{{ shown || placeholder }}</span>
        <i class="wi wi-chevron-down" />
      </button>
    </template>
    <template #default="{ bodyClass, close, compact }">
      <!-- A list of its own (the factions) in place of the rows; it calls `pick`. -->
      <slot
        name="list"
        v-bind="{ bodyClass, compact, pick: (v) => { model = v; close() } }"
      />
      <div
        v-if="!$slots.list"
        class="act-list"
        :class="[bodyClass, { 'act-compact': compact }]"
      >
        <button
          v-for="o in options"
          :key="String(o.value)"
          type="button"
          class="act-btn"
          :class="{ on: o.value === model }"
          @click="model = o.value; close()"
        >
          <span
            v-if="o.sub"
            class="cpick-two"
          ><span>{{ o.label }}</span><span class="cpick-sub">{{ o.sub }}</span></span>
          <template v-else>
            {{ o.label }}
          </template>
        </button>
      </div>
    </template>
  </AdaptivePicker>
</template>

<script setup>
// A pick from a short list on the campaign pages — a player, a card, a campaign: the app's picker
// (AdaptivePicker: a dropdown on a desk, a sheet on a phone) in place of the browser's own select,
// the rows the "…" menus draw (`.act-list`). `options` = [{ value, label, sub? }] — `sub` a muted second line (a player's Alliance and faction).
import { ref, computed } from 'vue'
import AdaptivePicker from '../../AdaptivePicker.vue'

const props = defineProps({
  options: { type: Array, required: true },
  placeholder: { type: String, default: '—' },
  title: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  panelWidth: { type: String, default: '20rem' },
  // What the trigger says when the value is not one of `options` (a list of its own, `#list`).
  label: { type: String, default: '' },
})
const model = defineModel({ type: [String, Number, null], default: null })
const open = ref(false)
const current = computed(() => props.options.find((o) => o.value === model.value) || null)
const shown = computed(() => props.label || current.value?.label || '')
</script>

<style scoped>
.cpick { min-width: 0; }
.cpick-trigger {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  width: 100%;
  padding-right: 0.6rem;
  text-align: left;
  cursor: pointer;
}
/* The chevron as the app's other picker fields draw it (RosterBattleSizeField): small, dim, off the edge. */
.cpick-trigger .wi { flex-shrink: 0; margin: 0; font-size: 0.7rem; color: var(--text-dim); }
.cpick-trigger:disabled { opacity: 0.5; cursor: default; }
.cpick-value { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cpick-trigger.empty .cpick-value { color: var(--text-muted); }
.act-btn.on { border-color: var(--accent); color: var(--accent-ink); }
</style>

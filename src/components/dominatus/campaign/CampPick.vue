<template>
  <AdaptivePicker
    v-model:open="open"
    class="cpick"
    :title="title || placeholder"
    panel-width="20rem"
  >
    <template #trigger="{ toggle }">
      <button
        type="button"
        class="form-input cpick-trigger"
        :class="{ empty: !current }"
        :disabled="disabled"
        :aria-expanded="open"
        aria-haspopup="dialog"
        @click="toggle"
      >
        <span class="cpick-value">{{ current ? current.label : placeholder }}</span>
        <i class="wi wi-chevron-down" />
      </button>
    </template>
    <template #default="{ bodyClass, close, compact }">
      <div
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
          {{ o.label }}
        </button>
      </div>
    </template>
  </AdaptivePicker>
</template>

<script setup>
// A pick from a short list on the campaign pages — a player, a card, a campaign: the app's picker
// (AdaptivePicker: a dropdown on a desk, a sheet on a phone) in place of the browser's own select,
// the rows the "…" menus draw (`.act-list`). `options` = [{ value, label }].
import { ref, computed } from 'vue'
import AdaptivePicker from '../../AdaptivePicker.vue'

const props = defineProps({
  options: { type: Array, required: true },
  placeholder: { type: String, default: '—' },
  title: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})
const model = defineModel({ type: [String, Number, null], default: null })
const open = ref(false)
const current = computed(() => props.options.find((o) => o.value === model.value) || null)
</script>

<style scoped>
.cpick { min-width: 0; }
.cpick-trigger {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  text-align: left;
  cursor: pointer;
}
.cpick-trigger:disabled { opacity: 0.5; cursor: default; }
.cpick-value { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cpick-trigger.empty .cpick-value { color: var(--text-muted); }
.act-btn.on { border-color: var(--accent); color: var(--accent-ink); }
</style>

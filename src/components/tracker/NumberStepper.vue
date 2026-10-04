<template>
  <div class="stepper">
    <button
      class="step-btn"
      data-press
      :disabled="disabled || modelValue <= min"
      :aria-label="labels.ariaDecrease"
      @click="bump(-step)"
    >
      −
    </button>
    <!-- The number rolls like a counter wheel: up for more, down for less (2026-09-28).
         `editable` makes it a button that turns into a field for a number typed outright — a
         custom points limit is 1500, not thirty taps of +50 (roster builder, 2026-10-03). -->
    <input
      v-if="editing"
      ref="inputEl"
      class="step-input"
      type="number"
      inputmode="numeric"
      :min="min"
      :max="max ?? undefined"
      :step="step"
      :aria-label="label"
      :value="modelValue"
      @keydown.enter.prevent="commit($event.target.value)"
      @keydown.esc="editing = false"
      @blur="commit($event.target.value)"
    >
    <component
      :is="editable ? 'button' : 'span'"
      v-else
      ref="valEl"
      class="step-val"
      :class="{ 'step-edit': editable }"
      :type="editable ? 'button' : undefined"
      :aria-label="editable ? label : undefined"
      @click="editable && startEdit()"
    >
      <Transition :name="roll">
        <span
          :key="modelValue"
          class="step-num"
        >{{ modelValue }}</span>
      </Transition>
    </component>
    <span
      v-if="unit"
      class="step-unit"
    >{{ unit }}</span>
    <button
      class="step-btn"
      data-press
      :disabled="disabled || (max != null && modelValue >= max)"
      :aria-label="labels.ariaIncrease"
      @click="bump(step)"
    >
      +
    </button>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useFlashOnChange } from '../../composables/useFlashOnChange.js'

const props = defineProps({
  modelValue: { type: Number, required: true },
  min: { type: Number, default: 0 },
  max: { type: Number, default: null },
  step: { type: Number, default: 1 },
  // Both ends off, value still readable — for a control shown for context rather than for use
  // (a wargear group the roster editor has greyed out, keeping its current pick visible).
  disabled: { type: Boolean, default: false },
  // The number can be typed as well as stepped (a tap on it opens a field); `label` names it for
  // that field, and `unit` is printed after it.
  editable: { type: Boolean, default: false },
  label: { type: String, default: '' },
  unit: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const valEl = ref(null)
useFlashOnChange(() => props.modelValue, valEl)

// Which way the wheel turns, decided before the new number renders (a `pre` watcher).
const roll = ref('roll-up')
watch(() => props.modelValue, (to, from) => { roll.value = to < from ? 'roll-down' : 'roll-up' })

function clamp(v) {
  if (v < props.min) v = props.min
  if (props.max != null && v > props.max) v = props.max
  return v
}
function bump(delta) {
  emit('update:modelValue', clamp(props.modelValue + delta))
}

const editing = ref(false)
const inputEl = ref(null)
function startEdit() {
  if (props.disabled) return
  editing.value = true
  nextTick(() => { inputEl.value?.focus(); inputEl.value?.select() })
}
function commit(raw) {
  if (!editing.value) return
  editing.value = false
  const v = Math.round(Number(raw))
  if (Number.isFinite(v) && raw !== '') emit('update:modelValue', clamp(v))
}
defineExpose({ focus: () => (props.editable ? startEdit() : undefined) })
</script>

<style scoped>
.stepper {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
.step-btn {
  width: 40px;
  height: 40px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.step-btn:hover:not(:disabled) {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}
.step-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
/* The old and the new number share one cell (grid stacking) while they pass each other, and the
   cell clips them, so the roll never pushes the buttons apart. */
.step-val {
  display: inline-grid;
  overflow: hidden;
  min-width: 2.2ch;
  text-align: center;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-primary);
}
.step-num { grid-area: 1 / 1; }
/* The tappable number of an `editable` stepper, and the field it turns into: the same cell. */
.step-edit {
  padding: 0 0.15rem;
  background: none;
  border: none;
  border-bottom: 1px dashed var(--border);
  cursor: text;
}
.step-input {
  width: 5ch;
  height: 40px;
  padding: 0 0.2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--accent);
  font: inherit;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-primary);
  text-align: center;
  appearance: textfield;
  -moz-appearance: textfield;
}
.step-input::-webkit-inner-spin-button,
.step-input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.step-input:focus { outline: none; }
.step-unit { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-right: 0.15rem; }
.roll-up-enter-active, .roll-up-leave-active,
.roll-down-enter-active, .roll-down-leave-active {
  transition: transform var(--motion-fast) ease-out, opacity var(--motion-fast) ease-out;
}
.roll-up-enter-from, .roll-down-leave-to { transform: translateY(100%); opacity: 0; }
.roll-up-leave-to, .roll-down-enter-from { transform: translateY(-100%); opacity: 0; }
</style>

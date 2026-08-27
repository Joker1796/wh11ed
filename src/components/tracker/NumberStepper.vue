<template>
  <div class="stepper">
    <button class="step-btn" :disabled="disabled || modelValue <= min" @click="bump(-step)" :aria-label="labels.ariaDecrease">−</button>
    <span ref="valEl" class="step-val">{{ modelValue }}</span>
    <button class="step-btn" :disabled="disabled || (max != null && modelValue >= max)" @click="bump(step)" :aria-label="labels.ariaIncrease">+</button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
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
})
const emit = defineEmits(['update:modelValue'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const valEl = ref(null)
useFlashOnChange(() => props.modelValue, valEl)

function bump(delta) {
  let v = props.modelValue + delta
  if (v < props.min) v = props.min
  if (props.max != null && v > props.max) v = props.max
  emit('update:modelValue', v)
}
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
.step-val {
  min-width: 2.2ch;
  text-align: center;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-primary);
}
</style>

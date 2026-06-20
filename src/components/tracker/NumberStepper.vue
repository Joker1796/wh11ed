<template>
  <div class="stepper">
    <button class="step-btn" :disabled="modelValue <= min" @click="bump(-step)" aria-label="decrease">−</button>
    <span class="step-val">{{ modelValue }}</span>
    <button class="step-btn" :disabled="max != null && modelValue >= max" @click="bump(step)" aria-label="increase">+</button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Number, required: true },
  min: { type: Number, default: 0 },
  max: { type: Number, default: null },
  step: { type: Number, default: 1 },
})
const emit = defineEmits(['update:modelValue'])

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
  width: 32px;
  height: 32px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-primary);
  border-radius: 4px;
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

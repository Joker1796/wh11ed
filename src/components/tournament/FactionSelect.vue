<template>
  <select class="faction-select" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
    <option value="">{{ labels.tFactionPick }}</option>
    <option v-for="f in factions40k" :key="f" :value="f">{{ f }}</option>
  </select>
</template>

<script setup>
import { computed } from 'vue'
import { factions40k } from '../../data/factions40k.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

defineProps({ modelValue: { type: String, default: '' } })
defineEmits(['update:modelValue'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.faction-select {
  width: 100%;
  padding: 0.4rem 0.5rem;
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: 4px;
  font-family: var(--font-sans);
  font-size: 0.85rem;
}
.faction-select:focus {
  outline: none;
  border-color: var(--accent);
}
</style>

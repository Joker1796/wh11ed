<template>
  <div class="field camp-field">
    <span>{{ label }}<CampHelpButton @click="emit('help')" /></span>
    <div class="seg camp-set-seg">
      <button
        v-for="o in options"
        :key="String(o.value)"
        type="button"
        :class="{ on: model === o.value }"
        @click="model = o.value"
      >
        {{ o.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
// One either/or of the campaign's settings, as the game's setup draws one (owner, 2026-11-04: the
// two forms read as one family): its caption with the "?" in it, then the choices as a joined
// control across the card's width. `options` = [{ value, label }].
import CampHelpButton from './CampHelpButton.vue'

defineProps({
  label: { type: String, required: true },
  options: { type: Array, required: true },
})
const emit = defineEmits(['help'])
const model = defineModel({ type: [String, Boolean, Number, null], default: null })
</script>

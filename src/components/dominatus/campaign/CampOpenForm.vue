<template>
  <ExpandTransition mode="out-in">
    <button
      v-if="!open"
      key="button"
      type="button"
      :class="[primary ? 'btn-primary' : 'btn-ghost', 'copen-btn']"
      @click="open = true"
    >
      {{ label }}
    </button>
    <div
      v-else
      key="form"
      class="copen-form"
    >
      <slot :close="close" />
    </div>
  </ExpandTransition>
</template>

<script setup>
// A form on the campaign pages that waits behind its button (owner, 2026-11-01: a new campaign, a
// player, a battle): the button gives way to the form, which hands its slot `close` for Cancel and
// for after it is sent.
import { ref } from 'vue'
import ExpandTransition from '../../ExpandTransition.vue'

defineProps({
  label: { type: String, required: true },
  primary: { type: Boolean, default: false },
})
const open = ref(false)
const close = () => { open.value = false }
</script>

<style scoped>
.copen-btn { margin-top: 0.6rem; }
</style>

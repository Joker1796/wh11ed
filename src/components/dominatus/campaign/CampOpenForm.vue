<template>
  <div class="copen">
    <button
      type="button"
      :class="[primary ? 'btn-primary' : 'btn-ghost', 'copen-btn']"
      aria-haspopup="dialog"
      @click="open = true"
    >
      {{ label }}
    </button>
    <BaseModal
      v-if="open"
      :title="label"
      @close="close"
    >
      <div class="modal-body copen-body">
        <slot :close="close" />
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
// A form on the campaign pages behind its button, in a dialog (owner, 2026-11-01: a new campaign,
// a player, a battle): the slot gets `close`, called once the form is sent. One root element (no
// comment before it), so a parent's class lands on it.
import { ref } from 'vue'
import BaseModal from '../../BaseModal.vue'

defineProps({
  label: { type: String, required: true },
  primary: { type: Boolean, default: false },
})
const open = ref(false)
const close = () => { open.value = false }
</script>

<style scoped>
.copen { margin-top: 0.6rem; }
.copen-body { padding: 0.9rem 1rem 1.1rem; }
</style>

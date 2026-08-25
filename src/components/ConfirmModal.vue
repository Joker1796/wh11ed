<template>
  <BaseModal :title="title" max-width="420px" @close="$emit('close')">
    <div class="modal-body">
      <p class="cm-message">{{ message }}</p>
    </div>

    <footer class="modal-foot">
      <button class="btn-ghost" @click="$emit('close')">{{ cancelLabel }}</button>
      <button class="btn-primary" @click="$emit('confirm')">{{ confirmLabel }}</button>
    </footer>
  </BaseModal>
</template>

<script setup>
// Reusable yes/no confirmation dialog — the project standard in place of window.confirm().
// Wraps BaseModal (overlay, Escape-to-close, focus trap/restore via useModalA11y). The
// parent owns the decision: it shows this with v-if and runs its action on @confirm.
import BaseModal from './BaseModal.vue'

defineProps({
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  confirmLabel: { type: String, required: true },
  cancelLabel: { type: String, required: true },
})
defineEmits(['confirm', 'close'])
</script>

<style scoped>
.cm-message { margin: 0; font-size: 0.95rem; line-height: 1.5; color: var(--text-primary); }

.modal-foot { display: flex; gap: 0.6rem; padding: 0.7rem 0.9rem; border-top: 1px solid var(--border); }
/* Both halves of a confirm dialog's footer share the row evenly and are sized for a thumb —
   the rest of the look is the global one (style.css, "Buttons"). */
.btn-primary,
.btn-ghost {
  flex: 1;
  min-height: 46px;
  justify-content: center;
}
</style>

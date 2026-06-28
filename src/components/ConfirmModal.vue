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
.modal-body { padding: 0.6rem 0.9rem 0.9rem; }
.cm-message { margin: 0; font-size: 0.95rem; line-height: 1.5; color: var(--text-primary); }

.modal-foot { display: flex; gap: 0.6rem; padding: 0.7rem 0.9rem; border-top: 1px solid var(--border); }
.btn-primary {
  flex: 1;
  min-height: 46px;
  padding: 0.7rem 1rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
}
.btn-primary:hover { background: var(--accent-hover); }
.btn-ghost {
  flex: 1;
  min-height: 46px;
  padding: 0.7rem 1rem;
  background: none;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}
.btn-ghost:hover { border-color: var(--accent); color: var(--text-primary); }
</style>

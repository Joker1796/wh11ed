<template>
  <BaseModal
    :title="title"
    max-width="420px"
    @close="$emit('close')"
  >
    <div class="modal-body">
      <!-- The slot is for a message that needs markup — a link to what the question is about. -->
      <p class="cm-message">
        <slot>{{ message }}</slot>
      </p>
    </div>

    <footer class="modal-foot">
      <button
        class="btn-ghost"
        @click="$emit('close')"
      >
        {{ cancelLabel }}
      </button>
      <button
        class="btn-primary"
        :class="{ 'cm-danger': danger }"
        @click="$emit('confirm')"
      >
        {{ confirmLabel }}
      </button>
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
  // A step that cannot be taken back (cutting a phone off a game): the button wears --danger, not
  // the accent — inside a game the accent is a side's colour and read as a plain go-ahead.
  danger: { type: Boolean, default: false },
})
defineEmits(['confirm', 'close'])
</script>

<style scoped>
.cm-danger { background: var(--danger); border-color: var(--danger); color: var(--bg-card); }
@media (hover: hover) { .cm-danger:hover { background: color-mix(in srgb, var(--danger) 85%, black); border-color: var(--danger); } }
/* pre-line: a message may be a list, one line per item (GameSetup's list-does-not-fit warning). */
.cm-message { margin: 0; font-size: 0.95rem; line-height: 1.5; color: var(--text-primary); white-space: pre-line; }

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

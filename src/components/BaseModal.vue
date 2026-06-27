<template>
  <div class="modal-overlay" :style="{ zIndex }" @click.self="$emit('close')">
    <div
      ref="root"
      class="modal"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="title ? titleId : undefined"
      tabindex="-1"
      :style="{ '--modal-max-w': maxWidth, '--modal-max-h': maxHeight }"
    >
      <!-- Custom header: the consumer supplies its own <header class="modal-head"> -->
      <slot v-if="$slots.header" name="header" :close="() => $emit('close')" />
      <!-- Default header: title + close -->
      <header v-else-if="title" class="modal-head">
        <h3 :id="titleId" class="mh-title">{{ title }}</h3>
        <button class="mh-close" @click="$emit('close')" :aria-label="labels.modalClose">✕</button>
      </header>

      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, useId } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useModalA11y } from '../composables/useModalA11y.js'

defineProps({
  title: { type: String, default: '' },
  maxWidth: { type: String, default: '520px' },
  maxHeight: { type: String, default: '85vh' },
  zIndex: { type: Number, default: 400 },
})
const emit = defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const titleId = useId()

const root = ref(null)
useModalA11y(root, () => emit('close'))
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 400;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.modal {
  width: 100%;
  max-width: var(--modal-max-w, 520px);
  max-height: var(--modal-max-h, 85vh);
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  overflow: hidden;
}
.modal:focus { outline: none; }
/* Default header (custom headers carry their own .modal-head in the consumer's scope). */
.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.8rem 0.9rem;
  border-bottom: 1px solid var(--border);
}
.mh-title { font-family: var(--font-serif); font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin: 0; }
.mh-close {
  background: none; border: none; color: var(--text-muted);
  font-size: 1.1rem; cursor: pointer; min-width: 36px; min-height: 36px; border-radius: 4px;
}
.mh-close:hover { background: color-mix(in srgb, var(--text-primary) 8%, transparent); color: var(--text-primary); }

@media (max-width: 560px) {
  .modal-overlay { padding: 0; align-items: flex-end; }
  .modal { max-width: 100%; max-height: 92vh; border-radius: 12px 12px 0 0; }
}
</style>

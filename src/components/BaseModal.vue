<template>
  <!-- Teleported to <body>: consumers can be mounted anywhere, including inside components
       that establish their own stacking context (position: sticky/fixed + z-index,
       transform, ...) — without this, the modal's z-index only wins locally within that
       ancestor's context and can end up rendered under unrelated fixed UI (e.g. the
       tracker's "resume game" bar) despite nominally having a higher z-index. -->
  <Teleport to="body">
  <!-- Enter-only transition (`appear` — consumers mount the modal with their own v-if).
       Close stays instant: a leave phase would have to outlive the consumer's v-if and
       would race useModalA11y's focus restore. -->
  <Transition name="modal" appear>
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
      <!-- Custom header: the consumer supplies its own <header class="modal-head">, and gets the
           shared look for free — the chrome classes are global (style.css), not scoped here.
           Prefer `title` when the header is only a heading and a close button; this slot is for
           the ones that carry more (a subtitle, a VP counter). -->
      <slot v-if="$slots.header" name="header" :close="() => $emit('close')" />
      <!-- Default header: title + close -->
      <header v-else-if="title" class="modal-head">
        <h3 :id="titleId" class="mh-title">{{ title }}</h3>
        <button class="mh-close" @click="$emit('close')" :aria-label="labels.modalClose">✕</button>
      </header>

      <slot />
    </div>
  </div>
  </Transition>
  </Teleport>
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
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  overflow: hidden;
}
.modal:focus { outline: none; }
/* .modal-head / .mh-title / .mh-close are global (style.css, "Modal chrome") rather than scoped
   here: a consumer's own #header renders in ITS scope, which these rules would never reach. */

@media (max-width: 560px) {
  .modal-overlay { padding: 0; align-items: flex-end; }
  /* The only rounded corners in the app: on a phone the modal is a sheet that slides up from
     the bottom edge, and the rounded top is what says so. */
  .modal { max-width: 100%; max-height: 92vh; border-radius: 12px 12px 0 0; }
}

/* Enter animation: the backdrop color fades in while the dialog scales in (slides up as
   a bottom sheet on phones). Only background-color and transform animate — never the
   dialog's opacity: useModalA11y focuses the dialog in a rAF right after mount, and iOS
   VoiceOver mishandles focus moved into a not-yet-visible element. Durations come from
   the motion tokens, so prefers-reduced-motion zeroes them and the modal appears instantly. */
.modal-enter-active { transition: background-color var(--motion-med) ease; }
.modal-enter-active .modal { transition: transform var(--motion-med) ease; }
.modal-enter-from { background-color: transparent; }
.modal-enter-from .modal { transform: scale(0.96); }

@media (max-width: 560px) {
  .modal-enter-from .modal { transform: translateY(28px); }
}
</style>

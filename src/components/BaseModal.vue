<template>
  <!-- Teleported to <body>: consumers can be mounted anywhere, including inside components
       that establish their own stacking context (position: sticky/fixed + z-index,
       transform, ...) — without this, the modal's z-index only wins locally within that
       ancestor's context and can end up rendered under unrelated fixed UI (e.g. the
       tracker's "resume game" bar) despite nominally having a higher z-index. -->
  <Teleport to="body">
    <!-- The entrance (`appear` — consumers mount the modal with their own v-if). The exit is
         played by a copy (modalLeave.js): the dialog itself goes at once, as a v-if wants, and
         focus returns with nothing of it left to reach. -->
    <Transition
      name="modal"
      appear
    >
      <!-- The opening screen's scope (modalScope.js) rides on the overlay: the game screen's turn
           colour, for one. -->
      <div
        ref="overlay"
        class="modal-overlay"
        :class="[scope?.class, { 'modal-swap': swap }]"
        :style="[{ zIndex }, scope?.style]"
        @click.self="$emit('close')"
      >
        <div
          ref="root"
          class="modal"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title || $slots.header ? titleId : undefined"
          tabindex="-1"
          :style="{ '--modal-max-w': maxWidth, '--modal-max-h': maxHeight }"
        >
          <!-- Custom header: the consumer supplies its own <header class="modal-head">, and gets the
           shared look for free — the chrome classes are global (style.css), not scoped here.
           Almost never needed: `title` + `subtitle` + the `#aside` slot cover every dialog the
           app has, and a custom header has to wire its own accessible name (`titleId`). -->
          <slot
            v-if="$slots.header"
            name="header"
            :close="() => $emit('close')"
            :title-id="titleId"
          />
          <!-- Default header: title (and a subtitle under it), whatever the dialog shows beside
               the close button (`#aside` — a counter, a VP total, a toggle), then close. -->
          <header
            v-else-if="title"
            class="modal-head"
            :class="{ 'two-line': subtitle || $slots.subtitle || dense, dense }"
          >
            <div
              v-if="subtitle || $slots.subtitle"
              class="mh-text"
            >
              <h3
                :id="titleId"
                class="mh-title"
              >
                {{ title }}
              </h3>
              <!-- `#subtitle` for a subtitle that needs markup (coloured names); plain text otherwise. -->
              <p class="mh-sub">
                <slot name="subtitle">
                  {{ subtitle }}
                </slot>
              </p>
            </div>
            <h3
              v-else
              :id="titleId"
              class="mh-title"
            >
              {{ title }}
            </h3>
            <div
              v-if="$slots.aside"
              class="mh-right"
            >
              <slot name="aside" />
              <button
                class="mh-close"
                data-press
                :aria-label="labels.modalClose"
                @click="$emit('close')"
              >
                ✕
              </button>
            </div>
            <button
              v-else
              class="mh-close"
              data-press
              :aria-label="labels.modalClose"
              @click="$emit('close')"
            >
              ✕
            </button>
          </header>

          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, useId } from 'vue'
import { useModalScope } from '../composables/modalScope.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useModalA11y } from '../composables/useModalA11y.js'
import { playSound } from '../composables/uiSound.js'
import { leaveCopy, swapping, handOver } from '../composables/modalLeave.js'

const props = defineProps({
  title: { type: String, default: '' },
  // A second line under the title — a date, what the dialog is about. Two lines align to the top.
  subtitle: { type: String, default: '' },
  // The denser header: a 32px close button, aligned to the top so a title that wraps (a player's
  // own roster name) keeps the button beside its first line.
  dense: { type: Boolean, default: false },
  maxWidth: { type: String, default: '520px' },
  maxHeight: { type: String, default: '85dvh' },
  zIndex: { type: Number, default: 400 },
  // A CSS selector inside the dialog to focus on open, for a dialog that exists to take input
  // (the roster import's paste box). Otherwise the dialog itself takes focus.
  initialFocus: { type: String, default: '' },
})
const scope = useModalScope()
const emit = defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const titleId = useId()

const root = ref(null)
useModalA11y(root, () => emit('close'), { initialFocus: props.initialFocus })
// A dialog slides in and out with the segmented switch's sound (uiSound.js; owner, 2026-10-08).
// Mounted is opened and unmounted is closed: no dialog is kept built behind a v-show.
// One dialog opening as another leaves is a swap: the dim behind them stays (modalLeave.js).
const overlay = ref(null)
const swap = swapping()
onMounted(() => {
  playSound('seg')
  if (swap) handOver()
})
onBeforeUnmount(() => {
  playSound('seg')
  leaveCopy(overlay.value)
})
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
/* Heights are in `dvh`, never `vh`. On iOS `vh` is the LARGE viewport — the page as it would be
   with Safari's toolbars retracted — while the fixed overlay above is laid out against what is
   actually on screen. A dialog capped in `vh` is therefore taller than the space it has, and
   since a phone aligns it to the bottom edge, what goes off the screen is its top: the title and
   the close button. `dvh` caps it at what the reader can see. */
.modal {
  width: 100%;
  max-width: var(--modal-max-w, 520px);
  max-height: var(--modal-max-h, 85dvh);
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
  .modal { max-width: 100%; max-height: 92dvh; border-radius: 12px 12px 0 0; }
}

/* Enter animation: the backdrop color fades in while the dialog scales in (slides up as
   a bottom sheet on phones). Only background-color and transform animate — never the
   dialog's opacity: useModalA11y focuses the dialog in a rAF right after mount, and iOS
   VoiceOver mishandles focus moved into a not-yet-visible element. Durations come from
   the motion tokens, so prefers-reduced-motion zeroes them and the modal appears instantly. */
/* `--motion-slow` and a decelerating curve (2026-09-28): at `--motion-med` with a 28px lift the
   sheet read as simply appearing. On a phone it now rises from below the screen edge, whole, as
   the system sheets do; wider, it grows in from 0.94. */
.modal-enter-active { transition: background-color var(--motion-slow) ease; }
.modal-enter-active .modal { transition: transform var(--motion-slow) cubic-bezier(0.2, 0.8, 0.2, 1); }
.modal-enter-from:not(.modal-swap) { background-color: transparent; }
.modal-enter-from .modal { transform: scale(0.94); }

@media (max-width: 560px) {
  .modal-enter-from .modal { transform: translateY(100%); }
}
</style>

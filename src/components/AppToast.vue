<template>
  <Transition name="toast-slide">
    <div
      v-if="show"
      class="app-toast"
      :class="{ err: tone === 'error' }"
      role="status"
      aria-live="polite"
    >
      <i
        v-if="icon"
        :class="['bi', icon, 'toast-icon']"
      />
      <span class="toast-text">{{ text }}</span>
      <button
        class="toast-close"
        :aria-label="labels.updateDismiss"
        @click="$emit('close')"
      >
        <i class="bi bi-x" />
      </button>
    </div>
  </Transition>
</template>

<script setup>
// A one-line notice at the bottom of the screen, above the phone's bottom nav — the shell the
// offline warm-up and the roster's cloud save both use (2026-09-24, when the second one arrived and
// the first one's markup was about to be copied). It only draws: whether it shows, and for how long,
// is the caller's.
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'

defineProps({
  show: { type: Boolean, default: false },
  text: { type: String, default: '' },
  icon: { type: String, default: '' },
  // 'error' reads in the danger colour; anything else is the accent.
  tone: { type: String, default: '' },
})
defineEmits(['close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.app-toast {
  position: fixed;
  left: 50%;
  bottom: calc(1rem + var(--safe-bottom, 0px));
  transform: translateX(-50%);
  z-index: 390;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  max-width: calc(100vw - 2rem);
  padding: 0.55rem 0.7rem 0.55rem 0.9rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
  font-size: 0.82rem;
  color: var(--text-primary);
}
.toast-icon {
  color: var(--accent);
  font-size: 1rem;
  flex-shrink: 0;
}
.app-toast.err .toast-icon,
.app-toast.err .toast-text { color: var(--danger); }
.toast-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.toast-close {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.1rem;
}
@media (hover: hover) { .toast-close:hover { color: var(--text-primary); } }
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: opacity var(--motion-med) ease, transform var(--motion-med) ease;
}
.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 1rem);
}
/* On a phone the fixed bottom nav (~4.5rem) and the utility bar are there — sit above both. */
@media (max-width: 900px) {
  .app-toast {
    bottom: calc(5.25rem + var(--safe-bottom, 0px) + var(--mobile-bar-h, 0px));
  }
}
</style>

<template>
  <Transition name="ut-slide">
    <div v-if="needRefresh" class="update-toast" role="status" aria-live="polite">
      <i class="bi bi-arrow-clockwise ut-icon"></i>
      <span class="ut-text">{{ labels.updateAvailable }}</span>
      <button class="ut-update" @click="updateServiceWorker(true)">{{ labels.updateNow }}</button>
      <button class="ut-close" @click="needRefresh = false" :aria-label="labels.updateDismiss">
        <i class="bi bi-x"></i>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// registerType is 'prompt' (vite.config.js): the SW activates only when the user
// clicks Update, so we never auto-reload mid-game. needRefresh flips to true once a
// new SW has finished installing in the background; updateServiceWorker(true) applies
// it and reloads the page.
const { needRefresh, updateServiceWorker } = useRegisterSW()
</script>

<style scoped>
.update-toast {
  position: fixed;
  left: 50%;
  bottom: calc(1rem + env(safe-area-inset-bottom));
  transform: translateX(-50%);
  z-index: 400;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  max-width: calc(100vw - 2rem);
  padding: 0.6rem 0.7rem 0.6rem 0.9rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
  font-size: 0.85rem;
  color: var(--text-primary);
}

.ut-icon {
  color: var(--accent);
  font-size: 1rem;
  flex-shrink: 0;
}

.ut-text {
  flex: 1;
  white-space: nowrap;
}

.ut-update {
  flex-shrink: 0;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.4rem 0.8rem;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.15s;
}

.ut-update:hover {
  filter: brightness(1.1);
}

.ut-close {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.2rem;
}

.ut-close:hover {
  color: var(--text-primary);
}

/* Slide up from the bottom */
.ut-slide-enter-active,
.ut-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.ut-slide-enter-from,
.ut-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 1rem);
}

@media (max-width: 900px) {
  /* Sit above the mobile bottom nav */
  .update-toast {
    bottom: calc(4.5rem + env(safe-area-inset-bottom));
  }

  .ut-text {
    white-space: normal;
  }
}
</style>

<template>
  <Transition name="owt-slide">
    <div v-if="visible" class="warmup-toast" role="status" aria-live="polite">
      <i :class="['bi', status === 'ready' ? 'bi-check-circle' : 'bi-cloud-arrow-down', 'owt-icon']"></i>
      <span class="owt-text">
        {{ status === 'ready' ? labels.offlineReady : `${labels.warmingOffline} ${done}/${total}` }}
      </span>
      <button class="owt-close" @click="dismissed = true" :aria-label="labels.updateDismiss">
        <i class="bi bi-x"></i>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { useOfflineWarmup } from '../composables/useOfflineWarmup.js'
import { ui } from '../i18n/ui.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Self-guards to the installed app + online; in a normal tab status stays 'idle' so nothing shows.
const { status, done, total } = useOfflineWarmup()

const dismissed = ref(false)
const visible = computed(() => !dismissed.value && (status.value === 'warming' || status.value === 'ready'))

// Auto-dismiss the "ready" confirmation a few seconds after the warm-up finishes.
watch(status, (s) => {
  if (s === 'ready') setTimeout(() => (dismissed.value = true), 4000)
})
</script>

<style scoped>
.warmup-toast {
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
  border-radius: 999px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
  font-size: 0.82rem;
  color: var(--text-primary);
}

.owt-icon {
  color: var(--accent);
  font-size: 1rem;
  flex-shrink: 0;
}

.owt-text {
  white-space: nowrap;
}

.owt-close {
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

.owt-close:hover {
  color: var(--text-primary);
}

.owt-slide-enter-active,
.owt-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.owt-slide-enter-from,
.owt-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 1rem);
}
</style>

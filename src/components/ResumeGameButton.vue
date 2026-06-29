<template>
  <RouterLink to="/tracker/game" class="resume-bar" role="button">
    <span>{{ labels.resumeGameBar }}</span>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
/* Visibility is owned by App.vue (v-if). This is purely presentational.
   App.vue sets --resume-bar-h (= this bar's 3rem height + a small gap) on .app-layout; the
   content padding and the offline-warmup toast add that var so they clear the bar with a gap. */
/* Mobile-only: on desktop the Tracker link in the top navbar is always at hand, so the bar
   isn't needed. Hidden by default; shown only ≤900px (where the bottom-nav lives). */
.resume-bar {
  display: none;
  position: fixed;
  z-index: 195; /* below drawer-overlay (299) and modals (400–500); App also hides it via v-if */
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 3rem;
  background: var(--accent);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.2px;
  transition: filter 0.15s;
}

.resume-bar:hover {
  filter: brightness(1.1);
}

/* Full-width bar sitting directly above the bottom-nav (.bn-item min-height 52px). */
@media (max-width: 900px) {
  .resume-bar {
    display: flex;
    left: 0;
    right: 0;
    bottom: calc(52px + var(--safe-bottom, 0px));
    padding: 0 1rem;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.18);
  }
}
</style>

<template>
  <!-- Mobile bottom nav — quick switch between the global sections. Fixed five items: nothing
       appears or disappears under the thumb. A jump to a faction's datasheets used to be a sixth,
       conditional item here; it now lives on the player's card in the tracker (RoundTracker.vue),
       which knows WHOSE faction it is and so covers the opponent too. -->
  <nav class="bottom-nav">
    <button type="button" class="bn-item" :class="{ active: isRulesRoute }" @click="$emit('open-rules')">
      <i class="bi bi-book-half"></i>
      <span>{{ labels.navRules }}</span>
    </button>
    <RouterLink to="/roster" class="bn-item" :class="{ active: isRosterRoute }">
      <i class="bi bi-clipboard-plus"></i>
      <span>{{ labels.navRoster }}</span>
    </RouterLink>
    <button type="button" class="bn-item" :class="{ active: isFactionRoute }" @click="$emit('open-factions')">
      <i class="bi bi-shield-shaded"></i>
      <span>{{ labels.navFactions }}</span>
    </button>
    <RouterLink to="/stratagems" class="bn-item" :class="{ active: isStratagemsRoute }">
      <i class="bi bi-lightning-charge"></i>
      <span>{{ labels.navStratagemsShort }}</span>
    </RouterLink>
    <RouterLink to="/tracker" class="bn-item" :class="{ active: isTrackerRoute }">
      <i class="bi bi-clipboard-data"></i>
      <span>{{ labels.navTracker }}</span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { useRouteSection } from '../composables/useRouteSection.js'
import { ui } from '../i18n/ui.js'

defineEmits(['open-rules', 'open-factions'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const {
  isRulesRoute, isFactionRoute,
  isStratagemsRoute, isTrackerRoute, isRosterRoute,
} = useRouteSection()
</script>

<style scoped>
/* ── Mobile bottom nav (shown only on mobile, see media query) ── */
.bottom-nav {
  display: none;
}

@media (max-width: 900px) {
  .bottom-nav {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: var(--bg-insert);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: var(--safe-bottom);
    padding-left: var(--safe-left);
    padding-right: var(--safe-right);
    /* Promote to its own compositor layer so iOS doesn't repaint-lag (the bar detaching from
       the bottom edge) during fast momentum scrolling. */
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .bn-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    min-height: 52px;
    padding: 0.4rem 0;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    font-size: 0.64rem;
    font-weight: 500;
    text-align: center;
  }

  /* The Factions item is a <button> (opens a modal) — strip native button chrome so it
     matches the RouterLink tabs. */
  button.bn-item {
    background: none;
    border: none;
    font-family: inherit;
    cursor: pointer;
  }

  .bn-item i {
    font-size: 1.2rem;
    line-height: 1;
  }

  .bn-item.active {
    /* The bottom-nav is always a dark surface, so use the on-dark accent — the light
       theme's deep-red --accent is near-invisible against it. */
    color: var(--accent-on-dark);
  }
}
</style>

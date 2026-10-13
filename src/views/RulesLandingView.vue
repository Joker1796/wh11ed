<template>
  <div class="rules-landing">
    <div class="hero">
      <h1 class="hero-title">
        {{ labels.navRules }}
      </h1>
      <!-- Same door the tracker and the roster list carry: this section's page of the guide. -->
      <RouterLink
        class="hero-help"
        to="/help/rules"
        :title="labels.helpSection"
        :aria-label="labels.helpSection"
      >
        <i class="wi wi-help" />
      </RouterLink>
    </div>

    <SectionCardGrid :sections="t.sections" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SectionCardGrid from '../components/SectionCardGrid.vue'
import { rulesLanding } from '../data/rulesLanding.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const t = computed(() => rulesLanding[locale.value])
</script>

<style scoped>
.rules-landing {
  padding-top: 0.5rem;
}

.hero {
  /* The title centred, the "?" on its line at the right edge (owner, 2026-10-13: on a line of its
     own under the title it spent a whole row on one icon). */
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  text-align: center;
  padding: 1rem 0 0.6rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.4rem;
}

.hero-title {
  grid-column: 2;
  font-family: var(--font-display);
  font-size: 3.1rem;
  font-weight: 400;
  color: var(--text-primary);
}


.hero-help { grid-column: 3; justify-self: end; }

/* On a phone the heading is a row, as on the tracker and the roster list: the title left, the "?"
   on its right, and no accent rule — a centred title over a line spent a band of the first screen
   on a name (owner, 2026-10-13). */
@media (max-width: 640px) {
  .hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    text-align: left;
    padding: 0.4rem 0 0;
    border-bottom: none;
    margin-bottom: 1rem;
  }
  .hero-title { font-size: 2.3rem; }
}
</style>

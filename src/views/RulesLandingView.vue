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
        <i class="bi bi-question-circle" />
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
  text-align: center;
  padding: 1rem 0 0.6rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.4rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 3.1rem;
  font-weight: 400;
  color: var(--text-primary);
}


/* Under the title in a centred hero, unlike the tracker and roster headings where the same
   link shares the title's row. */
.hero-help { margin-top: 0.3rem; }

@media (max-width: 640px) {
  .hero-title { font-size: 2.3rem; }
}
</style>

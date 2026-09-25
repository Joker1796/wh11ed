<template>
  <div class="landing">
    <div class="hero">
      <h1 class="hero-title">
        Warhammer 40,000
      </h1>
      <div class="hero-subtitle">
        {{ t.tagline }}
      </div>
    </div>

    <p class="landing-desc">
      {{ t.description }}
    </p>
    <p class="landing-help">
      <RouterLink to="/help">
        {{ t.footer.helpLink + ' →' }}
      </RouterLink>
    </p>

    <SectionCardGrid :sections="t.sections" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SectionCardGrid from '../components/SectionCardGrid.vue'
import { landing } from '../data/landing.js'
import { useLocale } from '../composables/useLocale.js'

const { locale } = useLocale()
const t = computed(() => landing[locale.value])
</script>

<style scoped>
.landing {
  padding-top: 0.5rem;
}

.hero {
  text-align: center;
  padding: 1.5rem 0 0.7rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.1rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 3.74rem;
  font-weight: 500;
  letter-spacing: 1px;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.hero-subtitle {
  font-size: 0.85rem;
  letter-spacing: 3px;
  color: var(--accent);
  text-transform: uppercase;
  font-weight: 600;
  font-family: var(--font-sans);
}

.landing-desc {
  max-width: 70ch;
  margin: 0 auto 1.6rem;
  text-align: center;
  color: var(--text-muted);
  line-height: 1.7;
  font-size: 1rem;
}

.landing-help {
  text-align: center;
  margin: -0.6rem 0 1.4rem;
  font-size: 0.88rem;
}
.landing-help a { color: var(--accent); text-decoration: none; }
.landing-help a:hover { text-decoration: underline; }

@media (max-width: 600px) {
  .hero-title { font-size: 2.2rem; }
}
</style>

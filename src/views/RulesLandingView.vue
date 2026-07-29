<template>
  <div class="rules-landing">
    <div class="hero">
      <h1 class="hero-title">{{ labels.navRules }}</h1>
    </div>

    <div class="section-grid">
      <RouterLink
        v-for="s in t.sections"
        :key="s.key"
        :to="s.path"
        class="section-card"
      >
        <div class="section-card-top">
          <span class="section-badge">{{ s.badge }}</span>
        </div>
        <h2 class="section-card-title">{{ s.label }}</h2>
        <p class="section-card-desc">{{ s.desc }}</p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
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

.section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.section-card {
  display: block;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-top: 3px solid var(--border);
  border-radius: 0 0 6px 6px;
  padding: 1.25rem 1.35rem;
  transition: border-top-color 0.15s, box-shadow 0.15s;
  text-decoration: none;
}

.section-card:hover {
  border-top-color: var(--accent);
  box-shadow: 0 2px 12px color-mix(in srgb, var(--accent) 18%, transparent);
  text-decoration: none;
}

.section-card-top {
  margin-bottom: 0.5rem;
}

.section-badge {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent);
  font-family: var(--font-mono);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  padding: 2px 7px;
  border-radius: 2px;
}

.section-card-title {
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.45rem;
}

.section-card-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.55;
  margin: 0;
}

@media (max-width: 640px) {
  .hero-title { font-size: 2.3rem; }
}
</style>

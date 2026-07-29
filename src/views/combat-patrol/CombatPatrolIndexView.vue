<template>
  <div class="cp-index-view">
    <div class="hero">
      <h1 class="hero-title">{{ labels.cpHeading }}</h1>
      <div class="hero-subtitle">{{ labels.cpSubtitle }}</div>
    </div>

    <div class="cp-grid">
      <RouterLink
        v-for="f in combatPatrolIndex"
        :key="f.slug"
        :to="`/combat-patrol/${f.slug}`"
        class="cp-card"
      >
        <span class="cp-card-name">{{ f.name }}</span>
        <span class="cp-card-box">{{ f.boxName }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { combatPatrolIndex } from '../../data/combatPatrolIndex.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.cp-index-view {
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
  margin-bottom: 0.4rem;
}

.hero-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
  max-width: 40rem;
  margin: 0 auto;
}

.cp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.cp-card {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.9rem 1.1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  border-radius: 0 0 6px 6px;
  text-decoration: none;
  transition: background var(--motion-fast), border-color var(--motion-fast);
}

.cp-card:hover {
  background: color-mix(in srgb, var(--accent) 8%, var(--bg-card));
  text-decoration: none;
}

.cp-card-name {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--text-primary);
}

.cp-card-box {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-style: italic;
}

@media (max-width: 640px) {
  .hero-title { font-size: 2.3rem; }
}
</style>

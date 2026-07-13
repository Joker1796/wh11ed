<template>
  <div class="not-found-view">
    <div class="hero">
      <h1 class="hero-title">404</h1>
      <div class="hero-subtitle">{{ labels.notFoundHeading }}</div>
    </div>
    <p class="not-found-text">{{ labels.notFoundText }}</p>
    <RouterLink to="/" class="home-link">{{ labels.notFoundHome }}</RouterLink>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// The bucket's ErrorDocument serves index.html for unknown paths, so this page can be
// reached by crawlers. Mark it noindex while mounted so soft-404s never get indexed.
let robotsMeta = null
onMounted(() => {
  robotsMeta = document.createElement('meta')
  robotsMeta.name = 'robots'
  robotsMeta.content = 'noindex'
  document.head.appendChild(robotsMeta)
})
onUnmounted(() => {
  robotsMeta?.remove()
  robotsMeta = null
})
</script>

<style scoped>
.not-found-view {
  padding-top: 0.5rem;
  text-align: center;
}

.hero {
  padding: 1.5rem 0 0.7rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.25rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 3.1rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.hero-subtitle {
  color: var(--text-secondary);
  font-size: 1.05rem;
}

.not-found-text {
  color: var(--text-secondary);
  margin-bottom: 1.25rem;
}

.home-link {
  display: inline-block;
  color: var(--accent);
  font-weight: 600;
  text-decoration: none;
}

.home-link:hover {
  text-decoration: underline;
}
</style>

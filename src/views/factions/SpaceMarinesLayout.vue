<template>
  <div class="view">
    <div class="view-hero faction-hero">
      <div class="faction-hero-meta">
        <span class="faction-badge">Imperium</span>
        <span class="faction-edition">11th Edition</span>
      </div>
      <h1>{{ labels.spaceMarinesHeading }}</h1>
      <p class="view-hero-desc">{{ space_marines.lore }}</p>
    </div>

    <RouterView />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { space_marines } from '../../data/factions/space-marines.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.faction-hero {
  padding-bottom: 1.5rem;
}

.faction-hero-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}

.faction-badge {
  background: #1c3a52;
  color: #6aa5cf;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.2rem 0.55rem;
  border-radius: 3px;
  border: 1px solid #3a6a92;
}

.faction-edition {
  font-size: 0.72rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.6px;
}
</style>

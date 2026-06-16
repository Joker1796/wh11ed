<template>
  <div class="view">
    <div class="view-hero faction-stub-hero">
      <div class="faction-hero-meta">
        <span class="faction-badge" :class="`cat-${categorySlug}`">{{ category }}</span>
        <span class="faction-edition">11th Edition</span>
      </div>
      <h1>{{ name }}</h1>
    </div>

    <div class="stub-block">
      <div class="stub-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      </div>
      <p class="stub-text">{{ labels.factionComingSoon }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const props = defineProps({
  name:     { type: String, required: true },
  category: { type: String, required: true },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const categorySlug = computed(() => props.category.toLowerCase())
</script>

<style scoped>
.faction-stub-hero {
  padding-bottom: 1.5rem;
}

.faction-hero-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}

.faction-badge {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.2rem 0.55rem;
  border-radius: 3px;
}

.cat-imperium {
  background: #1a2a4a;
  color: #8ab0e0;
  border: 1px solid #2a4a7a;
}
.cat-chaos {
  background: #2a1a1a;
  color: #e08a8a;
  border: 1px solid #5a2a2a;
}
.cat-xenos {
  background: #1a2a1a;
  color: #6abf6a;
  border: 1px solid #2a5a2a;
}
.cat-unaligned {
  background: #2a2a1a;
  color: #c0b060;
  border: 1px solid #5a4a1a;
}

.faction-edition {
  font-size: 0.72rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.stub-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 2rem;
  border: 1px dashed var(--border);
  border-radius: 8px;
  text-align: center;
  color: var(--text-dim);
  margin-top: 1rem;
}

.stub-icon {
  opacity: 0.3;
}

.stub-text {
  font-size: 0.95rem;
  line-height: 1.5;
  max-width: 400px;
  margin: 0;
}
</style>

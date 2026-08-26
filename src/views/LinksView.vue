<template>
  <div class="links-view">
    <div class="hero">
      <h1 class="hero-title">{{ labels.linksHeading }}</h1>
      <div class="hero-subtitle">{{ labels.linksSubtitle }}</div>
    </div>

    <div class="links-grid">
      <a
        v-for="l in LINKS"
        :key="l.url"
        :href="l.url"
        target="_blank"
        rel="noopener"
        class="link-card"
      >
        <span class="link-title">{{ l.label }}</span>
        <span class="link-host"><i class="bi bi-file-earmark-pdf"></i> warhammer-community.com</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Official Warhammer Community source PDFs the project is built from.
// Labels are the documents' own (English) names — kept the same in both locales.
const LINKS = [
  { label: 'Core Rules', url: 'https://assets.warhammer-community.com/eng_01-06_warhammer40k_new40k_core_rules-was6fbu1ix-hfewhmxyiy.pdf' },
  { label: 'Warhammer Event Companion', url: 'https://assets.warhammer-community.com/eng_12-06_warhammer40000_event_companion-s3bfb5f9s1-ivswuij3fo.pdf' },
  { label: 'Warhammer Teams Event Companion', url: 'https://assets.warhammer-community.com/eng_12-06_warhammer40000_teams_event_companion-3pq1qxo6kv-96smptwn3u.pdf' },
  { label: 'Terrain Area Footprints', url: 'https://assets.warhammer-community.com/eng_12-06_warhammer40000_terrainareafootprints-biavo5zf9f-gxdahkydbj.pdf' },
]
</script>

<style scoped>
.links-view {
  padding-top: 0.5rem;
}

.hero {
  text-align: center;
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
  font-size: 0.85rem;
  letter-spacing: 2px;
  color: var(--accent);
  text-transform: uppercase;
  font-weight: 600;
  font-family: var(--font-sans);
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.link-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-top: 3px solid var(--border);
  padding: 1.1rem 1.25rem;
  transition: border-top-color 0.15s, box-shadow 0.15s;
  text-decoration: none;
}

.link-card:hover {
  border-top-color: var(--accent);
  box-shadow: 0 2px 12px color-mix(in srgb, var(--accent) 18%, transparent);
  text-decoration: none;
}

.link-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text-primary);
}

.link-host {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.link-host i {
  color: var(--accent);
  margin-right: 0.2rem;
}

@media (max-width: 600px) {
  .hero-title { font-size: 2.3rem; }
  .links-grid { grid-template-columns: 1fr; }
}
</style>

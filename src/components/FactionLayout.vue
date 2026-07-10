<template>
  <div class="faction-view">
    <div class="hero">
      <RouterLink to="/factions" class="back-link">← {{ labels.factionsBack }}</RouterLink>
      <h1 class="hero-title">{{ faction ? faction.name : labels.factionsHeading }}</h1>
      <!-- Mobile-only page tabs: the desktop subnav (App.vue) is hidden ≤900px, where the
           drawer is the only other way to switch between the three faction pages. -->
      <nav v-if="faction" class="faction-tabs" :aria-label="labels.navFactions">
        <RouterLink
          v-for="t in tabs"
          :key="t.path"
          :to="t.path"
          class="faction-tab"
          :class="{ active: route.path === t.path }"
        >{{ t.label }}</RouterLink>
      </nav>
    </div>

    <slot v-if="faction" />
    <p v-else class="fsoon">{{ labels.factionsSoon }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useFactionPage } from '../composables/useFactionPage.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const route = useRoute()
const { slug, faction } = useFactionPage()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const tabs = computed(() => {
  const base = `/factions/${slug.value}`
  const l = labels.value
  return [
    { path: base, label: l.factionArmyRule },
    { path: `${base}/detachments`, label: l.factionDetachments },
    { path: `${base}/datasheets`, label: l.factionDatasheets },
  ]
})
</script>

<style scoped>
.faction-view {
  padding-top: 0.5rem;
}

.hero {
  padding: 0.5rem 0 0.9rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.5rem;
}

.back-link {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: 0.6rem;
}

.back-link:hover {
  color: var(--accent);
  text-decoration: none;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1;
}

.faction-tabs {
  display: none;
}

@media (max-width: 900px) {
  .faction-tabs {
    display: flex;
    gap: 0.4rem;
    margin-top: 0.8rem;
  }

  .faction-tab {
    font-family: var(--font-display);
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    color: var(--text-muted);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 0.35rem 0.7rem;
    text-decoration: none;
    transition: color var(--motion-fast), border-color var(--motion-fast), background var(--motion-fast);
  }

  .faction-tab.active {
    color: #fff;
    background: var(--accent);
    border-color: var(--accent);
  }
}

.fsoon {
  color: var(--text-muted);
  font-size: 1rem;
}

@media (max-width: 640px) {
  .hero-title { font-size: 2.2rem; }
}
</style>

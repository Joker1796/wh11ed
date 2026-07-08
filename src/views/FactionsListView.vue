<template>
  <div class="factions-view">
    <div class="hero">
      <h1 class="hero-title">{{ labels.factionsHeading }}</h1>
      <div class="hero-subtitle">{{ labels.factionsSubtitle }}</div>
    </div>

    <div class="groups">
      <section v-for="group in factionGroups" :key="group.id" class="group">
        <h2 class="group-title">{{ labels[groupLabelKey(group.id)] }}</h2>
        <ul class="faction-list">
          <li v-for="f in group.factions" :key="f.slug">
            <RouterLink v-if="f.ready" :to="`/factions/${f.slug}`" class="faction-link">
              {{ f.name }}
            </RouterLink>
            <span v-else class="faction-link disabled">
              {{ f.name }}
              <span class="soon">{{ labels.factionsSoon }}</span>
            </span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { factionGroups } from '../data/factionsIndex.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const GROUP_LABEL_KEYS = {
  astartes: 'factionGroupAstartes',
  imperium: 'factionGroupImperium',
  xenos: 'factionGroupXenos',
  chaos: 'factionGroupChaos',
}
function groupLabelKey(id) {
  return GROUP_LABEL_KEYS[id] || id
}
</script>

<style scoped>
.factions-view {
  padding-top: 0.5rem;
}

.hero {
  text-align: center;
  padding: 1.5rem 0 0.7rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.5rem;
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

.groups {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 3rem;
}

.group-title {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--accent);
  margin: 0 0 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--border);
}

.faction-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.faction-list li {
  margin: 0;
}

.faction-link {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  padding: 0.35rem 0;
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 400;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.15s;
}

a.faction-link:hover {
  color: var(--accent);
  text-decoration: none;
}

.faction-link.disabled {
  color: var(--text-dim);
  cursor: default;
}

.soon {
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-dim);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 1px 5px;
  align-self: center;
}

@media (max-width: 640px) {
  .hero-title { font-size: 2.3rem; }
  .groups { grid-template-columns: 1fr; gap: 1.5rem; }
  .faction-link { font-size: 1.35rem; }
}
</style>

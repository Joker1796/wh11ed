<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.eventMissionsHeading }}</h1>
      <p class="view-hero-desc">{{ labels.eventMissionsDesc }}</p>
    </div>

    <SeeAlsoBlock :refs="introRefs" />
    <p class="lead">{{ labels.missionsIntro }}</p>

    <!-- Primary missions — grouped by the five Force Dispositions -->
    <section id="missions-primary" class="m-section">
      <h2 class="section-heading">{{ labels.missionsPrimaryHeading }}</h2>
      <div v-for="g in primaryGroups" :key="g.id" class="mgroup">
        <h3 class="mgroup-label">
          <img v-if="g.icon" :src="g.icon" :alt="g.name" class="mgroup-icon" />
          {{ g.name }}
        </h3>
        <div class="mcards">
          <MissionCard
            v-for="m in g.missions"
            :key="m.slug"
            :mission="m"
            :subtitle="`${labels.trackerVs} ${m.opponent}`"
          />
        </div>
      </div>
    </section>

    <!-- Secondary missions — toggle between the Attacker and Defender pools -->
    <section id="missions-secondary" class="m-section">
      <div class="sec-head">
        <h2 class="section-heading">{{ labels.missionsSecondaryHeading }}</h2>
        <div class="role-toggle">
          <button
            type="button"
            class="role-btn"
            :class="{ active: role === 'attacker' }"
            @click="role = 'attacker'"
          >{{ labels.trackerAttacker }}</button>
          <button
            type="button"
            class="role-btn"
            :class="{ active: role === 'defender' }"
            @click="role = 'defender'"
          >{{ labels.trackerDefender }}</button>
        </div>
      </div>
      <div class="mcards">
        <MissionCard
          v-for="m in secondaryList"
          :key="m.slug"
          :mission="m"
          :subtitle="m.category"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MissionCard from '../../components/event/MissionCard.vue'
import SeeAlsoBlock from '../../components/SeeAlsoBlock.vue'
import { getMissions } from '../../data/missions.js'
import { eventCompanion } from '../../data/eventCompanion.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// How a player's Primary is chosen and how scoring works live on the Sequence page;
// which Primary applies to each matchup is shown on the Terrain & Layouts matrix.
const introRefs = computed(() =>
  locale.value === 'ru'
    ? ['Последовательность миссии EC:sequence', 'Террейн и раскладки EC:layouts']
    : ['Mission Sequence EC:sequence', 'Terrain & Layouts EC:layouts']
)

const data = computed(() => getMissions(locale.value))

// Force Dispositions drive the primary grouping (id + English name + icon, language-agnostic).
const dispositions = eventCompanion.en.dispositions

const primaryGroups = computed(() =>
  dispositions.map(d => ({
    id: d.id,
    name: d.name,
    icon: d.icon,
    missions: data.value.primary.filter(m => m.deck === d.id),
  }))
)

const role = ref('attacker')
const secondaryList = computed(() => data.value.secondary.filter(m => m.role === role.value))
</script>

<style scoped>
.view-hero {
  padding: 1.25rem 0 0.9rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.25rem;
}
.view-hero h1 {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  margin-bottom: 0.4rem;
}
.view-hero-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  font-style: italic;
}
.lead { margin: 0 0 1.5rem; line-height: 1.6; }

.m-section { margin-top: 2rem; }
.m-section:first-of-type { margin-top: 0; }

.section-heading {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  margin: 0 0 1rem;
  scroll-margin-top: 100px;
}
.m-section { scroll-margin-top: 100px; }

.mgroup { margin-bottom: 1.75rem; }
.mgroup-label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 0.85rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--border);
}
.mgroup-icon { width: 34px; height: 34px; object-fit: contain; flex: none; }

.mcards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
  gap: 1rem;
}

.sec-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.sec-head .section-heading { margin: 0; }
.role-toggle {
  display: inline-flex;
  border: 1px solid var(--border);
  border-radius: 999px;
  overflow: hidden;
}
.role-btn {
  padding: 0.4rem 1rem;
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: background 0.12s, color 0.12s;
}
.role-btn.active {
  background: var(--accent);
  color: var(--text-on-accent);
}
.role-btn:not(.active):hover { color: var(--text-primary); }

@media (max-width: 600px) {
  .role-btn { min-height: 40px; }
}
</style>

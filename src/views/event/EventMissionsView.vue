<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.eventMissionsHeading }}</h1>
      <p class="view-hero-desc">{{ labels.eventMissionsDesc }}</p>
    </div>

    <SeeAlsoBlock :refs="introRefs" />
    <p class="lead">{{ labels.missionsIntro }}</p>

    <!-- Filters: type (all / primary / secondary) + Force Disposition (primary only) -->
    <div class="filters">
      <div class="seg">
        <button :class="{ on: typeFilter === 'all' }" @click="typeFilter = 'all'">{{ labels.filterAll }}</button>
        <button :class="{ on: typeFilter === 'primary' }" @click="typeFilter = 'primary'">{{ labels.missionsTypePrimary }}</button>
        <button :class="{ on: typeFilter === 'secondary' }" @click="typeFilter = 'secondary'">{{ labels.missionsTypeSecondary }}</button>
        <button :class="{ on: typeFilter === 'twists' }" @click="typeFilter = 'twists'">{{ labels.missionsTypeTwists }}</button>
      </div>
      <div v-if="showPrimary" class="dispo-chips">
        <button class="chip" :class="{ on: dispoFilter === 'all' }" @click="dispoFilter = 'all'">{{ labels.filterAll }}</button>
        <button
          v-for="d in dispositions"
          :key="d.id"
          class="chip"
          :class="{ on: dispoFilter === d.id }"
          @click="dispoFilter = d.id"
        >
          <img v-if="d.icon" :src="d.icon" :alt="d.name" class="chip-icon" />
          {{ d.name }}
        </button>
      </div>
    </div>

    <!-- Primary missions — grouped by the five Force Dispositions -->
    <section v-if="showPrimary" id="missions-primary" class="m-section">
      <h2 class="section-heading">{{ labels.missionsPrimaryHeading }}</h2>
      <div v-for="g in filteredPrimaryGroups" :key="g.id" class="mgroup">
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

    <!-- Secondary missions — one shared pool (identical for Attacker and Defender) -->
    <section v-if="showSecondary" id="missions-secondary" class="m-section">
      <h2 class="section-heading">{{ labels.missionsSecondaryHeading }}</h2>
      <div class="mcards">
        <MissionCard
          v-for="m in secondaryList"
          :key="m.slug"
          :mission="m"
          :subtitle="m.category"
        />
      </div>
    </section>

    <!-- Twists — optional pre-game modifiers (also selectable in the Game Tracker) -->
    <section v-if="showTwists" id="missions-twists" class="m-section">
      <h2 class="section-heading">{{ labels.missionsTwistsHeading }}</h2>
      <p class="lead">{{ twists.intro }}</p>
      <div class="mcards">
        <TwistCard v-for="t in twists.blocks" :key="t.id" :twist="t" />
      </div>
    </section>

    <PageNav />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import MissionCard from '../../components/event/MissionCard.vue'
import TwistCard from '../../components/event/TwistCard.vue'
import SeeAlsoBlock from '../../components/SeeAlsoBlock.vue'
import PageNav from '../../components/PageNav.vue'
import { getMissions } from '../../data/missions.js'
import { eventCompanion, getEventContent } from '../../data/eventCompanion.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { getItem, setItem } from '../../composables/safeStorage.js'

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

// Attacker and Defender share an identical Secondary pool — list the 18 once.
const secondaryList = computed(() => data.value.secondary.filter(m => m.role === 'attacker'))

// Twists — optional pre-game modifiers (localized prose, shared with the tracker).
const twists = computed(() => getEventContent(locale.value).twists)

// Filters: type (all / primary / secondary / twists) and Force Disposition (primary only).
const VALID_TYPES = ['all', 'primary', 'secondary', 'twists']
const VALID_DISPOS = ['all', ...dispositions.map(d => d.id)]

const savedType = getItem('wh11ed-missions-type-filter')
const typeFilter = ref(VALID_TYPES.includes(savedType) ? savedType : 'all')

const savedDispo = getItem('wh11ed-missions-dispo-filter')
const dispoFilter = ref(VALID_DISPOS.includes(savedDispo) ? savedDispo : 'all')

watch(typeFilter, v => setItem('wh11ed-missions-type-filter', v))
watch(dispoFilter, v => setItem('wh11ed-missions-dispo-filter', v))
const showPrimary = computed(() => ['all', 'primary'].includes(typeFilter.value))
const showSecondary = computed(() => ['all', 'secondary'].includes(typeFilter.value))
const showTwists = computed(() => ['all', 'twists'].includes(typeFilter.value))
const filteredPrimaryGroups = computed(() =>
  dispoFilter.value === 'all'
    ? primaryGroups.value
    : primaryGroups.value.filter(g => g.id === dispoFilter.value)
)
</script>

<style scoped>
.lead { margin: 0 0 1.5rem; line-height: 1.6; }

/* ── Filters ── */
.filters {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 1.75rem;
}
.seg {
  display: inline-flex;
  width: fit-content;
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
}
.seg button {
  padding: 0.4rem 0.9rem;
  background: var(--bg-secondary);
  color: var(--text-muted);
  border: none;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  transition: background 0.15s, color 0.15s;
}
.seg button + button { border-left: 1px solid var(--border); }
.seg button.on { background: var(--accent); color: var(--text-on-accent); }
.seg button:not(.on):hover { color: var(--text-primary); }

.dispo-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.32rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-secondary);
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 600;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.chip:hover { color: var(--text-primary); border-color: var(--accent); }
.chip.on { background: var(--accent); color: var(--text-on-accent); border-color: var(--accent); }
.chip-icon { width: 18px; height: 18px; object-fit: contain; flex: none; }

.m-section { margin-top: 2rem; }
.m-section:first-of-type { margin-top: 0; }

.section-heading {
  font-family: var(--font-display);
  font-size: var(--fs-rule-title);
  margin: 0 0 1rem;
  scroll-margin-top: 100px;
}
.m-section { scroll-margin-top: 100px; }

.mgroup { margin-bottom: 1.75rem; }
.mgroup-label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-display);
  font-size: 1.32rem;
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

</style>

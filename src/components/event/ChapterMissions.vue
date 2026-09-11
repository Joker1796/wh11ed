<template>
  <h2 class="chapter-heading">{{ labels.eventMissionsHeading }}</h2>
  <p class="chapter-desc">{{ labels.eventMissionsDesc }}</p>

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
    <Transition name="fade">
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
    </Transition>
  </div>

  <!-- Primary missions — grouped by the five Force Dispositions -->
  <Transition name="fade">
    <section v-if="showPrimary" id="missions-primary" class="m-section">
      <h3 class="section-heading">{{ labels.missionsPrimaryHeading }}</h3>
      <TransitionGroup tag="div" name="list" class="mgroups">
        <div v-for="g in filteredPrimaryGroups" :key="g.id" class="mgroup">
          <h4 class="mgroup-label">
            <img v-if="g.icon" :src="g.icon" :alt="g.name" class="mgroup-icon" />
            {{ g.name }}
          </h4>
          <div class="mcards">
            <MissionCard
              v-for="m in g.missions"
              :key="m.slug"
              :mission="m"
              :subtitle="`${labels.trackerVs} ${m.opponent}`"
            />
          </div>
        </div>
      </TransitionGroup>
    </section>
  </Transition>

  <!-- Secondary missions — one shared pool (identical for Attacker and Defender) -->
  <Transition name="fade">
    <section v-if="showSecondary" id="missions-secondary" class="m-section">
      <h3 class="section-heading">{{ labels.missionsSecondaryHeading }}</h3>
      <div class="mcards">
        <MissionCard
          v-for="m in secondaryList"
          :key="m.slug"
          :mission="m"
          :subtitle="m.category"
        />
      </div>
    </section>
  </Transition>

  <!-- Twists — optional pre-game modifiers (also selectable in the Game Tracker) -->
  <Transition name="fade">
    <section v-if="showTwists" id="missions-twists" class="m-section">
      <h3 class="section-heading">{{ labels.missionsTwistsHeading }}</h3>
      <p class="lead">{{ twists.intro }}</p>
      <div class="mcards">
        <TwistCard v-for="t in twists.blocks" :key="t.id" :twist="t" />
      </div>
    </section>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import MissionCard from './MissionCard.vue'
import TwistCard from './TwistCard.vue'
import SeeAlsoBlock from '../SeeAlsoBlock.vue'
import { getMissions } from '../../data/missions.js'
import { eventCompanion, getEventContent } from '../../data/eventCompanion.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { getItem, setItem } from '../../composables/safeStorage.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// How a player's Primary is chosen and how scoring works live on the Sequence chapter;
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

.dispo-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.32rem 0.7rem;
  border: 1px solid var(--border);
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

.mgroups { position: relative; } /* contain absolute-positioned leaving groups during dispo-filter transitions */
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

/* Multicol (like .strat-grid in StratagemsView) instead of grid: each card keeps its
   content height rather than stretching to the tallest card in the row. */
.mcards {
  column-width: 320px;
  column-gap: 1rem;
}
.mcards > * {
  break-inside: avoid;
  margin-bottom: 1rem;
}

</style>

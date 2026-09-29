<template>
  <div
    ref="rootEl"
    class="factions-view"
  >
    <div class="hero">
      <h1 class="hero-title">
        {{ labels.factionsHeading }}
      </h1>
      <div class="hero-subtitle">
        {{ labels.factionsSubtitle }}
      </div>
    </div>

    <!-- A pinned faction leaves its group for the top one, and slides there (useFlipMove). -->
    <div class="groups">
      <section
        v-if="pinned.length"
        class="group pinned-group"
      >
        <h2
          class="group-title"
          data-flip="h:pinned"
        >
          {{ labels.favPinnedGroup }}
        </h2>
        <div class="faction-list">
          <FactionOption
            v-for="f in pinned"
            :key="'pin-' + f.slug"
            :data-flip="f.slug"
            :slug="f.slug"
            :name="f.name"
            :to="`/factions/${f.slug}`"
          />
        </div>
      </section>

      <section
        v-for="group in unpinned"
        :key="group.id"
        class="group"
      >
        <h2
          class="group-title"
          :data-flip="'h:' + group.id"
        >
          {{ labels[factionGroupLabelKey(group.id)] }}
        </h2>
        <div class="faction-list">
          <FactionOption
            v-for="f in group.factions"
            :key="f.slug"
            :data-flip="f.slug"
            :slug="f.slug"
            :name="f.name"
            :to="`/factions/${f.slug}`"
            :disabled="!f.ready"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import FactionOption from '../components/FactionOption.vue'
import { factionGroups, factionGroupLabelKey } from '../data/factionsIndex.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useFavorites } from '../composables/useFavorites.js'
import { useFlipMove } from '../composables/useFlipMove.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const { pinnedFactionsFrom, unpinnedGroupsFrom } = useFavorites()
const pinned = computed(() => pinnedFactionsFrom(factionGroups))
const unpinned = computed(() => unpinnedGroupsFrom(factionGroups))
const rootEl = ref(null)
useFlipMove(() => pinned.value.map((f) => f.slug), rootEl)

</script>

<style scoped>
.factions-view {
  padding-top: 0.5rem;
}

.hero {
  text-align: center;
  padding: 1rem 0 0.6rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.2rem;
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

/* Four groups, four columns where the page is wide enough; two in between, one on a phone. The
   pinned group spans them all and lays its own rows out on the same columns. */
.groups {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.4rem 1.2rem;
}
.pinned-group .faction-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.3rem 1.2rem;
}
@media (max-width: 1000px) {
  .groups, .pinned-group .faction-list { grid-template-columns: repeat(2, 1fr); }
}

.pinned-group {
  grid-column: 1 / -1;
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

/* The rows are FactionOption, the same row the Factions sheet and the faction pickers draw — the
   faction's colour bar and monogram, the name, the pin (2026-09-28; this page drew plain text
   rows of its own until then). */
.faction-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

@media (max-width: 640px) {
  .hero-title { font-size: 2.3rem; }
  .groups, .pinned-group .faction-list { grid-template-columns: 1fr; }
  .groups { gap: 1.1rem; }
}
</style>

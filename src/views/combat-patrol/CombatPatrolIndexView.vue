<template>
  <div
    ref="rootEl"
    class="cp-index-view"
  >
    <div class="hero">
      <h1 class="hero-title">
        {{ labels.cpHeading }}
      </h1>
      <div class="hero-subtitle">
        {{ labels.cpSubtitle }}
      </div>
    </div>

    <!-- A pinned faction leaves its group for this one, and slides there (useFlipMove). -->
    <section
      v-if="pinned.length"
      class="cp-group"
    >
      <h2
        class="cp-group-title"
        data-flip="h:pinned"
      >
        {{ labels.favPinnedGroup }}
      </h2>
      <div class="cp-grid">
        <div
          v-for="f in pinned"
          :key="'pin-' + f.slug"
          :data-flip="f.slug"
          class="cp-card-row"
        >
          <RouterLink
            :to="`/combat-patrol/${f.slug}`"
            class="cp-card tone"
            :style="toneVars(factionIndexBySlug(f.slug)?.color)"
          >
            <FactionEmblem
              :faction="factionIndexBySlug(f.slug)"
              stamp
            />
            <span class="cp-card-name">{{ f.name }}</span>
            <span class="cp-card-box">{{ f.boxName }}</span>
          </RouterLink>
          <FavoriteStar
            :pinned="true"
            @toggle="toggleFaction(f.slug)"
          />
        </div>
      </div>
    </section>

    <section
      v-for="group in unpinned"
      :key="group.id"
      class="cp-group"
    >
      <h2
        class="cp-group-title"
        :data-flip="'h:' + group.id"
      >
        {{ labels[factionGroupLabelKey(group.id)] }}
      </h2>
      <div class="cp-grid">
        <div
          v-for="f in group.factions"
          :key="f.slug"
          :data-flip="f.slug"
          class="cp-card-row"
        >
          <RouterLink
            :to="`/combat-patrol/${f.slug}`"
            class="cp-card tone"
            :style="toneVars(factionIndexBySlug(f.slug)?.color)"
          >
            <FactionEmblem
              :faction="factionIndexBySlug(f.slug)"
              stamp
            />
            <span class="cp-card-name">{{ f.name }}</span>
            <span class="cp-card-box">{{ f.boxName }}</span>
          </RouterLink>
          <FavoriteStar
            :pinned="false"
            @toggle="toggleFaction(f.slug)"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { combatPatrolIndex } from '../../data/combatPatrolIndex.js'
import { factionGroups, factionGroupLabelKey, factionIndexBySlug } from '../../data/factionsIndex.js'
import { toneVars } from '../../utils/tone.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useFavorites } from '../../composables/useFavorites.js'
import { useFlipMove } from '../../composables/useFlipMove.js'
import FavoriteStar from '../../components/FavoriteStar.vue'
import FactionEmblem from '../../components/FactionEmblem.vue'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Same grouping as the /factions page (factionsIndex.js's factionGroups — Astartes/Imperium/
// Chaos/Xenos), filtered to the factions that actually have a Combat Patrol box, with each
// entry's boxName merged in from combatPatrolIndex.js.
const groups = computed(() => {
  const cpBySlug = new Map(combatPatrolIndex.map((f) => [f.slug, f]))
  return factionGroups
    .map((g) => ({
      id: g.id,
      factions: g.factions
        .filter((f) => cpBySlug.has(f.slug))
        .map((f) => ({ ...f, boxName: cpBySlug.get(f.slug).boxName })),
    }))
    .filter((g) => g.factions.length)
})

// Pin a faction to the top — it leaves its own group — same mechanism as /factions and the tracker's faction picker
// (shared localStorage-backed favorites — pinning here also pins it everywhere else).
const { toggleFaction, pinnedFactionsFrom, unpinnedGroupsFrom } = useFavorites()
const pinned = computed(() => pinnedFactionsFrom(groups.value))
const unpinned = computed(() => unpinnedGroupsFrom(groups.value))
const rootEl = ref(null)
useFlipMove(() => pinned.value.map((f) => f.slug), rootEl)

</script>

<style scoped>
.cp-index-view {
  padding-top: 0.5rem;
}

.hero {
  text-align: center;
  padding: 1rem 0 0.6rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.4rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 3.1rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.hero-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
  max-width: 40rem;
  margin: 0 auto;
}

.cp-group {
  margin-bottom: 1.2rem;
}
.cp-group-title {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--accent);
  margin: 0 0 0.6rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--border);
}

.cp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.6rem;
}

.cp-card-row {
  position: relative;
}
.cp-card-row .fav-star {
  position: absolute;
  top: 0.65rem;
  right: 0.15rem;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1rem;
}

.cp-card {
  contain: paint; /* the emblem's stamp (FactionEmblem) is clipped to the card and under its text */
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.5rem 1.6rem 0.55rem 0.7rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  /* The faction's own colour (the `.tone` pair, as the faction pickers wear it), the site accent
     where a faction has none (2026-09-28). */
  border-top: 2px solid var(--tone, var(--accent));
  text-decoration: none;
  transition: background var(--motion-fast), border-color var(--motion-fast);
}

.cp-card:hover {
  background: color-mix(in srgb, var(--tone, var(--accent)) 8%, var(--bg-card));
  text-decoration: none;
}

.cp-card-name {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 400;
  color: var(--text-primary);
}

.cp-card-box {
  font-size: 0.74rem;
  color: var(--text-muted);
  font-style: italic;
}

@media (max-width: 640px) {
  .hero-title { font-size: 2.3rem; }
}
</style>

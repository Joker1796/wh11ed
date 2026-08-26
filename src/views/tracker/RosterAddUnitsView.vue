<template>
  <div v-if="roster" class="roster-add themed" :style="accentStyle">
    <RouterLink :to="`/roster/${roster.id}`" class="back">
      <i class="bi bi-chevron-left"></i> {{ labels.rosterBackToEditor }}
    </RouterLink>

    <header class="ra-head">
      <h1 class="ra-title">{{ labels.rosterAddUnits }}</h1>
      <p class="ra-sub">{{ roster.name || labels.rosterUntitled }}</p>
    </header>

    <div v-if="!roster.faction" class="ra-hint">{{ labels.rosterPickFaction }}</div>
    <RosterUnitBrowser
      v-else-if="factionData"
      :units="factionData.units"
      :allies="factionData.allies || []"
      :faction-slug="roster.faction"
      :added-ids="roster.units.map((u) => u.id)"
      :detachments="curDetachments"
      :battle="effBattle"
      :check-legality="roster.checkLegality !== false"
      @add="addUnit"
      @remove="removeUnit"
    />

    <!-- Same fixed bar as the editor and the creation wizard — the `.rc-sticky` class name is
         load-bearing, not cosmetic: App.vue's `.app-layout:has(.rc-sticky)` reserves its height
         so MobileUtilityBar's floating buttons rise above it instead of covering it. -->
    <div class="rc-sticky">
      <div class="rc-sticky-info">
        <span class="rc-points" :class="{ over: points > limit }">{{ points }} / {{ limit }}</span>
        <button
          v-if="roster.faction"
          type="button"
          class="issues-badge"
          :class="validation.errorCount ? 'has-err' : 'ok'"
          @click="issuesOpen = true"
        >
          <template v-if="validation.errorCount">
            <i class="bi bi-exclamation-triangle-fill"></i> {{ validation.errorCount }}
          </template>
          <i v-else class="bi bi-check-circle-fill"></i>
        </button>
      </div>
      <div class="rc-sticky-actions">
        <RouterLink :to="`/roster/${roster.id}`" class="btn-primary">{{ labels.rosterDone }}</RouterLink>
      </div>
    </div>

    <RosterIssuesModal
      v-if="issuesOpen"
      :issues="validation.issues"
      @goto="goToEntry"
      @close="issuesOpen = false"
    />
  </div>
</template>

<script setup>
// Adding units is its own page rather than a tab or a modal: on a phone it fills the screen, and
// the hardware back button then closes the catalogue instead of the whole editor. The editor's
// Units tab links here; "Done" links back. There is nothing to save on the way out — every add
// writes straight to the reactive store (useRosters.js autosaves), so both directions are plain
// navigation.
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RosterUnitBrowser from '../../components/roster/RosterUnitBrowser.vue'
import RosterIssuesModal from '../../components/roster/RosterIssuesModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosterEditing } from '../../composables/useRosterEditing.js'
import { factionGroups } from '../../data/factionsIndex.js'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const {
  roster, factionData, curDetachments, effBattle, limit, points, validation, addUnit, removeUnit,
} = useRosterEditing(() => route.params.id)

// A missing/deleted id → back to the list, same guard the editor has.
if (!roster.value) router.replace('/roster')

const issuesOpen = ref(false)
// An issue about one entry belongs to the editor's Loadout list, not to this catalogue.
function goToEntry(uid) {
  issuesOpen.value = false
  router.push({ path: `/roster/${roster.value.id}`, query: { unit: uid } })
}

const allFactions = factionGroups.flatMap((g) => g.factions)
const factionColor = computed(() => allFactions.find((f) => f.slug === roster.value?.faction)?.color)
const accentStyle = computed(() => (factionColor.value
  ? { '--fa-light': factionColor.value.light, '--fa-dark': factionColor.value.dark }
  : {}))
</script>

<style scoped>
.roster-add { padding-bottom: 4.5rem; }
.ra-head { margin: 0.5rem 0 0.8rem; }
.ra-title { font-family: var(--font-display); font-size: 1.8rem; font-weight: 500; margin: 0; color: var(--text-primary); }
/* One line under the page title — which list is being filled, not the list's whole epigraph. */
.ra-sub {
  margin: 0.1rem 0 0; color: var(--text-muted); font-size: 0.9rem;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.ra-hint { color: var(--text-muted); font-size: 0.95rem; padding: 1.2rem 0; text-align: center; }

/* Copied from RosterEditorView/RosterCreateView, which copy it from each other: scoped
   styles cannot cross a component, and `.rc-sticky` is matched BY NAME from App.vue
   (`.app-layout:has(.rc-sticky)` reserves its height for MobileUtilityBar). Keep the three
   copies in step. */
@media (max-width: 400px) {
  .rc-sticky-actions .btn-primary,
  .rc-sticky-actions .btn-ghost { padding: 0.45rem 0.7rem; font-size: 0.8rem; }
}

.roster-add.themed {
  --accent: var(--fa-light, var(--accent));
  --accent-hover: color-mix(in srgb, var(--fa-light) 80%, black);
}

</style>

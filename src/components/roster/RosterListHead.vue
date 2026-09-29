<template>
  <div
    class="rl-head"
    :class="{ 'rlh-desk': desk }"
  >
    <h1 class="rlh-title">
      {{ labels.rostersHeading }}
    </h1>
    <div class="rlh-cta">
      <button
        class="btn-primary btn-lg"
        @click="router.push('/roster/new')"
      >
        <i class="bi bi-plus-lg" /> {{ labels.rosterNew }}
      </button>
      <!-- Most players already have their list somewhere else — in the GW app, in New Recruit.
           Pasting it beats rebuilding it, so the second way in sits beside the first. -->
      <button
        class="btn-ghost"
        @click="importOpen = true"
      >
        <i class="bi bi-clipboard-plus" /> {{ labels.rosterImport }}
      </button>
      <!-- The game statistics (owner, 2026-09-29: they are not a roster's, so not on a roster's
           page — they were a bar there until the same day). On the desk they fill its right-hand
           side (/roster?stats — a bare /roster reopens the last list); on a phone they are the
           tracker's own page. -->
      <RouterLink
        :to="desk ? '/roster?stats' : '/tracker/stats'"
        class="btn-ghost rlh-stats"
        :class="{ on: desk && statsOn }"
        :title="labels.statsLink"
        :aria-label="labels.statsLink"
      >
        <i class="bi bi-bar-chart" /> <span class="rlh-stats-text">{{ labels.statsLink }}</span>
      </RouterLink>
    </div>
    <div class="rlh-side">
      <!-- Cloud first, help last: the help link is always there in the same shape and holds the
           corner, while the line beside it changes with who is reading. -->
      <RosterCloudBar
        hint
        compact
      />
      <RouterLink
        class="hero-help"
        to="/help/rosters"
        :title="labels.helpSection"
        :aria-label="labels.helpSection"
      >
        <i class="bi bi-question-circle" />
      </RouterLink>
    </div>

    <RosterImportModal
      v-if="importOpen"
      @imported="(id) => router.push({ path: `/roster/${id}`, query: { mode: 'settings' } })"
      @close="importOpen = false"
    />
  </div>
</template>

<script setup>
// The rosters' heading and the ways in: the title, "New roster" and "Import", and on the right
// the two things that are ABOUT the page — where the lists are kept (everything the cloud line
// says is produced by the single sync pass on entry; no manual "Sync", on purpose) and its page
// of the guide. The same shape the tracker home's heading has.
//
// Two layouts of one block. On a phone (RosterListView) the title and the pair share a row over
// the accent rule and the buttons (New, Import, Statistics) stand centred under it. On the rosters desk (RosterDeskView,
// owner 2026-09-29: "the header must be one") it is ONE row across all the desk's columns — title,
// buttons (with "Statistics", the way back to them), the pair at the far right — over one rule.
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import RosterCloudBar from './RosterCloudBar.vue'
import RosterImportModal from './RosterImportModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

defineProps({
  desk: { type: Boolean, default: false },
  // The desk shows the statistics now (nothing open): its button is lit.
  statsOn: { type: Boolean, default: false },
})

const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const importOpen = ref(false)
</script>

<style scoped>
/* Phone and narrow: title | pair on one row over the rule, the buttons centred under it. */
.rl-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas:
    "title side"
    "cta cta";
  align-items: baseline;
  margin-bottom: 1rem;
}
.rlh-title,
.rlh-side {
  padding: 0.2rem 0 0.45rem;
  border-bottom: 2px solid var(--accent);
}
.rlh-title {
  grid-area: title;
  font-family: var(--font-display);
  font-size: 2.1rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.1;
}
/* The pair on the right rides the heading's baseline and shrinks before the title does. */
.rlh-side {
  grid-area: side;
  display: flex;
  align-items: center;
  align-self: stretch;
  justify-content: flex-end;
  gap: 0.5rem;
  min-width: 0;
  padding-left: 0.75rem;
  font-size: 0.8rem;
  color: var(--text-muted);
}
.rlh-cta {
  grid-area: cta;
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 0.75rem;
}
.rlh-stats.on { border-color: var(--accent); color: var(--accent); }

/* The desk: one row across the columns — the buttons beside the title, one size down. */
.rlh-desk {
  grid-template-columns: auto minmax(0, 1fr) auto;
  grid-template-areas: "title cta side";
  align-items: center;
  margin-bottom: 0.75rem;
}
.rlh-desk .rlh-title,
.rlh-desk .rlh-cta,
.rlh-desk .rlh-side {
  align-self: stretch;
  display: flex;
  align-items: center;
  padding: 0.35rem 0 0.5rem;
  border-bottom: 2px solid var(--accent);
}
.rlh-desk .rlh-cta {
  justify-content: flex-start;
  margin: 0;
  padding-left: 1.5rem;
}
.rlh-desk .rlh-cta .btn-primary,
.rlh-desk .rlh-cta .btn-ghost { padding: 0.45rem 0.9rem; font-size: 0.9rem; }

/* Same treatment as the tracker's CTA row on phones: button-sized buttons on one line, not two
   stretched panels. Display type is a lot of height on a 360px screen, and the heading is the
   least useful thing on it — the list under it is what the reader came for. */
/* Three buttons on one line down to the narrowest phone: below 400px Statistics keeps its icon
   only (its name stays in the title and the accessible name) — spelled out, it wrapped to a second
   row and cost the list 40px. */
@media (max-width: 400px) {
  .rlh-stats-text { display: none; }
}
@media (max-width: 480px) {
  .rlh-title { font-size: 1.75rem; }
  .rlh-side { font-size: 0.75rem; }
  .rlh-cta { gap: 0.5rem; margin-top: 0.8rem; margin-bottom: 0.6rem; }
  .rlh-cta .btn-primary,
  .rlh-cta .btn-ghost {
    flex: 0 0 auto;
    padding: 0.45rem 0.8rem;
    font-size: 0.8rem;
    white-space: nowrap;
  }
}
</style>

<template>
  <div
    v-if="wide"
    ref="hostEl"
    class="roster-desk rw-host"
  >
    <RosterListHead
      class="rd-head"
      desk
      :stats-on="!rosterId"
    />
    <RosterListView
      class="rd-list"
      in-desk
      :active-id="rosterId"
    />
    <div class="rd-main">
      <Transition
        name="fade"
        mode="out-in"
      >
        <RosterViewView
          v-if="rosterId"
          :key="rosterId"
          :roster-id="rosterId"
          in-desk
          :unit-pane="three"
        />
        <TrackerStatsView
          v-else
          in-desk
        />
      </Transition>
    </div>
  </div>
  <RosterViewView v-else-if="rosterId" />
  <RosterListView v-else />
</template>

<script setup>
// The rosters on a wide screen (owner, 2026-09-29): one screen instead of a list page and a page
// per roster. The list of lists stands in a narrow column on the left; beside it either the open
// roster (/roster/:id/view) or, with none open (/roster?stats), the game statistics. One heading runs
// across the top of all of it (RosterListHead): the title, New / Import, and "Statistics", which is
// simply the way to /roster. From 1200px the roster's page itself splits
// again and a unit's card opens in a third column instead of a dialog (RosterViewView unitPane);
// between 901 and 1199px (a tablet) it stays two columns and the card stays a dialog.
//
// Below 901px (the bottom nav's width) both addresses are what they always were: the list page
// and the roster's page. App.vue keys the page swap by one key for both addresses on a wide
// screen, so moving between rosters keeps this screen — and the list's scroll — standing, and
// only the right-hand side fades.
//
// The desk fills the window and each column scrolls on its own (useViewportFill, the builder's
// workbench does the same). The statistics load only when shown: they read the tracker's store,
// which statically carries the mission datasets the roster routes must not.
import { computed, defineAsyncComponent, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RosterListView from './RosterListView.vue'
import RosterViewView from './RosterViewView.vue'
import RosterListHead from '../../components/roster/RosterListHead.vue'
import { useMediaQuery } from '../../composables/useMediaQuery.js'
import { useViewportFill } from '../../composables/useViewportFill.js'
import { useRosters } from '../../composables/useRosters.js'
import { lastRosterId, rememberRoster } from '../../composables/lastRoster.js'

const TrackerStatsView = defineAsyncComponent(() => import('./TrackerStatsView.vue'))

const route = useRoute()
const router = useRouter()
const { rosterById } = useRosters()
const rosterId = computed(() => (route.params.id ? String(route.params.id) : ''))

const wide = useMediaQuery('(min-width: 901px)')
const three = useMediaQuery('(min-width: 1200px)')

// The list opened last is remembered (on a phone too — the address is this view's either way),
// and coming back to /roster on a wide screen reopens it (owner, 2026-09-29). The statistics are
// then asked for by name, `?stats` — the heading's button — and a remembered list that has since
// been deleted or turned out a draft leaves the statistics where they were.
watch(rosterId, (id) => { if (id) rememberRoster(id) }, { immediate: true })
watch([wide, () => route.fullPath], () => {
  if (!wide.value || rosterId.value || 'stats' in route.query) return
  const last = lastRosterId()
  const r = last && rosterById(last)
  if (r && !r.draft) router.replace(`/roster/${last}/view`)
}, { immediate: true })

const hostEl = ref(null)
const { measure } = useViewportFill(hostEl)
watch(wide, () => nextTick(measure))
</script>

<style scoped>
.roster-desk {
  display: grid;
  grid-template-columns: minmax(17rem, 21rem) minmax(0, 1fr);
  grid-template-rows: auto minmax(0, 1fr);
  column-gap: 1rem;
}
/* One heading across the columns (owner, 2026-09-29): the title and the ways in at the top. */
.rd-head { grid-column: 1 / -1; margin-bottom: 0; }
.rd-list,
.rd-main { min-height: 0; }
.rd-main {
  border-left: 1px solid var(--border);
  padding-left: 1rem;
}
</style>

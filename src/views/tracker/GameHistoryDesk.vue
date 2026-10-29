<template>
  <div
    v-if="wide"
    ref="hostEl"
    class="ghd rw-host"
    :class="{ 'ghd-folded': folded, 'ghd-pair': pair }"
  >
    <!-- The game: when, how it ended, the score, and every list it fielded — the one on screen lit. -->
    <aside
      v-if="game && !folded"
      class="ghd-game"
    >
      <RouterLink
        :to="backTo"
        class="back"
      >
        <i class="wi wi-chevron-left" /> {{ labels.trackerRosterBack }}
      </RouterLink>
      <p class="ghd-date">
        {{ formatDate(game.finishedAt || game.createdAt) }}
      </p>
      <GameRosterLinks
        :game="game"
        :active="activeKey"
        stack
      />
      <ScoreBoard
        :game="game"
        :finished="true"
      />
    </aside>

    <div class="ghd-list">
      <!-- The game column folded away (a tablet, or a pair on a laptop): its lists as a strip. -->
      <div
        v-if="game && folded"
        class="ghd-strip"
      >
        <RouterLink
          :to="backTo"
          class="back"
        >
          <i class="wi wi-chevron-left" /> {{ labels.trackerRosterBack }}
        </RouterLink>
        <GameRosterLinks
          :game="game"
          :active="activeKey"
        />
      </div>
      <!-- Every list opened once stays built (v-show): a card of it may stand beside another's. -->
      <RosterViewView
        v-for="s in built"
        v-show="s.key === activeKey"
        :key="s.key"
        :ref="(el) => setPane(s.key, el)"
        class="ghd-pane"
        :pi="s.pi"
        :mi="s.mi"
        in-desk
        external-card
        :picked="pickedIn(s.key)"
        @unit="open(`${s.key}|${$event}`)"
      />
    </div>

    <!-- One unit beside the list, or two compared — the faction unit list's rules (useUnitPicks). -->
    <aside
      class="ghd-cards"
      :class="{ 'ghd-cards--pair': pair }"
    >
      <RosterUnitRulesCard
        v-for="(c, i) in cards"
        :key="c.key"
        v-bind="c.card"
        inline
        :compare="shown.length === 1 ? (comparing ? 'on' : 'off') : ''"
        :closable="shown.length === 2"
        @compare="toggleCompare"
        @close="close(i)"
      />
      <p
        v-if="!cards.length || comparing"
        class="empty-note ghd-note"
      >
        {{ comparing ? labels.dsComparePick : labels.rosterPickUnit }}
      </p>
    </aside>
  </div>
  <RosterViewView v-else />
</template>

<script setup>
// A finished game's lists on a wide screen (owner, 2026-10-29): the game and every list it fielded
// on the left, the list picked in the middle, a unit's card on the right — and two cards side by
// side to compare, the second from any list of the game, the way a faction's unit list compares
// (useUnitPicks: ◫ waits for a second pick, ✕ takes one away, a further tap swaps the second).
//
// The widths, from what a card needs (DatasheetCard's own steps; ~300px each in a pair, as on the
// faction page):
//   ≥1440      game · list · card(s)
//   1200–1439  game · list · card; a pair folds the game column away (its lists become a strip)
//   901–1199   strip · list · card(s)
//   <901       the list's own page, as it always was (RosterViewView, the card in a dialog)
//
// Each list is its own RosterViewView (externalCard): it lays out its units and answers what one
// of its cards says (`cardOf`), with its own faction's data and the game's state at the end.
// The address names the list on screen; picking another list replaces it (GameRosterLinks).
import { computed, nextTick, ref, shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import RosterViewView from './RosterViewView.vue'
import GameRosterLinks from '../../components/tracker/GameRosterLinks.vue'
import ScoreBoard from '../../components/tracker/ScoreBoard.vue'
import RosterUnitRulesCard from '../../components/roster/RosterUnitRulesCard.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useFormatDate } from '../../composables/useFormatDate.js'
import { useMediaQuery } from '../../composables/useMediaQuery.js'
import { useViewportFill } from '../../composables/useViewportFill.js'
import { useUnitPicks } from '../../composables/useUnitPicks.js'
import { memberAt } from '../../composables/rosterGameLink.js'

const route = useRoute()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { formatDate } = useFormatDate()

const wide = useMediaQuery('(min-width: 901px)')
const roomy = useMediaQuery('(min-width: 1200px)')
const widest = useMediaQuery('(min-width: 1440px)')

const gid = computed(() => String(route.params.gid || ''))
const pi = computed(() => (route.params.pi != null ? Number(route.params.pi) : 0))
const mi = computed(() => (route.params.mi != null && route.params.mi !== '' ? Number(route.params.mi) : null))
const activeKey = computed(() => `${pi.value}:${mi.value ?? ''}`)
const backTo = computed(() => `/tracker?game=${gid.value}`)

// The tracker's store is imported when needed, as RosterViewView does: it carries the mission
// datasets the roster routes must not.
const tracker = shallowRef(null)
import('../../composables/useTracker.js').then(({ useTracker }) => { tracker.value = useTracker() })
const game = computed(() => tracker.value?.history.value.find((g) => g.id === gid.value) || null)

// The lists built so far, the one on screen first among them.
const built = ref([])
watch(activeKey, (key) => {
  if (built.value.some((s) => s.key === key)) return
  built.value = [...built.value, { key, pi: pi.value, mi: mi.value }]
}, { immediate: true })
const panes = new Map()
const paneVersion = ref(0)
function setPane(key, el) {
  if (el && panes.get(key) !== el) { panes.set(key, el); paneVersion.value++ }
}

// A card key is `<list>|<unit>`: `0:|u3`, `1:0|crew:sir-hekhtur`.
function cardFor(key) {
  void paneVersion.value
  const at = key.indexOf('|')
  return panes.get(key.slice(0, at))?.cardOf(key.slice(at + 1)) || null
}
// The first unit of the list on screen, so the card column is never empty (as on a faction page).
function firstKey() {
  const uid = memberAt(game.value?.players?.[pi.value], mi.value)?.roster?.units?.[0]?.uid
  return uid ? `${activeKey.value}|${uid}` : undefined
}
const loaded = computed(() => { const k = firstKey(); return !!(k && cardFor(k)) })
const { shown, comparing, open, close, toggleCompare } = useUnitPicks({
  slug: gid,
  loaded,
  exists: (key) => !!cardFor(key),
  firstId: firstKey,
})

const cards = computed(() => shown.value.map((key) => ({ key, card: cardFor(key) })).filter((c) => c.card))
const pair = computed(() => shown.value.length === 2 || comparing.value)
const pickedIn = (list) => shown.value.filter((k) => k.startsWith(`${list}|`)).map((k) => k.slice(list.length + 1))
// The game column stands while there is room for it beside what the cards need.
const folded = computed(() => !roomy.value || (pair.value && !widest.value))

const hostEl = ref(null)
const { measure } = useViewportFill(hostEl)
watch([wide, folded, () => !!game.value], () => nextTick(measure))
</script>

<style scoped>
.ghd {
  display: grid;
  grid-template-columns: minmax(15rem, 18rem) minmax(20rem, 0.85fr) minmax(0, 1.15fr);
  grid-template-rows: minmax(0, 1fr);
  column-gap: 1rem;
}
.ghd-folded { grid-template-columns: minmax(20rem, 0.85fr) minmax(0, 1.15fr); }
/* A pair takes the room from the list: each card keeps ~300px or more, as on a faction page. */
.ghd-pair { grid-template-columns: minmax(15rem, 18rem) 20rem minmax(0, 1fr); }
.ghd-folded.ghd-pair { grid-template-columns: 15rem minmax(0, 1fr); }

.ghd-game,
.ghd-list,
.ghd-cards {
  min-height: 0;
  min-width: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
}
.ghd-game { padding: 0.5rem 0.5rem 2rem 0; }
.ghd-game .back,
.ghd-strip .back { padding: 0.3rem 0; margin-bottom: 0.5rem; }
.ghd-date { margin: 0 0 0.6rem; font-size: 0.8rem; color: var(--text-dim); }
/* The list scrolls as one column, its strip with it; the pane's own column rules (rv-in-desk) let
   it grow here instead of filling a height of its own. */
.ghd-list { display: flex; flex-direction: column; border-left: 1px solid var(--border); padding-left: 1rem; }
.ghd-folded .ghd-list { border-left: none; padding-left: 0; }
.ghd-strip { padding-top: 0.5rem; }
.ghd-pane { flex: 1 0 auto; height: auto; }
.ghd-cards {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  gap: 1rem;
  padding: 0.75rem 0.5rem 2rem 1rem;
  border-left: 1px solid var(--border);
}
.ghd-cards--pair { grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; }
.ghd-note {
  margin: 0;
  padding: 2rem 1rem;
  border: 1px dashed var(--border);
  text-align: center;
}
</style>

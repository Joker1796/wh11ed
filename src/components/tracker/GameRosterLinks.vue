<template>
  <div
    v-if="links.length"
    class="grl"
    :class="{ 'grl-stack': stack }"
  >
    <RouterLink
      v-for="l in links"
      :key="l.key"
      class="grl-pill"
      :class="{ on: l.key === active }"
      :aria-current="l.key === active ? 'page' : undefined"
      :replace="!!active"
      :to="l.mi == null ? `/tracker/history/${game.id}/roster/${l.pi}` : `/tracker/history/${game.id}/roster/${l.pi}/${l.mi}`"
    >
      <i class="wi wi-roster-list" />
      <span class="grl-who">{{ l.who }}</span>
      <span class="grl-name">{{ l.name }}</span>
      <!-- inert: a button may not sit inside a link; the limits are in its tooltip. Icon only —
           the pill already holds a name and a list title. -->
      <RosterOwnLimitsMark
        :roster="l.roster"
        inert
        icon-only
      />
    </RouterLink>
  </div>
</template>

<script setup>
// The lists a finished game fielded, if they were attached at setup — the game carries its own
// snapshot of each, so this still works long after the saved roster changed or went away. Shown
// by the history list's game modal and by the history page.
import { computed } from 'vue'
import RosterOwnLimitsMark from '../roster/RosterOwnLimitsMark.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { membersOf, sideName } from '../../composables/useTracker.js'

const props = defineProps({
  game: { type: Object, required: true },
  // On the game's own desk (GameHistoryDesk): the list on screen (`pi:mi`), lit, and the others
  // swapped in place of it — replace, so Back still leaves the game rather than walking its lists.
  active: { type: String, default: '' },
  // One under another, the width of a column.
  stack: { type: Boolean, default: false },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// One pill per attached list — a doubles side can carry up to two (one per member), each
// linking to its own member's snapshot (`mi` in the path; null/absent in singles).
const links = computed(() => (props.game.players || [])
  .flatMap((p, pi) => {
    const sideWho = sideName(p, pi, labels.value)
    return membersOf(p).map((m, rawMi) => ({
      pi,
      mi: m === p ? null : rawMi,
      key: `${pi}:${m === p ? '' : rawMi}`,
      name: m.roster?.name || '',
      who: m === p ? sideWho : (m.name || sideWho),
      has: !!m.roster?.units,
      roster: m.roster || null,
    }))
  })
  .filter((l) => l.has))
</script>

<style scoped>
.grl { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.9rem; }
.grl-pill {
  display: inline-flex; align-items: center; gap: 0.4rem;
  /* A list can be named anything, including a whole poem — the pill gives way rather than
     widening the page (same reason .players uses minmax(0, 1fr); see GameSetup.vue). */
  max-width: 100%; min-width: 0;
  padding: 0.4rem 0.75rem; border: 1px solid var(--border);
  background: var(--bg-card); color: var(--text-primary); text-decoration: none; font-size: 0.82rem;
}
.grl-pill:hover { border-color: var(--accent); color: var(--accent-ink); }
.grl-pill.on { border-color: var(--accent); box-shadow: inset 3px 0 0 var(--accent); }
.grl-stack { flex-direction: column; flex-wrap: nowrap; }
/* In a column the player and the list each get a line: the column is too narrow to share one. */
.grl-stack .grl-pill { display: grid; grid-template-columns: auto minmax(0, 1fr); column-gap: 0.4rem; }
.grl-stack .grl-pill > .wi { grid-row: span 2; }
.grl-stack .grl-who { max-width: none; font-size: 0.75rem; }
.grl-pill > .wi { flex-shrink: 0; }
/* One line each, cut with "…": a long player name used to wrap into a column beside the icon
   (owner, 2026-10-10). The player gets at most half the pill, the list the rest. */
.grl-who { color: var(--text-muted); flex: 0 1 auto; max-width: 50%; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.grl-name { font-weight: 600; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>

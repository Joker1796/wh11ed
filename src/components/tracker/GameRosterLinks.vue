<template>
  <div
    v-if="links.length"
    class="grl"
  >
    <RouterLink
      v-for="l in links"
      :key="`${l.pi}:${l.mi ?? ''}`"
      class="grl-pill"
      :to="l.mi == null ? `/tracker/history/${game.id}/roster/${l.pi}` : `/tracker/history/${game.id}/roster/${l.pi}/${l.mi}`"
    >
      <i class="bi bi-card-list" />
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
.grl-pill:hover { border-color: var(--accent); color: var(--accent); }
.grl-who { color: var(--text-muted); }
.grl-name { font-weight: 600; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>

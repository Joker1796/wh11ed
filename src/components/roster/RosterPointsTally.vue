<template>
  <div class="points-tally">
    <span
      class="rc-points"
      :class="{ over, 'with-left': showPointsLeft, large }"
    >{{ points }} / {{ limit }}<span
      v-if="showPointsLeft"
      class="pts-left"
      :class="{ over }"
    >{{ leftLabel }}</span></span>
    <button
      v-if="badge"
      type="button"
      class="issues-badge"
      :class="errorCount ? 'has-err' : (issueCount ? 'warn' : 'ok')"
      :aria-label="errorCount ? `${labels.rosterIssuesTitle}: ${errorCount}` : labels.rosterIssuesTitle"
      @click="$emit('open-issues')"
    >
      <template v-if="errorCount">
        <i class="bi bi-exclamation-triangle-fill" /> {{ errorCount }}
      </template>
      <i
        v-else-if="issueCount"
        class="bi bi-exclamation-triangle-fill"
      />
      <i
        v-else
        class="bi bi-check-circle-fill"
      />
    </button>
  </div>
</template>

<script setup>
// What a list costs against its limit, and the badge that opens its issues — the readout both
// building screens keep in view (the phone's sticky footer, the desk's settings bar). It was drawn
// three times, and the desk's copy never learned the amber middle state: a list that still owed a
// Force Disposition showed a green tick there while the phone showed amber.
//
// The badge: red with the count when there are errors; amber and no number when the list is legal
// but something is still worth a look (an unmade choice is a warning, and a tick means "nothing
// left to look at"); a green tick otherwise. The count belongs to the errors — what amber says is
// "open me", which is one tap from here.
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosterPrefs } from '../../composables/useRosterPrefs.js'
import { pointsLeftLabel } from '../../composables/rosterEngine.js'

const props = defineProps({
  points: { type: Number, default: 0 },
  limit: { type: Number, default: 0 },
  errorCount: { type: Number, default: 0 },
  // Every issue, errors included — `validation.issues.length`.
  issueCount: { type: Number, default: 0 },
  // No badge before a faction is picked: there is nothing to validate yet.
  badge: { type: Boolean, default: true },
  // The desk's settings bar: the headline number of a line, in the display face.
  large: { type: Boolean, default: false },
})
defineEmits(['open-issues'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { showPointsLeft } = useRosterPrefs()
const over = computed(() => props.points > props.limit)
const leftLabel = computed(() => pointsLeftLabel(props.points, props.limit, labels.value))
</script>

<style scoped>
.points-tally { display: flex; align-items: center; gap: 0.5rem; }

.rc-points { display: flex; flex-direction: column; justify-content: center; font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); white-space: nowrap; }
.rc-points.large { font-family: var(--font-display); font-size: 1.35rem; font-variant-numeric: tabular-nums; }
.rc-points.over { color: var(--danger); }
/* With the remainder on, the total steps down a size so the two lines together are no taller
   than the buttons beside them; the badge beside it grows to the height of both lines (1.9rem
   is what 0.9rem + 0.68rem of text come to) — and grows in proportion, a square with a mark a
   quarter bigger, not a tall sliver around a small one. */
.rc-points.with-left:not(.large) { font-size: 0.9rem; line-height: 1.15; }
.rc-points.with-left + .issues-badge { height: 1.9rem; min-width: 1.9rem; justify-content: center; padding: 0 0.4rem; font-size: 1.05rem; }
/* What is left of the budget, under the "used / limit" readout while a list is being BUILT — the
   number a player subtracts in their head at every add, so it is printed (player request,
   2026-09-21). Not on the read-only view: a finished list is read for what it fields, not for what
   it could still take (owner, same day). In words ("125 left"): a bare number after "1995 / 2000"
   read as part of it. The deficit is red like the total it belongs to. */
.pts-left { display: block; margin-top: 0.1rem; font-family: var(--font-sans); font-size: 0.68rem; font-weight: 500; line-height: 1.1; color: var(--text-muted); white-space: nowrap; }
.pts-left.over { color: var(--danger); }

.issues-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem 0.5rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
}
.issues-badge.has-err { color: var(--danger); border-color: color-mix(in srgb, var(--danger) 45%, var(--border)); }
.issues-badge.warn { color: var(--warning); border-color: color-mix(in srgb, var(--warning) 45%, var(--border)); }
.issues-badge.ok { color: #3c9a5f; }

/* The phone's compact measure, the same 480px the sticky bar around it steps down at (style.css). */
@media (max-width: 480px) {
  .points-tally { gap: 0.35rem; }
  .rc-points:not(.large) { font-size: 0.85rem; }
  .issues-badge { padding: 0.25rem 0.4rem; font-size: 0.78rem; }
}
/* The narrowest phones, measured with the web fonts in (2026-09-24): a notch smaller rather than
   the limit gone. */
@media (max-width: 360px) {
  .points-tally { gap: 0.25rem; }
  .rc-points:not(.large) { font-size: 0.74rem; }
}
</style>

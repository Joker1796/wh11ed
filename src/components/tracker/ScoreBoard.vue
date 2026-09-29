<template>
  <div class="board">
    <!-- Each side wears its colour — you in the accent, the opponent in blue, and on a result its
         army's — as a stripe down the card and on the name; the side on turn adds a wash of it and
         the "turn" mark. -->
    <div
      v-for="(pl, i) in game.players"
      :key="i"
      class="col tone"
      :class="{ leading: finished && leaderIdx === i, turn: turnIdx === i, opp: !isYouSide(pl, i), themed: finished && !!sideFaction(pl) }"
      :style="finished ? toneVars(sideFaction(pl)?.color) : undefined"
    >
      <!-- The side's army pressed into its card, as on the history's game cards (owner,
           2026-09-29): the first of a doubles side's two. -->
      <FactionEmblem
        class="tone"
        :style="toneVars(sideFaction(pl)?.color)"
        :faction="sideFaction(pl)"
        stamp
      />
      <!-- Flex with a gap, so the template's line breaks between the spans add nothing; the
           faction's "·" is drawn by CSS. -->
      <div class="col-head">
        <span class="pname">{{ sideName(pl, i, labels) }}</span>
        <span
          v-if="factionLine(pl)"
          class="pfaction"
        >{{ factionLine(pl) }}</span>
      </div>
      <span
        v-if="turnIdx === i"
        class="turn-tag"
      >{{ labels.trackerTurnTag }}</span>
      <div
        :ref="el => (grandEls[i] = el)"
        class="grand"
      >
        <template v-if="bpMode">
          {{ bp[i] }}<span class="grand-unit">BP</span>
          <span class="grand-vp">{{ grandTotal(i) }} VP</span>
        </template>
        <template v-else>
          {{ grandTotal(i) }}<span class="grand-unit">VP</span><span
            v-if="liveBp"
            class="grand-bp"
          >{{ bp[i] }}<span class="grand-unit">BP</span></span>
        </template>
      </div>
      <dl
        v-if="!finished"
        class="breakdown"
      >
        <div><dt>{{ labels.trackerPrimary }}</dt><dd>{{ primaryTotal(i) }}</dd></div>
        <div><dt>{{ labels.trackerSecondary }}</dt><dd>{{ secondaryTotal(i) }}</dd></div>
        <div v-if="showCp">
          <dt>{{ labels.trackerCp }}</dt><dd>{{ pl.cp }}</dd>
        </div>
      </dl>
    </div>
    <!-- "Tied" is a result, so it is the result screen's. During play level scores are the
         normal state of a fresh game, and the badge sat on the turn chip's edge. -->
    <div
      v-if="finished && leaderIdx === -1"
      class="tie"
    >
      {{ labels.trackerTie }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useFlashOnChange } from '../../composables/useFlashOnChange.js'
import { useTracker, sideName, isYouSide, membersOf } from '../../composables/useTracker.js'
import { factionIndexBySlug } from '../../data/factionsIndex.js'
import { toneVars } from '../../utils/tone.js'
import FactionEmblem from '../FactionEmblem.vue'
import { primaryTotal as primaryTotalOf, secondaryTotal as secondaryTotalOf, grandTotal as grandTotalOf, leader as leaderOf, battlePoints as battlePointsOf } from '../../composables/gameScoring.js'
import { tracks } from '../../data/trackerOptions.js'

// `game` prop drives a finished/history game; defaults to the active game from the store.
const props = defineProps({
  finished: { type: Boolean, default: false },
  game: { type: Object, default: null },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current } = useTracker()
const game = computed(() => props.game || current.value)

const primaryTotal = (i) => primaryTotalOf(game.value, i)
const secondaryTotal = (i) => secondaryTotalOf(game.value, i)
const grandTotal = (i) => grandTotalOf(game.value, i)
const leaderIdx = computed(() => leaderOf(game.value))
const showCp = computed(() => tracks(game.value?.settings, 'trackCP'))
// On the RESULT, Battle Points are the headline and VP the footnote: the game is over and BP
// is what it counted for. DURING play the two swap places — VP is the number the players are
// ticking up all evening and BP merely follows it, swinging by two points on a single
// objective — so BP rides quietly beside the total instead of replacing it.
const bpMode = computed(() => props.finished && game.value?.settings?.scoreMode === 'bp')
const liveBp = computed(() => !props.finished && game.value?.settings?.scoreMode === 'bp')
const bp = computed(() => battlePointsOf(game.value))

// Whose turn it is — a live game only; a result has no "now". players[0] is the first-turn
// player, so the turn is a player index.
const turnIdx = computed(() => (props.finished ? -1 : game.value?.currentTurn === 1 ? 1 : 0))

// The army under the name: one faction, or a doubles side's two. The light factionsIndex, never
// the heavy tracker dataset.
function factionLine(pl) {
  const names = membersOf(pl).map(m => factionIndexBySlug(m.factionSlug)?.name).filter(Boolean)
  return [...new Set(names)].join(' / ')
}

function sideFaction(pl) {
  return factionIndexBySlug(membersOf(pl)[0]?.factionSlug) || null
}

// Pulse a column's grand total when it changes (scoring feedback).
const grandEls = []
useFlashOnChange(() => grandTotal(0), () => grandEls[0])
useFlashOnChange(() => grandTotal(1), () => grandEls[1])
</script>

<style scoped>
.board {
  position: relative;
  display: grid;
  /* minmax(0, …): a plain 1fr grows to its content, and the breakdown's three labels pushed the
     second card off a 320px screen. */
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}
.col {
  --side: var(--side-you);
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: 4px solid var(--side);
  padding: 0.75rem 0.9rem 0.8rem;
}
/* The emblem stamp (FactionEmblem) sits under the column's text, clipped to it. Sized on a fixed
   length, not the column: the live board's breakdown makes it taller than the result's, and one
   army's emblem should not change size between the two. */
.col { contain: paint; }
.col .stamp { height: calc(var(--stamp-k) * 4.5rem); }
.col.opp { --side: var(--side-opponent); }
/* A result wears each side's army colour instead (owner, 2026-09-29): the game is over, and "who was
   whom" reads from the armies. During play the you/opponent pair stays — it tells the two phones'
   sides apart, even in a mirror match. */
.col.themed { --side: var(--tone); }
.col.turn { background: color-mix(in srgb, var(--side) 8%, var(--bg-card)); }
/* The result screen: the winner keeps its gold edge. `leading`, not `lead`: `.lead` is the global
   intro-paragraph primitive (style.css), and its bottom margin shrank the winner's column short of
   the loser's (2026-09-29). */
.col.leading { border-top: 3px solid #e3b341; }
.col-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 0.35rem;
  margin-bottom: 0.35rem;
}
/* Room for the turn mark in the corner, so a long name wraps before it reaches it. */
.col.turn .col-head { padding-right: 2.4rem; }
.pname {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.15;
  color: var(--side);
  word-break: break-word;
}
.pfaction { font-size: 0.95rem; color: var(--text-muted); }
.pfaction::before { content: '· '; }
.turn-tag {
  position: absolute;
  top: 0.6rem;
  right: 0.8rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--side);
}
.grand {
  font-family: var(--font-display);
  font-size: 2.42rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1;
}
.grand-unit { font-size: 0.8rem; color: var(--text-dim); margin-left: 0.2rem; font-family: var(--font-mono); }
.grand-vp { font-size: 0.85rem; opacity: 0.5; margin-left: 0.4rem; font-family: var(--font-mono); font-weight: 600; }
/* The running Battle Points stand beside the VP as its equal, the same face and size. */
.grand-bp { margin-left: 1.1rem; }
.breakdown {
  display: flex;
  gap: 1.2rem;
  margin: 0.7rem 0 0;
  padding-top: 0.55rem;
  border-top: 1px solid var(--border);
}
.breakdown div { display: flex; flex-direction: column; gap: 2px; }
.breakdown dt { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); }
.breakdown dd { margin: 0; font-family: var(--font-mono); font-size: 1.15rem; font-weight: 700; color: var(--text-primary); }
/* The badge straddles the board's top edge (the result screen only). The board makes room for it
   rather than the badge moving onto the score columns. */
.board:has(.tie) { margin-top: 0.6rem; }
.tie {
  position: absolute;
  top: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.66rem;
  text-transform: uppercase;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  padding: 1px 8px;
  color: var(--text-dim);
}

/* Phones: two cards side by side still, everything one step down. */
@media (max-width: 560px) {
  .board { gap: 0.4rem; }
  .col { padding: 0.55rem 0.5rem 0.6rem; border-left-width: 3px; }
  .col.turn .col-head { padding-right: 1.9rem; }
  .pname { font-size: 1.05rem; }
  .pfaction { font-size: 0.78rem; }
  .turn-tag { top: 0.45rem; right: 0.5rem; font-size: 0.85rem; }
  .grand { font-size: 1.7rem; }
  .grand-unit { font-size: 0.7rem; }
  .grand-bp { margin-left: 0.6rem; }
  .breakdown { justify-content: space-between; gap: 0.3rem; margin-top: 0.5rem; padding-top: 0.4rem; }
  .breakdown dt { font-size: 0.58rem; letter-spacing: 0; }
  .breakdown dd { font-size: 0.95rem; }
}
</style>

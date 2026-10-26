<template>
  <div
    ref="boardEl"
    class="board"
    :class="{ stacked }"
  >
    <!-- Each side wears its colour — you in the accent, the opponent in blue, and on a result its
         army's — as a stripe down the card and on the name; the side on turn adds a wash of it and
         the "turn" mark. -->
    <div
      v-for="(pl, i) in game.players"
      :key="i"
      class="col tone"
      :class="{ lost: finished && leaderIdx !== -1 && leaderIdx !== i, turn: turnIdx === i, opp: !isYouSide(pl, i), themed: finished && !!sideFaction(pl), pickable: selected >= 0, picked: selected === i }"
      :style="finished ? toneVars(sideFaction(pl)?.color) : undefined"
      :role="selected >= 0 ? 'button' : undefined"
      :tabindex="selected >= 0 ? 0 : undefined"
      :aria-pressed="selected >= 0 ? selected === i : undefined"
      :data-press="selected >= 0 ? '' : undefined"
      @click="selected >= 0 && $emit('select', i)"
      @keydown.enter.space.prevent="selected >= 0 && $emit('select', i)"
    >
      <!-- The side's army pressed into its card, as on the history's game cards (owner,
           2026-09-29); a doubles side with two armies wears both, staggered like those cards
           (owner, 2026-10-07 — one emblem for a pair read as one army). In the board's colour for
           the side, not its own: the armies' by default, or the phone's picks ("Customise
           colours"). -->
      <FactionEmblem
        v-for="(f, fi) in sideFactions(pl)"
        :key="f?.slug || fi"
        :class="sideFactions(pl).length > 1 && (fi ? 'stamp-b' : 'stamp-a')"
        :faction="f"
        stamp
      />
      <!-- Flex with a gap, so the template's line breaks between the spans add nothing; the
           faction's "·" is drawn by CSS. -->
      <div class="col-head">
        <!-- Your side says so (owner, 2026-10-19): the board is in TURN order, so your card stands
             left in one game and right in the next, and its colour follows the army. A side whose
             name already reads "You" needs no second one. -->
        <span
          v-if="isYouSide(pl, i) && pl?.name"
          class="you-tag"
        >{{ labels.trackerYou }}</span>
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
        :ref="flashRef(`grand${i}`)"
        class="grand"
      >
        <template v-if="bpMode">
          {{ shownBp[i] }}<span class="grand-unit">BP</span>
          <span class="grand-vp">{{ shownGrand[i] }} VP</span>
        </template>
        <template v-else>
          {{ shownGrand[i] }}<span class="grand-unit">VP</span><span
            v-if="liveBp"
            class="grand-bp"
          >{{ shownBp[i] }}<span class="grand-unit">BP</span></span>
        </template>
      </div>
      <dl
        v-if="!finished"
        class="breakdown"
      >
        <div>
          <dt>{{ labels.trackerPrimary }}</dt><dd :ref="flashRef(`primary${i}`)">
            {{ shownPrimary[i] }}
          </dd>
        </div>
        <!-- No secondaries in Combat Patrol: a player scores their box's mission alone. -->
        <div v-if="!game?.settings?.combatPatrol">
          <dt>{{ labels.trackerSecondary }}</dt><dd :ref="flashRef(`secondary${i}`)">
            {{ shownSecondary[i] }}
          </dd>
        </div>
        <div v-if="showCp">
          <dt>{{ labels.trackerCp }}</dt><dd :ref="flashRef(`cp${i}`)">
            {{ shownCp[i] }}
          </dd>
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
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useFlashOnChange } from '../../composables/useFlashOnChange.js'
import { useCountUp } from '../../composables/useCountUp.js'
import { useTracker, sideName, isYouSide, membersOf } from '../../composables/useTracker.js'
import { factionIndexBySlug } from '../../data/factionsIndex.js'
import { toneVars } from '../../utils/tone.js'
import FactionEmblem from '../FactionEmblem.vue'
import { primaryTotal as primaryTotalOf, secondaryTotal as secondaryTotalOf, grandTotal as grandTotalOf, leader as leaderOf, battlePoints as battlePointsOf } from '../../core/game/gameScoring.js'
import { tracks } from '../../data/trackerOptions.js'
import { turnIndex } from '../../core/game/clock.js'

// `game` prop drives a finished/history game; defaults to the active game from the store.
const props = defineProps({
  finished: { type: Boolean, default: false },
  game: { type: Object, default: null },
  // The side the panel under the board shows (the game screen's CP tab): the cards ARE the side
  // switch there, so the panel needs no tabs of its own (owner, 2026-10-06). -1: not a switch.
  selected: { type: Number, default: -1 },
})
defineEmits(['select'])
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
// Nobody's before the roll for the first turn (PreBattle): the order is provisional until then.
const turnIdx = computed(() => (props.finished || game.value?.firstTurnPending ? -1 : turnIndex(game.value)))

// The army under the name: one faction, or a doubles side's two. The light factionsIndex, never
// the heavy tracker dataset.
function factionLine(pl) {
  const names = membersOf(pl).map(m => factionIndexBySlug(m.factionSlug)?.name).filter(Boolean)
  return [...new Set(names)].join(' / ')
}

// The side's armies, each faction once (a doubles pair of one faction is one emblem), two at most.
function sideFactions(pl) {
  const out = []
  for (const m of membersOf(pl)) {
    const f = factionIndexBySlug(m?.factionSlug)
    if (f && !out.some((x) => x.slug === f.slug)) out.push(f)
  }
  return out.length ? out.slice(0, 2) : [null]
}
// The side's colour on a result is its first army's.
const sideFaction = (pl) => sideFactions(pl)[0]

// The two heads break alike (owner, 2026-10-06): if one side's faction does not fit beside its
// name and drops to a second line, the other's drops too, so the scores and the breakdowns stand
// level instead of one card running a line lower. Flex wrapping cannot see the neighbour, so it is
// measured: with `stacked` off, does any faction sit below its name? Done on the element in one
// go — class off, read, class back — so nothing is painted in between; the ref then settles it.
const boardEl = ref(null)
const stacked = ref(false)
function measure() {
  const el = boardEl.value
  if (!el) return
  const was = el.classList.contains('stacked')
  el.classList.remove('stacked')
  const wraps = [...el.querySelectorAll('.col-head')].some((h) => {
    const name = h.querySelector('.pname')
    const fac = h.querySelector('.pfaction')
    return name && fac && fac.offsetTop > name.offsetTop + 2
  })
  if (was) el.classList.add('stacked')
  stacked.value = wraps
}
let ro = null
onMounted(() => {
  measure()
  // The display face arrives after the first paint, and it is narrower than the fallback.
  document.fonts?.ready.then(measure)
  if (typeof ResizeObserver !== 'undefined' && boardEl.value) {
    ro = new ResizeObserver(() => measure())
    ro.observe(boardEl.value)
  }
})
onBeforeUnmount(() => ro?.disconnect())
// A name, an army or the turn mark (it reserves room in the head) changes what fits.
watch([() => game.value?.players?.map((pl, i) => `${sideName(pl, i, labels.value)}|${factionLine(pl)}`).join('/'), () => turnIdx.value],
  () => nextTick(measure))

// Every number on the board runs to its new value and pulses, as the roster total does
// (owner, 2026-10-08): scoring is seen landing, here and from the other phone alike. A board
// always has two sides.
const scores = {
  grand: grandTotal,
  primary: primaryTotal,
  secondary: secondaryTotal,
  cp: (i) => game.value?.players?.[i]?.cp ?? 0,
}
const counted = (of) => {
  const runs = [0, 1].map((i) => useCountUp(() => of(i)))
  return computed(() => runs.map((r) => r.value))
}
const shownGrand = counted(scores.grand)
const shownPrimary = counted(scores.primary)
const shownSecondary = counted(scores.secondary)
const shownCp = counted(scores.cp)
const shownBp = counted((i) => bp.value[i])
const flashEls = {}
const flashRef = (key) => (el) => { flashEls[key] = el }
for (const [name, of] of Object.entries(scores)) {
  for (const i of [0, 1]) useFlashOnChange(() => of(i), () => flashEls[`${name}${i}`])
}
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
  padding: 0.55rem 0.9rem 0.55rem;
}
/* The emblem stamp (FactionEmblem) sits under the column's text, clipped to it. Sized on a fixed
   length, not the column: the live board's breakdown makes it taller than the result's, and one
   army's emblem should not change size between the two. */
.col { contain: paint; }
.col .stamp { height: calc(var(--stamp-k) * 4.5rem); color: var(--side); }
/* Two armies on one side: smaller and staggered, the first high and further in, the second low and
   nearer the edge — the history cards' arrangement (TrackerHomeView's gc-stamp--a/b). */
.col .stamp.stamp-a,
.col .stamp.stamp-b { height: calc(var(--stamp-k) * 3.6rem); }
.col .stamp.stamp-a { top: 32%; right: 4.6rem; }
.col .stamp.stamp-b { top: 72%; right: 1.6rem; }
.col.opp { --side: var(--side-opponent); }
/* A result wears each side's army colour instead (owner, 2026-09-29): the game is over, and "who was
   whom" reads from the armies. During play the you/opponent pair stays — it tells the two phones'
   sides apart, even in a mirror match. */
.col.themed { --side: var(--tone); }
.col.turn { background: color-mix(in srgb, var(--side) 8%, var(--bg-card)); }
/* The result screen: the loser's column goes grey and faint, the winner's stays in its army's
   colour (owner, 2026-10-04). A gold top edge marked the winner before, and once every column wore
   its army's colour on the left, two colours met in its corner and read as decoration. A tie
   dims neither — the "tied" line under the board says it. */
.col.lost { filter: grayscale(1); opacity: 0.55; }
/* As the side switch: the chosen card is framed in its colour with a bar along its foot — the
   same colour frames the panel below, which is what ties the two together. Not the turn's wash:
   whose turn it is and whose side is on screen are two different answers. */
.col.pickable {
  cursor: pointer;
  transition: border-color var(--motion-fast), box-shadow var(--motion-fast);
  /* A button, not text: quick taps on a desk were selecting the numbers (owner, 2026-10-06). */
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.col.picked { border-color: var(--side); box-shadow: inset 0 -4px 0 var(--side); }
.col-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 0.35rem;
  margin-bottom: 0.2rem;
}
/* Room for the turn mark in the corner, so a long name wraps before it reaches it. */
.col.turn .col-head { padding-right: 2.4rem; }
.pname {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.15;
  color: var(--side);
  /* One line whatever its length: a long name is cut with "…" (owner, 2026-09-29) rather than
     wrapping the column taller than its neighbour. */
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* A label, not a pill: the side's colour on a hairline, as small as the army line beside it. */
.you-tag {
  align-self: center;
  padding: 0 0.3rem;
  border: 1px solid var(--side);
  color: var(--side);
  font-size: 0.7rem;
  font-weight: 700;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.pfaction { font-size: 0.95rem; color: var(--text-muted); }
.pfaction::before { content: '· '; }
/* Both heads on two lines (see measure()): the army on a line of its own, without the joining dot. */
.board.stacked .pfaction { flex-basis: 100%; }
.board.stacked .pfaction::before { content: none; }
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
  font-size: 2.8rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1;
}
.grand-unit { font-size: 0.8rem; color: var(--text-dim); margin-left: 0.2rem; font-family: var(--font-mono); }
.grand-vp { font-size: 0.85rem; opacity: 0.5; margin-left: 0.4rem; font-family: var(--font-mono); font-weight: 600; }
/* The running Battle Points stand beside the VP as its equal, the same face and size. */
.grand-bp { margin-left: 1.1rem; }
/* Grouped at the left under the score, not spread across the card (owner, 2026-09-29). */
.breakdown {
  display: flex;
  gap: 1.1rem;
  margin: 0.45rem 0 0;
  padding-top: 0.35rem;
  /* Not var(--border): on the dark card (#303035) it is #3a3a40 and vanished, showing only where it
     crossed the stamp (owner, 2026-10-06). The muted text colour reads on both themes. */
  border-top: 1px solid color-mix(in srgb, var(--text-muted) 35%, transparent);
}
.breakdown div { display: flex; flex-direction: column; gap: 0; }
.breakdown dt { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); }
/* The main score's face (owner, 2026-09-29), a size under it. */
.breakdown dd { margin: 0; font-family: var(--font-display); font-size: 1.75rem; line-height: 1; font-weight: 500; color: var(--text-primary); }
/* The badge straddles the board's top edge (the result screen only). The board makes room for it
   rather than the badge moving onto the score columns. */
/* The plate stands wholly above the cards: half over them, it covered the top of the right-hand
   name (acceptance, 2026-10-18). */
.board:has(.tie) { margin-top: 1.35rem; }
.tie {
  position: absolute;
  bottom: calc(100% + 0.25rem);
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
  .col { padding: 0.4rem 0.5rem 0.4rem; border-left-width: 3px; }
  .col.turn .col-head { padding-right: 1.9rem; }
  .pname { font-size: 1.05rem; }
  .pfaction { font-size: 0.78rem; }
  .turn-tag { top: 0.45rem; right: 0.5rem; font-size: 0.85rem; }
  .grand { font-size: 2rem; }
  .grand-unit { font-size: 0.7rem; }
  .grand-bp { margin-left: 0.6rem; }
  .breakdown { gap: 0.8rem; margin-top: 0.35rem; padding-top: 0.3rem; }
  .breakdown dt { font-size: 0.58rem; letter-spacing: 0; }
  .breakdown dd { font-size: 1.4rem; }
}
/* The narrowest phones: the three labels fill the card, so the gap is what gives. */
@media (max-width: 380px) {
  .breakdown { gap: 0.4rem; }
}
@media (max-width: 340px) {
  .breakdown { gap: 0.3rem; }
  .breakdown dt { font-size: 0.52rem; }
}
</style>

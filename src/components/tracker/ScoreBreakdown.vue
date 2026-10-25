<template>
  <div
    class="breakdown"
    :class="controlled ? ['side-frame', { opp: !isYouSide(game.players[side], side) }] : null"
  >
    <button
      v-if="!expanded"
      class="bd-toggle"
      :aria-expanded="open"
      @click="open = !open"
    >
      <i
        class="wi"
        :class="open ? 'wi-chevron-up' : 'wi-chevron-down'"
      />
      {{ labels.trackerDetails }}
    </button>

    <CollapseTransition :show="expanded || open">
      <div class="bd-body">
        <div
          v-for="{ pl, i } in shown"
          :key="i"
          class="bd-player"
          :class="{ opp: !isYouSide(pl, i) }"
        >
          <div
            v-if="!controlled"
            class="bd-name"
            :class="{ win: leaderIdx === i }"
          >
            {{ sideName(pl, i, labels) }}
          </div>

          <div class="grid">
            <!-- The rounds over their columns and the total over its own: without them a reader
                 had to guess which cell was which round (QA, 2026-10-17). -->
            <div class="g-label" />
            <div
              v-for="r in ROUND_COUNT"
              :key="'h'+r"
              class="g-head"
            >
              {{ r }}
            </div>
            <div class="g-head g-head-total">
              {{ labels.trackerTotal }}
            </div>

            <!-- Went first -->
            <div class="g-label">
              {{ labels.trackerWentFirst }}
            </div>
            <div
              v-for="r in ROUND_COUNT"
              :key="'wf'+r"
              class="g-cell"
            >
              <span
                v-if="r === 1 && game.settings.firstTurn === i + 1"
                class="tick"
              >✓</span>
            </div>
            <div class="g-total" />

            <!-- Primary — named as what it is; the disposition beside the name read as a mission. -->
            <div class="g-label">
              {{ labels.trackerPrimary }}
            </div>
            <div
              v-for="r in ROUND_COUNT"
              :key="'pr'+r"
              class="g-cell"
            >
              {{ pl.rounds[r - 1].primary || '-' }}
            </div>
            <div class="g-total">
              {{ primaryTotal(i) }}/{{ PRIMARY_GAME_CAP }}
            </div>

            <!-- Secondary missions: the sum per round and the game's total on a line of their own
                 (with every cap applied — secondaryRounds), then each card's own scores under it.
                 The total used to sit on the first card's line, as if it were that card's. -->
            <div class="g-label">
              {{ labels.trackerSecondary }}
            </div>
            <div
              v-for="r in ROUND_COUNT"
              :key="'st'+r"
              class="g-cell"
            >
              {{ secRounds(pl)[r - 1] || '-' }}
            </div>
            <div class="g-total">
              {{ secondaryTotal(i) }}/{{ SECONDARY_GAME_CAP }}
            </div>
            <template
              v-for="sec in secondaries(i)"
              :key="'s'+sec.slug"
            >
              <div class="g-label sec-label">
                {{ sec.name }}
              </div>
              <div
                v-for="r in ROUND_COUNT"
                :key="'s'+sec.slug+r"
                class="g-cell"
              >
                <template v-if="r >= sec.from && r <= sec.to">
                  {{ sec.vp[r] || '-' }}
                </template>
              </div>
              <div class="g-total" />
            </template>

            <!-- Battle Ready -->
            <div class="g-label">
              {{ labels.trackerBattleReady }}
            </div>
            <div class="g-cell g-span5" />
            <div class="g-total">
              {{ pl.battleReady ? BATTLE_READY_VP : 0 }}/{{ BATTLE_READY_VP }}
            </div>

            <!-- Battle Points, round by round — the running result, i.e. what the game would
                 have ended on after each round. Only for a game played to BP: in VP mode it is
                 a number nobody at that table is playing to. -->
            <template v-if="showBp">
              <div class="g-label">
                {{ labels.trackerScoreBp }}
              </div>
              <div
                v-for="r in ROUND_COUNT"
                :key="'bp'+r"
                class="g-cell"
              >
                {{ r <= bpUpTo ? bpRounds[i][r - 1] : '' }}
              </div>
              <div class="g-total">
                {{ bpNow[i] }}/20
              </div>
            </template>

            <!-- CP -->
            <template v-if="showCp">
              <div class="g-label">
                {{ labels.trackerCp }}
              </div>
              <div class="g-cell g-span5" />
              <div class="g-total">
                {{ pl.cp }}
              </div>
            </template>
          </div>
          <!-- Where the CP went, from the ledger (cpLedger.js): a game started before it has none. -->
          <div
            v-if="showCp && spends(pl).length"
            class="bd-spent"
          >
            <div class="bs-head">
              <span>{{ labels.trackerCpSpent }}</span>
              <b>{{ spentTotal(pl) }} CP</b>
            </div>
            <div
              v-for="(e, k) in spends(pl)"
              :key="k"
              class="bs-row"
            >
              <span>{{ labels.trackerRoundShort }} {{ e.round }} · {{ spendName(pl, e) }}</span>
              <b>{{ -e.amount }} CP</b>
            </div>
          </div>
        </div>
      </div>
    </CollapseTransition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { sideName, isYouSide } from '../../composables/useTracker.js'
import { spends } from '../../composables/cpLedger.js'
import CollapseTransition from '../CollapseTransition.vue'
import {
  useTracker, ROUND_COUNT, PRIMARY_GAME_CAP, SECONDARY_GAME_CAP, BATTLE_READY_VP,
  missionBySlug,
} from '../../composables/useTracker.js'
import {
  BATTLE_READY_VP as BR_VP,
  battlePoints,
  battlePointsFromVp,
  leader as leaderOf,
  primaryTotal as primaryTotalOf,
  roundBreakdown,
  secondaryTotal as secondaryTotalOf,
  secondaryRounds,
} from '../../composables/gameScoring.js'
import { tracks } from '../../data/trackerOptions.js'

// `game` prop drives a finished/history game; defaults to the active game from the store.
// `expanded`: the game screen's Stats tab, where the table IS the content — no toggle over it.
const props = defineProps({
  game: { type: Object, default: null },
  expanded: { type: Boolean, default: false },
  // The side picked on the score cards (the game screen's Stats tab): that side's table alone,
  // framed in its colour — the card above already names it. Elsewhere both, one under the other.
  side: { type: Number, default: null },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current } = useTracker()
const game = computed(() => props.game || current.value)
const controlled = computed(() => props.side === 0 || props.side === 1)
const shown = computed(() => game.value.players.map((pl, i) => ({ pl, i })).filter(({ i }) => !controlled.value || i === props.side))
// Through `tracks`, so an ancient game with no flag at all still shows the row it played with.
const showCp = computed(() => tracks(game.value?.settings, 'trackCP'))

// The Battle Points line: what each round would have ended on (cumulative VP + the
// Battle-Ready bonus, run through the same table the finished game uses) and where they stand
// now. Same computation the broadcast payload publishes, off the same helpers.
const showBp = computed(() => game.value?.settings?.scoreMode === 'bp')
const bpNow = computed(() => battlePoints(game.value))
// Only the rounds that have begun: a round not played yet has no result of its own, and the running
// total repeated into it read as points already scored (Misha, 2026-10-10). A finished game too: it
// may have ended in round 2 (a concession, "save and start a new one"), and the breakdown is only
// ever seen once a game is over — "a finished game shows all" made the fix invisible (acceptance,
// 2026-10-18). A game played out stands on round 5, so it still shows all five.
const bpUpTo = computed(() => Math.min(ROUND_COUNT, game.value?.currentRound || 1))
const bpRounds = computed(() => {
  const g = game.value
  if (!g) return [[], []]
  const rounds = [roundBreakdown(g, 0), roundBreakdown(g, 1)]
  const bonus = [0, 1].map((i) => (g.players?.[i]?.battleReady ? BR_VP : 0))
  const out = [[], []]
  for (let r = 0; r < ROUND_COUNT; r++) {
    const [a, b] = battlePointsFromVp(
      rounds[0][r].cumulativeVp + bonus[0],
      rounds[1][r].cumulativeVp + bonus[1],
    )
    out[0].push(a)
    out[1].push(b)
  }
  return out
})

const spentTotal = (pl) => spends(pl).reduce((s, e) => s - e.amount, 0)
// A stratagem spend carries its name; the 1CP replacement names the card it replaced.
function spendName(pl, e) {
  if (e.source === 'redraw') {
    return `${labels.value.trackerCpRedraw} · ${missionBySlug(e.ref, pl.role, locale.value)?.name || e.ref}`
  }
  return e.name || ''
}
const primaryTotal = (i) => primaryTotalOf(game.value, i)
const secondaryTotal = (i) => secondaryTotalOf(game.value, i)
const secRounds = (pl) => secondaryRounds(pl)
const open = ref(false)
const leaderIdx = computed(() => leaderOf(game.value))

// Every secondary that was ever in play for this player, with its active range and per-round VP.
function secondaries(pi) {
  const pl = game.value.players[pi]
  const s = pl.secondary
  const drawn = s.drawn || {}
  const slugs = []
  const seen = new Set()
  const add = slug => { if (!seen.has(slug)) { seen.add(slug); slugs.push(slug) } }
  for (const e of s.scored) add(e.slug)
  for (const d of (s.discarded || [])) add(d.slug ?? d)
  for (const slug of s.hand) add(slug)

  const lastRound = game.value.currentRound
  return slugs.map(slug => {
    const m = missionBySlug(slug, pl.role, locale.value)
    const disc = (s.discarded || []).find(d => (d.slug ?? d) === slug)
    const from = drawn[slug] || 1
    const to = disc ? (disc.round ?? lastRound) : lastRound
    const vp = {}
    for (const e of s.scored) if (e.slug === slug) vp[e.round] = (vp[e.round] || 0) + (e.vp || 0)
    return { slug, name: m ? m.name : slug, from, to, vp }
  }).sort((a, b) => a.from - b.from)
}
</script>

<style scoped>
.breakdown { margin-top: 0.75rem; }
.breakdown.side-frame { --side: var(--side-you); margin-top: 0; }
.breakdown.side-frame.opp { --side: var(--side-opponent); }
/* Inside the frame the table is the panel itself: no card of its own (a box in a box). */
.side-frame .bd-body { margin-top: 0.3rem; }
.side-frame .bd-player { border: 0; padding: 0; background: none; }
.bd-toggle {
  display: flex; align-items: center; justify-content: center; gap: 0.4rem;
  width: 100%; padding: 0.6rem 1rem;
  background: var(--bg-card); border: 1px solid var(--border);
  color: var(--text-primary); font-size: 0.85rem; font-weight: 600; cursor: pointer;
}
.bd-toggle:hover { border-color: var(--accent); }
.bd-body { margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.75rem; }
.bd-player {
  background: var(--bg-card); border: 1px solid var(--border); padding: 0.8rem;
}
.bd-name { font-family: var(--font-display); font-size: 1.45rem; font-weight: 500; color: var(--text-primary); margin-bottom: 0.6rem; overflow-wrap: anywhere; }
.bd-player { --side: var(--side-you); }
.bd-player.opp { --side: var(--side-opponent); }
/* The side's own colour, as on its score card — the accent red read as a third side. */
.bd-name.win { color: var(--side); }

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) repeat(5, 28px) auto;
  gap: 3px;
  align-items: center;
}
.g-head { text-align: center; font-size: 0.7rem; font-weight: 700; color: var(--text-dim); }
.g-head-total { text-align: left; padding-left: 0.6rem; }
.g-label {
  font-size: 0.82rem;
  color: var(--text-muted);
  padding-right: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* A card's name wraps rather than cut to «A Tempting Ta…» on a 320px phone (acceptance, 2026-10-18). */
.sec-label { font-size: 0.78rem; white-space: normal; line-height: 1.2; align-self: center; }
.g-cell {
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-primary);
}
.g-cell:empty { background: transparent; }
.g-span5 { grid-column: 2 / 7; background: transparent; }
.g-total {
  padding-left: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-muted);
  white-space: nowrap;
  display: flex;
  align-items: center;
}
.tick { color: var(--side); font-weight: 700; }

@media (max-width: 420px) {
  .grid { grid-template-columns: minmax(0, 1fr) repeat(5, 24px) auto; gap: 2px; }
  .g-cell { height: 24px; font-size: 0.74rem; }
  .g-label { font-size: 0.76rem; }
  .g-total { padding-left: 0.4rem; font-size: 0.76rem; }
}
/* Where the CP went: a list under the table, a rule above it. */
.bd-spent { margin-top: 0.6rem; padding-top: 0.5rem; border-top: 1px solid var(--border); font-size: 0.82rem; }
.bs-head, .bs-row { display: flex; justify-content: space-between; gap: 0.5rem; padding: 0.15rem 0; }
.bs-head { font-weight: 700; color: var(--text-primary); }
.bs-row { color: var(--text-muted); }
.bs-row b { color: var(--text-primary); white-space: nowrap; }
</style>

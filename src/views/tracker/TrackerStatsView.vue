<template>
  <div class="stats-view">
    <RouterLink to="/tracker" class="back">
      <i class="bi bi-chevron-left"></i> {{ labels.subNavTrackerHome }}
    </RouterLink>

    <div class="hero">
      <h1>{{ labels.statsTitle }}</h1>
      <p class="hero-desc">{{ labels.statsDesc }}</p>
    </div>

    <p v-if="!s.games" class="empty">{{ labels.statsEmpty }}</p>

    <template v-else>
      <!-- The numbers a player would recite from memory, in the order they would recite them. -->
      <ul class="cards">
        <li class="card">
          <span class="c-val">{{ s.games }}</span>
          <span class="c-lab">{{ labels.statsGames }}</span>
        </li>
        <li class="card">
          <span class="c-val">{{ record }}</span>
          <span class="c-lab">{{ labels.statsRecord }}</span>
        </li>
        <li class="card" :class="{ soft: !s.enough }">
          <span class="c-val">{{ s.enough ? pct(s.winrate) : '—' }}</span>
          <span class="c-lab">{{ labels.statsWinrate }}</span>
        </li>
        <li class="card">
          <span class="c-val">{{ round1(s.avgFor) }}<span class="c-sep">:</span>{{ round1(s.avgAgainst) }}</span>
          <span class="c-lab">{{ labels.statsAvgScore }}</span>
        </li>
        <li class="card">
          <span class="c-val" :class="diffClass">{{ signed(s.avgDiff) }}</span>
          <span class="c-lab">{{ labels.statsAvgDiff }}</span>
        </li>
        <li class="card">
          <span class="c-val">{{ round1(s.avgBp) }}</span>
          <span class="c-lab">{{ labels.statsAvgBp }}</span>
        </li>
        <li class="card">
          <span class="c-val" :class="'res-' + (s.current.side || 'draw')">{{ streakText }}</span>
          <span class="c-lab">{{ labels.statsStreak }}</span>
        </li>
        <li class="card">
          <span class="c-val">{{ s.bestWin }}</span>
          <span class="c-lab">{{ labels.statsBestWin }}</span>
        </li>
      </ul>

      <!-- Two honesty notes, and they belong at the top rather than in a footnote: what the page
           refuses to turn into a percentage, and what it left out of the count entirely. -->
      <p v-if="!s.enough" class="note">{{ smallSampleNote }}</p>
      <p v-if="s.skipped" class="note">{{ skippedNote }}</p>

      <section class="block">
        <h2>{{ labels.statsCurve }}</h2>
        <p class="block-hint">{{ labels.statsCurveHint }}</p>
        <StatCurve :rounds="s.rounds" :aria="labels.statsCurve" :round-label="roundLetter" />
        <p class="legend">
          <span class="lg you">{{ labels.trackerYou }}</span>
          <span class="lg opp">{{ labels.trackerOpponent }}</span>
        </p>
      </section>

      <section class="block">
        <h2>{{ labels.statsSplit }}</h2>
        <StatStack :rows="splitRows" :parts="splitParts" />
      </section>

      <section v-if="s.firstTurn.length" class="block">
        <h2>{{ labels.statsFirstTurn }}</h2>
        <StatBars :rows="turnRows" />
      </section>

      <section v-if="s.byFaction.length" class="block">
        <h2>{{ labels.statsMyFactions }}</h2>
        <StatBars :rows="rateRows(s.byFaction, factionName)" />
      </section>

      <section v-if="s.byDetachment.length" class="block">
        <h2>{{ labels.statsMyDetachments }}</h2>
        <StatBars :rows="rateRows(s.byDetachment)" />
      </section>

      <section v-if="s.byOpponent.length" class="block">
        <h2>{{ labels.statsOpponents }}</h2>
        <StatBars :rows="rateRows(s.byOpponent, factionName)" />
      </section>

      <section v-if="s.byMission.length" class="block">
        <h2>{{ labels.statsMissions }}</h2>
        <StatBars :rows="rateRows(s.byMission, primaryName)" />
      </section>

      <section v-if="s.bySize.length > 1" class="block">
        <h2>{{ labels.statsFormat }}</h2>
        <StatBars :rows="rateRows(s.bySize, sizeName)" />
      </section>

      <!-- The one breakdown nobody else has: every card is logged with the round it was taken,
           scored or binned, so this is what each of them actually paid you. -->
      <section v-if="s.secondaries.length" class="block">
        <h2>{{ labels.statsSecondaries }}</h2>
        <StatBars :rows="secondaryRows" />
      </section>

      <section v-if="rosterRows.length" class="block">
        <h2>{{ labels.statsRosters }}</h2>
        <ul class="rosters">
          <li v-for="r in rosterRows" :key="r.id" class="ros">
            <component :is="r.link ? RouterLink : 'span'" :to="r.link" class="ros-name">
              {{ r.name }}
            </component>
            <span class="ros-meta">{{ r.meta }}</span>
            <span class="ros-rec">{{ r.record }}</span>
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>

<script setup>
// Battle Record (/tracker/stats). All aggregation lives in gameStats.js; this file only decides
// how it reads — including where it must NOT read as a rate (MIN_SAMPLE), which is why almost
// every row here can come out dimmed with a raw W–L instead of a percentage.
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import StatBars from '../../components/tracker/stats/StatBars.vue'
import StatCurve from '../../components/tracker/stats/StatCurve.vue'
import StatStack from '../../components/tracker/stats/StatStack.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, BATTLE_SIZES, missionBySlug } from '../../composables/useTracker.js'
import { useRosters } from '../../composables/useRosters.js'
import { MIN_SAMPLE, buildStats, rosterRecords } from '../../composables/gameStats.js'
import { factionIndexBySlug } from '../../data/factionsIndex.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { history } = useTracker()
const { rosters } = useRosters()

const s = computed(() => buildStats(history.value))
const records = computed(() => rosterRecords(history.value))

const record = computed(() => `${s.value.record.w}–${s.value.record.l}–${s.value.record.d}`)
const roundLetter = computed(() => (locale.value === 'ru' ? 'Р' : 'R'))
const diffClass = computed(() => (s.value.avgDiff > 0 ? 'res-win' : s.value.avgDiff < 0 ? 'res-loss' : ''))
const smallSampleNote = computed(() => labels.value.statsSmallSample.replace('{n}', String(MIN_SAMPLE)))
const skippedNote = computed(() => labels.value.statsSkipped.replace('{n}', String(s.value.skipped)))

const streakText = computed(() => {
  const { side, len } = s.value.current
  if (!side) return '—'
  const word = side === 'win' ? labels.value.statsStreakWin
    : side === 'loss' ? labels.value.statsStreakLoss
      : labels.value.statsStreakDraw
  return `${len} ${word}`
})

function pct(v) { return `${Math.round(v * 100)}%` }
function round1(v) { return Math.round(v) }
function signed(v) { const n = Math.round(v); return n > 0 ? `+${n}` : String(n) }
function wld(r) { return `${r.w}–${r.l}–${r.d}` }

// A breakdown row reads as a rate only once it has the games to back one; under that it shows the
// record and steps back visually (`dim`) rather than disappearing.
function rateRows(list, labelOf) {
  return list.map((r) => ({
    key: r.key,
    label: labelOf ? labelOf(r.key) : r.key,
    ratio: r.enough ? r.winrate : 1,
    value: r.enough ? `${pct(r.winrate)} · ${wld(r)}` : wld(r),
    dim: !r.enough,
  }))
}

function factionName(slug) {
  return factionIndexBySlug(slug)?.name || labels.value.trackerUnknownFaction
}
function primaryName(slug) {
  const m = missionBySlug(slug, null, locale.value)
  return m ? (m.nameRu || m.name) : slug
}
function sizeName(id) {
  if (id === 'combat-patrol') return labels.value.trackerGameTypeCombatPatrol
  return BATTLE_SIZES.find((b) => b.id === id)?.name || id
}

const turnRows = computed(() => {
  const label = { first: labels.value.statsGoingFirst, second: labels.value.statsGoingSecond }
  return rateRows(s.value.firstTurn).map((r) => ({ ...r, label: label[r.key] || r.key }))
})

const splitParts = computed(() => [
  { key: 'primary', label: labels.value.statsPrimary },
  { key: 'secondary', label: labels.value.statsSecondary },
  { key: 'bonus', label: labels.value.statsBonus },
])
const splitRows = computed(() => [
  { key: 'you', label: labels.value.trackerYou, value: s.value.split.you },
  { key: 'opp', label: labels.value.trackerOpponent, value: s.value.split.opp },
])

// Secondaries are ranked by what they paid, not by a win rate — the bar is the average scoring
// against the 5VP a tactical card can pay at most.
const secondaryRows = computed(() => s.value.secondaries.map((r) => {
  const m = missionBySlug(r.slug, r.role, locale.value)
  const l = labels.value
  const bits = [`${l.statsSecTaken} ${r.drawn}`, `${l.statsSecScored} ${r.scored}`]
  if (r.discarded) bits.push(`${l.statsSecDiscarded} ${r.discarded}`)
  return {
    key: `${r.slug}|${r.role}`,
    label: m ? (m.nameRu || m.name) : r.slug,
    sub: bits.join(' · '),
    ratio: Math.min(1, r.avgVp / 5),
    value: `${r.vp} VP`,
    dim: !r.scored,
  }
}))

// Per-list record. `rosterId` may dangle — a list can be deleted or renamed after the game — so a
// missing list keeps its record under the name the game's own snapshot carries.
const rosterRows = computed(() => [...records.value.entries()].map(([id, rec]) => {
  const saved = rosters.value.find((r) => r.id === id) || null
  const faction = saved ? factionIndexBySlug(saved.faction)?.name : null
  const meta = saved
    ? [faction, `${saved.summary?.points || 0} ${labels.value.rosterPointsLabel}`].filter(Boolean).join(' · ')
    : labels.value.statsRosterDeleted
  return {
    id,
    name: (saved?.name || rec.name || labels.value.rosterUntitled),
    meta,
    record: rec.enough ? `${pct(rec.winrate)} · ${wld(rec)}` : wld(rec),
    link: saved ? `/roster/${id}/view` : null,
  }
}).sort((a, b) => a.name.localeCompare(b.name)))
</script>

<style scoped>
.stats-view { padding-top: 0.5rem; max-width: 46rem; margin: 0 auto; }

.hero { padding: 0.8rem 0 0.6rem; border-bottom: 2px solid var(--accent); margin-bottom: 1.2rem; }
.hero h1 { font-family: var(--font-display); font-size: 2.4rem; font-weight: 400; color: var(--text-primary); }
.hero-desc { margin: 0.35rem 0 0; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.55; }

.empty { color: var(--text-muted); font-size: 0.9rem; }

.cards {
  list-style: none;
  margin: 0 0 0.8rem;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
  gap: 0.5rem;
}
.card {
  padding: 0.6rem 0.7rem;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
}
.c-val {
  display: block;
  font-family: var(--font-display);
  font-size: 1.6rem;
  line-height: 1.1;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}
.c-sep { color: var(--text-dim); margin: 0 0.15rem; }
.c-lab { display: block; margin-top: 0.15rem; font-size: 0.7rem; color: var(--text-muted); }
.card.soft .c-val { color: var(--text-dim); }
.res-win { color: #e3b341; }
.res-loss { color: #c0392b; }

.note { margin: 0 0 0.5rem; font-size: 0.75rem; color: var(--text-dim); line-height: 1.5; }

.block { margin-top: 1.6rem; }
.block h2 {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--accent);
  margin-bottom: 0.4rem;
}
.block-hint { margin: -0.2rem 0 0.6rem; font-size: 0.78rem; color: var(--text-muted); }

.legend { display: flex; gap: 1rem; margin: 0.4rem 0 0; font-size: 0.75rem; }
.lg::before {
  content: '';
  display: inline-block;
  width: 0.9rem;
  height: 0;
  margin-right: 0.35rem;
  vertical-align: middle;
  border-top: 2px solid currentColor;
}
.lg.you { color: var(--accent); }
.lg.opp { color: var(--text-dim); }
.lg.opp::before { border-top-style: dashed; }

.rosters { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; }
.ros {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.1rem 0.6rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--border-light);
  font-size: 0.85rem;
}
.ros-name { color: var(--text-primary); text-decoration: none; }
a.ros-name:hover { color: var(--accent); }
.ros-rec { grid-row: span 2; align-self: center; color: var(--text-secondary); font-variant-numeric: tabular-nums; }
.ros-meta { font-size: 0.75rem; color: var(--text-dim); }
</style>

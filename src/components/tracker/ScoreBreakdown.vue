<template>
  <div class="breakdown">
    <button class="bd-toggle" @click="open = !open" :aria-expanded="open">
      <i class="bi" :class="open ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
      {{ labels.trackerDetails }}
    </button>

    <div v-if="open" class="bd-body">
      <div v-for="(pl, i) in current.players" :key="i" class="bd-player">
        <div class="bd-name" :class="{ win: leaderIdx === i }">{{ pl.name || `${labels.trackerPlayer} ${i + 1}` }}</div>

        <div class="grid">
          <!-- Went first -->
          <div class="g-label">{{ labels.trackerWentFirst }}</div>
          <div v-for="r in ROUND_COUNT" :key="'wf'+r" class="g-cell">
            <span v-if="r === 1 && current.settings.firstTurn === i + 1" class="tick">✓</span>
          </div>
          <div class="g-total"></div>

          <!-- Primary -->
          <div class="g-label">{{ dispositionName(pl.disposition) }}</div>
          <div v-for="r in ROUND_COUNT" :key="'pr'+r" class="g-cell">
            {{ pl.rounds[r - 1].primary || '-' }}
          </div>
          <div class="g-total">{{ primaryTotal(i) }}/{{ PRIMARY_GAME_CAP }}</div>

          <!-- Secondary missions -->
          <template v-for="(sec, si) in secondaries(i)" :key="'s'+sec.slug">
            <div class="g-label sec-label">{{ sec.name }}</div>
            <div v-for="r in ROUND_COUNT" :key="'s'+sec.slug+r" class="g-cell">
              <template v-if="r >= sec.from && r <= sec.to">{{ sec.vp[r] || '-' }}</template>
            </div>
            <div class="g-total">{{ si === 0 ? `${secondaryTotal(i)}/${SECONDARY_GAME_CAP}` : '' }}</div>
          </template>

          <!-- Battle Ready -->
          <div class="g-label">{{ labels.trackerBattleReady }}</div>
          <div class="g-cell g-span5"></div>
          <div class="g-total">{{ pl.battleReady ? BATTLE_READY_VP : 0 }}/{{ BATTLE_READY_VP }}</div>

          <!-- CP -->
          <template v-if="current.settings.trackCP">
            <div class="g-label">{{ labels.trackerCp }}</div>
            <div class="g-cell g-span5"></div>
            <div class="g-total">{{ pl.cp }}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import {
  useTracker, ROUND_COUNT, PRIMARY_GAME_CAP, SECONDARY_GAME_CAP, BATTLE_READY_VP,
  missionBySlug, dispositionName,
} from '../../composables/useTracker.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, primaryTotal, secondaryTotal, grandTotal, leader } = useTracker()

const open = ref(false)
const leaderIdx = computed(() => leader())

// Every secondary that was ever in play for this player, with its active range and per-round VP.
function secondaries(pi) {
  const pl = current.value.players[pi]
  const s = pl.secondary
  const drawn = s.drawn || {}
  const slugs = []
  const seen = new Set()
  const add = slug => { if (!seen.has(slug)) { seen.add(slug); slugs.push(slug) } }
  for (const e of s.scored) add(e.slug)
  for (const d of (s.discarded || [])) add(d.slug ?? d)
  for (const slug of s.hand) add(slug)

  const lastRound = current.value.currentRound
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
.bd-toggle {
  display: flex; align-items: center; justify-content: center; gap: 0.4rem;
  width: 100%; padding: 0.6rem 1rem;
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 6px;
  color: var(--text-primary); font-size: 0.85rem; font-weight: 600; cursor: pointer;
}
.bd-toggle:hover { border-color: var(--accent); }
.bd-body { margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.75rem; }
.bd-player {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 6px; padding: 0.8rem;
}
.bd-name { font-family: var(--font-serif); font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem; }
.bd-name.win { color: var(--accent); }

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) repeat(5, 28px) auto;
  gap: 3px;
  align-items: center;
}
.g-label {
  font-size: 0.82rem;
  color: var(--text-muted);
  padding-right: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sec-label { font-size: 0.78rem; }
.g-cell {
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border-radius: 3px;
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
.tick { color: var(--accent); font-weight: 700; }

@media (max-width: 420px) {
  .grid { grid-template-columns: minmax(0, 1fr) repeat(5, 24px) auto; gap: 2px; }
  .g-cell { height: 24px; font-size: 0.74rem; }
  .g-label { font-size: 0.76rem; }
  .g-total { padding-left: 0.4rem; font-size: 0.76rem; }
}
</style>

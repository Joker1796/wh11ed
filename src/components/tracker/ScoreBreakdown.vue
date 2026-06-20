<template>
  <div class="breakdown">
    <button class="bd-toggle" @click="open = !open" :aria-expanded="open">
      <i class="bi" :class="open ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
      {{ labels.trackerDetails }}
    </button>

    <div v-if="open" class="bd-body">
      <div v-for="(pl, i) in current.players" :key="i" class="bd-player">
        <div class="bd-head">
          <span class="bd-name">{{ pl.name || `${labels.trackerPlayer} ${i + 1}` }}</span>
          <span class="bd-grand">{{ grandTotal(i) }} VP</span>
        </div>
        <table class="bd-table">
          <thead>
            <tr>
              <th class="rcol">{{ labels.trackerRound }}</th>
              <th>{{ labels.trackerPrimary }}</th>
              <th>{{ labels.trackerSecondary }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in ROUND_COUNT" :key="r">
              <td class="rcol">{{ r }}</td>
              <td>
                <template v-if="pl.rounds[r - 1].primary">
                  <span class="cell-vp">{{ pl.rounds[r - 1].primary }}</span>
                  <span v-for="(c, ci) in primaryLines(i, r - 1)" :key="ci" class="sub">{{ c }}</span>
                </template>
                <span v-else class="dash">—</span>
              </td>
              <td>
                <template v-if="secondaryLines(i, r).length">
                  <span v-for="(c, ci) in secondaryLines(i, r)" :key="ci" class="sub2">{{ c }}</span>
                </template>
                <span v-else class="dash">—</span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="rcol">{{ labels.trackerTotal }}</td>
              <td><span class="cell-vp">{{ primaryTotal(i) }}</span></td>
              <td><span class="cell-vp">{{ secondaryTotal(i) }}</span></td>
            </tr>
            <tr v-if="current.settings.trackCP">
              <td class="rcol">{{ labels.trackerCp }}</td>
              <td colspan="2"><span class="cell-vp">{{ pl.cp }}</span></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, ROUND_COUNT, missionBySlug, numericVp } from '../../composables/useTracker.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, primaryTotal, secondaryTotal, grandTotal } = useTracker()

const open = ref(false)

// Primary conditions that scored in a given round (0-based round index).
function primaryLines(pi, roundIdx) {
  const pl = current.value.players[pi]
  const m = missionBySlug(pl.primarySlug)
  const picks = pl.rounds[roundIdx].picks || {}
  if (!m) return []
  const lines = []
  for (const [key, count] of Object.entries(picks)) {
    if (!count) continue
    const [bi, ri] = key.split(':').map(Number)
    const row = m.blocks[bi] && m.blocks[bi].rows[ri]
    if (!row) continue
    const vp = count * numericVp(row.vp)
    if (!vp) continue
    const label = count > 1 ? `${shorten(row.text)} ×${count}` : shorten(row.text)
    lines.push(`${label} — ${vp}`)
  }
  return lines
}

// Secondary missions that scored in a given round (1-based).
function secondaryLines(pi, round) {
  const pl = current.value.players[pi]
  return pl.secondary.scored
    .filter(e => e.round === round && (e.vp || 0) > 0)
    .map(e => {
      const m = missionBySlug(e.slug, pl.role)
      return `${m ? m.name : e.slug} — ${e.vp}`
    })
}

function shorten(text) {
  return text.length > 54 ? text.slice(0, 52) + '…' : text
}
</script>

<style scoped>
.breakdown { margin-top: 0.75rem; }
.bd-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  padding: 0.6rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}
.bd-toggle:hover { border-color: var(--accent); }
.bd-body { margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.75rem; }
.bd-player {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.8rem;
}
.bd-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.bd-name { font-family: var(--font-serif); font-size: 1.05rem; font-weight: 700; color: var(--text-primary); }
.bd-grand { font-family: var(--font-mono); font-weight: 700; color: var(--accent); }
.bd-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
.bd-table th {
  text-align: left;
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  font-weight: 700;
  padding: 0.3rem 0.4rem;
  border-bottom: 1px solid var(--border);
}
.bd-table td {
  padding: 0.4rem 0.4rem;
  border-bottom: 1px solid var(--border);
  color: var(--text-muted);
  vertical-align: top;
}
.rcol { width: 3.5rem; white-space: nowrap; }
.bd-table tfoot td { font-weight: 700; color: var(--text-primary); border-bottom: none; border-top: 2px solid var(--border); }
.cell-vp { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); }
.sub, .sub2 { display: block; font-size: 0.72rem; color: var(--text-dim); line-height: 1.35; }
.sub { margin-top: 0.15rem; }
.dash { color: var(--text-dim); }

/* Match the tighter gap the score boxes use on phones. */
@media (max-width: 560px) {
  .breakdown { margin-top: 0.4rem; }
  .bd-body { margin-top: 0.4rem; gap: 0.4rem; }
}
</style>

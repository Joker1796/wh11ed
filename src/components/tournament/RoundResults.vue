<template>
  <div class="rounds">
    <p v-if="!tournament.rounds.length" class="empty">{{ labels.tNoRounds }}</p>

    <section v-for="round in tournament.rounds" :key="round.n" class="round">
      <h3 class="round-title">{{ labels.tRound }} {{ round.n }}</h3>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>{{ labels.tTable }}</th>
              <th class="left">A</th>
              <th>{{ labels.tTp }}</th>
              <th>{{ labels.tVp }}</th>
              <th class="left">B</th>
              <th>{{ labels.tTp }}</th>
              <th>{{ labels.tVp }}</th>
              <th class="left">✓</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(m, i) in round.matches" :key="i" :class="{ bye: m.bId == null }">
              <td class="dim">{{ m.table ?? '—' }}</td>
              <td class="left name">{{ playerName(m.aId) }}</td>
              <template v-if="m.bId != null">
                <td><input v-model.number="m.tpA" type="number" class="num" /></td>
                <td><input v-model.number="m.vpA" type="number" class="num" /></td>
                <td class="left name">{{ playerName(m.bId) }}</td>
                <td><input v-model.number="m.tpB" type="number" class="num" /></td>
                <td><input v-model.number="m.vpB" type="number" class="num" /></td>
              </template>
              <template v-else>
                <td class="dim">{{ tournament.settings.byeTp }}</td>
                <td class="dim">0</td>
                <td class="left dim">{{ labels.tBye }}</td>
                <td></td><td></td>
              </template>
              <td class="left checks">
                <span v-for="(badge, k) in badgesFor(round, i)" :key="k" class="badge" :class="badge.cls" :title="badge.text">{{ badge.icon }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { validateRound } from '../../utils/tournamentEngine.js'
import { useTournament } from '../../composables/useTournament.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { tournament } = useTournament()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const nameById = computed(() => new Map(tournament.players.map(p => [p.id, p.name])))
const playerName = id => nameById.value.get(id) ?? '—'

const checks = computed(() => {
  const map = {}
  for (const round of tournament.rounds) map[round.n] = validateRound(round, tournament.rounds)
  return map
})

function badgesFor(round, i) {
  const c = checks.value[round.n]?.[i]
  if (!c) return []
  const out = []
  if (c.rematch) out.push({ icon: '🔴', cls: 'red', text: labels.value.tCheckRematch })
  if (c.playerDup) out.push({ icon: '🔴', cls: 'red', text: labels.value.tCheckDupPlayer })
  if (c.tableDup) out.push({ icon: '🟡', cls: 'yellow', text: labels.value.tCheckDupTable })
  if (!c.filled) out.push({ icon: '🟡', cls: 'yellow', text: labels.value.tCheckIncomplete })
  if (!out.length) out.push({ icon: '🟢', cls: 'green', text: labels.value.tCheckOk })
  return out
}
</script>

<style scoped>
.empty { color: var(--text-muted); font-style: italic; }
.round { margin-bottom: 1.75rem; }
.round-title {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  margin-bottom: 0.6rem;
}
.table-scroll { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
th, td { padding: 0.35rem 0.5rem; border-bottom: 1px solid var(--border); text-align: center; white-space: nowrap; }
th { background: var(--bg-insert); color: var(--text-on-dark); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.5px; }
th.left, td.left { text-align: left; }
.name { font-weight: 600; }
.dim { color: var(--text-muted); }
.num {
  width: 3.2rem;
  padding: 0.3rem 0.4rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-primary);
  text-align: center;
  font-size: 0.85rem;
}
.bye td { background: var(--bg-row-alt); }
.checks { display: flex; gap: 0.2rem; }
.badge { font-size: 0.8rem; cursor: help; }
</style>

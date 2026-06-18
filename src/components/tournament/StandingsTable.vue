<template>
  <div class="standings">
    <p v-if="!standings.length" class="empty">{{ labels.tNoPlayers }}</p>
    <template v-else>
      <div v-if="champion" class="champion">
        🏆 {{ labels.tChampion }}: <strong>{{ champion.name }}</strong>
        <span v-if="champion.faction" class="champ-faction">({{ champion.faction }})</span>
      </div>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>{{ labels.tPlace }}</th>
              <th class="left">{{ labels.tPlayerName }}</th>
              <th class="left">{{ labels.tFaction }}</th>
              <th>{{ labels.tTp }}</th>
              <th>SOS</th>
              <th>{{ labels.tVp }}</th>
              <th>{{ labels.tWdl }}</th>
              <th class="left">{{ labels.tOpponents }}</th>
              <th class="left">{{ labels.tTablesPlayed }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in standings" :key="s.playerId">
              <td class="place">{{ s.place }}</td>
              <td class="left name">{{ s.name }}</td>
              <td class="left dim">{{ s.faction }}</td>
              <td class="strong">{{ s.tp }}</td>
              <td>{{ s.sos }}</td>
              <td>{{ s.vp }}</td>
              <td class="dim">{{ s.w }}-{{ s.d }}-{{ s.l }}</td>
              <td class="left dim small">{{ s.opponentNames.join(', ') }}</td>
              <td class="left dim small">{{ s.tables.join(', ') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { computeStandings } from '../../utils/tournamentEngine.js'
import { useTournament } from '../../composables/useTournament.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { tournament } = useTournament()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const standings = computed(() => computeStandings(tournament))

// Champion only once the configured number of rounds has results.
const champion = computed(() => {
  const played = tournament.rounds.filter(r => (r.matches || []).length).length
  return played >= tournament.settings.rounds && standings.value.length ? standings.value[0] : null
})
</script>

<style scoped>
.standings { width: 100%; }
.empty { color: var(--text-muted); font-style: italic; }
.champion {
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  border-radius: 6px;
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
  font-size: 1.05rem;
}
.champ-faction { color: var(--text-muted); font-size: 0.9rem; }
.table-scroll { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
th, td { padding: 0.4rem 0.55rem; border-bottom: 1px solid var(--border); text-align: center; white-space: nowrap; }
th { background: var(--bg-insert); color: var(--text-on-dark); font-family: var(--font-sans); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.5px; }
th.left, td.left { text-align: left; }
.place { font-variant-numeric: tabular-nums; color: var(--text-dim); }
.name { font-weight: 600; }
.strong { font-weight: 700; color: var(--accent); }
.dim { color: var(--text-muted); }
.small { font-size: 0.78rem; white-space: normal; min-width: 180px; }
tr:nth-child(even) td { background: var(--bg-row-alt); }
</style>

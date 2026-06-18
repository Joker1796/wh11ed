<template>
  <div class="pairings">
    <p v-if="tournament.players.length < 2" class="empty">{{ labels.tNoPlayers }}</p>
    <template v-else>
      <div class="controls">
        <label>{{ labels.tForRound }}
          <input v-model.number="draftRound" type="number" min="1" :max="tournament.settings.rounds" class="round-num" />
        </label>
        <button class="btn" @click="suggest">{{ labels.tSuggest }}</button>
        <button class="btn primary" :disabled="!draft.length" @click="apply">{{ labels.tApply }}</button>
      </div>

      <div v-if="draft.length" class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>{{ labels.tTable }}</th>
              <th class="left">A</th>
              <th class="left">B</th>
              <th class="left">{{ labels.tStatus }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, i) in draft" :key="i">
              <td><input v-model.number="p.table" type="number" min="1" class="num" /></td>
              <td class="left"><select v-model="p.aId" class="psel"><option v-for="pl in tournament.players" :key="pl.id" :value="pl.id">{{ pl.name }}</option></select></td>
              <td class="left"><select v-model="p.bId" class="psel"><option v-for="pl in tournament.players" :key="pl.id" :value="pl.id">{{ pl.name }}</option></select></td>
              <td class="left">
                <span class="badge" :class="repeat(p) ? 'red' : 'green'" :title="repeat(p) ? labels.tRepeat : labels.tCheckOk">{{ repeat(p) ? '🔴' : '🟢' }}</span>
                <span class="badge" :class="tableCls(p)" :title="tableTitle(p)">{{ tableIcon(p) }}</span>
              </td>
            </tr>
            <tr v-if="byeName" class="bye">
              <td class="dim">—</td>
              <td class="left name">{{ byeName }}</td>
              <td class="left dim">{{ labels.tBye }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Substitution helper -->
      <section class="subs">
        <h3 class="block-title">{{ labels.tSubstitution }}</h3>
        <label>{{ labels.tSelectPlayer }}
          <select v-model="subPlayer" class="psel">
            <option value="">—</option>
            <option v-for="pl in tournament.players" :key="pl.id" :value="pl.id">{{ pl.name }}</option>
          </select>
        </label>
        <div v-if="subPlayer && subCandidates.length" class="table-scroll">
          <table>
            <thead>
              <tr><th class="left">{{ labels.tPlayerName }}</th><th class="left">{{ labels.tFaction }}</th><th class="left">{{ labels.tStatus }}</th><th>TP/SOS/{{ labels.tVp }}</th><th class="left">{{ labels.tTablesPlayed }}</th></tr>
            </thead>
            <tbody>
              <tr v-for="c in subCandidates" :key="c.playerId">
                <td class="left name">{{ c.name }}</td>
                <td class="left dim">{{ c.faction }}</td>
                <td class="left"><span class="badge" :class="c.played ? 'red' : 'green'">{{ c.played ? '🔴' : '🟢' }}</span> {{ c.played ? labels.tRepeat : labels.tCanPlay }}</td>
                <td class="dim">{{ c.tp }}/{{ c.sos }}/{{ c.vp }}</td>
                <td class="left dim small">{{ c.tables.join(', ') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  computeStandings, buildHistory, suggestPairings, assignTables,
  havePlayed, tableStatus, substitutionCandidates,
} from '../../utils/tournamentEngine.js'
import { useTournament } from '../../composables/useTournament.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { tournament, applyPairings } = useTournament()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const nameById = computed(() => new Map(tournament.players.map(p => [p.id, p.name])))

// Default to the first round that has no matches yet.
function firstEmptyRound() {
  for (let n = 1; n <= tournament.settings.rounds; n++) {
    const r = tournament.rounds.find(x => x.n === n)
    if (!r || !r.matches.length) return n
  }
  return tournament.settings.rounds
}
const draftRound = ref(firstEmptyRound())
const draft = ref([])      // [{ aId, bId, table }]
const byeId = ref(null)

// Standings/history going *into* the target round (only earlier rounds count).
const priorRounds = () => tournament.rounds.filter(r => r.n < draftRound.value)
const history = computed(() => buildHistory(priorRounds()))

function suggest() {
  const standings = computeStandings({ ...tournament, rounds: priorRounds() })
  const { pairs, byeId: bye } = suggestPairings(standings, history.value)
  const withTables = assignTables(pairs, history.value.tableHistory, tournament.settings.tables)
  draft.value = withTables.map(p => ({ aId: p.aId, bId: p.bId, table: p.table }))
  byeId.value = bye
}

const byeName = computed(() => (byeId.value != null ? nameById.value.get(byeId.value) : null))

const repeat = p => p.aId != null && p.bId != null && havePlayed(history.value, p.aId, p.bId)
function statusOf(p) {
  if (p.table == null || p.bId == null) return null
  return tableStatus(p.aId, p.bId, p.table, history.value.tableHistory)
}
const tableIcon = p => ({ 0: '🟢', 1: '🟡', 2: '🔴' }[statusOf(p)] ?? '⚪')
const tableCls = p => ({ 0: 'green', 1: 'yellow', 2: 'red' }[statusOf(p)] ?? '')
const tableTitle = p => ({ 0: labels.value.tNewTable, 1: labels.value.tOnePlayed, 2: labels.value.tBothPlayed }[statusOf(p)] ?? '')

function apply() {
  applyPairings(draftRound.value, draft.value, byeId.value)
}

// Substitution helper
const subPlayer = ref('')
const subCandidates = computed(() => {
  if (!subPlayer.value) return []
  const standings = computeStandings({ ...tournament, rounds: priorRounds() })
  return substitutionCandidates(subPlayer.value, standings, history.value)
})
</script>

<style scoped>
.empty { color: var(--text-muted); font-style: italic; }
.controls { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1rem; }
.controls label { font-size: 0.85rem; color: var(--text-muted); }
.round-num { width: 3.5rem; margin-left: 0.4rem; padding: 0.35rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: 4px; color: var(--text-primary); }
.btn {
  padding: 0.45rem 1rem;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-primary);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.88rem;
}
.btn:hover { border-color: var(--accent); }
.btn.primary { background: var(--accent); color: var(--text-on-accent); border-color: var(--accent); }
.btn.primary:disabled { opacity: 0.4; cursor: not-allowed; }
.table-scroll { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.85rem; margin-bottom: 1rem; }
th, td { padding: 0.35rem 0.5rem; border-bottom: 1px solid var(--border); text-align: center; white-space: nowrap; }
th { background: var(--bg-insert); color: var(--text-on-dark); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.5px; }
th.left, td.left { text-align: left; }
.name { font-weight: 600; }
.dim { color: var(--text-muted); }
.small { font-size: 0.78rem; }
.num { width: 3rem; padding: 0.3rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: 4px; color: var(--text-primary); text-align: center; }
.psel { padding: 0.35rem 0.4rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: 4px; color: var(--text-primary); font-size: 0.85rem; max-width: 12rem; }
.badge { font-size: 0.8rem; }
.bye td { background: var(--bg-row-alt); }
.block-title { font-family: var(--font-serif); font-size: 1.2rem; margin: 1.5rem 0 0.75rem; padding-top: 1rem; border-top: 1px solid var(--border); }
.subs label { font-size: 0.85rem; color: var(--text-muted); display: inline-flex; align-items: center; gap: 0.4rem; margin-bottom: 0.75rem; }
</style>

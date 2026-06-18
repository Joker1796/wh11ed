import { reactive, watch } from 'vue'
import { DEFAULT_SETTINGS } from '../utils/tournamentEngine.js'

// Single active tournament, persisted to localStorage (pattern mirrors useLocale.js
// but the state is a nested object, so we serialize via a debounced watcher).
// Export/import JSON lets the organiser back up or move a tournament between devices.
const STORAGE_KEY = 'wh11ed-tournament'

function blankTournament() {
  return {
    name: '',
    settings: { ...DEFAULT_SETTINGS },
    players: [],
    rounds: [],
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return blankTournament()
    const t = JSON.parse(raw)
    return {
      name: t.name ?? '',
      settings: { ...DEFAULT_SETTINGS, ...(t.settings || {}) },
      players: Array.isArray(t.players) ? t.players : [],
      rounds: Array.isArray(t.rounds) ? t.rounds : [],
    }
  } catch {
    return blankTournament()
  }
}

const tournament = reactive(load())

let saveTimer = null
watch(
  tournament,
  () => {
    clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tournament))
    }, 250)
  },
  { deep: true },
)

let nextId = Date.now()
const genId = () => `p${nextId++}`

function replaceState(data) {
  tournament.name = data.name ?? ''
  tournament.settings = { ...DEFAULT_SETTINGS, ...(data.settings || {}) }
  tournament.players = Array.isArray(data.players) ? data.players : []
  tournament.rounds = Array.isArray(data.rounds) ? data.rounds : []
}

export function useTournament() {
  function newTournament() {
    replaceState(blankTournament())
  }

  function addPlayer(name = '', faction = '') {
    tournament.players.push({
      id: genId(),
      name,
      faction,
      seed: tournament.players.length,
    })
  }

  function removePlayer(id) {
    tournament.players = tournament.players.filter(p => p.id !== id)
    tournament.players.forEach((p, i) => { p.seed = i })
    // Drop any matches referencing the removed player.
    for (const round of tournament.rounds) {
      round.matches = round.matches.filter(m => m.aId !== id && m.bId !== id)
    }
  }

  function ensureRound(n) {
    let round = tournament.rounds.find(r => r.n === n)
    if (!round) {
      round = { n, matches: [] }
      tournament.rounds.push(round)
      tournament.rounds.sort((a, b) => a.n - b.n)
    }
    return round
  }

  // Replace a round's matches with a suggested/edited pairing set.
  function applyPairings(n, pairs, byeId) {
    const round = ensureRound(n)
    round.matches = pairs.map(p => ({
      table: p.table ?? null,
      aId: p.aId, bId: p.bId,
      tpA: null, vpA: null, tpB: null, vpB: null,
    }))
    if (byeId != null) {
      round.matches.push({ table: null, aId: byeId, bId: null, tpA: tournament.settings.byeTp, vpA: 0, tpB: null, vpB: null })
    }
  }

  function setResult(n, matchIndex, patch) {
    const round = tournament.rounds.find(r => r.n === n)
    if (!round || !round.matches[matchIndex]) return
    Object.assign(round.matches[matchIndex], patch)
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(tournament, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(tournament.name || 'tournament').replace(/\s+/g, '-')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function importJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        try {
          replaceState(JSON.parse(String(reader.result)))
          resolve()
        } catch (e) {
          reject(e)
        }
      }
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  return {
    tournament,
    newTournament,
    addPlayer,
    removePlayer,
    ensureRound,
    applyPairings,
    setResult,
    exportJSON,
    importJSON,
  }
}

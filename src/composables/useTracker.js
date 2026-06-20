import { ref, watch } from 'vue'
import { missions } from '../data/missions.js'
import { mfmFactions } from '../data/mfmFactions.js'
import { eventCompanion } from '../data/eventCompanion.js'

// Game Tracker store — a module singleton persisted to localStorage, mirroring the
// pattern in useLocale.js / useLoreVisibility.js. Models a 2-player game of 40k 11th:
// setup → 5 battle rounds → finish, with primary/secondary/CP scoring. Inspired by the
// GDM tracker; scoring constants (15/round, 50 total primary; 20 per fixed secondary)
// match the official caps.

const CUR_KEY = 'wh11ed-tracker-current'
const HIST_KEY = 'wh11ed-tracker-history'

export const ROUND_COUNT = 5
export const MAX_DP = 3
export const PRIMARY_ROUND_CAP = 15
export const PRIMARY_GAME_CAP = 50
export const FIXED_SECONDARY_CAP = 20

// The 5 Force Dispositions (canonical id + English name), reused from the Event Companion.
export const DISPOSITIONS = eventCompanion.en.dispositions.map(d => ({ id: d.id, name: d.name }))
export const FACTIONS = mfmFactions.en.map(f => ({ slug: f.slug, name: f.name }))

export function dispositionName(id) {
  const d = DISPOSITIONS.find(x => x.id === id)
  return d ? d.name : ''
}
export function factionBySlug(slug) {
  return mfmFactions.en.find(f => f.slug === slug) || null
}
export function detachmentsFor(slug) {
  const f = factionBySlug(slug)
  return f ? f.detachments : []
}
export function detachmentInfo(slug, name) {
  return detachmentsFor(slug).find(d => d.name === name) || null
}
export function missionBySlug(slug, role) {
  if (role) return missions.en.secondary.find(m => m.slug === slug && m.role === role) || null
  return missions.en.primary.find(m => m.slug === slug) || null
}
export function secondaryPool(role) {
  // 18 distinct secondary missions for the given role.
  return missions.en.secondary.filter(m => m.role === role)
}

// Primary mission a player scores = the card for (their disposition vs opponent's).
export function primaryFor(myDisposition, opponentDisposition) {
  const oppName = dispositionName(opponentDisposition)
  return missions.en.primary.find(m => m.deck === myDisposition && m.opponent === oppName) || null
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const current = ref(load(CUR_KEY, null))
const history = ref(load(HIST_KEY, []))

// Auto-save on every mutation — "saved automatically as you play".
watch(current, v => {
  try {
    if (v) localStorage.setItem(CUR_KEY, JSON.stringify(v))
    else localStorage.removeItem(CUR_KEY)
  } catch { /* quota / private mode — ignore */ }
}, { deep: true })

watch(history, v => {
  try { localStorage.setItem(HIST_KEY, JSON.stringify(v)) } catch { /* ignore */ }
}, { deep: true })

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function makePlayer(p, opponent, secondaryMode) {
  const primary = primaryFor(p.disposition, opponent.disposition)
  const poolSlugs = secondaryPool(p.role).map(m => m.slug)
  return {
    name: p.name || '',
    factionSlug: p.factionSlug || null,
    detachments: [...(p.detachments || [])],   // up to 3 DP worth; each grants a disposition
    disposition: p.disposition,                // the active disposition (drives the primary mission)
    role: p.role,
    primarySlug: primary ? primary.slug : null,
    cp: 0,
    rounds: Array.from({ length: ROUND_COUNT }, () => ({ primary: 0 })),
    secondary: {
      // tactical: draw from a shuffled deck each round; fixed: lock a chosen set up front.
      deck: secondaryMode === 'tactical' ? shuffle(poolSlugs) : [],
      hand: [],                 // currently in play (drawn or locked)
      scored: [],               // [{ slug, vp, round }]
    },
  }
}

// ---- public API ----
export function useTracker() {

  function newGame(setup) {
    // setup = { settings, players: [p1, p2] } where p = { name, factionSlug, detachments, disposition, role }
    const mode = setup.settings.secondaryMode
    const [a, b] = setup.players
    current.value = {
      id: 'g' + Date.now(),
      createdAt: new Date().toISOString(),
      phase: 'playing',
      currentRound: 1,
      settings: { ...setup.settings },
      players: [makePlayer(a, b, mode), makePlayer(b, a, mode)],
    }
  }

  function setRoundPrimary(pi, roundIdx, value) {
    const pl = current.value.players[pi]
    const others = pl.rounds.reduce((s, r, i) => i === roundIdx ? s : s + (r.primary || 0), 0)
    const max = Math.max(0, Math.min(PRIMARY_ROUND_CAP, PRIMARY_GAME_CAP - others))
    pl.rounds[roundIdx].primary = Math.max(0, Math.min(value, max))
  }

  function setCp(pi, value) {
    current.value.players[pi].cp = Math.max(0, value)
  }

  function drawSecondary(pi) {
    const s = current.value.players[pi].secondary
    if (!s.deck.length) return
    s.hand.push(s.deck.shift())
  }

  function lockFixed(pi, slugs) {
    // fixed mode: the chosen set is locked into the hand for the whole game.
    current.value.players[pi].secondary.hand = [...slugs]
  }

  function discardFromHand(pi, slug) {
    const s = current.value.players[pi].secondary
    s.hand = s.hand.filter(x => x !== slug)
    // also drop any scoring recorded for it (so totals stay consistent)
    s.scored = s.scored.filter(e => e.slug !== slug)
  }

  function scoreSecondary(pi, slug, vp) {
    const s = current.value.players[pi].secondary
    const round = current.value.currentRound
    const existing = s.scored.find(e => e.slug === slug && e.round === round)
    if (existing) existing.vp = Math.max(0, vp)
    else s.scored.push({ slug, vp: Math.max(0, vp), round })
  }

  function goToRound(n) {
    current.value.currentRound = Math.max(1, Math.min(ROUND_COUNT, n))
  }

  function finishGame() {
    if (!current.value) return
    const g = current.value
    g.phase = 'finished'
    g.finishedAt = new Date().toISOString()
    g.result = {
      totals: g.players.map((_, i) => grandTotal(i)),
    }
    history.value = [{ ...JSON.parse(JSON.stringify(g)) }, ...history.value]
    current.value = null
  }

  function discardGame() {
    current.value = null
  }

  function deleteHistory(id) {
    history.value = history.value.filter(g => g.id !== id)
  }

  // ---- scoring (read against current game) ----
  function primaryTotal(pi) {
    const pl = current.value.players[pi]
    return Math.min(pl.rounds.reduce((s, r) => s + (r.primary || 0), 0), PRIMARY_GAME_CAP)
  }

  function roundPrimaryMax(pi, roundIdx) {
    const pl = current.value.players[pi]
    const others = pl.rounds.reduce((s, r, i) => i === roundIdx ? s : s + (r.primary || 0), 0)
    return Math.max(0, Math.min(PRIMARY_ROUND_CAP, PRIMARY_GAME_CAP - others))
  }

  function secondaryTotal(pi) {
    const pl = current.value.players[pi]
    if (current.value.settings.secondaryMode === 'fixed') {
      // cap each fixed secondary at 20 over the game
      const bySlug = {}
      for (const e of pl.secondary.scored) bySlug[e.slug] = (bySlug[e.slug] || 0) + e.vp
      return Object.values(bySlug).reduce((s, v) => s + Math.min(v, FIXED_SECONDARY_CAP), 0)
    }
    return pl.secondary.scored.reduce((s, e) => s + e.vp, 0)
  }

  function grandTotal(pi) {
    return primaryTotal(pi) + secondaryTotal(pi)
  }

  function leader() {
    if (!current.value) return -1
    const a = grandTotal(0), b = grandTotal(1)
    if (a === b) return -1
    return a > b ? 0 : 1
  }

  return {
    current, history,
    newGame, setRoundPrimary, setCp,
    drawSecondary, lockFixed, discardFromHand, scoreSecondary,
    goToRound, finishGame, discardGame, deleteHistory,
    primaryTotal, roundPrimaryMax, secondaryTotal, grandTotal, leader,
  }
}

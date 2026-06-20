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
export function numericVp(v) {
  // vp is a number, or a '+N' string for cumulative bonuses.
  if (typeof v === 'number') return v
  const n = parseInt(String(v).replace('+', ''), 10)
  return Number.isFinite(n) ? n : 0
}
export function fixedPool(role) {
  // Only missions that actually have a Fixed scoring option can be taken as Fixed
  // (A Grievous Blow, Assassination, Bring it Down, Engage on All Fronts).
  return secondaryPool(role).filter(m => m.blocks.some(b => b.kind === 'fixed'))
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

function makePlayer(p, opponent) {
  const primary = primaryFor(p.disposition, opponent.disposition)
  const poolSlugs = secondaryPool(p.role).map(m => m.slug)
  const secondaryMode = p.secondaryMode || 'tactical'
  return {
    name: p.name || '',
    factionSlug: p.factionSlug || null,
    detachments: [...(p.detachments || [])],   // up to 3 DP worth; each grants a disposition
    disposition: p.disposition,                // the active disposition (drives the primary mission)
    role: p.role,
    secondaryMode,                             // tactical | fixed — chosen per player
    primarySlug: primary ? primary.slug : null,
    cp: 0,
    rounds: Array.from({ length: ROUND_COUNT }, () => ({ primary: 0, picks: {} })),
    secondary: {
      // tactical: draw from a shuffled deck each round; fixed: the set chosen at setup is locked in.
      deck: secondaryMode === 'tactical' ? shuffle(poolSlugs) : [],
      hand: secondaryMode === 'fixed' ? [...(p.fixedSecondaries || [])] : [],
      // round each card became active (fixed cards are active from round 1).
      drawn: secondaryMode === 'fixed'
        ? Object.fromEntries((p.fixedSecondaries || []).map(s => [s, 1]))
        : {},
      discarded: [],            // [{ slug, round }] — set aside (kept their points, won't be redrawn)
      scored: [],               // [{ slug, round, picks: {'bi:ri': count}, vp }]
    },
  }
}

// ---- public API ----
export function useTracker() {

  function newGame(setup) {
    // setup = { settings, players: [p1, p2] }
    // p = { name, factionSlug, detachments, disposition, role, secondaryMode }
    const [a, b] = setup.players
    current.value = {
      id: 'g' + Date.now(),
      createdAt: new Date().toISOString(),
      phase: 'playing',
      currentRound: 1,
      settings: { ...setup.settings },
      players: [makePlayer(a, b), makePlayer(b, a)],
    }
  }

  // Fallback (no primary card): set the round primary directly, clamped to the round cap.
  function setRoundPrimary(pi, roundIdx, value) {
    current.value.players[pi].rounds[roundIdx].primary = Math.max(0, Math.min(value, PRIMARY_ROUND_CAP))
  }

  // Record how many times a primary scoring row was achieved this round; the round's
  // primary = min(sum of row contributions, 15). The game cap (50) is applied in primaryTotal.
  function setPrimaryRow(pi, roundIdx, blockIdx, rowIdx, count) {
    const pl = current.value.players[pi]
    const round = pl.rounds[roundIdx]
    if (!round.picks) round.picks = {}
    round.picks[`${blockIdx}:${rowIdx}`] = Math.max(0, count)
    const m = missionBySlug(pl.primarySlug)
    let raw = 0
    if (m) {
      for (const [key, c] of Object.entries(round.picks)) {
        const [bi, ri] = key.split(':').map(Number)
        const row = m.blocks[bi] && m.blocks[bi].rows[ri]
        if (row) raw += c * numericVp(row.vp)
      }
    }
    round.primary = Math.min(raw, PRIMARY_ROUND_CAP)
  }

  function primaryRowCount(pi, roundIdx, blockIdx, rowIdx) {
    const picks = current.value.players[pi].rounds[roundIdx].picks
    return picks ? (picks[`${blockIdx}:${rowIdx}`] || 0) : 0
  }

  function setCp(pi, value) {
    current.value.players[pi].cp = Math.max(0, value)
  }

  function drawSecondary(pi) {
    const s = current.value.players[pi].secondary
    if (!s.deck.length) return
    const slug = s.deck.shift()
    s.hand.push(slug)
    if (!s.drawn) s.drawn = {}
    s.drawn[slug] = current.value.currentRound
  }

  function discardFromHand(pi, slug) {
    // Set the card aside: it leaves the hand but KEEPS any points already scored,
    // and (being off the deck already) cannot be drawn again.
    const s = current.value.players[pi].secondary
    s.hand = s.hand.filter(x => x !== slug)
    if (!s.discarded.some(d => d.slug === slug)) {
      s.discarded.push({ slug, round: current.value.currentRound })
    }
  }

  function entryVp(pi, entry) {
    const m = missionBySlug(entry.slug, current.value.players[pi].role)
    if (!m || !entry.picks) return entry.vp || 0
    let total = 0
    for (const [key, count] of Object.entries(entry.picks)) {
      const [bi, ri] = key.split(':').map(Number)
      const row = m.blocks[bi] && m.blocks[bi].rows[ri]
      if (row) total += count * numericVp(row.vp)
    }
    return total
  }

  // Record how many times a given scoring row was achieved this round.
  function scoreSecondaryRow(pi, slug, blockIdx, rowIdx, count) {
    const s = current.value.players[pi].secondary
    const round = current.value.currentRound
    let entry = s.scored.find(e => e.slug === slug && e.round === round)
    if (!entry) { entry = { slug, round, picks: {}, vp: 0 }; s.scored.push(entry) }
    if (!entry.picks) entry.picks = {}
    entry.picks[`${blockIdx}:${rowIdx}`] = Math.max(0, count)
    entry.vp = entryVp(pi, entry)
  }

  function secondaryRowCount(pi, slug, blockIdx, rowIdx) {
    const round = current.value.currentRound
    const entry = current.value.players[pi].secondary.scored.find(e => e.slug === slug && e.round === round)
    return entry && entry.picks ? (entry.picks[`${blockIdx}:${rowIdx}`] || 0) : 0
  }

  // Total VP a card has scored this round (sum across its rows).
  function secondaryCardVp(pi, slug, round = current.value.currentRound) {
    const entry = current.value.players[pi].secondary.scored.find(e => e.slug === slug && e.round === round)
    return entry ? entry.vp || 0 : 0
  }

  function goToRound(n) {
    const target = Math.max(1, Math.min(ROUND_COUNT, n))
    // Advancing: a tactical secondary that scored in an earlier round is set aside
    // automatically (keeps its VP, won't be redrawn) — the player draws a fresh one.
    if (target > current.value.currentRound) {
      for (const pl of current.value.players) {
        if (pl.secondaryMode !== 'tactical') continue
        const s = pl.secondary
        const scoredEarlier = new Set(
          s.scored.filter(e => (e.vp || 0) > 0 && e.round < target).map(e => e.slug)
        )
        for (const slug of [...s.hand]) {
          if (scoredEarlier.has(slug)) {
            s.hand = s.hand.filter(x => x !== slug)
            if (!s.discarded.some(d => d.slug === slug)) s.discarded.push({ slug, round: target })
          }
        }
      }
    }
    current.value.currentRound = target
  }

  // Finish = show the final summary; the game stays current so it can be resumed.
  function finishGame() {
    if (!current.value) return
    const g = current.value
    g.phase = 'finished'
    g.finishedAt = new Date().toISOString()
    g.result = { totals: g.players.map((_, i) => grandTotal(i)) }
  }

  function resumeGame() {
    if (current.value) current.value.phase = 'playing'
  }

  // Save the finished game to history and clear the current slot.
  function archiveGame() {
    if (!current.value) return
    history.value = [JSON.parse(JSON.stringify(current.value)), ...history.value]
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
    if (pl.secondaryMode === 'fixed') {
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
    setPrimaryRow, primaryRowCount,
    drawSecondary, discardFromHand,
    scoreSecondaryRow, secondaryRowCount, secondaryCardVp,
    goToRound, finishGame, resumeGame, archiveGame, discardGame, deleteHistory,
    primaryTotal, roundPrimaryMax, secondaryTotal, grandTotal, leader,
  }
}

// Battle record — read-only aggregation over the tracker's finished games (useTracker's `history`).
// Nothing here mutates or stores anything; the stats page and the roster badges are the only
// readers. Two rules run through the whole file:
//
//   * Everything is from YOUR side. Which stored index that is varies (newGame reorders players so
//     index 0 is whoever had the first turn), so it is always resolved via the isYou flag, with the
//     `?? 0` fallback every other reader uses for games saved before that flag existed.
//   * Games are read defensively. A record written by an older build can be missing detachments,
//     the army blob, the roster link, endReason or even `result` — a missing field means "unknown",
//     never a crash and never a zero counted as data.
import {
  BATTLE_READY_VP,
  ROUND_COUNT,
  TACTICAL_SECONDARY_CAP,
  battlePointsFromVp,
  grandTotal,
  primaryTotal,
  secondaryTotal,
} from './gameScoring.js'
import { getItem } from './safeStorage.js'

// The finished-games key. useTracker.js owns the live ref and is their only WRITER; this module
// only reads, and deliberately depends on nothing but gameScoring and safeStorage — a screen can
// then show a record without taking on the tracker store (and the mission datasets behind it).
export const HISTORY_KEY = 'wh11ed-tracker-history'

// One-shot read for those screens. Not reactive, so it is only right where nothing on the page can
// change a game — the roster screens. Anything inside the tracker has the live `history` ref
// already and must pass that instead, or it will show a stale record after a game is archived.
export function loadHistory() {
  try {
    const raw = getItem(HISTORY_KEY)
    const list = raw ? JSON.parse(raw) : []
    return Array.isArray(list) ? list.filter((g) => g && Array.isArray(g.players) && g.players.length === 2) : []
  } catch {
    return []
  }
}

// Below this many games a percentage is a lie dressed as data (2 wins out of 3 is not "67%"), so
// every breakdown row carries `enough` and the UI shows the raw W–L instead until it flips.
export const MIN_SAMPLE = 5

export function youIndex(game) {
  const i = (game?.players || []).findIndex((p) => p?.isYou)
  return i >= 0 ? i : 0
}

// VP as they stood when the game was finished. The stored totals are authoritative — recomputing
// would silently re-score old games under today's caps — but they are absent on the oldest records.
export function vpTotals(game) {
  const t = game?.result?.totals
  if (Array.isArray(t) && t.length === 2) return t
  return [grandTotal(game, 0), grandTotal(game, 1)]
}

// A game only counts as a result once it has one: 'early' is the reason written when an in-progress
// game is shelved to start another, i.e. a game that was never played out. Concessions DO count —
// they are how a real game ended.
export function isResult(game) {
  return !!game && game.phase === 'finished' && game.endReason !== 'early'
}

// One game, from your side: VP, Battle Points and who won. Mirrors TrackerHomeView's card logic —
// concede overrides the score, and in BP mode the winner is decided by BP (a ≤5 VP gap is a draw).
export function outcomeOf(game) {
  const y = youIndex(game)
  const o = y === 0 ? 1 : 0
  const totals = vpTotals(game)
  const vp = [totals[y] || 0, totals[o] || 0]
  let bp
  if (game?.endReason === 'friendly-concede') bp = [0, 20]
  else if (game?.endReason === 'opponent-concede') bp = [20, 0]
  else bp = battlePointsFromVp(vp[0], vp[1])
  let side
  if (game?.endReason === 'friendly-concede') side = 'loss'
  else if (game?.endReason === 'opponent-concede') side = 'win'
  else {
    const [a, b] = game?.settings?.scoreMode === 'bp' ? bp : vp
    side = a === b ? 'draw' : a > b ? 'win' : 'loss'
  }
  return { vp, bp, side, you: game?.players?.[y] || null, opp: game?.players?.[o] || null }
}

// ── breakdown rows ───────────────────────────────────────────────────────────────────────────
function blank(key) {
  return { key, games: 0, w: 0, l: 0, d: 0, vpFor: 0, vpAgainst: 0 }
}
function tally(row, o) {
  row.games++
  row[o.side === 'win' ? 'w' : o.side === 'loss' ? 'l' : 'd']++
  row.vpFor += o.vp[0]
  row.vpAgainst += o.vp[1]
}
function finishRow(row) {
  return {
    ...row,
    // A draw is half a win, the way every league table counts it.
    winrate: row.games ? (row.w + row.d / 2) / row.games : 0,
    avgFor: row.games ? row.vpFor / row.games : 0,
    avgAgainst: row.games ? row.vpAgainst / row.games : 0,
    enough: row.games >= MIN_SAMPLE,
  }
}
// Most-played first; ties broken by winrate so the top of a list is never arbitrary.
function rows(map) {
  return [...map.values()].map(finishRow).sort((a, b) => b.games - a.games || b.winrate - a.winrate)
}
function into(map, key, o) {
  if (key == null || key === '') return
  if (!map.has(key)) map.set(key, blank(key))
  tally(map.get(key), o)
}

// Secondary VP scored in one battle round. The per-card caps live in gameScoring (5 per scoring for
// tactical, 20 across the whole game for fixed) — the game-long one can't be applied per round, so
// a fixed-secondary curve can read a little high mid-game. The end-of-game totals in `split` are
// the capped ones; this is the shape of the scoring, not a second opinion on the total.
function secondaryInRound(player, round) {
  const scored = player?.secondary?.scored || []
  const tactical = player?.secondaryMode !== 'fixed'
  let vp = 0
  for (const e of scored) {
    if (e?.round !== round) continue
    vp += tactical ? Math.min(e.vp || 0, TACTICAL_SECONDARY_CAP) : (e.vp || 0)
  }
  return vp
}

// Current run and longest win run. `history` is newest-first (archiveGame unshifts), so the current
// streak walks from the front and stops at the first different result.
function streaks(list) {
  const sides = list.map((o) => o.side)
  let cur = { side: sides[0] || null, len: 0 }
  for (const s of sides) {
    if (s !== cur.side) break
    cur.len++
  }
  let best = 0
  let run = 0
  for (const s of sides) {
    run = s === 'win' ? run + 1 : 0
    if (run > best) best = run
  }
  return { current: cur.len ? cur : { side: null, len: 0 }, bestWin: best }
}

export function buildStats(history = []) {
  const all = (history || []).filter((g) => g && g.players)
  const games = all.filter(isResult)
  const skipped = all.length - games.length

  const byFaction = new Map()
  const byDetachment = new Map()
  const byOpponent = new Map()
  const byMission = new Map()
  const byFirstTurn = new Map()
  const bySize = new Map()
  const secondaries = new Map()

  const record = { w: 0, l: 0, d: 0 }
  let vpFor = 0
  let vpAgainst = 0
  let bpFor = 0
  const split = { you: { primary: 0, secondary: 0, bonus: 0 }, opp: { primary: 0, secondary: 0, bonus: 0 } }
  const rounds = Array.from({ length: ROUND_COUNT }, (_, i) => ({
    round: i + 1, you: 0, opp: 0, youVp: 0, oppVp: 0,
  }))
  const outcomes = []

  for (const g of games) {
    const o = outcomeOf(g)
    outcomes.push(o)
    record[o.side === 'win' ? 'w' : o.side === 'loss' ? 'l' : 'd']++
    vpFor += o.vp[0]
    vpAgainst += o.vp[1]
    bpFor += o.bp[0]

    const y = youIndex(g)
    const oi = y === 0 ? 1 : 0
    split.you.primary += primaryTotal(g, y)
    split.you.secondary += secondaryTotal(g, y)
    split.you.bonus += o.you?.battleReady ? BATTLE_READY_VP : 0
    split.opp.primary += primaryTotal(g, oi)
    split.opp.secondary += secondaryTotal(g, oi)
    split.opp.bonus += o.opp?.battleReady ? BATTLE_READY_VP : 0

    for (let i = 0; i < ROUND_COUNT; i++) {
      const r = rounds[i]
      r.you += o.you?.rounds?.[i]?.primary || 0
      r.opp += o.opp?.rounds?.[i]?.primary || 0
      r.youVp += (o.you?.rounds?.[i]?.primary || 0) + secondaryInRound(o.you, i + 1)
      r.oppVp += (o.opp?.rounds?.[i]?.primary || 0) + secondaryInRound(o.opp, i + 1)
    }

    into(byFaction, o.you?.factionSlug, o)
    into(byOpponent, o.opp?.factionSlug, o)
    into(byMission, o.you?.primarySlug, o)
    into(bySize, g.settings?.combatPatrol ? 'combat-patrol' : g.settings?.battleSize, o)
    // Every detachment the army was built with — a multi-detachment list counts for each of them.
    for (const d of o.you?.detachments || []) into(byDetachment, d, o)
    // players[0] is always the first-turn player (newGame reorders on that), so "did I go first?"
    // is just where you ended up in the array.
    into(byFirstTurn, y === 0 ? 'first' : 'second', o)

    // Secondary cards, yours only: how often each was in play, what it paid, how often it was
    // binned. `drawn` is a {slug: round} map for both modes, so it counts fixed cards too.
    const sec = o.you?.secondary || {}
    const touch = (slug) => {
      if (!secondaries.has(slug)) {
        secondaries.set(slug, { slug, role: o.you?.role || null, drawn: 0, scored: 0, vp: 0, discarded: 0 })
      }
      return secondaries.get(slug)
    }
    for (const slug of Object.keys(sec.drawn || {})) touch(slug).drawn++
    for (const e of sec.discarded || []) if (e?.slug) touch(e.slug).discarded++
    const tactical = o.you?.secondaryMode !== 'fixed'
    for (const e of sec.scored || []) {
      if (!e?.slug) continue
      const row = touch(e.slug)
      row.scored++
      row.vp += tactical ? Math.min(e.vp || 0, TACTICAL_SECONDARY_CAP) : (e.vp || 0)
    }
  }

  const n = games.length
  const avg = (v) => (n ? v / n : 0)
  const perGame = (o) => ({ primary: avg(o.primary), secondary: avg(o.secondary), bonus: avg(o.bonus) })
  let youCum = 0
  let oppCum = 0

  return {
    games: n,
    skipped,
    record,
    winrate: n ? (record.w + record.d / 2) / n : 0,
    enough: n >= MIN_SAMPLE,
    avgFor: avg(vpFor),
    avgAgainst: avg(vpAgainst),
    avgDiff: avg(vpFor - vpAgainst),
    avgBp: avg(bpFor),
    ...streaks(outcomes),
    split: { you: perGame(split.you), opp: perGame(split.opp) },
    rounds: rounds.map((r) => {
      youCum += avg(r.youVp)
      oppCum += avg(r.oppVp)
      return {
        round: r.round,
        you: avg(r.you),
        opp: avg(r.opp),
        youCum,
        oppCum,
      }
    }),
    byFaction: rows(byFaction),
    byDetachment: rows(byDetachment),
    byOpponent: rows(byOpponent),
    byMission: rows(byMission),
    bySize: rows(bySize),
    firstTurn: rows(byFirstTurn),
    // Best-paying card first: total VP is what a player recognises, average is the tiebreak.
    secondaries: [...secondaries.values()]
      .map((s) => ({ ...s, avgVp: s.scored ? s.vp / s.scored : 0 }))
      .sort((a, b) => b.vp - a.vp || b.avgVp - a.avgVp),
  }
}

// Per-roster record (the roster badges and the stats page's roster table). Keyed by the saved
// roster's id — `rosterId` is provenance and MAY dangle (the list can be deleted or edited after
// the game), which is exactly why the snapshot's name is kept alongside as a fallback label.
export function rosterRecords(history = []) {
  const out = new Map()
  for (const g of (history || []).filter(isResult)) {
    const o = outcomeOf(g)
    const id = o.you?.rosterId
    if (!id) continue
    if (!out.has(id)) out.set(id, { ...blank(id), name: o.you?.roster?.name || '' })
    const row = out.get(id)
    tally(row, o)
    if (!row.name && o.you?.roster?.name) row.name = o.you.roster.name
  }
  const res = new Map()
  for (const [id, row] of out) res.set(id, { ...finishRow(row), name: row.name })
  return res
}

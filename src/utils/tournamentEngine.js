// Swiss-system tournament engine — pure functions, no Vue/DOM deps so it can be
// unit-checked with plain node. Mirrors the mechanics of the source spreadsheet:
//   standings sort: TP ↓ → SOS ↓ → VP ↓ → seed ↑
//   SOS = sum of every opponent's *total* TP
//   pairings: rating order, avoid rematches (backtracking), bye for odd counts
//   tables: prefer tables where neither of the pair has played before

// ── Tournament model ────────────────────────────────────────────────────────
// tournament = {
//   settings: { rounds, tables, tpWin, tpDraw, tpLoss, byeTp },
//   players:  [{ id, name, faction, seed }],
//   rounds:   [{ n, matches: [{ table, aId, bId, tpA, vpA, tpB, vpB }] }]
// }
// A bye is a match with bId === null: the present player (aId) is awarded byeTp.

export const DEFAULT_SETTINGS = {
  rounds: 4,
  tables: 8,
  tpWin: 2,
  tpDraw: 1,
  tpLoss: 0,
  byeTp: 2,
}

const pairKey = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`)

/** Build cross-round history: who played whom, on which tables, and who had a bye. */
export function buildHistory(rounds = []) {
  const playedPairs = new Set()
  const tableHistory = new Map() // playerId -> number[]
  const byes = new Set()
  const pushTable = (id, table) => {
    if (id == null || table == null) return
    if (!tableHistory.has(id)) tableHistory.set(id, [])
    tableHistory.get(id).push(table)
  }
  for (const round of rounds) {
    for (const m of round.matches || []) {
      if (m.bId == null) {
        if (m.aId != null) byes.add(m.aId)
        pushTable(m.aId, m.table)
        continue
      }
      playedPairs.add(pairKey(m.aId, m.bId))
      pushTable(m.aId, m.table)
      pushTable(m.bId, m.table)
    }
  }
  return { playedPairs, tableHistory, byes }
}

export function havePlayed(history, a, b) {
  return history.playedPairs.has(pairKey(a, b))
}

/** Aggregate W/D/L, TP, VP and standings (sorted) for the whole tournament. */
export function computeStandings(tournament) {
  const { players = [], rounds = [], settings = DEFAULT_SETTINGS } = tournament
  const byId = new Map(players.map(p => [p.id, p]))
  const acc = new Map(
    players.map(p => [p.id, {
      playerId: p.id, name: p.name, faction: p.faction, seed: p.seed,
      tp: 0, vp: 0, w: 0, d: 0, l: 0, games: 0, opponents: [], tables: [],
    }]),
  )

  for (const round of rounds) {
    for (const m of round.matches || []) {
      // Bye — present player gets byeTp, counts as a win, no opponent.
      if (m.bId == null) {
        const s = acc.get(m.aId); if (!s) continue
        s.tp += settings.byeTp; s.w += 1; s.games += 1
        if (m.table != null) s.tables.push(m.table)
        continue
      }
      const sides = [
        { me: m.aId, opp: m.bId, tp: num(m.tpA), vp: num(m.vpA), oppTp: num(m.tpB) },
        { me: m.bId, opp: m.aId, tp: num(m.tpB), vp: num(m.vpB), oppTp: num(m.tpA) },
      ]
      for (const side of sides) {
        const s = acc.get(side.me); if (!s) continue
        s.tp += side.tp; s.vp += side.vp; s.games += 1
        if (side.tp > side.oppTp) s.w += 1
        else if (side.tp === side.oppTp) s.d += 1
        else s.l += 1
        s.opponents.push(side.opp)
        if (m.table != null) s.tables.push(m.table)
      }
    }
  }

  // SOS = sum of each opponent's *total* TP (second pass, needs everyone's TP).
  const tpOf = id => acc.get(id)?.tp ?? 0
  const standings = [...acc.values()].map(s => ({
    ...s,
    sos: s.opponents.reduce((sum, oppId) => sum + tpOf(oppId), 0),
    opponentNames: s.opponents.map(id => byId.get(id)?.name ?? '—'),
  }))

  standings.sort(compareStandings)
  standings.forEach((s, i) => { s.place = i + 1 })
  return standings
}

/** Sort comparator: TP ↓, SOS ↓, VP ↓, seed ↑ (stable, deterministic). */
export function compareStandings(a, b) {
  return (b.tp - a.tp) || (b.sos - a.sos) || (b.vp - a.vp) || (a.seed - b.seed)
}

/**
 * Swiss pairings for the next round, in current standings order.
 * Tries to avoid rematches via backtracking; if impossible, allows the fewest
 * rematches and flags them. Odd field → lowest-ranked player without a prior
 * bye receives the bye.
 * Returns { pairs:[{aId,bId,repeat}], byeId|null }.
 */
export function suggestPairings(standings, history) {
  const order = standings.map(s => s.playerId)
  let byeId = null
  let pool = order
  if (pool.length % 2 === 1) {
    // Bye to the lowest-ranked player who hasn't had one yet (else very last).
    for (let i = pool.length - 1; i >= 0; i--) {
      if (!history.byes.has(pool[i])) { byeId = pool[i]; break }
    }
    if (byeId == null) byeId = pool[pool.length - 1]
    pool = pool.filter(id => id !== byeId)
  }

  const best = matchNoRepeat(pool, history)
  const pairs = (best || matchAllowRepeat(pool)).map(([aId, bId]) => ({
    aId, bId, repeat: havePlayed(history, aId, bId),
  }))
  return { pairs, byeId }
}

// Backtracking perfect matching that forbids rematches. Returns array of
// [a,b] pairs in rating order, or null if no rematch-free matching exists.
function matchNoRepeat(pool, history) {
  if (pool.length === 0) return []
  const [first, ...rest] = pool
  for (let i = 0; i < rest.length; i++) {
    if (havePlayed(history, first, rest[i])) continue
    const remaining = rest.filter((_, j) => j !== i)
    const sub = matchNoRepeat(remaining, history)
    if (sub) return [[first, rest[i]], ...sub]
  }
  return null
}

// Fallback when rematch-free is impossible: pair adjacent in rating order.
function matchAllowRepeat(pool) {
  const pairs = []
  for (let i = 0; i + 1 < pool.length; i += 2) pairs.push([pool[i], pool[i + 1]])
  return pairs
}

/** Table status for a pair: 0=🟢 neither played here, 1=🟡 one played, 2=🔴 both. */
export function tableStatus(aId, bId, table, tableHistory) {
  const aPlayed = (tableHistory.get(aId) || []).includes(table)
  const bPlayed = bId != null && (tableHistory.get(bId) || []).includes(table)
  return (aPlayed ? 1 : 0) + (bPlayed ? 1 : 0)
}

/**
 * Assign each pair (in order) a table, preferring tables where neither has
 * played (status 0), then 1, then 2; never reusing a table within the round.
 * Returns pairs augmented with { table, tableStatus }.
 */
export function assignTables(pairs, tableHistory, tablesCount) {
  const taken = new Set()
  return pairs.map(pair => {
    let bestTable = null
    let bestStatus = Infinity
    for (let t = 1; t <= tablesCount; t++) {
      if (taken.has(t)) continue
      const st = tableStatus(pair.aId, pair.bId, t, tableHistory)
      if (st < bestStatus) { bestStatus = st; bestTable = t; if (st === 0) break }
    }
    if (bestTable != null) taken.add(bestTable)
    return { ...pair, table: bestTable, tableStatus: bestStatus === Infinity ? null : bestStatus }
  })
}

/** Replacement-opponent helper for a chosen player (manual TO adjustments). */
export function substitutionCandidates(playerId, standings, history) {
  return standings
    .filter(s => s.playerId !== playerId)
    .map(s => ({
      playerId: s.playerId,
      name: s.name,
      faction: s.faction,
      played: havePlayed(history, playerId, s.playerId),
      tp: s.tp, sos: s.sos, vp: s.vp,
      tables: (history.tableHistory.get(s.playerId) || []),
    }))
}

/** Per-match validity flags for the results screen. */
export function validateRound(round, allRounds) {
  const seen = new Set()
  const tablesUsed = new Set()
  const priorPairs = buildHistory((allRounds || []).filter(r => r.n < round.n)).playedPairs
  return (round.matches || []).map(m => {
    const dup = (m.aId != null && seen.has(m.aId)) || (m.bId != null && seen.has(m.bId))
    if (m.aId != null) seen.add(m.aId)
    if (m.bId != null) seen.add(m.bId)
    const tableDup = m.table != null && tablesUsed.has(m.table)
    if (m.table != null) tablesUsed.add(m.table)
    const rematch = m.bId != null && priorPairs.has(pairKey(m.aId, m.bId))
    const filled = m.bId == null || (m.tpA != null && m.tpB != null)
    return { playerDup: dup, tableDup, rematch, filled }
  })
}

function num(v) {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

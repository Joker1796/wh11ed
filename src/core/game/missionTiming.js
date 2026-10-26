// When a mission's condition is scored — read from the mission itself, never guessed.
//
// Every scoring block of a primary or secondary card carries its moment in English in `when`
// ("End of your turn", "End of your opponent's turn or the end of the fifth battle round …");
// the End of Battle blocks carry it in the heading instead. There are only a handful of such
// phrasings, so they are listed here one by one, and `missionTiming.test.js` fails the day the
// data holds one this table does not know — an unknown moment must be a failing test, not a
// row that silently stays unlocked (or locked) in the wrong turn. Mikhail's prototype matched
// the English text with regexes and kept a hand list of four "opponent's turn" cards; that is
// exactly what this replaces.
//
// Moments:
//   'your-command' — the end of the owner's Command phase
//   'your-turn'    — the end of the owner's turn
//   'opp-turn'     — the end of the owner's OPPONENT's turn
//   'any-turn'     — the end of either player's turn
//   'active'       — any time while the card is active
//   'end-battle'   — the end of the battle (fifth round only, by its heading)
// `fallback: 'r5'` — "… or the end of the fifth battle round (whichever comes first)" /
// "(or the end of your turn in the fifth battle round)": in round 5 the moment can also come at
// the end of the round itself, whoever's turn closes it.

const WHEN = {
  'End of your turn': { at: 'your-turn' },
  'End of your Command phase': { at: 'your-command' },
  'End of your Command phase (or the end of your turn in the fifth battle round)': { at: 'your-command', fallback: 'r5' },
  "End of your opponent's turn": { at: 'opp-turn' },
  "End of your opponent's turn or the end of the fifth battle round (whichever comes first)": { at: 'opp-turn', fallback: 'r5' },
  'End of a turn': { at: 'any-turn' },
  "End of either player's turn": { at: 'any-turn' },
  'While this card is active': { at: 'active' },
}

// The moment of one ENGLISH block ({ heading, when }), or null for a phrasing not in the table.
export function scoringMoment(block) {
  if (!block) return null
  if (block.heading === 'End of Battle' && !block.when) return { at: 'end-battle' }
  return WHEN[block.when] || null
}

// In which turns of a round a condition with this moment is scored — the turn indices (0 is the
// first-turn player, so a turn IS a player index), or null for "any turn" (the end of either
// player's turn, while the card is active, a phrasing not in the table).
//   'your-command' / 'your-turn' — the owner's own turn;
//   'opp-turn' — the opponent's, and with the "… or the end of the fifth battle round" fallback
//                also the turn that closes round 5;
//   'end-battle' — the battle's last turn.
export function momentTurns(moment, pi, round) {
  if (!moment) return null
  switch (moment.at) {
    case 'your-command':
    case 'your-turn': return [pi]
    case 'opp-turn': return moment.fallback === 'r5' && round === 5 ? [1 - pi, 1] : [1 - pi]
    case 'end-battle': return [1]
  }
  return null
}

// May a condition with this moment be ticked in this turn? Only in the turn it is scored in
// (owner, 2026-10-21): a score ticked a turn late landed in the wrong turn — the second player's
// "end of your turn", ticked in the opponent's turn, went into a turn of his not yet played — and
// one ticked early is a score not yet earned. A moment that has passed is put right by opening
// that turn on the game screen (the round steps), which logs the correction.
//   ctx = { pi, round, turn } — the owner, and the round and turn being scored (the live ones, or
//   a past turn opened for correction).
// Returns null when the condition is open, else the turn it is scored in — the one to open.
export function lockedTurn(moment, ctx) {
  const turns = momentTurns(moment, ctx.pi, ctx.round)
  return !turns || turns.includes(ctx.turn) ? null : turns[0]
}

// lockedTurn for one block of a card in a game — what the scoring rows ask. `enBlock` is the
// ENGLISH block (the localized one's `when` is Russian); `round` and `turn` are the ones on screen.
export function blockLocked(game, pi, round, turn, enBlock) {
  return lockedTurn(scoringMoment(enBlock), { pi, round, turn })
}

// Has this turn begun — may it be opened for correction? A turn of a past round, or of the live
// round up to the one being played.
export function turnReached(game, round, turn) {
  return round < game.currentRound || (round === game.currentRound && turn <= (game.currentTurn === 1 ? 1 : 0))
}

// The turn to open for a card's locked conditions — the first one, of the card's blocks for the
// round on screen, scored in another turn that has begun — or null. `enBlockOf(bi)` reads the
// ENGLISH block; `blocks` are the ones the dialog draws (cardBlocks, `offRound` ones skipped).
export function fixTurnOf(game, pi, round, turn, blocks, enBlockOf) {
  for (const b of blocks) {
    if (b.offRound) continue
    const t = blockLocked(game, pi, round, turn, enBlockOf(b.bi))
    if (t != null && turnReached(game, round, t)) return t
  }
  return null
}

// What is scored at the moment a turn ends — the check the game screen shows before End turn
// (Mikhail's prototype: "Check Secondary Missions"). Every condition whose moment is this one, on
// both sides' cards in hand and both primaries: the side on turn's "end of your turn", the other
// side's "end of your opponent's turn", either side's "end of a turn". Until 2026-10-02 it left out
// the side on turn's own cards, as the ones in front of the player anyway; the owner wants the
// card offered whenever a condition falls due at the end of the turn. On the turn that closes the
// battle it adds every End of Battle condition and the "… or the end of the fifth battle round"
// fallbacks.
//   game — the live game; `scorable(slug, role, round)` — useTracker's scorableBlocks, bound to
//   the locale by the caller (this module stays free of the heavy mission data).
//   discarding — `{ pi, slug }` of each card the turn ends by discarding for CP (one, or a list —
//   the cards marked for the end of the turn): not in the check, or one card would pay twice — its
//   VP and the CP (a player's report, 2026-10-20).
// Returns [{ pi, slug | null (the primary), blocks }], each with only the blocks that score now.
export function turnEndChecks(game, scorable, missionEn, discarding = null) {
  const leaving = [].concat(discarding || [])
  if (!game || game.phase !== 'playing') return []
  const R = game.currentRound
  const T = game.currentTurn === 1 ? 1 : 0
  const last = R === 5 && T === 1
  const out = []
  const pick = (pi, slug, role, keep) => {
    const pl = game.players[pi]
    const en = missionEn(slug, role)
    const blocks = scorable(slug, role, R).filter((b) => {
      if (role && pl.secondaryMode && b.kind && b.kind !== pl.secondaryMode) return false
      return keep(scoringMoment(en?.blocks[b.bi]))
    })
    if (blocks.length) out.push({ pi, slug: role ? slug : null, blocks })
  }
  game.players.forEach((pl, pi) => {
    const opp = pi !== T
    const due = (m) => {
      if (!m) return false
      if (m.at === 'end-battle') return last
      if (m.at === 'opp-turn') return opp || (last && m.fallback === 'r5')
      if (m.at === 'your-turn') return !opp
      if (m.at === 'any-turn') return true
      // "End of your Command phase (or the end of your turn in the fifth battle round)"
      if (m.at === 'your-command') return !opp && R === 5 && m.fallback === 'r5'
      return false
    }
    for (const slug of pl.secondary?.hand || []) if (!leaving.some((d) => d?.pi === pi && d.slug === slug)) pick(pi, slug, pl.role, due)
    if (pl.primarySlug) pick(pi, pl.primarySlug, null, due)
  })
  return out
}

// Where in the turn on the clock each of one side's cards scores — the Turn/Phase tab lays the
// turn out step by step and puts a card at its moment (owner, 2026-10-10). The same reading of
// the moments as turnEndChecks, but for one side and for the whole turn: the end of the owner's
// Command phase is a moment of its own; "while this card is active" has none and is left out.
// Returns [{ at: 'command-end' | 'turn-end', slug | null (the primary), name }], once per card
// and moment.
export function cardMoments(game, pi, scorable, missionEn, missionName) {
  if (!game || game.phase !== 'playing') return []
  const pl = game.players?.[pi]
  if (!pl) return []
  const R = game.currentRound
  const T = game.currentTurn === 1 ? 1 : 0
  const opp = pi !== T
  const last = R === 5 && T === 1
  const stepOf = (m) => {
    if (!m) return null
    if (m.at === 'your-command') return opp ? null : 'command-end'
    if (m.at === 'end-battle') return last ? 'turn-end' : null
    if (m.at === 'opp-turn') return opp || (last && m.fallback === 'r5') ? 'turn-end' : null
    if (m.at === 'your-turn') return opp ? null : 'turn-end'
    if (m.at === 'any-turn') return 'turn-end'
    return null
  }
  const out = []
  const pick = (slug, role) => {
    const en = missionEn(slug, role)
    const at = new Set()
    for (const b of scorable(slug, role, R)) {
      if (role && pl.secondaryMode && b.kind && b.kind !== pl.secondaryMode) continue
      const s = stepOf(scoringMoment(en?.blocks[b.bi]))
      if (s) at.add(s)
    }
    for (const s of at) out.push({ at: s, slug: role ? slug : null, name: missionName(slug, role) })
  }
  if (pl.primarySlug) pick(pl.primarySlug, null)
  for (const slug of pl.secondary?.hand || []) pick(slug, pl.role)
  return out
}

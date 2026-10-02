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

// Can a condition with this moment be ticked right now? Only one thing is refused, and it is
// the one mistake the timing makes likely: scoring an "end of your opponent's turn" condition
// during your OWN turn, when that moment cannot have come. Everything else stays open — a
// condition scored at the end of your turn may well be ticked a moment after the turn passed —
// and so does any round other than the live one: a past round is being corrected after the
// fact, and correction is never refused.
//   ctx = { pi, turn, round, liveRound, lastTurn } — the owner, whose turn it is, the round
//   being scored and the live one, and whether this turn is the last of the battle.
export function lockedNow(moment, ctx) {
  if (!moment || ctx.round !== ctx.liveRound) return false
  if (moment.at !== 'opp-turn' || ctx.turn !== ctx.pi) return false
  // "… or the end of the fifth battle round": the owner's own turn that closes round 5 is it.
  return !(moment.fallback === 'r5' && ctx.lastTurn)
}

// lockedNow for one block of a card in a game — what the scoring rows ask. `enBlock` is the
// ENGLISH block (the localized one's `when` is Russian); `round` is the round on screen.
export function blockLocked(game, pi, round, enBlock) {
  const turn = game.currentTurn === 1 ? 1 : 0
  return lockedNow(scoringMoment(enBlock), {
    pi, turn, round, liveRound: game.currentRound,
    lastTurn: game.currentRound === 5 && turn === 1,
  })
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
// Returns [{ pi, slug | null (the primary), blocks }], each with only the blocks that score now.
export function turnEndChecks(game, scorable, missionEn) {
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
    for (const slug of pl.secondary?.hand || []) pick(pi, slug, pl.role, due)
    if (pl.primarySlug) pick(pi, pl.primarySlug, null, due)
  })
  return out
}

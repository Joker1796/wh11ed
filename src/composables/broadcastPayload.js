// The read-only scoreboard a live broadcast serves to OBS. Projection happens HERE, on the
// phone: the server stores this object opaquely and the public endpoint serves it verbatim, so
// whatever is not projected (rosters, notes, rule switches) physically cannot reach a viewer.
// Names are baked in (mission/faction names stay English by product convention) so the overlay
// page renders the JSON alone and never imports the heavy mission/faction datasets.
//
// The drawn secondary hand is deliberately INCLUDED: cards are drawn face-up ("draw two
// Secondary Missions face-up… these are active for you") — open information at the table, and
// exactly what a stream wants on screen.
import { membersOf } from './rosterGameLink.js'
import {
  BATTLE_READY_VP,
  battlePoints,
  battlePointsFromVp,
  grandTotal,
  primaryTotal,
  roundBreakdown,
  secondaryTotal,
} from './gameScoring.js'
import { missionBySlug, dispositionName } from './useTracker.js'
import { factionIndexBySlug } from '../data/factionsIndex.js'
import { tracks } from '../data/trackerOptions.js'

export const BROADCAST_VERSION = 1

function secondaryCards(pl) {
  const sec = pl.secondary || {}
  const vpOf = (slug) =>
    (sec.scored || []).filter((e) => e.slug === slug).reduce((s, e) => s + (e.vp || 0), 0)
  const card = (slug, active) => ({
    slug,
    name: missionBySlug(slug, pl.role)?.name || slug,
    vp: vpOf(slug),
    active,
  })
  const hand = (sec.hand || []).map((slug) => card(slug, true))
  // Set-aside cards keep the VP they scored — the totals count them, so the list shows them.
  const aside = (sec.discarded || []).map((d) => card(d.slug ?? d, false))
  return [...hand, ...aside]
}

function side(game, pl, pi) {
  return {
    // Per-round scoring, so an overlay can draw the shape of the game rather than one number:
    // what each round scored and the running VP through it. The Battle Points of each round
    // are filled in below — they need BOTH sides.
    rounds: roundBreakdown(game, pi),
    teamName: pl.teamName || pl.name || '',
    players: membersOf(pl).map((m) => ({
      name: m.name || '',
      faction: factionIndexBySlug(m.factionSlug)?.name || null,
      factionSlug: m.factionSlug || null,
      detachments: m.detachments || [],
    })),
    role: pl.role || null,
    forceType: pl.forceType || null,
    disposition: dispositionName(pl.disposition) || null,
    battleReady: !!pl.battleReady,
    // players[0] is always the first-turn player (newGame reorders on that).
    firstTurn: pi === 0,
    cp: pl.cp || 0,
    primary: {
      slug: pl.primarySlug || null,
      name: pl.primarySlug ? missionBySlug(pl.primarySlug)?.name || pl.primarySlug : null,
      vp: primaryTotal(game, pi),
    },
    secondaries: secondaryCards(pl),
    secondaryVp: secondaryTotal(game, pi),
    battleReadyVp: pl.battleReady ? BATTLE_READY_VP : 0,
    total: grandTotal(game, pi),
  }
}

// Battle Points as they stand RIGHT NOW, and as they would have stood at the end of each round
// — the tracker only ever showed the final figure, and a stream wants the line, not the dot.
// The running figure runs the same table the finished game does (gameScoring's single source),
// over each side's cumulative VP plus its Battle-Ready bonus, which is known from the start.
function fillBattlePoints(game, sides) {
  const [now0, now1] = battlePoints(game)
  sides[0].bp = now0
  sides[1].bp = now1
  const bonus = sides.map((s) => s.battleReadyVp)
  sides[0].rounds.forEach((r, i) => {
    const [a, b] = battlePointsFromVp(
      r.cumulativeVp + bonus[0],
      sides[1].rounds[i].cumulativeVp + bonus[1],
    )
    r.bp = a
    sides[1].rounds[i].bp = b
  })
}

export function broadcastPayload(game) {
  if (!game || !Array.isArray(game.players)) return null
  const s = game.settings || {}
  const sides = game.players.map((pl, pi) => side(game, pl, pi))
  fillBattlePoints(game, sides)
  return {
    v: BROADCAST_VERSION,
    gameType: s.gameType === 'doubles' ? 'doubles' : 'singles',
    // What the players call the result (`bp` means the Battle Points decide it, not raw VP) —
    // both figures are in the payload either way; this says which one they are playing to.
    scoreMode: s.scoreMode === 'bp' ? 'bp' : 'vp',
    battleSize: s.combatPatrol ? 'combatPatrol' : (s.battleSize || null),
    phase: game.phase || 'playing',
    endReason: game.endReason || null,
    round: game.currentRound || 1,
    // Whose turn (an index into sides[]) and the battle phase — the latter only when this game
    // actually keeps the clock; an untracked game's stored phase is stale, not current.
    turn: game.currentTurn === 1 ? 1 : 0,
    battlePhase: tracks(s, 'trackPhases') ? game.currentPhase || null : null,
    layout: s.layout === 'custom' ? s.customLayout?.label || s.customLayout?.id || 'custom' : s.layout || null,
    twist: s.twist || null,
    sides,
    updatedAt: new Date().toISOString(),
  }
}

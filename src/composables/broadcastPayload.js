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
import { primaryTotal, secondaryTotal, grandTotal } from './gameScoring.js'
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
    total: grandTotal(game, pi),
  }
}

export function broadcastPayload(game) {
  if (!game || !Array.isArray(game.players)) return null
  const s = game.settings || {}
  return {
    v: BROADCAST_VERSION,
    gameType: s.gameType === 'doubles' ? 'doubles' : 'singles',
    phase: game.phase || 'playing',
    round: game.currentRound || 1,
    // Whose turn (an index into sides[]) and the battle phase — the latter only when this game
    // actually keeps the clock; an untracked game's stored phase is stale, not current.
    turn: game.currentTurn === 1 ? 1 : 0,
    battlePhase: tracks(s, 'trackPhases') ? game.currentPhase || null : null,
    layout: s.layout === 'custom' ? s.customLayout?.label || s.customLayout?.id || 'custom' : s.layout || null,
    twist: s.twist || null,
    sides: game.players.map((pl, pi) => side(game, pl, pi)),
    updatedAt: new Date().toISOString(),
  }
}

import { membersOf, sideName } from '../../composables/useTracker.js'

// The seats of a shared game, named the way the table knows them: a side's name in singles, the
// team and the player in doubles. One list for the party dialog and the lobby — the server keeps
// only what a phone was called when it joined ("Player 2"), never the name typed on its side.
export function partySeats(game, labels) {
  if (!game) return []
  const out = []
  game.players.forEach((pl, side) => {
    if (game.settings?.gameType === 'doubles') {
      membersOf(pl).forEach((m, mi) => out.push({
        key: seatKey(side, mi), side, mi,
        label: `${pl.name || pl.teamName || ''} · ${m.name || (mi === 0 ? labels.trackerPlayer1 : labels.trackerPlayer2)}`,
      }))
    } else {
      out.push({ key: seatKey(side, null), side, mi: null, label: sideName(pl, side, labels) })
    }
  })
  return out
}

export function seatKey(side, mi) {
  return side == null ? '' : `${side}:${mi ?? ''}`
}

// A member as the table knows them: the seat they hold, or — sitting nowhere — the name their
// phone gave, and "Unnamed" for none (it read "no seat" twice beside the seat mark, 2026-10-18).
export function memberLabel(m, game, labels) {
  if (m.side == null) return m.name || labels.partyMemberUnnamed
  const s = partySeats(game, labels).find((x) => x.side === m.side && (x.mi ?? null) === (m.mi ?? null))
  return s ? s.label : game?.players?.[m.side]?.name || m.name || labels.partyMemberUnnamed
}

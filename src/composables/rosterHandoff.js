// Hand a roster off to the Game Tracker. We never touch the saved-game format (validated by
// wh11ed-api's domain/game.ts) — instead we pre-fill the tracker's SETUP DRAFT (the in-progress
// wizard state), which GameSetup hydrates on mount. A partial draft is enough: GameSetup merges
// its own defaults over whatever fields we set (it reads the draft before its reset watchers
// register, so a pre-set faction/detachments isn't wiped).
import { DISPOSITIONS, useTracker } from './useTracker.js'
import { rosterSnapshot } from './rosterGameLink.js'

// Roster battle-size ids come from the appdata slug ('strike-force'); the tracker uses its own
// camelCase id ('strikeForce'). Incursion / Onslaught match.
const BATTLE_SIZE_MAP = { 'strike-force': 'strikeForce' }
export function toTrackerBattleSize(id) {
  return BATTLE_SIZE_MAP[id] || id
}

// Write a minimal setup draft from a roster. The roster already stores detachments by name
// (like the tracker), so they carry over directly. A 'custom' battle size falls back to Strike
// Force in the tracker (which has no custom size).
//
// The roster is ATTACHED as well as copied from: coming here from "play this list" is the one
// moment we know for certain which list is being fielded, so the player arrives at the wizard with
// it already linked (rosterId + snapshot) instead of having to pick it again a screen later.
// "Take and Hold" → 'take-and-hold'. Unknown (or undeclared) leaves the tracker to derive its own
// from the detachments, exactly as it does for a game started without a list.
function dispositionId(name) {
  return (name && DISPOSITIONS.find((d) => d.name === name)?.id) || null
}

export function prefillDraftFromRoster(roster) {
  const { setupDraft } = useTracker()
  const battleSize = roster?.battleSize === 'custom' ? 'strikeForce' : toTrackerBattleSize(roster?.battleSize)
  setupDraft.value = {
    step: 1,
    players: [
      {
        factionSlug: roster?.faction || null,
        detachments: [...(roster?.detachments || [])],
        // The list already declared which Force Disposition it plays, and that is the one thing
        // the tracker would otherwise ask again — and answer for the player by taking whichever
        // candidate came first. The roster stores it as the detachment data spells it; the ids
        // are the tracker's, and this is the one place both vocabularies are in scope.
        disposition: dispositionId(roster?.disposition),
        rosterId: roster?.id || null,
        roster: rosterSnapshot(roster),
      },
      {},
    ],
    settings: { battleSize },
  }
}

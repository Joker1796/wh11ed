// Hand a roster off to the Game Tracker. We never touch the saved-game format (validated by
// wh11ed-api's domain/game.ts) — instead we pre-fill the tracker's SETUP DRAFT (the in-progress
// wizard state), which GameSetup hydrates on mount. A partial draft is enough: GameSetup merges
// its own defaults over whatever fields we set (it reads the draft before its reset watchers
// register, so a pre-set faction/detachments isn't wiped).
import { useTracker } from './useTracker.js'

// Roster battle-size ids come from the appdata slug ('strike-force'); the tracker uses its own
// camelCase id ('strikeForce'). Incursion / Onslaught match.
const BATTLE_SIZE_MAP = { 'strike-force': 'strikeForce' }
export function toTrackerBattleSize(id) {
  return BATTLE_SIZE_MAP[id] || id
}

// Write a minimal setup draft from a roster. `detachmentName` is the tracker/mfm detachment name
// (the roster stores an appdata sid; the editor resolves it to the name before calling).
export function prefillDraftFromRoster(roster, detachmentName) {
  const { setupDraft } = useTracker()
  setupDraft.value = {
    step: 1,
    players: [
      { factionSlug: roster?.faction || null, detachments: detachmentName ? [detachmentName] : [] },
      {},
    ],
    settings: { battleSize: toTrackerBattleSize(roster?.battleSize) },
  }
}

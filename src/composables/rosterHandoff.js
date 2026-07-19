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

// Write a minimal setup draft from a roster. The roster already stores detachments by name
// (like the tracker), so they carry over directly. A 'custom' battle size falls back to Strike
// Force in the tracker (which has no custom size).
export function prefillDraftFromRoster(roster) {
  const { setupDraft } = useTracker()
  const battleSize = roster?.battleSize === 'custom' ? 'strikeForce' : toTrackerBattleSize(roster?.battleSize)
  setupDraft.value = {
    step: 1,
    players: [
      { factionSlug: roster?.faction || null, detachments: [...(roster?.detachments || [])] },
      {},
    ],
    settings: { battleSize },
  }
}

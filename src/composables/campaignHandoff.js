// "Play a battle" from a Dominatus campaign: the tracker's setup draft is filled with what the
// campaign already knows — the phase and its Location, both players' names, factions and Alliances
// — and each side remembers its campaign player (`campaignPlayer`), the game its campaign
// (`settings.dominatus.campaign`). The pre-battle step then offers each side only the Upgrade cards
// that player holds, and the finished game is sent to that campaign as those two players
// (CampSendGame). As rosterHandoff.js: the saved-game envelope is untouched, only the draft is
// written, and a game in progress is never overwritten (the draft waits behind "Continue setup").
import { useTracker } from './useTracker.js'

const sideOf = (p) => ({
  name: p?.name || '',
  factionSlug: p?.faction || null,
  detachments: [],
  alliance: p?.alliance || null,
  campaignPlayer: p?.id || null,
})

/**
 * @param {{ campaignId: string, phase: number, location: string | null, size?: string, a: object, b: object }} battle
 * @param {import('vue-router').Router} router
 */
export async function playCampaignBattle({ campaignId, phase, location, size, a, b }, router) {
  const { setupDraft, current } = useTracker()
  setupDraft.value = {
    step: 1,
    players: [sideOf(a), sideOf(b)],
    // The campaign's battle size (a campaign setting); the setup still lets the players change it.
    settings: { ...(size ? { battleSize: size } : {}), dominatus: { phase, location: location || null, campaign: campaignId } },
  }
  await router.push(current.value ? '/tracker' : '/tracker/game')
}

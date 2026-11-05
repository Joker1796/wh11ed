// "Play a battle" from a Dominatus campaign: the tracker's setup draft is filled with what the
// campaign already knows — the phase and its Location, both players' names, factions and Alliances
// — and each side remembers its campaign player (`campaignPlayer`), the game its campaign
// (`settings.dominatus.campaign`). The pre-battle step then offers each side only the Upgrade cards
// that player holds, and the finished game is sent to that campaign as those two players
// (CampSendGame). As rosterHandoff.js: the saved-game envelope is untouched, only the draft is
// written, and a game in progress is never overwritten (the draft waits behind "Continue setup").
//
// A player's list in the campaign (a `roster` event: the share code) comes along attached, as the
// roster builder's "play this list" attaches one (rosterHandoff.js) — the setup's roster button
// still swaps it for one of the player's own (owner, 2026-11-03). A list of another faction than the
// campaign keeps for the player is left behind: the campaign's faction is the one played.
//
// This device's own player brings the list itself when it is here, marked for the campaign
// (`campaignList`): a share code carries neither the list's id nor its cards, and the battle starts
// with the cards pinned on that list (GameSetup.pinnedFor), so from the copy it started with none.
import { useTracker } from './useTracker.js'
import { decodeRoster } from './rosterShare.js'
import { armyFromRoster } from './rosterHandoff.js'
import { rosterSnapshot } from './rosterGameLink.js'
import { useRosters } from './useRosters.js'
import { campaignPlayerOf } from './useCampaigns.js'
import { campaignList } from '../core/dominatus/upgrades.js'

async function sideOf(p, campaignId) {
  const own = p?.id && campaignPlayerOf(campaignId)?.id === p.id
    ? campaignList(useRosters().activeRosters.value, campaignId, p.faction)
    : null
  if (own) return { name: p.name || '', ...armyFromRoster(own, rosterSnapshot(own)), alliance: p.alliance || null, campaignPlayer: p.id }
  const snap = p?.roster?.code ? await decodeRoster(p.roster.code) : null
  const army = snap && (!p.faction || snap.faction === p.faction) ? armyFromRoster(snap, snap) : null
  return {
    name: p?.name || '',
    factionSlug: p?.faction || army?.factionSlug || null,
    detachments: [],
    ...army,
    alliance: p?.alliance || null,
    campaignPlayer: p?.id || null,
  }
}

/**
 * The campaign's battle size of its phase, its strict rules (owner, 2026-11-04: "Play a battle"
 * turns them on) and its Upgrade limit go along; the setup still lets the players change the size.
 * @param {{ campaignId: string, phase: number, location: string | null, size?: string, strict?: boolean, upgradeLimit?: number, a: object, b: object }} battle
 * @param {import('vue-router').Router} router
 * @param {() => void} [leaving] closes the caller's dialog — in the same tick as the push, after the
 *   lists are read: a dialog closed before it steps the history back (useBackToClose) a beat later,
 *   and that step cancelled the push still waiting on the tracker's chunk.
 */
export async function playCampaignBattle({ campaignId, phase, location, size, strict, upgradeLimit, a, b }, router, leaving) {
  const { setupDraft, current } = useTracker()
  const players = await Promise.all([sideOf(a, campaignId), sideOf(b, campaignId)])
  setupDraft.value = {
    step: 1,
    players,
    // The campaign's battle size (a campaign setting); the setup still lets the players change it.
    settings: {
      ...(size ? { battleSize: size } : {}),
      ...(strict ? { strictRules: true } : {}),
      dominatus: { phase, location: location || null, campaign: campaignId, ...(upgradeLimit ? { limit: upgradeLimit } : {}) },
    },
  }
  leaving?.()
  await router.push(current.value ? '/tracker' : '/tracker/game')
}

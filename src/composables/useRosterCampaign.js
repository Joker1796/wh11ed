// A list played in a Dominatus campaign (owner, 2026-11-05): the builder marks it with the deck and
// the campaign (or the whole deck, to try cards on), gives its units Upgrade cards from that pool,
// and the battle the list goes to starts with those cards given out (GameSetup, pinnedUpgrades).
//
// Kept on the roster as `dominatus: { campaign, upgrades }` — `campaign` the id of a campaign this
// account takes part in, or null for the whole deck; `upgrades` [{ slug, uid }], one card a unit.
// Absent on every other list. It syncs with the list (the backend passes the key through) and
// never travels in a share code or a game snapshot (rosterShare's PICK): the campaign's copy is the
// army, the cards are given in each battle.
import { computed } from 'vue'
import { useCampaigns } from './useCampaigns.js'
import { domUpgrades } from './dominatusMissions.js'
import { encodeRoster } from './rosterShare.js'
import { upgradeLimit } from '../core/dominatus/upgrades.js'

export function useRosterCampaign() {
  const { campaigns, stateOf, myPlayer, appendEvent } = useCampaigns()

  // The campaigns a list can be marked for: the ones this account plays in as a player of its own
  // (the Warmaster's too, when they play), each once its log is read here.
  const choices = computed(() => campaigns.value
    .filter((c) => c.role === 'owner' || c.role === 'member')
    .map((c) => {
      const st = stateOf(c.id)
      const me = st && !st.finished ? myPlayer(c, st) : null
      return me ? { id: c.id, name: c.name || c.id, st, me } : null
    })
    .filter(Boolean))

  const choiceOf = (dom) => (dom?.campaign ? choices.value.find((x) => x.id === dom.campaign) || null : null)

  /** The cards the list may give: the campaign player's, or the whole deck's (null: all). */
  const heldOf = (dom) => {
    const ch = choiceOf(dom)
    return ch ? new Set(ch.me.upgrades) : null
  }
  /** How many a battle gives: the campaign's limit, the booklet's 3 for the whole deck. */
  const limitOf = (dom) => upgradeLimit(choiceOf(dom) ? { limit: choiceOf(dom).st.upgradeLimit } : null)

  /** The pool, as the deck prints it in the reader's language: the cards that go to a unit. */
  const poolOf = (dom, locale) => {
    const held = heldOf(dom)
    return domUpgrades(locale).filter((c) => c.who && (!held || held.has(c.slug)))
  }

  /**
   * The list's copy, sent to its campaign as its player's roster (CampPlayers' "Roster") — when
   * the list is saved, so an edit taken back by Cancel sends nothing; not again while the
   * campaign's copy is this one, nor where the campaign takes no rosters.
   * @returns {Promise<boolean>} whether a copy went
   */
  async function sendCopy(roster) {
    const ch = choiceOf(roster?.dominatus)
    if (!ch || ch.st.roster === 'none' || !roster.units?.length) return false
    const code = await encodeRoster(roster)
    if (ch.me.roster?.code === code) return false
    await appendEvent(ch.id, 'roster', { player: ch.me.id, code, name: roster.name, points: roster.summary?.points || 0, faction: roster.faction || null })
    return true
  }

  return { choices, choiceOf, heldOf, limitOf, poolOf, sendCopy }
}

// A Dominatus battle in the tracker: the Agenda a player attempts IS their Primary Mission. The
// slug `dom-<agenda slug>` is a namespace of its own beside the Chapter Approved slugs of
// missions.js and the Combat Patrol `cp-` ones — the tracker stores it as a player's
// `primarySlug`, and `missionBySlug` (useTracker.js) serves it from here.
//
// The battle's campaign state lives on the game: `settings.dominatus = { phase, location }` and,
// per player, `alliance` and `declineAgenda` (Declining Agendas: that player scores the mission
// deck's Primary instead, as an ordinary game).
//
// THE DECK IS LOADED ON DEMAND. It is ~35 KB gzipped, and the tracker store rides on every
// tracker and roster screen; a static import put it on all of them for a mode few games use.
// `loadDominatusDeck()` fetches it (the store calls it when a game in this mode is on, the setup
// when the mode is switched on); until it arrives every reader here answers "not yet" — an Agenda
// is a placeholder card named from its slug — and, the module held in a shallowRef, every computed
// that read one re-runs when it lands.
import { shallowRef } from 'vue'
import { agendaFor } from '../core/dominatus/briefing.js'

export const DOM_MISSION_PREFIX = 'dom-'
export const isDomMissionSlug = (slug) => typeof slug === 'string' && slug.startsWith(DOM_MISSION_PREFIX)

const deckModule = shallowRef(null)
let pending = null

/** Fetch the deck (once); resolves to the data module. */
export function loadDominatusDeck() {
  if (deckModule.value) return Promise.resolve(deckModule.value)
  pending ||= import('../data/dominatus.js').then((m) => (deckModule.value = m))
  return pending
}

/** The deck in `locale`, or null while it is still on its way. Reactive. */
export function dominatusDeck(locale = 'en') {
  return deckModule.value ? deckModule.value.getDominatus(locale) : null
}

// "dom-a-knife-in-the-dark" → "A Knife in the Dark": a name to show before the deck arrives.
const SMALL = new Set(['a', 'an', 'and', 'by', 'in', 'of', 'the', 'to'])
function nameFromSlug(slug) {
  return slug.slice(DOM_MISSION_PREFIX.length).split('-')
    .map((w, i) => (i && SMALL.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ')
}

/** An Agenda as a mission card the tracker scores: its Primary, plus what it is (`agenda`). */
export function domMissionBySlug(slug, locale = 'en') {
  if (!isDomMissionSlug(slug)) return null
  const deck = dominatusDeck(locale)
  if (!deck) {
    loadDominatusDeck()
    return { slug, name: nameFromSlug(slug), blocks: [], pending: true }
  }
  const a = deck.agendas.find((x) => DOM_MISSION_PREFIX + x.slug === slug)
  if (!a) return null
  return {
    slug,
    name: a.name,
    nameRu: a.nameRu,
    agenda: a.slug,
    alliance: a.alliance,
    phase: a.phase,
    achieved: a.achieved,
    briefing: a.primary.briefing,
    blocks: a.primary.blocks,
  }
}

/**
 * The Agenda slug a player attempts in a Dominatus battle — their Alliance's Briefing for the
 * campaign phase, read with both Force Dispositions — or null when they declined, a choice the
 * Briefing needs is still missing, or the deck has not arrived.
 */
export function domMissionSlugFor(p, opponent, dominatus) {
  const deck = dominatusDeck()
  if (!deck || !dominatus || !p || p.declineAgenda) return null
  const slug = agendaFor(deck.briefings, {
    alliance: p.alliance,
    phase: dominatus.phase,
    mine: p.disposition,
    theirs: opponent?.disposition,
  })
  return slug ? DOM_MISSION_PREFIX + slug : null
}

/** The phase's Location card, in the reader's language (null until the deck is in). */
export function domLocation(slug, locale = 'en') {
  return dominatusDeck(locale)?.locations.find((l) => l.slug === slug) || null
}

/** The three Locations a campaign phase rolls between. */
export function domLocationsOf(phase, locale = 'en') {
  return dominatusDeck(locale)?.locations.filter((l) => l.phase === phase) || []
}

/** The Alliances, for pickers. */
export function domAlliances(locale = 'en') {
  return dominatusDeck(locale)?.alliances || []
}

/** The Upgrade cards, for the Declare Battle Formations picker. */
export function domUpgrades(locale = 'en') {
  return dominatusDeck(locale)?.upgrades || []
}


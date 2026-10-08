// Which tracker this build is. The new tracker's beta runs on its own subdomain beside the site's
// tracker (owner, 2026-10-08), and the two do not share a game: one counts Command points by
// itself, the other by hand, and two phones at one table would disagree. A game started in the
// beta carries `trackerGen` (none = 1); a phone says its own on joining a party, and the server
// turns away the other tracker's phones (wh11ed-api, `tracker_version`) with the generation the
// host plays — `siteOfGen` is where to send the player.

export const TRACKER_GEN = 1

const SITES = { 1: 'https://wh-rules.ru', 2: 'https://beta.wh-rules.ru' }

// The generations there is a site for — a `gen` from the server outside these gets no link.
export const SITE_GENS = Object.keys(SITES).map(Number)

export function siteOfGen(gen) {
  return SITES[gen] || SITES[1]
}

export function genOf(game) {
  return Number.isInteger(game?.trackerGen) ? game.trackerGen : 1
}

// A game of a later tracker than this one is read here, never played on: its record may carry
// what this tracker does not know how to keep.
export function playableHere(game) {
  return genOf(game) <= TRACKER_GEN
}

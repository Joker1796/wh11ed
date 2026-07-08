// Registry of implemented faction rule datasets, keyed by slug. FactionView resolves
// `:slug` here; only factions present in this map have a rules page (others show
// "coming soon" on the /factions list). Add a faction by importing its data module here.
import { necrons } from './necrons.js'

export const factionData = {
  necrons,
}

export function getFaction(slug) {
  return factionData[slug] || null
}

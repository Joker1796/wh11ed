// Registry of implemented faction rule datasets, keyed by slug. FactionView resolves
// `:slug` here; only factions present in this map have a rules page (others show
// "coming soon" on the /factions list). Add a faction by importing its data module here.
import { adeptusCustodes } from './adeptus-custodes.js'
import { adeptusMechanicus } from './adeptus-mechanicus.js'
import { darkAngels } from './dark-angels.js'
import { necrons } from './necrons.js'
import { orks } from './orks.js'
import { spaceMarines } from './space-marines.js'
import { thousandSons } from './thousand-sons.js'
import { tyranids } from './tyranids.js'

export const factionData = {
  'adeptus-custodes': adeptusCustodes,
  'adeptus-mechanicus': adeptusMechanicus,
  'dark-angels': darkAngels,
  necrons,
  orks,
  'space-marines': spaceMarines,
  'thousand-sons': thousandSons,
  tyranids,
}

export function getFaction(slug) {
  return factionData[slug] || null
}

// Registry of implemented faction rule datasets, keyed by slug. FactionView resolves
// `:slug` here; only factions present in this map have a rules page (others show
// "coming soon" on the /factions list). Add a faction by importing its data module here.
import { adeptaSororitas } from './adepta-sororitas.js'
import { adeptusCustodes } from './adeptus-custodes.js'
import { adeptusMechanicus } from './adeptus-mechanicus.js'
import { aeldari } from './aeldari.js'
import { astraMilitarum } from './astra-militarum.js'
import { blackTemplars } from './black-templars.js'
import { chaosDaemons } from './chaos-daemons.js'
import { chaosKnights } from './chaos-knights.js'
import { chaosSpaceMarines } from './chaos-space-marines.js'
import { darkAngels } from './dark-angels.js'
import { deathGuard } from './death-guard.js'
import { drukhari } from './drukhari.js'
import { emperorsChildren } from './emperors-children.js'
import { genestealerCults } from './genestealer-cults.js'
import { greyKnights } from './grey-knights.js'
import { imperialAgents } from './imperial-agents.js'
import { imperialKnights } from './imperial-knights.js'
import { leaguesOfVotann } from './leagues-of-votann.js'
import { necrons } from './necrons.js'
import { orks } from './orks.js'
import { spaceMarines } from './space-marines.js'
import { spaceWolves } from './space-wolves.js'
import { tauEmpire } from './tau-empire.js'
import { thousandSons } from './thousand-sons.js'
import { tyranids } from './tyranids.js'
import { worldEaters } from './world-eaters.js'

export const factionData = {
  'adepta-sororitas': adeptaSororitas,
  'adeptus-custodes': adeptusCustodes,
  'adeptus-mechanicus': adeptusMechanicus,
  aeldari,
  'astra-militarum': astraMilitarum,
  'black-templars': blackTemplars,
  'chaos-daemons': chaosDaemons,
  'chaos-knights': chaosKnights,
  'chaos-space-marines': chaosSpaceMarines,
  'dark-angels': darkAngels,
  'death-guard': deathGuard,
  drukhari,
  'emperors-children': emperorsChildren,
  'genestealer-cults': genestealerCults,
  'grey-knights': greyKnights,
  'imperial-agents': imperialAgents,
  'imperial-knights': imperialKnights,
  'leagues-of-votann': leaguesOfVotann,
  necrons,
  orks,
  'space-marines': spaceMarines,
  'space-wolves': spaceWolves,
  'tau-empire': tauEmpire,
  'thousand-sons': thousandSons,
  tyranids,
  'world-eaters': worldEaters,
}

export function getFaction(slug) {
  return factionData[slug] || null
}

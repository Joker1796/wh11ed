// Munitorum Field Manual v1.4 — points values for Warhammer 40,000 (11th ed).
// Source: https://mfm.warhammer-community.com/en (English-only). This barrel re-exports
// the per-faction modules in src/data/mfm/. Regenerate with `python3 scripts/scrape-mfm.py`
// (see that script for the page's data-reveal quirks).
//
// EN-only data: faction/unit names and points are language-agnostic, so `ru` reuses
// the same array (swap in a translated array later if needed).
//
// Shape per faction: { id, name, slug, sourceUrl, detachments[], units[], subfactions[] }.
//   detachment = { name, dp, forceDisposition, unique?, enhancements: [{ name, points }] }
//   unit       = { name, options: [{ models?, points, note? }] }
//     `models` omitted for single-model units; `note` carries rank/variant pricing
//     labels ('1st-2nd', '3rd+', …) or special unit compositions.
//   subfactions group units the page lists under their own heading (Aeldari →
//     Harlequins/Ynnari; the shared Space Marine roster; Imperial Agents allied costs).

import adeptaSororitas from './mfm/adepta-sororitas.js'
import adeptusCustodes from './mfm/adeptus-custodes.js'
import adeptusMechanicus from './mfm/adeptus-mechanicus.js'
import aeldari from './mfm/aeldari.js'
import astraMilitarum from './mfm/astra-militarum.js'
import blackTemplars from './mfm/black-templars.js'
import bloodAngels from './mfm/blood-angels.js'
import chaosDaemons from './mfm/chaos-daemons.js'
import chaosKnights from './mfm/chaos-knights.js'
import chaosSpaceMarines from './mfm/chaos-space-marines.js'
import chaosTitanLegions from './mfm/chaos-titan-legions.js'
import darkAngels from './mfm/dark-angels.js'
import deathGuard from './mfm/death-guard.js'
import deathwatch from './mfm/deathwatch.js'
import drukhari from './mfm/drukhari.js'
import emperorsChildren from './mfm/emperors-children.js'
import genestealerCults from './mfm/genestealer-cults.js'
import greyKnights from './mfm/grey-knights.js'
import imperialAgents from './mfm/imperial-agents.js'
import imperialKnights from './mfm/imperial-knights.js'
import leaguesOfVotann from './mfm/leagues-of-votann.js'
import necrons from './mfm/necrons.js'
import orks from './mfm/orks.js'
import spaceMarines from './mfm/space-marines.js'
import spaceWolves from './mfm/space-wolves.js'
import tauEmpire from './mfm/tau-empire.js'
import thousandSons from './mfm/thousand-sons.js'
import titanLegions from './mfm/titan-legions.js'
import tyranids from './mfm/tyranids.js'
import worldEaters from './mfm/world-eaters.js'

const en = [
  adeptaSororitas,
  adeptusCustodes,
  adeptusMechanicus,
  aeldari,
  astraMilitarum,
  blackTemplars,
  bloodAngels,
  chaosDaemons,
  chaosKnights,
  chaosSpaceMarines,
  chaosTitanLegions,
  darkAngels,
  deathGuard,
  deathwatch,
  drukhari,
  emperorsChildren,
  genestealerCults,
  greyKnights,
  imperialAgents,
  imperialKnights,
  leaguesOfVotann,
  necrons,
  orks,
  spaceMarines,
  spaceWolves,
  tauEmpire,
  thousandSons,
  titanLegions,
  tyranids,
  worldEaters,
]

export const mfmVersion = '1.4'
export const mfmFactions = { en, ru: en }

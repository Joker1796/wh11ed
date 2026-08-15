// Chaos Titan Legions — faction rules. Source: wh40k-appdata (../wh40k-appdata/factions/
// titanicus-traitoris.json, "Imperial Armour: Chaos Titan Legions").
//
// This is an ally-only army: 4 datasheets (see src/data/datasheets/chaos-titan-legions.js),
// no detachment of its own — a Chaos Titan is a Lord-of-War-style addition to any all-CHAOS
// army via the Titanic Support rule below. Same 3-card structure as titan-legions.js (see
// that file's note); appdata already gives this side's Towering Example / Titanic Support
// reworded for TITANICUS TRAITORIS / CHAOS, so no manual keyword substitution was needed.
const en = {
  slug: 'chaos-titan-legions',
  name: 'Chaos Titan Legions',

  armyRule: {
    id: 'towering-example',
    name: 'Towering Example',
    body: `When mustering your army, if your Army Faction is TITANICUS TRAITORIS, ignore the Select Detachment Rules step. In the Select Warlord step, select one TITANICUS TRAITORIS model from your army to be your WARLORD, even though that model does not have the CHARACTER keyword. Your army has the Take and Hold force disposition.

### Titanic Support
If every model in your army has the CHAOS keyword, you can include 1 TITANICUS TRAITORIS model in your army, even if it does not have the Faction keyword you selected in the Select Army Faction step.

### Titanicus Traitoris
You can use the ADEPTUS TITANICUS datasheets in this document to represent TITANICUS TRAITORIS models if you wish. To do so, on those datasheets and on this Army Rules card, replace all instances of the IMPERIUM keyword with CHAOS, and replace all instances of the ADEPTUS TITANICUS Faction keyword with TITANICUS TRAITORIS. For the purposes of points values, use those published for the equivalent ADEPTUS TITANICUS models.`,
  },

  detachments: [],

  datasheets: [],
}

export const chaosTitanLegions = { en, ru: en }

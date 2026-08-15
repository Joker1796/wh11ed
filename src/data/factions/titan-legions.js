// Titan Legions — faction rules. Source: wh40k-appdata (../wh40k-appdata/factions/
// adeptus-titanicus.json, "Imperial Armour: Titan Legions").
//
// This is an ally-only army: 4 datasheets (see src/data/datasheets/titan-legions.js), no
// detachment of its own — a Titan is a Lord-of-War-style addition to any all-IMPERIUM army
// via the Titanic Support rule below. appdata prints 3 short, independently named Army Rules
// cards rather than one; combined here into a single armyRule (Towering Example as the title,
// the other two as `###` subheadings) since the data model expects one armyRule per faction.
const en = {
  slug: 'titan-legions',
  name: 'Titan Legions',

  armyRule: {
    id: 'towering-example',
    name: 'Towering Example',
    body: `When mustering your army, if your Army Faction is ADEPTUS TITANICUS, ignore the Select Detachment Rules step. In the Select Warlord step, select one ADEPTUS TITANICUS model from your army to be your WARLORD, even though that model does not have the CHARACTER keyword. Your army has the Take and Hold force disposition.

### Titanic Support
If every model in your army has the IMPERIUM keyword, you can include 1 ADEPTUS TITANICUS model in your army, even if it does not have the Faction keyword you selected in the Select Army Faction step.

### Titanicus Traitoris
You can use the ADEPTUS TITANICUS datasheets in this document to represent TITANICUS TRAITORIS models if you wish. To do so, on those datasheets and on this Army Rules card, replace all instances of the Imperium keyword with CHAOS, and replace all instances of the ADEPTUS TITANICUS Faction keyword with TITANICUS TRAITORIS. For the purposes of points values, use those published for the equivalent ADEPTUS TITANICUS models.`,
  },

  detachments: [],

  datasheets: [],
}

export const titanLegions = { en, ru: en }

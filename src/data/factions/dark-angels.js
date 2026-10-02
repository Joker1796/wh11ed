// Dark Angels — faction rules. Rewritten end to end for Codex Supplement: Dark Angels (11th edition), which landed in
// app data 963 together with the new Codex: Space Marines and replaced every army rule and
// detachment the faction had. Transcribed by scripts/gen-faction-rules.mjs (re-run it rather
// than hand-porting); sources, highest wins: MFM > appdata.
//
//   wh40k-appdata (Codex Supplement: Dark Angels) → army rules + 3 detachments, prose through
//     scripts/lib/sync-common.mjs's markup converter.
//   MFM v1.5 (src/data/mfm/dark-angels.js) → enhancement points, detachment dp /
//     forceDispositions / unique tag.
//
// Oath of Moment is gone from every Space Marines army: the army rule is now Combat Doctrines
// (tracked per battle round by armyTrackers/space-marines.js), with the rest of the army rules
// folded in as `### ` subheadings — a faction page renders exactly one `armyRule`.
// GW ships no stratagem categories for these codices (every row is null), so sublabels read
// "<Detachment> – Stratagem". EN-first: `ru` reuses the same object; the RU overlay in
// ./ru/dark-angels.js merges by array index and was rebuilt for this codex in its own pass.

const en = {
  slug: "dark-angels",
  name: "Dark Angels",
  armyRule: {
    "id": "combat-doctrines",
    "name": "Combat Doctrines",
    "flavor": "",
    "body": "At the start of your Command phase, you can select one **[gloss:sm-combat-doctrine:combat doctrine]** listed below. If you do, that **combat doctrine** is active for friendly ADEPTUS ASTARTES units with this ability until the start of your next Command phase.\n\n### Assault Doctrine\nWhen this unit is selected to make an **[gloss:advance-move:advance move]**, that **advance move** does not prevent this unit from being **[gloss:eligible-to-charge:eligible to declare a charge]**.\n\n### Devastator Doctrine\nThis unit’s ranged attacks have [ASSAULT].\n\n### Tactical Doctrine\nWhen this unit is selected to make a **[gloss:fall-back-move:fall-back move]**, that **fall-back move** does not prevent this unit from being **[gloss:eligible-to-shoot:eligible to shoot]** and **[gloss:eligible-to-charge:eligible to declare a charge]**.\n\nUnless otherwise stated:\n▪ You can only select each **[gloss:sm-combat-doctrine:combat doctrine]** once per battle.\n▪ Only one **combat doctrine** can be active for each unit. If a rule makes a **combat doctrine** active for a unit, any **combat doctrine** previously active for that unit is no longer active for that unit.\n\n### Transhuman Strategist\nAt the start of the battle round, if a model with this ability is your WARLORD, gain 1CP.\n\n### The Ravenwing\nThe following friendly ADEPTUS ASTARTES units have RAVENWING:\n▪ MOUNTED units.\n▪ VEHICLE FLY units.\n\n### The Deathwing\nThe following friendly ADEPTUS ASTARTES units have DEATHWING:\n▪ TERMINATOR units.\n▪ BLADEGUARD ANCIENT/BLADEGUARD VETERAN SQUAD/STERNGUARD VETERAN SQUAD/VANGUARD VETERAN SQUAD WITH JUMP PACKS units.\n▪ LAND RAIDER/LAND RAIDER CRUSADER/LAND RAIDER REDEEMER/REPULSOR/REPULSOR EXECUTIONER units.\n▪ DREADNOUGHT units."
  },
  detachments: [
    {
      "id": "inner-circle-task-force",
      "name": "Inner Circle Task Force",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Priority Assets"],
      "rule": {
        "name": "Vowed Target",
        "flavor": "Whether its true significance is kept a secret or not, there is a singular prize here that the Inner Circle have come to either secure or destroy. They will pursue this strategic objective with cold ferocity.",
        "body": "In your Command phase, you can use this ability. If you do, select one **[gloss:objective:objective]**. That **objective** is your **vowed objective** until your next Command phase.\n▪ Friendly DEATHWING INFANTRY unit’s attacks that target an enemy unit within range of your **vowed objective** have +1 to **[gloss:wound-roll:wound rolls]**.\n\n**Restrictions:** Your army can include DARK ANGELS units, but it cannot include any ADEPTUS ASTARTES units drawn from any other Chapter."
      },
      "stratagems": [
        {
          "name": "Duty Unto Death",
          "sublabel": "Inner Circle Task Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "So driven by duty are the veterans of the Unforgiven that even death cannot keep them from it.",
          "when": "Fight phase, when an enemy unit targets a friendly DEATHWING unit.",
          "target": "That DEATHWING unit.",
          "effect": "When a model in your unit is **[gloss:destroyed:destroyed]**, if your unit has not been **[gloss:selected-to-fight:selected to fight]** this phase, roll one D6, with +1 to that roll if your unit is **[gloss:engaged:engaged]** with an enemy unit within range of your **vowed objective**:\n▪ On a 4+, do not remove that model from the battlefield. When your unit has fought, or at the end of the phase (whichever comes first), that model is removed from the battlefield.",
          "restrictions": ""
        },
        {
          "name": "Relic Teleportarium",
          "sublabel": "Inner Circle Task Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "The Deathwing employ ancient and incredibly powerful teleportariums, some older than the Great Crusade, to strike at their foes with unparalleled safety and accuracy.",
          "when": "Your Movement phase, when a friendly DEATHWING unit with the [core:Deep Strike] ability is selected to make an **[gloss:ingress-move:ingress move]**.",
          "target": "That DEATHWING unit.",
          "effect": "▪ Your unit can be set up more than 6” horizontally from all enemy units (instead of more than 8”).\n▪ Your unit is __not__ **[gloss:eligible-to-charge:eligible to declare a charge]** until the end of this turn.",
          "restrictions": ""
        },
        {
          "name": "Wrath of the Lion",
          "sublabel": "Inner Circle Task Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Channelling the strategic puissance and measured ferocity of their gene-sire, the veterans of the Unforgiven unleash a perfectly timed and utterly lethal storm of tightly controlled violence.",
          "when": "Your Charge phase, when a friendly DEATHWING unit ends a **[gloss:charge-move:charge move]**.",
          "target": "That DEATHWING unit.",
          "effect": "Select one enemy unit **[gloss:engaged:engaged]** with your unit. If you do, roll one D6 for each model in your unit **engaged** with that enemy unit:\n▪ For each 3+, that enemy unit suffers 1 **[gloss:mortal-wound:mortal wound]** (to a maximum of 6 **mortal wounds**).",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Singular Will",
          "points": 20,
          "flavor": "This warrior lets nothing stand in their way or slow their advance, closing swiftly and relentlessly with their quarry.",
          "body": "DEATHWING model only. When this unit is selected to make a **[gloss:consolidation:consolidation move]**, this unit can move up to D3+3”."
        },
        {
          "name": "Champion of the Deathwing",
          "points": 20,
          "flavor": "Even amongst the elite of the Unforgiven, this warrior is a paragon of duty and martial might.",
          "body": "DEATHWING model only. This unit’s attacks that target an enemy unit within range of your **vowed objective** have [SUSTAINED HITS 1]."
        }
      ]
    },
    {
      "id": "darkflight-pursuit",
      "name": "Darkflight Pursuit",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Reconnaissance"],
      "rule": {
        "name": "Black-winged Vigilance",
        "flavor": "The anti-grav skimmers and combat aircraft of the Ravenwing bristle not only with potent weapons but also with powerful augurs and trackers, whose sleepless machine spirits are as vigilant as the black-armoured battle-brothers.",
        "body": "Friendly RAVENWING FLY units' ranged attacks have [IGNORES COVER].\n\n**Restrictions:** Your army can include DARK ANGELS units, but it cannot include any ADEPTUS ASTARTES units drawn from any other Chapter.\n\nFriendly OUTRIDER SQUAD units have BATTLELINE."
      },
      "stratagems": [
        {
          "name": "Wings of Shadow",
          "sublabel": "Darkflight Pursuit – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Through subtle manoeuvring and empowered cameleoline armour, the swiftest of the Ravenwing evade attempts to bring their hunt to an end.",
          "when": "Your opponent's Shooting phase, when an enemy unit targets a friendly RAVENWING FLY/MOUNTED unit.",
          "target": "That RAVENWING FLY/MOUNTED unit.",
          "effect": "Your unit has [core:Stealth].",
          "restrictions": ""
        },
        {
          "name": "Skyborne Surveillance",
          "sublabel": "Darkflight Pursuit – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "The auspicators of the Ravenwing are sleepless, and from ideal hunting vantages, there is nowhere the foe can hide for long.",
          "when": "Your Shooting phase, when a friendly RAVENWING FLY unit has shot.",
          "target": "That RAVENWING FLY unit.",
          "effect": "**[gloss:visible:Visible]** enemy units within 6\" of your unit have +3\" **[gloss:detection-range:detection range]**.",
          "restrictions": ""
        },
        {
          "name": "We Are Vengeance",
          "sublabel": "Darkflight Pursuit – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "The Ravenwing's aerial assets are capable of swift and reactive manoeuvring to new firing positions, ensuring opportunities for rapid vengeance.",
          "when": "Your opponent's Shooting phase, when an enemy unit that targeted a friendly **[gloss:unengaged:unengaged]** RAVENWING FLY unit has shot.",
          "target": "That RAVENWING FLY unit.",
          "effect": "Your unit can make a **[gloss:normal-move:normal move]** of up to D3+3\".",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Nightforged Battery (Upgrade)",
          "points": 10,
          "flavor": "Use of these relic plasma storm batteries is granted only by dispensation of the Master of the Rock. They unleash devastating toroids of searing plasma, while their venting subsystems are known to be especially vigilant.",
          "body": "LANDSPEEDER VENGEANCE unit only. This unit can re-roll:\n▪ Rolls to determine the **[gloss:attack-dice:A]** of a weapon.\n▪ **[gloss:hazard-roll:Hazard rolls]**."
        },
        {
          "name": "Thundercowl Turbines (Upgrade)",
          "points": 15,
          "flavor": "These master-wrought engines from the Dark Ages of Technology churn the gloom emanated by the Ravenwing's reliquaries into a billowing cawl that shrouds their advance, allowing them to strike when the foe least expects.",
          "body": "RAVENWING FLY/MOUNTED unit only. In your first Movement phase, this unit can make an **[gloss:ingress-move:ingress move]**."
        }
      ]
    },
    {
      "id": "wrath-of-the-rock",
      "name": "Wrath of the Rock",
      "source": "codex",
      "dp": 2,
      "forceDispositions": ["Take and Hold"],
      "unique": "TERMINATOR",
      "rule": {
        "name": "Dutiful Tenacity",
        "flavor": "Even amongst the Adeptus Astartes, the battle‑brothers of the Dark Angels are renowned for their tenacity and resilience on the battlefield. When ordered to war, they are utterly relentless in pursuing their objectives, wading into fields of withering fire and shrugging off blows that would slay mortal warriors outright.",
        "body": "Attacks that target friendly ADEPTUS ASTARTES INFANTRY/MOUNTED units with a **[gloss:strength:S]** greater than that unit’s **[gloss:toughness:T]** have -1 to **[gloss:wound-roll:wound rolls]**.\n\n**Restrictions:** Your army can include DARK ANGELS units, but it cannot include any ADEPTUS ASTARTES units drawn from any other Chapter."
      },
      "stratagems": [
        {
          "name": "Knights of Iron",
          "sublabel": "Wrath of the Rock – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Atop their snarling mechanical steeds, the warriors of the Ravenwing surge through seemingly impassable terrain, smashing through rubble and ruin to unleash the wrath of the Unforgiven upon unsuspecting targets.",
          "when": "Your Movement/Charge phase, when a friendly RAVENWING unit is **[gloss:selected-to-move:selected to move]** or **[gloss:declare-charge:declares a charge]**.",
          "target": "That RAVENWING unit.",
          "effect": "Your unit has MOBILE.",
          "restrictions": ""
        },
        {
          "name": "Relics of the Dark Age",
          "sublabel": "Wrath of the Rock – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Amongst the many secrets hoarded by the Dark Angels are those technological in nature. The armouries of the Rock contain potent weapons unseen in the armouries of other Chapters.",
          "when": "Your Shooting phase, when a friendly ADEPTUS ASTARTES INFANTRY/MOUNTED unit is **[gloss:selected-to-shoot:selected to shoot]**.",
          "target": "That ADEPTUS ASTARTES INFANTRY/MOUNTED unit.",
          "effect": "Your unit’s ranged attacks have +2 **[gloss:strength:S]**.",
          "restrictions": ""
        },
        {
          "name": "Inescapable Justice",
          "sublabel": "Wrath of the Rock – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "The Dark Angels are relentless in the pursuit of their foes, striking with ruthless ferocity and precision to take the heads of those who have crossed the Chapter.",
          "when": "The Fight phase, when a friendly ADEPTUS ASTARTES unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Your unit's melee attacks have [PRECISION].",
          "restrictions": ""
        },
        {
          "name": "Lion's Will",
          "sublabel": "Wrath of the Rock – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Unflinching in their loyalty to Chapter and Primarch, Dark Angels battle‑brothers seize and hold their objectives with unrelenting determination and zealous fury.",
          "when": "Command phase.",
          "target": "One friendly ADEPTUS ASTARTES unit that is within range of an **[gloss:objective:objective]**.",
          "effect": "Your unit has +1 **[gloss:objective-control:OC]** until the end of the turn.",
          "restrictions": ""
        },
        {
          "name": "Tactical Mastery",
          "sublabel": "Wrath of the Rock – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "When the constituent elements of the Dark Angels fight as one, the enemy is often overwhelmed and torn apart by the Chapter’s tactical flexibility and mastery of rapid warfare.",
          "when": "Your Command phase.",
          "target": "One friendly DEATHWING/RAVENWING unit.",
          "effect": "Select one **[gloss:sm-combat-doctrine:combat doctrine]**. That **combat doctrine** is active for your unit until the start of your next Command phase.",
          "restrictions": ""
        },
        {
          "name": "In Sacrifice, Victory",
          "sublabel": "Wrath of the Rock – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Those inducted into the Dark Angels’ Inner Circle will gladly give their lives in pursuit of victory, and to see the Fallen brought to justice.",
          "when": "Any phase, when a friendly DEATHWING/RAVENWING unit within range of an **[gloss:objective:objective]** is **[gloss:destroyed:destroyed]**.",
          "target": "That DEATHWING/RAVENWING unit. You can target that unit with this **[gloss:stratagem:stratagem]** even though it is **[gloss:destroyed:destroyed]**.",
          "effect": "Select one **[gloss:objective:objective]**:\n▪ That no enemy units (excluding AIRCRAFT units) are within range of.\n▪ That your unit was controlling at the end of the previous phase.\n\nThat **objective** is **[gloss:secured-objective:secured]**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Tempered in Battle (Aura)",
          "points": 10,
          "flavor": "A veteran of the Inner Circle, this warrior inspires those around them to hold the line amidst the heat and chaos of battle.",
          "body": "ADEPTUS ASTARTES model only. Friendly ADEPTUS ASTARTES units within 6” of this model can re-roll **[gloss:leadership-roll:leadership rolls]**."
        },
        {
          "name": "Deathwing Assault",
          "points": 15,
          "flavor": "A veteran inductee of the Inner Circle, this champion has served amongst the Deathwing for centuries and become an unmatched master of teleportarium insertions.",
          "body": "DEATHWING model with the [core:Deep Strike] ability only. In your first Movement phase, this unit can make an **[gloss:ingress-move:ingress move]**."
        },
        {
          "name": "Ancient Weapons",
          "points": 20,
          "flavor": "The vaults of the Dark Angels contain many relics from Humanity’s distant past. This soldier has been granted the honour of bearing such a weapon to battle.",
          "body": "ADEPTUS ASTARTES model only. This model’s melee attacks:\n▪ Have +2 **[gloss:strength:S]**.\n▪ Have +1 **[gloss:armour-penetration:AP]**."
        },
        {
          "name": "Lord of the Ravenwing",
          "points": 15,
          "flavor": "This commander has mastered the art of cavalry combat, instinctively noticing the opportune position to strike and navigating the chaos of battle with preternatural precision.",
          "body": "RAVENWING model only. This unit can re-roll **[gloss:charge-roll:charge rolls]**."
        }
      ]
    }
  ],
  datasheets: [],
}

export const darkAngels = { en, ru: en }

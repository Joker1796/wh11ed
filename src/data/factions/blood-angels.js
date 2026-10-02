// Blood Angels — faction rules. Rewritten end to end for Codex Supplement: Blood Angels (11th edition), which landed in
// app data 963 together with the new Codex: Space Marines and replaced every army rule and
// detachment the faction had. Transcribed by scripts/gen-faction-rules.mjs (re-run it rather
// than hand-porting); sources, highest wins: MFM > appdata.
//
//   wh40k-appdata (Codex Supplement: Blood Angels) → army rules + 3 detachments, prose through
//     scripts/lib/sync-common.mjs's markup converter.
//   MFM v1.5 (src/data/mfm/blood-angels.js) → enhancement points, detachment dp /
//     forceDispositions / unique tag.
//
// Oath of Moment is gone from every Space Marines army: the army rule is now Combat Doctrines
// (tracked per battle round by armyTrackers/space-marines.js), with the rest of the army rules
// folded in as `### ` subheadings — a faction page renders exactly one `armyRule`.
// GW ships no stratagem categories for these codices (every row is null), so sublabels read
// "<Detachment> – Stratagem". EN-first: `ru` reuses the same object; the RU overlay in
// ./ru/blood-angels.js merges by array index and was rebuilt for this codex in its own pass.

const en = {
  slug: "blood-angels",
  name: "Blood Angels",
  armyRule: {
    "id": "combat-doctrines",
    "name": "Combat Doctrines",
    "flavor": "",
    "body": "At the start of your Command phase, you can select one **[gloss:sm-combat-doctrine:combat doctrine]** listed below. If you do, that **combat doctrine** is active for friendly ADEPTUS ASTARTES units with this ability until the start of your next Command phase.\n\n### Assault Doctrine\nWhen this unit is selected to make an **[gloss:advance-move:advance move]**, that **advance move** does not prevent this unit from being **[gloss:eligible-to-charge:eligible to declare a charge]**.\n\n### Devastator Doctrine\nThis unit’s ranged attacks have [ASSAULT].\n\n### Tactical Doctrine\nWhen this unit is selected to make a **[gloss:fall-back-move:fall-back move]**, that **fall-back move** does not prevent this unit from being **[gloss:eligible-to-shoot:eligible to shoot]** and **[gloss:eligible-to-charge:eligible to declare a charge]**.\n\nUnless otherwise stated:\n▪ You can only select each **[gloss:sm-combat-doctrine:combat doctrine]** once per battle.\n▪ Only one **combat doctrine** can be active for each unit. If a rule makes a **combat doctrine** active for a unit, any **combat doctrine** previously active for that unit is no longer active for that unit.\n\n### Transhuman Strategist\nAt the start of the battle round, if a model with this ability is your WARLORD, gain 1**[gloss:command-points:CP]**."
  },
  detachments: [
    {
      "id": "wrath-of-the-doomed",
      "name": "Wrath of the Doomed",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Purge the Foe"],
      "rule": {
        "name": "Sanguinius' Fury",
        "flavor": "Swept up in visions of the Primarch’s blood-drenched final hours, the Lost throw themselves upon the foe, channelling the Great Angel’s fury and striving their utmost to emulate his mastery of close-quarters combat.",
        "body": "Friendly DEATH COMPANY units have the following:\n▪ At the start of each phase, the **[gloss:sm-combat-doctrine:assault doctrine]** is active for this unit.\n▪ The **devastator/tactical doctrine** __cannot__ be active for this unit.\n\nThis means that, regardless of any other rules, DEATH COMPANY units can never have an active doctrine other than the **assault doctrine**.\n\n**Restrictions:** Your army can include BLOOD ANGELS units, but it cannot include any ADEPTUS ASTARTES units drawn from any other Chapter."
      },
      "stratagems": [
        {
          "name": "No Barrier to Retribution",
          "sublabel": "Wrath of the Doomed – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Knowing in what remains of his mind that his is a sorrow-filled mission of galactic consequence, this ancient interred warrior permits nothing to stand in his way.",
          "when": "Your Movement or your Charge phase, when a friendly DEATH COMPANY DREADNOUGHT unit is selected to make a **[gloss:normal-move:normal]/[gloss:advance:advance]/[gloss:charge-move:charge move]**.",
          "target": "That DEATH COMPANY DREADNOUGHT unit.",
          "effect": "Your unit has MOBILE.",
          "restrictions": ""
        },
        {
          "name": "Rage-fuelled Response",
          "sublabel": "Wrath of the Doomed – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "They may no longer recognise the foe before them, but the Lost Brethren are sane enough to identify an attack and capable of responding with a violent surge and a howl of wrath.",
          "when": "Your opponent's Shooting phase, when an enemy unit that targeted a friendly **[gloss:unengaged:unengaged]** DEATH COMPANY unit has shot.",
          "target": "That DEATH COMPANY unit.",
          "effect": "Your unit can make a **[gloss:surge-move:surge move]** of up to D6\".",
          "restrictions": ""
        },
        {
          "name": "Death Begets Vengeance",
          "sublabel": "Wrath of the Doomed – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "With their perceptions twisted, the battle-brothers of the Death Company transmute loss into the worst of ancient betrayals and seek only to sever such treachery from existence.",
          "when": "Any phase, when a friendly DEATH COMPANY unit is **[gloss:destroyed:destroyed]** by an enemy unit.",
          "target": "That enemy unit.",
          "effect": "That enemy unit is **hated** until the end of the battle:\n▪ While a unit is **hated**, friendly DEATH COMPANY units' attacks that target that unit have +1 to **[gloss:wound-roll:wound rolls]**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "On the Archtraitor's Bridge",
          "points": 20,
          "flavor": "Lost to a memory shard of the Primarch, in this warrior's mind, he has entered the Archtraitor's sanctum, and all that stands between him and Horus is a host of massing traitors.",
          "body": "DEATH COMPANY model only. This model's melee attacks have +2 **[gloss:attack-dice:A]**."
        },
        {
          "name": "Instinctive Interception",
          "points": 10,
          "flavor": "Proudly is Sanguinius remembered for his rapid intercession in the protection of his gene-sons. Driven on by death visions, this lost warrior is a tragic monument to such glory.",
          "body": "DEATH COMPANY model only. When you target this unit with the **[gloss:heroic-intervention:Heroic Intervention stratagem]**, that use is -1 **[gloss:command-points:CP]**."
        }
      ]
    },
    {
      "id": "encarmine-speartip",
      "name": "Encarmine Speartip",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Disruption"],
      "rule": {
        "name": "Wrath of Angels",
        "flavor": "Few living warriors embody the ideal of the Emperor's wrathful angels more than the Sanguinary Guard, for they appear without warning to wreak death and destruction before surging on to the next foe with shocking speed.",
        "body": "The **[gloss:sm-combat-doctrine:tactical doctrine]** is active for SANGUINARY GUARD units __in addition__ to any other **combat doctrine**.\n\n**Restrictions:** Your army can include BLOOD ANGELS units, but it cannot include any ADEPTUS ASTARTES units drawn from any other Chapter."
      },
      "stratagems": [
        {
          "name": "Judgement of the Golden Host",
          "sublabel": "Encarmine Speartip – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "The meteoric impact of the Sanguinary Guard is an unavoidable judgement on those who have incurred the Chapter's wrath.",
          "when": "Your Charge phase, when a friendly SANGUINARY GUARD unit form your army ends a **[gloss:charge-move:charge move]**.",
          "target": "That SANGUINARY GUARD unit.",
          "effect": "Select one enemy unit **[gloss:engaged:engaged]** with your unit. Roll one D6 for each model in your unit **engaged** with that enemy unit:\n▪ For each 3+, that enemy unit suffers 1 **[gloss:mortal-wound:mortal wound]**.",
          "restrictions": ""
        },
        {
          "name": "Inexorable Valour",
          "sublabel": "Encarmine Speartip – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Ever reaching for the heights of exemplary valour instilled in their forebears by Sanguinius, the golden host seize every opportunity to claim positions from which to strike anew.",
          "when": "Your opponent's Movement phase, when an enemy unit that was **[gloss:engaged:engaged]** with a friendly SANGUINARY GUARD unit ends a **[gloss:fall-back-move:fall-back move]**, if that SANGUINARY GUARD unit is **[gloss:unengaged:unengaged]**.",
          "target": "That SANGUINARY GUARD unit.",
          "effect": "Your unit can make a **[gloss:normal-move:normal move]** of up to D3+3\".",
          "restrictions": ""
        },
        {
          "name": "Blinding Blurs of Vengeance",
          "sublabel": "Encarmine Speartip – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "When they power forward in rapid leaps, the glare emitted by their jump packs' nacelles reflecting from the mirrored gleam of their armour, the Sanguinary Guard seem to glow with a blinding radiance few can look upon.",
          "when": "Your opponent's Shooting phase, when an enemy unit targets a friendly SANGUINARY GUARD unit.",
          "target": "That SANGUINARY GUARD unit.",
          "effect": "Your unit has:\n▪ [core:Stealth].\n▪ -3\" **[gloss:detection-range:detection range]**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Angelic Executioner",
          "points": 20,
          "flavor": "This deadly duellist leads his battle-brothers in masterful strikes capable of carving through their armoured or swarming foes with breathtaking fluidity.",
          "body": "ADEPTUS ASTARTES JUMP PACK model only. When this unit is **[gloss:selected-to-fight:selected to fight]**, this unit's melee attacks have:\n▪ [LETHAL HITS].\n▪ __Or:__ [SUSTAINED HITS 1]"
        },
        {
          "name": "Shadow of Abomination",
          "points": 15,
          "flavor": "Granted a glimmer of foresight by his genetic inheritance, this Son of Sanguinius has identified a foe whose future is drenched in the blood of the Imperium. Such an enemy cannot be allowed to live.",
          "body": "ADEPTUS ASTARTES JUMP PACK model only. (once per battle, per army) When this unit is **[gloss:selected-to-fight:selected to fight]** you can use this ability. If you do, this model's melee attacks have +1 **[gloss:damage-roll:D]**."
        }
      ]
    },
    {
      "id": "angelic-inheritors",
      "name": "Angelic Inheritors",
      "source": "codex",
      "dp": 3,
      "forceDispositions": ["Priority Assets", "Purge the Foe"],
      "rule": {
        "name": "Legacy of the Angel",
        "flavor": "Never do the Blood Angels stand taller or strive harder than when faced with seemingly impossible odds. At such times, the Sons of Sanguinius delve deep into their souls for preternatural reserves of determination, fury and focus. Sometimes, they even touch upon the uncertain gift of prophecy that was said to be their gene‑sire’s boon and his curse.",
        "body": "Friendly BLOOD ANGELS CHARACTER units:\n▪ Can re-roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ Can re-roll **[gloss:wound-roll:wound rolls]** of 1.\n\n**Restrictions:** Your army can include BLOOD ANGELS units, but it cannot include any ADEPTUS ASTARTES units drawn from any other Chapter."
      },
      "stratagems": [
        {
          "name": "Focused Fury",
          "sublabel": "Angelic Inheritors – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Keeping the beast within under tight control, the Blood Angels nonetheless tap into that inner rage and shackle it to their precisely aimed blows.",
          "when": "Fight phase, when a friendly ADEPTUS ASTARTES unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Your unit’s melee attacks:\n▪ Have [LETHAL HITS].\n▪ __Or:__ If your unit is a CHARACTER unit, have [LETHAL HITS], [LANCE].",
          "restrictions": ""
        },
        {
          "name": "Instant of Grace",
          "sublabel": "Angelic Inheritors – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "In this most desperate moment of need, a lone battle‑brother rises to the challenge as a true inheritor of the Angel’s legacy.",
          "when": "Your Command phase.",
          "target": "One friendly ADEPTUS ASTARTES INFANTRY unit.",
          "effect": "Your unit has CHARACTER until the start of your next Command phase.",
          "restrictions": ""
        },
        {
          "name": "Unto the Burning Skies",
          "sublabel": "Angelic Inheritors – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "In the face of encroaching doom, as the world seems to burn around them, these scions of Sanguinius leap high into the tormented heavens, ready to strike down with vengeful fury upon the enemy teeming below.",
          "when": "End of your opponent’s Fight phase.",
          "target": "One friendly THE SANGUINOR/**[gloss:unengaged:unengaged]** ADEPTUS ASTARTES JUMP PACK unit.",
          "effect": "Place your unit in **[gloss:strategic-reserves:strategic reserves]**.",
          "restrictions": ""
        },
        {
          "name": "In the Shadow of Great Wings",
          "sublabel": "Angelic Inheritors – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "The enemy are engulfed in a soul‑deep shadow for just a moment, as though mighty wings have spread above them and marred their vision with occluding darkness.",
          "when": "Your opponent's Shooting phase, when an enemy unit targets a friendly ADEPTUS ASTARTES CHARACTER unit.",
          "target": "That ADEPTUS ASTARTES CHARACTER unit.",
          "effect": "Your unit has:\n▪ [core:Stealth].\n▪ -3\" **[gloss:detection-range:detection range]**.",
          "restrictions": ""
        },
        {
          "name": "Strike Now for Glory",
          "sublabel": "Angelic Inheritors – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Knowing instinctively that the pivotal moment has arrived, these battle‑brothers aim and hammer their foes with unrelenting volleys.",
          "when": "Your Shooting phase when a friendly ADEPTUS ASTARTES unit is selected to attack.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Your unit’s ranged attacks have [SUSTAINED HITS 1].",
          "restrictions": ""
        },
        {
          "name": "Measured Strategist",
          "sublabel": "Angelic Inheritors – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Stern and level-headed, this Blood Angels commander is a beacon of composure amidst the tempest of his brothers’ fury, providing much-needed tactical guidance for his impetuous battle-brothers.",
          "when": "Your Command phase.",
          "target": "One friendly ADEPTUS ASTARTES CHARACTER unit.",
          "effect": "Select one **[gloss:sm-combat-doctrine:combat doctrine]**. That **combat doctrine** is active for your unit until the start of your next Command phase.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Prescient Flash",
          "points": 25,
          "flavor": "A flash of foresight and clarity sings through this warrior’s blood and guides his steps into battle.",
          "body": "ADEPTUS ASTARTES model only. This unit has [core:Scouts 6”]."
        },
        {
          "name": "Blazing Icon",
          "points": 20,
          "flavor": "What was before merely a decorative blood drop pendant now shines with a seemingly miraculous light as bright as any star. The foe are forced to avert their gaze from its wrathful magnificence.",
          "body": "ADEPTUS ASTARTES model only. Enemy units cannot target this unit with **[gloss:snap-shooting:snap shooting]** attacks."
        },
        {
          "name": "Ordained Sacrifice",
          "points": 25,
          "flavor": "Knowing only too well the desperate and vital nature of the battle before him, this scion of Sanguinius echoes his Primarch’s resolute determination to fight on even beyond what seems the doors of certain death.",
          "body": "ADEPTUS ASTARTES model only. (Once per battle, per army) At the end of a phase in which this model is **[gloss:destroyed:destroyed]**, roll one D6:\n▪ On a 2+, set this model back up on the battlefield as close as possible to where it was **destroyed**, **[gloss:unengaged:unengaged]**, with 3 wounds remaining."
        },
        {
          "name": "Unto Death",
          "points": 15,
          "flavor": "Just as his Primarch before him, this warrior has foreseen his impending doom and goes towards it regardless, desperate to land a telling blow upon the foe before death claims him.",
          "body": "ADEPTUS ASTARTES model only. (Once per battle, per army) In your Command phase you can use this ability. If you do, until the end of the turn this unit can:\n▪ Re-roll **[gloss:advance-roll:advance rolls]**.\n▪ Re-roll **[gloss:charge-roll:charge rolls]**."
        }
      ]
    }
  ],
  datasheets: [],
}

export const bloodAngels = { en, ru: en }

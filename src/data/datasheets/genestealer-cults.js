// Genestealer Cults — datasheets. Unit roster and points from src/data/mfm/genestealer-cults.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
export default [
  {
    "id": "aberrants",
    "name": "Aberrants",
    "points": [
      {
        "models": 5,
        "points": 140,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 280,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 150,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 290,
        "note": "3rd+"
      }
    ],
    "flavor": "No one truly knows what causes Aberrants to spring up amidst the brood cycle, yet the uses of these lumpen gene-deviants are obvious. Possessed of immense strength and resilience coupled with simplistic loyalty to the cult, they are hurled into battle as line breakers or massed as hulking, expendable bodyguards.",
    "profiles": [
      {
        "name": "Aberrants",
        "m": "6\"",
        "t": "6",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "melee": [
      {
        "name": "Aberrant weapons",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Feel No Pain 5+",
    "faction": "Cult Ambush",
    "abilities": [
      {
        "name": "Hulking Bodyguards",
        "text": "While a Character is leading this unit, each time an attack targets this unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of this unit, subtract 1 from the Wound roll."
      }
    ],
    "composition": [
      "1 Aberrant Hypermorph",
      "4-9 Aberrants"
    ],
    "loadout": "**Every model is equipped with:** Aberrant weapons.",
    "keywords": [
      "Aberrants",
      "Infantry",
      "Great Devourer"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "abominant",
    "name": "Abominant",
    "points": [
      {
        "models": 1,
        "points": 85,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 95,
        "note": "3rd+"
      }
    ],
    "flavor": "Born from the sting of a mindwyrm familiar, the Abominant is an Aberrant tainted with the Patriarch’s own gene-mass. This transforms the beast into a mountain of mutated chitin and muscle that can regenerate as swiftly as its foes can harm it, and whose raw might is a lethal battlefield asset.",
    "profiles": [
      {
        "name": "Abominant",
        "m": "6\"",
        "t": "6",
        "sv": "5+",
        "w": "5",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "melee": [
      {
        "name": "Power sledgehammer",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "D6+1"
      }
    ],
    "core": "Deep Strike, Feel No Pain 5+, Leader",
    "abilities": [
      {
        "name": "The Chosen One",
        "text": "While this model is leading a unit, each time a model in that unit is destroyed by a melee attack, if that model has not fought this phase, roll one D6. On a 4+, do not remove the destroyed model from play; it can fight after the attacking model’s unit has finished making its attacks, and is then removed from play."
      },
      {
        "name": "Regenerating Gene-mass",
        "text": "The first time this model is destroyed, roll one D6 at the end of the phase. On a 2+, set this model back up on the battlefield as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with its full wounds remaining."
      }
    ],
    "composition": [
      "1 Abominant"
    ],
    "loadout": "**This model is equipped with:** power sledgehammer.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Aberrants"
      ]
    },
    "keywords": [
      "Character",
      "Infantry",
      "Abominant",
      "Great Devourer"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "achilles-ridgerunners",
    "name": "Achilles Ridgerunners",
    "points": [
      {
        "models": 1,
        "points": 95,
        "note": "1st-2nd"
      },
      {
        "models": 2,
        "points": 160,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 105,
        "note": "3rd+"
      },
      {
        "models": 2,
        "points": 170,
        "note": "3rd+"
      }
    ],
    "flavor": "The operators of these lightweight but rugged scout vehicles help to coordinate lethal armoured ambushes that eliminate isolated foes or sever communication and supply lines. They can mount a versatile range of heavy weapons, and their speed and manoeuvrability enable them to skirt enemy ranks before unleashing their payloads at a more vulnerable quarter.",
    "profiles": [
      {
        "name": "Achilles Ridgerunners",
        "m": "12\"",
        "t": "7",
        "sv": "3+",
        "w": "8",
        "ld": "7+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Achilles missile launcher",
        "tags": [],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Heavy mining laser",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Heavy mortar",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "D6+3",
        "bs": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Twin heavy stubber",
        "tags": [
          "TWIN-LINKED",
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured hull",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1, Scouts 9\"",
    "abilities": [
      {
        "name": "Crossfire",
        "text": "In your Shooting phase, after this unit has shot, select one enemy unit hit by one or more of those attacks. Until the end of the turn, each time a friendly GENESTEALER CULTS unit makes an attack that targets that enemy unit, improve the Armour Penetration characteristic of that attack by 1. The same enemy unit can only be affected by this ability once per turn."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Flare Launcher",
        "text": "The bearer’s unit has the SMOKE keyword and you can target it with the Smokescreen Stratagem for 0CP."
      },
      {
        "name": "Spotter",
        "text": "The bearer’s ranged weapons have a Ballistic Skill characteristic of 3+."
      },
      {
        "name": "Survey Augur",
        "text": "Each time the bearer’s unit has shot, select one enemy unit that was hit by one or more attacks made by the bearer this phase. Until the end of the phase, each time a friendly GENESTEALER CULTS model makes an attack against that unit, that attack has the [IGNORES COVER] ability."
      }
    ],
    "composition": [
      "1-2 Achilles Ridgerunners"
    ],
    "loadout": "**Every model is equipped with:** heavy mining laser; twin heavy stubbers; armoured hull; flare launcher.",
    "options": [
      "Any number of models can each have their heavy mining laser replaced with one of the following:\n▪ 1 achilles missile launcher\n▪ 1 heavy mortar",
      "Any number of models can each have their flare launcher replaced with one of the following:\n▪ 1 spotter\n▪ 1 survey augur"
    ],
    "keywords": [
      "Vehicle",
      "Achilles Ridgerunners",
      "Great Devourer"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "acolyte-hybrids-with-autopistols",
    "name": "Acolyte Hybrids With Autopistols",
    "points": [
      {
        "models": 5,
        "points": 70
      },
      {
        "models": 10,
        "points": 130
      }
    ],
    "flavor": "Acolyte Hybrids comprise the earliest generations of a cult’s brood cycles, and they are monstrous in body and mind. Some equip themselves with an array of automatic pistols and repurposed heavy tools, applying industrialised might to the battlefield in acts of sabotage or resource acquisition.",
    "profiles": [
      {
        "name": "Acolyte Hybrids",
        "m": "6\"",
        "t": "4",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Autopistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Cult claws and knife",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Heavy mining tool",
        "tags": [
          "ANTI-VEHICLE 4+"
        ],
        "a": "2",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Leader’s bio-weapons",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Cult Ambush",
    "abilities": [
      {
        "name": "Claimed for the Cult",
        "text": "At the start of your Command phase, roll one D6 for each objective marker you control that has one or more units from your army with this ability within range of it. If one or more of the results is a 4+, you gain 1CP."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Cult Icon",
        "text": "In your Command phase, you can return up to D3 destroyed models to the bearer’s unit. If the bearer’s unit is within range of an objective marker you control, you can return up to 3 destroyed models to that unit instead. This ability cannot be used to return destroyed Character models in Attached units and any [ONE SHOT] weapons equipped by returned models that were shot before they were destroyed are still considered to have been shot."
      }
    ],
    "composition": [
      "1 Acolyte Leader",
      "4-9 Acolyte Hybrids"
    ],
    "loadout": "**Every model is equipped with:** autopistol; cult claws and knife.",
    "options": [
      "One Acolyte Hybrid’s autopistol can be replaced with 1 cult icon.",
      "For every 5 models in this unit, up to 3 Acolyte Hybrids can each have their autopistol and cult claws and knife replaced with 1 heavy mining tool.",
      "The Acolyte Leader’s cult claws and knife can be replaced with 1 Leader's bio-weapons."
    ],
    "keywords": [
      "Grenades",
      "Great Devourer",
      "Acolyte Hybrids",
      "Acolyte Hybrids With Autopistols",
      "Infantry",
      "Battleline"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "acolyte-hybrids-with-hand-flamers",
    "name": "Acolyte Hybrids With Hand Flamers",
    "points": [
      {
        "models": 5,
        "points": 75
      },
      {
        "models": 10,
        "points": 140
      }
    ],
    "flavor": "Equipped with hand flamers and using their hulking strength andxenos dexterity to wield pilfered explosive charges, Acolyte Hybrids excel in bold missions of arson and ruination. Denying the oppressors any opportunity of a foothold, their destructive acts are often so wholesale that few witnesses survive their operations.",
    "profiles": [
      {
        "name": "Acolyte Hybrids With Hand Flamers",
        "m": "6\"",
        "t": "4",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Demolition charges",
        "tags": [
          "ASSAULT",
          "BLAST",
          "HAZARDOUS",
          "ONE SHOT"
        ],
        "range": "8\"",
        "a": "D6",
        "bs": "5+",
        "s": "9",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Hand flamer",
        "tags": [
          "IGNORES COVER",
          "PISTOL",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Cult claws and knife",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Leader’s bio-weapons",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Cult Ambush",
    "abilities": [
      {
        "name": "Industrialised Destruction",
        "text": "Each time a model in this unit makes an attack, re-roll a Wound roll of 1. If the target of that attack is an enemy unit within range of an objective marker, you can re-roll the Wound roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Cult Icon",
        "text": "In your Command phase, you can return up to D3 destroyed models to the bearer’s unit. If the bearer’s unit is within range of an objective marker you control, you can return up to 3 destroyed models to that unit instead. This ability cannot be used to return destroyed Character models in Attached units and any [ONE SHOT] weapons equipped by returned models that were shot before they were destroyed are still considered to have been shot."
      }
    ],
    "composition": [
      "1 Acolyte Leader",
      "4-9 Acolyte Hybrids"
    ],
    "loadout": "**Every model is equipped with:** hand flamer; cult claws and knife.",
    "options": [
      "One Acolyte Hybrid’s hand flamer can be replaced with 1 cult icon.",
      "For every 5 models in this unit, up to 2 Acolyte Hybrids can each have their hand flamer replaced with 1 demolition charges",
      "The Acolyte Leader’s cult claws and knife can be replaced with 1 Leader’s bio-weapons."
    ],
    "keywords": [
      "Acolyte Hybrids With Hand Flamers",
      "Grenades",
      "Battleline",
      "Infantry",
      "Acolyte Hybrids",
      "Great Devourer"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "acolyte-iconward",
    "name": "Acolyte Iconward",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "flavor": "It is a great honour to bear the cult’s sigil aloft, out in the open for all to see. These banners are hung with pseudo-sacred artefacts, some stemming from the secretions or body of the Patriarch itself. The effect of the Acolyte Iconward’s presence upon nearby cult warriors is electrifying, driving them to new heights of violence.",
    "profiles": [
      {
        "name": "Acolyte Iconward",
        "m": "6\"",
        "t": "4",
        "sv": "5+",
        "w": "3",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Autopistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Cult claws",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Leader, Scouts 6\"",
    "abilities": [
      {
        "name": "Nexus of Devotion",
        "text": "While this model is leading a unit, models in that unit have the Feel No Pain 5+ ability. If that unit has the Hybrid Metamorphs keyword, models in that unit have the Feel No Pain 4+ ability instead."
      },
      {
        "name": "Summon the Cult",
        "text": "Once per battle, when you have to remove a Cult Ambush marker because your opponent has moved too close to it, if one or more models from your army with this ability are on the battlefield, you can use this ability. If you do, instead of removing that marker, you can place it anywhere on the battlefield that is within 12\" of a model from your army with this ability and more than 8\" horizontally away from all enemy units (if this is not possible, this ability is not considered to have been used and that marker is removed as normal)."
      }
    ],
    "composition": [
      "1 Acolyte Iconward"
    ],
    "loadout": "**This model is equipped with:** autopistol; cult claws.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Acolyte Hybrids With Hand Flamers",
        "Acolyte Hybrids With Autopistols",
        "Neophyte Hybrids",
        "Hybrid Metamorphs"
      ]
    },
    "keywords": [
      "Acolyte Iconward",
      "Great Devourer",
      "Character",
      "Infantry",
      "Grenades"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "atalan-jackals",
    "name": "Atalan Jackals",
    "points": [
      {
        "models": 5,
        "points": 85,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 150,
        "note": "1st-2nd"
      },
      {
        "models": 9,
        "points": 160,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 95,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 160,
        "note": "3rd+"
      },
      {
        "models": 9,
        "points": 170,
        "note": "3rd+"
      }
    ],
    "flavor": "Atalan Jackals share a mental link that allows them to coordinate in hunting packs and ride in tight formations at high speeds with no risk of mishap. They harass the foe with hit-and-run strikes, their Wolfquads unleashing heavy firepower to augment the guns, bludgeons and mining charges of their packmates.",
    "profiles": [
      {
        "name": "ATALAN JACKAL",
        "m": "12\"",
        "t": "4",
        "sv": "5+",
        "w": "2",
        "ld": "7+",
        "oc": "1",
        "baseSize": "60x35.5mm"
      },
      {
        "name": "ATALAN WOLFQUAD",
        "m": "12\"",
        "t": "4",
        "sv": "5+",
        "w": "4",
        "ld": "7+",
        "oc": "1",
        "baseSize": "60mm"
      }
    ],
    "ranged": [
      {
        "name": "Atalan incinerator",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Atalan small arms",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "2",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Grenade launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Grenade launcher – krak",
        "tags": [],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "D3"
      },
      {
        "name": "Heavy stubber",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Mining laser",
        "tags": [],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      }
    ],
    "melee": [
      {
        "name": "Atalan power weapon",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Scouts 9\", Stealth",
    "faction": "Cult Ambush",
    "abilities": [
      {
        "name": "Outrider Gangs",
        "text": "Each time you use the Cult Ambush ability to set this unit back up on the battlefield, in addition to the normal rules, all of its models must be set up wholly within 9\" of a battlefield edge and at least one of its models must be touching one of your Cult Ambush markers (that marker is then removed from the battlefield). If this cannot be done, this unit cannot be set back up."
      },
      {
        "name": "Demolition Run",
        "text": "Once per turn, in your Movement phase, when this unit ends a Normal, Advance or Fall Back move, you can select one enemy unit within 6\" of and visible to this unit and roll one D6 for each ATALAN JACKALS model in this unit: for each 4+, that enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds)."
      }
    ],
    "composition": [
      "4-8 Atalan Jackals",
      "1-2 Atalan Wolfquads*"
    ],
    "loadout": "* This unit can only contain 2 Atalan Wolfquads if it also contains 8 Atalan Jackals.\n\n**Every Atalan Jackal is equipped with:** Atalan small arms; close combat weapon.\n\n**Every Atalan Wolfquad is equipped with:** Atalan small arms; heavy stubber; close combat weapon.",
    "options": [
      "For every 4 Atalan Jackals in this unit, up to 2 Atalan Jackals' close combat weapons can each be replaced with 1 Atalan power weapon.",
      "For every 4 Atalan Jackals in this unit, 1 Atalan Jackal's Atalan small arms can be replaced with 1 grenade launcher.",
      "Any number of Atalan Wolfquads can each have their heavy stubber replaced with one of the following:\n▪ 1 Atalan incinerator\n▪ 1 mining laser"
    ],
    "keywords": [
      "Atalan Jackals",
      "Great Devourer",
      "Grenades",
      "Mounted"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ]
  },
  {
    "id": "benefictus",
    "name": "Benefictus",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "A Benefictus uses the swollen mass of their brain to focus the will of the Broodmind. They unleash it in a lancing beam of incredible power that has the potential to carve through battle tank armour. Where the psionic strike hits, intense shock waves of nauseating alien horror spread out, leaving survivors vulnerable to lurking broodkin.",
    "profiles": [
      {
        "name": "Benefictus",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Psionic Cascade - witchfire",
        "tags": [
          "IGNORES COVER",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Psionic Cascade - focused witchfire",
        "tags": [
          "HAZARDOUS",
          "IGNORES COVER",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Leader",
    "abilities": [
      {
        "name": "Bio-horror Disruption (Psychic)",
        "text": "While this model is leading a unit, ranged weapons equipped by models in that unit have the [LETHAL HITS] ability."
      },
      {
        "name": "Psionic Shield (Psychic)",
        "text": "Once per battle, at the start of any phase, this model can use this ability. If it does, until the end of the phase, this model has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "1 Benefictus"
    ],
    "loadout": "**This model is equipped with:** Psionic Cascade; close combat weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Neophyte Hybrids",
        "Hybrid Metamorphs",
        "Acolyte Hybrids With Hand Flamers",
        "Acolyte Hybrids With Autopistols"
      ]
    },
    "keywords": [
      "Benefictus",
      "Great Devourer",
      "Psyker",
      "Character",
      "Infantry"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "biophagus",
    "name": "Biophagus",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "flavor": "The Biophagus is a scientist-surgeon whose injector goad can be used to enhance the unholy might of Aberrants and other favoured cultists, or to dose enemies with a mutagenic cocktail that rapidly dissolves them from within. Coupled with hurled vials of bio-acids, this arsenal renders the Biophagus a deadly agent of biological warfare.",
    "profiles": [
      {
        "name": "Biophagus",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Autopistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Chemical vials",
        "tags": [
          "ANTI-INFANTRY 2+"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "3+",
        "s": "1",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Injector goad",
        "tags": [
          "ANTI-INFANTRY 2+"
        ],
        "a": "1",
        "ws": "3+",
        "s": "2",
        "ap": "0",
        "d": "D3"
      }
    ],
    "core": "Deep Strike, Support",
    "abilities": [
      {
        "name": "Twisted Science",
        "text": "While this model is leading a unit, melee weapons equipped by models in that unit have the [LETHAL HITS] ability."
      },
      {
        "name": "Biological Warfare",
        "text": "Once per battle, when this model's unit is selected to fight, this model can use this ability. If it does, until the end of the phase, improve the Attacks and Damage characteristics of its injector goad by 3."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Alchemicus Familiar",
        "text": "Once per battle, when the bearer’s unit is selected to fight, the bearer can use its alchemicus familiar. If it does, until the end of the phase, each time a model in the bearer’s unit makes an attack that targets an INFANTRY unit, add 1 to the Wound roll.\n\n**Designer’s Note:** Place an Alchemicus Familiar token next to the bearer, removing it once this ability has been used."
      }
    ],
    "composition": [
      "1 Biophagus"
    ],
    "loadout": "**This model is equipped with:** autopistol; chemical vials; injector goad; alchemicus familiar.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Neophyte Hybrids",
        "Hybrid Metamorphs",
        "Acolyte Hybrids With Hand Flamers",
        "Acolyte Hybrids With Autopistols",
        "Aberrants"
      ],
    },
    "keywords": [
      "Character",
      "Great Devourer",
      "Biophagus",
      "Infantry"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "clamavus",
    "name": "Clamavus",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "flavor": "Vox-hacker and information assassin supreme, the Clamavus scythes into enemy communications networks for intelligence. It seeds the amplified psychic signal of the Broodmind through the foe’s comms to spread dismay from a distance, while up close it can rupture its victims’ brains with its savage audial symphony.",
    "profiles": [
      {
        "name": "Clamavus",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "3",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Autopistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Support",
    "abilities": [
      {
        "name": "Voice of New Truths",
        "text": "In your Command phase, one model from your army with this ability can use it. If it does, select one enemy unit within 18\" of it; that enemy unit must take a Battle-shock test."
      },
      {
        "name": "Scrambler Array",
        "text": "Enemy units that are set up on the battlefield as Reinforcements cannot be set up within 12\" of this model."
      }
    ],
    "composition": [
      "1 Clamavus"
    ],
    "loadout": "**This model is equipped with:** autopistol; close combat weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Acolyte Hybrids With Hand Flamers",
        "Acolyte Hybrids With Autopistols",
        "Neophyte Hybrids",
        "Hybrid Metamorphs"
      ],
    },
    "keywords": [
      "Great Devourer",
      "Infantry",
      "Character",
      "Clamavus"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "goliath-rockgrinder",
    "name": "Goliath Rockgrinder",
    "points": [
      {
        "models": 1,
        "points": 120,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 130,
        "note": "3rd+"
      }
    ],
    "flavor": "The drilldozer blade fitted to the Goliath Rockgrinder is intended for gouging tunnels deep into solid rock faces in search of mineral riches. However, it works just as well as both an ablative shield and a hideously bloody line-breaking weapon, mangling a crimson path through the luckless foe.",
    "profiles": [
      {
        "name": "Goliath Rockgrinder",
        "m": "12\"",
        "t": "10",
        "sv": "3+",
        "w": "10",
        "ld": "7+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Clearance incinerator",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "2D6",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Demolition charge cache",
        "tags": [
          "ASSAULT",
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "8\"",
        "a": "D6",
        "bs": "5+",
        "s": "9",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Heavy mining laser",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Heavy seismic cannon",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "4+",
        "s": "8",
        "ap": "-2",
        "d": "D3"
      },
      {
        "name": "Heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Drilldozer blade",
        "tags": [],
        "a": "8",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3, Firing Deck 6",
    "abilities": [
      {
        "name": "Grinding Line-breaker",
        "text": "Each time an enemy unit (excluding MONSTERS and VEHICLES) that is within Engagement Range of this model Falls Back, all models in that enemy unit must take a Desperate Escape test. When doing so, if that enemy unit is Battle-shocked, subtract 1 from each of those tests."
      }
    ],
    "damaged": {
      "note": "1-3 wounds remaining",
      "text": "While this model has 1-3 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Goliath Rockgrinder"
    ],
    "loadout": "**This model is equipped with:** heavy mining laser; heavy stubber; drilldozer blade; demolition charge cache.",
    "options": [
      "This model’s heavy mining laser can be replaced with one of the following:\n▪ 1 clearance incinerator\n▪ 1 heavy seismic cannon"
    ],
    "transport": "This model has a transport capacity of 6 Genestealer Cults Infantry models.",
    "keywords": [
      "Goliath Rockgrinder",
      "Great Devourer",
      "Vehicle",
      "Transport",
      "Frame"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "goliath-truck",
    "name": "Goliath Truck",
    "points": [
      {
        "models": 1,
        "points": 75,
        "note": "1st-3rd"
      },
      {
        "models": 1,
        "points": 85,
        "note": "4th+"
      }
    ],
    "flavor": "Robust and versatile, the Goliath Truck is the armoured transport of choice for the Genestealer Cults. These vehicles boast thick armour and capacious holds, and their heavy stubber and twin autocannon allow the crew to lay down a hail of supporting fire as the broodkin passengers disembark into battle.",
    "profiles": [
      {
        "name": "Goliath Truck",
        "m": "12\"",
        "t": "9",
        "sv": "3+",
        "w": "10",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Demolition charge cache",
        "tags": [
          "ASSAULT",
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "8\"",
        "a": "D6",
        "bs": "5+",
        "s": "9",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Twin autocannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "4+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Armoured hull",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Firing Deck 6",
    "abilities": [
      {
        "name": "Fire Support",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit it scored one or more hits against this phase. Until the end of the phase, each time a friendly model that disembarked from this TRANSPORT this turn makes an attack that targets that enemy unit, you can re-roll the Wound roll."
      }
    ],
    "composition": [
      "1 Goliath Truck"
    ],
    "loadout": "**This model is equipped with:** heavy stubber; twin autocannon; demolition charge cache; armoured hull.",
    "transport": "This model has a transport capacity of 12 Genestealer Cults Infantry models.",
    "keywords": [
      "Transport",
      "Great Devourer",
      "Vehicle",
      "Dedicated Transport",
      "Goliath Truck",
      "Frame"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "hybrid-metamorphs",
    "name": "Hybrid Metamorphs",
    "points": [
      {
        "models": 5,
        "points": 75,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 140,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 85,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 150,
        "note": "3rd+"
      }
    ],
    "flavor": "Triggered by the approach of a hive fleet or a sudden trauma to the cult, Hybrid Metamorphs mutate from early generations of the brood cycle. Dormant gene-codes burst to life, bestowing weaponised limbs, ghastly bio-acidic glands and other so-called blessings upon these creatures, transforming them into devastating shock troops.",
    "profiles": [
      {
        "name": "Hybrid Metamorphs",
        "m": "6\"",
        "t": "4",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Autopistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Hand flamer",
        "tags": [
          "IGNORES COVER",
          "PISTOL",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Leader’s cult weapons",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Metamorph mutations – strike",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Metamorph mutations – sweep",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Feel No Pain 5+, Scouts 6\"",
    "faction": "Cult Ambush",
    "abilities": [
      {
        "name": "Brood Surge",
        "text": "In your opponent’s Shooting phase, when an enemy unit has shot, if a model in this unit was destroyed as a result of those attacks, this unit can make a surge move of up to D6\"."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Cult Icon",
        "text": "In your Command phase, you can return up to D3 destroyed models to the bearer’s unit. If the bearer’s unit is within range of an objective marker you control, you can return up to 3 destroyed models to that unit instead. This ability cannot be used to return destroyed Character models in Attached units and any [ONE SHOT] weapons equipped by returned models that were shot before they were destroyed are still considered to have been shot."
      }
    ],
    "composition": [
      "1 Metamorph Leader",
      "4-9 Hybrid Metamorphs"
    ],
    "loadout": "**The Metamorph Leader is equipped with:** autopistol; Leader’s cult weapons.\n\n**Every Hybrid Metamorph is equipped with:** autopistol; Metamorph mutations.",
    "options": [
      "Any number of models can each have their autopistol replaced with 1 hand flamer.",
      "One Hybrid Metamorph’s autopistol can be replaced with 1 cult icon."
    ],
    "keywords": [
      "Grenades",
      "Infantry",
      "Great Devourer",
      "Hybrid Metamorphs"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "jackal-alphus",
    "name": "Jackal Alphus",
    "points": [
      {
        "models": 1,
        "points": 55
      }
    ],
    "flavor": "The Jackal Alphus rides their dirtcycle to commanding battlefield vantage points. With their long-range vox, the Alphus calls in strike missions against tougher, armoured targets. Should a foe fall beneath the cross hairs of their cult sniper rifle, its life expectancy can be measured in moments.",
    "profiles": [
      {
        "name": "Jackal Alphus",
        "m": "12\"",
        "t": "4",
        "sv": "5+",
        "w": "4",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Autopistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Cult sniper rifle",
        "tags": [
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Leader, Scouts 9\", Stealth",
    "abilities": [
      {
        "name": "Priority Target",
        "text": "In your Shooting phase, after this model’s unit has shot, select one enemy unit hit by one or more of those attacks made with a cult sniper rifle. Until the end of the phase, each time a friendly GENESTEALER CULTS model makes an attack that targets that enemy unit, re-roll a Hit roll of 1."
      },
      {
        "name": "Master Outrider",
        "text": "In your Shooting phase, after this model’s unit has shot, if it is not within Engagement Range of any enemy units, that unit can make a Normal move of up to 6\" as if it were your Movement phase. If it does, until the end of the turn, that unit is not eligible to declare a charge."
      }
    ],
    "composition": [
      "1 Jackal Alphus"
    ],
    "loadout": "**This model is equipped with:** autopistol; cult sniper rifle; close combat weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Atalan Jackals"
      ]
    },
    "keywords": [
      "Great Devourer",
      "Mounted",
      "Jackal Alphus",
      "Character",
      "Grenades"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "60x35.5mm Oval Base"
  },
  {
    "id": "kelermorph",
    "name": "Kelermorph",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "This gunfighter is a living icon of rebellion, moulded to exploit the psyche of fractured Human societies. Whip-fast reactions and hypersensory acuity lend the Kelermorph lethal reaction speeds and help it unleash withering volleys from its iconic liberator autostubs, whose depleted volonium rounds can punch through tank armour.",
    "profiles": [
      {
        "name": "Kelermorph",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Liberator autostubs",
        "tags": [
          "DEVASTATING WOUNDS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "6",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Lone Operative",
    "abilities": [
      {
        "name": "Heroic Fusillade",
        "text": "Once per turn, after one model from your army with this ability has shot, you can select one INFANTRY unit hit by one or more of those attacks. That unit must take a Battle-shock test."
      },
      {
        "name": "Hypersensory Abilities",
        "text": "Once per turn, in your opponent’s Movement phase, when an enemy unit ends a Normal, Advance or Fall Back move within 8\" of this model, if this model is not within Engagement Range of one or more enemy units, it can shoot at that unit as if it were your Shooting phase and then make a Normal move of up to D6\" (it cannot embark within a TRANSPORT as part of this move)."
      }
    ],
    "composition": [
      "1 Kelermorph"
    ],
    "loadout": "**This model is equipped with:** liberator autostubs; close combat weapon.",
    "keywords": [
      "Kelermorph",
      "Great Devourer",
      "Infantry",
      "Character"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "locus",
    "name": "Locus",
    "points": [
      {
        "models": 1,
        "points": 35
      }
    ],
    "flavor": "An unassuming bodyguard, the Locus may be overlooked by the foe until the exact moment it abandons calm stillness for lightning-fast attack. Robes thrown back, the Locus’ whipping tail barb and vestigial limbs are revealed even as its twin blades flash out to neutralise any threats to its ward.",
    "profiles": [
      {
        "name": "Locus",
        "m": "6\"",
        "t": "4",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Locus blades",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Fights First, Support",
    "abilities": [
      {
        "name": "Sudden Assault",
        "text": "While this model is leading a unit, models in that unit have the Fights First ability."
      },
      {
        "name": "Bodyguard",
        "text": "While this model is leading a unit, other Character models attached to that unit have the Feel No Pain 4+ ability."
      }
    ],
    "composition": [
      "1 Locus"
    ],
    "loadout": "**This model is equipped with:** Locus blades.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Acolyte Hybrids With Hand Flamers",
        "Acolyte Hybrids With Autopistols",
        "Neophyte Hybrids",
        "Hybrid Metamorphs"
      ],
    },
    "keywords": [
      "Locus",
      "Great Devourer",
      "Character",
      "Infantry"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "magus",
    "name": "Magus",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "flavor": "The Magus acts as its Patriarch’s vizier, and as the head of that alien monstrosity’s deviant church. Each one is a powerful psyker, their formidable will enhanced by the gestalt powers of the Star Children until they can manipulate enemies’ minds and bodies like puppets – or tear them apart from within.",
    "profiles": [
      {
        "name": "Magus",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Autopistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Force stave",
        "tags": [
          "PSYCHIC"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "core": "Deep Strike, Leader",
    "abilities": [
      {
        "name": "Spiritual Leader",
        "text": "Once per battle, at the start of any phase, you can select one friendly GENESTEALER CULTS unit that is Battle-shocked and within 12\" of this model. That unit is no longer Battle-shocked."
      },
      {
        "name": "Mind Control (Psychic)",
        "text": "At the start of your opponent’s Shooting phase, one Psyker model from your army with this ability can use it. If used, select one enemy unit within 18\" of that PSYKER model and roll one D6: on a 1, that PSYKER model suffers D3 mortal wounds; on a 2-5, until the end of the phase, each time a model in that enemy unit makes an attack, subtract 1 from the Hit roll; on a 6, each time a model in that enemy unit makes an attack, subtract 1 from the Hit roll and subtract 1 from the Wound roll."
      },
      {
        "name": "Psychic Familiar",
        "text": "Once per battle, at the start of your opponent’s Shooting phase, this model can use its psychic familiar. If it does, until the end of the phase, add 6\" to the range of its Mind Control ability.\n\n**Designer’s Note:** Place a Psychic Familiar token next to the model, removing it once this ability has been used."
      }
    ],
    "composition": [
      "1 Magus"
    ],
    "loadout": "**This model is equipped with:** autopistol; Force stave.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Neophyte Hybrids",
        "Hybrid Metamorphs",
        "Acolyte Hybrids With Hand Flamers",
        "Acolyte Hybrids With Autopistols"
      ]
    },
    "keywords": [
      "Magus",
      "Great Devourer",
      "Psyker",
      "Character",
      "Infantry"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "neophyte-hybrids",
    "name": "Neophyte Hybrids",
    "points": [
      {
        "models": 10,
        "points": 70
      },
      {
        "models": 20,
        "points": 135
      }
    ],
    "flavor": "Making up the bulk of their cult’s ranks, Neophyte Hybrids are the least alien in appearance of all the Patriarch’s brood. They are no less dangerous for this, however, and what they lack in weaponised bio-adaptations they make up for in numbers, massed firepower and zealous revolutionary fanaticism.",
    "profiles": [
      {
        "name": "Neophyte Hybrids",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Anointed pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Autopistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Hybrid firearm",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Flamer",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Grenade launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Grenade launcher – krak",
        "tags": [],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "D3"
      },
      {
        "name": "Heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Mining laser",
        "tags": [
          "HEAVY"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "5+",
        "s": "10",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Seismic cannon",
        "tags": [
          "HEAVY",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "6",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Webber",
        "tags": [
          "DEVASTATING WOUNDS",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Chainsword",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power weapon",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Cult Ambush",
    "abilities": [
      {
        "name": "A Plan Generations in the Making",
        "text": "At the end of your Command phase, if this unit is within range of an objective marker you control, that objective marker remains under your control until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Cult Icon",
        "text": "In your Command phase, you can return up to 3 destroyed models to the bearer’s unit. If the bearer’s unit is within range of an objective marker you control, you can return up to D3+3 destroyed models to that unit instead. This ability cannot be used to return destroyed Character models in Attached units and any [ONE SHOT] weapons equipped by returned models that were shot before they were destroyed are still considered to have been shot."
      }
    ],
    "composition": [
      "1 Neophyte Leader",
      "9-19 Neophyte Hybrids"
    ],
    "loadout": "**Every model is equipped with:** autopistol; Hybrid firearm; close combat weapon.",
    "options": [
      "One Neophyte Hybrid equipped with a Hybrid firearm can be equipped with 1 cult icon.",
      "For every 10 models in this unit, up to 2 Neophyte Hybrids can each have their Hybrid firearm replaced with one of the following:\n▪ Heavy stubber*\n▪ Mining laser*\n▪ Seismic cannon*\n* To a maximum of 1 per 10 models in this unit.",
      "For every 10 models in this unit, up to 2 Neophyte Hybrids can each have their Hybrid firearm replaced with one of the following:\n▪ Flamer*\n▪ Grenade launcher*\n▪ Webber*\n* To a maximum of 1 per 10 models in this unit.",
      "The Neophyte Leader’s Hybrid firearm and close combat weapon can be replaced with 1 of the following:\n▪ 1 anointed pistol and 1 chainsword\n▪ 1 anointed pistol and 1 power weapon",
      "* To a maximum of 1 per 10 models in this unit."
    ],
    "keywords": [
      "Great Devourer",
      "Neophyte Hybrids",
      "Grenades",
      "Battleline",
      "Infantry"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "25mm / 32mm"
  },
  {
    "id": "nexos",
    "name": "Nexos",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "Engineered to share a portion of the Patriarch’s cerebral might, the Nexos can absorb the entirety of a cultist’s thoughts and experiences through physical contact. They compartmentalise millions of these snapshots, building a formidable mental map, then using it to direct cult forces like a rear-echelon officer of prodigious skill.",
    "profiles": [
      {
        "name": "Nexos",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Autopistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Support",
    "abilities": [
      {
        "name": "Battlefield Analysis",
        "text": "Once per battle round, one model from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP."
      },
      {
        "name": "Cult Infiltration",
        "text": "At the start of each player’s Command phase, if this model is on the battlefield, you can select one of your Cult Ambush markers that is on the battlefield and has not been moved this turn and move it up to 6\"."
      }
    ],
    "composition": [
      "1 Nexos"
    ],
    "loadout": "**This model is equipped with:** autopistol; close combat weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Acolyte Hybrids With Hand Flamers",
        "Acolyte Hybrids With Autopistols",
        "Neophyte Hybrids",
        "Hybrid Metamorphs"
      ],
    },
    "keywords": [
      "Infantry",
      "Character",
      "Great Devourer",
      "Nexos"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "patriarch",
    "name": "Patriarch",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Psychic abomination; alpha predator; parasitic demigod – the Patriarch is all of these things and worse. They are the source of the bio corruption that spawns each Genestealer Cult cell. Moreover, when the Day of Ascension comes, they are the cult’s deadliest killer, prowling the shadows of embattled worlds to rip and slay.",
    "profiles": [
      {
        "name": "Patriarch",
        "m": "8\"",
        "t": "5",
        "sv": "4+",
        "w": "6",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Patriarch’s claws",
        "tags": [
          "DEVASTATING WOUNDS",
          "TWIN-LINKED"
        ],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Infiltrators, Leader",
    "abilities": [
      {
        "name": "Might From Beyond",
        "text": "While this model is leading a unit, melee weapons equipped by models in that unit have the [DEVASTATING WOUNDS] ability."
      },
      {
        "name": "Cosmic Horror (Psychic)",
        "text": "At the start of the Fight phase, each enemy unit within 6\" of this model must take a Battle-shock test."
      },
      {
        "name": "Psychic Familiar",
        "text": "Once per battle, at the start of the Fight phase, this model can use its psychic familiar. If it does, until the end of the phase, add 6\" to the range of its Cosmic Horror ability.\n\n**Designer’s Note:** Place a Psychic Familiar token next to the model, removing it once this ability has been used."
      }
    ],
    "composition": [
      "1 Patriarch"
    ],
    "loadout": "**This model is equipped with:** Patriarch’s claws.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Purestrain Genestealers"
      ]
    },
    "keywords": [
      "Great Devourer",
      "Infantry",
      "Character",
      "Psyker",
      "Patriarch"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "50mm",
    "rules": [
      {
        "name": "SUPREME COMMANDER",
        "text": "▪ You cannot include more than one PATRIARCH model in your army.\n▪ If this model is in your army, it must be your Warlord."
      }
    ]
  },
  {
    "id": "primus",
    "name": "Primus",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "flavor": "Occupying a role somewhere between guerrilla general and shadowy symbol of resistance, the Primus is a Genestealer Cult’s ultimate military commander. Besides being deadly combatants in their own right, their mastery of insurgent tactics transforms their followers from a rebellious mob into a lethal military machine.",
    "profiles": [
      {
        "name": "Primus",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Scoped needle pistol",
        "tags": [
          "ANTI-INFANTRY 2+",
          "IGNORES COVER",
          "PISTOL"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "2+",
        "s": "1",
        "ap": "0",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Cult bonesword",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Toxin injector claw",
        "tags": [
          "ANTI-INFANTRY 2+",
          "EXTRA ATTACKS"
        ],
        "a": "2",
        "ws": "2+",
        "s": "2",
        "ap": "0",
        "d": "D3"
      }
    ],
    "core": "Deep Strike, Leader",
    "abilities": [
      {
        "name": "Cult Demagogue",
        "text": "While this model is leading a unit, each time a model in that unit makes an attack, you can add 1 to the Hit roll."
      },
      {
        "name": "Decoys and Misdirection",
        "text": "If your army includes one or more models with this ability, after both players have deployed their armies, select up to three GENESTEALER CULTS units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves."
      }
    ],
    "composition": [
      "1 Primus"
    ],
    "loadout": "**This model is equipped with:** scoped needle pistol; cult bonesword; toxin injector claw.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Neophyte Hybrids",
        "Hybrid Metamorphs",
        "Acolyte Hybrids With Hand Flamers",
        "Acolyte Hybrids With Autopistols"
      ]
    },
    "keywords": [
      "Character",
      "Great Devourer",
      "Primus",
      "Infantry"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "purestrain-genestealers",
    "name": "Purestrain Genestealers",
    "points": [
      {
        "models": 5,
        "points": 75,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 140,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 85,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 150,
        "note": "3rd+"
      }
    ],
    "flavor": "Vanguard organisms for the Tyranid hive fleets, Purestrain Genestealers are one of the most lethal life forms in the galaxy. They combine the cunning of an apex predator with inhuman speed and agility, closing with their prey in the blink of an eye before tearing their victims to bloody tatters.",
    "profiles": [
      {
        "name": "Purestrain Genestealers",
        "m": "8\"",
        "t": "4",
        "sv": "5+",
        "w": "2",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Cult claws and talons",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Infiltrators",
    "faction": "Cult Ambush",
    "abilities": [
      {
        "name": "Swift and Deadly",
        "text": "This unit is eligible to declare a charge in a turn in which it Advanced."
      }
    ],
    "composition": [
      "5-10 Purestrain Genestealers"
    ],
    "loadout": "**Every model is equipped with:** cult claws and talons.",
    "keywords": [
      "Infantry",
      "Great Devourer",
      "Purestrain Genestealers"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "reductus-saboteur",
    "name": "Reductus Saboteur",
    "points": [
      {
        "models": 1,
        "points": 70,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 80,
        "note": "3rd+"
      }
    ],
    "flavor": "There is no engine of the oppressors that a Reductus Saboteur cannot lay low, and few materials they cannot fashion into a bomb given a little time to tinker. Flitting through the shadows, they lace the battlefield with booby traps and deploy powerful explosives that make short work of enemy armour.",
    "profiles": [
      {
        "name": "Reductus Saboteur",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Autopistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Demolition charges",
        "tags": [
          "ASSAULT",
          "BLAST",
          "ONE SHOT"
        ],
        "range": "8\"",
        "a": "D6",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Remote explosives",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "24\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Infiltrators, Lone Operative, Stealth",
    "abilities": [
      {
        "name": "Primed and Ready",
        "text": "In your Shooting phase, you can select one model from your army with this ability as the target of the Grenade Stratagem for 0CP, provided that model has not already been the target of that Stratagem this phase."
      },
      {
        "name": "Planted Explosives",
        "text": "Once per battle, when an enemy unit ends a Normal, Advance or Fall Back move within 8” of this model, this model can use its Reductus mine. If it does, roll one D6: on a 2+, that enemy unit suffers D3+3 mortal wounds. Only one model from your army with this ability can use it in the same battle round.\n\n**Designer’s Note:** Place a Reductus Mine token next to the model, removing it once this ability has been used."
      }
    ],
    "composition": [
      "1 Reductus Saboteur"
    ],
    "loadout": "**This model is equipped with:** autopistol; demolition charges; remote explosives; close combat weapon.",
    "keywords": [
      "Infantry",
      "Reductus Saboteur",
      "Great Devourer",
      "Grenades",
      "Character"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "sanctus",
    "name": "Sanctus",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "flavor": "A Sanctus is an inescapable assassin who can track by psychic spoor and squirm through the smallest gaps. Its bio-dagger – spawned from the Patriarch’s genesis pools – unleashes the psychic might of the Broodmind with the slightest cut, while the Sanctus’ cult sniper rifle allows it to strike down prey from afar.",
    "profiles": [
      {
        "name": "Sanctus",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Cult sniper rifle",
        "tags": [
          "ANTI-PSYKER 2+",
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Sanctus bio-dagger",
        "tags": [
          "ANTI-INFANTRY 3+",
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "3",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Infiltrators, Lone Operative, Stealth",
    "abilities": [
      {
        "name": "Creeping Shadow",
        "text": "If this model is equipped with a Cult Sniper Rifle, in your opponent’s Movement phase, if an enemy unit ends a move within 8\" of this unit, if this unit is not within Engagement Range of one or more enemy units, this unit can make a Normal move of up to 6\"."
      },
      {
        "name": "Cloaked Assassin",
        "text": "Enemy units cannot target this unit with snap shooting attacks."
      },
      {
        "name": "Psychic Spoor",
        "text": "At the start of the first battle round, select one enemy unit to be this model’s prey. Each time this model makes an attack that targets its prey, you can re-roll the Hit roll and you can re-roll the Wound roll."
      }
    ],
    "composition": [
      "1 Sanctus"
    ],
    "loadout": "**This model is equipped with:** Sanctus bio-dagger.",
    "options": [
      "This model’s Sanctus bio-dagger can be replaced with 1 cult sniper rifle and 1 close combat weapon."
    ],
    "keywords": [
      "Sanctus",
      "Character",
      "Great Devourer",
      "Infantry"
    ],
    "factionKeywords": [
      "Genestealer Cults"
    ],
    "baseSize": "32mm"
  }
]

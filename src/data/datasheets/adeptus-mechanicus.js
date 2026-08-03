// Adeptus Mechanicus — datasheets. Unit roster and points from src/data/mfm/adeptus-mechanicus.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
export default [
  {
    "id": "archaeopter-fusilave",
    "name": "Archaeopter Fusilave",
    "points": [
      {
        "models": 1,
        "points": 160
      }
    ],
    "flavor": "The Archaeopter Fusilave’s changeable payload of deep-bore, high explosives defines its position as a devastating bomber and ground clearance aircraft. Tech-Priests employ whole squadrons to level enemy defences and root out sheltering heretics, as well as to clear prospective sites for further investigation in the Quest for Knowledge.",
    "profiles": [
      {
        "name": "Archaeopter Fusilave",
        "m": "20+\"",
        "t": "9",
        "sv": "3+",
        "w": "10",
        "ld": "7+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Cognis heavy stubber array",
        "tags": [
          "RAPID FIRE 9",
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "9",
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
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Bomb Rack",
        "text": "At the end of your opponent’s Fight phase, select one visible enemy unit (excluding Lone Operative units) within 24\" of this unit, and roll six D6 for that unit: for each 4+, that unit suffers 1 mortal wound."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Chaff Launcher",
        "text": "The bearer has the SMOKE keyword."
      },
      {
        "name": "Command Uplink",
        "text": "Each time you select the bearer’s unit as the target of a Stratagem, roll one D6: on a 5+, you gain 1CP."
      }
    ],
    "composition": [
      "1 Archaeopter Fusilave"
    ],
    "loadout": "**This model is equipped with:** cognis heavy stubber array; armoured hull; command uplink.",
    "options": [
      "This model’s command uplink can be replaced with 1 chaff launcher."
    ],
    "keywords": [
      "Aircraft",
      "Fly",
      "Imperium",
      "Skitarii",
      "Archaeopter Fusilave",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "archaeopter-stratoraptor",
    "name": "Archaeopter Stratoraptor",
    "points": [
      {
        "models": 1,
        "points": 185
      }
    ],
    "flavor": "The Stratoraptor takes advantage of the Archaeopter’s directional thrusters and adaptable wing profile to excel in the role of ground attack gunship. Its spread of heavy weapons – with a mixture of high strength and high rate of fire – ensures the Stratoraptor poses a lethal danger to dug-in infantry and heavily armoured vehicles alike.",
    "profiles": [
      {
        "name": "Archaeopter Stratoraptor",
        "m": "20+\"",
        "t": "9",
        "sv": "3+",
        "w": "10",
        "ld": "7+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Cognis heavy stubber",
        "tags": [
          "RAPID FIRE 3",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Heavy phosphor blaster",
        "tags": [
          "IGNORES COVER"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin cognis lascannon",
        "tags": [
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
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
    "core": "Deadly Demise D3",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Strafing Run",
        "text": "Each time this model makes a ranged attack that targets a unit that cannot **FLY**, add 1 to the Hit roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Chaff Launcher",
        "text": "The bearer has the SMOKE keyword."
      },
      {
        "name": "Command Uplink",
        "text": "Each time you select the bearer’s unit as the target of a Stratagem, roll one D6: on a 5+, you gain 1CP."
      }
    ],
    "composition": [
      "1 Archaeopter Stratoraptor"
    ],
    "loadout": "**This model is equipped with:** 2 cognis heavy stubbers; 2 heavy phosphor blasters; twin cognis lascannon; armoured hull; command uplink.",
    "options": [
      "This model’s command uplink can be replaced with 1 chaff launcher."
    ],
    "keywords": [
      "Imperium",
      "Fly",
      "Aircraft",
      "Vehicle",
      "Skitarii",
      "Archaeopter Stratoraptor"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "archaeopter-transvector",
    "name": "Archaeopter Transvector",
    "points": [
      {
        "models": 1,
        "points": 145
      }
    ],
    "flavor": "Ideal aerial insertion transports, Transvectors are used in vast numbers by Explorator fleets for reconnaissance and rapid extraction in the face of hostiles. They are incredibly agile, their implanted pilots able to reshape the wings to suit changing atmospherics, while directing their cognis heavy stubbers to scythe apart oncoming foes.",
    "profiles": [
      {
        "name": "Archaeopter Transvector",
        "m": "14\"",
        "t": "9",
        "sv": "3+",
        "w": "10",
        "ld": "7+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Cognis heavy stubber array",
        "tags": [
          "RAPID FIRE 9",
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "9",
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
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike, Hover",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Aerial Deployment",
        "text": "In your first Movement phase, this unit can make an **ingress move**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Chaff Launcher",
        "text": "The bearer has the SMOKE keyword."
      },
      {
        "name": "Command Uplink",
        "text": "Each time you select the bearer’s unit as the target of a Stratagem, roll one D6: on a 5+, you gain 1CP."
      }
    ],
    "composition": [
      "1 Archaeopter Transvector"
    ],
    "loadout": "**This model is equipped with:** cognis heavy stubber array; armoured hull; command uplink.",
    "options": [
      "This model’s command uplink can be replaced with 1 chaff launcher."
    ],
    "transport": "This model has a transport capacity of 11 Skitarii Infantry or Tech-Priest Infantry models. It cannot transport Jump Pack, Kataphron or Sydonian Skatros models.",
    "keywords": [
      "Archaeopter Transvector",
      "Fly",
      "Imperium",
      "Skitarii",
      "Transport",
      "Vehicle"
        ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "belisarius-cawl",
    "name": "Belisarius Cawl",
    "points": [
      {
        "models": 1,
        "points": 220
      }
    ],
    "flavor": "Belisarius Cawl’s war form is a multi-limbed, biomechanical hybrid. Advanced bionics grant him immense strength and resilience, while snaking tendrils rapidly repair his cybernetic body. For ten thousand years, Cawl has eradicated the Imperium’s enemies, and he leads the Machine God’s devotees in holy acquisition still.",
    "profiles": [
      {
        "name": "Belisarius Cawl",
        "m": "8\"",
        "t": "8",
        "sv": "2+",
        "w": "10",
        "ld": "6+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Solar atomiser",
        "tags": [
          "MELTA 3"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "2+",
        "s": "14",
        "ap": "-4",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Arc scourge",
        "tags": [
          "ANTI-VEHICLE 4+",
          "DEVASTATING WOUNDS",
          "EXTRA ATTACKS"
        ],
        "a": "4",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Cawl’s Omnissian axe",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Mechadendrite hive",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "2D6",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Canticles of the Omnissiah",
        "text": "At the start of your Command phase, select one of the abilities in the Canticles of the Omnissiah section. Until the start of your next Command phase, this model has that ability."
      },
      {
        "name": "Mechanicus Bodyguard",
        "text": "While this model is within 3\" of one or more other friendly ADEPTUS MECHANICUS units, this model has the Lone Operative ability."
      },
      {
        "name": "Self-repair Mechanisms",
        "text": "At the start of your Command phase, this model regains up to D3 lost wounds."
      }
    ],
    "composition": [
      "1 Belisarius Cawl – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** solar atomiser; arc scourge; Cawl’s Omnissian axe; mechadendrite hive.",
    "keywords": [
      "Belisarius Cawl",
      "Character",
      "Cult Mechanicus",
      "Epic Hero",
      "Imperium",
      "Mobile",
      "Monster",
      "Tech-Priest"
        ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "105x70mm Oval Base",
    "rules": [
      {
        "name": "SUPREME COMMANDER",
        "text": "If this model is in your army, it must be your Warlord."
      }
    ],
    "abilitySets": [
      {
        "name": "Canticles of the Omnissiah",
        "options": [
          {
            "name": "Invocation of Machine Vengeance",
            "text": "At the start of your Command phase, select one unit from your opponent’s army. Until the start of your next Command phase, that enemy unit is your Machine Vengeance target. Each time a model in a friendly Adeptus Mechanicus unit makes an attack that targets your Machine Vengeance target, you can re-roll the Hit roll."
          },
          {
            "name": "Mantra of Discipline",
            "text": "This model has the BATTLELINE keyword and has the following ability:\n▪ **Binharic Courage (Aura):** While a friendly ADEPTUS MECHANICUS unit is within 6\" of this model, add 1 to the Objective Control characteristic of models in that unit and each time you take a Battle-shock or Leadership test for that unit, add 1 to that test."
          },
          {
            "name": "Shroudpsalm (Aura)",
            "text": "While a friendly ADEPTUS MECHANICUS unit is within 6\" of this model, that unit has the Stealth ability."
          }
        ]
      }
    ]
  },
  {
    "id": "corpuscarii-electro-priests",
    "name": "Corpuscarii Electro-priests",
    "points": [
      {
        "models": 5,
        "points": 65
      },
      {
        "models": 10,
        "points": 130
      }
    ],
    "flavor": "Electro-Priests of the Corpuscarii faction build up huge electrical potential as they zealously chant their canticles of battle. They conduct the Motive Force through their bodies, eager to share its illumination, releasing it from their gauntlets in coruscating arcs of electrical power that leap from target to target.",
    "profiles": [
      {
        "name": "Corpuscarii Electro-priests",
        "m": "6\"",
        "t": "3",
        "sv": "7+",
        "w": "1",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Electrostatic gauntlets",
        "tags": [
          "PISTOL",
          "SUSTAINED HITS 2"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Electrostatic gauntlets",
        "tags": [
          "SUSTAINED HITS 2"
        ],
        "a": "3",
        "ws": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Feel No Pain 5+",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Electro-shock",
        "text": "In your Shooting phase, after this unit has shot, select one enemy unit (excluding MONSTERS and VEHICLES) hit by one or more of those attacks. Until the end of your opponent’s next turn, that enemy unit is shocked. While a unit is shocked, subtract 2\" from its Move characteristic and subtract 2 from Advance and Charge rolls made for it."
      }
    ],
    "composition": [
      "5-10 Corpuscarii Electro-Priests"
    ],
    "loadout": "**Every model is equipped with:** electrostatic gauntlets.",
    "keywords": [
      "Infantry",
      "Imperium",
      "Cult Mechanicus",
      "Electro-Priests",
      "Corpuscarii"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "cybernetica-datasmith",
    "name": "Cybernetica Datasmith",
    "points": [
      {
        "models": 1,
        "points": 25
      }
    ],
    "flavor": "Datasmiths optimise the programming of their robotic charges. These Tech-Priests employ rituals and binharic hymns to bless the doctrina wafers through which they alter the robots’ protocols, all the while laying waste to the enemies of the Omnissiah with blasts of ionising radiation from their archeotech pistols.",
    "profiles": [
      {
        "name": "Cybernetica Datasmith",
        "m": "6\"",
        "t": "4",
        "sv": "2+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Mechanicus pistol",
        "tags": [
          "DEVASTATING WOUNDS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Power fist",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Battle Protocols",
        "text": "At the start of the battle, if this model is leading a KASTELAN ROBOTS unit, that unit enters Aegis Protocols (see below). In your Command phase, if this model is leading a KASTELAN ROBOTS unit, you can select one protocol from those listed below for that unit to enter. Once a unit enters a protocol, it remains in that protocol until it enters a different one.\n▪ **Protector Protocol:** Add 2 to the Attacks characteristic of ranged weapons equipped by KASTELAN ROBOT models in that unit.\n▪ **Conqueror Protocol:** Add 2 to the Attacks characteristic of melee weapons equipped by KASTELAN ROBOT models in that unit.\n▪ **Aegis Protocol:** Add 1 to the Toughness characteristic of KASTELAN ROBOT models in that unit."
      },
      {
        "name": "Data-severed",
        "text": "If there are no KASTELAN ROBOT models in this unit:\n▪ This unit loses VEHICLE.\n▪ This unit has INFANTRY."
      }
    ],
    "composition": [
      "1 Cybernetica Datasmith"
    ],
    "loadout": "**This model is equipped with:** Mechanicus pistol; power fist.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Kastelan Robots"
      ],
      "footer": "You must attach this model to a KASTELAN ROBOTS unit. If you cannot attach this model to a KASTELAN ROBOTS unit, this model cannot be deployed and counts as having been destroyed during the first battle round. While attached to a KASTELAN ROBOTS unit, this model loses the INFANTRY keyword."
    },
    "keywords": [
      "Infantry",
      "Character",
      "Cybernetica Datasmith",
      "Tech-Priest",
      "Imperium",
      "Legio Cybernetica"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "fulgurite-electro-priests",
    "name": "Fulgurite Electro-priests",
    "points": [
      {
        "models": 5,
        "points": 70
      },
      {
        "models": 10,
        "points": 140
      }
    ],
    "flavor": "Crackling with power stolen from those they slay, Fulgurite Electro- Priests are fanatical cultists of the Machine God. With their heavy, copper-bound staves, they smite blasphemers that waste the Motive Force, leeching it from heretic warriors and harnessing the holy energy in their capacitors where it empowers their voltagheist field.",
    "profiles": [
      {
        "name": "Fulgurite Electro-priests",
        "m": "6\"",
        "t": "3",
        "sv": "7+",
        "w": "1",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Electroleech stave",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "2",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Feel No Pain 5+",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Electro-infusion",
        "text": "While a CHARACTER model is leading this unit, each time an attack targets this unit, subtract 1 from the Wound roll."
      }
    ],
    "composition": [
      "5-10 Fulgurite Electro-Priests"
    ],
    "loadout": "**Every model is equipped with:** electroleech stave.",
    "keywords": [
      "Fulgurite",
      "Electro-Priests",
      "Cult Mechanicus",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "hastarii-exterminators",
    "name": "Hastarii Exterminators",
    "points": [
      {
        "models": 5,
        "points": 105,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 130,
        "note": "3rd+"
      }
    ],
    "flavor": "These heavily armoured Skitarii lay down withering firepower with heightened efficiency. The expanding energy cones of their eradication casters disrupt the target at a molecular level, grossly maiming or completely obliterating their victims. Combined with their shoulder-mounted arc blasters, this arsenal allows Hastarii Exterminators to blast the heart from the enemy battle line.",
    "profiles": [
      {
        "name": "Hastarii Exterminators",
        "m": "5\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Hastarii arc blaster",
        "tags": [
          "ANTI-VEHICLE 4+",
          "DEVASTATING WOUNDS"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Eradication caster – dissipated",
        "tags": [
          "ANTI-INFANTRY 4+"
        ],
        "range": "30\"",
        "a": "2",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Eradication caster – focused",
        "tags": [
          "ANTI-INFANTRY 4+"
        ],
        "range": "15\"",
        "a": "2",
        "bs": "4+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power weapon",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Broad-spectrum Targeting Augurs",
        "text": "Each time a model in this unit makes an attack with an eradication caster that targets a unit (excluding MONSTER and VEHICLE units), that attack has the [SUSTAINED HITS 1] ability."
      }
    ],
    "specialAbilities": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a Character unit from your army can be attached to a Skitarii Rangers unit, it can be attached to this unit instead"
      }
    ],
    "composition": [
      "1 Hastarii Exterminator Alpha",
      "4 Hastarii Exterminators"
    ],
    "loadout": "**The Hastarii Exterminator Alpha is equipped with:** Hastarii arc blaster; eradication caster; power weapon.\n\n**Every Hastarii Exterminator is equipped with:** Hastarii arc blaster; eradication caster; close combat weapon.",
    "options": [
      "None"
    ],
    "keywords": [
      "Infantry",
      "Imperium",
      "Skitarii",
      "Hastarii",
      "Exterminators"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "hastarii-fusiliers",
    "name": "Hastarii Fusiliers",
    "points": [
      {
        "models": 5,
        "points": 115,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 130,
        "note": "3rd+"
      }
    ],
    "flavor": "The role of Hastarii Fusiliers is to lay down overwhelming firepower against the foe’s most heavily armoured assets. While their shoulder-mounted phosphor blasters drive back enemy counterattacks, the Fusiliers level one salvo after another, reducing battle tanks, elite infantry and monstrous beasts to blazing wrecks and burned out carcasses.",
    "profiles": [
      {
        "name": "Hastarii Fusiliers",
        "m": "5\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Neutron fusil",
        "tags": [],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Hastarii phosphor blaster",
        "tags": [
          "IGNORES COVER"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power weapon",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Monocular Targeting Helms",
        "text": "Each time a model in this unit makes an attack with a neutron fusil against a MONSTER or VEHICLE unit, that attack has the [IGNORES COVER] ability."
      }
    ],
    "specialAbilities": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a Character unit from your army can be attached to a Skitarii Rangers unit, it can be attached to this unit instead"
      }
    ],
    "composition": [
      "1 Hastarii Fusilier Alpha",
      "4 Hastarii Fusiliers"
    ],
    "loadout": "**The Hastarii Fusilier Alpha is equipped with:** neutron fusil; Hastarii phosphor blaster; power weapon.\n\n**Every Hastarii Fusiller is equipped with:** neutron fusil; Hastarii phosphor blaster; close combat weapon.",
    "options": [
      "None"
    ],
    "keywords": [
      "Hastarii",
      "Skitarii",
      "Imperium",
      "Infantry",
      "Fusiliers"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "ironstrider-ballistarii",
    "name": "Ironstrider Ballistarii",
    "points": [
      {
        "models": 1,
        "points": 80,
        "note": "1st-2nd"
      },
      {
        "models": 2,
        "points": 160,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 250,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 95,
        "note": "3rd+"
      },
      {
        "models": 2,
        "points": 175,
        "note": "3rd+"
      },
      {
        "models": 3,
        "points": 255,
        "note": "3rd+"
      }
    ],
    "flavor": "Ironstrider Ballistarii are swift combat walkers piloted by veteran marksmen. They smoothly pick their way across the battlefield before invoking the fully awakened machine spirits of their weapons to acquire rapidly cogitated firing solutions. Their destructive firepower unleashed, they redeploy to hunt for fresh targets.",
    "profiles": [
      {
        "name": "Ironstrider Ballistarii",
        "m": "10\"",
        "t": "7",
        "sv": "3+",
        "w": "7",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Twin cognis autocannon",
        "tags": [
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "4+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Twin cognis lascannon",
        "tags": [
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      }
    ],
    "melee": [
      {
        "name": "Ironstrider feet",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Elevated Strider",
        "text": "This unit is eligible to shoot in a turn in which it Fell Back or Advanced, and you can re-roll Desperate Escape tests taken for models in this unit."
      },
      {
        "name": "Broad Spectrum Data-tether",
        "text": "Each time you select this unit as the target of a Stratagem, roll one D6: on a 5+, you gain 1CP."
      }
    ],
    "composition": [
      "1-3 Ironstrider Ballistarii"
    ],
    "loadout": "**Every model is equipped with:** twin cognis autocannon; Ironstrider feet.",
    "options": [
      "Any number of models can each have their twin cognis autocannon replaced with 1 twin cognis lascannon."
    ],
    "keywords": [
      "Skitarii",
      "Smoke",
      "Imperium",
      "Ironstrider Ballistarii",
      "Walker",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "105x70mm Oval Base"
  },
  {
    "id": "kastelan-robots",
    "name": "Kastelan Robots",
    "points": [
      {
        "models": 2,
        "points": 160,
        "note": "1st"
      },
      {
        "models": 4,
        "points": 320,
        "note": "1st"
      },
      {
        "models": 2,
        "points": 180,
        "note": "2nd+"
      },
      {
        "models": 4,
        "points": 340,
        "note": "2nd+"
      }
    ],
    "flavor": "Kastelan Robots are giant automata from Mankind’s dark past, shielded with thick armour and advanced force fields. Heeding preprogrammed doctrines without fail, Kastelans are bastions in defence and nigh unstoppable on the attack, unleashing heavy firepower and bludgeoning swipes with their giant fists.",
    "profiles": [
      {
        "name": "Kastelan Robots",
        "m": "6\"",
        "t": "9",
        "sv": "2+",
        "w": "7",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Heavy phosphor blaster",
        "tags": [
          "IGNORES COVER"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Incendine combustor",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Kastelan phosphor blaster",
        "tags": [
          "IGNORES COVER"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin Kastelan phosphor blaster",
        "tags": [
          "IGNORES COVER",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kastelan fist",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Twin Kastelan fist",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "4",
        "ws": "4+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Robotic Bodyguard",
        "text": "While a Cybernetica Datasmith model is leading this unit, that model has the Feel No Pain 4+ ability."
      },
      {
        "name": "Repulsor Grid",
        "text": "When an enemy unit targets this unit with ranged attacks, until that enemy unit has shot, when this unit makes a **save roll**: On an unmodified 6, that enemy unit suffers 1 **mortal wound** after that enemy unit has shot."
      }
    ],
    "composition": [
      "2-4 Kastelan Robots"
    ],
    "loadout": "**Every model is equipped with:** incendine combustor; twin Kastelan fist.",
    "options": [
      "Any number of models can each have their twin Kastelan fist replaced with one of the following:\n▪ 1 Kastelan phosphor blaster and 1 Kastelan fist\n▪ 1 twin Kastelan phosphor blaster and 1 close combat weapon",
      "Any number of models can each have their incendine combustor replaced with 1 heavy phosphor blaster."
    ],
    "keywords": [
      "Kastelan Robots",
      "Legio Cybernetica",
      "Walker",
      "Imperium",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "kataphron-breachers",
    "name": "Kataphron Breachers",
    "points": [
      {
        "models": 3,
        "points": 150
      },
      {
        "models": 6,
        "points": 310
      }
    ],
    "flavor": "Kataphron Breachers are large battle servitors that grind forward on heavy tracks. They are ideal tools for smashing open enemy battle lines and bastions with blasts from heavy weapons and blows from combat attachments, while any enemy firepower is deflected by thick armour and absorbed by layered bionics.",
    "profiles": [
      {
        "name": "Kataphron Breachers",
        "m": "5\"",
        "t": "7",
        "sv": "3+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Heavy arc rifle",
        "tags": [
          "ANTI-VEHICLE 4+",
          "RAPID FIRE 2"
        ],
        "range": "30\"",
        "a": "2",
        "bs": "4+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Torsion cannon",
        "tags": [
          "ANTI-INFANTRY 2+",
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "4+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Arc claw",
        "tags": [
          "ANTI-VEHICLE 4+"
        ],
        "a": "4",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Hydraulic claw",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Breaching Command",
        "text": "Each time a model in this unit makes an attack, re-roll a Hit roll of 1. While this unit is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, you can re-roll the Hit roll instead."
      }
    ],
    "composition": [
      "3-6 Kataphron Breachers"
    ],
    "loadout": "**Every model is equipped with:** heavy arc rifle; arc claw.",
    "options": [
      "Any number of models can each have their heavy arc rifle replaced with 1 torsion cannon.",
      "Any number of models can each have their arc claw replaced with 1 hydraulic claw."
    ],
    "keywords": [
      "Infantry",
      "Breachers",
      "Kataphron",
      "Cult Mechanicus",
      "Imperium"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "kataphron-destroyers",
    "name": "Kataphron Destroyers",
    "points": [
      {
        "models": 3,
        "points": 100
      },
      {
        "models": 6,
        "points": 200
      }
    ],
    "flavor": "These biomechanical constructs operate as mobile heavy weapons platforms, bearing large esoteric cannons as well as close defence armaments. Their ballistic subroutines can be directed to operate independently of preprogrammed battle protocols, making them flexible tools of destruction.",
    "profiles": [
      {
        "name": "Kataphron Destroyers",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Cognis flamer",
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
        "name": "Heavy grav-cannon",
        "tags": [
          "ANTI-VEHICLE 2+"
        ],
        "range": "30\"",
        "a": "4",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Kataphron plasma culverin – standard",
        "tags": [],
        "range": "36\"",
        "a": "4",
        "bs": "4+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Kataphron plasma culverin – supercharge",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "4",
        "bs": "4+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Phosphor blaster",
        "tags": [
          "IGNORES COVER",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
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
        "ws": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Sentinel Directives",
        "text": "Each time you target this unit with the Fire Overwatch Stratagem, hits are scored on unmodified Hit rolls of 5+ when resolving that Stratagem."
      }
    ],
    "composition": [
      "3-6 Kataphron Destroyers"
    ],
    "loadout": "**Every model is equipped with:** heavy grav-cannon; phosphor blaster; close combat weapon.",
    "options": [
      "Any number of models can each have their heavy grav-cannon replaced with 1 Kataphron plasma culverin.",
      "Any number of models can each have their phosphor blaster replaced with 1 cognis flamer."
    ],
    "keywords": [
      "Cult Mechanicus",
      "Imperium",
      "Kataphron",
      "Infantry",
      "Destroyers"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "onager-dunecrawler",
    "name": "Onager Dunecrawler",
    "points": [
      {
        "models": 1,
        "points": 155
      }
    ],
    "flavor": "The Onager Dunecrawler’s flexible armaments can blast apart squadrons of aircraft or atomise elite infantry in beams of blinding energy. They are versatile heavy weapons platforms, well-shielded and easily able to advance alongside Skitarii as their multiple limbs propel them over treacherous obstacles.",
    "profiles": [
      {
        "name": "Onager Dunecrawler",
        "m": "8\"",
        "t": "10",
        "sv": "2+",
        "w": "11",
        "ld": "7+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Cognis heavy stubber",
        "tags": [
          "RAPID FIRE 3",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Daedalus missile launcher",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "4+",
        "s": "10",
        "ap": "-2",
        "d": "D6+1"
      },
      {
        "name": "Eradication beamer – dissipated",
        "tags": [
          "BLAST",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3D3",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Eradication beamer – focused",
        "tags": [
          "BLAST",
          "SUSTAINED HITS 1"
        ],
        "range": "18\"",
        "a": "3D3",
        "bs": "4+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Neutron laser",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "4+",
        "s": "16",
        "ap": "-4",
        "d": "D6+2"
      },
      {
        "name": "Icarus array",
        "tags": [
          "ANTI-FLY 4+",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "6",
        "bs": "4+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin Onager heavy phosphor blaster",
        "tags": [
          "IGNORES COVER",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "12",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Dunecrawler legs",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Emanatus Force Field (Aura)",
        "text": "While a friendly ADEPTUS MECHANICUS BATTLELINE model is wholly within 6\" of this model, that BATTLELINE model has a 4+ invulnerable save against ranged attacks."
      },
      {
        "name": "Scuttling Walker",
        "text": "Each time this model makes a Normal, Advance or Fall Back move, it can move through friendly Monster and Vehicle models and sections of terrain features that are 4\" or less in height."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Broad spectrum data-tether",
        "text": "The bearer loses the SMOKE keyword, but each time you target the bearer with a Stratagem, roll one D6: on a 5+, you gain 1CP."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Onager Dunecrawler"
    ],
    "loadout": "**This model is equipped with:** eradication beamer; Dunecrawler legs.",
    "options": [
      "This model’s eradication beamer can be replaced with one of the following:\n▪ 1 daedalus missile launcher and 1 Icarus array\n▪ 1 neutron laser and 1 cognis heavy stubber\n▪ 1 twin Onager heavy phosphor blaster",
      "This model can be equipped with 1 additional cognis heavy stubber.",
      "This model can be equipped with 1 broad spectrum data-tether."
    ],
    "keywords": [
      "Vehicle",
      "Walker",
      "Imperium",
      "Skitarii",
      "Smoke",
      "Onager Dunecrawler"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "130mm"
  },
  {
    "id": "pteraxii-skystalkers",
    "name": "Pteraxii Skystalkers",
    "points": [
      {
        "models": 5,
        "points": 80,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 150,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 90,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 160,
        "note": "3rd+"
      }
    ],
    "flavor": "Pteraxii Skystalkers have their consciousness pared back until little but their optimised reactions remain. They are manoeuvrable and preternatural airborne hunters, who track their prey from choice vantage points before swooping in to unleash withering hails of razor-sharp flechettes.",
    "profiles": [
      {
        "name": "Pteraxii Skystalkers",
        "m": "12\"",
        "t": "4",
        "sv": "4+",
        "w": "2",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Flechette blaster",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "5",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Flechette carbine",
        "tags": [],
        "range": "18\"",
        "a": "6",
        "bs": "4+",
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
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Taser goad",
        "tags": [
          "SUSTAINED HITS 2"
        ],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Ride the Thermals",
        "text": "In your Shooting phase, after this unit has shot, if it is not within Engagement Range of one or more enemy units, it can do one of the following:\n▪ Make a Normal move of up to 6\".\n▪ Make a Normal move of up to 12\", provided every model in this unit ends that move wholly within 6\" of one or more friendly Adeptus Mechanicus Battleline units.\nIn either case, if it does, until the end of the turn, this unit is not eligible to declare a charge."
      }
    ],
    "composition": [
      "1 Pteraxii Skystalker Alpha",
      "4-9 Pteraxii Skystalkers"
    ],
    "loadout": "**The Pteraxii Skystalker Alpha model is equipped with:** flechette blaster; taser goad.\n\n**Every Pteraxii Skystalker model is equipped with:** flechette carbine; close combat weapon.",
    "keywords": [
      "Fly",
      "Infantry",
      "Skystalkers",
      "Pteraxii",
      "Skitarii",
      "Imperium",
      "Grenades",
      "Jump Pack"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "pteraxii-sterylizors",
    "name": "Pteraxii Sterylizors",
    "points": [
      {
        "models": 5,
        "points": 80,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 160,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 90,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 170,
        "note": "3rd+"
      }
    ],
    "flavor": "Sterylizors are eradicators of cybernetic parasite organisms within ships and manufactorums, and eagerly unleash the chemical fire of their phosphor torches upon the Machine God’s foes. They descend in flocks from the sky upon membranous wing-packs, their vicious talons primed, eager to see their enemies writhe in flames.",
    "profiles": [
      {
        "name": "Pteraxii Sterylizors",
        "m": "12\"",
        "t": "4",
        "sv": "4+",
        "w": "2",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Flechette blaster",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "5",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Phosphor torch",
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
      }
    ],
    "melee": [
      {
        "name": "Pteraxii talons",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Taser goad",
        "tags": [
          "SUSTAINED HITS 2"
        ],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Searing Conflagration",
        "text": "Each time a model in this unit makes an attack with a phosphor torch that targets an enemy unit within range of an objective marker, re-roll a Wound roll of 1. If this unit is also within 6\" of one or more friendly ADEPTUS MECHANICUS BATTLELINE units, each time such an attack targets such a unit, you can re-roll the Wound roll instead."
      }
    ],
    "composition": [
      "1 Pteraxii Sterylizor Alpha",
      "4-9 Pteraxii Sterylizors"
    ],
    "loadout": "**The Pteraxii Sterylizor Alpha model is equipped with:** flechette blaster; Pteraxii talons; taser goad.\n\n**Every Pteraxii Sterylizor model is equipped with:** phosphor torch; Pteraxii talons.",
    "keywords": [
      "Sterylizors",
      "Pteraxii",
      "Skitarii",
      "Imperium",
      "Jump Pack",
      "Fly",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "serberys-raiders",
    "name": "Serberys Raiders",
    "points": [
      {
        "models": 3,
        "points": 60
      },
      {
        "models": 6,
        "points": 110
      }
    ],
    "flavor": "Long-range scouts and outriders, Raiders of the Serberys Corps employ advanced suites of sensors within their cybercanid mounts to identify enemy interlopers. They maintain punishing rates of carbine fire while moving at high speed, and when their prey can run no more, Raiders draw their sabres and charge into the fray.",
    "profiles": [
      {
        "name": "Serberys Raiders",
        "m": "12\"",
        "t": "4",
        "sv": "4+",
        "w": "2",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Mechanicus pistol",
        "tags": [
          "DEVASTATING WOUNDS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Galvanic carbine",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Cavalry sabre and clawed limbs",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Scouts 9\"",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Tactica Obliqua",
        "text": "In your opponent's Movement phase, if an enemy unit ends a move within 8” of this unit, if this unit is not within Engagement Range of one or more enemy units, it can do one of the following: ■ Make a Normal move of up to D6\" ■ Make a Normal move of up to 6\" provided every model in this unit ends that move wholly within 6\" of one or more friendly **ADEPTUS MECHANICUS BATTLELINE** units."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Enhanced data-tether",
        "text": "Each time you select the bearer’s unit as the target of a Stratagem, roll one D6: on a 5+, you gain 1CP."
      }
    ],
    "composition": [
      "1 Serberys Raider Alpha",
      "2-5 Serberys Raiders"
    ],
    "loadout": "**The Serberys Raider Alpha model is equipped with:** Mechanicus pistol; galvanic carbine; cavalry sabre and clawed limbs.\n\n**Every Serberys Raider model is equipped with:** galvanic carbine; cavalry sabre and clawed limbs.",
    "options": [
      "1 Serberys Raider can be equipped with 1 enhanced data-tether."
    ],
    "keywords": [
      "Mounted",
      "Imperium",
      "Skitarii",
      "Serberys Raiders"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "60x35.5mm Oval Base"
  },
  {
    "id": "serberys-sulphurhounds",
    "name": "Serberys Sulphurhounds",
    "points": [
      {
        "models": 3,
        "points": 55
      },
      {
        "models": 6,
        "points": 100
      }
    ],
    "flavor": "Sulphurhound cavalry squadrons are aggressive shock troops and line-breakers. The loping, mechanical beasts breathe gouts of incinerating phosphor and disembowel the foe with slashing claws, while the elite Skitarii riders unload incandescent pistol fire as they smash through defence lines, before circling back for survivors.",
    "profiles": [
      {
        "name": "Serberys Sulphurhounds",
        "m": "12\"",
        "t": "4",
        "sv": "4+",
        "w": "2",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Mechanicus pistol",
        "tags": [
          "PISTOL",
          "DEVASTATING WOUNDS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Phosphor blast carbine",
        "tags": [
          "BLAST",
          "IGNORES COVER"
        ],
        "range": "18\"",
        "a": "D6",
        "bs": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Phosphor pistol",
        "tags": [
          "IGNORES COVER",
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
        "name": "Sulphur breath",
        "tags": [
          "IGNORES COVER",
          "PISTOL",
          "TORRENT"
        ],
        "range": "9\"",
        "a": "D6",
        "bs": "N/A",
        "s": "3",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Cavalry arc maul",
        "tags": [
          "ANTI-VEHICLE 4+",
          "DEVASTATING WOUNDS",
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Clawed limbs",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Line-breakers",
        "text": "Each time this unit ends a Charge move, select one enemy unit within Engagement Range of it and roll one D6 for each model in this unit that is within Engagement Range of that enemy unit, adding 2 to the result if this unit started its Charge move within 6\" of one or more friendly ADEPTUS MECHANICUS BATTLELINE units. For each 4+, that enemy unit suffers 1 mortal wound."
      }
    ],
    "composition": [
      "1 Serberys Sulphurhound Alpha",
      "2-5 Serberys Sulphurhounds"
    ],
    "loadout": "**The Serberys Sulphurhound Alpha model is equipped with:** Mechanicus pistol; sulphur breath; cavalry arc maul; clawed limbs.\n\n**Every Serberys Sulphurhound model is equipped with:** 2 phosphor pistols; sulphur breath; clawed limbs.",
    "options": [
      "For every 3 models in this unit, 1 Serberys Sulphurhound’s 2 phosphor pistols can be replaced with 1 phosphor blast carbine and 1 phosphor pistol."
    ],
    "keywords": [
      "Imperium",
      "Mounted",
      "Serberys Sulphurhounds",
      "Skitarii"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "60x35.5mm Oval Base"
  },
  {
    "id": "servitor-battleclade",
    "name": "Servitor Battleclade",
    "points": [
      {
        "models": 9,
        "points": 65
      }
    ],
    "flavor": "Servitor Battleclades provide their Adeptus Mechanicus masters with expendable and extremely versatile combat assets in the field. Often sent to recover vital archeotech or data, their mix of firepower, close quarters punch, and array of servo-tools allows their Underseers to achieve whatever task is assigned to them.",
    "profiles": [
      {
        "name": "Servitor Underseer",
        "m": "6\"",
        "t": "4",
        "sv": "4+",
        "w": "2",
        "ld": "7+",
        "oc": "1",
        "inv": "6+",
        "baseSize": "32mm"
      },
      {
        "name": "Combat Servitors and Gun Servitors",
        "m": "6\"",
        "t": "4",
        "sv": "4+",
        "w": "1",
        "ld": "8+",
        "oc": "1",
        "inv": "6+",
        "baseSize": "32mm / 25mm"
      }
    ],
    "ranged": [
      {
        "name": "Heavy arc rifle",
        "tags": [
          "ANTI-VEHICLE 4+",
          "RAPID FIRE 1"
        ],
        "range": "30\"",
        "a": "1",
        "bs": "4+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Heavy bolter",
        "tags": [
          "HEAVY",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Incendine igniter",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Mechanicus pistol",
        "tags": [
          "DEVASTATING WOUNDS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Meltagun",
        "tags": [
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Phosphor blaster",
        "tags": [
          "IGNORES COVER",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Dataspikes",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Servo-claw",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Network Override",
        "text": "While this unit contains one or more Tech-Priest models, this unit is:\n▪ Eligible to perform an Action in a turn in which it Advanced.\n▪ Eligible to shoot in a turn in which it started an Action."
      }
    ],
    "specialAbilities": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a Character unit from your army with the Leader ability can be attached to a Kataphron Breachers unit, it can be attached to this unit instead."
      }
    ],
    "composition": [
      "1 Servitor Underseer",
      "2 Gun Servitors",
      "6 Combat Servitors"
    ],
    "loadout": "**The Servitor Underseer is equipped with:** Mechanicus pistol; dataspikes.\n\n**1 Gun Servitor is equipped with:** heavy arc rifle; servo-claw.\n\n**1 Gun Servitor is equipped with:** heavy bolter; servo-claw.\n\n**Every Combat Servitor is equipped with:** phosphor blaster; servo-claw.",
    "options": [
      "1 Combat Servitor model can have its 1 phosphor blaster replaced with 1 meltagun.",
      "Up to 3 Combat Servitor models can each have their 1 phosphor blaster replaced with 1 incendine igniter."
    ],
    "keywords": [
      "Tech-Priest",
      "Infantry",
      "Imperium",
      "Cult Mechanicus",
      "Servitor Battleclade"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ]
  },
  {
    "id": "sicarian-infiltrators",
    "name": "Sicarian Infiltrators",
    "points": [
      {
        "models": 5,
        "points": 75,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 155,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 85,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 165,
        "note": "3rd+"
      }
    ],
    "flavor": "Sicarian Infiltrators broadcast disruptive frequencies that scramble augurs and painfully disrupt enemy senses. Thus obscured, the Infiltrators perform reconnaissance and outflanking missions, intensifying their sensory barrage to crash enemy comms and attack unseen through the resultant anarchy.",
    "profiles": [
      {
        "name": "Sicarian Infiltrators",
        "m": "8\"",
        "t": "4",
        "sv": "4+",
        "w": "2",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Flechette blaster",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "5",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Stubcarbine",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Power weapon",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Taser goad",
        "tags": [
          "SUSTAINED HITS 2"
        ],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Stealth",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Voices in the Code",
        "text": "At the start of the Fight phase, each enemy unit within Engagement Range of one or more units with this ability must take a Battle-shock test."
      },
      {
        "name": "Neurostatic Interference (Aura)",
        "text": "While an enemy unit is within 6\" of this unit, each time a Battle-shock or Leadership test is taken for that unit, subtract 1 from that test. While this unit is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 2 from that test instead."
      }
    ],
    "composition": [
      "1 Sicarian Infiltrator Princeps",
      "4-9 Sicarian Infiltrators"
    ],
    "loadout": "**Every model is equipped with:** stubcarbine; power weapon.",
    "options": [
      "Any number of models can each have their stubcarbine and power weapon replaced with 1 flechette blaster and 1 taser goad."
    ],
    "keywords": [
      "Infantry",
      "Skitarii",
      "Sicarian",
      "Infiltrators",
      "Imperium"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "sicarian-ruststalkers",
    "name": "Sicarian Ruststalkers",
    "points": [
      {
        "models": 5,
        "points": 75,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 160,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 85,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 170,
        "note": "3rd+"
      }
    ],
    "flavor": "Ruststalkers are unleashed as weapons of fear, to hunt down errant servo units and heretic blasphemers, or to pounce on isolated hostile units and assassinate enemy leaders. Like their fellow Sicarians, Ruststalkers’ stilt-like limbs enable them to run down their prey before carving them apart with micro-vibrating transonic blades.",
    "profiles": [
      {
        "name": "Sicarian Ruststalkers",
        "m": "8\"",
        "t": "4",
        "sv": "4+",
        "w": "2",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Transonic blades",
        "tags": [
          "DEVASTATING WOUNDS",
          "PRECISION"
        ],
        "a": "5",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Transonic blades and chordclaw",
        "tags": [
          "ANTI-INFANTRY 3+",
          "DEVASTATING WOUNDS",
          "PRECISION"
        ],
        "a": "5",
        "ws": "4+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Transonic razor and chordclaw",
        "tags": [
          "ANTI-INFANTRY 3+",
          "PRECISION"
        ],
        "a": "3",
        "ws": "4+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Stealth",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Optimised Gait",
        "text": "Add 1 to Advance and Charge rolls made for this unit. While this unit is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, add 2 to Advance and Charge rolls made for this unit instead."
      }
    ],
    "composition": [
      "1 Sicarian Ruststalker Princeps",
      "4-9 Sicarian Ruststalkers"
    ],
    "loadout": "**Every model is equipped with:** transonic razor and chordclaw.",
    "options": [
      "Any number of Sicarian Ruststalkers can each have their transonic razor and chordclaw replaced with 1 transonic blades.",
      "The Sicarian Ruststalker Princeps’ transonic razor and chordclaw can be replaced with 1 transonic blades and chordclaw."
    ],
    "keywords": [
      "Skitarii",
      "Imperium",
      "Infantry",
      "Ruststalkers",
      "Sicarian"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "skitarii-marshal",
    "name": "Skitarii Marshal",
    "points": [
      {
        "models": 1,
        "points": 35
      }
    ],
    "flavor": "Marshals lead the maniples and cohorts of Skitarii soldiery. They are veteran warriors of countless crusades, privileged to bear enhanced augmentations. Marshals stand as intermediaries between Skitarii formations and their priestly masters, employing sacred uplinks to refine their warriors’ doctrines closer to holy perfection.",
    "profiles": [
      {
        "name": "Skitarii Marshal",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Mechanicus pistol",
        "tags": [
          "DEVASTATING WOUNDS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Control stave",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Control Edict",
        "text": "While this model is leading a unit, each time a model in that unit makes an attack, you can re-roll the Hit roll."
      },
      {
        "name": "Servo-skull Uplink",
        "text": "Once per battle, at the start of any phase, you can select one friendly Skitarii unit that is Battle-shocked and within 6\" of this model. That unit is no longer Battle-shocked."
      }
    ],
    "composition": [
      "1 Skitarii Marshal"
    ],
    "loadout": "**This model is equipped with:** Mechanicus pistol; control stave.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Skitarii Vanguard",
        "Hastarii Exterminators",
        "Skitarii Rangers",
        "Hastarii Fusiliers"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Imperium",
      "Skitarii",
      "Marshal"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "skitarii-rangers",
    "name": "Skitarii Rangers",
    "points": [
      {
        "models": 10,
        "points": 85
      }
    ],
    "flavor": "Rangers relentlessly pursue their quarry over months or even years, tracking their prey unto death. They bear antique, long-barrelled galvanic rifles, whose energised ammunition transfers a coruscating charge when it hits, leaving the prey a smoking husk while the Rangers are already lining up their next target.",
    "profiles": [
      {
        "name": "Skitarii Rangers",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Mechanicus pistol",
        "tags": [
          "DEVASTATING WOUNDS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Arc rifle",
        "tags": [
          "ANTI-VEHICLE 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "30\"",
        "a": "1",
        "bs": "4+",
        "s": "8",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Galvanic rifle",
        "tags": [],
        "range": "30\"",
        "a": "2",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Plasma caliver – standard",
        "tags": [],
        "range": "30\"",
        "a": "2",
        "bs": "4+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma caliver – supercharge",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "30\"",
        "a": "2",
        "bs": "4+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Transuranic arquebus",
        "tags": [
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "4+",
        "s": "7",
        "ap": "-2",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Alpha combat weapon",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
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
    "core": "Scouts 6\"",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Objective Scouted",
        "text": "At the end of your Command phase, if this unit is within range of an objective marker you control, that objective marker remains under your control until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Enhanced data-tether",
        "text": "Each time you select the bearer’s unit as the target of a Stratagem, roll one D6: on a 5+, you gain 1CP."
      },
      {
        "name": "Omnispex",
        "text": "Ranged weapons equipped by models in the bearer’s unit have the [IGNORES COVER] ability."
      }
    ],
    "composition": [
      "1 Skitarii Ranger Alpha",
      "9 Skitarii Rangers"
    ],
    "loadout": "**Every model is equipped with:** galvanic rifle; close combat weapon.",
    "options": [
      "The Skitarii Ranger Alpha can be equipped with 1 Alpha combat weapon.",
      "The Skitarii Ranger Alpha’s galvanic rifle can be replaced with 1 Mechanicus pistol.",
      "1 Skitarii Ranger’s galvanic rifle can be replaced with 1 arc rifle.",
      "1 Skitarii Ranger’s galvanic rifle can be replaced with 1 plasma caliver.",
      "1 Skitarii Ranger’s galvanic rifle can be replaced with 1 transuranic arquebus.",
      "1 Skitarii Ranger equipped with a galvanic rifle can be equipped with one of the following:\n▪ 1 enhanced data-tether*\n▪ 1 omnispex*\n\n* That model’s galvanic rifle cannot be replaced."
    ],
    "keywords": [
      "Infantry",
      "Battleline",
      "Imperium",
      "Rangers",
      "Skitarii"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "skitarii-vanguard",
    "name": "Skitarii Vanguard",
    "points": [
      {
        "models": 10,
        "points": 85
      }
    ],
    "flavor": "The hyper-irradiated shot unleashed by the Skitarii Vanguard’s carbines ensure those that would otherwise survive the injury still sicken and die. Vanguard are infused with this radiation, emitting a debilitating aura they themselves are inured to. This hardens them to fight in the most toxic war zones to defend the Tech-Priests’ interests.",
    "profiles": [
      {
        "name": "Skitarii Vanguard",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Mechanicus pistol",
        "tags": [
          "DEVASTATING WOUNDS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Arc rifle",
        "tags": [
          "ANTI-VEHICLE 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "30\"",
        "a": "1",
        "bs": "4+",
        "s": "8",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Plasma caliver – standard",
        "tags": [],
        "range": "30\"",
        "a": "2",
        "bs": "4+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma caliver – supercharge",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "30\"",
        "a": "2",
        "bs": "4+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Radium carbine",
        "tags": [
          "ANTI-INFANTRY 4+"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Transuranic arquebus",
        "tags": [
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "4+",
        "s": "7",
        "ap": "-2",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Alpha combat weapon",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
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
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Rad-saturation (Aura)",
        "text": "While an enemy unit (excluding VEHICLE units) is within 3\" of this unit, subtract 1 from the Objective Control characteristic of models in that unit."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Enhanced data-tether",
        "text": "Each time you select the bearer’s unit as the target of a Stratagem, roll one D6: on a 5+, you gain 1CP."
      },
      {
        "name": "Omnispex",
        "text": "Ranged weapons equipped by models in the bearer’s unit have the [IGNORES COVER] ability."
      }
    ],
    "composition": [
      "1 Skitarii Vanguard Alpha",
      "9 Skitarii Vanguard"
    ],
    "loadout": "**Every model is equipped with:** radium carbine; close combat weapon.",
    "options": [
      "The Skitarii Vanguard Alpha can be equipped with 1 Alpha combat weapon.",
      "The Skitarii Vanguard Alpha’s radium carbine can be replaced with 1 Mechanicus pistol.",
      "1 Skitarii Vanguard’s radium carbine can be replaced with 1 arc rifle.",
      "1 Skitarii Vanguard’s radium carbine can be replaced with 1 plasma caliver.",
      "1 Skitarii Vanguard’s radium carbine can be replaced with 1 transuranic arquebus.",
      "1 Skitarii Vanguard equipped with a radium carbine can be equipped with one of the following:\n▪ 1 enhanced data-tether*\n▪ 1 omnispex*\n\n* That model’s radium carbine cannot be replaced."
    ],
    "keywords": [
      "Infantry",
      "Battleline",
      "Imperium",
      "Skitarii",
      "Vanguard"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "skorpius-disintegrator",
    "name": "Skorpius Disintegrator",
    "points": [
      {
        "models": 1,
        "points": 160
      }
    ],
    "flavor": "Hovering over the ruins of war on a bed of atomised gases, Skorpius Disintegrators are archaic, front-line battle tanks. They surge forward in unstoppable armoured waves and support infantry advances, maintaining blistering salvoes of fire to cripple enemy war engines and sweep aside hordes of lesser foes.",
    "profiles": [
      {
        "name": "Skorpius Disintegrator",
        "m": "10\"",
        "t": "10",
        "sv": "2+",
        "w": "12",
        "ld": "7+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Belleros energy cannon",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "36\"",
        "a": "2D6",
        "bs": "4+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Cognis heavy stubber",
        "tags": [
          "RAPID FIRE 3",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Disruptor missile launcher",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Ferrumite cannon",
        "tags": [],
        "range": "48\"",
        "a": "3",
        "bs": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
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
    "core": "Deadly Demise D3",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Broad Spectrum Data-tether",
        "text": "Each time you select this model as the target of a Stratagem, roll one D6: on a 5+, you gain 1CP."
      },
      {
        "name": "Blistering Salvoes",
        "text": "Each time this model makes an attack with a belleros energy cannon that targets an INFANTRY unit, add 1 to the Hit roll. Each time this model makes an attack with a ferrumite cannon that targets a MONSTER or VEHICLE unit, add 1 to the Hit roll."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Skorpius Disintegrator"
    ],
    "loadout": "**This model is equipped with:** belleros energy cannon; 3 cognis heavy stubbers; disruptor missile launcher; armoured hull.",
    "options": [
      "This model’s belleros energy cannon can be replaced with 1 ferrumite cannon."
    ],
    "keywords": [
      "Skitarii",
      "Smoke",
      "Vehicle",
      "Imperium",
      "Skorpius Disintegrator",
      "Frame"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "skorpius-dunerider",
    "name": "Skorpius Dunerider",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "Skorpius Duneriders enable forge lords to ferry squads of their cyborg infantry onto the front lines, overwhelming the foe through swiftly redeployed weight of numbers. Duneriders sweep onto enemy defences in a cloud of chemical smoke, saturating the area with heavy calibre shot as their payload of warriors disembarks.",
    "profiles": [
      {
        "name": "Skorpius Dunerider",
        "m": "12\"",
        "t": "9",
        "sv": "3+",
        "w": "11",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Cognis heavy stubber array",
        "tags": [
          "RAPID FIRE 9",
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "9",
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
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Firing Deck 2",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Broad Spectrum Data-tether",
        "text": "Each time you select this model as the target of a Stratagem, roll one D6: on a 5+, you gain 1CP."
      },
      {
        "name": "Fire Support",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit it scored one or more hits against this phase. Until the end of the phase, each time a friendly model that disembarked from this Transport this turn makes an attack that targets that enemy unit, you can re-roll the Wound roll."
      }
    ],
    "composition": [
      "1 Skorpius Dunerider"
    ],
    "loadout": "**This model is equipped with:** cognis heavy stubber array; armoured hull.",
    "transport": "This model has a transport capacity of 12 Adeptus Mechanicus Infantry models. It cannot transport Jump Pack, Kataphron or Sydonian Skatros models.",
    "keywords": [
      "Vehicle",
      "Transport",
      "Dedicated Transport",
      "Imperium",
      "Skitarii",
      "Smoke",
      "Skorpius Dunerider",
      "Frame"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "sydonian-dragoons-with-radium-jezzails",
    "name": "Sydonian Dragoons With Radium Jezzails",
    "points": [
      {
        "models": 1,
        "points": 55
      },
      {
        "models": 2,
        "points": 100
      },
      {
        "models": 3,
        "points": 150
      }
    ],
    "flavor": "Striding through a mist of their own sacred incense, the long-limbed engines ridden by Sydonian Dragoons are forever in motion. Dragoons mark their quarry with shots of glowing phosphor or irradiated slugs, allowing them to detect their prey through the cloying mist and home in on them with a thunderous stampede.",
    "profiles": [
      {
        "name": "Sydonian Dragoons",
        "m": "10\"",
        "t": "7",
        "sv": "3+",
        "w": "7",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Phosphor serpenta",
        "tags": [
          "IGNORES COVER",
          "PISTOL"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Radium jezzail",
        "tags": [
          "ANTI-INFANTRY 3+",
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "4+",
        "s": "5",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Ironstrider feet",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1, Stealth",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Focused Hunters",
        "text": "At the start of the battle, select one unit from your opponent’s army. Until the end of the battle, each time a model in this unit makes an attack that targets that unit, you can re-roll the Hit roll."
      },
      {
        "name": "Broad Spectrum Data-tether",
        "text": "Each time you select this unit as the target of a Stratagem, roll one D6: on a 5+, you gain 1CP."
      }
    ],
    "composition": [
      "1-3 Sydonian Dragoons"
    ],
    "loadout": "**Every model is equipped with:** phosphor serpenta; radium jezzail; Ironstrider feet.",
    "keywords": [
      "Vehicle",
      "Sydonian",
      "Skitarii",
      "Imperium",
      "Smoke",
      "Walker",
      "Dragoons With Radium Jezzails"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "105x70mm Oval Base"
  },
  {
    "id": "sydonian-dragoons-with-taser-lances",
    "name": "Sydonian Dragoons With Taser Lances",
    "points": [
      {
        "models": 1,
        "points": 60
      },
      {
        "models": 2,
        "points": 120
      },
      {
        "models": 3,
        "points": 170
      }
    ],
    "flavor": "Striding through a mist of their own sacred incense, the long-limbed engines ridden by Sydonian Dragoons are forever in motion. Dragoons mark their quarry with shots of glowing phosphor or irradiated slugs, allowing them to detect their prey through the cloying mist and home in on them with a thunderous stampede.",
    "profiles": [
      {
        "name": "Sydonian Dragoons",
        "m": "10\"",
        "t": "7",
        "sv": "3+",
        "w": "7",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Phosphor serpenta",
        "tags": [
          "IGNORES COVER",
          "PISTOL"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Taser lance",
        "tags": [
          "ANTI-WALKER 2+",
          "LANCE",
          "SUSTAINED HITS 2"
        ],
        "a": "4",
        "ws": "4+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise 1, Stealth",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Dynamic Efficiency",
        "text": "This unit is eligible to declare a charge in a turn in which it Advanced or Fell Back, and you can re-roll Desperate Escape tests taken for models in this unit."
      },
      {
        "name": "Broad Spectrum Data-tether",
        "text": "Each time you select this unit as the target of a Stratagem, roll one D6: on a 5+, you gain 1CP."
      }
    ],
    "composition": [
      "1-3 Sydonian Dragoons"
    ],
    "loadout": "**Every model is equipped with:** phosphor serpenta; taser lance.",
    "keywords": [
      "Imperium",
      "Smoke",
      "Walker",
      "Vehicle",
      "Dragoons With Taser Lances",
      "Sydonian",
      "Skitarii"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "105x70mm Oval Base"
  },
  {
    "id": "sydonian-skatros",
    "name": "Sydonian Skatros",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "flavor": "A Sydonian Skatros is a sinister sentinel, unmoving until the enemy strays into the sniper’s sights. With protocol-driven precision and an advanced scanner known as the achillan eye, they lock on to their foes’ weak points and unleash pinpoint fire that sows panic and agony, the better to erode enemy morale.",
    "profiles": [
      {
        "name": "Sydonian Skatros",
        "m": "8\"",
        "t": "4",
        "sv": "4+",
        "w": "4",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Mechanicus pistol",
        "tags": [
          "DEVASTATING WOUNDS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Radium jezzail",
        "tags": [
          "ANTI-INFANTRY 3+",
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Skatros transuranic arquebus",
        "tags": [
          "ANTI-MONSTER 4+",
          "ANTI-VEHICLE 4+",
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Sydonian feet",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Lone Operative, Stealth",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Dread Snipers",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. That unit must take a Battle-shock test."
      },
      {
        "name": "Achillan Eye",
        "text": "Each time this model makes an attack with a radium jezzail that targets an INFANTRY unit, you can re-roll the Wound roll. Each time this model makes an attack with a Skatros transuranic arquebus that targets a MONSTER or VEHICLE unit, you can re-roll the Wound roll."
      }
    ],
    "composition": [
      "1 Sydonian Skatros"
    ],
    "loadout": "**This model is equipped with:** Mechanicus pistol; radium jezzail; Sydonian feet.",
    "options": [
      "This model’s radium jezzail can be replaced with 1 Skatros transuranic arquebus."
    ],
    "keywords": [
      "Infantry",
      "Skitarii",
      "Character",
      "Imperium",
      "Skatros",
      "Sydonian"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "40mm",
    "rules": [
      {
        "name": "SYDONIAN SENTINEL",
        "text": "This model cannot be your WARLORD"
      }
    ]
  },
  {
    "id": "tech-priest-dominus",
    "name": "Tech-priest Dominus",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "flavor": "Tech-Priests Dominus are the theocratic generals of a forge world’s armies. They lead congregations of warriors in binharic prayer and direct those beneath them with precision strategies. They are masters of machines, as capable of healing damage to their creations as they are at destroying the enemy’s corrupted engines.",
    "profiles": [
      {
        "name": "Tech-priest Dominus",
        "m": "6\"",
        "t": "4",
        "sv": "2+",
        "w": "4",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Eradication ray – dissipated",
        "tags": [],
        "range": "24\"",
        "a": "D3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Eradication ray – focused",
        "tags": [],
        "range": "12\"",
        "a": "D3",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Macrostubber",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "5",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Phosphor serpenta",
        "tags": [
          "IGNORES COVER",
          "PISTOL"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Volkite blaster",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Omnissian axe",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Lord of the Machine Cult",
        "text": "While this model is leading a unit, models in that unit have the Feel No Pain 5+ ability. If that unit has the Electro-Priests keyword, models in that unit have the Feel No Pain 4+ ability instead."
      },
      {
        "name": "Dataspike",
        "text": "At the start of the Fight phase, you can select one enemy VEHICLE unit within Engagement Range of this model’s unit and roll one D6: on a 4+, that enemy unit suffers D6 mortal wounds and, until the end of the phase, the Weapon Skill characteristic of melee weapons equipped by that enemy unit is worsened by 1."
      }
    ],
    "composition": [
      "1 Tech-Priest Dominus"
    ],
    "loadout": "**This model is equipped with:** macrostubber; volkite blaster; Omnissian axe.",
    "options": [
      "This model’s macrostubber can be replaced with 1 phosphor serpenta.",
      "This model’s volkite blaster can be replaced with 1 eradication ray."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Hastarii Fusiliers",
        "Skitarii Rangers",
        "Skitarii Vanguard",
        "Kataphron Destroyers",
        "Kataphron Breachers",
        "Servitor Battleclade",
        "Hastarii Exterminators",
        "Fulgurite Electro-priests",
        "Corpuscarii Electro-priests"
      ]
    },
    "keywords": [
      "Imperium",
      "Infantry",
      "Dominus",
      "Tech-Priest",
      "Cult Mechanicus",
      "Character"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "tech-priest-enginseer",
    "name": "Tech-priest Enginseer",
    "points": [
      {
        "models": 1,
        "points": 55
      }
    ],
    "flavor": "The most widespread of a forge world’s priesthood, Enginseers maintain many of the Imperium’s mechanisms, such as reactors, battle tanks and even starships. They have an intuitive connection with holy apparatuses, and can awaken the most recalcitrant of engine spirits with whispered machine cant.",
    "profiles": [
      {
        "name": "Tech-priest Enginseer",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Mechanicus pistol",
        "tags": [
          "DEVASTATING WOUNDS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Omnissian axe",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Servo-arm",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "4+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Enginseer",
        "text": "While this model is within 3\" of one or more friendly Adeptus Mechanicus Vehicle units, unless it is leading a unit, this model has the Lone Operative ability."
      },
      {
        "name": "Omnissiah’s Blessing",
        "text": "In your Command phase, select one friendly **ADEPTUS MECHANICUS** model within 3\" of this model. That model regains up to D3 lost wounds and, if it is a **VEHICLE** model, until the start of your next Command phase, that model has the Feel No Pain 5+ ability. Each model can only be selected for this ability once per Command phase"
      },
      {
        "name": "Vengeance for the Omnissiah",
        "text": "If a friendly Adeptus Mechanicus Vehicle model is destroyed within 12\" of this model, until the end of the battle, this model’s Omnissian axe has an Attacks characteristic of 6."
      }
    ],
    "composition": [
      "1 Tech-Priest Enginseer"
    ],
    "loadout": "**This model is equipped with:** Mechanicus pistol; Omnissian axe; servo-arm.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Corpuscarii Electro-priests",
        "Fulgurite Electro-priests",
        "Kataphron Breachers",
        "Kataphron Destroyers",
        "Skitarii Rangers",
        "Skitarii Vanguard"
      ]
    },
    "keywords": [
      "Infantry",
      "Cult Mechanicus",
      "Enginseer",
      "Tech-Priest",
      "Character",
      "Imperium"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "tech-priest-manipulus",
    "name": "Tech-priest Manipulus",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "Amongst the augmentations of a Tech-Priest Manipulus is a galvanic cell from which they channel powerful charges of the Motive Force. They drain power sources dry and use the energy to overcharge the cells of their warriors’ armaments, all while defending their divine work with blasts from their own arcane weapons.",
    "profiles": [
      {
        "name": "Tech-priest Manipulus",
        "m": "6\"",
        "t": "4",
        "sv": "2+",
        "w": "4",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Magnarail lance",
        "tags": [
          "HEAVY"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Transonic cannon",
        "tags": [
          "DEVASTATING WOUNDS",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "4",
        "ap": "0",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Omnissian staff",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Galvanic Field",
        "text": "While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability."
      },
      {
        "name": "Defend the Divine Work",
        "text": "Once per battle, at the start of any phase, this model can use this ability. If it does, until the end of the phase, models in this model’s unit have a 4+ invulnerable save."
      }
    ],
    "composition": [
      "1 Tech-Priest Manipulus"
    ],
    "loadout": "**This model is equipped with:** magnarail lance; Omnissian staff.",
    "options": [
      "This model’s magnarail lance can be replaced with 1 transonic cannon."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Hastarii Fusiliers",
        "Skitarii Rangers",
        "Skitarii Vanguard",
        "Kataphron Destroyers",
        "Kataphron Breachers",
        "Servitor Battleclade",
        "Hastarii Exterminators",
        "Fulgurite Electro-priests",
        "Corpuscarii Electro-priests"
      ]
    },
    "keywords": [
      "Character",
      "Infantry",
      "Imperium",
      "Manipulus",
      "Tech-Priest",
      "Cult Mechanicus"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "technoarcheologist",
    "name": "Technoarcheologist",
    "points": [
      {
        "models": 1,
        "points": 45
      }
    ],
    "flavor": "Technoarcheologists are seekers of divine arcana, driven to uncover that which is hidden and to analyse its capabilities. Hardened to life on the Imperium’s dangerous frontiers, these priests employ cogitative instincts to detect approaching foes and awaken their servitor guardians to effective modes of attack.",
    "profiles": [
      {
        "name": "Technoarcheologist",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Mechanicus pistol",
        "tags": [
          "DEVASTATING WOUNDS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Servo-arc claw",
        "tags": [
          "ANTI-VEHICLE 4+",
          "DEVASTATING WOUNDS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Seekers of Divine Arcana",
        "text": "While this model is leading a unit, add 1 to the Objective Control characteristic of models in that unit."
      },
      {
        "name": "Cogitative Instincts",
        "text": "Enemy units that are set up on the battlefield as Reinforcements cannot be set up within 12\" horizontally of this model."
      }
    ],
    "composition": [
      "1 Technoarcheologist"
    ],
    "loadout": "**This model is equipped with:** Mechanicus pistol; servo-arc claw.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Hastarii Fusiliers",
        "Skitarii Rangers",
        "Skitarii Vanguard",
        "Kataphron Destroyers",
        "Kataphron Breachers",
        "Servitor Battleclade",
        "Hastarii Exterminators",
        "Corpuscarii Electro-priests",
        "Fulgurite Electro-priests"
      ]
    },
    "keywords": [
      "Tech-Priest",
      "Infantry",
      "Character",
      "Imperium",
      "Cult Mechanicus",
      "Technoarcheologist"
    ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "thulia-ghuld",
    "name": "Thulia Ghuld",
    "points": [
      {
        "models": 1,
        "points": 180
      }
    ],
    "flavor": "An avatar of the Omnissiah’s martial aspect, Thulia Ghuld commands fanatical devotion from the Martian cohorts she leads to war. With her Jericho-class conversion resonator, she blasts swathes of enemies into scattering sonic energy, while her Rod of the War Forge beams out carrier waves to goad her warriors into battle.",
    "profiles": [
      {
        "name": "Thulia Ghuld",
        "m": "8\"",
        "t": "8",
        "sv": "2+",
        "w": "10",
        "ld": "6+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Jericho-class conversion resonator – titanic impact",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Jericho-class conversion resonator – shockwave",
        "tags": [
          "BLAST",
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "D6+2",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Rod of the War Forge – strike",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Rod of the War Forge – sweep",
        "tags": [],
        "a": "12",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "faction": "Doctrina Imperatives",
    "abilities": [
      {
        "name": "Rod of the War Forge",
        "text": "In your Command phase, select one of the abilities in the Icon of War section. Until the start of your next Command phase, this model has that ability."
      },
      {
        "name": "Mechanicus Bodyguard",
        "text": "While this model is within 3\" of one or more other friendly ADEPTUS MECHANICUS units, this model has the Lone Operative ability."
      },
      {
        "name": "Cybernetic Augmentation",
        "text": "This model can move through terrain features, but cannot end a move within a wall, a floor, etc. This model can be set up or end a move on any floor level of RUINS, but if that level is not the ground floor, it can only do so if its base does not overhang the floor at that level."
      },
      {
        "name": "Secutor of Olympus",
        "text": "At the start of your Shooting phase, select one enemy VEHICLE unit within 12\" of this model and roll one D6: on a 2+, that enemy unit suffers D3+1 mortal wounds."
      }
    ],
    "composition": [
      "1 Archmagos Terminus Thulia Ghuld – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Jericho-class conversion resonator; Rod of the War Forge.",
    "keywords": [
      "Character",
      "Cult Mechanicus",
      "Epic Hero",
      "Imperium",
      "Mobile",
      "Monster",
      "Tech-Priest",
      "Thulia Ghuld"
        ],
    "factionKeywords": [
      "Adeptus Mechanicus"
    ],
    "baseSize": "80mm",
    "rules": [
      {
        "name": "SUPREME COMMANDER",
        "text": "If this model is in your army, it must be your Warlord."
      }
    ],
    "abilitySets": [
      {
        "name": "Rod of the War Forge",
        "options": [
          {
            "name": "Fanatical Devotion",
            "text": "You can select one friendly Skitarii or THULIA GHULD unit within 6\" of this model; until the start of your next Command phase, that unit is eligible to shoot and declare a charge in a turn in which it Advanced."
          },
          {
            "name": "Adaptive Tactics",
            "text": "You can select one friendly Skitarii or THULIA GHULD unit within 6\" of this model; until the start of your next Command phase, that unit is eligible to shoot and declare a charge in a turn in which it Fell Back."
          },
          {
            "name": "The Fires of Mars",
            "text": "You can select one friendly Skitarii or THULIA GHULD unit within 6\" of this model; until the start of your next Command phase, the Conqueror Imperative and Protector Imperative are both active for that unit."
          }
        ]
      }
    ]
  }
]

// Orks — datasheets. Rewritten for Codex: Orks (app data 946), which replaced the whole
// faction; unit roster and points from src/data/mfm/orks.js (MFM v1.4).
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
//
// Three things the new codex data does NOT carry, all gaps in the source rather than here:
//   - `lore` is null on 72 of 73 Orks sheets, so `flavor` is inherited from the previous
//     transcription wherever the unit survived (including the two renames) and is simply
//     absent on the fourteen sheets that are new.
//   - `factionKeywords` is empty on every sheet; ORKS is restored here.
//   - "Damaged" became a core ability carrying its own generic text (`Damaged 6`), so the
//     per-sheet `damaged` block is gone except on the older-format Imperial Armour sheet.
//
// `legends: true` marks the twelve sheets in Legends: Orks - the first Legends publication
// GW has shipped in app data. They are listed alongside everything else and filtered in the
// UI, not hidden.
export default [
  {
    "id": "bannernob",
    "name": "Bannernob",
    "points": [
      {
        "models": 1,
        "points": 35
      }
    ],
    "flavor": "The tribe's Waaagh! banner has an almost religious significance, its presence on the battlefield filling the Orks with the overwhelming need to storm headlong into the enemy. It is typically carried to war by a Bannernob, a particularly large and belligerent Ork who has doubtless brutalised his rivals to claim this honour.",
    "profiles": [
      {
        "name": "Bannernob",
        "m": "6\"",
        "t": "5",
        "sv": "4+",
        "w": "4",
        "ld": "7+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Kustom Choppa",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Waaagh! Banner",
        "text": "This unit has +1 to **charge rolls**."
      }
    ],
    "composition": [
      "1 Bannernob model"
    ],
    "loadout": "**This model is equipped with:** 1 Kustom Choppa; 1 Shoota.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Boyz",
        "Nobz"
      ]
    },
    "keywords": [
      "Character",
      "Infantry"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "battlewagon",
    "name": "Battlewagon",
    "points": [
      {
        "models": 1,
        "points": 150,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 160,
        "note": "3rd+"
      }
    ],
    "flavor": "No two Battlewagons are the same, for the Meks that build them can never resist cobbling on armour plates, ramming spikes, assorted dakka and random worky-gubbinz. However, all are rugged transport tanks with the capacity to bear a vast number of angry Orks into battle while shrugging off the worst the enemy can throw at them.",
    "profiles": [
      {
        "name": "Battlewagon",
        "m": "10\"",
        "t": "11",
        "sv": "3+",
        "w": "16",
        "ld": "7+",
        "oc": "5",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Wreckin’ Ball",
        "tags": [
          "CLEAVE 2",
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "3+",
        "s": "10",
        "ap": "0",
        "d": "D6"
      },
      {
        "name": "Grabbin’ Klaw",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "2",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Crushin’ Bulk",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "6",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6, Damaged 6, Firing Deck 11",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Mobile Fortress",
        "text": "Ranged attacks that target this unit have -1 **D**."
      }
    ],
    "composition": [
      "1 Battlewagon model"
    ],
    "loadout": "**This model is equipped with:** 1 Crushin’ Bulk.",
    "options": [
      "This model can be equipped with 1 Wreckin’ Ball.",
      "This model can be equipped with up to 4 Big Shoota.",
      "This model can be equipped with 1 Grabbin’ Klaw."
    ],
    "transport": "This model has a **transport capacity** of 22 ORKS INFANTRY models. Each MEGA ARMOUR/JUMP PACK model takes up the space of 2 models. Each GHAZGHKULL THRAKA model takes up the space of 4 models.",
    "keywords": [
      "Frame",
      "Transport",
      "Vehicle",
      "Wagon"
    ],
    "factionKeywords": [
      "Orks"
    ]
  },
  {
    "id": "beast-snagga-boyz",
    "name": "Beast Snagga Boyz",
    "points": [
      {
        "models": 10,
        "points": 85,
        "note": "1st-3rd"
      },
      {
        "models": 20,
        "points": 170,
        "note": "1st-3rd"
      },
      {
        "models": 10,
        "points": 95,
        "note": "4th+"
      },
      {
        "models": 20,
        "points": 180,
        "note": "4th+"
      }
    ],
    "flavor": "Big, brutal, and belligerent, Beast Snagga Boyz are a force to be reckoned with. From the cannonball-like fist-shells of their thump guns, to the inescapable hooks of their choppas, Beast Snaggas excel in softening up their prey, dragging them down, then ripping them bodily to bits.",
    "profiles": [
      {
        "name": "Beast Snagga Boy",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "2",
        "inv": "6+"
      },
      {
        "name": "Nob",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "2",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Slugga",
        "tags": [
          "CLOSE-QUARTERS",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Thump Gun",
        "tags": [
          "ANTI-MONSTER/VEHICLE 4+"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "5+",
        "s": "6",
        "ap": "0",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Choppa – hunter (vs MONSTER/VEHICLE)",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Choppa – standard",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Power Snappa",
        "tags": [
          "ANTI-MONSTER/VEHICLE 4+"
        ],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Mobbed",
        "text": "When this unit ends a **charge move**, each enemy MONSTER/VEHICLE unit **engaged** with this unit makes a **battle-shock roll**:\n▪ With -1 to that **battle-shock roll**.\n▪ __Or:__ With -2 to that **battle-shock roll** if this unit has 13+ models."
      }
    ],
    "composition": [
      "1-2 Nob models",
      "9‑18 Beast Snagga Boy models"
    ],
    "loadout": "**Every Nob is equipped with:** 1 Power Snappa; 1 Slugga.\n**Every Beast Snagga Boy is equipped with:** 1 Choppa; 1 Slugga.",
    "options": [
      "For every 10 models in this unit, 1 Beast Snagga Boy model can be equipped with 1 Thump Gun."
    ],
    "keywords": [
      "Battleline",
      "Beast Snagga",
      "Infantry",
      "Mob"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "beastboss",
    "name": "Beastboss",
    "points": [
      {
        "models": 1,
        "points": 85
      }
    ],
    "flavor": "It takes a ferocious and foul-tempered Ork to lead a stampede of Beast Snaggas. Beastbosses possess these qualities in abundance. Boasting cybork enhancements, wired-in targetin’ squigs and an array of brutal combat weaponry, these roaring monsters can bring down even the largest prey one-on-one.",
    "profiles": [
      {
        "name": "Beastboss",
        "m": "6\"",
        "t": "6",
        "sv": "4+",
        "w": "6",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Beast Snagga Klaw and Beastchoppa",
        "tags": [
          "SUSTAINED HITS 2: MONSTER/VEHICLE"
        ],
        "a": "6",
        "ws": "2+",
        "s": "12",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader, Feel No Pain 6+",
    "faction": "Da Boss, Waaagh!",
    "abilities": [
      {
        "name": "Keep Huntin’! (Once per battle round, per army)",
        "text": "In your Movement phase, at the start or end of this unit's move, you can select one friendly BEAST SNAGGA unit within 6\" of this unit. That unit:\n▪ Is no longer **battle-shocked**.\n▪ Is **riled up** until the start of your next turn."
      },
      {
        "name": "Dodge Dis!",
        "text": "This unit's attacks have +1 to **hit rolls**."
      }
    ],
    "composition": [
      "1 Beastboss model"
    ],
    "loadout": "**This model is equipped with:** 1 Shoota; 1 Beast Snagga Klaw and Beastchoppa.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Beast Snagga Boyz"
      ]
    },
    "keywords": [
      "Beast Snagga",
      "Character",
      "Infantry",
      "Warboss"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "beastboss-on-squigosaur",
    "name": "Beastboss on Squigosaur",
    "points": [
      {
        "models": 1,
        "points": 140,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 155,
        "note": "3rd+"
      }
    ],
    "flavor": "Beastbosses have the strength and violent temperament to subdue the most ferocious creatures. Squiqosaurs, meanwhile, are single-minded predators that can bite through adamantine and shrug off enemg fire as though they were armour-plated. If a Beostboss wishes to ride one he must first beat it within an inch of its life to teach it respect, all without getting devoured in the process.",
    "profiles": [
      {
        "name": "Beastboss on Squigosaur",
        "m": "10\"",
        "t": "9",
        "sv": "3+",
        "w": "10",
        "ld": "6+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Slugga",
        "tags": [
          "CLOSE-QUARTERS",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Thump Gun",
        "tags": [
          "ANTI-MONSTER/VEHICLE 4+"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "5+",
        "s": "6",
        "ap": "0",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Beastchoppa – hunter (vs MONSTER/VEHICLE)",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "12",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Beastchoppa – standard",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Squigosaur’s Jaws",
        "tags": [
          "ANTI-MONSTER/VEHICLE 3+",
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "7",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Feel No Pain 5+",
    "faction": "Da Boss, Waaagh!",
    "abilities": [
      {
        "name": "Thundering Stampede (Aura)",
        "text": "Friendly BEAST SNAGGA units within 6\" of this unit have +1 to **charge rolls**."
      },
      {
        "name": "Keep Huntin’! (Once per battle round, per army)",
        "text": "In your Movement phase, at the start or end of this unit’s move, you can select one friendly BEAST SNAGGA unit within 6\" of this unit. That unit:\n▪ Is no longer **battle-shocked**.\n▪ Is **riled up** until the start of your next turn."
      },
      {
        "name": "Boss of da Hunt",
        "text": "While this unit is within 3\" of a friendly BEAST SNAGGA unit (excluding MONSTER CHARACTER units), this unit has **Lone Operative**."
      }
    ],
    "composition": [
      "1 Beastboss on Squigosaur model"
    ],
    "loadout": "**This model is equipped with:** 1 Beastchoppa; 1 Slugga; 1 Squigosaur’s Jaws.",
    "options": [
      "This model can be equipped with 1 Thump Gun."
    ],
    "keywords": [
      "Beast Snagga",
      "Character",
      "Monster",
      "Warboss"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "80mm"
  },
  {
    "id": "big-mek",
    "name": "Big Mek",
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
    "flavor": "Big Meks build all sorts of powerful weapons and bizarre devices. They readily bring their favourites into battle to test ’em out, even building and wearing a bionik exoskeleton to help them wield as many as possible. So equipped, the Big Mek unleashes mechanical violence and blasts of energy, or wrenches open warp tunnels down which he and his followers pile into the fight.",
    "profiles": [
      {
        "name": "Big Mek",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "6",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Traktor Blasta",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "4+",
        "s": "6",
        "ap": "-2",
        "d": "D3+3"
      },
      {
        "name": "Kustom Mega-blasta",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Drilla",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "12",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Power Klaw",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "More Dakka",
        "text": "This unit’s ranged attacks have:\n▪ [IGNORES COVER].\n▪ If this unit is **riled up**, [SUSTAINED HITS 1]."
      },
      {
        "name": "Shokk-boosta",
        "text": "In your Movement phase, when this unit is selected to make an **advance move**, you can use this ability. If you do:\n▪ This unit can change that **advance roll** to a 6.\n▪ This unit can move through all types of model.\n▪ When this unit ends that **advance move**, make a **hazard roll** for each model in this unit."
      }
    ],
    "composition": [
      "1 Big Mek model"
    ],
    "loadout": "**This model is equipped with:** 1 Kustom Mega‑blasta; 1 Power Klaw.",
    "options": [
      "This model’s Power Klaw can be replaced with 1 Drilla.",
      "This model’s Kustom Mega‑blasta can be replaced with 1 Traktor Blasta."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Boyz",
        "Breaka Boyz",
        "Flash Gitz",
        "Mek Gunz",
        "Nobz",
        "Tankbustas"
      ]
    },
    "keywords": [
      "Character",
      "Explosives",
      "Infantry"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "big-mek-dakkarig",
    "name": "Big Mek Dakkarig",
    "points": [
      {
        "models": 1,
        "points": 135,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 145,
        "note": "3rd+"
      }
    ],
    "flavor": "Dakkarigs are ridden into battle by Big Meks, and provide a stable firing platform for some really heavy firepower. Lumbering relentlessly forward, they unleash corkscrewing hails of rokkits, and hurricanes of dakka from their screaming blitzkannons, all while their gleeful pilot is protected from return fire by a crackling kustom force field.",
    "profiles": [
      {
        "name": "Big Mek Dakkarig",
        "m": "8\"",
        "t": "8",
        "sv": "3+",
        "w": "11",
        "ld": "7+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Blitzkannon",
        "tags": [
          "IGNORES COVER",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "24\"",
        "a": "8",
        "bs": "4+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Multi-busta Launcha",
        "tags": [
          "IGNORES COVER",
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Stompy Feet",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Even More Dakka",
        "text": "If this unit is **riled up**, this unit’s ranged attacks have [SUSTAINED HITS 1]."
      },
      {
        "name": "Blitz Dem Gitz!",
        "text": "In your Shooting phase, if this unit’s Blitzkannon weapon targets a unit (excluding MONSTER/VEHICLE units), that weapon has +6 **A**."
      }
    ],
    "composition": [
      "1 Big Mek Dakkarig model"
    ],
    "loadout": "**This model is equipped with:** 1 Blitzkannon; 1 Multi-busta Launcha; 1 Stompy Feet.",
    "keywords": [
      "Big Mek",
      "Character",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Orks"
    ]
  },
  {
    "id": "big-mek-in-mega-armour",
    "name": "Big Mek in Mega Armour",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "For all that its weight is akin to wearing half a tank, mega armour is incredibly resilient. Big Meks often build and wear it, adding unstable kustom weaponry, force field projectors, crushing klaws or even tellyport blastas that kill victims by beaming their component parts across a wide area, much to the Orks’ amusement.",
    "profiles": [
      {
        "name": "Big Mek in Mega Armour",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "5",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Kustom Shoota – aimed",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "18\"",
        "a": "4",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kustom Shoota – point blank",
        "tags": [
          "CLOSE-QUARTERS",
          "TORRENT"
        ],
        "range": "6\"",
        "a": "D3+3",
        "bs": "-",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kombi-weapon – kill shot",
        "tags": [],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Kombi-weapon – point blank",
        "tags": [
          "BLAST 1",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kombi-weapon – shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kustom Mega-blasta",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Tellyport Blasta",
        "tags": [
          "BLAST 1"
        ],
        "range": "12\"",
        "a": "6",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Power Klaw",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Killsaw",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Leader",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Fix Dat Armour Up (Once per battle, per unit)",
        "text": "In your Command phase, this unit **heals** 3 wounds.\n\nPlace a Grot Oiler token next to the unit, removing it when this ability is used."
      },
      {
        "name": "More Dakka",
        "text": "This unit’s ranged attacks have:\n▪ [IGNORES COVER].\n▪ If this unit is **riled up**, [SUSTAINED HITS 1]."
      }
    ],
    "composition": [
      "1 Big Mek in Mega Armour model"
    ],
    "loadout": "**This model is equipped with:** 1 Kustom Shoota; 1 Power Klaw.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 1 Tellyport Blasta\n▪ 1 Kustom Force Field",
      "This model’s Kustom Shoota can be replaced with one of the following:\n▪ 1 Killsaw\n▪ 1 Kombi‑weapon\n▪ 1 Kustom Mega‑blasta"
    ],
    "wargearAbilities": [
      {
        "name": "Kustom Force Field",
        "text": "While the bearer is leading a unit, models in that unit have a 4+ invulnerable save against ranged attacks."
      }
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Meganobz",
        "Mek Gunz"
      ]
    },
    "keywords": [
      "Big Mek",
      "Character",
      "Explosives",
      "Infantry",
      "Mega Armour"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "big-mek-with-shokk-attack-gun",
    "name": "Big Mek with Shokk Attack Gun",
    "points": [
      {
        "models": 1,
        "points": 95,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 105,
        "note": "2nd+"
      }
    ],
    "flavor": "Big Moks arc musters of insane but highly destructive weaponry. Amongst the strangest devices that some lug to battle is the shokk attack gun which opens a tunnel through the warp to its target, then launches screaming Snot lings down it. I he ammunition remoteriolise os a terror-maddened, clawing, biting swarm. If this happens inside the target, the results orc swift and horrific.",
    "profiles": [
      {
        "name": "Big Mek with Shokk Attack Gun",
        "m": "6\"",
        "t": "5",
        "sv": "4+",
        "w": "5",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Shokk Attack Gun",
        "tags": [
          "BLAST 1",
          "HEAVY"
        ],
        "range": "60\"",
        "a": "D3+3",
        "bs": "5+",
        "s": "12",
        "ap": "-4",
        "d": "D6+1"
      }
    ],
    "melee": [
      {
        "name": "Big Mek’s Toolz",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "More Dakka",
        "text": "This unit’s ranged attacks have:\n▪ [IGNORES COVER].\n▪ If this unit is **riled up**, [SUSTAINED HITS 1]."
      },
      {
        "name": "Support Shokka",
        "text": "While this model is within 3\" of a friendly ORKS INFANTRY unit (excluding BIG MEK WITH SHOKK ATTACK GUN units), this model has **Lone Operative**."
      }
    ],
    "composition": [
      "1 Big Mek with Shokk Attack Gun model"
    ],
    "loadout": "**This model is equipped with:** 1 Big Mek’s Toolz; 1 Shokk Attack Gun.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Boyz",
        "Mek Gunz",
        "Nobz",
        "Tankbustas"
      ]
    },
    "keywords": [
      "Big Mek",
      "Character",
      "Explosives",
      "Infantry"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "big-trakk",
    "name": "Big Trakk",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "profiles": [
      {
        "name": "Big Trakk",
        "m": "12\"",
        "t": "9",
        "sv": "4+",
        "w": "12",
        "ld": "7+",
        "oc": "3",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kannon – frag",
        "tags": [
          "BLAST 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kannon – shell",
        "tags": [],
        "range": "36\"",
        "a": "1",
        "bs": "5+",
        "s": "9",
        "ap": "-2",
        "d": "D3+3"
      },
      {
        "name": "Supa-kannon – frag",
        "tags": [
          "BLAST 2"
        ],
        "range": "36\"",
        "a": "D6+3",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Supa-kannon – shell",
        "tags": [],
        "range": "36\"",
        "a": "1",
        "bs": "5+",
        "s": "12",
        "ap": "-3",
        "d": "D6+3"
      }
    ],
    "melee": [
      {
        "name": "Armoured Hull",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Firing Deck 12, Damaged 4",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Spiked Ram",
        "text": "When this unit ends a **charge move**, you can select one enemy unit **engaged** with this unit. If you do, roll one D6:\n▪ On a 2-5, that enemy unit suffers D3 **mortal wounds**.\n▪ On a 6, that enemy unit suffers 3 **mortal wounds**."
      }
    ],
    "composition": [
      "1 Big Trakk model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 2 Big Shoota.",
    "options": [
      "This model can be equipped with one of the following: 1 Kannon, 1 Supa-kannon"
    ],
    "transport": "This model has a **transport capacity** of 12 ORKS INFANTRY models. It cannot transport GHAZGHKULL THRAKA models. Each MEGA ARMOUR/JUMP PACK model takes up the space of 2 models.",
    "keywords": [
      "Frame",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "biged-bossbunka",
    "name": "Big’Ed Bossbunka",
    "points": [
      {
        "models": 1,
        "points": 135
      }
    ],
    "flavor": "Having a Gargant’s severed head serve as a boss’ hut is not only a status symbol, but also provides a base of operations equipped with a remarkable array of Orky features – from the potent Gaze of Gork built into one eye to the kommanda’s shoutin’ pole that carries the boss’ bellowed commands far and wide.",
    "profiles": [
      {
        "name": "Big 'Ed Bossbunka",
        "m": "-",
        "t": "10",
        "sv": "3+",
        "w": "12",
        "ld": "7+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Gaze of Gork – glare",
        "tags": [
          "BLAST 1"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Gaze of Gork – squint",
        "tags": [],
        "range": "18\"",
        "a": "1",
        "bs": "5+",
        "s": "12",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Firing Deck 11, Deadly Demise D3",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Raucous Occupants",
        "text": "While this model is within range of your **home objective**, add the **OC** of models embarked within this model to this model's **OC**."
      },
      {
        "name": "Fortification",
        "text": "While an enemy unit is **engaged** with only FORTIFICATION units:\n▪ That enemy unit can be selected as a target of ranged attacks.\n▪ When shooting that enemy unit, those ranged attacks have -1 to **hit rolls** (excluding [CLOSE-QUARTERS] attacks).\n▪ When that enemy unit is selected to make a **fall-back move**, if that enemy unit is only **engaged** with FORTIFICATION units, and that enemy unit is not **battle-shocked**, **hazard rolls** made for that enemy unit are automatically passed."
      },
      {
        "name": "Ramshackle Cover",
        "text": "When an attack targets a unit that is not **fully visible** to the attacking model because of this unit, the target has the **benefit of cover** against that attack."
      }
    ],
    "composition": [
      "1 Big’ed Bossbunka model"
    ],
    "loadout": "**This model is equipped with:** 1 Big Shoota; 1 Gaze of Gork.",
    "options": [
      "This model can be equipped with up to 3 Big Shootas."
    ],
    "transport": "This model has a **transport capacity** of 11 ORKS INFANTRY models. It cannot transport GHAZGHKULL THRAKA models. Each MEGA ARMOUR/JUMP PACK model takes up the space of 2 models.",
    "keywords": [
      "Fortification",
      "Frame",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Orks"
    ]
  },
  {
    "id": "bigboss",
    "name": "Bigboss",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "flavor": "Second only to the tribe's Warboss, Bigbosses spend their time ordering other Orks around and giving enemy champions and war leaders a good kicking. They are formidably tough, usually heavily armed, always completely merciless, and entirely capable of ripping a Space Marine limb from limb with their bare hands.",
    "profiles": [
      {
        "name": "Bigboss",
        "m": "6\"",
        "t": "5",
        "sv": "4+",
        "w": "5",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Slugga",
        "tags": [
          "CLOSE-QUARTERS",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Big Choppa",
        "tags": [
          "PRECISION"
        ],
        "a": "5",
        "ws": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Sumfin’ to Prove",
        "text": "This unit’s melee attacks have +1 to **hit rolls**."
      }
    ],
    "composition": [
      "1 Bigboss model"
    ],
    "loadout": "**This model is equipped with:** 1 Big Choppa; 1 Slugga.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Boyz",
        "Breaka Boyz",
        "Nobz"
      ]
    },
    "keywords": [
      "Character",
      "Infantry"
    ],
    "factionKeywords": [
      "Orks"
    ]
  },
  {
    "id": "blitza-bommer",
    "name": "Blitza‑bommer",
    "points": [
      {
        "models": 1,
        "points": 115
      }
    ],
    "flavor": "While not as shooty as a Dakkajet, each Blitza-bommer lugs enormous boom bombs into battle under its wings. Dive-bombing the enemy with reckless abandon, the Blitza-bommers detach their oversized payloads before (hopefully) pulling up and screaming skywards again while vast fireballs billow in their wake.",
    "profiles": [
      {
        "name": "Blitza-bommer",
        "m": "-",
        "t": "9",
        "sv": "3+",
        "w": "12",
        "ld": "7+",
        "oc": "-1",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Dual Supa-shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 4"
        ],
        "range": "36\"",
        "a": "8",
        "bs": "5+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured Impact",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Damaged 4",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Boom Bomb",
        "text": "At the end of your opponent’s Fight phase, select one **visible** enemy unit (excluding **Lone Operative** units) within 24\" of this unit, and roll one D6 for that unit:\n▪ On a 1-3, that enemy unit suffers D3 **mortal wounds**.\n▪ On a 4-5, that enemy unit suffers 3 **mortal wounds**.\n▪ On a 6, that enemy unit suffers D3+3 **mortal wounds**."
      }
    ],
    "composition": [
      "1 Blitza‑bommer model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Impact; 1 Big Shoota; 1 Dual Supa‑shoota.",
    "keywords": [
      "Aircraft",
      "Fly",
      "Speed Freeks",
      "Vehicle"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "120mm"
  },
  {
    "id": "boss-snikrot",
    "name": "Boss Snikrot",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Boss Snikrot is a murderous ghost whose obsession with kommando warfare has seen him transcend the cunning of his fellow Blood Axes and achieve instead something nigh supernatural. By the time his terrified foes realise he is upon them, the Boss is already opening their throats with his rip-toothed blades.",
    "profiles": [
      {
        "name": "Boss Snikrot",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "6",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Slugga",
        "tags": [
          "CLOSE-QUARTERS",
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "PRECISION"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Mork’s Teef",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader, Lone Operative, Infiltrators, Stealth",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Kunnin’ Infiltrator",
        "text": "At the end of your opponent's Fight phase, if each model in this unit is **hidden** and **unengaged**, you can place this unit in **strategic reserves**."
      },
      {
        "name": "Deff from the Shadows (First battle round onwards)",
        "text": "At the end of your opponent's Movement phase, if this unit is in **strategic reserves**, this unit can make an **ingress move**."
      }
    ],
    "composition": [
      "1 Boss Snikrot model"
    ],
    "loadout": "**This model is equipped with:** 1 Mork’s Teef; 1 Slugga.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Kommandos"
      ]
    },
    "keywords": [
      "Character",
      "Epic Hero",
      "Explosives",
      "Infantry",
      "Smoke"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "boss-zagstruk",
    "name": "Boss Zagstruk",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "profiles": [
      {
        "name": "Boss Zagstruk",
        "m": "12\"",
        "t": "5",
        "sv": "4+",
        "w": "6",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Slugga",
        "tags": [
          "CLOSE-QUARTERS",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Da Vulcha's Klaws and Choppa",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader, Deep Strike, Feel No Pain 6+",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Drill Boss",
        "text": "This unit's melee attacks have +1 to **hit rolls**."
      },
      {
        "name": "Plummeting Descent",
        "text": "If this unit made an **ingress move** this turn, this unit can re-roll **charge rolls**."
      }
    ],
    "composition": [
      "1 Boss Zagstruk model"
    ],
    "loadout": "**This model is equipped with:** 1 Da Vulcha's Klaws and Choppa; 1 Slugga.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Stormboyz"
      ]
    },
    "keywords": [
      "Character",
      "Epic Hero",
      "Fly",
      "Infantry",
      "Jump Pack"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "40mm",
    "legends": true
  },
  {
    "id": "boyz",
    "name": "Boyz",
    "points": [
      {
        "models": 10,
        "points": 90,
        "note": "1st-3rd"
      },
      {
        "models": 20,
        "points": 180,
        "note": "1st-3rd"
      },
      {
        "models": 10,
        "points": 100,
        "note": "4th+"
      },
      {
        "models": 20,
        "points": 190,
        "note": "4th+"
      }
    ],
    "flavor": "Ork Boyz surge into battle in huge, unruly mobs dotted with crude special weapons and led by foul-tempered Boss Nobz. Most simply stampede towards the enemy lines, relying on their numbers and natural hardiness to carry the charge home, while others hitch a ride on Trukks and Battlewagons so as to get stuck in all the faster.",
    "profiles": [
      {
        "name": "Boy",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "2"
      },
      {
        "name": "Nob",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Kombi-rokkit – busta rokkit",
        "tags": [],
        "range": "24\"",
        "a": "1",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Kombi-rokkit – shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kustom Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "18\"",
        "a": "4",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Burna",
        "tags": [
          "BLAST 1",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kombi-skorcha – shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kombi-skorcha – skorcha",
        "tags": [
          "BLAST 1",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – blasta",
        "tags": [
          "BLAST 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – busta",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Slugga",
        "tags": [
          "CLOSE-QUARTERS",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Kustom Choppa",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power Klaw",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Big Choppa",
        "tags": [
          "CLEAVE 2"
        ],
        "a": "4",
        "ws": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Choppa",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Ammo Runts (Once per battle, per unit)",
        "text": "In your Shooting phase, when this unit is **selected to shoot**, you can use this ability. If you do, this unit’s ranged attacks have +1 to **hit rolls**.\n\nPlace any number of Ammo Runt tokens next to the unit, removing them when this ability is used."
      },
      {
        "name": "Tide of Muscle",
        "text": "In the Fight phase, if this unit made a **charge move** this turn, this unit's melee attacks have [LETHAL HITS]."
      },
      {
        "name": "Never Too Busy to Fight",
        "text": "Being **engaged** does not prevent this unit from being **eligible to start an action**."
      }
    ],
    "composition": [
      "1‑2 Nob models",
      "9‑18 Boy models"
    ],
    "loadout": "**Every Nob is equipped with:** 1 Kustom Choppa; 1 Kombi-skorcha.\n**Every Boy is equipped with:** 1 Choppa; 1 Shoota; 1 Slugga.",
    "options": [
      "Any number of Nob models can each have their Kustom Choppa and Kombi-skorcha replaced with 1 Big Choppa.",
      "Any number of Nob models can each have their Kustom Choppa replaced with 1 Power Klaw.",
      "Any number of Nob models can each have their Kombi-skorcha replaced with one of the following:\n▪ 1 Kombi-rokkit\n▪ 1 Kustom Shoota",
      "For every 10 models in this unit, 1 Boy model can have their Shoota replaced with 1 Big Shoota.",
      "For every 10 models in this unit, 1 Boy model can have their Shoota replaced with 1 Rokkit Launcha.",
      "For every 10 models in this unit, 1 Boy model can have their Shoota replaced with 1 Burna."
    ],
    "keywords": [
      "Battleline",
      "Explosives",
      "Infantry",
      "Mob"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "32mm, 40mm"
  },
  {
    "id": "breaka-boyz",
    "name": "Breaka Boyz",
    "points": [
      {
        "models": 6,
        "points": 135,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 145,
        "note": "3rd+"
      }
    ],
    "flavor": "Breaka Boyz dismantle the foe’s war engines and defences with well-placed krumpings from their smash hammers. Some use a pair of brutal knucklebustas, while the more addled opt for a tankhammer: a rokkit strapped to a big metal stick that offers a satisfyingly explosive means of up-close annihilation.",
    "profiles": [
      {
        "name": "Breaka Boy",
        "m": "6\"",
        "t": "5",
        "sv": "4+",
        "w": "2",
        "ld": "7+",
        "oc": "1"
      },
      {
        "name": "Nob",
        "m": "6\"",
        "t": "5",
        "sv": "4+",
        "w": "3",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Rokkit Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Smash Hammer – hunter (vs MONSTER/VEHICLE)",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Smash Hammer – standard",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Choppa",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Tankhammer",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Knucklebustas",
        "tags": [
          "ANTI-MONSTER/VEHICLE 4+"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Bomb Squigs (Once per turn, twice per battle, per unit)",
        "text": "In your Movement phase, when this unit ends a **normal move**, you can select one **visible **enemy unit within 12\" of this unit and roll one D6:\n▪ On a 3+, that enemy unit suffers D3 **mortal wounds**. Place two Bomb Squig tokens next to the unit, removing one each time this ability is used."
      },
      {
        "name": "Trophy Hunters",
        "text": "This unit has +1 to **charge rolls**."
      }
    ],
    "composition": [
      "1 Nob model",
      "5 Breaka Boy models"
    ],
    "loadout": "**The Nob is equipped with:** 1 Choppa; 1 Rokkit Pistol; 1 Smash Hammer.\n**Every Breaka Boy is equipped with:** 1 Smash Hammer.",
    "options": [
      "The Nob can have their Smash Hammer replaced with 1 Rokkit Pistol.",
      "1 Breaka Boy model can have their Smash Hammer replaced with 1 Knucklebustas.",
      "1 Breaka Boy model can have their Smash Hammer replaced with 1 Tankhammer."
    ],
    "keywords": [
      "Explosives",
      "Infantry"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "32mm, 40mm"
  },
  {
    "id": "burna-boyz",
    "name": "Burna Boyz",
    "points": [
      {
        "models": 5,
        "points": 60
      },
      {
        "models": 10,
        "points": 120
      }
    ],
    "flavor": "The burna is a cutting torch intended for slicing up battlefield wreckage. Serendipitously, it also works well when searing through an enemy’s armour at close quarters, or, with a twist of its nozzle, can instead belch a tongue of roaring flame over the foe. Needless to say, the most pyromaniacally inclined Orks delight in doing both.",
    "profiles": [
      {
        "name": "Spanner",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "1"
      },
      {
        "name": "Burna Boy",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Burna",
        "tags": [
          "BLAST 1",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kustom Mega-blasta",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "5+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Rokkit Launcha – blasta",
        "tags": [
          "BLAST 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – busta",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Gun Stock and Fists",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Cuttin' Flames",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Pyromaniaks",
        "text": "This unit's attacks that target a unit within 6\" of this unit can re-roll **wound rolls** of 1."
      }
    ],
    "composition": [
      "1-2 Spanner models",
      "4-8 Burna Boy models"
    ],
    "loadout": "**Every Spanner is equipped with:** 1 Big Shoota; 1 Gun Stock and Fists.\n**Every Burna Boy is equipped with:** 1 Burna; 1 Cuttin' Flames.",
    "options": [
      "Any number of Spanner models can each have their Big Shoota replaced with one of the following: 1 Kustom Mega-blasta, 1 Rokkit Launcha"
    ],
    "keywords": [
      "Infantry"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "32mm",
    "legends": true
  },
  {
    "id": "burna-bommer",
    "name": "Burna‑bommer",
    "points": [
      {
        "models": 1,
        "points": 125
      }
    ],
    "flavor": "Meant for burning enemy infantry out of fortifications and dense cover, Burna-bommers fly so low that they frequently scorch their undercarriage with their own ordnance. The Burna Boy pilots consider this a small price to pay in order to watch their victims do ‘da burny dance’ as their skorcha missile racks and burna bombs rain down.",
    "profiles": [
      {
        "name": "Burna-bommer",
        "m": "-",
        "t": "9",
        "sv": "3+",
        "w": "12",
        "ld": "7+",
        "oc": "-1",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Dual Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 4"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Dual Supa Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 4",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "8",
        "bs": "5+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Skorcha Missile Rack",
        "tags": [
          "BLAST 2",
          "IGNORES COVER"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured Impact",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Damaged 4",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Burna Bomb",
        "text": "At the end of your opponent’s Fight phase, select one **visible** enemy unit (excluding **Lone Operative** and MONSTER/VEHICLE units) within 36\" of this unit, and roll one D6 for that unit. On a 2+:\n▪ That enemy unit suffers D3 **mortal wounds**.\n▪ That enemy unit cannot be **hidden** until the end of your next turn.\n▪ Ranged attacks that target that enemy unit have [IGNORES COVER] until the end of your next turn."
      }
    ],
    "composition": [
      "1 Burna‑bommer model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Impact; 1 Dual Big Shoota; 1 Dual Supa Shoota.",
    "options": [
      "This model can be equipped with 1 Skorcha Missile Rack."
    ],
    "keywords": [
      "Aircraft",
      "Fly",
      "Speed Freeks",
      "Vehicle"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "120mm"
  },
  {
    "id": "dakkajet",
    "name": "Dakkajet",
    "points": [
      {
        "models": 1,
        "points": 125
      }
    ],
    "flavor": "Rocketing through the skies on billowing trails of flame and smoke, Dakkajets come in low and hard over the battlefield. These single-seater Ork attack craft are ludicrously over-gunned for their size, all but shaking themselves apart as their pilots unleash storms of dakka on luckless ground targets or enemy aircraft with equal glee.",
    "profiles": [
      {
        "name": "Dakkajet",
        "m": "-",
        "t": "9",
        "sv": "3+",
        "w": "12",
        "ld": "7+",
        "oc": "-1",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Dual Supa-shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 4"
        ],
        "range": "36\"",
        "a": "8",
        "bs": "5+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured Impact",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Damaged 4, Deadly Demise D3",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Strafing Run",
        "text": "In your Shooting phase, this unit's ranged attacks that target a unit (excluding FLY units) have +1 to **hit rolls**."
      }
    ],
    "composition": [
      "1 Dakkajet model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Impact; 2 Dual Supa‑shoota.",
    "options": [
      "This model can be equipped with 1 Dual Supa‑shoota."
    ],
    "keywords": [
      "Aircraft",
      "Fly",
      "Speed Freeks",
      "Vehicle"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "120mm"
  },
  {
    "id": "deff-dread",
    "name": "Deff Dread",
    "points": [
      {
        "models": 1,
        "points": 130,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 140,
        "note": "3rd+"
      }
    ],
    "flavor": "Being wired into a Deff Dread affords strength, resilience and a terrifying array of vicious weaponry. Of course, the reality of being stuck in a metal box for life and drinking your meals through a straw soon gets old, but the pilots’ resulting unhinged ferocity only serves to make Deff Dreads all the more dangerous in battle.",
    "profiles": [
      {
        "name": "Deff Dread",
        "m": "8\"",
        "t": "9",
        "sv": "2+",
        "w": "8",
        "ld": "7+",
        "oc": "3",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Kustom Mega-blasta",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "5+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Rokkit Launcha – blasta",
        "tags": [
          "BLAST 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – busta",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Skorcha",
        "tags": [
          "BLAST 1",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Extra Klaw",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Dread Klaws",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Dread ’Ard",
        "text": "Attacks that target this unit have -1 **D**."
      }
    ],
    "composition": [
      "1 Deff Dread model"
    ],
    "loadout": "**This model is equipped with:** 1 Big Shoota; 1 Dread Klaws; 1 Skorcha.",
    "options": [
      "This model’s Big Shoota can be replaced with one of the following:\n▪ 1 Extra Klaw\n▪ 1 Kustom Mega‑blasta\n▪ 1 Rokkit Launcha",
      "This model’s Skorcha can be replaced with one of the following:\n▪ 1 Extra Klaw\n▪ 1 Big Shoota\n▪ 1 Kustom Mega‑blasta\n▪ 1 Rokkit Launcha"
    ],
    "keywords": [
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "deffkilla-wartrike",
    "name": "Deffkilla Wartrike",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Ork Speedbosses thunder into battle on the backs of Deffkilla Wartrikes. These hurtling three-wheelers boast massive jet engines that fry the foe to a crisp while roaring through their ranks. Wartrikes also offer platforms from which the Speedbosses can messily chainhaul unfortunate foes with their grapnel-like snagga klaws.",
    "profiles": [
      {
        "name": "Deffkilla Wartrike",
        "m": "12\"",
        "t": "6",
        "sv": "4+",
        "w": "9",
        "ld": "6+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Boomstikks",
        "tags": [
          "ASSAULT",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "12\"",
        "a": "6",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Snagga Klaw",
        "tags": [
          "ASSAULT",
          "PRECISION"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Killa Jet – burna",
        "tags": [
          "CLEAVE 1",
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Killa Jet – cutta",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Snagga Klaw",
        "tags": [
          "CLEAVE 2"
        ],
        "a": "5",
        "ws": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise 1, Leader",
    "faction": "Da Boss, Waaagh!",
    "abilities": [
      {
        "name": "Get Back in da Race! (Once per battle round, per army)",
        "text": "In your Movement phase, at the start or end of this unit's move, you can select one friendly SPEED FREEKS unit within 6\" of this unit. That unit (and any units embarked within that unit):\n▪ Is no longer **battle-shocked**.\n▪ Is **riled up** until the start of your next turn."
      },
      {
        "name": "Fuel-mixa Grot",
        "text": "This unit has +1 to **advance rolls**."
      }
    ],
    "composition": [
      "1 Deffkilla Wartrike model"
    ],
    "loadout": "**This model is equipped with:** 1 Boomstikks; 1 Killa Jet; 1 Snagga Klaw.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Warbikers"
      ]
    },
    "keywords": [
      "Character",
      "Mounted",
      "Speed Freeks",
      "Warboss"
    ],
    "factionKeywords": [
      "Orks"
    ]
  },
  {
    "id": "deffkoptas",
    "name": "Deffkoptas",
    "points": [
      {
        "models": 3,
        "points": 80,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 160,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 90,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 170,
        "note": "3rd+"
      }
    ],
    "flavor": "Most Orks take a dim view of muckin’ about in the sky, and would much rather go to war with their feet firmly on the ground. Deffkopta pilots are the lunatic exception, hurtling ahead to spy out enemy forces for their warband to bring to battle, and to give those same enemies a good strafing run or three in the meantime.",
    "profiles": [
      {
        "name": "Deffkopta",
        "m": "12\"",
        "t": "6",
        "sv": "4+",
        "w": "4",
        "ld": "7+",
        "oc": "2",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Kustom Mega-blasta",
        "tags": [
          "HAZARDOUS",
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "5+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Rokkit Launcha – blasta",
        "tags": [
          "BLAST 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – busta",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Slugga",
        "tags": [
          "CLOSE-QUARTERS",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Choppa",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Spinnin’ Blades",
        "tags": [
          "CLEAVE 1",
          "HAZARDOUS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Deff from Above",
        "text": "In your Shooting phase, if this unit made an **ingress move** this turn, this unit's ranged attacks have +1 to **hit rolls**."
      },
      {
        "name": "Aerial Manoover",
        "text": "At the end of your opponent's Fight phase, if this unit is **unengaged**, you can place this unit in **strategic reserves**."
      }
    ],
    "composition": [
      "3‑6 Deffkopta models"
    ],
    "loadout": "**Every model is equipped with:** 1 Choppa; 1 Rokkit Launcha; 1 Slugga; 1 Spinnin’ Blades.",
    "options": [
      "For every 3 models in this unit, 1 model can have their Rokkit Launcha replaced with 1 Kustom Mega‑blasta."
    ],
    "keywords": [
      "Explosives",
      "Fly",
      "Mounted",
      "Speed Freeks"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "75mm"
  },
  {
    "id": "flash-gitz",
    "name": "Flash Gitz",
    "points": [
      {
        "models": 5,
        "points": 105,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 210,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 135,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 240,
        "note": "3rd+"
      }
    ],
    "flavor": "Flash Gitz are despised by other greenskins for being self-important show-offs with too much snazz and dakka for their own good. The Gitz couldn’t care less, of course, delighting in ostentatiously brandishing their over-the-top snazzguns before using them to utterly demolish the enemy in a hail of shells, blasts and rokkits.",
    "profiles": [
      {
        "name": "Flash Git",
        "m": "6\"",
        "t": "5",
        "sv": "4+",
        "w": "3",
        "ld": "7+",
        "oc": "1"
      },
      {
        "name": "Kaptin",
        "m": "6\"",
        "t": "5",
        "sv": "4+",
        "w": "3",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Snazzgun – cutta",
        "tags": [
          "HAZARDOUS",
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "9",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Snazzgun – dakka",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Snazzgun – kill shot",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "2",
        "bs": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Choppa",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Finderz Keeperz",
        "text": "In your Shooting phase, if any of the following apply, this unit’s ranged attacks have +1 **AP**:\n▪ This unit is within range of an **objective**.\n▪ The target of that attack is within range of an **objective**."
      }
    ],
    "composition": [
      "1 Kaptin model",
      "4‑9 Flash Git models"
    ],
    "loadout": "**Every model is equipped with:** 1 Choppa; 1 Snazzgun.",
    "keywords": [
      "Explosives",
      "Infantry"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "gargantuan-squiggoth",
    "name": "Gargantuan Squiggoth",
    "points": [
      {
        "models": 1,
        "points": 500,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 550,
        "note": "2nd+"
      }
    ],
    "flavor": "Squiggoths can grow in size indefinitely. The larger they get, the more prized they become in the eyes of Ork Warbosses, whose simple minds see them for the colossal living weapons they are. Kitted out with armour, guns and bellowing passengers, truly giant specimens are walking bastions, their momentum all but unstoppable.",
    "profiles": [
      {
        "name": "Gargantuan Squiggoth",
        "m": "10\"",
        "t": "13",
        "sv": "3+",
        "w": "30",
        "ld": "7+",
        "oc": "12"
      }
    ],
    "ranged": [
      {
        "name": "Supa-kannon",
        "tags": [
          "BLAST"
        ],
        "range": "60\"",
        "a": "2D6",
        "bs": "5+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Kannon – frag",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D6",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kannon – shell",
        "tags": [],
        "range": "36\"",
        "a": "1",
        "bs": "5+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Huge tusks – strike",
        "tags": [
          "LANCE"
        ],
        "a": "6",
        "ws": "3+",
        "s": "14",
        "ap": "-3",
        "d": "12"
      },
      {
        "name": "Huge tusks – sweep",
        "tags": [],
        "a": "18",
        "ws": "3+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 2D6, Firing Deck 20",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Gargantuan",
        "text": "Each time this model makes a Normal, Advance or Fall Back move, it can move over models (excluding **TITANIC** models) and terrain features that are 4\" or less in height as if they were not there."
      },
      {
        "name": "Walking Bastion",
        "text": "This model does not suffer the penalty to its Hit rolls for making ranged attacks while enemy units are within Engagement Range of it."
      }
    ],
    "composition": [
      "1 Gargantuan Squiggoth model"
    ],
    "loadout": "**This model is equipped with:** huge tusks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 1 kannon\n▪ 1 supa-kannon"
    ],
    "damaged": {
      "note": "1-10 wounds remaining",
      "text": "While this model has 1-10 wounds remaining, subtract 6 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "transport": "This model has a transport capacity of 20 **ORKS INFANTRY** models. Each **MEGA ARMOUR** or **JUMP PACK** model takes up the space of 2 models. **GHAZGHKULL THRAKA** takes up the space of 18 models. If this model is equipped with a supa-kannon, it has a transport capacity of 15 **ORKS INFANTRY** models.",
    "keywords": [
      "Frame",
      "Gargantuan Squiggoth",
      "Monster",
      "Titanic",
      "Towering",
      "Transport"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "ghazghkull-thraka",
    "name": "Ghazghkull Thraka",
    "points": [
      {
        "models": 1,
        "points": 300
      }
    ],
    "flavor": "To face Ghazghkull Thraka in battle is to die. Messily. He is a totemic war leader of great kunnin’ and terrifying presence who enjoys the personal protection of the Ork gods, not that he seems to need it! Makari bears aloft the personal Waaagh! banner of Ghazghkull. There isn’t a greenskin living who doesn’t fight harder in sight of that flag.",
    "profiles": [
      {
        "name": "Ghazghkull Thraka",
        "m": "8\"",
        "t": "10",
        "sv": "2+",
        "w": "16",
        "ld": "6+",
        "oc": "4",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Mork’s Roar – aimed",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 4"
        ],
        "range": "36\"",
        "a": "12",
        "bs": "5+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Mork’s Roar – point blank",
        "tags": [
          "CLOSE-QUARTERS",
          "TORRENT"
        ],
        "range": "9\"",
        "a": "2D6+2",
        "bs": "-",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Adamantine ’Eadbutt",
        "tags": [
          "DEVASTATING WOUNDS",
          "EXTRA ATTACKS",
          "PRECISION"
        ],
        "a": "1",
        "ws": "2+",
        "s": "14",
        "ap": "-2",
        "d": "D3+3"
      },
      {
        "name": "Gork’s Klaw",
        "tags": [
          "CLEAVE 2",
          "DEVASTATING WOUNDS"
        ],
        "a": "7",
        "ws": "2+",
        "s": "14",
        "ap": "-3",
        "d": "4"
      }
    ],
    "faction": "Da Boss, Waaagh!",
    "abilities": [
      {
        "name": "Da Grand Warlord's Ladz",
        "text": "While this unit is within 3\" of another friendly ORKS INFANTRY unit, this unit has **Lone Operative**."
      },
      {
        "name": "Makari, Hoist Dat Banner! (Once per battle, per army)",
        "text": "In your Movement phase, you can select a number of friendly ORKS units equal to or less than the current battle round number. Those units are **riled up** until the start of your next turn.\n\nPlace one Makari token next to the unit, removing it after this ability is used."
      },
      {
        "name": "Prophet of da Great Waaagh! (Aura)",
        "text": "While a friendly ORKS unit is within 6\" of this unit, that unit’s melee attacks have:\n▪ +1 to **hit rolls**.\n▪ +1 to **wound rolls**."
      }
    ],
    "composition": [
      "1 Ghazghkull Thraka model"
    ],
    "loadout": "**This model is equipped with:** 1 Adamantine ’Eadbutt; 1 Gork’s Klaw; 1 Mork’s Roar.",
    "rules": [
      {
        "name": "SUPREME COMMANDER",
        "text": "If this model is in your army, it must be your WARLORD."
      }
    ],
    "keywords": [
      "Character",
      "Epic Hero",
      "Explosives",
      "Infantry",
      "Warboss"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "80mm"
  },
  {
    "id": "gorkanaut",
    "name": "Gorkanaut",
    "points": [
      {
        "models": 1,
        "points": 325,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 355,
        "note": "3rd+"
      }
    ],
    "flavor": "Outcast Nobz pilot these lumbering war engines, following the echoing call of the Great Waaagh! out across the stars. They are welcomed by Ork warbands wherever they go, for the punishing hails of firepower they can unleash are devastating, and few foes can long survive the grasp of their enormous, piston-powered klaws.",
    "profiles": [
      {
        "name": "Gorkanaut",
        "m": "9\"",
        "t": "12",
        "sv": "2+",
        "w": "20",
        "ld": "7+",
        "oc": "8",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Deffstorm Mega-shoota – aimed",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "36\"",
        "a": "20",
        "bs": "5+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Deffstorm Mega-shoota – point blank",
        "tags": [
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3D6",
        "bs": "-",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Dual Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 4"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – blasta",
        "tags": [
          "BLAST 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – busta",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Skorcha",
        "tags": [
          "BLAST 1",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Klaw of Gork",
        "tags": [
          "CLEAVE 3"
        ],
        "a": "6",
        "ws": "3+",
        "s": "18",
        "ap": "-3",
        "d": "6"
      }
    ],
    "core": "Super-heavy Walker, Damaged 7, Deadly Demise D6",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Gut Hatch",
        "text": "In your Movement phase, when this unit ends a **normal move**, units embarked within this unit can make an **assault disembark move** (pg 121)."
      },
      {
        "name": "Big an’ Stompy",
        "text": "This unit’s melee attacks can re‑roll **hit rolls** of 1."
      }
    ],
    "composition": [
      "1 Gorkanaut model"
    ],
    "loadout": "**This model is equipped with:** 1 Deffstorm mega‑shoota; 2 Dual Big Shoota; 1 Klaw of Gork; 2 Rokkit Launcha; 1 Skorcha.",
    "transport": "This model has a **transport capacity** of 12 ORKS INFANTRY models. It cannot transport GHAZGHKULL THRAKA models. Each MEGA ARMOUR/JUMP PACK model takes up the space of 2 models.",
    "keywords": [
      "Titanic",
      "Towering",
      "Transport",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Orks"
    ]
  },
  {
    "id": "gretchin",
    "name": "Gretchin",
    "points": [
      {
        "points": 45,
        "note": "10 Gretchin"
      },
      {
        "points": 80,
        "note": "20 Gretchin"
      }
    ],
    "flavor": "What Gretchin – also called grots – lack in stature, courage, resilience, discipline, motivation, loyalty, aggression and personal hygiene, they allegedly make up for in numbers. They are at least reasonable shots with their underpowered firearms, and if all else fails, the Orks find that grots make excellent bullet-stops.",
    "profiles": [
      {
        "name": "Gretchin",
        "m": "6\"",
        "t": "2",
        "sv": "6+",
        "w": "1",
        "ld": "8+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Grot Blasta",
        "tags": [
          "CLOSE-QUARTERS"
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
        "name": "Scavenged Shivs",
        "tags": [],
        "a": "1",
        "ws": "5+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Downtrodden",
        "text": "For the purposes of **transport capacity**, each 2 Gretchin models (rounding up) take up the space of 1 model."
      },
      {
        "name": "Thievin’ Scavengers",
        "text": "At the end of your Movement phase, if this unit is controlling an **objective**, that **objective** is **secured**."
      }
    ],
    "composition": [
      "10‑20 Gretchin models"
    ],
    "loadout": "**Every model is equipped with:** 1 Scavenged Shivs; 1 Grot Blasta.",
    "keywords": [
      "Grots",
      "Infantry"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "grot-mega-tank",
    "name": "Grot Mega-tank",
    "points": [
      {
        "models": 1,
        "points": 110
      }
    ],
    "profiles": [
      {
        "name": "Grot Mega-tank",
        "m": "8\"",
        "t": "9",
        "sv": "3+",
        "w": "12",
        "ld": "8+",
        "oc": "4"
      }
    ],
    "ranged": [
      {
        "name": "Dual Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 4"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Dual Grotzooka",
        "tags": [
          "BLAST 1",
          "IGNORES COVER",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "D3+3",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Mega-tank Weapons",
        "tags": [
          "RAPID FIRE 10"
        ],
        "range": "18\"",
        "a": "10",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Dual Kustom Mega-blasta",
        "tags": [
          "HAZARDOUS",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Dual Rokkit Launcha – blasta",
        "tags": [
          "BLAST 2",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Dual Rokkit Launcha – busta",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Dual Skorcha",
        "tags": [
          "BLAST 1",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured Hull",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Damaged 4",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Bizarrely Resilient",
        "text": "Attacks that target this unit have -1 **AP**."
      }
    ],
    "composition": [
      "1 Grot Mega-tank model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Dual Big Shoota; 1 Dual Grotzooka; 1 Mega-tank Weapons.",
    "options": [
      "This model's Dual Grotzooka can be replaced with one of the following: 1 Dual Big Shoota, 1 Dual Kustom Mega-blasta, 1 Dual Rokkit Launcha, 1 Dual Skorcha",
      "This model's Dual Big Shoota can be replaced with one of the following: 1 Dual Grotzooka, 1 Dual Kustom Mega-blasta, 1 Dual Rokkit Launcha, 1 Dual Skorcha"
    ],
    "keywords": [
      "Frame",
      "Grots",
      "Vehicle"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "grot-tanks",
    "name": "Grot Tanks",
    "points": [
      {
        "models": 4,
        "points": 155
      },
      {
        "models": 8,
        "points": 310
      }
    ],
    "profiles": [
      {
        "name": "Grot Tank",
        "m": "10\"",
        "t": "6",
        "sv": "3+",
        "w": "5",
        "ld": "8+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Grotzooka",
        "tags": [
          "BLAST 1",
          "IGNORES COVER"
        ],
        "range": "18\"",
        "a": "D3+3",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – blasta",
        "tags": [
          "BLAST 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – busta",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "4+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Skorcha",
        "tags": [
          "BLAST 1",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Grot Tank Shoota",
        "tags": [
          "DEVASTATING WOUNDS",
          "RAPID FIRE 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kustom Mega-blasta",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Ramshackle Hull",
        "tags": [],
        "a": "3",
        "ws": "5+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Scatter! (Once per phase, per unit)",
        "text": "In your opponent's Movement phase, when an enemy unit ends a move within 8\" of this unit, if this unit is **unengaged**, this unit can make a **normal move** of up to 6\"."
      }
    ],
    "composition": [
      "4-8 Grot Tank models"
    ],
    "loadout": "**Every model is equipped with:** 1 Grot Tank Shoota; 1 Ramshackle Hull.",
    "options": [
      "Any number of models can each have their Grot Tank Shoota replaced with one of the following: 1 Grotzooka, 1 Kustom Mega-blasta, 1 Rokkit Launcha, 1 Skorcha",
      "For every four models in this unit, one model can be equipped with one of the following in addition to any other weapons:\n▪ 1 Grot tank shoota\n▪ 1 grotzooka\n▪ 1 kustom mega‑blasta\n▪ 1 rokkit launcha\n▪ 1 skorcha"
    ],
    "keywords": [
      "Frame",
      "Grots",
      "Vehicle"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "gunwagon",
    "name": "Gunwagon",
    "points": [
      {
        "models": 1,
        "points": 150,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 160,
        "note": "3rd+"
      }
    ],
    "profiles": [
      {
        "name": "Gunwagon",
        "m": "10\"",
        "t": "12",
        "sv": "3+",
        "w": "16",
        "ld": "7+",
        "oc": "5",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kannon – frag",
        "tags": [
          "BLAST 3",
          "RAPID FIRE 4"
        ],
        "range": "36\"",
        "a": "4",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kannon – shell",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "36\"",
        "a": "2",
        "bs": "4+",
        "s": "10",
        "ap": "-2",
        "d": "D6+1"
      },
      {
        "name": "Lobba",
        "tags": [
          "BLAST 3",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Killkannon",
        "tags": [
          "ANTI-INFANTRY 3+",
          "BLAST 1",
          "RAPID FIRE 4"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "4+",
        "s": "6",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Zzap Gun",
        "tags": [
          "ANTI-MONSTER/VEHICLE 4+",
          "DEVASTATING WOUNDS: MONSTER/VEHICLE",
          "RAPID FIRE 2",
          "SUSTAINED HITS 2"
        ],
        "range": "36\"",
        "a": "2",
        "bs": "4+",
        "s": "8",
        "ap": "-2",
        "d": "4"
      }
    ],
    "melee": [
      {
        "name": "Wreckin’ Ball",
        "tags": [
          "CLEAVE 2",
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "3+",
        "s": "10",
        "ap": "0",
        "d": "D6"
      },
      {
        "name": "Crushin’ Bulk",
        "tags": [
          "CLEAVE 2"
        ],
        "a": "6",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Grabbin’ Klaw",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "2",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6, Damaged 6",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Mobile Arsenal",
        "text": "In your Shooting phase, this unit’s ranged attacks can re‑roll **hit rolls** of 1."
      }
    ],
    "composition": [
      "1 Gunwagon model"
    ],
    "loadout": "**This model is equipped with:** 1 Crushin’ Bulk; 1 Kannon.",
    "options": [
      "This model can be equipped with 1 Wreckin’ Ball.",
      "This model can be equipped with 1 Grabbin’ Klaw.",
      "This model can be equipped with 1 Lobba.",
      "This model can be equipped with up to 4 Big Shoota.",
      "This model’s Kannon can be replaced with one of the following:\n▪ 1 Killkannon\n▪ 1 Zzap Gun"
    ],
    "transport": "This model has a **transport capacity** of 12 ORKS INFANTRY models. Each MEGA ARMOUR/JUMP PACK model takes up the space of 2 models. Each GHAZGHKULL THRAKA model takes up the space of 4 models.",
    "keywords": [
      "Frame",
      "Transport",
      "Vehicle",
      "Wagon"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "None"
  },
  {
    "id": "hunta-rig",
    "name": "Hunta Rig",
    "points": [
      {
        "models": 1,
        "points": 165,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 175,
        "note": "3rd+"
      }
    ],
    "flavor": "Welded, lashed and nailed together from enemy wrecks and scavenged scrap, the Hunta Rig forgoes a Wurrboy wurrtower (much to its crew’s relief). Instead it boasts an open metal deck and copious grab-handles, the better for chanting and bellowing mobs of Beast Snagga Boyz to ride along on the hunt.",
    "profiles": [
      {
        "name": "Hunta Rig",
        "m": "10\"",
        "t": "10",
        "sv": "3+",
        "w": "16",
        "ld": "7+",
        "oc": "5",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "’Eavy Lobba",
        "tags": [
          "BLAST 2",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "5+",
        "s": "6",
        "ap": "0",
        "d": "2"
      },
      {
        "name": "Stikka Kannon",
        "tags": [
          "ANTI-MONSTER/VEHICLE 2+"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Butcha Boyz",
        "tags": [
          "ANTI-MONSTER/VEHICLE 4+"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Savage Horns and Hooves",
        "tags": [
          "EXTRA ATTACKS",
          "LANCE"
        ],
        "a": "4",
        "ws": "4+",
        "s": "8",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Saw Blades",
        "tags": [
          "CLEAVE 1",
          "EXTRA ATTACKS"
        ],
        "a": "6",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6, Feel No Pain 5+, Firing Deck 11, Damaged 6",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Fully Loaded Butchery",
        "text": "This unit’s Butcha Boyz weapon has +2 **A** for each model embarked within this unit (to a maximum of +22 **A**)."
      },
      {
        "name": "Tramplasquig Charge",
        "text": "When you target this unit with the **Crushing Impact stratagem**, that use is -1 CP."
      }
    ],
    "composition": [
      "1 Hunta Rig model"
    ],
    "loadout": "**This model is equipped with:** 1 Butcha Boyz; 1 ’Eavy Lobba; 1 Savage Horns and Hooves; 1 Saw Blades; 1 Stikka Kannon.",
    "transport": "This model has a **transport capacity** of 22 BEAST SNAGGAS INFANTRY models.",
    "keywords": [
      "Beast Snagga",
      "Monster",
      "Transport",
      "Wagon"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "kaptin-badrukk",
    "name": "Kaptin Badrukk",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "profiles": [
      {
        "name": "Kaptin Badrukk",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "6",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Da Rippa – standard",
        "tags": [
          "HEAVY",
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "5+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Da Rippa – supercharge",
        "tags": [
          "HAZARDOUS",
          "HEAVY",
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "5+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Slugga",
        "tags": [
          "CLOSE-QUARTERS",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Choppa",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Flashiest Gitz",
        "text": "This unit's ranged attacks can re-roll **hit rolls**."
      },
      {
        "name": "Ded Glowy Ammo",
        "text": "Enemy units within 6\" of this model have -1 **T**."
      }
    ],
    "composition": [
      "1 Kaptin Badrukk model"
    ],
    "loadout": "**This model is equipped with:** 1 Choppa; 1 Da Rippa; 1 Slugga.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Flash Gitz"
      ]
    },
    "keywords": [
      "Character",
      "Epic Hero",
      "Infantry"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "40mm",
    "legends": true
  },
  {
    "id": "kill-rig",
    "name": "Kill Rig",
    "points": [
      {
        "models": 1,
        "points": 175,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 185,
        "note": "3rd+"
      }
    ],
    "flavor": "The Kill Rig’s stikka kannon fires rokkit-harpoons big enough to wrangle battle tanks. Its ’eavy lobba hits with ground-quaking force, and the tramplasquig that tows this land barge can flatten a fortress gate. Yet it is the Wurrboy atop his wurrtower that both the enemy and the Beast Snaggas themselves fear the most.",
    "profiles": [
      {
        "name": "Kill Rig",
        "m": "10\"",
        "t": "10",
        "sv": "3+",
        "w": "16",
        "ld": "7+",
        "oc": "5",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "’Eavy Lobba",
        "tags": [
          "BLAST 2",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "5+",
        "s": "6",
        "ap": "0",
        "d": "2"
      },
      {
        "name": "Stikka Kannon",
        "tags": [
          "ANTI-MONSTER/VEHICLE 2+"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Wurrtower",
        "tags": [
          "HAZARDOUS",
          "PSYCHIC",
          "TORRENT"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "-",
        "s": "12",
        "ap": "-3",
        "d": "6"
      }
    ],
    "melee": [
      {
        "name": "Butcha Boyz",
        "tags": [
          "ANTI-MONSTER/VEHICLE 4+",
          "EXTRA ATTACKS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Savage Horns and Hooves",
        "tags": [
          "EXTRA ATTACKS",
          "LANCE"
        ],
        "a": "4",
        "ws": "4+",
        "s": "8",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Saw Blades",
        "tags": [
          "CLEAVE 1",
          "EXTRA ATTACKS"
        ],
        "a": "6",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6, Damaged 6, Feel No Pain 5+",
    "faction": "Waaagh!, Unstable Energies",
    "abilities": [
      {
        "name": "Wurrboy (psyker level 1)",
        "text": "This model has the **psychic abilities** listed in the Psychic Abilities section (see left)."
      }
    ],
    "abilitySets": [
      {
        "name": "Wurrboy (psyker level 1)",
        "options": [
          {
            "name": "Beastscent (psychic level 1)",
            "text": "In your Movement phase, when a unit embarked within this unit is selected to make a **disembark move**, if this unit is not **battle-shocked**, you can make a **psychic roll** for this unit by rolling one D6. If you do:\n▪ On a 1, this unit is **battle-shocked**.\n▪ That disembarking unit's attacks that target a MONSTER/VEHICLE unit have +1 to **wound rolls** until the end of the turn."
          },
          {
            "name": "Warpath (psychic level 1)",
            "text": "In the Fight phase, when this unit is **selected to fight**, if this unit is not **battle-shocked**, you can make a **psychic roll** for this unit by rolling one D6. If you do:\n▪ On a 1, this unit is **battle-shocked**.\n▪ This unit's melee attacks have [LETHAL HITS] and [PSYCHIC]."
          }
        ]
      }
    ],
    "composition": [
      "1 Kill Rig model"
    ],
    "loadout": "**This model is equipped with:** 1 Butcha Boyz; 1 ’Eavy Lobba; 1 Savage Horns and Hooves; 1 Saw Blades; 1 Stikka Kannon; 1 Wurrtower.",
    "transport": "This model has a **transport capacity** of 12 BEAST SNAGGAS INFANTRY models.",
    "keywords": [
      "Beast Snagga",
      "Monster",
      "Psyker",
      "Transport",
      "Wagon"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "kill-tank",
    "name": "Kill Tank",
    "points": [
      {
        "models": 1,
        "points": 300
      }
    ],
    "profiles": [
      {
        "name": "Kill Tank",
        "m": "12\"",
        "t": "12",
        "sv": "3+",
        "w": "24",
        "ld": "6+",
        "oc": "10"
      }
    ],
    "ranged": [
      {
        "name": "Rokkit Launcha – blasta",
        "tags": [
          "BLAST 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – busta",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Skorcha",
        "tags": [
          "BLAST 1",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kannon – frag",
        "tags": [
          "BLAST 2"
        ],
        "range": "48\"",
        "a": "2D6",
        "bs": "5+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Kannon – shell",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "5+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Lobba",
        "tags": [
          "BLAST 3",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Tank Kannon – blasta",
        "tags": [
          "BLAST 2"
        ],
        "range": "48\"",
        "a": "10",
        "bs": "5+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Tank Kannon – tankhamma",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "5+",
        "s": "16",
        "ap": "-3",
        "d": "D6+6"
      },
      {
        "name": "Zzap Gun",
        "tags": [
          "ANTI-MONSTER/VEHICLE 4+",
          "DEVASTATING WOUNDS: MONSTER/VEHICLE",
          "RAPID FIRE 2",
          "SUSTAINED HITS 2"
        ],
        "range": "36\"",
        "a": "2",
        "bs": "5+",
        "s": "8",
        "ap": "-2",
        "d": "4"
      }
    ],
    "melee": [
      {
        "name": "Crushin' Bulk",
        "tags": [
          "CLEAVE 2"
        ],
        "a": "6",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Deff Rolla",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Damaged 6, Deadly Demise D6, Firing Deck 12",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Rolling Fortress",
        "text": "When an attack targets a friendly ORKS unit that is not **fully visible** to the attacking model because of this unit, the target has the **benefit of cover** against that attack."
      },
      {
        "name": "Da Biggest Boom",
        "text": "In your Shooting phase, when this unit has shot, you can select one enemy unit hit by this unit's Tank Kannon attacks. If you do, enemy units (excluding MONSTER/VEHICLE units) within 3\" of that enemy unit make a **battle-shock roll**."
      }
    ],
    "composition": [
      "1 Kill Tank model"
    ],
    "loadout": "**This model is equipped with:** 2 Big Shoota; 1 Crushin' Bulk; 1 Tank Kannon.",
    "options": [
      "This model can be equipped with up to 4 Big Shootas.",
      "This model's 2 Big Shootas can be replaced with one of the following: 2 Rokkit Launcha, 2 Skorchas",
      "This model's Tank Kannon and Crushin' Bulk can be replaced with 1 Deff Rolla and 3 Zzap Guns.",
      "This model's Zzap Gun can be replaced with one of the following: 1 Kannon, 1 Lobba"
    ],
    "transport": "This model has a **transport capacity** of 12 ORKS INFANTRY models. Each MEGA ARMOUR/JUMP PACK model takes up the space of 2 models. Each GHAZGHKULL THRAKA model takes up the space of 4 models.",
    "keywords": [
      "Frame",
      "Transport",
      "Vehicle",
      "Wagon"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "killa-kans",
    "name": "Killa Kans",
    "points": [
      {
        "models": 3,
        "points": 130,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 260,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 150,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 280,
        "note": "3rd+"
      }
    ],
    "flavor": "Surgically wiring grots into combat walkers is risky: the runty loons tend to go on a bit of a power trip, hazardous to every Ork that ever treated them badly. On the other hand, their ability to shoot straight renders their hails of rokkits, bullets and grotzooka-launched scrap- shrapnel even more hazardous to the foe.",
    "profiles": [
      {
        "name": "Killa Kan",
        "m": "8\"",
        "t": "7",
        "sv": "3+",
        "w": "5",
        "ld": "8+",
        "oc": "2",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Kan Blasta – dakka",
        "tags": [
          "BLAST 1",
          "IGNORES COVER",
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Kan Blasta – kill shot",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "4+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Kan Blasta – point blank",
        "tags": [
          "BLAST 2",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Kan Klaw",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Spiteful Power Trip",
        "text": "This unit’s attacks that target a unit that has no models with a **T** of 7+ have +1 to **hit rolls**."
      }
    ],
    "composition": [
      "3‑6 Killa Kan models"
    ],
    "loadout": "**Every model is equipped with:** 1 Kan Blasta; 1 Kan Klaw.",
    "keywords": [
      "Grots",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "kommandos",
    "name": "Kommandos",
    "points": [
      {
        "models": 10,
        "points": 125
      }
    ],
    "flavor": "No right-thinking Ork trusts Kommandos. They sneak up on the enemy rather than charging in headlong, and have an unhealthy fascination with very big knives and their application to people’s backs, throats and guts. That said, having a band of Kommandos ambush the enemy mid-battle definitely has its uses.",
    "profiles": [
      {
        "name": "Kommando",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "1"
      },
      {
        "name": "Nob",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Slugga",
        "tags": [
          "CLOSE-QUARTERS",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Burna",
        "tags": [
          "BLAST 1",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – blasta",
        "tags": [
          "BLAST 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – busta",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Kustom Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "18\"",
        "a": "4",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Big Choppa",
        "tags": [
          "CLEAVE 2"
        ],
        "a": "4",
        "ws": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Power Klaw",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Choppa",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Breacha Ram",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Infiltrators, Stealth",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Found ’Em!",
        "text": "In your Movement phase, you can select one enemy unit within 12\" of this unit. That unit has +3\" **detection range** until the end of the turn.\n\nPlace one Kommando Grot token next to that enemy unit to remind you."
      },
      {
        "name": "Taktikal Know-wotz",
        "text": "In the Declare Battle Formations step, you can split this unit into two units, each with a **starting strength** of 5. If you do, select which one of those units will have the **Bomb Squig** ability and which one of those units will have the **Found ’Em!** ability."
      },
      {
        "name": "Nowhere to Hide",
        "text": "This unit’s attacks that target a **hidden** unit have +1 to **hit rolls**."
      },
      {
        "name": "Bomb Squig (Once per battle, per unit)",
        "text": "In your Movement phase, when this unit ends a **normal move**, you can select one **visible **enemy unit within 12\" of this unit and roll one D6:\n▪ On a 3+, that enemy unit suffers D3 **mortal wounds**. Place one Bomb Squig token next to the unit, removing it after this ability is used."
      }
    ],
    "composition": [
      "1 Nob model",
      "9 Kommando models"
    ],
    "loadout": "**Every model is equipped with:** 1 Choppa; 1 Slugga.",
    "options": [
      "The Nob can have their Choppa replaced with one of the following:\n▪ 1 Big Choppa\n▪ 1 Power Klaw",
      "1 Kommando model can be equipped with 1 Burna.",
      "1 Kommando model can be equipped with 1 Rokkit Launcha.",
      "1 Kommando model can have their Choppa replaced with 1 Breacha Ram.",
      "Up to 2 Kommando models can each be equipped with 1 Kustom Shoota."
    ],
    "keywords": [
      "Explosives",
      "Infantry",
      "Smoke"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "lifta-wagon",
    "name": "Lifta Wagon",
    "points": [
      {
        "models": 1,
        "points": 135
      }
    ],
    "profiles": [
      {
        "name": "Lifta Wagon",
        "m": "10\"",
        "t": "10",
        "sv": "3+",
        "w": "16",
        "ld": "7+",
        "oc": "5",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – blasta",
        "tags": [
          "BLAST 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – busta",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Lifta-droppa",
        "tags": [
          "ANTI-VEHICLE 3+"
        ],
        "range": "36\"",
        "a": "4",
        "bs": "5+",
        "s": "6",
        "ap": "-3",
        "d": "D6+1"
      }
    ],
    "melee": [
      {
        "name": "Crushin' Bulk",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "6",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Grabbin Klaw'",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "2",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Wreckin' Ball",
        "tags": [
          "CLEAVE 2",
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "3+",
        "s": "10",
        "ap": "0",
        "d": "D6"
      }
    ],
    "core": "Damaged 6, Deadly Demise D6",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Da Bigger Dey Are, Da Better Dey Drop",
        "text": "In your Shooting phase, when this unit's Lifta-droppa destroys an enemy MONSTER/VEHICLE model with **Deadly Demise**, that enemy model suffers a **Deadly Demise** on a roll of 3+, instead of a 6."
      }
    ],
    "composition": [
      "1 Lifta Wagon model"
    ],
    "loadout": "**This model is equipped with:** 1 Crushin' Bulk; 1 Lifta-droppa.",
    "options": [
      "This model can be equipped with 1 Grabbin Klaw'",
      "This model can be equipped with one of the following: 1 Big Shoota and 1 Rokkit Launcha, 2 Big Shootas, 2 Rokkit Launcha",
      "This model can be equipped with 1 Wreckin' Ball"
    ],
    "keywords": [
      "Frame",
      "Vehicle",
      "Wagon"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "lootas",
    "name": "Lootas",
    "points": [
      {
        "models": 5,
        "points": 50
      },
      {
        "models": 10,
        "points": 100
      }
    ],
    "flavor": "Lootas grub together every toof and fistful of scrap they can, then use the former to pay the Meks to turn the latter into very, very large guns. These they then turn on the enemy with gleeful abandon, unleashing such prodigious – if erratic – hails of fire that they can stop a battle tank in its tracks or scythe down squads of infantry.",
    "profiles": [
      {
        "name": "Spanner",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "1"
      },
      {
        "name": "Loota",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Deffgun",
        "tags": [
          "HEAVY",
          "RAPID FIRE 1"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "6+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Kustom Mega-blasta",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "5+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Rokkit Launcha – blasta",
        "tags": [
          "BLAST 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – busta",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Gun Stock and Fists",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Dat's Our Loot",
        "text": "▪ This unit's ranged attacks can re-roll **hit rolls** of 1.\n▪ This unit's ranged attacks that target a unit within range of an **objective** can re-roll **hit rolls**."
      }
    ],
    "composition": [
      "1-2 Spanner models",
      "4-8 Loota models"
    ],
    "loadout": "**Every Spanner is equipped with:** 1 Big Shoota; 1 Gun Stock and Fists.\n**Every Loota is equipped with:** 1 Deffgun; 1 Gun Stock and Fists.",
    "options": [
      "Any number of Spanner models can each have their Big Shoota replaced with one of the following: 1 Kustom Mega-blasta, 1 Rokkit Launcha"
    ],
    "keywords": [
      "Infantry"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "32mm",
    "legends": true
  },
  {
    "id": "mad-dok-grotsnik",
    "name": "Mad Dok Grotsnik",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "profiles": [
      {
        "name": "Mad Dok Grotsnik",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "4",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Slugga",
        "tags": [
          "CLOSE-QUARTERS",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Power Klaw",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "'Urty Syringe",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS: INFANTRY",
          "EXTRA ATTACKS",
          "PRECISION"
        ],
        "a": "1",
        "ws": "3+",
        "s": "2",
        "ap": "0",
        "d": "D6"
      }
    ],
    "core": "Leader, Feel No Pain 5+",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "One Scalpel Short of a Medpack",
        "text": "When this unit is selected to make a **fall-back move**, that **fall-back move** does not prevent this unit from being **eligible to declare a charge**."
      },
      {
        "name": "Mad Dok",
        "text": "In your Command phase, select one friendly ORKS INFANTRY unit within 6\" of this model, and select one of the following:\n▪ That unit **heals** 3 wounds.\n▪ __Or:__ If all models in that unit have their starting number of wounds, **revive** one CHARACTER model in that unit."
      }
    ],
    "composition": [
      "1 Mad Dok Grotsnik model"
    ],
    "loadout": "**This model is equipped with:** 1 Power Klaw; 1 Slugga; 1 'Urty Syringe.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Boyz",
        "Burna Boyz",
        "Lootas",
        "Nobz",
        "Tankbustas"
      ]
    },
    "keywords": [
      "Character",
      "Epic Hero",
      "Infantry",
      "Painboy"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "32mm",
    "legends": true
  },
  {
    "id": "meganobz",
    "name": "Meganobz",
    "points": [
      {
        "models": 2,
        "points": 75,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 110,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 185,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 225,
        "note": "1st-2nd"
      },
      {
        "models": 2,
        "points": 115,
        "note": "3rd+"
      },
      {
        "models": 3,
        "points": 150,
        "note": "3rd+"
      },
      {
        "models": 5,
        "points": 225,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 265,
        "note": "3rd+"
      }
    ],
    "flavor": "Mega armour comprises massive slabs of metal bashed roughly into shape, and is powered by pistons and sheer brute strength. It is highly resilient and can mount an array of potent weaponry. It is also usually worn to battle by toof-rich Nobz who would be scary enough even were they not each wearing their own Ork-portable bunker.",
    "profiles": [
      {
        "name": "Meganob",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "3",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Kustom Shoota – aimed",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "18\"",
        "a": "4",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kustom Shoota – point blank",
        "tags": [
          "CLOSE-QUARTERS",
          "TORRENT"
        ],
        "range": "6\"",
        "a": "D3+3",
        "bs": "-",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kombi-weapon – kill shot",
        "tags": [],
        "range": "24\"",
        "a": "1",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Kombi-weapon – point blank",
        "tags": [
          "BLAST 1",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kombi-weapon – shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Power Klaw",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Twin Killsaws",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "3",
        "ws": "4+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Killsaw",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Arrogant Invulnerability",
        "text": "Attacks that target this unit have -1 **AP**."
      },
      {
        "name": "Krumpin’ Time",
        "text": "In the Fight phase, if this unit is **riled up**, this unit has +1 to **hit rolls**."
      }
    ],
    "composition": [
      "2‑6 Meganob models"
    ],
    "loadout": "**Every model is equipped with:** 1 Kustom Shoota; 1 Power Klaw.",
    "options": [
      "Any number of models can each have their Power Klaw replaced with 1 Killsaw.",
      "Any number of models can each have their Kustom Shoota replaced with 1 Kombi‑weapon.",
      "Any number of models can each have their Power Klaw and Kustom Shoota replaced with 1 Twin Killsaws."
    ],
    "keywords": [
      "Explosives",
      "Infantry",
      "Mega Armour"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "mek",
    "name": "Mek",
    "points": [
      {
        "models": 1,
        "points": 45
      }
    ],
    "flavor": "Any Mekboy worth his spanners knows how to patch and repair greenskin vehicles, artillery pieces and the like even amidst the fury of combat. Meks are also handy for a spot of good old-fashioned dakka and close-quarters violence, taking to the field armed to the teeth with kustom weaponry that they invented themselves.",
    "profiles": [
      {
        "name": "Mek",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "4",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Kustom Mega-slugga",
        "tags": [
          "CLOSE-QUARTERS",
          "HAZARDOUS"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "4+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Mek’s Toolz",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Kustom Dakka",
        "text": "This unit’s ranged attacks have [IGNORES COVER]."
      },
      {
        "name": "Clever Know-wotz",
        "text": "In your Movement phase, at the start or end of this unit's move, you can select one friendly ORKS VEHICLE model (excluding AIRCRAFT/TITANIC models) within 3\" of this model:\n▪ That VEHICLE model **heals** D3 wounds.\n▪ That VEHICLE model's attacks have +1 to **hit rolls** until the start of your next Movement phase."
      }
    ],
    "composition": [
      "1 Mek model"
    ],
    "loadout": "**This model is equipped with:** 1 Kustom Mega‑slugga; 1 Mek’s Toolz.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Boyz",
        "Flash Gitz",
        "Mek Gunz",
        "Nobz",
        "Tankbustas"
      ]
    },
    "keywords": [
      "Character",
      "Explosives",
      "Infantry"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "mek-gunz",
    "name": "Mek Gunz",
    "points": [
      {
        "models": 1,
        "points": 55,
        "note": "1st-2nd"
      },
      {
        "models": 2,
        "points": 110,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 165,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 65,
        "note": "3rd+"
      },
      {
        "models": 2,
        "points": 120,
        "note": "3rd+"
      },
      {
        "models": 3,
        "points": 175,
        "note": "3rd+"
      }
    ],
    "flavor": "From guns that spew unstable force-bubbles to overcharged energy cannons, gravity beamers that crumple their targets like a squig-oil canister in a Nob’s fist to tractor-beams that toss foes about and drag planes from the air, the only unifying factor about the madcap Mek Gunz is what a mess they make of the foe.",
    "profiles": [
      {
        "name": "Mek Gunz",
        "m": "5\"",
        "t": "6",
        "sv": "4+",
        "w": "6",
        "ld": "8+",
        "oc": "2",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Smasha Gun",
        "tags": [
          "BLAST 1"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "4+",
        "s": "7",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Bubblechukka",
        "tags": [
          "BLAST 3",
          "LETHAL HITS"
        ],
        "range": "48\"",
        "a": "8",
        "bs": "4+",
        "s": "3",
        "ap": "-3",
        "d": "1"
      },
      {
        "name": "Kustom Mega-kannon",
        "tags": [
          "BLAST 1",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "D3+1",
        "bs": "4+",
        "s": "12",
        "ap": "-2",
        "d": "4"
      },
      {
        "name": "Traktor Kannon",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "4+",
        "s": "6",
        "ap": "-2",
        "d": "D3+3"
      }
    ],
    "melee": [
      {
        "name": "Scavenged Shivs",
        "tags": [],
        "a": "5",
        "ws": "5+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Madcap Artillery",
        "text": "In your Shooting phase, when this unit has shot, if all ranged weapons equipped by each Mek Gunz model in this unit are the same, select one enemy unit hit by those attacks. That enemy unit has the ability below that matches that weapon's name until the start of your next turn:\n▪ **Bubblechukka:** This unit is **wobbled**. While a **wobbled** unit is attacking, its targets have the **benefit of cover** against those attacks.\n▪ **Kustom Mega-kannon:** This unit is **zapped**. While a unit is **zapped**, that unit has -1 **Ld**.\n▪ **Smasha Gun:** This unit is **smashed**. While a unit is **smashed**, that unit has -2\" **M**.\n▪ **Traktor Kannon:** This unit is **grounded**. While a unit is **grounded**, it cannot **take to the skies**. Place five Grot Crew tokens next to each Mek Gun model, removing one each time its Mek Gun model loses a wound (a Mek Gun model itself is considered to represent its final wound)."
      }
    ],
    "composition": [
      "1‑3 Mek Gunz models"
    ],
    "loadout": "**Every model is equipped with:** 1 Scavenged Shivs; 1 Smasha Gun.",
    "options": [
      "Any number of models can each have their Smasha Gun replaced with one of the following:\n▪ 1 Bubblechukka\n▪ 1 Kustom Mega‑kannon\n▪ 1 Traktor Kannon"
    ],
    "keywords": [
      "Frame",
      "Grots",
      "Vehicle"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "None"
  },
  {
    "id": "mekboy-workshop",
    "name": "Mekboy Workshop",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "profiles": [
      {
        "name": "Mekboy Workshop",
        "m": "-",
        "t": "9",
        "sv": "4+",
        "w": "10",
        "ld": "7+",
        "oc": "0"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Workshop",
        "text": "▪ When this unit is set up, all parts of it must be set up in a single group, in which each part is within 1\" of another part.\n▪ At the end of the Movement phase, each friendly ORKS VEHICLE within 6\" of this unit **heals** D3 wounds. Each friendly ORKS VEHICLE unit can only be affected by this ability once per turn."
      },
      {
        "name": "Fortification",
        "text": "While an enemy unit is **engaged** with only FORTIFICATION units:\n▪ That enemy unit can be selected as a target of ranged attacks.\n▪ When shooting that enemy unit, those ranged attacks have -1 to **hit rolls** (excluding [CLOSE-QUARTERS] attacks).\n▪ When that enemy unit is selected to make a **fall-back move**, if that enemy unit is only **engaged** with FORTIFICATION units, and that enemy unit is not **battle-shocked**, **hazard rolls** made for that enemy unit are automatically passed."
      },
      {
        "name": "Ramshackle Cover",
        "text": "When an attack targets a unit that is not **fully visible** to the attacking model because of this unit, the target has the **benefit of cover** against that attack."
      }
    ],
    "composition": [
      "1 Mekboy Workshop model"
    ],
    "keywords": [
      "Fortification",
      "Frame",
      "Vehicle"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "Custom",
    "legends": true
  },
  {
    "id": "morkanaut",
    "name": "Morkanaut",
    "points": [
      {
        "models": 1,
        "points": 345,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 375,
        "note": "3rd+"
      }
    ],
    "flavor": "Usually piloted by the exiled Badmek who built it, a Morkanaut is a hulking combat walker with a dash of Mork-esque know-wotz applied. Packed with all manner of glowy gubbinz, Morkanauts unleash their arsenals of bizarre and deadly weapons in what their pilots think of as displays of pure kunnin’ worthy of Mork.",
    "profiles": [
      {
        "name": "Morkanaut",
        "m": "9\"",
        "t": "12",
        "sv": "2+",
        "w": "20",
        "ld": "7+",
        "oc": "8",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Dual Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 4"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kustom Mega-blasta",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Kustom Mega-zappa",
        "tags": [
          "BLAST 1",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "12",
        "ap": "-2",
        "d": "4"
      },
      {
        "name": "Rokkit Launcha – blasta",
        "tags": [
          "BLAST 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – busta",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "4+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Klaw of Mork",
        "tags": [
          "CLEAVE 2"
        ],
        "a": "5",
        "ws": "3+",
        "s": "18",
        "ap": "-3",
        "d": "6"
      }
    ],
    "core": "Super-heavy Walker, Damaged 7, Deadly Demise D6",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Big an’ Shooty",
        "text": "In your Shooting phase, this unit’s ranged attacks can re‑roll **hit rolls** of 1."
      },
      {
        "name": "Gut Hatch",
        "text": "In your Movement phase, when this unit ends a **normal move**, units embarked within this unit can make an **assault disembark move** (pg 121)."
      }
    ],
    "composition": [
      "1 Morkanaut model"
    ],
    "loadout": "**This model is equipped with:** 2 Dual Big Shoota; 1 Klaw of Mork; 1 Kustom Mega‑blasta; 1 Kustom Mega‑zappa; 2 Rokkit Launcha.",
    "transport": "This model has a **transport capacity** of 12 ORKS INFANTRY models. It cannot transport GHAZGHKULL THRAKA models. Each MEGA ARMOUR/JUMP PACK model takes up the space of 2 models.",
    "keywords": [
      "Titanic",
      "Towering",
      "Transport",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Orks"
    ]
  },
  {
    "id": "mozrog-skragbad",
    "name": "Mozrog Skragbad",
    "points": [
      {
        "models": 1,
        "points": 170
      }
    ],
    "flavor": "Mozrog and his squigosaur steed Big Chompa are so tough that they can weather the worst any foe throws at them. In return, few enemies survive for long once Mozrog tears into them with his kustom cybork arm, Gutrippa. Those that do are doomed to be swallowed whole by Big Chompa’s yawning, fang-stuffed jaws.",
    "profiles": [
      {
        "name": "Mozrog Skragbad",
        "m": "10\"",
        "t": "9",
        "sv": "3+",
        "w": "10",
        "ld": "6+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Thump Gun",
        "tags": [
          "ANTI-MONSTER/VEHICLE 4+"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "5+",
        "s": "6",
        "ap": "0",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Big Chompa’s Jaws",
        "tags": [
          "ANTI-MONSTER/VEHICLE 3+",
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "7",
        "ap": "-2",
        "d": "4"
      },
      {
        "name": "Gutrippa – hunter (vs MONSTER/VEHICLE)",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "12",
        "ap": "-2",
        "d": "D6+1"
      },
      {
        "name": "Gutrippa – standard",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "6",
        "ws": "2+",
        "s": "9",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Feel No Pain 5+",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "One Last Kill",
        "text": "In the Fight phase, when this model is **destroyed**, if this unit has not been **selected to fight** this phase, roll one D6:\n▪ On a 2+, do not remove this model from the battlefield. When this unit has fought, or at the end of the phase (whichever comes first), this model is removed from the battlefield."
      },
      {
        "name": "Da Bigger Dey Iz…",
        "text": "This unit’s melee attacks that target a MONSTER/VEHICLE unit can re‑roll **wound rolls**."
      },
      {
        "name": "Beast Snagga Following",
        "text": "While this unit is within 3\" of a friendly BEAST SNAGGA unit (excluding MONSTER CHARACTER units), this unit has **Lone Operative**."
      }
    ],
    "composition": [
      "1 Mozrog Skragbad model"
    ],
    "loadout": "**This model is equipped with:** 1 Big Chompa’s Jaws; 1 Gutrippa; 1 Thump Gun.",
    "keywords": [
      "Beast Snagga",
      "Character",
      "Epic Hero",
      "Monster"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "80mm"
  },
  {
    "id": "nazdreg",
    "name": "Nazdreg",
    "points": [
      {
        "models": 1,
        "points": 175
      }
    ],
    "profiles": [
      {
        "name": "Nazdreg",
        "m": "5\"",
        "t": "7",
        "sv": "2+",
        "w": "8",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Kustom Blasta X – gatler",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Kustom Blasta X – shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "18\"",
        "a": "4",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Kustom Blasta X – skorcha",
        "tags": [
          "BLAST 1",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Kustom Blasta X",
        "tags": [
          "CLEAVE 1",
          "EXTRA ATTACKS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Moonchewa",
        "tags": [
          "CLEAVE 1",
          "TWIN-LINKED"
        ],
        "a": "5",
        "ws": "2+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Leader, Deep Strike",
    "faction": "Waaagh!, Da Boss",
    "abilities": [
      {
        "name": "Intimidating Motivation (Once per battle round, per army)",
        "text": "In your Movement phase, at the start or end of this unit's move, you can select one friendly ORKS unit within 6\" of this unit. That unit:\n▪ Is no longer **battle-shocked**.\n▪ Is **riled up** until the start of your next turn."
      },
      {
        "name": "Nazdreg’s Know‑wotz",
        "text": "▪ This unit has **Deep Strike**.\n▪ This unit's ranged attacks have [IGNORES COVER]."
      },
      {
        "name": "Supreme Kunnin’ (Once per phase, per army)",
        "text": "In your opponent's Movement phase, when an enemy unit ends a move within 8\" of this unit, if this unit is **unengaged**, this unit can:\n▪ Make a **normal move** of up to D6\".\n▪ __Or:__ If this unit is **riled up**, make a **normal move** of up to 5\"."
      }
    ],
    "composition": [
      "1 Nazdreg model"
    ],
    "loadout": "**This model is equipped with:** 1 Kustom Blasta X; 1 Moonchewa.\nThis model’s Kustom Blasta X weapon has three separate ranged weapon profiles, each of which can be selected to make attacks with.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Meganobz"
      ]
    },
    "keywords": [
      "Character",
      "Epic Hero",
      "Infantry",
      "Mega Armour",
      "Warboss"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "nobz",
    "name": "Nobz",
    "points": [
      {
        "models": 5,
        "points": 125,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 250,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 155,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 280,
        "note": "3rd+"
      }
    ],
    "flavor": "Nobz swagger into battle wielding a jaw-dropping assortment of kombi-weapons, favourite sluggas, very large choppas, piston-driven klaws and any other instrument of gratuitous violence they can get their claws on. Coupled with their exceptional resilience and sheer belligerence, this renders them terrifying combatants indeed.",
    "profiles": [
      {
        "name": "Nob",
        "m": "6\"",
        "t": "5",
        "sv": "4+",
        "w": "3",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Big Skorcha",
        "tags": [
          "BLAST 2",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Kombi-rokkit – busta rokkit",
        "tags": [],
        "range": "24\"",
        "a": "1",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Kombi-rokkit – shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kustom Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "18\"",
        "a": "4",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kustom Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "18\"",
        "a": "8",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Kustom Choppa",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Kustom Krumpa",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Big Choppa",
        "tags": [
          "CLEAVE 2"
        ],
        "a": "4",
        "ws": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Get Out da Way!",
        "text": "While making a **charge move**, this unit can move through models (excluding MONSTER/VEHICLE models)."
      },
      {
        "name": "Ammo Runts (Once per battle, per unit)",
        "text": "In your Shooting phase, when this unit is **selected to shoot**, you can use this ability. If you do, this unit’s ranged attacks have +1 to **hit rolls**.\n\nPlace any number of Ammo Runt tokens next to the unit, removing them when this ability is used."
      }
    ],
    "composition": [
      "5‑10 Nob models"
    ],
    "loadout": "**Every model is equipped with:** 1 Kustom Krumpa; 1 Kustom Shoota.",
    "options": [
      "For every 5 models in this unit, 1 model can have their Kustom Krumpa and Kustom Shoota replaced with 1 Big Skorcha and 1 Kustom Choppa.",
      "For every 5 models in this unit, 1 model can have their Kustom Krumpa and Kustom Shoota replaced with 1 Kustom Big Shoota and 1 Kustom Choppa.",
      "For every 5 models in this unit, 1 model can have their Kustom Krumpa and Kustom Shoota replaced with 1 Big Choppa.",
      "For every 5 models in this unit, 1 model can have their Kustom Shoota replaced with 1 Paired Krumpas.",
      "Any number of models can each have their Kustom Shoota replaced with 1 Kombi-rokkit."
    ],
    "wargearAbilities": [
      {
        "name": "Paired Krumpas",
        "text": "Attacks made with this model’s Kustom Krumpa weapon can re-roll **hit rolls** and **wound rolls**."
      }
    ],
    "keywords": [
      "Explosives",
      "Infantry"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "painboss",
    "name": "Painboss",
    "points": [
      {
        "models": 1,
        "points": 60,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 70,
        "note": "3rd+"
      }
    ],
    "flavor": "The Painboss specialises in both the surgical care and cyber-augmentation of squigs, and of those suffering squig-related injuries. So as to provide their services ‘on the hoof’, Painbosses augment themselves with piston-driven soopa-legz, monowheels and the like – the better to deliver high-speed doktorin’.",
    "profiles": [
      {
        "name": "Painboss",
        "m": "6\"",
        "t": "5",
        "sv": "4+",
        "w": "4",
        "ld": "7+",
        "oc": "1",
        "inv": "6+"
      }
    ],
    "melee": [
      {
        "name": "Beast Snagga Klaw",
        "tags": [
          "ANTI-MONSTER/VEHICLE 4+"
        ],
        "a": "3",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Push Dat Bit Back In (Once per battle, per unit)",
        "text": "In your Command phase, select one friendly BEAST SNAGGA unit within 6\" of this unit. That unit **heals** 3 wounds.\n\nPlace a Grot Orderly token next to the unit, removing it when this ability is used."
      },
      {
        "name": "Hardy Bioniks",
        "text": "Attacks that target this unit with a **S** greater than this unit’s **T** have -1 to **wound rolls**."
      },
      {
        "name": "Runnin’ wiv da Herd",
        "text": "While this model is attached to a MOUNTED unit, this model:\n▪ Does not have INFANTRY.\n▪ Has MOBILE and MOUNTED.\n▪ Has +4\" **M**."
      }
    ],
    "composition": [
      "1 Painboss model"
    ],
    "loadout": "**This model is equipped with:** 1 Beast Snagga Klaw.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Beast Snagga Boyz",
        "Squighog Boyz"
      ]
    },
    "keywords": [
      "Beast Snagga",
      "Character",
      "Infantry"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "painboy",
    "name": "Painboy",
    "points": [
      {
        "models": 1,
        "points": 45
      }
    ],
    "flavor": "The traditional tools of the Painboy help them to patch up even the most mangled Orks and send them back into the fight. Helpfully, all these gruesome surgical klaws, rippy saws and fat syringes also serve as an expedient means of dismembering the enemy with – if not surgical precision – at least a great deal of enthusiasm!",
    "profiles": [
      {
        "name": "Painboy",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "melee": [
      {
        "name": "’Urty Syringe",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS: INFANTRY",
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "3+",
        "s": "2",
        "ap": "0",
        "d": "D6"
      },
      {
        "name": "Dok’s Toolz",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Crude Surgery",
        "text": "In your Command phase, this unit **heals** 3 wounds."
      },
      {
        "name": "Catch Dat Red Bit (Once per battle, per unit)",
        "text": "When this model uses its **Crude Surgery** ability, you can add D3 to the number of wounds **healed**.\n\nPlace a Grot Orderly token next to the unit, removing it when this ability is used."
      }
    ],
    "composition": [
      "1 Painboy model"
    ],
    "loadout": "**This model is equipped with:** 1 Dok’s Toolz; 1 ’Urty Syringe.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Boyz",
        "Breaka Boyz",
        "Flash Gitz",
        "Nobz",
        "Tankbustas"
      ]
    },
    "keywords": [
      "Character",
      "Infantry"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "rukkatrukk-squigbuggies",
    "name": "Rukkatrukk Squigbuggies",
    "points": [
      {
        "models": 1,
        "points": 85
      },
      {
        "models": 2,
        "points": 160
      }
    ],
    "flavor": "These vehicles started out as mobile food wagons, but became weapons of war the moment Orks realised how hilarious it was to pelt the enemy (or their mates) with squigs that latched on like living man-traps, squigs that vomited corrosive or toxic juices, and squigs with a propensity for detonating like an artillery shell.",
    "profiles": [
      {
        "name": "Rukkatrukk Squigbuggy",
        "m": "12\"",
        "t": "7",
        "sv": "4+",
        "w": "9",
        "ld": "7+",
        "oc": "3",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Sawn-off Shotgun",
        "tags": [
          "ASSAULT",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "12\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Squig Launchas",
        "tags": [
          "IGNORES COVER"
        ],
        "range": "24\"",
        "a": "D6+6",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Saw Blades",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "4",
        "ws": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Squig Barrage",
        "text": "In your Shooting phase, when this unit has shot, select one enemy unit (excluding MONSTER/VEHICLE units) hit by this unit’s Squig Launchas weapons. That enemy unit is **covered in Squigs** until the start of your next turn:\n▪ While a unit is **covered in Squigs**, that unit’s attacks have -1 to **hit rolls**."
      }
    ],
    "composition": [
      "1‑2 Rukkatrukk Squigbuggy models"
    ],
    "loadout": "**Every model is equipped with:** 1 Saw Blades; 1 Sawn‑off Shotgun; 1 Squig Launchas.",
    "keywords": [
      "Explosives",
      "Speed Freeks",
      "Vehicle"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "150mm"
  },
  {
    "id": "runtherd",
    "name": "Runtherd",
    "points": [
      {
        "models": 1,
        "points": 10
      }
    ],
    "profiles": [
      {
        "name": "Runtherd",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Slugga",
        "tags": [
          "CLOSE-QUARTERS",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Runtherd’s Toolz",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "That’ll Learn Ya (Once per battle round, per unit)",
        "text": "When this unit becomes **battle‑shocked**, if this unit contains 4+ Gretchin models, you can roll one D3:\n▪ That number of Gretchin models in this unit are **destroyed**.\n▪ This unit is no longer **battle‑shocked**."
      }
    ],
    "composition": [
      "1 Runtherd model"
    ],
    "loadout": "**This model is equipped with:** 1 Runtherd’s Toolz; 1 Slugga.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Gretchin"
      ]
    },
    "keywords": [
      "Character",
      "Infantry"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "squighog-boyz",
    "name": "Squighog Boyz",
    "points": [
      {
        "models": 4,
        "points": 140,
        "note": "1st-2nd"
      },
      {
        "models": 8,
        "points": 280,
        "note": "1st-2nd"
      },
      {
        "models": 4,
        "points": 160,
        "note": "3rd+"
      },
      {
        "models": 8,
        "points": 300,
        "note": "3rd+"
      }
    ],
    "flavor": "With their mounts snorting and saddlegitz hanging on for dear life, Squighog Boyz thunder into the fight. They fling rokkit-propelled stikkas, hitting with enough force to pierce plate armour, then employ muscle, weight, momentum and sheer belligerence to squash those foes still standing to a paste.",
    "profiles": [
      {
        "name": "Squighog Boy",
        "m": "10\"",
        "t": "6",
        "sv": "4+",
        "w": "3",
        "ld": "7+",
        "oc": "2",
        "inv": "6+"
      },
      {
        "name": "Nob on Smasha Squig",
        "m": "10\"",
        "t": "6",
        "sv": "4+",
        "w": "4",
        "ld": "7+",
        "oc": "2",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Slugga",
        "tags": [
          "CLOSE-QUARTERS",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Saddlegit’s Shiv",
        "tags": [
          "ASSAULT"
        ],
        "range": "9\"",
        "a": "1",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Stikka",
        "tags": [
          "ANTI-MONSTER/VEHICLE 4+",
          "ASSAULT"
        ],
        "range": "9\"",
        "a": "1",
        "bs": "5+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Big Choppa",
        "tags": [
          "ANTI-MONSTER/VEHICLE 4+",
          "CLEAVE 2"
        ],
        "a": "4",
        "ws": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Squig’s Jaws",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Stikka",
        "tags": [
          "ANTI-MONSTER/VEHICLE 4+"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Bomb Squig (Once per battle, per unit)",
        "text": "In your Movement phase, when this unit ends a **normal move**, you can select one **visible **enemy unit within 12\" of this unit and roll one D6:\n▪ On a 3+, that enemy unit suffers D3 **mortal wounds**. Place one Bomb Squig token next to the unit, removing it after this ability is used."
      },
      {
        "name": "Brutal Impact",
        "text": "If this unit made a **charge move** this turn, this unit’s attacks have +1 **D**."
      }
    ],
    "composition": [
      "1‑2 Nob on Smasha Squig models",
      "3‑6 Squighog Boy models"
    ],
    "loadout": "**Every Nob on Smasha Squig is equipped with:** 1 Big Choppa; 1 Slugga; 1 Squig’s Jaws.\n**Every Squighog Boy is equipped with:** 1 Saddlegit’s Shiv; 1 Squig’s Jaws; 1 Stikka.",
    "keywords": [
      "Beast Snagga",
      "Explosives",
      "Mobile",
      "Mounted"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "75mm, 90x52.5mm Oval Base"
  },
  {
    "id": "stompa",
    "name": "Stompa",
    "points": [
      {
        "models": 1,
        "points": 700,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 800,
        "note": "2nd+"
      }
    ],
    "flavor": "Something akin to a bad-tempered, armour-plated mountain covered in guns, the Stompa is a walking idol to Gork and Mork. It packs enough firepower to level an enemy fortress or annihilate entire formations of troops with a single volley, while anything unlucky enough to get within reach is soon crushed flat.",
    "profiles": [
      {
        "name": "Stompa",
        "m": "10\"",
        "t": "14",
        "sv": "2+",
        "w": "30",
        "ld": "6+",
        "oc": "12",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Deffkannon and Supa-rokkits",
        "tags": [
          "BLAST 2"
        ],
        "range": "72\"",
        "a": "12",
        "bs": "5+",
        "s": "14",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Skorcha",
        "tags": [
          "BLAST 2",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Supa-gatler – point blank",
        "tags": [
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3D6+3",
        "bs": "-",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Supa-gatler – aimed",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "30",
        "bs": "5+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Mega-choppa",
        "tags": [
          "CLEAVE 4"
        ],
        "a": "6",
        "ws": "3+",
        "s": "24",
        "ap": "-4",
        "d": "10"
      }
    ],
    "core": "Deadly Demise 2D6, Super-heavy Walker, Damaged 10",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Idol of Belligerence",
        "text": "In your Movement phase, when a unit embarked within this unit is selected to make a **disembark move**, that unit is **riled up** until the start of your next turn."
      },
      {
        "name": "Waaagh! Effigy",
        "text": "This unit is **riled up**."
      }
    ],
    "composition": [
      "1 Stompa model"
    ],
    "loadout": "**This model is equipped with:** 5 Big Shoota; 1 Deffkannon and Supa‑rokkits; 1 Mega‑choppa; 1 Skorcha; 1 Supa‑gatler.",
    "transport": "This model has a **transport capacity** of 22 ORKS INFANTRY models. Each MEGA ARMOUR/JUMP PACK model takes up the space of 2 models. Each GHAZGHKULL THRAKA model takes up the space of 4 models.",
    "keywords": [
      "Frame",
      "Titanic",
      "Towering",
      "Transport",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "None"
  },
  {
    "id": "stormboyz",
    "name": "Stormboyz",
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
    "flavor": "Most Orks mock Stormboyz for their acts of juvenile rebellion, from taking orders and shining their boots to marching about, talking about ‘taktics’ and even following a battle plan. Yet when that plan is ‘strap on a high powered rokkit and hurtle into the enemy bellowing “Waaagh!”’, it does prove to have its merits.",
    "profiles": [
      {
        "name": "Stormboy",
        "m": "12\"",
        "t": "5",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "1"
      },
      {
        "name": "nob",
        "m": "12\"",
        "t": "5",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Slugga",
        "tags": [
          "CLOSE-QUARTERS",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Choppa",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Kustom Choppa",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power Klaw",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Rokkit Charge",
        "text": "When this unit is **selected to fight**, if this unit made a **charge move** this turn, you can use this ability. If you do, this unit’s melee attacks have:\n▪ +1 **A** and **S**.\n▪ [HAZARDOUS]."
      }
    ],
    "composition": [
      "1 Nob model",
      "4‑9 Stormboy models"
    ],
    "loadout": "**The Nob is equipped with:** 1 Kustom Choppa; 1 Slugga.\n**Every Stormboy is equipped with:** 1 Choppa; 1 Slugga.",
    "options": [
      "The Nob can have their Kustom Choppa replaced with 1 Power Klaw."
    ],
    "keywords": [
      "Explosives",
      "Fly",
      "Infantry",
      "Jump Pack"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "tankbustas",
    "name": "Tankbustas",
    "points": [
      {
        "models": 6,
        "points": 145,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 155,
        "note": "3rd+"
      }
    ],
    "flavor": "Tankbustas fixate on blasting enemy vehicles into scrap using barrages of rokkits that detonate in deafening explosions. They wield varied, cobbled-together launchas, and are laden with an arsenal of explosive projectiles, whose dubious reliability is made up for by the Tankbustas’ enthusiasm.",
    "profiles": [
      {
        "name": "Tankbusta",
        "m": "6\"",
        "t": "5",
        "sv": "4+",
        "w": "2",
        "ld": "7+",
        "oc": "1"
      },
      {
        "name": "Nob",
        "m": "6\"",
        "t": "5",
        "sv": "4+",
        "w": "3",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Busta Rokkit Launcha – hunter (vs MONSTER/VEHICLE)",
        "tags": [],
        "range": "24\"",
        "a": "3",
        "bs": "4+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Busta Rokkit Launcha – standard",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "4+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Rokkit Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Gitstikka",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Choppa",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Smash Hammer – hunter (vs MONSTER/VEHICLE)",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Smash Hammer – standard",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Rokkit Barrage",
        "text": "In your Shooting phase, when this unit has shot, select one enemy unit hit by those attacks. That unit makes a **battle-shock roll**, with -1 to that **battle-shock roll**."
      },
      {
        "name": "Bomb Squigs (Once per turn, twice per battle, per unit)",
        "text": "In your Movement phase, when this unit ends a **normal move**, you can select one **visible **enemy unit within 12\" of this unit and roll one D6:\n▪ On a 3+, that enemy unit suffers D3 **mortal wounds**. Place two Bomb Squig tokens next to the unit, removing one each time this ability is used."
      }
    ],
    "composition": [
      "1 Nob model",
      "5 Tankbusta models"
    ],
    "loadout": "**The Nob is equipped with:** 1 Choppa; 2 Rokkit Pistol.\n**Every Tankbusta is equipped with:** 1 Busta Rokkit Launcha; 1 Gitstikka.",
    "options": [
      "The Nob can have their Rokkit Pistol replaced with 1 Smash Hammer.",
      "1 Tankbusta model can be equipped with one of the following:\n▪ 1 Busta Rokkit Launcha\n▪ 1 Pulsa Rokkit"
    ],
    "wargearAbilities": [
      {
        "name": "Pulsa Rokkit",
        "text": "Once per battle, when the bearer’s unit is selected to shoot in your Shooting phase, the bearer can use its pulsa rokkit. If it does, until the end of the phase, improve the Strength and Armour Penetration characteristics of ranged weapons equipped by models in the bearer’s unit by 1."
      }
    ],
    "keywords": [
      "Explosives",
      "Infantry"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "32mm, 40mm"
  },
  {
    "id": "trukk",
    "name": "Trukk",
    "points": [
      {
        "models": 1,
        "points": 60,
        "note": "1st-3rd"
      },
      {
        "models": 1,
        "points": 70,
        "note": "4th+"
      }
    ],
    "flavor": "Trukks are ramshackle assemblages of hastily welded and riveted scrap metal bolted to overpowered engine blocks and rusty chassis. Rolling on fat, armoured tyres, they bear mobs of Orks into battle at high speed, shrugging off enemy fire by the simple expedient of shedding ablative panels and plates.",
    "profiles": [
      {
        "name": "Trukk",
        "m": "12\"",
        "t": "8",
        "sv": "4+",
        "w": "10",
        "ld": "7+",
        "oc": "2",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Rokkit Launcha – blasta",
        "tags": [
          "BLAST 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rokkit Launcha – busta",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Dual Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 4"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Spiked Ram",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "3",
        "ws": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Grabbin’ Klaw",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "2",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Buzzsaw",
        "tags": [
          "CLEAVE 1",
          "EXTRA ATTACKS"
        ],
        "a": "2",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3, Firing Deck 12",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Pilin’ Out",
        "text": "In your opponent's Movement phase, when an enemy unit ends a move within 8\" of this model, units embarked within this model can make a **disembark move** using the **rapid disembark mode**."
      }
    ],
    "composition": [
      "1 Trukk model"
    ],
    "loadout": "**This model is equipped with:** 1 Dual Big Shoota; 1 Spiked Ram.",
    "options": [
      "This model’s Dual Big Shoota can be replaced with 1 Rokkit Launcha.",
      "This model can be equipped with one of the following:\n▪ 1 Buzzsaw\n▪ 1 Grabbin' Klaw"
    ],
    "transport": "This model has a **transport capacity** of 12 ORKS INFANTRY models. It cannot transport GHAZGHKULL THRAKA/JUMP PACK models. Each MEGA ARMOUR model takes up the space of 2 models.",
    "keywords": [
      "Dedicated Transport",
      "Frame",
      "Speed Freeks",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Orks"
    ]
  },
  {
    "id": "warbikers",
    "name": "Warbikers",
    "points": [
      {
        "models": 3,
        "points": 75
      },
      {
        "models": 6,
        "points": 140
      }
    ],
    "flavor": "Ork Warbikers race into battle with dakkaguns hammering, ragged trails of dust and smoke boiling up behind them like an ill omen. They race one another at breakneck pace to reach the enemy first, execute death-defying stunts at suicidal speeds, then crash headlong into the foe’s battle line like battering rams.",
    "profiles": [
      {
        "name": "Warbiker",
        "m": "12\"",
        "t": "6",
        "sv": "4+",
        "w": "3",
        "ld": "7+",
        "oc": "2",
        "inv": "6+"
      },
      {
        "name": "Biker Nob",
        "m": "12\"",
        "t": "6",
        "sv": "4+",
        "w": "4",
        "ld": "7+",
        "oc": "2",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Dual Kombi-rokkit – busta rokkit",
        "tags": [
          "ASSAULT"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Dual Kombi-rokkit – dakkagun",
        "tags": [
          "ASSAULT",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "18\"",
        "a": "6",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Dual Dakkagun",
        "tags": [
          "ASSAULT",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "18\"",
        "a": "6",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Kustom Choppa",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Choppa",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "High‑speed Carnage",
        "text": "If this unit made a **charge move** this turn, this unit’s melee attacks have:\n▪ +1 **S** and **D**."
      }
    ],
    "composition": [
      "1 Biker Nob model",
      "2‑5 Warbiker models"
    ],
    "loadout": "**The Biker Nob is equipped with:** 1 Kustom Choppa; 1 Dual Kombi-rokkit.\n**Every Warbiker is equipped with:** 1 Choppa; 1 Dual Dakkagun.",
    "keywords": [
      "Explosives",
      "Mounted",
      "Speed Freeks"
    ],
    "factionKeywords": [
      "Orks"
    ]
  },
  {
    "id": "warboss",
    "name": "Warboss",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "A towering slab of muscle, fangs and bad attitude, the Warboss leads the charge from the very front. With klaw, fist and dakka the green behemoth bulldozes a bloody path through the enemy. Meanwhile, his window-rattling war cry and weapons-grade glower motivate his ladz to ever more gratuitous violence.",
    "profiles": [
      {
        "name": "Warboss",
        "m": "6\"",
        "t": "6",
        "sv": "4+",
        "w": "6",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Kustom Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "18\"",
        "a": "4",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kombi-rokkit – busta rokkit",
        "tags": [],
        "range": "24\"",
        "a": "1",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Kombi-rokkit – shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kombi-skorcha – shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Kombi-skorcha – skorcha",
        "tags": [
          "BLAST 1",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Kustom Choppa",
        "tags": [
          "CLEAVE 2"
        ],
        "a": "6",
        "ws": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power Klaw",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "12",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Da Boss, Waaagh!",
    "abilities": [
      {
        "name": "Might Is Right",
        "text": "If this unit made a **charge move** this turn, this model’s melee attacks have:\n▪ +3 **A**.\n▪ +2 **S**."
      },
      {
        "name": "Boss’ Ammo Runt (Once per battle, per unit)",
        "text": "In your Shooting phase, when this unit is **selected to shoot**, you can use this ability. If you do, this model’s ranged attacks have +1 to **hit rolls**.\n\nPlace a Boss’ Ammo Runt token next to the unit, removing it when this ability is used."
      },
      {
        "name": "Intimidating Motivation (Once per battle round, per army)",
        "text": "In your Movement phase, at the start or end of this unit's move, you can select one friendly ORKS unit within 6\" of this unit. That unit:\n▪ Is no longer **battle-shocked**.\n▪ Is **riled up** until the start of your next turn."
      }
    ],
    "composition": [
      "1 Warboss model"
    ],
    "loadout": "**This model is equipped with:** 1 Kustom Choppa; 1 Kustom Shoota.",
    "options": [
      "This model’s Kustom Choppa can be replaced with 1 Power Klaw.",
      "This model’s Kustom Shoota can be replaced with one of the following:\n▪ 1 Kombi‑rokkit\n▪ 1 Kombi‑skorcha"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Boyz",
        "Breaka Boyz",
        "Nobz"
      ]
    },
    "keywords": [
      "Character",
      "Explosives",
      "Infantry",
      "Warboss"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "warboss-in-mega-armour",
    "name": "Warboss in Mega Armour",
    "points": [
      {
        "models": 1,
        "points": 125,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 140,
        "note": "3rd+"
      }
    ],
    "flavor": "Any good Ork hunter knows the safest way to deal with a rampaging Warboss is to hit them with tank-busting artillery from as far away as possible. By donning a piston-driven suit of incredibly durable mega armour, the Warboss makes a mockery of such underhanded enemy tactics, much to the terror of his foes.",
    "profiles": [
      {
        "name": "Warboss in Mega Armour",
        "m": "5\"",
        "t": "7",
        "sv": "2+",
        "w": "7",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Big Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "’Uge Choppa",
        "tags": [
          "CLEAVE 2"
        ],
        "a": "5",
        "ws": "2+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Leader",
    "faction": "Da Boss, Waaagh!",
    "abilities": [
      {
        "name": "Krushin’ Impetus",
        "text": "When this unit ends a **charge move**, you can select one enemy unit **engaged** with this unit. If you do, roll one D6 for each model in this unit **engaged** with that enemy unit:\n▪ For each 3+, that enemy unit suffers 1 **mortal wound**."
      },
      {
        "name": "Intimidating Motivation (Once per battle round, per army)",
        "text": "In your Movement phase, at the start or end of this unit's move, you can select one friendly ORKS unit within 6\" of this unit. That unit:\n▪ Is no longer **battle-shocked**.\n▪ Is **riled up** until the start of your next turn."
      }
    ],
    "composition": [
      "1 Warboss in Mega Armour model"
    ],
    "loadout": "**This model is equipped with:** 1 Big Shoota; 1 ’Uge Choppa.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Meganobz"
      ]
    },
    "keywords": [
      "Character",
      "Infantry",
      "Mega Armour",
      "Warboss"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "warboss-on-warbike",
    "name": "Warboss on Warbike",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "profiles": [
      {
        "name": "Warboss on Warbike",
        "m": "12\"",
        "t": "6",
        "sv": "4+",
        "w": "7",
        "ld": "6+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Dual Dakkagun",
        "tags": [
          "ASSAULT",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "range": "18\"",
        "a": "6",
        "bs": "5+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Killsaw",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Power Klaw",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "12",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Big Choppa",
        "tags": [
          "CLEAVE 2"
        ],
        "a": "6",
        "ws": "2+",
        "s": "9",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Waaagh!, Da Boss",
    "abilities": [
      {
        "name": "Get Back in Da Race",
        "text": "In your Movement phase, at the start or end of this unit's move, you can select one friendly SPEED FREEKS unit within 6\" of this unit. That unit (and any units embarked within that unit):\n▪ Is no longer **battle-shocked**.\n▪ Is **riled up** until the start of your next turn."
      },
      {
        "name": "Speedboss",
        "text": "This unit's melee attacks have +1 to **hit rolls**."
      }
    ],
    "composition": [
      "1 Warboss on Warbike model"
    ],
    "loadout": "**This model is equipped with:** 1 Dual Dakkagun; 1 Killsaw.",
    "options": [
      "This model's Killsaw can be replaced with one of the following: 1 Big Choppa, 1 Power Klaw"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Warbikers"
      ]
    },
    "keywords": [
      "Character",
      "Explosives",
      "Mounted",
      "Speed Freeks"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "100x40mm Oval Base",
    "legends": true
  },
  {
    "id": "warbuggies",
    "name": "Warbuggies",
    "points": [
      {
        "models": 1,
        "points": 70
      },
      {
        "models": 2,
        "points": 130
      }
    ],
    "profiles": [
      {
        "name": "Warbuggy",
        "m": "12\"",
        "t": "7",
        "sv": "4+",
        "w": "9",
        "ld": "7+",
        "oc": "3",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Extra Dakka",
        "tags": [
          "ASSAULT",
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "SUSTAINED HITS 1"
        ],
        "range": "12\"",
        "a": "4",
        "bs": "5+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Mek Speshul – aimed",
        "tags": [
          "ASSAULT",
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "14",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Mek Speshul – point blank",
        "tags": [
          "ASSAULT",
          "TORRENT"
        ],
        "range": "6\"",
        "a": "2D6+2",
        "bs": "-",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Rivet Kannon – aimed",
        "tags": [
          "ANTI-INFANTRY 4+",
          "ASSAULT",
          "DEVASTATING WOUNDS: INFANTRY"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "4+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Rivet Kannon – point blank",
        "tags": [
          "ANTI-INFANTRY 4+",
          "ASSAULT",
          "DEVASTATING WOUNDS: INFANTRY",
          "TORRENT"
        ],
        "range": "6\"",
        "a": "D3+1",
        "bs": "-",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Spiked Ram",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "4",
        "ws": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Drive-by Skorchin’",
        "text": "In your Movement phase, you can select one **visible **enemy unit (excluding MONSTER/VEHICLE units) within 6\" of this unit:\n▪ That enemy unit cannot be targeted with the **Fire Overwatch stratagem** until the end of the turn."
      }
    ],
    "composition": [
      "1‑2 Warbuggy models"
    ],
    "loadout": "**Every model is equipped with:** 1 Extra Dakka; 1 Mek Speshul; 1 Spiked Ram.",
    "options": [
      "Any number of models can each have their Mek Speshul replaced with 1 Rivet Kannon."
    ],
    "keywords": [
      "Explosives",
      "Speed Freeks",
      "Vehicle"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "150mm"
  },
  {
    "id": "wartrakks",
    "name": "Wartrakks",
    "points": [
      {
        "models": 1,
        "points": 70
      },
      {
        "models": 2,
        "points": 130
      }
    ],
    "flavor": "The Wartrakk is a fast, lightly armoured attack vehicle that mounts a rack of armour-busting rokkits. Aimed and fired by the leering Nob who rides on the back, these projectiles compensate for their inaccuracy by making a spectacular mess of anything they actually hit.",
    "profiles": [
      {
        "name": "Wartrakk",
        "m": "12\"",
        "t": "6",
        "sv": "4+",
        "w": "7",
        "ld": "7+",
        "oc": "3",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Kustom Shoota",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 2"
        ],
        "range": "18\"",
        "a": "4",
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Multi-busta Launcha",
        "tags": [],
        "range": "24\"",
        "a": "D3+3",
        "bs": "5+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Kustom Choppa",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Speednob Support",
        "text": "While each model in this unit is within 3\" of a friendly SPEED FREEKS unit (excluding WARTRAKK units), this unit has **Lone Operative**."
      },
      {
        "name": "Bust ’Em",
        "text": "In your Shooting phase, when this unit has shot, select one enemy unit hit by those attacks. That unit is **busted** until the end of the turn:\n▪ Friendly SPEED FREEKS units’ attacks that target a **busted** unit have [LETHAL HITS]."
      }
    ],
    "composition": [
      "1‑2 Wartrakk models"
    ],
    "loadout": "**Every model is equipped with:** 1 Kustom Choppa; 1 Kustom Shoota; 1 Multi-busta Launcha.",
    "keywords": [
      "Mounted",
      "Speed Freeks"
    ],
    "factionKeywords": [
      "Orks"
    ]
  },
  {
    "id": "wazbom-blastajet",
    "name": "Wazbom Blastajet",
    "points": [
      {
        "models": 1,
        "points": 215,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 235,
        "note": "3rd+"
      }
    ],
    "flavor": "Some Meks take to the skies in their own kustom aircraft. The result is the Wazbom Blastajet, an airborne workshop that is wreathed in a protective force field, and bristling with weird weapons that pluck their targets from the ground, blast them to atoms or rip them apart with conflicting tellyporta beams.",
    "profiles": [
      {
        "name": "Wazbom Blastajet",
        "m": "-",
        "t": "9",
        "sv": "3+",
        "w": "12",
        "ld": "7+",
        "oc": "-1",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Smasha Gun",
        "tags": [
          "IGNORES COVER"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "4+",
        "s": "6",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Dual Wazbom Mega-kannon",
        "tags": [
          "HAZARDOUS",
          "IGNORES COVER"
        ],
        "range": "36\"",
        "a": "4",
        "bs": "4+",
        "s": "12",
        "ap": "-2",
        "d": "4"
      },
      {
        "name": "Dual Tellyport Mega-blasta",
        "tags": [
          "BLAST 1",
          "IGNORES COVER",
          "RAPID FIRE 6"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Dual Supa-shoota",
        "tags": [
          "IGNORES COVER",
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "RAPID FIRE 4"
        ],
        "range": "36\"",
        "a": "8",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured Impact",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Damaged 4, Deadly Demise D3",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Go fer da Weak Spot",
        "text": "In your Shooting phase, this unit's ranged attacks that target a MONSTER/VEHICLE unit have +1 to **wound rolls**."
      }
    ],
    "composition": [
      "1 Wazbom Blastajet model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Impact; 1 Smasha Gun; 1 Dual Wazbom Mega-kannon.",
    "options": [
      "This model’s Dual Wazbom Mega-kannon can be replaced with 1 Dual Tellyport Mega‑blasta.",
      "This model can be equipped with 1 Blastajet Force Field.",
      "This model can be equipped with 1 Dual Supa‑shoota."
    ],
    "wargearAbilities": [
      {
        "name": "Blastajet Force Field",
        "text": "The bearer has a 4+ invulnerable save, but it loses the **GRENADES** keyword."
      }
    ],
    "keywords": [
      "Aircraft",
      "Fly",
      "Smoke",
      "Speed Freeks",
      "Vehicle"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "120mm"
  },
  {
    "id": "wazdakka-gutsmek",
    "name": "Wazdakka Gutsmek",
    "points": [
      {
        "models": 1,
        "points": 200
      }
    ],
    "flavor": "Wazdakka Gutsmek thunders to battle aboard his kustom warbike, Big Revva. Using its throttlerokkit shokka, he reaches incredible speeds or even tellyports across the battlefield, spewing rounds from his psyko-gatler, tearing foes to bloody tatters with his grabba dragga, and wreaking high-speed havoc.",
    "profiles": [
      {
        "name": "Wazdakka Gutsmek",
        "m": "14\"",
        "t": "8",
        "sv": "3+",
        "w": "10",
        "ld": "6+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Grabba Dragga",
        "tags": [
          "ASSAULT",
          "PRECISION"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Psyko-gatler",
        "tags": [
          "ASSAULT",
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "12",
        "bs": "4+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Speeding Bulk and Flaming Exhaust",
        "tags": [
          "CLEAVE 1",
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Fixit’s Wrench",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Grabba Dragga",
        "tags": [
          "CLEAVE 2",
          "LANCE"
        ],
        "a": "6",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deep Strike, Deadly Demise D3, Lone Operative",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Full Throttle",
        "text": "In your Command phase, select one Throttlerokkit Shokka Engine ability (see left). This unit has that ability until the start of your next Command phase."
      }
    ],
    "abilitySets": [
      {
        "name": "Full Throttle",
        "options": [
          {
            "name": "Turbo Engine",
            "text": "When this unit is selected to make an **advance**/**fall-back move**, that move does not prevent this unit from being **eligible to declare a charge**."
          },
          {
            "name": "Shokk Attack Engine",
            "text": "In your Command phase, if this unit is **unengaged**, you can place this unit in **strategic reserves**."
          },
          {
            "name": "Pulse Jet",
            "text": "In your Movement phase, when this unit is **selected to move**, if this unit is **unengaged**, this unit can make a **pulse jet move** (pg 121)."
          }
        ]
      }
    ],
    "composition": [
      "1 Wazdakka Gutsmek model"
    ],
    "loadout": "**This model is equipped with:** 1 Speeding Bulk and Flaming Exhaust; 1 Fixit’s Wrench; 1 Grabba Dragga; 1 Psyko‑gatler.",
    "keywords": [
      "Character",
      "Epic Hero",
      "Mounted",
      "Smoke",
      "Speed Freeks",
      "Vehicle"
    ],
    "factionKeywords": [
      "Orks"
    ]
  },
  {
    "id": "weirdboy",
    "name": "Weirdboy",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "flavor": "Weirdboyz channel the Waaagh! energy that builds up around battling Orks, unleashing it before it causes their heads to literally explode. This they do with gusto, whether vomiting blasts of devastating green ectoplasm at the enemy or teleporting Orks madly about the place.",
    "profiles": [
      {
        "name": "Weirdboy",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "4",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Power Vomit",
        "tags": [
          "BLAST 1",
          "HAZARDOUS",
          "PSYCHIC",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Copper Staff",
        "tags": [
          "PSYCHIC"
        ],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Support, Deadly Demise D3",
    "faction": "Unstable Energies, Waaagh!",
    "abilities": [
      {
        "name": "Waaagh! Energy (psyker level 1)",
        "text": "This model has the **psychic abilities** listed in the Psychic Abilities section (see left)."
      }
    ],
    "abilitySets": [
      {
        "name": "Waaagh! Energy (psyker level 1)",
        "options": [
          {
            "name": "Da Jump (psychic level 1, once per army, per battle round)",
            "text": "In your Movement phase, if this unit is not **battle-shocked**, you can make a **psychic roll** for this unit by rolling one D6. If you do:\n▪ On a 1, this unit is **battle-shocked**.\n▪ Place this unit in **strategic reserves**.\n▪ This unit has **Deep Strike**."
          },
          {
            "name": "Warpath (psychic level 1)",
            "text": "In the Fight phase, when this unit is **selected to fight**, if this unit is not **battle-shocked**, you can make a **psychic roll** for this unit by rolling one D6. If you do:\n▪ On a 1, this unit is **battle-shocked**.\n▪ This unit's melee attacks can re-roll **wound rolls** of 1.\n▪ This unit’s melee attacks have [PSYCHIC]."
          }
        ]
      }
    ],
    "composition": [
      "1 Weirdboy model"
    ],
    "loadout": "**This model is equipped with:** 1 Power Vomit; 1 Copper Staff.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Beast Snagga Boyz",
        "Boyz"
      ]
    },
    "keywords": [
      "Character",
      "Infantry",
      "Psyker"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "zodgrod-wortsnagga",
    "name": "Zodgrod Wortsnagga",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "flavor": "With his Grabzappa crackling, Zodgrod herds his notorious super runts into battle. This irascible loon is never happier than when wrangling especially large and rowdy foes, usually by giving them a good dose of needles from his Squigstoppa Numba 5, then burying them in a rampaging horde of diminutive little monsters.",
    "profiles": [
      {
        "name": "Zodgrod Wortsnagga",
        "m": "6\"",
        "t": "5",
        "sv": "5+",
        "w": "5",
        "ld": "7+",
        "oc": "1",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Squigstoppa",
        "tags": [
          "ANTI-MONSTER/VEHICLE 4+",
          "CLOSE-QUARTERS",
          "DEVASTATING WOUNDS: MONSTER/VEHICLE"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "5+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Da Grabzappa",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Waaagh!",
    "abilities": [
      {
        "name": "Super Runts",
        "text": "▪ This unit is **riled up**.\n▪ This unit's Scavenged Shivs weapons have +1 **A**, **WS** and **S**."
      }
    ],
    "composition": [
      "1 Zodgrod Wortsnagga model"
    ],
    "loadout": "**This model is equipped with:** 1 Da Grabzappa; 1 Squigstoppa.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Gretchin"
      ]
    },
    "keywords": [
      "Character",
      "Epic Hero",
      "Infantry",
      "Runtherd"
    ],
    "factionKeywords": [
      "Orks"
    ],
    "baseSize": "50mm"
  }
]

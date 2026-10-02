// Deathwatch — datasheets. Unit roster and points from src/data/mfm/deathwatch.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
// Transcribed from app data 963 (Codex: Space Marines and its Supplements) by
// scripts/gen-datasheets.mjs — re-run it rather than hand-porting a whole codex.
// 10 sheets of this Chapter's own here (0 of them Legends from the Faction Pack, which
// the MFM still prices); 94 Codex: Space Marines sheets are folded in by id — see
// sharedUnitIds below (derived by the generator, not kept by hand) and datasheets/index.js.
export const sharedUnitIds = [
  "aggressor-squad",
  "ancient",
  "ancient-in-terminator-armour",
  "apothecary",
  "apothecary-biologis",
  "assault-intercessor-squad",
  "assault-intercessors-with-jump-packs",
  "astraeus",
  "ballistus-dreadnought",
  "bladeguard-ancient",
  "bladeguard-veteran-squad",
  "brutalis-dreadnought",
  "captain",
  "captain-in-gravis-armour",
  "captain-in-phobos-armour",
  "captain-in-terminator-armour",
  "captain-on-bike",
  "captain-with-jump-pack",
  "centurion-assault-squad",
  "centurion-devastator-squad",
  "cerberus",
  "chaplain",
  "chaplain-in-terminator-armour",
  "chaplain-on-bike",
  "chaplain-with-jump-pack",
  "company-heroes",
  "desolation-squad",
  "dreadnought",
  "drop-pod",
  "eliminator-squad",
  "eradicator-squad-with-heavy-bolters",
  "eradicator-squad-with-melta-rifles",
  "falchion",
  "firestrike-servo-turrets",
  "gladiator-lancer",
  "gladiator-reaper",
  "gladiator-valiant",
  "hammerfall-bunker",
  "heavy-intercessor-squad",
  "hellblaster-squad",
  "impulsor",
  "inceptor-squad",
  "incursor-squad",
  "infernus-squad",
  "infiltrator-squad",
  "intercessor-squad",
  "invader-atvs",
  "invictor-tactical-warsuit",
  "judiciar",
  "kratos",
  "land-raider",
  "land-raider-crusader",
  "land-raider-excelsior",
  "land-raider-redeemer",
  "land-speeder",
  "librarian",
  "librarian-in-phobos-armour",
  "librarian-in-terminator-armour",
  "lieutenant",
  "lieutenant-in-phobos-armour",
  "lieutenant-with-combi-weapon",
  "mastodon",
  "outrider-squad",
  "predator-annihilator",
  "predator-destructor",
  "rapier-carrier",
  "razorback",
  "redemptor-dreadnought",
  "reiver-squad",
  "relic-razorback",
  "repulsor",
  "repulsor-executioner",
  "rhino",
  "rhino-primaris",
  "scout-bike-squad",
  "sicaran",
  "sternguard-veteran-squad",
  "storm-speeder-hailstrike",
  "storm-speeder-hammerstrike",
  "storm-speeder-thunderstrike",
  "stormhawk-interceptor",
  "stormraven-gunship",
  "stormtalon-gunship",
  "tarantula-air-defence-battery",
  "tarantula-sentry-battery",
  "techmarine",
  "terrax-pattern-termite",
  "thunderhawk-gunship",
  "typhon",
  "vanguard-veteran-squad",
  "vanguard-veteran-squad-with-jump-packs",
  "venerable-dreadnought",
  "vindicator",
  "whirlwind"
]

export const pointsOverrides = {}
export default [
  {
    "id": "corvus-blackstar",
    "name": "Corvus Blackstar",
    "points": [
      {
        "models": 1,
        "points": 180
      }
    ],
    "flavor": "Corvus Blackstars are sleek and shrouded aircraft used to insert kill teams into heavily infested landing zones or even xenos strongholds. With a barrage of missiles, Blackstars secure aerial supremacy and sweep the target site clear before firing their hover jets and delivering their deadly payload of elite warriors.",
    "profiles": [
      {
        "name": "Corvus Blackstar",
        "m": "14\"",
        "t": "10",
        "sv": "3+",
        "w": "14",
        "ld": "6+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Twin Lascannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Hurricane Bolter",
        "tags": [
          "RAPID FIRE 6",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Stormstrike Missile Launcher",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Blackstar Rocket Launcher",
        "tags": [
          "BLAST 1"
        ],
        "range": "30\"",
        "a": "4",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Twin Assault Cannon",
        "tags": [
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "1"
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
    "core": "Deadly Demise D6, Damaged 5, Hover, Stealth",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Blackstar Cluster Launcher",
        "text": "In your Movement phase, when this unit ends a **[gloss:normal-move:normal move]**, select up to one enemy unit this unit moved over during that move and roll six D6:\n▪ For each 4+, that unit suffers 1 **[gloss:mortal-wound:mortal wound]**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Auspex Array",
        "text": "Ranged weapons equipped by the bearer have the **[IGNORES COVER]** ability."
      }
    ],
    "composition": [
      "1 Corvus Blackstar model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; Auspex Array; 2 Blackstar Rocket Launcher; 1 Twin Assault Cannon.",
    "options": [
      "This model can be equipped with 1 Hurricane Bolter",
      "This model's 2 Blackstar Rocket Launchers can be replaced with 2 Stormstrike Missile Launchers.",
      "This model's Twin Assault Cannon can be replaced with 1 Twin Lascannon."
    ],
    "transport": "This model has a **[gloss:transport-capacity:transport capacity]** of 12 DEATHWATCH INFANTRY models. Each GRAVIS/JUMP PACK/TERMINATOR model takes up the space of 2 models.",
    "keywords": [
      "Fly",
      "Imperium",
      "Smoke",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Deathwatch"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "deathwatch-terminator-squad",
    "name": "Deathwatch Terminator Squad",
    "points": [
      {
        "models": 5,
        "points": 190,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 380,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 230,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 420,
        "note": "3rd+"
      }
    ],
    "flavor": "The indomitable warriors honoured to wear hulking suits of Terminator armour are an inspiring sight to their brethren. Deathwatch Terminators carry the most powerful close combat weapons, and the strength and durability of their armour allows them to take the heaviest firepower directly into hidden xenos lairs.",
    "profiles": [
      {
        "name": "Deathwatch Terminator Sergeant",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      },
      {
        "name": "Deathwatch Terminator",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Storm Bolter",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Assault Cannon",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Cyclone Missile Launcher – frag",
        "tags": [
          "BLAST 2"
        ],
        "range": "36\"",
        "a": "8",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Cyclone Missile Launcher – krak",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D3+3"
      },
      {
        "name": "Heavy Flamer",
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
        "name": "Plasma Cannon – standard",
        "tags": [
          "BLAST 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Plasma Cannon – supercharge",
        "tags": [
          "BLAST 1",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Chainfist – hunter",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Chainfist – standard",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power Fist",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power Weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Thunder Hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Twin Lightning Claws",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "6",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Terminatus Assault",
        "text": "▪ This unit can re-roll **[gloss:charge-roll:charge rolls]**.\n▪ After this unit ends a **[gloss:charge-move:charge move]**, each enemy unit **[gloss:engaged:engaged]** with this unit makes a **[gloss:battle-shock-test:battle-shock roll]**, with -1 to that **battle-shock roll** if it's a NON-IMPERIUM/CHAOS unit."
      },
      {
        "name": "Teleport Homer",
        "text": "At the start of the battle, you can set up one Teleport Homer token for this unit on the battlefield. If you do:\n▪ When you target this unit with the **Rapid Ingress stratagem**, you can use that Teleport Homer token. If you do, that use is -1 CP, but when resolving that **[gloss:stratagem:stratagem]**, this unit must be set up within 3\" of that Teleport Homer token and not within 8\" of an enemy unit. That Teleport Homer token is then removed from the battlefield.\n▪ If an enemy unit ends a move within 1\" of that Teleport Homer token, that Teleport Homer token is removed from the battlefield."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "This model has +1 **[gloss:wounds:W]**."
      }
    ],
    "composition": [
      "1 Deathwatch Terminator Sergeant model",
      "4-9 Deathwatch Terminator models"
    ],
    "loadout": "**Every model is equipped with:** 1 Power Fist; 1 Storm Bolter.",
    "options": [
      "Up to 3 Deathwatch Terminator models can each have their Storm Bolter replaced with one of the following: 1 Assault Cannon, 1 Cyclone Missile Launcher and 1 Storm Bolter, 1 Heavy Flamer, 1 Plasma Cannon",
      "Any number of models can each have their Power Fist and Storm Bolter replaced with one of the following: 1 Storm Bolter and 1 Chainfist, 1 Storm Bolter and 1 Power Weapon, 1 Thunder Hammer and 1 Storm Shield, 1 Twin Lightning Claws"
    ],
    "keywords": [
      "Imperium",
      "Infantry",
      "Kill Team",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Deathwatch"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "deathwatch-veterans",
    "name": "Deathwatch Veterans",
    "points": [
      {
        "models": 5,
        "points": 115
      },
      {
        "models": 10,
        "points": 220
      }
    ],
    "flavor": "Deathwatch Veterans’ skills have been honed in their former Chapter for decades, sometimes centuries. Throughout their long vigil against the manifold xenos threats, each Veteran learns to arm himself so as to best contribute to the mission at hand, and squads carry an array of weapons to fell any foe.",
    "profiles": [
      {
        "name": "Watch Sergeant",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Deathwatch Veteran",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Infernus Heavy Bolter – bolt",
        "tags": [
          "HEAVY",
          "RAPID FIRE 2",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Infernus Heavy Bolter – infernus",
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
      },
      {
        "name": "Combi-weapon – damnatus",
        "tags": [],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Combi-weapon – infernus",
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
        "name": "Combi-weapon – purgatus",
        "tags": [
          "MELTA 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Stalker-pattern Boltgun",
        "tags": [
          "HEAVY",
          "PRECISION"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Deathwatch Shotgun",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Boltgun",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Frag Cannon",
        "tags": [
          "BLAST 1",
          "HEAVY",
          "LETHAL HITS",
          "RAPID FIRE 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Knives and Fists",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Black Shield Blades",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Xenophase Blade",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Heavy Thunder Hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Power Weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Death to the Alien",
        "text": "This unit's attacks can:\n▪ Re-roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ __Or:__ If the target of those attacks does not have IMPERIUM/CHAOS, re-roll **hit rolls**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "This model has a 4+ **[gloss:invulnerable-save:InSv]**."
      }
    ],
    "composition": [
      "1 Watch Sergeant model",
      "4-9 Deathwatch Veteran models"
    ],
    "loadout": "**Every model is equipped with:** 1 Boltgun; 1 Power Weapon.",
    "options": [
      "The Watch Sergeant can have their Boltgun replaced with 1 Combi-weapon.",
      "For every 5 models in this unit, 1 Deathwatch Veteran model can have their Boltgun and Power Weapon replaced with 1 Stalker-pattern Boltgun and 1 Knives and Fists.",
      "For every 5 models in this unit, 1 Deathwatch Veteran model can have their Boltgun and Power Weapon replaced with 1 Infernus Heavy Bolter and 1 Knives and Fists.",
      "The Watch Sergeant can have their Power Weapon replaced with 1 Xenophase Blade.",
      "For every 5 models in this unit, up to 2 Deathwatch Veteran models can each have their Boltgun and Power Weapon replaced with 1 Deathwatch Shotgun and 1 Knives and Fists.",
      "For every 5 models in this unit, up to 2 Deathwatch Veteran models can each have their Boltgun and Power Weapon replaced with 1 Heavy Thunder Hammer.",
      "For every 5 models in this unit, 1 Deathwatch Veteran model can have their Boltgun and Power Weapon replaced with 1 Frag Cannon and 1 Knives and Fists.",
      "1 Deathwatch Veteran model can have their Boltgun and Power Weapon replaced with 1 Black Shield Blades.",
      "For every 5 models in this unit, up to 2 Deathwatch Veteran models can each have their Boltgun and Power Weapon replaced with one of the following: 1 Boltgun and 1 Storm Shield, 1 Power Weapon and 1 Storm Shield"
    ],
    "keywords": [
      "Battleline",
      "Explosives",
      "Imperium",
      "Infantry",
      "Kill Team"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Deathwatch"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "decimus-kill-team",
    "name": "Decimus Kill Team",
    "points": [
      {
        "models": 5,
        "points": 110
      },
      {
        "models": 10,
        "points": 210
      }
    ],
    "flavor": "The Decimus Kill Team provides a force-appropriate response to any alien threat at a squad-based level. Every warrior in this hand-picked squad possesses their own specialisms and an array of potent armaments that make them the bane of not only xenos foes but any enemy unlucky enough to bar their path.",
    "profiles": [
      {
        "name": "Kill Team Sergeant",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Gravis Veteran",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Deathwatch Veteran with Heavy Thunder Hammer and Bolt Pistol",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Deathwatch Veteran with Deathwatch Marksman Bolt Carbine, Special-issue Bolt Pistol and Knives and Fists",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Deathwatch Veteran with Stalker Bolt Rifle, Bolt Pistol and Knives and Fists",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Deathwatch Veteran with Xenophase Blade and Special-issue Bolt Pistol",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Infernus Heavy Bolter – bolt",
        "tags": [
          "HEAVY",
          "RAPID FIRE 2",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Infernus Heavy Bolter – infernus",
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
      },
      {
        "name": "Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Plasma Pistol – standard",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma Pistol – supercharge",
        "tags": [
          "CLOSE-QUARTERS",
          "HAZARDOUS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Plasma Incinerator – standard",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Plasma Incinerator – supercharge",
        "tags": [
          "ASSAULT",
          "HAZARDOUS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Frag Cannon",
        "tags": [
          "BLAST 1",
          "HEAVY",
          "LETHAL HITS",
          "RAPID FIRE 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Hellstorm Bolt Rifle",
        "tags": [
          "ASSAULT",
          "HEAVY",
          "LETHAL HITS"
        ],
        "range": "30\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Grenade Launcher – frag",
        "tags": [
          "BLAST 1"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Grenade Launcher – krak",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Deathwatch Marksman Bolt Carbine",
        "tags": [
          "HEAVY",
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Special-issue Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS",
          "LETHAL HITS",
          "PRECISION"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Stalker Bolt Rifle",
        "tags": [
          "HEAVY",
          "LETHAL HITS",
          "PRECISION"
        ],
        "range": "30\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Knives and Fists",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power Weapon",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Heavy Thunder Hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Xenophase Blade",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Death to the Alien",
        "text": "This unit's attacks can:\n▪ Re-roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ __Or:__ If the target of those attacks does not have IMPERIUM/CHAOS, re-roll **hit rolls**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "This model has a 4+ **[gloss:invulnerable-save:InSv]**."
      }
    ],
    "composition": [
      "1 Deathwatch Veteran with Xenophase Blade and Special-issue Bolt Pistol model",
      "1 Kill Team Sergeant model",
      "1-2 Deathwatch Veteran with Deathwatch Marksman Bolt Carbine, Special-issue Bolt Pistol and Knives and Fists models",
      "1-2 Deathwatch Veteran with Heavy Thunder Hammer and Bolt Pistol models",
      "1-2 Deathwatch Veteran with Stalker Bolt Rifle, Bolt Pistol and Knives and Fists models",
      "1-2 Gravis Veteran models"
    ],
    "loadout": "**The Deathwatch Veteran with Xenophase Blade and Special-issue Bolt Pistol is equipped with:** 1 Special-issue Bolt Pistol; 1 Xenophase Blade.\n**The Kill Team Sergeant is equipped with:** 1 Plasma Pistol; 1 Power Weapon.\n**Every Deathwatch Veteran with Deathwatch Marksman Bolt Carbine, Special-issue Bolt Pistol and Knives and Fists is equipped with:** 1 Deathwatch Marksman Bolt Carbine; 1 Knives and Fists; 1 Special-issue Bolt Pistol.\n**Every Deathwatch Veteran with Heavy Thunder Hammer and Bolt Pistol is equipped with:** 1 Bolt Pistol; 1 Heavy Thunder Hammer.\n**Every Deathwatch Veteran with Stalker Bolt Rifle, Bolt Pistol and Knives and Fists is equipped with:** 1 Bolt Pistol; 1 Knives and Fists; 1 Stalker Bolt Rifle.\n**Every Gravis Veteran is equipped with:** 1 Bolt Pistol; 1 Infernus Heavy Bolter; 1 Knives and Fists.",
    "options": [
      "For every 5 models in this unit, 1 Gravis Veteran model can have their Infernus Heavy Bolter replaced with one of the following: 1 Frag Cannon, 1 Hellstorm Bolt Rifle and 1 Grenade Launcher",
      "For every 5 models in this unit, 1 Deathwatch Veteran with Stalker Bolt Rifle, Bolt Pistol and Knives and Fist model can have their Stalker Bolt Rifle replaced with 1 Plasma Incinerator.",
      "For every 5 models in this unit, 1 Deathwatch Veteran with Heavy Thunder Hammer and Bolt Pistol model can have their Heavy Thunder Hammer replaced with 1 Power Weapon and 1 Storm Shield."
    ],
    "keywords": [
      "Battleline",
      "Explosives",
      "Imperium",
      "Infantry",
      "Kill Team"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Deathwatch"
    ],
    "baseSize": "32mm, 40mm"
  },
  {
    "id": "fortis-kill-team",
    "name": "Fortis Kill Team",
    "points": [
      {
        "models": 10,
        "points": 210,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 225,
        "note": "3rd+"
      }
    ],
    "flavor": "Further refined from Watch Master Mordelai’s original concept, Fortis Kill Teams exemplify the supreme adaptability of the Tacticus variant of Mk X power armour, seamlessly merging a variety of close support roles and deadly firepower.",
    "profiles": [
      {
        "name": "Kill Team Sergeant",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Kill Team Intercessor with Deathwatch Bolt Rifle, Bolt Pistol and Knives and Fists",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Deathwatch Intercessor with Plasma Incinerator, Bolt Pistol and Knives and Fists",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Kill Team Intercessor with Heavy Bolt Pistol and Chainsword",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Kill Team Intercessor with Pyreblaster, Bolt Pistol and Knives and Fists",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Kill Team Intercessor with Castellan Launcher, Superfrag Rocket Launcher and Knives and Fists",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Deathwatch Bolt Rifle",
        "tags": [
          "ASSAULT",
          "HEAVY",
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Hand Flamer",
        "tags": [
          "CLOSE-QUARTERS",
          "TORRENT"
        ],
        "range": "9\"",
        "a": "3",
        "bs": "-",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Plasma Pistol – standard",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma Pistol – supercharge",
        "tags": [
          "CLOSE-QUARTERS",
          "HAZARDOUS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Grenade Launcher – frag",
        "tags": [
          "BLAST 1"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Grenade Launcher – krak",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Superkrak Rocket Launcher",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D3+3"
      },
      {
        "name": "Vengor Launcher",
        "tags": [
          "BLAST 1",
          "HEAVY",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Heavy Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Plasma Incinerator – standard",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Plasma Incinerator – supercharge",
        "tags": [
          "ASSAULT",
          "HAZARDOUS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Castellan Launcher",
        "tags": [
          "HEAVY"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Superfrag Rocket Launcher",
        "tags": [
          "BLAST 1",
          "HEAVY"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Pyreblaster",
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
        "name": "Chainsword",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Power Fist",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power Weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Thunder Hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Knives and Fists",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Fortis Doctrines",
        "text": "This unit's attacks that target a unit\n▪ **[gloss:below-starting-strength:Below starting strength]**, have +1 to **[gloss:hit-roll:hit rolls]**.\n▪ __Or:__ at or **[gloss:half-strength:below half-strength]** have +1 to **hit rolls** and **[gloss:wound-roll:wound rolls]**."
      }
    ],
    "composition": [
      "1 Kill Team Intercessor with Castellan Launcher, Superfrag Rocket Launcher and Knives and Fists model",
      "1 Kill Team Sergeant model",
      "2 Deathwatch Intercessor with Plasma Incinerator, Bolt Pistol and Knives and Fists models",
      "2 Kill Team Intercessor with Deathwatch Bolt Rifle, Bolt Pistol and Knives and Fists models",
      "2 Kill Team Intercessor with Heavy Bolt Pistol and Chainsword models",
      "2 Kill Team Intercessor with Pyreblaster, Bolt Pistol and Knives and Fists models"
    ],
    "loadout": "**The Kill Team Intercessor with Castellan Launcher, Superfrag Rocket Launcher and Knives and Fists is equipped with:** 1 Castellan Launcher; 1 Knives and Fists; 1 Superfrag Rocket Launcher.\n**The Kill Team Sergeant is equipped with:** 1 Bolt Pistol; 1 Deathwatch Bolt Rifle; 1 Knives and Fists.\n**Every Deathwatch Intercessor with Plasma Incinerator, Bolt Pistol and Knives and Fists is equipped with:** 1 Bolt Pistol; 1 Knives and Fists; 1 Plasma Incinerator.\n**Every Kill Team Intercessor with Deathwatch Bolt Rifle, Bolt Pistol and Knives and Fists is equipped with:** 1 Bolt Pistol; 1 Deathwatch Bolt Rifle; 1 Knives and Fists.\n**Every Kill Team Intercessor with Heavy Bolt Pistol and Chainsword is equipped with:** 1 Chainsword; 1 Heavy Bolt Pistol.\n**Every Kill Team Intercessor with Pyreblaster, Bolt Pistol and Knives and Fists is equipped with:** 1 Bolt Pistol; 1 Knives and Fists; 1 Pyreblaster.",
    "options": [
      "The Kill Team Sergeant can have their Knives and Fists replaced with one of the following: 1 Chainsword, 1 Power Fist, 1 Power Weapon, 1 Thunder Hammer",
      "The Kill Team Intercessor with Castellan Launcher, Superfrag Rocket Launcher and Knives and Fist can have their Superfrag Rocket Launcher replaced with 1 Superkrak Rocket Launcher.",
      "1 Kill Team Intercessor with Castellan Launcher, Superfrag Rocket Launcher and Knives and Fist model can have their Superfrag Rocket Launcher replaced with 1 Vengor Launcher.",
      "For every 5 models in this unit, 1 model equipped with a Deathwatch Bolt Rifle can be equipped with 1 Astartes Grenade Launcher.",
      "1 Deathwatch Intercessor with Plasma Incinerator, Bolt Pistol and Knives and Fist model can have their Bolt Pistol replaced with 1 Plasma Pistol.",
      "The Kill Team Sergeant can have their Deathwatch Bolt Rifle replaced with one of the following: 1 Chainsword, 1 Hand Flamer, 1 Plasma Pistol, 1 Power Weapon"
    ],
    "keywords": [
      "Explosives",
      "Imperium",
      "Infantry",
      "Kill Team",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Deathwatch"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "indomitor-kill-team",
    "name": "Indomitor Kill Team",
    "points": [
      {
        "models": 10,
        "points": 280,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 300,
        "note": "3rd+"
      }
    ],
    "flavor": "Comprising warriors wearing the heavier Gravis variant of Mk X armour, Indomitor Kill Teams are mobile bastions capable of unleashing the firepower of a squadron of battle tanks. Before them, hordes of xenos and monstrous beasts alike are torn apart.",
    "profiles": [
      {
        "name": "Kill Team Heavy Intercessor with Deathwatch Heavy Bolt Rifle and Ceramite Fists.",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Kill Team Heavy Intercessor with Flamestorm Gauntlets and Twin Power Fists",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Kill Team Heavy Intercessor with Melta Rifle, Bolt Pistol and Ceramite Fists",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Flamestorm Gauntlets – close quarters",
        "tags": [
          "CLOSE-QUARTERS",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Flamestorm Gauntlets – ranged",
        "tags": [
          "BLAST 2",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Deathwatch Heavy Bolter",
        "tags": [
          "ASSAULT",
          "HEAVY",
          "LETHAL HITS",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Auto Boltstorm Gauntlets",
        "tags": [
          "CLOSE-QUARTERS",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Fragstorm Grenade Launcher",
        "tags": [
          "BLAST 1"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 3"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Multi-melta – hunter",
        "tags": [
          "MELTA 3"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "2+",
        "s": "12",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Deathwatch Heavy Bolt Rifle",
        "tags": [
          "ASSAULT",
          "HEAVY",
          "LETHAL HITS"
        ],
        "range": "30\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Melta Rifle",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Melta Rifle – hunter",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "2+",
        "s": "12",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Twin Power Fists",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Ceramite Fists",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Indomitor Doctrines",
        "text": "▪ This unit's ranged attacks that target the closest eligible enemy unit, have +1 **[gloss:strength:S]**.\n▪ If this unit made a **[gloss:charge-move:charge move]** this turn, this unit's melee attacks have +1 **S**."
      }
    ],
    "composition": [
      "3 Kill Team Heavy Intercessor with Flamestorm Gauntlets and Twin Power Fists models",
      "3 Kill Team Heavy Intercessor with Melta Rifle, Bolt Pistol and Ceramite Fists models",
      "4 Kill Team Heavy Intercessor with Deathwatch Heavy Bolt Rifle and Ceramite Fists models"
    ],
    "loadout": "**Every Kill Team Heavy Intercessor with Flamestorm Gauntlets and Twin Power Fists is equipped with:** 1 Flamestorm Gauntlets; 1 Twin Power Fists.\n**Every Kill Team Heavy Intercessor with Melta Rifle, Bolt Pistol and Ceramite Fists is equipped with:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Melta Rifle.\n**Every Kill Team Heavy Intercessor with Deathwatch Heavy Bolt Rifle and Ceramite Fists is equipped with:** 1 Ceramite Fists; 1 Deathwatch Heavy Bolt Rifle.",
    "options": [
      "For every 5 models in this unit, 1 Kill Team Heavy Intercessor with Deathwatch Heavy Bolt Rifle and Ceramite Fists. model can have their Deathwatch Heavy Bolt Rifle replaced with 1 Deathwatch Heavy Bolter.",
      "1 Kill Team Heavy Intercessor with Melta Rifle, Bolt Pistol and Ceramite Fist model can have their Melta Rifle replaced with 1 Multi-melta.",
      "Any number of Kill Team Heavy Intercessor with Flamestorm Gauntlets and Twin Power Fist models can each have their Flamestorm Gauntlets replaced with 1 Auto Boltstorm Gauntlets and 1 Fragstorm Grenade Launcher."
    ],
    "keywords": [
      "Explosives",
      "Gravis",
      "Imperium",
      "Infantry",
      "Kill Team"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Deathwatch"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "spectrus-kill-team",
    "name": "Spectrus Kill Team",
    "points": [
      {
        "models": 10,
        "points": 185,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 195,
        "note": "3rd+"
      }
    ],
    "flavor": "Sinister, silent and all but invisible until they strike, Spectrus Kill Teams are adept in inflicting death from both near and far. Clad in close-fitting Mk X Phobos battle plate, they specialise in battlefield control and enemy destabilisation.",
    "profiles": [
      {
        "name": "Kill Team Infiltrator with Deathwatch Marksman Bolt Carbine, Bolt Pistol and Ceramite Fists",
        "m": "8\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Kill Team Infiltrator with Bolt Sniper Rifle, Bolt Pistol and Ceramite Fists",
        "m": "8\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Kill Team Infiltrator with Deathwatch Occulus Bolt Carbine, Bolt Pistol and Paired Combat Blades",
        "m": "8\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Kill Team Infiltrator with Special-issue Bolt Pistol and Combat Knife",
        "m": "8\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Deathwatch Occulus Bolt Carbine",
        "tags": [
          "ASSAULT",
          "IGNORES COVER",
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Deathwatch Bolt Carbine",
        "tags": [
          "LETHAL HITS",
          "PRECISION"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Las Fusil",
        "tags": [
          "HEAVY"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Special-issue Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS",
          "PRECISION"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Instigator Bolt Carbine",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "PRECISION",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Bolt Sniper Rifle",
        "tags": [
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Deathwatch Marksman Bolt Carbine",
        "tags": [
          "HEAVY",
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Paired Combat Blades",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Ceramite Fists",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Combat Knife",
        "tags": [
          "PRECISION"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Scouts 6\"",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Helix Gauntlet",
        "text": "In your Command phase, this unit **[gloss:heal:heals]** D3 wounds."
      },
      {
        "name": "Spectrus Doctrines",
        "text": "At the end of your opponent's Fight phase, if this unit is **[gloss:unengaged:unengaged]**, you can place this unit in **[gloss:strategic-reserves:strategic reserves]**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Helix Gauntlet",
        "text": "In your Command phase, this unit **[gloss:heal:heals]** D3 wounds."
      }
    ],
    "composition": [
      "2 Kill Team Infiltrator with Bolt Sniper Rifle, Bolt Pistol and Ceramite Fists models",
      "2 Kill Team Infiltrator with Deathwatch Occulus Bolt Carbine, Bolt Pistol and Paired Combat Blades models",
      "2 Kill Team Infiltrator with Special-issue Bolt Pistol and Combat Knife models",
      "4 Kill Team Infiltrator with Deathwatch Marksman Bolt Carbine, Bolt Pistol and Ceramite Fists models"
    ],
    "loadout": "**Every Kill Team Infiltrator with Bolt Sniper Rifle, Bolt Pistol and Ceramite Fists is equipped with:** 1 Bolt Pistol; 1 Bolt Sniper Rifle; 1 Ceramite Fists.\n**Every Kill Team Infiltrator with Deathwatch Occulus Bolt Carbine, Bolt Pistol and Paired Combat Blades is equipped with:** 1 Bolt Pistol; 1 Deathwatch Occulus Bolt Carbine; 1 Paired Combat Blades.\n**Every Kill Team Infiltrator with Special-issue Bolt Pistol and Combat Knife is equipped with:** 1 Combat Knife; 1 Special-issue Bolt Pistol.\n**Every Kill Team Infiltrator with Deathwatch Marksman Bolt Carbine, Bolt Pistol and Ceramite Fists is equipped with:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Deathwatch Marksman Bolt Carbine.",
    "options": [
      "Any number of Kill Team Infiltrator with Bolt Sniper Rifle, Bolt Pistol and Ceramite Fist models can each have their Bolt Sniper Rifle replaced with 1 Instigator Bolt Carbine.",
      "Any number of Kill Team Infiltrator with Special-issue Bolt Pistol and Combat Knife models can each have their Combat Knife replaced with 1 Deathwatch Bolt Carbine and 1 Ceramite Fists.",
      "Any number of Kill Team Infiltrator with Bolt Sniper Rifle, Bolt Pistol and Ceramite Fist models can each have their Bolt Sniper Rifle replaced with 1 Las Fusil.",
      "1 Kill Team Infiltrator with Deathwatch Marksman Bolt Carbine, Bolt Pistol and Ceramite Fist model can have their Deathwatch Marksman Bolt Carbine replaced with 1 Helix Gauntlet."
    ],
    "keywords": [
      "Explosives",
      "Imperium",
      "Infantry",
      "Kill Team",
      "Phobos",
      "Smoke"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Deathwatch"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "talonstrike-kill-team",
    "name": "Talonstrike Kill Team",
    "points": [
      {
        "models": 10,
        "points": 280,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 300,
        "note": "3rd+"
      }
    ],
    "flavor": "Diving from gunships or advancing in powered leaps across a war zone, the battle-brothers of a Talonstrike Kill Team crush their prey in shockingly sudden assaults. They attack with howling chainswords and blasts of heavy, short-range firepower. The roar of their jump packs follows each rapid kill as they close on their next targets.",
    "profiles": [
      {
        "name": "Kill Team Sergeant with Jump Pack",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Kill Team Intercessor with Jump Pack",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Kill Team Heavy Intercessor with Jump Pack",
        "m": "10\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Assault Bolters",
        "tags": [
          "ASSAULT",
          "CLOSE-QUARTERS",
          "SUSTAINED HITS 2",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Plasma Exterminators – standard",
        "tags": [
          "ASSAULT",
          "CLOSE-QUARTERS",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Plasma Exterminators – supercharge",
        "tags": [
          "ASSAULT",
          "CLOSE-QUARTERS",
          "HAZARDOUS",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Hand Flamer",
        "tags": [
          "CLOSE-QUARTERS",
          "TORRENT"
        ],
        "range": "9\"",
        "a": "3",
        "bs": "7+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Plasma Pistol – standard",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma Pistol – supercharge",
        "tags": [
          "CLOSE-QUARTERS",
          "HAZARDOUS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Heavy Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Ceramite Fists",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Chainsword",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Power Fist",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power Weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Talonstrike Doctrines",
        "text": "In a turn this unit was set up on the battlefield:\n▪ This unit's attacks have +1 **[gloss:armour-penetration:AP]**.\n▪ This unit's melee attacks have [LANCE]."
      }
    ],
    "composition": [
      "1 Kill Team Sergeant with Jump Pack model",
      "4 Kill Team Heavy Intercessor with Jump Pack models",
      "5 Kill Team Intercessor with Jump Pack models"
    ],
    "loadout": "**The Kill Team Sergeant with Jump Pack is equipped with:** 1 Chainsword; 1 Heavy Bolt Pistol.\n**Every Kill Team Heavy Intercessor with Jump Pack is equipped with:** 1 Assault Bolters; 1 Ceramite Fists.\n**Every Kill Team Intercessor with Jump Pack is equipped with:** 1 Chainsword; 1 Heavy Bolt Pistol.",
    "options": [
      "Any number of Kill Team Heavy Intercessor with Jump Pack models can each have their Assault Bolters replaced with 1 Plasma Exterminator.",
      "The Kill Team Sergeant with Jump Pack can have their Chainsword replaced with one of the following: 1 Power Fist, 1 Power Weapon",
      "For every 5 models in this unit, 1 Kill Team Intercessor with Jump Pack model can have their Heavy Bolt Pistol replaced with 1 Plasma Pistol.",
      "The Kill Team Sergeant with Jump Pack can have their Heavy Bolt Pistol replaced with one of the following: 1 Hand Flamer, 1 Plasma Pistol"
    ],
    "keywords": [
      "Explosives",
      "Fly",
      "Imperium",
      "Infantry",
      "Jump Pack",
      "Kill Team"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Deathwatch"
    ],
    "baseSize": "32mm, 40mm"
  },
  {
    "id": "watch-captain-artemis",
    "name": "Watch Captain Artemis",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "Born survivor of a feral world and formerly of the macabre Mortifactors Chapter, Artemis leads a Watch Company of Talasa Prime. Known for his instinct for xenos trickery, he still relishes the prospect of violence, whether with his blade, the mutagenic acid-fire of Hellfire Extremis or a time-warping stasis grenade.",
    "profiles": [
      {
        "name": "Watch Captain Artemis",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Hellfire Extremis",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Master-crafted Power Weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Feel No Pain 6+, Leader",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Tactical Instinct",
        "text": "This unit's attacks have [SUSTAINED HITS 1]."
      },
      {
        "name": "Unstoppable Champion (Once per battle, per army)",
        "text": "At the end of a phase in which this model is **[gloss:destroyed:destroyed]**, roll one D6:\n▪ On a 2+, set this model back up on the battlefield as close as possible to where it was **destroyed, unengaged** with 3 wounds remaining."
      }
    ],
    "composition": [
      "1 Watch Captain Artemis model"
    ],
    "loadout": "**This model is equipped with:** 1 Hellfire Extremis; 1 Master-crafted Power Weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Deathwatch Veterans",
        "Decimus Kill Team",
        "Fortis Kill Team"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Epic Hero",
      "Explosives",
      "Imperium",
      "Infantry",
      "Kill Team"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Deathwatch"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "watch-master",
    "name": "Watch Master",
    "points": [
      {
        "models": 1,
        "points": 105
      }
    ],
    "flavor": "The galaxy’s foremost xenos hunters, each Watch Master commands one of the Chapter’s vigilant fortresses. These leaders possess centuries of strategic and esoteric knowledge of the horrors assailing Mankind. In battle, the crackling blades and tailored bolts of their vigil spears destroy any xenos before them.",
    "profiles": [
      {
        "name": "Watch Master",
        "m": "6\"",
        "t": "5",
        "sv": "2+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Vigil Spear",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Vigil Spear",
        "tags": [
          "LANCE"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Watch Master",
        "text": "This model’s attacks that target a CHARACTER unit can:\n▪ Re-roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ Re-roll **[gloss:wound-roll:wound rolls]** of 1."
      },
      {
        "name": "Strategic Knowledge",
        "text": "▪ This unit’s ranged attacks have [ASSAULT].\n▪ When this unit is selected to make an **[gloss:advance-move:advance move]**, that **advance move** does not prevent this unit from being **[gloss:eligible-to-charge:eligible to declare a charge]**.\n▪ When this unit is selected to make a **[gloss:fall-back-move:fall-back move]**, that **fall-back move** does not prevent this unit from being **[gloss:eligible-to-shoot:eligible to shoot]** and **eligible to declare a charge**."
      },
      {
        "name": "Purgatus Quarry",
        "text": "At the start of the first battle round, select up to one enemy unit to be this unit’s **hunted**:\n▪ This unit’s attacks that target this unit’s **hunted** unit can re-roll **[gloss:wound-roll:wound rolls]** of 1.\n▪ Each time this unit’s **hunted** is **[gloss:destroyed:destroyed]**, select up to one enemy unit to be this unit’s **hunted**."
      }
    ],
    "composition": [
      "1 Watch Master model"
    ],
    "loadout": "**This model is equipped with:** 1 Vigil Spear.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Deathwatch Veterans",
        "Decimus Kill Team",
        "Fortis Kill Team"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Explosives",
      "Imperium",
      "Infantry",
      "Kill Team"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Deathwatch"
    ],
    "baseSize": "32mm"
  }
]

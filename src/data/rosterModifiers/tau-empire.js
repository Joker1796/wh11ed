// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "tau-empire",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "4ff7e6d5-ee30-452f-8ef8-e11bfc6de69a:cadre-fireblade",
      "kind": "ability",
      "name": "Cadre Fireblade: Crack Shot",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "cadre-fireblade"
      },
      "hash": "cb79af81",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "set",
          "value": "-3",
          "when": {
            "en": "on a Critical Wound",
            "ru": "при критическом ранении"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "85eb2dc7-a000-467f-825a-1175fd936b7b:cadre-fireblade",
      "kind": "ability",
      "name": "Cadre Fireblade: Volley Fire",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "cadre-fireblade"
      },
      "hash": "e9897828",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "7c3a2d95-83dd-41fe-ac51-ee557aaadfd4:commander-cloudspear",
      "kind": "ability",
      "name": "Commander Cloudspear: Shield Drone",
      "det": null,
      "ref": null,
      "hash": "24c8e47f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the Shield Drone model only",
            "ru": "только модель Shield Drone"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "5627b944-56d1-4649-8606-97050b2551af:commander-farsight",
      "kind": "ability",
      "name": "Commander Farsight: Way of the Short Blade",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "commander-farsight"
      },
      "hash": "9c09f092",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "41b6ddfb-60a1-404c-bf5f-4b4411c5c90f:commander-in-coldstar-battlesuit",
      "kind": "ability",
      "name": "Commander in Coldstar Battlesuit: Coldstar Commander",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "commander-in-coldstar-battlesuit"
      },
      "hash": "de308cfa",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "set",
          "value": "12\"",
          "when": null,
          "target": "led"
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "306d7212-56a5-4659-b282-2378986d270a:commander-in-enforcer-battlesuit",
      "kind": "ability",
      "name": "Commander in Enforcer Battlesuit: Enforcer Commander",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "commander-in-enforcer-battlesuit"
      },
      "hash": "445cab64",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "edf3cf2b-c0b0-4d8b-b5c2-acc69bcbffe8:crisis-starscythe-battlesuits",
      "kind": "ability",
      "name": "Crisis Starscythe Battlesuits: Starscythe",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "crisis-starscythe-battlesuits"
      },
      "hash": "4adc7911",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "except against MONSTERS and VEHICLES",
            "ru": "кроме целей MONSTER и VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "79ce02fd-5706-413c-9365-98c90d0039f8:darkstrider",
      "kind": "ability",
      "name": "Darkstrider: Structural Analyser",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "darkstrider"
      },
      "hash": "07b755b8",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1b0c45a9-bee6-47d2-8424-d0aa5a1522a1:hammerhead-gunship",
      "kind": "ability",
      "name": "Hammerhead Gunship: Armour Hunter",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "hammerhead-gunship"
      },
      "hash": "a89f23e7",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "eb78b17b-a5dc-4131-a00b-1cbd6e432c73:kroot-flesh-shaper",
      "kind": "ability",
      "name": "Kroot Flesh Shaper: Ritual Butchery",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "kroot-flesh-shaper"
      },
      "hash": "9d48081a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "0b8a9cdf-f6e5-4e4f-9846-69c0c6c8b0f7:pathfinder-team",
      "kind": "ability",
      "name": "Pathfinder Team: Target Uploaded",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "pathfinder-team"
      },
      "hash": "11cdc93b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "against their Spotted unit",
            "ru": "против отмеченного (Spotted) юнита"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "against their Spotted unit",
            "ru": "против отмеченного (Spotted) юнита"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "b523c318-8321-4e1c-a0d2-9d112b731381:razorshark-strike-fighter",
      "kind": "ability",
      "name": "Razorshark Strike Fighter: Ground Strike Fighter",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "razorshark-strike-fighter"
      },
      "hash": "e2179b98",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d86960ba-ce82-4f5d-bf4d-70811d1e8a29:sudden-dawn-cadre-pathfinder-team",
      "kind": "ability",
      "name": "Sudden Dawn Cadre Pathfinder Team: Target Uploaded",
      "det": null,
      "ref": null,
      "hash": "24202041",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "against their Spotted unit",
            "ru": "против отмеченного (Spotted) юнита"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "against their Spotted unit",
            "ru": "против отмеченного (Spotted) юнита"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "0e4e1053-0b6b-4c1a-95de-3bd05d9884fd:tidewall-shieldline",
      "kind": "ability",
      "name": "Tidewall Shieldline: Tidewall Defence Platform",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tidewall-shieldline"
      },
      "hash": "47477b37",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "set",
          "value": "15",
          "when": {
            "en": "if equipped with a Tidewall defence platform",
            "ru": "если взята Tidewall defence platform"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "2206b8e8-8ebc-4747-9bd3-6b44ccb32ff0",
      "kind": "armyRule",
      "name": "Drones",
      "det": null,
      "hash": "e80ed40e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if the model was upgraded with a Shield Drone",
            "ru": "если модель улучшена дроном-щитом (Shield Drone)"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "36cc4fa4-cc15-41f2-9d47-14e2550579ea",
      "kind": "armyRule",
      "name": "For the Greater Good",
      "det": null,
      "hash": "206e56d8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "per attack by a Guided unit against a Spotted unit",
            "ru": "за атаку отряда Guided по отряду Spotted"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "8d4abd30-90f3-4747-8497-0fe92c9377c9",
      "kind": "detachmentRule",
      "name": "Patient Hunter",
      "det": "Kauyon",
      "ref": {
        "kind": "detachmentRule",
        "det": "kauyon"
      },
      "hash": "e7892f2a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "during the third, fourth and fifth battle rounds",
            "ru": "в третьем, четвёртом и пятом раундах"
          },
          "cond": [
            "rounds-3-5"
          ]
        }
      ]
    },
    {
      "sid": "227283db-9c12-4439-a0e6-bfa6c2ac0644",
      "kind": "detachmentRule",
      "name": "Hunter’s Instincts",
      "det": "Kroot Hunting Pack",
      "hash": "6b5488c9",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "kroot-hunting-pack"
      }
    },
    {
      "sid": "54301b08-2777-45b6-856c-3cda0d13bb17",
      "kind": "detachmentRule",
      "name": "Skirmish Fighters",
      "det": "Kroot Hunting Pack",
      "hash": "7e1866de",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "Kroot models: 5+ against ranged attacks, 6+ against melee attacks",
            "ru": "модели Kroot: 5+ против стрелковых атак, 6+ против атак ближнего боя"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "kroot-hunting-pack"
      }
    },
    {
      "sid": "b6a14719-7a92-480a-9a27-a67e48996c50",
      "kind": "detachmentRule",
      "name": "Killing Blow",
      "det": "Mont’ka",
      "ref": {
        "kind": "detachmentRule",
        "det": "montka"
      },
      "hash": "512df2e0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "during the first, second and third battle rounds",
            "ru": "в первом, втором и третьем раундах"
          },
          "cond": [
            "rounds-1-3"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "during the first, second and third battle rounds, while the unit is Guided",
            "ru": "в первом, втором и третьем раундах, пока отряд Guided"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "b7f0dc14-9ef7-4228-9162-ce5dcb921fc9",
      "kind": "detachmentRule",
      "name": "Bonded Heroes",
      "det": "Retaliation Cadre",
      "hash": "e52012f0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Battlesuit models, per ranged attack against a unit within 12\"",
            "ru": "модели Battlesuit, за стрелковую атаку по отряду в пределах 12\""
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "Battlesuit models, per ranged attack against a unit within 8\"",
            "ru": "модели Battlesuit, за стрелковую атаку по отряду в пределах 8\""
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "retaliation-cadre"
      }
    },
    {
      "sid": "62b007f2-e374-41af-8c14-9df423e382c6",
      "kind": "detachmentRule",
      "name": "Co-ordinated Eradication",
      "det": "Sudden Dawn Cadre",
      "ref": null,
      "hash": "e0bc5f03",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "once per battle, per army, against the one enemy unit selected",
            "ru": "раз за битву на армию, против одного выбранного отряда противника"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "e168fe57-5411-4ee4-978e-afa421d8fd5e",
      "kind": "enhancement",
      "name": "Admired Leader",
      "det": "Auxiliary Cadre",
      "ref": {
        "kind": "enhancement",
        "det": "auxiliary-cadre"
      },
      "hash": "42062682",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "bbb5af4d-2fed-4d0e-9e75-7e533cb8d72b",
      "kind": "enhancement",
      "name": "Plasma Accelerator Rifle",
      "det": "Experimental Prototype Cadre",
      "ref": {
        "kind": "enhancement",
        "det": "experimental-prototype-cadre"
      },
      "hash": "23e6cbda",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 2,
          "only": {
            "name": "Plasma rifle"
          },
          "when": {
            "en": "the one Plasma Rifle selected in the Declare Battle Formations step",
            "ru": "одно оружие Plasma Rifle, выбранное на шаге Declare Battle Formations"
          },
          "cond": [
            "blocked-weapon"
          ]
        },
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Plasma rifle"
          },
          "when": {
            "en": "the one Plasma Rifle selected in the Declare Battle Formations step",
            "ru": "одно оружие Plasma Rifle, выбранное на шаге Declare Battle Formations"
          },
          "cond": [
            "blocked-weapon"
          ]
        },
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "only": {
            "name": "Plasma rifle"
          },
          "when": {
            "en": "the one Plasma Rifle selected in the Declare Battle Formations step",
            "ru": "одно оружие Plasma Rifle, выбранное на шаге Declare Battle Formations"
          },
          "cond": [
            "blocked-weapon"
          ]
        },
        {
          "on": "ranged",
          "stat": "d",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Plasma rifle"
          },
          "when": {
            "en": "the one Plasma Rifle selected in the Declare Battle Formations step",
            "ru": "одно оружие Plasma Rifle, выбранное на шаге Declare Battle Formations"
          },
          "cond": [
            "blocked-weapon"
          ]
        }
      ]
    },
    {
      "sid": "db116728-4b55-4323-8ed9-60397162dc82",
      "kind": "enhancement",
      "name": "Supernova Launcher",
      "det": "Experimental Prototype Cadre",
      "ref": {
        "kind": "enhancement",
        "det": "experimental-prototype-cadre"
      },
      "hash": "2b9b1c3b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 3,
          "only": {
            "name": "Airbursting fragmentation projector"
          },
          "when": {
            "en": "the one Airbursting Fragmentation Projector selected in the Declare Battle Formations step",
            "ru": "одно оружие Airbursting Fragmentation Projector, выбранное на шаге Declare Battle Formations"
          },
          "cond": [
            "blocked-weapon"
          ]
        },
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "only": {
            "name": "Airbursting fragmentation projector"
          },
          "when": {
            "en": "the one Airbursting Fragmentation Projector selected in the Declare Battle Formations step",
            "ru": "одно оружие Airbursting Fragmentation Projector, выбранное на шаге Declare Battle Formations"
          },
          "cond": [
            "blocked-weapon"
          ]
        },
        {
          "on": "ranged",
          "stat": "d",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Airbursting fragmentation projector"
          },
          "when": {
            "en": "the one Airbursting Fragmentation Projector selected in the Declare Battle Formations step",
            "ru": "одно оружие Airbursting Fragmentation Projector, выбранное на шаге Declare Battle Formations"
          },
          "cond": [
            "blocked-weapon"
          ]
        }
      ]
    },
    {
      "sid": "302188cd-822a-40bd-93b3-8ccf7e50e1b7",
      "kind": "enhancement",
      "name": "Thermoneutronic Projector",
      "det": "Experimental Prototype Cadre",
      "ref": {
        "kind": "enhancement",
        "det": "experimental-prototype-cadre"
      },
      "hash": "7486b8b1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 2,
          "only": {
            "name": "T’au flamer"
          },
          "when": {
            "en": "the one T'au Flamer selected in the Declare Battle Formations step",
            "ru": "одно оружие T’au Flamer, выбранное на шаге Declare Battle Formations"
          },
          "cond": [
            "blocked-weapon"
          ]
        },
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "only": {
            "name": "T’au flamer"
          },
          "when": {
            "en": "the one T'au Flamer selected in the Declare Battle Formations step",
            "ru": "одно оружие T’au Flamer, выбранное на шаге Declare Battle Formations"
          },
          "cond": [
            "blocked-weapon"
          ]
        },
        {
          "on": "ranged",
          "stat": "d",
          "op": "add",
          "value": 1,
          "only": {
            "name": "T’au flamer"
          },
          "when": {
            "en": "the one T'au Flamer selected in the Declare Battle Formations step",
            "ru": "одно оружие T’au Flamer, выбранное на шаге Declare Battle Formations"
          },
          "cond": [
            "blocked-weapon"
          ]
        }
      ]
    },
    {
      "sid": "7c538bba-1367-4adc-b54b-bea749daa8a5",
      "kind": "enhancement",
      "name": "Precision of the Patient Hunter",
      "det": "Kauyon",
      "hash": "d907baa7",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "kauyon"
      }
    },
    {
      "sid": "f65de9ae-c750-4ab8-bbb6-6459f9787c12",
      "kind": "enhancement",
      "name": "Through Unity, Devastation",
      "det": "Kauyon",
      "ref": {
        "kind": "enhancement",
        "det": "kauyon"
      },
      "hash": "de6acae3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while the unit is Guided and targeting its Spotted unit, with the bearer leading an Observer unit",
            "ru": "пока отряд Guided и целью является его Spotted-отряд, а носитель ведёт Observer-отряд"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "b0b02250-29bc-4b8f-b501-a007e6fb45e6",
      "kind": "enhancement",
      "name": "Kroothawk Flock",
      "det": "Kroot Hunting Pack",
      "ref": {
        "kind": "enhancement",
        "det": "kroot-hunting-pack"
      },
      "hash": "262e776c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null
        }
      ]
    },
    {
      "sid": "7e5ea128-b5a8-4540-b84b-6b74bca2da44",
      "kind": "enhancement",
      "name": "Nomadic Hunter",
      "det": "Kroot Hunting Pack",
      "ref": {
        "kind": "enhancement",
        "det": "kroot-hunting-pack"
      },
      "hash": "ea99c260",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 3,
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт юнит"
          },
          "cond": [
            "unit-leading"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт юнит"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ]
    },
    {
      "sid": "4dd7d360-96a8-4d06-a4b6-37db141d8b80",
      "kind": "enhancement",
      "name": "Root-carved Weapons",
      "det": "Kroot Hunting Pack",
      "ref": {
        "kind": "enhancement",
        "det": "kroot-hunting-pack"
      },
      "hash": "0bd55e1f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": null
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": null
        }
      ]
    },
    {
      "sid": "ee09770e-ecef-40eb-9435-f17af1b050ec",
      "kind": "enhancement",
      "name": "Coordinated Exploitation",
      "det": "Mont’ka",
      "ref": {
        "kind": "enhancement",
        "det": "montka"
      },
      "hash": "eb061f13",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while the unit is Guided and targeting its Spotted unit, with the bearer leading an Observer unit",
            "ru": "пока отряд Guided и целью является его Spotted-отряд, а носитель ведёт Observer-отряд"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "1ff1cc2a-ba28-4e1b-aee4-78c67b35a4de",
      "kind": "enhancement",
      "name": "Strategic Conqueror",
      "det": "Mont’ka",
      "hash": "c6114053",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while within range of the objective marker selected at the start of the battle and the bearer is on the battlefield",
            "ru": "пока модель в радиусе выбранного в начале битвы маркера, а носитель на поле боя"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "montka"
      }
    },
    {
      "sid": "f73f4a42-c4b1-4ef7-bd9c-deaf79bc413d",
      "kind": "enhancement",
      "name": "Internal Grenade Racks",
      "det": "Retaliation Cadre",
      "ref": {
        "kind": "enhancement",
        "det": "retaliation-cadre"
      },
      "hash": "0570f862",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Grenades",
          "when": null
        }
      ]
    },
    {
      "sid": "3513ccb4-3398-47a4-9518-5cc2ab78b9cb",
      "kind": "enhancement",
      "name": "Proximity Scanners",
      "det": "Sudden Dawn Cadre",
      "ref": null,
      "hash": "bbffd440",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "for a unit disembarking from this Devilfish, pulse blaster and pulse carbine only",
            "ru": "для отряда, высаживающегося из этого Devilfish, только pulse blaster и pulse carbine"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "f2aeddba-542d-4aa0-b1ac-1c6a39580385",
      "kind": "stratagem",
      "name": "Experimental Modifications",
      "det": "Auxiliary Cadre",
      "ref": {
        "kind": "stratagem",
        "det": "auxiliary-cadre",
        "name": "Experimental Modifications"
      },
      "hash": "93165ff9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "f69888d4-7f69-4346-9092-8f79fb3f0c1e",
      "kind": "stratagem",
      "name": "Experimental Ammunition",
      "det": "Experimental Prototype Cadre",
      "ref": {
        "kind": "stratagem",
        "det": "experimental-prototype-cadre",
        "name": "Experimental Ammunition"
      },
      "hash": "c1f627ff",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "if the second option was chosen (weapons also gain [HAZARDOUS])",
            "ru": "если выбран второй вариант (оружие получает [HAZARDOUS])"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "23171018-281d-4321-a2fe-c65dd5a6fb08",
      "kind": "stratagem",
      "name": "A Tempting Trap",
      "det": "Kauyon",
      "ref": {
        "kind": "stratagem",
        "det": "kauyon",
        "name": "A Tempting Trap"
      },
      "hash": "bb917519",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1d4a3379-8785-4d9d-b18e-4ddd744e8390",
      "kind": "stratagem",
      "name": "Coordinate to Engage",
      "det": "Kauyon",
      "ref": {
        "kind": "stratagem",
        "det": "kauyon",
        "name": "Coordinate to Engage"
      },
      "hash": "62b9fc5c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "against their Spotted unit",
            "ru": "против отмеченного (Spotted) юнита"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "64ac8db1-bb2c-495b-82db-64ae980f215d",
      "kind": "stratagem",
      "name": "Point-blank Ambush",
      "det": "Kauyon",
      "ref": {
        "kind": "stratagem",
        "det": "kauyon",
        "name": "Point-blank Ambush"
      },
      "hash": "23bdfb83",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against targets within 9\"",
            "ru": "против целей в 9\""
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "7ce53326-264e-4abf-8421-d137129a0665",
      "kind": "stratagem",
      "name": "A Trap Well Laid",
      "det": "Kroot Hunting Pack",
      "ref": {
        "kind": "stratagem",
        "det": "kroot-hunting-pack",
        "name": "A Trap Well Laid"
      },
      "hash": "b367fbc6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "6ed24703-1b7e-465b-9b31-0cfc693d0ed0",
      "kind": "stratagem",
      "name": "EMP Grenades",
      "det": "Kroot Hunting Pack",
      "ref": {
        "kind": "stratagem",
        "det": "kroot-hunting-pack",
        "name": "EMP Grenades"
      },
      "hash": "942628be",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "dc0729c7-424b-43d1-a8f9-5e72e7cd8001",
      "kind": "stratagem",
      "name": "Aggressive Mobility",
      "det": "Mont’ka",
      "ref": {
        "kind": "stratagem",
        "det": "montka",
        "name": "Aggressive Mobility"
      },
      "hash": "50325371",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in a phase it Advanced (no Advance roll)",
            "ru": "в фазе с Advance (без броска)"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "450d8520-3527-4c3d-bbdb-a5361f7d6ab0",
      "kind": "stratagem",
      "name": "Counterfire Defence Systems",
      "det": "Mont’ka",
      "ref": {
        "kind": "stratagem",
        "det": "montka",
        "name": "Counterfire Defence Systems"
      },
      "hash": "7d3ef23d",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "44f34886-982e-453b-8806-1e2e4cd315e1",
      "kind": "stratagem",
      "name": "Focused Fire",
      "det": "Mont’ka",
      "ref": {
        "kind": "stratagem",
        "det": "montka",
        "name": "Focused Fire"
      },
      "hash": "9e642357",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against the one enemy unit this stratagem named",
            "ru": "против юнита, названного стратагемой"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "78f2df6d-2fe6-418c-bc1b-52720d8f10d4",
      "kind": "stratagem",
      "name": "Pulse Onslaught",
      "det": "Mont’ka",
      "ref": {
        "kind": "stratagem",
        "det": "montka",
        "name": "Pulse Onslaught"
      },
      "hash": "ebbdcfe5",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "af84591d-2433-4909-92bf-63d3cee6c3c5",
      "kind": "stratagem",
      "name": "Suppressing Fire",
      "det": "Sudden Dawn Cadre",
      "ref": null,
      "hash": "8d80c4dd",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3491e144-63d5-48f6-906d-bc5bdfdeb9a9:breacher-team",
      "kind": "wargear",
      "name": "Breacher Team: Marker Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "breacher-team",
        "item": "marker drone"
      },
      "hash": "a5cb8c1d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Markerlight",
          "when": null
        }
      ]
    },
    {
      "sid": "83b098fb-38a3-45f2-93d4-14cc224ddcdc:breacher-team",
      "kind": "wargear",
      "name": "Breacher Team: Shield Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "breacher-team",
        "item": "shield drone"
      },
      "hash": "219c8b44",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the Shield Drone model only",
            "ru": "только модель Shield Drone"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "3491e144-63d5-48f6-906d-bc5bdfdeb9a9:broadside-battlesuits",
      "kind": "wargear",
      "name": "Broadside Battlesuits: Marker Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "broadside-battlesuits",
        "item": "marker drone"
      },
      "hash": "a5cb8c1d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Markerlight",
          "when": null
        }
      ]
    },
    {
      "sid": "83b098fb-38a3-45f2-93d4-14cc224ddcdc:broadside-battlesuits",
      "kind": "wargear",
      "name": "Broadside Battlesuits: Shield Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "broadside-battlesuits",
        "item": "shield drone"
      },
      "hash": "219c8b44",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the Shield Drone model only",
            "ru": "только модель Shield Drone"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "3491e144-63d5-48f6-906d-bc5bdfdeb9a9:cadre-fireblade",
      "kind": "wargear",
      "name": "Cadre Fireblade: Marker Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "cadre-fireblade",
        "item": "marker drone"
      },
      "hash": "a5cb8c1d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Markerlight",
          "when": null
        }
      ]
    },
    {
      "sid": "83b098fb-38a3-45f2-93d4-14cc224ddcdc:cadre-fireblade",
      "kind": "wargear",
      "name": "Cadre Fireblade: Shield Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "cadre-fireblade",
        "item": "shield drone"
      },
      "hash": "219c8b44",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the Shield Drone model only",
            "ru": "только модель Shield Drone"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "3491e144-63d5-48f6-906d-bc5bdfdeb9a9:commander-in-coldstar-battlesuit",
      "kind": "wargear",
      "name": "Commander in Coldstar Battlesuit: Marker Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "commander-in-coldstar-battlesuit",
        "item": "marker drone"
      },
      "hash": "a5cb8c1d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Markerlight",
          "when": null
        }
      ]
    },
    {
      "sid": "83b098fb-38a3-45f2-93d4-14cc224ddcdc:commander-in-coldstar-battlesuit",
      "kind": "wargear",
      "name": "Commander in Coldstar Battlesuit: Shield Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "commander-in-coldstar-battlesuit",
        "item": "shield drone"
      },
      "hash": "219c8b44",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the Shield Drone model only",
            "ru": "только модель Shield Drone"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "1b501ea3-5061-4bc0-ac92-4b88f0e9126c:commander-in-coldstar-battlesuit",
      "kind": "wargear",
      "name": "Commander in Coldstar Battlesuit: Shield Generator",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "commander-in-coldstar-battlesuit",
        "item": "shield generator"
      },
      "hash": "5e0ca50d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": null
        }
      ]
    },
    {
      "sid": "3491e144-63d5-48f6-906d-bc5bdfdeb9a9:commander-in-enforcer-battlesuit",
      "kind": "wargear",
      "name": "Commander in Enforcer Battlesuit: Marker Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "commander-in-enforcer-battlesuit",
        "item": "marker drone"
      },
      "hash": "a5cb8c1d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Markerlight",
          "when": null
        }
      ]
    },
    {
      "sid": "83b098fb-38a3-45f2-93d4-14cc224ddcdc:commander-in-enforcer-battlesuit",
      "kind": "wargear",
      "name": "Commander in Enforcer Battlesuit: Shield Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "commander-in-enforcer-battlesuit",
        "item": "shield drone"
      },
      "hash": "219c8b44",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the Shield Drone model only",
            "ru": "только модель Shield Drone"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "1b501ea3-5061-4bc0-ac92-4b88f0e9126c:commander-in-enforcer-battlesuit",
      "kind": "wargear",
      "name": "Commander in Enforcer Battlesuit: Shield Generator",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "commander-in-enforcer-battlesuit",
        "item": "shield generator"
      },
      "hash": "5e0ca50d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": null
        }
      ]
    },
    {
      "sid": "3491e144-63d5-48f6-906d-bc5bdfdeb9a9:crisis-fireknife-battlesuits",
      "kind": "wargear",
      "name": "Crisis Fireknife Battlesuits: Marker Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "crisis-fireknife-battlesuits",
        "item": "marker drone"
      },
      "hash": "a5cb8c1d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Markerlight",
          "when": null
        }
      ]
    },
    {
      "sid": "83b098fb-38a3-45f2-93d4-14cc224ddcdc:crisis-fireknife-battlesuits",
      "kind": "wargear",
      "name": "Crisis Fireknife Battlesuits: Shield Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "crisis-fireknife-battlesuits",
        "item": "shield drone"
      },
      "hash": "219c8b44",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the Shield Drone model only",
            "ru": "только модель Shield Drone"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "3491e144-63d5-48f6-906d-bc5bdfdeb9a9:crisis-starscythe-battlesuits",
      "kind": "wargear",
      "name": "Crisis Starscythe Battlesuits: Marker Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "crisis-starscythe-battlesuits",
        "item": "marker drone"
      },
      "hash": "a5cb8c1d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Markerlight",
          "when": null
        }
      ]
    },
    {
      "sid": "83b098fb-38a3-45f2-93d4-14cc224ddcdc:crisis-starscythe-battlesuits",
      "kind": "wargear",
      "name": "Crisis Starscythe Battlesuits: Shield Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "crisis-starscythe-battlesuits",
        "item": "shield drone"
      },
      "hash": "219c8b44",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the Shield Drone model only",
            "ru": "только модель Shield Drone"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "3491e144-63d5-48f6-906d-bc5bdfdeb9a9:crisis-sunforge-battlesuits",
      "kind": "wargear",
      "name": "Crisis Sunforge Battlesuits: Marker Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "crisis-sunforge-battlesuits",
        "item": "marker drone"
      },
      "hash": "a5cb8c1d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Markerlight",
          "when": null
        }
      ]
    },
    {
      "sid": "83b098fb-38a3-45f2-93d4-14cc224ddcdc:crisis-sunforge-battlesuits",
      "kind": "wargear",
      "name": "Crisis Sunforge Battlesuits: Shield Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "crisis-sunforge-battlesuits",
        "item": "shield drone"
      },
      "hash": "219c8b44",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the Shield Drone model only",
            "ru": "только модель Shield Drone"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "e3f13656-b541-4d93-9b59-2713e85638f0:ethereal",
      "kind": "wargear",
      "name": "Ethereal: Hover Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "ethereal",
        "item": "hover drone"
      },
      "hash": "a7dce676",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "set",
          "value": "10\"",
          "when": null
        }
      ]
    },
    {
      "sid": "3491e144-63d5-48f6-906d-bc5bdfdeb9a9:ethereal",
      "kind": "wargear",
      "name": "Ethereal: Marker Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "ethereal",
        "item": "marker drone"
      },
      "hash": "a5cb8c1d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Markerlight",
          "when": null
        }
      ]
    },
    {
      "sid": "83b098fb-38a3-45f2-93d4-14cc224ddcdc:ethereal",
      "kind": "wargear",
      "name": "Ethereal: Shield Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "ethereal",
        "item": "shield drone"
      },
      "hash": "219c8b44",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the Shield Drone model only",
            "ru": "только модель Shield Drone"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "a7dcf8ec-6f67-443a-a77f-51c50f42e2e3:kroot-farstalkers",
      "kind": "wargear",
      "name": "Kroot Farstalkers: Pech’ra",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "kroot-farstalkers",
        "item": "pech'ra"
      },
      "hash": "745f9d87",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null
        }
      ]
    },
    {
      "sid": "3491e144-63d5-48f6-906d-bc5bdfdeb9a9:pathfinder-team",
      "kind": "wargear",
      "name": "Pathfinder Team: Marker Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "pathfinder-team",
        "item": "marker drone"
      },
      "hash": "a5cb8c1d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Markerlight",
          "when": null
        }
      ]
    },
    {
      "sid": "38da8799-fc2a-4fc2-9ffe-1e9643007c20:pathfinder-team",
      "kind": "wargear",
      "name": "Pathfinder Team: Pulse Accelerator Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "pathfinder-team",
        "item": "pulse accelerator drone"
      },
      "hash": "62b65bb8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 6,
          "only": {
            "name": "Pulse carbine"
          },
          "when": null
        }
      ]
    },
    {
      "sid": "83b098fb-38a3-45f2-93d4-14cc224ddcdc:pathfinder-team",
      "kind": "wargear",
      "name": "Pathfinder Team: Shield Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "pathfinder-team",
        "item": "shield drone"
      },
      "hash": "219c8b44",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the Shield Drone model only",
            "ru": "только модель Shield Drone"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "3491e144-63d5-48f6-906d-bc5bdfdeb9a9:stealth-battlesuits",
      "kind": "wargear",
      "name": "Stealth Battlesuits: Marker Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "stealth-battlesuits",
        "item": "marker drone"
      },
      "hash": "a5cb8c1d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Markerlight",
          "when": null
        }
      ]
    },
    {
      "sid": "3491e144-63d5-48f6-906d-bc5bdfdeb9a9:strike-team",
      "kind": "wargear",
      "name": "Strike Team: Marker Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "strike-team",
        "item": "marker drone"
      },
      "hash": "a5cb8c1d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Markerlight",
          "when": null
        }
      ]
    },
    {
      "sid": "83b098fb-38a3-45f2-93d4-14cc224ddcdc:strike-team",
      "kind": "wargear",
      "name": "Strike Team: Shield Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "strike-team",
        "item": "shield drone"
      },
      "hash": "219c8b44",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the Shield Drone model only",
            "ru": "только модель Shield Drone"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "f2084e6a-6326-4635-b658-250fac0a9ce5:tiger-shark",
      "kind": "wargear",
      "name": "Tiger Shark: Transport Bay",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "tiger-shark",
        "item": "transport bay"
      },
      "hash": "d294b130",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d6249dda-04d3-4c57-b3a8-849e8085e5c2:vespid-stingwings",
      "kind": "wargear",
      "name": "Vespid Stingwings: Oversight Drone",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "vespid-stingwings",
        "item": "oversight drone"
      },
      "hash": "f8221077",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "once per battle, while this ability is used",
            "ru": "раз за битву, пока способность использована"
          },
          "cond": [
            "never"
          ]
        }
      ]
    }
  ]
}

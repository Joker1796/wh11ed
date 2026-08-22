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
      "sid": "f601afd5-17dd-4110-bd95-ad2a8da3959e",
      "kind": "armyRule",
      "name": "Drones",
      "det": null,
      "hash": "afe18cdf",
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
      "sid": "bb8da155-0303-4f4a-a3a2-167a82ad3f97",
      "kind": "armyRule",
      "name": "For the Greater Good",
      "det": null,
      "hash": "88370fd8",
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
    }
  ]
}

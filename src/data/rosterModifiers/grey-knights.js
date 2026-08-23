// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "grey-knights",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "cce072e6-efe4-4f0c-b0cb-3d04a077fe93:brother-captain",
      "kind": "ability",
      "name": "Brother-Captain: Hammerhand",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "brother-captain"
      },
      "hash": "d2a9d0ad",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "20de685a-c2fc-4a03-b53e-81e1b1596f3b:brotherhood-champion",
      "kind": "ability",
      "name": "Brotherhood Champion: Inspiring Exemplar",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "brotherhood-champion"
      },
      "hash": "8e136fee",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Nemesis"
          },
          "when": {
            "en": "for the rest of the battle, once it destroyed an enemy CHARACTER in melee",
            "ru": "до конца битвы, если уничтожил вражеского CHARACTER в ближнем бою"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "a9366824-0d9e-4b29-9548-67bbe87ea381:brotherhood-techmarine",
      "kind": "ability",
      "name": "Brotherhood Techmarine: Blessing of the Omnissiah",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "brotherhood-techmarine",
        "scopes": [
          {
            "targets": [
              "GREY KNIGHTS VEHICLE"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "f41f3275",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "68c418e0-4997-43dc-816c-6502ae9e6795:brotherhood-terminator-squad",
      "kind": "ability",
      "name": "Brotherhood Terminator Squad: Force Edge",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "brotherhood-terminator-squad"
      },
      "hash": "921d6aa1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against targets other than MONSTERS and VEHICLES",
            "ru": "против целей, кроме MONSTER и VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "69144dc5-90d8-489f-b9f8-84ac2b11f999:castellan-crowe",
      "kind": "ability",
      "name": "Castellan Crowe: Champion of the Order of Purifiers",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "castellan-crowe"
      },
      "hash": "1ccd750e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Purifying flame"
          },
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "02a7dc81-4dee-4440-95ad-4ee97161347a:crowe-s-sanctifiers-brotherhood-terminator-squad",
      "kind": "ability",
      "name": "Crowe's Sanctifiers Brotherhood Terminator Squad: Force Edge (Psychic)",
      "det": null,
      "ref": null,
      "hash": "eaa073e4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against targets other than MONSTERS and VEHICLES",
            "ru": "против целей, кроме MONSTER и VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "3c102e09-c8b3-4335-a6d9-7a3bffa591ec:grand-master",
      "kind": "ability",
      "name": "Grand Master: Might of Titan",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "grand-master"
      },
      "hash": "bf1dc5bf",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
          "when": {
            "en": "once per battle, while this ability is used",
            "ru": "раз за битву, пока способность использована"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 3,
          "when": {
            "en": "once per battle, while this ability is used",
            "ru": "раз за битву, пока способность использована"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "2e6f2691-8a5a-4ab6-baf6-c9d6b1b6f0fd:paladin-squad",
      "kind": "ability",
      "name": "Paladin Squad: Attuned Onslaught",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "paladin-squad"
      },
      "hash": "71577b8b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "until the end of a turn it made a Charge move",
            "ru": "до конца хода, в котором совершил Charge"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "04c17a07-f99e-4e0d-93b5-640fd2fca087:purgation-squad",
      "kind": "ability",
      "name": "Purgation Squad: Righteous Persecution",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "purgation-squad"
      },
      "hash": "23dc7f8e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c34906ca-50ad-45af-a033-0813825c377d:razorback",
      "kind": "ability",
      "name": "Razorback: Fire Focus",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "razorback"
      },
      "hash": "2c06b555",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "349ad1d7-8340-47bd-bd2f-8ed6262b4ddb:stormhawk-interceptor",
      "kind": "ability",
      "name": "Stormhawk Interceptor: Interceptor",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "stormhawk-interceptor"
      },
      "hash": "205860ae",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "9c3665db-de45-42c3-acb0-b46b5bb04467:stormraven-gunship",
      "kind": "ability",
      "name": "Stormraven Gunship: Armoured Resilience",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "stormraven-gunship"
      },
      "hash": "e577ede9",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "06c4375b-ee7a-4552-a5d0-2a55dcd6acdb:stormtalon-gunship",
      "kind": "ability",
      "name": "Stormtalon Gunship: Strafing Run",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "stormtalon-gunship"
      },
      "hash": "1c8c1f3a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b45355c5-7cfa-4792-b7ee-826e06fe07f4:venerable-dreadnought",
      "kind": "ability",
      "name": "Venerable Dreadnought: Guidance of the Ancients",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "venerable-dreadnought"
      },
      "hash": "02b2e345",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ed4a222f-7ed6-4e9d-b310-0cb08a3c4906",
      "kind": "detachmentRule",
      "name": "Channelled Force",
      "det": "Banishers",
      "ref": {
        "kind": "detachmentRule",
        "det": "banishers"
      },
      "hash": "5abc516f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "only": {
            "tag": "PSYCHIC"
          },
          "when": {
            "en": "while that Leadership test was passed and this rule was the one selected",
            "ru": "пока пройден тест Leadership и выбрано именно это правило"
          },
          "cond": [
            "channelled-sustained"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "only": {
            "tag": "PSYCHIC"
          },
          "when": {
            "en": "while that Leadership test was passed and this rule was the one selected",
            "ru": "пока пройден тест Leadership и выбрано именно это правило"
          },
          "cond": [
            "channelled-lethal"
          ]
        }
      ]
    },
    {
      "sid": "a2c33cb8-a90f-427a-b1b2-7f15b0207e36",
      "kind": "detachmentRule",
      "name": "Mailed Fist",
      "det": "Sanctic Spearhead",
      "ref": {
        "kind": "detachmentRule",
        "det": "sanctic-spearhead"
      },
      "hash": "102c3a47",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "each time that unit Advances, until the end of the phase (replacing the Advance roll)",
            "ru": "каждый раз, когда юнит совершает Advance, до конца фазы (вместо броска Advance)"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "until the end of the turn in which that unit Advanced",
            "ru": "до конца хода, в котором юнит совершил Advance"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ]
    },
    {
      "sid": "5ab1864a-e524-4b61-977f-1a0c81e33caa",
      "kind": "enhancement",
      "name": "Grimoire of Conjunctions",
      "det": "Augurium Task Force",
      "hash": "0fb47ae2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 4,
          "when": {
            "en": "once per battle, for the Fight phase the bearer uses this Enhancement in",
            "ru": "один раз за битву, на фазу боя, в которой носитель применил улучшение"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "augurium-task-force"
      }
    },
    {
      "sid": "f5d9692e-4936-4beb-8936-4c26089d74d5",
      "kind": "enhancement",
      "name": "Shield of Prophecy",
      "det": "Augurium Task Force",
      "hash": "b0275bc1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 2,
          "when": {
            "en": "once per battle, for the battle round the bearer uses this Enhancement in",
            "ru": "один раз за битву, на раунд, в котором носитель применил улучшение"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "augurium-task-force"
      }
    },
    {
      "sid": "a4dda913-e9d9-496e-8c10-fcb30949276e",
      "kind": "enhancement",
      "name": "Sixty-sixth Seal",
      "det": "Banishers",
      "hash": "898eb4bf",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "in your Shooting phase, for models in the bearer's unit",
            "ru": "в вашей фазе стрельбы, для моделей в отряде носителя"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "banishers"
      }
    },
    {
      "sid": "3c84e9b3-44f8-4af4-bb0f-34a1a34f5944",
      "kind": "enhancement",
      "name": "Tome of Forbidden Ways",
      "det": "Brotherhood Strike",
      "hash": "5e8b3871",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "brotherhood-strike"
      }
    },
    {
      "sid": "057f85bb-3dff-4710-9cad-85ebb9cd2e9a",
      "kind": "enhancement",
      "name": "Purifying Force",
      "det": "Crowe’s Sanctifiers",
      "ref": null,
      "hash": "e9618825",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "once per battle, when this unit is selected to fight after making a charge move",
            "ru": "раз за битву, когда юнит выбран для боя после charge-перемещения"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "880712dd-e7d0-4140-8b54-c7d395724841",
      "kind": "enhancement",
      "name": "Boons of Deimos (Upgrade)",
      "det": "Fires of Purgation",
      "ref": {
        "kind": "enhancement",
        "det": "fires-of-purgation"
      },
      "hash": "05162876",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": null
        }
      ]
    },
    {
      "sid": "de7be923-5642-4bf5-b8da-1ad373303f47",
      "kind": "enhancement",
      "name": "Sanctic Reaper",
      "det": "Hallowed Conclave",
      "hash": "4c478233",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "hallowed-conclave"
      }
    },
    {
      "sid": "be02d133-6751-4ea3-b302-4630469a0d4d",
      "kind": "enhancement",
      "name": "Mandulian Reliquary",
      "det": "Warpbane Task Force",
      "hash": "88c734a9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 3,
          "when": {
            "en": "while the bearer's unit is not Battle-shocked",
            "ru": "пока отряд носителя не Battle-shocked"
          },
          "cond": [
            "unit-not-battle-shocked"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "warpbane-task-force"
      }
    },
    {
      "sid": "e3ead97e-e27b-44e0-b925-95a9551416f9",
      "kind": "enhancement",
      "name": "Radiant Champion",
      "det": "Warpbane Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "warpbane-task-force"
      },
      "hash": "be39ba82",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": null
        }
      ]
    },
    {
      "sid": "8b08bfd2-6a32-44ab-a2c4-901589090107",
      "kind": "stratagem",
      "name": "A Threat Ended",
      "det": "Argent Assault",
      "ref": {
        "kind": "stratagem",
        "det": "argent-assault",
        "name": "A Threat Ended"
      },
      "hash": "bf79a709",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "ecc6a3a8-9b28-4bc6-a7aa-16c9a54cde85",
      "kind": "stratagem",
      "name": "Aura of Vengeance",
      "det": "Argent Assault",
      "ref": {
        "kind": "stratagem",
        "det": "argent-assault",
        "name": "Aura of Vengeance"
      },
      "hash": "137c1e4f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b325fd46-a00d-4ea6-87f6-f003609e2c7a",
      "kind": "stratagem",
      "name": "Chaos Bane",
      "det": "Banishers",
      "ref": {
        "kind": "stratagem",
        "det": "banishers",
        "name": "Chaos Bane"
      },
      "hash": "bb122aa6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-CHAOS 4+",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "70353176-4c50-48d7-80a5-8f84c5bdeac8",
      "kind": "stratagem",
      "name": "Purgation Pattern",
      "det": "Brotherhood Strike",
      "ref": {
        "kind": "stratagem",
        "det": "brotherhood-strike",
        "name": "Purgation Pattern"
      },
      "hash": "fd0d603c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "c27c1fef-b27d-4d79-a325-8081ab9992c9",
      "kind": "stratagem",
      "name": "Truesilver Channelling",
      "det": "Brotherhood Strike",
      "ref": {
        "kind": "stratagem",
        "det": "brotherhood-strike",
        "name": "Truesilver Channelling"
      },
      "hash": "425bf3c4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "only": {
            "tag": "PSYCHIC"
          },
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "ec8379f3-0e51-4799-9b31-72811587a410",
      "kind": "stratagem",
      "name": "Psi-reactive Ammunition",
      "det": "Crowe’s Sanctifiers",
      "ref": null,
      "hash": "f7bbc5ac",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "PSYCHIC",
          "only": {
            "name": "Storm bolter"
          },
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "5d77830b-d1f3-4b68-be52-4897eec1df38",
      "kind": "stratagem",
      "name": "Giants of the Battlefield",
      "det": "Hallowed Conclave",
      "ref": {
        "kind": "stratagem",
        "det": "hallowed-conclave",
        "name": "Giants of the Battlefield"
      },
      "hash": "6547cad0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "c0addec3-227c-404f-a291-d2cbf4e87772",
      "kind": "stratagem",
      "name": "Point-Blank Purgation",
      "det": "Hallowed Conclave",
      "ref": {
        "kind": "stratagem",
        "det": "hallowed-conclave",
        "name": "Point-Blank Purgation"
      },
      "hash": "4d46a400",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "PISTOL",
          "only": {
            "name": "Storm bolter"
          },
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "TWIN-LINKED",
          "only": {
            "name": "Storm bolter"
          },
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "d06f1a14-1634-4911-acfb-6eb2caded2d2",
      "kind": "stratagem",
      "name": "Blades from the Beyond",
      "det": "Immaterial Interdiction",
      "ref": {
        "kind": "stratagem",
        "det": "immaterial-interdiction",
        "name": "Blades from the Beyond"
      },
      "hash": "127e1a54",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "2bb127f0-35c3-4e5c-b9b3-86eb75105241",
      "kind": "stratagem",
      "name": "Abominus-Class Targets",
      "det": "Sanctic Spearhead",
      "ref": {
        "kind": "stratagem",
        "det": "sanctic-spearhead",
        "name": "Abominus-Class Targets"
      },
      "hash": "9754786c",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "31a2dff2-e760-462d-b57a-6fe1159bd900",
      "kind": "stratagem",
      "name": "Aegis Eternal",
      "det": "Warpbane Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "warpbane-task-force",
        "name": "Aegis Eternal"
      },
      "hash": "19be779c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "while wholly within your Hallowed Ground",
            "ru": "пока полностью в своей Hallowed Ground"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "314a4643-59ab-4fd8-a1a8-d05172bb2070:brotherhood-terminator-squad",
      "kind": "wargear",
      "name": "Brotherhood Terminator Squad: Ancient’s Banner",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "brotherhood-terminator-squad",
        "item": "ancient's banner"
      },
      "hash": "ec06b6a4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "314a4643-59ab-4fd8-a1a8-d05172bb2070:paladin-squad",
      "kind": "wargear",
      "name": "Paladin Squad: Ancient’s Banner",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "paladin-squad",
        "item": "ancient's banner"
      },
      "hash": "ec06b6a4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    }
  ]
}

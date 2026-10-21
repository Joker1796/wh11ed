// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "blood-angels",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "c73ecb8e-8bd6-4aba-937e-1ddb186052bf:astorath",
      "kind": "ability",
      "name": "Astorath: Mass of Doom",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "astorath"
      },
      "hash": "6bf7138a",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS: non-MONSTER/VEHICLE",
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS: non-MONSTER/VEHICLE",
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "e5c15257-2a26-44db-9557-e1dfbce03718:blood-angels-captain",
      "kind": "ability",
      "name": "Blood Angels Captain: Finest Hour (Once per battle, per unit)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "blood-angels-captain"
      },
      "hash": "aeb5584d",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
          "when": {
            "en": "once per battle, in the Fight phase in which this ability is used",
            "ru": "раз за битву, в фазе боя, в которой применена способность"
          },
          "once": {
            "per": "unit",
            "dur": "phase"
          }
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "once per battle, in the Fight phase in which this ability is used",
            "ru": "раз за битву, в фазе боя, в которой применена способность"
          },
          "once": {
            "per": "unit",
            "dur": "phase"
          }
        }
      ]
    },
    {
      "sid": "pack:brother-corbulo:sanguinary-priest",
      "kind": "ability",
      "name": "Brother Corbulo: Sanguinary Priest",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "brother-corbulo"
      },
      "hash": "ccc78431",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+",
          "target": "unit",
          "when": null
        }
      ],
      "note": "Read as Hospitaller: Medicus Ministorum (adepta-sororitas), the same text."
    },
    {
      "sid": "pack:brother-corbulo:the-red-grail",
      "kind": "ability",
      "name": "Brother Corbulo: The Red Grail",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "brother-corbulo"
      },
      "hash": "4852bd6e",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "pack:captain-tycho:embittered",
      "kind": "ability",
      "name": "Captain Tycho: Embittered",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "captain-tycho"
      },
      "hash": "6d2c086a",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "set",
          "value": "12",
          "only": {
            "name": "Dead Man’s Hand"
          },
          "when": {
            "en": "after the first attack is allocated to this model",
            "ru": "после того как этой модели впервые распределена атака"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "pack:captain-tycho:gifted-commander",
      "kind": "ability",
      "name": "Captain Tycho: Gifted Commander",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "captain-tycho"
      },
      "hash": "d0be5338",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "if selected when the unit shoots (one of three)",
            "ru": "если выбрано при стрельбе (одно из трёх)"
          },
          "cond": [
            "tycho-assault"
          ],
          "target": "unit"
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "HEAVY",
          "when": {
            "en": "if selected when the unit shoots (one of three)",
            "ru": "если выбрано при стрельбе (одно из трёх)"
          },
          "cond": [
            "tycho-heavy"
          ],
          "target": "unit"
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "RAPID FIRE 1",
          "when": {
            "en": "if selected when the unit shoots (one of three)",
            "ru": "если выбрано при стрельбе (одно из трёх)"
          },
          "cond": [
            "tycho-rapid-fire"
          ],
          "target": "unit"
        }
      ]
    },
    {
      "sid": "9b5008a3-0500-4e93-acc1-e690145a1d6e:chief-librarian-mephiston",
      "kind": "ability",
      "name": "Chief Librarian Mephiston: Quickening (psychic level 1)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chief-librarian-mephiston",
        "set": "Chief Librarian (psyker level 3)",
        "pickLimit": 1
      },
      "hash": "a12a4dd9",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "40df6727-496b-4973-850f-37709ada6eff:chief-librarian-mephiston",
      "kind": "ability",
      "name": "Chief Librarian Mephiston: Transfixing Gaze (psychic level 2)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chief-librarian-mephiston",
        "set": "Chief Librarian (psyker level 3)",
        "pickLimit": 1
      },
      "hash": "6f022183",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3531651c-2a7b-49fc-9f7b-2ece398afe73:death-company-captain-with-jump-pack",
      "kind": "ability",
      "name": "Death Company Captain with Jump Pack: Lost to Fury",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-captain-with-jump-pack"
      },
      "hash": "9c60d886",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        },
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
      "sid": "af61cdb2-6e02-4d43-acc7-0322d1964051:death-company-captain",
      "kind": "ability",
      "name": "Death Company Captain: Forlorn Hero",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-captain"
      },
      "hash": "a8a48d45",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 6\"",
          "when": null
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 6\"",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "pack:death-company-dreadnought-with-magna-grapple:black-rage",
      "kind": "ability",
      "name": "Death Company Dreadnought with Magna-grapple: Black Rage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-dreadnought-with-magna-grapple"
      },
      "hash": "b0159a4a",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": "0",
          "when": {
            "en": "while not within 12\" of a friendly CHAPLAIN model",
            "ru": "пока не в пределах 12\" от дружественной модели CHAPLAIN"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "pack:death-company-dreadnought-with-magna-grapple:magna-grapple",
      "kind": "ability",
      "name": "Death Company Dreadnought with Magna-grapple: Magna-grapple",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-dreadnought-with-magna-grapple"
      },
      "hash": "d07334b2",
      "ver": 972,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "pack:death-company-marines-with-boltguns-and-jump-packs:black-rage",
      "kind": "ability",
      "name": "Death Company Marines with Boltguns and Jump Packs: Black Rage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-marines-with-boltguns-and-jump-packs"
      },
      "hash": "c967aef4",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": "0",
          "when": {
            "en": "while not within 12\" of a friendly CHAPLAIN model",
            "ru": "пока не в пределах 12\" от дружественной модели CHAPLAIN"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "pack:death-company-marines-with-boltguns:an-honourable-death-in-combat",
      "kind": "ability",
      "name": "Death Company Marines with Boltguns: An Honourable Death in Combat",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-marines-with-boltguns"
      },
      "hash": "a9e0e315",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this unit is below its Starting Strength",
            "ru": "пока отряд ниже Starting Strength"
          },
          "cond": [
            "unit-below-starting-strength"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 2",
          "when": {
            "en": "instead, while this unit is Below Half-strength",
            "ru": "вместо этого, пока отряд Below Half-strength"
          },
          "cond": [
            "unit-below-half-strength"
          ],
          "alt": 0
        }
      ]
    },
    {
      "sid": "pack:death-company-marines-with-boltguns:black-rage",
      "kind": "ability",
      "name": "Death Company Marines with Boltguns: Black Rage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-marines-with-boltguns"
      },
      "hash": "c967aef4",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": "0",
          "when": {
            "en": "while not within 12\" of a friendly CHAPLAIN model",
            "ru": "пока не в пределах 12\" от дружественной модели CHAPLAIN"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "4708f68e-155f-4d54-83d8-6e2eb9ab114a:death-company-marines",
      "kind": "ability",
      "name": "Death Company Marines: An Honourable Death in Combat",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-marines"
      },
      "hash": "26507791",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this unit is below its Starting Strength",
            "ru": "пока отряд ниже Starting Strength"
          },
          "cond": [
            "unit-below-starting-strength"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 2",
          "when": {
            "en": "instead, while this unit is Below Half-strength",
            "ru": "вместо этого, пока отряд Below Half-strength"
          },
          "cond": [
            "unit-below-half-strength"
          ],
          "alt": 0
        }
      ]
    },
    {
      "sid": "pack:gabriel-seth:whirlwind-of-gore",
      "kind": "ability",
      "name": "Gabriel Seth: Whirlwind of Gore",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "gabriel-seth"
      },
      "hash": "9cc36577",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Blood Reaver"
          },
          "when": {
            "en": "for every 5 enemy models within 6\" of this model",
            "ru": "за каждые 5 вражеских моделей в пределах 6\" от этой модели"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "1f8252ef-df73-466a-892b-d0fb0c055f23:lemartes",
      "kind": "ability",
      "name": "Lemartes: Fury Unbound",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lemartes"
      },
      "hash": "5691ba90",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null
        },
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
      "sid": "cecd7c03-0c6a-47d3-a35a-aa7369d6f60e:lemartes",
      "kind": "ability",
      "name": "Lemartes: Guardian of the Lost",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lemartes"
      },
      "hash": "9bdc06bf",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "d",
          "op": "add",
          "value": -1,
          "when": null
        },
        {
          "on": "incoming",
          "stat": "d",
          "op": "add",
          "value": -1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "pack:librarian-dreadnought:shield-of-sanguinius-aura-psychic",
      "kind": "ability",
      "name": "Librarian Dreadnought: Shield of Sanguinius (Aura, Psychic)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "librarian-dreadnought",
        "scopes": [
          {
            "targets": [
              "ADEPTUS ASTARTES"
            ],
            "excludes": [],
            "models": [],
            "modelExcludes": []
          }
        ]
      },
      "hash": "f0481f4f",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+ (vs mortal wounds and Psychic Attacks)",
          "when": null,
          "target": "aura"
        }
      ]
    },
    {
      "sid": "70bde792-bb64-4ae8-9dc5-e34ed4d67475:sanguinary-guard",
      "kind": "ability",
      "name": "Sanguinary Guard: Angelic Visage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sanguinary-guard"
      },
      "hash": "07125726",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "hit",
          "op": "add",
          "value": -1,
          "vs": "melee",
          "when": null
        }
      ]
    },
    {
      "sid": "3424cb21-6416-4162-adfc-e6a48ba370ca:sanguinary-guard",
      "kind": "ability",
      "name": "Sanguinary Guard: Heirs of Azkaellon",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sanguinary-guard"
      },
      "hash": "3e6fde4b",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "s-gt-t",
          "when": null
        }
      ]
    },
    {
      "sid": "pack:sanguinary-priest-with-jump-pack:blood-chalice",
      "kind": "ability",
      "name": "Sanguinary Priest with Jump Pack: Blood Chalice",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sanguinary-priest-with-jump-pack"
      },
      "hash": "b74af02a",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "pack:sanguinary-priest-with-jump-pack:sanguinary-priest",
      "kind": "ability",
      "name": "Sanguinary Priest with Jump Pack: Sanguinary Priest",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sanguinary-priest-with-jump-pack"
      },
      "hash": "ccc78431",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+",
          "target": "unit",
          "when": null
        }
      ],
      "note": "Read as Hospitaller: Medicus Ministorum (adepta-sororitas), the same text."
    },
    {
      "sid": "129df28d-4368-4c90-90c2-1785b61ebdb6:sanguinary-priest",
      "kind": "ability",
      "name": "Sanguinary Priest: Blood Chalice",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sanguinary-priest"
      },
      "hash": "4b39a6c7",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "14322c4c-df67-43e5-be95-af40f78f620d:sanguinary-spearhead-sanguinary-guard",
      "kind": "ability",
      "name": "Sanguinary Spearhead Sanguinary Guard: Born To Fight",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sanguinary-spearhead-sanguinary-guard"
      },
      "hash": "f8299992",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while this unit is engaged",
            "ru": "пока отряд в ближнем бою"
          },
          "cond": [
            "unit-engaged"
          ]
        }
      ]
    },
    {
      "sid": "47daf7fe-c1de-4223-878c-0753368aae9c:sanguinary-spearhead-sanguinary-guard",
      "kind": "ability",
      "name": "Sanguinary Spearhead Sanguinary Guard: Born To Fight",
      "det": null,
      "ref": null,
      "hash": "f8299992",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while this unit is engaged",
            "ru": "пока отряд в ближнем бою"
          },
          "cond": [
            "unit-engaged"
          ]
        }
      ]
    },
    {
      "sid": "pack:tycho-the-lost:black-rage",
      "kind": "ability",
      "name": "Tycho the Lost: Black Rage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tycho-the-lost"
      },
      "hash": "b0159a4a",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": "0",
          "when": {
            "en": "while not within 12\" of a friendly CHAPLAIN model",
            "ru": "пока не в пределах 12\" от дружественной модели CHAPLAIN"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "478d1fb6-e105-48d6-832e-05e63103b1b5",
      "kind": "armyRule",
      "name": "Combat Doctrines",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "4b1af9f6",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "while the Devastator Doctrine is active for this unit",
            "ru": "пока для отряда активна Devastator Doctrine"
          },
          "cond": [
            "doctrine-devastator"
          ]
        }
      ]
    },
    {
      "sid": "037bc931-f00a-4906-812c-b1832ffe0155",
      "kind": "enhancement",
      "name": "Prescient Flash",
      "det": "Angelic Inheritors",
      "ref": {
        "kind": "enhancement",
        "det": "angelic-inheritors"
      },
      "hash": "8955e230",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 6\"",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "56b4ffc0-1976-4b75-8160-a63e7ea958f5",
      "kind": "enhancement",
      "name": "Angelic Executioner",
      "det": "Encarmine Speartip",
      "ref": {
        "kind": "enhancement",
        "det": "encarmine-speartip"
      },
      "hash": "3dc7778f",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "the one picked when the bearer’s unit is selected to fight",
            "ru": "выбранная, когда отряд носителя выбран для боя"
          },
          "cond": [
            "executioner-lethal"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "the one picked when the bearer’s unit is selected to fight",
            "ru": "выбранная, когда отряд носителя выбран для боя"
          },
          "cond": [
            "executioner-sustained"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "the one picked when the bearer’s unit is selected to fight",
            "ru": "выбранная, когда отряд носителя выбран для боя"
          },
          "cond": [
            "executioner-lethal"
          ],
          "target": "led"
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "the one picked when the bearer’s unit is selected to fight",
            "ru": "выбранная, когда отряд носителя выбран для боя"
          },
          "cond": [
            "executioner-sustained"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "3e1533b5-dd19-4d7b-9a07-b893c2b6597d",
      "kind": "enhancement",
      "name": "Shadow of Abomination",
      "det": "Encarmine Speartip",
      "ref": {
        "kind": "enhancement",
        "det": "encarmine-speartip"
      },
      "hash": "93ae32eb",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per battle, per army, when this unit is selected to fight",
            "ru": "раз за битву на армию, когда отряд выбран для боя"
          },
          "once": {
            "per": "army",
            "dur": "phase"
          }
        }
      ]
    },
    {
      "sid": "51ee8286-2787-4427-8df3-d5ccea9bab9f",
      "kind": "enhancement",
      "name": "Masterful Fighter",
      "det": "Sanguinary Spearhead",
      "ref": {
        "kind": "enhancement",
        "det": "cp:blood-angels"
      },
      "hash": "6edde99c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": null
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null
        }
      ]
    },
    {
      "sid": "61e24748-9513-4fb7-8812-9515e8b3f403",
      "kind": "enhancement",
      "name": "On the Archtraitor's Bridge",
      "det": "Wrath of the Doomed",
      "ref": {
        "kind": "enhancement",
        "det": "wrath-of-the-doomed"
      },
      "hash": "80d7e659",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": null
        }
      ]
    },
    {
      "sid": "e3e75d97-9c02-4366-8da7-0581e61e9178",
      "kind": "stratagem",
      "name": "Focused Fury",
      "det": "Angelic Inheritors",
      "ref": {
        "kind": "stratagem",
        "det": "angelic-inheritors",
        "name": "Focused Fury"
      },
      "hash": "874cb8f1",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": {
            "en": "also, for a CHARACTER unit",
            "ru": "и ещё, для отряда CHARACTER"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "09e0df1e-bf74-489a-96a9-01aedc292914",
      "kind": "stratagem",
      "name": "In the Shadow of Great Wings",
      "det": "Angelic Inheritors",
      "ref": {
        "kind": "stratagem",
        "det": "angelic-inheritors",
        "name": "In the Shadow of Great Wings"
      },
      "hash": "577333b0",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "7df3533d-f8de-42ec-98a7-3fcb619a3a3c",
      "kind": "stratagem",
      "name": "Instant of Grace",
      "det": "Angelic Inheritors",
      "ref": {
        "kind": "stratagem",
        "det": "angelic-inheritors",
        "name": "Instant of Grace"
      },
      "hash": "5c6aca44",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Character",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "round"
    },
    {
      "sid": "4fbae4b4-42f9-48ca-903e-a362c1fe883e",
      "kind": "stratagem",
      "name": "Strike Now for Glory",
      "det": "Angelic Inheritors",
      "ref": {
        "kind": "stratagem",
        "det": "angelic-inheritors",
        "name": "Strike Now for Glory"
      },
      "hash": "a68ae285",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
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
      "sid": "9cbb9fe9-17f0-4dcf-9f72-779fa947ebb8",
      "kind": "stratagem",
      "name": "Blinding Blurs of Vengeance",
      "det": "Encarmine Speartip",
      "ref": {
        "kind": "stratagem",
        "det": "encarmine-speartip",
        "name": "Blinding Blurs of Vengeance"
      },
      "hash": "577333b0",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "90cbb284-cd76-4dc6-a001-1ce0bed18370",
      "kind": "stratagem",
      "name": "Dauntless Bravery",
      "det": "Sanguinary Spearhead",
      "ref": {
        "kind": "stratagem",
        "det": "cp:blood-angels",
        "name": "Dauntless Bravery"
      },
      "hash": "ed2665e0",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "s-gt-t",
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "2bf5458d-94f8-405f-9490-2c449ddecc98",
      "kind": "stratagem",
      "name": "Death Begets Vengeance",
      "det": "Wrath of the Doomed",
      "ref": {
        "kind": "stratagem",
        "det": "wrath-of-the-doomed",
        "name": "Death Begets Vengeance"
      },
      "hash": "e59da364",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "DEATH COMPANY attacks against the hated unit",
            "ru": "атаки DEATH COMPANY против отряда hated"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "2328e95a-96ba-4312-844e-709de76d7cfb",
      "kind": "stratagem",
      "name": "No Barrier to Retribution",
      "det": "Wrath of the Doomed",
      "ref": {
        "kind": "stratagem",
        "det": "wrath-of-the-doomed",
        "name": "No Barrier to Retribution"
      },
      "hash": "6ab50acf",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Mobile",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "9cb2e570-6af8-4c6f-b89a-4951b094cc3c:death-company-captain-with-jump-pack",
      "kind": "wargear",
      "name": "Death Company Captain with Jump Pack: Relic Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "death-company-captain-with-jump-pack",
        "item": "relic shield"
      },
      "hash": "24c8e47f",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "pack:death-company-dreadnought-with-magna-grapple:smoke-launchers",
      "kind": "wargear",
      "name": "Death Company Dreadnought with Magna-grapple: Smoke Launchers",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "death-company-dreadnought-with-magna-grapple",
        "item": "smoke launchers"
      },
      "hash": "2317e82e",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Smoke",
          "when": null
        }
      ]
    },
    {
      "sid": "pack:furioso-dreadnought:magna-grapple",
      "kind": "wargear",
      "name": "Furioso Dreadnought: Magna-grapple",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "furioso-dreadnought",
        "item": "magna-grapple"
      },
      "hash": "2687f8bb",
      "ver": 972,
      "reviewed": true,
      "effects": []
    }
  ]
}

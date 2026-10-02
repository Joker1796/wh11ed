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
          "cond": [
            "never"
          ]
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
          "cond": [
            "never"
          ]
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
            "never"
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
            "never"
          ],
          "alt": 0
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
      "effects": []
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
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "51ee8286-2787-4427-8df3-d5ccea9bab9f",
      "kind": "enhancement",
      "name": "Masterful Fighter",
      "det": "Sanguinary Spearhead",
      "ref": null,
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
    }
  ]
}

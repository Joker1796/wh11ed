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
      "sid": "ac23ab70-115f-4c7e-b66a-e3093a934f1e:astorath",
      "kind": "ability",
      "name": "Astorath: Mass of Doom",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "astorath"
      },
      "hash": "6a6c4936",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "until the end of a turn its unit made a Charge move",
            "ru": "до конца хода, в котором отряд совершил Charge"
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "until the end of a turn this unit made a Charge move",
            "ru": "до конца хода, в котором отряд совершил Charge"
          },
          "cond": [
            "unit-charged"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "04b5d2e0-87f3-43fb-8e2d-224c1c453e4a:blood-angels-captain",
      "kind": "ability",
      "name": "Blood Angels Captain: Finest Hour",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "blood-angels-captain"
      },
      "hash": "343267c3",
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
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
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
      "sid": "f9fd8c3d-6ef7-4a5b-932a-096df2b86f93:commander-dante",
      "kind": "ability",
      "name": "Commander Dante: Warden of the Imperium Nihilus",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "commander-dante"
      },
      "hash": "54c9b976",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1a3197fa-adeb-4ecc-874a-1581437a938b:death-company-captain-with-jump-pack",
      "kind": "ability",
      "name": "Death Company Captain with Jump Pack: Black Rage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-captain-with-jump-pack"
      },
      "hash": "406a6207",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": 0,
          "when": {
            "en": "while not within 6\" of a BLOOD ANGELS CHARACTER or 12\" of a CHAPLAIN",
            "ru": "пока не в 6\" от BLOOD ANGELS CHARACTER и не в 12\" от CHAPLAIN"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "809fddbd-421f-492e-be6d-7e733115b2c3:death-company-captain-with-jump-pack",
      "kind": "ability",
      "name": "Death Company Captain with Jump Pack: Lost to Fury",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-captain-with-jump-pack"
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
      "sid": "1a3197fa-adeb-4ecc-874a-1581437a938b:death-company-captain",
      "kind": "ability",
      "name": "Death Company Captain: Black Rage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-captain"
      },
      "hash": "406a6207",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": 0,
          "when": {
            "en": "while not within 6\" of a BLOOD ANGELS CHARACTER or 12\" of a CHAPLAIN",
            "ru": "пока не в 6\" от BLOOD ANGELS CHARACTER и не в 12\" от CHAPLAIN"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "2c8f129d-6b94-443f-9c30-fab0f55189d8:death-company-captain",
      "kind": "ability",
      "name": "Death Company Captain: Forlorn Hero",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-captain"
      },
      "hash": "10c8dbde",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1a3197fa-adeb-4ecc-874a-1581437a938b:death-company-dreadnought",
      "kind": "ability",
      "name": "Death Company Dreadnought: Black Rage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-dreadnought"
      },
      "hash": "406a6207",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": 0,
          "when": {
            "en": "while not within 6\" of a BLOOD ANGELS CHARACTER or 12\" of a CHAPLAIN",
            "ru": "пока не в 6\" от BLOOD ANGELS CHARACTER и не в 12\" от CHAPLAIN"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "1a3197fa-adeb-4ecc-874a-1581437a938b:death-company-marines-with-bolt-rifles",
      "kind": "ability",
      "name": "Death Company Marines with Bolt Rifles: Black Rage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-marines-with-bolt-rifles"
      },
      "hash": "406a6207",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": 0,
          "when": {
            "en": "while not within 6\" of a BLOOD ANGELS CHARACTER or 12\" of a CHAPLAIN",
            "ru": "пока не в 6\" от BLOOD ANGELS CHARACTER и не в 12\" от CHAPLAIN"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "1a3197fa-adeb-4ecc-874a-1581437a938b:death-company-marines-with-jump-packs",
      "kind": "ability",
      "name": "Death Company Marines with Jump Packs: Black Rage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-marines-with-jump-packs"
      },
      "hash": "406a6207",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": 0,
          "when": {
            "en": "while not within 6\" of a BLOOD ANGELS CHARACTER or 12\" of a CHAPLAIN",
            "ru": "пока не в 6\" от BLOOD ANGELS CHARACTER и не в 12\" от CHAPLAIN"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "847cb735-32ae-4dcf-9ffa-2e579961191b:death-company-marines",
      "kind": "ability",
      "name": "Death Company Marines: An Honourable Death in Combat",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-marines"
      },
      "hash": "058c7e48",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "against a unit below its Starting Strength",
            "ru": "по отряду ниже Starting Strength"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "1a3197fa-adeb-4ecc-874a-1581437a938b:death-company-marines",
      "kind": "ability",
      "name": "Death Company Marines: Black Rage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-company-marines"
      },
      "hash": "406a6207",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": 0,
          "when": {
            "en": "while not within 6\" of a BLOOD ANGELS CHARACTER or 12\" of a CHAPLAIN",
            "ru": "пока не в 6\" от BLOOD ANGELS CHARACTER и не в 12\" от CHAPLAIN"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "832607b8-9dcc-4dc6-91a3-46108750a895:lemartes",
      "kind": "ability",
      "name": "Lemartes: Fury Unbound",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lemartes"
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
      "sid": "4697dedf-d6a1-4ee5-9816-ea2d9981158a:lemartes",
      "kind": "ability",
      "name": "Lemartes: Guardian of the Lost",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lemartes"
      },
      "hash": "a33b6550",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7d0b98fd-de19-461b-ac84-d5a202107a15:sanguinary-priest",
      "kind": "ability",
      "name": "Sanguinary Priest: Blood Chalice",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sanguinary-priest"
      },
      "hash": "b74af02a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "f0488d61-b697-43cf-95d8-39c6168b9c1a:sanguinary-priest",
      "kind": "ability",
      "name": "Sanguinary Priest: Sanguinary Priest",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sanguinary-priest"
      },
      "hash": "ccc78431",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+",
          "target": "led",
          "when": null
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
      "sid": "15c0488f-a9ec-4288-a4c4-7bfba664628b",
      "kind": "allegiance",
      "name": "Headhunter Task Force Keywords: Character",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "headhunter-task-force-keywords",
        "opt": "Character"
      },
      "hash": "958d34d8",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "the keyword this grants is applied by the roster layer itself (rosterEngine's allegKeyword feeds DatasheetCard's grantedKeywords), so recording it here too would show it twice; no printed number changes"
    },
    {
      "sid": "41ab380c-9b9c-44d2-a03b-b12eaa212582",
      "kind": "detachmentRule",
      "name": "Red Thirst",
      "det": "Liberator Assault Group",
      "hash": "ca29e36f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "in the Fight phase, if the unit made a Charge move this turn",
            "ru": "в фазе боя, если юнит совершил чардж в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "in the Fight phase, if the unit made a Charge move this turn",
            "ru": "в фазе боя, если юнит совершил чардж в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "liberator-assault-group"
      }
    },
    {
      "sid": "0a300460-ad93-4be7-9188-9e0f87779498",
      "kind": "detachmentRule",
      "name": "Maddened Ferocity",
      "det": "Rage-cursed Onslaught",
      "hash": "39c36bc7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "in the Fight phase, if the unit made a Charge move this turn",
            "ru": "в фазе боя, если юнит совершил чардж в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "instead of +1, if the unit is Battle-shocked and made a Charge move",
            "ru": "вместо +1, если юнит Battle-shocked и совершил чардж"
          },
          "cond": [
            "unit-charged",
            "unit-battle-shocked"
          ],
          "alt": 0
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "rage-cursed-onslaught"
      }
    },
    {
      "sid": "2d22330e-db53-4118-801c-2a357f165d91",
      "kind": "enhancement",
      "name": "Prescient Flash",
      "det": "Angelic Inheritors",
      "ref": {
        "kind": "enhancement",
        "det": "angelic-inheritors"
      },
      "hash": "719dbd66",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 6\"",
          "when": null
        }
      ]
    },
    {
      "sid": "8f4b7a67-ab94-4545-afea-aa061b2fd5f2",
      "kind": "enhancement",
      "name": "Shadow of Abomination",
      "det": "Encarmine Speartip",
      "ref": {
        "kind": "enhancement",
        "det": "encarmine-speartip"
      },
      "hash": "93ae32eb",
      "ver": 925,
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
      "sid": "43800b4c-d055-44df-b593-75ee22ba1231",
      "kind": "enhancement",
      "name": "Blood Boil",
      "det": "Legacy of Grace",
      "ref": {
        "kind": "enhancement",
        "det": "legacy-of-grace"
      },
      "hash": "7d893d70",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI: non-MONSTER/VEHICLE 5+",
          "when": null,
          "only": {
            "tag": "PSYCHIC"
          }
        }
      ],
      "note": "addresses the [PSYCHIC] attacks, a subset of the weapon rows this format cannot single out"
    },
    {
      "sid": "77a40dd5-c838-4223-80b2-853a997a7d0c",
      "kind": "enhancement",
      "name": "Rage-fuelled Warrior",
      "det": "Liberator Assault Group",
      "ref": {
        "kind": "enhancement",
        "det": "liberator-assault-group"
      },
      "hash": "950b2f1e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 3",
          "when": {
            "en": "once per battle, for the Fight phase the bearer uses this Enhancement in",
            "ru": "раз за битву, на фазу боя, в которой носитель использовал улучшение"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "940b5249-6f37-4a1b-9a46-191a75ed41a7",
      "kind": "enhancement",
      "name": "Speed of the Primarch",
      "det": "Liberator Assault Group",
      "ref": {
        "kind": "enhancement",
        "det": "liberator-assault-group"
      },
      "hash": "94c8620d",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "e088a79c-17c8-4672-9719-801a89b21419",
      "kind": "enhancement",
      "name": "Angel’s Fang",
      "det": "Rage-cursed Onslaught",
      "ref": {
        "kind": "enhancement",
        "det": "rage-cursed-onslaught"
      },
      "hash": "3e02e4a7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 2",
          "when": {
            "en": "against MONSTER or VEHICLE targets",
            "ru": "по целям MONSTER или VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "c20141d0-2bb8-4532-9bd7-46b360b4b0ee",
      "kind": "enhancement",
      "name": "Carmine Reliquary",
      "det": "Rage-cursed Onslaught",
      "ref": {
        "kind": "enhancement",
        "det": "rage-cursed-onslaught"
      },
      "hash": "040e4ae1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 6\"",
          "when": null
        }
      ]
    },
    {
      "sid": "b2c65fcd-a74a-48ff-9b54-afcc973fd5d9",
      "kind": "enhancement",
      "name": "Master of the Red Thirst",
      "det": "Rage-cursed Onslaught",
      "ref": {
        "kind": "enhancement",
        "det": "rage-cursed-onslaught"
      },
      "hash": "94c8620d",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "da1adec0-3e83-40b6-807c-fbd76b193c76",
      "kind": "enhancement",
      "name": "Sanguinary Tear (Aura)",
      "det": "Rage-cursed Onslaught",
      "hash": "41be1610",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "target": "aura",
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "rage-cursed-onslaught",
        "scopes": [
          {
            "targets": [
              "DEATH COMPANY"
            ],
            "excludes": []
          }
        ]
      }
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
      "sid": "4d3bc718-7687-4dbe-ba8b-5f42d0e4506a",
      "kind": "enhancement",
      "name": "Archangel’s Shard",
      "det": "The Angelic Host",
      "ref": {
        "kind": "enhancement",
        "det": "the-angelic-host"
      },
      "hash": "c209f36e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-CHAOS 5+",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null
        }
      ]
    },
    {
      "sid": "63a53ef1-6111-4a00-8ce9-418646cd23cf",
      "kind": "enhancement",
      "name": "Artisan of War",
      "det": "The Angelic Host",
      "hash": "bab820f3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null
        },
        {
          "on": "profile",
          "stat": "sv",
          "op": "set",
          "value": "2+",
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "the-angelic-host"
      }
    },
    {
      "sid": "47a29acb-b0b7-455f-8959-cdbdd6de9136",
      "kind": "enhancement",
      "name": "Vengeful Onslaught",
      "det": "The Lost Brethren",
      "hash": "d0a23a72",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "the-lost-brethren"
      }
    },
    {
      "sid": "99c9bba1-4e59-4d3e-b168-906e977bb05d",
      "kind": "enhancement",
      "name": "On the Archtraitor's Bridge",
      "det": "Wrath of the Doomed",
      "ref": {
        "kind": "enhancement",
        "det": "wrath-of-the-doomed"
      },
      "hash": "80d7e659",
      "ver": 925,
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
      "sid": "a9d59b50-f9f7-4c58-a3da-af7dd999b2d8",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Angelic Inheritors",
      "ref": {
        "kind": "stratagem",
        "det": "angelic-inheritors",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "709d83a3-6a9d-4e15-bb91-522145490141",
      "kind": "stratagem",
      "name": "Focused Fury",
      "det": "Angelic Inheritors",
      "ref": {
        "kind": "stratagem",
        "det": "angelic-inheritors",
        "name": "Focused Fury"
      },
      "hash": "c1439683",
      "ver": 925,
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
      "sid": "811ce264-ec5d-4c48-89b3-eb7f67e542e0",
      "kind": "stratagem",
      "name": "Instant of Grace",
      "det": "Angelic Inheritors",
      "ref": {
        "kind": "stratagem",
        "det": "angelic-inheritors",
        "name": "Instant of Grace"
      },
      "hash": "edaf5eac",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d894d116-f328-4734-b401-ba909226f87b",
      "kind": "stratagem",
      "name": "Strike Now For Glory",
      "det": "Angelic Inheritors",
      "ref": {
        "kind": "stratagem",
        "det": "angelic-inheritors",
        "name": "Strike Now For Glory"
      },
      "hash": "4f343477",
      "ver": 925,
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
      "sid": "f58294ba-6002-4a97-8be1-5b311bda04c3",
      "kind": "stratagem",
      "name": "Blinding Blurs of Vengeance",
      "det": "Encarmine Speartip",
      "ref": {
        "kind": "stratagem",
        "det": "encarmine-speartip",
        "name": "Blinding Blurs of Vengeance"
      },
      "hash": "38b9e784",
      "ver": 925,
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
      "sid": "663734f3-8762-43d4-a2c7-556b3572b180",
      "kind": "stratagem",
      "name": "Angelic Grace",
      "det": "Liberator Assault Group",
      "ref": {
        "kind": "stratagem",
        "det": "liberator-assault-group",
        "name": "Angelic Grace"
      },
      "hash": "54dde1f0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+ (vs mortal wounds)",
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "d6b55c24-5996-4ab0-a969-8a5692c586c4",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Liberator Assault Group",
      "ref": {
        "kind": "stratagem",
        "det": "liberator-assault-group",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "68e640c9-6866-44ec-83ff-079063373952",
      "kind": "stratagem",
      "name": "Red Rampage",
      "det": "Liberator Assault Group",
      "ref": {
        "kind": "stratagem",
        "det": "liberator-assault-group",
        "name": "Red Rampage"
      },
      "hash": "1e060dc1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": {
            "en": "if that ability was the one selected",
            "ru": "если выбрана эта способность"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "if that ability was the one selected",
            "ru": "если выбрана эта способность"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "90ceb16d-6855-4536-8a4a-d48f177c1ec1",
      "kind": "stratagem",
      "name": "Savage Echoes",
      "det": "Liberator Assault Group",
      "ref": {
        "kind": "stratagem",
        "det": "liberator-assault-group",
        "name": "Savage Echoes"
      },
      "hash": "ded7de09",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if that characteristic was the one selected",
            "ru": "если выбрана эта характеристика"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if that characteristic was the one selected",
            "ru": "если выбрана эта характеристика"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "turn"
    },
    {
      "sid": "6491816c-ce51-4be9-98c8-87349939b151",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Rage-cursed Onslaught",
      "ref": {
        "kind": "stratagem",
        "det": "rage-cursed-onslaught",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4ac4d016-f523-4d6c-822b-8e258841b256",
      "kind": "stratagem",
      "name": "Insensate Rampage",
      "det": "Rage-cursed Onslaught",
      "ref": {
        "kind": "stratagem",
        "det": "rage-cursed-onslaught",
        "name": "Insensate Rampage"
      },
      "hash": "2dcc4ebb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "a41a6832-7298-48b5-9b52-59bf2b316cbf",
      "kind": "stratagem",
      "name": "Limb from Limb",
      "det": "Rage-cursed Onslaught",
      "ref": {
        "kind": "stratagem",
        "det": "rage-cursed-onslaught",
        "name": "Limb from Limb"
      },
      "hash": "48325b04",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if that characteristic was the one selected",
            "ru": "если выбрана эта характеристика"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "if that characteristic was the one selected",
            "ru": "если выбрана эта характеристика"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "e8bee420-42a8-4bce-bed1-8211c139eb57",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "The Angelic Host",
      "ref": {
        "kind": "stratagem",
        "det": "the-angelic-host",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "88d26402-f1f0-4c30-a590-c4e962ded68b",
      "kind": "stratagem",
      "name": "Martial Examplars",
      "det": "The Angelic Host",
      "ref": {
        "kind": "stratagem",
        "det": "the-angelic-host",
        "name": "Martial Examplars"
      },
      "hash": "27d0b17a",
      "ver": 925,
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
      "sid": "6075a7c6-7b0c-4766-990c-0150ee871400",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "The Lost Brethren",
      "ref": {
        "kind": "stratagem",
        "det": "the-lost-brethren",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "6d7ee226-7f8f-4418-8088-487743940269",
      "kind": "stratagem",
      "name": "Lost to Rage",
      "det": "The Lost Brethren",
      "ref": {
        "kind": "stratagem",
        "det": "the-lost-brethren",
        "name": "Lost to Rage"
      },
      "hash": "db677538",
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
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "HAZARDOUS",
          "when": {
            "en": "unless your unit is within 12\" of a friendly CHAPLAIN",
            "ru": "если отряд не в 12\" от дружественного CHAPLAIN"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "98e6a22b-537f-48df-a078-327ce3569a5a:sanguinary-guard",
      "kind": "wargear",
      "name": "Sanguinary Guard: Sanguinary Banner",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "sanguinary-guard",
        "item": "sanguinary banner"
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

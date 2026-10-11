// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "space-wolves",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "pack:canis-wolfborn:born-of-wolves",
      "kind": "ability",
      "name": "Canis Wolfborn: Born of Wolves",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "canis-wolfborn"
      },
      "hash": "0f6feb47",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "pack:cyberwolf:alpha-hunter",
      "kind": "ability",
      "name": "Cyberwolf: Alpha Hunter",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "cyberwolf"
      },
      "hash": "4d9db6ce",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 6\"",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "pack:cyberwolf:close-in-for-the-kill",
      "kind": "ability",
      "name": "Cyberwolf: Close In for the Kill",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "cyberwolf"
      },
      "hash": "f29066d1",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against an enemy unit that is Below Half-strength",
            "ru": "по вражескому отряду Below Half-strength"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against an enemy unit that is Below Half-strength",
            "ru": "по вражескому отряду Below Half-strength"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "f3066d58-dd3a-4020-9fde-40534ca0ed90:fenrisian-wolves",
      "kind": "ability",
      "name": "Fenrisian Wolves: Hunting Hounds",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "fenrisian-wolves"
      },
      "hash": "89e2fd70",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while within 6\" of a friendly SPACE WOLVES CHARACTER model (excluding WULFEN) and not battle-shocked",
            "ru": "пока в пределах 6\" от дружественной модели SPACE WOLVES CHARACTER (кроме WULFEN) и не battle-shocked"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "e4cf49f1-d410-4af6-aeae-60d1128ca309:grey-hunters",
      "kind": "ability",
      "name": "Grey Hunters: Cunning Hunters",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "grey-hunters"
      },
      "hash": "e57d6ad5",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "in the Fight phase, while this unit is within range of an objective",
            "ru": "в фазе боя, пока отряд в зоне объекта"
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
            "en": "in the Fight phase, while this unit is within range of an objective",
            "ru": "в фазе боя, пока отряд в зоне объекта"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "pack:harald-deathwolf:lord-of-the-wolfkin",
      "kind": "ability",
      "name": "Harald Deathwolf: Lord of the Wolfkin",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "harald-deathwolf"
      },
      "hash": "c22900c8",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "only": {
            "name": "Crushing teeth and claws"
          },
          "when": {
            "en": "in a turn this unit made a Charge move",
            "ru": "в ходу, когда отряд совершил Charge"
          },
          "cond": [
            "unit-charged"
          ],
          "target": "unit"
        }
      ]
    },
    {
      "sid": "pack:harald-deathwolf:mantle-of-the-troll-king",
      "kind": "ability",
      "name": "Harald Deathwolf: Mantle of the Troll King",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "harald-deathwolf"
      },
      "hash": "2ec75a42",
      "ver": 972,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "6b0f24dc-2a81-497a-bd6f-33b04d7b2284:iron-priest",
      "kind": "ability",
      "name": "Iron Priest: Iron Priest",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "iron-priest"
      },
      "hash": "06400d69",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Lone Operative",
          "when": {
            "en": "while within 3\" of a friendly SPACE WOLVES VEHICLE unit",
            "ru": "пока в пределах 3\" от дружественного отряда SPACE WOLVES VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "pack:krom-dragongaze:refuse-to-accept-defeat",
      "kind": "ability",
      "name": "Krom Dragongaze: Refuse to Accept Defeat",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "krom-dragongaze"
      },
      "hash": "f34e2507",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while that unit is below its Starting Strength",
            "ru": "пока отряд ниже Starting Strength"
          },
          "cond": [
            "never"
          ],
          "target": "unit"
        },
        {
          "on": "weapon",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while that unit is Below Half-strength",
            "ru": "пока отряд Below Half-strength"
          },
          "cond": [
            "never"
          ],
          "target": "unit"
        }
      ],
      "note": "Read as Aleya: Tenacious Spirit (adeptus-custodes), the same text."
    },
    {
      "sid": "8950d4a1-67cf-4d2f-a6cd-6620a52ad87c:njal-stormcaller",
      "kind": "ability",
      "name": "Njal Stormcaller: Murderous Hurricane (psychic level 1)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "njal-stormcaller",
        "set": "High Rune Priest (psyker level 3)",
        "pickLimit": 1
      },
      "hash": "a052d3a0",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "83a24ab7-93c2-4a7b-a9b4-8710e6d42c6d:njal-stormcaller",
      "kind": "ability",
      "name": "Njal Stormcaller: Storm Caller (psychic level 1)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "njal-stormcaller",
        "set": "High Rune Priest (psyker level 3)",
        "pickLimit": 1
      },
      "hash": "a1b35b85",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ffb8cef7-6272-4327-9ce4-f696268527a7:njal-stormcaller",
      "kind": "ability",
      "name": "Njal Stormcaller: Tempest's Wrath (psychic level 1)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "njal-stormcaller",
        "set": "High Rune Priest (psyker level 3)",
        "pickLimit": 1
      },
      "hash": "5e8fea65",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0ff439f1-908a-4cd0-950f-3d38730ef9e5:njal-stormcaller",
      "kind": "ability",
      "name": "Njal Stormcaller: Wind Walker",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "njal-stormcaller"
      },
      "hash": "a1e19eb2",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null
        },
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in a phase this unit Advanced, with the advance roll changed to a 6",
            "ru": "в фазе, когда отряд совершил Advance, с advance roll, заменённым на 6"
          },
          "cond": [
            "unit-advanced"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null,
          "target": "led"
        },
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in a phase this unit Advanced, with the advance roll changed to a 6",
            "ru": "в фазе, когда отряд совершил Advance, с advance roll, заменённым на 6"
          },
          "cond": [
            "unit-advanced"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "1e5af9ae-dd29-4f49-9fc4-0acad16fa4fd:ragnar-blackmane",
      "kind": "ability",
      "name": "Ragnar Blackmane: Battle-lust",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ragnar-blackmane"
      },
      "hash": "8bfa6ee9",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "1ef9fe5a-fd89-44a4-ba15-b89d5bca73f6:ragnar-blackmane",
      "kind": "ability",
      "name": "Ragnar Blackmane: War Howl",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ragnar-blackmane"
      },
      "hash": "d456c10a",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this model is attached to a BLOOD CLAWS unit",
            "ru": "пока модель присоединена к отряду BLOOD CLAWS"
          },
          "cond": [
            "never"
          ],
          "target": "unit"
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this model is attached to a BLOOD CLAWS unit",
            "ru": "пока модель присоединена к отряду BLOOD CLAWS"
          },
          "cond": [
            "never"
          ],
          "target": "unit"
        }
      ]
    },
    {
      "sid": "pack:skyclaws:headstrong",
      "kind": "ability",
      "name": "Skyclaws: Headstrong",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "skyclaws"
      },
      "hash": "7280af0a",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "in a turn this unit made a Charge move",
            "ru": "в ходу, когда отряд совершил Charge"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "pack:stormfang-gunship:frozen-prey",
      "kind": "ability",
      "name": "Stormfang Gunship: Frozen Prey",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "stormfang-gunship"
      },
      "hash": "727a781b",
      "ver": 972,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "5210eeb0-688a-4877-92ba-7c821b6e79e3:thunderwolf-cavalry",
      "kind": "ability",
      "name": "Thunderwolf Cavalry: Thunderous Charge",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "thunderwolf-cavalry"
      },
      "hash": "81439197",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
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
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "pack:wolf-guard-battle-leader-in-terminator-armour:huskarl-to-the-jarl",
      "kind": "ability",
      "name": "Wolf Guard Battle Leader in Terminator Armour: Huskarl to the Jarl",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wolf-guard-battle-leader-in-terminator-armour"
      },
      "hash": "ab962b17",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+",
          "when": {
            "en": "while attached to a unit that contains another CHARACTER model",
            "ru": "пока присоединён к отряду, где есть другая модель CHARACTER"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "pack:wolf-guard-battle-leader-in-terminator-armour:tactical-precision",
      "kind": "ability",
      "name": "Wolf Guard Battle Leader in Terminator Armour: Tactical Precision",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wolf-guard-battle-leader-in-terminator-armour"
      },
      "hash": "b443bf84",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "pack:wolf-guard-battle-leader-on-thunderwolf:tactical-precision",
      "kind": "ability",
      "name": "Wolf Guard Battle Leader on Thunderwolf: Tactical Precision",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wolf-guard-battle-leader-on-thunderwolf"
      },
      "hash": "b443bf84",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "034419af-dce0-48aa-925c-551cc62870bf:wolf-guard-battle-leader",
      "kind": "ability",
      "name": "Wolf Guard Battle Leader: Tempered Ferocity",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wolf-guard-battle-leader"
      },
      "hash": "5a25e1e4",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "6a05ab90-3ac5-46fb-b44b-e7e06fc0fdb2:wolf-guard-headtakers",
      "kind": "ability",
      "name": "Wolf Guard Headtakers: Headhunters",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wolf-guard-headtakers"
      },
      "hash": "03fe638d",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "against this unit's quarry",
            "ru": "против выбранной добычи (quarry)"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "against this unit's quarry",
            "ru": "против выбранной добычи (quarry)"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "dc7e4ecc-4ffd-4d49-9db7-ee10d23f6660:wolf-guard-headtakers",
      "kind": "ability",
      "name": "Wolf Guard Headtakers: Hunting Hounds",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wolf-guard-headtakers"
      },
      "hash": "133a3c07",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Hunting Wolf models only, while within 6\" of a friendly SPACE WOLVES CHARACTER model (excluding WULFEN) and not battle-shocked",
            "ru": "только модели Hunting Wolf, пока в пределах 6\" от дружественной модели SPACE WOLVES CHARACTER (кроме WULFEN) и не battle-shocked"
          },
          "cond": [
            "blocked-subset",
            "never"
          ]
        }
      ]
    },
    {
      "sid": "pack:wolf-guard:chosen-companions",
      "kind": "ability",
      "name": "Wolf Guard: Chosen Companions",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wolf-guard"
      },
      "hash": "7772ab86",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while a CHARACTER is leading this unit",
            "ru": "пока отряд ведёт CHARACTER"
          },
          "cond": [
            "unit-led"
          ]
        }
      ]
    },
    {
      "sid": "pack:wolf-lord-on-thunderwolf:speed-of-the-hunter",
      "kind": "ability",
      "name": "Wolf Lord on Thunderwolf: Speed of the Hunter",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wolf-lord-on-thunderwolf"
      },
      "hash": "82199bc3",
      "ver": 972,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c2399b89-2877-4b9b-9ad2-0b22a3dc9a63:wolf-priest",
      "kind": "ability",
      "name": "Wolf Priest: Litany of Hate",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wolf-priest"
      },
      "hash": "596d0ee2",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "da0e3ebc-2c88-4af7-854c-bb5fc80369ef:wolf-scouts",
      "kind": "ability",
      "name": "Wolf Scouts: Hunting Hounds",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wolf-scouts"
      },
      "hash": "133a3c07",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Hunting Wolf models only, while within 6\" of a friendly SPACE WOLVES CHARACTER model (excluding WULFEN) and not battle-shocked",
            "ru": "только модели Hunting Wolf, пока в пределах 6\" от дружественной модели SPACE WOLVES CHARACTER (кроме WULFEN) и не battle-shocked"
          },
          "cond": [
            "blocked-subset",
            "never"
          ]
        }
      ]
    },
    {
      "sid": "58308049-cb35-4159-80d1-1cf89d6c9982:wulfen-dreadnought",
      "kind": "ability",
      "name": "Wulfen Dreadnought: Violent Fury",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wulfen-dreadnought"
      },
      "hash": "fe5cf788",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "TWIN-LINKED",
          "when": {
            "en": "if this model is equipped with two melee weapons",
            "ru": "если модель оснащена двумя оружиями ближнего боя"
          },
          "cond": [
            "wargear-two-melee"
          ]
        }
      ]
    },
    {
      "sid": "de2e0296-b1c3-40f0-8dc4-81afd0e9a5c9",
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
      "sid": "1710499e-3656-4246-9978-65bf43c4c140",
      "kind": "armyRule",
      "name": "Curse of the Wulfen",
      "det": null,
      "hash": "f9ef08c4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Infantry models, while within 6\" of a Space Wolves Character (or 12\" of a Wolf Priest) and not Battle-shocked",
            "ru": "модели Infantry, пока отряд в 6\" от персонажа Space Wolves (или 12\" от Wolf Priest) и не Battle-shocked"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 3,
          "when": {
            "en": "Vehicle models, under the same condition",
            "ru": "модели Vehicle, при том же условии"
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
      "sid": "1390506b-d445-4234-91ff-7878a2dc9573",
      "kind": "detachmentRule",
      "name": "Legendary Slayers",
      "det": "Saga of the Beastslayer",
      "ref": {
        "kind": "detachmentRule",
        "det": "saga-of-the-beastslayer"
      },
      "hash": "66c3c476",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: CHARACTER/MONSTER/VEHICLE",
          "when": null
        }
      ]
    },
    {
      "sid": "cc1fe2f2-96cb-458b-b97b-12b9f0e2bc35",
      "kind": "detachmentRule",
      "name": "Master of Wolves",
      "det": "Saga of the Great Wolf",
      "ref": {
        "kind": "detachmentRule",
        "det": "saga-of-the-great-wolf"
      },
      "hash": "a29b954b",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "Ferocious Strike: while the Tactical Doctrine is active for this unit, against targets within 9\"",
            "ru": "Ferocious Strike: пока для отряда активна Tactical Doctrine, по целям в пределах 9\""
          },
          "cond": [
            "doctrine-tactical",
            "never"
          ]
        }
      ]
    },
    {
      "sid": "908a1c13-a1bb-44de-9af2-1f55652d6c0a",
      "kind": "enhancement",
      "name": "Lone Hunter",
      "det": "Askar’s Wolfpack",
      "ref": null,
      "hash": "b8605c04",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "af0f6c25-cc30-4454-bf03-6ef1a30c0659",
      "kind": "enhancement",
      "name": "Skjald's Foretelling",
      "det": "Saga of the Great Wolf",
      "ref": {
        "kind": "enhancement",
        "det": "saga-of-the-great-wolf"
      },
      "hash": "1bda95f9",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "b610b879-25f7-4480-b150-eaf3476550b9",
      "kind": "stratagem",
      "name": "Bestial Dominance",
      "det": "Askar’s Wolfpack",
      "ref": null,
      "hash": "a0d889e1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "battle"
    },
    {
      "sid": "ec043755-b8ac-49ac-99e5-364e7f3de998",
      "kind": "stratagem",
      "name": "Bring It Down",
      "det": "Askar’s Wolfpack",
      "ref": null,
      "hash": "8213bb72",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-MONSTER 4+",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-VEHICLE 4+",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "c5dc5810-b281-4544-b445-40bb13249e28",
      "kind": "stratagem",
      "name": "Unbridled Feroicity",
      "det": "Saga of the Beastslayer",
      "ref": {
        "kind": "stratagem",
        "det": "saga-of-the-beastslayer",
        "name": "Unbridled Feroicity"
      },
      "hash": "127e1a54",
      "ver": 963,
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
      "sid": "f0bfde93-d8a5-4170-936a-c8208bc2ef43",
      "kind": "stratagem",
      "name": "Fangs of the Pack",
      "det": "Saga of the Great Wolf",
      "ref": {
        "kind": "stratagem",
        "det": "saga-of-the-great-wolf",
        "name": "Fangs of the Pack"
      },
      "hash": "bf79a709",
      "ver": 963,
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
      "sid": "4eb79734-dc04-45a6-8ed5-b8632a7a8a85",
      "kind": "stratagem",
      "name": "Wolf Totems",
      "det": "Saga of the Great Wolf",
      "ref": {
        "kind": "stratagem",
        "det": "saga-of-the-great-wolf",
        "name": "Wolf Totems"
      },
      "hash": "5967579f",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+ (vs mortal wounds)",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "pack:wolf-guard-battle-leader-in-terminator-armour:relic-shield",
      "kind": "wargear",
      "name": "Wolf Guard Battle Leader in Terminator Armour: Relic Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "wolf-guard-battle-leader-in-terminator-armour",
        "item": "relic shield"
      },
      "hash": "6026918c",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "set",
          "value": "6",
          "when": {
            "en": "the bearer only",
            "ru": "только носитель"
          },
          "cond": [
            "wargear-bearer"
          ]
        }
      ]
    },
    {
      "sid": "pack:wolf-guard-battle-leader-on-thunderwolf:storm-shield",
      "kind": "wargear",
      "name": "Wolf Guard Battle Leader on Thunderwolf: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "wolf-guard-battle-leader-on-thunderwolf",
        "item": "storm shield"
      },
      "hash": "5e0ca50d",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "the bearer only",
            "ru": "только носитель"
          },
          "cond": [
            "wargear-bearer"
          ]
        }
      ]
    },
    {
      "sid": "33ffd159-0227-4b14-a504-7452ad364393:wolf-guard-battle-leader",
      "kind": "wargear",
      "name": "Wolf Guard Battle Leader: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "wolf-guard-battle-leader",
        "item": "storm shield"
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
      "sid": "pack:wolf-guard-pack-leader-in-terminator-armour:storm-shield",
      "kind": "wargear",
      "name": "Wolf Guard Pack Leader in Terminator Armour: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "wolf-guard-pack-leader-in-terminator-armour",
        "item": "storm shield"
      },
      "hash": "38451d6c",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "set",
          "value": "4",
          "when": {
            "en": "the bearer only",
            "ru": "только носитель"
          },
          "cond": [
            "wargear-bearer"
          ]
        }
      ],
      "note": "Read as Bullgryn Squad: Slabshield (astra-militarum), the same text."
    },
    {
      "sid": "pack:wolf-guard-pack-leader-with-jump-pack:storm-shield",
      "kind": "wargear",
      "name": "Wolf Guard Pack Leader with Jump Pack: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "wolf-guard-pack-leader-with-jump-pack",
        "item": "storm shield"
      },
      "hash": "5e0ca50d",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "the bearer only",
            "ru": "только носитель"
          },
          "cond": [
            "wargear-bearer"
          ]
        }
      ]
    },
    {
      "sid": "pack:wolf-guard-pack-leader:storm-shield",
      "kind": "wargear",
      "name": "Wolf Guard Pack Leader: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "wolf-guard-pack-leader",
        "item": "storm shield"
      },
      "hash": "5e0ca50d",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "the bearer only",
            "ru": "только носитель"
          },
          "cond": [
            "wargear-bearer"
          ]
        }
      ]
    },
    {
      "sid": "33ffd159-0227-4b14-a504-7452ad364393:wolf-guard-terminators",
      "kind": "wargear",
      "name": "Wolf Guard Terminators: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "wolf-guard-terminators",
        "item": "storm shield"
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
          "when": {
            "en": "the bearer only",
            "ru": "только носитель"
          },
          "cond": [
            "wargear-bearer"
          ]
        }
      ]
    },
    {
      "sid": "pack:wolf-guard:storm-shield",
      "kind": "wargear",
      "name": "Wolf Guard: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "wolf-guard",
        "item": "storm shield"
      },
      "hash": "5e0ca50d",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "the bearer only",
            "ru": "только носитель"
          },
          "cond": [
            "wargear-bearer"
          ]
        }
      ]
    },
    {
      "sid": "pack:wolf-lord-on-thunderwolf:relic-shield",
      "kind": "wargear",
      "name": "Wolf Lord on Thunderwolf: Relic Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "wolf-lord-on-thunderwolf",
        "item": "relic shield"
      },
      "hash": "d4febadd",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "set",
          "value": "7",
          "when": null
        }
      ],
      "note": "Read as Ogryn Bodyguard: Slabshield (astra-militarum), the same text."
    }
  ]
}

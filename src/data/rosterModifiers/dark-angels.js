// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "dark-angels",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "28d5df5f-fe89-4267-8999-6bd1c329a15d:azrael",
      "kind": "ability",
      "name": "Azrael: Supreme Grand Master",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "azrael"
      },
      "hash": "38355f6d",
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
      "sid": "267b9be3-1636-41a5-a872-4156f88a93c1:azrael",
      "kind": "ability",
      "name": "Azrael: Watcher in the Dark (Once per battle, per unit)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "azrael"
      },
      "hash": "3d30bc64",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs mortal wounds)",
          "when": {
            "en": "once per battle, after this unit summons a Watcher in the Dark when it suffers a mortal wound",
            "ru": "раз за битву, после того как отряд призвал Watcher in the Dark, получив mortal wound"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs mortal wounds)",
          "when": {
            "en": "once per battle, after this unit summons a Watcher in the Dark when it suffers a mortal wound",
            "ru": "раз за битву, после того как отряд призвал Watcher in the Dark, получив mortal wound"
          },
          "cond": [
            "never"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "993f1855-67a5-4e6c-ac8a-754b84b99c63:ezekiel",
      "kind": "ability",
      "name": "Ezekiel: Book of Salvation",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ezekiel"
      },
      "hash": "d8dd3f8b",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "9191e3cb-145e-4038-ba2e-0d51f8da4b1f:ezekiel",
      "kind": "ability",
      "name": "Ezekiel: Engulfing Fear (psychic level 1)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ezekiel",
        "set": "Chief Librarian (psyker level 3)",
        "pickLimit": 1
      },
      "hash": "85609fb6",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "adb6c29d-7baf-4491-9d21-45b9508b7a93:ezekiel",
      "kind": "ability",
      "name": "Ezekiel: Psychic Hood",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ezekiel"
      },
      "hash": "f4b48831",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks and mortal wounds)",
          "when": null
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks and mortal wounds)",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "1666673a-d14c-4e7a-8c88-e0a7f6decb24:ezekiel",
      "kind": "ability",
      "name": "Ezekiel: Whispers of the Shadow Forest (psychic level 1)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ezekiel",
        "set": "Chief Librarian (psyker level 3)",
        "pickLimit": 1
      },
      "hash": "a866e3ed",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "e6df992c-abd5-41e0-8351-7ffbd0f86a80:inner-circle-companions",
      "kind": "ability",
      "name": "Inner Circle Companions: Braziers of Judgement",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "inner-circle-companions"
      },
      "hash": "7c5bdb7f",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": null
        }
      ]
    },
    {
      "sid": "a7a5c8e2-f0d6-4a7d-86d7-ff9050a28f7f:lazarus",
      "kind": "ability",
      "name": "Lazarus: The Spiritshield Helm",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lazarus"
      },
      "hash": "2a8ede30",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 3+ (vs Psychic Attacks and mortal wounds)",
          "when": null
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 3+ (vs Psychic Attacks and mortal wounds)",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "0eef8fdb-e66a-41bc-b5ba-d16b3b8312ec:lion-eljonson",
      "kind": "ability",
      "name": "Lion El'Jonson: Dark Angels Bodyguard",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lion-eljonson"
      },
      "hash": "24f8dc94",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Lone Operative",
          "when": {
            "en": "while within 3\" of a friendly DARK ANGELS INFANTRY unit",
            "ru": "пока в пределах 3\" от дружественного отряда DARK ANGELS INFANTRY"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "532eaa3f-0c27-4625-a4e1-3ac7f62aa02e:lion-eljonson",
      "kind": "ability",
      "name": "Lion El'Jonson: Martial Exemplar",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lion-eljonson",
        "scopes": [
          {
            "targets": [
              "DARK ANGELS"
            ],
            "excludes": []
          }
        ],
        "set": "Primarch of the First Legion",
        "pickLimit": 2
      },
      "hash": "fc83be98",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ae57ec5e-25c7-45e5-a82f-42a1a8bfa2ff:lion-eljonson",
      "kind": "ability",
      "name": "Lion El'Jonson: Mist-wreathed Shadow Realms",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lion-eljonson",
        "set": "Primarch of the First Legion",
        "pickLimit": 2
      },
      "hash": "fe3a9e7e",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "04bdc1b5-5436-4c81-9501-3e940b945eed:lion-eljonson",
      "kind": "ability",
      "name": "Lion El'Jonson: No Hiding from the Watchers",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lion-eljonson",
        "scopes": [
          {
            "targets": [
              "DARK ANGELS"
            ],
            "excludes": []
          }
        ],
        "set": "Primarch of the First Legion",
        "pickLimit": 2
      },
      "hash": "fe63c365",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+ (vs Psychic Attacks and mortal wounds)",
          "when": {
            "en": "while this ability is the one selected",
            "ru": "пока выбрана эта способность"
          },
          "target": "aura"
        }
      ]
    },
    {
      "sid": "7a5578e7-bd91-45d4-b94e-8cb69b09ebef:lion-eljonson",
      "kind": "ability",
      "name": "Lion El'Jonson: The Watchers",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lion-eljonson"
      },
      "hash": "f4b48831",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks and mortal wounds)",
          "when": null
        }
      ]
    },
    {
      "sid": "4c63e8cc-3ae0-483f-bb91-b903d35e692d:master-zacharial",
      "kind": "ability",
      "name": "Master Zacharial: Gravis Protection",
      "det": null,
      "ref": null,
      "hash": "9bdc06bf",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "e0d5e9d3-8a2c-4563-afd8-87ad85431a73:ravenwing-black-knights",
      "kind": "ability",
      "name": "Ravenwing Black Knights: Knights of Caliban",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ravenwing-black-knights"
      },
      "hash": "55a8befd",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-MONSTER/VEHICLE 4+",
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
      "sid": "3b80ebc9-b186-4716-87c2-40964330bb67:ravenwing-command-squad",
      "kind": "ability",
      "name": "Ravenwing Command Squad: Astartes Banner",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ravenwing-command-squad"
      },
      "hash": "17ae5fc1",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit contains a RAVENWING ANCIENT",
            "ru": "пока в отряде есть RAVENWING ANCIENT"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit contains a RAVENWING ANCIENT",
            "ru": "пока в отряде есть RAVENWING ANCIENT"
          },
          "cond": [
            "never"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "5f2dc925-aaff-4ef6-86ca-2407c7e62c5b:ravenwing-darkshroud",
      "kind": "ability",
      "name": "Ravenwing Darkshroud: Icon of Old Caliban",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ravenwing-darkshroud",
        "scopes": [
          {
            "targets": [
              "DARK ANGELS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "f9d4d004",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": null,
          "target": "aura"
        }
      ]
    },
    {
      "sid": "95dbd786-5940-4348-85b1-074ba54c817f",
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
      "sid": "2d71b3c6-84d1-49a1-a179-24b40816bb39",
      "kind": "armyRule",
      "name": "The Deathwing",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "5111516f",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "the DEATHWING keyword it grants is already carried by src/data/conditionalKeywords.json (gen-conditional-keywords.mjs reads the same grant structurally); recording it here would show it twice"
    },
    {
      "sid": "0339c85c-6792-4c1d-a69f-93d1b915cd7e",
      "kind": "armyRule",
      "name": "The Ravenwing",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "5465d0bf",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "9f7ad3ea-f3fd-48bc-b27c-3b1fdcdb618e",
      "kind": "detachmentRule",
      "name": "Black-winged Vigilance",
      "det": "Darkflight Pursuit",
      "ref": {
        "kind": "detachmentRule",
        "det": "darkflight-pursuit"
      },
      "hash": "045587fe",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null
        }
      ]
    },
    {
      "sid": "5799077c-00bf-4a5d-aa88-b17cdf4c4b78",
      "kind": "enhancement",
      "name": "Champion of the Deathwing",
      "det": "Inner Circle Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "inner-circle-task-force"
      },
      "hash": "d24eb97a",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "against targets within range of your vowed objective",
            "ru": "по целям в зоне вашего vowed objective"
          },
          "cond": [
            "never"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "a6eb0354-f367-4b37-beb3-712e90d3339c",
      "kind": "enhancement",
      "name": "Ancient Weapons",
      "det": "Wrath of the Rock",
      "ref": {
        "kind": "enhancement",
        "det": "wrath-of-the-rock"
      },
      "hash": "6e95bd2d",
      "ver": 963,
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
      "sid": "7cca0096-a682-4173-9fe5-48243b81b023",
      "kind": "stratagem",
      "name": "Wings of Shadow",
      "det": "Darkflight Pursuit",
      "ref": {
        "kind": "stratagem",
        "det": "darkflight-pursuit",
        "name": "Wings of Shadow"
      },
      "hash": "38b9e784",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "1ead1a56-e4a7-4e0f-8a46-65b9e8f0452a",
      "kind": "stratagem",
      "name": "For the Lion",
      "det": "The Vengeful Brethren",
      "ref": null,
      "hash": "076afe4b",
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
      "dur": "turn"
    },
    {
      "sid": "31721131-d7b4-4266-9f41-879d32f1ea75",
      "kind": "stratagem",
      "name": "Inescapable Justice",
      "det": "Wrath of the Rock",
      "ref": {
        "kind": "stratagem",
        "det": "wrath-of-the-rock",
        "name": "Inescapable Justice"
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
      "sid": "26c6919b-599b-4a9e-a700-fe87f2ea8096",
      "kind": "stratagem",
      "name": "Lion's Will",
      "det": "Wrath of the Rock",
      "ref": {
        "kind": "stratagem",
        "det": "wrath-of-the-rock",
        "name": "Lion's Will"
      },
      "hash": "076afe4b",
      "ver": 963,
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
      "dur": "turn"
    },
    {
      "sid": "c5c18f25-d4ed-4039-bb19-47b62b66a37c",
      "kind": "stratagem",
      "name": "Relics of the Dark Age",
      "det": "Wrath of the Rock",
      "ref": {
        "kind": "stratagem",
        "det": "wrath-of-the-rock",
        "name": "Relics of the Dark Age"
      },
      "hash": "770a63f9",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "b2bf043f-39ca-4ae5-83e4-dd5dab3a3bb1:deathwing-knights",
      "kind": "wargear",
      "name": "Deathwing Knights: Watcher in the Dark",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "deathwing-knights",
        "item": "watcher in the dark"
      },
      "hash": "35b72d9f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs mortal wounds)",
          "when": {
            "en": "until the end of a phase this unit summoned a Watcher in the Dark in (once per battle)",
            "ru": "до конца фазы, в которой отряд призвал Watcher in the Dark (раз за битву)"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "b2bf043f-39ca-4ae5-83e4-dd5dab3a3bb1:deathwing-terminator-squad",
      "kind": "wargear",
      "name": "Deathwing Terminator Squad: Watcher in the Dark",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "deathwing-terminator-squad",
        "item": "watcher in the dark"
      },
      "hash": "35b72d9f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs mortal wounds)",
          "when": {
            "en": "until the end of a phase this unit summoned a Watcher in the Dark in (once per battle)",
            "ru": "до конца фазы, в которой отряд призвал Watcher in the Dark (раз за битву)"
          },
          "cond": [
            "never"
          ]
        }
      ]
    }
  ]
}

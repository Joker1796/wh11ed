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
          "once": {
            "per": "unit",
            "dur": "phase"
          }
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
          "target": "led",
          "once": {
            "per": "unit",
            "dur": "phase"
          }
        }
      ]
    },
    {
      "sid": "1d9fdc0e-2ce8-4c07-9ab9-aa909584d69e:belial",
      "kind": "ability",
      "name": "Belial: Grand Master of the Deathwing",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "belial"
      },
      "hash": "088c6e74",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a CHARACTER unit",
            "ru": "против отряда CHARACTER"
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
            "en": "against a CHARACTER unit",
            "ru": "против отряда CHARACTER"
          },
          "cond": [
            "never"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "pack:deathwing-command-squad:astartes-banner",
      "kind": "ability",
      "name": "Deathwing Command Squad: Astartes Banner",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "deathwing-command-squad"
      },
      "hash": "6fe70108",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit contains an Ancient",
            "ru": "пока в отряде есть Ancient"
          },
          "cond": [
            "contains-deathwing-ancient"
          ]
        }
      ]
    },
    {
      "sid": "pack:deathwing-command-squad:honour-or-death",
      "kind": "ability",
      "name": "Deathwing Command Squad: Honour or Death",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "deathwing-command-squad"
      },
      "hash": "294e9608",
      "ver": 972,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "99deacf8-1143-4a9f-9c42-c7e94e4d5a0e:deathwing-knights",
      "kind": "ability",
      "name": "Deathwing Knights: Inner Circle",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "deathwing-knights"
      },
      "hash": "25bc8854",
      "ver": 995,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "pack:deathwing-strikemaster:tactical-precision",
      "kind": "ability",
      "name": "Deathwing Strikemaster: Tactical Precision",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "deathwing-strikemaster"
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
      "sid": "pack:deathwing-strikemaster:vanquish-the-foe",
      "kind": "ability",
      "name": "Deathwing Strikemaster: Vanquish the Foe",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "deathwing-strikemaster"
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
      "effects": [
        {
          "on": "incoming",
          "stat": "hit",
          "op": "add",
          "value": -1,
          "when": {
            "en": "for the phase, after a psychic roll other than a 1",
            "ru": "до конца фазы после психического броска не на 1"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "incoming",
          "stat": "hit",
          "op": "add",
          "value": -1,
          "when": {
            "en": "for the phase, after a psychic roll other than a 1",
            "ru": "до конца фазы после психического броска не на 1"
          },
          "cond": [
            "never"
          ],
          "target": "led"
        }
      ]
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
        },
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
      "sid": "e3ecf2d7-0ef7-4238-8639-3963bec7c6ad:inner-circle-companions",
      "kind": "ability",
      "name": "Inner Circle Companions: Emnity for the Unworthy",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "inner-circle-companions"
      },
      "hash": "d9d7f41c",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a CHARACTER unit",
            "ru": "против отряда CHARACTER"
          },
          "cond": [
            "never"
          ]
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
            "excludes": [],
            "models": [],
            "modelExcludes": []
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
            "excludes": [],
            "models": [],
            "modelExcludes": []
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
      "sid": "19726b2e-a787-4c4e-9ffb-d9a2812dba48:lion-eljonson",
      "kind": "ability",
      "name": "Lion El'Jonson: The Emperor's Shield",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lion-eljonson"
      },
      "hash": "ebec7e58",
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
      "ref": {
        "kind": "ability",
        "unit": "master-zacharial"
      },
      "hash": "9bdc06bf",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "d",
          "op": "add",
          "value": -1,
          "when": null
        }
      ]
    },
    {
      "sid": "ce554c13-23b1-4a53-ac12-61d40e4e50fb:nephilim-jetfighter",
      "kind": "ability",
      "name": "Nephilim Jetfighter: Lightning-fast Manoeuvres",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "nephilim-jetfighter"
      },
      "hash": "916cf6ab",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "ranged",
          "when": null
        }
      ]
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
            "excludes": [],
            "models": [],
            "modelExcludes": []
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
      "sid": "pack:ravenwing-talonmaster:nowhere-to-hide",
      "kind": "ability",
      "name": "Ravenwing Talonmaster: Nowhere to Hide",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ravenwing-talonmaster",
        "scopes": [
          {
            "targets": [
              "ADEPTUS ASTARTES MOUNTED",
              "ADEPTUS ASTARTES FLY VEHICLE"
            ],
            "excludes": [],
            "models": [],
            "modelExcludes": []
          }
        ]
      },
      "hash": "a613551a",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null,
          "target": "aura"
        }
      ]
    },
    {
      "sid": "pack:ravenwing-talonmaster:talonmaster",
      "kind": "ability",
      "name": "Ravenwing Talonmaster: Talonmaster",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ravenwing-talonmaster"
      },
      "hash": "ad358e1b",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Lone Operative",
          "when": {
            "en": "while within 3\" of another friendly ADEPTUS ASTARTES MOUNTED or FLY VEHICLE unit",
            "ru": "пока в пределах 3\" от другого дружественного отряда ADEPTUS ASTARTES MOUNTED или FLY VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "ab7e2f84-2fb3-44f6-afdd-66c918248c10:sammael",
      "kind": "ability",
      "name": "Sammael: Grand Master of the Ravenwing",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sammael"
      },
      "hash": "4c612053",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Mobile",
          "when": null
        },
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Mobile",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "b8f5141f-daa9-4900-944e-2fe16af75b47:vengeful-brethren-bladeguard-veteran-squad",
      "kind": "ability",
      "name": "Vengeful Brethren Bladeguard Veteran Squad: Bladeguard (Once per turn per unit)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vengeful-brethren-bladeguard-veteran-squad"
      },
      "hash": "c278d1ae",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the option picked when this unit is selected to fight",
            "ru": "вариант, выбранный, когда отряд выбран для боя"
          },
          "cond": [
            "bladeguard-hit"
          ]
        },
        {
          "op": "state",
          "cond": [
            "bladeguard-defend"
          ],
          "when": {
            "en": "the option picked when an enemy unit targets this unit",
            "ru": "вариант, выбранный, когда враг выбирает отряд целью"
          }
        },
        {
          "on": "incoming",
          "stat": "hit",
          "op": "add",
          "value": -1,
          "when": {
            "en": "the option picked when an enemy unit targets this unit",
            "ru": "вариант, выбранный, когда враг выбирает отряд целью"
          },
          "cond": [
            "bladeguard-defend"
          ]
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
      "sid": "9ca9235c-9f25-471c-973a-1a87ec84bcf8",
      "kind": "detachmentRule",
      "name": "Vowed Target",
      "det": "Inner Circle Task Force",
      "ref": {
        "kind": "detachmentRule",
        "det": "inner-circle-task-force"
      },
      "hash": "3411f39a",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a unit within range of the vowed objective",
            "ru": "против отряда в зоне обетного объекта"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "8be3b67e-d634-44c6-98d0-d31cfee5d32c",
      "kind": "detachmentRule",
      "name": "Honoured Knights",
      "det": "The Vengeful Brethren",
      "ref": {
        "kind": "detachmentRule",
        "det": "cp:dark-angels"
      },
      "hash": "14514667",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "s-gt-t",
          "when": {
            "en": "while the unit is in defence stance",
            "ru": "пока отряд в defence stance"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "da94f3da-d6d2-4fea-a0e9-9411155f8659",
      "kind": "detachmentRule",
      "name": "Dutiful Tenacity",
      "det": "Wrath of the Rock",
      "ref": {
        "kind": "detachmentRule",
        "det": "wrath-of-the-rock"
      },
      "hash": "81078a6a",
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
      "sid": "dd22151f-003c-4223-b891-e5386fbe33d4",
      "kind": "enhancement",
      "name": "Supreme Combatant",
      "det": "The Vengeful Brethren",
      "ref": {
        "kind": "enhancement",
        "det": "cp:dark-angels"
      },
      "hash": "96e050f8",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "the one picked when the unit is selected to attack",
            "ru": "выбранная, когда отряд выбран для атаки"
          },
          "cond": [
            "combatant-lethal"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "the one picked when the unit is selected to attack",
            "ru": "выбранная, когда отряд выбран для атаки"
          },
          "cond": [
            "combatant-sustained"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "the one picked when the unit is selected to attack",
            "ru": "выбранная, когда отряд выбран для атаки"
          },
          "cond": [
            "combatant-lethal"
          ],
          "target": "led"
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "the one picked when the unit is selected to attack",
            "ru": "выбранная, когда отряд выбран для атаки"
          },
          "cond": [
            "combatant-sustained"
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
      "ref": {
        "kind": "stratagem",
        "det": "cp:dark-angels",
        "name": "For the Lion"
      },
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
      "sid": "5f1eba48-56b4-451d-aed3-9e8fb763f4f4",
      "kind": "stratagem",
      "name": "Mission Focus",
      "det": "The Vengeful Brethren",
      "ref": {
        "kind": "stratagem",
        "det": "cp:dark-angels",
        "name": "Mission Focus"
      },
      "hash": "fe8dfc7e",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "hit",
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
      "sid": "74601e3a-aa52-45aa-8243-7fb4159aa658",
      "kind": "stratagem",
      "name": "Knights of Iron",
      "det": "Wrath of the Rock",
      "ref": {
        "kind": "stratagem",
        "det": "wrath-of-the-rock",
        "name": "Knights of Iron"
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
      "sid": "929c0f7e-0053-4c56-aa6d-6b780ae7a816:azrael",
      "kind": "wargear",
      "name": "Azrael: The Lion Helm",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "azrael",
        "item": "the lion helm"
      },
      "hash": "de3abe4a",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "pack:deathwing-command-squad:storm-shield",
      "kind": "wargear",
      "name": "Deathwing Command Squad: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "deathwing-command-squad",
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
          "once": {
            "per": "unit",
            "dur": "phase"
          }
        }
      ]
    },
    {
      "sid": "pack:deathwing-strikemaster:storm-shield",
      "kind": "wargear",
      "name": "Deathwing Strikemaster: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "deathwing-strikemaster",
        "item": "storm shield"
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
          "once": {
            "per": "unit",
            "dur": "phase"
          }
        }
      ]
    }
  ]
}

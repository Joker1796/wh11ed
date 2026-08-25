// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "chaos-knights",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "3f9c1564-47ce-409b-a7f4-f481995c3eba:chaos-acastus-knight-asterius",
      "kind": "ability",
      "name": "Chaos Acastus Knight Asterius: Sunderer of Fortresses",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-acastus-knight-asterius"
      },
      "hash": "caeb868f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against VEHICLE targets",
            "ru": "против целей VEHICLE"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against VEHICLE targets",
            "ru": "против целей VEHICLE"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "against FORTIFICATION targets, instead",
            "ru": "против целей FORTIFICATION, вместо этого"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        },
        {
          "on": "weapon",
          "stat": "d",
          "op": "add",
          "value": 2,
          "when": {
            "en": "against FORTIFICATION targets, instead",
            "ru": "против целей FORTIFICATION, вместо этого"
          },
          "cond": [
            "never"
          ],
          "alt": 1
        }
      ]
    },
    {
      "sid": "9c2a6964-1173-4f07-b6fb-61b511a289ca:chaos-acastus-knight-porphyrion",
      "kind": "ability",
      "name": "Chaos Acastus Knight Porphyrion: Bastion of Firepower",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-acastus-knight-porphyrion"
      },
      "hash": "4668776e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "after Remaining Stationary",
            "ru": "после того как остался на месте"
          },
          "cond": [
            "unit-stationary"
          ]
        }
      ]
    },
    {
      "sid": "aeea8aeb-0ac6-45c7-9533-1b1ab816c4b3:chaos-cerastus-knight-atrapos",
      "kind": "ability",
      "name": "Chaos Cerastus Knight Atrapos: Macro-extinction Protocols",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-cerastus-knight-atrapos"
      },
      "hash": "3bd42904",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "86129fd1-2639-453b-a311-4342e7a63f3e:chaos-cerastus-knight-castigator",
      "kind": "ability",
      "name": "Chaos Cerastus Knight Castigator: Offerings for the Dark Gods",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-cerastus-knight-castigator",
        "scopes": [
          {
            "targets": [
              "WAR DOG"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "918261ea",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "8029af3f-904f-40d7-91d1-02a270ec8c6e:chaos-cerastus-knight-lancer",
      "kind": "ability",
      "name": "Chaos Cerastus Knight Lancer: Dark Fervour",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-cerastus-knight-lancer",
        "scopes": [
          {
            "targets": [
              "WAR DOG"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "598022d2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "02ebb3f0-e94d-440c-ba3f-f3cf219da220:chaos-questoris-knight-magaera",
      "kind": "ability",
      "name": "Chaos Questoris Knight Magaera: Huntmaster",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-questoris-knight-magaera",
        "scopes": [
          {
            "targets": [
              "WAR DOG"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "598022d2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "d730aed0-8e77-4c83-9b91-91693829eedd:chaos-questoris-knight-styrix",
      "kind": "ability",
      "name": "Chaos Questoris Knight Styrix: Grav-pinned",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-questoris-knight-styrix"
      },
      "hash": "1ffdb6a3",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7d101b1e-fd3c-4b06-9783-7b2591e6340a:chaos-questoris-knight-styrix",
      "kind": "ability",
      "name": "Chaos Questoris Knight Styrix: Preysight",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-questoris-knight-styrix",
        "scopes": [
          {
            "targets": [
              "WAR DOG"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "336924dc",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "a434e6c6-6d32-4e57-90f5-457be208fe29:knight-despoiler",
      "kind": "ability",
      "name": "Knight Despoiler: Dread Dominion",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-despoiler",
        "scopes": [
          {
            "targets": [
              "WAR DOG"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "d6113015",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "target": "aura",
          "when": null
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "480dd27b-5872-4821-b4a5-675f69dbdbc8:knight-rampager",
      "kind": "ability",
      "name": "Knight Rampager: Bloodlust",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-rampager"
      },
      "hash": "307b0b1c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
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
      "sid": "71fb0366-3208-47ae-9c81-24501b271639:knight-ruinator",
      "kind": "ability",
      "name": "Knight Ruinator: Close-range Killers",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-ruinator",
        "scopes": [
          {
            "targets": [
              "WAR DOG"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "c36fbaa4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "target": "aura",
          "when": {
            "en": "against the closest eligible target",
            "ru": "по ближайшей допустимой цели"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "786c6869-a00b-49f4-8775-9a10a99b3e73:war-dog-brigand",
      "kind": "ability",
      "name": "War Dog Brigand: Brigand",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "war-dog-brigand"
      },
      "hash": "3ef0d8cd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "against a unit within range of an objective marker",
            "ru": "по отряду в зоне objective marker"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "249bb130-c323-4270-b894-4e014761eac7:war-dog-executioner",
      "kind": "ability",
      "name": "War Dog Executioner: Executioner",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "war-dog-executioner"
      },
      "hash": "3895adc6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "5d62d846-d7a1-4e2a-9431-4f38967a434a:war-dog-stalker",
      "kind": "ability",
      "name": "War Dog Stalker: Stalker",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "war-dog-stalker"
      },
      "hash": "434dab6f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f7e05863-87be-4f5a-bc7c-f053cf453bd2",
      "kind": "allegiance",
      "name": "Houndpack Lance Keyword: Character",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "houndpack-lance-keyword",
        "opt": "Character"
      },
      "hash": "6ae178f7",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "the keyword this grants is applied by the roster layer itself (rosterEngine's allegKeyword feeds DatasheetCard's grantedKeywords), so recording it here too would show it twice; no printed number changes"
    },
    {
      "sid": "af512856-dc8f-428b-8562-bb30b6f1d257",
      "kind": "armyRule",
      "name": "Dreadblades",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "7a1f15d7",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — which allied models may be included"
    },
    {
      "sid": "a035ead2-fd10-4271-a295-0b1823f4792f",
      "kind": "armyRule",
      "name": "Harbingers of Dread",
      "det": null,
      "hash": "bd88e7f1",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "788a4578-aaf9-4801-a35e-8e4d224c0a90",
      "kind": "detachmentRule",
      "name": "Masters of the Pack",
      "det": "Helhunt Lance",
      "ref": {
        "kind": "detachmentRule",
        "det": "helhunt-lance"
      },
      "hash": "425432db",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "extends an Aura's own targeting; nothing on the statline"
    },
    {
      "sid": "73e45769-afa4-4e4a-a0e9-7fa425bb77f9",
      "kind": "detachmentRule",
      "name": "Marked Prey",
      "det": "Houndpack Lance",
      "ref": {
        "kind": "detachmentRule",
        "det": "houndpack-lance"
      },
      "hash": "9b6bed40",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "against the marked enemy unit",
            "ru": "по отмеченному вражескому отряду"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "ea8bac27-a7f4-40a5-8e9c-ee20b6cc609c",
      "kind": "detachmentRule",
      "name": "Malefic Surge",
      "det": "Infernal Lance",
      "hash": "be04cec4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 3,
          "when": {
            "en": "for the phase, via the Unholy Hunger Malefic Surge ability",
            "ru": "на фазу, через способность Malefic Surge «Unholy Hunger»"
          },
          "cond": [
            "surge-unholy-hunger"
          ]
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "for the phase, via the Unnatural Fortitude Malefic Surge ability",
            "ru": "на фазу, через способность Malefic Surge «Unnatural Fortitude»"
          },
          "cond": [
            "surge-unnatural-fortitude"
          ]
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 6+",
          "when": {
            "en": "for the phase, via the Unnatural Fortitude Malefic Surge ability",
            "ru": "на фазу, через способность Malefic Surge «Unnatural Fortitude»"
          },
          "cond": [
            "surge-unnatural-fortitude"
          ],
          "alt": 1
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "for the phase, via the Diabolic Power Malefic Surge ability",
            "ru": "на фазу, через способность Malefic Surge «Diabolic Power»"
          },
          "cond": [
            "surge-diabolic-power"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "for the phase, via the Diabolic Power Malefic Surge ability",
            "ru": "на фазу, через способность Malefic Surge «Diabolic Power»"
          },
          "cond": [
            "surge-diabolic-power"
          ],
          "alt": 3
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "infernal-lance"
      }
    },
    {
      "sid": "757eaeb4-cb7c-4967-8cf2-3a42aece8d2e",
      "kind": "detachmentRule",
      "name": "Tyrannical Court",
      "det": "Lords of Dread",
      "hash": "0202e0c6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 2,
          "when": null
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "lords-of-dread"
      }
    },
    {
      "sid": "edf77a51-682c-47f0-8182-4dd874f96f3d",
      "kind": "enhancement",
      "name": "Loping Predator",
      "det": "Houndpack Lance",
      "ref": {
        "kind": "enhancement",
        "det": "houndpack-lance"
      },
      "hash": "15471be4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null
        }
      ]
    },
    {
      "sid": "917b0195-7e5e-4a65-919b-821fd441782f",
      "kind": "enhancement",
      "name": "Panoply of the Cursed Knights",
      "det": "Houndpack Lance",
      "hash": "1a35e87a",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "houndpack-lance"
      }
    },
    {
      "sid": "d9e7e955-a716-415b-8a50-04ff6e82c8cb",
      "kind": "enhancement",
      "name": "Snarling Rivalry (Upgrade)",
      "det": "Hunting Warpack",
      "ref": {
        "kind": "enhancement",
        "det": "hunting-warpack"
      },
      "hash": "a7635131",
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
      "sid": "1fd8ab9e-795a-440f-a6e0-c312215e75a1",
      "kind": "enhancement",
      "name": "Cruel Lashmaster (Aura)",
      "det": "Iconoclast Fiefdom",
      "ref": {
        "kind": "enhancement",
        "det": "iconoclast-fiefdom",
        "scopes": [
          {
            "targets": [
              "DAMNED"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "b86224c8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while within 6\" of the bearer, when selected to make a normal, advance or fall-back move",
            "ru": "пока в пределах 6\" от носителя, при выборе для normal/advance/fall-back-перемещения"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "c497c2f9-7d5f-40d9-ab4a-94ea722296b0",
      "kind": "enhancement",
      "name": "Bestial Aspect",
      "det": "Infernal Lance",
      "ref": {
        "kind": "enhancement",
        "det": "infernal-lance"
      },
      "hash": "02fe334d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null
        }
      ]
    },
    {
      "sid": "cff79aee-3352-436d-adfa-6e11703ffdfd",
      "kind": "enhancement",
      "name": "Blasphemous Engine",
      "det": "Infernal Lance",
      "hash": "5664e037",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 2,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "infernal-lance"
      }
    },
    {
      "sid": "b2f712f0-d376-473f-bf23-f2dc789347ae",
      "kind": "enhancement",
      "name": "Fleshmetal Fusion",
      "det": "Infernal Lance",
      "hash": "3e1769b0",
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
      ],
      "ref": {
        "kind": "enhancement",
        "det": "infernal-lance"
      }
    },
    {
      "sid": "93205b5a-0d2e-44ba-bec0-0aa2e0638143",
      "kind": "enhancement",
      "name": "Knight Diabolus",
      "det": "Infernal Lance",
      "hash": "a86a05f3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": {
            "en": "while the bearer is using the Diabolic Power ability",
            "ru": "пока носитель использует способность Diabolic Power"
          },
          "cond": [
            "surge-diabolic-power"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "infernal-lance"
      }
    },
    {
      "sid": "3d51794a-1ab6-4fe9-8c9f-8c0b1088456d",
      "kind": "enhancement",
      "name": "Blade of Celerity",
      "det": "Lords of Dread",
      "ref": {
        "kind": "enhancement",
        "det": "lords-of-dread"
      },
      "hash": "44f92426",
      "ver": 925,
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
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Fights First",
          "when": {
            "en": "for the phase, when the bearer uses this Enhancement",
            "ru": "на фазу, когда носитель применил улучшение"
          },
          "cond": [
            "never"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "e17d089a-c6be-42b1-b8e3-58c1b044c352",
      "kind": "enhancement",
      "name": "Blessing of the Dark Master",
      "det": "Lords of Dread",
      "ref": {
        "kind": "enhancement",
        "det": "lords-of-dread"
      },
      "hash": "44e62976",
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
      ]
    },
    {
      "sid": "6d9fb6cc-05ac-4f9d-a8ac-52ca06c2dffa",
      "kind": "enhancement",
      "name": "Putrid Carapace",
      "det": "Lords of Dread",
      "ref": {
        "kind": "enhancement",
        "det": "lords-of-dread"
      },
      "hash": "c28dd285",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "sv",
          "op": "set",
          "value": "2+",
          "when": null
        }
      ]
    },
    {
      "sid": "7f71e5b1-cae6-4207-bb8e-12b57b3e4fa5",
      "kind": "enhancement",
      "name": "Warp-borne Stalker",
      "det": "Lords of Dread",
      "ref": {
        "kind": "enhancement",
        "det": "lords-of-dread"
      },
      "hash": "84f45f4c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "when": null
        }
      ]
    },
    {
      "sid": "23f176f3-52df-4f8d-ae85-85d2774a4677",
      "kind": "enhancement",
      "name": "Veil of Medrengard",
      "det": "Traitoris Lance",
      "hash": "3e497de7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "against ranged attacks; 5+ against melee attacks",
            "ru": "против стрелковых атак; 5+ против атак ближнего боя"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "traitoris-lance"
      }
    },
    {
      "sid": "5b7ebc65-f243-4eb0-9af1-17c2f28e7937",
      "kind": "stratagem",
      "name": "Rune-cursed Stronghold",
      "det": "Bastions of Tyranny",
      "ref": {
        "kind": "stratagem",
        "det": "bastions-of-tyranny",
        "name": "Rune-cursed Stronghold"
      },
      "hash": "5967579f",
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
      "sid": "58d86379-2099-42af-a1ba-671bb6495d36",
      "kind": "stratagem",
      "name": "Beasthide Manifestation",
      "det": "Helhunt Lance",
      "ref": {
        "kind": "stratagem",
        "det": "helhunt-lance",
        "name": "Beasthide Manifestation"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c8c71438-0798-4694-b2a5-965560e8c887",
      "kind": "stratagem",
      "name": "Feral Arrogance",
      "det": "Helhunt Lance",
      "ref": {
        "kind": "stratagem",
        "det": "helhunt-lance",
        "name": "Feral Arrogance"
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
      "sid": "23d446a4-7816-4277-8a34-fedc179a16a5",
      "kind": "stratagem",
      "name": "Merciless Fusillade",
      "det": "Helhunt Lance",
      "ref": {
        "kind": "stratagem",
        "det": "helhunt-lance",
        "name": "Merciless Fusillade"
      },
      "hash": "65313999",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "286f27c5-6f8f-4065-b4e0-6c9e4b17144a",
      "kind": "stratagem",
      "name": "Insensate Bloodthirst",
      "det": "Hunting Warpack",
      "ref": {
        "kind": "stratagem",
        "det": "hunting-warpack",
        "name": "Insensate Bloodthirst"
      },
      "hash": "efc5db5c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+",
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "39493fcc-0ea8-44a4-92e8-0758641e3074",
      "kind": "stratagem",
      "name": "Avenge the Masters!",
      "det": "Iconoclast Fiefdom",
      "ref": {
        "kind": "stratagem",
        "det": "iconoclast-fiefdom",
        "name": "Avenge the Masters!"
      },
      "hash": "c400fe1e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "71e5b868-02ba-4f1b-a154-3344075c17f1",
      "kind": "stratagem",
      "name": "Diabolic Bulwark",
      "det": "Infernal Lance",
      "ref": {
        "kind": "stratagem",
        "det": "infernal-lance",
        "name": "Diabolic Bulwark"
      },
      "hash": "987d6ae0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "9dfac69d-e8a2-4d38-8d6b-19858eaea882",
      "kind": "stratagem",
      "name": "Hellforged Construction",
      "det": "Infernal Lance",
      "ref": {
        "kind": "stratagem",
        "det": "infernal-lance",
        "name": "Hellforged Construction"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0e0a9e37-fc6d-4ac8-8e17-9d44dc5ed741",
      "kind": "stratagem",
      "name": "Warp Vision",
      "det": "Infernal Lance",
      "ref": {
        "kind": "stratagem",
        "det": "infernal-lance",
        "name": "Warp Vision"
      },
      "hash": "f7f93b26",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "f09aa1f8-3eff-4de9-b32a-bb88c4f8fcf8",
      "kind": "stratagem",
      "name": "Runes of Disdain",
      "det": "Lords of Dread",
      "ref": {
        "kind": "stratagem",
        "det": "lords-of-dread",
        "name": "Runes of Disdain"
      },
      "hash": "6d37add7",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "fdd0d950-98d1-4116-829b-4be30e80c3ac",
      "kind": "stratagem",
      "name": "Conquerors Without Mercy",
      "det": "Traitoris Lance",
      "ref": {
        "kind": "stratagem",
        "det": "traitoris-lance",
        "name": "Conquerors Without Mercy"
      },
      "hash": "3619df1f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
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
      "sid": "342ebf3d-58b7-43b4-9ee7-a300640f2855",
      "kind": "stratagem",
      "name": "Disdain for the Weak",
      "det": "Traitoris Lance",
      "ref": {
        "kind": "stratagem",
        "det": "traitoris-lance",
        "name": "Disdain for the Weak"
      },
      "hash": "29627615",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "27661185-4352-4946-a96b-554be5d5502e",
      "kind": "stratagem",
      "name": "Storm of Darkness",
      "det": "Traitoris Lance",
      "ref": {
        "kind": "stratagem",
        "det": "traitoris-lance",
        "name": "Storm of Darkness"
      },
      "hash": "7c9432d1",
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
    }
  ]
}

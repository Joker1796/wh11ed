// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "emperors-children",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "7a600218-890d-4259-a303-9a21f9a4ff83:daemon-prince-of-slaanesh-with-wings",
      "kind": "ability",
      "name": "Daemon Prince of Slaanesh with Wings: Stimulated by Pain",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "daemon-prince-of-slaanesh-with-wings"
      },
      "hash": "e577ede9",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "58688df3-babc-4cd6-be1d-7218763ca629:daemon-prince-of-slaanesh",
      "kind": "ability",
      "name": "Daemon Prince of Slaanesh: Excessive Vigour",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "daemon-prince-of-slaanesh",
        "scopes": [
          {
            "targets": [
              "SLAANESH"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "bc5ddaee",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "target": "aura",
          "when": {
            "en": "while that unit made a Charge move this turn",
            "ru": "пока отряд совершил Charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "d5100107-8fed-47bd-a7da-f399153361aa:daemon-prince-of-slaanesh",
      "kind": "ability",
      "name": "Daemon Prince of Slaanesh: Lord of Excess",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "daemon-prince-of-slaanesh"
      },
      "hash": "8318f2b9",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a4c58c7b-269b-4a5b-a1ec-476f7314b90e:defiler",
      "kind": "ability",
      "name": "Defiler: Revel in Desecration",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "defiler"
      },
      "hash": "189046ad",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "8f5e1acd-04e7-4af5-9a10-260a57c23807:fulgrim",
      "kind": "ability",
      "name": "Fulgrim: Beguiling Form",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "fulgrim",
        "set": "Daemon Primarch of Slaanesh",
        "pickLimit": 1
      },
      "hash": "0ffe6c64",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "20022824-dde8-47a5-8860-7fcbe3c9af76:fulgrim",
      "kind": "ability",
      "name": "Fulgrim: Daemonic Speed",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "fulgrim",
        "set": "Daemon Primarch of Slaanesh",
        "pickLimit": 1
      },
      "hash": "728f7122",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Fights First",
          "when": null
        }
      ]
    },
    {
      "sid": "d43dee4b-b513-49f2-85d0-f84c7ab38017:fulgrim",
      "kind": "ability",
      "name": "Fulgrim: Enthralling Hypnosis (Aura)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "fulgrim",
        "set": "Daemon Primarch of Slaanesh",
        "pickLimit": 1
      },
      "hash": "e93c66db",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "2c211c4e-657c-4c46-8cdf-23a93bd835cf:keeper-of-secrets",
      "kind": "ability",
      "name": "Keeper of Secrets: Daemon Lord of Slaanesh",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "keeper-of-secrets",
        "scopes": [
          {
            "targets": [
              "LEGIONS OF EXCESS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "959350b2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "ebc372fc-2320-4b92-b420-4ca74193af7f:lord-exultant",
      "kind": "ability",
      "name": "Lord Exultant: Euphoric Strikes",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lord-exultant"
      },
      "hash": "6c534549",
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
          "stat": "ap",
          "op": "add",
          "value": -1,
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
      "sid": "d189d02d-c6d5-4ef6-885c-3c7f6a5e86e4:lord-exultant",
      "kind": "ability",
      "name": "Lord Exultant: Perfectionists",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lord-exultant"
      },
      "hash": "abe50645",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "d9fc4bde-fbfc-4b95-bab3-84d9815e112a:lord-kakophonist",
      "kind": "ability",
      "name": "Lord Kakophonist: Obsessive Annunciation",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lord-kakophonist"
      },
      "hash": "76c79108",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "c239d94d-5911-4afe-97d1-2ebf8182baec:lord-kaphrael-of-the-callous-blades",
      "kind": "ability",
      "name": "Lord Kaphrael of the Callous Blades: Peerless Killer",
      "det": null,
      "ref": null,
      "hash": "342f0f9a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null
        }
      ]
    },
    {
      "sid": "6bf37262-bc4e-4e29-ac45-6d8b05830003:lucius-the-eternal",
      "kind": "ability",
      "name": "Lucius the Eternal: Duellist’s Hubris",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lucius-the-eternal"
      },
      "hash": "5b8055de",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "09d47f55-a9bd-448a-81f2-a256005c8cd2:maulerfiend",
      "kind": "ability",
      "name": "Maulerfiend: Glutton for Punishment",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "maulerfiend"
      },
      "hash": "5df84566",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "cd27788a-28c9-430c-8ccd-5916684fe11e",
      "kind": "detachmentRule",
      "name": "Daemonic Empowerment",
      "det": "Carnival of Excess",
      "ref": {
        "kind": "detachmentRule",
        "det": "carnival-of-excess"
      },
      "hash": "9cb3432e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while the unit is Empowered (within 6\" of the other half of the alliance)",
            "ru": "пока отряд Empowered (в пределах 6\" от союзной половины)"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "3d5902bd-a800-4b2e-a1c2-1bb1f3d544ed",
      "kind": "detachmentRule",
      "name": "Sensational Performance",
      "det": "Court of the Phoenician",
      "hash": "89d4535f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
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
          "stat": "ap",
          "op": "add",
          "value": -1,
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
        "det": "court-of-the-phoenician"
      }
    },
    {
      "sid": "b18e24ee-40da-4585-ae6e-d99bab42aab2",
      "kind": "detachmentRule",
      "name": "Frantic Focus",
      "det": "Frenzied Host",
      "ref": {
        "kind": "detachmentRule",
        "det": "frenzied-host"
      },
      "hash": "c74b85fe",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "until the end of the turn in which that unit was selected to make an advance or fall-back move",
            "ru": "до конца хода, в котором отряд выбран для advance/fall-back-перемещения"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "74798d62-5f94-461d-9f8d-6e074b85f7ad",
      "kind": "detachmentRule",
      "name": "Entitled to Victory",
      "det": "Spectacle of Slaughter",
      "ref": {
        "kind": "detachmentRule",
        "det": "spectacle-of-slaughter"
      },
      "hash": "2fae678d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Fights First",
          "when": null
        }
      ]
    },
    {
      "sid": "4dd6dec8-03dc-4b0a-919a-b00c3c34f726",
      "kind": "enhancement",
      "name": "Dark Blessings",
      "det": "Carnival of Excess",
      "hash": "cd86219a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "3+",
          "when": {
            "en": "once per battle, for the phase, after an enemy unit selects its targets",
            "ru": "один раз за битву, на фазу, после того как вражеский отряд выбрал цели"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "carnival-of-excess"
      }
    },
    {
      "sid": "efd6eed5-0e4d-48be-bb5e-adeb57d9e386",
      "kind": "enhancement",
      "name": "Possessed Blade",
      "det": "Carnival of Excess",
      "hash": "9f4082d7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "one melee weapon of the bearer, selected at the start of the battle",
            "ru": "одно оружие ближнего боя носителя, выбранное в начале битвы"
          },
          "cond": [
            "blocked-weapon"
          ]
        },
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "that same weapon, for the fight the bearer uses this Enhancement in",
            "ru": "то же оружие, на бой, в котором носитель применил улучшение"
          },
          "cond": [
            "blocked-weapon"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "that same weapon, for the fight the bearer uses this Enhancement in",
            "ru": "то же оружие, на бой, в котором носитель применил улучшение"
          },
          "cond": [
            "blocked-weapon"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "HAZARDOUS",
          "when": {
            "en": "that same weapon, for the fight the bearer uses this Enhancement in",
            "ru": "то же оружие, на бой, в котором носитель применил улучшение"
          },
          "cond": [
            "blocked-weapon"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "carnival-of-excess"
      }
    },
    {
      "sid": "f8a976fd-eb1b-401d-8b99-50155fb04f4c",
      "kind": "enhancement",
      "name": "Warp Walker",
      "det": "Carnival of Excess",
      "ref": {
        "kind": "enhancement",
        "det": "carnival-of-excess"
      },
      "hash": "048159c1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "each time the bearer's unit Advances, until the end of the phase (replacing the Advance roll)",
            "ru": "каждый раз, когда юнит носителя совершает Advance, до конца фазы (вместо броска Advance)"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "739f0185-c80c-4793-8479-1d28bbad8a25",
      "kind": "enhancement",
      "name": "Pledge of Dark Glory",
      "det": "Coterie of the Conceited",
      "hash": "c335f5f1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while the bearer is leading that unit",
            "ru": "пока носитель ведёт этот отряд"
          },
          "cond": [
            "unit-leading"
          ]
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the bearer is leading that unit",
            "ru": "пока носитель ведёт этот отряд"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "coterie-of-the-conceited"
      }
    },
    {
      "sid": "533b3db0-dd34-4863-84a7-bcd2eff86ea4",
      "kind": "enhancement",
      "name": "Exalted Patron",
      "det": "Court of the Phoenician",
      "ref": {
        "kind": "enhancement",
        "det": "court-of-the-phoenician"
      },
      "hash": "cdc77255",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "cff5cb21-f229-467b-bbd6-faf82240043b",
      "kind": "enhancement",
      "name": "Spiritsliver",
      "det": "Court of the Phoenician",
      "hash": "2923caab",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "court-of-the-phoenician"
      }
    },
    {
      "sid": "364cea95-8b5d-480c-930c-22d543f96013",
      "kind": "enhancement",
      "name": "Cacophonic Accompaniment",
      "det": "Elegant Brutes",
      "ref": {
        "kind": "enhancement",
        "det": "elegant-brutes"
      },
      "hash": "743a6cea",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 1,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "when": null
        }
      ],
      "note": "the Deep Strike in the first bullet is an ability, not a keyword or a weapon tag — nothing on the card carries it"
    },
    {
      "sid": "7949eef1-dbe1-42e6-9742-e18fea8532fe",
      "kind": "enhancement",
      "name": "Frenzied Ferocity (Upgrade)",
      "det": "Elegant Brutes",
      "ref": {
        "kind": "enhancement",
        "det": "elegant-brutes"
      },
      "hash": "805adba2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        }
      ]
    },
    {
      "sid": "07b233f5-b9d7-40a8-b114-06c572e45886",
      "kind": "enhancement",
      "name": "Euphoric Crown",
      "det": "Frenzied Host",
      "ref": {
        "kind": "enhancement",
        "det": "frenzied-host"
      },
      "hash": "4b6299cb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "d4fcc7d3-1641-42fa-a300-9ba09b6776fb",
      "kind": "enhancement",
      "name": "Howling Plate",
      "det": "Frenzied Host",
      "ref": {
        "kind": "enhancement",
        "det": "frenzied-host"
      },
      "hash": "381682e9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null
        }
      ]
    },
    {
      "sid": "4d0851fe-8c7b-4423-b688-916ad670d63e",
      "kind": "enhancement",
      "name": "Steeped in Suffering",
      "det": "Mercurial Host",
      "hash": "9e1c1938",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "mercurial-host"
      }
    },
    {
      "sid": "a1f791ea-398b-4724-9736-83bd81581abc",
      "kind": "enhancement",
      "name": "Blinding Speed",
      "det": "Peerless Bladesmen",
      "ref": {
        "kind": "enhancement",
        "det": "peerless-bladesmen"
      },
      "hash": "4f1f261a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "75e69566-9f5c-408f-8780-7581588e4710",
      "kind": "enhancement",
      "name": "Distortion",
      "det": "Peerless Bladesmen",
      "hash": "c0ee925e",
      "ver": 925,
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
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "peerless-bladesmen"
      }
    },
    {
      "sid": "1f87a1d3-1319-475b-9cea-34ce5b50cd05",
      "kind": "enhancement",
      "name": "Heretek Adept",
      "det": "Rapid Evisceration",
      "ref": {
        "kind": "enhancement",
        "det": "rapid-evisceration",
        "scopes": [
          {
            "targets": [
              "EMPEROR’S CHILDREN VEHICLE"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "c0f8388f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b26e88ce-98ee-401d-a5c3-f12564e770e4",
      "kind": "enhancement",
      "name": "Eager to Prove",
      "det": "Slaanesh’s Chosen",
      "ref": {
        "kind": "enhancement",
        "det": "slaaneshs-chosen"
      },
      "hash": "964490da",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while the bearer's unit is your army's Favoured Champions",
            "ru": "пока юнит носителя — Favoured Champions вашей армии"
          },
          "cond": [
            "unit-favoured-champions"
          ]
        }
      ]
    },
    {
      "sid": "81c3ada4-c8c2-4493-948d-ac3e1d4838a0",
      "kind": "enhancement",
      "name": "Proud and Vainglorious",
      "det": "Slaanesh’s Chosen",
      "hash": "082e8442",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the bearer's unit is your army's Favoured Champions",
            "ru": "пока отряд носителя — Favoured Champions вашей армии"
          },
          "cond": [
            "unit-favoured-champions"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "slaaneshs-chosen"
      }
    },
    {
      "sid": "5b2cfa1f-d5ff-4096-a600-0edf9c647213",
      "kind": "enhancement",
      "name": "Slayer of Champions",
      "det": "Slaanesh’s Chosen",
      "hash": "dd60b2c1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "per attack against a Character unit",
            "ru": "за атаку по отряду Character"
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
            "en": "per attack against a Character unit",
            "ru": "за атаку по отряду Character"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "slaaneshs-chosen"
      }
    },
    {
      "sid": "87003c53-7a8a-49f0-bcc3-f07e7749ba3b",
      "kind": "enhancement",
      "name": "Eager Patrons (Upgrade)",
      "det": "Spectacle of Slaughter",
      "ref": {
        "kind": "enhancement",
        "det": "spectacle-of-slaughter"
      },
      "hash": "2ddd5ee8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": null
        }
      ]
    },
    {
      "sid": "4eb6db28-8316-4d64-a6ab-10333e405814",
      "kind": "stratagem",
      "name": "Shatter Strike",
      "det": "Callous Blades",
      "ref": null,
      "hash": "3463f06e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "d",
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
      "sid": "c31be1f6-a71d-44ba-85f7-b4b7021a6b9f",
      "kind": "stratagem",
      "name": "Armour of Abhorrence",
      "det": "Coterie of the Conceited",
      "ref": {
        "kind": "stratagem",
        "det": "coterie-of-the-conceited",
        "name": "Armour of Abhorrence"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "fadeb9fd-72d1-4595-bb0e-d16f1f67e57d",
      "kind": "stratagem",
      "name": "Protection of the Dark Prince",
      "det": "Coterie of the Conceited",
      "ref": {
        "kind": "stratagem",
        "det": "coterie-of-the-conceited",
        "name": "Protection of the Dark Prince"
      },
      "hash": "4cc38390",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "cd9eea99-4b5b-4a1f-b876-6a4d45610a7d",
      "kind": "stratagem",
      "name": "Close-quarters Excruciation",
      "det": "Court of the Phoenician",
      "ref": {
        "kind": "stratagem",
        "det": "court-of-the-phoenician",
        "name": "Close-quarters Excruciation"
      },
      "hash": "5cb3d608",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against targets within 12\"",
            "ru": "против целей в 12\""
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against targets within 12\"",
            "ru": "против целей в 12\""
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "a66b93f1-8245-4923-9b41-2f77873604e0",
      "kind": "stratagem",
      "name": "Psychedelic Soulflame",
      "det": "Elegant Brutes",
      "ref": {
        "kind": "stratagem",
        "det": "elegant-brutes",
        "name": "Psychedelic Soulflame"
      },
      "hash": "4e26dc3d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
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
      "sid": "9d74338f-4543-4fb8-9cf5-ff661c0eaaba",
      "kind": "stratagem",
      "name": "Possessive Mania",
      "det": "Frenzied Host",
      "ref": {
        "kind": "stratagem",
        "det": "frenzied-host",
        "name": "Possessive Mania"
      },
      "hash": "9e50d86d",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "393f0842-1159-4dd0-920a-c98a41a15339",
      "kind": "stratagem",
      "name": "Honour the Prince",
      "det": "Mercurial Host",
      "ref": {
        "kind": "stratagem",
        "det": "mercurial-host",
        "name": "Honour the Prince"
      },
      "hash": "f0ac49ee",
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
      "sid": "f69984fd-ed4d-4485-bc52-82866572b0b6",
      "kind": "stratagem",
      "name": "Violent Excess",
      "det": "Mercurial Host",
      "ref": {
        "kind": "stratagem",
        "det": "mercurial-host",
        "name": "Violent Excess"
      },
      "hash": "d91ad8da",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
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
      "sid": "3b83c2cd-a59c-475f-871c-88f9bc8b565b",
      "kind": "stratagem",
      "name": "Cruel Bladesman",
      "det": "Peerless Bladesmen",
      "ref": {
        "kind": "stratagem",
        "det": "peerless-bladesmen",
        "name": "Cruel Bladesman"
      },
      "hash": "381f84c3",
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
      "sid": "821d0384-2c3d-441d-9d74-dd36b23301ad",
      "kind": "stratagem",
      "name": "Devoted Duellists",
      "det": "Slaanesh’s Chosen",
      "ref": {
        "kind": "stratagem",
        "det": "slaaneshs-chosen",
        "name": "Devoted Duellists"
      },
      "hash": "6db6bd62",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "against the enemy unit this stratagem named",
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
      "sid": "4eececb5-65f3-43ae-b6f0-a8396cd1528f",
      "kind": "stratagem",
      "name": "Heightened Jealousy",
      "det": "Slaanesh’s Chosen",
      "ref": {
        "kind": "stratagem",
        "det": "slaaneshs-chosen",
        "name": "Heightened Jealousy"
      },
      "hash": "b5596c56",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "for a CHARACTER that is not your Favoured Champions",
            "ru": "для CHARACTER, не входящего в Favoured Champions"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "1e9e2ba7-f899-4d0b-b553-c8f46fa9deff",
      "kind": "stratagem",
      "name": "Honour Is for Fools",
      "det": "Spectacle of Slaughter",
      "ref": {
        "kind": "stratagem",
        "det": "spectacle-of-slaughter",
        "name": "Honour Is for Fools"
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
      "sid": "79b389ec-f1c4-42b1-833d-4e1b86817377:daemonettes",
      "kind": "wargear",
      "name": "Daemonettes: Daemonic Icon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "daemonettes",
        "item": "daemonic icon"
      },
      "hash": "5db4589c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "set",
          "value": "6+",
          "when": null
        }
      ]
    },
    {
      "sid": "e77cb7d8-d6cd-472a-a771-91fee3e48bcd:daemonettes",
      "kind": "wargear",
      "name": "Daemonettes: Instrument of Chaos",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "daemonettes",
        "item": "instrument of chaos"
      },
      "hash": "9fccd872",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "5579aa57-632e-42a7-a12a-7ebc8c69e24d:keeper-of-secrets",
      "kind": "wargear",
      "name": "Keeper of Secrets: Shining Aegis",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "keeper-of-secrets",
        "item": "shining aegis"
      },
      "hash": "2aa5c1c5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "sv",
          "op": "set",
          "value": "3+",
          "when": null
        }
      ]
    },
    {
      "sid": "79b389ec-f1c4-42b1-833d-4e1b86817377:seekers",
      "kind": "wargear",
      "name": "Seekers: Daemonic Icon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "seekers",
        "item": "daemonic icon"
      },
      "hash": "5db4589c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "set",
          "value": "6+",
          "when": null
        }
      ]
    },
    {
      "sid": "e77cb7d8-d6cd-472a-a771-91fee3e48bcd:seekers",
      "kind": "wargear",
      "name": "Seekers: Instrument of Chaos",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "seekers",
        "item": "instrument of chaos"
      },
      "hash": "9fccd872",
      "ver": 925,
      "reviewed": true,
      "effects": []
    }
  ]
}

// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "thousand-sons",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "91ff57b7-1d8b-40bd-8c05-9b87ca855bc2:ahriman",
      "kind": "ability",
      "name": "Ahriman: Arch-Sorcerer of Tzeentch",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ahriman"
      },
      "hash": "80e639d4",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ad0bab17-6be0-4962-8503-f1769cb70f6f:blue-horrors",
      "kind": "ability",
      "name": "Blue Horrors: Sullen Malevolence",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "blue-horrors"
      },
      "hash": "f20a7aa6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4fefe630-e078-4081-ac01-5a0a3f220d3b:chaos-predator-destructor",
      "kind": "ability",
      "name": "Chaos Predator Destructor: Ensorcelled Destruction",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-predator-destructor"
      },
      "hash": "eeab42c2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a unit hit by a THOUSAND SONS Psychic Attack this phase",
            "ru": "против юнита, задетого Psychic Attack THOUSAND SONS в этой фазе"
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
            "en": "against a unit hit by a THOUSAND SONS Psychic Attack this phase",
            "ru": "против юнита, задетого Psychic Attack THOUSAND SONS в этой фазе"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "12fdfa99-1e9a-420d-a6bf-2fe5ce94fedf:chaos-rhino",
      "kind": "ability",
      "name": "Chaos Rhino: Sorcerous Support",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-rhino"
      },
      "hash": "1bae6b17",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "6caecabb-1eae-4404-a3b1-7e2b03d384f5:daemon-prince-of-tzeentch-with-wings",
      "kind": "ability",
      "name": "Daemon Prince of Tzeentch with Wings: Aetherstride",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "daemon-prince-of-tzeentch-with-wings"
      },
      "hash": "67844491",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS D3",
          "when": {
            "en": "while this ability is used",
            "ru": "пока способность использована"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "27a36d58-b747-405c-95e6-01a4a4113466:daemon-prince-of-tzeentch",
      "kind": "ability",
      "name": "Daemon Prince of Tzeentch: Glamour of Tzeentch",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "daemon-prince-of-tzeentch",
        "scopes": [
          {
            "targets": [
              "THOUSAND SONS INFANTRY"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "ffbb3512",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "5bfb5c68-19d9-4d7c-bf0a-f67b5757599d:daemon-prince-of-tzeentch",
      "kind": "ability",
      "name": "Daemon Prince of Tzeentch: Servile Pawns",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "daemon-prince-of-tzeentch"
      },
      "hash": "2a13fb8e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0622b621-95f4-46da-a965-8ed18b8373bf:daemon-prince-of-tzeentch",
      "kind": "ability",
      "name": "Daemon Prince of Tzeentch: Spirit Snare",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "daemon-prince-of-tzeentch"
      },
      "hash": "6edb2f9d",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4749049e-c383-4349-bf61-1794c0cb72d8:exalted-sorcerer",
      "kind": "ability",
      "name": "Exalted Sorcerer: Arcane Shield",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "exalted-sorcerer"
      },
      "hash": "58585162",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "90c6edaf-0f74-4a0e-9631-b01641bebe3f:helbrute",
      "kind": "ability",
      "name": "Helbrute: Devoted to Destruction",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "helbrute"
      },
      "hash": "67092a63",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "the two melee weapons taken in addition to the close combat weapon",
            "ru": "два оружия ближнего боя, взятые вдобавок к close combat weapon"
          },
          "cond": [
            "blocked-weapon"
          ]
        }
      ]
    },
    {
      "sid": "018818f0-a298-46d2-b1af-f4460529941f:infernal-master",
      "kind": "ability",
      "name": "Infernal Master: Malefic Maelstrom",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "infernal-master"
      },
      "hash": "3154cfe3",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
      "sid": "e9b6c7e7-ecfc-409b-8ddd-ef58d17500f4:lord-of-change",
      "kind": "ability",
      "name": "Lord of Change: Daemon Lord of Tzeentch",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lord-of-change",
        "scopes": [
          {
            "targets": [
              "SCINTILLATING LEGIONS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "e1944b31",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "cdee0846-07c4-46dd-8f41-03ec95ffb7ba:magnus-the-red",
      "kind": "ability",
      "name": "Magnus the Red: Impossible Form (Psychic)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "magnus-the-red",
        "set": "Unearthly Power",
        "pickLimit": 1
      },
      "hash": "4004fc0a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a3bc2ee7-9171-4eb3-afbf-36b97c7d3f45:magnus-the-red",
      "kind": "ability",
      "name": "Magnus the Red: Lord of the Planet of the Sorcerers",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "magnus-the-red"
      },
      "hash": "4c5685bf",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "383842c0-08ef-4dfa-ab29-63e48ae5acdf:magnus-the-red",
      "kind": "ability",
      "name": "Magnus the Red: Time Flux (Aura, Psychic)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "magnus-the-red",
        "scopes": [
          {
            "targets": [
              "THOUSAND SONS"
            ],
            "excludes": []
          }
        ],
        "set": "Unearthly Power",
        "pickLimit": 1
      },
      "hash": "f3e4bf62",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "target": "aura",
          "when": {
            "en": "while this ability is the one selected",
            "ru": "пока выбрана эта способность"
          }
        }
      ]
    },
    {
      "sid": "5f1de731-c854-4037-8c61-4ece6772f685:magnus-the-red",
      "kind": "ability",
      "name": "Magnus the Red: Treason of Tzeentch (Psychic)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "magnus-the-red",
        "set": "Unearthly Power",
        "pickLimit": 1
      },
      "hash": "743ba7d5",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "49fd36bf-f94a-466d-8900-6791fc93f801:mutalith-vortex-beast",
      "kind": "ability",
      "name": "Mutalith Vortex Beast: Immaterial Flare",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "mutalith-vortex-beast",
        "scopes": [
          {
            "targets": [
              "THOUSAND SONS PSYKER"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "f52800f4",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "086a5947-74cb-4c55-9c39-75a00f33ebdc:prism-of-zadophon-rubric-marines",
      "kind": "ability",
      "name": "Prism of Zadophon Rubric Marines: Icon of Flame",
      "det": null,
      "ref": null,
      "hash": "39c3d6cd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "excluding CHARACTER models' attacks",
            "ru": "кроме атак моделей CHARACTER"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "f243edb4-c65b-4510-a30f-ad0b4b2d18b0:sorcerer-in-terminator-armour",
      "kind": "ability",
      "name": "Sorcerer in Terminator Armour: Empyric Guidance",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sorcerer-in-terminator-armour"
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
      "sid": "48c98e40-3db3-4c80-a6cc-66992d5efc6c:sorcerer-in-terminator-armour",
      "kind": "ability",
      "name": "Sorcerer in Terminator Armour: Marked by Fate",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sorcerer-in-terminator-armour"
      },
      "hash": "29426a15",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f243edb4-c65b-4510-a30f-ad0b4b2d18b0:sorcerer",
      "kind": "ability",
      "name": "Sorcerer: Empyric Guidance",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sorcerer"
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
      "sid": "c6147b99-a91d-4063-a265-f70cb2230ea4:sorcerer",
      "kind": "ability",
      "name": "Sorcerer: Twisted Sorceries",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sorcerer"
      },
      "hash": "ddb1605d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 3,
          "only": {
            "tag": "PSYCHIC"
          },
          "when": {
            "en": "once per battle, while this ability is used",
            "ru": "раз за битву, пока способность использована"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "a",
          "op": "add",
          "value": 3,
          "only": {
            "tag": "PSYCHIC"
          },
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
      "sid": "05f142d3-4beb-4b18-8cd0-47d8082ce2ce:tzaangor-shaman",
      "kind": "ability",
      "name": "Tzaangor Shaman: Bestial Prophet",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tzaangor-shaman"
      },
      "hash": "b981890e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "6fcd2ecb-d54a-4fae-820f-6613f2fd39c8:zadophon-the-soul-eater",
      "kind": "ability",
      "name": "Zadophon the Soul Eater: Glamour of Tzeentch (Aura, Psychic)",
      "det": null,
      "ref": null,
      "hash": "cde7ab6f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "166fb00a-fa76-4b86-913c-7a0c6a8be9d4",
      "kind": "armyRule",
      "name": "Cabal of Sorcerers",
      "det": null,
      "hash": "5736c5d6",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "7bdab8ed-0e0f-4861-b887-fca833b68f6a",
      "kind": "detachmentRule",
      "name": "Infernal Pacts",
      "det": "Changehost of Deceit",
      "hash": "29c8f1a2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "Scintillating Legions units, against ranged attacks, while a friendly Thousand Sons Psyker unit is within 6\" and visible",
            "ru": "отряды Scintillating Legions, против стрелковых атак, пока дружественный отряд Thousand Sons Psyker в 6\" и в зоне видимости"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "changehost-of-deceit"
      }
    },
    {
      "sid": "87903309-9fa1-4896-b108-1a57d4f441b6",
      "kind": "detachmentRule",
      "name": "Kindred Sorcery",
      "det": "Grand Coven",
      "hash": "2477dafc",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 6,
          "when": {
            "en": "ranged Psychic weapons only, while the Imbued Manifestation ability is selected",
            "ru": "только стрелковое психическое оружие, пока выбрана способность Imbued Manifestation"
          },
          "cond": [
            "manifestation-imbued"
          ],
          "only": {
            "tag": "PSYCHIC"
          }
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "only": {
            "tag": "PSYCHIC"
          },
          "when": {
            "en": "Psychic weapons only, while the Wrath of the Immaterium ability is selected",
            "ru": "только психическое оружие, пока выбрана способность Wrath of the Immaterium"
          },
          "cond": [
            "manifestation-wrath"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "grand-coven"
      }
    },
    {
      "sid": "ee7708ef-faa7-4aea-900b-ca02b173f6c4",
      "kind": "detachmentRule",
      "name": "Flow of Magic",
      "det": "Hexwarp Thrallband",
      "hash": "4ea3c811",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "hexwarp-thrallband"
      }
    },
    {
      "sid": "8780310f-ca05-4237-8fe5-66ac11a65cf6",
      "kind": "detachmentRule",
      "name": "Committed to the Ritual",
      "det": "Prism of Zadophon",
      "ref": null,
      "hash": "9e6dcb21",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while within range of an objective marker",
            "ru": "пока в пределах objective-маркера"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "19e0de45-bd88-44e4-81d2-19435524ab31",
      "kind": "detachmentRule",
      "name": "All is Dust",
      "det": "Rubricae Phalanx",
      "hash": "7f207e70",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "rubricae-phalanx"
      }
    },
    {
      "sid": "b5a78aa9-08cb-4986-b09e-9735e5b6ff00",
      "kind": "detachmentRule",
      "name": "Ensorcelled Animus",
      "det": "Sekhetar Cohort",
      "ref": {
        "kind": "detachmentRule",
        "det": "sekhetar-cohort",
        "scopes": [
          {
            "targets": [
              "SEKHETAR ROBOTS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "02b8c2cf",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PSYCHIC",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "c5998d23-f7e0-4fed-bbea-c738c4b1fe66",
      "kind": "detachmentRule",
      "name": "Warpmeld Sacrifice",
      "det": "Warpmeld Pact",
      "hash": "1fd641c4",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "warpmeld-pact"
      }
    },
    {
      "sid": "d096fcb5-f375-4a1b-93df-c2e455dabeba",
      "kind": "enhancement",
      "name": "Diabolic Savant",
      "det": "Changehost of Deceit",
      "hash": "2e42611c",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "changehost-of-deceit"
      }
    },
    {
      "sid": "aaf89db6-ceaf-4051-936b-fcb7ad589ed9",
      "kind": "enhancement",
      "name": "Tome of True Names",
      "det": "Changehost of Deceit",
      "hash": "bb02bbc3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "2+",
          "when": {
            "en": "once per battle, for the phase the bearer uses this Enhancement in",
            "ru": "один раз за битву, на фазу, в которой носитель применил улучшение"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "changehost-of-deceit"
      }
    },
    {
      "sid": "ffcd2ea7-c818-42ae-9bf0-0109b5fadc37",
      "kind": "enhancement",
      "name": "Eldritch Vortex of E’Taph",
      "det": "Grand Coven",
      "hash": "0e373a93",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null,
          "only": {
            "tag": "PSYCHIC"
          }
        },
        {
          "on": "weapon",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": null,
          "only": {
            "tag": "PSYCHIC"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "grand-coven"
      }
    },
    {
      "sid": "4ee4139b-25fd-42d7-95c1-7ec98fdf5492",
      "kind": "enhancement",
      "name": "Lord of Forbidden Lore",
      "det": "Grand Coven",
      "ref": {
        "kind": "enhancement",
        "det": "grand-coven"
      },
      "hash": "7cede779",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "extends the range of a Ritual, not of a weapon"
    },
    {
      "sid": "f2e24d64-f111-42bf-84f6-cd1ae234afec",
      "kind": "enhancement",
      "name": "Umbralefic Crystal",
      "det": "Grand Coven",
      "ref": {
        "kind": "enhancement",
        "det": "grand-coven"
      },
      "hash": "a15ddc15",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "23b38434-e051-4b26-a841-cbe2d62b5904",
      "kind": "enhancement",
      "name": "Arcane Might",
      "det": "Hexwarp Thrallband",
      "hash": "583d0c60",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null,
          "only": {
            "tag": "PSYCHIC"
          }
        },
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "+2 instead, while the bearer's unit is wholly within your army's Flow of Magic",
            "ru": "+2 вместо +1, пока отряд носителя целиком в Потоке магии вашей армии"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "hexwarp-thrallband"
      }
    },
    {
      "sid": "418bfe60-1e00-4326-b88d-63ee710b7bea",
      "kind": "enhancement",
      "name": "Empowered Manifestation",
      "det": "Hexwarp Thrallband",
      "ref": {
        "kind": "enhancement",
        "det": "hexwarp-thrallband"
      },
      "hash": "1d3a049c",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "extends the range of Psychic abilities, not of a weapon row"
    },
    {
      "sid": "a372c063-aacf-450e-8d87-d5e447b9872b",
      "kind": "enhancement",
      "name": "Empyric Onslaught",
      "det": "Hexwarp Thrallband",
      "hash": "8cad5a3e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 3,
          "when": {
            "en": "the bearer's ranged Psychic weapons, while the bearer's unit is wholly within your army's Flow of Magic",
            "ru": "стрелковое психическое оружие носителя, пока его отряд целиком в Потоке магии вашей армии"
          },
          "cond": [
            "never"
          ],
          "only": {
            "tag": "PSYCHIC"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "hexwarp-thrallband"
      }
    },
    {
      "sid": "e472737b-595b-4329-8875-1a94fc04a71d",
      "kind": "enhancement",
      "name": "Warp-tainted Shells",
      "det": "Prism of Zadophon",
      "ref": null,
      "hash": "5a782652",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "PSYCHIC",
          "only": {
            "name": "Infernal cannon"
          },
          "when": null
        }
      ]
    },
    {
      "sid": "b0d14bf1-434c-499d-b74d-aae2f320c5cf",
      "kind": "enhancement",
      "name": "Curse of Life",
      "det": "Ritual of Regeneration",
      "hash": "23c63f1e",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "ritual-of-regeneration"
      }
    },
    {
      "sid": "f4d1b38c-22ac-42d7-98a4-1d944dd63b52",
      "kind": "enhancement",
      "name": "Lord of the Rubricae",
      "det": "Rubricae Phalanx",
      "hash": "993f1c1f",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "rubricae-phalanx"
      }
    },
    {
      "sid": "5217a83b-742c-4e2a-966d-8ce26ec5adf8",
      "kind": "enhancement",
      "name": "Risen Rubricae",
      "det": "Rubricae Phalanx",
      "ref": {
        "kind": "enhancement",
        "det": "rubricae-phalanx"
      },
      "hash": "769d0b31",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "01116f1d-09f7-43b3-9a8e-30ee3eaeada6",
      "kind": "enhancement",
      "name": "Stave Abominus",
      "det": "Rubricae Phalanx",
      "ref": {
        "kind": "enhancement",
        "det": "rubricae-phalanx"
      },
      "hash": "9bdd9c4a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS D3",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": null
        }
      ]
    },
    {
      "sid": "587e90c8-b30d-4dfb-81b5-537e0fecce1e",
      "kind": "enhancement",
      "name": "Occulus Infernum",
      "det": "Sekhetar Cohort",
      "ref": {
        "kind": "enhancement",
        "det": "sekhetar-cohort",
        "scopes": [
          {
            "targets": [
              "SEKHETAR ROBOTS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "f0b0c532",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "2d9eaedb-d4b1-4d07-9cc4-3bb50194cfeb",
      "kind": "enhancement",
      "name": "Walking Rampart",
      "det": "Sekhetar Cohort",
      "ref": {
        "kind": "enhancement",
        "det": "sekhetar-cohort",
        "scopes": [
          {
            "targets": [
              "SEKHETAR ROBOTS"
            ],
            "excludes": []
          },
          {
            "targets": [
              "SEKHETAR ROBOTS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "fbdf20f6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "cb50a092-b387-493d-a329-fb3ebb9d603a",
      "kind": "enhancement",
      "name": "Thicket of Bladed Bone (Upgrade)",
      "det": "Servants of Change",
      "ref": {
        "kind": "enhancement",
        "det": "servants-of-change"
      },
      "hash": "0e63f605",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "CLEAVE 1",
          "when": null
        }
      ]
    },
    {
      "sid": "857f4218-0a35-44db-b747-7f37a411fd9d",
      "kind": "enhancement",
      "name": "Perplexing Cloak",
      "det": "Warpforged Cabal",
      "ref": {
        "kind": "enhancement",
        "det": "warpforged-cabal"
      },
      "hash": "b5c10428",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4f20a5e0-7e45-486f-b80d-7f769e1c6ece",
      "kind": "enhancement",
      "name": "Warp-Cursed Runemaster",
      "det": "Warpforged Cabal",
      "ref": {
        "kind": "enhancement",
        "det": "warpforged-cabal"
      },
      "hash": "795ab48d",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "extends the range of a Ritual, not of a weapon"
    },
    {
      "sid": "97f56fc4-c754-4f63-9e7a-7c4da6a1b3ad",
      "kind": "enhancement",
      "name": "Bray Lord",
      "det": "Warpmeld Pact",
      "ref": {
        "kind": "enhancement",
        "det": "warpmeld-pact"
      },
      "hash": "e470e302",
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
      "sid": "ec87a2f7-7b37-4475-aecc-e1b855221749",
      "kind": "enhancement",
      "name": "Flowing Flesh",
      "det": "Warpmeld Pact",
      "ref": {
        "kind": "enhancement",
        "det": "warpmeld-pact"
      },
      "hash": "143577b0",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0e2f4b29-498d-4e89-9af1-373f8d3ae792",
      "kind": "enhancement",
      "name": "Warpmeld Dagger",
      "det": "Warpmeld Pact",
      "hash": "093d156d",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "warpmeld-pact"
      }
    },
    {
      "sid": "86e94729-5da6-4199-a7ee-1bbca915f068",
      "kind": "stratagem",
      "name": "Destined by Fate",
      "det": "Grand Coven",
      "ref": {
        "kind": "stratagem",
        "det": "grand-coven",
        "name": "Destined by Fate"
      },
      "hash": "b6da6204",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "9dd1faed-7e8a-4386-b2a1-827023cd92d9",
      "kind": "stratagem",
      "name": "Devastating Sorcery",
      "det": "Grand Coven",
      "ref": {
        "kind": "stratagem",
        "det": "grand-coven",
        "name": "Devastating Sorcery"
      },
      "hash": "1a088249",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 9,
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
      "sid": "ef76aa65-62d6-4fbc-a9d6-f434efc42d36",
      "kind": "stratagem",
      "name": "Psychic Dominion",
      "det": "Grand Coven",
      "ref": {
        "kind": "stratagem",
        "det": "grand-coven",
        "name": "Psychic Dominion"
      },
      "hash": "584f1494",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "fafdea87-fdba-4af0-abf1-0ec3f7b086dc",
      "kind": "stratagem",
      "name": "Kaleidoscopic Tempest",
      "det": "Hexwarp Thrallband",
      "ref": {
        "kind": "stratagem",
        "det": "hexwarp-thrallband",
        "name": "Kaleidoscopic Tempest"
      },
      "hash": "2e9c5baa",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1321ba9d-f02a-4d64-bbe3-610c0fd8778c",
      "kind": "stratagem",
      "name": "Scouring Warpflame",
      "det": "Hexwarp Thrallband",
      "ref": {
        "kind": "stratagem",
        "det": "hexwarp-thrallband",
        "name": "Scouring Warpflame"
      },
      "hash": "8c98ff6d",
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
      "sid": "f0930771-8807-4a77-a274-a6637d0b2d6a",
      "kind": "stratagem",
      "name": "Through The Veil",
      "det": "Hexwarp Thrallband",
      "ref": {
        "kind": "stratagem",
        "det": "hexwarp-thrallband",
        "name": "Through The Veil"
      },
      "hash": "d9ca6a9a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "2eee2081-a2c8-4686-892f-68f2e3ee2eb9",
      "kind": "stratagem",
      "name": "Relentless Rebirth",
      "det": "Ritual of Regeneration",
      "ref": {
        "kind": "stratagem",
        "det": "ritual-of-regeneration",
        "name": "Relentless Rebirth"
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
      "sid": "ff7282e4-5c01-40b0-a3d3-67c3c98bf992",
      "kind": "stratagem",
      "name": "Implacable Guardians",
      "det": "Rubricae Phalanx",
      "ref": {
        "kind": "stratagem",
        "det": "rubricae-phalanx",
        "name": "Implacable Guardians"
      },
      "hash": "fd2abbfb",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3805f783-e42a-499d-a3f8-9a7934853d7c",
      "kind": "stratagem",
      "name": "Inexorable Advance",
      "det": "Rubricae Phalanx",
      "ref": {
        "kind": "stratagem",
        "det": "rubricae-phalanx",
        "name": "Inexorable Advance"
      },
      "hash": "22cdfca3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "turn"
    },
    {
      "sid": "6aeab97e-fe77-4731-a92e-eddc56b88ded",
      "kind": "stratagem",
      "name": "Infernal Fusillade",
      "det": "Rubricae Phalanx",
      "ref": {
        "kind": "stratagem",
        "det": "rubricae-phalanx",
        "name": "Infernal Fusillade"
      },
      "hash": "ebc56341",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "PSYCHIC",
          "only": {
            "name": "Inferno"
          },
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "ranged",
          "stat": "s",
          "op": "set",
          "value": "5",
          "only": {
            "name": "Inferno"
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
      "sid": "65974fb7-162a-4917-9850-2a36ba6a793e",
      "kind": "stratagem",
      "name": "Prismatic Displacement",
      "det": "Servants of Change",
      "ref": {
        "kind": "stratagem",
        "det": "servants-of-change",
        "name": "Prismatic Displacement"
      },
      "hash": "0ffdaff4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "turn"
    },
    {
      "sid": "b0cb5981-a7ae-4fac-9c49-1415afa964d5",
      "kind": "stratagem",
      "name": "Ensorcelled Infusion",
      "det": "Warpforged Cabal",
      "ref": {
        "kind": "stratagem",
        "det": "warpforged-cabal",
        "name": "Ensorcelled Infusion"
      },
      "hash": "095530fa",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "PSYCHIC",
          "when": {
            "en": "VEHICLE models only",
            "ru": "только модели VEHICLE"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "cbe3dc47-dd1e-4e77-9f69-1cd70c86270a",
      "kind": "stratagem",
      "name": "Hex-Marked Armour",
      "det": "Warpforged Cabal",
      "ref": {
        "kind": "stratagem",
        "det": "warpforged-cabal",
        "name": "Hex-Marked Armour"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "8976f591-43b5-458a-8ee9-5b0b5b3d3ef3",
      "kind": "stratagem",
      "name": "Warped Vicissitude",
      "det": "Warpmeld Pact",
      "ref": {
        "kind": "stratagem",
        "det": "warpmeld-pact",
        "name": "Warped Vicissitude"
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
      "sid": "79b389ec-f1c4-42b1-833d-4e1b86817377:pink-horrors",
      "kind": "wargear",
      "name": "Pink Horrors: Daemonic Icon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "pink-horrors",
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
      "sid": "e77cb7d8-d6cd-472a-a771-91fee3e48bcd:pink-horrors",
      "kind": "wargear",
      "name": "Pink Horrors: Instrument of Chaos",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "pink-horrors",
        "item": "instrument of chaos"
      },
      "hash": "9fccd872",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7c1b90fb-5b4b-499f-8f6b-52b98f115efa:rubric-marines",
      "kind": "wargear",
      "name": "Rubric Marines: Icon of Flame",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "rubric-marines",
        "item": "icon of flame"
      },
      "hash": "cf6f64c2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "excluding CHARACTER models' weapons",
            "ru": "кроме оружия моделей CHARACTER"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "9e660f68-928e-43a7-8af4-915cb722ac9c:tzaangors",
      "kind": "wargear",
      "name": "Tzaangors: Herd banner",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "tzaangors",
        "item": "herd banner"
      },
      "hash": "9fd64a75",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "within range of an objective you control",
            "ru": "в зоне контролируемого objective"
          },
          "cond": [
            "never"
          ]
        }
      ]
    }
  ]
}

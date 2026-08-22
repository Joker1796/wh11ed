// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "thousand-sons",
  "formatVersion": 1,
  "entries": [
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
      "sid": "c7c41366-2625-4d4b-87a9-9b53d67572d0",
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
        "det": "sekhetar-cohort"
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
          "when": {
            "en": "for a SEKHETAR ROBOTS unit within 12\" of a friendly THOUSAND SONS PSYKER unit (Infusion aura)",
            "ru": "для юнита SEKHETAR ROBOTS в пределах 12\" от дружественного юнита THOUSAND SONS PSYKER (аура Infusion)"
          },
          "cond": [
            "never"
          ]
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
        "det": "sekhetar-cohort"
      },
      "hash": "f0b0c532",
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
    }
  ]
}

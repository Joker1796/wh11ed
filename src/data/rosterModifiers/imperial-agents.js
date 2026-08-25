// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "imperial-agents",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "95f007e6-3ff6-4664-ab65-a2d04760db65:aquila-kill-team",
      "kind": "ability",
      "name": "Aquila Kill Team: Death to the Alien",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "aquila-kill-team"
      },
      "hash": "a5dbf863",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1e689318-8f2f-40dd-b791-ab84d3abc511:aquila-kill-team",
      "kind": "ability",
      "name": "Aquila Kill Team: Kill Team",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "aquila-kill-team"
      },
      "hash": "18dbc340",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f8711d73-0a55-4e7d-a23c-92b9b2ec60b2:culexus-assassin",
      "kind": "ability",
      "name": "Culexus Assassin: Abomination",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "culexus-assassin"
      },
      "hash": "0d07cd2a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 2+ (vs Psychic Attacks)",
          "when": null
        }
      ]
    },
    {
      "sid": "95f007e6-3ff6-4664-ab65-a2d04760db65:deathwatch-kill-team",
      "kind": "ability",
      "name": "Deathwatch Kill Team: Death to the Alien",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "deathwatch-kill-team"
      },
      "hash": "a5dbf863",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3abf4a41-24a8-4b00-99ff-070da866be07:eversor-assassin",
      "kind": "ability",
      "name": "Eversor Assassin: Overkill",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "eversor-assassin"
      },
      "hash": "23baf762",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
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
        }
      ]
    },
    {
      "sid": "45a6c1ac-0a09-47da-9ac0-b8716abdc416:exaction-squad",
      "kind": "ability",
      "name": "Exaction Squad: Imperial Law",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "exaction-squad"
      },
      "hash": "d83f9fee",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "against the marked enemy unit",
            "ru": "по отмеченному вражескому отряду"
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
      "sid": "a3719eb1-6c71-4db2-927b-f1a50dffbb3b:grey-knights-terminator-squad",
      "kind": "ability",
      "name": "Grey Knights Terminator Squad: Hammerhand",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "grey-knights-terminator-squad"
      },
      "hash": "88d43136",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
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
      "sid": "88b7c551-6538-4fab-a565-528f90bccd49:imperial-navy-breachers",
      "kind": "ability",
      "name": "Imperial Navy Breachers: CAT Unit",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "imperial-navy-breachers"
      },
      "hash": "c01c6511",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
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
      "sid": "500e30b2-050d-43e9-9682-e9902367e0a8:inquisitor-coteaz",
      "kind": "ability",
      "name": "Inquisitor Coteaz: Malefic Wardings",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "inquisitor-coteaz"
      },
      "hash": "7c363fc8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "6+",
          "when": null,
          "target": "unit"
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "against Psychic Attacks and DAEMON attacks, instead",
            "ru": "против Psychic Attacks и атак DAEMON, вместо этого"
          },
          "cond": [
            "never"
          ],
          "alt": 0,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "8f8f280c-f5a8-4df4-93b4-0b402c61e3fa:inquisitor-draxus",
      "kind": "ability",
      "name": "Inquisitor Draxus: Xenos Hunter",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "inquisitor-draxus"
      },
      "hash": "22b18374",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "5ad5311f-39c0-48d2-b0aa-45afbe912f33:inquisitor-greyfax",
      "kind": "ability",
      "name": "Inquisitor Greyfax: No Mercy",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "inquisitor-greyfax"
      },
      "hash": "a2c8eed2",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "8aed8c98-1577-4b0e-ad6f-42b69a9097d5:inquisitor-greyfax",
      "kind": "ability",
      "name": "Inquisitor Greyfax: Psyoculum",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "inquisitor-greyfax"
      },
      "hash": "5f809e24",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-PSYKER 4+",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "ee171eca-1e2b-4684-8eae-ad0356a9491c:inquisitor-kroyle",
      "kind": "ability",
      "name": "Inquisitor Kroyle: Tox‑cycler",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "inquisitor-kroyle"
      },
      "hash": "c11f932c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 2,
          "only": {
            "name": "Jindarii tox"
          },
          "when": {
            "en": "for the rest of the battle, once it scored a hit with that weapon",
            "ru": "до конца битвы, если это оружие попало"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "d",
          "op": "add",
          "value": 2,
          "only": {
            "name": "Jindarii tox"
          },
          "when": {
            "en": "for the rest of the battle, once it scored a hit with that weapon (max Damage 6)",
            "ru": "до конца битвы, если это оружие попало (Урон не выше 6)"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "0368fd0e-375b-43eb-9e6e-1d317e3409e0:inquisitor-s-hand-eversor-assassin",
      "kind": "ability",
      "name": "Inquisitor's Hand Eversor Assassin: Overkill (Once per battle per unit)",
      "det": null,
      "ref": null,
      "hash": "4b4fabb9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -4,
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
      "sid": "7b8abd6e-ceb3-4e6b-90c4-b46306d857c5:ministorum-priest",
      "kind": "ability",
      "name": "Ministorum Priest: Holy Hatred",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ministorum-priest"
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
          "target": "unit"
        }
      ]
    },
    {
      "sid": "3814e980-da68-4a95-b974-1ae6ff5c7542:ministorum-priest",
      "kind": "ability",
      "name": "Ministorum Priest: Zealot",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ministorum-priest"
      },
      "hash": "0ff5db45",
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
          "stat": "s",
          "op": "add",
          "value": 3,
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
      "sid": "f44961d2-ef44-41e8-ae8f-ad3d2486401e:preacher-teguen",
      "kind": "ability",
      "name": "Preacher Teguen: Holy Hatred",
      "det": null,
      "ref": null,
      "hash": "23578dc1",
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
      "sid": "529d2a22-6ed3-43d9-91a3-21a95385892f:preacher-teguen",
      "kind": "ability",
      "name": "Preacher Teguen: Zealot (Once per battle per unit)",
      "det": null,
      "ref": null,
      "hash": "b7d24256",
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
          "stat": "s",
          "op": "add",
          "value": 3,
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
      "sid": "a6a3da0c-0f81-4ebf-89b7-4e9e0db73fe8:rogue-trader-entourage",
      "kind": "ability",
      "name": "Rogue Trader Entourage: Backroom Deals",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "rogue-trader-entourage"
      },
      "hash": "90b508e3",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "9a2a9f27-0b49-4bdc-8718-77a8122c1ddd:sanctifiers",
      "kind": "ability",
      "name": "Sanctifiers: Ministorum Sermon",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sanctifiers"
      },
      "hash": "657ab3df",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "29dd94a6-896b-4c38-98f1-abea90c30860:vigilant-squad",
      "kind": "ability",
      "name": "Vigilant Squad: Merciless Judgement",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vigilant-squad"
      },
      "hash": "fc5b3a68",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3e661faf-c623-45b8-b474-70050fa69514:vindicare-assassin",
      "kind": "ability",
      "name": "Vindicare Assassin: Dead‐shot",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vindicare-assassin"
      },
      "hash": "1efabeb5",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4c404272-6d02-4187-85a5-d2d4fb13d862:vindicare-assassin",
      "kind": "ability",
      "name": "Vindicare Assassin: Shieldbreaker",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vindicare-assassin"
      },
      "hash": "3c91cf55",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "5571bc03-10a6-402c-94c9-a15e83b30d1a:voidsmen-at-arms",
      "kind": "ability",
      "name": "Voidsmen-at-Arms: Masters of Close Confines",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "voidsmen-at-arms"
      },
      "hash": "004c9f4b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
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
      "sid": "9750151c-8ecb-4051-a25b-5d34af7869e8:watch-captain-artemis",
      "kind": "ability",
      "name": "Watch Captain Artemis: Tactical Instinct",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "watch-captain-artemis"
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
          "target": "unit"
        }
      ]
    },
    {
      "sid": "82ad414b-e19f-4a6a-be1a-5ce96e420d21",
      "kind": "armyRule",
      "name": "Assigned Agents",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "4aa3a14f",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — how many Agents units may be included"
    },
    {
      "sid": "dc3732a7-5647-49b0-b3d1-8279dcfc40e4",
      "kind": "detachmentRule",
      "name": "At All Costs",
      "det": "Imperialis Fleet",
      "hash": "c7734e00",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "with the Acquire objective chosen, while within range of that objective marker",
            "ru": "при выбранной цели «Acquire», пока юнит в радиусе действия этого маркера"
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
            "en": "with the Acquire objective chosen, while within range of that objective marker",
            "ru": "при выбранной цели «Acquire», пока юнит в радиусе действия этого маркера"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "with the Acquire objective chosen, while within range of that objective marker",
            "ru": "при выбранной цели «Acquire», пока юнит в радиусе действия этого маркера"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "imperialis-fleet"
      }
    },
    {
      "sid": "f06dc6ab-3722-4c1f-b2ce-0c0f37b0b520",
      "kind": "detachmentRule",
      "name": "Root out Heresy",
      "det": "Ordo Hereticus, Purgation Force",
      "ref": {
        "kind": "detachmentRule",
        "det": "ordo-hereticus-purgation-force"
      },
      "hash": "c4b91060",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "against a Chaos unit of 5 or more models",
            "ru": "по отряду Chaos из 5+ моделей"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "7c93a7f0-c620-488f-a19c-65c23ed26631",
      "kind": "detachmentRule",
      "name": "Deathwatch Mission Tactics",
      "det": "Ordo Xenos, Alien Hunters",
      "ref": {
        "kind": "detachmentRule",
        "det": "ordo-xenos-alien-hunters"
      },
      "hash": "6d06128c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while the Furor Tactics Mission Tactic is active",
            "ru": "пока активна тактика Furor Tactics"
          },
          "cond": [
            "tactic-furor"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while the Malleus Tactics Mission Tactic is active",
            "ru": "пока активна тактика Malleus Tactics"
          },
          "cond": [
            "tactic-malleus"
          ]
        }
      ]
    },
    {
      "sid": "4e34ecd7-53de-4493-8468-666e9bd1d875",
      "kind": "detachmentRule",
      "name": "Extremis Sanction",
      "det": "Veiled Blade Elimination Force",
      "ref": {
        "kind": "detachmentRule",
        "det": "veiled-blade-elimination-force"
      },
      "hash": "1c7e84e4",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c994437c-491b-40e6-b0f2-de686fdc461c",
      "kind": "enhancement",
      "name": "Clandestine Operation",
      "det": "Imperialis Fleet",
      "ref": {
        "kind": "enhancement",
        "det": "imperialis-fleet"
      },
      "hash": "4e6f00a6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "eecfa9a1-38bf-4ece-993b-b2ce3f595fad",
      "kind": "enhancement",
      "name": "Combat Landers",
      "det": "Imperialis Fleet",
      "ref": {
        "kind": "enhancement",
        "det": "imperialis-fleet"
      },
      "hash": "83c16170",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c03746fa-d420-4d0a-b792-5fe5b1e1be66",
      "kind": "enhancement",
      "name": "Ignis Judicium",
      "det": "Ordo Hereticus, Purgation Force",
      "ref": {
        "kind": "enhancement",
        "det": "ordo-hereticus-purgation-force"
      },
      "hash": "024b237f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "MELTA 1",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": null
        }
      ]
    },
    {
      "sid": "20cc49fb-5221-4dcf-b631-b116a84b02c3",
      "kind": "enhancement",
      "name": "Daemon Slayer",
      "det": "Ordo Malleus, Daemon Hunters",
      "hash": "c4f1ac1e",
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
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-DAEMON 3+",
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "ordo-malleus-daemon-hunters"
      }
    },
    {
      "sid": "65ac2883-9467-4478-847c-55858dde8251",
      "kind": "enhancement",
      "name": "Formidable Resolve",
      "det": "Ordo Malleus, Daemon Hunters",
      "hash": "46a46316",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": null
        },
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "ordo-malleus-daemon-hunters"
      }
    },
    {
      "sid": "43034cd6-adca-4c3f-a1ca-2cc5274871f2",
      "kind": "enhancement",
      "name": "Grimoire of True Names (Aura)",
      "det": "Ordo Malleus, Daemon Hunters",
      "hash": "77f50fbb",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "ordo-malleus-daemon-hunters"
      }
    },
    {
      "sid": "ab3c3644-1c9d-4cd8-9c6f-8022be72daee",
      "kind": "enhancement",
      "name": "Beacon Angelis",
      "det": "Ordo Xenos, Alien Hunters",
      "ref": {
        "kind": "enhancement",
        "det": "ordo-xenos-alien-hunters"
      },
      "hash": "c5b989c7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "14192d59-f64c-484c-a1b5-f31eeb356288",
      "kind": "enhancement",
      "name": "Blackweave Shroud",
      "det": "Ordo Xenos, Alien Hunters",
      "ref": {
        "kind": "enhancement",
        "det": "ordo-xenos-alien-hunters"
      },
      "hash": "5ab93aa4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+",
          "when": null
        }
      ]
    },
    {
      "sid": "853414cb-e3c5-4543-a1cd-3ef2101c6682",
      "kind": "enhancement",
      "name": "Universal Anathema",
      "det": "Ordo Xenos, Alien Hunters",
      "ref": {
        "kind": "enhancement",
        "det": "ordo-xenos-alien-hunters"
      },
      "hash": "ae5663cb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-INFANTRY 2+",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-MONSTER 4+",
          "when": null
        }
      ]
    },
    {
      "sid": "aa4924d4-a606-4e06-9da3-b1467cd20ebb",
      "kind": "enhancement",
      "name": "Micromelta Rounds",
      "det": "Veiled Blade Elimination Force",
      "ref": {
        "kind": "enhancement",
        "det": "veiled-blade-elimination-force"
      },
      "hash": "28d383b3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-MONSTER 4+",
          "only": {
            "name": "Exitus rifle"
          },
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-VEHICLE 4+",
          "only": {
            "name": "Exitus rifle"
          },
          "when": null
        }
      ]
    },
    {
      "sid": "0671736d-e932-4396-85e8-7aed0f5fbbf0",
      "kind": "stratagem",
      "name": "Close-quarters Barrage",
      "det": "Imperialis Fleet",
      "ref": {
        "kind": "stratagem",
        "det": "imperialis-fleet",
        "name": "Close-quarters Barrage"
      },
      "hash": "7a1247be",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
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
          "on": "ranged",
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
      "sid": "3b79b387-0009-4617-9ce3-c07efe843e8d",
      "kind": "stratagem",
      "name": "Displacer Field",
      "det": "Imperialis Fleet",
      "ref": {
        "kind": "stratagem",
        "det": "imperialis-fleet",
        "name": "Displacer Field"
      },
      "hash": "1326869d",
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
      "sid": "a3e18b4f-0acc-4b1f-847d-1ce78c4af55b",
      "kind": "stratagem",
      "name": "Selfless Bodyguard",
      "det": "Imperialis Fleet",
      "ref": {
        "kind": "stratagem",
        "det": "imperialis-fleet",
        "name": "Selfless Bodyguard"
      },
      "hash": "e2841d92",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d8ce9636-0f38-40be-8918-76c5597c91d3",
      "kind": "stratagem",
      "name": "Violent Acquisition",
      "det": "Imperialis Fleet",
      "ref": {
        "kind": "stratagem",
        "det": "imperialis-fleet",
        "name": "Violent Acquisition"
      },
      "hash": "c71b6a30",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "against a unit within range of an objective marker",
            "ru": "по отряду в зоне objective marker"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": {
            "en": "against a unit within range of an objective marker",
            "ru": "по отряду в зоне objective marker"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
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
      ],
      "dur": "phase"
    },
    {
      "sid": "741664f3-5afd-4ff1-819b-7f4275d075fa",
      "kind": "stratagem",
      "name": "Superior Weaponry",
      "det": "Inquisitor’s Hand",
      "ref": null,
      "hash": "93165ff9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
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
      "sid": "53b6c4d3-7b4d-4aac-b53f-d9325c617c9b",
      "kind": "stratagem",
      "name": "Urban Enforcers",
      "det": "Inquisitor’s Hand",
      "ref": null,
      "hash": "975b05f7",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b3c0a844-4b92-48dc-8ca3-6d169a5fe918",
      "kind": "stratagem",
      "name": "Dispense Justice",
      "det": "Ordo Hereticus, Purgation Force",
      "ref": {
        "kind": "stratagem",
        "det": "ordo-hereticus-purgation-force",
        "name": "Dispense Justice"
      },
      "hash": "99f3de63",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "51d5caed-b41a-4bac-a398-a0458cbed119",
      "kind": "stratagem",
      "name": "Execution Order",
      "det": "Ordo Hereticus, Purgation Force",
      "ref": {
        "kind": "stratagem",
        "det": "ordo-hereticus-purgation-force",
        "name": "Execution Order"
      },
      "hash": "eaecd977",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "against the CHARACTER this stratagem named",
            "ru": "против CHARACTER, названного стратагемой"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "round"
    },
    {
      "sid": "cbd2a41a-d9c0-444b-ac39-82079d07fcca",
      "kind": "stratagem",
      "name": "Inviolate Jurisdiction",
      "det": "Ordo Hereticus, Purgation Force",
      "ref": {
        "kind": "stratagem",
        "det": "ordo-hereticus-purgation-force",
        "name": "Inviolate Jurisdiction"
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
      "sid": "aa2b5fe6-cfe5-46f6-b3bd-2a525e755ab2",
      "kind": "stratagem",
      "name": "Hexagrammic Wards",
      "det": "Ordo Malleus, Daemon Hunters",
      "ref": {
        "kind": "stratagem",
        "det": "ordo-malleus-daemon-hunters",
        "name": "Hexagrammic Wards"
      },
      "hash": "50036792",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "14441c71-f592-476f-96b0-e0e8b2d7b4f2",
      "kind": "stratagem",
      "name": "Psybolt Ammunition",
      "det": "Ordo Malleus, Daemon Hunters",
      "ref": {
        "kind": "stratagem",
        "det": "ordo-malleus-daemon-hunters",
        "name": "Psybolt Ammunition"
      },
      "hash": "98b02112",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "PSYCHIC",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "d79ad24e-26e3-4049-bcfa-95132cd95810",
      "kind": "stratagem",
      "name": "Rites of Exorcism",
      "det": "Ordo Malleus, Daemon Hunters",
      "ref": {
        "kind": "stratagem",
        "det": "ordo-malleus-daemon-hunters",
        "name": "Rites of Exorcism"
      },
      "hash": "23bf6dc9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "against the marked enemy unit",
            "ru": "по отмеченному вражескому отряду"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "4191fc9b-51ff-4fd7-ba42-fbc7b0d5a138",
      "kind": "stratagem",
      "name": "Truesilver Armour",
      "det": "Ordo Malleus, Daemon Hunters",
      "ref": {
        "kind": "stratagem",
        "det": "ordo-malleus-daemon-hunters",
        "name": "Truesilver Armour"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3c71b9ec-b40c-44e1-9daa-fd22abee459f",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Ordo Xenos, Alien Hunters",
      "ref": {
        "kind": "stratagem",
        "det": "ordo-xenos-alien-hunters",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "78859713-cdea-4729-815f-91a9d8c94491",
      "kind": "stratagem",
      "name": "Dragonfire Rounds",
      "det": "Ordo Xenos, Alien Hunters",
      "ref": {
        "kind": "stratagem",
        "det": "ordo-xenos-alien-hunters",
        "name": "Dragonfire Rounds"
      },
      "hash": "c741719e",
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
        },
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
      "sid": "a8dc46f8-40e0-4820-90ec-cf475621a130",
      "kind": "stratagem",
      "name": "Hellfire Rounds",
      "det": "Ordo Xenos, Alien Hunters",
      "ref": {
        "kind": "stratagem",
        "det": "ordo-xenos-alien-hunters",
        "name": "Hellfire Rounds"
      },
      "hash": "c1d7b05d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-INFANTRY 2+",
          "when": null,
          "only": {
            "notTag": "DEVASTATING WOUNDS"
          }
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-MONSTER 5+",
          "when": null,
          "only": {
            "notTag": "DEVASTATING WOUNDS"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "30ea96b9-4327-4f32-8c09-ac1de917be40",
      "kind": "stratagem",
      "name": "Kraken Rounds",
      "det": "Ordo Xenos, Alien Hunters",
      "ref": {
        "kind": "stratagem",
        "det": "ordo-xenos-alien-hunters",
        "name": "Kraken Rounds"
      },
      "hash": "7afed4a4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 6,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "82047dbf-135c-4375-b0cb-6e3ce35037fe",
      "kind": "stratagem",
      "name": "Ensnaring Trap",
      "det": "Veiled Blade Elimination Force",
      "ref": {
        "kind": "stratagem",
        "det": "veiled-blade-elimination-force",
        "name": "Ensnaring Trap"
      },
      "hash": "f1ef0cb5",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ba362a01-cce9-4344-b5d2-259651658189",
      "kind": "stratagem",
      "name": "Hyperstimms",
      "det": "Veiled Blade Elimination Force",
      "ref": {
        "kind": "stratagem",
        "det": "veiled-blade-elimination-force",
        "name": "Hyperstimms"
      },
      "hash": "96d8e448",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
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
      "sid": "607a4536-6c68-4bf8-ad36-382e18c16d12",
      "kind": "stratagem",
      "name": "Orbital Oversight",
      "det": "Veiled Blade Elimination Force",
      "ref": {
        "kind": "stratagem",
        "det": "veiled-blade-elimination-force",
        "name": "Orbital Oversight"
      },
      "hash": "f0f985fa",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f05e1f04-a826-41ea-942a-0ab6e6048212",
      "kind": "stratagem",
      "name": "Will-sapping Salvo",
      "det": "Veiled Blade Elimination Force",
      "ref": {
        "kind": "stratagem",
        "det": "veiled-blade-elimination-force",
        "name": "Will-sapping Salvo"
      },
      "hash": "e412350c",
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
      "sid": "bd82612d-1cc5-4408-bcdb-43affb04b068:aquila-kill-team",
      "kind": "wargear",
      "name": "Aquila Kill Team: Astartes shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "aquila-kill-team",
        "item": "astartes shield"
      },
      "hash": "5e0ca50d",
      "ver": 925,
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
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "f7579dbf-b927-430a-8da6-c82b100cc0ba:corvus-blackstar",
      "kind": "wargear",
      "name": "Corvus Blackstar: Auspex Array",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "corvus-blackstar",
        "item": "auspex array"
      },
      "hash": "a8073fac",
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
      "sid": "d5028f22-7248-4d7e-8550-23ebbf37c0a5:corvus-blackstar",
      "kind": "wargear",
      "name": "Corvus Blackstar: Infernum Halo-launcher",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "corvus-blackstar",
        "item": "infernum halo-launcher"
      },
      "hash": "46cafc31",
      "ver": 925,
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
      "sid": "bd82612d-1cc5-4408-bcdb-43affb04b068:deathwatch-kill-team",
      "kind": "wargear",
      "name": "Deathwatch Kill Team: Astartes shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "deathwatch-kill-team",
        "item": "astartes shield"
      },
      "hash": "5e0ca50d",
      "ver": 925,
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
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "bde4aec2-30a1-4d29-a294-e5c220d4c16b:exaction-squad",
      "kind": "wargear",
      "name": "Exaction Squad: Soulguilt Scanner",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "exaction-squad",
        "item": "soulguilt scanner"
      },
      "hash": "c40143bc",
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
      "sid": "314a4643-59ab-4fd8-a1a8-d05172bb2070:grey-knights-terminator-squad",
      "kind": "wargear",
      "name": "Grey Knights Terminator Squad: Ancient’s Banner",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "grey-knights-terminator-squad",
        "item": "ancient's banner"
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
    },
    {
      "sid": "074ac92a-0ebc-4951-8e67-e459cb11bae3:imperial-navy-breachers",
      "kind": "wargear",
      "name": "Imperial Navy Breachers: Endurant Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "imperial-navy-breachers",
        "item": "endurant shield"
      },
      "hash": "5e0ca50d",
      "ver": 925,
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
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "4c0dbe01-e4a8-4fd5-992b-f35d5ef423a4:inquisitor",
      "kind": "wargear",
      "name": "Inquisitor: Blessed Wardings",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "inquisitor",
        "item": "blessed wardings"
      },
      "hash": "bda848a8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "6+",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "a49e2a76-e166-4227-965c-ad9b4ef36f1f:inquisitor",
      "kind": "wargear",
      "name": "Inquisitor: Psychic Gifts",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "inquisitor",
        "item": "psychic gifts"
      },
      "hash": "a7eed996",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Psyker",
          "when": null
        }
      ]
    },
    {
      "sid": "34c3c209-6c20-4bfd-941b-5cf6224c3011:sanctifiers",
      "kind": "wargear",
      "name": "Sanctifiers: Simulacrum Imperialis",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "sanctifiers",
        "item": "simulacrum imperialis"
      },
      "hash": "f2b9e017",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "34c3c209-6c20-4bfd-941b-5cf6224c3011:sisters-of-battle-squad",
      "kind": "wargear",
      "name": "Sisters of Battle Squad: Simulacrum Imperialis",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "sisters-of-battle-squad",
        "item": "simulacrum imperialis"
      },
      "hash": "f2b9e017",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": null
        }
      ]
    }
  ]
}

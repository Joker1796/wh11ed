// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "tyranids",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "29d995ea-bdc6-4d3b-8522-c44fe075cbf4:broodlord",
      "kind": "ability",
      "name": "Broodlord: Vicious Insight",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "broodlord"
      },
      "hash": "0b72b958",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "811b5896-9f7a-4e94-b76b-fedee0d1012d:deathleaper",
      "kind": "ability",
      "name": "Deathleaper: Fear of the Unseen",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "deathleaper"
      },
      "hash": "6050114a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c5b81258-aab6-43c4-aa89-38de9e2b7369:harridan",
      "kind": "ability",
      "name": "Harridan: Frenzied Metabolism",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "harridan"
      },
      "hash": "6f28d8bd",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "062d7126-5b04-4fa6-842a-76c2e8342ad4:hierophant",
      "kind": "ability",
      "name": "Hierophant: Apex-beast",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "hierophant"
      },
      "hash": "7e324fcd",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "82f6447f-7c85-4d0f-bcb7-d2a7b50b3ae2:hive-crone",
      "kind": "ability",
      "name": "Hive Crone: Airborne Predator",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "hive-crone"
      },
      "hash": "205860ae",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "6f643de5-2411-4317-b8a8-ae21dc77a54f:hive-tyrant",
      "kind": "ability",
      "name": "Hive Tyrant: Onslaught",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "hive-tyrant"
      },
      "hash": "c3c5f43f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "effbe0ed-d0b2-45d4-9beb-f22ccb9541d1:hyperadapted-raveners",
      "kind": "ability",
      "name": "Hyperadapted Raveners: Alpha Invader",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "hyperadapted-raveners"
      },
      "hash": "eea1dfa0",
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
      "sid": "474971c2-032e-4663-89c0-43d3bc98f7ed:neurogaunts",
      "kind": "ability",
      "name": "Neurogaunts: Neurocytes",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "neurogaunts"
      },
      "hash": "32de5345",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Synapse",
          "when": {
            "en": "while within Synapse Range of another friendly TYRANIDS unit",
            "ru": "пока в Synapse Range другого дружественного отряда TYRANIDS"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "56b79d30-49bc-4d2f-899e-8fdb903b79c7:neurolictor",
      "kind": "ability",
      "name": "Neurolictor: Psychological Saboteur",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "neurolictor"
      },
      "hash": "84cc5836",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "31ef5be8-4d51-474f-9d3c-4751bc40009c:neurotyrant",
      "kind": "ability",
      "name": "Neurotyrant: Node Lash",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "neurotyrant"
      },
      "hash": "c383be03",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "73a70679-e107-49b7-8667-25145e5cbe27:psychophage",
      "kind": "ability",
      "name": "Psychophage: Bio-stimulus",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "psychophage"
      },
      "hash": "ebfcffb6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4c3112f4-3120-4d83-8681-1567dd43d530:psychophage",
      "kind": "ability",
      "name": "Psychophage: Feeding Frenzy",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "psychophage"
      },
      "hash": "7a3f82bb",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "289b90e7-c0db-414a-b91f-c8efeee56368:tervigon",
      "kind": "ability",
      "name": "Tervigon: Brood Progenitor",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tervigon"
      },
      "hash": "94e34790",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4a6ac461-9519-49b5-82f0-d9730df70ec7:tyranid-prime-with-lash-whip",
      "kind": "ability",
      "name": "Tyranid Prime with Lash Whip: Alpha Warrior",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tyranid-prime-with-lash-whip"
      },
      "hash": "f1bef6b4",
      "ver": 925,
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
      "sid": "15dc61c6-ab64-417c-a248-fc994a04c43d:tyranid-warriors-with-melee-bio-weapons",
      "kind": "ability",
      "name": "Tyranid Warriors with Melee Bio-weapons: Adaptive Instincts (Once per turn, per unit)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tyranid-warriors-with-melee-bio-weapons"
      },
      "hash": "be824182",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per turn, if this option is chosen",
            "ru": "раз за ход, если выбран этот вариант"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per turn, if this option is chosen instead",
            "ru": "раз за ход, если выбран другой вариант"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "fbb597fc-642e-4616-bb1c-441dc9eaad5a:vardenghast-swarm-barbgaunts",
      "kind": "ability",
      "name": "Vardenghast Swarm Barbgaunts: Disruption Bombardment",
      "det": null,
      "ref": null,
      "hash": "3b43c984",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "aff2ee6c-b954-4ece-8e66-94bde66f814c:winged-tyranid-prime",
      "kind": "ability",
      "name": "Winged Tyranid Prime: Alpha Warrior",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "winged-tyranid-prime"
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
      "sid": "68090d9e-d603-4069-97f1-a23b8e6ff93f:zoanthropes",
      "kind": "ability",
      "name": "Zoanthropes: Warp Field",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "zoanthropes"
      },
      "hash": "1dd47c6d",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3f3be044-118e-4050-9d01-a25cefc64f4c",
      "kind": "allegiance",
      "name": "Subterranean Assault Keywords: Character",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "subterranean-assault-keywords",
        "opt": "Character"
      },
      "hash": "4f633c25",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "the keyword this grants is applied by the roster layer itself (rosterEngine's allegKeyword feeds DatasheetCard's grantedKeywords), so recording it here too would show it twice; no printed number changes"
    },
    {
      "sid": "240938cb-e469-415e-a2d3-1876d95a75c8",
      "kind": "armyRule",
      "name": "Synapse",
      "det": null,
      "hash": "9612d927",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "per melee attack, while the unit is within Synapse Range of your army",
            "ru": "за атаку ближнего боя, пока отряд в радиусе синапса вашей армии"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "6fdc5e01-fce9-4451-ba94-b2cfe91aff19",
      "kind": "detachmentRule",
      "name": "Enraged Behemoths",
      "det": "Crusher Stampede",
      "hash": "0d06a902",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Monster units at their Starting Strength and not Battle-shocked",
            "ru": "отряды Monster в полной численности и не Battle-shocked"
          },
          "cond": [
            "unit-at-starting-strength",
            "unit-not-battle-shocked"
          ],
          "scope": 1
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "crusher-stampede"
      }
    },
    {
      "sid": "547b0295-bdc0-42db-8b31-dc2af65b3fe3",
      "kind": "detachmentRule",
      "name": "Synaptic Imperatives",
      "det": "Synaptic Nexus",
      "hash": "fc5e5b4d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "while the Synaptic Augmentation Imperative is active and the unit is within Synapse Range",
            "ru": "пока активен императив Synaptic Augmentation и отряд в радиусе синапса"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "synaptic-nexus"
      }
    },
    {
      "sid": "c96ad299-23ee-4528-9b36-00173e02299d",
      "kind": "enhancement",
      "name": "Parasitic Biomorphology",
      "det": "Assimilation Swarm",
      "hash": "f6b213d9",
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
          "when": {
            "en": "until the end of the battle, after the unit first destroys an enemy in the Fight phase while the bearer is within 6\" of a Harvester unit",
            "ru": "до конца битвы, после того как отряд впервые уничтожит врага в фазе боя, пока носитель в 6\" от отряда Harvester"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "assimilation-swarm"
      }
    },
    {
      "sid": "3737cbb7-dfcf-494b-abdc-6f1fc7e2fff8",
      "kind": "enhancement",
      "name": "Monstrous Nemesis",
      "det": "Crusher Stampede",
      "hash": "774614c0",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "crusher-stampede"
      }
    },
    {
      "sid": "87509b4c-bbec-4bef-8ffe-c9d57a9351b4",
      "kind": "enhancement",
      "name": "Ominous Presence",
      "det": "Crusher Stampede",
      "hash": "5444ec73",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 3,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "crusher-stampede"
      }
    },
    {
      "sid": "e39bb599-731d-4f13-855f-50b8508438af",
      "kind": "enhancement",
      "name": "Trygon Prime",
      "det": "Subterranean Assault",
      "hash": "5834f881",
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
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": null
        },
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Synapse",
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "subterranean-assault"
      }
    },
    {
      "sid": "4f45ef1c-63c7-4d7d-af65-bdd6a59b47e6",
      "kind": "enhancement",
      "name": "Power of the Hive Mind",
      "det": "Synaptic Nexus",
      "hash": "041e5a72",
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
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null,
          "only": {
            "tag": "PSYCHIC"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "synaptic-nexus"
      }
    },
    {
      "sid": "0666139a-ab22-4c98-9219-e369924291bf",
      "kind": "enhancement",
      "name": "Destabilising Predation (Upgrade)",
      "det": "Talons of the Norn Queen",
      "ref": {
        "kind": "enhancement",
        "det": "talons-of-the-norn-queen"
      },
      "hash": "a6b59501",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-CHARACTER 2+",
          "when": null
        }
      ]
    },
    {
      "sid": "daa414da-bd09-463e-8902-56e77b682488",
      "kind": "enhancement",
      "name": "Adapted Organism",
      "det": "The Vardenghast Swarm",
      "ref": null,
      "hash": "5d878816",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -2,
          "when": null
        }
      ]
    },
    {
      "sid": "71b8e917-4924-4aea-93e9-ab17e7314061",
      "kind": "enhancement",
      "name": "Piercing Talons",
      "det": "Unending Swarm",
      "hash": "b82ae6f6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "per attack that scores a Critical Wound",
            "ru": "за атаку с критическим ранением"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "unending-swarm"
      }
    },
    {
      "sid": "ca23547e-5dcc-4966-a7c2-219045fa2f76",
      "kind": "enhancement",
      "name": "Relentless Hunger",
      "det": "Unending Swarm",
      "ref": {
        "kind": "enhancement",
        "det": "unending-swarm"
      },
      "hash": "103d14ec",
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
      "sid": "e93d1916-52d5-4c51-a097-c89a1b1783a9",
      "kind": "enhancement",
      "name": "Stalker",
      "det": "Vanguard Onslaught",
      "hash": "aab0e8d9",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "vanguard-onslaught"
      }
    },
    {
      "sid": "92603e22-71b4-4e0a-a15f-99f2a81056b5",
      "kind": "enhancement",
      "name": "Elevated Might",
      "det": "Warrior Bioform Onslaught",
      "ref": {
        "kind": "enhancement",
        "det": "warrior-bioform-onslaught"
      },
      "hash": "c617aabb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null
        }
      ]
    }
  ]
}

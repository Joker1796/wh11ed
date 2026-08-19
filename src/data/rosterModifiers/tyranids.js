// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "tyranids",
  "formatVersion": 1,
  "entries": [
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
          }
        }
      ],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "96fc8e70-8686-4e12-be1e-2eec1632888f",
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
          }
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
          }
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
          }
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
          }
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
          "when": {
            "en": "the bearer's psychic weapons only",
            "ru": "только психическое оружие носителя"
          }
        },
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "the bearer's psychic weapons only",
            "ru": "только психическое оружие носителя"
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
      "reviewed": false,
      "effects": []
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
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "unending-swarm"
      }
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
    }
  ]
}

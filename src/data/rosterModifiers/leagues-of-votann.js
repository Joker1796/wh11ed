// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "leagues-of-votann",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "da8ebbc2-fd92-49fc-993a-e14833cb4874:arkanyst-evaluator",
      "kind": "ability",
      "name": "Arkanyst Evaluator: Resource Transmutation",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "arkanyst-evaluator"
      },
      "hash": "d718d1bf",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "91160a46-f367-4dcd-9bfd-87f437903d94:bane-slayer-s-bulwark-brokhyr-thunderkyn",
      "kind": "ability",
      "name": "Bane Slayer's Bulwark Brokhyr Thunderkyn: Breaching Fire",
      "det": null,
      "ref": null,
      "hash": "3df82845",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "773edacf-28fd-4694-96ab-306ef6329ae6:berehk-stornbr-w",
      "kind": "ability",
      "name": "Berehk Stornbröw: Break the Foe",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "berehk-stornbr-w"
      },
      "hash": "cedc10d8",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "72f9560a-4651-44e7-a8e3-cd7ba5c9df96:einhyr-champion",
      "kind": "ability",
      "name": "Einhyr Champion: Exemplar of the Einhyr",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "einhyr-champion"
      },
      "hash": "2170496e",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "28f010a7-1c57-498f-8587-5edf804ace65:k-hl",
      "kind": "ability",
      "name": "Kâhl: Kindred Hero",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "k-hl"
      },
      "hash": "abe50645",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "7342cf80-6585-4570-bd7e-a26d2c8a584b:vynn-bane-slayer",
      "kind": "ability",
      "name": "Vynn Bane-Slayer: Fast-firing Targeters",
      "det": null,
      "ref": null,
      "hash": "4b9d39f6",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "a23f8bdf-5c65-4c96-90b6-1b93696cc5f3",
      "kind": "armyRule",
      "name": "Prioritised Efficiency",
      "det": null,
      "hash": "1ba9c15b",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "182bd5d6-3bd6-4d04-b108-557182b698e6",
      "kind": "detachmentRule",
      "name": "Mobile Sensor Relays",
      "det": "Brandfast Oathband",
      "ref": {
        "kind": "detachmentRule",
        "det": "brandfast-oathband"
      },
      "hash": "4a2fd680",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "fdfc7863-9632-43df-88dd-2e2fda4a6dfa",
      "kind": "detachmentRule",
      "name": "Methodical Annihilation",
      "det": "Hearthband",
      "hash": "28d11aec",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "Kâhl, Einhyr Hearthguard and Ûthar units only, per attack against the closest eligible target or a target in Engagement Range",
            "ru": "только отряды Kâhl, Einhyr Hearthguard и Ûthar, за атаку по ближайшей допустимой цели или цели в радиусе боя"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "hearthband"
      }
    },
    {
      "sid": "27e25b2c-5cf3-47df-8e2b-a3dff31cdd95",
      "kind": "enhancement",
      "name": "Saturation Rounds (Upgrade)",
      "det": "Armoured Trailblazers",
      "ref": {
        "kind": "enhancement",
        "det": "armoured-trailblazers"
      },
      "hash": "42ae7259",
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
      "sid": "f8a1fc4c-65b9-466e-90b7-eb939120033c",
      "kind": "enhancement",
      "name": "Brôkhyr Barrage",
      "det": "Bane-slayer’s Bulwark",
      "ref": null,
      "hash": "55ba556e",
      "ver": 925,
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
      "sid": "35318eb6-0912-4912-9d7a-ddd32af5c735",
      "kind": "enhancement",
      "name": "Trivärg Cyber Implant",
      "det": "Brandfast Oathband",
      "ref": {
        "kind": "enhancement",
        "det": "brandfast-oathband"
      },
      "hash": "d025af04",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 2",
          "when": {
            "en": "in your Shooting phase, if the unit disembarked from a Transport this turn or you spend 2YP",
            "ru": "в вашей фазе стрельбы, если отряд высадился из Transport в этом ходу или потрачено 2YP"
          },
          "cond": [
            "phase-shooting",
            "unit-disembarked"
          ]
        }
      ]
    },
    {
      "sid": "ab0a026e-6604-4425-8a3f-7adff3375e2d",
      "kind": "enhancement",
      "name": "Quake Supervisor",
      "det": "Dêlve Assault Shift",
      "hash": "c342f7bd",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "delve-assault-shift"
      }
    },
    {
      "sid": "b39ba051-9928-4883-8783-40a27ff07d66",
      "kind": "enhancement",
      "name": "Bastion Shield",
      "det": "Hearthband",
      "hash": "9984e1ee",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "hearthband"
      }
    },
    {
      "sid": "f7cc3d3b-4d28-4911-8718-85f6c4043c8c",
      "kind": "enhancement",
      "name": "Ironskein",
      "det": "Hearthband",
      "hash": "045363a2",
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
        "det": "hearthband"
      }
    },
    {
      "sid": "b48ffd02-ce7e-41c0-aa75-fc375e1fe200",
      "kind": "enhancement",
      "name": "Calculated Tenacity",
      "det": "Hearthfyre Arsenal",
      "hash": "e0b9192b",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
        "det": "hearthfyre-arsenal"
      }
    },
    {
      "sid": "e39596ad-bfd4-4548-b115-a5d5f63a2fba",
      "kind": "enhancement",
      "name": "Ironskein",
      "det": "Hearthguard Covenant",
      "ref": {
        "kind": "enhancement",
        "det": "hearthguard-covenant"
      },
      "hash": "4c18222c",
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
      ]
    },
    {
      "sid": "dcc9fd81-0cb0-477b-9941-5f05fedf753f",
      "kind": "enhancement",
      "name": "Oathbound Speculator",
      "det": "Needgaârd Oathband",
      "hash": "641b2548",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "needgaard-oathband"
      }
    },
    {
      "sid": "cbcb0741-dced-40e8-99ab-9628de3fb0ac",
      "kind": "enhancement",
      "name": "Eye for Weakness",
      "det": "Persecution Prospect",
      "hash": "091ebe34",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "persecution-prospect"
      }
    }
  ]
}

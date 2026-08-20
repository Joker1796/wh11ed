// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "leagues-of-votann",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "f9aa12c0-37ad-4cbd-ad9f-d93f664dffa5",
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

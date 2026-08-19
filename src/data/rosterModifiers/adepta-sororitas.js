// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "adepta-sororitas",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "cf5a5f6f-6690-416e-816e-f519b647adb8",
      "kind": "detachmentRule",
      "name": "Fervent Purgation",
      "det": "Bringers of Flame",
      "hash": "fb50d154",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "per attack against a unit within 6\"",
            "ru": "за атаку по отряду в пределах 6\""
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "bringers-of-flame"
      }
    },
    {
      "sid": "7c3dcef7-9883-4679-9de6-7289c696c901",
      "kind": "detachmentRule",
      "name": "Righteous Purpose",
      "det": "Champions of Faith",
      "hash": "dcda4edb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the unit is Righteous (selected in your Command phase)",
            "ru": "пока отряд Righteous (выбран в вашей фазе командования)"
          }
        },
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while the unit is Righteous (selected in your Command phase)",
            "ru": "пока отряд Righteous (выбран в вашей фазе командования)"
          }
        },
        {
          "on": "weapon",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "Battle Sisters Squad, Celestian Sacresants and Paragon Warsuits models only, while the unit is Righteous",
            "ru": "только модели Battle Sisters Squad, Celestian Sacresants и Paragon Warsuits, пока отряд Righteous"
          }
        },
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "Battle Sisters Squad, Celestian Sacresants and Paragon Warsuits models only, while the unit is Righteous",
            "ru": "только модели Battle Sisters Squad, Celestian Sacresants и Paragon Warsuits, пока отряд Righteous"
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "champions-of-faith"
      }
    },
    {
      "sid": "de580a83-e1b2-4ddd-bd86-450d27e98f32",
      "kind": "detachmentRule",
      "name": "The Blood of Martyrs",
      "det": "Hallowed Martyrs",
      "hash": "7f2e37a7",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "hallowed-martyrs"
      }
    },
    {
      "sid": "b37890cc-d1f6-460f-ae40-745b6a738e9d",
      "kind": "detachmentRule",
      "name": "Desperate For Redemption",
      "det": "Penitent Host",
      "hash": "4c323b64",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 3,
          "when": {
            "en": "Penitent models, while the Path of the Penitent Vow is active",
            "ru": "модели Penitent, пока активен обет Path of the Penitent"
          }
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Penitent models, while Absolution in Battle is active and the unit made a Charge move",
            "ru": "модели Penitent, пока активен Absolution in Battle и отряд совершил чардж"
          }
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Penitent models, while Absolution in Battle is active and the unit made a Charge move",
            "ru": "модели Penitent, пока активен Absolution in Battle и отряд совершил чардж"
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "penitent-host"
      }
    },
    {
      "sid": "1183f5f4-7242-46ba-80c1-2be89be8c9db",
      "kind": "enhancement",
      "name": "Blade of Saint Ellynor",
      "det": "Army of Faith",
      "hash": "2dc89a44",
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
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "army-of-faith"
      }
    },
    {
      "sid": "153f8261-4beb-4114-9a4a-f82ff261947e",
      "kind": "enhancement",
      "name": "Fire and Fury",
      "det": "Bringers of Flame",
      "hash": "2cec313b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Torrent weapons only, while the bearer is leading the unit",
            "ru": "только оружие Torrent, пока носитель ведёт отряд"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "bringers-of-flame"
      }
    },
    {
      "sid": "c2118c7b-986c-47cb-b2f5-3c82d77dde0f",
      "kind": "enhancement",
      "name": "Righteous Rage",
      "det": "Bringers of Flame",
      "hash": "11498b83",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "per Miracle dice discarded when the bearer fights, up to 3",
            "ru": "за каждую сброшенную кость чуда при выборе носителя для боя, до 3"
          }
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "per Miracle dice discarded when the bearer fights, up to 3",
            "ru": "за каждую сброшенную кость чуда при выборе носителя для боя, до 3"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "bringers-of-flame"
      }
    },
    {
      "sid": "6d1771ba-9974-4593-aef1-ddcf25f7865c",
      "kind": "enhancement",
      "name": "Mark of Devotion",
      "det": "Champions of Faith",
      "hash": "db66fbb9",
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
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "instead, plus +1 Damage, while the bearer's unit is Righteous",
            "ru": "вместо этого, плюс +1 к урону, пока отряд носителя Righteous"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "champions-of-faith"
      }
    },
    {
      "sid": "ae5538f8-1681-4fdd-9cdc-2605f8847aa6",
      "kind": "enhancement",
      "name": "Through Suffering, Strength",
      "det": "Hallowed Martyrs",
      "hash": "4c5bff2d",
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
          "stat": "s",
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
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Attacks, Strength and Damage +2 instead, if the bearer has lost one or more wounds",
            "ru": "атаки, сила и урон +2 вместо +1, если носитель потерял хотя бы одну рану"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "hallowed-martyrs"
      }
    },
    {
      "sid": "1f93ff0c-b24e-4da3-9911-8bcc1e169cbf",
      "kind": "enhancement",
      "name": "Refrain of Enduring Faith",
      "det": "Penitent Host",
      "hash": "734f607c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "while the bearer is leading the unit",
            "ru": "пока носитель ведёт отряд"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "penitent-host"
      }
    }
  ]
}

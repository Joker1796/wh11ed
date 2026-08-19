// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "black-templars",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "8e6d6b91-009d-47d1-81d7-390c60556cb3",
      "kind": "armyRule",
      "name": "Templar Vows",
      "det": null,
      "hash": "335409cc",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "f4c13fe5-b2c6-49d9-a532-d4cdc71e2094",
      "kind": "armyRule",
      "name": "Templar Vows",
      "det": null,
      "hash": "959ac12a",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "6c1960c0-fdef-41a7-a017-cda5d322bd74",
      "kind": "detachmentRule",
      "name": "Shock and Awe",
      "det": "Godhammer Assault Force",
      "hash": "fa300e3c",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "godhammer-assault-force"
      }
    },
    {
      "sid": "741a30dc-8a63-45a5-8b27-9ba235c49bda",
      "kind": "enhancement",
      "name": "Incendiary Animus",
      "det": "Companions of Vehemence",
      "hash": "384b0cf5",
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
      ],
      "ref": {
        "kind": "enhancement",
        "det": "companions-of-vehemence"
      }
    },
    {
      "sid": "44d03a4a-13a9-494e-8769-269187496002",
      "kind": "enhancement",
      "name": "Oathbound Exemplar",
      "det": "Companions of Vehemence",
      "hash": "d3bb5f33",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "companions-of-vehemence"
      }
    },
    {
      "sid": "69ab0beb-af42-4edc-a124-4e2b99fd3a1a",
      "kind": "enhancement",
      "name": "Paragon of Fury",
      "det": "Godhammer Assault Force",
      "hash": "922fa85d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": null
        },
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "per allocated melee attack, if the bearer disembarked from a Transport this turn",
            "ru": "за назначенную атаку ближнего боя, если носитель в этом ходу высадился из транспорта"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "godhammer-assault-force"
      }
    },
    {
      "sid": "8f0c23c2-bec3-4dce-916e-ae9164dfe77f",
      "kind": "enhancement",
      "name": "Consecrating Aura",
      "det": "Vindication Task Force",
      "hash": "8875c16b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "vindication-task-force"
      }
    },
    {
      "sid": "eef35b1c-9069-43b3-a82d-a795edfef746",
      "kind": "enhancement",
      "name": "Warden of Honour",
      "det": "Vindication Task Force",
      "hash": "685d2c48",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "vindication-task-force"
      }
    }
  ]
}

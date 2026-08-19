// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "imperial-agents",
  "formatVersion": 1,
  "entries": [
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
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "d7b4a194-4fa5-427c-9015-e2423dda2d80",
      "kind": "armyRule",
      "name": "Assigned Agents",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "4aa3a14f",
      "ver": 925,
      "reviewed": false,
      "effects": []
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
          }
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "with the Acquire objective chosen, while within range of that objective marker",
            "ru": "при выбранной цели «Acquire», пока юнит в радиусе действия этого маркера"
          }
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "with the Acquire objective chosen, while within range of that objective marker",
            "ru": "при выбранной цели «Acquire», пока юнит в радиусе действия этого маркера"
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "imperialis-fleet"
      }
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
    }
  ]
}

// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "imperial-knights",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "bc62b0fd-75e6-4669-b3af-e9d8d2a2a09b",
      "kind": "armyRule",
      "name": "Code Chivalric",
      "det": null,
      "hash": "69950e51",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "if that Quality was chosen for the army's Oath",
            "ru": "если для клятвы армии выбрано соответствующее Качество"
          }
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 2,
          "when": {
            "en": "if that Quality was chosen for the army's Oath",
            "ru": "если для клятвы армии выбрано соответствующее Качество"
          }
        },
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "if that Quality was chosen for the army's Oath",
            "ru": "если для клятвы армии выбрано соответствующее Качество"
          }
        }
      ],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "e7d774f1-6f22-4767-a7ef-4a430a90b70d",
      "kind": "enhancement",
      "name": "Bringer of Justice",
      "det": "Freeblade Company",
      "hash": "d45a4f80",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "freeblade-company"
      }
    },
    {
      "sid": "45391896-5ae3-4cb5-a2fe-d3f400f7f454",
      "kind": "enhancement",
      "name": "Sanctuary",
      "det": "Freeblade Company",
      "hash": "e29a6d74",
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
        "det": "freeblade-company"
      }
    }
  ]
}

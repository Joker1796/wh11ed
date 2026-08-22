// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "chaos-titan-legions",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "bfb574b0-dbfa-4e69-9840-a316b635052f:chaos-warbringer-nemesis-titan",
      "kind": "ability",
      "name": "Chaos Warbringer Nemesis Titan: Titanic Fire Support",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-warbringer-nemesis-titan"
      },
      "hash": "72d9ce26",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "9388db62-a987-4569-a619-2338c8261d09:chaos-warhound-titan",
      "kind": "ability",
      "name": "Chaos Warhound Titan: Flank Speed",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-warhound-titan"
      },
      "hash": "cbe4ef30",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 8,
          "when": {
            "en": "in a phase it Advanced (no Advance roll is made)",
            "ru": "в фазе, когда совершил Advance (бросок не делается)"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ]
    },
    {
      "sid": "6cba2cb4-c880-4fa5-8310-920c548e8400",
      "kind": "armyRule",
      "name": "Titanic Support",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "d9845feb",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — which allied model may be included"
    },
    {
      "sid": "823c8706-32fc-4c9a-9406-4d7d620b4c4a",
      "kind": "armyRule",
      "name": "Towering Example",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "a7ed6a90",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "mustering rule — skips a step and relaxes who may be Warlord"
    }
  ]
}

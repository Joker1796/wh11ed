// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "titan-legions",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "d0fc1914-b4a9-48f4-aec3-20399c292aba:warbringer-nemesis-titan",
      "kind": "ability",
      "name": "Warbringer Nemesis Titan: Titanic Fire Support",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warbringer-nemesis-titan"
      },
      "hash": "c7decce4",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "9388db62-a987-4569-a619-2338c8261d09:warhound-titan",
      "kind": "ability",
      "name": "Warhound Titan: Flank Speed",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warhound-titan"
      },
      "hash": "cbe4ef30",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "4df73e8a-a315-4944-a1dd-8ffd2866078f",
      "kind": "armyRule",
      "name": "Titanic Support",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "cddcc0a1",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — which allied model may be included"
    },
    {
      "sid": "efb4ed63-1400-4c3f-9165-ac03ded895c4",
      "kind": "armyRule",
      "name": "Towering Example",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "d83ec99e",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "mustering rule — skips a step, relaxes who may be Warlord, sets the force disposition"
    }
  ]
}

// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "chaos-knights",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "f7e05863-87be-4f5a-bc7c-f053cf453bd2",
      "kind": "allegiance",
      "name": "Houndpack Lance Keyword: Character",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "houndpack-lance-keyword",
        "opt": "Character"
      },
      "hash": "6ae178f7",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "the keyword this grants is applied by the roster layer itself (rosterEngine's allegKeyword feeds DatasheetCard's grantedKeywords), so recording it here too would show it twice; no printed number changes"
    },
    {
      "sid": "af512856-dc8f-428b-8562-bb30b6f1d257",
      "kind": "armyRule",
      "name": "Dreadblades",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "7a1f15d7",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "a035ead2-fd10-4271-a295-0b1823f4792f",
      "kind": "armyRule",
      "name": "Harbingers of Dread",
      "det": null,
      "hash": "bd88e7f1",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "788a4578-aaf9-4801-a35e-8e4d224c0a90",
      "kind": "detachmentRule",
      "name": "Masters of the Pack",
      "det": "Helhunt Lance",
      "ref": {
        "kind": "detachmentRule",
        "det": "helhunt-lance"
      },
      "hash": "425432db",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "ea8bac27-a7f4-40a5-8e9c-ee20b6cc609c",
      "kind": "detachmentRule",
      "name": "Malefic Surge",
      "det": "Infernal Lance",
      "hash": "be04cec4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 3,
          "when": {
            "en": "for the phase, via the Unholy Hunger Malefic Surge ability",
            "ru": "на фазу, через способность Malefic Surge «Unholy Hunger»"
          }
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "for the phase, via the Unnatural Fortitude Malefic Surge ability",
            "ru": "на фазу, через способность Malefic Surge «Unnatural Fortitude»"
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "infernal-lance"
      }
    },
    {
      "sid": "757eaeb4-cb7c-4967-8cf2-3a42aece8d2e",
      "kind": "detachmentRule",
      "name": "Tyrannical Court",
      "det": "Lords of Dread",
      "hash": "0202e0c6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 2,
          "when": null
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "lords-of-dread"
      }
    },
    {
      "sid": "917b0195-7e5e-4a65-919b-821fd441782f",
      "kind": "enhancement",
      "name": "Panoply of the Cursed Knights",
      "det": "Houndpack Lance",
      "hash": "1a35e87a",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "houndpack-lance"
      }
    },
    {
      "sid": "d9e7e955-a716-415b-8a50-04ff6e82c8cb",
      "kind": "enhancement",
      "name": "Snarling Rivalry (Upgrade)",
      "det": "Hunting Warpack",
      "ref": {
        "kind": "enhancement",
        "det": "hunting-warpack"
      },
      "hash": "a7635131",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "cff79aee-3352-436d-adfa-6e11703ffdfd",
      "kind": "enhancement",
      "name": "Blasphemous Engine",
      "det": "Infernal Lance",
      "hash": "5664e037",
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
        "det": "infernal-lance"
      }
    },
    {
      "sid": "b2f712f0-d376-473f-bf23-f2dc789347ae",
      "kind": "enhancement",
      "name": "Fleshmetal Fusion",
      "det": "Infernal Lance",
      "hash": "3e1769b0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "infernal-lance"
      }
    },
    {
      "sid": "93205b5a-0d2e-44ba-bec0-0aa2e0638143",
      "kind": "enhancement",
      "name": "Knight Diabolus",
      "det": "Infernal Lance",
      "hash": "a86a05f3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "infernal-lance"
      }
    },
    {
      "sid": "23f176f3-52df-4f8d-ae85-85d2774a4677",
      "kind": "enhancement",
      "name": "Veil of Medrengard",
      "det": "Traitoris Lance",
      "hash": "3e497de7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "against ranged attacks; 5+ against melee attacks",
            "ru": "против стрелковых атак; 5+ против атак ближнего боя"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "traitoris-lance"
      }
    }
  ]
}

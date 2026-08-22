// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
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
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 2,
          "when": {
            "en": "if that Quality was chosen for the army's Oath",
            "ru": "если для клятвы армии выбрано соответствующее Качество"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "if that Quality was chosen for the army's Oath",
            "ru": "если для клятвы армии выбрано соответствующее Качество"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "dfb05b81-7309-43ab-919a-891e1c57f817",
      "kind": "armyRule",
      "name": "Freeblades",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "a4a07af3",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — which allied models may be included"
    },
    {
      "sid": "3cf0eb6d-3049-4885-acd0-632ad39be4bb",
      "kind": "detachmentRule",
      "name": "Dauntless Defenders",
      "det": "Gate Warden Lance",
      "ref": {
        "kind": "detachmentRule",
        "det": "gate-warden-lance"
      },
      "hash": "99549537",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while the unit is on your defensive line",
            "ru": "пока отряд на вашей оборонительной линии"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "130c7836-0755-460c-90c3-d8a3730f42c5",
      "kind": "detachmentRule",
      "name": "Cogbound Alliance",
      "det": "Questor Forgepact",
      "ref": {
        "kind": "detachmentRule",
        "det": "questor-forgepact"
      },
      "hash": "450f424e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3fa314f7-a382-44fa-8ebe-7150a64f03a0",
      "kind": "detachmentRule",
      "name": "Driven from their Lairs",
      "det": "Throne-bonded Outriders",
      "ref": {
        "kind": "detachmentRule",
        "det": "throne-bonded-outriders"
      },
      "hash": "0d9a81e5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "while that ARMIGER unit is affected by a Bondsman ability",
            "ru": "пока юнит ARMIGER находится под действием способности Bondsman"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "4b2087c8-50f6-4468-80b5-fa67827c8167",
      "kind": "detachmentRule",
      "name": "Bold Gallantry",
      "det": "Valourstrike Lance",
      "ref": {
        "kind": "detachmentRule",
        "det": "valourstrike-lance"
      },
      "hash": "7869ed29",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "until the end of the turn in which an Imperial Knights unit Advanced",
            "ru": "до конца хода, в котором юнит Imperial Knights совершил Advance"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ]
    },
    {
      "sid": "5ee94026-3b68-4f72-b840-8e69eb1dc02d",
      "kind": "enhancement",
      "name": "Blessed Plate",
      "det": "Dominus Foebreakers",
      "ref": {
        "kind": "enhancement",
        "det": "dominus-foebreakers"
      },
      "hash": "43e94a04",
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
      ]
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
      "sid": "0e5596b1-2034-4c60-9e46-8d6126057c8b",
      "kind": "enhancement",
      "name": "Hunter’s Eye",
      "det": "Freeblade Company",
      "ref": {
        "kind": "enhancement",
        "det": "freeblade-company"
      },
      "hash": "ba5303da",
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
    },
    {
      "sid": "2085c68c-e175-4f84-9196-5aefcc3e6fda",
      "kind": "enhancement",
      "name": "Augury Halo",
      "det": "Gate Warden Lance",
      "ref": {
        "kind": "enhancement",
        "det": "gate-warden-lance"
      },
      "hash": "74db5b0f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "per ranged attack, while the bearer is on your defensive line",
            "ru": "за стрелковую атаку, пока носитель на вашей оборонительной линии"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "ece354bb-d294-47aa-bff4-efb684b77443",
      "kind": "enhancement",
      "name": "Knight of the Opus Machina (Aura)",
      "det": "Questor Forgepact",
      "ref": {
        "kind": "enhancement",
        "det": "questor-forgepact"
      },
      "hash": "5f1d6155",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3e7ec35c-7e28-40fd-99ad-6326fe7d3101",
      "kind": "enhancement",
      "name": "Pennant of Silvered Fury",
      "det": "Questoris Companions",
      "ref": {
        "kind": "enhancement",
        "det": "questoris-companions"
      },
      "hash": "4c4d9894",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 2",
          "when": {
            "en": "once per battle, for the phase the bearer uses this Enhancement in",
            "ru": "раз за битву, на фазу, в которой носитель использовал улучшение"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "a0317440-3ea2-4b33-9f51-fa195f50471f",
      "kind": "enhancement",
      "name": "Fables of Nightmare",
      "det": "Spearhead-at-Arms",
      "ref": {
        "kind": "enhancement",
        "det": "spearhead-at-arms"
      },
      "hash": "14772b20",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "464d34c9-9ef4-4120-9894-b08d3263286a",
      "kind": "enhancement",
      "name": "Bearer of the Judicant’s Helm",
      "det": "Valourstrike Lance",
      "ref": {
        "kind": "enhancement",
        "det": "valourstrike-lance"
      },
      "hash": "7db4a32e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    }
  ]
}

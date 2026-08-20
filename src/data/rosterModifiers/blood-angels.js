// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "blood-angels",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "15c0488f-a9ec-4288-a4c4-7bfba664628b",
      "kind": "allegiance",
      "name": "Headhunter Task Force Keywords: Character",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "headhunter-task-force-keywords",
        "opt": "Character"
      },
      "hash": "958d34d8",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "the keyword this grants is applied by the roster layer itself (rosterEngine's allegKeyword feeds DatasheetCard's grantedKeywords), so recording it here too would show it twice; no printed number changes"
    },
    {
      "sid": "41ab380c-9b9c-44d2-a03b-b12eaa212582",
      "kind": "detachmentRule",
      "name": "Red Thirst",
      "det": "Liberator Assault Group",
      "hash": "ca29e36f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "in the Fight phase, if the unit made a Charge move this turn",
            "ru": "в фазе боя, если юнит совершил чардж в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "in the Fight phase, if the unit made a Charge move this turn",
            "ru": "в фазе боя, если юнит совершил чардж в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "liberator-assault-group"
      }
    },
    {
      "sid": "0a300460-ad93-4be7-9188-9e0f87779498",
      "kind": "detachmentRule",
      "name": "Maddened Ferocity",
      "det": "Rage-cursed Onslaught",
      "hash": "39c36bc7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "in the Fight phase, if the unit made a Charge move this turn",
            "ru": "в фазе боя, если юнит совершил чардж в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "instead of +1, if the unit is Battle-shocked and made a Charge move",
            "ru": "вместо +1, если юнит Battle-shocked и совершил чардж"
          },
          "cond": [
            "unit-charged",
            "unit-battle-shocked"
          ],
          "alt": 0
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "rage-cursed-onslaught"
      }
    },
    {
      "sid": "43800b4c-d055-44df-b593-75ee22ba1231",
      "kind": "enhancement",
      "name": "Blood Boil",
      "det": "Legacy of Grace",
      "ref": {
        "kind": "enhancement",
        "det": "legacy-of-grace"
      },
      "hash": "7d893d70",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI: non-MONSTER/VEHICLE 5+",
          "when": null,
          "only": {
            "tag": "PSYCHIC"
          }
        }
      ],
      "note": "addresses the [PSYCHIC] attacks, a subset of the weapon rows this format cannot single out"
    },
    {
      "sid": "da1adec0-3e83-40b6-807c-fbd76b193c76",
      "kind": "enhancement",
      "name": "Sanguinary Tear (Aura)",
      "det": "Rage-cursed Onslaught",
      "hash": "41be1610",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "rage-cursed-onslaught"
      }
    },
    {
      "sid": "63a53ef1-6111-4a00-8ce9-418646cd23cf",
      "kind": "enhancement",
      "name": "Artisan of War",
      "det": "The Angelic Host",
      "hash": "bab820f3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null
        },
        {
          "on": "profile",
          "stat": "sv",
          "op": "set",
          "value": "2+",
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "the-angelic-host"
      }
    },
    {
      "sid": "47a29acb-b0b7-455f-8959-cdbdd6de9136",
      "kind": "enhancement",
      "name": "Vengeful Onslaught",
      "det": "The Lost Brethren",
      "hash": "d0a23a72",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "the-lost-brethren"
      }
    }
  ]
}

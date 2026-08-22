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
      "sid": "8f4b7a67-ab94-4545-afea-aa061b2fd5f2",
      "kind": "enhancement",
      "name": "Shadow of Abomination",
      "det": "Encarmine Speartip",
      "ref": {
        "kind": "enhancement",
        "det": "encarmine-speartip"
      },
      "hash": "93ae32eb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per battle, per army, when this unit is selected to fight",
            "ru": "раз за битву на армию, когда отряд выбран для боя"
          },
          "cond": [
            "never"
          ]
        }
      ]
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
      "sid": "77a40dd5-c838-4223-80b2-853a997a7d0c",
      "kind": "enhancement",
      "name": "Rage-fuelled Warrior",
      "det": "Liberator Assault Group",
      "ref": {
        "kind": "enhancement",
        "det": "liberator-assault-group"
      },
      "hash": "950b2f1e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 3",
          "when": {
            "en": "once per battle, for the Fight phase the bearer uses this Enhancement in",
            "ru": "раз за битву, на фазу боя, в которой носитель использовал улучшение"
          },
          "cond": [
            "never"
          ]
        }
      ]
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
      "sid": "51ee8286-2787-4427-8df3-d5ccea9bab9f",
      "kind": "enhancement",
      "name": "Masterful Fighter",
      "det": "Sanguinary Spearhead",
      "ref": null,
      "hash": "6edde99c",
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
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null
        }
      ]
    },
    {
      "sid": "4d3bc718-7687-4dbe-ba8b-5f42d0e4506a",
      "kind": "enhancement",
      "name": "Archangel’s Shard",
      "det": "The Angelic Host",
      "ref": {
        "kind": "enhancement",
        "det": "the-angelic-host"
      },
      "hash": "c209f36e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-CHAOS 5+",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null
        }
      ]
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
    },
    {
      "sid": "99c9bba1-4e59-4d3e-b168-906e977bb05d",
      "kind": "enhancement",
      "name": "On the Archtraitor's Bridge",
      "det": "Wrath of the Doomed",
      "ref": {
        "kind": "enhancement",
        "det": "wrath-of-the-doomed"
      },
      "hash": "80d7e659",
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
      ]
    }
  ]
}

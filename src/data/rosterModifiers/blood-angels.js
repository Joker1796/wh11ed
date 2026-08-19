// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "blood-angels",
  "formatVersion": 1,
  "entries": [
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
          }
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "in the Fight phase, if the unit made a Charge move this turn",
            "ru": "в фазе боя, если юнит совершил чардж в этом ходу"
          }
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
          }
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "instead of +1, if the unit is Battle-shocked and made a Charge move",
            "ru": "вместо +1, если юнит Battle-shocked и совершил чардж"
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "rage-cursed-onslaught"
      }
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

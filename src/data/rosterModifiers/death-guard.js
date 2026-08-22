// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "death-guard",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "13ae6c92-101f-4e20-bcd7-1ea786034eeb",
      "kind": "armyRule",
      "name": "Nurgle’s Gift (Aura)",
      "det": null,
      "hash": "77642218",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "59635a2a-6196-4c29-8aef-2477563b0a7c",
      "kind": "armyRule",
      "name": "Nurgle’s Gift (Aura)",
      "det": null,
      "hash": "9d8b8791",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "6ee24fba-454f-4bbe-8de5-1974f148d2bc",
      "kind": "detachmentRule",
      "name": "Warped and Rusted Animus",
      "det": "Contagion Engines",
      "ref": {
        "kind": "detachmentRule",
        "det": "contagion-engines"
      },
      "hash": "7111901d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 1,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null
        }
      ],
      "note": "the CONTAGION ENGINE keyword in the first bullet is already carried by conditionalKeywords.json"
    },
    {
      "sid": "9a404cbe-ff89-4583-9b06-49d7926e2e68",
      "kind": "detachmentRule",
      "name": "Reverberant Rancidity",
      "det": "Tallyband Summoners",
      "ref": {
        "kind": "detachmentRule",
        "det": "tallyband-summoners"
      },
      "hash": "f8304ffa",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "grants an ability and extends Contagion Range — neither is a printed characteristic"
    },
    {
      "sid": "8259676b-b493-4d15-b60e-b1922dac0d44",
      "kind": "enhancement",
      "name": "Vile Vigour",
      "det": "Death Lord’s Chosen",
      "ref": {
        "kind": "enhancement",
        "det": "death-lords-chosen"
      },
      "hash": "88966b0f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт юнит"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ]
    },
    {
      "sid": "5c3eba83-5786-4320-92e5-b6369e5c0535",
      "kind": "enhancement",
      "name": "Bilemaw Blight",
      "det": "Mortarion’s Hammer",
      "ref": {
        "kind": "enhancement",
        "det": "mortarions-hammer"
      },
      "hash": "36897a57",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 12,
          "when": {
            "en": "the bearer's Plague Wind only, from the start of your Shooting phase until the end of it",
            "ru": "только для Plague Wind носителя, с начала фазы стрельбы до её конца"
          },
          "cond": [
            "phase-shooting"
          ],
          "only": {
            "name": "Plague Wind"
          }
        }
      ]
    },
    {
      "sid": "184bc9b1-4743-4683-bb76-b667e8084f98",
      "kind": "enhancement",
      "name": "Eye of Affliction",
      "det": "Mortarion’s Hammer",
      "ref": {
        "kind": "enhancement",
        "det": "mortarions-hammer"
      },
      "hash": "41e6a5fd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "while targeting an Afflicted enemy unit",
            "ru": "пока целью является Afflicted-отряд противника"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "646ffc25-fbc8-4702-82ad-ea7c853e5736",
      "kind": "enhancement",
      "name": "Sorrowsyphon",
      "det": "Shamblerot Vectorium",
      "hash": "823d2ee7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the bearer's Plague Wind weapon only, while leading a Poxwalkers unit",
            "ru": "только оружие носителя Plague Wind, пока он ведёт отряд Poxwalkers"
          },
          "cond": [
            "never"
          ],
          "only": {
            "name": "Plague Wind"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "shamblerot-vectorium"
      }
    },
    {
      "sid": "89e9fb12-929f-4931-8002-58f48241447d",
      "kind": "enhancement",
      "name": "Talisman of Burgeoning",
      "det": "Shamblerot Vectorium",
      "hash": "aabe56f9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Poxwalkers models in the led unit only",
            "ru": "только модели Poxwalkers в ведомом отряде"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "shamblerot-vectorium"
      }
    },
    {
      "sid": "5d974c69-74c8-4495-8370-f4c9e20d3c4f",
      "kind": "enhancement",
      "name": "Witherbone Pipes",
      "det": "Shamblerot Vectorium",
      "hash": "17b8a289",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "models in the led Poxwalkers unit",
            "ru": "модели ведомого отряда Poxwalkers"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "shamblerot-vectorium"
      }
    },
    {
      "sid": "c61119f2-8aea-4203-ab1b-565c4deacebe",
      "kind": "enhancement",
      "name": "Fell Harvester",
      "det": "Tallyband Summoners",
      "hash": "f2a3864b",
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
        "det": "tallyband-summoners"
      }
    },
    {
      "sid": "c717fc16-3d50-4312-af50-9d7653c5266a",
      "kind": "enhancement",
      "name": "Tome of Bounteous Blessings",
      "det": "Tallyband Summoners",
      "hash": "bcc26027",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "tallyband-summoners"
      }
    },
    {
      "sid": "572b6378-e1cf-433c-841b-015a715aed94",
      "kind": "enhancement",
      "name": "Furnace of Plagues",
      "det": "Virulent Vectorium",
      "hash": "12901bea",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null
        },
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
        "det": "virulent-vectorium"
      }
    }
  ]
}

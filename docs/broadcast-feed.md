# The broadcast feed (for custom overlays)

`GET https://api.wh-rules.ru/broadcast/{token}` is a **public, read-only JSON feed of one live
game**, meant to be fetched from anywhere: it answers with open CORS (`*`, no credentials) and
exposes `ETag`, so a custom HTML/CSS overlay can poll it every second or two and send
`If-None-Match` to get a cheap `304` while nothing moves. The app's own overlay
(`wh-rules.ru/broadcast/{token}`) is one consumer of this feed and has no privileged data.

The token is the last part of the broadcast link the game tracker gives you.

```jsonc
{
  "updatedAt": "2026-09-13T09:41:02.118Z",   // when the phone last pushed
  "payload": {
    "v": 1,                     // payload version; fields are ADDED without bumping it
    "gameType": "singles",      // | "doubles"
    "scoreMode": "vp",          // what the players play to: "vp" | "bp"
    "battleSize": "strikeForce",// "incursion" | "strikeForce" | "onslaught" | "combatPatrol"
    "phase": "playing",         // | "finished"
    "endReason": null,          // "played" | "early" | "friendly-concede" | "opponent-concede"
    "round": 3,                 // battle round, 1..5
    "turn": 0,                  // index into sides[] — whose turn it is
    "battlePhase": "shooting",  // null unless the game keeps the phase clock
    "layout": "B",
    "twist": null,
    "sides": [{
      "teamName": "Alpha Strike",
      "players": [{ "name": "Ann", "faction": "Orks", "factionSlug": "orks",
                    "detachments": ["War Horde"] }],   // 2 entries in doubles
      "role": "attacker",       // | "defender"
      "forceType": null,        // doubles only: "unified" | "convenience"
      "disposition": "Battle Lines",
      "battleReady": true,
      "firstTurn": true,
      "cp": 3,
      "primary": { "slug": "secure-asset", "name": "Secure Asset", "vp": 22 },
      "secondaries": [          // drawn cards are face-up, so they are public
        { "slug": "assassination", "name": "Assassination", "vp": 5, "active": true },
        { "slug": "cleanse", "name": "Cleanse", "vp": 3, "active": false }  // set aside
      ],
      "secondaryVp": 8,
      "battleReadyVp": 10,
      "total": 40,              // primary + secondary + battle-ready, the VP result
      "bp": 12,                 // Battle Points as they stand now
      "rounds": [               // always five entries
        { "round": 1, "primary": 8, "secondary": 3, "vp": 11, "cumulativeVp": 11, "bp": 10 }
      ]
    }]
  }
}
```

## Polling etiquette

Send `If-None-Match` and poll no faster than once a second. One address is capped at 60 reads a
minute and gets `429` with `Retry-After: 2` past that, because the whole app (logins, sync, shared
games) shares one budget per address. Responses carry `Cache-Control: public, max-age=2`. The app's
own overlay asks every five seconds, and that is plenty for a scoreboard.

## Notes for a consumer

- `sides` is always two, and `sides[0]` is the first-turn side.
- Every name is baked in (mission and faction names stay English by product convention), so an
  overlay needs no data files of its own.
- `rounds[i].bp` is the Battle Points that round would have ended on — the running result, not a
  per-round award; the two sides' `bp` always sum to 20.
- A token that was revoked, regenerated or left untouched for a week answers `404`; a token of the
  wrong shape answers `400`.
- Nothing can be written through this endpoint. The phone projects the scoreboard itself, so army
  lists, rule switches and notes never reach it.

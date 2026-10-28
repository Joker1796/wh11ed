# CLAUDE.md — Dominatus

The Armageddon narrative campaign deck (`/dominatus`) and its place in the tracker. Added
2026-10-28 on branch `feat/dominatus` (hub journal `active/2026-09-20-dominatus-deck.md`).

## Where the text comes from

GW publishes the deck's contents nowhere — no appdata table, no PDF. It was transcribed from the
owner's own copy: photos of all 89 cards and the booklet (hub `sources/dominatus/`), read card by
card and checked against each photo (`sources/dominatus/DOMINATUS-RULES.md`). **The photos are the
canon** for this deck: a correction is checked against them, not against a fan site. Only the
Dominatus **Event Companion** has a published source (the PDF in `../sources`, appdata's fourth
Event Companion edition); `npm run companions` gates its version like the other three.

Rules text only: card lore and the nine Outcome narratives are not carried.

## Data

- `src/data/dominatus.js` — the whole deck in English + `getDominatus(locale)`, which merges
  `dominatusRu.js` (cards by slug, blocks by id, rows by position — the shapes are in the file's
  header). Card names, Alliances, Force Dispositions and ALL-CAPS keywords stay English; RU adds
  `nameRu` as a subline.
- An Agenda's `primary` is exactly a `missions.js` primary card (`briefing` + `blocks`), so the page
  draws it with `MissionCard` (its default slot carries the Agenda Achieved conditions,
  `DomAgendaAchieved.vue`) and the tracker scores it like any primary.
- `src/core/dominatus/briefing.js` — `agendaFor(briefings, { alliance, phase, mine, theirs })`, the
  Briefing matrix read the one way.

Gates: `src/data/dominatus.test.js` (89 cards, 5/5/1 Honours, 5 Relics an Alliance, every Briefing a
full 5×5 matrix of its own phase's Agendas, every Primary in the scorable shape);
`src/data/dominatusParity.test.js` (EN↔RU: markers, `**`, tokens, keywords, measurements, nothing
left English, a `nameRu` on every card); `missionTiming.test.js` reads every Agenda block's `when`.

## The page

`src/views/DominatusView.vue` on the Event Companion's shell (`OnePageChapters`), six chapters in
this directory; nav groups `dominatusGroups` (router/nav.js), route section `dominatus`, a card on
`/rules`. Card chrome shared by the chapters is `dominatus.css` (loaded by the view only). The
Agendas chapter's filters are one shared reactive (`useAgendaFilter`) so a Briefing cell can open
the Agenda it names.

## In the tracker

`settings.dominatus = { phase, location }` (setup step 2, before the twist — no twist with it:
the Agenda IS the Primary). Per player: `alliance`, `declineAgenda` (Declining Agendas → the mission
deck's Primary, an ordinary game for that player), `upgrades: [{ slug, unit }]` (pre-battle step 7,
up to 3, 4 at Titangrave), `agendaAchieved` (0–1, 0–2 for a phase 3 Agenda; set by the players on
the missions tab — the conditions read the table, not the score). The Primary slug is `dom-<agenda>`
(`primaryOf` → `src/composables/dominatusMissions.js`); scoring and caps are the ordinary ones (the
Dominatus Event Companion says 45 / 15 a round). The Location's war zone rules ride on the missions
tab like a twist. The tracker applies no Upgrade's or war zone rule's effect — they are the table's.

**The deck is loaded on demand** (`loadDominatusDeck`, ~35 KB gzipped): the tracker store is on
every tracker and roster screen, and a static import put the deck on all of them. Until it lands an
Agenda is a placeholder named from its slug (`pending: true`); the module sits in a shallowRef, so
everything that read it re-runs. Don't import `src/data/dominatus.js` statically from anything the
tracker or roster screens load; `shellImports.test.js` keeps it out of the app shell.

`missionTiming.js` learned one moment for this deck: **"End of the battle round"** (`round-end`, the
turn that closes the round). Before that it read as "any turn" without a word.

## Not yet

The campaign itself — Alliances of players across games, Honour/Skill/Relic hands, Location
control, ascendancy, Narrative Points — is stage 3 (shared through an account, `wh11ed-api`).

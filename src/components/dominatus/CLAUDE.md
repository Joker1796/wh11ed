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

**The lore is carried too** (owner, 2026-10-31): each card's italic paragraph, each Briefing's
introduction and the nine Outcome cards, read off the same photos (Vision OCR, corrected by eye)
into `src/data/dominatusLore.js` + `dominatusLoreRu.js` and hung on the cards by `getDominatus`
(`lore`; a Briefing's `intro` and `outcomes` by Narrative Points). All of it is lore to the app:
`.dcard-lore` / `.dcard-outcomes` are in style.css's "hide lore" list. `dominatusParity.test.js`
holds every card to having it in both languages and every Briefing to its 3 (phase 3: 4) Outcomes.

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
`/rules`. Card chrome shared by the chapters is `dominatus.css` (loaded by the view only). Its chapter heads are drawn as
Core Rules section heads (the accent rule, the section title's size, capitals), keyed to the
`dom-chapter-*` ids — route CSS outlives the route, and the Event Companion shares `.chapter-heading`.

**Cards wear the printed card's marks** (2026-10-31): the tag line the deck prints up a card's
spine ("Liberators · Agenda", "Battle Honour", "Location 1–2" — `cardTag`), the type icon, the
phase as a boxed numeral and the Alliance's emblem (`DomCardMark.vue`; the deck marks and the
emblems are traced or measured off the deck, `scripts/trace-dominatus-emblems.py` and
`draw-dominatus-marks.py`, owner 2026-10-31 — only Battle Honour's is ours), section labels white
on black (`.dchip`), and a stripe down the left in the DECK's colour, the printed spine's
(`--dom-spine-*`), the tag line in it too. No Alliance colours: the deck has none, it tells them
apart by emblem and name (owner, 2026-10-31). An Agenda
is MissionCard, which has `tag` and `mark` slots for this.

**The booklet's framed rules stay framed** (owner, 2026-10-31): a rule block with `box: true` —
Warmaster, Declining Agendas, Modifying Dominatus — is drawn in a frame with its title on a filled
plate in the corner, and the Alliances block's `boxes` are three such frames with the emblem on
the right (`EventProseBlock.vue`, generic: any Event Companion block may use them). Declining
Agendas sits between the battle steps in the booklet, so `dom-play-battles` is cut there and goes
on in `dom-play-battles-steps`, a block with no title (RuleBlock draws no header for it). The Deck
lists the five decks with their marks (`iconList`), and its paragraphs go on in `dom-deck-cards`.
The Default Battle Schedule is `table.plate`: the booklet's table, title on the same plate. The campaign's
steps carry `step` (1–4, End Campaign its own block as the booklet numbers it): the number on a
filled square with a cut corner, in the house accent (`.section-num`), before the title.
The chapter reads in the booklet's sections: each full-width section heading ends one pair of
columns and starts the next (one flow ran a screen-high column down and back up); Modifying runs
on in the steps' columns, no `newRun` of its own since prose may cross columns. The
Preparing section is the booklet's spread: its text, the schedule and the Alliances' text on the
left, the three frames down the right (`columnBreak`). Prose may run on from one column into the next here (dominatus.css:
the body wrapper is `flow-root`, not `overflow: hidden`, which Chrome never splits; list items
and frames stay whole) — whole blocks only left the steps' right column a third short. The booklet's section headings (`section`: Armageddon Campaigns,
Preparing, Start the Campaign — its own block, as printed above step 1): DomChapterRules splits
each into a full-width heading and its text in the columns; the heading is a divider — small
letterspaced capitals in the accent's ink and a hairline to the right edge (capitals at a heading's
size outranked the chapter's heading, owner 2026-10-31).
No lead paragraph of ours: the booklet's first section is the introduction. A frame and its plate are one unbreakable wrapper whose
TOP PADDING holds the plate — a column drops a block's top margin, and the plate went with it. The marks (`DomCardMark`: the card's
kind, its phase boxed, its Alliance's emblem) sit in the head's top-right corner, all three one size
(owner's pick, 2026-10-31). The
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

## The campaign (`/tracker/campaigns`)

A campaign is an **append-only event log** on the server (`wh11ed-api` `/campaigns`, README
"Dominatus campaigns") folded on every device by `src/core/dominatus/campaign.js` — players and
their Alliances, battles (pending until the Warmaster counts them), the rewards they owe (draws of
Battle Honours / Skills / Relics, the Location bonuses that ask something), the end of each phase
(Take Control with its tie-breaks, the first-take bonus, Ascendancy, Narrative Points, Relic
draws, the discard). Owner decisions, 2026-10-28: players enter their own battles, the Warmaster
counts them; reading needs only the view link; cards are drawn by the app or at the table (a
campaign setting); the end of a phase is computed and shown before it is done, the Warmaster rules
on a tie nothing breaks.

- The fold is the authority on rights the server cannot judge: a member speaks only for the player
  they registered (`m-<memberId>`), a battle they fought, a reward of their own. A refused event
  stays in the log and is listed (`rejected`) for the Warmaster.
- The app's draw is client-side randomness (friends at a table, not an anti-cheat); the fold checks
  that the card kept was among those drawn, was in the pile, and is not already held.
- Device side: `src/composables/useCampaigns.js` (the campaigns this device knows, with its
  credential for each — the account for the owner, a member token from `?join=`, the view token
  from `?t=`), pages `src/views/tracker/Campaign(s)View.vue`, blocks in `campaign/`. A finished
  Dominatus game is sent from its screen (`CampSendGame`, battle id `g-<game id>` so it counts once).
- Gates: `src/core/dominatus/campaign.test.js`, `src/composables/useCampaigns.test.js`.

Booklet readings worth knowing: Agenda Achieved cards gained in a phase are kept into the next
and discarded at ITS end (step V "from previous phases"); the Event Companion's variant (Relics and
Discard at the next phase's first battle) is not modelled — the Warmaster's `adjust` covers it.

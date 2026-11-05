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
(`lore`; a Briefing's `intro` and `outcomes` by Narrative Points). The cards' lore is lore to the app:
`.dcard-lore` is in style.css's "hide lore" list — except a Briefing's introduction and Outcomes,
which stay (owner, 2026-10-31: they are what the card is for). `dominatusParity.test.js`
holds every card to having it in both languages and every Briefing to its 3 (phase 3: 4) Outcomes.

## Data

- `src/data/dominatus.js` — the whole deck in English + `getDominatus(locale)`, which merges
  `dominatusRu.js` (cards by slug, blocks by id, rows by position — the shapes are in the file's
  header). Card names, Alliances, Force Dispositions and ALL-CAPS keywords stay English; RU adds
  `nameRu` as a subline.
- **The role is "Warmaster" in Russian too** (owner, 2026-11-05), on the rules page and in the
  campaign's screens alike — never «ведущий» (the screens had both, 52 to 18). Declined with the
  apostrophe where a sentence needs it (`Warmaster’а`); a sentence is rephrased to the nominative
  first where it reads as well.
- An Agenda's `primary` is exactly a `missions.js` primary card (`briefing` + `blocks`), so the page
  draws it with `MissionCard` (its default slot carries the Agenda Achieved conditions,
  `DomAgendaAchieved.vue`) and the tracker scores it like any primary.
- `src/core/dominatus/briefing.js` — `agendaFor(briefings, { alliance, phase, mine, theirs })`, the
  Briefing matrix read the one way.

Gates: `src/data/dominatus.test.js` (89 cards, 5/5/1 Honours, 5 Relics an Alliance, every Briefing a
full 5×5 matrix of its own phase's Agendas, every Primary in the scorable shape);
`src/data/dominatusParity.test.js` (EN↔RU: markers, `**`, tokens, keywords, measurements, nothing
left English, a `nameRu` on every card); the bold rules terms are popovers (`[gloss:…]`, `npm run gloss -- dominatus`,
held by `scripts/gloss-bold-terms.test.js`; parity compares a popover by its id, the label is each language's); `missionTiming.test.js` reads every Agenda block's `when`.

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
(owner's pick, 2026-10-31). Each opens the rules popover on a tap (on a desk also under the
pointer): its name and the booklet's words on it — a kind's line of The Deck / Upgrade Cards, an
Alliance's frame, a phase the campaign's opening line (`markNote`, `MARK_SOURCE`, by block id and
line; `markNote.test.js` holds each kind to its own line in both languages). The
Agendas chapter's filters are one shared reactive (`useAgendaFilter`) so a Briefing cell can open
the Agenda it names.

## In the tracker

`settings.dominatus = { phase, location }` (setup step 2, before the twist — no twist with it:
the Agenda IS the Primary). Per player: `alliance`, `declineAgenda` (Declining Agendas → the mission
deck's Primary, an ordinary game for that player), `upgrades: [{ slug, unit, uid?, mi? }]` (pre-battle
step 7, up to 3, 4 at Titangrave — `src/core/dominatus/upgrades.js`). With a list attached the unit is
one of its units (`dominatusUpgradeUnits.js` reads their keywords and the Warlord; `uid`/`mi` name it):
a unit the card's `who` excludes — not a CHARACTER, an EPIC HERO for the no-hero Relics — or one already
carrying another card is greyed in the picker with why, a card changed under a unit it no longer fits
says so under the row, and the bonus effect says when it applies (its keywords, WARLORD = the list's
Warlord). `upgrades.test.js` holds every card of the deck to the phrasings the core reads. Without a
list the unit is typed in (owner, 2026-11-03).
**In the battle** (owner, 2026-11-03, stage 3a — text, not numbers): a unit's card in the game
(`RosterUnitRulesCard`, `gameCtx.upgrades` from `RosterViewView`'s `upgradesOf`) carries its cards
under "Upgrades this battle", each folded like a rule — the deck, the name, the text, and the bonus
said to apply or not on this unit. A "(Once per battle)" card (`upgradeOncePerBattle`, five in the
deck) is one of the card's "Once per battle" chips, kept as any unit's use (`setUnitUse`, id
`dom:<card>`) and under the same option (`trackUnitStates`). The phase reminder (`usePhaseRules`)
lists a card in the phase its English text names, under the unit (read by `phaseEntryOf`, the
core function the generated phase index is made of), and the Location's war zone rules for both sides
(opening the missions tab, where they are printed). Those are read BY HAND
(`src/data/dominatusWarZonePhases.js`, owner 2026-11-04): 16 of the 19 name an action, not a phase,
and never showed; "the end of the battle round" (Orbital Lance Bombardment) is at the end of the turn
closing it, and Vermillion Sanction has no phase (pre-battle). `dominatusWarZonePhases.test.js` holds
every rule to an entry and an entry to the phase the rule's words name.
**The head of each card says how much of it the app applies** (`upgradeCoverage`, owner
2026-11-05 — a player would take every card for counted): counted, counted in part (the rest is
theirs), apply it yourself — read from the hand-read table below (`note`, `noteOf: 'bonus'`,
`elsewhere` for High Strategy's CP).
**The numbers** (3b): `src/data/dominatusUpgradeMods.js` is the deck read by hand into the modifier
layer's effect shape — no `target` the bearer, `target: 'unit'` the unit and the Attached unit it is
in (19.04); a bonus `replace`s where the card says "instead", else adds; a card with nothing a number
can carry has a `note` saying why (a re-roll, mortal wounds, CP, a rule of the campaign). 12 of 35
carry numbers. `upgradeModEntries` makes them enhancement-shaped entries (`upgrade: true`, so the
card's notes say "Upgrade · <card>"), and RosterViewView's `upgradeEntriesFor` hands a unit its own
cards whole plus the "this unit" effects of the cards on the other parts of its Attached unit — into
the faction records (`recordsFor().faction`, `gameCtx.upgradeEntries` → `rosterUnitCard`'s
`factionModifiers`: the stat pass reads the faction records, not the resolved list).
`upgradeMods.test.js` holds every card to an entry and every number and granted name to the card's
English text.
**CP an Upgrade starts the battle with** (3c): High Strategy's "You start the battle with 1CP" (2CP on
the WARLORD — the list's, by the card's `uid`; a unit typed in is not known to be one) is one 'start'
entry in the side's CP ledger at round 1, turn 0 (`settleStartCp` in useTracker's `settleSide`, read
by `upgradeStartCp`) — written when the battle begins, kept in line with the cards, and NOT the
round's one bonus point: it is had before the battle. The log says "+2 CP at the start of the battle
(High Strategy)". `agendaAchieved` (0–1 — a box — or 0–2 for a phase 3 Agenda with "one more" — a count; `DomAgendaRow`, a
row of the missions frame under the war zone, as the twist and the war zone are — `MissionRuleFold`; set by the players on
the missions tab — the conditions read the table, not the score). The Primary slug is `dom-<agenda>`
(`primaryOf` → `src/composables/dominatusMissions.js`); scoring and caps are the ordinary ones (the
Dominatus Event Companion says 45 / 15 a round). The Location's war zone rules ride on the missions
tab like a twist. The tracker applies no war zone rule's effect to a number yet.

**The deck is loaded on demand** (`loadDominatusDeck`, ~35 KB gzipped): the tracker store is on
every tracker and roster screen, and a static import put the deck on all of them. Until it lands an
Agenda is a placeholder named from its slug (`pending: true`); the module sits in a shallowRef, so
everything that read it re-runs. Don't import `src/data/dominatus.js` statically from anything the
tracker or roster screens load; `shellImports.test.js` keeps it out of the app shell.

`missionTiming.js` learned one moment for this deck: **"End of the battle round"** (`round-end`, the
turn that closes the round). Before that it read as "any turn" without a word.

## The Campaigns section (`/campaigns`)

**Campaigns are a top-level section** (owner, 2026-11-05), beside the tracker in the navbar and the
drawer (not in the bottom nav: its five items are fixed). `/campaigns` (`views/campaigns/
CampaignsView.vue`) shows the decks a campaign is played with and the campaigns this device knows:
the Dominatus card — the emblem off the booklet's cover (`src/assets/dominatus/dom-logo.svg`,
traced by `scripts/trace-dominatus-emblems.py logo`, 18 KB so a file of its own, not a `.wi`), the
deck rules and **How it works** (the player's path in six steps, `campHowText`) — and a dimmed
**Your own deck**, coming later. One deck so far, so it is open from the start: from 901px the
decks are a column on the left and its campaigns the right column, on a phone the deck card, its
campaigns, then the dimmed card. A campaign's row (owner, 2026-11-05): the phase's numeral, the
Location, and, where the reader has a player, their Alliance, cards by deck and this phase's battles
(`playerStanding`); under it, on a strip of its own since it comes and goes, the first thing its
**What next** asks of this reader (`campaignWords().stepText`, the sentence `CampNext` prints, from
`useCampaignView.js`), tinted when it is theirs to do.
A campaign lives under its deck: `campaignPath(id, sub)` in `router/nav.js` —
`/campaigns/dominatus/:id`, `…/new`, `…/:id/settings`; the invite and view links are built from it.
`/tracker/campaigns…` (where they lived on the branch before) redirects, query and all. The pages
carry `meta.section: 'campaigns'` (`isCampaignsRoute`), with no subnav.

## A list played in a campaign (`roster.dominatus`, owner 2026-11-05)

The builder marks a list for Dominatus and gives its units Upgrade cards before the battle, so the
table does not; the battle starts with them given (`useRosterCampaign.js`).

- **The mark** is `roster.dominatus = { campaign, upgrades: [{ slug, uid }] }` — `campaign` the id
  of a campaign this account plays in as a player of its own (`choices`: owner or member, with
  `myPlayer`), or null for the whole deck (to try cards on). Absent on every other list; synced with
  the list (the backend passes the key through), never in a share code or a game snapshot.
- **Where it is set**: `RosterCampaignField` — the editor's Settings mode on a phone, the desk's
  "…" until the list has a mark, then a field on the settings line with the deck's emblem
  (`RosterSettingsBar`'s `campaignLabel` + `campaign` slot). Changing the campaign drops the cards
  the new player does not hold.
- **The cards**: a unit's fields have "Upgrade card" under the enhancement (`RosterEntryFields`
  computes the options): the pool (the player's cards, or the deck's unit cards), one card a unit, a
  card once, up to the battle's limit (`limitOf`: the campaign's, 3 for the deck); a card the unit
  may not take, or another unit holds, stays listed and says why (`upgradeUnitBlock`).
- **The view** reads the pinned cards outside a game exactly as it reads a battle's
  (`upgradesHere` in `RosterViewView`): the modifiers on the card, and the "Upgrade cards for the
  campaign" block with each card's coverage (`ctx.upgrades`; `gameCtx.upgrades` in a game).
- **The campaign's copy** goes as the editor saves (`sendCopy`), not on the mark: an edit taken back
  by Cancel sends nothing; nothing while the campaign's copy is this one, or the campaign takes no
  rosters.
- **The battle**: `GameSetup.start()` brings the cards in (`pinnedFor` → core's `battlePins`, then
  `pinnedUpgrades`): in a campaign's battle a list marked for another campaign brings none, nor a side
  that is no player of it; only cards the side's campaign player still holds, on units still in the
  snapshot, up to the battle's limit. "Play a battle" gives this device's own player the list itself
  (`campaignList` in `campaignHandoff.js`: marked for the campaign, its faction, the last saved) and
  not the campaign's copy: a share code carries neither the list's id nor its cards, so a battle
  started from the copy had none (found on the stand, 2026-11-05). `makePlayer` keeps them
  (`cleanUpgrades`), and the pre-battle step names their units once the list is read
  (`DomUpgradesEditor`) and changes them like any other.

## What comes from the campaign wears its mark (owner, 2026-11-05)

A rule of the campaign that bears on a unit says so by the deck's mark. Only those: the army's own
rules (detachment, enhancement, Leader) carry none.

- **An Upgrade card**: its kind's mark (`wi-dom-honour/skill/relic`) on its row in the unit's card, on
  its group in the card's modifier list (`upgradeKind` on the note, `mark` from `groupModNotes`), and on
  the unit's row in a list, the editor's and the view's (`RosterUpgradeMarks`).
- **A Location's war zone rule**: a block on the unit's card with `wi-dom-location`, in a battle with a
  Location only (a list outside a battle has none). Which rules reach which unit is read by hand:
  `src/data/dominatusWarZoneUnits.js`, through `warZoneRulesOn`; a rule about the table, a move any unit
  may make or a stratagem's price stays off the cards, its reason written there, and
  `dominatusWarZoneUnits.test.js` holds every rule of the deck to one entry. Text only, marked
  "apply it yourself". No mark on the list's rows: Defence Networks would stand on every unit.
- **Not marked**: an Agenda's roles (champion, prime target) are about scoring, and a Location's bonus
  is about drawing cards.

## The campaign (`/campaigns/dominatus/:id`)

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
- The app's draw is client-side randomness (friends at a table, not an anti-cheat), but it is
  written down: a `draw` event carries the cards that came before one is kept, so a reload or a
  second device shows the same cards and a second draw for the reward is refused (owner, 2026-11-01:
  "a reload drew again" was the hole). The fold checks the card kept against that draw, the pile and
  the hand.
- **The Warmaster corrects, the log stays append-only** (owner, 2026-11-01, "the booklet leaves
  everything to the Warmaster"): an `amend` event gives earlier events new payloads or takes them
  out, and the fold reads each in its own place (`liveEvents`) — so what followed is worked out
  again. The core says which events a correction touches: `battleAmend` (a result corrected — a side
  whose reward changes gives back its card and draws again; a battle taken out with its review and
  cards), `reopenPhase` (the last end of a phase undone with the next Location and the Relics and
  bonuses it handed out; refused while the next phase has battles — `reopenable`), `removePlayer`
  (only one with no battles and nothing owed — `removable`). A closed phase's battle is corrected by
  reopening the phase first (`battleLocked`): its end drew Relics on the Agenda Achieved cards it
  counted. On the page: a "…" on each battle and each player (edit — the Alliance is the
  Warmaster's; the player's cards and Agenda Achieved by hand, `adjust`; remove), "Change the
  Location" and "Reopen" on the phase tab. Not a roster: the booklet asks for a faction kept over
  the campaign, never a list (Upgrades go to units battle by battle).
- **The campaign around the battles** (owner, 2026-11-01, "do all of it"). Settings, the
  Warmaster's (`CampSettings`, one `settings` event): the Battle Schedule (`schedule`, the booklet's
  2 / 2 / 1 — `playedIn`, `scheduleProgress`: each player's count on Players, "the phase can end" on
  the phase tab), battles counted at once (`approve: 'auto'`), the Event Companion's timing (`format:
  'event'` — only notes on the end-of-phase rewards: the counts are the same, the moment is the next
  phase's first battle), and the player the Warmaster plays as (`me` — `myPlayer` answers it for the
  owner). Pairings (`pairing`, owner, taken back by an amend; `pairingsNow`) live on the battles tab (`CampPairings`), and "Play a battle" takes the opponent from the player's pairing. A battle carries the
  `phase` it was played in and the fold refuses it in another (a game sent after its phase ended).
  `likelyDuplicates` marks a waiting battle beside another between the same two in the phase.
- **The phase tab reads top-down** (owner, 2026-11-01, "everything here is bad"): what every player
  reads first (the schedule line, the Location folded to its head, their pairing, the Briefings one
  at a time behind a `.seg` of Alliances), then the Warmaster's block (`camp-wm-row`: Location, the
  end of the phase — its forecast in a dialog before it is done — and Reopen), then the Outcomes.
- **The story is on the page**: the phase tab shows each Alliance's Briefing (`DomBriefingCard`, the
  reader's own first; its Agenda links go to `/dominatus` from here), every ended phase's Outcome per
  Alliance by its Narrative Points (`CampOutcomeCard` — the Briefing's reverse, so its spine and its
  lore stay when lore is hidden), the final Narrative Points, and the chronicle (`CampChronicle`:
  every entry in words, corrections and refusals marked — refusals in the reader's language,
  `refusalText` → ui.js `campWhy_<reason>`; a new refusal reason needs its two labels).
- **A battle is played from the campaign** (`campaignHandoff.js`, "Play a battle" on the battles
  tab): the tracker's setup draft gets the phase, the Location, both players with their factions and
  Alliances, `settings.dominatus.campaign` and each side's `campaignPlayer` (carried by `makePlayer`).
  **Or from the setup itself** (stage 5, owner 2026-11-04): a Dominatus game's step 2 offers the
  campaigns this device plays in (`domCampaignOptions` — owner or member, its log read; a watcher's
  view link enters nothing); picked, it takes the campaign's phase and that phase's Location, and
  each side a campaign player — "you" your own (`campaignPlayerOf`), the other by the name when it
  matches, else picked from the list under the side (a member's own side offers only their player).
  The player's Alliance is the side's (the Alliance buttons grey). The lists already attached on
  step 1 stay — a campaign with rosters required greys Start as before.
  The setup shows the campaign in place of the phase and Location pickers ("Unlink" drops it), the
  pre-battle Upgrades offer only the cards that campaign player holds (`DomUpgradesEditor`, when this
  device knows the campaign), and `CampSendGame` opens on that campaign and those players, sends the
  phase, and says why the campaign refused it if it did.
- **The settings page wears the game setup's look** (owner, 2026-11-04: "so the inheritance shows"):
  the title over an accent line (`.setup-head`), blocks as cards with display-face headings
  (`.setup-card`, `.block-head`), two columns past 700px as the setup's steps 3–4, captions as the
  setup's (`.field > span`, "?" inside), and Cancel / Save in the setup's sticky row
  (`.setup-actions`). Those classes live in style.css, shared with GameSetup — not copied.
- **More settings** (owner, 2026-11-04, "all of them" — the booklet's "Modifying Dominatus" and more;
  `SETTINGS_DEFAULTS` in core, each enforced there): the battle size one for the campaign or one a
  phase (`size` a string or three; `sizeOf`, "Play a battle" plays the phase's); the Alliance kept
  from the first battle (`allianceLock` — a player's change is an ask, `allianceAsk`, answered on
  Players and in What next; a battle keeps the Alliances it was fought for, `alliances`, so an
  Honour stays with the Alliance it was won for); battles under strict rules (`strict` — "Play a
  battle" and the setup's campaign link turn them on, the setup greys "Free", a member's battle
  without them is refused; the battle event says `strict`); who plays whom (`pairBy`: anyone, the
  Warmaster's pairings, or pairings the app draws — `randomPairings`, "Draw" in What next and on the
  battles tab; with pairs a member's battle is with their pair only, and "Play a battle" offers only
  them); the end of a phase by itself (`phaseEnd: 'auto'` — `phaseEndsByItself`; the Warmaster's
  device writes the end, never on a tie the rules cannot break nor on a phase reopened); the date
  each phase is played by (`deadlines` — `phaseDeadline`, What next and the phase tab, in the
  warning colour once past); cards more on every reward (`drawExtra`, 0–2); Upgrades a battle
  (`upgradeLimit`, 1–5, carried to the game as `settings.dominatus.limit`, Titangrave's +1 on top);
  players' cards open or each to their own (`hands` — `handOpen`; the chronicle's kept card unnamed
  too; a screen's discretion, the log stays every member's to read).
- **The settings are a page** (owner, 2026-11-01): `/campaigns/dominatus/new` starts a campaign with
  them and `/campaigns/dominatus/:id/settings` changes them (`CampaignSettingsView` + `CampSettingsForm`,
  each setting a `CampSettingSeg` with its "?"; the old dialog and Rename are gone — the name is a
  setting). The core holds the defaults (`SETTINGS_DEFAULTS`) and enforces each: joining by the link
  (`join`), the Alliance the player's or the Warmaster's (`allianceBy`), the faction kept from the
  first battle (`factionLock` — after it a player's new faction is an ask, `factionAsk`, the Warmaster
  accepts or turns down on Players and in What next; owner 2026-11-03), rosters none / optional / required (`roster` — a `roster` event
  carries the list's share code, a snapshot anyone opens at `/roster/shared#r=`; required refuses a
  member's battle where a side has none), the battle size "Play a battle" sets (`size`), battles
  entered by players or the Warmaster alone (`battlesBy`), rewards taken by players or handed out by
  the Warmaster (`rewardsBy`). The screens say what a setting closes instead of hiding it.
  "Play a battle" attaches each player's list (the share code decoded, `v` kept, so it is migrated
  on read like any game's snapshot — `armyFromRoster` in `rosterHandoff.js`, shared with the
  builder's "play this list"); a list of another faction than the campaign keeps is left behind.
  The setup's roster button swaps it for one of the player's own. With rosters required, the setup's
  Start greys while a campaign side has no list, the reason in the pinned bar over it
  (`domRosterMissing`). The dialog closes in the same tick as the push (`playCampaignBattle`'s
  `leaving`): closed before the lists were read, its Back-to-close step cancelled the push.
- **Choosing a card is tapping the card** (owner, 2026-11-01): the drawn cards' dialog and the
  Warmaster's "Add a card" (`CampCardPicker`: the deck by pile, Honours by phase, Relics by Alliance,
  each card folded to its head — `DomUpgradeCard folded`) select by a tap, frame the chosen card in
  its deck colour, and keep or add by one button at the foot that names the card. A card taken off
  in the cards dialog stays struck through with "Put back" until Save. The Warmaster's buttons on
  another player's reward say "for the player". The "?" by the campaign's header explains the open
  tab, each setting has its own (`campHelp_*`, HelpText markup, `OptionHelpModal`).
- What waits is noted on the device (`noteWaiting`, `c.waiting`) so the campaign list and the
  tracker home's door show ⚠ without folding the log; the list reads every campaign again on entry
  (`syncAll`) and shows each one's phase.
- Device side: `src/composables/useCampaigns.js` (the campaigns this device knows, with its
  credential for each — the account for the owner and for a member, the view token from `?t=` or
  from an invite opened signed out, which keeps the link as `invite`),
  pages `src/views/campaigns/Campaign(s)View.vue`, blocks in `campaign/`. A finished
  Dominatus game is sent from its screen (`CampSendGame`, battle id `g-<game id>` so it counts once).
  The event is core's `battleEvent`: the victor, Agenda Achieved, the phase, and the Upgrades each
  side gave its units (`upgrades: [{ side, slug, unit }]` — a record for the chronicle, "Fire and Fury
  → Leman Russ (Ann)"; the fold keeps the deck's cards, at most 4 a side, and never refuses a battle
  over them; the API stores payloads as they come, so it needed no change).
- **A battle started from a campaign goes back by itself** (owner, 2026-11-03, stage 4): on the
  finished screen (`CampSendGame auto`, TrackerGameView — also reached by "Finish" on the tracker
  home's card, `finishHere`) it is sent once both sides are the campaign players it was started for.
  The campaign is read first: the other phone of a shared game may have sent it, and a duplicate
  refusal from that race is not said. Any other refusal or a failed request is, and the button stays.
  Once the battle is in the campaign the screen says so in the open, not in the fold — sent, counted
  or turned down, the campaign's name a link to it (`campSent*`, owner 2026-11-04).
  The history screen sends by the button only. The Warmaster still counts it (`approve`).
- **Playing needs an account** (owner, 2026-11-05; API migration 008 — 007 had guests): a member
  IS an account, the campaign is in `GET /campaigns` on every device (`refreshAccount`) and opening
  the link again returns the same member. Guests went because their membership lived in one
  browser: the link opened inside a messenger, then in the app, made two members, the second unable
  to speak for the first. Signed out, the invite only reads — the device is a reader that keeps the
  link (`invite`), the page asks to sign in (`CampSignIn`, the same block the list uses to start a
  campaign) and joins by itself once the session is there. Viewing by the view link needs no account.
- **A credential is an account's, and the entry says whose** (owner, 2026-11-05: the Warmaster's
  forms showed under whatever account was signed in, and the server refused every save as
  `forbidden`). An owner's or member's entry records `account` / `accountName`; another account
  signed in turns it into a reader that keeps what it held (`heldRole`) — at once by the id
  (`matchAccount`, a watch on the signed-in user), and by the server's `you.role` on each read,
  which is the truth (an entry from before the field learns it there; a read for an account it has
  not confirmed takes the last event again, since a 204 carries no `you`). The view token goes
  beside the account on every request. The page says whose the campaign is and offers to sign in to
  another account (`CampSignIn switchAccount`); that account back, the entry is the Warmaster's
  again with nothing reopened.
- **"This is me"** (owner, 2026-11-05): the Warmaster may enter a player by name for someone who has
  not opened the link; that player, joining, takes the entry (`takeablePlayers` — no member, not the
  Warmaster's own; a `player` event with `member` = themselves, which the fold allows a member who
  speaks for no one, once) instead of signing up a second one. Players shows them above the sign-up
  form, with a ConfirmModal; "What next"'s sign-up step leads there, closed joining included. The
  Warmaster can still give a player to any member in the player's Edit ("Who enters for the player",
  the members named by their account).
- **"What next" above the tabs** (`CampNext`, owner 2026-11-03: a player did not know what was
  asked of them): the core's `nextSteps(state, me, owner)` lists this reader's steps — what they can
  do first (a reward with the battle it came from, the pairing to play, battles to count, the
  Location, the end of a played phase), then what they wait for — each with the tab where it is
  done. A watcher sees nothing. With it: a reward names its battle's opponent, a line above "Play a
  battle" / "Enter a battle" says them apart, and a player's "this phase" says how many of their
  battles wait for the Warmaster.
- Gates: `src/core/dominatus/campaign.test.js`, `src/composables/useCampaigns.test.js`.
- **The page reads as the rules page** (owner, 2026-10-31): blocks are sections under the Dominatus
  group head (`.dgroup-label` — CampaignView loads `dominatus.css`), the frame left to the cards; the
  phase's Location is its `DomLocationCard`, cards drawn by the app are `DomUpgradeCard`s with Keep,
  a card a player holds opens its text in the rules popover (`showUpgrade`), Alliances are emblem +
  name (`DomAllianceName`). The page is five tabs (owner, 2026-11-01), always the same in the same
  order — the phase, the Alliances, battles, players (with the invite), rewards; a tab holding
  something for this reader (their rewards, the Warmaster's battles to count) carries PageTabs'
  warning mark and the page opens on it until the reader picks a tab. Picks are `CampPick` (AdaptivePicker — no native
  select), folds `CampFold` (CollapseTransition — no `<details>`), errors the app's `AppToast`. A new
  campaign, a player and a battle are forms behind their buttons (`CampOpenForm`), closed only once
  sent; the links are a button and a dialog (`CampShare`). The campaign's own actions are its header's
  "…" (`ActionMenu`): Rename (a `settings` event — the API carries the name into the owner's list)
  and Delete for the Warmaster, Remove from this device for anyone else.

Booklet readings worth knowing: Agenda Achieved cards gained in a phase are kept into the next
and discarded at ITS end (step V "from previous phases"); the Event Companion's variant (Relics and
Discard at the next phase's first battle) is not modelled — the Warmaster's `adjust` covers it.
`adjust` keeps the Agenda Achieved cards it leaves in place with their own phase (a card from the
last phase is still discarded at the end of this one); only the cards it adds are of this phase.

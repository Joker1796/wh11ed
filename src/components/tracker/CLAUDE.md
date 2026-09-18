# CLAUDE.md — Game Tracker

Directory-scoped doc for the Game Tracker (`/tracker*`). Also read this when touching
`src/composables/useTracker.js` (store, flat, not in this directory), `src/composables/trackerFactions.js`/
`trackerLayout.js`/`stratagemPhases.js`, or `src/views/tracker/{TrackerHomeView,TrackerGameView,
TrackerHistoryView}.vue` — the views live under `src/views/tracker/`, which the **Roster Builder**
also shares (its own views sit alongside these, see `src/components/roster/CLAUDE.md`). Third
top-level section (`/tracker`) — a client-side, offline 2-player VP tracker for a game of 40k
11th ed. **Not part of the rules-reference data→view pipeline** (see root `CLAUDE.md`'s
Architecture section) — its own state/data below.

## State

`src/composables/useTracker.js` — a module-singleton store (same pattern as `useLocale`) persisted to localStorage under `wh11ed-tracker-current` (active game) and `wh11ed-tracker-history` (finished games), via deep `watch` (500ms debounce, flushed on `pagehide`/`visibilitychange`). **Critical transitions (`archiveGame`/`discardGame`/`resumeFromHistory`) call `saveNow()` for a synchronous, immediate write** — the debounce alone lost finished games on installed iOS PWAs that get frozen/killed without firing `pagehide`. `flushSave` writes history before current so an archive can't drop the game from both keys. A game = `{ id, phase: 'setup'|'playing'|'finished', currentRound, settings:{firstTurn,layout:'A'|'B'|'C'|'custom',customLayout,battleSize:'incursion'|'strikeForce',twist,twistMission,scoreMode:'vp'|'bp'}, players:[P,P] }`. `battleSize` (rule 25.03) sets the setup DP budget (`BATTLE_SIZES` in `useTracker.js`: Incursion 2 DP / Strike Force 3 DP); `twist`/`twistMission` are the optional pre-game Twist (see below); `scoreMode` toggles VP vs Battle Points results. `layout` is the recommended A/B/C of the dispositions' matchup, or `'custom'` with `customLayout:{id,image,edge,label}` when any of the 45 layouts is picked — resolved everywhere via `resolveLayout(settings, dispA, dispB)` in `composables/trackerLayout.js`. Player = `{ name, factionSlug, detachments[], disposition, role, secondaryMode:'tactical'|'fixed', battleReady, primarySlug, cp, rounds:[{primary, picks{'bi:ri':count}}×5], secondary:{deck,hand,drawn{slug→round},discarded:[{slug,round}],scored:[{slug,round,picks,vp}]} }`.

## What to track

**`src/data/trackerOptions.js` is the table of everything a game can be asked to keep** — one row
per option, carrying its `setting` field, its ui.js label and help keys, its `default`, whether it
`remember`s the last game's choice, any retired field name (`legacy`), and an `available(ctx)`
predicate. `TrackOptions.vue` draws the table and is mounted **both** in the wizard's step 4 and in
`EditSetupModal`, so a row offered in one is offered in the other. That is not tidiness: the two
hand-written copies it replaced had already drifted — the wizard offered the army-rule toggle for
any chosen faction, the dialog only for a faction with an interactive tracker spec, so a game whose
faction had none showed a card that could never be turned off.

`ctx` is `{ you:{faction,trackable}, opp:{faction,trackable}, anyRoster }`, keyed by **side**, never
by index: `players[0]` is the first-turn player once a game starts, so the block must not index the
array itself.

**`tracks(settings, key)` is the only reader.** It resolves the retired name, the row's default
(which is what answers for every game saved before an option existed) and the `requires` tree — no
caller writes its own `?? true` or remembers which rows hang off which.
`defaultTrackSettings(lastSettings)` seeds the wizard, `trackSettingsOf(settings)` fills an older
game in for the edit dialog, and **`normalizeTrackSettings(settings, ctx)` is what gets written on
Start/Save**: a row the game cannot offer is stored OFF, because a disabled checkbox never carried
the player's answer. Without it "Track phases", remembered from a game that had a list, raised the
phase row in a game that had none.

**Two groups.** `group: 'game'` is the tracker's own screen: CP, the army rule per side
(`trackArmyYou`/`trackArmyOpp`, legacy `trackArmyRule`), the clock (`trackPhases`) and the phase
reminder under it (`trackPhaseRules`, `requires: 'trackPhases'`). `group: 'roster'` only means
anything with an army list attached: the modifier master (`trackModifiers`) and the five families
of switch under it (`trackUnitStates`, `trackArmyStates`, `trackStratagems`, `trackAuras`,
`trackAbilitySets`, each `requires: 'trackModifiers'`). What each family governs on the roster
screen is in `src/components/roster/CLAUDE.md`.

**The clock moved out of the roster group on 2026-08-25, and the reason is worth keeping.** It was
offered only alongside an attached list, because the roster screen was the only thing that read a
phase. `PhaseRules` is the second reader **and it needs no list** — an army rule and a detachment
rule name their phase in any game — so the gate went with its justification. Do not put it back
without checking who reads the clock now.

**Every row is always drawn.** A row this game cannot offer is disabled with the reason under its
caption, never hidden. Hiding made the list a different length in every game, and it meant "Track
phases" was seen only by someone who had already attached a list — the people who needed telling
were exactly the ones who never saw it. Its help button stays live: what a greyed-out option would
do is precisely what you want to read while it is greyed out.

**What may NOT become a row: the missions.** Rows for the secondaries and for scoring the primary
by conditions were built and removed the same day (2026-08-25) — the primary, the secondaries and
the way they are scored *are* what the tracker is for, and a switch that hides them offers to turn
the app into a notepad. A row has to be an aid **around** the game — a counter, a reference card, a
clock — never the game itself. By the same rule the ~990 **unconditional** modifier effects are not
five more rows: they are this list's correct numbers, not tracking, and they hang off the master
alone.

**Turning an option off hides a block; it never clears what that block recorded.** A CP count, a
flipped condition and a spent stratagem all stay in the game, so a toggle flipped mid-game is fully
reversible. For the modifier families that means a switched-off family stops PROVING its conditions
and the numbers it held fall back into the "possible" list with their condition text — the same
honest degradation a game without phases already has. **A disabled family can make a card say less;
it can never make it say something false.**

**The help "i" sits OUTSIDE the `<label>`, not in it.** A label forwards every click inside it to
its control, so a help button in there flips the very setting it explains. The two share a dividing
line instead — the same attached pair as the roster's condition chips (`ConditionChips.vue`'s
`.cond-info`), including the `z-index` on the lit half. `OptionHelpModal.vue` is one dialog for all
of them (prose, blank line = new paragraph); a setting whose answer is a *table* keeps its own
(`ScoreHelpModal`). `src/data/trackerOptions.test.js` gates that every row's label and help exist in
**both** locales — `ui.js` has no parity check of its own.

## Slices — the game as multi-device sync moves it

`src/composables/gameSlices.js` (pure, light) cuts a game into five independently versioned
parts: **`shared`** (everything at the top level but `players`: the clock, `settings`, `phase`
and the finish metadata), **`side0` / `side1`** (a player object minus its list and minus
`isYou`) and **`roster0` / `roster1`** (`rosterId` + `roster`, and per member in doubles). A
slice is the unit of conflict AND of rights: a side's two slices are written by that side (both
partners in doubles), the shared one by anyone in the game. The roster is its own slice because it
is the heaviest thing in a game and changes only on attach/detach — inside the side slice it would
ride along with every CP tap. Measured on a fully played five-round Strike Force game with lists on
both sides (2026-09-17): whole game 7.5 KB, one list 1.3 KB, a side without its list ~2.2 KB (of
which the secondary deck/hand/scored ~1.3 KB), shared 0.6 KB.

**`isYou` is device-local and never synced** — the other phone's answer is the opposite one, and
the stats page, the You/Opponent labels and `trackArmyYou`/`trackArmyOpp` all read it.
`applySlice` keeps the local flag; `assembleGame(slices, { you })` sets it for a joining device.

**`useTracker().applyRemote(name, data)` is the one door another device's changes come in
through.** It writes the slice into `current` IN PLACE (`applySlice`), so the game object and the
player objects keep their identity for every reader holding `current.value.players[pi]`, the deep
watcher persists it like a local tap, and no other slice is touched. It refuses (false) with no
valid game to write into — a device that has not joined yet assembles the whole game instead.
`changedSlices(before, after)` (stable-keyed JSON, so key order after an apply is not a change) is
the same comparison the sync layer makes to decide what to send. The plan and its reasons live in
the hub journal `journal/active/2026-09-16-multi-device-sync.md`.

## The shared game (`useParty.js`)

One game on several phones. The host — the only one who needs an account — shares the game in
progress (`share()`: `POST /party` with the five slices); the others open `/tracker/join/:invite?`
(`PartyJoinView.vue`), by link, QR or the six-digit code, and take a SEAT named after one of the
game's players (`join()` then `takeSeat()`, which `assembleGame`s the server's slices with `isYou`
on the chosen side and REPLACES `current`). The handle lives in the game — `current.party = { id,
memberId, token, side, mi, host, seq, versions, status }` — like the broadcast token, so it
survives reloads through the store's own persistence; the base cut (the slices as the server last
saw them) sits in `wh11ed-party-base`. **What is shared is the game, never the navigation.**

**The tick.** `sync()` compares the game's cut against the base, sends the slices that differ
(each with the version it was based on) together with `since` — the last party `seq` this phone
saw — and takes back every slice someone else changed, in ONE `POST /party/{id}/sync` (the gateway
charges per request). A `409` means a write was based on a stale version: the server's copies
land through `applyRemote`, this phone's change is gone, and the player taps again — the honest
outcome when two partners edit one side inside three seconds. `423` is a finished game a guest
cannot reopen; `401` the host removed this phone (`party.revoked`); `404` the host ended it
(`party.ended`) — both leave the game on the phone as its own. A slice this phone may not write
(`canEdit(side)`: the host any, a guest its own side) snaps back to the base rather than going
out. Nothing is queued offline: the base stays put and the first tick back sends the difference.

**The gate is on receiving.** A phone polls (3 s, the server's micro-cache window; 15 s once the
game is finished, because only the host can reopen it and a guest who stopped listening would
never learn; 10 s from any screen for a host feeding a broadcast) while a LIVE screen is mounted —
`TrackerGameView` and the game's own roster (`RosterViewView` in-game, which writes rule switches)
call `attach()`/`detach()` — and the page is visible and online. Coming back polls at once. Leaving
the screen, `visibilitychange: hidden` and `pagehide` send what is pending first (`flush`, with
`keepalive`), so a score corrected a second before the lock does not wait for the unlock. A local
change goes out 800 ms after the last tap, not on the next tick.

**Rights on screen, never hidden — and two different questions.** `canWriteSlice` is the RIGHT
(the host any slice, a seated guest its own side and the shared one — what the server enforces);
`canEdit(pi)` is what the screen lets this phone TOUCH: its own side, and a side no other phone
sits on. The server sends `held` (the sides other live members hold) with every state-bearing
answer, and it lives on the handle; a held side is locked on the host's screen too — "your side is
yours", one rule instead of a permission matrix — and the host takes it back by freeing the seat
(kick) in `PartyModal`, or keeps both sides open on its own phone with that dialog's one switch
(`party.scoreAll`, local to the handle, off by default; for a guest who joined to watch). The right stays wider than the lock on purpose: a setup edit rewrites both
sides, so a server-side lock would break the host's own dialog. `RoundTracker` greys the locked
side with the reason under its title (the host's line names the way back) and puts `inert` (a
presence attribute — `undefined`, not `false`) on what SCORES — the primary, the deck, the CP
stepper — and passes `readonly` to `ArmyTrackerCard`, which inerts its own controls and leaves the
rule text, the active rule and the spent log live; the card itself is never inert, because the
opponent's setup facts, list and army rule are things to READ mid-game (the first complaint about
the shared game was a guest who could not open the other side's rule). The setup gear opens for a
guest too: `EditSetupModal` in guest mode shows only the option blocks, `TrackOptions` with
`lockShared` leaves live the rows the table marks `local` (`trackArmyYou`/`trackArmyOpp` — the
same flag `gameSlices` keeps out of the sync) and disables the rest with "host only", and Save
writes only those. The finished screen's Resume is disabled for a guest and its primary button
reads "Save to my history". `RosterViewView`'s `canSwitch` includes `canEdit(pi)`. `SyncIndicator.vue` sits on the round bar: a quiet dot (tap: how long ago), a
spinner only for a request older than 400 ms — except on resume, when it is wanted at once — and a
warning glyph with its reason. `PartyModal.vue` (the people icon beside the broadcast one) is the
host's invite (link, QR via the lazily imported `qrcode`, code with its ten minutes, a fresh code or
link), the member list with last-seen, seat moves, kick, hand-over and "stop sharing"; a guest sees
its standing and "leave".

**Leaving is implicit.** `useParty`'s deep watcher notices the game leaving with its handle —
archived from the finished screen, from the tracker home's "New game", from the join view's
"save it and join" — and says goodbye for it: a guest frees its seat (`POST /party/{id}/leave`),
a host ends the party (`DELETE`). `archiveGame` strips `party` from the record. `init()` arms
that watcher; the tracker home, the game screen and the game roster all call it.

**Deliberately not synced:** `isYou`, `trackArmyYou`/`trackArmyOpp`/`trackArmyRule`, `party`,
`broadcast` (see Slices). In doubles the host's seat is the TEAM (`mi: null`); partners joining
pick a member seat. The server contract is `wh11ed-api/README.md` "A shared live game".

## The phase reminder (`PhaseRules.vue`)

Under the clock, one accordion: **what has something to say in the phase the game is standing on**,
for both players. `settings.trackPhaseRules`, on by default, and it needs the clock (`requires`).

**Two sides, not one.** 55 of the datasheet abilities that name a phase name their OPPONENT'S ("In
your opponent's Movement phase, if an enemy unit ends a move within 8"…"), and those are the ones a
player forgets — in the opponent's turn they are not thinking about their own cards. `usableInSlot`
from `stratagemPhases.js` answers per player, `mine` differing; it is the same predicate the
stratagem filter uses, so the two can never disagree about what "your Shooting phase" means.

**The data is a generated sidecar, `src/data/phaseIndex.js` (`npm run phases:index`)** — names,
phases and anchors, **no rule text at all**, ~600 abilities on 553 units plus 98 army/detachment
rules, 81 KB for all 30 factions. This screen imports neither `data/factions/<slug>.js` (~88 KB) nor
`data/datasheets/<slug>.js` (~132 KB, plus ~104 KB for the RU overlay) — `GameSetup` is
`defineAsyncComponent`-loaded for exactly that reason — and pulling four heavy chunks onto the
playing screen to show five lines would fight the product's central decision. A line shows a name
and the reader taps through to where the text already lives. Re-run the generator after editing a
faction rule or a datasheet ability, as with the other four indices.

**Keyed by what the caller already holds.** Detachments are keyed by NAME, not id, because the game
and the roster both store names — an id would mean loading the faction bundle to translate one.
Unit names ride in the index for the same reason (no second import just for names). An allied
unit's id carries its own faction (`agents-of-the-imperium:callidus-assassin`, `allySourceOf`), so
it is looked up in that faction's entry rather than missed.

**No classification of "activatable" vs "passive", deliberately.** It was tried and it does not
survive contact with the data: "in your Command phase, you can return 1 destroyed model" and "In
your opponent's Movement phase, if an enemy unit ends a move within 8"…" are both exactly what a
reminder is for, and no phrasing test separates them from a passive mention. Naming the phase is
the whole test — erring towards SHOWING, the same call `usableInSlot` already makes.

**Stratagems are a link, not a list.** `/stratagems` is in this same subnav, already groups by
phase and already knows both players' detachments; a second list would be two copies of one thing
that drift apart. There is no count beside the link because counting would mean loading the faction
rules bundle onto the playing screen — the one thing the index exists to avoid. **The link carries
the phase** (`/stratagems?phase=fight`) and `StratagemsView` reads it into the INITIAL values of
`byPhase`/`openPhases` — not by assigning them afterwards, which would fire the persist watcher
and remember a view mode the reader never chose. Landing on six collapsed accordions is what makes
such a link pointless.

**Every line is a way in.** A name the reader cannot get to is half a reminder, so a line
navigates: a unit to its card — inside the attached list (`/tracker/game/roster/:pi?unit=<uid>`,
which `RosterViewView` reads into its initial `viewingUid`) so the game's own modifiers apply, or
to `/factions/:slug/datasheets/:id` when that player fielded no list; a rule to its anchor on the
faction page. A **detachment** rule has to be selected through `useFactionChoice` first, because
that page renders only the active one — the same two steps a search result takes, which is why the
index stores the same anchor ids the search index does. A rule carried by more than one ENTRY opens
the list instead of a card: three squads of the same datasheet are three cards, and there is no
single one to mean (counted by entry, not by name — the line still says "Boyz" once).

**Closed by default, count in the header, remembered** (`wh11ed-phase-rules-open`). An open block
pushes the round's actual scoring down the screen, which is why CP and the army-rule card were put
BELOW the secondaries in the first place; "3 rules in this phase" does the reminding from the
closed state. One line per RULE, with the units that carry it named under it — three Intercessor
Squads with the same ability are one reminder, not three identical lines.

## Setup wizard

**Setup is a four-step wizard** (`GameSetup.vue`, internal `step` ref): step 1 "Armies" (battle size, then per-player name + faction + detachments + battle ready); step 2 "Mission" (**the twist**, then active disposition, secondary mode + fixed picks, full primary `MissionCard`); step 3 "Field & deployment" (**who is the Attacker** — one linked seg, moved here from the army cards on 2026-09-17 because the Mission Sequence rolls for it after the mission and before deployment, and what it decides is the side of the table the layout marks; then the recommended layout A/B/C via `LayoutCard`, then who goes first); step 4 "Settings" (the score mode and the two option blocks). The secondary decks differ by role, but the four fixed-capable cards are the same slugs in both, so fixed picks made on step 2 against the default roles survive a flip on step 3. **Steps 3 and 4 are two columns above 700px** (`.two-col`, the threshold the player cards of steps 1–2 already use) so each fits one desktop screen like those do: step 3 puts the layout picture left (two thirds), capped to the height the screen has left (`max(260px, 100dvh − 23rem)`), and the two deployment questions plus the layout tabs in one card right (`LayoutTabs.vue` is drawn in the side column or above the picture by the same breakpoint, via `useMediaQuery`, so the tabs exist once); step 4 puts the score mode with the `game` option group left and the `roster` group right — the split `trackerOptions.js` already makes. DOM order is phone order (questions, then the picture); the grid reorders.

**The steps were re-cut on 2026-08-25** rather than a fifth being added for the roster options, and two of the moves were fixes rather than tidying. **The twist belongs with the mission because it CHANGES it**: Scrambled Communications swaps the two primaries, Mirrored World replaces both, and step 2's own preview goes through `derivePrimary(disp, disp, settings)` — which reads `settings.twist`. Chosen on the last step, as it was, it rewrote a card the player had already read and walked away from. **Who goes first belongs with the layout** — both answer "where and in what order do we set up", and step 3 was otherwise one tab row and a picture. What was left, the score mode and the toggles, is a settings page and now says so. The step indicator collapses to a compact "N / 4" on phones (`≤560px`). The two players are labelled **"You" / "Opponent"** (`trackerYou`/`trackerOpponent`) throughout the tracker (also the empty-name fallback in `RoundTracker`/`ScoreBoard`/`ScoreBreakdown`/history); player 1's name pre-fills from the most recent finished game (editable). The chosen `settings.layout` is shown next to the round label in `RoundTracker`. Parent contract unchanged (`@start`/`@cancel`).

**A name the player typed sets no floor — anywhere.** The same bug as the setup cards below,
found on a phone in a doubles game (2026-09-15): the CP row is one non-wrapping flex row, and in
doubles it carries **two** army buttons labelled with the members' own names. A flex item never
shrinks below its min-content — the longest word of that name — so the row's minimum came to
~367px against ~349px of card on a 393px iPhone; it overflowed its card and the whole DOCUMENT
scrolled sideways, which on iOS also drags the fixed navbar off the visual viewport (that offset
is the symptom a player actually reports). The fix is the pattern, not the patch: `.cp-row` wraps,
its buttons are `flex: 1 1 auto; min-width: 0`, and the label is its own `.proster-label` span
with `text-overflow: ellipsis` and the full name on `title`. A second line is spent only when the
width is genuinely gone. Only the FIRST button keeps `margin-left: auto` — one on each split the
free space between the pair instead of holding it at the far end.

**The two army cards use `minmax(0, 1fr)`, not `1fr`.** A grid item's automatic minimum is its
MIN-CONTENT width, and the attached-roster line inside a card is `white-space: nowrap` so it can
ellipsize — which makes its min-content the WHOLE name. A list called "We build thick city on rock
and roll" therefore widened the card past the screen and the whole page scrolled sideways, ellipsis
and all (an ellipsis only clips a box that was allowed to be narrower than its text). `EditSetupModal`
carries the same pair of cards and the same fix; the history page's roster pills take `max-width:
100%` for the same reason.

**`DetachmentPickerModal` offers only what a tap could do** (2026-08-28): a detachment that no
longer fits the Detachment Points, or that clashes with a tag already taken (25.04), is off the
list rather than greyed. The screen it draws is shared by the wizard and by both Roster Builder
setup screens, and once a 3 DP budget is spent that was almost every row — a page of dimmed
entries reads as a broken screen, not as a constraint. Two things keep it honest, and neither is
optional: a line above the list says how many are not on offer and why, and a **Clear selection**
button (`@clear`, each caller emptying its own array) brings them all back — with a full budget
that is the only way back to the whole list. This is deliberately the opposite call to
`RosterPickerModal`'s, where a list of another faction stays visible but disabled: there, hiding
makes a collection look empty and reads as "my list is gone"; here the hidden rows are a budget
away, not a collection.

The **twist** is chosen on step 4 via a "Choose twist" button that opens `TwistPickerModal.vue` — a full-screen (bottom-sheet on mobile) accordion list of the twist rules with per-twist "Select" + a "Random twist" button; picking one returns to step 4. Mirrored World's shared-mission sub-picker stays inline on step 4.

**Setup is persisted as a draft** (`setupDraft` in `useTracker.js`, localStorage `wh11ed-tracker-setup-draft`, same auto-save machinery as `current`/`history`): the in-progress wizard (step + players + settings) survives reloads and navigating away. The Tracker home shows a **"Continue setup"** button when a draft exists; "New game" clears the draft and starts fresh; `start()`/cancel clear it. **Starting a new game (or resuming a past one) while a game is in progress does NOT discard the live game** — `TrackerHomeView` first archives it to history via the normal end flow (`finishGame('early')` + `archiveGame()`), so it's saved at its current score and stays resumable. GameSetup hydrates from the draft at init (before its reset watchers register) and deep-watches its state back into the draft. This same hydrate-from-draft mechanism is what `rosterHandoff.js` (Roster Builder) writes into to pre-fill setup from a saved roster.

## Scoring

**Scoring** is by *condition*, not free entry: each mission block row is scored via `ScoringModal.vue` (a count stepper for "For each…" rows, a checkbox otherwise); `picks` store per-row counts keyed `blockIdx:rowIdx`, and VP = Σ count·rowVP. Caps: primary **15/round**, **45/game**; fixed secondary **20** each; secondary **45** total; Battle Ready **+10**. `scorableBlocks(slug, role, round, locale)` round-gates blocks by their English heading (`BLOCK_ROUNDS`) — e.g. "Second Battle Round Onwards"/"End of Battle" aren't scorable in round 1 — and derives the per-each flag from the **English** text (display text is localized). Lookup/logic always read `missions.en` (slug/VP/structure are language-agnostic); `missionBySlug(slug, role, locale)` overlays `missionsRu.js` text for display only. **`or` brackets are mutually exclusive:** setting one bracket row clears the competing rows in its group (`orSiblingKeys` in `setPrimaryRow`/`scoreSecondaryRow`); per-tally "For each…/Each time…" `or` rows stay independent (and don't show the "Or" label).

**Tactical secondaries** (`SecondaryDeck.vue`): random "Draw card", **"Choose"** a specific card from a picker modal, and a per-card "⋯" actions modal — *Set aside* (`discardFromHand`, keeps VP) or *Return to deck* (`returnSecondaryToDeck`, full undo: drops the card's VP, redrawable). `drawSpecificSecondary`/`returnSecondaryToDeck` live in `useTracker.js`. Fixed mode is locked at setup. Tapping a card opens `ScoringModal`, which also shows the mission **`briefing`** and — for cards whose briefing has a **WHEN DRAWN** action (`mission.whenDrawn`, see Data) — a one-tap redraw button: `redrawSecondary(pi, slug, mode)` drops the just-drawn card (it has scored nothing) and draws a random replacement; `mode:'shuffle'` returns it to the deck, `mode:'discard'` removes it from play. It's offered only in tactical mode, auto-gated where the condition is computable (`gate:'first-round'` → only round 1; `gate:{pairedActive}` → only while the paired card is in hand) and always offered for board-state conditions the app can't check.

## Data

`src/data/missions.js` (`{ en, ru:en }`, 25 primary + 36 secondary; primary auto-selected by the two players' dispositions via `primaryFor`; also exports `getMissions(locale)` for the Event Companion Missions page — see `src/components/event/CLAUDE.md`); `src/data/missionsRu.js` (RU overlay of block text — **mission names & dispositions stay English**). Some cards carry an optional **`briefing`** (the intro text above the scoring blocks — only the ~26 cards that have one): an array of parts, each `{ label?, text }` (a paragraph) or `{ action, rows:[{label,text}] }` (an OBJECTIVE ACTION block like Cleanse/Plunder), transcribed from the card fronts (cards that defer to "(see reverse)" have none). RU `briefing` mirrors the EN structure and is swapped in **wholesale** (not merged per-field) by `localize`/`localizeMission`; rendered by the shared `MissionBriefing.vue` (used by both `MissionCard.vue` and the tracker `ScoringModal.vue`) above the blocks. Secondaries whose briefing is a WHEN DRAWN deck action also carry a language-agnostic **`whenDrawn`** `{ mode:'discard'|'shuffle', gate?:'first-round'|{pairedActive} }` (EN-only logic field, survives the RU overlay via the `...m` spread) — see the Tactical secondaries note above for how the tracker applies it. detachments/factions come from `src/data/mfmFactions.js` via `src/composables/trackerFactions.js` (`FACTIONS`, `FACTION_GROUPS`, `detachmentsFor`, `detachmentInfo`) — **split out of `useTracker.js` on purpose** so the heavy ~290 KB faction dataset only loads with the setup wizard (`GameSetup` is `defineAsyncComponent`-loaded in `TrackerGameView`, with a `SetupLoading` spinner), not on every in-game/finished screen. The store (`useTracker.js`) no longer imports `mfmFactions.js`; don't re-add it. The mission rules themselves are published only as card images, so `missions.js` was vision-transcribed (see `scripts/fetch-mission-cards.py`); MFM points data is scraped by `scripts/scrape-mfm.py`.

## Files

Views `src/views/tracker/{TrackerHomeView,TrackerGameView}.vue`; components `src/components/tracker/{GameSetup,RoundTracker,SecondaryDeck,ScoringModal,ScoreBoard,ScoreBreakdown,NumberStepper,SetupLoading}.vue`. The finished screen shows score boxes + a collapsible GDM-style per-round breakdown grid (`ScoreBreakdown.vue`). Dates are formatted via the shared `useFormatDate` composable. Out of scope: Deployment Zones.

**Modals** — every dialog uses the shared `src/components/BaseModal.vue` (overlay shell, `.modal-head` + localized close button, props `title`/`maxWidth`/`maxHeight`/`zIndex`, default-header or `#header` slot for custom headers) which wires `src/composables/useModalA11y.js` (Escape-to-close, Tab focus-trap, initial focus into the dialog, focus-restore to the trigger, `aria-labelledby`). **Do NOT add a body scroll-lock** there — on iOS Safari `body{overflow:hidden}` resets scroll (sticky-modal bug); background scroll-chaining is already contained by the global `.modal-body { overscroll-behavior: contain }` in `style.css`. iOS safe-area padding for the bottom-sheet modals is a global rule (`.modal-overlay > .modal`) — BaseModal keeps that class/structure. New dialogs should wrap `BaseModal`, not re-implement the shell. `BaseModal` renders via `<Teleport to="body">` — a test mounting a `BaseModal`-based component must assert against `new DOMWrapper(document.body)`, not the mounted wrapper's own `.text()`/`.find()` (see `src/components/tracker/modals.test.js`). (`KeywordPopover` stays custom — it's an anchored non-blocking popover, not a dialog.) For yes/no confirmations use the reusable `src/components/ConfirmModal.vue` (wraps `BaseModal`; props `title`/`message`/`confirmLabel`/`cancelLabel`; emits `confirm`/`close`; parent shows it with `v-if` and runs its action on `@confirm`) — **never `window.confirm`**.

**Twists** (optional pre-game modifiers, rule data in `eventCompanion.js` `twists` and browsable on the Missions page — see `src/components/event/CLAUDE.md`) are selectable in setup step 2 (pick / **Random** / **No Twist**). The chosen `settings.twist` applies to both players for the whole game and is shown as a collapsible reminder in `RoundTracker`. Two twists change the Primary Mission **mechanically** via `derivePrimary(myDisp, oppDisp, settings)` (the single primary-derivation point, used by both `makePlayer` and the setup preview): **Scrambled Communications** swaps the two players' primaries; **Mirrored World** sets both players to one shared mission from `MIRROR_MISSIONS` (the five `mirror:true` primaries) — chosen in setup or randomly resolved in `newGame` (persisted to `settings.twistMission`).

**RU-locale terms in the tracker stay English on purpose:** mission names, **Force Disposition**, "Battle Ready", "Attacker"/"Defender", "CP" — only mission *rules text* is translated. (Note: in the core rules RU, **Charge** is translated as «нападение» — "Фаза нападения"; **Surge** keeps «рывок».)

**Command Point / CP** (glossary: `sources/Vse_pamyatki_i_glossarii_po_vakhe.docx`) — in the **rules** RU text, full mentions read «командное очко (CP)» / «командные очки (CP)» (English kept in parens); inline costs/numbers stay English («1 CP», «+1 CP»). The tracker/`ui.js` keep bare «CP» (see above).

## See also

**Stratagem cards page** (`/stratagems`) shows detachment stratagems when a tracker game is in progress — documented in root `CLAUDE.md`'s Architecture section (it's a standalone top-level page, not under this directory, and also renders core rulebook stratagems outside any game).

**Roster Builder** (`/roster*`) is its own top-level nav section (not nested under this one) and hands a built roster off to `GameSetup` via the setup-draft mechanism above — see `src/components/roster/CLAUDE.md`.

**The clock — round, turn, phase.** `currentRound` has always been there; `currentTurn` (0/1) and `currentPhase` (a phase key) joined it on 2026-08-22. The field could not be called `phase`: that one is the GAME's state (`setup`/`playing`/`finished`). "Whose turn" needs no new concept — `players[0]` is **always** the first-turn player (`newGame` reorders, `updateSetup` keeps it so), so a turn index IS a player index. `stepPhase(±1)` walks the ten slots of a battle round and rolls over into the neighbour **through `goToRound`**, so the tactical-secondary housekeeping there still runs; `goToRound` in turn resets the clock to the first-turn player's Command phase, because a phase left over from the round you just left would read as "now" (stepping backwards writes the clock after that reset, which is how it lands on Fight). `canStepPhase` gates the arrows at the ends of the battle, like the round bar's own.

The row under the round bar (arrows + a "name · phase" button opening `PhasePickerModal`, which lists all ten slots split into the first-turn player's five and the second's) appears only for a game that asked: `settings.trackPhases`, a row of the option table above whose `available` is **a list being attached** — the roster screen is the only thing that reads a phase. Off by default, remembered from the last game. Games saved before any of this read as the opening phase and start writing the clock on their first step; no migration. What the clock is FOR lives in `src/components/roster/CLAUDE.md` (switch durations, phase-gated modifiers, the stratagem filter).

**A game can also carry each player's army list** (`player.rosterId` + `player.roster`, a self-contained snapshot). Attached in step 1 of the wizard — an icon button in the faction row opens `RosterPickerModal.vue` — automatically when the game was started from a roster, **or after the game has started**, from `EditSetupModal.vue` (the same picker, in the player card); **optional on both sides — a game with no lists is the normal case, and nothing here may require one.** An attached list decides that player's faction and detachments (`resolveArmyChoice`), so it **replaces the faction picker** with a `faction · list name ✕` line; detaching hands the picker back with that faction still selected. (The `resolveArmyChoice` guard that detaches on a faction change is therefore unreachable from the wizard now, and kept for a restored draft whose halves are out of step.) `RoundTracker` gives each player card **one army button**, sharing the CP row **below** the secondaries (both are things you consult between scoring passes, and above they pushed the round's actual scoring down): with a list attached it links to `/tracker/game/roster/:pi`, which renders the Roster Builder's own read-only view from the snapshot; without one it falls back to that player's faction datasheets (`/factions/:slug/datasheets`). Never both — the list is strictly the better answer when it exists (this army's units, with the game's live modifiers), and there's no room for two links beside the CP stepper. Because the button reads the player it belongs to, the opponent's army is one tap from their own card; that is what replaced the bottom nav's conditional «Units» item (root `CLAUDE.md`). The row renders for either half alone, and drops out entirely only for a legacy game with no `factionSlug` and CP off. **Attaching mid-game is deliberately weaker than the wizard's.** In the wizard the list IS the army: it decides the faction and the detachments. Once play has started neither is the list's to decide — missions, the army-rule tracker and the points already scored hang on the faction, the stratagems and DP on the detachments — so `EditSetupModal` only fills in what is still blank (a faction on a game saved before one was mandatory; detachments never chosen) and reports a detachment disagreement as a warning line instead of resolving it. The picker takes an optional `faction` prop for this: lists of another faction stay **visible but disabled** (hiding them makes a collection look empty and reads as "my list is gone"), and a pasted share link of the wrong faction is refused with its own message. Detaching, as in the wizard, leaves the faction and detachments alone. `updateSetup` carries the four fields, and the modal's local draft means Cancel discards the attachment. Nothing measures the game at attach time — see `rosterGameLink.test.js` for why two full lists can't approach the cap. The snapshot deliberately stores the roster's compact stored form — a synced game is capped at 64 KB by `wh11ed-api`. Mechanics and rationale: `src/composables/rosterGameLink.js` + the "roster attached to a game" section in `src/components/roster/CLAUDE.md`.

**`player.ctx`** goes with it: the rule-condition switches (`ctx.army[id]` / `ctx.units[uid][id]`, each storing WHEN it was flipped as a clock stamp, written by `setArmyCondition`/`setUnitCondition` — see the clock below). They answer what the app cannot know — a unit charged, an Order is on it, a Detachment rule is running — so the roster view may apply that modifier instead of only footnoting it. Absent on older games; every read defaults it. Conditions the tracker ALREADY knows (a called Waaagh! lives in `player.army.toggleRounds`) are read from there and are not duplicated as switches.

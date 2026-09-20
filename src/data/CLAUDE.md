# CLAUDE.md — `src/data/`

The rule data is the bulk of this repo and the bulk of its risk. This file covers everything that
is true of the data itself: the bilingual conventions, the generated sidecars, the gates that fail
a build, the RU search aliases and the `/help` content. The rendering pipeline that consumes it
(`RuleBlock`, the `body` markup table, search) is in the root `CLAUDE.md`; per-feature data shapes
live with their feature (`src/components/core/`, `src/components/event/`,
`src/components/tracker/`, `src/components/roster/`).

## Bilingual content conventions

The data is the bulk of the repo and the EN/RU arrays are edited in lockstep. When touching `body`/`note`/`example` text:

- **Glosses (popover, preferred):** term glosses are an inline token `[gloss:<id>:<visible label>]` (rendered by `useRenderInline.js` → `.gloss` span; a click/tap opens `KeywordPopover` via `App.vue`'s global handler → `openGloss`). `<id>` keys a central `src/data/glossary.js` entry `{ term, en, ru }` — `term` is the English original shown in the popover header (same in both locales), `en`/`ru` are short 1–2 sentence definitions. **Define each term once** in `glossary.js`; reuse the id across occurrences (the `<visible label>` carries the local inflection, e.g. RU `[gloss:base:базы]` / EN `[gloss:base:base]`). Add tokens in **both** the EN and RU subsections. The token is not a block marker, so EN↔RU block parity is unaffected. Don't gloss terms already covered by `KeywordPopover` (ALL-CAPS keywords like INFANTRY/VEHICLE, `[BRACKET]` abilities from `coreAbilities`) — they have their own popover.
- **Glosses (legacy parenthetical, being migrated):** most data still carries the English original in parens — `РУС (ENG)`, e.g. `критическому ранению (critical wound)` — but this form is for ordinary (non-caps) terms only, written as `**рус** (eng)`. **ALL-CAPS keywords (INFANTRY, AIRCRAFT, WARLORD, …) are never translated** — use the bare English keyword in RU text too (no Russian rendering, no parens, e.g. `модель CHARACTER`, not `ТЕХНИКИ (VEHICLE)`), and leave it unbolded (the renderer bolds it). `[BRACKET]` ability names stay English (KeywordPopover lookup). The paired EN subsection (same `id`/`sectionNum`) is the source of truth for the English term. Migrate these to the `[gloss:…]` token form above as sections are touched.
- **Bold (`**…**`):** game terms are emphasized wherever the official PDF emphasizes them, in **both** languages. Do not bold things the renderer already bolds (ALL-CAPS keywords, `◈ LABEL |` info-card labels) or anything inside `seeAlso` refs / image paths. `### h4` headings render through `renderInline` too, so inline markup (`**bold**`, `[KEYWORD]`, cross-refs) works there — `**…**` adds emphasis on top of the heading's own (CSS) weight; only use it where the PDF emphasizes a term within the heading.
- **A core ability named in prose is `[core:Name]`** — "this unit has `[core:Stealth]`", "models in
  that unit have `[core:Feel No Pain 5+]`". It renders bold, in the Title Case the rulebook itself
  prints, and opens the rule in the same popover a `[KEYWORD]` does. **Not** `[STEALTH]`: that is
  the bordered mono pill a weapon row's `[LETHAL HITS]` gets, and a unit ability wearing it reads
  as a weapon tag. The name must be one `reference.js` carries as `type: 'unit'`, or the span links
  to nothing. `npm run emphasis` finds the places that need it; **the RU twin needs the same marker
  in the same edit** — `parity` compares the bracket multiset as an error, and rightly.
- **A keyword keeps its capitals.** appdata writes them that way and the renderer bolds the ones it
  knows (`useRenderInline`'s CORE_KEYWORDS/FACTION_KEYWORDS, plurals included) — so `ADEPTUS
  ASTARTES TRANSPORT`, never `Adeptus Astartes Transport`, and never `**ADEPTUS ASTARTES**` on top.
  Half a compound in capitals is the worst of the three: `ADEPTUS ASTARTES Infantry` shows the
  reader two spellings of one keyword in one sentence.
- **What we deliberately do NOT mark:** game terms of prose that the canon emphasises — "unengaged",
  "detection range", "Hit rolls" — about 2100 places, plus ~1460 keywords outside the renderer's
  auto-bold list. Marking those buys far less than it costs, and `npm run emphasis` prints both
  counts on every run so the decision stays visible instead of rotting into undocumented debt.
- **EN↔RU structural parity:** the per-section counts of block markers (`▪ ◈ → ### ◆ [img:]`) must match between `en` and `ru`. After bulk edits, verify: `**` is balanced (even, no `****`), parity holds, and `npm run build` passes. **`npm run parity` now enforces this on the rulebook files too** (it used to cover faction data only): block markers, `[BRACKET]` abilities, measurements (`3"`, `D6`, `4+`, `+1`) and ALL-CAPS keywords must match EN↔RU, and every EN field must have RU text. Rule cross-references (`09.07`) deliberately are not compared — each locale points where its own layout needs. Notes (`**` counts) are summarised; `--notes` lists them.
- **RU transliteration:** follow the source's apostrophes, using the typographic `’` (U+2019) — `Kauyon` → «кауйон» (none), `Mont’ka` → «монт’ка», `T'au` → «т’ау». Latin forms inside RU text keep their own (`T'au Empire`, the `T'AU EMPIRE` keyword). These match the Russian community's translation guide; that guide covers Black Library prose, so it applies to **flavour text and transliteration only** and never overrides the rule above that unit/detachment/stratagem names and ALL-CAPS keywords stay English. Settled cases are recorded here as they're decided — that's the source of truth for this repo.
  - `Scion` → «**сцион**», never «скион» (decided 2026-09-10). Every inflection follows the same
    stem: «сциона», «сционы», «Сционов». It covers both senses the corpus uses — a Knight's pilot
    and Tempestus Scions in prose — and it overrides the community guide, which renders the word
    «отпрыск». As always this is transliteration for **prose only**: the unit is still
    `Tempestus Scion` in EN, and unit/keyword names stay English in RU text.
- **Astra Militarum `Order`/`Orders`** (the Voice of Command mechanic) are translated as «приказ»/«приказы», unlike named mechanics such as Space Marines' Combat Doctrine which stay English — decided 2026-07-22. Specific order names (`Move! Move! Move!`, `Take Aim!`, …) stay English and bold in the ability's own listing, or in «guillemets» when referenced from prose elsewhere. Glossed via `[gloss:am-order:…]` (`src/data/glossary.js`) on the first occurrence in the army rule body and the first occurrence in each detachment (rule/stratagems/enhancements combined) — not every occurrence.

> **Maintainers only.** The guide itself lives in `wh-glossary`, a **private** reference repo (34k EN→RU pairs extracted from the community's docx). It is not public and contributors neither have nor need it — nothing in this repo depends on it, and decisions from it land in this file. If you do have it cloned alongside: **grep it, never read it whole** — `grep -iP '^Kauyon\t' ../wh-glossary/terms/*.tsv`, conventions in its `conventions.md`.

The source rulebook PDF lives in `sources/` (gitignored). Extract text with `pdftotext -layout`, and bold runs with `pdftohtml -s -i -noframes -hidden <pdf> out.html` (yields `<b>` tags).

**Event Companion asset extraction** (layout diagrams, edge markers, legend icons — pymupdf
against the source PDF) — see `src/components/event/CLAUDE.md`.

## Generated sidecars

**`sourceId` map (`src/data/sourceIds.json`)** — a generated **sidecar** mapping each faction
entity (army rule, detachments, stratagems, enhancements, datasheets) to its stable source UUID
from `wh40k-appdata` (the private sibling repo treated as the authoritative rules source). It's an
external file, **not** an inline field: the faction data files (`src/data/factions/*.js`) are
hand-authored — helper-generated stratagems, name-only entities, comments — so an id can't be
safely written into them; the datasheet files could carry it inline but the map keeps one uniform,
regenerable mechanism. Shape: `{ "<slug>": { "<kind>:<key>": "<uuid>" } }` where `kind` is
`armyrule|det|strat|enh|ds|wg` and `key` is the entity's own wh11ed `id` (datasheets `ds:<id>`,
detachments `det:<id>`) or its normalized name (strat/enh scoped under their detachment; `wg` — a
datasheet's `ranged[]`/`melee[]` weapon row — scoped under its datasheet id, `wg:<ds-id>:<name>`;
the uuid identifies the appdata **wargear item**, not one profile, so several wh11ed rows of a
multi-mode weapon legitimately share it). `id` is
load-bearing (URLs, `RouterLink`s) and never changes; the map exists purely so `sync-appdata.mjs`
can match an entity across a `data_version` bump even after GW renames it — a stable-id bridge, not
read by any view. Regenerate with `node scripts/gen-source-ids.mjs` (`--check` fails if stale);
built by name-matching wh11ed↔appdata, so run it while names still agree. On the next bump
`sync-appdata.mjs` uses it to report a `⟲ renamed` line (same id, new appdata name) instead of a
spurious missing+extra pair. Datasheets map 1:1 (100%); a residue of strat/enh name-variants stays
unmapped and is the same set the name-diff already surfaces.

**Rule-granted keywords (`src/data/conditionalKeywords.json`)** — a generated **sidecar** listing
keywords a unit *gains from an army/detachment rule* rather than having printed on its datasheet
(Dark Angels' Deathwing/Ravenwing via **The Unforgiven**, Battleline granted inside a detachment,
etc.). GW/appdata never print these on the sheet — they're conditional grants — so `DatasheetCard`
merges them into the keyword line at render time, indistinguishable from the printed ones (via its
optional `grantedKeywords` prop; `FactionDatasheetView` computes it from the faction slug + the
active detachment in `useFactionChoice`). Source of truth is appdata's structural
`conditional_keyword` table; the generator (`scripts/gen-conditional-keywords.mjs`, `npm run
condkeywords`, `--check` in `npm run sync`) imports only the **roster-faction-keyword** grants
(always-on for that Chapter's page) and **detachment** grants (gated on the active pick), and skips
the per-unit **allegiance/Mark-of-Chaos** grants (KHORNE/TZEENTCH/… — a per-model army-list choice
the static page doesn't model). appdata datasheet/detachment UUIDs are translated to wh11ed ids by
**inverting `sourceIds.json`**, so it stays automatic across bumps: regenerate and new grants land
themselves. Shape: `{ "<slug>": { "<unit-id>": [{ "kw": "Deathwing" }, { "kw": "Battleline", "det":
"company-of-hunters" }] } }` (no `det` = unconditional on that faction). Already-printed / off-page
grants are dropped at generation (render de-dupes too).

**Legends prose (`src/data/factionLegends.json`)** — a generated **sidecar** carrying the two rule
sections of a "Legends: <Faction>" publication that are not datasheets: the "Warhammer Legends"
intro and the **Legendary Proxies** table (a retired unit with no datasheet of its own → the Codex
sheet it is fielded as, linked by wh11ed id). The publication's datasheets land in
`src/data/datasheets/<slug>.js` as `legends: true` through the normal datasheet path; these two
sections have no other path, and until 2026-09-18 they were simply absent — the first Legends
question a player sent ("add Ufthak Blackhawk") was answered by a row in this table. Generated by
`npm run legends` (`scripts/gen-faction-legends.mjs`, `--check` in `npm run sync`); a proxy whose
target matches no datasheet fails the run rather than warning (`USE_TYPOS` there corrects GW's own
spelling, "Biltza Bommer"). Shape: `{ "<slug>": { pub, intro, proxies: [{ legacy: [names], use,
id }] } }`. RU is a drop-in `factionLegendsRu.json` (`{ "<slug>": { intro } }`, EN fallback; the
proxies are unit names and stay English), checked by `npm run parity`. Rendered at the bottom of
`FactionDatasheetsView` — intro folded, proxies open and narrowed by the page's search box. The
retired names also ride in `datasheetIndex.js` as each target sheet's fourth slot (`legacy`), so
the global search finds "Ufthak" → Warboss with a "Legendary Proxies: Ufthak Blackhawk" subline in
both locales — **re-run `npm run datasheets:index` after `npm run legends`**.

**Legends datasheets from a Faction Pack (`source: "faction-pack"`)** — appdata carries Legends
for Orks alone; every other faction's Legends sheets exist only in the Faction Pack PDF, so they
are authored by hand from that text (hub skill `legends-from-pack`; `scripts/add-datasheets.mjs`
validates and inserts them, `sync-mfm-points` prices them from the MFM's own Legends section —
behind the site's "Show Legends" toggle, a cookie `scrape-mfm.py` sends). The marker is what the
rest of the pipeline reads: `sync-appdata` does not list such a sheet as "extra in wh11ed" and
says `⟲ … is now in appdata — retire the faction-pack copy` the day appdata catches up (appdata
wins, the pack was the stand-in); the RU coverage test in `datasheets/index.test.js` AWAITS a pack
sheet with no overlay entry (EN ships first, by decision) and holds one with an entry to the full
standard. Not in the roster builder: `gen-roster-data` builds units from appdata's composition and
wargear tables, which a pack sheet does not have. First: Dark Angels ×3, 2026-09-18.

**SM-Chapter datasheet dedup** — the 5 Chapter codex files (`black-templars.js`, `blood-angels.js`,
`dark-angels.js`, `deathwatch.js`, `space-wolves.js`) don't duplicate datasheets that are identical
to their `space-marines.js` counterpart; each instead exports a `sharedUnitIds: string[]` alongside
its own (chapter-unique or diverging) datasheets. `loadDatasheets`/`loadDatasheetsRu`
(`src/data/datasheets/index.js` / `ru/index.js`) fold the referenced `space-marines.js` entries back
in transparently, so every other consumer (`FactionDatasheetsView`, `FactionDatasheetView`,
`gen-datasheet-index.mjs`, `gen-seo-routes.mjs`) sees one flat per-faction list — ids/URLs are
unaffected either way. A unit is folded into the shared pool whenever `wh40k-appdata` doesn't list a
Chapter-specific override for it under that Chapter's own publication — cross-checked during the
appdata reconciliation (see the 2026-07 appdata faction audit), which found the Chapter files had
drifted far more than believed: only **6 units total, all in Black Templars** (Impulsor, Land Raider
Crusader, Repulsor, Repulsor Executioner, Sternguard Veteran Squad, Terminator Squad) are genuinely
Chapter-unique; everything else that looked "differing" was stale duplication (missing keywords,
pre-errata ability text, outdated points, wrong core-ability labels) that had silently drifted out of
sync with the shared pool. Each Chapter's `ru/<slug>.js` RU overlay was already ahead of this — its
own `SHARED` list already assumed the correct fold — so only the EN files needed the catch-up.

The Space Marines pack's **Warhammer Legends** (76 sheets) are in the same lists since 2026-09-20,
by the Chapter rule itself — "any ADEPTUS ASTARTES unit not drawn from another Chapter" — and the
one place a pack says so out loud: the Deathwatch pack's restriction list names seven of them by
name (Assault Squad, Assault Squad with Jump Packs, Attack Bike Squad, Land Speeder Storm, Relic
Terminator Squad, Scout Bike Squad, Scout Sniper Squad), which only makes sense if the rest are
takeable. appdata has no row for any of this (it carries no Legends outside the Orks), so the
exclusions are hand-held, per Chapter: every Chapter drops the four with an ULTRAMARINES keyword
(Chaplain Cassius, Sergeant Chronus, Sergeant Telion, Tyrannic War Veterans — the same reason
Calgar and Tigurius are not shared); Deathwatch the seven above; Black Templars the two Librarians
(Codex: Black Templars — "cannot include any ADEPTUS ASTARTES PSYKER models"); Space Wolves the
Venerable Dreadnought (their own sheet holds the id) and the Apothecary on Bike (appdata's
`faction_keyword_excluded_datasheet` keeps both codex Apothecaries out of a Wolves army; the
Legends one follows by the owner's decision, not by a printed line). Ferren Areios is shared: his
sheet reads ADEPTUS ASTARTES only, even though the MFM prices him under an Ultramarines heading —
the datasheet decides the Chapter, the MFM only the points. The RU `SHARED` lists carry the same
ids because `gen-seo-routes.mjs` reads a Chapter's RU default directly rather than through
`loadDatasheetsRu`'s fold. Hub journal: `journal/archive/2026/2026-09-19-sm-legends-in-chapters.md`.

## Data gates

These checks fail the build rather than printing a report. Every one of them exists because a player
found the bug first: 09.07 Fall-back Move lost the word "shoot" in June and stayed wrong until
September even though `sync-core` printed it on every run — one finding among 287 — and on
2026-09-10 the same reader-before-gate pattern produced the two below it.

- **`npm run omissions`** (`scripts/check-rule-omissions.mjs`) — the ONE direction that is always a
  defect: appdata's Core Rules carry text wh11ed does not. It reports two shapes — a *dropped word*
  (a line we clearly do carry, minus a load-bearing word) and a *missing line* — and nothing else.
  Our own additions (notes, examples, FAQ blocks) are `sync-core`'s beat, and are where its noise
  lives. Deliberate condensations live in the script's `ALLOW` table with a written reason; the
  count of suppressed findings prints on every run, and an `ALLOW` entry that stops matching is
  reported as stale. Runs first inside `npm run sync` so its verdict is not buried.
- **`npm run parity`** (`scripts/parity-check.mjs`) — EN↔RU, and now over **every** bilingual
  surface in the repo, in four passes: faction data; the rulebook files (`basicRules`/`battleRound`/
  `advancedRules`/`battlefields`/`muster`/`eventCompanion`/`intro`, reference.js §24, `glossary.js`);
  the **datasheet overlays**; and `missionsRu` / `combatPatrolRu` / `factionFaqRu` /
  `factionLegendsRu`. See Bilingual content conventions. Two lessons are baked into it:
  - **`eventCompanion` was listed but not actually walked until 2026-09-15** — its `en`/`ru` are a
    MAP of chapters, not an array of numbered sections, and the walker returned on the first
    `Array.isArray` guard. A gate naming a file it silently skips is worse than one that never
    claimed it.
  - **The datasheets — ~8900 field pairs, the biggest RU surface here — were checked by nothing at
    all** until a coverage audit the same day. They needed their own pass because the overlay is
    keyed by datasheet id and its ability maps by the ENGLISH ability name: a key that no longer
    matches is not an error anywhere, it just silently renders the English text. The pass mirrors
    `localizeSheet` (both spellings of the wargear/special keys, `abilitySets` option names, the
    SM-Chapter spread) and carries a tripwire that fails loudly if that merge is rewritten.
    First run: 9 real findings, including four RU texts keyed to abilities GW had renamed away.
    It covers every keyed surface of the overlay: the four ability lists (both spellings, and an
    error if an entry carries both — `localizeSheet`'s `||` would drop the second), the nested
    `abilitySets` maps, and `abilityNamesRu`, the faction-wide EN-name → RU-header map (2493 keys,
    of which 7 pointed at nothing). `aliasesRu` is deliberately out: it is search input, not rules.

- **`npm run detmeta`** (`scripts/check-detachment-meta.mjs`) — a detachment's `dp` /
  `forceDisposition` in the hand-authored `src/data/factions/<slug>.js` against `src/data/mfm/`.
  `sync-tracker`'s `detachments` category compares MFM ↔ appdata and had been clean for months; the
  page the player actually reads was in neither side of it, and 63 values across 24 factions had
  drifted. The MFM wins — every faction file's own header says so. RU overlays carry neither field,
  so there is nothing to mirror. A Faction-Pack-only detachment (none today) is exempted by name in
  the script's `PACK_ONLY` table; match names through `norm()`, never verbatim, before concluding
  the MFM does not carry one.
- **`npm run wtags`** (`scripts/check-weapon-abilities.mjs`) — every weapon ability tag printed on a
  datasheet must have text a player can reach: either the Core Rules list in `reference.js`, or an
  ability on the datasheet that prints it. Eight had neither — `[PLASMA WARHEAD]`, `[CONVERSION]`
  and six more — because `DatasheetCard` renders tags as decorated text with no lookup behind them.
  A datasheet-only ability belongs in that sheet's `wargearAbilities`, EN + RU; its text is in
  appdata's `tables/wargear_ability.json`, reached through `wargear_item_profile_wargear_ability`
  (the same ability name carries different ranges on different weapons, so match per weapon).

- **`npm run dsrules`** (`scripts/check-datasheet-rules.mjs`) — appdata's per-datasheet `rules[]`
  against ours. It was in nobody's diff: `sync-appdata` compares `abilities`, and
  `sync-faction-text` compares the TEXT of rules that exist on both sides, so a rule never
  transcribed matched nothing and was skipped. Canis Rex and Sir Hekhtur were missing "Using Sir
  Hekhtur" outright. **wh11ed spreads appdata's `rules[]` across `rules`, `specialAbilities`,
  `abilities` and `wargearAbilities`, plus the structural `transport`/`leader`** — read every one of
  those before calling a rule missing. A check that read only `rules` reported four phantom gaps on
  the Daemon Primarchs, whose SUPREME COMMANDER sits in `specialAbilities`, and "fixing" those
  duplicated the plate on all four sheets.

- **`npm run coregrants`** (`scripts/check-core-grants.mjs`) — a rule whose prose hands a unit one
  of the twelve grantable CORE abilities ("this unit has Stealth", "models in that unit have the
  Feel No Pain 6+ ability") must carry a `stat: 'core'` grant in `src/data/rosterModifiers/`, so the
  roster card prints it on its Core line instead of leaving the reader to find it in a paragraph.
  It exists because `npm run modifiers:check` cannot see this and should not: for that audit
  `reviewed: true` is a closed question, and 133 records had been closed on the wrong reading of
  what the layer is for. Exceptions are named one by one in the script's ALLOW table — never by a
  regex, because "does not have" is easy to pattern-match and the next wording will not be. See
  `src/components/roster/CLAUDE.md` → "A granted CORE ability" for the five shapes that are in there.

- **`npm run emphasis`** (`scripts/check-emphasis.mjs`) — emphasis the canon carries that our prose
  dropped: a core ability named in a sentence, a keyword that lost its capitals. It exists because
  `sync:text` cannot see this and should not — its `plainText()` strips markup off BOTH sides before
  comparing, or the report would be solid noise. Same pairing, same corpus, opposite question; the
  walker is shared (`eachFactionTextPair`) so the two can never disagree about which canon rule a
  sentence of ours corresponds to. It gates class A (core abilities) and the keywords the renderer
  would bold if they were capitalised; everything else it counts out loud. `scripts/lib/emphasis-baseline.json`
  holds the spots a pass could not place by machine — a WORK LIST, not an amnesty, and its size is
  printed on every run. `--baseline` re-records it; read the diff.

- **`npm run layouts`** (`scripts/check-layout-art.mjs`) — the Event Companion's 45 Terrain Layout
  diagrams against the artwork in the GW app's own APK (`../sources/apk`), recorded in
  `scripts/lib/layout-art.json`. It exists because the pictures are in NO appdata table — the app
  only ships them as compiled resources — so every reconciliation script we own was blind to them:
  on 2026-08-26 GW redrew **27 of the 45** and wh11ed served the July battlefields for three weeks.
  A redraw gets new FILENAMES (`-v3`), never a silent overwrite, because images are cached 30 days
  by the bucket and forever by the service worker; `node scripts/extract-layout-images.mjs` does
  the bump for exactly the changed ones. The gate also checks the bookkeeping (every referenced
  file on disk, no orphans, data ↔ manifest versions agree) and re-reads `layoutEdges` off the
  deployment-zone tint in each picture — a redraw can rotate a layout, and that table is
  hand-written. Diagonal deployments tint both axes and are reported as unresolvable, not guessed.
- **`npm run companions`** (`scripts/check-companion-pdfs.mjs`) — the four Event Companion PDFs in
  `../sources` against `scripts/lib/companion-pdfs.json`: the VERSION we have actually read, and
  every `Q:` of the Chapter Approved Mission Deck FAQ. That FAQ is in no appdata table at all
  (checked by publicationId and ruleContainerId — zero rows), which is why the four answers added
  on 2026-08-26 were missing until a player-driven audit found them. A republished PDF fails the
  gate and prints GW's own WHAT'S NEW; `--write` re-records it once the change has landed.
  Dominatus is tracked here as deliberately unimplemented — it only adapts the separate Dominatus
  deck, whose contents GW ships nowhere (appdata's `mission_pack_location*` tables are empty).

The first two share `scripts/lib/core-corpus.mjs` with `sync-core` — one normalization recipe, so the gate
and the report can never disagree about what a rule says. A caveat that cost a day: appdata files
several rules under ONE number (09.07.01 is both "Desperate Escape Test" and "Desperate Escape"),
so the corpus merges duplicates instead of keying a Map by number — the older code silently kept
one and the other rule went untranscribed for a year.

## Help pages

**`/help` — "How to use this"** (`src/data/help.js` + `views/HelpView.vue`): the one page of
product documentation, bilingual, rendered through the shared block renderer so a `[KEYWORD]` or a
`(NN.NN)` in it behaves as it does inside a rule. **It carries only what a reader cannot see for
themselves** — the offline split (a tab is deliberately light, the installed app is not), where
their lists actually live, why our points can disagree with a list built elsewhere, and the
features with no visible entry point (Ctrl+K, roster import/export/share, handing a roster to the
tracker). Anything a button already says stays on the button. Like `/links` it is **not** in the
navbar or the drawer, **and deliberately not in the footer either** — nobody looks for "how does
this work" at the bottom of the page. It is reached from the screens that raise the question: the
landing (under its description), the roster list's hero (→ `#help-rosters`) and the tracker home
(→ `#help-tracker`). `HelpView.test.js` guards the EN↔RU marker parity the same way the rule data
is guarded.


`/help` is the guide's **contents**; each of its six topics is its own page at `/help/<slug>`,
rendered by `HelpTopicView.vue` from `src/data/help.js`.

- **The slug is derived, not stored:** `slugOf(section)` strips the `help-` prefix off the section
  id (`help-tracker` → `/help/tracker`). One derivation shared by the index, the topic page and the
  router, so the three cannot disagree about a topic's URL. **Renaming an id changes a public URL** —
  add a redirect if you do.
- **The old anchors still work.** Until 2026-08-25 this was one page with six `#help-*` anchors;
  the `/help` route's `beforeEnter` sends such a hash to the page that section became
  (`src/router/helpRedirects.test.js`).
- **A section of the app links at its own topic**, not at the guide: "Section help"
  (`labels.helpSection`) on the tracker home → `/help/tracker`, the roster list → `/help/rosters`,
  the rules landing → `/help/rules`. Adding a topic means adding its link where it belongs.
- **New topic = three edits:** the section in `help.js` (both locales, marker counts matching —
  the parity rule applies here as to rule text), a `ROUTES` entry in `useSeoMeta.js`, and the path
  in `scripts/gen-seo-routes.mjs` so it is crawlable and gets its index.html key on deploy.


## RU search aliases

Search (Ctrl+K) matches unit names in English only, which is no help to a Russian reader who does
not know the English spelling of a deliberately mangled xenos name — or who looks a unit up by the
community's nickname (Ghazghkull → «Газя»). `aliasesRu` is a hidden field that affects **search
only**: a unit's name on screen is always the English one, per the bilingual convention above.

**The mechanism** (don't rework it without a reason):

1. `src/data/datasheets/ru/<slug>.js` — optional `aliasesRu: string[]` on a unit in the RU overlay,
   for one named character.
2. `src/data/datasheetAliasRulesRu.js` — aliases by EN **name pattern**, for a whole class of unit
   at once (every Terminator-anything → «термосы»); 36 rules of `{ pattern: RegExp, aliasesRu }`.
3. `scripts/gen-datasheet-index.mjs` merges both (`aliasesFor(name, personal)`) into
   `src/data/datasheetIndex.js`, as the third element of a unit's record
   `[id, name, aliasesRu | null]`. **Re-run it (`npm run datasheets:index`) after any alias edit.**
4. `useSearch.js`'s `searchDatasheets()` checks an alias only when the name itself did not match,
   and puts the hit in `titleRu` — the same translated subline stratagems and detachments get.
   Alias matching works in either locale.
5. Tests: `useSearch.test.js`, `describe('datasheet unit search')`.

**Adding one.** For a named character: find the unit's block by `id` in the RU overlay (verify the
id first — GW renames characters between editions). **Check that file's own RU `flavor` before
anything else**: a transliteration already printed on the page beats the glossary, because an alias
that contradicts what the reader sees is worse than no alias. If the file is silent, grep the
community glossary (`grep -i "<name>" ../wh-glossary/terms/*.tsv` — only if that repo is cloned
alongside); if that is silent too, skip it rather than guess. For a class of units, add a rule to
`datasheetAliasRulesRu.js`, checking the real EN datasheet name first (`grep '"name":'
src/data/datasheets/*.js`) — GW names surprise you (Nobz, not Nobs).

**What not to add.** GW mangles names on purpose (Ork, Tyranid, the stylised "Mongolian" ones like
Kor'sarro Khan); a naive transliteration of those produces noise. Preference order for a spelling:
the RU `flavor` in the same file → the community glossary → an uncontroversial transliteration.
Nothing fits — leave it out.

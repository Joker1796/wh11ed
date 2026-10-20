# Patch notes (`/patches`)

GW's updates in one place, "was → now" (owner, 2026-10-01): the app's rules data, the Munitorum
Field Manual's points, the FAQ & errata, the game's own content and GW's documents. Nothing on the
page is written by hand.

- **Data** — `scripts/gen-patch-notes.mjs` (`npm run patches`) writes `src/data/patches/<id>.json`
  per update and the light `index.js` the page opens on (per-faction counts, so a filtered list
  needs no file). It reads **history only**: wh40k-appdata's git for rules, this repo's git for
  `src/data/mfm` and `src/data/factionFaq.json`. A written patch never moves when today's data does.
- **The update list** is `scripts/patch-notes/patches.mjs` — one line per update with the commit
  pairs. A data bump adds its line (the hub's `appdata-update` skill) and re-runs `npm run patches`.
- **Noise rules** live in `scripts/patch-notes/diff-*.mjs`, each pinned by a case in
  `diff-bundles.test.js`. Entities are matched **by app id where both sides share it, then by name** (GW reissued ~2,300
  ids in 963; but two of one name — a codex army rule and its Combat Patrol copy — need the id: the
  app swapped Necrons' two Reanimation Protocols in 963 and a name match reported the 909 errata as
  new). Combat Patrol army rules are dropped (`tables/army_rule.json` → a CP publication); a rename
  seen through the id is reported with `was`;
  texts are compared as read (markup, quotes, dashes, "(see left)"); BS `N/A`≡`-`, OC `-1`≡`-`; core
  and faction abilities by name only (their text is the core/army rule's, reported once); `Damaged N`
  is the damage bracket again; a weapon profile is named with its weapon ("Tank Kannon – Blasta" —
  two "Blasta" profiles were paired across weapons); a renamed weapon is one rename, not gone + new.
  Points come from the MFM only, compared **copy by copy** (1st–4th; the note's "1st-2nd"/"3rd+"
  tiers parsed, a unit's make-up in the note kept apart) — GW re-tiered Exorcist in v1.5 and only
  the second copy's price moved; a Chapter's FAQ copies of Codex: Space Marines entries are dropped.
- **The core block** (since 2026-10-20) holds more than the rule prose, each kind its own fold once
  there are two: the **Core Rules FAQ & errata** (`diff-core-faq.mjs`, appdata's `tables/faq.json`,
  by question — 32 answers of 931/963/981 had never shown, because the page read only our generated
  `factionFaq.json`), **battle sizes, dispositions, core stratagems, missions, twists and the
  disposition matrix** (`diff-core-content.mjs`, `factions/_core-content.json` — the `factions/*`
  pattern skips `_` files; nothing in it has moved in any update yet) and the Event Companions.
  A stratagem's second effect (`secondaryEffect`/`secondaryCp`, appdata's build of 2026-10-19) is
  compared only once both sides carry the field — its arrival is our build learning to read it.
- **GW's documents** — Faction Packs and Event Companions, which the app does not carry — come from
  `scripts/patch-notes/documents.json`: every edition seen, with GW's date from its file name
  (`eng_14-10_…`; the undated `eng_wh40k_…` files are the 26 August set). `npm run documents` (a
  gate in `npm run sync`) fails on a PDF in `../sources` the list lacks; `-- --write` records it.
  `diff-documents.mjs` puts an edition in the update whose window holds its date (after the previous
  line's date, up to its own) — not by our commit, which lands days later — and never the first
  edition we saw. It shows under "Publications" with a link to the PDF.
- **`scripts/patch-notes/patches.test.js`** (vitest, so CI runs it) holds the list to the site: the
  last line's `labels.app` is `APP_DATA_VERSION`, its `labels.mfm` is `mfmVersion`, no document
  edition is dated after the last line, and the written files carry exactly the document items the
  list gives (`npm run patches` after `documents -- --write`).
- **Removed** entries carry no text (`from` is dropped) — the name is the news, and the 963 file
  was 650 KB with it.
- **Page** — `PatchesView.vue`: two pickers, the faction (`?f=` = slug / `mine` = pinned / `all`; the
  core rules stay in every filter) and the update (`?p=`, one on the page at a time, its file fetched
  when picked — not accordions, owner 2026-10-01; both picks push, see `pick()`), `PatchBody.vue` (the core rules and each faction a plate with a dark
  header, **all folded until tapped**), `PatchEntry.vue` (each change a plate: chips for numbers, +/−
  for lists; one with rule text opens on a tap of its whole header line — not a small link, owner
  2026-10-01; no link to the unit's page — dropped by the owner, 2026-10-01), `PatchTextDiff.vue` — a rule text in the rules pages' own formatting (`renderRichText`): the
  data keeps the markup (`readable()` in diff-bundles: `**bold**`, keywords, `▪` items, a line per
  paragraph, a bold opening label), the diff compares words without it (`diffWords` with a key), and
  struck/added words are fenced with U+E000–E003 before rendering, swapped for `<del>`/`<ins>` after.
  Struck words shed their own markers and old line breaks are dropped, so every marker on the page
  is the new text's and pairs up; `PatchTextDiff.test.js` renders every text of every patch and
  fails on a stray `**`/`__`/fence.
- **RU**: labels translate; rule texts are English as GW printed them (no old RU to compare
  against). From the next data bump on, the owner wants both sides translated — not built yet.
- No subnav over the page (`AppSubnav`), a navbar link on the desktop, a direct entry in the
  drawer on the phone; the bottom nav is untouched.

**A change that looks like GW's own mistake** (owner, 2026-10-14): the site follows the app word for
word, and says so where the change is. `doubts` on a PATCHES line (`scripts/patch-notes/patches.mjs`,
`{ faction, kind, name, note: { en, ru } }`) puts the note on the item (`doubt`), drawn by
`PatchEntry` as an amber line under its name; a doubt that names no change stops `npm run patches`.
The same items go into that release's changelog under "Probable GW mistakes" (`kind: 'errors'`).

**Changes GW's documents make and the app has not taken in** (owner, 2026-10-14: Kayvaan Shrike's EPIC
HERO in the Space Marines "Printed Product Updates" of 14 October). The site applies them
(`unit-keyword` and the other kinds in `scripts/lib/appdata-exceptions.mjs`), and the PATCHES line
lists them as `docs: [{ title, url, items }]`; they show in a block of their own, "Applied from GW’s
documents", one group per document with a link to its PDF.


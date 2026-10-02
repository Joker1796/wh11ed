# Patch notes (`/patches`)

GW's updates in one place, "was → now" (owner, 2026-10-01): the app's rules data, the Munitorum
Field Manual's points, the FAQ & errata. Nothing on the page is written by hand.

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

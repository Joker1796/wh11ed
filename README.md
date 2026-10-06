# WH Rules

A bilingual (EN/RU) app for **playing Warhammer 40,000 11th edition** — the whole evening in one
place: look a rule up, build the army list, then play the game with that list's own rules applied
to the units on screen, alone on one phone or together on several. It started as a searchable
alternative to flipping through the PDF at the table, and the reference is still its foundation.
Once installed it works with no connection at all, and **nothing here needs an account.**

🌐 **[wh-rules.ru](https://wh-rules.ru)** · open source under [MIT](LICENSE) · contributions
welcome

> The site used to live at `wh11ed.ru`. That domain is frozen on its last build and redirects
> here; everything ships to `wh-rules.ru` now.

This repo is the frontend, and the frontend is ~99% of the product. See
[wh-rules.ru](https://github.com/Joker1796/wh-rules.ru) for how the whole project fits together.

## What's in it

**Rules**

- **Core Rules** — the whole core rulebook on one page: seven chapters, cross-referenced, with
  inline glosses that open a definition.
- **Event Companion** — terrain and footprints, all 45 layout diagrams, the 5×5 mission matrix,
  pairings, team and Doubles play, FAQs, and a catalogue of every primary and secondary mission and
  twist.
- **Factions** — all **30 factions**: army rules, detachments with their stratagems and
  enhancements, every datasheet including the Legends sheets from the Faction Packs, and each
  faction's FAQ. Your army choice (chapter, detachment) is shared across the pages.
- **Combat Patrol** — the fixed starter-box forces, each on a page of its own.
- **Points changes** (`/patches`) — what each Munitorum Field Manual update moved, plus the current
  points as a PDF.
- **Search** — `Ctrl+K` across every rule, ability, keyword, stratagem and unit; units are found by
  what they have, too, and Russian names find English ones.

**Rosters**

- An army list builder priced against the current Munitorum Field Manual: units, wargear, leaders,
  enhancements and detachment limits, checked as you build. On a wide screen it becomes a
  three-column desk.
- Import a list from the Warhammer 40,000 app or New Recruit; export it in the shapes a TO or a
  Discord channel wants; share it as a link (the list rides inside the link, not on a server);
  print it.

**Playing a game**

- **Game Tracker** — a 5-round VP tracker for Singles and Doubles: setup, primary and secondary
  missions, the tactical deck, CP, twists, battle points and a per-round breakdown. **With a roster
  loaded it applies that army's rules**: a unit's card shows what its detachment rule, the auras
  reaching it and the stratagems spent on it are doing to its numbers right now.
- **A shared game on several phones** — each player sets up their own side in a lobby and scores it
  from their own phone; the others join by link, QR or a six-digit code. Doubles works the same way,
  one phone per team.
- **Broadcast** — a live scoreboard overlay for OBS, fed from the phone that tracks the game.
- **Stratagems** — a game-time quick reference; during a game it adds both players' detachment
  stratagems, grouped by phase.
- **Statistics** — your finished games read back as a record: win rate, turn order, matchups,
  secondary cards, results per roster.

**Everywhere**

- **Bilingual** — every rule and every UI string in English and Russian, switchable at runtime.
  Unit, detachment and stratagem names stay English by convention, with the Russian beside them.
- **Installable PWA** — see *Offline* below.
- **Optional account** — signing in (Yandex) keeps your lists, game history, favourite units, pinned
  factions and model collection in step across devices, and is what a shared game's host needs.
  Signed out, everything else works; the data simply stays on the one device. The server side is
  [wh11ed-api](https://github.com/Joker1796/wh11ed-api).
- **What's new** (`/changelog`), **help** (`/help`) and an in-app bug report form.

## Offline

A deliberate split, and the reason the app is structured the way it is:

- **In a browser tab** the service worker precaches only the **app shell** (JS/CSS/HTML/fonts).
  The ~21 MB of illustrations load as you view them, so a casual visitor gets a light, fast site.
- **The installed app** reaches **full offline** through a one-time warm-up: on its first online
  launch it fetches every image in the background. A browser tab can ask for the same from the ⚙
  menu ("Download for offline").

So "full offline" is a property of the installed app after warm-up — not of a fresh browser tab.
Anything that inflates the tab download works against this.

## Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/), [Vue Router](https://router.vuejs.org/)
  (HTML5 history — clean, indexable paths; Russian lives under `/ru/…`)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) — manifest + Workbox service worker
- **Self-hosted fonts** via [@fontsource](https://fontsource.org/) (Inter, EB Garamond, Sofia Sans
  Extra Condensed) and `bootstrap-icons` — **no external CDN**, so typography and icons work offline
- [Vitest](https://vitest.dev/) + [@vue/test-utils](https://test-utils.vuejs.org/) (jsdom),
  ESLint + `eslint-plugin-vue`
- Dev only: [sharp](https://sharp.pixelplumbing.com/) and [opentype.js](https://opentype.js.org/)
  (WebP, icons, splash screens), `playwright-core` driving the system Chrome for the layout gates
- All content is static JS data files; no backend is needed to build or run
- Hosted on Yandex Object Storage behind a CDN; every route gets its own pre-rendered HTML for
  search engines

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Nothing else is needed — no backend, no API keys, no source PDFs.

```bash
npm test         # Vitest
npm run lint     # ESLint — a gate, clean on a clean tree
npm run build    # production build → dist/ (+ sitemap and the per-route SEO pages)
npm run preview  # preview the production build
```

Sign-in, cloud sync and shared games are the only features that need
[wh11ed-api](https://github.com/Joker1796/wh11ed-api): `VITE_API_BASE_URL` points at it and
defaults to a local server (`http://localhost:8787`). Without it, sign-in simply fails and the
rest of the app is unaffected. The dev build has a mock sign-in in the ⚙ menu, which never ships
to production; to try a shared game on several "phones" locally, run the API's
docker stand (its README) and open the app on ports 5173–5175.

## Checks

Beyond the tests and the linter, the repo carries gates — scripts that fail when something
drifted, each born from a bug a player found first. Run the ones that match what you touched:

- **Data** — `npm run parity` (EN↔RU), `npm run omissions`, `npm run dsrules`, `npm run wtags`,
  `npm run coregrants`, `npm run emphasis`, `npm run dsids` and others; `npm run sync` audits
  everything against the official app's data.
- **CSS** — `npm run radii` (square corners), `npm run dupes` (no copy-pasted rule bodies).
- **Rendered pages** (need `dist/`) — `npm run a11y` (contrast in both themes, tap targets,
  sideways scroll), the layout gates (`weapon-table`, `detachment-row`, `legends-tag`) and
  `npm run smoke` before a release.
- **Images** — `npm run imghash`: an edited image must be renamed, or installed apps keep the old
  one.

The full list, with what each one guards, is in [`CLAUDE.md`](./CLAUDE.md) → *Commands*.

## Project structure

```
src/
  components/      # shared UI: RuleBlock (the rule renderer), BaseModal, StratCard, …
    core/ event/   #   the Core Rules and Event Companion chapters
    roster/        #   the roster builder
    tracker/       #   the game tracker (+ stats/)
  composables/     # state and logic: useTracker, rosterEngine, rosterModifiers, useSearch,
                   #   useCloudSync, useParty, useLocale, …
  data/            # all content, bilingual { en, ru }
    factions/      #   army rules, detachments, stratagems (ru/ = RU overlays)
    datasheets/    #   unit datasheets (ru/ = RU overlays)
    mfm/           #   Munitorum Field Manual points
    roster/ rosterModifiers/  # what the builder and the tracker apply
  i18n/            # UI strings per locale
  router/          # routes, locale prefix, nav groups
  views/           # one view per page (+ faction/, combat-patrol/, tracker/)
scripts/           # generators, importers and the gates
public/images/     # illustrations and icons, one folder per chapter
```

Source PDFs are **not** in this repo; they're only needed to re-extract content, never to build
or run.

## Documentation

- [`CLAUDE.md`](./CLAUDE.md) — the engineering map: architecture, the data → view pipeline,
  commands, and the invariants with no single directory to live in.
- **A scoped `CLAUDE.md` next to each big part** — `src/data/`, `src/components/`, `roster/`,
  `tracker/`, `views/faction/` and others. Read the one for the directory you're changing.
- [`DEPLOY.md`](./DEPLOY.md) — PWA caching and the deploy runbook.
- [`DATA-SYNC.md`](./DATA-SYNC.md) — updating the rules from a new release of the official app;
  [`APPDATA-SYNC-LESSONS.md`](./APPDATA-SYNC-LESSONS.md) — what went wrong before.
- [`RELEASE-CHECKLIST.md`](./RELEASE-CHECKLIST.md) — what to check by hand before a release.

## Contributing

Two very different kinds of help, both welcome:

- **Content and translation.** The bulk of this repo — and the bulk of the risk — is the bilingual
  rule data. The characteristic bug here isn't a crash; it's an **EN↔RU desync**: mismatched block
  counters, unbalanced `**`, a gloss added on one side only. Conventions are in
  [`src/data/CLAUDE.md`](./src/data/CLAUDE.md).
- **Code.** A lot of infrastructure here is easy to break invisibly (PWA precache, offline
  warm-up, view restore, cache strategies). The `CLAUDE.md` files record the *"don't fix this"*
  invariants and why they exist — worth a search before changing something that looks wrong.

Before opening a PR: `npm run lint`, `npm test`, `npm run build`, and the gates for what you
touched.

## Licence

Code is MIT — see [LICENSE](LICENSE).

The Warhammer 40,000 rules, names and imagery belong to **Games Workshop**. MIT covers this
project's code only; it grants no rights to the game content. This is an unofficial fan project,
not affiliated with or endorsed by Games Workshop.

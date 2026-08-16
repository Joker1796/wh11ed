# WH Rules

Bilingual (EN/RU) digital reference for the **Warhammer 40,000 11th edition** rules, plus an
offline tracker for a game in progress. Built as a fast, searchable alternative to flipping
through the PDF at the table — and, once installed, it works with no connection at all.

🌐 **[wh-rules.ru](https://wh-rules.ru)** · open source under [MIT](LICENSE) · contributions
welcome

> The site used to live at `wh11ed.ru`. That domain is frozen on its last build and will be
> redirected here; everything ships to `wh-rules.ru` now.

This repo is the frontend, and the frontend is ~99% of the product. See
[wh-rules.ru](https://github.com/Joker1796/wh-rules.ru) for how the whole project fits together.

## What's in it

- **Core Rules** — every section of the core rulebook, structured, cross-referenced and searchable.
- **Event Companion** — terrain rules and footprints, all 45 layout diagrams, the interactive 5×5
  mission matrix, pairings, FAQs, and a browsable catalogue of all 25 primary + 18 secondary
  missions and the 6 twists.
- **Factions** — army rules, detachments (detachment rule, stratagems, enhancements) and unit
  datasheets for **28 factions**, with a chapter/detachment picker shared across pages.
- **Game Tracker** — a client-side, offline 2-player VP tracker for a full 5-round game: setup
  wizard, primary/secondary missions, tactical secondary deck, CP, twists, battle points, and a
  per-round score breakdown. Finished games are archived to history.
- **Stratagems** — a stripped-down quick reference for game time; with a game in progress it also
  shows both players' detachment stratagems, grouped by phase.
- **Bilingual** — every rule and UI string ships in English and Russian, switchable at runtime.
  Game terms carry inline glosses that open a definition popover.
- **Instant search** — `Ctrl+K` across every rule, ability, keyword and unit name.
- **Installable PWA** — see *Offline* below.
- **Optional cloud backup** — sign in to keep tracker history across devices, via
  [wh11ed-api](https://github.com/Joker1796/wh11ed-api). Everything else works without it.

## Offline

A deliberate split, and the reason the app is structured the way it is:

- **In a browser tab** the service worker precaches only the **app shell** (JS/CSS/HTML/fonts).
  The ~27 MB of illustrations load lazily as you view them. A casual visitor gets a light, fast
  site.
- **The installed app** reaches **full offline** through a one-time warm-up: on its first online
  standalone launch it fetches every image in the background, so afterwards nothing needs the
  network.

So "full offline" is a property of the installed app after warm-up — not of a fresh browser tab.
Anything that inflates the tab download works against this.

## Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/), [Vue Router](https://router.vuejs.org/)
  (HTML5 history — clean, indexable paths)
- [Vitest](https://vitest.dev/) + [@vue/test-utils](https://test-utils.vuejs.org/) (jsdom)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) — manifest + Workbox service worker
- **Self-hosted fonts** via [@fontsource](https://fontsource.org/) (Inter, EB Garamond, Sofia Sans
  Extra Condensed) and `bootstrap-icons` — **no external CDN**, so typography and icons work
  offline right after install
- [sharp](https://sharp.pixelplumbing.com/) + [opentype.js](https://opentype.js.org/) (dev only) —
  WebP pipeline, PWA icons, splash screens
- No backend required. All content is static JS data files
- Hosted on Yandex Object Storage behind a CDN

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Nothing else is needed — no backend, no API keys, no source PDFs.

```bash
npm test         # Vitest
npm run build    # production build → dist/ (also generates sitemap.xml + SEO route list)
npm run preview  # preview the production build
```

Login and cloud backup are the only features that need
[wh11ed-api](https://github.com/Joker1796/wh11ed-api): `VITE_API_BASE_URL` points at it and
defaults to a local dev server (`http://localhost:8787`). Without it running, sign-in simply
fails and the rest of the app is unaffected. To exercise the signed-in UI without real OAuth,
there's a dev-only mock (`src/composables/useAuth.js`) that never ships to production builds.

Asset/content generators (run only when you change the inputs):

```bash
npm run images:webp       # convert new jpg/png in public/images/ to WebP (+ dimensions)
npm run icons             # regenerate PWA / home-screen icons from the "W" mark
npm run screenshots       # regenerate the install-dialog screenshots
npm run splash            # regenerate the iOS launch screens
npm run datasheets:index  # rebuild the searchable datasheet name index
```

## Project structure

```
src/
  components/     # RuleBlock (the universal rule renderer), StratCard, AppImage,
    event/        #   BaseModal, KeywordPopover, DatasheetCard, …
    tracker/      #   GameSetup, RoundTracker, SecondaryDeck, ScoringModal, ScoreBoard, …
  composables/    # useTracker (game state), useSearch, useLocale, useFactionPage,
                  #   useCloudSync, useKeywordPopover, …
  data/           # all content — bilingual { en, ru }
    factions/     #   per-faction army rules, detachments, stratagems (ru/ = RU overlays)
    datasheets/   #   per-faction unit datasheets (ru/ = RU overlays)
    mfm/          #   Munitorum Field Manual points data
  i18n/           # ui.js — UI strings per locale
  router/         # routes + nav groups
  views/          # one view per section (+ event/, faction/, tracker/)
scripts/          # generators & importers: WebP, PWA icons, SEO routes, datasheet imports, …
public/images/    # illustrations + icons, one folder per rules chapter
```

Source PDFs are **not** in this repo (see the `sources/` note in the
[umbrella repo](https://github.com/Joker1796/wh-rules.ru)); they're only needed to re-extract
content, never to build or run.

## Content shape

Rule data files export bilingual `{ en: Section[], ru: Section[] }`, merged by index at runtime:

```js
{
  id, num, title, description,
  subsections: [{
    id, sectionNum, title,
    body,     // rule text; ▪ bullets, ### headings, [img:…], **bold**, [gloss:id:label]
    note,     // callout box
    example,  // italic example block
    seeAlso,  // ["Rule Name XX.YY"] → auto-resolved to anchor links
  }]
}
```

## Contributing

Two very different kinds of help, both welcome:

- **Content and translation.** The bulk of this repo — and the bulk of the risk — is the bilingual
  rule data. The characteristic bug here isn't a crash; it's an **EN↔RU desync**: mismatched block
  counters, unbalanced `**`, a gloss added on one side only. Conventions are documented in
  [`CLAUDE.md`](./CLAUDE.md) → *Bilingual content conventions*.
- **Code.** Note that a lot of infrastructure here is easy to break invisibly (PWA precache,
  offline warm-up, view restore, cache strategies). [`CLAUDE.md`](./CLAUDE.md) records the
  *"don't fix this"* invariants and why they exist — worth a search before changing something
  that looks wrong.

There's no linter; match the surrounding code. Run `npm test` and `npm run build` before opening
a PR. [`CLAUDE.md`](./CLAUDE.md) is the engineering reference: data shapes, `body` markup, the
image pipeline, PWA machinery and deployment.

## Licence

Code is MIT — see [LICENSE](LICENSE).

The Warhammer 40,000 rules, names and imagery belong to **Games Workshop**. MIT covers this
project's code only; it grants no rights to the game content. This is an unofficial fan project,
not affiliated with or endorsed by Games Workshop.

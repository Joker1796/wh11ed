# Warhammer 40,000 — Core Rules 11th Edition

Interactive, **bilingual (EN/RU)** digital reference for the Warhammer 40,000 11th Edition Core Rules and **Event Companion**. Built as a fast, searchable alternative to flipping through the PDF, and being prepared to run as an installable app. Hosted at [wh11ed.ru](https://wh11ed.ru).

## Features

- **Full rules content** — all core-rulebook sections plus the Event Companion (terrain layouts, the 5×5 mission matrix, pairings, FAQs), structured and cross-referenced
- **Bilingual** — every rule and UI string ships in English and Russian, switchable at runtime
- **Instant search** — `Ctrl+K` to search across every rule, ability, and keyword
- **Table of contents** — quick-jump anchors at the top of every section
- **Example blocks** — inline examples and diagrams that clarify abstract rules
- **See Also links** — clickable cross-references between related rules
- **Optimized images** — illustrations served as responsive WebP (full-size on desktop, an 800px copy on phones); icons downscaled to WebP
- **Installable PWA** — add to home screen / install as an app, with a full offline cache (rules + images work without a connection)

## Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/) (HTML5 history)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) — manifest + offline service worker (Workbox)
- [sharp](https://sharp.pixelplumbing.com/) (dev only) — WebP image & app-icon generation
- Google Fonts: EB Garamond + Inter
- No backend

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build        # production build → dist/
npm run images:webp  # convert new illustration/icon jpg/png in public/images/ to WebP
npm run icons        # regenerate the PWA / home-screen icons from the "W" mark
npm run deploy       # build + upload to the Yandex Object Storage bucket
```

## Project Structure

```
src/
  components/       # RuleBlock, AppImage (responsive WebP), SearchModal, DataTable, event/*
  composables/      # useSearch.js (search index), useLocale.js, …
  data/             # bilingual { en, ru } rules content (basicRules, battleRound, eventCompanion, …)
  i18n/             # ui.js — UI string maps per locale
  views/            # one view per nav section (+ views/event/* for the Event Companion)
  router/           # Vue Router config
scripts/
  gen-webp.mjs      # WebP image pipeline (illustrations + icons)
public/
  images/           # illustrations (WebP) + icons, one folder per chapter
  sources/          # original source PDFs (gitignored)
```

Detailed engineering docs (data shapes, `body` markup, image pipeline, bilingual conventions, deployment) live in [`CLAUDE.md`](./CLAUDE.md).

## Content Structure

Each data file exports an array of sections, each with subsections:

```js
{
  id, num, title, description,
  subsections: [{
    id, sectionNum, title,
    body,     // rule text, bullets via ▪
    note,     // dark callout box
    example,  // italic example block
    seeAlso,  // ["Rule Name XX.YY"] → auto-resolved to anchor links
  }]
}
```

## Adding New Content

1. Add or edit a file in `src/data/`
2. If adding a new top-level section, register it in `src/router/index.js` and `src/App.vue`
3. The search index (`src/composables/useSearch.js`) picks up changes automatically on next build

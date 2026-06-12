# Warhammer 40,000 — Core Rules 11th Edition

Interactive digital reference for the Warhammer 40,000 11th Edition Core Rules. Built as a fast, searchable alternative to flipping through the PDF.

## Features

- **Full rules content** — all 24 sections of the core rulebook, structured and cross-referenced
- **Instant search** — `Ctrl+K` to search across every rule, ability, and keyword
- **Table of contents** — quick-jump anchors at the top of every section
- **Example blocks** — inline examples that clarify abstract rules
- **See Also links** — clickable cross-references between related rules
- **Source files** — original PDF accessible under the Files tab

## Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/) (hash history)
- Google Fonts: EB Garamond + Inter
- No backend, no dependencies beyond Vue

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build   # production build → dist/
```

## Project Structure

```
src/
  components/       # RuleBlock, SectionHeader, TableOfContents, SearchModal, DataTable
  composables/      # useSearch.js — full-text search index
  data/             # rules content as JS modules (basicRules, battleRound, …)
  views/            # one view per nav section
  router/           # Vue Router config
public/
  sources/          # original source files (PDF)
```

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

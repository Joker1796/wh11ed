# CLAUDE.md — Image organization

Directory-scoped doc for `public/images/`. Also read this when touching `scripts/gen-webp.mjs`
(the WebP conversion pipeline, lives in `scripts/`) or `src/components/AppImage.vue` (the
rendering component, flat in `src/components/`).

**Corrected 2026-08-03** — this doc used to describe a runtime `-ru` filename-suffix swap for
Core Rules illustrations that **no longer exists in the codebase** (verified: zero
`-ru`-suffixed files remain under this directory, and `grep -rn "ru\.png\|ruSrc" src/` matches
nothing). It was retired when the seven Core Rules chapter pages were merged into
`src/views/CoreRulesView.vue` + `src/components/core/` — see that directory's `CLAUDE.md` for
the current (locale-neutral) illustration story. If you're reading an older note/memory that
mentions `BasicRulesView`/`AdvancedRulesView`/`BattlefieldsView` rewriting image paths per
locale, it's stale — those views don't exist anymore either.

## Folders

One folder per rules chapter: `intro`, `moving`, `coherency`, `visibility`, `command`, `turn`, `attack`, `charge`, `fight`, `terrain`, `monsters`, `attached`, `surge`, `fire` — plus `event/` for Event Companion assets (layout diagrams, edge markers, legend icons, disposition emblems — see `src/components/event/CLAUDE.md`, documented separately since that pipeline extracts from a different source PDF via pymupdf, not the WebP recipe below). Image markup references them as `[img:/images/<folder>/<name>.png|alt]`.

## Illustrations are stored as WebP

For the app-like build. The data files and components still reference the original `.jpg`/`.png` paths — the `AppImage` component (`src/components/AppImage.vue`) maps the extension to WebP at render time, serving `<name>.webp` on desktop and an 800px `<name>-sm.webp` via `<picture>` at `≤640px`. So **keep writing `.jpg`/`.png` paths in data**; do not rewrite them to `.webp`.

**Rendering path:** every illustration `<img>` goes through `AppImage` — in `RuleBlock.vue` (`sideImage`, inline `[img:]` body images, `img-group`), the Core Rules chapter components (section `image`, `illustration`), and `LayoutCard.vue` (`layout.image`). Icons stay as plain `<img>` (markers, `icon:` dispo/legend, the QR). `AppImage` uses `inheritAttrs:false` + `v-bind="$attrs"` to forward `class`/`style` onto the inner `<img>`, and its `<picture>` is `display:contents` so the img stays the float/flex child of the parent. Consequence: **parent scoped CSS that targets the img must use `:deep()`** (e.g. `:deep(.side-image)`, `.section-illustration :deep(img)`), since the img now lives inside the child component.

`scripts/gen-webp.mjs` (`npm run images:webp`, needs the `sharp` devDep) does the conversion. It handles two cases and **deletes the original** in both:

- **Illustrations** → `<name>.webp` + `<name>-sm.webp` (800px mobile copy). `isIllustration()`: all `*.jpg/*.jpeg` **except** `event/legend-*.jpg`, plus `intro/datasheet.png`, `turn/*.png`, **and `event/layout-*.png`**. JPEG sources → lossy WebP; PNG sources → lossless WebP (preserves alpha).
- **Icons** (`iconSpec()`, matched by basename) → a single downscaled `<name>.webp` (no `-sm`), sized ~2× their CSS display: `marker-*` 800px lossless, `dispo-*` 128px lossy, `legend-*` 192px lossy. They render via plain `<img>` (the `icon:` data field / hardcoded `src`), **not** `AppImage`.

The script is idempotent and re-runnable — add a new image as `.jpg/.png`, run it, and it converts + deletes the original (back-filling a missing `-sm.webp` next to an existing illustration `.webp`; icons are skipped in back-fill).

**Left as-is:** `wh40k-app-qr.png` — a 288px 1-bit (2-colour) indexed PNG (~640 B), pre-sized to ~2× its display; kept out of the WebP pipeline on purpose (WebP can't store a 1-bit palette, so it'd be larger and softer). And `favicon.svg`.

## Re-cutting illustrations from the core-rules PDF

Used for the `command/battle-shock-*-diagram` panels — straight, consistent crops that replace crooked hand-cut ones; the old EN phase placards `turn/*PHASE*`/`*TURN-STEP*` this recipe used to also produce are gone (see the Turn Structure diagram note in `src/components/core/CLAUDE.md`). General recipe, with Python+PIL (or pymupdf) + `cwebp`:

1. **Render** the page at 600 dpi: `pdftoppm -f N -l N -r 600 -png sources/WH40k_11ed_CORE-Rules_*.pdf /tmp/p` → a 3780×5434 PNG (page index = printed page no.).
2. **Crop axis-aligned bboxes.** The source elements are straight, so a rectangular bbox auto-fixes human crookedness. Detect bands by brightness/colour (page bg cream ~RGB 245 on p.31); **stacked elements share one left/right `x` range** — derive it from the cleanest element and reuse, varying only the per-element `y`. Downscale (LANCZOS) to the existing file's width (battle-shock 1190).
3. **Battle-shock panels (p.31):** `x[355:2221]`, 4 y-bands (~1865×1075). Crops can land on the cream page edge → thin **white/light border lines**; trim outer rows/cols whose mean brightness `>140` before resizing.
4. **Encode directly with `cwebp`, not `npm run images:webp`** — `gen-webp.mjs` forces *lossless* for `.png` and ignores `command/*.png` (not an illustration there), and a `.jpg` intermediate would double-compress. Use lossy: `cwebp -q 74` / `-q 70` with `-resize 800 0` for the `-sm`. Overwrite the existing `.webp` + `-sm.webp` **keeping the same filenames**. Then `npm run build`. Note: these are photographic, so lossy ≈ the old quality in bytes; lower `q` is what makes them lighter. (History: PRs #26/#28/#29.)

# CLAUDE.md — `src/components/`

The house rules for anything visual: motion, the shared primitives in `style.css`, modal chrome,
square corners, and what the phone this is read on demands. They apply to every component in this
tree — a feature with its own directory (`core/`, `event/`, `tracker/`, `roster/`) adds to them,
never contradicts them. Two of the rules here are enforced by gates: `npm run radii` and
`npm run dupes`.

## Motion & animations

All motion is hand-rolled Vue `<Transition>`/`<TransitionGroup>` + native CSS — **no animation
libraries** (don't add GSAP/@vueuse/motion/animate.css).

- **Motion tokens** live in `src/style.css` (`--motion-fast .15s`, `--motion-med .22s`,
  `--motion-flash .45s`). **Every animation must derive its duration from a token** — the single
  `@media (prefers-reduced-motion: reduce)` override there zeroes all three, disabling motion
  app-wide in one place. Don't hard-code seconds (older hover micro-transitions still do; new work shouldn't).
- **Reusable global transition classes** (also in `style.css`, use by `name=`): `fade` (opacity,
  single toggled elements), `list` (opacity + `position:absolute` leave + `list-move` FLIP, for
  `TransitionGroup` lists — the list container needs `position: relative` to contain leavers),
  `fade-pop` (dropdowns/anchored menus), `slide-up` (fixed bottom bars). `.vp-flash` is the
  value-change color pulse re-triggered by `useFlashOnChange.js`.
- **`CollapseTransition.vue`** — shared height-collapse wrapper for accordions/disclosures of
  **unknown/variable height** (rule bodies, briefings, legends). **State-driven: pass the open state
  as `:show`** (not a `v-if`/`v-show` inside the slot — the wrapper hides the collapsed content
  itself). Pure CSS via the grid `0fr → 1fr` row trick (inner clip is `overflow:hidden;
  min-height:0`), so padding/margins collapse for free with no per-frame padding/box-sizing churn and
  no synchronous `scrollHeight` read — this is what fixed the mobile jank of the old Web-Animations
  version. `contain: layout paint` scopes the reflow to the subtree; collapsed content leaves the
  a11y tree via delayed `visibility`. Duration is `--motion-med`, so reduced-motion (token → 0)
  collapses instantly. Slot may have any number of root nodes. Used by `SubRuleBlock`, the tracker
  picker modals (`Twist/Mission/SecondaryPickerModal`), `ScoringModal` (briefing), `ScoreBreakdown`,
  `EventLayoutsView` (LAYOUTS KEY), and `NavSidebar` (both the section- and group-level drawer
  accordions). Prefer it over per-component `max-height` caps — don't reintroduce them.
- **`BaseModal` animates open only** (`<Transition name="modal" appear>`); **close is intentionally
  instant** — a leave phase races the focus-restore in `useModalA11y.js`. Don't "fix" it.
- **Page transitions**: `App.vue` wraps `<RouterView>` in `<Transition name="fade" mode="out-in">`
  keyed on `$route.path`. Kept at `--motion-fast`; scroll-to-anchor (`scrollToAnchor` in
  `useRefNavigation.js`) polls the DOM for ~1.5s so the short mount delay doesn't break it.
  **A view must have exactly one root node, comments included**: `out-in` waits for the leaving
  root's transition to report back, and a Fragment root (which a comment before the root element
  makes it in dev — comments survive there, not in prod) never does, so the next page never mounts
  and the screen under the navbar stays blank. Enforced by `vue/no-multiple-template-root` with
  `disallowComments` for `src/views/**` (2026-09-19, the roster wizard and editor).
- **Programmatic scrolling never animates** (`instantly()` in `useRefNavigation.js`). `html` carries
  `scroll-behavior: smooth` for the reader's own anchor clicks, and `behavior: 'instant'` is NOT
  enough to opt out of it: Safari only understood that value from **17.4**, so before this each of
  `scrollToAnchor`'s two scrolls became an animation and the second interrupted the first — the
  "search sometimes lands in the wrong place" an iPhone reader sees. The CSS is switched off around
  the scroll and restored after; don't go back to trusting the option. `scrollToAnchor` also waits
  for the **visual viewport** to hold still for two frames before aligning (capped at 500ms): on
  iOS the search palette has the on-screen keyboard up, and dismissing it resizes the viewport for
  ~300ms while Safari scrolls the page itself. `SearchModal` blurs its input before closing to start
  that dismissal a beat earlier, and a `touchstart`/`wheel` from the reader cancels the 400ms
  follow-up correction — once they are scrolling, the page is theirs.

## Shared UI primitives

Scoped styles do not cross a component boundary, so "these two screens need the same button"
kept getting answered with a paste. **What is genuinely one control lives in `style.css`;** what
is genuinely per-screen stays scoped and overrides it (a scoped selector is `0,2,0` with its
`data-v` attribute and outranks the `0,1,0` global, so an override needs only the declarations
it actually changes). `npm run dupes` fails when one rule body appears verbatim in 3+ components.

- **What is global** (each with a `── Name ──` banner in `style.css`): `.btn-primary` /
  `.btn-ghost` / `.btn-lg`, the modal chrome (see Modals), `.modal-body` + `.modal-list`,
  `.seg` (a joined either/or inside a form), `.tabs`/`.tab` (a row of separate boxes, one lit),
  `.back`, `.check` + `.check-note`, `.field > span`, `.help-btn`, `.fsection` /
  `.fsection-title`, `.rc-sticky*` + `.issues-badge` (the roster wizard's footer bar), `.lead`,
  `.split-block`, `.strat-grid`, `.act-list` + `.act-btn` + `.act-danger` (the "…" actions sheet
  a card or a header opens — one full-width button per thing you can do; global since 2026-08-28,
  when the third copy was about to be written and `npm run dupes` would have failed),
  `.copy-row` + `.copy-field` + `.copy-btn` (a link handed over to be copied), and **`.tone`** +
  `.tone-bar` / `.tone-badge` / `.tone-chip` (2026-09-17: an element carrying `--tone-light` /
  `--tone-dark` gets `--tone` resolved for the reader's theme — the faction colour pair from
  `factionsIndex.js`, or a disposition's from `data/dispositionColors.js` — and wears it as a
  left bar, a monogram badge or a small chip; the faction and detachment pickers use it, kept
  apart from `--accent` so a row's own colour never hijacks the screen's selection highlight).
- **Three ways to switch, and they are not interchangeable:** `PageTabs.vue` changes what the
  PAGE shows (faction pages, roster lists); `.seg` is one joined control inside a form; `.tab`
  is a row of separate boxes. Reach for the one that matches the job, don't add a fourth.
- **What is deliberately NOT global:** `.hero`/`.hero-title` — a page hero is page identity
  (landing 3.74rem, faction 3rem, changelog 2rem), and the four plain index pages agreeing is a
  coincidence, not a contract. It is allowlisted in `scripts/check-css-dupes.mjs` with that
  reason; add to that list rather than deleting the check.
- **Repeated markup is a component, not a rule to copy.** The three tracker pickers
  (mission / secondary / twist) drew the same expanding row three times; it is now
  `components/tracker/PickerRow.vue`, and they differ only in what they slot into it.


## Modals

Every dialog is a `BaseModal` (teleported to `<body>`, `useModalA11y` for focus/Escape).

- **The header chrome is global, in `style.css` ("Modal chrome"): `.modal-head`, `.mh-title`,
  `.mh-sub`, `.mh-right`, `.mh-close`.** Not scoped to `BaseModal`, and this is the whole point:
  a consumer's own `<template #header>` renders in **its** scope, which BaseModal's scoped rules
  can never reach. That is why twelve dialogs each carried a private copy of the same four rules
  — and why the thirteenth (`PhasePickerModal`) shipped a header in raw browser defaults until
  2026-08-25. Don't re-add a local copy; a dialog that must differ overrides only the
  declarations it cares about (its scoped `.modal-head` is `0,2,0` and outranks the global
  `0,1,0`) — four do, for a two-line heading or a denser close button.
- **Prefer the `title` prop over the `#header` slot.** BaseModal's own header is exactly heading
  + close, already wired to `aria-labelledby`. Use the slot only for a header carrying more than
  that (a subtitle, a VP counter, extra buttons).
- **`.modal-body` must be the direct child of the slot.** `.modal` is a capped flex column with
  `overflow: hidden`, so only a flex item that is itself a scroll container may shrink below its
  content. Wrapping the body in anything (`FactionAccentScope` did this until 2026-08-27) leaves a
  wrapper at full content height, and the dialog clips instead of scrolling — invisible on a
  desktop where the content fits, and on a phone it means half a unit's wargear is unreachable.
  Put the wrapper INSIDE the body.
- **`.modal-body` is per-dialog** and deliberately NOT part of the chrome: twelve dialogs, twelve
  paddings, no majority. Only its shared scroll behaviour (`overscroll-behavior: contain`) is
  global. A new dialog has to set its own padding — nothing will do it for you.


## Corners & surfaces

**Corners are square.** `border-radius` is not a default we reach for — it is an exception that
has to earn its place, and `npm run radii` fails the build of anyone who forgets.

- Until 2026-08-25 the app carried **314 radius declarations in 100 files**, at 4px, 5px or 6px
  depending on the day the file was written — cards, buttons and inputs each rounded three
  different ways. None of it meant anything; it was sediment, not a system. All 300 of those were
  deleted, not set to `0` (a screenful of no-op CSS in every component is worse than none).
- The angular look was already the house style before the sweep, it just wasn't enforced:
  `PageTabs` ("classic folder tabs, square corners"), `DatasheetCard`'s 10th-ed chamfered stat
  boxes, and a dozen `@media` rules squaring cards once they bled to the screen edge.
- **What is still allowed**, and nothing else — the list lives in `scripts/check-radii.mjs`:
  circles (`50%`: spinners, dots, the round counter, list markers), the mobile bottom sheet's top
  edge in `BaseModal` (the rounding is what says it slid up from the bottom), the focus ring, the
  scrollbar thumb, and the search-hit highlight. The statistics bars were kept round at first and
  squared on sight — on a page of square everything, two rounded strips read as a mistake.
- Adding one is fine when it is a decision: put it in `ALLOWED` with the reason. Forgetting to is
  what the check is for.
- **Every spelling counts.** Until 2026-08-27 `check-radii.mjs` matched only the `border-radius`
  shorthand, so four `border-top-left-radius: 4px` sat on the weapon-table headers in plain sight
  while the check reported a clean sweep — the corners a reader could actually see were the ones
  it could not. The longhands and the logical properties (`border-start-end-radius`…) are matched
  now too. A guardrail that passes is only worth what its pattern covers.
- The flip side of square corners: **the frame does the work rounding used to do.** A surface is
  told from its background by `--border`/`--bg-card`, so don't drop a border "because it looks
  flat" — that is the only thing separating two panels now.

## The phone this is read on

Most readers are on a phone at a table, and a large share of those are on iOS Safari. That is not
a browser to test last — WebKit's differences here are not cosmetic, they lose data and hide
controls. What is already accounted for, and must not be undone:

- **Storage in a tab has a deadline.** WebKit clears a site's script-writable storage — including
  the `localStorage` that holds every roster and every finished game — after about a week without
  a visit. A home-screen install is exempt and a signed-in account has a cloud copy, so the
  roster list says exactly that to a signed-out reader in iOS Safari (`rosterCloudHintIos`), and
  `/help`'s data section repeats it. Do not soften it into "your data lives on your device".
- **`dvh`, never `vh`, for anything capped to the viewport.** `vh` is the LARGE viewport (toolbars
  retracted); a dialog capped in it is taller than the room it has, and on a phone the part that
  leaves the screen is its top — the title and the close button.
- **16px minimum on text fields** (`(pointer: coarse)` in style.css). Below that iOS zooms the
  page in on focus and never zooms back out.
- **Hover is behind `@media (hover: hover)`** on anything a finger lands on: iOS applies the style
  on tap and leaves it there until something else is tapped.
- **A scroll container must be the direct flex child** of a capped, `overflow: hidden` parent —
  see Modals. This one only ever shows up on a phone, because that is the only width where the
  content is taller than the box.
- **`-webkit-text-size-adjust: 100%`** on `html`, or iOS inflates the text of a block it decides
  is too narrow.

### Vertical density is a standing rule

**Vertical space is the scarce axis, and it is spent by default without anyone deciding to.** A
phone gives ~640 usable px between the navbar and the bottom nav; every heading margin, every gap
above a control, every empty band under a hero costs a row of the actual content the reader came
for. Horizontal space, on the same screen, mostly goes unused.

So, when adding or restyling anything that stacks:

- **Count what the first screen shows.** Open the page at 390×844 with the bottom nav and count
  the list rows above the fold. That number is the metric — not how the block looks in isolation.
- **Spend sideways before spending down.** A label beside its control, not above it; two marks
  stacked in a corner rather than a second column of them (`.ds-marks`); a name and its price on
  one line while the width allows.
- **The steps that are already the canon** (2026-08-28, when the faction pages were tightened):
  section gap `1.75rem`, section title `margin-bottom: 0.5rem` with `line-height: 1.1`, a control
  to the list under it `0.55–0.6rem`, group heading `1rem` above / `0.4rem` below, list gaps
  `0.3–0.4rem`. A new block matches these rather than inventing its own.
- **Secondary things start folded** (the catalogue's Filters), and a fold's header is one row —
  not a row plus a caption.
- **Don't repeat the label that is already above you.** A tab named "Units" over a heading named
  "Units" is a free row; if a heading only restates the tab or the hero, question it.
- **A tab strip and its content are joined, not neighbours.** `PageTabs` erases the strip's accent
  line under the open tab so the panel reads as hanging from it; a band of empty page between the
  two breaks that join as well as costing the row. `0.6rem` under the faction hero is the canon.

Tightening is not the same as cramping: tap targets stay ≥44px on anything a finger lands on, and
`.check`-style rows keep their padding. What gets cut is the empty band between blocks, never the
box the finger aims at.

**The effective floor is iOS 16.2 / Safari 16.2**, set by the CSS in use: `color-mix()` (16.2),
container queries the roster panes lay themselves out with (16.0), `overscroll-behavior` (16.0),
`dvh` and `:has()` (15.4). Below it the panes lose their layout and the faction colours fall back.
Raising the floor further is a decision, not a detail — check here before reaching for a new
feature.

**The JS now says the same thing.** Vite 7 changed the default `build.target` to
baseline-widely-available (`chrome107`/`edge107`/`firefox104`/`safari16`), where Vite 6 emitted for
`safari14`. Nothing is set in `vite.config.js`, so that default is what ships — which is the CSS
floor above, a couple of point releases lower. Downgrading it means setting `build.target`
explicitly, and it would only ever buy back browsers the stylesheet has already left behind.

# CLAUDE.md — `src/components/`

The house rules for anything visual: motion, the shared primitives in `style.css`, modal chrome,
square corners, where the palette and type scale live, and what the phone this is read on
demands. They apply to every component in this tree — a feature with its own directory (`core/`,
`event/`, `tracker/`, `roster/`) adds to them, never contradicts them. Three of the rules here are
enforced by gates: `npm run radii` and `npm run dupes` read the stylesheets, `npm run a11y` reads
the screen.

## Motion & animations

All motion is hand-rolled Vue `<Transition>`/`<TransitionGroup>` + native CSS — **no animation
libraries** (don't add GSAP/@vueuse/motion/animate.css).

- **Motion tokens** live in `src/style.css` (`--motion-fast .15s`, `--motion-med .22s`,
  `--motion-flash .45s`, `--motion-count .6s`, `--motion-move .4s`, `--motion-slow .32s` — a sheet rising, `--motion-fold .45s` — a fold opening). **Every animation must derive its duration from a
  token** — the single `@media (prefers-reduced-motion: reduce)` override there zeroes all of them, disabling motion
  app-wide in one place. Don't hard-code seconds (older hover micro-transitions still do; new work shouldn't).
- **Reusable global transition classes** (also in `style.css`, use by `name=`): `fade` (opacity,
  single toggled elements), `list` (opacity + `position:absolute` leave + `list-move` FLIP, for
  `TransitionGroup` lists — the list container needs `position: relative` to contain leavers),
  `fade-pop` (dropdowns/anchored menus), `slide-up` (fixed bottom bars), `sift` (a list or grid a
  search/filter narrows in place — leavers vanish at once via `display:none`, survivors slide,
  newcomers fade; the datasheet grid, the roster catalogue, the changelog).
  `sift` carries **`!important` on purpose**: a scoped item rule (`.ds-chip[data-v]`, 0,2,0; 0,3,0
  once `.on`) with its own hover `transition`/`display` beats any global class — doubling the
  class only ties it, and the scoped sheet comes later — and with no transform transition left
  Vue silently skips the move. The phase classes are transient, so nothing else is overridden. `.vp-flash` is the value-change color pulse
  re-triggered by `useFlashOnChange.js`. A number that should be SEEN changing runs to its new
  value instead of jumping — `useCountUp.js` (rAF, ease-out, reads `--motion-count` at each change
  so reduced motion jumps straight there); the roster's points total uses both. How a button answers
  the finger is **`pressFeedback.js`**, one document listener installed in `main.js` — not a
  directive per button. The shared primitives (`.btn-primary`, `.btn-ghost`, `.tab`, `.bn-item`)
  sink a little while held by class alone — not `.seg`, whose answer is its sliding plate (a button
  shrinking inside a plate that does not shows the plate round its edges); a one-off opts in with `data-press`; an icon
  button whose result stays on screen (a mark, a toggle, back-to-top) takes `data-press="pop"` —
  its icon sinks and springs back with a wobble on release. Every checkbox row (a `<label>`
  holding a checkbox) pops its box the same way, found by shape, not marked. A press sinks a button
  by ~4px of its width (3–10%), so a 40px square and a wide button both read. Don't give a pop to a button that
  navigates, opens a modal or deletes: nobody sees it. Web Animations, **never a class or
  `:active`**: the tap flips the button's own `:class`, and Vue rewrites the whole attribute when a
  class binding changes, so an added class is gone before it can play (the first version never
  animated anywhere); `:active` is unreliable on iOS and loses to every scoped `transition`.
- **`.seg` slides its lit half** (`segSlider.js`, installed in `main.js` beside `pressFeedback`).
  One MutationObserver on class changes of buttons inside a `.seg` — no `.seg` in the app had to
  change. Before its first switch a `.seg` draws as it always did; on the first switch it becomes
  `seg-ready`, and from then on the accent is a `::before` plate the observer positions with
  `--seg-x/y/w/h` (the buttons go transparent over it), sliding at `--motion-med`. A `.seg` that
  wants a different lit colour must now style `.seg-ready::before` too, not only `button.on`.
- **`NumberStepper` rolls its number** like a counter wheel — the new value in from below when it
  grew, from above when it shrank, both sharing one clipped grid cell so the control never changes
  width; its − / + take the press. It is shared by the roster editor and the tracker.
- **`useFlipMove.js` — an element travelling between sections.** `TransitionGroup` moves children
  of ONE group; a pinned faction leaves its group for the "Pinned" one (it no longer stands in
  both — `unpinnedGroupsFrom`, 2026-09-28), so every faction list (`/factions`, the bottom nav's
  `FactionsNavModal`, the tracker/roster `FactionPickerModal`, Combat Patrol) marks its cards and
  headings `data-flip="<key>"` and the composable slides each key from where it stood to where it
  stands now (Web Animations, `--motion-move`); a new key fades in. A faction's unit grid does the
  same for a pinned unit (`pinnedUnitsFrom`/`unpinnedUnitGroupsFrom` — both pairs are thin wrappers
  over one split in `useFavorites.js`). Its chips live inside `sift` TransitionGroups (the search),
  so a node in `*-leave-active` is skipped: it still carries its key while its replacement arrives. Watchers, not update hooks: in
  a modal the list is slot content and the CHILD re-renders, so the owner's `onBeforeUpdate` never
  fires. Script-driven motion reads its token through `motionToken.js`'s `motionMs`, which is how
  reduced motion reaches it.
  The roster's own list (`RosterUnitList`) uses it too: adding, removing, attaching and folding
  slide the tiles, and `onAppear` outlines a unit that just arrived and scrolls ITS PANE (never the
  page) to it when it landed out of view — sections sort by name, so it can land anywhere.
- **`CollapseTransition.vue`** — shared height-collapse wrapper for accordions/disclosures of
  **unknown/variable height** (rule bodies, briefings, legends). **State-driven: pass the open state
  as `:show`** (not a `v-if`/`v-show` inside the slot — the wrapper hides the collapsed content
  itself). Pure CSS via the grid `0fr → 1fr` row trick (inner clip is `overflow:hidden;
  min-height:0`), so padding/margins collapse for free with no per-frame padding/box-sizing churn and
  no synchronous `scrollHeight` read — this is what fixed the mobile jank of the old Web-Animations
  version. `contain: layout paint` scopes the reflow to the subtree; collapsed content leaves the
  a11y tree via delayed `visibility`. Duration is `--motion-fold` on a slow-start curve, the
  content fading in a beat behind the height (a tall body shows only its first few hundred px
  while opening, and a fast start spent those in what read as one frame, 2026-09-28), so reduced-motion (token → 0) collapses instantly. **Its header's
  arrow is `ChevronIcon.vue`** (`:turned`, `from`, `to`) — one glyph rotated, not two swapped;
  every fold outside the tracker uses it, the tracker's own still swap (its redesign branch). Slot may have any number of root nodes. Used by `SubRuleBlock`, the tracker
  picker modals (`Twist/Mission/SecondaryPickerModal`), `ScoringModal` (briefing), `ScoreBreakdown`,
  `EventLayoutsView` (LAYOUTS KEY), and `NavSidebar` (both the section- and group-level drawer
  accordions). Prefer it over per-component `max-height` caps — don't reintroduce them.
- **`ExpandTransition.vue`** — `CollapseTransition`'s sibling for a block that APPEARS: a `v-if`
  answer to a choice made elsewhere (the "taken off / put back" line, a wargear group's blocked
  note, the Warlord box, the Force Disposition field, the import report, the Legends proxies
  under a search). `<ExpandTransition><p v-if="x">…</p></ExpandTransition>`; a `v-if`/`v-else`
  chain inside needs a `key` per branch and usually `mode="out-in"`. Web Animations on the
  element's own height, vertical padding and margins, one measurement per enter — for small
  blocks; content that always exists and folds (an accordion) stays `CollapseTransition`. An
  inline bit in a row (a custom-points input, a cap chip, an empty-state line) takes `fade`
  instead: there is no height to give. Wrapping the HEAD of a `v-if`/`v-else-if` chain splits
  the chain — give the wrapped element its own condition (see `StratagemsView`'s empty note).
- **Switches inside a page fade** (`fade`, `mode="out-in"`): the `PageTabs` panels, the faction
  pages' tabs and the roster editor's Settings | Units. They slid sideways by the control's order
  (an `axis-*` pair) until 2026-09-29, and the owner found every one of them jerky; the pair is
  gone. A view that sizes itself to the window must keep that layout until it has faded out, and
  a view that is expensive to build is not remounted per switch: both stay built behind `v-show`,
  one `<Transition>` each, and the leaving one's `after-leave` lets the other in — the editor does
  both (`paneTab`). A tab switch hands its `@enter` to `bringTabsIntoView`.
- **`BaseModal` animates open only** — on a phone the sheet rises from below the screen edge, wider
  it grows in from 0.94, at `--motion-slow`; never the dialog's opacity (VoiceOver focus, see its CSS) (`<Transition name="modal" appear>`); **close is intentionally
  instant** — a leave phase races the focus-restore in `useModalA11y.js`. Don't "fix" it.
- **Page transitions**: `App.vue` wraps `<RouterView>` in `<Transition name="fade" mode="out-in">`
  keyed on `pageKey`. **Every page swap fades** (owner, 2026-09-29): from 2026-09-28 pages slid
  sideways down and up a chain (`meta.trail`/`meta.level`), the help's prev/next did too, and the
  bottom chips' target rose from below — all read as jerky and are gone, with the route meta that
  drove them. Should a moving swap ever come back, move it with `position: relative` +
  `left`/`top`, **never `transform`**: a transformed page is the containing block of every
  `position: fixed` inside it (the builder's Cancel/Save bar, a faction's side buttons), which
  would ride with it. **A page's data is fetched before it is shown** (`router/prefetch.js`, named
  by `meta.prefetch`, awaited in `beforeResolve`, capped at 4s): the faction pages render only once
  their chunk is in, and without this they came in empty and the content popped a beat later.
  **A faction's tabs are nested routes** (`FactionPagesView` → `FactionLayout` → its own
  `RouterView`), and `App.vue` keys the swap by `pageKey` — the parent record + slug where a route
  has children — so a tab switch fades only the content under the hero. The leaving page gets
  `.page-leaving` — App.vue's `--roster-sticky-h` reserve keys off it (`usePageMotion.js`).
  **The scroll is set in the swap, not at the click** (`scrollBehavior` in `router/index.js` waits
  for `pageArrived`, the transition's `@enter`: the new page is in, still invisible) and instantly —
  set at the click, `<html>`'s smooth scrolling slid the leaving page up for half a second. Between
  the pages the container keeps the old page's height (`pageLeaving` → `min-height`, released once
  the new page grows into it or stops growing): collapsed, the scroll was clamped to 0, a reset to
  the top became a no-op, and the browser put the old offset back when the page's data arrived.
  `instantly()` (useRefNavigation) settles the layout first and holds `scroll-behavior: auto` for two
  frames — Chrome can carry a scroll asked for on a stale layout into the next frame. In-page tab
  panels do the same in their own `@enter` (`bringTabsIntoView`): a tab switched deep in a long tab
  brings the strip back under the header instead of the browser clamping the scroll. Kept at `--motion-fast`; scroll-to-anchor (`scrollToAnchor` in
  `useRefNavigation.js`) polls the DOM for ~1.5s so the short mount delay doesn't break it.
  **A view must have exactly one root node, comments included**: `out-in` waits for the leaving
  root's transition to report back, and a Fragment root (which a comment before the root element
  makes it in dev — comments survive there, not in prod) never does, so the next page never mounts
  and the screen under the navbar stays blank. Enforced by `vue/no-multiple-template-root` with
  `disallowComments` for `src/views/**` (2026-09-19, the roster wizard and editor).
- **Programmatic scrolling never animates through CSS** (`instantly()` in `useRefNavigation.js`) — the
  one animated kind is `scrollToAnchor(id, offset, { glide: true })`, the reader's own jump within
  the page on screen (contents, chapter subnav, drawer, a section's TOC, a cross-ref): its own rAF
  loop re-measures the target every frame, and a long jump goes to a screen short of it at once
  and glides the rest (2026-09-28). Search and any arrival from another page stay instant — the
  paragraph below is why. `html` carries
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
it actually changes). `npm run dupes` fails when one rule body appears verbatim in 2+ components
— a PAIR since 2026-09-25, because nearly every copy the component audit found that day was two
screens that had copied each other and drifted. The pairs that existed then are recorded in
`scripts/lib/css-dupes-baseline.json`; a new pair fails, and so does a third copy of a recorded one.

- **What is global** (each with a `── Name ──` banner in `style.css`): `.btn-primary` /
  `.btn-ghost` / `.btn-lg`, the modal chrome (see Modals), `.modal-body` + `.modal-list`,
  `.seg` (a joined either/or inside a form), `.tabs`/`.tab` (a row of separate boxes, one lit),
  `.back`, `.check` + `.check-note`, `.field > span`, `.help-btn`, `.fsection` /
  `.fsection-title`, `.rc-sticky*` (the roster builder's footer bar — its points and issue badge are `roster/RosterPointsTally.vue`), `.lead`,
  `.split-block`, `.strat-grid`, `.act-list` + `.act-btn` + `.act-danger` (the "…" actions sheet
  a card or a header opens — one full-width button per thing you can do; global since 2026-08-28,
  when the third copy was about to be written and `npm run dupes` would have failed),
  `.copy-row` + `.copy-field` + `.copy-btn` (a link handed over to be copied), and **`.tone`** +
  `.tone-bar` / `.tone-badge` / `.tone-chip` (2026-09-17: an element carrying `--tone-light` /
  `--tone-dark` gets `--tone` resolved for the reader's theme — the faction colour pair from
  `factionsIndex.js`, or a disposition's from `data/dispositionColors.js` — and wears it as a
  left bar, a monogram badge or a small chip; the faction and detachment pickers use it, kept
  apart from `--accent` so a row's own colour never hijacks the screen's selection highlight); a faction's badge goes through `FactionBadge.vue`, which draws its emblem instead of the
  monogram when the faction has one; the emblem itself is `FactionEmblem.vue` — before the name in
  the faction and Combat Patrol page heroes, and as a faint `stamp` on the cards with room for it
  (Combat Patrol, roster list, finished games; never in a dense list row, where it read as a
  second stray icon). Emblems are files in `public/images/faction-icons/<slug>.svg`;
  `npm run faction-icons` measures their shape and ink into `src/data/factionIcons.js`, and a
  stamp's size comes from the ink, so every emblem puts the same colour on a card).
- **Three ways to switch, and they are not interchangeable:** `PageTabs.vue` changes what the
  PAGE shows (faction pages, roster lists); `.seg` is one joined control inside a form; `.tab`
  is a row of separate boxes. Reach for the one that matches the job, don't add a fourth.
  A `PageTabs` tab may also carry **`warn`** — the sentence an amber ⚠ stands for (tooltip and
  accessible name both), for "the answer to this is behind a tab you are not on". It keeps its
  colour in the closed state on purpose: a mark only a reader who already opened the tab can see
  says nothing.
- **What is deliberately NOT global:** `.hero`/`.hero-title` — a page hero is page identity
  (landing 3.74rem, faction 3rem, changelog 2rem), and the four plain index pages agreeing is a
  coincidence, not a contract. It is allowlisted in `scripts/check-css-dupes.mjs` with that
  reason; add to that list rather than deleting the check.
- **Repeated markup is a component, not a rule to copy.** The three tracker pickers
  (mission / secondary / twist) drew the same expanding row three times; it is now
  `components/tracker/PickerRow.vue`, and they differ only in what they slot into it.
  The same went for the detachment row (2026-09-24): the faction pages' picker and the roster
  builder's each drew their own, and only one of them ever got the Force Disposition colour. Both
  draw `components/DetachmentOption.vue` now; the modals around it stay separate. The disposition
  is its chip under the price; the row wore a `.tone-bar` stripe too until the owner dropped it
  (2026-09-25). Its rows must not shrink (`flex-shrink: 0`): the lists are flex columns.
  **A picker's list is a component of its own, so it can live in a modal OR a dropdown**
  (2026-10-01): `tracker/FactionPickerList.vue` and `tracker/DetachmentPickerList.vue` are the
  rows; `FactionPickerModal`/`DetachmentPickerModal` wrap them in `BaseModal` (phones, the tracker),
  and the desk's settings line wraps them in `PickerDropdown.vue` — the account menu's recipe
  (backdrop for the outside click, Escape, `fade-pop`), the modal's surface, its own scroll. The
  declared Force Disposition there is a `PickerDropdown` too, its chips in their colours.
  Everywhere else a picker serves both widths, **`AdaptivePicker.vue`** picks the shape: the
  dropdown from 901px up, the modal below, the same list in both (its slot hands the list
  `compact` and `bodyClass`). In use: the faction pages' chapter and detachment pickers
  (`FactionPickerBar`, rows from `FactionDetachmentList`) and the tracker's game setup (faction,
  detachments). Not for pickers whose rows unfold rich content (missions, secondaries, twists,
  layouts) or carry a form (the roster picker's share-link field) — a dropdown is for a short list.
  **The panel is teleported to `<body>`** and placed from the trigger's rect (`position: fixed`,
  `width`/`align` props, it follows scroll and resize): a dropdown inside a roster card
  (`contain: paint`) or the desk's scrolling list column was clipped by it. It copies the faction
  accent variables from where it was opened, since `useFactionAccent` does not reach `<body>`.
  **The "…" menus are `ActionMenu.vue`** (2026-10-01): an `AdaptivePicker` holding the `.act-list`,
  as menu rows (`.act-compact`) under the button on a wide screen, the sheet on a phone. In use:
  the roster list's cards, the list view's header, a unit row in the editor (its `#body` slot
  carries the block-name form and the faction accent the modal needs), the datasheet page's
  folded buttons, the tracker's secondary cards. Delete still asks through `ConfirmModal`. The
  desk's "More settings" is a plain `PickerDropdown` — that line exists only on a wide screen.
  A faction keyword tapped in rule prose (`KeywordUnitsModal`) hangs its unit list from the word on
  a wide screen, placed by the glossary popover's own rule (`utils/anchorPlacement.js`).
  Search (`SearchModal`) docks in the navbar on a wide screen: the button stretches left into the
  field and the results drop under it, no dimming; a phone keeps the full-screen sheet, faded in.
  The unfold is a `clip-path` on the overlay — the root of App's `<Transition name="search">`,
  because Vue times enter/leave by the root's own animation and would cut a child's short.


## Modals

Every dialog is a `BaseModal` (teleported to `<body>`, `useModalA11y` for focus/Escape).

- **The phone's Back closes the dialog, not the app** — `useBackToClose.js`, wired through
  `useModalA11y` (so every `BaseModal`/`ConfirmModal`/`SearchModal` gets it) and, for the nav
  drawer that stays mounted, `useBackToCloseWhile(ref)` in `App.vue`. Opening pushes a copy of the
  current history entry; Back pops it. A dialog that closes and navigates in one go (search) leaves
  a dead copy behind on purpose — the listener steps over it — so don't "fix" the deferred self-pop
  into a synchronous `history.back()`: that undoes the navigation. A dropdown (settings, account
  menu) or the keyword popover is not a page and does not get this.

- **The header chrome is global, in `style.css` ("Modal chrome"): `.modal-head`, `.mh-title`,
  `.mh-sub`, `.mh-right`, `.mh-close`, `.mh-count`.** Not scoped to `BaseModal`, and this is the whole point:
  a consumer's own `<template #header>` renders in **its** scope, which BaseModal's scoped rules
  can never reach. That is why twelve dialogs each carried a private copy of the same four rules
  — and why the thirteenth (`PhasePickerModal`) shipped a header in raw browser defaults until
  2026-08-25. Don't re-add a local copy; the two variants a dialog needs are BaseModal props.
- **Use the props, not the `#header` slot.** `title`, `subtitle` (a second line; the header then
  aligns to the top), `dense` (a 32px close, top-aligned — for a title that may wrap) and the
  `#aside` slot (whatever sits beside the close button: a `.mh-count` counter — `.full`, `.over`,
  `.value` — or a toggle) cover every dialog the app has. Twelve dialogs drew their header by hand
  until 2026-09-25, and none of them had an accessible name: `aria-labelledby` only reached a
  `title` BaseModal rendered itself. A consumer's scoped `.modal-head`/`.mh-close` override does
  NOT reach the header BaseModal renders — that is what `dense` and `subtitle` are for. The slot
  still exists (it passes `titleId` for the heading's `id`), but nothing uses it.
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

## Palette & type live in `style.css`, not here

There is no separate style passport: the design tokens at the top of `src/style.css` are it.
Read that `:root` block before styling anything new — it is short and it answers every "which
colour / which face / how big" question.

- **Colour** — `--bg-*` surfaces, `--accent` (the house oxblood), `--text-*`, `--border*`, the
  ability tints (`--ability-weapon` / `--ability-unit`) and the sub-rule set. There is a dark
  theme (`:root[data-theme='dark']` further down the same file), so a hex literal in a component
  is a colour that will not change with the theme — write `var(--token)` unless the surface is
  always-dark on purpose. `FactionAccentScope` re-points `--accent` per faction; that is the
  extension mechanism, not a licence to hard-code faction colours.
- **`--danger`** is the one red that means "something is wrong": points over budget, issue
  badges, validation errors, losses, destructive hover. Until 2026-09-21 it had no token and sat
  as `#c0392b` (or its bootstrap cousin `#d9534f`) in 17 files, each with — or, more often,
  without — its own dark-theme override; now the token carries the dark shade itself, so a
  component never writes a `[data-theme='dark']` rule just to brighten a red. Not every red is
  danger: `StratCard`'s opponent-turn tint is a turn colour and keeps its own value.
- **`--warning`** is its neighbour: "legal, but you still owe an answer" — the roster's
  worth-checking bar, the amber mark `PageTabs` puts on a tab that hides an unmade choice, the
  import warnings. It got a token on 2026-09-24; before that it was `var(--warning, #b8860b)` in
  three files, i.e. a literal, and that literal was **2.5:1 on the light page**. The light value
  is the darker amber that clears AA as TEXT on its own 10% tint (4.9:1), not merely as an icon;
  the dark shade rides in the token the way `--danger`'s does.
- **Type** — `--font-display` (Sofia Sans Extra Condensed) on every heading and title,
  `--font-sans` (Inter) on everything else, `--font-serif` (EB Garamond) only on lore flavour
  text. The heading scale is `--fs-*` / `--fw-heading`; new headings pick a step, they don't
  invent a size. `font-family: inherit` on buttons/inputs is fine (it is undoing the UA default).
- **Layout constants** — `--navbar-height`, `--subnav-height`, `--header-total`,
  `--sidebar-width`, the `--safe-*` insets. Anything that must line up with the chrome
  references these rather than repeating `56px`.

## `npm run a11y` — the gate that looks at the rendered page

`radii` and `dupes` read source; nothing read the screen until 2026-09-21, which is how ~15 error
states sat dark-maroon on the dark theme for months (the `--danger` story above). `npm run a11y`
(`scripts/check-a11y.mjs`) builds nothing — it needs a fresh `dist/` — then drives the installed
Google Chrome through `playwright-core` over 18 routes × EN/RU × light/dark × 390/1280px and
measures three things from computed styles and real geometry:

- **Contrast** — WCAG AA, 4.5:1 for text and 3:1 for large text, resting state only. Text over a
  background-image is skipped (not computable), so are disabled controls.
- **Tap targets** — 24×24px minimum, with WCAG's own two exceptions: inline links in running text,
  and a small control with nothing else to hit within 24px of its centre.
- **Overflow** — the document never scrolls sideways; the widest offenders are named.

Findings are keyed by theme + element signature + colour pair, not by page — a bad token pair is
one finding however many pages carry it, and fixing the token clears them all. **The baseline**
(`scripts/lib/a11y-baseline.json`, 124 entries after the first pass) holds what the palette itself
was short of AA on that day: `--text-dim` on every surface (2.6–3.2:1), the dark `--accent` as
text (2.8–3.7:1) and as a button ground under white (4.2:1), `--text-muted` on `--bg-secondary`
(4.24:1), a faction's own green as chip text. Those are palette decisions, still a fix each; the
gate is red only on something new. A baseline entry that stops firing is reported as stale, so
the file shrinks as the palette is fixed; `--baseline` re-records it — read the diff first.

Tracker and roster screens that need a game or a list in storage are not in the route sample on
purpose: a check that has to seed state to render is a test and lives in vitest.


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
- **A page heading is a ROW, not a band** (2026-09-23, the tracker home and the roster list).
  Both spent three bands of a phone's first screen on a centred title, a full-width accent rule
  and a line of status under it. They now put the title on the left and, on the same baseline to
  its right, the two things that are *about* the page rather than part of it — the link to its
  page of the guide and where the data is kept — over one accent rule. Signed out, the cloud
  status is three words (`cloudLocalOnly`) with the full sentence in its `title`: a reader who is
  not signed in is not reading a paragraph about why they should be. That saved ~90px above the
  fold on each screen, and a long address ellipsizes rather than widening the page. **The help
  link is the rightmost of the pair**: it is the one that is always there in the same shape, so
  it holds the corner while the line beside it — an address, or three words about this device —
  grows and shrinks to its left.
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

<template>
  <div class="changelog-view">
    <div class="hero">
      <h1 class="hero-title">
        {{ labels.changelogTitle }}
      </h1>
      <p class="hero-sub">
        {{ labels.changelogSubtitle }}
      </p>
    </div>

    <div
      class="changelog-body"
      @click="openSheet"
    >
      <!-- "Show more" and the archive fade their releases in rather than dropping them in. -->
      <TransitionGroup
        name="sift"
        tag="div"
      >
        <section
          v-for="e in visibleEntries"
          :id="`v${e.version}`"
          :key="e.version"
          class="cl-entry"
        >
          <header class="cl-head">
            <span class="cl-ver">v{{ e.version }}</span>
            <time
              class="cl-date"
              :datetime="e.date"
            >{{ formatDate(e.date) }}</time>
          </header>
          <!-- Rendered, not printed: entries have always been written in the app's own body markup
               (`**bold**`, a `[KEYWORD]`, a `(NN.NN)` cross-ref, an in-app `[text](/path)`) and this
               list used to show it raw. renderInline is the same transform every rule text goes
               through, and App.vue's document-level handler makes the keywords, cross-refs and
               in-app links it produces behave here as they do inside a rule. Each `{ h }` heading
               opens a block of its own kind (changelogMarks.js → noteSections). -->
          <div
            v-for="(sec, si) in noteSections(e[locale] || e.en)"
            :key="si"
            class="cl-sec"
            :class="sec.kind && `cl-sec--${sec.kind}`"
          >
            <h3
              v-if="sec.h"
              class="cl-h"
            >
              <i
                v-if="sec.kind"
                :class="SECTION_KINDS[sec.kind].icon"
                aria-hidden="true"
              />
              <span v-safe-html="renderInline(sec.h)" />
            </h3>
            <ul class="cl-list">
              <li
                v-for="(note, i) in sec.items"
                :key="i"
                v-safe-html="noteHtml(note, sec.kind)"
              />
            </ul>
            <RouterLink
              v-if="sec.patch"
              class="cl-patch"
              :to="{ path: '/patches', query: { p: sec.patch } }"
            >
              <i
                class="wi wi-army"
                aria-hidden="true"
              />
              <span>{{ labels.changelogPatchPlate }}</span>
              <i
                class="wi wi-chevron-right"
                aria-hidden="true"
              />
            </RouterLink>
          </div>
        </section>
      </TransitionGroup>
      <button
        v-if="changelog.length > visibleCount"
        class="show-more"
        @click="showMore"
      >
        {{ labels.changelogShowMore }}
      </button>
      <!-- The older releases come from the API's archive, only on request (useChangelogArchive). -->
      <template v-else-if="archive.status.value !== 'done'">
        <p
          v-if="archive.status.value === 'offline' || archive.status.value === 'error'"
          class="cl-archive-note"
          role="status"
        >
          {{ archive.status.value === 'offline' ? labels.changelogArchiveOffline : labels.changelogArchiveError }}
        </p>
        <button
          class="show-more"
          :disabled="archive.status.value === 'loading'"
          @click="loadOlder"
        >
          {{ archive.status.value === 'loading' ? labels.changelogArchiveLoading
            : archive.status.value === 'idle' ? labels.changelogShowOlder : labels.changelogArchiveRetry }}
        </button>
      </template>
    </div>
    <!-- A datasheet named in a note opens over the page instead of leaving it (owner, 2026-10-14). -->
    <RosterUnitRulesModal
      v-if="sheet"
      :unit-id="sheet.unitId"
      :faction-slug="sheet.factionSlug"
      @close="sheet = null"
    />
  </div>
</template>

<script setup>
// Standalone "What's New" page (/changelog). Renders the bilingual changelog.js, newest first,
// then — on request — the older releases from the API's archive (the file keeps only the last few;
// deploy.sh moves the rest). Reachable from the footer version and the update-notice banner.
// Opening it clears the banner.
import { ref, computed, defineAsyncComponent } from 'vue'
import { changelog } from '../data/changelog.js'
import { renderMarks, SECTION_KINDS, noteSections, boldQuestion } from '../data/changelogMarks.js'
import { useLocale } from '../composables/useLocale.js'
import { useRenderInline } from '../composables/useRenderInline.js'
import { useFormatDate } from '../composables/useFormatDate.js'
import { useUpdateNotice } from '../composables/useUpdateNotice.js'
import { useChangelogArchive } from '../composables/useChangelogArchive.js'

// Loaded on the first tap: the card and its rules data must not ride in this page's chunk.
const RosterUnitRulesModal = defineAsyncComponent(() => import('../components/roster/RosterUnitRulesModal.vue'))
const sheet = ref(null)
// A note's link to a datasheet ([X](/factions/<slug>/datasheets/<id>)) opens the card in a dialog;
// every other in-app link is App.vue's (a route change). Stopped here, before App.vue's document
// listener sees it.
const SHEET_LINK = /^(?:\/ru)?\/factions\/([a-z-]+)\/datasheets\/([^/?#]+)$/
function openSheet(e) {
  const a = e.target.closest?.('a.int-link')
  if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  const m = SHEET_LINK.exec(a.getAttribute('href') || '')
  if (!m) return
  e.preventDefault()
  e.stopPropagation()
  sheet.value = { factionSlug: m[1], unitId: m[2] }
}
import { ui } from '../i18n/ui.js'
import { vSafeHtml } from '../directives/safeHtml.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { formatDate } = useFormatDate()
const { renderInline } = useRenderInline()
// One note as the page draws it: the body markup, then the changelog's own marks; in the answers
// block the question leads in bold.
const noteHtml = (note, kind) => {
  const html = renderMarks(renderInline(note), locale.value)
  return kind === 'answers' ? boldQuestion(html) : html
}

// Pagination — show 5 versions at a time via "show more" (same recipe as tracker game history).
const PAGE = 5
const visibleCount = ref(PAGE)
const archive = useChangelogArchive()
// The file's own entries first (paged locally — normally there are only a few), then whatever the
// archive has returned so far.
const visibleEntries = computed(() =>
  visibleCount.value < changelog.length
    ? changelog.slice(0, visibleCount.value)
    : [...changelog, ...archive.entries.value])
function showMore() {
  visibleCount.value += PAGE
}
function loadOlder() {
  archive.loadOlder(changelog.at(-1)?.version, new Set(changelog.map((e) => e.version)))
}

// Seeing the changelog means the latest is "seen" — dismiss the banner.
useUpdateNotice().markSeen()
</script>

<style scoped>
.changelog-view {
  padding-top: 0.5rem;
  max-width: 720px;
  margin: 0 auto;
}

.hero {
  margin-bottom: 1.5rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.hero-sub {
  margin: 0.3rem 0 0;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.cl-entry {
  padding: 0.9rem 0;
  border-top: 1px solid var(--border);
}

.cl-entry:first-child {
  border-top: none;
}

.cl-head {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}

/* The version is a plate, the accent FILL with white on it (owner, 2026-10-07): as accent INK on
   the dark page it was 3.7:1 — the dark theme's red text the owner keeps below AA — and a version
   number is the one line here that has to be read at a glance. */
.cl-ver {
  padding: 0.05rem 0.45rem;
  background: var(--accent);
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--text-on-accent);
}

.cl-date {
  font-size: 0.82rem;
  color: var(--text-dim);
}

/* The marks a note draws instead of describing (data/changelogMarks.js): a small copy of the
   control — the frame and the surface of the builder's own `.seg` buttons, sized to the line. Out
   of v-html, so reached with :deep. */
.cl-list :deep(.cl-btn),
.cl-list :deep(.cl-key) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: -0.2em;
  height: 1.45em;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  line-height: 1;
}
.cl-list :deep(.cl-btn) { min-width: 1.6em; font-size: 0.95em; }
.cl-list :deep(.cl-nw) { white-space: nowrap; }
/* A text button sits on the line's baseline — its label is text among text; the icon's -0.2em is
   for a glyph with no baseline of its own, and pulled the label below the line. */
.cl-list :deep(.cl-key) { vertical-align: baseline; height: auto; padding: 0.15em 0.45em; font-size: 0.85em; font-weight: 600; }
/* A contributor's name ({who:…}, changelogMarks.js) — the amber token, AA in both themes. */
.cl-list :deep(.cl-who) { color: var(--warning); font-weight: 700; }

.cl-list {
  margin: 0;
  padding-left: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.cl-list li {
  color: var(--text-primary);
  font-size: 0.92rem;
  line-height: 1.5;
}

/* A block of one release (note `{ h }` and what follows it, changelogMarks.js → noteSections):
   the kind's colour on the heading's icon — what the block is about, readable before a word of it.
   A palette token each, so both themes and AA come with it. No edge down the block's left: it
   was there for a day and the owner took it off (2026-10-13). */
.cl-sec { --cl-tone: var(--text-dim); }

/* The way to the whole GW update this block summarises: a plate, not one more link in a note. */
.cl-patch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0 0;
  padding: 0.6rem 0.8rem;
  min-height: 44px;
  border: 1px solid var(--warning);
  background: color-mix(in srgb, var(--warning) 10%, transparent);
  color: var(--warning);
  font-weight: 600;
  text-decoration: none;
}
.cl-patch span { flex: 1; }
@media (hover: hover) {
  .cl-patch:hover { background: color-mix(in srgb, var(--warning) 18%, transparent); }
}
.cl-sec + .cl-sec { margin-top: 0.7rem; }
.cl-sec--rules { --cl-tone: var(--ability-unit); }
.cl-sec--roster { --cl-tone: var(--accent); }
.cl-sec--tracker { --cl-tone: var(--sub-rule-border); }
.cl-sec--answers,
.cl-sec--report { --cl-tone: var(--text-dim); }
.cl-sec--thanks { --cl-tone: var(--warning); }
.cl-sec--site,
.cl-sec--account { --cl-tone: var(--text-dim); }

.cl-h {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0 0 0.3rem;
  font-family: var(--font-display);
  /* A size up from the body text it heads (owner, 2026-10-13: at 1.15rem the condensed face read
     no bigger than the notes under it). */
  font-size: 1.45rem;
  font-weight: 400;
  line-height: 1.1;
  color: var(--text-primary);
}
.cl-h i { color: var(--cl-tone); font-size: 1.05em; }
/* The roster's red edge is a fill colour; as the icon's ink the dark theme wants its ink twin. */
.cl-sec--roster .cl-h i { color: var(--accent-ink); }

/* An answer's question (the answers block, boldQuestion) and an in-app link to a unit, a rule or
   a page (`[text](/path)` → a.int-link, routed by App.vue): a link reads as one, in ink, dotted
   so a line of unit names does not turn into a solid underline. */
.cl-list :deep(.cl-q) { font-weight: 600; }
.cl-list :deep(a.int-link) {
  color: var(--accent-ink);
  text-decoration: underline dotted;
  text-underline-offset: 0.18em;
}
@media (hover: hover) {
  .cl-list :deep(a.int-link:hover) { color: var(--accent-ink-hover); text-decoration-style: solid; }
}

.show-more {
  display: block;
  margin: 1.2rem auto 0;
  padding: 0.5rem 1.2rem;
  background: none;
  color: var(--text-muted);
  border: 1px solid var(--border);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}
.show-more:hover { border-color: var(--accent); color: var(--accent-ink); }
.show-more:disabled { opacity: 0.6; cursor: default; }
.show-more:disabled:hover { border-color: var(--border); color: var(--text-muted); }

.cl-archive-note {
  margin: 1.2rem 0 0;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.85rem;
}
.cl-archive-note + .show-more { margin-top: 0.6rem; }
</style>

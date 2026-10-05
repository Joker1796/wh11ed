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

    <div class="changelog-body">
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
          <ul class="cl-list">
            <!-- Rendered, not printed: entries have always been written in the app's own body markup
                 (`**bold**`, a `[KEYWORD]`, a `(NN.NN)` cross-ref) and this list used to show it
                 raw — "**riled up**" with the asterisks in it. renderInline is the same transform
                 every rule text goes through, and App.vue's document-level handler makes the
                 keywords and cross-refs it produces behave here as they do inside a rule. -->
            <li
              v-for="(note, i) in (e[locale] || e.en)"
              :key="i"
              :class="{ 'cl-h': note.h }"
              v-html="renderMarks(renderInline(note.h || note), locale)"
            />
          </ul>
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
  </div>
</template>

<script setup>
// Standalone "What's New" page (/changelog). Renders the bilingual changelog.js, newest first,
// then — on request — the older releases from the API's archive (the file keeps only the last few;
// deploy.sh moves the rest). Reachable from the footer version and the update-notice banner.
// Opening it clears the banner.
import { ref, computed } from 'vue'
import { changelog } from '../data/changelog.js'
import { renderMarks } from '../data/changelogMarks.js'
import { useLocale } from '../composables/useLocale.js'
import { useRenderInline } from '../composables/useRenderInline.js'
import { useFormatDate } from '../composables/useFormatDate.js'
import { useUpdateNotice } from '../composables/useUpdateNotice.js'
import { useChangelogArchive } from '../composables/useChangelogArchive.js'
import { ui } from '../i18n/ui.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { formatDate } = useFormatDate()
const { renderInline } = useRenderInline()

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

.cl-ver {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--text-muted);
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

/* A section heading within an entry (note is `{ h }`): no bullet, pulled back to the left edge. */
.cl-list li.cl-h {
  list-style: none;
  margin-left: -1.2rem;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--text-primary);
}
.cl-list li.cl-h:not(:first-child) {
  margin-top: 0.55rem;
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

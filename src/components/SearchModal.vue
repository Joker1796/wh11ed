<template>
  <div
    class="search-overlay"
    :class="{ docked: !!dock }"
    :style="dockClip"
    @click.self="$emit('close')"
  >
    <div
      ref="boxEl"
      class="search-box"
      :style="dockStyle"
      role="dialog"
      aria-modal="true"
      :aria-label="labels.ariaSearchDialog"
      tabindex="-1"
    >
      <div class="search-input-wrap">
        <svg
          class="search-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle
            cx="11"
            cy="11"
            r="8"
          /><line
            x1="21"
            y1="21"
            x2="16.65"
            y2="16.65"
          />
        </svg>
        <!-- The empty box types out example queries (useTypingPlaceholder) instead of a static
             placeholder: a ghost layer under the input, since a native placeholder can't carry
             a blinking caret. Under prefers-reduced-motion the plain placeholder stays. -->
        <div class="typing-field search-field">
          <input
            v-model="query"
            type="text"
            :placeholder="typing ? '' : labels.searchPlaceholder"
            :aria-label="labels.searchPlaceholder"
            class="search-input"
            @keydown.escape="$emit('close')"
            @keydown.down.prevent="moveSelection(1)"
            @keydown.up.prevent="moveSelection(-1)"
            @keydown.enter.prevent="goToSelected"
          >
          <TypingGhost
            v-if="typing && !query"
            :text="ghostText"
          />
        </div>
        <button
          class="search-close"
          :aria-label="labels.ariaCloseSearch"
          @click="$emit('close')"
        >
          Esc
        </button>
      </div>

      <div
        v-if="hasQuery"
        class="search-results"
      >
        <div
          v-if="results.length === 0"
          class="search-empty"
        >
          {{ labels.searchNoResults }} "<strong>{{ query }}</strong>"
        </div>
        <TransitionGroup
          v-else
          tag="ul"
          name="res"
          class="results-list"
        >
          <li
            v-for="(item, i) in results"
            :key="item.key || item.id"
            class="result-item"
            :class="{ selected: i === selectedIndex }"
            @click="navigate(item)"
            @mouseenter="selectedIndex = i"
          >
            <div class="result-meta">
              <span
                v-if="item.sectionNum"
                class="result-num"
              >{{ item.sectionNum }}</span>
              <span class="result-section">{{ item.sectionTitle }}<template v-if="item.matchedBy">
                · <span
                  class="result-matched"
                  v-html="highlightMatch(item.matchedBy, query)"
                /></template></span>
            </div>
            <div class="result-title">
              <span v-html="highlightMatch(item.title, query)" />
              <span
                v-if="item.legends"
                class="legends-badge"
                :title="labels.dsLegendsNote"
              >{{ labels.dsLegends }}</span>
            </div>
            <div
              v-if="item.titleRu"
              class="result-title-ru"
              v-html="highlightMatch(item.titleRu, query)"
            />
            <div
              v-if="item.snippet"
              class="result-snippet"
              v-html="highlightMatch(item.snippet, query)"
            />
          </li>
        </TransitionGroup>
      </div>

      <div
        v-else-if="history.length"
        class="search-history"
      >
        <div class="sh-head">
          <span class="sh-title">{{ labels.searchRecent }}</span>
          <button
            class="btn-ghost sh-clear"
            @click="clearHistory"
          >
            {{ labels.searchClearHistory }}
          </button>
        </div>
        <ul class="results-list">
          <li
            v-for="(h, i) in history"
            :key="h"
            class="sh-row"
            :class="{ selected: i === selectedIndex }"
            @mouseenter="selectedIndex = i"
          >
            <button
              class="sh-pick"
              @click="pick(h)"
            >
              {{ h }}
            </button>
            <button
              class="sh-forget"
              :aria-label="labels.ariaForgetQuery"
              @click="forget(h)"
            >
              ×
            </button>
          </li>
        </ul>
      </div>

      <div
        v-else
        class="search-hint-text"
      >
        {{ labels.searchHint }}
      </div>
    </div>
  </div>
</template>

<script setup>
import TypingGhost from './TypingGhost.vue'
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { search, highlightMatch, preloadDatasheetIndex, preloadFactionRulesIndex, preloadCombatPatrolIndex, preloadFactionFaqIndex } from '../composables/useSearch.js'
import { useRefNavigation } from '../composables/useRefNavigation.js'
import { useLocale } from '../composables/useLocale.js'
import { useModalA11y } from '../composables/useModalA11y.js'
import { useFactionChoice } from '../composables/useFactionChoice.js'
import { useSearchHistory } from '../composables/useSearchHistory.js'
import { useTypingPlaceholder } from '../composables/useTypingPlaceholder.js'
import { useMediaQuery } from '../composables/useMediaQuery.js'
import { ui } from '../i18n/ui.js'

const props = defineProps({
  // Returns the navbar search button's rect (App.vue), or null where there is no navbar.
  anchor: { type: Function, default: null },
})
const emit = defineEmits(['close'])
const { navigateTo } = useRefNavigation()
const { locale } = useLocale()
const { setDetachment, setChapter } = useFactionChoice()
const { history, remember, forget, clearHistory } = useSearchHistory()
const labels = computed(() => ui[locale.value])
const boxEl = ref(null)
const query = ref('')
const selectedIndex = ref(0)

// Kick off the datasheet-name / faction-rules-name chunks as soon as the palette opens;
// `search()` reads a reactive tick, so results already on screen refresh when they land.
preloadDatasheetIndex()
preloadFactionRulesIndex()
preloadCombatPatrolIndex()
preloadFactionFaqIndex()

const results = computed(() => search(query.value, locale.value))
// The one gate for "is this a search yet": results below it, recent queries above it.
const hasQuery = computed(() => query.value.trim().length >= 2)

watch(query, () => { selectedIndex.value = 0 })

// Example queries typed into the empty box; paused while the user has something in it.
const { text: ghostText, animated: typing } = useTypingPlaceholder(
  computed(() => labels.value.searchExamples),
  computed(() => query.value === ''),
)

// Two shapes (owner, 2026-10-01). A wide screen DOCKS the field in the navbar: the search button
// stretches left into it, the results drop under it, the page is not dimmed — the desktop's
// dropdowns-not-modals rule. A phone keeps the full-screen sheet, and only fades it in. The
// enter/leave classes are App.vue's <Transition name="search">, styled below.
const wide = useMediaQuery('(min-width: 901px)')
const rect = ref(props.anchor?.() ?? null)
const remeasure = () => { rect.value = props.anchor?.() ?? null }
onMounted(() => window.addEventListener('resize', remeasure))
onUnmounted(() => window.removeEventListener('resize', remeasure))
const dock = computed(() => (wide.value && rect.value?.width ? rect.value : null))
const dockStyle = computed(() => {
  const r = dock.value
  if (!r) return null
  const right = window.innerWidth - r.right
  return { top: `${r.top}px`, right: `${right}px`, width: `${Math.min(600, r.right - 16)}px`, '--btn-h': `${r.height}px` }
})
// The unfold is clipped on the overlay (the transition's root — Vue times enter/leave by the
// root's own animation), in viewport px: the button, then the full-width row, then everything.
const dockClip = computed(() => {
  const r = dock.value
  if (!r) return null
  const right = window.innerWidth - r.right
  const below = `calc(100% - ${r.bottom}px)`
  return {
    '--clip-btn': `inset(${r.top}px ${right}px ${below} ${r.left}px)`,
    '--clip-row': `inset(${r.top}px ${right}px ${below} ${r.right - Math.min(600, r.right - 16)}px)`,
  }
})

// Focus-trap + restore-focus-to-trigger, with initial focus on the search input. (The
// command-palette shell stays bespoke — BaseModal's centered/bottom-sheet layout doesn't fit.)
useModalA11y(boxEl, () => emit('close'), { initialFocus: '.search-input' })

// Arrow keys walk whichever list is on screen — results while typing, recent queries before.
const activeList = computed(() => (hasQuery.value ? results.value : history.value))

function moveSelection(dir) {
  const len = activeList.value.length
  if (!len) return
  selectedIndex.value = (selectedIndex.value + dir + len) % len
}

function goToSelected() {
  const item = activeList.value[selectedIndex.value]
  if (!item) return
  if (hasQuery.value) navigate(item)
  else pick(item)
}

// Re-run a remembered query instead of navigating: ids move between data versions, the query
// doesn't — see useSearchHistory. Focus goes back to the input so it can be edited on the spot.
function pick(q) {
  query.value = q
  boxEl.value?.querySelector('.search-input')?.focus()
}

function navigate(item) {
  // Let go of the input BEFORE unmounting, so iOS starts dismissing the on-screen keyboard a beat
  // earlier: while it animates, Safari resizes the visual viewport and scrolls the page itself,
  // and scrollToAnchor is waiting that out (useRefNavigation's viewportSettled). Blurring first
  // shortens the wait — and on a browser with no keyboard it costs nothing.
  document.activeElement?.blur?.()
  // Only a query that led somewhere is worth remembering.
  remember(query.value)
  emit('close')
  // A faction-rules result (detachment/stratagem/enhancement) anchors to its detachment's
  // section — but FactionRuleView only renders the ACTIVE detachment (useFactionChoice), so it
  // must be selected before navigating or the target id won't exist in the DOM yet to scroll to.
  if (item.detSlug && item.detId) {
    setDetachment(item.detSlug, item.detId)
    if (item.detChapter) setChapter(item.detSlug, item.detChapter)
  }
  navigateTo({ route: item.route, anchor: item.id })
}
</script>

<style scoped>
.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(4, 3, 3, 0.55);
  z-index: 500;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10dvh;
}

.search-box {
  background: var(--bg-card);
  box-shadow: 0 20px 60px rgba(4, 3, 3, 0.45);
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  border: 1px solid var(--border);
}

/* Phone (and anywhere without a navbar to dock in): the sheet fades in unhurried, out quickly. */
.search-enter-active { transition: opacity var(--motion-slow) ease; }
.search-leave-active { transition: opacity var(--motion-fast) ease; }
.search-enter-from,
.search-leave-to { opacity: 0; }

/* Wide: the field sits exactly over the navbar's search button, one row its height, and the
   overlay only takes the click outside — no dimming. */
.search-overlay.docked {
  display: block;
  padding: 0;
  background: none;
}
.docked .search-box {
  position: fixed;
  max-width: none;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
}
.docked .search-input-wrap {
  height: var(--btn-h);
  padding: 0 0.6rem 0 0.85rem;
  gap: 0.6rem;
}
.docked .search-results,
.docked .search-history {
  max-height: min(420px, calc(100dvh - var(--btn-h) - 5rem));
}
/* It unfolds out of the button: the field first stretches left to its full width, then drops
   open down to the results — and folds back the same way. A clip, so nothing inside reflows as it
   grows; no fade, the overlay draws nothing of its own. */
.search-enter-active.docked,
.search-leave-active.docked { transition: none; opacity: 1; }
.search-enter-active.docked { animation: search-unfold var(--motion-move) ease-out both; }
.search-leave-active.docked { animation: search-unfold var(--motion-med) ease-in reverse both; }
@keyframes search-unfold {
  0% { clip-path: var(--clip-btn); }
  55% { clip-path: var(--clip-row); }
  100% { clip-path: inset(0); }
}

.search-input-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.1rem;
  border-bottom: 1px solid var(--border);
}

.search-icon {
  color: var(--text-muted);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  font-family: var(--font-sans);
  color: var(--text-primary);
  background: transparent;
}

.search-input::placeholder {
  color: var(--text-dim);
}

.search-field {
  flex: 1;
  --typing-size: 1rem;
}

.search-close {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  padding: 0.15rem 0.45rem;
  font-size: 0.72rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
  cursor: pointer;
  flex-shrink: 0;
}

.search-results {
  max-height: 420px;
  overflow-y: auto;
  /* Don't chain the result-list scroll to the page behind (iOS rubber-band) */
  overscroll-behavior: contain;
}

.search-empty {
  padding: 1.5rem 1.25rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.results-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Dense on purpose (2026-10-04, owner: "catastrophically much vertical space"): a result is
   three short lines — where, what, why it matched — and the padding and gaps around them used
   to take as much height as the lines did. ~6 results filled a phone; now ~9 do. */
.result-item {
  padding: 0.45rem 1.25rem;
  cursor: pointer;
  border-bottom: 1px solid var(--border-light);
  transition: background 0.1s;
}

.result-item:last-child {
  border-bottom: none;
}

/* Staggered fade-in as results appear (enter only; leave is instant so rapid typing
   doesn't pile up overlapping rows). Duration derives from the motion token, so
   reduced-motion shows them at once. Delay lives under .res-enter-active, keeping the
   .result-item hover transition untouched. */
.res-enter-active {
  transition: opacity var(--motion-med) ease, transform var(--motion-med) ease;
}
.res-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.res-enter-active:nth-child(1) { transition-delay: 0ms; }
.res-enter-active:nth-child(2) { transition-delay: 25ms; }
.res-enter-active:nth-child(3) { transition-delay: 50ms; }
.res-enter-active:nth-child(4) { transition-delay: 75ms; }
.res-enter-active:nth-child(5) { transition-delay: 100ms; }
.res-enter-active:nth-child(6) { transition-delay: 125ms; }
.res-enter-active:nth-child(7) { transition-delay: 150ms; }
.res-enter-active:nth-child(n+8) { transition-delay: 175ms; }

.result-item.selected,
.result-item:hover,
.sh-row.selected {
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}

.result-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1.3;
}

.result-num {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--accent-ink);
  font-weight: 600;
}

.result-section {
  font-size: 0.72rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Why a unit or faction is here (a nickname, an ability, the retired unit it stands in for) —
   the tail of the location line, in its flow, not a row of its own: a long one ("Legendary
   Proxies: Ufthak Blackhawk") wraps word by word like the rest of the line instead of being cut,
   since its end is the point. */
.result-matched {
  font-size: 0.76rem;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
  color: var(--text-muted);
}

.result-title {
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.3;
  color: var(--text-primary);
}

.result-title-ru {
  font-size: 0.78rem;
  font-weight: 500;
  line-height: 1.3;
  color: var(--text-muted);
}

.result-snippet {
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-history {
  max-height: 420px;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.sh-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.6rem 1.25rem 0.4rem;
}

.sh-title {
  font-size: 0.72rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sh-clear {
  font-size: 0.72rem;
  padding: 0.15rem 0.45rem;
}

.sh-row {
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid var(--border-light);
}

.sh-row:last-child {
  border-bottom: none;
}

.sh-pick {
  flex: 1;
  min-width: 0;
  text-align: left;
  background: none;
  border: none;
  padding: 0.7rem 1.25rem;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--text-primary);
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sh-forget {
  background: none;
  border: none;
  padding: 0 1rem;
  font-size: 1.1rem;
  line-height: 1;
  color: var(--text-dim);
  cursor: pointer;
}

.sh-forget:hover {
  color: var(--text-muted);
}

.search-hint-text {
  padding: 1.25rem;
  color: var(--text-dim);
  font-size: 0.85rem;
  text-align: center;
}

:deep(mark) {
  background: color-mix(in srgb, var(--accent) 18%, transparent);
  color: var(--accent-ink);
  border-radius: 2px;
  padding: 0 1px;
}

@media (max-width: 600px) {
  .search-overlay {
    align-items: flex-start;
    padding-top: 0;
  }

  .search-box {
    height: 100dvh;
    max-width: none;
    display: flex;
    flex-direction: column;
    /* Full-screen sheet: keep the input row below the iOS status bar and the
       last result above the home indicator. */
    padding-top: var(--safe-top);
    padding-bottom: var(--safe-bottom);
  }

  .search-input {
    font-size: 1rem;
  }

  .search-close {
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    padding: 0 0.6rem;
  }

  .search-results {
    flex: 1;
    max-height: none;
    overflow-y: auto;
  }

  /* Still a 44px+ target: the three lines alone are ~55px. */
  .result-item {
    padding: 0.5rem 1.25rem;
  }

  /* Let snippets wrap to two lines instead of a single ellipsised line. */
  .result-snippet {
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .search-history {
    flex: 1;
    max-height: none;
  }

  /* Thumb-sized rows, same 44px floor as the close button. */
  .sh-pick {
    padding: 1rem 1.25rem;
  }

  .sh-forget {
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-hint-text {
    flex: 1;
    padding: 2rem 1.25rem;
  }
}
</style>

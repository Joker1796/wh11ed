<template>
  <nav
    class="game-tabs"
    :class="{ pinned }"
    :data-tour="pinned ? 'game-tabs' : null"
    :style="{ '--gt-n': tabs.length }"
    role="tablist"
    :aria-label="labels.trackerTabsAria"
    :inert="!pinned"
  >
    <button
      v-for="t in tabs"
      :key="t.id"
      role="tab"
      class="gt-tab"
      :class="{ on: active === t.id }"
      :aria-selected="active === t.id"
      :aria-label="t.label"
      :title="active === t.id || wide ? undefined : t.label"
      @click="$emit('select', t.id)"
    >
      <span
        class="gt-fill"
        aria-hidden="true"
      />
      <i
        :class="t.icon"
        aria-hidden="true"
      />
      <Transition name="gt-word">
        <span
          v-if="active === t.id || wide"
          class="gt-word"
        >{{ wide ? t.label : t.short || t.label }}</span>
      </Transition>
      <span
        v-if="t.count"
        class="gt-count"
      >{{ t.count }}</span>
    </button>
  </nav>
</template>

<script setup>
// The game screen's working-area tabs (RoundTracker): one strip, the open tab filled and saying its
// word. `pinned` is the game's own strip — sticky under the bar, the tour's target; unpinned it is
// an example in a help (help/TabbedDemo.vue): drawn the same, inert, so it cannot be switched.
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

defineProps({
  tabs: { type: Array, required: true },       // [{ id, label, short?, icon, count? }] — `short` on a phone
  active: { type: String, default: '' },
  wide: { type: Boolean, default: false },     // every tab says its word (a wide screen)
  pinned: { type: Boolean, default: true },
})
defineEmits(['select'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
/* The working area's tabs: one strip, joined, on a line in the accent — the active tab is filled
   with it and so reads as part of the line it stands on, attached to the panel under it. */
.game-tabs {
  /* A closed (icon) tab shares out what the open one does not need (owner, 2026-10-15: with three
     tabs the open one was half empty): never narrower than --gt-closed, which is what the full set
     needs, nor wider than --gt-cap. --gt-open is the room kept for the open tab's icon and word —
     the longest, «Статистика», is ~120px; measured at 320–900px with 2–6 tabs, EN and RU. */
  --gt-closed: 48px;
  --gt-cap: 64px;
  --gt-open: 9rem;
  --gt-w: clamp(var(--gt-closed), calc((100cqw - var(--gt-open)) / max(var(--gt-n, 2) - 1, 1)), var(--gt-cap));
  container-type: inline-size;
  --gt-ease: cubic-bezier(0.65, 0, 0.35, 1);
  display: flex;
  /* Above: the same step as between the two score cards (ScoreBoard's .board gap), so the cards
     and the strip read as one block (owner, 2026-10-06). Below: what .panel-framed takes back. */
  margin: 0.75rem 0 0.7rem;
  border-bottom: 2px solid var(--accent);
  /* Pinned under the site's bar while a long panel (the roster) scrolls (owner, 2026-10-06). The
     page's own background behind it, so the panel does not show between the tabs. */
  background: var(--bg-primary);
}
.game-tabs.pinned {
  position: sticky;
  top: calc(var(--navbar-height) + var(--safe-top));
  z-index: 20;
}
/* Phones: the cards' gap is a step smaller there (ScoreBoard), and so is this one. */
@media (max-width: 560px) {
  .game-tabs { margin-top: 0.4rem; }
}
/* Wide screens also pin the subnav (AppSubnav) under the bar. */
@media (min-width: 901px) {
  .game-tabs.pinned { top: calc(var(--navbar-height) + var(--safe-top) + var(--subnav-height)); }
}
/* The open tab grows into what the closed ones leave: flex-grow, not grid columns (1fr to 48px does
   not animate), and the two grows always sum to one, so the strip re-divides without a wobble. */
.gt-tab {
  position: relative;
  overflow: hidden;
  display: inline-flex; align-items: center; justify-content: center; gap: 0.45rem;
  flex: 0 0 var(--gt-w);
  min-width: 0;
  min-height: 40px;
  padding: 0.2rem 0.4rem;
  margin-left: -1px;
  border: 1px solid var(--border);
  border-bottom: 0;
  background: var(--bg-card);
  color: var(--text-muted);
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition:
    flex-grow var(--motion-tab) var(--gt-ease),
    color var(--motion-tab) ease,
    border-color var(--motion-tab) ease;
}
.gt-tab:first-child { margin-left: 0; }
.gt-tab.on { flex-grow: 1; z-index: 1; border-color: var(--accent); color: #fff; }
/* The accent is a layer, so only its transform moves: the old one drains down at once, the new one
   fills from the bottom a quarter later — "drained, then filled". */
.gt-fill {
  position: absolute; inset: 0;
  background: var(--accent);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform calc(var(--motion-tab) * 0.75) var(--gt-ease);
}
.gt-tab.on .gt-fill {
  transform: scaleY(1);
  transition-delay: calc(var(--motion-tab) * 0.25);
}
.gt-tab > .wi, .gt-tab > .gt-word { position: relative; } /* over the fill */
.gt-tab .wi { font-size: 1.1rem; }
.gt-word { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
/* The new word rises into the filled tab; the old one goes at once. */
.gt-word-enter-active {
  transition:
    transform calc(var(--motion-tab) * 0.8) cubic-bezier(0.2, 0.8, 0.2, 1) calc(var(--motion-tab) * 0.35),
    opacity calc(var(--motion-tab) * 0.8) cubic-bezier(0.2, 0.8, 0.2, 1) calc(var(--motion-tab) * 0.35);
}
.gt-word-enter-from { opacity: 0; transform: translateY(22px); }
/* Seven tabs on a phone: narrower icons, or the open tab's word is cut to its first letters
   ("МИСС…" at 390px); on a 320px one the open tab also says only its word, a size down. */
@media (max-width: 480px) { .game-tabs { --gt-closed: 40px; } }
@media (max-width: 360px) {
  .game-tabs { --gt-closed: 34px; }
  .gt-tab.on > .wi { display: none; }
  .gt-tab.on { font-size: 1rem; }
}
/* Hover: the tab's own edge in the accent — lifted over its neighbours, which overlap it by a pixel
   (margin-left: -1px), or they cut its frame. */
/* A wide screen (>900px, the desktop threshold of the dropdowns) has room for every word
   (owner, 2026-10-02): the tabs are equal and all say what they are; the open one is the filled
   one. Nothing grows, so of the switch only the fill and the panel's slide are left. */
@media (min-width: 901px) {
  /* Equal — but never narrower than the tab's own word: equal shares cut «Статистика» to
     «СТАТИСТИ…» (82px of word in a 76px slot, 2026-10-09); now it takes 122px, the rest 113. */
  .gt-tab { flex: 1 1 0; min-width: max-content; }
}
@media (hover: hover) { .gt-tab:not(.on):hover { z-index: 1; border-color: var(--accent); color: var(--text-primary); } }
/* The phase tab's count, in its corner. */
.gt-count {
  position: absolute; top: 2px; right: 2px;
  min-width: 1.05rem; padding: 0 0.2rem;
  background: var(--accent); color: #fff;
  font-family: var(--font-mono); font-size: 0.62rem; line-height: 1.35; letter-spacing: 0;
}
.gt-tab.on .gt-count { background: #fff; color: var(--accent); }
/* An example (a help's demo): shown, not used — and not inside the page's flow above a panel. */
.game-tabs:not(.pinned) { margin: 0; }
.game-tabs:not(.pinned) .gt-tab { cursor: default; }
</style>

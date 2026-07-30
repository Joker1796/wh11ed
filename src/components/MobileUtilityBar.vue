<template>
  <!-- Mobile-only (≤900px, see App.vue's usage/media query) fixed strip floating just above
       .bottom-nav. Additive, not exclusive: "back to game" (when a game's in progress), the
       faction hero's tab-jump buttons (ported from the desktop FAB column in FactionLayout.vue),
       and back-to-top (only once actually scrolled down) all show together, same small
       icon-button design — never a full-width bar eating reading space. -->
  <Transition name="slide-up">
    <div v-if="visible" class="mobile-bar">
      <TransitionGroup name="fab" tag="div" class="mb-actions">
        <RouterLink
          v-if="showResumeGame"
          key="resume"
          to="/tracker/game"
          class="mb-icon mb-text"
          :title="labels.resumeGameBar"
          :aria-label="labels.resumeGameBar"
        >{{ labels.resumeGameShort }}</RouterLink>

        <RouterLink
          v-for="a in factionActions"
          :key="a.key"
          :to="a.to"
          class="mb-icon"
          :title="a.label"
          :aria-label="a.label"
        ><i :class="a.icon"></i></RouterLink>
      </TransitionGroup>

      <!-- Rightmost slot, always: back-to-top, only once actually scrolled down. -->
      <button
        v-if="scrolledDown"
        type="button"
        class="mb-icon mb-totop"
        :title="labels.backToTop"
        :aria-label="labels.backToTop"
        @click="scrollToTop"
      ><i class="bi bi-arrow-up"></i></button>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'
import { useMobileActionBar } from '../composables/useMobileActionBar.js'
import { useBackToTop } from '../composables/useBackToTop.js'

const props = defineProps({ showResumeGame: { type: Boolean, default: false } })

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const { contributions } = useMobileActionBar()
const factionActions = computed(() => contributions['faction-tabs'] || [])
const { visible: scrolledDown, scrollToTop } = useBackToTop()

const visible = computed(() => props.showResumeGame || factionActions.value.length > 0 || scrolledDown.value)

// App.vue reads this (via template ref) to size --mobile-bar-h without duplicating this logic.
defineExpose({ visible })
</script>

<style scoped>
/* Fixed strip, full width, floating just above .bottom-nav (52px + safe-bottom) — same tier
   as the old .resume-bar/.faction-fabs/.back-to-top (z-index 195, below the drawer
   overlay/modals). */
.mobile-bar {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  /* Small gap above .bottom-nav — none of these are a flush full-width bar (the icon buttons
     float with their own margins either side), so a seam right against the nav read as a
     mistake rather than one continuous bar. */
  bottom: calc(52px + var(--safe-bottom, 0px) + 0.5rem);
  z-index: 195;
  height: 3rem;
  padding: 0 calc(1rem + var(--safe-right)) 0 calc(1rem + var(--safe-left));
}

@media (min-width: 901px) {
  .mobile-bar { display: none; }
}

/* Small floating icon buttons, right-aligned, no bar background — reads as the same
   floating-FAB language as the desktop column, not a chrome strip. margin-left: auto pushes
   the (possibly empty) group all the way right even when it's just the back-to-top button. */
.mb-actions {
  display: flex;
  gap: 0.6rem;
  margin-left: auto;
}

.mb-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  flex-shrink: 0;
  border: none;
  border-radius: 8px;
  /* Light theme: a light chip (--bg-card) with a dark border/icon (--bg-insert, the
     bottom-nav's own always-dark tone — used here as an outline instead of a fill). Dark
     theme: back to plain --bg-primary + the app accent, as before. --mb-icon-bg/--mb-icon-tint
     flip below, mirroring the app's 3-step theme resolution (FactionLayout.vue has the same
     pattern): prefers-color-scheme is the default signal, an explicit :root[data-theme] wins
     in both directions (see the unscoped block below). The chip itself is slightly translucent
     (color-mix against transparent) so it reads as floating over the page rather than an opaque
     chrome tile — same translucency convention as the rest of the app's accent chips.
     */
  --mb-icon-bg: var(--bg-card);
  --mb-icon-tint: var(--bg-insert);
  background: color-mix(in srgb, var(--mb-icon-bg) 82%, transparent);
  color: var(--mb-icon-tint);
  font-size: 0.95rem;
  cursor: pointer;
  text-decoration: none;
  box-shadow: inset 0 0 0 1.5px var(--mb-icon-tint), 0 2px 8px rgba(0, 0, 0, 0.15);
}

@media (prefers-color-scheme: dark) {
  .mb-icon { --mb-icon-bg: var(--bg-primary); --mb-icon-tint: var(--accent); }
}

/* Separates the back-to-top button from whatever precedes it (the resume/tab-jump group)
   already has its own margin-left: auto pushing it left of it. */
.mb-totop {
  margin-left: 0.6rem;
}

/* The resume button is text ("To game"/«К партии»), not an icon — same height/shape/colours
   as the icon buttons, just auto-width with horizontal padding instead of a fixed square. */
.mb-text {
  width: auto;
  padding: 0 0.65rem;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
}
</style>

<!-- Unscoped on purpose: an explicit data-theme on :root must win over the
     prefers-color-scheme fallback above in BOTH directions (same reasoning/pattern as
     FactionLayout.vue's equivalent block). -->
<style>
:root[data-theme='light'] .mb-icon { --mb-icon-bg: var(--bg-card); --mb-icon-tint: var(--bg-insert); }
:root[data-theme='dark'] .mb-icon { --mb-icon-bg: var(--bg-primary); --mb-icon-tint: var(--accent); }
</style>

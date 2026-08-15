<template>
  <div v-if="visible" class="domain-banner" role="status">
    <i class="bi bi-signpost-2 db-icon"></i>
    <button class="db-close" @click="dismiss" :aria-label="labels.updateDismiss">
      <i class="bi bi-x"></i>
    </button>
    <template v-if="mode === 'pre'">
      <p class="db-title">
        {{ labels.domainMovePreTitle }}
        <span class="db-host">{{ newHost }}</span>
      </p>
      <p class="db-note">
        {{ labels.domainMovePreNote1 }}
        <RouterLink to="/tracker" class="db-link">{{ labels.domainMovePreCta }}</RouterLink>
      </p>
      <p class="db-note">{{ labels.domainMovePreNote2 }}</p>
    </template>
    <template v-else>
      <p class="db-title">
        {{ labels.domainMoveTitle }}
        <a :href="MOVED_TO_ORIGIN" class="db-link">{{ newHost }}</a>
      </p>
      <p class="db-note">{{ labels.domainMoveNote }}</p>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'
import { MOVED_TO_ORIGIN, ANNOUNCE_MOVE } from '../config.js'
import { getItem, setItem } from '../composables/safeStorage.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const newHost = MOVED_TO_ORIGIN.replace(/^https?:\/\//, '')

// Gate on the actual hostname (not a separate build): the same bundle can ship anywhere, and
// this only shows on the retired domain. ANNOUNCE_MOVE picks the phase (see config.js):
// 'pre' = Phase 2 heads-up (login on the new domain doesn't work yet, so the new host is shown
// as plain text and the CTA points at the tracker login HERE — syncing is what makes games
// survive the move), 'moved' = the post-301 "we've moved" variant linking to the new domain.
const mode = ANNOUNCE_MOVE
// DEV lets the banner preview on localhost (`VITE_ANNOUNCE_MOVE=pre npm run dev`); a production
// build still requires the retired hostname.
const onOldDomain =
  typeof window !== 'undefined' &&
  (import.meta.env.DEV || /(^|\.)wh11ed\.ru$/.test(window.location.hostname))
// Per-phase dismissal: hiding the Phase 2 heads-up must not hide the eventual "we've moved".
const dismissKey = mode === 'pre' ? 'wh11ed-domain-move-dismissed-pre' : 'wh11ed-domain-move-dismissed'
const dismissed = ref(getItem(dismissKey) === 'true')
const visible = computed(() => !!mode && onOldDomain && !dismissed.value)

function dismiss() {
  dismissed.value = true
  setItem(dismissKey, 'true')
}
</script>

<style scoped>
/* Icon/close float so the text lines wrap around them instead of each reserving
   a full-height column (which left an awkward gap next to the short icon glyph). */
.domain-banner {
  /* Sits before the sticky navbar, which pads itself by --safe-top to clear the iOS
     status bar/notch (viewport-fit=cover). Do the same here, or on an installed PWA this
     content renders under the status bar icons instead of below them. */
  padding: calc(0.6rem + var(--safe-top)) 1rem 0.6rem;
  background: color-mix(in srgb, var(--accent) 12%, var(--bg-insert));
  border-bottom: 1px solid var(--accent);
  color: var(--text-on-dark);
  font-size: 0.82rem;
  line-height: 1.4;
  overflow: hidden; /* clearfix: enclose the floats */
}

.db-icon {
  float: left;
  margin: 0.15rem 0.6rem 0.2rem 0;
  color: var(--accent);
  font-size: 1rem;
}

.db-close {
  float: right;
  margin: 0 0 0.2rem 0.6rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.1rem;
}

.db-close:hover {
  color: var(--text-on-dark);
}

.db-title {
  margin: 0;
  font-weight: 600;
}

.db-host {
  color: var(--accent);
  font-weight: 700;
}

.db-link {
  color: var(--accent);
  text-decoration: underline;
}

.db-note {
  margin: 0.15rem 0 0;
  color: rgba(255, 255, 255, 0.7);
}
</style>

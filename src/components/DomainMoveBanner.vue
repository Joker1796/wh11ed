<template>
  <div v-if="visible" class="domain-banner" role="status">
    <i class="bi bi-signpost-2 db-icon"></i>
    <button class="db-close" @click="dismiss" :aria-label="labels.updateDismiss">
      <i class="bi bi-x"></i>
    </button>
    <p class="db-title">
      {{ labels.domainMoveTitle }}
      <a :href="MOVED_TO_ORIGIN" class="db-link">{{ newHost }}</a>
    </p>
    <p class="db-note">{{ labels.domainMoveNote }}</p>
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
// this only shows on the retired domain. Also requires VITE_ANNOUNCE_MOVE — while the backend
// still lives on the old domain, pointing people at the new one (where login doesn't work yet)
// would be misleading, so the announcement stays off until that flips.
const onOldDomain = typeof window !== 'undefined' && /(^|\.)wh11ed\.ru$/.test(window.location.hostname)
const dismissed = ref(getItem('wh11ed-domain-move-dismissed') === 'true')
const visible = computed(() => ANNOUNCE_MOVE && onOldDomain && !dismissed.value)

function dismiss() {
  dismissed.value = true
  setItem('wh11ed-domain-move-dismissed', 'true')
}
</script>

<style scoped>
/* Icon/close float so the two text lines wrap around them instead of each reserving
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

.db-link {
  color: var(--accent);
  text-decoration: underline;
}

.db-note {
  margin: 0.15rem 0 0;
  color: rgba(255, 255, 255, 0.7);
}
</style>

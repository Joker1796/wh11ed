<template>
  <div v-if="visible" class="domain-banner" role="status">
    <i class="bi bi-signpost-2 db-icon"></i>
    <button class="db-close" @click="dismiss" :aria-label="labels.updateDismiss">
      <i class="bi bi-x"></i>
    </button>
    <p class="db-title">
      {{ labels.domainMoveTitle }}
      <a :href="SITE_ORIGIN" class="db-link">{{ newHost }}</a>
    </p>
    <p class="db-note">{{ labels.domainMoveNote }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'
import { SITE_ORIGIN } from '../config.js'
import { getItem, setItem } from '../composables/safeStorage.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const newHost = SITE_ORIGIN.replace(/^https?:\/\//, '')

// The same build is deployed to both the retired and the new domain (a single backend
// can only be configured for one at a time), so this only makes sense on the old one —
// gate at runtime on the actual hostname rather than needing a separate build.
const onOldDomain = typeof window !== 'undefined' && /(^|\.)wh11ed\.ru$/.test(window.location.hostname)
const dismissed = ref(getItem('wh11ed-domain-move-dismissed') === 'true')
const visible = computed(() => onOldDomain && !dismissed.value)

function dismiss() {
  dismissed.value = true
  setItem('wh11ed-domain-move-dismissed', 'true')
}
</script>

<style scoped>
/* Icon/close float so the two text lines wrap around them instead of each reserving
   a full-height column (which left an awkward gap next to the short icon glyph). */
.domain-banner {
  padding: 0.6rem 1rem;
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

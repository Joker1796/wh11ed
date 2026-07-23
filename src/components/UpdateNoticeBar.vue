<template>
  <!-- Top-of-screen notice that a new version shipped; links to the /changelog page. Mirrors
       DomainMoveBanner's placement (first child of .app-layout) and look. -->
  <div v-if="visible" class="update-banner" role="status">
    <i class="bi bi-stars ub-icon"></i>
    <button class="ub-close" @click="markSeen" :aria-label="labels.updateDismiss">
      <i class="bi bi-x"></i>
    </button>
    <p class="ub-text">
      {{ labels.updateNoticeTitle }} <strong class="ub-ver">v{{ entry.version }}</strong>
      <RouterLink to="/changelog" class="ub-link" @click="markSeen">{{ labels.updateNoticeAction }} →</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { useUpdateNotice } from '../composables/useUpdateNotice.js'
import { ui } from '../i18n/ui.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const { entry, visible, markSeen } = useUpdateNotice()
</script>

<style scoped>
/* Same tinted-accent bar as DomainMoveBanner; icon/close float so the text wraps around them. */
.update-banner {
  padding: 0.6rem 1rem;
  background: color-mix(in srgb, var(--accent) 12%, var(--bg-insert));
  border-bottom: 1px solid var(--accent);
  color: var(--text-on-dark);
  font-size: 0.82rem;
  line-height: 1.4;
  overflow: hidden; /* clearfix: enclose the floats */
}

.ub-icon {
  float: left;
  margin: 0.15rem 0.6rem 0.2rem 0;
  color: var(--accent);
  font-size: 1rem;
}

.ub-close {
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

.ub-close:hover {
  color: var(--text-on-dark);
}

.ub-text {
  margin: 0;
  font-weight: 600;
}

.ub-ver {
  font-family: var(--font-mono);
  font-weight: 700;
}

.ub-link {
  margin-left: 0.5rem;
  color: var(--accent);
  text-decoration: underline;
  white-space: nowrap;
}
</style>

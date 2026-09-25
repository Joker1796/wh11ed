<template>
  <!-- Top-of-screen notice that a new version shipped; links to the /changelog page. -->
  <TopBanner
    v-if="visible"
    icon="bi-stars"
    :close-label="labels.updateDismiss"
    @close="markSeen"
  >
    <p class="ub-text">
      {{ labels.updateNoticeTitle }} <strong class="ub-ver">v{{ entry.version }}</strong>
      <RouterLink
        to="/changelog"
        class="ub-link"
        @click="markSeen"
      >
        {{ labels.updateNoticeAction + ' →' }}
      </RouterLink>
    </p>
  </TopBanner>
</template>

<script setup>
import { computed } from 'vue'
import TopBanner from './TopBanner.vue'
import { useLocale } from '../composables/useLocale.js'
import { useUpdateNotice } from '../composables/useUpdateNotice.js'
import { ui } from '../i18n/ui.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const { entry, visible, markSeen } = useUpdateNotice()
</script>

<style scoped>
/* The bar itself is TopBanner.vue. */
.ub-text {
  margin: 0;
  font-weight: 600;
}

@media (min-width: 900px) {
  .ub-text {
    text-align: center;
  }
}

.ub-ver {
  font-family: var(--font-mono);
  font-weight: 700;
  /* The global `strong` rule tints bold text towards --text-primary, which is dark in the
     light theme — invisible on this always-dark bar. Same fix as .note-box strong. */
  color: var(--text-on-dark);
}

.ub-link {
  margin-left: 0.5rem;
  color: var(--accent);
  text-decoration: underline;
  white-space: nowrap;
}
</style>

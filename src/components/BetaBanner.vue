<template>
  <TopBanner
    :show="!closed"
    icon="wi-cone"
    :close-label="labels.updateDismiss"
    @close="close"
  >
    <p class="bb-text">
      {{ labels.betaBannerTitle }}
      <a
        :href="siteHref"
        class="bb-link"
      >{{ labels.betaBannerSite }}</a>
    </p>
    <p class="bb-note">
      {{ labels.betaBannerNote }}
    </p>
  </TopBanner>
</template>

<script setup>
// The test site (beta.wh-rules.ru, IS_BETA): since 2.10.0 every release goes here first and the
// owner checks it before the main site gets it (owner, 2026-10-19); it was the new tracker's beta
// before that. Says where the reader is, that the lists and games here are this site's own, and
// leads back to the main site on the same page. Closed once, it stays closed on this phone — under
// a new key, because the old one was closed on what the site used to be.
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import TopBanner from './TopBanner.vue'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'
import { siteOfGen } from '../core/game/trackerGen.js'
import { getItem, setItem } from '../composables/safeStorage.js'

const route = useRoute()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const siteHref = computed(() => siteOfGen(1) + (route?.fullPath || '/'))

const KEY = 'wh11ed-beta-banner-closed-2'
const closed = ref(getItem(KEY) === 'true')
function close() {
  closed.value = true
  setItem(KEY, 'true')
}
</script>

<style scoped>
/* The bar itself is TopBanner.vue. */
.bb-text { margin: 0; font-weight: 600; }
.bb-link { margin-left: 0.4rem; color: var(--accent-ink); text-decoration: underline; white-space: nowrap; }
.bb-note { margin: 0.15rem 0 0; color: rgba(255, 255, 255, 0.7); }
</style>

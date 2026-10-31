<template>
  <section class="camp-block">
    <!-- Open while the players are still coming in, folded once they are (two or more). -->
    <CampFold
      :label="labels.campLinks"
      :start-open="state.players.length < 2"
    >
      <div
        v-for="l in rows"
        :key="l.key"
        class="camp-link"
      >
        <span class="camp-dim">{{ l.label }}</span>
        <div class="copy-row">
          <input
            type="text"
            class="copy-field"
            readonly
            :value="l.url"
            @focus="$event.target.select()"
          >
          <button
            class="btn-ghost copy-btn"
            @click="copy(l)"
          >
            {{ copied === l.key ? labels.trackerBroadcastCopied : labels.trackerBroadcastCopy }}
          </button>
        </div>
      </div>
    </CampFold>
  </section>
</template>

<script setup>
// The two links of a campaign: the invite (the Warmaster's to hand out — a player who opens it
// joins and may enter their own battles) and the view link (anyone, read only).
import { ref, computed } from 'vue'
import CampFold from './CampFold.vue'
import { useCampaigns } from '../../../composables/useCampaigns.js'
import { useLocale } from '../../../composables/useLocale.js'
import { useCampaignView } from './useCampaignView.js'

const { entry, state, labels } = useCampaignView()
const { linksOf } = useCampaigns()
const { locale } = useLocale()
const copied = ref('')

const rows = computed(() => {
  const links = linksOf(entry.value, window.location.origin, locale.value === 'ru' ? '/ru' : '')
  return [
    links.join && { key: 'join', label: labels.value.campInviteLink, url: links.join },
    links.view && { key: 'view', label: labels.value.campViewLink, url: links.view },
  ].filter(Boolean)
})
async function copy(l) {
  try {
    await navigator.clipboard.writeText(l.url)
    copied.value = l.key
    setTimeout(() => (copied.value = ''), 1500)
  } catch {
    // the field is selectable by hand
  }
}
</script>

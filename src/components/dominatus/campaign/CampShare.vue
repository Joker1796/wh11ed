<template>
  <!-- The links wait behind a button, in a dialog (owner, 2026-11-01): needed to bring players in,
       not on every visit. -->
  <div class="camp-share">
    <button
      type="button"
      class="btn-ghost"
      aria-haspopup="dialog"
      @click="open = true"
    >
      {{ isOwner ? labels.campInvite : labels.campLinks }}
    </button>
    <BaseModal
      v-if="open"
      :title="isOwner ? labels.campInvite : labels.campLinks"
      max-width="560px"
      @close="open = false"
    >
      <div class="modal-body camp-share-body">
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
              type="button"
              class="btn-ghost copy-btn"
              @click="copy(l)"
            >
              {{ copied === l.key ? labels.trackerBroadcastCopied : labels.trackerBroadcastCopy }}
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
// The two links of a campaign: the invite (the Warmaster's to hand out — a player who opens it
// joins and may enter their own battles) and the view link (anyone, read only).
import { ref, computed } from 'vue'
import BaseModal from '../../BaseModal.vue'
import { useCampaigns } from '../../../composables/useCampaigns.js'
import { useLocale } from '../../../composables/useLocale.js'
import { useCampaignView } from './useCampaignView.js'

const { entry, isOwner, labels } = useCampaignView()
const { linksOf } = useCampaigns()
const { locale } = useLocale()
const copied = ref('')
const open = ref(false)

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

<style scoped>
.camp-share-body { padding: 0.9rem 1rem 1.1rem; }
</style>

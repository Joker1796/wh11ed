<template>
  <!-- The list's rules as a sheet over the builder, opened from the book beside the catalogue's
       search. They used to be a folded bar over both panes — a row of every phone's screen spent
       on something opened now and then (2026-09-24, the builder's height pass). The contents are
       RosterRulesPanel's, unchanged, and load on this first open as they did on the fold's. -->
  <BaseModal
    :title="labels.rosterFactionRules"
    max-width="720px"
    @close="$emit('close')"
  >
    <div class="modal-body rrm-body">
      <p
        v-if="detachments.length"
        class="rrm-dets"
      >
        {{ detachments.join(' · ') }}
      </p>
      <RosterRulesPanel
        :faction-slug="factionSlug"
        :detachments="detachments"
        bare
      />
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import RosterRulesPanel from './RosterRulesPanel.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

defineProps({
  factionSlug: { type: String, required: true },
  detachments: { type: Array, default: () => [] },
})
defineEmits(['close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.rrm-body { padding: 0.5rem 0.75rem 0.75rem; }
.rrm-dets {
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  color: var(--text-muted);
}
</style>

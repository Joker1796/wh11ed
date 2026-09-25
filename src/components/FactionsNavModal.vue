<template>
  <BaseModal
    :title="labels.navFactions"
    @close="$emit('close')"
  >
    <div class="modal-body modal-list">
      <template v-if="pinned.length">
        <h4 class="fp-group">
          {{ labels.favPinnedGroup }}
        </h4>
        <FactionOption
          v-for="f in pinned"
          :key="'pin-' + f.slug"
          :slug="f.slug"
          :name="f.name"
          :to="`/factions/${f.slug}`"
          @pick="$emit('close')"
        />
      </template>
      <template
        v-for="g in factionGroups"
        :key="g.id"
      >
        <h4 class="fp-group">
          {{ labels[factionGroupLabelKey(g.id)] }}
        </h4>
        <FactionOption
          v-for="f in g.factions"
          :key="f.slug"
          :slug="f.slug"
          :name="f.name"
          :to="`/factions/${f.slug}`"
          :disabled="!f.ready"
          @pick="$emit('close')"
        />
      </template>
    </div>
  </BaseModal>
</template>

<script setup>
// Lightweight navigation-only faction list for the mobile bottom nav. Uses the light
// factionsIndex.js (NOT the heavy tracker dataset) and the same grouped layout as
// FactionsListView; picking a faction navigates to its page and closes the modal. A star
// pins a faction to the "Pinned" group at the top (useFavorites) — the long list otherwise
// buries e.g. Necrons at the very bottom.
import { computed } from 'vue'
import BaseModal from './BaseModal.vue'
import FactionOption from './FactionOption.vue'
import { factionGroups, factionGroupLabelKey } from '../data/factionsIndex.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useFavorites } from '../composables/useFavorites.js'

defineEmits(['close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const { pinnedFactionsFrom } = useFavorites()
const pinned = computed(() => pinnedFactionsFrom(factionGroups))

</script>

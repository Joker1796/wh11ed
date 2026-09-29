<template>
  <BaseModal
    :title="labels.navFactions"
    @close="$emit('close')"
  >
    <!-- A pinned faction leaves its group for the top one, and slides there (useFlipMove). -->
    <div
      ref="listEl"
      class="modal-body modal-list"
    >
      <template v-if="pinned.length">
        <h4
          class="fp-group"
          data-flip="h:pinned"
        >
          {{ labels.favPinnedGroup }}
        </h4>
        <FactionOption
          v-for="f in pinned"
          :key="'pin-' + f.slug"
          :data-flip="f.slug"
          :slug="f.slug"
          :name="f.name"
          :to="`/factions/${f.slug}`"
          @pick="$emit('close')"
        />
      </template>
      <template
        v-for="g in groups"
        :key="g.id"
      >
        <h4
          class="fp-group"
          :data-flip="'h:' + g.id"
        >
          {{ labels[factionGroupLabelKey(g.id)] }}
        </h4>
        <FactionOption
          v-for="f in g.factions"
          :key="f.slug"
          :data-flip="f.slug"
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
// moves a faction to the "Pinned" group at the top (useFavorites) — the long list otherwise
// buries e.g. Necrons at the very bottom.
import { computed, ref } from 'vue'
import BaseModal from './BaseModal.vue'
import FactionOption from './FactionOption.vue'
import { factionGroups, factionGroupLabelKey } from '../data/factionsIndex.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useFavorites } from '../composables/useFavorites.js'
import { useFlipMove } from '../composables/useFlipMove.js'

defineEmits(['close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const { pinnedFactionsFrom, unpinnedGroupsFrom } = useFavorites()
const pinned = computed(() => pinnedFactionsFrom(factionGroups))
const groups = computed(() => unpinnedGroupsFrom(factionGroups))
const listEl = ref(null)
useFlipMove(() => pinned.value.map((f) => f.slug), listEl)

</script>

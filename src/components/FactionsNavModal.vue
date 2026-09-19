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
        <div
          v-for="f in pinned"
          :key="'pin-' + f.slug"
          class="fac tone tone-bar"
          :style="toneOf(f)"
        >
          <RouterLink
            :to="`/factions/${f.slug}`"
            class="fac-link"
            @click="$emit('close')"
          >
            <span class="tone-badge">{{ f.abbr }}</span>
            <span class="fac-name">{{ f.name }}</span>
          </RouterLink>
          <FavoriteStar
            :pinned="true"
            @toggle="toggleFaction(f.slug)"
          />
        </div>
      </template>
      <template
        v-for="g in factionGroups"
        :key="g.id"
      >
        <h4 class="fp-group">
          {{ labels[factionGroupLabelKey(g.id)] }}
        </h4>
        <template
          v-for="f in g.factions"
          :key="f.slug"
        >
          <div
            v-if="f.ready"
            class="fac tone tone-bar"
            :style="toneOf(f)"
          >
            <RouterLink
              :to="`/factions/${f.slug}`"
              class="fac-link"
              @click="$emit('close')"
            >
              <span class="tone-badge">{{ f.abbr }}</span>
              <span class="fac-name">{{ f.name }}</span>
            </RouterLink>
            <FavoriteStar
              :pinned="isFactionPinned(f.slug)"
              @toggle="toggleFaction(f.slug)"
            />
          </div>
          <span
            v-else
            class="fac disabled"
          >
            <span class="fac-name">{{ f.name }}</span>
            <span class="soon">{{ labels.factionsSoon }}</span>
          </span>
        </template>
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
import FavoriteStar from './FavoriteStar.vue'
import { factionGroups, factionGroupLabelKey } from '../data/factionsIndex.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useFavorites } from '../composables/useFavorites.js'

defineEmits(['close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const { isFactionPinned, toggleFaction, pinnedFactionsFrom } = useFavorites()
const pinned = computed(() => pinnedFactionsFrom(factionGroups))


// The same colour identification as the tracker's faction picker (FactionPickerModal): a bar
// and a monogram in the faction's own colour. The rows here ARE the index entries, so the pair
// and the monogram are right on them.
function toneOf(f) {
  return f.color ? { '--tone-light': f.color.light, '--tone-dark': f.color.dark } : undefined
}
</script>

<style scoped>
.fp-group {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  margin: 0.6rem 0 0.1rem;
}
.fp-group:first-child { margin-top: 0; }

.fac {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.55rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  transition: border-color 0.15s;
}
.fac:has(.fac-link:hover) { border-color: var(--accent); }
.fac-link {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
}
.fac-link:hover { text-decoration: none; }
.fac.disabled { cursor: default; opacity: 0.6; }
.fac-name { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.fac.disabled .fac-name { color: var(--text-dim); }

.soon {
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-dim);
  border: 1px solid var(--border);
  padding: 1px 5px;
  flex-shrink: 0;
}
</style>

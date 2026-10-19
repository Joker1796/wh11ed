<template>
  <div class="dt side-colored turn-colored">
    <GameTabs
      :tabs="tabs"
      :active="active"
      :pinned="false"
    />
    <div class="side-frame dt-panel">
      <slot />
    </div>
  </div>
</template>

<script setup>
// A help demo of a game-screen tab: the strip of tabs as the game draws it, the one shown open and
// the strip inert (owner, 2026-10-15: show where it is, do not let it switch), the panel hanging
// from it in the side's frame.
import { computed } from 'vue'
import GameTabs from '../GameTabs.vue'
import { ui } from '../../../i18n/ui.js'
import { useLocale } from '../../../composables/useLocale.js'

defineProps({ active: { type: String, required: true } })
const { locale } = useLocale()
const tabs = computed(() => {
  const L = ui[locale.value]
  return [
    { id: 'missions', label: L.trackerTabMissions, icon: 'wi wi-missions' },
    { id: 'phase', label: L.trackerTabPhase, icon: 'wi wi-phase' },
    { id: 'cp', label: L.trackerCp, icon: 'wi wi-cp' },
    { id: 'armies', label: L.trackerTabArmies, icon: 'wi wi-army' },
  ]
})
</script>

<style scoped>
.dt { --side: var(--side-you); }
.dt-panel { padding-top: 0.5rem; }
</style>

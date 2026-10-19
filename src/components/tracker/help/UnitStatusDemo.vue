<template>
  <HelpDemoFrame>
    <div
      v-for="u in UNIT_STATUS_DEMO"
      :key="u.status"
      class="hd-row hd-unit"
    >
      <span class="hd-unit-name">{{ u.unit }}</span>
      <UnitStatusButton
        :status="u.status"
        :name="u.unit"
        disabled
      />
    </div>
  </HelpDemoFrame>
</template>

<script setup>
// "Where each unit is": the status mark a list's units carry (UnitStatusButton), one of each.
import HelpDemoFrame from './HelpDemoFrame.vue'
import UnitStatusButton from '../UnitStatusButton.vue'
import { UNIT_STATUS_DEMO } from './demos.js'
</script>

<style scoped>
.hd-unit { display: flex; align-items: center; justify-content: space-between; gap: 0.6rem; }
.hd-unit-name { font-size: 0.85rem; color: var(--text-primary); }
</style>

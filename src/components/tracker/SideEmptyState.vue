<template>
  <!-- A side panel with nothing to show (the Phase tab with no rule in this phase, the Roster tab
       for a side with no list): the side's army as a faint emblem in its colour, the reason under
       it, both in the middle of the frame — a line pinned at the top of a tall empty frame read
       as a page that had not finished loading (owner, 2026-10-06). The frame is a flex column;
       this takes its slack. -->
  <div class="side-empty">
    <FactionEmblem
      :faction="faction"
      class="se-emblem"
    />
    <p class="se-text">
      <slot />
    </p>
  </div>
</template>

<script setup>
import FactionEmblem from '../FactionEmblem.vue'

// `faction` — the side's army (factionsIndex entry; the first member's in doubles). None: the text alone.
defineProps({ faction: { type: Object, default: null } })
</script>

<style scoped>
.side-empty {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  padding: 1.5rem 0.5rem;
  text-align: center;
}
.se-emblem { height: 5.5rem; aspect-ratio: var(--ratio); max-width: 80%; color: var(--side); opacity: 0.22; }
.se-text { margin: 0; max-width: 22rem; font-size: 0.9rem; color: var(--text-dim); }
</style>

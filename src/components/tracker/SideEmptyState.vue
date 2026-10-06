<template>
  <!-- A side panel with nothing to show (the Phase tab with no rule in this phase, the Roster tab
       for a side with no list): the side's army as a faint emblem filling the frame, in its
       colour, and the reason over its lower part — a line pinned at the top of a tall empty frame
       read as a page that had not finished loading (owner, 2026-10-06). The frame is a flex
       column; this takes its slack. -->
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
/* Takes the frame's slack (basis 0) — never more, so the page never scrolls for it. The emblem is
   drawn behind, almost the frame's full height, and takes no room of its own: on a short screen it
   simply comes out smaller (owner, 2026-10-06). The reason sits over its lower part. */
.side-empty {
  position: relative;
  flex: 1 1 0;
  min-height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 0.5rem 1.4rem;
  text-align: center;
  overflow: hidden;
}
.se-emblem {
  position: absolute;
  top: 6%;
  left: 50%;
  height: 88%;
  max-width: 92%;
  aspect-ratio: var(--ratio);
  transform: translateX(-50%);
  color: var(--side);
  opacity: 0.16;
  pointer-events: none;
}
.se-text { position: relative; margin: 0; max-width: 22rem; font-size: 0.95rem; color: var(--text-muted); }
</style>

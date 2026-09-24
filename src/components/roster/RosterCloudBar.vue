<template>
  <!-- One line of cloud status for the roster screens — the roster counterpart of the tracker
       home's own cloud line (both ride in their page's heading row since 2026-09-23), and
       deliberately the ONLY place sync is visible: there is no manual
       "Sync" button because entering the list page already runs the one pass there is. It shows
       on the list page (where the pass happens) and on a saved list's view page, which is where
       the editor's Save lands — that is how the click that saved a list gets an answer. -->
  <p
    v-if="text"
    class="rc-bar"
    :class="{ err: state === 'error', compact }"
    :title="compact && title !== text ? title : undefined"
  >
    <i
      class="bi"
      :class="icon"
    />
    <span class="rc-text">{{ text }}</span>
  </p>
</template>

<script setup>
import { useRosterCloudStatus } from '../../composables/useRosterCloudStatus.js'

const props = defineProps({
  // Show something to a signed-out user (the list page does; a single list's page doesn't —
  // there the bar is only there to answer a Save).
  hint: { type: Boolean, default: false },
  // Riding in a page heading rather than standing on its own line: the signed-out sentence
  // becomes three words and the whole of it moves into the tooltip. Every other state is
  // already short enough to sit there as it is.
  compact: { type: Boolean, default: false },
})

const { state, text, title, icon } = useRosterCloudStatus({
  hint: () => props.hint,
  compact: () => props.compact,
})
</script>

<style scoped>
/* In a heading row: no line of its own, no centring, and a long address or sentence ellipsizes
   instead of pushing the title onto a second line. */
.rc-bar.compact {
  margin: 0;
  justify-content: flex-end;
  min-width: 0;
  font-size: inherit;
}
.rc-bar.compact .rc-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rc-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin: 0 0 1rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  text-align: center;
}
.rc-bar .bi { color: var(--accent); }
.rc-bar.err { color: var(--danger); }
.rc-bar.err .bi { color: inherit; }
</style>

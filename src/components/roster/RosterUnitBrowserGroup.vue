<template>
  <CollapseTransition :show="open">
    <!-- Search and filters narrow the rows in place (the global `sift` motion). -->
    <TransitionGroup
      name="sift"
      tag="div"
      class="rub-list"
    >
      <RosterUnitBrowserRow
        v-for="u in units"
        :key="u.id"
        :unit="u"
        :row="row"
      />
    </TransitionGroup>
  </CollapseTransition>
</template>

<script setup>
import CollapseTransition from '../CollapseTransition.vue'
import RosterUnitBrowserRow from './RosterUnitBrowserRow.vue'

// One group's rows of RosterUnitBrowser, as a component of its own so that it re-renders only
// when its own list of units does (search, filters, sections). A `TransitionGroup` measures every
// child it holds each time it renders — the position of each row before and after, and the style
// of one clone — and drawn inline in the catalogue, all twelve groups did that on every edit of
// the list beside it: a changed points total is a new `remaining`, an added unit a new `addedIds`.
// The rows' own marks (count, price, cap) follow the edit in the rows, without the group
// (2026-10-22, the editor's slow taps on phones).
defineProps({
  units: { type: Array, required: true },
  open: { type: Boolean, default: false },
  row: { type: Object, required: true },
})
</script>

<style scoped>
.rub-list { display: flex; flex-direction: column; gap: 0.35rem; padding-top: 0.35rem; }
@container (max-width: 300px) {
  .rub-list { gap: 0.25rem; }
}
</style>

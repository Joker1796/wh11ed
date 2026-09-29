<template>
  <BaseModal
    :title="card?.name"
    max-width="720px"
    max-height="90dvh"
    @close="$emit('close')"
  >
    <template #aside>
      <RosterOwnedStar
        v-if="card?.name"
        :faction-slug="factionSlug"
        :unit-id="unitId"
        :name="card.name"
      />
    </template>
    <div class="modal-body">
      <RosterUnitRulesCard
        ref="card"
        :unit-id="unitId"
        :faction-slug="factionSlug"
        :ctx="ctx"
        :game-ctx="gameCtx"
        @toggle-cond="(...a) => $emit('toggle-cond', ...a)"
        @toggle-strat="(...a) => $emit('toggle-strat', ...a)"
        @toggle-aura="(...a) => $emit('toggle-aura', ...a)"
        @toggle-pick="(...a) => $emit('toggle-pick', ...a)"
      />
    </div>
  </BaseModal>
</template>

<script setup>
// A unit's card in a dialog — the builder, the roster view and a game open it. The card itself
// (and everything it loads) is RosterUnitRulesCard; this is the dialog around it, titled with the
// unit's name and the owned star beside the close button.
import { ref } from 'vue'
import BaseModal from '../BaseModal.vue'
import RosterUnitRulesCard from './RosterUnitRulesCard.vue'
import RosterOwnedStar from './RosterOwnedStar.vue'

defineProps({
  unitId: { type: String, required: true },
  factionSlug: { type: String, required: true },
  ctx: { type: Object, default: null },
  gameCtx: { type: Object, default: null },
})
defineEmits(['close', 'toggle-cond', 'toggle-strat', 'toggle-aura', 'toggle-pick'])

const card = ref(null)
</script>

<style scoped>
/* Small phones: the modal is already full-width (BaseModal's ≤560px bottom-sheet), so its own
   padding is the last thing standing between DatasheetCard's tables and the screen edge —
   DatasheetCard already bleeds its weapon table/ability groups to ITS OWN edges at ≤480px, so a
   generous outer padding here would just re-add the margin that treatment removes. */
@media (max-width: 480px) {
  .modal-body { padding: 0.6rem 0.35rem; }
  /* DatasheetCard's own ≤480px CSS bleeds `.ds-card` to the full VIEWPORT width
     (`width: 100vw; margin-left: calc(50% - 50vw)`) so its header/weapon-table/ability-group
     bleeds land flush against the true screen edge — correct only when `.ds-card` sits directly
     in an unpadded container. Nested in this `.modal-body`'s own padding, the `50%` term in that
     calc resolves against the PADDED content box, not the true viewport, so the escape lands a
     few px short/long and the modal gains a small horizontal scroll (most visible once a unit
     has an Abilities/Special Abilities group — `.ds-group-btn`'s width:100% then measures
     against `.ds-ability-group`'s own bled, over-wide box). Cancel just the escape; `.ds-card`'s
     internal bleed-to-its-own-edge for every one of those zones is untouched and stays correct
     once `.ds-card` itself is back to a normal in-flow block. */
  .modal-body :deep(.ds-card) {
    width: auto;
    margin-left: 0;
  }
}
</style>

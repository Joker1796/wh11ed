<template>
  <BaseModal
    :title="labels.trackerLayoutPickerTitle"
    max-width="min(96vw, 1240px)"
    max-height="92dvh"
    @close="$emit('close')"
  >
    <!-- Desktop: the matrix on the left, the matchup's three layouts in a row on the right, all
         of it in view at once — comparing A, B and C is the whole point of choosing, and a
         narrow dialog that stacked the three tall pictures made that a scroll. The matrix is
         the icons-only one there, because the names cost 520px the row of pictures needs more.
         On a phone the same DOM stacks: matrix, then the layouts one under another. -->
    <div class="modal-body lp-body">
      <div class="lp-matrix">
        <!-- Desktop: the matchup's name heads the matrix that chose it; the row of pictures on
             the right then needs no caption of its own. On a phone it stays above the layouts,
             where the eye arrives after the matrix. -->
        <h4
          v-if="desk && activeMatchup"
          class="lp-matchup"
        >
          {{ matchupLabel(activeMatchup) }}
        </h4>
        <MissionMatrix
          :dispositions="dispositions"
          :selected="sel"
          :recommended="matchup"
          :compact="desk"
          @select="sel = $event"
        />
        <p
          v-if="matchup"
          class="lp-hint lp-yours"
        >
          <span class="lp-yours-mark" /> {{ labels.trackerLayoutMatchupYours }}
        </p>
      </div>

      <div
        v-if="activeMatchup"
        class="lp-right"
      >
        <h4
          v-if="!desk"
          class="lp-matchup"
        >
          {{ matchupLabel(activeMatchup) }}
        </h4>
        <div class="lp-layouts">
          <div
            v-for="l in activeMatchup.layouts"
            :key="l.id"
            class="lp-layout"
            :class="{ on: isSelected(l) }"
          >
            <LayoutCard :layout="l">
              <template #caption-end>
                <button
                  class="lp-pick"
                  :class="{ on: isSelected(l) }"
                  @click="pick(activeMatchup, l)"
                >
                  {{ isSelected(l) ? '✓ ' : '' }}{{ labels.trackerSelect }}
                </button>
              </template>
            </LayoutCard>
          </div>
        </div>
      </div>
      <p
        v-else
        class="lp-hint"
      >
        {{ labels.trackerLayoutPickerHint }}
      </p>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import MissionMatrix from '../event/MissionMatrix.vue'
import LayoutCard from '../event/LayoutCard.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useMediaQuery } from '../../composables/useMediaQuery.js'
import { eventCompanion } from '../../data/eventCompanion.js'
import { dispositionName } from '../../composables/useTracker.js'
import { ALL_MATCHUPS, matchupFor } from '../../composables/trackerLayout.js'

const props = defineProps({
  selected: { type: Object, default: null },   // the chosen custom layout { image, ... }
  // The game's own matchup { you, opp } (its two dispositions): marked in the matrix, and the
  // cell the dialog opens on — a picker that opened on an empty pane asked for a tap it could
  // have made itself.
  matchup: { type: Object, default: null },
})
const emit = defineEmits(['pick', 'close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const desk = useMediaQuery('(min-width: 901px)')

const dispositions = eventCompanion.en.dispositions

// Open on the cell that means something: the matchup of a layout already chosen, else the
// game's own, else nothing (a game whose dispositions are not set yet).
function cellOfSelected() {
  const img = props.selected?.image
  if (!img) return null
  const m = ALL_MATCHUPS.find((x) => x.layouts.some((l) => l.image === img))
  return m ? { you: m.a, opp: m.b } : null
}
const sel = ref(cellOfSelected() || (props.matchup?.you && props.matchup?.opp ? { ...props.matchup } : null))
const activeMatchup = computed(() => (sel.value ? matchupFor(sel.value.you, sel.value.opp) : null))

function matchupLabel(m) {
  return `${dispositionName(m.a)} ${labels.value.trackerVs} ${dispositionName(m.b)}`
}
function isSelected(l) {
  return !!props.selected && props.selected.image === l.image
}
function pick(m, l) {
  emit('pick', { id: l.id, image: l.image, edge: l.edge, label: `${matchupLabel(m)} · ${l.id}` })
}
</script>

<style scoped>
.lp-body { padding: 0.5rem 1rem 1rem; }
.lp-hint { text-align: center; font-size: 0.84rem; color: var(--text-muted); margin: 0.5rem 0 0.5rem; }
.lp-yours { display: flex; align-items: center; justify-content: flex-start; gap: 0.4rem; margin: -0.6rem 0 0.8rem; text-align: left; }
.lp-yours-mark {
  display: inline-block;
  width: 0.9rem;
  height: 0.9rem;
  outline: 2px dashed var(--accent);
  outline-offset: -2px;
}
/* --link-accent: the accent red on the light theme, the gold the layout captions already use on
   the dark one — red display type on the dark surface sat too close to the background. */
.lp-matchup {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--link-accent);
  margin: 0.4rem 0 0.6rem;
  text-align: center;
}
.lp-layouts { display: flex; flex-direction: column; gap: 0.9rem; }
.lp-layout { display: flex; flex-direction: column; gap: 0.4rem; }
.lp-layout.on { outline: 2px solid var(--accent); outline-offset: 2px; }
.lp-pick {
  flex-shrink: 0;
  min-height: 36px;
  padding: 0.3rem 1.1rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--accent);
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
}
.lp-pick:hover { border-color: var(--accent); }
.lp-pick.on { background: var(--accent); color: var(--text-on-accent); border-color: var(--accent); }

@media (min-width: 901px) {
  .lp-body {
    display: grid;
    grid-template-columns: 340px minmax(0, 1fr);
    gap: 1.25rem;
    align-items: start;
  }
  .lp-matrix :deep(.matrix-wrap) { margin: 0.3rem 0 0.6rem; }
  .lp-right { min-width: 0; padding-top: 0.6rem; }
  .lp-matchup { margin: 0.6rem 0 0.2rem; }
  .lp-layouts { flex-direction: row; align-items: stretch; }
  .lp-layout { flex: 1 1 0; min-width: 0; }
  /* Three pictures in a row, all in view: each capped to the dialog's height minus its own
     chrome (title bar, matchup heading, caption, the Select button — ~13rem), so the row
     never asks the dialog to scroll; the full size is one click away on each. */
  .lp-layout :deep(.layout-card .layout-img) {
    width: auto;
    max-width: 100%;
    max-height: max(200px, calc(92dvh - 13rem));
    margin: 0 auto;
  }
  .lp-hint:not(.lp-yours) { align-self: center; }
}
</style>

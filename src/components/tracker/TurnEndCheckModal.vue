<template>
  <BaseModal
    :title="final ? labels.trackerCheckTitleFinal : labels.trackerCheckTitle"
    :subtitle="final ? labels.trackerCheckSubFinal : labels.trackerCheckSub"
    max-width="480px"
    @close="$emit('close')"
  >
    <div class="modal-body">
      <section
        v-for="c in checks"
        :key="`${c.pi}:${c.slug || 'primary'}`"
        class="ck"
        :class="{ opp: !isYouSide(current.players[c.pi], c.pi) }"
      >
        <div class="ck-head">
          <span class="ck-name">{{ names[c.pi] }} · {{ title(c) }}</span>
          <span
            v-if="!canEdit(c.pi)"
            class="ck-phone"
          >{{ labels.trackerCheckOtherPhone }}</span>
        </div>
        <ScoreRows
          :blocks="c.blocks"
          :count="(bi, ri) => count(c, bi, ri)"
          :readonly="!canEdit(c.pi)"
          :show-headings="false"
          @set="(bi, ri, n) => set(c, bi, ri, n)"
        />
      </section>
      <button
        class="btn-primary ck-go"
        @click="$emit('confirm')"
      >
        {{ confirmLabel }}
      </button>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import ScoreRows from './ScoreRows.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, isYouSide, missionBySlug } from '../../composables/useTracker.js'
import { useParty } from '../../composables/useParty.js'

// Before the turn passes: what scores at this moment on cards nobody is looking at — the other
// side's "end of your opponent's turn" secondaries, and on the battle's last turn every End of
// Battle condition (missionTiming.turnEndChecks decides which). Ticked here as on the cards; a
// side another phone plays is shown, not scored. Mikhail's prototype.
defineProps({
  checks: { type: Array, required: true },
  names: { type: Array, required: true },
  final: { type: Boolean, default: false },
  confirmLabel: { type: String, required: true },
})
defineEmits(['confirm', 'close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, primaryRowCount, setPrimaryRow, secondaryRowCount, scoreSecondaryRow } = useTracker()
const { canEdit } = useParty()

const round = computed(() => current.value.currentRound)
function title(c) {
  const pl = current.value.players[c.pi]
  return missionBySlug(c.slug || pl.primarySlug, c.slug ? pl.role : null, locale.value)?.name || ''
}
function count(c, bi, ri) {
  return c.slug ? secondaryRowCount(c.pi, c.slug, bi, ri) : primaryRowCount(c.pi, round.value - 1, bi, ri)
}
function set(c, bi, ri, n) {
  if (c.slug) scoreSecondaryRow(c.pi, c.slug, bi, ri, n)
  else setPrimaryRow(c.pi, round.value - 1, bi, ri, n)
}
</script>

<style scoped>
.ck {
  --side: var(--accent);
  margin-bottom: 0.7rem;
  padding: 0.55rem 0.6rem;
  border: 1px solid var(--border);
  border-left: 3px solid var(--side);
}
.ck.opp { --side: var(--side-opponent); }
.ck-head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.2rem 0.6rem; margin-bottom: 0.4rem; }
.ck-name { font-weight: 700; color: var(--side); }
.ck-phone { font-size: 0.76rem; color: var(--text-dim); }
.ck-go { width: 100%; justify-content: center; min-height: 46px; font-weight: 700; }
</style>

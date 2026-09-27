<template>
  <BaseModal
    :title="title"
    :subtitle="subtitle"
    dense
    max-width="480px"
    @close="$emit('close')"
  >
    <template #aside>
      <span class="mh-count value">{{ vp }} VP</span>
    </template>

    <div class="modal-body">
      <p
        v-if="readonly && viewOnlyNote !== ''"
        class="view-only"
      >
        <i class="bi bi-eye" /> {{ viewOnlyNote ?? labels.trackerViewOnly }}
      </p>

      <template v-if="briefing && briefing.length">
        <button
          class="brief-toggle"
          :aria-expanded="briefingOpen"
          @click="toggleBriefing"
        >
          <span>{{ labels.trackerBriefing }}</span>
          <i
            class="bi"
            :class="briefingOpen ? 'bi-chevron-up' : 'bi-chevron-down'"
          />
        </button>
        <CollapseTransition :show="briefingOpen">
          <MissionBriefing :briefing="briefing" />
        </CollapseTransition>
      </template>

      <button
        v-if="whenDrawn && !readonly"
        class="redraw-btn"
        @click="$emit('redraw', whenDrawn.mode)"
      >
        {{ whenDrawn.mode === 'discard' ? labels.trackerDiscardDraw : labels.trackerShuffleDraw }}
      </button>

      <ScoreRows
        class="sm-rows"
        :blocks="blocks"
        :count="count"
        :readonly="readonly"
        :locked="locked"
        :locked-note="lockedNote"
        @set="(bi, ri, c) => $emit('set', bi, ri, c)"
      />
    </div>

    <footer
      v-if="note"
      class="modal-foot"
    >
      {{ note }}
    </footer>
  </BaseModal>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseModal from '../BaseModal.vue'
import ScoreRows from './ScoreRows.vue'
import MissionBriefing from '../MissionBriefing.vue'
import CollapseTransition from '../CollapseTransition.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { getItem, setItem } from '../../composables/safeStorage.js'

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  vp: { type: Number, default: 0 },
  blocks: { type: Array, required: true },   // [{ bi, kind?, heading, when?, rows:[{ri,text,vp,modifier,perEach}] }]
  count: { type: Function, required: true },  // (bi, ri) => number
  note: { type: String, default: '' },
  briefing: { type: Array, default: null },   // mission.briefing — shown above the blocks
  whenDrawn: { type: Object, default: null }, // { mode:'discard'|'shuffle' } — WHEN DRAWN redraw button, or null
  readonly: { type: Boolean, default: false }, // view-only (e.g. a set-aside secondary): no scoring inputs
  viewOnlyNote: { type: String, default: null }, // the view-only line; null → "Discarded — view only", '' → none
  locked: { type: Function, default: null },  // (block) => true when its moment cannot have come (ScoreRows)
  lockedNote: { type: String, default: '' },
})
defineEmits(['set', 'close', 'redraw'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Briefing is collapsible; the preference persists (stored value is the "collapsed" flag).
const BRIEF_KEY = 'wh11ed-tracker-briefing-collapsed'
const briefingOpen = ref(getItem(BRIEF_KEY) !== 'true')
function toggleBriefing() {
  briefingOpen.value = !briefingOpen.value
  setItem(BRIEF_KEY, String(!briefingOpen.value))
}
</script>

<style scoped>
/* The heading here is two lines deep, so the close button rides at the top of it rather than
   centred against the whole block. */
.brief-toggle {
  display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
  width: 100%; margin-top: 0.35rem; padding: 0.45rem 0.7rem;
  background: var(--bg-card); border: 1px solid var(--border);
  color: var(--text-primary); font-size: 0.78rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.03em; cursor: pointer;
}
.brief-toggle:hover { border-color: var(--accent); }
.brief-toggle .bi { font-size: 0.9rem; color: var(--text-muted); }
.redraw-btn {
  display: block;
  width: 100%;
  margin: 0.55rem 0 0.2rem;
  padding: 0.5rem 0.7rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #1a1206;
  background: #c8961e;
  border: 1px solid #a87c14;
  cursor: pointer;
}
.redraw-btn:hover { background: #d8a52a; }
.sm-rows { margin-top: 0.7rem; }
.view-only {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0 0 0.5rem;
  padding: 0.4rem 0.6rem;
  background: var(--bg-secondary);
  border: 1px dashed var(--border);
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--text-muted);
}
.modal-foot {
  padding: 0.55rem 0.9rem;
  border-top: 1px solid var(--border);
  font-size: 0.74rem;
  color: var(--text-dim);
}
</style>

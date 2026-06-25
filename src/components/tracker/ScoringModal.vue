<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal" role="dialog" aria-modal="true">
      <header class="modal-head">
        <div class="mh-text">
          <h3 class="mh-title">{{ title }}</h3>
          <p v-if="subtitle" class="mh-sub">{{ subtitle }}</p>
        </div>
        <div class="mh-right">
          <span class="mh-vp">{{ vp }} VP</span>
          <button class="mh-close" @click="$emit('close')" aria-label="Close">✕</button>
        </div>
      </header>

      <div class="modal-body">
        <MissionBriefing :briefing="briefing" />

        <button v-if="whenDrawn" class="redraw-btn" @click="$emit('redraw', whenDrawn.mode)">
          {{ whenDrawn.mode === 'discard' ? labels.trackerDiscardDraw : labels.trackerShuffleDraw }}
        </button>

        <div v-for="b in blocks" :key="b.bi" class="m-block">
          <div class="m-bhead">
            <span v-if="b.kind" class="kind" :class="b.kind">{{ b.kind }}</span>
            <span class="m-heading">{{ b.heading }}</span>
            <span v-if="b.when" class="m-when">{{ b.when }}</span>
          </div>
          <label v-for="r in b.rows" :key="r.ri" class="m-cond" :class="{ on: count(b.bi, r.ri) > 0 }">
            <NumberStepper
              v-if="r.perEach"
              :modelValue="count(b.bi, r.ri)"
              :min="0" :max="20"
              @update:modelValue="v => $emit('set', b.bi, r.ri, v)"
            />
            <input
              v-else
              type="checkbox"
              class="m-check"
              :checked="count(b.bi, r.ri) > 0"
              @change="e => $emit('set', b.bi, r.ri, e.target.checked ? 1 : 0)"
            />
            <span class="m-text">
              <em v-if="r.modifier === 'or' && !r.perEach" class="or">{{ labels.trackerOr }}</em>
              {{ r.text }}
              <strong>{{ r.vp }} VP{{ r.perEach ? ' ' + labels.trackerEach : '' }}</strong>
            </span>
          </label>
        </div>
      </div>

      <footer v-if="note" class="modal-foot">{{ note }}</footer>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import NumberStepper from './NumberStepper.vue'
import MissionBriefing from '../MissionBriefing.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  vp: { type: Number, default: 0 },
  blocks: { type: Array, required: true },   // [{ bi, kind?, heading, when?, rows:[{ri,text,vp,modifier,perEach}] }]
  count: { type: Function, required: true },  // (bi, ri) => number
  note: { type: String, default: '' },
  briefing: { type: Array, default: null },   // mission.briefing — shown above the blocks
  whenDrawn: { type: Object, default: null }, // { mode:'discard'|'shuffle' } — WHEN DRAWN redraw button, or null
})
const emit = defineEmits(['set', 'close', 'redraw'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

function onKey(e) { if (e.key === 'Escape') emit('close') }
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 400;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.modal {
  width: 100%;
  max-width: 480px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  overflow: hidden;
}
.modal-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.8rem 0.9rem;
  border-bottom: 1px solid var(--border);
}
.mh-title { font-family: var(--font-serif); font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin: 0; }
.mh-sub { font-size: 0.76rem; color: var(--text-muted); margin: 0.1rem 0 0; }
.mh-right { display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0; }
.mh-vp { font-family: var(--font-mono); font-weight: 700; color: var(--accent); font-size: 0.95rem; }
.mh-close {
  background: none; border: none; color: var(--text-muted);
  font-size: 1.1rem; cursor: pointer; min-width: 32px; min-height: 32px; border-radius: 4px;
}
.mh-close:hover { background: color-mix(in srgb, var(--text-primary) 8%, transparent); color: var(--text-primary); }
.modal-body { padding: 0.5rem 0.9rem 0.9rem; overflow-y: auto; }
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
  border-radius: 6px;
  cursor: pointer;
}
.redraw-btn:hover { background: #d8a52a; }
.m-block { margin-top: 0.7rem; }
.m-bhead { display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; margin-bottom: 0.35rem; }
.kind {
  font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
  padding: 1px 5px; border-radius: 2px;
}
.kind.fixed { background: #b3401b; color: #fff; }
.kind.tactical { background: #1f3a5f; color: #fff; }
.m-heading { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: var(--text-dim); }
.m-when { font-size: 0.72rem; color: var(--text-dim); }
.m-cond {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  padding: 0.5rem 0.5rem;
  border: 1px solid var(--border);
  border-radius: 5px;
  margin-top: 0.35rem;
  cursor: pointer;
  background: var(--bg-secondary);
}
.m-cond.on { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); }
.m-check { width: 20px; height: 20px; margin-top: 1px; flex-shrink: 0; accent-color: var(--accent); cursor: pointer; }
.m-text { font-size: 0.84rem; color: var(--text-muted); line-height: 1.45; }
.m-text strong { color: var(--text-primary); white-space: nowrap; }
.or { font-style: normal; font-size: 0.62rem; font-weight: 700; text-transform: uppercase; color: var(--text-dim); margin-right: 0.2rem; }
.modal-foot {
  padding: 0.55rem 0.9rem;
  border-top: 1px solid var(--border);
  font-size: 0.74rem;
  color: var(--text-dim);
}
@media (max-width: 560px) {
  .modal-overlay { padding: 0; align-items: flex-end; }
  .modal { max-width: 100%; max-height: 92vh; border-radius: 12px 12px 0 0; }
}
</style>

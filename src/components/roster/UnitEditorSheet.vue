<template>
  <BaseModal :title="def.name" max-width="560px" @close="$emit('close')">
    <div class="modal-body ues">
      <RouterLink
        v-if="def.linked && factionSlug"
        :to="`/factions/${factionSlug}/datasheets/${def.id}`"
        class="ues-sheet-link"
      >
        <i class="bi bi-file-earmark-text"></i> {{ labels.factionDatasheets }}
      </RouterLink>

      <!-- Unit size -->
      <section v-if="def.sizes.length > 1" class="ues-sec">
        <h4 class="ues-h">{{ labels.rosterUnitSize }}</h4>
        <div class="opt-row">
          <button
            v-for="(s, i) in def.sizes"
            :key="i"
            class="pill"
            :class="{ on: (entry.size ?? 0) === i }"
            @click="setSize(i)"
          >{{ sizeLabel(s) }} · {{ s.pts }}{{ labels.rosterPointsLabel }}</button>
        </div>
      </section>
      <section v-if="curRange" class="ues-sec ues-count">
        <h4 class="ues-h">{{ labels.rosterModelsLabel }}</h4>
        <NumberStepper :model-value="models" :min="curSize.per[0]" :max="curSize.per[1]" @update:model-value="setCount" />
      </section>

      <!-- Default loadout (read-only) -->
      <section v-if="defaultLines.length" class="ues-sec">
        <h4 class="ues-h">{{ labels.rosterDefaultWargear }}</h4>
        <p v-for="(l, i) in defaultLines" :key="i" class="ues-default">
          <span v-if="l.mini" class="ues-mini">{{ l.mini }}:</span> {{ l.items }}
        </p>
      </section>

      <!-- Wargear choices -->
      <section v-for="(g, gi) in def.gear || []" :key="gi" class="ues-sec">
        <h4 class="ues-h">
          <span v-if="miniName(g.m)" class="ues-mini">{{ miniName(g.m) }}</span>
          {{ texts[g.t] }}
        </h4>

        <!-- radio: replace with one of… (plus keep-default) -->
        <div v-if="mode(g) === 'radio'" class="opt-col">
          <button class="opt" :class="{ on: !radioSel(gi) }" @click="setRadio(gi, null)">
            <span class="opt-name">{{ labels.rosterKeepDefault }}</span>
          </button>
          <button
            v-for="(o, oi) in g.o"
            :key="oi"
            class="opt"
            :class="{ on: radioSel(gi) === oi }"
            @click="setRadio(gi, oi)"
          >
            <span class="opt-name">{{ items[o[0]] }}</span>
            <span v-if="o[1]" class="opt-pts">+{{ o[1] }}</span>
          </button>
        </div>

        <!-- toggle: single optional item -->
        <div v-else-if="mode(g) === 'toggle'" class="opt-col">
          <label class="opt opt-check" :class="{ on: toggleOn(gi) }">
            <input type="checkbox" :checked="toggleOn(gi)" @change="toggle(gi)" />
            <span class="opt-name">{{ items[g.o[0][0]] }}</span>
            <span v-if="g.o[0][1]" class="opt-pts">+{{ g.o[0][1] }}</span>
          </label>
        </div>

        <!-- stepper: N models take X -->
        <div v-else class="opt-col">
          <div v-for="(o, oi) in g.o" :key="oi" class="opt opt-step">
            <span class="opt-name">{{ items[o[0]] }}<span v-if="o[1]" class="opt-pts"> +{{ o[1] }}</span></span>
            <NumberStepper :model-value="stepCount(gi, oi)" :min="0" :max="stepMax(g)" @update:model-value="setStep(gi, oi, $event)" />
          </div>
        </div>
      </section>

      <!-- Warlord -->
      <section v-if="canWarlord" class="ues-sec">
        <label class="opt opt-check" :class="{ on: isWarlord }">
          <input type="checkbox" :checked="isWarlord" @change="$emit('toggle-warlord')" />
          <span class="opt-name"><i class="bi bi-star-fill wl-star"></i> {{ labels.rosterWarlord }}</span>
        </label>
      </section>

      <!-- Enhancement -->
      <section v-if="enhOptions.length" class="ues-sec">
        <h4 class="ues-h">{{ labels.rosterEnhancement }}</h4>
        <div class="opt-col">
          <button class="opt" :class="{ on: !entry.enh }" @click="setEnh(null)">
            <span class="opt-name">{{ labels.rosterEnhNone }}</span>
          </button>
          <button
            v-for="e in enhOptions"
            :key="e.name"
            class="opt"
            :class="{ on: entry.enh === e.name, disabled: (!e.eligible || e.used) && entry.enh !== e.name }"
            :disabled="(!e.eligible || e.used) && entry.enh !== e.name"
            @click="setEnh(e.name)"
          >
            <span class="opt-name">{{ e.name }}<span v-if="e.used" class="opt-tag">{{ labels.rosterEnhUsed }}</span></span>
            <span v-if="e.pts" class="opt-pts">+{{ e.pts }}</span>
          </button>
        </div>
      </section>

      <!-- Leader attachment -->
      <section v-if="leaderTargets.length" class="ues-sec">
        <h4 class="ues-h">{{ labels.rosterAttachTo }}</h4>
        <div class="opt-col">
          <button class="opt" :class="{ on: !entry.leaderOf }" @click="setLeader(null)">
            <span class="opt-name">{{ labels.rosterLeaderNone }}</span>
          </button>
          <button
            v-for="t in leaderTargets"
            :key="t.uid"
            class="opt"
            :class="{ on: entry.leaderOf === t.uid }"
            @click="setLeader(t.uid)"
          >
            <span class="opt-name">{{ t.name }}</span>
          </button>
        </div>
      </section>

      <div class="ues-foot">
        <span class="ues-total">{{ unitTotal }}{{ labels.rosterPointsLabel }}</span>
        <button class="ues-done" @click="$emit('close')">{{ labels.rosterDone }}</button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import NumberStepper from '../tracker/NumberStepper.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { unitPoints } from '../../composables/rosterEngine.js'

const props = defineProps({
  entry: { type: Object, required: true },
  def: { type: Object, required: true },
  items: { type: Object, required: true },
  texts: { type: Object, required: true },
  factionSlug: { type: String, default: '' },
  copyIndex: { type: Number, default: 1 },
  detachments: { type: Array, default: () => [] },
  canWarlord: { type: Boolean, default: false },
  isWarlord: { type: Boolean, default: false },
  enhOptions: { type: Array, default: () => [] },
  leaderTargets: { type: Array, default: () => [] },
})
defineEmits(['close', 'toggle-warlord'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// ── Size / model count ──
const curSize = computed(() => props.def.sizes[props.entry.size ?? 0] || props.def.sizes[0])
const curRange = computed(() => curSize.value.per[0] !== curSize.value.per[1])
const models = computed(() => props.entry.count ?? curSize.value.per[0])
function sizeLabel(s) { return s.per[0] === s.per[1] ? String(s.per[0]) : `${s.per[0]}–${s.per[1]}` }
function setSize(i) { props.entry.size = i; delete props.entry.count }
function setCount(n) { props.entry.count = n }

function miniName(m) { return props.def.minis?.[m]?.n || '' }

// ── Default loadout summary ──
const defaultLines = computed(() =>
  (props.def.defaults || []).map(([m, list]) => ({
    mini: props.def.minis?.length > 1 ? (props.def.minis[m]?.n || '') : '',
    items: list.map(([id, c]) => `${props.items[id]}${c > 1 ? ` ×${c}` : ''}`).join(', '),
  })))

// ── Wargear selection: entry.wg = [[groupIdx, optIdx, count], …] (deviations only) ──
function wg() { return props.entry.wg || [] }
function setWg(next) { props.entry.wg = next.filter((s) => s[2] > 0) }

function mode(g) {
  if (g.in === 'stepper') return 'stepper'
  return g.o.length > 1 ? 'radio' : 'toggle'
}

// radio (one-of): a single selection per group.
function radioSel(gi) {
  const s = wg().find((x) => x[0] === gi)
  return s ? s[1] : null
}
function setRadio(gi, oi) {
  const next = wg().filter((x) => x[0] !== gi)
  if (oi != null) next.push([gi, oi, 1])
  setWg(next)
}

// toggle (single optional item at option 0).
function toggleOn(gi) { return wg().some((x) => x[0] === gi && x[1] === 0) }
function toggle(gi) {
  toggleOn(gi) ? setWg(wg().filter((x) => x[0] !== gi)) : setWg([...wg(), [gi, 0, 1]])
}

// stepper (count per option).
function stepCount(gi, oi) {
  return wg().find((x) => x[0] === gi && x[1] === oi)?.[2] || 0
}
function setStep(gi, oi, n) {
  const next = wg().filter((x) => !(x[0] === gi && x[1] === oi))
  if (n > 0) next.push([gi, oi, n])
  setWg(next)
}
// "For every N models, 1 model…" caps the count at floor(models/N); otherwise any model may
// take it, capped at the model count.
function stepMax(g) {
  const m = (props.texts[g.t] || '').match(/for every (\d+) model/i)
  return m ? Math.floor(models.value / Number(m[1])) : models.value
}

function setEnh(name) { if (name) props.entry.enh = name; else delete props.entry.enh }
function setLeader(uid) { if (uid) props.entry.leaderOf = uid; else delete props.entry.leaderOf }

const unitTotal = computed(() => unitPoints(props.def, props.entry, props.copyIndex, props.detachments))
</script>

<style scoped>
.ues { display: flex; flex-direction: column; gap: 0; padding: 0.75rem; overflow-y: auto; }
.ues-sheet-link { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.8rem; color: var(--text-muted); text-decoration: none; margin-bottom: 0.5rem; }
.ues-sheet-link:hover { color: var(--accent); }
.ues-sec { padding: 0.6rem 0; border-top: 1px solid var(--border); }
.ues-sec:first-of-type { border-top: none; }
.ues-h {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
  line-height: 1.35;
}
.ues-mini { color: var(--text-dim); font-weight: 700; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.03em; margin-right: 0.3rem; }
.ues-default { font-size: 0.82rem; color: var(--text-muted); margin: 0.15rem 0; }
.ues-count { display: flex; align-items: center; justify-content: space-between; }
.opt-row { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.opt-col { display: flex; flex-direction: column; gap: 0.3rem; }
.pill {
  padding: 0.3rem 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-muted);
  border-radius: 4px;
  cursor: pointer;
}
.pill.on { background: color-mix(in srgb, var(--accent) 16%, transparent); border-color: var(--accent); color: var(--text-primary); }
.opt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}
.opt.on { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, transparent); }
.opt-check input { margin-right: 0.2rem; accent-color: var(--accent); }
.opt-name { color: var(--text-primary); }
.opt-pts { font-family: var(--font-mono); font-weight: 700; color: var(--accent); }
.opt-step { cursor: default; }
.opt.disabled { opacity: 0.45; cursor: not-allowed; }
.opt-tag { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.03em; color: var(--text-dim); margin-left: 0.4rem; }
.wl-star { color: #e3b341; margin-right: 0.3rem; }
.ues-foot {
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding-top: 0.6rem;
  border-top: 1px solid var(--border);
  background: var(--bg-primary);
}
.ues-total { font-family: var(--font-mono); font-weight: 700; font-size: 1.05rem; color: var(--text-primary); }
.ues-done {
  padding: 0.5rem 1.4rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
}
</style>

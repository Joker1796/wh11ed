<template>
  <!-- Playing a stratagem (stratagemPlay.js), from the CP tab or a unit's card: whether a rule
       changed its cost THIS time — asked every time, the answer is the button that plays it — and,
       optionally, the unit it is played on (a card's own unit is already named). -->
  <BaseModal
    :title="strat.name"
    :subtitle="`${labels.trackerStratBase} ${strat._cost}CP`"
    dense
    max-width="380px"
    :z-index="zIndex"
    @close="$emit('close')"
  >
    <div class="modal-body">
      <p
        v-if="fixedTarget"
        class="spm-on"
      >
        {{ labels.trackerStratTarget }}: <strong>{{ fixedTarget.name }}</strong>
      </p>
      <p class="spm-ask">
        {{ labels.trackerStratCostAsk }}
      </p>
      <!-- A rule changes a cost by one at most either way, and never below 0 (Core Rules). -->
      <div class="act-list">
        <button
          v-for="o in costs"
          :key="o.m"
          class="act-btn spm-cost"
          :class="{ on: o.m === 0 }"
          :disabled="!!o.block"
          :title="o.block ? labels[`trackerStratBlock_${o.block}`] : undefined"
          @click="play(o.cost)"
        >
          <strong>{{ o.label }}</strong>
          <span>{{ o.cost }}CP</span>
        </button>
      </div>
      <p
        v-if="blockNote"
        class="spm-why"
      >
        {{ blockNote }}
      </p>

      <!-- The unit it is played on — optional, in a block of its own under the price (owner,
           2026-09-30: a Command Re-roll must not stop at a list). Naming it lets the game hold the
           one-stratagem-per-unit-per-phase rule (15.01) and switches the unit card's effect on. -->
      <section
        v-if="!fixedTarget && targets?.length"
        class="spm-target"
      >
        <div
          v-if="target"
          class="spm-chosen"
        >
          <span>{{ labels.trackerStratTarget }}: <strong>{{ target.name }}</strong></span>
          <button
            class="btn-ghost spm-clear"
            @click="target = null"
          >
            {{ labels.trackerStratTargetClear }}
          </button>
        </div>
        <button
          v-else-if="!picking"
          class="btn-ghost spm-pick"
          @click="openPicker"
        >
          <i
            class="bi bi-crosshair"
            aria-hidden="true"
          /> {{ labels.trackerStratPickTarget }}
        </button>
        <template v-else>
          <input
            ref="searchEl"
            v-model="query"
            type="search"
            class="spm-search"
            :placeholder="labels.trackerStratFindUnit"
            :aria-label="labels.trackerStratFindUnit"
            autocomplete="off"
          >
          <ul class="spm-units">
            <template
              v-for="t in shownTargets"
              :key="`${t.mi ?? ''}:${t.uid}`"
            >
              <li
                v-if="t.head"
                class="spm-group"
              >
                {{ t.head }}
              </li>
              <li>
                <button
                  class="spm-unit"
                  :disabled="!!t.block"
                  @click="choose(t)"
                >
                  <span class="spm-unit-name">{{ t.name }}</span>
                  <span
                    v-if="t.block"
                    class="spm-unit-note"
                  >{{ labels[t.block === 'shock' ? 'stratBlockedShock' : 'stratBlockedUnit'] }}</span>
                  <span
                    v-else-if="t.sub"
                    class="spm-unit-note"
                  >{{ t.sub }}</span>
                </button>
              </li>
            </template>
            <li
              v-if="!shownTargets.length"
              class="spm-empty"
            >
              {{ labels.trackerStratNoUnitFound }}
            </li>
          </ul>
        </template>
      </section>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker } from '../../composables/useTracker.js'

const props = defineProps({
  strat: { type: Object, required: true }, // a deck stratagem (gameStratagems.js)
  pi: { type: Number, required: true },    // the side that plays it
  // The units it may be played on: [{ uid, mi?, name, sub?, sid?, opp?, block? }] — offered behind
  // a button when there is a list; null/empty offers none.
  targets: { type: Array, default: null },
  // A unit already chosen (a card's own box), skipping the question.
  fixedTarget: { type: Object, default: null },
  // Over another dialog (a unit's card) it has to stand above it.
  zIndex: { type: Number, default: 400 },
})
const emit = defineEmits(['close', 'played'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { stratBlock, playStratagem } = useTracker()

const target = ref(props.fixedTarget || null)
const picking = ref(false)
const query = ref('')
const searchEl = ref(null)
// Every unit of the list, the ones the query names first-letter-insensitively; a list keeps its
// order, which is by role (stratagemPlay.loadStratTargets). A row that starts a new group carries
// that group's heading (`head`), drawn above it.
const groupName = (g) => (g ? g.name || labels.value[g.key] || '' : '')
const shownTargets = computed(() => {
  const q = query.value.trim().toLowerCase()
  const list = q ? (props.targets || []).filter((t) => t.name.toLowerCase().includes(q)) : props.targets || []
  return list.map((t, i) => {
    const name = groupName(t.group)
    return name && (i === 0 || groupName(list[i - 1].group) !== name) ? { ...t, head: name } : t
  })
})
async function openPicker() {
  picking.value = true
  await nextTick()
  searchEl.value?.focus()
}
function choose(t) {
  // The heading and the group are the list's, not the unit's: the ledger keeps only the unit.
  const { head, group, ...picked } = t
  target.value = picked
  picking.value = false
  query.value = ''
}

const costs = computed(() => [-1, 0, 1].map((m) => {
  const cost = Math.max(0, props.strat._cost + m)
  const l = labels.value
  return { m, cost, label: m < 0 ? l.trackerStratReduced : m > 0 ? l.trackerStratIncreased : l.trackerStratNormal, block: stratBlock(props.pi, props.strat, cost) }
}))
// One reason under the buttons when even the cheapest cannot be played (the stratagem's own limits).
const blockNote = computed(() => {
  const b = costs.value[0].block
  return b ? labels.value[`trackerStratBlock_${b}`] : ''
})

function play(cost) {
  const entry = playStratagem(props.pi, props.strat, cost, target.value)
  if (entry) emit('played', entry)
  emit('close')
}
</script>

<style scoped>
.spm-ask { margin: 0 0 0.5rem; font-size: 0.85rem; color: var(--text-muted); }
.spm-on { margin: 0 0 0.6rem; font-size: 0.85rem; color: var(--text-muted); }
.spm-on strong, .spm-chosen strong { color: var(--text-primary); }
.spm-cost { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; text-align: left; }
.spm-cost.on { border-color: var(--accent); }
.spm-why { margin: 0.4rem 0 0; font-size: 0.75rem; color: var(--text-dim); }
/* The unit, set apart from the price: its own block under a rule. */
.spm-target { margin-top: 0.9rem; padding-top: 0.9rem; border-top: 1px solid var(--border); }
.spm-pick { width: 100%; justify-content: center; }
.spm-chosen { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; font-size: 0.88rem; color: var(--text-muted); }
.spm-clear { padding: 0.35rem 0.8rem; font-size: 0.8rem; }
.spm-search {
  width: 100%; padding: 0.55rem 0.7rem;
  border: 1px solid var(--border); background: var(--bg-secondary);
  color: var(--text-primary); font: inherit; font-size: 0.9rem;
}
.spm-search:focus { outline: none; border-color: var(--accent); }
/* A compact list, grouped by role under tinted headings — the catalogue's own (RosterUnitBrowser's
   .rub-head), so a tinted bar reads as "a heading" here too — scrolling inside the dialog. */
.spm-units { list-style: none; margin: 0.4rem 0 0; padding: 0; max-height: 50dvh; overflow-y: auto; border: 1px solid var(--border); }
.spm-units li + li { border-top: 1px solid var(--border-light); }
.spm-group {
  position: sticky; top: 0; z-index: 1;
  padding: 0.3rem 0.7rem;
  background: color-mix(in srgb, var(--accent) 20%, var(--bg-secondary));
  color: var(--text-primary);
  font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
}
.spm-unit {
  display: flex; align-items: baseline; justify-content: space-between; gap: 0.5rem;
  width: 100%; min-height: 34px; padding: 0.35rem 0.7rem;
  border: 0; background: none; color: var(--text-primary); font: inherit; font-size: 0.85rem; text-align: left; cursor: pointer;
}
@media (hover: hover) { .spm-unit:hover:not(:disabled) { background: color-mix(in srgb, var(--accent) 10%, transparent); } }
.spm-unit:disabled { color: var(--text-dim); cursor: default; }
.spm-unit-note { flex-shrink: 0; font-size: 0.72rem; color: var(--text-dim); }
.spm-empty { padding: 0.6rem 0.7rem; font-size: 0.82rem; color: var(--text-dim); }
</style>

<template>
  <div v-if="view" class="army-card">
    <div class="army-head">
      <div class="army-heading">
        <span class="army-label">{{ view.label }}</span>
        <span v-if="view.ruleName" class="army-rule-name">{{ view.ruleName }}</span>
      </div>
      <NumberStepper
        v-if="view.kind === 'counter'"
        :modelValue="counter"
        :min="view.min ?? 0"
        @update:modelValue="v => setArmyCounter(pi, v)"
      />
      <!-- Toggle reset lives top-right (compact) once fired, instead of a full-width row. -->
      <button
        v-else-if="view.kind === 'toggle' && usedCount > 0"
        class="army-head-reset"
        :aria-label="labels.trackerArmyReset"
        :title="labels.trackerArmyReset"
        @click="undoArmyToggle(pi)"
      >
        <i class="bi bi-arrow-counterclockwise"></i>
      </button>
    </div>

    <!-- Selection primitive (e.g. AdMech Doctrina): pick one option for this battle round. -->
    <div v-if="view.kind === 'selection' && view.options" class="army-options">
      <button
        v-for="o in view.options"
        :key="o.id"
        class="army-opt"
        :class="{ on: o.id === selectedId }"
        @click="setArmySelection(pi, currentRound, o.id)"
      >{{ o.name }}</button>
    </div>

    <!-- Toggle primitive (e.g. Orks Waaagh!): a once-per-battle fire (some detachments allow a
         second — see maxUses), with an undo. The effect applies only the round it was called; on a
         later round with no uses left it reads as spent. -->
    <div v-if="view.kind === 'toggle'" class="army-toggle">
      <!-- Not fired yet -->
      <button v-if="usedCount === 0" class="army-call" @click="fireArmyToggle(pi, currentRound)">
        {{ labels.trackerArmyCall }} {{ view.label }}
      </button>

      <template v-else>
        <!-- Active this round: reveal the effect -->
        <div v-if="activeThisRound && view.effect" class="army-acc">
          <button class="army-acc-head" :aria-expanded="showActive" @click="showActive = !showActive">
            <i class="bi army-acc-chev" :class="showActive ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
            <span class="army-acc-title">
              <strong>{{ labels.trackerArmyActive }}</strong> · {{ labels.trackerRoundShort }} {{ currentRound }}
            </span>
          </button>
          <CollapseTransition :show="showActive">
            <div class="army-acc-body"><RuleBody :body="view.effect.body" /></div>
          </CollapseTransition>
        </div>
        <!-- Fired, but not active this round → spent (or awaiting a further use) -->
        <p v-else class="army-used">{{ toggleUsedText }}</p>

        <button v-if="canCallAgain" class="army-again" @click="fireArmyToggle(pi, currentRound)">
          {{ view.againLabel || labels.trackerArmyCallAgain }}
        </button>
      </template>
    </div>

    <!-- The active rule right now — a counter threshold's state (Votann) or the picked option
         (AdMech). The header shows its name; its rule text expands on demand, collapsed by default. -->
    <div v-if="activeRule" class="army-acc">
      <button
        v-if="activeRule.body"
        class="army-acc-head"
        :aria-expanded="showActive"
        @click="showActive = !showActive"
      >
        <i class="bi army-acc-chev" :class="showActive ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
        <span class="army-acc-title">{{ labels.trackerArmyActive }}: <strong>{{ activeRule.name }}</strong></span>
      </button>
      <p v-else class="army-acc-static">{{ labels.trackerArmyActive }}: <strong>{{ activeRule.name }}</strong></p>
      <CollapseTransition v-if="activeRule.body" :show="showActive">
        <div class="army-acc-body"><RuleBody :body="activeRule.body" /></div>
      </CollapseTransition>
    </div>

    <!-- How the mechanic works (gain triggers + note) — collapsed by default. -->
    <div v-if="view.gains.length || view.note" class="army-acc">
      <button
        class="army-acc-head"
        :aria-expanded="showHowto"
        @click="showHowto = !showHowto"
      >
        <i class="bi army-acc-chev" :class="showHowto ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
        <span class="army-acc-title">{{ labels.trackerArmyHowto }}</span>
      </button>
      <CollapseTransition :show="showHowto">
        <div class="army-acc-body">
          <ul v-if="view.gains.length" class="army-gains">
            <li v-for="(g, i) in view.gains" :key="i">{{ g }}</li>
          </ul>
          <p v-if="view.note" class="army-note">{{ view.note }}</p>
        </div>
      </CollapseTransition>
    </div>
  </div>
</template>

<script setup>
// Per-player "track your army's rule" widget, shown inside each RoundTracker player block during a
// game. Resolves the faction's army-tracker spec against the player's active detachment(s) — a
// detachment can change the mechanic, so the spec is keyed on faction + detachment, never faction
// alone (see src/data/armyTrackers). The registry is dynamic-imported so its specs stay out of the
// tracker's critical bundle until an active game actually has a supported faction. Renders nothing
// for the (currently many) factions without a spec.
import { ref, computed, watch } from 'vue'
import NumberStepper from './NumberStepper.vue'
import CollapseTransition from '../CollapseTransition.vue'
import RuleBody from '../RuleBody.vue'
import { useTracker } from '../../composables/useTracker.js'
import { useLocale } from '../../composables/useLocale.js'
import { ui } from '../../i18n/ui.js'

const props = defineProps({
  pi: { type: Number, required: true },
})

const { current, setArmyCounter, setArmySelection, fireArmyToggle, undoArmyToggle } = useTracker()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const player = computed(() => current.value?.players?.[props.pi] || null)
const counter = computed(() => player.value?.army?.counter ?? 0)
const currentRound = computed(() => current.value?.currentRound ?? 1)
// Selection primitive: the option picked for the current round (the choice resets each round).
const selectedId = computed(() => player.value?.army?.selectionByRound?.[currentRound.value] ?? null)
// Toggle primitive: the round(s) the ability was fired in (empty = not yet). Some abilities allow
// more than one fire per battle (view.maxUses) — e.g. the Ork Bully Boyz second Waaagh!.
const calledRounds = computed(() => player.value?.army?.toggleRounds ?? [])
const usedCount = computed(() => calledRounds.value.length)
const toggleMax = computed(() => view.value?.maxUses ?? 1)
// The effect only applies the round it was called; on later rounds it's spent, not active.
const activeThisRound = computed(() => calledRounds.value.includes(currentRound.value))
// A further use (e.g. Bully Boyz' second Waaagh!) is "a second time this battle" — it must come in a
// round STRICTLY AFTER the previous call (never the same turn, never an earlier round if you scroll
// back), so only offer it once the current round is past every round already fired in.
const canCallAgain = computed(
  () =>
    usedCount.value > 0 &&
    usedCount.value < toggleMax.value &&
    currentRound.value > Math.max(...calledRounds.value),
)

// The "spent" status line. When the ability can be used more than once (e.g. Bully Boyz' 2), show
// an explicit "used N/max" so it's clear a further use remains; otherwise just "used · Round N".
const toggleUsedText = computed(() => {
  const v = view.value
  if (!v) return ''
  const l = labels.value
  const count = toggleMax.value > 1 ? ` ${usedCount.value}/${toggleMax.value}` : ''
  return `${v.label} · ${l.trackerArmyUsed}${count} · ${l.trackerRoundShort} ${calledRounds.value.join(', ')}`
})

// Accordions — both collapsed by default.
const showActive = ref(false)
const showHowto = ref(false)

// The rule active right now ({ name, body }): a counter threshold's state or the picked option.
// (The toggle effect is handled separately — it's only "active" the round it was called.)
const activeRule = computed(() => {
  const v = view.value
  if (!v) return null
  if (v.threshold) return counter.value >= v.threshold.at ? v.threshold.atOrAbove : v.threshold.below
  if (v.kind === 'selection') return v.options?.find((o) => o.id === selectedId.value) || null
  return null
})

// Raw (un-localized) resolved spec; null for unsupported factions.
const spec = ref(null)
let token = 0
async function resolve() {
  const pl = player.value
  if (!pl?.factionSlug) { spec.value = null; return }
  const t = ++token
  const { resolveArmyTracker } = await import('../../data/armyTrackers/index.js')
  if (t !== token) return // a newer resolve superseded this one
  spec.value = resolveArmyTracker(pl.factionSlug, pl.detachments || [])
}
watch(
  [() => player.value?.factionSlug, () => (player.value?.detachments || []).join('|')],
  resolve,
  { immediate: true },
)

// Localized, display-ready view of the spec (recomputes on locale change).
const view = ref(null)
watch([spec, locale], async ([s, loc]) => {
  if (!s) { view.value = null; return }
  const { localizeArmyTracker } = await import('../../data/armyTrackers/index.js')
  view.value = localizeArmyTracker(s, loc)
}, { immediate: true })
</script>

<style scoped>
.army-card {
  margin-top: 0.75rem;
  padding: 0.6rem 0.75rem;
  background: color-mix(in srgb, var(--accent) 5%, transparent);
  border: 1px solid var(--border);
  border-radius: 6px;
}

.army-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.army-heading {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.army-label {
  font-weight: 700;
  font-size: 0.92rem;
  color: var(--text-primary);
}

.army-rule-name {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
}

/* ── Selection chips (pick one option for the round) ── */
.army-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.55rem;
}

.army-opt {
  flex: 1 1 auto;
  padding: 0.35rem 0.6rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.army-opt:hover {
  border-color: var(--accent);
}

.army-opt.on {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

/* ── Toggle (once-per-battle: call / active / spent + reset) ── */
.army-toggle {
  margin-top: 0.55rem;
}

.army-call {
  width: 100%;
  padding: 0.45rem 0.7rem;
  background: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
}

.army-call:hover {
  background: var(--accent-hover);
}

.army-used {
  margin: 0;
  font-size: 0.82rem;
  color: var(--text-muted);
}

.army-again {
  margin-top: 0.5rem;
  padding: 0.35rem 0.7rem;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  border: 1px solid var(--accent);
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--accent);
}

.army-again:hover {
  background: color-mix(in srgb, var(--accent) 24%, transparent);
}

/* Compact reset in the header's top-right corner (icon-only). */
.army-head-reset {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: none;
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1;
}

.army-head-reset:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}

/* ── Accordions (active ability, how it works) ── */
.army-acc {
  margin-top: 0.5rem;
  border-top: 1px solid var(--border);
  padding-top: 0.4rem;
}

.army-acc-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  padding: 0.15rem 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  text-align: left;
}

.army-acc-chev {
  font-size: 0.7rem;
  flex-shrink: 0;
}

.army-acc-title {
  min-width: 0;
}

.army-acc-title strong {
  color: var(--text-primary);
}

.army-acc-static {
  margin: 0;
  padding: 0.15rem 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
}

.army-acc-static strong {
  color: var(--text-primary);
}

.army-acc-body {
  padding: 0.35rem 0 0.15rem;
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--text-primary);
}

.army-gains {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--text-primary);
}

.army-note {
  margin: 0.5rem 0 0;
  font-size: 0.8rem;
  line-height: 1.45;
  color: var(--text-muted);
}
</style>

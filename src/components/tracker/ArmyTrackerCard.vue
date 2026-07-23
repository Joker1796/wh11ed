<template>
  <div v-if="view" class="army-card" :style="accentVars">
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
      <!-- Pool primitive (e.g. Aeldari Battle Focus): a per-round allotment you step DOWN as you
           spend; it refills to `roundStart` at the start of each battle round (max caps it there). -->
      <NumberStepper
        v-else-if="view.kind === 'pool'"
        :modelValue="poolRemaining"
        :min="0"
        :max="roundStart"
        @update:modelValue="v => setArmyPool(pi, currentRound, v)"
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

    <!-- Pool: a one-line reminder that the tokens refill each round (to the battle-size allotment). -->
    <p v-if="view.kind === 'pool'" class="army-pool-hint">
      <i class="bi bi-arrow-repeat"></i> {{ roundStart }} · {{ labels.trackerPoolRefill }}
    </p>

    <!-- Counter spend options (GSC resurrect costs) live behind a compact field → modal, so the ~10
         unit costs don't crowd the card. The header stepper still sets the start pool + the manual +2
         (Resurgence points are never replenished mid-game — only spent down). -->
    <div v-if="view.spends" class="army-multi">
      <button class="army-field" @click="showSpendPicker = true">
        <span class="army-field-val">{{ labels.trackerArmySpend }}</span>
        <i class="bi bi-chevron-down army-field-chev"></i>
      </button>
    </div>

    <!-- Round-gated readout (Death Guard Contagion Range): a value that escalates with the round. -->
    <div v-if="view.roundReadout" class="army-readout">
      <span class="army-readout-label">{{ view.roundReadout.label }}</span>
      <span class="army-readout-val">{{ roundReadoutValue }}</span>
      <span v-if="view.roundReadout.note" class="army-readout-note">{{ view.roundReadout.note }}</span>
    </div>

    <!-- Dice-pool primitive (e.g. Sororitas Miracle dice): a bank of D6 values. Tap a die to spend
         it; add one by the value you rolled. -->
    <div v-if="view.kind === 'dice'" class="army-dice">
      <div v-if="dice.length" class="army-dice-pool">
        <button
          v-for="(d, di) in dice"
          :key="di"
          class="army-die"
          :aria-label="`${labels.trackerDiceSpend} (${d})`"
          :title="labels.trackerDiceSpend"
          @click="pendingDie = di"
        ><i class="bi" :class="`bi-dice-${d}-fill`"></i></button>
      </div>
      <p v-else class="army-dice-empty">{{ labels.trackerDiceEmpty }}</p>
      <div class="army-dice-add">
        <span class="army-dice-add-label">{{ labels.trackerDiceAdd }}</span>
        <button
          v-for="v in 6"
          :key="v"
          class="army-die-add"
          :aria-label="`${labels.trackerDiceAdd} ${v}`"
          @click="addArmyDie(pi, v)"
        ><i class="bi" :class="`bi-dice-${v}-fill`"></i></button>
      </div>
    </div>

    <!-- Selection primitive (e.g. AdMech Doctrina): pick one option for this battle round. A
         battle-long (`once`) pick locks after round 1 — the picker gives way to just its rule. -->
    <div v-if="view.kind === 'selection' && view.options && !choiceLocked" class="army-options">
      <button
        v-for="o in view.options"
        :key="o.id"
        class="army-opt"
        :class="{ on: o.id === selectedId }"
        @click="pickOption(o.id)"
      >{{ o.name }}</button>
    </div>

    <!-- Multi-selection primitive (World Eaters Blessings, Thousand Sons Rituals): activate UP TO
         `max` options this battle round, reset each round. The full option list would take a lot of
         room, so it lives behind a compact field that opens the picker; the chosen options' rules
         surface in the shared "Active" block below (same as the single-pick primitives). Each
         option's `req` (e.g. "Double 3+", "WC 7") is a reminder shown in the picker. -->
    <div v-if="view.kind === 'multi' && view.options" class="army-multi">
      <button class="army-field" @click="showBlessingPicker = true">
        <span class="army-field-val" :class="{ placeholder: !multiSelected.length }">
          {{ multiSelected.length ? multiSelected.map((o) => o.name).join(', ') : `${labels.trackerArmyActivate} ${view.max}` }}
        </span>
        <span class="army-field-count">{{ multiIds.length }}/{{ view.max }}</span>
        <i class="bi bi-chevron-down army-field-chev"></i>
      </button>
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

    <!-- How the mechanic works (gain triggers + note) — collapsed by default. Kept ABOVE the active
         rule so the "what right now" state reads last, closest to the controls above it. -->
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

    <!-- The active rule(s) right now — a counter threshold's state (Votann), the picked option
         (AdMech), or the activated Blessings/Rituals (multi). One entry → its name sits in the
         header; several → the header is just "Active" and each rule is listed with its name. Rule
         text expands on demand. -->
    <div v-if="activeRules.length" class="army-acc">
      <button
        v-if="hasActiveBody"
        class="army-acc-head"
        :aria-expanded="showActive"
        @click="showActive = !showActive"
      >
        <i class="bi army-acc-chev" :class="showActive ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
        <span class="army-acc-title">
          {{ labels.trackerArmyActive }}<template v-if="activeRules.length === 1 && activeRules[0].name">: <strong>{{ activeRules[0].name }}</strong></template>
        </span>
      </button>
      <p v-else class="army-acc-static">
        {{ labels.trackerArmyActive }}<template v-if="activeRules[0].name">: <strong>{{ activeRules[0].name }}</strong></template>
      </p>
      <CollapseTransition v-if="hasActiveBody" :show="showActive">
        <div class="army-acc-body">
          <div v-for="r in activeRules" :key="r.id || r.name" class="army-active-rule">
            <span v-if="activeRules.length > 1" class="army-active-name">{{ r.name }}</span>
            <RuleBody v-if="r.body" :body="r.body" />
          </div>
        </div>
      </CollapseTransition>
    </div>

    <!-- Blessings picker (World Eaters): the full capped multi-select list, kept out of the card. -->
    <ArmyMultiPickerModal
      v-if="showBlessingPicker && view.kind === 'multi'"
      :title="view.ruleName || view.label"
      :options="view.options"
      :selected="multiIds"
      :max="view.max"
      @toggle="(id) => toggleArmyMulti(pi, currentRound, id, view.max)"
      @close="showBlessingPicker = false"
    />

    <!-- Resurrect/spend picker (GSC): the ~10 unit costs, kept off the card. `remaining` = the live
         pool, so entries re-disable as you spend and you can bring back several without closing. -->
    <ArmySpendModal
      v-if="showSpendPicker && view.spends"
      :title="view.label"
      :spends="view.spends"
      :remaining="counter"
      @spend="(cost) => setArmyCounter(pi, counter - cost)"
      @close="showSpendPicker = false"
    />

    <!-- Spending a Miracle die is easy to mis-tap and costs a scarce resource, so it's confirmed. -->
    <ConfirmModal
      v-if="pendingDie !== null"
      :title="labels.trackerDiceSpendTitle"
      :message="labels.trackerDiceSpendConfirm"
      :confirmLabel="labels.trackerArmySpend"
      :cancelLabel="labels.trackerCancel"
      @confirm="confirmSpendDie"
      @close="pendingDie = null"
    />
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
import ArmyMultiPickerModal from './ArmyMultiPickerModal.vue'
import ArmySpendModal from './ArmySpendModal.vue'
import CollapseTransition from '../CollapseTransition.vue'
import ConfirmModal from '../ConfirmModal.vue'
import RuleBody from '../RuleBody.vue'
import { useTracker } from '../../composables/useTracker.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTheme } from '../../composables/useTheme.js'
import { factionIndexBySlug } from '../../data/factionsIndex.js'
import { ui } from '../../i18n/ui.js'

const props = defineProps({
  pi: { type: Number, required: true },
})

const {
  current, setArmyCounter, setArmySelection, toggleArmyMulti, setArmyChoice, fireArmyToggle,
  undoArmyToggle, addArmyDie, removeArmyDie, setArmyPool,
} = useTracker()
const { locale } = useLocale()
const { theme } = useTheme()
const labels = computed(() => ui[locale.value])

const player = computed(() => current.value?.players?.[props.pi] || null)
const battleSize = computed(() => current.value?.settings?.battleSize || 'strikeForce')
// Tint the whole card in the faction's own colour (the same palette FactionLayout applies to the
// faction pages): resolve light/dark against the active theme and override --accent for the subtree,
// so every accent-coloured element (dice, chips, spend badges, readout, rule name, stepper) follows.
const factionColor = computed(() => factionIndexBySlug(player.value?.factionSlug)?.color || null)
const accentVars = computed(() => {
  const c = factionColor.value
  if (!c) return undefined
  const dark = theme.value === 'dark'
  const base = dark ? c.dark : c.light
  return {
    '--accent': base,
    '--accent-hover': `color-mix(in srgb, ${base} 80%, ${dark ? 'white' : 'black'})`,
  }
})
// A counter may declare a battle-size `start` (GSC Resurgence points begin full and are spent down);
// an untouched counter defaults to that, else to its min (Drukhari/Votann start at 0).
const counterStart = computed(() => {
  const v = view.value
  if (v?.kind === 'counter' && v.start) return v.start[battleSize.value] ?? (v.min ?? 0)
  return v?.min ?? 0
})
const counter = computed(() => player.value?.army?.counter ?? counterStart.value)
const currentRound = computed(() => current.value?.currentRound ?? 1)
// Dice-pool primitive: the bank of D6 values. Spending one is confirmed (scarce, easy to mis-tap):
// tapping a die stages its index here; confirming removes it.
const dice = computed(() => player.value?.army?.dice ?? [])
const pendingDie = ref(null)
// World Eaters Blessings picker (the capped multi-select list, kept out of the card to save room).
const showBlessingPicker = ref(false)
// GSC resurrect/spend picker (the ~10 unit costs, kept off the card).
const showSpendPicker = ref(false)
function confirmSpendDie() {
  if (pendingDie.value !== null) removeArmyDie(props.pi, pendingDie.value)
  pendingDie.value = null
}
// Pool primitive (Battle Focus): tokens refill each round to the battle-size allotment plus any
// detachment bonus. An untouched round has no stored value → it starts full.
const roundStart = computed(() => {
  const v = view.value
  if (!v || v.kind !== 'pool') return 0
  return (v.perRound?.[battleSize.value] ?? 0) + (v.bonus || 0)
})
const poolRemaining = computed(
  () => player.value?.army?.poolByRound?.[currentRound.value] ?? roundStart.value,
)
// Selection primitive: the picked option. A per-round choice (AdMech Doctrina — resets each round,
// keyed by round) unless the spec is `once` (Black Templars' Templar Vows — one battle-long pick).
const selectedId = computed(() =>
  view.value?.once
    ? player.value?.army?.choice ?? null
    : player.value?.army?.selectionByRound?.[currentRound.value] ?? null,
)
// Multi-selection primitive (World Eaters Blessings): the up-to-`max` ids activated this round
// (reset each round). `multiSelected` is the chosen options in spec order, for showing their rules.
const multiIds = computed(() => player.value?.army?.multiByRound?.[currentRound.value] ?? [])
const multiSelected = computed(() =>
  view.value?.kind === 'multi' ? (view.value.options || []).filter((o) => multiIds.value.includes(o.id)) : [],
)
// Pick (or clear) the option — battle-long for `once` specs, per-round otherwise.
function pickOption(id) {
  if (view.value?.once) setArmyChoice(props.pi, id)
  else setArmySelection(props.pi, currentRound.value, id)
}
// A battle-long (`once`) pick is chosen at the start of the first battle round and committed for the
// rest of the game (Templar Vows, Death Guard's Plague). Once made, from round 2 on the picker is
// hidden and only the chosen option's rule is shown; round 1 stays editable (scroll back to change).
const choiceLocked = computed(
  () => !!view.value?.once && currentRound.value !== 1 && selectedId.value != null,
)
// Round-gated readout (Contagion Range): the listed round's value, else the fallback.
const roundReadoutValue = computed(() => {
  const r = view.value?.roundReadout
  if (!r) return null
  return r.byRound?.[currentRound.value] ?? r.fallback
})
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

// The active-rule list shown in the shared "Active" block: the multi primitive's activated options
// (Blessings/Rituals) or, for the single-pick primitives, the one active rule. Each entry is
// { name, body[, id, req] }. (The toggle effect is handled separately — only "active" its round.)
const activeRules = computed(() => {
  if (view.value?.kind === 'multi') return multiSelected.value
  return activeRule.value ? [activeRule.value] : []
})
const hasActiveBody = computed(() => activeRules.value.some((r) => r.body))

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

// Once a battle-long pick locks (round 2+), surface its rule expanded — it's the card's main content
// then, with the picker gone. The user can still collapse it. Declared after `view` (which
// choiceLocked reads) so the immediate run doesn't touch it before initialization.
watch(choiceLocked, (locked) => { if (locked) showActive.value = true }, { immediate: true })
</script>

<style scoped>
.army-card {
  margin-top: 0.75rem;
  padding: 0.6rem 0.75rem;
  /* --accent is overridden inline per faction (accentVars), so the tint + border carry the
     faction's own colour; a left stripe makes the coloured block read at a glance. */
  background: color-mix(in srgb, var(--accent) 7%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, var(--border));
  border-left: 3px solid var(--accent);
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

/* ── Multi-select (World Eaters Blessings: activate up to N per round) ──
   A compact field opens the picker modal, so the six options don't crowd the card. */
.army-multi {
  margin-top: 0.55rem;
}

.army-field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.4rem 0.6rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  color: var(--text-primary);
  transition: border-color 0.15s;
}

.army-field:hover {
  border-color: var(--accent);
}

/* Selected Blessing names as plain wrapping text — wraps instead of a single nowrap line, so two
   long names still fit a 320px screen without overflowing the card. */
.army-field-val {
  flex: 1 1 auto;
  min-width: 0;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-primary);
  overflow-wrap: anywhere;
}

.army-field-val.placeholder {
  font-weight: 500;
  color: var(--text-muted);
}

.army-field-count {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent);
}

.army-field-chev {
  flex-shrink: 0;
  font-size: 0.7rem;
  color: var(--text-muted);
}

/* Several active rules (multi: activated Blessings/Rituals) stacked inside the "Active" block body,
   each labelled with its own name. A single active rule needs no label (its name is in the header). */
.army-active-rule + .army-active-rule {
  margin-top: 0.5rem;
}

.army-active-name {
  display: block;
  font-weight: 700;
  color: var(--accent);
  font-size: 0.8rem;
  margin-bottom: 0.1rem;
}

/* ── Pool refill hint (Battle Focus: tokens refill each round) ── */
.army-pool-hint {
  margin: 0.4rem 0 0;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted);
}

.army-pool-hint .bi {
  font-size: 0.68rem;
}


/* ── Round-gated readout (Contagion Range: value escalates with the battle round) ── */
.army-readout {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.5rem;
}

.army-readout-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-primary);
}

.army-readout-val {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--accent);
}

.army-readout-note {
  font-size: 0.7rem;
  color: var(--text-muted);
}

/* ── Dice pool (Miracle dice: bank of D6 values; tap a die to spend) ── */
.army-dice {
  margin-top: 0.55rem;
}

.army-dice-pool {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}

/* The dice face IS the button — no box/border; transparent padding keeps a comfortable tap target. */
.army-die {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--accent);
  line-height: 1;
  transition: transform 0.1s, color 0.15s;
}

.army-die .bi {
  font-size: 2rem;
  line-height: 1;
}

.army-die:hover {
  color: var(--accent-hover);
}

.army-die:active {
  transform: scale(0.88);
}

.army-dice-empty {
  margin: 0 0 0.5rem;
  font-size: 0.78rem;
  color: var(--text-muted);
}

.army-dice-add {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem;
}

.army-dice-add-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--text-muted);
  margin-right: 0.15rem;
}

/* Add row: the same bare-icon buttons, muted and smaller to read as "roll to add", not your pool. */
.army-die-add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  line-height: 1;
  transition: color 0.15s, transform 0.1s;
}

.army-die-add .bi {
  font-size: 1.4rem;
  line-height: 1;
}

.army-die-add:hover {
  color: var(--accent);
}

.army-die-add:active {
  transform: scale(0.88);
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

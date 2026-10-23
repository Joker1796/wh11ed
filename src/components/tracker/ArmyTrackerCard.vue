<template>
  <div
    v-if="view"
    class="army-card"
    :class="{ bare }"
  >
    <div class="army-head">
      <div class="army-heading">
        <span class="army-label">{{ cardLabel }}</span>
        <span
          v-if="view.ruleName"
          class="army-rule-name"
        >{{ view.ruleName }}</span>
      </div>
      <ExpandTransition>
        <NumberStepper
          v-if="view.kind === 'counter' && !view.spends"
          :model-value="counter"
          :min="view.min ?? 0"
          :inert="lock"
          @update:model-value="v => setArmyCounter(pi, v, mi, { ...actLog, from: counter })"
        />
        <!-- A counter with dedicated spend buttons (GSC): the spend picker + the round-1 bonus now
             cover every way the value changes, so manual +/- would just risk drifting from the actual
             spend log — read-only, flashing on change like the stepper did. -->
        <span
          v-else-if="view.kind === 'counter' && view.spends"
          ref="counterEl"
          class="army-counter-readonly"
        >{{ counter }}</span>
        <!-- Pool primitive (e.g. Aeldari Battle Focus): a per-round allotment you step DOWN as you
             spend; it refills to `roundStart` at the start of each battle round (max caps it there). -->
        <NumberStepper
          v-else-if="view.kind === 'pool'"
          :model-value="poolRemaining"
          :min="0"
          :max="roundStart"
          :inert="lock"
          @update:model-value="v => setArmyPool(pi, currentRound, v, mi, { ...actLog, from: poolRemaining })"
        />
        <!-- Toggle reset lives top-right (compact) once fired, instead of a full-width row. -->
        <button
          v-else-if="view.kind === 'toggle' && usedCount > 0"
          class="army-head-reset"
          :disabled="!!undoWhy('armyFire', mi)"
          :aria-label="labels.trackerArmyReset"
          :title="undoWhy('armyFire', mi) || labels.trackerArmyReset"
          :inert="lock"
          @click="undoArmyToggle(pi, mi)"
        >
          <i class="wi wi-undo" />
        </button>
      </ExpandTransition>
    </div>

    <!-- Pool: a one-line reminder that the tokens refill each round (to the battle-size allotment). -->
    <p
      v-if="view.kind === 'pool'"
      class="army-pool-hint"
    >
      <i class="wi wi-sync" /> {{ roundStart }} · {{ labels.trackerPoolRefill }}
    </p>

    <!-- One-time round-1 bonus (GSC's Deeds That Speak to the Masses enhancement): the tracker
         doesn't record enhancement picks, so this is a manual bump the player fires if they took it.
         It's a STARTING-pool bonus — meaningless once the battle is under way — so it's gated to
         round 1 entirely: applied or not, it's gone from round 2 onwards. -->
    <div
      v-if="view.startBonus && currentRound === 1"
      class="army-bonus"
      :inert="lock"
    >
      <ExpandTransition>
        <button
          v-if="!bonusApplied"
          class="army-bonus-btn"
          data-press
          @click="applyBonus"
        >
          <i class="wi wi-add-circle" /> +{{ view.startBonus.amount }} {{ view.startBonus.label }}
        </button>
        <div
          v-else
          class="army-bonus-done"
        >
          <span><i class="wi wi-ok" /> +{{ view.startBonus.amount }} {{ view.startBonus.label }}</span>
          <button
            class="army-head-reset"
            data-press
            :disabled="!!undoWhy('armyBonus', mi)"
            :aria-label="labels.trackerArmyReset"
            :title="undoWhy('armyBonus', mi) || labels.trackerArmyReset"
            @click="undoBonus"
          >
            <i class="wi wi-undo" />
          </button>
        </div>
      </ExpandTransition>
    </div>

    <!-- Counter spend options (GSC resurrect costs) live behind a compact field → modal, so the ~10
         unit costs don't crowd the card. The header stepper still sets the start pool + the round-1
         bonus above (Resurgence points are never replenished mid-game — only spent down). -->
    <div
      v-if="view.spends"
      class="army-multi"
      :inert="lock"
    >
      <button
        class="army-field"
        @click="showSpendPicker = true"
      >
        <span class="army-field-val">{{ labels.trackerArmySpend }}</span>
        <i class="wi wi-chevron-down army-field-chev" />
      </button>
    </div>

    <!-- Round-gated readout (Death Guard Contagion Range): a value that escalates with the round. -->
    <div
      v-if="view.roundReadout"
      class="army-readout"
    >
      <span class="army-readout-label">{{ view.roundReadout.label }}</span>
      <span class="army-readout-val">{{ roundReadoutValue }}</span>
      <span
        v-if="view.roundReadout.note"
        class="army-readout-note"
      >{{ view.roundReadout.note }}</span>
    </div>

    <!-- Dice-pool primitive (e.g. Sororitas Miracle dice): a bank of D6 values. Tap a die to spend
         it; add one by the value you rolled. -->
    <div
      v-if="view.kind === 'dice'"
      class="army-dice"
      :inert="lock"
    >
      <ExpandTransition>
        <TransitionGroup
          v-if="dice.length"
          tag="div"
          name="list"
          class="army-dice-pool"
          @before-leave="pinLeaving"
        >
          <button
            v-for="{ d, di, key } in shownDice"
            :key="key"
            class="army-die"
            data-press
            :aria-label="`${labels.trackerDiceSpend} (${d})`"
            :title="labels.trackerDiceSpend"
            @click="pendingDie = di"
          >
            <i
              class="wi"
              :class="`wi-dice-${d}`"
            />
          </button>
        </TransitionGroup>
        <p
          v-else
          class="army-dice-empty"
        >
          {{ labels.trackerDiceEmpty }}
        </p>
      </ExpandTransition>
      <div class="army-dice-add">
        <span class="army-dice-add-label">{{ labels.trackerDiceAdd }}</span>
        <button
          v-for="v in 6"
          :key="v"
          class="army-die-add"
          data-press
          :aria-label="`${labels.trackerDiceAdd} ${v}`"
          @click="addArmyDie(pi, v, mi, actLog)"
        >
          <i
            class="wi"
            :class="`wi-dice-${v}`"
          />
        </button>
      </div>
    </div>

    <!-- Selection primitive (e.g. AdMech Doctrina): pick one option for this battle round. A
         battle-long (`once`) pick locks after round 1 — the picker gives way to just its rule. -->
    <ExpandTransition>
      <div
        v-if="view.kind === 'selection' && view.options && !choiceLocked"
        class="army-options"
        :inert="lock"
      >
        <!-- A per-battle budget (SM Combat Doctrines) greys a spent option and says where it went,
             rather than hiding it — the reason is the round it was taken in. -->
        <button
          v-for="o in view.options"
          :key="o.id"
          class="army-opt"
          data-press
          :class="{ on: o.id === selectedId, spent: spent(o.id) }"
          :disabled="spent(o.id)"
          @click="pickOption(o.id)"
        >
          {{ o.name }}
          <span
            v-if="budget?.[o.id]?.usedIn.length"
            class="army-opt-used"
          >
            {{ labels.trackerArmyUsedIn.replace('{rounds}', budget[o.id].usedIn.join(', ')) }}
          </span>
        </button>
      </div>
    </ExpandTransition>

    <!-- Multi-selection primitive (World Eaters Blessings, Thousand Sons Rituals): activate UP TO
         `max` options this battle round, reset each round. The full option list would take a lot of
         room, so it lives behind a compact field that opens the picker; the chosen options' rules
         surface in the shared "Active" block below (same as the single-pick primitives). Each
         option's `req` (e.g. "Double 3+", "WC 7") is a reminder shown in the picker. -->
    <div
      v-if="view.kind === 'multi' && view.options"
      class="army-multi"
      :inert="lock"
    >
      <button
        class="army-field"
        @click="showBlessingPicker = true"
      >
        <span
          class="army-field-val"
          :class="{ placeholder: !multiSelected.length }"
        >
          {{ multiSelected.length ? multiSelected.map((o) => o.name).join(', ') : `${labels.trackerArmyActivate} ${view.max}` }}
        </span>
        <span class="army-field-count">{{ multiIds.length }}/{{ view.max }}</span>
        <i class="wi wi-chevron-down army-field-chev" />
      </button>
    </div>

    <!-- Toggle primitive (e.g. Orks Waaagh!): a once-per-battle fire (some detachments allow a
         second — see maxUses), with an undo. The effect applies only the round it was called; on a
         later round with no uses left it reads as spent. -->
    <div
      v-if="view.kind === 'toggle'"
      class="army-toggle"
    >
      <!-- Not fired yet -->
      <ExpandTransition>
        <button
          v-if="usedCount === 0"
          class="army-call"
          data-press
          :inert="lock"
          @click="fireArmyToggle(pi, currentRound, mi, actLog)"
        >
          {{ labels.trackerArmyCall }} {{ view.label }}
        </button>

        <template v-else>
          <!-- Active this round: reveal the effect -->
          <ExpandTransition>
            <div
              v-if="activeThisRound && view.effect"
              class="army-acc"
            >
              <button
                class="army-acc-head"
                :aria-expanded="showActive"
                @click="showActive = !showActive"
              >
                <i
                  class="wi army-acc-chev"
                  :class="showActive ? 'wi-chevron-down' : 'wi-chevron-right'"
                />
                <span class="army-acc-title">
                  <strong>{{ labels.trackerArmyActive }}</strong> · {{ labels.trackerRoundShort }} {{ currentRound }}
                </span>
              </button>
              <CollapseTransition :show="showActive">
                <div class="army-acc-body">
                  <RuleBody :body="view.effect.body" />
                </div>
              </CollapseTransition>
            </div>
            <!-- Fired, but not active this round → spent (or awaiting a further use) -->
            <p
              v-else
              class="army-used"
            >
              {{ toggleUsedText }}
            </p>
          </ExpandTransition>

          <ExpandTransition>
            <button
              v-if="canCallAgain"
              class="army-again"
              data-press
              :inert="lock"
              @click="fireArmyToggle(pi, currentRound, mi, actLog)"
            >
              {{ view.againLabel || labels.trackerArmyCallAgain }}
            </button>
          </ExpandTransition>
        </template>
      </ExpandTransition>
    </div>

    <!-- How the mechanic works (gain triggers + note) — collapsed by default. Kept ABOVE the active
         rule so the "what right now" state reads last, closest to the controls above it. Only for
         interactive specs — the reference view (no counter) has its own "How it works" below,
         showing the rule's actual text instead of a hand-written gains/note summary. -->
    <div
      v-if="view.kind !== 'reference' && (view.gains.length || view.note)"
      class="army-acc"
    >
      <button
        class="army-acc-head"
        :aria-expanded="showHowto"
        @click="showHowto = !showHowto"
      >
        <i
          class="wi army-acc-chev"
          :class="showHowto ? 'wi-chevron-down' : 'wi-chevron-right'"
        />
        <span class="army-acc-title">{{ labels.trackerArmyHowto }}</span>
      </button>
      <CollapseTransition :show="showHowto">
        <div class="army-acc-body">
          <ul
            v-if="view.gains.length"
            class="army-gains"
          >
            <li
              v-for="(g, i) in view.gains"
              :key="i"
            >
              {{ g }}
            </li>
          </ul>
          <p
            v-if="view.note"
            class="army-note"
          >
            {{ view.note }}
          </p>
        </div>
      </CollapseTransition>
    </div>

    <!-- Reference-only view (no interactive spec for this faction): the army rule's own text,
         collapsed behind the same "How it works" accordion. Sourced from the Combat Patrol box's
         copy during a CP game, the normal Codex otherwise (see loadReferenceView). No flavor/lore
         text — this is a mid-game rules lookup, not a reference page. -->
    <template v-if="view.kind === 'reference'">
      <div class="army-acc">
        <button
          class="army-acc-head"
          :aria-expanded="showHowto"
          @click="showHowto = !showHowto"
        >
          <i
            class="wi army-acc-chev"
            :class="showHowto ? 'wi-chevron-down' : 'wi-chevron-right'"
          />
          <span class="army-acc-title">{{ labels.trackerArmyHowto }}</span>
        </button>
        <CollapseTransition :show="showHowto">
          <div class="army-acc-body">
            <RuleBody :body="view.body" />
            <p
              v-if="view.example"
              class="army-ref-example"
            >
              {{ view.example }}
            </p>
          </div>
        </CollapseTransition>
      </div>
    </template>

    <!-- The rules that go with the army's (owner, 2026-09-29): its full text where the card above is a
         tracker (a reference card already IS the text), and each chosen detachment's rule — one
         fold each, closed at first. Handed in by the Armies panel (`texts`). -->
    <div
      v-for="t in shownTexts"
      :key="t.key"
      class="army-acc"
    >
      <button
        class="army-acc-head"
        :aria-expanded="openTexts.includes(t.key)"
        @click="toggleText(t.key)"
      >
        <i
          class="wi army-acc-chev"
          :class="openTexts.includes(t.key) ? 'wi-chevron-down' : 'wi-chevron-right'"
        />
        <span class="army-acc-title">{{ t.title }}</span>
      </button>
      <CollapseTransition :show="openTexts.includes(t.key)">
        <div class="army-acc-body">
          <RuleBody :body="t.body" />
        </div>
      </CollapseTransition>
    </div>

    <!-- Resurrected units (GSC): a running log of what the spend picker bought, so the Resurgence
         pool's history is visible instead of just a number going down. Each entry is undoable (refunds
         the cost, removes the entry) — e.g. a mis-tap in the picker. -->
    <ExpandTransition>
      <div
        v-if="resurrected.length"
        class="army-acc"
      >
        <button
          class="army-acc-head"
          :aria-expanded="showResurrected"
          @click="showResurrected = !showResurrected"
        >
          <i
            class="wi army-acc-chev"
            :class="showResurrected ? 'wi-chevron-down' : 'wi-chevron-right'"
          />
          <span class="army-acc-title">{{ labels.trackerArmyResurrected }} · {{ resurrected.length }}</span>
        </button>
        <CollapseTransition :show="showResurrected">
          <TransitionGroup
            tag="ul"
            name="list"
            class="army-acc-body army-resurrect-list"
            @before-leave="pinLeaving"
          >
            <li
              v-for="(r, i) in resurrected"
              :key="resurrectKeys[i] ?? i"
              class="army-resurrect-row"
            >
              <span class="army-resurrect-label">{{ r.label }}</span>
              <span class="army-resurrect-cost">−{{ r.cost }}</span>
              <button
                class="army-resurrect-undo"
                data-press
                :disabled="!!undoWhy('armySpend', i, mi)"
                :aria-label="labels.trackerArmyReset"
                :title="undoWhy('armySpend', i, mi) || labels.trackerArmyReset"
                :inert="lock"
                @click="undoArmyResurrect(pi, i, mi)"
              >
                <i class="wi wi-undo" />
              </button>
            </li>
          </TransitionGroup>
        </CollapseTransition>
      </div>
    </ExpandTransition>

    <!-- The active rule(s) right now — a counter threshold's state (Votann), the picked option
         (AdMech), or the activated Blessings/Rituals (multi). One entry → its name sits in the
         header; several → the header is just "Active" and each rule is listed with its name. Rule
         text expands on demand. -->
    <ExpandTransition>
      <div
        v-if="activeRules.length"
        class="army-acc"
      >
        <button
          v-if="hasActiveBody"
          class="army-acc-head"
          :aria-expanded="showActive"
          @click="showActive = !showActive"
        >
          <i
            class="wi army-acc-chev"
            :class="showActive ? 'wi-chevron-down' : 'wi-chevron-right'"
          />
          <span class="army-acc-title">
            {{ labels.trackerArmyActive }}<template v-if="activeRules.length === 1 && activeRules[0].name">: <strong>{{ activeRules[0].name }}</strong></template>
          </span>
        </button>
        <p
          v-else
          class="army-acc-static"
        >
          {{ labels.trackerArmyActive }}<template v-if="activeRules[0].name">
            : <strong>{{ activeRules[0].name }}</strong>
          </template>
        </p>
        <CollapseTransition
          v-if="hasActiveBody"
          :show="showActive"
        >
          <TransitionGroup
            tag="div"
            name="list"
            class="army-acc-body army-active-list"
            @before-leave="pinLeaving"
          >
            <div
              v-for="r in activeRules"
              :key="r.id || r.name"
              class="army-active-rule"
            >
              <span
                v-if="activeRules.length > 1"
                class="army-active-name"
              >{{ r.name }}</span>
              <RuleBody
                v-if="r.body"
                :body="r.body"
              />
            </div>
          </TransitionGroup>
        </CollapseTransition>
      </div>
    </ExpandTransition>

    <!-- Blessings picker (World Eaters): the full capped multi-select list, kept out of the card. -->
    <ArmyMultiPickerModal
      v-if="showBlessingPicker && view.kind === 'multi'"
      :title="view.ruleName || view.label"
      :options="view.options"
      :selected="multiIds"
      :max="view.max"
      @toggle="(id) => toggleArmyMulti(pi, currentRound, id, view.max, mi, pickLog)"
      @close="showBlessingPicker = false"
    />

    <!-- Resurrect/spend picker (GSC): the ~10 unit costs, kept off the card. `remaining` = the live
         pool, so entries re-disable as you spend and you can bring back several without closing. -->
    <ArmySpendModal
      v-if="showSpendPicker && view.spends"
      :title="view.label"
      :spends="view.spends"
      :remaining="counter"
      @spend="(s) => resurrectArmyUnit(pi, counter - s.cost, s.label, s.cost, mi, actLog)"
      @close="showSpendPicker = false"
    />

    <!-- Spending a Miracle die is easy to mis-tap and costs a scarce resource, so it's confirmed. -->
    <ConfirmModal
      v-if="pendingDie !== null"
      :title="labels.trackerDiceSpendTitle"
      :message="labels.trackerDiceSpendConfirm"
      :confirm-label="labels.trackerArmySpend"
      :cancel-label="labels.trackerCancel"
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
import ExpandTransition from '../ExpandTransition.vue'
import { ref, computed, watch } from 'vue'
import NumberStepper from './NumberStepper.vue'
import ArmyMultiPickerModal from './ArmyMultiPickerModal.vue'
import ArmySpendModal from './ArmySpendModal.vue'
import CollapseTransition from '../CollapseTransition.vue'
import ConfirmModal from '../ConfirmModal.vue'
import RuleBody from '../RuleBody.vue'
import { useTracker, memberAt, membersOf, isYouSide, battleOf } from '../../composables/useTracker.js'
import { useLocale } from '../../composables/useLocale.js'
import { useFlashOnChange } from '../../composables/useFlashOnChange.js'
import { selectionBudget } from '../../data/armyTrackers/selectionBudget.js'
import { combatPatrolBoxIn } from '../../composables/combatPatrolBox.js'
import { ui } from '../../i18n/ui.js'
import { provideSideScope } from '../../composables/modalScope.js'
import { useStableKeys, pinLeaving } from '../../composables/stableKeys.js'

const props = defineProps({
  pi: { type: Number, required: true },
  // Doubles member index — which army of the side this card tracks. null = the side itself:
  // singles, or a unified doubles force's SHARED pool (one card, side-level state).
  mi: { type: Number, default: null },
  // A side another phone plays (RoundTracker, the shared game): every control that CHANGES the
  // state is inert — steppers, dice, pickers, the call and its undo — while everything that reads
  // it stays live: the "How it works" text, the active rule, the spent log. The other side's army
  // rule is a thing to look up mid-game, whoever is keeping its count.
  readonly: { type: Boolean, default: false },
  // Rules to read under the tracker: [{ key, title, body, army? }] — `army` marks the army rule's
  // own text, dropped where the card already shows it (a reference card, no tracker spec).
  texts: { type: Array, default: () => [] },
  // Inside a card of its own (the Armies panel's army card): no frame, the host draws it.
  bare: { type: Boolean, default: false },
})
// `inert` is a presence attribute: undefined, never false.
const lock = computed(() => (props.readonly ? true : undefined))

const {
  current, setArmyCounter, setArmySelection, toggleArmyMulti, setArmyChoice, fireArmyToggle,
  undoArmyToggle, addArmyDie, removeArmyDie, setArmyPool,
  resurrectArmyUnit, undoArmyResurrect, applyArmyBonus, undoArmyBonus, strictUndoWhy,
} = useTracker()
// This army's counters and pickers in its side's colour, not the turn's.
provideSideScope(() => (current.value?.players?.[props.pi] ? !isYouSide(current.value.players[props.pi], props.pi) : null))
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const side = computed(() => current.value?.players?.[props.pi] || null)
// The state holder every army.* read/write below goes through — the side, or one doubles member.
const player = computed(() => memberAt(side.value, props.mi))
// Where the SPEC comes from. The holder itself when it names a faction; a unified doubles side
// names none (army identity lives on the members), so its first member speaks for the shared
// force — same faction on both by construction — with the two members' detachments pooled.
const specFaction = computed(
  () => player.value?.factionSlug ?? (side.value ? membersOf(side.value)[0]?.factionSlug : null) ?? null,
)
const specDetachments = computed(() =>
  player.value?.factionSlug
    ? (player.value.detachments || [])
    : (side.value ? membersOf(side.value).flatMap((m) => m.detachments || []) : []),
)
// Doubles per-member card: the label itself names whose army this is — "Army rule: Ann"
// (the shared unified card keeps the bare label: it is the team's). Built in script, not
// from adjacent template fragments.
const memberTag = computed(() => {
  if (props.mi == null) return null
  return player.value?.name || (props.mi === 0 ? labels.value.trackerPlayer1 : labels.value.trackerPlayer2)
})
const cardLabel = computed(() =>
  memberTag.value ? `${view.value?.label}: ${memberTag.value}` : view.value?.label,
)
// Combat Patrol isn't one of the normal battle sizes (settings.battleSize is left at whatever
// it was before the "Тип игры" toggle was switched) — resolve to a dedicated id so specs with a
// battle-size-keyed `start`/`perRound` (GSC, Aeldari) can carry a `combatPatrol` entry instead of
// silently reading the wrong (or a stale) battle size's numbers.
const battleSize = computed(() =>
  // A custom size reads the printed size its points fall within (battleOf's `base`).
  current.value?.settings?.combatPatrol ? 'combatPatrol' : battleOf(current.value?.settings).base
)
// A counter may declare a battle-size `start` (GSC Resurgence points begin full and are spent down);
// an untouched counter defaults to that, else to its min (Drukhari/Votann start at 0).
const counterStart = computed(() => {
  const v = view.value
  if (v?.kind === 'counter' && v.start) return v.start[battleSize.value] ?? (v.min ?? 0)
  return v?.min ?? 0
})
const counter = computed(() => player.value?.army?.counter ?? counterStart.value)
// Read-only display for a `spends`-driven counter (GSC) — no stepper to flash it for us anymore
// (wired up below, after `view` is declared — see the comment on the choiceLocked watcher).
const counterEl = ref(null)
const currentRound = computed(() => current.value?.currentRound ?? 1)
// GSC resurrect spend log (see resurrectArmyUnit) — what the spend picker bought, undoable per entry.
const resurrected = computed(() => player.value?.army?.resurrected ?? [])
const showResurrected = ref(false)
// GSC round-1 start-bonus (Deeds That Speak to the Masses) — applied at most once per game.
const bonusApplied = computed(() => player.value?.army?.bonusApplied ?? false)
function applyBonus() {
  applyArmyBonus(props.pi, counter.value + view.value.startBonus.amount, props.mi, { label: view.value.startBonus.label || actLog.value.label })
}
// Strict rules: an army-rule use taken back only while it is the side's last act — the button
// greys and its title says why (strictRules.js).
function undoWhy(kind, a, b) {
  const why = strictUndoWhy(kind, props.pi, a, b)
  return why ? labels.value[`trackerStrict_${why}`] : ''
}
function undoBonus() {
  undoArmyBonus(props.pi, counter.value - view.value.startBonus.amount, props.mi)
}
// Dice-pool primitive: the bank of D6 values. Spending one is confirmed (scarce, easy to mis-tap):
// tapping a die stages its index here; confirming removes it.
const dice = computed(() => player.value?.army?.dice ?? [])
// Shown by value, low to high, equal ones side by side (owner, 2026-10-20) — a player looks for "a
// 6" or "two 3s". Only the display is sorted: each die keeps its stored index, which is what a
// spend removes.
const shownDice = computed(() => dice.value.map((d, di) => ({ d, di, key: dieKeys.value[di] ?? `i${di}` })).sort((a, b) => a.d - b.d || a.di - b.di))
// A key per die that outlives a spend, so the dice slide rather than redraw (stableKeys.js).
const dieKeys = useStableKeys(() => dice.value)
// The spend history (GSC) the same way: an undone entry in the middle must not shift the others.
const resurrectKeys = useStableKeys(() => resurrected.value, (a, b) => a.label === b.label && a.cost === b.cost)
const pendingDie = ref(null)
// World Eaters Blessings picker (the capped multi-select list, kept out of the card to save room).
const showBlessingPicker = ref(false)
// GSC resurrect/spend picker (the ~10 unit costs, kept off the card).
const showSpendPicker = ref(false)
function confirmSpendDie() {
  if (pendingDie.value !== null) removeArmyDie(props.pi, pendingDie.value, props.mi, actLog.value)
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
// keyed by round) unless the spec is `once` (Death Guard's Plague — one battle-long pick).
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
// Per-battle budget (SM Combat Doctrines): which options are spent in other rounds. The pick of the
// round on screen is never spent — it can always be kept, cleared or swapped.
const budget = computed(() =>
  view.value?.kind === 'selection' && !view.value.once
    ? selectionBudget(view.value, player.value?.army?.selectionByRound, currentRound.value)
    : null,
)
function spent(id) {
  return !!budget.value && id !== selectedId.value && !budget.value[id]?.open
}
// Pick (or clear) the option — battle-long for `once` specs, per-round otherwise.
function pickOption(id) {
  if (view.value?.once) setArmyChoice(props.pi, id, props.mi, pickLog.value)
  else setArmySelection(props.pi, currentRound.value, id, props.mi, pickLog.value)
}
// A battle-long (`once`) pick is chosen at the start of the first battle round and committed for the
// rest of the game (Death Guard's Plague). Once made, from round 2 on the picker is
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
const shownTexts = computed(() => props.texts.filter((t) => !(t.army && view.value?.kind === 'reference')))
const openTexts = ref([])
// Open one of the card's rules (the Phase tab's line to it, via ArmiesPanel): a text by its key,
// or the army rule — its own fold where the card is a tracker, "How it works" where the card is
// the rule itself.
function reveal(key) {
  if (shownTexts.value.some((t) => t.key === key)) {
    if (!openTexts.value.includes(key)) openTexts.value = [...openTexts.value, key]
  } else if (key === 'army') showHowto.value = true
}
defineExpose({ reveal })
function toggleText(key) {
  openTexts.value = openTexts.value.includes(key) ? openTexts.value.filter((k) => k !== key) : [...openTexts.value, key]
}

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
// What the game log tells of this card's acts (useTracker's army mutators): the rule's label in
// both languages, off the spec — the log is read later, maybe in the other language — and the
// options' names for a pick.
const actLog = computed(() => ({ label: spec.value?.label ?? view.value?.label ?? '' }))
const pickLog = computed(() => ({ ...actLog.value, options: (spec.value?.options || []).map((o) => ({ id: o.id, label: o.name })) }))
let token = 0
async function resolve() {
  if (!specFaction.value) { spec.value = null; return }
  const t = ++token
  const { resolveArmyTracker } = await import('../../data/armyTrackers/index.js')
  if (t !== token) return // a newer resolve superseded this one
  spec.value = resolveArmyTracker(specFaction.value, specDetachments.value)
}
watch(
  [specFaction, () => specDetachments.value.join('|')],
  resolve,
  { immediate: true },
)

// Read-only reference view for factions with no interactive spec: just the army rule's own
// text (name/body/example — no flavor/lore, this is a mid-game rules lookup), sourced from the
// Combat Patrol box's copy during a CP game (a few boxes' copies genuinely differ from the Codex
// — Necrons/GSC/Grey Knights — the rest are verbatim-identical, so reading from there
// unconditionally in CP mode is always correct) or from the normal faction data otherwise. Unlike
// the interactive specs this needs no detachment resolution — every faction has exactly one army
// rule.
async function loadReferenceView(slug, loc) {
  if (current.value?.settings?.combatPatrol) {
    const { combatPatrol } = await import('../../data/combatPatrol.js')
    // The box this army plays — its detachment names it (a faction can have several boxes).
    const f = combatPatrolBoxIn(combatPatrol, loc, { factionSlug: slug, detachments: specDetachments.value })
    if (!f) return null
    return {
      kind: 'reference',
      label: labels.value.trackerArmyRule,
      ruleName: f.armyRule.name,
      body: f.armyRule.body,
      example: f.armyRule.example,
    }
  }
  const { loadFaction } = await import('../../data/factions/index.js')
  const data = await loadFaction(slug)
  if (!data) return null
  let armyRule = data.en.armyRule
  let nameRu
  if (loc === 'ru') {
    const { loadFactionRu, deepOverlay } = await import('../../data/factions/ru/index.js')
    const mod = await loadFactionRu(slug)
    if (mod) {
      armyRule = deepOverlay(data.en.armyRule, mod.default?.armyRule)
      nameRu = mod.armyRuleNameRu
    }
  }
  return {
    kind: 'reference',
    label: labels.value.trackerArmyRule,
    ruleName: nameRu || armyRule.name,
    body: armyRule.body,
    example: armyRule.example,
  }
}

// Localized, display-ready view of the spec (recomputes on locale change) — or, for factions
// with no interactive spec, the read-only reference view above. Guarded with a token (same
// pattern as `resolve()`): on mount, `spec` is still null while resolve()'s own dynamic import is
// in flight, so this watcher's first (immediate) run takes the reference-view branch — if that
// branch's async work (up to 2 chained imports for RU) finishes AFTER a later run that resolved
// the real tracked spec, it would silently overwrite the correct counter view with stale
// reference text. The token makes only the most recent run's result apply.
const view = ref(null)
let viewToken = 0
watch(
  [spec, locale, specFaction, () => current.value?.settings?.combatPatrol],
  async ([s, loc, slug]) => {
    const t = ++viewToken
    let next
    if (s) {
      const { localizeArmyTracker } = await import('../../data/armyTrackers/index.js')
      next = localizeArmyTracker(s, loc)
    } else {
      next = slug ? await loadReferenceView(slug, loc) : null
    }
    if (t !== viewToken) return // a newer run superseded this one
    view.value = next
  },
  { immediate: true },
)

// Once a battle-long pick locks (round 2+), surface its rule expanded — it's the card's main content
// then, with the picker gone. The user can still collapse it. Declared after `view` (which
// choiceLocked reads) so the immediate run doesn't touch it before initialization.
watch(choiceLocked, (locked) => { if (locked) showActive.value = true }, { immediate: true })

// Wired up here (not next to `counter`'s own declaration) for the same reason as the watcher just
// above: `counter` reads `counterStart`, which reads `view.value`, and `watch()` evaluates its
// source once immediately (even without `{ immediate: true }`) to capture the baseline — doing that
// before `view` exists throws.
useFlashOnChange(counter, counterEl)
</script>

<style scoped>
.army-card {
  margin-top: 0.75rem;
  padding: 0.6rem 0.75rem;
  /* In its side's colour (owner, 2026-09-29): --accent comes from the Armies panel, set to the
     chosen army's side colour — its faction's by default, or this phone's pick (sideColors.js).
     A left stripe makes the coloured block read at a glance. */
  background: color-mix(in srgb, var(--accent) 7%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, var(--border));
  border-left: 3px solid var(--accent);
}
.army-card.bare { margin-top: 0; padding: 0; background: none; border: 0; }
/* On the Army tab's card (bare) the folds sit closer (owner, 2026-10-10: the rule's head, "How it
   works" and the detachment line each stood a line apart): a hairline and a small step, not a gap. */
.army-card.bare .army-acc { margin-top: 0.3rem; padding-top: 0.25rem; }
.army-card.bare .army-acc-head { padding: 0.1rem 0; }

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

/* Read-only counter (a `spends`-driven counter like GSC's — no manual +/-, see NumberStepper's
   .step-val for the sibling styling this mirrors). */
.army-counter-readonly {
  min-width: 2.2ch;
  text-align: center;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-primary);
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
  cursor: pointer;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  transition: background var(--motion-fast), border-color var(--motion-fast), color var(--motion-fast);
}

.army-opt:hover {
  border-color: var(--accent);
}

.army-opt.on {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.army-opt.spent {
  cursor: default;
  color: var(--text-muted);
  border-style: dashed;
}

.army-opt.spent:hover {
  border-color: var(--border);
}

.army-opt-used {
  font-weight: 400;
  font-size: 0.7rem;
  margin-left: 0.25rem;
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
  color: var(--text-muted);
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
  color: var(--accent-ink);
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

.army-pool-hint .wi {
  font-size: 0.68rem;
}

/* ── Round-1 start bonus (GSC's Deeds That Speak to the Masses) ── */
.army-bonus {
  margin-top: 0.55rem;
}

.army-bonus-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  padding: 0.4rem 0.7rem;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  border: 1px solid var(--accent);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent-ink);
}

.army-bonus-btn:hover {
  background: color-mix(in srgb, var(--accent) 24%, transparent);
}

.army-bonus-done {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
}

/* ── Resurrected units (GSC): the spend log, undoable per entry ── */
/* position: relative holds a leaving row where it stood (stableKeys.js pinLeaving). */
.army-resurrect-list,
.army-active-list { position: relative; }
/* A beat slower than the site's lists (owner, 2026-10-20): a die is read as it comes and goes,
   and the row has to be seen settling into order. Tokens, so reduced motion still zeroes them. */
.army-dice-pool > .list-enter-active, .army-dice-pool > .list-leave-active,
.army-resurrect-list > .list-enter-active, .army-resurrect-list > .list-leave-active,
.army-active-list > .list-enter-active, .army-active-list > .list-leave-active { transition-duration: var(--motion-slow); }
.army-dice-pool > .list-move,
.army-resurrect-list > .list-move { transition-duration: var(--motion-move); }
.army-resurrect-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.army-resurrect-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.army-resurrect-label {
  flex: 1 1 auto;
  min-width: 0;
  overflow-wrap: anywhere;
  color: var(--text-primary);
}

.army-resurrect-cost {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--accent-ink);
}

.army-resurrect-undo {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  background: none;
  border: 1px solid var(--border);
  cursor: pointer;
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1;
}

.army-resurrect-undo:disabled { opacity: 0.45; cursor: default; }
.army-resurrect-undo:not(:disabled):hover {
  border-color: var(--accent);
  color: var(--text-primary);
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
  color: var(--accent-ink);
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
  position: relative;
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
  color: var(--accent-ink);
  line-height: 1;
  transition: transform 0.1s, color 0.15s;
}

.army-die .wi {
  font-size: 2rem;
  line-height: 1;
}

.army-die:hover {
  color: var(--accent-ink-hover);
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

.army-die-add .wi {
  font-size: 1.4rem;
  line-height: 1;
}

.army-die-add:hover {
  color: var(--accent-ink);
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
  cursor: pointer;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--accent-ink);
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
  cursor: pointer;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1;
}

.army-head-reset:disabled { opacity: 0.45; cursor: default; }
.army-head-reset:not(:disabled):hover {
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
  /* Muted, like the static line beside it: a fold to open, not an action — red read as one. */
  color: var(--text-muted);
  text-align: left;
}

@media (hover: hover) {
  .army-acc-head:hover { color: var(--text-primary); }
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

.army-ref-example {
  margin: 0.5rem 0 0;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.82rem;
  line-height: 1.5;
  font-style: italic;
  color: var(--text-muted);
}
</style>

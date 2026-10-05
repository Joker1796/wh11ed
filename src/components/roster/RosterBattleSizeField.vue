<template>
  <!-- The list's points limit: the three battle sizes, a number of the player's own, or none at
       all (owner, 2026-10-03). A picker in the shape of the faction and detachment fields beside it
       — a dropdown on a wide screen, a sheet on a phone (AdaptivePicker) — and every option says
       what it decides besides the points (DP, enhancements, copies of a unit), in the list AND
       under the chosen value, because those limits are what the choice is really about.
       Two shapes: `row` is a row of the phone form's settings card (RosterSetupFields, the label
       inside and the whole row one target), `bar` is a field of the desk's settings line
       (RosterSettingsBar, which draws the label itself and carries the limits on it). -->
  <div
    class="bsf"
    :class="[variant, { custom: battleSize === 'custom' }]"
  >
    <AdaptivePicker
      v-model:open="open"
      :title="labels.rosterPointsLimitLabel"
      panel-width="26rem"
    >
      <template #trigger="{ toggle }">
        <button
          type="button"
          class="bsf-trigger"
          :aria-expanded="open"
          @click="toggle"
        >
          <span
            v-if="variant === 'row'"
            class="bsf-label"
          >{{ labels.rosterPointsLimitLabel }}</span>
          <span class="bsf-value">
            <span
              class="bsf-head"
              :class="{ word: !current.points }"
            >{{ headOf(current) }}</span>
            <ExpandTransition>
              <span
                v-if="current.name"
                class="bsf-name"
              >{{ current.name }}</span>
            </ExpandTransition>
          </span>
          <i class="bi bi-chevron-down" />
        </button>
      </template>
      <template #default="{ bodyClass, close, compact }">
        <div
          class="modal-list bsf-list"
          :class="[bodyClass, { compact }]"
        >
          <button
            v-for="o in options"
            :key="o.id"
            type="button"
            class="bsf-opt"
            :class="{ on: o.id === battleSize }"
            :data-limit="o.id"
            @click="pick(o.id, close)"
          >
            <span class="bsf-opt-head">
              <span
                class="bsf-head"
                :class="{ word: !o.points }"
              >{{ headOf(o) }}</span>
              <span
                v-if="o.name"
                class="bsf-name"
              >{{ o.name }}</span>
            </span>
            <span class="bsf-facts-line">
              <span
                v-for="(f, i) in o.facts"
                :key="i"
                :class="f.plain ? 'bsf-fact-text' : ['bsf-chip', { mono: f.mono }]"
              >{{ f.text }}</span>
            </span>
          </button>
        </div>
      </template>
    </AdaptivePicker>

    <!-- A custom limit's own numbers are set in a dialog (owner, 2026-10-03), opened from the
         sliders — beside the field on the desk (and by picking "Custom" there too), inside the
         phone's custom panel. Both open and close by sliding their neighbours (ExpandTransition:
         sideways in the desk's line, downwards in the phone's form). -->
    <ExpandTransition>
      <RosterLimitSlidersButton
        v-if="variant === 'bar' && battleSize === 'custom'"
        :own="current.ownLimits"
        :label="labels.rosterLimitOwnTitle"
        @click="customOpen = true"
      />
    </ExpandTransition>
    <!-- The phone, with a custom limit: a panel of its own on a darker ground — the number and the
         sliders — and the head above it is the only thing that opens the picker. -->
    <ExpandTransition>
      <div
        v-if="variant !== 'bar' && battleSize === 'custom'"
        class="bsf-panel"
      >
        <RosterCustomLimit
          ref="customEditor"
          points-only
          :limit="limit"
          @update:limit="$emit('update:limit', $event)"
        />
        <RosterLimitSlidersButton
          :own="current.ownLimits"
          :label="labels.rosterLimitOwnTitle"
          @click="customOpen = true"
        />
      </div>
    </ExpandTransition>

    <!-- The desk's line shows the value alone (owner, 2026-10-03): its picker says the rest. -->
    <span
      v-if="variant !== 'bar'"
      class="bsf-facts-line"
    >
      <span
        v-for="(f, i) in current.facts"
        :key="i"
        :class="f.plain ? 'bsf-fact-text' : ['bsf-chip', { mono: f.mono }]"
      >{{ f.text }}</span>
    </span>
    <BaseModal
      v-if="customOpen"
      :title="labels.rosterLimitOwnTitle"
      max-width="420px"
      @close="customOpen = false"
    >
      <!-- The dialog is teleported out of the screen's faction colours; the scope brings them in
           (FactionAccentScope — inside the body, which must stay the slot's direct child). -->
      <div class="modal-body">
        <FactionAccentScope
          class="bsf-modal"
          :faction-slug="faction || ''"
        >
          <RosterCustomLimit
            :limit="limit"
            @update:limit="$emit('update:limit', $event)"
          />
        </FactionAccentScope>
      </div>
      <!-- The way out, set apart from the numbers (owner, 2026-10-03): a footer across the dialog,
           the shape ConfirmModal's and RosterDispositionModal's have — back to the size on the left
           once anything was moved, Done on the right. -->
      <FactionAccentScope
        :faction-slug="faction || ''"
        class="modal-foot bsf-foot"
      >
        <button
          v-if="current.ownLimits"
          type="button"
          class="btn-ghost bsf-reset"
          @click="resetOwn"
        >
          <i class="bi bi-arrow-counterclockwise" /> {{ labels.rosterLimitResetTo.replace('{size}', baseName) }}
        </button>
        <button
          type="button"
          class="btn-primary bsf-done"
          @click="customOpen = false"
        >
          {{ labels.rosterLimitDone }}
        </button>
      </FactionAccentScope>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import AdaptivePicker from '../AdaptivePicker.vue'
import RosterCustomLimit from './RosterCustomLimit.vue'
import RosterLimitSlidersButton from './RosterLimitSlidersButton.vue'
import ExpandTransition from '../ExpandTransition.vue'
import BaseModal from '../BaseModal.vue'
import FactionAccentScope from './FactionAccentScope.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { UNLIMITED_BATTLE, effectiveBattle } from '../../composables/rosterEngine.js'
import { limitOf } from '../../composables/rosterLimit.js'
import rosterCore from '../../data/roster/core.js'
import { factsOf as factsOfBattle } from '../../composables/battleLimitFacts.js'

// The whole limit as one value (rosterEngine's limitOf); every change comes back as a new one.
const props = defineProps({
  limit: { type: Object, default: () => limitOf(null) },
  variant: { type: String, default: 'row' },
  // The list's faction, for its colours in the dialog (teleported out of the screen's own).
  faction: { type: String, default: '' },
})
const emit = defineEmits(['update:limit'])
const battleSize = computed(() => props.limit.battleSize)
const update = (patch) => emit('update:limit', { ...props.limit, ...patch })

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const open = ref(false)
const customEditor = ref(null)

const factsOf = (battle) => factsOfBattle(battle, labels.value)

const options = computed(() => [
  ...rosterCore.battleSizes.map((b) => ({
    id: b.id, points: b.points, name: b.name, facts: factsOf(effectiveBattle({ battleSize: b.id }, rosterCore)),
  })),
  { id: 'custom', label: labels.value.rosterCustom, facts: [{ text: labels.value.rosterLimitCustomHint, plain: true }] },
  { id: UNLIMITED_BATTLE, label: labels.value.rosterBattleNone, facts: factsOf({ unlimited: true }) },
])

// The chosen value as the field shows it: a custom one by its own number.
const current = computed(() => {
  const battle = effectiveBattle(props.limit, rosterCore)
  // The desk's trigger names its number (the stepper is inside the picker); the phone's has the
  // stepper right under it, so the word alone.
  if (battle.custom) {
    const own = { ownLimits: battle.ownLimits, facts: factsOf(battle) }
    return props.variant === 'bar'
      ? { ...own, points: battle.points, name: labels.value.rosterCustom }
      : { ...own, label: labels.value.rosterCustom }
  }
  const o = options.value.find((x) => x.id === battleSize.value) || options.value[1]
  return { ...o, facts: factsOf(battle) }
})
function headOf(o) { return o.points ? String(o.points) : o.label }

// Custom has more answers to give: on a phone the cursor goes to the number under the field, on
// the desk its dialog opens.
const customOpen = ref(false)
// "Back to <size>": the player's own limits dropped, the size the points fall within in force again.
const baseName = computed(() => rosterCore.battleSizes.find((b) => b.id === effectiveBattle(props.limit, rosterCore).base)?.name || '')
function resetOwn() {
  const { customLimits: _, ...rest } = props.limit
  emit('update:limit', rest)
}
function pick(id, close) {
  close()
  update({ battleSize: id })
  if (id !== 'custom') return
  if (props.variant === 'bar') customOpen.value = true
  else nextTick(() => customEditor.value?.focus())
}

</script>

<style scoped>
.bsf { display: flex; flex-direction: column; gap: 0.35rem; min-width: 0; }

.bsf-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0;
  background: none;
  border: none;
  font: inherit;
  color: var(--text-primary);
  text-align: left;
  cursor: pointer;
}
.bsf-trigger .bi { flex-shrink: 0; margin-left: auto; color: var(--text-dim); font-size: 0.7rem; }
.bsf-value { display: flex; align-items: baseline; gap: 0.45rem; min-width: 0; }
.bsf-head { font-family: var(--font-mono); font-weight: 700; font-size: 0.95rem; color: var(--text-primary); }
/* "Custom" and "No limit" are words, not figures: the text face, at the figures' weight. */
.bsf-head.word { font-family: inherit; font-size: 0.9rem; font-weight: 600; }
.bsf-name { font-size: 0.8rem; color: var(--text-muted); white-space: nowrap; }

/* `row`: one row of the phone form's card — the label above the value, the whole row the target
   (the card's own rows do the same with a stretched ::after). */
.row .bsf-trigger { flex-wrap: wrap; column-gap: 0; }
.row .bsf-trigger::after { content: ''; position: absolute; inset: 0; }
.row .bsf-label {
  flex: 0 0 100%;
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-dim);
  margin-bottom: 0.15rem;
}
.row .bsf-trigger .bi { position: absolute; right: 0.6rem; top: 0.6rem; }
/* With a custom limit only the HEAD is the target (owner, 2026-10-03): the stretched area stops at
   the panel under it — the row's padding above and beside the head still counts, the panel does
   not. The trigger is the positioned box then, so the chevron is placed from it. */
/* The form gives its rows `align-items: flex-start`; the head here spans the row. */
.bsf.row { align-items: stretch; }
.row.custom .bsf-trigger { position: relative; }
.row.custom .bsf-trigger::after { inset: -0.5rem -0.75rem -0.3rem; }
.row.custom .bsf-trigger .bi { right: -0.15rem; top: 0.1rem; }

/* The phone's custom panel: a darker ground and a frame under the head — the number, with the
   sliders at the right of its line. Above the row's stretched target: the head alone opens the
   picker (owner, 2026-10-03). */
.bsf-panel {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.55rem 0.6rem;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  cursor: default;
}
/* …the sliders the height of the number's buttons beside them (NumberStepper's 40px). */
.bsf-panel .lsb { --lsb-size: 40px; }
.bsf-panel .rcl { width: auto; }

/* `bar`: a field of the desk's settings line, the recessed box its neighbours wear. The line is
   one row of fields, so a custom number stands BESIDE the box — under it, it made this field
   taller than its neighbours and lifted its label off the row. */
.bsf.bar { flex-direction: row; align-items: center; gap: 0.6rem; }
.bar .bsf-trigger { width: auto; }

.bar .bsf-trigger {
  min-width: 11rem;
  padding: 0.35rem 0.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  font-size: 0.9rem;
}
.bar .bsf-trigger .bi { color: var(--text-muted); font-size: inherit; }
/* The line's own type size, or the box comes out a hair taller than its neighbours. */
.bar .bsf-trigger .bsf-head { font-size: 0.9rem; line-height: inherit; }

/* The options: the detachment picker's rows (DetachmentOption) — a headline, then what it means. */
.bsf-list { gap: 0.3rem; }
.bsf-opt {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  gap: 0.3rem;
  width: 100%;
  min-height: 44px;
  padding: 0.45rem 0.6rem;
  text-align: left;
  font: inherit;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: background var(--motion-fast), border-color var(--motion-fast);
}
@media (hover: hover) { .bsf-opt:hover { border-color: var(--accent); } }
.bsf-opt.on { background: color-mix(in srgb, var(--accent) 16%, transparent); border-color: var(--accent); }
.bsf-opt-head { display: flex; align-items: baseline; gap: 0.5rem; }
.bsf-opt .bsf-head { font-size: 1.05rem; }

.bsf-facts-line { display: flex; flex-wrap: wrap; align-items: center; gap: 0.25rem; }
.bsf-chip {
  padding: 0.05rem 0.35rem;
  font-size: 0.72rem;
  line-height: 1.4;
  color: var(--text-muted);
  border: 1px solid var(--border);
  white-space: nowrap;
}
.bsf-chip.mono { font-family: var(--font-mono); font-weight: 700; color: var(--accent-ink); }
/* The desk's dropdown is denser than the phone's sheet by its spacing alone, the type unchanged
   (owner, 2026-10-03): tighter rows and chips, and a panel wide enough (26rem) for a size's four
   chips to share one line. */
.bsf-list.compact { gap: 0.2rem; }
.bsf-list.compact .bsf-opt { gap: 0.15rem; min-height: 0; padding: 0.3rem 0.5rem; }
.bsf-list.compact .bsf-facts-line { gap: 0.2rem; }
.bsf-list.compact .bsf-chip { padding: 0 0.3rem; line-height: 1.3; }
.bsf-list.compact .bsf-fact-text { line-height: 1.25; }
.bsf-fact-text { font-size: 0.75rem; line-height: 1.35; color: var(--text-muted); }

.bsf-modal { display: block; }
.bsf-foot {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.9rem;
  border-top: 1px solid var(--border);
  background: var(--bg-secondary);
}
.bsf-reset { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.8rem; }
.bsf-done { margin-left: auto; min-height: 40px; }
</style>

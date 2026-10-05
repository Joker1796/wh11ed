<template>
  <!-- A custom points limit: the number, and the player's own Detachment Points,
       enhancements, copies of a unit and copies of a Battleline unit (owner, 2026-10-03). Each one
       left alone is borrowed from the size the points fall within (rosterEngine's effectiveBattle),
       so opening the dialog changes nothing until a number is moved; "Back to <size>" in the
       dialog's footer (RosterBattleSizeField) drops them all.
       The number stands under the phone's field; the limits are in a dialog on both widths,
       behind the sliders beside the field (RosterBattleSizeField). -->
  <div class="rcl">
    <!-- Under the phone's field: the number alone, the field's own label above it. -->
    <NumberStepper
      v-if="pointsOnly"
      ref="points"
      class="rcl-points"
      editable
      :model-value="limit.customPoints"
      :step="50"
      :unit="labels.rosterPointsLabel"
      :label="labels.rosterPointsLimitLabel"
      @update:model-value="update({ customPoints: $event })"
    />
    <!-- In the dialog: one card of rows, the settings form's recipe (RosterSetupFields) — a frame,
         hairlines between rows, a surface of its own against the dialog's (owner, 2026-10-03: the
         fields and the button below them were one flat background). -->
    <template v-else>
      <div class="rcl-card">
        <label class="rcl-row">
          <span class="rcl-name">{{ labels.rosterPointsLimitLabel }}</span>
          <NumberStepper
            ref="points"
            class="rcl-points"
            editable
            :model-value="limit.customPoints"
            :step="50"
            :unit="labels.rosterPointsLabel"
            :label="labels.rosterPointsLimitLabel"
            @update:model-value="update({ customPoints: $event })"
          />
        </label>
        <label
          v-for="row in rows"
          :key="row.key"
          class="rcl-row"
        >
          <span class="rcl-name">{{ row.label }}</span>
          <NumberStepper
            :class="{ own: row.own }"
            :model-value="row.value"
            @update:model-value="setOwn(row.key, $event)"
          />
        </label>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import NumberStepper from '../tracker/NumberStepper.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { CUSTOM_LIMIT_KEYS, effectiveBattle } from '../../composables/rosterEngine.js'
import rosterCore from '../../data/roster/core.js'

const props = defineProps({
  // The whole limit (rosterLimit.js's limitOf), battleSize 'custom'.
  limit: { type: Object, required: true },
  // Under the phone's field: the number alone — the limits are the dialog's, behind the sliders.
  pointsOnly: { type: Boolean, default: false },
})
const emit = defineEmits(['update:limit'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const points = ref(null)

const battle = computed(() => effectiveBattle(props.limit, rosterCore))

const own = computed(() => props.limit.customLimits || {})
const rows = computed(() => {
  const l = labels.value
  const b = battle.value
  return [
    { key: 'dp', label: l.rosterLimitOwnDp, value: b.dp },
    { key: 'enh', label: l.rosterLimitOwnEnh, value: b.enhLimit },
    { key: 'dup', label: l.rosterLimitOwnDup, value: b.dupLimit },
    { key: 'line', label: l.rosterLimitOwnLine, value: b.lineLimit },
  ].map((r) => ({ ...r, own: own.value[r.key] != null }))
})

function update(patch) { emit('update:limit', { ...props.limit, ...patch }) }
function setOwn(key, v) {
  const next = { ...own.value, [key]: v }
  // Only the keys the engine reads, so nothing stray travels in a share link or a snapshot.
  update({ customLimits: Object.fromEntries(CUSTOM_LIMIT_KEYS.filter((k) => next[k] != null).map((k) => [k, next[k]])) })
}
defineExpose({ focus: () => points.value?.focus() })
</script>

<style scoped>
.rcl { display: flex; flex-direction: column; align-items: flex-start; gap: 0.6rem; width: 100%; position: relative; z-index: 1; }
.rcl-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
}
.rcl-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.3rem 0.4rem 0.3rem 0.7rem;
  border-top: 1px solid var(--border);
}
.rcl-row:first-child { border-top: none; }
.rcl-name { font-size: 0.85rem; color: var(--text-primary); }
/* A number the player set, against one borrowed from a size: the number takes the accent. */
.own :deep(.step-val) { color: var(--accent-ink); }
</style>

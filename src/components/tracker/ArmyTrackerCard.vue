<template>
  <div v-if="view" class="army-card">
    <div class="army-head">
      <div class="army-heading">
        <span class="army-label">{{ view.label }}</span>
        <span v-if="view.ruleName" class="army-rule-name">{{ view.ruleName }}</span>
      </div>
      <NumberStepper
        :modelValue="counter"
        :min="view.min ?? 0"
        @update:modelValue="v => setArmyCounter(pi, v)"
      />
    </div>

    <details v-if="view.gains.length || view.note" class="army-howto">
      <summary>{{ labels.trackerArmyHowto }}</summary>
      <ul v-if="view.gains.length" class="army-gains">
        <li v-for="(g, i) in view.gains" :key="i">{{ g }}</li>
      </ul>
      <p v-if="view.note" class="army-note">{{ view.note }}</p>
    </details>
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
import { useTracker } from '../../composables/useTracker.js'
import { useLocale } from '../../composables/useLocale.js'
import { ui } from '../../i18n/ui.js'

const props = defineProps({
  pi: { type: Number, required: true },
})

const { current, setArmyCounter } = useTracker()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const player = computed(() => current.value?.players?.[props.pi] || null)
const counter = computed(() => player.value?.army?.counter ?? 0)

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

.army-howto {
  margin-top: 0.5rem;
}

.army-howto > summary {
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--accent);
  list-style: none;
}

.army-howto > summary::-webkit-details-marker {
  display: none;
}

.army-howto > summary::before {
  content: '▸ ';
}

.army-howto[open] > summary::before {
  content: '▾ ';
}

.army-gains {
  margin: 0.5rem 0 0;
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

import { computed, ref } from 'vue'
import { eventCompanion } from '../data/eventCompanion.js'

// The 15 Force-Disposition matchups, each carrying 3 recommended layouts (A/B/C). Image
// paths are language-agnostic, so the EN data is fine for both locales.
export const ALL_MATCHUPS = eventCompanion.en.matchups

export function matchupFor(a, b) {
  if (!a || !b) return null
  return ALL_MATCHUPS.find(m => (m.a === a && m.b === b) || (m.a === b && m.b === a)) || null
}

// Resolve the battlefield layout diagram for a game's settings: a custom layout (any of
// the 45) overrides; otherwise it's the chosen letter within the dispositions' matchup.
// Backward compatible — old games store a plain 'A'|'B'|'C' letter and no customLayout.
export function resolveLayout(settings, a, b) {
  if (settings?.layout === 'custom' && settings.customLayout) return settings.customLayout
  const m = matchupFor(a, b)
  return m?.layouts.find(l => l.id === settings?.layout) || m?.layouts[0] || null
}

// The layout choice of a game's setup — the wizard's step 3 (GameSetup) and the edit dialog of a
// game under way (EditSetupModal) wrote this the same way twice. `dispositions` is a getter of the
// two sides' Force Dispositions; `settings` is the setup's reactive settings.
export function useSetupLayout(settings, dispositions) {
  const matchup = computed(() => matchupFor(...dispositions()))
  const layouts = computed(() => matchup.value?.layouts ?? [])
  // The recommended A/B/C, or a chosen custom layout (any of the 45).
  const currentLayout = computed(() => resolveLayout(settings, ...dispositions()))
  const layoutPickerOpen = ref(false)
  function selectLayout(id) { settings.layout = id; settings.customLayout = null }
  function onPickLayout(l) { settings.layout = 'custom'; settings.customLayout = l; layoutPickerOpen.value = false }
  return { matchup, layouts, currentLayout, layoutPickerOpen, selectLayout, onPickLayout }
}

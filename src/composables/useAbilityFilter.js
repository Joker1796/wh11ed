import { ref } from 'vue'

// Shared filter state for the Reference / Core Abilities list.
// 'all' | 'unit' | 'weapon'. Singleton so the mobile nav menu and the
// in-view filter chips stay in sync.
const activeFilter = ref('all')

export function useAbilityFilter() {
  return { activeFilter }
}

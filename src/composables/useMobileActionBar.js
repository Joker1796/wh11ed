import { reactive, watchEffect, onBeforeUnmount } from 'vue'

// Registry of contextual button contributions for MobileUtilityBar.vue, keyed by contributor
// name. Module-singleton, same pattern as useLocale.js/useTracker.js/useTheme.js — this
// codebase doesn't use provide/inject, and routed views are already descendants of App.vue
// (the bar's owner), so a shared reactive object is simpler than threading one through the tree.
const contributions = reactive({})

export function useMobileActionBar() {
  return { contributions }
}

// Call once in a routed component's setup(). Keeps contributions[key] in sync with the
// getter's return value; clears it whenever the getter returns an empty list (e.g. the
// faction tabs scroll back into view) and on unmount.
export function useContributeMobileActions(key, getter) {
  watchEffect(() => {
    const actions = getter()
    if (!actions || actions.length === 0) delete contributions[key]
    else contributions[key] = actions
  })
  onBeforeUnmount(() => {
    delete contributions[key]
  })
}

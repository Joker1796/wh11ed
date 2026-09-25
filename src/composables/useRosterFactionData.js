// The two lazy loads every roster screen makes for the faction its list plays: the compact roster
// data (unit names, sizes, points — data/roster) and the rules bundle (army rule, detachments with
// their stratagems and enhancements — rosterFactionRules.js). The editor, the wizard, the
// read-only view, the print sheet and the rules panel each wrote their own watcher for these, and
// only the print sheet remembered that a load which lands after the faction (or the locale) has
// moved on must not overwrite the newer answer. Here once, with that guard.
//
// Both loads are dynamic imports under the hood — the faction bundles never ride the entry chunk
// (wh11ed/CLAUDE.md), and nothing here changes that.
import { ref, shallowRef, watch } from 'vue'
import { loadRosterFaction } from '../data/roster/index.js'
import { loadRosterFactionRules } from './rosterFactionRules.js'

// A counter per watcher: a response is kept only if no newer request started after it.
function latestOnly() {
  let n = 0
  return () => {
    const mine = ++n
    return () => mine === n
  }
}

// `slug` is a getter. `allies` is a getter too — the screens that BUILD a list always load allies
// (the catalogue has to offer them), the ones that only read it load them when the list holds one.
export function useRosterFactionData(slug, { allies = () => true } = {}) {
  const factionData = ref(null)
  const loadingFaction = ref(false)
  const begin = latestOnly()
  watch(slug, async (s) => {
    const current = begin()
    if (!s) { factionData.value = null; loadingFaction.value = false; return }
    loadingFaction.value = true
    try {
      const data = await loadRosterFaction(s, { allies: allies() })
      if (current()) factionData.value = data
    } finally {
      if (current()) loadingFaction.value = false
    }
  }, { immediate: true })
  return { factionData, loadingFaction }
}

// `when` gates the load: the view loads rules only while its Rules or Stratagems tab is open, the
// rules panel only once it has been unfolded. A closed gate keeps whatever was loaded last.
export function useRosterFactionRules(slug, locale, { when = () => true } = {}) {
  const rulesFaction = shallowRef(null)
  const detachmentLookup = shallowRef(new Map())
  const begin = latestOnly()
  watch([slug, locale, when], async ([s, loc, on]) => {
    if (!on || !s) return
    const current = begin()
    const { faction, lookup } = await loadRosterFactionRules(s, loc)
    if (!current()) return
    rulesFaction.value = faction
    detachmentLookup.value = lookup
  }, { immediate: true })
  return { rulesFaction, detachmentLookup }
}

// The armies of the game in progress, in the order the game screen offers them: one per side, one
// per member in doubles (up to four). The Armies and Roster tabs both pick among these, so they
// agree on what an army is called and which list it is.
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from './useLocale.js'
import { useTracker, membersOf } from './useTracker.js'
import { factionIndexBySlug } from '../data/factionsIndex.js'

// `names` — a getter of the sides' display names (the game screen's own).
export function useGameArmies(names) {
  const { locale } = useLocale()
  const labels = computed(() => ui[locale.value])
  const { current } = useTracker()
  const isDoubles = computed(() => current.value?.settings?.gameType === 'doubles')

  function memberName(m, mi) {
    return m.name || (mi === 0 ? labels.value.trackerPlayer1 : labels.value.trackerPlayer2)
  }
  const armies = computed(() => {
    const out = []
    current.value?.players?.forEach((pl, pi) => {
      membersOf(pl).forEach((m, mi) => {
        out.push({
          pi,
          mi: isDoubles.value ? mi : null,
          member: m,
          label: isDoubles.value ? `${names()[pi]} · ${memberName(m, mi)}` : names()[pi],
          faction: factionIndexBySlug(m.factionSlug)?.name || '',
        })
      })
    })
    return out
  })
  return { armies, isDoubles }
}

// The navigation lists (router/index.js) in the reader's language. Each book of the app exports its
// list twice, EN and RU, and six components picked between the two with the same ternary.
import { computed } from 'vue'
import { useLocale } from './useLocale.js'
import {
  navGroups, navGroupsRu, eventGroups, eventGroupsRu, trackerGroups, trackerGroupsRu,
  rosterGroups, rosterGroupsRu, factionGroups, factionGroupsRu, combatPatrolGroups, combatPatrolGroupsRu,
} from '../router/index.js'

const LISTS = {
  core: [navGroups, navGroupsRu],
  event: [eventGroups, eventGroupsRu],
  tracker: [trackerGroups, trackerGroupsRu],
  roster: [rosterGroups, rosterGroupsRu],
  faction: [factionGroups, factionGroupsRu],
  combatPatrol: [combatPatrolGroups, combatPatrolGroupsRu],
}

export function useNavGroups(book) {
  const { locale } = useLocale()
  const [en, ru] = LISTS[book]
  return computed(() => (locale.value === 'ru' ? ru : en))
}

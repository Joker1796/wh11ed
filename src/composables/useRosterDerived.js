// Everything four screens read OFF a roster once its faction data is in: the unit lookup, the
// detachments it is actually playing, the battle size it is played at, what it costs, how each
// entry is filed and priced, and the legality verdict.
//
// It exists because those four — the creation wizard, the editor, the read-only view and the print
// sheet — had four copies of the same dozen lines. They are not four different questions: a roster
// costs what it costs whichever screen is showing it. The copies had already drifted once (the
// wizard's own removeUnit forgot to detach a Leader from the unit leaving the list, which is what
// useRosterEditing was written to stop), and every later fix to pricing or sectioning had to be
// made in three places or it silently wasn't.
//
// Over REFS, not over an id: the wizard's roster does not exist as a stored object until a faction
// is picked, and the print sheet is handed one through props. Both hand this a computed of the same
// shape instead. `useRosterEditing.js` is the wrapper for the case that does own an id — it loads
// the roster and its faction bundle and adds the add/duplicate/remove semantics on top of this.
//
// Reads only. Nothing here writes to the roster, so a screen can call it for a list it does not own
// (the print sheet, the game's snapshot) without having to think about who is allowed to mutate it.

import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from './useLocale.js'
import {
  allySourceOf, capKeyOf, effectiveBattle, grantedKeywordsFor, leadsFor, rosterPoints,
  sectionsOf, unitPoints,
} from './rosterEngine.js'
import { duplicateCounts, duplicateLimit, validateRoster } from './rosterValidation.js'
import rosterCore from '../data/roster/core.js'
import { rosterItems } from '../data/roster/index.js'

// `roster` — a ref/computed of the roster object (may read null while it loads, or before the
// wizard has one). `factionData` — a ref/computed of the compact faction bundle from
// loadRosterFaction(), null until it resolves. Both stay the caller's: this only reads them.
export function useRosterDerived(roster, factionData) {
  const { locale } = useLocale()
  const labels = computed(() => ui[locale.value])

  const units = computed(() => roster.value?.units || [])

  const unitMap = computed(() => {
    const m = new Map()
    for (const u of factionData.value?.units || []) m.set(u.id, u)
    return m
  })
  function defOf(id) { return unitMap.value.get(id) }

  // The roster stores detachment NAMES (as the tracker does); these are the data objects behind
  // them, which is what pricing, legality and every rule gate actually read.
  const curDetachments = computed(() =>
    (roster.value?.detachments || [])
      .map((name) => (factionData.value?.detachments || []).find((d) => d.name === name))
      .filter(Boolean))

  const effBattle = computed(() => effectiveBattle(roster.value || {}, rosterCore))
  const limit = computed(() => effBattle.value.points)
  const points = computed(() => rosterPoints(units.value, defOf, curDetachments.value))

  // An allied unit's datasheet belongs to ITS faction (Draxus is an Imperial Agents sheet), which
  // is what the namespaced id records.
  function slugFor(id) { return allySourceOf(id)?.[0] || roster.value?.faction }

  // Per-entry points + copy index (the copy tax is assigned in list order), for the row, the fields
  // and the attached-block total.
  const entryMeta = computed(() => {
    const seen = new Map()
    const m = new Map()
    for (const e of units.value) {
      const copyIndex = (seen.get(e.id) || 0) + 1
      seen.set(e.id, copyIndex)
      m.set(e.uid, { points: unitPoints(defOf(e.id), e, copyIndex, curDetachments.value), copyIndex })
    }
    return m
  })

  // Allies get their own headings rather than being filed under a battlefield role (rosterEngine's
  // sectionsOf). `keepLocked` because a list can already hold a unit whose group the current
  // Detachment doesn't unlock: it stays visible, under its group and marked, instead of vanishing
  // from the screen while still counting in the total.
  const groupedUnits = computed(() =>
    sectionsOf(units.value, {
      faction: factionData.value, detachments: curDetachments.value, defOf, keepLocked: true,
      pairAttached: true,
    }).map((sec) => ({ ...sec, entries: sec.items })))

  // Which slot an attached character fills — the one thing sitting under its bodyguard doesn't say
  // (sectionsOf's joinAttached: the two used to name each other because they were sections apart).
  function attachRole(e) {
    const host = e.leaderOf && units.value.find((u) => u.uid === e.leaderOf)
    if (!host) return ''
    const type = leadsFor(defOf(e.id), e, curDetachments.value).find((l) => l.to === host.id)?.type
    return type === 'support' ? labels.value.rosterSupportTag : labels.value.rosterLeaderTag
  }

  // The catalogue's "+" stops at the duplicate cap while legality checking is on, and so does the
  // copy button beside every row — off these two, or the one control that can add a unit without
  // going through the catalogue would be the one that ignores the cap.
  const dupCounts = computed(() => duplicateCounts(units.value, defOf))
  function dupBlocked(e) {
    if (roster.value?.checkLegality === false) return false
    const def = defOf(e.id)
    if (!def) return true
    // Battleline the army's Detachments grant doubles the cap — the same question sectionsOf and
    // validateRoster ask, so the copy button can never disagree with the warning list.
    const granted = grantedKeywordsFor(allySourceOf(def.id)?.[1] || def.id, slugFor(def.id), curDetachments.value).map((g) => g.kw)
    const cap = effBattle.value?.dupLimit ? duplicateLimit(def, effBattle.value.dupLimit, granted) : Infinity
    return (dupCounts.value.get(capKeyOf(def)) || 0) >= cap
  }

  // Never blocks, only reports — see rosterValidation.js. Computed only once the faction data is
  // in: before that every unit id looks unknown and the list would accuse itself of holding units
  // that don't exist.
  const validation = computed(() =>
    factionData.value && roster.value
      ? validateRoster(roster.value, { faction: factionData.value, core: rosterCore, items: rosterItems.items })
      : { points: points.value, issues: [], errorCount: 0 })

  // Everything `RosterEntryFields` needs beyond the entry itself, identical wherever the fields
  // land — under the row on a phone, in the column beside it on a desk.
  const fieldProps = computed(() => ({
    items: rosterItems.items,
    texts: rosterItems.texts,
    detachments: curDetachments.value,
    units: units.value,
    defOf,
    armySlug: roster.value?.faction || '',
    slugOf: slugFor,
  }))

  return {
    unitMap, defOf, curDetachments, effBattle, limit, points, slugFor,
    entryMeta, groupedUnits, attachRole, dupCounts, dupBlocked, validation, fieldProps,
  }
}

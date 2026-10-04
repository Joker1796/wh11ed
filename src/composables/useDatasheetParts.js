// The reactive half of datasheetParts.js: the same derived parts, as computeds over a card's props,
// for the two cards that draw a sheet — DatasheetCard (the screen) and RosterPrintCard (paper).
// Each used to declare these nine for itself, and the copies had started to drift (the "possible
// modifiers" switch was `hidePossible` on one and `showPossible` on the other, with the opposite
// default). The typography stays each card's own; what the sheet SAYS is decided here.
import { computed } from 'vue'
import { corePartsOf, extraCoreOf, keywordGroupsOf, extraKeywordsOf, keywordNotesOf } from './datasheetParts.js'
import { groupModNotes, possibleModNotes } from './rosterModNotes.js'
import { withGroupPos } from '../utils/weaponGroups.js'

// `props`: the card's own — sheet, grantedCore, grantedKeywords, statMarks, statNotes.
// `showPossible`: a getter; whether the modifiers that might apply are listed under the live ones.
export function useDatasheetParts(props, labels, { showPossible = () => true } = {}) {
  const coreParts = computed(() => corePartsOf(props.sheet))
  const extraCore = computed(() => extraCoreOf(props.sheet, props.grantedCore))
  // Per-model keyword split (The Silent King: keywords every model shares vs a named model's own)
  // — a single unlabelled group for the common flat list.
  const keywordGroups = computed(() => keywordGroupsOf(props.sheet))
  // Rule-granted keywords after the printed ones, minus any the sheet prints in any model group.
  const extraKeywords = computed(() => extraKeywordsOf(props.sheet, props.grantedKeywords))
  // One footnote line per distinct source, grouping every keyword that shares it.
  const keywordNotes = computed(() => keywordNotesOf(extraKeywords.value, labels.value))

  const rangedRows = computed(() => withGroupPos(props.sheet.ranged))
  const meleeRows = computed(() => withGroupPos(props.sheet.melee))

  // A stat the modifier layer rewrote wears a mark: the value on the card is no longer what the
  // datasheet prints, and the reader is owed that signal and the footnote naming the rule.
  const markSet = computed(() => new Set(props.statMarks))
  const isMarked = (on, stat, index) => markSet.value.has(`${on}:${stat}:${index}`)

  // The statlines as the card draws them. The data keeps one profile per model, as the app does
  // (owner, 2026-10-03: Gaunt's Ghosts are six named models, not "Ibram Gaunt" and "Tanith Ghost");
  // the card folds the ones that read the same into one row, their names listed. "The same" is
  // every printed value, the invulnerable save and its note, the base, the count and the modifier
  // marks — a model one rule changed keeps its own row. `index` is the first model's, for the marks.
  const profileRows = computed(() => {
    const STAT_KEYS = ['m', 't', 'sv', 'w', 'ld', 'oc', 'inv']
    const rows = []
    const byKey = new Map()
    ;(props.sheet.profiles || []).forEach((p, index) => {
      const key = JSON.stringify([...STAT_KEYS.map((k) => [p[k], isMarked('profile', k, index)]), p.invNote, p.baseSize, p.qty])
      const row = byKey.get(key)
      if (row) { row.names.push(p.name); return }
      const fresh = { p, index, names: [p.name] }
      byKey.set(key, fresh)
      rows.push(fresh)
    })
    return rows.map(({ p, index, names }) => ({ p: names.length > 1 ? { ...p, name: names.join(', ') } : p, index }))
  })

  // The modifier footnotes: those running now, then — folded on screen — those that could.
  // "Possible modifiers" alone reads as a second helping of the block above it, so it carries a
  // line saying none of it is running and that it comes from rules printed elsewhere.
  const noteSections = computed(() => {
    const out = []
    const l = labels.value
    const live = (props.statNotes || []).filter((n) => n.live !== false)
    const possible = showPossible() ? possibleModNotes(props.statNotes || []) : []
    // A dice modifier is listed but leaves the table alone, and a reader who sees "+1 to Hit"
    // beside an unchanged BS will take it for a bug unless the list says why — once, under it.
    const rollHint = (notes) => (notes.some((n) => n.roll) ? l.dsModifiersRollHint : null)
    if (live.length) out.push({ key: 'live', label: l.dsModifiers, collapsible: false, groups: groupModNotes(live, l), rollHint: rollHint(live) })
    if (possible.length) {
      out.push({
        key: 'possible',
        label: l.dsModifiersPossible,
        hint: l.dsModifiersPossibleHint,
        collapsible: true,
        groups: groupModNotes(possible, l),
        rollHint: rollHint(possible),
      })
    }
    return out
  })

  return { coreParts, extraCore, keywordGroups, extraKeywords, keywordNotes, rangedRows, meleeRows, isMarked, noteSections, profileRows }
}

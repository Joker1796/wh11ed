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

  // The modifier footnotes: those running now, then — folded on screen — those that could.
  // "Possible modifiers" alone reads as a second helping of the block above it, so it carries a
  // line saying none of it is running and that it comes from rules printed elsewhere.
  const noteSections = computed(() => {
    const out = []
    const l = labels.value
    const live = (props.statNotes || []).filter((n) => n.live !== false)
    const possible = showPossible() ? possibleModNotes(props.statNotes || []) : []
    if (live.length) out.push({ key: 'live', label: l.dsModifiers, collapsible: false, groups: groupModNotes(live, l) })
    if (possible.length) {
      out.push({
        key: 'possible',
        label: l.dsModifiersPossible,
        hint: l.dsModifiersPossibleHint,
        collapsible: true,
        groups: groupModNotes(possible, l),
      })
    }
    return out
  })

  return { coreParts, extraCore, keywordGroups, extraKeywords, keywordNotes, rangedRows, meleeRows, isMarked, noteSections }
}

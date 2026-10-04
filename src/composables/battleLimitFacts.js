// What a points limit decides besides the points — the same limits the validator holds a list to
// (rosterValidation.js: overDp, overEnhLimit, overDuplicate), one fact a chip — in the picker's
// rows, and under the chosen value in the phone's form (the desk shows the value alone).
// `battle` is rosterEngine's effectiveBattle; `labels` is the locale's ui block.
import rosterCore from '../data/roster/core.js'

export function factsOf(battle, labels) {
  if (battle.unlimited) return [{ text: labels.rosterLimitNoneHint, plain: true }]
  const out = []
  // A custom number borrows the limits of the size it falls within and says which one that is —
  // or says the limits are the player's own.
  if (battle.ownLimits) out.push({ text: labels.rosterLimitOwn, plain: true })
  else if (battle.custom) {
    const base = rosterCore.battleSizes.find((b) => b.id === battle.base)
    if (base) out.push({ text: labels.rosterLimitAs.replace('{size}', base.name), plain: true })
  }
  out.push({ text: `${battle.dp} DP`, mono: true })
  out.push({ text: labels.rosterLimitEnh.replace('{n}', battle.enhLimit) })
  out.push({ text: labels.rosterLimitDup.replace('{n}', battle.dupLimit) })
  // BATTLELINE units take twice the copies in every printed size (duplicateLimit, rule 25 —
  // DEDICATED TRANSPORTS too, left off the chip to keep it short, owner 2026-10-03).
  out.push({ text: labels.rosterLimitDupLine.replace('{n}', battle.lineLimit ?? battle.dupLimit * 2) })
  return out
}

// A custom limit with the player's own numbers says so wherever the list is looked at — its card,
// its page, the building footer, the tracker's picker, the printed sheet (owner, 2026-10-03). One
// line for those, every limit in force: the borrowed ones too, since a reader cannot tell which
// were moved without them. Empty when the limits are the printed ones (a bare custom number
// included) — then there is nothing unusual to point at.
export function ownLimitsLines(battle, labels) {
  if (!battle?.ownLimits) return []
  return [
    `${labels.rosterPointsLimitLabel}: ${battle.points}`,
    `${labels.rosterLimitOwnDp}: ${battle.dp}`,
    `${labels.rosterLimitOwnEnh}: ${battle.enhLimit}`,
    `${labels.rosterLimitOwnDup}: ${battle.dupLimit}`,
    `${labels.rosterLimitOwnLine}: ${battle.lineLimit}`,
  ]
}

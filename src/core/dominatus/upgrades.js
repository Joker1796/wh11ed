// @ts-check
// Who may take a Dominatus Upgrade card, and when its bonus effect applies — the booklet's
// Declare Battle Formations rules read off each card (owner, 2026-11-03: the unit comes from the
// side's list). Pure; the cards come in as arguments (src/data/dominatus.js `upgrades`).
//
// A card's `who` names the model it goes to: "One CHARACTER model.", the Relics that are no
// hero's "(excluding EPIC HEROES)", and empty for the one card no unit carries (Path to
// Conquest, an end-of-phase rule). A card's `bonus.label` is the keyword (or keywords, "/" for
// either) the bonus effect asks of the model; WARLORD is the army's Warlord, not a keyword the
// datasheet prints. `upgrades.test.js` holds every card of the deck to these readings, so a new
// phrasing fails there instead of being read as "anyone".

/**
 * @typedef {{ who?: string, bonus?: { label: string } | null }} UpgradeCard
 * @typedef {{ kws: string[], warlord?: boolean }} UpgradeUnit keywords as the datasheet prints them
 */

/** @param {string | null | undefined} s */
const up = (s) => String(s || '').toUpperCase()
/** @param {UpgradeUnit | null | undefined} unit @param {string} kw */
const has = (unit, kw) => (unit?.kws || []).some((k) => up(k) === kw)

/**
 * Does the card go to a unit at all?
 * @param {UpgradeCard} card
 */
export function upgradeNeedsUnit(card) {
  return !!card?.who
}

/**
 * Why this unit cannot take the card — `notCharacter` / `epicHero` — or null when it can.
 * @param {UpgradeCard} card
 * @param {UpgradeUnit} unit
 * @returns {'notCharacter' | 'epicHero' | null}
 */
export function upgradeUnitBlock(card, unit) {
  const who = up(card?.who)
  if (!who) return null
  if (who.includes('CHARACTER') && !has(unit, 'CHARACTER')) return 'notCharacter'
  if (who.includes('EXCLUDING EPIC HEROES') && has(unit, 'EPIC HERO')) return 'epicHero'
  return null
}

/**
 * The bonus keywords of a card ("MONSTER/VEHICLE" → both), empty when it has none.
 * @param {UpgradeCard} card
 * @returns {string[]}
 */
export function upgradeBonusKeywords(card) {
  return card?.bonus?.label ? up(card.bonus.label).split('/').map((s) => s.trim()).filter(Boolean) : []
}

/**
 * Does the card's bonus effect apply on this unit?
 * @param {UpgradeCard} card
 * @param {UpgradeUnit} unit
 */
export function upgradeBonusApplies(card, unit) {
  return upgradeBonusKeywords(card).some((kw) => (kw === 'WARLORD' ? !!unit?.warlord : has(unit, kw)))
}

/**
 * Is the card (or one of its effects) used once per battle? Read off its English text, as the deck
 * prints it: "(Once per battle) …".
 * @param {{ body?: string }} card
 */
export function upgradeOncePerBattle(card) {
  return /\(once per battle\)/i.test(card?.body || '')
}

/**
 * Upgrades a side may give out this battle: 3, or 4 under Titangrave's Vermillion Sanction.
 * @param {{ location?: string | null } | null | undefined} dominatus
 */
export function upgradeLimit(dominatus) {
  return dominatus?.location === 'titangrave' ? 4 : 3
}

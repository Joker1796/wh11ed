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
 * The CP a card starts its side's battle with — High Strategy's "You start the battle with 1CP",
 * its bonus' "…2CP instead" when the bonus applies on the unit — read off the English text; 0 for
 * a card that says nothing of the kind.
 * @param {UpgradeCard & { body?: string, bonus?: { label: string, body?: string } | null }} card
 * @param {UpgradeUnit} unit
 */
export function upgradeStartCp(card, unit) {
  const RE = /start the battle with (\d+)\s*CP/i
  const base = Number(RE.exec(card?.body || '')?.[1] || 0)
  const bonus = Number(RE.exec(card?.bonus?.body || '')?.[1] || 0)
  return bonus && upgradeBonusApplies(card, unit) ? bonus : base
}

/**
 * The modifier entries the Upgrade cards a unit carries add to its card — the stat pass's own shape
 * (rosterStatMods' ModEntry), as an enhancement's: an Upgrade addresses its bearer ("this model", no
 * `target`) and "this unit" (`target: 'unit'`), and is placed on one model of a unit of several the
 * way an enhancement is. `upgrade: true` names the source on the card's notes. `mods` is the
 * hand-read table (src/data/dominatusUpgradeMods.js); a bonus that applies on the bearer replaces
 * the card's own effects where the card says "instead", else adds to them. A card with no numbers
 * adds no entry. `unitOnly` keeps the "this unit" effects alone — the card of another part of the
 * Attached unit the bearer belongs to (19.04).
 * @param {Array<UpgradeCard & { slug: string, name: string }>} cards
 * @param {Record<string, { effects: object[], bonus?: { replace: boolean, effects: object[] } }>} mods
 * @param {UpgradeUnit} unit the bearer
 * @param {{ unitOnly?: boolean }} [opts]
 */
export function upgradeModEntries(cards, mods, unit, { unitOnly = false } = {}) {
  /** @type {any[]} */
  const out = []
  for (const card of cards || []) {
    const m = mods[card.slug]
    if (!m) continue
    const bonus = m.bonus && upgradeBonusApplies(card, unit) ? m.bonus : null
    let effects = bonus ? (bonus.replace ? bonus.effects : [...m.effects, ...bonus.effects]) : m.effects
    if (unitOnly) effects = effects.filter((/** @type {any} */ e) => e.target === 'unit')
    if (!effects.length) continue
    out.push({ sid: `dom:${card.slug}`, kind: 'enhancement', upgrade: true, name: card.name, body: '', reviewed: true, effects, ...(unitOnly ? { from: 'unit' } : {}) })
  }
  return out
}

/**
 * Upgrades a side may give out this battle: the campaign's limit (`limit`, the booklet's 3 when the
 * game says none — campaign.js `upgradeLimit`), one more under Titangrave's Vermillion Sanction.
 * @param {{ location?: string | null, limit?: number } | null | undefined} dominatus
 */
export function upgradeLimit(dominatus) {
  const base = Number.isInteger(dominatus?.limit) && (dominatus?.limit ?? 0) > 0 ? Number(dominatus?.limit) : 3
  return base + (dominatus?.location === 'titangrave' ? 1 : 0)
}

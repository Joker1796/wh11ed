// Multi-profile weapons are stored as adjacent rows sharing a base name with a spaced-dash
// suffix ("Scythe of the Nightbringer – strike" / "– sweep"). The data is inconsistent about
// the dash — some entries use an en-dash "–", others a plain hyphen "-" (e.g. Ghazghkull's
// "Gork's Klaw - strike") — so split on a SPACED dash of any kind (hyphen / en / em). The
// surrounding spaces keep AP values like "-3" (a separate field anyway) from ever matching.
export function weaponBase(name) {
  return (name || '').split(/ [-–—] /)[0].trim()
}

// A weapon whose profiles are all fired, not one picked — Nazdreg's Kustom Blasta X: "This model's
// Kustom Blasta X weapon has three separate ranged weapon profiles, each of which can be selected to
// make attacks with". Grouped, its rows read as "pick one" (the arrow), which is the core rule for a
// multi-profile weapon and the opposite of this one (a player's report, 2026-10-18). The datasheet
// says so in its loadout; gen-datasheets reads the names from there into `separateProfiles`, and
// datasheets/separateProfiles.test.js holds every sheet to it.
const SEPARATE = /(?:^|\n)This model[’']s (.+?) weapon has \w+ separate (?:ranged |melee )?weapon profiles/g
export function separateProfileWeapons(loadout) {
  return [...(loadout || '').matchAll(SEPARATE)].map((m) => m[1])
}

/**
 * Rows with their place in a multi-profile group. `separate`: the weapons whose profiles are all
 * fired (a sheet's `separateProfiles`) — each of their rows stands alone, under its full name.
 */
export function withGroupPos(list, separate = []) {
  const rows = list || []
  const apart = new Set(separate)
  const baseOf = (w) => (apart.has(weaponBase(w.name)) ? w.name : weaponBase(w.name))
  return rows.map((w, i) => {
    const base = baseOf(w)
    const prevSame = i > 0 && baseOf(rows[i - 1]) === base
    const nextSame = i < rows.length - 1 && baseOf(rows[i + 1]) === base
    let gpos = 'single'
    if (prevSame && nextSame) gpos = 'mid'
    else if (nextSame) gpos = 'start'
    else if (prevSame) gpos = 'end'
    // A grouped row is printed under a heading row carrying the weapon's name (DatasheetCard), so
    // it shows only what tells the profiles apart: "standard", "supercharge". A group whose rows
    // share a name outright (no suffix to show) keeps the full name.
    const profile = gpos === 'single' ? null : (w.name || '').slice(base.length).replace(/^\s*[-–—]\s*/, '') || w.name
    return { ...w, gpos, base, profile }
  })
}

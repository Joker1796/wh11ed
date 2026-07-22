// Multi-profile weapons are stored as adjacent rows sharing a base name with a spaced-dash
// suffix ("Scythe of the Nightbringer – strike" / "– sweep"). The data is inconsistent about
// the dash — some entries use an en-dash "–", others a plain hyphen "-" (e.g. Ghazghkull's
// "Gork's Klaw - strike") — so split on a SPACED dash of any kind (hyphen / en / em). The
// surrounding spaces keep AP values like "-3" (a separate field anyway) from ever matching.
export function weaponBase(name) {
  return (name || '').split(/ [-–—] /)[0].trim()
}

export function withGroupPos(list) {
  const rows = list || []
  return rows.map((w, i) => {
    const base = weaponBase(w.name)
    const prevSame = i > 0 && weaponBase(rows[i - 1].name) === base
    const nextSame = i < rows.length - 1 && weaponBase(rows[i + 1].name) === base
    let gpos = 'single'
    if (prevSame && nextSame) gpos = 'mid'
    else if (nextSame) gpos = 'start'
    else if (prevSame) gpos = 'end'
    return { ...w, gpos }
  })
}

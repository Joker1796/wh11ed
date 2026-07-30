// Format a raw Base Size Guide value (as stored on each datasheet's `baseSize`; sourced from
// wh40k-appdata's datasheet.localisations.en.baseSize and diffed by scripts/sync-appdata.mjs)
// into a short display label. Round bases get the diameter sign (⌀32mm); oval bases keep
// their W×H dimensions (75×42mm); Hull / Unique / flying bases are localized words.
// Mixed-base profiles are joined with " / " in the raw value — format each part.
export function formatBaseSize(raw, labels) {
  if (!raw) return ''
  return raw
    .split(' / ')
    .map((part) => formatOne(part.trim(), labels))
    .join(' / ')
}

function formatOne(s, labels) {
  if (/^hull$/i.test(s)) return labels.baseHull
  if (/^unique$/i.test(s)) return labels.baseUnique
  if (/^large flying base$/i.test(s)) return labels.baseFlyingLarge
  if (/^small flying base$/i.test(s)) return labels.baseFlyingSmall
  const oval = s.match(/^(\d[\d.]*)x(\d[\d.]*)mm/i)
  if (oval) return `${oval[1]}×${oval[2]}mm`
  const round = s.match(/^(\d[\d.]*)mm$/i)
  if (round) return `⌀${round[1]}mm`
  return s
}

// Format a raw Base Size Guide value (as stored on each datasheet's `baseSize`; sourced from
// wh40k-appdata's datasheet.localisations.en.baseSize and diffed by scripts/sync-appdata.mjs)
// into a short display label. Round bases get the diameter sign (⌀32mm); oval bases keep
// their W×H dimensions (75×42mm); Hull / Unique / flying bases are localized words.
// A unit whose models stand on different bases carries appdata's lines as they are, one
// "<model>: <size>" a line (scripts/lib/model-bases.mjs) — each is shown with its name, joined by
// " · ". The name before the LAST colon: "The Silent King: Szarekh: 100mm".
export function formatBaseSize(raw, labels) {
  if (!raw) return ''
  return String(raw)
    .split('\n')
    .map((line) => {
      const m = line.trim().match(/^(.*):\s*(\S.*)$/)
      if (!m) return formatOne(line.trim(), labels)
      const name = m[1] === 'Other models' ? labels.baseOtherModels : m[1]
      return `${name} ${formatOne(m[2], labels)}`
    })
    .join(' · ')
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

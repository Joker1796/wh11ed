import { foldName } from './foldName.js'

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

// A unit of several profiles whose base lines name those profiles ("The Silent King: Szarekh:
// 100mm" / "…: Triarchal Menhir: 50mm"): each profile's own base, by profile index, so the card
// can print it after the profile's name instead of a run-on line beside the unit's (owner,
// 2026-10-21). A line may name several profiles ("Cult Demagogue, Iconarch: 32mm") and a plural
// ("Gun Servitors") names the profile in the singular. Null unless EVERY line lands on a profile:
// a line about a weapon ("Ratlings, Tankstopper Rifle: 28.5mm") or "Other models" keeps the whole
// value where it was, rather than half of it moving and half not.
const fold = (s) => foldName(String(s).trim()).replace(/s$/, '')

export function profileBases(sheet) {
  const profiles = sheet?.profiles || []
  const lines = String(sheet?.baseSize || '').split('\n').map((l) => l.trim()).filter(Boolean)
  if (profiles.length < 2 || lines.length < 2) return null
  const index = new Map(profiles.map((p, i) => [fold(p.name), i]))
  const out = new Map()
  for (const line of lines) {
    const m = line.match(/^(.*):\s*(\S.*)$/)
    if (!m) return null
    const names = m[1].split(':').pop().split(',').map(fold)
    for (const n of names) {
      if (!index.has(n)) return null
      out.set(index.get(n), m[2])
    }
  }
  return out
}

// How long a list's name reads, for the header that has to show it. Exports habitually name a
// list with a whole quote ("I am Warpbane-- and I could kill you...but death would only end your
// agony--and silence your shame."), and at the header's display size that ran five lines down a
// phone screen.
//
// WHERE the points and the pencil sit is not decided here — the header puts them on their own
// row on a narrow screen no matter what the name is, because guessing "does this wrap?" from the
// text is a losing game: "PORTRAIT OF A MACHINE" is 21 characters and two lines, while a longer
// lowercase name is one. Only the type SIZE is decided from the name, and there the same problem
// is handled by weighting: a capital is about 1.4 lowercase letters wide in the display face.
const CAP_WIDTH = 1.4

export const NAME_LONG = 60
export const NAME_XLONG = 100

// '' | 'long' | 'xlong' — used as a CSS class, so the sizes stay in the stylesheets. The
// thresholds assume the name has the header row to itself: ~30 lowercase letters to a line at
// 1.7rem on a phone, so two lines keep the full size and each step aims to bring a longer name
// back to two or three lines rather than to a fixed small size.
export function rosterNameFit(name) {
  const width = nameWidth(name)
  if (width >= NAME_XLONG) return 'xlong'
  if (width >= NAME_LONG) return 'long'
  return ''
}

// Length in lowercase-letter widths, so an ALL-CAPS name is not mistaken for a short one.
function nameWidth(name) {
  const text = String(name || '').trim()
  let width = 0
  for (const ch of text) width += ch !== ch.toLowerCase() && ch === ch.toUpperCase() ? CAP_WIDTH : 1
  return width
}

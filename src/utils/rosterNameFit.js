// How much room a list's name needs in a header. Exports habitually name a list with a whole
// quote ("I am Warpbane-- and I could kill you...but death would only end your agony--and
// silence your shame."), and at the header's display size that ran five lines down a phone
// screen, pushing the points and the edit button into the middle of the page.
//
// Two separate decisions, hence two separate thresholds. Giving the name the header row to
// itself costs nothing and helps as soon as it wraps at all, so that starts early. SHRINKING the
// type is a real loss and only pays for itself once the name is genuinely a wall: at 1.7rem a
// phone fits ~22 characters to a line, so anything up to two lines keeps the full size, and the
// steps below aim to bring a longer name back to two or three lines rather than to a fixed size.
export const NAME_WRAP = 26
export const NAME_LONG = 45
export const NAME_XLONG = 88

// '' | 'wrap' | 'long' | 'xlong' — used as a CSS class, so the sizes stay in the stylesheets.
// Everything from 'wrap' up takes the row to itself; only 'long'/'xlong' carry a size.
export function rosterNameFit(name) {
  const len = String(name || '').trim().length
  if (len >= NAME_XLONG) return 'xlong'
  if (len >= NAME_LONG) return 'long'
  if (len >= NAME_WRAP) return 'wrap'
  return ''
}

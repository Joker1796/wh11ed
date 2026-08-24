// How much room a list's name needs in a header. Exports habitually name a list with a whole
// quote ("I am Warpbane-- and I could kill you...but death would only end your agony--and
// silence your shame."), and at the header's display size that ran five lines down a phone
// screen, pushing the points and the edit button into the middle of the page. Past these
// lengths the name takes the row to itself and steps down a size; anything shorter is
// untouched, so an ordinary list header still looks exactly the way it always did.
export const NAME_LONG = 26
export const NAME_XLONG = 56

// '' | 'long' | 'xlong' — used as a CSS class, so the sizes stay in the stylesheets.
export function rosterNameFit(name) {
  const len = String(name || '').trim().length
  if (len >= NAME_XLONG) return 'xlong'
  if (len >= NAME_LONG) return 'long'
  return ''
}

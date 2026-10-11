// A mailed link carries its one-time token in the URL fragment (#token=…): the fragment never
// leaves the browser, so the token is in no server or CDN log. Read it once and wipe it from the
// address bar, so a screenshot or a shared tab does not carry it on.
export function takeLinkToken() {
  if (typeof location === 'undefined') return ''
  const token = new URLSearchParams(location.hash.replace(/^#/, '')).get('token') || ''
  if (token) history.replaceState(history.state, '', location.pathname + location.search)
  return token
}

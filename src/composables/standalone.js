// True when the app runs as an installed PWA (standalone display mode) rather than a
// normal browser tab. Chromium/Android expose the `display-mode: standalone` media query;
// iOS Safari uses the non-standard `navigator.standalone`.
export function isStandaloneDisplay() {
  return (
    typeof window !== 'undefined' &&
    (window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true)
  )
}

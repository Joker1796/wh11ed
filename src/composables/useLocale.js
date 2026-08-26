import { ref, watch } from 'vue'
import { getItem, setItem } from './safeStorage.js'
import { localeOfPath } from '../router/locale.js'

// Locale resolution order: the URL's own `/ru` prefix → the legacy `?lang=` param → the saved
// preference → 'en'.
//
// The address is the source of truth for what language is on screen; the saved preference only
// decides where a reader who followed a bare link should be SENT (the router does that, see the
// locale guards in router/index.js). Until 2026-08-26 this was inverted — the preference decided
// the language and the composable wrote `?lang=ru` back into the address with `replaceState` —
// which is why the two could disagree and why a Russian page had no address of its own.
function readInitialLocale() {
  if (typeof window === 'undefined') return 'en'
  if (localeOfPath(window.location.pathname) === 'ru') return 'ru'
  const fromQuery = new URLSearchParams(window.location.search).get('lang')
  if (fromQuery === 'ru' || fromQuery === 'en') return fromQuery
  return readStoredLocale()
}

/** The saved preference alone — no URL, no default beyond 'en'. The router reads this to decide
 *  whether a bare path should be redirected to its Russian twin. */
export function readStoredLocale() {
  return getItem('locale') === 'ru' ? 'ru' : 'en'
}

export const locale = ref(readInitialLocale())

// Keep <html lang> honest. The URL is no longer touched here — navigation owns it.
function syncDocument(loc) {
  if (typeof document !== 'undefined') document.documentElement.lang = loc
}

syncDocument(locale.value)
watch(locale, syncDocument)

/** Remember the reader's choice. Changing what is on screen is a NAVIGATION (to the paired
 *  address), so the caller does that — see AppNavbar.vue. */
export function setLocale(loc) {
  setItem('locale', loc)
  locale.value = loc
}

export function useLocale() {
  return { locale, setLocale }
}

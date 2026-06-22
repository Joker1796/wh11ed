import { ref, watch } from 'vue'
import { getItem, setItem } from './safeStorage.js'

// Locale resolution order: ?lang= URL param (so EN/RU are crawlable as distinct
// URLs for hreflang) → saved preference → default 'en'.
function readInitialLocale() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (fromUrl === 'ru' || fromUrl === 'en') return fromUrl
  return getItem('locale') === 'ru' ? 'ru' : 'en'
}

const locale = ref(readInitialLocale())

// Keep <html lang> and the ?lang= URL param in sync with the active locale so
// crawlers see the right language and the RU page has a stable, shareable URL.
function syncDocument(loc) {
  document.documentElement.lang = loc
  const url = new URL(window.location.href)
  if (loc === 'en') url.searchParams.delete('lang')
  else url.searchParams.set('lang', loc)
  // replaceState: change the URL without a navigation/reload.
  window.history.replaceState(window.history.state, '', url)
}

syncDocument(locale.value)
watch(locale, syncDocument)

export function useLocale() {
  function toggleLocale() {
    locale.value = locale.value === 'en' ? 'ru' : 'en'
    setItem('locale', locale.value)
  }
  return { locale, toggleLocale }
}

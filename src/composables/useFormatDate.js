import { useLocale } from './useLocale.js'

// Locale-aware date formatter shared by the tracker home / history / summary screens
// (was duplicated verbatim in three components). Never throws on a bad ISO string.
export function useFormatDate() {
  const { locale } = useLocale()
  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString(locale.value === 'ru' ? 'ru-RU' : 'en-GB')
    } catch {
      return ''
    }
  }
  return { formatDate }
}

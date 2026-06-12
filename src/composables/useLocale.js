import { ref } from 'vue'

const saved = localStorage.getItem('locale')
const locale = ref(saved === 'ru' ? 'ru' : 'en')

export function useLocale() {
  function toggleLocale() {
    locale.value = locale.value === 'en' ? 'ru' : 'en'
    localStorage.setItem('locale', locale.value)
  }
  return { locale, toggleLocale }
}

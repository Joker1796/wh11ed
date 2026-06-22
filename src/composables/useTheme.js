import { ref } from 'vue'
import { getItem, setItem } from './safeStorage.js'

const saved = getItem('theme')
const initial = saved === 'light' || saved === 'dark'
  ? saved
  : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
const theme = ref(initial)

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    setItem('theme', theme.value)
    document.documentElement.setAttribute('data-theme', theme.value)
  }
  return { theme, toggleTheme }
}

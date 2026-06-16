import { ref } from 'vue'

const saved = localStorage.getItem('theme')
const initial = saved === 'light' || saved === 'dark'
  ? saved
  : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
const theme = ref(initial)

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', theme.value)
    document.documentElement.setAttribute('data-theme', theme.value)
  }
  return { theme, toggleTheme }
}

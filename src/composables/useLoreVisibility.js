import { ref } from 'vue'
import { getItem, setItem } from './safeStorage.js'

const hideLore = ref(getItem('hideLore') === 'true')

// Apply persisted state to <html> at module load
if (hideLore.value) document.documentElement.setAttribute('data-hide-lore', 'true')

export function useLoreVisibility() {
  function toggleLore() {
    hideLore.value = !hideLore.value
    setItem('hideLore', String(hideLore.value))
    if (hideLore.value) {
      document.documentElement.setAttribute('data-hide-lore', 'true')
    } else {
      document.documentElement.removeAttribute('data-hide-lore')
    }
  }
  return { hideLore, toggleLore }
}

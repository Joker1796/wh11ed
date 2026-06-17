import { ref } from 'vue'

const saved = localStorage.getItem('hideLore')
const hideLore = ref(saved === 'true')

// Apply persisted state to <html> at module load
if (hideLore.value) document.documentElement.setAttribute('data-hide-lore', 'true')

export function useLoreVisibility() {
  function toggleLore() {
    hideLore.value = !hideLore.value
    localStorage.setItem('hideLore', String(hideLore.value))
    if (hideLore.value) {
      document.documentElement.setAttribute('data-hide-lore', 'true')
    } else {
      document.documentElement.removeAttribute('data-hide-lore')
    }
  }
  return { hideLore, toggleLore }
}

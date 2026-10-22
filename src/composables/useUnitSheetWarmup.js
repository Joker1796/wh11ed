import { onMounted } from 'vue'
import { loadRosterTextsRu } from '../data/roster/ru/index.js'
import { useLocale } from './useLocale.js'

// What the unit's sheet (UnitEditorFields) needs and the list around it does not, fetched in the
// first idle moment after the list appears instead of under the finger that opens the sheet.
// Measured 2026-10-22 (CPU ×20, the median first open of five fresh browsers): 496 → 376 ms, and
// the page no longer lays itself out again once the font arrives a beat after the sheet.
//
// - The display face at 400: the sheet's headings are the first text on the builder's screens set
//   in it (style.css draws the display face at 400 below 18px), so it used to be requested by the
//   tap. Loaded for a Latin and a Cyrillic letter — the two subsets a name or a heading uses; the
//   installed app holds them in its cache already, and this is when the browser takes them in.
// - The Russian wargear instructions (data/roster/ru/texts.js), loaded on the first sheet otherwise
//   — after which the sheet drew a second time with them.
//
// Nothing here is new to download: both are what the first sheet would have fetched anyway.
export function useUnitSheetWarmup() {
  const { locale } = useLocale()
  onMounted(() => {
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 250))
    idle(() => {
      if (locale.value === 'ru') loadRosterTextsRu()
      const family = getComputedStyle(document.documentElement).getPropertyValue('--font-display').trim()
      if (family) document.fonts?.load(`400 1em ${family}`, 'Яz').catch(() => {})
    })
  })
}

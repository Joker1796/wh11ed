import { computed } from 'vue'
import { useLocale } from './useLocale.js'

// Shared EN/RU merge for the Section[]-shaped rules data (basicRules, battleRound,
// battlefields, advancedRules). RU arrays are merged over EN by index; non-translated
// fields (id, image, etc.) inherit from EN. Previously each view inlined this, with
// subtle drift: basicRules localized image/sideImage/illustration for png|jpg, while
// battlefields/advancedRules localized only sideImage and only `.png` — a no-op on
// their `.jpg` sideImages, so RU users saw the EN image even though `-ru` assets exist.
// Centralizing fixes that.

const IMAGE_FIELDS = ['image', 'sideImage', 'illustration']

// Runtime `-ru` suffix on illustration paths (see CLAUDE.md "Image organization").
// AppImage maps the extension to `.webp` at render, so `foo.jpg` → `foo-ru.jpg` → `foo-ru.webp`.
export function localizeImageSrc(src) {
  return src.replace(/\.(png|jpg)$/, '-ru.$1')
}

// `sub` here is the already-merged subsection/child, so `sub.title` is the RU title.
function localizeSubImages(sub) {
  let out = sub
  for (const field of IMAGE_FIELDS) {
    const img = out[field]
    if (img?.src) {
      if (out === sub) out = { ...sub }
      // `img.shared: true` opts an image out of the `-ru` rewrite — for illustrations sourced
      // without any baked-in text (see wh11ed-app-illustrations migration), one file already
      // serves both locales, so a byte-identical `-ru` duplicate would just be dead weight.
      const localized = img.shared ? { ...img } : { ...img, src: localizeImageSrc(img.src) }
      // Localize the alt too: reuse the (already-translated) RU subsection title so diagram
      // labels carry canonical terminology from the data instead of the English alt. Only
      // for meaningful images (those that had an alt) when a title is available.
      if (img.alt && out.title) localized.alt = out.title
      out[field] = localized
    }
  }
  return out
}

// Merge EN + RU Section[]. `extraSectionFields(enSection, ruSection)` returns any
// per-section fields a view needs merged beyond title/description/subsections
// (e.g. woundTable, stratagems, abilitiesTable).
export function mergeSections(en, ru, extraSectionFields) {
  return en.map((section, i) => {
    const ruSection = ru[i]
    const merged = {
      ...section,
      title: ruSection.title,
      description: ruSection.description,
      subsections: section.subsections.map((sub, j) => {
        const mergedSub = localizeSubImages({ ...sub, ...ruSection.subsections[j] })
        // x.x.x children (SubRuleBlock) merge the same way, indexed within the subsection.
        if (sub.children) {
          const ruChildren = ruSection.subsections[j]?.children || []
          mergedSub.children = sub.children.map((c, k) =>
            localizeSubImages({ ...c, ...ruChildren[k] })
          )
        }
        return mergedSub
      }),
    }
    if (extraSectionFields) Object.assign(merged, extraSectionFields(section, ruSection))
    return merged
  })
}

// Reactive `sections` computed: EN data as-is, or the merged RU view.
export function useBilingualSections(data, extraSectionFields) {
  const { locale } = useLocale()
  return computed(() =>
    locale.value === 'en' ? data.en : mergeSections(data.en, data.ru, extraSectionFields)
  )
}

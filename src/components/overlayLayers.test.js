// The order of what floats over a page, read from the stylesheets. The update plate must sit over
// the page and its bars but UNDER every dialog (owner, 2026-10-16): a reader finishes what is open
// and presses Update when it suits, never loses a dialog to it. A new bar or panel set above the
// plate, or a dialog set below it, fails here.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const SRC = join(import.meta.dirname, '..')
function zOf(file, selector) {
  const css = readFileSync(join(SRC, file), 'utf8')
  // The first rule for the selector that sets a layer (a component may style it in several).
  for (let at = css.indexOf(`${selector} {`); at >= 0; at = css.indexOf(`${selector} {`, at + 1)) {
    const m = css.slice(at, css.indexOf('}', at)).match(/z-index:\s*(\d+)/)
    if (m) return Number(m[1])
  }
  throw new Error(`${selector} in ${file} sets no z-index`)
}

const plate = zOf('components/UpdatePlate.vue', '.update-plate')
const below = {
  'the utility chips': zOf('components/MobileUtilityBar.vue', '.mobile-bar'),
  'the drawer': zOf('components/NavSidebar.vue', '.sidebar'),
  'back to top': zOf('components/BackToTopButton.vue', '.back-to-top'),
  'the faction buttons': zOf('components/FactionLayout.vue', '.faction-fabs'),
  'the roster undo bar': zOf('components/roster/RosterUndoBar.vue', '.ru-bar'),
  'the offer to install': zOf('components/InstallOffer.vue', '.install-offer'),
}
const above = {
  'a dialog': zOf('components/BaseModal.vue', '.modal-overlay'),
  'the glossary popover': zOf('components/KeywordPopover.vue', '.kw-popover'),
}

describe('what floats over the page', () => {
  it.each(Object.entries(below))('the update plate is over %s', (_name, z) => expect(plate).toBeGreaterThan(z))
  it.each(Object.entries(above))('the update plate is under %s', (_name, z) => expect(plate).toBeLessThan(z))
  it('the warm-up toast shares the plate\'s layer', () => expect(zOf('components/AppToast.vue', '.app-toast')).toBe(plate))
})

// Visual cues in changelog notes: a note can draw the control it talks about instead of describing
// it (owner, 2026-09-24 — "the new buttons in the builder, drawn"). Two marks, rendered by
// ChangelogView after renderInline and nowhere else, so rule text never sees them:
//
//   {btn:gear}      an icon button, as the screen draws it — the names below, nothing else
//   {key:Put back}  a text button, the label as written (localized by the note itself)
//
// Drawn with the app's own icon font and colours: no images, both themes, both locales, and it
// cannot go stale while the screen keeps the same icon. A name missing from BTN_ICONS fails
// changelog.test.js rather than printing "{btn:…}" to a reader.
export const BTN_ICONS = {
  gear: { icon: 'bi-gear', en: 'Settings', ru: 'Настройки' },           // the roster builder's Settings mode
  panes: { icon: 'bi-layout-split', en: 'Units', ru: 'Юниты' },         // …its Units mode
  book: { icon: 'bi-book', en: 'Faction rules', ru: 'Правила фракции' }, // beside the unit search
  revert: { icon: 'bi-arrow-counterclockwise', en: 'Cancel', ru: 'Отмена' }, // Cancel on a narrow phone
}

export const MARK_RE = /\{btn:([a-z-]+)\}|\{key:([^}]+)\}/g

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// `html` is renderInline's output; the marks passed through it untouched. An icon carries its
// name for a screen reader (and as a tooltip): "opens from [book]" says nothing read aloud.
// Marks that stand together ("{btn:gear} {btn:panes}") and the punctuation right after them are
// one unbreakable run: a line break between the two halves of one switch, or before the full stop
// after an icon, read as two separate things.
const RUN_RE = /(?:\{(?:btn|key):[^}]+\}(?:\s+(?=\{(?:btn|key):))?)+[.,;:!?»”)]?/g

export function renderMarks(html, locale = 'en') {
  return String(html).replace(RUN_RE, (run) => `<span class="cl-nw">${drawMarks(run, locale)}</span>`)
}

function drawMarks(html, locale) {
  return html.replace(MARK_RE, (m, btn, key) => {
    const b = btn && BTN_ICONS[btn]
    if (btn) return b ? `<span class="cl-btn" role="img" aria-label="${esc(b[locale] || b.en)}" title="${esc(b[locale] || b.en)}"><i class="bi ${b.icon}"></i></span>` : m
    return `<span class="cl-key">${esc(key)}</span>`
  })
}

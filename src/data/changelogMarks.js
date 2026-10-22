// Visual cues in changelog notes: a note can draw the control it talks about instead of describing
// it (owner, 2026-09-24 — "the new buttons in the builder, drawn"). Two marks, rendered by
// ChangelogView after renderInline and nowhere else, so rule text never sees them:
//
//   {btn:gear}      an icon button, as the screen draws it — the names below, nothing else
//   {key:Put back}  a text button, the label as written (localized by the note itself)
//   {do:feedback}   a text button that works: pressing it does what the app's own button does
//                   (owner, 2026-10-19 — "make Report a bug clickable"); the actions below, the
//                   label as the screen writes it, ChangelogView runs it
//   {who:Creego}    an outside contributor's name, in amber (owner, 2026-10-07): the thanks
//                   should stand out from the change it is attached to
//   {link:beta.wh-rules.ru}  a site the note sends the reader to, clickable (owner, 2026-10-09);
//                   https only, the address is the text, a new tab
//
// Drawn with the app's own icon font and colours: no images, both themes, both locales, and it
// cannot go stale while the screen keeps the same icon. A name missing from BTN_ICONS fails
// changelog.test.js rather than printing "{btn:…}" to a reader.
// A mark stays after the notes in this file stop using it: older releases are read from the API's
// archive and drawn by this same renderMarks (the archive's 66 releases use book, shield, revert,
// star, info and panes — 2026-10-13, after they were nearly pruned as unused). Check the archive
// (GET /changelog, paged) before removing one.
export const BTN_ICONS = {
  gear: { icon: 'wi wi-settings', en: 'Settings', ru: 'Настройки' },           // the roster builder's Settings mode
  panes: { icon: 'wi wi-panes', en: 'Units', ru: 'Юниты' },         // …its Units mode
  book: { icon: 'wi wi-book', en: 'Faction rules', ru: 'Правила фракции' }, // beside the unit search
  shield: { icon: 'wi wi-army', en: 'Faction rules', ru: 'Правила фракции' }, // beside the unit search since 2.7.17 (was the book)
  revert: { icon: 'wi wi-undo', en: 'Cancel', ru: 'Отмена' }, // Cancel on a narrow phone
  star: { icon: 'wi wi-own', en: 'In my collection', ru: 'Есть в коллекции' }, // the roster unit card's header
  info: { icon: 'wi wi-info', en: 'View details', ru: 'Подробнее' }, // a wargear row's profiles in the unit editor
}

// The label is the menu item's own (ui.js `feedbackMenu`).
export const ACTIONS = {
  feedback: { en: 'Report a bug', ru: 'Сообщить об ошибке' },
}

export const MARK_RE = /\{btn:([a-z-]+)\}|\{key:([^}]+)\}|\{do:([a-z-]+)\}/g

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// `html` is renderInline's output; the marks passed through it untouched. An icon carries its
// name for a screen reader (and as a tooltip): "opens from [book]" says nothing read aloud.
// Marks that stand together ("{btn:gear} {btn:panes}") and the punctuation right after them are
// one unbreakable run: a line break between the two halves of one switch, or before the full stop
// after an icon, read as two separate things.
const RUN_RE = /(?:\{(?:btn|key|do):[^}]+\}(?:\s+(?=\{(?:btn|key|do):))?)+[.,;:!?»”)]?/g

const WHO_RE = /\{who:([^}]+)\}/g
// A host (and an optional path) — nothing that could close the attribute or start a scheme.
const LINK_RE = /\{link:([a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\/[\w./-]*)?)\}/g

export function renderMarks(html, locale = 'en') {
  return String(html)
    .replace(RUN_RE, (run) => `<span class="cl-nw">${drawMarks(run, locale)}</span>`)
    .replace(WHO_RE, (m, who) => `<strong class="cl-who">${esc(who)}</strong>`)
    .replace(LINK_RE, (m, to) => `<a class="cl-link" href="https://${to}" target="_blank" rel="noopener">${to}</a>`)
}

function drawMarks(html, locale) {
  return html.replace(MARK_RE, (m, btn, key, act) => {
    const b = btn && BTN_ICONS[btn]
    if (btn) return b ? `<span class="cl-btn" role="img" aria-label="${esc(b[locale] || b.en)}" title="${esc(b[locale] || b.en)}"><i class="${b.icon}"></i></span>` : m
    // A link and not a <button>: the sanitizer keeps no buttons, and a link is in the tab order.
    if (act) return ACTIONS[act] ? `<a class="cl-key cl-do" href="#" role="button" data-do="${act}">${esc(ACTIONS[act][locale] || ACTIONS[act].en)}</a>` : m
    return `<span class="cl-key">${esc(key)}</span>`
  })
}

// ── Sections (owner, 2026-10-13: "plain text, hard to read") ─────────────────────────────────────
// A release's notes are drawn as blocks, one per `{ h }` heading: an icon and a coloured edge
// that say what the block is about, so a reader finds "the roster builder" without reading every
// line. The kind is read off the heading's own words, EN or RU, so every release that ever used a
// heading gets its block — the archive's included — and `{ h, kind }` names one outright. A
// heading the table does not know fails changelogMarks.test.js: a new block is a decision about
// its colour, not a grey default nobody chose.
export const SECTION_KINDS = {
  rules: { icon: 'wi wi-army', words: ['Checking against the GW app', 'Сверка с приложением GW', 'Datasheets', 'Датащиты', 'Units', 'Юниты', 'Core Rules', 'Базовые правила', 'Deathwatch Support'] },
  roster: { icon: 'wi wi-rosters', words: ['Roster builder', 'Конструктор ростеров', 'Roster in a game', 'Ростер в партии'] },
  tracker: { icon: 'wi wi-tracker', words: ['Tracker', 'Трекер', 'Beta of the new game tracker', 'Бета нового трекера партии'] },
  answers: { icon: 'wi wi-faq', words: ['Answers to your questions', 'Ответы на вопросы'] },
  errors: { icon: 'wi wi-warning', words: ['Probable GW mistakes', 'Вероятные ошибки GW'] },
  thanks: { icon: 'wi wi-support', words: ['Thank you', 'Спасибо'] },
  report: { icon: 'wi wi-bug', words: ['Bug reports', 'Баг-репорты'] },
  site: { icon: 'wi wi-rules', words: ['Whole site', 'Весь сайт', 'Help', 'Справка', 'The app on your phone', 'Приложение на телефоне'] },
  account: { icon: 'wi wi-cloud', words: ['Account', 'Аккаунт', 'Cloud', 'Облако', 'Signing in', 'Вход'] },
}

/** @param {{ h: string, kind?: string }} note */
export function sectionKind(note) {
  if (note.kind && SECTION_KINDS[note.kind]) return note.kind
  return Object.keys(SECTION_KINDS).find((k) => SECTION_KINDS[k].words.includes(note.h)) || null
}

// The notes of one release as blocks: `{ h, kind, items }`, the notes before the first heading a
// block with no head (most releases in the archive have no headings at all and stay a plain list).
// A heading can name the GW update its block is about (`patch: '981'`): the page then shows a plate
// leading to that update on the GW updates page (owner, 2026-10-14: a link inside a note was lost).
/** @param {Array<string | { h: string, kind?: string, patch?: string }>} notes */
export function noteSections(notes) {
  const out = []
  for (const n of notes || []) {
    if (typeof n === 'object' && n?.h) out.push({ h: n.h, kind: sectionKind(n), items: [], ...(n.patch ? { patch: n.patch } : {}) })
    else {
      if (!out.length) out.push({ h: null, kind: null, items: [] })
      out[out.length - 1].items.push(n)
    }
  }
  return out
}

// An answer is "Question? Answer." in one note; in the answers block the question is set bold so
// the eye finds the questions first — the FAQ's own Q/A weight, without a second line each.
// Rendered HTML in, the first "?" that closes a sentence decides; a note with none is unchanged.
/** @param {string} html */
export function boldQuestion(html) {
  const m = /^([^<>]*(?:<[^>]*>[^<>]*)*?\?)(\s|$)/.exec(html)
  return m ? `<strong class="cl-q">${m[1]}</strong>${html.slice(m[1].length)}` : html
}

// In-app links a note carries, `[text](/path)` (useRenderInline makes them `a.int-link`, App.vue
// routes the click). Read here so the test can hold every one to a page that exists.
export const INT_LINK_RE = /\[([^\]]+)\]\((\/[^\s)]*)\)/g

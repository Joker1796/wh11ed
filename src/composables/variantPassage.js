// @ts-check
// The passage of a rule that ONE of its options is — for the "i" beside that option's chip. The
// heading's "i" already opens the whole rule; a player asking what Absolution in Battle does wants
// that paragraph, not three Vows to read through (owner, 2026-10-15: "track them, and read the rule").
//
// Two shapes carry an option in our rule text: a `### Name | Название` subheading followed by its
// paragraphs (Vows, Imperatives, Hyper-adaptations), and a bullet that names it (`▪ [LETHAL HITS].`
// `▪ __Or:__ [SUSTAINED HITS 1].`). A label found in neither gets nothing — the heading's "i" is
// still there — rather than a passage guessed at.
import { foldName } from '../core/shared/foldName.js'

/** Markup off, the gloss token reduced to its visible label, brackets and quotes dropped. @param {unknown} s */
const plain = (s) => foldName(String(s ?? '')
  .replace(/\[gloss:[^:\]]+:([^\]]+)\]/g, (_m, label) => label)
  .replace(/\[core:([^\]]+)\]/g, (_m, name) => name)
  .replace(/\*\*|__|[[\]«»"“”]/g, '')
  .replace(/^▪\s*(?:or:\s*)?/i, ''))

/**
 * @param {string | null | undefined} text the rule's body, as the card renders it
 * @param {string | null | undefined} label the option, as its chip names it
 * @returns {string | null}
 */
export function variantPassage(text, label) {
  const want = plain(label)
  if (!text || want.length < 3) return null
  const lines = String(text).split('\n')
  // A subheading: the option's own block, up to the next subheading.
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line.startsWith('### ')) continue
    const names = line.slice(4).split(' | ').map(plain)
    if (!names.some((n) => n === want)) continue
    let end = i + 1
    while (end < lines.length && !lines[end].trim().startsWith('### ')) end++
    return lines.slice(i, end).join('\n').trim()
  }
  // A bullet, or a line that opens with the option's name in bold ("**Huron's Elite:** …").
  for (const raw of lines) {
    const line = raw.trim()
    if (!line.startsWith('▪') && !line.startsWith('**')) continue
    const body = plain(line)
    if (body === want || body.startsWith(`${want}.`) || body.startsWith(`${want}:`)) return line
  }
  // The option's name alone on a line, its paragraphs after it ("The Path of the Penitent", then
  // "Add 3\" to the Move characteristic…") — up to the next line that is a name in the same way.
  for (let i = 0; i < lines.length; i++) {
    if (plain(lines[i]) !== want || lines[i].trim().startsWith('▪')) continue
    let end = i + 1
    while (end < lines.length && !(end > i + 1 && isTitle(lines, end))) end++
    return lines.slice(i, end).join('\n').trim()
  }
  return null
}

// A short line with no sentence ending, standing apart from what follows it: another option's name.
/** @param {string[]} lines @param {number} i */
function isTitle(lines, i) {
  const line = lines[i].trim()
  return !!line && line.length < 60 && !/[.:!?"”)]$/.test(line) && !line.startsWith('▪')
    && (i + 1 >= lines.length || !lines[i + 1].trim())
}

// The markup of a tracker help text (HelpText.vue): the first line is the lead, "▪ " lines are a
// list, a "⊘ " line says what changes when the thing is off, anything else is a paragraph, and
// **word** is a key word. HTML in the text is escaped — the strings are ours, but a help is not the
// place to start trusting markup.
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
export const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

/** @returns {Array<{ t: 'lead'|'p'|'off', html: string } | { t: 'ul', items: string[] }>} */
export function helpBlocks(text) {
  const out = []
  const lines = String(text || '').split('\n').map((l) => l.trim()).filter(Boolean)
  lines.forEach((line, i) => {
    if (line.startsWith('▪')) {
      const item = inline(line.slice(1).trim())
      const last = out[out.length - 1]
      if (last?.t === 'ul') last.items.push(item)
      else out.push({ t: 'ul', items: [item] })
    } else if (line.startsWith('⊘')) {
      out.push({ t: 'off', html: inline(line.slice(1).trim()) })
    } else {
      out.push({ t: i === 0 ? 'lead' : 'p', html: inline(line) })
    }
  })
  return out
}

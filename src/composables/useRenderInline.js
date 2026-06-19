export function useRenderInline() {
  function renderInline(text) {
    return text
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="ext-link">$1</a>')
      .replace(/\((\d{2}\.\d{2})\)/g, '<span class="cross-ref" data-ref="$1">($1)</span>')
      .replace(/\((\d{2})\)/g, '<span class="cross-ref" data-ref="$1.00">($1)</span>')
      .replace(
        /(Unmodified|Немодифицированный)(\s+)([1-6])\b/g,
        (_, word, sp, n) => `${word}${sp}<i class="bi bi-dice-${n}-fill dice-icon"></i>`
      )
      .replace(/\{(red|blue|green):([^}]+)\}/g, (_, color, text) => `<strong class="color-${color}">${text}</strong>`)
      .replace(/\[def:([^\]:]+):([^\]]+)\]/g, '<span class="def-link" data-def="$1">$2</span>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.+?)__/g, '<u>$1</u>')
      .replace(/\[([A-Z][A-Z\s\-–:0-9+]*)\]/g, '<span class="keyword">[$1]</span>')
      .replace(/\b(INFANTRY|VEHICLE|MONSTER|AIRCRAFT|CHARACTER|TITANIC|TRANSPORT|FORTIFICATION|BEASTS|BEAST|SWARM|WALKER|PSYKER|FLY|MOBILE|HOVER|FRAME|FLYING|EXPLOSIVES|GRENADES|SMOKE|DEDICATED)\b/g, '<strong>$1</strong>')
  }
  return { renderInline }
}

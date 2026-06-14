export function useRenderInline() {
  function renderInline(text) {
    return text
      .replace(
        /(Unmodified|Немодифицированный)(\s+)([1-6])\b/g,
        (_, word, sp, n) => `${word}${sp}<i class="bi bi-dice-${n}-fill dice-icon"></i>`
      )
      .replace(/\{(red|blue|green):([^}]+)\}/g, (_, color, text) => `<strong class="color-${color}">${text}</strong>`)
      .replace(/\[def:([^\]:]+):([^\]]+)\]/g, '<span class="def-link" data-def="$1">$2</span>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.+?)__/g, '<u>$1</u>')
      .replace(/\[([A-Z][A-Z\s\-–:0-9+]*)\]/g, '<span class="keyword">[$1]</span>')
      .replace(/\b(INFANTRY|VEHICLE|MONSTER|AIRCRAFT|CHARACTER|TITANIC|TRANSPORT|FORTIFICATION|BEAST|SWARM|WALKER|PSYKER|FLY|MOBILE|HOVER|FRAME|FLYING|EXPLOSIVES|GRENADES|SMOKE|DEDICATED)\b/g, '<strong>$1</strong>')
  }
  return { renderInline }
}

<template>
  <!-- The rule as the rules pages print it — paragraphs, lists, bold terms, keywords — with the
       words it lost struck and the words it gained marked, in place (owner, 2026-10-01). -->
  <div
    class="ptd"
    v-html="html"
  />
</template>

<script setup>
// How: the two texts are diffed word by word with their markup set aside (`**`, `__` — a word
// that only turned bold is not a change); each struck or added word is fenced with private-use
// characters, the new text so built goes through renderRichText like any rule, and the fences
// become <del>/<ins> afterwards. A fence sits INSIDE the word's own markup ("**" and "[ ]" stay
// outside it), so the tags nest inside the <strong>/keyword the renderer makes, never across it —
// and the keyword pattern in useRenderInline admits the fence characters for that reason.
import { computed } from 'vue'
import { diffWords } from '../../utils/wordDiff.js'
import { useRenderInline } from '../../composables/useRenderInline.js'

const props = defineProps({
  from: { type: String, default: '' },
  to: { type: String, default: '' },
})
const { renderRichText } = useRenderInline()

const DEL = ['', '']
const INS = ['', '']
const bare = (w) => w.replace(/\*\*|__/g, '').replace(/[‘’`]/g, "'").replace(/[‐‑–—]/g, '-')
// "**Eligible" → "**" + fence("Eligible"); a list marker or a line break is never fenced.
function fence(w, [open, close]) {
  if (w === '\n' || /^[▪•▫]$/.test(w)) return w
  const m = w.match(/^((?:\*\*|__|\[)*)(.*?)((?:\*\*|__|\])*)$/)
  return m[2] ? `${m[1]}${open}${m[2]}${close}${m[3]}` : w
}

const html = computed(() => {
  if (!props.from) return renderRichText(props.to)
  let src = ''
  for (const { t, w } of diffWords(props.from, props.to, bare)) {
    // The new text's line breaks shape the page; an old one dropped here would split a bold run
    // of the new text across two lines.
    if (t === 'del' && w === '\n') continue
    // A struck word sheds its own `**`/`__`: every marker left then comes from the new text, so
    // they pair up — an old "**DEATHWING INFANTRY**" half-kept left a stray "**" on the page.
    const piece = t === 'del' ? fence(w.replace(/\*\*|__/g, ''), DEL) : t === 'ins' ? fence(w, INS) : w
    src += src === '' || src.endsWith('\n') || piece === '\n' ? piece : ` ${piece}`
  }
  return renderRichText(src)
    .replaceAll(DEL[0], '<del class="ptd-del">').replaceAll(DEL[1], '</del>')
    .replaceAll(INS[0], '<ins class="ptd-ins">').replaceAll(INS[1], '</ins>')
})
</script>

<style scoped>
.ptd {
  margin: 0.3rem 0 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-primary);
}
.ptd :deep(ul) { margin: 0.25rem 0; padding-left: 1.2rem; }
.ptd :deep(li) { margin: 0.1rem 0; }
/* Struck and added, each in its theme's pair (--diff-* in style.css). */
.ptd :deep(.ptd-del) {
  background: var(--diff-del-bg);
  color: var(--diff-del-ink);
  text-decoration: line-through;
}
.ptd :deep(.ptd-ins) {
  background: var(--diff-ins-bg);
  color: var(--diff-ins-ink);
  text-decoration: none;
}
</style>

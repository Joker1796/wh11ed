<template>
  <!-- The example query a search box types into itself while empty (useTypingPlaceholder), laid
       over the input inside the host's `.typing-field` — a native placeholder can't carry the
       caret. It sits exactly where the placeholder would: the host sets `--typing-pad` to its
       input's padding plus border and `--typing-size` to its font size. Inert to the pointer, so
       a tap still lands in the input.

       Longer than the box (the roster catalogue on a phone is ~9 characters wide), the line
       scrolls the way a real input does while typing: the end and the caret stay in view. The
       line is right-to-left only to overflow on the left; the text itself is an isolated
       left-to-right run, so "Ion Aegis (Aura)" keeps its brackets where they belong. -->
  <span
    class="typing-ghost"
    aria-hidden="true"
  ><span class="tg-line"><span
    dir="ltr"
    class="tg-text"
  >{{ text }}</span></span></span>
</template>

<script setup>
defineProps({ text: { type: String, required: true } })
</script>

<style scoped>
.typing-ghost {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  padding: var(--typing-pad, 0);
  pointer-events: none;
  font-size: var(--typing-size, 1rem);
  font-family: var(--font-sans);
  color: var(--text-dim);
}
.tg-line {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  direction: rtl;
  text-align: left;
}
.tg-text::after {
  content: '';
  display: inline-block;
  width: 1px;
  height: 1.15em;
  margin-left: 1px;
  vertical-align: text-bottom;
  background: currentColor;
  animation: typing-caret 1s steps(2, jump-none) infinite;
}
@keyframes typing-caret {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>

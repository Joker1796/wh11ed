<template>
  <!-- A die seen from a corner, like the 🎲 it replaces: the app's dice faces (`wi-dice-1…6`) are
       face-on, and a face-on die reads as "five" rather than "at random". One pip on top,
       two on the left face, three on the right — down its other diagonal, from the top right
       corner (owner, 2026-11-03: along the top edge's slope they read as a far face). Solid, in the pack's manner (owner, 2026-11-03):
       one fill in `currentColor`, the edges between the faces and the pips cut out of it — drawn
       as an outline it read as a wire cube, its three pips a far face seen through it. 1em, sized
       and coloured like the icons beside it. Decorative: the label next to it carries the meaning. -->
  <svg
    class="die-icon"
    viewBox="0 0 16 16"
    width="1em"
    height="1em"
    aria-hidden="true"
    focusable="false"
  >
    <!-- The cut-outs: a mask per die, its id this instance's own (a page shows several dice, and a
         repeated id resolves to the first — one inside a hidden block would blank them all). -->
    <defs>
      <mask :id="maskId">
        <rect
          width="16"
          height="16"
          fill="#fff"
        />
        <path
          d="M1.5 4.5 8 8 14.5 4.5M8 8V15"
          fill="none"
          stroke="#000"
          stroke-width="1.1"
        />
        <g fill="#000">
          <ellipse
            cx="8"
            cy="4.5"
            rx="1.2"
            ry="0.7"
          />
          <circle
            cx="3.45"
            cy="7.65"
            r="0.85"
          />
          <circle
            cx="6.05"
            cy="11.85"
            r="0.85"
          />
          <circle
            cx="12.88"
            cy="7.13"
            r="0.85"
          />
          <circle
            cx="11.25"
            cy="9.75"
            r="0.85"
          />
          <circle
            cx="9.63"
            cy="12.38"
            r="0.85"
          />
        </g>
      </mask>
    </defs>
    <path
      d="M8 .6 14.9 4.3V11.7L8 15.4 1.1 11.7V4.3Z"
      fill="currentColor"
      :mask="`url(#${maskId})`"
    />
  </svg>
</template>

<script setup>
import { useId } from 'vue'

const maskId = `die-${useId()}`
</script>

<style scoped>
.die-icon {
  display: inline-block;
  vertical-align: -0.15em;
}
</style>

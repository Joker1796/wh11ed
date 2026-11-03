<template>
  <!-- Two dice, one tilted behind the other — "rolled", the 🎲 it replaces (owner, 2026-11-03).
       The app's dice faces (`wi-dice-1…6`) are a single face-on die, which reads as "five" rather
       than "at random"; a die drawn from a corner (2026-10) read as a wire cube, and at 14–18px as a
       hexagon. Solid, in the pack's manner: one fill in `currentColor`, the pips and the gap round
       the front die cut out of it. 1em, sized and coloured like the icons beside it. Decorative:
       the label next to it carries the meaning. -->
  <svg
    class="die-icon"
    viewBox="0 0 16 16"
    width="1em"
    height="1em"
    aria-hidden="true"
    focusable="false"
  >
    <!-- The cut-outs: a mask per icon, its id this instance's own (a page shows several, and a
         repeated id resolves to the first — one inside a hidden block would blank them all). -->
    <defs>
      <mask :id="maskId">
        <rect
          width="16"
          height="16"
          fill="#fff"
        />
        <!-- The gap that sets the front die apart from the one behind it. -->
        <rect
          x="1.2"
          y="5.6"
          width="9.6"
          height="9.6"
          fill="none"
          stroke="#000"
          stroke-width="1.3"
        />
        <g fill="#000">
          <!-- Front die: three on the diagonal. -->
          <circle
            cx="3.6"
            cy="8"
            r="0.95"
          />
          <circle
            cx="6"
            cy="10.4"
            r="0.95"
          />
          <circle
            cx="8.4"
            cy="12.8"
            r="0.95"
          />
          <!-- The die behind: two, on its own tilt. -->
          <g transform="rotate(20 11 5)">
            <circle
              cx="9.2"
              cy="3.2"
              r="0.9"
            />
            <circle
              cx="12.8"
              cy="6.8"
              r="0.9"
            />
          </g>
        </g>
      </mask>
    </defs>
    <g
      fill="currentColor"
      :mask="`url(#${maskId})`"
    >
      <rect
        x="7"
        y="1"
        width="8"
        height="8"
        transform="rotate(20 11 5)"
      />
      <rect
        x="1.2"
        y="5.6"
        width="9.6"
        height="9.6"
      />
    </g>
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

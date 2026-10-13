<template>
  <!-- A die seen from a corner, like the 🎲 it replaces: the app's dice faces (`wi-dice-1…6`) are
       face-on, and a face-on die reads as "five" rather than "at random". One pip on top,
       two on the left face, three on the right. `currentColor`, 1em — sized and coloured like the
       icons beside it; the top face is lit a little so the shape reads at 16px. Decorative:
       the label next to it carries the meaning. -->
  <svg
    class="die-icon"
    viewBox="0 0 16 16"
    width="1em"
    height="1em"
    aria-hidden="true"
    focusable="false"
  >
    <g
      fill="none"
      stroke="currentColor"
      stroke-width="1.1"
      stroke-linejoin="round"
    >
      <path
        d="M8 1 14.5 4.5 8 8 1.5 4.5Z"
        fill="currentColor"
        fill-opacity="0.18"
      />
      <path d="M1.5 4.5 8 8V15L1.5 11.5Z" />
      <path d="M8 8 14.5 4.5V11.5L8 15Z" />
    </g>
    <g fill="currentColor">
      <ellipse
        cx="8"
        cy="4.5"
        rx="1.15"
        ry="0.65"
      />
      <circle
        cx="3.45"
        cy="7.65"
        r="0.8"
      />
      <circle
        cx="6.05"
        cy="11.85"
        r="0.8"
      />
      <circle
        cx="9.63"
        cy="8.88"
        r="0.8"
      />
      <circle
        cx="11.25"
        cy="9.75"
        r="0.8"
      />
      <circle
        cx="12.88"
        cy="10.63"
        r="0.8"
      />
    </g>
  </svg>
</template>

<style scoped>
.die-icon {
  display: inline-block;
  vertical-align: -0.15em;
}
</style>

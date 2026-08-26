<template>
  <figure class="sc">
    <svg
      class="sc-svg"
      :viewBox="`0 0 ${W} ${H}`"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      :aria-label="aria"
    >
      <!-- Three gridlines and nothing else: this is a shape to read at a glance, and the exact
           numbers are printed underneath rather than crowded onto the plot. -->
      <g class="sc-grid">
        <template v-for="g in gridlines" :key="g.v">
          <line :x1="PAD.l" :x2="W - PAD.r" :y1="y(g.v)" :y2="y(g.v)" />
          <text :x="PAD.l - 5" :y="y(g.v) + 3">{{ g.v }}</text>
        </template>
      </g>
      <path class="sc-area" :d="area" />
      <polyline class="sc-line sc-opp" :points="line(oppPts)" />
      <polyline class="sc-line sc-you" :points="line(youPts)" />
      <circle v-for="(p, i) in oppPts" :key="'o' + i" class="sc-dot sc-opp" :cx="x(i)" :cy="y(p)" r="2.5" />
      <circle v-for="(p, i) in youPts" :key="'y' + i" class="sc-dot sc-you" :cx="x(i)" :cy="y(p)" r="3" />
      <text v-for="(r, i) in rounds" :key="'x' + i" class="sc-xlab" :x="x(i)" :y="H - 6">{{ r.round }}</text>
    </svg>

    <!-- The chart is the shape; this is the data. Also what a screen reader and a narrow phone get. -->
    <figcaption class="sc-nums">
      <div v-for="(r, i) in rounds" :key="r.round" class="sc-num">
        <span class="sc-num-r">{{ roundLabel }}{{ r.round }}</span>
        <span class="sc-num-you">{{ fmt(youPts[i]) }}</span>
        <span class="sc-num-opp">{{ fmt(oppPts[i]) }}</span>
      </div>
    </figcaption>
  </figure>
</template>

<script setup>
// Average cumulative VP across your games, yours against your opponents'. Hand-rolled SVG on the
// theme's own variables — a chart library would cost more bundle than the whole tracker section
// and this is two polylines (see the stats notes in CLAUDE.md).
import { computed } from 'vue'

const props = defineProps({
  rounds: { type: Array, required: true },   // [{ round, youCum, oppCum }] from buildStats
  aria: { type: String, default: '' },
  roundLabel: { type: String, default: 'R' },
})

const W = 320
const H = 170
const PAD = { l: 26, r: 8, t: 10, b: 22 }

const youPts = computed(() => props.rounds.map((r) => r.youCum || 0))
const oppPts = computed(() => props.rounds.map((r) => r.oppCum || 0))

// Round the axis up to a clean 10 so the top gridline is a number a player recognises.
const maxY = computed(() => {
  const peak = Math.max(0, ...youPts.value, ...oppPts.value)
  return Math.max(10, Math.ceil(peak / 10) * 10)
})
const gridlines = computed(() => [0, maxY.value / 2, maxY.value].map((v) => ({ v: Math.round(v) })))

function x(i) {
  const n = Math.max(1, props.rounds.length - 1)
  return PAD.l + (i * (W - PAD.l - PAD.r)) / n
}
function y(v) {
  const plot = H - PAD.t - PAD.b
  return H - PAD.b - (Math.min(v, maxY.value) / maxY.value) * plot
}
function line(pts) {
  return pts.map((v, i) => `${x(i)},${y(v)}`).join(' ')
}
const area = computed(() => {
  const pts = youPts.value
  if (!pts.length) return ''
  const base = H - PAD.b
  return `M ${x(0)},${base} ` + pts.map((v, i) => `L ${x(i)},${y(v)}`).join(' ') + ` L ${x(pts.length - 1)},${base} Z`
})

function fmt(v) {
  return v >= 10 ? Math.round(v) : Math.round(v * 10) / 10
}
</script>

<style scoped>
.sc { margin: 0; }
.sc-svg { display: block; width: 100%; height: auto; }

.sc-grid line { stroke: var(--border); stroke-width: 1; }
.sc-grid text { fill: var(--text-dim); font-size: 9px; text-anchor: end; }
.sc-xlab { fill: var(--text-dim); font-size: 9px; text-anchor: middle; }

.sc-line { fill: none; stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }
.sc-line.sc-you { stroke: var(--accent); }
.sc-line.sc-opp { stroke: var(--text-dim); stroke-dasharray: 4 3; }
.sc-dot.sc-you { fill: var(--accent); }
.sc-dot.sc-opp { fill: var(--text-dim); }
.sc-area { fill: var(--accent); opacity: 0.1; }

.sc-nums {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.25rem;
  margin-top: 0.5rem;
  font-size: 0.75rem;
}
.sc-num { text-align: center; }
.sc-num-r { display: block; color: var(--text-dim); font-size: 0.68rem; }
.sc-num-you { color: var(--accent); font-weight: 600; }
.sc-num-opp { color: var(--text-muted); }
.sc-num-you::after { content: ' / '; color: var(--text-dim); font-weight: 400; }
</style>

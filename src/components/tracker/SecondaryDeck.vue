<template>
  <div class="sec">
    <div class="sec-head">
      <span class="sec-title">{{ labels.trackerSecondary }}</span>
      <button
        v-if="mode === 'tactical'"
        class="draw-btn"
        :disabled="!player.secondary.deck.length"
        @click="onDraw"
      >{{ player.secondary.deck.length ? labels.trackerDraw : labels.trackerNoMoreCards }}</button>
    </div>

    <!-- Compact mission cards — tap to open the scoring modal -->
    <ul class="cards">
      <li v-for="m in handMissions" :key="m.slug" class="card">
        <button class="card-open" @click="openSlug = m.slug">
          <span class="card-name">{{ m.name }}</span>
          <span class="card-vp">{{ secondaryCardVp(pi, m.slug) }} VP</span>
        </button>
        <button v-if="mode === 'tactical'" class="discard" :title="labels.trackerSetAside" @click="discardFromHand(pi, m.slug)">✕</button>
      </li>
    </ul>

    <div v-if="asideMissions.length" class="aside">
      <span class="aside-label">{{ labels.trackerSetAside }}</span>
      <ul class="cards">
        <li v-for="m in asideMissions" :key="m.slug" class="card">
          <button class="card-open aside-card" @click="openSlug = m.slug">
            <span class="card-name">{{ m.name }}</span>
            <span class="card-vp">{{ secondaryCardVp(pi, m.slug) }} VP</span>
          </button>
        </li>
      </ul>
    </div>

    <ScoringModal
      v-if="openMission"
      :title="openMission.name"
      :subtitle="`${labels.trackerSecondary} · ${openMission.category}`"
      :vp="secondaryCardVp(pi, openMission.slug)"
      :blocks="relevantBlocks(openMission)"
      :count="(bi, ri) => secondaryRowCount(pi, openMission.slug, bi, ri)"
      @set="(bi, ri, c) => scoreSecondaryRow(pi, openMission.slug, bi, ri, c)"
      @close="openSlug = null"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ScoringModal from './ScoringModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, missionBySlug } from '../../composables/useTracker.js'

const props = defineProps({ pi: { type: Number, required: true } })
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const { current, drawSecondary, discardFromHand, scoreSecondaryRow, secondaryRowCount, secondaryCardVp } = useTracker()

const player = computed(() => current.value.players[props.pi])
const mode = computed(() => player.value.secondaryMode)
const handMissions = computed(() =>
  player.value.secondary.hand.map(slug => missionBySlug(slug, player.value.role)).filter(Boolean)
)
// A discarded card is shown only in the round where it scored points or was set aside.
const asideMissions = computed(() => {
  const round = current.value.currentRound
  const s = player.value.secondary
  const out = []
  for (const d of (s.discarded || [])) {
    const slug = typeof d === 'string' ? d : d.slug
    const dround = typeof d === 'string' ? null : d.round
    const scoredThisRound = s.scored.some(e => e.slug === slug && e.round === round && (e.vp || 0) > 0)
    if (dround === round || scoredThisRound) {
      const m = missionBySlug(slug, player.value.role)
      if (m && !out.some(x => x.slug === slug)) out.push(m)
    }
  }
  return out
})

const openSlug = ref(null)
const openMission = computed(() => openSlug.value ? missionBySlug(openSlug.value, player.value.role) : null)

// Only the block(s) matching the player's mode are scorable; annotate for the modal.
function relevantBlocks(m) {
  return m.blocks
    .map((b, bi) => ({ b, bi }))
    .filter(({ b }) => b.kind === mode.value)
    .map(({ b, bi }) => ({
      bi, kind: b.kind, heading: b.heading, when: b.when,
      rows: b.rows.map((r, ri) => ({ ...r, ri, perEach: /^(For each|Each time)/i.test(r.text) })),
    }))
}

function onDraw() { drawSecondary(props.pi) }
</script>

<style scoped>
.sec { margin-top: 0.6rem; }
.sec-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem; }
.sec-title { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim); }
.draw-btn {
  padding: 0.35rem 0.8rem; background: var(--accent); color: #fff; border: none;
  border-radius: 4px; font-size: 0.78rem; font-weight: 600; cursor: pointer;
}
.draw-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.cards { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; }
.card { display: flex; align-items: stretch; gap: 0.3rem; }
.card-open {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.55rem 0.65rem;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--bg-secondary);
  cursor: pointer;
  text-align: left;
}
.card-open:hover { border-color: var(--accent); }
.card-name { font-weight: 700; font-size: 0.88rem; color: var(--text-primary); }
.card-vp { font-family: var(--font-mono); font-weight: 700; font-size: 0.82rem; color: var(--accent); flex-shrink: 0; }
.discard {
  background: none; border: 1px solid var(--border); border-radius: 5px; color: var(--text-dim);
  cursor: pointer; font-size: 0.85rem; padding: 0 0.5rem; flex-shrink: 0;
}
.discard:hover { color: var(--accent); border-color: var(--accent); }
.aside {
  margin-top: 0.55rem; padding-top: 0.45rem; border-top: 1px dashed var(--border);
}
.aside-label { display: block; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-dim); margin-bottom: 0.35rem; }
.aside-card { opacity: 0.75; }
.aside-card:hover { opacity: 1; }
</style>

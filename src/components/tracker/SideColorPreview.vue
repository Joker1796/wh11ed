<template>
  <!-- Two placeholder cards in the colours the game screen will wear: each side's stripe and name
       in its colour, a score, and a "turn" button filled with it — what the accent turns into on
       that side's turn. -->
  <div
    class="scp side-colored"
    :style="style"
    :aria-label="labels.trackerColorPreview"
    role="img"
  >
    <div
      v-for="s in sides"
      :key="s.key"
      class="scp-card"
      :class="s.key"
    >
      <div class="scp-name">
        {{ s.name }}
      </div>
      <div class="scp-fac">
        {{ s.faction }}
      </div>
      <div class="scp-foot">
        <span class="scp-vp">10 <small>VP</small></span>
        <span class="scp-btn">{{ labels.trackerTurnTag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { factionIndexBySlug } from '../../data/factionsIndex.js'
import { resolveSideColors, sideColorStyle } from '../../composables/sideColors.js'

// Beside the "faction colours" option (TrackOptions): the choice shown, not described.
const props = defineProps({
  you: { type: String, default: null },   // the sides' faction slugs
  opp: { type: String, default: null },
  factionColors: { type: Boolean, default: false },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const style = computed(() => sideColorStyle(resolveSideColors(props.you, props.opp, props.factionColors)))
const sides = computed(() => [
  { key: 'you', name: labels.value.trackerYou, faction: factionIndexBySlug(props.you)?.name || labels.value.trackerOptNeedsFaction },
  { key: 'opp', name: labels.value.trackerOpponent, faction: factionIndexBySlug(props.opp)?.name || labels.value.trackerOptNeedsFaction },
])
</script>

<style scoped>
.scp { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; }
.scp-card {
  --side: var(--side-you);
  min-width: 0;
  padding: 0.45rem 0.55rem;
  border: 1px solid var(--border);
  border-left: 4px solid var(--side);
  background: color-mix(in srgb, var(--side) 6%, var(--bg-card));
}
.scp-card.opp { --side: var(--side-opponent); }
.scp-name {
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-family: var(--font-display); font-size: 1.15rem; font-weight: 600; line-height: 1.1; color: var(--side);
}
.scp-fac { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.74rem; color: var(--text-muted); }
.scp-foot { display: flex; align-items: center; justify-content: space-between; gap: 0.4rem; margin-top: 0.3rem; }
.scp-vp { font-family: var(--font-display); font-size: 1.3rem; line-height: 1; color: var(--text-primary); }
.scp-vp small { font-size: 0.7rem; color: var(--text-dim); }
.scp-btn {
  padding: 0.15rem 0.5rem; background: var(--side); color: #fff;
  font-family: var(--font-display); font-size: 0.95rem; font-weight: 700; text-transform: uppercase;
}
</style>

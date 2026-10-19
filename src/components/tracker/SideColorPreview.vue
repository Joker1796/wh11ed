<template>
  <!-- Two placeholder cards in the colours the game screen will wear: each side's stripe, name and
       emblem in its colour, and a score. No "turn" badge since 2026-10-02 (owner). With "Customise colours" on, each card has its side's picker over
       it. -->
  <div
    class="scp side-colored"
    :style="style"
  >
    <div
      v-for="s in sides"
      :key="s.key"
      class="scp-side"
    >
      <label
        v-if="editable"
        class="scp-pick"
      >
        <select
          :value="picks?.[s.key] || ''"
          :aria-label="s.name"
          @change="pick(s.key, $event.target.value)"
        >
          <option value="">{{ s.faction ? labels.sideColorFaction : labels.sideColorStandard }}</option>
          <option
            v-for="c in PALETTE"
            :key="c.key"
            :value="c.key"
          >{{ labels[c.label] }}</option>
        </select>
      </label>
      <div
        class="scp-card"
        :class="s.key"
        role="img"
        :aria-label="`${labels.trackerColorPreview}: ${s.name}`"
      >
        <FactionEmblem
          :faction="s.faction"
          stamp
        />
        <div class="scp-name">
          {{ s.name }}
        </div>
        <div class="scp-fac">
          {{ s.faction?.name || labels.trackerOptNeedsFaction }}
        </div>
        <div class="scp-foot">
          <span class="scp-vp">10 <small>VP</small></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { factionIndexBySlug } from '../../data/factionsIndex.js'
import { PALETTE, resolveSideColors, sideColorStyle } from '../../composables/sideColors.js'
import FactionEmblem from '../FactionEmblem.vue'

// Under the "Customise colours" option (TrackOptions): the choice shown, not described. The sides
// are known by this step, so each card carries its army's emblem as the score board will.
const props = defineProps({
  you: { type: String, default: null },   // the sides' faction slugs
  opp: { type: String, default: null },
  // The phone's picks ({ you, opp } palette keys) — null while the option is off.
  picks: { type: Object, default: null },
  // The pickers: drawn while the option is on and this phone may change it.
  editable: { type: Boolean, default: false },
})
const emit = defineEmits(['update:picks'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const style = computed(() => sideColorStyle(resolveSideColors(props.you, props.opp, props.picks)))
const sides = computed(() => [
  { key: 'you', name: labels.value.trackerYou, faction: factionIndexBySlug(props.you) },
  { key: 'opp', name: labels.value.trackerOpponent, faction: factionIndexBySlug(props.opp) },
])
function pick(side, key) {
  emit('update:picks', { ...props.picks, [side]: key || null })
}
</script>

<style scoped>
.scp { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 0.4rem; }
.scp-side { min-width: 0; display: flex; flex-direction: column; gap: 0.3rem; }
.scp-pick select {
  width: 100%;
  padding: 0.35rem 0.45rem;
  font: inherit;
  font-size: 0.85rem;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
}
.scp-card {
  --side: var(--side-you);
  position: relative;
  contain: paint; /* the emblem stamp sits under the card's text, clipped to it */
  min-width: 0;
  padding: 0.45rem 0.55rem;
  border: 1px solid var(--border);
  border-left: 4px solid var(--side);
  background: color-mix(in srgb, var(--side) 6%, var(--bg-card));
}
.scp-card.opp { --side: var(--side-opponent); }
/* The score board's stamp (ScoreBoard.vue), one step down for a card half its height. */
.scp-card .stamp { right: 2.6rem; height: calc(var(--stamp-k) * 3.6rem); color: var(--side); }
.scp-name {
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; line-height: 1.1; color: var(--side);
}
.scp-fac { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.74rem; color: var(--text-muted); }
.scp-foot { margin-top: 0.3rem; }
.scp-vp { font-family: var(--font-display); font-size: 1.3rem; line-height: 1; color: var(--text-primary); }
.scp-vp small { font-size: 0.7rem; color: var(--text-dim); }
</style>

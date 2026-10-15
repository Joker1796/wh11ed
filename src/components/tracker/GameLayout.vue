<template>
  <section
    v-if="layout"
    class="gl"
  >
    <button
      type="button"
      class="gl-head"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="gl-title">{{ labels.trackerLayoutHeading }}</span>
      <span class="gl-name">{{ labels.eventLayout }} {{ layout.id }}</span>
      <ChevronIcon :turned="open" />
    </button>
    <CollapseTransition :show="open">
      <LayoutCard :layout="layout" />
    </CollapseTransition>
  </section>
</template>

<script setup>
// The game's battlefield layout on the Missions tab, for every phone (a player's report,
// 2026-10-15: "the opponent who joined can't see the map" — it lived only in the setup dialog,
// which a guest gets cut down to the options). Read only: the layout is the host's to change, in
// that dialog. Open until the battle begins — deployment is when the map is looked at — then
// folded, a tap away.
import { computed, ref } from 'vue'
import ChevronIcon from '../ChevronIcon.vue'
import CollapseTransition from '../CollapseTransition.vue'
import LayoutCard from '../event/LayoutCard.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { resolveLayout } from '../../composables/trackerLayout.js'

const props = defineProps({
  game: { type: Object, required: true },
  begun: { type: Boolean, default: false },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const layout = computed(() => resolveLayout(props.game.settings, props.game.players?.[0]?.disposition, props.game.players?.[1]?.disposition))
const open = ref(!props.begun)
</script>

<style scoped>
.gl { margin-top: 0.6rem; border: 1px solid var(--border); background: var(--bg-card); }
.gl-head {
  display: flex; align-items: center; gap: 0.5rem; width: 100%;
  min-height: 40px; padding: 0.35rem 0.6rem;
  border: 0; background: none; font: inherit; text-align: left; cursor: pointer; color: var(--text-primary);
}
.gl-title { font-family: var(--font-display); font-size: 1.05rem; text-transform: uppercase; }
.gl-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.8rem; color: var(--text-muted); }
.gl :deep(.layout-card) { margin: 0; padding: 0 0.6rem 0.6rem; }
</style>

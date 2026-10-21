<template>
  <!-- The Legendary Proxies table and GW's word on Legends, opened from the button over the
       faction's unit list (owner, 2026-10-21): under the list's last group, on a wide screen inside
       a column that scrolls by itself, nobody found it. The table leads — it is what a player with an
       old model comes for — and the intro is folded under it. A row opens its unit where the list
       is (`pick`, `inPlace`), as a row of the list would. From a unit's "Proxy" badge it shows that
       unit's rows alone (`only`). -->
  <BaseModal
    :title="labels.dsLegendsProxies"
    max-width="560px"
    @close="$emit('close')"
  >
    <div
      class="modal-body flm-body"
      @click.capture="onPick"
    >
      <LegendaryProxyList
        :slug="slug"
        :proxies="rows"
      />
      <template v-if="legends.intro">
        <button
          type="button"
          class="flm-about"
          :aria-expanded="introOpen"
          @click="introOpen = !introOpen"
        >
          <ChevronIcon
            :turned="introOpen"
            from="right"
            to="down"
          />
          <span>{{ labels.dsLegendsAbout }}</span>
        </button>
        <CollapseTransition :show="introOpen">
          <div class="flm-intro rule-body">
            <RuleBody :body="legends.intro" />
          </div>
        </CollapseTransition>
      </template>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseModal from './BaseModal.vue'
import ChevronIcon from './ChevronIcon.vue'
import CollapseTransition from './CollapseTransition.vue'
import LegendaryProxyList from './LegendaryProxyList.vue'
import RuleBody from './RuleBody.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { unitLinkOf } from '../utils/unitLink.js'

const props = defineProps({
  slug: { type: String, required: true },
  legends: { type: Object, required: true }, // useFactionLegends' { intro, proxies }
  // One unit's rows only — opened from its "Proxy" badge.
  only: { type: String, default: '' },
  // A row opens its unit where the dialog was opened (`pick`) instead of leaving for its page.
  inPlace: { type: Boolean, default: true },
})
const emit = defineEmits(['close', 'pick'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const introOpen = ref(false)
const rows = computed(() => (props.legends.proxies || []).filter((p) => !props.only || p.id === props.only))

// The dialog is teleported out of the list, so the list's own catch of unit links cannot see it.
function onPick(e) {
  const id = unitLinkOf(e, props.slug)
  // A row naming the unit the dialog was opened from only closes it, wherever that is.
  if (!id || (!props.inPlace && id !== props.only)) return
  e.preventDefault()
  emit('pick', id)
}
</script>

<style scoped>
.flm-body { padding: 0.4rem 1rem 1rem; }
.flm-about {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.75rem;
  padding: 0.2rem 0;
  border: 0;
  background: none;
  color: var(--text-muted);
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
}
@media (hover: hover) { .flm-about:hover { color: var(--accent-ink); } }
/* Muted — an aside, not the table the dialog is for. The global `strong` is near-white in the dark
   theme, and on a muted paragraph every **Legendary Proxies** flared against it; here bold keeps the
   paragraph's own colour and is bold by weight alone. */
.flm-intro {
  padding: 0.3rem 0 0.2rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}
.flm-intro :deep(strong) {
  color: inherit;
  font-weight: 700;
}
</style>

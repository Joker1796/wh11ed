<template>
  <BaseModal
    :title="labels.campAddCard"
    :subtitle="subtitle"
    max-width="560px"
    :z-index="410"
    @close="emit('close')"
  >
    <!-- The deck by its three piles, Battle Honours by phase and Relics by Alliance as the rules
         page groups them. Each card shows its head and marks; the one tapped opens its text, and the
         button at the foot adds it. -->
    <div class="modal-body camp-picker-body">
      <div class="seg camp-picker-kinds">
        <button
          v-for="k in kinds"
          :key="k.key"
          type="button"
          :class="{ on: kind === k.key }"
          @click="kind = k.key"
        >
          {{ k.label }}
        </button>
      </div>
      <p
        v-if="!groups.length"
        class="empty-note"
      >
        {{ labels.campPickerEmpty }}
      </p>
      <section
        v-for="g in groups"
        :key="g.key"
        class="camp-picker-group"
      >
        <h3
          v-if="g.label"
          class="dgroup-label"
        >
          {{ g.label }}
        </h3>
        <div class="camp-picker-list">
          <div
            v-for="u in g.cards"
            :key="u.slug"
            class="camp-card-pick"
            :class="{ on: picked === u.slug }"
            role="button"
            tabindex="0"
            data-press
            :aria-pressed="picked === u.slug"
            @click="pick(u.slug, $event)"
            @keydown.enter.space.self.prevent="pick(u.slug)"
          >
            <DomUpgradeCard
              :upgrade="u"
              :folded="picked !== u.slug"
            />
          </div>
        </div>
      </section>
    </div>
    <footer class="camp-draw-foot">
      <button
        class="btn-primary"
        :disabled="!picked"
        @click="emit('pick', picked)"
      >
        {{ picked ? labels.campAddNamed.replace('{card}', upgradeName(picked)) : labels.campKeepPick }}
      </button>
    </footer>
  </BaseModal>
</template>

<script setup>
// The Warmaster adds a card to a player's hand by hand: any card of the deck the player does not
// hold, one at a time. The list is the cards themselves, folded to their heads — the names alone
// (a select of forty lines) told nothing of what a card does.
import { ref, computed } from 'vue'
import BaseModal from '../../BaseModal.vue'
import DomUpgradeCard from '../DomUpgradeCard.vue'
import { useCampaignView } from './useCampaignView.js'

const props = defineProps({
  held: { type: Array, required: true },
  subtitle: { type: String, default: '' },
})
const emit = defineEmits(['close', 'pick'])
const { deck, labels, allianceName, phaseLabel, upgradeName } = useCampaignView()

const kinds = computed(() => {
  const l = labels.value
  return [{ key: 'honour', label: l.domHonours }, { key: 'skill', label: l.domSkills }, { key: 'relic', label: l.domRelics }]
})
const kind = ref('honour')
const picked = ref(null)

const groups = computed(() => {
  const free = (deck.value?.upgrades || []).filter((u) => u.kind === kind.value && !props.held.includes(u.slug))
  if (kind.value === 'skill') return free.length ? [{ key: 'skill', label: '', cards: free }] : []
  const by = kind.value === 'honour' ? (u) => u.phase : (u) => u.alliance || ''
  const keys = [...new Set(free.map(by))]
  return keys.map((k) => ({
    key: String(k),
    label: kind.value === 'honour' ? phaseLabel(k) : k ? allianceName(k) : '',
    cards: free.filter((u) => by(u) === k),
  }))
})

// A tap on a keyword inside an open card reads it and leaves the choice alone.
function pick(slug, ev) {
  if (ev?.target.closest('.keyword, [data-kw-open], a, button')) return
  picked.value = picked.value === slug ? null : slug
}
</script>

<style scoped>
.camp-picker-body { padding: 0.8rem 0.9rem 1rem; }
.camp-picker-kinds { display: flex; width: 100%; margin-bottom: 0.6rem; }
.camp-picker-kinds > button { flex: 1 1 0; }
.camp-picker-group + .camp-picker-group { margin-top: 1rem; }
.camp-picker-group .dgroup-label { margin: 0 0 0.4rem; }
.camp-picker-list { display: grid; gap: 0.4rem; }
</style>

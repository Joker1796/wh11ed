<template>
  <article
    :id="`upgrade-${upgrade.slug}`"
    class="dcard"
    :class="`dom-deck-upgrade dom-ink-${upgrade.alliance || upgrade.kind}`"
  >
    <header class="dcard-head">
      <span class="dcard-tag">{{ tag }}</span>
      <h3 class="dcard-name">
        {{ upgrade.name }}
      </h3>
      <span
        v-if="upgrade.nameRu"
        class="dname-ru"
      >{{ upgrade.nameRu }}</span>
    </header>
    <p
      v-if="upgrade.lore"
      class="dcard-lore lines"
    >
      {{ upgrade.lore }}
    </p>
    <!-- WHO: and EFFECT: beside their text, as the card prints them. -->
    <div class="dup-rows">
      <template v-if="upgrade.who">
        <span class="dup-label">{{ labels.domWho }}</span>
        <span class="dup-who">{{ upgrade.who }}</span>
      </template>
      <span class="dup-label">{{ labels.domEffect }}</span>
      <div class="dbody">
        <RuleBody :body="upgrade.body" />
      </div>
    </div>
    <div
      v-if="upgrade.bonus"
      class="dup-bonus"
    >
      <div class="dchip">
        {{ labels.domBonusEffect }}: {{ upgrade.bonus.label }}
      </div>
      <div class="dbody">
        <RuleBody :body="upgrade.bonus.body" />
      </div>
    </div>
    <DomCardMark
      :kind="upgrade.kind"
      :phase="upgrade.kind === 'honour' ? upgrade.phase : 0"
      :alliance="upgrade.alliance || ''"
    />
  </article>
</template>

<script setup>
// One Upgrade card — a Battle Honour, Battle Skill or Relic: its lore, who can take it, what it
// does, and the bonus effect for a particular kind of model. The pile and phase/Alliance are also
// the group heading above it (DomChapterUpgrades); the card's own tag and corner marks repeat them,
// as the printed card does.
import { computed } from 'vue'
import RuleBody from '../RuleBody.vue'
import DomCardMark from './DomCardMark.vue'
import { useDominatus } from './useDominatus.js'

const props = defineProps({
  upgrade: { type: Object, required: true },
})
const { labels, cardTag } = useDominatus()
const tag = computed(() => cardTag({ kind: props.upgrade.kind, alliance: props.upgrade.alliance }))
</script>

<style scoped>
.dup-rows {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.3rem 0.5rem;
  align-items: baseline;
  font-size: 0.9rem;
}
.dup-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-primary);
}
.dup-bonus {
  margin-top: 0.6rem;
  padding: 0.45rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
}
.dup-bonus .dchip { margin-bottom: 0.3rem; }
</style>

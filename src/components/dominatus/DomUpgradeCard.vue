<template>
  <article
    :id="`upgrade-${upgrade.slug}`"
    class="dcard"
  >
    <header class="dcard-head">
      <h3 class="dcard-name">
        {{ upgrade.name }}
      </h3>
      <span
        v-if="upgrade.nameRu"
        class="dname-ru"
      >{{ upgrade.nameRu }}</span>
    </header>
    <p
      v-if="upgrade.who"
      class="dup-who"
    >
      <strong>{{ labels.domWho }}</strong> {{ upgrade.who }}
    </p>
    <div class="dbody">
      <RuleBody :body="upgrade.body" />
    </div>
    <div
      v-if="upgrade.bonus"
      class="dup-bonus"
    >
      <div class="dup-bonus-label">
        {{ labels.domBonusEffect }}: {{ upgrade.bonus.label }}
      </div>
      <div class="dbody">
        <RuleBody :body="upgrade.bonus.body" />
      </div>
    </div>
  </article>
</template>

<script setup>
// One Upgrade card — a Battle Honour, Battle Skill or Relic: who can take it, what it does, and
// the bonus effect for a particular kind of model. Its pile and phase/Alliance are the group
// heading above it (DomChapterUpgrades), not repeated on the card.
import RuleBody from '../RuleBody.vue'
import { useDominatus } from './useDominatus.js'

defineProps({
  upgrade: { type: Object, required: true },
})
const { labels } = useDominatus()
</script>

<style scoped>
.dup-who { margin: 0 0 0.35rem; font-size: 0.86rem; }
.dup-bonus {
  margin-top: 0.6rem;
  padding: 0.45rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
}
.dup-bonus-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  margin-bottom: 0.2rem;
}
</style>

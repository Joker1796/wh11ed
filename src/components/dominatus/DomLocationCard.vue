<template>
  <article
    :id="`location-${location.slug}`"
    class="dcard"
  >
    <header class="dcard-head">
      <h3 class="dcard-name">
        {{ location.name }}
      </h3>
      <span class="dcard-sub">{{ labels.domRoll.replace('{n}', location.roll) }}</span>
    </header>

    <section class="dloc-part">
      <div class="dloc-label">
        {{ labels.domLocationBonus }}
      </div>
      <h4 class="dloc-rule">
        {{ location.bonus.name }}
        <span
          v-if="location.bonus.nameRu"
          class="dname-ru"
        >{{ location.bonus.nameRu }}</span>
      </h4>
      <div class="dbody">
        <RuleBody :body="location.bonus.body" />
      </div>
    </section>

    <section class="dloc-part">
      <div class="dloc-label">
        {{ labels.domWarZone }}
      </div>
      <template
        v-for="w in location.warZone"
        :key="w.name"
      >
        <h4 class="dloc-rule">
          {{ w.name }}
          <span
            v-if="w.nameRu"
            class="dname-ru"
          >{{ w.nameRu }}</span>
        </h4>
        <div class="dbody">
          <RuleBody :body="w.body" />
        </div>
      </template>
    </section>
  </article>
</template>

<script setup>
// One Location card, both faces: the bonus the Alliance that takes it keeps, and the war zone
// rules every battle of its phase is fought under.
import RuleBody from '../RuleBody.vue'
import { useDominatus } from './useDominatus.js'

defineProps({
  location: { type: Object, required: true },
})
const { labels } = useDominatus()
</script>

<style scoped>
.dloc-part + .dloc-part {
  margin-top: 0.7rem;
  padding-top: 0.6rem;
  border-top: 1px dashed var(--border);
}
.dloc-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}
.dloc-rule {
  margin: 0.35rem 0 0.15rem;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--text-primary);
}
</style>

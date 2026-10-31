<template>
  <article
    :id="`location-${location.slug}`"
    class="dcard dom-ink-location"
  >
    <header class="dcard-head">
      <span class="dcard-tag">{{ tag }}</span>
      <h3 class="dcard-name">
        {{ location.name }}
      </h3>
    </header>
    <p
      v-if="location.lore"
      class="dcard-lore lines"
    >
      {{ location.lore }}
    </p>

    <section class="dloc-part">
      <div class="dchip">
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
      <div class="dchip">
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
    <!-- The map square's caption on the card: its grid reference. -->
    <div class="dloc-grid">
      {{ location.grid }}
    </div>
    <DomCardMark
      kind="location"
      :phase="location.phase"
      :tag="tag"
    />
  </article>
</template>

<script setup>
// One Location card, both faces: the bonus the Alliance that takes it keeps, and the war zone
// rules every battle of its phase is fought under.
import { computed } from 'vue'
import RuleBody from '../RuleBody.vue'
import DomCardMark from './DomCardMark.vue'
import { useDominatus } from './useDominatus.js'

const props = defineProps({
  location: { type: Object, required: true },
})
const { labels, cardTag } = useDominatus()
const tag = computed(() => cardTag({ kind: 'location', roll: props.location.roll }))
</script>

<style scoped>
.dloc-part + .dloc-part {
  margin-top: 0.7rem;
  padding-top: 0.6rem;
  border-top: 1px dashed var(--border);
}
/* "2093-AR:VOLCANUS" — the grid reference printed under the card's map square. */
.dloc-grid {
  margin-top: 0.6rem;
  /* Inter, not the system monospace: a phone without Courier draws whatever it has (style.css). */
  font-variant-numeric: tabular-nums;
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
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

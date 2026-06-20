<template>
  <article class="mcard" :id="`mission-${mission.slug}`">
    <header class="mcard-head">
      <h3 class="mcard-name">{{ mission.name }}</h3>
      <span v-if="subtitle" class="mcard-sub">{{ subtitle }}</span>
    </header>

    <div v-for="(b, bi) in mission.blocks" :key="bi" class="m-block">
      <div class="m-bhead">
        <span v-if="b.kind" class="kind" :class="b.kind">{{ b.kind }}</span>
        <span class="m-heading">{{ b.heading }}</span>
        <span v-if="b.when" class="m-when">{{ b.when }}</span>
      </div>
      <div v-for="(r, ri) in b.rows" :key="ri" class="m-cond">
        <span class="m-text">
          <em v-if="r.modifier === 'or'" class="or">{{ labels.trackerOr }}</em>
          {{ r.text }}
          <strong>{{ r.vp }} VP{{ isPerEach(r.text) ? ' ' + labels.trackerEach : '' }}</strong>
        </span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

defineProps({
  mission: { type: Object, required: true }, // { slug, name, blocks:[{ kind?, heading, when?, rows:[{text,vp,modifier?}] }] }
  subtitle: { type: String, default: '' },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// "For each…" rows score per occurrence — annotate the VP with an "each" suffix.
// Matches the English originals and their RU translations ("За каждый/каждую/каждое").
function isPerEach(text) {
  return /^(For each|Each time|За кажд|Каждый раз)/i.test(text || '')
}
</script>

<style scoped>
.mcard {
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-card);
  padding: 0.85rem 0.95rem 0.95rem;
}
.mcard-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.3rem 0.6rem;
  padding-bottom: 0.5rem;
  margin-bottom: 0.3rem;
  border-bottom: 1px solid var(--border);
}
.mcard-name {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}
.mcard-sub {
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--text-muted);
}

.m-block { margin-top: 0.7rem; }
.m-bhead { display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; margin-bottom: 0.35rem; }
.kind {
  font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
  padding: 1px 5px; border-radius: 2px;
}
.kind.fixed { background: #b3401b; color: #fff; }
.kind.tactical { background: #1f3a5f; color: #fff; }
.m-heading { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: var(--text-dim); }
.m-when { font-size: 0.72rem; color: var(--text-dim); }
.m-cond {
  display: flex;
  align-items: flex-start;
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 5px;
  margin-top: 0.35rem;
  background: var(--bg-secondary);
}
.m-text { font-size: 0.84rem; color: var(--text-muted); line-height: 1.45; }
.m-text strong { color: var(--text-primary); white-space: nowrap; }
.or { font-style: normal; font-size: 0.62rem; font-weight: 700; text-transform: uppercase; color: var(--text-dim); margin-right: 0.2rem; }
</style>

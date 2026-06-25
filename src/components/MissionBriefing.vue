<template>
  <div v-if="briefing && briefing.length" class="m-briefing">
    <template v-for="(part, pi) in briefing" :key="pi">
      <div v-if="part.action" class="m-action">
        <div class="m-action-head">{{ part.action }}</div>
        <div v-for="(r, ri) in part.rows" :key="ri" class="m-action-row">
          <span class="m-action-label">{{ r.label }}</span>
          <span class="m-action-text">{{ r.text }}</span>
        </div>
      </div>
      <p v-else class="m-brief-p">
        <span v-if="part.label" class="m-brief-label">{{ part.label }}:</span>
        {{ part.text }}
      </p>
    </template>
  </div>
</template>

<script setup>
// The mission card's intro text above the scoring blocks. Shared by the Event Companion
// MissionCard and the tracker ScoringModal so the two render identically.
defineProps({
  // [{ label?, text } | { action, rows:[{ label, text }] }]
  briefing: { type: Array, default: null },
})
</script>

<style scoped>
.m-briefing {
  margin: 0.1rem 0 0.2rem;
  padding-left: 0.6rem;
  border-left: 3px solid #c8961e;
}
.m-brief-p {
  margin: 0.4rem 0;
  font-size: 0.84rem;
  line-height: 1.45;
  color: var(--text-muted);
}
.m-brief-label {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-size: 0.74rem;
  color: var(--text-primary);
  margin-right: 0.15rem;
}
.m-action {
  margin: 0.5rem 0;
  border: 1px solid var(--border);
  border-radius: 5px;
  overflow: hidden;
  background: var(--bg-secondary);
}
.m-action-head {
  background: #c8961e;
  color: #1a1206;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.74rem;
  padding: 0.3rem 0.55rem;
}
.m-action-row {
  display: flex;
  gap: 0.5rem;
  padding: 0.35rem 0.55rem;
  font-size: 0.82rem;
  line-height: 1.4;
}
.m-action-row + .m-action-row { border-top: 1px solid var(--border); }
.m-action-label {
  flex: 0 0 5.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 0.68rem;
  color: var(--text-dim);
  padding-top: 0.07rem;
}
.m-action-text { color: var(--text-muted); }
</style>

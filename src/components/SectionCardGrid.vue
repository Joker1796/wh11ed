<template>
  <div class="section-grid">
    <RouterLink
      v-for="s in sections"
      :key="s.key"
      :to="s.path"
      class="section-card"
    >
      <div class="section-card-top">
        <span class="section-badge">{{ s.badge }}</span>
      </div>
      <h2 class="section-card-title">
        {{ s.label }}
      </h2>
      <p class="section-card-desc">
        {{ s.desc }}
      </p>
    </RouterLink>
  </div>
</template>

<script setup>
// The cards a landing page opens onto — the app's own front page (LandingView) and the Rules
// section's (RulesLandingView): a badge, a title, a line on what is inside. The two drew the same
// grid with the same CSS; they differed only in the width they dropped to one column (600px on
// one, never on the other), now the 640px most of the app steps down at.
defineProps({
  // [{ key, path, badge, label, desc }]
  sections: { type: Array, required: true },
})
</script>

<style scoped>
.section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.section-card {
  display: block;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-top: 3px solid var(--border);
  padding: 1.25rem 1.35rem;
  transition: border-top-color 0.15s, box-shadow 0.15s;
  text-decoration: none;
}

.section-card:hover {
  border-top-color: var(--accent);
  box-shadow: 0 2px 12px color-mix(in srgb, var(--accent) 18%, transparent);
  text-decoration: none;
}

.section-card-top {
  margin-bottom: 0.5rem;
}

.section-badge {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent);
  font-family: var(--font-mono);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  padding: 2px 7px;
}

.section-card-title {
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.45rem;
}

.section-card-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.55;
  margin: 0;
}

@media (max-width: 640px) {
  .section-grid { grid-template-columns: 1fr; }
}
</style>

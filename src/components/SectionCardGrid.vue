<template>
  <div class="section-grid">
    <RouterLink
      v-for="s in sections"
      :key="s.key"
      :to="s.path"
      class="section-card"
    >
      <ul class="section-tags">
        <li
          v-for="t in s.tags"
          :key="t"
          class="section-tag"
        >
          {{ t }}
        </li>
      </ul>
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
// section's (RulesLandingView): a row of tags, a title, a line on what is inside. The two drew the same
// grid with the same CSS; they differed only in the width they dropped to one column (600px on
// one, never on the other), now the 640px most of the app steps down at.
defineProps({
  // [{ key, path, tags: string[], label, desc }]
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

/* What is inside, as separate tags. Neutral on purpose: the card's red is its top edge on hover,
   and a tag is a fact about the section, not something to press — the same quiet chrome as an
   unpicked filter chip, in the small caps the tracker's section labels use. Owner, 2026-10-05,
   after a solid fill, a tint and an outline all read as too loud or too faint. */
.section-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin: 0 0 0.6rem;
  padding: 0;
  list-style: none;
}

.section-tag {
  padding: 0.1rem 0.45rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-muted);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.5;
  transition: border-color 0.15s;
}

.section-card:hover .section-tag {
  border-color: color-mix(in srgb, var(--accent) 45%, var(--border));
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

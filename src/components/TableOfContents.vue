<template>
  <nav class="toc" aria-label="Page contents">
    <div class="toc-header">Contents</div>
    <ul class="toc-list">
      <li v-for="sec in sections" :key="sec.id">
        <a class="toc-link" :href="'#' + sec.id" @click.prevent="scrollTo(sec.id)">
          <span class="toc-num" v-if="sec.num">{{ sec.num }}</span>
          {{ sec.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  sections: {
    type: Array,
    required: true,
  },
})

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.toc {
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  border-radius: 0 0 6px 6px;
  background: var(--bg-card);
  padding: 0.55rem 1rem 0.6rem;
  margin-bottom: 1.75rem;
}

.toc-header {
  font-family: var(--font-sans);
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr));
  gap: 0 1.2rem;
}

.toc-link {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  padding: 0.12rem 0;
  transition: color 0.15s;
  text-decoration: none;
}

.toc-link:hover {
  color: var(--accent);
  text-decoration: none;
}

.toc-num {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent);
  flex-shrink: 0;
}
</style>

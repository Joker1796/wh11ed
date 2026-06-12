<template>
  <div class="view">
    <div class="view-hero">
      <h1>Source Files</h1>
      <p class="view-hero-desc">Original rulebook documents used as data sources for this reference</p>
    </div>

    <div class="files-list">
      <a
        v-for="file in files"
        :key="file.path"
        :href="file.path"
        target="_blank"
        rel="noopener noreferrer"
        class="file-row"
      >
        <div class="file-icon">
          <svg v-if="file.type === 'pdf'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
        </div>
        <div class="file-info">
          <span class="file-desc">{{ file.desc }}</span>
        </div>
        <div class="file-type">{{ file.type.toUpperCase() }}</div>
        <div class="file-open">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Open
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
const files = [
  {
    name: 'WH40k_11ed.pdf',
    desc: 'Warhammer 40,000 Core Rules — 11th Edition (official rulebook)',
    path: './sources/WH40k_11ed.pdf',
    type: 'pdf',
  },
]
</script>

<style scoped>
.view-hero {
  padding: 2rem 0 1.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2rem;
}

.view-hero h1 {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  margin-bottom: 0.4rem;
}

.view-hero-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  font-style: italic;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.file-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 6px;
  text-decoration: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  color: var(--text-primary);
}

.file-row:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 8px rgba(110, 0, 8, 0.07);
  text-decoration: none;
}

.file-icon {
  color: var(--accent);
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.file-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.file-name {
  font-weight: 600;
  font-size: 0.95rem;
  font-family: var(--font-mono);
  color: var(--text-primary);
}

.file-desc {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.file-type {
  font-size: 0.68rem;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--accent);
  background: rgba(110, 0, 8, 0.07);
  border: 1px solid rgba(110, 0, 8, 0.18);
  border-radius: 3px;
  padding: 2px 7px;
  flex-shrink: 0;
}

.file-open {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
  flex-shrink: 0;
}

.file-row:hover .file-open {
  color: var(--accent);
}
</style>

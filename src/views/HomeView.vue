<template>
  <div class="home">
    <div class="hero">
      <div class="flavor-lines">
        <p v-for="line in intro.flavorText" :key="line" class="flavor-line">{{ line }}</p>
      </div>
      <h1 class="hero-title">Warhammer 40,000</h1>
      <div class="hero-subtitle">Core Rules — 11th Edition</div>
    </div>

    <div class="lore-box">
      <p>{{ intro.lore }}</p>
    </div>

    <section class="intro-section">
      <h2>Introduction</h2>
      <div v-for="para in introParagraphs" :key="para" class="para">{{ para }}</div>
    </section>

    <section class="intro-section">
      <h2>The Warhammer 40,000 App</h2>
      <p>{{ intro.app }}</p>
    </section>

    <section class="toc-section">
      <h2>Contents</h2>
      <p class="toc-note">Each section is marked with a reference number used for internal referencing.</p>

      <div class="toc-grid">
        <RouterLink
          v-for="item in intro.toc"
          :key="item.path"
          :to="item.path"
          class="toc-card"
        >
          <div class="toc-card-top">
            <span class="toc-sections">Sections {{ item.sections }}</span>
          </div>
          <h3 class="toc-card-title">{{ item.label }}</h3>
          <p class="toc-card-desc">{{ item.desc }}</p>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { intro } from '../data/intro.js'

const introParagraphs = computed(() =>
  intro.intro.split('\n\n').filter(p => p.trim())
)
</script>

<style scoped>
.home {
  padding-top: 2rem;
}

.hero {
  text-align: center;
  padding: 2.5rem 0 2rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 2rem;
}

.flavor-lines {
  margin-bottom: 1.5rem;
}

.flavor-line {
  color: var(--text-muted);
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.1rem;
  margin-bottom: 0.1rem;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.hero-subtitle {
  font-size: 0.85rem;
  letter-spacing: 3px;
  color: var(--accent);
  text-transform: uppercase;
  font-weight: 600;
  font-family: var(--font-sans);
}

.lore-box {
  background: var(--bg-secondary);
  border-left: 3px solid var(--accent);
  border-radius: 0 6px 6px 0;
  padding: 1.1rem 1.5rem;
  margin-bottom: 2rem;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.05rem;
  color: var(--text-muted);
  line-height: 1.75;
}

.intro-section {
  margin-bottom: 2rem;
}

.intro-section h2 {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-bottom: 0.4rem;
  border-bottom: 2px solid var(--accent);
  color: var(--text-primary);
}

.para {
  margin-bottom: 0.8rem;
  color: var(--text-primary);
  line-height: 1.75;
  font-size: 0.97rem;
}

.toc-section h2 {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 2px solid var(--accent);
  color: var(--text-primary);
}

.toc-note {
  color: var(--text-muted);
  font-size: 0.88rem;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.toc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.toc-card {
  display: block;
  background: #fff;
  border: 1px solid var(--border);
  border-top: 3px solid var(--border);
  border-radius: 0 0 6px 6px;
  padding: 1.1rem 1.25rem;
  transition: border-top-color 0.15s, box-shadow 0.15s;
  text-decoration: none;
}

.toc-card:hover {
  border-top-color: var(--accent);
  box-shadow: 0 2px 12px rgba(110, 0, 8, 0.08);
  text-decoration: none;
}

.toc-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.toc-sections {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent);
  font-family: var(--font-mono);
  background: rgba(110, 0, 8, 0.07);
  padding: 2px 7px;
  border-radius: 2px;
}


.toc-card-title {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.toc-card-desc {
  font-size: 0.84rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 600px) {
  .hero-title { font-size: 2.2rem; }
  .toc-grid { grid-template-columns: 1fr; }
}
</style>

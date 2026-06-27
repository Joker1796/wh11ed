<template>
  <div class="setup-loading" role="status" aria-live="polite">
    <span class="spinner" aria-hidden="true"></span>
  </div>
</template>

<script setup>
// Shown while the async GameSetup chunk (with its ~290 KB faction dataset) loads, so the
// setup screen isn't a blank gap on a cold/slow load.
</script>

<style scoped>
.setup-loading {
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
}
.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: setup-spin 0.7s linear infinite;
}
@keyframes setup-spin {
  to { transform: rotate(360deg); }
}
</style>

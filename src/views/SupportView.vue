<template>
  <div class="support-view">
    <div class="hero">
      <h1 class="hero-title">
        {{ s.title }}
      </h1>
    </div>

    <!-- One grid, two compositions (owner, 2026-10-01). Phone: the case, then one card — the
         button across it (the phone is already in your hand), what it opens, and a small code
         beside its note; a full-width code was a screen of something this phone cannot scan.
         Wide screen: the text in the left column, the payment card on the right, the code first
         (a desktop link cannot reach a bank app) with its note, and the button under it. -->
    <div class="support-body">
      <div class="support-case">
        <p>{{ s.intro }}</p>
        <p>{{ s.what }}</p>
      </div>

      <div class="support-pay">
        <a
          class="btn-primary btn-lg pay-btn"
          :href="PAY_URL"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ s.button }}
        </a>
        <img
          class="pay-qr"
          :src="qrSrc"
          :alt="s.qrAlt"
          width="220"
          height="220"
          loading="lazy"
        >
        <p class="pay-qr-note">
          {{ s.qrNote }}
        </p>
      </div>

      <p class="pay-how">
        {{ s.how }}
      </p>
      <!-- Built in script and printed with v-text: a line break in the template would put a
           space inside each link (root CLAUDE.md, the linter). -->
      <p class="pay-free">
        <template
          v-for="(part, i) in freeParts"
          :key="i"
        >
          <a
            v-if="part.kind === 'vk'"
            :href="VK_URL"
            target="_blank"
            rel="noopener"
            v-text="part.text"
          /><button
            v-else-if="part.kind === 'bug'"
            type="button"
            class="pay-link"
            @click="openFeedback"
            v-text="part.text"
          /><span
            v-else
            v-text="part.text"
          />
        </template>
      </p>
      <p class="pay-thanks">
        {{ s.thanks }}
      </p>
    </div>
  </div>
</template>

<script setup>
// The donation page (/support), reached from the footer and the ⚙ menu only: the audience is a
// player mid-game on a phone, and an ask anywhere in that flow costs more than it collects.
// Copy lives in landing.js's bilingual `footer.support`, like the disclaimer's does, and is
// written in the AUTHOR'S OWN VOICE (first person) — keep it that way when editing.
import { computed } from 'vue'
import { landing, VK_URL } from '../data/landing.js'
import { useFeedbackModal } from '../composables/useFeedbackModal.js'
import { useLocale } from '../composables/useLocale.js'

// The author's Ozon Bank SBP page — pays from any Russian bank, no fee. The QR encodes this
// exact URL (verified when it was added); replacing one means replacing the other, and the
// image must be RENAMED rather than overwritten (public/images/CLAUDE.md — a stale QR would
// sit in the image cache of everyone who ever opened this page).
const PAY_URL = 'https://finance.ozon.ru/apps/sbp/ozonbankpay/01a09910-df13-7ba4-bf5e-0166fd7b8433'
const qrSrc = '/images/support-qr-ozon.png'

const { locale } = useLocale()
const s = computed(() => landing[locale.value].footer.support)
const { openFeedback } = useFeedbackModal()
// "…join the {vk}, or {bug}…" → text, the VK link, the bug-report button.
const freeParts = computed(() => s.value.free.split(/(\{vk\}|\{bug\})/).filter(Boolean).map((t) => (
  t === '{vk}' ? { kind: 'vk', text: s.value.freeVk }
    : t === '{bug}' ? { kind: 'bug', text: s.value.freeBug }
      : { kind: 'text', text: t })))
</script>

<style scoped>
.support-view { padding-top: 0.5rem; }

.hero {
  text-align: center;
  padding: 1rem 0 0.6rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.4rem;
}
.hero-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.support-body {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  max-width: 640px;
  margin: 0 auto;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary, var(--text-primary));
}
.support-body p { margin: 0 0 0.9rem; }
.support-case { grid-column: 1 / -1; grid-row: 1; }

/* Phone: the card is a box drawn behind rows 2–4 (the wrapper's ::before — the wrapper itself is
   `display: contents`, so the button, the code and its note are cells of this grid). */
.support-pay { display: contents; }
.support-pay::before {
  content: '';
  grid-column: 1 / -1;
  grid-row: 2 / 5;
  margin-bottom: 0.9rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
}
.pay-btn {
  grid-column: 1 / -1;
  grid-row: 2;
  margin: 0.8rem 0.8rem 0.6rem;
  justify-content: center;
  text-align: center;
  text-decoration: none;
}
.support-body .pay-how {
  grid-column: 1 / -1;
  grid-row: 3;
  margin: 0 0.8rem 0.8rem;
}
/* The QR stays on white whatever the theme: a dark surface under a code is the one way to
   make it unscannable. */
.pay-qr {
  grid-column: 1;
  grid-row: 4;
  align-self: start;
  display: block;
  width: 112px;
  height: auto;
  margin: 0 0 1.7rem 0.8rem;
  background: #fff;
  padding: 0.3rem;
  border: 1px solid var(--border);
}
.support-body .pay-qr-note {
  grid-column: 2;
  grid-row: 4;
  align-self: center;
  margin: 0 0.8rem 1.7rem;
}
.pay-free { grid-column: 1 / -1; grid-row: 5; }
.pay-thanks { grid-column: 1 / -1; grid-row: 6; }
.pay-how,
.pay-qr-note,
.pay-free,
.pay-thanks {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-muted);
}
/* The bug report opens a dialog, so it is a button — dressed as the VK link beside it. */
.pay-link {
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  color: var(--accent);
  text-decoration: underline;
  cursor: pointer;
}
.pay-free a { color: var(--accent); text-decoration: underline; }

/* Wide: text left, the payment card right — code on top, its note, the button under it. */
@media (min-width: 760px) {
  .support-body {
    max-width: 920px;
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-rows: auto auto auto auto 1fr;
    column-gap: 2.5rem;
    font-size: 1rem;
  }
  .support-case { grid-column: 1; grid-row: 1; }
  .support-pay {
    grid-column: 2;
    grid-row: 1 / 6;
    align-self: start;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 274px;
    padding: 1rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
  }
  .support-pay::before { content: none; }
  .pay-qr { order: -2; width: 240px; margin: 0; padding: 0.4rem; }
  .support-body .pay-qr-note { order: -1; margin: 0; text-align: center; }
  .pay-btn { margin: 0; }
  .support-body .pay-how { grid-column: 1; grid-row: 2; margin: 0 0 0.9rem; }
  .pay-free { grid-column: 1; grid-row: 3; }
  .pay-thanks { grid-column: 1; grid-row: 4; }
}
</style>

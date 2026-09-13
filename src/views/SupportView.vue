<template>
  <div class="support-view">
    <div class="hero">
      <h1 class="hero-title">
        {{ s.title }}
      </h1>
    </div>

    <div class="support-body">
      <p>{{ s.intro }}</p>
      <p>{{ s.what }}</p>

      <!-- Both ways in, side by side: the button for the phone that is already in your hand,
           the code for the desktop, where a link cannot reach your bank app. -->
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
      </div>

      <p class="pay-how">
        {{ s.how }}
      </p>
      <p class="pay-thanks">
        {{ s.thanks }}
      </p>
    </div>
  </div>
</template>

<script setup>
// The donation page (/support), reached from the footer and nowhere else: the audience is a
// player mid-game on a phone, and an ask anywhere in that flow costs more than it collects.
// Copy lives in landing.js's bilingual `footer.support`, like the disclaimer's does, and is
// written in the AUTHOR'S OWN VOICE (first person) — keep it that way when editing.
import { computed } from 'vue'
import { landing } from '../data/landing.js'
import { useLocale } from '../composables/useLocale.js'

// The author's Ozon Bank SBP page — pays from any Russian bank, no fee. The QR encodes this
// exact URL (verified when it was added); replacing one means replacing the other, and the
// image must be RENAMED rather than overwritten (public/images/CLAUDE.md — a stale QR would
// sit in the image cache of everyone who ever opened this page).
const PAY_URL = 'https://finance.ozon.ru/apps/sbp/ozonbankpay/01a09910-df13-7ba4-bf5e-0166fd7b8433'
const qrSrc = '/images/support-qr-ozon.png'

const { locale } = useLocale()
const s = computed(() => landing[locale.value].footer.support)
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
  max-width: 640px;
  margin: 0 auto;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary, var(--text-primary));
}
.support-body p { margin: 0 0 0.9rem; }

.support-pay {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  margin: 1.4rem 0 1rem;
  padding: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
}
.pay-btn { text-decoration: none; }
/* The QR stays on white whatever the theme: a dark surface under a code is the one way to
   make it unscannable. */
.pay-qr {
  display: block;
  width: 200px;
  height: auto;
  background: #fff;
  padding: 0.4rem;
  border: 1px solid var(--border);
}
.pay-how,
.pay-thanks {
  font-size: 0.85rem;
  color: var(--text-muted);
}
@media (max-width: 480px) {
  .support-pay { gap: 0.9rem; padding: 0.8rem; }
  .pay-qr { width: 170px; }
}
</style>

<template>
  <hr class="turn-diagram-break" />
  <div class="turn-diagram">
    <div
      v-for="(step, i) in steps"
      :key="i"
      class="turn-step"
      :class="{ 'turn-step--edge': step.icon === 'turn-step' }"
    >
      <div class="turn-step-num">{{ i + 1 }}</div>
      <div class="turn-step-body">
        <div class="turn-step-title">{{ step.title }}</div>
        <div class="turn-step-desc">{{ step.desc }}</div>
      </div>
      <div class="turn-step-icon" :class="'turn-step-icon--' + step.icon"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: { type: Array, required: true },
})
</script>

<style scoped>
/* Fixed palette lifted from the source banner plates (not the app's --accent theme) —
   same reasoning as RuleBlock's .rule-header--type plaque: this reads as a distinct,
   self-contained insert, so it keeps its own identity across the light/dark site theme
   instead of following it. Light rows = the 5 phases; dark rows (--edge) = Start/End of
   Turn Step, the two bookends. */
.turn-diagram-break {
  border: none;
  border-top: 1px solid var(--border);
  margin: 1.3rem 0 0.9rem;
}

.turn-diagram {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 0 0.9rem;
}

.turn-step {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.6rem 4.6rem 0.6rem 3.7rem;
  border: 1px solid #3d4d24;
  background: #c8d6c6;
  color: #32401e;
  overflow: hidden;
}

.turn-step--edge {
  border-color: #dce6d2;
  background: #373f35;
  color: #fff;
}

.turn-step-num {
  /* Offsets cancel this font's own ascent/left-bearing whitespace (measured empirically —
     Sofia Sans Extra Condensed's digits sit ~0.875rem down / ~0.16rem right of their own
     line box at this size), so the ink itself touches the card's top-left corner instead
     of the invisible box around it. */
  position: absolute;
  top: -0.875rem;
  left: -0.156rem;
  font-family: var(--font-display);
  font-size: 5.4rem;
  font-weight: 800;
  color: currentColor;
  opacity: 0.45;
  line-height: 1;
  user-select: none;
}

.turn-step-body {
  flex: 1;
  min-width: 0;
}

.turn-step-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: var(--fw-heading);
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: currentColor;
  line-height: 1.15;
}

.turn-step-desc {
  font-size: 0.85rem;
  color: currentColor;
  opacity: 0.85;
  margin-top: 0.15rem;
  line-height: 1.4;
  white-space: pre-line;
}

.turn-step-icon {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  width: 3.4rem;
  height: 3.4rem;
  flex-shrink: 0;
  background-color: currentColor;
  opacity: 0.9;
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}

.turn-step-icon--turn-step { -webkit-mask-image: url(/images/turn/icon-turn-step.webp); mask-image: url(/images/turn/icon-turn-step.webp); }
.turn-step-icon--command { -webkit-mask-image: url(/images/turn/icon-command.webp); mask-image: url(/images/turn/icon-command.webp); }
.turn-step-icon--movement { -webkit-mask-image: url(/images/turn/icon-movement.webp); mask-image: url(/images/turn/icon-movement.webp); }
.turn-step-icon--shooting { -webkit-mask-image: url(/images/turn/icon-shooting.webp); mask-image: url(/images/turn/icon-shooting.webp); }
.turn-step-icon--charge { -webkit-mask-image: url(/images/turn/icon-charge.webp); mask-image: url(/images/turn/icon-charge.webp); }
.turn-step-icon--fight { -webkit-mask-image: url(/images/turn/icon-fight.webp); mask-image: url(/images/turn/icon-fight.webp); }

@media (max-width: 560px) {
  .turn-step {
    padding: 0.55rem 3.6rem 0.55rem 3rem;
  }

  .turn-step-num {
    font-size: 4.2rem;
  }

  .turn-step-icon {
    width: 2.6rem;
    height: 2.6rem;
    right: 0.4rem;
    top: 0.4rem;
  }

  .turn-step-title {
    font-size: 1.08rem;
  }

  .turn-step-desc {
    font-size: 0.78rem;
  }
}
</style>

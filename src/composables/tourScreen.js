import { ref } from 'vue'

// The chapters the page on screen has asked for, seen or not (useTour.js records them) — what
// "Tutorial of this screen" in the ⚙ menu shows again (owner, 2026-10-09: a chapter skipped on the
// rosters had no way back). Its own module, without the chapters' texts: the navbar reads it, and
// the navbar is in the root bundle the tutorial must stay out of. Forgotten when the page changes
// (TourOverlay, from App.vue's pageKey).
export const asked = ref([]) // [{ id, ctx }]
export function forgetScreen() { asked.value = [] }

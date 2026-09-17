// One colour per Force Disposition, for the places that list detachments: the disposition is
// what a detachment is FOR, and five of them repeating down a list are told apart faster by hue
// than by reading. Keyed by the disposition's English name — that is what a detachment record
// carries (`forceDisposition`, from the MFM), and mission/disposition names stay English in both
// locales by convention. Light/dark pairs like the faction colours in factionsIndex.js: `light`
// is dark enough for text on the light theme, `dark` bright enough on the dark one.
export const DISPOSITION_COLORS = {
  'Take and Hold':   { light: '#2e7d32', dark: '#7bc47f' },
  'Purge the Foe':   { light: '#a02020', dark: '#e57373' },
  'Disruption':      { light: '#1f5fa8', dark: '#6faee8' },
  'Reconnaissance':  { light: '#5b3f9c', dark: '#b39ddb' },
  'Priority Assets': { light: '#a3690e', dark: '#e0b25a' },
}

export function dispositionColor(name) {
  return DISPOSITION_COLORS[name] || null
}

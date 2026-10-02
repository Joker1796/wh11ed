// The five Force Dispositions — the axes of the Primary Mission matrix. Names stay English in
// both locales (they are card names). A module of its own so the Primary Mission matrix in
// missions.js can read them without importing the whole Event Companion (eventCompanion.js
// re-exports this list as its `dispositions`).
export const DISPOSITIONS = [
  { id: 'take-and-hold', name: 'Take and Hold', icon: '/images/event/dispo-take-and-hold.webp' },
  { id: 'purge-the-foe', name: 'Purge the Foe', icon: '/images/event/dispo-purge-the-foe.webp' },
  { id: 'disruption', name: 'Disruption', icon: '/images/event/dispo-disruption.webp' },
  { id: 'reconnaissance', name: 'Reconnaissance', icon: '/images/event/dispo-reconnaissance.webp' },
  { id: 'priority-assets', name: 'Priority Assets', icon: '/images/event/dispo-priority-assets.webp' },
]

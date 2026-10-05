// "Rules" umbrella landing page ("/rules") — bilingual { en, ru } single objects, same
// { key, label, path, tags, desc } card shape as landing.js. Backs both the /rules page's
// 3 summary cards (RulesLandingView.vue) and the mobile bottom-nav modal (RulesNavModal.vue),
// so each section's one-line summary is written once.
export const rulesLanding = {
  en: {
    sections: [
      {
        key: 'core',
        label: 'Core Rules',
        path: '/core-rules',
        tags: ['24 sections'],
        desc: 'The complete 11th Edition Core Rules — basic concepts, the battle round and its phases, battlefields, advanced rules and the reference glossary.',
      },
      {
        key: 'event',
        label: 'Event Companion',
        path: '/event-companion',
        tags: ['Missions', 'Terrain', 'Pairings', 'Teams'],
        desc: 'The matched-play tournament rules — the 25 primary and 18 secondary missions, terrain layouts and the mission matrix, pairings and FAQs.',
      },
      {
        key: 'combat-patrol',
        label: 'Combat Patrol',
        path: '/combat-patrol',
        tags: ['24 factions'],
        desc: "Each faction's fixed-roster Combat Patrol starter box — detachment rule, stratagems, enhancements and datasheets, as printed in the box.",
      },
    ],
  },

  ru: {
    sections: [
      {
        key: 'core',
        label: 'Основные правила',
        path: '/core-rules',
        tags: ['24 раздела'],
        desc: 'Полные основные правила 11-й редакции — базовые концепции, раунд боя и его фазы, поля сражений, продвинутые правила и справочный раздел.',
      },
      {
        key: 'event',
        label: 'Путеводитель по ивентам',
        path: '/event-companion',
        tags: ['Миссии', 'Террейн', 'Паринги', 'Командные'],
        desc: 'Турнирные правила matched play — 25 основных и 18 вторичных миссий, раскладки террейна и матрица миссий, паринги и FAQ.',
      },
      {
        key: 'combat-patrol',
        label: 'Комбат патруль',
        path: '/combat-patrol',
        tags: ['24 фракции'],
        desc: 'Стартовые наборы Комбат патруля для каждой фракции — правило детачмента, стратагемы, улучшения и датащиты, как в коробке.',
      },
    ],
  },
}

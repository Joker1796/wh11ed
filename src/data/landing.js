// Project landing page ("/") — bilingual { en, ru } single objects.
// Minimalist: title + one-line description + three section cards.
export const landing = {
  en: {
    tagline: 'Unofficial 11th Edition reference',
    description:
      'A bilingual (EN/RU), searchable reference for Warhammer 40,000 11th Edition — the Core Rules, the Event Companion and a game tracker. Installable as an app and works fully offline, free.',
    sections: [
      {
        key: 'core',
        label: 'Core Rules',
        path: '/introduction',
        badge: '24 sections',
        desc: 'The complete 11th Edition Core Rules — basic concepts, the battle round and its phases, battlefields, advanced rules and the reference glossary.',
      },
      {
        key: 'event',
        label: 'Event Companion',
        path: '/event-companion',
        badge: 'Missions · Terrain · Pairings',
        desc: 'The matched-play tournament rules — the 25 primary and 18 secondary missions, terrain layouts and the mission matrix, pairings and FAQs.',
      },
      {
        key: 'tracker',
        label: 'Game Tracker',
        path: '/tracker',
        badge: 'Beta',
        desc: 'A client-side, offline 2-player score tracker for a game of 40k — missions, secondaries, command points and per-round scoring, with optional cloud backup of finished games.',
      },
      {
        key: 'links',
        label: 'Links',
        path: '/links',
        badge: '4 PDFs',
        desc: 'The official Warhammer Community source documents this reference is built from — Core Rules, Event Companion, Teams Event Companion and Terrain Area Footprints.',
      },
    ],
    footer: {
      contactLabel: 'Contact the author:',
      thanksLabel: 'Acknowledgements:',
      thanks: [
        { label: 'Translation help:', who: 'Nikita Lukin and Yuri Avakumov' },
        { label: 'Testing help:', who: 'members of the «Кочующий стол» club' },
      ],
    },
  },

  ru: {
    tagline: 'Неофициальный справочник Вархаммер 40 000, 11-я редакция',
    description:
      'Двуязычный (EN/RU) справочник по правилам Warhammer 40 000 (Вархаммер) 11-й редакции на русском — основные правила, раунд боя, миссии и стратагемы, Event Companion и трекер игры. Устанавливается как приложение и работает полностью офлайн, бесплатно.',
    sections: [
      {
        key: 'core',
        label: 'Core Rules',
        path: '/introduction',
        badge: '24 раздела',
        desc: 'Полные основные правила 11-й редакции — базовые концепции, раунд боя и его фазы, поля сражений, продвинутые правила и справочный раздел.',
      },
      {
        key: 'event',
        label: 'Event Companion',
        path: '/event-companion',
        badge: 'Миссии · Террейн · Паринги',
        desc: 'Турнирные правила matched play — 25 основных и 18 вторичных миссий, раскладки террейна и матрица миссий, паринги и FAQ.',
      },
      {
        key: 'tracker',
        label: 'Game Tracker',
        path: '/tracker',
        badge: 'Beta',
        desc: 'Клиентский офлайн-трекер очков на 2 игроков для партии в 40k — миссии, вторичные задачи, командные очки и подсчёт по раундам, с опциональным облачным сохранением сыгранных партий.',
      },
      {
        key: 'links',
        label: 'Ссылки',
        path: '/links',
        badge: '4 PDF',
        desc: 'Официальные исходные документы Warhammer Community, на которых построен справочник — Core Rules, Event Companion, Teams Event Companion и Terrain Area Footprints.',
      },
    ],
    footer: {
      contactLabel: 'Связаться с автором:',
      thanksLabel: 'Благодарности:',
      thanks: [
        { label: 'За помощь в переводе:', who: 'Никите Лукину и Юрию Авакумову' },
        { label: 'За помощь в тестировании:', who: 'участникам клуба «Кочующий стол»' },
      ],
    },
  },
}

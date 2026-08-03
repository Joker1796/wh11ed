// Project landing page ("/") — bilingual { en, ru } single objects.
// Minimalist: title + one-line description + three section cards.
export const landing = {
  en: {
    tagline: 'Unofficial 11th Edition reference',
    description:
      'A bilingual (EN/RU), searchable reference for Warhammer 40,000 11th Edition — the Core Rules, the Event Companion and a game tracker. Installable as an app and works fully offline, free.',
    sections: [
      {
        key: 'rules',
        label: 'Rules',
        path: '/rules',
        badge: 'Core · Event · Combat Patrol',
        desc: 'The complete 11th Edition Core Rules, the matched-play Event Companion (missions, terrain layouts, pairings) and Combat Patrol starter-box content.',
      },
      {
        key: 'factions',
        label: 'Factions',
        path: '/factions',
        badge: '28 factions',
        desc: 'Army rules, detachments and searchable unit datasheets for all 28 factions — with base sizes and bilingual EN/RU text.',
      },
      {
        key: 'tracker',
        label: 'Game Tracker',
        path: '/tracker',
        badge: 'Tracker & Stratagems',
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
        { label: 'Translation help:', who: 'Yuri Avakumov' },
        { label: 'Testing help:', who: 'members of the «Кочующий стол» and «Z4VOD» clubs' },
      ],
      openSourceLabel: 'Open source:',
      openSourceText: 'This project is free and open source.',
      repoLinkLabel: 'GitHub',
      disclaimerLink: 'Legal & disclaimer',
      dataVersionLabel: 'Data version',
      detailsShow: 'More',
      detailsHide: 'Less',
      disclaimer:
        'This is an unofficial fan project, not affiliated with or endorsed by Games Workshop. Warhammer 40,000, the names, rules and imagery are © Games Workshop Ltd, used without permission — no challenge to their status is intended. The open-source license covers this project’s code only, not the game content. Rights holders may request removal via the contact above.',
    },
  },

  ru: {
    tagline: 'Неофициальный справочник Вархаммер 40 000, 11-я редакция',
    description:
      'Двуязычный (EN/RU) справочник по правилам Warhammer 40 000 (Вархаммер) 11-й редакции на русском — основные правила, миссии и стратагемы, Event Companion и трекер игры. Устанавливается как приложение и работает полностью офлайн, бесплатно.',
    sections: [
      {
        key: 'rules',
        label: 'Правила',
        path: '/rules',
        badge: 'Основные · Ивенты · Комбат патруль',
        desc: 'Полные основные правила 11-й редакции, турнирный Event Companion (миссии, раскладки террейна, паринги) и контент стартовых наборов Combat Patrol.',
      },
      {
        key: 'factions',
        label: 'Фракции',
        path: '/factions',
        badge: '28 фракций',
        desc: 'Правила армии, детачменты и листы данных юнитов с поиском — для всех 28 фракций, с размерами баз и двуязычным EN/RU текстом.',
      },
      {
        key: 'tracker',
        label: 'Трекер игры',
        path: '/tracker',
        badge: 'Трекер и стратагемы',
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
        { label: 'За помощь в переводе:', who: 'Юрию Авакумову' },
        { label: 'За помощь в тестировании:', who: 'участникам клубов «Кочующий стол» и «Z4VOD»' },
      ],
      openSourceLabel: 'Открытый код:',
      openSourceText: 'Проект бесплатный, с открытым исходным кодом.',
      repoLinkLabel: 'GitHub',
      disclaimerLink: 'Правовая информация',
      dataVersionLabel: 'Версия данных',
      detailsShow: 'Ещё',
      detailsHide: 'Скрыть',
      disclaimer:
        'Это неофициальный фан-проект, не связанный с Games Workshop и не одобренный ей. Warhammer 40,000, названия, правила и изображения — © Games Workshop Ltd, используются без разрешения; вызов их правам не бросается. Открытая лицензия покрывает только код проекта, но не игровой контент. Правообладатель может запросить удаление через контакт выше.',
    },
  },
}

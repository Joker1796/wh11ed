// Project landing page ("/") — bilingual { en, ru } single objects.
// Minimalist: title + one-line description + three section cards.
export const landing = {
  en: {
    tagline: 'Unofficial 11th Edition app — rules, rosters, and the game itself',
    description:
      'Everything the table needs, in one place: the complete Core Rules and Event Companion, every faction\'s rules and datasheets, an army list builder priced against the current Munitorum Field Manual, and a game tracker that knows your army — it shows how a detachment rule, an aura or a stratagem changes your units\' numbers while you play. Bilingual (EN/RU), installable, fully offline, free and ad-free. All of it works without an account and stays on your device; signing in only makes your lists and games follow you between devices.',
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
        badge: '30 factions',
        desc: 'The full rules of every faction — army rule, detachments with their stratagems and enhancements, and a searchable datasheet for every unit, in both languages, with base sizes.',
      },
      {
        key: 'roster',
        label: 'Rosters',
        path: '/roster',
        badge: 'Army list builder',
        desc: 'Build a list against the current Munitorum Field Manual — units, wargear, leaders and enhancements, priced and checked as you go. Import one from the Warhammer 40,000 app or New Recruit, share it as a link, then take it into the tracker.',
      },
      {
        key: 'tracker',
        label: 'Game Tracker',
        path: '/tracker',
        badge: 'Tracker & Stratagems',
        desc: 'Run the game itself: missions, secondaries, command points and per-round scoring for both players — and, with a roster loaded, your army\'s own rules applied live, so a unit\'s card shows what its detachment rule, auras and stratagems are doing to it right now.',
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
      helpLink: 'How to use this',
      disclaimerLink: 'Legal & disclaimer',
      dataVersionLabel: 'Data version',
      detailsShow: 'More',
      detailsHide: 'Less',
      disclaimer:
        'This is an unofficial fan project, not affiliated with or endorsed by Games Workshop. Warhammer 40,000, the names, rules and imagery are © Games Workshop Ltd, used without permission — no challenge to their status is intended. The open-source license covers this project’s code only, not the game content. Rights holders may request removal via the contact above.',
    },
  },

  ru: {
    tagline: 'Неофициальное приложение для игры в Вархаммер 40 000, 11-я редакция',
    description:
      'Всё, что нужно за столом, в одном месте: полные основные правила и Event Companion, правила и листы данных всех фракций, конструктор армейских листов по актуальному Munitorum Field Manual и трекер партии, который знает вашу армию — он показывает, как правило детачмента, аура или стратагема меняют характеристики ваших юнитов прямо по ходу игры. Двуязычно (EN/RU), ставится как приложение, работает полностью офлайн, бесплатно и без рекламы. Всё это работает без аккаунта и остаётся на вашем устройстве; вход нужен лишь затем, чтобы листы и партии ехали за вами между устройствами.',
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
        badge: '30 фракций',
        desc: 'Полные правила каждой фракции — правило армии, детачменты со стратагемами и улучшениями и лист данных каждого юнита, на двух языках и с размерами баз.',
      },
      {
        key: 'roster',
        label: 'Ростеры',
        path: '/roster',
        badge: 'Конструктор листов',
        desc: 'Соберите армейский лист по актуальному Munitorum Field Manual — юниты, вооружение, лидеры и улучшения, с подсчётом очков и проверкой ограничений на ходу. Импортируйте из приложения Warhammer 40,000 или New Recruit, поделитесь ссылкой и передайте в трекер.',
      },
      {
        key: 'tracker',
        label: 'Трекер игры',
        path: '/tracker',
        badge: 'Трекер и стратагемы',
        desc: 'Ведите саму партию: миссии, вторичные задачи, командные очки и подсчёт по раундам за обоих игроков — а с загруженным ростером ещё и правила вашей армии применяются вживую, и на карточке юнита видно, что с ним прямо сейчас делают правило детачмента, ауры и стратагемы.',
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
      helpLink: 'Как пользоваться',
      disclaimerLink: 'Правовая информация',
      dataVersionLabel: 'Версия данных',
      detailsShow: 'Ещё',
      detailsHide: 'Скрыть',
      disclaimer:
        'Это неофициальный фан-проект, не связанный с Games Workshop и не одобренный ей. Warhammer 40,000, названия, правила и изображения — © Games Workshop Ltd, используются без разрешения; вызов их правам не бросается. Открытая лицензия покрывает только код проекта, но не игровой контент. Правообладатель может запросить удаление через контакт выше.',
    },
  },
}

// Space Marines — разреженный RU-оверлей поверх EN (src/data/factions/space-marines.js).
// deepOverlay мержит по ключам и индексам массивов — порядок обязан совпадать с EN.
// Английскими остаются: keyword'ы (Adeptus Astartes, Vehicle, Infantry, Monster, Walker,
// Gravis, Captain, Techmarine и т.п. — в том же регистре Title Case, что и в EN),
// [BRACKET]-способности, названные механики (Oath of Moment, Combat Doctrines, Devastator/
// Tactical/Assault Doctrine, Feel No Pain, Deadly Demise), имена детачментов, названия
// орденов (Codex Astartes и т.п.), ids/dp/points. Стратагемы и улучшения получают RU-имя
// отдельной строкой под английским названием — см. stratNamesRu/enhNamesRu ниже.
// Общая стратагема Armour of Contempt повторяется в большинстве детачментов на своей позиции.

const armourOfContempt = {
  flavor: 'Воинственность Adeptus Astartes в сочетании с их трансчеловеческой физиологией делает их несгибаемыми противниками.',
  when: 'Фаза стрельбы вашего оппонента или фаза ближнего боя, сразу после того как вражеский юнит [gloss:select-targets:выбрал цели].',
  target: 'Один юнит Adeptus Astartes вашей армии, который был выбран целью одной или более атак атакующего юнита.',
  effect: 'Пока атакующий юнит не завершит свои атаки, каждый раз, когда атака нацелена на ваш юнит, ухудшите характеристику [gloss:armour-penetration:бронепробития (AP)] этой атаки на 1.',
  restrictions: '',
}

// RU display names for stratagems — shown as a small, semi-transparent second line under
// the English name in StratCard (RU locale only). Keyed by the English name (not positional)
// so stratagems repeated across detachments (Crucible of Battle, Dropship Extraction, Rapid
// Embarkation, Strike from the Shadows, Hunter's Instincts, Burning Vengeance, Immolation
// Protocols, Armour of Contempt) share one translation. useFactionPage injects these as
// `nameRu` onto each stratagem after the overlay merge.
export const stratNamesRu = {
  'Armour of Contempt': 'Броня презрения',
  'Only in Death Does Duty End': 'Лишь смерть освобождает от долга',
  'Honour the Chapter': 'Честь ордена',
  'Adaptive Strategy': 'Гибкая стратегия',
  'Storm of Fire': 'Шквал огня',
  'Squad Tactics': 'Тактика отделения',
  'No Threat Too Great': 'Нет непосильной угрозы',
  'Rigid Discipline': 'Железная дисциплина',
  'Battle Drill Recall': 'Боевая муштра',
  'Not One Backwards Step': 'Ни шагу назад',
  'Hail of Vengeance': 'Град возмездия',
  'Unbowed Conviction': 'Несгибаемая убеждённость',
  'Mercy Is Weakness': 'Милосердие — слабость',
  'Vengeful Animus': 'Мстительный дух',
  'Ancient Fury': 'Древняя ярость',
  'Power of the Machine Spirit': 'Мощь духа машины',
  'Immolation Protocols': 'Протоколы испепеления',
  'Crucible of Battle': 'Горнило битвы',
  'Onslaught of Fire': 'Огненный натиск',
  'Rapid Embarkation': 'Стремительная посадка',
  'Burning Vengeance': 'Пылающее возмездие',
  'Shock Assault': 'Шоковый штурм',
  'Blitzing Fusillade': 'Молниеносный залп',
  'Full Throttle': 'Полный ход',
  'Ride Hard, Ride Fast': 'Мчись во весь опор',
  'Wind-swift Evasion': 'Стремительное уклонение',
  'A Deadly Prize': 'Смертельный трофей',
  'Surgical Strikes': 'Точечные удары',
  'Strike from the Shadows': 'Удар из тени',
  'Calculated Feint': 'Расчётливый финт',
  'Guerrilla Tactics': 'Партизанская тактика',
  'Heroes of the Chapter': 'Герои ордена',
  'Terrifying Proficiency': 'Устрашающее мастерство',
  'Duty and Honour': 'Долг и честь',
  'Orbital Teleportarium': 'Орбитальный телепортариум',
  'Legendary Fortitude': 'Легендарная стойкость',
  'Data-link Augury': 'Даталинк-ауспиция',
  'Reactive Evasion': 'Реактивное уклонение',
  'Anti-grav Surge': 'Антигравитационный рывок',
  'Adaptive Operations': 'Гибкие операции',
  'Cloaked Position': 'Скрытая позиция',
  'Machine Wrath': 'Гнев машины',
  'Ceramite Sledgehammer': 'Керамитовая кувалда',
  'Advanced Deployment': 'Передовое развёртывание',
  'Purgation Doctrine': 'Доктрина чистки',
  'Target Weak Point': 'Удар по слабому месту',
  'Kill Shot': 'Убойный выстрел',
  'Rapid Gunnery': 'Беглый огонь',
  'Reactive Repositioning': 'Реактивное перестроение',
  'Machine Vengeance': 'Месть машины',
  'Unyielding Might': 'Несгибаемая мощь',
  'Priority Strike': 'Приоритетный удар',
  'Stand to the End': 'Стоять до конца',
  'Augmented Targeting': 'Аугментированное наведение',
  'Evasive Repositioning': 'Уклончивое перестроение',
  'Tactical Foresight': 'Тактическое предвидение',
  'Courage and Honour!': 'Отвага и честь!',
  'Ultramarian Adaptivity': 'Ультрамаринская гибкость',
  'Exemplary Vigilance': 'Образцовая бдительность',
  'Practical Tactics': 'Практическая тактика',
  'Ruthless Butchery': 'Беспощадная бойня',
  'Cogitated Ferocity': 'Расчётливая свирепость',
  'Augmetic Fortitude': 'Аугметическая стойкость',
  'Dominator Beacon': 'Маяк-доминатор',
  'Dropship Extraction': 'Эвакуация десант-кораблём',
  'Spear Thrust and Sabre Swing': 'Удар копьём и взмах саблей',
  'Mobile Lethality': 'Мобильная смертоносность',
  "Hunter's Instincts": 'Инстинкты охотника',
  'Evasive Manoeuvres': 'Уклончивые манёвры',
  'Withdraw and Regroup': 'Отход и перегруппировка',
  'Wrathful Inferno': 'Гневное пекло',
  'Blazing Earth': 'Пылающая земля',
  'Wrathful Conquerors': 'Гневные завоеватели',
  'Fury of the First': 'Ярость Первой роты',
  'Disciplined Extermination': 'Дисциплинированное истребление',
  'Obdurate Vengeance': 'Упорное возмездие',
  'Stunning Fusillade': 'Ошеломляющий залп',
  'Lay Low the Tyrants': 'Низвергнуть тиранов',
  'Raptorial Vigilance': 'Хищная бдительность',
  'Feint and Thrust': 'Финт и выпад',
  'Into Darkness': 'Во тьму',
  'Codex Discipline': 'Дисциплина Кодекса',
  'Shock Bombardment': 'Шоковая бомбардировка',
  'Guided Disruption': 'Направленное подавление',
  'Angels Defiant': 'Непокорные ангелы',
  'Light of Vengeance': 'Свет возмездия',
  'Heresy Undone': 'Ересь повержена',
  'Suppression Strafing': 'Подавляющий обстрел',
  'Tactical Decapitation': 'Тактическое обезглавливание',
  'Shock Onslaught': 'Шоковый натиск',
  'Autosense Coordination': 'Координация авточувств',
  'Blind Screen': 'Слепящая завеса',
  'Onward for the Emperor': 'Вперёд, за Императора',
  'Crusading Conquerors': 'Крестоносцы-завоеватели',
  'Furious Dedication': 'Яростная преданность',
  'Fight to the End': 'Биться до конца',
  'Scions of Guilliman': 'Отпрыски Жиллимана',
  'Ultramarian Destiny': 'Ультрамаринская судьба',
  'Marching Ever On': 'Всё вперёд',
}

// RU display name for the army rule (shown under the English name).
export const armyRuleNameRu = 'Клятва момента'

// RU display names for detachments, keyed by English name.
export const detNamesRu = {
  'Gladius Task Force': 'Ударная группа «Гладиус»',
  'Anvil Siege Force': 'Осадный отряд «Наковальня»',
  'Ironstorm Spearhead': 'Остриё «Стальная буря»',
  'Firestorm Assault Force': 'Штурмовой отряд «Огненный шторм»',
  'Stormlance Task Force': 'Ударная группа «Грозовое копьё»',
  'Vanguard Spearhead': 'Остриё авангарда',
  '1st Company Task Force': 'Ударная группа 1-й роты',
  'Fulguris Task Force': 'Ударная группа «Фульгурис»',
  'Librarius Conclave': 'Конклав Либрариума',
  'Subversion Assets': 'Силы подрыва',
  'Armoured Speartip': 'Бронированное остриё',
  'Headhunter Task Force': 'Ударная группа «Охотник за головами»',
  'Ceramite Sentinels': 'Керамитовые стражи',
  'Blade of Ultramar': 'Клинок Ультрамара',
  'Hammer of Avernii': 'Молот Аверний',
  'Spearpoint Task Force': 'Ударная группа «Остриё копья»',
  "Forgefather's Seekers": 'Искатели Кузнеца-Отца',
  "Emperor's Shield": 'Щит Императора',
  'Shadowmark Talon': 'Коготь «Теневая метка»',
  'Bastion Task Force': 'Ударная группа «Бастион»',
  'Orbital Assault Force': 'Орбитальный штурмовой отряд',
  'Reclamation Force': 'Отряд возвращения',
}

// RU display names for detachment rules, keyed by English name.
export const detRuleNamesRu = {
  'Combat Doctrines': 'Боевые доктрины',
  'Shield of the Imperium': 'Щит Империума',
  'Armoured Wrath': 'Бронированный гнев',
  'Close-range Eradication': 'Истребление в упор',
  'Lightning Assault': 'Молниеносный штурм',
  'Shadow Masters': 'Владыки теней',
  'Extremis-level Threat': 'Угроза уровня «экстремис»',
  'Skystrike': 'Небесный удар',
  'Psychic Disciplines': 'Псионические дисциплины',
  'Nowhere to Hide': 'Негде укрыться',
  'Rapid Deployment': 'Быстрое развёртывание',
  'Target Sighted': 'Цель обнаружена',
  'Adaptive Defence': 'Адаптивная оборона',
  'Mastered Doctrines': 'Освоенные доктрины',
  'Calculated Annihilation': 'Расчётливое истребление',
  'Stormswift Onslaught': 'Стремительный как буря натиск',
  "Vulkan's Quest": 'Искание Вулкана',
  'Wrath of Dorn': 'Гнев Дорна',
  'Masters of Shadow': 'Владыки тени',
  'Interlocking Tactics': 'Взаимосвязанная тактика',
  'Rapid-drop Deployment': 'Быстрая десантная высадка',
  'Oath of Reclamation': 'Клятва возвращения',
}

// RU display names for enhancements — shown as a small muted second line under the
// English name in FactionRuleView (RU locale only), same treatment as stratNamesRu.
// Keyed by the English name so repeated enhancements share one translation. Latin/Roman
// proper-noun names (Spiritus Ferrum, Liberatum) are deliberately omitted — they stay
// English, same policy as Latin flavor ability names in datasheets.
export const enhNamesRu = {
  'Adept of the Codex': 'Адепт Кодекса',
  'Artificer Armour': 'Мастеровая броня',
  'Fire Discipline': 'Огневая дисциплина',
  'The Honour Vehement': 'Пылкая честь',
  'Architect of War': 'Архитектор войны',
  'Fleet Commander': 'Командующий флотом',
  'Indomitable Fury': 'Несокрушимая ярость',
  'Stoic Defender': 'Стойкий защитник',
  'Adept of the Omnissiah': 'Адепт Омниссии',
  'Master of Machine War': 'Мастер машинной войны',
  'Target Augury Web': 'Сеть целеуказания',
  'The Flesh Is Weak': 'Плоть слаба',
  'Adamantine Mantle': 'Адамантиевая мантия',
  'Champion of Humanity': 'Поборник человечества',
  'Forged in Battle': 'Закалённый в боях',
  'War-tempered Artifice': 'Закалённое войной мастерство',
  'Feinting Withdrawal': 'Обманный отход',
  'Fury of the Storm': 'Ярость бури',
  'Portents of Wisdom': 'Знамения мудрости',
  'Execute and Redeploy': 'Удар и отход',
  'Ghostweave Cloak': 'Плащ призрачного плетения',
  'Shadow War Veteran': 'Ветеран теневой войны',
  'The Blade Driven Deep': 'Глубоко вонзённый клинок',
  'Fear Made Manifest': 'Воплощённый страх',
  'Rites of War': 'Обряды войны',
  'Iron Resolve': 'Железная решимость',
  'Bellicose Weapon Spirits': 'Воинственные духи оружия',
  'Raptorial Cogitator Core': 'Хищное ядро когитатора',
  'Celerity': 'Стремительность',
  'Prescience': 'Предвидение',
  'Obfuscation': 'Сокрытие',
  'Temporal Corridor': 'Временной коридор',
  'Fusillade': 'Шквальный залп',
  'Shroud Field': 'Маскирующее поле',
  'Death in the Dark': 'Смерть во тьме',
  'Armoured Commander': 'Бронированный командир',
  'Liberator': 'Освободитель',
  'Shock Deployment': 'Шоковая высадка',
  'Tip of the Spear': 'Остриё копья',
  'Astartes Tank Ace': 'Танковый ас Астартес',
  'Firestorm Coordinators': 'Координаторы огненного шторма',
  'Gunnery Honours': 'Почести расчёта',
  'Redoubtable Machine Spirit': 'Грозный дух машины',
  'Castellum Omnivox': 'Кастеллум-омнивокс',
  'Defensive Mastery': 'Оборонительное мастерство',
  'Honour Indefatigable': 'Неутомимая честь',
  'Spy-skull Data Link': 'Канал данных черепа-шпиона',
  'Armour of Antoninus': 'Броня Антонина',
  'Oath of Macragge': 'Клятва Макрагга',
  'Student of the Codex': 'Ученик Кодекса',
  'Veteran of Behemoth': 'Ветеран Бегемота',
  'Iron Laurel': 'Железный лавр',
  'Medusan Roar': 'Медузианский рёв',
  'Steel Font': 'Стальной источник',
  'Chogorian Huntmaster': 'Чогорианский ловчий',
  'Spearpoint Paragon': 'Идеал острия копья',
  'Immolator': 'Поджигатель',
  'Champion of the Feast': 'Чемпион Пира клинков',
  'Disciple of Rhetoricus': 'Ученик Реторикуса',
  'Indomitable Champion': 'Несокрушимый чемпион',
  'Malodraxian Standard': 'Малодраксийский штандарт',
  'Blackwing Shroud': 'Покров Чёрного Крыла',
  'Coronal Susurrant': 'Шепчущий венец',
  'Umbral Raptor': 'Теневой хищник',
  'Blades of Valour': 'Клинки доблести',
  'Bombast Omnivox': 'Омнивокс «Бомбаст»',
  'Eye of the Primarch': 'Око Примарха',
  'Hero of the Chapter': 'Герой Ордена',
  'Dedicated Gunship': 'Приданный штурмовик',
  'Laurels of Thunder': 'Лавры грома',
  'Orbital Uplink Reliquary': 'Реликварий орбитальной связи',
  'Veteran of the Vanguard': 'Ветеран авангарда',
  'Avenging Avatar': 'Мстящий аватар',
  'Scroll of Proclamation': 'Свиток провозглашения',
  'Seals of Reconquest': 'Печати Реконкисты',
  "Hunter's Instincts": 'Инстинкты охотника',
  "The Imperium's Sword": 'Меч Империума',
  "Hunter's Eye": 'Глаз охотника',
  "Stormseers' Wisdom": 'Мудрость штормовидцев',
}

export default {
  armyRule: {
    flavor:
      'В бою космодесантники приносят могучие клятвы уничтожить врагов Императора и отстоять честь своего ордена, и такие обеты священны. Когда Ангелы Смерти наносят удар, они делают это с точностью хирурга и мощью молнии. Опыт и стратегическое мастерство помогают им читать переменчивый ход битвы с трансчеловеческой скоростью и ясностью, направляя свой гнев на одну приоритетную цель за другой.',
    body: `Если [gloss:army-faction:фракция вашей армии] — Adeptus Astartes, в начале вашей фазы командования выберите один юнит из армии оппонента. До начала вашей следующей фазы командования этот вражеский юнит — [gloss:sm-oath-of-moment:ваша цель Oath of Moment]. Каждый раз, когда модель с этой способностью совершает атаку по вашей цели Oath of Moment:
▪ Вы можете [gloss:re-roll:перебросить] [gloss:hit-roll:бросок на попадание].
▪ Если вы используете [gloss:detachments:детачмент] Codex: Space Marines и в вашей армии нет ни одного юнита с [gloss:keywords:ключевым словом] Blood Angels, Dark Angels, Deathwatch или Space Wolves, добавьте также 1 к [gloss:wound-roll:броску на ранение].

**Space Marine Chapters:**
▪ Если у юнита Adeptus Astartes на [gloss:datasheet:листе данных] есть второе [gloss:faction-keyword:фракционное ключевое слово], это ключевое слово — название ордена этого юнита. Например, у Marneus Calgar есть ключевые слова Adeptus Astartes и Ultramarines, и он из ордена Ультрамаринов.
▪ Вы не можете включать в армию юниты более чем одного ордена.`,
  },

  detachments: [
    // ─────────────── Gladius Task Force ───────────────
    {
      rule: {
        flavor:
          'Codex Astartes доказал свою ценность как трактат о войне на бесчисленных полях сражений на протяжении десяти тысяч лет. Многие космодесантники благоговеют перед его мудростью и воплощают его учения, применяя гибкий набор боевых доктрин, чтобы уничтожить своего врага.',
        body: `В начале вашей фазы командования вы можете выбрать одну из перечисленных ниже [gloss:sm-combat-doctrine:Combat Doctrines]. До начала вашей следующей фазы командования эта Combat Doctrine активна, и её эффекты применяются ко всем юнитам Adeptus Astartes вашей армии. Каждую Combat Doctrine можно выбрать только один раз за битву.

### Devastator Doctrine | Опустошительная доктрина
Этот юнит [gloss:eligible-to-shoot:может стрелять] в ходу, в котором он [gloss:advance:продвигался].

### Tactical Doctrine | Тактическая доктрина
Этот юнит может стрелять и [gloss:declare-charge:объявлять нападение] в ходу, в котором он [gloss:fall-back-move:отступил].

### Assault Doctrine | Штурмовая доктрина
Этот юнит [gloss:eligible-to-charge:может объявлять нападение] в ходу, в котором он продвигался.`,
      },
      stratagems: [
        armourOfContempt,
        {
          flavor: 'Неминуемая смерть не мешает космодесантнику вершить свой последний суд над врагами Империума.',
          when: 'Фаза ближнего боя, сразу после того как вражеский юнит [gloss:select-targets:выбрал цели].',
          target: 'Один юнит Adeptus Astartes вашей армии, который был выбран целью одной или более атак атакующего юнита.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита [gloss:destroyed:уничтожается], если та модель ещё не сражалась в этой фазе, не убирайте её из игры. Уничтоженная модель может сражаться после того, как юнит атакующей модели завершит свои атаки, и затем убирается из игры.',
          restrictions: '',
        },
        {
          flavor: 'Каждый орден выковал собственные предания о героизме, и ни один из его боевых братьев не позволит запятнать эту благородную летопись.',
          when: 'Фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes вашей армии.',
          effect: 'До конца фазы [gloss:melee-weapons:оружие ближнего боя] моделей вашего юнита имеет способность [LANCE]. Если ваш юнит находится под эффектом Assault [gloss:sm-combat-doctrine:Doctrine], до конца фазы также улучшите характеристику [gloss:armour-penetration:бронепробития (AP)] такого оружия на 1.',
          restrictions: '',
        },
        {
          flavor: 'Заветы Codex Astartes допускают нестандартное использование боевой тактики и применение отклоняющихся доктрин, если это приведёт к победе.',
          when: 'Ваша фаза командования.',
          target: 'Один юнит Adeptus Astartes вашей армии.',
          effect: 'Выберите Devastator Doctrine, Tactical Doctrine или Assault Doctrine. До начала вашей следующей фазы командования эта [gloss:sm-combat-doctrine:Combat Doctrine] активна для этого юнита вместо любой другой Combat Doctrine, активной для вашей армии, даже если вы уже выбирали эту Combat Doctrine в этой битве.',
          restrictions: '',
        },
        {
          flavor: 'От гнева космодесантников не скрыться, и они используют своё оружие, чтобы принести быструю смерть врагам, где бы те ни прятались.',
          when: 'Ваша фаза стрельбы.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был [gloss:selected-to-shoot:выбран для стрельбы] в этой фазе.',
          effect: 'До конца фазы [gloss:ranged-weapons:оружие дальнего боя] моделей вашего юнита имеет способность [IGNORES COVER]. Если ваш юнит находится под эффектом Devastator [gloss:sm-combat-doctrine:Doctrine], до конца фазы также улучшите характеристику [gloss:armour-penetration:бронепробития (AP)] такого оружия на 1.',
          restrictions: '',
        },
        {
          flavor: 'Космодесантники точно знают, когда уступить позицию, чтобы оставить врагов в замешательстве, прежде чем вновь ринуться в бой и в беспорядке прогнать их с поля.',
          when: 'Фаза движения вашего оппонента, сразу после того как вражеский юнит завершил обычный манёвр, [gloss:advance-move:продвижение] или [gloss:fall-back-move:отступление].',
          target: 'Один юнит Adeptus Astartes Infantry или Adeptus Astartes Mounted вашей армии [gloss:within:в пределах] 8" от вражеского юнита, который только что завершил тот манёвр.',
          effect: 'Ваш юнит может совершить [gloss:normal-move:обычный манёвр] до D6" или, если он находится под эффектом Tactical [gloss:sm-combat-doctrine:Doctrine], вместо этого обычный манёвр до 6".',
          restrictions: 'Вы не можете выбрать юнит, находящийся в [gloss:engagement-range:радиусе связывания] с одним или более вражескими юнитами.',
        },
      ],
      enhancements: [
        {
          flavor: 'Ревностный ученик Codex Astartes, этот командир воплощает его тактический гений, и почерпнутая из его учений мудрость направляет его выверенные стратегические решения в самой яростной битве.',
          body: `Только модель Captain. В начале вашей фазы командования, если [gloss:bearer:носитель] на поле боя, вместо выбора [gloss:sm-combat-doctrine:Combat Doctrine], активной для вашей армии, вы можете выбрать Tactical Doctrine. Если вы это делаете, до начала вашей следующей фазы командования эта Combat Doctrine активна только для юнита носителя, даже если вы уже выбирали эту Combat Doctrine активной для вашей армии в этой битве.`,
        },
        {
          flavor: 'Выкованный лучшими артифайсерами ордена, этот доспех обеспечивает превосходную защиту.',
          body: `Только модель Adeptus Astartes. [gloss:bearer:Носитель] имеет характеристику [gloss:save:спас-броска] 2+ и способность Feel No Pain 5+.`,
        },
        {
          flavor: 'Этот командир безжалостно муштрует своих воинов; в сочетании с невероятными рефлексами Adeptus Astartes это порождает опустошительную скорострельность.',
          body: `Только модель Adeptus Astartes. Пока [gloss:bearer:носитель] [gloss:lead:возглавляет] юнит, [gloss:ranged-weapons:оружие дальнего боя] моделей того юнита имеет способность [SUSTAINED HITS 1]. Кроме того, пока юнит носителя находится под эффектом Devastator [gloss:sm-combat-doctrine:Doctrine], вы можете [gloss:re-roll:перебрасывать] [gloss:advance-roll:броски продвижения], сделанные для того юнита.`,
        },
        {
          flavor: 'Эта строфа начертана на трижды благословлённом пергаменте и прикреплена к снаряжению носителя печатью чистоты, дабы вдохновлять его на героические деяния воинской доблести.',
          body: `Только модель Adeptus Astartes. Добавьте 1 к характеристикам атак и [gloss:strength:Силы] [gloss:melee-weapons:оружия ближнего боя] [gloss:bearer:носителя]. Пока носитель находится под эффектом Assault [gloss:sm-combat-doctrine:Doctrine], вместо этого добавьте 2 к характеристикам атак и Силы оружия ближнего боя носителя.`,
        },
      ],
    },

    // ─────────────── Anvil Siege Force ───────────────
    {
      rule: {
        flavor:
          'На залитых кровью полях сражений, в высящихся цитаделях и на изолированных орбитальных станциях Ангелы Смерти отбрасывают волны предателей, мутантов, ксеносов и еретиков и очищают вражеские владения от врагов благодаря своим дисциплинированным стратегиям и боевому мастерству.',
        body: `[gloss:ranged-weapons:Оружие дальнего боя] моделей Adeptus Astartes вашей армии имеет способность [HEAVY]. Если такое оружие уже имеет эту способность, каждый раз, когда им совершается атака, если юнит атакующей модели [gloss:remain-stationary:оставался неподвижным] в этом ходу, добавьте 1 к [gloss:wound-roll:броску на ранение].`,
      },
      stratagems: [
        armourOfContempt,
        {
          flavor: 'Чтобы сразиться с окопавшимися космодесантниками, враги прибегают к бронированной технике или сворам смертоносных чудовищ. Но даже у величайшего исполина есть брешь в броне, и Adeptus Astartes хорошо умеют использовать такие слабости.',
          when: 'Ваша фаза стрельбы.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был [gloss:selected-to-shoot:выбран для стрельбы] в этой фазе.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита совершает [gloss:ranged-attacks:атаку дальнего боя] по юниту Monster или Vehicle, вы можете [gloss:re-roll:перебросить] [gloss:wound-roll:бросок на ранение].',
          restrictions: '',
        },
        {
          flavor: 'Верные долгу, Adeptus Astartes отказываются покидать свои позиции. Вместо этого они закрепляют рубеж, чтобы установить новые линии огня по врагу.',
          when: 'Конец фазы ближнего боя.',
          target: 'Один юнит Adeptus Astartes вашей армии в [gloss:engagement-range:радиусе связывания] с одним или более вражескими юнитами.',
          effect: 'Ваш юнит может немедленно совершить манёвр [gloss:fall-back-move:отступления] до 6".',
          restrictions: 'Совершая этот манёвр, ваш юнит должен завершить его либо [gloss:wholly-within:целиком в пределах] вашей [gloss:deployment-zone:зоны развёртывания], либо в дистанции до [gloss:objective-marker:маркера цели].',
        },
        {
          flavor: 'Космодесантники тренируются бессчётные часы, оттачивая владение оружием, и в пылу битвы могут запустить мнемоническое программирование, чтобы вспомнить свои ритуальные упражнения и обеспечить уничтожение врага.',
          when: 'Ваша фаза стрельбы.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был выбран для стрельбы в этой фазе.',
          effect: 'До конца фазы [gloss:ranged-weapons:оружие дальнего боя] моделей вашего юнита имеет способность [SUSTAINED HITS 1]. Если ваш юнит [gloss:remain-stationary:оставался неподвижным] в этом ходу, то до конца фазы каждый раз, когда модель вашего юнита совершает атаку дальнего боя, [gloss:critical-hit:критическое попадание] засчитывается на успешном немодифицированном [gloss:hit-roll:броске на попадание] 5+.',
          restrictions: '',
        },
        {
          flavor: 'Осадная война несравнимо жестока. Космодесантники сражаются с яростнейшей решимостью ради победы и будут биться до смерти, удерживая каждый оборонительный рубеж или закрепляя отвоёванные у врага позиции.',
          when: 'Ваша фаза командования.',
          target: 'Один юнит Adeptus Astartes Infantry вашей армии в дистанции до [gloss:objective-marker:маркера цели].',
          effect: 'До конца хода удвойте характеристику [gloss:objective-control:контроля над целью] моделей вашего юнита, но в этом ходу он должен [gloss:remain-stationary:оставаться неподвижным].',
          restrictions: '',
        },
        {
          flavor: 'Невероятная боевая осведомлённость космодесантников позволяет им инстинктивно определять источник любого вражеского огня и карать нападающих.',
          when: 'Фаза стрельбы вашего оппонента, сразу после того как вражеский юнит [gloss:resolve-attacks:разрешил свои атаки].',
          target: 'Один юнит Adeptus Astartes вашей армии, у которого одна или более моделей были [gloss:destroyed:уничтожены] в результате атак атакующего юнита.',
          effect: 'Ваш юнит может стрелять, как если бы это была ваша фаза стрельбы, но при этом должен целиться только в тот вражеский юнит и может делать это, только если тот вражеский юнит является допустимой целью.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'Мало кто понимает заветы осадной войны глубже этого воина.',
          body: `Только модель Adeptus Astartes. Пока [gloss:bearer:носитель] [gloss:lead:возглавляет] юнит, [gloss:ranged-weapons:оружие дальнего боя] моделей того юнита имеет способность [IGNORES COVER].`,
        },
        {
          flavor: 'Орбитальные боевые корабли ордена готовы обрушить опустошение по приказу этого командира.',
          body: `Только модель Captain. Один раз за битву, в начале вашей фазы стрельбы, вы можете выбрать одну точку на поле боя и поставить маркер в этой точке. В начале вашей следующей фазы стрельбы поставьте ещё один маркер на поле боя [gloss:within:в пределах] 12" от центра первого маркера, затем проведите прямую линию между центрами этих маркеров. Бросьте один D6 за каждый юнит, через который проходит или над которым проходит эта линия: на 3+ тот юнит получает D3 [gloss:mortal-wound:смертельных ран]. Затем оба маркера убираются.`,
        },
        {
          flavor: 'Этот герой отказывается уступать, пока остаются враги, отбиваясь на грани смерти, словно мстительный полубог.',
          body: `Только модель Gravis. Когда [gloss:bearer:носитель] [gloss:destroyed:уничтожается] впервые, бросьте один D6 в конце фазы. На 2+ верните носителя на поле боя как можно ближе к месту, где он был уничтожен, и не в [gloss:engagement-range:радиусе связывания] с какими-либо вражескими юнитами, с полным запасом [gloss:wounds:ран].`,
        },
        {
          flavor: 'Этот командир и его воины упорно удерживают позицию даже против подавляющей численности.',
          body: `Только модель Adeptus Astartes. Пока [gloss:bearer:носитель] [gloss:lead:возглавляет] юнит, модели того юнита имеют способность Feel No Pain 6+, пока находятся в дистанции до контролируемого вами [gloss:objective-marker:маркера цели], а пока тот юнит [gloss:battle-shocked:в боевом шоке], характеристика [gloss:objective-control:контроля над целью] его моделей делится пополам вместо того, чтобы становиться 0.`,
        },
      ],
    },

    // ─────────────── Ironstorm Spearhead ───────────────
    {
      rule: {
        flavor:
          'Командиры Ironstorm Spearhead направляют свою атаку предрассчитанными огневыми решениями, циклически загружая дата-гейст-инлоады и нашёптывая бинарные ауспиции. Это обеспечивает, что их воины — и воинственные духи машин, обитающие в их боевых машинах, — ведут огонь с неотвратимой точностью.',
        body: `Один раз за фазу для каждого юнита Adeptus Astartes в вашей армии вы можете [gloss:re-roll:перебросить] один [gloss:hit-roll:бросок на попадание], один [gloss:wound-roll:бросок на ранение] или один [gloss:damage-roll:бросок урона], сделанный для модели того юнита.`,
      },
      stratagems: [
        {
          flavor: 'Космодесантники — образец непреклонного упорства. Даже раненые, они никогда не отрекутся от своих клятв.',
          when: 'Фаза командования.',
          target: 'Один юнит Adeptus Astartes вашей армии, находящийся [gloss:below-starting-strength:ниже своей начальной численности].',
          effect: 'До конца хода ваш юнит может игнорировать любые или все [gloss:modifier:модификаторы] своих характеристик и/или любого броска или теста, сделанного для него (исключая модификаторы [gloss:save-roll:спас-бросков]).',
          restrictions: '',
        },
        armourOfContempt,
        {
          flavor: 'Как только враг помечен на уничтожение, Ангелы Смерти не должны отступать, пока цель не будет истреблена.',
          when: 'Ваша фаза стрельбы или фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был [gloss:selected-to-shoot:выбран для стрельбы] или ближнего боя в этой фазе.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита совершает атаку по юниту, находящемуся [gloss:below-starting-strength:ниже своей начальной численности], та атака имеет способность [SUSTAINED HITS 1], и при совершении такой атаки, если атакующая модель — Vehicle, [gloss:critical-hit:критическое попадание] засчитывается на успешном немодифицированном [gloss:hit-roll:броске на попадание] 5+.',
          restrictions: '',
        },
        {
          flavor: 'Тщательно рассчитанные бинарные молитвы могут сфокусировать ярость духа машины в почти одержимую ненависть к его убийцам, обеспечивая возмездие даже после гибели.',
          when: 'Любая фаза, сразу после того как модель Adeptus Astartes Vehicle вашей армии со способностью Deadly Demise [gloss:destroyed:уничтожена].',
          target: 'Та модель Adeptus Astartes Vehicle. Вы можете использовать эту стратагему на этой модели, даже несмотря на то что она только что была уничтожена.',
          effect: 'Не бросайте один D6, чтобы определить, наносятся ли [gloss:mortal-wound:смертельные раны] способностью Deadly Demise вашей модели. Вместо этого смертельные раны наносятся автоматически.',
          restrictions: '',
        },
        {
          flavor: 'Герои, погребённые внутри дредноутов, сражались в бесчисленных зонах боевых действий на протяжении своего продлённого существования, оттачивая воинское мастерство за пределы смертных возможностей.',
          when: 'Ваша фаза командования.',
          target: 'Одна модель Adeptus Astartes Walker вашей армии.',
          effect: 'До начала вашей следующей фазы командования улучшите характеристики [gloss:move-characteristic:движения], [gloss:toughness:стойкости], [gloss:leadership:лидерства] и [gloss:objective-control:контроля над целью] вашей модели на 1, и каждый раз, когда ваша модель совершает атаку, добавьте 1 к [gloss:hit-roll:броску на попадание].',
          restrictions: '',
        },
        {
          flavor: 'Существует множество преданий о духах машин, что сеют хаос среди врага даже после гибели экипажа их машины и отказа критических систем.',
          when: 'Фаза стрельбы вашего оппонента, сразу после того как вражеский юнит [gloss:resolve-attacks:разрешил свои атаки].',
          target: 'Один юнит Adeptus Astartes Vehicle вашей армии, который был сведён [gloss:half-strength:ниже половинной численности] в результате атак атакующего юнита.',
          effect: 'Ваш юнит может стрелять, как если бы это была ваша фаза стрельбы, но при этом должен целиться только в тот вражеский юнит и может делать это, только если тот вражеский юнит является допустимой целью.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'Этот боевой брат сведущ в сокровенных технологических обрядах. Если его бронированным подопечным угрожает опасность, всплеск таинственной бинарной литании может пробудить их духов машин к бдительности.',
          body: `Только модель Techmarine. Один раз за [gloss:battle-round:раунд боя], когда для [gloss:friendly:дружественной] модели Adeptus Astartes Vehicle [gloss:within:в пределах] 6" от [gloss:bearer:носителя] проваливается [gloss:save-roll:спас-бросок], вы можете изменить характеристику урона той атаки на 0.`,
        },
        {
          flavor: 'Этот командир превосходно одарён в стратегиях бронированной войны и понимает возможности каждой боевой машины в арсенале ордена.',
          body: `Только модель Adeptus Astartes. В вашей фазе командования выберите одну модель Adeptus Astartes Vehicle [gloss:within:в пределах] 6" от [gloss:bearer:носителя]. До начала вашей следующей фазы командования тот Vehicle [gloss:eligible-to-shoot:может стрелять], даже если он [gloss:fall-back-move:отступил] или [gloss:advance:продвигался] в этом ходу.`,
        },
        {
          flavor: 'Этот командир авангарда использует продвинутые аугметики, чтобы распределять данные целеуказания, направляя огонь экипажей своих боевых машин и пробуждая их духов машин к оперативному превосходству.',
          body: `Только модель Techmarine. В вашей фазе командования выберите одну модель Adeptus Astartes Vehicle [gloss:within:в пределах] 6" от [gloss:bearer:носителя]. До начала вашей следующей фазы командования оружие той модели Vehicle имеет способность [LETHAL HITS].`,
        },
        {
          flavor: 'Раны прошлых битв привели к тому, что этот воин был во многом перестроен с использованием сверхпрочных кибернетических конечностей и органов, что делает его крайне трудным для убийства.',
          body: `Только модель Adeptus Astartes. [gloss:bearer:Носитель] имеет способность Feel No Pain 4+.`,
        },
      ],
    },

    // ─────────────── Firestorm Assault Force ───────────────
    {
      rule: {
        flavor:
          'Космодесантники — лучшие штурмовые войска Императора, разящие врага прежде, чем тот успевает среагировать. В своих стремительных механизированных атаках космодесантники сметают врага в сторону, безжалостно уничтожая его в ближнем бою.',
        body: `[gloss:ranged-weapons:Оружие дальнего боя] моделей Adeptus Astartes вашей армии имеет способность [ASSAULT], и каждый раз, когда атака таким оружием нацелена на юнит [gloss:within:в пределах] 12", добавьте 1 к характеристике [gloss:strength:Силы] этой атаки.`,
      },
      stratagems: [
        armourOfContempt,
        {
          flavor: 'Залп за залпом горящего прометия, выпущенные синхронизированными волнами, обратят почти любого врага в тлеющий пепел.',
          when: 'Ваша фаза стрельбы.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был [gloss:selected-to-shoot:выбран для стрельбы] в этой фазе.',
          effect: 'До конца фазы оружие Torrent моделей того юнита имеет способность [DEVASTATING WOUNDS].',
          restrictions: '',
        },
        {
          flavor: 'Только там, где врага можно встретить лицом к лицу, космодесантник может быть по-настоящему испытан.',
          when: 'Ваша фаза стрельбы или фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes Infantry вашей армии, который ещё не был [gloss:selected-to-shoot:выбран для стрельбы] или ближнего боя в этой фазе.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита совершает атаку по ближайшей допустимой цели [gloss:within:в пределах] 6", добавьте 1 к [gloss:wound-roll:броску на ранение].',
          restrictions: '',
        },
        {
          flavor: 'Вооружённые данными целеуказания, поставляемыми ауспик-гейстами их транспорта, воины вырываются со штурмовых аппарелей с полыхающим оружием в безжалостных схемах истребления.',
          when: 'Ваша фаза стрельбы.',
          target: 'Один юнит Adeptus Astartes вашей армии, который [gloss:disembark:высадился] из [gloss:transport:Transport] в этом ходу и ещё не был [gloss:selected-to-shoot:выбран для стрельбы] в этой фазе.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита совершает [gloss:ranged-attacks:атаку дальнего боя] по ближайшей допустимой цели [gloss:within:в пределах] 12", добавьте 1 к [gloss:hit-roll:броску на попадание]. Если в результате любой из этих атак [gloss:destroyed:уничтожены] одна или более вражеских моделей, выберите одну из этих уничтоженных моделей; юнит той уничтоженной модели должен пройти [gloss:battle-shock-test:тест на боевой шок].',
          restrictions: '',
        },
        {
          flavor: 'Нельзя терять ни секунды в наказании врагов Императора. Многие заслуживают смерти, и стоит одному врагу пасть, как за ним вскоре должен последовать другой.',
          when: 'Конец фазы ближнего боя.',
          target: 'Один юнит Adeptus Astartes Transport вашей армии, в котором нет [gloss:embarked:погруженных] моделей, и один юнит Adeptus Astartes Infantry вашей армии [gloss:wholly-within:целиком в пределах] 6" от того Transport.',
          effect: 'Ваш юнит Infantry может [gloss:embark:погрузиться] в тот Transport.',
          restrictions: 'Вы не можете выбрать юнит Infantry, находящийся в [gloss:engagement-range:радиусе связывания] с одним или более вражескими юнитами, который в обычной ситуации не может погрузиться в тот Transport или который [gloss:disembark:высадился] из Transport в этом ходу.',
        },
        {
          flavor: 'Открыть огонь по воинам Firestorm Assault Force — значит лишь навлечь на себя собственную быструю гибель.',
          when: 'Фаза стрельбы вашего оппонента, сразу после того как вражеский юнит [gloss:resolve-attacks:разрешил свои атаки].',
          target: 'Один юнит Adeptus Astartes Transport вашей армии, который был выбран целью одной или более атак атакующего юнита.',
          effect: 'Один юнит, [gloss:embarked:погруженный] в тот Transport, может [gloss:disembark:высадиться], как если бы это была ваша фаза движения, а затем может стрелять, как если бы это была ваша фаза стрельбы, но при этом должен целиться только в тот вражеский юнит и может делать это, только если тот вражеский юнит является допустимой целью.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'Этот струящийся плащ или искусно сработанный табард пронизан нитями плетёного адамантия.',
          body: `Только модель Adeptus Astartes. Каждый раз, когда [gloss:bearer:носителю] распределяется атака, вычтите 1 из характеристики урона той атаки. Если та атака совершена оружием Melta или Torrent, вместо этого измените характеристику урона той атаки на 1.`,
        },
        {
          flavor: 'Этот командир и его воины поклялись обеспечить победу и защитить Империум от ужасов галактики.',
          body: `Только модель Tacticus. Пока [gloss:bearer:носитель] [gloss:lead:возглавляет] юнит, модели того юнита могут игнорировать любые или все [gloss:modifier:модификаторы] своих характеристик и/или любого броска или теста, сделанного для них (исключая модификаторы [gloss:save-roll:спас-бросков]).`,
        },
        {
          flavor: 'Для этого Ангела Смерти война — наковальня, на которой куётся его сила.',
          body: `Только модель Adeptus Astartes. Пока [gloss:bearer:носитель] [gloss:lead:возглавляет] юнит, один раз за ход, после [gloss:hit-roll:броска на попадание] или [gloss:save-roll:спас-броска] для модели того юнита, вы можете изменить результат того броска на немодифицированную 6.`,
        },
        {
          flavor: 'Долго трудившись в кузницах ордена, этот воин-кузнец выковал своё личное вооружение.',
          body: `Только модель Adeptus Astartes Infantry. Добавьте 3 к характеристике [gloss:strength:Силы] [gloss:melee-weapons:оружия ближнего боя] [gloss:bearer:носителя].`,
        },
      ],
    },

    // ─────────────── Stormlance Task Force ───────────────
    {
      rule: {
        flavor:
          'Воины Stormlance Task Force применяют высокоскоростную тактику и войну «бей и беги». Они сражаются в движении, сбивая врагов с толку головокружительными манёврами: в один миг они растворяются, а в следующий обрушиваются, словно удар молнии.',
        body: `Юниты Adeptus Astartes вашей армии [gloss:eligible-to-charge:могут объявлять нападение] в ходу, в котором они [gloss:advance:продвигались] или [gloss:fall-back-move:отступили].`,
      },
      stratagems: [
        armourOfContempt,
        {
          flavor: 'Adeptus Astartes — элитные войска, разящие со всей скоростью и яростью испепеляющей молнии.',
          when: 'Ваша фаза нападения.',
          target: 'Один юнит Adeptus Astartes Mounted вашей армии, который ещё не [gloss:declare-charge:объявлял нападение] в этой фазе.',
          effect: 'До конца хода вы можете [gloss:re-roll:перебрасывать] [gloss:charge-roll:броски нападения], сделанные для вашего юнита, а [gloss:melee-weapons:оружие ближнего боя] моделей того юнита имеет способность [LANCE].',
          restrictions: '',
        },
        {
          flavor: 'Воины Stormlance Task Force могут внезапно обрушить на врага плотный и точный огонь, даже несясь, чтобы добить любых уцелевших.',
          when: 'Ваша фаза стрельбы.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был [gloss:selected-to-shoot:выбран для стрельбы] в этой фазе.',
          effect: 'До конца фазы [gloss:ranged-weapons:оружие дальнего боя] моделей вашего юнита имеет способность [ASSAULT]. Если такое оружие уже имеет эту способность, до конца фазы это оружие также имеет способность [SUSTAINED HITS 1].',
          restrictions: '',
        },
        {
          flavor: 'В канун охоты на самую неуловимую добычу опытные техножрецы отряда взывают к духам двигателей своих машин, оттачивая ход железных скакунов, чтобы выжать из них ещё больше скорости.',
          when: 'Ваша фаза движения.',
          target: 'Один юнит Adeptus Astartes Mounted или Adeptus Astartes Vehicle (исключая Walkers) вашей армии.',
          effect: 'До конца фазы, если ваш юнит [gloss:advance:продвигается], не совершайте для него [gloss:advance-roll:бросок продвижения]. Вместо этого до конца фазы добавьте 6" к [gloss:move-characteristic:характеристике движения] моделей вашего юнита или 9", если ваш юнит — Mounted.',
          restrictions: '',
        },
        {
          flavor: 'Словно зефиры, танцующие над широкими горизонтами, наездники и пилоты космодесанта с невероятным мастерством гибко уворачиваются от летящего огня.',
          when: 'Фаза стрельбы вашего оппонента, сразу после того как вражеский юнит [gloss:select-targets:выбрал цели].',
          target: 'Один юнит Adeptus Astartes Mounted или Adeptus Astartes Fly Vehicle вашей армии, который был выбран целью одной или более атак атакующего юнита.',
          effect: 'До конца фазы каждый раз, когда атака нацелена на ваш юнит, вычтите 1 из [gloss:hit-roll:броска на попадание] и вычтите 1 из [gloss:wound-roll:броска на ранение].',
          restrictions: '',
        },
        {
          flavor: 'Космодесантники не любят вступать в бой на чужих условиях, особенно воины Stormlance Task Force, чья боевая тактика строится на скорости и точных, свирепых атаках.',
          when: 'Фаза движения вашего оппонента, сразу после того как вражеский юнит завершил обычный манёвр, [gloss:advance-move:продвижение] или [gloss:fall-back-move:отступление].',
          target: 'Один юнит Adeptus Astartes Infantry или Adeptus Astartes Mounted вашей армии [gloss:within:в пределах] 8" от того вражеского юнита.',
          effect: 'Ваш юнит может совершить [gloss:normal-move:обычный манёвр] до 6".',
          restrictions: 'Вы не можете выбрать юнит, находящийся в [gloss:engagement-range:радиусе связывания] с одним или более вражескими юнитами.',
        },
      ],
      enhancements: [
        {
          flavor: 'Эта живая легенда ордена известна своим спокойствием в пылу битвы и неизменной зоркостью к приливам и отливам сражения.',
          body: `Только модель Adeptus Astartes. Пока [gloss:bearer:носитель] [gloss:lead:возглавляет] юнит, тот юнит [gloss:eligible-to-shoot:может стрелять] в ходу, в котором он [gloss:fall-back-move:отступил].`,
        },
        {
          flavor: 'Этот агрессивный воин вкладывает своё стремление убивать в каждый удар. Он врезается во вражеские ряды со всей яростью бушующей бури.',
          body: `Только модель Adeptus Astartes Mounted. Улучшите характеристики [gloss:strength:Силы] и [gloss:armour-penetration:бронепробития (AP)] [gloss:melee-weapons:оружия ближнего боя] [gloss:bearer:носителя] на 1. Каждый раз, когда носитель завершает [gloss:charge-move:манёвр нападения], до конца хода вместо этого улучшите характеристики Силы и бронепробития (AP) оружия ближнего боя носителя на 2.`,
        },
        {
          flavor: 'Этот конный охотник исповедует ценность кружения вокруг врага и внезапного удара с неожиданной стороны на своём стремительном скакуне.',
          body: `Только модель Adeptus Astartes Mounted. Если юнит [gloss:bearer:носителя] в [gloss:strategic-reserves:стратегических резервах], для целей выставления того юнита на поле боя считайте номер текущего [gloss:battle-round:раунда боя] на единицу выше, чем он есть на самом деле.`,
        },
        {
          flavor: 'Этому воину были явлены знамения о великих угрозах в грядущих войнах, и он вступает в битву с дерзостью, которую некоторые принимают за безрассудство.',
          body: `Только модель Adeptus Astartes. Пока [gloss:bearer:носитель] [gloss:lead:возглавляет] юнит, вы можете [gloss:re-roll:перебрасывать] [gloss:advance-roll:броски продвижения], сделанные для того юнита.`,
        },
      ],
    },

    // ─────────────── Vanguard Spearhead ───────────────
    {
      rule: {
        flavor:
          'Воины Vanguard Spearhead проскальзывают сквозь тени — полувидимые призраки, едва различимые для врага. Враги в нарастающей панике палят в сумрак, и их выстрелы уходят мимо, пока скрытные специалисты окружают своих жертв и готовятся нанести смертельный удар.',
        body: `Каждый раз, когда [gloss:ranged-attacks:атака дальнего боя] нацелена на юнит Adeptus Astartes вашей армии, если только атакующая модель не [gloss:within:в пределах] 12", цель имеет [gloss:benefit-of-cover:преимущество укрытия] против этой атаки.`,
      },
      stratagems: [
        {
          flavor: 'Воины Vanguard Spearhead минируют критически важные цели взрывчаткой, чтобы отказать в них врагу.',
          when: 'Начало фазы командования.',
          target: 'Один юнит Adeptus Astartes Infantry или Adeptus Astartes Mounted вашей армии в дистанции до контролируемого вами [gloss:objective-marker:маркера цели].',
          effect: 'Этот маркер цели становится Sabotaged и остаётся под вашим контролем, даже если у вас нет моделей в дистанции до него, пока ваш оппонент не будет контролировать его в начале или конце любого хода. Пока маркер цели Sabotaged и под вашим контролем, каждый раз, когда вражеский юнит завершает обычный манёвр, продвижение, отступление или [gloss:charge-move:манёвр нападения] в дистанции до того маркера цели, бросьте один D6: на 2+ тот вражеский юнит получает D3 [gloss:mortal-wound:смертельных ран].',
          restrictions: '',
        },
        armourOfContempt,
        {
          flavor: 'Каждый тиран должен страшиться клинка убийцы, и авангард устраивает засады с точной согласованностью.',
          when: 'Фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes Infantry вашей армии, который ещё не был [gloss:selected-to-fight:выбран для боя] в этой фазе.',
          effect: 'До конца фазы [gloss:melee-weapons:оружие ближнего боя] моделей вашего юнита имеет способность [PRECISION].',
          restrictions: '',
        },
        {
          flavor: 'Ускользать от врагов и сеять смятение — само по себе смертоносное оружие.',
          when: 'Ваша фаза стрельбы.',
          target: 'Один юнит Adeptus Astartes Infantry вашей армии, который ещё не был [gloss:selected-to-shoot:выбран для стрельбы] в этой фазе.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита совершает [gloss:ranged-attacks:атаку дальнего боя] по вражескому юниту, находящемуся дальше 12", улучшите характеристики [gloss:ballistic-skill:баллистического навыка (BS)] этой атаки и [gloss:armour-penetration:бронепробития (AP)] на 1. Если в результате этих атак [gloss:destroyed:уничтожены] одна или более вражеских моделей, выберите одну из этих уничтоженных моделей; юнит той уничтоженной модели должен пройти [gloss:battle-shock-test:тест на боевой шок].',
          restrictions: '',
        },
        {
          flavor: 'Притворное отступление можно использовать, чтобы заставить нетерпеливых врагов растянуться или заманить их в смертоносные секторы обстрела.',
          when: 'Фаза нападения вашего оппонента, сразу после того как вражеский юнит [gloss:declare-charge:объявил нападение].',
          target: 'Один [gloss:friendly:дружественный] юнит Adeptus Astartes Infantry [gloss:within:в пределах] 12" от того вражеского юнита.',
          effect: 'Ваш юнит может совершить [gloss:normal-move:обычный манёвр] до D6" или до 6", если это юнит Phobos или Scout Squad.',
          restrictions: 'Вы не можете выбрать юнит, находящийся в [gloss:engagement-range:радиусе связывания] с одним или более вражескими юнитами.',
        },
        {
          flavor: 'В подходящий момент инфильтрационные юниты космодесанта ускользают из боя, лишь чтобы перебраться на новую позицию, готовые вновь ударить по врагу.',
          when: 'Конец фазы ближнего боя вашего оппонента.',
          target: 'До двух юнитов Phobos и/или Scout Squad вашей армии либо один другой юнит Adeptus Astartes Infantry вашей армии.',
          effect: 'Уберите эти юниты с поля боя и поместите их в [gloss:strategic-reserves:стратегические резервы].',
          restrictions: 'Каждый юнит, выбранный для этой стратагемы, должен быть дальше 3" от всех вражеских моделей.',
        },
      ],
      enhancements: [
        {
          flavor: 'Боевые братья под командованием этого воина используют каждую возможность ударить, пока инициатива на их стороне, изводя врага огнём, прежде чем вернуться в тени.',
          body: `Только модель Phobos. В вашей фазе стрельбы, после того как юнит [gloss:bearer:носителя] отстрелялся, если тот юнит не в [gloss:engagement-range:радиусе связывания] с одним или более вражескими юнитами, он может совершить [gloss:normal-move:обычный манёвр] до 6". Если он это делает, до конца хода тот юнит не [gloss:eligible-to-charge:может объявлять нападение]. Это не может позволить юниту носителя двигаться более одного раза в вашу фазу стрельбы.`,
        },
        {
          flavor: 'Сшитый вручную ослеплёнными сервиторами и умащённый дистиллированной кровью, этот плащ создаёт поле техно-духовного диссонанса, скрывающее носителя от глаз и сенсоров.',
          body: `Только модель Adeptus Astartes. [gloss:bearer:Носитель] имеет способности Stealth и [gloss:lone-operative:Lone Operative].`,
        },
        {
          flavor: 'К тому времени, когда враг решает, что битва только началась, его тылы уже атакованы по приказу этого воина.',
          body: `Только модель Phobos. Один раз за ход, когда ваш оппонент нацеливает [gloss:stratagem:стратагему] на юнит своей армии [gloss:within:в пределах] 12" от этой модели, вы можете использовать эту способность. Если вы это делаете, увеличьте стоимость того применения той стратагемы на 1 CP.`,
        },
        {
          flavor: 'Этот боевой охотник скользит по вражеской территории, словно призрак, ведя своих воинов в дерзких операциях в тылу врага.',
          body: `Только модель Adeptus Astartes Infantry. Пока [gloss:bearer:носитель] [gloss:lead:возглавляет] юнит, модели того юнита имеют способность [gloss:infiltrators:Infiltrators].`,
        },
      ],
    },

    // ─────────────── 1st Company Task Force ───────────────
    {
      rule: {
        flavor:
          'Ветераны 1-й роты сражались в авангарде войн своего ордена на протяжении многих смертных жизней. Опыт научил их распознавать смертоносные угрозы врага и вести своих боевых братьев к их истреблению.',
        body: `Один раз за битву, в вашей фазе командования, вы можете использовать эту способность. Если вы это делаете, до начала вашей следующей фазы командования каждый раз, когда модель вашей армии со способностью Oath of Moment совершает атаку по [gloss:sm-oath-of-moment:вашей цели Oath of Moment], вы можете [gloss:re-roll:перебросить] также и [gloss:wound-roll:бросок на ранение].`,
      },
      stratagems: [
        armourOfContempt,
        {
          flavor: 'Когда бой достигает наивысшего накала, воины-ветераны ордена по-настоящему показывают свою доблесть.',
          when: 'Ваша фаза стрельбы или фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad или Vanguard Veteran Squad вашей армии, который ещё не был [gloss:selected-to-shoot:выбран для стрельбы] или ближнего боя в этой фазе.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита совершает атаку, добавьте 1 к [gloss:hit-roll:броску на попадание]. Если ваш юнит [gloss:half-strength:ниже половинной численности], добавьте также 1 к [gloss:wound-roll:броску на ранение].',
          restrictions: '',
        },
        {
          flavor: 'Ветераны 1-й роты применяют своё мастерство с эффективностью, наблюдать которую мучительно.',
          when: 'Ваша фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad или Vanguard Veteran Squad вашей армии, который совершил [gloss:charge-move:манёвр нападения] в этом ходу и [gloss:destroyed:уничтожил] один или более вражеских юнитов в этой фазе.',
          effect: 'В следующей фазе командования вашего оппонента каждый вражеский юнит [gloss:within:в пределах] 6" от вашего юнита должен пройти [gloss:battle-shock-test:тест на боевой шок]. Если юнит, проходящий этот тест, [gloss:half-strength:ниже половинной численности], вычтите 1 из того теста. Вражеские юниты, затронутые этой стратагемой, не обязаны проходить какие-либо другие тесты на боевой шок в той же фазе.',
          restrictions: '',
        },
        {
          flavor: 'Ветераны Adeptus Astartes захватывают критически важные цели дерзкими ударами, уничтожая сопротивление во имя своего ордена, прежде чем устремиться к следующей цели.',
          when: 'Ваша фаза движения.',
          target: 'Один юнит Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad или Vanguard Veteran Squad вашей армии в дистанции до контролируемого вами [gloss:objective-marker:маркера цели].',
          effect: 'Этот маркер цели остаётся под вашим контролем, даже если у вас нет моделей в дистанции до него, пока ваш оппонент не будет контролировать его в начале или конце любого хода.',
          restrictions: '',
        },
        {
          flavor: 'Телепортариумные камеры на орбитальных ударных крейсерах способны выполнять телепортацию боевых братьев в терминаторской броне прямо в гущу боя в критической ситуации.',
          when: 'Конец фазы ближнего боя вашего оппонента.',
          target: 'Один юнит Adeptus Astartes Terminator вашей армии.',
          effect: 'Уберите ваш юнит с поля боя и поместите его в [gloss:strategic-reserves:стратегические резервы]. Он вернётся на поле боя в шаге [gloss:reinforcements:подкреплений] вашей следующей фазы движения, используя способность Deep Strike.',
          restrictions: 'Вы не можете выбрать юнит, находящийся в [gloss:engagement-range:радиусе связывания] с одним или более вражескими юнитами.',
        },
        {
          flavor: 'Множество легендарных преданий повествует о том, как 1-я рота удерживала позиции вопреки всему, выдерживая атаки, что смели бы менее стойких воинов.',
          when: 'Фаза нападения вашего оппонента, сразу после того как вражеский юнит завершил [gloss:charge-move:манёвр нападения].',
          target: 'Один юнит Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad или Vanguard Veteran Squad вашей армии в [gloss:engagement-range:радиусе связывания] с тем вражеским юнитом.',
          effect: 'До конца хода каждый раз, когда модели вашего юнита распределяется атака, вычтите 1 из характеристики урона той атаки.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'Этот герой и ведомые им ветераны рубят врагов, словно жнущий вихрь.',
          body: `Только модель Adeptus Astartes. Добавьте 1 к характеристике атак [gloss:melee-weapons:оружия ближнего боя] [gloss:bearer:носителя]. Один раз за битву, в начале любой фазы, носитель может использовать это [gloss:enhancement:улучшение]. Если он это делает, до конца фазы добавьте 1 к характеристике атак оружия ближнего боя всех прочих моделей юнита носителя.`,
        },
        {
          flavor: 'Этот воин олицетворяет гнев Императора.',
          body: `Только модель Adeptus Astartes. Пока вражеский юнит (исключая Monsters и Vehicles) [gloss:within:в пределах] 6" от [gloss:bearer:носителя], каждый раз, когда тот юнит проваливает [gloss:battle-shock-test:тест на боевой шок], одна модель того юнита [gloss:destroyed:уничтожается] (выбирается [gloss:controlling-player:контролирующим её игроком]). Один раз за битву, когда такой вражеский юнит проваливает тест на боевой шок, вы можете выбрать, чтобы вместо этого таким образом были уничтожены D3 моделей того юнита.`,
        },
        {
          flavor: 'Командиры 1-й роты клянутся перед орденом и Императором обеспечить победу.',
          body: `Только модель Adeptus Astartes Terminator. Улучшите характеристику [gloss:objective-control:контроля над целью] [gloss:bearer:носителя] на 1. Один раз за битву, в начале любой фазы, носитель может использовать это [gloss:enhancement:улучшение]. Если он это делает, до конца фазы добавьте 1 к характеристике контроля над целью всех прочих моделей юнита носителя.`,
        },
        {
          flavor: 'Этот герой не замечает даже чудовищных ран.',
          body: `Только модель Adeptus Astartes Terminator. [gloss:bearer:Носитель] имеет способность Feel No Pain 5+. Один раз за битву, после того как юнит носителя выбран целью одной или более атак, носитель может использовать это [gloss:enhancement:улучшение]. Если он это делает, до конца фазы модели юнита носителя имеют способность Feel No Pain 5+.`,
        },
      ],
    },

    // ─────────────── Fulguris Task Force ───────────────
    {
      rule: {
        flavor:
          'С воющими двигателями и порывами антигравитационных сил массированные боевые скиммеры ордена врываются в самую гущу битвы с полыхающими орудиями.',
        body: `▪ [gloss:friendly:Дружественные] юниты Land Speeder/Storm Speeder Hailstrike/Storm Speeder Hammerstrike/Storm Speeder Thunderstrike имеют Speeder.
▪ В вашей первой фазе движения дружественные юниты Speeder могут совершить [gloss:ingress-move:манёвр прибытия].`,
      },
      stratagems: [
        {
          flavor: 'Экипажи скиммеров обучены использовать разведывательные ауспики своего аппарата в связке с его оружием, чтобы поражать внезапно обнаруженных врагов.',
          when: 'Ваша фаза стрельбы, когда [gloss:friendly:дружественный] юнит Speeder [gloss:selected-to-shoot:выбран для стрельбы].',
          target: 'Тот юнит Speeder.',
          effect: 'Выберите один вражеский юнит [gloss:within:в пределах] 24" от вашего юнита. Тот вражеский юнит имеет +6" к [gloss:detection-range:дальности обнаружения], пока ваш юнит не отстреляется.',
          restrictions: '',
        },
        {
          flavor: 'Запуская внезапные потоки энергии к двигателям и манёвровым плоскостям, можно оставить агрессивные наступления врага барахтаться в кильватере скиммера.',
          when: 'Фаза движения вашего оппонента, когда вражеский юнит завершает манёвр [gloss:within:в пределах] 8" от [gloss:friendly:дружественного] [gloss:unengaged:несвязанного боем] юнита Speeder.',
          target: 'Тот юнит Speeder.',
          effect: 'Ваш юнит может совершить [gloss:normal-move:обычный манёвр] до D3+3".',
          restrictions: '',
        },
        {
          flavor: 'Антигравитационные пластины этого боевого скиммера гудят от избыточной мощности, поднимая аппарат в атмосферу, откуда он может передислоцироваться.',
          when: 'Конец фазы ближнего боя вашего оппонента.',
          target: 'Один [gloss:friendly:дружественный] [gloss:unengaged:несвязанный боем] юнит Speeder.',
          effect: 'Поместите ваш юнит в [gloss:strategic-reserves:стратегические резервы].',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'По мольбам ветеранов-канониров мощное оружие этого скиммера обрушивает ярость своих духов вспышками испепеляющего разрушения.',
          body: `Только юнит Speeder. Этот юнит может [gloss:re-roll:перебрасывать] [gloss:damage-roll:броски урона] и броски для определения характеристики атак оружия.`,
        },
        {
          flavor: 'Точные огневые решения, сплетённые руническим шрифтом логическим движком этой машины, говорят о её хищнических инстинктах.',
          body: `Только юнит Speeder. [gloss:ranged-attacks:Атаки дальнего боя] этого юнита имеют [IGNORES COVER].`,
        },
      ],
    },

    // ─────────────── Librarius Conclave ───────────────
    {
      rule: {
        flavor:
          'Библиарии проводят жизни, овладевая псионическими дисциплинами, учась управлять энергиями Имматериума, чтобы сбивать с толку врагов и вдохновлять своих боевых братьев.',
        body: `В начале [gloss:battle-round:раунда боя] выберите одну из следующих способностей [gloss:sm-psychic-discipline:Psychic Disciplines]. [gloss:friendly:Дружественные] юниты Adeptus Astartes [gloss:psyker:Psyker] имеют эту способность до конца раунда боя.
▪ Biomancy Discipline: Этот юнит имеет +2" M.
▪ Divination Discipline: Атаки этого юнита могут [gloss:re-roll:перебрасывать] [gloss:hit-roll:броски на попадание] 1 и [gloss:wound-roll:броски на ранение] 1.
▪ Pyromancy Discipline: [gloss:ranged-attacks:Атаки дальнего боя] этого юнита по вражескому юниту [gloss:within:в пределах] 12" от этого юнита имеют +1 AP.
▪ Telekinesis Discipline: Атаки дальнего боя по этому юниту имеют -1 к [gloss:strength:Силе].
▪ Telepathy Discipline: Атаки этого юнита могут игнорировать [gloss:modifier:модификаторы] [gloss:ballistic-skill:баллистического навыка (BS)], [gloss:weapon-skill:навыка боя (WS)] и бросков на попадание.`,
      },
      enhancements: [
        {
          flavor: 'Силы Имматериума текут сквозь псайкера, обостряя его скорость и скорость его боевых братьев.',
          body: `Только модель Adeptus Astartes [gloss:psyker:Psyker]. Когда этот юнит выбран для совершения [gloss:advance-move:манёвра продвижения], тот манёвр не мешает этому юниту [gloss:eligible-to-charge:иметь право объявлять нападение]. Когда этот юнит выбран для совершения [gloss:fall-back-move:манёвра отступления], если этот юнит имеет способность Biomancy [gloss:sm-psychic-discipline:Discipline], тот манёвр не мешает этому юниту иметь право объявлять нападение.`,
        },
        {
          flavor: 'Те, кто специализируется на прогностике, могут предвидеть ход битвы и располагать союзников соответственно.',
          body: `Только модель Adeptus Astartes [gloss:psyker:Psyker] (исключая модели Terminator). Один раз за ход на юнит, в фазе движения вашего оппонента, когда вражеский юнит завершает манёвр [gloss:within:в пределах] 8" от этого юнита, если этот юнит [gloss:unengaged:несвязан боем], этот юнит может совершить [gloss:normal-move:обычный манёвр] до D6" или, если этот юнит имеет способность Divination [gloss:sm-psychic-discipline:Discipline], до 6".`,
        },
        {
          flavor: 'Управляя разумами врагов, практикующие телепатию могут скрыть своё присутствие.',
          body: `Только модель Adeptus Astartes [gloss:psyker:Psyker]. Вражеские юниты не могут выбирать этот юнит целью атак [gloss:snap-shooting:snap shooting]. Если этот юнит имеет способность Telepathy [gloss:sm-psychic-discipline:Discipline], этот юнит имеет -3" к [gloss:detection-range:дальности обнаружения].`,
        },
        {
          flavor: 'Сворачивая существование вокруг невидимого пути, вдоль которого искажается время, библиарий переносит своих союзников по полю боя со сверхъестественной быстротой.',
          body: `Только модель Adeptus Astartes [gloss:psyker:Psyker]. В конце фазы ближнего боя вашего оппонента вы можете поместить этот юнит в [gloss:strategic-reserves:стратегические резервы]. Если этот юнит имеет способность Telekinesis [gloss:sm-psychic-discipline:Discipline], этот юнит имеет Deep Strike.`,
        },
        {
          flavor: 'Библиарий окутывает боеприпасы своих союзников разъедающими броню ореолами лазурного огня.',
          body: `Только модель Adeptus Astartes [gloss:psyker:Psyker]. [gloss:ranged-attacks:Атаки дальнего боя] этого юнита имеют [ANTI-MONSTER/VEHICLE 5+]. Если этот юнит имеет способность Pyromancy [gloss:sm-psychic-discipline:Discipline] — [SUSTAINED HITS 1].`,
        },
      ],
    },

    // ─────────────── Subversion Assets ───────────────
    {
      rule: {
        flavor:
          'Обладая трансчеловеческими инстинктами, авточувствами и более специализированным снаряжением, мастера тайной войны ордена способны разоблачить врага, оставляя его созревшим для быстрого истребления.',
        body: `[gloss:friendly:Дружественные] юниты Phobos/Scout Squad имеют следующую способность:
▪ Transhuman Perception: В вашей фазе стрельбы этот юнит может выбрать один [gloss:visible:видимый] вражеский юнит [gloss:within:в пределах] 12". Тот вражеский юнит обнаружен. Пока юнит обнаружен, он имеет +3" к [gloss:detection-range:дальности обнаружения].`,
      },
      stratagems: [
        {
          flavor: 'Воины, действующие вдали от подкреплений ордена, сохраняют смертоносный огонь даже во время выполнения жизненно важных стратегических операций.',
          when: 'Ваша фаза стрельбы, когда [gloss:friendly:дружественный] юнит Phobos/Scout Squad начинает [gloss:action:действие].',
          target: 'Тот юнит Phobos/Scout Squad.',
          effect: 'Это действие не мешает вашему юниту [gloss:eligible-to-shoot:иметь право стрелять].',
          restrictions: '',
        },
        {
          flavor: 'Держась теней и тщательно выбирая жертв, скрытные воины прореживают вражеские ряды, ни разу не выдав своих позиций.',
          when: 'Ваша фаза стрельбы, когда [gloss:friendly:дружественный] юнит Phobos/Scout Squad отстрелялся.',
          target: 'Тот юнит Phobos/Scout Squad.',
          effect: 'Эти [gloss:ranged-attacks:атаки дальнего боя] не мешают вашему юниту оставаться [gloss:hidden:скрытым].',
          restrictions: '',
        },
        {
          flavor: 'Когда они неподвижны, безмолвны и вдобавок укрыты камелеолиновыми материалами или дрейфующим дымом, передовые агенты ордена почти невозможно заметить, пока не станет слишком поздно.',
          when: 'Начало фазы движения вашего оппонента.',
          target: 'Один [gloss:friendly:дружественный] [gloss:unengaged:несвязанный боем] юнит Phobos/Scout Squad.',
          effect: 'Ваш юнит имеет -3" к [gloss:detection-range:дальности обнаружения] до конца хода.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'Этот маскирующий полевой проектор использует хамелеоническое искажение излучений, секреты которого техножрецам не воспроизвести.',
          body: `Только модель Phobos. Эта модель имеет [gloss:lone-operative:Lone Operative] и Stealth.`,
        },
        {
          flavor: 'Убить скрытого врага там, где он таится, где его гибель проходит незамеченной и незапомненной, — значит лишить его ненавистную жизнь смысла.',
          body: `Только юнит Infantry Phobos. Атаки этого юнита по [gloss:hidden:скрытому] юниту имеют +1 к [gloss:hit-roll:броскам на попадание].`,
        },
      ],
    },

    // ─────────────── Armoured Speartip ───────────────
    {
      rule: {
        flavor:
          'Land Raider, Repulsor и другие бронированные транспорты стремглав врываются в сердце вражеских построений, выдерживая тяжёлый огонь, чтобы доставить в бой свой груз элитных космодесантников.',
        body: `Каждый раз, когда юнит Adeptus Astartes вашей армии [gloss:disembark:высаживается] из [gloss:transport:Transport] (исключая Fly), который совершил [gloss:normal-move:обычный манёвр] или [gloss:advance-move:продвижение] в этой фазе (исключая те, что прибыли из [gloss:strategic-reserves:стратегических резервов]), тот высадившийся юнит может совершить обычный манёвр до D6" или вместо этого обычный манёвр до D3+3", если тот Transport — Heavy Transport (см. ниже).

### Keywords | Ключевые слова
Юниты Adeptus Astartes Transport вашей армии (исключая Fly) с характеристикой [gloss:wounds:ран] 14+ имеют [gloss:keywords:ключевое слово] Heavy Transport.`,
      },
      stratagems: [
        armourOfContempt,
        {
          flavor: 'В последнем акте мести обречённый экипаж этого горящего транспорта врезается в самую гущу врага.',
          when: 'Любая фаза, сразу после того как юнит Heavy Transport вашей армии со способностью Deadly Demise [gloss:destroyed:уничтожен].',
          target: 'Тот юнит Heavy Transport, если вы выбросили 6 для его способности Deadly Demise. Вы можете использовать эту стратагему на том юните, даже несмотря на то что он только что был уничтожен.',
          effect: 'Ваш юнит может совершить [gloss:normal-move:обычный манёвр] или [gloss:fall-back-move:манёвр отступления], прежде чем разрешится его способность Deadly Demise и прежде чем какие-либо [gloss:embarked:погруженные] юниты выполнят [gloss:emergency-disembark-move:экстренную высадку]. Совершая этот манёвр, ваш юнит может двигаться сквозь вражеские модели (исключая Monsters и Vehicles) и может двигаться в [gloss:engagement-range:радиусе связывания] с такими моделями, но не может завершить тот манёвр в радиусе связывания с ними, и любой тест [gloss:desperate-escape:Desperate Escape] автоматически считается пройденным.',
          restrictions: '',
        },
        {
          flavor: 'Со стальной дисциплиной боевые братья космодесанта стремительно грузятся на борт, даже когда враг приближается.',
          when: 'Конец фазы ближнего боя.',
          target: 'Один юнит Adeptus Astartes Infantry вашей армии, не находящийся в [gloss:engagement-range:радиусе связывания] с одним или более вражескими юнитами, и один [gloss:friendly:дружественный] Heavy Transport, в который он способен погрузиться.',
          effect: 'Если ваш юнит Adeptus Astartes Infantry [gloss:wholly-within:целиком в пределах] 6" от того Heavy Transport, он может [gloss:embark:погрузиться] в него.',
          restrictions: '',
        },
        {
          flavor: 'Могущественнейшие транспорты космодесанта неудержимы на ходу.',
          when: 'Ваша фаза движения.',
          target: 'Один юнит Adeptus Astartes Transport вашей армии, который ещё не был [gloss:selected-to-move:выбран для движения] в этой фазе.',
          effect: 'До конца фазы каждый раз, когда ваш юнит совершает [gloss:normal-move:обычный манёвр] или [gloss:advance-move:продвижение], он может двигаться горизонтально сквозь [gloss:terrain-feature:элементы ландшафта]. Кроме того, если ваш юнит — Heavy Transport, совершая этот манёвр, ваш юнит может двигаться сквозь вражеские модели (исключая Monsters и Vehicles) и может двигаться в [gloss:engagement-range:радиусе связывания] с такими моделями, но не может завершить тот манёвр в радиусе связывания с ними, и любой тест [gloss:desperate-escape:Desperate Escape] автоматически считается пройденным.',
          restrictions: '',
        },
        {
          flavor: 'Выжимая максимум из ревущих двигателей, экипажи транспортов стремятся высадить своих пассажиров как можно ближе к назначенным целям.',
          when: 'Ваша фаза движения.',
          target: 'Один юнит Adeptus Astartes Transport вашей армии, который ещё не был [gloss:selected-to-move:выбран для движения] в этой фазе.',
          effect: 'До конца фазы юниты могут [gloss:disembark:высаживаться] из вашего Transport после того, как он [gloss:advance:продвинулся]. Юниты, которые так делают, считаются совершившими [gloss:normal-move:обычный манёвр] в этой фазе и не могут [gloss:declare-charge:объявлять нападение] в том же ходу (если только ваш Transport не имеет способность Assault Ramp), но в остальном могут действовать как обычно.',
          restrictions: '',
        },
        {
          flavor: 'Выходя из своих транспортов, пехота космодесанта безжалостно зачищает вражеские позиции.',
          when: 'Ваша фаза стрельбы.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был [gloss:selected-to-shoot:выбран для стрельбы] в этой фазе.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита совершает атаку, добавьте 1 к [gloss:hit-roll:броску на попадание] (если ваш юнит [gloss:disembark:высадился] из Heavy Transport в этом ходу, добавьте также 1 к [gloss:wound-roll:броску на ранение]).',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'Этот ветеран-командир механизированной пехоты использует её манёвренность, чтобы заманить врага в ловушку.',
          body: `Только модель Adeptus Astartes. Один раз за ход, в вашей фазе движения, [gloss:bearer:носитель] может использовать это [gloss:enhancement:улучшение]. Если он это делает, выберите один [gloss:friendly:дружественный] Adeptus Astartes Transport, находящийся в [gloss:strategic-reserves:стратегических резервах]. До конца фазы для целей выставления того Transport на поле боя считайте номер текущего [gloss:battle-round:раунда боя] на единицу выше, чем он есть на самом деле.`,
        },
        {
          flavor: 'Неустрашимый завоеватель и освободитель миров, этот грозный чемпион вселяет уверенность в своих боевых братьев и жалкий страх во врага.',
          body: `Только модель Adeptus Astartes. Если вы контролируете [gloss:objective-marker:маркер цели] в конце вашей фазы командования и юнит [gloss:bearer:носителя] (или любой Heavy Transport, в который он [gloss:embarked:погружен]) в дистанции до того маркера цели, тот маркер цели остаётся под вашим контролем, пока [gloss:level-of-control:уровень контроля] вашего оппонента над тем маркером цели не станет больше вашего в конце фазы.`,
        },
        {
          flavor: 'С аппарелей бронированных транспортов элитная пехота стремительно высаживается, обрушивая огонь на ошеломлённых врагов.',
          body: `Только модель Adeptus Astartes Terminator или Gravis. В вашей фазе стрельбы каждый раз, когда юнит [gloss:bearer:носителя] [gloss:selected-to-shoot:выбран для стрельбы], если он [gloss:disembark:высадился] из [gloss:transport:Transport] в этом ходу, до конца фазы [gloss:ranged-weapons:оружие дальнего боя] моделей того юнита имеет способность [SUSTAINED HITS 1].`,
        },
        {
          flavor: 'Этот агрессивный командир передовой линии знает цену скорости и решительного манёвра.',
          body: `Только модель Adeptus Astartes. Если [gloss:bearer:носитель] начинает битву [gloss:embarked:погруженным] в Transport, тот Transport имеет способность [gloss:scouts:Scouts] 6".`,
        },
      ],
    },

    // ─────────────── Headhunter Task Force ───────────────
    {
      rule: {
        flavor:
          'Экипажи космодесанта неутомимы в преследовании назначенных целей, выжимая до последней капли мощь из своих боевых машин и демонстрируя образцовую стрельбу даже под шквальным огнём.',
        body: `Каждый раз, когда юнит Tank Ace вашей армии (см. ниже) [gloss:advance:продвигается], не совершайте для него [gloss:advance-roll:бросок продвижения]. Вместо этого до конца фазы добавьте 6" к [gloss:move-characteristic:характеристике движения] моделей того юнита.

Каждый раз, когда юнит Tank Ace вашей армии стреляет в вашей фазе стрельбы, если тот юнит не продвигался в этом ходу, вы можете [gloss:re-roll:перебросить] [gloss:damage-roll:бросок урона].

### Keywords | Ключевые слова
Юниты Adeptus Astartes Vehicle вашей армии (исключая Fortifications, Drop Pods, Walkers и юниты, которые могут Fly) имеют [gloss:keywords:ключевое слово] Tank Ace. На шаге [gloss:muster-armies:Muster Armies] вы можете выбрать до трёх юнитов Tank Ace вашей армии, чтобы они получили ключевое слово Character.`,
      },
      stratagems: [
        armourOfContempt,
        {
          flavor: 'Целясь в уязвимые сочленения или стыки между бронеплитами, канониры космодесанта повышают эффективность своего оружия.',
          when: 'Ваша фаза стрельбы.',
          target: 'Один юнит Tank Ace вашей армии, который ещё не был [gloss:selected-to-shoot:выбран для стрельбы] в этой фазе.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита совершает [gloss:ranged-attacks:атаку дальнего боя] по юниту Monster или Vehicle, улучшите характеристику [gloss:armour-penetration:бронепробития (AP)] той атаки на 1.',
          restrictions: 'Юнит нельзя выбирать целью этой стратагемы и [gloss:stratagem:стратагемы] Kill Shot в одной и той же фазе.',
        },
        {
          flavor: 'Космодесантники безжалостны в добивании ослабленных врагов.',
          when: 'Ваша фаза стрельбы.',
          target: 'Один юнит Tank Ace вашей армии, который ещё не был [gloss:selected-to-shoot:выбран для стрельбы] в этой фазе.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита совершает атаку по юниту Monster или Vehicle, [gloss:re-roll:перебросьте] [gloss:wound-roll:бросок на ранение] 1. Если целевой юнит [gloss:below-starting-strength:ниже своей начальной численности], вы можете перебросить бросок на ранение целиком.',
          restrictions: 'Юнит нельзя выбирать целью этой стратагемы и [gloss:stratagem:стратагемы] Target Weak Point в одной и той же фазе.',
        },
        {
          flavor: 'Продвинутые системы наведения и мастерство трансчеловеческих канониров обеспечивают танкам космодесанта сокрушительную скорострельность, даже когда они выбираются из скопления врагов.',
          when: 'Ваша фаза стрельбы.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был [gloss:selected-to-shoot:выбран для стрельбы] в этой фазе.',
          effect: 'До конца фазы ваш юнит [gloss:eligible-to-shoot:может стрелять] в ходу, в котором он [gloss:fall-back-move:отступил].',
          restrictions: '',
        },
        {
          flavor: 'Быстро реагируя на перемещения врага, экипаж этого танка перемещает свою машину, разворачивая броню или занимая выгодную огневую позицию.',
          when: 'Фаза движения вашего оппонента, сразу после того как вражеский юнит завершил обычный манёвр, [gloss:advance-move:продвижение] или [gloss:fall-back-move:отступление].',
          target: 'Один юнит Tank Ace вашей армии (исключая юниты, содержащие одну или более моделей с характеристикой [gloss:wounds:ран] 16+) [gloss:within:в пределах] 8" от того вражеского юнита.',
          effect: 'Ваш юнит может совершить [gloss:normal-move:обычный манёвр] до D6".',
          restrictions: '',
        },
        {
          flavor: 'В высшей степени воинственный дух этой машины требует немедленной мести за причинённый ему урон.',
          when: 'Фаза стрельбы вашего оппонента, сразу после того как вражеский юнит отстрелялся.',
          target: 'Один юнит Tank Ace вашей армии (исключая юниты, содержащие одну или более моделей с характеристикой [gloss:wounds:ран] 16+), который был выбран целью одной или более атак атакующего юнита.',
          effect: 'Ваш юнит может стрелять, как если бы это была ваша фаза стрельбы, но при этом должен целиться только в тот вражеский юнит и может делать это, только если тот вражеский юнит [gloss:visible:видим] и является допустимой целью.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'Командир этого боевого танка — прославленный танковый ас, чьи подвиги стали легендой ордена.',
          body: `Только модель Adeptus Astartes Vehicle. В вашей фазе стрельбы, пока [gloss:friendly:дружественный] юнит Adeptus Astartes Vehicle [gloss:within:в пределах] 6" от [gloss:bearer:носителя], [gloss:ranged-weapons:оружие дальнего боя] моделей того юнита имеет способность [ASSAULT].`,
        },
        {
          flavor: 'Системы управления огнём этой машины включают древние, но крайне продвинутые логические движки, помогающие экипажу поддерживать исключительно высокую скорострельность.',
          body: `Только модель Adeptus Astartes Vehicle. [gloss:ranged-weapons:Оружие дальнего боя] [gloss:bearer:носителя] имеет способность [SUSTAINED HITS 1].`,
        },
        {
          flavor: 'Экипаж этой боевой машины демонстрирует образцовую стрельбу и заслужил высшие почести за своё мастерство.',
          body: `Только модель Adeptus Astartes Vehicle. Один раз за фазу вы можете [gloss:re-roll:перебросить] один [gloss:hit-roll:бросок на попадание], один [gloss:wound-roll:бросок на ранение] и один [gloss:damage-roll:бросок урона] для [gloss:bearer:носителя].`,
        },
        {
          flavor: 'Эта древняя боевая машина выдержала тысячелетия сражений, и её воинственный дух машины лишь стал более непреклонным.',
          body: `Только модель Adeptus Astartes Vehicle. [gloss:bearer:Носитель] имеет [gloss:invulnerable-save:неуязвимый спас-бросок] 5+ и в конце вашей фазы командования восстанавливает 1 потерянную [gloss:wounds:рану].`,
        },
      ],
    },

    // ─────────────── Ceramite Sentinels ───────────────
    {
      rule: {
        flavor:
          'Эти космодесантники — мастера боя из наскоро подготовленных оборонительных позиций. Они способны раскрыть потенциал почти любого ландшафта как импровизированного опорного пункта, карая каждую попытку врага наступать и выбить их.',
        body: `Каждый раз, когда модель Adeptus Astartes вашей армии совершает атаку, если юнит той модели находится в элементе ландшафта, перебросьте бросок на попадание 1 и бросок на ранение 1.

Юниты Adeptus Astartes вашей армии получают ключевое слово Entrenched, пока верно всё следующее:
▪ Тот юнит находится в элементе ландшафта.
▪ Тот юнит не был выставлен на поле боя в этом ходу.
▪ Ни одна модель того юнита не двигалась более чем на 3" в этом ходу.`,
      },
      stratagems: [
        armourOfContempt,
        {
          flavor: 'Зная, что этот стратегически важный участок должен быть удержан, чтобы оборонительные рубежи выстояли, космодесантники стоят несокрушимо перед лицом врага.',
          when: 'Командная фаза.',
          target: 'Один юнит Adeptus Astartes вашей армии в радиусе связывания с одним или более вражескими юнитами.',
          effect: 'До начала вашей следующей фазы командования добавьте 1 к характеристикам контроля над целью моделей вашего юнита.',
          restrictions: '',
        },
        {
          flavor: 'Устранение ключевых вражеских активов критически важно, чтобы застопорить, а затем обратить вспять натиск врага.',
          when: 'Ваша фаза стрельбы или фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes Infantry или Adeptus Astartes Mounted вашей армии, который ещё не был выбран для стрельбы или ближнего боя в этой фазе.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита совершает атаку по юниту Character, Monster или Vehicle, вы можете перебросить бросок на ранение.',
          restrictions: '',
        },
        {
          flavor: 'Осознавая, насколько жизненно важно удержать оборонительный рубеж, эти воины сражаются до последнего вздоха.',
          when: 'Фаза ближнего боя, сразу после того как вражеский юнит выбрал цели.',
          target: 'Один юнит Adeptus Astartes вашей армии, который был выбран целью одной или более атак атакующего юнита.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита уничтожается, если та модель ещё не сражалась в этой фазе, бросьте один D6, прибавляя 1 к результату, если это юнит Entrenched: на 4+ не убирайте её из игры. Та уничтоженная модель может сражаться после того, как атакующий юнит завершит свои атаки, и затем убирается из игры.',
          restrictions: '',
        },
        {
          flavor: 'Подпрограммы авточувственного наведения, специально адаптированные для оборонительных огневых схем, помогают этим воинам целиться.',
          when: 'Ваша фаза стрельбы.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был выбран для стрельбы в этой фазе.',
          effect: 'Выберите способность [SUSTAINED HITS 1] или [LETHAL HITS]. До конца фазы оружие дальнего боя моделей вашего юнита имеет выбранную способность. Если ваш юнит — Entrenched, до конца фазы оружие дальнего боя моделей вашего юнита вместо этого имеет способности [SUSTAINED HITS 1] и [LETHAL HITS].',
          restrictions: '',
        },
        {
          flavor: 'Доктрина Codex при ведении агрессивной обороны — быстро занимать новые позиции всякий раз, когда враг пристреливается по вам.',
          when: 'Фаза стрельбы вашего оппонента, сразу после того как вражеский юнит отстрелялся.',
          target: 'Один юнит Adeptus Astartes Infantry или Adeptus Astartes Mounted вашей армии, который был выбран целью одной или более атак атакующего юнита.',
          effect: 'Ваш юнит может совершить обычный манёвр до D6". Если ваш юнит — Entrenched, вы можете перебросить D6 для определения того, как далеко может двигаться ваш юнит.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'Эта уникальная вокс-и-ауспик-аугметика предоставляет носителю непревзойдённые тактические данные, жизненно важные для координации агрессивной обороны в бою.',
          body: `Только модель Adeptus Astartes. Каждый раз, когда юнит носителя совершает манёвр отступления, выберите одно из следующего, что применяется к тому юниту до конца хода: тот юнит может выполнять действие в ходу, в котором он отступил; или тот юнит может стрелять и объявлять нападение в ходу, в котором он отступил.`,
        },
        {
          flavor: 'Немногие офицеры ордена могут сравниться с этим командиром в таланте к хитрым оборонительным расстановкам войск.',
          body: `Только модель Adeptus Astartes. После того как оба игрока развернули свои армии, выберите до трёх юнитов Adeptus Astartes вашей армии и передислоцируйте их. При этом вы можете выставить эти юниты в стратегические резервы, независимо от того, сколько юнитов уже находится в стратегических резервах.`,
        },
        {
          flavor: 'Этот редкий знак чести чествует воина, который отказывается сдаваться даже перед лицом, казалось бы, неминуемой смерти.',
          body: `Только модель Gravis. Когда носитель уничтожается впервые, бросьте один D6 в конце фазы. На 2+ верните носителя на поле боя как можно ближе к месту, где он был уничтожен, и не в радиусе связывания с какими-либо вражескими юнитами, с полным запасом ран.`,
        },
        {
          flavor: 'К этому устройству привязаны несколько сработанных артифайсерами и плотно скрытых сервочерепов, чьи объединённые визуальные потоки делают носителя почти невозможным для ускользания.',
          body: `Только модель Adeptus Astartes. Оружие дальнего боя моделей юнита носителя имеет способность [IGNORES COVER].`,
        },
      ],
    },

    // ─────────────── Blade of Ultramar ───────────────
    {
      rule: {
        flavor:
          'Марней Калгар применяет полную и тонкую мудрость Codex Astartes так же легко и инстинктивно, как делает вдох.',
        body: `В начале не более чем трёх ваших командных фаз вы можете выбрать одну из перечисленных ниже Combat Doctrines. До начала вашей следующей фазы командования эта Combat Doctrine активна, и её эффекты применяются ко всем юнитам Adeptus Astartes вашей армии. Вы не можете выбрать Combat Doctrine, которую уже выбирали в этой битве, если только на поле боя нет дружественной модели Marneus Calgar.

### Devastator Doctrine | Опустошительная доктрина
Этот юнит может стрелять в ходу, в котором он продвигался.

### Tactical Doctrine | Тактическая доктрина
Этот юнит может стрелять и объявлять нападение в ходу, в котором он отступил.

### Assault Doctrine | Штурмовая доктрина
Этот юнит может объявлять нападение в ходу, в котором он продвигался.

Ограничения: в вашу армию могут входить юниты Ultramarines, но в неё не могут входить какие-либо юниты Adeptus Astartes из любого другого ордена.`,
      },
      stratagems: [
        armourOfContempt,
        {
          flavor: 'Заранее предсказав и учтя контрмеры и реакции врага, Ультрамарины способны выдержать их самые свирепые атаки.',
          when: 'Фаза стрельбы или фаза ближнего боя вашего оппонента, сразу после того как вражеский юнит выбрал цели.',
          target: 'Один юнит Adeptus Astartes вашей армии, который был выбран целью одной или более атак атакующего юнита.',
          effect: 'До конца фазы каждый раз, когда атака нацелена на ваш юнит, если характеристика Силы той атаки больше или равна характеристике Стойкости того юнита, вычтите 1 из броска на ранение.',
          restrictions: '',
        },
        {
          flavor: 'Ревя свой знаменитый боевой клич, Ультрамарины бросаются в бой, стремясь тем упорнее одержать верх под неотступным взором своего магистра ордена.',
          when: 'Фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes вашей армии.',
          effect: 'До конца фазы оружие ближнего боя моделей вашего юнита имеет способность [LANCE]. Если ваш юнит находится под эффектом Assault Doctrine, до конца фазы также улучшите характеристику бронепробития (AP) такого оружия на 1.',
          restrictions: '',
        },
        {
          flavor: 'Воины ни одного ордена не знают лучше широту — теоретическую и практическую — учений Codex Astartes и то, как их можно и должно адаптировать ради победы.',
          when: 'Ваша фаза командования.',
          target: 'Один юнит Adeptus Astartes вашей армии.',
          effect: 'Выберите Devastator Doctrine, Tactical Doctrine или Assault Doctrine. До начала вашей следующей фазы командования эта Combat Doctrine активна для вашего юнита вместо любой другой Combat Doctrine, активной для вашей армии, даже если вы уже выбирали эту Combat Doctrine в этой битве.',
          restrictions: '',
        },
        {
          flavor: 'Долго Ультрамарины охраняли и Ультрамар, и весь Империум. Ни один враг не укроется от их мстительного взора и не ускользнёт от досягаемости их гнева.',
          when: 'Ваша фаза стрельбы.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был выбран для стрельбы в этой фазе.',
          effect: 'До конца фазы оружие дальнего боя моделей вашего юнита имеет способность [IGNORES COVER]. Если ваш юнит находится под эффектом Devastator Doctrine, до конца фазы также улучшите характеристику бронепробития (AP) такого оружия на 1.',
          restrictions: '',
        },
        {
          flavor: 'Быстро проведя теоретическую оценку вероятных следующих ходов врагов, Ультрамарины применяют практическое перемещение, чтобы им противодействовать.',
          when: 'Фаза движения вашего оппонента, сразу после того как вражеский юнит завершил обычный манёвр, продвижение или отступление.',
          target: 'Один юнит Adeptus Astartes Infantry или Adeptus Astartes Mounted вашей армии, не находящийся в радиусе связывания с одним или более вражескими юнитами и в пределах 8" от вражеского юнита, который только что завершил тот манёвр.',
          effect: 'Ваш юнит может совершить обычный манёвр до D6" или, если он находится под эффектом Tactical Doctrine, вместо этого обычный манёвр до 6".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'Изначально носимый прославленным капитаном Первой роты Ультрамаринов, этот артифайсерский доспех дарует сам магистр ордена достойному носителю.',
          body: `Только модель Adeptus Astartes. Носитель имеет характеристику спас-броска 2+ и способность Feel No Pain 5+.`,
        },
        {
          flavor: 'Среди самых торжественных и связывающих клятв, что может принести Ультрамарин, — это редкая честь вступить в битву с этими словами, прикреплёнными к доспеху.',
          body: `Только модель Adeptus Astartes. Добавьте 1 к характеристикам атак и Силы оружия ближнего боя носителя. Пока носитель находится под эффектом Assault Doctrine, вместо этого добавьте 2 к характеристикам атак и Силы оружия ближнего боя носителя.`,
        },
        {
          flavor: 'Этот одарённый офицер сосредоточился на одном аспекте Codex Astartes и намерен овладеть каждой его гранью, прежде чем перейти к следующей.',
          body: `Только модель Adeptus Astartes. В начале вашей фазы командования, если носитель на поле боя, он может использовать это улучшение. Если он это делает, до начала вашей следующей фазы командования Tactical Doctrine активна для этого юнита (вместо любой другой Combat Doctrine, которую вы выбираете активной для вашей армии, и даже если для вашей армии нет активной Combat Doctrine).`,
        },
        {
          flavor: 'Сражаясь с роями тиранидов с их первого галактического вторжения, этот ветеран-офицер хорошо знает пользу эффективной и подавляющей огневой мощи.',
          body: `Только модель Adeptus Astartes. Пока носитель возглавляет юнит, оружие дальнего боя моделей того юнита имеет способность [SUSTAINED HITS 1]. Кроме того, пока юнит носителя находится под эффектом Devastator Doctrine, вы можете перебрасывать броски продвижения, сделанные для того юнита.`,
        },
      ],
    },

    // ─────────────── Hammer of Avernii ───────────────
    {
      rule: {
        flavor:
          'Изрядно усиленные аугметикой и опирающиеся на груз многих лет боевого опыта, воины-ветераны клан-роты Avernii безжалостно выбирают и уничтожают свои цели.',
        body: `Каждый раз, когда модель вашей армии со способностью Oath of Moment совершает атаку по вашей цели Oath of Moment, вы можете перебросить бросок на ранение 1.

### Recalculating | Перерасчёт
Caanok Var следит, чтобы каждый болт-снаряд был направлен туда, где он послужит наибольшей цели. Один раз за раунд боя, после того как ваша цель Oath of Moment уничтожена, если модель Caanok Var вашей армии на поле боя, выберите один вражеский юнит, видимый той модели. Тот вражеский юнит становится вашей целью Oath of Moment, пока вы не выберете новую.

Ограничения: в вашу армию могут входить юниты Iron Hands, но в неё не могут входить какие-либо юниты Adeptus Astartes из любого другого ордена.`,
      },
      stratagems: [
        armourOfContempt,
        {
          flavor: 'Элита Iron Hands убивает с машинной неумолимостью, и темп бойни лишь возрастает, если им есть за что мстить.',
          when: 'Ваша фаза стрельбы или фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes Dreadnought, Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad или Vanguard Veteran Squad вашей армии, который ещё не был выбран для стрельбы или ближнего боя в этой фазе.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита совершает атаку, добавьте 1 к броску на попадание. Если ваш юнит ниже стартовой численности, добавьте также 1 к броску на ранение.',
          restrictions: '',
        },
        {
          flavor: 'Ведя нескончаемые посекундные вычисления слабых мест и уязвимостей врагов, ветераны Avernii наносят каждый удар с карающей точностью.',
          when: 'Ваша фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes Dreadnought, Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad или Vanguard Veteran Squad вашей армии, который ещё не был выбран для боя в этой фазе.',
          effect: 'Выберите способность [SUSTAINED HITS 1] или [LETHAL HITS]. До конца фазы оружие ближнего боя моделей вашего юнита имеет выбранную способность.',
          restrictions: '',
        },
        {
          flavor: 'Ген-выкованная плоть, укреплённая закалённой аугметикой и адамантиевой бронёй, — воины клан-роты Avernii являют почти сверхъестественную стойкость.',
          when: 'Фаза нападения вашего оппонента, сразу после того как вражеский юнит завершил манёвр нападения.',
          target: 'Один юнит Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad или Vanguard Veteran Squad вашей армии в радиусе связывания с тем вражеским юнитом.',
          effect: 'До конца хода каждый раз, когда модели вашего юнита распределяется атака, вычтите 1 из характеристики урона той атаки.',
          restrictions: '',
        },
        {
          flavor: 'Эти сработанные на заказ сервочерепа отделяются от аугметических привязей, когда Iron Hands проходят мимо, занимая сторожевые позиции вокруг жизненно важных стратегических участков.',
          when: 'Ваша фаза движения.',
          target: 'Один юнит Adeptus Astartes Dreadnought, Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad или Vanguard Veteran Squad вашей армии в дистанции до контролируемого вами маркера цели.',
          effect: 'Тот маркер цели остаётся под вашим контролем, даже если у вас нет моделей в дистанции до него, пока ваш оппонент не будет контролировать его в конце фазы.',
          restrictions: '',
        },
        {
          flavor: 'Терминаторы выходят из боя во время затишья, поднимаются на борт воздушных транспортов и готовят свой следующий штурм.',
          when: 'Конец фазы ближнего боя вашего оппонента.',
          target: 'Один юнит Adeptus Astartes Terminator вашей армии. Вы не можете выбрать юнит, находящийся в радиусе связывания с одним или более вражескими юнитами.',
          effect: 'Уберите ваш юнит с поля боя и поместите его в стратегические резервы.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'Подкожная черепная реликвия чести, это устройство содержит стратегический орбитальный ретранслятор загрузки.',
          body: `Только модель Adeptus Astartes. Улучшите характеристику контроля над целью носителя на 1. Один раз за битву, в начале любой фазы, носитель может использовать это улучшение. Если он это делает, до конца фазы добавьте 1 к характеристике контроля над целью всех прочих моделей юнита носителя.`,
        },
        {
          flavor: 'Установленное в горжете воина, это устройство усиливает его боевые кличи в устрашающие звуковые ударные волны.',
          body: `Только модель Adeptus Astartes. Пока вражеский юнит (исключая Monsters и Vehicles) в пределах 6" от носителя, каждый раз, когда тот юнит проваливает тест на боевой шок, одна модель того юнита уничтожается (выбирается контролирующим её игроком). Один раз за битву, когда такой вражеский юнит проваливает тест на боевой шок, вы можете выбрать, чтобы вместо этого таким образом были уничтожены D3 моделей того юнита.`,
        },
        {
          flavor: 'Эта древняя аугметика наделяет носителя — а в критической ситуации даже его товарищей — яростью движущей силы.',
          body: `Только модель Adeptus Astartes. Добавьте 1 к характеристике атак оружия ближнего боя носителя. Один раз за битву, в начале любой фазы, носитель может использовать это улучшение. Если он это делает, до конца фазы добавьте 1 к характеристике атак оружия ближнего боя всех прочих моделей юнита носителя.`,
        },
        {
          flavor: 'Продвинутый автохирург, по легенде являющийся плодом трудов самого Феррус Мануса, это устройство стремительно сращивает как рассечённую плоть, так и броню.',
          body: `Только модель Adeptus Astartes Terminator. Пока носитель возглавляет юнит, в вашей фазе командования вы можете вернуть 1 уничтоженную модель Bodyguard в тот юнит.`,
        },
      ],
    },

    // ─────────────── Spearpoint Task Force ───────────────
    {
      rule: {
        flavor:
          'Белые Шрамы — мастера высокоскоростной тактики и войны «бей и беги». Они сражаются в движении и из седла, перехитряя врагов головокружительными манёврами: в один миг они растворяются, а в следующий обрушиваются с костедробящей силой.',
        body: `Юниты Adeptus Astartes вашей армии могут объявлять нападение в ходу, в котором они продвигались или отступили.

### Wrath of the First Khan | Гнев Первого Хана
Стремительный и жестокий, как бушующая буря, Субоден Хан врезается в самое сердце врага и сквозь него, словно выставленное копьё. В конце фазы ближнего боя, если юнит Suboden Khan вашей армии уничтожил один или более вражеских юнитов в этой фазе и не находится в радиусе связывания с одним или более вражескими юнитами, тот юнит может совершить обычный манёвр до 6".

Ограничения: в вашу армию могут входить юниты White Scars, но в неё не могут входить какие-либо юниты Adeptus Astartes из любого другого ордена.`,
      },
      stratagems: [
        armourOfContempt,
        {
          flavor: 'Некоторых врагов можно прикончить одним нападением. Другие требуют непрерывной свирепости, чтобы пасть. Белые Шрамы искусны в обоих способах боя.',
          when: 'Фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был выбран для боя в этой фазе.',
          effect: 'Выберите способность [LANCE] или [LETHAL HITS]. До конца фазы оружие ближнего боя моделей вашего юнита имеет выбранную способность. Если это юнит Mounted, до конца фазы оружие ближнего боя моделей вашего юнита вместо этого имеет способности [LANCE] и [LETHAL HITS].',
          restrictions: '',
        },
        {
          flavor: 'Белые Шрамы ведут свои войны в яростном темпе, и их воины искусны в стратегиях огня-и-манёвра.',
          when: 'Ваша фаза движения.',
          target: 'Один юнит Adeptus Astartes вашей армии.',
          effect: 'До конца хода ваш юнит может стрелять в ходу, в котором он продвигался или отступил.',
          restrictions: '',
        },
        {
          flavor: 'Белые Шрамы читают приливы и отливы битвы с голодной хитростью хищных птиц, реагируя на перемещения врага с исключительной быстротой.',
          when: 'Фаза движения вашего оппонента, сразу после того как вражеский юнит завершил обычный манёвр, продвижение или отступление.',
          target: 'Один юнит Adeptus Astartes Infantry или Adeptus Astartes Mounted вашей армии в пределах 8" от того вражеского юнита. Вы не можете выбрать юнит, находящийся в радиусе связывания с одним или более вражескими юнитами.',
          effect: 'Ваш юнит может совершить обычный манёвр до 6".',
          restrictions: '',
        },
        {
          flavor: 'Боевые братья ордена Белых Шрамов рождаются и растут в седле. Все они опытные пилоты и наездники и с инстинктивным мастерством лавируют сквозь летящий огонь.',
          when: 'Фаза стрельбы вашего оппонента, сразу после того как вражеский юнит выбрал цели.',
          target: 'Один юнит Adeptus Astartes Mounted или Adeptus Astartes Fly Vehicle вашей армии, который был выбран целью одной или более атак атакующего юнита.',
          effect: 'До конца фазы каждый раз, когда атака нацелена на ваш юнит, вычтите 1 из броска на попадание и вычтите 1 из броска на ранение.',
          restrictions: '',
        },
        {
          flavor: 'Наездники и пилоты уносятся прочь так же стремительно, как появляются, перегруппировываясь в подготовке к следующему штурму.',
          when: 'Конец фазы ближнего боя вашего оппонента.',
          target: 'Один юнит Adeptus Astartes Mounted или Adeptus Astartes Fly Vehicle вашей армии, не находящийся в радиусе связывания с одним или более вражескими юнитами.',
          effect: 'Уберите ваш юнит с поля боя и поместите его в стратегические резервы.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'Этот конный охотник хорошо знает важность манёвра, обхода врага с фланга и внезапной засады на ничего не подозревающих врагов с флангов и тыла.',
          body: `Только модель Adeptus Astartes Mounted. Если юнит носителя в стратегических резервах, для целей выставления того юнита на поле боя считайте номер текущего раунда боя на единицу выше, чем он есть на самом деле.`,
        },
        {
          flavor: 'Этот аугметический глаз расширяет зрительный спектр носителя, позволяя ему точно определять тепловые сигнатуры и вычислять подходящие огневые решения.',
          body: `Только модель Adeptus Astartes. Оружие дальнего боя моделей юнита носителя имеет способности [SUSTAINED HITS 1] и [IGNORES COVER].`,
        },
        {
          flavor: 'Десятилетия службы в Первой роте Белых Шрамов помогли этому непревзойдённому воину овладеть жестокими искусствами высокоскоростного боя.',
          body: `Только модель Adeptus Astartes. Улучшите характеристики Силы и бронепробития (AP) оружия ближнего боя носителя на 1. Каждый раз, когда носитель завершает манёвр нападения, до конца хода вместо этого улучшите характеристики Силы и бронепробития (AP) оружия ближнего боя носителя на 2.`,
        },
        {
          flavor: 'Библиарии ордена приобщили этого чемпиона к знамениям о великих угрозах в будущих войнах, ведя своих воинов в бой с дерзостью, которую некоторые принимают за безрассудство.',
          body: `Только модель Adeptus Astartes. Пока носитель возглавляет юнит, вы можете перебрасывать броски продвижения, сделанные для того юнита.`,
        },
      ],
    },

    // ─────────────── Forgefather's Seekers ───────────────
    {
      rule: {
        flavor:
          'Неутомимый в стремлении к наследию примарха, форджфазер Вулкан Хестан истребляет всех, кто препятствует его исканию. Отдавая предпочтение стремительным, агрессивным атакам, он и его воины быстро сближаются с врагом, уничтожая его в упор с безжалостной эффективностью.',
        body: `Оружие дальнего боя моделей Adeptus Astartes вашей армии имеет способность [ASSAULT], и каждый раз, когда атака таким оружием нацелена на юнит в пределах 12", добавьте 1 к характеристике Силы этой атаки.

### Seeker's Companions | Спутники Искателя
Если в вашу армию входит Vulkan He'stan, в течение вашего хода каждый юнит Infernus Squad вашей армии может сделать одно из следующего:
▪ Начать выполнять действие в ходу, в котором он продвигался.
▪ Стрелять в ходу, в котором он начал выполнять действие.

Ограничения: в вашу армию могут входить юниты Salamanders, но в неё не могут входить какие-либо юниты Adeptus Astartes из любого другого ордена.`,
      },
      stratagems: [
        armourOfContempt,
        {
          flavor: 'Только там, где врага можно встретить лицом к лицу, космодесантник может быть по-настоящему испытан.',
          when: 'Ваша фаза стрельбы или фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes Infantry вашей армии, который ещё не был выбран для стрельбы или ближнего боя в этой фазе.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита совершает атаку по ближайшей допустимой цели в пределах 6", добавьте 1 к броску на ранение.',
          restrictions: '',
        },
        {
          flavor: 'Залп за залпом горящего прометия, выпущенные синхронизированными волнами, обратят почти любого врага в тлеющий пепел.',
          when: 'Ваша фаза стрельбы.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был выбран для стрельбы в этой фазе.',
          effect: 'До конца фазы оружие Torrent моделей вашего юнита имеет способность [DEVASTATING WOUNDS].',
          restrictions: '',
        },
        {
          flavor: 'Враг сблизился с вашими воинами. Теперь он у вас точно там, где нужно. Обрушьте на него огни проклятия.',
          when: 'Ваша фаза движения, сразу после того как юнит Adeptus Astartes Infantry вашей армии отступает.',
          target: 'Тот юнит.',
          effect: 'До конца хода ваш юнит может стрелять в ходу, в котором он отступил.',
          restrictions: '',
        },
        {
          flavor: 'Открыть огонь по воинам Salamanders — значит лишь навлечь на себя собственную быструю гибель.',
          when: 'Фаза стрельбы вашего оппонента, сразу после того как вражеский юнит отстрелялся.',
          target: 'Один юнит Adeptus Astartes Transport вашей армии, который был выбран целью одной или более атак атакующего юнита.',
          effect: 'Один юнит, погруженный в тот Transport, может высадиться, как если бы это была ваша фаза движения, а затем может стрелять, как если бы это была ваша фаза стрельбы, но при этом должен целиться только в тот вражеский юнит и может делать это, только если тот вражеский юнит является допустимой целью.',
          restrictions: '',
        },
        {
          flavor: 'Столкнувшись с накатывающей ордой, воины форджфазера поджигают землю под её ногами, замедляя её наступление и ввергая её в смятение.',
          when: 'Начало фазы нападения вашего оппонента.',
          target: 'Один юнит Adeptus Astartes вашей армии, вооружённый одним или более оружием Torrent.',
          effect: 'Выберите один вражеский юнит (исключая Monsters и Vehicles и юниты с ключевым словом Fly) в пределах 12" от вашего юнита и видимый ему. До конца фазы каждый раз, когда тот вражеский юнит объявляет нападение, вычтите 2 из броска нападения (это не суммируется с любыми другими отрицательными модификаторами того броска нападения).',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'Этот струящийся плащ или искусно сработанный табард пронизан нитями плетёного адамантия.',
          body: `Только модель Adeptus Astartes. Каждый раз, когда носителю распределяется атака, вычтите 1 из характеристики урона той атаки. Если та атака совершена оружием Melta или Torrent, вместо этого измените характеристику урона той атаки на 1.`,
        },
        {
          flavor: 'Для этого Ангела Смерти война — наковальня, на которой куётся его сила.',
          body: `Только модель Adeptus Astartes. Пока носитель возглавляет юнит, один раз за ход, после броска на попадание или спас-броска для модели того юнита, вы можете изменить результат того броска на немодифицированную 6.`,
        },
        {
          flavor: 'Погружённый в Прометеев культ, этот боевой брат владеет огнемётом с непревзойдённым мастерством, обращая поле боя в горящий погребальный костёр для трупов своих врагов.',
          body: `Только модель Adeptus Astartes. Добавьте 1 к характеристике атак оружия Torrent моделей юнита носителя.`,
        },
        {
          flavor: 'Долго трудившись в кузницах ордена, этот воин-кузнец выковал своё личное вооружение.',
          body: `Только модель Adeptus Astartes Infantry. Добавьте 3 к характеристике Силы оружия ближнего боя носителя.`,
        },
      ],
    },

    // ─────────────── Emperor's Shield ───────────────
    {
      rule: {
        flavor:
          'Лисандр ведёт элиту Имперских Кулаков туда, где бой всего яростнее, дабы принести погибель тем, кто желал бы видеть стены Империума разрушенными.',
        body: `Каждый раз, когда модель вашей армии со способностью Oath of Moment совершает атаку по вашей цели Oath of Moment, вы можете перебросить бросок на ранение 1.

Каждый раз, когда модель юнита Darnath Lysander вашей армии совершает атаку по вашей цели Oath of Moment, вы можете перебросить бросок на ранение.

Ограничения: в вашу армию могут входить юниты Imperial Fists, но в неё не могут входить какие-либо юниты Adeptus Astartes из любого другого ордена.`,
      },
      stratagems: [
        armourOfContempt,
        {
          flavor: 'Боевые братья Первой роты Имперских Кулаков наступают с беспощадной эффективностью, устраняя всякое сопротивление и утверждая притязание Императора.',
          when: 'Ваша фаза движения.',
          target: 'Один юнит Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad или Vanguard Veteran Squad вашей армии в дистанции до контролируемого вами маркера цели.',
          effect: 'Тот маркер цели остаётся под вашим контролем, даже если у вас нет моделей в дистанции до него, пока ваш оппонент не будет контролировать его в начале или конце любой фазы.',
          restrictions: '',
        },
        {
          flavor: 'Потери лишь разжигают огненный гнев Имперских Кулаков и укрепляют их решимость.',
          when: 'Ваша фаза стрельбы или фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad или Vanguard Veteran Squad вашей армии, который ещё не был выбран для стрельбы или ближнего боя в этой фазе.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита совершает атаку, добавьте 1 к броску на попадание. Если ваш юнит ниже своей стартовой численности, добавьте также 1 к броску на ранение.',
          restrictions: '',
        },
        {
          flavor: 'Мастера болтерной муштры, Имперские Кулаки используют точные огневые схемы, чтобы выкурить врагов из укрытий и валить их толпами.',
          when: 'Ваша фаза стрельбы.',
          target: 'Один юнит Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad или Vanguard Veteran Squad вашей армии, который ещё не был выбран для стрельбы в этой фазе.',
          effect: 'До конца фазы оружие дальнего боя моделей вашего юнита имеет способность [IGNORES COVER] и улучшите характеристику бронепробития (AP) такого оружия на 1.',
          restrictions: '',
        },
        {
          flavor: 'Даже когда установленная мудрость велит отступать, Имперские Кулаки остаются непокорны. Упрямые до последнего, они отдадут жизни во имя чести и уничтожения своих врагов.',
          when: 'Фаза ближнего боя, сразу после того как вражеский юнит выбрал цели.',
          target: 'Один юнит Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad или Vanguard Veteran Squad вашей армии, который был выбран целью одной или более атак атакующего юнита.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита уничтожается, если та модель ещё не сражалась в этой фазе, бросьте один D6: на 3+ не убирайте её из игры. Уничтоженная модель может сражаться после того, как атакующий юнит завершит свои атаки, и затем убирается из игры.',
          restrictions: '',
        },
        {
          flavor: 'Пользуясь затишьем в бою, отряды терминаторов отходят с передовой, поднимаются на борт воздушных транспортов и отступают, чтобы подготовить свой следующий штурм.',
          when: 'Конец фазы ближнего боя вашего оппонента.',
          target: 'Один юнит Adeptus Astartes Terminator вашей армии. Вы не можете выбрать юнит, находящийся в радиусе связывания с одним или более вражескими юнитами.',
          effect: 'Уберите ваш юнит с поля боя и поместите его в стратегические резервы.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'Победитель Пира Клинков, этот боевой брат — мастер ближнего боя.',
          body: `Только модель Adeptus Astartes. Добавьте 1 к характеристике атак оружия ближнего боя носителя. Один раз за битву, в начале любой фазы, носитель может использовать это улучшение. Если он это делает, до конца фазы добавьте 1 к характеристике атак оружия ближнего боя других моделей юнита носителя.`,
        },
        {
          flavor: 'Этот боевой брат хорошо знаком с «Книгой Пяти Сфер», черпая из учений этого древнего трактата, чтобы командовать ясно и целеустремлённо.',
          body: `Только модель Adeptus Astartes Terminator. Улучшите характеристику контроля над целью носителя на 1. Один раз за битву, в начале любой фазы, носитель может использовать это улучшение. Если он это делает, до конца фазы добавьте 1 к характеристике контроля над целью других моделей юнита носителя.`,
        },
        {
          flavor: 'Даже, казалось бы, смертельные раны не отвратят сына Дорна от его долга.',
          body: `Только модель Adeptus Astartes Terminator. Когда носитель уничтожается впервые, бросьте один D6 в конце фазы. На 2+ верните носителя на поле боя как можно ближе к месту, где он был уничтожен, и не в радиусе связывания с какими-либо вражескими юнитами, с 3 оставшимися ранами.`,
        },
        {
          flavor: 'Сработанное после великой победы Лисандра над Железными Воинами на Малодраксе, это позолоченное знамя вдохновляет Имперских Кулаков сокрушать своих врагов.',
          body: `Только модель Adeptus Astartes Ancient. Каждый раз, когда атака нацелена на юнит носителя, если характеристика Силы той атаки больше характеристики Стойкости юнита носителя, вычтите 1 из броска на ранение.`,
        },
      ],
    },

    // ─────────────── Shadowmark Talon ───────────────
    {
      rule: {
        flavor:
          'Гвардия Ворона славится сверхъестественной способностью двигаться незамеченной, окутывая себя тьмой по мере сближения со своей добычей.',
        body: `Каждый раз, когда атака дальнего боя нацелена на юнит Adeptus Astartes вашей армии, если только атакующая модель не в пределах 12", цель имеет преимущество укрытия против этой атаки.

### Unparalleled Tactician | Непревзойдённый тактик
Мастер манёвренной войны, Аэтон Шаан руководит битвами с абсолютной точностью. Один раз за раунд боя, если модель Aethon Shaan вашей армии на поле боя, вы можете использовать стратагему Into Darkness за 0 CP.

Ограничения: в вашу армию могут входить юниты Raven Guard, но в неё не могут входить какие-либо юниты Adeptus Astartes из любого другого ордена.`,
      },
      stratagems: [
        armourOfContempt,
        {
          flavor: 'Из тьмы и скрывающего укрытия боевые братья Гвардии Ворона открывают огонь как один, поражая ничего не подозревающие цели точным огнём.',
          when: 'Ваша фаза стрельбы.',
          target: 'Один юнит Adeptus Astartes Infantry вашей армии, который ещё не был выбран для стрельбы в этой фазе.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита совершает атаку дальнего боя по вражескому юниту, находящемуся дальше 12", улучшите характеристики баллистического навыка (BS) этой атаки и бронепробития (AP) на 1. Если в результате этих атак уничтожены одна или более вражеских моделей, выберите одну из этих уничтоженных моделей; юнит той уничтоженной модели должен пройти тест на боевой шок.',
          restrictions: '',
        },
        {
          flavor: 'В буре колющих ударов клинков и сокрушительных выпадов вражеские чемпионы и командиры повержены, оставляя своих солдат в обезглавленном беспорядке.',
          when: 'Фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes Infantry вашей армии, который ещё не был выбран для боя в этой фазе.',
          effect: 'До конца фазы оружие ближнего боя моделей вашего юнита имеет способность [PRECISION].',
          restrictions: '',
        },
        {
          flavor: 'Гвардия Ворона стремительно использует перемещения врагов — будь то преследование добычи и довершение убийства или использование возможности вновь исчезнуть из виду.',
          when: 'Фаза движения вашего оппонента, сразу после того как вражеский юнит завершил обычный манёвр, продвижение или отступление.',
          target: 'Один юнит Adeptus Astartes Infantry или Adeptus Astartes Mounted вашей армии в пределах 9" от вражеского юнита, который только что завершил тот манёвр. Вы не можете выбрать юнит, находящийся в радиусе связывания с одним или более вражескими юнитами.',
          effect: 'Ваш юнит может совершить обычный манёвр до D6" или до 6", если это юнит Phobos или Scout Squad.',
          restrictions: '',
        },
        {
          flavor: 'Отступая из боя, эти воины заманивают врагов, прежде чем стремительно переломить ход событий и броситься на своего теперь растянувшегося противника.',
          when: 'Ваша фаза движения.',
          target: 'Один юнит Adeptus Astartes вашей армии.',
          effect: 'До конца хода ваш юнит может стрелять и объявлять нападение в ходу, в котором он отступил. Если это юнит Phobos или Scout Squad, он также может стрелять и объявлять нападение в ходу, в котором он продвигался.',
          restrictions: '',
        },
        {
          flavor: 'В подходящий момент инфильтрационные юниты Гвардии Ворона ускользают из боя, лишь чтобы перебраться на новую позицию, готовые вновь ударить по врагу.',
          when: 'Конец фазы ближнего боя вашего оппонента.',
          target: 'До двух юнитов Phobos и/или Scout Squad вашей армии либо один другой юнит Adeptus Astartes Infantry вашей армии. Вы не можете выбрать юнит, находящийся в радиусе связывания с одним или более вражескими юнитами.',
          effect: 'Уберите эти юниты с поля боя и поместите их в стратегические резервы.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'Это механическое устройство содержит миниатюрные рефракционные поля и проекторы электромагнитных помех, позволяя носителю и его юниту избегать обнаружения и проникать на ключевые позиции.',
          body: `Только модель Adeptus Astartes Infantry. Пока носитель возглавляет юнит, модели того юнита имеют способность Infiltrators.`,
        },
        {
          flavor: 'Этот венец из схем эпохи Тёмной Технологической Эры вбивает шепчущий белый шум в разумы и передачи врагов.',
          body: `Только модель Phobos. Носитель имеет следующую способность — Lord of Deceit (Aura): один раз за ход, когда ваш оппонент нацеливает стратагему на юнит своей армии в пределах 12" от этой модели, вы можете использовать эту способность. Если вы это делаете, увеличьте стоимость того применения той стратагемы на 1 CP.`,
        },
        {
          flavor: 'Те, кто овладел Путём Засады, ведут свои силы к внезапным атакам на врага с точным расчётом времени истинных охотников.',
          body: `Только модель Adeptus Astartes. В вашей фазе движения, если юнит носителя в стратегических резервах, для целей выставления того юнита на поле боя считайте номер текущего раунда боя на единицу выше, чем он есть на самом деле.`,
        },
        {
          flavor: 'Этот воин — одиночный хищник, чьи шаги почти беззвучны, а облик слит с тенями.',
          body: `Только модель Adeptus Astartes. Носитель имеет способности Stealth и Lone Operative.`,
        },
      ],
    },

    // ─────────────── Bastion Task Force ───────────────
    {
      rule: {
        flavor:
          'Используя всю широту тактики комбинированных родов войск, преподанной Codex Astartes, основные отряды бьют и отходят, притупляя атаки врага и одновременно добывая ауспик-данные, чтобы направлять наведение своих тяжелее вооружённых собратьев.',
        body: `Юниты Adeptus Astartes Battleline вашей армии:
▪ Могут стрелять и объявлять нападение в ходу, в котором они продвигались или отступили.
▪ Могут начать выполнять действие в ходу, в котором они продвигались или отступили.

Каждый раз, когда юнит Adeptus Astartes Battleline вашей армии выбран для атаки, после разрешения тех атак выберите один вражеский юнит, поражённый одной или более из тех атак. До конца хода тот вражеский юнит просканирован ауспиком. Каждый раз, когда модель Adeptus Astartes вашей армии совершает атаку по юниту, просканированному ауспиком, перебросьте бросок на попадание 1.`,
      },
      stratagems: [
        {
          flavor: 'Придерживаясь учений Codex Astartes, эти воины обрушивают дисциплинированные залпы огневой мощи.',
          when: 'Ваша фаза стрельбы или фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был выбран для стрельбы или ближнего боя в этой фазе.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита совершает атаку по вражескому юниту, перебросьте бросок на попадание 1. Если та цель просканирована ауспиком, перебросьте также бросок на ранение 1.',
          restrictions: '',
        },
        {
          flavor: 'Направляемый ауспиком град шоковых зарядов ослепляет системы наведения врага и сбивает его прицел.',
          when: 'Ваша фаза стрельбы или фаза ближнего боя, сразу после того как юнит Adeptus Astartes Battleline вашей армии завершил свои атаки.',
          target: 'Тот юнит Adeptus Astartes Battleline.',
          effect: 'Когда вражеский юнит становится просканирован ауспиком в результате тех атак в этом ходу, до начала вашего следующего хода он подавлен. Пока юнит подавлен, каждый раз, когда модель того юнита совершает атаку, вычтите 1 из броска на попадание.',
          restrictions: '',
        },
        {
          flavor: 'Используя ауспик-данные, чтобы выявить слабые места в построении врага, космодесантники используют их, чтобы сеять смятение и подавлять свои цели.',
          when: 'Ваша фаза стрельбы или фаза ближнего боя, сразу после того как юнит Adeptus Astartes Battleline вашей армии завершил свои атаки.',
          target: 'Тот юнит Adeptus Astartes Battleline.',
          effect: 'Когда вражеский юнит становится просканирован ауспиком в результате тех атак в этом ходу, если тот вражеский юнит не имеет ключевых слов Monster или Vehicle, до начала вашего следующего хода он прижат. Пока юнит прижат, вычтите 2 из характеристики движения того юнита и вычтите 2 из бросков нападения, сделанных для того юнита.',
          restrictions: '',
        },
        {
          flavor: 'Слишком хорошо осознавая свою жизненно важную роль в сдерживании врага, эти боевые братья отказываются уступать даже перед самыми тяжкими ранами.',
          when: 'Фаза стрельбы или фаза ближнего боя вашего оппонента, сразу после того как вражеский юнит выбрал цели.',
          target: 'Один юнит Adeptus Astartes Battleline вашей армии, который был выбран целью одной или более атак атакующего юнита.',
          effect: 'До конца фазы каждый раз, когда атака нацелена на ваш юнит, если характеристика Силы той атаки больше характеристики Стойкости вашего юнита, вычтите 1 из броска на ранение.',
          restrictions: '',
        },
        {
          flavor: 'С уязвимостями, обнажёнными резким светом ауспик-анализа, враги — лёгкая добыча для мстительного натиска космодесантников.',
          when: 'Ваша фаза стрельбы или фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был выбран для стрельбы или ближнего боя в этой фазе.',
          effect: 'Выберите способность [LETHAL HITS] или [SUSTAINED HITS 1]. До конца фазы оружие моделей вашего юнита имеет эту способность, целясь в просканированный ауспиком юнит или если носитель имеет ключевое слово Battleline.',
          restrictions: '',
        },
        {
          flavor: 'Тактические сканы и когитаторный анализ раскрыли низменные замыслы врага, сделав его перемещения проще для предугадывания и противодействия.',
          when: 'Ваша фаза стрельбы или ваша фаза нападения.',
          target: 'Один юнит Adeptus Astartes (исключая юниты Battleline) вашей армии.',
          effect: 'До конца фазы ваш юнит может стрелять и объявлять нападение в ходу, в котором он продвигался или отступил. Если он это делает, каждая цель того нападения и каждая цель тех атак должна быть просканированным ауспиком юнитом.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'Этот офицер и его почётная стража из преданных боевых братьев были удостоены мастерски выкованных боевых клинков в признание самоотверженного боя, который им предстоит.',
          body: `Только модель Adeptus Astartes. Улучшите характеристику бронепробития (AP) оружия ближнего боя носителя и моделей Battleline юнита носителя на 1.`,
        },
        {
          flavor: 'Эта примечательная технологическая реликвия установлена в горжете доспеха носителя и обеспечивает защищённое кодом, быстрое распространение разведданных в бою.',
          body: `Только модель Adeptus Astartes. Каждый раз, когда вы выбираете юнит носителя целью стратагемы, бросьте один D6, прибавляя 1, если юнит носителя имеет ключевое слово Battleline: на 4+ вы получаете 1 CP.`,
        },
        {
          flavor: 'Этот мастерски сработанный микро-ауспик интегрируется с авточувствами носителя и подаёт превосходные данные наведения ему и его отряду.',
          body: `Только модель Adeptus Astartes. Оружие дальнего боя носителя и моделей Battleline юнита носителя имеет способность [PRECISION].`,
        },
        {
          flavor: 'Прославленный и вдохновляющий образец добродетелей своего ордена, этот военный вождь — воодушевляющее присутствие в рядах своих боевых братьев.',
          body: `Только модель Adeptus Astartes. Пока носитель возглавляет юнит, носитель имеет ключевое слово Battleline.`,
        },
      ],
    },

    // ─────────────── Orbital Assault Force ───────────────
    {
      rule: {
        flavor:
          'Благодаря телепортации, Drop Pod и высадке с боевых кораблей целые ударные группы космодесанта и даже их бронированная поддержка могут развернуться с орбиты за считаные мгновения — способность, которая сама по себе выигрывала целые войны.',
        body: `В начале шага «Объявление боевых построений» выберите некоторое число юнитов Adeptus Astartes (исключая юниты Titanic) вашей армии в зависимости от размера битвы, как показано ниже. Модели в тех юнитах имеют способность Deep Strike.
▪ Incursion: 2 юнита
▪ Strike Force: 3 юнита
▪ Onslaught: 4 юнита

Каждый раз, когда модель Adeptus Astartes вашей армии совершает атаку, если она была выставлена на поле боя в этом ходу, перебросьте бросок на ранение 1. Если она высадилась из Drop Pod в этом ходу, перебросьте также бросок на попадание 1.`,
      },
      stratagems: [
        {
          flavor: 'Пока космодесантники штурмуют вперёд, их боевые корабли и истребители проносятся над головой, обрушивая на вражеские позиции град огня, чтобы держать врага прижатым.',
          when: 'Командная фаза.',
          target: 'Один юнит Adeptus Astartes вашей армии.',
          effect: 'Выберите один вражеский юнит, видимый вашему юниту и в пределах 18" от него. Тот вражеский юнит проходит тест на боевой шок. При этом вычтите 1 из того теста, и, если тот тест провален, до начала вашего следующего хода тот вражеский юнит подавлен. Пока юнит подавлен, каждый раз, когда модель того юнита совершает атаку, вычтите 1 из броска на попадание.',
          restrictions: 'Вы не можете использовать эту стратагему более одного раза за раунд боя.',
        },
        {
          flavor: 'Стремительно устраняя местных вражеских командиров, космодесантники держат врага в неравновесии и препятствуют организованному сопротивлению их натиску.',
          when: 'Ваша фаза стрельбы или фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был выбран для стрельбы или ближнего боя в этой фазе.',
          effect: 'До конца фазы оружие моделей вашего юнита имеет способность [PRECISION], и каждый раз, когда модель вашего юнита совершает атаку по юниту Character, добавьте 1 к броску на попадание.',
          restrictions: '',
        },
        {
          flavor: 'Сама сокрушительная инерция десантного штурма космодесанта разбивает одну вражескую боевую линию за другой.',
          when: 'Фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был выбран для боя в этой фазе.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита совершает манёвр Pile-in или консолидации, она может двигаться до 6" вместо 3".',
          restrictions: '',
        },
        {
          flavor: 'Связывая потоки данных со своих авточувств, эти боевые братья создают триангулированные огневые решения для ближних огневых вееров.',
          when: 'Ваша фаза стрельбы или фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не был выбран для стрельбы или ближнего боя в этой фазе.',
          effect: 'Выберите способность [LETHAL HITS] или [SUSTAINED HITS 1]. До конца фазы оружие моделей вашего юнита имеет эту способность в ходу, в котором они высадились из Drop Pod, или целясь во вражеский юнит в пределах 12".',
          restrictions: '',
        },
        {
          flavor: 'Автопусковые установки выплёвывают предрассчитанный веер слепящих гранат, чтобы сбить с толку органическое и механическое наведение.',
          when: 'Фаза стрельбы вашего оппонента, сразу после того как вражеский юнит выбрал цели.',
          target: 'Один юнит Adeptus Astartes (исключая юниты Titanic) вашей армии, который был выбран целью одной или более атак атакующего юнита, и один дружественный юнит Adeptus Astartes Smoke Vehicle или Drop Pod в пределах 9" от него.',
          effect: 'До конца фазы модели ваших юнитов имеют способность Stealth, и каждый раз, когда атака дальнего боя нацелена на один из ваших юнитов, модели того юнита имеют преимущество укрытия против этой атаки.',
          restrictions: '',
        },
        {
          flavor: 'Всегда есть ещё одна битва, которую нужно вести, и космодесантники не теряют времени на её ведение.',
          when: 'Конец фазы ближнего боя вашего оппонента.',
          target: 'Один юнит Adeptus Astartes Infantry вашей армии, который не был выставлен на поле боя в этом ходу, и один дружественный Transport, в который он способен погрузиться.',
          effect: 'Если ваш юнит Adeptus Astartes целиком в пределах 6" от того Transport, он может погрузиться в него.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'Какими бы громоздкими и несколько неповоротливыми они ни были, отрядам терминаторов — или даже особо важным офицерам в терминаторской броне — может быть придан боевой корабль для быстрой боевой эвакуации и перемещения посреди битвы.',
          body: `Только модель Adeptus Astartes Terminator. Один раз за битву, в конце фазы ближнего боя вашего оппонента, если юнит носителя не в радиусе связывания с одним или более вражескими юнитами, носитель может использовать это улучшение. Если он это делает, уберите юнит носителя с поля боя и поместите его в стратегические резервы.`,
        },
        {
          flavor: 'Эта честь присуждается тем офицерам космодесанта, которые проявляют наибольшую доблесть во время орбитальных высадок.',
          body: `Только модель Adeptus Astartes. Вы можете перебрасывать броски нападения, сделанные для юнита носителя в ходу, в котором он был выставлен на поле боя.`,
        },
        {
          flavor: 'Хотя это выглядит мрачной безделушкой веры, на деле это устройство содержит мощный микрокогитатор, связанный со стратегиумом орбитального ударного крейсера.',
          body: `Только модель Adeptus Astartes. После того как оба игрока развернули свои армии, выберите до трёх юнитов Adeptus Astartes вашей армии и передислоцируйте их. При этом, если хотите, вы можете выставить эти юниты в стратегические резервы, независимо от того, сколько юнитов уже находится в стратегических резервах.`,
        },
        {
          flavor: 'Долгий опыт руководства авангардными ударами в броне Phobos научил этого воина многим урокам о стремительных и скрытных атаках.',
          body: `Только модель Adeptus Astartes. Модели юнита носителя имеют способность Scouts 6".`,
        },
      ],
    },

    // ─────────────── Reclamation Force ───────────────
    {
      rule: {
        flavor:
          'Движущий принцип всего, что делают эти боевые братья, — соблюдение своих клятв оттеснить тьму и вновь завоевать Пятьсот Миров, одно поле боя за раз.',
        body: `▪ Каждый раз, когда модель Adeptus Astartes вашей армии совершает атаку ближнего боя по юниту в дистанции до маркера цели, улучшите характеристику бронепробития (AP) той атаки на 1.
▪ Каждый раз, когда атака нацелена на юнит Adeptus Astartes вашей армии, если ваш юнит в дистанции до маркера цели, который вы контролировали в начале фазы, и если характеристика Силы той атаки больше характеристики Стойкости вашего юнита или ваш юнит имеет ключевое слово Titus, вычтите 1 из броска на ранение.

Ограничения: в вашу армию могут входить юниты Ultramarines, но в неё не могут входить какие-либо юниты Adeptus Astartes из любого другого ордена.`,
      },
      stratagems: [
        {
          flavor: 'Сама воля этих боевых братьев вернуть священные Пятьсот Миров непреодолима.',
          when: 'Конец фазы командования.',
          target: 'Один юнит Adeptus Astartes вашей армии.',
          effect: 'До начала следующей фазы командования добавьте 1 к характеристике контроля над целью моделей вашего юнита.',
          restrictions: '',
        },
        {
          flavor: 'Холодная ярость цели движет нападением космодесантников, их абсолютная преданность делу дарует им свирепую скорость и силу.',
          when: 'Ваша фаза нападения или фаза ближнего боя.',
          target: 'Один юнит Adeptus Astartes вашей армии, который ещё не объявлял нападение и не был выбран для боя в этой фазе.',
          effect: 'До конца хода добавьте 2 к броскам нападения, сделанным для вашего юнита, и добавьте 1 к характеристике атак оружия ближнего боя моделей вашего юнита.',
          restrictions: 'Вы не можете использовать эту стратагему более одного раза за ход.',
        },
        {
          flavor: 'Те, кто поклялся увидеть Ультрамар возвращённым, не уступят ни ярда его территорий, однажды захватив и закрепив их.',
          when: 'Фаза ближнего боя, сразу после того как вражеский юнит выбрал цели.',
          target: 'Один юнит Adeptus Astartes вашей армии, который был выбран целью одной или более атак атакующего юнита.',
          effect: 'До конца фазы каждый раз, когда модель вашего юнита уничтожается, если та модель ещё не сражалась в этой фазе, бросьте один D6: на 4+ не убирайте уничтоженную модель из игры; она может сражаться после того, как атакующий юнит завершит свои атаки, и затем убирается из игры.',
          restrictions: '',
        },
        {
          flavor: 'Генесыны Робаута Жиллимана — мастера его заветов, независимо от того, из какого ордена они происходят.',
          when: 'Ваша фаза движения, сразу после того как юнит Adeptus Astartes вашей армии завершил манёвр отступления.',
          target: 'Тот юнит Adeptus Astartes.',
          effect: 'До конца хода ваш юнит может стрелять и объявлять нападение в ходу, в котором он отступил.',
          restrictions: '',
        },
        {
          flavor: 'Все космодесантники, сражающиеся, чтобы защитить или расширить звёздное владение Ультрамаринов, верят, что их завоевание не что иное, как предопределённое волей примарха.',
          when: 'Ваша фаза движения.',
          target: 'Один юнит Adeptus Astartes вашей армии.',
          effect: 'Выберите один контролируемый вами маркер цели, в дистанции до которого находится ваш юнит. Тот маркер цели остаётся под вашим контролем, пока уровень контроля вашего оппонента над тем маркером цели не станет больше вашего в конце фазы.',
          restrictions: '',
        },
        {
          flavor: 'Путь к полному восстановлению Пятисот Миров будет долгим и изнурительным, и те, кто пробивается по нему, не могут остановиться в своём наступлении ни на миг.',
          when: 'Фаза движения вашего оппонента, сразу после того как вражеский юнит отступает.',
          target: 'Один юнит Adeptus Astartes вашей армии, который был в радиусе связывания с тем вражеским юнитом в начале фазы.',
          effect: 'Ваш юнит может совершить обычный манёвр до D6"+1.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          flavor: 'С глазами, горящими решимостью и мстительной яростью, этот чемпион ордена словно отбрасывает грозную тень самого примарха на своих трепещущих врагов.',
          body: `Только модель Adeptus Astartes. В шаге боевого шока фазы командования вашего оппонента, если вражеский юнит, находящийся ниже своей стартовой численности, в пределах 9" от носителя, тот вражеский юнит должен пройти тест на боевой шок.`,
        },
        {
          flavor: 'Выкованное на Макрагге искуснейшими мастерами, это оружие, дух машины которого, как говорят, пылает желанием увидеть Пятьсот Миров вырванными из хватки еретиков и деспотов.',
          body: `Только модель Adeptus Astartes. Каждый раз, когда носитель совершает атаку по вражескому юниту, если цель в дистанции до маркера цели, вы можете перебросить бросок на попадание и можете перебросить бросок на ранение.`,
        },
        {
          flavor: 'Изящно начертанные на веллуме и туго свёрнутые в бронированном футляре, слова Consilias Imperitus Ultimar Робаута Жиллимана — постоянный источник вдохновения.',
          body: `Только модель Adeptus Astartes. Когда этот юнит объявляет нападение, если вражеский юнит в дистанции до цели находится в пределах 12" от этого юнита, вы можете использовать это улучшение. Если вы это делаете, этот юнит может перебросить тот бросок нападения, и этот юнит должен завершить тот манёвр нападения связанным боем с одним или более из тех вражеских юнитов.`,
        },
        {
          flavor: 'Эти драгоценные печати изготавливаются на Коноре и содержат микрогенераторы щитов, помогающие оберегать боевых братьев, пока те исполняют свои клятвы долга.',
          body: `Только модель Adeptus Astartes. Модели юнита носителя имеют неуязвимый спас-бросок 5+.`,
        },
      ],
    },

  ],
}

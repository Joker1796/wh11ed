// Sparse RU translation overlay for src/data/combatPatrol.js, deep-merged over the `en` object
// via deepOverlay() (see ../deepOverlay.js) — the same mechanism src/data/factions/ru/*.js uses
// for normal faction content. Only translated PROSE lives here: rule/army-rule flavor+body(
// +example), stratagem flavor/when/target/effect/restrictions, enhancement flavor/body,
// datasheet ability text, composition, loadout, options, leader.text, damaged.note/text,
// transport. Everything else (ids, slugs, stats, keywords, dp, cp, sublabel, and every NAME —
// faction/detachment/army-rule/stratagem/enhancement/unit/weapon/ability names) stays absent
// here and inherits from EN, matching the project's "names stay English" convention.
//
// Array entries are matched to their EN counterpart by `name` (factions, stratagems,
// enhancements, abilities) or `id` (datasheets) — see deepOverlay() — so factions can be
// translated one at a time without touching the others, and an entry's key fields (`name: '…'`
// / `id: '…'`) must be copied VERBATIM from combatPatrol.js for the match to work.
//
// See COMBAT-PATROL-RU-TRANSLATION-TASK.md (repo root, one level up) for the full brief:
// exact field-by-field translate/keep-English rules, bilingual conventions (bold, glosses,
// apostrophes, ALL-CAPS keywords), and verification steps.
export const combatPatrolRu = {
  factions: [
    {
      name: 'Necrons',
      rule: {
        nameRu: 'Территориальные императивы',
        flavor: 'Стража Амонхотека ставит завоевание выше всего прочего. Когда перед ним встают его неумирающие легионы, большинство врагов либо отступает, либо обращается в бегство. Те, кто достаточно дерзок, чтобы стоять и сражаться, оказываются под ужасной мощью самого страшного оружия его стражи — Canoptek Doomstalker.',
        body: `▪ В конце вашей фазы командования вы можете выбрать один дружественный юнит Amonhotekh's Guard. До начала вашей следующей фазы командования у этого юнита будет +1 OC.
▪ При игре в битве Combat Patrol следующие дружественные юниты должны начинать битву в стратегическом резерве и не могут быть выставлены на поле боя до указанного раунда битвы, а когда это произойдёт, должны быть выставлены целиком в вашей зоне развертывания: Canoptek Doomstalker (раунд битвы 3).`,
      },
      armyRule: {
        nameRu: 'Протоколы реанимации',
        body: `Если ваша армия относится к фракции Necrons, в конце вашей фазы командования каждый юнит вашей армии с этой способностью, находящийся на поле боя, активирует свои Reanimation Protocols и возвращает D3 ран.
Каждый раз, когда такой юнит возвращает рану:
▪ Если в этом юните есть одна или более моделей с меньшим, чем изначально, количеством оставшихся ран, выберите одну из таких моделей; эта модель восстанавливает одну потерянную рану.
▪ Если все модели в этом юните имеют своё исходное количество ран, но сам юнит не имеет полной боевой численности, одна уничтоженная модель возвращается в этот юнит с одной раной.

Как только такой юнит достигает полной боевой численности и все его модели имеют исходное количество ран, больше ничего не происходит.`,
        example: 'Юнит Lokhust Destroyers (у которых характеристика Wounds равна 3) активирует свои Reanimation Protocols. У юнита была исходная численность 3, но сейчас в нём 2 модели, и одна из них потеряла 1 рану. Для определения числа возвращённых ран бросают 3. Первая из этих возвращённых ран восстанавливает раненого Lokhust Destroyer до 3 ран. Вторая возвращает уничтоженного Lokhust Destroyer на поле боя с 1 раной. Третья восстанавливает одну из оставшихся потерянных ран той же модели, которую только что вернули. Теперь в юните 3 модели: две с 3 ранами и одна с 2 ранами.',
      },
      stratagems: [
        {
          name: 'Gauss Storm',
          nameRu: 'Гауссова буря',
          flavor: 'Воины-некроны выпускают быстрые залпы gauss-огня, формируя трескучую бурю из смертоносной изумрудной энергии, от которой почти невозможно уклониться.',
          when: 'Ваша фаза стрельбы, когда дружественный юнит Amonhotekh\'s Guard Necron Warriors выбран для стрельбы.',
          target: 'Этот юнит Amonhotekh\'s Guard Necron Warriors.',
          effect: 'Ударные атаки вашего юнита получают +1 к броскам попадания.',
        },
        {
          name: 'Aggression Protocols',
          nameRu: 'Протоколы агрессии',
          flavor: 'Подчиняясь боевым протоколам своего Повелителя, эти воины выходят из боя, лишь чтобы возобновить атаку на более выгодных позициях.',
          when: 'Ваша фаза перемещения, когда дружественный юнит Amonhotekh\'s Guard (за исключением юнитов Monster/Vehicle) выбран для отступления.',
          target: 'Этот юнит Amonhotekh\'s Guard.',
          effect: 'Это перемещение не мешает вашему юниту быть подходящим для стрельбы/объявления атаки.',
        },
        {
          name: 'Reinforced Resilience',
          nameRu: 'Усиленная стойкость',
          flavor: 'Повелитель Амонхотек редко тратит своих воинов бездумно, вплоть до того, что приказывает им укрыться в укрытии, чтобы повысить их живучесть.',
          when: 'Фаза стрельбы вашего противника, когда вражеский юнит выбирает дружественный юнит Amonhotekh\'s Guard (за исключением юнитов Monster/Vehicle) целью, при этом все модели внутри областиTerrain.',
          target: 'Этот юнит Amonhotekh\'s Guard.',
          effect: 'У вашего юнита +1 Sv.',
        },
      ],
      enhancements: [
        {
          name: 'Metalline Might',
          nameRu: 'Металлическая мощь',
          flavor: 'Усиленный и улучшенный лучшими ремесленниками-криптеками, живой металлический облик Амонхотека дарует ему сокрушительную силу.',
          body: 'Только модель Amonhotekh\'s Guard Overlord. Атаки этого героя в ближнем бою получают +2 S.',
        },
        {
          name: 'Unblemished Legions',
          nameRu: 'Безупречные легионы',
          flavor: 'Неокронские воины Амонхотека принадлежат к лучшим в галактике: неповреждённые и не испорченные временем, несмотря на вечность, что прошла.',
          body: `Улучшение: только юнит Amonhotekh's Guard Necron Warriors.
▪ У этого юнита +1 M.
▪ Атаки этого юнита на расстоянии получают [ASSAULT].`,
        },
      ],
      datasheets: [
        {
          id: 'amonhotekhs-guard-necron-warriors',
          abilities: [
            {
              name: 'Their Number is Legion',
              text: 'Когда у этого юнита активируются Reanimation Protocols, он может перебросить кубики, чтобы определить число возвращённых ран.',
            },
          ],
          composition: [
            '5 моделей Necron Warrior с Gauss Flayer и Combat Attachments',
            '5 моделей Necron Warrior с Gauss Reaper и Combat Attachments',
          ],
          loadout: `**Каждый Necron Warrior с Gauss Flayer и Combat Attachments вооружён:** Combat Attachments; Gauss Flayer.
**Каждый Necron Warrior с Gauss Reaper и Combat Attachments вооружён:** Combat Attachments; Gauss Reaper.`,
        },
        {
          id: 'amonhotekhs-guard-skorpekh-destroyers',
          abilities: [
            {
              name: 'Plasmacyte (Once per battle per unit)',
              text: 'Когда этот юнит выбран для боя, вы можете использовать эту способность. Если делаете это, атаки этого юнита получают [DEVASTATING WOUNDS].',
            },
            {
              name: 'Whirling Onslaught',
              text: 'Атаки этого юнита в ближнем бою могут перебрасывать броски попадания 1. Если этот юнит в этом ходу совершил рывок в атаку, его атаки в ближнем бою могут перебрасывать броски попадания.',
            },
          ],
          composition: [
            '1 модель Skorpekh Destroyer с Plasmacyte',
            '2 модели Skorpekh Destroyer',
          ],
          loadout: `**Skorpekh Destroyer с Plasmacyte вооружён:** Hyperphase Blades; Plasmacyte.
**Каждый Skorpekh Destroyer вооружён:** Hyperphase Blades.`,
        },
        {
          id: 'amonhotekhs-guard-canoptek-doomstalker',
          damaged: {
            note: 'Осталось 1–4 раны',
            text: 'Пока у этой модели осталось 1–4 раны, каждый раз, когда она делает атаку, из броска попадания вычитается 1.',
          },
          composition: ['1 модель Canoptek Doomstalker'],
          loadout: '**Эта модель вооружена:** Doomsday Blaster; Doomstalker Limbs; Twin Gauss Flayer.',
        },
        {
          id: 'overlord-amonhotekh',
          abilities: [
            {
              name: 'Iron Will',
              text: 'В фазе боя, когда эта модель уничтожена, если этот юнит ещё не был выбран для боя в этой фазе, бросьте один D6: на 2+ эту модель не убирают с поля боя. Когда этот юнит уже сражался, или в конце фазы (что наступит раньше), эту модель убирают с поля боя.',
            },
          ],
          composition: ['1 модель Overlord Amonhotekh'],
          loadout: '**Эта модель вооружена:** Overlord\'s Blade; Tachyon Arrow.',
        },
        {
          id: 'amonhotekhs-guard-canoptek-scarab-swarms',
          abilities: [
            {
              name: 'Scarab Interference',
              text: 'Пока вражеский юнит находится в рукопашной с этим юнитом, атаки этого вражеского юнита получают -1 к броскам попадания.',
            },
          ],
          composition: ['3 модели Canoptek Scarab Swarm'],
          loadout: '**Каждая модель вооружена:** Feeder Mandibles.',
        },
      ],
    },
    {
      name: 'Space Marines',
      rule: {
        nameRu: 'Несокрушимая решимость',
        flavor: 'Космические марсы безжалостно настойчивы в преследовании и защите своих целей, демонстрируя стойкость, которой не хватает простым смертным.',
        body: 'Дружественные юниты Assault Force получают +1 OC.',
      },
      armyRule: {
        nameRu: 'Боевые доктрины',
        body: `В вашей фазе командования вы можете выбрать одну из способностей Combat Doctrine ниже. Дружественные юниты Adeptus Astartes получают выбранную способность Combat Doctrine до начала вашей следующей фазы командования.

**Assault Doctrine:** Этот юнит может объявить атаку в том ходу, в котором он совершил продвижение.

**Devastator Doctrine:** Этот юнит может стрелять в том ходу, в котором он совершил продвижение.

**Tactical Doctrine:** Этот юнит может стрелять и объявить атаку в том ходу, в котором он отступил.

Каждую способность Combat Doctrine нельзя выбирать более одного раза за битву.`,
      },
      stratagems: [
        {
          name: 'Relentless Aggression',
          nameRu: 'Неумолимая агрессия',
          flavor: 'Вперёд, удерживайте инициативу и не давайте врагу отдышаться.',
          when: 'Фаза боя, когда дружественный юнит Assault Force выбран для совершения перегруппировки.',
          target: 'Этот юнит Assault Force.',
          effect: 'При совершении этой перегруппировки ваш юнит может переместиться на до 6".',
        },
        {
          name: 'Terrifying Charge',
          nameRu: 'Ужасающий рывок в атаку',
          flavor: 'Крушительный удар штурмовой атаки Космических Марсов — поистине ужасающая вещь. Перед таким натиском дрогнут даже самые смелые противники.',
          when: 'Ваша фаза атаки, когда дружественный юнит Assault Force завершает рывок в атаку.',
          target: 'Этот юнит Assault Force.',
          effect: 'Выберите один вражеский юнит, который находится в рукопашной с вашим юнитом. Этот вражеский юнит проходит проверку морального духа с -1 к этой проверке.',
        },
        {
          name: 'Decapitating Strike',
          nameRu: 'Обезглавливающий удар',
          flavor: 'Самый надёжный способ сломить врага — убрать его лидера. Отрежь голову змее, и тело непременно падёт.',
          when: 'Фаза боя, когда дружественный юнит Assault Force выбран для боя.',
          target: 'Этот юнит Assault Force.',
          effect: 'Атаки вашего юнита в ближнем бою получают [PRECISION].',
        },
      ],
      enhancements: [
        {
          name: 'Battle-line Veterans',
          nameRu: 'Ветераны боевой линии',
          flavor: 'Эти воины служили в своём Главе десятилетиями и демонстрируют истинное мастерство болтерной подготовки и меткости.',
          body: 'Только юнит Assault Force Intercessor Squad. Ударные оружия этого юнита получают [RAPID FIRE 1].',
        },
        {
          name: 'Blade Masters',
          nameRu: 'Мастера клинка',
          flavor: 'Ветераны Первого Компанейского Когтя, эти братья-бойцы владеют клинком и щитом одинаково мастерски, создавая стену стали, сквозь которую едва ли пробьётся любой нападающий враг.',
          body: 'Только юнит Assault Force Vanguard Veteran Squad With Jump Packs. Когда вражеский юнит завершает рывок в атаку, если он находится в рукопашной с этим юнитом, атаки этого юнита в ближнем бою получают -1 к броскам ран до конца хода.',
        },
      ],
      datasheets: [
        {
          id: 'assault-force-intercessor-squad',
          abilities: [
            {
              name: 'Stalwart Defenders',
              text: 'Когда вражеский юнит выбирает этот юнит целью, если каждая модель в этом юните находится в пределах досягаемости цели, атаки, направленные на этот юнит, получают -1 AP.',
            },
          ],
          composition: [
            '1 модель Intercessor Sergeant',
            '1 модель Intercessor с Grenade Launcher',
            '3 модели Intercessor',
          ],
          loadout: `**Intercessor Sergeant вооружён:** Bolt Pistol; Bolt Rifle; Chainsword; Knives and Fists.
**Intercessor с Grenade Launcher вооружён:** Bolt Pistol; Bolt Rifle; Grenade Launcher; Knives and Fists.
**Каждый Intercessor вооружён:** Bolt Pistol; Bolt Rifle; Knives and Fists.`,
        },
        {
          id: 'assault-force-captain',
          abilities: [
            {
              name: 'Relic Shield',
              text: 'У этой модели +1 W (учтено в характеристиках).',
            },
            {
              name: 'Master of War',
              text: 'В конце фазы атаки противника, если этот юнит не находится в рукопашной и находится в пределах 6" от одного или более вражеских юнитов, вы можете использовать эту способность. Если делаете это, с ним разрешается совершить рывок в атаку. При броске на рывок, если результат больше 6 (с учётом модификаторов), измените его на 6.',
            },
          ],
          composition: ['1 модель Captain'],
          loadout: '**Эта модель вооружена:** Heavy Bolt Pistol; Master-crafted Power Weapon; Relic Shield.',
        },
        {
          id: 'assault-force-vanguard-veteran-squad-with-jump-packs',
          abilities: [
            {
              name: 'Rapid Reactions (Once per turn per unit)',
              text: 'В фазе стрельбы противника, когда вражеский юнит стрелял, если он выбирал этой юнит целью, этот юнит может совершить обычное перемещение на до D6+1".',
            },
          ],
          composition: [
            '1 модель Vanguard Veteran Sergeant',
            '1 модель Vanguard Veteran с Plasma Pistol',
            '3 модели Vanguard Veteran',
          ],
          loadout: `**Vanguard Veteran Sergeant вооружён:** Heavy Bolt Pistol; Master-crafted Power Weapon.
**Vanguard Veteran с Plasma Pistol вооружён:** Master-crafted Power Weapon; Plasma Pistol.
**Каждый Vanguard Veteran вооружён:** Heavy Bolt Pistol; Master-crafted Power Weapon.`,
        },
        {
          id: 'assault-force-librarian',
          abilities: [
            {
              name: 'Empyric Insight',
              text: `Атаки этого юнита на расстоянии могут игнорировать модификаторы к:
▪ BS.
▪ Броскам попадания и ран.`,
            },
          ],
          composition: ['1 модель Librarian'],
          loadout: '**Эта модель вооружена:** Bolt Pistol; Force Weapon; Fulmination.',
          leader: {
            text: 'Эта модель может быть прикреплена к следующим юнитам:',
          },
        },
        {
          id: 'assault-force-land-speeder',
          composition: ['1 модель Land Speeder'],
          loadout: '**Эта модель вооружена:** Armoured Impact; Multi-melta; Onslaught Gatling Cannon; Stormfury Missile Launcher.',
        },
      ],
    },
    {
      name: 'Orks',
      rule: {
        nameRu: 'Крепкие как гвозди',
        flavor: 'Орки — это крепкие, покрытые шрамами твари, которые с радостью отмахиваются от ран, способных убить большинство существ. Когда их пропитывает мощь Waaagh!, их выносливость возрастает до немыслимых высот.',
        body: 'Атаки, направленные на дружественный юнит \'Ardmob с активным Waaagh!, имеют -1 к броскам ран, если их S больше, чем T этого дружественного юнита.',
      },
      armyRule: {
        nameRu: 'Ваааагх!',
        body: `Вы можете перебрасывать броски продвижения для дружественных юнитов Orks.

Один раз за битву, в начале фазы командования, вы можете объявить Waaagh!. Если делаете это, до конца следующего хода для дружественных юнитов Orks действует Waaagh!. Пока Waaagh! активен для юнита, он может стрелять и объявить атаку в том ходу, в котором совершил продвижение.`,
      },
      stratagems: [
        {
          name: "Krump 'Em",
          nameRu: 'Круши их',
          flavor: 'Орки бросаются в бой, обрушивая тяжёлые сокрушительные удары и громовые удары головой.',
          when: 'Фаза боя, когда дружественный юнит \'Ardmob выбран для боя.',
          target: 'Этот юнит \'Ardmob.',
          effect: 'Атаки вашего юнита в ближнем бою получают +1 S.',
        },
        {
          name: 'Medi-Squigs',
          nameRu: 'Меди-сквиги',
          flavor: 'Орки захватили с собой мешок Medi-Squigs и теперь раздают этих странных существ, чтобы получить максимальную пользу от их причудливых целительных свойств.',
          when: 'Фаза стрельбы вашего противника, когда вражеский юнит выбирает дружественный юнит \'Ardmob целью.',
          target: 'Этот юнит \'Ardmob.',
          effect: 'У вашего юнита 5+ InSv.',
        },
        {
          name: 'Get Stuck In',
          nameRu: 'Врубайся',
          flavor: 'Вопреки огню врага, уцелевшие орки только сильнее рвутся в бой, желая вбить врага врукопашную.',
          when: 'Фаза стрельбы вашего противника, когда вражеский юнит, который атаковал дружественный не вовлечённый в бой юнит \'Ardmob, произвёл выстрел.',
          target: 'Этот юнит \'Ardmob.',
          effect: 'Ваш юнит может совершить рывок на до D6+1".',
        },
      ],
      enhancements: [
        {
          name: 'Rallying War Cry',
          nameRu: 'Сплачивающий клич',
          flavor: 'Притянутые к битве оглушительными рёвами своего вожака, свежие волны ребят вступают в бой.',
          body: '\'Ardmob Warboss model only. (Once per battle, per unit) In your Command phase, you can use this ability. If you do, return up to D3+2 destroyed bodyguard models to this unit.',
        },
        {
          name: 'Extra Platin’',
          nameRu: 'Лишняя обшивка',
          flavor: 'Экипаж закрепил на корпусе своего Wartrakk дополнительные листы лома и награбленного танкового бронирования, чтобы сделать его прочнее.',
          body: `Улучшение: только юнит 'Ardmob Wartrakk.
▪ 3+ Sv.
▪ 4+ InSv.`,
        },
      ],
      datasheets: [
        {
          id: 'ardmob-warboss',
          abilities: [
            {
              name: "Smash 'Em Up",
              text: `В фазе боя, когда этот юнит выбран для боя, его атаки в ближнем бою получают:
▪ [LETHAL HITS].
▪ Или: [SUSTAINED HITS 1].`,
            },
          ],
          composition: ['1 модель Warboss'],
          loadout: '**Эта модель вооружена:** Kustom Choppa; Kustom Shoota.',
          leader: {
            text: 'Эта модель может быть прикреплена к следующим юнитам:',
          },
        },
        {
          id: 'ardmob-weirdboy',
          abilities: [
            {
              name: 'Totem of Mork (Psychic)',
              text: 'В конце вашей фазы командования, если этот юнит контролирует цель, эта цель считается захваченной.',
            },
          ],
          composition: ["1 модель 'Ardmob Weirdboy"],
          loadout: '**Эта модель вооружена:** Psychic Powers; Waaagh! Staff.',
          leader: {
            text: 'Эта модель может быть прикреплена к следующим юнитам:',
          },
        },
        {
          id: 'ardmob-wartrakk',
          abilities: [
            {
              name: 'Indiscriminate Detonations',
              text: `В фазе стрельбы, когда этот юнит стрелял, выберите один вражеский юнит, по которому пришлись эти атаки. Этот юнит подавлен до начала вашего следующего хода:
▪ Пока юнит подавлен, его атаки получают -1 к броскам попадания.`,
            },
          ],
          composition: ['1 модель Wartrakk'],
          loadout: '**Эта модель вооружена:** Choppas; Kustom Shoota; Rokkit Launcha.',
        },
        {
          id: 'ardmob-boyz',
          abilities: [
            {
              name: 'Grab Dat Scrap',
              text: 'Пока этот юнит находится в рукопашной, у него +1 OC.',
            },
          ],
          composition: ['1 модель Boss Nob', '9 моделей Boyz'],
          loadout: `**Boss Nob вооружён:** Big Choppa; Kombi-rokkit; Kombi-shoota; Slugga.
**Каждый Boyz вооружён:** Choppa; Shoota; Slugga.`,
          options: ['У Boss Nob можно заменить kombi-rokkit и kombi-shoota на 1 kustom shoota.'],
        },
        {
          id: 'ardmob-gretchin',
          abilities: [
            {
              name: 'Grot Infestation (Once per battle per unit)',
              text: `Когда этот юнит уничтожен, вы можете использовать эту способность. Если делаете это:
▪ Поместите этот юнит в стратегический резерв с возвращёнными в него всеми уничтоженными моделями. Этот юнит больше не уничтожен.
▪ У этого юнита есть Deep Strike.`,
            },
          ],
          composition: ['10 моделей Gretchin'],
          loadout: '**Каждая модель вооружена:** Blasta; Lobbin\' Bombs; Scavenged Shivs.',
        },
      ],
    },
    {
      name: "T'au Empire",
      rule: {
        nameRu: 'Скоординированное уничтожение',
        flavor: 'Объединяя огонь, Sudden Dawn Cadre делают ставку на уничтожение одной цели прежде, чем перейти к следующей.',
        body: '(Один раз за битву, на армию) Когда дружественный юнит Sudden Dawn Cadre выбран для стрельбы, вы можете использовать эту способность. Если делаете это, выберите один вражеский юнит. Атаки дружественных юнитов Sudden Dawn Cadre, направленные на этот вражеский юнит, получают +1 AP до конца битвы.',
      },
      armyRule: {
        nameRu: 'Дроны',
        body: `Если у вас улучшена модель, чтобы у неё был дрон, рядом с ней поместите жетон Drone. Они не считаются моделями ни для каких правил.

### Shield Drone | Дрон-щит
Добавьте 1 к характеристике Wounds носителя.

### For the Greater Good | Ради всеобщего блага
Если ваша армия относится к фракции T'au Empire, в начале фазы стрельбы вы можете выбрать юниты вашей армии с этой способностью, чтобы сделать их Observer units.

Во время вашей фазы стрельбы для каждого юнита Observer вашей армии, который не был выбран для стрельбы в этой фазе и способен стрелять (за исключением Fortification и Battle-shocked units), выберите один вражеский юнит, который виден, чтобы пометить его как Spotted unit до конца фазы. Каждый вражеский юнит может быть помечен как Spotted unit лишь один раз за фазу.

Юниты вашей армии со способностью For the Greater Good (за исключением Observer units) являются Guided units, когда целью становятся одна или более Spotted units.

До конца фазы каждый раз, когда модель из вашей армии в Guided unit совершает атаку, нацеленную на Spotted unit, улучшайте характеристику Ballistic Skill этой атаки на 1, а если Spotted unit был помечен Observer unit со словом Markerlight, эта атака получает способность [IGNORES COVER].`,
      },
      stratagems: [
        {
          name: 'Suppressing Fire',
          nameRu: 'Подавляющий огонь',
          flavor: 'Целясь в позиции врага плотным шквальным огнём, стрелки T\'au удерживают его на месте, давая себе время для перегруппировки.',
          when: 'Ваша фаза стрельбы, когда дружественный юнит Sudden Dawn Cadre Infantry произвёл выстрел.',
          target: 'Этот юнит Sudden Dawn Cadre Infantry.',
          effect: `Выберите один вражеский юнит, по которому пришлись эти атаки. Этот вражеский юнит будет pinned до начала вашей следующей фазы командования:
▪ Пока юнит pinned, у него -2" M.`,
        },
        {
          name: 'Rapid Acquisition',
          nameRu: 'Быстрое закрепление',
          flavor: 'Закрепившись на спорной территории, Sudden Dawn Cadre редко задерживаются на ней, предпочитая уничтожать врага.',
          when: 'В конце вашей фазы перемещения.',
          target: 'Один дружественный юнит Sudden Dawn Cadre.',
          effect: 'Выберите один объект, который контролирует ваш юнит. Этот объект будет secured.',
        },
        {
          name: 'Swift Embarkation',
          nameRu: 'Стремительная посадка',
          flavor: 'Отлично обученные в механизированной войне, воины T\'au быстро и организованно занимают свои транспортные средства, задолго до того, как враг успеет воспользоваться их уязвимостью.',
          when: 'В конце фазы боя вашего противника.',
          target: 'Один дружественный не вовлечённый в бой юнит Sudden Dawn Cadre Infantry, который был способен сражаться в этой фазе, целиком находится в пределах 6" от дружественного юнита Sudden Dawn Cadre Transport и способен погрузиться в этот Transport unit.',
          effect: 'Ваш юнит погружается в этот Transport unit.',
        },
      ],
      enhancements: [
        {
          name: 'Earth Caste Modifications',
          nameRu: 'Модификации касты Земли',
          flavor: 'Усиленный искусством касты Земли, этот Enforcer Battlesuit получает улучшенную телеметрию скорострельности, позволяющую эффективно подавлять врага и аккуратно вводить его с низкой орбиты.',
          body: `Только модель Sudden Dawn Cadre Commander in Enforcer Battlesuit.
▪ Когда этот юнит стрелял, вы можете выбрать один вражеский юнит, по которому пришлись эти атаки. Этот вражеский юнит будет suppressed до начала вашего следующего хода: пока юнит suppressed, его атаки получают -1 к броскам попадания.
▪ Когда этот юнит делает ingress move, его можно выставить более чем на 6" по горизонтали от всех вражеских юнитов (вместо более чем на 8"). Если делаете это, он не может объявить атаку до конца хода.`,
        },
        {
          name: 'Proximity Scanners',
          nameRu: 'Сканеры сближения',
          flavor: 'Оснащённые сверхчувствительными сканерами, эти машины передают целевые данные пассажирам, позволяя им сразу же привести своё pulse-оружие в действие и обрушить на врага смертоносный огонь с момента высадки.',
          body: 'Улучшение: только юнит Sudden Dawn Cadre Devilfish. Когда дружественный юнит, находящийся в этом юните, выходит из него, у этого дружественного юнита pulse blaster и pulse carbine получают +1 A.',
        },
      ],
      datasheets: [
        {
          id: 'sudden-dawn-cadre-pathfinder-team',
          abilities: [
            { name: 'Grav-inhibitor Drone', text: 'Когда вражеский юнит выбирает этот юнит целью для рывка в атаку, бросок на рывок получает -2.' },
            { name: 'Target Uploaded', text: `Атаки этого юнита, нацеленные на его Spotted unit, получают:
▪ +1 BS.
▪ [IGNORES COVER].` },
          ],
          composition: [
            '1 модель Pathfinder Shas\'ui',
            '3 модели Pathfinder с Pulse Pistol, Rail Rifle и Close Combat Weapon',
            '6 моделей Pathfinder с Pulse Carbine, Pulse Pistol и Close Combat Weapon',
          ],
          loadout: `**Pathfinder Shas'ui вооружён:** Gun Stocks; Pulse Carbine; Pulse Pistol.
**Каждый Pathfinder с Pulse Pistol, Rail Rifle и Close Combat Weapon вооружён:** Gun Stocks; Pulse Pistol; Rail Rifle.
**Каждый Pathfinder с Pulse Carbine, Pulse Pistol и Close Combat Weapon вооружён:** Gun Stocks; Pulse Carbine; Pulse Pistol.`,
        },
        {
          id: 'sudden-dawn-cadre-breacher-team',
          abilities: [
            { name: 'Breach and Clear', text: 'Атаки этого юнита на расстоянии, направленные на юнит в пределах досягаемости цели, могут перебрасывать броски ран.' },
          ],
          composition: ['1 модель Sha\'sui', '9 моделей Breacher Team'],
          loadout: '**Каждая модель вооружена:** Gun Stocks; Pulse Blaster; Pulse Pistol.',
        },
        {
          id: 'sudden-dawn-cadre-devilfish',
          abilities: [
            { name: 'Rapid Disembark', text: 'Когда юнит, находившийся внутри этой модели, совершает выход из транспорта с режимами rapid disembark/tactical disembark, дистанция выставления составляет 6".' },
          ],
          transport: 'У этой модели транспортная вместимость 12 Infantry моделей. Она не может перевозить модели Battlesuit, Kroot или Vespid Stingwings.',
          composition: ['1 модель Devilfish'],
          loadout: '**Эта модель вооружена:** Accelerator Burst Cannon; Armoured Hull; Twin Pulse Carbine.',
        },
        {
          id: 'commander-cloudspear',
          abilities: [
            { name: 'Shield Drone', text: 'У этой модели +1 W.' },
            { name: 'Superior Weapon Support System', text: `Атаки этой модели на расстоянии могут игнорировать модификаторы к:
▪ BS.
▪ Броскам попадания.` },
          ],
          composition: ['1 модель Commander Cloudspear'],
          loadout: '**Эта модель вооружена:** Airbursting Fragmentation Projector; Battlesuit Fists; Plasma Rifle.',
        },
      ],
    },
    {
      name: 'Astra Militarum',
      rule: {
        nameRu: 'Опытные ветераны',
        flavor: 'Жёсткие и дисциплинированные перед даже самым многочисленным врагом, части Дрейдена делают каждую свою очередь огня по-настоящему весомой.',
        body: `▪ Дружественные юниты Drayden's Lance могут перебрасывать броски, чтобы определить A оружия.
▪ Дружественные юниты Drayden's Lance могут перебрасывать броски, чтобы определить D атаки.`,
      },
      armyRule: {
        nameRu: 'Голос командования',
        body: `Если ваша армия относится к фракции Astra Militarum, модели Officer с этой способностью могут отдавать Orders. У каждой datasheet Officer будет указано, сколько Orders оно может выдать за раунд битвы и какие юниты могут получить эти Orders. Каждый раз, когда модель Officer отдаёт Order, выберите одну из Orders ниже, затем выберите один дружественный юнит в пределах 6" от этой модели Officer, которому выдана эта Order.

Модели Officer могут выдавать Orders в вашей фазе командования и в конце фазы, в которой они вышли из Transport или были выставлены на поле боя.

До начала вашей следующей фазы командования выбранный юнит затрагивается этой Order. Если не указано иного, единица может быть затронута только одной Order одновременно (любая последующая Order, выданная этому юниту, заменяет текущую). Orders нельзя выдавать юнитам, находящимся в состоянии Battle-shocked, а если юнит, затронутый Order, становится Battle-shocked, эта Order перестаёт действовать на него. Только модели Astra Militarum получают выгоду от Order, выданной их юниту.

### The Orders | Приказы
▪ **Move! Move! Move!** — Добавьте 3" к характеристике Move моделей в этом юните.
▪ **Fix Bayonets!** — Улучшайте характеристику Weapon Skill оружия ближнего боя, которым вооружены модели в этом юните, на 1.
▪ **Take Aim!** — Улучшайте характеристику Ballistic Skill оружия дальнего боя, которым вооружены модели в этом юните, на 1.
▪ **First Rank, Fire! Second Rank, Fire!** — Улучшайте характеристику Attacks Rapid Fire-оружия, которыми вооружены модели в этом юните, на 1.
▪ **Take Cover!** — Улучшайте характеристику Save моделей в этом юните на 1 (это не может улучшить Save лучше чем до 3+).
▪ **Duty and Honour!** — Улучшайте характеристики Leadership и Objective Control моделей в этом юните на 1.`,
      },
      stratagems: [
        {
          name: 'Focus Attacks',
          nameRu: 'Сосредоточенные атаки',
          flavor: 'Определив приоритетную цель, майор Дрейден направляет своих воинов обрушить на неё шквал разрушающего огня.',
          when: 'Ваша фаза командования.',
          target: 'Один дружественный юнит Drayden\'s Lance Officer.',
          effect: `Выберите один вражеский юнит. Атаки дружественных юнитов Drayden's Lance, направленные на этот вражеский юнит, сохраняют следующее до начала вашего следующего хода:
▪ [LETHAL HITS].
▪ [IGNORES COVER], если это дальнобойные атаки.`,
        },
        {
          name: 'First Wave',
          nameRu: 'Первая волна',
          flavor: 'Работая как авангард более крупных сил Astra Militarum, Дрейден и его люди закрепляются на вражеской территории.',
          when: 'В конце вашей фазы перемещения.',
          target: 'Один дружественный юнит Drayden\'s Lance.',
          effect: 'Выберите один объект, который контролирует ваш юнит. Этот объект будет secured.',
        },
        {
          name: 'Veteran Skirmishers',
          nameRu: 'Ветераны-застрельщики',
          flavor: 'Лёгко вооружённый отряд скимеров, Дрейден и его люди осторожно избегают увязать в боях, которые не могут выиграть.',
          when: 'Фаза перемещения вашего противника, когда вражеский юнит завершает перемещение в пределах 8" от дружественного не вовлечённого в бой юнита Drayden\'s Lance.',
          target: 'Этот юнит Drayden\'s Lance.',
          effect: 'Ваш юнит может совершить обычное перемещение на до D3+1".',
        },
      ],
      enhancements: [
        {
          name: 'Call Up the Reserves',
          nameRu: 'Призвать резервы',
          flavor: 'В Astra Militarum смерть и травмы — постоянные спутники. Поток свежих резервов всегда готов заполнить пробелы в линии.',
          body: 'Только модель Drayden\'s Lance Officer. (Один раз за битву, на юнит) В начале любой фазы вы можете использовать эту способность. Если делаете это, выберите один дружественный юнит Drayden\'s Lance. Этот юнит восстанавливает D3+2 раны.',
        },
        {
          name: 'Drayden’s Drill',
          nameRu: 'Муштра Дрейдена',
          flavor: 'Скрупулёзный к меткости, майор Дрейден требует от своих солдат долгих часов тренировок и безукоризненного мастерства.',
          body: 'Улучшение: только юнит Drayden\'s Lance Kasrkin. Этот юнит стреляет snap shooting с попаданием на не модифицированных бросках попадания 4+.',
        },
      ],
      datasheets: [
        {
          id: 'draydens-lance-attilan-rough-riders',
          abilities: [
            { name: 'Horsemasters', text: 'Когда этот юнит совершает отступление, это перемещение не мешает ему быть пригодным для стрельбы/объявления атаки.' },
          ],
          composition: [
            '1 модель Rough Rider Sergeant',
            '1 модель Rough Rider с Goad Lance',
            '3 модели Rough Rider с Hunting Lance',
          ],
          loadout: `**Rough Rider Sergeant вооружён:** Hunting Lance – Frag Tip; Lasgun; Laspistol; Power Sabre; Steed's Hooves.
**Rough Rider с Goad Lance вооружён:** Goad Lance; Laspistol; Steed's Hooves.
**Каждый Rough Rider с Hunting Lance вооружён:** Hunting Lance – Frag Tip; Lasgun; Laspistol; Steed's Hooves.`,
        },
        {
          id: 'draydens-lance-command-squad',
          abilities: [
            { name: 'Medi-pack', text: 'У этого юнита Feel No Pain 6+.' },
            { name: 'Orders', text: 'Officer этого юнита может выдать до 2 Orders для юнитов Drayden\'s Lance.' },
            { name: 'Over There', text: 'В начале вашей фазы стрельбы вы можете выбрать один вражеский юнит в пределах 24" от этого юнита. У этого вражеского юнита +3" к диапазону обнаружения.' },
            { name: 'Regimental Standard', text: 'У этого юнита +1 OC.' },
            { name: 'Master Vox', text: 'Когда Officer этой модели выдаёт Order, она может быть выдана любому подходящему юниту в пределах 24".' },
          ],
          composition: [
            '1 модель Cadian Veteran Guardsman',
            '1 модель Cadian Veteran Guardsman с Powerfist',
            '1 модель Cadian Veteran Guardsmen с Medi-pack',
            '1 модель Major Drayden',
          ],
          loadout: `**Cadian Veteran Guardsman вооружён:** Gun Stocks; Lasgun.
**Cadian Veteran Guardsman с Powerfist вооружён:** Bolt Pistol; Power Fist.
**Cadian Veteran Guardsmen с Medi-pack вооружён:** Gun Stocks; Lasgun; Medi-pack.
**Major Drayden вооружён:** Plasma Pistol; Power Weapon.`,
        },
        {
          id: 'draydens-lance-kasrkin',
          abilities: [
            { name: 'Warrior Elite (Once per battle round, per unit)', text: 'В начале любой фазы вы можете использовать эту способность. Если делаете это, выберите одну Order. Эта Order затрагивает этот юнит в дополнение к любым другим Orders, выданным ему, до начала вашей следующей фазы командования.' },
            {
              name: 'Melta Mine (Once per battle, per unit)',
              text: `В начале любой фазы вы можете использовать эту способность. Если делаете это, выберите один вражеский юнит в пределах 3" от этой модели и бросьте один D6. На 2+:
▪ Этот вражеский юнит получает D3 смертельных ран.
▪ Или: если этот вражеский юнит имеет Vehicle, он получает 2D3 смертельных ран.`,
            },
            { name: 'Vox-caster', text: `Когда вы используете против этого юнита стратагему, бросьте один D6, с +1 к результату, если в пределах 6" от этого юнита находится дружественная модель Officer:
▪ На 5+ вы получаете 1 CP.` },
          ],
          composition: [
            '1 модель Kasrkin Sergeant',
            '1 модель Kasrkin Trooper с Flamer',
            '1 модель Kasrkin Trooper с Grenade Launcher',
            '1 модель Kasrkin Trooper с Hot-shot Marksman Rifle',
            '1 модель Kasrkin Trooper с Hot-shot Volley Gun',
            '1 модель Kasrkin Trooper с Melta Mine',
            '1 модель Kasrkin Trooper с Plasma Gun',
            '3 модели Kasrkin Trooper',
          ],
          loadout: `**Kasrkin Sergeant вооружён:** Chainsword; Plasma Pistol.
**Kasrkin Trooper с Flamer вооружён:** Flamer; Gun Stocks.
**Kasrkin Trooper с Grenade Launcher вооружён:** Grenade Launcher; Gun Stocks.
**Kasrkin Trooper с Hot-shot Marksman Rifle вооружён:** Gun Stocks; Hot-shot Marksman Rifle.
**Kasrkin Trooper с Hot-shot Volley Gun вооружён:** Gun Stocks; Hot-shot Volley Gun.
**Kasrkin Trooper с Melta Mine вооружён:** Gun Stocks; Hot-shot laspistol; Melta Mine (Один раз за битву, на юнит).
**Kasrkin Trooper с Plasma Gun вооружён:** Gun Stocks; Plasma Gun.
**Каждый Kasrkin Trooper вооружён:** Gun Stocks; Hot-shot Lasgun.`,
        },
      ],
    },
    {
      name: 'Adepta Sororitas',
      rule: {
        nameRu: 'Благословенные верующие',
        flavor: 'Вера Adepta Sororitas горит особенно ярко в бою. По их убеждению, God-Emperor защищает ревностных и направляет руки праведных.',
        body: `▪ Атаки ближнего боя, направленные на дружественные юниты Sanctuary Guardians, получают -1 к броскам попадания.
▪ При игре в битве Combat Patrol в вашей фазе командования вы можете сбросить 1 кубик Miracle. Если делаете это, вы получаете 1 CP.`,
      },
      armyRule: {
        nameRu: 'Деяния веры',
        body: `Если ваша армия относится к фракции Adepta Sororitas, каждый юнит вашей армии с этой способностью может совершить один Act of Faith за фазу. Это делается с помощью кубиков Miracle.

### Gaining Miracle Dice | Получение кубиков Miracle
Если ваша армия относится к фракции Adepta Sororitas, вы получаете 1 кубик Miracle:
▪ В начале каждого раунда битвы.
▪ Каждый раз, когда уничтожается юнит Adepta Sororitas из вашей армии.

Каждый раз, когда вы получаете кубик Miracle, бросьте один D6. Выпавшее число — значение этого кубика Miracle. Его нельзя изменить или перебросить, если правило специально не говорит об обратном. Храните кубики Miracle в стороне — это ваш пул Miracle dice.

### Performing an Act of Faith | Совершение Act of Faith
Перед тем как сделать бросок для модели или юнита из вашей армии со способностью Acts of Faith, если у вас есть один или более кубиков в пуле Miracle dice, этот юнит может совершить Act of Faith. Если делает это, выберите один из кубиков из своего пула Miracle dice, чтобы заменить этот бросок (если бросок включает в себя более одного кубика, например Charge roll или Battle-shock test, можно заменить только один кубик). Кубик, который заменяют, не бросают; вместо этого используется значение выбранного кубика Miracle, будто он уже был брошен (это считается не модифицированным броском с таким значением для всех правил). Каждый кубик Miracle можно выбрать для замены только один раз. После того как все замены Miracle dice совершены, уберите выбранные кубики из пула Miracle dice и бросьте все оставшиеся, не заменённые кубики, входящие в состав броска. Вы можете использовать Miracle dice, когда юнит совершает Act of Faith для любого из следующих типов бросков:
▪ Advance roll
▪ Battle-shock test
▪ Charge roll
▪ Damage roll
▪ Hit roll
▪ Saving throw
▪ Wound roll`,
      },
      stratagems: [
        {
          name: 'Take Cover',
          nameRu: 'Укрыться',
          flavor: 'Когда они прячутся в густом террейне, бронеподобные Battle Sisters становятся поразительно живучими и чрезвычайно трудно выжить из укрытия.',
          when: 'Фаза стрельбы вашего противника или фаза боя, когда вражеский юнит выбирает дружественный юнит Sanctuary Guardians целью (за исключением юнитов Arco-flagellants), находясь в террейне.',
          target: 'Этот юнит Sanctuary Guardians.',
          effect: 'У вашего юнита +1 Sv.',
        },
        {
          name: 'Fervent Devotion',
          nameRu: 'Пылкая преданность',
          flavor: 'Пока битва разгорается и их сердца наполняются пылом, верные God-Emperor стремятся ещё сильнее уничтожить Его врагов.',
          when: 'Ваша фаза перемещения, когда дружественный юнит Sanctuary Guardians выбран для продвижения/отступления.',
          target: 'Этот юнит Sanctuary Guardians.',
          effect: 'Это перемещение не мешает вашему юниту быть подходящим для стрельбы/объявления атаки.',
        },
        {
          name: 'Fires of Damnation',
          nameRu: 'Огни проклятия',
          flavor: 'Что может быть лучше для ереси, чем огонь? Flamers Ministorum, зажжённые и благословлённые самыми благочестивыми клириками, горят так же ярко, как собственный гнев God-Emperor.',
          when: 'Ваша фаза стрельбы или фаза боя, когда дружественный юнит Sanctuary Guardians выбран для атаки.',
          target: 'Этот юнит Sanctuary Guardians.',
          effect: `▪ Оружия вашего юнита с Torrent имеют 6 A.
▪ Атаки вашего юнита получают +1 AP.`,
        },
      ],
      enhancements: [
        {
          name: 'Righteous Fervour',
          nameRu: 'Праведное рвение',
          flavor: 'С дубинкой, бронёй и ненавистью, Battle Sisters громят и режут врагов веры.',
          body: `Только модель Sanctuary Guardians Canoness.
▪ Атаки этой модели в ближнем бою получают +1 D.
▪ Атаки этого юнита в ближнем бою получают +1 к броскам ран.`,
        },
        {
          name: 'Divine Miracle',
          nameRu: 'Божественное чудо',
          flavor: 'Те, кто воплощает праведный гнев God-Emperor и несёт Его правосудие еретикам и чужакам, могут получить Его священное благословение.',
          body: 'Улучшение: только юнит Sanctuary Guardians Battle Sisters Squad. (Один раз за битву, на юнит) В начале любой фазы вы можете использовать эту способность. Если делаете это, этот юнит восстанавливает D3+2 раны.',
        },
      ],
      datasheets: [
        {
          id: 'sanctuary-canoness-adalya',
          abilities: [
            { name: 'Null Rod', text: 'У этого юнита Feel No Pain 4+ против смертельных ран и Psychic-атак.' },
            { name: 'Divine Guidance (Once per turn per unit)', text: 'Когда дружественный юнит Sanctuary Guardians выбран для атаки, вы можете использовать эту способность. Если делаете это, атаки этого юнита могут перебрасывать броски попадания.' },
          ],
          composition: ['1 модель Canoness Adalya'],
          loadout: '**Эта модель вооружена:** Condemnor Boltgun; Hallowed Chainsword; Null Rod.',
          leader: { text: 'Эта модель может быть прикреплена к следующим юнитам:' },
        },
        {
          id: 'sanctuary-guardians-celestian-sacresants',
          abilities: [
            { name: 'Sworn Protectors', text: 'Когда вражеский юнит выбирает этот юнит целью, если у этого юнита есть Adepta Sororitas Character, атаки, направленные на него, получают -1 к броскам ран.' },
          ],
          composition: ['1 модель Sacresant Superior', '4 модели Celestian Sacresants'],
          loadout: '**Каждая модель вооружена:** Bolt Pistol; Hallowed Mace.',
        },
        {
          id: 'sanctuary-guardians-arco-flagellants',
          abilities: [
            { name: 'Extremis Trigger Word', text: `Когда этот юнит выбран для боя, вы можете использовать эту способность. Если делаете это:
▪ Оружия этого юнита arco-flails имеют 6 A.
▪ Атаки этого юнита в ближнем бою получают [HAZARDOUS].` },
          ],
          composition: ['10 моделей Arco-Flagellents'],
          loadout: '**Каждая модель вооружена:** Arco-flails.',
        },
        {
          id: 'sanctuary-guardians-battle-sisters-squad',
          abilities: [
            { name: 'Defenders of the Faith', text: 'В конце вашей фазы командования, если этот юнит контролирует цель, эта цель считается захваченной.' },
            { name: 'Cherub (Once per battle per unit)', text: 'Когда этот юнит совершил Act of Faith, вы можете использовать эту способность. Если делаете это, вы получаете 1 кубик Miracle.' },
            { name: 'Simulacrum Imperialis', text: `В конце вашей фазы командования за каждый объект, который вы контролируете и на котором находится дружественный юнит с этой способностью, бросьте один D6:
▪ На 4+ вы получаете 1 кубик Miracle со значением, равным результату броска.` },
          ],
          composition: [
            '1 модель Battle Sister с Ministorum Flamer',
            '1 модель Battle Sister с Ministorum Heavy Flamer',
            '1 модель Battle Sister с Simulacrum Imperialis',
            '1 модель Sister Superior',
            '6 моделей Battle Sister',
          ],
          loadout: `**Battle Sister с Ministorum Flamer вооружена:** Bolt Pistol; Ministorum Flamer; Stocks and Fists.
**Battle Sister с Ministorum Heavy Flamer вооружена:** Bolt Pistol; Ministorum Heavy Flamer; Stocks and Fists.
**Battle Sister с Simulacrum Imperialis вооружена:** Boltgun; Bolt Pistol; Simulacrum Imperialis; Stocks and Fists.
**Sister Superior вооружена:** Bolt Pistol; Combi-weapon; Power Weapon; Stocks and Fists.
**Каждая Battle Sister вооружена:** Boltgun; Bolt Pistol; Stocks and Fists.`,
        },
      ],
    },
    {
      name: 'Adeptus Custodes',
      rule: {
        nameRu: 'Бесстрашны и неумолимы',
        flavor: 'Блейд Чемпион Тристраен и его товарищи снискали славу за бесстрашную агрессию. Всегда именно он ведёт их в атаку, а его соратники идут за ним волнами, чтобы уничтожить врага.',
        body: `▪ (Один раз за ход, на армию) Один дружественный юнит Tristraen's Gilded Blades может перебрасывать проверку морального духа.
▪ При игре в битве Combat Patrol следующие дружественные юниты должны начинать битву в стратегическом резерве и не могут быть выставлены на поле боя до указанного раунда битвы, а когда это произойдёт, должны быть выставлены целиком в вашей зоне развертывания: Gilded Blades Custodian Wardens (раунд битвы 2), Gilded Blades Allarus Custodians (раунд битвы 3).`,
      },
      armyRule: {
        nameRu: 'Боевой Ка’тах',
        flavor: 'Специализированные дисциплины, которыми Кастодии овладевают за десятилетия, если не века, — каждый ka\'tah даёт практикующему превосходство над любым противником в определённой дисциплине или философии. Боевые ka\'tah позволяют воинам Adeptus Custodes применять стойки, движения, военные философии и смертоносные навыки, усиливающие их и без того устрашающее боевое мастерство и направляющие его против конкретных угроз.',
        body: `Каждый раз, когда юнит вашей армии с этой способностью выбран для боя, выберите одну из Stances Ka\'tah ниже. Пока этот юнит не закончил свои атаки, выбранная Stance активна для него, и он получает соответствующую способность:

### Dacatari Stance | Стойка Dacatari
Оружие ближнего боя, которым вооружены модели в этом юните, получает способность [SUSTAINED HITS 1].

### Rendax Stance | Стойка Rendax
Оружие ближнего боя, которым вооружены модели в этом юните, получает способность [LETHAL HITS].`,
      },
      stratagems: [
        {
          name: 'Gilded Spear',
          nameRu: 'Позолоченное копьё',
          flavor: 'Врываясь с неукротимой яростью и скоростью, Кастодии пронзают вражескую линию и уходят вглубь, чтобы нанести смертельный удар.',
          when: 'Фаза боя, когда дружественный юнит Tristraen\'s Gilded Blades выбран для совершения перегруппировки.',
          target: 'Этот юнит Tristraen\'s Gilded Blades.',
          effect: 'При совершении этой перегруппировки ваш юнит может переместиться на до D3+3".',
        },
        {
          name: 'Inevitable Wrath',
          nameRu: 'Неотвратимый гнев',
          flavor: 'Когда на него обрушивается вражеский огонь, Тристраен из Gilded Blades движется навстречу нападающим с местью в душе.',
          when: 'Фаза стрельбы вашего противника, когда вражеский юнит стрелял.',
          target: 'Один дружественный не вовлечённый в бой юнит Tristraen\'s Gilded Blades Blade Champion, который потерял рану из-за этих атак.',
          effect: 'Ваш юнит может совершить рывок на до D6+1".',
        },
        {
          name: 'Never Outmatched',
          nameRu: 'Никогда не превзойдены',
          flavor: 'Когда рядом падают товарищи, ярость Кастодиев достигает новых высот, и они сражаются с дикостью и жестокостью загнанных львов.',
          when: 'Фаза боя, когда дружественный юнит Tristraen\'s Gilded Blades, который ниже начальной численности, выбран для боя.',
          target: 'Этот юнит Tristraen\'s Gilded Blades.',
          effect: 'Атаки вашего юнита в ближнем бою получают +1 A.',
        },
      ],
      enhancements: [
        {
          name: 'Shattering Charge',
          nameRu: 'Сокрушительный рывок',
          flavor: 'Усиленный генетической алхимией и мастерством боя, выработанным за столетия, Тристраен из Gilded Blades — ужасающий противник. Даже самые чудовищные и черствые враги дрогнут перед его сокрушительным рывком.',
          body: 'Только модель Tristraen\'s Gilded Blades Blade Champion. Когда этот юнит завершает рывок в атаку, вы можете выбрать один вражеский юнит, находящийся в рукопашной с этим юнитом. Если делаете это, этот вражеский юнит проходит проверку морального духа с -1 к этой проверке.',
        },
        {
          name: 'Comrades in Wrath',
          nameRu: 'Товарищи по гневу',
          flavor: 'Товарищи Тристраена в течение десятилетий делят с ним ненависть к врагам Императора. Они охотно бросаются в пасть опасности, чтобы обрушить на неё кровавую ярость.',
          body: 'Улучшение: только юнит Gilded Blades Allarus Custodians. У этого юнита +1 к броскам на рывок в атаку.',
        },
      ],
      datasheets: [
        {
          id: 'tristraen-of-the-gilded-blades',
          abilities: [
            { name: 'Rapid Strike', text: 'Этот юнит может перебрасывать броски продвижения.' },
          ],
          composition: ['1 модель Tristraen'],
          loadout: '**Эта модель вооружена:** Vaultswords.',
        },
        {
          id: 'gilded-blades-custodian-guard',
          abilities: [
            { name: 'Sentinel Storm', text: '(Один раз за битву, на юнит) В фазе стрельбы, когда этот юнит стрелял, вы можете использовать эту способность. Если делаете это, этот юнит может стрелять ещё раз.' },
            { name: 'Stand Vigil', text: `Атаки этого юнита в ближнем бою:
▪ Могут перебрасывать броски ран 1.
▪ Или: направленные на юнит в пределах досягаемости цели могут перебрасывать броски ран.` },
            { name: 'Praesidium Shield', text: 'У этой модели +1 W.' },
          ],
          composition: ['3 модели Custodian Guard'],
          loadout: '**Каждая модель вооружена:** Praesidium Shield; Sentinel Blade.',
        },
        {
          id: 'gilded-blades-allarus-custodians',
          abilities: [
            { name: 'Slayers of Tyrants', text: 'Атаки этого юнита, направленные на Character/Monster/Vehicle, могут перебрасывать броски ран.' },
            { name: 'From Golden Light (Once per battle, per unit)', text: 'В конце хода противника, если этот юнит не находится в рукопашной, вы можете использовать эту способность. Если делаете это, поместите этот юнит в стратегический резерв.' },
          ],
          composition: ['2 модели Allarus Custodian', '2 модели Allarus Custodians'],
          loadout: '**Каждая модель вооружена:** Balistus Grenade Launcher; Guardian Spear.',
        },
        {
          id: 'gilded-blades-custodian-wardens',
          abilities: [
            { name: 'Divine Protection', text: 'У этого юнита Feel No Pain 4+ против смертельных ран.' },
          ],
          composition: ['1 модель Custodian Warden с Castellan Axe', '2 модели Custodian Warden с Guardian Spear'],
          loadout: `**Custodian Warden с Castellan Axe вооружён:** Castellan Axe.
**Каждый Custodian Warden с Guardian Spear вооружён:** Guardian Spear.`,
        },
      ],
    },
    {
      name: 'Adeptus Mechanicus',
      rule: {
        nameRu: 'Перегрузка императивов',
        flavor: 'Ноосфера гудит от активности, пока Сканд наполняет мозги своих кибернетических слуг дополнительными императивами, придавая его аугментированным воинам ещё большую живучесть и смертоносность.',
        body: 'В начале раунда битвы вы можете выбрать один дружественный юнит Purge Corps Deltic-9. Если делаете это, у этого юнита будут обе способности Doctrina Imperative до конца раунда битвы.',
      },
      armyRule: {
        nameRu: 'Императивы Доктрины',
        flavor: 'Армия Adeptus Mechanicus, идущая на войну, — зрелище и ужасающее, и великолепное: каждый священный воин — тревожное слияние человека и машины. Правящие Тех-жрецы и их фанатичные последователи возносят изменённые голоса во славу Бога-Машины, управляя своим кибернетическим воинством и механическими созданиями через doctrina imperatives, закодированные так, чтобы усиливать и адаптировать способности воинов.',
        body: `В начале раунда битвы вы можете выбрать один из Doctrina Imperatives ниже. До конца раунда битвы этот Doctrina Imperative активен для вашей армии, и все юниты вашей армии, имеющие способность Doctrina Imperatives, получают соответствующие способности, показанные ниже.

### Protector Imperative | Императив защитника
▪ Оружие дальнего боя, которым вооружены модели в этом юните, получает способность [HEAVY].
▪ Улучшайте характеристику Ballistic Skill дальнобойного оружия, которым вооружены модели в этом юните, на 1.
▪ Каждый раз, когда атака ближнего боя нацелена на этот юнит, если у него есть ключевое слово Battleline и/или он находится в пределах 6" от одного или более дружественных Battleline-юнитов Adeptus Mechanicus, вычитайте 1 из броска попадания.

### Conqueror Imperative | Императив завоевателя
▪ Оружие дальнего боя, которым вооружены модели в этом юните, получает способность [ASSAULT].
▪ Улучшайте характеристику Weapon Skill оружия ближнего боя, которым вооружены модели в этом юните, на 1.
▪ Каждый раз, когда модель в этом юните совершает атаку, если у него есть ключевое слово Battleline и/или он находится в пределах 6" от одного или более дружественных Battleline-юнитов Adeptus Mechanicus, улучшайте Armour Penetration этой атаки на 1.`,
      },
      stratagems: [
        {
          name: 'Lockdown Protocols',
          nameRu: 'Протоколы блокировки',
          flavor: 'По команде Бинхарика эти воины прочно занимают свои позиции и готовятся удерживать захваченный участок.',
          when: 'Фаза стрельбы вашего противника или фаза боя, когда вражеский юнит выбирает дружественный юнит Purge Corps Deltic-9 целью, находясь в пределах досягаемости цели.',
          target: 'Этот юнит Purge Corps Deltic-9.',
          effect: 'Атаки, направленные на ваш юнит, получают -1 к броскам ран.',
        },
        {
          name: 'Preservation Imperatives',
          nameRu: 'Императивы сохранения',
          flavor: 'Хотя механические солдаты и расходуемы, Сканд не тратит свои инструменты бездумно. Когда выживание становится приоритетом, загруженные императивы могут предписывать тактику огня и перемещения, чтобы держать врага на расстоянии и в пределах оптимальной зоны поражения.',
          when: 'Ваша фаза стрельбы, когда дружественный не вовлечённый в бой юнит Purge Corps Deltic-9 выстрелил.',
          target: 'Этот юнит Purge Corps Deltic-9.',
          effect: `▪ Ваш юнит может совершить обычное перемещение на до D3+1".
▪ Ваш юнит не может объявить атаку до конца хода.`,
        },
        {
          name: 'Optimised Targeting',
          nameRu: 'Оптимизированное наведение',
          flavor: 'Оптимизированные импульсные модули могут активироваться, чтобы обеспечить бесшовную интеграцию между мозговыми кортиксами и целеуказателями, значительно повышая точность.',
          when: 'Ваша фаза стрельбы, когда дружественный юнит Purge Corps Deltic-9 выбран для стрельбы.',
          target: 'Этот юнит Purge Corps Deltic-9.',
          effect: 'Атаки вашего юнита на расстоянии могут перебрасывать броски попадания 1.',
        },
      ],
      enhancements: [
        {
          name: 'Miniaturised Autosimulacra',
          nameRu: 'Миниатюризированные автосимулякры',
          flavor: 'Воины Сканда получают миниатюрные автосимулякры. После активации они могут ремонтировать повреждения аугметических компонентов, удерживая тех-провинта в бою.',
          body: 'Только модель Purge Corps Deltic-9 Tech-Priest Manipulus. (Один раз за битву, на юнит) В начале любой фазы вы можете использовать эту способность. Если делаете это, выберите один дружественный юнит Purge Corps Deltic-9. Этот юнит восстанавливает D3+2 раны.',
        },
        {
          name: 'Empowered Mechanisms',
          nameRu: 'Усиленные механизмы',
          flavor: 'Мастер аугментации, Манипулус Сканд оснастит своих Серберисов усиленными сервоприводами и зарядит их оружейные элементы мощными импульсами двигательной силы.',
          body: `Улучшение: только юнит Purge Corps Serberys Sulphurhounds.
▪ Атаки этого юнита на расстоянии получают [ANTI-INFANTRY 4+].
▪ Этот юнит может перебрасывать броски, чтобы определить A оружия.`,
        },
      ],
      datasheets: [
        {
          id: 'purge-corps-serberys-sulphurhounds',
          abilities: [
            { name: 'Pinning Fire', text: `В фазе стрельбы, когда этот юнит стрелял, вы можете выбрать один вражеский юнит, по которому пришлись эти атаки. Если делаете это, этот вражеский юнит будет pinned до начала вашего следующего хода:
▪ Пока юнит pinned, он:
▪ Имеет -2" M.
▪ Имеет -2 к броскам на рывок в атаку.` },
          ],
          composition: [
            '1 модель Serberys Sulphurhound',
            '1 модель Serberys Sulphurhound Alpha',
            '1 модель Serberys Sulphurhound с Phosphor Pistols',
          ],
          loadout: `**Serberys Sulphurhound вооружён:** Clawed Limbs; Phosphor Blast Carbine; Phosphor Pistol; Sulphur breath.
**Serberys Sulphurhound Alpha вооружён:** Cavalry Arc Maul; Clawed Limbs; Mechanicus Pistol; Sulphur breath.
**Serberys Sulphurhound с Phosphor Pistols вооружён:** Clawed Limbs; 2 Phosphor Pistol; Sulphur breath.`,
        },
        {
          id: 'purge-corps-pteraxii-sterylizors',
          abilities: [
            { name: 'Searing Conflagration', text: `Атаки этого юнита phosphor torch, направленные на юнит в пределах досягаемости цели:
▪ Могут перебрасывать броски ран 1.
▪ Или: если этот юнит находится в пределах 6" от дружественного Battleline-юнита Adeptus Mechanicus, могут перебрасывать броски ран.` },
          ],
          composition: ['1 модель Pteraxii Sterylizor Alpha', '4 модели Pteraxii Sterylizor'],
          loadout: `**Pteraxii Sterylizor Alpha вооружён:** Flechette Blaster; Taser Goad.
**Каждый Pteraxii Sterylizor вооружён:** Phosphor Torch; Talons.`,
        },
        {
          id: 'manipulus-skand',
          abilities: [
            { name: 'Defend the Divine Work (Once per battle, per unit)', text: 'В начале фазы вы можете использовать эту способность. Если делаете это, у этого юнита будет 4+ InSv до конца фазы.' },
            { name: 'Mechanical Guidance (Once per turn, per unit)', text: 'Когда дружественный юнит Purge Corps Deltic-9, видимый для этой модели или в пределах 12" от неё, выбран для атаки, вы можете использовать эту способность. Если делаете это, атаки этого юнита могут перебрасывать броски ран.' },
          ],
          composition: ['1 модель Manipulus Skand'],
          loadout: '**Эта модель вооружена:** Omnissian Staff; Transonic Cannon.',
          leader: { text: 'Эта модель может быть прикреплена к следующим юнитам:' },
        },
        {
          id: 'purge-corps-skitarii-vanguard',
          abilities: [
            { name: 'Omnispex', text: 'Атаки этого юнита на расстоянии получают [IGNORES COVER].' },
            { name: 'Rad-saturation (Aura)', text: 'Пока вражеский юнит (за исключением Vehicle) находится в пределах 3" от этого юнита, у него -1 OC.' },
          ],
          composition: [
            '1 модель Skitarii Vanguard Alpha',
            '1 модель Skitarii Vanguard с Arc Rifle',
            '1 модель Skitarii Vanguard с Plasma Caliver',
            '7 моделей Skitarii Vanguard',
          ],
          loadout: `**Skitarii Vanguard Alpha вооружён:** Alpha's Combat Artefact; Mechanicus Pistol.
**Skitarii Vanguard с Arc Rifle вооружён:** Arc Rifle; Gun Stocks.
**Skitarii Vanguard с Plasma Caliver вооружён:** Gun Stocks; Plasma Caliver.
**Каждый Skitarii Vanguard вооружён:** Gun Stocks; Radium Carbine.`,
        },
      ],
    },
    {
      name: 'Imperial Agents',
      rule: {
        nameRu: 'Обречены на смерть',
        flavor: 'Главные цели представляют собой явную и непосредственную угрозу для дальнейшего существования человечества. Их нужно выследить и уничтожить, какой бы ценой это ни обошлось.',
        body: `В вашей фазе командования вы можете выбрать один вражеский юнит. Атаки дружественных юнитов Inquisitor's Hand, направленные на этот вражеский юнит, получают:
▪ [IGNORES COVER].
▪ [LETHAL HITS].
▪ [PRECISION].`,
      },
      armyRule: {
        nameRu: 'Приданные агенты',
        flavor: 'По всему Империуму существуют многочисленные боевые организации и теневые структуры. Вооружённые отряды или одинокие агенты из этих групп обладают специализированными навыками, необычным снаряжением и личными интересами, которые приводят их к прикомандированию к более крупным имперским армиям. Одних реквизируют командиры армии за их особые способности, других назначают их скрытые хозяева для достижения узких целей. Самые могущественные обладают авторитетом и репутацией, достаточными, чтобы навязать своё присутствие на поле боя.',
        body: `Если ваша армия относится к фракции Agents of the Imperium, то на этапе выбора детачмента вы можете как обычно выбрать один из доступных детачментов из этой публикации.

Если ваша армия не относится к фракции Agents of the Imperium, но каждая модель в вашей армии имеет ключевое слово Imperium, вы можете включить в свою армию юниты Agents of the Imperium даже если они не имеют выбранного вами ключевого слова фракции на этапе выбора армии. В этом случае максимальное число юнитов Agents of the Imperium, которое можно включить в армию, зависит от размера битвы, как показано ниже.

Обратите внимание, что в такую армию можно как обычно включать Dedicated Transport юниты Agents of the Imperium, но каждый такой юнит должен начинать битву с одним или более юнитом внутри него, иначе он не может быть развернут для этой битвы и считается уничтоженным в первом раунде битвы.`,
      },
      stratagems: [
        {
          name: 'Urban Enforcers',
          nameRu: 'Городские силовики',
          flavor: 'Многие агенты Инквизиции происходят из глубин густонаселённых хабов и иных городских сред. Будь то бывшие гангстеры, эскортные силы, охотники за головами или агенты закона, все они — мастера боя в тесных городских условиях.',
          when: 'Фаза стрельбы вашего противника или фаза боя, когда вражеский юнит выбирает дружественный юнит Inquisitor\'s Hand целью, находясь в пределах областиTerrain, при этом все модели внутри этой области.',
          target: 'Этот юнит Inquisitor\'s Hand.',
          effect: 'Атаки, направленные на ваш юнит, получают -1 AP.',
        },
        {
          name: 'Superior Weaponry',
          nameRu: 'Превосходное вооружение',
          flavor: 'Инквизиторы известны тем, что собирают огромные арсеналы эзотерического оружия и снаряжения, которые при необходимости могут быть выданы их агентам в поле.',
          when: 'Ваша фаза стрельбы или фаза боя, когда дружественный юнит Inquisitor\'s Hand (за исключением юнитов Eversor Assassin) выбран для атаки.',
          target: 'Этот юнит Inquisitor\'s Hand.',
          effect: 'Атаки вашего юнита получают +1 AP.',
        },
        {
          name: 'Inquisitorial Mandate',
          nameRu: 'Инквизиторский мандат',
          flavor: 'Агенты Инквизиции обладают полномочиями реквизировать и заявлять всё, что им кажется нужным. Достаточно просто вспыхнуть инквизиторской печатью, чтобы закрепить за собой право на чужую территорию.',
          when: 'В конце вашей фазы перемещения.',
          target: 'Один дружественный юнит Inquisitor\'s Hand (за исключением юнитов Eversor Assassin).',
          effect: 'Выберите один объект, который контролирует ваш юнит. Этот объект будет secured.',
        },
      ],
      enhancements: [
        {
          name: 'Sanctic Slayers',
          nameRu: 'Санктические губители',
          flavor: 'Получив благословение проповедника Тегуэна и усиленные специализированной подготовкой Инквизиции, воины Inquisitor\'s Hand способны с равной эффективностью вступать в бой даже с, казалось бы, гораздо более могущественными противниками.',
          body: 'Только модель Inquisitor\'s Hand Ministorum Priest. (Один раз за ход, на юнит) Когда дружественный юнит Inquisitor\'s Hand выбран для атаки, вы можете использовать эту способность. Если делаете это, атаки этого юнита, направленные на цель с T, равным или большим, чем S этой атаки, получают +1 к броскам ран.',
        },
        {
          name: 'Killer Reflexes',
          nameRu: 'Убийственные рефлексы',
          flavor: 'Ассасины храмов Эверсора — живые инструменты разрушения, не знающие боли, страха и сдержанности. Они неустанны в стремлении убивать и отмахиваются от смертельных ран на пути к своим жертвам.',
          body: 'Только модель Inquisitor\'s Hand Eversor Assassin. В фазе боя, когда эта модель уничтожена, если этот юнит ещё не был выбран для боя в этой фазе, бросьте один D6: на 2+ эту модель не убирают с поля боя. Когда этот юнит уже сражался, или в конце фазы (что наступит раньше), эту модель убирают с поля боя.',
        },
      ],
      datasheets: [
        {
          id: 'preacher-teguen',
          abilities: [
            { name: 'Zealot (Once per battle per unit)', text: 'Когда этот юнит выбран для боя, вы можете использовать эту способность. Если делаете это, атаки этой модели в ближнем бою получают +3 A и S.' },
            { name: 'Holy Hatred', text: 'Если это прикреплённый юнит, атаки этого юнита в ближнем бою получают [SUSTAINED HITS 1].' },
          ],
          composition: ['1 модель Preacher Teguen'],
          loadout: '**Эта модель вооружена:** Zealot\'s Vindictor.',
          leader: { text: 'Эта модель может быть прикреплена к следующим юнитам:' },
        },
        {
          id: 'inquisitors-hand-vigilant-squad',
          abilities: [
            { name: 'Merciless Judgement', text: 'Атаки этого юнита на расстоянии, направленные на юнит ниже половины боевой численности, получают +1 к броскам ран.' },
            { name: 'Nuncio-Aquila', text: 'В начале фазы командования вы можете использовать эту способность. Если делаете это, выберите один объект в пределах 6" от этой модели, который ещё не был выбран для этой способности в этот ход. Вражеские юниты (за исключением Monster/Vehicle) в пределах досягаемости этого объекта должны пройти проверку морального духа.' },
          ],
          composition: [
            '1 модель Cyber-Mastiff',
            '1 модель Proctor-Vigilant',
            '1 модель Vigilant с Grenade Launcher, Shotpistol и Gun Stocks',
            '1 модель Vigilant с Shotpistol, Webber и Gun Stocks',
            '6 моделей Vigilant с Combat Shotgun, Shotpistol и Gun Stocks',
          ],
          loadout: `**Cyber-Mastiff вооружён:** Mechanical Bite.
**Proctor-Vigilant вооружён:** Combat Shotgun; Gun Stocks; Nuncio-Aquila; Shotpistol.
**Vigilant с Grenade Launcher, Shotpistol и Gun Stocks вооружён:** Grenade Launcher; Gun Stocks; Shotpistol.
**Vigilant с Shotpistol, Webber и Gun Stocks вооружён:** Gun Stocks; Shotpistol; Webber.
**Каждый Vigilant с Combat Shotgun, Shotpistol и Gun Stocks вооружён:** Combat Shotgun; Gun Stocks; Shotpistol.`,
        },
        {
          id: 'inquisitors-hand-eversor-assassin',
          abilities: [
            { name: 'Overkill (Once per battle per unit)', text: 'Когда этот юнит выбран для атаки, вы можете использовать эту способность. Если делаете это, атаки этого юнита в ближнем бою получают -4 AP.' },
          ],
          composition: ['1 модель Eversor Assassin'],
          loadout: '**Эта модель вооружена:** Executioner Pistol; Power Sword and Neuro-Gauntlet.',
        },
        {
          id: 'inquisitors-hand-inquisitorial-agents',
          abilities: [
            { name: 'Tome Skull (Once per battle per unit)', text: 'В начале любой фазы вы можете выбрать один дружественный battle-shocked юнит Agents of the Imperium в пределах 6" от этого юнита или один вражеский в пределах 6" от этого юнита. Если выбираете дружественный юнит, он больше не находится в состоянии Battle-shocked. Если выбираете вражеский юнит, он должен пройти проверку морального духа.' },
            { name: 'Loyal To The Cause', text: 'Когда вражеский юнит выбирает этот юнит целью, если этот юнит находится в пределах досягаемости цели, атаки, направленные на этот юнит, получают -1 к броскам ран.' },
          ],
          composition: [
            '1 модель Gun Servitor',
            '1 модель Inquisitorial Agent с Agent\'s Firearm, Agent\'s Implement и Mystic Stave',
            '1 модель Inquisitorial Agent с Agent\'s Firearm, Plasma Pistol и Agent\'s Implement',
            '3 модели Inquisitorial Agent с Agent\'s Firearm и Agent\'s Implement',
          ],
          loadout: `**Gun Servitor вооружён:** Agent's Implement; Heavy Bolter.
**Inquisitorial Agent с Agent's Firearm, Agent's Implement и Mystic Stave вооружён:** Agent's Firearm; Agent's Implement; Mystic Stave; Tome Skull.
**Inquisitorial Agent с Agent's Firearm, Plasma Pistol и Agent's Implement вооружён:** Agent's Firearm; Agent's Implement; Plasma Pistol.
**Каждый Inquisitorial Agent с Agent's Firearm и Agent's Implement вооружён:** Agent's Firearm; Agent's Implement.`,
        },
      ],
    },
    {
      name: 'Aeldari',
      rule: {
        nameRu: 'Изящные воины',
        flavor: 'Даже будучи чудовищами, воины Кигарила движутся мягко и скрываются за психическими искусами их спиритсиры.',
        body: `▪ Дружественные юниты Kygharil's Protectors (за исключением юнитов Kygharil's Protectors Wraithblades) получают Stealth.
▪ Дружественные юниты Kygharil's Protectors (за исключением юнитов Kygharil's Protectors Wraithblades) имеют -3" к дальности обнаружения.`,
      },
      armyRule: {
        nameRu: 'Боевая сосредоточенность',
        flavor: 'В войне, как и во всём прочем, эльдары применяют на практике всю мощь своего разума, мастерства и проворства. В сочетании с их исключительной технологией это делает их движение стремительным и грациозным, что врагу невозможно соперничать.',
        body: `Если ваша армия относится к фракции Asuryani, в начале раунда битвы вы получаете несколько жетонов Battle Focus в зависимости от размера битвы, как показано ниже:
▪ **Incursion:** 2 жетона Battle Focus.
▪ **Strike Force:** 4 жетона Battle Focus.
▪ **Onslaught:** 6 жетонов Battle Focus.

Каждый раз, когда происходит один из триггеров, показанных в разделе Agile Manoeuvres ниже, вы можете потратить один жетон Battle Focus, чтобы дать соответствующему допустимому юниту возможность выполнить этот Agile Manoeuvre. Юнит считается допустимым для выполнения Agile Manoeuvre, если у него есть эта способность и он ещё не выполнял Agile Manoeuvre в той же фазе. Если иное не указано, один и тот же Agile Manoeuvre нельзя триггерить более одного раза за фазу. В конце раунда битвы все неиспользованные жетоны Battle Focus теряются.

### Swift as the Wind | Стремительны как ветер
**TRIGGER:** Когда допустимый юнит вашей армии выбран для обычного, Advance или Fall Back перемещения. Вы можете триггерить этот Agile Manoeuvre более одного раза за фазу (при условии, что каждый раз его выполняет другой юнит).
**EFFECT:** До конца фазы добавьте 2" к характеристике Move моделей в этом юните.

### Flitting Shadows | Мелькающие тени
**TRIGGER:** Когда допустимый юнит вашей армии выбран для обычного, Advance или Fall Back перемещения, выставлен на поле боя или объявляет атаку.
**EFFECT:** До конца хода вражеские юниты не могут использовать Stratagem Fire Overwatch, чтобы стрелять по этому юниту.

### Star Engines | Звёздные двигатели
**TRIGGER:** Когда допустимый юнит Vehicle вашей армии выбран для перемещения Advance.
**EFFECT:** До конца хода дальнобойное оружие, которым вооружён этот юнит, получает способность [ASSAULT].

### Sudden Strike | Внезапный удар
**TRIGGER:** Когда допустимый юнит вашей армии выбран для боя.
**EFFECT:** До конца фазы каждый раз, когда модель в этом юните совершает перемещение в шеренге или консолидируется, она может переместиться на до 6" вместо до 3".

### Opportunity Seized | Использованная возможность
**TRIGGER:** Когда вражеский юнит завершает перемещение Fall Back.
**EFFECT:** Один допустимый юнит вашей армии (за исключением юнитов Titanic), который начал фазу в пределах Engagement Range этого вражеского юнита, может совершить обычное перемещение на до D6+1".

### Fade Back | Отступить в тень
**TRIGGER:** В фазе стрельбы противника сразу после того, как вражеский юнит выстрелил.
**EFFECT:** Один допустимый юнит вашей армии (за исключением юнитов Titanic), по которому попали одна или более этих атак, может совершить обычное перемещение на до D6+1".`,
      },
      stratagems: [
        {
          name: 'Fading Fusillade',
          nameRu: 'Угасающий залп',
          flavor: 'Отступая от врага в притворном отступлении, воины-эльдары открывают огонь с близкой дистанции, срезая цели. ',
          when: "Ваша фаза перемещения, когда дружественный юнит Kygharil's Protectors выбран для отступления.",
          target: 'Этот юнит Kygharil\'s Protectors.',
          effect: 'Это перемещение не мешает вашему юниту быть подходящим для стрельбы.',
        },
        {
          name: 'Suppressing Storm',
          nameRu: 'Подавляющая буря',
          flavor: 'Выпуская шквал шурикенов или потоки режущих мононитей, эти воины подавляют цели, мешая им ответить огнём.',
          when: "Ваша фаза стрельбы, когда дружественный юнит Kygharil's Protectors (за исключением Character-юнитов) выстрелил.",
          target: 'Выберите один вражеский юнит, по которому пришлись эти атаки.',
          effect: 'Этот вражеский юнит находится в состоянии suppressed до начала вашего следующего хода:\n▪ Пока юнит suppressed, его атаки получают -1 к броскам попадания.',
        },
        {
          name: 'Focused Strikes',
          nameRu: 'Сосредоточенные удары',
          flavor: 'Соединяя специализированное вооружение и навыки с максимальной пользой, эльдары обрушивают на выбранные цели сходящийся шторм смертоносного огня, превращая их в кровавый хаос за считаные мгновения.',
          when: 'Начало вашей фазы стрельбы.',
          target: 'Один или более дружественных юнитов Kygharil\'s Protectors.',
          effect: 'Выберите один вражеский юнит. Атаки ваших юнитов на расстоянии, направленные на этот юнит, могут перебрасывать броски ранения 1.',
        },
      ],
      enhancements: [
        {
          name: 'Seer’s Hand',
          nameRu: 'Рука провидца',
          flavor: 'Как спиритсир, Кигарил обеспечивает руководство Ghost Warriors в разгар боя, направляя их удары по самым опасным противникам.',
          body: `Kygharil's Protectors Spiritseer model only. В конце вашей фазы перемещения вы можете выбрать один дружественный юнит Kygharil's Protectors Wraithblades в пределах 12" от этой модели:
▪ Этот юнит восстанавливает D3 раны.
▪ Атаки этого юнита получают [PRECISION] до начала вашей следующей фазы перемещения.`,
        },
        {
          name: 'Guided Jump',
          nameRu: 'Направленный прыжок',
          flavor: 'Руководимые прозрением их крафтвёрлдских провидцев, эти воины-аспекты прибывают раньше союзников, занимая оптимальные позиции для удара по наступающему врагу.',
          body: 'Upgrade: только юнит Kygharil\'s Protectors Warp Spiders. У этого юнита Scouts 6".',
        },
      ],
      datasheets: [
        {
          id: 'kygharils-protectors-dire-avengers',
          abilities: [
            { name: 'Aspect Shrine Token (Once per battle per unit)', text: 'Когда этот юнит делает броски попадания или ранения, вы можете использовать эту способность. Если делаете это, измените один из этих бросков на не модифицированный 6.' },
            { name: 'Bladestorm', text: 'Атаки этого юнита на расстоянии, направленные на юнит в пределах половины дистанции, получают [SUSTAINED HITS 1].' },
            { name: 'Shimmershield', text: 'У этой модели 4+ InSv.' },
          ],
          composition: ['1 модель Dire Avengers Exarch', '4 модели Dire Avenger'],
          loadout: `**Dire Avengers Exarch вооружён:** Power Glaive; Shimmershield.
**Каждый Dire Avenger вооружён:** Avenger Shuriken Catapult; Weapon Strike.`,
        },
        {
          id: 'spiritseer-kygharil',
          abilities: [
            { name: 'Spiritseer', text: 'Пока этот юнит находится в пределах 3" от дружественного юнита Wraith Construct, у этого юнита есть Lone Operative.' },
            { name: 'Spirit Mark (Psychic) (Once per turn per unit)', text: 'Когда этот юнит начинает или заканчивает перемещение, вы можете использовать эту способность. Если делаете это, выберите один дружественный юнит Wraith Construct (за исключением юнитов Titanic) в пределах 6" от этой модели и один вражеский юнит, видимый для этой модели. Атаки этого дружественного юнита, направленные на этот вражеский юнит, получают [SUSTAINED HITS 1] до начала вашей следующей фазы перемещения.' },
            { name: 'Tears of Isha (Psychic)', text: `В вашей фазе командования вы можете выбрать один дружественный юнит Wraith Construct в пределах 6" от этой модели, который ещё не был выбран для этой способности в этот ход.
▪ Если у этого юнита есть уничтоженная модель, верните одну уничтоженную модель в этот юнит.
▪ Или: если у этого юнита нет уничтоженной модели, одна модель в этом юните восстанавливает D3 раны.` },
          ],
          composition: ['1 модель Spiritseer Kygharil'],
          loadout: '**Эта модель вооружена:** Shuriken Pistol; Witch Staff.',
        },
        {
          id: 'kygharils-protectors-wraithblades',
          abilities: [
            { name: 'Psychic Guidance', text: `Пока этот юнит находится в пределах 12" от одной или более дружественных моделей Aeldari Psyker:
▪ У этого юнита 6+ Ld.
▪ Атаки этого юнита получают +1 к броскам попадания.` },
            { name: 'Forceshield', text: 'У этой модели 4+ InSv.' },
            { name: 'Malevolent Souls', text: `Когда модель в этом юните уничтожена, если этот юнит ещё не был выбран для боя в этой фазе, бросьте один D6:
▪ На 3+ эту модель не убирают с поля боя. Когда этот юнит уже сражался, или в конце фазы (что наступит раньше), эту модель убирают с поля боя.` },
          ],
          composition: ['5 моделей Wraithblade'],
          loadout: '**Каждая модель вооружена:** Forceshield; Ghostaxe.',
        },
        {
          id: 'kygharils-protectors-warp-spiders',
          abilities: [
            { name: 'Aspect Shrine Token', text: 'Когда этот юнит делает броски попадания или ранения, вы можете использовать эту способность. Если делаете это, измените один из этих бросков на не модифицированный 6.' },
            { name: 'Engulfing Flames (Once per battle per unit)', text: 'Когда этот юнит выбран для стрельбы, вы можете использовать эту способность. Если делаете это, атаки этого юнита на расстоянии получают [ANTI-INFANTRY 3+].' },
          ],
          composition: ['1 модель Warp Spider Exarch', '4 модели Warp Spider'],
          loadout: `**Warp Spider Exarch вооружён:** Death Weavers; Powerblades.
**Каждый Warp Spider вооружён:** Death Spinner; Weapon Strike.`,
        },
      ],
    },
    {
      name: 'Black Templars',
      rule: {
        nameRu: 'Уничтожение в упор',
        flavor: 'Чёрные Храмовники наслаждаются ближним боем. Они бросаются на врага волнами атак, каждая из которых яростнее и кровожаднее предыдущей.',
        body: `▪ Атаки дружественных юнитов Vow-Sworn of Vedrenn, направленные на юнит в пределах 12", могут игнорировать модификаторы к BS, WS и броскам попадания.
▪ При игре в битве Combat Patrol следующие дружественные юниты должны начинать битву в стратегическом резерве и не могут быть выставлены на поле боя до указанного раунда битвы, а когда это произойдёт, должны быть выставлены целиком в вашей зоне развертывания: Emperor's Champion (раунд битвы 2).`,
      },
      armyRule: {
        nameRu: 'Обеты храмовников',
        flavor: 'Накануне битвы Чёрные Храмовники собираются, чтобы их поборники повели их в молитве и размышлении. Единые в ненависти к врагу, они приносят великий обет, который сдержат в грядущем бою.',
        body: `Если ваша армия относится к фракции Adeptus Astartes, в начале первого раунда битвы выберите один из следующих Обетов, который будет активен для юнитов Adeptus Astartes вашей армии. Пока Обет активен для юнита вашей армии, этот юнит имеет соответствующую способность, показанную ниже.

### Abhor the Witch, Destroy the Witch | Гнушайся ведьмой, уничтожь ведьму
Атаки ближнего боя этого юнита, нацеленные на юнит Psyker, имеют [PRECISION]. Когда этот юнит объявляет атаку, если вражеский юнит Psyker находится в пределах 12" от этого юнита, вы можете перебросить этот бросок на рывок; если вы это делаете, этот юнит обязан закончить рывок в атаку связанным с одним или более из этих вражеских юнитов Psyker.

### Accept Any Challenge, No Matter the Odds | Прими любой вызов, каковы бы ни были шансы
Каждый раз, когда модель этого юнита совершает атаку в ближнем бою, если сила этой атаки меньше или равна стойкости цели, добавляйте 1 к броску ранения.

### Suffer Not the Unclean to Live | Не дай нечистому жить
Этот юнит может объявить атаку в том ходу, в котором он отступал, и каждый раз, когда модель этого юнита совершает манёвр Pile-in или консолидацию, ей не обязательно заканчивать этот манёвр ближе к ближайшей вражеской модели — при условии, что она заканчивает его как можно ближе к ближайшему вражескому юниту.

### Uphold the Honour of the Emperor | Отстоять честь Императора
Если у этого юнита есть ключевое слово Infantry: в конце вашей фазы командования, если этот юнит в пределах досягаемости контролируемого вами объекта, этот объект остаётся под вашим контролем до тех пор, пока уровень контроля вашего оппонента над этим объектом не окажется выше вашего в конце фазы. Вдобавок, если в разыгрываемой миссии есть Actions, этот юнит может начинать выполнение Action в том ходу, в котором он продвигался.

**Heirs of Sigismund:**
▪ Если у юнита Adeptus Astartes на датащите есть второе фракционное ключевое слово, это ключевое слово — название ордена этого юнита (например, у High Marshal Helbrecht есть ключевые слова Adeptus Astartes и Black Templars, и он из ордена Black Templars).
▪ Вы не можете включать в свою армию юниты более чем одного ордена.`,
      },
      stratagems: [
        {
          name: 'Come To Their Aid',
          nameRu: 'Прийти на помощь',
          flavor: 'Узы братства крепки среди Vow-sworn. Когда союзники увязают в гуще вражеских полчищ, их братья по оружию спешат к ним на помощь, с готовностью врываясь в гущу боя.',
          when: 'Ваша фаза атаки, когда дружественный юнит Vow-Sworn of Vedrenn сделал бросок на рывок.',
          target: 'Этот юнит Vow-Sworn of Vedrenn.',
          effect: `▪ Добавьте 2 к броску на рывок.
▪ При выборе целей для атаки ваш юнит может выбирать только вражеские юниты, находящиеся в рукопашной с дружественными юнитами Vow-Sworn of Vedrenn.`,
        },
        {
          name: 'Heavy Strikes',
          nameRu: 'Тяжёлые удары',
          flavor: 'Величайший дар Бога-Императора — ненависть. Чёрные Храмовники умеют направлять её с наибольшей пользой, поднимая свою трансчеловеческую силу до новых высот.',
          when: 'Фаза боя, когда дружественный юнит Vow-Sworn Sword Brethren Squad/Bladeguard Veteran Squad выбран для боя.',
          target: 'Этот юнит Vow-Sworn Sword Brethren Squad/Bladeguard Veteran Squad.',
          effect: 'Атаки вашего юнита в ближнем бою, направленные на юнит Monster/Vehicle, получают +1 D.',
        },
        {
          name: 'Blessed Aura',
          nameRu: 'Благословенная аура',
          flavor: 'Пока множатся потери и множатся раны, вера подвергается испытанию. Стойкие в своём рвении вознаграждаются: на них снисходит благословение Бога-Императора, пока они продвигаются всё глубже в бой.',
          when: 'Ваша фаза командования, когда дружественный юнит Vow-Sworn of Vedrenn проходит проверку морального духа.',
          target: 'Этот юнит Vow-Sworn of Vedrenn.',
          effect: 'Атаки в ближнем бою, направленные на ваш юнит, получают -1 к броскам попадания до начала вашего следующего хода.',
        },
      ],
      enhancements: [
        {
          name: 'Divine Endurance',
          nameRu: 'Божественная выносливость',
          flavor: 'Преследуя священные цели, Чёрные Храмовники непоколебимы и неутомимы, веря, что Император защитит их от вреда, пока они пробиваются к своим целям.',
          body: `Только модель Vow-Sworn of Vedrenn Emperor's Champion. В начале вашей фазы перемещения вы можете выбрать один дружественный юнит Vow-Sworn of Vedrenn, видимый для этой модели и находящийся в пределах 12" от неё. Если делаете это, когда этот юнит в этом ходу выбран для продвижения/отступления:
▪ Если этот юнит использует режим desperate escape, он автоматически проходит любые броски hazard.
▪ Это перемещение не мешает юниту быть подходящим для начала action.`,
        },
        {
          name: 'Divine Protection',
          nameRu: 'Божественная защита',
          flavor: 'Чёрные Храмовники непоколебимы в вере, что Бог-Император направляет и защищает самых верных из своей паствы.',
          body: 'Улучшение: только юнит Vow-Sworn Sword Brethren. (Один раз за битву, на юнит) Когда вражеский юнит выбирает этот юнит целью, вы можете использовать эту способность. Если делаете это, у этого юнита будет 4+ InSv.',
        },
      ],
      datasheets: [
        {
          id: 'emperors-champion-vedrenn',
          abilities: [
            { name: 'Deft Riposte', text: 'Атаки в ближнем бою, направленные на этот юнит, получают [HAZARDOUS].' },
          ],
          composition: ["1 модель Emperor's Champion Vedrenn"],
          loadout: '**Эта модель вооружена:** Black Sword; Bolt Pistol.',
        },
        {
          id: 'vow-sworn-sword-brethren-squad',
          abilities: [
            { name: 'Exploit Their Cowardice', text: 'Когда вражеский юнит, находящийся в рукопашной с этим юнитом, выбран для отступления, после того как этот вражеский юнит завершит отступление, если этот юнит не вовлечён в бой, этот юнит может совершить обычное перемещение.' },
          ],
          composition: [
            '1 модель Sword Brother Castellan',
            '1 модель Sword Brother with Heavy Bolt Pistol and Chainsword',
            '1 модель Sword Brother with Plasma Pistol and Master-crafted Power Weapon',
            '1 модель Sword Brother with Pyre Pistol and Master-crafted Power Weapon',
            '1 модель Sword Brother with Twin Lightning Claws',
          ],
          loadout: `**Sword Brother Castellan вооружён:** Combi-Weapon; Master-Crafted Power Weapon.
**Sword Brother with Heavy Bolt Pistol and Chainsword вооружён:** Chainsword; Heavy Bolt Pistol.
**Sword Brother with Plasma Pistol and Master-crafted Power Weapon вооружён:** Master-Crafted Power Weapon; Plasma Pistol.
**Sword Brother with Pyre Pistol and Master-crafted Power Weapon вооружён:** Master-Crafted Power Weapon; Pyre Pistol.
**Sword Brother with Twin Lightning Claws вооружён:** Twin Lightning Claws.`,
        },
        {
          id: 'vow-sworn-crusader-squad',
          abilities: [
            { name: 'Righteous Zeal (Once per turn, per unit)', text: 'В фазе стрельбы вашего противника, когда вражеский юнит произвёл выстрел, если эти атаки уничтожили модель в этом юните и этот юнит не вовлечён в бой, этот юнит может совершить рывок на до D6+2".' },
          ],
          composition: [
            '1 модель Initiate with Pyreblaster, Bolt Pistol and Knives and Fists',
            '1 модель Sword Brother',
            '2 модели Initiate with Bolt Pistol, Bolt Rifle and Knives and Fists',
            '2 модели Initiate with Heavy Bolt Pistol and Chainsword',
            '2 модели Neophyte with Bolt Pistol and Chainsword',
            '2 модели Neophyte with Neophyte Firearm and Knives and Fists',
          ],
          loadout: `**Initiate with Pyreblaster, Bolt Pistol and Knives and Fists вооружён:** Bolt Pistol; Knives and Fists; Pyreblaster.
**Sword Brother вооружён:** Heavy Bolt Pistol; Master-crafted Power Weapon.
**Каждый Initiate with Bolt Pistol, Bolt Rifle and Knives and Fists вооружён:** Bolt Pistol; Bolt Rifle; Knives and Fists.
**Каждый Initiate with Heavy Bolt Pistol and Chainsword вооружён:** Chainsword; Heavy Bolt Pistol.
**Каждый Neophyte with Bolt Pistol and Chainsword вооружён:** Bolt Pistol; Chainsword.
**Каждый Neophyte with Neophyte Firearm and Knives and Fists вооружён:** Knives and Fists; Neophyte Firearm.`,
        },
        {
          id: 'vow-sworn-bladeguard-veteran-squad',
          abilities: [
            { name: 'Bladeguard (Once per turn per unit)', text: `В фазе боя, когда этот юнит выбран для боя, или когда вражеский юнит выбирает этот юнит целью, вы можете выбрать один из следующих вариантов:
▪ Атаки этого юнита в ближнем бою могут перебрасывать броски попадания 1.
▪ Или: этот юнит может перебрасывать спас-броски 1.` },
          ],
          composition: ['1 модель Bladeguard Veteran Sergeant', '2 модели Bladeguard Veteran'],
          loadout: `**Bladeguard Veteran Sergeant вооружён:** Master-crafted Power Weapon; Neo-Volkite Pistol.
**Каждый Bladeguard Veteran вооружён:** Heavy Bolt Pistol; Master-crafted Power Weapon.`,
        },
      ],
    },
    {
      name: 'Blood Angels',
      rule: {
        nameRu: 'Плавные манёвры',
        flavor: 'Пренебрегая дальним боем ради почётной битвы на ближней дистанции, Sanguinary Spearhead стремится сойтись с врагом как можно быстрее.',
        body: 'Дружественные юниты Sanguinary Spearhead могут перебрасывать броски на продвижение.',
      },
      armyRule: {
        nameRu: 'Клятва момента и Сыны Сангвиния',
        flavor: 'В бою космодесантники приносят могучие клятвы уничтожить врагов Императора и отстоять честь своего ордена, и такие обеты священны. Когда Ангелы Смерти наносят удар, они делают это с точностью хирурга и мощью молнии.',
        body: `### Oath of Moment | Клятва момента
Если фракция вашей армии — Adeptus Astartes, в начале вашей фазы командования выберите один юнит из армии оппонента. До начала вашей следующей фазы командования этот вражеский юнит — ваша цель Oath of Moment. Каждый раз, когда модель с этой способностью совершает атаку по вашей цели Oath of Moment, вы можете перебросить бросок на попадание.

### The Sons of Sanguinius | Сыны Сангвиния
▪ Если у юнита Adeptus Astartes на датащите есть второе фракционное ключевое слово, это ключевое слово — название ордена этого юнита. Например, у Lemartes есть ключевые слова Adeptus Astartes и Blood Angels, и поэтому он из ордена Blood Angels.
▪ Вы не можете включать в свою армию юниты более чем одного ордена.`,
      },
      stratagems: [
        {
          name: 'Angelic Terror',
          nameRu: 'Ангельский ужас',
          flavor: 'Облачённая в сверкающее золото, Sanguinary Guard обрушивается с небес подобно мстительным ангелам, вселяя страх в сердца врагов.',
          when: 'Ваша фаза командования.',
          target: 'Один дружественный юнит Sanguinary Spearhead Sanguinary Guard.',
          effect: 'Выберите один вражеский юнит в пределах 3" от вашего юнита. Этот вражеский юнит проходит проверку морального духа с -1 к этой проверке.',
        },
        {
          name: 'Dauntless Bravery',
          nameRu: 'Неустрашимая храбрость',
          flavor: 'Воплощая храбрость своего павшего Примарха, Sanguinary Spearhead без страха смотрит в лицо верной смерти и отмахивается от ударов, что свалили бы менее стойких воинов.',
          when: 'Фаза стрельбы вашего противника или фаза боя, когда вражеский юнит выбирает дружественный юнит Sanguinary Spearhead целью, находящийся в пределах 3" от центра поля боя.',
          target: 'Этот юнит Sanguinary Spearhead.',
          effect: 'Атаки, направленные на ваш юнит, с S больше, чем T вашего юнита, получают -1 к броскам ран.',
        },
        {
          name: 'Show No Mercy',
          nameRu: 'Не давать пощады',
          flavor: 'Blood Angels не дают пощады врагам. Трусов, что пытаются бежать с поля боя, преследуют и вырезают до последнего.',
          when: 'Фаза перемещения вашего противника, когда юнит выбран для отступления, если этот юнит находится в рукопашной с дружественным юнитом Sanguinary Spearhead.',
          target: 'Этот юнит Sanguinary Spearhead.',
          effect: 'Когда вражеский юнит, находящийся в рукопашной с вашим юнитом, выбран для отступления, этот вражеский юнит обязан использовать режим desperate escape, с -1 к этим броскам hazard, если этот вражеский юнит battle-shocked.',
        },
      ],
      enhancements: [
        {
          name: 'Masterful Fighter',
          nameRu: 'Мастер боя',
          flavor: 'Капитаны ордена Blood Angels балансируют на тонкой грани между порядком и яростью, сражаясь с непревзойдённым мастерством и свирепостью, рождённой ненавистью.',
          body: `Только модель Sanguinary Spearhead Captain. Атаки этой модели в ближнем бою получают:
▪ +2 S.
▪ +1 AP.`,
        },
        {
          name: 'Overwhelming Charge',
          nameRu: 'Всесокрушающий рывок',
          flavor: 'Скорость и напор — отличительные черты атаки Blood Angels. Врагу нельзя давать времени на перегруппировку.',
          body: 'Улучшение: только юнит Sanguinary Spearhead Assault Intercessor Squad. Когда этот юнит выбран для совершения манёвра pile-in, он может переместиться на до D3+3".',
        },
      ],
      datasheets: [
        {
          id: 'sanguinary-spearhead-assault-intercessor-squad',
          abilities: [
            { name: 'Targeted Intercession', text: `Атаки этого юнита в ближнем бою:
▪ Могут перебрасывать броски ран 1.
▪ Или: направленные на юнит в пределах досягаемости цели могут перебрасывать броски ран.` },
          ],
          composition: ['1 модель Assault Intercessor Sergeant', '9 моделей Assault Intercessor'],
          loadout: `**Assault Intercessor Sergeant вооружён:** Chainsword; Plasma Pistol.
**Каждый Assault Intercessor вооружён:** Chainsword; Heavy Bolt Pistol.`,
        },
        {
          id: 'sanguinary-spearhead-sanguinary-guard',
          abilities: [
            { name: 'Born To Fight', text: 'Пока этот юнит находится в рукопашной, у него +2 OC.' },
          ],
          composition: ['1 модель Sanguinary Guard with Encarmine Blade', '2 модели Sanguinary Guard with Encarmine Spear'],
          loadout: `**Sanguinary Guard with Encarmine Blade вооружён:** Angelus Boltgun; Encarmine Blade.
**Каждый Sanguinary Guard with Encarmine Spear вооружён:** Angelus Boltgun; Encarmine Spear.`,
        },
        {
          id: 'captain-raldeo',
          abilities: [
            { name: 'Targeted Intercession', text: `Атаки этого юнита в ближнем бою:
▪ Могут перебрасывать броски ран 1.
▪ Или: направленные на юнит в пределах досягаемости цели могут перебрасывать броски ран.` },
          ],
          composition: ['1 модель Captain Raldeo'],
          loadout: '**Эта модель вооружена:** Inferno Pistol; Master-crafted Chainsword.',
          leader: {
            text: 'Эта модель может быть прикреплена к следующим юнитам:',
          },
        },
      ],
    },
    {
      name: 'Dark Angels',
      rule: {
        nameRu: 'Почтенные рыцари',
        flavor: 'Dark Angels славятся непоколебимой верностью своим командирам и преданностью долгу и чести. Дикость своих врагов они встречают дисциплинированной обороной, непоколебимой стойкостью и виртуозным владением клинком.',
        body: `Когда вражеский юнит завершает рывок в атаку, дружественные юниты Vengeful Brethren, находящиеся в рукопашной с этим вражеским юнитом, переходят в defence stance до конца хода:
▪ Пока юнит в defence stance, атаки, направленные на этот юнит, с S больше, чем T этого юнита, получают -1 к броскам ран.`,
      },
      armyRule: {
        nameRu: 'Клятва момента и Непрощённые',
        flavor: 'Никто не сражается с более мрачной решимостью, чем сыны Льва, а их особые роты — известные у Dark Angels как Deathwing и Ravenwing — являются проклятием для их устрашённых врагов.',
        body: `### Oath of Moment | Клятва момента
Если фракция вашей армии — Adeptus Astartes, в начале вашей фазы командования выберите один юнит армии вашего оппонента. До начала вашей следующей фазы командования этот вражеский юнит — ваша цель Oath of Moment. Каждый раз, когда модель с этой способностью совершает атаку по вашей цели Oath of Moment, вы можете перебросить бросок на попадание.

### The Unforgiven | Непрощённые
▪ Если у юнита Adeptus Astartes на датащите есть второе фракционное ключевое слово, это ключевое слово — название ордена этого юнита. Например, у Asmodai есть фракционные ключевые слова Adeptus Astartes и Dark Angels, а значит, он из ордена Dark Angels.
▪ Вы не можете включать в армию юниты более чем одного ордена.

**The Ravenwing** — следующие юниты Adeptus Astartes получают ключевое слово Ravenwing, если они из ордена Dark Angels:
▪ Юниты Mounted
▪ Юниты Vehicle, способные летать (Fly)

**The Deathwing** — следующие юниты Adeptus Astartes получают ключевое слово Deathwing, если они из ордена Dark Angels:
▪ Юниты Terminator
▪ Юниты Bladeguard Ancient, Bladeguard Veteran Squad, Sternguard Veteran Squad и Vanguard Veteran Squad with Jump Packs
▪ Юниты Land Raider, Land Raider Crusader, Land Raider Redeemer, Repulsor и Repulsor Executioner
▪ Юниты Dreadnought`,
      },
      stratagems: [
        {
          name: 'For the Lion',
          nameRu: 'За Льва',
          flavor: 'Взывая к имени своего восставшего Примарха, эти воины смело шагают к своим целям, не оставляя врагу никаких сомнений в своей мощи.',
          when: 'Фаза командования.',
          target: 'Один дружественный юнит Vengeful Brethren.',
          effect: 'Ваш юнит получает +1 OC до конца хода.',
        },
        {
          name: 'Mission Focus',
          nameRu: 'Сосредоточенность на миссии',
          flavor: 'Dark Angels полны решимости достичь своих целей и потратят всю свою силу без остатка, чтобы обеспечить победу. Тех, кто пытается остановить их на пути, вырезают без пощады.',
          when: 'Ваша фаза стрельбы или фаза боя, когда дружественный юнит Vengeful Brethren в пределах досягаемости цели выбран для атаки.',
          target: 'Этот юнит Vengeful Brethren.',
          effect: 'Атаки вашего юнита получают +1 к броскам попадания.',
        },
        {
          name: 'Determined to the Last',
          nameRu: 'Решительны до конца',
          flavor: 'Bladeguard Veterans — одни из самых умелых воинов своего ордена — непоколебимы перед лицом врага, сражаясь сквозь самые тяжёлые раны, чтобы исполнить свой долг.',
          when: 'Фаза боя, когда вражеский юнит выбирает дружественный юнит Vengeful Brethren Bladeguard Veteran Squad целью.',
          target: 'Этот юнит Vengeful Brethren Bladeguard Veteran Squad.',
          effect: `Когда модель в вашем юните уничтожена, если ваш юнит ещё не был выбран для боя в этой фазе, бросьте один D6:
▪ На 2+ эту модель не убирают с поля боя. Когда ваш юнит уже сражался, или в конце фазы (что наступит раньше), эту модель убирают с поля боя.`,
        },
      ],
      enhancements: [
        {
          name: 'Supreme Combatant',
          nameRu: 'Непревзойдённый боец',
          flavor: 'Образец неустанной преданности долгу Dark Angels, этот воин не уклоняется ни от одного боя, демонстрируя мастерство и силу, достаточные, чтобы свалить почти любого противника.',
          body: `Только модель Vengeful Brethren Gravis Captain. Когда этот юнит выбран для атаки, атаки этого юнита получают:
▪ [LETHAL HITS].
▪ Или: [SUSTAINED HITS 1].`,
        },
        {
          name: 'Dutiful Defenders',
          nameRu: 'Верные защитники',
          flavor: 'Обязанные защищать своих братьев от вреда, эти закалённые ветераны бросаются в бой и рубят любого, кто угрожает их братьям по оружию.',
          body: 'Улучшение: только юнит Vengeful Brethren Bladeguard Veteran Squad. (Один раз за раунд битвы, на армию) Когда вы выбираете этот юнит целью стратагемы Heroic Intervention, это применение стоит на -1 CP дешевле.',
        },
      ],
      datasheets: [
        {
          id: 'vengeful-brethren-bladeguard-veteran-squad',
          abilities: [
            { name: 'Bladeguard (Once per turn per unit)', text: `В фазе боя, когда этот юнит выбран для боя, или когда вражеский юнит выбирает этот юнит целью, вы можете выбрать один из следующих вариантов:
▪ Атаки этого юнита в ближнем бою получают +1 к броскам попадания.
▪ Или: атаки, направленные на этот юнит, получают -1 к броскам попадания.` },
          ],
          composition: ['1 модель Bladeguard Veteran Sergeant', '2 модели Bladeguard Veteran'],
          loadout: '**Каждая модель вооружена:** Heavy Bolt Pistol; Master-crafted Power Weapon.',
        },
        {
          id: 'master-zacharial',
          abilities: [
            { name: 'Gravis Protection', text: 'Атаки, направленные на этот юнит, получают -1 D.' },
          ],
          composition: ['1 модель Master Zacharial'],
          loadout: '**Эта модель вооружена:** Boltstorm Gauntlet; Power Fist; Relic Chainsword.',
        },
        {
          id: 'vengeful-brethren-hellblaster-squad',
          abilities: [
            { name: 'Punishing Volley', text: 'В вашей фазе стрельбы, когда этот юнит выстрелил, выберите один вражеский юнит, по которому пришлись эти атаки. Этот юнит проходит проверку морального духа.' },
          ],
          composition: ['1 модель Hellblaster Sergeant', '4 модели Hellblaster'],
          loadout: '**Каждая модель вооружена:** Bolt Pistol; Knives and Fists; Plasma Incinerator.',
        },
        {
          id: 'vengeful-brethren-intercessor-squad',
          abilities: [
            { name: 'Objective Secured', text: 'В конце вашей фазы командования, если этот юнит контролирует цель, эта цель считается захваченной.' },
          ],
          composition: ['1 модель Intercessor Sergeant', '9 моделей Intercessor'],
          loadout: '**Каждая модель вооружена:** Bolt Pistol; Bolt Rifle; Knives and Fists.',
        },
      ],
    },
    {
      name: 'Death Guard',
      rule: {
        nameRu: 'Ползучая гниль',
        flavor: 'Волна заразы предшествует Maggot Lords. Из этого зловонного миазма нечистот они выступают, надвигаясь всё ближе, пока враг силится подавить свой ужас и собрать оборону.',
        body: 'Дружественные юниты Maggot Lords Terminator имеют Scouts 3".',
      },
      armyRule: {
        nameRu: 'Дар Нургла (Aura) и Пакт распада',
        flavor: 'Death Guard — воины Бога Чумы Нургла. Их раздутые тела изъедены порчей, и одно их присутствие заставляет врага болеть и увядать в хватке сверхъестественных недугов, пока поле боя вокруг них обращается в гниль и руины.',
        body: `Если ваша армия относится к фракции Death Guard, пока вражеский юнит находится в пределах Contagion Range одной или более моделей Death Guard вашей армии, он — Afflicted (см. ниже).

### Contagion Range | Дистанция заразы
Contagion Range меняется по ходу битвы:
▪ В течение первого раунда битвы: Contagion Range 3".
▪ Начиная со второго раунда битвы: Contagion Range 6".
▪ Contagion Range не может быть больше 12" после модификаторов.

### Afflicted | Поражённые
На шаге «Объявление боевых построений» выберите один из Plagues ниже. До конца битвы, пока вражеский юнит — Afflicted, вычитайте 1 из характеристики Toughness моделей этого юнита, и этот юнит получает эффект выбранного вами Plague.
▪ Skullsquirm Blight: Каждый раз, когда модель в этом юните совершает атаку, вычитайте 1 из броска попадания.
▪ Rattlejoint Ague: Ухудшите характеристику Save моделей этого юнита на 1.
▪ Scabrous Soulrot: Ухудшите характеристики Move, Leadership и Objective Control моделей этого юнита на 1 (это правило может ухудшить характеристику Objective Control модели лишь до минимума 1).

**Pact of Decay:** При сборе армии, если специально не указано иное, вы не можете выбрать Plague Legions фракцией вашей армии.`,
      },
      stratagems: [
        {
          name: 'Inexorable Executioners',
          nameRu: 'Неумолимые палачи',
          flavor: 'Как бы медлительно ни выглядели Deathshroud, они неумолимы в преследовании врага. Тех, кто преграждает им путь, сметают прочь, будто это не более чем ползающие паразиты.',
          when: 'Ваша фаза атаки, когда дружественный юнит Maggot Lords Deathshroud Terminators начинает рывок в атаку.',
          target: 'Этот юнит Maggot Lords Deathshroud Terminators.',
          effect: 'Ваш юнит может перемещаться сквозь модели (за исключением моделей Monster/Vehicle).',
        },
        {
          name: 'Vomitous Salvoes',
          nameRu: 'Извергающиеся залпы',
          flavor: 'Содрогаясь и харкая, будто живые твари, оружие Death Guard извергает сокрушительный град снарядов, гнилостной заразной массы и визжащих паразитов, насквозь пропитывающий ряды врага.',
          when: 'Ваша фаза стрельбы, когда дружественный юнит Maggot Lords Plague Marines выбран для стрельбы.',
          target: 'Этот юнит Maggot Lords Plague Marines.',
          effect: 'Дальнобойные атаки вашего юнита с Lethal Hits получают [RAPID FIRE 1].',
        },
        {
          name: 'Sickening Horror',
          nameRu: 'Тошнотворный ужас',
          flavor: 'Волна сверхъестественного ужаса и вполне естественного отвращения захлёстывает врага, когда приближаются Death Guard.',
          when: 'Начало фазы боя.',
          target: 'Один дружественный юнит Maggot Lords Infantry.',
          effect: 'Выберите один вражеский юнит, находящийся в рукопашной с вашим юнитом. Этот вражеский юнит проходит проверку морального духа.',
        },
      ],
      enhancements: [
        {
          name: 'Noisome Veil',
          nameRu: 'Зловонная пелена',
          flavor: 'Вокруг Tallyman поднимается ядовитая пелена, скрывающая его фигуру, пока он неуклюже бредёт по полю боя, а из его vox-излучателя всё так же гудят монотонные заклинания и нескончаемые подсчёты.',
          body: 'Только модель Maggot Lords Tallyman. (Один раз за битву, на армию) В фазе стрельбы вашего противника, когда вражеский юнит выбирает этот юнит целью, вы можете использовать эту способность. Если делаете это, у этого юнита будет Stealth.',
        },
        {
          name: 'Bountiful Regeneration',
          nameRu: 'Обильная регенерация',
          flavor: 'Какой бы вред ни был нанесён этому воину, нечистая жизненная сила, бурлящая в его теле, непрестанно восстанавливает повреждения свежими слоями прогорклого жира, пузырящихся бубонов и мутировавшей плоти.',
          body: 'Только модель Maggot Lords Lord of Virulence. В вашей фазе командования эта модель восстанавливает 1 рану.',
        },
      ],
      datasheets: [
        {
          id: 'sholgor-the-putrid',
          abilities: [
            { name: 'Enemy Spotted', text: 'В начале вашей фазы стрельбы вы можете выбрать один вражеский юнит в пределах 18" от этой модели. У этого юнита +6" к дальности обнаружения.' },
          ],
          composition: ['1 модель Sholgor the Putrid'],
          loadout: '**Эта модель вооружена:** Power Fist; Twin Plague Spewer.',
          leader: {
            text: 'Эта модель может быть прикреплена к следующим юнитам:',
          },
        },
        {
          id: 'maggot-lords-chaos-rhino',
          transport: 'У этой модели транспортная вместимость 12 моделей Death Guard. Она не может перевозить модели Terminator.',
          composition: ['1 модель Chaos Rhino'],
          loadout: '**Эта модель вооружена:** Armoured Tracks; Havoc Launcher.',
        },
        {
          id: 'maggot-lords-deathshroud-terminators',
          abilities: [
            { name: 'Obstinate Resistance', text: 'Пока этот юнит находится в рукопашной, у него +1 OC.' },
          ],
          composition: ['1 модель Deathshroud Champion', '2 модели Deathshroud Terminator'],
          loadout: '**Каждая модель вооружена:** Manreaper; Plaguespurt Gauntlet.',
        },
        {
          id: 'septimol-fulg-maggot-lords-tallyman',
          abilities: [
            { name: 'Sevenfold Chant', text: `В вашей фазе командования, если эта модель на поле боя, бросьте 2D6:
▪ На 7+ вы получаете 1 CP.` },
            { name: 'Malicious Calculations', text: `Атаки этого юнита могут игнорировать модификаторы к:
▪ BS.
▪ WS.
▪ Броскам попадания.` },
          ],
          composition: ['1 модель Septimol Fulg'],
          loadout: '**Эта модель вооружена:** Numerological Artefacts; Plasma Pistol.',
        },
        {
          id: 'maggot-lords-plague-marines',
          abilities: [
            { name: 'Infused with the Blessings of Nurgle', text: 'В вашей фазе стрельбы, когда этот юнит выстрелил, вы можете выбрать один вражеский юнит, по которому пришлись эти дальнобойные атаки. Если делаете это, этот вражеский юнит — Afflicted до начала вашего следующего хода.' },
          ],
          composition: [
            '1 модель Plague Champion',
            '1 модель Plague Marine with Blight Launcher',
            '1 модель Plague Marine with Plague Spewer',
            '4 модели Plague Marine',
          ],
          loadout: `**Plague Champion вооружён:** Plasma Pistol; Power Fist.
**Plague Marine with Blight Launcher вооружён:** Blight Launcher; Plague Knives.
**Plague Marine with Plague Spewer вооружён:** Plague Knives; Plague Spewer.
**Каждый Plague Marine вооружён:** Boltgun; Plague Knives.`,
        },
      ],
    },
    {
      name: 'Drukhari',
      rule: {
        nameRu: 'Боль оживляет',
        flavor: 'Любая боль питает души находящихся рядом Drukhari — даже страдания их собственных сородичей.',
        body: 'Когда дружественный юнит Coven of Agonies уничтожен, вы получаете 1 токен Pain.',
      },
      armyRule: {
        nameRu: 'Сила из боли',
        flavor: 'Drukhari питаются страданием и ужасом. Каждая струя крови, что бьёт из рассечённой клинком артерии, каждый вопль мучительного ужаса, каждый головокружительный миг шока или отчаяния их добычи вливается в Drukhari, как дурман. Пока бушует битва, обитатели Тёмного Города пьют вдоволь из прилива боли.',
        body: `### Pain Abilities | Способности Pain
Все юниты Drukhari имеют способность Pain, помеченную словом «Pain». Способности Pain применяются к юниту, только пока он Empowered. Если ваша армия относится к фракции Drukhari, вы можете делать юниты вашей армии со способностями Pain Empowered, тратя токены Pain (см. ниже).

### Gaining Pain Tokens | Получение жетонов боли
Если ваша армия относится к фракции Drukhari, вы получаете токены Pain так:
▪ 1 токен Pain в начале вашей фазы командования.
▪ 1 токен Pain каждый раз, когда вражеский юнит уничтожен.
▪ 1 токен Pain каждый раз, когда вражеский юнит проваливает проверку морального духа.

Каждый раз, когда вы получаете токен Pain, держите его отдельно — это ваш запас токенов Pain. Каждый раз, когда вы тратите токен Pain, уменьшайте свой запас токенов Pain на ту же величину.

### Empowered Through Pain | Усилены болью
Каждая способность Pain указывает, когда вы можете потратить токены Pain, чтобы сделать этот юнит Empowered. Когда вы это делаете, до конца фазы этот юнит — Empowered, и все его способности Pain вступают в силу. Пока прикреплённый юнит — Empowered, способности Pain всех юнитов Leader и Bodyguard в этом юните вступают в силу — вам не нужно тратить дополнительные токены Pain, чтобы активировать каждую из этих способностей Pain.

### Corsairs and Travelling Players | Корсары и странствующие лицедеи
Если ваша армия относится к фракции Drukhari, вы можете включать юниты Harlequins и Anhrathe в свою армию, хотя они не имеют ключевого слова фракции Drukhari. Ни одна модель Harlequins или Anhrathe, включённая в вашу армию таким образом, не может быть вашим Warlord, и им нельзя давать улучшения.`,
      },
      stratagems: [
        {
          name: 'Hardened Physiology',
          nameRu: 'Закалённая физиология',
          flavor: 'Изысканное плотьеваяние и алхимические ухищрения Нуула наделили его Wracks грозной, задубевшей кожей, вполне способной поглощать пули и отражать клинки.',
          when: 'Фаза стрельбы вашего противника или фаза боя, когда вражеский юнит выбирает дружественный юнит Coven of Agonies Wracks целью.',
          target: 'Этот юнит Coven of Agonies Wracks.',
          effect: 'Атаки, направленные на ваш юнит, получают -1 к броскам ран.',
        },
        {
          name: 'Powerful Creations',
          nameRu: 'Могучие творения',
          flavor: 'Черпая алхимическую мощь тёмных наук, что создали его, этот Pain Engine неистовствует на поле боя с кошмарной жизненной силой.',
          when: 'Фаза боя, когда дружественный юнит Coven of Agonies Monster выбран для боя.',
          target: 'Этот юнит Coven of Agonies Monster.',
          effect: `▪ Атаки вашего юнита, направленные на юнит Monster/Vehicle, получают +1 к броскам ран.
▪ Атаки вашего юнита, направленные на юнит Monster/Vehicle, получают +1 AP.`,
        },
        {
          name: 'Agonising Onslaught',
          nameRu: 'Мучительный натиск',
          flavor: 'Стремясь причинить своим жертвам максимум мучений, зверинец Нуула обрушивает беспощадные залпы или шквалы свирепых ударов, направляя собранную боль, чтобы усилить свои старания.',
          when: 'Ваша фаза стрельбы или фаза боя, когда дружественный юнит Coven of Agonies выбран для атаки.',
          target: 'Этот юнит Coven of Agonies.',
          effect: `▪ Атаки вашего юнита могут перебрасывать броски попадания 1.
▪ Или: если вы тратите 1 токен Pain, атаки вашего юнита могут перебрасывать броски попадания.`,
        },
      ],
      enhancements: [
        {
          name: 'Toxin-laced Blades',
          nameRu: 'Клинки, пропитанные ядом',
          flavor: 'Мастера алхимии и тёмной науки, Haemonculi непревзойдённо создают мощные яды, чьи эффекты почти всегда гротескны и смертоносны. Перед битвой они покрывают свои клинки этими ядами и с наслаждением испытывают их на враге.',
          body: 'Только модель Coven of Agonies Haemonculus. Атаки этого юнита в ближнем бою получают +1 AP.',
        },
        {
          name: 'Superior Soulcraft',
          nameRu: 'Превосходное искусство душ',
          flavor: 'Созданное собственноручно Xatrophos Nuul, высасывающее душу оружие этого Cronos было усовершенствовано Haemonculus, отчего его мучительные эффекты стали ещё более выраженными и жуткими.',
          body: 'Улучшение: только юнит Coven of Agonies Cronos. Этот юнит может перебрасывать броски, чтобы определить A оружия.',
        },
      ],
      datasheets: [
        {
          id: 'coven-of-agonies-wracks',
          abilities: [
            { name: 'Torturer’s Craft', text: 'В вашей фазе стрельбы или фазе боя, после того как этот юнит атаковал, вы можете выбрать один вражеский юнит (за исключением юнитов Vehicle), по которому пришлись эти атаки. Этот юнит проходит проверку морального духа.' },
            { name: 'Experimental Enhancements (Pain)', text: `В фазе боя, когда этот юнит выбран для боя, вы можете потратить 1 токен Pain, чтобы сделать этот юнит Empowered. Если делаете это:
▪ Атаки этого юнита в ближнем бою (за исключением атак моделей Character) получают 3 A.
▪ Или: атаки этого юнита в ближнем бою (за исключением атак моделей Character) получают 4 A и [HAZARDOUS].` },
          ],
          composition: ['1 модель Acothyst', '1 модель Wrack with Ossefactor', '3 модели Wrack'],
          loadout: `**Acothyst вооружён:** Hexrifle; Torturer's Tool.
**Wrack with Ossefactor вооружён:** Ossefactor; Torturer's Tool.
**Каждый Wrack вооружён:** Twin Torturer's Tools.`,
        },
        {
          id: 'coven-of-agonies-talos',
          abilities: [
            { name: 'Mindless Killing Machines (Pain)', text: 'В начале фазы боя вы можете потратить 1 токен Pain, чтобы сделать этот юнит Empowered. Если делаете это, когда модель в этом юните уничтожена, если этот юнит ещё не был выбран для боя в этой фазе, бросьте один D6: на 2+ эту модель не убирают с поля боя. Когда этот юнит уже сражался, или в конце фазы (что наступит раньше), эту модель убирают с поля боя.' },
            { name: 'Torture Device', text: 'Когда этот юнит уничтожает вражеский юнит, вы получаете 1 токен Pain.' },
          ],
          composition: ['1 модель Talos'],
          loadout: '**Эта модель вооружена:** Chain-flails; Twin Liquifier Gun; Twin Splinter Cannon.',
        },
        {
          id: 'coven-of-agonies-cronos',
          abilities: [
            { name: 'Empowered Engines (Pain)', text: 'Когда этот юнит выбран для обычного перемещения/продвижения/отступления, вы можете потратить 1 токен Pain, чтобы сделать этот юнит Empowered. Если делаете это, у этого юнита +2" M.' },
            { name: 'Pain Engine (Aura)', text: `Пока дружественный юнит находится в пределах 9" от этого юнита, когда вы тратите 1 токен Pain, чтобы сделать этот дружественный юнит Empowered, бросьте один D6, добавив 1 к результату, если модель в этом юните не вооружена spirit vortex:
▪ На 5+ вы получаете 1 токен Pain.` },
          ],
          composition: ['1 модель Cronos'],
          loadout: '**Эта модель вооружена:** Spirit Leech tentacles; Spirit Syphon; Spirit Vortex.',
        },
        {
          id: 'xatrophos-nuul',
          abilities: [
            { name: 'Pain Adept', text: `В вашей фазе командования, если модель с этой способностью на поле боя, бросьте один D6:
▪ На 4+ вы получаете 1 токен Pain.` },
            { name: 'Fear Incarnate (Aura)', text: `Пока вражеский юнит находится в пределах 6" от этой модели:
▪ У этого вражеского юнита -1 Ld.
▪ В шаге Battle-shock фазы командования вашего противника, если этот вражеский юнит ниже начальной численности, он проходит проверку морального духа.` },
            { name: 'Vile Weaponry (Pain)', text: 'В фазе боя, когда этот юнит выбран для боя, вы можете потратить 1 токен Pain, чтобы сделать этот юнит Empowered. Если делаете это, атаки этой модели получают 3 D.' },
          ],
          composition: ['1 модель Xatrophos Nuul'],
          loadout: '**Эта модель вооружена:** Haemonculus Tools and Scissorhands; Stinger Pistol.',
          leader: {
            text: 'Эта модель может быть прикреплена к следующим юнитам:',
          },
        },
      ],
    },
    {
      name: 'Emperor’s Children',
      rule: {
        nameRu: 'Проворные удары',
        flavor: 'Callous Blades сражаются с непревзойдённым мастерством и изяществом, кружа между союзниками и врагами, чтобы нанести смертельный удар избранной жертве.',
        body: 'Когда дружественные юниты Callous Blades начинают обычное перемещение/продвижение/рывок в атаку, эти юниты могут перемещаться сквозь модели (за исключением моделей Monster/Vehicle).',
      },
      armyRule: {
        nameRu: 'Искатели острых ощущений',
        flavor: 'Emperor’s Children — все искусные воины, и их трансчеловеческая мощь усилена жизнью непрестанного конфликта. Их врождённое желание ощущений во всех формах гонит их стремительно двигаться по полю боя, порхая между целями в попытке утолить свой нескончаемый голод по новому опыту.',
        body: `Если ваша армия относится к фракции Emperor's Children, этот юнит может стрелять и объявить атаку в том ходу, в котором он продвигался или отступал, но при этом:
▪ Он не может выбирать целью юнит, в пределах Engagement Range которого он находился в начале хода.
▪ Он не может выбирать целью юнит, который уже был целью рывка в атаку или атаки другого юнита в этой фазе.

### Pact of Excess | Пакт излишеств
При сборе армии, если специально не указано иное, вы не можете выбрать Legions of Excess фракцией вашей армии.`,
      },
      stratagems: [
        {
          name: 'Duellist’s Death',
          nameRu: 'Смерть дуэлянта',
          flavor: 'Emperor’s Children — перфекционисты до конца. Даже в смерти они стремятся утолить свои неистовые одержимости.',
          when: 'Фаза боя, когда вражеский юнит выбирает дружественный юнит Callous Blades целью.',
          target: 'Этот юнит Callous Blades.',
          effect: `Когда модель в вашем юните уничтожена, если ваш юнит ещё не был выбран для боя в этой фазе, бросьте один D6, добавив 1 к результату, если у вашего юнита есть Flawless Blades:
▪ На 4+ эту модель не убирают с поля боя. Когда ваш юнит уже сражался, или в конце фазы (что наступит раньше), эту модель убирают с поля боя.`,
        },
        {
          name: 'Shatter Strike',
          nameRu: 'Сокрушительный удар',
          flavor: 'Соединяя силу с изяществом, Flawless Blades валят врагов несколькими жестоко эффективными ударами.',
          when: 'Фаза боя, когда дружественный юнит Callous Blades Flawless Blades выбран для боя.',
          target: 'Этот юнит Callous Blades Flawless Blades.',
          effect: 'Атаки вашего юнита в ближнем бою получают +1 D.',
        },
        {
          name: 'Profane Desecration',
          nameRu: 'Богохульное осквернение',
          flavor: 'Посредством жутких ритуалов, эмпирических обрядов и гротескных знамён из извивающейся плоти последователи Slaanesh заявляют свои права на поле боя.',
          when: 'Конец вашей фазы перемещения.',
          target: 'Один дружественный юнит Callous Blades.',
          effect: 'Выберите один объект, который контролирует ваш юнит. Этот объект будет secured.',
        },
      ],
      enhancements: [
        {
          name: 'Invigorating Agonies',
          nameRu: 'Бодрящие муки',
          flavor: 'Emperor’s Children ищут опыта и ощущений во всех формах. Удары пуль и обжигающих энергетических залпов лишь подстёгивают этих порочных воинов к новым вершинам экстаза.',
          body: 'Только модель Callous Blades Lord Exultant. (Один раз за битву, на армию) В фазе стрельбы вашего противника, когда вражеский юнит выстрелил, если этот юнит был поражён этими атаками, вы можете использовать эту способность. Если делаете это, этот юнит может совершить рывок на до D3+1".',
        },
        {
          name: 'Martial Perfection',
          nameRu: 'Воинское совершенство',
          flavor: 'Callous Blades владеют своим оружием со сверхъестественным мастерством и изяществом, с презрительной лёгкостью отражая удары противника.',
          body: 'Улучшение: только юнит Callous Blades Infractors. (Один раз за битву, на армию) В фазе боя, когда вражеский юнит выбирает этот юнит целью, вы можете использовать эту способность. Если делаете это, атаки, направленные на ваш юнит, получают -1 к броскам попадания.',
        },
      ],
      datasheets: [
        {
          id: 'callous-blades-flawless-blades',
          abilities: [
            { name: 'Daemonic Patrons', text: `Когда этот юнит выбран для боя, вы можете использовать эту способность. Если делаете это:
▪ Атаки этого юнита в ближнем бою засчитывают критическое ранение при не модифицированном броске 3+.
▪ Когда этот юнит уже сражался, если эти атаки не уничтожили вражескую модель, одна модель в этом юните уничтожается.` },
          ],
          composition: ['3 модели Flawless Blades'],
          loadout: '**Каждая модель вооружена:** Blissblade; Bolt Pistol.',
        },
        {
          id: 'lord-kaphrael-of-the-callous-blades',
          abilities: [
            { name: 'Peerless Killer', text: 'Атаки этого юнита получают [LETHAL HITS].' },
          ],
          composition: ['1 модель Lord Kaphrael'],
          loadout: '**Эта модель вооружена:** Phoenix Power Spear; Power Fist.',
          leader: {
            text: 'Эта модель может быть прикреплена к следующим юнитам:',
          },
        },
        {
          id: 'callous-blades-infractors',
          abilities: [
            { name: 'Icon of Excess', text: `В конце вашей фазы стрельбы или фазы боя, если этот юнит уничтожил вражеский юнит в этой фазе, этот юнит делает бросок лидерства:
▪ При успехе вы получаете 1 CP.` },
            { name: 'Excessive Assault', text: `Атаки этого юнита в ближнем бою:
▪ Могут перебрасывать броски ран 1.
▪ Или: направленные на юнит в пределах досягаемости цели могут перебрасывать броски ран.` },
          ],
          composition: ['1 модель Obsessionist', '9 моделей Infractor'],
          loadout: `**Obsessionist вооружён:** Bolt Pistol; Power Sword.
**Каждый Infractor вооружён:** Bolt Pistol; Duelling Sabre.`,
        },
      ],
    },
    {
      name: 'Chaos Space Marines',
      rule: {
        nameRu: 'Гнетущий страх',
        flavor: 'Взглянуть на Zarkan и его daemonkin — значит познать истинный ужас.',
        body: `Дружественные юниты Zarkan's Daemonkin имеют следующую способность:
▪ Terrifying Presence (Aura): пока вражеский юнит находится в пределах 3" от этого юнита, у этого вражеского юнита -1 Ld.`,
      },
      armyRule: {
        nameRu: 'Тёмные пакты и Культы Тёмных Богов',
        flavor: 'Взывая к Богам Хаоса с фанатичным пылом, нечестивые чемпионы Heretic Astartes молят о дьявольских дарах, обещая гнуснейшие подношения взамен на дарованную мощь.',
        body: `Если ваша армия относится к фракции Heretic Astartes, каждый раз, когда юнит с этой способностью выбран для стрельбы или боя, он может заключить Dark Pact. Если заключает, он сперва обязан пройти проверку лидерства, прежде чем будут отыграны какие-либо эффекты этого Dark Pact; если эта проверка провалена, этот юнит получает D3 смертельных ран. Затем выберите одну из следующих способностей, которую оружие этого юнита получает до конца фазы:
▪ [LETHAL HITS]
▪ [SUSTAINED HITS 1]

### Cults of the Dark Gods | Культы Тёмных Богов
Если ваша армия относится к фракции Heretic Astartes, вы можете включить в свою армию любые из следующих юнитов, и при этом их ключевые слова фракции заменяются на Heretic Astartes:
▪ Khorne Berzerkers (см. World Eaters)
▪ Rubric Marines (см. Thousand Sons)
▪ Plague Marines (см. Death Guard)
▪ Noise Marines (см. Emperor's Children)

Суммарная стоимость в очках таких юнитов, которые вы можете включить в свою армию, зависит от размера битвы: Incursion — до 250 очков; Strike Force — до 500 очков; Onslaught — до 750 очков.`,
      },
      stratagems: [
        {
          name: 'Vindictive Strategy',
          nameRu: 'Мстительная стратегия',
          flavor: 'Legionaries Zarkan не дают пощады слабым, преследуя съёжившихся врагов с неослабевающей жестокостью.',
          when: 'Ваша фаза стрельбы или фаза боя, когда дружественный юнит Zarkan\'s Daemonkin Legionaries выбран для атаки.',
          target: 'Этот юнит Zarkan\'s Daemonkin Legionaries.',
          effect: `▪ Атаки вашего юнита могут перебрасывать броски попадания 1.
▪ Атаки вашего юнита могут перебрасывать броски ран 1.`,
        },
        {
          name: 'Daemonic Frenzy',
          nameRu: 'Демоническое неистовство',
          flavor: 'Охваченных жаждой крови и дикостью Possessed почти невозможно избежать. Тех, кто бежит из боя, хватают цепкие когти или рубят в кровавые лохмотья клинки и когти.',
          when: 'Фаза перемещения вашего противника, когда вражеский юнит выбран для отступления, если этот юнит находится в рукопашной с дружественным юнитом Zarkan\'s Daemonkin Possessed.',
          target: 'Этот юнит Zarkan\'s Daemonkin Possessed.',
          effect: 'Когда вражеский юнит, находящийся в рукопашной с вашим юнитом, выбран для отступления, этот вражеский юнит обязан использовать режим desperate escape, с -1 к этим броскам hazard, если этот вражеский юнит battle-shocked.',
        },
        {
          name: 'Alert to Danger',
          nameRu: 'Настороже перед опасностью',
          flavor: 'Служить рядом с Zarkan и оставаться в живых сколько-нибудь долго требует бдительности и хитрости. Его смертные рабы демонстрируют оба этих качества, стараясь держаться подальше от когтей врага и извлекать выгоду из его манёвров.',
          when: 'Фаза перемещения вашего противника, когда вражеский юнит завершает перемещение в пределах 8" от дружественного не вовлечённого в бой юнита Zarkan\'s Daemonkin Cultist Mob.',
          target: 'Этот юнит Zarkan\'s Daemonkin Cultist Mob.',
          effect: 'Ваш юнит может совершить обычное перемещение на до D3+1".',
        },
      ],
      enhancements: [
        {
          name: 'Prey on the Weak',
          nameRu: 'Охота на слабых',
          flavor: 'Жаждущие рвать плоть и проливать кровь во имя своих демонических покровителей, одержимые легионеры устремляются вперёд, сокращая дистанцию до съёжившихся жертв.',
          body: 'Улучшение: только юнит Zarkan\'s Daemonkin Possessed. У этого юнита Scouts 6".',
        },
        {
          name: 'Infernal Infusion',
          nameRu: 'Инфернальное вливание',
          flavor: 'Направляя мощь связанных демонических сущностей, Master of Possession наполняет свою смертную форму дьявольской силой.',
          body: 'Только модель Zarkan\'s Daemonkin Master of Possession. Атаки этого юнита получают +1 S.',
        },
      ],
      datasheets: [
        {
          id: 'aranis-zarkan',
          abilities: [
            { name: 'Sacrificial Dagger (Once per phase, per unit)', text: `Когда этот юнит выбран для атаки, вы можете использовать эту способность. Если делаете это:
▪ Этот юнит получает 1 смертельную рану.
▪ Атаки этого юнита Psychic получают +1 к броскам попадания и +1 к броскам ран.` },
            { name: 'Daemonkin (Psychic)', text: 'Пока у этого юнита есть модель Bodyguard, у него +1 к броскам на продвижение и броскам на рывок.' },
          ],
          composition: ['1 модель Aranis Zarkan'],
          loadout: '**Эта модель вооружена:** Bolt Pistol; Rite of Possession; Staff of Possession.',
          leader: {
            text: 'Эта модель может быть прикреплена к следующим юнитам:',
          },
        },
        {
          id: 'zarkans-daemonkin-legionaries',
          abilities: [
            { name: 'Combat Squad', text: 'В начале шага «Объявление боевых построений» вы можете разделить этот юнит на два отдельных юнита по пять моделей в каждом.' },
            { name: 'Chaos Icon', text: 'Когда этот юнит заключает Dark Pact, он может перебросить проверку лидерства.' },
            { name: 'Veterans of the Long War', text: `Атаки этого юнита в ближнем бою:
▪ Могут перебрасывать броски ран 1.
▪ Или: направленные на юнит в пределах досягаемости цели могут перебрасывать броски ран.` },
          ],
          composition: [
            '1 модель Aspiring Champion',
            '1 модель Legionary with Heavy Bolter',
            '1 модель Legionary with Meltagun',
            '7 моделей Legionary',
          ],
          loadout: `**Aspiring Champion вооружён:** Accursed Weapon; Plasma Pistol.
**Legionary with Heavy Bolter вооружён:** Bolt Pistol; Fists and Knives; Heavy Bolter.
**Legionary with Meltagun вооружён:** Bolt Pistol; Fists and Knives; Meltagun.
**Каждый Legionary вооружён:** Boltgun; Bolt Pistol; Fists and Knives.`,
        },
        {
          id: 'zarkans-daemonkin-cultist-mob',
          abilities: [
            { name: 'For the Dark Gods', text: 'В конце вашей фазы командования, если этот юнит контролирует цель, эта цель считается захваченной.' },
          ],
          composition: ['1 модель Cultist Champion', '9 моделей Chaos Cultist'],
          loadout: `**Cultist Champion вооружён:** Blades and Cudgels; Bolt Pistol.
**Каждый Chaos Cultist вооружён:** Autopistol; Blades and Cudgels.`,
        },
        {
          id: 'zarkans-daemonkin-possessed',
          abilities: [
            { name: 'Chaos Icon', text: 'Когда этот юнит заключает Dark Pact, он может перебросить бросок лидерства.' },
            { name: 'Unholy Bloodshed (Once per battle, per unit)', text: 'Когда этот юнит заключает Dark Pact, вы можете использовать эту способность. Если делаете это, атаки этого юнита получают [DEVASTATING WOUNDS].' },
          ],
          composition: ['1 модель Possessed Champion', '4 модели Possessed'],
          loadout: '**Каждая модель вооружена:** Hideous Mutations.',
        },
      ],
    },
    {
      name: 'Leagues of Votann',
      rule: {
        nameRu: 'Захват ресурсов',
        flavor: 'Заявляя права на богатую ресурсами землю, Кин продвигаются вперёд, чтобы закрепить за собой новую территорию.',
        body: 'В конце вашей фазы перемещения, если дружественный юнит Bane-slayer\'s Bulwark контролирует цель, эта цель считается захваченной.',
      },
      armyRule: {
        nameRu: 'Приоритетная эффективность',
        flavor: 'Как гласит истина Кин: «Удача — есть. Нужда — хранит. Труд — зарабатывает». Способность кинхоста действенно менять стратегическую опору воплощает эту мудрость. Она — результат быстрой оценки владений врага, того, как лучше захватить их для нужды родичей, а затем упрямо трудиться, чтобы удержать их против контратак.',
        body: `Если ваша армия относится к фракции Leagues of Votann, юниты Leagues of Votann вашей армии имеют одну из двух способностей: Hostile Acquisition или Fortify Takeover (см. ниже). В течение битвы то, какой способностью обладают эти юниты Leagues of Votann, меняется в зависимости от того, сколько у вас сейчас Yield points (YP):
▪ В начале битвы ваши юниты имеют Hostile Acquisition до начала вашей следующей фазы командования.
▪ В конце вашей фазы командования, если у вас меньше 7 YP, ваши юниты имеют Hostile Acquisition до начала вашей следующей фазы командования.
▪ В конце вашей фазы командования, если у вас 7 YP или больше, ваши юниты имеют Fortify Takeover до начала вашей следующей фазы командования.

### Hostile Acquisition | Враждебное изъятие
▪ Каждый раз, когда модель этого юнита совершает атаку по вражескому юниту в пределах досягаемости одного или более объектов, добавляйте 1 к броску попадания.
▪ Вы можете перебрасывать броски продвижения и броски на рывок этого юнита.

### Fortify Takeover | Укрепить захват
▪ Каждый раз, когда модель этого юнита совершает атаку по вражескому юниту, если этот юнит находится в пределах досягаемости одного или более контролируемых вами объектов, добавляйте 1 к броску попадания.
▪ Каждый раз, когда атака нацелена на этот юнит, если характеристика Strength этой атаки больше характеристики Toughness этого юнита и этот юнит не Vehicle, вычитайте 1 из броска ранения.

### Yield Points | Очки добычи
В конце фазы командования каждого игрока вы получаете 1 YP, если контролируете один или более объектов в своей зоне развёртывания, а начиная со второго раунда битвы вы получаете 1 дополнительный YP за каждое из следующих условий, которое выполняете:
▪ Вы контролируете один или более объектов вне своей зоны развёртывания.
▪ Вы контролируете два или более объектов вне своей зоны развёртывания.
▪ Вы контролируете больше объектов, чем ваш оппонент.

В ваш ход YP, полученные таким образом, всегда получаются до проверки того, какой способностью обладают юниты Leagues of Votann вашей армии. Всякий раз, когда правило позволяет вам потратить YP, уменьшайте число ваших YP на эту величину (ваши YP не могут опуститься ниже 0); в противном случае вы не можете использовать это правило.`,
      },
      stratagems: [
        {
          name: 'Opportune Advance',
          nameRu: 'Своевременное продвижение',
          flavor: 'Пока противники открывают огонь, эти воины пользуются моментом, чтобы рвануть вперёд, отвоёвывая территорию, пока враги перезаряжают опустевшее оружие.',
          when: 'Фаза стрельбы вашего противника, когда вражеский юнит, который выбрал целью дружественный не вовлечённый в бой юнит Bane-slayer\'s Bulwark Einhyr Hearthguard, выстрелил.',
          target: 'Этот юнит Bane-slayer\'s Bulwark Einhyr Hearthguard.',
          effect: 'Ваш юнит может совершить рывок на до D6+1".',
        },
        {
          name: 'Point-blank Fusillade',
          nameRu: 'Залп в упор',
          flavor: 'Кин настолько решительны и непоколебимы, что их воины продолжают целиться и стрелять даже в разгар ближнего боя.',
          when: 'Ваша фаза стрельбы, когда дружественный юнит Bane-slayer\'s Bulwark выбран для стрельбы.',
          target: 'Этот юнит Bane-slayer\'s Bulwark.',
          effect: 'Дальнобойные атаки вашего юнита получают [CLOSE-QUARTERS].',
        },
        {
          name: 'Claimed for the Kindred',
          nameRu: 'Заявлено для родичей',
          flavor: 'Заявив свои права на спорную территорию, Кин стоят и сражаются с новой решимостью.',
          when: 'Фаза командования.',
          target: 'Один дружественный юнит Bane-slayer\'s Bulwark Hearthkyn Warriors.',
          effect: 'Ваш юнит получает +1 OC до конца хода.',
        },
      ],
      enhancements: [
        {
          name: 'Indomitable Exemplar',
          nameRu: 'Несокрушимый образец',
          flavor: 'Этот военный вождь — живое воплощение неустанного стремления сокрушить врагов своих родичей. Своими деяниями он призывает воинов не тратить даже последний вздох ни на что, кроме мстительного возмездия.',
          body: 'Только модель Bane-slayer\'s Bulwark Einhyr Champion. В фазе боя, когда эта модель уничтожена, если этот юнит ещё не был выбран для боя в этой фазе, бросьте один D6: на 2+ эту модель не убирают с поля боя. Когда этот юнит уже сражался, или в конце фазы (что наступит раньше), эту модель убирают с поля боя.',
        },
        {
          name: 'Brôkhyr Barrage',
          nameRu: 'Заградительный огонь Brôkhyr',
          flavor: 'Сливая свой огонь в сосредоточенный залп, Brôkhyr Thunderkyn уничтожают врагов вместе с укрытиями, за которыми те спрятались. Такова свирепость этого натиска, что даже самые смелые воины дрогнут.',
          body: `Улучшение: только юнит Bane-slayer's Bulwark Brôkhyr Thunderkyn.
▪ Дальнобойные атаки этого юнита получают [IGNORES COVER].
▪ В вашей фазе стрельбы, когда этот юнит выстрелил, вы можете выбрать один вражеский юнит, по которому пришлись эти дальнобойные атаки. Если делаете это, этот вражеский юнит проходит проверку морального духа.`,
        },
      ],
      datasheets: [
        {
          id: 'bane-slayers-bulwark-einhyr-hearthguard',
          abilities: [
            { name: 'Decisive Destruction', text: 'Дальнобойные атаки этого юнита, направленные на ближайшую допустимую цель, могут перебрасывать броски попадания 1.' },
            { name: 'Weavefield Crest', text: 'У этого юнита 5+ InSv.' },
          ],
          composition: ['1 модель Hesyr', '4 модели Einhyr Hearthguard'],
          loadout: `**Hesyr вооружён:** Exoarmour Grenade Launcher; Graviton Hammer; Volkanite Disintegrator.
**Каждый Einhyr Hearthguard вооружён:** Exoarmour Grenade Launcher; Plasma Blade Gauntlet; Volkanite Disintegrator.`,
        },
        {
          id: 'bane-slayers-bulwark-hearthkyn-warriors',
          abilities: [
            { name: 'Weavefield Crest', text: 'У этого юнита 5+ InSv.' },
            { name: 'Panspectral Scanning', text: 'Дальнобойные атаки этого юнита могут перебрасывать броски попадания 1.' },
          ],
          composition: [
            '1 модель Hearthkyn Warrior with Autoch-pattern Bolt Pistol and Plasma Knife',
            '1 модель Hearthkyn Warrior with Autoch-pattern Bolt Pistol, HYLas Auto Rifle and Armoured Fists',
            '1 модель Hearthkyn Warrior with Autoch-pattern Bolt Pistol, Magna-Rail Rifle and Armoured Fists',
            '1 модель Theyn',
            '6 моделей Hearthkyn Warrior with Autoch-pattern Bolt Pistol, Ion Blaster and Armoured Fists',
          ],
          loadout: `**Hearthkyn Warrior with Autoch-pattern Bolt Pistol and Plasma Knife вооружён:** Autoch-pattern Bolt Pistol; Plasma Knife.
**Hearthkyn Warrior with Autoch-pattern Bolt Pistol, HYLas Auto Rifle and Armoured Fists вооружён:** Armoured Fists; Autoch-pattern Bolt Pistol; HYLas Auto Rifle.
**Hearthkyn Warrior with Autoch-pattern Bolt Pistol, Magna-Rail Rifle and Armoured Fists вооружён:** Armoured Fists; Autoch-pattern Bolt Pistol; Magna-rail Rifle.
**Theyn вооружён:** Autoch-pattern Bolt Pistol; Theyn's Armaments; Theyn's Pistol.
**Каждый Hearthkyn Warrior with Autoch-pattern Bolt Pistol, Ion Blaster and Armoured Fists вооружён:** Armoured Fists; Autoch-pattern Bolt Pistol; Ion Blaster.`,
        },
        {
          id: 'bane-slayers-bulwark-brokhyr-thunderkyn',
          abilities: [
            { name: 'Breaching Fire', text: 'В вашей фазе стрельбы, когда этот юнит выстрелил, вы можете выбрать один вражеский юнит, по которому пришлись эти атаки. Если делаете это, дальнобойные атаки дружественных юнитов Leagues of Votann, направленные на этот вражеский юнит, получают [IGNORES COVER].' },
          ],
          composition: ['3 модели Brokhyr Thunderkyn'],
          loadout: '**Каждая модель вооружена:** Powered Strikes; SP Conversion Beamer.',
        },
        {
          id: 'vynn-bane-slayer',
          abilities: [
            { name: 'Weavefield Crest', text: 'У этой модели 4+ InSv.' },
            { name: 'Fast-firing Targeters', text: 'Дальнобойные атаки этого юнита получают [ASSAULT].' },
          ],
          composition: ['1 модель Vynn Bane-Slayer'],
          loadout: '**Эта модель вооружена:** Autoch-pattern Combi-bolter; Mass Hammer.',
          leader: {
            text: 'Эта модель может быть прикреплена к следующим юнитам:',
          },
        },
      ],
    },
    {
      name: 'Space Wolves',
      rule: {
        nameRu: 'Скрытые охотники',
        flavor: 'Хитрый, как волчьи хищники его родного мира, Fyrri Askar предпочитает тактику засад. Его воины рыщут по периметру поля боя, нанося удар лишь в самый благоприятный момент.',
        body: 'У дружественных юнитов Askar\'s Wolfpack -3" к дальности обнаружения.',
      },
      armyRule: {
        nameRu: 'Клятва момента и Проклятие Вулфена',
        flavor: 'В бою космодесантники приносят великие клятвы уничтожать врагов Императора и блюсти честь своего ордена, и такие обеты священны. Когда Ангелы Смерти наносят удар, они делают это с точностью хирурга и силой удара молнии. Только сражаясь плечом к плечу со своими братьями по оружию, дикие Wulfen способны обуздать свою неистовую агрессию.',
        body: `### Oath of Moment | Клятва момента
Если фракция вашей армии — Adeptus Astartes, в начале вашей фазы командования выберите один юнит армии вашего оппонента. До начала вашей следующей фазы командования этот вражеский юнит — ваша цель Oath of Moment. Каждый раз, когда модель с этой способностью совершает атаку по вашей цели Oath of Moment, вы можете перебросить бросок на попадание.

### Curse of the Wulfen | Проклятие Вулфена
Пока этот юнит находится в пределах 6" от одной или более дружественных моделей Space Wolves Character (за исключением моделей Wulfen) или в пределах 12" от одной или более дружественных моделей Wolf Priest, если он не Battle-shocked, добавьте 1 к характеристике Objective Control моделей Infantry в нём и добавьте 3 к характеристике Objective Control моделей Vehicle в нём.

### Sagas | Саги
Каждое правило детачмента в Codex Supplement: Space Wolves включает Saga, которую можно выполнить, с дополнительными эффектами, вступающими в силу после этого.

### Sons of Russ | Сыны Русса
▪ Если у юнита Adeptus Astartes на датащите есть второе фракционное ключевое слово, это ключевое слово — название ордена этого юнита. Например, у Ragnar Blackmane есть фракционные ключевые слова Adeptus Astartes и Space Wolves, и поэтому он из ордена Space Wolves.
▪ Вы не можете включать в свою армию юниты более чем одного ордена.`,
      },
      stratagems: [
        {
          name: 'Born Hunters',
          nameRu: 'Прирождённые охотники',
          flavor: 'Space Wolves преследуют свою добычу, как дикие хищники, молниеносно реагируя на каждое движение жертвы.',
          when: 'Фаза перемещения вашего противника, когда вражеский юнит, находившийся в рукопашной с дружественным юнитом Askar\'s Wolfpack (за исключением юнитов Terminator), завершает отступление, если этот юнит Askar\'s Wolfpack не вовлечён в бой.',
          target: 'Этот юнит Askar\'s Wolfpack.',
          effect: 'Ваш юнит может совершить обычное перемещение на до D3+1".',
        },
        {
          name: 'Bestial Dominance',
          nameRu: 'Звериное господство',
          flavor: 'Стоя над растерзанными телами врагов, с бронёй, забрызганной кровью, эти воины не оставляют никаких сомнений в своём превосходстве.',
          when: 'Ваша фаза стрельбы или фаза боя, когда вражеский юнит уничтожен дружественным юнитом Askar\'s Wolfpack Wulfen.',
          target: 'Этот юнит Askar\'s Wolfpack Wulfen.',
          effect: 'Ваш юнит получает +1 OC до конца битвы.',
        },
        {
          name: 'Bring It Down',
          nameRu: 'Свалить наземь',
          flavor: 'Даже исполинские враги, укрытые тяжёлой бронёй, не защищены от гнева Wolfpack. Их вооружённая ярость достаточно велика, чтобы разрывать танки и чудовищ на части.',
          when: 'Фаза боя, когда дружественный юнит Askar\'s Wolfpack выбран для боя.',
          target: 'Этот юнит Askar\'s Wolfpack.',
          effect: 'Атаки вашего юнита в ближнем бою получают [ANTI-MONSTER/VEHICLE 4+].',
        },
      ],
      enhancements: [
        {
          name: 'Lone Hunter',
          nameRu: 'Одинокий охотник',
          flavor: 'Fyrri Askar часто предпочитает охотиться в одиночку, выслеживая добычу из тени, наблюдая за разворачивающейся битвой и бросаясь в бой лишь тогда, когда сочтёт это необходимым.',
          body: `Только модель Askar's Wolfpack Battle Leader. У этой модели:
▪ Lone Operative 9".
▪ Stealth.
▪ +1 T.`,
        },
        {
          name: 'Aggressive Response',
          nameRu: 'Агрессивный ответ',
          flavor: 'Попав под вражеский огонь, стая отвечает немедленной агрессией, бросаясь на нападающих с оскаленными клыками.',
          body: 'Улучшение: только юнит Askar\'s Wolfpack Wolf Guard Terminators. (Один раз за ход, на юнит) В фазе стрельбы вашего противника, когда вражеский юнит выстрелил, если этот юнит был поражён этими атаками, этот юнит может совершить рывок на до D3+1".',
        },
      ],
      datasheets: [
        {
          id: 'askars-wolfpack-blood-claws',
          abilities: [
            { name: 'Berserk Charge', text: 'Когда этот юнит совершает продвижение, это продвижение не мешает юниту быть подходящим для объявления атаки.' },
          ],
          composition: ['1 модель Blood Claw Pack Leader', '9 моделей Blood Claw'],
          loadout: `**Blood Claw Pack Leader вооружён:** Plasma Pistol; Power Weapon.
**Каждый Blood Claw вооружён:** Bolt Pistol; Chainsword.`,
        },
        {
          id: 'askars-wolfpack-wolf-guard-terminators',
          abilities: [
            { name: 'Rugged Resilience', text: 'Атаки, направленные на этот юнит, с S больше, чем T этого юнита, получают -1 к броскам ран.' },
          ],
          composition: [
            '1 модель Wolf Guard Terminator Pack Leader',
            '1 модель Wolf Guard Terminator with Assault Cannon and Power Fist',
            '3 модели Wolf Guard Terminator with Storm Bolter and Master-crafted Power Weapon',
          ],
          loadout: `**Wolf Guard Terminator Pack Leader вооружён:** Relic Greataxe.
**Wolf Guard Terminator with Assault Cannon and Power Fist вооружён:** Assault Cannon; Power Fist.
**Каждый Wolf Guard Terminator with Storm Bolter and Master-crafted Power Weapon вооружён:** Master-crafted Power Weapon; Storm Bolter.`,
        },
        {
          id: 'fyrri-askar',
          abilities: [
            { name: 'Storm Shield', text: 'У этой модели 6 W.' },
            { name: 'Heroic Last Stand', text: 'В фазе боя, когда эта модель уничтожена, если этот юнит ещё не был выбран для боя в этой фазе, бросьте один D6: на 2+ эту модель не убирают с поля боя. Когда этот юнит уже сражался, или в конце фазы (что наступит раньше), эту модель убирают с поля боя.' },
          ],
          composition: ['1 модель Fyrri Askar'],
          loadout: '**Эта модель вооружена:** Master-crafted Power Weapon.',
          leader: {
            text: 'Эта модель может быть прикреплена к следующим юнитам:',
          },
        },
        {
          id: 'askars-wolfpack-wulfen',
          abilities: [
            { name: 'Death Totem', text: 'Атаки этой модели в ближнем бою могут перебрасывать броски попадания 1.' },
            { name: 'Savage Frenzy', text: `Когда вражеский юнит (за исключением юнитов Monster/Vehicle), находящийся в рукопашной с этим юнитом, выбран для отступления:
▪ Этот вражеский юнит обязан выбрать режим desperate escape.
▪ Если этот вражеский юнит battle-shocked, у него -1 к броскам hazard, совершаемым для этого desperate escape.` },
          ],
          composition: ['2 модели Wulfen with Feral Claws and Stormfrag Auto-launcher', '3 модели Wulfen with Feral Claws'],
          loadout: `**Каждый Wulfen with Feral Claws and Stormfrag Auto-launcher вооружён:** Death Totem; Feral Claws; Stormfrag Auto-launcher.
**Каждый Wulfen with Feral Claws вооружён:** Death Totem; Feral Claws.`,
        },
      ],
    },
    {
      name: 'Thousand Sons',
      rule: {
        nameRu: 'Преданные ритуалу',
        flavor: 'Эмпирические ритуалы Zadophon искривляют нити судьбы, чтобы лучше служить замыслам его Тёмного Бога. Его рабы всецело преданы их завершению и не отступятся от своей роли в этих магиях, какая бы мощь ни была брошена против них.',
        body: `▪ Дружественные юниты Prism of Zadophon получают +1 Ld, пока находятся в пределах досягаемости цели.
▪ Binding Ritual (Один раз за ход, на армию): при игре в битве Combat Patrol, когда дружественная модель в пределах досягаемости цели проявляет Ritual со значением Warp Charge 7 или больше, вы можете решить, что ваша армия связала этот Ritual с этой целью (см. Cult Ritual Objective). Если делаете это, не отыгрывайте эффекты этого Ritual.
▪ При игре в битве Combat Patrol следующие дружественные юниты должны начинать битву в стратегическом резерве и не могут быть выставлены на поле боя до указанного раунда битвы, а когда это произойдёт, должны быть выставлены целиком в вашей зоне развертывания: Daemon Prince (раунд битвы 3).`,
      },
      armyRule: {
        nameRu: 'Кабал чародеев и Пакт чародейства',
        flavor: 'Thousand Sons окутаны энергиями Варпа. Дар их колдовских предводителей — направлять эту мощь боевым ритуалом, прозревать запретное знание, плести иллюзорные магии или терзать врагов эмпирическим огнём и мутацией.',
        body: `Если ваша армия относится к фракции Thousand Sons, в начале вашей фазы стрельбы одна или более моделей вашей армии с этой способностью могут попытаться совершить Rituals из перечисленных ниже. Для этого выберите одну модель вашей армии с этой способностью, что ещё не пыталась совершить Ritual в этом ходу, и выберите один Ritual, что ни одна модель вашей армии не пыталась проявить в этом ходу, затем пройдите психический тест для этой модели, следуя приведённой ниже последовательности.

**Последовательность психического теста:** Бросьте 2D6. (Опционально — Channel the Warp: добавьте один D6; затем, если во время этого теста выпали один или более дублей или троек, юнит этой модели получает D3 смертельные раны.) Если эта модель не уничтожена, суммарный итог всех кубиков, брошенных во время этого теста, — результат психического теста. Если он равен или превышает значение Warp Charge совершаемого Ritual, эта модель проявляет этот Ritual, и вы отыгрываете его эффекты.

### Destiny's Ruin (Psychic) — Warp Charge 5 | Крах судьбы (Psychic) — Warp Charge 5
Выберите один вражеский юнит в пределах 24" от проявляющей модели и видимый ей. До конца фазы каждый раз, когда модель Thousand Sons или Scintillating Legions вашей армии совершает атаку по этому юниту, перебрасывайте бросок попадания 1. Если результат психического теста для этого Ritual был 10+, вы можете перебросить бросок попадания вместо этого.

### Temporal Surge (Psychic) — Warp Charge 6 | Временной всплеск (Psychic) — Warp Charge 6
Выберите один дружественный юнит Thousand Sons или Scintillating Legions, не находящийся в пределах Engagement Range одного или более вражеских юнитов и находящийся в пределах 24" от проявляющей модели и видимый ей. Этот юнит может совершить обычное перемещение на до D6". Если результат психического теста для этого Ritual был 10+, этот юнит может совершить обычное перемещение на до 6" вместо этого. В любом случае до конца хода этот юнит не может объявить атаку.

### Doombolt (Psychic) — Warp Charge 7 | Роковой разряд (Psychic) — Warp Charge 7
Выберите один вражеский юнит в пределах 24" от проявляющей модели и видимый ей (за исключением юнитов со способностью Lone Operative, что не входят в состав прикреплённого юнита и не находятся в пределах 12" от проявляющей модели); этот юнит получает D3 смертельные раны. Если результат психического теста для этого Ritual был 11+, этот юнит получает D3+3 смертельные раны вместо этого.

### Twist of Fate (Psychic) — Warp Charge 9 | Поворот судьбы (Psychic) — Warp Charge 9
Выберите один вражеский юнит в пределах 24" от проявляющей модели и видимый ей. До конца фазы каждый раз, когда модель Thousand Sons или Scintillating Legions вашей армии совершает атаку по этому юниту, улучшайте характеристику Armour Penetration этой атаки на 1. Если результат психического теста для этого Ritual был 12+, улучшайте характеристику Armour Penetration этой атаки на 2 вместо этого.

**Pact of Sorcery:** При сборе армии, если специально не указано иное, вы не можете выбрать Scintillating Legions фракцией вашей армии.`,
      },
      stratagems: [
        {
          name: 'Twist of Fate',
          nameRu: 'Поворот судьбы',
          flavor: 'Мерцающие эмпирические энергии окружают фигуру этого мутанта-культиста. Возможно, этому существу суждено сыграть решающую роль в бесконечных замыслах Изменяющего Пути?',
          when: 'Фаза стрельбы вашего противника или фаза боя, когда вражеский юнит выбирает дружественный юнит Prism of Zadophon Mutant целью.',
          target: 'Этот юнит Prism of Zadophon Mutant.',
          effect: 'У вашего юнита 4+ InSv.',
        },
        {
          name: 'Spell-warded Armour',
          nameRu: 'Заговорённая броня',
          flavor: 'Усиленная колдовскими оберегами и порчами, броня Rubric Marines поразительно стойка к вражескому огню.',
          when: 'Фаза стрельбы вашего противника, когда вражеский юнит выбирает дружественный юнит Prism of Zadophon Rubric Marines целью.',
          target: 'Этот юнит Prism of Zadophon Rubric Marines.',
          effect: 'Дальнобойные атаки, направленные на ваш юнит, с S больше, чем T вашего юнита, получают -1 к броскам ран.',
        },
        {
          name: 'Embroiling Energies',
          nameRu: 'Вовлекающие энергии',
          flavor: 'Sorcerers, что ведут Rubricae в бою, предпочитают разрушительные магии, обращая warpflame даже в тесноте и сумятице рукопашной схватки.',
          when: 'Ваша фаза стрельбы, когда дружественный юнит Prism of Zadophon Rubric Marines выбран для стрельбы.',
          target: 'Этот юнит Prism of Zadophon Rubric Marines.',
          effect: `▪ Оружие malefic curse этого юнита получает [CLOSE-QUARTERS].
▪ Оружие malefic curse этого юнита получает +1 к броскам попадания.`,
        },
      ],
      enhancements: [
        {
          name: 'Foresight of the Changer',
          nameRu: 'Прозрение Изменяющего',
          flavor: 'Верные Tzeentch могут воспользоваться его прозорливостью и тем самым избежать верной гибели.',
          body: 'Только модель Prism of Zadophon Tzaangor Shaman. (Один раз за ход, на юнит) В фазе перемещения вашего противника, когда вражеский юнит завершает перемещение в пределах 8" от этого юнита, если этот юнит не вовлечён в бой, этот юнит может совершить обычное перемещение на до D3+1".',
        },
        {
          name: 'Warp-tainted Shells',
          nameRu: 'Снаряды, тронутые варпом',
          flavor: 'Искажённая злокозненным колдовством, infernal cannon Zadophon изрыгает искажённые Варпом снаряды, которые при попадании выжигают душу так же страшно, как уничтожают плоть.',
          body: 'Только модель Prism of Zadophon Daemon Prince. Оружие infernal cannon этой модели получает [PSYCHIC].',
        },
      ],
      datasheets: [
        {
          id: 'kaaskrek',
          abilities: [
            { name: 'Bestial Prophet', text: 'Если этот юнит — прикреплённый юнит, атаки этого юнита получают +1 к броскам попадания.' },
            { name: 'Sacrificial Blessing', text: `В вашей фазе стрельбы и фазе боя, когда этот юнит выбран для атаки, если в этом юните есть одна или более моделей Bodyguard, вы можете использовать эту способность. Если делаете это:
▪ Одна модель Bodyguard в этом юните уничтожается.
▪ Атаки этой модели получают +D3 A и S.` },
          ],
          composition: ["1 модель Kaa'skrek"],
          loadout: '**Эта модель вооружена:** Baleful Devolution; Force Stave.',
          leader: {
            text: 'Эта модель может быть прикреплена к следующим юнитам:',
          },
        },
        {
          id: 'zadophon-the-soul-eater',
          abilities: [
            { name: 'Spirit Snare', text: 'Когда дружественная модель Thousand Sons Psyker со способностью Cabal of Sorcerers уничтожена, если эта модель находилась в пределах 9" от модели с этой способностью, вы можете выбрать одну из таких моделей с этой способностью. Когда выбранная модель пытается совершить Ritual, у неё +1 к результату психического теста (максимум +2).' },
            { name: 'Glamour of Tzeentch (Aura, Psychic)', text: 'Пока дружественный юнит Thousand Sons Infantry находится в пределах 6" от этой модели, этот юнит имеет Stealth.' },
          ],
          composition: ['1 модель Zadophon the Soul Eater'],
          loadout: '**Эта модель вооружена:** Hellforged Weapons; Infernal Cannon.',
        },
        {
          id: 'prism-of-zadophon-tzaangor-enlightened',
          abilities: [
            { name: 'Prophesied Doom', text: `Когда этот юнит завершает рывок в атаку, вы можете выбрать один вражеский юнит, находящийся в рукопашной с этим юнитом. За каждую модель в этом юните, находящуюся в рукопашной с этим вражеским юнитом, бросьте один D6:
▪ На 4+ этот вражеский юнит получает 1 смертельную рану.` },
          ],
          composition: ['3 модели Tzaangor Enlightened'],
          loadout: '**Каждая модель вооружена:** Divining Spear.',
        },
        {
          id: 'prism-of-zadophon-rubric-marines',
          abilities: [
            { name: 'Icon of Flame', text: 'Дальнобойные атаки этого юнита (за исключением атак моделей Character) получают [IGNORES COVER].' },
            { name: 'Bringers of Change', text: `Дальнобойные атаки этого юнита:
▪ Могут перебрасывать броски ран 1.
▪ Или: направленные на юнит в пределах досягаемости цели могут перебрасывать броски ран.` },
          ],
          composition: [
            '1 модель Aspiring Sorcerer',
            '1 модель Rubric Marine with Soulreaper Cannon and Stocks and Fists',
            '3 модели Rubric Marine with Inferno Boltgun and Stocks and Fists',
            '5 моделей Rubric Marine with Warpflamer and Stocks and Fists',
          ],
          loadout: `**Aspiring Sorcerer вооружён:** Force Weapon; Inferno Bolt Pistol; Malefic Curse.
**Rubric Marine with Soulreaper Cannon and Stocks and Fists вооружён:** Soulreaper Cannon; Stocks and Fists.
**Каждый Rubric Marine with Inferno Boltgun and Stocks and Fists вооружён:** Inferno Boltgun; Stocks and Fists.
**Каждый Rubric Marine with Warpflamer and Stocks and Fists вооружён:** Stocks and Fists; Warpflamer.`,
        },
      ],
    },
    {
      name: 'Tyranids',
      rule: {
        nameRu: 'Снующие орды',
        flavor: 'Кишащие организмы Vardenghast Swarm столь многочисленны и ужасны, что смертный разум с трудом способен выбрать цель среди мельтешащих масс.',
        body: 'Дальнобойные атаки вражеских юнитов, направленные на дружественный юнит Vardenghast Swarm Infantry, не находящийся в пределах 12", получают -1 к броскам попадания.',
      },
      armyRule: {
        nameRu: 'Синапс и Тень в варпе',
        flavor: 'Кишащие выводки флота-улья не мыслят сами по себе. Ими управляет гештальт-сознание Разума Улья, чья железная воля направляется сквозь синапс-тварей и накрывает поле боя ледяным, чужеродным ужасом, что грызёт разумы добычи.',
        body: `### Synapse | Синапс
Некоторые Tyranids служат синаптическими проводниками или узловыми ретрансляторами, сквозь которые течёт часть железной воли Разума Улья, переопределяя природные инстинкты роя, чтобы направить кишащих воинов-тварей действовать как единый гештальт-организм на поле боя.

Если ваша армия относится к фракции Tyranids, пока юнит Tyranids вашей армии находится в пределах 6" от одной или более дружественных моделей Synapse, этот юнит Tyranids считается находящимся в пределах Synapse Range этой модели и вашей армии. Пока юнит Tyranids вашей армии находится в пределах Synapse Range вашей армии:
▪ Каждый раз, когда этот юнит проходит проверку морального духа, проходите эту проверку на 3D6 вместо 2D6.
▪ Каждый раз, когда модель этого юнита совершает атаку в ближнем бою, добавляйте 1 к характеристике Strength этой атаки.

### Shadow in the Warp | Тень в варпе
Tyranids наводняют поле боя психической сигнатурой флота-улья — ледяным, чужеродным ужасом, что грызёт разумы их добычи и душит даже стойчайшее мужество. Столкнувшись с таким непостижимым ужасом, многие сходят с ума или получают катастрофические неврологические повреждения.

Если ваша армия относится к фракции Tyranids, один раз за битву, в фазе командования любого игрока, если один или более юнитов вашей армии с этой способностью на поле боя, вы можете выпустить Shadow in the Warp. Когда вы это делаете, каждый вражеский юнит на поле боя должен пройти проверку морального духа. Каждый раз, когда вражеский юнит проходит такую проверку морального духа, если он находится в пределах 6" от одного или более юнитов Synapse вашей армии, вычитайте 1 из этой проверки.`,
      },
      stratagems: [
        {
          name: 'Swarm-marked',
          nameRu: 'Помечены роем',
          flavor: 'Богатые биомассой позиции пропитываются феромонами и ядовитыми спорами воинов-тварей Vardenghast Swarm, помечая их для следующих волн, чтобы те захлестнули и пожрали их.',
          when: 'Конец вашей фазы перемещения.',
          target: 'Один дружественный юнит Vardenghast Swarm Termagants.',
          effect: 'Выберите один объект, который контролирует ваш юнит. Этот объект будет secured.',
        },
        {
          name: 'Skulking Hunters',
          nameRu: 'Крадущиеся охотники',
          flavor: 'Обладая обострёнными инстинктами истинных хищников, воины-твари Vardenghast Swarm способны на скрытность, шныряя сквозь тени и укрытия, чтобы скрыть своё приближение от настороженных врагов.',
          when: 'Начало фазы стрельбы вашего противника.',
          target: 'Один дружественный юнит Vardenghast Swarm Infantry.',
          effect: 'У вашего юнита -6" к дальности обнаружения.',
        },
        {
          name: 'Brute Speed',
          nameRu: 'Звериная скорость',
          flavor: 'Vardenghast Swarm устремляется к добыче с пугающей скоростью, скачками пересекая открытую местность и разрушенные руины, чтобы настичь дрогнувшую жертву.',
          when: 'Ваша фаза перемещения, когда дружественный юнит Vardenghast Swarm выбран для продвижения.',
          target: 'Этот юнит Vardenghast Swarm.',
          effect: 'Ваш юнит может изменить этот бросок на продвижение на 6.',
        },
      ],
      enhancements: [
        {
          name: 'Adapted Organism',
          nameRu: 'Приспособленный организм',
          flavor: 'Выкованный Разумом Улья как специализированный убийца, этот воин-тварь обладает сверхчуткими рефлексами, обильными быстросокращающимися мышечными волокнами и дополнительными, абляционными слоями хитиновой пластины.',
          body: `Только модель Vardenghast Swarm Winged Tyranid Prime.
▪ У этой модели 4+ InSv.
▪ Атаки этой модели в ближнем бою получают +2 AP.`,
        },
        {
          name: 'Psychoclastic Overload',
          nameRu: 'Психокластическая перегрузка',
          flavor: 'Когда удерживающие мешки Psychophage достигают предела вместимости, это существо способно извергнуть поток психоразъедающих частиц, достаточный, чтобы разъесть разум и тела целого отряда вражеских солдат.',
          body: 'Улучшение: только юнит Vardenghast Swarm Psychophage. Этот юнит может перебрасывать броски, чтобы определить A оружия.',
        },
      ],
      datasheets: [
        {
          id: 'vardenghast-swarm-psychophage',
          abilities: [
            { name: 'Feeding Frenzy', text: `Атаки этой модели в ближнем бою, направленные на:
▪ Юнит ниже начальной численности, получают +1 к броскам попадания.
▪ Юнит ниже половины боевой численности, получают +1 к броскам ран.` },
            { name: 'Bio-stimulus (Aura)', text: 'Пока дружественный юнит Tyranids находится в пределах 6" от этой модели, этот юнит имеет Feel No Pain 6+.' },
          ],
          composition: ['1 модель Psychophage'],
          loadout: '**Эта модель вооружена:** Psychoclastic Torrent; Talons and Betentacled Maw.',
        },
        {
          id: 'vardenghast-swarm-barbgaunts',
          abilities: [
            { name: 'Disruption Bombardment', text: `В вашей фазе стрельбы, когда этот юнит выстрелил, вы можете выбрать один вражеский юнит, по которому пришлись эти атаки. Если делаете это, этот вражеский юнит будет pinned до начала вашего следующего хода:
▪ Пока юнит pinned, у него:
▪ -2" M.
▪ -2 к броскам на продвижение и броскам на рывок.` },
          ],
          composition: ['5 моделей Barbgaunt'],
          loadout: '**Каждая модель вооружена:** Barblauncher; Chitinous Claws and Teeth.',
        },
        {
          id: 'terror-of-vardenghast',
          abilities: [
            { name: 'Death Blow', text: `В фазе боя, когда эта модель уничтожена, если этот юнит ещё не был выбран для боя в этой фазе, бросьте один D6:
▪ На 4+ эту модель не убирают с поля боя. Когда ваш юнит уже сражался, или в конце фазы (что наступит раньше), эту модель убирают с поля боя.` },
            { name: 'Bio-Reserves (Once per battle per unit)', text: `В начале или в конце вашей фазы перемещения вы можете использовать эту способность. Если делаете это:
▪ Выберите один дружественный не вовлечённый в бой юнит Vardenghast Swarm Termagants. Этот юнит восстанавливает 2D6 ран.
▪ Или: выберите один дружественный уничтоженный юнит Vardenghast Swarm Termagants. Этот юнит восстанавливает 10 ран и помещается в стратегический резерв.` },
          ],
          composition: ['1 модель Terror of Vardenghast'],
          loadout: '**Эта модель вооружена:** Prime Talons.',
        },
        {
          id: 'vardenghast-swarm-termagants',
          abilities: [
            { name: 'Skulking Horrors (Once per phase per unit)', text: 'В фазе перемещения вашего противника, когда вражеский юнит завершает перемещение в пределах 8" от этого юнита, если этот юнит не вовлечён в бой, этот юнит может совершить обычное перемещение на до D6".' },
          ],
          composition: ['10 моделей Termagant'],
          loadout: '**Каждая модель вооружена:** Chitinous Claws and Teeth; Fleshborer.',
        },
        {
          id: 'vardenghast-swarm-von-ryans-leapers',
          abilities: [
            { name: 'Pouncing Leap (Once per turn per unit)', text: `Вы можете выбрать этот юнит целью стратагемы Heroic Intervention, независимо от любых других применений этой стратагемы в этой фазе. Если делаете это:
▪ Это применение стоит на -1 CP дешевле.
▪ Это применение не мешает другим применениям этой стратагемы на другие юниты в этой фазе.` },
          ],
          composition: ["3 модели Von Ryan's Leaper"],
          loadout: '**Каждая модель вооружена:** Chitinous Talons.',
        },
      ],
    },
    {
      name: 'World Eaters',
      rule: {
        nameRu: 'Рывок берсерка',
        flavor: 'World Eaters атакуют беспощадными волнами ярости, каждая из которых столь же неистова и кровожадна, как предыдущая.',
        body: `▪ Когда дружественный юнит Frenzied Reavers выбран для боя, если этот юнит в этом ходу совершил рывок в атаку, его атаки в ближнем бою получают +1 S.
▪ При игре в битве Combat Patrol следующие дружественные юниты должны начинать битву в стратегическом резерве и не могут быть выставлены на поле боя до указанного раунда битвы, а когда это произойдёт, должны быть выставлены целиком в вашей зоне развертывания: Daemon Prince (раунд битвы 2).`,
      },
      armyRule: {
        nameRu: 'Благословения Кхорна',
        flavor: 'Khorne — бог Хаоса войны и резни, которому преданы все World Eaters. Он благословляет тех, кто проливает кровь и берёт черепа во имя его.',
        body: `Если ваша армия относится к фракции World Eaters, в начале раунда битвы вы можете сделать бросок Blessings of Khorne. Для этого бросьте восемь D6. Затем вы можете использовать эти кубики для активации до двух Благословений Кхорна (см. ниже). Каждое Благословение Кхорна указывает требуемые результаты кубиков (если указано число, требуется дубль или трипл этого значения или выше). Каждое Благословение Кхорна можно активировать только один раз за раунд битвы. Все неиспользованные кубики броска Blessings of Khorne затем сбрасываются. После активации каждое Благословение Кхорна применяется ко всем юнитам вашей армии с этой способностью до конца раунда битвы.

### The Blessings | Благословения
▪ **Unbridled Bloodlust (дубль 1+):** у этого юнита +1 к броскам на рывок.
▪ **Rage-Fuelled Invigoration (дубль 2+):** каждый раз, когда модель этого юнита совершает манёвр Pile-in или консолидацию, она может переместиться на до 6" вместо до 3".
▪ **Total Carnage (дубль 3+):** каждый раз, когда модель этого юнита уничтожается атакой в ближнем бою, если она ещё не сражалась в этой фазе, бросьте один D6: на 4+ не убирайте её из игры. Уничтоженная модель может сразиться после того, как атакующий юнит закончит свои атаки, и затем убирается из игры.
▪ **Martial Excellence (дубль 4+):** оружие ближнего боя, которым вооружены модели этого юнита, получает способность [SUSTAINED HITS 1].
▪ **Warp Blades (дубль 5+):** оружие ближнего боя, которым вооружены модели этого юнита, получает способность [LETHAL HITS].
▪ **Decapitating Strikes (дубль 6):** каждый раз, когда модель этого юнита совершает атаку в ближнем бою по юниту Infantry, эта атака получает способность [DEVASTATING WOUNDS].`,
      },
      stratagems: [
        {
          name: 'Horrifying Butchery',
          nameRu: 'Ужасающая резня',
          flavor: 'Топором-цепом, сапогом и кулаком Khorne Berzerkers прорубают и проламывают себе путь вперёд, а пропитанное кровью насилие их наступления наполняет смертные сердца парализующим ужасом.',
          when: 'Начало фазы боя.',
          target: 'Один дружественный вовлечённый в бой юнит Frenzied Reavers Khorne Berzerkers.',
          effect: 'Выберите один вражеский юнит, находящийся в рукопашной с вашим юнитом. Этот вражеский юнит проходит проверку морального духа с -1 к этой проверке.',
        },
        {
          name: 'Berserk Resilience',
          nameRu: 'Берсеркерская живучесть',
          flavor: 'Потерявшись в экстазе резни, последователи Khorne становятся почти невосприимчивы к ранениям.',
          when: 'Фаза стрельбы вашего противника, когда вражеский юнит выбирает дружественный юнит Frenzied Reavers Infantry целью.',
          target: 'Этот юнит Frenzied Reavers Infantry.',
          effect: 'Дальнобойные атаки, направленные на ваш юнит, с S больше, чем T вашего юнита, получают -1 к броскам ран.',
        },
        {
          name: 'Rabid Response',
          nameRu: 'Бешеный отклик',
          flavor: 'Со стимулянтами и порочной кровью, текущими по артериям и венам, Jakhals пребывают в постоянном состоянии судорожного неистовства, реагируя на вражеский огонь тем, что бросаются всем телом на нападающих.',
          when: 'Фаза стрельбы вашего противника, когда вражеский юнит выстрелил, если этот юнит выбирал целью дружественный не вовлечённый в бой юнит Frenzied Reavers Jakhals.',
          target: 'Этот юнит Frenzied Reavers Jakhals.',
          effect: 'Ваш юнит может совершить обычное перемещение на до D6".',
        },
      ],
      enhancements: [
        {
          name: 'Bane of the Craven',
          nameRu: 'Погибель труса',
          flavor: 'Daemon Princes of Khorne приберегают самую свирепую ненависть для трусов, безудержно вырезая всех, кто бежит с поля боя.',
          body: `Только модель Frenzied Reavers Master of Executions. Когда вражеский юнит, находящийся в рукопашной с этим юнитом, выбран для отступления:
▪ Этот вражеский юнит обязан выбрать режим desperate escape.
▪ Если этот вражеский юнит battle-shocked, у него -1 к броскам hazard, совершаемым для этого desperate escape.`,
        },
        {
          name: 'Fearsome Presence',
          nameRu: 'Устрашающее присутствие',
          flavor: 'Возвышающиеся адские чудовища, Daemon Princes of Khorne властвуют над полем боя, вселяя беспросветный ужас во всех, кто стоит перед ними.',
          body: 'Только модель Frenzied Reavers Daemon Prince. У этой модели OC 5.',
        },
      ],
      datasheets: [
        {
          id: 'frenzied-reavers-khorne-berzerkers',
          abilities: [
            { name: 'Icon of Khorne', text: `Когда этот юнит уничтожает вражеский юнит, вы получаете 1 Bloodshed Point. При броске Blessings of Khorne:
▪ Бросайте один дополнительный D6 за каждое имеющееся у вас Bloodshed Point.
▪ Затем вы теряете свои Bloodshed Points.` },
            { name: 'Blood Surge (Once per turn, per unit)', text: 'В фазе стрельбы вашего противника, когда вражеский юнит выстрелил, если эти атаки уничтожили модель в этом юните и этот юнит не вовлечён в бой, этот юнит может совершить рывок на до D6+2".' },
          ],
          composition: [
            '1 модель Khorne Berzerker Champion',
            '2 модели Khorne Berzerker with Bolt Pistol and Khornate Eviscerator',
            '2 модели Khorne Berzerker with Plasma Pistol and Chainblade',
            '5 моделей Khorne Berzerker with Bolt Pistol and Chainblade',
          ],
          loadout: `**Khorne Berzerker Champion вооружён:** Chainblade; Plasma Pistol.
**Каждый Khorne Berzerker with Bolt Pistol and Khornate Eviscerator вооружён:** Bolt Pistol; Khornate Eviscerator.
**Каждый Khorne Berzerker with Plasma Pistol and Chainblade вооружён:** Chainblade; Plasma Pistol.
**Каждый Khorne Berzerker with Bolt Pistol and Chainblade вооружён:** Bolt Pistol; Chainblade.`,
        },
        {
          id: 'frenzied-reavers-master-of-executions',
          abilities: [
            { name: 'A Worthy Skull', text: `▪ Атаки этой модели в ближнем бою, направленные на юнит Character, могут перебрасывать броски попадания и броски ран.
▪ Когда этот юнит уничтожает модель Character, вы получаете 1 CP.` },
          ],
          composition: ['1 модель Master of Executions'],
          loadout: '**Эта модель вооружена:** Axe of Dismemberment; Bolt Pistol.',
          leader: {
            text: 'Эта модель может быть прикреплена к следующим юнитам:',
          },
        },
        {
          id: 'frenzied-reavers-jakhals',
          abilities: [
            { name: 'Icon of Khorne', text: `Когда этот юнит уничтожает вражеский юнит, вы получаете 1 Bloodshed Point. При броске Blessings of Khorne:
▪ Бросайте один дополнительный D6 за каждое имеющееся у вас Bloodshed Point.
▪ Затем вы теряете свои Bloodshed Points.` },
            { name: 'Objective Ravaged', text: 'В конце вашей фазы командования, если этот юнит контролирует цель, эта цель считается захваченной.' },
          ],
          composition: [
            '1 модель Dishonoured',
            '1 модель Jakhal Pack Leader',
            '1 модель Jakhal with Autopistol and Mauler Chainblade',
            '7 моделей Jakhal with Autopistol and Chainblade',
          ],
          loadout: `**Dishonoured вооружён:** Skullsmasher and Mangler.
**Jakhal Pack Leader вооружён:** Autopistol; Chainblade.
**Jakhal with Autopistol and Mauler Chainblade вооружён:** Autopistol; Mauler Chainblade.
**Каждый Jakhal with Autopistol and Chainblade вооружён:** Autopistol; Chainblade.`,
        },
        {
          id: 'vorrakh-lord-of-the-frenzied-reavers',
          abilities: [
            { name: 'Lord of Murder', text: 'Пока эта модель находится в пределах 3" от дружественного юнита Frenzied Reavers Infantry, этот юнит имеет Lone Operative.' },
            { name: 'Direct the Slaughter', text: '(Один раз за раунд битвы, на армию) Когда дружественный юнит Frenzied Reavers в пределах 12" от этой модели выбирается целью стратагемы, вы можете использовать эту способность. Если делаете это, это применение стоит на -1 CP дешевле.' },
            { name: 'Devastating Assault', text: 'Если этот юнит в этом ходу совершил рывок в атаку, атаки этого юнита в ближнем бою получают [DEVASTATING WOUNDS].' },
          ],
          composition: ['1 модель Vorrakh'],
          loadout: '**Эта модель вооружена:** Hellforged Weapons; Infernal Cannon.',
        },
      ],
    },
    {
      name: 'Genestealer Cults',
      rule: {
        nameRu: 'Ксеносская живучесть',
        flavor: 'Какими бы человечными они ни выглядели, все Genestealer Cultists — генетические химеры. Слияние человеческой и ксеносской генетики часто приводит к более прочной коже, росту хитиновых пластин и другим мутациям, обеспечивающим значительную защиту от вражеского огня.',
        body: 'Дальнобойные атаки, направленные на дружественные юниты Claw of Ascension, с S больше, чем T этого юнита, получают -1 к броскам ран.',
      },
      armyRule: {
        nameRu: 'Засада культа',
        flavor: 'Genestealer Cults тщательно скрывают свою боевую мощь от угнетателей до наступления славного Дня Вознесения. Пока основные силы поднимаются в разгар яростной битвы, подкрепления выскальзывают из теней или выплёскиваются из тёмных глубин, призванные на войну Broodmind.',
        body: `Если ваша армия относится к фракции Genestealer Cults, вы начинаете битву с определённым числом Resurgence points, зависящим от размера битвы, как показано ниже.
▪ Combat Patrol: 2 Resurgence points
▪ Incursion: 6 Resurgence points
▪ Strike Force: 10 Resurgence points
▪ Onslaught: 14 Resurgence points

Каждый раз, когда юнит вашей армии уничтожен, если каждая модель в этом юните имеет эту способность, вы можете потратить соответствующее число Resurgence points, указанное ниже, в зависимости от начальной численности этого юнита.
▪ Claw of Ascension Hybrid Metamorphs (5 моделей): 2 Resurgence points
▪ Claw of Ascension Atalan Jackals (5 моделей): 2 Resurgence points

Если делаете это:
▪ Добавьте в свою армию новый юнит, идентичный вашему уничтоженному юниту, в Cult Ambush, с начальной численностью, со всеми оставшимися ранами и с любым оружием [ONE SHOT], которым вооружены эти модели, считающимся не использованным.
▪ Поместите один маркер Cult Ambush (см. ниже) в любом месте поля боя, находящемся более чем в 9" по горизонтали от всех вражеских юнитов (если это невозможно, маркер не размещается).

### Units in Cult Ambush | Юниты в засаде культа
Cult Ambush — разновидность стратегического резерва. Юниты в Cult Ambush не могут быть выбраны целью стратагемы Rapid Ingress, но могут быть выставлены на поле боя с помощью маркера Cult Ambush, как описано ниже, либо по правилам стратегического резерва в последующем ходу. Юниты в Cult Ambush не уничтожаются автоматически в конце третьего раунда битвы.

### Cult Ambush Markers | Маркеры засады культа
Используйте круглый маркер диаметром 32 мм для маркеров Cult Ambush. Если вражеская модель (за исключением Aircraft) заканчивает любое перемещение в пределах 8" от размещённого вами маркера Cult Ambush, этот маркер Cult Ambush убирается с поля боя. В конце следующей фазы перемещения вашего противника, за каждый ваш маркер Cult Ambush, всё ещё находящийся на поле боя, вы можете выбрать один юнит вашей армии, находящийся в Cult Ambush, чтобы совершить ingress move. Для этого ingress move выставьте этот юнит так, чтобы как минимум одна модель в этом юните находилась в контакте баз с этим маркером Cult Ambush, а все остальные модели были размещены целиком в пределах 3" от этого маркера Cult Ambush (после этого маркер Cult Ambush убирается с поля боя). Юниты в Cult Ambush могут совершить ingress move в первом раунде битвы по этому правилу.`,
      },
      stratagems: [
        {
          name: 'Cult Zealotry',
          nameRu: 'Фанатизм культа',
          flavor: 'Одержимые своим делом, Genestealer Cultists всех форм и фаз сражаются с дикой решимостью, чтобы обрести свободу и обеспечить славное прибытие своих рождённых звёздами спасителей.',
          when: 'Фаза боя, когда дружественный юнит Claw of Ascension выбран для боя.',
          target: 'Этот юнит Claw of Ascension.',
          effect: 'Атаки вашего юнита в ближнем бою могут перебрасывать броски ран.',
        },
        {
          name: 'Dedicated to the End',
          nameRu: 'Преданы до конца',
          flavor: 'Культисты Claw of Ascension не боятся смерти. Но и не принимают её покорно. Они сражаются до последнего вздоха, чтобы истребить угнетателей и обеспечить свободу будущим поколениям.',
          when: 'Фаза боя, когда вражеский юнит выбирает дружественный юнит Claw of Ascension целью.',
          target: 'Этот юнит Claw of Ascension.',
          effect: `Когда модель в вашем юните уничтожена, если ваш юнит ещё не был выбран для боя в этой фазе, бросьте один D6:
▪ На 3+ эту модель не убирают с поля боя. Когда ваш юнит уже сражался, или в конце фазы (что наступит раньше), эту модель убирают с поля боя.`,
        },
        {
          name: 'Guerrilla Warriors',
          nameRu: 'Партизаны',
          flavor: 'Привыкшие сражаться против превосходящих противников, Genestealer Cults используют тактику удара и отхода, а также другие шоковые приёмы, чтобы уравнять шансы.',
          when: 'Ваша фаза перемещения, когда дружественный юнит Claw of Ascension выбран для отступления.',
          target: 'Этот юнит Claw of Ascension.',
          effect: 'Это перемещение не мешает вашему юниту быть подходящим для стрельбы/объявления атаки.',
        },
      ],
      enhancements: [
        {
          name: 'Heavy Munitions',
          nameRu: 'Тяжёлые боеприпасы',
          flavor: 'Запасы высококачественных боеприпасов, захваченных со вражеских складов снабжения, дают Claw of Ascension огневую мощь, необходимую для борьбы с тяжелобронированными целями.',
          body: 'Улучшение: только юнит Claw of Ascension Achilles Ridgerunners. Оружие Achilles missile launcher этого юнита получает +1 A, S и AP.',
        },
        {
          name: 'Practiced Eye',
          nameRu: 'Намётанный глаз',
          flavor: 'Мастерство Shanus Daskovian как снайпера легендарно среди её культа, и она столь же искусна в наведении огня партизан культа под её командованием.',
          body: 'Только модель Claw of Ascension Jackal Alphus. В начале вашей фазы стрельбы вы можете выбрать один вражеский юнит. Атаки дружественных юнитов Claw of Ascension, направленные на этот вражеский юнит, получают +1 к броскам попадания.',
        },
      ],
      datasheets: [
        {
          id: 'claw-of-ascension-hybrid-metamorphs',
          abilities: [
            { name: 'Brood Claim', text: 'В конце вашей фазы перемещения, если этот юнит контролирует цель, эта цель считается захваченной.' },
          ],
          composition: ['1 модель Metamorph', '1 модель Metamorph Leader', '3 модели Metamorph with Hand Flamer'],
          loadout: `**Metamorph вооружён:** Metamorph Mutations.
**Metamorph Leader вооружён:** Autopistol; Leader's Weapon Symbiote.
**Каждый Metamorph with Hand Flamer вооружён:** Hand Flamer; Metamorph Mutations.`,
        },
        {
          id: 'shanus-daskovian',
          abilities: [
            { name: 'Priority Target', text: 'В вашей фазе стрельбы, когда этот юнит выстрелил, вы можете выбрать один вражеский юнит, по которому пришлись эти атаки cult sniper rifle. Атаки дружественных юнитов Genestealer Cults, направленные на этот вражеский юнит, могут перебрасывать броски попадания 1.' },
            { name: 'Master Outrider', text: `В вашей фазе стрельбы, когда этот юнит выстрелил, вы можете использовать эту способность. Если делаете это:
▪ Этот юнит может совершить обычное перемещение на до 6".
▪ Этот юнит не может объявить атаку до конца хода.` },
          ],
          composition: ['1 модель Shanus Daskovian'],
          loadout: '**Эта модель вооружена:** Autopistol; Cult Sniper Rifle; Stolen Blade.',
          leader: {
            text: 'Эта модель может быть прикреплена к следующим юнитам:',
          },
        },
        {
          id: 'claw-of-ascension-atalan-jackals',
          abilities: [
            { name: 'Adaptable Fighters', text: `Когда этот юнит выбран для атаки, его атаки получают:
▪ [SUSTAINED HITS 1].
▪ Или: [LETHAL HITS].` },
          ],
          composition: ['1 модель Atalan Jackal with Power Weapon', '1 модель Atalan Wolfquad', '3 модели Atalan Jackal'],
          loadout: `**Atalan Jackal with Power Weapon вооружён:** Power Weapon; Stolen Firearms.
**Atalan Wolfquad вооружён:** Mining Laser; Stolen Blade; Stolen Firearms.
**Каждый Atalan Jackal вооружён:** Stolen Blade; Stolen Firearms.`,
        },
        {
          id: 'claw-of-ascension-achilles-ridgerunner',
          abilities: [
            { name: 'Survey Augur', text: 'В вашей фазе стрельбы, когда этот юнит выстрелил, вы можете выбрать один вражеский юнит, по которому пришлись эти атаки. Атаки дружественных юнитов Genestealer Cults, направленные на этот вражеский юнит, получают [IGNORES COVER].' },
            { name: 'Crossfire', text: 'В вашей фазе стрельбы, когда этот юнит выстрелил, вы можете выбрать один вражеский юнит, по которому пришлись эти атаки и который ещё не был выбран для этой способности в этом ходу. Атаки дружественных юнитов Genestealer Cults, направленные на этот вражеский юнит, получают +1 AP до конца хода.' },
          ],
          composition: ['1 модель Achilles Ridgerunner'],
          loadout: '**Эта модель вооружена:** Armoured Hull; Missile Launcher; Survey Augur; Twin Heavy Stubber.',
        },
      ],
    },
    {
      name: 'Grey Knights',
      rule: {
        nameRu: 'Удар из варпа',
        flavor: 'Мастера технологии телепортации и прочего варп-ремесла, Grey Knights часто держат воинов в резерве, готовых вступить в бой в любой момент. Когда их призывают к битве, эти воины наносят удар будто из ниоткуда, атакуя ошеломлённых врагов прежде, чем те успеют поднять оружие в ответ.',
        body: `▪ Когда дружественный юнит Crowe's Sanctifiers завершает рывок в атаку, если этот юнит в этом ходу совершил ingress move, вы можете выбрать один вражеский юнит, находящийся в рукопашной с этим дружественным юнитом. Если делаете это, этот вражеский юнит проходит проверку морального духа.
▪ При игре в битве Combat Patrol следующие дружественные юниты должны начинать битву в стратегическом резерве и не могут быть выставлены на поле боя до указанного раунда битвы, а когда это произойдёт, должны быть выставлены целиком в вашей зоне развертывания: Brotherhood Terminator Squad (раунд битвы 2), Venerable Dreadnought (раунд битвы 3).`,
      },
      armyRule: {
        nameRu: 'Врата бесконечности',
        flavor: 'Немногие способны повелевать силами Варпа со сравнимым мастерством и контролем, как Grey Knights. Их колдовство настолько совершенно, что они могут вызывать светящиеся эмпирические врата, чтобы шагнуть за пределы реальности и обратно. Так они стремительно обходят врагов с фланга и перебрасывают свои силы навстречу угрозам, оставаясь невредимыми во время мгновенного варп-перехода благодаря замысловатым оберегам, вплетённым в их снаряжение.',
        body: 'Если ваша армия относится к фракции Grey Knights, в конце фазы боя вашего противника вы можете выбрать некоторое число юнитов вашей армии, находящихся на поле боя (за исключением юнитов, находящихся в пределах Engagement Range одного или более вражеских юнитов), при условии что каждая модель в этих юнитах имеет эту способность. Как только вы сделали свой выбор, уберите эти юниты с поля боя и поместите их в стратегический резерв.',
      },
      stratagems: [
        {
          name: 'Exigent Assignments',
          nameRu: 'Неотложные задания',
          flavor: 'Когда на кону судьба Империума, время всегда имеет значение. Оставляя за собой сломленные тела своих жертв, Crowe\'s Sanctifiers продвигаются к назначенным целям.',
          when: 'Фаза боя, когда дружественный юнит Crowe\'s Sanctifiers выбран для совершения консолидации.',
          target: 'Этот юнит Crowe\'s Sanctifiers.',
          effect: 'При совершении этой консолидации ваш юнит может переместиться на до D3+3".',
        },
        {
          name: 'Refusal to Yield',
          nameRu: 'Отказ уступить',
          flavor: 'От Grey Knights Strike Squads ожидают, что они выстоят перед величайшими эмпирическими угрозами и никогда не дрогнут. С несокрушимой решимостью они отмахиваются от всех ударов, кроме самых сокрушительных.',
          when: 'Фаза стрельбы вашего противника, когда вражеский юнит выбирает дружественный юнит Crowe\'s Sanctifiers Strike Squad целью.',
          target: 'Этот юнит Crowe\'s Sanctifiers Strike Squad.',
          effect: 'Дальнобойные атаки, направленные на ваш юнит, с S больше, чем T вашего юнита, получают -1 к броскам ран.',
        },
        {
          name: 'Psi-reactive Ammunition',
          nameRu: 'Пси-реактивные боеприпасы',
          flavor: 'Пропитанные отрицательной психической энергией, эти боеприпасы смертоносно эффективны против чародеев, демонов и прочих, кто черпает свою силу из Варпа.',
          when: 'Ваша фаза стрельбы, когда дружественный юнит Crowe\'s Sanctifiers выбран для стрельбы.',
          target: 'Этот юнит Crowe\'s Sanctifiers.',
          effect: 'Оружие storm bolter вашего юнита получает [PSYCHIC].',
        },
      ],
      enhancements: [
        {
          name: 'Sanctified Auspexes',
          nameRu: 'Освящённые ауспики',
          flavor: 'Древние, ритуально очищенные и благословлённые Техножрецами ордена, сверхчувствительные ауспики наведения обеспечивают исключительно точное целеуказание.',
          body: 'Улучшение: только юнит Crowe\'s Sanctifiers Venerable Dreadnought. Дальнобойные атаки этого юнита могут перебросить один бросок попадания.',
        },
        {
          name: 'Purifying Force',
          nameRu: 'Очищающая сила',
          flavor: 'Терминаторы Purifiers часто сталкиваются с чудовищными противниками. Сочетая физическую, механическую и духовную мощь, они наносят удары, достаточно сильные, чтобы дробить броню, раскалывать панцири и изгонять нечестивое.',
          body: 'Улучшение: только юнит Crowe\'s Sanctifiers Brotherhood Terminator Squad. (Один раз за битву, на армию) Когда этот юнит выбран для боя, если он в этом ходу совершил рывок в атаку, вы можете использовать эту способность. Если делаете это, атаки этого юнита в ближнем бою получают [LETHAL HITS].',
        },
      ],
      datasheets: [
        {
          id: 'crowes-sanctifiers-strike-squad',
          abilities: [
            { name: 'Sanctifying Ritual (Psychic)', text: 'В конце вашей фазы командования, если этот юнит контролирует цель, эта цель считается захваченной.' },
            { name: 'Combat Squad', text: 'В начале шага «Объявление боевых построений» вы можете разделить этот юнит на два отдельных юнита по пять моделей в каждом.' },
          ],
          composition: [
            '1 модель Grey Knight with Incinerator and Ceramite Fists',
            '1 модель Grey Knight with Psycannon and Ceramite Fists',
            '1 модель Justicar',
            '7 моделей Grey Knight with Storm Bolter and Nemesis Force Weapon',
          ],
          loadout: `**Grey Knight with Incinerator and Ceramite Fists вооружён:** Ceramite Fists; Incinerator.
**Grey Knight with Psycannon and Ceramite Fists вооружён:** Ceramite Fists; Psycannon.
**Justicar вооружён:** Nemesis Force Weapon; Storm Bolter.
**Каждый Grey Knight with Storm Bolter and Nemesis Force Weapon вооружён:** Nemesis Force Weapon; Storm Bolter.`,
        },
        {
          id: 'crowes-sanctifiers-venerable-dreadnought',
          abilities: [
            { name: 'Guidance of the Ancients (Psychic)', text: 'В вашей фазе стрельбы, когда этот юнит выстрелил, вы можете выбрать один вражеский юнит, по которому пришлись эти дальнобойные атаки. Если делаете это, дальнобойные атаки дружественных моделей Grey Knights, направленные на этот вражеский юнит, получают +1 к броскам попадания.' },
          ],
          composition: ['1 модель Venerable Dreadnought'],
          loadout: '**Эта модель вооружена:** Dreadnought Fist; Storm Bolter; Twin Lascannon.',
        },
        {
          id: 'crowes-sanctifiers-brotherhood-terminator-squad',
          abilities: [
            { name: 'Force Edge (Psychic)', text: 'Атаки этого юнита в ближнем бою, направленные на юнит (за исключением юнитов Monster/Vehicle), получают +1 AP.' },
          ],
          composition: [
            '1 модель Brotherhood Terminator Justicar',
            '1 модель Brotherhood Terminator with Psycannon and Nemesis Force Weapon',
            '3 модели Brotherhood Terminator with Storm Bolter and Nemesis Force Weapon',
          ],
          loadout: `**Brotherhood Terminator Justicar вооружён:** Nemesis Force Weapon; Storm Bolter.
**Brotherhood Terminator with Psycannon and Nemesis Force Weapon вооружён:** Nemesis Force Weapon; Psycannon.
**Каждый Brotherhood Terminator with Storm Bolter and Nemesis Force Weapon вооружён:** Nemesis Force Weapon; Storm Bolter.`,
        },
        {
          id: 'sanctifiers-castellan-crowe',
          abilities: [
            { name: 'Foesight (Psychic)', text: 'Атаки этого юнита, направленные на юнит Character, могут перебрасывать броски попадания.' },
          ],
          composition: ['1 модель Castellan Crowe'],
          loadout: '**Эта модель вооружена:** Black Blade of Antwyr; Purifying Flame; Storm Bolter.',
        },
      ],
    },
  ],
}

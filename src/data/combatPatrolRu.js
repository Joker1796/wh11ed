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
        flavor: 'Стража Амонхотека ставит завоевание выше всего прочего. Когда перед ним встают его неумирающие легионы, большинство врагов либо отступает, либо обращается в бегство. Те, кто достаточно дерзок, чтобы стоять и сражаться, оказываются под ужасной мощью самого страшного оружия его стражи — Canoptek Doomstalker.',
        body: `▪ В конце вашей фазы командования вы можете выбрать один дружественный юнит Amonhotekh's Guard. До начала вашей следующей фазы командования у этого юнита будет +1 OC.
▪ При игре в битве Combat Patrol следующие дружественные юниты должны начинать битву в стратегическом резерве и не могут быть выставлены на поле боя до указанного раунда битвы, а когда это произойдёт, должны быть выставлены целиком в вашей зоне развертывания: Canoptek Doomstalker (раунд битвы 3).`,
      },
      armyRule: {
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
          flavor: 'Воины-некроны выпускают быстрые залпы gauss-огня, формируя трескучую бурю из смертоносной изумрудной энергии, от которой почти невозможно уклониться.',
          when: 'Ваша фаза стрельбы, когда дружественный юнит Amonhotekh\'s Guard Necron Warriors выбран для стрельбы.',
          target: 'Этот юнит Amonhotekh\'s Guard Necron Warriors.',
          effect: 'Ударные атаки вашего юнита получают +1 к броскам попадания.',
        },
        {
          name: 'Aggression Protocols',
          flavor: 'Слушая команды своего Повелителя, эти воины disengage from the fight, only to begin the assault anew on more favourable grounds.',
          when: 'Ваша фаза перемещения, когда дружественный юнит Amonhotekh\'s Guard (за исключением юнитов Monster/Vehicle) выбран для отступления.',
          target: 'Этот юнит Amonhotekh\'s Guard.',
          effect: 'Это перемещение не мешает вашему юниту быть подходящим для стрельбы/объявления атаки.',
        },
        {
          name: 'Reinforced Resilience',
          flavor: 'Повелитель Амонхотек редко тратит своих воинов бездумно, вплоть до того, что приказывает им укрыться в укрытии, чтобы повысить их живучесть.',
          when: 'Фаза стрельбы вашего противника, когда вражеский юнит выбирает дружественный юнит Amonhotekh\'s Guard (за исключением юнитов Monster/Vehicle) целью, при этом все модели внутри областиTerrain.',
          target: 'Этот юнит Amonhotekh\'s Guard.',
          effect: 'У вашего юнита +1 Sv.',
        },
      ],
      enhancements: [
        {
          name: 'Metalline Might',
          flavor: 'Усиленный и улучшенный лучшими ремесленниками-криптеками, живой металлический облик Амонхотека дарует ему сокрушительную силу.',
          body: 'Только модель Amonhotekh\'s Guard Overlord. Атаки этого героя в ближнем бою получают +2 S.',
        },
        {
          name: 'Unblemished Legions',
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
        flavor: 'Космические марсы безжалостно настойчивы в преследовании и защите своих целей, демонстрируя стойкость, которой не хватает простым смертным.',
        body: 'Дружественные юниты Assault Force получают +1 OC.',
      },
      armyRule: {
        body: `В вашей фазе командования вы можете выбрать одну из способностей Combat Doctrine ниже. Дружественные юниты Adeptus Astartes получают выбранную способность Combat Doctrine до начала вашей следующей фазы командования.

**Assault Doctrine:** Этот юнит может объявить атаку в том ходу, в котором он совершил продвижение.

**Devastator Doctrine:** Этот юнит может стрелять в том ходу, в котором он совершил продвижение.

**Tactical Doctrine:** Этот юнит может стрелять и объявить атаку в том ходу, в котором он отступил.

Каждую способность Combat Doctrine нельзя выбирать более одного раза за битву.`,
      },
      stratagems: [
        {
          name: 'Relentless Aggression',
          flavor: 'Вперёд, удерживайте инициативу и не давайте врагу отдышаться.',
          when: 'Фаза боя, когда дружественный юнит Assault Force выбран для совершения перегруппировки.',
          target: 'Этот юнит Assault Force.',
          effect: 'При совершении этой перегруппировки ваш юнит может переместиться на до 6".',
        },
        {
          name: 'Terrifying Charge',
          flavor: 'Крушительный удар штурмовой атаки Космических Марсов — поистине ужасающая вещь. Перед таким натиском дрогнут даже самые смелые противники.',
          when: 'Ваша фаза атаки, когда дружественный юнит Assault Force завершает рывок в атаку.',
          target: 'Этот юнит Assault Force.',
          effect: 'Выберите один вражеский юнит, который находится в рукопашной с вашим юнитом. Этот вражеский юнит проходит проверку морального духа с -1 к этой проверке.',
        },
        {
          name: 'Decapitating Strike',
          flavor: 'Самый надёжный способ сломить врага — убрать его лидера. Отрежь голову змее, и тело непременно падёт.',
          when: 'Фаза боя, когда дружественный юнит Assault Force выбран для боя.',
          target: 'Этот юнит Assault Force.',
          effect: 'Атаки вашего юнита в ближнем бою получают [PRECISION].',
        },
      ],
      enhancements: [
        {
          name: 'Battle-line Veterans',
          flavor: 'Эти воины служили в своём Главе десятилетиями и демонстрируют истинное мастерство болтерной подготовки и меткости.',
          body: 'Только юнит Assault Force Intercessor Squad. Ударные оружия этого юнита получают [RAPID FIRE 1].',
        },
        {
          name: 'Blade Masters',
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
        flavor: 'Орки — это крепкие, покрытые шрамами твари, которые с радостью отмахиваются от ран, способных убить большинство существ. Когда их пропитывает мощь Waaagh!, их выносливость возрастает до немыслимых высот.',
        body: 'Атаки, направленные на дружественный юнит \'Ardmob с активным Waaagh!, имеют -1 к броскам ран, если их S больше, чем T этого дружественного юнита.',
      },
      armyRule: {
        body: `Вы можете перебрасывать броски продвижения для дружественных юнитов Orks.

Один раз за битву, в начале фазы командования, вы можете объявить Waaagh!. Если делаете это, до конца следующего хода для дружественных юнитов Orks действует Waaagh!. Пока Waaagh! активен для юнита, он может стрелять и объявить атаку в том ходу, в котором совершил продвижение.`,
      },
      stratagems: [
        {
          name: "Krump 'Em",
          flavor: 'Орки бросаются в бой, обрушивая тяжёлые сокрушительные удары и громовые удары головой.',
          when: 'Фаза боя, когда дружественный юнит \'Ardmob выбран для боя.',
          target: 'Этот юнит \'Ardmob.',
          effect: 'Атаки вашего юнита в ближнем бою получают +1 S.',
        },
        {
          name: 'Medi-Squigs',
          flavor: 'Орки захватили с собой мешок Medi-Squigs и теперь раздают этих странных существ, чтобы получить максимальную пользу от их причудливых целительных свойств.',
          when: 'Фаза стрельбы вашего противника, когда вражеский юнит выбирает дружественный юнит \'Ardmob целью.',
          target: 'Этот юнит \'Ardmob.',
          effect: 'У вашего юнита 5+ InSv.',
        },
        {
          name: 'Get Stuck In',
          flavor: 'Вопреки огню врага, уцелевшие орки только сильнее рвутся в бой, желая вбить врага врукопашную.',
          when: 'Фаза стрельбы вашего противника, когда вражеский юнит, который атаковал дружественный не вовлечённый в бой юнит \'Ardmob, произвёл выстрел.',
          target: 'Этот юнит \'Ardmob.',
          effect: 'Ваш юнит может совершить рывок на до D6+1".',
        },
      ],
      enhancements: [
        {
          name: 'Rallying War Cry',
          flavor: 'Притянутые к битве оглушительными рёвами своего вожака, свежие волны ребят вступают в бой.',
          body: '\'Ardmob Warboss model only. (Once per battle, per unit) In your Command phase, you can use this ability. If you do, return up to D3+2 destroyed bodyguard models to this unit.',
        },
        {
          name: 'Extra Platin’',
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
        flavor: 'Объединяя огонь, Sudden Dawn Cadre делают ставку на уничтожение одной цели прежде, чем перейти к следующей.',
        body: '(Один раз за битву, на армию) Когда дружественный юнит Sudden Dawn Cadre выбран для стрельбы, вы можете использовать эту способность. Если делаете это, выберите один вражеский юнит. Атаки дружественных юнитов Sudden Dawn Cadre, направленные на этот вражеский юнит, получают +1 AP до конца битвы.',
      },
      armyRule: {
        body: `Если у вас улучшена модель, чтобы у неё был дрон, рядом с ней поместите жетон Drone. Они не считаются моделями ни для каких правил.

### Shield Drone
Добавьте 1 к характеристике Wounds носителя.

### For the Greater Good
Если ваша армия относится к фракции T'au Empire, в начале фазы стрельбы вы можете выбрать юниты вашей армии с этой способностью, чтобы сделать их Observer units.

Во время вашей фазы стрельбы для каждого юнита Observer вашей армии, который не был выбран для стрельбы в этой фазе и способен стрелять (за исключением Fortification и Battle-shocked units), выберите один вражеский юнит, который виден, чтобы пометить его как Spotted unit до конца фазы. Каждый вражеский юнит может быть помечен как Spotted unit лишь один раз за фазу.

Юниты вашей армии со способностью For the Greater Good (за исключением Observer units) являются Guided units, когда целью становятся одна или более Spotted units.

До конца фазы каждый раз, когда модель из вашей армии в Guided unit совершает атаку, нацеленную на Spotted unit, улучшайте характеристику Ballistic Skill этой атаки на 1, а если Spotted unit был помечен Observer unit со словом Markerlight, эта атака получает способность [IGNORES COVER].`,
      },
      stratagems: [
        {
          name: 'Suppressing Fire',
          flavor: 'Целясь в позиции врага плотным шквальным огнём, стрелки T\'au удерживают его на месте, давая себе время для перегруппировки.',
          when: 'Ваша фаза стрельбы, когда дружественный юнит Sudden Dawn Cadre Infantry произвёл выстрел.',
          target: 'Этот юнит Sudden Dawn Cadre Infantry.',
          effect: `Выберите один вражеский юнит, по которому пришлись эти атаки. Этот вражеский юнит будет pinned до начала вашей следующей фазы командования:
▪ Пока юнит pinned, у него -2" M.`,
        },
        {
          name: 'Rapid Acquisition',
          flavor: 'Закрепившись на спорной территории, Sudden Dawn Cadre редко задерживаются на ней, предпочитая уничтожать врага.',
          when: 'В конце вашей фазы перемещения.',
          target: 'Один дружественный юнит Sudden Dawn Cadre.',
          effect: 'Выберите один объект, который контролирует ваш юнит. Этот объект будет secured.',
        },
        {
          name: 'Swift Embarkation',
          flavor: 'Отлично обученные в механизированной войне, воины T\'au быстро и организованно занимают свои транспортные средства, задолго до того, как враг успеет воспользоваться их уязвимостью.',
          when: 'В конце фазы боя вашего противника.',
          target: 'Один дружественный не вовлечённый в бой юнит Sudden Dawn Cadre Infantry, который был способен сражаться в этой фазе, целиком находится в пределах 6" от дружественного юнита Sudden Dawn Cadre Transport и способен погрузиться в этот Transport unit.',
          effect: 'Ваш юнит погружается в этот Transport unit.',
        },
      ],
      enhancements: [
        {
          name: 'Earth Caste Modifications',
          flavor: 'Усиленный искусством касты Земли, этот Enforcer Battlesuit получает улучшенную телеметрию скорострельности, позволяющую эффективно подавлять врага и аккуратно вводить его с низкой орбиты.',
          body: `Только модель Sudden Dawn Cadre Commander in Enforcer Battlesuit.
▪ Когда этот юнит стрелял, вы можете выбрать один вражеский юнит, по которому пришлись эти атаки. Этот вражеский юнит будет suppressed до начала вашего следующего хода: пока юнит suppressed, его атаки получают -1 к броскам попадания.
▪ Когда этот юнит делает ingress move, его можно выставить более чем на 6" по горизонтали от всех вражеских юнитов (вместо более чем на 8"). Если делаете это, он не может объявить атаку до конца хода.`,
        },
        {
          name: 'Proximity Scanners',
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
        flavor: 'Жёсткие и дисциплинированные перед даже самым многочисленным врагом, части Дрейдена делают каждую свою очередь огня по-настоящему весомой.',
        body: `▪ Дружественные юниты Drayden's Lance могут перебрасывать броски, чтобы определить A оружия.
▪ Дружественные юниты Drayden's Lance могут перебрасывать броски, чтобы определить D атаки.`,
      },
      armyRule: {
        body: `Если ваша армия относится к фракции Astra Militarum, модели Officer с этой способностью могут отдавать Orders. У каждой datasheet Officer будет указано, сколько Orders оно может выдать за раунд битвы и какие юниты могут получить эти Orders. Каждый раз, когда модель Officer отдаёт Order, выберите одну из Orders ниже, затем выберите один дружественный юнит в пределах 6" от этой модели Officer, которому выдана эта Order.

Модели Officer могут выдавать Orders в вашей фазе командования и в конце фазы, в которой они вышли из Transport или были выставлены на поле боя.

До начала вашей следующей фазы командования выбранный юнит затрагивается этой Order. Если не указано иного, единица может быть затронута только одной Order одновременно (любая последующая Order, выданная этому юниту, заменяет текущую). Orders нельзя выдавать юнитам, находящимся в состоянии Battle-shocked, а если юнит, затронутый Order, становится Battle-shocked, эта Order перестаёт действовать на него. Только модели Astra Militarum получают выгоду от Order, выданной их юниту.

### The Orders
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
          flavor: 'Определив приоритетную цель, майор Дрейден направляет своих воинов обрушить на неё шквал разрушающего огня.',
          when: 'Ваша фаза командования.',
          target: 'Один дружественный юнит Drayden\'s Lance Officer.',
          effect: `Выберите один вражеский юнит. Атаки дружественных юнитов Drayden's Lance, направленные на этот вражеский юнит, сохраняют следующее до начала вашего следующего хода:
▪ [LETHAL HITS].
▪ [IGNORES COVER], если это дальнобойные атаки.`,
        },
        {
          name: 'First Wave',
          flavor: 'Работая как авангард более крупных сил Astra Militarum, Дрейден и его люди закрепляются на вражеской территории.',
          when: 'В конце вашей фазы перемещения.',
          target: 'Один дружественный юнит Drayden\'s Lance.',
          effect: 'Выберите один объект, который контролирует ваш юнит. Этот объект будет secured.',
        },
        {
          name: 'Veteran Skirmishers',
          flavor: 'Лёгко вооружённый отряд скимеров, Дрейден и его люди осторожно избегают увязать в боях, которые не могут выиграть.',
          when: 'Фаза перемещения вашего противника, когда вражеский юнит завершает перемещение в пределах 8" от дружественного не вовлечённого в бой юнита Drayden\'s Lance.',
          target: 'Этот юнит Drayden\'s Lance.',
          effect: 'Ваш юнит может совершить обычное перемещение на до D3+1".',
        },
      ],
      enhancements: [
        {
          name: 'Call Up the Reserves',
          flavor: 'В Astra Militarum смерть и травмы — постоянные спутники. Поток свежих резервов всегда готов заполнить пробелы в линии.',
          body: 'Только модель Drayden\'s Lance Officer. (Один раз за битву, на юнит) В начале любой фазы вы можете использовать эту способность. Если делаете это, выберите один дружественный юнит Drayden\'s Lance. Этот юнит восстанавливает D3+2 раны.',
        },
        {
          name: 'Drayden’s Drill',
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
        flavor: 'Вера Adepta Sororitas горит особенно ярко в бою. По их убеждению, God-Emperor защищает ревностных и направляет руки праведных.',
        body: `▪ Атаки ближнего боя, направленные на дружественные юниты Sanctuary Guardians, получают -1 к броскам попадания.
▪ При игре в битве Combat Patrol в вашей фазе командования вы можете сбросить 1 кубик Miracle. Если делаете это, вы получаете 1 CP.`,
      },
      armyRule: {
        body: `Если ваша армия относится к фракции Adepta Sororitas, каждый юнит вашей армии с этой способностью может совершить один Act of Faith за фазу. Это делается с помощью кубиков Miracle.

### Gaining Miracle Dice
Если ваша армия относится к фракции Adepta Sororitas, вы получаете 1 кубик Miracle:
▪ В начале каждого раунда битвы.
▪ Каждый раз, когда уничтожается юнит Adepta Sororitas из вашей армии.

Каждый раз, когда вы получаете кубик Miracle, бросьте один D6. Выпавшее число — значение этого кубика Miracle. Его нельзя изменить или перебросить, если правило специально не говорит об обратном. Храните кубики Miracle в стороне — это ваш пул Miracle dice.

### Performing an Act of Faith
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
          flavor: 'Когда они прячутся в густом террейне, бронеподобные Battle Sisters становятся поразительно живучими и чрезвычайно трудно выжить из укрытия.',
          when: 'Фаза стрельбы вашего противника или фаза боя, когда вражеский юнит выбирает дружественный юнит Sanctuary Guardians целью (за исключением юнитов Arco-flagellants), находясь в террейне.',
          target: 'Этот юнит Sanctuary Guardians.',
          effect: 'У вашего юнита +1 Sv.',
        },
        {
          name: 'Fervent Devotion',
          flavor: 'Пока битва разгорается и их сердца наполняются пылом, верные God-Emperor стремятся ещё сильнее уничтожить Его врагов.',
          when: 'Ваша фаза перемещения, когда дружественный юнит Sanctuary Guardians выбран для продвижения/отступления.',
          target: 'Этот юнит Sanctuary Guardians.',
          effect: 'Это перемещение не мешает вашему юниту быть подходящим для стрельбы/объявления атаки.',
        },
        {
          name: 'Fires of Damnation',
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
          flavor: 'С дубинкой, бронёй и ненавистью, Battle Sisters громят и режут врагов веры.',
          body: `Только модель Sanctuary Guardians Canoness.
▪ Атаки этой модели в ближнем бою получают +1 D.
▪ Атаки этого юнита в ближнем бою получают +1 к броскам ран.`,
        },
        {
          name: 'Divine Miracle',
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
        flavor: 'Блейд Чемпион Тристраен и его товарищи снискали славу за бесстрашную агрессию. Всегда именно он ведёт их в атаку, а его соратники идут за ним волнами, чтобы уничтожить врага.',
        body: `▪ (Один раз за ход, на армию) Один дружественный юнит Tristraen's Gilded Blades может перебрасывать проверку морального духа.
▪ При игре в битве Combat Patrol следующие дружественные юниты должны начинать битву в стратегическом резерве и не могут быть выставлены на поле боя до указанного раунда битвы, а когда это произойдёт, должны быть выставлены целиком в вашей зоне развертывания: Gilded Blades Custodian Wardens (раунд битвы 2), Gilded Blades Allarus Custodians (раунд битвы 3).`,
      },
      armyRule: {
        flavor: 'Специализированные дисциплины, mastered by Custodians over decades if not centuries, each ka\'tah equips its practitioner to overmaster any foe in a particular discipline or philosophy. Martial ka\'tahs allow the warriors of the Adeptus Custodes to deploy stances, movements, war philosophies and lethal skills that enhance their already terrifying martial prowess and focus it against particular threats.',
        body: `Каждый раз, когда юнит вашей армии с этой способностью выбран для боя, выберите одну из Stances Ka\'tah ниже. Пока этот юнит не закончил свои атаки, выбранная Stance активна для него, и он получает соответствующую способность:

### Dacatari Stance
Оружие ближнего боя, которым вооружены модели в этом юните, получает способность [SUSTAINED HITS 1].

### Rendax Stance
Оружие ближнего боя, которым вооружены модели в этом юните, получает способность [LETHAL HITS].`,
      },
      stratagems: [
        {
          name: 'Gilded Spear',
          flavor: 'Врываясь с неукротимой яростью и скоростью, Кастодии пронзают вражескую линию и уходят вглубь, чтобы нанести смертельный удар.',
          when: 'Фаза боя, когда дружественный юнит Tristraen\'s Gilded Blades выбран для совершения перегруппировки.',
          target: 'Этот юнит Tristraen\'s Gilded Blades.',
          effect: 'При совершении этой перегруппировки ваш юнит может переместиться на до D3+3".',
        },
        {
          name: 'Inevitable Wrath',
          flavor: 'Когда на него обрушивается вражеский огонь, Тристраен из Gilded Blades движется навстречу нападающим с местью в душе.',
          when: 'Фаза стрельбы вашего противника, когда вражеский юнит стрелял.',
          target: 'Один дружественный не вовлечённый в бой юнит Tristraen\'s Gilded Blades Blade Champion, который потерял рану из-за этих атак.',
          effect: 'Ваш юнит может совершить рывок на до D6+1".',
        },
        {
          name: 'Never Outmatched',
          flavor: 'Когда рядом падают товарищи, ярость Кастодиев достигает новых высот, и они сражаются с дикостью и жестокостью загнанных львов.',
          when: 'Фаза боя, когда дружественный юнит Tristraen\'s Gilded Blades, который ниже начальной численности, выбран для боя.',
          target: 'Этот юнит Tristraen\'s Gilded Blades.',
          effect: 'Атаки вашего юнита в ближнем бою получают +1 A.',
        },
      ],
      enhancements: [
        {
          name: 'Shattering Charge',
          flavor: 'Усиленный генетической алхимией и мастерством боя, выработанным за столетия, Тристраен из Gilded Blades — ужасающий противник. Даже самые чудовищные и черствые враги дрогнут перед его сокрушительным рывком.',
          body: 'Только модель Tristraen\'s Gilded Blades Blade Champion. Когда этот юнит завершает рывок в атаку, вы можете выбрать один вражеский юнит, находящийся в рукопашной с этим юнитом. Если делаете это, этот вражеский юнит проходит проверку морального духа с -1 к этой проверке.',
        },
        {
          name: 'Comrades in Wrath',
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
        flavor: 'Ноосфера гудит от активности, пока Сканд наполняет мозги своих кибернетических слуг дополнительными императивами, придавая его аугментированным воинам ещё большую живучесть и смертоносность.',
        body: 'В начале раунда битвы вы можете выбрать один дружественный юнит Purge Corps Deltic-9. Если делаете это, у этого юнита будут обе способности Doctrina Imperative до конца раунда битвы.',
      },
      armyRule: {
        flavor: 'Армия Adeptus Mechanicus, идущая на войну, — зрелище и ужасающее, и великолепное: каждый священный воин — тревожное слияние человека и машины. Тех-правители и их фанатичные последователи поднимают модифицированные голоса в praise of the Machine God, directing their cyborg soldiery and mechanical creations through doctrina imperatives encoded to augment and adapt the warriors\' abilities.',
        body: `В начале раунда битвы вы можете выбрать один из Doctrina Imperatives ниже. До конца раунда битвы этот Doctrina Imperative активен для вашей армии, и все юниты вашей армии, имеющие способность Doctrina Imperatives, получают соответствующие способности, показанные ниже.

### Protector Imperative
▪ Оружие дальнего боя, которым вооружены модели в этом юните, получает способность [HEAVY].
▪ Улучшайте характеристику Ballistic Skill дальнобойного оружия, которым вооружены модели в этом юните, на 1.
▪ Каждый раз, когда атака ближнего боя нацелена на этот юнит, если у него есть ключевое слово Battleline и/или он находится в пределах 6" от одного или более дружественных Battleline-юнитов Adeptus Mechanicus, вычитайте 1 из броска попадания.

### Conqueror Imperative
▪ Оружие дальнего боя, которым вооружены модели в этом юните, получает способность [ASSAULT].
▪ Улучшайте характеристику Weapon Skill оружия ближнего боя, которым вооружены модели в этом юните, на 1.
▪ Каждый раз, когда модель в этом юните совершает атаку, если у него есть ключевое слово Battleline и/или он находится в пределах 6" от одного или более дружественных Battleline-юнитов Adeptus Mechanicus, улучшайте Armour Penetration этой атаки на 1.`,
      },
      stratagems: [
        {
          name: 'Lockdown Protocols',
          flavor: 'По команде Бинхарика эти воины прочно занимают свои позиции и готовятся удерживать захваченный участок.',
          when: 'Фаза стрельбы вашего противника или фаза боя, когда вражеский юнит выбирает дружественный юнит Purge Corps Deltic-9 целью, находясь в пределах досягаемости цели.',
          target: 'Этот юнит Purge Corps Deltic-9.',
          effect: 'Атаки, направленные на ваш юнит, получают -1 к броскам ран.',
        },
        {
          name: 'Preservation Imperatives',
          flavor: 'Хотя механические солдаты и расходуемы, Сканд не тратит свои инструменты бездумно. Когда выживание становится приоритетом, загруженные императивы могут предписывать тактику огня и перемещения, чтобы держать врага на расстоянии и в пределах оптимальной зоны поражения.',
          when: 'Ваша фаза стрельбы, когда дружественный не вовлечённый в бой юнит Purge Corps Deltic-9 выстрелил.',
          target: 'Этот юнит Purge Corps Deltic-9.',
          effect: `▪ Ваш юнит может совершить обычное перемещение на до D3+1".
▪ Ваш юнит не может объявить атаку до конца хода.`,
        },
        {
          name: 'Optimised Targeting',
          flavor: 'Оптимизированные импульсные модули могут активироваться, чтобы обеспечить бесшовную интеграцию между мозговыми кортиксами и целеуказателями, значительно повышая точность.',
          when: 'Ваша фаза стрельбы, когда дружественный юнит Purge Corps Deltic-9 выбран для стрельбы.',
          target: 'Этот юнит Purge Corps Deltic-9.',
          effect: 'Атаки вашего юнита на расстоянии могут перебрасывать броски попадания 1.',
        },
      ],
      enhancements: [
        {
          name: 'Miniaturised Autosimulacra',
          flavor: 'Воины Сканда получают миниатюрные автосимулякры. После активации они могут ремонтировать повреждения аугметических компонентов, удерживая тех-провинта в бою.',
          body: 'Только модель Purge Corps Deltic-9 Tech-Priest Manipulus. (Один раз за битву, на юнит) В начале любой фазы вы можете использовать эту способность. Если делаете это, выберите один дружественный юнит Purge Corps Deltic-9. Этот юнит восстанавливает D3+2 раны.',
        },
        {
          name: 'Empowered Mechanisms',
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
        flavor: 'Главные цели представляют собой явную и непосредственную угрозу для дальнейшего существования человечества. Их нужно выследить и уничтожить, какой бы ценой это ни обошлось.',
        body: `В вашей фазе командования вы можете выбрать один вражеский юнит. Атаки дружественных юнитов Inquisitor's Hand, направленные на этот вражеский юнит, получают:
▪ [IGNORES COVER].
▪ [LETHAL HITS].
▪ [PRECISION].`,
      },
      armyRule: {
        flavor: 'По всему Империуму существуют многочисленные боевые организации и теневые структуры. Вооружённые отряды или одинокие агенты из этих групп обладают специализированными навыками, необычным снаряжением и личными интересами, которые приводят их к прикомандированию к более крупным имперским армиям. Одних реквизируют командиры армии за их особые способности, других назначают их скрытые хозяева для достижения узких целей. Самые могущественные обладают авторитетом и репутацией, достаточными, чтобы навязать своё присутствие на поле боя.',
        body: `Если ваша армия относится к фракции Agents of the Imperium, то на этапе выбора детачмента вы можете как обычно выбрать один из доступных детачментов из этой публикации.

Если ваша армия не относится к фракции Agents of the Imperium, но каждая модель в вашей армии имеет ключевое слово Imperium, вы можете включить в свою армию юниты Agents of the Imperium даже если они не имеют выбранного вами ключевого слова фракции на этапе выбора армии. В этом случае максимальное число юнитов Agents of the Imperium, которое можно включить в армию, зависит от размера битвы, как показано ниже.

Обратите внимание, что в такую армию можно как обычно включать Dedicated Transport юниты Agents of the Imperium, но каждый такой юнит должен начинать битву с одним или более юнитом внутри него, иначе он не может быть развернут для этой битвы и считается уничтоженным в первом раунде битвы.`,
      },
      stratagems: [
        {
          name: 'Urban Enforcers',
          flavor: 'Многие агенты Инквизиции происходят из глубин густонаселённых хабов и иных городских сред. Будь то бывшие гангстеры, эскортные силы, охотники за головами или агенты закона, все они — мастера боя в тесных городских условиях.',
          when: 'Фаза стрельбы вашего противника или фаза боя, когда вражеский юнит выбирает дружественный юнит Inquisitor\'s Hand целью, находясь в пределах областиTerrain, при этом все модели внутри этой области.',
          target: 'Этот юнит Inquisitor\'s Hand.',
          effect: 'Атаки, направленные на ваш юнит, получают -1 AP.',
        },
        {
          name: 'Superior Weaponry',
          flavor: 'Инквизиторы известны тем, что собирают огромные арсеналы эзотерического оружия и снаряжения, которые при необходимости могут быть выданы их агентам в поле.',
          when: 'Ваша фаза стрельбы или фаза боя, когда дружественный юнит Inquisitor\'s Hand (за исключением юнитов Eversor Assassin) выбран для атаки.',
          target: 'Этот юнит Inquisitor\'s Hand.',
          effect: 'Атаки вашего юнита получают +1 AP.',
        },
        {
          name: 'Inquisitorial Mandate',
          flavor: 'Агенты Инквизиции обладают полномочиями реквизировать и заявлять всё, что им кажется нужным. Достаточно просто вспыхнуть инквизиторской печатью, чтобы закрепить за собой право на чужую территорию.',
          when: 'В конце вашей фазы перемещения.',
          target: 'Один дружественный юнит Inquisitor\'s Hand (за исключением юнитов Eversor Assassin).',
          effect: 'Выберите один объект, который контролирует ваш юнит. Этот объект будет secured.',
        },
      ],
      enhancements: [
        {
          name: 'Sanctic Slayers',
          flavor: 'Получив благословение проповедника Тегуэна и усиленные специализированной подготовкой Инквизиции, воины Inquisitor\'s Hand способны с равной эффективностью вступать в бой даже с, казалось бы, гораздо более могущественными противниками.',
          body: 'Только модель Inquisitor\'s Hand Ministorum Priest. (Один раз за ход, на юнит) Когда дружественный юнит Inquisitor\'s Hand выбран для атаки, вы можете использовать эту способность. Если делаете это, атаки этого юнита, направленные на цель с T, равным или большим, чем S этой атаки, получают +1 к броскам ран.',
        },
        {
          name: 'Killer Reflexes',
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
        flavor: 'Даже будучи чудовищами, воины Кигарила движутся мягко и скрываются за психическими искусами их спиритсиры.',
        body: `▪ Дружественные юниты Kygharil's Protectors (за исключением юнитов Kygharil's Protectors Wraithblades) получают Stealth.
▪ Дружественные юниты Kygharil's Protectors (за исключением юнитов Kygharil's Protectors Wraithblades) имеют -3" к дальности обнаружения.`,
      },
      armyRule: {
        flavor: 'В войне, как и во всём прочем, эльдары применяют на практике всю мощь своего разума, мастерства и проворства. В сочетании с их исключительной технологией это делает их движение стремительным и грациозным, что врагу невозможно соперничать.',
        body: `Если ваша армия относится к фракции Asuryani, в начале раунда битвы вы получаете несколько жетонов Battle Focus в зависимости от размера битвы, как показано ниже:
▪ **Incursion:** 2 жетона Battle Focus.
▪ **Strike Force:** 4 жетона Battle Focus.
▪ **Onslaught:** 6 жетонов Battle Focus.

Каждый раз, когда происходит один из триггеров, показанных в разделе Agile Manoeuvres ниже, вы можете потратить один жетон Battle Focus, чтобы дать соответствующему допустимому юниту возможность выполнить этот Agile Manoeuvre. Юнит считается допустимым для выполнения Agile Manoeuvre, если у него есть эта способность и он ещё не выполнял Agile Manoeuvre в той же фазе. Если иное не указано, один и тот же Agile Manoeuvre нельзя триггерить более одного раза за фазу. В конце раунда битвы все неиспользованные жетоны Battle Focus теряются.

### Swift as the Wind
**TRIGGER:** Когда допустимый юнит вашей армии выбран для обычного, Advance или Fall Back перемещения. Вы можете триггерить этот Agile Manoeuvre более одного раза за фазу (при условии, что каждый раз его выполняет другой юнит).
**EFFECT:** До конца фазы добавьте 2" к характеристике Move моделей в этом юните.

### Flitting Shadows
**TRIGGER:** Когда допустимый юнит вашей армии выбран для обычного, Advance или Fall Back перемещения, выставлен на поле боя или объявляет атаку.
**EFFECT:** До конца хода вражеские юниты не могут использовать Stratagem Fire Overwatch, чтобы стрелять по этому юниту.

### Star Engines
**TRIGGER:** Когда допустимый юнит Vehicle вашей армии выбран для перемещения Advance.
**EFFECT:** До конца хода дальнобойное оружие, которым вооружён этот юнит, получает способность [ASSAULT].

### Sudden Strike
**TRIGGER:** Когда допустимый юнит вашей армии выбран для боя.
**EFFECT:** До конца фазы каждый раз, когда модель в этом юните совершает перемещение в шеренге или консолидируется, она может переместиться на до 6" вместо до 3".

### Opportunity Seized
**TRIGGER:** Когда вражеский юнит завершает перемещение Fall Back.
**EFFECT:** Один допустимый юнит вашей армии (за исключением юнитов Titanic), который начал фазу в пределах Engagement Range этого вражеского юнита, может совершить обычное перемещение на до D6+1".

### Fade Back
**TRIGGER:** В фазе стрельбы противника сразу после того, как вражеский юнит выстрелил.
**EFFECT:** Один допустимый юнит вашей армии (за исключением юнитов Titanic), по которому попали одна или более этих атак, может совершить обычное перемещение на до D6+1".`,
      },
      stratagems: [
        {
          name: 'Fading Fusillade',
          flavor: 'Отступая от врага в притворном отступлении, воины-эльдары открывают огонь с близкой дистанции, срезая цели. ',
          when: "Ваша фаза перемещения, когда дружественный юнит Kygharil's Protectors выбран для отступления.",
          target: 'Этот юнит Kygharil\'s Protectors.',
          effect: 'Это перемещение не мешает вашему юниту быть подходящим для стрельбы.',
        },
        {
          name: 'Suppressing Storm',
          flavor: 'Выпуская шквал шурикенов или потоки режущих мононитей, эти воины подавляют цели, мешая им ответить огнём.',
          when: "Ваша фаза стрельбы, когда дружественный юнит Kygharil's Protectors (за исключением Character-юнитов) выстрелил.",
          target: 'Выберите один вражеский юнит, по которому пришлись эти атаки.',
          effect: 'Этот вражеский юнит находится в состоянии suppressed до начала вашего следующего хода:\n▪ Пока юнит suppressed, его атаки получают -1 к броскам попадания.',
        },
        {
          name: 'Focused Strikes',
          flavor: 'Соединяя специализированное вооружение и навыки с максимальной пользой, эльдары обрушивают на выбранные цели сходящийся шторм смертоносного огня, превращая их в кровавый хаос за считаные мгновения.',
          when: 'Начало вашей фазы стрельбы.',
          target: 'Один или более дружественных юнитов Kygharil\'s Protectors.',
          effect: 'Выберите один вражеский юнит. Атаки ваших юнитов на расстоянии, направленные на этот юнит, могут перебрасывать броски ранения 1.',
        },
      ],
      enhancements: [
        {
          name: 'Seer’s Hand',
          flavor: 'Как спиритсир, Кигарил обеспечивает руководство Ghost Warriors в разгар боя, направляя их удары по самым опасным противникам.',
          body: `Kygharil's Protectors Spiritseer model only. В конце вашей фазы перемещения вы можете выбрать один дружественный юнит Kygharil's Protectors Wraithblades в пределах 12" от этой модели:
▪ Этот юнит восстанавливает D3 раны.
▪ Атаки этого юнита получают [PRECISION] до начала вашей следующей фазы перемещения.`,
        },
        {
          name: 'Guided Jump',
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
  ],
}

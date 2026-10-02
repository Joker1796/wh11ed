// Space Marines — русский перевод листов данных (разреженный оверлей поверх EN, см. ./index.js).
// Переведены только тексты: flavor, способности, вооружение, loadout/options, leader/transport.
// Имена юнитов и оружия, характеристики, ключевые слова, названия core/faction-правил и
// [BRACKET]-теги остаются английскими; composition наследуется от EN.
//
// Пересобран под Codex: Space Marines (app data 963), который переписал все листы. Старый перевод
// перенесён только там, где английский текст не изменился (почти все flavor и строки leader);
// остальное переведено заново. Оверлей способностей ключуется по АНГЛИЙСКОМУ названию: он
// переживает перестановку листов, но не переименование способности. Термины кодекса — как у
// Орков 946: **псайкерский уровень** / **псайкерская способность**, доктрины Assault / Devastator /
// Tactical остаются английскими («доктрина Assault»). `abilityNamesRu` (внизу) даёт RU-подписи
// под английскими названиями способностей.

export default {
  "adrax-agatone": {
    "flavor": "Капитан 3-й роты Саламандр — сфокусированная сила разрушения, что бьёт в бою сильно и точно, не зная усталости. Неимоверно сильный, он мастерски владеет своим могучим thunder hammer, поражая врагов с каждого замаха. Тех, кого Агатон не сразит таким образом, он выжигает яростными залпами своего hand-flamer по имени Drakkis.",
    "abilities": {
      "Lord of the Pyroclasts": "Пока вражеский юнит **[gloss:engaged:в ближнем бою]** с этим юнитом, тот вражеский юнит имеет -1 **[gloss:objective-control:OC]**.",
      "Unto the Anvil": "Атаки ближнего боя этого юнита могут:\n▪ Перебрасывать **[gloss:wound-roll:броски на ранение]**, равные 1.\n▪ __Или:__ если для этого юнита активна **[gloss:sm-combat-doctrine:доктрина Assault]**, перебрасывать **броски на ранение**."
    },
    "loadout": "**Эта модель вооружена:** 1 Drakkis; 1 Malleus Noctum.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "aethon-shaan": {
    "aliasesRu": ["Этон Шаан"],
    "flavor": "Как Магистр Ордена Гвардии Ворона, Этон Шаан воплощает самые терпеливые и коварные черты наследия своего примарха. Когда же он решает ударить из теней, то делает это с внезапной холодной яростью, вырываясь вперёд, и увитые молниями Claws of Severax сверкают среди фонтанов вражеской крови.",
    "abilities": {
      "Master of Shadows": "В вашей фазе командования вы можете выбрать один дружественный юнит ADEPTUS ASTARTES INFANTRY. До начала вашей следующей фазы командования вы можете перебрасывать **[gloss:charge-roll:броски нападения]** для того юнита.",
      "Blackwing Mantle (Once per phase, per army)": "Вы можете выбрать этот юнит целью **[gloss:heroic-intervention:стратагемы Heroic Intervention]**, независимо от любых других применений этой **[gloss:stratagem:стратагемы]** в этой фазе. Если вы это делаете:\n▪ Это применение стоит на 1 CP меньше.\n▪ Это применение не мешает применять эту **стратагему** к другим юнитам в этой фазе."
    },
    "loadout": "**Эта модель вооружена:** 1 Claws of Severax; 1 Heavy Bolt Pistol."
  },
  "aggressor-squad": {
    "flavor": "Способные возглавить сокрушительное наступление или сломать самый упорный вражеский штурм, Aggressor — ходячие керамитовые бастионы. Они превосходны в ближнем бою и обрушивают на врага потоки убийственного огня, прежде чем раздавить его своими энергетическими кулаками.",
    "abilities": {
      "Close-quarters Firestorm": "Атаки этого юнита по вражескому юниту в пределах 9\" от этого юнита имеют +1 **[gloss:strength:S]**."
    },
    "loadout": "**Каждая модель вооружена:** 1 Flamestorm Gauntlets; 1 Twin Power Fists.",
    "options": [
      "Всем моделям этого юнита их Flamestorm Gauntlets можно заменить на 1 Auto Boltstorm Gauntlets и 1 Fragstorm Grenade Launcher."
    ]
  },
  "ancient": {
    "flavor": "Ancient несут драгоценные штандарты Ордена. Эти славные реликвии присутствовали в самых значимых битвах Ордена, и их тонко выделанные узоры увековечивают бесчисленные кампании и героические деяния. Это символы беззаветной преданности и нерушимой верности братьев.",
    "abilities": {
      "Honour of the Company": "Этот юнит имеет +1 **[gloss:objective-control:OC]**.",
      "Raise the Banner": "В конце вашей фазы движения, если этот юнит контролирует **[gloss:objective:цель]**, эта **цель** становится **[gloss:secured-objective:закреплённой]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Bolt Pistol; 1 Bolt Rifle; 1 Ceramite Fists.",
    "options": [
      "Bolt Rifle этой модели можно заменить на 1 Power Weapon."
    ],
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "ancient-in-terminator-armour": {
    "flavor": "Носить священные штандарты космодесанта — важнейшая задача. Символы мощи Ордена, за которые космодесантники с радостью отдадут жизнь, а потому Ancient часто становятся целью. Облачённые в броню Terminator, они почти неуязвимы для вражеского огня, и штандарт всегда реет гордо.",
    "abilities": {
      "Raise the Banner": "В конце вашей фазы движения, если этот юнит контролирует **[gloss:objective:цель]**, эта **цель** становится **[gloss:secured-objective:закреплённой]**.",
      "Never Shall the Standard Fall": "Пока этот юнит находится в радиусе действия **[gloss:objective:цели]**, атаки по этому юниту с **[gloss:strength:S]** больше, чем **[gloss:toughness:T]** этого юнита, имеют -1 к **[gloss:wound-roll:броскам на ранение]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Master-crafted Power Weapon; 1 Storm Bolter.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "apothecary": {
    "flavor": "Помимо полевой хирургии, долг Apothecary — извлекать ген-семя павших, сохраняя тем самым Орден для будущих поколений. Для этого Apothecary снаряжён так, чтобы даровать покой тем, кто слишком тяжело ранен, и умело извлечь их драгоценные прогеноидные железы.",
    "abilities": {
      "Narthecium": "В вашей фазе командования этот юнит **[gloss:heal:восстанавливает]** D3+1 ран."
    },
    "loadout": "**Эта модель вооружена:** 1 Absolvor Bolt Pistol; 1 Reductor Pistol; 1 Servo-armature.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "apothecary-biologis": {
    "flavor": "Облачённый в броню Gravis, Apothecary Biologis способен продвигаться сквозь бури вражеского огня, держа наготове vivispectrum, чтобы взять образцы биоматериала для последующего анализа — будь то плоть ксеносов, оболочки вирусного оружия или эзотерическая ген-техника.",
    "abilities": {
      "Vivispectral Analysis Targeting": "Атаки этого юнита имеют [LETHAL HITS: **non-**VEHICLE]."
    },
    "loadout": "**Эта модель вооружена:** 1 Absolvor Bolt Pistol; 1 Servo-armature.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "assault-intercessor-squad": {
    "flavor": "Assault Intercessor — одни из самых распространённых штурмовых юнитов в арсенале Ордена. Стреляя из heavy bolt pistol на сближении, они бросаются в схватку, где быстро расправляются с врагом жестокими взмахами своих chainsword.",
    "abilities": {
      "Targeted Intercession": "Если этот юнит совершил **[gloss:charge-move:манёвр нападения]** в этот ход, атаки ближнего боя этого юнита имеют +1 **[gloss:strength:S]** и **[gloss:armour-penetration:AP]**."
    },
    "loadout": "**Каждая модель вооружена:** 1 Chainsword; 1 Heavy Bolt Pistol.",
    "options": [
      "Heavy Bolt Pistol у Assault Intercessor Sergeant можно заменить на одно из следующего:\n▪ 1 Hand Flamer\n▪ 1 Plasma Pistol",
      "Chainsword у Assault Intercessor Sergeant можно заменить на одно из следующего:\n▪ 1 Power Fist\n▪ 1 Power Weapon\n▪ 1 Thunder Hammer"
    ]
  },
  "assault-intercessors-with-jump-packs": {
    "flavor": "Благодаря мощным jump pack эти воины парят над полем боя, врезаясь во врага и разя его в упор огнём bolt pistol и яростными ударами chainsword, прежде чем сорваться к следующей цели.",
    "abilities": {
      "Hammer of Wrath": "Когда этот юнит завершает **[gloss:charge-move:манёвр нападения]**, вы можете выбрать один вражеский юнит **[gloss:engaged:в ближнем бою]** с этим юнитом. За каждую модель этого юнита, находящуюся **в ближнем бою** с тем вражеским юнитом, бросьте один D6:\n▪ На 4+ тот вражеский юнит получает 1 **[gloss:mortal-wound:смертельную рану]**."
    },
    "loadout": "**Каждая модель вооружена:** 1 Chainsword; 1 Heavy Bolt Pistol.",
    "options": [
      "Heavy Bolt Pistol у Assault Intercessor Sergeant with Jump Pack можно заменить на одно из следующего:\n▪ 1 Hand Flamer\n▪ 1 Plasma Pistol",
      "Chainsword у Assault Intercessor Sergeant with Jump Pack можно заменить на одно из следующего:\n▪ 1 Power Fist\n▪ 1 Power Weapon",
      "За каждые 5 моделей в этом юните у 1 модели Assault Intercessor with Jump Pack Heavy Bolt Pistol можно заменить на 1 Plasma Pistol."
    ]
  },
  "astraeus": {
    "flavor": "Astraeus — исполинский гравитационный танк, вооружённый грозным оружием. Смертоноснее всего его twin macro-accelerator cannon, способный обрушивать крупнокалиберные ферро-карбидные снаряды, что разрывают танки, авиацию и пехоту. А его пустотные щиты выдерживают даже самые ожесточённые вражеские контратаки.",
    "abilities": {
      "Suppression Fire": "В вашей фазе стрельбы, когда этот юнит отстрелялся, выберите один вражеский юнит, поражённый оружием Twin Macro-accelerator Cannon этой модели. До начала вашего следующего хода тот вражеский юнит **[gloss:sm-suppressed:подавлен]**:\n▪ Пока юнит **подавлен**, атаки этого юнита имеют -1 к **[gloss:hit-roll:броскам на попадание]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Hull; 2 Astareus Las-ripper; 1 Ironhail Heavy Stubber; 1 Storm Bolter; 1 Twin Heavy Bolter; 1 Twin Macro-accelerator Cannon.",
    "options": [
      "2 Astareus Las-rippers этой модели можно заменить на 2 Plasma Eradicator - Standards.",
      "2 Astraeus las-rippers этой модели можно заменить на 2 plasma eradicators.",
      "Эту модель можно снабдить 1 Ironhail Heavy Stubber",
      "Twin Heavy Bolter этой модели можно заменить на 1 Twin Lascannon."
    ]
  },
  "ballistus-dreadnought": {
    "flavor": "Ballistus Dreadnought — ходячая огневая точка. В экранированном саркофаге в сердце этого боевого шагохода покоятся смертные останки павшего героя Ордена. Через сеть нейронных связей он ведёт боевую машину, нацеливая на вражескую броню или элитную пехоту батареи убийственного тяжёлого оружия.",
    "abilities": {
      "Ballistus Strike": "Дальнобойные атаки этого юнита по вражескому юниту в пределах 24\" от этого юнита имеют [SUSTAINED HITS 1]."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Feet; 1 Ballistus Lascannon; 1 Ballistus Missile Launcher; 1 Storm Bolters."
  },
  "bladeguard-ancient": {
    "flavor": "Bladeguard Ancient несут честь нести в бой драгоценные штандарты своего Ордена. Самые почитаемые из них хранят останки павших героев Ордена; в их присутствии боевые братья вдохновляются повторить легендарные деяния этих образцов древности.",
    "abilities": {
      "Deeds of Legend": "Пока этот юнит находится в радиусе действия **[gloss:objective:цели]**, атаки ближнего боя этого юнита имеют +1 **[gloss:attack-dice:A]**.",
      "Raise the Banner": "В конце вашей фазы движения, если этот юнит контролирует **[gloss:objective:цель]**, эта **цель** становится **[gloss:secured-objective:закреплённой]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Heavy Bolt Pistol; 1 Relics of Battle.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "bladeguard-veteran-squad": {
    "flavor": "Bladeguard Veteran — неумолимые воины, что неотступно наступают с воздетыми клинками, — сущий образ благородных рыцарей из мифов. Члены элитной 1-й ветеранской роты своего Ордена, каждый из этих несказанно опытных космодесантников сражался за Империум на бессчётных мирах.",
    "abilities": {
      "Bladeguard (Once per turn, per unit)": "В фазе ближнего боя, когда этот юнит **[gloss:selected-to-fight:выбран для боя]** или когда вражеский юнит выбирает этот юнит целью, вы можете выбрать одно из следующего:\n▪ Атаки ближнего боя этого юнита имеют +1 к **[gloss:hit-roll:броскам на попадание]**.\n▪ __Или:__ атаки по этому юниту имеют -1 к **броскам на попадание**."
    },
    "loadout": "**Каждая модель вооружена:** 1 Heavy Bolt Pistol; 1 Master-crafted Power Sword.",
    "options": [
      "Heavy bolt pistol у Bladeguard Veteran Sergeant можно заменить на одно из следующего:\n▪ 1 Neo-volkite Pistol\n▪ 1 Plasma Pistol"
    ]
  },
  "brutalis-dreadnought": {
    "flavor": "Brutalis Dreadnought — таран и оружие ужаса. Устремляясь к вражеским линиям, он осыпает их градом противопехотного огня. Но главная угроза кроется в его массивных, обёрнутых керамитом кулаках или когтях, что могут раздавить бронированного воина, как гнилой плод, и пробить стену бункера, как пергамент.",
    "abilities": {
      "Brutalis Charge (Once per phase, per unit)": "Вы можете выбрать этот юнит целью **стратагемы Crushing Impact**, независимо от любых других применений этой **[gloss:stratagem:стратагемы]** в этой фазе. Если вы это делаете:\n▪ Это применение стоит на 1 CP меньше.\n▪ Это применение не мешает применять эту **стратагему** к другим юнитам в этой фазе."
    },
    "loadout": "**Эта модель вооружена:** 1 Bolt Rifles; 1 Brutalis Fists; 1 Twin Heavy Bolter; 1 Twin Icarus Ironhail Heavy Stubber.",
    "options": [
      "Bolt Rifles и Brutalis Fists этой модели можно заменить на 1 Brutalis Talons.",
      "Twin Heavy Bolter этой модели можно заменить на 1 Twin Multi-melta."
    ]
  },
  "caanok-var": {
    "aliasesRu": ["Каанок Вар"],
    "flavor": "Железный капитан клановой роты Аверний, Каанок Вар — непревзойдённый полководец и воин-чемпион. Командуя, он являет холодную, расчётливую точность, но в нём по-прежнему тлеет жгучая ярость. Когда начинается бой, он даёт этому гневу волю и крушит врага карающими ударами своего power maul по имени Axiom.",
    "abilities": {
      "Cold and Calculating": "В вашей фазе стрельбы или в фазе ближнего боя, когда этот юнит **[gloss:selected-to-attack:выбран для атаки]**, вы можете выбрать для атак этого юнита одно из следующего:\n▪ [LETHAL HITS: MONSTER/VEHICLE].\n▪ __Или:__ [SUSTAINED HITS 1: **non-**MONSTER/VEHICLE].\n▪ __Или:__ если для этого юнита активна **[gloss:sm-combat-doctrine:доктрина Tactical]**, [LETHAL HITS: MONSTER/VEHICLE] и [SUSTAINED HITS 1: **non-**MONSTER/VEHICLE].",
      "Cerebrex Logic Engine": "На шаге Declare Battle Formations вы можете выбрать один дружественный юнит ADEPTUS ASTARTES INFANTRY. Тот юнит имеет [core:Scouts 6\"]."
    },
    "loadout": "**Эта модель вооружена:** 1 Axiom; 1 Storm Bolter.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "captain": {
    "flavor": "Ведя ударные силы космодесанта с передовой, Captain воплощают силу и мастерство воинов под их началом. Это образцы стратегического гения с веками боевого опыта, и их великие деяния нередко вознаграждаются древними артефактами из хранилищ Ордена.",
    "abilities": {
      "Strategic Acumen": "В вашей фазе командования вы можете использовать эту способность. Если вы это делаете, выберите одну **[gloss:sm-combat-doctrine:боевую доктрину]**, которая будет активна для этого юнита до начала вашей следующей фазы командования.",
      "Finest Hour (Once per battle, per unit)": "В фазе ближнего боя, когда этот юнит **[gloss:selected-to-fight:выбран для боя]**, вы можете использовать эту способность. Если вы это делаете, атаки ближнего боя этой модели имеют:\n▪ +3 **[gloss:attack-dice:A]**.\n▪ [DEVASTATING WOUNDS]."
    },
    "wargearAbilities": {
      "Relic Shield": "Эта модель имеет +1 **[gloss:wounds:W]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Heavy Bolt Pistol; 1 Master-crafted Bolter; 1 Master-crafted Power Weapon.",
    "options": [
      "Master-crafted Bolter и Heavy Bolt Pistol этой модели можно заменить на одно из следующего:\n▪ 1 Neo-volkite Pistol\n▪ 1 Plasma Pistol",
      "Master-crafted Bolter этой модели можно заменить на 1 Relic Shield (Master-crafted Power Weapon этой модели при этом заменить нельзя).",
      "Master-crafted Power Weapon этой модели можно заменить на 1 Power Fist."
    ],
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "captain-in-gravis-armour": {
    "flavor": "Облачённый в несокрушимую броню Gravis, капитан космодесанта может бесстрашно шагать в самые лютые огненные бури поля боя. Надеть броню Gravis — значит явить величайшую решимость сокрушить врага, как бы глубоко тот ни окопался.",
    "abilities": {
      "Refuse to Yield": "Атаки, распределённые на эту модель, имеют -1 **[gloss:damage-roll:D]**.",
      "Strategic Acumen": "В вашей фазе командования вы можете использовать эту способность. Если вы это делаете, выберите одну **[gloss:sm-combat-doctrine:боевую доктрину]**, которая будет активна для этого юнита до начала вашей следующей фазы командования."
    },
    "loadout": "**Эта модель вооружена:** 1 Master-crafted Heavy Bolt Rifle; 1 Master-crafted Power Weapon.",
    "options": [
      "Master-crafted Heavy Bolt Rifle и Master-crafted Power Weapon этой модели можно заменить на одно из следующего:\n▪ 1 Boltstorm Gauntlet и 1 Relic Blade\n▪ 1 Boltstorm Gauntlet и 1 Relic Chainsword\n▪ 1 Boltstorm Gauntlet и 1 Relic Power Fist"
    ],
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "captain-in-phobos-armour": {
    "flavor": "Все Primaris-космодесантники, служа в 10-й роте, обучены разведке, скрытности и диверсиям. Облачившись в броню Phobos, капитан соединяет эти навыки со своим невероятным боевым мастерством и добытым потом стратегическим опытом, ведя ударные отряды воинов Vanguard на опасные тайные задания.",
    "abilities": {
      "Strategic Acumen": "В вашей фазе командования вы можете использовать эту способность. Если вы это делаете, выберите одну **[gloss:sm-combat-doctrine:боевую доктрину]**, которая будет активна для этого юнита до начала вашей следующей фазы командования.",
      "Tactical Fluidity (Once per battle round, per unit)": "▪ В вашей фазе стрельбы, когда этот юнит отстрелялся, если этот юнит **[gloss:unengaged:не в ближнем бою]**, он может совершить **[gloss:normal-move:обычный манёвр]** на расстояние до D6\".\n▪ __Или:__ в конце фазы ближнего боя вашего оппонента, если этот юнит **[gloss:engaged:в ближнем бою]**, он может совершить **[gloss:fall-back-move:отступление]** на расстояние до 6\"."
    },
    "loadout": "**Эта модель вооружена:** 1 Bolt Pistol; 1 Combat Knife; 1 Instigator Bolt Carbine.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "captain-in-terminator-armour": {
    "flavor": "От капитанов космодесанта ждут, что они сражаются с передовой, и мало какая броня позволяет делать это столь же успешно, как латы Terminator. Грозно стойкий, такой доспех защищает капитана ото всего, кроме самого убийственного вражеского огня, и позволяет ему развёртываться телепортационным ударом в самое сердце врага.",
    "abilities": {
      "Unstoppable Valour": "Вы можете перебрасывать **[gloss:charge-roll:броски нападения]** для этого юнита.",
      "Strategic Acumen": "В вашей фазе командования вы можете использовать эту способность. Если вы это делаете, выберите одну **[gloss:sm-combat-doctrine:боевую доктрину]**, которая будет активна для этого юнита до начала вашей следующей фазы командования."
    },
    "loadout": "**Эта модель вооружена:** 1 Relic Weapon; 1 Storm Bolter.",
    "options": [
      "Relic Weapon этой модели можно заменить на 1 Relic Fist.",
      "Storm Bolter этой модели можно заменить на 1 Combi-weapon."
    ],
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "captain-on-bike": {
    "abilities": {
      "Into the Fray": "Если этот юнит совершил **[gloss:charge-move:манёвр нападения]** в этот ход, атаки ближнего боя этого юнита имеют [CLEAVE 1].",
      "Strategic Acumen": "В вашей фазе командования вы можете использовать эту способность. Если вы это делаете, выберите одну **[gloss:sm-combat-doctrine:боевую доктрину]**, которая будет активна для этого юнита до начала вашей следующей фазы командования."
    },
    "loadout": "**Эта модель вооружена:** 1 Heavy Bolt Pistol; 1 Master-crafted Power Weapon; 1 Twin Bolt Rifle.",
    "options": [
      "Heavy Bolt Pistol этой модели можно заменить на 1 Plasma Pistol.",
      "Master-crafted Power Weapon этой модели можно заменить на 1 Thunder Hammer."
    ],
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "captain-titus": {
    "aliasesRu": ["Тит", "Деметриан Тит", "Титус"],
    "flavor": "Неустанный поборник Ультрамара с волей из несгибаемого адаманта, капитан Деметриан Тит одержал бессчётные победы вопреки, казалось бы, невозможному. Обладая прославленными командными талантами, Тит по-настоящему в своей стихии в гуще боя, где сражается без устали и не отступает даже перед тяжкими ранами.",
    "abilities": {
      "Press the Attack": "Атаки ближнего боя этого юнита имеют:\n▪ [SUSTAINED HITS 1: **non-**MONSTER/VEHICLE].\n▪ __Или:__ если для этого юнита активна **[gloss:sm-combat-doctrine:доктрина Assault]**, [SUSTAINED HITS 1].",
      "Righteous Fury (Once per battle, per army)": "В фазе ближнего боя вы можете использовать эту способность. Если вы это делаете, атаки ближнего боя этого юнита имеют +1 **[gloss:strength:S]**, а когда этот юнит отсражается:\n▪ Эта модель **[gloss:heal:восстанавливает]** D3 раны.\n▪ __Или:__ если эта модель **[gloss:destroyed:уничтожила]** вражескую модель в этой фазе, эта модель **восстанавливает** 2D3 ран.",
      "Honour of Ultramar": "В фазе ближнего боя, когда эта модель **[gloss:destroyed:уничтожена]**, если этот юнит не был **[gloss:selected-to-fight:выбран для боя]** в этой фазе, бросьте один D6:\n▪ На 2+ не убирайте эту модель с поля боя. Когда ваш юнит отсражается или в конце фазы (что наступит раньше), эта модель убирается с поля боя."
    },
    "loadout": "**Эта модель вооружена:** 1 Bolt Pistol; 1 Master-crafted Bolter; 1 Master-crafted Chainsword.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "captain-with-jump-pack": {
    "flavor": "Многие капитаны космодесанта предпочитают ярость и скорость, изобретая хитроумные стратегии, чтобы обрушить их на врага с сокрушительным эффектом. Будучи непревзойдёнными воинами и вдохновляющими вождями, они нигде не уместнее, чем на самом острие битвы. С jump pack капитаны ведут своих воинов как наконечник копья своих штурмов.",
    "abilities": {
      "Strategic Acumen": "В вашей фазе командования вы можете использовать эту способность. Если вы это делаете, выберите одну **[gloss:sm-combat-doctrine:боевую доктрину]**, которая будет активна для этого юнита до начала вашей следующей фазы командования.",
      "Angel’s Wrath": "Этот юнит имеет +1 к **[gloss:advance-roll:броскам продвижения]** и **[gloss:charge-roll:броскам нападения]**."
    },
    "wargearAbilities": {
      "Relic Shield": "Эта модель имеет +1 **[gloss:wounds:W]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Chainsword; 1 Heavy Bolt Pistol.",
    "options": [
      "Heavy Bolt Pistol этой модели можно заменить на одно из следующего:\n▪ 1 Hand Flamer\n▪ 1 Plasma Pistol",
      "Chainsword этой модели можно заменить на одно из следующего:\n▪ 1 Power Fist\n▪ 1 Relic Weapon",
      "Heavy Bolt Pistol и Chainsword этой модели можно заменить на одно из следующего:\n▪ 1 Thunder Hammer и 1 Relic Shield\n▪ 1 Chainsword и 1 Relic Shield"
    ],
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "cato-sicarius": {
    "aliasesRu": ["Сикарий", "Като Сикарий"],
    "flavor": "Благородный отпрыск Талассара, Като Сикарий — один из самых прославленных чемпионов Ультрамаринов. Как капитан Victrix Honour Guard, Сикарий являет высшее фехтовальное искусство и подлинно мастерски владеет молниеносным штурмом, развёртывая своих воинов с решительностью и быстротой, рождёнными абсолютной уверенностью.",
    "abilities": {
      "Captain of the Honour Guard": "Если ваша армия включает юнит MARNEUS CALGAR, замените способность Leader этого юнита на способность Support (этот юнит по-прежнему можно присоединять к тем же юнитам).",
      "Knight Champion of Macragge (Once per phase, per army)": "В фазе движения вашего оппонента, когда вражеский юнит завершает манёвр в пределах 8\" от этого юнита, если этот юнит **[gloss:unengaged:не в ближнем бою]**, он может совершить **[gloss:normal-move:обычный манёвр]** на расстояние до 6\".",
      "Honour or Death": "Когда вы выбираете этот юнит целью **[gloss:heroic-intervention:стратагемы Heroic Intervention]**, её использование стоит на 1 CP меньше."
    },
    "loadout": "**Эта модель вооружена:** 1 Artisan Plasma Pistol; 1 Talassarian Tempest Blade.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "centurion-assault-squad": {
    "flavor": "Мало какая технология лучше приспособлена для осадной войны, чем боевой костюм Centurion. Врезаясь в громовые бури вражеского огня, Centurion Assault Squad вскрывают своими ревущими осадными бурами бронированные бункеры и разрывают танки на части.",
    "abilities": {
      "Annihilator Protocols": "Атаки ближнего боя этого юнита по юниту MONSTER/VEHICLE/FORTIFICATION имеют [SUSTAINED HITS 2]."
    },
    "wargearAbilities": {
      "Centurion Assault Launcher": "Носитель имеет ключевое слово EXPLOSIVES."
    },
    "loadout": "**Каждая модель вооружена:** 1 Centurion Bolters; 1 Siege Drills; 1 Twin Flamer.",
    "options": [
      "Любому числу моделей их Centurion Bolters можно заменить на 1 Centurion Assault Launcher",
      "Любому числу моделей их Twin Flamer можно заменить на 1 Twin Meltagun."
    ]
  },
  "centurion-devastator-squad": {
    "flavor": "Centurion Devastator Squad господствуют на поле боя, и само их присутствие диктует ход событий. Они часто действуют со Stormraven Gunship, что доставляют космодесантников в их громоздких костюмах на новую позицию, где те служат бронированной огневой базой, зачищая занятые врагом рубежи от всякого сопротивления.",
    "abilities": {
      "Decimator Protocols": "▪ Дальнобойные атаки этого юнита могут перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.\n▪ __Или:__ дальнобойные атаки этого юнита по вражескому юниту в радиусе действия **[gloss:objective:цели]** могут перебрасывать **броски на попадание**."
    },
    "loadout": "**Каждая модель вооружена:** 1 Centurion Bolters; 1 Centurion Fists; 1 Grav-cannon.",
    "options": [
      "Любому числу моделей их Centurion Bolters можно заменить на 1 Centurion Missile Launcher.",
      "Любому числу моделей их Grav-cannon можно заменить на одно из следующего: 1 Twin Heavy Bolter, 1 Twin Lascannon"
    ]
  },
  "cerberus": {
    "flavor": "Главное оружие Cerberus — нейтронно-импульсная батарея, чьи системы старше самого Великого крестового похода. Питаемое атомантическим дуговым реактором, это исполинское противотанковое орудие выпускает пульсирующий луч интенсивной радиации, что прорезает даже толстейшую броню и сеет хаос в хрупких системах внутри.",
    "abilities": {
      "Atomantic Arc-reactor": "В ход, в котором этот юнит **[gloss:remain-stationary:оставался неподвижным]**, дальнобойные атаки оружием Cerberus Neutron Pulse Array этого юнита имеют [LETHAL HITS]."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 1 Cerberus Neutron Pulse Array.",
    "options": [
      "Эту модель можно снабдить одним из следующего: 1 Heavy Bolter, 1 Heavy Flamer, 1 Multi-melta, 1 Storm Bolter",
      "Эту модель можно снабдить одним из следующего: 2 Heavy Bolters, 2 Lascannons"
    ]
  },
  "chaplain": {
    "flavor": "С плащом, вздымающимся в жаре битвы, и полыхающим absolvor pistol, Chaplain целеустремлённо шагают в бой, и гром их проповеди слышен даже сквозь яростный лязг сражения. Без отдыха они призывают братьев к победе, закаляя их сердца, разум и души, сколь бы свиреп ни был враг.",
    "abilities": {
      "Litany of Hate": "Атаки ближнего боя этого юнита имеют [LANCE].",
      "Spiritual Leader (Once per battle round, per unit)": "В начале любой фазы вы можете выбрать один дружественный юнит ADEPTUS ASTARTES **[gloss:battle-shocked:в боевом шоке]** в пределах 6\" от этой модели. Тот юнит больше не **в боевом шоке**."
    },
    "loadout": "**Эта модель вооружена:** 1 Absolvor Bolt Pistol; 1 Crozius Arcanum.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "chaplain-in-terminator-armour": {
    "flavor": "Каждого космодесантника поднимают на войну литании их капелланов, и нигде эта духовная опора не важнее, чем среди крови и ужаса абордажей и высадок на плацдармы. Потому Chaplain обучены носить грозную броню Terminator, чтобы сражаться бок о бок с братьями-ветеранами.",
    "abilities": {
      "Litany of Hate": "Атаки ближнего боя этого юнита имеют [LANCE].",
      "Zealous Fortitude": "Этот юнит имеет [core:Feel No Pain 4+] против **[gloss:mortal-wound:смертельных ран]**."
    },
    "wargearAbilities": {
      "Relic Shield": "Эта модель имеет +1 **[gloss:wounds:W]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Crozius Arcanum; 1 Storm Bolter.",
    "options": [
      "Storm Bolter этой модели можно заменить на 1 Relic Shield."
    ],
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "chaplain-on-bike": {
    "flavor": "Когда Chaplain выходит на поле на байке типа Raider, он способен поспевать даже за самым стремительным броском брони или прорывом-наконечником. Сражаясь в таком деле, он призывает братьев к победе, рыча катехизисы и бросаясь очертя голову на врага под свист crozius arcanum.",
    "abilities": {
      "Litany of Hate": "Атаки ближнего боя этого юнита имеют [LANCE].",
      "Catechism of Fire": "В вашей фазе стрельбы, когда этот юнит **[gloss:selected-to-shoot:выбран для стрельбы]**, вы можете выбрать один **[gloss:visible:видимый]** вражеский юнит. Дальнобойные атаки этого юнита по тому юниту имеют [DEVASTATING WOUNDS]."
    },
    "loadout": "**Эта модель вооружена:** 1 Absolvor Bolt Pistol; 1 Crozius Arcanum; 1 Twin Bolt Rifle.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "chaplain-with-jump-pack": {
    "flavor": "Всегда и повсюду на поле боя нужны рычащие литании капелланов, чтобы будить сердца братьев и вселять страх во врага. С jump pack Chaplain может громом обрушиться туда, где он нужнее всего, или сам возглавить яростный штурм вражеских позиций.",
    "abilities": {
      "Exhortation of Rage": "Пока этот юнит на **[gloss:half-strength:половинной численности]** или ниже, атаки ближнего боя этого юнита могут перебрасывать **[gloss:wound-roll:броски на ранение]**.",
      "Litany of Hate": "Атаки ближнего боя этого юнита имеют [LANCE]."
    },
    "loadout": "**Эта модель вооружена:** 1 Absolvor Bolt Pistol; 1 Crozius Arcanum.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "chief-librarian-tigurius": {
    "aliasesRu": ["Тигурий"],
    "flavor": "Бросаясь в бой, Тигурий обрушивает на врага бурю психической ярости. Разряды энергии срываются с его посоха, швыряя врагов по воздуху и сжигая их души в пепел. Но ценнее всего для Ордена острое предвидение Верховного Librarian — малейшая его интуиция стоит больше, чем предсказания целой армии стратегов и шпионов.",
    "abilities": {
      "Chief Librarian (psyker level 3)": "Эта модель имеет **[gloss:psychic-ability:псайкерские способности]**, перечисленные в разделе Psychic Abilities (см. слева).",
      "Hood of Hellfire (Psychic)": "Этот юнит имеет [core:Feel No Pain 4+] против **псайкерских атак** и **[gloss:mortal-wound:смертельных ран]**."
    },
    "abilitySets": {
      "Chief Librarian (psyker level 3)": {
        "name": "Главный библиарий (псайкерский уровень 3)",
        "options": {
          "Prescience (psychic level 2)": {
            "name": "Prescience (псайкерский уровень 2)",
            "text": "В вашей фазе движения, если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, вы можете совершить для него **[gloss:psychic-roll:псайкерский бросок]**, бросив один D6. Если вы это делаете:\n▪ На 1 этот юнит **в боевом шоке**.\n▪ До начала вашего следующего хода этот юнит имеет +1 **[gloss:save:Sv]**."
          },
          "Telepathic Assault (psychic level 1)": {
            "name": "Telepathic Assault (псайкерский уровень 1)",
            "text": "В вашей фазе стрельбы, если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, вы можете совершить для него **[gloss:psychic-roll:псайкерский бросок]**, бросив один D6. Если вы это делаете:\n▪ На 1 этот юнит **в боевом шоке**.\n▪ Выберите один **[gloss:visible:видимый]** вражеский юнит в пределах 24\" от этого юнита. Тот вражеский юнит получает 2D3 **[gloss:mortal-wound:смертельных ран]**."
          }
        }
      }
    },
    "loadout": "**Эта модель вооружена:** 1 Bolt Pistol; 1 Rod of Tigurius; 1 Storm of the Emperor’s Wrath.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "company-heroes": {
    "flavor": "Самые героические братья роты сражаются бок о бок с высокопоставленными офицерами Ордена. Эти ветераны и специалисты служат почётной гвардией и оказывают командиру важнейшую поддержку. Company Champion защищают честь своей роты боевым мастерством, Ancient берегут вдохновляющие штандарты, а Company Veteran обрушивают град огня из реликтового болтерного оружия.",
    "abilities": {
      "Command Squad": "Атаки по этому юниту имеют -1 к **[gloss:wound-roll:броскам на ранение]**.",
      "Raise the Banner": "В конце вашей фазы движения, если этот юнит контролирует **[gloss:objective:цель]**, эта **цель** становится **[gloss:secured-objective:закреплённой]**."
    },
    "loadout": "**Модель Ancient вооружена:** 1 Combat Knife; 1 Master-crafted Bolt Pistol; 1 Master-crafted Bolt Rifle.\n**Модель Company Champion вооружена:** 1 Master-crafted Bolt Pistol; 1 Master-crafted Power Weapon.\n**Модель Company Veteran with Bolt Rifle вооружена:** 1 Combat Knife; 1 Master-crafted Bolt Pistol; 1 Master-crafted Bolt Rifle.\n**Модель Company Veteran with Heavy Bolter вооружена:** 1 Combat Knife; 1 Master-crafted Bolt Pistol; 1 Master-crafted Heavy Bolter."
  },
  "darnath-lysander": {
    "aliasesRu": ["Лисандр", "Дарнат Лисандр"],
    "flavor": "Вздымая свой storm shield по имени Rampart и взмахивая Fist of Dorn, Лисандр пробивается сквозь врагов, как военный корабль сквозь штормовое море. Каждый удар молота обращает противников в кровавое месиво, сметая с ног целые шеренги. И всё это время упрямый хмурый оскал Лисандра не дрогнет, а его решимость абсолютна.",
    "abilities": {
      "Rampart (Once per battle, per army)": "В начале любой фазы вы можете использовать эту способность. Если вы это делаете, до конца фазы эта модель имеет 2+ **[gloss:invulnerable-save:InSv]**.",
      "Icon of Obstinacy": "Атаки по этому юниту имеют -1 к **[gloss:hit-roll:броскам на попадание]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Fist of Dorn.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "desolation-squad": {
    "flavor": "Desolation Marine специализируются на том, чтобы сеять повсеместное опустошение в рядах врага. Пуская ли боеголовки прямой наводкой в массы пехоты или вражескую броню, или обрушивая на врага залпы из castellan launcher, эти воины взимают со врага страшную дань.",
    "abilities": {
      "Targeter Optics": "Дальнобойные атаки этого юнита по **[gloss:visible:видимому]** вражескому юниту имеют [IGNORES COVER]."
    },
    "loadout": "**Каждая модель вооружена:** 1 Bolt Pistol; 1 Castellan Launcher; 1 Ceramite Fists; 1 Superfrag Rocket Launcher.",
    "options": [
      "Superfrag Rocket Launcher у Desolation Sergeant можно заменить на 1 Vengor Launcher.",
      "Superkrak Rocket Launcher у Desolation Sergeant можно заменить на 1 Vengor Launcher.",
      "Всем моделям этого юнита их Superfrag Rocket Launcher можно заменить на 1 Superkrak Rocket Launcher."
    ]
  },
  "dreadnought": {
    "flavor": "Dreadnought — двуногие боевые шагоходы, пилотируемые павшими веками назад героями Ордена, которых сохраняют живыми эзотерические технологии в древнем саркофаге в сердце Dreadnought. Оснащённые убийственным тяжёлым оружием, они уничтожают врага издалека или раздавливают его в кашу в жестокой схватке.",
    "abilities": {
      "Wisdom of the Ancients": "Пока дружественный юнит ADEPTUS ASTARTES INFANTRY находится в пределах 6\" от этой модели, атаки того юнита могут перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1."
    },
    "loadout": "**Эта модель вооружена:** 1 Assault Cannon; 1 Dreadnought Fist; 1 Storm Bolter.",
    "options": [
      "Assault Cannon этой модели можно заменить на одно из следующего: 1 Heavy Plasma Cannon, 1 Multi-melta, 1 Twin Lascannon",
      "Dreadnought Fist и Storm Bolter этой модели можно заменить на 1 Missile Launcher и 1 Crushing Feet.",
      "Dreadnought combat weapon и storm bolter этой модели можно заменить на одно из следующего:\n▪ 1 missile launcher и 1 close combat weapon\n▪ 1 heavy flamer и 1 Dreadnought combat weapon",
      "Storm Bolter этой модели можно заменить на 1 Heavy Flamer."
    ]
  },
  "drop-pod": {
    "flavor": "Пущенные с кораблей на низкой орбите, Drop Pod с космодесантом врезаются в поле боя, и их люки распахиваются от яростного удара. За считаные секунды отряд вырывается наружу с огнём наперевес. Такие смертоносные удары ввергают врага в смятение, когда его линии рвутся в неистовом штурме.",
    "abilities": {
      "Deployment Complete": "Когда этот юнит расставлен и все погруженные в него юниты высадились, юниты не могут погружаться в этот юнит.",
      "Drop Pod Assault": "▪ Этот юнит должен начинать битву в **[gloss:strategic-reserves:стратегических резервах]**.\n▪ В вашей первой фазе движения этот юнит может совершить **[gloss:ingress-move:манёвр прибытия]**.\n▪ Когда этот юнит расставлен, все погруженные в него юниты должны совершить **[gloss:disembark:манёвр высадки]/[gloss:assault-disembark-move:штурмовой манёвр высадки]** (стр. 157), и эти юниты должны быть расставлены дальше 8\" от всех вражеских юнитов."
    },
    "transport": "Эта модель имеет **[gloss:transport-capacity:вместимость транспорта]** 12 моделей ADEPTUS ASTARTES INFANTRY. Она не может перевозить модели GRAVIS/JUMP PACK/TERMINATOR."
  },
  "eliminator-squad": {
    "flavor": "Eliminator Squad — непревзойдённые убийцы, смертоносные снайперы, что таятся в тенях поля боя незримо для врага. Часами они лежат в засаде ради идеального выстрела, а их изощрённые прицелы снабжают их важнейшими данными, чтобы они никогда не промахнулись.",
    "abilities": {
      "Chameleoline Cloaks": "Этот юнит имеет -3\" к **[gloss:detection-range:радиусу обнаружения]**.",
      "Special-issue Optics and Ammunition": "В вашей фазе стрельбы, когда этот юнит **[gloss:selected-to-shoot:выбран для стрельбы]**, вы можете выбрать одно из следующего:\n▪ Дальнобойные атаки этого юнита имеют [IGNORES COVER].\n▪ __Или:__ выберите один вражеский юнит в пределах 24\" от этого юнита. Тот вражеский юнит имеет +6\" к **[gloss:detection-range:радиусу обнаружения]**, пока этот юнит не отстреляется."
    },
    "loadout": "**Каждая модель вооружена:** 1 Bolt Pistol; 1 Bolt Sniper Rifle; 1 Ceramite Fists.",
    "options": [
      "Bolt Sniper Rifle у Eliminator Sergeant можно заменить на одно из следующего:\n▪ 1 Instigator Bolt Carbine\n▪ 1 Las Fusil",
      "Всем моделям Eliminator этого юнита их Bolt Sniper Rifle можно заменить на 1 Las Fusil."
    ]
  },
  "eradicator-squad-with-heavy-bolters": {
    "flavor": "Тяжёлая броня Mk X Gravis этих специалистов огневой поддержки позволяет им переносить бури встречных снарядов. Стоя незыблемо, они отвечают огнём своих беспощадных heavy bolter, выкашивая вражескую пехоту и разрывая лёгкую бронетехнику точными выстрелами по слабым местам корпусов.",
    "abilities": {
      "Overlapping Destruction": "В вашей фазе стрельбы вы можете выбрать один вражеский юнит. Атаки оружием Heavy Bolter этого юнита по тому вражескому юниту имеют [BLAST 1]."
    },
    "loadout": "**Каждая модель вооружена:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Heavy Bolter."
  },
  "eradicator-squad-with-melta-rifles": {
    "abilities": {
      "Total Obliteration": "Дальнобойные атаки этого юнита могут перебрасывать **[gloss:damage-roll:броски на урон]**."
    },
    "loadout": "**Каждая модель вооружена:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Melta Rifle.",
    "options": [
      "За каждые 3 модели в этом юните у 1 модели Eradicator Melta Rifle можно заменить на 1 Multi-melta."
    ]
  },
  "falchion": {
    "flavor": "Falchion был разработан, чтобы вооружить Легионес Астартес непревзойдённым истребителем танков, и апокалиптическая мощь его спаренной вулканической пушки вскоре стала легендой. Верная своему имени, вулканическая пушка обращает камень и металл в огненную магму, и прямое попадание из неё может оказаться смертельным даже для титанических боевых машин.",
    "abilities": {
      "Titan-killer": "Дальнобойные атаки оружием Twin Falchion Volcano Cannon этого юнита по юниту MONSTER/VEHICLE имеют [DEVASTATING WOUNDS]."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 2 Quad Lascannon; 1 Twin Falchion Volcano Cannon; 1 Twin Heavy Bolter.",
    "options": [
      "Эту модель можно снабдить одним из следующего: 1 Heavy Bolter, 1 Heavy Flamer, 1 Multi-melta, 1 Storm Bolter",
      "2 Quad Lascannons этой модели можно заменить на 2 Laser Destroyers.",
      "Twin Heavy Bolter этой модели можно заменить на 1 Twin Heavy Flamer."
    ]
  },
  "firestrike-servo-turrets": {
    "flavor": "Преимущественно оборонительное оружие, Firestrike Servo-turret обрушивает испепеляющие залпы, прикрывая фланги или базу космодесанта. Установленные на гравитационные брюшные плиты, они парят над полем боя к идеальным огневым позициям, откуда истребляют наступающего врага.",
    "abilities": {
      "Sentinel Protocols (Once per phase, per unit)": "Вы можете выбрать этот юнит целью **стратагемы Fire Overwatch**, независимо от любых других применений этой **[gloss:stratagem:стратагемы]** в этой фазе. Если вы это делаете:\n▪ Пока эта **стратагема** не разрешена, атаки этого юнита при **[gloss:snap-shooting:стрельбе навскидку]** попадают при немодифицированных **[gloss:hit-roll:бросках на попадание]** 4+.\n▪ Это применение не мешает применять эту **стратагему** к другим юнитам в этой фазе."
    },
    "loadout": "**Каждая модель вооружена:** 1 Hovering Bulk; 1 Twin Firestrike Las-talon.",
    "options": [
      "Любому числу моделей их Twin Firestrike Las-talon можно заменить на 1 Twin Firestrike Autocannon."
    ]
  },
  "gladiator-lancer": {
    "flavor": "С безукоризненной точностью Gladiator Lancer выбивает самую тяжёлую вражескую броню, и его laser destroyer прожигает в корпусах дымящиеся дыры. Дальнобойность его тяжёлого орудия такова, что он устраняет угрозы для космодесанта ещё до встречи с ними, проносясь мимо горящих остовов к своим целям.",
    "abilities": {
      "Aquilon Optics": "Дальнобойные атаки этого юнита по юниту MONSTER/VEHICLE могут:\n▪ Перебросить __один__ **[gloss:hit-roll:бросок на попадание]**.\n▪ Перебросить __один__ **[gloss:wound-roll:бросок на ранение]**.\n▪ Перебросить __один__ **[gloss:damage-roll:бросок на урон]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Hull; 1 Defensive Array; 1 Laser Destroyer."
  },
  "gladiator-reaper": {
    "flavor": "Когда пушки Gladiator Reaper раскручиваются до полного хода, гул от них заставляет зубы всех, кто рядом, ныть от силы вибраций. За считаные секунды тысячи стреляных гильз изливаются на бронированную шкуру танка, а враги стираются из бытия бурей огня.",
    "abilities": {
      "Reaping Tally": "Дальнобойные атаки этого юнита по юниту (исключая юниты MONSTER/VEHICLE) имеют +1 **[gloss:armour-penetration:AP]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Hull; 1 Defensive Array; 1 Twin Heavy Onslaught Gatling Cannon."
  },
  "gladiator-valiant": {
    "flavor": "Valiant обрушивает испепеляющие залпы, сопровождая транспорты или поддерживая пехоту в свирепом бою, с равной лёгкостью пересекая бурные потоки, засасывающие топи и бурлящие лавовые озёра. Его twin las-talon плюются смертью, быстро расправляясь с вражеской бронёй и вскрывая укреплённые позиции.",
    "abilities": {
      "Priority Target Acquisition": "Дальнобойные атаки этого юнита по юниту в пределах 12\" от этого юнита имеют +1 **[gloss:strength:S]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Hull; 1 Defensive Array; 2 Multi-melta; 1 Twin Las-talon."
  },
  "hammerfall-bunker": {
    "flavor": "Hammerfall Bunker запускаются с кораблей космодесанта так же, как Drop Pod. Автоматизированные средства блокирования зон, укомплектованные жёстко запрограммированными сервиторами, они выполняют всевозможные боевые роли, включая закрепление плацдармов, срыв вражеских штурмов и сеяние хаоса в тылу врага.",
    "abilities": {
      "Fortification": "Пока вражеский юнит **[gloss:engaged:в ближнем бою]** только с юнитами FORTIFICATION:\n▪ Тот вражеский юнит может быть выбран целью дальнобойных атак.\n▪ При стрельбе по тому вражескому юниту эти дальнобойные атаки имеют -1 к **[gloss:hit-roll:броскам на попадание]** (исключая атаки [CLOSE-QUARTERS]).\n▪ Когда тот вражеский юнит выбран для **[gloss:fall-back-move:отступления]**, если он не **[gloss:battle-shocked:в боевом шоке]**, **[gloss:hazard-roll:броски на опасность]**, совершаемые для него, автоматически успешны.",
      "Ceramite Cover": "Когда атака нацелена на юнит, который не **[gloss:fully-visible:полностью видим]** атакующей модели из-за этого юнита, цель имеет **[gloss:benefit-of-cover:преимущество укрытия]** против этой атаки.",
      "Defensive Array (Once per phase, per unit)": "Вы можете выбрать этот юнит целью **стратагемы Fire Overwatch**, независимо от любых других применений этой стратагемы в этой фазе. Если вы это делаете, это применение стоит на 1 CP меньше."
    },
    "loadout": "**Эта модель вооружена:** 1 Hammerfall Heavy Bolter Array; 1 Hammerfall Missile Launcher.",
    "options": [
      "Hammerfall Heavy Bolter Array этой модели можно заменить на 1 Hammerfall Heavy Flamer Array."
    ]
  },
  "heavy-intercessor-squad": {
    "flavor": "Облачённые в толстую броню Gravis, Heavy Intercessor закрепляют местность и непоколебимы в обороне. Всегда готовые к любому признаку вражеской контратаки, они стоят твёрдо, обрушивая залпы тяжёлого огня, что держат на расстоянии всех, кроме самых упорных или безрассудных врагов.",
    "abilities": {
      "Unyielding in the Face of the Foe": "Пока этот юнит контролирует **[gloss:objective:цель]**, этот юнит имеет +1 к **спас-броскам**."
    },
    "loadout": "**Каждая модель вооружена:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Heavy Bolt Rifle.",
    "options": [
      "За каждые 5 моделей в этом юните у 1 модели Heavy Intercessor Heavy Bolt Rifle можно заменить на 1 Heavy Bolter."
    ]
  },
  "hellblaster-squad": {
    "flavor": "Мало кто из врагов переживёт добела раскалённую ярость Hellblaster Squad. Будь то Tyranid Hive Tyrant, Ork Warboss или боевой танк Heretic Astartes — все обращаются в пепел и шлак под жгучим, метким плазменным огнём, что льётся из свирепого оружия Hellblaster.",
    "abilities": {
      "Rites of Thermal Appeasement": "Этот юнит имеет +1 к **[gloss:hazard-roll:броскам на опасность]**, совершаемым за его оружие Plasma Incinerator и Plasma Pistol."
    },
    "loadout": "**Каждая модель вооружена:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Plasma Incinerator.",
    "options": [
      "Bolt Pistol у Hellblaster Sergeant можно заменить на 1 Plasma Pistol."
    ]
  },
  "impulsor": {
    "flavor": "Оснащённый векторными двигателями, что делают его быстрее любого другого гравитационного танка в арсеналах космодесанта, Impulsor — крайне универсальный транспорт, применяемый всеми Primaris-космодесантниками для быстрой высадки и фланговых манёвров. Особенно его ценят силы Vanguard.",
    "abilities": {
      "Rapid Disembarkation": "В вашей фазе движения, когда этот юнит завершает **[gloss:advance-move:продвижение]**, юниты, погруженные в него, могут совершить **[gloss:shock-disembark-move:ударный манёвр высадки]** (стр. 157)."
    },
    "wargearAbilities": {
      "Shield Dome": "Этот юнит имеет 5+ **[gloss:invulnerable-save:InSv]**.",
      "Orbital Comms Array": "Этот юнит имеет [core:Scouts 6\"]."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Hull; 1 Storm Bolters.",
    "transport": "Эта модель имеет **[gloss:transport-capacity:вместимость транспорта]** 7 моделей ADEPTUS ASTARTES INFANTRY. Она не может перевозить модели TERMINATOR/JUMP PACK. Каждая модель GRAVIS занимает место 2 моделей."
  },
  "inceptor-squad": {
    "flavor": "Оснащённые тяжёлыми jump pack, Inceptor Squad — превосходные ударные войска, наносящие врагу сокрушительные удары. Падая к поверхности с самой границы атмосферы мира, они бьют с разрушительной силой, обрушивая ураган огня, что обращает целые отряды вражеской пехоты в кровавую взвесь.",
    "abilities": {
      "Parabolic Jetleap": "В конце фазы ближнего боя вашего оппонента, если этот юнит **[gloss:unengaged:не в ближнем бою]**, вы можете поместить его в **[gloss:strategic-reserves:стратегические резервы]**.",
      "Meteoric Descent": "Если этот юнит совершил **[gloss:ingress-move:манёвр прибытия]** в этот ход, дальнобойные атаки этого юнита имеют +1 к **[gloss:hit-roll:броскам на попадание]**."
    },
    "loadout": "**Каждая модель вооружена:** 1 Assault Bolters; 1 Ceramite Fists.",
    "options": [
      "Всем моделям этого юнита их Assault Bolters можно заменить на 1 Plasma Exterminators."
    ]
  },
  "incursor-squad": {
    "flavor": "Агрессивная лёгкая пехота, Incursor специализируются на штурме вражеских укреплений и уничтожении важнейших объектов. С грозным набором ауспексов и сенсорного оборудования они видят врагов сквозь стены и предугадывают их движения — а очередью из карабина или ударами ножа сражают их.",
    "abilities": {
      "Haywire Mine (Once per battle, per unit)": "В вашей фазе стрельбы вы можете выбрать один **[gloss:visible:видимый]** вражеский юнит в пределах 6\" от этого юнита и бросить один D6. На 2+:\n▪ Тот вражеский юнит получает D3 **[gloss:mortal-wound:смертельные раны]**.\n▪ __Или:__ если тот вражеский юнит — юнит VEHICLE, он получает 2D3 **смертельных ран**.",
      "Divinator-class Auspexes (Once per phase, per unit)": "В вашей фазе стрельбы, когда дружественный юнит ADEPTUS ASTARTES **[gloss:selected-to-shoot:выбран для стрельбы]**, вы можете использовать эту способность. Если вы это делаете, выберите один **[gloss:visible:видимый]** вражеский юнит в пределах 18\" от этого юнита. Тот юнит **просканирован**:\n▪ Пока юнит **просканирован**, дальнобойные атаки по нему могут перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1."
    },
    "loadout": "**Каждая модель вооружена:** 1 Bolt Pistol; 1 Occulus Bolt Carbine; 1 Paired Combat Blades."
  },
  "infernus-squad": {
    "flavor": "Infernus Squad выжигают целые полосы вражеских рядов огненными бурями, что вырываются из их pyreblaster. Специалисты ближнего штурма, они пускают струи горящего прометия в траншеи и бункеры врага, сквозь плотные руины и скрывающую растительность, чтобы ни один враг не ушёл от их огненного гнева.",
    "abilities": {
      "Driven from Cover": "В вашей фазе стрельбы, когда этот юнит отстрелялся, выберите один вражеский юнит, поражённый этими атаками. Дальнобойные атаки дружественных юнитов ADEPTUS ASTARTES по тому вражескому юниту имеют [IGNORES COVER]."
    },
    "loadout": "**Каждая модель вооружена:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Pyreblaster."
  },
  "infiltrator-squad": {
    "flavor": "Infiltrator Squad — мастера тайных операций, всесторонне обученные самообеспечению и навыкам выживания. Оснащённые omni-scrambler, что калечат вражескую связь, они сеют хаос среди врагов, а затем сражают их градом меткого болтерного огня.",
    "abilities": {
      "Omni-scramblers": "В вашей фазе стрельбы вы можете выбрать один **[gloss:visible:видимый]** вражеский юнит в пределах 18\" от этого юнита. Тот юнит **обнаружен**:\n▪ Пока юнит **обнаружен**, он имеет +3\" к **[gloss:detection-range:радиусу обнаружения]**."
    },
    "wargearAbilities": {
      "Helix Gauntlet": "В вашей фазе командования этот юнит **[gloss:heal:восстанавливает]** D3 раны."
    },
    "loadout": "**Каждая модель вооружена:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Marksman Bolt Carbine.",
    "options": [
      "1 модель можно снабдить 1 Helix Gauntlet."
    ]
  },
  "intercessor-squad": {
    "flavor": "Intercessor Squad способны обрушивать карающий огонь на продвижении или удерживать рубеж против врага. У них есть доступ к целому ряду болтерного оружия под самые разные боевые задачи — от поражения врагов на дальней дистанции до зачистки бункерных комплексов.",
    "abilities": {
      "Bolter Discipline": "В вашей фазе стрельбы, если применяется что-либо из следующего, дальнобойные атаки этого юнита имеют +1 к **[gloss:hit-roll:броскам на попадание]**:\n▪ Этот юнит находится в радиусе действия **[gloss:objective:цели]**.\n▪ Цель этой атаки находится в радиусе действия **цели**.",
      "Tactical Mainstay": "▪ Нахождение **[gloss:engaged:в ближнем бою]**/**[gloss:battle-shocked:в боевом шоке]** не лишает этот юнит права **[gloss:action:начинать действие]**.\n▪ Когда этот юнит **начинает действие**, это **действие** не лишает этот юнит права **стрелять**."
    },
    "loadout": "**Каждая модель вооружена:** 1 Bolt Pistol; 1 Bolt Rifle; 1 Knives and Fists.",
    "options": [
      "Knives and Fists у Intercessor Sergeant можно заменить на одно из следующего:\n▪ 1 Chainsword\n▪ 1 Power Fist\n▪ 1 Power Weapon\n▪ 1 Thunder Hammer",
      "Bolt Rifle у Intercessor Sergeant можно заменить на одно из следующего:\n▪ 1 Chainsword\n▪ 1 Hand Flamer\n▪ 1 Plasma Pistol\n▪ 1 Power Weapon",
      "За каждые 5 моделей в этом юните 1 модель Intercessor можно снабдить 1 Grenade Launcher."
    ]
  },
  "invader-atvs": {
    "abilities": {
      "Aggressive Reconnaissance": "В вашей фазе стрельбы дальнобойные атаки этого юнита по вражескому юниту, который не находится в пределах 6\" от других вражеских юнитов, имеют +1 к **[gloss:wound-roll:броскам на ранение]**."
    },
    "loadout": "**Каждая модель вооружена:** 1 Armoured Impact; 1 Bolt Pistol; 1 Onslaught Gatling Cannon; 1 Twin Bolt Rifle.",
    "options": [
      "Всем моделям этого юнита их Onslaught Gatling Cannon можно заменить на 1 Multi-melta."
    ]
  },
  "invictor-tactical-warsuit": {
    "flavor": "Оснащённый бесшумными реакторами и сервоприводами, Invictor Tactical Warsuit — боевой шагоход, идеально подходящий для поддержки операций Vanguard и самостоятельных действий в отрыве от основных ударных сил космодесанта. В бою ими управляют отборные воины, преданные защите своих братьев.",
    "abilities": {
      "Forward Assault Warsuit": "В начале первого раунда боя вы можете выбрать один вражеский юнит **меткой** этого юнита:\n▪ Атаки этого юнита по его **метке** могут перебрасывать **[gloss:wound-roll:броски на ранение]**, равные 1.\n▪ Каждый раз, когда **метка** этого юнита **[gloss:destroyed:уничтожена]**, выберите один вражеский юнит новой **меткой** этого юнита."
    },
    "loadout": "**Эта модель вооружена:** 1 Fragstorm Grenade Launcher; 1 Heavy Bolter; 1 Incendium Cannon; 1 Invictor Fist; 1 Ironhail Heavy Stubbers.",
    "options": [
      "Incendium Cannon этой модели можно заменить на 1 Twin Ironhail Autocannon."
    ]
  },
  "iron-father-feirros": {
    "aliasesRu": ["Фейррос", "Малькаан Фейррос"],
    "flavor": "Малькаан Фейррос — Master of the Forge Железных Рук и один из старейших среди предводителей Ордена, что зовутся Iron Father. Он ведёт боевых братьев Ордена и машинных духов его боевых машин, обрушивая на врага точное разрушение. Но и сам Фейррос — не менее смертоносный боец: огромным топором Harrowhand и сервоманипуляторами Medusan Manipuli он потрошит и крушит врагов.",
    "abilities": {
      "Master of the Forge": "В вашей фазе движения, в начале или в конце манёвра этого юнита, вы можете выбрать одну дружественную модель ADEPTUS ASTARTES VEHICLE в пределах 3\" от этой модели:\n▪ Та модель VEHICLE **[gloss:heal:восстанавливает]** 3 раны.\n▪ До начала вашей следующей фазы движения атаки той модели VEHICLE могут игнорировать модификаторы к следующему:\n▪ **[gloss:ballistic-skill:BS]**.\n▪ **[gloss:hit-roll:Броскам на попадание]** и **[gloss:wound-roll:броскам на ранение]**.",
      "Rites of Tempering": "Атаки по этому юниту с **[gloss:strength:S]** больше, чем **[gloss:toughness:T]** этого юнита, имеют -1 к **[gloss:wound-roll:броскам на ранение]**.",
      "Iron Father": "Пока эта модель находится в пределах 3\" от дружественного юнита ADEPTUS ASTARTES VEHICLE, эта модель имеет [core:Lone Operative]."
    },
    "loadout": "**Эта модель вооружена:** 1 Bolt Pistol; 1 Gorgon’s Wrath; 1 Harrowhand; 1 Medusan Manipuli.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "judiciar": {
    "flavor": "Давшие обет молчания, Judiciar не проповедуют вслух — вместо этого их деяния и есть литания ярости. Держа tempormortis в одной руке и огромный клинок в другой, они обязаны доказать свою достойность в бою, чтобы вступить в собственно Капелланство, свершая это актами преданности и умерщвлением врагов.",
    "abilities": {
      "Tempormortis": "Этот юнит имеет [core:Fights First]."
    },
    "loadout": "**Эта модель вооружена:** 1 Absolvor Bolt Pistol; 1 Executioner Relic Blade.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "kaius-konorius": {
    "abilities": {
      "Veteran Bodyguard": "Пока эта модель присоединена к юниту, другие модели CHARACTER этого юнита имеют [core:Feel No Pain 4+].",
      "Calgar’s Champion": "Атаки этой модели по юниту CHARACTER могут:\n▪ Перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.\n▪ Перебрасывать **[gloss:wound-roll:броски на ранение]**, равные 1."
    },
    "loadout": "**Эта модель вооружена:** 1 Heavy Bolt Pistol; 1 Severance and Rebuke.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "kayvaan-shrike": {
    "aliasesRu": [
      "Шрайк",
      "Кайваан Шрайк"
    ],
    "flavor": "Кайваан Шрайк — первейший воин Ордена Гвардии Ворона и образец учения Коракса. Мастер засады, скрытности и бдительности, он ведёт своих воинов в дерзких рейдах, партизанских кампаниях и точечных ударах, бесшумно падая с небес, прежде чем разорвать врагов свирепыми взмахами Raven’s Talons.",
    "abilities": {
      "Trifold Path of Shadow": "Этот юнит имеет:\n▪ [core:Stealth].\n▪ -3\" к **[gloss:detection-range:радиусу обнаружения]**.",
      "Echo of the Ravenspire": "В конце фазы ближнего боя вашего оппонента, если этот юнит **[gloss:unengaged:не в ближнем бою]**, вы можете поместить его в **[gloss:strategic-reserves:стратегические резервы]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Blackout; 1 Raven’s Talons.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "korsarro-khan": {
    "flavor": "Как капитан 3-й роты Белых Шрамов и Master of the Hunt, Кор’сарро Хан преследует и казнит величайших живущих врагов Ордена. Неутомимый охотник, он выслеживает добычу среди звёзд, загоняет её и сносит ей голову мастерским взмахом своего смертоносного клинка Moonfang.",
    "abilities": {
      "Trophy Taker": "Атаки этого юнита по юниту CHARACTER могут:\n▪ Перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1\n▪ Перебрасывать **[gloss:wound-roll:броски на ранение]**, равные 1.",
      "For the Khan!": "▪ Дальнобойные атаки этого юнита имеют [ASSAULT]\n▪ Атаки ближнего боя этого юнита имеют [LANCE]."
    },
    "loadout": "**Эта модель вооружена:** 1 Anzuq; 1 Bolt Pistol; 1 Moonfang.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "kratos": {
    "flavor": "Обладая внушительным набором вариантов вооружения и мощно бронированным корпусом, Kratos — почтенный штурмовой танк, по праву заслуживший свою репутацию среди воинств как лоялистских, так и еретических командиров. Наступая рядом с построениями бронированной пехоты, машина обеспечивает сокрушительную огневую поддержку, способную переломить ход целых сражений.",
    "abilities": {
      "Line-breaker": "В вашей фазе стрельбы, когда этот юнит **[gloss:selected-to-shoot:выбран для стрельбы]** с использованием **[gloss:close-quarters:ближней стрельбы]**:\n▪ Атаки этого юнита по юниту, находящемуся **[gloss:engaged:в ближнем бою]** с этим юнитом, могут игнорировать модификаторы к:\n▪ **[gloss:ballistic-skill:BS]**.\n▪ **[gloss:hit-roll:Броскам на попадание]**.\n▪ Для каждого оружия [BLAST] этого юнита вы можете решить, что это оружие не имеет [BLAST]:\n▪ Если вы это делаете, это оружие может нацеливаться только на вражеский юнит, который не **в ближнем бою** с другим дружественным юнитом."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 1 Autocannon; 4 Heavy Bolter; 1 Kratos Battle Cannon.",
    "options": [
      "2 Heavy Bolters этой модели можно заменить на одно из следующего: 2 Autocannons, 2 Lascannonss, 2 Volkite Calivers",
      "Kratos Battle Cannon этой модели можно заменить на одно из следующего: 1 Melta Blast-gun, 1 Volkite Cardanelle",
      "2 Heavy Bolters этой модели можно заменить на одно из следующего: 2 Heavy Flamers, 2 Lascannonss, 2 Volkite Culverins",
      "Эту модель можно снабдить одним из следующего: 1 Combi-weapon, 1 Havoc Launcher, 1 Heavy Bolter, 1 Heavy Flamer, 1 Multi-melta, 1 Twin Boltgun",
      "Эту модель можно снабдить 1 Hunter-killer Missile"
    ]
  },
  "land-raider": {
    "flavor": "Land Raider — подвижные крепости, что проносят отряды космодесанта сквозь самые яростные огненные бури без единой царапины. Их машинные духи столь могучи, что если экипаж перебит, они берут управление на себя, делая танк поистине грозным средством.",
    "abilities": {
      "Power of the Machine Spirit": "Дальнобойные атаки этого юнита могут:\n▪ Перебросить __один__ **[gloss:hit-roll:бросок на попадание]**.\n▪ Перебросить __один__ **[gloss:wound-roll:бросок на ранение]**.",
      "Assault Ramp": "В вашей фазе движения, когда этот юнит завершает **[gloss:normal-move:обычный манёвр]**, юниты, погруженные в него, могут совершить **[gloss:assault-disembark-move:штурмовой манёвр высадки]** (стр. 157)."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 2 Godhammer Lascannon; 1 Twin Heavy Bolter.",
    "options": [
      "Эту модель можно снабдить 1 Hunter-killer Missile.",
      "Эту модель можно снабдить 1 Multi-melta.",
      "Эту модель можно снабдить 1 Storm Bolter."
    ],
    "transport": "Эта модель имеет **[gloss:transport-capacity:вместимость транспорта]** 14 моделей ADEPTUS ASTARTES INFANTRY. Она не может перевозить модели JUMP PACK. Каждая модель GRAVIS/TERMINATOR занимает место 2 моделей."
  },
  "land-raider-crusader": {
    "flavor": "Land Raider Crusader — непревзойдённый штурмовой танк. Его туша позволяет крушить вражескую оборону, а исполинская огневая мощь рвёт защитников в клочья. С увеличенной транспортной вместимостью, взломав вражескую оборону, он изливает из своих люков космодесантников, чтобы вырезать уцелевших врагов.",
    "abilities": {
      "Assault Ramp": "В вашей фазе движения, когда этот юнит завершает **[gloss:normal-move:обычный манёвр]**, юниты, погруженные в него, могут совершить **[gloss:assault-disembark-move:штурмовой манёвр высадки]** (стр. 157).",
      "Fury of the Machine Spirit": "Дальнобойные атаки этого юнита по юниту в пределах 12\" от этого юнита имеют [LETHAL HITS]."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 2 Hurricane Bolter; 1 Twin Assault Cannon.",
    "options": [
      "Эту модель можно снабдить 1 Hunter-killer Missile.",
      "Эту модель можно снабдить 1 Multi-melta.",
      "Эту модель можно снабдить 1 Storm Bolter."
    ],
    "transport": "Эта модель имеет **[gloss:transport-capacity:вместимость транспорта]** 16 моделей ADEPTUS ASTARTES INFANTRY. Она не может перевозить модели JUMP PACK. Каждая модель GRAVIS/TERMINATOR занимает место 2 моделей."
  },
  "land-raider-excelsior": {
    "abilities": {
      "Rites of Battle": "Один раз за раунд боя один юнит вашей армии с этой способностью может использовать её, когда его выбирают целью **[gloss:stratagem:стратагемы]**. Если он это делает, уменьшите стоимость этой **стратагемы** на 1 **[gloss:command-points:CP]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 2 Godhammer Lascannon; 1 Grav-cannon.",
    "options": [
      "Эту модель можно снабдить 1 Multi-melta",
      "Эту модель можно снабдить 1 Hunter-killer Missile",
      "Эту модель можно снабдить 1 Storm Bolter",
      "Эту модель можно снабдить 1 Combi-weapon - Damnatus"
    ],
    "transport": "Эта модель имеет вместимость транспорта 12 моделей Adeptus Astartes Infantry. Каждая модель Jump Pack, Gravis, Terminator занимает место 2 моделей. Каждая модель Centurion занимает место 3 моделей."
  },
  "land-raider-redeemer": {
    "flavor": "В жестоком городском бою выбить окопавшегося врага бывает невозможно. Но не для Land Raider Redeemer. Когда он пускает в ход свои flamestorm cannon, все, кто попал в бушующий ад горящего прометия, обречены, а бункеры, доты, разрушенные фабрикаты и разбитые жилблоки очищаются от врага.",
    "abilities": {
      "Wrath of the Machine Spirit": "Дальнобойные атаки этого юнита по юниту в пределах 12\" от этого юнита имеют [DEVASTATING WOUNDS: **non-**MONSTER/VEHICLE].",
      "Assault Ramp": "В вашей фазе движения, когда этот юнит завершает **[gloss:normal-move:обычный манёвр]**, юниты, погруженные в него, могут совершить **[gloss:assault-disembark-move:штурмовой манёвр высадки]** (стр. 157)."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 2 Flamestorm Cannon; 1 Twin Assault Cannon.",
    "options": [
      "Эту модель можно снабдить 1 Hunter-killer Missile.",
      "Эту модель можно снабдить 1 Multi-melta.",
      "Эту модель можно снабдить 1 Storm Bolter."
    ],
    "transport": "Эта модель имеет **[gloss:transport-capacity:вместимость транспорта]** 14 моделей ADEPTUS ASTARTES INFANTRY. Она не может перевозить модели JUMP PACK. Каждая модель GRAVIS/TERMINATOR занимает место 2 моделей."
  },
  "land-speeder": {
    "flavor": "Проносясь над полем боя на гудящих грави-двигателях, Land Speeder совершает стремительные штурмовые заходы, обрушивая на врага шквал огня, а затем уносится прочь, прежде чем противник успеет ответить. Это ценный ресурс быстрой разведки для сил космодесанта на поле боя, превосходно обеспечивающий высокомобильную огневую поддержку.",
    "abilities": {
      "Purgation Run": "В вашей фазе стрельбы, когда этот юнит отстрелялся, вы можете использовать эту способность. Если вы это делаете:\n▪ Этот юнит может совершить **[gloss:normal-move:обычный манёвр]** до D6\".\n▪ До конца хода этот юнит не имеет права **[gloss:declare-charge:объявлять нападение]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Impact; 1 Multi-melta; 1 Onslaught Gatling Cannon; 1 Stormfury Missile Launcher.",
    "options": [
      "Onslaught Gatling Cannon этой модели можно заменить на 1 Pyrecannon."
    ]
  },
  "librarian": {
    "flavor": "Librarian — боевые псайкеры космодесанта и хранители знаний. Владея пугающими эмпирейскими энергиями, они одной мыслью способны раздавить череп врага, воздвигнуть силовые щиты для защиты братьев от встречного огня и метать разряды псионической мощи.",
    "abilities": {
      "Psychic Hood (Psychic)": "Этот юнит имеет [core:Feel No Pain 4+] против **[gloss:psychic-attack:психических атак]**.",
      "Librarian (psyker level 1)": "Эта модель имеет **[gloss:psychic-ability:псайкерские способности]**, перечисленные в разделе Psychic Abilities."
    },
    "loadout": "**Эта модель вооружена:** 1 Bolt Pistol; 1 Force Weapon; 1 Smite.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    },
    "abilitySets": {
      "Librarian (psyker level 1)": {
        "options": {
          "Veil of Time (psychic level 1)": "Когда этот юнит выбран для совершения **[gloss:advance-move:продвижения]**, если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, вы можете совершить для него **[gloss:psychic-roll:псайкерский бросок]**, бросив один D6. Если вы это делаете:\n▪ На 1 этот юнит **в боевом шоке**.\n▪ Этот юнит может изменить этот **[gloss:advance-roll:бросок продвижения]** на 6.",
          "Force Dome (psychic level 1)": "В вашей фазе движения, если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, вы можете совершить для него **[gloss:psychic-roll:псайкерский бросок]**, бросив один D6. Если вы это делаете:\n▪ На 1 этот юнит **в боевом шоке**.\n▪ До начала вашего следующего хода этот юнит имеет 4+ **[gloss:invulnerable-save:InSv]**."
        }
      }
    }
  },
  "librarian-in-phobos-armour": {
    "flavor": "Многие Librarian в ходе долгого и опасного обучения постигают тайные искусства сокрытия и иллюзии. Облачившись в броню Phobos, они выходят на поле и используют эти навыки, чтобы затуманивать разум врагов, вырывать из их умов важнейшие боевые планы и обращать тени врага против него самого.",
    "abilities": {
      "Psychic Hood (Psychic)": "Этот юнит имеет [core:Feel No Pain 4+] против **[gloss:psychic-attack:психических атак]**.",
      "Librarian (psyker level 1)": "Эта модель имеет **[gloss:psychic-ability:псайкерские способности]**, перечисленные в разделе Psychic Abilities."
    },
    "loadout": "**Эта модель вооружена:** 1 Bolt Pistol; 1 Force Weapon; 1 Smite.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    },
    "abilitySets": {
      "Librarian (psyker level 1)": {
        "options": {
          "Shrouding (psychic level 1)": "Когда вражеский юнит выбирает этот юнит целью, если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, вы можете совершить для него **[gloss:psychic-roll:псайкерский бросок]**, бросив один D6. Если вы это делаете:\n▪ На 1 этот юнит **в боевом шоке**.\n▪ До конца фазы атаки по этому юниту имеют -1 к **[gloss:hit-roll:броскам на попадание]**.",
          "Soul Sight (psychic level 1)": "В вашей фазе стрельбы, если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, вы можете совершить для него **[gloss:psychic-roll:псайкерский бросок]**, бросив один D6. Если вы это делаете:\n▪ На 1 этот юнит **в боевом шоке**.\n▪ Выберите один **[gloss:visible:видимый]** вражеский юнит. Дальнобойные атаки по тому вражескому юниту имеют [IGNORES COVER]."
        }
      }
    }
  },
  "librarian-in-terminator-armour": {
    "flavor": "Силы Librarian Ордена придают смертоносную псионическую остроту его элитным пехотным наконечникам. Будь то изнурительные абордажи, свирепый городской бой или передовая против подавляющего численного превосходства врага, Librarian в броне Terminator разят врага своими мощными псионическими энергиями.",
    "abilities": {
      "Psychic Hood (Psychic)": "Этот юнит имеет [core:Feel No Pain 4+] против **[gloss:psychic-attack:психических атак]**.",
      "Librarian (psyker level 1)": "Эта модель имеет **[gloss:psychic-ability:псайкерские способности]**, перечисленные в разделе Psychic Abilities."
    },
    "loadout": "**Эта модель вооружена:** 1 Force Weapon; 1 Smite; 1 Storm Bolter.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    },
    "abilitySets": {
      "Librarian (psyker level 1)": {
        "options": {
          "Might of Heroes (psychic level 1)": "В фазе ближнего боя, если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, вы можете совершить для него **[gloss:psychic-roll:псайкерский бросок]**, бросив один D6. Если вы это делаете:\n▪ На 1 этот юнит **в боевом шоке**.\n▪ Атаки ближнего боя этого юнита имеют +2 **[gloss:strength:S]**.",
          "Thunderous Force (psychic level 1)": "В вашей фазе стрельбы, если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, вы можете совершить для него **[gloss:psychic-roll:псайкерский бросок]**, бросив один D6. Если вы это делаете:\n▪ На 1 этот юнит **в боевом шоке**.\n▪ Дальнобойные атаки этого юнита имеют +6\" **[gloss:range:R]**."
        }
      }
    }
  },
  "lieutenant": {
    "flavor": "Lieutenant, помимо того что они крайне способные тактики и стратеги, ещё и высококлассные воины. Знатоки всего смертоносного оружия братьев, которыми они так часто командуют и бок о бок с которыми сражаются, они выкрикивают приказы и координируют атаки братьев, разя при этом врага собственным арсеналом мощного оружия.",
    "abilities": {
      "Tactical Precision": "Атаки этого юнита имеют [LETHAL HITS: **non-**MONSTER/VEHICLE].",
      "Demi-company Commander (Once per turn, per unit)": "Когда дружественный юнит CAPTAIN использует свою способность Strategic Acumen, вы можете использовать эту способность. Если вы это делаете, выбранная **[gloss:sm-combat-doctrine:боевая доктрина]** активна для этого юнита до начала вашей следующей фазы командования."
    },
    "wargearAbilities": {
      "Storm Shield": "Эта модель имеет 4+ **[gloss:invulnerable-save:InSv]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Master-crafted Bolter.",
    "options": [
      "Master-crafted Bolter и Bolt Pistol этой модели можно заменить на 1 Neo-volkite Pistol и 1 Master-crafted Power Weapon.",
      "Если эта модель вооружена 1 Neo-volkite Pistol, её можно снабдить 1 Storm Shield (1 Neo-volkite Pistol этой модели нельзя заменить).",
      "Bolt Pistol этой модели можно заменить на 1 Heavy Bolt Pistol.",
      "Master-crafted Bolter этой модели можно заменить на одно из следующего:\n▪ 1 Master-crafted Power Weapon\n▪ 1 Plasma Pistol\n▪ 1 Power Fist",
      "Ceramite Fists этой модели можно заменить на одно из следующего:\n▪ 1 Master-crafted Power Weapon\n▪ 1 Power Fist"
    ],
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "lieutenant-in-phobos-armour": {
    "flavor": "Крайне умелые боевые командиры, Lieutenant способны вести самостоятельные силы разведки, диверсии и убийства далеко за имперскими линиями. Это смертоносные воины, и последним ощущением бессчётных врагов было холодное прикосновение ножа лейтенанта космодесанта к их горлу.",
    "abilities": {
      "Tactical Precision": "Атаки этого юнита имеют [LETHAL HITS: **non-**MONSTER/VEHICLE].",
      "Demi-company Commander (Once per turn, per unit)": "Когда дружественный юнит CAPTAIN использует свою способность Strategic Acumen, вы можете использовать эту способность. Если вы это делаете, выбранная **[gloss:sm-combat-doctrine:боевая доктрина]** активна для этого юнита до начала вашей следующей фазы командования."
    },
    "loadout": "**Эта модель вооружена:** 1 Monomolecular Combat Blades; 1 Special-issue Bolt Pistol.",
    "options": [
      "Special-issue Bolt Pistol этой модели можно заменить на 1 Master-crafted Bolt Carbine."
    ],
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "lieutenant-with-combi-weapon": {
    "flavor": "Некоторым лейтенантам в броне Phobos поручают действовать в тылу врага, выступая умелыми убийцами и сборщиками разведданных. К тому времени, как прибудет основная ударная группа космодесанта, они уже ввергли врага в смятение и собрали невероятные тактические данные, что почти гарантируют успех штурма.",
    "abilities": {
      "Priority Target Identified (Once per battle, per unit)": "В вашей фазе командования вы можете использовать эту способность. Если вы это делаете, выберите один **видимый элемент ландшафта**. До конца хода этот элемент ландшафта **опознан**.\n▪ Пока вражеский юнит находится в пределах **опознанного элемента ландшафта**, тот вражеский юнит имеет +3\" к **[gloss:detection-range:радиусу обнаружения]**.",
      "Evade and Survive (Once per phase, per unit)": "В фазе движения вашего оппонента, когда вражеский юнит завершает манёвр в пределах 8\" от этого юнита, если этот юнит **[gloss:unengaged:не в ближнем бою]**, он может совершить **[gloss:normal-move:обычный манёвр]** до D3+3\"."
    },
    "loadout": "**Эта модель вооружена:** 1 Combi-weapon; 1 Paired Combat Blades."
  },
  "marneus-calgar": {
    "abilities": {
      "Codex Adept": "Для этого юнита активны **[gloss:sm-combat-doctrine:Assault Doctrine]**, **Devastator Doctrine** и **Tactical Doctrine**.",
      "Master Tactician": "В вашей фазе движения вы можете выбрать один **[gloss:visible:видимый]** дружественный юнит ADEPTUS ASTARTES в пределах 9\" от этой модели и выбрать одну **[gloss:sm-combat-doctrine:боевую доктрину]**. Эта **боевая доктрина** активна для того юнита до начала вашей следующей фазы командования.",
      "Thunderhawk Insertion": "На шаге объявления боевых построений вы можете выбрать один дружественный юнит GRAVIS/PHOBOS/TACTICUS. Тот юнит имеет [core:Deep Strike]."
    },
    "loadout": "**Эта модель вооружена:** 1 Gauntlets of Ultramar.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "mastodon": {
    "flavor": "Mastodon — один из тяжелейших штурмовых транспортов, когда-либо применявшихся космодесантом; его берегут для самых укреплённых позиций. Превосходя размерами Land Raider в несколько раз, «Мастодонт» прежде всего доставляет бронированных воинов прямо в брешь, пробитую осадной мельта-батареей на его бронированном носу.",
    "abilities": {
      "Inviolable Transport": "Атаки, распределённые по этому юниту, имеют -1 **[gloss:damage-roll:D]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 2 Heavy Flamer; 2 Lascannon; 1 Siege Melta Array; 1 Skyreaper Battery.",
    "options": [
      "2 Heavy Flamers этой модели можно заменить на одно из следующего: 2 Heavy Bolters, 2 Lascannons, 2 Volkite Culverins",
      "2 Lascannons этой модели можно заменить на одно из следующего: 2 Heavy Bolters, 2 Heavy Flamers, 2 Volkite Culverins"
    ],
    "transport": "Эта модель имеет вместимость транспорта 45 моделей Adeptus Astartes Infantry. И 2 модели Dreadnought. Каждая модель Jump Pack, Gravis, Terminator занимает место 2 моделей. Каждая модель Centurion занимает место 3 моделей. Каждая модель DREADNOUGHT занимает место числа моделей, равного её характеристике **[gloss:wounds:W]**."
  },
  "outrider-squad": {
    "flavor": "Outrider Squad продвигаются впереди основных линий космодесанта, прикрывают фланги крупных построений и выслеживают вражеских лазутчиков. Когда завязывается бой, они проводят молниеносные наскоки на укреплённые позиции и настигают тех, кто пытается уйти от мести Ордена.",
    "abilities": {
      "Full-throttle Assault": "Если этот юнит совершил **[gloss:charge-move:манёвр нападения]** в этот ход, у этого юнита:\n▪ Оружие Thunder Hammer имеет +1 к **[gloss:hit-roll:броскам на попадание]** и [SUSTAINED HITS 1].\n▪ Прочее оружие ближнего боя имеет +1 **[gloss:damage-roll:D]** и [SUSTAINED HITS 1]."
    },
    "loadout": "**Каждая модель вооружена:** 1 Chainsword; 1 Heavy Bolt Pistol; 1 Twin Bolt Rifle.",
    "options": [
      "Outrider Sergeant можно заменить его Chainsword на одно из следующего:\n▪ 1 Power Weapon\n▪ 1 Thunder Hammer",
      "За каждые 3 модели в этом юните 1 модели можно заменить её Heavy Bolt Pistol на 1 Plasma Pistol."
    ]
  },
  "predator-annihilator": {
    "flavor": "Predator Annihilator превосходно ведут бронированные наконечники, двигаясь на высокой скорости и не переставая вести огонь. Их экипажи гордятся особенно свирепыми машинными духами и с радостью врываются в самую гущу боя, чтобы разнести вражеские бронеколонны и плотные бункерные комплексы.",
    "abilities": {
      "Annihilator": "Дальнобойные атаки этого юнита по юниту MONSTER/VEHICLE могут перебрасывать **[gloss:damage-roll:броски урона]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 2 Lascannon; 1 Predator Twin Lascannon.",
    "options": [
      "2 Lascannons этой модели можно заменить на 2 Heavy Bolters.",
      "Эту модель можно снабдить 1 Hunter-killer Missile",
      "Эту модель можно снабдить 1 Storm Bolter"
    ]
  },
  "predator-destructor": {
    "flavor": "Predator Destructor служат Императору более десяти тысяч лет с непоколебимой стойкостью, доказывая себя истреблением полчищ вражеской пехоты, срывом штурмов и опустошением лёгкой техники. Для вечно уступающего в числе космодесанта их огневая мощь издавна незаменима.",
    "abilities": {
      "Destructor": "Дальнобойные атаки этого юнита по юниту INFANTRY имеют +1 **[gloss:armour-penetration:AP]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 2 Lascannon; 1 Predator Autocannon.",
    "options": [
      "Эту модель можно снабдить 1 Storm Bolter",
      "Эту модель можно снабдить 1 Hunter-killer Missile",
      "2 Lascannons этой модели можно заменить на 2 Heavy Bolters."
    ]
  },
  "rapier-carrier": {
    "flavor": "Rapier Armoured Carrier — громоздкая гусеничная платформа, чьи истоки восходят к заре звёздной империи человечества. Совместимая с разнообразным тяжёлым вооружением, «Рапира» чаще всего несёт мощную счетверённую лазпушку, известную как лазерный разрушитель, что делает её компактным, но грозным противотанковым средством.",
    "abilities": {
      "Powerful Volley": "В ход, в котором этот юнит **[gloss:remain-stationary:оставался неподвижным]**, дальнобойные атаки, имеющие [HEAVY], также имеют [LETHAL HITS]."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Hull; 1 Boltgun; 1 Quad Heavy Bolter.",
    "options": [
      "Quad Heavy Bolter этой модели можно заменить на одно из следующего: 1 Graviton Cannon, 1 Laser Destroyer, 1 Quad Launcher"
    ]
  },
  "razorback": {
    "flavor": "Razorback заменяет часть транспортной вместимости Rhino башней с тяжёлым оружием и обеспечивает огневую поддержку бронированным пехотным штурмам, доставляя при этом на бой собственный груз воинов. Он столь успешен, что во многих Орденах выполняет и дополнительные роли, в частности как мобильный командный центр.",
    "abilities": {
      "Fire Support": "В вашей фазе стрельбы, когда этот юнит отстрелялся, выберите один вражеский юнит, поражённый этими атаками. Атаки по тому юниту, совершаемые дружественными юнитами ADEPTUS ASTARTES, которые **высадились** из этого TRANSPORT в этот ход, могут перебрасывать **[gloss:wound-roll:броски на ранение]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 1 Twin Heavy Bolter.",
    "options": [
      "Twin Heavy Bolter этой модели можно заменить на 1 Twin Lascannon.",
      "Эту модель можно снабдить 1 Hunter-killer Missile",
      "Эту модель можно снабдить 1 Storm Bolter"
    ],
    "transport": "Эта модель имеет вместимость транспорта 6 моделей Adeptus Astartes Infantry. Она не может перевозить модели Jump Pack, Terminator, Centurion или Gravis."
  },
  "redemptor-dreadnought": {
    "flavor": "Redemptor Dreadnought — одни из крупнейших в своём роде, что когда-либо выставлял Adeptus Astartes. Вооружённые до зубов, они могут быть снаряжены так, чтобы полностью уничтожить практически любую цель на поле боя градом снарядов или перегретой плазмой.",
    "abilities": {
      "Duty Eternal": "Атаки по этому юниту с **[gloss:strength:S]** больше **[gloss:toughness:T]** этого юнита имеют -1 к **[gloss:wound-roll:броскам на ранение]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Fragstorm Grenade Launchers; 1 Heavy Flamer; 1 Heavy Onslaught Gatling Cannon; 1 Redemptor Fist.",
    "options": [
      "Эту модель можно снабдить 1 Icarus Rocket Pod.",
      "Fragstorm Grenade Launchers этой модели можно заменить на 1 Storm Bolters.",
      "Heavy Flamer этой модели можно заменить на 1 Onslaught Gatling Cannon.",
      "Heavy Onslaught Gatling Cannon этой модели можно заменить на 1 Macro Plasma Incinerator."
    ]
  },
  "reiver-squad": {
    "flavor": "Войска ужаса быстрой высадки, Reiver Squad часто развёртываются на грави-парашютах и направляющих плоскостях, приземляясь с безукоризненной точностью. Действуя почти в совершенной скрытности, чтобы достичь идеальной точки удара, они, когда готовы, обрушивают свою ярость, устремляясь вперёд с усиленным гортанным рёвом и залпами огня.",
    "abilities": {
      "Terror Troops (Aura)": "Пока вражеская модель находится в пределах 3\" от этого юнита, та вражеская модель имеет -1 **[gloss:objective-control:OC]**.",
      "Fearsome Assault": "В начале фазы ближнего боя каждый вражеский юнит **[gloss:engaged:в ближнем бою]** с юнитом с этой способностью совершает **[gloss:battle-shock-test:бросок на боевой шок]** с -1 к этому **броску на боевой шок**."
    },
    "wargearAbilities": {
      "Grav-chutes": "Этот юнит имеет [core:Deep Strike].",
      "Grapnel Launchers": "Когда этот юнит совершает манёвр, он может:\n▪ Проходить сквозь модели всех типов.\n▪ Игнорировать всё вертикальное расстояние при определении того, насколько далеко переместился этот юнит."
    },
    "loadout": "**Каждая модель вооружена:** 1 Bolt Carbine; 1 Monomolecular Combat Knife; 1 Special-issue Bolt Pistol.",
    "options": [
      "Этот юнит можно снабдить 1 Grav-chutes",
      "Этот юнит можно снабдить 1 Grapnel Launchers"
    ]
  },
  "relic-razorback": {
    "abilities": {
      "Fire Supprt": "В вашей фазе стрельбы, когда этот юнит отстрелялся, выберите один вражеский юнит, поражённый этими атаками. Атаки по тому юниту, совершаемые дружественными юнитами ADEPTUS ASTARTES, которые **высадились** из этого TRANSPORT в этот ход, могут перебрасывать **[gloss:wound-roll:броски на ранение]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 1 Twin Heavy Bolter.",
    "options": [
      "Twin Heavy Bolter этой модели можно заменить на одно из следующего: 1 Multi-melta, 1 Twin Assault Cannon, 1 Twin Lascannon",
      "Эту модель можно снабдить 1 Storm Bolter",
      "Эту модель можно снабдить 1 Hunter-killer Missile"
    ],
    "transport": "Эта модель имеет вместимость транспорта 6 моделей Adeptus Astartes Infantry. Она не может перевозить модели Jump Pack, Gravis, Centurion или Terminator."
  },
  "repulsor": {
    "flavor": "Одетый в передовую броневую обшивку и вооружённый под любую боевую ситуацию, Repulsor не только безопасно доставляет пассажиров, но и обеспечивает превосходную огневую поддержку. Опасная местность ему почти не помеха: его брюшные плиты направляют гравитационные энергии, что дробят препятствия под массой машины.",
    "abilities": {
      "Combat Embarkation": "В фазе нападения вашего оппонента, когда вражеский юнит выбрал **[gloss:charge-target:цели нападения]**, вы можете выбрать один дружественный юнит ADEPTUS ASTARTES, **[gloss:unengaged:не находящийся в ближнем бою]**, который был одной из этих **целей нападения** и может погрузиться в этот TRANSPORT. Если каждая модель того юнита находится в пределах 3\" от этого TRANSPORT, тот юнит может погрузиться в этот TRANSPORT. Затем тот вражеский юнит может выбрать новые **цели нападения** для этого **[gloss:charge-move:манёвра нападения]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Hull; 1 Defensive Array; 1 Heavy Onslaught Gatling Cannon; 1 Hunter-slayer Missile; 1 Twin Heavy Bolter.",
    "transport": "Эта модель имеет **[gloss:transport-capacity:вместимость транспорта]** 14 моделей ADEPTUS ASTARTES INFANTRY. Она не может перевозить модели JUMP PACK. Каждая модель GRAVIS/TERMINATOR занимает место 2 моделей."
  },
  "repulsor-executioner": {
    "flavor": "Основанный на шасси Repulsor, Repulsor Executioner жертвует частью транспортной вместимости ради мощного башенного оружия. Даже крупнейшие боевые танки может искалечить луч heavy laser destroyer, а испепеляющие залпы macro plasma incinerator способны стереть пехотные построения.",
    "abilities": {
      "Executioner": "Дальнобойные атаки этого юнита по юниту, который не **[gloss:half-strength:ниже половинной численности]**, имеют +1 к **[gloss:hit-roll:броскам на попадание]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Hull; 1 Defensive Array; 1 Heavy Laser Destroyer; 1 Heavy Onslaught Gatling Cannon; 1 Twin Heavy Bolter.",
    "transport": "Эта модель имеет **[gloss:transport-capacity:вместимость транспорта]** 7 моделей ADEPTUS ASTARTES INFANTRY. Она не может перевозить модели JUMP PACK. Каждая модель GRAVIS/TERMINATOR занимает место 2 моделей."
  },
  "rhino": {
    "flavor": "Транспорт Rhino служит космодесанту десять тысяч лет и входит во многие их ударные силы. С надёжными системами самопочинки Rhino — крепкая машина, что способна быстро пройти кошмарные поля боя, чтобы доставить свой смертоносный груз космодесантников в самое сердце битвы.",
    "abilities": {
      "Veiling Smoke (Once per phase, per unit)": "Вы можете выбрать этот юнит целью **стратагемы Smokescreen** независимо от любых других применений этой **[gloss:stratagem:стратагемы]** в этой фазе. Если вы это делаете:\n▪ Это применение стоит -1 CP.\n▪ Это применение не мешает применять эту **стратагему** к другим юнитам в этой фазе."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 1 Storm Bolter.",
    "options": [
      "Эту модель можно снабдить 1 Hunter-killer Missile."
    ],
    "transport": "Эта модель имеет **[gloss:transport-capacity:вместимость транспорта]** 12 моделей ADEPTUS ASTARTES INFANTRY. Она не может перевозить модели GRAVIS/JUMP PACK/TERMINATOR."
  },
  "rhino-primaris": {
    "abilities": {
      "Self-repair": "В вашей фазе командования этот юнит **[gloss:heal:восстанавливает]** 1 рану.",
      "Orbital Comms Array": "Пока дружественный юнит ADEPTUS ASTARTES находится в пределах 6\" от этого юнита, каждый раз, когда вы выбираете тот юнит целью **[gloss:stratagem:стратагемы]**, бросьте 1D6:\n▪ На 5+ вы получаете 1 CP."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 1 Twin Plasma Gun - Standard.",
    "options": [
      "Эту модель можно снабдить 1 Hunter-killer Missile"
    ],
    "transport": "Эта модель имеет вместимость транспорта 6 моделей Adeptus Astartes Infantry. Она не может перевозить модели Jump Pack, Gravis, Centurion или Terminator."
  },
  "roboute-guilliman": {
    "aliasesRu": [
      "Жиллиман",
      "Гиллиман",
      "Жиля",
      "Робуте",
      "Жилиман"
    ],
    "flavor": "В одной руке Жиллимана пылает горящий Emperor’s Sword. Другая закована в Hand of Dominion — латную перчатку, которой Жиллиман разрывает танки. Но величайшее его оружие — стратегический блеск: его враги переиграны и передуманы ещё до того, как битва началась.",
    "abilities": {
      "Codex Adept": "Для этого юнита активны **[gloss:sm-combat-doctrine:Assault Doctrine]**, **Devastator Doctrine** и **Tactical Doctrine**.",
      "Primarch of the XIII (Aura)": "Пока дружественный юнит ADEPTUS ASTARTES находится в пределах 6\" от этого юнита, атаки того юнита могут:\n▪ Перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.\n▪ Перебрасывать **[gloss:wound-roll:броски на ранение]**, равные 1.",
      "Author of the Codex": "В вашей фазе движения вы можете выбрать один **[gloss:visible:видимый]** дружественный юнит ADEPTUS ASTARTES в пределах 12\" от этой модели и выбрать одну **[gloss:sm-combat-doctrine:боевую доктрину]**. Эта **боевая доктрина** активна для того юнита __в дополнение__ к любым другим **боевым доктринам**, активным для этого юнита, до начала вашей следующей фазы командования.",
      "Leader of Astartes": "Пока этот юнит находится в пределах 3\" от дружественного юнита ADEPTUS ASTARTES INFANTRY, он имеет [core:Lone Operative]."
    },
    "rules": {
      "SUPREME COMMANDER": "Если эта модель в вашей армии, она должна быть вашим WARLORD."
    },
    "loadout": "**Эта модель вооружена:** 1 Emperor’s Sword; 1 Hand of Dominion."
  },
  "scout-bike-squad": {
    "abilities": {
      "Outflank": "Когда этот юнит совершает **[gloss:ingress-move:манёвр прибытия]**, его можно выставить в зоне развёртывания вашего оппонента."
    },
    "loadout": "**Каждая модель вооружена:** 1 Bolt Pistol; 1 Combat Knife; 1 Shotgun; 1 Twin Boltgun.",
    "options": [
      "Любому числу моделей можно заменить их Twin Boltgun на 1 Grenade Launcher.",
      "Scout Biker Sergeant можно заменить его Bolt Pistol на одно из следующего: 1 Boltgun, 1 Chainsword, 1 Combi-weapon, 1 Grav-pistol, 1 Hand Flamer, 1 Inferno Pistol, 1 Plasma Pistol - Standard, 1 Power Fist, 1 Power Weapon, 1 Storm Bolter, 1 Thunder Hammer"
    ]
  },
  "scout-squad": {
    "flavor": "Неофиты космодесанта, Scout постигают своё смертоносное ремесло в дерзких заданиях в отрыве от основных сил. Ведомые опытными сержантами-ветеранами, они проникают на вражеские позиции, зачищают возможные зоны высадки, устраивают засады, срывают линии снабжения и выполняют всевозможные иные задачи, чтобы ослабить врага.",
    "abilities": {
      "Flexible Asset": "Когда этот юнит выбран для совершения **[gloss:advance-move:продвижения/отступления]**, это **продвижение/отступление** не лишает этот юнит права **[gloss:action:начинать действие]**."
    },
    "loadout": "**Каждая модель вооружена:** 1 Boltgun; 1 Bolt Pistol; 1 Combat Knife.",
    "options": [
      "Scout Sergeant можно заменить его Boltgun на 1 Shotgun.",
      "Scout Sergeant можно заменить его Combat Knife на 1 Chainsword.",
      "Любому числу моделей Scout можно заменить их Boltgun на 1 Shotgun.",
      "За каждые 5 моделей в этом юните 1 модели Scout можно заменить её Boltgun на 1 Sniper Rifle.",
      "За каждые 5 моделей в этом юните 1 модели Scout можно заменить её Boltgun на одно из следующего:\n▪ 1 Heavy Bolter\n▪ 1 Missile Launcher"
    ]
  },
  "sicaran": {
    "abilities": {
      "Armoured Spearhead": "Дальнобойные атаки этого юнита могут перебросить __один__:\n▪ **[gloss:hit-roll:Бросок на попадание]**.\n▪ **[gloss:wound-roll:Бросок на ранение]**.\n▪ **[gloss:damage-roll:Бросок урона]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 1 Heavy Bolter; 1 Herakles-pattern Autocannon.",
    "options": [
      "Эту модель можно снабдить 1 Hunter-killer Missile",
      "Herakles-pattern Autocannon этой модели можно заменить на одно из следующего: 1 Arcus Multi-launcher, 1 Omega Plasma Array, 1 Punisher Rotary Cannon, 1 Venator Neutron Laser",
      "Эту модель можно снабдить одним из следующего: 2 Heavy Bolters, 2 Lascannons",
      "Эту модель можно снабдить 1 Storm Bolter"
    ]
  },
  "sternguard-veteran-squad": {
    "flavor": "Sternguard Veteran обладают непоколебимым спокойствием и славятся среди братьев образцовой меткостью в самых свирепых битвах. Искусные во всём дальнобойном оружии Ордена, они всегда там, где их прицельные залпы лучше всего сокрушат врага.",
    "abilities": {
      "Veteran Marksmen": "Дальнобойные атаки этого юнита могут перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1."
    },
    "loadout": "**Модель Sternguard Veteran Sergeant вооружена:** 1 Artificer Firearm; 1 Bolt Pistol; 1 Chainsword.\n**Каждая модель Sternguard Veteran вооружена:** 1 Artificer Firearm; 1 Bolt Pistol; 1 Ceramite Fists.",
    "options": [
      "Sternguard Veteran Sergeant можно заменить его Chainsword на одно из следующего:\n▪ 1 Power Fist\n▪ 1 Power Weapon",
      "За каждые 5 моделей в этом юните 1 модели Sternguard Veteran можно заменить её Artificer Firearm на одно из следующего:\n▪ 1 Heavy Bolter\n▪ 1 Pyrecannon"
    ]
  },
  "storm-speeder-hailstrike": {
    "flavor": "Hailstrike вооружён столь тяжело, что способен уничтожать целые полосы пехоты залпами испепеляющих снарядов. Проносясь над полем боя, его специализированное вооружение разбивает нападающие построения и рвёт баррикады и укрепления.",
    "abilities": {
      "Hailstrike": "В вашей фазе стрельбы, когда этот юнит отстрелялся, выберите один вражеский юнит, поражённый этими атаками. Дальнобойные атаки дружественных юнитов ADEPTUS ASTARTES по тому вражескому юниту имеют [IGNORES COVER]."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Impact; 1 Fragstorm Grenade Launchers; 1 Ironhail Heavy Stubber Array; 1 Onslaught Gatling Cannon."
  },
  "storm-speeder-hammerstrike": {
    "flavor": "Hammerstrike превосходно выкуривает врагов из траншейных и бункерных сетей. Проносясь низко над полем боя, он применяет жгучие мельта-залпы и залпы ракет, чтобы взломать линии обороны врага настежь.",
    "abilities": {
      "Hammerstrike": "Дальнобойные атаки этого юнита по вражескому юниту внутри **[gloss:terrain-area:участка укрытия]** имеют [SUSTAINED HITS 1]."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Impact; 1 Hammerstrike Missile Launcher; 1 Krakstorm Grenade Launchers; 1 Melta Destroyer."
  },
  "storm-speeder-thunderstrike": {
    "flavor": "Thunderstrike переигрывают врага на каждом ходу, целясь в уязвимые места брони, топливные баки и ракетные боеукладки, чтобы обратить танки в бушующие огненные шары. Всего один Thunderstrike способен сорвать бронированный прорыв, и пока он на поле боя, мало кто из врагов в безопасности.",
    "abilities": {
      "Shattered Defences": "В вашей фазе стрельбы, когда этот юнит отстрелялся, выберите один вражеский юнит MONSTER/VEHICLE, поражённый этими атаками. Дальнобойные атаки дружественных юнитов ADEPTUS ASTARTES по тому вражескому юниту имеют +1 **[gloss:armour-penetration:AP]**.",
      "Thunderstrike": "Дальнобойные атаки этого юнита по юниту MONSTER/VEHICLE имеют +1 к **[gloss:wound-roll:броскам на ранение]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Impact; 1 Stormfury Missile Launcher; 1 Thunderstrike Icarus Rocket Pod; 1 Thunderstrike Las-talon."
  },
  "stormhawk-interceptor": {
    "flavor": "Stormhawk Interceptor — высотные истребители, созданные исключительно для достижения господства в воздухе. Сброшенные с маг-люлек орбитальных кораблей, эти одетые в керамит машины ввязываются в жестокие воздушные бои с вражеской авиацией и защищены средствами противодействия, что выстреливают пылающие ловушки.",
    "abilities": {
      "Interceptor": "Дальнобойные атаки этого юнита по юниту FLY имеют +1 к **[gloss:hit-roll:броскам на попадание]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Hull; 1 Las-talon; 1 Skyhammer Missile Launcher; 1 Twin Assault Cannon.",
    "options": [
      "Las-talon этой модели можно заменить на 1 Icarus Stormcannon.",
      "Skyhammer Missile Launcher этой модели можно заменить на одно из следующего: 1 Twin Heavy Bolter, 1 Typhoon Missile Launcher"
    ]
  },
  "stormraven-gunship": {
    "flavor": "Stormraven превосходно сочетает роль надёжного боевого десантного корабля и смертоносного воздушного бойца. Вместительный десантный отсек и толстые слои брони позволяют ему эффективно перевозить отряды космодесанта — а благодаря магна-захватам даже Dreadnought — в самое сердце битвы.",
    "abilities": {
      "Armoured Resilience": "Атаки по этому юниту имеют -1 **[gloss:damage-roll:D]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Hull; 2 Stormstrike Missile Launcher; 1 Twin Assault Cannon; 1 Typhoon Missile Launcher.",
    "options": [
      "Эту модель можно снабдить до 2 Hurricane Bolters",
      "Typhoon Missile Launcher этой модели можно заменить на одно из следующего: 1 Twin Heavy Bolter, 1 Twin Multi-melta",
      "Twin Assault Cannon этой модели можно заменить на одно из следующего: 1 Twin Heavy Plasma Cannon, 1 Twin Lascannon"
    ],
    "transport": "Эта модель имеет вместимость транспорта 12 моделей Adeptus Astartes Infantry. И 1 модель Dreadnought. Каждая модель Jump Pack, Wulfen, Gravis, Terminator занимает место 2 моделей. Каждая модель Centurion занимает место 3 моделей."
  },
  "stormtalon-gunship": {
    "flavor": "Быстрый и маневренный, Stormtalon — воздушный перехватчик, оптимизированный для сопровождения Stormraven Gunship. Достаточно быстрый для воздушного боя, его пилот может включить репульсорные системы Stormtalon, делая его достаточно проворным, чтобы плотно поддерживать пехоту в обороне или атаке.",
    "abilities": {
      "Strafing Run": "Дальнобойные атаки этого юнита по юниту NON-FLY имеют +1 к **[gloss:hit-roll:броскам на попадание]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Hull; 1 Skyhammer Missile Launcher; 1 Twin Assault Cannon.",
    "options": [
      "Skyhammer Missile Launcher этой модели можно заменить на одно из следующего: 1 Twin Heavy Bolter, 1 Twin Lascannon, 1 Typhoon Missile Launcher"
    ]
  },
  "suboden-khan": {
    "flavor": "Истинный сын Чогориса, Субоден Хан ведёт Первое Братство Белых Шрамов из седла своего грави-байка по имени Thunder. Мастер кавалерийской войны, он ведёт свои силы в эпических гонах и стремительных бросках, проламывая вражеские линии и безжалостно настигая бегущих врагов.",
    "abilities": {
      "Spear of Chogoris": "▪ Дальнобойные атаки этого юнита имеют [ASSAULT].\n▪ Когда этот юнит выбран для совершения **[gloss:advance-move:продвижения]**, это **продвижение** не лишает этот юнит права **[gloss:declare-charge:объявлять нападение]**.\n▪ Если для этого юнита активна **[gloss:sm-combat-doctrine:Assault Doctrine]**, этот юнит имеет +1 к **[gloss:advance-roll:броскам продвижения]** и **[gloss:charge-roll:броскам нападения]**.",
      "Skilled Riders": "Этот юнит имеет MOBILE."
    },
    "loadout": "**Эта модель вооружена:** 1 Heavy Bolt Pistol; 1 Onslaught Gatling Cannon; 1 Power Sword; 1 Stormtooth.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "tarantula-air-defence-battery": {
    "abilities": {
      "Sentry Programming (Once per phase, per unit)": "Вы можете выбрать этот юнит целью **стратагемы Fire Overwatch** независимо от любых других применений этой **[gloss:stratagem:стратагемы]** в этой фазе. Если вы это делаете:\n▪ Это применение стоит -1 CP.\n▪ Это применение не мешает применять эту **стратагему** к другим юнитам в этой фазе."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Hull; 1 Tarantula Air Defence Missiles."
  },
  "tarantula-sentry-battery": {
    "flavor": "Автоматические турели «Тарантул» — самоходные оружейные системы, идеально подходящие для сдерживания и запрета доступа в район. Снабжённые простыми логическими машинами и оснащённые лазпушками либо тяжёлыми болтерами, они способны выкашивать вражескую пехоту или останавливать бронетехнику на месте, почти не отвлекая внимания своих операторов.",
    "abilities": {
      "Sentinel Protocols (Once per phase, per unit)": "Когда вы выбираете этот юнит целью **стратагемы Fire Overwatch**, атаки **[gloss:snap-shooting:стрельбы навскидку]** этого юнита попадают на немодифицированных **[gloss:hit-roll:бросках на попадание]** 4+, пока эта **[gloss:stratagem:стратагема]** не разыграна."
    },
    "loadout": "**Каждая модель вооружена:** 1 Armoured Hull; 1 Twin Heavy Bolter.",
    "options": [
      "Любому числу моделей можно заменить их Twin Heavy Bolter на 1 Twin Lascannon."
    ]
  },
  "techmarine": {
    "flavor": "Techmarine беззаветно шагают сквозь встречный огонь, чтобы успокоить машинные духи израненных боевых машин, ловко отгибая повреждённые броневые плиты, чтобы починить перегоревшую проводку, и выправляя покорёженные панели своими сервоприводами и механодендритами.",
    "abilities": {
      "Techmarine": "Пока эта модель находится в пределах 3\" от дружественного юнита ADEPTUS ASTARTES VEHICLE, эта модель имеет [core:Lone Operative].",
      "Blessings of the Omnissiah": "В вашей фазе движения, в начале или в конце манёвра этого юнита, вы можете выбрать одну дружественную модель ADEPTUS ASTARTES VEHICLE в пределах 3\" от этой модели:\n▪ Та модель VEHICLE **[gloss:heal:восстанавливает]** D3 раны.\n▪ До начала вашей следующей фазы движения атаки той модели VEHICLE могут игнорировать модификаторы к **[gloss:hit-roll:броскам на попадание]** и **[gloss:wound-roll:броскам на ранение]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Forge Bolter; 1 Grav-pistol; 1 Omnissian Power Axe and Servo-arm.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "terminator-assault-squad": {
    "flavor": "Terminator Assault Squad вооружены сокрушительным оружием ближнего боя, идеальным для свирепых штурмов и жестоких абордажей. Они бросаются на величайших воинов врага, кромсая их lightning claws или дробя черепа thunder hammer.",
    "abilities": {
      "Teleport Homer (Once per battle, per unit)": "В начале битвы вы можете поставить на поле боя один жетон Teleport Homer для этого юнита. Если вы это делаете:\n▪ Когда вы выбираете этот юнит целью **стратагемы Rapid Ingress**, вы можете использовать этот жетон Teleport Homer. Если вы это делаете, это применение стоит -1 CP, но при отыгрыше этой **[gloss:stratagem:стратагемы]** этот юнит должен быть выставлен в пределах 3\" от этого жетона Teleport Homer и не в пределах 8\" от вражеского юнита. Затем этот жетон Teleport Homer убирается с поля боя.\n▪ Если вражеский юнит завершает манёвр в пределах 1\" от этого жетона Teleport Homer, этот жетон Teleport Homer убирается с поля боя.",
      "Terminatus Assault": "Если этот юнит совершил **[gloss:charge-move:манёвр нападения]** в этот ход, у этого юнита:\n▪ Оружие Lightning Claws имеет [SUSTAINED HITS 1: NON-MONSTER/VEHICLE].\n▪ Оружие Thunder Hammer имеет [SUSTAINED HITS 1: MONSTER/VEHICLE]."
    },
    "wargearAbilities": {
      "Storm Shield": "Эта модель имеет +1 **[gloss:wounds:W]**."
    },
    "loadout": "**Каждая модель вооружена:** 1 Twin Lightning Claws.",
    "options": [
      "Любому числу моделей можно заменить их Twin Lightning Claws на 1 Storm Shield и 1 Thunder Hammer."
    ]
  },
  "terminator-squad": {
    "flavor": "Броня Terminator — чудо технологии, что позволяет носителю пережить что угодно, от перегрузок телепортации до сотрясающих землю артобстрелов. Так снаряжённые, Terminator Squad могут возникать в гуще врага или неудержимо шагать к нему через поле, не переставая вести огонь.",
    "abilities": {
      "Fury of the First": "Атаки этого юнита по юниту в пределах 9\" от этого юнита имеют +1 **[gloss:armour-penetration:AP].**",
      "Teleport Homer (Once per battle, per unit)": "В начале битвы вы можете поставить на поле боя один жетон Teleport Homer для этого юнита. Если вы это делаете:\n▪ Когда вы выбираете этот юнит целью **стратагемы Rapid Ingress**, вы можете использовать этот жетон Teleport Homer. Если вы это делаете, это применение стоит -1 CP, но при отыгрыше этой **[gloss:stratagem:стратагемы]** этот юнит должен быть выставлен в пределах 3\" от этого жетона Teleport Homer и не в пределах 8\" от вражеского юнита. Затем этот жетон Teleport Homer убирается с поля боя.\n▪ Если вражеский юнит завершает манёвр в пределах 1\" от этого жетона Teleport Homer, этот жетон Teleport Homer убирается с поля боя."
    },
    "loadout": "**Каждая модель вооружена:** 1 Power Fist; 1 Storm Bolter.",
    "options": [
      "Terminator Sergeant можно заменить его Power Fist на одно из следующего:\n▪ 1 Chainfist\n▪ 1 Power Weapon",
      "Любому числу моделей Terminator можно заменить их Power Fist на 1 Chainfist.",
      "За каждые 5 моделей в этом юните 1 модели Terminator можно заменить её Storm Bolter на одно из следующего:\n▪ 1 Assault Cannon\n▪ 1 Heavy Flamer\n▪ 1 Cyclone Missile Launcher и 1 Storm Bolter (Storm Bolter этой модели нельзя заменить)."
    ]
  },
  "terrax-pattern-termite": {
    "flavor": "Изначально созданный на Терре для выкорчёвывания роющих ксеносов во времена Великого крестового похода, штурмовой бур «Термит» быстро нашёл применение у сообразительных командиров: он прогрызает фундаменты вражеских бастионов или выныривает за баррикадами и линиями окопов, чтобы опустошить их защитников.",
    "abilities": {
      "Termite Assault": "▪ Этот юнит должен начинать битву в **[gloss:strategic-reserves:стратегических резервах]**.\n▪ В вашей первой фазе движения этот юнит может совершить **[gloss:ingress-move:манёвр прибытия]**.\n▪ Когда этот юнит выставлен, все юниты, погруженные в него, должны совершить **[gloss:disembark:манёвр высадки]/[gloss:assault-disembark-move:штурмовой манёвр высадки]** (стр. 157), и эти юниты должны быть выставлены дальше 8\" от всех вражеских юнитов."
    },
    "loadout": "**Эта модель вооружена:** 2 Combi-weapon - Damnatus; 1 Termite Drill; 1 Terrax Melta Cutter.",
    "options": [
      "2 Combi-weapons этой модели можно заменить на одно из следующего: 2 Heavy Flamers, 2 Twin Volkite Chargers"
    ],
    "transport": "Эта модель имеет вместимость транспорта 12 моделей Adeptus Astartes Infantry. Она не может перевозить модели Gravis, Jump Pack, Terminator или Centurion."
  },
  "thunderhawk-gunship": {
    "flavor": "Thunderhawk Gunship с отличием служат космодесанту со времён Великого крестового похода, сочетая роли орбитального десантного корабля, тяжёлого штурмовика и среднего бомбардировщика. Для своих размеров Thunderhawk вооружены грозно: главное орудие происходит от кораблей класса «фрегат», плюс множество дополнительного оружия.",
    "abilities": {
      "Thunderhawk Cluster Bombs": "В вашей фазе движения, когда этот юнит завершает **[gloss:normal-move:обычный манёвр/продвижение]**, вы можете выбрать один вражеский юнит, над которым этот юнит переместился во время этого манёвра, и бросить шесть D6:\n▪ За каждый результат 3+ тот вражеский юнит получает 1 **[gloss:mortal-wound:смертельную рану]**.",
      "Aerial Assault": "В вашей фазе движения, когда этот юнит завершает **[gloss:normal-move:обычный манёвр]**, юниты, погруженные в него, могут совершить **[gloss:assault-disembark-move:штурмовой манёвр высадки]** при условии, что каждая модель погруженного юнита имеет Deep Strike."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Hull; 1 Hellstrike Missile Battery; 2 Lascannon; 1 Thunderhawk Heavy Cannon; 4 Twin Heavy Bolter.",
    "options": [
      "Thunderhawk Heavy Cannon этой модели можно заменить на 1 Turbo-laser Destructor.",
      "Thunderhawk cluster bombs этой модели можно заменить на 1 hellstrike missile battery."
    ],
    "transport": "Эта модель имеет вместимость транспорта 30 моделей Adeptus Astartes Infantry. Или моделей Adeptus Astartes Mounted. Каждая модель Jump Pack, Gravis, Terminator занимает место 2 моделей. Каждая модель Adeptus Astartes Mounted занимает место 4 моделей."
  },
  "tor-garadon": {
    "aliasesRu": [
      "Гарадон",
      "Тор Гарадон"
    ],
    "flavor": "Выстрел за выстрелом отскакивают от несокрушимых лат брони Gravis Тора Гарадона, пока он продвигается по полю боя. Остроумный и с талантом к импровизированной войне, Гарадон направляет смертоносный огонь своих воинов сочетанием природного мастерства и передовых данных наведения, что подаёт ему его signum-массив.",
    "abilities": {
      "Siege Captain": "Атаки этой модели по юниту FORTIFICATION/MONSTER/VEHICLE имеют +2 **[gloss:strength:S]**, **[gloss:armour-penetration:AP]** и **[gloss:damage-roll:D]**.",
      "Signum Array": "В вашей фазе стрельбы вы можете выбрать один **[gloss:visible:видимый]** вражеский юнит в пределах 18\" от этого юнита. Тот вражеский юнит не может иметь **[gloss:benefit-of-cover:преимущество укрытия]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Artificer Grav-gun; 1 Hand of Defiance.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "typhon": {
    "flavor": "До создания Typhon осадная пушка «Дредхаммер» применялась лишь на стационарных сверхтяжёлых орудиях, стиравших города в пыль. Установка этого могучего оружия на танк породила подвижный и тяжелобронированный разрушитель крепостей, которому нет равных среди прочих реликвий в арсеналах космодесанта.",
    "abilities": {
      "Sunderer of Fortresses": "Дальнобойные атаки этого юнита, которые:\n▪ Нацелены на юнит VEHICLE, имеют +1 **[gloss:strength:S]** и **[gloss:damage-roll:D]**.\n▪ Нацелены на юнит FORTIFICATION, имеют +2 **S** и **D**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 1 Dreadhammer Siege Cannon.",
    "options": [
      "Эту модель можно снабдить одним из следующего: 2 Heavy Bolters, 2 Lascannons",
      "Эту модель можно снабдить одним из следующего: 1 Heavy Bolter, 1 Heavy Flamer, 1 Multi-melta, 1 Storm Bolter"
    ]
  },
  "vanguard-veteran-squad": {
    "abilities": {
      "Vanguard Assault": "Если этот юнит совершил **[gloss:charge-move:манёвр нападения]** в этот ход, атаки ближнего боя этого юнита имеют [LETHAL HITS]."
    },
    "wargearAbilities": {
      "Storm Shield": "Эта модель имеет 4+ **[gloss:invulnerable-save:InSv]**."
    },
    "loadout": "**Каждая модель вооружена:** 1 Bolt Pistol; 1 Heirloom Weapon.",
    "options": [
      "Любому числу моделей можно заменить их Bolt Pistol на 1 Storm Shield",
      "Любому числу моделей можно заменить их Bolt Pistol на одно из следующего: 1 Grav-pistol, 1 Hand Flamer, 1 Inferno Pistol, 1 Plasma Pistol"
    ]
  },
  "vanguard-veteran-squad-with-jump-packs": {
    "flavor": "На поле боя Vanguard Veteran Squad с jump pack — непревзойдённые войска быстрого реагирования и тараны линий. С огромными шлейфами огня за спиной они прибывают в идеальное время и место, чтобы обеспечить решительность штурма или наглухо сломить вражеский прорыв.",
    "abilities": {
      "Vanguard Assault": "Если этот юнит совершил **[gloss:charge-move:манёвр нападения]** в этот ход, атаки ближнего боя этого юнита имеют +1 **[gloss:attack-dice:A]**."
    },
    "wargearAbilities": {
      "Combat Shield": "Эта модель имеет 5+ **[gloss:invulnerable-save:InSv]**."
    },
    "loadout": "**Модель Vanguard Veteran Sergeant with Jump Pack вооружена:** 1 Heavy Bolt Pistol; 1 Relic Blade.\n**Каждая модель Vanguard Veteran with Jump Pack вооружена:** 1 Heavy Bolt Pistol; 1 Master-crafted Power Weapon.",
    "options": [
      "Vanguard Veteran Sergeant with Jump Pack можно заменить его Relic Blade на одно из следующего:\n▪ 1 Power Fist\n▪ 1 Thunder Hammer",
      "Vanguard Veteran Sergeant with Jump Pack можно заменить его Heavy Bolt Pistol на 1 Plasma Pistol.",
      "Всем моделям этого юнита можно заменить их Heavy Bolt Pistol на 1 Combat Shield.",
      "За каждые 5 моделей в этом юните до 2 моделей Vanguard Veteran with Jump Pack можно заменить их Heavy Bolt Pistol на 1 Plasma Pistol."
    ]
  },
  "venerable-dreadnought": {
    "abilities": {
      "Wisdom of the Ancients": "Пока дружественный юнит ADEPTUS ASTARTES INFANTRY находится в пределах 6\" от этого юнита, атаки этого юнита могут перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Feet; 1 Assault Cannon; 1 Dreadnought Fist; 1 Storm Bolter.",
    "options": [
      "Dreadnought Fist и Storm Bolter этой модели можно заменить на одно из следующего: 1 Heavy Flamer и 1 Dreadnought Fist, 1 Missile Launcher, 1 Twin Autocannon",
      "assault cannon этой модели можно заменить на одно из следующего:\n▪ 1 helfrost cannon\n▪ 1 multi-melta",
      "Assault Cannon этой модели можно заменить на одно из следующего: 1 Dreadnought Inferno Cannon, 1 Heavy Plasma Cannon, 1 Multi-melta, 1 Twin Autocannon, 1 Twin Heavy Bolter, 1 Twin Heavy Flamer, 1 Twin Lascannon",
      "storm bolter этой модели можно заменить на 1 heavy flamer.",
      "assault cannon, storm bolter и Dreadnought combat weapon этой модели можно заменить на одно из следующего:\n▪ 1 Fenrisian great axe, 1 blizzard shield и 1 storm bolter\n▪ 1 Fenrisian great axe, 1 blizzard shield и 1 heavy flamer"
    ]
  },
  "victrix-honour-guard": {
    "flavor": "Состоящая из ветеранов Первой роты, что являют выверенное государственное искусство и непревзойдённое владение оружием, Victrix Honour Guard служат телохранителями старших офицеров Ордена. Избранные за самоотверженность в бою, воины Victrix Honour Guard с радостью отдадут жизни, защищая своих подопечных.",
    "abilities": {
      "Glory of Ultramar": "В фазе стрельбы вашего оппонента, когда вражеский юнит отстрелялся, если модель этого юнита была **[gloss:destroyed:уничтожена]** этими атаками, этот юнит может совершить **[gloss:surge-move:стремительный манёвр]** до D6\".",
      "Honour Guard of Macragge": "Атаки по этому юниту имеют -1 к **[gloss:wound-roll:броскам на ранение]**."
    },
    "wargearAbilities": {
      "Banner of Macragge": "▪ В конце вашей фазы движения, если этот юнит контролирует **[gloss:objective:цель]**, эта **цель** становится **[gloss:secured-objective:закреплённой]**.\n▪ (Один раз за битву, на армию) Когда этот юнит **[gloss:selected-to-fight:выбран для боя]**, вы можете использовать эту способность. Если вы это делаете, атаки ближнего боя этого юнита имеют +1 **[gloss:attack-dice:A]** и **[gloss:strength:S]**."
    },
    "loadout": "**Модель Chapter Ancient вооружена:** Banner of Macragge; 1 Master-crafted Bolt Carbine; 1 Master-crafted Power Weapon.\n**Модель Chapter Champion вооружена:** 1 Blades of Honour.\n**Каждая модель Victrix Honour Guard вооружена:** 1 Master-crafted Bolt Carbine; 1 Master-crafted Power Weapon."
  },
  "vindicator": {
    "flavor": "Vindicator — специализированный осадный танк. Он способен смести препятствия своим массивным щитом, вкатываясь на идеальную огневую позицию, чтобы пустить в ход demolisher cannon — оружие столь разрушительное, что оно с ужасающей лёгкостью разносит вражеские укрепления, уничтожает колонны пехоты и разбивает бронированные танки.",
    "abilities": {
      "Siege Shield": "В вашей фазе стрельбы, когда этот юнит **[gloss:selected-to-shoot:выбран для стрельбы]** с использованием **[gloss:close-quarters:ближней стрельбы]**:\n▪ Атаки этого юнита по юниту, находящемуся **[gloss:engaged:в ближнем бою]** с этим юнитом, могут игнорировать модификаторы к:\n▪ **[gloss:ballistic-skill:BS]**.\n▪ **[gloss:hit-roll:Броскам на попадание]**.\n▪ Для каждого оружия [BLAST] этого юнита вы можете решить, что это оружие не имеет [BLAST]:\n▪ Если вы это делаете, это оружие может нацеливаться только на вражеский юнит, который не **в ближнем бою** с другим дружественным юнитом."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 1 Demolisher Cannon.",
    "options": [
      "Эту модель можно снабдить 1 Hunter-killer Missile",
      "Эту модель можно снабдить 1 Storm Bolter"
    ]
  },
  "vulkan-hestan": {
    "aliasesRu": [
      "Хестан",
      "Вулкан Хестан"
    ],
    "flavor": "Вступая в бой с оружием своего примарха в руках, Forgefather повергает всех, кто ему противостоит. Искатель утраченных реликвий Вулкана, Хестан неустанен в своих поисках, готов пробиться сквозь любого врага и встретить любую опасность, лишь бы исполнить свои клятвы.",
    "abilities": {
      "Seeker of the Unfound": "Когда эта модель впервые выставляется на поле боя, выберите одну цель на поле боя. Пока эта модель находится в радиусе действия этой **[gloss:objective:цели]**, эта модель имеет:\n▪ 10 **[gloss:objective-control:OC]**.\n▪ 5+ **[gloss:leadership:Ld]**.\n▪ [core:Feel No Pain 4+].",
      "Forgefather": "В вашей фазе стрельбы выберите один **[gloss:visible:видимый]** вражеский юнит в пределах 24\" от этой модели. Атаки [MELTA]/[TORRENT] дружественных юнитов ADEPTUS ASTARTES по тому вражескому юниту имеют +2 **[gloss:strength:S]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Bolt Pistol; 1 Gauntlet of the Forge; 1 Spear of Vulkan.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "wardens-of-ultramar": {
    "flavor": "Хотя обычно они рассеяны по командным звеньям армий капитана Тита, его ближайшие советники и соратники, когда того требует обстановка, сражаются бок о бок как одно целое. В такие мгновения они сплавляют трансчеловеческую мощь, вдохновляющее величие, боевое мастерство, псионическую силу и чистую хитрость в могучий сплав, что больше суммы своих частей.",
    "abilities": {
      "Raise the Banner": "В конце вашей фазы движения, если этот юнит контролирует **[gloss:objective:цель]**, эта **цель** становится **[gloss:secured-objective:закреплённой]**.",
      "Strategium Command": "Когда оба игрока развернули свои армии, вы можете переразвернуть до трёх дружественных юнитов ADEPTUS ASTARTES. При этом вы можете поместить эти юниты в **[gloss:strategic-reserves:стратегические резервы]**, независимо от того, сколько юнитов уже находится в **стратегических резервах**."
    },
    "loadout": "**Модель Aemelia Minervas вооружена:** 1 Archeotech Laspistol; 1 Power Weapon.\n**Модель Ancient Gadriel вооружена:** 1 Bolt Rifle; 1 Ceramite Fists.\n**Модель Dainal Kornelius вооружена:** 1 Astropathic Blast; 1 Force Stave.\n**Модель Gaius Silva вооружена:** 1 Archeotech Laspistol; 1 Power Weapon.\n**Модель Lucia Vestha вооружена:** 1 Archeotech Laspistol; 1 Ultramarian Combat Weapons.\n**Модель Veteran Sergeant Metaurus вооружена:** 1 Heavy Bolt Pistol; 1 Master-crafted Power Weapon.",
    "leader": {
      "text": "Эту модель можно присоединить к следующим юнитам:"
    }
  },
  "whirlwind": {
    "flavor": "Град ракет насыщает землю всякий раз, когда бьёт Whirlwind, создавая ковёр взрывов, что швыряет во все стороны смертоносную шрапнель или обжигающее пламя. Whirlwind ведёт огонь со скрытых позиций в поддержку атак космодесанта, используя свою скорость, чтобы поспевать за штурмом.",
    "abilities": {
      "Punishing Bombardment": "В вашей фазе стрельбы, когда этот юнит отстрелялся, выберите один вражеский юнит INFANTRY, поражённый атаками Whirlwind Vengeance Launcher. Тот вражеский юнит совершает **[gloss:battle-shock-test:бросок на боевой шок]**."
    },
    "loadout": "**Эта модель вооружена:** 1 Armoured Tracks; 1 Whirlwind Vengeance Launcher.",
    "options": [
      "Эту модель можно снабдить 1 Storm Bolter",
      "Эту модель можно снабдить 1 Hunter-killer Missile"
    ]
  }
}

export const abilityNamesRu = {
  "Aggressive Reconnaissance": "Агрессивная разведка",
  "Angel’s Wrath": "Гнев ангела",
  "Annihilator Protocols": "Протоколы аннигилятора",
  "Aquilon Optics": "Оптика «Аквилон»",
  "Atomantic Arc-reactor": "Атомантический дуговой реактор",
  "Ballistus Strike": "Удар «Баллистус»",
  "Blackwing Mantle (Once per phase, per army)": "Мантия Чёрного Крыла (раз за фазу, на армию)",
  "Bladeguard (Once per turn, per unit)": "Стражи клинка (раз за ход, на юнит)",
  "Bolter Discipline": "Болтерная дисциплина",
  "Brutalis Charge (Once per phase, per unit)": "Натиск «Бруталиса» (раз за фазу, на юнит)",
  "Calgar’s Champion": "Чемпион Калгара",
  "Captain of the Honour Guard": "Капитан Почётной стражи",
  "Catechism of Fire": "Катехизис огня",
  "Centurion Assault Launcher": "Штурмовой пусковой «Центурион»",
  "Ceramite Cover": "Керамитовое укрытие",
  "Cerebrex Logic Engine": "Логический движок «Церебрекс»",
  "Chameleoline Cloaks": "Хамелеолиновые плащи",
  "Chief Librarian (psyker level 3)": "Главный библиарий (псайкерский уровень 3)",
  "Close-quarters Firestorm": "Огненный шторм вплотную",
  "Cold and Calculating": "Холодный расчёт",
  "Command Squad": "Командный отряд",
  "Decimator Protocols": "Протоколы децимации",
  "Deeds of Legend": "Легендарные деяния",
  "Defensive Array (Once per phase, per unit)": "Оборонительный комплекс (раз за фазу, на юнит)",
  "Deployment Complete": "Развёртывание завершено",
  "Divinator-class Auspexes (Once per phase, per unit)": "Ауспексы класса «Дивинатор» (раз за фазу, на юнит)",
  "Driven from Cover": "Выкуренные из укрытия",
  "Drop Pod Assault": "Штурм капсулой высадки",
  "Exhortation of Rage": "Воззвание ярости",
  "Finest Hour (Once per battle, per unit)": "Звёздный час (раз за битву, на юнит)",
  "Fortification": "Укрепление",
  "Forward Assault Warsuit": "Боевой доспех передового штурма",
  "Hammer of Wrath": "Молот гнева",
  "Haywire Mine (Once per battle, per unit)": "Мина-глушилка (раз за битву, на юнит)",
  "Helix Gauntlet": "Перчатка «Геликс»",
  "Honour of the Company": "Честь роты",
  "Honour of Ultramar": "Честь Ультрамара",
  "Honour or Death": "Честь или смерть",
  "Hood of Hellfire (Psychic)": "Капюшон адского пламени (псайкерская)",
  "Icon of Obstinacy": "Икона упорства",
  "Into the Fray": "В гущу боя",
  "Iron Father": "Железный отец",
  "Knight Champion of Macragge (Once per phase, per army)": "Рыцарь-чемпион Макрагга (раз за фазу, на армию)",
  "Litany of Hate": "Литания ненависти",
  "Lord of the Pyroclasts": "Владыка пирокластов",
  "Master of Shadows": "Мастер теней",
  "Master of the Forge": "Мастер кузни",
  "Meteoric Descent": "Метеорный спуск",
  "Narthecium": "Нартециум",
  "Never Shall the Standard Fall": "Знамя не падёт",
  "Omni-scramblers": "Омни-глушители",
  "Orbital Comms Array": "Орбитальный массив связи",
  "Overlapping Destruction": "Перекрёстное уничтожение",
  "Parabolic Jetleap": "Параболический прыжок",
  "Press the Attack": "Дави атаку",
  "Priority Target Acquisition": "Захват приоритетной цели",
  "Raise the Banner": "Поднять знамя",
  "Rampart (Once per battle, per army)": "Бастион (раз за битву, на армию)",
  "Rapid Disembarkation": "Стремительная высадка",
  "Reaping Tally": "Жатва",
  "Refuse to Yield": "Не уступать",
  "Relic Shield": "Реликтовый щит",
  "Righteous Fury (Once per battle, per army)": "Праведная ярость (раз за битву, на армию)",
  "Rites of Tempering": "Обряды закалки",
  "Rites of Thermal Appeasement": "Обряды теплового умиротворения",
  "Sentinel Protocols (Once per phase, per unit)": "Протоколы часового (раз за фазу, на юнит)",
  "Shield Dome": "Купол-щит",
  "Special-issue Optics and Ammunition": "Спецоптика и спецбоеприпасы",
  "Spiritual Leader (Once per battle round, per unit)": "Духовный наставник (раз за раунд боя, на юнит)",
  "Strategic Acumen": "Стратегическая проницательность",
  "Suppression Fire": "Подавляющий огонь",
  "Tactical Fluidity (Once per battle round, per unit)": "Тактическая гибкость (раз за раунд боя, на юнит)",
  "Tactical Mainstay": "Тактическая опора",
  "Targeted Intercession": "Прицельное вмешательство",
  "Targeter Optics": "Оптика наводчика",
  "Tempormortis": "Темпормортис",
  "Titan-killer": "Убийца титанов",
  "Total Obliteration": "Полное уничтожение",
  "Unstoppable Valour": "Неудержимая доблесть",
  "Unto the Anvil": "На наковальню",
  "Unyielding in the Face of the Foe": "Непоколебимы перед врагом",
  "Veteran Bodyguard": "Ветеран-телохранитель",
  "Vivispectral Analysis Targeting": "Вивиспектральное наведение",
  "Wisdom of the Ancients": "Мудрость древних",
  "Zealous Fortitude": "Ревностная стойкость",
  "Aerial Assault": "Воздушный штурм",
  "Annihilator": "Аннигилятор",
  "Armoured Resilience": "Бронированная стойкость",
  "Armoured Spearhead": "Бронированный наконечник",
  "Assault Ramp": "Штурмовая аппарель",
  "Author of the Codex": "Автор Кодекса",
  "Banner of Macragge": "Штандарт Макрагга",
  "Blessings of the Omnissiah": "Благословения Омниссии",
  "Codex Adept": "Знаток Кодекса",
  "Combat Embarkation": "Боевая погрузка",
  "Combat Shield": "Боевой щит",
  "Demi-company Commander (Once per turn, per unit)": "Командир полуроты (раз за ход, на юнит)",
  "Destructor": "Разрушитель",
  "Duty Eternal": "Вечный долг",
  "Echo of the Ravenspire": "Эхо Вороньего шпиля",
  "Evade and Survive (Once per phase, per unit)": "Уклонись и выживи (раз за фазу, на юнит)",
  "Executioner": "Палач",
  "Fearsome Assault": "Устрашающий штурм",
  "Fire Support": "Огневая поддержка",
  "Fire Supprt": "Огневая поддержка",
  "Flexible Asset": "Гибкий ресурс",
  "For the Khan!": "За Хана!",
  "Force Dome (psychic level 1)": "Силовой купол (псайкерский уровень 1)",
  "Forgefather": "Отец кузни",
  "Full-throttle Assault": "Штурм на полном газу",
  "Fury of the First": "Ярость Первой роты",
  "Fury of the Machine Spirit": "Ярость духа машины",
  "Glory of Ultramar": "Слава Ультрамара",
  "Grapnel Launchers": "Пусковые крюки-кошки",
  "Grav-chutes": "Грав-парашюты",
  "Hailstrike": "Град-удар",
  "Hammerstrike": "Молот-удар",
  "Honour Guard of Macragge": "Почётная гвардия Макрагга",
  "Interceptor": "Перехватчик",
  "Inviolable Transport": "Неприкосновенный транспорт",
  "Leader of Astartes": "Вождь Астартес",
  "Librarian (psyker level 1)": "Библиарий (псайкерский уровень 1)",
  "Line-breaker": "Таранщик линий",
  "Master Tactician": "Мастер-тактик",
  "Might of Heroes (psychic level 1)": "Мощь героев (псайкерский уровень 1)",
  "Outflank": "Обход с фланга",
  "Power of the Machine Spirit": "Мощь духа машины",
  "Powerful Volley": "Мощный залп",
  "Primarch of the XIII (Aura)": "Примарх XIII (Аура)",
  "Priority Target Identified (Once per battle, per unit)": "Приоритетная цель опознана (раз за битву, на юнит)",
  "Psychic Hood (Psychic)": "Психический капюшон (Психика)",
  "Punishing Bombardment": "Карающая бомбардировка",
  "Purgation Run": "Зачистка",
  "Rites of Battle": "Обряды битвы",
  "Seeker of the Unfound": "Искатель ненайденного",
  "Self-repair": "Саморемонт",
  "Sentry Programming (Once per phase, per unit)": "Программа часового (раз за фазу, на юнит)",
  "Shattered Defences": "Сокрушённая оборона",
  "Shrouding (psychic level 1)": "Сокрытие (псайкерский уровень 1)",
  "Siege Captain": "Осадный капитан",
  "Siege Shield": "Осадный щит",
  "Signum Array": "Массив «Сигнум»",
  "Skilled Riders": "Умелые наездники",
  "Soul Sight (psychic level 1)": "Зрение души (псайкерский уровень 1)",
  "Spear of Chogoris": "Копьё Чогориса",
  "Storm Shield": "Штормовой щит",
  "Strafing Run": "Штурмовой заход",
  "Strategium Command": "Командование стратегиума",
  "Sunderer of Fortresses": "Сокрушитель крепостей",
  "Tactical Precision": "Тактическая точность",
  "Teleport Homer (Once per battle, per unit)": "Телепорт-маяк (раз за битву, на юнит)",
  "Terminatus Assault": "Штурм «Терминатус»",
  "Termite Assault": "Штурм «Термита»",
  "Terror Troops (Aura)": "Войска ужаса (Аура)",
  "Thunderhawk Cluster Bombs": "Кассетные бомбы «Тандерхок»",
  "Thunderhawk Insertion": "Высадка с «Тандерхока»",
  "Thunderous Force (psychic level 1)": "Громовая сила (псайкерский уровень 1)",
  "Thunderstrike": "Громовой удар",
  "Trifold Path of Shadow": "Тройственный путь тени",
  "Trophy Taker": "Взятие трофея",
  "Vanguard Assault": "Штурм «Вангард»",
  "Veil of Time (psychic level 1)": "Завеса времени (псайкерский уровень 1)",
  "Veiling Smoke (Once per phase, per unit)": "Завеса дыма (раз за фазу, на юнит)",
  "Veteran Marksmen": "Стрелки-ветераны",
  "Wrath of the Machine Spirit": "Гнев духа машины"
}

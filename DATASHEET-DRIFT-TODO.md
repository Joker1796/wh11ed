# Datasheet drift reconciliation — хендофф между машинами

**Ветка:** `feat/datasheet-drift-fixes` (запушена в origin, PR **не открыт** — не открывать
самостоятельно, копить коммиты дальше). Каждая фракция = отдельный коммит в эту же ветку.

## Рабочий контракт (менять нельзя без явного слова пользователя)

- Разбирать фракции **по одной за раз**.
- После каждой фракции — **стоп**, ждать явное "ещё одну (любую) фракцию" от пользователя,
  прежде чем брать следующую. Не додумывать это как разрешение на несколько подряд.
- Каждый коммит — только явный дрейф (реальные баги vs [[wh40k-appdata]]), **очки не трогать**
  (они из MFM, отдельный источник, вне скоупа).
- Workflow на файл: структурная сверка `node scripts/sync-appdata.mjs <slug>`, текстовая —
  `node scripts/sync-faction-text.mjs <slug>` (оба report-only). Структурный вывод обычно стоит
  пропускать через `grep -v "extra in wh11ed (not in appdata): datasheet \""` — гасит известный
  шум SM-Chapter общего пула (см. ниже).
- **Прежде чем удалять любой кусок текста как "нет в appdata" — проверить `../wh40k-appdata/tables/*.json`
  (полная реляционная БД), не только `../wh40k-appdata/factions/<slug>.json` (плоский экспорт).**
  Плоский JSON НЕ содержит ally-инклюзию, bodyguard/attach-группы и часть keyword-грантов — они
  только в `tables/`. См. урок 13 ниже — это отменяет часть урока 12.
- После фиксов — прогнать оба скрипта повторно (убедиться, что остался только известный шум),
  `npm run build`, закоммитить (`git add -A -- <явные пути>`, не бланково).

## Прогресс (15 фракций закрыты)

✅ leagues-of-votann, dark-angels, blood-angels, deathwatch, genestealer-cults, black-templars,
space-wolves, titan-legions, chaos-knights, emperors-children, drukhari, space-marines,
chaos-space-marines, thousand-sons, death-guard — все закоммичены (см. `git log
feat/datasheet-drift-fixes`). chaos-titan-legions тоже **проверена и чиста** (без коммита —
дрейфа не найдено).

death-guard: структурно был полностью чист (`sync-appdata.mjs` — «no structural differences
found», впервые за всю фракцию). Текстовые находки: (1) **6 Character-датащитов (Biologus
Putrifier, Foul Blightspawn, Icon Bearer, Noxious Blightbringer, Plague Surgeon, Tallyman) не
хватало footer-клаузы** у `leader` — «этой модели можно приделать ещё одного Leader к тому же
Plague Marines/Poxwalkers юниту, даже если другой Leader уже прикреплён» — appdata подтверждает
дословно для всех шести; Lord of Poxes (седьмой Plague Marines-attach) **специально не трогали** —
у него в appdata такой клаузы нет вообще, это не пропуск, а реальное отличие между юнитами; (2)
Shamblerot Vectorium "Numberless Horde & KEYWORDS" — хвост "Poxwalkers gain Battleline" оказался
чистым дублем `conditionalKeywords.json` (`poxwalkers`→Battleline при `shamblerot-vectorium`),
убран целиком (без остатка, в отличие от thousand-sons — здесь никакого другого контента в хвосте
не было); (3) Chaos Predator Destructor — порядок опций в списке заменён на appdata (`2
lascannons` перед `2 heavy bolters`), чисто косметика, EN+RU; (4) Daemon Prince of Nurgle
composition — "1 Daemon Prince of Nurgle" → "1 Death Guard Daemon Prince" (совпадает с appdata;
у "with Wings"-варианта такого расхождения нет — это, похоже, реальная особенность конкретно
безкрылого датащита, а не опечатка appdata); (5) "Myphitic Blight-hulers" → "Myphitic
Blight-haulers" (опечатка в `composition`, сам датащит уже называется правильно). Проверено и НЕ
тронуто: Tallyband Summoners ally-допуск Plague Legions 500/1000/1500 — подтверждён через
`allied_faction_points_limit` (урок 13); Nurgle's Gift (Aura) — смёрженная карта Pact of Decay
(урок 10) + `accordion`-подписи трёх Plague (Skullsquirm Blight/Rattlejoint Ague/Scabrous
Soulrot); Mortarion's Hammer/Miasmic Bombardment — таблица `type:'image'` (урок 3); Helbrute
wargear options — весь контент уже на месте, просто appdata хранит список+сноску одной строкой
против нескольких элементов `options[]` у wh11ed (тот же класс шума, что Devastator/Sternguard
Squad у space-marines).

thousand-sons: небольшой список. Реальные находки: (1) Defiler `core` содержал лишний
"Feel No Pain 6+" — appdata его не подтверждает нигде среди способностей, убран; (2) Kairos
Fateweaver "Infernal Gateway – focused witchfire" A `D6+6`→`D3+6`; (3) Lord of Change `damaged` —
внутреннее рассогласование: `note` уже верно говорил "1-7 wounds remaining", а `text` внутри
ошибочно писал "1-6" (appdata подтверждает W18/1-7); (4) "heliforged weapons" → "hellforged
weapons" (опечатка в loadout Daemon Prince/Daemon Prince with Wings — собственный профиль оружия
в датащите уже назывался правильно, "Hellforged weapons"), EN+RU; (5) Warpmeld Pact detachment
rule "Warpmeld Sacrifice & KEYWORDS" — смешанный хвостовой блок (урок 8б, как Houndpack Lance):
"Tzaangors gain Battleline" — чистый дубль `conditionalKeywords.json` (`tzaangors`→Battleline при
`warpmeld-pact`), убран; но "+1 OC пока не Battle-shocked" и "detachment has MUTANT tag" — не
дублируются нигде, оставлены (переформулировал первую фразу, чтобы не терять антецедент "such a
unit" после вырезки). Проверено и НЕ тронуто (уже верно): Changehost of Deceit ally-допуск
Scintillating Legions 500/1000/1500 — подтверждён через `allied_faction_points_limit` (урок 13);
Warpmeld Pact enhancement "Bray Lord" attach к Tzaangors — подтверждён через
`enhancement_bodyguard_group`/`_datasheet` (урок 13); Cabal of Sorcerers — смёрженная карта
Pact of Sorcery (урок 10) + `accordion`-подписи ритуалов, Warp Charge номиналы (5/6/7/9) в самой
appdata нигде не найдены (ни в тексте, ни в `tables/`) — оставлены как есть, без них способность
нефункциональна, это похоже на пропуск при экстракции значка/бэйджа с карты, а не дрейф wh11ed.

chaos-space-marines (appdata source: `heretic-astartes.json`): небольшой, но разнообразный
список. Реальные находки: (1) Chaos Lord "Astartes chainblade" → "Astartes chainsword"
(изолированная опечатка, ничего похожего больше в файле нет); (2) Cultist Firebrand Close combat
weapon AP `-1`→`0` (обычный generic-профиль); (3) **Red Corsairs Raiders/Reave-Captain — базы
были перепутаны местами** (32mm/40mm свап — Raiders должны быть 32mm рядовой пехотой,
Reave-Captain 40mm персонажем, было наоборот); (4) Masters of the Maelstrom — тот же паттерн, что
Wardens of Ultramar у space-marines: `specialAbilities`-прозой вместо структурного `"leader"`
(text/units/footer) + отсутствовал `"core": "Support"`; appdata `rules[0].rules` даёт полный и
рабочий список из 3 юнитов (Chosen/Legionaries/Red Corsairs Raiders) — тут, в отличие от Wardens,
структурный `leaderOf` тоже оказался полным, но он подтверждает то же самое; (5) Chaos Cult
"Desperate Devotion & KEYWORDS" — хвостовой блок KEYWORDS оказался чистым дублем
`conditionalKeywords.json` (`traitor-guardsmen-squad`→Battleline при chaos-cult) — убран по
прецеденту урока 8(a); (6) Chaos Lord with Jump Pack composition — потерялось "with Jump Pack" в
названии модели; (7) Huron Blackheart loadout — лишний двойной пробел (косметика). Один
attach-clause (Murdertalon Raiders "Pact of Cursed Pinions" → Warp Talons) заново подтверждён
через `enhancement_bodyguard_group`/`_datasheet` по методике урока 13, трогать не стали. Одна
находка осталась НЕ проверена до конца и оставлена как есть: Pactbound Zealots "Marks of Chaos"
несёт ограничительный хвост (нельзя Khorne-психайкеру, attach/embark только при совпадении
keyword) — не нашёлся ни в плоском JSON, ни в `tables/` (`allegiance_ability`/`_group` не содержат
такого ограничения), но и явных признаков, что это придумано, а не настоящее правило, тоже нет —
решили не удалять непроверенное, при случае можно сверить со свежим Faction Pack (урок 14).
Остальной большой список "differs" из обоих sync-скриптов — знакомые классы шума: merged-профили
(Dark Commune "OTHER MODELS", Masters of the Maelstrom 2 строки), несколько appdata-карт,
слитых в одно поле wh11ed (Cults of the Dark Gods+Dark Pacts; Slaves to None+Vendetta+Twisted
Doctrine), `type:'image'`-таблицы, пересказанные текстом (Masters of Misdirection, Warp Portals),
`loreAccordion`-подписи внутри правила (Tyrannical Motivation) и списки+сноска, которые appdata
хранит одной строкой, а wh11ed — несколькими элементами `options[]` (Legionaries, Raptors — весь
контент на месте, сверено построчно).

space-marines (appdata source: `adeptus-astartes.json`, самая большая фракция — 13k строк):
находок много, самая заметная — **Land Speeder был полностью переиздан** (новый профиль
T8/W9/OC3 вместо T7/W6/OC2, новая штатная тройка оружия — multi-melta + onslaught gatling
cannon + stormfury missile launcher вместо heavy bolter/multi-melta на выбор), источник —
appdata `publicationId` = Codex: Space Marines с `errataDate: 22 July 2026` (буквально на этой
неделе), т.е. это реальный, очень свежий рулбук-апдейт, а не шум. Кроме этого: несколько точечных
стат-дрейфов (Assault Intercessors WJP Power weapon A/WS, Captain Titus/Lieutenant Bolt(-crafted)
pistol BS, Sternguard chainsword/power weapon/power fist A/WS, Company Heroes Bolt rifle
ASSAULT+HEAVY тег, Eradicator Bolt pistol PISTOL вместо CLOSE-QUARTERS), несколько мусорных
записей (Devastator Squad лишний нигде не используемый "Storm bolter", Drop Pod пустышка-оружие
с пустым именем, Hellblaster Squad задвоенная "Designer's Note" как отдельная способность) и один
структурный пробел — **Wardens of Ultramar** оформлен как `specialAbilities`-прозой вместо
стандартного структурного поля `"leader": {text, units, footer}` (как у всех остальных
Leader/Support юнитов файла); appdata подтверждает через `rules[0].rules` полный список из 6
юнитов (Assault Intercessor/Assault/Bladeguard Veteran/Intercessor/Sternguard Veteran/Vanguard
Veteran Squad) — структурное поле `leaderOf` в appdata само по себе неполное/битое (только 3 из
6, четвёртая запись вообще пустая) — доверились прозе appdata как более полной, не структурному
полю (обратный случай урока 1 — здесь сломана именно структура, не проза). Vanguard Veteran Squad
WJP донабрал недостающий вариант замены (Heavy Bolt Pistol + Master-crafted Power Weapon на
sergeant, плюс plasma pistol за каждые 5 моделей) — вообще отсутствовал в wh11ed. **Отдельно
нашёлся крупный пробел в армейском правиле Oath of Moment**: смёрженная карта appdata "Space
Marine Chapters" оказалась вдвое длиннее, чем то, что было в wh11ed — не хватало ограничений по
чаптерам (Black Templars запрет ADEPTUS ASTARTES PSYKER + список техники без чаптер-кийворда;
Space Wolves запрет на Apothecary/Devastator/Tactical Squad; весь блок Deathwatch — mono-chapter
запрет + список исключённых юнитов, включая Legends через "see Legends: Agents of the Imperium"
прозой, без завода отдельного датащита — см. урок 15). Дописано полностью. Множество "differs"
из sync-скриптов оказались известным шумом: очки (MFM, вне скоупа), naming-варианты аппдаты
(dual blade/blades-типа Chain-flails/Close-combat weapon, Master-crafted bolter/bolt rifle
внутри одного и того же датащита — структурное поле говорит "bolter", проза "bolt rifle": верим
структуре), merged-профили (Wardens of Ultramar 6 избранных → 2 строки статов, все числа
совпадают) и списки-с-сноской, которые appdata хранит одной строкой, а wh11ed — несколькими
элементами массива `options[]` (Devastator/Sternguard/Tactical/Terminator Squad — весь контент
на месте, просто по-другому разбит на элементы, сверено вручную построчно).

drukhari: реальных находок 5 — (1) Voidraven Bomber «Voidraven missiles – shatterfield missiles»
AP `-2`→`-1` (Razorwing использует одноимённое, но отдельное оружие с другим AP — не спутать);
(2) Incubi «Demiklaives – dual blades» лишний тег `TWIN-LINKED`, которого нет ни в appdata, ни у
аналогичного оружия Drazhar; (3) Archon «Shadowfield» — текст был по смыслу устаревшим
(привязан к провалу конкретно INV-спаса) вместо appdata-формулировки (привязан к потере раны,
шире по охвату — `не может перебрасывать save rolls`/`теряет InSv при потере раны, не считая
mortal wounds`), обновлён EN+RU; (4) Scourges with Shardcarbines loadout — «The Solarite is
equipped with» исправлено на «Every model is equipped with» (весь юнит, не только Solarite),
EN+RU; (5) армейское правило Power From Pain — параграф Designer's Note был не на своём месте
(после «Empowered Through Pain» вместо после «Pain Abilities», как в appdata) — переставлен.
Плюс мелкий naming-фикс `wg:wracks:torturer's tool` (appdata — единственное число, что заодно
чинит sourceId-маппинг этого оружия, ранее вообще не матчившегося; `gen-source-ids.mjs`
перезапущен, заодно подтянул несколько несвязанных давно ожидавших матчей у других фракций).
Осталось необъяснённых ложных срабатываний немало (naming: dual blade/blades, neurotoxin/
necrotoxin, Chain-flails/Chain flails — везде это, похоже, опечатка/непоследовательность самой
appdata, а не дрейф wh11ed, см. урок 2; core/faction comma-join — известный формат-шум) — не
трогать, см. диагностику в коммите.

emperors-children: почти весь репортed diff оказался известным шумом (merged-armyRule/merged-
detachment-rule `###`-паттерн ×2 — оба куска подтверждены как отдельные карточки внутри самого
appdata JSON, не выдумка; image-table пересказ текстом — тоже подтверждён appdata `type:'image'`
блоком на том же месте). Единственный реальный баг — сломанное форматирование "Pledges to the Dark
Prince" (слипшийся `**PACT POINTSBONUS1+**...` без переносов строк и без буллетов), переформатировано
в `▪ **N+:** текст`. Три куска текста без видимого подтверждения в плоском `factions/<slug>.json`
(Legions of Excess ally-допуск в "Daemonic Empowerment", attach-фраза в "Exalted Patron", Fulgrim
"Serpentine" ability) сначала были ошибочно удалены (решили, что раз appdata молчит — это дрейф),
но 2 из 3 оказались **подтверждены глубже, в `tables/` реляционной БД** (см. урок 13) и возвращены
обратно; только Fulgrim "Serpentine" реально нигде не найден и остался удалён.

**Остались 19 фракций.** Разбиты на две группы, порядок между группами уточнён 2026-07-27
(переиграно в тот же день — сначала SM-семья, потом остальное по убыванию объёма):

**Группа A — «SM-семья» (общий Adeptus/Heretic Astartes датащит-пул, много общих юнитов и
паттернов с уже закрытыми SM-Chapter фракциями) — разбирать ПЕРВОЙ, по одной, от большей к
меньшей:** ~~space-marines (13109)~~, ~~chaos-space-marines (7116)~~, ~~thousand-sons (4062)~~,
~~death-guard (4039)~~ **все четыре закрыты**, next → grey-knights (3467), world-eaters (3407).

**Группа B — остальные, разбирать ПОСЛЕ группы A, по одной, от большей к меньшей:**
astra-militarum (10999), aeldari (8838), orks (6507), tau-empire (5213), chaos-daemons (5205),
necrons (4833), tyranids (4508), adepta-sororitas (4478), imperial-agents (4220),
adeptus-mechanicus (3865), imperial-knights (3287), adeptus-custodes (3244).
drukhari (2973) уже закрыта (взята 2026-07-27 до переигрывания порядка, добита по факту —
см. прогресс выше) — из группы B вычеркнута. **Следующей фракцией по плану берём space-marines
из группы A.**

## Ключевые уроки инструмента (не переоткрывать как новый баг)

Полный разбор — в памяти `datasheet-full-sync` на первой машине (не синхронизируется между
машинами), но вот сжатый список, чтобы не тратить время заново:

1. **appdata сама себе противоречит**: если структурное поле (`wargear[].name`, `keywords`,
   `leaderOf`) расходится с прозой того же датащита (`unitComposition`/`wargearRules`) — верить
   структурному полю, проза бывает опечатана.
2. **appdata содержит реальные OCR/тайпо-дефекты** — "Grimaidus", "cenabyte", "Martial
   Examplars", "automically", "af"→"of", удвоенные слова и т.п. Не копировать в wh11ed.
3. **`type:'image'` блоки** в `rules[].body[]` — таблицы/графика из книги, appdata не оцифровала.
   wh11ed текстом транскрибирует то же самое — не бага, если цифры совпадают по смыслу.
4. **SM-Chapter факции** (black-templars/blood-angels/dark-angels/deathwatch/space-wolves):
   огромный список "extra in wh11ed: datasheet ..." — общий пул `space-marines.js` живёт в
   `adeptus-astartes.json` отдельно от бандла главы, не пропажа. Та же логика для army rule
   Oath of Moment (глава хранит только заглушку-указатель или вообще ничего).
5. **Merged-profile юниты** (одна строка `profiles[]` на несколько одинаковых по статам моделей
   appdata) — при >1 профиле в датащите строгий матчинг по имени ложно не находит статлайн;
   верить сверке чисел вручную, не имени.
6. **Per-profile baseSize check молчит** (не выдаёт диф), если имя профиля wh11ed не матчится
   текстом с строкой в `baseSize` appdata — "чисто" по этому полю не значит реально чисто,
   стоит вручную сверить `node -e` на merged-profile датащитах.
7. **Численные слова vs цифры** ("one"/"5" vs "1"/"five") и **"1 <Name> — EPIC HERO"-префикс** —
   осознанный стиль wh11ed (цифры почти everywhere, "one of the following" — устойчивая идиома,
   471 вхождение против 6 "1 of the following"). Не менять под appdata.
8. **"KEYWORDS"-хвост в теле правила** может быть (а) чистым дублем `conditionalKeywords.json`
   (тогда удалить — прецеденты: Masters of Manoeuvre, The Lost Brethren, Dêlve Assault Shift)
   или (б) смешанным блоком с реальным контентом, которого нет больше нигде в appdata (тогда
   НЕ трогать — прецедент: Houndpack Lance "Marked Prey", тот же класс, что "Restrictions
   вписан в тело правила, раз деть некуда" у Deathwatch). Проверять `conditionalKeywords.json`
   построчно, не удалять блок целиком не глядя.
9. **Restrictions-текст детачмента** может присутствовать у appdata не у ВСЕХ детачментов
   фракции одновременно — проверять конкретный детачмент через `node -e`, не считать общим для
   всей фракции.
10. **Несколько appdata `armyRules[]`/`rules[]`-карточек слиты в одно поле wh11ed** (когда
    appdata печатает 2-3 отдельные карточки, а data-модель wh11ed рассчитана на 1 armyRule/rule
    на фракцию/датащит) — sync ложно кричит "wh11ed adds" на весь хвост после первой карточки.
    Прецеденты: titan-legions/chaos-titan-legions (Towering Example+Titanic Support+Titanicus
    Traitoris), chaos-knights (Harbingers of Dread+Dreadblades+Super-heavy Walker). Сверять
    вручную по exact appdata JSON, не доверять диффу на глаз.
11. **`sourceIds.json`** — стабильный uuid-мост wh11ed↔appdata (`kind: armyrule|det|strat|enh|
    ds|wg`), регенерируется `node scripts/gen-source-ids.mjs`. Не трогать вручную.
12. **`sources/Faction pack 11 ed/*.pdf` — локальные файлы могут быть УСТАРЕВШИМИ версиями.**
    Дословное совпадение с локальным PDF из `sources/` ничего не доказывает про текущие правила —
    сам файл может быть старой редакцией. **appdata — канон** по формулировкам правил (MFM вторичен,
    только очки/DP/disposition). Если нужно свериться с официальным источником напрямую — качать
    СВЕЖИЙ Faction Pack с `warhammer-community.com/en-gb/downloads/warhammer-40000/` (см. урок 14),
    не читать локальный `sources/*.pdf` как истину.
13. **Перед тем как объявить кусок текста "дрейфом, которого нет в appdata" — проверить
    `../wh40k-appdata/tables/*.json` (полная реляционная БД appdata), а не только плоский
    `../wh40k-appdata/factions/<slug>.json`.** Плоский экспорт НЕ включает: ally-инклюзию (кто
    кого может брать союзником и по какому очковому порогу — таблицы `allied_faction`,
    `allied_faction_required_detachment`, `allied_faction_points_limit`,
    `allied_faction_parent_faction_keyword`, `allied_faction_keyword`), enhancement-attach/
    bodyguard-группы (`enhancement_bodyguard_group`, `_datasheet`, `_keyword`), roster-состав
    ограничения по keyword (`restriction_group_detachment_limit` — `minRosterLimit`/
    `maxRosterLimit` привязаны к `keyword_restriction_group`/`keyword_restriction_group_keyword`
    — вот где живёт «армия должна включать 3+ юнита с keyword X»), датащит-исключения
    (`detachment_excluded_datasheet` — «нельзя включать датащиты Y/Z»), и часть keyword-грантов
    сверх того, что уже попало в `conditionalKeywords.json` (`conditional_keyword.json` сам по
    себе полнее, чем то немногое, что генератор `gen-conditional-keywords.mjs` из него выбирает —
    см. его комментарий в CLAUDE.md: он берёт только roster-faction-keyword и detachment-грант,
    пропуская per-unit allegiance-гранты). Общий метод: найти id сущности (`factions/<slug>.json`
    даёт detachment/datasheet/enhancement id), затем грепать `tables/` по этому id как FK
    (`detachmentId`, `enhancementId`, `datasheetId`), резолвить связанные id через
    `keyword.json`/`faction_keyword.json`/`battle_size.json` и т.п. **Не останавливаться на первой
    непустой/пустой таблице** — сущность может быть размазана по нескольким таблицам сразу (см.
    прецедент Houndpack Lance ниже, где я сначала проверил не ту таблицу и решил, что "не
    нашлось").
    **Прецедент (эта же правка, трижды уточнялась в одном коммите):**
    - emperors-children: сначала ошибочно удалил Legions of Excess ally-текст в "Daemonic
      Empowerment" и attach-фразу в "Exalted Patron" как "неподтверждённые" (не нашёл в
      `factions/emperors-children.json`) — оба оказались чётко подтверждены в `tables/`: Legions
      of Excess — через `allied_faction` (id `e94941b5-...`) → `allied_faction_points_limit`
      (500/1000/1500 по `battleSizeId`) → `allied_faction_parent_faction_keyword` →
      `faction_keyword.json` = "Legions of Excess"; Exalted Patron attach — через
      `enhancement_bodyguard_group` (`bodyguardType:'leader'`) → `enhancement_bodyguard_group_datasheet`
      → datasheet id = "Flawless Blades". Оба возвращены. Fulgrim "Serpentine" ability — проверил
      и `datasheet_datasheet_ability` join (все 5 abilities датащита перечислены явно, Serpentine
      среди них нет) — этот кусок остался удалён, реально нигде не найден.
    - chaos-knights "Houndpack Lance" · KEYWORDS-блок (3+ War Dog юнита обязательны, они получают
      Battleline; 3 выбранных получают Character) — Battleline-грант сразу нашёлся через
      `conditional_keyword` (6 строк, `requiredDetachmentId` = Houndpack Lance, `keywordId` =
      "Battleline"). Требование "3+ War Dog" **сначала не нашёл** (проверил только
      `detachment_required_datasheet` — пусто) и чуть не оставил как "частично неподтверждённое";
      при более внимательной проверке нашлась ЕЩЁ одна таблица —
      `restriction_group_detachment_limit` (`minRosterLimit: 3`, `detachmentId` = Houndpack Lance)
      → `keyword_restriction_group` → `keyword_restriction_group_keyword` = "War Dog". Весь блок
      подтверждён appdata полностью, никакого внешнего источника не потребовалось.
    Единственное законное основание оставить контент без явного появления в плоском
    `factions/<slug>.json` — либо corroboration САМИМ appdata (урок 3 — `type:'image'` в том же
    месте; урок 10 — текст под отдельной карточкой того же JSON; этот урок — найдено в `tables/`,
    но проверить НЕСКОЛЬКО кандидатных таблиц, не одну), либо (в крайнем случае, когда appdata
    правда молчит) дословное совпадение с ТОЛЬКО ЧТО скачанным (не локальным!) официальным PDF —
    см. урок 14.
14. **Если контент не находится ни в плоском JSON, ни в `tables/` (после честной попытки — см.
    урок 13) — можно скачать актуальный Faction Pack/Index/Codex PDF прямо с
    `warhammer-community.com`** (ссылки на странице `/en-gb/downloads/warhammer-40000/`, искать
    через WebSearch по `<faction> Faction Pack pdf warhammer-community.com`, скачивать в
    scratchpad через `curl`, читать `pdftotext -layout`) и свериться с ним напрямую. Это НЕ то же
    самое, что урок 12 (там — локальный, потенциально устаревший файл); свежая закачка с
    официального сайта — валидный источник, дополняющий appdata, а не заменяющий его как канон.
    Прецедент: deathwatch "Black Spear Task Force" · Mission Tactics `Restrictions:` блок —
    appdata подтверждает ЧАСТЬ структурно (`detachment_excluded_datasheet` + дублирующая
    `faction_keyword_excluded_datasheet`: 9 исключённых датащитов — 5 резолвятся в
    Tactical/Terminator/Devastator/Scout Squad + Terminator Assault Squad, ещё 4 в
    `agents-of-the-imperium.json` = Watch Master/Watch Captain Artemis/Corvus Blackstar/Deathwatch
    Kill Team, т.е. структурная реализация "нельзя Agents of the Imperium Deathwatch юниты"). **Не
    всё — но не потому, что плохо искал, а потому что появилась КАТЕГОРИАЛЬНАЯ граница
    источника:** оставшиеся ~7 запрещённых юнитов (Assault Squad, Attack Bike Squad, Land Speeder
    Storm, Relic Terminator Squad, Scout Bike Squad, Scout Sniper Squad) — это **Legends**-юниты;
    в схеме есть поле `datasheet.isLegends`, но в сыром `tables/datasheet.json` (1142 записей)
    **оно `false` у ВСЕХ без исключения** — этот срез appdata в принципе не содержит Legends-
    контент ни для одной фракции, значит структурно исключить несуществующий датащит нельзя. Так
    же не нашлось моно-Chapter ограничение — проверил все 16 строк `keyword_restriction_group`
    целиком, ни одна не ссылается на faction_keyword "Deathwatch"; похоже, это неявное правило
    (Army Faction = Deathwatch и так ограничивает выбор датащитов), просто явно проговорённое в
    тексте, а не отдельная запись в БД. **Итог:** для Legends-юнитов и implicit-правил дальше в
    `tables/` копать бессмысленно — это не "ещё одна таблица", категория отсутствует целиком;
    здесь свежескачанный официальный PDF — единственный практичный способ проверки. Текст сверен
    дословно с `eng_08-06_..._faction_pack_deathwatch...pdf`, оставлен без изменений.

15. **На будущее (для обеих машин — эта заметка в репо именно поэтому, не в памяти): appdata может
    ОДНАЖДЫ начать включать Legends-датащиты** (`datasheet.isLegends` в схеме уже существует, сейчас
    просто `false` у всех 1142 записей — источник пока их не трекает, но поле зарезервировано, т.е.
    это вопрос апдейта данных на стороне appdata, не архитектурное ограничение навсегда). Если/когда
    это случится (заметно по `npm run sync`: `sourceIds.json`/структурный дифф внезапно найдёт
    датащиты вроде "Assault Squad"/"Attack Bike Squad"/"Land Speeder Storm" там, где раньше был
    пропуск) — **подтянуть их** так же, как любой другой structural sync находка (проверить datasheet,
    добавить/сверить в `src/data/datasheets/<slug>.js`, обновить `sourceIds.json` через
    `gen-source-ids.mjs`). **До тех пор действует обычная конвенция [[feedback_appdata_canon]]:
    "нет в appdata — нет и у нас"** — не заводить Legends-датащиты как полноценные записи
    самостоятельно (по свежему PDF или личным знаниям того, что называется в тексте restrictions),
    даже если знаем, что юнит существует в правилах GW. Restrictions-текст, ПРОСТО упоминающий
    Legends-юнит по имени (как у Deathwatch выше), можно оставлять как прозу — это не то же самое,
    что заводить сам датащит.

## Что делать дальше

Ждать от пользователя "ещё одну (любую) фракцию", взять следующую из списка выше, повторить
воркфлоу. Когда все 30 фракций закрыты — **удалить этот файл** в финальном коммите (по прецеденту
`DATA-909-TODO.md`), затем спросить пользователя, пушить ли/открывать ли PR.

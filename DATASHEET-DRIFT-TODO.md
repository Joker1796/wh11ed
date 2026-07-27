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

## Прогресс (21 фракция закрыта — группа A ПОЛНОСТЬЮ ЗАКРЫТА, группа B в процессе)

✅ leagues-of-votann, dark-angels, blood-angels, deathwatch, genestealer-cults, black-templars,
space-wolves, titan-legions, chaos-knights, emperors-children, drukhari, space-marines,
chaos-space-marines, thousand-sons, death-guard, grey-knights, world-eaters, astra-militarum,
aeldari, orks, tau-empire — все закоммичены (см. `git log feat/datasheet-drift-fixes`).
chaos-titan-legions тоже **проверена и чиста** (без коммита — дрейфа не найдено). **Группа A
(«SM-семья») полностью закрыта.**

tau-empire (appdata source: `tau-empire.json`): выявлен новый систематический класс
ложных срабатываний — **урок 18**: дроны (`Gun Drone`/`Missile Drone`/`Recon Drone`/`MV15 Gun
Drone`) в appdata — это wargear-контейнеры, чьё "имя" никогда не совпадает с именем оружия,
которое они дают (`Gun Drone` даёт `Twin pulse carbine`, `Missile Drone` — `Missile pod`, `MV15
Gun Drone` — `Twin pulse blaster`); sync-скрипт сравнивает по буквальному имени контейнера и
поэтому вечно кричит "missing: Gun Drone" даже когда `Twin pulse carbine` уже заведён правильно.
Реальных находок тоже было много: (1) **11 юнитов не имели оружия дрона вообще** (Breacher
Team, Cadre Fireblade, Commander in Coldstar/Enforcer Battlesuit, Crisis Fireknife/Starscythe/
Sunforge Battlesuits, Ethereal, Pathfinder Team, Stealth Battlesuits, Strike Team) — добавлен
`Twin pulse carbine` (A2/BS5+/S5/AP0/D1/ASSAULT+TWIN-LINKED, единый профиль для всех) +
`Missile pod` Broadside/Riptide Battlesuits — оба тоже отсутствовали, хотя упомянуты в options;
(2) Riptide Battlesuit "Ion accelerator – supercharge" на самом деле "overcharge" (appdata
использует другое слово специально для Tau ion-оружия, стата совпадала 1-в-1, ошибалось только
имя); (3) **транспортный M/OC мистери**: 4 самолёта (AX-1-0/обычный Tiger Shark, Razorshark
Strike Fighter, Sun Shark Bomber) показывают appdata M="-" — учитывая, что это боевые
штурмовики, которым в принципе нужно двигаться, и что OC="-" для НИХ ЖЕ appdata подтверждает
осмысленно (соответствует прецеденту Valkyrie у astra-militarum), решили: OC 0→"-" внести
(реальное значение), а M оставить `20+"` (правдоподобный minimum-move для тяжёлых летунов,
appdata тут скорее всего потеряла значение при экстракции — то же самое видели у Thunderhawk).
Manta — другое дело: appdata даёт РЕАЛЬНОЕ число `40"` (не "-"), доверились, M 20+"→40", OC
0→"-"; (4) Krootox Rampagers — "Close combat weapon"/"Krootox fists" → "Hunting blades"/"Rampager
fists" (сам loadout-текст УЖЕ называл их правильно, ошибались только имена профилей оружия); (5)
Ta'unar Supremacy Armour — "Super-heavy Walker" была задвоена: и в `core` (appdata подтверждает
type:'core'), и отдельной способностью с текстом — убрали дубль (EN+RU); (6) три
пустышки-оружия с пустым именем (Tidewall Shieldline — тот же паттерн, что Drop Pod/Aegis
Defence Line/Cyclops Demolition Vehicle у других фракций), удалены; (7) по мелочи — Firesight
Team designer's note называл модель "Farsight Marksman" вместо "Firesight Marksman" (спутали с
известным персонажем Commander Farsight); Kroot Carnivores/War Shaper — по одной опечатке
("The 1 Long-quill", "tri-bade"); Kroot Carnivores/Tau'nar — не хватало стандартной клаузы
"Leader units become separate units if Bodyguard destroyed"; Stealth Battlesuits "Homing Beacon"
9"→8". Убран 1 чистый KEYWORDS-дубль (Kroot Hunting Pack, подтверждён в
conditionalKeywords.json). Kroot Farstalkers merged-profile и куча wargear-option list-split —
известные ложные срабатывания, не тронуты.

orks: большой разнообразный список. Реальные находки: (1) **Boyz** — в опциях полностью
отсутствовал вариант "Boss Nob может заменить big choppa на big choppa+kustom shoota ИЛИ
big choppa+kombi-rokkit+kombi-shoota" (все три оружия не заводились вообще) — добавлены оружия
и опция; заодно оказалось, что "Any number of Boyz can have slugga+choppa replaced with 1 shoota
+1 close combat weapon" неверно по механике — appdata: это просто "can each be EQUIPPED WITH 1
shoota" (не замена обоих, без отдельного CCW), а 10-модельная опция должна исключать тех, кто уже
взял shoota ("1 Boy NOT EQUIPPED WITH 1 shoota") — переписано; (2) Warboss — почти то же самое:
не хватало целых 2 оружий (Kustom Choppa, Kustom shoota) и опции "kombi-weapon+twin sluggas+big
choppa → 1 kustom choppa+1 kustom shoota", плюс "Twin slugga"→"Twin sluggas" (appdata plural);
(3) Mek — оружие "Wrench" → "Close combat weapon" (appdata подтверждает generic-профиль, EN+RU);
(4) Gretchin RUNTHERD T `5*`→`5` (звёздочка без объяснения нигде в датащите — явный мусор); (5)
Kommandos — "Speshul Kommando shoota"→"Kustom shoota" (тот же общий орочий профиль, что у Boyz);
(6) Squighog Boyz Stikka range `9"`→`12"`, композиция переписана в OR-пару, "for every 3
models"→"for every 4 models" для bomb squig; (7) Zodgrod Wortsnagga "Slugga"→"Squigstoppa"
(RU-текст самого юнита уже называет его "Сквигостоп", подтверждает; EN оружие раньше называлось
неправильно); (8) **транспортная вместимость трёх Ork-гигантов была перепутана/сбита**:
Big'ed Bossbunka ошибочно нёс "(excluding Ghazghkull Thraka)" — у него такого ограничения в
appdata нет вообще; Gorkanaut наоборот НЕ имел этого ограничения, хотя должен ("It cannot
transport Ghazghkull Thraka" отдельным предложением, не в скобках — своя формулировка, отличная
от Morkanaut, у которого "(excluding...)" в скобках ПРАВИЛЬНО, не трогали); Stompa — "Ghazghkull
Thraka takes up the space of 15 models" → "4 models" (числовая опечатка); (9) Burna
Boyz/Lootas/Squighog Boyz composition переписаны из "diapason-shorthand" (`1-2 X`, `4-8 Y`) в
парную OR-структуру (appdata: это жёстко связанные пары 1+4 или 2+8, не независимые диапазоны);
(10) по мелочи — Attilan Rough Riders-стиль baseSize-компаунды для Breaka Boyz/Tankbustas (Boss
Nob 40mm/рядовые 32mm), опечатки в loadout-строках (kustom-mega blaster→blasta,
defkilla boomsticks/killajet→boomstikks/killa jet, Meganobz "twin killsaw"→"twin killsaws").
Убран 1 чистый KEYWORDS-дубль (Dread Mob "Gretchin→Battleline", подтверждён в
conditionalKeywords.json). Blitzkannon (не Blitzcannon) и профильные naming-варианты, где appdata
сама себе противоречит прозой/структурой — оставлены, structura побеждает.

aeldari (appdata source: `asuryani.json`): структурно было много находок — **11 транспортов/
платформ потеряли служебный keyword `Frame`** (D-cannon Platform, Falcon, Fire Prism, Night
Spinner, Shadow Weaver Platform, Starweaver, Vibro Cannon Platform, Voidweaver, Wave Serpent,
Ynnari Raider, Ynnari Venom — добавлен всем), плюс попутно вычищено **72 стрей-пустые строки** в
`factionKeywords[]` по всему файлу (тот же баг, что у world-eaters, только втрое больше — видимо,
общий генератор/скрипт когда-то давно оставлял этот мусор системно). Точечные структурные находки:
Eldrad Ulthran оружие "Staff of Ulthamar and witchblade" → "The Staff..." (профиль оружия так
называется в appdata, а вот в прозе loadout/composition текста — без "The", появдата сама себе
противоречит, оставили профиль с "The", прозу без); Starfangs keyword "Starfangs"→"Starfang"
(appdata использует единственное число для кийворда при множественном имени юнита — заменили,
не добавили вторым); Yvraine baseSize `75x42mm`→`74x42mm`. **Warlock Conclave и Warlock
Skyrunners** — тот же паттерн, что Wardens of Ultramar (space-marines)/Masters of the Maelstrom
(chaos-space-marines): attach-механика была в кастомном `"rules":[{"name":"ATTACHMENT"}]` вместо
стандартного `"leader"` (text/units/footer) — конвертированы; заодно нашлись реально недостающие
юниты в списке attach (Guardian Defenders/Storm Guardians у Conclave; Windriders у Skyrunners) и
недостающий keyword "Warlock Skyrunner Conclave". Текстовые находки: 2 чистых KEYWORDS-дубля
(Windrider Host "Windriders→Battleline", Spirit Conclave "Wraithblades/Wraithguard→Battleline",
оба подтверждены в `conditionalKeywords.json`, убраны); реальные пропуски прозы — Corsair
Voidscarred loadout потерял "close combat weapon" у 3 из 5 моделей (Shade Runner/Soul
Weaver/Way Seeker), EN+RU; Eldrad Ulthran/The Visarch — недоставало footer-клаузы про гибкий
attach (Eldrad — "even if a Warlocks unit already attached"; Visarch — "even if Yvraine already
attached" + стандартная Bodyguard-destroyed клауза); Wraithknight with Ghostglaive composition
лишний суффикс "with Ghostglaive"; Ynnari Reavers "Cluster Caltrops" — **реально другая механика**
(было "reroll THE result for the bearer", стало "reroll one D6 for each model equipped with
cluster caltrops" — не косметика, appdata подтверждает дословно), EN+RU; плюс россыпь мелких
опечаток (Ynnari Incubi "demilklaives"→"demiklaives"; Dark Reapers/Wraithblades/Prince Yriel/
Maugan Ra/Ynnari Incubi — по одному-два потерянных слова каждое). **Впервые встретилась
категориальная дыра уровня целой фракции-союзника** (не отдельного поля, как Legends) — записано
как **урок 17**: appdata вообще не хранит Harlequins/Ynnari/Corsairs отдельными файлами, поэтому
детачменты, что описывают эти союзные механики (Ghosts of the Webway, Serpent's Brood, Devoted of
Ynnead, Eldritch Raiders, Corsair Coterie), не могут быть перепроверены в принципе — оставлены не
тронутыми. Также подтверждён третий подряд случай "числового бэйджа" (урок 16) — battle-size
таблицы в Battle Focus/Seer Council без цифр в appdata.

astra-militarum (самая большая в группе B, ~11k строк): много находок, самая крупная категория —
**4 пехотных полка (Cadian Shock Troops, Catachan Jungle Fighters, Death Korps Of Krieg,
Tempestus Scions) потеряли одну и ту же клаузу** в конце описания attach-механики Command Squad:
"...If it does, and this Bodyguard unit is destroyed, the Leader units attached to it become
separate units, with their original Starting Strengths" — дописано во всех четырёх (общая RU
константа `TWO_LEADERS_NOTE` тоже обновлена один раз). Точечные находки: (1) Aegis Defence
Line/Cyclops Demolition Vehicle — пустышки-оружия с пустым именем (как Drop Pod у space-marines),
удалены; (2) Attilan Rough Riders baseSize `60x35.5mm`→`60x35mm` (Death Riders' собственные
`60x35.5mm` — другой, действительно больший размер базы, appdata подтверждает разными числами
для двух юнитов, не трогали); (3) Cadian Castellan Close combat weapon WS `4+`→`3+`; (4) Death
Riders "Steed's savage claws"→"Savage claws" (у appdata и по стату полностью совпадает); (5)
Kasrkin — Bolt pistol/оба профиля Plasma pistol BS `4+`→`3+` (втроём), плюс не хватало whole
melee-профиля "Power weapon" (уже упомянут в options, но не заведён как оружие) — добавлен; (6)
Leman Russ Commander и Rogal Dorn Commander — не хватало Plasma cannon (оба профиля)/Meltagun
соответственно, тоже уже упомянутых в options, но не заведённых как оружие; (7) **Ratlings
baseSize** — как Jakhals у world-eaters: один плоский `25mm`, хотя Tankstopper-Rifle-вариант
отдельно 28.5mm — переписано в `25mm / 28.5mm`; (8) Valkyrie M/OC — `20+"`/`0` оказались один в
один статами **Avenger Strike Fighter** того же файла (перепроверено по appdata — Avenger
Strike Fighter ДЕЙСТВИТЕЛЬНО 20+"/OC0, а вот Valkyrie сама по appdata 14"/OC"-") — похоже на
скопированный по ошибке шаблон другого летуна, поправлено на 14"/"-"; (9) по мелочи —
"Cadian Castellan can issue 2 Orders" → "can issue **up to** 2 Orders" (все 7 других officer-юнитов
файла используют "up to N", это единственное исключение оказалось опечаткой); "1 Ibram Gaunt"
потерял суффикс "– EPIC HERO" в Gaunt's Ghosts; "1 Rogal Dorn Tank Commander" → "1 Rogal Dorn
Commander" (лишнее "Tank"); Death Korps Of Krieg — 3 опции были в активном залоге ("can each
replace their X with Y"), а весь остальной файл (20 других мест) — в пассивном ("can each have
their X replaced with Y") — унифицировано; Catachan Command Squad — два пункта потеряли "1 "
перед "Veteran Guardsman" (EN+RU). Проверено и НЕ тронуто: Voice of Command / Armoured Infantry
"Squadron Command" / Siege Regiment / Steel Hammer — все KEYWORDS-хвосты либо `type:'image'`-таблицы
(урок 3), либо conditional-грант с исключениями по статам/произвольным выбором юнита, который
`gen-conditional-keywords.mjs` в принципе не умеет генерировать (per-unit choice, см. его
комментарий в CLAUDE.md) — не дубли, оставлены; Abhuman Auxiliaries "Exemplar of Duty"
(→Ogryn/Bullgryn Squad) — attach подтверждён через `enhancement_bodyguard_group` (урок 13);
множество "wargear option"/"composition" diff'ов — знакомый список+сноска-одной-строкой
(Chimera/Kasrkin/Militarum Tempestus Command Squad/Death Korps/Tempestus Scions — весь контент
на месте); "coaxial"/"co axial"/"co-axial" (Baneblade/Rogal Dorn Battle Tank) и "Militarum
multi-laser" (Valkyrie composition prose vs собственный же плоский wargear appdata, где просто
"Multi-laser") — оба случая appdata сама себе противоречит, доверились структуре/собственной
внутренней консистентности wh11ed.

world-eaters: структурно был почти чист, зато нашёлся **реальный content-гэп на уровне
данных**: 30 записей стрей-бага в `factionKeywords[]` по всему файлу — пустая строка `""` рядом
с "World Eaters"/"Blood Legions" (то до, то после) в 30 датащитах, вычищено целиком regex'ом (не
влияет на appdata-сверку, appdata для части этих юнитов сама даёт `factionKeywords: []`, но пустая
строка — чисто вх11ed-шный мусор, воспроизводился и до, и после конкретной находки, попутная
уборка). Точечные находки: (1) Bloodcrushers оружие "Bladed horn" → "Juggernaut's bladed horn"
(два ДРУГИХ юнита, Lord Invocatus/Lord on Juggernaut, используют настоящее "Bladed horn" без
приставки с другим D — их не тронули, appdata подтверждает разные id); (2) Defiler "Heavy missile
launcher – krak" S `10`→`12`; (3) **Jakhals — датащит был неполным**: `baseSize` только `28.5mm`
для мёрженного профиля, где на самом деле два разных размера базы (Jakhals/Pack Leader 28.5mm,
Dishonoured-модели 40mm) — appdata хранит это как двухстрочный baseSize; переписано в
уже принятый по прецеденту (Dark Commune/Masters of the Maelstrom) формат `"28.5mm / 40mm"`; сам
контент (композиция, paired manglers, способности) уже был на месте, ошибался только baseSize;
(4) Chaos Rhino/Heldrake/Lord on Juggernaut — по мелочи в `composition`/`loadout`: лишняя "1" у
combi-bolter, потерянное "Chaos" в "Chaos Heldrake", потерянное "World Eaters" в "World Eaters
Lord on Juggernaut"; (5) Skarbrand `damaged` — "add 2 to this model's melee weapons" (общо) →
"...Slaughter and Carnage" (правильное имя его единственного оружия ближнего боя, appdata
подтверждает). Проверено и НЕ тронуто: Cult of Blood "Idols of Khorne & KEYWORDS" — хвост
"Jakhals/Goremongers gain Battleline" чистый дубль `conditionalKeywords.json`, убран; Butcher Lord
(→Goremongers/Jakhals) и Disciple of Khorne (→Bloodcrushers/Flesh Hounds) attach-клаузы и Khorne
Daemonkin ally-допуск Blood Legions 500/1000/1500 — все подтверждены через
`enhancement_bodyguard_group`/`allied_faction_points_limit` (урок 13); Blessings of Khorne — те
же "числа не в тексте appdata, но подтверждаются частично" (Warp Blades "double 5+" сходится с
примером-`quote` в appdata) — третий случай подряд (после Cabal of Sorcerers/Gate of Infinity)
такого пропуска бэйджа-номинала при экстракции appdata, не дрейф wh11ed.

grey-knights: короткий список, 2 реальные находки: (1) Brotherhood Techmarine — оружие
"Servo-arms" (множественное) → "Servo-arm" (единственное; собственный loadout-текст датащита уже
писал "servo-arm" в единственном, appdata подтверждает), и baseSize `32mm`→`40mm`; (2) ничего
больше по сути — весь остальной шум объяснён. Интересные НЕ-находки (проверено и намеренно НЕ
тронуто): Grey Knights Thunderhawk Gunship M `20+"` vs appdata `20"` — тот же паттерн
"минимальное движение 20+" уже встречается у adeptus-custodes.js (собственного Thunderhawk-типа
юнита), похоже appdata просто потеряла символ `+` при OCR; Stormhawk Interceptor Las-talon range
`36"` (wh11ed) vs `24"` (appdata) — при перепроверке через appdata же: **у Space Marines** тот же
самый датащит "Stormhawk Interceptor" использует ОБЩИЙ id оружия с Repulsor и **36"**, а вот у
Grey Knights appdata почему-то присвоила другой id с 24" — учитывая, что это буквально одна и та
же модель техники, доступная всем Chapter-фракциям, скорее ошибка привязки данных в самой appdata
именно для grey-knights, чем реальное отличие; Paladin Squad composition `3-9 Paladins` (wh11ed)
vs `4-9` (appdata) — appdata тут сама себе противоречит: `points[]` начинается с `models:4` (это
ИТОГО, Paragon+Paladins), что соответствует минимум 3 Paladins + 1 Paragon = 4, как у wh11ed, а
не с "4 Paladins + 1 Paragon = 5" по prose-тексту (урок 1 — верить структуре, не прозе); Gate of
Infinity — таблица числа юнитов по battle size (2/3/4) отсутствует в appdata вообще, даже как
`type:'image'`-заглушка (не только в тексте, но и в структуре карты её нет) — то же самое, что
"Warp Charge" у thousand-sons: похоже на реальный пропуск при экстракции, а не дрейф wh11ed,
без этих чисел способность нефункциональна, оставлено как есть.

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

**Группа A — «SM-семья»** — вся закрыта (space-marines, chaos-space-marines, thousand-sons,
death-guard, grey-knights, world-eaters).

**Группа B — остальные, по одной, от большей к меньшей:** ~~astra-militarum (10999)~~,
~~aeldari (8838)~~, ~~orks (6507)~~, ~~tau-empire (5213)~~, ~~chaos-daemons (5205)~~,
~~necrons (4833)~~, ~~tyranids (4508)~~, ~~adepta-sororitas (4478)~~, ~~imperial-agents (4220)~~
~~adeptus-mechanicus (3865)~~, ~~imperial-knights (3287)~~, ~~adeptus-custodes (3244)~~ —
**группа B ПОЛНОСТЬЮ ЗАКРЫТА.** Все 30 фракций из `sourceIds.json` пройдены (группа A + drukhari
+ chaos-titan-legions чиста-без-коммита + вся группа B) — проект реконсиляции завершён.

tyranids: appdata = `tyranids`. Harridan M "20+\""→"14\"" — реальный баг: в отличие от Hive
Crone (у неё есть ключевое слово Aircraft, appdata честно даёт "-" для M/OC — конвенция
20+"/минимальный ход применима), у Harridan НЕТ ключевого слова Aircraft (Fly/Monster/
Titanic/Transport), а appdata даёт конкретное однозначное число 14" — то есть это не
экстракшн-пробел, а настоящий copy-paste баг (как Valkyrie в astra-militarum ранее). Hive
Crone OC 0→"-" (тот же паттерн, что 4 самолёта Tau). Genestealers: оружие "Genestealer claws
and talons"→"Genestealers claws and talons" (appdata даёт множественное число в структурном
`wargear[].name`, при этом её же собственный prose `unitComposition` пишет единственное —
классическое appdata-самопротиворечие, урок 1: верить структурному полю). Neurogaunts
baseSize "25mm"→"25mm / 28.5mm" (Neurogaunt Nodebeast крупнее). Mucolid Spores/Spore Mines —
тот же паттерн empty-placeholder-оружия (`ranged:[]`). The Red Terror: пустое имя профиля ""→
"The Red Terror" (реальный баг); способность "Serpentine Fiend" появдата не знает вообще —
контент внутренне непротиворечив (терраформ-механика в тему флейвора burrowing-твари),
оставлено как appdata-пробел. Крупных текстовых дрейфов не найдено — почти весь repoted diff
оказался знакомым шумом: army rule "Synapse & Shadow in the Warp" честно объединяет appdata'шные
ДВА отдельных armyRules с одинаковыми именами-дублями (уже знакомый паттерн: appdata дублирует
имена армии-правил, но здесь действительно 2 РАЗНЫХ по контенту правила, слитых в одну карточку
— урок 10); "Vanguard Onslaught" · "Questing Tendrils" аналогично объединяет "Questing Tendrils"
+ "Vanguard Prime" (Deathleaper) — 2 appdata rule-объекта под одной карточкой, контент 1:1;
"Subterranean Assault" · "Surprise Assault" несёт доп. "### Keywords" (Burrower для Mawloc/
Trygon + опция Character для 2 Trygon) — appdata не даёт эту часть в prose `rules[]`, НО
Burrower-грант подтверждён отдельно в `conditionalKeywords.json` (сгенерирован из структурной
`conditional_keyword` таблицы) — контент реальный, просто appdata не помещает его в тот же
текстовый блок (урок 8b); "Parasitic Payload" стратагем — appdata пишет "[IGNORE COVER]"
(единственное число), но wh11ed's `reference.js`/`coreAbilities` канонически используют
"[IGNORES COVER]" (множественное, с этим именем работает KeywordPopover) — appdata здесь
просто непоследовательна с собственной остальной книгой, трогать нельзя, сломает попап; Hive
Tyrant wargear-опция — список+сноска слиты appdata в одну строку, wh11ed разбивает на два
`options[]` элемента (уже известный false-positive паттерн). The Swarmlord composition "1
Swarmlord"→"1 The Swarmlord" (сам датащит называется "The Swarmlord", реальная мелкая правка).
`npm test` — 207/207 чисто с первого раза.

necrons: appdata = `necrons`. Canoptek Reanimator Ld 7+→8+ (стат-дрейф). Chronomancer:
оружие называлось "Aeonstave" (выдуманное/устаревшее имя) — appdata однозначно даёт
"Chronomancer's stave" и для ranged, и для melee профиля; переименовано везде (EN+RU,
включая flavor/loadout), заодно это почини­ло одну ранее сломанную запись в `sourceIds.json`
(8610→8612 mapped). The Silent King composition "1 Szarekh – CHARACTER"→"– EPIC HERO"
(в keywords Epic Hero уже был, суффикс просто не совпадал). Cryptothralls "CRYPTEK RETINUE" —
лишнее слово "Infantry" после "Cryptek model" (все крипотеки в книге и так Infantry, но текст
должен буквально совпадать с appdata) — убрано EN+RU. Hexmark Destroyer (1-моделный юнит)
loadout "Every model"→"This model" (грамматика). Canoptek Macrocytes "Accelerator Mandible" —
реальный баг: буст WS был написан как "characteristic of weapons equipped by models" вместо
"characteristic of models" (WS — характеристика модели, не оружия) — EN+RU. Canoptek Spyders
"Fabricator Claw Array" — "that unit has FNP"→"models in that unit have FNP" (per-модельная,
не per-юнитная формулировка, matches appdata точно) — EN+RU. Крупная находка —
**"Pantheon of Woe" · "Cosmic Distortion"**: правило обрывалось на выдуманном предложении
про "increase points cost… Munitorum Field Manual" и НЕ содержало реальный раздел
"Necrodermal Binding Abilities" — 4 именованных способности (Lord of Deceit/Quantum
Goad/Animus Damper/Reletavistic Tether), автоматически дающиеся четырём конкретным
C'tan-моделям. Раздел добавлен целиком (EN+RU) по appdata; отдельно подтверждено, что
это НЕ дублирует одноимённые платные enhancement'ы того же детачмента (те уже были в
wh11ed правильно и остаются — это две параллельные вещи: бесплатный грант через правило
детачмента vs платное усиление). "Murdermind" enhancement — доп. фраза про attach на
Lokhust/Ophydian/Skorpekh Destroyers, которой нет в плоском `factions/necrons.json`, но
подтверждена глубже в `tables/enhancement_bodyguard_group(_datasheet).json` (4 связи, ровно
эти 4 юнита) — оставлено, урок 13 снова сработал. "Veil of Darkness" enhancement — appdata
пропустила "NECRONS model only" префикс у ЭТОЙ ОДНОЙ записи, хотя у всех соседних
enhancement'ов он есть — трактовано как точечный appdata-пробел, не как баг wh11ed, префикс
оставлен. C'tan Shard × 3 и Transcendent C'tan "points differ" (appdata даёт вторую
points-бракету — какой-то доп. вариант) и Tesseract Vault ranged/ctanpowers
categorization — **вне контракта** (points) либо известный категоризационный шум
(ctanpowers weapons у wh11ed заведены как обычные `ranged` записи с тегом `C'TAN POWER`
вместо отдельного массива — appdata ожидает отдельную категорию, контента не теряется).
`npm test` — впервые за много фракций подряд все 207/207 прошли с первого раза (без
известной летучей ошибки StratagemsView).

chaos-daemons: appdata = `legiones-daemonica`. Основной баг — **41 датащит** (буквально
почти все юниты в файле) несли статичное ключевое слово `"Shadow Legion"` в `keywords[]`,
которого appdata не знает вообще; при этом в RU-файле того же ключевого слова не было ни
разу (0 из 41) — явный EN/RU parity-разрыв сам по себе. Причина нашлась в тексте: детач­мент
"Shadow Legion" (Be'lakor) сам явно гласит "Legiones Daemonica units from your army gain the
SHADOW LEGION keyword" — то есть это условный грант **только при выборе этого детачмента**,
а не постоянное ключевое слово юнита; кто-то в прошлом впечатал его статично во все датащиты.
Удалено везде (см. урок 19). Дальше: Feculent Gnarlmaw/Skull Altar — тот же паттерн
empty-placeholder-оружия (`ranged:[]`) + отсутствующее ключевое слово `Frame` (Fortification
юниты, не только vehicle-платформы — см. урок 16/aeldari, оказывается шире). Hellflayers inv
4+→5+ (реальный дрейф). Tormentbringer keyword → "Tormentbringer on Exalted Seeker Chariot"
(appdata своё уникальное самоссылочное имя, как у "Lord on Juggernaut" в world-eaters).
Poxbringer core/faction-diff и Pink Horrors "BLUE HORROR/BRIMSTONE HORROR" — оба подтверждены
как известные ложные срабатывания (appdata просто не экстрактировала faction-ability для этого
конкретного датащита; Blue/Brimstone Horror — identical-stat merge, урок про KOMMANDOS).
Крупная находка — **enhancement "Infernal Puppeteer"**: весь текст в wh11ed описывал
LOS/range-подмену через другую модель, но appdata (и структурно похожий паттерн "+N\"
detection range" у Grey Knights/Adepta Sororitas/Tau в этом же своде правил) даёт совершенно
другую механику — debuff +9" detection range вражескому юниту. Заменено полностью на
appdata-текст (EN+RU) — это не мелкая правка формулировки, а замена содержания способности.
"Foetid Resurgence" стратагем — не хватало двух `(excluding CHARACTER models)` клауз (EN+RU).
"Inescapable Manifestations" — "Desperate Escape tests" (несуществующий термин) → "hazard
rolls" / «броски на опасность» (EN+RU, правильный термин по `advancedRules.js`/glossary).
Be'lakor: "Shadow Form Abilities (see below)" → убрано (структурный `abilitySets` и так рядом
на странице); damaged-порог 1-6→1-7 wounds (EN+RU). Daemon Prince of Chaos (+ with Wings)
"DAEMONIC ALLEGIANCE" — "as stated overleaf" (бумажная реплика "см. на обороте", бессмысленная
в цифровом виде) → "as stated below" (контент реально рядом в `specialAbilities`, не
дублировался). Отдельно подтверждено НЕ дрейфом (merge-паттерн, урок 10): армия-правило "The
Shadow of Chaos" честно объединяет appdata'шные `armyRules` "The Shadow of Chaos" + "Daemonic
Pact" под одним заголовком с `### `; детачменты "Blood Legion" (Murdercall + Blood Tainted) и
"Legion of Excess" (Beguiling Aura + Seductive Gambit) — тот же паттерн, два appdata rule
объекта под одной карточкой. "Thralls of the First Prince & First Prince of Chaos" — appdata
вообще не содержит "Thralls of the First Prince" ни в `legiones-daemonica.json`, ни в
`heretic-astartes.json`/`adeptus-astartes.json` (проверено) — категориальный appdata-пробел
на уровне ОДНОГО правила внутри детачмента (не всего файла союзника, как урок 17, но похоже) —
оставлено как есть, текст внутренне непротиворечив (конкретные юниты/пункты по battle size).
`npm test` — та же известная летучая ошибка `StratagemsView.test.js` (не воспроизводится
изолированно/при перезапуске, фикстуры на space-marines, не относится к правкам).

adepta-sororitas: appdata = `adepta-sororitas`. Структурный баг — **"Crusaders"** (юнит из
прошлых редакций, давно вырезан) висел мёртвой ссылкой в `leader.units[]` у 9 датащитов
(Aestred Thurga and Agathae Dolan, Canoness, Dialogus, Dogmata, Hospitaller, Imagifier, Junith
Eruita, Palatine, Triumph Of Saint Katherine) — appdata не знает такого юнита вообще, и
собственного датащита "Crusaders" в wh11ed тоже нет (ни одного) — все 9 записей удалены.
Repentia Squad profile "SISTERS REPENTIA" (appdata: "Sister Repentia", ед. число) — известный
паттерн pluralized-merged-profile-label, статы совпадают 1:1, ложное срабатывание. Ministorum
Priest — реальный мелкий баг: и профиль-статлайн, и `composition`, и EN/RU flavor звали юнита
"Preacher" вместо appdata'шного "Ministorum Priest" (устаревшее прозвище вместо актуального
имени датащита) — переименовано везде (EN+RU). Celestian Insidiants wargear-опция — appdata
хранит все 6 пунктов как отдельные `wargearRules[]` записи 1:1 с wh11ed `options[]`
(sync-скрипт сравнил не те индексы между собой) — контент идентичен, ложное срабатывание. Army
rule "Acts of Faith" ("apart of the dice roll") и stratagem "Angelic Descent" ("place to into
Strategic Reserves") — оба появdata-опечатки (грамматически бессмысленные), wh11ed уже пишет
грамматически верно ("a part of"/"place it into") — урок 2, не трогать. "Desperate for
Redemption" — appdata структурно разносит lore-вставки (`loreAccordion`) отдельно от
механического текста между заголовками Vow'ов, wh11ed сливает их инлайн в одну строку — контент
1:1, тот же порядок, ложное срабатывание. Две находки **не тронуты, хотя appdata молчит
полностью** (не только в prose, но и во всех проверенных structural-таблицах): detachment
"Champions of Faith" · rule "Righteous Purpose" несёт доп. абзац "Keywords: while a CELESTIAN
SACRESANTS unit… OC +1" (EN+RU в полном согласии друг с другом, специфичный и правдоподобный
для этой редакции паттерн, аналоги такого рода OC-бонуса за "не в Battle-shock" есть у других
детачментов других фракций) и enhancement "Catechism of Divine Penitence" несёт доп. фразу про
"can be attached to a Repentia Squad unit" (механически необходима — без неё усиление не
имело бы смысла: Canoness/Palatine/Ministorum Priest в своих `leader.units[]` НЕ включают
Repentia Squad, то есть без этого гранта усиление физически неприменимо к заявленной механике).
Оба трактованы как appdata-пробелы (структурный экспорт просто не долетел до этих кусков), а не
как дрейф wh11ed — как и necrons "Cosmic Distortion" в прошлом цикле. `npm test` — 207/207
чисто с первого раза.

imperial-agents: appdata = `agents-of-the-imperium`. Тот же "Crusaders"-паттерн повторился —
**мёртвая ссылка на несуществующий юнит** в `leader.units[]`: Watch Captain Artemis и Watch
Master оба несли "Deathwatch Terminator Squad", "Fortis Kill Team", "Indomitor Kill Team",
"Spectrus Kill Team" — appdata знает только "Aquila Kill Team"/"Deathwatch Kill Team" для этих
лидеров, и ни один из 4 лишних юнитов не существует как собственный датащит в этом же файле —
удалены у обоих персонажей. Corvus Blackstar — лишнее ключевое слово `Frame` (аппдата не даёт;
в отличие от гусеничных Rhino/Chimera/Immolator того же файла, у которых Frame подтверждён —
Blackstar на оval-базе, не подходит под 17.02). Sisters of Battle Immolator — само-ссылочное
ключевое слово `"Immolator"` → `"Sisters of Battle Immolator"` (полное имя датащита, тот же
паттерн, что Tormentbringer в chaos-daemons); заодно `composition` несла ту же усечённую форму
"1 Immolator" → "1 Sisters of Battle Immolator". Grey Knights Terminator Squad: Psilencer — не
хватало тега `PRECISION` (сверено с "родным" профилем Psilencer в `grey-knights.js` — там тег
есть); `composition` "Grey Knights Terminators" → "Grey Knight Terminators" (appdata даёт
единственное число прилагательного); wargear-опция несла лишний "For every 5 models in this
unit," префикс для юнита с фиксированным составом в 5 моделей без масштабирования (appdata его
не даёт вообще) — убран. Ministorum Priest (тот же самый баг, что в adepta-sororitas, но задел
другой файл) — нет, не подтвердилось здесь. Аквила Килл-Тим "The Kill Team Sergeant" → "Each
Kill Team Sergeant" (appdata последовательно даёт "each" для всех ролей лоадаута, даже
count-1). Inquisitor "Blessed Wardings" (wargearAbility) — "this model"/"have the" → "the
bearer"/"have a" (сверено с соседней записью "Psychic Gifts" той же датащит-секции — там уже
"the bearer"). Inquisitor Draxus composition "1 Inquisitor Draxus" → "1 Lord Inquisitor Kyria
Draxus" (полный титул по appdata, тот же паттерн что The Swarmlord/Silent King ранее).
Inquisitor Greyfax loadout — опечатка "master-crafter power sword" → "master-crafted power
sword" (сверено с именем самого оружейного профиля на этом же датащите). Inquisitorial Agents
— опечатка "The some model" → "The same model" (footnote). Inquisitorial Chimera — сноска
"*This weapon cannot be replaced." была отдельным элементом `options[]`, оторванным от своего
referent (multi-laser опции) — слита в тот же пункт, откуда и растёт `*`. Exaction Squad —
"their Arbites combat shotgun" → "shotguns" (appdata даёт множественное число для этого
конкретного юнита; проверено, что у почти идентичного Vigilant Squad appdata сама даёт
единственное число — то есть это не общий шаблонный баг, а точечное отличие двух почти
одинаковых юнитов в самой книге). Точки (Callidus/Culexus/Vindicare Assassin "points differ")
— вне контракта, не тронуты. baseSize compound-формат (Exaction/Subductor/Vigilant Squad,
Imperial Navy Breachers, Inquisitorial Agents) и identical-stat merged-profile (Aquila Kill
Team, Rogue Trader Entourage) — оба уже известных ложных срабатывания, подтверждены и не
тронуты. Крупная находка — **detachment "Veiled Blade Elimination Force" · rule "Extremis
Sanction"**: тело правила обрывалось на "...you cannot include that unit in your army" и
целиком отсутствовал раздел "Extremis Abilities" — 4 именованные способности для конкретных
моделей Officio Assassinorum (Callidus/Culexus/Eversor/Vindicare Assassin), включая механику
[ANTI-MONSTER 4+]/[ANTI-VEHICLE 4+] у Vindicare. Раздел добавлен целиком (EN+RU) по appdata
(с исправлением appdata-опечатки "utilisevat-grown" → "utilise vat-grown", урок 2). Две мелкие
appdata-опечатки НЕ тронуты: army rule "Assigned Agents"/"Deathwatch Mission Tactics" (та же
lore-inline-merge ложная тревога, что уже видели у Penitent Host), stratagem target "INQUISTOR"
(опечатка appdata, у wh11ed уже верно "INQUISITOR"). `npm test` — 207/207 чисто с первого раза.

adeptus-mechanicus: appdata = `adeptus-mechanicus`. Archaeopter Transvector M "20+\""→"14\""
(тот же Aircraft-конвенция паттерн, что Harridan у tyranids — у Transvector НЕТ ключевого слова
Aircraft, в отличие от Fusilave/Stratoraptor, у которых оно есть и 20+"/OC "-" оставлены как
есть). Hastarii Exterminators/Fusiliers — опечатка "Close-combat weapon" (с дефисом) → "Close
combat weapon" (без, сверено — 5 других вхождений в этом же файле уже без дефиса). Archaeopter
Transvector transport — не хватало "Sydonian Skatros" в списке запрещённых пассажиров (EN+RU).
Skitarii Rangers/Vanguard — сноска "* That model's galvanic rifle/radium carbine cannot be
replaced" была оторвана в отдельный элемент `options[]` вместо продолжения того пункта, откуда
растёт `*` — слито обратно (EN+RU), тот же паттерн что Inquisitorial Chimera в imperial-agents.
Servitor Battleclade merged-profile (Gun/Combat Servitor identical stats) и Skitarii
Rangers/Vanguard compound baseSize (Transuranic Arquebus отдельная база) — оба уже известных
ложных срабатывания. Крупный спорный случай, оставлен как есть: Thulia Ghuld несёт способность
"Cybernetic Augmentation" (движение сквозь террейн, посадка на любом этаже RUINS), которой
appdata не знает вообще ни в одном поле — но её ключевые слова буквально MOBILE + MONSTER, а
базовые правила 13.06 дают ИМЕННО этот набор допущений этим двум ключевым словам напрямую;
трактовано как редакторское разъяснение уже-имеющихся keyword-прав, встречающееся в реальных
датащитах для необычных моделей, а не как выдумка — appdata просто не завела это отдельным
`ability`-объектом. Detachment "Data-Psalm Conclave"/"Luminen Auto-choir" — доп. клауза "This
detachment has the DATA-PSALM tag and cannot be taken with another DATA-PSALM detachment"
подтверждена структурным `unique: 'DATA-PSALM'` полем в самом же файле (два детачмента реально
делят тег, комментарий в шапке файла уже это документирует) — appdata-пробел, не баг.
Cybernetica Datasmith leader — доп. mandatory-attach параграф ("must attach... cannot be
deployed... counts as destroyed... loses INFANTRY while attached") нигде не сыскался в appdata
дословно, но (а) appdata's "Data-severed" ability для этого же датащита независимо описывает
тот же INFANTRY↔VEHICLE keyword-свитч с противоположной стороны условия, и (б) точно такая же
"cannot be deployed and counts as having been destroyed during the first battle round" идиома
уже встретилась в этой же сессии дословно в другой фракции (imperial-agents "Assigned Agents" —
это стандартная книжная формулировка для DEDICATED TRANSPORT/support-моделей) — оставлено.
Lords of the Forge enhancement "TL-4ø9" — appdata-текст просто урезан до вступления, вес
оружия в теле — уже знакомый table-в-prose паттерн (appdata хранит статы оружия в отдельном
структурном поле, не в тексте энхансмента). Serberys Sulphurhounds "2 phosphor pistols"/"twin
phosphor pistols" — appdata сама себе противоречит между `unitComposition` ("2") и wargear-rule
("twin") для одного и того же оружия; wh11ed совпадает с её же `unitComposition` — самосогласованно,
не тронуто. Две appdata-опечатки не тронуты: "SKITARlI" (строчная L вместо I) и "On 2+"
(потерян артикль во втором bullet того же правила, где первый bullet той же appdata верно
пишет "On a 2+"). `npm test` — 207/207 чисто с первого раза.

imperial-knights: appdata = `imperial-knights`. Knight Destrier — S оружия "Titanic feet" 7→8
(единственный выброс среди 7 датащитов этого файла с тем же профилем — все остальные либо
a=6/s=10 (Armiger), либо a=4/s=8 (полноразмерные Knight); Destrier ошибочно стоял на s=7).
baseSize "150x95mm Oval Base"→"150mm Oval Base" (appdata последовательно даёт "170 x 109mm" для
всех полноразмерных Knight, но именно для Destrier — одно число без второго измерения; формат
воспроизведён точно, не общий шаблон). Composition — тот же copy-paste баг дважды: Knight
Destrier нёс "1 Knight Defender" (чужое имя), Sir Hekhtur нёс придуманную вторую строку "Set up
when Canis Rex is destroyed (see Canis Rex)" — ни в датащите Canis Rex, ни в Sir Hekhtur appdata
не знает такой механики вообще (проверено оба датащита целиком) — убрано, заодно добавлен
недостающий суффикс "– EPIC HERO" (Sir Hekhtur действительно Epic Hero, как и его "загадочный"
столбец в keywords); loadout Sir Hekhtur заодно поправлен на именной "Sir Hekhtur is equipped
with" (конвенция уникальных Epic Hero персонажей в этом же файле — сверено с Canis Rex "Canis
Rex is equipped with", а не generic "This model"). Knight Paladin/Preceptor loadout — опечатки
"battlecannon"→"battle cannon", "Preceptor multi-laser"→"Questoris multi-laser" (сверено с
собственным оружейным профилем "Questoris multi-laser" тут же на датащите). Knight Destrier
wargear-сноска про bellatus reaper chainsword/thundershock spear — та же "оторванная сноска"
проблема, что чинили в adeptus-mechanicus/imperial-agents в этом же цикле, слита обратно (EN+RU).
Army rule "Code Chivalric" (4 appdata armyRules — Code Chivalric/Bondsman/Super-heavy
Walker/Freeblades слиты в одну карточку, включая мотто-подзаголовки "We vow to lay low the
tyrant..." — проверены дословно, содержание 1:1), detachment "Questoris Companions" (2 appdata
rules Heroes of Legend + Valour's Reward слиты) — уже знакомый merge-паттерн (урок 10), не баг.
"Spearhead-At-Arms" · "Knightly Teachings" доп. "Keywords: ARMIGER models gain BATTLELINE" —
подтверждено `conditionalKeywords.json` (структурная `conditional_keyword` таблица appdata),
контент реальный. `npm test` — известная летучая `StratagemsView.test.js` ошибка при полном
прогоне (проходит чисто изолированно и на повторном полном прогоне, фикстуры на space-marines,
не относится к правкам).

adeptus-custodes: appdata = `adeptus-custodes`. Orion Assault Dropship M "20+\""→"14\"" (тот же
Aircraft-конвенция паттерн: у него нет ключевого слова Aircraft, в отличие от Ares Gunship,
которая есть, оставлена как 20+"/OC "-"). Blade Champion "Vaultswords – Hurricanus" — опечатка
в имени оружия ("Hurricanus"→"Hurricanis", появdata однозначно даёт "Hurricanis"); из-за этой
опечатки структурная сверка **сама** давала недостоверный полный дифф статов (сравнивала не с
тем профилем appdata по имени) — как только имя поправлено, все "различия" статов исчезли (они
и были совпадающими всё это время, просто под неверным именем). Custodian Guard wargear-опция —
лишний вариант "1 vexilla and 1 misericordia" (без praesidium shield) не существует в appdata:
там только один комбинированный вариант "1 vexilla, 1 misericordia and 1 praesidium shield" —
убран лишний вариант (EN+RU; соседний "1 vexilla and 1 misericordia" у ДРУГОГО юнита, Allarus
Custodians, не трогался — appdata его не флагует, там всё верно). Trajann Valoris loadout не
хватало оружия "Eagle's Scream" целиком (ranged-профиль на датащите уже был, просто не упомянут
в loadout) — добавлено (EN+RU), заодно исправлена опечатка с прямым апострофом на типографский
в имени профиля. Detachment "Solar Spearhead" · "Auric Armour" (2 appdata rules Auric Armour +
Moritoi Ancients слиты, плюс доп. "### Keywords" про Custodes Walker → CHARACTER — appdata нигде
не содержит этот кусок ни как отдельное правило, ни в `conditionalKeywords.json`, но текст
внутренне непротиворечив и структурно совпадает с уже подтверждённым ARMOURY tag-паттерном того
же файла — оставлено как appdata-пробел) и "Null Maiden Vigil" · "Creeping Dread" (доп.
"Keywords: Prosecutors gain BATTLELINE" — подтверждено `conditionalKeywords.json`) — оба уже
знакомые паттерны, не баги. Три appdata-опечатки не тронуты: "gain the following THE ability"
(двойное the), "attack that TARGET" (пропущено s), "Revered Companions" — все внутренне
бессмысленны, у wh11ed уже грамматически верно. `npm test` — известная летучая
`StratagemsView.test.js` ошибка при одном из прогонов (не воспроизводится изолированно и на
повторном полном прогоне, не относится к правкам).

## Проект завершён (2026-07-27)

Все 30 фракций из `src/data/sourceIds.json` пройдены: группа A (SM-семья, 6 фракций) + 15
факций, закрытых до переигрывания порядка (leagues-of-votann, dark-angels, blood-angels,
deathwatch, genestealer-cults, black-templars, space-wolves, titan-legions, chaos-knights,
emperors-children, drukhari, space-marines — из группы A техничеки; chaos-titan-legions
проверена чистой без коммита) + вся группа B (astra-militarum, aeldari, orks, tau-empire,
chaos-daemons, necrons, tyranids, adepta-sororitas, imperial-agents, adeptus-mechanicus,
imperial-knights, adeptus-custodes). Каждый коммит — отдельная фракция в ветке
`feat/datasheet-drift-fixes` (см. `git log`), PR не открыт.

**Следующий шаг:** спросить пользователя, пушить ли ветку и открывать ли PR — не делать этого
самостоятельно. После ответа — удалить этот файл в финальном коммите (по прецеденту
`DATA-909-TODO.md`).

**Группа B — остальные, разбирать ПОСЛЕ группы A, по одной, от большей к меньшей:**
astra-militarum (10999), aeldari (8838), orks (6507), tau-empire (5213), chaos-daemons (5205),
necrons (4833), tyranids (4508), adepta-sororitas (4478), imperial-agents (4220),
adeptus-mechanicus (3865), imperial-knights (3287), adeptus-custodes (3244).
drukhari (2973) уже закрыта (взята 2026-07-27 до переигрывания порядка, добита по факту —
см. прогресс выше) — из группы B вычеркнута. Группа A с тех пор полностью закрыта; актуальный
указатель "next →" — в прогрессе выше.

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

16. **Числовые «бэйджи» (пороги/лимиты), которые печатаются на карте отдельным значком/цифрой, а
    не обычным текстом предложения — систематически пропадают при экстракции appdata, даже когда
    остальной текст того же правила извлечён полностью.** Три независимых прецедента подряд:
    thousand-sons "Cabal of Sorcerers" (Warp Charge 5/6/7/9 у четырёх ритуалов — appdata знает
    только сам ритуал текстом, чисел нет вообще); grey-knights "Gate of Infinity" (таблица
    "сколько юнитов по battle size" — 2/3/4 — отсутствует целиком, даже как `type:'image'`); world-
    eaters "Blessings of Khorne" (double 1+/2+/3+/4+/5+/6 у шести Blessing — appdata знает
    названия и эффекты, но не пороги). Отличать от урока 3 (`type:'image'` — appdata честно
    отмечает, что там таблица, просто не оцифровала) — здесь чаще всего appdata **вообще не
    оставляет следа**, что там было число, ни как `image`-блок, ни как текст. Проверять по
    возможности хотя бы один пункт через побочные данные (Warp Blades "double 5+" подтвердился
    примером внутри `type:'quote'` того же правила) — если хоть один пункт совпадает и остальные
    выстроены в логичную возрастающую/понятную последовательность, лишний повод для паники нет.
    **Не удалять и не обнулять** такие числа только на основании отсутствия в appdata — без них
    способность нефункциональна, а сама последовательность (не единичное число) обычно достаточно
    показательна, чтобы не быть выдумкой wh11ed.

17. **appdata трекает не все дружественные/союзные фракции как отдельные файлы — если такого файла
    нет вообще, весь контент про эту фракцию-союзника, что появляется в детачментах основной
    фракции, невозможно перепроверить в принципе** (не «плохо искал», а категориальный пробел, как
    урок 14 про Legends, но на уровне целой фракции, а не одного поля). Прецедент: aeldari —
    `wh40k-appdata/factions/` не содержит ни `harlequins.json`, ни `ynnari.json`, ни отдельного
    файла про Corsairs/Anhrathe (при этом `asuryani.json`, т.е. основная aeldari-фракция, есть).
    Детачменты, что описывают механики этих союзников (Ghosts of the Webway/Serpent's Brood —
    Harlequins Troupe Battleline+OC2+лимит уникальных моделей+ACROBATIC-тег; Devoted of Ynnead —
    обязательное включение Yvraine/The Yncarne+warlord; Eldritch Raiders/Corsair Coterie —
    Corsair Enhancement points-надбавка), показывают этот контент как «wh11ed adds, appdata молчит»
    — но appdata и не может знать про фракцию, которую вообще не хранит. Раз контент содержательный,
    внутренне согласованный и не выглядит придуманным — не трогать; в отличие от Legends (где
    "не в appdata — не у нас" всё ещё действует, потому что appdata ЗНАЕТ о категории и просто не
    заполнила поле), тут другая природа пробела — источник целиком не охватывает фракцию-союзника.
    Проверить `ls wh40k-appdata/factions/` на будущее, если сомнение — есть ли у этой
    фракции-союзника вообще свой файл, прежде чем удалять что-то похожее.

18. **Wargear-«контейнеры», чьё собственное имя НИКОГДА не совпадает с именем оружия, которое они
    дают — sync-appdata.mjs вечно репортит их как ложную пару extra/missing.** Прецедент: tau-empire
    дроны — `Gun Drone` (имя wargear-итема) даёт оружие `Twin pulse carbine` (совсем другое имя),
    `Missile Drone` → `Missile pod`, `Recon Drone` → `Drone burst cannon`, `MV15 Gun Drone` →
    `Twin pulse blaster`. appdata хранит это как `wargear[].ruleText: "The bearer is equipped with
    the following ranged weapon:"` + вложенный `profiles[]` с другим именем. Скрипт сравнивает по
    буквальному верхнеуровневому имени контейнера, поэтому даже когда всё заведено правильно (по
    имени вложенного профиля), он будет вечно кричать "missing: Gun Drone" / "extra: Twin pulse
    carbine". Проверять вручную: если у юнита в `options[]` упомянут дрон, а в `ranged[]` есть
    похожее по статам оружие под другим именем — сверять через `ds.wargear.find(w=>w.name==="Gun
    Drone").profiles` в appdata, не доверять голому имени в диффе.

19. **Статично впечатанное условно-грантованное ключевое слово — реальный баг, не ложное
    срабатывание, и его стоит искать по EN/RU parity, а не только по appdata-диффу.**
    Прецедент: chaos-daemons — `"Shadow Legion"` сидело в `keywords[]` **41 датащита** (почти
    весь файл), appdata его там не знает вообще ни у одного юнита, а сам детачмент "Shadow
    Legion" в тексте прямо говорит "Legiones Daemonica units from your army gain the SHADOW
    LEGION keyword" — то есть грант условный (только при выборе этого детачмента), как
    `conditionalKeywords.json`-паттерн, но появился как жёстко вшитая строка на КАЖДОМ юните.
    Килл-сигнал, который сразу выдал баг ещё до чтения appdata: RU-файл того же слова не
    содержал ни разу (0 из 41) — статичный дрейф такого масштаба почти всегда либо ломает
    EN/RU parity, либо появился одним неаккуратным bulk-add. Если `sync-appdata.mjs` репортит
    один и тот же "extra keyword" у ДЕСЯТКОВ датащитов сразу — это не шум, это copy-paste баг,
    проверить count в RU-файле первым делом.

## Что делать дальше

Ждать от пользователя "ещё одну (любую) фракцию", взять следующую из списка выше, повторить
воркфлоу. Когда все 30 фракций закрыты — **удалить этот файл** в финальном коммите (по прецеденту
`DATA-909-TODO.md`), затем спросить пользователя, пушить ли/открывать ли PR.

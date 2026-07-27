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

## Прогресс (10 фракций закрыты)

✅ leagues-of-votann, dark-angels, blood-angels, deathwatch, genestealer-cults, black-templars,
space-wolves, titan-legions, chaos-knights, emperors-children — все закоммичены (см. `git log
feat/datasheet-drift-fixes`). chaos-titan-legions тоже **проверена и чиста** (без коммита —
дрейфа не найдено).

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

**Остались 20 фракций** (по возрастанию строк в `src/data/datasheets/*.js`, ориентир для выбора
следующей "любой" фракции): drukhari, adeptus-custodes, imperial-knights,
world-eaters, grey-knights, adeptus-mechanicus, death-guard, thousand-sons, imperial-agents,
adepta-sororitas, tyranids, necrons, chaos-daemons, tau-empire, orks, chaos-space-marines,
aeldari, astra-militarum, space-marines (обработать последним — самый большой, 13k строк, и на
него завязаны все 5 SM-Chapter фракций через `sharedUnitIds[]`, уже проверенные).

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
    bodyguard-группы (`enhancement_bodyguard_group`, `_datasheet`, `_keyword`), и часть keyword-
    грантов сверх того, что уже попало в `conditionalKeywords.json` (`conditional_keyword.json`
    сам по себе полнее, чем то немногое, что генератор `gen-conditional-keywords.mjs` из него
    выбирает — см. его комментарий в CLAUDE.md: он берёт только roster-faction-keyword и
    detachment-грант, пропуская per-unit allegiance-гранты). Общий метод: найти id сущности
    (`factions/<slug>.json` даёт detachment/datasheet/enhancement id), затем грепать `tables/`
    по этому id как FK (`detachmentId`, `enhancementId`, `datasheetId`), резолвить связанные id
    через `keyword.json`/`faction_keyword.json`/`battle_size.json` и т.п.
    **Прецедент (эта же правка, дважды исправленная в одном коммите):** сначала ошибочно удалил
    Legions of Excess ally-текст в emperors-children "Daemonic Empowerment" и attach-фразу в
    "Exalted Patron" как "неподтверждённые" (не нашёл в `factions/emperors-children.json`) — оба
    оказались чётко подтверждены в `tables/`: Legions of Excess — через `allied_faction` (id
    `e94941b5-...`) → `allied_faction_points_limit` (500/1000/1500 по `battleSizeId`) →
    `allied_faction_parent_faction_keyword` → `faction_keyword.json` = "Legions of Excess";
    Exalted Patron attach — через `enhancement_bodyguard_group` (`bodyguardType:'leader'`) →
    `enhancement_bodyguard_group_datasheet` → datasheet id = "Flawless Blades". Оба возвращены.
    Fulgrim "Serpentine" ability — проверил и `datasheet_datasheet_ability` join (все 5 abilities
    датащита перечислены явно, Serpentine среди них нет) — этот кусок остался удалён, реально
    нигде не найден. Единственное законное основание оставить контент без явного появления в
    плоском `factions/<slug>.json` — либо corroboration САМИМ appdata (урок 3 — `type:'image'` в
    том же месте; урок 10 — текст под отдельной карточкой того же JSON; урок 13 — найдено в
    `tables/`), либо (в крайнем случае) дословное совпадение с ТОЛЬКО ЧТО скачанным (не
    локальным!) официальным PDF — см. урок 14.
14. **Если контент не находится ни в плоском JSON, ни в `tables/`, и вопрос достаточно важен
    (например, правило легальности ростера) — можно скачать актуальный Faction Pack/Index/Codex
    PDF прямо с `warhammer-community.com` (см. ссылки на странице `/en-gb/downloads/warhammer-40000/`,
    искать через WebSearch по `<faction> Faction Pack pdf warhammer-community.com`, скачивать в
    scratchpad через `curl`, читать `pdftotext -layout`) и свериться с ним напрямую.** Это НЕ то же
    самое, что урок 12 (там — локальный, потенциально устаревший файл); свежая закачка с
    официального сайта — валидный источник, дополняющий appdata, а не заменяющий его как канон.
    Прецедент: deathwatch "Black Spear Task Force" · Mission Tactics `Restrictions:` блок — не
    нашёлся ни в `factions/deathwatch.json`, ни очевидным образом в `tables/`, но дословно совпал
    со свежескачанным `eng_08-06_..._faction_pack_deathwatch...pdf` — оставлен без изменений.

## Что делать дальше

Ждать от пользователя "ещё одну (любую) фракцию", взять следующую из списка выше, повторить
воркфлоу. Когда все 30 фракций закрыты — **удалить этот файл** в финальном коммите (по прецеденту
`DATA-909-TODO.md`), затем спросить пользователя, пушить ли/открывать ли PR.

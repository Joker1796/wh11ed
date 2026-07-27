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
- После фиксов — прогнать оба скрипта повторно (убедиться, что остался только известный шум),
  `npm run build`, закоммитить (`git add -A -- <явные пути>`, не бланково).

## Прогресс (9 фракций закрыты)

✅ leagues-of-votann, dark-angels, blood-angels, deathwatch, genestealer-cults, black-templars,
space-wolves, titan-legions, chaos-knights — все закоммичены (см. `git log
feat/datasheet-drift-fixes`). chaos-titan-legions тоже **проверена и чиста** (без коммита —
дрейфа не найдено).

**Остались 21 фракция** (по возрастанию строк в `src/data/datasheets/*.js`, ориентир для выбора
следующей "любой" фракции): emperors-children, drukhari, adeptus-custodes, imperial-knights,
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

## Что делать дальше

Ждать от пользователя "ещё одну (любую) фракцию", взять следующую из списка выше, повторить
воркфлоу. Когда все 30 фракций закрыты — **удалить этот файл** в финальном коммите (по прецеденту
`DATA-909-TODO.md`), затем спросить пользователя, пушить ли/открывать ли PR.

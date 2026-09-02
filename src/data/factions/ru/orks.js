// Orks — RU overlay. Codex: Orks (app data 946) replaced every detachment, rule,
// stratagem and enhancement in the faction, and this overlay merges into EN by ARRAY
// INDEX, so the previous translation could not survive the rewrite: every entry would
// have landed under a different rule. The prose overlay is therefore empty and the page
// falls back to English — wrong Russian under a right English heading is worse than
// English. Refilling it is the translation pass (DATA-SYNC.md §4c).
//
// The name maps below are keyed by ENGLISH NAME, not by index, so the entries that
// survived the new codex are still correct and are kept. Names introduced by the new
// codex are absent and inherit the English name until the translation pass adds them.

export const armyRuleNameRu = 'Ваааагх!'

export const detNamesRu = {
  'Blitz Brigade': 'Блиц-бригада',
  'Bully Boyz': 'Задиры',
  'Da Big Hunt': 'Большая охота',
  'Dread Mob': 'Грозная банда',
  'Green Tide': 'Зелёный прилив',
  'Kult of Speed': 'Культ скорости',
  'Taktikal Brigade': 'Тактегеская бригада',
  'War Horde': 'Военная орда',
}

export const detRuleNamesRu = {
  'Da Hunt is On': 'Охота началась',
  'Try Dat Button!': 'Жми энту кнопку!',
  'Adrenaline Junkies': 'Адреналиновые торчки',
  'Dakka! Dakka! Dakka!': 'Дакка! Дакка! Дакка!',
}

export const stratNamesRu = {
  'Hulking Brutes': 'Громадные громилы',
  'Too Arrogant to Die': 'Слишком наглы, чтоб сдохнуть',
  'Armed To Da Teef': 'Вооружены до зубов',
  'Instinctive Hunters': 'Инстинктивные охотники',
  'Where D’ya Fink You’re Going?': 'Куды намылился?',
  'Long, Uncontrolled Bursts': 'Долгие неуправляемые очереди',
  'Unbridled Carnage': 'Необузданная резня',
  '’Ere We Go': 'Понеслась!',
  'Dakkastorm': 'Дакка-шторм',
  'Speediest Freeks': 'Быстрейшие чудилы',
  'Orks Is Never Beaten': 'Орков не победить',
}

export const enhNamesRu = {
  'Brutal But Kunnin’': 'Жестокий, но хитрый',
  'Da Gobshot Thunderbuss': 'Тандербас Gobshot',
  'Proper Killy': 'Взаправду убойный',
  'Surly as a Squiggoth': 'Угрюмый, как сквиггот',
  'Glory Hog': 'Хапуга славы',
  'Supa-glowy Fing': 'Супа-светящаяся штуковина',
  'Follow Me Ladz': 'За мной, пацаны!',
  'Headwoppa\'s Killchoppa': 'Смерторуб Хедвоппы',
  'Kunnin’ But Brutal': 'Хитёр, да жесток',
}

// Prose overlay — empty until the translation pass. See the note at the top of the file.
export default {}

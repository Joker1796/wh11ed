import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BasicRulesView from '../views/BasicRulesView.vue'
import BattleRoundView from '../views/BattleRoundView.vue'
import BattlefieldsView from '../views/BattlefieldsView.vue'
import AdvancedRulesView from '../views/AdvancedRulesView.vue'
import ReferenceView from '../views/ReferenceView.vue'
import FilesView from '../views/FilesView.vue'
import OrksLayout from '../views/factions/OrksLayout.vue'
import OrksRulesView from '../views/factions/OrksRulesView.vue'
import OrksFaqView from '../views/factions/OrksFaqView.vue'
import OrksFactionFilesView from '../views/factions/OrksFactionFilesView.vue'
import NecronsLayout from '../views/factions/NecronsLayout.vue'
import NecronsRulesView from '../views/factions/NecronsRulesView.vue'
import NecronsFaqView from '../views/factions/NecronsFaqView.vue'
import NecronsFactionFilesView from '../views/factions/NecronsFactionFilesView.vue'
import SpaceMarinesLayout from '../views/factions/SpaceMarinesLayout.vue'
import SpaceMarinesRulesView from '../views/factions/SpaceMarinesRulesView.vue'
import SpaceMarinesFaqView from '../views/factions/SpaceMarinesFaqView.vue'
import SpaceMarinesFactionFilesView from '../views/factions/SpaceMarinesFactionFilesView.vue'
import FactionStubView from '../views/factions/FactionStubView.vue'

const imperiumFactions = [
  { label: 'Adepta Sororitas',   path: '/factions/adepta-sororitas' },
  { label: 'Adeptus Custodes',   path: '/factions/adeptus-custodes' },
  { label: 'Adeptus Mechanicus', path: '/factions/adeptus-mechanicus' },
  { label: 'Astra Militarum',    path: '/factions/astra-militarum' },
  { label: 'Grey Knights',       path: '/factions/grey-knights' },
  { label: 'Imperial Agents',    path: '/factions/imperial-agents' },
  { label: 'Imperial Knights',   path: '/factions/imperial-knights' },
  { label: 'Space Marines',      path: '/factions/space-marines' },
]

const chaosFactions = [
  { label: 'Chaos Daemons',       path: '/factions/chaos-daemons' },
  { label: 'Chaos Knights',       path: '/factions/chaos-knights' },
  { label: 'Chaos Space Marines', path: '/factions/chaos-space-marines' },
  { label: 'Death Guard',         path: '/factions/death-guard' },
  { label: "Emperor's Children",  path: '/factions/emperors-children' },
  { label: 'Thousand Sons',       path: '/factions/thousand-sons' },
]

const xenosFactions = [
  { label: 'Aeldari',            path: '/factions/aeldari' },
  { label: 'Drukhari',           path: '/factions/drukhari' },
  { label: 'Genestealer Cults',  path: '/factions/genestealer-cults' },
  { label: 'Leagues of Votann',  path: '/factions/leagues-of-votann' },
  { label: 'Necrons',            path: '/factions/necrons' },
  { label: 'Orks',               path: '/factions/orks' },
  { label: "T'au Empire",        path: '/factions/tau-empire' },
  { label: 'Tyranids',           path: '/factions/tyranids' },
]

const factionGroupsEn = [
  { label: 'Imperium',   factions: imperiumFactions },
  { label: 'Chaos',      factions: chaosFactions },
  { label: 'Xenos',      factions: xenosFactions },
]

const imperiumFactionsRu = imperiumFactions.map(f => f.path === '/factions/space-marines' ? { ...f, label: 'Космодесант' } : f)
const xenosFactionsRu = xenosFactions.map(f => f.path === '/factions/orks' ? { ...f, label: 'Орки' } : f)
const factionGroupsRu = [
  { label: 'Imperium',   factions: imperiumFactionsRu },
  { label: 'Chaos',      factions: chaosFactions },
  { label: 'Xenos',      factions: xenosFactionsRu },
]

export const navGroups = [
  { label: 'Introduction',        path: '/',               sections: [] },
  {
    label: 'Basic Rules', path: '/basic-rules',
    sections: [
      { id: 'section-01', label: '01 Core Concepts' },
      { id: 'section-02', label: '02 Datasheets' },
      { id: 'section-03', label: '03 Moving' },
      { id: 'section-04', label: '04 Making Attacks' },
      { id: 'section-05', label: '05 Attack Sequence' },
      { id: 'section-06', label: '06 Other Concepts' },
    ],
  },
  {
    label: 'The Battle Round', path: '/battle-round',
    sections: [
      { id: 'section-07', label: '07 The Battle Round' },
      { id: 'section-08', label: '08 Command Phase' },
      { id: 'section-09', label: '09 Movement Phase' },
      { id: 'section-10', label: '10 Shooting Phase' },
      { id: 'section-11', label: '11 Charge Phase' },
      { id: 'section-12', label: '12 Fight Phase' },
    ],
  },
  {
    label: 'Battlefields & Tactics', path: '/battlefields',
    sections: [
      { id: 'section-13', label: '13 Terrain' },
      { id: 'section-14', label: '14 Objectives' },
      { id: 'section-15', label: '15 Stratagems' },
      { id: 'section-16', label: '16 Actions' },
    ],
  },
  {
    label: 'Advanced Rules', path: '/advanced-rules',
    sections: [
      { id: 'section-17', label: '17 Monsters & Vehicles' },
      { id: 'section-18', label: '18 Transports' },
      { id: 'section-19', label: '19 Attached Units' },
      { id: 'section-20', label: '20 Strategic Reserves' },
      { id: 'section-21', label: '21 Flying & Surging' },
      { id: 'section-22', label: '22 Other Rules' },
      { id: 'section-23', label: '23 Aircraft' },
    ],
  },
  {
    label: 'Reference', path: '/reference',
    sections: [
      { id: 'section-24', label: '24 Core Abilities' },
      { id: 'section-appendix', label: 'Rules Appendix' },
      { id: 'section-faq', label: 'FAQs' },
    ],
  },
  {
    label: 'Factions', path: '/factions',
    factionGroups: factionGroupsEn,
    sections: [],
  },
]

export const navGroupsRu = [
  { label: 'Введение',                  path: '/',               sections: [] },
  {
    label: 'Основные правила', path: '/basic-rules',
    sections: [
      { id: 'section-01', label: '01 Основные концепции' },
      { id: 'section-02', label: '02 Листы данных' },
      { id: 'section-03', label: '03 Перемещение' },
      { id: 'section-04', label: '04 Совершение атак' },
      { id: 'section-05', label: '05 Последовательность атаки' },
      { id: 'section-06', label: '06 Другие концепции' },
    ],
  },
  {
    label: 'Боевой раунд', path: '/battle-round',
    sections: [
      { id: 'section-07', label: '07 Боевой раунд' },
      { id: 'section-08', label: '08 Командная фаза' },
      { id: 'section-09', label: '09 Фаза движения' },
      { id: 'section-10', label: '10 Фаза стрельбы' },
      { id: 'section-11', label: '11 Фаза атаки' },
      { id: 'section-12', label: '12 Фаза ближнего боя' },
    ],
  },
  {
    label: 'Поля сражений и тактика', path: '/battlefields',
    sections: [
      { id: 'section-13', label: '13 Укрытия' },
      { id: 'section-14', label: '14 Цели' },
      { id: 'section-15', label: '15 Стратегемы' },
      { id: 'section-16', label: '16 Задания' },
    ],
  },
  {
    label: 'Продвинутые правила', path: '/advanced-rules',
    sections: [
      { id: 'section-17', label: '17 Монстры и техника' },
      { id: 'section-18', label: '18 Транспорты' },
      { id: 'section-19', label: '19 Составные юниты' },
      { id: 'section-20', label: '20 Стратегические резервы' },
      { id: 'section-21', label: '21 Полёт и рывок' },
      { id: 'section-22', label: '22 Другие правила' },
      { id: 'section-23', label: '23 Авиация' },
    ],
  },
  {
    label: 'Справочный раздел', path: '/reference',
    sections: [
      { id: 'section-24', label: '24 Базовые способности' },
      { id: 'section-appendix', label: 'Приложение к правилам' },
      { id: 'section-faq', label: 'Частые вопросы' },
    ],
  },
  {
    label: 'Фракции', path: '/factions',
    factionGroups: factionGroupsRu,
    sections: [],
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',               component: HomeView },
    { path: '/basic-rules',    component: BasicRulesView },
    { path: '/battle-round',   component: BattleRoundView },
    { path: '/battlefields',   component: BattlefieldsView },
    { path: '/advanced-rules', component: AdvancedRulesView },
    { path: '/reference',      component: ReferenceView },
    { path: '/files',          component: FilesView },
    // Orks — nested routes
    {
      path: '/factions/orks',
      component: OrksLayout,
      redirect: '/factions/orks/rules',
      children: [
        { path: 'rules', component: OrksRulesView },
        { path: 'files', component: OrksFactionFilesView },
        { path: 'faq',   component: OrksFaqView },
      ],
    },
    // Necrons — nested routes
    {
      path: '/factions/necrons',
      component: NecronsLayout,
      redirect: '/factions/necrons/rules',
      children: [
        { path: 'rules', component: NecronsRulesView },
        { path: 'files', component: NecronsFactionFilesView },
        { path: 'faq',   component: NecronsFaqView },
      ],
    },
    // Space Marines — nested routes
    {
      path: '/factions/space-marines',
      component: SpaceMarinesLayout,
      redirect: '/factions/space-marines/rules',
      children: [
        { path: 'rules', component: SpaceMarinesRulesView },
        { path: 'files', component: SpaceMarinesFactionFilesView },
        { path: 'faq',   component: SpaceMarinesFaqView },
      ],
    },
    // Stubs — catch-all dynamic routes
    { path: '/factions/:slug', redirect: to => `/factions/${to.params.slug}/rules` },
    { path: '/factions/:slug/:section', component: FactionStubView },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

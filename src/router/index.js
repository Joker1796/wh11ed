import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BasicRulesView from '../views/BasicRulesView.vue'
import BattleRoundView from '../views/BattleRoundView.vue'
import BattlefieldsView from '../views/BattlefieldsView.vue'
import AdvancedRulesView from '../views/AdvancedRulesView.vue'
import ReferenceView from '../views/ReferenceView.vue'
import EventIntroView from '../views/event/EventIntroView.vue'
import EventSequenceView from '../views/event/EventSequenceView.vue'
import EventLayoutsView from '../views/event/EventLayoutsView.vue'
import EventMatrixView from '../views/event/EventMatrixView.vue'
import EventPairingsView from '../views/event/EventPairingsView.vue'
import EventFaqView from '../views/event/EventFaqView.vue'

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
      { id: 'abilities-list', label: 'Unit Abilities',   filter: 'unit' },
      { id: 'abilities-list', label: 'Weapon Abilities', filter: 'weapon' },
      { id: 'section-appendix', label: 'Rules Appendix' },
      { id: 'section-faq', label: 'FAQs' },
    ],
  },
]

export const navGroupsRu = [
  { label: 'Введение',                  path: '/',               sections: [] },
  {
    label: 'Базовые правила', path: '/basic-rules',
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
      { id: 'section-08', label: '08 Фаза командования' },
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
      { id: 'abilities-list', label: 'Способности юнита',  filter: 'unit' },
      { id: 'abilities-list', label: 'Способности оружия', filter: 'weapon' },
      { id: 'section-appendix', label: 'Приложение к правилам' },
      { id: 'section-faq', label: 'Частые вопросы' },
    ],
  },
]

// Event Companion — second top-level section. Each entry is its own route
// (no in-page anchors), so `sections` is empty and the sidebar navigates on click.
export const eventGroups = [
  { label: 'Introduction',     path: '/event-companion',          sections: [] },
  { label: 'Mission Sequence', path: '/event-companion/sequence', sections: [] },
  { label: 'Terrain Layouts',  path: '/event-companion/layouts',  sections: [] },
  { label: 'Mission Matrix',   path: '/event-companion/matrix',   sections: [] },
  { label: 'Pairings & Rankings', path: '/event-companion/pairings', sections: [] },
  { label: 'Errata & FAQs',    path: '/event-companion/faq',      sections: [] },
]

export const eventGroupsRu = [
  { label: 'Введение',                  path: '/event-companion',          sections: [] },
  { label: 'Последовательность миссии', path: '/event-companion/sequence', sections: [] },
  { label: 'Расстановки тиррейна',      path: '/event-companion/layouts',  sections: [] },
  { label: 'Матрица миссий',            path: '/event-companion/matrix',   sections: [] },
  { label: 'Паринги и ранжирование',    path: '/event-companion/pairings', sections: [] },
  { label: 'Эррата и FAQ',              path: '/event-companion/faq',      sections: [] },
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
    { path: '/event-companion',          component: EventIntroView },
    { path: '/event-companion/sequence', component: EventSequenceView },
    { path: '/event-companion/layouts',  component: EventLayoutsView },
    { path: '/event-companion/matrix',   component: EventMatrixView },
    { path: '/event-companion/pairings', component: EventPairingsView },
    { path: '/event-companion/faq',      component: EventFaqView },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

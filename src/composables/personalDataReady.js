import { stripLocale } from '../router/locale.js'
// Installed by the entry before mounting; both route and dialog imports share this barrier.
let ready = Promise.resolve()
export function setPersonalDataReady(promise) { ready = promise }
export function waitForPersonalData() { return ready }

export function needsPersonalData(path) { return /^\/(?:tracker|roster|account|campaigns)(?:\/|$)/.test(stripLocale(path)) }

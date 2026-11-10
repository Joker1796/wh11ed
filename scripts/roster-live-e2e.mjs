import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { chromium, webkit } from 'playwright-core'
import fs from 'node:fs';import assert from 'node:assert/strict'
for (const [engineName, engine] of [['chrome', chromium], ['webkit', webkit]]) {
const browser=await engine.launch(engineName === 'chrome' ? {channel:'chrome',headless:true} : {headless:true});const out={}
try{
const context=await browser.newContext({viewport:{width:390,height:900}})
await context.addInitScript(()=>{localStorage.setItem('wh11ed-welcome-seen','1');localStorage.setItem('wh11ed-tour-auto','off');if(!localStorage.getItem('probe-seeded')){localStorage.setItem('probe-seeded','1');localStorage.setItem('wh11ed-rosters',JSON.stringify({v:13,rosters:[{id:'blood-tabs',name:'Blood tabs',faction:'chaos-daemons',units:[{uid:'blood',id:'bloodthirster',size:0,wg:[]}],detachments:[],battleSize:'strike-force',createdAt:1,updatedAt:1}]}))}})
const pages=[await context.newPage(),await context.newPage()]
for(const page of pages){await page.goto((process.env.LOCAL_DATA_URL || 'http://localhost:5174') + '/ru/roster/blood-tabs',{waitUntil:'networkidle'});for(let i=0;i<4;i++){const close=page.locator('.modal-overlay .mh-close:visible').first();if(await close.count())await close.click();else break}await page.locator('[data-tour="rl-unit"]').first().click();await page.locator('.ues-sec[data-gi="0"] .opt-select').first().waitFor();await page.evaluate(async()=>{const source=await(await fetch('/src/views/tracker/RosterListView.vue')).text();const url=source.match(/from "([^"\n]*\/useRosters\.js[^"\n]*)"/)[1];const ss=await(await fetch(url)).text();const localUrl=ss.match(/from "([^"\n]*\/localData\.js[^"\n]*)"/)[1];globalThis.probe={store:(await import(url)).useRosters(),local:(await import(localUrl)).localData}})}
const [a,b]=pages;const labels=p=>p.locator('.ues-sec[data-gi="0"] .opt-select').evaluateAll(xs=>xs.map(x=>({text:x.innerText,checked:x.querySelector('input').checked})));const pick=(p,text)=>p.locator('.ues-sec[data-gi="0"] .opt-select').filter({hasText:text}).evaluate(el=>el.click());
out.initial=await labels(a);assert.equal(out.initial.length,3)
await pick(a,'Bloodflail');await a.waitForTimeout(600);assert.equal(await a.evaluate(()=>globalThis.probe.local.flush()),true)
await b.waitForFunction(()=>JSON.stringify(globalThis.probe.store.rosterById('blood-tabs').units[0].wg)==='[[0,0,1]]')
out.cleanB=await labels(b);assert.ok(out.cleanB.find(row=>row.text.includes('Bloodflail')).checked)
await pick(b,'Great axe of Khorne');await pick(a,'Lash of Khorne')
await a.evaluate(()=>{globalThis.probe.store.saveNow()});await a.evaluate(()=>globalThis.probe.local.flush())
await b.waitForFunction(()=>!!globalThis.probe.local.state.conflict)
out.dirtyB=await labels(b);assert.ok(out.dirtyB.find(row=>row.text.includes('Great axe')).checked)
await a.evaluate(() => { globalThis.probe.store.createRoster('Independent new record') })
await a.evaluate(() => globalThis.probe.local.flush())
await b.waitForFunction(() => globalThis.probe.store.rosters.value.some(row => row.name === 'Independent new record'))
assert.ok((await labels(b)).find(row => row.text.includes('Great axe')).checked)
out.conflict=await b.getByRole('dialog').allTextContents();assert.ok(out.conflict.some(t=>t.includes('Сохранено в другой вкладке')))

const migrationContext = await browser.newContext({ viewport: { width: 390, height: 900 } })
await migrationContext.addInitScript(() => {
  localStorage.setItem('wh11ed-welcome-seen', '1')
  localStorage.setItem('wh11ed-tour-auto', 'off')
  if (!localStorage.getItem('legacy-seeded')) {
    localStorage.setItem('legacy-seeded', '1')
    localStorage.setItem('wh11ed-rosters', JSON.stringify({ v: 13, rosters: [{ id: 'old', name: 'Old axe', faction: 'chaos-daemons', dv: 1, units: [{ uid: 'old', id: 'bloodthirster', size: 0, wg: [[0, 0, 1]] }], detachments: [], battleSize: 'strike-force', createdAt: 1, updatedAt: 1 }] }))
  }
})
const migration = await migrationContext.newPage()
await migration.goto((process.env.LOCAL_DATA_URL || 'http://localhost:5174') + '/ru/roster/old', { waitUntil: 'networkidle' })
for (let i = 0; i < 4; i++) {
  const close = migration.locator('.modal-overlay .mh-close:visible').first()
  if (await close.count()) await close.click()
  else break
}
await migration.locator('[data-tour="rl-unit"]').first().click()
await migration.locator('.ues-gear-check:visible').first().waitFor()
assert.match(await migration.locator('.ues-gear-check:visible').first().innerText(), /axe of khorne/)
for (const width of [320, 390, 1440, 390]) {
  await migration.setViewportSize({ width, height: 900 })
  await migration.locator('.ues-gear-check:visible').first().waitFor()
  await migration.waitForTimeout(400)
  const size = await migration.locator('.ues-gear-check:visible').first().evaluate(el => ({ width: el.clientWidth, scroll: el.scrollWidth }))
  assert.ok(size.scroll <= size.width + 1, `recovery notice overflows at ${width}px: ${JSON.stringify(size)}`)
}
await migration.screenshot({ path: join(tmpdir(), `wh-gear-recovery-${engineName}.png`), fullPage: true })
await pick(migration, 'Bloodflail')
await migration.locator('.ues-gear-check').waitFor({ state: 'hidden' })
await migration.waitForTimeout(700)
await migration.reload({ waitUntil: 'networkidle' })
await migration.locator('[data-tour="rl-unit"]').first().click()
assert.ok((await labels(migration)).find(row => row.text.includes('Bloodflail')).checked)
assert.equal(await migration.locator('.ues-gear-check').count(), 0)
await migrationContext.close()
fs.writeFileSync(join(tmpdir(), `wh-live-gear-${engineName}.json`),JSON.stringify(out,null,2));console.log(`${engineName}: atomic bundles, clean refresh, dirty conflict and independent records passed`)
}finally{await browser.close()}

}

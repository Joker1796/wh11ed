// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { checkPair, needsUpgradeWording, rerolls } from './lib/ru-reroll-wording.mjs'

const EN = 'Each time a model attacks, re-roll a Wound roll of 1. If the target is within range of an objective, you can re-roll the Wound roll instead.'
const RU = 'Каждый раз, когда модель атакует, перебросьте бросок на ранение с результатом 1. Если цель в радиусе маркера цели, вы можете вместо этого перебросить любой бросок на ранение.'

describe('Russian re-roll scopes', () => {
  it('requires an explicit unrestricted result on the improved branch', () => {
    expect(checkPair(EN, RU)).toBeNull()
    expect(checkPair(EN, RU.replace('любой ', ''))).not.toBeNull()
    expect(checkPair(EN, RU.replace('любой ', 'один '))).not.toBeNull()
    expect(checkPair(EN, RU.replace('с результатом 1', 'с результатом 2'))).not.toBeNull()
    expect(checkPair(EN, undefined)).not.toBeNull()
  })

  it('compares Hit and Wound separately in a mixed Votann effect', () => {
    const en = 'Re-roll a Hit roll of 1 and re-roll a Wound roll of 1. If you spent YP, you can re-roll a Hit roll of 1 and re-roll the Wound roll instead.'
    const ru = 'Перебросьте бросок на попадание с результатом 1 и бросок на ранение с результатом 1. Если вы потратили YP, вы можете перебросить бросок на попадание с результатом 1 и любой бросок на ранение вместо этого.'
    expect(checkPair(en, ru)).toBeNull()
    expect(checkPair(en, ru.replace('попадание с результатом 1 и любой', 'попадание и любой'))).not.toBeNull()
    expect(checkPair(en, ru.replace('любой бросок на ранение', 'любой бросок на попадание'))).not.toBeNull()
  })

  it('finds upgrades in lists, glosses and prose without instead', () => {
    const en = 'Attacks can:\n▪ Re‑roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ Or: If the target is on an objective, re‐roll **hit rolls**.'
    const ru = 'Атаки могут:\n▪ Перебрасывать **[gloss:hit-roll:броски на попадание]** с результатом 1.\n▪ Или: Если цель у маркера, перебрасывать любые **броски на попадание**.'
    expect(needsUpgradeWording(en)).toBe(true)
    expect(checkPair(en, ru)).toBeNull()
    expect(checkPair(en, ru.replace('любые ', ''))).not.toBeNull()
  })

  it('keeps one roll per shooting sequence distinct from any roll per attack', () => {
    const en = 'When selected to shoot, you can re-roll one Hit roll and one Wound roll.'
    const ru = 'При выборе для стрельбы вы можете перебросить один бросок попадания и один бросок ранения.'
    expect(checkPair(en, ru)).toBeNull()
    expect(checkPair(en, ru.replace('один бросок попадания', 'любой бросок попадания'))).not.toBeNull()
    expect(checkPair(en, ru.replace(' и один бросок ранения', ''))).not.toBeNull()
  })

  it('reads every roll in a single-roll bullet list', () => {
    const en = 'Attacks can re-roll:\n▪ One Hit roll.\n▪ One Wound roll.'
    const ru = 'Атаки могут перебросить:\n▪ Один бросок на попадание.\n▪ Один бросок на ранение.'
    expect(checkPair(en, ru)).toBeNull()
    expect(rerolls(en, 'en')).toHaveLength(2)
    expect(checkPair(en, ru.replace('Один бросок на ранение', 'Любой бросок на ранение'))).not.toBeNull()
  })

  it('does not mistake a modifier or another type of re-roll for an upgrade', () => {
    expect(needsUpgradeWording('Re-roll a Wound roll of 1. If within Flow of Magic, add 1 to the Wound roll instead.')).toBe(false)
    expect(needsUpgradeWording('Re-roll a Hit roll of 1. If losing, re-roll a Hit roll of 1 and re-roll a Wound roll of 1 instead.')).toBe(false)
    expect(needsUpgradeWording('Instead of Fights First, you can re-roll the Hit roll and re-roll a Wound roll of 1.')).toBe(false)
  })

  it('retains restricted ranges and tracker notes with English roll labels', () => {
    expect(rerolls('Re-roll Hit rolls of 1–2.', 'en')).toEqual([{ kind: 'hit', scope: '1-2' }])
    expect(rerolls('Перебросьте броски на попадание с результатом 1 и 2.', 'ru')).toEqual([{ kind: 'hit', scope: '1-2' }])
    expect(checkPair('Re-roll a Hit roll of 1. You can re-roll any Hit roll instead.', 'Перебрасывай Hit roll 1. Можно перебрасывать любой Hit roll.')).toBeNull()
  })

  it('holds all authored upgrade and single-roll fields against their English', () => {
    // Run the actual CLI against disk: hundreds of data modules need no Vite transforms.
    const output = execFileSync(process.execPath, [fileURLToPath(new URL('./check-ru-rerolls.mjs', import.meta.url))], { encoding: 'utf8' })
    expect(output).toMatch(/✓ RU re-roll scopes: [1-9]\d* fields, 0 mismatches/)
  })
})

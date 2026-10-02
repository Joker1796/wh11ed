// A Munitorum Field Manual price note's copy tier — '1st-2nd', '3rd+', '2nd' — as a reader reads
// it: which unit of this datasheet in the army the price applies to. Worded as units, not copies
// (owner, 2026-10-02: «копии 1–2» read as nothing): «1-й и 2-й юнит», «с 3-го юнита». Shared by the
// datasheet card's points table, the patch notes' price changes and the points PDF.
const ORD_EN = { 1: '1st', 2: '2nd', 3: '3rd' }
const ordEn = (n) => ORD_EN[n] || `${n}th`
export function copyTierLabel(tier, locale) {
  const nums = (tier.match(/\d+/g) || []).map(Number)
  const from = tier.includes('+')
  if (locale === 'ru') {
    if (from) return `${nums[0] === 2 ? 'со' : 'с'} ${nums[0]}-го юнита`
    if (nums.length === 1) return `${nums[0]}-й юнит`
    return nums[1] - nums[0] === 1 ? `${nums[0]}-й и ${nums[1]}-й юнит` : `${nums[0]}–${nums[1]}-й юнит`
  }
  if (from) return `from the ${ordEn(nums[0])} unit`
  if (nums.length === 1) return `${ordEn(nums[0])} unit`
  return nums[1] - nums[0] === 1 ? `${ordEn(nums[0])} and ${ordEn(nums[1])} unit` : `${ordEn(nums[0])}–${ordEn(nums[1])} unit`
}

// "6 models" / «6 моделей» — a unit's size, with the Russian plural it takes.
export function modelsLabel(n, locale) {
  if (locale !== 'ru') return `${n} ${n === 1 ? 'model' : 'models'}`
  const d = n % 10
  const dd = n % 100
  const word = d === 1 && dd !== 11 ? 'модель' : d >= 2 && d <= 4 && (dd < 12 || dd > 14) ? 'модели' : 'моделей'
  return `${n} ${word}`
}

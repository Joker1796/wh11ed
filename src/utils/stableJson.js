// The wire identity is independent of property insertion order and matches JSON's undefined rules.
export function stableJson(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return '[' + value.map((v) => v === undefined ? 'null' : stableJson(v)).join(',') + ']'
  return '{' + Object.keys(value).filter((k) => value[k] !== undefined).sort()
    .map((k) => JSON.stringify(k) + ':' + stableJson(value[k])).join(',') + '}'
}

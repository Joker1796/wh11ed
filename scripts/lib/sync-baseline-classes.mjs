// The classes of finding the sync baseline holds — for the report (scripts/sync-baseline-report.mjs)
// and its ratchet test. A class names what kind of disagreement it is, not whether it is fine.
const CLASSES = [
  ['stat', / (M|T|SV|W|LD|OC|A|BS|WS|S|AP|D) differs:/],
  ['statline', /has no matching appdata statline/],
  ['weapon-tags', /tags differ/],
  ['base-invuln', /baseSize differs|invulnerable save differs/],
  ['points', /points differ/],
  ['datasheet-extra', /extra in wh11ed \(not in appdata\): datasheet/],
  ['detachment-extra', /extra in wh11ed \(not in appdata\): detachment|detachment "[^"]*" not found in appdata/],
  ['faction-keyword', /· faction keyword "/],
  ['ability-extra', /extra ability \(not in appdata\)/],
  ['core-faction', /core\/faction differ| (core|faction) abilities differ:/],
  ['wargear-option', /wargear option: text differs/],
  ['enhancement', /enhancement "[^"]*": text differs/],
  ['detachment-rule', /^~ detachment "[^"]*" · rule /],
  ['faction-entity', /^[+-] (missing in wh11ed|extra in wh11ed \(not in appdata\)): (stratagem|enhancement|army rule|detachment rule) /],
  ['stratagem', /stratagem "[^"]*" · [A-Z]+: text differs/],
  ['leader', /· leader: text differs/],
  ['wargear-ability', /wargear ability "[^"]*": text differs/],
  ['datasheet-text', /^~ datasheet "[^"]*" · (composition|ability|rule)/],
  ['army-rule', /^~ army rule /],
  ['core-rule', /^[~+\-?] \d\d(\.\d\d)* "|^- EX |^\+ \d\d missing in wh11ed/],
  ['tracker', /^~ "[^"]*"\.(effect|target|when):/],
  ['event-companion', /appdata container|no matching appdata container|^~ "[^"]*" \(appdata: "[^"]*"\): text differs/],
  ['twist', /^~ twist |^~ "Mirrored World"/],
]

export function baselineClass(key) {
  for (const [name, re] of CLASSES) if (re.test(key)) return name
  return 'other'
}

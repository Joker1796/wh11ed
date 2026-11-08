// Age since an object stopped being shipped, never age since its original S3 upload. Reset the
// clock when a rollback/release uses it again. Unknown objects get a full grace period too.
export function planRetirement({ present, live, previous = {}, now, keepDays }) {
  if (!Number.isFinite(now) || !Number.isFinite(keepDays) || keepDays < 1) throw new Error('Invalid retention window')
  const current = new Set(live)
  const retired = {}
  const remove = []
  for (const key of present) {
    if (!/^(assets|images|releases)\//.test(key) || current.has(key)) continue
    const firstMissing = Number(previous[key])
    const at = firstMissing > 0 && firstMissing <= now ? firstMissing : now
    if (now - at >= keepDays * 864e5) remove.push(key)
    else retired[key] = at
  }
  return { retired, remove }
}

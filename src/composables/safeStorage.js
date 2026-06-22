// localStorage wrapper that never throws. Access to localStorage can raise
// (private mode, disabled storage, exceeded quota, SecurityError in sandboxed
// frames), and several composables read it at module-init time — an unguarded
// throw there crashes the whole app before it mounts. These helpers degrade to
// the fallback instead.
export function getItem(key, fallback = null) {
  try {
    const v = localStorage.getItem(key)
    return v === null ? fallback : v
  } catch {
    return fallback
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

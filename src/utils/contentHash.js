import { stableJson } from './stableJson.js'

export async function contentHash(value) {
  const text = stableJson(value)
  // Secure contexts on the supported browsers have SubtleCrypto. Without it use an exact
  // in-memory comparison; callers must not persist a potentially large plaintext snapshot.
  if (!globalThis.crypto?.subtle) return 'json:' + text
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return 'sha256:' + [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

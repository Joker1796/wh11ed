// Share a roster in a URL. The roster is serialised to compact JSON, deflate-compressed, and
// base64url-encoded, then carried in the URL HASH (`/roster/shared#r=<payload>`) so it never
// reaches the server/CDN. A version prefix picks the decoder: `1.` = deflate-raw, `0.` =
// uncompressed (fallback for engines without CompressionStream — Safari < 16.4).
//
// Only the fields needed to rebuild a roster travel; `summary` is recomputed on open, and the
// roster/unit ids are preserved so leaderOf references stay valid after import.

const PICK = ['name', 'faction', 'detachment', 'battleSize', 'units']

function toPayload(roster) {
  const o = {}
  for (const k of PICK) o[k] = roster[k]
  return o
}

// ── base64url ⇄ bytes / string ──
function bytesToB64url(bytes) {
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
function b64urlToBytes(s) {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'))
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}
const strToB64url = (s) => bytesToB64url(new TextEncoder().encode(s))
const b64urlToStr = (s) => new TextDecoder().decode(b64urlToBytes(s))

async function deflate(str) {
  if (typeof CompressionStream === 'undefined') return null
  const cs = new CompressionStream('deflate-raw')
  const w = cs.writable.getWriter()
  w.write(new TextEncoder().encode(str)); w.close()
  return new Uint8Array(await new Response(cs.readable).arrayBuffer())
}
async function inflate(bytes) {
  const ds = new DecompressionStream('deflate-raw')
  const w = ds.writable.getWriter()
  w.write(bytes); w.close()
  return new TextDecoder().decode(await new Response(ds.readable).arrayBuffer())
}

// Encode a roster to a share payload string (async — compression is stream-based).
export async function encodeRoster(roster) {
  const json = JSON.stringify(toPayload(roster))
  try {
    const bytes = await deflate(json)
    if (bytes) return `1.${bytesToB64url(bytes)}`
  } catch { /* fall through to uncompressed */ }
  return `0.${strToB64url(json)}`
}

// Decode a share payload string back to a roster-shaped object (or null if malformed).
export async function decodeRoster(payload) {
  if (!payload || typeof payload !== 'string') return null
  const dot = payload.indexOf('.')
  if (dot < 1) return null
  const ver = payload.slice(0, dot)
  const body = payload.slice(dot + 1)
  try {
    let json
    if (ver === '1') json = await inflate(b64urlToBytes(body))
    else if (ver === '0') json = b64urlToStr(body)
    else return null
    const obj = JSON.parse(json)
    return obj && Array.isArray(obj.units) ? obj : null
  } catch {
    return null
  }
}

// Build the shareable absolute URL. Origin is passed in (location.origin / SITE_ORIGIN) — never
// hard-code the domain, so the link is valid across the wh11ed.ru → wh-rules.ru move.
export function shareUrl(origin, payload) {
  return `${origin}/roster/shared#r=${payload}`
}

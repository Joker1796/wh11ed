import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { GetObjectCommand, HeadObjectCommand, ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3'

export const STATE_KEY = '.deploy-upload-state.json'
const IMMUTABLE = 'public, max-age=31536000, immutable'
const MONTH = 'public, max-age=2592000'
const HTML = 'text/html; charset=utf-8'
const TYPES = {
  '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json',
  '.html': HTML, '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg',
}

async function walk(root, prefix = '') {
  const entries = await readdir(join(root, prefix), { withFileTypes: true })
  const result = []
  for (const entry of entries) {
    const key = prefix + entry.name
    if (entry.isDirectory()) result.push(...await walk(root, key + '/'))
    else if (entry.isFile()) result.push(key)
    else throw new Error(`Unsupported deploy file: ${key}`)
  }
  return result.sort()
}

export async function planUploads({ phase, dist = 'dist', seo = 'seo-html' }) {
  const jobs = []
  if (phase === 'files') {
    for (const folder of ['assets', 'images', 'releases']) {
      for (const file of await walk(join(dist, folder))) {
        if (file.endsWith('.map') || file.endsWith('.DS_Store')) continue
        jobs.push({ key: `${folder}/${file}`, path: join(dist, folder, file),
          cache: folder === 'images' ? MONTH : IMMUTABLE,
          type: TYPES[extname(file)] || 'application/octet-stream' })
      }
    }
  } else if (phase === 'seo') {
    const routes = (await readFile(join(dist, '.seo-routes.txt'), 'utf8')).split('\n').filter(Boolean)
    if (!routes.length) throw new Error('Empty SEO route list')
    const seen = new Set()
    for (const route of routes) {
      // S3 supports both "factions" and "factions/necrons"; no filesystem mirror is needed.
      if (!/^\/[\w/-]+$/.test(route) || route.includes('//') || route.endsWith('/')) {
        throw new Error(`Invalid SEO route: ${route}`)
      }
      const key = route.slice(1)
      if (seen.has(key)) throw new Error(`Duplicate SEO route: ${route}`)
      seen.add(key)
      const path = join(seo, key + '.html')
      // Preserve the old shell fallback, but only for a genuinely missing generated page.
      try { await readFile(path) } catch (error) {
        if (error.code !== 'ENOENT') throw error
        jobs.push({ key, path: join(dist, 'index.html'), cache: 'no-cache', type: HTML, fallback: true })
        continue
      }
      jobs.push({ key, path, cache: 'no-cache', type: HTML })
    }
  } else throw new Error(`Unknown upload phase: ${phase}`)
  return jobs
}

// Stop assigning work on the first failure, then drain in-flight requests before rejecting.
// The caller must never publish a worker/version while an upload is still running or failed.
export async function runQueue(items, concurrency, task) {
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 40) {
    throw new Error('Upload concurrency must be an integer from 1 to 40')
  }
  let next = 0
  let failure
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (!failure && next < items.length) {
      const item = items[next++]
      try { await task(item) } catch (error) { failure ||= error }
    }
  }))
  if (failure) throw failure
}

function missing(error) { return error.$metadata?.httpStatusCode === 404 }
function etag(value) { return value?.replaceAll('"', '') }

export async function uploadJobs({ client, bucket, jobs, concurrency = 40, dryRun = false, log = console.log }) {
  const remote = new Map()
  let token
  do {
    const page = await client.send(new ListObjectsV2Command({ Bucket: bucket, ContinuationToken: token }))
    for (const object of page.Contents || []) remote.set(object.Key, object)
    token = page.IsTruncated ? page.NextContinuationToken : undefined
    if (page.IsTruncated && !token) throw new Error('Truncated S3 listing without continuation token')
  } while (token)

  let previous = {}
  try {
    const state = await client.send(new GetObjectCommand({ Bucket: bucket, Key: STATE_KEY }))
    const parsed = JSON.parse(await state.Body.transformToString())
    if (parsed.version === 1 && parsed.entries && typeof parsed.entries === 'object') previous = parsed.entries
  } catch (error) {
    if (!missing(error) && !(error instanceof SyntaxError)) throw error
  }
  // Only retain records for objects that still exist (retirement may have pruned old builds).
  const entries = Object.fromEntries(Object.entries(previous).filter(([key]) => remote.has(key)))
  const totals = { uploaded: 0, skipped: 0, bytes: 0, savedBytes: 0, fallback: jobs.filter(j => j.fallback).length }
  await runQueue(jobs, concurrency, async (job) => {
    const body = await readFile(job.path)
    const md5 = createHash('md5').update(body).digest()
    const hash = md5.toString('hex')
    const object = remote.get(job.key)
    const record = previous[job.key]
    let same = false
    if (object?.Size === body.length && etag(object.ETag) === hash) {
      same = record?.hash === hash && record.cache === job.cache && record.type === job.type
      if (!same) {
        // A matching ETag says nothing about HTTP headers. Bootstrap older uploads once;
        // afterwards the bucket-local state avoids thousands of HEAD requests per release.
        try {
          const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: job.key }))
          same = etag(head.ETag) === hash && head.CacheControl === job.cache && head.ContentType === job.type
        } catch (error) { if (!missing(error)) throw error }
      }
    }
    if (same) { totals.skipped++; totals.savedBytes += body.length }
    else {
      if (!dryRun) {
        await client.send(new PutObjectCommand({ Bucket: bucket, Key: job.key, Body: body,
          ContentType: job.type, CacheControl: job.cache, ContentMD5: md5.toString('base64') }))
      }
      totals.uploaded++
      totals.bytes += body.length
    }
    entries[job.key] = { hash, cache: job.cache, type: job.type }
  })
  if (!dryRun) {
    await client.send(new PutObjectCommand({ Bucket: bucket, Key: STATE_KEY,
      Body: JSON.stringify({ version: 1, entries }), ContentType: 'application/json', CacheControl: 'no-cache' }))
  }
  log(`  → ${dryRun ? 'would upload' : 'uploaded'} ${totals.uploaded}, unchanged ${totals.skipped}; ${(totals.bytes / 1048576).toFixed(2)} MiB ${dryRun ? 'to send' : 'sent'}, ${(totals.savedBytes / 1048576).toFixed(2)} MiB saved`)
  if (totals.fallback) log(`  ⚠ ${totals.fallback} route(s) had no generated page — using the plain shell`)
  return totals
}

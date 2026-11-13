// @vitest-environment node
import { afterEach, describe, expect, it } from 'vitest'
import { mkdtemp, mkdir, writeFile, rm, utimes } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import { createServer } from 'node:http'
import { S3Client } from '@aws-sdk/client-s3'
import { planUploads, runQueue, STATE_KEY, uploadJobs } from './lib/deploy-upload.mjs'

const cleanups = []
afterEach(async () => { for (const cleanup of cleanups.splice(0).reverse()) await cleanup() })
const hash = body => createHash('md5').update(body).digest('hex')
const silent = () => {}
async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'wh-deploy-test-'))
  cleanups.push(() => rm(root, { recursive: true, force: true }))
  async function file(name, text) {
    const path = join(root, name)
    await mkdir(join(path, '..'), { recursive: true })
    await writeFile(path, text)
    return path
  }
  return { root, file }
}
function storage(objects = new Map(), state) {
  const calls = []
  return {
    calls, objects,
    async send(command) {
      const input = command.input
      const name = command.constructor.name
      calls.push({ name, ...input })
      if (name === 'ListObjectsV2Command') return { Contents: [...objects].map(([Key, value]) => ({ Key, Size: Buffer.byteLength(value.body), ETag: `"${hash(value.body)}"` })) }
      if (name === 'GetObjectCommand' && state) return { Body: { transformToString: async () => JSON.stringify(state) } }
      if (name === 'GetObjectCommand') throw Object.assign(new Error('missing'), { $metadata: { httpStatusCode: 404 } })
      if (name === 'HeadObjectCommand') {
        const value = objects.get(input.Key)
        return { ETag: `"${hash(value.body)}"`, CacheControl: value.cache, ContentType: value.type }
      }
      if (name === 'PutObjectCommand') {
        objects.set(input.Key, { body: input.Body, cache: input.CacheControl, type: input.ContentType })
        return { ETag: `"${hash(input.Body)}"` }
      }
      throw new Error(name)
    },
  }
}

describe('deploy upload planning', () => {
  it('puts parent and leaf SEO routes in the same queue with their own HTML', async () => {
    const { root, file } = await fixture()
    await file('dist/.seo-routes.txt', '/factions\n/factions/necrons\n/ru/core-rules\n')
    await file('seo/factions.html', 'parent')
    await file('seo/factions/necrons.html', 'child')
    await file('dist/index.html', 'shell')
    const jobs = await planUploads({ phase: 'seo', dist: join(root, 'dist'), seo: join(root, 'seo') })
    expect(jobs.map(j => j.key)).toEqual(['factions', 'factions/necrons', 'ru/core-rules'])
    expect(jobs.map(j => j.fallback || false)).toEqual([false, false, true])
    expect(jobs.every(j => j.cache === 'no-cache' && j.type === 'text/html; charset=utf-8')).toBe(true)
  })
  it.each(['/../secret', '/factions//necrons', '/factions/\n', '/factions\n/factions', ''])('rejects invalid/empty/duplicate routes: %s', async routes => {
    const { root, file } = await fixture()
    await file('dist/.seo-routes.txt', routes)
    await expect(planUploads({ phase: 'seo', dist: join(root, 'dist') })).rejects.toThrow()
  })
  it('preserves cache tiers and excludes maps, mutable entry points and seed files', async () => {
    const { root, file } = await fixture()
    for (const name of ['assets/app.js', 'assets/app.js.map', 'images/unit.webp', 'releases/build/index.html', 'sw.js', '_seed.json']) await file(`dist/${name}`, name)
    const jobs = await planUploads({ phase: 'files', dist: join(root, 'dist') })
    expect(jobs.map(j => j.key)).toEqual(['assets/app.js', 'images/unit.webp', 'releases/build/index.html'])
    expect(jobs.map(j => j.cache)).toEqual(['public, max-age=31536000, immutable', 'public, max-age=2592000', 'public, max-age=31536000, immutable'])
  })
})

describe('content comparison and upload barrier', () => {
  it('accepts 40 concurrent requests and rejects values above the configured ceiling', async () => {
    await expect(runQueue([1], 40, async () => {})).resolves.toBeUndefined()
    await expect(runQueue([1], 41, async () => {})).rejects.toThrow('1 to 40')
  })
  async function jobFixture() {
    const { file } = await fixture()
    return { key: 'images/unit.webp', path: await file('unit.webp', 'same'), cache: 'public, max-age=2592000', type: 'image/webp' }
  }
  it('skips identical content despite a fresh mtime, bootstraps headers once, then uses bucket state', async () => {
    const job = await jobFixture()
    await utimes(job.path, new Date(), new Date())
    const objects = new Map([[job.key, { body: 'same', cache: job.cache, type: job.type }]])
    const client = storage(objects)
    expect(await uploadJobs({ client, bucket: 'test', jobs: [job], log: silent })).toMatchObject({ uploaded: 0, skipped: 1, savedBytes: 4 })
    expect(client.calls.filter(c => c.name === 'HeadObjectCommand')).toHaveLength(1)
    expect(client.calls.filter(c => c.name === 'PutObjectCommand').map(c => c.Key)).toEqual([STATE_KEY])
    const state = JSON.parse(objects.get(STATE_KEY).body)
    const again = storage(objects, state)
    await uploadJobs({ client: again, bucket: 'test', jobs: [job], log: silent })
    expect(again.calls.some(c => c.name === 'HeadObjectCommand')).toBe(false)
  })
  it('uploads same-size changed bytes, repairs headers and restores a missing object despite saved state', async () => {
    const job = await jobFixture()
    for (const value of [{ body: 'diff', cache: job.cache, type: job.type }, { body: 'same', cache: 'no-cache', type: job.type }, null]) {
      const client = storage(new Map(value ? [[job.key, value]] : []), { version: 1, entries: value?.body === 'diff' || !value ? { [job.key]: { hash: hash('same'), cache: job.cache, type: job.type } } : {} })
      expect(await uploadJobs({ client, bucket: 'test', jobs: [job], log: silent })).toMatchObject({ uploaded: 1, skipped: 0 })
      const upload = client.calls.find(c => c.Key === job.key && c.name === 'PutObjectCommand')
      expect(upload.ContentMD5).toBe(createHash('md5').update('same').digest('base64'))
      expect(upload.CacheControl).toBe(job.cache)
    }
  })
  it('dry run never writes objects or state', async () => {
    const job = await jobFixture()
    const client = storage()
    expect(await uploadJobs({ client, bucket: 'test', jobs: [job], dryRun: true, log: silent })).toMatchObject({ uploaded: 1 })
    expect(client.calls.every(c => !c.name.startsWith('Put') && !c.name.startsWith('Delete'))).toBe(true)
  })
  it('does not save successful state after an upload failure', async () => {
    const job = await jobFixture()
    const client = storage()
    const send = client.send.bind(client)
    client.send = async command => {
      if (command.constructor.name === 'PutObjectCommand' && command.input.Key === job.key) throw new Error('503')
      return send(command)
    }
    await expect(uploadJobs({ client, bucket: 'test', jobs: [job], log: silent })).rejects.toThrow('503')
    expect(client.objects.has(STATE_KEY)).toBe(false)
  })
  it('caps concurrency and drains current requests after failure without starting more work', async () => {
    let release
    const blocked = new Promise(resolve => { release = resolve })
    const started = []
    let drained = false
    const work = runQueue([0, 1, 2, 3], 2, async item => {
      started.push(item)
      if (item === 0) throw new Error('failed')
      await blocked
      drained = true
    })
    await Promise.resolve()
    expect(started).toEqual([0, 1])
    release()
    await expect(work).rejects.toThrow('failed')
    expect(drained).toBe(true)
    expect(started).toEqual([0, 1])
  })
  it('handles paginated listings and propagates storage errors instead of assuming an empty bucket', async () => {
    let pages = 0
    const client = storage()
    const send = client.send.bind(client)
    client.send = async command => {
      if (command.constructor.name === 'ListObjectsV2Command') {
        pages++
        return pages === 1 ? { IsTruncated: true, NextContinuationToken: 'next' } : {}
      }
      return send(command)
    }
    await uploadJobs({ client, bucket: 'test', jobs: [], log: silent })
    expect(pages).toBe(2)
    client.send = async () => { throw new Error('AccessDenied') }
    await expect(uploadJobs({ client, bucket: 'test', jobs: [], log: silent })).rejects.toThrow('AccessDenied')
  })
})

it('uses real signed S3 requests, retries a temporary 503, and sends the declared body/headers', async () => {
  const { file } = await fixture()
  const received = []
  let attempts = 0
  const server = createServer(async (req, res) => {
    const parts = []
    for await (const part of req) parts.push(part)
    const body = Buffer.concat(parts)
    received.push({ method: req.method, url: req.url, headers: req.headers, body })
    if (req.method === 'GET' && req.url.includes('list-type=2')) {
      res.setHeader('Content-Type', 'application/xml')
      res.end('<ListBucketResult><IsTruncated>false</IsTruncated></ListBucketResult>')
    } else if (req.method === 'GET') {
      res.writeHead(404, { 'Content-Type': 'application/xml' })
      res.end('<Error><Code>NoSuchKey</Code></Error>')
    } else if (req.url.startsWith('/test/factions') && attempts++ === 0) {
      res.writeHead(503, { 'Content-Type': 'application/xml' })
      res.end('<Error><Code>ServiceUnavailable</Code></Error>')
    } else {
      res.setHeader('ETag', `"${hash(body)}"`)
      res.end()
    }
  })
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve) })
  cleanups.push(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections() }))
  const client = new S3Client({ endpoint: `http://127.0.0.1:${server.address().port}`, region: 'ru-central1', forcePathStyle: true,
    credentials: { accessKeyId: 'test', secretAccessKey: 'test' }, maxAttempts: 2,
    requestChecksumCalculation: 'WHEN_REQUIRED', responseChecksumValidation: 'WHEN_REQUIRED' })
  cleanups.push(() => client.destroy())
  await uploadJobs({ client, bucket: 'test', jobs: [{ key: 'factions/necrons', path: await file('page.html', 'page'), cache: 'no-cache', type: 'text/html; charset=utf-8' }], log: silent })
  expect(attempts).toBe(2)
  const uploads = received.filter(r => r.method === 'PUT')
  expect(uploads.map(r => r.url.split('?')[0])).toEqual(['/test/factions/necrons', '/test/factions/necrons', `/test/${STATE_KEY}`])
  expect(uploads[0].headers['cache-control']).toBe('no-cache')
  expect(uploads[0].headers['content-type']).toBe('text/html; charset=utf-8')
  expect(uploads[0].headers.authorization).toContain('AWS4-HMAC-SHA256')
  expect(uploads[1].body.toString()).toBe('page')
})

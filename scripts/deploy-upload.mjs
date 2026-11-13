import { S3Client } from '@aws-sdk/client-s3'
import { planUploads, uploadJobs } from './lib/deploy-upload.mjs'

const [phase, target, ...flags] = process.argv.slice(2)
if (!/^s3:\/\/[^/]+$/.test(target || '') || flags.some(flag => flag !== '--dry-run')) {
  throw new Error('Usage: node scripts/deploy-upload.mjs files|seo s3://bucket [--dry-run]')
}
const concurrency = Number(process.env.DEPLOY_CONCURRENCY || 40)
if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 40) {
  throw new Error('DEPLOY_CONCURRENCY must be an integer from 1 to 40')
}
const attempts = Number(process.env.AWS_MAX_ATTEMPTS || 10)
if (!Number.isInteger(attempts) || attempts < 1) throw new Error('AWS_MAX_ATTEMPTS must be a positive integer')
// The SDK reads the same AWS_PROFILE/AWS_CONFIG_FILE as the CLI. This dependency is
// deployment-only: it is never imported by the app or included in the browser/PWA.
const client = new S3Client({
  endpoint: process.env.DEPLOY_S3_ENDPOINT || 'https://storage.yandexcloud.net',
  region: process.env.AWS_REGION || 'ru-central1', forcePathStyle: true,
  retryMode: 'adaptive', maxAttempts: attempts,
  requestChecksumCalculation: 'WHEN_REQUIRED', responseChecksumValidation: 'WHEN_REQUIRED',
  requestHandler: { connectionTimeout: 15_000, requestTimeout: 60_000, throwOnRequestTimeout: true },
})
try {
  const jobs = await planUploads({ phase })
  await uploadJobs({ client, bucket: target.slice(5), jobs, concurrency, dryRun: flags.includes('--dry-run') })
} finally { client.destroy() }

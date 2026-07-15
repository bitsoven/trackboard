import env from '#start/env'
import { defineConfig, services } from '@adonisjs/drive'

/**
 * Storage / S3-compatible driver configuration.
 * Points at existing home-lab MinIO via env vars.
 * In test/development without MinIO, falls back to local filesystem.
 *
 * Required env vars for S3:
 *   S3_ENDPOINT, S3_REGION, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY
 */
const driveConfig = defineConfig({
  default: ((env.get('DRIVE_DISK') as string) || 'fs') as 'fs' | 's3',

  services: {
    fs: services.fs({
      location: 'storage/uploads',
      visibility: 'private',
      appUrl: env.get('APP_URL') || 'http://localhost:3333',
    }),

    // S3-compatible (MinIO) — used in production/home-lab
    // Install deps: pnpm add @adonisjs/drive @aws-sdk/client-s3 @aws-sdk/lib-storage
    s3: services.s3({
      credentials: {
        accessKeyId: env.get('S3_ACCESS_KEY_ID') || '',
        secretAccessKey: env.get('S3_SECRET_ACCESS_KEY') || '',
      },
      region: env.get('S3_REGION') || 'us-east-1',
      bucket: env.get('S3_BUCKET') || 'trackboard',
      endpoint: env.get('S3_ENDPOINT') || undefined,
      visibility: 'private',
      forcePathStyle: env.get('S3_FORCE_PATH_STYLE') ?? true,
    }),
  },
})

export default driveConfig

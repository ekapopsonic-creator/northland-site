import path from 'path'
import { fileURLToPath } from 'url'

import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import { s3Storage } from '@payloadcms/storage-s3'
import { en } from '@payloadcms/translations/languages/en'
import { th } from '@payloadcms/translations/languages/th'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { CVFiles } from './collections/CVFiles'
import { Leads } from './collections/Leads'
import { Projects } from './collections/Projects'
import { Promotions } from './collections/Promotions'
import { Posts } from './collections/Posts'
import { ProgressUpdates } from './collections/ProgressUpdates'
import { Jobs } from './collections/Jobs'
import { JobApplications } from './collections/JobApplications'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Northland Admin',
    },
    dateFormat: 'd MMM yyyy HH:mm',
  },
  collections: [
    Leads,
    Projects,
    Promotions,
    Posts,
    ProgressUpdates,
    Jobs,
    JobApplications,
    CVFiles,
    Media,
    Users,
  ],
  editor: lexicalEditor(),
  i18n: {
    fallbackLanguage: 'th',
    supportedLanguages: { en, th },
  },
  localization: {
    locales: [
      { label: 'ไทย', code: 'th' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'th',
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // โหมด dev บนเครื่อง (ไม่ต้องมี Supabase): ตั้ง USE_LOCAL_SQLITE=true ใน .env
  // Production (NODE_ENV=production เช่นบน Vercel) ใช้ PostgreSQL เสมอ — กัน SQLite หลุดขึ้น production
  db:
    process.env.USE_LOCAL_SQLITE === 'true' && process.env.NODE_ENV !== 'production'
      ? sqliteAdapter({
          client: { url: 'file:./northland-dev.db' },
        })
      : postgresAdapter({
          pool: {
            connectionString: process.env.DATABASE_URI || '',
          },
        }),
  sharp,
  ...(process.env.RESEND_API_KEY
    ? {
        email: resendAdapter({
          defaultFromAddress: process.env.EMAIL_FROM || 'noreply@northland.co.th',
          defaultFromName: process.env.EMAIL_FROM_NAME || 'Northland Development',
          apiKey: process.env.RESEND_API_KEY,
        }),
      }
    : {}),
  plugins: [
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: {
              media: true,
              'cv-files': true,
            },
            bucket: process.env.S3_BUCKET,
            config: {
              endpoint: process.env.S3_ENDPOINT,
              region: 'auto',
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
              forcePathStyle: true,
            },
          }),
        ]
      : []),
  ],
})

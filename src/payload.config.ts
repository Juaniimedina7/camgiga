import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { es } from '@payloadcms/translations/languages/es'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Brands } from './collections/Brands'
import { Products } from './collections/Products'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Conexión DIRECTA (non-pooling) de Neon: el endpoint pooled (PgBouncer) rompe
// los prepared statements de Payload/Drizzle en el runtime serverless de Vercel.
const connectionString =
  process.env.DATABASE_URI ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  ''

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: '— CAMGIGA',
    },
  },
  collections: [Products, Categories, Brands, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: { connectionString },
  }),
  sharp,
  // Panel de administración en español.
  i18n: {
    supportedLanguages: { es },
    fallbackLanguage: 'es',
  },
  plugins: [
    // Las fotos se guardan en Vercel Blob (el filesystem de Vercel es efímero).
    // Si no hay token, cae al almacenamiento local (útil en desarrollo).
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      // Sube directo del navegador a Blob: evita el límite de 4.5MB de las
      // Functions de Vercel (clave para el video).
      clientUploads: true,
    }),
  ],
})

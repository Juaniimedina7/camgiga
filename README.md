# CAMGIGA — Sitio web

Repuestos para camiones. **Next.js (App Router) + Payload CMS + Postgres (Neon) + Vercel Blob**, en Vercel.

- Sitio público: `src/app/(frontend)` — Inicio, Catálogo, Categoría, Ficha, Nosotros, Contacto.
- Panel de administración (el cliente carga productos): `/admin` — `src/app/(payload)`.
- Colecciones del CMS: `src/collections` (Products, Categories, Brands, Media, Users).
- Diseño y textos: `docs/DISENO-CAMGIGA.md`.

## Puesta en marcha

1. **Base de datos + Blob (Vercel).** Necesita tu cuenta de Vercel:
   ```bash
   vercel login
   vercel link                       # crear/enlazar el proyecto
   vercel integration add neon --yes # Postgres (inyecta DATABASE_URL/POSTGRES_URL)
   vercel blob create-store camgiga  # fotos (inyecta BLOB_READ_WRITE_TOKEN)
   vercel env pull .env              # trae las variables a local
   ```
   > Si `vercel env pull` deja la var como `POSTGRES_URL`/`DATABASE_URL`, ya está: el código
   > (`src/payload.config.ts`) lee cualquiera de `DATABASE_URI` / `POSTGRES_URL` / `DATABASE_URL`.

2. **Instalar y correr:**
   ```bash
   npm install
   npm run dev
   ```
   - Sitio: http://localhost:3000
   - Admin: http://localhost:3000/admin (crear el primer usuario)

3. **Cargar datos de ejemplo (opcional):**
   ```bash
   npm run seed   # categorías, marcas y ~6 productos de muestra
   ```

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Desarrollo |
| `npm run build` / `npm start` | Producción |
| `npm run generate:types` | Regenera `src/payload-types.ts` tras tocar colecciones |
| `npm run generate:importmap` | Regenera el import map del admin |
| `npm run seed` | Carga inicial de datos |

## Deploy

`vercel deploy` (preview) / `vercel deploy --prod`. Las variables ya quedan en el proyecto tras el paso 1.

## Notas

- Sin precios: todo se vende por consulta. El CTA es **WhatsApp** (link con el nombre y código ya escritos).
- Formulario de contacto: arma el mensaje y abre WhatsApp (no persiste).
- Paleta (naranja industrial + navy) y tipografía (Barlow + Inter) en `src/app/(frontend)/globals.css`.

import type { MetadataRoute } from 'next'
import { getCategories, getProducts } from '../lib/data'

const BASE = 'https://www.camgiga.com.ar'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const estaticas: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/catalogo`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/nosotros`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contacto`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/privacidad`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  // Si la base no responde, el sitemap igual sale con las rutas estáticas.
  const [categories, productos] = await Promise.all([
    getCategories().catch(() => []),
    getProducts({ limit: 2000 }).then((r) => r.docs).catch(() => []),
  ])

  const cats: MetadataRoute.Sitemap = categories
    .filter((c) => c.slug)
    .map((c) => ({
      url: `${BASE}/categorias/${c.slug}`,
      lastModified: c.updatedAt ? new Date(c.updatedAt) : undefined,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  const prods: MetadataRoute.Sitemap = productos
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${BASE}/producto/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
      changeFrequency: 'weekly',
      priority: 0.6,
    }))

  return [...estaticas, ...cats, ...prods]
}

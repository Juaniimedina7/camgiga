import { getPayload, type Where } from 'payload'
import config from '@payload-config'
import type { Product, Category, Brand } from '../payload-types'

const payloadPromise = getPayload({ config })

export async function getClient() {
  return payloadPromise
}

export async function getCategories(soloInicio = false): Promise<Category[]> {
  const payload = await getClient()
  const res = await payload.find({
    collection: 'categories',
    where: soloInicio ? { destacadaEnInicio: { equals: true } } : {},
    sort: 'orden',
    depth: 1,
    limit: 100,
  })
  return res.docs
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const payload = await getClient()
  const res = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  return res.docs[0] ?? null
}

export async function getBrands(): Promise<Brand[]> {
  const payload = await getClient()
  const res = await payload.find({ collection: 'brands', sort: 'nombre', depth: 1, limit: 200 })
  return res.docs
}

export type ProductFilters = {
  q?: string
  categoria?: string // slug
  marca?: string // slug
  camion?: string
  tipo?: string
  destacado?: boolean
  page?: number
  limit?: number
}

export async function getProducts(filters: ProductFilters = {}) {
  const payload = await getClient()
  const and: Where[] = []

  if (filters.q) {
    and.push({
      or: [
        { nombre: { like: filters.q } },
        { codigo: { like: filters.q } },
        { numeroParte: { like: filters.q } },
      ],
    })
  }
  if (filters.categoria) and.push({ 'categoria.slug': { equals: filters.categoria } })
  if (filters.marca) and.push({ 'marca.slug': { equals: filters.marca } })
  if (filters.camion) and.push({ marcasCamion: { in: [filters.camion] } })
  if (filters.tipo) and.push({ tipo: { equals: filters.tipo } })
  if (filters.destacado) and.push({ destacado: { equals: true } })

  const res = await payload.find({
    collection: 'products',
    where: and.length ? { and } : {},
    sort: 'nombre',
    depth: 2,
    page: filters.page ?? 1,
    limit: filters.limit ?? 24,
  })
  return res
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const payload = await getClient()
  const res = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return res.docs[0] ?? null
}

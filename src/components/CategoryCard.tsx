import Link from 'next/link'
import type { Category } from '../payload-types'
import { mediaUrl, mediaAlt } from '../lib/media'
import { CogIcon } from './icons'

// Acepta una Category del CMS o un tile de respaldo { nombre, slug }.
type Tile = { nombre: string; slug?: string | null; imagen?: Category['imagen'] }

export function CategoryCard({ category }: { category: Tile }) {
  const img = mediaUrl(category.imagen, 'card')
  return (
    <Link href={`/categorias/${category.slug}`} className="cat-card">
      <span className="cat-card__media">
        {img ? (
          <img className="cat-card__img" src={img} alt={mediaAlt(category.imagen, category.nombre)} loading="lazy" />
        ) : (
          <CogIcon className="cat-card__icon" />
        )}
      </span>
      <span className="cat-card__name">{category.nombre}</span>
    </Link>
  )
}

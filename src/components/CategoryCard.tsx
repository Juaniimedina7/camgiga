import Link from 'next/link'
import type { Category } from '../payload-types'
import { mediaUrl, mediaAlt } from '../lib/media'

export function CategoryCard({ category }: { category: Category }) {
  const img = mediaUrl(category.imagen, 'card')
  return (
    <Link href={`/categorias/${category.slug}`} className="cat-card">
      {img ? <img className="cat-card__img" src={img} alt={mediaAlt(category.imagen, category.nombre)} loading="lazy" /> : null}
      <span>{category.nombre}</span>
    </Link>
  )
}

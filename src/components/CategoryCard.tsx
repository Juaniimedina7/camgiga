import Link from 'next/link'
import type { Category } from '../payload-types'
import { mediaUrl, mediaAlt } from '../lib/media'
import { categoryPreview } from '../lib/preview'
import { SmartImg } from './SmartImg'
import { CogIcon } from './icons'

type Tile = { nombre: string; slug?: string | null; imagen?: Category['imagen'] }

export function CategoryCard({ category }: { category: Tile }) {
  // Foto del CMS si existe; si no, imagen de preview; si falla, ícono.
  const cmsImg = mediaUrl(category.imagen, 'card')
  const img = cmsImg || categoryPreview(category.slug)
  return (
    <Link href={`/categorias/${category.slug}`} className="cat-card">
      <span className="cat-card__media">
        <SmartImg
          src={img}
          alt={mediaAlt(category.imagen, category.nombre)}
          className={`cat-card__img${cmsImg ? '' : ' prev-img'}`}
          fallback={<CogIcon className="cat-card__icon" />}
        />
      </span>
      <span className="cat-card__name">{category.nombre}</span>
    </Link>
  )
}

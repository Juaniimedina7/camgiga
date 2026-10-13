import Link from 'next/link'
import type { Category } from '../payload-types'
import { mediaUrl, mediaAlt } from '../lib/media'
import { categoryImg, categoryPreview } from '../lib/preview'
import { SmartImg } from './SmartImg'
import { CogIcon } from './icons'

type Tile = { nombre: string; slug?: string | null; imagen?: Category['imagen'] }

export function CategoryCard({ category }: { category: Tile }) {
  // Prioridad: foto del CMS > imagen local de la categoría > preview genérico.
  const cmsImg = mediaUrl(category.imagen, 'card')
  const local = categoryImg(category.slug)
  const img = cmsImg || local || categoryPreview(category.slug)
  const isPreview = !cmsImg && !local // solo el preview genérico va en gris
  return (
    <Link href={`/categorias/${category.slug}`} className="cat-card">
      <span className="cat-card__media">
        <SmartImg
          src={img}
          alt={mediaAlt(category.imagen, category.nombre)}
          className={`cat-card__img cat-img-${category.slug ?? ''}${isPreview ? ' prev-img' : ''}`}
          fallback={<CogIcon className="cat-card__icon" />}
        />
      </span>
      <span className="cat-card__name">{category.nombre}</span>
    </Link>
  )
}

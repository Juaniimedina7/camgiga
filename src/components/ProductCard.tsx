import Link from 'next/link'
import type { Product } from '../payload-types'
import { mediaUrl, mediaAlt } from '../lib/media'
import { AvailabilityBadge } from './AvailabilityBadge'
import { whatsappLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons'

export function ProductCard({ product }: { product: Product }) {
  const first = Array.isArray(product.imagenes) ? product.imagenes[0] : product.imagenes
  const img = mediaUrl(first, 'card')
  const marca = typeof product.marca === 'object' && product.marca ? product.marca.nombre : null
  const wa = whatsappLink({ nombre: product.nombre, codigo: product.codigo ?? undefined })

  return (
    <div className="product-card">
      <Link href={`/producto/${product.slug}`} className="product-card__media" aria-label={product.nombre}>
        {img ? (
          <img src={img} alt={mediaAlt(first, product.nombre)} loading="lazy" />
        ) : (
          <span className="product-card__ph">Sin foto</span>
        )}
      </Link>
      <div className="product-card__body">
        <Link href={`/producto/${product.slug}`} className="product-card__name">
          {product.nombre}
        </Link>
        <div className="product-card__meta">
          {product.codigo ? <span>Cód: {product.codigo}</span> : null}
          {marca ? <span> · {marca}</span> : null}
        </div>
        <AvailabilityBadge value={product.disponibilidad} />
        <div className="product-card__foot">
          <a className="btn btn--wa btn--block" href={wa} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="wa-ic" /> Consultar
          </a>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '../../../../lib/data'
import { mediaUrl, mediaAlt } from '../../../../lib/media'
import { AvailabilityBadge } from '../../../../components/AvailabilityBadge'
import { WhatsAppButton } from '../../../../components/WhatsAppButton'
import { ProductCard } from '../../../../components/ProductCard'
import { CONTACTO } from '../../../../lib/constants'
import type { Product } from '../../../../payload-types'

export const revalidate = 300

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const p = await getProductBySlug(slug).catch(() => null)
  if (!p) return { title: 'Producto' }
  const camiones = (p.marcasCamion ?? []).join(', ')
  return {
    title: `${p.nombre}${p.codigo ? ` ${p.codigo}` : ''}`,
    description: `${p.nombre}${camiones ? ` para ${camiones}` : ''}. Estado ${p.tipo}. Consultá disponibilidad y envíos por WhatsApp en CAMGIGA.`,
  }
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params
  const p = await getProductBySlug(slug).catch(() => null)
  if (!p) notFound()

  const imgs = (Array.isArray(p.imagenes) ? p.imagenes : p.imagenes ? [p.imagenes] : []) as Product['imagenes']
  const gallery = (imgs as any[]) ?? []
  const mainUrl = mediaUrl(gallery[0], 'full')
  const marca = typeof p.marca === 'object' && p.marca ? p.marca.nombre : null
  const cat = typeof p.categoria === 'object' && p.categoria ? p.categoria : null
  const despieceUrl = mediaUrl(p.despiece, 'full')
  const relacionados = (Array.isArray(p.relacionados) ? p.relacionados : []).filter(
    (r): r is Product => typeof r === 'object' && r !== null,
  )
  const emailHref = `mailto:${CONTACTO.email}?subject=${encodeURIComponent(
    `Consulta: ${p.nombre}${p.codigo ? ` (${p.codigo})` : ''}`,
  )}&body=${encodeURIComponent(`Hola, quiero consultar por ${p.nombre}${p.codigo ? ` (Cód: ${p.codigo})` : ''}.`)}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.nombre,
    sku: p.codigo || p.numeroParte || undefined,
    mpn: p.numeroParte || undefined,
    category: cat?.nombre,
    brand: marca ? { '@type': 'Brand', name: marca } : undefined,
    description: p.descripcion || undefined,
    image: mainUrl ? [mainUrl] : undefined,
  }

  return (
    <section className="section">
      <div className="container">
        <p className="breadcrumb">
          <a href="/">Inicio</a> › <a href="/catalogo">Catálogo</a>
          {cat ? <> › <a href={`/categorias/${cat.slug}`}>{cat.nombre}</a></> : null} › {p.nombre}
        </p>

        <div className="pdp">
          {/* GALERÍA */}
          <div className="pdp__gallery">
            {mainUrl ? (
              <a href={mainUrl} target="_blank" rel="noopener noreferrer">
                <img src={mainUrl} alt={mediaAlt(gallery[0], p.nombre)} />
              </a>
            ) : (
              <div style={{ aspectRatio: '1/1', background: 'var(--surface-alt)', borderRadius: 'var(--radius)', display: 'grid', placeItems: 'center', color: 'var(--muted)' }}>Sin foto</div>
            )}
            {gallery.length > 1 ? (
              <div className="pdp__thumbs">
                {gallery.map((g, i) => {
                  const t = mediaUrl(g, 'thumbnail')
                  return t ? (
                    <a key={i} href={mediaUrl(g, 'full') || t} target="_blank" rel="noopener noreferrer">
                      <img src={t} alt={mediaAlt(g, `${p.nombre} ${i + 1}`)} loading="lazy" />
                    </a>
                  ) : null
                })}
              </div>
            ) : null}
          </div>

          {/* INFO + CTA */}
          <div className="pdp__info">
            <h1>{p.nombre}</h1>
            <p className="pdp__code">
              {p.codigo ? <>Código: <b>{p.codigo}</b></> : null}
              {marca ? <> · Marca: <b>{marca}</b></> : null}
              {p.tipo ? <> · <span className="badge badge--tipo">{p.tipo === 'original' ? 'Original' : 'Alternativo'}</span></> : null}
            </p>
            <div className="mt-1"><AvailabilityBadge value={p.disponibilidad} /></div>

            <div className="pdp__cta">
              <WhatsAppButton nombre={p.nombre} codigo={p.codigo ?? undefined} block lg />
              <a className="btn btn--outline btn--block" href={emailHref}>Consultar por email</a>
            </div>

            {p.aplicacion?.length ? (
              <div className="pdp__spec">
                <h2>Compatible con</h2>
                <ul>
                  {p.aplicacion.map((a, i) => <li key={i}>{a.modelo}</li>)}
                </ul>
              </div>
            ) : null}

            {p.marcasCamion?.length ? (
              <div className="pdp__spec">
                <h2>Marcas de camión</h2>
                <p className="muted">{p.marcasCamion.join(' · ')}</p>
              </div>
            ) : null}
          </div>
        </div>

        {/* DESCRIPCIÓN + DESPIECE */}
        {(p.descripcion || despieceUrl) ? (
          <div className="pdp__spec" style={{ marginTop: '2rem' }}>
            {p.descripcion ? (<><h2>Descripción</h2><p>{p.descripcion}</p></>) : null}
            {despieceUrl ? (
              <a className="btn btn--outline mt-1" href={despieceUrl} target="_blank" rel="noopener noreferrer">Ver despiece</a>
            ) : null}
          </div>
        ) : null}

        {/* RELACIONADOS */}
        {relacionados.length ? (
          <div style={{ marginTop: '2.5rem' }}>
            <h2 className="section__title">También te puede servir</h2>
            <div className="grid grid--products">
              {relacionados.map((r) => <ProductCard key={r.id} product={r} />)}
            </div>
          </div>
        ) : null}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  )
}

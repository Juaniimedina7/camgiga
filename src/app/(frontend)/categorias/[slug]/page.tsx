import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getProducts } from '../../../../lib/data'
import { mediaUrl, mediaAlt } from '../../../../lib/media'
import { ProductCard } from '../../../../components/ProductCard'
import { WhatsAppButton } from '../../../../components/WhatsAppButton'

export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const cat = await getCategoryBySlug(slug).catch(() => null)
  if (!cat) return { title: 'Categoría' }
  return {
    title: cat.nombre,
    description: cat.descripcion || `${cat.nombre} para camiones. Originales y alternativos. Consultá disponibilidad por WhatsApp en CAMGIGA.`,
  }
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params
  const cat = await getCategoryBySlug(slug).catch(() => null)
  if (!cat) notFound()

  const result = await getProducts({ categoria: slug, limit: 48 }).catch(() => null)
  const docs = result?.docs ?? []
  const banner = mediaUrl(cat.imagen, 'full')

  return (
    <section className="section">
      <div className="container">
        <p className="breadcrumb"><a href="/">Inicio</a> › <a href="/catalogo">Catálogo</a> › {cat.nombre}</p>

        {banner ? (
          <img src={banner} alt={mediaAlt(cat.imagen, cat.nombre)} style={{ borderRadius: 'var(--radius)', marginBottom: '1rem', maxHeight: 280, width: '100%', objectFit: 'cover' }} />
        ) : null}

        <h1>{cat.nombre}</h1>
        {cat.descripcion ? <p className="lead">{cat.descripcion}</p> : null}
        {cat.modelos ? <p className="muted mb-2"><b>Modelos que cubrimos:</b> {cat.modelos}</p> : null}

        {docs.length ? (
          <div className="grid grid--products mt-2">
            {docs.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="stack mt-2">
            <p>Todavía no cargamos productos en esta categoría. Escribinos y te decimos qué tenemos.</p>
            <WhatsAppButton mensaje={`Hola CAMGIGA, quiero consultar por productos de ${cat.nombre}.`} />
          </div>
        )}
      </div>
    </section>
  )
}

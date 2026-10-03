import Link from 'next/link'
import { getCategories, getProducts } from '../../lib/data'
import { CategoryCard } from '../../components/CategoryCard'
import { ProductCard } from '../../components/ProductCard'
import { SearchBar } from '../../components/SearchBar'
import { WhatsAppButton } from '../../components/WhatsAppButton'
import { MARCAS_REPUESTO, RESENIAS, RESENIAS_RATING } from '../../lib/constants'

// ISR: se renderiza una vez y se sirve cacheado desde el CDN.
// Escala a cualquier cantidad de visitas sin golpear la base en cada request.
export const revalidate = 300

export default async function HomePage() {
  const [categories, destacados] = await Promise.all([
    getCategories(true).catch(() => []),
    getProducts({ destacado: true, limit: 8 }).then((r) => r.docs).catch(() => []),
  ])

  const logos = MARCAS_REPUESTO.slice(0, 6)
  const estrellas = '★'.repeat(Math.round(RESENIAS_RATING.puntaje))

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <p className="hero__eyebrow">CAMGIGA SRL · Lanús, Buenos Aires</p>
            <h1>Más de 25 años potenciando tu camino.</h1>
            <p className="hero__sub">
              Especialistas en tren motriz para camiones, maquinaria agrícola y colectivos.
              Primeras marcas, amplio stock y envíos a todo el país.
            </p>
            <div className="hero__search">
              <SearchBar hero />
              <div className="search-tabs" aria-hidden="true">
                <span className="search-tab search-tab--on">Por camión</span>
                <span className="search-tab">Por caja o diferencial</span>
                <span className="search-tab">Por número de parte</span>
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <div className="ph ph--hero">Imagen (próximamente)</div>
          </div>
        </div>
      </section>

      {/* BANDA DE STOCK */}
      <section className="band">
        <div className="container band__inner">
          <div>
            <h2 className="band__title">Amplio stock permanente</h2>
            <p className="band__text">Cajas de velocidades, diferenciales, embragues, palieres y mucho más. Originales y alternativos.</p>
          </div>
          <WhatsAppButton lg mensaje="Hola CAMGIGA, quería consultar por disponibilidad de stock.">Consultanos</WhatsAppButton>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="section reveal" id="categorias">
        <div className="container">
          <div className="row-between section__title">
            <h2>¿Qué estás buscando?</h2>
            <Link className="btn btn--outline" href="/catalogo">Ver todo el catálogo</Link>
          </div>
          {categories.length ? (
            <div className="grid grid--cats">
              {categories.map((c) => (
                <CategoryCard key={c.id} category={c} />
              ))}
            </div>
          ) : (
            <p className="muted">Cargá categorías desde el panel de administración para verlas acá.</p>
          )}
        </div>
      </section>

      {/* QUIÉNES SOMOS + MARCAS (logos placeholder) */}
      <section className="section section--alt reveal" id="marcas">
        <div className="container about">
          <div>
            <p className="eyebrow">Quiénes somos</p>
            <h2>Desde hace más de 25 años, sinónimo de confianza en repuestos.</h2>
            <p className="lead">
              Importamos, exportamos y distribuimos repuestos originales y alternativos de las
              primeras marcas. Trabajamos para que los vehículos no paren.
            </p>
            <div className="mt-2" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <WhatsAppButton>Contactanos</WhatsAppButton>
              <Link className="btn btn--outline" href="/nosotros">Conocé la empresa</Link>
            </div>
          </div>
          <div className="about__brands">
            <p className="eyebrow">Trabajamos las primeras marcas</p>
            <div className="logos">
              {logos.map((m) => <div key={m} className="logo-ph">{m}</div>)}
            </div>
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      {destacados.length ? (
        <section className="section reveal">
          <div className="container">
            <div className="row-between section__title">
              <h2>Productos destacados</h2>
              <Link className="btn btn--outline" href="/catalogo">Ver todos</Link>
            </div>
            <div className="grid grid--products">
              {destacados.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      ) : null}

      {/* NÚMEROS / TRAYECTORIA */}
      <section className="stats-band reveal">
        <div className="container stats">
          <div className="stat"><span className="stat__num">25+</span><span className="stat__label">Años de trayectoria</span></div>
          <div className="stat"><span className="stat__num">175+</span><span className="stat__label">Repuestos en catálogo</span></div>
          <div className="stat"><span className="stat__num">100%</span><span className="stat__label">Primeras marcas</span></div>
          <div className="stat"><span className="stat__num">País</span><span className="stat__label">Envíos a todo el país</span></div>
        </div>
      </section>

      {/* RESEÑAS */}
      <section className="section reveal">
        <div className="container">
          <div className="reviews-head">
            <h2 style={{ margin: 0 }}>Lo que dicen nuestros clientes</h2>
            <span className="stars" aria-hidden="true">{estrellas}</span>
            <span className="muted">{RESENIAS_RATING.puntaje} · {RESENIAS_RATING.cantidad} reseñas</span>
          </div>
          <div className="grid grid--reviews">
            {RESENIAS.map((r) => (
              <figure key={r.autor} className="review-card">
                <span className="stars" aria-hidden="true">★★★★★</span>
                <blockquote className="review-card__text">“{r.texto}”</blockquote>
                <figcaption>
                  <div className="review-card__author">{r.autor}</div>
                  <div className="review-card__empresa">{r.empresa}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section">
        <div className="container">
          <div className="cta-block">
            <h2>¿No encontrás el repuesto que necesitás?</h2>
            <p>Contanos qué buscás y te asesoramos. Tenemos la pieza que nadie consiguió.</p>
            <div className="mt-2" style={{ display: 'inline-flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <WhatsAppButton lg />
              <Link className="btn btn--outline btn--lg" href="/catalogo" style={{ background: '#fff' }}>Ver catálogo</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

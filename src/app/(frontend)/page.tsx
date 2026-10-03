import Link from 'next/link'
import { getCategories, getProducts } from '../../lib/data'
import { CategoryCard } from '../../components/CategoryCard'
import { ProductCard } from '../../components/ProductCard'
import { WhatsAppButton } from '../../components/WhatsAppButton'
import { CATEGORIAS_FALLBACK, MARCAS_REPUESTO, RESENIAS, RESENIAS_RATING } from '../../lib/constants'

// ISR: se renderiza una vez y se sirve cacheado desde el CDN.
// Escala a cualquier cantidad de visitas sin golpear la base en cada request.
export const revalidate = 300

export default async function HomePage() {
  const [categories, destacados] = await Promise.all([
    getCategories(true).catch(() => []),
    getProducts({ destacado: true, limit: 8 }).then((r) => r.docs).catch(() => []),
  ])

  const cats = categories.length ? categories : CATEGORIAS_FALLBACK
  const logos = MARCAS_REPUESTO.slice(0, 6)
  const estrellas = '★'.repeat(Math.round(RESENIAS_RATING.puntaje))

  return (
    <>
      {/* HERO — tesis: el eslogan de la empresa, grande y condensado */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__grain" aria-hidden="true" />
        <div className="container hero__inner">
          <p className="hero__eyebrow"><span className="hero__dot" />Tren motriz · 25 años · Lanús, Buenos Aires</p>
          <h1 className="hero__title">
            <span>Tenemos la pieza</span>
            <span>que nadie</span>
            <span className="hero__accent">consiguió.</span>
          </h1>
          <p className="hero__sub">
            Cajas, diferenciales y embragues para camiones, maquinaria agrícola y colectivos.
            Primeras marcas, amplio stock y envíos a todo el país.
          </p>

          {/* Buscador de repuestos */}
          <div className="finder">
            <div className="finder__tabs" aria-hidden="true">
              <span className="finder__tab finder__tab--on">Por camión</span>
              <span className="finder__tab">Por caja o diferencial</span>
              <span className="finder__tab">Por número de parte</span>
            </div>
            <form className="finder__form" action="/catalogo" method="get" role="search">
              <input className="finder__input" type="text" name="q" placeholder="Buscá: Eaton 4205, diferencial Meritor, embrague 430…" aria-label="Buscar repuesto" autoComplete="off" />
              <button className="btn btn--primary btn--lg" type="submit">Buscar repuesto</button>
            </form>
            <p className="finder__hint">+175 repuestos en catálogo · Consultá cualquiera por WhatsApp</p>
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
          <div className="grid grid--cats">
            {cats.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
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

      {/* RESEÑAS — bloque de rating + riel horizontal */}
      <section className="section section--alt reveal">
        <div className="container reviews">
          <aside className="reviews__agg">
            <p className="eyebrow">Reseñas</p>
            <div className="reviews__score">{RESENIAS_RATING.puntaje.toFixed(1).replace('.', ',')}</div>
            <div className="stars stars--lg" aria-hidden="true">{estrellas}</div>
            <p className="reviews__meta">{RESENIAS_RATING.cantidad} reseñas de clientes de todo el país</p>
            <WhatsAppButton mensaje="Hola CAMGIGA, quería hacer una consulta.">Sumate a ellos</WhatsAppButton>
          </aside>
          <div className="reviews__rail">
            {RESENIAS.map((r) => (
              <figure key={r.autor} className="review-card">
                <span className="review-card__quote" aria-hidden="true">”</span>
                <blockquote className="review-card__text">{r.texto}</blockquote>
                <figcaption className="review-card__who">
                  <span className="review-card__avatar" aria-hidden="true">{r.autor.charAt(0)}</span>
                  <span>
                    <span className="review-card__author">{r.autor}</span>
                    <span className="review-card__empresa">{r.empresa}</span>
                  </span>
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

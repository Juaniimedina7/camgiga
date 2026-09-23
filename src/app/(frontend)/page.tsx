import Link from 'next/link'
import { getCategories, getProducts } from '../../lib/data'
import { CategoryCard } from '../../components/CategoryCard'
import { ProductCard } from '../../components/ProductCard'
import { SearchBar } from '../../components/SearchBar'
import { WhatsAppButton } from '../../components/WhatsAppButton'
import { MARCAS_REPUESTO } from '../../lib/constants'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [categories, destacados] = await Promise.all([
    getCategories(true).catch(() => []),
    getProducts({ destacado: true, limit: 8 }).then((r) => r.docs).catch(() => []),
  ])

  return (
    <>
      {/* HERO + BUSCADOR (dirección A: buscador al frente) */}
      <section className="hero">
        <div className="container">
          <h1>Encontrá el repuesto de tu camión, sin vueltas.</h1>
          <p className="hero__sub">
            Más de 25 años en tren motriz para camiones, maquinaria agrícola y colectivos.
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
          <div className="hero__stats">
            <span><b>25+</b> años en el rubro</span>
            <span><b>Envíos</b> a todo el país</span>
            <span><b>Originales</b> y alternativos</span>
            <span><b>Amplio</b> stock</span>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="section" id="categorias">
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

      {/* CONFIANZA */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section__title">Por qué te conviene CAMGIGA</h2>
          <div className="trust">
            <div className="trust__item"><span className="trust__ic">✓</span><div><b>25 años en el rubro</b><br /><span className="muted">Experiencia y trayectoria.</span></div></div>
            <div className="trust__item"><span className="trust__ic">✓</span><div><b>Envíos a todo el país</b><br /><span className="muted">Estés donde estés.</span></div></div>
            <div className="trust__item"><span className="trust__ic">✓</span><div><b>Originales y alternativos</b><br /><span className="muted">Vos elegís.</span></div></div>
            <div className="trust__item"><span className="trust__ic">✓</span><div><b>Amplio stock</b><br /><span className="muted">La pieza que nadie consiguió.</span></div></div>
          </div>
        </div>
      </section>

      {/* MARCAS */}
      <section className="section" id="marcas">
        <div className="container">
          <h2 className="section__title">Trabajamos las primeras marcas</h2>
          <div className="brands">
            {MARCAS_REPUESTO.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      {destacados.length ? (
        <section className="section section--alt">
          <div className="container">
            <h2 className="section__title">Productos destacados</h2>
            <div className="grid grid--products">
              {destacados.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA FINAL */}
      <section className="section">
        <div className="container">
          <div className="cta-block">
            <h2>¿No encontrás la pieza? Nosotros la conseguimos.</h2>
            <p>Contanos qué necesitás y te respondemos rápido.</p>
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
